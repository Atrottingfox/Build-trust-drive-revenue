import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, Check, X, Target, Map, Layers, Magnet, Video, Repeat, Compass, Zap,
  FileText, Megaphone, Settings, Shield, Users, AlertTriangle,
} from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';

/* The next step is the Intensive's own application, not a booking link. It posts
   with source 'operator-intensive' so it fires a separate Slack alert and carries
   its own GHL tag rather than landing in the Brand Builder Day queue. */
const APPLY_URL = '/applyforoperatorintensive';

/* Founding cohort counter. Sean runs FOUNDING_TOTAL of these at 30k before the
   price moves to 40k. Bump FOUNDING_CURRENT as each one sells; it is the only
   place the number lives, so every mention stays in step. */
const FOUNDING_CURRENT = 4;
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

const Bullets = ({ items, tone = 'blue' }: { items: string[]; tone?: 'zinc' | 'blue' }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${tone === 'blue' ? 'bg-blue-400' : 'bg-zinc-600'}`} />
        <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
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
      Apply now
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
};

/* ---------------------------------------------------------------- */

const ladder = [
  {
    icon: Compass,
    stage: 'Brand',
    when: '1 Day · Authority Engine Build Day',
    intro: '',
    items: [
      'Diagnose what is working and where your content leaks',
      'Map your brand, message, and Authority Engine across IG / YT / podcast',
      'Leave with a 30 day content plan your team can run immediately',
    ],
  },
  {
    icon: Zap,
    stage: 'Content',
    when: '90 Days · Authority Engine Install (with a weaponised operator)',
    intro: 'Turn that blueprint into a working Engine: short form cadence, long form trust assets, and a simple scorecard that links content to revenue, run by your operator, not you.',
    items: [
      'Short form cadence and Capture Block',
      '1 to 2 long form trust assets (YouTube / podcast)',
      'Simple scorecard and weekly review',
      'Your operator is running the rhythm. You are spending under 2 hours a week on it',
    ],
  },
  {
    icon: Repeat,
    stage: 'Scale',
    when: '12 Months · Advisory, by invitation',
    intro: 'For a small handful of founders, ongoing advisory to weaponise your operator fully and scale the Engine over a full year.',
    items: [
      'Monthly founder and operator "board" call',
      'Ongoing tuning of topics, packaging, and offers',
      'Deeper tracking so you can see content > pipeline clearly over time',
    ],
  },
];

const whoFor = [
  'Already doing at least $200K a month',
  'Already create content consistently',
  'Want content that feels like them and drives revenue',
  'Want an operator friendly system, not another done for you agency or course',
  'Willing to fulfil increased demand without dropping standards',
  'Do not currently have the right media operator / creative lead in the seat',
];

const diagnostic = [
  {
    icon: Check,
    label: 'Strengths',
    sub: 'What is working',
    desc: 'The expertise, proof, and audience already worth building on. We map what is there so we amplify it, rather than start from scratch.',
  },
  {
    icon: Compass,
    label: 'Gaps',
    sub: 'Where it leaks',
    desc: 'The points between a stranger finding you and becoming a buyer where attention, trust, or clarity falls away, including where no operator is currently owning the process.',
  },
  {
    icon: Zap,
    label: 'Opportunities',
    sub: 'What we build',
    desc: 'The core elements that turn the strengths and the gaps into one working engine over the next 90 days, and a clear brief for the operator who will run it.',
  },
];

const brandDayItems = [
  'Rebuild your on camera identity and positioning',
  'Map your Authority Engine across Instagram, YouTube and podcast, and how each feeds pipeline',
  'Build your Brand Bible and Posting OS: pillars, formats, CTAs, and a simple path to driving sales',
  'Define what a weaponised media operator must own week to week in your business',
];

const deliverables = [
  { icon: Target, name: 'Bottleneck Scorecard', body: 'We score your business on the four things that move a stranger to a sale: Clarity, Visibility, Authority, Quality. You leave knowing your single biggest constraint, and what your operator must attack first.' },
  { icon: Map, name: 'Customer Journey Map', body: 'The full path from unaware to advocate, mapped out. Where leads enter, what they see, where they fall out. Your funnel as one ecosystem.' },
  { icon: Layers, name: 'Content Awareness Ladder', body: 'Your content sorted by how warm the viewer is. What to post to pull cold strangers in, and what to post to close the ones already ready.' },
  { icon: Magnet, name: 'Lead Magnet Suite', body: 'Your best IP turned into named, outcome led assets that qualify and convert. Named for the result they deliver, not what they are.' },
  { icon: Video, name: 'Core Trust Asset', body: 'Your core trust asset, mapped. The long form video that carries your trust: the path, personal story and case studies it needs, so a stranger watches once and thinks "this is my person".' },
  { icon: Repeat, name: 'One Demand Cycle', body: 'One repeatable content cycle your future operator runs without you. A rhythm that compounds demand, not a scramble every week.' },
];

const outputs = [
  { icon: Zap, title: 'Short Form', description: 'Discovery layer. Hooks, formats, and angles that open new audiences and pull the right people toward you, owned by your operator.' },
  { icon: Video, title: 'Long Form', description: 'Trust depth. The pieces that get watched, shared, and remembered. The reason cold viewers turn into buyers, planned and executed with your operator.' },
  { icon: FileText, title: 'Lead Magnets', description: 'Trust bridge. Assets that take someone from interested to invested. One core evergreen plus video specific magnets.' },
];

const connectiveTissue = [
  { icon: Megaphone, title: 'Trojan Horse VSL', description: 'A value first video sales letter. Seeds the offer while delivering deep value. Does the selling without feeling like a sale.' },
  { icon: Settings, title: 'Documented Authority Engine', description: 'A system your operator can run week to week. Captures the brand, the cycle, and the playbook in one place. Survives team changes.' },
];

const buildPhases = [
  {
    num: '01',
    tag: 'Phase 01 · Build · 4 to 6 hours',
    title: 'Extract the genius. Document the brand. Define the operator.',
    paras: [
      'Brand Day intensive. One in person session with you and whoever currently owns your content. Four to six hours. Two hours with you. The rest with your content lead.',
      'We extract the genius. The founder beliefs, contrarian takes, the stories. Everything gets built and documented live. The entire Engine and the operator brief run from this.',
      'This is where we build your customer journey, craft your plan, map your core pillar videos, and define what a weaponised operator looks like in your business.',
    ],
    outcomesLabel: 'By end of Phase 1',
    outcomes: [
      'A documented brand. Personality, positioning, perspective, messaging and voice.',
      'A Customer Journey Map. Cold to warm to buyer to advocate.',
      'The shape of the monthly demand cycle, mapped to your calendar.',
      'Agreed success metrics for the 90 days.',
      'A clear Creative Director / media operator role and 90 day scorecard.',
    ],
  },
  {
    num: '02',
    tag: 'Phase 02 · Install the operator and Engine · Weeks 1 to 4 (hiring sprint overlaps)',
    title: 'Get the Engine and the operator in place.',
    paras: ['During these weeks we:'],
    outcomesLabel: '',
    outcomes: [
      'Finalise the operator role, JD, and test project',
      'Help you run a hiring sprint (or refine your current candidate pool)',
      'Short form, long form, lead magnets, the Trojan Horse VSL, and the documented Authority Engine get built and wired up',
      'You and I interview and sell the right operator into the role',
    ],
    tail: 'The first demand cycle runs live so we test it on real audience, with the person who will own it.',
  },
  {
    num: '03',
    tag: 'Phase 03 · Weaponise · Weeks 5 to 12',
    title: 'Weaponise your operator based on data.',
    paras: [
      'Your operator runs the cycle. I act as advisor. We tighten hooks, lead magnets, longform structure, and the VSL on real data. We test the strongest pieces with your warmest audience and coach your operator off real assets, not theory.',
    ],
    outcomesLabel: 'End of 90 days you have',
    outcomes: [
      'One documented Authority Engine',
      'One repeatable monthly demand cycle',
      'A weaponised media operator running it',
      'A clear view of what happens if we keep going',
    ],
  },
];

const byDay90 = [
  'One fully documented Authority Engine for your business. Brand, content, and customer journey mapped',
  'A personalised short form system your operator runs every week. Capture block, operating system and content scorecard',
  '1 to 2 long form trust assets and a YouTube plan that actually gets watched by buyers',
  'A media operator who is weaponised enough to own the rhythm without you',
  'Three straight weeks hitting agreed lead and pipeline targets',
];

const sprintBonus = [
  'Capture block training and SOP',
  'Short form OS and operator checklist',
  '30 day scorecard so your operator can start improving short form immediately',
];

const myRole = [
  'Design the Authority Engine: the core elements, the monthly cycle, and the cadence.',
  'Advise on hooks, formats, lead magnets, and longform structure. Not write or edit everything.',
  'Design the media operator role, help you hire them, and weaponise them over 90 days.',
  'Read the data with you. Suggest next best moves.',
];

const yourRole = [
  'Implement. Film, edit, publish, build funnels, send emails.',
  'Your operator fills a simple weekly scorecard.',
  'Give me honest feedback from the numbers.',
];

const cadence = [
  {
    phase: 'Phase 01 · Build',
    when: '4 to 6 hours',
    text: 'Brand Day intensive. One in person session with you and whoever owns your content.',
    items: [],
  },
  {
    phase: 'Phase 02 · Install',
    when: 'Weeks 1 to 4',
    text: '',
    items: [
      '1x 60 minute call per week with you and your key people.',
      'Founder welcome.',
      'The Engine gets built and wired up.',
      'Operator hiring sprint runs in parallel.',
    ],
  },
  {
    phase: 'Phase 03 · Tune / Weaponise',
    when: 'Weeks 5 to 12',
    text: '',
    items: [
      '1x 60 minute call per fortnight with you and your key people.',
      '1x Operator Clinic per fortnight for implementation questions.',
      'Up to 1 Loom per week for asset review.',
      '24 hour feedback via WhatsApp.',
    ],
  },
];

const isNot = [
  'A done for you content agency. Your team films, edits and posts. I design the Authority Engine, help you hire and weaponise your operator, and read the data with you.',
  'Full time CMO or creative director services. I show up for the cadence we agree, not to manage your entire media team.',
  'A guarantee of revenue. We agree the metrics, test, and the data tells us what worked.',
  'A recruiting agency. I do not promise "the perfect person by X date". I promise a world class process, my pattern recognition from multiple operators, and my help selling the right person on this seat.',
  'A forever contract. At Day 90 we both choose whether to continue with advisory.',
];

const allInFor = [
  'Brand Day (5,000 AUD value)',
  'Operator Blueprint + Hiring Sprint',
  '90 Day Authority Engine Install',
];

const money = [
  '5,000 AUD to secure your Brand Builder Day',
  'If, at the end of the Day, we both agree to move into the full Intensive, the remaining 25,000 AUD is due on a simple schedule we set (typically split between the start of the Hiring Sprint and your operator\'s start date)',
];

const capacity = [
  'We are limited to 10 strategy days per month.',
  'I keep the number of active 90 day Installs low so I can stay close to your team and your data.',
  'The Operator Intensive is invite only, offered to founders where I am confident we can hit the outcomes we set on your Build Day.',
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
              The Authority Engine &middot; Operator Intensive
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              Own your category.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-3">
              Bring in a media operator, weaponise them, and install the Engine that lets your team keep scaling
              without you becoming a full time creator.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              For 7 to 8 figure coaches, consultants, and B2B founders doing at least $200K/month who do not yet have
              the right media operator in the seat.
            </p>
            <div className="mt-8 mb-8">
              <Crosses items={[
                'No dancing on camera',
                'No 12am scrolling for content ideas',
                'No more random, inconsistent posts',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-5">
              We design a simple content system your operator can run that reliably turns attention into qualified
              leads and sales.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-5">
              It starts with an Authority Engine Build Day, where we analyse your current bottlenecks, map how content
              actually drives revenue in your business, and turn it into a documented brand and Authority Engine.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-5">
              For founders who do not have the right media operator, it continues into an Operator + Authority Engine
              Intensive: a focused project where we help you hire the right operator and spend 90 days weaponising
              them to run your Engine.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              I have spent the last 24 months behind the scenes with 7 to 8 figure coaches and B2B founders doing at
              least $200K a month, working directly with multiple operators and media teams, with one client recently
              crossing $2M a month.
            </p>
            <ApplyButton />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE PROGRESSION */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The progression</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              How the Authority Engine
              <br />
              <span className="text-zinc-500">works over time.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Brand, then Content, then Scale. Each stage earns the next.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {ladder.map((l, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <l.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-base">{l.stage}</h3>
                  <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mb-4">{l.when}</p>
                  {l.intro && <p className="text-zinc-400 text-sm leading-relaxed mb-4">{l.intro}</p>}
                  <Bullets items={l.items} />
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO IT IS FOR */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who this is for</Label>
            <H2>Founders ready to scale what already works.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              And who want a weaponised media operator instead of being the operator themselves.
            </p>
            <Ticks items={whoFor} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE DIAGNOSTIC */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Strengths. Gaps.
              <br />
              <span className="text-zinc-500">Opportunities.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Every Build Day starts with a diagnostic. What you already have, what is missing, and the core elements
              we build from it, including what your future operator must own.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {diagnostic.map((d, i) => (
                <div key={i} className="glow-card p-8">
                  <d.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <p className="text-white font-semibold text-base">{d.label}</p>
                  <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mb-4">{d.sub}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STEP 1 */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 1 &middot; Brand Day &middot; $5,000</Label>
            <H2>One focused day to refine your brand, define the operator role, and remove the guesswork.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">With you and your key people, we:</p>
            <Ticks items={brandDayItems} />
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              You and your team own filming, editing and posting. I architect, outline and course correct. Your future
              operator executes.
            </p>
          </Section>
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">What you walk away with</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <d.icon className="w-[18px] h-[18px] text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{d.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STEP 2 */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 2 &middot; Operator + 90 Day Authority Engine Intensive &middot; by invitation</Label>
            <H2>Install an Authority Engine with a weaponised media operator in the seat.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-4">
              After the Brand Day, for founders who need the right operator, I invite a small number into the Operator
              + Authority Engine Intensive.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">This combines:</p>
            <Ticks items={[
              'A hiring sprint to bring in the right operator',
              'With the same 90 day Install you have seen, focused on turning that operator into a weapon',
            ]} />
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core output areas</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {outputs.map((o, i) => (
                <div key={i} className="glow-card p-8">
                  <o.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{o.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6">
              {connectiveTissue.map((c, i) => (
                <div key={i} className="glow-card p-8">
                  <c.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{c.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* THREE PHASES */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-20">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">Three phases</p>
          </Section>
          {buildPhases.map((p) => (
            <Section key={p.num} className="mb-16">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display text-5xl font-extrabold text-zinc-800">{p.num}</span>
                <p className="text-blue-400 font-semibold text-sm">{p.tag}</p>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">{p.title}</h3>
              {p.paras.map((para, i) => (
                <p key={i} className="text-zinc-400 leading-relaxed mb-4">{para}</p>
              ))}
              {p.outcomes.length > 0 && (
                <div className="glow-card p-7 mt-6">
                  {p.outcomesLabel && (
                    <p className="text-white text-sm font-semibold mb-4">{p.outcomesLabel}</p>
                  )}
                  <Bullets items={p.outcomes} />
                </div>
              )}
              {p.tail && <p className="text-zinc-400 leading-relaxed mt-6">{p.tail}</p>}
            </Section>
          ))}
        </div>

        {/* BY DAY 90 */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-8">
          <Section>
            <H2>By Day 90 you have.</H2>
            <div className="mt-8">
              <Ticks items={byDay90} />
            </div>
          </Section>
        </div>

        {/* SPRINT BONUS */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Short Form Sprint</p>
              <p className="text-zinc-500 text-sm mb-6">Bonus, unlocked when you join.</p>
              <Bullets items={sprintBonus} />
            </div>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-6">
              Ongoing advisory after 90 days is invite only, for clients who actually implement.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* ROLES AND CADENCE */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <Bullets items={myRole} tone="zinc" />
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Your team's role</p>
                <Bullets items={yourRole} tone="zinc" />
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6">
              {cadence.map((c, i) => (
                <div key={i} className="glow-card p-8">
                  <p className="text-blue-400 font-semibold text-sm mb-1">{c.phase}</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">{c.when}</p>
                  {c.text && <p className="text-zinc-300 text-sm leading-relaxed">{c.text}</p>}
                  {c.items.length > 0 && <Bullets items={c.items} />}
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
            <Label>What this is not</Label>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">So we both stay sharp.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">For clarity on both sides. This is not:</p>
            <Crosses items={isNot} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PRICE TERMS CAPACITY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Price, terms and capacity</Label>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-zinc-400 text-[14px] mb-1">Operator + Authority Engine Intensive</p>
              <p className="font-display text-4xl font-extrabold text-white mb-3">30,000 AUD</p>
              <p className="text-zinc-500 text-[14px] mb-6">
                Founding rate. Increasing towards 40,000 AUD as capacity fills. This is number {FOUNDING_CURRENT} of{' '}
                {FOUNDING_TOTAL} at this rate.
              </p>
              <p className="text-white text-sm font-semibold mb-4">All in for:</p>
              <Bullets items={allInFor} />
            </div>

            <div className="glow-card p-7 mt-4">
              <p className="text-white text-sm font-semibold mb-4">How it works financially</p>
              <Bullets items={money} />
              <p className="text-zinc-400 text-sm leading-relaxed mt-5 pt-5 border-t border-zinc-800">
                If either of us decides it is not the right move after the Day, you have paid 5k for a proper Brand
                Builder Day and blueprint, and we part ways with no further obligation.
              </p>
            </div>

            <div className="glow-card p-7 mt-4">
              <p className="text-white text-sm font-semibold mb-4">Capacity</p>
              <Bullets items={capacity} />
            </div>

            <div className="glow-card border-amber-400/20 p-6 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Still to lock: who carries the operator's salary once they are hired, and from when. This block is
                  the only thing on the page that is not decided.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* NEXT STEP */}
      <section className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <H2>The next step.</H2>
            <p className="text-zinc-400 leading-relaxed mt-8">Apply for the Operator Intensive below.</p>
            <div className="text-left max-w-xl mx-auto mt-10 mb-12">
              <Ticks items={[
                'If accepted, you will be invited to secure your Day with a 5,000 AUD payment and choose your date',
                'We get on a short prep call and then spend a full day together rebuilding your brand and Authority Engine',
                'From there, we move straight into finding and weaponising the media operator who will own your Engine',
              ]} />
            </div>
            <ApplyButton size="lg" />
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-12 max-w-lg mx-auto">
              One day to map and lock your brand strategy. Ninety days to install the content system that turns
              attention into revenue, with a weaponised media operator running it.
            </p>
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
