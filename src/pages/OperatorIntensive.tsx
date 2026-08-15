import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Check, X, Target, Zap, FileText, Megaphone, Settings, ArrowRight,
  ClipboardCheck, UserPlus, Video, Crosshair,
} from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';

/* The next step is the Intensive's own application, not a booking link. It posts
   with source 'operator-intensive' so it fires a separate Slack alert and carries
   its own GHL tag rather than landing in the Brand Builder Day queue. */
const APPLY_URL = '/applyforoperatorintensive';

/* Founding cohort counter. Sean runs FOUNDING_TOTAL of these at 30k before the
   price moves to 50k. Bump FOUNDING_CURRENT as each one is sold; it is the
   only place the number lives, so the hero and the investment section stay in
   step. Separate from the per quarter capacity cap, which is about how many can
   run at once, not how many are left at this price. */
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

/* ---------------------------------------------------------------- */

const seen = [
  'What a real operator looks like.',
  'How the right media lead compounds a business',
  'How the wrong hire burns time, money, and trust',
];

const existsTo = [
  'Design the right role for your business',
  'Help you set up and run a hiring process that attracts, tests, and closes the right person',
  'Often jump in to personally hunt and sell A players when it makes sense',
  'Then spend 90 days turning them into a weaponised Operator running your Authority Engine',
];

const forYou = [
  'You are doing 200k+/month with clear offers and a working sales process',
  'You are either replacing your current creative director / media lead or know you want a weaponised creative director in that seat',
  'You want an internal media lead, not another agency retainer',
  'You want one person that can own your Authority Engine and scale it alongside you over years',
];

const notForYou = [
  'Early stage founders still figuring out what they sell',
  'Founders looking for "done for you everything"',
  'Founders who do not see their creative director as their number one business asset',
  'Anyone who will not show up for interviews or decisions',
];

const outcome = [
  {
    icon: Target,
    title: 'A clearly defined Operator role',
    body: 'An Operator / Creative Director role that matches the level of business you are actually running.',
    sub: [],
  },
  {
    icon: FileText,
    title: 'A reusable hiring pack and process',
    body: 'Role, JD, test, scorecard, ramp plan.',
    sub: [],
  },
  {
    icon: UserPlus,
    title: 'A media Operator you chose',
    body: 'With my eyes and conviction behind the decision.',
    sub: [
      'You own the hire',
      'I help you see who is actually an operator, sell them the vision, and onboard them properly from day one',
    ],
  },
  {
    icon: Settings,
    title: 'A 90 day installed Authority Engine they run',
    body: '',
    sub: [
      'Short form system with daily data entries',
      '1 x 6 video Authority Engine trust asset cycle',
      'Weekly reviews + training + content advisory board',
      'A simple cadence and review rhythm that links content to pipeline',
    ],
  },
];

const phase1Items = [
  'Diagnose the biggest constraint from turning strangers into buyers.',
  'Align your personality, positioning and perspective to key content buckets of demand',
  'Map your Authority Engine across Instagram, YouTube, podcast, and email',
  'Assess where your current media operation is leaking opportunity',
  'Define exactly what this Operator / Creative Director must own week to week in your business',
  'Clarify your 12 month vision for you and your media Operator',
  'Set 3 to 5 clear 90 day outcomes for content and pipeline',
];

const phase1Deliverables = [
  'Authority Engine Blueprint',
  '90 day content plan',
  "Initial Operator role definition and 90 day scorecard with clear KPI's",
];

const hiringSprint = [
  {
    num: '1',
    icon: Target,
    title: 'Design the role and 90 day scorecard',
    items: [
      'Responsibilities and ownership',
      'KPIs (inputs and outputs)',
      'What "dangerous at 90 days" vs "weaponised at 12 months" actually means',
      'Compensation band and upside options',
    ],
    tail: null,
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
    tail: null,
  },
  {
    num: '3',
    icon: Crosshair,
    title: 'Help you hunt and run the pipeline',
    items: [
      'Your team runs the job posts and outbound under the hiring pack we design',
      'I review the flow with you and, where it makes sense, I will personally reach out to specific candidates or profiles to sell them on the opportunity',
      'My leadership partner and I help you screen applications and test work so you are only meeting people with a real shot',
    ],
    tail: 'You get the benefit of my "I hunt for fun" instinct without me pretending to be a full time recruiter.',
  },
  {
    num: '4',
    icon: ClipboardCheck,
    title: 'Final interviews, selling the vision and onboarding setup',
    items: [
      'I join final interviews so you are not guessing in a vacuum',
      'I pressure test their experience and thinking',
      'I sell them the vision, the runway, and exactly what winning in this role looks like',
    ],
    tail: null,
  },
];

const rampPlan = [
  'Week by week responsibilities',
  'Targets and metrics',
  'How often you meet',
  'What "great", "fine", and "not acceptable" look like',
];

const phase3 = [
  {
    icon: Zap,
    title: 'Short form Engine',
    items: [
      'Weekly Capture Block with you',
      'Short form OS (pillars, formats, hooks)',
      'Operator Weekly Playbook',
      'Short form scorecard and cadence form',
    ],
  },
  {
    icon: Video,
    title: 'Long form and Trust Assets',
    items: [
      '1 x 6-8 video pillar video trust cycle',
      'Trojan Horse VSL tied directly to your core offer',
      'Exact lead magnet trust assets mapped to each video',
    ],
  },
  {
    icon: Megaphone,
    title: 'Cadence and feedback',
    items: [
      'Weekly Engine Check in form',
      'Q&A / Operator Clinics',
      'Loom reviews on real assets',
      'Three straight weeks hitting agreed lead and pipeline targets by Day 90',
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
    body: 'I show up for the cadence we agree, not to manage your whole media team.',
  },
  {
    title: 'Not a recruiting guarantee',
    body: 'I do not promise "we will find the perfect person by X date". I promise a world class process, my pattern recognition from multiple operators, and my help selling the right person on this seat.',
  },
  {
    title: 'Not a forever contract',
    body: 'After the 90 days, we both decide whether it makes sense to move into a 12 month advisory relationship.',
  },
];

const investmentIncludes = [
  'Brand Builder Day',
  'Operator Blueprint + Hiring Sprint',
  '90 Day Authority Engine Install',
];

/* ---------------------------------------------------------------- */

function OperatorPage() {
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04]">
              Operator + Authority
              <br />
              Engine Intensive.
            </h1>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHY THIS EXISTS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Why this exists</Label>
            <H2>You do not need another "video guy".</H2>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-6">
              You need one person owning media like a profit centre and one Engine they can run every week.
            </p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              A weaponised creative director.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-8 mb-5">
              I have been behind the scenes of multiple 7 &amp; 8 figure operators + media teams. Therefore, I know
              exactly:
            </p>
            <Bullets items={seen} tone="blue" />

            <div className="glow-card border-blue-500/20 p-7 mt-10">
              <p className="text-zinc-300 text-[16px] leading-relaxed">
                My unfair advantage is simple. I hunt for fun. Give as much as possible, and help the good guys
                win. Nobody sells the position like me because I am the exact product of the next opportunity they
                are about to walk into. I know exactly what a creative director needs better than they do.
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The outcome</Label>
            <H2>By the end of this project, you will have.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {outcome.map((o, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <o.icon className="w-[18px] h-[18px] text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{o.title}</h3>
                  {o.body && <p className="text-zinc-500 text-sm leading-relaxed">{o.body}</p>}
                  {o.sub.length > 0 && (
                    <div className={o.body ? 'mt-4' : ''}>
                      <Bullets items={o.sub} tone="blue" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-10">
              You walk away with a person and a system, not just more clips.
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
            <H2>Three phases.</H2>
          </Section>
        </div>
      </section>

      {/* PHASE 1 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-display text-5xl font-extrabold text-zinc-800">01</span>
              <div>
                <p className="text-blue-400 font-semibold text-sm">Phase 1 &middot; Brand Builder Day and Operator Blueprint</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">1 day in your office &middot; included (normally 5,000 AUD)</p>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8 mb-8">
              We start with the same Brand Builder Day I use to architect every Authority Engine, then extend it into the Operator blueprint. On this day we:
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
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-display text-5xl font-extrabold text-zinc-800">02</span>
              <div>
                <p className="text-blue-400 font-semibold text-sm">Phase 2 &middot; Operator Blueprint + Hiring Sprint</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">8 to 10 weeks &middot; advisory + hiring support (with hunting when it matters)</p>
              </div>
            </div>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-8">
              I am not going to throw up a seek ad. Do that yourself. This is what I will do.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-6">
              {hiringSprint.map((s) => (
                <div key={s.num} className="glow-card p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <s.icon className="w-[18px] h-[18px] text-blue-400" />
                    <span className="text-zinc-600 text-sm font-mono">{s.num}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-4">{s.title}</h3>
                  <Bullets items={s.items} />
                  {s.tail && (
                    <p className="text-zinc-300 text-sm leading-relaxed mt-5 pt-5 border-t border-zinc-800">
                      {s.tail}
                    </p>
                  )}
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
                We are testing judgment, not just editing tricks.
              </p>
            </div>
          </Section>
        </div>

        {/* RAMP PLAN */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-8">
          <Section>
            <div className="glow-card p-8">
              <p className="text-white text-sm font-semibold mb-4">
                We then map a concrete 90 day onboarding and ramp plan
              </p>
              <Bullets items={rampPlan} tone="blue" />
            </div>
          </Section>
        </div>

        {/* THE BOUNDARY */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-8">
          <Section>
            <div className="glow-card p-8">
              <p className="text-white font-semibold text-[17px] leading-relaxed mb-2">
                I am not your HR department or a recruiting agency.
              </p>
              <p className="text-white font-semibold text-[17px] leading-relaxed mb-5">
                I do not promise a unicorn on a specific date.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-5">
                I design the role, architect the process, help you hunt intelligently, and sit in the decisive
                conversations so you make a confident hire.
              </p>
              <p className="text-zinc-300 leading-relaxed pt-5 border-t border-zinc-800">
                You make the final decision. You manage performance. I stack the odds in your favour.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 3 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-display text-5xl font-extrabold text-zinc-800">03</span>
              <div>
                <p className="text-blue-400 font-semibold text-sm">Phase 3 &middot; 90 Day Authority Engine Install</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">90 days with your new Operator</p>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              Once your new Operator is in seat (or an interim is agreed), we install the Engine they will run every week.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="grid md:grid-cols-3 gap-6">
              {phase3.map((p, i) => (
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
              By Day 90, your Operator is weaponised and you have one Engine they can keep running without you being
              dragged into the weeds.
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* INVESTMENT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Investment, capacity and next step</Label>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-zinc-400 text-[14px] mb-1">Founding rate</p>
              <p className="font-display text-4xl font-extrabold text-white mb-6">30,000 AUD</p>
              <p className="text-white text-sm font-semibold mb-4">All in for:</p>
              <Bullets items={investmentIncludes} tone="blue" />
            </div>
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              This is number {FOUNDING_CURRENT} of {FOUNDING_TOTAL} at a founding rate. After that it moves to 50k.
            </p>
            <div className="glow-card p-7 mt-6">
              <p className="text-white text-sm font-semibold mb-4">How the money works</p>
              <Bullets
                items={[
                  '5,000 AUD to secure your Brand Builder Day (Phase 1)',
                  'If, at the end of the Day, we both agree to move into the full Intensive, the remaining 25,000 AUD is broken into $10,000 to place, and 3 x $5,000 payments thereafter',
                ]}
                tone="blue"
              />
              <p className="text-zinc-400 text-sm leading-relaxed mt-5 pt-5 border-t border-zinc-800">
                If either of us decides it is not the right move after the Day, you have paid 5k for a proper Brand
                Builder Day and blueprint, and we part ways with no further obligation.
              </p>
            </div>
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              This is a white glove project exclusively for founders where I am confident we can win together.
            </p>
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
                'If we are both in, you secure your Brand Builder Day with 5k and we book dates',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-12">
              From there the default is simple. We spend a day together, then so long as we both agree, we move
              straight into finding and weaponising the person who will own your Authority Engine.
            </p>
            <ApplyButton size="lg" />
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function OperatorIntensive() {
  return (
    <PasswordGate storageKey="operator-unlocked">
      <OperatorPage />
    </PasswordGate>
  );
}
