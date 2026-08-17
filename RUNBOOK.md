# Runbook

When something breaks, open this file. Don't reason from scratch under pressure . follow the procedure.

---

## Project identity

- **Repo:** `/Users/sean/authority-site`
- **Live URL(s):** `authorityengine.com.au` (primary) · `theauthorityengine.live` (alias)
- **Netlify site:** `eclectic-bunny-038834` · siteId `9f3b9e93-b090-4217-b02a-11d827e57f55`
- **Netlify admin:** `https://app.netlify.com/projects/eclectic-bunny-038834`
- **Supabase project (if any):** none. This repo is a static React SPA with no DB.
- **Audience:** public marketing pages are CLIENT-FACING. The `/undeniablenextsteps/*` tree is a single client workspace (Rhys + Jacob), password gated and noIndex.
- **Access gate at the edge:** open for public pages. Client pages use the in app `PasswordGate` component (password `Scale`, sessionStorage key `undeniable-unlocked`), plus `noIndex` and a robots.txt Disallow.
- **Deploy:** push to `main`. Netlify builds from GitHub automatically. There is no manual deploy step.
- **Rollback:** Netlify dashboard, Deploys tab, "Publish deploy" on the previous good build. One click, no rebuild.

---

## RLS / DB access broken (anon SELECT or UPDATE returning 401 or empty)

Symptom: workbook saves fail, dashboard shows demo client only, `permission denied for table X`.

1. **Probe live state** to confirm:
   ```bash
   ~/.claude/bin/check-supabase-state.sh
   ```
2. **Restore the baseline policies + grants** by pasting the contents of `db-snapshots/<latest-baseline>.sql` into the Supabase SQL editor:
   `<paste link, e.g. https://supabase.com/dashboard/project/pwgdlvvrkyxptcsaztzc/sql/new>`
3. **Re-probe** to confirm restoration:
   ```bash
   ~/.claude/bin/check-supabase-state.sh
   ```
4. **Log it** . append to `CHANGELOG-OPS.md`: timestamp, what broke, what restored it.

---

## Live site shows wrong/old content after deploy

Symptom: latest commit looks right in repo but live site shows old behavior.

1. **Check Netlify deploy state** at the admin URL above → Deploys tab.
2. **Rollback to last known good deploy:** click the prior deploy → "Publish deploy". Live in <30s.
3. **If the bad deploy was a missing env var or build failure,** check Deploys → click failed → Build log.
4. Log the rollback.

---

## Live data corrupted

Symptom: a client's workbook data is wrong/missing/overwritten.

1. **Supabase point-in-time restore** (7-day retention on free tier): Project → Database → Backups → Restore.
2. **Per-client JSON backups** (if maintained): `database/<client>/<timestamp>.json` in this repo.
3. **Git history** . workbooks/data committed to repo have full history. `git log -- clients/<slug>.json`.
4. Log the recovery.

---

## Env var change broke something

1. **Netlify env vars page:** `https://app.netlify.com/projects/<sitename>/configuration/env`
2. **Required env vars for this project** (from `.env.example` or docs):
   - `<VAR>` . `<what it does, where to get it>`
3. **Trigger a redeploy** after fixing . Netlify Deploys → "Trigger deploy" → "Deploy site".

---

## Something else / unknown break

1. **Snapshot current state immediately** so debugging doesn't make it worse:
   ```bash
   ~/.claude/bin/snapshot-supabase.sh <url> <key> db-snapshots/ pre-debug
   git tag pre-debug-$(date +%Y%m%dT%H%M)
   ```
2. Get help. Don't guess in production.

---

## Discipline reminders

- Never run DDL without first snapshotting and stating the rollback.
- Never push directly to main if the change is structural . branch + PR.
- The dangerous-bash hook (`~/.claude/hooks/dangerous-bash-gate.sh`) will force an "ask" prompt for risky commands. If it triggers unexpectedly, the prompt is your last guard . read it carefully.
