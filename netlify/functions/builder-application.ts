import type { Handler } from "@netlify/functions";

const NOTION_DATABASE_ID = "f8cdb64d3910451b9607600fb326bf6e";

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
        parent: { database_id: NOTION_DATABASE_ID },
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
