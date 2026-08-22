#!/usr/bin/env node
/*
  Puts every environment variable back exactly as it was.

  The snapshot IS the rollback. Point this at a dump taken by
  `netlify env:list --context production --json` and every key in that file is
  set back to the value it held when the dump was taken.

      node scripts/restore-env.mjs db-snapshots/netlify-env-2026-08-23.json

  It only sets, it never deletes, so a variable added since the snapshot
  survives. That is the safer direction: a rollback should undo one mistake
  rather than introduce a second.
*/

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const path = process.argv[2];
if (!path) {
  console.error("usage: node scripts/restore-env.mjs <snapshot.json>");
  process.exit(1);
}

const vars = JSON.parse(readFileSync(path, "utf8"));
const entries = Object.entries(vars).filter(([, v]) => v !== null && v !== undefined);

console.log(`Restoring ${entries.length} variables from ${path}\n`);

let done = 0;
const failed = [];

for (const [key, value] of entries) {
  try {
    execFileSync(
      "npx",
      ["netlify", "env:set", key, String(value), "--context", "production"],
      { stdio: ["ignore", "ignore", "ignore"] }
    );
    done += 1;
    process.stdout.write(`  ${done}/${entries.length}  ${key.padEnd(34)}\r`);
  } catch {
    failed.push(key);
  }
}

console.log(`\n\nRestored ${done} of ${entries.length}.`);
if (failed.length) console.error(`Failed: ${failed.join(", ")}`);
console.log("Redeploy for it to take effect.");
