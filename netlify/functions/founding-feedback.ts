import type { Handler } from "@netlify/functions";

/*
  Advisory board feedback from /founding-review, posted to Slack. Not
  authenticated, same as page-visit: all it can do is post a line, and every
  field is cleaned and trimmed.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const clean = (v: unknown, max: number) =>
  String(v ?? "").replace(/[<>&*_`~|]/g, "").replace(/\s+/g, " ").trim().slice(0, max);

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ ok: false }) };

  let b: Record<string, unknown>;
  try {
    b = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false }) };
  }

  const name = clean(b.name, 80);
  if (!name) return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "name" }) };

  const headline = clean(b.headlineOwn, 160) || clean(b.headline, 160) || "no pick";
  const lines = [
    `:speech_balloon: *Founding page feedback from ${name}*`,
    `Headline: ${headline}`,
    `Would buy: ${clean(b.wouldBuy, 10) || "not answered"}`,
    b.change ? `Change: ${clean(b.change, 1500)}` : "",
    b.strongest ? `Strongest: ${clean(b.strongest, 800)}` : "",
    b.other ? `Else: ${clean(b.other, 800)}` : "",
  ].filter(Boolean);

  const url = process.env.SLACK_WEBHOOK_FEEDBACK || process.env.SLACK_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: lines.join("\n") }) });
    } catch {
      return { statusCode: 502, headers, body: JSON.stringify({ ok: false }) };
    }
  }
  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};

export { handler };
