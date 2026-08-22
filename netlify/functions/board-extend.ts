import type { Handler } from "@netlify/functions";
import { getTags, contactUrl } from "./_ghl";
import {
  BOARD_HORIZON,
  BOARD_TITLE,
  DURATION_MIN,
  TZ,
  boardCallDates,
  toDateStr,
  toUtcIso,
  toLocalIso,
  addDays,
} from "./_cadence";
import { accessToken, listInstallEvents, createEvent, deleteEvent, freeBusy, isFree } from "./_google";

/*
  Keeps the board call running past the install.

  The weekly rhythm stops at week ten. The board call does not: it carries on
  every month through the twelve, on the same Friday hour the client chose when
  they booked. So the three created at booking would quietly run out around
  month three, and the first anybody would know is a client asking when the next
  one is.

  This tops each active client back up to BOARD_HORIZON months ahead, and clears
  the future ones for anybody who has left. Both directions matter: an ended
  client with a year of invitations in their calendar is its own kind of mess,
  and their Friday hour cannot be offered to anybody else until it is clear.

  Idempotent. Running it twice in a day changes nothing.
*/

const ENDED_TAGS = ["client-ended", "churned", "install-complete"];

async function slack(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* An alert that fails must not fail the run. */
  }
}

const handler: Handler = async () => {
  const ghlToken = process.env.GHL_TOKEN;
  if (!ghlToken) {
    console.error("board-extend: GHL_TOKEN not set.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  let token: string;
  try {
    token = await accessToken();
  } catch (err) {
    /*
      Not yet configured is not a fault. This runs daily, and alerting on it
      before the credential exists would put a warning in Slack every morning
      until somebody muted the channel, which is how a real alert gets missed.
    */
    if (String(err).includes("google-not-configured")) {
      console.log("board-extend: Google not configured yet, nothing to do.");
      return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "not-configured" }) };
    }
    console.error("board-extend: google auth failed:", err);
    await slack(`:warning: Board call top up cannot reach Google Calendar (${String(err)}).`);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const today = toDateStr(new Date());

  let events;
  try {
    /* Back a year to find every client still carrying a board hour, forward far
       enough to see what has already been created. */
    events = await listInstallEvents(
      token,
      toUtcIso(addDays(today, -400), 0),
      toUtcIso(addDays(today, 400), 0)
    );
  } catch (err) {
    console.error("board-extend: list failed:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  type Client = {
    id: string;
    name: string;
    boardHour: number;
    boardWeek: number;
    founderEmail: string;
    operatorEmail: string;
    future: { id: string; date: string }[];
    lastBoard: string;
  };

  const clients = new Map<string, Client>();

  for (const ev of events) {
    if (!ev.client || !ev.boardHour) continue;
    const c =
      clients.get(ev.client) ??
      ({
        id: ev.client,
        name: ev.clientName || ev.client,
        boardHour: Number(ev.boardHour),
        boardWeek: Number(ev.boardWeek) || 4,
        founderEmail: ev.founderEmail,
        operatorEmail: ev.operatorEmail,
        future: [],
        lastBoard: "",
      } as Client);

    /* The freshest contact details win, so an operator added in week three is
       the one invited to board calls created after that. */
    if (ev.operatorEmail) c.operatorEmail = ev.operatorEmail;
    if (ev.founderEmail) c.founderEmail = ev.founderEmail;

    if (ev.board) {
      const date = ev.startLocal.slice(0, 10);
      if (date > c.lastBoard) c.lastBoard = date;
      if (date >= today) c.future.push({ id: ev.id, date });
    }
    clients.set(ev.client, c);
  }

  const added: string[] = [];
  const cleared: string[] = [];

  for (const c of clients.values()) {
    let tags: string[] = [];
    try {
      tags = await getTags(ghlToken, c.id);
    } catch {
      /* A contact that cannot be read is left exactly as it is. Guessing here
         would either cancel a live client's calls or keep inviting somebody who
         has gone, and both are worse than doing nothing this run. */
      console.error("board-extend: could not read tags for", c.id);
      continue;
    }

    const ended = ENDED_TAGS.some((t) => tags.includes(t));

    if (ended) {
      for (const ev of c.future) {
        try {
          await deleteEvent(token, ev.id);
          cleared.push(`${c.name} ${ev.date}`);
        } catch (err) {
          console.error("board-extend: delete failed", ev.id, err);
        }
      }
      continue;
    }

    /* Only clients who have actually booked carry a board hour, so anybody in
       here is live unless tagged otherwise. Top them back up. */
    const anchor = c.lastBoard > today ? c.lastBoard : today;
    const wanted = boardCallDates(anchor, c.boardWeek, BOARD_HORIZON);
    const have = new Set(c.future.map((f) => f.date));

    /*
      Booking checks the calendar before offering an hour. This has to as well,
      or a date shifted off a public holiday can land on top of somebody else,
      and the first anybody knows is two clients in the same room.
    */
    let busy: Awaited<ReturnType<typeof freeBusy>> = [];
    if (wanted.length) {
      try {
        busy = await freeBusy(
          token,
          toUtcIso(wanted[0], 0),
          toUtcIso(addDays(wanted[wanted.length - 1], 1), 0)
        );
      } catch (err) {
        console.error("board-extend: freebusy failed for", c.name, err);
        continue;
      }
    }

    for (const date of wanted) {
      if (have.has(date)) continue;

      if (!isFree(busy, toUtcIso(date, c.boardHour), toUtcIso(date, c.boardHour, DURATION_MIN))) {
        console.log("board-extend: skipping", date, "for", c.name, "hour is busy");
        await slack(
          `:warning: ${c.name}'s ${date} board call was skipped, ${c.boardHour}:00 is already busy. Worth a look. <${contactUrl(c.id)}|Open in GHL>`
        );
        continue;
      }

      try {
        await createEvent(token, {
          summary: `${BOARD_TITLE}, ${c.name}`,
          description:
            "The Content Board. What has actually been published, what performed, and what the next cycle points at. " +
            "Your operator presents the numbers and the thesis." +
            (process.env.ZOOM_LINK ? `\n\nZoom: ${process.env.ZOOM_LINK}` : ""),
          startLocal: toLocalIso(date, c.boardHour),
          endLocal: toLocalIso(date, c.boardHour, DURATION_MIN),
          timeZone: TZ,
          attendees: [...new Set([c.founderEmail, c.operatorEmail].filter(Boolean))],
          privateProps: {
            client: c.id,
            clientName: c.name,
            boardHour: String(c.boardHour),
            boardWeek: String(c.boardWeek),
            board: "1",
          },
        });
        added.push(`${c.name} ${date}`);
      } catch (err) {
        console.error("board-extend: create failed", c.name, date, err);
        await slack(
          `:warning: Could not add the ${date} Content Board for ${c.name}. <${contactUrl(c.id)}|Open in GHL>`
        );
      }
    }
  }

  if (cleared.length) {
    await slack(
      `:broom: Cleared ${cleared.length} future board ${cleared.length === 1 ? "call" : "calls"} for ended clients. Their Friday hour is free again.`
    );
  }

  console.log("board-extend:", { clients: clients.size, added, cleared });
  return { statusCode: 200, body: JSON.stringify({ added: added.length, cleared: cleared.length }) };
};

export { handler };
