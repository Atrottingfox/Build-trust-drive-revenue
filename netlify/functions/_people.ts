import { whatsappLine } from "./_calls";

/*
  The email a second person on a client's portal gets (their head of content,
  their editor): the welcome from person-welcome, and the same words again as
  portal-chase's 48 hour reminder if their link is still unused.

  Sean approved the send on 28 Nov 2026. PLACEHOLDER WORDING until Sean voices
  it: every line is an existing sentence from portal-chase, the founding
  welcome (_founding.ts) and whatsapp-ready, with only the names swapped. No
  new lines. When Sean writes his own, replace them here, both emails follow.
*/

export const PERSON_SUBJECT = "Your portal is ready";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export function personEmailHtml(p: { name?: string; clientName?: string; claimUrl: string; whatsappUrl?: string | null }): string {
  const first = esc((p.name || "").trim().split(/\s+/)[0] || "there");
  const client = esc((p.clientName || "").trim() || "Your team");
  return [
    `<p>${first},</p>`,
    `<p>${client} has added you to their portal. <a href="${esc(p.claimUrl)}">Set your password</a> and you are in.</p>`,
    `<p>Everything for the build lives there: the SOPs, playbooks, training and your calls.</p>`,
    /* Only with a real group link. The 24 hour promise (WHATSAPP_LINE) is the
       buyer's, not theirs. */
    p.whatsappUrl ? whatsappLine(p.whatsappUrl) : "",
    `<p>Sean</p>`,
  ].join("");
}
