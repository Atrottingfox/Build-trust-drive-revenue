/*
  Transactional email, via Resend's REST API.

  Nothing in this repo could send an email before this file. Applications went
  to Notion, Slack, Kit and GHL, and the applicant heard nothing until Sean
  wrote to them by hand. The thank you screen promises a reply within 48 hours
  and had no machine behind it.

  This exists instead of a GoHighLevel workflow on purpose. The GHL route needs
  eleven steps in a UI, an audit of a workflow its own AI built against fields
  that did not exist yet, merge fields that render blank without saying so, and
  a Publish toggle that silently does nothing if you miss it. None of it can be
  tested from here. This can.

  Raw fetch rather than the SDK, matching how Stripe, GHL and Kit are already
  called here.

  Two rules this module never breaks:

  1. It ships disabled. No RESEND_API_KEY means no send and a log line. It never
     throws, so a missing key cannot take down an application.
  2. Email never fails an application. Every send is caught and logged. A
     bounced confirmation is annoying. A lost application is money.

  Env:
    RESEND_API_KEY   from resend.com
    EMAIL_FROM       verified sender, e.g. "Sean Fox <sean@authorityengine.com.au>"
    EMAIL_ALERT_TO   where Sean's own copy of each application lands
*/

const RESEND_API = "https://api.resend.com/emails";

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, text, replyTo }: SendArgs): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!key || !from) {
    console.warn(
      "sendEmail skipped, not configured. Missing:",
      [!key && "RESEND_API_KEY", !from && "EMAIL_FROM"].filter(Boolean).join(", ")
    );
    return false;
  }
  if (!to) return false;

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error("Resend send failed:", res.status, await res.text(), to);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send error:", err, to);
    return false;
  }
}

/*
  Sean's application received email, from docs/invite-gate-emails.md.

  Plain text on purpose. The first line is "I read these myself", and a designed
  template with a logo and a button contradicts that before they finish reading
  it. The format is part of the claim.

  Carries NO link. Applying and being accepted are two different events, and the
  date and payment page only arrives once Sean has actually read the thing.
*/
export function applicationReceivedEmail(fullName: string): { subject: string; text: string } {
  const firstName = (fullName || "").trim().split(/\s+/)[0] || "there";

  return {
    subject: "Your Brand Builder Day application",
    text: `${firstName},

It's in. I read these myself, usually inside 48 hours.

Worth knowing what I'm actually reading for, because it isn't what most people assume.

Revenue isn't the first thing I look at. The operator question is, whether there's someone who can own content ops after the day. That one decides most of them. The day builds a machine, and a machine with nobody at the controls is just an expensive document.

The second thing is what you wrote in your own words about the one thing you want to fix. The applications that get in almost always have something specific and slightly uncomfortable in that box. The ones that don't tend to say "more leads".

Five spots. If yours is one of them you'll get an invitation with the details and a link. If it isn't, I'll tell you why rather than going quiet on you.

Sean`,
  };
}

/*
  Sean's own copy, so an application reaches him away from a laptop.

  Slack is the queue and Notion is the record. This one he can reply to
  directly: reply_to is the applicant, so hitting reply starts the conversation
  rather than emailing himself.

  The accept link is the reason this is useful rather than duplicative.
  Accepting someone from a phone becomes a copy and a send.
*/
export function applicationAlertEmail(
  name: string,
  fields: Array<[string, string | null | undefined]>,
  acceptUrl: string | null
): { subject: string; text: string } {
  const lines = fields
    .filter(([, v]) => v && String(v).trim())
    .map(([label, v]) => `${label}: ${v}`)
    .join("\n");

  const accept = acceptUrl
    ? `Accept and send this link:\n${acceptUrl}`
    : "No GHL contact id on this one, so no accept link. The contact needs finding or creating by hand before it can be accepted.";

  return {
    subject: `Brand Builder Day application: ${name || "no name given"}`,
    text: `${lines}

${accept}

Full application is in Notion and Slack.`,
  };
}
