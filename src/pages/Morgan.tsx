import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Check, X, Target, Zap, FileText, Megaphone, Settings, ArrowRight,
  ClipboardCheck, UserPlus, Video, Crosshair,
} from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/* Morgan Nelson. Private follow on from the call.
   This is the Operator Intensive outline rewritten in his language and his
   situation: he already has a candidate, so the hunting phase is scaled back to
   role design, comp structure and the final interview. Pricing here is the
   structure Sean quoted him live (5k Day, 5k hiring, 15k install with the Day
   rolled in), not the 30k founding rate on /operatorintensive. */

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

const Pull = ({ children }: { children: React.ReactNode }) => (
  <div className="glow-card border-blue-500/20 p-7 mt-8">
    <p className="text-zinc-200 text-[16px] leading-relaxed italic">{children}</p>
  </div>
);

/* ---------------------------------------------------------------- */

type Score = { name: string; score: number; note: string };

const SCORES: Score[] = [
  {
    name: 'Clarity',
    score: 2,
    note: 'Your number on the call. Not good at all anymore, because you went into business coaching at the start of the year when you switched the front end offer, and the last month or two you have gone back. Wishy washy for sure, and it needs refining a lot.',
  },
  {
    name: 'Visibility',
    score: 3,
    note: 'Organic. You do not run DMs off Instagram and you do not want to. The brand gives, the ads clean up. Same shape as what Hormozi runs. DreamFest brings in a lot of people, and that is where most of it comes from.',
  },
  {
    name: 'Authority',
    score: 4,
    note: 'Better than most. You have done a pretty okay job of positioning what it is that you do. Take the four. The problem is it is a little bit murky on how you do it.',
  },
  {
    name: 'Quality',
    score: 3,
    note: 'Could definitely be better. You do not have a problem converting in the room, that is your jam, probably a bit better than industry average. The people arriving are just not as pre sold as they could be.',
  },
];

function Scores({ items }: { items: Score[] }) {
  return (
    <div className="border-t border-zinc-800">
      {items.map((s) => (
        <div key={s.name} className="border-b border-zinc-800/70 py-5">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <p className="font-display text-[17px] font-extrabold text-white">{s.name}</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-2 w-7 rounded-sm ${n <= s.score ? 'bg-blue-500' : 'bg-zinc-800'}`}
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-[12px] tabular-nums whitespace-nowrap">{s.score} / 5</span>
            </div>
          </div>
          <p className="text-zinc-400 text-[14px] leading-relaxed">{s.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

const theThree = [
  {
    num: '1',
    icon: Target,
    title: 'What sits on the profile',
    body: 'The line that makes an entrepreneur see the outcome the second they land. Down the barrel of a gun. Taki has one thing and it is that you are going to become a million dollar person, and you feel it before you have read a second sentence.',
  },
  {
    num: '2',
    icon: FileText,
    title: 'The posts they hit first',
    body: 'The pieces sitting at the top of the profile, and whether they carry what someone has to believe to move from where they are to where you take them.',
  },
  {
    num: '3',
    icon: Megaphone,
    title: 'The theme underneath everything',
    body: 'The one message you reinforce constantly. Content is engineering beliefs, and that matters more for you because there is no sales team catching people on the other side.',
  },
];

const whoTheyAre = [
  'They earn about 300 to 600k a year and they are hustling and grinding',
  'They think they need to work harder and hustle more to get to the next level',
  'They are working an old paradigm. Limiting beliefs, fears, blockages about what it means to become a millionaire',
  'They cannot lead themselves yet, so they cannot lead a team',
  'Scattered business operator, a solopreneur, who has to become a proper founder who can grow a proper company',
];





const hireYouHave = [
  '80 applied through Seek. You shortlisted half and asked for a three minute video. Six or seven sent one.',
  'Two worth talking to. Lyle is talented and carries too much anxiety for this seat.',
  'The Body Science guy is grounded, sharp, disciplined, and wants to be back around hustle after the exit dropped the standards where he is.',
  'He asked for 100. He is cutting reels for you now.',
  'You want two or three options rather than one. The email blast after DreamFest, plus a bounty for anyone who sends real talent.',
];

const whatIDoOnHiring = [
  {
    num: '1',
    icon: Target,
    title: 'The role and the 90 day scorecard',
    items: [
      'What he owns week to week, and what he does not',
      'Inputs and outputs, both measured',
      'What dangerous at 90 days means, and what weaponised at 12 months means',
      'Compensation band and the upside',
    ],
    tail: null,
  },
  {
    num: '2',
    icon: FileText,
    title: 'The JD and the comp structure',
    items: [
      'You send me the JD and I tell you what to cut, what to add, and what not to say',
      'Two comp options. Higher base with no bonus, or lower base plus bonus. Anyone who takes the first one has told you something',
      'The base band for a head of content sits around 110 to 130 so they are actually invested. Head of short form sits nearer 105',
    ],
    tail: 'What you already run with Jack is the right instinct. 30 percent of YouTube revenue over baseline, and a month where that paid him a 3,000 bonus. That is what makes someone ramp the thing.',
  },
  {
    num: '3',
    icon: Crosshair,
    title: 'The mission sell',
    items: [
      'They are not buying the job, they are buying you',
      'Creatives are heavily emotional, and they want to be part of something bigger than themselves',
      'Your 18 month line is the whole pitch. Give me a solid 18 months and I will turn you into the business owner you need to be, and if you cannot give me 18 months, do not come here',
      'One filter worth adding. Someone who actually consumes business education content, because they will already know what good looks like',
    ],
    tail: null,
  },
  {
    num: '4',
    icon: ClipboardCheck,
    title: 'The final interview',
    items: [
      'I go last, so it reads as something they have to earn',
      'I pressure test the experience and the thinking',
      'I sell them the runway and exactly what winning in this seat looks like, so they walk in with a three year trajectory before they have done a day',
    ],
    tail: 'For a lot of creative directors I am the final boss, because I am the product of the opportunity they are about to walk into.',
  },
];

const contractShape = [
  '90 day contract to hire, with the milestones written before he starts',
  'Hit them and the status changes from contractor to employee, which is the moment you get to raise the bar again',
  'If he is not taking ownership by then, you have an exit that costs you nothing',
];


const install = [
  {
    icon: Zap,
    title: 'Short form Engine',
    items: [
      'Weekly capture block with you, built around the formats that actually suit you',
      'Pillars, formats and hooks written down so they survive a staff change',
      'Operator weekly playbook',
      'Short form scorecard and cadence form',
    ],
  },
  {
    icon: Video,
    title: 'Long form and trust assets',
    items: [
      'One cycle of 6 to 8 pillar videos that carry the message',
      'A VSL tied directly to the three day and the Inner Circle',
      'Lead magnets mapped to each video',
    ],
  },
  {
    icon: Megaphone,
    title: 'Cadence and feedback',
    items: [
      'Weekly engine check in',
      'Operator clinics and Q and A',
      'Loom reviews on the real assets',
      'Three straight weeks hitting agreed targets by day 90',
    ],
  },
];

const proof = [
  {
    name: 'Rhys Livingstone',
    body: 'Creative director was overcompensated and was never going to be the team leader. Hard conversation, out within a week, new person slotted straight into the operation. He moved to Melbourne and inside three weeks he was running it.',
  },
  {
    name: 'Doza',
    body: 'Same shape as yours. Creative director moving out, head of content moved in, then we streamlined the production so there is no team member risk left in it. Pull anyone out, put a technician in, the output still comes.',
  },
];

const isNot = [
  {
    title: 'Not a done for you content agency',
    body: 'Your people film, edit and post. I do not touch the account.',
  },
  {
    title: 'Not a recruiting agency, and not a unicorn on a date',
    body: 'I do not promise the perfect person by a fixed day. I promise the process, the pattern recognition from doing this across multiple operators, and my help selling the right person on the seat.',
  },
  {
    title: 'Not a creative director for hire',
    body: 'I show up for the cadence we agree. I am not managing your media team day to day.',
  },
  {
    title: 'Not weaponised in 90 days',
    body: 'I will not oversell that. In 90 days we get a media operator to the point where they are dangerous. Weaponised takes a lot longer than that.',
  },
  {
    title: 'Not a forever contract',
    body: 'At the end of the 90 days we both decide whether an ongoing advisory relationship makes sense.',
  },
];

const dayCovers = [
  'Positioning, perspective and personality, dialled tight into one message',
  'The line, the pinned posts and the theme that runs underneath everything',
  'The content buckets that carry it, and the capture formats that suit how you actually work',
  'What the production line looks like today, step by step, and who owns each part',
  'What this Operator has to own week to week, and the 90 day scorecard that says whether he is doing it',
  'Three to five clear 90 day outcomes for content and pipeline',
];

const dayDeliverables = [
  'Authority Engine blueprint',
  '90 day content plan',
  'Operator role definition and 90 day scorecard with clear KPIs',
];

const money = [
  { name: 'The Day', amount: '$5,000 AUD', note: 'Everything starts here. Nothing else gets committed to until it is done.' },
  { name: 'Hiring support', amount: '$5,000 AUD', note: 'JD, comp structure, and I take the final interview.' },
  { name: '90 Day Install', amount: '$10,000 AUD', note: 'Normally 15,000. The 5,000 from the Day rolls in, so it drops to 10.' },
];

const nextSteps = [
  'Send me the reels from the Body science hire when they come through, plus whatever context you have on him, ideally resume.',
  'I do a sweep of my network this week and come back with anyone worth putting in front of you.',
  'Put the email blast out after DreamFest and attach a bounty for anyone who sends real talent.',
  'I message you Monday. You say go, and we lock the date for the Day.',
];

/* ---------------------------------------------------------------- */

function MorganPage() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Morgan Nelson, The Operator Intensive"
        description="Follow on from the call. The read, the three things to fix, the hire, the 90 days, and how the money works."
        path="/morgan"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">
              Private &middot; Morgan Nelson &middot; The Authority Engine
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              One person to own it.
              <br />
              90 days to make them dangerous.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Follow on from our call. This is what I would do if I was sitting in your seat, and what it looks
              like if we do it together.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE READ */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The read</Label>
            <H2>Clarity is the constraint.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-10">
              Four lanes, out of five, from the call. Everything else sits downstream of the first one.
            </p>
            <Scores items={SCORES} />
            <Pull>
              Once clarity is dialled you can crank visibility. People will land and immediately know 'he is for
              me'. Then the authority reads as expertise instead of notoriety. The audience then walk into events
              pre sold.
            </Pull>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO LANDS ON THE PAGE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What they have to see</Label>
            <H2>He is 'the guy'.</H2>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-6">
              An entrepreneur must land on the page and think 'he is the guy who is going to change my identity to
              be a high performer'.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-8 mb-5">That entrepreneur, specifically.</p>
            <Ticks items={whoTheyAre} />
            <p className="text-zinc-400 leading-relaxed mt-8">
              Nothing on the profile says that right now.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE THREE THINGS */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>If I was in your position</Label>
            <H2>Three things, in this order.</H2>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {theThree.map((t, i) => (
                <motion.div
                  key={t.num}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <t.icon className="w-[18px] h-[18px] text-blue-400" />
                    <span className="text-zinc-600 text-sm font-mono">{t.num}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-3">{t.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{t.body}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-10">
              Get those three straight and the rest of this gets simple.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE HIRE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The hire</Label>
            <H2>You are close. Do not screw it up here.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              You do not need me to throw up a Seek ad, you already ran that. You need the seat designed properly
              and the opportunity sold properly, because everything downstream is decided in hiring.
            </p>
            <div className="glow-card p-8 mt-10">
              <p className="text-white text-sm font-semibold mb-4">Where you are up to</p>
              <Bullets items={hireYouHave} />
            </div>
            <Pull>
              You do not need to attract the best talent. You need someone hungry and disciplined who can run a
              camera, be there, and turn things around fast. Skill is trainable. Fast and disciplined are the two
              things.
            </Pull>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-6">
              {whatIDoOnHiring.map((s) => (
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

        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="glow-card p-8">
              <div className="flex items-center gap-3 mb-5">
                <UserPlus className="w-[18px] h-[18px] text-blue-400" />
                <p className="text-white text-sm font-semibold">How he comes in</p>
              </div>
              <Bullets items={contractShape} tone="blue" />
              <p className="text-zinc-400 text-sm leading-relaxed mt-5 pt-5 border-t border-zinc-800">
                You make the final decision. You manage performance. I stack the odds in your favour.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE 90 DAYS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The 90 days</Label>
            <H2>Then we install the Engine he runs.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              Once he is in the seat, the 90 days is spent building the thing he operates every week and training him
              to run it without you being dragged into the weeds.
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
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-6">Where this has run before</p>
            <div className="space-y-4">
              {proof.map((p) => (
                <div key={p.name} className="glow-card p-7">
                  <p className="text-white font-semibold text-base mb-2">{p.name}</p>
                  <p className="text-zinc-400 text-[15px] leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Where it starts</Label>
            <H2>Everything starts in the one Day.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              A day in your office. We start wide on brand, narrow into content, then get right down into the
              production line. You and me in the room for half the day. You me and Jack for the other half.
            </p>
            <Ticks items={dayCovers} />
            <div className="glow-card p-7 mt-10">
              <p className="text-white text-sm font-semibold mb-4">You walk out with</p>
              <Bullets items={dayDeliverables} tone="blue" />
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              It also gives me what I need to say honestly whether I can help you. I am not taking 20k off you and
              then working out whether it was the right call.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS NOT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>To avoid misalignment</Label>
            <H2>What this is not.</H2>
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
            <Label>How the money works</Label>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-zinc-400 text-[14px] mb-1">All in, if we run the whole thing</p>
              <p className="font-display text-4xl font-extrabold text-white mb-2">20,000 AUD</p>
              <p className="text-zinc-500 text-sm mb-7">Broken into three, and you only commit to the first one now.</p>
              <ul className="space-y-5">
                {money.map((it, i) => (
                  <li key={i} className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4 mb-1.5">
                      <span className="text-white font-semibold text-[15px]">{it.name}</span>
                      <span className="text-white font-semibold text-[15px] whitespace-nowrap">{it.amount}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{it.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glow-card p-7 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-[18px] h-[18px] text-blue-400" />
                <p className="text-white text-sm font-semibold">The decision gate</p>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                At the end of the Day we both decide. If either of us thinks it is not the right move, you have paid
                5,000 for a proper Day and a blueprint you can run yourself, and there is no further obligation.
              </p>
            </div>
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              Invite only, capped so I can stay close to your operator, your content and your data.
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
              <Ticks items={nextSteps} />
            </div>
            <p className="text-zinc-400 leading-relaxed">
              You said you are keen to kick off with the Day regardless, and I agree. We spend a day together, and
              then so long as we both want it, we go and find the person who is going to own this.
            </p>
            <div className="mt-10">
              <a
                href="https://authorityengine.com.au/lock-in?c=dTsxeHNWC5Vv0Q8DUYHF"
                className="btn-shine inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
              >
                Lock in the Day
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Morgan() {
  return (
    <PasswordGate storageKey="morgan-unlocked">
      <MorganPage />
    </PasswordGate>
  );
}
