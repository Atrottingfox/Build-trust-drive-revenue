import type { Handler } from "@netlify/functions";
import { GHL_API } from "./_ghl";
import {
  CANARY_EMAIL,
  TRIGGER_TAG,
  alarmCouldNotRun,
  deleteCanary,
  findCanaries,
  ghlHeaders,
} from "./_canary";

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

    canary:        create a contact  ->  tag application-received
    canary-check:  15 minutes later  ->  did GHL email?  ->  delete the contact

  Two runs because a scheduled function is killed at 30 seconds. This used to
  wait 90 seconds in one run, so it died mid wait: the email was never checked,
  the contact was never deleted, and the leftover could collide with the next
  morning's create and come back as a 400.

  Daily rather than hourly, because it genuinely fires the workflow and sends a
  real email. One synthetic email a day to a throwaway address is a fair price
  for knowing the funnel works. Hourly would be spam.
*/

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("canary: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false, reason: "not configured" }) };
  }

  const h = ghlHeaders(token);

  const create = async () => {
    const res = await fetch(`${GHL_API}/contacts/`, {
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
    return { res, json: await res.json().catch(() => ({})) };
  };

  try {
    /* Clear anything a previous run left behind, so a stale contact cannot
       make a broken funnel look healthy. */
    for (const id of (await findCanaries(token, locationId)) || []) {
      await deleteCanary(token, id);
    }

    let made = await create();

    /* The search above can miss a contact GHL still knows about, and the create
       then refuses it as a duplicate, naming the id. deleteCanary only deletes
       if that id really is the canary, so a collision with anyone else stays a
       plain failure. */
    const collidedWith = made.res.status === 400 ? made.json?.meta?.contactId : null;
    if (collidedWith && (await deleteCanary(token, collidedWith))) {
      made = await create();
    }

    /* Same reason as _health: a refused create can answer with the id of the
       contact it collided with, so only a successful create's id is trusted. */
    const contactId = made.res.ok ? (made.json?.contact?.id || made.json?.id || null) : null;

    if (!contactId) {
      await alarmCouldNotRun(
        "A contact could not be created",
        `GHL returned HTTP ${made.res.status}: ${String(made.json?.message || "no message").slice(0, 200)}`
      );
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    const tagged = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ tags: [TRIGGER_TAG] }),
    });
    if (!tagged.ok) {
      await alarmCouldNotRun("The trigger tag could not be written", `GHL returned HTTP ${tagged.status}`);
      await deleteCanary(token, contactId);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    console.log(`canary: tagged ${TRIGGER_TAG}, canary-check reads the result.`);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    await alarmCouldNotRun("The canary itself failed", String(err));
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

export { handler };
