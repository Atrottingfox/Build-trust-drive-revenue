import type { Handler } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { accessToken, listInstallEvents, calendarId } from "./_google";
import { toUtcIso, toDateStr, addDays } from "./_cadence";

/*
  Who a call belonged to, answered from the calendar.

  Zoom knows a meeting happened and roughly what it was called. It does not know
  it was week five of Darcy's install, that the operator is Jacob, or that a
  Friday call has the founder in the room. The calendar knows all three, because
  the slot picker wrote them there when the client booked.

  This exists so the delivery app in the other repo can ask that question
  without reimplementing the matching or reaching into this one's calendar
  credentials. It answers from a start time alone.

  Deliberately read only. It reports what the calendar says and changes nothing,
  so the worst a caller can do with it is learn a name.
*/

const MATCH_WINDOW_MIN = 90;

const json = (body: unknown, statusCode = 200) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

function authorised(header: string | undefined, secret: string): boolean {
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

const handler: Handler = async (event) => {
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!secret) {
    console.error("call-context: CALL_CONTEXT_SECRET not set.");
    return json({ error: "not-configured" }, 503);
  }

  if (event.httpMethod !== "POST") return json({ error: "post-only" }, 405);

  if (!authorised(event.headers["x-call-context-key"], secret)) {
    return json({ error: "unauthorised" }, 401);
  }

  let body: any;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json({ error: "bad-json" }, 400);
  }

  const startedAt = new Date(body.startTime);
  if (Number.isNaN(startedAt.getTime())) {
    return json({ error: "startTime must be an ISO datetime" }, 400);
  }

  try {
    const token = await accessToken();
    const day = toDateStr(startedAt);

    const events = await listInstallEvents(
      token,
      toUtcIso(addDays(day, -1), 0),
      toUtcIso(addDays(day, 2), 0)
    );

    /*
      Google returns start.dateTime with the calendar's own UTC offset already
      on it, e.g. 2026-10-07T10:00:00+11:00 for a Sydney calendar in daylight
      saving. Appending an offset of our own produced an Invalid Date and
      matched nothing at all, silently. Parse it as the instant it already is.

      Nearest wins, within the window: a call that starts eight minutes late is
      still that call.
    */
    const ranked = events
      .map((e) => ({
        e,
        gap: Math.abs(Date.parse(e.startLocal) - startedAt.getTime()),
      }))
      .filter((x) => x.gap <= MATCH_WINDOW_MIN * 60_000)
      .sort((a, b) => a.gap - b.gap);

    const best = ranked[0];

    /* No match is an answer, not a failure. The caller falls back to its own
       matching, and a 404 here would read as this endpoint being broken. */
    /* Not a slot picker call. Any ordinary calendar event starting within 30
       minutes still says who was invited, which is enough for the caller to
       find the client by email. Sean's own addresses are left out. */
    if (!best) {
      const attendees = await nearestAttendees(token, startedAt);
      return json({ matched: false, attendees });
    }

    const e = best.e;
    return json({
      matched: true,
      client: e.clientName,
      clientEmail: e.founderEmail || null,
      operator: e.operatorName || null,
      operatorEmail: e.operatorEmail || null,
      week: e.board ? null : Number(e.week) || null,
      callType: e.board ? "board" : "weekly",
      scheduledFor: e.startLocal,
      minutesOut: Math.round(best.gap / 60_000),
      eventId: e.id,
      attendees: await nearestAttendees(token, startedAt),
    });
  } catch (err) {
    console.error("call-context:", err);
    return json({ error: String(err) }, 502);
  }
};

async function nearestAttendees(token: string, at: Date): Promise<string[]> {
  const params = new URLSearchParams({
    timeMin: new Date(at.getTime() - 30 * 60_000).toISOString(),
    timeMax: new Date(at.getTime() + 30 * 60_000).toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "20",
  });
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId())}/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return [];
  const items = ((await res.json()).items ?? [])
    .filter((it: any) => it.status !== "cancelled" && it.start?.dateTime && (it.attendees ?? []).length > 1)
    .map((it: any) => ({ it, gap: Math.abs(Date.parse(it.start.dateTime) - at.getTime()) }))
    .filter((x: any) => x.gap <= 30 * 60_000)
    .sort((a: any, b: any) => a.gap - b.gap);
  const own = /@(authorityengine\.com\.au|atrottingfox\.com\.au)$|^sean\.fox@hotmail\.com$|^atrottingfox@/i;
  return (items[0]?.it.attendees ?? [])
    .map((a: any) => String(a.email || "").toLowerCase())
    .filter((e: string) => e && !own.test(e));
}

export { handler };
