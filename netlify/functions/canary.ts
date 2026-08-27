import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Proves, once a day, that an application still produces an email.

  Everything else guards one side. The tests guard this codebase. The health
  check guards the plumbing up to GoHighLevel's door. Nothing guarded the
  contract BETWEEN them, and that is exactly where it broke.

  What happened: the site used to remove and re-add `applied` so GHL's "tag
  added" trigger would fire. That turned out to be dangerous, because two
  overlapping submissions could delete the tag and fail to re-add it, and a real
  applicant ended up carrying no `applied` at all: invisible to every filter and
  every smart list. So the mechanism changed. `applied` became permanent, and
  `application-received` was introduced purely to be cycled.

  The workflow in GHL kept listening for `applied`. Nothing on either side was
  wrong on its own. They just no longer agreed, and the only symptom was silence
  for anybody who had applied before. It went unnoticed for a day, and was found
  by a person, not a system.

  So this walks the whole path a real applicant walks, end to end, and asserts
  the outcome that actually matters: an email came out the other side.

    create a contact  ->  tag application-received  ->  wait  ->  did GHL email?

  Daily rather than hourly, because it genuinely fires the workflow and sends a
  real email. One synthetic email a day to a throwaway address is a fair price
  for knowing the funnel works. Hourly would be spam.

  The contact is deleted afterwards either way, so nothing accumulates and no
  invented applicant ever sits in the queue looking real.
*/

const CANARY_EMAIL = "zz-canary@authorityengine.com.au";

/*
  The tag the site actually cycles. If this ever changes in
  builder-application, it has to change here, and the canary is what will tell
  you if a workflow was left listening for the old one.
*/
const TRIGGER_TAG = "application-received";

/* GHL usually sends within seconds. Ninety is generous without being a long
   scheduled run. */
const WAIT_MS = 90_000;

const auth = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

async function alarm(reason: string, detail: string) {
  const webhook = process.env.SLACK_WEBHOOK_HEALTH || process.env.SLACK_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          ":rotating_light: *An application would not produce an email right now*",
          "",
          `*${reason}*`,
          detail,
          "",
          "A real applicant submitting now would hear nothing back.",
          "",
          `Most likely a workflow is listening for the wrong tag. The site cycles \`${TRIGGER_TAG}\` on every submission; \`applied\` is permanent and only ever added, so a workflow triggered on \`applied\` will never fire for anyone who has applied before.`,
          "https://authorityengine.com.au/health",
        ].join("\n"),
      }),
    }).catch(() => {
      /* Already logged below. */
    });
  }
  console.error("CANARY FAILED:", reason, detail);
}

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("canary: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false, reason: "not configured" }) };
  }

  const h = auth(token);
  let contactId: string | null = null;

  const cleanUp = async () => {
    if (!contactId) return;
    /* Confirm the record is ours before destroying it. Belt and braces next to
       the `made.ok` guard: a canary must not be able to delete a real contact
       even if the id it is holding turns out not to be the one it created. */
    const check = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, { headers: h }).catch(() => null);
    const owner = ((await check?.json().catch(() => ({})))?.contact?.email || "").toLowerCase();
    if (owner !== CANARY_EMAIL) return;

    await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      method: "DELETE",
      headers: h,
    }).catch(() => {
      /* Left behind at worst. The next run clears it. */
    });
  };

  try {
    /* Clear anything a previous run left behind, so a stale contact cannot
       make a broken funnel look healthy. */
    const found = await fetch(
      `${GHL_API}/contacts/?locationId=${encodeURIComponent(locationId)}&query=${encodeURIComponent(CANARY_EMAIL)}`,
      { headers: h }
    );
    if (found.ok) {
      for (const c of (await found.json())?.contacts || []) {
        if ((c?.email || "").toLowerCase() === CANARY_EMAIL) {
          await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}`, { method: "DELETE", headers: h });
        }
      }
    }

    const made = await fetch(`${GHL_API}/contacts/`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({
        locationId,
        firstName: "ZZ",
        lastName: "Canary",
        email: CANARY_EMAIL,
        source: "daily canary",
      }),
    });
    const madeJson = await made.json().catch(() => ({}));
    /* Same reason as _health: a refused create can answer with the id of the
       contact it collided with, and everything below tags then deletes it. */
    contactId = made.ok ? (madeJson?.contact?.id || madeJson?.id || null) : null;

    if (!contactId) {
      await alarm("A contact could not be created", `GHL returned HTTP ${made.status}`);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    const tagged = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ tags: [TRIGGER_TAG] }),
    });
    if (!tagged.ok) {
      await alarm("The trigger tag could not be written", `GHL returned HTTP ${tagged.status}`);
      await cleanUp();
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    await new Promise((r) => setTimeout(r, WAIT_MS));

    /* The only question worth asking: did anything actually go out. */
    let sent = 0;
    const conv = await fetch(
      `${GHL_API}/conversations/search?locationId=${encodeURIComponent(locationId)}&contactId=${encodeURIComponent(contactId)}`,
      { headers: h }
    );
    if (conv.ok) {
      for (const cv of (await conv.json())?.conversations || []) {
        const msgs = await fetch(`${GHL_API}/conversations/${encodeURIComponent(cv.id)}/messages`, { headers: h });
        if (!msgs.ok) continue;
        const body = await msgs.json();
        for (const m of body?.messages?.messages || body?.messages || []) {
          if (m?.messageType === "TYPE_EMAIL" && m?.direction === "outbound") sent += 1;
        }
      }
    }

    await cleanUp();

    if (sent === 0) {
      await alarm(
        `Tagging \`${TRIGGER_TAG}\` sent no email`,
        `Waited ${WAIT_MS / 1000} seconds on a brand new contact. The tag was written and GHL did nothing.`
      );
      return { statusCode: 200, body: JSON.stringify({ ok: false, sent }) };
    }

    console.log(`canary passed: ${sent} email(s) from tagging ${TRIGGER_TAG}`);
    return { statusCode: 200, body: JSON.stringify({ ok: true, sent }) };
  } catch (err) {
    await alarm("The canary itself failed", String(err));
    await cleanUp();
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

export { handler };
