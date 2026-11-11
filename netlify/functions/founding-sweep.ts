import type { Handler } from "@netlify/functions";
import { handleFoundingSale, PAYMENT_KIND, stripe, stripeKey } from "./_founding";

/*
  Every 10 minutes: any founding 90 Day sale that the thank you page never
  confirmed (closed tab, phone slept, lost signal) gets the same treatment as one
  that did. GoHighLevel contact, `founding-paid` tag, Slack alert.

  Reads completed Checkout Sessions from the last 7 days and hands each one to
  handleFoundingSale, which skips anything already done. Nothing to configure in
  Stripe, no webhook secret. Scheduled in netlify.toml.
*/

const handler: Handler = async () => {
  if (!stripeKey()) return { statusCode: 200, body: JSON.stringify({ skipped: "no stripe key" }) };

  const since = Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
  const r = await stripe(`checkout/sessions?status=complete&limit=100&created[gte]=${since}`);
  if (!r.ok) {
    console.error("founding-sweep: list failed", r.status, JSON.stringify(r.data?.error || {}));
    return { statusCode: 200, body: JSON.stringify({ error: true }) };
  }

  let handled = 0;
  for (const s of r.data?.data || []) {
    if (s?.metadata?.payment !== PAYMENT_KIND) continue;
    if (await handleFoundingSale(s, "sweep")) handled++;
  }
  return { statusCode: 200, body: JSON.stringify({ handled }) };
};

export { handler };
