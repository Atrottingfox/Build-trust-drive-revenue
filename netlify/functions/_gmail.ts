import { connectLambda, getStore } from "@netlify/blobs";

/*
  Sends one email from sean@authorityengine.com.au through Gmail.

  Its own Google authorisation, scoped to gmail.send only, kept in the "config"
  blob store as `gmail-refresh`. Deliberately separate from the calendar token
  in GOOGLE_REFRESH_TOKEN, so neither can break the other, and not an env var
  because the site is at AWS's 4KB env limit. The OAuth client (id and secret)
  is shared with the calendar.

  The wording lives in Notion (Talentpool > "Email: someone answered your
  question") so Sean can change it without code.

  Returns false rather than throwing: an email that fails must never lose the
  answer that triggered it.
*/

const FROM = "Sean Fox <sean@authorityengine.com.au>";

async function accessToken(event: unknown): Promise<string | null> {
  connectLambda(event as any);
  const refresh = await getStore("config").get("gmail-refresh", { type: "text" });
  if (!refresh) return null;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    console.error("Gmail token refresh failed:", res.status, await res.text());
    return null;
  }
  return (await res.json()).access_token || null;
}

/* RFC 2047 so a subject with an apostrophe or emoji survives. */
const encodeHeader = (s: string) => `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`;

export async function sendEmail(event: unknown, to: string, subject: string, body: string) {
  try {
    const token = await accessToken(event);
    if (!token) return false;
    const mime = [
      `From: ${FROM}`,
      `To: ${to}`,
      `Subject: ${encodeHeader(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      Buffer.from(body, "utf8").toString("base64"),
    ].join("\r\n");
    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: Buffer.from(mime, "utf8").toString("base64url") }),
    });
    if (!res.ok) console.error("Gmail send failed:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("Gmail send threw:", err);
    return false;
  }
}

/* The template page, as "Subject: ..." then the body, with {placeholders}. */
const TEMPLATE_PAGE = "3eb0b2eb6dfb81faaeb0fec1be1e5f1a";

export async function answeredTemplate(vars: Record<string, string>) {
  let lines: string[] = [];
  try {
    const res = await fetch(`https://api.notion.com/v1/blocks/${TEMPLATE_PAGE}/children?page_size=100`, {
      headers: { Authorization: `Bearer ${process.env.NOTION_API_KEY}`, "Notion-Version": "2022-06-28" },
    });
    if (res.ok) {
      lines = ((await res.json()).results || [])
        .filter((b: any) => b.type === "paragraph")
        .map((b: any) => (b.paragraph.rich_text || []).map((t: any) => t.plain_text).join(""));
    }
  } catch (err) {
    console.error("Email template read failed:", err);
  }
  /* A broken or emptied template still sends something sensible. */
  if (!lines.length || !/^subject:/i.test(lines[0])) {
    lines = ["Subject: {answerer} answered your question", "Hey {first},", '{answerer} just answered "{question}"', "Read it here: {link}", "Sean"];
  }
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  return {
    subject: fill(lines[0].replace(/^subject:\s*/i, "")),
    body: lines.slice(1).map(fill).join("\n\n"),
  };
}
