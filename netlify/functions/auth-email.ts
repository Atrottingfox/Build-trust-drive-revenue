import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  Login emails for contentengine.live (password reset and the rest), sent
  through GHL like every other email from Sean (2026-11-13). Supabase's built
  in mailer sends 2 an hour and may not reach clients.

  contentengine's auth-email-hook receives Supabase's send email hook, checks
  its signature, and calls this with the shared secret.

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { email, action, url }  ->  { sent, reason? }
  action: recovery | invite | magiclink | signup | email_change
  Reuses CALL_CONTEXT_SECRET (this site is at Netlify's 4KB env limit).
*/

const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const button = (url: string, label: string) =>
  `<p><a href="${esc(url)}" style="display:inline-block;background:#3B7DFF;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:10px">${label}</a></p>`;

const COPY: Record<string, { subject: string; body: (url: string) => string }> = {
  recovery: {
    subject: "Reset your Authority Engine password",
    body: (u) => `<p>Here's your link to set a new password for your Authority Engine portal.</p>${button(u, "Set a new password")}<p>It works once and runs out in an hour. If you didn't ask for this, ignore it and nothing changes.</p><p>Sean</p>`,
  },
  magiclink: {
    subject: "Your Authority Engine login link",
    body: (u) => `<p>Here's your link to log in to your Authority Engine portal.</p>${button(u, "Log in")}<p>It works once and runs out in an hour.</p><p>Sean</p>`,
  },
  invite: {
    subject: "Your Authority Engine portal is ready",
    body: (u) => `<p>Your portal is set up and waiting.</p>${button(u, "Set your password")}<p>Everything for the build lives there: your calls, your plan, the short form playbooks and the training.</p><p>Sean</p>`,
  },
  signup: {
    subject: "Confirm your Authority Engine login",
    body: (u) => `<p>Confirm your email to finish setting up your Authority Engine login.</p>${button(u, "Confirm")}<p>Sean</p>`,
  },
  email_change: {
    subject: "Confirm your new email",
    body: (u) => `<p>Confirm this is your new email for your Authority Engine portal.</p>${button(u, "Confirm")}<p>Sean</p>`,
  },
};

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
  const url = String(body.url || "").trim();
  const copy = COPY[String(body.action || "")] || COPY.magiclink;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });
  if (!/^https:\/\/[a-z0-9.-]+\.supabase\.co\/auth\/v1\/verify\?/.test(url)) return reply(400, { sent: false, reason: "not a login link" });

  const contactId = await findOrCreateByEmail(token, location, email, {});
  if (!contactId) return reply(502, { sent: false, reason: "no GHL contact" });
  const { sent, reason } = await sendEmail(token, contactId, copy.subject, copy.body(url));
  return reply(sent ? 200 : 502, { sent, reason });
};
