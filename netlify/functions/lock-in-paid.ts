import type { Handler } from "@netlify/functions";

/*
  Tags the GHL contact `brand-day-paid` after Stripe succeeds.

  This is why the Brand Day needs no Stripe webhook. The lock-in page only
  reveals the calendar once checkout has succeeded, so the success redirect is a
  reliable "they paid" signal and we call GHL ourselves with a contact id we
  already hold. No payload mapping, no guessing at field paths, no matching on
  email address.

  It also tags `paid-no-date`, and calendly-booked.ts removes that tag the moment
  a date is chosen. Between those two calls, `paid-no-date` means exactly what it
  says: this person has paid $5,000 and has no Brand Day.

  That gap is real. Payment now comes before the calendar, so someone can close
  the tab on the success redirect and end up paid with nothing booked. The tag
  makes that visible as a filter in GHL instead of silent, and gives the chase
  workflow something to trigger on.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    if (!contactId) {
      // No id means the invitation email was missing ?c=. Log loudly: the
      // payment still happened and now has to be reconciled by hand.
      console.error("lock-in-paid called with no contactId. Payment cannot be matched to a contact.");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    const token = process.env.GHL_TOKEN;
    if (!token) {
      console.error("GHL_TOKEN not set, cannot tag brand-day-paid.");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ tags: ["brand-day-paid", "paid-no-date"] }),
    });

    if (!res.ok) {
      console.error("GHL tag failed:", res.status, await res.text(), "contact:", contactId);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    // Never surface an error here. They have paid; the page must let them
    // continue to the calendar regardless.
    console.error("lock-in-paid error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
  }
};

export { handler };
