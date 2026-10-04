import { Check, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, H2, BulletList } from '../components/undeniable/Bits';

/* Dain Walker / Rivyl. The Operator Intensive scoped to one outcome: a person in
   seat running an MVP content operation. Written for the CEO to read once and say
   yes. Outputs only, never the method. Dain sits close to our category, so nothing
   here explains how the day, the test or the scorecard actually work.
   Copy rule for this page: plain sentences, the way Sean would say it across a
   table. No balanced pairs, no 'X, not Y', no quotable one liners as headings. */

/* Brand Day date options. Leave empty and the page says dates come separately. */
const DATE_OPTIONS: string[] = [];

type Step = { num: string; title: string; when: string; body: string; get: string; gate: string };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Brand Day, scoped to operations',
    when: 'Week 1 · one day',
    body: 'A full day with Sean to get really clear on what Dain actually wants from media over the next 90 days. From there we work backwards to what the content operation needs to look like to get him there. Brand work sits outside this.',
    get: 'The 90 day target, the role we are hiring for, and the MVP spec',
    gate: 'Dain and the CEO sign off the target and the MVP',
  },
  {
    num: '02',
    title: 'Finding the person',
    when: 'Weeks 1 to 4',
    body: 'Sean hunts for the right person himself, alongside whatever outbound your team is already running. Candidates do a piece of real work before you meet them, and Sean sits in on the final interviews to sell them on the role. By default we are looking for a 90 day contract hire, someone properly invested in it, with room to make it permanent after that.',
    get: 'A shortlist of people who have already done the work',
    gate: 'Rivyl makes the hire',
  },
  {
    num: '03',
    title: 'Getting the MVP out the door',
    when: 'From week 2',
    body: 'This starts before the hire lands. If we have not found someone yet, we bring in freelancers to run the MVP so content is going out while we keep looking, and the operator picks it up from them when they start.',
    get: 'The MVP content operation, live and shipping weekly',
    gate: 'Three weeks in a row on the agreed cadence',
  },
  {
    num: '04',
    title: 'Training them up',
    when: 'The operator\'s first 90 days',
    body: 'Weekly reviews against the scorecard for the operator\'s first 90 days, with the training done on Rivyl\'s actual content. By the end of it they own the MVP and run it themselves.',
    get: 'An operator who runs it without Dain or Sean needing to step in',
    gate: 'At day 90 you decide whether to keep them on',
  },
];

const OUTCOME = [
  'A media operator in the seat on a 90 day contract, with the option to keep them on',
  'An MVP content operation that ships every week without Dain having to chase it',
  'A weekly scorecard the CEO can check in a few minutes',
  'The hiring pack, yours to keep for the next hire',
];

const RULES: Array<{ when: string; then: string }> = [
  { when: 'Hire found by week 4', then: 'The operator takes over from the freelancers and their 90 days start.' },
  { when: 'No hire by week 4', then: 'The freelancers keep going and so does the search.' },
  { when: 'Hire is not working by day 30', then: 'We end it early and go back to the shortlist.' },
  { when: 'MVP on cadence for three weeks', then: 'You can add more volume if you want it. That is priced separately.' },
  { when: 'MVP off cadence', then: 'We fix one thing at a time and keep the scope where it is.' },
];

const IN = [
  'The Brand Day, scoped to operations',
  'The role, scorecard and hiring pack',
  'Sean hunting personally and joining the final interviews',
  'The MVP spec, plus briefing the freelancers who run it in the meantime',
  'Weekly operator reviews for 90 days',
];

const OUT = [
  'A brand build or rebrand',
  'Volume content, which is available later if you want it',
  'Filming, editing and posting, which sit with your team and the operator',
  'A guarantee we find someone by a set date',
  'Operator and freelancer pay, which Rivyl covers',
];

const NEEDS = [
  { who: 'Dain', items: ['Show up for the Brand Day', 'Join the final interviews', 'Sign off the target and the MVP'] },
  { who: 'The CEO', items: ['Budget for the hire and the interim freelancers', 'One person who owns approvals', 'A yes on this plan'] },
];

const MONEY = [
  '$5,000 AUD secures the Brand Day',
  'If we both agree to go ahead after the day, the remaining $25,000 AUD is $10,000 at placement, then 3 x $5,000',
];

/* ---------------------------------------------------------------- */

function StepCard({ s }: { s: Step }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-6 md:p-7">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-display text-4xl font-extrabold text-zinc-800">{s.num}</span>
        <div>
          <p className="font-display text-[18px] font-extrabold text-white">{s.title}</p>
          <p className="text-zinc-500 text-[12px] uppercase tracking-widest mt-1">{s.when}</p>
        </div>
      </div>
      <p className="text-zinc-300 text-[15px] leading-relaxed">{s.body}</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-800">
        <div>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">You get</p>
          <p className="text-zinc-300 text-[14px] leading-relaxed">{s.get}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mb-2">Before we move on</p>
          <p className="text-zinc-300 text-[14px] leading-relaxed">{s.gate}</p>
        </div>
      </div>
    </div>
  );
}

function ListWithIcon({ items, tone }: { items: string[]; tone: 'in' | 'out' }) {
  const Icon = tone === 'in' ? Check : X;
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <Icon className={`w-4 h-4 mt-1 flex-shrink-0 ${tone === 'in' ? 'text-blue-400' : 'text-zinc-600'}`} />
          <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Dain() {
  return (
    <PasswordGate storageKey="dain-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="The Operator Plan, Rivyl"
          description="The plan for getting a media operator into Rivyl and an MVP content operation shipping within 90 days."
          path="/dain"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Rivyl · Operator Intensive"
          title="The Operator"
          accent="Plan"
          blurb="We find you a person, train them up over 90 days, and get a minimum content operation out the door while we do it."
          backHref={null}
        />

        <Divider />

        <Wrap>
          <H2>Where you land at day 90</H2>
          <BulletList items={OUTCOME} />
        </Wrap>

        <Divider />

        <Wrap>
          <H2>How it runs</H2>
          <div className="space-y-4">
            {STEPS.map((s) => <StepCard key={s.num} s={s} />)}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>What happens if</H2>
          <div className="border-t border-zinc-800">
            {RULES.map((r) => (
              <div key={r.when} className="grid sm:grid-cols-[240px_1fr] gap-2 sm:gap-6 border-b border-zinc-800/70 py-4">
                <p className="text-white text-[15px] font-semibold">{r.when}</p>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{r.then}</p>
              </div>
            ))}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>What is included</H2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
              <p className="text-blue-400 font-semibold text-[13px] mb-4">Included</p>
              <ListWithIcon items={IN} tone="in" />
            </div>
            <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
              <p className="text-zinc-400 font-semibold text-[13px] mb-4">Not included</p>
              <ListWithIcon items={OUT} tone="out" />
            </div>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>What we need from you</H2>
          <div className="grid md:grid-cols-2 gap-4">
            {NEEDS.map((n) => (
              <div key={n.who} className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
                <p className="font-display text-[17px] font-extrabold text-white mb-4">{n.who}</p>
                <BulletList items={n.items} />
              </div>
            ))}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Investment</H2>
          <div className="rounded-xl border border-blue-500/20 bg-elevated/40 p-7">
            <p className="text-zinc-400 text-[14px] mb-1">All in</p>
            <p className="font-display text-4xl font-extrabold text-white mb-6">$30,000 AUD</p>
            <BulletList items={MONEY} />
            <p className="text-zinc-400 text-[14px] leading-relaxed mt-6 pt-5 border-t border-zinc-800">
              If either of us decides not to go ahead after the Brand Day, you have paid $5,000 for the day and the plan, and there is nothing further owed.
            </p>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Next step</H2>
          {DATE_OPTIONS.length > 0 ? (
            <>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">Pick one of these and the search starts that same week.</p>
              <BulletList items={DATE_OPTIONS} />
            </>
          ) : (
            <p className="text-zinc-400 text-[15px] leading-relaxed">
              Dates for the Brand Day come with this page. Once one is picked, the search starts that same week.
            </p>
          )}
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
