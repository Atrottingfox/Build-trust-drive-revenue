import type { Handler } from "@netlify/functions";
import { reconcile, getContact, sendEmail } from "./_ghl";
import { isTestContact, priceCents } from "./_pricing";

/* One place to shout from. A paid client who did not get their booking link is
   the exact failure this file exists to prevent, so it must not be silent. */
async function slackAlert(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* Never let alerting break a payment path. */
  }
}

/*
  Asks Stripe whether a checkout session was actually paid, then tags GHL.

  Why this exists: /lock-in unlocks the calendar on `?paid=1`, which is a query
  string anyone can type. On the buy button path there is nothing better
  available, because the browser gets no proof. Embedded checkout returns a
  session id, and a session id can be checked against Stripe.

  So when a session id is present, the truth comes from Stripe rather than the
  URL, and the GHL tagging happens here on the server rather than in the
  browser. That is the difference between "the page thinks they paid" and "they
  paid".

  Falls back gracefully. No secret key means no verification is possible, and
  the page keeps its existing behaviour instead of locking a paying customer
  out.
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
  Raises the day 30 instalment as an invoice against the saved card. Any failure
  here is logged loudly rather than thrown: the first payment has already
  succeeded and must not be undone by a problem scheduling the second.
*/
async function scheduleSecondInstalment(
  stripeKey: string,
  customerId: string,
  contactId: string | null,
  sessionId: string
): Promise<void> {
  /* The last step of the journey. A test contact is charged a dollar here too,
     otherwise the rehearsal ends with a real $5,000 invoice scheduled against
     a real card. */
  const isTest = await isTestContact(contactId);
  const amount = isTest
    ? String(priceCents("INSTALL_PAYMENT_2_CENTS", true))
    : process.env.INSTALL_PAYMENT_2_CENTS;
  const days = Number(process.env.INSTALL_PAYMENT_2_DAYS) || 30;
  if (!amount) {
    console.error("INSTALL_PAYMENT_2_CENTS not set, second instalment NOT scheduled for", customerId);
    return;
  }

  const auth = { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" };

  /*
    This function raises a real $5,000 invoice, and the page that calls it is a
    Stripe return URL. Return URLs get refreshed, opened twice, and restored by
    browsers reopening tabs, so "called once" is not something to rely on.

    That protection used to be idempotency keys built from the session id. It
    was the wrong instrument: Stripe caches the response for a key whether the
    call succeeded or failed, so a single failure made every future attempt
    replay that failure, and a replayed key returns an object that may since
    have been deleted. Both happened here.

    The guard is on the data instead, below.
  */

  try {
    const dueDate = Math.floor(Date.now() / 1000) + days * 86400;

    /*
      Guard on the data, not only on the idempotency key.

      Stripe caches the response for a key whether the call succeeded or
      failed, so once this call errored for a given session, every retry
      replayed that same error forever. The invoice bug above meant that had
      happened for real: the key was poisoned and no amount of correct code
      could raise that client's instalment afterwards.

      So before creating anything, ask Stripe whether this session already has
      an instalment. That makes a repeat safe on its own terms and leaves a
      failure recoverable simply by running again.
    */
    const existing = await fetch(
      `https://api.stripe.com/v1/invoices?customer=${encodeURIComponent(customerId)}&limit=50`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );
    if (existing.ok) {
      const already = ((await existing.json())?.data || []).find(
        (i: any) => i?.metadata?.install_2_session === sessionId && i?.status !== "void"
      );
      if (already) {
        console.log("Second instalment already exists for session", sessionId, ":", already.id);
        return;
      }
    }

    // The line item has to exist before the invoice that collects it.
    const itemRes = await fetch("https://api.stripe.com/v1/invoiceitems", {
      method: "POST",
      /* No key here either, for the same reason as the invoice below, and one
         more: a replayed key returns the original item even after that item has
         been deleted, which produces an invoice with nothing on it. The guard
         above is what prevents a duplicate. */
      headers: auth,
      body: new URLSearchParams({
        customer: customerId,
        amount: String(amount),
        currency: "aud",
        description: "90 Day Authority Engine Install, second instalment",
      }).toString(),
    });
    if (!itemRes.ok) {
      console.error("Failed to create invoice item:", await itemRes.text(), customerId);
      return;
    }

    const invRes = await fetch("https://api.stripe.com/v1/invoices", {
      method: "POST",
      /* No idempotency key on this one. The check above already makes a repeat
         safe, and a key here would cache a failure and make it permanent. */
      headers: auth,
      /*
        due_date is not allowed here and never was. Stripe refuses it outright
        with "You can only specify 'due_date' or 'days_until_due' if invoice
        collection method is 'send_invoice'", so every attempt to raise a
        second instalment failed at this call, leaving the invoice item created
        and orphaned with invoice=None. Silently: the error was logged and the
        caller carried on, so the page said paid and nobody found out.

        automatically_finalizes_at is the right instrument. The invoice is
        created as a draft now and Stripe finalises it on that date, which is
        what triggers the charge against the saved card. Nothing is collected
        before then, and the schedule lives in Stripe rather than in a cron
        here that could quietly stop running.
      */
      body: new URLSearchParams({
        customer: customerId,
        collection_method: "charge_automatically",
        auto_advance: "true",
        automatically_finalizes_at: String(dueDate),
        /*
          Without this the invoice is created empty. Stripe excludes pending
          invoice items by default, so the item raised a moment ago stays
          orphaned and the client gets a $0 invoice. Verified against the live
          API: the same call without it returns amount_due 0, and with it
          returns the instalment.
        */
        pending_invoice_items_behavior: "include",
        description: `Second instalment, charged ${days} days after signing`,
        /* The handle the guard above looks for. */
        "metadata[install_2_session]": sessionId,
        ...(contactId ? { "metadata[ghl_contact_id]": String(contactId) } : {}),
      }).toString(),
    });
    const invoice = await invRes.json();

    if (!invRes.ok) {
      console.error("Failed to create second instalment invoice:", JSON.stringify(invoice?.error || invoice), customerId);
      return;
    }

    /*
      Deliberately NOT finalised here. Finalising is what charges the card, and
      the whole point is that this one charges in thirty days rather than now.
      automatically_finalizes_at above hands that job to Stripe, so the invoice
      sits as a draft until then. Calling finalize at this moment would take
      the second $5,000 on the same day as the first.
    */

    console.log("Second instalment scheduled:", invoice.id, "customer:", customerId, "due in", days, "days");
  } catch (err) {
    console.error("Error scheduling second instalment for", customerId, err);
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;

  try {
    const { sessionId } = JSON.parse(event.body || "{}");

    if (!secret || !sessionId) {
      // Cannot verify. Say so plainly rather than guess either way.
      return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
    }

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${secret}` } }
    );
    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe session lookup failed:", res.status, JSON.stringify(session?.error || session));
      return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
    }

    if (session.payment_status !== "paid") {
      console.warn("Session presented but not paid:", sessionId, session.payment_status);
      return { statusCode: 200, headers, body: JSON.stringify({ verified: true, paid: false }) };
    }

    /*
      Stripe holds the contact id, put there when the session was created, so the
      browser is not trusted for this either. Tag from here.
    */
    const contactId = session.client_reference_id;
    const token = process.env.GHL_TOKEN;
    let tagged = false;

    if (contactId && token) {
      const tagRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tags:
            session.metadata?.payment === "install-1"
              ? ["step-2-paid", "install-payment-1-paid"]
              : ["brand-day-paid"],
        }),
      });
      tagged = tagRes.ok;
      if (!tagRes.ok) {
        const failText = await tagRes.text();
        console.error("GHL tag failed after verified payment:", tagRes.status, failText, contactId);

        /*
          Money has cleared and it cannot be attached to anybody.

          This happens when the contact has been deleted or merged since the
          link was sent: Stripe still carries the old id, the tag write fails,
          and every single thing downstream quietly does not happen. No
          confirmation email, no calendar, no prep call, no place in the
          pipeline. The client has paid and the business has no record of it.

          It happened, and the only reason anyone noticed was Sean wondering
          why a prep call had not appeared. A payment that cannot be attributed
          is the loudest thing this system can have to say.
        */
        const webhook = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
        if (webhook) {
          await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: [
                ":rotating_light: *PAYMENT RECEIVED THAT WE CANNOT ATTRIBUTE*",
                "",
                `Stripe took the money. GoHighLevel refused the tag (HTTP ${tagRes.status}).`,
                `Contact id: \`${contactId}\` — most likely deleted or merged.`,
                `Stripe session: \`${sessionId}\``,
                "",
                "Nothing downstream has fired: no confirmation, no calendar, no prep call.",
                "Find them in Stripe, recreate or locate the contact, and tag `brand-day-paid` by hand.",
              ].join("\n"),
            }),
          }).catch(() => {
            /* Already in the logs. */
          });
        }
      }

      /*
        Write the Stripe customer onto the contact. This is what makes the
        90 Day Install a decision rather than a transaction: the card is already
        saved off session, and this is the thread from the person in GHL to the
        customer in Stripe who holds it. Without it, matching them up later
        means searching Stripe by email and hoping.
      */
      const customerField = process.env.GHL_FIELD_STRIPE_CUSTOMER;
      const intentField = process.env.GHL_FIELD_STRIPE_PAYMENT_INTENT;
      const slugField = process.env.GHL_FIELD_CLIENT_SLUG;
      const prepField = process.env.GHL_FIELD_PREP_DOC_URL;
      const customFields: Array<{ id: string; value: string }> = [];

      /*
        The client workspace on brand.contentengine.live is created by its own
        Stripe webhook, off the same session, so it never reports back here.
        Rather than have GHL ask a second system where someone's prep doc lives,
        the slug is written from the session metadata that created it and the
        URL derived from it.

        That is what lets a GHL email say "here is your prep doc" with a merge
        field, instead of an operator looking it up by hand.
      */
      const slug = session.metadata?.client_slug;
      if (slug) {
        if (slugField) customFields.push({ id: slugField, value: String(slug) });
        if (prepField) {
          customFields.push({
            id: prepField,
            value: `https://brand.contentengine.live/workbooks/prep?client=${encodeURIComponent(String(slug))}`,
          });
        }
      } else {
        console.warn("Paid session with no client_slug metadata, no prep doc recorded:", sessionId);
      }
      /*
        The invoice link, onto the contact.

        Stripe emails its own invoice, but that arrives as a Stripe email in
        Stripe's wording. Putting the link on the contact means Sean's own
        confirmation can carry it, in his voice, and his bookkeeper has a URL
        rather than a hunt through the dashboard.

        Reading the invoice needs "Invoices Read" on the restricted key. Without
        it this logs and moves on: a missing link is a small problem, and it
        must never hold up a payment that has already cleared.
      */
      const invoiceField = process.env.GHL_FIELD_INVOICE_URL;
      if (invoiceField && session.invoice) {
        try {
          const invRes = await fetch(
            `https://api.stripe.com/v1/invoices/${encodeURIComponent(String(session.invoice))}`,
            { headers: { Authorization: `Bearer ${secret}` } }
          );
          if (invRes.ok) {
            const inv = await invRes.json();
            if (inv?.hosted_invoice_url) {
              customFields.push({ id: invoiceField, value: String(inv.hosted_invoice_url) });
            }
          } else {
            console.error(
              "Could not read the invoice to record its link:",
              invRes.status,
              "add Invoices Read to the Stripe key"
            );
          }
        } catch (err) {
          console.error("Invoice lookup failed:", err);
        }
      }

      if (customerField && session.customer) {
        customFields.push({ id: customerField, value: String(session.customer) });
      }
      if (intentField && session.payment_intent) {
        customFields.push({ id: intentField, value: String(session.payment_intent) });
      }

      await reconcile(token, contactId);

      /*
        The 90 Day Install is one commitment paid in two instalments, and
        signing agrees to both. So the second is raised as a Stripe invoice due
        in 30 days, set to charge the saved card automatically.

        Stripe owns the schedule rather than a GHL workflow firing a charge.
        That matters: a workflow can be left unpublished, a tag can fail to
        land, and the money then silently never arrives. Stripe also handles
        retries and dunning, which nothing here would.
      */
      if (session.metadata?.payment === "install-1" && session.customer) {
        await scheduleSecondInstalment(secret, String(session.customer), contactId, sessionId);

        /*
          The email that has to arrive at this exact moment.

          They have just paid and the page tells them to lock their slot, but a
          page is closed and forgotten. The booking link has to be somewhere
          they can find it tomorrow, which means their inbox.

          Sent from here rather than hung off a tag, because the tag route has
          already failed twice: a published workflow with a satisfied trigger
          sent nothing, and a draft one cannot send at all. This runs at the
          moment the money is confirmed, and if it cannot send it says so.
        */
        if (token) {
          const contact = await getContact(token, contactId);
          const first = contact?.firstName || "there";
          const slot = `https://authorityengine.com.au/slot?c=${encodeURIComponent(contactId)}`;

          const { sent, reason } = await sendEmail(
            token,
            contactId,
            "Payment received. One thing left.",
            [
              `<p>${first},</p>`,
              `<p>Payment received. That is the first of two, and the second is invoiced to the same card in 30 days. Nothing after that.</p>`,
              `<p>One thing left, and it takes a minute.</p>`,
              `<p><a href="${slot}">Lock your weekly hour</a></p>`,
              `<p>Two choices on that page. Your weekly call, and your board call every four weeks. Both hours are then yours for the whole build, and every session goes straight into your calendar. You will not get a booking link again.</p>`,
              `<p>One call a week for the first four weeks, then fortnightly, then one in month three. Your board call runs every four weeks, for as long as we work together.</p>`,
              `<p>It also asks for your media operator's name and email, because they are the one on every weekly call, not you. If you haven't hired yet, leave it blank and come back to the same link once you have.</p>`,
              `<p>Sean</p>`,
            ].join("")
          );

          if (!sent) {
            await slackAlert(
              [
                `:warning: *${first} paid and did not get their booking email.*`,
                `Reason: ${reason}.`,
                `They have no link to lock their calls. Send them ${slot} by hand.`,
              ].join("\n")
            );
          }
        }
      }

      if (customFields.length) {
        const fieldRes = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: GHL_VERSION,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ customFields }),
        });
        if (!fieldRes.ok) {
          console.error("Failed to record Stripe customer on contact:", fieldRes.status, await fieldRes.text(), contactId);
        }
      }
    } else if (!contactId) {
      console.error("Verified payment with no client_reference_id. Reconcile by hand:", sessionId);
    }

    /*
      A confirmed payment that could not be attached to anyone is the worst
      failure this system has: money in, and nothing in the CRM to act on. It
      happens if the contact was deleted or merged between checkout starting and
      finishing, and it happened once in testing.

      Never let it pass quietly. Put it in Slack with everything needed to fix it
      by hand.
    */
    /*
      `customFields` used to be part of this check. It is declared inside the
      `if (contactId && token)` block above, so reading it here threw a
      ReferenceError every single time, which the catch turned into
      `verified: false`.

      The work had already happened: the tag landed, the fields were written,
      the payment was real. The function just reported failure on its way out,
      so every payment looked unverified while being perfectly fine. That is
      worse than an outage, because it hides one.

      The condition was meaningless anyway. `length >= 0` is true of every array
      that exists. What actually matters is whether the payment reached a
      contact and the tag stuck.
    */
    const attached = Boolean(contactId) && tagged;
    if (!attached) {
      const slack = process.env.SLACK_WEBHOOK_MONEY || process.env.SLACK_WEBHOOK_URL;
      if (slack) {
        const amount = ((session.amount_total || 0) / 100).toFixed(2);
        await fetch(slack, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: [
              "*Payment received that could not be linked to a contact*",
              `*Amount:* ${amount} ${String(session.currency || "").toUpperCase()}`,
              `*Email:* ${session.customer_details?.email || "unknown"}`,
              `*Stripe customer:* ${session.customer || "none"}`,
              `*Session:* ${sessionId}`,
              contactId
                ? `*Contact id on the payment:* ${contactId} (tagging it failed, it may have been deleted)`
                : "*No contact id on the payment.*",
              "",
              "They have paid. Find or recreate them in GHL and tag brand-day-paid by hand.",
            ].join("\n"),
          }),
        }).catch(() => {
          // Nothing further to do. It is already in the function logs.
        });
      }
      console.error("Payment could not be linked to a GHL contact:", sessionId, contactId || "(none)");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ verified: true, paid: true, contactId: contactId || null }),
    };
  } catch (err) {
    // Never block. They may well have paid.
    console.error("verify-payment error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ verified: false }) };
  }
};

export { handler };
