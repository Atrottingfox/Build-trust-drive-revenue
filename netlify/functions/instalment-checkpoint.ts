import type { Handler } from "@netlify/functions";
import { getContact } from "./_ghl";

/*
  Says who is about to be charged their second $5,000, while there is still time
  to decide otherwise.

  The second instalment is raised and finalised on the day the first one clears,
  set to charge the saved card automatically. That is correct: the agreement
  commits both payments on signing. But it also means the money moves with no
  further human involvement, and the day 30 checkpoint is supposed to be a real
  conversation. A conversation that happens after the card is debited is not a
  conversation, it is an apology.

  So this is the reminder that the checkpoint exists, sent a few days out, with
  the one link that stops it. Doing nothing is the default and it is the right
  default: silence means the engagement continues and Stripe collects.

  Nothing here moves money or voids anything. It only reports.
*/

const STRIPE_API = "https://api.stripe.com/v1";
const SITE = "https://authorityengine.com.au";

/* Far enough out that a conversation can still be had, close enough that the
   answer is knowable. Three days. */
const NOTICE_DAYS = Number(process.env.INSTALMENT_NOTICE_DAYS) || 3;

const money = (cents: number, currency: string) =>
  (cents / 100).toLocaleString("en-AU", { style: "currency", currency: (currency || "aud").toUpperCase() });

async function slack(text: string) {
  const url = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* Never fail the run over an alert. */
  }
}

const handler: Handler = async () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
  const token = process.env.GHL_TOKEN;
  const exitSecret = process.env.INSTALL_EXIT_SECRET;

  if (!stripeKey) {
    console.error("instalment-checkpoint: no Stripe key.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const res = await fetch(`${STRIPE_API}/invoices?status=open&limit=100`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });

  if (!res.ok) {
    console.error("instalment-checkpoint: Stripe refused the invoice list", res.status);
    await slack(`:warning: The instalment checkpoint could not read Stripe (HTTP ${res.status}). Nobody was reminded today.`);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const now = Math.floor(Date.now() / 1000);
  const horizon = now + NOTICE_DAYS * 86400;

  const soon = ((await res.json())?.data || []).filter(
    (i: any) => typeof i?.due_date === "number" && i.due_date > now && i.due_date <= horizon
  );

  if (!soon.length) {
    console.log("instalment-checkpoint: nothing due inside", NOTICE_DAYS, "days.");
    return { statusCode: 200, body: JSON.stringify({ ok: true, due: 0 }) };
  }

  const lines: string[] = [];
  for (const inv of soon) {
    const contactId = inv?.metadata?.ghl_contact_id || "";
    let who = inv?.customer_email || contactId || "unknown";

    if (token && contactId) {
      const c = await getContact(token, contactId);
      if (c) who = [c.firstName, c.lastName].filter(Boolean).join(" ") || c.email || who;
    }

    const when = new Date(inv.due_date * 1000).toLocaleDateString("en-AU", { day: "numeric", month: "long" });
    const stop =
      contactId && exitSecret
        ? `\n     Part ways instead: ${SITE}/.netlify/functions/install-part-ways?c=${encodeURIComponent(contactId)}&k=${encodeURIComponent(exitSecret)}`
        : `\n     No contact id on this invoice, so stop it in Stripe by hand: ${inv.hosted_invoice_url || inv.id}`;

    lines.push(`  • *${who}* — ${money(inv.amount_due ?? 0, inv.currency)} charges ${when}${stop}`);
  }

  await slack(
    [
      `:calendar: *Day 30 checkpoint. ${soon.length === 1 ? "One client is" : `${soon.length} clients are`} about to be charged.*`,
      ...lines,
      ``,
      `Do nothing and it goes through, which is the agreement. Use the link only if you have agreed to part ways.`,
    ].join("\n")
  );

  console.log("instalment-checkpoint: reminded on", soon.length, "invoice(s).");
  return { statusCode: 200, body: JSON.stringify({ ok: true, due: soon.length }) };
};

export { handler };
