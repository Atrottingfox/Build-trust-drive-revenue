import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Target, Map, Layers, Magnet, Video, Repeat, Compass, Zap, FileText, Megaphone, Settings, Shield, Users, Eye, Calendar, Workflow } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { trackCta, SRC_PARAM } from '../lib/track';

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

/*
  Every CTA on this page goes to /builder. `location` is the only thing that
  differs: it names which block on the page did the convincing, fires that as a
  GA4 event, and rides along on the URL so it lands on the application itself.
*/
const Cta = ({
  label = 'Apply now',
  location,
  note,
  className = '',
}: { label?: string; location: string; note?: string; className?: string }) => (
  <div className={className}>
    <a
      href={`/builder?${SRC_PARAM}=${location}`}
      onClick={() => trackCta(location)}
      className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
    {note && <p className="text-zinc-500 text-sm mt-4">{note}</p>}
  </div>
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

type Deliverable = { icon: React.ComponentType<{ className?: string }>; name: string; body: string };

const DeliverableGrid = ({ items }: { items: Deliverable[] }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((d, i) => (
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
);

const outputs = [
  { icon: Zap, title: 'Short Form', description: 'Discovery layer. Hooks, formats, and angles that open new audiences and pull the right people toward you.' },
  { icon: Video, title: 'Long Form', description: 'Trust depth. One 6 video trust cycle, with the exact lead magnet trust assets mapped to each video. The reason cold viewers turn into buyers.' },
  { icon: FileText, title: 'Lead Magnets', description: 'Trust bridge. Assets that take someone from interested to invested. One core evergreen plus video specific magnets.' },
];

const connectiveTissue = [
  { icon: Megaphone, title: 'Trojan Horse VSL', description: 'A value first video sales letter. Seeds the offer while delivering deep value. Does the selling without feeling like a sale.' },
  { icon: Settings, title: 'Documented Authority Engine', description: 'A system your team can run week to week. Captures the brand, the cycle, and the playbook in one place. Survives team changes.' },
];

const ladder = [
  {
    icon: Compass,
    stage: 'Brand',
    when: '1 Day · Brand Day',
    intro: '',
    items: [
      'Diagnose what is working and where your content leaks',
      'Map your brand, message, and Authority Engine across IG and YouTube',
      'Define what your Operator or Creative Director owns week to week',
      'Set 3 to 5 clear 90 day outcomes for content and pipeline',
      'Leave with a 30 day plan your team can run immediately',
    ],
  },
  {
    icon: Zap,
    stage: 'Content',
    when: '90 Days · Authority Engine Install',
    intro: 'Turn that blueprint into a working Engine: short form cadence, long form trust assets, and a simple scorecard that links content to revenue.',
    items: [
      'Short form cadence and Capture Block',
      'The 6 video trust cycle on rotation',
      'One training per week for you and your team',
      'Simple scorecard and weekly review',
      'Your operator is running the rhythm. You are spending under 2 hours a week on it',
    ],
  },
  {
    icon: Repeat,
    stage: 'Scale',
    when: '12 Months · Advisory, by invitation',
    intro: 'For a small handful of founders, ongoing advisory to weaponise your operator and scale the Engine over a full year.',
    items: [
      "Monthly founder and operator 'board' call",
      'Ongoing tuning of topics, packaging, and offers',
      'Deeper tracking so you can see content > pipeline clearly over time',
    ],
  },
];

const buildPhases = [
  {
    num: '01', tag: 'Phase 01 · Install · Weeks 1 to 4', title: 'Get the engine built and live.',
    paras: [
      'Short form, long form, lead magnets, the Trojan Horse VSL, and the documented Authority Engine get built and wired up. The first cycle runs live so we test it on real audience.',
    ],
    rhythm: [
      '1x 60 minute call per week with you and your key people.',
      '1x training per week for you and your team.',
    ],
    outcomes: [],
  },
  {
    num: '02', tag: 'Phase 02 · Tune · Weeks 5 to 12', title: 'Tune the engine based on data.',
    paras: [
      'Your team runs the cycle. I act as advisor. We tighten hooks, lead magnets, longform structure, and the VSL on real data. We test the strongest pieces with your warmest audience.',
      'End of 90 days you have one documented Authority Engine, one repeatable monthly demand cycle, and a clear view of what happens if we keep going.',
    ],
    rhythm: [
      '1x 60 minute call per fortnight with you and your key people.',
      '1x training per week for you and your team.',
      '1x Operator Clinic per fortnight for implementation questions.',
      'Up to 1 Loom per week for asset review.',
      '24 hour feedback via WhatsApp.',
    ],
    outcomes: [],
  },
];

const dayNinety = [
  'A documented Authority Engine your team runs. Brand Bible, journey map, 30 day Posting Program',
  'A short form system your operator runs off a weekly Capture Block',
  'The 6 video trust cycle filmed, including all trust assets',
  'A Media Operator trained to run the rhythm, with a playbook they run from',
  'Three straight weeks hitting agreed lead and pipeline targets',
];

const diagnostic = [
  { icon: Check, label: 'Strengths', sub: 'What is working', desc: 'The expertise, proof, and audience already worth building on. We map what is there so we amplify it, rather than start from scratch.' },
  { icon: Compass, label: 'Gaps', sub: 'Where it leaks', desc: 'The points between a stranger finding you and becoming a buyer where attention, trust, or clarity falls away.' },
  { icon: Zap, label: 'Opportunities', sub: 'What we build', desc: 'The core elements that turn the strengths and the gaps into one working engine over the next 90 days.' },
];

const strategyAssets = [
  { icon: Target, name: 'Bottleneck Scorecard', body: 'We score your business on the four things that move a stranger to a sale: Clarity, Visibility, Authority, Quality. You leave knowing your single biggest constraint, and why the other three sit downstream of it.' },
  { icon: Map, name: 'Customer Journey Map', body: 'The full path from unaware to advocate, mapped out. Where leads enter, what they see, where they fall out. Your funnel as one ecosystem.' },
  { icon: Magnet, name: 'Lead Magnet Suite', body: 'Your best IP turned into named, outcome led assets that qualify and convert. Named for the result they deliver, not what they are.' },
  { icon: Video, name: 'Trust Asset Bank', body: 'A bank of trust assets, mapped. The long form videos that carry your trust: the path, personal story and case studies each one needs, so a stranger watches once and thinks this is my person.' },
];

const operatingSystem = [
  { icon: Calendar, name: 'The 30 Day Plan', body: 'Four weeks, week by week, starting the Monday after. One job per person each week, output stepping up as the backlog clears, and a single measure at the foot of it.' },
  { icon: Users, name: 'Operator Scope', body: 'Exactly what your Operator or Creative Director owns week to week. Person, role, weekly count, and what they are accountable for. If a line has no name against it, it does not happen.' },
  { icon: Layers, name: 'The Weekly Schedule', body: 'Who shoots what and how many, then the week itself. Monday to Friday, with the content type and the person fronting each slot. Your production week on one screen.' },
  { icon: Workflow, name: 'The Production Pipeline', body: 'Every stage from idea to posted, each carrying one named owner and what has to be true before it moves. Closed with the two things that break the line.' },
  { icon: FileText, name: 'Your Private Plan Page', body: 'All of it lives on a private page your team navigates by tab and works from every week. You can send one person a link straight to their section.' },
];

export default function Offer() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="The Authority Engine"
        description="Turn content into clients in 90 days, without becoming a full time creator. We build a simple content system your team can run that reliably turns views into qualified leads and sales. Starts with a $5,000 AUD Brand Day."
        path="/offer"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The Authority Engine</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              Own your category.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-3">
              Engineer how content drives revenue, build a brand that commands attention from the right people, and install the buying beliefs your best clients need so your team can keep scaling without you becoming a full time creator.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              For 7-8 figure coaches, consultants, and B2B founders doing at least $200K/month.
            </p>
            <div className="mt-8 mb-8">
              <Crosses items={[
                'No dancing on camera.',
                'No 12am scrolling for content ideas.',
                'No more random, inconsistent posts.',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-5">
              We design a simple, trust led content system your team can run that reliably turns attention into qualified leads and sales without you or your team guessing what to post each week. It starts with a Brand Day, where we analyse your current bottlenecks, map how content actually drives revenue in your business, and build your Buying Belief Map: the specific beliefs your ICP must hold about their problem, your solution, and you before they buy. Then we turn that into a documented brand and Authority Engine.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-5">
              For the right founders it continues into a 90 day Authority Engine Install, where we turn that blueprint into a working demand system: embedding the cadence, testing cycles, and a scorecard that tracks how well your content is installing those beliefs and converting into pipeline, so the Engine keeps compounding without you ever becoming a full time creator.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I've spent the last 24 months behind the scenes with 7 & 8 figure consultants, coaches and B2B founders doing at least $200K a month, turning content into an engine that consistently drives revenue, with another client recently crossing $2M a month.
            </p>
            <Cta label="Apply for a Brand Day" location="offer-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE LADDER */}
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
                  <ul className="space-y-2">
                    {l.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-[7px] flex-shrink-0" />
                        <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <H2>Founders who are ready to scale what already works.</H2>
            <div className="mt-8">
              <Ticks items={[
                'Already doing at least $200K a month',
                'Already create content consistently',
                'Want content that feels like them and drives revenue',
                'Want an operator friendly system, not another done for you agency or course',
                'Willing to fulfil increased demand without dropping standards',
              ]} />
            </div>
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
              Every Brand Day starts with a diagnostic. What you already have, what is missing, and the core elements we build from it.
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

      {/* STEP 1 BRAND DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 1 &middot; Brand Day &middot; $5,000 AUD</Label>
            <H2>One focused day to refine your brand and remove the guesswork.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              With you and your key people, we:
            </p>
            <Ticks items={[
              'Diagnose the biggest constraint from turning strangers into buyers.',
              'Align your personality, positioning and perspective to key content buckets of demand',
              'Map your Authority Engine across Instagram, YouTube, podcast, and email',
              'Assess where your current media operation is leaking opportunity',
              'Define exactly what this Operator / Creative Director must own week to week in your business',
              'Clarify your 12 month vision for you and your media Operator',
              'Set 3 to 5 clear 90 day outcomes for content and pipeline',
            ]} />

            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              You and your team own filming, editing and posting. I architect, outline and course correct. You execute.
            </p>
          </Section>
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you walk away with</p>
            <H2>The strategy, and the system that runs it.</H2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mt-6 mb-12">
              Two halves. The thinking that sets the direction, and the operating detail your team runs from on Monday.
            </p>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">The strategy</p>
            <DeliverableGrid items={strategyAssets} />

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-14 mb-6">The operating system</p>
            <DeliverableGrid items={operatingSystem} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STEP 2 90 DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 2 &middot; 90 Day Authority Engine Install &middot; by invitation</Label>
            <H2>Install an Authority Engine.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-4">
              After the Brand Day, I invite a small number of founders into the 90 day Install.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Three core content output areas. Plus the connective tissue that turns them into a repeatable monthly demand cycle.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            {/* Three core outputs */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core outputs</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {outputs.map((item, i) => (
                <motion.div key={i} className="glow-card p-8" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Connective tissue */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {connectiveTissue.map((item, i) => (
                <motion.div key={i} className="glow-card p-8" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Three phases */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Two phases</p>
            <div className="space-y-8">
              {buildPhases.map((p, i) => (
                <div key={i} className="glow-card p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{p.num}</p>
                    <div>
                      <p className="text-zinc-600 text-xs uppercase tracking-widest">{p.tag}</p>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{p.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                    {p.paras.map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                  {p.rhythm.length > 0 && (
                    <div className="mb-6">
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Rhythm</p>
                      <ul className="space-y-2">
                        {p.rhythm.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.outcomes.length > 0 && (
                    <>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By end of Phase {p.num}</p>
                      <ul className="space-y-2">
                        {p.outcomes.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">By Day 90 you have</p>
              <Ticks items={dayNinety} />
            </div>

            <div className="glow-card border-blue-500/20 p-8 mt-10">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Short Form Sprint</p>
              <p className="text-white font-semibold text-base mb-5">Bonus, unlocked when you join.</p>
              <Ticks items={[
                'Capture block training and SOP',
                'Short form OS and operator checklist',
                '30 day scorecard so your team can start improving short form immediately',
              ]} />
            </div>

            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              Ongoing advisory after 90 days is invite only, for clients who actually implement.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* ROLES */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles.
              <br />
              <span className="text-zinc-500">Who owns what.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the Authority Engine. The core elements, the monthly cycle, and the cadence.',
                    'Advise on hooks, formats, lead magnets, and longform structure. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Your team's role</p>
                <ul className="space-y-3">
                  {[
                    'Implement. Film, edit, publish, build funnels, send emails.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS NOT */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">So we both stay sharp.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              For clarity on both sides. This is not:
            </p>
            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'A done for you content agency. Your team films, edits and posts. I design the Authority Engine, train your operator, and read the data with you.',
                  'Full time CMO or creative director services. I show up for the cadence we agree, not to manage your entire media team.',
                  'A guarantee of revenue. We agree the metrics, test, and the data tells us what worked.',
                  'A content factory. I do not write or edit every script. Your team produces.',
                  'A forever contract. At Day 90 we both choose whether to continue with advisory.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PRICE TERMS CAPACITY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Price, terms and capacity</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glow-card p-7">
                <p className="text-zinc-400 text-[14px] mb-1">Brand Day</p>
                <p className="font-display text-3xl font-extrabold text-white">$5,000 AUD</p>
                <p className="text-zinc-500 text-[14px] mt-2">Founding rate. Increasing as capacity fills.</p>
              </div>
              <div className="glow-card p-7">
                <p className="text-zinc-400 text-[14px] mb-1">90 Day Authority Engine Install (by invitation only)</p>
                <p className="font-display text-3xl font-extrabold text-white">$15,000 AUD</p>
                <p className="text-zinc-500 text-[14px] mt-2">Invitation only follow on after a Brand Day. Founding rate. Future cohorts will be $30,000 once the program is fully built out.</p>
              </div>
            </div>
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              I am taking a small group of founders through the full Authority Engine at this rate in exchange for wholehearted implementation, blunt feedback, and permission to share results as case studies.
            </p>
            <div className="glow-card border-blue-500/20 p-6 mt-6">
              <p className="text-white text-sm font-semibold mb-3">Capacity.</p>
              <ul className="space-y-3">
                {[
                  'We are limited to 10 strategy days per month.',
                  'I keep the number of active 90 day Installs low so I can stay close to your team and your data.',
                  'The 90 day Install and any ongoing advisory are by invitation only, offered to founders where I am confident we can hit the outcomes we set on your Brand Day.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* NEXT STEP */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <H2>The next step.</H2>
            <div className="text-left max-w-xl mx-auto mt-10 mb-12">
              <Ticks items={[
                'Apply for a Brand Day below',
                'If accepted, you will be invited to secure your Day with a $5,000 AUD payment and choose your date',
                'We get on a short prep call and then spend a full day together rebuilding your brand and Authority Engine',
              ]} />
            </div>
            <Cta label="Apply now" location="offer-next-step" />
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-10 max-w-lg mx-auto">
              One day to map and lock your brand strategy. Ninety days to install the content system that turns attention into revenue. For founders at $200K+/month who already create content and want to scale without becoming a full time creator.
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
