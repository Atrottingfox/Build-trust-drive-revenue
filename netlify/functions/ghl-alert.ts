import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Slack alert for a GHL workflow, built to be acted on rather than read.

  The point of these alerts is a phone call: someone was invited and went quiet,
  or is holding a day they have not paid for. So the message leads with the
  number to ring and what stage they reached, not a tidy summary.

  Call it from a GHL workflow's Custom Webhook action:

    POST https://authorityengine.com.au/.netlify/functions/ghl-alert
    header  x-alert-secret: <GHL_WEBHOOK_SECRET>
    body    { "contactId": "{{contact.id}}", "reason": "invited-lapsed" }

  `reason` picks the wording. Anything unrecognised still sends, with the raw
  reason, because a slightly odd alert beats a missing one.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-alert-secret",
  "Content-Type": "application/json",
};

const REASONS: Record<string, { title: string; line: string }> = {
  "invited-lapsed": {
    title: "Invited, went quiet",
    line: "Sent the lock-in link and nothing happened. Worth a call while it is still warm.",
  },
  "booked-no-payment": {
    title: "Holding a day, has not paid",
    line: "A date is held in your calendar with no money against it.",
  },
  "paid-no-date": {
    title: "Paid, no date chosen",
    line: "Money is in and they have no Brand Day. Sort this today.",
  },
  "install-payment-failed": {
    title: "Install charge declined",
    line: "The saved card refused an off-session charge. Usually means it wants the holder present.",
  },
};

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.GHL_WEBHOOK_SECRET;
  const slack = process.env.SLACK_WEBHOOK_URL;
  const token = process.env.GHL_TOKEN;

  if (!secret || !slack || !token) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sent: false,
        configured: false,
        missing: [!secret && "GHL_WEBHOOK_SECRET", !slack && "SLACK_WEBHOOK_URL", !token && "GHL_TOKEN"].filter(Boolean),
      }),
    };
  }

  const supplied = event.headers["x-alert-secret"] || event.headers["X-Alert-Secret"] || "";
  if (supplied !== secret) {
    console.error("ghl-alert called with a bad or missing secret.");
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorised" }) };
  }

  try {
    const { contactId, reason } = JSON.parse(event.body || "{}");
    if (!contactId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "contactId required" }) };
    }

    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
    });
    const c = (await res.json())?.contact;
    if (!c) {
      console.error("ghl-alert could not read contact:", contactId);
      return { statusCode: 200, headers, body: JSON.stringify({ sent: false, reason: "contact-not-found" }) };
    }

    const meta = REASONS[reason] || {
      title: String(reason || "Needs attention"),
      line: "Triggered from a GHL workflow.",
    };

    const name = [c.firstName, c.lastName].filter(Boolean).join(" ") || "(no name)";
    const lines = [
      `*${meta.title}: ${name}*`,
      meta.line,
      "",
      `*Call:* ${c.phone || "no number on file"}`,
      `*Email:* ${c.email || "-"}`,
      c.companyName ? `*Company:* ${c.companyName}` : null,
      `*Tags:* ${(c.tags || []).join(", ") || "none"}`,
      `<https://app.gohighlevel.com/v2/location/${process.env.GHL_LOCATION_ID}/contacts/detail/${contactId}|Open in GHL>`,
    ].filter(Boolean);

    const slackRes = await fetch(slack, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });

    if (!slackRes.ok) {
      console.error("Slack alert failed:", slackRes.status, await slackRes.text());
      return { statusCode: 200, headers, body: JSON.stringify({ sent: false }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ sent: true }) };
  } catch (err) {
    console.error("ghl-alert error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ sent: false, reason: "error" }) };
  }
};

export { handler };
