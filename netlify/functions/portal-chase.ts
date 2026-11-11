import type { Handler } from "@netlify/functions";
import { findOrCreateByEmail, sendEmail, contactUrl } from "./_ghl";

/*
  Reminds a paid client who has not set up their portal after 48 hours.

  Sean, 2026-11-11: "Not set up after 48 hours: a reminder email with the same
  link, and a Slack line to you." contentengine's portal-unclaimed lists
  clients whose one time "set your password" link went out 2 to 3 days ago and
  is still unused, so each client gets one reminder, not one a day. The link is
  the same one from the payment email; it stays valid until it is used.

  Sent from code like the payment email, because the tag route has failed
  before. If the send fails, Slack says so.
*/

const UNCLAIMED_URL =
  process.env.PORTAL_UNCLAIMED_URL || "https://contentengine.live/.netlify/functions/portal-unclaimed";

async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }).catch(() => {});
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export const handler: Handler = async () => {
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!token || !location || !secret) return { statusCode: 200, body: "not configured" };

  let clients: { name: string; email: string; claimUrl: string; slug: string }[] = [];
  try {
    const r = await fetch(UNCLAIMED_URL, { method: "POST", headers: { "x-call-context-key": secret }, signal: AbortSignal.timeout(10000) });
    if (!r.ok) throw new Error(`portal-unclaimed ${r.status}`);
    clients = (await r.json())?.clients || [];
  } catch (err) {
    await slack(`:warning: The portal reminder could not run: ${String(err)}`);
    return { statusCode: 200, body: "lookup failed" };
  }

  const lines: string[] = [];
  for (const c of clients) {
    if (!c.email) continue;
    const first = (c.name || "").split(" ")[0] || "there";
    const contactId = await findOrCreateByEmail(token, location, c.email, {});
    const { sent, reason } = contactId
      ? await sendEmail(token, contactId, "Your portal is ready", [
          `<p>${esc(first)},</p>`,
          `<p>Your portal is set up and waiting. <a href="${c.claimUrl}">Set your password</a> and you are in.</p>`,
          `<p>Everything for the build lives there: your calls, the prep form, the short form playbook and the training.</p>`,
          `<p>Sean</p>`,
        ].join(""))
      : { sent: false, reason: "no GHL contact" };
    lines.push(`${esc(c.name || c.email)}: ${sent ? "reminded" : `NOT reminded (${reason})`}${contactId ? ` <${contactUrl(contactId)}|GHL>` : ""}`);
  }

  if (lines.length) {
    await slack(`:key: *Portal not set up after 48 hours.*\n` + lines.map((l) => `  • ${l}`).join("\n"));
  }
  return { statusCode: 200, body: JSON.stringify({ reminded: lines.length }) };
};
