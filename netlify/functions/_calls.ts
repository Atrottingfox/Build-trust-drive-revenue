/*
  The standing call details every client gets, from Sean's calls page
  (Calls and Zoom Links - Dream Out Loud, 11 Nov 2026). One Zoom link per call
  type, the same every week. Queensland time. Moved to 11am to 12:30pm from
  3 Dec 2026, to match the portal and its calendar invite (contentengine
  a9c9ae4, 26 Nov). The emails still said 8 to 9:30am until 28 Nov.
*/
export const OFFICE_HOURS = {
  when: "Thursday, 11am to 12:30pm",
  zoom: "https://us06web.zoom.us/j/88013254811?pwd=rvabbMcztMM2AllUI4n8bCJlEidTpK.1",
  form: "https://authorityengine.notion.site/79691282e52242a797027539d5a5a29d",
};
/* The WhatsApp promise, the same words in every welcome email (Sean,
   2026-11-12). The group is made by hand and its invite link pasted on the
   client's portal hub, which emails it to them (whatsapp-ready). portal-chase
   tells Slack if nobody has done it after 24 hours. */
export const WHATSAPP_LINE =
  "<p>Your brand WhatsApp group, for async comms with your team and I, is set up within 24 hours. The link lands in your inbox and on your portal.</p>";

/* With a group from the pool (Sean, 2026-11-12: 10 ready made "AE Content
   Advisory" groups), the email carries the link itself. Without one, the 24
   hour promise. */
export function whatsappLine(url?: string | null): string {
  if (!url) return WHATSAPP_LINE;
  const safe = url.replace(/"/g, "");
  return `<p><a href="${safe}">Join your brand WhatsApp group</a> for async comms with your team and I.</p>`;
}

export const BRAND_DAY_BOOKING = "https://calendly.com/sean-authorityengine/vip-day";
