import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTION_DATABASE_ID = "5b5bb79f4c3c4b1582099aa832b2121f";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, resource } = await req.json();

    if (!name || !email || !resource) {
      return new Response(
        JSON.stringify({ error: "Name, email, and resource are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const notionKey = Deno.env.get("NOTION_API_KEY");
    if (!notionKey || !NOTION_DATABASE_ID) {
      return new Response(
        JSON.stringify({ error: "Notion integration not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for duplicate email
    const dupeCheck = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "Email", email: { equals: email } },
          page_size: 1,
        }),
      }
    );

    if (dupeCheck.ok) {
      const dupeData = await dupeCheck.json();
      if (dupeData.results && dupeData.results.length > 0) {
        // Existing lead — update the resource list
        const existingPageId = dupeData.results[0].id;
        const existingResources = dupeData.results[0].properties?.Resources?.multi_select || [];
        const alreadyHas = existingResources.some((r: any) => r.name === resource);

        if (!alreadyHas) {
          await fetch(`https://api.notion.com/v1/pages/${existingPageId}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${notionKey}`,
              "Notion-Version": "2022-06-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                Resources: {
                  multi_select: [
                    ...existingResources,
                    { name: resource },
                  ],
                },
              },
            }),
          });
        }

        return new Response(
          JSON.stringify({ success: true, existing: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // New lead
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
          Name: { title: [{ text: { content: name } }] },
          Email: { email: email },
          Resources: { multi_select: [{ name: resource }] },
          Source: { select: { name: "Authority Engine" } },
          Status: { select: { name: "New" } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion API error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Resource lead error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
