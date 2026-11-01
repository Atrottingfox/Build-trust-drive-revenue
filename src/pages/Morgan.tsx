import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Check, X, Target, Zap, FileText, Megaphone, ArrowRight,
  ClipboardCheck, UserPlus, Video, Crosshair,
} from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/* Morgan Nelson. Private, after the Brand Day (14 Sep 2026).
   Sells the 90 Day Install. Everything under "What the Day landed" and in the
   install cards is a decision from the room (Brand Day transcript + scribe
   notes), nothing new. Pricing is the structure Sean quoted live: install 15k,
   the Day's 5k rolls in, so 10k as two 5k instalments, hiring support 5k on top.
   Never name Jack leaving here, Jack can see this page. */

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

const landed = [
  {
    num: '1',
    icon: Target,
    title: 'The message',
    items: [
      'Four pillars. Behaviour, Identity, Entrepreneurship, Leadership',
      'Hypnosis, never advertised as NLP',
      'Not "the business guy"',
      'Dream Out Loud gets its own page so the ads can run to it',
    ],
  },
  {
    num: '2',
    icon: Video,
    title: 'The content',
    items: [
      'Wednesday is ideas day, film the next day, you do the last 20%',
      'Two hours recording your 20 to 30 stories',
      'YouTube built to one specific person, one outcome, the title and the CTA. Your bar is 10K views a video, consistently',
      'Podcast outsourced for the 90 days. The trailer only, no reels',
    ],
  },
  {
    num: '3',
    icon: Megaphone,
    title: 'The rhythm',
    items: [
      'Four event campaigns a year, two loud weeks each, comment apply',
      'A monthly night. Zero pitch, register to be coached, three really good clips out of it',
    ],
  },
  {
    num: '4',
    icon: UserPlus,
    title: 'The team',
    items: [
      'A channel manager on short form first',
      'Path is channel manager > head of short form > head of growth, on KPI gates',
      '90 day KPI review before the seat is locked',
    ],
  },
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
      'Budget on the Day was 80. I pushed 90, so they are actually invested',
    ],
    tail: '30 percent of YouTube revenue over baseline is the right instinct. That is what makes someone ramp the thing.',
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
      'The Wednesday ideas day and next day shoot, run without you in the weeds',
      'Your 20 to 30 stories captured and cut into the bank',
      'The four pillars, formats and hooks written down so they survive a staff change',
      'Operator weekly playbook',
      'Short form scorecard and cadence form',
    ],
  },
  {
    icon: Video,
    title: 'Long form and trust assets',
    items: [
      'One cycle of 6 to 8 pillar videos that carry the message, to the 10K bar',
      'A VSL tied directly to the three day and the Inner Circle',
      'The Dream Out Loud page the ads run to',
      'Lead magnets mapped to each video',
    ],
  },
  {
    icon: Megaphone,
    title: 'Cadence and feedback',
    items: [
      'Seven calls with me across the 90 days, plus three board calls',
      'The event campaigns and the monthly night built into the calendar',
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

const money = [
  { name: '90 Day Install', amount: '$10,000 AUD', note: 'Normally 15,000. The 5,000 from the Day rolls in, so it drops to 10. Paid as two 5,000 instalments, the second 30 days after you sign.' },
  { name: 'Hiring support', amount: '$5,000 AUD', note: 'Optional. JD, comp structure, and I take the final interview.' },
];

const nextSteps = [
  'Read the agreement and sign it.',
  'Pay the first 5,000. That opens your call calendar.',
  'Pick your weekly hour with me and the 90 days start.',
];

/* ---------------------------------------------------------------- */

function MorganPage() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Morgan Nelson, The 90 Day Install"
        description="Follow on from the Day. What we landed, the hire, the 90 days, and how the money works."
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
              The Day drew the map.
              <br />
              90 days to make it run.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Follow on from the Day. What we landed in the room, and what it looks like when we install it
              together.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THE DAY LANDED */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What the Day landed</Label>
            <H2>Decided in the room.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {landed.map((t, i) => (
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
                  <h3 className="text-white font-semibold mb-4">{t.title}</h3>
                  <Bullets items={t.items} />
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Pull>
              Once clarity is dialled you can crank visibility. People will land and immediately know 'he is for
              me'. Then the authority reads as expertise instead of notoriety. The audience then walk into events
              pre sold.
            </Pull>
            <p className="text-zinc-400 leading-relaxed mt-8">
              The Day did the clarity. Nothing on that list runs itself. The 90 days is what turns it into a
              machine that ships every week.
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
            <H2>One person to own it.</H2>
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
            <H2>Then we install the Engine they run.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              Everything the Day decided, built into the thing your channel manager operates every week, and them
              trained to run it without you being dragged into the weeds.
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
              <p className="text-zinc-400 text-[14px] mb-1">The 90 days, with the Day rolled in</p>
              <p className="font-display text-4xl font-extrabold text-white mb-2">10,000 AUD</p>
              <p className="text-zinc-500 text-sm mb-7">Hiring support sits on top if you want me in the hire.</p>
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
            <div className="mt-10">
              <a
                href="https://authorityengine.com.au/install?c=dTsxeHNWC5Vv0Q8DUYHF"
                className="btn-shine inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
              >
                Lock in the 90 days
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
