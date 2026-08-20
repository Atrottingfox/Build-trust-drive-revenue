import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  Hourly proof that an application can still reach GoHighLevel.

  Built after 20 August 2026, when an application produced a Slack alert and no
  GHL contact at all. Nothing errored. The form said thank you, Slack said a new
  application had arrived, and the person simply did not exist in the CRM. The
  only reason it was caught is that Sean happened to notice a missing email.

  A funnel that fails silently is worse than one that fails loudly, because you
  keep selling into it.

  What it proves, in the same order a real application does it:
    1. the site is serving
    2. the GHL token still authenticates
    3. a contact can be looked up by email
    4. a contact can be created
    5. a tag can be applied, which is what every workflow triggers on
    6. the contact can be deleted again

  Step 5 is the one that matters most. Tagging is where the whole automation
  chain hangs, and a token can keep reading long after it has lost the right to
  write.

  Deliberately NOT posting through builder-application with the real `applied`
  tag. That would fire the confirmation workflow every hour and put a synthetic
  applicant in the queue 24 times a day. It uses its own throwaway tag instead,
  and removes the contact afterwards, so it exercises the mechanism without
  touching anything Sean reads.

  Alerts go to Slack, which is already proven and lands on his phone. It also
  tags a nominated GHL contact with `healthcheck-failed`, so an email or SMS can
  be hung off that tag without changing this file.
*/

const TEST_EMAIL = "zz-healthcheck@authorityengine.com.au";
const TEST_TAG = "zz-healthcheck";

type Step = { name: string; ok: boolean; detail?: string };

async function alert(steps: Step[]) {
  const failed = steps.filter((s) => !s.ok);
  const webhook = process.env.SLACK_WEBHOOK_URL;

  if (webhook) {
    const lines = [
      ":rotating_light: *Application pipeline health check FAILED*",
      "",
      ...steps.map((s) => `${s.ok ? ":white_check_mark:" : ":x:"} ${s.name}${s.detail ? ` — ${s.detail}` : ""}`),
      "",
      "An application submitted right now may not reach GoHighLevel.",
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
    Tagging a nominated contact so a GHL workflow can email or text on failure.
    Set HEALTHCHECK_ALERT_CONTACT_ID to Sean's own contact and hang whatever he
    wants off `healthcheck-failed`.
  */
  const alertContact = process.env.HEALTHCHECK_ALERT_CONTACT_ID;
  const token = process.env.GHL_TOKEN;
  if (alertContact && token) {
    try {
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(alertContact)}/tags`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, "Content-Type": "application/json" },
        body: JSON.stringify({ tags: ["healthcheck-failed"] }),
      });
      await fetch(`${GHL_API}/contacts/${encodeURIComponent(alertContact)}/tags`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, "Content-Type": "application/json" },
        body: JSON.stringify({ tags: ["healthcheck-failed"] }),
      });
    } catch (err) {
      console.error("health-check: could not tag the alert contact:", err);
    }
  }

  console.error("health-check FAILED:", JSON.stringify(failed));
}

const handler: Handler = async () => {
  const steps: Step[] = [];
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  const auth = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let createdId: string | null = null;

  try {
    // 1. The site is serving.
    try {
      const res = await fetch("https://authorityengine.com.au/builder", { method: "HEAD" });
      steps.push({ name: "Application page reachable", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` });
    } catch (err) {
      steps.push({ name: "Application page reachable", ok: false, detail: String(err) });
    }

    if (!token || !locationId) {
      steps.push({ name: "GHL credentials present", ok: false, detail: "GHL_TOKEN or GHL_LOCATION_ID missing" });
      await alert(steps);
      return { statusCode: 200, body: JSON.stringify({ ok: false, steps }) };
    }
    steps.push({ name: "GHL credentials present", ok: true });

    // 2 and 3. The token authenticates and can search.
    let lookupOk = false;
    try {
      const res = await fetch(
        `${GHL_API}/contacts/?locationId=${encodeURIComponent(locationId)}&query=${encodeURIComponent(TEST_EMAIL)}`,
        { headers: auth }
      );
      lookupOk = res.ok;
      steps.push({ name: "GHL lookup by email", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` });

      // Clear up anything a previous failed run left behind.
      if (res.ok) {
        const found = (await res.json())?.contacts || [];
        for (const c of found) {
          if ((c?.email || "").toLowerCase() === TEST_EMAIL) {
            await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}`, { method: "DELETE", headers: auth });
          }
        }
      }
    } catch (err) {
      steps.push({ name: "GHL lookup by email", ok: false, detail: String(err) });
    }

    // 4. A contact can be created. This is what actually broke.
    if (lookupOk) {
      try {
        const res = await fetch(`${GHL_API}/contacts/`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({
            locationId,
            firstName: "ZZ",
            lastName: "Healthcheck",
            email: TEST_EMAIL,
            source: "hourly health check",
          }),
        });
        const json = await res.json().catch(() => ({}));
        createdId = json?.contact?.id || json?.id || null;
        steps.push({
          name: "GHL contact create",
          ok: res.ok && Boolean(createdId),
          detail: res.ok ? (createdId ? undefined : "no id returned") : `HTTP ${res.status}`,
        });
      } catch (err) {
        steps.push({ name: "GHL contact create", ok: false, detail: String(err) });
      }
    }

    // 5. A tag can be applied. Every workflow in the funnel triggers on this.
    if (createdId) {
      try {
        const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(createdId)}/tags`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({ tags: [TEST_TAG] }),
        });
        steps.push({ name: "GHL tag write", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` });
      } catch (err) {
        steps.push({ name: "GHL tag write", ok: false, detail: String(err) });
      }
    }

    // 6. Clean up. A failure here is worth knowing but is not an outage.
    if (createdId) {
      try {
        const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(createdId)}`, {
          method: "DELETE",
          headers: auth,
        });
        steps.push({ name: "Test contact removed", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` });
      } catch (err) {
        steps.push({ name: "Test contact removed", ok: false, detail: String(err) });
      }
    }

    const ok = steps.every((s) => s.ok);
    if (!ok) await alert(steps);
    else console.log("health-check passed:", steps.map((s) => s.name).join(", "));

    return { statusCode: 200, body: JSON.stringify({ ok, steps }) };
  } catch (err) {
    steps.push({ name: "Health check itself", ok: false, detail: String(err) });
    await alert(steps);
    return { statusCode: 200, body: JSON.stringify({ ok: false, steps }) };
  }
};

export { handler };
