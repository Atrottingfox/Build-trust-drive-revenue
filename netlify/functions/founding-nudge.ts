import type { Handler } from "@netlify/functions";
import { getContact, sendEmail } from "./_ghl";
import { BRAND_DAY_BOOKING } from "./_calls";
import { PAID_TAG, PAYMENT_KIND, stripe, stripeKey } from "./_founding";
import { claimPortalEvent, foundingStatus, type FoundingStatus } from "./_portal";

/*
  Founding buyers who paid and then went quiet (Sean, 24 Nov 2026: Brandon
  Willington paid on the 23rd, no login, nothing booked, nobody chased).
  Hourly, 07:00 to 20:00 Brisbane.

  Stages, each sent ONCE per buyer, ever:
    brand_day_48h     48 hours after paying, no Strategy Day booked
    brand_day_7d      day 7, still no Strategy Day booked
    strategy_call_7d  day 7, no 1:1 strategy call booked
    login_3d          day 3, no portal login
    login_7d          day 7, still no portal login

  "Booked" and "logged in" come from contentengine (founding-status): the
  client row's brand_day_date and user_id, and the portal_events that
  calendly-booked and claim-account write. The Strategy Day also counts as
  booked on the GHL tags founding-day-booked / brand-day-booked. Brand Day
  credit buyers (metadata credit=brand-day) have had their day: no Strategy
  Day stages for them.

  Once only: each stage is logged on contentengine as a `founding_chase`
  event BEFORE the email goes. contentengine refuses a stage already logged,
  and nothing is sent unless the log landed. That same event is the line in
  the buyer's Slack thread, with a one tap wa.me link to their phone.

  Every stage due at the same moment goes in ONE email. The lines are the
  welcome email's own lines (_founding.ts), word for word, after a plain
  opener. Skipped: test sales, zz-test contacts, anyone who has parted ways
  or been refunded, and contacts without founding-paid.

  Local test (never set these on Netlify):
    NUDGE_DRY=1            work it all out, send and log nothing, return the plan
    NUDGE_ONLY=<email>     one buyer only
    NUDGE_INCLUDE_TEST=1   include test sales and zz-test contacts
*/

const DAY = 86_400_000;
const HOUR = 3_600_000;
const BOOKED_TAGS = ["founding-day-booked", "brand-day-booked"];
const SKIP_TAG = /^zz-test$|parted|part-ways|refund/i;
const STRATEGY_CALL = "https://calendly.com/sean-authorityengine/1-1-private-strategy-session";

type Topic = "brand_day" | "strategy" | "login";
type Due = { stage: string; topic: Topic; label: string };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

/* wa.me wants international digits. Australian 04.. becomes 614.. */
function waNumber(phone?: string | null): string | null {
  let d = String(phone || "").replace(/[^\d+]/g, "");
  if (!d) return null;
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("0")) d = `61${d.slice(1)}`;
  return d.length >= 8 ? d : null;
}

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => {});
}

/* What is due for one buyer, latest stage per topic, never one already sent. */
export function dueStages(ageMs: number, st: FoundingStatus, tags: string[], credit: boolean): Due[] {
  const kinds = st.kinds || [];
  const chased = new Set(st.chased || []);
  const out: Due[] = [];
  const add = (d: Due) => { if (!chased.has(d.stage)) out.push(d); };

  const dayBooked = BOOKED_TAGS.some((t) => tags.includes(t)) || Boolean(st.brandDayDate) || kinds.includes("brand_day_booked");
  if (!credit && !dayBooked) {
    if (ageMs >= 7 * DAY) add({ stage: "brand_day_7d", topic: "brand_day", label: "Strategy Day not booked, day 7" });
    else if (ageMs >= 48 * HOUR) add({ stage: "brand_day_48h", topic: "brand_day", label: "Strategy Day not booked, 48 hours" });
  }
  if (!kinds.includes("strategy_call_booked") && ageMs >= 7 * DAY) {
    add({ stage: "strategy_call_7d", topic: "strategy", label: "1:1 strategy call not booked, day 7" });
  }
  if (!st.login) {
    if (ageMs >= 7 * DAY) add({ stage: "login_7d", topic: "login", label: "no portal login, day 7" });
    else if (ageMs >= 3 * DAY) add({ stage: "login_3d", topic: "login", label: "no portal login, day 3" });
  }
  return out;
}

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  if (!stripeKey() || !token || !process.env.CALL_CONTEXT_SECRET) {
    return { statusCode: 200, body: JSON.stringify({ skipped: "not configured" }) };
  }
  const dry = process.env.NUDGE_DRY === "1";
  const only = (process.env.NUDGE_ONLY || "").trim().toLowerCase();
  const includeTest = process.env.NUDGE_INCLUDE_TEST === "1";

  /* Founding opened in November 2026. Every paid sale since, paged. */
  const since = Math.floor(Date.parse("2026-11-01T00:00:00+10:00") / 1000);
  const sales: any[] = [];
  let after = "";
  for (let page = 0; page < 10; page++) {
    const r = await stripe(`checkout/sessions?status=complete&limit=100&created[gte]=${since}${after ? `&starting_after=${after}` : ""}`);
    if (!r.ok) {
      console.error("founding-nudge: Stripe list failed", r.status);
      return { statusCode: 200, body: JSON.stringify({ error: "stripe" }) };
    }
    const rows = r.data?.data || [];
    for (const s of rows) {
      if (s?.metadata?.payment !== PAYMENT_KIND || s?.payment_status !== "paid") continue;
      if (s?.metadata?.test === "1" && !includeTest) continue;
      const email = String(s?.customer_details?.email || "").trim().toLowerCase();
      if (!email || (only && email !== only)) continue;
      sales.push(s);
    }
    if (!r.data?.has_more || !rows.length) break;
    after = rows[rows.length - 1].id;
  }
  if (!sales.length) return { statusCode: 200, body: JSON.stringify({ sales: 0 }) };

  const status = await foundingStatus(sales.map((s) => String(s.customer_details.email).toLowerCase()));
  if (!status) {
    await slack(":warning: founding-nudge could not ask contentengine where the founding buyers are (founding-status). Nobody was chased this hour.");
    return { statusCode: 200, body: JSON.stringify({ error: "founding-status" }) };
  }

  const plan: any[] = [];
  for (const s of sales) {
    const d = s.customer_details || {};
    const email = String(d.email).toLowerCase();
    const contactId = s?.metadata?.ghl_contact_id;
    const st = status[email];
    if (!contactId || !st) continue;
    const c = await getContact(token, contactId);
    const tags: string[] = c?.tags || [];
    if (!tags.includes(PAID_TAG)) continue;
    if (tags.some((t) => SKIP_TAG.test(t) && !(includeTest && t === "zz-test"))) continue;

    const due = dueStages(Date.now() - s.created * 1000, st, tags, s?.metadata?.credit === "brand-day");
    if (!due.length) continue;

    if (!st.clientId) {
      /* No contentengine client, so nothing can be logged and nothing is sent.
         Said once a day (the 08:00 run), not every hour. */
      if (new Date(Date.now() + 10 * HOUR).getUTCHours() === 8) {
        await slack(`:warning: ${d.name || email} is due a founding chase (${due.map((x) => x.label).join(", ")}) but has no contentengine portal, so nothing was sent. Chase by hand.`);
      }
      continue;
    }

    const name = String(d.name || c?.firstName || "");
    const raw = name.trim().split(/\s+/)[0] || "there";
    const first = raw.charAt(0).toUpperCase() + raw.slice(1);
    const brandDay = `${BRAND_DAY_BOOKING}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&utm_content=${encodeURIComponent(contactId)}`;
    const strategy = `${STRATEGY_CALL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    /* The welcome email's own lines, word for word. */
    const html: Record<Topic, string> = {
      brand_day: `<p><a href="${brandDay}">Lock in your Strategy Day date</a>.</p>`,
      strategy: `<p><a href="${strategy}">Book your 1:1 strategy call</a> in the next 7 days.</p>`,
      login: st.claimUrl
        ? `<p><a href="${st.claimUrl}">Set up your portal</a>. Everything for the build lives there: the SOPs, playbooks, training and your calls.</p>`
        : `<p>Your portal is ready at <a href="https://contentengine.live/login">contentengine.live</a>. Everything for the build lives there.</p>`,
    };
    const text: Record<Topic, string> = {
      brand_day: `Lock in your Strategy Day date: ${brandDay}`,
      strategy: `Book your 1:1 strategy call in the next 7 days: ${strategy}`,
      login: st.claimUrl ? `Set up your portal: ${st.claimUrl}` : `Your portal is ready at https://contentengine.live/login`,
    };
    const num = waNumber(d.phone);

    if (dry) {
      plan.push({ email, stages: due.map((x) => x.stage), wa: Boolean(num) });
      continue;
    }

    /* Claim each stage before sending. Only what was claimed goes out. The
       wa.me message is the same words as the email. */
    const order: Topic[] = ["brand_day", "strategy", "login"];
    const dueTopics = new Set(due.map((x) => x.topic));
    const wa = num
      ? `https://wa.me/${num}?text=${encodeURIComponent([`${first}, quick one.`, ...order.filter((t) => dueTopics.has(t)).map((t) => text[t]), "Sean"].join("\n\n"))}`
      : undefined;
    const claimed: Due[] = [];
    for (const x of due) {
      const r = await claimPortalEvent(email, "founding_chase", { stage: x.stage, label: x.label, first, wa, phone: d.phone || undefined });
      if (r && !r.duplicate) claimed.push(x);
    }
    if (!claimed.length) continue;

    const topics = new Set(claimed.map((x) => x.topic));
    const { sent, reason } = await sendEmail(token, contactId, "Quick one", [
      `<p>${esc(first)}, quick one.</p>`,
      ...order.filter((t) => topics.has(t)).map((t) => html[t]),
      `<p>Sean</p>`,
    ].join(""), { email });
    plan.push({ email, stages: claimed.map((x) => x.stage), sent, reason });
  }

  return { statusCode: 200, body: JSON.stringify({ sales: sales.length, dry, plan }) };
};

export { handler };
