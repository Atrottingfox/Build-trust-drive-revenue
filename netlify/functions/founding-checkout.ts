import type { Handler } from "@netlify/functions";
import { addToWaitlist, CLOSES_AT, handleFoundingSale, PAYMENT_KIND, soldCount, stripe, stripeKey, TOTAL_SPOTS } from "./_founding";

/*
  The founding 90 Day offer at /founding. Buy straight off the page, no
  application, no GHL contact first.

  One function, three jobs:

    GET                          -> is it open, and how many spots are left
    POST { action: "checkout" }  -> a hosted Stripe Checkout URL for $10,000
    POST { action: "confirm", sessionId } -> the thank you state, plus one
                                    Slack alert per sale

  Hosted checkout rather than the embedded one /lock-in uses. There is no
  contact id to tie the payment to here, and the hosted page works on any phone
  with Apple Pay and Google Pay already in it.

  Closes itself on either limit, whichever comes first:
    - 5 paid spots (counted from Stripe, the source of truth). Intro offer,
      5 founders starting in January (Sean, 11 Nov 2026)
    - the end of 30 November, Brisbane time

  The spot count uses Stripe's PaymentIntent search, which needs read on
  PaymentIntents. If the key cannot search, the page still sells and shows no
  live count. A missing permission must never stop somebody paying.

  The Stripe webhook (stripe-events) sees these as metadata.payment =
  "founding-90". This function raises the sale alert itself, so the webhook
  does not need to know about it.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const PRICE_AUD_CENTS = 1000000;
const PRODUCT_NAME = "Authority Engine 90 Day Install. Founding Fast Action, paid in full";
const INVOICE_DESCRIPTION =
  "Brand Day plus 90 days of implementation. Founding fast action price, paid in full.";

const PAGE = "https://authorityengine.com.au/founding";

const json = (body: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(body) });

async function status() {
  const closedByDate = Date.now() >= CLOSES_AT.getTime();
  const sold = await soldCount();
  const remaining = sold === null ? null : Math.max(0, TOTAL_SPOTS - sold);
  return {
    open: !closedByDate && remaining !== 0,
    remaining,
    total: TOTAL_SPOTS,
    closesAt: CLOSES_AT.toISOString(),
  };
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  if (!stripeKey()) {
    return json({ configured: false, open: false, missing: ["STRIPE_SECRET_KEY or STRIPE_API_KEY"] });
  }

  if (event.httpMethod === "GET") {
    return json({ configured: true, ...(await status()) });
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "bad json" }) };
  }

  /* ---------- Checkout ---------- */
  if (body.action === "checkout") {
    const s = await status();
    if (!s.open) return json({ configured: true, ...s, url: null });

    const form = new URLSearchParams({
      mode: "payment",
      success_url: `${PAGE}?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: PAGE,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": String(PRICE_AUD_CENTS),
      "line_items[0][price_data][product_data][name]": PRODUCT_NAME,
      /* WhatsApp is set up as soon as they buy, so the number is required. */
      "phone_number_collection[enabled]": "true",
      "billing_address_collection": "required",
      "customer_creation": "always",
      /* A numbered tax invoice, not just a receipt. Flows into Xero. */
      "invoice_creation[enabled]": "true",
      "invoice_creation[invoice_data][description]": INVOICE_DESCRIPTION,
      "invoice_creation[invoice_data][metadata][payment]": PAYMENT_KIND,
      "metadata[payment]": PAYMENT_KIND,
      /* On the PaymentIntent too, which is what the spot count searches. */
      "payment_intent_data[metadata][payment]": PAYMENT_KIND,
      "payment_intent_data[description]": INVOICE_DESCRIPTION,
      /* Unpaid sessions expire after 30 minutes so nobody sits on a spot. */
      "expires_at": String(Math.floor(Date.now() / 1000) + 30 * 60),
    });

    const r = await stripe("checkout/sessions", { method: "POST", form });
    if (!r.ok) {
      const e = r.data?.error || {};
      console.error("founding-checkout: session create failed", r.status, JSON.stringify(e));
      return json({ configured: false, error: true, stripeMessage: e.message || null });
    }
    return json({ configured: true, url: r.data.url, amountCents: PRICE_AUD_CENTS });
  }

  /* ---------- Confirm (the thank you page) ---------- */
  if (body.action === "confirm") {
    const id = String(body.sessionId || "");
    if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "bad session id" }) };
    }

    const r = await stripe(`checkout/sessions/${id}`);
    const session = r.data || {};
    if (!r.ok || session?.metadata?.payment !== PAYMENT_KIND) {
      return json({ paid: false });
    }

    const paid = session.payment_status === "paid";
    const d = session.customer_details || {};
    const firstName = String(d.name || "").split(" ")[0] || "";

    /* GHL contact, founding-paid tag, Slack alert. Once per sale: the flag
       lives on the session, so a refresh or the sweep never repeats it. */
    if (paid) await handleFoundingSale(session, "thank-you page");

    return json({ paid, firstName });
  }

  /* ---------- Waitlist (once full or closed) ---------- */
  if (body.action === "waitlist") {
    const email = String(body.email || "").trim().slice(0, 120);
    const name = String(body.name || "").replace(/[<>*_`~|]/g, "").trim().slice(0, 80);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "email" }) };
    }
    await addToWaitlist(email, name);
    return json({ ok: true });
  }

  return { statusCode: 400, headers, body: JSON.stringify({ error: "unknown action" }) };
};

export { handler };
