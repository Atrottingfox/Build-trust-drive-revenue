import type { Handler } from "@netlify/functions";

/*
  Asks Stripe whether a checkout session was actually paid, then tags GHL.

  Why this exists: /lock-in unlocks the calendar on `?paid=1`, which is a query
  string anyone can type. On the buy button path there is nothing better
  available, because the browser gets no proof. Embedded checkout returns a
  session id, and a session id can be checked against Stripe.

  So when a session id is present, the truth comes from Stripe rather than the
  URL, and the GHL tagging happens here on the server rather than in the
  browser. That is the difference between "the page thinks they paid" and "they
  paid".

  Falls back gracefully. No secret key means no verification is possible, and
  the page keeps its existing behaviour instead of locking a paying customer
  out.
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

  const secret = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;

  try {
    const { sessionId } = JSON.parse(event.body || "{}");

    if (!secret || !sessionId) {
      // Cannot verify. Say so plainly rather than guess either way.
      return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
    }

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${secret}` } }
    );
    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe session lookup failed:", res.status, JSON.stringify(session?.error || session));
      return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
    }

    if (session.payment_status !== "paid") {
      console.warn("Session presented but not paid:", sessionId, session.payment_status);
      return { statusCode: 200, headers, body: JSON.stringify({ verified: true, paid: false }) };
    }

    /*
      Stripe holds the contact id, put there when the session was created, so the
      browser is not trusted for this either. Tag from here.
    */
    const contactId = session.client_reference_id;
    const token = process.env.GHL_TOKEN;

    if (contactId && token) {
      const tagRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ tags: ["brand-day-paid", "paid-no-date"] }),
      });
      if (!tagRes.ok) {
        console.error("GHL tag failed after verified payment:", tagRes.status, await tagRes.text(), contactId);
      }
    } else if (!contactId) {
      console.error("Verified payment with no client_reference_id. Reconcile by hand:", sessionId);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ verified: true, paid: true, contactId: contactId || null }),
    };
  } catch (err) {
    // Never block. They may well have paid.
    console.error("verify-payment error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
  }
};

export { handler };
