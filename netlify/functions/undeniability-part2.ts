import type { Handler } from "@netlify/functions";

/*
  /undeniability-part2. Rhys Livingstone's three payment agreement.

  Sean, 16 Oct 2026: AUD $8,000 plus GST today, again on day 31, again on day
  61. All three charged automatically to the card used today. Nobody collects
  anything.

  Self contained on purpose. It shares no code with /install or the Concierge,
  so neither of those can change what Rhys is charged, and this cannot change
  what anybody else is charged.

  Three actions, one function:

    sign      logs the signature (name, terms version, time, IP) and tells Slack
    checkout  the first $8,800, embedded Checkout, card saved for off session
    verify    on return from Stripe: confirms it was paid, then raises day 31
              and day 61 as draft invoices that Stripe finalises, and so charges,
              on those dates

  Both later invoices are raised at the first payment, not chained. That keeps
  the whole schedule inside Stripe, visible on Rhys's customer from day one,
  with no webhook or cron here that could quietly stop. The cost: if day 31
  fails, day 61 still runs. Void it in Stripe if that ever matters.

  Same instruments as the 90 Day second instalment, for the reasons written up
  in verify-payment: automatically_finalizes_at rather than due_date, and a
  guard on invoice metadata rather than idempotency keys, because a key caches
  failures too.

  Test mode (?test=1 on the page) charges a dollar at every step and labels
  everything TEST, so the whole path can be walked before Rhys sees it.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const STRIPE = "https://api.stripe.com/v1";
const OFFER = "undeniability-part2";
const PRODUCT = "Undeniable, Part 2";

/* Cents. $8,000 + 10% GST. */
const PAYMENT_CENTS = 880000;
const TEST_CENTS = 100;
/* Days after today. Counting today as day 1, these land on day 31 and day 61. */
const LATER = [
  { n: 2, days: 30, label: "second" },
  { n: 3, days: 60, label: "third" },
] as const;

const ok = (body: unknown) => ({ statusCode: 200, headers, body: JSON.stringify(body) });

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
    /* Never let alerting break a payment path. */
  }
}

const money = (cents: number) =>
  (cents / 100).toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });

const returnUrl = (test: boolean) =>
  `https://authorityengine.com.au/undeniability-part2?paid=1&session_id={CHECKOUT_SESSION_ID}` +
  (test ? "&test=1" : "");

/*
  Raises one later instalment as a draft invoice that Stripe finalises at
  `finalizeAt`. The invoice is created with pending items EXCLUDED and the line
  attached by id, because two instalments exist for one customer and "sweep in
  whatever is pending" would put both lines on the first invoice.

  Never throws. The first payment has already cleared.
*/
async function raiseInstalment(opts: {
  key: string;
  customerId: string;
  paymentMethod: string | null;
  sessionId: string;
  n: 2 | 3;
  label: string;
  days: number;
  amount: number;
  test: boolean;
  existing: any[];
}): Promise<{ id: string | null; at: number; error?: string }> {
  const { key, customerId, paymentMethod, sessionId, n, label, days, amount, test, existing } = opts;
  const at = Math.floor(Date.now() / 1000) + days * 86400;
  const auth = { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" };

  const already = existing.find(
    (i) => i?.metadata?.undeniable_p2_session === sessionId && i?.metadata?.instalment === String(n) && i?.status !== "void"
  );
  if (already) return { id: already.id, at: already.automatically_finalizes_at || at };

  try {
    const inv = await fetch(`${STRIPE}/invoices`, {
      method: "POST",
      headers: auth,
      body: new URLSearchParams({
        customer: customerId,
        collection_method: "charge_automatically",
        auto_advance: "true",
        automatically_finalizes_at: String(at),
        pending_invoice_items_behavior: "exclude",
        description: `${test ? "TEST. " : ""}${PRODUCT}, ${label} instalment of three. Charged automatically on day ${days + 1}.`,
        ...(paymentMethod ? { default_payment_method: paymentMethod } : {}),
        "metadata[offer]": OFFER,
        "metadata[undeniable_p2_session]": sessionId,
        "metadata[instalment]": String(n),
        ...(test ? { "metadata[test]": "1" } : {}),
      }).toString(),
    });
    const invoice = await inv.json();
    if (!inv.ok) return { id: null, at, error: invoice?.error?.message || "invoice failed" };

    const item = await fetch(`${STRIPE}/invoiceitems`, {
      method: "POST",
      headers: auth,
      body: new URLSearchParams({
        customer: customerId,
        invoice: invoice.id,
        amount: String(amount),
        currency: "aud",
        description: `${PRODUCT}, ${label} instalment ($8,000 + GST)`,
      }).toString(),
    });
    if (!item.ok) {
      const err = (await item.json())?.error?.message || "line failed";
      /* An empty draft would finalise as a $0 invoice. Delete it so a retry
         starts clean. */
      await fetch(`${STRIPE}/invoices/${encodeURIComponent(invoice.id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${key}` },
      }).catch(() => {});
      return { id: null, at, error: err };
    }
    return { id: invoice.id, at };
  } catch (e) {
    return { id: null, at, error: String(e) };
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  const key = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad body" }) };
  }
  const test = body.test === true;
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";

  if (body.action === "sign") {
    const name = String(body.signatureName || "").trim().slice(0, 120);
    const version = String(body.termsVersion || "");
    if (!name || !version) return { statusCode: 400, headers, body: JSON.stringify({ error: "signatureName and termsVersion are required" }) };
    const at = new Date().toISOString();
    console.log("Undeniable part 2 signed:", name, "terms:", version, "at:", at, "ip:", ip, test ? "TEST" : "");
    await slack(`${test ? "[TEST] " : ""}:writing_hand: *${name}* signed ${PRODUCT} (${version}) at ${at}. Payment is next.`);
    return ok({ ok: true, signedAt: at });
  }

  if (!key) return ok({ configured: false, missing: ["STRIPE_SECRET_KEY or STRIPE_API_KEY"] });

  if (body.action === "checkout") {
    const name = String(body.signatureName || "").trim().slice(0, 120);
    const version = String(body.termsVersion || "");
    const signedAt = String(body.signedAt || "");
    if (!name || !version) return { statusCode: 400, headers, body: JSON.stringify({ error: "Sign first" }) };

    const amount = test ? TEST_CENTS : PAYMENT_CENTS;
    const form = new URLSearchParams({
      ui_mode: "embedded",
      mode: "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][price_data][product_data][name]": `${test ? "TEST. " : ""}${PRODUCT}, payment 1 of 3`,
      "line_items[0][price_data][product_data][description]":
        `${money(amount)} today, $8,000 plus GST. Then ${money(amount)} charged automatically to this card on day 31, and ${money(amount)} on day 61. There is no fourth payment.`,
      return_url: returnUrl(test),
      customer_creation: "always",
      // Keeps the card usable for day 31 and day 61 without asking again.
      "payment_intent_data[setup_future_usage]": "off_session",
      "invoice_creation[enabled]": "true",
      "invoice_creation[invoice_data][description]": `${PRODUCT}, first instalment of three.`,
      "metadata[offer]": OFFER,
      "metadata[signature_name]": name,
      "metadata[terms_version]": version,
      "metadata[signed_at]": signedAt,
      "metadata[signed_ip]": String(ip),
      ...(test ? { "metadata[test]": "1" } : {}),
    });

    const res = await fetch(`${STRIPE}/checkout/sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const session = await res.json();
    if (!res.ok) {
      console.error("undeniability-part2 checkout failed:", res.status, JSON.stringify(session?.error));
      return ok({ configured: false, error: true, stripeMessage: session?.error?.message || null });
    }
    return ok({ configured: true, clientSecret: session.client_secret, amountCents: amount, test });
  }

  if (body.action === "verify") {
    const sessionId = String(body.sessionId || "");
    if (!sessionId) return ok({ verified: false });

    const res = await fetch(
      `${STRIPE}/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=payment_intent`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    const session = await res.json();
    if (!res.ok || session?.metadata?.offer !== OFFER) return ok({ verified: false });
    if (session.payment_status !== "paid") return ok({ verified: true, paid: false });

    const isTest = session.metadata?.test === "1";
    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
    const paymentMethod =
      typeof session.payment_intent?.payment_method === "string" ? session.payment_intent.payment_method : null;
    if (!customerId) {
      await slack(`:rotating_light: ${PRODUCT}: payment 1 cleared on ${sessionId} but Stripe returned no customer. Day 31 and day 61 are NOT scheduled.`);
      return ok({ verified: true, paid: true, scheduled: false });
    }

    /* The saved card becomes the customer's default too, as a second line of
       defence if anyone ever edits an invoice in the dashboard. */
    if (paymentMethod) {
      await fetch(`${STRIPE}/customers/${encodeURIComponent(customerId)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "invoice_settings[default_payment_method]": paymentMethod }).toString(),
      }).catch(() => {});
    }

    const list = await fetch(`${STRIPE}/invoices?customer=${encodeURIComponent(customerId)}&limit=50`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const existing = list.ok ? (await list.json())?.data || [] : [];
    const amount = isTest ? TEST_CENTS : PAYMENT_CENTS;

    const results = [];
    for (const p of LATER) {
      results.push({
        ...p,
        ...(await raiseInstalment({
          key, customerId, paymentMethod, sessionId, n: p.n, label: p.label, days: p.days, amount, test: isTest, existing,
        })),
      });
    }

    const scheduled = results.every((r) => r.id);
    const when = (s: number) => new Date(s * 1000).toLocaleDateString("en-AU", { timeZone: "Australia/Brisbane", day: "numeric", month: "short", year: "numeric" });
    /* Only announce once. A reload finds both invoices already there. */
    const fresh = results.some((r) => r.id && !existing.some((i: any) => i.id === r.id));
    if (!scheduled) {
      await slack(
        `:rotating_light: ${isTest ? "[TEST] " : ""}${PRODUCT}: ${session.metadata?.signature_name} paid ${money(amount)} but the schedule FAILED. ` +
        results.map((r) => `Payment ${r.n}: ${r.id || r.error}`).join(". ") +
        `. Customer ${customerId}. Reloading the return page retries safely.`
      );
    } else if (fresh) {
      await slack(
        `:moneybag: ${isTest ? "[TEST] " : ""}*${session.metadata?.signature_name}* paid ${money(amount)}, ${PRODUCT} payment 1 of 3. ` +
        `Auto charges set: ${money(amount)} on ${when(results[0].at)} and ${money(amount)} on ${when(results[1].at)}. Customer ${customerId}.`
      );
    }

    return ok({
      verified: true,
      paid: true,
      scheduled,
      schedule: results.map((r) => ({ n: r.n, at: r.at, ok: Boolean(r.id) })),
    });
  }

  return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown action" }) };
};

export { handler };
