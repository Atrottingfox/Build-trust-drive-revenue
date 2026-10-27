import type { Handler } from "@netlify/functions";
import { getContact } from "./_ghl";

/*
  Posts visits to unlisted client pages into Slack. Called by usePageVisits,
  which SEO switches on for every noIndex page.

  One line when somebody opens a page, one when they leave saying how long they
  were on it, how far down they got and what they clicked. The location is
  there because most of these pages have no contact id, and "Gold Coast,
  iPhone" next to a client in Melbourne is how a team visit gets told apart.

  Deliberately not authenticated, same as track-hub: the page has to be able to
  call it, and all it can do is post a line to Slack. Inputs are checked and
  trimmed so it cannot be used to post anything else.

  Env:
    SLACK_WEBHOOK_VISITS   optional, its own channel. Falls back to SLACK_WEBHOOK_URL.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[<>&*_`~|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

function where(h: Record<string, string | undefined>): string {
  try {
    const geo = JSON.parse(Buffer.from(h["x-nf-geo"] || "", "base64").toString("utf8"));
    return [geo?.city, geo?.subdivision?.code, geo?.country?.code].filter(Boolean).join(", ");
  } catch {
    return "";
  }
}

function device(ua: string): string {
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Android/i.test(ua)) return "Android";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Windows";
  return "";
}

function duration(s: number): string {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let b: Record<string, any>;
  try {
    b = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false }) };
  }

  const path = clean(b.path, 80);
  if (!/^\/[a-z0-9\-/]*$/i.test(path)) return { statusCode: 400, headers, body: JSON.stringify({ ok: false }) };

  const url = process.env.SLACK_WEBHOOK_VISITS || process.env.SLACK_WEBHOOK_URL;
  if (!url) return { statusCode: 200, headers, body: JSON.stringify({ ok: false, configured: false }) };

  /* A contact id in the link names the person. Without one, the page title does. */
  let who = "";
  const contactId = clean(b.contactId, 40);
  if (contactId && process.env.GHL_TOKEN) {
    const c = await getContact(process.env.GHL_TOKEN, contactId);
    who = clean([c?.firstName, c?.lastName].filter(Boolean).join(" "), 60);
  }

  const page = `authorityengine.com.au${path}`;
  const title = clean(b.title, 80);
  const visit = clean(b.visitId, 12);
  const tag = b.team ? "[team] " : "";
  const from = [where(event.headers), device(event.headers["user-agent"] || "")].filter(Boolean).join(", ");

  let text: string;
  if (b.kind === "summary") {
    const seconds = Math.max(0, Math.min(86400, Number(b.seconds) || 0));
    const scroll = Math.max(0, Math.min(100, Number(b.scroll) || 0));
    const clicks = (Array.isArray(b.clicks) ? b.clicks : [])
      .slice(0, 20)
      .map((c: unknown) => clean(c, 60))
      .filter(Boolean);
    text =
      `${tag}${who || page}: ${duration(seconds)} on the page, scrolled ${scroll}%` +
      (clicks.length ? `, clicked: ${clicks.map((c: string) => `"${c}"`).join(", ")}` : ", no clicks") +
      ` (visit ${visit})`;
  } else {
    const ref = clean(b.referrer, 120);
    text =
      `${tag}${who ? `${who} opened ` : "Opened "}${page}` +
      (title ? ` (${title})` : "") +
      (from ? `, from ${from}` : "") +
      (ref && !ref.includes("authorityengine.com.au") ? `, via ${ref}` : "") +
      ` (visit ${visit})`;
  }

  try {
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
  } catch {
    /* a missed line is not worth an error on somebody's page */
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};

export { handler };
