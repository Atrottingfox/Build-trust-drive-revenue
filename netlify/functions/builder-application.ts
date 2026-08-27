import type { Handler } from "@netlify/functions";

/* The tag the GHL confirmation workflow listens for. Cycled on every
   application so a repeat applicant still gets an email. Nothing else may
   depend on this tag: it exists only to fire the workflow. */
const CONFIRMATION_TRIGGER_TAG = "application-received";

const NOTION_BUILDER_DB = "f8cdb64d3910451b9607600fb326bf6e";
const NOTION_APPLY_DB = "ef00b2eb6dfb825da88101e3c99717d0";


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

/*
  `ctaSource` is read from a ?src= parameter, so it is whatever was in the URL.
  It reaches a GHL contact record and a Slack message, and neither should ever
  be handed raw user input: a long string bloats the CRM field and Slack
  control characters can reshape the alert Sean reads to triage applicants.

  The CTA labels this is meant to carry are all short kebab-case slugs, so
  anything outside that is not a lost measurement, it is noise.
*/
export function cleanCtaSource(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 64);
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
    /*
      The Operator Intensive is a separate offer at a separate price, so it gets
      its own Slack alert and its own GHL tag. It deliberately does NOT reuse the
      builder or apply Notion database: those two feed Brand Builder Day triage,
      and mixing a 30k Intensive application into that queue makes both harder to
      read. Its Notion database is optional and read from an env var, so the
      endpoint works the moment it is deployed and starts writing to Notion later
      if Sean creates one.
    */
    const isOperator = data.source === 'operator-intensive';

    const notionDbId = isOperator
      ? (process.env.NOTION_OPERATOR_DB || '')
      : isApply
        ? NOTION_APPLY_DB
        : NOTION_BUILDER_DB;

    const notionKey = process.env.NOTION_API_KEY;
    /*
      For builder and apply a missing Notion config is fatal: Notion IS the queue,
      and a silent success would lose the application. For the Operator Intensive
      Slack is the queue, so a missing database degrades instead of failing.
    */
    if (!notionKey && !isOperator) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Notion integration not configured" }),
      };
    }
    const writeNotion = Boolean(notionKey && notionDbId);
    if (isOperator && !writeNotion) {
      console.warn(
        "Operator Intensive application received with no NOTION_OPERATOR_DB set. Slack and GHL still fire; nothing was written to Notion."
      );
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

    /*
      Has this person applied before?

      Notion gets a new row per application rather than an update, so it is the
      application log: the six week old attempt is still there with what they
      said at the time. Nothing surfaced it though, so a repeat applicant read
      as a first timer and the earlier context was only found by scrolling.

      Asked before the new row is written, so the count describes their history
      rather than including the row we are about to add.
    */
    let history = "";
    if (writeNotion && data.email) {
      try {
        const prior = await fetch(`https://api.notion.com/v1/databases/${notionDbId}/query`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionKey}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: { property: "Email", email: { equals: data.email } },
            sorts: [{ timestamp: "created_time", direction: "ascending" }],
            page_size: 100,
          }),
        });
        if (prior.ok) {
          const rows = (await prior.json())?.results || [];
          if (rows.length) {
            const firstAt = new Date(rows[0].created_time);
            const days = Math.round((Date.now() - firstAt.getTime()) / 86400000);
            const when = days < 1 ? "today" : days === 1 ? "yesterday" : `${days} days ago`;
            history = `applied ${rows.length} time${rows.length > 1 ? "s" : ""} before, first ${when} (${firstAt.toISOString().slice(0, 10)})`;
          }
        }
      } catch (err) {
        console.error("Prior application lookup failed:", err);
      }
    }

    if (writeNotion) {
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
        // Same reasoning as the config check above: Notion is the queue for
        // builder and apply, but not for the Operator Intensive.
        if (!isOperator) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to submit application" }),
          };
        }
      }
    }

    // Hand the application to GoHighLevel via the v2 contacts API.
    // The `applied` tag is what fires every downstream automation, and the
    // returned contact id is what Stripe payment links carry as
    // client_reference_id so a payment matches back to the right contact.
    // A GHL failure must never reach the applicant: the Notion row already
    // exists and the Slack alert still fires, so we degrade instead of erroring.
    let ghlContactId: string | null = null;
    let ghlDegraded = false;
    /*
      Why the CRM write ended up how it did, in words, for the Slack alert.

      Every GHL failure so far has been written to a function log nobody reads
      and returned in an HTTP response nobody sees. Meanwhile the alert said
      "new application" and looked entirely healthy. Diagnosing the missing
      `applied` tag took an afternoon of probing the live CRM by hand, purely
      because the one message a human actually reads never mentioned it.
    */
    let ghlOutcome = "not attempted";

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

        const ghlAuth = {
          Authorization: `Bearer ${ghlToken}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        const pageSource = isOperator
          ? "operator intensive page"
          : isApply ? "apply page" : "builder page";
        const cleanSource = cleanCtaSource(data.ctaSource);
        const source = cleanSource ? `${pageSource} (${cleanSource})` : pageSource;

        const body = {
          locationId: ghlLocationId,
          firstName: firstName || "",
          lastName: rest.join(" "),
          email: data.email || "",
          phone,
          companyName: data.company || "",
          website: data.website || "",
          source,
          customFields,
        };

        /*
          Deliberately NOT /contacts/upsert.

          GHL's upsert matches on phone as well as email, and the match wins
          silently. Two applicants sharing an office number, or one mistyping a
          digit into someone else's, and the second application overwrites the
          first: name, email, answers, all of it. The lost application never
          shows up as an error because the write succeeds.

          Email is the identity here. Look the contact up by email, update that
          exact id if it exists, create a new one if it does not. A shared phone
          number can then never clobber anybody.
        */
        let existingId: string | null = null;
        if (data.email) {
          try {
            const lookup = await fetch(
              `${GHL_API}/contacts/?locationId=${encodeURIComponent(ghlLocationId)}&query=${encodeURIComponent(data.email)}`,
              { headers: ghlAuth }
            );
            if (lookup.ok) {
              const found = (await lookup.json())?.contacts || [];
              const match = found.find(
                (c: any) => (c?.email || "").toLowerCase() === String(data.email).toLowerCase()
              );
              existingId = match?.id || null;
            }
          } catch (lookupErr) {
            console.error("GHL email lookup failed, will create:", lookupErr);
          }
        }

        const putContact = (id: string, payload: Record<string, unknown>) =>
          fetch(`${GHL_API}/contacts/${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: ghlAuth,
            // locationId is rejected on update.
            body: JSON.stringify({ ...payload, locationId: undefined }),
          });

        const postContact = (payload: Record<string, unknown>) =>
          fetch(`${GHL_API}/contacts/`, { method: "POST", headers: ghlAuth, body: JSON.stringify(payload) });

        let ghlRes = existingId ? await putContact(existingId, body) : await postContact(body);

        /*
          This sub-account refuses duplicates, and it decides what counts as one.
          A 400 here says the details belong to somebody already, and GHL is good
          enough to say who and on which field.

          Phone collision is the dangerous one. Two founders in the same office,
          or one digit mistyped into a stranger's number, and this application
          cannot be created at all. Losing it is not acceptable, so it is
          retried without the phone and flagged for Sean to merge by hand. A
          contact missing a mobile is a small problem. A silently lost $5,000
          application is not.
        */
        let phoneCollision = false;
        /*
          GHL names the contact in its duplicate error. Holding onto that id
          matters more than whether the write itself recovered: without an id
          the tagging below is skipped, and the tagging is what fires every
          downstream automation. An application that lands in Notion but never
          tags the contact is invisible to the CRM.
        */
        let knownContactId: string | null = null;
        if (!ghlRes.ok && ghlRes.status === 400) {
          const raw = await ghlRes.text();
          let meta: any = {};
          try {
            meta = JSON.parse(raw)?.meta || {};
          } catch {
            // Not the duplicate shape. Handled as a plain failure below.
          }
          if (meta.contactId) knownContactId = meta.contactId;

          if (meta.matchingField === "email" && meta.contactId) {
            // Our lookup missed it. Update the contact GHL just named.
            console.warn("GHL duplicate on email, updating", meta.contactId);
            ghlRes = await putContact(meta.contactId, body);
            if (ghlRes.ok) existingId = meta.contactId;
          } else if (meta.matchingField === "phone") {
            phoneCollision = true;
            console.error(
              "GHL phone collision: this number already belongs to",
              meta.contactId,
              `(${meta.contactName}).`,
              "Creating without the phone so the application is not lost. Merge by hand:",
              data.email
            );
            ghlRes = await postContact({ ...body, phone: "" });
          } else {
            console.error("GHL contact write returned 400:", raw);
          }
        }

        if (!ghlRes.ok) {
          ghlDegraded = true;
          const failText = await ghlRes.text();
          ghlOutcome = `contact write failed ${ghlRes.status}: ${failText.slice(0, 140)}`;
          console.error("GHL contact write returned", ghlRes.status, failText);
          /* The details may not have saved, but we know who they are, so the
             tags below still run and the automations still fire. */
          ghlContactId = knownContactId;
        } else {
          const ghlJson = await ghlRes.json();
          ghlContactId = ghlJson?.contact?.id || ghlJson?.id || existingId || knownContactId || null;
          if (!ghlContactId) {
            ghlDegraded = true;
            console.error("GHL contact write succeeded but returned no id:", JSON.stringify(ghlJson));
          }
        }

        // Flagged rather than buried in a log, because it needs a human merge.
        if (phoneCollision && ghlContactId) {
          await fetch(`${GHL_API}/contacts/${encodeURIComponent(ghlContactId)}/tags`, {
            method: "POST",
            headers: ghlAuth,
            body: JSON.stringify({ tags: ["duplicate-phone"] }),
          }).catch(() => {
            /* The application is saved. The flag is a nicety. */
          });
        }

        /*
          `application-started` is put on by the abandoned-application capture
          the moment someone types a usable email. It means "began, did not
          finish", and it is what the follow up list is built from.

          Submitting is exactly the event that stops being true. It was never
          cleared though, so finished applicants sat in the unfinished list
          forever, and the CRM could not tell the two apart.

          So the state moves: `application-started` off, `applied` on.

          `applied` itself is only ever added, never cycled. Filters, smart
          lists and the delivery check all read it, and removing it even for a
          moment has already stripped a real applicant out of every one of them
          when two submissions overlapped. Re-firing for a repeat applicant is
          the trigger tag's job, further down, precisely so this one can stay
          still.
        */
        if (ghlContactId) {
          const tagUrl = `${GHL_API}/contacts/${encodeURIComponent(ghlContactId)}/tags`;

          await fetch(tagUrl, {
            method: "DELETE",
            headers: ghlAuth,
            body: JSON.stringify({ tags: ["application-started"] }),
          }).catch(() => {
            /* Not there, which is fine: they never abandoned one. */
          });

          const tags = isOperator ? ["applied", "operator-intensive"] : ["applied"];
          const tagRes = await fetch(tagUrl, {
            method: "POST",
            headers: ghlAuth,
            body: JSON.stringify({ tags }),
          });
          if (!tagRes.ok) {
            ghlDegraded = true;
            const tagText = await tagRes.text();
            ghlOutcome = `tagging failed ${tagRes.status}: ${tagText.slice(0, 140)}`;
            console.error("GHL tagging failed:", tagRes.status, tagText, ghlContactId);
          } else {
            ghlOutcome = "tagged applied";
          }
        } else {
          ghlDegraded = true;
          ghlOutcome = "no contact id, so nothing was tagged and no automation fired";
          console.error("No GHL contact id, so nothing was tagged. No automation will fire for", data.email);
        }

      } catch (ghlErr) {
        ghlDegraded = true;
        ghlOutcome = `threw before tagging: ${String(ghlErr).slice(0, 140)}`;
        console.error("GHL upsert failed:", ghlErr);
      }
    } else {
      ghlDegraded = true;
      console.error("GHL_TOKEN or GHL_LOCATION_ID not set, skipping GHL sync.");
    }

    /*
      The confirmation is sent by GHL, triggered by a tag. That is the right
      shape: the email lives in a workflow Sean can edit, not in this code.

      The catch is that GHL fires "tag added" only when the tag is genuinely
      added. Re-adding one a contact already carries does nothing, so a repeat
      applicant got silence.

      `applied` cannot be cycled to work around that. It is a state tag: filters,
      smart lists and the delivery check all read it, and removing it even
      briefly has already lost a real applicant when two submissions overlapped.

      So the trigger is its own tag. `application-received` means nothing except
      "an application just arrived", nothing filters on it, and it is removed and
      re-added on every submission so the workflow fires every time. If the race
      drops it for a moment, nothing anywhere cares.
    */
    let confirmation: string;
    if (isOperator) {
      confirmation = 'n/a (Operator Intensive is answered personally)';
    } else if (!ghlContactId || !ghlToken) {
      confirmation = 'NOT TRIGGERED: no GHL contact to tag';
    } else {
      const tagUrl = `${GHL_API}/contacts/${encodeURIComponent(ghlContactId)}/tags`;
      const auth = {
        Authorization: `Bearer ${ghlToken}`,
        Version: GHL_VERSION,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      try {
        /* Clear it first so the add below is a real transition, not a no-op. */
        await fetch(tagUrl, {
          method: 'DELETE',
          headers: auth,
          body: JSON.stringify({ tags: [CONFIRMATION_TRIGGER_TAG] }),
        }).catch(() => {
          /* First application, nothing to clear. The add still fires. */
        });

        const res = await fetch(tagUrl, {
          method: 'POST',
          headers: auth,
          body: JSON.stringify({ tags: [CONFIRMATION_TRIGGER_TAG] }),
        });
        confirmation = res.ok ? 'triggered' : `FAILED: GHL returned ${res.status}`;
        if (!res.ok) {
          console.error('Confirmation trigger tag failed:', res.status, await res.text());
        }
      } catch (err) {
        confirmation = 'FAILED: could not reach GHL';
        console.error('Confirmation trigger tag failed:', err);
      }
    }

    // Send Slack notification
    const slackWebhook = process.env.SLACK_WEBHOOK_APPLICATIONS || process.env.SLACK_WEBHOOK_URL;
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
            text: (isOperator ? [
              ':rotating_light: *New OPERATOR INTENSIVE Application* (30k)',
              `*Full name:* ${data.name || '-'}`,
              `*Email:* ${data.email || '-'}`,
              `*Mobile:* ${data.phone || '-'}`,
              `*Company:* ${data.company || '-'}`,
              data.website ? `*Website / Instagram:* ${data.website}` : null,
              data.revenueBand ? `*Current annual revenue:* ${data.revenueBand}` : null,
              data.contentOpsPerson ? `*Who owns media today:* ${data.contentOpsPerson}` : null,
              data.whatToFix ? `*What the Operator must own:* ${data.whatToFix}` : null,
            ] : [
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
              data.howDidYouHear ? `*How they heard:* ${data.howDidYouHear}` : null,
              /* Repeat applicants used to look like first timers. Their earlier
                 attempt is in Notion; this says it is there and how old. */
              history ? `:repeat: *Applied before:* ${history}` : null,
              /* The CRM half of the alert. Silence here is what let a missing
                 `applied` tag survive for eight days. */
              ghlDegraded ? `:rotating_light: *CRM:* ${ghlOutcome}` : null,
              /* Straight to the person, so acting on this is one click rather
                 than a search in GHL for a name they may have typed oddly. */
              ghlContactId
                ? `<https://app.gohighlevel.com/v2/location/${ghlLocationId}/contacts/detail/${ghlContactId}|Open ${data.name || "them"} in GHL>`
                : null,
              /* Never assume the applicant was emailed. Say so either way. */
              confirmation === 'triggered'
                ? null
                : `:warning: *Confirmation email:* ${confirmation}`,
              /* Which button on which page started this. Set by the ?src= param
                 the CTAs carry, so "how they heard" stays their words and this
                 stays the measured answer. */
              cleanCtaSource(data.ctaSource) ? `*Came from:* ${cleanCtaSource(data.ctaSource)}` : null,
              /*
                The invitation link, ready to paste, and only for /builder.

                /builder no longer hands anyone the date-and-payment page. Sean
                accepts first, then sends this link himself. So the alert has to
                carry it, or accepting someone means going and finding their
                contact id in GHL by hand.

                The ?c= is the whole point: payments are matched on contact id,
                never on email, because a personal address applies and a company
                card pays. Without an id there is no link worth pasting, so the
                line is dropped rather than shown broken.
              */
              !isApply && ghlContactId
                ? `\n:white_check_mark: *Accept and send:* https://authorityengine.com.au/lock-in?c=${encodeURIComponent(ghlContactId)}`
                : null,
            ]).filter(Boolean).join('\n'),
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
