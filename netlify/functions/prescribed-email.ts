import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  "New from Sean", sent when Sean prescribes formats or playbooks on a
  client's portal (contentengine.live). Sean, 2026-11-13: "i like the
  prescriptions getting sent".

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { name, email, formats: string[], playbooks: string[] }  ->  { sent, reason? }
  Reuses CALL_CONTEXT_SECRET (no new variable: this site is at Netlify's 4KB
  function environment limit).
*/

const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean).slice(0, 30) : []);

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
  const formats = list(body.formats);
  const playbooks = list(body.playbooks);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });
  if (!formats.length && !playbooks.length) return reply(400, { sent: false, reason: "nothing prescribed" });

  const [firstName, ...rest] = name.split(/\s+/);
  const contactId = await findOrCreateByEmail(token, location, email, { firstName: firstName || undefined, lastName: rest.join(" ") || undefined });
  if (!contactId) return reply(200, { sent: false, reason: "no GHL contact" });

  const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const tab = formats.length ? "formats" : "playbooks";
  const { sent, reason } = await sendEmail(token, contactId, "New from Sean on your portal", [
    `<p>${esc(firstName || "there")},</p>`,
    `<p>I've picked these for you.</p>`,
    formats.length ? `<p><b>Formats</b></p>${ul(formats)}` : "",
    playbooks.length ? `<p><b>Playbooks</b></p>${ul(playbooks)}` : "",
    `<p>They're on your portal. <a href="https://contentengine.live/portal?tab=${tab}">Open it here</a>.</p>`,
    `<p>Sean</p>`,
  ].join(""));
  console.log("prescribed-email", sent ? "sent" : `not sent: ${reason}`, contactUrl(contactId));
  return reply(200, { sent, reason });
};
