/*
  Google Calendar, only the four things this needs.

  A refresh token rather than a service account, because the calendar being
  written to is Sean's own and a service account would need domain wide
  delegation to touch it. One consent, once, and the token is then monitored on
  the weekly health check so it warns before it rots rather than after.

  Every event this creates carries `install=1` and the client it belongs to in
  private extended properties. That is what makes the grid readable later: the
  calendar itself is the record of who holds which hour and until when, so
  nothing has to be kept in sync with it.
*/

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://www.googleapis.com/calendar/v3";

export const calendarId = () => process.env.GOOGLE_CALENDAR_ID || "primary";

/* Netlify reuses containers between invocations, so a token fetched on one
   request is usually still good on the next. Refreshing every time works, it is
   just a wasted round trip on every page load. */
let cached: { token: string; expires: number } | null = null;

export async function accessToken(): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;

  const id = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  const refresh = process.env.GOOGLE_REFRESH_TOKEN;
  if (!id || !secret || !refresh) throw new Error("google-not-configured");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    /*
      A refresh token that has been revoked returns 400 invalid_grant, which is
      not a transient failure and will not fix itself. Naming it here means the
      health check and the Slack alert say what actually happened rather than
      "calendar error".
    */
    const body = await res.text();
    throw new Error(body.includes("invalid_grant") ? "google-token-revoked" : `google-token-${res.status}`);
  }

  const json = await res.json();
  cached = { token: json.access_token, expires: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return cached.token;
}

/* ------------------------------------------------------------- free/busy */

export type Busy = { start: string; end: string };

/*
  Google rejects a free/busy query spanning more than about three months with
  `timeRangeTooLong`, a 400. The picker needs four: the last board call of an
  install can sit fourteen weeks out.

  So the range is split and the results concatenated. Overlapping busy blocks
  across a chunk boundary are harmless, isFree only ever asks whether any block
  overlaps.

  This failed against the real calendar while every stubbed test passed, because
  a stub does not enforce Google's limits. The picker offered a client nothing
  at all and told them Sean had been informed.
*/
const CHUNK_DAYS = 60;

export async function freeBusy(token: string, timeMinIso: string, timeMaxIso: string): Promise<Busy[]> {
  const start = Date.parse(timeMinIso);
  const end = Date.parse(timeMaxIso);
  const span = CHUNK_DAYS * 86_400_000;
  const out: Busy[] = [];

  for (let from = start; from < end; from += span) {
    const to = Math.min(from + span, end);

    const res = await fetch(`${API}/freeBusy`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin: new Date(from).toISOString(),
        timeMax: new Date(to).toISOString(),
        items: [{ id: calendarId() }],
      }),
    });

    if (!res.ok) throw new Error(`google-freebusy-${res.status}-${(await res.text()).slice(0, 200)}`);

    const json = await res.json();
    const calendars = json.calendars ?? {};

    /*
      Google keys the response by the id that was asked for, but a calendar can
      also come back under its resolved address rather than the alias "primary".
      Taking every calendar in the response avoids depending on which, and there
      is only ever one because only one was requested.
    */
    for (const cal of Object.values<any>(calendars)) {
      if (Array.isArray(cal?.busy)) out.push(...cal.busy);
    }
  }

  return out;
}

/*
  Whether a given hour is clear. Half an hour of overlap is still a clash, so
  this is an interval test rather than a start time test.

  Compared as instants, not as strings. Google returns "2026-09-16T02:00:00Z"
  while Date.toISOString() produces "2026-09-16T02:00:00.000Z", and comparing
  those lexically makes a busy block bleed into the hour after it: "Z" sorts
  above ".", so an end time that exactly meets a start time reads as an overlap.
  The symptom was hours quietly missing from the picker, with nothing to show
  for it. Two instants that are equal do not overlap.
*/
export function isFree(busy: Busy[], startIso: string, endIso: string): boolean {
  const start = Date.parse(startIso);
  const end = Date.parse(endIso);
  return !busy.some((b) => Date.parse(b.start) < end && Date.parse(b.end) > start);
}

/* ---------------------------------------------------------------- events */

export type NewEvent = {
  summary: string;
  description: string;
  /* Local wall clock, e.g. 2026-08-26T10:00:00, paired with a timezone name.
     More honest than pre-converting to UTC, and it survives Sean moving. */
  startLocal: string;
  endLocal: string;
  timeZone: string;
  attendees?: string[];
  privateProps?: Record<string, string>;
};

export async function createEvent(token: string, ev: NewEvent): Promise<string> {
  /*
    conferenceDataVersion=1 with no conferenceData in the body is what stops a
    Meet link being attached. The earlier attempt to remove Meet failed because
    the tool in use did not expose conferencing at all; the API does.

    VERIFY THIS WITH ONE REAL EVENT before trusting it. A Workspace admin
    setting that force adds conferencing may still win, and if it does the
    honest answer is to turn that setting off rather than to fight it here.
  */
  const url =
    `${API}/calendars/${encodeURIComponent(calendarId())}/events` +
    `?conferenceDataVersion=1&sendUpdates=all`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: ev.summary,
      description: ev.description,
      start: { dateTime: ev.startLocal, timeZone: ev.timeZone },
      end: { dateTime: ev.endLocal, timeZone: ev.timeZone },
      attendees: (ev.attendees ?? []).map((email) => ({ email })),
      extendedProperties: { private: { install: "1", ...(ev.privateProps ?? {}) } },
      reminders: { useDefault: true },
    }),
  });

  if (!res.ok) throw new Error(`google-create-${res.status}-${await res.text()}`);
  return (await res.json()).id as string;
}

export type InstallEvent = {
  id: string;
  startLocal: string;
  client: string;
  clientName: string;
  founderEmail: string;
  operatorEmail: string;
  operatorName: string;
  releases: string;
  week: string;
  hour: string;
  boardHour: string;
  boardWeek: string;
  board: boolean;
  attendeeEmails: string[];
};

/*
  Swap who is on an event without rebuilding it.

  An operator hired in week three has to land on the calls that have not
  happened yet, and only those. Rebuilding the series would move dates that the
  client has already worked around, so the events stay and the guest list
  changes.
*/
export async function patchEventAttendees(
  token: string,
  id: string,
  emails: string[],
  privateProps: Record<string, string> = {}
): Promise<void> {
  const res = await fetch(
    `${API}/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(id)}?sendUpdates=all`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        attendees: emails.map((email) => ({ email })),
        ...(Object.keys(privateProps).length ? { extendedProperties: { private: privateProps } } : {}),
      }),
    }
  );
  if (!res.ok) throw new Error(`google-patch-${res.status}`);
}

/*
  Every install event in a window. Filtered server side on the private property,
  so ordinary calendar entries never come back and the grid cannot be confused
  by a meeting that merely happens to be on a Wednesday.
*/
export async function listInstallEvents(token: string, timeMinIso: string, timeMaxIso: string): Promise<InstallEvent[]> {
  const params = new URLSearchParams({
    privateExtendedProperty: "install=1",
    timeMin: timeMinIso,
    timeMax: timeMaxIso,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "2500",
  });

  const res = await fetch(
    `${API}/calendars/${encodeURIComponent(calendarId())}/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`google-list-${res.status}`);

  const json = await res.json();
  return (json.items ?? [])
    .filter((it: any) => it.status !== "cancelled" && it.start?.dateTime)
    .map((it: any) => ({
      id: it.id,
      startLocal: it.start.dateTime,
      client: it.extendedProperties?.private?.client ?? "",
      clientName: it.extendedProperties?.private?.clientName ?? "",
      founderEmail: it.extendedProperties?.private?.founderEmail ?? "",
      operatorEmail: it.extendedProperties?.private?.operatorEmail ?? "",
      operatorName: it.extendedProperties?.private?.operatorName ?? "",
      releases: it.extendedProperties?.private?.releases ?? "",
      week: it.extendedProperties?.private?.week ?? "",
      hour: it.extendedProperties?.private?.hour ?? "",
      boardHour: it.extendedProperties?.private?.boardHour ?? "",
      boardWeek: it.extendedProperties?.private?.boardWeek ?? "",
      board: it.extendedProperties?.private?.board === "1",
      attendeeEmails: (it.attendees ?? [])
        .filter((a: any) => !a.self && a.email)
        .map((a: any) => String(a.email).toLowerCase()),
    }));
}

export async function deleteEvent(token: string, id: string): Promise<void> {
  const res = await fetch(
    `${API}/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(id)}?sendUpdates=all`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
  );
  /* 410 means it is already gone, which is the state we wanted. */
  if (!res.ok && res.status !== 404 && res.status !== 410) throw new Error(`google-delete-${res.status}`);
}
