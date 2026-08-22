/*
  The 90 Day Install rhythm, and the capacity maths that falls out of it.

  Everything here is pure. No network, no credentials, no Google. That is
  deliberate: the shape of the programme is the part most likely to change, and
  it should be changeable without touching anything that can break at runtime.

  Two rhythms live in here and they are not the same thing.

    The client rhythm   seven calls, on one Wednesday hour that belongs to that
                        client for the length of their install.
    The board call      one call a month, last Friday, everybody on it. Fixed
                        date for everyone, so it costs no Wednesday capacity.
*/

/* ---------------------------------------------------------------- cadence */

export type Call = { week: number; month: number; title: string };

/*
  Confirmed by Sean, 2026-08-22. Month one weekly, month two biweekly, month
  three once. Note the last call is week 10, not week 12: the run to Day 90 is
  deliberately quiet.
*/
export const CADENCE: Call[] = [
  { week: 1, month: 1, title: "90 Day Install, week 1" },
  { week: 2, month: 1, title: "90 Day Install, week 2" },
  { week: 3, month: 1, title: "90 Day Install, week 3" },
  { week: 4, month: 1, title: "90 Day Install, week 4" },
  { week: 5, month: 2, title: "90 Day Install, week 5" },
  { week: 7, month: 2, title: "90 Day Install, week 7" },
  { week: 10, month: 3, title: "90 Day Install, week 10" },
];

export const DURATION_MIN = 60;
export const TZ = "Australia/Brisbane";

/* Wednesday. 0 is Sunday, matching getUTCDay. */
export const SLOT_WEEKDAY = 3;

/*
  Wednesday 10am to 6pm, less 2pm and 3pm which are already committed. Stated
  as a list rather than a range with exclusions, because a list is what a person
  can read and correct in five seconds.

  The picker also checks the real calendar, so an hour that quietly fills up
  stops being offered without anyone editing this.
*/
export const SLOT_HOURS = [10, 11, 12, 13, 16, 17];

/*
  How long after signing the first call can land. Someone who signs on a
  Thursday should not be asked to show up five days later, and a slot offered
  for tomorrow will be gone by the time they open the email.
*/
export const MIN_LEAD_DAYS = 5;

/*
  A slot is released a week after the last call rather than the moment it ends,
  so a call that slips by a week does not land on top of the next client.
*/
export const SLOT_RELEASE_WEEK = Math.max(...CADENCE.map((c) => c.week)) + 1;

/* ------------------------------------------------------------- date maths */

const pad = (n: number) => String(n).padStart(2, "0");

export function toDateStr(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return toDateStr(new Date(Date.UTC(y, m - 1, d + days)));
}

export function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/*
  Brisbane does not observe daylight saving, so a fixed +10:00 offset is correct
  all year. Used only where an absolute instant is needed, which is the free/busy
  lookup. Events themselves are written as local time plus a timezone name, which
  is more honest and survives anyone ever moving.
*/
export function toUtcIso(dateStr: string, hour: number, addMinutes = 0): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hour - 10, addMinutes)).toISOString();
}

export function toLocalIso(dateStr: string, hour: number, addMinutes = 0): string {
  const total = hour * 60 + addMinutes;
  return `${dateStr}T${pad(Math.floor(total / 60))}:${pad(total % 60)}:00`;
}

/* The first Wednesday far enough out to be fair on the client. */
export function firstCallDate(from: Date): string {
  let d = toDateStr(from);
  d = addDays(d, MIN_LEAD_DAYS);
  while (weekdayOf(d) !== SLOT_WEEKDAY) d = addDays(d, 1);
  return d;
}

/* The seven dates, derived from whichever Wednesday is chosen. */
export function callDates(startDate: string): Array<Call & { date: string }> {
  return CADENCE.map((c) => ({ ...c, date: addDays(startDate, (c.week - 1) * 7) }));
}

/* When this client's hour goes back on the market. */
export function slotReleaseDate(startDate: string): string {
  return addDays(startDate, (SLOT_RELEASE_WEEK - 1) * 7);
}

/* ----------------------------------------------------------- board call */

/*
  Last Friday of the month, one call, everybody on it. Because the date is the
  same for every client it consumes no Wednesday capacity, which is why it sits
  outside CADENCE rather than inside it.
*/
export const BOARD_HOUR = 10;
export const BOARD_TITLE = "Content Board";

export function lastFridayOf(year: number, monthIndex: number): string {
  const d = new Date(Date.UTC(year, monthIndex + 1, 0)); /* last day of month */
  while (d.getUTCDay() !== 5) d.setUTCDate(d.getUTCDate() - 1);
  return toDateStr(d);
}

/* The next `count` board calls from today, so the scheduler always runs ahead. */
export function upcomingBoardCalls(from: Date, count = 6): string[] {
  const out: string[] = [];
  let y = from.getUTCFullYear();
  let m = from.getUTCMonth();
  const today = toDateStr(from);
  while (out.length < count) {
    const d = lastFridayOf(y, m);
    if (d > today) out.push(d);
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return out;
}

/* -------------------------------------------------------------- capacity */

export type Holding = { hour: number; client: string; releases: string };

export type Capacity = {
  total: number;
  held: number;
  free: number;
  freeHours: number[];
  nextRelease: { hour: number; client: string; date: string } | null;
  /* Clients per week the grid can sustain once it is full. */
  throughputPerWeek: number;
  throughputPerMonth: number;
  /* Signings per week over the window actually observed. */
  intakePerWeek: number;
  warning: string | null;
};

/*
  The whole capacity question in one place.

  Six hours, each held for SLOT_RELEASE_WEEK weeks, is a hard ceiling on how
  fast clients can be taken on. Sustained intake above that does not create a
  queue, it creates a client with no slot, which is discovered at the worst
  possible moment: after they have paid.

  So the warning fires on the trend, not on the last free slot. By the time
  there is one slot left, anyone already signed is already a problem.
*/
export function capacity(
  holdings: Holding[],
  recentStarts: string[],
  today: string,
  intakeWindowWeeks = 8
): Capacity {
  const live = holdings.filter((h) => h.releases > today);
  const heldHours = new Set(live.map((h) => h.hour));
  const freeHours = SLOT_HOURS.filter((h) => !heldHours.has(h));

  const next = live
    .slice()
    .sort((a, b) => a.releases.localeCompare(b.releases))[0];

  const throughputPerWeek = SLOT_HOURS.length / SLOT_RELEASE_WEEK;

  const windowStart = addDays(today, -intakeWindowWeeks * 7);
  const inWindow = recentStarts.filter((d) => d > windowStart && d <= today);
  const intakePerWeek = inWindow.length / intakeWindowWeeks;

  let warning: string | null = null;
  if (freeHours.length === 0) {
    warning =
      "Every Wednesday hour is held. Anyone who signs now cannot be scheduled until " +
      (next ? next.releases : "a slot frees") +
      ". Open more hours or another day before taking on anyone else.";
  } else if (intakePerWeek > throughputPerWeek) {
    warning =
      `Taking on ${intakePerWeek.toFixed(1)} clients a week against a ceiling of ` +
      `${throughputPerWeek.toFixed(1)}. At this rate the grid is full in about ` +
      `${Math.max(1, Math.ceil(freeHours.length / (intakePerWeek - throughputPerWeek)))} weeks. ` +
      "Add hours now rather than when it bites.";
  } else if (freeHours.length <= 1) {
    warning =
      `One hour left, and it frees again on ${next ? next.releases : "unknown"}. ` +
      "Worth opening another before the next signature.";
  }

  return {
    total: SLOT_HOURS.length,
    held: live.length,
    free: freeHours.length,
    freeHours,
    nextRelease: next ? { hour: next.hour, client: next.client, date: next.releases } : null,
    throughputPerWeek,
    throughputPerMonth: throughputPerWeek * (52 / 12),
    intakePerWeek,
    warning,
  };
}
