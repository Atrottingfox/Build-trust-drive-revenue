/*
  The 90 Day Install agreement.

  This is the document someone signs. Sean writes it, not me: it is a commercial
  agreement and inventing terms would be worse than leaving them blank.

  Every [SLOT] below must be filled before /install goes live. The page refuses
  to render the signature block while any remain, so an unfinished agreement
  cannot be signed by accident.

  Bump TERMS_VERSION whenever the wording changes. The version signed is stored
  on the GHL contact, so you can always tell which text a given client agreed
  to. Changing the words without bumping the version breaks that.
*/

export const TERMS_VERSION = 'v1-draft';

export const TERMS_TITLE = 'The 90 Day Authority Engine Install';

export type TermsSection = { heading: string; body: string[] };

export const TERMS: TermsSection[] = [
  {
    heading: 'What I deliver',
    body: [
      '[SLOT: the scope. What gets built, over what period, and what is explicitly out of scope.]',
    ],
  },
  {
    heading: 'What you commit to',
    body: [
      '[SLOT: your side. Time on calls, filming, approvals within X days, an operator in place.]',
    ],
  },
  {
    heading: 'Fees and payment',
    body: [
      '[SLOT: the total, the two payments, and when the second falls due.]',
      '[SLOT: what happens if a payment fails or is late.]',
    ],
  },
  {
    heading: 'Cancellation and refunds',
    body: [
      '[SLOT: whether the engagement can be ended early, by whom, and what is refundable.]',
    ],
  },
  {
    heading: 'Intellectual property and confidentiality',
    body: [
      '[SLOT: who owns the assets produced, and how their material is handled.]',
    ],
  },
];

/* True once every [SLOT] is gone. The page uses this to decide whether it can
   be signed. */
export const termsAreComplete = (): boolean =>
  !TERMS.some((s) => s.body.some((p) => p.includes('[SLOT')));
