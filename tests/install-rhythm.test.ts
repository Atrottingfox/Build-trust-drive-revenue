import { describe, it, expect } from "vitest";
import {
  CADENCE,
  SLOT_HOURS,
  BOARD_HOURS,
  SLOT_RELEASE_WEEK,
  callDates,
  boardCallDates,
  firstCallDate,
  slotReleaseDate,
  addDays,
  weekdayOf,
  BOARD_INTERVAL_DAYS,
  isPublicHoliday,
  avoidHoliday,
  capacity,
} from "../netlify/functions/_cadence";
import { isFree } from "../netlify/functions/_google";
import { markdownToBlocks } from "../netlify/functions/_notion";
import { vttToTranscript } from "../netlify/functions/_debrief";

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
  it("is a Wednesday at least two weeks out", () => {
    /* Signing on Monday 2026-08-24. Two weeks lands on the 7th, so the first
       Wednesday available is the 9th. */
    const d = firstCallDate(new Date("2026-08-24T00:00:00Z"));
    expect(d).toBe("2026-09-09");
    expect(weekdayOf(d)).toBe(3);
  });

  it("never offers a date inside the lead time", () => {
    for (let i = 0; i < 21; i += 1) {
      const from = new Date(Date.UTC(2026, 7, 1 + i));
      const d = firstCallDate(from);
      expect(weekdayOf(d)).toBe(3);
      expect(new Date(`${d}T00:00:00Z`).getTime() - from.getTime()).toBeGreaterThanOrEqual(
        14 * 86400000
      );
    }
  });
});

describe("the board call", () => {
  it("is every four weeks", () => {
    expect(BOARD_INTERVAL_DAYS).toBe(28);
  });
});

describe("public holidays", () => {
  it("knows the Fridays that matter in Queensland", () => {
    expect(isPublicHoliday("2026-12-25")).toBe(true); /* Christmas */
    expect(isPublicHoliday("2026-12-26")).toBe(true); /* Boxing Day */
    expect(isPublicHoliday("2027-01-01")).toBe(true); /* New Year */
    expect(isPublicHoliday("2027-01-26")).toBe(true); /* Australia Day */
    expect(isPublicHoliday("2026-04-25")).toBe(true); /* Anzac Day */
    expect(isPublicHoliday("2026-08-28")).toBe(false);
  });

  it("computes Good Friday rather than tabulating it", () => {
    expect(isPublicHoliday("2026-04-03")).toBe(true);
    expect(isPublicHoliday("2027-03-26")).toBe(true);
    expect(isPublicHoliday("2028-04-14")).toBe(true);
  });

  it("moves a call back a week rather than forward, so it stays in its month", () => {
    expect(avoidHoliday("2026-12-25")).toBe("2026-12-18");
    expect(avoidHoliday("2026-04-03")).toBe("2026-03-27");
    expect(avoidHoliday("2026-09-25")).toBe("2026-09-25");
  });

  it("never schedules a board call on a public holiday", () => {
    for (const week of [1, 2, 3, 4]) {
      for (const d of boardCallDates("2026-09-23", week, 12)) {
        expect(isPublicHoliday(d)).toBe(false);
      }
    }
  });
});

describe("the board calls inside one install", () => {
  it("is three, four weeks apart, on Fridays", () => {
    /* First call Wednesday 2026-09-09. Four weeks out is the 7th of October,
       so the first board call is the Friday of that week. */
    expect(boardCallDates("2026-09-09")).toEqual(["2026-10-09", "2026-11-06", "2026-12-04"]);
  });

  it("keeps the interval exactly four weeks", () => {
    const d = boardCallDates("2026-09-09");
    for (let i = 1; i < d.length; i += 1) {
      expect(Date.parse(d[i]) - Date.parse(d[i - 1])).toBe(28 * 86400000);
    }
  });

  it("never lands on the client's own call day", () => {
    for (const start of ["2026-09-09", "2026-09-16", "2026-10-07"]) {
      for (const d of boardCallDates(start)) expect(weekdayOf(d)).toBe(5);
    }
  });

  it("is at least four weeks after the first call", () => {
    for (const start of ["2026-09-09", "2026-09-16", "2026-10-07", "2027-01-06"]) {
      expect(boardCallDates(start)[0] >= addDays(start, 28)).toBe(true);
    }
  });
});

describe("capacity", () => {
  const today = "2026-08-22";
  const hold = (hour: number, releases: string, client = "x", boardHour: number | null = null) => ({
    hour,
    boardHour,
    boardActive: boardHour !== null,
    client,
    releases,
  });

  it("reports an empty grid as fully available", () => {
    const c = capacity([], [], today);
    expect(c.total).toBe(SLOT_HOURS.length);
    expect(c.free).toBe(SLOT_HOURS.length);
    expect(c.freeHours).toEqual(SLOT_HOURS);
    expect(c.warning).toBeNull();
  });

  it("ignores holdings that have already released", () => {
    const c = capacity([hold(10, "2026-01-01")], [], today);
    expect(c.held).toBe(0);
    expect(c.free).toBe(SLOT_HOURS.length);
  });

  it("shouts when every Wednesday is held, and says when one frees", () => {
    const c = capacity(
      SLOT_HOURS.map((h, i) => hold(h, `2026-11-0${i + 1}`, `client ${i}`)),
      [],
      today
    );
    expect(c.free).toBe(0);
    expect(c.nextRelease?.date).toBe("2026-11-01");
    expect(c.warning).toContain("cannot be scheduled until 2026-11-01");
  });


  it("keeps the board slot after the Wednesday has gone back", () => {
    /* Past their install: the weekly rhythm ended, the board call did not. */
    const past = [
      { hour: 10, boardHour: 10, boardActive: true, client: "on", releases: "2026-01-01" },
    ];
    const c = capacity(past, [], today);
    expect(c.held).toBe(0);
    expect(c.freeHours).toContain(10);
    expect(c.onBoard).toBe(1);
    expect(c.freeBoardHours).not.toContain(10);
  });

  it("frees the board slot once the client has ended", () => {
    const gone = [
      { hour: 10, boardHour: 10, boardActive: false, client: "gone", releases: "2026-01-01" },
    ];
    const c = capacity(gone, [], today);
    expect(c.onBoard).toBe(0);
    expect(c.freeBoardHours).toContain(10);
    expect(c.free).toBe(SLOT_HOURS.length);
  });

  it("shouts on the trend, before the last slot goes", () => {
    /*
      Two signings in eight weeks is 0.25 a week, comfortably under the
      ceiling. It used to be four, which is 0.5, and that was under a six
      hour ceiling of 0.545. Dropping 1pm for Billy's standing call took the
      ceiling to 0.454, so the old figure now sits ABOVE it and the test was
      asserting silence from a grid that should be shouting.
    */
    const steady = capacity([hold(10, "2026-11-04")], ["2026-07-01", "2026-08-01"], today);
    expect(steady.warning).toBeNull();

    /* Eight in eight weeks is 1.0 a week, well over it. */
    const hot = capacity(
      [hold(10, "2026-11-04")],
      ["2026-07-01", "2026-07-08", "2026-07-15", "2026-07-22", "2026-07-29", "2026-08-05", "2026-08-12", "2026-08-19"],
      today
    );
    expect(hot.warning).toContain("against a ceiling");
  });

  it("puts the ceiling at the offered hours over eleven weeks", () => {
    const c = capacity([], [], today);
    expect(c.throughputPerWeek).toBeCloseTo(SLOT_HOURS.length / 11, 5);
    expect(c.throughputPerMonth).toBeCloseTo((SLOT_HOURS.length / 11) * (52 / 12), 5);
  });
});

describe("free/busy overlap", () => {
  /* Google returns "…T02:00:00Z"; Date.toISOString() produces "…T02:00:00.000Z".
     Compared as strings, "Z" sorts above ".", so a busy block that ends exactly
     when a slot starts reads as an overlap and the hour vanishes from the
     picker with nothing to show for it. */
  const busy = [{ start: "2026-09-16T01:00:00Z", end: "2026-09-16T02:00:00Z" }];

  it("blocks the hour that actually overlaps", () => {
    expect(isFree(busy, "2026-09-16T01:00:00.000Z", "2026-09-16T02:00:00.000Z")).toBe(false);
  });

  it("leaves the hour that merely touches it", () => {
    expect(isFree(busy, "2026-09-16T02:00:00.000Z", "2026-09-16T03:00:00.000Z")).toBe(true);
    expect(isFree(busy, "2026-09-16T00:00:00.000Z", "2026-09-16T01:00:00.000Z")).toBe(true);
  });

  it("still catches a partial overlap", () => {
    expect(isFree(busy, "2026-09-16T01:30:00.000Z", "2026-09-16T02:30:00.000Z")).toBe(false);
  });
});

describe("the debrief converter", () => {
  it("turns the template's shapes into Notion blocks", () => {
    const blocks = markdownToBlocks([
      "# Sean & Jacob - Call Summary, 2026-09-09",
      "",
      "**Context:** Week 1 of Jacob running content for Darcy.",
      "",
      "---",
      "",
      "## What We Covered",
      "",
      "**Hooks**",
      "They shipped four Reels.",
      "",
      "- [ ] Review the hook list",
      "- [x] Send the Loom",
      "- A thing worth noting",
      "> A quote",
    ].join("\n"));

    expect(blocks.map((b) => b.type)).toEqual([
      "heading_1",
      "paragraph",
      "divider",
      "heading_2",
      "paragraph",
      "paragraph",
      "to_do",
      "to_do",
      "bulleted_list_item",
      "quote",
    ]);
  });

  it("keeps the bold that carries the template's structure", () => {
    const [b] = markdownToBlocks("**Hooks** and then some plain text");
    expect(b.paragraph.rich_text[0].text.content).toBe("Hooks");
    expect(b.paragraph.rich_text[0].annotations.bold).toBe(true);
    expect(b.paragraph.rich_text[1].annotations.bold).toBe(false);
  });

  it("reads a checked box as done", () => {
    expect(markdownToBlocks("- [x] done")[0].to_do.checked).toBe(true);
    expect(markdownToBlocks("- [ ] not done")[0].to_do.checked).toBe(false);
  });

  it("splits past Notion's 2000 character limit rather than truncating", () => {
    const [b] = markdownToBlocks("x".repeat(4500));
    const parts = b.paragraph.rich_text;
    expect(parts).toHaveLength(3);
    expect(parts.map((p: any) => p.text.content).join("")).toHaveLength(4500);
  });
});

describe("the Zoom transcript reader", () => {
  it("drops the timing and keeps who said what", () => {
    const vtt = [
      "WEBVTT",
      "",
      "1",
      "00:00:01.000 --> 00:00:04.000",
      "Sean Fox: So how did the week go",
      "",
      "2",
      "00:00:04.000 --> 00:00:07.000",
      "Sean Fox: with the Reels",
      "",
      "3",
      "00:00:07.500 --> 00:00:09.000",
      "Jacob: Four went out",
    ].join("\n");

    expect(vttToTranscript(vtt)).toBe(
      "Sean Fox: So how did the week go with the Reels\n\nJacob: Four went out"
    );
  });
});

describe("event start times from Google", () => {
  /* Google returns start.dateTime with the calendar's own offset already on it.
     Sean's calendar is Australia/Sydney, so the same 10am Brisbane call comes
     back as +10:00 before October and +11:00 after. Appending an offset of our
     own produced an Invalid Date and matched nothing, silently. */
  const beforeDst = "2026-09-09T10:00:00+10:00";
  const duringDst = "2026-10-07T11:00:00+11:00";

  it("parses what Google actually sends", () => {
    expect(Number.isNaN(Date.parse(beforeDst))).toBe(false);
    expect(Number.isNaN(Date.parse(duringDst))).toBe(false);
  });

  it("is the bug: appending an offset invalidates it", () => {
    expect(Number.isNaN(Date.parse(`${beforeDst}+10:00`))).toBe(true);
  });

  it("resolves both sides of daylight saving to the same wall clock", () => {
    /* 10am Brisbane is 00:00Z all year, Queensland has no daylight saving. */
    expect(new Date(Date.parse(beforeDst)).toISOString()).toBe("2026-09-09T00:00:00.000Z");
    expect(new Date(Date.parse(duringDst)).toISOString()).toBe("2026-10-07T00:00:00.000Z");
  });
});
