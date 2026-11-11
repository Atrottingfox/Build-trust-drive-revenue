import type { Handler } from "@netlify/functions";
import { CLOSES_AT, PAYMENT_KIND, slack, soldCount, stripe, stripeKey, TOTAL_SPOTS } from "./_founding";

/*
  One Slack message every morning (07:30 Brisbane) while the founding intake is
  open: spots sold and left, days to close, and the last 24 hours of checkout
  activity. Stops itself the day after the intake closes. Scheduled in
  netlify.toml.

  Counts come from Stripe Checkout Sessions tagged founding-90:
    started   every session created in the last 24 hours
    paid      of those, paid
    left      of those, expired without paying
    named     of the left ones, how many typed an email first (those also get
              their own Slack line from founding-sweep)
*/

export async function buildDigest(now = Date.now()): Promise<string | null> {
  if (now > CLOSES_AT.getTime() + 24 * 3600 * 1000) return null;

  const sold = await soldCount();
  const left = sold === null ? null : Math.max(0, TOTAL_SPOTS - sold);
  const msLeft = CLOSES_AT.getTime() - now;
  const daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 3600 * 1000)));

  const since = Math.floor(now / 1000) - 24 * 3600;
  const r = await stripe(`checkout/sessions?limit=100&created[gte]=${since}`);
  const sessions = (r.ok ? r.data?.data || [] : []).filter((s: any) => s?.metadata?.payment === PAYMENT_KIND);
  const started = sessions.length;
  const paid = sessions.filter((s: any) => s.payment_status === "paid").length;
  const expired = sessions.filter((s: any) => s.status === "expired");
  const named = expired.filter((s: any) => s?.customer_details?.email || s?.customer_email).length;

  const closed = msLeft <= 0 || left === 0;
  return [
    `:sunrise: *Founding 5, ${closed ? "closed" : `${daysLeft} day${daysLeft === 1 ? "" : "s"} to go`}*`,
    sold === null ? `Spots: Stripe would not say this morning.` : `Sold ${sold} of ${TOTAL_SPOTS}. ${left} left.`,
    `Last 24 hours: ${started} checkout${started === 1 ? "" : "s"} started, ${paid} paid, ${expired.length} left without paying` +
      (expired.length ? ` (${named} left an email)` : "") + `.`,
    r.ok ? "" : `Could not read checkout activity from Stripe.`,
    `authorityengine.com.au/founding`,
  ].filter(Boolean).join("\n");
}

const handler: Handler = async () => {
  if (!stripeKey()) return { statusCode: 200, body: JSON.stringify({ skipped: "no stripe key" }) };
  const text = await buildDigest();
  if (!text) return { statusCode: 200, body: JSON.stringify({ skipped: "intake closed" }) };
  await slack(text);
  return { statusCode: 200, body: JSON.stringify({ sent: true }) };
};

export { handler };
