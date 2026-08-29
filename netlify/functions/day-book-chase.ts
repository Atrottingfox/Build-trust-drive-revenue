import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, contactUrl } from "./_ghl";

/*
  Paid for a Brand Day, never picked the date.

  The order on /lock-in is pay, then choose. Between those two clicks sits a
  person who has handed over $5,000 and has nothing in the calendar, and until
  now nothing anywhere noticed. They close the tab to take a call, the day gets
  away from them, and the next signal is Sean wondering why they went quiet.

  prep-call-chase covers the other booking. This one is the Day itself, which is
  the expensive half.

  What it does is deliberately small: it puts `no-brand-day-booked` on them and
  takes it off again the moment they book. That tag is the trigger for the
  GoHighLevel email, because the copy belongs somewhere Sean can change it
  without a deploy. The link in that email is
  https://authorityengine.com.au/lock-in?c={{contact.id}}, which opens their
  page with the calendar already unlocked: the page reads the paid tag off the
  contact, so nobody is ever asked to pay twice.

  An hour of grace. Long enough that somebody picking a date over coffee is not
  chased mid-sentence, short enough to land while the purchase is still the
  thing they are thinking about. Runs hourly for the same reason.
*/

const PAID = "brand-day-paid";
const BOOKED = "brand-day-booked";
const FLAG = "no-brand-day-booked";
const PARTED = "install-parted-ways";

const GRACE_HOURS = 1;

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_BOOKINGS || process.env.SLACK_WEBHOOK_URL;
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
    console.error("day-book-chase: GHL credentials missing.");
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
        filters: [{ field: "tags", operator: "contains", value: PAID }],
      }),
    });
    if (!res.ok) {
      console.error("day-book-chase: search failed", res.status);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }
    contacts = (await res.json())?.contacts || [];
  } catch (err) {
    console.error("day-book-chase:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const now = Date.now();
  const chased: string[] = [];
  let cleared = 0;

  for (const c of contacts) {
    const tags: string[] = c?.tags || [];
    const hasBooked = tags.includes(BOOKED);
    const isFlagged = tags.includes(FLAG);

    /*
      Booked since last time. Take the flag off so nothing chases somebody for
      a thing they have already done, which is the fastest way to make a client
      stop reading your email.
    */
    if (hasBooked && isFlagged) {
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
        method: "DELETE",
        headers: auth,
        body: JSON.stringify({ tags: [FLAG] }),
      }).catch(() => {});
      cleared += 1;
      continue;
    }

    if (hasBooked || isFlagged) continue;
    if (tags.includes(PARTED)) continue;
    /* A rehearsal must not send Sean a chase email. */
    if (tags.includes("zz-test")) continue;

    const since = Date.parse(c?.dateUpdated || c?.dateAdded || "");
    if (!Number.isFinite(since)) continue;
    if ((now - since) / 3_600_000 < GRACE_HOURS) continue;

    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({ tags: [FLAG] }),
    });

    const who = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || c?.id;
    chased.push(
      res.ok
        ? `  • *${who}* paid and has no date. Tagged, so the reminder goes out. <${contactUrl(c.id)}|Open in GHL>`
        : `  • *${who}* paid and has no date, and the tag would not write, so NOTHING will chase them. <${contactUrl(c.id)}|Open in GHL>`
    );
  }

  if (chased.length) {
    await slack(
      [`:calendar: *${chased.length} paid without picking a date.*`, ...chased].join("\n")
    );
  }

  console.log("day-book-chase:", { paid: contacts.length, chased: chased.length, cleared });
  return {
    statusCode: 200,
    body: JSON.stringify({ paid: contacts.length, chased: chased.length, cleared }),
  };
};

export { handler };
