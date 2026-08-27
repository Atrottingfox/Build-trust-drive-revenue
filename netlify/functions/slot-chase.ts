import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, contactUrl } from "./_ghl";

/*
  Says who has paid for the 90 Day Install and never picked their hour.

  This was the largest hole in the funnel. A client could sign, pay $5,000,
  close the tab, and never book a single call, and nothing anywhere would
  notice. The one thing built to chase them is a GoHighLevel workflow that has
  a contact parked in it rather than moving through it, so in practice nobody
  was being chased at all.

  Deliberately a report rather than an email. The client already has the link:
  it is in the post-payment email and on the /install page. Somebody who has
  not used it in two days is not going to be moved by a third copy of it, and
  is usually stuck on something a person can solve in one message. So this
  tells Sean, and Sean decides.

  Grace period matters. Somebody who paid at 11pm and will book over coffee is
  not a problem, and chasing them makes the alert noise. Two days is long enough
  to be a real signal and short enough to act on, since the first call cannot
  land inside two weeks anyway.
*/

const PAID_TAG = "step-2-paid";
const BOOKED_TAG = "install-slot-booked";
const PARTED_TAG = "install-parted-ways";

const GRACE_HOURS = 48;

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
    /* Never fail the run over an alert. */
  }
}

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("slot-chase: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const auth = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  /*
    Searched by tag rather than listed, because the list endpoint pages and the
    paid population is small. If the search ever returns nothing while contacts
    demonstrably carry the tag, suspect the search rather than the data: it has
    lied before.
  */
  let contacts: any[] = [];
  try {
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        locationId,
        pageLimit: 100,
        filters: [{ field: "tags", operator: "contains", value: PAID_TAG }],
      }),
    });
    if (!res.ok) {
      console.error("slot-chase: contact search failed", res.status);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }
    contacts = (await res.json())?.contacts || [];
  } catch (err) {
    console.error("slot-chase:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const now = Date.now();
  const waiting: string[] = [];

  for (const c of contacts) {
    const tags: string[] = c?.tags || [];
    if (tags.includes(BOOKED_TAG)) continue;
    if (tags.includes(PARTED_TAG)) continue;

    /* dateUpdated moves when the paid tag lands, which is close enough to
       "when they paid" without needing a custom field for it. */
    const since = Date.parse(c?.dateUpdated || c?.dateAdded || "");
    if (!Number.isFinite(since)) continue;

    const hours = (now - since) / 3_600_000;
    if (hours < GRACE_HOURS) continue;

    const who = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || c?.id;
    const days = Math.floor(hours / 24);
    waiting.push(`  • *${who}* paid ${days} day${days === 1 ? "" : "s"} ago, still no hour picked. <${contactUrl(c.id)}|Open in GHL>`);
  }

  if (waiting.length) {
    await slack(
      [
        `:hourglass: *${waiting.length} paid, ${waiting.length === 1 ? "nobody has" : "none have"} booked their calls.*`,
        ...waiting,
        ``,
        `They already have the link, so a third copy of it will not help. Worth a message.`,
      ].join("\n")
    );
  }

  console.log("slot-chase:", { paid: contacts.length, waiting: waiting.length });
  return { statusCode: 200, body: JSON.stringify({ paid: contacts.length, waiting: waiting.length }) };
};

export { handler };
