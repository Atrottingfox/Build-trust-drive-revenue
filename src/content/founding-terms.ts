/*
  The founding 90 Day agreement. DRAFT for Sean's review (24 Nov 2026), not
  wired into checkout yet.

  Built only from text that already exists, so the contract and the pages say
  the same thing:
  - structure, fees wording, ending early, IP, liability and general: the
    August 90 Day terms (install-terms.ts, v1-2026-08)
  - what I deliver: What you get on /founding (GROUPS in OpenPage.tsx) and the
    cadence on /advisoryoutline
  - will do, won't do, your responsibilities: Sean's words on /advisoryoutline
  - the guarantee: Sean's words in the /founding price box

  credit = Brand Day already paid (Erina, Jack). Only section 2 and 5 change.
  Bump FOUNDING_TERMS_VERSION on any wording change.
*/

import type { TermsSection } from './install-terms';

export const FOUNDING_TERMS_VERSION = 'founding-v1-draft-2026-11-24';
export const FOUNDING_TERMS_TITLE = 'The Founding 90 Day Install';

export function foundingTerms(credit = false): TermsSection[] {
  return [
    {
      heading: '1. What this is',
      body: [
        'Private content advisory for one of the first five founding members of The Authority Engine.',
        'This is one engagement of 90 days: your Strategy Day, the Install across weeks 1 to 4, and Transfer and tune across weeks 5 to 12. 1:1 guided implementation starts on the 15th of your intake month.',
        'From the day you pay, your team gets The Engineroom, every SOP, training video and playbook, Thursday office hours and WhatsApp.',
        'This agreement covers the whole 90 days.',
      ],
    },
    {
      heading: '2. What I deliver',
      body: [
        credit
          ? 'Your Strategy Day. Already delivered as your Brand Day.'
          : 'A Strategy Day with you and your team, in person. We analyse your current bottlenecks and build your Buying Belief Map, then turn it into a documented brand and Authority Engine.',
        '1:1 implementation calls, weekly for the first 4 weeks, then fortnightly for the next 8.',
        'Up to two Loom reviews per week during active implementation.',
        'Training every fortnight. The whole team gets access.',
        'Advisory group office hours, every Thursday.',
        'Monthly content advisory board meetings.',
        'WhatsApp support, 24 hour replies.',
        'Prescriptive advice directly through the portal.',
        'Direct access to Sean, curated specialist introductions, the private founder network, and help with hiring and partnerships.',
        '## During 1:1 I will',
        '• Set content direction (What to stop + what to do more of)',
        '• Decide what to create',
        '• Topic selection refinement',
        '• Review work and tell you what to improve, where and how',
        '• Review pieces when change in strategy occur',
        '• Hook refinement',
        '• Define short form and long form priorities',
        '• Give you the standards for good content',
        '• Give direct, actionable feedback to improve on',
        '• Support you through calls, Looms, training and WhatsApp',
        '• Help you build a consistent, reliable publishing rhythm',
        '• Help your team make better decisions without waiting for you',
        '• Review the data and decide what to do more of next',
      ],
    },
    {
      heading: "3. What I won't do",
      body: [
        '• Write scripts',
        '• Unlimited revisions or endless feedback',
        '• Edit or publish',
        '• Tell everybody exactly what to do',
        '• Film anything for you',
        '• Adhoc meetings',
        '• Chase attendance, or submitting work',
        '• Change strategy every week because of a new idea',
        '• Manage the team',
        '• Act as a CMO',
        '• Calls without a specific purpose',
        '• Review all posts before they go out',
        '• Guarantee formats work',
        '• Guarantee any leads, sales, or revenue',
        '• Make every decision forever',
        'I will train, guide, review, and challenge the team. Will not manage the team, do the work for them or make every decision indefinitely.',
      ],
    },
    {
      heading: '4. Your responsibilities',
      body: [
        'To make the engagement work you agree to:',
        '• Attend the agreed sessions',
        '• Submit any work for review on time',
        '• Assign one core person to own implementation',
        '• Make decisions quickly',
        '• Publish or deploy the agreed work',
        '• Share performance data honestly',
        '• Complete the implementation work between sessions',
        'Failure to implement or participate will limit results.',
      ],
    },
    {
      heading: '5. Fees and payment',
      body: credit
        ? [
            'The fee for the 90 days is AUD $5,000 plus GST ($5,500 total), paid in full at checkout.',
            'The founding price is AUD $10,000 plus GST. Your Brand Day is already paid, so $5,000 comes off.',
            'Fees are non refundable once the engagement starts.',
          ]
        : [
            'The fee for the 90 days is AUD $10,000 plus GST ($11,000 total), paid in full at checkout.',
            'Fees are non refundable once the engagement starts.',
          ],
    },
    {
      heading: '6. Guarantee',
      body: [
        "If you do not have a consistent rhythm of content going out by day 90, we'll continue working with you until you do.",
        'To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantee covers installation, not revenue.',
      ],
    },
    {
      heading: '7. No other guarantees',
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
}
