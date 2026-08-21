import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Takes the first of the two 90 Day Install payments.

  It attaches the Stripe customer created at the Brand Day, so their saved card
  appears as a one-click option rather than something to re-type. That is the
  difference between "confirm" and "go and find your wallet" at the exact moment
  someone has just said yes.

  This is Checkout rather than a silent off-session charge on purpose. A five
  figure amount is far more likely than five thousand to make a bank ask for
  authentication, and an off-session charge cannot answer that: it just fails.
  Checkout can, because the cardholder is right there.

  The second payment is different. By then the card is proven and they are not
  on a page, so charge-install takes it off-session on a schedule.

  Env:
    INSTALL_PAYMENT_1_CENTS   first payment, in cents
    INSTALL_PAYMENT_2_CENTS   second payment, used only to state the total here
    INSTALL_PAYMENT_2_DAYS    days until the second falls due (default 31)
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

/* The contact id travels back too, so the page never has to remember who
   they are. See create-checkout-session for why. */
const returnUrl = (contactId?: string) =>
  "https://authorityengine.com.au/install?paid=1&session_id={CHECKOUT_SESSION_ID}" +
  (contactId ? `&c=${encodeURIComponent(contactId)}` : "");

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const amount = process.env.INSTALL_PAYMENT_1_CENTS;
  const token = process.env.GHL_TOKEN;

  if (!stripeKey || !amount) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        configured: false,
        missing: [
          !stripeKey && "STRIPE_SECRET_KEY or STRIPE_API_KEY",
          !amount && "INSTALL_PAYMENT_1_CENTS",
        ].filter(Boolean),
      }),
    };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    /*
      Look up the Stripe customer from the Brand Day so their card is offered
      rather than requested. Without it the checkout still works, they just have
      to type the card again.
    */
    let customerId: string | null = null;
    const customerField = process.env.GHL_FIELD_STRIPE_CUSTOMER;
    if (token && contactId && customerField) {
      try {
        const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
          headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
        });
        if (res.ok) {
          const contact = (await res.json())?.contact;
          customerId =
            (contact?.customFields || []).find((f: any) => f.id === customerField)?.value || null;
        }
      } catch {
        // Not worth blocking a payment over. They can enter the card.
      }
    }

    const form = new URLSearchParams({
      "ui_mode": "embedded",
      "mode": "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][price_data][product_data][name]": "90 Day Authority Engine Install, first payment",
      "return_url": returnUrl(contactId ? String(contactId) : undefined),
      // Keeps the card usable for the second payment without asking again.
      "payment_intent_data[setup_future_usage]": "off_session",

      /*
        The second instalment is already raised as a proper Stripe invoice. The
        first was only ever a receipt, so the same engagement produced two
        different kinds of paperwork. Both are invoices now.
      */
      "invoice_creation[enabled]": "true",
      "invoice_creation[invoice_data][description]":
        "90 Day Authority Engine Install, first instalment of two.",
    });

    if (customerId) {
      form.set("customer", customerId);
    } else {
      form.set("customer_creation", "always");
    }
    if (contactId) {
      form.set("client_reference_id", String(contactId));
      form.set("metadata[ghl_contact_id]", String(contactId));
      form.set("metadata[payment]", "install-1");
      form.set("invoice_creation[invoice_data][metadata][ghl_contact_id]", String(contactId));
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
    const session = await res.json();

    if (!res.ok) {
      const e = session?.error || {};
      console.error("install-checkout failed:", res.status, JSON.stringify(e));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ configured: false, error: true, stripeMessage: e.message || null }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        configured: true,
        clientSecret: session.client_secret,
        hasSavedCard: Boolean(customerId),
      }),
    };
  } catch (err) {
    console.error("install-checkout error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ configured: false, error: true }) };
  }
};

export { handler };
