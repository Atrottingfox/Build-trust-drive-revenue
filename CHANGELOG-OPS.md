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
**STATUS: NOT YET REVERTED.**

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
