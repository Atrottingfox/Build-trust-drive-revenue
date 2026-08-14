/*
  Shared GHL helpers.

  The Brand Day is only really secured when two separate things have happened:
  a date has been chosen in Calendly, and $5,000 has cleared in Stripe. They
  happen in that order on the page, but either can fail on its own, and the
  browser that does one may never do the other.

  So rather than infer the combined state from a compound filter in every
  workflow, the state is written as tags:

    brand-day-booked      a date is chosen
    brand-day-paid        the money cleared
    booked-no-payment     a date is held with nothing paid  (the recovery state)
    brand-day-confirmed   both are true                     (the go signal)

  Whichever of the two events lands second calls `reconcile`, which is what
  applies `brand-day-confirmed` and clears `booked-no-payment`. Order does not
  matter, and re-running it is harmless.
*/

export const GHL_API = "https://services.leadconnectorhq.com";
export const GHL_VERSION = "2021-07-28";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

export async function getTags(token: string, contactId: string): Promise<string[]> {
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}`, {
      headers: authHeaders(token),
    });
    if (!res.ok) return [];
    return (await res.json())?.contact?.tags || [];
  } catch {
    return [];
  }
}

export async function addTags(token: string, contactId: string, tags: string[]): Promise<boolean> {
  if (!tags.length) return true;
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ tags }),
    });
    if (!res.ok) console.error("GHL addTags failed:", res.status, await res.text(), contactId);
    return res.ok;
  } catch (err) {
    console.error("GHL addTags error:", err, contactId);
    return false;
  }
}

export async function removeTags(token: string, contactId: string, tags: string[]): Promise<void> {
  if (!tags.length) return;
  try {
    const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "DELETE",
      headers: authHeaders(token),
      body: JSON.stringify({ tags }),
    });
    if (!res.ok) console.error("GHL removeTags failed:", res.status, await res.text(), contactId);
  } catch (err) {
    console.error("GHL removeTags error:", err, contactId);
  }
}

/*
  Call after either half lands. Reads the contact back rather than trusting what
  this request thinks it knows, because the other half may have been done in a
  different browser, on a different day.
*/
export async function reconcile(token: string, contactId: string): Promise<{
  booked: boolean;
  paid: boolean;
  confirmed: boolean;
}> {
  const tags = await getTags(token, contactId);
  const booked = tags.includes("brand-day-booked");
  const paid = tags.includes("brand-day-paid");

  if (booked && paid) {
    if (!tags.includes("brand-day-confirmed")) {
      await addTags(token, contactId, ["brand-day-confirmed"]);
    }
    if (tags.includes("booked-no-payment")) {
      await removeTags(token, contactId, ["booked-no-payment"]);
    }
    return { booked, paid, confirmed: true };
  }

  // A date held with nothing paid. This is the one worth chasing.
  if (booked && !paid && !tags.includes("booked-no-payment")) {
    await addTags(token, contactId, ["booked-no-payment"]);
  }

  return { booked, paid, confirmed: false };
}
