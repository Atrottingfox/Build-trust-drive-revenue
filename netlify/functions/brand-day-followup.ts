import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  The day after a Brand Day, ask Sean whether to invite them into the 90 days.

  The Brand Day ends, everyone is tired, and the invitation is the single
  highest value thing that happens all week. Left to memory it happens on
  Thursday, or not at all, and by then the room has gone cold.

  So this posts one Slack message the morning after, with the client's name and
  a link that does the whole thing: tags `install-invited`, which fires the
  90 Day Install Invite workflow, which sends them the invitation.

  A link rather than a Slack button on purpose. Buttons need a Slack app with an
  interactivity URL, signature verification and a whole configuration surface.
  This needs none of it, works from a phone, and reuses the same confirm-then-act
  endpoint the application notification already uses.

  It never sends the invitation itself. Whether someone belongs in the 90 days
  is judged in the room, and an invitation that arrives without that judgement
  is billing on autopilot.
*/

/* So a Brand Day is never nudged about twice. */
const NUDGED_TAG = "install-nudge-sent";

const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const dateFieldId = process.env.GHL_FIELD_BRAND_DAY_DATE;
  const secret = process.env.DECIDE_SECRET;
  const webhook = process.env.SLACK_WEBHOOK_URL;

  if (!token || !locationId || !dateFieldId || !secret || !webhook) {
    console.error(
      "brand-day-followup not configured. Missing:",
      [
        !token && "GHL_TOKEN",
        !locationId && "GHL_LOCATION_ID",
        !dateFieldId && "GHL_FIELD_BRAND_DAY_DATE",
        !secret && "DECIDE_SECRET",
        !webhook && "SLACK_WEBHOOK_URL",
      ]
        .filter(Boolean)
        .join(", ")
    );
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const auth = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    /*
      Everyone whose Day is paid and confirmed. The date is on the contact,
      written by Calendly when they booked, so the window is worked out here
      rather than asked of the search.
    */
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        locationId,
        pageLimit: 50,
        filters: [{ field: "tags", operator: "contains", value: "brand-day-confirmed" }],
      }),
    });
    if (!res.ok) {
      console.error("brand-day-followup: contact search failed", res.status);
      return { statusCode: 200, body: JSON.stringify({ ok: false }) };
    }

    const contacts = (await res.json())?.contacts || [];
    const now = Date.now();
    const nudged: string[] = [];

    for (const c of contacts) {
      const tags: string[] = c?.tags || [];
      if (tags.includes(NUDGED_TAG)) continue;
      /* Already invited, or already signed. Nothing to ask. */
      if (tags.includes("install-invited") || tags.includes("install-signed")) continue;

      const field = (c?.customFields || []).find((f: any) => f.id === dateFieldId);
      const raw = field?.value;
      if (!raw) continue;

      const day = new Date(raw).getTime();
      if (!day) continue;

      /*
        The morning after, through to three days later. A window rather than a
        single day, so one missed run does not lose the nudge entirely, and the
        tag stops it repeating inside that window.
      */
      const hoursSince = (now - day) / 3600000;
      if (hoursSince < 12 || hoursSince > 96) continue;

      const name = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || c.id;
      const link = `https://authorityengine.com.au/.netlify/functions/decide?c=${encodeURIComponent(
        c.id
      )}&do=install-invite&k=${encodeURIComponent(secret)}`;

      const slotLink = `https://authorityengine.com.au/.netlify/functions/meeting-series?c=${encodeURIComponent(
        c.id
      )}&k=${encodeURIComponent(secret)}`;

      const text = [
        `:calendar: *Brand Day done with ${name}*`,
        c?.companyName ? `${c.companyName}` : null,
        new Date(day).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }),
        "",
        "If they belong in the 90 days, this sends the invitation and tags them:",
        `<${link}|Send the 90 Day link>`,
        "",
        "Slot agreed in the room? This builds the whole rhythm from one answer:",
        `<${slotLink}|Set their weekly slot>`,
        "",
        "_Nothing happens until you confirm on the page. Ignore this if they are not a fit._",
      ]
        .filter(Boolean)
        .join("\n");

      const posted = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      /* Only mark it asked if Slack actually took it, or a failed post loses
         the nudge for good. */
      if (posted.ok) {
        await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}/tags`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({ tags: [NUDGED_TAG] }),
        }).catch(() => {
          /* Worst case it asks again tomorrow, which is the safe direction. */
        });
        nudged.push(name);
      }
    }

    console.log(nudged.length ? `brand-day-followup nudged: ${nudged.join(", ")}` : "brand-day-followup: none due");
    return { statusCode: 200, body: JSON.stringify({ ok: true, nudged }) };
  } catch (err) {
    console.error("brand-day-followup error:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };
