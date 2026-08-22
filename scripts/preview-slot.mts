/*
  Renders the real slot picker with Google and GHL stubbed out.

  This is not a mock of the page. It is the actual handler, the actual
  availability filtering and the actual date maths, with only the two network
  calls replaced. So it proves the thing that matters: given a calendar with
  some hours already busy, does the client see the right choices.

      npx tsx scripts/preview-slot.mts
*/

import { writeFileSync } from "node:fs";

process.env.GHL_TOKEN = "stub";
process.env.GHL_LOCATION_ID = "stub-location";
process.env.GOOGLE_CLIENT_ID = "stub";
process.env.GOOGLE_CLIENT_SECRET = "stub";
process.env.GOOGLE_REFRESH_TOKEN = "stub";
process.env.ZOOM_LINK = "https://zoom.us/j/1234567890";

const created: any[] = [];

/* A calendar that is already partly booked, so the filtering has something to
   do. 11am is gone on one Wednesday, which should remove 11am from the whole
   list: an hour is only offered when it is clear on every date. */
const BUSY = [
  { start: "2026-09-16T01:00:00Z", end: "2026-09-16T02:00:00Z" }, // Wed 11am AEST
  { start: "2026-10-09T00:00:00Z", end: "2026-10-09T01:00:00Z" }, // Fri 10am, 2nd Friday
  { start: "2026-09-09T06:00:00Z", end: "2026-09-09T07:00:00Z" }, // Wed 4pm
];

const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input);

  if (url.includes("oauth2.googleapis.com/token")) {
    return new Response(JSON.stringify({ access_token: "stub", expires_in: 3600 }), { status: 200 });
  }

  if (url.includes("/freeBusy")) {
    return new Response(JSON.stringify({ calendars: { primary: { busy: BUSY } } }), { status: 200 });
  }

  if (url.includes("/events") && init?.method === "POST") {
    const body = JSON.parse(init.body);
    created.push(body);
    return new Response(JSON.stringify({ id: `evt-${created.length}` }), { status: 200 });
  }

  if (url.includes("services.leadconnectorhq.com/contacts/")) {
    if (init?.method === "POST") return new Response("{}", { status: 200 });
    return new Response(
      JSON.stringify({
        contact: {
          firstName: "Darcy",
          lastName: "Whelan",
          email: "darcy@example.com",
          tags: ["install-signed", "step-1-signed"],
        },
      }),
      { status: 200 }
    );
  }

  if (url.includes("hooks.slack.com")) return new Response("ok", { status: 200 });

  return realFetch(input, init);
}) as typeof fetch;

const { handler } = await import("../netlify/functions/install-slot");

const call = (method: string, body?: string) =>
  (handler as any)(
    { httpMethod: method, queryStringParameters: { c: "stub-contact" }, headers: {}, body },
    {} as any
  );

/* 1. What the client sees when they open the link. */
const picker = await call("GET");
writeFileSync("/tmp/slot-picker.html", picker.body);
console.log("picker  ->  /tmp/slot-picker.html");

/* 2. What they see after choosing. */
const done = await call(
  "POST",
  new URLSearchParams({
    operatorName: "Jacob Reid",
    operatorEmail: "jacob@example.com",
    boardSlot: "2:11",
    hour: "10",
  }).toString()
);
writeFileSync("/tmp/slot-done.html", done.body);
console.log("done    ->  /tmp/slot-done.html");

/* 3. What actually landed in the calendar. */
console.log(`\n${created.length} events created:\n`);
for (const e of created) {
  const p = e.extendedProperties.private;
  console.log(
    `  ${e.start.dateTime.slice(0, 16).replace("T", "  ")}  ${e.summary.padEnd(34)} ${e.attendees
      .map((a: any) => a.email)
      .join(", ")}${p.board === "1" ? "  [board]" : ""}`
  );
}
