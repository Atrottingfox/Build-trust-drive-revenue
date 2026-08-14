import type { Handler } from "@netlify/functions";

const NOTION_BUILDER_DB = "f8cdb64d3910451b9607600fb326bf6e";
const NOTION_APPLY_DB = "ef00b2eb6dfb825da88101e3c99717d0";

const KIT_TAG_BUILDER = 18814834;
const KIT_TAG_APPLY = 18845355;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

// Custom field IDs are NEVER hardcoded. Each one is read from a Netlify env var
// populated from the real sub-account via scripts/ghl-custom-fields.mjs.
// A missing env var means that field is skipped, not guessed.
const GHL_FIELD_ENV: Record<string, string> = {
  location: "GHL_FIELD_LOCATION_CITY",
  revenueBand: "GHL_FIELD_ANNUAL_REVENUE",
  primaryOffer: "GHL_FIELD_PRIMARY_OFFER",
  activeChannels: "GHL_FIELD_CHANNELS_ACTIVE",
  audienceSize: "GHL_FIELD_AUDIENCE_SIZE",
  biggestProblem: "GHL_FIELD_WHATS_BROKEN",
  whatToFix: "GHL_FIELD_ONE_THING_TO_FIX",
  contentOpsPerson: "GHL_FIELD_OPERATOR_STATUS",
  canCommitDay: "GHL_FIELD_CAN_COMMIT_30_DAYS",
  operatorName: "GHL_FIELD_OPERATOR_NAME",
  opsPersonRole: "GHL_FIELD_OPS_PERSON_ROLE",
  blackoutDates: "GHL_FIELD_BLACKOUT_DATES",
  howDidYouHear: "GHL_FIELD_HOW_DID_YOU_HEAR",
};

/*
  The Slack alert shows a field only if that field is also written to GHL.
  Anything the form collects but does not store is worse than useless: it reads
  as captured, gets acted on, and is not there when you go back for it.
  Adding a question to the form therefore means adding a GHL field and an entry
  in the map above, or it does not appear in Slack either.
*/

/**
 * Australian mobiles arrive as "0400 000 000". GHL accepts a malformed number
 * without complaint and then silently fails to SMS it, so anything we cannot
 * confidently resolve is reported rather than sent as-is.
 */
export function toE164AU(raw: string): { phone: string; confident: boolean } {
  const input = (raw || "").trim();
  if (!input) return { phone: "", confident: true };

  if (input.startsWith("+")) {
    const digits = input.slice(1).replace(/\D/g, "");
    return { phone: digits ? `+${digits}` : "", confident: digits.length >= 8 };
  }

  let digits = input.replace(/\D/g, "");

  // 0011 is the Australian international dialling prefix, so what follows is
  // already a full international number.
  if (digits.startsWith("0011")) {
    const intl = digits.slice(4);
    return { phone: intl ? `+${intl}` : "", confident: intl.length >= 8 };
  }

  if (digits.startsWith("61") && digits.length >= 11) {
    return { phone: `+${digits}`, confident: true };
  }
  if (digits.startsWith("0") && digits.length === 10) {
    return { phone: `+61${digits.slice(1)}`, confident: true };
  }
  if (digits.length === 9 && digits.startsWith("4")) {
    return { phone: `+61${digits}`, confident: true };
  }

  return { phone: digits ? `+${digits}` : "", confident: false };
}

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    /*
      This endpoint is public, so anything can POST to it. Without this guard an
      empty or junk request writes a blank Notion row and fires a blank Slack
      alert, and one of those eventually looks real enough to waste time on.
      A genuine submission always has a name and an email; the form requires both.
    */
    if (!data.name?.trim() || !data.email?.trim()) {
      console.warn("Rejected submission with no name or email.");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name and email are required" }),
      };
    }

    const isApply = data.source === 'apply';
    const notionDbId = isApply ? NOTION_APPLY_DB : NOTION_BUILDER_DB;
    const kitTagId = isApply ? KIT_TAG_APPLY : KIT_TAG_BUILDER;

    const notionKey = process.env.NOTION_API_KEY;
    if (!notionKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Notion integration not configured" }),
      };
    }

    const activeChannels = (data.activeChannels || []).map((ch: string) => ({ name: ch }));

    const properties: Record<string, any> = {
      Name: { title: [{ text: { content: data.name || "" } }] },
      Company: { rich_text: [{ text: { content: data.company || "" } }] },
      Location: { rich_text: [{ text: { content: data.location || "" } }] },
      "Revenue Band": data.revenueBand ? { select: { name: data.revenueBand } } : undefined,
      "Primary Offer": { rich_text: [{ text: { content: data.primaryOffer || "" } }] },
      "Active Channels": { multi_select: activeChannels },
      "Audience Size": { rich_text: [{ text: { content: data.audienceSize || "" } }] },
      "Biggest Problem": data.biggestProblem ? { select: { name: data.biggestProblem } } : undefined,
      "What To Fix": { rich_text: [{ text: { content: data.whatToFix || "" } }] },
      "Content Ops Person": data.contentOpsPerson ? { select: { name: data.contentOpsPerson } } : undefined,
      "Operator Name": { rich_text: [{ text: { content: data.operatorName || "" } }] },
      "Ops Person Role": { rich_text: [{ text: { content: data.opsPersonRole || "" } }] },
      "How Did You Hear": { rich_text: [{ text: { content: data.howDidYouHear || "" } }] },
      "Can Commit Day": data.canCommitDay ? { select: { name: data.canCommitDay } } : undefined,
      "Blackout Dates": { rich_text: [{ text: { content: data.blackoutDates || "" } }] },
      "Comfortable With Filming": data.comfortableWithFilming ? { select: { name: data.comfortableWithFilming } } : undefined,
      "Why You Why Now": { rich_text: [{ text: { content: data.whyYouWhyNow || "" } }] },
      Status: { select: { name: "New" } },
    };

    if (data.website) properties.Website = { url: data.website };
    if (data.email) properties.Email = { email: data.email };
    if (data.phone) properties.Phone = { phone_number: data.phone };

    // Remove undefined values
    Object.keys(properties).forEach((key) => {
      if (properties[key] === undefined) delete properties[key];
    });

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: notionDbId },
        properties,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion API error:", err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to submit application" }),
      };
    }

    // Hand the application to GoHighLevel via the v2 contacts API.
    // The `applied` tag is what fires every downstream automation, and the
    // returned contact id is what Stripe payment links carry as
    // client_reference_id so a payment matches back to the right contact.
    // A GHL failure must never reach the applicant: the Notion row already
    // exists and the Slack alert still fires, so we degrade instead of erroring.
    let ghlContactId: string | null = null;
    let ghlDegraded = false;

    const ghlToken = process.env.GHL_TOKEN;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (ghlToken && ghlLocationId) {
      try {
        const [firstName, ...rest] = (data.name || "").trim().split(" ");
        const { phone, confident } = toE164AU(data.phone || "");
        if (data.phone && !confident) {
          console.error(
            `Phone "${data.phone}" could not be confidently normalised to E.164 (sending "${phone}"). SMS to this contact may silently fail.`
          );
        }

        const customFields: Array<{ id: string; value: string }> = [];
        const missingFieldEnv: string[] = [];

        for (const [key, envVar] of Object.entries(GHL_FIELD_ENV)) {
          const fieldId = process.env[envVar];
          const raw = key === "activeChannels"
            ? (data.activeChannels || []).join(", ")
            : data[key];
          const value = typeof raw === "string" ? raw.trim() : raw ? String(raw) : "";
          if (!value) continue;
          if (!fieldId) {
            missingFieldEnv.push(envVar);
            continue;
          }
          customFields.push({ id: fieldId, value });
        }

        if (missingFieldEnv.length) {
          console.error(
            "GHL custom field env vars not set, those answers were dropped:",
            missingFieldEnv.join(", ")
          );
        }

        // upsert, not create: a second application updates one contact
        // rather than leaving two half-complete records.
        const ghlRes = await fetch(`${GHL_API}/contacts/upsert`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ghlToken}`,
            Version: GHL_VERSION,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            locationId: ghlLocationId,
            firstName: firstName || "",
            lastName: rest.join(" "),
            email: data.email || "",
            phone,
            companyName: data.company || "",
            website: data.website || "",
            source: isApply ? "apply page" : "builder page",
            tags: ["applied"],
            customFields,
          }),
        });

        if (!ghlRes.ok) {
          ghlDegraded = true;
          console.error("GHL upsert returned", ghlRes.status, await ghlRes.text());
        } else {
          const ghlJson = await ghlRes.json();
          ghlContactId = ghlJson?.contact?.id || ghlJson?.id || null;
          if (!ghlContactId) {
            ghlDegraded = true;
            console.error("GHL upsert succeeded but returned no contact id:", JSON.stringify(ghlJson));
          }
        }
      } catch (ghlErr) {
        ghlDegraded = true;
        console.error("GHL upsert failed:", ghlErr);
      }
    } else {
      ghlDegraded = true;
      console.error("GHL_TOKEN or GHL_LOCATION_ID not set, skipping GHL sync.");
    }

    // Add to Kit (ConvertKit)
    const kitApiSecret = process.env.KIT_API_SECRET;
    if (kitApiSecret && data.email) {
      try {
        await fetch(`https://api.convertkit.com/v3/tags/${kitTagId}/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_secret: kitApiSecret,
            email: data.email,
            first_name: (data.name || '').split(' ')[0],
            fields: {
              company: data.company || '',
              business_type: data.primaryOffer || '',
              revenue: data.revenueBand || '',
              instagram: data.audienceSize || '',
              website: data.website || '',
              phone: data.phone || '',
            },
          }),
        });
      } catch (kitErr) {
        console.error('Kit subscription failed:', kitErr);
      }
    }

    // Send Slack notification
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      try {
        await fetch(slackWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            /*
              Plain labelled lines, one field per row. Every line that has a
              value is shown and every line that does not is dropped, so the
              alert is always readable at a glance without hunting.
            */
            text: [
              isApply ? '*New Apply Now Lead*' : '*New Brand Builder Day Application*',
              // Labels mirror the questions actually asked on /builder, in the
              // order the form asks them, so the alert reads like the form.
              `*Full name:* ${data.name || '-'}`,
              `*Email:* ${data.email || '-'}`,
              `*Mobile:* ${data.phone || '-'}`,
              `*Company:* ${data.company || '-'}`,
              data.website ? `*Website:* ${data.website}` : null,
              data.location ? `*Where are they based:* ${data.location}` : null,
              data.revenueBand ? `*Current annual revenue:* ${data.revenueBand}` : null,
              data.primaryOffer ? `*Primary offer and price point:* ${data.primaryOffer}` : null,
              data.activeChannels?.length
                ? `*Currently active on:* ${data.activeChannels.join(', ')}`
                : null,
              data.audienceSize
                ? `*${isApply ? 'Instagram' : 'Audience size per channel'}:* ${data.audienceSize}`
                : null,
              data.biggestProblem ? `*Most broken right now:* ${data.biggestProblem}` : null,
              data.whatToFix ? `*#1 thing to fix:* ${data.whatToFix}` : null,
              data.contentOpsPerson
                ? `*Someone to own content ops:* ${data.contentOpsPerson}${
                    data.operatorName
                      ? `: ${data.operatorName}`
                      : ''
                  }`
                : null,
              data.opsPersonRole ? `*Their role today:* ${data.opsPersonRole}` : null,
              data.canCommitDay ? `*Can commit a full day in 30:* ${data.canCommitDay}` : null,
              data.blackoutDates ? `*Blackout dates:* ${data.blackoutDates}` : null,
              data.howDidYouHear ? `*How they heard:* ${data.howDidYouHear}` : null,
            ].filter(Boolean).join('\n'),
          }),
        });
      } catch (slackErr) {
        console.error('Slack notification failed:', slackErr);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        ok: true,
        contactId: ghlContactId,
        ...(ghlDegraded ? { degraded: true } : {}),
      }),
    };
  } catch (err) {
    console.error("Builder application error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};

export { handler };
