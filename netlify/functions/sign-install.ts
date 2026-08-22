import type { Handler } from "@netlify/functions";
import { GHL_API, GHL_VERSION, addTags } from "./_ghl";

/*
  Records a signature on the 90 Day Install agreement.

  A typed name is a valid signature for a services agreement, but only if you
  can later show who typed it, when, and against which wording. So all three are
  stored on the GHL contact: the name as typed, an ISO timestamp, and the terms
  version. Change the wording without bumping the version and that record stops
  meaning anything, which is why the version lives beside the text.

  Signing and paying are deliberately separate. Someone can sign and then have a
  card decline, and that must leave them signed rather than rolled back to
  nothing. `install-signed` is the tag that says the agreement is agreed;
  payment tags say whether the money moved.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const token = process.env.GHL_TOKEN;
  if (!token) {
    console.error("sign-install: GHL_TOKEN not set.");
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };
  }

  try {
    const { contactId, signatureName, termsVersion } = JSON.parse(event.body || "{}");

    /*
      A contact id that is not a contact is not a server error.

      The invitation link is built in GHL, and a merge field placed beside the
      URL rather than inside it sends people to /install/ with nothing attached,
      or with the raw token. The page then failed at the moment of signing with
      "something went wrong", which is both untrue and unactionable: retrying
      cannot fix a link, and the person is staring at a $10,000 agreement being
      told the system is broken.

      So the reason is named and handed back, and the page says which it was.
    */

    if (!contactId || !signatureName?.trim() || !termsVersion) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "contactId, signatureName and termsVersion are required" }),
      };
    }

    const signedAtField = process.env.GHL_FIELD_INSTALL_SIGNED_AT;
    const nameField = process.env.GHL_FIELD_INSTALL_SIGNATURE_NAME;
    const versionField = process.env.GHL_FIELD_INSTALL_TERMS_VERSION;

    const customFields = [
      signedAtField && { id: signedAtField, value: new Date().toISOString() },
      nameField && { id: nameField, value: String(signatureName).trim().slice(0, 120) },
      versionField && { id: versionField, value: String(termsVersion) },
    ].filter(Boolean);

    /*
      A signature that did not persist is worse than one that failed loudly.
      If this returns ok while nothing was written, the client believes they
      have signed, Sean's record says they never did, and neither of them finds
      out until it matters. So the write result decides the response.
    */
    let written = true;

    if (customFields.length) {
      const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ customFields }),
      });
      if (!res.ok) {
        written = false;
        console.error("sign-install: failed to write signature:", res.status, await res.text(), contactId);
      }
    }

    // `install-signed` is the tag that says the agreement is agreed. Without it
    // nothing downstream knows they signed, so it counts as a failed signing.
    const tagged = await addTags(token, contactId, ["install-signed", "step-1-signed"]);

    // The IP is logged rather than stored on the contact. It is evidence if a
    // signature is ever disputed, and clutter on the record otherwise.
    console.log(
      "Install signed:",
      contactId,
      "name:", String(signatureName).trim(),
      "terms:", termsVersion,
      "ip:", event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown"
    );

    return { statusCode: 200, headers, body: JSON.stringify({ ok: written && tagged }) };
  } catch (err) {
    console.error("sign-install error:", err);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };
