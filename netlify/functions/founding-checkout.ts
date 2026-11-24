import { provisionPortal } from "./_portal";
import { GHL_API, GHL_VERSION } from "./_ghl";
import { TEST_CENTS, TEST_TAG } from "./_pricing";
import type { Handler } from "@netlify/functions";
import { addToWaitlist, currentIntake, handleFoundingSale, PAYMENT_KIND, stripe, stripeKey } from "./_founding";

/*
  The founding 90 Day offer at /founding. Buy straight off the page, no
  application, no GHL contact first.

  One function, three jobs:

    GET                          -> is it open, and how many spots are left
    POST { action: "checkout" }  -> a hosted Stripe Checkout URL for $10,000 + GST ($11,000)
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

/* $10,000 + 10% GST = $11,000 (Sean, 13 Nov 2026: the $10,000 is not GST inclusive).
   Same convention as advisory.ts and founder-partner.ts: one line, GST inclusive total. */
const PRICE_AUD_CENTS = 1100000;
const PRODUCT_NAME = "Authority Engine 90 Day Install. Founding, paid in full ($10,000 + GST)";
const INVOICE_DESCRIPTION =
  "Brand Day plus 90 days of implementation. Founding price, paid in full. $10,000 plus 10% GST ($1,000), $11,000 total.";
/* February intake (Sean, 16 Nov 2026): $15,000 + 10% GST = $16,500. */
const FEB_PRICE_AUD_CENTS = 1650000;
const FEB_PRODUCT_NAME = "Authority Engine 90 Day Install. February intake, paid in full ($15,000 + GST)";
const FEB_INVOICE_DESCRIPTION =
  "Brand Day plus 90 days of implementation, February intake. Paid in full. $15,000 plus 10% GST ($1,500), $16,500 total.";

const PAGE = "https://authorityengine.com.au/founding";

/*
  Brand Day credit (Sean, 24 Nov 2026). Someone who has already paid for a
  Brand Day pays $5,000 + GST less. Only these GHL contact ids get it, through
  their personal link /founding?c=<contact id>. Still a founding sale: same
  metadata, takes one of the 5 spots, same portal and alerts.
*/
const CREDIT_CONTACTS: Record<string, string> = {
  "4h47HYqgK7VD4eaExDAI": "Erina Roch, UpScale. Brand Day already paid.",
  "eSfrsm52xbz2pNxE7v7j": "Jack O'Brien, Clinic Mastery. Brand Day already paid.",
};
const CREDIT_AUD_CENTS = 550000; /* $5,000 + 10% GST */
const hasCredit = (id: unknown) => typeof id === "string" && Object.prototype.hasOwnProperty.call(CREDIT_CONTACTS, id);

/*
  A $1 test run (Sean, 12 Nov 2026). /founding?test=<email> passes that email
  here. Only a GHL contact with that exact email AND the zz-test tag pays $1,
  the same rule as every other checkout (see _pricing.ts). Anybody else, or GHL
  being unreachable, pays the real price. A test sale is marked on the
  PaymentIntent as founding-90-test, so it never uses one of the 5 spots.
*/
async function isTestEmail(email: string): Promise<boolean> {
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  const clean = email.trim().toLowerCase();
  if (!token || !location || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return false;
  try {
    const r = await fetch(`${GHL_API}/contacts/?locationId=${encodeURIComponent(location)}&query=${encodeURIComponent(clean)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
    });
    if (!r.ok) return false;
    const match = ((await r.json())?.contacts || []).find((c: any) => String(c?.email || "").toLowerCase() === clean);
    return Boolean(match && (match.tags || []).includes(TEST_TAG));
  } catch {
    return false;
  }
}

const json = (body: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(body) });

async function status() {
  const c = await currentIntake();
  return {
    open: c.intake !== null,
    intake: c.intake,
    remaining: c.remaining,
    total: c.total,
    closesAt: c.closesAt,
  };
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  if (!stripeKey()) {
    return json({ configured: false, open: false, missing: ["STRIPE_SECRET_KEY or STRIPE_API_KEY"] });
  }

  if (event.httpMethod === "GET") {
    return json({ configured: true, ...(await status()), credit: hasCredit(event.queryStringParameters?.c) });
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

    /* A "+" in the page address (?test=sean+zztest@...) arrives as a space, and
       no email has a space, so it is put back (2026-11-12: the test ran at the
       full price twice because of it). */
    const testEmail = typeof body.testEmail === "string" ? body.testEmail.slice(0, 120).trim().replace(/\s+/g, "+") : "";
    const isTest = testEmail ? await isTestEmail(testEmail) : false;
    const feb = s.intake === "february";
    const credit = !isTest && hasCredit(body.contactId);
    const full = feb ? FEB_PRICE_AUD_CENTS : PRICE_AUD_CENTS;
    const cents = isTest ? TEST_CENTS : credit ? full - CREDIT_AUD_CENTS : full;
    const money = (c: number) => c.toLocaleString("en-AU", { maximumFractionDigits: 0 });
    const ex = money(cents / 110), gst = money(cents / 1100), total = money(cents / 100);
    const productName = credit
      ? `Authority Engine 90 Day Install. ${feb ? "February intake" : "Founding"}, Brand Day already paid ($${ex} + GST)`
      : feb ? FEB_PRODUCT_NAME : PRODUCT_NAME;
    const invoiceDescription = credit
      ? `90 days of implementation. ${feb ? "February intake" : "Founding price"}, paid in full, Brand Day already paid and taken off. $${ex} plus 10% GST ($${gst}), $${total} total.`
      : feb ? FEB_INVOICE_DESCRIPTION : INVOICE_DESCRIPTION;

    const form = new URLSearchParams({
      mode: "payment",
      success_url: `${PAGE}?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: PAGE,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": String(cents),
      "line_items[0][price_data][product_data][name]": productName,
      /* WhatsApp is set up as soon as they buy, so the number is required. */
      "phone_number_collection[enabled]": "true",
      "billing_address_collection": "required",
      "customer_creation": "always",
      /* A numbered tax invoice, not just a receipt. Flows into Xero. */
      "invoice_creation[enabled]": "true",
      "invoice_creation[invoice_data][description]": invoiceDescription,
      "invoice_creation[invoice_data][metadata][payment]": PAYMENT_KIND,
      "metadata[payment]": PAYMENT_KIND,
      "metadata[intake]": s.intake || "january",
      "payment_intent_data[metadata][intake]": s.intake || "january",
      /* On the PaymentIntent too, which is what the spot count searches. */
      "payment_intent_data[metadata][payment]": isTest ? `${PAYMENT_KIND}-test` : PAYMENT_KIND,
      "payment_intent_data[description]": invoiceDescription,
      /* Unpaid sessions expire after 30 minutes so nobody sits on a spot. */
      "expires_at": String(Math.floor(Date.now() / 1000) + 30 * 60),
    });

    if (credit) {
      form.set("metadata[credit]", "brand-day");
      form.set("metadata[contact_id]", String(body.contactId));
      form.set("payment_intent_data[metadata][credit]", "brand-day");
    }

    if (isTest) {
      form.set("customer_email", testEmail.trim().toLowerCase());
      form.set("metadata[test]", "1");
    }

    const r = await stripe("checkout/sessions", { method: "POST", form });
    if (!r.ok) {
      const e = r.data?.error || {};
      console.error("founding-checkout: session create failed", r.status, JSON.stringify(e));
      return json({ configured: false, error: true, stripeMessage: e.message || null });
    }
    return json({ configured: true, url: r.data.url, amountCents: cents });
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
    /* Sean, 2026-11-11: paid > portal for the first time, the same flow for
       every client. The thank you page hands them their one time "set your
       password" link straight away. Safe to ask twice: an unused link is
       reused, and an existing account gets a log in link instead. */
    const portal = paid ? await provisionPortal({ email: d.email, name: d.name }) : {};

    return json({ paid, firstName, portalUrl: portal.claimUrl || portal.loginUrl || null });
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
