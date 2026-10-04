import { Check, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, H2, Eyebrow, BulletList } from '../components/undeniable/Bits';

/* Dain Walker / Rivyl. The Operator Intensive scoped to one outcome: a person in
   seat running an MVP content operation. Written for the CEO to read once and say
   yes. Outputs only, never the method. Dain sits close to our category, so nothing
   here explains how the day, the test or the scorecard actually work. */

/* Brand Day date options. Leave empty and the page says dates come separately. */
const DATE_OPTIONS: string[] = [];

type Step = { num: string; title: string; when: string; body: string; get: string; gate: string };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Brand Day, scoped to operations',
    when: 'Week 1 · one day',
    body: 'One day with Dain. Get hyper specific on what he actually wants from media in the next 90 days, then work backwards to the operation required to make it happen. The brand stays as it is. We build what the operation needs.',
    get: 'The 90 day target, the operator role, and the MVP spec.',
    gate: 'Dain and the CEO sign off the target and the MVP. Nothing moves until they do.',
  },
  {
    num: '02',
    title: 'The hunt',
    when: 'Weeks 1 to 4',
    body: 'I hunt personally, alongside your own outbound. Every candidate proves the work before you meet them. I sit in the final interviews and sell them the seat. The default is a 90 day contract hire, with the path to permanent built in.',
    get: 'A shortlist of people who have already shown they can do the job.',
    gate: 'You make the hire. You own the decision.',
  },
  {
    num: '03',
    title: 'MVP live',
    when: 'From week 2',
    body: 'The content does not wait for the hire. If nobody is in seat yet, freelancers start the MVP so it ships while we hunt. The operator walks into a running operation, not a blank page.',
    get: 'The minimum content operation, live and shipping every week.',
    gate: 'Three straight weeks on the agreed cadence.',
  },
  {
    num: '04',
    title: 'The 90 day ramp',
    when: 'Day 1 to 90 of the hire',
    body: 'Weekly review against the scorecard. Training on your real content, not theory. The operator takes the MVP off the freelancers and owns it.',
    get: 'An operator running it without Dain or me in the weeds.',
    gate: 'Day 90. Convert the contract, or call it.',
  },
];

const OUTCOME = [
  'One operator in seat, on a 90 day contract with a clear path to permanent',
  'An MVP content operation shipping every week, without Dain chasing it',
  'A scorecard the CEO can read in five minutes',
  'A hiring pack you keep, so the next hire runs without us',
];

const RULES: Array<{ when: string; then: string }> = [
  { when: 'Hire found by week 4', then: 'The operator takes over from the freelancers and the 90 day ramp starts.' },
  { when: 'No hire by week 4', then: 'Freelancers keep shipping, the hunt keeps going. You lose nothing waiting.' },
  { when: 'Hire not working by day 30', then: 'We call it early and go back to the shortlist.' },
  { when: 'MVP on cadence three weeks straight', then: 'You can add volume. Separate buy, your call.' },
  { when: 'MVP missing cadence', then: 'Fix one thing at a time. The scope does not grow.' },
];

const IN = [
  'Brand Day, scoped to operations',
  'Role, scorecard and hiring pack',
  'Personal hunting and the final interviews',
  'The MVP spec, and freelancers briefed to run it in the interim',
  'Weekly reviews with the operator for 90 days',
];

const OUT = [
  'A brand build or rebrand',
  'Volume content. Available later if you want it',
  'Filming, editing or posting. Your team and the operator own that',
  'A recruiting guarantee by a set date',
  'Operator and freelancer wages, paid by Rivyl',
];

const NEEDS = [
  { who: 'Dain', items: ['The Brand Day', 'Final interviews', 'Sign off on the target and the MVP'] },
  { who: 'The CEO', items: ['Budget for the hire and the interim freelancers', 'One person who owns approvals', 'The yes on this page'] },
];

const MONEY = [
  '$5,000 AUD secures the Brand Day',
  'If we both agree to move after the day, the remaining $25,000 AUD is $10,000 at placement, then 3 x $5,000',
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
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mb-2">Gate</p>
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
          description="One operator in seat, one MVP content operation shipping weekly, 90 days to get them dangerous."
          path="/dain"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Rivyl · Operator Intensive"
          title="The Operator"
          accent="Plan."
          blurb="One person running your media. One minimum content operation shipping every week. 90 days to get them dangerous."
          backHref={null}
        />

        <Divider />

        <Wrap>
          <Eyebrow>By day 90</Eyebrow>
          <H2>What you have.</H2>
          <BulletList items={OUTCOME} />
        </Wrap>

        <Divider />

        <Wrap>
          <Eyebrow>How it runs</Eyebrow>
          <H2>Four steps. Each one has a gate.</H2>
          <div className="space-y-4">
            {STEPS.map((s) => <StepCard key={s.num} s={s} />)}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <Eyebrow>If this, then that</Eyebrow>
          <H2>Decided now, so nobody waits on me later.</H2>
          <div className="border-t border-zinc-800">
            {RULES.map((r) => (
              <div key={r.when} className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 border-b border-zinc-800/70 py-4">
                <p className="text-white text-[15px] font-semibold">{r.when}</p>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{r.then}</p>
              </div>
            ))}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <Eyebrow>Scope</Eyebrow>
          <H2>In and out.</H2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
              <p className="text-blue-400 font-semibold text-[13px] mb-4">In</p>
              <ListWithIcon items={IN} tone="in" />
            </div>
            <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
              <p className="text-zinc-400 font-semibold text-[13px] mb-4">Out</p>
              <ListWithIcon items={OUT} tone="out" />
            </div>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <Eyebrow>What it takes from you</Eyebrow>
          <H2>Two people, a short list.</H2>
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
          <Eyebrow>Investment</Eyebrow>
          <div className="rounded-xl border border-blue-500/20 bg-elevated/40 p-7">
            <p className="text-zinc-400 text-[14px] mb-1">All in</p>
            <p className="font-display text-4xl font-extrabold text-white mb-6">$30,000 AUD</p>
            <BulletList items={MONEY} />
            <p className="text-zinc-400 text-[14px] leading-relaxed mt-6 pt-5 border-t border-zinc-800">
              If either of us calls it after the Brand Day, you have paid $5,000 for the day and the plan, and we part ways with no further obligation.
            </p>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <Eyebrow>Next step</Eyebrow>
          <H2>Lock the day.</H2>
          {DATE_OPTIONS.length > 0 ? (
            <>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-4">Pick one. The hunt starts the same week.</p>
              <BulletList items={DATE_OPTIONS} />
            </>
          ) : (
            <p className="text-zinc-400 text-[15px] leading-relaxed">
              Dates come with this page. Pick one and the hunt starts the same week.
            </p>
          )}
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
