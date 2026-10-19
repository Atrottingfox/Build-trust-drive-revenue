/*
  Erina Roch / UpScale's 90 Day agreement. Sean, 2026-10-19: "just keep it
  congruent please specifically for erina".

  Matches /upscale, which states what Sean is confident promising: "help them
  getting clear with what to post and how to do it. first we focus on the
  business page and short form. then we can introduce the personal brands and
  youtube". The VSL, lead magnets, documented engine, trainings, clinics and
  Looms from the standard agreement are deliberately not promised here.

  Adds the day 30 choice: two payments, or a third at day 61 if we agree at day
  30 to keep the weekly call for all 12 weeks.

  Every general clause (commitments, guarantees, ending early, IP, liability,
  general) is the standard agreement's wording, unchanged.

  Loaded by /install only for her contact id (see install-variants.ts). Bump
  the version on any wording change.
*/

import type { TermsSection } from './install-terms';

export const UPSCALE_TERMS_VERSION = 'upscale-v1-2026-10';

export const UPSCALE_TERMS: TermsSection[] = [
  {
    heading: '1. What this is',
    body: [
      'The Authority Engine helps you get clear on what to post and how to do it.',
      'This is one engagement of 90 days. First we focus on the business page and short form. Then we introduce the personal brands and YouTube.',
      'This agreement covers the whole 90 days.',
    ],
  },
  {
    heading: '2. What I deliver',
    body: [
      'One 60 minute call a week for the first four weeks, then fortnightly, then one in month three, with you and your key people.',
      'If we agree at the day 30 checkpoint to keep the high touch, the call runs every week for the entire 12 weeks, to get training dialled across the team. See section 4.',
      'I provide strategy, frameworks and advisory. I do not provide done for you execution: no filming, editing, posting, account management or staff management. Your team implements.',
    ],
  },
  {
    heading: '3. What you commit to',
    body: [
      'Appoint a Media Owner or Content Lead as my primary counterpart, and make sure they and your key people attend the scheduled calls.',
      'Produce and publish content, and implement recommendations, in a timely manner.',
      'Provide accurate information and the access or data I need in order to advise.',
      'Failure to implement or participate will limit results.',
    ],
  },
  {
    heading: '4. Fees and payment',
    body: [
      'The fee for the 90 days is AUD $10,000, paid in two instalments of AUD $5,000.',
      'The first is due on signing. The second is charged automatically to the same card 30 days later. By signing, you are agreeing to both.',
      'At the day 30 checkpoint we may agree to keep the weekly call running for the entire 12 weeks. If we do, a third instalment of AUD $5,000 is charged automatically to the same card at day 61, bringing the fee to AUD $15,000. If we do not, there is no third instalment.',
      'Fees are non refundable once the engagement starts.',
      'If a payment fails, I will let you know and we will sort it out. Work continues while we do.',
    ],
  },
  {
    heading: '5. The day 30 checkpoint',
    body: [
      'At or before day 30 we review progress, where the team is up to, and the working relationship, and agree how the back half runs.',
      'This is a conversation about how the work is going, not a decision about whether to continue. The 90 days is one commitment and the second instalment is part of it.',
      'If either of us behaves unreasonably, section 7 still applies.',
    ],
  },
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
