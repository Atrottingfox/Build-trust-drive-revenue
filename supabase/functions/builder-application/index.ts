import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTION_DATABASE_ID = "f8cdb64d3910451b9607600fb326bf6e";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data = await req.json();

    const notionKey = Deno.env.get("NOTION_API_KEY");
    if (!notionKey) {
      return new Response(
        JSON.stringify({ error: "Notion integration not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build active channels multi-select
    const activeChannels = (data.activeChannels || []).map((ch: string) => ({ name: ch }));

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: data.name || "" } }] },
          Company: { rich_text: [{ text: { content: data.company || "" } }] },
          Website: data.website ? { url: data.website } : { url: null },
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
          Email: data.email ? { email: data.email } : undefined,
          Status: { select: { name: "New" } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion API error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to submit application" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Builder application error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
