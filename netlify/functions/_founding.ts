import { addTags, contactUrl, findOrCreateByEmail, GHL_API, GHL_VERSION, sendEmail } from "./_ghl";
import { BRAND_DAY_BOOKING, OFFICE_HOURS, whatsappLine } from "./_calls";
import { claimPortalEvent, intakeLink, logPortalEvent, provisionPortal } from "./_portal";

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

  Double welcome guard (24 Nov 2026). The thank you page and the sweep can
  both arrive before alerted=1 lands (or the buyer refreshes the thank you
  page), and each used to send a welcome. Two locks now:
    - claimSale: a claim written onto the Stripe session, then read back after
      a pause. Whoever reads back their own claim does the work; the other
      stops. A claim older than 10 minutes is a run that died, and is taken over.
    - welcome_claim on contentengine, once per Stripe session, logged before
      the welcome goes. A second run for the same sale finds it and sends nothing.
*/

export const PAYMENT_KIND = "founding-90";
export const PAID_TAG = "founding-paid";
export const ABANDONED_TAG = "founding-abandoned";
export const WAITLIST_TAG = "founding-waitlist";

/* Intro offer for 5 founders starting January (Sean, 11 Nov 2026). */
export const TOTAL_SPOTS = 5;
/* Midnight at the end of 30 November, Brisbane (UTC+10, no daylight saving). */
export const CLOSES_AT = new Date("2026-12-01T00:00:00+10:00");

/* February intake (Sean, 16 Nov 2026). Once January has 5 sales, or once 30
   November passes, checkout sells February at $15,000 + GST, 5 places, no
   closing date. Sales carry metadata intake=january|february. Sales made
   before this existed have no intake and count as January. */
export type Intake = "january" | "february";
export const FEB_SPOTS = 5;

export async function soldByIntake(): Promise<{ january: number; february: number } | null> {
  try {
    const q = encodeURIComponent(`status:'succeeded' AND metadata['payment']:'${PAYMENT_KIND}'`);
    const r = await stripe(`payment_intents/search?query=${q}&limit=100`);
    if (!r.ok || !Array.isArray(r.data?.data)) return null;
    let january = 0;
    let february = 0;
    for (const pi of r.data.data) {
      if (pi?.metadata?.intake === "february") february++;
      else january++;
    }
    return { january, february };
  } catch {
    return null;
  }
}

/* Which intake checkout is selling right now. */
export async function currentIntake(): Promise<{ intake: Intake | null; remaining: number | null; total: number; closesAt: string | null }> {
  const sold = await soldByIntake();
  const janOpen = Date.now() < CLOSES_AT.getTime();
  if (sold === null) {
    /* Stripe would not say. Keep selling the intake the date allows, count unknown. */
    return janOpen
      ? { intake: "january", remaining: null, total: TOTAL_SPOTS, closesAt: CLOSES_AT.toISOString() }
      : { intake: "february", remaining: null, total: FEB_SPOTS, closesAt: null };
  }
  if (janOpen && sold.january < TOTAL_SPOTS) {
    return { intake: "january", remaining: TOTAL_SPOTS - sold.january, total: TOTAL_SPOTS, closesAt: CLOSES_AT.toISOString() };
  }
  if (sold.february < FEB_SPOTS) {
    return { intake: "february", remaining: FEB_SPOTS - sold.february, total: FEB_SPOTS, closesAt: null };
  }
  return { intake: null, remaining: 0, total: FEB_SPOTS, closesAt: null };
}

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
export function cohortStart(paidMs: number, intake?: string): string {
  const d = new Date(paidMs + 10 * 3600_000);
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 15));
  /* A February buyer never starts before 15 February 2027. */
  const first = intake === "february" ? Date.UTC(2027, 1, 15) : Date.UTC(2027, 0, 15);
  return new Date(Math.max(next.getTime(), first)).toISOString().slice(0, 10);
}
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00+10:00`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Brisbane" });

const CLAIM_TTL = 10 * 60_000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* True when this call holds the sale. See the note at the top. */
async function claimSale(sessionId: string): Promise<boolean> {
  const fresh = await stripe(`checkout/sessions/${sessionId}`);
  if (!fresh.ok) return false;
  const m = fresh.data?.metadata || {};
  if (m.alerted === "1") return false;
  const held = Number(String(m.claim || "").split(":")[1] || 0);
  if (held && Date.now() - held < CLAIM_TTL) return false;
  const mine = `${Math.random().toString(36).slice(2, 10)}:${Date.now()}`;
  const w = await stripe(`checkout/sessions/${sessionId}`, { method: "POST", form: new URLSearchParams({ "metadata[claim]": mine }) });
  if (!w.ok) return false;
  await sleep(1500);
  const back = await stripe(`checkout/sessions/${sessionId}`);
  return back.ok && back.data?.metadata?.claim === mine && back.data?.metadata?.alerted !== "1";
}

export async function handleFoundingSale(session: any, via: "thank-you page" | "sweep"): Promise<boolean> {
  if (session?.metadata?.payment !== PAYMENT_KIND) return false;
  if (session?.payment_status !== "paid") return false;
  if (session?.metadata?.alerted === "1") return false;
  if (!(await claimSale(session.id))) return false;

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
  const intake = session?.metadata?.intake === "february" ? "february" : "january";
  const start = cohortStart((session.created ? session.created * 1000 : Date.now()), intake);
  const portal = await provisionPortal({ email: d.email, name: d.name }, {
    start,
    paid: { product: `Founding 90 Day (${intake === "february" ? "February" : "January"} intake)`, amount, session: session.id, phone: d.phone || undefined },
  });

  /* Sean, 2026-11-12: "the founding buyers next steps all implemented asap".
     One welcome email, sent from here like the install payment email (the tag
     route has failed before): the portal, the Brand Day booking and office
     hours, which is the one call they join before their Brand Day. */
  let welcomed = false;
  /* Sean, 24 Nov: Brand Day credit buyers (Erina, Jack) have had their day already. No booking line. */
  const credit = session?.metadata?.credit === "brand-day";
  /* Second lock: one welcome per sale, on contentengine. Null means it could
     not be asked, and then the Stripe claim alone decides. */
  const claim = await claimPortalEvent(d.email, "welcome_claim", { session: session.id, via });
  if (claim?.duplicate === true) {
    /* Another run already welcomed this sale. Close it and say nothing. */
    await stripe(`checkout/sessions/${session.id}`, { method: "POST", form: new URLSearchParams({ "metadata[alerted]": "1" }) });
    return false;
  }
  /* The research intake (brand.contentengine.live/welcome). Not for credit
     buyers, whose research was done for their Brand Day, and not for anyone
     who has already sent it. */
  const research: { url?: string; submitted?: boolean; error?: string } = credit ? {} : await intakeLink(portal.slug ? { slug: portal.slug } : { email: d.email });
  const intakeUrl = research.url && !research.submitted ? research.url : "";
  if (token && contactId) {
    const first = String(d.name || "").split(" ")[0] || "there";
    const brandDay = `${BRAND_DAY_BOOKING}?name=${encodeURIComponent(d.name || "")}&email=${encodeURIComponent(d.email || "")}&utm_content=${encodeURIComponent(contactId)}`;
    let n = 1;
    const { sent } = await sendEmail(token, contactId, "You're in. Here's what happens now.", [
      `<p>${first},</p>`,
      `<p>You're in. Your spot is locked in.</p>`,
      portal.claimUrl ? `<p>${n++}. <a href="${portal.claimUrl}">Set up your portal</a>. Everything for the build lives there: the SOPs, playbooks, training and your calls.</p>` : `<p>${n++}. Your portal is ready at <a href="https://contentengine.live/login">contentengine.live</a>. Everything for the build lives there.</p>`,
      credit ? "" : `<p>${n++}. <a href="${brandDay}">Lock in your Strategy Day date</a>.</p>`,
      `<p>${n++}. <a href="https://calendly.com/sean-authorityengine/1-1-private-strategy-session?name=${encodeURIComponent(d.name || "")}&email=${encodeURIComponent(d.email || "")}">Book your 1:1 strategy call</a> in the next 7 days.</p>`,
      intakeUrl ? `<p>${n++}. <a href="${intakeUrl}">Send us your YouTube, Instagram and podcast links</a> so we can start your research.</p>` : "",
      `<p>${n++}. Advisory group office hours run every ${OFFICE_HOURS.when}, Queensland time. Join any week with a question: <a href="${OFFICE_HOURS.zoom}">Zoom link</a>. Fill in the <a href="${OFFICE_HOURS.form}">group advisory form</a> before you come.</p>`,
      credit
        ? `<p>Your weekly calls and monthly content advisory board meetings start ${longDate(start)}.</p>`
        : `<p>Your weekly calls and monthly content advisory board meetings start after your Strategy Day.</p>`,
      `<p>What I will and won't do, and your 12 week rhythm: <a href="https://authorityengine.com.au/advisoryoutline">authorityengine.com.au/advisoryoutline</a>.</p>`,
      whatsappLine(portal.whatsappUrl),
      `<p>Sean</p>`,
    ].join(""));
    welcomed = sent;
  }
  await logPortalEvent(d.email, "welcome_email", { subject: "You're in. Here's what happens now.", sent: welcomed, session: session.id, intake: Boolean(intakeUrl), ...(research.error ? { intakeError: research.error } : {}) });

  await slack(
    [
      `:moneybag: *${d.name || d.email || "Somebody"} just bought the founding 90 Day, ${intake === "february" ? "FEBRUARY intake" : "January intake"} (paid in full).*`,
      `${amount} received. Picked up by the ${via}.`,
      `Starts: ${longDate(start)} (cohort start, the 15th).`,
      `Email: ${d.email || "not given"}   Phone: ${d.phone || "not given"}`,
      contactId
        ? `Tagged \`${PAID_TAG}\` in GoHighLevel. <${contactUrl(contactId)}|Open them>`
        : `:warning: Could not create or tag them in GoHighLevel. Add them by hand with the \`${PAID_TAG}\` tag.`,
      credit ? `Brand Day credit sale (${session?.metadata?.contact_id || "contact id missing"}). Their Strategy Day is already done, so no booking was sent.` : "",
      welcomed ? `Welcome email sent (portal, ${credit ? "" : "Strategy Day booking, "}7 day strategy call, ${intakeUrl ? "research intake, " : ""}group advisory, advisory outline).` : `:warning: Welcome email NOT sent. Send them the portal and Brand Day links by hand.`,
      !credit && !intakeUrl ? `:warning: No research intake link in the welcome (${research.error || "already sent"}). Get it from brand.contentengine.live (Intake link on their card).` : "",
      portal.claimUrl ? `Portal made: ${portal.claimUrl}` : portal.error ? `:warning: No portal made (${portal.error}). Invite them from contentengine.live/clients.` : `Portal: they already have an account.`,
      `Now: ${portal.whatsappUrl ? "their WhatsApp group link went in the welcome email (Slack says which group)." : "make their WhatsApp group and paste the invite link on their portal hub (Edit hub), which emails it to them."} Then give them the SOPs, playbooks, training videos and early group advisory${credit ? "." : ", and lock in their Strategy Day date."}`,
    ].filter(Boolean).join("\n")
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
