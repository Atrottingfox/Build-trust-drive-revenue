/*
  Erina Roch / UpScale's 90 Day agreement and the /upscale page, from one
  source so they cannot drift.

  v3, 2026-10-19. Aligned to Sean's email to Erina, which is what she reads
  first:
  - Track A is Standard, Track B is Expanded
  - the decision is made together at Day 30
  - totals stated including the Brand Day: $15,000 and $20,000
  - the business brand first, personal brands later, and the 30 day loop
  - the Day 30 criteria are the email's list

  From Sean's own page text: the Install inclusions, each option's inclusions,
  Day 90, Responsibilities. The weekly team training IS the weekly call
  (Sean, 2026-10-19).
  list semicolons.

  The second payment is Day 31 under both options, the date Stripe actually
  charges it (the email says Day 30 for Standard).

  Line markers, read by TermsBody:
    "## "  a subheading inside a section
    "• "   a list item

  Loaded by /install only for her contact id (see install-variants.ts). Bump
  the version on any wording change.
*/

import type { TermsSection } from './install-terms';

export const UPSCALE_TERMS_VERSION = 'upscale-v5-2026-10';

export const UPSCALE_TITLE = '90 Day Authority Engine Install';

export const UPSCALE_INTRO =
  'You have completed the Brand Day. The next 90 days are designed to install the content operating system required for your current business constraint, then tune it against real implementation and data.';

/*
  v4, 2026-10-19. The page is Sean's text, word for word apart from no
  hyphenated compounds and a straight apostrophe: the Initial 30 Day Install,
  then Track A and Track B. Track B is his list, which has weekly training
  and a fortnightly calibration call. The weekly training is the weekly call.
*/

export const UPSCALE_INSTALL = {
  name: 'Initial 30 Day Install',
  investment: '$5,000 AUD on commencement',
  included: [
    'One 60 minute team training session per week',
    'One 60 minute calibration call every fortnight with the client and key people',
    'Up to three Loom reviews per week',
    'One 90 minute Office Hours session per week',
    'Async WhatsApp feedback within 24 hours, Monday to Friday',
    'Build the agreed Authority Engine components',
    'Establish the first content cycle',
    "Confirm the team's roles, standards, metrics, and priorities",
  ],
  after: [
    'At Day 30, we review the progress of the system and decide which support level is appropriate for the remaining 60 days.',
    'Your previous $5,000 Brand Day payment has already been credited and is not included in the payment amounts below.',
  ],
};

export type UpscaleTrack = {
  letter: 'A' | 'B';
  name: string;
  forWho: string;
  rhythm: string;
  included: string[];
  investment: string[];
  breakdown: string[];
  total: string;
  /* Sean, 2026-10-19: lead with the smaller number, and make it plain the
     Brand Day is taken off. What is still to pay after the Brand Day. */
  fromHere: string;
  fromHereSchedule: string;
};

export const UPSCALE_TRACKS: UpscaleTrack[] = [
  {
    letter: 'A',
    name: 'Standard Authority Engine',
    forWho: 'For teams that can run the system with lighter support',
    rhythm: 'After the initial 30 day Install, the team moves into a lower cadence advisory rhythm.',
    included: [
      'Two 60 minute team training sessions per month',
      'One strategic advisory content board per month',
      'One 90 minute Office Hours session per week',
      'Monthly constraint and scorecard review',
      'Async WhatsApp feedback within 24 hours, Monday to Friday',
      'Selected asset and performance review',
      'Continued refinement of the Authority Engine',
    ],
    investment: ['$5,000 AUD on Day 31'],
    breakdown: ['$5,000 Brand Day, already paid', '$5,000 Initial 30 Day Install', '$5,000 Standard Authority Engine'],
    total: '$15,000 AUD',
    fromHere: '$10,000 AUD',
    fromHereSchedule: '$5,000 on commencement, $5,000 on Day 31',
  },
  {
    letter: 'B',
    name: 'Expanded Authority Engine',
    forWho: 'For teams that need continued training, calibration, and closer support',
    rhythm: 'After the initial 30 day Install, the team continues with a higher touch support rhythm.',
    included: [
      'One 60 minute team training session per week',
      'One 60 minute calibration call every fortnight with the client and key people',
      'Up to three Loom reviews per week',
      'One 90 minute Office Hours session per week',
      'Weekly accountability and iteration loop',
      'Continued operator training',
      'Continued review of content, workflows, and performance',
      'Async WhatsApp feedback within 24 hours, Monday to Friday',
      'Continued development and testing of the Authority Engine',
    ],
    investment: ['$10,000 AUD total:', '$5,000 on Day 31', '$5,000 on Day 61'],
    breakdown: ['$5,000 Brand Day, already paid', '$5,000 Initial 30 Day Install', '$10,000 Expanded Authority Engine'],
    total: '$20,000 AUD',
    fromHere: '$15,000 AUD',
    fromHereSchedule: '$5,000 on commencement, $5,000 on Day 31, $5,000 on Day 61',
  },
];

export const UPSCALE_DAY30_CRITERIA = [
  'What has been implemented',
  'The quality of the content',
  "The team's capability",
  'Progress with Sally and all operators',
  'The amount of support the system actually requires',
  'The next constraint worth solving',
];

/* The agreement. Sections 1 to 3 are the page, generated from the same data. */
const AGREEMENT_HEAD: TermsSection[] = [
  {
    heading: '1. Initial 30 Day Install',
    body: [
      `Investment: ${UPSCALE_INSTALL.investment}`,
      '## Included',
      ...UPSCALE_INSTALL.included.map((i) => `• ${i}`),
      'For now, the focus is the UpScale business brand. We can address the personal brands once the core content is stronger and the system is running consistently.',
      'The exact Authority Engine components will be selected according to the bottleneck and priorities agreed during the Brand Day. Not every business requires the same assets.',
    ],
  },
  {
    heading: '2. The Day 30 decision',
    body: [
      UPSCALE_INSTALL.after[0],
      'We will decide together, based on:',
      ...UPSCALE_DAY30_CRITERIA.map((c) => `• ${c}`),
    ],
  },
  {
    heading: '3. The two tracks',
    body: UPSCALE_TRACKS.flatMap((t) => [
      `## Track ${t.letter}: ${t.name}, Weeks 5 to 12`,
      `${t.forWho}. ${t.rhythm}`,
      ...t.included.map((i) => `• ${i}`),
    ]),
  },
  {
    heading: '4. Day 90: What you have',
    body: [
      'By Day 90, you will have:',
      '• One documented Authority Engine built around your agreed priorities',
      '• One repeatable monthly demand cycle',
      '• A defined content quality and review standard',
      '• Clear ownership, responsibilities, and decision rights',
      '• A scorecard tracking the agreed metrics',
      '• A trained operator running the agreed rhythm',
      '• A written recommendation for the next constraint',
      'The intended outcome is that your team can operate the system without requiring constant founder direction.',
    ],
  },
  {
    heading: '5. Investment',
    body: [
      UPSCALE_INSTALL.after[1],
      '## Initial 30 Day Install',
      'AUD $5,000 on commencement',
      '## Track A: Standard Authority Engine',
      '• AUD $5,000 on Day 31',
      'Total investment AUD $15,000, less your $5,000 Brand Day already paid: AUD $10,000 from here.',
      '## Track B: Expanded Authority Engine',
      '• AUD $5,000 on Day 31',
      '• AUD $5,000 on Day 61',
      'Total investment AUD $20,000, less your $5,000 Brand Day already paid: AUD $15,000 from here.',
      'All payments are charged automatically to the same card. By signing, you agree to the payments on commencement and on Day 31, and to the Day 61 payment if both parties choose Track B at Day 30.',
      'Fees are non refundable once the engagement starts.',
      'If a payment fails, I will let you know and we will sort it out. Work continues while we do.',
    ],
  },
  {
    heading: '6. Responsibilities',
    body: [
      'I provide strategy, frameworks, training, feedback, and advisory.',
      'Your team is responsible for:',
      '• Attending the agreed sessions',
      '• Completing assigned actions',
      '• Filming, editing, publishing, and implementing',
      '• Providing access to required information, platforms, and data',
      '• Maintaining the agreed content rhythm',
      '• Appointing an operator or content lead as the primary counterpart',
      'This is not a done for you content service. It does not include daily media management, filming, editing, publishing, account management, or staff management.',
    ],
  },
];

/* The standard agreement's general clauses, unchanged apart from numbering. */
const GENERAL: TermsSection[] = [
  {
    heading: '7. No guarantees',
    body: [
      'I will use my best efforts, experience and judgment. I do not guarantee any specific revenue, lead volume or other financial outcome.',
      'Results depend on factors outside my control, including your offer, your sales process and your execution.',
    ],
  },
  {
    heading: '8. Ending it early',
    body: [
      'Either of us may end this immediately, with written notice, if the other repeatedly behaves in a disrespectful, abusive or unethical manner, or materially breaches this agreement and does not remedy it within 7 days of written notice.',
      'Fees already paid are non refundable, and no further fees are due.',
    ],
  },
  {
    heading: '9. Intellectual property',
    body: [
      'I retain all rights to my frameworks, templates, models and methodologies.',
      'You receive a non exclusive licence to use the deliverables internally in your own business.',
      'You may not resell, redistribute or publicly teach my proprietary materials without written permission.',
    ],
  },
  {
    heading: '10. Liability',
    body: [
      'To the maximum extent permitted by law, my total liability under this agreement will not exceed the total fees you have paid me under it, and I will not be liable for any indirect, incidental or consequential damages, including lost profits.',
    ],
  },
  {
    heading: '11. General',
    body: [
      'This agreement is the entire understanding between us regarding this engagement and supersedes all prior discussions. Any changes must be made in writing and agreed by both of us.',
      'This agreement is governed by the laws of Queensland, Australia.',
    ],
  },
];

export const UPSCALE_TERMS: TermsSection[] = [...AGREEMENT_HEAD, ...GENERAL];
