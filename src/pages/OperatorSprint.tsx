import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Check, X, Target, Zap, FileText, Settings, ArrowRight,
  ClipboardCheck, Crosshair,
} from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';

/* /operatorsprint. The Operator Intensive restructured (5 Oct 2026): a Media
   Operating Brief, a defined six week search, an MVP operation, then a 90 day
   Operator Install from the day the person starts. Same framework and design as
   /operatorintensive, which stays live unchanged. Copy is Sean's, with the ban
   list lines rewritten. */

const APPLY_URL = '/applyforoperatorintensive';

/* Founding cohort counter, same numbers as /operatorintensive. Bump both. */
const FOUNDING_CURRENT = 3;
const FOUNDING_TOTAL = 5;

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{children}</h2>
);

const Ticks = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

const Crosses = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

const ApplyButton = ({ size = 'md' }: { size?: 'md' | 'lg' }) => {
  const pad = size === 'lg' ? 'px-8 py-4' : 'px-7 py-3.5';
  return (
    <Link
      to={APPLY_URL}
      className={`btn-shine inline-flex items-center justify-center gap-2 bg-white text-black ${pad} rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors`}
    >
      Apply for the Intensive
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
};

const Bullets = ({ items, tone = 'zinc' }: { items: string[]; tone?: 'zinc' | 'blue' }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${tone === 'blue' ? 'bg-blue-400' : 'bg-zinc-600'}`} />
        <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const PhaseHead = ({ num, title, sub }: { num: string; title: string; sub: string }) => (
  <div className="flex items-baseline gap-4 mb-3">
    <span className="font-display text-5xl font-extrabold text-zinc-800">{num}</span>
    <div>
      <p className="text-blue-400 font-semibold text-sm">{title}</p>
      <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{sub}</p>
    </div>
  </div>
);

/* ---------------------------------------------------------------- */

const seen = [
  'What a legit operator looks like',
  'How the right media compounds a business',
  'How the wrong hire burns time, money, and trust',
];

const existsTo = [
  'Define the media capability your business actually needs',
  'Design the Operator role, scorecard, and decision rights',
  'Build and run a structured search and assessment process',
  'Support the selection of the person responsible for the role',
  'Install the minimum media operation they will own',
  'Enable them through 90 days of real work',
];

const forYou = [
  'You are doing 200k+/month with clear offers and a working sales process',
  'You are either replacing your current creative director / media lead or know you want a creative director in that seat',
  'You want an internal media lead, not another agency retainer',
  'You want one internal person who can take ownership of the agreed media operation and develop with the business over time',
  'You are willing to participate in the initial working day, interviews, decisions, and Operator management',
];

const notForYou = [
  'Early stage founders still figuring out what they sell',
  'Founders looking for "done for you everything"',
  'Founders who do not see media as their number one business asset',
  'Anyone who will not show up for interviews or decisions',
];

const outcome = [
  'A clear 90 day media plan',
  'A defined Operator role, scorecard, and decision rights',
  'A structured hiring and assessment process',
  'A documented minimum viable media operation',
  'A defined ownership plan for that operation',
  'Media standards, workflows, and an operating playbook',
  'A final capability review and next stage recommendation',
];

const phase1Items = [
  'Primary business objective',
  'Priority audience and offer',
  'What media must accomplish',
  'What the Operator owns',
  'Decision rights',
  'Minimum weekly operation',
  '90 day scorecard',
];

const phase1Deliverables = [
  'Media Operating Brief',
  'Operator role definition',
  'Decision rights',
  'MVP media specification',
  'Operator scorecard',
  'Hiring recommendation',
];

const search = [
  {
    num: '1',
    icon: Target,
    title: 'Design the role and scorecard',
    items: [
      'Responsibilities and ownership',
      'KPIs (inputs and outputs)',
      'What good looks like at 30, 60, and 90 days',
      'Compensation band and upside options',
    ],
  },
  {
    num: '2',
    icon: FileText,
    title: 'Build your hiring pack',
    items: [
      'Job description that repels the wrong people',
      'Outreach and "here is the role" messages your team can use across IG, email, LinkedIn, and your network',
      'Application questions that filter for seriousness and thinking',
      'A test project that shows how they actually work',
    ],
  },
  {
    num: '3',
    icon: Crosshair,
    title: 'Run the search',
    items: [
      'Your team owns job posts, outbound, scheduling, and candidate communication',
      'We provide the search structure, assessment process, candidate review, and final interview support',
    ],
  },
  {
    num: '4',
    icon: ClipboardCheck,
    title: 'Final interviews and recommendation',
    items: [
      'I join final interviews so you are not guessing in a vacuum',
      'I pressure test their experience and thinking',
      'I sell them the vision, the runway, and exactly what winning in this role looks like',
      'Final hiring recommendation',
    ],
  },
];

const week6 = [
  'Proceed with a permanent Operator',
  'Begin with an agreed interim owner',
  'Pause or extend the search separately',
];

const mvp = [
  'One priority audience',
  'One primary business objective',
  'One core workflow',
  'One weekly cadence',
  'One scorecard',
];

const install = [
  {
    icon: Zap,
    title: 'Real work enablement',
    items: [
      'Operator onboarding',
      'Weekly enablement on real assets',
      'Loom reviews on real work',
      'Q&A / Operator Clinics',
    ],
  },
  {
    icon: Settings,
    title: 'Standards and playbook',
    items: [
      'Media standards and checklists',
      'Operator Weekly Playbook',
      'Scorecard and cadence form',
      'Weekly Engine Check in form',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Capability milestones',
    items: [
      'First 2 weeks: understand the brand, build the calendar, run the first workflow',
      'Day 30: make content decisions and explain why',
      'Day 60: own the pipeline from brief to publication',
      'Day 90: assessed against the agreed capability scorecard, with a next stage recommendation',
    ],
  },
];

const isNot = [
  {
    title: 'Not a done for you content agency',
    body: 'Your team films, edits, posts, builds funnels, and sends emails.',
  },
  {
    title: 'Not a full time CMO or creative director',
    body: 'The Authority Engine provides scheduled enablement and strategic advice directly related to the agreed media operation. It does not manage your team or daily execution.',
  },
  {
    title: 'Not a recruiting guarantee',
    body: 'I do not promise "we will find the perfect person by X date". I promise a world class process, my pattern recognition from multiple operators, and my help selling the right person on this seat.',
  },
  {
    title: 'Not a forever contract',
    body: 'After the 90 Day Operator Install, we both decide whether it makes sense to move into a 12 month advisory relationship.',
  },
];

const defineSelect = [
  'Media Operating Brief',
  'Operator role and scorecard',
  'MVP media specification',
  'Search process',
  'Candidate assessment',
  'Selection support',
  'Operating system design',
];

const installIncludes = [
  'Operator onboarding',
  'Real work training',
  'Weekly enablement',
  'Operating playbook',
  'Capability reviews',
  'Final capability assessment',
];

const payments = [
  '$10,000 on commencement',
  '$10,000 when the search process is built and active',
  '$10,000 when the permanent Operator or agreed interim owner starts and enablement begins',
];

/* ---------------------------------------------------------------- */

function OperatorSprintPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">
              Invite only &middot; The Authority Engine
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              Operator Intensive.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Define the role, support the selection, and install the capability to own your Authority Engine through a 90 day Operator Install.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHY THIS EXISTS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Why this exists</Label>
            <H2>One person who owns media.</H2>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-6">
              You need one capable person who understands the brand, makes sound decisions, owns projects end to end,
              and keeps media moving without the founder carrying every decision.
            </p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              The Operator Intensive helps you define that role, support the search and selection process, and equip
              the person who fills it with the standards, systems, and judgment required to own the agreed media operation.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-8 mb-5">
              I have been behind the scenes of multiple 7 &amp; 8 figure operators + media teams. I&apos;ve seen exactly:
            </p>
            <Bullets items={seen} tone="blue" />

            <div className="glow-card border-blue-500/20 p-7 mt-10">
              <p className="text-zinc-300 text-[16px] leading-relaxed">
                I hunt for fun. Give as much as possible, and help the good guys win. I know what good looks like in
                this seat because I have worked behind the scenes with high performing founders, Operators, and media teams.
              </p>
            </div>

            <p className="text-zinc-400 leading-relaxed mt-10 mb-5">This Intensive exists to:</p>
            <Ticks items={existsTo} />
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              This is a founding cohort rate. I am running {FOUNDING_TOTAL} of these before it moves to 50k.
              This is number {FOUNDING_CURRENT}.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO THIS IS FOR */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who this is for</Label>
            <H2>This is for you if.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-5">This is for you if</p>
                <Ticks items={forYou} />
              </div>
              <div className="glow-card p-8">
                <X className="w-5 h-5 text-zinc-500 mb-4" />
                <p className="text-zinc-400 font-semibold text-sm mb-5">This is not for</p>
                <Crosses items={notForYou} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE OUTCOME */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The outcome</Label>
            <H2>By the end of the process, you will have.</H2>
            <div className="mt-10">
              <Ticks items={outcome} />
            </div>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-10">
              The initial focus is deliberately narrow: make one media operation work consistently before adding more
              channels, formats, or volume.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* HOW IT WORKS INTRO */}
      <section className="pt-20 md:pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>How it works</Label>
            <H2>Four parts. One defined search period, followed by a 90 day Operator Install.</H2>
          </Section>
        </div>
      </section>

      {/* PHASE 1 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <PhaseHead num="01" title="Media Operating Brief" sub="1 day in your office" />
            <p className="text-zinc-400 leading-relaxed mt-8 mb-8">
              We start with one working day together to build the Media Operating Brief. On this day we define:
            </p>
            <Ticks items={phase1Items} />
            <div className="glow-card p-7 mt-10">
              <p className="text-white text-sm font-semibold mb-4">Deliverables</p>
              <Bullets items={phase1Deliverables} tone="blue" />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 2 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <PhaseHead num="02" title="Operator Blueprint and Search" sub="Six week defined search period" />
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-8">
              I am not going to throw up a seek ad. Do that yourself. This is what I will do.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-6">
              {search.map((s) => (
                <div key={s.num} className="glow-card p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <s.icon className="w-[18px] h-[18px] text-blue-400" />
                    <span className="text-zinc-600 text-sm font-mono">{s.num}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-4">{s.title}</h3>
                  <Bullets items={s.items} />
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* THE TEST */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">Example test</p>
              <p className="text-zinc-300 text-[15px] leading-relaxed mb-5">
                "Here is 5 to 10 minutes of raw footage. Turn this into:
              </p>
              <ul className="space-y-3 mb-5">
                {[
                  '3 to 5 short form clips you would actually post (hooks, captions, CTAs)',
                  '5 headline ideas for a YouTube / pillar video',
                  'A simple 2 week content plan using those assets',
                  'A Loom walking me through what you did and why"',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-[9px] flex-shrink-0" />
                    <span className="text-zinc-300 text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-400 text-[15px] leading-relaxed pt-5 border-t border-zinc-800">
                We are testing their judgment.
              </p>
            </div>
          </Section>
        </div>

        {/* THE BOUNDARY + WEEK 6 */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-8">
          <Section>
            <div className="glow-card p-8">
              <p className="text-white font-semibold text-[17px] leading-relaxed mb-5">
                You make the final decision. You manage performance. We do not guarantee a hire by a specific date.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                At Week 6, we agree one of three options:
              </p>
              <ol className="space-y-3">
                {week6.map((t, i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="text-blue-400 font-semibold text-[15px] w-4 flex-shrink-0">{i + 1}.</span>
                    <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 3 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <PhaseHead num="03" title="MVP Operation" sub="During the search, where practical" />
            <p className="text-zinc-400 leading-relaxed mt-8">
              During the search, we define and establish the minimum operation where practical. This gives the Operator
              a working system to inherit when they start.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-5">The MVP is limited to:</p>
            <Ticks items={mvp} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 4 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <PhaseHead
              num="04"
              title="90 Day Operator Install"
              sub="90 days from the start of the permanent Operator or agreed interim owner"
            />
            <p className="text-zinc-400 leading-relaxed mt-8">
              Once your Operator or interim owner is in seat, we install the Engine they will run every week.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="grid md:grid-cols-3 gap-6">
              {install.map((p, i) => (
                <div key={i} className="glow-card p-8">
                  <p.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-4">{p.title}</h3>
                  <Bullets items={p.items} tone="blue" />
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <p className="text-zinc-300 text-[17px] leading-relaxed">
              At Day 90, the Operator is assessed against the agreed capability scorecard and you receive a next stage recommendation.
            </p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              The goal is for the Operator to understand the agreed operation, make normal media decisions, own projects
              end to end, and recommend what should improve next.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS NOT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What this is not</Label>
            <H2>To avoid misalignment.</H2>
            <div className="mt-10 space-y-4">
              {isNot.map((n, i) => (
                <div key={i} className="glow-card p-7">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div>
                      <p className="text-white font-semibold text-base mb-2">{n.title}</p>
                      <p className="text-zinc-400 text-[15px] leading-relaxed">{n.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-10">
              You manage the Operator. The Authority Engine trains, reviews, and assesses them.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* INVESTMENT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Founding investment</Label>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="font-display text-4xl font-extrabold text-white mb-8">$30,000 AUD total</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white text-sm font-semibold mb-4">$20,000 Define and Select</p>
                  <Bullets items={defineSelect} tone="blue" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-4">$10,000 90 Day Operator Install</p>
                  <Bullets items={installIncludes} tone="blue" />
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              This is number {FOUNDING_CURRENT} of {FOUNDING_TOTAL} at a founding rate. After that it moves to 50k.
            </p>
            <div className="glow-card p-7 mt-6">
              <p className="text-white text-sm font-semibold mb-4">Payments</p>
              <Bullets items={payments} tone="blue" />
              <p className="text-zinc-400 text-sm leading-relaxed mt-5 pt-5 border-t border-zinc-800">
                If no permanent Operator or interim owner starts, the final $10,000 is not due. The Define and Select
                work remains complete and retained.
              </p>
            </div>
            <div className="glow-card p-7 mt-6">
              <p className="text-white text-sm font-semibold mb-3">Capacity</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                This is invite only. There is no public link, no buy now button. I cap these at 5 per quarter so
                I can stay close to:
              </p>
              <Bullets items={['Your operator', 'Your content', 'Your data']} tone="blue" />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* AFTER */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>After the 90 Day Operator Install</Label>
            <p className="text-zinc-300 text-[17px] leading-relaxed">
              Clients who complete the Operator Install may be invited into the 12 month Authority Engine Advisory,
              including access to the private Authority Engine founder network.
            </p>
            <p className="text-zinc-500 text-[14px] leading-relaxed mt-8">
              Selected clients may be invited into a separate Founding Partner arrangement for trusted referrals. This
              sits outside the Operator Intensive and is governed by a separate agreement.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* NEXT STEP */}
      <section className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-10" />
            <H2>Next step.</H2>
            <div className="mt-10 mb-12">
              <Ticks items={[
                'Send your application using the button below',
                'We do a short call to confirm fit and logistics',
                'If we are both in, the commencement payment books your Media Operating Brief day',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-12">
              From there we spend a day together on the Media Operating Brief, then move into the search and the 90 Day
              Operator Install with the person who will own your Authority Engine.
            </p>
            <ApplyButton size="lg" />
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function OperatorSprint() {
  return (
    <PasswordGate storageKey="operator-unlocked">
      <OperatorSprintPage />
    </PasswordGate>
  );
}
