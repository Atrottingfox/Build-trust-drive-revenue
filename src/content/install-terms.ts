/*
  The 90 Day Authority Engine Install agreement.

  Restructured from Sean's PDF consulting agreement, with two deliberate changes
  he asked for:

  1. One 90 day engagement, not three separately committed phases. The PDF made
     Phase 2 conditional on written agreement and a separate invoice. This is a
     single commitment with the delivery split into stages.

  2. Two payments, both committed on signing. The PDF's day 30 fee was owed only
     if the client opted in, which meant an automatic charge would have been
     taking money nobody had agreed to. Signing this agrees to both.

  The delivery below is lifted from the three phases on /offer so the contract
  and the sales page describe the same thing. If /offer changes, this changes.

  Bump TERMS_VERSION whenever the wording changes. The version signed is stored
  on the GHL contact, so you can always tell which text a client agreed to.
*/

export const TERMS_VERSION = 'v1-2026-08';

export const TERMS_TITLE = 'The 90 Day Authority Engine Install';

export type TermsSection = { heading: string; body: string[] };

export const TERMS: TermsSection[] = [
  {
    heading: '1. What this is',
    body: [
      'The Authority Engine helps you design and install a content operating system that generates qualified demand from organic content.',
      'This is one engagement of 90 days, delivered in three stages: the Build, the Install across weeks 1 to 4, and the Tune across weeks 5 to 12.',
      'This agreement covers the whole 90 days.',
    ],
  },
  {
    heading: '2. What I deliver',
    body: [
      'Build. A 4 to 6 hour in person intensive with you and whoever owns your content. We extract the genius, document the brand, build your customer journey map, and agree the success metrics for the 90 days.',
      'Install, weeks 1 to 4. Short form, long form, lead magnets, the Trojan Horse VSL and the documented Authority Engine get built and wired up, and the first cycle runs live. One 60 minute call per week with you and your key people, and one training per week for you and your team.',
      'Tune, weeks 5 to 12. Your team runs the cycle and I act as advisor. One 60 minute call per fortnight, one training per week, one Operator Clinic per fortnight, up to one Loom per week for asset review, and 24 hour feedback via WhatsApp.',
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
      'There is no third instalment. The day 60 payment is waived because you have come through a Brand Builder Day.',
      'Fees are non refundable once the engagement starts.',
      'If a payment fails, I will let you know and we will sort it out. Work continues while we do.',
    ],
  },
  {
    heading: '5. The day 30 checkpoint',
    body: [
      'At or before day 30 we review progress against the agreed metrics and the working relationship.',
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

/* True once every [SLOT] is gone. The page uses this to decide whether it can
   be signed. */
export const termsAreComplete = (): boolean =>
  !TERMS.some((s) => s.body.some((p) => p.includes('[SLOT')));
