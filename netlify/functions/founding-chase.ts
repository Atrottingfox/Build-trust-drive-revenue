import type { Handler } from "@netlify/functions";
import { addTags, contactUrl, getContact, removeTags } from "./_ghl";
import { cohortStart, PAYMENT_KIND, stripe, stripeKey } from "./_founding";

/*
  Daily, 08:00 Brisbane. Every founding buyer between paying and their start
  date (Sean, 24 Nov 2026: "nothing between paying and 15 Jan").

  Code sets tags, GoHighLevel sends the emails (Sean's rule). Each tag is added
  once and never again, so each GHL workflow fires once per buyer.

    no-strategy-day-booked   paid more than 24 hours ago and no Strategy Day
                             booked (no `brand-day-booked` tag, which Calendly
                             sets). Taken off again once they book. Brand Day
                             credit buyers are skipped: their day is done.
    founding-start-14        14 days before their start date
    founding-start-2         2 days before their start date
    founding-started         on their start date

  Start date is the same one the Slack sale alert shows (cohortStart, the 15th).
  Sales come from Stripe, which is the source of truth, so a buyer with a
  second GHL contact is still found through the contact id on the sale.
  Test sales (metadata test=1) are skipped.
*/

const BOOKED = "brand-day-booked";
const NOT_BOOKED = "no-strategy-day-booked";
const DAY = 86_400_000;

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => {});
}

/* Today in Brisbane as YYYY-MM-DD. */
const brisbaneToday = () => new Date(Date.now() + 10 * 3600_000).toISOString().slice(0, 10);
const daysBetween = (from: string, to: string) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY);

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  if (!stripeKey() || !token) return { statusCode: 200, body: JSON.stringify({ skipped: "no stripe key or GHL token" }) };

  /* Founding opened in November 2026. Everything since then, paged. */
  const since = Math.floor(Date.parse("2026-11-01T00:00:00+10:00") / 1000);
  const sales: any[] = [];
  let after = "";
  for (let page = 0; page < 10; page++) {
    const r = await stripe(`checkout/sessions?status=complete&limit=100&created[gte]=${since}${after ? `&starting_after=${after}` : ""}`);
    if (!r.ok) {
      console.error("founding-chase: list failed", r.status, JSON.stringify(r.data?.error || {}));
      return { statusCode: 200, body: JSON.stringify({ error: true }) };
    }
    const rows = r.data?.data || [];
    for (const s of rows) {
      if (s?.metadata?.payment !== PAYMENT_KIND) continue;
      if (s?.payment_status !== "paid" || s?.metadata?.test === "1") continue;
      sales.push(s);
    }
    if (!r.data?.has_more || !rows.length) break;
    after = rows[rows.length - 1].id;
  }

  const today = brisbaneToday();
  const lines: string[] = [];
  for (const s of sales) {
    const contactId = s?.metadata?.ghl_contact_id;
    if (!contactId) continue;
    const c = await getContact(token, contactId);
    if (!c) continue;
    const tags: string[] = c.tags || [];
    const name = [c.firstName, c.lastName].filter(Boolean).join(" ") || c.email || contactId;
    const paidMs = (s.created || 0) * 1000;
    const start = cohortStart(paidMs, s?.metadata?.intake);
    const toStart = daysBetween(today, start);
    const credit = s?.metadata?.credit === "brand-day";
    const add: string[] = [];

    /* Strategy Day not booked. */
    if (!credit) {
      if (tags.includes(BOOKED)) {
        if (tags.includes(NOT_BOOKED)) await removeTags(token, contactId, [NOT_BOOKED]);
      } else if (Date.now() - paidMs > DAY && !tags.includes(NOT_BOOKED)) {
        add.push(NOT_BOOKED);
      }
    }

    /* Countdown to the start. Only the latest one that applies, so a buyer who
       pays inside 14 days does not get the 14 day email and the 2 day email at once. */
    const stage = toStart <= 0 ? "founding-started" : toStart <= 2 ? "founding-start-2" : toStart <= 14 ? "founding-start-14" : "";
    const stages = ["founding-start-14", "founding-start-2", "founding-started"];
    if (stage && !stages.slice(stages.indexOf(stage)).some((t) => tags.includes(t))) add.push(stage);

    if (add.length && (await addTags(token, contactId, add))) {
      lines.push(`${name}: ${add.map((t) => `\`${t}\``).join(", ")} (starts ${start}). <${contactUrl(contactId)}|Open>`);
    }
  }

  if (lines.length) await slack([":calendar: *Founding countdown*", ...lines].join("\n"));
  return { statusCode: 200, body: JSON.stringify({ sales: sales.length, tagged: lines.length }) };
};

export { handler };
