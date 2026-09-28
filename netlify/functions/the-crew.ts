import type { Handler } from "@netlify/functions";

/*
  /the-crew profiles. One Notion row per submission in Tier 1 applications
  (Sean Tasks > Talentpool), plus a Slack alert.

  Slack fires whatever Notion does. The Tier 1 database has to be shared with
  the "Authority engine sight" integration before the row lands, and until it
  is, the alert is the only copy, so it carries every answer.
*/

const NOTION_CREW_DB = "2460b2eb6dfb80a88f2cd5e35f5f420b";

const ROLES = [
  "Creative Director",
  "Media Operator",
  "Director",
  "Creator",
  "Editor",
  "Shooter",
];
const RIGHT_NOW = ["Inside a media team", "Freelance", "Agency", "Between things"];
const AFTER = [
  "Just want in the room with the best",
  "Open to the right move",
  "Hiring from the crew",
  "More of the right work",
  "A full time seat",
  "Work for our agency",
  "Talent for our team",
];

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/* Notion rejects the whole row over one bad URL, so a link typed without a
   scheme gets one, and anything still unparseable is left out of the column
   (Slack still shows it as typed). */
function toUrl(raw: string): string | null {
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).toString();
  } catch {
    return null;
  }
}

const text = (content: string) => ({
  rich_text: content ? [{ text: { content } }] : [],
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "POST only" }) };
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad JSON" }) };
  }

  /* Honeypot. Bots fill every field; people never see this one. */
  if (str(body.company)) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  const d = {
    name: str(body.name, 200),
    phone: str(body.phone, 50),
    email: str(body.email, 200),
    instagram: str(body.instagram, 200),
    location: str(body.location, 200),
    roles: Array.isArray(body.roles)
      ? body.roles.filter((r): r is string => ROLES.includes(r as string))
      : [],
    rightNow: RIGHT_NOW.includes(str(body.rightNow)) ? str(body.rightNow) : "",
    after: AFTER.includes(str(body.after)) ? str(body.after) : "",
    team: str(body.team, 200),
    work: str(body.work, 500),
    nominated: str(body.nominated),
  };

  if (!d.name || !d.phone || !d.email) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Name, mobile and email are required." }),
    };
  }

  let notion = "not configured";
  const key = process.env.NOTION_API_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parent: { database_id: NOTION_CREW_DB },
          properties: {
            Name: { title: [{ text: { content: d.name } }] },
            Phone: { phone_number: d.phone },
            Email: { email: d.email },
            Instagram: text(d.instagram),
            Location: text(d.location),
            Role: { multi_select: d.roles.map((name) => ({ name })) },
            ...(d.rightNow ? { "Right now": { select: { name: d.rightNow } } } : {}),
            ...(d.after ? { After: { select: { name: d.after } } } : {}),
            Team: text(d.team),
            Work: { url: toUrl(d.work) },
            Nominated: text(d.nominated),
            Source: { select: { name: "the-crew" } },
          },
        }),
      });
      notion = res.ok ? "saved" : `failed (${res.status})`;
      if (!res.ok) console.error("Crew Notion write failed:", await res.text());
    } catch (err) {
      notion = "failed (network)";
      console.error("Crew Notion write threw:", err);
    }
  }

  const slack = process.env.SLACK_WEBHOOK_APPLICATIONS || process.env.SLACK_WEBHOOK_URL;
  if (slack) {
    try {
      await fetch(slack, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            "*New Crew profile*",
            `*Name:* ${d.name}`,
            `*Mobile:* ${d.phone}`,
            `*Email:* ${d.email}`,
            d.instagram ? `*Instagram:* ${d.instagram}` : null,
            d.location ? `*Based:* ${d.location}` : null,
            d.roles.length ? `*Does:* ${d.roles.join(", ")}` : null,
            d.rightNow ? `*Right now:* ${d.rightNow}${d.team ? ` (${d.team})` : ""}` : null,
            d.after ? `*After:* ${d.after}` : null,
            d.work ? `*Best work:* ${d.work}` : null,
            d.nominated ? `*Who I've missed:* ${d.nominated}` : null,
            notion === "saved" ? null : `:rotating_light: *Notion:* ${notion}. This alert is the only copy.`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch (err) {
      console.error("Crew Slack alert failed:", err);
    }
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};
