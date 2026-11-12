import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  "Your WhatsApp group is ready", sent the moment the invite link is pasted.

  Sean, 2026-11-12: payment to onboard, with WhatsApp as a core piece. The
  group is made by hand. Its invite link is pasted once on the client's portal
  hub on contentengine.live (Edit hub), and contentengine's whatsapp-ready
  saves it and calls this with the shared secret. This sends the email through
  GHL so it lands in the same thread as their welcome email, and tells Slack.

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { email, name, url }  ->  { sent, reason? }

  Reuses CALL_CONTEXT_SECRET. This site has no room for a new environment
  variable (Netlify's 4KB function limit, 2026-11-11).
*/

const safeEqual = (a: string, b: string) =>
  a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => {});
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  const secret = process.env.CALL_CONTEXT_SECRET || "";
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!secret || !token || !location) return reply(503, { sent: false, reason: "not configured" });
  if (!safeEqual(String(event.headers["x-call-context-key"] || ""), secret)) return reply(401, { error: "unauthorised" });

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return reply(400, { error: "bad json" });
  }
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const url = String(body.url || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });
  if (!/^https:\/\/(chat\.whatsapp\.com|wa\.me|whatsapp\.com\/channel|www\.whatsapp\.com)\/\S+$/i.test(url)) {
    return reply(400, { sent: false, reason: "not a WhatsApp link" });
  }

  const contactId = await findOrCreateByEmail(token, location, email, {});
  if (!contactId) return reply(200, { sent: false, reason: "no GHL contact" });

  const first = name.split(" ")[0] || "there";
  const { sent, reason } = await sendEmail(token, contactId, "Your brand WhatsApp group is ready", [
    `<p>${esc(first)},</p>`,
    `<p>Your brand WhatsApp group is ready. <a href="${esc(url)}">Join it here</a> for async comms with your team and I.</p>`,
    `<p>Post your questions there. For urgent blockers, tag the operator. The link is on your portal too, under Need help.</p>`,
    `<p>Sean</p>`,
  ].join(""));

  await slack(
    sent
      ? `:speech_balloon: WhatsApp link sent to *${esc(name || email)}*. <${contactUrl(contactId)}|GHL>`
      : `:warning: WhatsApp link saved for *${esc(name || email)}* but the email did not send (${reason}). Send them ${url} by hand.`
  );
  return reply(200, { sent, reason });
};
