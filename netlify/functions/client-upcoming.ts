import type { Handler } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { accessToken, listInstallEvents } from "./_google";
import { toUtcIso, toDateStr, addDays } from "./_cadence";
import { FORM_URL, SUBMISSION_WINDOW_DAYS, recentSubmissions, submitted } from "./_prep";

/*
  What one client has coming, and whether they are ready for it.

  Built for the operator portal in the delivery app, which was showing a next
  call and a form deadline typed in by hand. That is right exactly until the
  first reschedule, and then it is wrong with no way to notice.

  The same Notion lookup the 48 hour chase uses answers the prep question here,
  deliberately. A portal telling an operator they are prepared while an email
  chases them for the same form is worse than either on its own.

  Read only. It reports what the calendar and the form already say.
*/

const NUDGE_LEAD_DAYS = 2;

const json = (body: unknown, statusCode = 200) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

function authorised(header: string | undefined, secret: string): boolean {
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

const handler: Handler = async (event) => {
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!secret) return json({ error: "not-configured" }, 503);
  if (event.httpMethod !== "POST") return json({ error: "post-only" }, 405);
  if (!authorised(event.headers["x-call-context-key"], secret)) {
    return json({ error: "unauthorised" }, 401);
  }

  let body: any;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json({ error: "bad-json" }, 400);
  }

  const wantedEmail = String(body.clientEmail || "").trim().toLowerCase();
  const wantedName = String(body.client || "").trim().toLowerCase();
  if (!wantedEmail && !wantedName) {
    return json({ error: "clientEmail or client is required" }, 400);
  }

  try {
    const token = await accessToken();
    const today = toDateStr(new Date());

    /*
      Far enough ahead to always find something while a client is live, near
      enough that a finished client returns nothing rather than a board call
      from six months out.
    */
    const events = await listInstallEvents(
      token,
      new Date().toISOString(),
      toUtcIso(addDays(today, 120), 0)
    );

    const theirs = events
      .filter((e) => {
        if (wantedEmail) {
          return (
            e.founderEmail.toLowerCase() === wantedEmail ||
            e.operatorEmail.toLowerCase() === wantedEmail
          );
        }
        /* Falling back to a name is loose on purpose. The caller may only know
           a slug, and the alternative is nothing at all. */
        return e.clientName.toLowerCase().includes(wantedName);
      })
      .sort((a, b) => Date.parse(a.startLocal) - Date.parse(b.startLocal));

    const next = theirs[0];
    if (!next) return json({ matched: false });

    /* The prep answer, from the same source the chase reads. */
    let isSubmitted: boolean | null = null;
    try {
      const subs = await recentSubmissions(addDays(today, -SUBMISSION_WINDOW_DAYS));
      isSubmitted = submitted(subs, next.clientName, next.operatorName);
    } catch (err) {
      /* Null rather than false. "We could not check" and "they have not done
         it" are different things, and showing the second when you mean the
         first tells an operator they are behind when they are not. */
      console.error("client-upcoming: prep lookup failed:", err);
    }

    /* Zoom link, pulled out of the description the picker wrote. */
    const zoom = process.env.ZOOM_LINK || null;

    return json({
      matched: true,
      client: next.clientName,
      nextCall: {
        startLocal: next.startLocal,
        joinUrl: zoom,
        week: next.board ? null : Number(next.week) || null,
        callType: next.board ? "board" : "weekly",
        operatorName: next.operatorName || null,
        operatorEmail: next.operatorEmail || null,
        eventId: next.id,
      },
      prep: {
        formUrl: FORM_URL,
        submitted: isSubmitted,
        dueBy: addDays(next.startLocal.slice(0, 10), -NUDGE_LEAD_DAYS),
      },
      /* So a portal can show the run of calls, not just the next one. */
      remaining: theirs.length,
    });
  } catch (err) {
    console.error("client-upcoming:", err);
    return json({ error: String(err) }, 502);
  }
};

export { handler };
