# authority-site - Status

_Serves authorityengine.com.au and theauthorityengine.live (Netlify site `9f3b9e93-b090-4217-b02a-11d827e57f55`). Both CLIENT FACING. Deploys by pushing to `main`._
_Updated 2026-08-13._

## Current focus

Wiring the Brand Builder Day application funnel into GoHighLevel, then building the GHL workflows. Secondary: the parked Undeniable templatisation.

---

## Built, not deployed

All of the following is uncommitted on branch `feat/client-templatise`. None of it is live.

- **GHL contact sync.** `netlify/functions/builder-application.ts` posts to the GHL v2 `POST /contacts/upsert`, tags `applied`, and returns `contactId` to the page. Replaces the old `GHL_WEBHOOK_URL` inbound webhook forward, which is gone.
- **E.164 phone normalisation.** `toE164AU()` in the same file. Verified against 12 real input shapes including `0400 000 000`, `(04) 1234 5678`, `+61`, landlines, and the `0011` international prefix. Anything it cannot confidently resolve is still sent but logged loudly.
- **Degraded mode.** A GHL failure returns `{ok: true, degraded: true}` and the applicant still reaches the thank you screen. Notion, Slack and ConvertKit all still fire.
- **Mobile field** on `/builder`, required, paired beside "Where are you based?" in a two column row.
- **Revenue bands changed** to `-1M` / `1-3M` / `3-10M` / `10M+`, question relabelled "Current annual revenue". Display labels stay readable ("Under $1M") while the stored values match GHL exactly.
- **`.gitignore`** now covers `.env` and `.env.*` explicitly.
- **`scripts/ghl-custom-fields.mjs`** re-fetches all GHL custom field IDs. Needs `GHL_TOKEN`.

## Deployed and live

- `/builder` and `/apply`, both posting to `builder-application.ts`, writing to two Notion DBs, Slack and ConvertKit. This is the version currently serving applicants and it has **none** of the above.

## Done in GoHighLevel (live, outside this repo)

Sub-account `B7IFxtiHwcLoDatUHVF6`.

- **All 12 funnel tags exist.** They already did; nothing was created. Extras present: `follow-up`, `high priority`, `warm lead`.
- **All 15 custom fields created 2026-08-13.** Verified dataTypes and dropdown options. IDs are in `.env.local` (gitignored) and re-fetchable with the script above.
- Snapshot of pre change state: `ghl-snapshot-customfields-20260813T2114.json` (was empty) and `ghl-snapshot-tags-20260813T2114.json`. Rollback is `DELETE /locations/B7IFxtiHwcLoDatUHVF6/customFields/<id>` for all 15.

## Blocked

- **Nothing is deployed.** Needs Sean's go ahead to commit and push. The branch also carries unrelated parked work (client templates, `Workshops.tsx`, `Offer.tsx`, `TestTemplate.tsx`, `src/clients/`).
- **Netlify env vars not set.** The function silently degrades until `GHL_TOKEN`, `GHL_LOCATION_ID` and the 11 `GHL_FIELD_*` vars are added. Full list in `.env.local`.
- **`GHL_WEBHOOK_URL` must be deleted** from Netlify env. It is no longer read.
- **Live path never tested end to end.** No application has been submitted through the new function.
- **WF6 and WF9 cannot be built** until a real Stripe payment is captured so the payload shape is known.
- **WF2 exists but is broken. Do not rebuild it, finish it.** It is the draft named **"Invitation Tag Automation"** (`/automation/workflow/9121e417-f276-49d1-8c0a-...`), built by GHL's AI on Aug 13 at 8:57 PM. The skeleton is right: trigger `Tag 'invited' Added`, then `Set Hold Expires Field`, `Move Opportunity to Invited Stage`, `Send Invitation Email`, END. Two actions carry red error badges:
  - `Set Hold Expires Field` has **no field selected**. The dropdown is empty. This is because the 15 custom fields were not created until 9:14 PM, 17 minutes AFTER the AI built this action, so `Hold expires` did not exist to pick. Select the field, then set the value to today + 7 days. The offset is the part the AI drops.
  - `Send Invitation Email` also badged, most likely empty content. Email 2 copy is in `~/Downloads/invite-gate-emails.md` under "2. The invitation". Compose it inline, no template library.
  - WF2 needs no `brand-day-paid` exit. It sends the invitation; WF3, WF7 and WF8 are the ones that chase.
- **The other draft, "Application Tag Workflow"** (Aug 13 8:22 PM), is WF1. Untouched, unverified. It was also built before the custom fields existed, so its Slack notification step is worth checking for the same empty reference problem.
- **Browser automation can see the GHL UI but cannot open a workflow.** Screenshots and navigation work. Clicking a workflow name, its external link icon and its three dot menu all do nothing, across two sessions. `read_page` and `find` return "Page script returned empty result" on this SPA. Workaround: navigate straight to the full workflow URL, which does work. The `workflows` API scope is still 401 so the definitions cannot be read that way.
- **No workflows have been built or modified.** Both drafts left untouched.
- **Search Console** still not submitted for either domain, so pages are not indexed.

## Decisions made, and why

| Decision | Why |
|---|---|
| GHL upsert lives inside `builder-application.ts`, not a new `apply.ts` | A second endpoint would split intake: GHL in one place, Notion/Slack/Kit in the other. One submit, one path, one triage queue. |
| The brief targeted `/builder`, not `/apply` | The brief said `/apply`, but its 13 field mapping table only exists on `/builder`. `/apply` is 9 flat fields. Confirmed with Sean before building. |
| `upsert`, never `create` | A second application updates one contact instead of leaving two half complete records. |
| Match on `client_reference_id`, never email | Someone applies from a personal address and pays on the company card. Email matching breaks the first time that happens. |
| Custom field IDs come from `GHL_FIELD_*` env vars | Never hardcoded, never guessed. A missing var skips that field and logs it rather than writing to a wrong ID. |
| Contact id stored in sessionStorage as `ae_contact_id` | Read it there to append `?client_reference_id=` to Stripe payment links. |
| Revenue bands changed to match GHL, rather than the reverse | The spec's bands and the form's bands shared nothing, so every submission would have dropped the value. The form's "monthly" label was also wrong: `$1M+` monthly is $12M/yr, well past the $1.5M to $5M ICP. |
| Operator status dropdown uses hyphens | `Builder.tsx` maps through `opsToNotion` before sending, so the wire values are `Yes full-time` / `Yes part-time` / `No`. GHL stores nothing when a value falls outside the option list. |
| Mobile, Company, Website are NOT custom fields | They are standard GHL contact fields (`phone`, `companyName`, `website`). Custom copies would duplicate them and split the data. 15 custom fields, not the 18 the spec listed. |
| GHL failure degrades, never errors | A founder who was ready to apply and sees a red error closes the tab and does not come back. |
| WF1's Slack step dropped, the function keeps Slack (2026-08-14) | Both fired on every application, so Sean got two alerts per applicant. The function's version already carries every field formatted. No effect on capture: the contact, its 11 custom fields and the `applied` tag are written by the `/contacts/upsert` call, not by any workflow. |

## Also parked in this repo

- Templatise the Undeniable page into a reusable client system (`feat/client-templatise`, 1 unpushed commit plus loose files).
- `/geronimo` page for Andrew Handoza / Geronimo Academy.

## Next actions

1. Add the env vars to Netlify, delete `GHL_WEBHOOK_URL`.
2. Decide how to land the branch: cherry pick the intake work onto `main`, or push the branch whole.
3. Submit one real application end to end and confirm the contact, all 11 custom fields, the `applied` tag, `+61` phone format and the returned `contactId`. Then resubmit the same email and confirm it updated rather than duplicated.
4. Build GHL workflows WF2 to WF5, WF7, WF8, WF10 in the UI, all left in Draft. WF1 already exists.
5. Google Search Console: verify both domains, submit sitemap.
