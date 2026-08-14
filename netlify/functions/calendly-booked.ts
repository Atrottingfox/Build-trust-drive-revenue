import type { Handler } from "@netlify/functions";

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

    if (!isPrepCall && !isBrandDay) {
      // Guessing here is dangerous: wrongly applying brand-day-paid marks
      // someone as having paid $5,000 and silences the chase sequence.
      console.error(
        "Calendly booking from an unrecognised event, no tags applied.",
        "name:", eventName || "unknown", "uri:", eventUri || "unknown", "contact:", contactId
      );
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    /*
      The VIP Day event collects the $5,000 inside Calendly, so a booking IS a
      payment and the two tags can never disagree. That is also what stops WF3
      chasing someone who has already paid.
    */
    const tags = isPrepCall ? ["prep-call-booked"] : ["brand-day-paid", "brand-day-booked"];

    const tagRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({ tags }),
    });
    if (!tagRes.ok) {
      console.error("GHL tagging failed:", tagRes.status, await tagRes.text());
    }

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, contactId, event: isPrepCall ? "prep-call" : "brand-day" }),
    };
  } catch (err) {
    // Always 200. Calendly retries on failure and a duplicate tag is harmless,
    // but a retry storm is not worth the noise.
    console.error("calendly-booked error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
  }
};

export { handler };
