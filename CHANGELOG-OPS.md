# Operations changelog

Chronological log of every operational change to this project (DB, deploys, env, infra).
Code commits live in git; this file logs the things git doesn't track.

**Format per entry:**
```
## YYYY-MM-DD HH:MM UTC — <one-line description>
- Change: <what changed, plain English>
- Audience affected: <client-facing / operator / internal>
- Snapshot: <path to snapshot file taken before, or "N/A: <reason>">
- Rollback: <exact command/SQL/git ref to undo>
- Triggered by: <Sean / agent / cron / Stripe webhook>
- Why: <reason>
- Result: <verified ok / partial / failed>
```

Newest entries at the top.

---

<!-- new entries go here -->

## 2026-08-17 01:08 UTC . Ship the Undeniable Map and Channel Stack pages
- Change: Added two client pages, `/undeniablenextsteps/map` (current state, 90 day timeline, 12 month horizon, weekly rhythm, content board, gaps, ownership) and `/undeniablenextsteps/channels` (channel scoring, return vs effort matrix, scorecard, syndication cascade). Added a Map link to the `/undeniablenextsteps` hub. Two routes added to App.tsx. Also scaffolded this file and RUNBOOK.md.
- Audience affected: client-facing, single client. Rhys and Jacob at Undeniable. Password gated (`Scale`) and noIndex, so not public.
- Snapshot: N/A: additive front end only, no DB and no destructive change. Git is the snapshot. Pre-change ref `bc73c05`.
- Rollback: `git revert <deploy commit>` and push, or one click "Publish deploy" on the previous build in the Netlify dashboard.
- Triggered by: Sean, via agent
- Why: the engagement went blurry after the creative director was replaced. Sean wanted one map showing where they are, what phase, and what is needed next.
- Result: verified ok. Deploy d25053c ready. All three URLs render live and password gate works.

---



## 2026-08-25T04:55Z · Stripe amounts dropped to $1 for testing
**What:** CHECKOUT_AMOUNT_CENTS, INSTALL_PAYMENT_1_CENTS, INSTALL_PAYMENT_2_CENTS,
INSTALL_AMOUNT_CENTS set 500000 -> 100 on authority-site, then redeployed.
Verified live: Brand Day checkout and 90 Day Install first payment both return
amount_total 100 aud.
**Why:** End to end payment test of the 90 Day Install flow. Requested by Sean.
**Audience:** authorityengine.com.au, CLIENT-FACING, live Stripe key (rk_live_).
Any real buyer reaching these pages pays $1 until reverted.
**Snapshot:** db-snapshots/stripe-amounts-20260825T1452.txt
**Rollback:** netlify env:set <VAR> 500000 for all four, then
`netlify deploy --prod --build`. Note: the env change does NOT take effect
without a redeploy, confirmed during this change.
**STATUS: fully reverted 2026-09-29 (INSTALL_AMOUNT_CENTS was the last).**

## 2026-08-28 10:15 AEST · GHL contract field ids set, dead var removed

**What:** Set four GoHighLevel custom field ids on authorityengine.com.au
production: `GHL_FIELD_ANNUAL_REVENUE`, `GHL_FIELD_WHATS_BROKEN`,
`GHL_FIELD_OPERATOR_STATUS`, `GHL_FIELD_CAN_COMMIT_30_DAYS`. Values pulled
live from the sub-account via `scripts/ghl-custom-fields.mjs`, not guessed.
Removed `NOTION_TOKEN`, which nothing read (the code uses `NOTION_API_KEY`).
Redeployed production.

**Why:** Those four answers were being dropped from the GHL contact record on
every application. Slack and Notion were unaffected, both read the raw
submission, so nothing looked wrong. The health report had been saying so
since 21 August and it read as four failures rather than four checks that
could not run.

**Result:** Health went from 12 failures to 8. All four contract checks now
run and pass, no option mismatches. Env at ~3717 bytes of the 4096 Lambda
ceiling.

**Rollback:** `db-snapshots/authority-site-env-20260828T1009.json` holds every
variable as it was, including the removed NOTION_TOKEN value.
`netlify env:unset` the four GHL_FIELD_* vars and redeploy.

**Not touched:** all four price variables stay at 100 for testing.

---

## 2026-08-30 14:50 AEST · Margot plan page added at /margot

**What:** New page `src/pages/Margot.tsx` built on the Geronimo Strategy Day
archetype from the 30 Aug strategy call. Routes `/margot` and `/themargotplan`
added to `src/App.tsx`. Both added to `NO_CTA_PATHS` in
`src/components/ui/Navigation.tsx`. Password gated (`margot-unlocked`, password
`Scale`), noIndex, no back link.

**Audience:** Margot Miller only. Nothing links to it from any public page.

**Rollback:** `git reset --hard pre-margot-page-20260830T1436`, or one click
deploy rollback in Netlify to `cf96dc8a`.

**Why:** Client facing reference for the call breakdown. Companion Notion page
lives at "Margot - Call breakdown" under Extra pages.

## 2026-09-03 · Added /brand public asset page
- **What:** New route `/brand` (`src/pages/Brand.tsx`) serving downloadable logo, colour, type and header assets from `public/brand/`. Added `Disallow: /brand` to robots.txt and `noIndex` on the page.
- **Why:** Clients and partners ask for branding. This is the permanent link to hand them instead of emailing files.
- **Audience:** Public marketing site (authorityengine.com.au). Additive only, no existing page touched.
- **Rollback:** Netlify dashboard > Deploys > Publish deploy on the previous build. Or `git revert <commit>` and push.

## 2026-09-03 · Regenerated /brand assets from vector at higher resolution
- **What:** Replaced the brand pack with vector-rendered PNGs. Logo now 925x1024 and 3699x4096 transparent (tight crop, was a 1024 square with padding). Icon added at 1024 and 2048. Header card rebuilt as live Outfit type and rendered at 2400x1260 and 3600x1890; the original 1200x630 is kept unchanged as the Open Graph size.
- **How:** The header had no generator in the repo, so its geometry was recovered by pixel-measuring the original and the rebuild was verified landmark by landmark against it (all within 1-2px antialiasing noise). Rendered with headless Chrome.
- **Audience:** Public marketing site (authorityengine.com.au/brand). Additive plus asset replacement, no existing page touched. `/og-image.png` was NOT modified.
- **Rollback:** Netlify dashboard > Deploys > Publish deploy on the previous build. Or `git revert <commit>` and push.

## 2026-09-29 · /thecrew talent alerts on their own Slack channel, via blob store
- **What:** /thecrew Slack alerts now go only to #talent ("The Crew" Slack app), never the applications channel. The webhook lives in the site's Netlify Blobs store `config`, key `slack-talent`, read by `netlify/functions/the-crew.ts`.
- **Why not an env var:** tried `SLACK_WEBHOOK_TALENT` first. It pushed function env over AWS Lambda's 4KB limit and the prod deploy failed ("Your environment variables exceed the 4KB limit"). Unset immediately; the previous deploy stayed live throughout. The site is AT the limit: adding any function env var will fail every deploy. Repo is public, so the webhook cannot go in code.
- **Audience:** Internal (Sean's Slack). Applicants see nothing different.
- **Rollback:** `npx netlify blobs:delete config slack-talent` (alerts stop, Notion rows continue). Code: `git revert 9b40093 ddad9cd` and push.

## 2026-09-29 · /zoom and /calls for The Top 1% community calls
- **What:** `/zoom` 302s to the Zoom room (target is one line at the top of `public/_redirects`). `/calls` is a standalone page in `public/calls/` with next dates computed in Australia/Sydney, plus monthly `.ics` invites served as text/calendar (header in netlify.toml).
- **Checked before and after deploy:** live checkout still charges 500000 cents ($5,000), live mode, for both Brand Day and Install.
- **Open, not touched:** `INSTALL_AMOUNT_CENTS` is 100 ($1) in ALL contexts including production. It feeds `charge-install` (GHL workflow charges the saved card at install). Needs the real amount if that workflow is live.
- **Audience:** community members, noindex, no WhatsApp link on the page. No checkout, booking, Stripe or env changes.
- **Rollback:** `git revert a086233` and push, or publish the previous deploy in Netlify.

## 2026-09-29 · INSTALL_AMOUNT_CENTS restored to $5,000
- **What:** `INSTALL_AMOUNT_CENTS` 100 -> 500000, redeployed (`netlify deploy --build --prod`, live). Closes the last open item from the 2026-08-25 $1 test: the other three prices were restored 28 Aug, this one was missed.
- **Checked:** GHL shows 0 contacts tagged `install-charged` or `install-payment-failed`, so `charge-install` never charged anyone $1.
- **Snapshot:** db-snapshots/install-amount-20260929.txt
- **Rollback:** `npx netlify env:set INSTALL_AMOUNT_CENTS 100 && npx netlify deploy --build --prod`

## 2026-09-30 · Who joins the Top 1% calls
- **What:** `/zoom` now runs through `netlify/functions/zoom.ts` (Zoom room is `ZOOM_URL` there). Personal links `/calls?m=<Applications row id>` (Notion "Calls link" column) send Join to `/zoom/<id>`. During a call window (Wed 7:15 to 8:30 Sydney, calls are 7:30 to 8:30, first Wed = Open Q&A, second = Spotlight) it bumps "Calls joined", sets "Last joined" (once a day) and pings #talent. Calendar clicks on /calls tick "Added to calendar" via `calls-track`. New Notion columns: Calls joined, Last joined, Added to calendar, Calls link.
- **Gotcha:** Netlify copies an incoming query string onto a function's redirect Location, and does not pass a query built in the rewrite rule to the function. Hence the id rides in the path and is parsed from `event.rawUrl`. `X-Member: yes|no` on the /zoom response verifies wiring outside call times.
- **Audience:** members (tracking), Sean (#talent). No env, checkout or booking changes. Checkout verified at 500000 after deploy.
- **Rollback:** `git revert 6de03db 2dad331 ace914d b5c1af2` and push. Plain redirect: put `/zoom https://us06web.zoom.us/j/4255667465 302!` back in `public/_redirects`.
