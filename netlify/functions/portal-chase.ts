import type { Handler } from "@netlify/functions";
import { findOrCreateByEmail, sendEmail, contactUrl, getTags } from "./_ghl";
import { PERSON_SUBJECT, personEmailHtml } from "./_people";

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
  let noWhatsapp: { name: string; email: string }[] = [];
  let people: { name: string; email: string; role: string; claimUrl: string; clientId: string; clientName: string; whatsappUrl?: string | null }[] = [];
  try {
    const r = await fetch(UNCLAIMED_URL, { method: "POST", headers: { "x-call-context-key": secret }, signal: AbortSignal.timeout(10000) });
    if (!r.ok) throw new Error(`portal-unclaimed ${r.status}`);
    const out = await r.json();
    clients = out?.clients || [];
    noWhatsapp = out?.noWhatsapp || [];
    people = out?.people || [];
  } catch (err) {
    await slack(`:warning: The portal reminder could not run: ${String(err)}`);
    return { statusCode: 200, body: "lookup failed" };
  }

  const lines: string[] = [];
  for (const c of clients) {
    if (!c.email) continue;
    const first = (c.name || "").split(" ")[0] || "there";
    const contactId = await findOrCreateByEmail(token, location, c.email, {});
    /* Founding buyers get their own "Quick one" login nudge on day 3 from
       founding-nudge. Sending this as well put two "set up your portal" emails
       in their inbox the same day (28 Nov). Skip them here. */
    if (contactId && (await getTags(token, contactId)).includes("founding-paid")) {
      lines.push(`${esc(c.name || c.email)}: skipped, founding buyer (their day 3 Quick one covers it)`);
      continue;
    }
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

  /* Second people on a client's portal (head of content, editor) whose own
     link from portal-add-person is still unused 2 to 3 days on (Sean, 28 Nov
     2026). Same reminder as their welcome. They are not founding buyers, so
     no tag check. With clientId, the send lands on that client's thread too. */
  for (const p of people) {
    if (!p.email || !p.claimUrl) continue;
    const contactId = await findOrCreateByEmail(token, location, p.email, {});
    const { sent, reason } = contactId
      ? await sendEmail(token, contactId, PERSON_SUBJECT, personEmailHtml(p), { email: p.email, clientId: p.clientId })
      : { sent: false, reason: "no GHL contact" };
    lines.push(`${esc(p.name || p.email)} (${esc(p.role || "person")} on ${esc(p.clientName || "a portal")}): ${sent ? "reminded" : `NOT reminded (${reason})`}${contactId ? ` <${contactUrl(contactId)}|GHL>` : ""}`);
  }

  if (lines.length) {
    await slack(`:key: *Portal not set up after 48 hours.*\n` + lines.map((l) => `  • ${l}`).join("\n"));
  }
  /* Paid over 24 hours ago and still no WhatsApp link on their portal. The
     welcome email promised one within 24 hours (Sean, 2026-11-12). */
  if (noWhatsapp.length) {
    await slack(
      `:speech_balloon: *No WhatsApp group yet, and their welcome email promised one within 24 hours.*\n` +
        noWhatsapp.map((c) => `  • ${esc(c.name || c.email)} (${esc(c.email || "no email")})`).join("\n") +
        `\nMake the group, then paste the invite link on their portal hub (Edit hub). That emails it to them.`
    );
  }

  return { statusCode: 200, body: JSON.stringify({ reminded: lines.length, people: people.length, noWhatsapp: noWhatsapp.length }) };
};
