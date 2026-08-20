import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, addTags } from "./_ghl";

/*
  Approve or decline an application from the notification email.

  Sean reads applications on his phone. Before this, acting on one meant opening
  GHL, searching the contact, finding the tags box and typing. That friction is
  why applications sit for days, and a gate nobody has time to operate is worse
  than no gate.

  Now the email carries three links. Tap one, confirm, done.

  Why a confirmation page rather than a single tap:
  Gmail, Outlook and every corporate scanner fetch the links in an email before
  a human sees it. A GET that changes state would fire on its own, so every
  applicant would arrive pre-invited by a robot. The link therefore only RENDERS
  a page, and the tag is applied by the POST that page's button makes. Scanners
  do not submit forms.

  Security is a shared secret in the URL. The link lives in one inbox and the
  worst case is a mis-tagged contact, not money moving, so this is proportionate.
  Without DECIDE_SECRET set the endpoint refuses everything.
*/

const ACTIONS: Record<string, { tag: string; label: string; done: string }> = {
  invite: {
    tag: "invited",
    label: "Invite",
    done: "Invited. Send them the invitation with their link.",
  },
  decline: {
    tag: "declined",
    label: "Decline",
    done: "Declined. Send them the decline email with the reason that applies.",
  },
  concierge: {
    tag: "concierge",
    label: "Send to Concierge",
    done: "Marked concierge. This is the one worth a conversation rather than an email.",
  },
  /*
    The day after a Brand Day, from the Slack nudge. Tagging `install-invited`
    is what fires the 90 Day Install Invite workflow, so this one button both
    records the decision and sends the invitation.

    Deliberately not automatic. Whether someone is right for the 90 days is a
    judgement made in the room, and an invitation that arrives without it is
    just billing on autopilot.
  */
  "install-invite": {
    tag: "install-invited",
    label: "Send the 90 Day link",
    done: "Invited. The 90 Day Install email is on its way to them.",
  },
};

const page = (title: string, body: string, tone: "ask" | "ok" | "bad") => `<!doctype html>
<html><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A0B0D;color:#EAECEF;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
  .card{max-width:420px;width:100%;background:#121419;border:1px solid #242830;border-radius:16px;padding:32px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 12px;color:${tone === "bad" ? "#F0616D" : tone === "ok" ? "#34D399" : "#EAECEF"}}
  p{margin:0 0 20px;color:#A4AAB4;font-size:15px}
  b{color:#EAECEF}
  button{width:100%;padding:14px;border-radius:999px;border:0;background:#EAECEF;color:#0A0B0D;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{background:#fff}
  .sub{font-size:13px;color:#6E757F;margin:16px 0 0;text-align:center}
</style></head><body><div class="card">${body}</div></body></html>`;

const handler: Handler = async (event) => {
  const secret = process.env.DECIDE_SECRET;
  const token = process.env.GHL_TOKEN;

  const html = (b: string, code = 200) => ({
    statusCode: code,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    body: b,
  });

  if (!secret || !token) {
    console.error("decide: DECIDE_SECRET or GHL_TOKEN not set.");
    return html(page("Not configured", "<h1>Not set up yet</h1><p>This link needs configuring before it works.</p>", "bad"), 200);
  }

  const q = event.queryStringParameters || {};
  const contactId = q.c || "";
  const action = ACTIONS[q.do || ""];

  if (q.k !== secret) {
    console.error("decide: bad or missing secret for contact", contactId);
    return html(page("Not allowed", "<h1>Link not valid</h1><p>This link is missing its code, or it has been changed.</p>", "bad"), 403);
  }
  if (!contactId || !action) {
    return html(page("Not valid", "<h1>Link not valid</h1><p>Missing the contact or the action.</p>", "bad"), 400);
  }

  // Read the contact so the confirmation names a person rather than an id.
  let who = "this applicant";
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
    });
    if (res.ok) {
      const c = (await res.json())?.contact;
      who = [c?.firstName, c?.lastName].filter(Boolean).join(" ") || c?.email || who;
    }
  } catch {
    // Naming them is a nicety. The action still works without it.
  }

  /*
    GET only asks. This is what makes an email scanner harmless: it renders a
    question and changes nothing.
  */
  if (event.httpMethod !== "POST") {
    return html(
      page(
        `${action.label}?`,
        `<h1>${action.label} ${who}?</h1>
         <p>This applies the <b>${action.tag}</b> tag in GoHighLevel. Nothing is emailed to them.</p>
         <form method="POST"><button type="submit">${action.label}</button></form>
         <p class="sub">Close this tab to do nothing.</p>`,
        "ask"
      )
    );
  }

  const ok = await addTags(token, contactId, [action.tag]);
  console.log("decide:", action.tag, contactId, ok ? "applied" : "FAILED");

  return html(
    ok
      ? page("Done", `<h1>${action.label}d</h1><p>${action.done}</p><p class="sub">${who}</p>`, "ok")
      : page("Failed", `<h1>Did not save</h1><p>GoHighLevel refused the tag. Open the contact and add <b>${action.tag}</b> by hand.</p>`, "bad")
  );
};

export { handler };
