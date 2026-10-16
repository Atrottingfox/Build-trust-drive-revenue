import type { Handler } from "@netlify/functions";

/*
  /advisory. Rhys Livingstone's ongoing Authority Engine Advisory.

  Sean, 16 Oct 2026: a $4,000 a month commitment, 12 months. Charged as
  $4,000 plus GST ($4,400), the same convention as the $8,000 build.

  A Stripe subscription, not hand raised invoices: twelve charges is what a
  subscription is for. Checkout takes the first month on the page and saves the
  card. verify then sets cancel_at twelve months out, so Stripe stops it by
  itself after the twelfth payment. Nothing here has to remember to.

  Signing goes through undeniability-part2 (action "sign", offer "advisory"),
  and the signature also rides on the subscription's metadata.

  ?test=1 on the page makes it $1 a DAY for 3 days, then it stops, so the
  repeat charge and the cap are both proven in two days.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const STRIPE = "https://api.stripe.com/v1";
const OFFER = "advisory-rhys";
const PRODUCT = "Authority Engine Advisory";
/* Cents. $4,000 + 10% GST. */
const MONTHLY_CENTS = 440000;
const TEST_CENTS = 100;
const MONTHS = 12;
/* Test mode bills daily and stops after this many, so the repeat and the cap
   can both be watched in two days instead of a year. */
const TEST_PAYMENTS = 3;

const ok = (body: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(body) });

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
  } catch {
    /* Never let alerting break a payment path. */
  }
}

const money = (cents: number) =>
  (cents / 100).toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });

/* Twelve calendar months after the start, less an hour, so the subscription
   ends just before a thirteenth invoice could ever be raised. */
function endOfTerm(startSec: number, test: boolean): number {
  /* Test: daily billing, three charges, then it stops. Same cap mechanism. */
  if (test) return startSec + TEST_PAYMENTS * 86400 - 3600;
  const d = new Date(startSec * 1000);
  d.setUTCMonth(d.getUTCMonth() + MONTHS);
  return Math.floor(d.getTime() / 1000) - 3600;
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  const key = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  if (!key) return ok({ configured: false });

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad body" }) };
  }
  const auth = { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" };
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";

  if (body.action === "checkout") {
    const test = body.test === true;
    const name = String(body.signatureName || "").trim().slice(0, 120);
    const version = String(body.termsVersion || "");
    if (!name || !version) return { statusCode: 400, headers, body: JSON.stringify({ error: "Sign first" }) };
    const amount = test ? TEST_CENTS : MONTHLY_CENTS;

    const meta = {
      offer: OFFER,
      signature_name: name,
      terms_version: version,
      signed_at: String(body.signedAt || ""),
      signed_ip: String(ip),
      ...(test ? { test: "1" } : {}),
    };

    const form = new URLSearchParams({
      ui_mode: "embedded",
      mode: "subscription",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][price_data][recurring][interval]": test ? "day" : "month",
      "line_items[0][price_data][product_data][name]": `${test ? "TEST. " : ""}${PRODUCT}, 12 months`,
      return_url:
        "https://authorityengine.com.au/advisory?paid=1&session_id={CHECKOUT_SESSION_ID}" + (test ? "&test=1" : ""),
      "subscription_data[description]": `${PRODUCT}. ${money(amount)} a month ($4,000 + GST), charged automatically for 12 months, then it stops.`,
    });
    for (const [k, v] of Object.entries(meta)) {
      form.set(`metadata[${k}]`, v);
      form.set(`subscription_data[metadata][${k}]`, v);
    }

    const res = await fetch(`${STRIPE}/checkout/sessions`, { method: "POST", headers: auth, body: form.toString() });
    const session = await res.json();
    if (!res.ok) {
      console.error("advisory checkout failed:", res.status, JSON.stringify(session?.error));
      return ok({ configured: false, error: true, stripeMessage: session?.error?.message || null });
    }
    return ok({ configured: true, clientSecret: session.client_secret, amountCents: amount, test });
  }

  if (body.action === "verify") {
    const sessionId = String(body.sessionId || "");
    if (!sessionId) return ok({ verified: false });

    const res = await fetch(`${STRIPE}/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const session = await res.json();
    if (!res.ok || session?.metadata?.offer !== OFFER) return ok({ verified: false });
    if (session.payment_status !== "paid") return ok({ verified: true, paid: false });

    const sub = session.subscription;
    const isTest = session.metadata?.test === "1";
    const amount = isTest ? TEST_CENTS : MONTHLY_CENTS;
    if (!sub?.id) {
      await slack(`:rotating_light: ${PRODUCT}: month 1 paid on ${sessionId} but no subscription came back. Check Stripe.`);
      return ok({ verified: true, paid: true, scheduled: false });
    }

    /* Already capped? A reload of the return page lands here again. */
    if (sub.cancel_at) return ok({ verified: true, paid: true, scheduled: true, endsAt: sub.cancel_at });

    const start = sub.start_date || sub.created || Math.floor(Date.now() / 1000);
    const endsAt = endOfTerm(start, isTest);
    const upd = await fetch(`${STRIPE}/subscriptions/${encodeURIComponent(sub.id)}`, {
      method: "POST",
      headers: auth,
      body: new URLSearchParams({ cancel_at: String(endsAt), proration_behavior: "none" }).toString(),
    });
    if (!upd.ok) {
      const err = (await upd.json())?.error?.message || "update failed";
      await slack(
        `:rotating_light: ${isTest ? "[TEST] " : ""}${PRODUCT}: ${session.metadata?.signature_name} paid month 1 but the 12 month end date did NOT set (${err}). ` +
          `Subscription ${sub.id} will keep charging until stopped. Reloading the return page retries.`
      );
      return ok({ verified: true, paid: true, scheduled: false });
    }

    const when = (s: number) =>
      new Date(s * 1000).toLocaleDateString("en-AU", { timeZone: "Australia/Brisbane", day: "numeric", month: "short", year: "numeric" });
    await slack(
      `:moneybag: ${isTest ? "[TEST] " : ""}*${session.metadata?.signature_name}* started ${PRODUCT}: ${money(amount)} paid, ` +
        `then ${money(amount)} automatically every ${isTest ? "day, 3 payments (test clock)" : "month, 12 payments"}, ending ${when(endsAt)}. Subscription ${sub.id}.`
    );
    return ok({ verified: true, paid: true, scheduled: true, endsAt });
  }

  return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown action" }) };
};

export { handler };
