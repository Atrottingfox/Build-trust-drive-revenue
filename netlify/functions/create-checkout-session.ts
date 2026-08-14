import type { Handler } from "@netlify/functions";

/*
  Creates a Stripe Checkout Session in embedded mode, so the card fields render
  inside /lock-in instead of Stripe's overlay.

  Two things this buys beyond looks:

  1. `client_reference_id` is set server side from the GHL contact id, so the
     payment is tied to a person rather than matched on an email address later.
  2. `setup_future_usage: off_session` saves the card, which is what makes it
     possible to charge the 90 Day Install at the end of the Day without asking
     for the card again.

  Stripe's REST API is called directly rather than via the SDK. It is one form
  encoded POST and it keeps a dependency out of the bundle.

  Needs two env vars. Without either, this returns configured:false and the page
  falls back to the buy button, which still works. It never hard fails.

    STRIPE_SECRET_KEY   sk_live_... or a restricted key with Checkout Sessions write
    STRIPE_PRICE_ID     price_... for the $5,000 AUD Brand Builder Day
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const RETURN_URL =
  "https://authorityengine.com.au/lock-in?paid=1&session_id={CHECKOUT_SESSION_ID}";

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secret || !priceId) {
    // Not an error. The page reads this and renders the buy button instead.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        configured: false,
        missing: [!secret && "STRIPE_SECRET_KEY", !priceId && "STRIPE_PRICE_ID"].filter(Boolean),
      }),
    };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    const form = new URLSearchParams({
      "ui_mode": "embedded",
      "mode": "payment",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "return_url": RETURN_URL,
      // Keeps the card on file so the 90 Day Install can be charged later
      // without asking for it again.
      "payment_intent_data[setup_future_usage]": "off_session",
    });

    /*
      Ties the payment to the exact GHL contact. Stripe rejects an empty value,
      so it is only sent when we actually have one. A missing id means GHL
      degraded earlier: the payment must still go through and gets reconciled by
      hand.
    */
    if (contactId) form.set("client_reference_id", String(contactId));

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe session create failed:", res.status, JSON.stringify(session?.error || session));
      return { statusCode: 200, headers, body: JSON.stringify({ configured: false, error: true }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: true, clientSecret: session.client_secret }),
    };
  } catch (err) {
    // Fall back rather than block. A broken embed must never stop someone paying.
    console.error("create-checkout-session error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ configured: false, error: true }) };
  }
};

export { handler };
