import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, getContact, addTags, contactUrl } from "./_ghl";

/*
  Stops the second $5,000 for somebody who is leaving at the day 30 checkpoint.

  The agreement commits both instalments on signing, and that stays true: this
  is not a refund button and it is not an offer made to the client. It exists
  because the commercial position is committed, not commanded. If somebody says
  at day 30 that they do not want to continue, we part ways like adults and the
  second instalment does not get taken.

  Without this the money moves on its own. verify-payment raises that invoice at
  the moment the first payment clears, with collection_method
  charge_automatically and auto_advance true, and finalises it. Finalising is
  what puts it on Stripe's schedule, so from day one it is a live receivable
  that will debit the saved card on its due date whether anybody looks or not.
  The only way to stop it is to void it before then.

  Voiding is irreversible. A voided invoice cannot be reopened, only replaced by
  a new one, so this is deliberately a two step link: the GET shows who and how
  much and asks, the POST is the only thing that acts. Same reason decide.ts
  refuses to act on a GET. A link that is merely fetched must never move money.

  Trigger: the Slack nudge from instalment-checkpoint, or by hand.
    GET  /.netlify/functions/install-part-ways?c=<contactId>&k=<INSTALL_EXIT_SECRET>
*/

const STRIPE_API = "https://api.stripe.com/v1";
const EXIT_TAG = "install-parted-ways";

const html = (body: string, status = 200) => ({
  statusCode: status,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  body,
});

const page = (title: string, body: string, tone: "ask" | "ok" | "bad") => `<!doctype html>
<html><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A0B0D;color:#EAECEF;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
  .card{max-width:440px;width:100%;background:#121419;border:1px solid #242830;border-radius:16px;padding:32px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 12px;color:${tone === "bad" ? "#F0616D" : tone === "ok" ? "#34D399" : "#EAECEF"}}
  p{margin:0 0 20px;color:#A4AAB4;font-size:15px}
  b{color:#EAECEF}
  .warn{color:#E9B949}
  button{width:100%;padding:14px;border-radius:999px;border:0;background:#EAECEF;color:#0A0B0D;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{background:#fff}
  a{color:#3B7DFF}
</style></head><body><div class="card">${body}</div></body></html>`;

const money = (cents: number, currency: string) =>
  `${(cents / 100).toLocaleString("en-AU", { style: "currency", currency: (currency || "aud").toUpperCase() })}`;

async function slack(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* An alert that fails must not fail the run. */
  }
}

/*
  The open second instalment for this contact, or null.

  Matched on the Stripe customer from their GHL record and then narrowed by the
  ghl_contact_id written into the invoice metadata when it was raised. Status
  open means finalised and not yet paid, which is exactly the window where
  voiding is both possible and meaningful. A paid invoice is not a candidate and
  neither is a draft.
*/
async function openInstalment(stripeKey: string, customerId: string, contactId: string) {
  const auth = { Authorization: `Bearer ${stripeKey}` };
  const res = await fetch(
    `${STRIPE_API}/invoices?customer=${encodeURIComponent(customerId)}&status=open&limit=20`,
    { headers: auth }
  );
  if (!res.ok) return { error: `Stripe refused the invoice lookup (HTTP ${res.status}).` };

  const list = (await res.json())?.data || [];
  const mine = list.filter((i: any) => (i?.metadata?.ghl_contact_id || "") === contactId);

  /* Fall back to the whole open list when metadata is absent, which is true of
     anything raised before that field existed. Still only ever one click away
     from a human who can read the amount on the page. */
  const candidates = mine.length ? mine : list;
  if (!candidates.length) return { invoice: null };

  candidates.sort((a: any, b: any) => (b?.created || 0) - (a?.created || 0));
  return { invoice: candidates[0] };
}

const handler: Handler = async (event) => {
  const secret = process.env.INSTALL_EXIT_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const token = process.env.GHL_TOKEN;
  const customerField = process.env.GHL_FIELD_STRIPE_CUSTOMER;

  if (!secret || !stripeKey || !token || !customerField) {
    return html(
      page(
        "Not configured",
        `<h1>Not set up</h1><p>Missing ${[
          !secret && "INSTALL_EXIT_SECRET",
          !stripeKey && "a Stripe key",
          !token && "GHL_TOKEN",
          !customerField && "GHL_FIELD_STRIPE_CUSTOMER",
        ]
          .filter(Boolean)
          .join(", ")}.</p>`,
        "bad"
      ),
      500
    );
  }

  const q = event.queryStringParameters || {};
  if ((q.k || "") !== secret) {
    return html(page("Not allowed", `<h1>Link not valid</h1><p>This link is missing its code, or it has been changed.</p>`, "bad"), 403);
  }

  const contactId = (q.c || "").trim();
  if (!contactId) {
    return html(page("Not valid", `<h1>Link not valid</h1><p>Missing the contact.</p>`, "bad"), 400);
  }

  const contact = await getContact(token, contactId);
  if (!contact) {
    return html(
      page("Not found", `<h1>Contact not found</h1><p>That contact no longer exists in GoHighLevel, so there is nothing to stop.</p>`, "bad"),
      404
    );
  }

  const who = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || contactId;
  const customerId = (contact.customFields || []).find((f: any) => f.id === customerField)?.value || "";

  if (!customerId) {
    return html(
      page(
        "No Stripe customer",
        `<h1>Nothing to stop</h1><p><b>${who}</b> has no Stripe customer on their record, so no second instalment was ever raised against a card.</p>`,
        "bad"
      ),
      404
    );
  }

  const found = await openInstalment(stripeKey, customerId, contactId);
  if (found.error) {
    return html(page("Stripe error", `<h1>Could not check</h1><p>${found.error}</p>`, "bad"), 502);
  }
  if (!found.invoice) {
    return html(
      page(
        "Nothing open",
        `<h1>Nothing to stop</h1><p><b>${who}</b> has no open instalment. It has either been paid already, or voided before now.</p>
         <p><a href="${contactUrl(contactId)}">Open them in GoHighLevel</a></p>`,
        "ok"
      )
    );
  }

  const inv = found.invoice;
  const amount = money(inv.amount_due ?? 0, inv.currency);
  const due = inv.due_date ? new Date(inv.due_date * 1000).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "no due date set";

  /* The GET only ever asks. Nothing above this point has changed anything. */
  if (event.httpMethod !== "POST") {
    return html(
      page(
        "Part ways",
        `<h1>Stop the second instalment?</h1>
         <p><b>${who}</b><br>${amount}, due ${due}.</p>
         <p class="warn">This voids the invoice so Stripe will not charge their card. It cannot be undone. If they change their mind the instalment has to be raised again from scratch.</p>
         <form method="POST"><button type="submit">Yes, part ways</button></form>`,
        "ask"
      )
    );
  }

  const voidRes = await fetch(`${STRIPE_API}/invoices/${encodeURIComponent(inv.id)}/void`, {
    method: "POST",
    headers: { Authorization: `Bearer ${stripeKey}` },
  });

  if (!voidRes.ok) {
    const detail = await voidRes.text();
    console.error("install-part-ways: void failed", inv.id, voidRes.status, detail.slice(0, 300));
    await slack(`:warning: *Could not void ${who}'s second instalment* (${amount}). Stripe returned HTTP ${voidRes.status}. It will still charge on ${due} unless it is voided in the Stripe dashboard by hand.`);
    return html(
      page(
        "Not stopped",
        `<h1>Still live</h1><p>Stripe refused to void it (HTTP ${voidRes.status}). <b>It will still charge on ${due}.</b> Void it in the Stripe dashboard by hand.</p>`,
        "bad"
      ),
      502
    );
  }

  await addTags(token, contactId, [EXIT_TAG]);
  await slack(
    [
      `:handshake: *Parted ways with ${who} at the day 30 checkpoint.*`,
      `${amount} second instalment voided. Their card will not be charged.`,
      contactUrl(contactId),
    ].join("\n")
  );

  console.log("install-part-ways: voided", inv.id, "for", contactId);
  return html(
    page(
      "Done",
      `<h1>Parted ways</h1><p><b>${who}</b> will not be charged. The ${amount} instalment is voided and they are tagged <b>${EXIT_TAG}</b>.</p>
       <p><a href="${contactUrl(contactId)}">Open them in GoHighLevel</a></p>`,
      "ok"
    )
  );
};

export { handler };
