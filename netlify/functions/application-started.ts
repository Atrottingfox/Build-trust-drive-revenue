import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION } from "./_ghl";
import { toE164AU, cleanCtaSource } from "./builder-application";

/*
  Captures someone who starts the Brand Builder Day application and does not
  finish it.

  Before this, a contact only existed once the whole form validated. Someone who
  typed their name and email and then stalled on question nine left nothing
  behind at all, so there was no way to answer "how many people start this and
  drop, and where".

  This fires once, as soon as there is a usable name and email, and tags
  `application-started`. The full submit later upserts the same contact and adds
  `applied`.

  So the abandoned application list is exactly:

      has `application-started` AND does not have `applied`

  Built as its own endpoint rather than a flag on builder-application because
  the fan-out is wrong for a partial. A half filled form must not write a Notion
  row, must not fire a Slack alert and must not subscribe anyone to Kit. It
  writes one contact and one tag, and nothing else.

  Deliberately quiet on failure. Nobody is waiting on this response and a
  partial capture that errors must never surface anything to someone who is
  still typing.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const ok = (body: Record<string, unknown> = {}) => ({
  statusCode: 200,
  headers,
  body: JSON.stringify({ ok: true, ...body }),
});

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("application-started: GHL_TOKEN or GHL_LOCATION_ID not set.");
    return ok({ captured: false });
  }

  try {
    const { name, email, phone, company, website, ctaSource } = JSON.parse(event.body || "{}");

    /*
      An email that cannot be contacted is not a lead, it is noise in the
      abandoned list. Anything that fails this check is dropped silently: they
      may still be mid-keystroke.
    */
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return ok({ captured: false });
    }

    const [firstName, ...rest] = String(name || "").trim().split(/\s+/);
    const { phone: e164 } = toE164AU(String(phone || ""));

    const res = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        firstName: firstName || "",
        lastName: rest.join(" "),
        email: cleanEmail,
        phone: e164,
        companyName: String(company || "").trim(),
        website: String(website || "").trim(),
        source: cleanCtaSource(ctaSource)
          ? `builder page, started (${cleanCtaSource(ctaSource)})`
          : "builder page, started",
        /*
          Only `application-started`. Adding `applied` here would make every
          abandoned form look like a finished application, which is the exact
          distinction this endpoint exists to draw.
        */
        tags: ["application-started"],
      }),
    });

    if (!res.ok) {
      console.error("application-started: GHL upsert returned", res.status, await res.text());
      return ok({ captured: false });
    }

    const json = await res.json();
    return ok({ captured: true, contactId: json?.contact?.id || json?.id || null });
  } catch (err) {
    console.error("application-started error:", err);
    return ok({ captured: false });
  }
};

export { handler };
