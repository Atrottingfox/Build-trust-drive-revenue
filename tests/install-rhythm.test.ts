import { describe, it, expect } from "vitest";
import {
  CADENCE,
  SLOT_HOURS,
  SLOT_RELEASE_WEEK,
  callDates,
  firstCallDate,
  slotReleaseDate,
  weekdayOf,
  lastFridayOf,
  upcomingBoardCalls,
  capacity,
} from "../netlify/functions/_cadence";

describe("the rhythm", () => {
  it("is seven calls on the weeks Sean confirmed", () => {
    expect(CADENCE.map((c) => c.week)).toEqual([1, 2, 3, 4, 5, 7, 10]);
  });

  it("spaces them off the chosen Wednesday", () => {
    /* 2026-08-26 is a Wednesday. */
    const dates = callDates("2026-08-26").map((c) => c.date);
    expect(dates).toEqual([
      "2026-08-26",
      "2026-09-02",
      "2026-09-09",
      "2026-09-16",
      "2026-09-23",
      "2026-10-07",
      "2026-10-28",
    ]);
  });

  it("keeps every call on a Wednesday", () => {
    for (const c of callDates("2026-08-26")) expect(weekdayOf(c.date)).toBe(3);
  });

  it("releases the hour a week after the last call", () => {
    expect(slotReleaseDate("2026-08-26")).toBe("2026-11-04");
    expect(SLOT_RELEASE_WEEK).toBe(11);
  });
});

describe("the first call date", () => {
  it("is a Wednesday at least five days out", () => {
    /* Signing on Monday 2026-08-24 should not offer Wednesday the 26th. */
    const d = firstCallDate(new Date("2026-08-24T00:00:00Z"));
    expect(d).toBe("2026-09-02");
    expect(weekdayOf(d)).toBe(3);
  });

  it("never offers a date inside the lead time", () => {
    for (let i = 0; i < 21; i += 1) {
      const from = new Date(Date.UTC(2026, 7, 1 + i));
      const d = firstCallDate(from);
      expect(weekdayOf(d)).toBe(3);
      expect(new Date(`${d}T00:00:00Z`).getTime() - from.getTime()).toBeGreaterThanOrEqual(
        5 * 86400000
      );
    }
  });
});

describe("the board call", () => {
  it("is the last Friday of the month", () => {
    expect(lastFridayOf(2026, 7)).toBe("2026-08-28");
    expect(lastFridayOf(2026, 8)).toBe("2026-09-25");
    /* October 2026 ends on a Saturday, so the last Friday is the 30th. */
    expect(lastFridayOf(2026, 9)).toBe("2026-10-30");
  });

  it("only ever looks forward", () => {
    const next = upcomingBoardCalls(new Date("2026-08-29T00:00:00Z"), 3);
    expect(next).toEqual(["2026-09-25", "2026-10-30", "2026-11-27"]);
  });
});

describe("capacity", () => {
  const today = "2026-08-22";
  const hold = (hour: number, releases: string, client = "x") => ({ hour, client, releases });

  it("reports an empty grid as fully available", () => {
    const c = capacity([], [], today);
    expect(c.total).toBe(6);
    expect(c.free).toBe(6);
    expect(c.freeHours).toEqual(SLOT_HOURS);
    expect(c.warning).toBeNull();
  });

  it("ignores holdings that have already released", () => {
    const c = capacity([hold(10, "2026-01-01")], [], today);
    expect(c.held).toBe(0);
    expect(c.free).toBe(6);
  });

  it("shouts when every hour is held", () => {
    const c = capacity(
      SLOT_HOURS.map((h, i) => hold(h, `2026-11-0${i + 1}`, `client ${i}`)),
      [],
      today
    );
    expect(c.free).toBe(0);
    expect(c.nextRelease?.date).toBe("2026-11-01");
    expect(c.warning).toContain("cannot be scheduled");
  });

  it("shouts on the trend, before the last slot goes", () => {
    /* Four signings in the last eight weeks is 0.5 a week, under the ceiling. */
    const steady = capacity([hold(10, "2026-11-04")], ["2026-07-01", "2026-07-15", "2026-08-01", "2026-08-15"], today);
    expect(steady.warning).toBeNull();

    /* Eight in eight weeks is 1.0 a week, well over it. */
    const hot = capacity(
      [hold(10, "2026-11-04")],
      ["2026-07-01", "2026-07-08", "2026-07-15", "2026-07-22", "2026-07-29", "2026-08-05", "2026-08-12", "2026-08-19"],
      today
    );
    expect(hot.warning).toContain("against a ceiling");
  });

  it("puts the ceiling at six hours over eleven weeks", () => {
    const c = capacity([], [], today);
    expect(c.throughputPerWeek).toBeCloseTo(6 / 11, 5);
    expect(c.throughputPerMonth).toBeCloseTo((6 / 11) * (52 / 12), 5);
  });
});
