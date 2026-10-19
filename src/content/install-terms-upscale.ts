/*
  Erina Roch / UpScale's 90 Day agreement and the /upscale page, from one
  source so they cannot drift.

  v3, 2026-10-19. Aligned to Sean's email to Erina, which is what she reads
  first:
  - Option A is Standard, Option B is Expanded (his page text had them the
    other way round as Path A / Path B)
  - the decision is made together at Day 30
  - totals stated including the Brand Day: $15,000 and $20,000
  - the business brand first, personal brands later, and the 30 day loop
  - the Day 30 criteria are the email's list

  From Sean's own page text: the Install inclusions, each option's inclusions,
  Day 90, Responsibilities. Expanded carries one 60 minute call per week
  ("high touch is supposed to be a call a week"). No hyphenated compounds, no
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

export const UPSCALE_TERMS_VERSION = 'upscale-v3-2026-10';

export const UPSCALE_TITLE = '90 Day Authority Engine Install';

export const UPSCALE_INTRO =
  'You have completed the Brand Day. The next 90 days are designed to install the content operating system required for your current business constraint, then tune it against real implementation and data.';

/* The two options. The /upscale page lays these out side by side; the
   agreement states them in full. */
export type UpscaleOption = {
  letter: 'A' | 'B';
  name: string;
  forWho: string;
  calls: string;
  differs: string[];
  payments: string[];
  total: string;
};

export const UPSCALE_OPTIONS: UpscaleOption[] = [
  {
    letter: 'A',
    name: 'Standard Authority Engine',
    forWho: 'A lower support continuation for a team that can run the system with less direct input.',
    calls: 'No weekly call. One strategic advisory content board per month.',
    differs: [
      'Monthly review of the Authority Engine and agreed metrics',
      'Selected asset and performance review',
    ],
    payments: ['$5,000 on Day 31', 'No further payment'],
    total: '$15,000',
  },
  {
    letter: 'B',
    name: 'Expanded Authority Engine',
    forWho:
      'A higher support continuation if the team needs additional training, calibration, asset review, and implementation support.',
    calls: 'One 60 minute call per week with you and your key people, plus the monthly content board.',
    differs: [
      'Continued review and refinement of the Authority Engine',
      'Continued operator development and accountability',
      'Continued review of selected assets, workflows, and performance data',
    ],
    payments: ['$5,000 on Day 31', '$5,000 on Day 61'],
    total: '$20,000',
  },
];

/* Included under both options, Day 31 to Day 90. */
export const UPSCALE_BOTH = [
  'Two 60 minute team training sessions per month',
  'One strategic advisory content board per month',
  'One 90 minute Office Hours group coaching session per week',
  'Async WhatsApp feedback within 24 hours, Monday to Friday',
];

export const UPSCALE_DAY30_CRITERIA = [
  'What has been implemented',
  'The quality of the content',
  "The team's capability",
  'Progress with Sally and all operators',
  'The amount of support the system actually requires',
  'The next constraint worth solving',
];

/* Sections shown on /upscale before and after the options. */
export const UPSCALE_BEFORE: TermsSection[] = [
  {
    heading: 'The first 30 days',
    body: [
      'The first 30 days are about running one simple loop:',
      '• Post consistently',
      '• Shoot consistently',
      '• Review the data',
      '• Identify what worked',
      '• Do more of it',
      'For now, the focus is the UpScale business brand. We can address the personal brands once the core content is stronger and the system is running consistently.',
    ],
  },
  {
    heading: '1. Install',
    body: [
      '## Day 1 to Day 30',
      'During the first 30 days, we will establish the strategy, operating rhythm, core content system, and initial implementation loop.',
      '## Included',
      '• One 60 minute training session per week for your team',
      '• One 60 minute calibration call every fortnight with you and your key people',
      '• Up to three Loom reviews per week',
      '• One 90 minute Office Hours group coaching session per week',
      '• Async WhatsApp feedback within 24 hours, Monday to Friday',
      '• Development of the agreed Authority Engine components',
      '• Establishment of the first repeatable content cycle',
      '• Definition of ownership, responsibilities, and success metrics',
      'The exact Authority Engine components will be selected according to the bottleneck and priorities agreed during the Brand Day. Not every business requires the same assets.',
    ],
  },
];

export const UPSCALE_AFTER: TermsSection[] = [
  {
    heading: '3. Day 90: What you have',
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
      'You should spend no more than approximately three hours per week directly involved in the media operation, subject to your team implementing the agreed processes.',
    ],
  },
  {
    heading: '4. Investment',
    body: [
      'Your $5,000 Brand Day payment is credited, and has already been taken off the total for both options.',
      '## Initial payment',
      'AUD $5,000 on commencement',
      '## Option A: Standard Authority Engine',
      '• AUD $5,000 on Day 31',
      '• No further payment',
      'Total for the full engagement, including the Brand Day: AUD $15,000.',
      '## Option B: Expanded Authority Engine',
      '• AUD $5,000 on Day 31',
      '• AUD $5,000 on Day 61',
      'Total for the full engagement, including the Brand Day: AUD $20,000.',
      'All payments are charged automatically to the same card. By signing, you agree to the payments on commencement and on Day 31, and to the Day 61 payment if both parties choose Option B at Day 30.',
      'Fees are non refundable once the engagement starts.',
      'If a payment fails, I will let you know and we will sort it out. Work continues while we do.',
    ],
  },
  {
    heading: '5. Responsibilities',
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

/* Section 2 in agreement form, generated from the same option data. */
const DAY30_SECTION: TermsSection = {
  heading: '2. The Day 30 decision',
  body: [
    'At Day 30, we will decide together which level of support is appropriate for the remaining 60 days, based on:',
    ...UPSCALE_DAY30_CRITERIA.map((c) => `• ${c}`),
    ...UPSCALE_OPTIONS.flatMap((o) => [
      `## Option ${o.letter}: ${o.name}, Day 31 to Day 90`,
      o.forWho,
      '## Included',
      ...(o.letter === 'B' ? ['• One 60 minute call per week with you and your key people'] : []),
      ...UPSCALE_BOTH.map((b) => `• ${b}`),
      ...o.differs.map((d) => `• ${d}`),
      `Payment: ${o.payments.join('. ')}.`,
    ]),
  ],
};

/* The standard agreement's general clauses, unchanged apart from numbering. */
const GENERAL: TermsSection[] = [
  {
    heading: '6. No guarantees',
    body: [
      'I will use my best efforts, experience and judgment. I do not guarantee any specific revenue, lead volume or other financial outcome.',
      'Results depend on factors outside my control, including your offer, your sales process and your execution.',
    ],
  },
  {
    heading: '7. Ending it early',
    body: [
      'Either of us may end this immediately, with written notice, if the other repeatedly behaves in a disrespectful, abusive or unethical manner, or materially breaches this agreement and does not remedy it within 7 days of written notice.',
      'Fees already paid are non refundable, and no further fees are due.',
    ],
  },
  {
    heading: '8. Intellectual property',
    body: [
      'I retain all rights to my frameworks, templates, models and methodologies.',
      'You receive a non exclusive licence to use the deliverables internally in your own business.',
      'You may not resell, redistribute or publicly teach my proprietary materials without written permission.',
    ],
  },
  {
    heading: '9. Liability',
    body: [
      'To the maximum extent permitted by law, my total liability under this agreement will not exceed the total fees you have paid me under it, and I will not be liable for any indirect, incidental or consequential damages, including lost profits.',
    ],
  },
  {
    heading: '10. General',
    body: [
      'This agreement is the entire understanding between us regarding this engagement and supersedes all prior discussions. Any changes must be made in writing and agreed by both of us.',
      'This agreement is governed by the laws of Queensland, Australia.',
    ],
  },
];

export const UPSCALE_TERMS: TermsSection[] = [...UPSCALE_BEFORE, DAY30_SECTION, ...UPSCALE_AFTER, ...GENERAL];
