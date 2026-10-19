import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { getContact } from "./_ghl";

/*
  The 12 month Founder Partner upsell at day 30.

  Sean, 19 Oct 2026: the day 30 checkpoint in Slack should offer the advisory
  for anyone about to pay their second instalment. Tap yes and get a link,
  unique to that client, to send them. The link opens /partner, where they read
  the agreement, sign it, and pay month one. The rest runs itself.

  Three doors, one function:

    GET  ?c=<contactId>&k=<INSTALL_EXIT_SECRET>   the Slack link. Only RENDERS a
         page that asks. Slack, Gmail and link scanners fetch URLs on their own,
         so a GET must never act (same rule as decide.ts and install-part-ways).
    POST form c, k                                 the "Yes" button on that page.
         Mints the client's link, posts it to Slack, shows it with a copy button.
    POST JSON { action, t }                        the /partner page: who, sign,
         checkout, verify.

  The client's token is stateless: their contact id, name and Stripe customer,
  signed with an HMAC of INSTALL_EXIT_SECRET. Nothing to store, nothing to look
  up, and a token cannot be edited to point at somebody else. Rotating that
  secret kills every unused link, which is the right failure.

  Money: 7 monthly payments of $4,000 + GST ($4,400), the $28,000 term from the
  Founder Partner Rollover Agreement in Notion. A Stripe subscription with
  cancel_at set seven months out, so it stops by itself after the seventh.
  ?test=1 on the page is $1 a day for 3 days, so the repeat and the cap can be
  watched in two days.
*/

const SITE = "https://authorityengine.com.au";
const STRIPE = "https://api.stripe.com/v1";
const OFFER = "founder-partner";
const PRODUCT = "Authority Engine Founder Partner";
/* Cents. $4,000 + 10% GST. */
const MONTHLY_CENTS = 440000;
const PAYMENTS = 7;
const TEST_CENTS = 100;
const TEST_PAYMENTS = 3;

const json = (body: unknown, statusCode = 200) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

const html = (body: string, status = 200) => ({
  statusCode: status,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  body,
});

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const page = (title: string, body: string, tone: "ask" | "ok" | "bad") => `<!doctype html>
<html><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A0B0D;color:#EAECEF;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
  .card{max-width:480px;width:100%;background:#121419;border:1px solid #242830;border-radius:16px;padding:32px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 12px;color:${tone === "bad" ? "#F0616D" : tone === "ok" ? "#34D399" : "#EAECEF"}}
  p{margin:0 0 20px;color:#A4AAB4;font-size:15px}
  b{color:#EAECEF}
  button{width:100%;padding:14px;border-radius:999px;border:0;background:#EAECEF;color:#0A0B0D;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{background:#fff}
  .link{word-break:break-all;background:#0A0B0D;border:1px solid #242830;border-radius:10px;padding:12px;
        font:13px/1.5 ui-monospace,Menlo,monospace;color:#EAECEF;margin:0 0 16px}
  a{color:#3B7DFF}
</style></head><body><div class="card">${body}</div></body></html>`;

async function slack(text: string) {
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

type Who = { c: string; n: string; cus?: string };

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const sig = (secret: string, payload: string) =>
  crypto.createHmac("sha256", secret).update(`founder-partner:${payload}`).digest("base64url").slice(0, 32);

function mint(secret: string, who: Who): string {
  const payload = b64(JSON.stringify(who));
  return `${payload}.${sig(secret, payload)}`;
}

function read(secret: string, token: string): Who | null {
  const [payload, mac] = String(token || "").split(".");
  if (!payload || !mac) return null;
  const want = sig(secret, payload);
  if (mac.length !== want.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(want))) return null;
  try {
    const w = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return w && w.c && w.n ? w : null;
  } catch {
    return null;
  }
}

/* Seven calendar months after the start, less an hour, so the subscription
   ends just before an eighth invoice could ever be raised. */
function endOfTerm(startSec: number, test: boolean): number {
  if (test) return startSec + TEST_PAYMENTS * 86400 - 3600;
  const d = new Date(startSec * 1000);
  d.setUTCMonth(d.getUTCMonth() + PAYMENTS);
  return Math.floor(d.getTime() / 1000) - 3600;
}

async function contactWho(token: string, customerField: string | undefined, contactId: string): Promise<Who | null> {
  const contact = await getContact(token, contactId);
  if (!contact) return null;
  const n = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || contactId;
  const cus = customerField ? (contact.customFields || []).find((f: any) => f.id === customerField)?.value || "" : "";
  return { c: contactId, n, ...(cus ? { cus } : {}) };
}

const handler: Handler = async (event) => {
  const secret = process.env.INSTALL_EXIT_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const ghl = process.env.GHL_TOKEN;
  const customerField = process.env.GHL_FIELD_STRIPE_CUSTOMER;
  const ctype = String(event.headers["content-type"] || "");

  /* ---- The /partner page ---- */
  if (event.httpMethod === "POST" && ctype.includes("application/json")) {
    if (!secret || !stripeKey) return json({ configured: false });
    let body: any = {};
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return json({ error: "Bad body" }, 400);
    }

    if (body.action === "verify") return verify(stripeKey, String(body.sessionId || ""));

    const who = read(secret, body.t);
    if (!who) return json({ valid: false });
    if (body.action === "who") return json({ valid: true, name: who.n });

    const test = body.test === true;
    const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";

    if (body.action === "sign") {
      const name = String(body.signatureName || "").trim().slice(0, 120);
      const version = String(body.termsVersion || "");
      if (!name || !version) return json({ ok: false }, 400);
      const signedAt = new Date().toISOString();
      await slack(`:writing_hand: ${test ? "[TEST] " : ""}*${name}* signed the Founder Partner agreement (${version}) for ${who.n}. Payment is the next step on their page.`);
      return json({ ok: true, signedAt });
    }

    if (body.action === "checkout") {
      const name = String(body.signatureName || "").trim().slice(0, 120);
      const version = String(body.termsVersion || "");
      if (!name || !version) return json({ error: "Sign first" }, 400);
      const amount = test ? TEST_CENTS : MONTHLY_CENTS;
      const meta: Record<string, string> = {
        offer: OFFER,
        ghl_contact_id: who.c,
        client_name: who.n,
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
        "line_items[0][price_data][product_data][name]": `${test ? "TEST. " : ""}${PRODUCT}, ${PAYMENTS} payments`,
        return_url:
          `${SITE}/partner?t=${encodeURIComponent(body.t)}&paid=1&session_id={CHECKOUT_SESSION_ID}` + (test ? "&test=1" : ""),
        "subscription_data[description]": `${PRODUCT}. ${money(amount)} a month ($4,000 + GST), charged automatically for ${PAYMENTS} months, then it stops.`,
      });
      if (who.cus) form.set("customer", who.cus);
      for (const [k, v] of Object.entries(meta)) {
        form.set(`metadata[${k}]`, v);
        form.set(`subscription_data[metadata][${k}]`, v);
      }
      const res = await fetch(`${STRIPE}/checkout/sessions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      });
      const session = await res.json();
      if (!res.ok) {
        console.error("founder-partner checkout failed:", res.status, JSON.stringify(session?.error));
        return json({ configured: false, stripeMessage: session?.error?.message || null });
      }
      return json({ configured: true, clientSecret: session.client_secret });
    }

    return json({ error: "Unknown action" }, 400);
  }

  /* ---- The Slack link and its Yes button ---- */
  if (!secret || !ghl) {
    return html(page("Not set up", `<h1>Not set up</h1><p>Missing ${[!secret && "INSTALL_EXIT_SECRET", !ghl && "GHL_TOKEN"].filter(Boolean).join(", ")}.</p>`, "bad"), 500);
  }

  const q =
    event.httpMethod === "POST"
      ? Object.fromEntries(new URLSearchParams(event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString() : event.body || ""))
      : event.queryStringParameters || {};
  if ((q.k || "") !== secret) {
    return html(page("Not allowed", `<h1>Link not valid</h1><p>This link is missing its code, or it has been changed.</p>`, "bad"), 403);
  }
  const contactId = String(q.c || "").trim();
  const who = contactId ? await contactWho(ghl, customerField, contactId) : null;
  if (!who) {
    return html(page("Not found", `<h1>Contact not found</h1><p>That contact is not in GoHighLevel, so there is nobody to make a link for.</p>`, "bad"), 404);
  }

  if (event.httpMethod !== "POST") {
    return html(
      page(
        "Offer the Founder Partner term",
        `<h1>Offer ${esc(who.n)} the 12 months?</h1>
         <p>This makes a link unique to <b>${esc(who.n)}</b>. It opens the Founder Partner agreement: 12 months, ${PAYMENTS} payments of $4,000 + GST, sign and pay on the page. Nothing is sent to them. You send the link.</p>
         <form method="post"><input type="hidden" name="c" value="${esc(contactId)}"><input type="hidden" name="k" value="${esc(secret)}">
         <button type="submit">Yes, make their link</button></form>`,
        "ask"
      )
    );
  }

  const link = `${SITE}/partner?t=${mint(secret, who)}`;
  await slack(`:link: Founder Partner link made for *${who.n}*. Send it to them:\n${link}`);
  return html(
    page(
      "Their link",
      `<h1>${esc(who.n)}'s link is ready</h1>
       <p>Send this to them. It only works for them, and it is in Slack too.</p>
       <div class="link" id="l">${esc(link)}</div>
       <button onclick="navigator.clipboard.writeText(document.getElementById('l').textContent).then(()=>this.textContent='Copied')">Copy the link</button>`,
      "ok"
    )
  );
};

async function verify(stripeKey: string, sessionId: string) {
  if (!sessionId) return json({ verified: false });
  const res = await fetch(`${STRIPE}/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });
  const session = await res.json();
  if (!res.ok || session?.metadata?.offer !== OFFER) return json({ verified: false });
  if (session.payment_status !== "paid") return json({ verified: true, paid: false });

  const sub = session.subscription;
  const isTest = session.metadata?.test === "1";
  const amount = isTest ? TEST_CENTS : MONTHLY_CENTS;
  const who = session.metadata?.client_name || session.metadata?.signature_name;
  if (!sub?.id) {
    await slack(`:rotating_light: ${PRODUCT}: month 1 paid for ${who} on ${sessionId} but no subscription came back. Check Stripe.`);
    return json({ verified: true, paid: true, scheduled: false });
  }
  /* Already capped? A reload of the return page lands here again. */
  if (sub.cancel_at) return json({ verified: true, paid: true, scheduled: true, endsAt: sub.cancel_at });

  const start = sub.start_date || sub.created || Math.floor(Date.now() / 1000);
  const endsAt = endOfTerm(start, isTest);
  const upd = await fetch(`${STRIPE}/subscriptions/${encodeURIComponent(sub.id)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ cancel_at: String(endsAt), proration_behavior: "none" }).toString(),
  });
  if (!upd.ok) {
    const err = (await upd.json())?.error?.message || "update failed";
    await slack(
      `:rotating_light: ${isTest ? "[TEST] " : ""}${PRODUCT}: ${who} paid month 1 but the end date did NOT set (${err}). ` +
        `Subscription ${sub.id} will keep charging until stopped. Reloading their page retries.`
    );
    return json({ verified: true, paid: true, scheduled: false });
  }
  const when = (s: number) =>
    new Date(s * 1000).toLocaleDateString("en-AU", { timeZone: "Australia/Brisbane", day: "numeric", month: "short", year: "numeric" });
  await slack(
    `:moneybag: ${isTest ? "[TEST] " : ""}*${who}* started ${PRODUCT}: ${money(amount)} paid, then ${money(amount)} automatically every ` +
      `${isTest ? "day, 3 payments (test clock)" : `month, ${PAYMENTS} payments`}, ending ${when(endsAt)}. Subscription ${sub.id}.`
  );
  return json({ verified: true, paid: true, scheduled: true, endsAt });
}

export { handler };
