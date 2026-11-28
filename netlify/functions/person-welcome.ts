import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";
import { PERSON_SUBJECT, personEmailHtml } from "./_people";

/*
  The welcome for a second person on a client's portal (their head of content,
  their editor). Sean, 28 Nov 2026: people added to a portal get their own
  welcome and login link, instead of nothing.

  contentengine's portal-add-person calls this after it makes their personal
  /claim/<code> link. Never sent to the founder: they get the founding
  welcome, and portal-add-person skips them.

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { email, name, role, clientName, claimUrl, whatsappUrl?, clientId? }  ->  { sent, reason? }

  The wording lives in _people.ts and is PLACEHOLDER until Sean voices it.
  With clientId, sendEmail logs the send (or the failure) on that client's
  timeline and Slack thread on contentengine, so there is no Slack call here.
  Reuses CALL_CONTEXT_SECRET: this site is at Netlify's 4KB env limit.
*/

const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  const secret = process.env.CALL_CONTEXT_SECRET || "";
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!secret || !token || !location) return reply(503, { sent: false, reason: "not configured" });
  if (!safeEqual(String(event.headers["x-call-context-key"] || ""), secret)) return reply(401, { error: "unauthorised" });

  let body: any = {};
  try { body = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "bad json" }); }
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const role = String(body.role || "").trim();
  const clientName = String(body.clientName || "").trim();
  const claimUrl = String(body.claimUrl || "").trim();
  const whatsappUrl = String(body.whatsappUrl || "").trim();
  const clientId = UUID.test(String(body.clientId || "")) ? String(body.clientId) : undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });
  if (!/^https:\/\/contentengine\.live\/claim\/[A-Za-z0-9_-]+$/.test(claimUrl)) return reply(400, { sent: false, reason: "not a portal link" });
  const wa = /^https:\/\/chat\.whatsapp\.com\/\S+$/i.test(whatsappUrl) ? whatsappUrl : null;

  const [firstName, ...rest] = name.split(/\s+/);
  const contactId = await findOrCreateByEmail(token, location, email, { firstName: firstName || undefined, lastName: rest.join(" ") || undefined });
  if (!contactId) return reply(200, { sent: false, reason: "no GHL contact" });

  const { sent, reason } = await sendEmail(token, contactId, PERSON_SUBJECT, personEmailHtml({ name, clientName, claimUrl, whatsappUrl: wa }), { email, clientId });
  console.log("person-welcome", role || "person", sent ? "sent" : `not sent: ${reason}`, contactUrl(contactId));
  return reply(200, { sent, reason });
};
