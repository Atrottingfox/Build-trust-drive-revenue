/*
  The Undeniable part 2 agreement. Rhys Livingstone only.

  Sean's agreement goes in TERMS exactly as he wrote it. Until it does, the
  [SLOT] below keeps signing and payment switched off on the page.

  Money, Sean 16 Oct 2026: AUD $8,000 plus GST, three times. Today, day 31 and
  day 61, all charged automatically to the card used today. The amounts live in
  the function (undeniability-part2.ts), not here.

  Bump TERMS_VERSION whenever the wording changes. The version signed is stored
  on the Stripe payment, so you can always tell which text Rhys agreed to.
*/

export const TERMS_VERSION = 'undeniable-p2-v1-2026-10';

export const TERMS_TITLE = 'Undeniable, Part 2';

export type TermsSection = { heading: string; body: string[] };

export const TERMS: TermsSection[] = [
  {
    heading: 'Agreement',
    body: ['[SLOT: Sean to send the agreement text]'],
  },
];

export const termsAreComplete = (): boolean =>
  !TERMS.some((s) => s.body.some((p) => p.includes('[SLOT')));
