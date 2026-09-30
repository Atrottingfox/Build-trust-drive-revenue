import { connectLambda, getStore } from "@netlify/blobs";

/*
  Shared by the Top 1% network functions (the-crew, zoom, calls-track).

  Members are rows in the Applications database (Talentpool). Their personal
  calls link carries the row's page id as ?m=, from the "Calls link" formula
  column, so a click can be written back against the right person.
*/

export const NOTION_CREW_DB = "2460b2eb6dfb80a88f2cd5e35f5f420b";
export const NOTION_REQUESTS_DB = "3eb0b2eb6dfb8125848bc8c2a529d75f";

const NOTION = "https://api.notion.com/v1";
const notionHeaders = () => ({
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
});

/* A Notion page id, dashed or not. Anything else is ignored, so a mangled or
   forwarded link can never write to the wrong row. */
export function memberId(raw: unknown): string | null {
  const id = typeof raw === "string" ? raw.replace(/-/g, "").toLowerCase() : "";
  return /^[0-9a-f]{32}$/.test(id) ? id : null;
}

export type Member = {
  id: string;
  name: string;
  email: string;
  callsJoined: number;
  lastJoined: string | null;
  addedToCalendar: boolean;
  url: string;
};

export async function getMember(id: string): Promise<Member | null> {
  const res = await fetch(`${NOTION}/pages/${id}`, { headers: notionHeaders() });
  if (!res.ok) return null;
  const p = await res.json();
  /* Only rows from the Applications database count as members. */
  if ((p.parent?.database_id || "").replace(/-/g, "") !== NOTION_CREW_DB) return null;
  const props = p.properties || {};
  return {
    id,
    name: props.Name?.title?.[0]?.plain_text || "A member",
    email: props.Email?.email || "",
    callsJoined: props["Calls joined"]?.number || 0,
    lastJoined: props["Last joined"]?.date?.start || null,
    addedToCalendar: Boolean(props["Added to calendar"]?.checkbox),
    url: p.url,
  };
}

export async function notion(path: string, init: { method?: string; body?: unknown } = {}) {
  const res = await fetch(`${NOTION}${path}`, {
    method: init.method || "GET",
    headers: notionHeaders(),
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) console.error("Notion", path, res.status, JSON.stringify(json).slice(0, 300));
  return { ok: res.ok, json };
}

export async function updateMember(id: string, properties: Record<string, unknown>) {
  const res = await fetch(`${NOTION}/pages/${id}`, {
    method: "PATCH",
    headers: notionHeaders(),
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) console.error("Member update failed:", res.status, await res.text());
}

/* #talent. The webhook lives in the "config" blob store, not an env var: the
   site is at AWS's 4KB env limit and the repo is public. */
export async function talentSlack(event: unknown, text: string) {
  try {
    connectLambda(event as any);
    const url = await getStore("config").get("slack-talent", { type: "text" });
    if (!url) return;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    console.error("Talent Slack alert failed:", err);
  }
}

/* Sydney wall clock for an instant. */
export function sydneyNow(date = new Date()) {
  const o: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(date)) o[p.type] = p.value;
  return {
    ymd: `${o.year}-${o.month}-${o.day}`,
    day: Number(o.day),
    minutes: Number(o.hour) * 60 + Number(o.minute),
    weekday: o.weekday,
  };
}

/*
  Which call a click belongs to. First Wednesday is Open Q&A, second is Member
  Spotlight, both 7:30 to 8:30 Sydney. A click from 7:15 counts, so someone a
  few minutes early is still in the room. After 8:30 nothing counts. Anything else is null.
*/
export function currentCall(date = new Date()): string | null {
  const now = sydneyNow(date);
  if (now.weekday !== "Wed") return null;
  if (now.minutes < 7 * 60 + 15 || now.minutes > 8 * 60 + 30) return null;
  if (now.day <= 7) return "Open Q&A";
  if (now.day <= 14) return "Member Spotlight";
  return null;
}
