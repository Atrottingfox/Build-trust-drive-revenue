import { addTags, contactUrl, findOrCreateByEmail, GHL_API, GHL_VERSION, sendEmail } from "./_ghl";
import { BRAND_DAY_BOOKING, OFFICE_HOURS, whatsappLine } from "./_calls";
import { provisionPortal } from "./_portal";

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
export const ABANDONED_TAG = "founding-abandoned";
export const WAITLIST_TAG = "founding-waitlist";

/* Intro offer for 5 founders starting January (Sean, 11 Nov 2026). */
export const TOTAL_SPOTS = 5;
/* Midnight at the end of 30 November, Brisbane (UTC+10, no daylight saving). */
export const CLOSES_AT = new Date("2026-12-01T00:00:00+10:00");

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

export async function slack(text: string): Promise<void> {
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
/* When a founding buyer starts (Sean, 2026-11-12: "it'll be 15th of the
   month ... 15th jan, 15th feb"). The 15th of the month after they buy, and
   never before the first cohort on 15 January 2027. Brisbane dates. */
export function cohortStart(paidMs: number): string {
  const d = new Date(paidMs + 10 * 3600_000);
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 15));
  const first = Date.UTC(2027, 0, 15);
  return new Date(Math.max(next.getTime(), first)).toISOString().slice(0, 10);
}
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00+10:00`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Brisbane" });

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

  /* Their portal, made now so a buyer who closed the tab still gets the 48
     hour reminder (portal-chase), and so the link is in Slack. */
  const start = cohortStart((session.created ? session.created * 1000 : Date.now()));
  const portal = await provisionPortal({ email: d.email, name: d.name }, { start });

  /* Sean, 2026-11-12: "the founding buyers next steps all implemented asap".
     One welcome email, sent from here like the install payment email (the tag
     route has failed before): the portal, the Brand Day booking and office
     hours, which is the one call they join before their Brand Day. */
  let welcomed = false;
  if (token && contactId) {
    const first = String(d.name || "").split(" ")[0] || "there";
    const brandDay = `${BRAND_DAY_BOOKING}?name=${encodeURIComponent(d.name || "")}&email=${encodeURIComponent(d.email || "")}&utm_content=${encodeURIComponent(contactId)}`;
    const { sent } = await sendEmail(token, contactId, "You're in. Here's what happens now.", [
      `<p>${first},</p>`,
      `<p>You're in. Your spot is locked in.</p>`,
      portal.claimUrl ? `<p>1. <a href="${portal.claimUrl}">Set up your portal</a>. Everything for the build lives there: the SOPs, playbooks, training and your calls.</p>` : `<p>1. Your portal is ready at <a href="https://contentengine.live/login">contentengine.live</a>. Everything for the build lives there.</p>`,
      `<p>2. <a href="${brandDay}">Lock in your Brand Day date</a>.</p>`,
      `<p>3. Advisory sessions run every ${OFFICE_HOURS.when}, Queensland time. Join any week with a question: <a href="${OFFICE_HOURS.zoom}">Zoom link</a>. Fill in the <a href="${OFFICE_HOURS.form}">advisory session form</a> before you come.</p>`,
      `<p>Your weekly calls and advisory board calls start after your Brand Day.</p>`,
      whatsappLine(portal.whatsappUrl),
      `<p>Sean</p>`,
    ].join(""));
    welcomed = sent;
  }

  await slack(
    [
      `:moneybag: *${d.name || d.email || "Somebody"} just bought the founding 90 Day (intro offer, paid in full).*`,
      `${amount} received. Picked up by the ${via}.`,
      `Starts: ${longDate(start)} (cohort start, the 15th).`,
      `Email: ${d.email || "not given"}   Phone: ${d.phone || "not given"}`,
      contactId
        ? `Tagged \`${PAID_TAG}\` in GoHighLevel. <${contactUrl(contactId)}|Open them>`
        : `:warning: Could not create or tag them in GoHighLevel. Add them by hand with the \`${PAID_TAG}\` tag.`,
      welcomed ? `Welcome email sent (portal, Brand Day booking, advisory sessions).` : `:warning: Welcome email NOT sent. Send them the portal and Brand Day links by hand.`,
      portal.claimUrl ? `Portal made: ${portal.claimUrl}` : portal.error ? `:warning: No portal made (${portal.error}). Invite them from contentengine.live/clients.` : `Portal: they already have an account.`,
      `Now: ${portal.whatsappUrl ? "their WhatsApp group link went in the welcome email (Slack says which group)." : "make their WhatsApp group and paste the invite link on their portal hub (Edit hub), which emails it to them."} Then give them the SOPs, playbooks, training videos and early office hours, and lock in their Brand Day date.`,
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

/* Paid spots so far, or null when Stripe will not say. */
export async function soldCount(): Promise<number | null> {
  try {
    const q = encodeURIComponent(`status:'succeeded' AND metadata['payment']:'${PAYMENT_KIND}'`);
    const r = await stripe(`payment_intents/search?query=${q}&limit=100`);
    if (!r.ok) {
      console.error("founding: search failed", r.status, JSON.stringify(r.data?.error || {}));
      return null;
    }
    return Array.isArray(r.data?.data) ? r.data.data.length : null;
  } catch {
    return null;
  }
}

/* Tags on an existing contact, matched on exact email. Null when there is no
   contact or GHL cannot be reached. Never creates anything. */
async function tagsForEmail(email: string): Promise<string[] | null> {
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location || !email) return null;
  try {
    const res = await fetch(
      `${GHL_API}/contacts/?locationId=${encodeURIComponent(location)}&query=${encodeURIComponent(email.trim().toLowerCase())}`,
      { headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const found = (await res.json())?.contacts || [];
    const match = found.find((c: any) => (c?.email || "").toLowerCase() === email.trim().toLowerCase());
    return match ? match.tags || [] : null;
  } catch {
    return null;
  }
}

/*
  Somebody opened checkout and did not pay. Stripe only keeps their details if
  they typed them in before leaving, so most abandoned sessions are anonymous
  and are only counted in the daily digest. When there is an email, Sean gets
  a Slack line and the contact is tagged founding-abandoned, so a personal
  message can go out while they are still warm.

  Once per person: skipped if the contact already carries founding-abandoned
  or founding-paid, and the session is marked when Stripe allows it.
*/
export async function handleAbandoned(session: any): Promise<boolean> {
  if (session?.metadata?.payment !== PAYMENT_KIND) return false;
  if (session?.status !== "expired") return false;
  if (session?.metadata?.abandon_alerted === "1") return false;
  const d = session.customer_details || {};
  const email = String(d.email || session.customer_email || "").trim();
  if (!email) return false;

  const existing = await tagsForEmail(email);
  if (existing && (existing.includes(ABANDONED_TAG) || existing.includes(PAID_TAG))) return false;

  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  const [firstName, ...rest] = String(d.name || "").trim().split(/\s+/);
  let contactId: string | null = null;
  if (token && location) {
    contactId = await findOrCreateByEmail(token, location, email, {
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
      tags: [ABANDONED_TAG],
    });
    if (contactId) await addTags(token, contactId, [ABANDONED_TAG]);
  }

  await slack(
    [
      `:eyes: *${d.name || email} started the founding 90 Day checkout and did not pay.*`,
      `Email: ${email}   Phone: ${d.phone || "not given"}`,
      contactId ? `Tagged \`${ABANDONED_TAG}\` in GoHighLevel. <${contactUrl(contactId)}|Open them>` : `Not in GoHighLevel yet.`,
      `Worth a personal message while they are warm.`,
    ].join("\n")
  );

  await stripe(`checkout/sessions/${session.id}`, {
    method: "POST",
    form: new URLSearchParams({ "metadata[abandon_alerted]": "1" }),
  }).catch(() => null);

  return true;
}

/* The waitlist, once the intake is full or closed. */
export async function addToWaitlist(email: string, name: string): Promise<boolean> {
  const token = process.env.GHL_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  const [firstName, ...rest] = name.trim().split(/\s+/);
  let contactId: string | null = null;
  if (token && location) {
    contactId = await findOrCreateByEmail(token, location, email, {
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
      tags: [WAITLIST_TAG],
    });
    if (contactId) await addTags(token, contactId, [WAITLIST_TAG]);
  }
  await slack(
    `:hourglass: *${name || email} joined the waitlist for the next intake.*\nEmail: ${email}` +
      (contactId ? `\nTagged \`${WAITLIST_TAG}\` in GoHighLevel. <${contactUrl(contactId)}|Open them>` : "")
  );
  return true;
}
