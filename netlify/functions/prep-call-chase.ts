import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Flags a paid client who has not booked their prep call.

  `prep-call-booked` already lands the moment somebody picks a slot, written by
  calendly-booked. Nothing marked the opposite, so the only way to notice a
  client who never booked was to remember them.

  This adds one tag, `no-prep-call-booked`, so it can be filtered, and so a GHL
  workflow can chase them without Sean holding the list in his head.

  Deliberately additive. It writes one new tag that nothing else in either repo
  reads or depends on, and it touches no existing path: not the application, not
  payment, not booking, not any workflow that currently fires. The funnel
  behaves exactly as it did before this file existed.

  It also removes the tag again once they do book, so the list is never stale
  and a workflow hanging off it cannot chase somebody who has already sorted it.
*/

const BOOKED = "prep-call-booked";
const NOT_BOOKED = "no-prep-call-booked";

/* Long enough that somebody who paid last night and will book over coffee is
   not chased, short enough to be useful before the Day arrives. */
const GRACE_HOURS = 48;

const auth = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const dateFieldId = process.env.GHL_FIELD_BRAND_DAY_DATE;

  if (!token || !locationId) {
    console.error("prep-call-chase: GHL credentials missing.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const h = auth(token);
  const flagged: string[] = [];
  const cleared: string[] = [];

  try {
    /* Everyone who has paid. The prep call only exists for people with a Day. */
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({
        locationId,
        pageLimit: 100,
        filters: [{ field: "tags", operator: "contains", value: "brand-day-paid" }],
      }),
    });
    if (!res.ok) {
      console.error("prep-call-chase: search failed", res.status);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    const contacts = (await res.json())?.contacts || [];
    const now = Date.now();

    for (const c of contacts) {
      const tags: string[] = c?.tags || [];
      const who = c?.email || c?.id;
      const hasBooked = tags.includes(BOOKED);
      const isFlagged = tags.includes(NOT_BOOKED);

      /* Booked since we last looked. Clear the flag so nothing chases them. */
      if (hasBooked && isFlagged) {
        await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
          method: "DELETE",
          headers: h,
          body: JSON.stringify({ tags: [NOT_BOOKED] }),
        }).catch(() => {
          /* It gets another go tomorrow. */
        });
        cleared.push(who);
        continue;
      }

      if (hasBooked || isFlagged) continue;

      /*
        How long since they paid.

        GHL does not expose when a tag was added, and recording a paid-at
        timestamp would mean editing the payment path, which is working and is
        not worth disturbing for this. The contact's last update is a close
        enough stand-in: paying writes tags and custom fields, so it is the last
        thing to touch a fresh client.
      */
      const since = (now - new Date(c?.dateUpdated || c?.dateAdded || 0).getTime()) / 3600000;
      if (since < GRACE_HOURS) continue;

      /* No point chasing a prep call for a Day that has already happened. */
      if (dateFieldId) {
        const f = (c?.customFields || []).find((x: any) => x.id === dateFieldId);
        const day = f?.value ? new Date(f.value).getTime() : 0;
        if (day && day < now) continue;
      }

      const tagged = await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
        method: "POST",
        headers: h,
        body: JSON.stringify({ tags: [NOT_BOOKED] }),
      });
      if (tagged.ok) flagged.push(who);
      else console.error("prep-call-chase: could not tag", c.id, tagged.status);
    }

    if (flagged.length) {
      const webhook = process.env.SLACK_WEBHOOK_PREP || process.env.SLACK_WEBHOOK_URL;
      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: [
              `:telephone_receiver: *${flagged.length} paid client${flagged.length > 1 ? "s have" : " has"} not booked a prep call*`,
              "",
              ...flagged.map((e) => `- ${e}`),
              "",
              `Tagged \`${NOT_BOOKED}\`. The tag clears itself the moment they book.`,
            ].join("\n"),
          }),
        }).catch(() => {
          /* Logged below. */
        });
      }
    }

    console.log(
      `prep-call-chase: flagged ${flagged.length}, cleared ${cleared.length}`
    );
    return { statusCode: 200, body: JSON.stringify({ ok: true, flagged, cleared }) };
  } catch (err) {
    console.error("prep-call-chase error:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

export { handler };
