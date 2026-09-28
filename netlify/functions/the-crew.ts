import type { Handler } from "@netlify/functions";
import { connectLambda, getStore } from "@netlify/blobs";

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
const AFTER = [
  "Just want in the room with the best",
  "A chance to learn from the best",
  "Open to the right move",
  "Talent for our team",
  "Training",
];

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

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
    after: Array.isArray(body.after)
      ? body.after.filter((a): a is string => AFTER.includes(a as string))
      : [],
    experience: str(body.experience),
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
            After: { multi_select: d.after.map((name) => ({ name })) },
            Experience: text(d.experience),
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

  /* Talent only, never the applications webhook: crew profiles must not land
     in the Brand Day channel. The URL lives in the site's "config" blob store,
     not an env var, because this site is at AWS's 4KB env limit (adding one
     failed a deploy on 29 Sep) and the repo is public.
     Set with: netlify blobs:set config slack-talent <url> */
  let slack: string | null = null;
  try {
    connectLambda(event as any);
    slack = await getStore("config").get("slack-talent");
  } catch (err) {
    console.error("Crew Slack webhook lookup failed:", err);
  }
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
            d.after.length ? `*After:* ${d.after.join(", ")}` : null,
            d.experience ? `*Experience:* ${d.experience}` : null,
            d.nominated ? `*Deserve an invite:* ${d.nominated}` : null,
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
