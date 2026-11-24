/*
  The client's portal on contentengine.live, made the moment they pay.

  Sean, 2026-11-11: "we need to make sure that we can create individual client
  portals every single time we sign somebody up ... where we create an account
  for them and they set a password, or they have a unique link".

  contentengine's provision-client makes (or finds) their client record and a
  one time "set your password" link that stays valid until used. The link goes
  in the payment email that already goes out, so they get one email, not two.

  Never throws and never blocks the payment flow: if the portal cannot be made,
  the payment still completes and Slack is told so the link can be sent by hand.
*/

const PROVISION_URL =
  process.env.PORTAL_PROVISION_URL || "https://contentengine.live/.netlify/functions/provision-client";

/* What was bought, for the buyer's timeline and Slack thread on contentengine
   (2026-11-23). */
export type PaidInfo = { product?: string; amount?: string; session?: string; phone?: string };

export async function provisionPortal(contact: { email?: string; firstName?: string; lastName?: string; name?: string } | null, extra: { brandDay?: string; start?: string; paid?: PaidInfo } = {}): Promise<{ claimUrl?: string; loginUrl?: string; whatsappUrl?: string; slug?: string; error?: string }> {
  /* The secret contentengine and this site already share (it is how
     contentengine asks client-upcoming for call times). A new variable pushed
     this site over Netlify's 4KB function environment limit and stopped every
     deploy (2026-11-11), so this one is reused. */
  const secret = process.env.CALL_CONTEXT_SECRET;
  const email = String(contact?.email || "").trim();
  const name = String(contact?.name || [contact?.firstName, contact?.lastName].filter(Boolean).join(" ")).trim();
  if (!secret) return { error: "CALL_CONTEXT_SECRET not set" };
  if (!email || !name) return { error: "contact has no email or name" };
  try {
    const r = await fetch(PROVISION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-provision-secret": secret },
      body: JSON.stringify({ email, name, brandDay: extra.brandDay, start: extra.start, paid: extra.paid }),
      signal: AbortSignal.timeout(8000),
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) return { error: `provision-client ${r.status}: ${body?.error || ""}` };
    return { claimUrl: body.claimUrl, loginUrl: body.loginUrl, whatsappUrl: body.whatsappUrl || undefined, slug: body.slug || undefined };
  } catch (e) {
    return { error: `provision-client unreachable: ${(e as Error).message}` };
  }
}

/*
  One line on the buyer's timeline on contentengine.live, and in their Slack
  thread (Sean, 2026-11-23: "i just want to know what's happened where when
  and how"; 24 Nov: "i need full tracking and visibility across all data").
  Matched to the client by email (or clientId). Reuses CALL_CONTEXT_SECRET:
  this site is at Netlify's 4KB env limit. Never throws, never blocks.

  Kinds contentengine's portal-event accepts from here:
    welcome_email          the welcome went (or did not)
    email_sent/failed      every email sendEmail sends (automatic)
    brand_day_booked, strategy_call_booked, prep_call_booked, call_booked
                           Calendly (calendly-booked)
    slot_booked            the 90 day call slot (install-slot)
    founding_chase         a founding-nudge stage (claimed with claimPortalEvent)
    welcome_claim          one welcome email per Stripe session (_founding.ts)
*/
const EVENT_URL = "https://contentengine.live/.netlify/functions/portal-event";

export type PortalEventKind =
  | "welcome_email"
  | "email_sent"
  | "email_failed"
  | "brand_day_booked"
  | "strategy_call_booked"
  | "prep_call_booked"
  | "call_booked"
  | "slot_booked"
  | "founding_chase"
  | "welcome_claim";

export async function logPortalEvent(
  email: string | undefined,
  kind: PortalEventKind,
  detail: Record<string, unknown>,
  clientId?: string
): Promise<void> {
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!secret || (!email && !clientId)) return;
  try {
    await fetch(EVENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-call-context-key": secret },
      body: JSON.stringify({ email, clientId, kind, detail }),
      signal: AbortSignal.timeout(6000),
    });
  } catch {
    /* The email went (or did not) either way. */
  }
}

/*
  Log an event that must only ever happen once (a chase stage, a welcome per
  sale). contentengine answers duplicate: true when the same stage (or
  session) is already logged for that client, and only then is it skipped.
  Null when contentengine could not be asked or did not log it: the caller
  decides whether that means stop (a chase) or carry on (a welcome).
*/
export async function claimPortalEvent(
  email: string | undefined,
  kind: "founding_chase" | "welcome_claim",
  detail: Record<string, unknown>
): Promise<{ duplicate: boolean; clientId?: string } | null> {
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!secret || !email) return null;
  try {
    const r = await fetch(EVENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-call-context-key": secret },
      body: JSON.stringify({ email, kind, detail }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    const d = await r.json().catch(() => null);
    return d && typeof d.duplicate === "boolean" ? { duplicate: d.duplicate, clientId: d.clientId } : null;
  } catch {
    return null;
  }
}

/* Where each founding buyer is, from contentengine (founding-status). */
export type FoundingStatus = {
  clientId: string | null;
  slug?: string;
  login?: boolean;
  brandDayDate?: string | null;
  claimUrl?: string | null;
  kinds?: string[];
  chased?: string[];
  welcomed?: string[];
};
export async function foundingStatus(emails: string[]): Promise<Record<string, FoundingStatus> | null> {
  const secret = process.env.CALL_CONTEXT_SECRET;
  if (!secret) return null;
  try {
    const r = await fetch("https://contentengine.live/.netlify/functions/founding-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-call-context-key": secret },
      body: JSON.stringify({ emails }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return null;
    return (await r.json())?.buyers || null;
  } catch {
    return null;
  }
}

/*
  The research intake link (brand.contentengine.live/welcome?c=<slug>&t=<token>,
  token = HMAC(slug, INTAKE_SECRET)). This site cannot hold INTAKE_SECRET (4KB
  env limit), so brand-day's intake-link mints it, gated by DECIDE_SECRET, the
  secret both sites already have. The buyer's client row is made at payment by
  provision-client and brand-day's stripe-webhook, so there is always a slug.
*/
export async function intakeLink(who: { slug?: string; email?: string }): Promise<{ url?: string; submitted?: boolean; error?: string }> {
  const secret = process.env.DECIDE_SECRET;
  if (!secret) return { error: "DECIDE_SECRET not set" };
  try {
    const r = await fetch("https://brand.contentengine.live/.netlify/functions/intake-link", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-decide-secret": secret },
      body: JSON.stringify(who),
      signal: AbortSignal.timeout(8000),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d?.intake_url) return { error: `intake-link ${r.status}: ${d?.error || ""}` };
    return { url: d.intake_url, submitted: Boolean(d.submitted_at) };
  } catch (e) {
    return { error: `intake-link unreachable: ${(e as Error).message}` };
  }
}
