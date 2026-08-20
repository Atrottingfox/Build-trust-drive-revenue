import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, addTags, getContact } from "./_ghl";

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

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = process.env.GHL_TOKEN;
  if (!token) return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };

  try {
    const { contactId } = JSON.parse(event.body || "{}");
    if (!contactId) return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };

    const contact = await getContact(token, contactId);
    const tags: string[] = contact?.tags || [];

    /*
      Name and email come back so /lock-in can prefill Calendly. They already
      typed both on the application; asking again at the moment they pick a
      date is friction for no reason.
    */
    const fullName = [contact?.firstName, contact?.lastName]
      .filter(Boolean).join(" ").trim() || contact?.name || "";

    if (!tags.includes("hub-opened")) {
      await addTags(token, contactId, ["hub-opened"]);
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
        email: contact?.email || "",
      }),
    };
  } catch (err) {
    console.error("track-hub error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };
