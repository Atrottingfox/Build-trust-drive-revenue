import type { Handler } from "@netlify/functions";

/*
  Creates the Stripe Checkout Session for the Brand Builder Day.

  The GHL contact id arrives from /lock-in?c=<id> and rides through as
  client_reference_id, so the payment matches back to that exact contact rather
  than being guessed from an email address.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const SITE = "https://authorityengine.com.au";

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_BRAND_DAY_PRICE_ID;

  if (!secret || !priceId) {
    console.error("Stripe not configured. Need STRIPE_SECRET_KEY and STRIPE_BRAND_DAY_PRICE_ID.");
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Payment not configured" }) };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    // Preserve the contact id across the Stripe round trip so step 2 can tag GHL.
    const successUrl = `${SITE}/lock-in?paid=1${
      contactId ? `&c=${encodeURIComponent(contactId)}` : ""
    }`;
    const cancelUrl = `${SITE}/lock-in${contactId ? `?c=${encodeURIComponent(contactId)}` : ""}`;

    const form = new URLSearchParams({
      mode: "payment",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: successUrl,
      cancel_url: cancelUrl,

      /*
        Keep the card on file so the 90-day install can be charged on the day,
        in the room, at the moment they say yes. Without these two lines the
        install means sending a link and waiting, which is where deals cool off.

        `customer_creation: always` gives us a Stripe Customer even for a
        one-off payment; `setup_future_usage: off_session` stores the payment
        method against it so it can be charged when they are not present.

        Charging it still requires their agreement to that specific amount.
        Verbal on the day is fine. The disclosure on /lock-in is what makes a
        later charge defensible rather than a chargeback.
      */
      customer_creation: "always",
      "payment_intent_data[setup_future_usage]": "off_session",
    });

    if (contactId) {
      form.set("client_reference_id", contactId);
      form.set("metadata[ghl_contact_id]", contactId);
      form.set("metadata[product]", "brand_day");
    }

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
      console.error("Stripe session error:", JSON.stringify(session));
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Could not start checkout" }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error("lock-in-checkout error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Something went wrong" }) };
  }
};

export { handler };
