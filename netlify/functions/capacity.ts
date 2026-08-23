import type { Handler } from "@netlify/functions";
import {
  SLOT_HOURS,
  BOARD_HOURS,
  SLOT_RELEASE_WEEK,
  CADENCE,
  capacity,
  toDateStr,
  toUtcIso,
  addDays,
  type Holding,
} from "./_cadence";
import { accessToken, listInstallEvents } from "./_google";

/*
  How many clients the Wednesday grid can hold, and when that stops being true.

  Six hours, each held for eleven weeks, is a hard ceiling on intake. Sustained
  signing above it does not create a queue. It creates a client who has paid and
  has nowhere to go, discovered at the worst possible moment.

  So the warning fires on the trend rather than on the last free hour. By the
  time one hour is left, anybody already signed is already a problem.

  Read entirely from the calendar. Nothing to keep in sync, nothing to update
  when a client comes or goes, and no second version of the truth to disagree
  with the first.

  Two ways in. Opened as a page it renders. Run on its schedule it says nothing
  unless something needs saying, which is the only way a weekly alert stays
  worth reading.
*/

const hourLabel = (h: number) =>
  h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`;

async function readGrid() {
  const token = await accessToken();
  const today = toDateStr(new Date());

  /*
    Back far enough to see the intake rate, forward far enough to see every hour
    currently held. A client who started yesterday releases their hour in eleven
    weeks, so half a year either side covers it with room to spare.
  */
  const events = await listInstallEvents(
    token,
    toUtcIso(addDays(today, -182), 0),
    toUtcIso(addDays(today, 182), 0)
  );

  const firstWeek = String(CADENCE[0].week);
  const byClient = new Map<string, Holding & { name: string; started: string }>();
  const starts: string[] = [];

  for (const ev of events) {
    if (!ev.client) continue;
    const date = ev.startLocal.slice(0, 10);

    if (!ev.board && ev.week === firstWeek) starts.push(date);

    /*
      Hours come off the private properties rather than off the start time. Sean
      moving one call must not read as the client changing slot, and the board
      hour cannot be inferred from a weekly event at all.
    */
    const existing = byClient.get(ev.client);
    const merged: Holding & { name: string; started: string } = existing ?? {
      hour: Number(ev.hour || ev.startLocal.slice(11, 13)),
      boardHour: ev.boardHour ? Number(ev.boardHour) : null,
      boardActive: false,
      client: ev.client,
      name: ev.clientName || ev.client,
      releases: ev.releases || addDays(date, (SLOT_RELEASE_WEEK - 1) * 7),
      started: date,
    };

    if (date < merged.started) {
      merged.started = date;
      if (ev.releases) merged.releases = ev.releases;
      if (ev.hour) merged.hour = Number(ev.hour);
    }
    if (ev.boardHour) merged.boardHour = Number(ev.boardHour);

    /* A board call still ahead of them is what holds the Friday hour. It has no
       release date, because the board call runs for as long as they stay. */
    if (ev.board && date >= today) merged.boardActive = true;

    byClient.set(ev.client, merged);
  }

  const holdings = [...byClient.values()];
  return { today, holdings, starts, report: capacity(holdings, starts, today) };
}

const page = (body: string) => `<!doctype html>
<html lang="en-AU"><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Capacity</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;background:#0A0B0D;color:#EAECEF;
       font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:32px 24px}
  .wrap{max-width:720px;margin:0 auto}
  h1{font-size:24px;letter-spacing:-.02em;margin:0 0 4px}
  .when{color:#6E757F;font-size:13px;margin:0 0 28px}
  .row{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:0 0 28px}
  .tile{background:#121419;border:1px solid #242830;border-radius:14px;padding:18px}
  .n{font-size:30px;font-weight:600;letter-spacing:-.03em;display:block}
  .k{font-size:12px;color:#6E757F;text-transform:uppercase;letter-spacing:.06em}
  .warn{background:#2A1416;border:1px solid #5C2126;border-radius:14px;padding:18px;margin:0 0 28px;font-size:15px}
  .ok{background:#121419;border:1px solid #242830;border-radius:14px;padding:18px;margin:0 0 28px;color:#A4AAB4;font-size:15px}
  table{width:100%;border-collapse:collapse;font-size:15px}
  th{text-align:left;font-size:12px;color:#6E757F;text-transform:uppercase;letter-spacing:.06em;
     padding:0 0 10px;border-bottom:1px solid #242830;font-weight:500}
  td{padding:12px 0;border-bottom:1px solid #1A1D23}
  .free{color:#4ADE80}
  h2{font-size:15px;margin:32px 0 12px;color:#A4AAB4;font-weight:600}
</style></head><body><div class="wrap">${body}</div></body></html>`;

const handler: Handler = async (event) => {
  /* Netlify invokes a scheduled function with no HTTP method. */
  const scheduled = !event?.httpMethod;

  let grid;
  try {
    grid = await readGrid();
  } catch (err) {
    if (String(err).includes("google-not-configured")) {
      console.log("capacity: Google not configured yet.");
      if (scheduled) return { statusCode: 200, body: "not-configured" };
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: page(
          `<h1>Not connected yet</h1><p class="when">Run scripts/google-auth.mjs and this fills itself in.</p>`
        ),
      };
    }
    console.error("capacity:", err);
    if (scheduled) return { statusCode: 200, body: "error" };
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: page(`<h1>Cannot read the calendar</h1><p class="when">${String(err)}</p>`),
    };
  }

  const { today, holdings, report } = grid;

  if (scheduled) {
    /* Silence unless something needs saying. A weekly alert that always fires
       stops being read by about the fourth week. */
    if (report.warning && process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:
            `:chart_with_upwards_trend: *Install capacity.* ${report.held} of ${report.total} Wednesday hours held, ` +
            `${report.free} free.\n${report.warning}`,
        }),
      });
    }
    return { statusCode: 200, body: JSON.stringify(report) };
  }

  const held = holdings.filter((h) => h.releases > today).sort((a, b) => a.hour - b.hour);
  const board = holdings.filter((h) => h.boardActive && h.boardHour !== null);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    body: page(`
      <h1>Install capacity</h1>
      <p class="when">Read from the calendar, ${today}</p>

      <div class="row">
        <div class="tile"><span class="n">${report.free}</span><span class="k">Openings</span></div>
        <div class="tile"><span class="n">${report.held}</span><span class="k">In the install</span></div>
        <div class="tile"><span class="n">${report.onBoard}</span><span class="k">On the board call</span></div>
        <div class="tile"><span class="n">${report.intakePerWeek.toFixed(1)}</span><span class="k">Signing per week</span></div>
      </div>

      ${
        report.warning
          ? `<div class="warn">${report.warning}</div>`
          : `<div class="ok">Intake is inside the ceiling. You can take on ${report.free} more ${
              report.free === 1 ? "client" : "clients"
            } now${
              report.nextRelease
                ? `, and the next hour after that frees on ${report.nextRelease.date}`
                : ""
            }.</div>`
      }

      <h2>Wednesdays, the weekly call</h2>
      <table>
        <tr><th>Hour</th><th>Held by</th><th>Frees</th></tr>
        ${SLOT_HOURS.map((h) => {
          const who = held.find((x) => x.hour === h);
          return `<tr>
            <td>${hourLabel(h)}</td>
            <td>${who ? who.name : '<span class="free">free</span>'}</td>
            <td>${who ? who.releases : ""}</td>
          </tr>`;
        }).join("")}
      </table>

      <h2>Board calls</h2>
      <table>
        <tr><th>Client</th><th>Friday hour</th></tr>
        ${board.length
          ? board
              .map(
                (b) => `<tr><td>${b.name}</td><td>${hourLabel(b.boardHour as number)}</td></tr>`
              )
              .join("")
          : `<tr><td colspan="2"><span class="free">nobody on a board call yet</span></td></tr>`}
      </table>

      <h2>The maths</h2>
      <p class="when">
        Wednesdays recycle. ${SLOT_HOURS.length} hours, each held ${SLOT_RELEASE_WEEK} weeks,
        is ${report.throughputPerWeek.toFixed(2)} clients a week,
        ${report.throughputPerMonth.toFixed(1)} a month,
        ${(report.throughputPerWeek * 52).toFixed(0)} a year through the install.
      </p>
      <p class="when">
        Board calls are spaced four weeks from each client's own start, so two
        clients rarely land on the same Friday, and the live calendar check
        catches it when they do. Wednesdays are the constraint that binds.
      </p>
    `),
  };
};

export { handler };
