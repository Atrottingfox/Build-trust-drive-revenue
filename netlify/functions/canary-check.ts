import type { Handler } from "@netlify/functions";
import { GHL_API } from "./_ghl";
import {
  TRIGGER_TAG,
  alarmCouldNotRun,
  alarmNoEmail,
  deleteCanary,
  findCanaries,
  ghlHeaders,
} from "./_canary";

/*
  The second half of the daily canary. See canary.ts for why it exists.

  Runs 15 minutes after the contact was tagged, asks the only question worth
  asking, then deletes the contact either way, so nothing accumulates and no
  invented applicant ever sits in the queue looking real.

  A read GHL refused is not the same as no email. Counting it as zero would
  report a silent funnel whenever the conversations API had a bad minute.
*/

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("canary-check: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false, reason: "not configured" }) };
  }

  const h = ghlHeaders(token);
  let ids: string[] = [];

  const cleanUp = async () => {
    for (const id of ids) {
      await deleteCanary(token, id).catch(() => {
        /* Left behind at worst. The next run clears it. */
      });
    }
  };

  try {
    const found = await findCanaries(token, locationId);
    if (found === null) {
      await alarmCouldNotRun("The canary contact could not be looked up", "GHL refused the contact search.");
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }
    ids = found;

    /* Nothing to read. canary has already alarmed if the create failed. */
    if (ids.length === 0) {
      console.error("canary-check: no canary contact found.");
      return { statusCode: 200, body: JSON.stringify({ ok: false, reason: "no contact" }) };
    }

    let sent = 0;
    for (const contactId of ids) {
      const conv = await fetch(
        `${GHL_API}/conversations/search?locationId=${encodeURIComponent(locationId)}&contactId=${encodeURIComponent(contactId)}`,
        { headers: h }
      );
      if (!conv.ok) throw new Error(`conversation search returned HTTP ${conv.status}`);

      for (const cv of (await conv.json())?.conversations || []) {
        const msgs = await fetch(`${GHL_API}/conversations/${encodeURIComponent(cv.id)}/messages`, { headers: h });
        if (!msgs.ok) throw new Error(`message read returned HTTP ${msgs.status}`);
        const body = await msgs.json();
        for (const m of body?.messages?.messages || body?.messages || []) {
          if (m?.messageType === "TYPE_EMAIL" && m?.direction === "outbound") sent += 1;
        }
      }
    }

    await cleanUp();

    if (sent === 0) {
      await alarmNoEmail(
        `Tagging \`${TRIGGER_TAG}\` sent no email`,
        "Waited 15 minutes on a brand new contact. The tag was written and GHL did nothing."
      );
      return { statusCode: 200, body: JSON.stringify({ ok: false, sent }) };
    }

    console.log(`canary passed: ${sent} email(s) from tagging ${TRIGGER_TAG}`);
    return { statusCode: 200, body: JSON.stringify({ ok: true, sent }) };
  } catch (err) {
    await alarmCouldNotRun("The email check itself failed", String(err));
    await cleanUp();
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

export { handler };
