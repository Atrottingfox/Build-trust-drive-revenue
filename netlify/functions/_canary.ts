import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Shared by the two halves of the daily canary: `canary` creates and tags,
  `canary-check` looks for the email and cleans up.
*/

export const CANARY_EMAIL = "zz-canary@authorityengine.com.au";

/*
  The tag the site actually cycles. If this ever changes in
  builder-application, it has to change here, and the canary is what will tell
  you if a workflow was left listening for the old one.
*/
export const TRIGGER_TAG = "application-received";

export const ghlHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

async function post(lines: string[]) {
  const webhook = process.env.SLACK_WEBHOOK_HEALTH || process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  }).catch(() => {
    /* Already logged by the caller. */
  });
}

/* The workflow was given its chance and nothing came out. This is the real one. */
export async function alarmNoEmail(reason: string, detail: string) {
  await post([
    ":rotating_light: *An application would not produce an email right now*",
    "",
    `*${reason}*`,
    detail,
    "",
    "A real applicant submitting now would hear nothing back.",
    "",
    `Most likely a workflow is listening for the wrong tag. The site cycles \`${TRIGGER_TAG}\` on every submission; \`applied\` is permanent and only ever added, so a workflow triggered on \`applied\` will never fire for anyone who has applied before.`,
    "https://authorityengine.com.au/health",
  ]);
  console.error("CANARY FAILED:", reason, detail);
}

/*
  The test itself broke before it could ask the question. Reporting this as a
  silent applicant, with a theory about tags, sent the reader to the wrong place
  when the failure was a 400 on a contact the canary had left behind itself.
*/
export async function alarmCouldNotRun(reason: string, detail: string) {
  await post([
    ":warning: *The daily canary could not run*",
    "",
    `*${reason}*`,
    detail,
    "",
    "Today's email check did not happen. This says nothing yet about real applications, which have their own recovery.",
    "https://authorityengine.com.au/health",
  ]);
  console.error("CANARY COULD NOT RUN:", reason, detail);
}

export async function findCanaries(token: string, locationId: string): Promise<string[] | null> {
  const res = await fetch(
    `${GHL_API}/contacts/?locationId=${encodeURIComponent(locationId)}&query=${encodeURIComponent(CANARY_EMAIL)}`,
    { headers: ghlHeaders(token) }
  );
  if (!res.ok) return null;
  return ((await res.json())?.contacts || [])
    .filter((c: any) => (c?.email || "").toLowerCase() === CANARY_EMAIL)
    .map((c: any) => c.id);
}

/*
  Confirm the record is ours before destroying it. A canary must not be able to
  delete a real contact even if the id it is holding turns out not to be the one
  it created.
*/
export async function deleteCanary(token: string, contactId: string): Promise<boolean> {
  const url = `${GHL_API}/contacts/${encodeURIComponent(contactId)}`;
  const check = await fetch(url, { headers: ghlHeaders(token) }).catch(() => null);
  const owner = ((await check?.json().catch(() => ({})))?.contact?.email || "").toLowerCase();
  if (owner !== CANARY_EMAIL) return false;

  const res = await fetch(url, { method: "DELETE", headers: ghlHeaders(token) }).catch(() => null);
  return Boolean(res?.ok);
}
