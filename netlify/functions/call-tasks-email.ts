import crypto from "node:crypto";
import type { Handler } from "@netlify/functions";
import { findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  POST /.netlify/functions/call-tasks-email   header x-call-context-key

  Sean, 25 Nov 2026: "when we update, can we make sure that there's an email
  sent out with new tasks". contentengine calls this the moment a call's notes
  land on a client's portal. It sends through GHL (so it sits in the contact's
  conversation history), tracked: every link and the open are logged on the
  client's contentengine timeline by sendEmail.

  Body: { email, name, clientId, tasks: string[], portalUrl }
  The email is built here from the task lines, so this cannot be used to send
  anything else.
*/

const safeEqual = (a: string, b: string) =>
  a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "POST only" });
  const secret = process.env.CALL_CONTEXT_SECRET || "";
  const key = String(event.headers["x-call-context-key"] || "");
  if (!secret || !safeEqual(key, secret)) return json(403, { error: "Not permitted" });
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return json(503, { error: "GHL not configured" });

  let b: any;
  try { b = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Invalid JSON" }); }
  const email = String(b.email || "").trim().toLowerCase();
  const tasks: string[] = (Array.isArray(b.tasks) ? b.tasks : []).map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 40);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !tasks.length) return json(400, { error: "email and tasks required" });
  const first = String(b.name || "").trim().split(/\s+/)[0] || "Hey";
  const portal = /^https:\/\/contentengine\.live\//.test(String(b.portalUrl || "")) ? String(b.portalUrl) : "https://contentengine.live/portal";

  const contactId = await findOrCreateByEmail(token, location, email, { firstName: first === "Hey" ? undefined : first });
  if (!contactId) return json(502, { error: "No GHL contact" });

  const html = [
    `<p>${esc(first)}, here's your list from today's call.</p>`,
    `<ul>${tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`,
    `<p>It's on your portal too. Tick them off there: <a href="${portal}">open your portal</a></p>`,
    `<p>Sean</p>`,
  ].join("");
  const r = await sendEmail(token, contactId, "Your list from today's call", html, { email, clientId: b.clientId || undefined });
  return json(r.sent ? 200 : 502, r);
};

export { handler };
