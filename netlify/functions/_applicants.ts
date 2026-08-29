/*
  Who counts as somebody who actually applied.

  This existed as the same three lines copied into the health check and into
  self-heal, and the three lines were wrong in a way that mattered twice over.

  The application form creates a contact on a debounce while somebody is still
  typing, so opening it and walking away leaves a real record with the source
  "builder page, started" and no `applied` tag. Both callers tested only that
  the source mentioned builder or apply, so an abandoned form read as a
  completed application.

  The health check then said APPLIED AND RECEIVED NOTHING, hourly, for somebody
  who had not applied and was right not to have been emailed. An alert that
  means "money on the floor" stops being read the moment it cries wolf.

  Worse, self-heal acted on the same misreading: it tagged them
  `application-received`, which fires the confirmation workflow. Somebody who
  abandoned the form halfway could be thanked for an application they never
  submitted.

  `applied` is the honest signal and is written only on a real submission. The
  source check is kept as a fallback, minus the started case, because it was
  added after a real applicant lost their tag to a race. That race is fixed and
  guarded by a test, so this is belt and braces rather than the main answer.
*/

/* Written by application-started.ts, always with this prefix. */
const STARTED_SOURCE = /^builder page, started/i;

export function isRealApplicant(contact: any): boolean {
  const tags: string[] = contact?.tags || [];
  if (tags.includes("applied")) return true;

  const source = String(contact?.source || "");
  if (!/builder|apply/i.test(source)) return false;

  /* Started and never finished. Nothing is owed to them, and nothing should be
     sent to them. */
  if (STARTED_SOURCE.test(source)) return false;

  return true;
}

/* The monitoring writes real contacts by design and neither is a person. */
export function isMonitoring(contact: any): boolean {
  const email = String(contact?.email || "").toLowerCase();
  if (email.startsWith("zz-") || email.startsWith("zzcard")) return true;
  return (contact?.tags || []).includes("zz-healthcheck");
}
