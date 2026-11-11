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

export async function provisionPortal(contact: { email?: string; firstName?: string; lastName?: string; name?: string } | null): Promise<{ claimUrl?: string; loginUrl?: string; error?: string }> {
  const secret = process.env.PROVISION_SECRET;
  const email = String(contact?.email || "").trim();
  const name = String(contact?.name || [contact?.firstName, contact?.lastName].filter(Boolean).join(" ")).trim();
  if (!secret) return { error: "PROVISION_SECRET not set" };
  if (!email || !name) return { error: "contact has no email or name" };
  try {
    const r = await fetch(PROVISION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-provision-secret": secret },
      body: JSON.stringify({ email, name }),
      signal: AbortSignal.timeout(8000),
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) return { error: `provision-client ${r.status}: ${body?.error || ""}` };
    return { claimUrl: body.claimUrl, loginUrl: body.loginUrl };
  } catch (e) {
    return { error: `provision-client unreachable: ${(e as Error).message}` };
  }
}
