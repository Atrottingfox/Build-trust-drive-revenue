import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, addTags, getTags } from "./_ghl";

/*
  Charges the card saved at Brand Day checkout, without the client present.

  This is the Strategy Day to 90 Day Install step. The card was stored
  off_session when they paid the $5,000, and the Stripe customer id was written
  onto their GHL contact, so moving someone up costs one tag rather than another
  payment conversation.

  Triggered from GHL: a workflow with a Custom Webhook action posting

      { "contactId": "{{contact.id}}" }

  to https://authorityengine.com.au/.netlify/functions/charge-install
  with header  x-charge-secret: <CHARGE_SECRET>

  This endpoint moves money, so it is deliberately awkward to fire by accident:

  - It refuses without the shared secret. A public endpoint that charges saved
    cards on request is an open till.
  - The amount comes from the environment, never the request. Whoever can call
    it cannot choose what to take.
  - It refuses if the contact already carries `install-charged`, and sends
    Stripe an idempotency key, so a workflow that re-enters or a webhook that
    retries cannot charge twice.
  - It ships disabled. Without CHARGE_SECRET and INSTALL_AMOUNT_CENTS it does
    nothing but say so.

  Outcomes are written back as tags so a workflow can act on either:
    install-charged          the money moved
    install-payment-failed   it did not, and someone needs to call them
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-charge-secret",
  "Content-Type": "application/json",
};

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.CHARGE_SECRET;
  const amount = process.env.INSTALL_AMOUNT_CENTS;
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const token = process.env.GHL_TOKEN;
  const customerField = process.env.GHL_FIELD_STRIPE_CUSTOMER;

  if (!secret || !amount || !stripeKey || !token || !customerField) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        charged: false,
        configured: false,
        missing: [
          !secret && "CHARGE_SECRET",
          !amount && "INSTALL_AMOUNT_CENTS",
          !stripeKey && "STRIPE_SECRET_KEY or STRIPE_API_KEY",
          !token && "GHL_TOKEN",
          !customerField && "GHL_FIELD_STRIPE_CUSTOMER",
        ].filter(Boolean),
      }),
    };
  }

  const supplied =
    event.headers["x-charge-secret"] || event.headers["X-Charge-Secret"] || "";
  if (supplied !== secret) {
    console.error("charge-install called with a bad or missing secret.");
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorised" }) };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");
    if (!contactId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "contactId required" }) };
    }

    // Already charged. Say so rather than doing it again.
    const tags = await getTags(token, contactId);
    if (tags.includes("install-charged")) {
      console.warn("charge-install skipped, already charged:", contactId);
      return { statusCode: 200, headers, body: JSON.stringify({ charged: false, reason: "already-charged" }) };
    }

    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
    });
    const contact = (await res.json())?.contact;
    const customerId = (contact?.customFields || []).find((f: any) => f.id === customerField)?.value;

    if (!customerId) {
      console.error("No Stripe customer on contact, cannot charge:", contactId);
      await addTags(token, contactId, ["install-payment-failed"]);
      return { statusCode: 200, headers, body: JSON.stringify({ charged: false, reason: "no-stripe-customer" }) };
    }

    /*
      Find the saved card. The one stored at Brand Day checkout is attached to
      this customer, and there is normally exactly one.
    */
    const pmRes = await fetch(
      `https://api.stripe.com/v1/payment_methods?customer=${encodeURIComponent(customerId)}&type=card&limit=1`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );
    const paymentMethod = (await pmRes.json())?.data?.[0]?.id;

    if (!paymentMethod) {
      console.error("Stripe customer has no saved card:", customerId, "contact:", contactId);
      await addTags(token, contactId, ["install-payment-failed"]);
      return { statusCode: 200, headers, body: JSON.stringify({ charged: false, reason: "no-saved-card" }) };
    }

    const form = new URLSearchParams({
      amount: String(amount),
      currency: "aud",
      customer: customerId,
      payment_method: paymentMethod,
      off_session: "true",
      confirm: "true",
      description: "90 Day Install",
      "metadata[ghl_contact_id]": String(contactId),
    });

    const payRes = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        // Survives a retrying webhook or a workflow that re-enters.
        "Idempotency-Key": `install-${contactId}`,
      },
      body: form.toString(),
    });
    const intent = await payRes.json();

    if (!payRes.ok || intent.status !== "succeeded") {
      /*
        The usual cause is a card that needs the cardholder present, which an
        off_session charge cannot do. That is a phone call, not a retry.
      */
      const reason = intent?.error?.message || intent?.status || "unknown";
      console.error("Install charge failed:", reason, "contact:", contactId, "customer:", customerId);
      await addTags(token, contactId, ["install-payment-failed"]);
      return { statusCode: 200, headers, body: JSON.stringify({ charged: false, reason }) };
    }

    await addTags(token, contactId, ["install-charged"]);
    console.log("Install charged:", intent.id, "contact:", contactId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ charged: true, paymentIntent: intent.id, amount: Number(amount) }),
    };
  } catch (err) {
    console.error("charge-install error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ charged: false, reason: "error" }) };
  }
};

export { handler };
