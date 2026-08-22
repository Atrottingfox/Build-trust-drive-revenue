import type { Handler } from "@netlify/functions";
import { addTags, removeTags } from "./_ghl";
import { accessToken, listInstallEvents } from "./_google";
import { toUtcIso, toDateStr, addDays } from "./_cadence";

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

const FORM_URL = "https://authorityengine.notion.site/3b20b2eb6dfb8076879ccb4c5188494d";
const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

/* The Content review database, under Meetings. */
const REVIEW_DB = "3b20b2eb-6dfb-8072-ab27-000b2835b813";

const MISSING_TAG = "prep-not-submitted";

/* A submission counts for the call it precedes, not forever. Seven days covers
   a weekly rhythm without letting last month's form excuse this week's. */
const SUBMISSION_WINDOW_DAYS = 7;

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

type Submission = { name: string; at: string };

async function recentSubmissions(): Promise<Submission[]> {
  const key = process.env.NOTION_API_KEY;
  if (!key) throw new Error("notion-not-configured");

  const since = addDays(toDateStr(new Date()), -SUBMISSION_WINDOW_DAYS);

  const res = await fetch(`${NOTION_API}/databases/${REVIEW_DB}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: { timestamp: "created_time", created_time: { on_or_after: since } },
      page_size: 100,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    /*
      404 here almost never means a wrong id. It means the integration has not
      been connected to the database, which Notion requires per page and which
      reports identically to the database not existing. Naming the fix saves
      somebody an hour checking an id that was correct all along.
    */
    if (res.status === 404) {
      throw new Error(
        "notion-not-shared: open the Content review database in Notion, ... menu, " +
          "Connections, and connect the Authority Engine integration"
      );
    }
    throw new Error(`notion-query-${res.status}-${body.slice(0, 200)}`);
  }

  const json = await res.json();
  return (json.results ?? []).map((p: any) => ({
    name: (p.properties?.["Name/company"]?.title ?? []).map((t: any) => t.plain_text).join(""),
    at: p.created_time,
  }));
}

/*
  Name/company is typed by hand into the form, so it will not match a client
  record exactly. "Darcy Whelan", "Darcy", "Whelan Media" all mean the same
  person and all get typed.

  So this asks whether any word of the client's or operator's name appears in
  what they wrote. Loose on purpose: the cost of a false match is a nudge not
  sent to somebody who probably did submit, and the cost of a false miss is
  chasing somebody who did the work. The second is worse.
*/
function submitted(subs: Submission[], clientName: string, operatorName: string): boolean {
  const words = `${clientName} ${operatorName}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3);

  if (!words.length) return false;
  return subs.some((s) => {
    const hay = s.name.toLowerCase();
    return words.some((w) => hay.includes(w));
  });
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
    /* The day after tomorrow. A whole day wide, so a job that runs slightly
       late or early does not skip a client entirely. */
    events = await listInstallEvents(
      token,
      toUtcIso(addDays(today, 2), 0),
      toUtcIso(addDays(today, 3), 0)
    );
    subs = await recentSubmissions();
  } catch (err) {
    console.error("prep-nudge:", err);
    await slack(
      String(err).includes("notion-not-shared")
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

    const isReady = submitted(subs, ev.clientName, ev.operatorName);
    const when = ev.startLocal.slice(11, 16);
    const label = `${ev.clientName}${ev.board ? " (board call)" : ` week ${ev.week}`} at ${when}`;

    if (isReady) {
      ready.push(label);
      /* Clear it whether or not we think it is set. Cheap, and it means a tag
         left behind by a failed run yesterday does not chase them today. */
      await removeTags(ghlToken, ev.client, [MISSING_TAG]);
      cleared.push(ev.clientName);
      continue;
    }

    await addTags(ghlToken, ev.client, [MISSING_TAG]);
    chased.push(label);
  }

  if (chased.length) {
    await slack(
      `:clipboard: *Content review not in, calls in two days.*\n` +
        chased.map((c) => `  • ${c}`).join("\n") +
        `\n\nTagged \`${MISSING_TAG}\`, so the workflow is sending them ${FORM_URL}` +
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
