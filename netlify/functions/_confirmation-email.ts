/*
  The applicant's confirmation email, sent directly by this code.

  It used to be left to an automation that fires when a tag is added. That has
  one fatal property: adding a tag someone already carries is a no-op, so a
  second application sends nothing. Somebody who applied, waited six weeks and
  applied again got silence, and no part of the system considered that an error.

  Tag automations are the right tool for a nurture sequence, where entering once
  is the point. They are the wrong tool for a receipt, where the rule is simply:
  an application happened, so an email goes out. Every time, no history, no
  conditions, no settings on another screen that can quietly be off.

  So it sends through the GHL Conversations API against the contact, which uses
  the same authenticated sending domain the rest of the mail goes out on, and
  reports what happened so a failure is visible instead of assumed.
*/

const GHL_API = "https://services.leadconnectorhq.com";

/* Sean's words. Edit the copy here, not in a workflow, so what applicants
   receive lives with the code that sends it and can be reviewed in a diff. */
const SUBJECT = "Application received";

const BODY_LINES = [
  "There's 10,000 ways to get leads, but only one to own your category.",
  "",
  "Stoked to see you here,",
  "",
  "I read each of these myself within 48 hours.",
  "",
  "Each month our spots are limited due to an unwillingness to compromise on standards and consistently increasing demand.",
  "",
  "It's worth knowing what I'm hunting for in your application,",
  "",
  "First and most importantly -",
  "",
  "Do you have someone in media to own your Authority Engine.",
  "",
  "Day one builds it.",
  "",
  "Day ninety has it installed.",
  "",
  "- Somebody needs to own that process.",
  "",
  "Second thing I look for is the problem you want solved.",
  "",
  "- You've got 10,099 ways to 'get leads' or to 'win at socials'",
  "",
  "There's only one way to own your category.",
  "",
  "If spots are filled for next month, you will need to lock in your date ASAP.",
  "",
  "This is not 'smart marketing'",
  "It's how we maintain product quality so the product continues to sell itself month on month.",
  "",
  "I read every application myself.",
  "You'll hear inside 48 hours.",
  "",
  "If you're in,",
  "You'll get an invitation with the details and a link.",
  "",
  "If not,",
  "I'll tell you why and what to work on next.",
  "",
  "Good luck",
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildHtml(): string {
  const paragraphs = BODY_LINES.map((line) =>
    line === ""
      ? ""
      : `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#1a1a1a;">${escapeHtml(line)}</p>`
  ).join("");
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;">${paragraphs}</div>`;
}

/*
  Returns a short outcome string for the Slack alert. Never throws: a failure to
  email must not fail the application, because the applicant has already done
  their part and losing the record would be the worse outcome. It has to be
  loud, not fatal.
*/
export async function sendConfirmationEmail(
  token: string,
  contactId: string
): Promise<string> {
  try {
    const res = await fetch(`${GHL_API}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-04-15",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "Email",
        contactId,
        subject: SUBJECT,
        html: buildHtml(),
        message: BODY_LINES.join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Confirmation email failed:", res.status, detail);
      return `FAILED: GHL returned ${res.status}`;
    }
    return "sent";
  } catch (err) {
    console.error("Confirmation email failed:", err);
    return "FAILED: could not reach GHL";
  }
}
