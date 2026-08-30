import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, addTags, getContact, contactUrl } from "./_ghl";

/*
  Records that a client opened their hub, and how far they have got.

  Sean's question is always "where are they up to", and the honest answer needs
  two things that tags alone do not give: whether they ever opened the link, and
  when they last looked. A client who has not opened it is a different
  conversation from one who opened it twice and stalled at payment.

  First open is tagged rather than counted, so a workflow can nudge the people
  who never arrived. Last seen is a field, overwritten each visit.

  Deliberately not authenticated. The contact id is already in the link and this
  writes nothing an attacker would want. Requiring a secret would mean the page
  could not call it.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

/*
  Which page, and when. Appended rather than overwritten.

  Three pages already reported a visit and this function threw away which one,
  so the record said "they looked" and "last time" and nothing else. Whether
  somebody opened their agreement four times without signing, or paid and never
  came back to pick a date, was invisible.

  A single text field holding a readable trail, rather than a table nobody can
  see. It is legible in GoHighLevel next to everything else about them, which
  is the whole point: an operator answering "where are they up to" should not
  need a second system.

  Capped, because a field is not a log. The oldest entries drop off and the last
  dozen visits are what anybody actually acts on.
*/
const TRAIL_FIELD_DEFAULT = "bT1vSEg37lxUGj641h64";
const TRAIL_MAX = 12;

/* A reload is not a visit. Anything inside this window folds into the entry
   already there, so a page that refreshes does not fill the trail with itself. */
const SAME_VISIT_MINUTES = 30;

function appendTrail(existing: string, page: string, at: Date): string {
  const stamp = at.toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  });
  const entries = String(existing || "")
    .split(" · ")
    .map((e) => e.trim())
    .filter(Boolean);

  const last = entries[entries.length - 1] || "";
  if (last.startsWith(`${page} `)) {
    const lastAt = Date.parse(last.slice(page.length + 1) + ` ${at.getFullYear()}`);
    if (Number.isFinite(lastAt) && at.getTime() - lastAt < SAME_VISIT_MINUTES * 60000) {
      return entries.join(" · ");
    }
  }

  entries.push(`${page} ${stamp}`);
  return entries.slice(-TRAIL_MAX).join(" · ");
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = process.env.GHL_TOKEN;
  if (!token) return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };

  try {
    const { contactId, page } = JSON.parse(event.body || "{}");
    if (!contactId) return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };

    const contact = await getContact(token, contactId);
    const tags: string[] = contact?.tags || [];

    /*
      Name and email come back so /lock-in can prefill Calendly. They already
      typed both on the application; asking again at the moment they pick a
      date is friction for no reason.

      Only for a contact who has paid. This endpoint takes a contact id and no
      credential, so whatever it returns is readable by anyone holding an id.
      Booking state is low stakes; a name and email are not. Gating on the paid
      tag means a stray id cannot be turned into someone's details, and costs
      nothing: the calendar that uses the prefill only renders after payment.
    */
    const hasPaid = tags.includes("brand-day-paid");
    const fullName = hasPaid
      ? [contact?.firstName, contact?.lastName].filter(Boolean).join(" ").trim() ||
        contact?.name || ""
      : "";

    /*
      The first time somebody opens their link.

      This was already recorded and nobody was told, so in practice it was not
      recorded at all: it sat in a custom field that had to be gone looking for.
      A $5,000 link being opened is the clearest buying signal in the funnel and
      the best moment to say something, so it goes to Slack the once.

      First open only. Every visit would turn the most useful message here into
      the most ignored one, and the tag already makes that easy: it is added
      once and checked before adding, so this branch runs a single time per
      person no matter how often they come back.
    */
    if (!tags.includes("hub-opened")) {
      await addTags(token, contactId, ["hub-opened"]);

      const who =
        [contact?.firstName, contact?.lastName].filter(Boolean).join(" ").trim() ||
        contact?.email ||
        contactId;

      /* Where they are matters as much as that they looked. Someone opening it
         a second week running having never paid is a different conversation
         from someone opening it an hour after you sent it. */
      const state = tags.includes("brand-day-paid")
        ? "They have already paid, so this is them coming back."
        : "They have not paid yet.";

      const url = process.env.SLACK_WEBHOOK_BOOKINGS || process.env.SLACK_WEBHOOK_URL;
      if (url) {
        try {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: [
                `:eyes: *${who} opened their link.*`,
                state,
                `<${contactUrl(contactId)}|Open them in GoHighLevel>`,
              ].join("\n"),
            }),
          });
        } catch {
          /* An alert must never cost somebody their page. */
        }
      }
    }

    /* The trail, and the plain last-seen stamp beside it. One write. */
    const trailField = process.env.GHL_FIELD_JOURNEY_TRAIL || TRAIL_FIELD_DEFAULT;
    const pageName = String(page || "").trim().slice(0, 24).replace(/[^a-z0-9 -]/gi, "");
    if (trailField && pageName) {
      const current = (contact?.customFields || []).find((f: any) => f?.id === trailField)?.value || "";
      const next = appendTrail(String(current), pageName, new Date());
      if (next !== String(current)) {
        await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: GHL_VERSION,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ customFields: [{ id: trailField, value: next }] }),
        }).catch((err) => console.error("journey trail write failed:", err));
      }
    }

    const lastSeenField = process.env.GHL_FIELD_HUB_LAST_SEEN;
    if (lastSeenField) {
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          customFields: [{ id: lastSeenField, value: new Date().toISOString() }],
        }),
      }).catch(() => {
        /* logged below by absence, not worth failing a page load */
      });
    }

    /*
      Hand the page back what it already knows, so a client who signed on their
      laptop and opens the link on their phone sees the right state rather than
      being asked to sign again.
    */
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        signed: tags.includes("step-1-signed"),
        paid: tags.includes("step-2-paid"),
        callsBooked: tags.includes("step-3-calls-booked"),
        /*
          The Brand Day half, for /lock-in. That page used to believe
          localStorage, which is per browser, so one machine that had ever paid
          showed "You're locked in" for every contact opened in it afterwards.
          The tags are the record, so the page asks for them.
        */
        brandDayPaid: tags.includes("brand-day-paid"),
        brandDayBooked: tags.includes("brand-day-booked"),
        name: fullName,
        email: hasPaid ? contact?.email || "" : "",
      }),
    };
  } catch (err) {
    console.error("track-hub error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };
