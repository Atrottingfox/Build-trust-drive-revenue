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

  Needs one env var, either name:

    STRIPE_SECRET_KEY   sk_live_..., or
    STRIPE_API_KEY      rk_live_... restricted key with Checkout Sessions write

  A restricted key is the better choice. It needs write on Checkout Sessions and
  read on Checkout Sessions for verify-payment to confirm a payment afterwards.

  STRIPE_PRICE_ID is optional. Set it to bill against the existing product in
  the Stripe catalogue, which keeps reporting tidy. Left unset, the session is
  built from the amount below instead, so the checkout works off the secret key
  alone.

  Without the secret key this returns configured:false and the page falls back
  to the buy button, which still works. It never hard fails.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

/* Used only when STRIPE_PRICE_ID is unset. Matches the existing Stripe product. */
const PRICE_AUD_CENTS = 500000;
const PRODUCT_NAME = "VIP In person Strategy Day";

const RETURN_URL =
  "https://authorityengine.com.au/lock-in?paid=1&session_id={CHECKOUT_SESSION_ID}";

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secret) {
    // Not an error. The page reads this and renders the buy button instead.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: false, missing: ["STRIPE_SECRET_KEY or STRIPE_API_KEY"] }),
    };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    const form = new URLSearchParams({
      "ui_mode": "embedded",
      "mode": "payment",
      "line_items[0][quantity]": "1",
      "return_url": RETURN_URL,
      // Keeps the card on file so the 90 Day Install can be charged later
      // without asking for it again.
      "payment_intent_data[setup_future_usage]": "off_session",
    });

    /*
      Prefer the catalogue price so Stripe reporting stays tied to one product.
      Without it, bill the same amount inline so a missing STRIPE_PRICE_ID never
      stops anyone paying.
    */
    if (priceId) {
      form.set("line_items[0][price]", priceId);
    } else {
      form.set("line_items[0][price_data][currency]", "aud");
      form.set("line_items[0][price_data][unit_amount]", String(PRICE_AUD_CENTS));
      form.set("line_items[0][price_data][product_data][name]", PRODUCT_NAME);
    }

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
