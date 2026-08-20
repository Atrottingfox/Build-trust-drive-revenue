import type { Handler } from "@netlify/functions";

/*
  Is the application intake actually working?

  Written after an application landed in Notion, alerted Slack, and sent the
  applicant nothing. Every individual piece was "fine": the code ran, no error
  was thrown, and the only way to discover the gap was to apply and then go
  looking for an email that never came.

  The lesson is not that Kit broke. It is that a chain of four external systems
  had no way to be checked except by pushing a real person through it. So this
  checks every link on demand, read only, without creating a contact, a Notion
  row, a subscriber or a Slack message.

  GET /.netlify/functions/intake-selftest

  Add ?notify=1 to also post the result into Slack, which is how the webhook
  itself gets proven: it is the one link that cannot be verified without using
  it.
*/

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

const NOTION_BUILDER_DB = "f8cdb64d3910451b9607600fb326bf6e";
const NOTION_APPLY_DB = "ef00b2eb6dfb825da88101e3c99717d0";
const KIT_TAG_BUILDER = 18814834;
const KIT_TAG_APPLY = 18845355;
const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

type Check = { name: string; ok: boolean; detail: string };

async function checkNotionDb(key: string, id: string, label: string): Promise<Check> {
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${id}`, {
      headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28" },
    });
    if (!res.ok) {
      return { name: label, ok: false, detail: `Notion returned ${res.status}` };
    }
    const json = await res.json();
    /*
      Reachable is not the same as usable. Writing an application fails if a
      property it sets has been renamed or deleted in Notion, and that failure
      only shows up when someone applies, which is exactly the pattern this
      file exists to break.
    */
    const props = Object.keys(json?.properties || {});
    const required = ["Name", "Email", "Company", "Revenue Band", "Status"];
    const missing = required.filter((r) => !props.includes(r));
    return missing.length
      ? { name: label, ok: false, detail: `missing properties: ${missing.join(", ")}` }
      : { name: label, ok: true, detail: `reachable, ${props.length} properties` };
  } catch {
    return { name: label, ok: false, detail: "could not reach Notion" };
  }
}

async function checkKitTag(secret: string, tagId: number, label: string): Promise<Check> {
  try {
    const res = await fetch(`https://api.convertkit.com/v3/tags?api_secret=${encodeURIComponent(secret)}`);
    if (!res.ok) {
      return { name: label, ok: false, detail: `Kit returned ${res.status}, the secret may be rotated` };
    }
    const json = await res.json();
    const found = (json?.tags || []).some((t: { id?: number }) => t?.id === tagId);
    return found
      ? { name: label, ok: true, detail: `tag ${tagId} exists` }
      : { name: label, ok: false, detail: `tag ${tagId} does not exist, nothing will be triggered` };
  } catch {
    return { name: label, ok: false, detail: "could not reach Kit" };
  }
}

async function checkGhl(token: string, locationId: string): Promise<Check> {
  try {
    const res = await fetch(`${GHL_API}/locations/${encodeURIComponent(locationId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        Accept: "application/json",
      },
    });
    return res.ok
      ? { name: "GHL", ok: true, detail: "token valid, location reachable" }
      : { name: "GHL", ok: false, detail: `GHL returned ${res.status}` };
  } catch {
    return { name: "GHL", ok: false, detail: "could not reach GHL" };
  }
}

const handler: Handler = async (event) => {
  const notionKey = process.env.NOTION_API_KEY;
  const kitSecret = process.env.KIT_API_SECRET;
  const ghlToken = process.env.GHL_TOKEN;
  const ghlLocation = process.env.GHL_LOCATION_ID;
  const slack = process.env.SLACK_WEBHOOK_URL;

  const checks: Check[] = [];

  if (!notionKey) {
    checks.push({ name: "Notion", ok: false, detail: "NOTION_API_KEY is not set" });
  } else {
    checks.push(await checkNotionDb(notionKey, NOTION_BUILDER_DB, "Notion: builder queue"));
    checks.push(await checkNotionDb(notionKey, NOTION_APPLY_DB, "Notion: apply queue"));
  }

  if (!kitSecret) {
    checks.push({ name: "Kit", ok: false, detail: "KIT_API_SECRET is not set, no applicant is emailed" });
  } else {
    checks.push(await checkKitTag(kitSecret, KIT_TAG_BUILDER, "Kit: builder confirmation tag"));
    checks.push(await checkKitTag(kitSecret, KIT_TAG_APPLY, "Kit: apply confirmation tag"));
  }

  checks.push(
    ghlToken && ghlLocation
      ? await checkGhl(ghlToken, ghlLocation)
      : { name: "GHL", ok: false, detail: "GHL_TOKEN or GHL_LOCATION_ID is not set" }
  );

  checks.push({
    name: "Slack",
    ok: Boolean(slack),
    detail: slack ? "webhook configured" : "SLACK_WEBHOOK_URL is not set, no alert on a new application",
  });

  /*
    The custom field ids are what carry the answers into GHL. A missing one is
    not fatal, the contact is still created, but that answer is dropped and
    nothing says so at the time.
  */
  const fieldEnvs = [
    "GHL_FIELD_ANNUAL_REVENUE",
    "GHL_FIELD_PRIMARY_OFFER",
    "GHL_FIELD_CHANNELS_ACTIVE",
    "GHL_FIELD_WHATS_BROKEN",
    "GHL_FIELD_ONE_THING_TO_FIX",
    "GHL_FIELD_HOW_DID_YOU_HEAR",
  ];
  const missingFields = fieldEnvs.filter((k) => !process.env[k]);
  checks.push({
    name: "GHL custom fields",
    ok: missingFields.length === 0,
    detail: missingFields.length
      ? `not set, these answers are dropped: ${missingFields.join(", ")}`
      : `all ${fieldEnvs.length} field ids present`,
  });

  const failed = checks.filter((c) => !c.ok);
  const ok = failed.length === 0;

  if (event.queryStringParameters?.notify === "1" && slack) {
    const lines = [
      ok
        ? ":white_check_mark: *Application intake self test passed*"
        : `:rotating_light: *Application intake self test FAILED* (${failed.length} of ${checks.length})`,
      ...checks.map((c) => `${c.ok ? ":white_check_mark:" : ":x:"} *${c.name}:* ${c.detail}`),
    ];
    await fetch(slack, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    }).catch(() => {
      /* The JSON response still carries the result. */
    });
  }

  return {
    statusCode: ok ? 200 : 500,
    headers,
    body: JSON.stringify({ ok, failed: failed.length, checks }, null, 2),
  };
};

export { handler };
