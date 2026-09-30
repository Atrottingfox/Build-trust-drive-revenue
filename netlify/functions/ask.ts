import type { Handler } from "@netlify/functions";
import { NOTION_REQUESTS_DB, getMember, memberId, notion, talentSlack } from "./_talent";

/*
  A member asks the network a question. /ask posts here.

  A personal link (?m=<Applications row id>) means we already know who is
  asking. Without one, the page asks for a name and email instead, so nobody
  is ever turned away.

  Creates a row in Requests (Talentpool) and pings #talent with the WhatsApp
  message already written, so Sean only has to paste it.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function toUrl(raw: string): string | null {
  if (!raw) return null;
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).toString();
  } catch {
    return null;
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "" };

  let b: Record<string, unknown>;
  try {
    b = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad request" }) };
  }
  if (str(b.company, 10)) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  const question = str(b.question, 1500);
  if (!question) return { statusCode: 400, headers, body: JSON.stringify({ error: "Add your question." }) };

  const id = memberId(b.m);
  const member = id ? await getMember(id) : null;
  const name = member?.name || str(b.name, 120);
  const email = member?.email || str(b.email, 200);
  if (!name) return { statusCode: 400, headers, body: JSON.stringify({ error: "Add your name." }) };

  const link = toUrl(str(b.link, 500));
  const created = await notion("/pages", {
    method: "POST",
    body: {
      parent: { database_id: NOTION_REQUESTS_DB },
      properties: {
        /* Notion's title cap is 2000; the question is capped at 1500 above. */
        Question: { title: [{ text: { content: question } }] },
        Link: { url: link },
        ...(member ? { "Asked by": { relation: [{ id: member.id }] } } : {}),
        From: { rich_text: [{ text: { content: name } }] },
        Email: { email: email || null },
        Answers: { number: 0 },
        Status: { select: { name: "Open" } },
      },
    },
  });
  if (!created.ok) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "That did not send. Try again in a sec." }) };
  }

  const reqId = String(created.json.id).replace(/-/g, "");
  const answerUrl = `https://authorityengine.com.au/answer/${reqId}`;
  await notion(`/pages/${reqId}`, { method: "PATCH", body: { properties: { "Answer link": { url: answerUrl } } } });

  const first = name.split(" ")[0];
  await talentSlack(
    event,
    [
      `:memo: *New question from ${name}*`,
      question,
      link ? `Work: ${link}` : null,
      "",
      "Paste into WhatsApp:",
      "```",
      `New question from ${first}: "${question}"`,
      "Anyone with a view, jump in. Answer here:",
      answerUrl,
      "```",
      `<${created.json.url}|Open in Notion>`,
    ]
      .filter((l) => l !== null)
      .join("\n")
  );

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, answerUrl }) };
};
