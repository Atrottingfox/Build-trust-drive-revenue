import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  "Your portal is ready", sent when Sean invites someone from contentengine.live
  (Prescribe, Invite to portal). Sean, 2026-11-12: "how do i send someone a
  portal login so they can create their own portal ... i want to get alpha
  tradie the opportunity to get linked directly in".

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { name, email, url, existing }  ->  { sent, reason? }
  Same wording as portal-chase. Reuses CALL_CONTEXT_SECRET (no new variable:
  this site is at Netlify's 4KB function environment limit).
*/

const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

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
  const url = String(body.url || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });
  if (!/^https:\/\/contentengine\.live\//.test(url)) return reply(400, { sent: false, reason: "not a portal link" });

  const [firstName, ...rest] = name.split(/\s+/);
  const contactId = await findOrCreateByEmail(token, location, email, { firstName: firstName || undefined, lastName: rest.join(" ") || undefined });
  if (!contactId) return reply(200, { sent: false, reason: "no GHL contact" });

  const first = esc(firstName || "there");
  const { sent, reason } = await sendEmail(token, contactId, "Your portal is ready", [
    `<p>${first},</p>`,
    body.existing
      ? `<p>Your portal is ready. <a href="${esc(url)}">Log in here</a>.</p>`
      : `<p>Your portal is set up and waiting. <a href="${esc(url)}">Set your password</a> and you are in.</p>`,
    `<p>Everything for the build lives there: your calls, your plan, the short form playbooks and the training.</p>`,
    `<p>Sean</p>`,
  ].join(""));
  console.log("portal-invite-email", sent ? "sent" : `not sent: ${reason}`, contactUrl(contactId));
  return reply(200, { sent, reason });
};
