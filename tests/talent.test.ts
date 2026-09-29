import { describe, expect, it } from "vitest";
import { currentCall, memberId } from "../netlify/functions/_talent";

/* Sydney 7:45am on a date, as a UTC instant. October onwards is AEDT (+11),
   June is AEST (+10). */
const syd = (iso: string, offsetHours: number) =>
  new Date(new Date(iso + "Z").getTime() - offsetHours * 3600_000);

describe("currentCall", () => {
  it("first Wednesday during the call is Open Q&A", () => {
    expect(currentCall(syd("2026-10-07T07:45:00", 11))).toBe("Open Q&A");
  });
  it("second Wednesday is Member Spotlight", () => {
    expect(currentCall(syd("2026-10-14T07:45:00", 11))).toBe("Member Spotlight");
  });
  it("counts from 7:15 to 8:30, not the rest of the day", () => {
    expect(currentCall(syd("2026-10-07T07:15:00", 11))).toBe("Open Q&A");
    expect(currentCall(syd("2026-10-07T08:30:00", 11))).toBe("Open Q&A");
    expect(currentCall(syd("2026-10-07T07:14:00", 11))).toBeNull();
    expect(currentCall(syd("2026-10-07T08:31:00", 11))).toBeNull();
  });
  it("third Wednesday and other days are not calls", () => {
    expect(currentCall(syd("2026-10-21T07:45:00", 11))).toBeNull();
    expect(currentCall(syd("2026-10-08T07:45:00", 11))).toBeNull();
  });
  it("works outside daylight saving", () => {
    expect(currentCall(syd("2027-06-02T07:45:00", 10))).toBe("Open Q&A");
  });
});

describe("memberId", () => {
  it("accepts a Notion page id with or without dashes", () => {
    expect(memberId("3e90b2eb-6dfb-81f4-a8ae-f3d5b4313021")).toBe("3e90b2eb6dfb81f4a8aef3d5b4313021");
  });
  it("rejects anything else", () => {
    expect(memberId("jake")).toBeNull();
    expect(memberId(undefined)).toBeNull();
  });
});
