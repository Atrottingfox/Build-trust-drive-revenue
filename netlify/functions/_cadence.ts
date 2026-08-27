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
  Wednesday 10am to 6pm, less the three hours already committed to standing
  client calls. Stated as a list rather than a range with exclusions, because a
  list is what a person can read and correct in five seconds.

    1pm  Billy, Geronimo
    2pm  Jacob, Undeniable
    3pm  Darcy, Alpha

  1pm was offered until 2026-08-27 and should not have been. Only Jacob's call
  is a recurring event on the calendar, so freeBusy could see his and not the
  other two, and the picker would have sold Billy's hour to the next client who
  booked, for eleven weeks.

  This list is the belt. The braces is the calendar check below, which the
  picker also runs, so an hour that quietly fills stops being offered without
  anyone editing this. Once all three standing calls exist as recurring events,
  the calendar alone is enough and these exclusions can go.
*/
export const SLOT_HOURS = [10, 11, 12, 16, 17];

/*
  How long after signing the first call can land. Two weeks, confirmed by Sean:
  long enough that a founder can get their operator in place and clear the hour,
  short enough that the momentum of signing has not gone.
*/
export const MIN_LEAD_DAYS = 14;

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
  Queensland public holidays that can actually fall on a Friday. The Monday ones
  are left out on purpose: a board call is never on a Monday, so listing them
  would be code nobody can ever exercise.

  Good Friday moves every year, so Easter is computed rather than tabulated.
  Everything else is a fixed date. Observed-day shifts for a holiday landing on
  a weekend only ever move it to a Monday, so they cannot affect a Friday.
*/
function easterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

export function isPublicHoliday(dateStr: string): boolean {
  const [y, m, d] = dateStr.split("-").map(Number);
  const md = `${pad(m)}-${pad(d)}`;

  /* New Year, Australia Day, Anzac Day, Christmas, Boxing Day. */
  if (["01-01", "01-26", "04-25", "12-25", "12-26"].includes(md)) return true;

  const easter = easterSunday(y);
  const good = new Date(Date.UTC(y, easter.month - 1, easter.day - 2));
  return toDateStr(good) === dateStr;
}

/*
  A board call on Christmas Day is a board call that does not happen.

  Moves back a week rather than forward, so it stays close to its four week
  slot rather than drifting further from the one before it.
*/
export function avoidHoliday(dateStr: string): string {
  let d = dateStr;
  let guard = 0;
  while (isPublicHoliday(d) && guard < 5) {
    d = addDays(d, -7);
    guard += 1;
  }
  return d;
}

/*
  The Content Board. Every four weeks from their first call, on a Friday, at an
  hour they choose.

  It used to be "the nth Friday of the month", which needed a second grid, a
  choice between twenty four combinations, and special handling for months with
  five Fridays. Four weeks from the first call needs none of that: the interval
  is the same for everybody, the date falls out of when they started, and the
  only thing left to pick is the hour.

  Friday rather than their own call day so nobody ends up with two calls in one
  day.
*/
export const BOARD_HOURS = [10, 11, 12, 13, 16, 17];
export const BOARD_WEEKDAY = 5;
export const BOARD_TITLE = "Content Board";

/* Four weeks, then every four weeks. */
export const BOARD_INTERVAL_DAYS = 28;

/*
  How many board calls to create at booking. Three covers the 90 days, which is
  what the client has agreed to at the point they pick their hour.
*/
export const BOARD_CALL_COUNT = 3;

/*
  How far ahead the board calls are kept topped up once somebody stays on past
  the install. Far enough that the next one is always visible in their calendar,
  short enough that a client who leaves does not have a year of invitations to
  unpick.
*/
export const BOARD_HORIZON = 4;

/*
  Board calls from a given date, skipping any last-Friday that falls within a
  week of it. Somebody who signs on the 26th should not be handed a board call
  on the 28th, when they have not run a single week yet.

  Anchored on a count rather than on a date window, so every client gets the
  same number. Tying it to the install end instead meant a late month signup
  quietly got two, which was nobody's decision.
*/
export function boardCallDates(startDate: string, count = BOARD_CALL_COUNT): string[] {
  const out: string[] = [];

  /* The first Friday four weeks out. Their first call is a Wednesday, so this
     is two days later in the same week, and every one after is exactly four
     weeks from the last. */
  let d = addDays(startDate, BOARD_INTERVAL_DAYS);
  while (weekdayOf(d) !== BOARD_WEEKDAY) d = addDays(d, 1);

  while (out.length < count) {
    out.push(avoidHoliday(d));
    d = addDays(d, BOARD_INTERVAL_DAYS);
  }
  return out;
}



/* -------------------------------------------------------------- capacity */

export type Holding = {
  hour: number;
  boardHour: number | null;
  /* Whether they still have a board call ahead of them. A client past week ten
     has given their Wednesday back and still holds their board slot. */
  boardActive: boolean;
  client: string;
  releases: string;
};

export type Capacity = {
  total: number;
  held: number;
  free: number;
  freeHours: number[];
  freeBoardHours: number[];
  /* Ongoing relationships, which outlive the install. */
  onBoard: number;
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
  /*
    Two different questions. A Wednesday hour is held until the weekly rhythm
    ends. A board slot is held for as long as the client still has a board call
    ahead of them, which is for as long as they stay.
  */
  const live = holdings.filter((h) => h.releases > today);
  const onBoard = holdings.filter((h) => h.boardActive && h.boardHour !== null);

  const heldHours = new Set(live.map((h) => h.hour));
  const heldBoard = new Set(onBoard.map((h) => h.boardHour as number));
  const freeHours = SLOT_HOURS.filter((h) => !heldHours.has(h));
  const freeBoardHours = BOARD_HOURS.filter((h) => !heldBoard.has(h));

  const next = live
    .slice()
    .sort((a, b) => a.releases.localeCompare(b.releases))[0];

  const throughputPerWeek = SLOT_HOURS.length / SLOT_RELEASE_WEEK;

  const windowStart = addDays(today, -intakeWindowWeeks * 7);
  const inWindow = recentStarts.filter((d) => d > windowStart && d <= today);
  const intakePerWeek = inWindow.length / intakeWindowWeeks;

  /*
    Board calls are spaced from each client's own start date, so two clients
    rarely land on the same Friday and the live calendar check catches it when
    they do. The Wednesday grid is the real constraint on the book.
  */
  const openings = freeHours.length;

  let warning: string | null = null;
  if (openings === 0) {
    warning =
      "Every Wednesday hour is held. Anyone who signs now cannot be scheduled until " +
      (next ? next.releases : "a slot frees") +
      ". Open more hours or another day before taking on anyone else.";
  } else if (intakePerWeek > throughputPerWeek) {
    warning =
      `Taking on ${intakePerWeek.toFixed(1)} clients a week against a ceiling of ` +
      `${throughputPerWeek.toFixed(1)}. At this rate the grid is full in about ` +
      `${Math.max(1, Math.ceil(openings / (intakePerWeek - throughputPerWeek)))} weeks. ` +
      "Add hours now rather than when it bites.";
  } else if (openings <= 1) {
    warning =
      `One opening left, and the next frees on ${next ? next.releases : "unknown"}. ` +
      "Worth adding another hour before the next signature.";
  }

  return {
    total: SLOT_HOURS.length,
    held: live.length,
    free: openings,
    freeHours,
    freeBoardHours,
    onBoard: onBoard.length,
    nextRelease: next ? { hour: next.hour, client: next.client, date: next.releases } : null,
    throughputPerWeek,
    throughputPerMonth: throughputPerWeek * (52 / 12),
    intakePerWeek,
    warning,
  };
}
