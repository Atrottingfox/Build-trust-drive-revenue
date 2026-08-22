import type { Handler } from "@netlify/functions";
import {
  BOARD_HOUR,
  BOARD_TITLE,
  DURATION_MIN,
  TZ,
  upcomingBoardCalls,
  toDateStr,
  toUtcIso,
  toLocalIso,
  addDays,
} from "./_cadence";
import { accessToken, listInstallEvents, createEvent, patchEventAttendees } from "./_google";

/*
  The Content Board. One call a month, last Friday, everybody in the room.

  It is a group call, which is why it sits apart from the weekly rhythm: the date
  is the same for every client, so it costs none of the Wednesday capacity that
  the whole grid is rationing.

  Two jobs, both idempotent, so running it twice in a day changes nothing:

    1. Make sure the next few months exist. Booked ahead rather than the week
       before, because a monthly call that appears with six days notice is a
       monthly call people miss.
    2. Keep the guest list current. A client who signs in week two of a month
       should be on that month's board call without anybody remembering, and a
       client whose install has finished should stop being invited.

  Who is in the room, per the template: the founder, because the board call is
  where the client sits in, and the operator, because they present the data.
*/

const HORIZON_MONTHS = 3;

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
  let token: string;
  try {
    token = await accessToken();
  } catch (err) {
    console.error("board-call: google auth failed:", err);
    await slack(`:warning: Board call scheduler cannot reach Google Calendar (${String(err)}).`);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const today = toDateStr(new Date());

  let events;
  try {
    events = await listInstallEvents(
      token,
      toUtcIso(addDays(today, -1), 0),
      toUtcIso(addDays(today, 200), 0)
    );
  } catch (err) {
    console.error("board-call: list failed:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  /*
    Who is live. Derived from the weekly events rather than from a list somebody
    maintains, so it cannot drift from reality: if a client has calls still to
    come, they are in the room.
  */
  const guests = new Set<string>();
  for (const ev of events) {
    if (ev.board) continue;
    if (ev.releases && ev.releases <= today) continue;
    if (ev.founderEmail) guests.add(ev.founderEmail);
    if (ev.operatorEmail) guests.add(ev.operatorEmail);
  }
  const attendees = [...guests];

  const existing = new Map(
    events.filter((e) => e.board).map((e) => [e.startLocal.slice(0, 10), e])
  );

  const created: string[] = [];
  const updated: string[] = [];

  for (const date of upcomingBoardCalls(new Date(), HORIZON_MONTHS)) {
    const already = existing.get(date);

    try {
      if (!already) {
        await createEvent(token, {
          summary: BOARD_TITLE,
          description:
            "The Content Board. What has actually been published, what performed, and what the next cycle points at. " +
            "Your operator presents the numbers and the thesis." +
            (process.env.ZOOM_LINK ? `\n\nZoom: ${process.env.ZOOM_LINK}` : ""),
          startLocal: toLocalIso(date, BOARD_HOUR),
          endLocal: toLocalIso(date, BOARD_HOUR, DURATION_MIN),
          timeZone: TZ,
          attendees,
          privateProps: { board: "1" },
        });
        created.push(date);
        continue;
      }

      /*
        Only touch the guest list when it has actually changed. Patching with
        sendUpdates=all re-notifies everybody, and a board call that emails the
        whole room every morning gets muted, which defeats the point of it.
      */
      const current = new Set(already.attendeeEmails);
      const same =
        current.size === attendees.length && attendees.every((a) => current.has(a.toLowerCase()));
      if (!same) {
        await patchEventAttendees(token, already.id, attendees);
        updated.push(date);
      }
    } catch (err) {
      console.error("board-call:", date, err);
      await slack(`:warning: Could not schedule the Content Board for ${date}. ${String(err)}`);
    }
  }

  if (created.length) {
    await slack(
      `:calendar: Content Board scheduled for ${created.join(", ")}. ${attendees.length} in the room.`
    );
  }

  console.log("board-call:", { created, updated, attendees: attendees.length });
  return { statusCode: 200, body: JSON.stringify({ created, updated, attendees: attendees.length }) };
};

export { handler };
