import { addTags, contactUrl, findOrCreateByEmail } from "./_ghl";

/*
  Everything that happens after somebody buys the founding 90 Day at /founding.

  Called from two places, so it has to be safe to call twice:
    - founding-checkout, when Stripe sends the buyer back to the thank you page
    - founding-sweep, every 10 minutes, for anyone who paid and closed the tab

  What it does, once per sale:
    1. Finds or creates the buyer in GoHighLevel by email, tagged
       `founding-paid`. Emails and follow ups hang off that tag as GHL
       workflows, never from code (Sean's rule: code tags, GHL sends).
    2. Posts the sale to Slack with name, email, phone and the GHL link.
    3. Writes `alerted=1` onto the Stripe session, which is what makes the second
       call a no-op.
*/

export const PAYMENT_KIND = "founding-90";
export const PAID_TAG = "founding-paid";

export function stripeKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
}

export async function stripe(path: string, init: { method?: string; form?: URLSearchParams } = {}) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: init.method || "GET",
    headers: {
      Authorization: `Bearer ${stripeKey()}`,
      ...(init.form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init.form ? init.form.toString() : undefined,
  });
  return { ok: res.ok, status: res.status, data: await res.json() };
}

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
    /* An alert that fails must not stop the rest. */
  }
}

/* Returns true when this call did the work, false when it was already done or
   the session is not a paid founding sale. */
export async function handleFoundingSale(session: any, via: "thank-you page" | "sweep"): Promise<boolean> {
  if (session?.metadata?.payment !== PAYMENT_KIND) return false;
  if (session?.payment_status !== "paid") return false;
  if (session?.metadata?.alerted === "1") return false;

  const d = session.customer_details || {};
  const [firstName, ...rest] = String(d.name || "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  let contactId: string | null = null;
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (token && location && d.email) {
    contactId = await findOrCreateByEmail(token, location, d.email, {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      tags: [PAID_TAG],
    });
    /* findOrCreateByEmail only tags on the paths it controls. Belt and braces. */
    if (contactId) await addTags(token, contactId, [PAID_TAG]);
  }

  const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: (session.currency || "aud").toUpperCase(),
  });

  await slack(
    [
      `:moneybag: *${d.name || d.email || "Somebody"} just bought the founding 90 Day (intro offer, paid in full).*`,
      `${amount} received. Picked up by the ${via}.`,
      `Email: ${d.email || "not given"}   Phone: ${d.phone || "not given"}`,
      contactId
        ? `Tagged \`${PAID_TAG}\` in GoHighLevel. <${contactUrl(contactId)}|Open them>`
        : `:warning: Could not create or tag them in GoHighLevel. Add them by hand with the \`${PAID_TAG}\` tag.`,
      `Now: set up their WhatsApp, give them the SOPs, playbooks, training videos and early office hours, and lock in their Brand Day date.`,
    ].join("\n")
  );

  await stripe(`checkout/sessions/${session.id}`, {
    method: "POST",
    form: new URLSearchParams({
      "metadata[alerted]": "1",
      ...(contactId ? { "metadata[ghl_contact_id]": contactId } : {}),
    }),
  });

  return true;
}
