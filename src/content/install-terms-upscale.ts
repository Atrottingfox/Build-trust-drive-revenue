/*
  Erina Roch / UpScale's 90 Day agreement. Sean's own text, 2026-10-19.

  Sections 1 to 5 are his page, word for word, with four changes he asked for
  or confirmed:
  - no hyphenated compounds ("60 minute", "High Touch", "done for you")
  - no semicolons at the end of list lines
  - High Touch is "supposed to be a call a week", so Path A carries one
  - Path A's additional $5,000 is a third payment on Day 61 (his text had it on
    Day 31 alongside everyone's second payment, which made both paths cost the
    same; "There is no automatic third payment under Path B" settles it)

  Section 4 also carries the consent line an automatic charge needs, and the
  standard non refundable and failed payment lines. Sections 6 to 10 are the
  standard agreement's general clauses, unchanged.

  Line markers, read by /install and /upscale:
    "## "  a subheading inside a section
    "• "   a list item
  Anything else is a paragraph.

  Loaded by /install only for her contact id (see install-variants.ts). Bump
  the version on any wording change.
*/

import type { TermsSection } from './install-terms';

export const UPSCALE_TERMS_VERSION = 'upscale-v2-2026-10';

export const UPSCALE_TITLE = '90 Day Authority Engine Install';

export const UPSCALE_INTRO =
  'You have completed the Brand Day. The next 90 days are designed to install the content operating system required for your current business constraint, then tune it against real implementation and data.';

/* Sean's page. Shown on /upscale and as the first part of the agreement. */
export const UPSCALE_PAGE: TermsSection[] = [
  {
    heading: 'The engagement',
    body: [
      'The engagement is delivered in two stages:',
      '• Install: Weeks 1 to 4',
      '• Tune: Weeks 5 to 12',
      'At the end of Week 4, both parties will review progress and agree which level of support is appropriate for the remaining eight weeks.',
    ],
  },
  {
    heading: '1. Install',
    body: [
      '## Weeks 1 to 4',
      'During the first four weeks, we will establish the strategy, operating rhythm, core content system, and initial implementation loop.',
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
      'The first 30 days are focused on building and testing the minimum system required to create qualified demand.',
    ],
  },
  {
    heading: '2. Week 5 Review',
    body: [
      'At the end of Week 4, we will review:',
      '• Progress against the agreed implementation plan',
      '• The quality of the content being produced',
      '• Team participation and execution',
      '• The effectiveness of the operating rhythm',
      '• The capability of the appointed operator',
      '• The next constraint worth solving',
      '• The level of support required for the remaining eight weeks',
      'Both parties will then choose one of the following paths.',
      '## Path A: High Touch Tune, Weeks 5 to 12',
      'This path continues the higher level of support where the team requires additional training, calibration, and implementation assistance.',
      '## Included',
      '• One 60 minute call per week with you and your key people',
      '• Two 60 minute team training sessions per month',
      '• One strategic advisory content board per month',
      '• One 90 minute Office Hours group coaching session per week',
      '• Async WhatsApp feedback within 24 hours, Monday to Friday',
      '• Continued review and refinement of the Authority Engine',
      '• Continued operator development and accountability',
      '• Continued review of selected assets, workflows, and performance data',
      '## Additional investment',
      'AUD $5,000, paid on Day 61.',
      'This is the continuation payment for the higher touch support path through the end of the 90 day engagement.',
      '## Path B: Standard Authority Engine Tune, Weeks 5 to 12',
      'This path is for teams that can operate the system with a lower level of direct support.',
      '## Included',
      '• Two 60 minute team training sessions per month',
      '• One strategic advisory content board per month',
      '• One 90 minute Office Hours group coaching session per week',
      '• Async WhatsApp feedback within 24 hours, Monday to Friday',
      '• Monthly review of the Authority Engine and agreed metrics',
      '• Selected asset and performance review',
      '## Additional investment',
      'No additional payment beyond the initial Install fee.',
      'The first payment is due on commencement and the second payment is due on Day 31.',
    ],
  },
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
      '## Initial Install payment',
      'AUD $5,000 on commencement',
      '## Second payment',
      'AUD $5,000 on Day 31, under either path',
      '## Path A payment',
      '• Path A: High Touch Tune: a further AUD $5,000 on Day 61',
      '• Path B: Standard Tune: no further payment',
      'There is no automatic third payment under Path B.',
      'Under Path A, the additional AUD $5,000 paid on Day 61 covers the increased level of support through Day 90.',
      'All payments are charged automatically to the same card. By signing, you agree to the payments on commencement and on Day 31, and to the Day 61 payment if both parties choose Path A at the Week 5 Review.',
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

export const UPSCALE_TERMS: TermsSection[] = [...UPSCALE_PAGE, ...GENERAL];
