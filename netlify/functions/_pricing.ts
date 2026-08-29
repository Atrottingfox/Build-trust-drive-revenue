import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  One person at a time can walk the whole funnel for a dollar.

  Every rehearsal of this journey so far has been done by dropping
  CHECKOUT_AMOUNT_CENTS to 100, which drops it for the entire internet. A real
  prospect landing on /lock-in during that window could have bought a $5,000
  Brand Day for a dollar, and there is no way to tell afterwards whether one
  did. That happened four separate times in a single day.

  So the test price is a property of the person, not of the site. A contact
  carrying `zz-test` pays a dollar at every step: the Brand Day, the first
  instalment of the 90 Day, and the second. Everybody else pays the real price,
  and the real price never moves.

  Why a tag rather than a secret in the link: the tag is visible in
  GoHighLevel, it can be removed by anybody with a browser and no deploy, and
  the contact carrying it shows up as a test everywhere else too. A secret in a
  URL is invisible, gets pasted into Slack, and outlives whoever created it.

  This is deliberately fail-closed. Any doubt about whether somebody is a test
  contact, including GoHighLevel being unreachable, and they are charged the
  real price. The wrong way round costs $4,999 and an apology; this way costs a
  rerun of a Loom.
*/

export const TEST_TAG = "zz-test";

/* One dollar. Enough to exercise a real card, a real Stripe fee and a real
   receipt, which a zero amount would not. */
export const TEST_CENTS = 100;

export async function isTestContact(contactId: string | undefined | null): Promise<boolean> {
  const token = process.env.GHL_TOKEN;
  if (!token || !contactId) return false;

  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(String(contactId))}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        Accept: "application/json",
      },
    });
    if (!res.ok) return false;
    return ((await res.json())?.contact?.tags || []).includes(TEST_TAG);
  } catch {
    /* Unreachable CRM means full price. See the note above about which way
       round the mistake is affordable. */
    return false;
  }
}

/*
  What to charge, in cents.

  Reads the environment variable so the real price stays where it has always
  been, and overrides it only for a test contact. `fallback` covers the variable
  being unset, which must never silently mean free.
*/
export function priceCents(envVar: string, isTest: boolean, fallback = 500000): number {
  if (isTest) return TEST_CENTS;
  const raw = Number(process.env[envVar]);
  return Number.isFinite(raw) && raw > 0 ? raw : fallback;
}
