import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import { contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";

/*
  "Your idea capture", sent from contentengine.live (the portal's idea card,
  owner only). Sean, 2026-11-27: "Instructions to add the engine room 'capture
  whats on your mind' to home screen, and automated method to get it direct to
  people ... They just need teach belief share."

  POST, header x-call-context-key: <CALL_CONTEXT_SECRET>
  { name, email, url, preview? }  ->  { sent, reason? }  or, with preview, { subject, text }
  preview returns the exact words without sending, so Sean sees it first.
  Reuses CALL_CONTEXT_SECRET (this site is at Netlify's 4KB env limit).
*/

const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const reply = (statusCode: number, body: unknown) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const SUBJECT = "Your idea capture app";

// One list of lines, so the preview and the email can never differ.
// A line starting with "- " is a list item; "#" is a small heading; "[link]" is the button.
// Sean, 27 Nov: "specifically just to get the homescreen app and show how to do it".
// The link opens a setup screen that shows the taps for their phone.
function lines(first: string): string[] {
  return [
    `${first},`,
    "Open this on your phone. It shows you how to put it on your home screen, two taps.",
    "[link]",
    "Then whenever something's on your mind, tap it and talk.",
    "Sean",
  ];
}

// The weekly target nudge (Sean, 27 Nov: "send them a nudge at 9am, 2pm, and
// 5pm friday if they haven't done it").
type Nudge = { have: number; need: number; due: string };
function nudgeLines(first: string, n: Nudge): string[] {
  const left = Math.max(1, n.need - n.have);
  return [
    `${first},`,
    `${n.have} of ${n.need} ideas in this week. ${left} to go, they were due ${n.due}.`,
    "Tap it, pick Teach, Belief or Share, and talk. One minute each.",
    "[link]",
    "Sean",
  ];
}

function toText(first: string, url: string, n?: Nudge) {
  return (n ? nudgeLines(first, n) : lines(first)).map((l) => (l === "[link]" ? url : l.startsWith("# ") ? `\n${l.slice(2)}` : l)).join("\n");
}

function toHtml(first: string, url: string, n?: Nudge) {
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.join("")}</ul>`); list = []; } };
  for (const l of (n ? nudgeLines(esc(first), n) : lines(esc(first)))) {
    if (l.startsWith("- ")) { list.push(`<li>${l.slice(2)}</li>`); continue; }
    flush();
    if (l === "[link]") out.push(`<p><a href="${esc(url)}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:#3B7DFF;color:#fff;font-weight:600;text-decoration:none">Set it up</a></p>`);
    else if (l.startsWith("# ")) out.push(`<p style="margin-top:20px"><strong>${l.slice(2)}</strong></p>`);
    else out.push(`<p>${l}</p>`);
  }
  flush();
  return out.join("");
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });
  const secret = process.env.CALL_CONTEXT_SECRET || "";
  if (!secret) return reply(503, { sent: false, reason: "not configured" });
  if (!safeEqual(String(event.headers["x-call-context-key"] || ""), secret)) return reply(401, { error: "unauthorised" });

  let body: any = {};
  try { body = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "bad json" }); }
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const url = String(body.url || "").trim();
  if (!/^https:\/\/contentengine\.live\/c\/[A-Za-z0-9_-]{16,64}$/.test(url)) return reply(400, { sent: false, reason: "not a capture link" });
  const [firstName, ...rest] = name.split(/\s+/);
  const first = firstName || "Hey";

  const n: Nudge | undefined = body.nudge && Number.isFinite(Number(body.nudge.need))
    ? { have: Math.max(0, Number(body.nudge.have) || 0), need: Number(body.nudge.need), due: esc(String(body.nudge.due || "").slice(0, 40)) }
    : undefined;
  const togo = n ? Math.max(1, n.need - n.have) : 0;
  const subject = n ? `${togo} idea${togo === 1 ? "" : "s"} to go this week` : SUBJECT;
  if (body.preview) return reply(200, { subject, text: toText(first, url, n) });

  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return reply(503, { sent: false, reason: "not configured" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { sent: false, reason: "no email" });

  const contactId = await findOrCreateByEmail(token, location, email, { firstName: firstName || undefined, lastName: rest.join(" ") || undefined });
  if (!contactId) return reply(200, { sent: false, reason: "no GHL contact" });
  const { sent, reason } = await sendEmail(token, contactId, subject, toHtml(first, url, n));
  console.log("capture-link-email", sent ? "sent" : `not sent: ${reason}`, contactUrl(contactId));
  return reply(200, { sent, reason });
};
