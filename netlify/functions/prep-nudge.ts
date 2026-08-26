import type { Handler } from "@netlify/functions";
import { addTags, removeTags } from "./_ghl";
import { accessToken, listInstallEvents } from "./_google";
import { toUtcIso, toDateStr, addDays } from "./_cadence";
import {
  FORM_URL,
  SUBMISSION_WINDOW_DAYS,
  recentSubmissions,
  submitted,
  type Submission,
} from "./_prep";

/*
  Nobody should arrive at a call unprepared, and nobody should be chased who
  already did the work.

  Runs daily. Finds the install calls happening in two days, asks Notion whether
  that client has submitted their Content review this week, and tags the ones
  who have not so a GoHighLevel workflow can send them the form.

  Two days rather than one on purpose. A nudge the night before is a nudge that
  arrives after the work could realistically be done, which turns it into an
  apology rather than a prompt. Forty eight hours leaves a working day.

  It also clears the tag once the form lands, which is the half that usually
  gets skipped and the half that decides whether the chase is trusted. A person
  chased for something they have already done stops reading the chases.

  Silent when everybody is prepared. A daily "all good" is a daily message
  nobody reads, and then the one that matters is missed too.
*/



/*
  Two tags, two days, one email each.

  The sequence lives here rather than in a GoHighLevel wait step, because a
  branch on a screen cannot be diffed, tested or reviewed, and the one built
  last night had its branches inverted and its timeout switched off. Neither
  was visible until somebody looked.

  So GHL does one thing per tag and nothing else: no waits, no conditions, no
  branches to point the wrong way. This decides when.
*/
const FIRST_TAG = "prep-not-submitted";   // 48 hours out
const FINAL_TAG = "prep-final-call";      // 24 hours out
const ALL_TAGS = [FIRST_TAG, FINAL_TAG];


async function slack(text: string) {
  const url = process.env.SLACK_WEBHOOK_PREP || process.env.SLACK_WEBHOOK_URL;
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
    console.error("prep-nudge: GHL_TOKEN not set.");
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  let token: string;
  try {
    token = await accessToken();
  } catch (err) {
    if (String(err).includes("google-not-configured")) {
      console.log("prep-nudge: Google not configured yet.");
      return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "not-configured" }) };
    }
    console.error("prep-nudge: google auth failed:", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const today = toDateStr(new Date());

  let events;
  let subs: Submission[];
  try {
    /* Tomorrow and the day after, so one run covers both the 48 hour nudge and
       the 24 hour one. A single window a day wide would skip a client whenever
       the job ran slightly late. */
    events = await listInstallEvents(
      token,
      toUtcIso(addDays(today, 1), 0),
      toUtcIso(addDays(today, 3), 0)
    );
    subs = await recentSubmissions(addDays(today, -SUBMISSION_WINDOW_DAYS));
  } catch (err) {
    console.error("prep-nudge:", err);
    await slack(
      String(err).includes("notion-not-found")
        ? ":warning: *The prep nudge cannot read the Content review form.*\n" +
            "Open it in Notion, ... menu at the top right, Connections, connect the " +
            "Authority Engine integration. Nobody is being chased until then."
        : `:warning: The prep nudge could not run: ${String(err)}`
    );
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }

  const chased: string[] = [];
  const cleared: string[] = [];
  const ready: string[] = [];

  for (const ev of events) {
    if (!ev.client) continue;

    /*
      Chase the person who actually does the work. The operator fills the prep
      doc; the founder signed the agreement. Tagging the founder meant every
      reminder went to somebody who then had to forward it, which is a step that
      quietly stops happening.

      Falls back to the client when there is no operator yet, because somebody
      has to be told and the founder is the only one there.
    */
    const chaseId = ev.operatorContact || ev.client;
    const isReady = submitted(subs, ev.clientName, ev.operatorName);
    const daysOut = ev.startLocal.slice(0, 10) === addDays(today, 1) ? 1 : 2;
    const when = ev.startLocal.slice(11, 16);
    const who = ev.operatorContact ? ev.operatorName || ev.operatorEmail : `${ev.clientName} (no operator, chasing the founder)`;
    const label = `${who}, ${ev.clientName}${ev.board ? " board call" : ` week ${ev.week}`} at ${when}`;

    if (isReady) {
      ready.push(label);
      /* Clear both, whether or not we think either is set. Cheap, and it means
         a tag left behind by a failed run yesterday does not chase them
         today. */
      await removeTags(ghlToken, chaseId, ALL_TAGS);
      cleared.push(ev.clientName);
      continue;
    }

    /*
      Day two gets the first email, day one gets the last call. The earlier tag
      is removed as the later one is added, so a contact never carries both and
      a workflow cannot fire twice off the same state.
    */
    if (daysOut === 1) {
      await removeTags(ghlToken, chaseId, [FIRST_TAG]);
      await addTags(ghlToken, chaseId, [FINAL_TAG]);
      chased.push(`${label}  [tomorrow, final]`);
    } else {
      await addTags(ghlToken, chaseId, [FIRST_TAG]);
      chased.push(`${label}  [48 hours]`);
    }
  }

  if (chased.length) {
    await slack(
      `:clipboard: *Content review not in, calls in two days.*\n` +
        chased.map((c) => `  • ${c}`).join("\n") +
        `\n\n${FORM_URL}` +
        (ready.length ? `\n\n${ready.length} already submitted.` : "")
    );
  }

  console.log("prep-nudge:", { calls: events.length, chased: chased.length, ready: ready.length });
  return {
    statusCode: 200,
    body: JSON.stringify({ calls: events.length, chased, ready: ready.length, cleared: cleared.length }),
  };
};

export { handler };
