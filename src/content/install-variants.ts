/*
  Per client versions of the /install page, keyed by GHL contact id.

  The link stays /install?c=<id>, so signing, checkout and the slot picker all
  run exactly as for everyone else. Only the words change: the agreement, the
  overview above it, and the payment lines. Anyone not listed here gets the
  standard 90 Day.
*/

import { TERMS, TERMS_VERSION, type TermsSection } from './install-terms';
import { UPSCALE_TERMS, UPSCALE_TERMS_VERSION } from './install-terms-upscale';

export type InstallVariant = {
  terms: TermsSection[];
  version: string;
  /* The overview above the agreement. */
  phases: { when: string; title: string; body: string; rhythm: string }[];
  feeLine: string;
  checkboxLine: string;
  payLine: string;
};

export const STANDARD_PHASES = [
  {
    when: 'Weeks 1 to 4',
    title: 'Install',
    body: 'Short form, long form, lead magnets, the Trojan Horse VSL and the documented Authority Engine get built and wired up. The first cycle runs live, so we test it on real audience.',
    rhythm: 'One 60 minute call a week with you and your key people. One training a week for your team.',
  },
  {
    when: 'Weeks 5 to 12',
    title: 'Tune',
    body: 'Your team runs the cycle and I move to advisor. We tighten hooks, lead magnets, long form structure and the VSL on real data, and test the strongest pieces with your warmest audience.',
    rhythm: 'A 60 minute call a fortnight, a training a week, an Operator Clinic a fortnight, up to one Loom a week, and 24 hour feedback on WhatsApp.',
  },
  {
    when: 'Day 90',
    title: 'What you have',
    body: 'One documented Authority Engine, one repeatable monthly demand cycle, and your operator running the rhythm. You spend under two hours a week on it.',
    rhythm: '',
  },
];

const STANDARD: InstallVariant = {
  terms: TERMS,
  version: TERMS_VERSION,
  phases: STANDARD_PHASES,
  feeLine:
    'I provide the strategy, frameworks and advisory. Your team implements, led by your Media Owner. AUD $10,000 for the 90 days, paid $5,000 today and $5,000 in 30 days. There is no third payment: the day 60 instalment is waived because you came through a Brand Day.',
  checkboxLine:
    'I have read the agreement, I am authorised to enter into it, and I agree to both instalments of $5,000.',
  payLine: '$5,000 today, $5,000 in 30 days, to the same card. Nothing after that.',
};

/* Erina Roch, UpScale. Matches /upscale. Sean, 2026-10-19. */
const UPSCALE: InstallVariant = {
  terms: UPSCALE_TERMS,
  version: UPSCALE_TERMS_VERSION,
  phases: [
    {
      when: 'First',
      title: 'The business page and short form',
      body: 'Getting clear on what to post and how to do it.',
      rhythm: 'One 60 minute call a week for the first four weeks.',
    },
    {
      when: 'Then',
      title: 'The personal brands and YouTube',
      body: '',
      rhythm: 'Fortnightly, then one in month three. Or every week for the entire 12 weeks, if we agree at day 30 to keep the high touch.',
    },
  ],
  feeLine:
    'I provide the strategy, frameworks and advisory. Your team implements, led by your Media Owner. AUD $10,000 for the 90 days, paid $5,000 today and $5,000 in 30 days. If we agree at day 30 to keep the weekly call for all 12 weeks, a third $5,000 is charged at day 61.',
  checkboxLine:
    'I have read the agreement, I am authorised to enter into it, and I agree to both instalments of $5,000, and to a third at day 61 if we agree to it at the day 30 checkpoint.',
  payLine:
    '$5,000 today, $5,000 in 30 days, to the same card. A third $5,000 at day 61 only if we agree to it at day 30.',
};

const BY_CONTACT: Record<string, InstallVariant> = {
  '4h47HYqgK7VD4eaExDAI': UPSCALE,
};

export const variantFor = (contactId: string | null): InstallVariant =>
  (contactId && BY_CONTACT[contactId]) || STANDARD;
