import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Repairs the funnel without waiting for someone to read a dashboard.

  The health check reports. This fixes. The difference matters because the
  failures of 20 and 21 August were all silent AND all slow: Calendly had no
  webhook subscription for weeks, and an applicant who heard nothing would have
  stayed that way until Sean happened to notice.

  It only heals things where the correct state is unambiguous and the repair
  cannot make anything worse:

    1. The Calendly webhook. There is exactly one right answer and it either
       exists or it does not. It was missing entirely, so no booking ever
       reported back and no Brand Day date was ever written.

    2. An applicant who received no email. Re-fires the workflow trigger, once
       per person, ever.

  Deliberately does NOT touch:

    - Prices. A price is a decision. Auto-reverting a deliberate $1 test would
      be a system overruling a person, and the health check already shouts.
    - Workflows in Draft. GHL exposes no write API for them at any scope, so
      publishing cannot be automated by anyone.

  Everything it does is announced in Slack. A system that repairs itself quietly
  is a system nobody understands the state of.
*/

const CALENDLY_CALLBACK = "https://authorityengine.com.au/.netlify/functions/calendly-booked";

/* Applied to a contact once a retry has been spent, so a person can never be
   retried twice and this can never become a loop. */
const RETRIED_TAG = "delivery-retried";

/* Long enough that a workflow which is merely slow is not mistaken for one that
   failed. GHL usually sends within seconds. */
const GRACE_MINUTES = 15;

type Repair = { what: string; detail: string; ok: boolean };

const ghlAuth = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

async function healCalendlyWebhook(repairs: Repair[]) {
  const token = process.env.CALENDLY_TOKEN;
  if (!token) return;

  try {
    const me = await fetch("https://api.calendly.com/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!me.ok) return;
    const org = (await me.json())?.resource?.current_organization;
    if (!org) return;

    const list = await fetch(
      `https://api.calendly.com/webhook_subscriptions?organization=${encodeURIComponent(org)}&scope=organization`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!list.ok) return;

    const subs = (await list.json())?.collection || [];
    const live = subs.find(
      (s: any) => s.state === "active" && String(s.callback_url || "").includes("calendly-booked")
    );
    if (live) return;

    const made = await fetch("https://api.calendly.com/webhook_subscriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: CALENDLY_CALLBACK,
        events: ["invitee.created"],
        organization: org,
        scope: "organization",
      }),
    });

    repairs.push({
      what: "Calendly booking webhook",
      detail: made.ok
        ? "was missing, recreated. Bookings report back again."
        : `was missing and could NOT be recreated: HTTP ${made.status}`,
      ok: made.ok,
    });
  } catch (err) {
    repairs.push({ what: "Calendly booking webhook", detail: String(err), ok: false });
  }
}

async function healMissedDeliveries(repairs: Repair[]) {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return;

  const auth = ghlAuth(token);

  try {
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        locationId,
        pageLimit: 15,
        sort: [{ field: "dateAdded", direction: "desc" }],
      }),
    });
    if (!res.ok) return;

    const now = Date.now();
    const contacts = ((await res.json())?.contacts || []).filter((c: any) => {
      const email = String(c?.email || "").toLowerCase();
      if (email.startsWith("zz")) return false;
      if (!/builder|apply/i.test(String(c?.source || ""))) return false;
      if ((c?.tags || []).includes(RETRIED_TAG)) return false;

      const age = now - new Date(c?.dateAdded || 0).getTime();
      /* Old enough that a slow workflow has had its chance, recent enough that
         re-firing is still the right thing to do to a person. */
      return age > GRACE_MINUTES * 60000 && age < 24 * 3600 * 1000;
    });

    for (const c of contacts.slice(0, 5)) {
      const who = c?.email || c?.id;

      const conv = await fetch(
        `${GHL_API}/conversations/search?locationId=${encodeURIComponent(locationId)}&contactId=${encodeURIComponent(c.id)}`,
        { headers: auth }
      );
      const convs = conv.ok ? (await conv.json())?.conversations || [] : [];

      let sent = 0;
      for (const cv of convs) {
        const m = await fetch(`${GHL_API}/conversations/${encodeURIComponent(cv.id)}/messages`, { headers: auth });
        if (!m.ok) continue;
        const body = await m.json();
        for (const msg of body?.messages?.messages || body?.messages || []) {
          if (msg?.messageType === "TYPE_EMAIL" && msg?.direction === "outbound") sent += 1;
        }
      }
      if (sent > 0) continue;

      /*
        Nothing reached them. Re-fire the trigger by taking `applied` off and
        putting it back, because GHL only fires on a tag being ADDED.

        The request path must never do this: two overlapping submissions can
        leave the tag removed for good, which is exactly how a real applicant
        went missing. Here it is safe. This runs hourly, one contact at a time,
        with nothing else touching the record, and the retry tag guarantees it
        happens once per person for the life of that contact.
      */
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ tags: [RETRIED_TAG] }),
      });
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
        method: "DELETE",
        headers: auth,
        body: JSON.stringify({ tags: ["applied"] }),
      });
      const re = await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ tags: ["applied"] }),
      });

      repairs.push({
        what: `No email had reached ${who}`,
        detail: re.ok
          ? "re-fired the application workflow. Retried once, will not repeat."
          : `retry FAILED: HTTP ${re.status}. Contact them by hand.`,
        ok: re.ok,
      });
    }
  } catch (err) {
    repairs.push({ what: "Delivery retry", detail: String(err), ok: false });
  }
}

const handler: Handler = async () => {
  const repairs: Repair[] = [];

  await healCalendlyWebhook(repairs);
  await healMissedDeliveries(repairs);

  if (repairs.length) {
    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (webhook) {
      const lines = [
        ":wrench: *The funnel repaired itself*",
        "",
        ...repairs.map((r) => `${r.ok ? ":white_check_mark:" : ":x:"} *${r.what}*\n     ${r.detail}`),
        "",
        "https://authorityengine.com.au/health",
      ].join("\n");
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lines }),
      }).catch(() => {
        /* Logged below either way. */
      });
    }
    console.log("self-heal repaired:", JSON.stringify(repairs));
  } else {
    console.log("self-heal: nothing to repair");
  }

  return { statusCode: 200, body: JSON.stringify({ repairs }) };
};

export { handler };
