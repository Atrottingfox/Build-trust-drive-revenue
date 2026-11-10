import type { Handler } from "@netlify/functions";

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
    - 10 paid spots (counted from Stripe, the source of truth)
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

const PAYMENT_KIND = "founding-90";
const TOTAL_SPOTS = 10;
const PRICE_AUD_CENTS = 1000000;
const PRODUCT_NAME = "Authority Engine 90 Day Install. Founding Fast Action, paid in full";
const INVOICE_DESCRIPTION =
  "Brand Day plus 90 days of implementation. Founding fast action price, paid in full.";

/* Midnight at the end of 30 November, Brisbane (UTC+10, no daylight saving). */
const CLOSES_AT = new Date("2026-12-01T00:00:00+10:00");

const PAGE = "https://authorityengine.com.au/founding";

const json = (body: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(body) });

function stripeKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
}

async function stripe(path: string, init: { method?: string; form?: URLSearchParams } = {}) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: init.method || "GET",
    headers: {
      Authorization: `Bearer ${stripeKey()}`,
      ...(init.form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init.form ? init.form.toString() : undefined,
  });
  return { ok: res.ok, status: res.status, data: await res.json() };
}

/* Paid spots so far, or null when Stripe will not say. */
async function soldCount(): Promise<number | null> {
  try {
    const q = encodeURIComponent(`status:'succeeded' AND metadata['payment']:'${PAYMENT_KIND}'`);
    const r = await stripe(`payment_intents/search?query=${q}&limit=100`);
    if (!r.ok) {
      console.error("founding-checkout: search failed", r.status, JSON.stringify(r.data?.error || {}));
      return null;
    }
    return Array.isArray(r.data?.data) ? r.data.data.length : null;
  } catch {
    return null;
  }
}

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

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* An alert that fails must not fail the thank you page. */
  }
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

    /* One alert per sale. The flag lives on the session itself, so a refresh
       of the thank you page never posts it twice. */
    if (paid && session.metadata?.alerted !== "1") {
      const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-AU", {
        style: "currency",
        currency: (session.currency || "aud").toUpperCase(),
      });
      await slack(
        [
          `:moneybag: *${d.name || d.email || "Somebody"} just bought the founding 90 Day (fast action, paid in full).*`,
          `${amount} received.`,
          `Email: ${d.email || "not given"}   Phone: ${d.phone || "not given"}`,
          `Set up their WhatsApp now, give them the SOPs, playbooks, training videos and early office hours, and lock in their Brand Day date.`,
        ].join("\n")
      );
      await stripe(`checkout/sessions/${id}`, {
        method: "POST",
        form: new URLSearchParams({ "metadata[alerted]": "1" }),
      });
    }

    return json({ paid, firstName });
  }

  return { statusCode: 400, headers, body: JSON.stringify({ error: "unknown action" }) };
};

export { handler };
