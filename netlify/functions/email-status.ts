import crypto from "node:crypto";
import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  POST /.netlify/functions/email-status   (read only)

  What GoHighLevel knows about emails sent from code: delivered, opened,
  clicked, failed. contentengine's 7am portal-digest asks with the GHL email
  message ids it logged on 'email_sent' events and turns the answers into
  'email_delivered' / 'email_bounced' on each buyer's timeline (Sean, 24 Nov
  2026: "i need full tracking and visibility across all data").

  GHL_TOKEN lives only on this site, so this is the one place that can ask.
  Called with header x-call-context-key (the secret both sites already share;
  this site is at Netlify's 4KB env limit, so no new variable).

    { ids: ["<emailMessageId>", ...] }   at most 50
  -> { results: [{ id, status, to, subject, sentAt, updatedAt }] }

  GHL's status is itself approximate for opens: it comes from the same kind
  of pixel, so Apple Mail Privacy Protection and mail scanners can mark an
  email "opened" seconds after it is sent.
*/

const headers = { "Content-Type": "application/json" };
const safeEqual = (a: string, b: string) =>
  a.length === b.length && a.length > 0 && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "POST only" }) };
  const secret = process.env.CALL_CONTEXT_SECRET || "";
  const key = String(event.headers["x-call-context-key"] || "");
  if (!secret || !safeEqual(key, secret)) return { statusCode: 403, headers, body: JSON.stringify({ error: "Not permitted" }) };
  const token = process.env.GHL_TOKEN;
  if (!token) return { statusCode: 503, headers, body: JSON.stringify({ error: "GHL_TOKEN not set" }) };

  let ids: string[] = [];
  try {
    ids = (JSON.parse(event.body || "{}").ids || []).map(String).filter((s: string) => /^[A-Za-z0-9]{8,40}$/.test(s)).slice(0, 50);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad body" }) };
  }

  const results = [];
  for (const id of ids) {
    try {
      const r = await fetch(`${GHL_API}/conversations/messages/email/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) {
        results.push({ id, error: `HTTP ${r.status}` });
        continue;
      }
      const m = (await r.json())?.emailMessage || {};
      results.push({
        id,
        status: m.status || null,
        to: Array.isArray(m.to) ? m.to.join(", ") : m.to || null,
        subject: m.subject || null,
        sentAt: m.dateAdded || null,
        updatedAt: m.dateUpdated || null,
      });
    } catch (e) {
      results.push({ id, error: String((e as Error).message || e) });
    }
  }
  return { statusCode: 200, headers, body: JSON.stringify({ results }) };
};

export { handler };
