import type { Handler } from "@netlify/functions";
import { answeredTemplate, sendEmail } from "./_gmail";
import { NOTION_REQUESTS_DB, getMember, memberId, notion, talentSlack } from "./_talent";

/*
  /answer/<request id>.

  GET  ?id=  the question and every answer so far, for the page.
  POST       adds an answer: appended to the request's page in Notion (so the
             whole thread is one page), Answers +1, the asker is emailed from
             Sean's Gmail, and #talent hears about it.

  Answers are page blocks, not Notion comments: comments need extra integration
  permissions and a login to read, blocks need neither.

  No login anywhere. A known member (personal link seen on this device) is
  credited by name; anyone else types their name.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const plain = (rt: any[] = []) => rt.map((t) => t.plain_text).join("");

/* Only rows in Requests can be read or answered through this endpoint. */
async function getRequest(id: string) {
  const r = await notion(`/pages/${id}`);
  if (!r.ok) return null;
  if ((r.json.parent?.database_id || "").replace(/-/g, "") !== NOTION_REQUESTS_DB) return null;
  const p = r.json.properties;
  return {
    id,
    url: r.json.url as string,
    question: plain(p.Question?.title),
    link: (p.Link?.url as string) || null,
    from: plain(p.From?.rich_text) || "A member",
    email: (p.Email?.email as string) || "",
    askedBy: (p["Asked by"]?.relation?.[0]?.id as string) || "",
    answers: (p.Answers?.number as number) || 0,
  };
}

/* Each answer is a heading_3 "Name" followed by its paragraphs, then a divider. */
async function readAnswers(id: string) {
  const r = await notion(`/blocks/${id}/children?page_size=100`);
  const out: { name: string; text: string }[] = [];
  for (const b of r.ok ? r.json.results : []) {
    if (b.type === "heading_3") out.push({ name: plain(b.heading_3.rich_text), text: "" });
    else if (b.type === "paragraph" && out.length) {
      const t = plain(b.paragraph.rich_text);
      out[out.length - 1].text += (out[out.length - 1].text ? "\n" : "") + t;
    }
  }
  return out;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };

  if (event.httpMethod === "GET") {
    const id = memberId(event.queryStringParameters?.id);
    const req = id ? await getRequest(id) : null;
    if (!req) return { statusCode: 404, headers, body: JSON.stringify({ error: "Not found" }) };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        question: req.question,
        link: req.link,
        from: req.from,
        answers: await readAnswers(req.id),
      }),
    };
  }

  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "" };

  let b: Record<string, unknown>;
  try {
    b = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad request" }) };
  }
  if (str(b.company, 10)) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  const id = memberId(b.id);
  const req = id ? await getRequest(id) : null;
  if (!req) return { statusCode: 404, headers, body: JSON.stringify({ error: "That question is gone." }) };

  const text = str(b.text, 6000);
  if (!text) return { statusCode: 400, headers, body: JSON.stringify({ error: "Add your answer." }) };

  const mid = memberId(b.m);
  const member = mid ? await getMember(mid) : null;
  const name = member?.name || str(b.name, 120);
  if (!name) return { statusCode: 400, headers, body: JSON.stringify({ error: "Add your name." }) };

  /* Paragraphs of up to 2000 characters each, Notion's rich text limit. */
  const paras = text
    .split(/\n+/)
    .flatMap((p) => p.match(/[\s\S]{1,2000}/g) || [])
    .map((p) => ({ object: "block", type: "paragraph", paragraph: { rich_text: [{ text: { content: p } }] } }));
  const added = await notion(`/blocks/${req.id}/children`, {
    method: "PATCH",
    body: {
      children: [
        { object: "block", type: "heading_3", heading_3: { rich_text: [{ text: { content: name } }] } },
        ...paras,
        { object: "block", type: "divider", divider: {} },
      ],
    },
  });
  if (!added.ok) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "That did not send. Try again in a sec." }) };
  }
  await notion(`/pages/${req.id}`, { method: "PATCH", body: { properties: { Answers: { number: req.answers + 1 } } } });

  /* The asker's email: their member row first, then what they typed. */
  const asker = req.askedBy ? await getMember(req.askedBy.replace(/-/g, "")) : null;
  const to = asker?.email || req.email;
  const readUrl = `https://authorityengine.com.au/answer/${req.id}`;
  let emailed = false;
  if (to && asker?.id !== member?.id) {
    const t = await answeredTemplate({
      first: (asker?.name || req.from).split(" ")[0],
      answerer: name,
      question: req.question,
      link: readUrl,
    });
    emailed = await sendEmail(event, to, t.subject, t.body);
  }

  await talentSlack(
    event,
    `:speech_balloon: *${name}* answered ${req.from}'s question: "${req.question.slice(0, 120)}"` +
      (to ? (emailed ? " (emailed them)" : " :warning: email to them did not send") : " (no email on file)") +
      ` <${req.url}|Open in Notion>`
  );

  /* emailed is true, false, or null when there was nobody to email. */
  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, emailed: to ? emailed : null }) };
};
