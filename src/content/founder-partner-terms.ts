/*
  The 12 month Founder Partner Term, offered at day 30 through /partner.

  Source: "Founder Partner Rollover Agreement" in Notion (Internal HQ > For
  Business (Internal) SOPs > 12 Month Authority Engine Advisory), 6 Oct 2026.
  Kept as written, with only these changes, made 19 Oct 2026:
  - Section 1 states the $28,000 as the price. The Notion text reached it as
    $48,000 less a $20,000 install credit, but the founding install is not
    $20,000, so that sum would have been wrong on a signed contract.
  - The bracket placeholders (entity, dates, payment method) are filled by how
    the page works: it starts on signing, Stripe takes card payments.
  - Hyphens out of compound words, per the house writing rules.
  - The signature block and the solicitor note are off the page. The page takes
    a typed signature.

  Bump TERMS_VERSION whenever the wording changes.
*/

export const TERMS_VERSION = 'founder-partner-v1-2026-10';

export const TERMS_TITLE = 'The Founder Partner Term';

export const AGREEMENT = `## Founder Partner Agreement

This Agreement records the Client's decision to roll from the 90 Day Authority Engine Install into the 12 month Founder Partner Term.

## 1. Rollover

The Founder Partner Term is **AUD $28,000 plus GST, if applicable.**

It is paid as **7 monthly payments of AUD $4,000 plus GST, if applicable.**

The first payment is taken when this Agreement is signed, with each following payment taken monthly on the same date, by card through Stripe.

The Founder Partner Term begins on the date this Agreement is signed and runs for 12 months.

The remaining period of the original 90 Day Install, from the rollover date through the original Day 90, will be supported as a transition period at no additional charge.

This Agreement replaces the remaining delivery terms of the original 90 Day Install, except for any payment already made or obligation already completed.

## 2. Founder Partner Term

The Founder Partner Term is a founding stage advisory and operating environment for founders, operators, and advisors building category leading companies.

The objective is to help the Client continue improving its Authority Engine, develop operator independence, increase qualified demand, and access a high quality founder and operator network.

This is a done with you service. The Client's team remains responsible for implementation.

## 3. Included Support

### Monthly Authority Board

One monthly strategic call with the founder, operator, and relevant team members to:

- Review progress and scorecard data
- Identify the current constraint
- Set the next 30 day priority
- Make resource and operator decisions
- Improve the Authority Engine

### Weekly Operator Lab

One weekly group call for Media Owners, Content Leads, and Creative Directors to:

- Review shipped work
- Solve implementation problems
- Improve strategic judgment
- Learn from other operators
- Build independence from the founder

### Wednesday Advisory Office Hours

Access to the shared advisory block every Wednesday from 9:00am to 11:00am Queensland time for:

- Asset reviews
- Strategic questions
- Content direction
- Operator decisions
- Implementation support

### WhatsApp Advisory Support

Access to the advisory team for implementation questions, reviews, and decisions.

The target response time is within one business day during normal business hours. WhatsApp support does not include done for you execution, staff management, or emergency availability.

### Member Operating Library

Access to Authority Engine training, SOPs, templates, scorecards, and implementation resources for internal use.

### Founder and Operator Network

Access to the 1% Founder Network and curated introductions to relevant founders, operators, and media specialists where there is a clear fit and availability.

### Quarterly In Person Sessions

Priority access and Founding Partner pricing for optional quarterly in person team strategy sessions. These sessions are separately paid.

## 4. Pull Forward Bonus

Because the Client has chosen to roll over at Day 30, the Client receives:

### One Private Media Strategy Day

Reference value: **AUD $10,000+**

The day will be designed around the highest leverage media constraint in the Client's business or team.

It may include:

- Media operation review
- Brand or content strategy
- Production system design
- Operator or Creative Director training
- Founder content delivery training
- VSL planning or filming
- Team workflow and approval systems
- Next quarter media priorities
- Content to revenue planning

The day includes one agreed business day of delivery. Travel, accommodation, venue, production costs, and third party costs are excluded unless agreed separately.

The day must be scheduled within 30 days of the rollover date, subject to availability.

## 5. Founding Stage Flexibility

The Client acknowledges that the Founder Partner environment is being developed with the first founding members.

The Provider may refine the format, training, operating library, network activities, call structure, and delivery mechanisms during the Term to improve the experience.

The Provider will not intentionally remove the core benefits listed in this Agreement.

## 6. Client Responsibilities

The Client agrees to:

- Appoint a Media Owner, Content Lead, or equivalent counterpart.
- Attend scheduled calls.
- Provide accurate information and relevant data.
- Implement agreed actions.
- Manage its own team, filming, editing, publishing, and internal deadlines.
- Protect confidential information shared by other members.

Results depend on participation, implementation, team capability, market conditions, offer quality, and sales execution.

## 7. Boundaries

This Agreement does not include:

- Done for you filming
- Done for you editing
- Posting or account management
- Staff management
- Full time CMO services
- Guaranteed leads, sales, revenue, hiring, or network outcomes
- Unlimited private consulting
- Legal, financial, tax, or compliance advice

## 8. Payment and Access

Payments are due according to the schedule in Section 1.

If a payment fails, the Provider may pause access to calls, office hours, WhatsApp support, the library, and network benefits until the account is brought current.

The Agreement does not automatically renew.

## 9. Intellectual Property

The Provider retains ownership of its frameworks, methodologies, SOPs, templates, training, and operating materials.

The Client receives a non exclusive licence to use the materials internally in its own business.

The Client may not resell, publicly distribute, or teach the materials without written permission.

## 10. Termination

Either party may terminate this Agreement for material breach, serious misconduct, abusive conduct, or unethical conduct.

Where the breach can be remedied, the breaching party will have seven days after written notice to remedy it.

Any refund, remaining payment obligation, or termination consequence will be handled in accordance with applicable law and the agreed commercial terms.

## 11. No Guarantee

The Provider will provide the services with reasonable care and skill but does not guarantee any specific financial, marketing, sales, audience, pipeline, or hiring outcome.

## 12. Acceptance

By signing below, the Client confirms that:

- The Founder Partner Term is AUD $28,000 plus GST, if applicable.
- It is paid as seven monthly payments of AUD $4,000 plus GST, if applicable.
- The Founder Partner Term begins on the date this Agreement is signed.
- The Client understands this is a done with you engagement.
- The Client agrees to the scope and boundaries above.`;

export const termsAreComplete = (): boolean => !AGREEMENT.includes('[SLOT');
