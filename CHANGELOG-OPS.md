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
- Result: pending deploy verification

---


