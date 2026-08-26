import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";
import { runChecks, summarise, type Check } from "./_health";

/*
  The hourly job. Same checks as the dashboard, minus the ones that create
  Stripe sessions, and it shouts rather than renders.

  Built after 20 August 2026, when an application produced a Slack alert and no
  contact at all, and nothing errored. A funnel that fails silently is worse
  than one that fails loudly, because you keep selling into it.

  It only speaks up when something is wrong. An hourly "all good" trains you to
  ignore the channel, and then you ignore the one that matters.
*/

async function alert(checks: Check[]) {
  const failed = checks.filter((c) => !c.ok);
  const critical = failed.filter((c) => c.critical);

  const webhook = process.env.SLACK_WEBHOOK_BROKEN || process.env.SLACK_WEBHOOK_URL;
  if (webhook) {
    const lines = [
      critical.length
        ? `:rotating_light: *${critical.length} critical failure${critical.length > 1 ? "s" : ""} in the funnel*`
        : `:warning: *${failed.length} non-critical issue${failed.length > 1 ? "s" : ""}*`,
      "",
      ...failed.map((c) => `:x: *${c.group}* · ${c.name}${c.detail ? `\n     ${c.detail}` : ""}`),
      "",
      critical.length
        ? "An application submitted right now may not reach GoHighLevel, or money may be wrong."
        : "Worth a look, nothing is down.",
      "https://authorityengine.com.au/health",
    ].join("\n");

    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: lines }),
      });
    } catch (err) {
      console.error("health-check: Slack alert failed:", err);
    }
  }

  /*
    Tag a nominated contact so a GHL workflow can turn this into an email or a
    text. Set HEALTHCHECK_ALERT_CONTACT_ID to Sean's own contact and hang
    whatever he wants off `healthcheck-failed`, without touching this file.
    Only critical failures, so the tag stays meaningful.
  */
  const alertContact = process.env.HEALTHCHECK_ALERT_CONTACT_ID;
  const token = process.env.GHL_TOKEN;
  if (critical.length && alertContact && token) {
    const auth = {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
    };
    try {
      // Removed first, so a second failure re-fires the trigger.
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(alertContact)}/tags`, {
        method: "DELETE",
        headers: auth,
        body: JSON.stringify({ tags: ["healthcheck-failed"] }),
      });
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(alertContact)}/tags`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({ tags: ["healthcheck-failed"] }),
      });
    } catch (err) {
      console.error("health-check: could not tag the alert contact:", err);
    }
  }

  console.error("health-check FAILED:", JSON.stringify(failed));
}

const handler: Handler = async () => {
  try {
    const checks = await runChecks(false);
    const summary = summarise(checks);

    if (!summary.ok) await alert(checks);
    else console.log(`health-check passed: ${summary.total} checks`);

    return { statusCode: 200, body: JSON.stringify({ ...summary, checks }) };
  } catch (err) {
    console.error("health-check itself failed:", err);
    await alert([
      { group: "Monitor", name: "The health check itself", ok: false, critical: true, detail: String(err) },
    ]);
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};

export { handler };
