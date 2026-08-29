import type { Handler } from "@netlify/functions";

/*
  How many Brand Days are left at the founding price.

  This is a public promise on /lock-in ("18 of 20 Days left at 5,000 AUD, after
  that the price goes to 10,000"), so it has to be true. It used to be two
  constants in the page, which meant every Day delivered needed a code change to
  keep the number honest. Nobody remembers to do that, and a stale scarcity
  count is worse than none.

  So it is counted from GHL instead. A Day is spent the moment somebody pays,
  not when they later pick a date: the money is in and the Day is sold, so the
  number has to move straight away. Counting the booking instead left the page
  advertising a Day that was already gone for as long as it took somebody to
  open their calendar.

  DAYS_ALREADY_RUN covers the ones delivered before this system existed, since
  those contacts were never tagged.

  Falls back to the configured total rather than showing nothing. A slightly
  generous number beats a broken page, and it is logged so it can be spotted.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=60",
  "Content-Type": "application/json",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const handler: Handler = async () => {
  const total = Number(process.env.DAYS_TOTAL_AT_PRICE) || 20;
  const alreadyRun = Number(process.env.DAYS_ALREADY_RUN) || 0;
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  const fallback = { total, remaining: Math.max(0, total - alreadyRun), counted: false };

  if (!token || !locationId) {
    return { statusCode: 200, headers, body: JSON.stringify(fallback) };
  }

  try {
    const res = await fetch(`${GHL_API}/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        filters: [{ field: "tags", operator: "contains", value: "brand-day-paid" }],
        pageLimit: 100,
      }),
    });

    if (!res.ok) {
      console.error("days-remaining: GHL search failed:", res.status, await res.text());
      return { statusCode: 200, headers, body: JSON.stringify(fallback) };
    }

    /*
      A test contact walking the funnel must not spend one of the twenty. The
      search returns them like anybody else, so they are counted out here rather
      than trusted to be cleaned up afterwards.
    */
    const paidContacts = (await res.json())?.contacts || [];
    const sold = paidContacts.filter(
      (c: any) => !((c?.tags || []).includes("zz-test"))
    ).length;
    const remaining = Math.max(0, total - alreadyRun - sold);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ total, remaining, counted: true, sold, alreadyRun }),
    };
  } catch (err) {
    console.error("days-remaining error:", err);
    return { statusCode: 200, headers, body: JSON.stringify(fallback) };
  }
};

export { handler };
