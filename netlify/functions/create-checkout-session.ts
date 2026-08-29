import type { Handler } from "@netlify/functions";
import { isTestContact, priceCents } from "./_pricing";

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

/*
  Used only when STRIPE_PRICE_ID is unset. Matches the existing Stripe product.

  CHECKOUT_AMOUNT_CENTS overrides it, which exists so the real page can be walked
  end to end for a dollar instead of five thousand. Set it, run the journey,
  unset it. A test that skips the checkout is not a test of the checkout.
*/
const PRICE_AUD_CENTS = Number(process.env.CHECKOUT_AMOUNT_CENTS) || 500000;
const PRODUCT_NAME = "VIP In person Strategy Day";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/*
  brand.contentengine.live creates the client workspace from Stripe's
  `checkout.session.completed` event, and reads these four keys off the session
  metadata. Its prep workbook then lives at
  https://brand.contentengine.live/workbooks/prep?client=<slug>

  brand_day_date comes from the booking. The calendar comes first now, so the
  date is already known by the time this session is created.
*/
function slugify(name: string): string {
  return (name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/*
  Looks up the contact so the client workspace is named after the person rather
  than an id. Kept on a short leash: this sits in the payment path, and a slow
  GHL must never hold up someone's checkout. A failure here costs the automatic
  workspace, not the sale.
*/
async function clientMetadata(contactId: string): Promise<Record<string, string>> {
  const token = process.env.GHL_TOKEN;
  if (!token || !contactId) return {};

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2500);
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
      signal: ctrl.signal,
    });
    if (!res.ok) return {};

    const contact = (await res.json())?.contact || {};
    const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ").trim();
    const slug = slugify(name);
    if (!slug) return {};

    const locationFieldId = process.env.GHL_FIELD_LOCATION_CITY;
    const location = locationFieldId
      ? (contact.customFields || []).find((f: any) => f.id === locationFieldId)?.value || ""
      : "";

    return { client_slug: slug, client_name: name, brand_day_date: "", location };
  } catch {
    // Aborted or unreachable. Take the payment anyway.
    return {};
  } finally {
    clearTimeout(timer);
  }
}

/*
  The contact id travels on the return URL.

  It used to be dropped on the way back from Stripe and read out of
  localStorage instead, which works right up until it is a different browser,
  a phone, or a private window. Then a client who has just paid $5,000 lands on
  a page that has no idea who they are: no confirmation, no calendar, no
  "You're locked in" email, and nothing anywhere says why.

  Stripe already knows the id, so it goes in the URL it sends them back to.
  Nothing has to be remembered, and nothing can be forgotten.
*/
const returnUrl = (contactId?: string) =>
  "https://authorityengine.com.au/lock-in?paid=1&session_id={CHECKOUT_SESSION_ID}" +
  (contactId ? `&c=${encodeURIComponent(contactId)}` : "");

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
    const { contactId, brandDayDate } = JSON.parse(event.body || "{}");

    /* A dollar for a test contact, the real price for everybody else. Asked
       once and used for both the catalogue decision and the inline amount, so
       the two can never disagree. */
    const isTest = await isTestContact(contactId);
    const amountCents = isTest ? priceCents("CHECKOUT_AMOUNT_CENTS", true) : PRICE_AUD_CENTS;

    const form = new URLSearchParams({
      "ui_mode": "embedded",
      "mode": "payment",
      "line_items[0][quantity]": "1",
      "return_url": returnUrl(contactId ? String(contactId) : undefined),
      /*
        The two lines that make the 90 Day Install chargeable later without
        asking for the card again. off_session saves the payment method for
        merchant initiated charges, and that needs a Customer to attach to, so
        one is always created rather than only when Stripe decides it is needed.
      */
      "payment_intent_data[setup_future_usage]": "off_session",

      /*
        A real invoice, not just a receipt.

        Stripe issues a receipt by default. A receipt has no invoice number and
        is not a tax document, so a bookkeeper has to reconstruct one. With this
        on, Stripe finalises a numbered invoice against the customer for every
        payment, which is what flows into Xero and what a client's own
        accountant expects to be given.
      */
      "invoice_creation[enabled]": "true",
      "invoice_creation[invoice_data][description]":
        "Brand Builder Day. One full day on site: brand, positioning, content system and shoot.",
      "customer_creation": "always",
    });

    /*
      Prefer the catalogue price so Stripe reporting stays tied to one product.
      Without it, bill the same amount inline so a missing STRIPE_PRICE_ID never
      stops anyone paying.
    */
    // An explicit test amount always wins, even over the catalogue price.
    if (priceId && !process.env.CHECKOUT_AMOUNT_CENTS && !isTest) {
      form.set("line_items[0][price]", priceId);
    } else {
      form.set("line_items[0][price_data][currency]", "aud");
      form.set("line_items[0][price_data][unit_amount]", String(amountCents));
      form.set("line_items[0][price_data][product_data][name]", PRODUCT_NAME);
    }

    /*
      Ties the payment to the exact GHL contact. Stripe rejects an empty value,
      so it is only sent when we actually have one. A missing id means GHL
      degraded earlier: the payment must still go through and gets reconciled by
      hand.
    */
    if (contactId) form.set("client_reference_id", String(contactId));

    /*
      Metadata for brand.contentengine.live. Its stripe-webhook function reads
      these to create the client workspace and, with it, their prep doc.
    */
    const meta = await clientMetadata(String(contactId || ""));
    // The date is known by now: they pick it before they pay.
    if (brandDayDate) meta.brand_day_date = String(brandDayDate);
    for (const [k, v] of Object.entries(meta)) form.set(`metadata[${k}]`, v);

    /*
      What this payment is, so the Stripe webhook can recognise it.

      Without it, a Brand Day payment is indistinguishable from anything else on
      the account, and stripe-events ignored it. That mattered: lock-in-paid only
      runs if the browser comes back from checkout, so somebody who paid and
      closed the tab was never tagged, never got a confirmation, and nothing
      anywhere noticed a five thousand dollar payment had arrived.
    */
    form.set("metadata[payment]", "brand-day");

    if (contactId) {
      form.set("metadata[ghl_contact_id]", String(contactId));
      form.set("invoice_creation[invoice_data][metadata][ghl_contact_id]", String(contactId));
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
      /*
        Surface Stripe's own reason. It is almost always a restricted key
        missing a permission, and without it the page just silently falls back
        to the buy button with no clue why. Stripe error messages carry no
        secrets, only the code and the human readable message are passed on.
      */
      const e = session?.error || {};
      console.error("Stripe session create failed:", res.status, JSON.stringify(e));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          configured: false,
          error: true,
          stripeCode: e.code || e.type || null,
          stripeMessage: e.message || null,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      /* The amount comes back so what is being charged can be checked without
         reading the Stripe key, which is the only way anybody could confirm a
         rehearsal really is a dollar and a real sale really is not. */
      body: JSON.stringify({
        configured: true,
        clientSecret: session.client_secret,
        amountCents,
        test: isTest,
      }),
    };
  } catch (err) {
    // Fall back rather than block. A broken embed must never stop someone paying.
    console.error("create-checkout-session error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ configured: false, error: true }) };
  }
};

export { handler };
