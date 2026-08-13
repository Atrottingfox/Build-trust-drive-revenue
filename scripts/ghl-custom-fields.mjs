#!/usr/bin/env node
// Step 1 of the GHL brief: pull the REAL custom field IDs from the sub-account.
// Nothing here is hardcoded or guessed. Run:
//   GHL_TOKEN=pit-xxxx node ghl-custom-fields.mjs
//
// Prints every field (id / name / fieldKey) and then a paste-ready .env block.

const LOCATION_ID = 'B7IFxtiHwcLoDatUHVF6';
const TOKEN = process.env.GHL_TOKEN;

if (!TOKEN) {
  console.error('Missing GHL_TOKEN. Run: GHL_TOKEN=pit-xxxx node ghl-custom-fields.mjs');
  process.exit(1);
}

const res = await fetch(
  `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`,
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Version: '2021-07-28',
      Accept: 'application/json',
    },
  }
);

if (!res.ok) {
  console.error(`GHL returned ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}

const { customFields = [] } = await res.json();

if (!customFields.length) {
  console.error('No custom fields on this location. Create them in GHL first.');
  process.exit(1);
}

console.log(`\n${customFields.length} custom fields on ${LOCATION_ID}\n`);
console.log('ID'.padEnd(26), 'FIELD KEY'.padEnd(40), 'NAME');
console.log('-'.repeat(100));
for (const f of customFields) {
  console.log(
    String(f.id).padEnd(26),
    String(f.fieldKey || '').padEnd(40),
    f.name || ''
  );
}

// Turn contact.annual_revenue -> GHL_FIELD_ANNUAL_REVENUE
const envName = (f) =>
  'GHL_FIELD_' +
  String(f.fieldKey || f.name || '')
    .replace(/^contact\./, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();

console.log('\n\n--- paste into Netlify env vars ---\n');
console.log(`GHL_TOKEN=`);
console.log(`GHL_LOCATION_ID=${LOCATION_ID}`);
for (const f of customFields) {
  console.log(`${envName(f)}=${f.id}   # ${f.name}`);
}
console.log('');
