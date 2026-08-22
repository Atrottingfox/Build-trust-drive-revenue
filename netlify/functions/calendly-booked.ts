import type { Handler } from "@netlify/functions";
import { reconcile, contactUrl } from "./_ghl";

/*
  Receives Calendly's `invitee.created` webhook and pushes the booking into GHL.

  Because the Brand Day is booked in Calendly rather than a GHL calendar, GHL's
  own "appointment booked" trigger never fires. This function is what replaces
  it: it tags `brand-day-booked` and writes the date into the Brand day date
  custom field. WF5 then triggers on that TAG rather than on an appointment.

  Without this, everything after the booking (confirmation, D-7 prep, D-1
  logistics, the prep call chase) has nothing to fire on.

  Setup: Calendly > Integrations > Webhooks, subscribe `invitee.created` to
  https://authorityengine.com.au/.netlify/functions/calendly-booked
*/

const headers = { "Content-Type": "application/json" };

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = process.env.GHL_TOKEN;
  const brandDayDateFieldId = process.env.GHL_FIELD_BRAND_DAY_DATE;

  try {
    const body = JSON.parse(event.body || "{}");

    if (body.event && body.event !== "invitee.created") {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, ignored: body.event }) };
    }

    const payload = body.payload || {};

    // The contact id we sent through the embed as utm_content.
    const contactId =
      payload.tracking?.utm_content ||
      payload.utm_content ||
      null;

    // Calendly nests the appointment time differently across payload versions.
    const startTime =
      payload.scheduled_event?.start_time ||
      payload.event?.start_time ||
      payload.start_time ||
      null;

    if (!contactId) {
      console.error(
        "Calendly booking with no utm_content, cannot match to a GHL contact.",
        "invitee:", payload.email || "unknown",
        "start:", startTime || "unknown"
      );
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    if (!token) {
      console.error("GHL_TOKEN not set, cannot record Calendly booking for", contactId);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    const ghlHeaders = {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    /*
      Both calendars point at this one endpoint, so work out which event fired.
      Calendly moves these fields around between payload versions, so check the
      name and the event type URI.
    */
    const eventName = payload.scheduled_event?.name || payload.event_type?.name || "";
    const eventUri = payload.scheduled_event?.event_type || payload.event_type?.uri || "";
    const haystack = `${eventName} ${eventUri}`.toLowerCase();

    const isPrepCall = /prep[-\s]?call/.test(haystack);
    const isBrandDay = /vip[-\s]?day|brand[-\s]?builder|brand[-\s]?day/.test(haystack);
    /*
      The 90 Day delivery calls.

      Calendly already does the hard parts here and does them properly: it reads
      the real calendar so a taken hour cannot be offered twice, creates the
      event, invites the client, attaches a Zoom conference natively, and sends
      its own reminders. None of that needed building.

      What it could not do was tell the CRM. An unrecognised event type was
      logged and dropped, deliberately, because guessing wrong would have marked
      somebody as having paid. So these are named rather than assumed.
    */
    const isInstallWeekly = /90[-\s]?day[-\s]?install[-,\s]*weekly/.test(haystack);
    const isInstallFortnightly = /90[-\s]?day[-\s]?install[-,\s]*fortnightly/.test(haystack);

    if (!isPrepCall && !isBrandDay && !isInstallWeekly && !isInstallFortnightly) {
      // Guessing here is dangerous: wrongly applying brand-day-paid marks
      // someone as having paid $5,000 and silences the chase sequence.
      console.error(
        "Calendly booking from an unrecognised event, no tags applied.",
        "name:", eventName || "unknown", "uri:", eventUri || "unknown", "contact:", contactId
      );
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    /*
      Booking only. Payment is taken by Stripe on /lock-in, and lock-in-paid.ts
      owns the `brand-day-paid` tag. Tagging paid from here would mark someone
      as having paid the moment they picked a date, which is the wrong order and
      would silence the chase sequence for anyone who books without paying.
    */
    const tags = isInstallWeekly
      ? ["install-weekly-booked"]
      : isInstallFortnightly
        ? ["install-fortnightly-booked"]
        : isPrepCall
          ? ["prep-call-booked"]
          : ["brand-day-booked"];

    const tagRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ tags }),
    });
    if (!tagRes.ok) {
      console.error("GHL tagging failed:", tagRes.status, await tagRes.text());
    }

    /*
      A date is now held. Whether that means confirmed or merely held depends on
      whether the money has landed, which reconcile works out by reading the
      contact back. Brand Day only: a prep call booking says nothing about the
      Day itself.
    */
    if (isBrandDay) await reconcile(token, contactId);

    // Write the date so the D-7 and D-1 emails have something to count back
    // from. Brand Day only: a prep call booking must never overwrite it.
    if (isBrandDay && startTime && brandDayDateFieldId) {
      const dateRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
        method: "PUT",
        headers: ghlHeaders,
        body: JSON.stringify({
          customFields: [{ id: brandDayDateFieldId, value: startTime }],
        }),
      });
      if (!dateRes.ok) {
        console.error("GHL Brand day date write failed:", dateRes.status, await dateRes.text());
      }
    } else if (isBrandDay && !brandDayDateFieldId) {
      console.error("GHL_FIELD_BRAND_DAY_DATE not set, booking date not recorded.");
    }

    /*
      Somebody just locked in a date and nothing said so.

      Payment alerts, application alerts and lapse alerts all existed. The one
      moment a client actually commits to a day in the calendar passed in
      silence, which meant the first Sean knew of a booking was seeing it in
      Calendly later, with no way back to the CRM record from there.

      Deliberately after the tagging and the date write: the alert reports what
      was actually recorded, not what was about to be attempted.
    */
    const slack = process.env.SLACK_WEBHOOK_URL;
    if (slack) {
      const when = startTime
        ? new Date(startTime).toLocaleString("en-AU", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "Australia/Brisbane",
          })
        : "date not supplied by Calendly";
      await fetch(slack, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            isInstallWeekly
              ? ":repeat: *90 Day weekly slot chosen*"
              : isInstallFortnightly
                ? ":repeat: *90 Day fortnightly slot chosen*"
                : isPrepCall
                  ? ":telephone_receiver: *Prep call booked*"
                  : ":calendar: *Brand Day locked in*",
            `*Who:* ${payload.name || payload.email || contactId}`,
            payload.email ? `*Email:* ${payload.email}` : null,
            `*When:* ${when}`,
            !tagRes.ok ? `:rotating_light: *CRM:* tagging failed ${tagRes.status}, nothing downstream will fire` : null,
            `<${contactUrl(contactId)}|Open them in GHL>`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      }).catch((slackErr) => {
        /* The booking is recorded. The announcement is not worth failing over. */
        console.error("calendly-booked Slack alert failed:", slackErr);
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        contactId,
        event: isInstallWeekly
          ? "install-weekly"
          : isInstallFortnightly
            ? "install-fortnightly"
            : isPrepCall
              ? "prep-call"
              : "brand-day",
      }),
    };
  } catch (err) {
    // Always 200. Calendly retries on failure and a duplicate tag is harmless,
    // but a retry storm is not worth the noise.
    console.error("calendly-booked error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
  }
};

export { handler };
