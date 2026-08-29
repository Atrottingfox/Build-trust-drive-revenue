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

  /*
    The same two times, written as somebody would read them out loud.

    brand_day_date holds an ISO timestamp, which is right for counting back from
    but useless in an email: a merge field renders it raw. These hold
    "Wed 24 Sep, 10:00am" so the confirmation can be written in GoHighLevel
    without any logic in it at all, which is where the copy belongs.
  */
  const prepWhenFieldId = process.env.GHL_FIELD_PREP_CALL_WHEN;
  const brandDayWhenFieldId = process.env.GHL_FIELD_BRAND_DAY_WHEN;

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
    let startTime =
      payload.scheduled_event?.start_time ||
      payload.event?.start_time ||
      payload.start_time ||
      null;

    /*
      If none of those matched, go and ask.

      Two real bookings landed with their tags written and no time recorded at
      all, which left the D-7 and D-1 emails with nothing to count back from and
      the confirmation with no times to name. Guessing at payload shapes is how
      that happened; the event's own URI is in the payload whichever shape it
      takes, and Calendly will answer it authoritatively.

      Best effort and short. A booking must still be recorded if Calendly is
      slow, it just loses the time.
    */
    if (!startTime) {
      const eventUri = payload.scheduled_event?.uri || payload.event || payload.uri;
      const calendlyToken = process.env.CALENDLY_TOKEN || process.env.CALENDLY_API_KEY;
      if (typeof eventUri === "string" && /^https:\/\/api\.calendly\.com\//.test(eventUri) && calendlyToken) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3000);
        try {
          const ev = await fetch(eventUri, {
            headers: { Authorization: `Bearer ${calendlyToken}` },
            signal: ctrl.signal,
          });
          if (ev.ok) {
            startTime = (await ev.json())?.resource?.start_time || null;
            console.log("calendly-booked: recovered start time from the API:", startTime);
          }
        } catch (err) {
          console.error("calendly-booked: could not read the event back:", err);
        } finally {
          clearTimeout(timer);
        }
      }
      if (!startTime) {
        console.error("calendly-booked: NO START TIME. Nothing can count back from this booking.", eventUri);
      }
    }

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

    /*
      Match the event type id first, and only fall back to reading the name.

      The name was the only signal, and it silently stopped matching. The
      calendar event is called "1:1 VIP strategy day"; the pattern looked for
      "vip day", "brand builder" or "brand day", and "VIP strategy day" is none
      of those. Every Brand Day booking went down the "unrecognised, log and
      drop" branch: no tag, no date, nothing to count the prep emails back from,
      and no error anywhere, because dropping the unknown was the deliberate
      behaviour.

      An id cannot be reworded. Renaming the event in Calendly to something
      friendlier now costs nothing, which is exactly the change that broke this.
    */
    const typeId = (uri: string) => String(uri || "").split("/").pop() || "";
    const bookedTypeId = typeId(payload.scheduled_event?.event_type || payload.event_type?.uri || "");
    /*
      In code with an environment override, rather than only in the environment.

      These are Calendly event type ids for Sean's own account, not secrets, and
      this site sits about a hundred bytes under AWS's 4KB environment ceiling.
      Two more variables there cost a deploy. The override stays so a new
      calendar can be pointed at without one.
    */
    const KNOWN_TYPES: Record<string, string> = {
      CALENDLY_TYPE_BRAND_DAY: "67a02dc5-7d2c-4d54-8dcd-2268983ce45e", // 1:1 VIP strategy day
      CALENDLY_TYPE_PREP_CALL: "8bae55d8-9869-4d69-b649-8cea7436ba99", // Strategy day prep call
    };
    const idIs = (envVar: string) => {
      const want = process.env[envVar] || KNOWN_TYPES[envVar];
      return Boolean(want && bookedTypeId && bookedTypeId === want);
    };

    const isPrepCall = idIs("CALENDLY_TYPE_PREP_CALL") || /prep[-\s]?call/.test(haystack);
    /*
      Never a prep call. "Strategy day prep call" contains "strategy day", so
      the widened pattern matches both, and a prep call booking that reads as a
      Brand Day would overwrite the Day's own date with the wrong time.
    */
    const isBrandDay =
      !isPrepCall &&
      (idIs("CALENDLY_TYPE_BRAND_DAY") ||
        /vip[-\s]?day|brand[-\s]?builder|brand[-\s]?day|vip[-\s]?strategy[-\s]?day|strategy[-\s]?day/.test(
          haystack
        ));
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
      Write the readable version, and say when both are in.

      Sean wanted one email that names both times: "This is your prep call, this
      is your strategy day, see you soon." That cannot be written in
      GoHighLevel until both times exist on the contact as text, and it must not
      fire when only one of them does.

      So the field is written here, the contact is read back, and `all-locked`
      goes on only when both are actually present. Reading back rather than
      assuming matters because the two bookings happen on different days, in
      either order, and this function only ever knows about the one in front of
      it.
    */
    const whenFieldId = isPrepCall ? prepWhenFieldId : isBrandDay ? brandDayWhenFieldId : null;
    if (whenFieldId && startTime) {
      const readable = new Date(startTime).toLocaleString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Australia/Brisbane",
      });
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
        method: "PUT",
        headers: ghlHeaders,
        body: JSON.stringify({ customFields: [{ id: whenFieldId, value: readable }] }),
      }).catch((err) => console.error("readable time write failed:", err));

      if (prepWhenFieldId && brandDayWhenFieldId) {
        try {
          const back = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
            headers: ghlHeaders,
          });
          if (back.ok) {
            const contact = (await back.json())?.contact || {};
            const fields = contact.customFields || [];
            const value = (id) => String(fields.find((f) => f?.id === id)?.value || "").trim();
            const bothIn = Boolean(value(prepWhenFieldId)) && Boolean(value(brandDayWhenFieldId));
            /* Only on the way in. Re-adding a tag GoHighLevel already has fires
               nothing, so a second booking cannot send the email twice. */
            if (bothIn && !(contact.tags || []).includes("all-locked")) {
              await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
                method: "POST",
                headers: ghlHeaders,
                body: JSON.stringify({ tags: ["all-locked"] }),
              });
              console.log("all-locked: both times are in for", contactId);
            }
          }
        } catch (err) {
          console.error("all-locked check failed:", err);
        }
      }
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
    const slack = process.env.SLACK_WEBHOOK_BOOKINGS || process.env.SLACK_WEBHOOK_URL;
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
