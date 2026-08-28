import type { Handler } from "@netlify/functions";
import { reconcile, getContact, contactUrl } from "./_ghl";

/*
  Tags the GHL contact `brand-day-paid` after Stripe succeeds.

  This is why the Brand Day needs no Stripe webhook. The lock-in page only
  reveals the calendar once checkout has succeeded, so the success redirect is a
  reliable "they paid" signal and we call GHL ourselves with a contact id we
  already hold. No payload mapping, no guessing at field paths, no matching on
  email address.

  The date is chosen before payment, so `paid-no-date` is no longer applied here.
  The gap that matters now runs the other way: booked without paying. That shows
  up as `brand-day-booked` with no `brand-day-paid`, which is a filter in GHL and
  the trigger for the chase workflow.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/*
  Tell Sean the money landed.

  Until this existed, a Brand Day payment tagged a contact and told nobody. The
  confirmation email goes to the client, so the one person who needed to know a
  five thousand dollar payment had cleared found out by checking Stripe, or by
  noticing later. Every other money event on this site shouts. This one did not.
*/
async function slack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* An alert that fails must never fail the payment path. They have paid. */
  }
}

const money = () => {
  const cents = Number(process.env.CHECKOUT_AMOUNT_CENTS) || 500000;
  return (cents / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
};

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { contactId } = JSON.parse(event.body || "{}");

    if (!contactId) {
      // No id means the invitation email was missing ?c=. Log loudly: the
      // payment still happened and now has to be reconciled by hand.
      console.error("lock-in-paid called with no contactId. Payment cannot be matched to a contact.");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    const token = process.env.GHL_TOKEN;
    if (!token) {
      console.error("GHL_TOKEN not set, cannot tag brand-day-paid.");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ tags: ["brand-day-paid"] }),
    });

    if (!res.ok) {
      console.error("GHL tag failed:", res.status, await res.text(), "contact:", contactId);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
    }

    await reconcile(token, contactId);

    /*
      Named rather than an id, because an alert nobody can read at a glance is
      an alert nobody reads. Best effort: a failed lookup still gets a message
      out, since knowing somebody paid matters more than knowing who.
    */
    let who = "";
    try {
      const c = await getContact(token, contactId);
      who = [c?.firstName, c?.lastName].filter(Boolean).join(" ").trim() || c?.email || "";
    } catch {
      /* Reported without a name. */
    }

    await slack(
      [
        `:moneybag: *${who || "Somebody"} paid for a Brand Day.*`,
        `${money()} cleared. They are on the calendar step now.`,
        `<${contactUrl(contactId)}|Open them in GoHighLevel>`,
      ].join("\n")
    );

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    // Never surface an error here. They have paid; the page must let them
    // continue to the calendar regardless.
    console.error("lock-in-paid error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, degraded: true }) };
  }
};

export { handler };
