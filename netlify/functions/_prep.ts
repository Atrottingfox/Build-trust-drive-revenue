/*
  Whether a client has filed their Content review this week.

  Shared because two things need the same answer and must never disagree: the
  48 hour chase, and the operator's own portal card. A portal saying "you are
  prepared" while an email chases them is worse than either alone.
*/

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

/*
  The Content review database, under Meetings.

  This is the DATABASE id, not the data source id. Notion's own tooling shows
  both, and querying with the data source id returns a 404 that reads exactly
  like a missing integration connection. That cost an hour of connecting a
  database that was already connected.
*/
export const REVIEW_DB = "3b20b2eb6dfb8074971ecb58865292d0";

export const FORM_URL =
  "https://authorityengine.notion.site/3b20b2eb6dfb8076879ccb4c5188494d";

/* A submission counts for the call it precedes, not forever. Seven days covers
   a weekly rhythm without letting last month's form excuse this week's. */
export const SUBMISSION_WINDOW_DAYS = 7;

export type Submission = { name: string; at: string };

export async function recentSubmissions(sinceDate: string): Promise<Submission[]> {
  const key = process.env.NOTION_API_KEY;
  if (!key) throw new Error("notion-not-configured");

  const res = await fetch(`${NOTION_API}/databases/${REVIEW_DB}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: { timestamp: "created_time", created_time: { on_or_after: sinceDate } },
      page_size: 100,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    /*
      404 here is ambiguous: it means either the id is wrong or the integration
      was never connected, and Notion's message confidently blames the second.
      Naming both saves somebody checking a connection that was fine.
    */
    if (res.status === 404) {
      throw new Error(
        "notion-not-found: check REVIEW_DB is the database id rather than the " +
          "data source id, then check the integration is connected to it"
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
export function submitted(subs: Submission[], clientName: string, operatorName: string): boolean {
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
