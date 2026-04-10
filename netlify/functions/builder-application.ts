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

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const data = JSON.parse(event.body || "{}");
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
      "Ops Person Role": { rich_text: [{ text: { content: data.opsPersonRole || "" } }] },
      "Can Commit Day": data.canCommitDay ? { select: { name: data.canCommitDay } } : undefined,
      "Blackout Dates": { rich_text: [{ text: { content: data.blackoutDates || "" } }] },
      "Comfortable With Filming": data.comfortableWithFilming ? { select: { name: data.comfortableWithFilming } } : undefined,
      "Why You Why Now": { rich_text: [{ text: { content: data.whyYouWhyNow || "" } }] },
      Status: { select: { name: "New" } },
    };

    if (data.website) properties.Website = { url: data.website };
    if (data.email) properties.Email = { email: data.email };

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
              phone: data.location || '',
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
            text: `*New ${isApply ? 'Apply Now Lead' : 'Builder Application'}*\n*Name:* ${data.name || 'N/A'}\n*Email:* ${data.email || 'N/A'}\n*Business:* ${data.company || 'N/A'}\n*Type:* ${data.primaryOffer || 'N/A'}\n*Instagram:* ${data.audienceSize || 'N/A'}\n*Website:* ${data.website || 'N/A'}\n*Revenue:* ${data.revenueBand || 'N/A'}\n*Phone:* ${data.location || 'N/A'}`,
          }),
        });
      } catch (slackErr) {
        console.error('Slack notification failed:', slackErr);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
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
