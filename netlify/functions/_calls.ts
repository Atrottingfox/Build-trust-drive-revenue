/*
  The standing call details every client gets, from Sean's calls page
  (Calls and Zoom Links - Dream Out Loud, 11 Nov 2026). One Zoom link per call
  type, the same every week. Queensland time.
*/
export const OFFICE_HOURS = {
  when: "Thursday, 8 to 9:30am",
  zoom: "https://us06web.zoom.us/j/88013254811?pwd=rvabbMcztMM2AllUI4n8bCJlEidTpK.1",
  form: "https://authorityengine.notion.site/79691282e52242a797027539d5a5a29d",
};
/* The WhatsApp promise, the same words in every welcome email (Sean,
   2026-11-12). The group is made by hand and its invite link pasted on the
   client's portal hub, which emails it to them (whatsapp-ready). portal-chase
   tells Slack if nobody has done it after 24 hours. */
export const WHATSAPP_LINE =
  "<p>Your WhatsApp group is set up within 24 hours. The link lands in your inbox and on your portal.</p>";

/* With a group from the pool (Sean, 2026-11-12: 10 ready made "AE Content
   Advisory" groups), the email carries the link itself. Without one, the 24
   hour promise. */
export function whatsappLine(url?: string | null): string {
  if (!url) return WHATSAPP_LINE;
  const safe = url.replace(/"/g, "");
  return `<p><a href="${safe}">Join your WhatsApp group</a>. Post your questions there. For urgent blockers, tag the operator.</p>`;
}

export const BRAND_DAY_BOOKING = "https://calendly.com/sean-authorityengine/vip-day";
