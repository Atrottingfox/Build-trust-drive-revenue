import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Builds the whole 90 Day meeting rhythm from one answer.

  The slot gets agreed in the room, which is right: a paid client should not be
  sent a booking link for a meeting that is not optional, and Sean cannot guess
  their Wednesday. But agreeing it in the room used to mean creating eight
  calendar events by hand and doing the fortnightly date maths, which is exactly
  the kind of thing that gets done badly at 6pm after a full day on site.

  So he answers one question, on his phone, from the Slack message: what time.
  Everything else is derived.

    weeks 1 to 4    weekly
    week 4          the Content Board, same slot, different agenda
    weeks 5 to 12   fortnightly

  It returns a calendar file rather than writing to Google directly. That needs
  no OAuth, no consent screen and no refresh token to rot in eighteen months,
  and the file opens in Google, Apple and Outlook alike. Sean opens it, it lands
  in his calendar as a series, and the client is on the invite.

  GET renders the form. POST returns the .ics. Same reason as the approve links:
  mail and chat clients fetch URLs before a human sees them, and a GET that
  generated a series would fire on its own.
*/

const DURATION_MIN = 60;

const page = (body: string) => `<!doctype html>
<html><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Weekly slot</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A0B0D;color:#EAECEF;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
  .card{max-width:440px;width:100%;background:#121419;border:1px solid #242830;border-radius:16px;padding:32px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 10px}
  p{margin:0 0 20px;color:#A4AAB4;font-size:15px}
  label{display:block;font-size:13px;color:#A4AAB4;margin:0 0 6px}
  input,select{width:100%;padding:12px 14px;margin:0 0 18px;border-radius:10px;
       background:#0A0B0D;border:1px solid #2A2F38;color:#EAECEF;font-size:16px;font-family:inherit}
  button{width:100%;padding:14px;border-radius:999px;border:0;background:#EAECEF;color:#0A0B0D;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{background:#fff}
  .sub{font-size:13px;color:#6E757F;margin:16px 0 0;text-align:center}
  ol{margin:0 0 20px;padding-left:20px;color:#A4AAB4;font-size:14px}
  li{margin-bottom:4px}
</style></head><body><div class="card">${body}</div></body></html>`;

/* Wednesday of the week following the Brand Day, as a sensible default. */
function nextWednesday(from: Date): string {
  const d = new Date(from);
  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7 || 7));
  return d.toISOString().slice(0, 10);
}

const pad = (n: number) => String(n).padStart(2, "0");

/*
  Brisbane does not observe daylight saving, so a fixed +10:00 offset is correct
  all year. Written as UTC in the file, which every calendar reads without
  needing a timezone database.
*/
function toUtcStamp(dateStr: string, timeStr: string, addMinutes = 0): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d, hh - 10, mm + addMinutes));
  return (
    `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}` +
    `T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}00Z`
  );
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

const esc = (s: string) => String(s).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

function buildIcs(opts: { name: string; email: string; start: string; time: string }): string {
  const { name, email, start, time } = opts;
  const stamp = toUtcStamp(start, time);

  type Meeting = { date: string; title: string; body: string };
  const meetings: Meeting[] = [];

  /* Weeks 1 to 4, weekly. The fourth is the Content Board. */
  for (let i = 0; i < 4; i += 1) {
    const isBoard = i === 3;
    meetings.push({
      date: addDays(start, i * 7),
      title: isBoard
        ? `Content Board, ${name}`
        : `90 Day Install, week ${i + 1}, ${name}`,
      body: isBoard
        ? "The Content Board. We look at what has actually been published, what performed, and what the next cycle points at. Bring the numbers and the pieces you hated."
        : "Weekly 60 minutes for the Install. You and your Media Owner both on the call.",
    });
  }

  /* Weeks 6, 8, 10, 12, fortnightly. Week 5 is deliberately quiet: they have
     just had four weeks straight and the team needs a cycle to run on its own. */
  for (let i = 0; i < 4; i += 1) {
    const week = 6 + i * 2;
    meetings.push({
      date: addDays(start, (week - 1) * 7),
      title: `90 Day Install, week ${week}, ${name}`,
      body: "Fortnightly 60 minutes. Your team runs the cycle, I advise. Bring the numbers.",
    });
  }

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Authority Engine//90 Day Install//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
  ];

  meetings.forEach((mt, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:install-${encodeURIComponent(email)}-${i}-${start}@authorityengine.com.au`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUtcStamp(mt.date, time)}`,
      `DTEND:${toUtcStamp(mt.date, time, DURATION_MIN)}`,
      `SUMMARY:${esc(mt.title)}`,
      `DESCRIPTION:${esc(mt.body)}`,
      `ORGANIZER;CN=Sean Fox:mailto:sean@authorityengine.com.au`,
      `ATTENDEE;CN=${esc(name)};RSVP=TRUE:mailto:${email}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

const handler: Handler = async (event) => {
  const secret = process.env.DECIDE_SECRET;
  const token = process.env.GHL_TOKEN;

  const html = (b: string, code = 200) => ({
    statusCode: code,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    body: page(b),
  });

  if (!secret || !token) return html("<h1>Not set up</h1><p>This link needs configuring.</p>", 200);

  const q = event.queryStringParameters || {};
  if (q.k !== secret) return html("<h1>Link not valid</h1><p>Missing or wrong code.</p>", 403);

  const contactId = q.c || "";
  if (!contactId) return html("<h1>Link not valid</h1><p>No contact.</p>", 400);

  let name = "your client";
  let email = "";
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
    });
    if (res.ok) {
      const c = (await res.json())?.contact;
      name = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || name;
      email = c?.email || "";
    }
  } catch {
    /* Named is nicer. Not essential. */
  }

  if (event.httpMethod !== "POST") {
    return html(
      `<h1>Weekly slot for ${name}</h1>
       <p>One answer. Everything else is worked out: four weekly, the Content Board on week four, then four fortnightly.</p>
       <form method="POST">
         <label>First meeting</label>
         <input type="date" name="start" value="${nextWednesday(new Date())}" required>
         <label>Time, Brisbane</label>
         <input type="time" name="time" value="10:00" required>
         <button type="submit">Build the series</button>
       </form>
       <p class="sub">Downloads a calendar file. Open it and all eight land in your calendar with ${name} invited.</p>`
    );
  }

  const params = new URLSearchParams(event.body || "");
  const start = params.get("start") || "";
  const time = params.get("time") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(time)) {
    return html("<h1>Check the date</h1><p>Go back and pick a date and a time.</p>", 400);
  }
  if (!email) return html("<h1>No email on this contact</h1><p>They cannot be invited without one.</p>", 400);

  const ics = buildIcs({ name, email, start, time });
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "client";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="90-day-${slug}.ics"`,
      "Cache-Control": "no-store",
    },
    body: ics,
  };
};

export { handler };
