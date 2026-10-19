/*
  Per client versions of the /install page, keyed by GHL contact id.

  The link stays /install?c=<id>, so signing, checkout and the slot picker all
  run exactly as for everyone else. Only the words change: the agreement, the
  overview above it, and the payment lines. Anyone not listed here gets the
  standard 90 Day.
*/

import { TERMS, TERMS_VERSION, type TermsSection } from './install-terms';
import { UPSCALE_TERMS, UPSCALE_TERMS_VERSION, UPSCALE_TITLE, UPSCALE_INTRO } from './install-terms-upscale';

export type InstallVariant = {
  terms: TermsSection[];
  version: string;
  /* Page heading and the line under it. Standard ones used when absent. */
  title?: string;
  intro?: string;
  /* The overview above the agreement. */
  phases: { when: string; title: string; body: string; rhythm: string }[];
  feeLine: string;
  checkboxLine: string;
  payLine: string;
  /* The call step after payment. Standard copy used when absent. */
  slotTitle?: string;
  slotLine?: string;
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

/* Erina Roch, UpScale. Sean's text, 2026-10-19 (Track A / Track B). Matches /upscale. */
const UPSCALE: InstallVariant = {
  terms: UPSCALE_TERMS,
  version: UPSCALE_TERMS_VERSION,
  title: UPSCALE_TITLE,
  intro: UPSCALE_INTRO,
  phases: [
    {
      when: 'Day 1 to 30',
      title: 'Initial 30 Day Install',
      body: '$5,000 AUD on commencement. Your previous $5,000 Brand Day payment has already been credited.',
      rhythm: 'At Day 30, we review the progress of the system and decide which support level is appropriate for the remaining 60 days.',
    },
    {
      when: 'Weeks 5 to 12',
      title: 'Track A or Track B',
      body: 'Track A: Standard Authority Engine, $10,000 AUD from here. Track B: Expanded Authority Engine, $15,000 AUD from here. Both after your $5,000 Brand Day, which is already paid and taken off.',
      rhythm: '',
    },
  ],
  feeLine:
    'I provide strategy, frameworks, training, feedback, and advisory. AUD $5,000 on commencement and AUD $5,000 on Day 31. If we choose Track B at Day 30, a further AUD $5,000 on Day 61.',
  checkboxLine:
    'I have read the agreement, I am authorised to enter into it, and I agree to the payments of $5,000 on commencement and on Day 31, and to the further $5,000 on Day 61 if we choose Track B at Day 30.',
  payLine:
    '$5,000 today, $5,000 on Day 31, to the same card. A further $5,000 on Day 61 only under Track B.',
  /* Her calls are not the standard weekly rhythm, so she is not sent to /slot. */
  slotTitle: 'Your calls',
  slotLine:
    'I will send you the times for your calls. For the first 30 days that is one 60 minute calibration call every fortnight with you and your key people, plus the weekly team training and Office Hours.',
};

const BY_CONTACT: Record<string, InstallVariant> = {
  '4h47HYqgK7VD4eaExDAI': UPSCALE,
};

export const variantFor = (contactId: string | null): InstallVariant =>
  (contactId && BY_CONTACT[contactId]) || STANDARD;
