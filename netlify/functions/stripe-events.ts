import type { Handler } from "@netlify/functions";
import { createHmac, timingSafeEqual } from "node:crypto";
import { GHL_API, GHL_VERSION, getContact, addTags, contactUrl } from "./_ghl";

/*
  What Stripe tells us when no browser is involved.

  Until this existed, authority-site only learned about money when a client's
  browser came back to /install and triggered verify-payment. That covers the
  first payment, because somebody is sitting there watching it happen.

  It does not cover the second. That invoice is finalised by Stripe on day 30
  and charged against the saved card at whatever hour Stripe gets to it, with
  nobody present. An expired card, insufficient funds, or a bank wanting 3DS on
  a five figure charge all end the same way: Stripe retries a few times, gives
  up, and the money never arrives. The first anyone would know is noticing it
  had not.

  Three events, and each answers a question that was previously unanswerable:

    invoice.paid              the second $5,000 landed
    invoice.payment_failed    it did not, and here is why
    checkout.session.completed a first payment happened even though the
                              browser never came back to tell us

  That last one is a safety net rather than the main path. verify-payment stays
  the primary route because it runs while the client is present and can put the
  booking link in front of them. This catches the case where they paid and
  closed the tab.

  Setup: Stripe Dashboard > Developers > Webhooks > add endpoint
    https://authorityengine.com.au/.netlify/functions/stripe-events
  subscribe those three events, then put the signing secret in
  STRIPE_EVENTS_SECRET.
*/

const TAG_SECOND_PAID = "install-payment-2-paid";
const TAG_SECOND_FAILED = "install-payment-failed";

const money = (cents: number, currency: string) =>
  (cents / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: (currency || "aud").toUpperCase(),
  });

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
    /* An alert that fails must not fail the handler. Stripe would retry the
       whole event, and a retry cannot un-charge a card. */
  }
}

/*
  Stripe signs every delivery. Without checking it, this endpoint would accept
  a forged "your client paid" from anybody who knew the URL, which is worse
  than not having it: it would tag people as paid who had not.

  Tolerance guards against replay. A captured request is only useful inside the
  window.
*/
function verifyStripe(payload: string, header: string | undefined, secret: string, toleranceSec = 300): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => p.split("=") as [string, string])
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - parseInt(t, 10)) > toleranceSec) return false;

  const expected = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* Best effort. The alert is the point, the tag is a convenience, and a GHL
   failure must not cost us the Slack message. */
async function tag(contactId: string, tags: string[]): Promise<void> {
  const token = process.env.GHL_TOKEN;
  if (!token || !contactId) return;
  try {
    await addTags(token, contactId, tags);
  } catch {
    /* Reported in the alert either way. */
  }
}

async function nameFor(contactId: string): Promise<string> {
  const token = process.env.GHL_TOKEN;
  if (!token || !contactId) return "";
  try {
    const c = await getContact(token, contactId);
    if (!c) return "";
    return [c.firstName, c.lastName].filter(Boolean).join(" ") || c.email || "";
  } catch {
    return "";
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "POST only" }) };
  }

  const secret = process.env.STRIPE_EVENTS_SECRET;
  if (!secret) {
    console.error("stripe-events: STRIPE_EVENTS_SECRET not set, refusing everything.");
    return { statusCode: 500, body: JSON.stringify({ error: "not configured" }) };
  }

  const raw = event.body || "";
  if (!verifyStripe(raw, event.headers["stripe-signature"], secret)) {
    console.error("stripe-events: bad signature.");
    return { statusCode: 400, body: JSON.stringify({ error: "invalid signature" }) };
  }

  let evt: any;
  try {
    evt = JSON.parse(raw);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "bad json" }) };
  }

  const obj = evt?.data?.object || {};
  const contactId = obj?.metadata?.ghl_contact_id || "";
  const who = (await nameFor(contactId)) || obj?.customer_email || contactId || "somebody we cannot name";
  const link = contactId ? `\n<${contactUrl(contactId)}|Open them in GoHighLevel>` : "";

  switch (evt.type) {
    /* The second instalment cleared. Quiet good news, but news. */
    case "invoice.paid": {
      const isSecond = String(obj?.description || "").toLowerCase().includes("second instalment");
      if (!isSecond) {
        return { statusCode: 200, body: JSON.stringify({ received: true, ignored: "not the second instalment" }) };
      }
      await tag(contactId, [TAG_SECOND_PAID]);
      await slack(
        [
          `:heavy_dollar_sign: *${who} paid the second instalment.*`,
          `${money(obj?.amount_paid ?? 0, obj?.currency)} cleared. The engagement is paid in full and nothing further is owed.${link}`,
        ].join("\n")
      );
      break;
    }

    /*
      The one this endpoint exists for. Stripe has already retried by the time
      it gives up, so this is not a blip: it is money that is not coming
      without somebody doing something.
    */
    case "invoice.payment_failed": {
      const attempts = obj?.attempt_count ?? 0;
      const nextAttempt = obj?.next_payment_attempt
        ? new Date(obj.next_payment_attempt * 1000).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
          })
        : null;

      await tag(contactId, [TAG_SECOND_FAILED]);
      await slack(
        [
          `:rotating_light: *${who}'s payment failed.*`,
          `${money(obj?.amount_due ?? 0, obj?.currency)} did not go through. Attempt ${attempts}.`,
          obj?.last_finalization_error?.message ? `Reason: ${obj.last_finalization_error.message}` : "",
          nextAttempt
            ? `Stripe will try again on ${nextAttempt}.`
            : `*Stripe has stopped retrying.* This money is not arriving unless somebody acts.`,
          obj?.hosted_invoice_url ? `<${obj.hosted_invoice_url}|The invoice they can pay>` : "",
          link,
        ]
          .filter(Boolean)
          .join("\n")
      );
      break;
    }

    /*
      A first payment we might otherwise never hear about. verify-payment runs
      in the client's browser, so closing the tab before it returns means the
      tag never lands and nothing downstream happens. This notices.
    */
    case "checkout.session.completed": {
      if (obj?.metadata?.payment !== "install-1") {
        return { statusCode: 200, body: JSON.stringify({ received: true, ignored: "not an install payment" }) };
      }
      const token = process.env.GHL_TOKEN;
      let alreadyHandled = false;
      if (token && contactId) {
        try {
          const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
            headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" },
          });
          if (res.ok) {
            const tags: string[] = (await res.json())?.contact?.tags || [];
            alreadyHandled = tags.includes("step-2-paid");
          }
        } catch {
          /* Assume not handled and say so. A duplicate alert is cheap. */
        }
      }

      if (alreadyHandled) {
        return { statusCode: 200, body: JSON.stringify({ received: true, alreadyHandled: true }) };
      }

      await slack(
        [
          `:warning: *${who} paid and the page never confirmed it.*`,
          `${money(obj?.amount_total ?? 0, obj?.currency)} received, but \`step-2-paid\` is not on their record, which means verify-payment did not finish.`,
          `They have no booking link and no second instalment raised. Re-run verify-payment against session \`${obj?.id}\`.${link}`,
        ].join("\n")
      );
      break;
    }

    default:
      return { statusCode: 200, body: JSON.stringify({ received: true, ignored: evt.type }) };
  }

  return { statusCode: 200, body: JSON.stringify({ received: true, type: evt.type }) };
};

export { handler };
