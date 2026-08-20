import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, getContact, addTags } from "./_ghl";

/*
  The people who have applied, and one button to invite them into the 90 days.

  The morning-after Slack nudge already does this, but only the morning after.
  A decision made a fortnight later, or one that was scrolled past, had nowhere
  to go except finding the contact in GHL and remembering which tag fires the
  invitation. That is the kind of step that quietly stops happening.

  So the same action gets a page. It sets `install-invited`, exactly what the
  Slack link sets, which fires the 90 Day Install Invite workflow. One tag, one
  meaning, two ways to reach it.

  The secret never leaves the server. The Slack link carries DECIDE_SECRET in
  the URL because it has to survive being pasted into a phone; this does not,
  so the tagging happens here and the page only ever sends a contact id.

  Gated by the same basic auth as /ladder and /health: it lists client names and
  can send an invitation to a $15,000 programme.
*/

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

const INVITE_TAG = "install-invited";

/* What the buttons mean, in the order someone moves through them. Later tags
   win, so a signed client never reads as merely applied. */
function stateOf(tags: string[]): string {
  if (tags.includes("install-signed")) return "Signed the 90 Day";
  if (tags.includes("install-invited")) return "Invited";
  if (tags.includes("brand-day-confirmed")) return "Brand Day booked and paid";
  if (tags.includes("brand-day-paid")) return "Paid, no date yet";
  if (tags.includes("invited")) return "Invited to a Brand Day";
  if (tags.includes("applied")) return "Applied";
  return "Started an application";
}

const handler: Handler = async (event) => {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "GHL is not configured" }) };
  }

  /* Send the invitation. */
  if (event.httpMethod === "POST") {
    try {
      const { contactId } = JSON.parse(event.body || "{}");
      if (!contactId) {
        return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "No contact" }) };
      }

      /*
        Refuse to invite twice. The tag is what fires the workflow, so a second
        press would send a second invitation to somebody who already has one,
        and the button gives no clue that it already worked.
      */
      const contact = await getContact(token, contactId);
      if (!contact) {
        return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "Contact not found" }) };
      }
      if ((contact.tags || []).includes(INVITE_TAG)) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ ok: false, error: "Already invited, so nothing was sent again" }),
        };
      }

      const tagged = await addTags(token, contactId, [INVITE_TAG]);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(
          tagged
            ? { ok: true, state: stateOf([...(contact.tags || []), INVITE_TAG]) }
            : { ok: false, error: "GHL refused the tag, so no invitation was sent" }
        ),
      };
    } catch (err) {
      console.error("clients invite failed:", err);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "Could not reach GHL" }) };
    }
  }

  /* List everyone who has applied. */
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
        pageLimit: 100,
        filters: [{ field: "tags", operator: "contains", value: "applied" }],
        sort: [{ field: "dateAdded", direction: "desc" }],
      }),
    });

    if (!res.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: false, error: `GHL returned ${res.status}` }),
      };
    }

    const contacts = ((await res.json())?.contacts || []).map((c: Record<string, any>) => {
      const tags: string[] = c.tags || [];
      return {
        id: c.id,
        name: [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || c.contactName || c.email || "Unnamed",
        email: c.email || "",
        company: c.companyName || "",
        addedAt: c.dateAdded || "",
        state: stateOf(tags),
        invited: tags.includes(INVITE_TAG),
      };
    });

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, contacts }) };
  } catch (err) {
    console.error("clients list failed:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "Could not reach GHL" }) };
  }
};

export { handler };
