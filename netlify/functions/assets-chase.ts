import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, contactUrl } from "./_ghl";

/*
  Did their Brand Day assets actually go out.

  Six named deliverables are promised within 48 hours of the Day: the Brand
  Demand Workbook, the Customer Journey Map, the avatar and hook bank, the Core
  Trust Assets outline, the One Demand Cycle diagram and the 30 Day Demand Plan.

  Nothing anywhere knew whether that happened. Not late, not missing: unknown.
  Every other promise in this funnel has something watching it, and the one made
  to somebody who has already paid $5,000 had nothing at all. A client could
  wait a fortnight and the first anybody would hear is them asking.

  This is the only hole in the machine where the person let down has already
  paid. That is why it is a daily question rather than a one off nudge, and why
  the reminder gets louder rather than going quiet.

  Deliberately a person answering rather than a system inferring. The assets go
  out however they go out, by email, by Drive link, by hand, so there is nothing
  reliable to detect. What can be done is ask, every time, and keep asking until
  somebody says yes.

  Two links in the Slack message, the same one-click pattern as the Brand Day
  invite: Yes sent, or Not yet. Yes stops it forever. Not yet is recorded and
  asked again tomorrow, with the days climbing in the message.
*/

const DELIVERED = "assets-delivered";
const LATE = "assets-late";
const CONFIRMED = "brand-day-confirmed";

/* The promise is 48 hours. Asking at 48 is asking on time rather than late, so
   the first message lands as a prompt and not as a telling off. */
const PROMISE_HOURS = 48;

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_PREP || process.env.SLACK_WEBHOOK_URL;
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
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const secret = process.env.DECIDE_SECRET;
  const dateField = process.env.GHL_FIELD_BRAND_DAY_DATE;

  if (!token || !locationId) {
    console.error("assets-chase: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }
  if (!dateField) {
    console.error("assets-chase: GHL_FIELD_BRAND_DAY_DATE not set, cannot tell when a Day happened.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const auth = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let contacts: any[] = [];
  try {
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        locationId,
        pageLimit: 100,
        filters: [{ field: "tags", operator: "contains", value: CONFIRMED }],
      }),
    });
    if (!res.ok) {
      console.error("assets-chase: search failed", res.status);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }
    contacts = (await res.json())?.contacts || [];
  } catch (err) {
    console.error("assets-chase:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const now = Date.now();
  const owing: string[] = [];

  for (const c of contacts) {
    const tags: string[] = c?.tags || [];
    if (tags.includes(DELIVERED)) continue;
    /* A rehearsal is not a client waiting on anything. */
    if (tags.includes("zz-test")) continue;

    const raw = (c?.customFields || []).find((f: any) => f?.id === dateField)?.value;
    const dayAt = Date.parse(String(raw || ""));
    if (!Number.isFinite(dayAt)) continue;

    /* Their Day has not happened yet, or has not finished. */
    const hours = (now - dayAt) / 3_600_000;
    if (hours < PROMISE_HOURS) continue;

    const who = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || c?.id;
    const overdue = Math.floor(hours - PROMISE_HOURS);
    const link = (action: string) =>
      secret
        ? `https://authorityengine.com.au/.netlify/functions/decide?do=${action}&c=${encodeURIComponent(c.id)}&k=${encodeURIComponent(secret)}`
        : "";

    /*
      The message gets sharper the longer it runs. A line that reads the same on
      day one and day nine trains everybody to skim it.
    */
    const heat =
      overdue < 24
        ? `Their Day was ${Math.floor(hours / 24)} days ago. The 48 hours is up today.`
        : overdue < 24 * 5
          ? `:warning: ${Math.floor(overdue / 24)} days past the promise.`
          : `:rotating_light: *${Math.floor(overdue / 24)} days past the promise.* They have paid $5,000 and are still waiting.`;

    owing.push(
      [
        `*${who}*`,
        heat,
        secret
          ? `<${link("assets-sent")}|Yes, sent>   ·   <${link("assets-not-yet")}|Not yet>   ·   <${contactUrl(c.id)}|Open in GHL>`
          : `:warning: DECIDE_SECRET is not set, so there are no buttons. Tag \`${DELIVERED}\` by hand.`,
      ].join("\n")
    );
  }

  if (owing.length) {
    await slack(
      [
        `:package: *${owing.length} ${owing.length === 1 ? "client is" : "clients are"} waiting on their Brand Day assets.*`,
        "",
        ...owing,
        "",
        `_Answering stops the question. "Not yet" asks again tomorrow._`,
      ].join("\n\n")
    );
  }

  console.log("assets-chase:", { checked: contacts.length, owing: owing.length });
  return { statusCode: 200, body: JSON.stringify({ checked: contacts.length, owing: owing.length }) };
};

export { handler };
