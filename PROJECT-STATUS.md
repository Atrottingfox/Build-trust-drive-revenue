# authority-site - Status

_Serves authorityengine.com.au and theauthorityengine.live (Netlify site `9f3b9e93-b090-4217-b02a-11d827e57f55`). Both CLIENT FACING. Deploys by pushing to `main`._
_Updated 2026-08-14._

## Current focus

The simplified Brand Day funnel. One offer page, one lock-in link, one daily review habit. Superseded the earlier 10 workflow Invite Gate on 2026-08-14.

The flow: apply > Sean reviews once a day > `invited` or `declined` > lock-in link takes $5k and a date in one go > prep call > Brand Day. No fit call gate, no held slot chase, no concierge branch.

---

## Built, not deployed

All uncommitted or unpushed on `feat/client-templatise`. None of it is live.

**GHL contact sync** (`netlify/functions/builder-application.ts`). v2 `POST /contacts/upsert`, tags `applied`, returns `contactId`. Replaced the old `GHL_WEBHOOK_URL` forward.
- upsert not create, so reapplying updates one contact
- `toE164AU()` normalises AU mobiles, verified against 12 input shapes
- GHL failure returns `{ok, degraded}`, applicant still reaches the thank you screen
- custom field IDs from `GHL_FIELD_*` env vars, never hardcoded

**`/lock-in` page** (`src/pages/LockIn.tsx`, route in `App.tsx`). Two steps, Stripe then calendar. Step 2 does not exist until Stripe succeeds.
- `netlify/functions/lock-in-checkout.ts` creates the Stripe Checkout Session, passes `client_reference_id`
- `netlify/functions/lock-in-paid.ts` tags `brand-day-paid` in GHL on success
- **This is why the Brand Day needs no Stripe webhook.** The success redirect is a reliable paid signal and we hold the contact id already. WF9 is the only remaining webhook, for install instalments.
- The GHL calendar embed slot is empty (`GHL_CALENDAR_EMBED_URL`), pending the calendar existing. Renders an honest placeholder until then.

**Form changes.** Mobile required and paired beside location. Revenue bands `-1M / 1-3M / 3-10M / 10M+` matching the GHL dropdown exactly, question relabelled annual.

**Docs.** `docs/ghl-email-copy.md` carries all new email copy. `~/Downloads/ghl-automation-spec.md` rewritten to the simplified model.

## Deployed and live

`/builder` and `/apply`, posting to Notion, Slack and ConvertKit. Neither has any of the above. No application currently creates a GHL contact.

## Done in GoHighLevel

Sub-account `B7IFxtiHwcLoDatUHVF6`.

- 12 funnel tags already existed. `prep-call-booked` and `paid-no-date` created 2026-08-14.
- All 15 custom fields created 2026-08-14, dataTypes and dropdown options verified after creation.
- Pipeline "Authority Engine" exists with an Invited stage.
- Two draft workflows exist, both built by GHL's AI before the custom fields existed: `Application Tag Workflow` (WF1, unverified) and `Invitation Tag Automation` (WF2, two broken actions).

## Blocked, and on whom

**Sean, and only Sean:**
- Push and merge to `main`. Client facing.
- Netlify env vars: the `GHL_*` set from `.env.local`, plus `STRIPE_SECRET_KEY` and `STRIPE_BRAND_DAY_PRICE_ID`. Delete `GHL_WEBHOOK_URL`.
- Create the Stripe $5,000 Brand Day price.
- Create two GHL calendars: Brand Builder Day, Prep Call. Then paste the Brand Builder Day embed URL into `LockIn.tsx`.
- Build the workflows in the GHL UI. See below.

**Why the workflows cannot be automated:** the GHL public API has no workflow create endpoint, and browser automation cannot drive the builder. Clicks on rows, menus and canvas nodes are all ignored; a `double_click` selects page text, proving events reach the DOM and GHL simply does not respond. `read_page` and `find` return empty everywhere in the app. Screenshots do work, after a 10 to 20 second wait, so verification from a screenshot is reliable even though building is not. See `reference_ghl-ui-automation-limit` in memory.

## Workflow state

| | Status |
|---|---|
| WF1 acknowledge | Draft, unverified, drop its Slack step |
| WF2 lock-in invite | Draft, **delete** the `Set Hold Expires Field` action, rewrite the email |
| WF3 unpaid nudge to Sean | Not built |
| WF4 decline | Not built |
| WF5 date booked, confirm, prep | Not built |
| WF6 paid but no date | Not built |
| WF7 prep call not booked | Not built |
| WF8 end of day | Not built |
| WF9 instalments | Deferred, needs a real Stripe payload |
| WF10 weekly cadence | Not built |

## Decisions made, and why

| Decision | Why |
|---|---|
| Simplified model replaces the Invite Gate (14 Aug) | Fewer branches, fewer cracks. Deleted the held slot chase, the concierge branch and the 7 day hold. |
| `Hold expires` is orphaned | No hold exists in the new model. WF2's action gets deleted, not fixed. |
| Refund promise replaces the deadline | Removes the spot release sequence, which was the one that could email a paying client "I'm giving your spot away". |
| No Stripe webhook for the Brand Day | The lock-in page only shows the calendar after payment, so the success redirect is a reliable signal and the function holds the contact id. Deletes the "capture a payload first" blocker. |
| Match on `client_reference_id`, never email | Personal address applies, company card pays. |
| Page on authorityengine.com.au, calendar embedded from GHL | Keeps the URL, design and the `?c=` handoff, without writing a booking engine. Also keeps WF5's appointment trigger working. |
| GHL only, no Make or Zapier | GHL already does calendars, payments, pipelines and automations. Two systems holding the same state means a reconciliation problem. |
| WF1's Slack step dropped | The Netlify function already posts a formatted alert. Two per applicant otherwise. No effect on capture. |
| GHL upsert in the existing function, not a new one | One submit, one path, one triage queue. |
| The brief targeted `/builder`, not `/apply` | Its 13 field mapping only exists on `/builder`. Confirmed before building. |

## Also parked

Undeniable templatisation (`/c/:slug`, `TestTemplate`, `Workshops`), and `/geronimo` for Andrew Handoza. Committed as `ed30eeb`, unreviewed, not for main.

Google Search Console still not submitted for either domain.
