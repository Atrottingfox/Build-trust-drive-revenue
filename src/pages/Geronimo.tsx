import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Layers, Settings, Check, Compass, Zap, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

type Week = {
  label: string;
  title: string;
  body?: string[];
  points?: string[];
};

function PhaseWeeks({ weeks }: { weeks: Week[] }) {
  return (
    <div className="space-y-8">
      {weeks.map((week, i) => (
        <motion.div
          key={i}
          className="glow-card p-8 md:p-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{String(i + 1).padStart(2, '0')}</p>
            <div>
              <p className="text-zinc-600 text-xs uppercase tracking-widest">{week.label}</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                {week.title}
              </h3>
            </div>
          </div>
          {week.body && (
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
              {week.body.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          )}
          {week.points && (
            <ul className="space-y-2">
              {week.points.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function Geronimo() {
  return (
    <PasswordGate storageKey="geronimo-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="Geronimo. Strategy Day"
        description="One day to pull the operation apart, find the bottlenecks, document the pipeline, and build a production operation that is systematised, simple, scalable, and decentralised."
        path="/geronimo"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategy Day</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Geronimo.
              </h1>
              <div className="space-y-2">
                {[
                  'Pull the operation apart.',
                  'Find the bottlenecks.',
                  'Document the pipeline.',
                  'Build it right.',
                ].map((line, i) => (
                  <p key={i} className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · THE GOAL */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · The Goal</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Build the system.
              <br />
              <span className="text-zinc-500">Hand it to Hayley.</span>
            </h2>
            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4">
                {[
                  'A production pipeline that is documented, refined, and ready to hand over.',
                  'Output holds steady through the transition. No dip while the seat changes hands.',
                  'Any videographer on the bench can slot in and hit the standard without a briefing call.',
                  'Hayley runs it from day one, with no gap in between.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-base md:text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">First, next, then</p>
            <div className="max-w-3xl space-y-4 mb-12">
              {[
                'First. The Strategy Day. Pull the operation apart, find the bottlenecks, document the pipeline, build it right.',
                'Next. A four week test. An experiment to see what it is actually like running without a creative director.',
                'Then. We decide what the experiment tells us, measured against three things.',
              ].map((item, i) => (
                <p key={i} className="text-zinc-300 font-medium leading-relaxed">
                  <span className="text-zinc-500">Step {i + 1}.</span> {item}
                </p>
              ))}
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we read the four weeks</p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  metric: 'Ease',
                  description: 'How simple was it to run. Where did it feel heavy, and what took more effort than it should have.',
                },
                {
                  metric: 'Energy',
                  description: 'How the team felt doing it. Drag or momentum. A system nobody wants to run is not a system.',
                },
                {
                  metric: 'Output',
                  description: 'The data. Did we hit the KPIs, where were the bottlenecks, and what did we learn.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight mb-3">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.metric}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">Then you run it again</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Four weeks is the cycle. You calibrate against ease, energy, and output, change what the data tells you to change, and go again.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE OPPORTUNITY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Strategy. Structure.
              <br />
              <span className="text-zinc-500">Systems. Sprints.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              The model I'm working from is simple.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Compass,
                  title: 'Strategy',
                  description: "We want a media machine that reliably produces the right content to drive Geronimo's growth, while Doza still builds his founder brand, and no single person is the point of failure.",
                },
                {
                  icon: Layers,
                  title: 'Structure',
                  description: 'The non negotiables. Shoot cadence, days, formats, and the roles, who does what, so weeks look the same whichever videographer is on the floor.',
                },
                {
                  icon: Settings,
                  title: 'Systems',
                  description: 'Documentation, checklists, boards, and simple scorecards so the structure runs without heroics.',
                },
                {
                  icon: Zap,
                  title: 'Sprints',
                  description: "Short, focused periods where we attack a single bottleneck. Right now, documenting the pipeline and building it to hand over.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">On the day, we use this lens to</p>
            <ul className="space-y-4 max-w-3xl">
              {[
                "Document the pipeline and break the bottlenecks, so the work no longer depends on any one person.",
                'Set a predictable weekly rhythm across Geronimo and HeyDoza that survives a change of videographer.',
                'Make ownership clear on every stage, so Hayley can steer with confidence and nothing sits unowned.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE STRATEGY DAY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Strategy Day</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              One day.
              <br />
              <span className="text-zinc-500">Pull it apart and build it right.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>This is the slow down to speed up day. Everyone who touches the machine is in the room, so what we write down is what actually happens, not what is supposed to happen.</p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A production operation that is systematised, simple, scalable, and decentralised. Documented and refined to the point that a videographer who has never worked with you can slot in and hit the standard.
              </p>
            </div>

            <div className="glow-card border-blue-500/20 p-8 md:p-10 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">The commitment</p>
              <div className="flex items-baseline gap-2 mb-4">
                <p className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-white leading-none">$5,000</p>
                <p className="text-zinc-500 text-lg font-semibold tracking-tight">AUD</p>
              </div>
              <p className="text-white text-base leading-relaxed font-medium mb-8">
                One day. That is the whole commitment right now. Everything after it is a decision you make later, with better information.
              </p>
              <a
                href="https://buy.stripe.com/14A3co6uA0Vi5Swfdh0000h"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
              >
                Pay now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* The two sides */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">The two sides</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {[
                {
                  icon: Compass,
                  side: 'Ideation',
                  description: 'Where ideas come from, what business outcome each one is for, and how they get chosen. The thinking side.',
                },
                {
                  icon: Settings,
                  side: 'Production',
                  description: 'How a chosen idea becomes a published asset. Brief, shoot, edit, review, publish. The machine side.',
                },
              ].map((item, i) => (
                <div key={i} className="glow-card p-8">
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{item.side}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-white text-base leading-relaxed font-medium">
                Most operations break at the seam between the two. The day makes that seam seamless, so an idea moves into production without anyone having to carry it across by hand.
              </p>
            </div>

            {/* Roles callout */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">The roles, at a high level</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { role: 'Doza', tag: 'the who', description: 'Mission, story.' },
                { role: 'Hayley', tag: 'the why, and the how', description: 'The business outcome content must drive, and the person who runs the pipeline that drives it.' },
                { role: 'Videographers', tag: 'the bench', description: 'Contractors who slot in for a shoot. They need a brief and a standard, not a relationship.' },
                { role: 'Editors', tag: 'the doers', description: 'Make the assets.' },
              ].map((item, i) => (
                <div key={i} className="glow-card p-6">
                  <p className="text-white font-semibold text-base mb-1">{item.role}</p>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-3">{item.tag}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <PhaseWeeks
              weeks={[
                {
                  label: 'Teardown',
                  title: 'Pull the whole operation apart.',
                  body: [
                    'We take the operation apart, piece by piece, and get everything on the table. What is actually running, who is actually doing it, and what is quietly held together by one person remembering to do it.',
                  ],
                  points: [
                    'Map every process end to end. Ideas, filming, edit, review, publish, measure. Who touches it, what tools, where it breaks.',
                    'Inventory everything in flight and everything sitting in the pipeline.',
                    'Sort it into must ship in the next 30 days, nice to have, and can die.',
                    'Find the key man risks. If any one person stopped tomorrow, what breaks first.',
                  ],
                },
                {
                  label: 'Find the bottlenecks',
                  title: 'Where the pipeline actually jams.',
                  body: [
                    'With the full path from idea to outcome on the wall, the weak points stop being opinions.',
                  ],
                  points: [
                    'Where work queues up and waits.',
                    'Responsibilities nobody has picked up.',
                    'Stages that depend on one person being available.',
                    'Gaps a contract videographer cannot cover, and that need a hire instead.',
                  ],
                },
                {
                  label: 'Document the standards',
                  title: 'Turn taste into checklists.',
                  body: [
                    'For each core asset type, shorts, longform YT, podcasts and highlights, we take good vs bad examples and annotate exactly what makes them good or bad. Hook, framing, pacing, captions, CTA.',
                  ],
                  points: [
                    'Translate that into simple, explicit checklists for each edit type.',
                    'No vague language like flow or pop.',
                    'Only observable, step by step instructions anyone can follow.',
                    'A brief format you can hand a videographer cold, the day before a shoot.',
                  ],
                },
                {
                  label: 'Build it right',
                  title: 'Systematised, simple, scalable, decentralised.',
                  body: [
                    'The pipeline gets rebuilt against four tests, so it holds when people change.',
                  ],
                  points: [
                    'Systematised. Every stage has a documented way it gets done.',
                    'Simple. If it needs explaining twice, it gets cut down.',
                    'Scalable. More output does not mean more meetings.',
                    'Decentralised. No stage depends on one specific person being there.',
                  ],
                },
                {
                  label: 'Hayley up to speed',
                  title: 'The system gets an owner who understands it.',
                  body: [
                    'Hayley spends the day inside the pipeline rather than being handed a summary of it. She leaves knowing how production actually works, what to ask for, and what good looks like at each stage.',
                  ],
                  points: [
                    'How a shoot day gets planned, briefed, and run.',
                    'What to hand a videographer so they deliver to standard.',
                    'Where to look when output slips, and what to change first.',
                  ],
                },
                {
                  label: 'First, next, then',
                  title: 'Leave with a sequence.',
                  body: [
                    'The day closes with the plan ordered, so nobody has to work out what matters most on the Monday after.',
                  ],
                  points: [
                    'First. What has to be true before the handover.',
                    'Next. What the four week test needs in place to be a fair test.',
                    'Then. What we only decide once the test gives us something to read.',
                  ],
                },
              ]}
            />

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mt-10">
              <p className="text-blue-400 font-semibold text-sm mb-3">By the end of the day</p>
              <p className="text-white text-base leading-relaxed font-medium">
                The pipeline is documented in Notion and Looms, every stage has a named owner, and Hayley knows how production runs. The system is on paper, not in anyone's head.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 · AFTER THE DAY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · After the day</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Two routes.
              <br />
              <span className="text-zinc-500">Both optional.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Neither of these gets decided on the day. The day stands on its own. If the pipeline holds after it, that may be everything you need from me.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card p-8 md:p-10">
                <Compass className="w-5 h-5 text-blue-400 mb-5" />
                <p className="text-blue-400 text-xs uppercase tracking-widest mb-2">Route A</p>
                <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-5">
                  Four Week Calibration
                </h3>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    We run the new model as an experiment and watch what breaks. Four weeks, read against ease, energy, and output, so you get a real answer instead of a hunch.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Shoots run with the contract videographers on the bench.',
                    'Two shoot days with me on the floor. One long form YouTube, one short form, both at production spec.',
                    'Every break in the pipeline logged, then the SOPs refined against what actually broke.',
                    'You end with an answer. The bench model holds, or you need a creative director after all.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glow-card p-8 md:p-10">
                <Zap className="w-5 h-5 text-blue-400 mb-5" />
                <p className="text-blue-400 text-xs uppercase tracking-widest mb-2">Route B</p>
                <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-5">
                  90 Day Install
                </h3>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    If the call is that Hayley should lead structure rather than just run the schedule, we train her into it properly. Long form and short form, both.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'The consumer behaviour and psychology underneath why structure works.',
                    'How long form and short form get built, and why they get built differently.',
                    'The full production process, owned end to end.',
                    'Advisory on the back of it, once the install is done.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />


      {/* 05 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Support.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="glow-card p-8 max-w-3xl mb-12">
              <Users className="w-5 h-5 text-blue-400 mb-4" />
              <p className="text-blue-400 font-semibold text-sm mb-4">Async support</p>
              <ul className="space-y-3">
                {[
                  'Included on either route. Up to 1 to 2 Loom reviews per week. Edits, systems, docs.',
                  'Async access via WhatsApp or Slack for quick questions between calls.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">The day</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Extraction & documentation</p>
                <ul className="space-y-2">
                  {[
                    'One deep work day on site with the team.',
                    'Docs and checklists delivered in the week after.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Route A · Four weeks</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Calibration</p>
                <ul className="space-y-2">
                  {[
                    '1x call per week with Hayley. What broke, what gets refined.',
                    '2x shoot days with me on the floor across the four weeks.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Route B · 90 days</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Install & advisory</p>
                <ul className="space-y-2">
                  {[
                    '1x call per fortnight. Training Hayley into structure.',
                    '1x group Operator Clinic per fortnight. Editors and Doza welcome for Q&A.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">Just to be clear.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I architect, advise, and read the data with you.',
                  'This is not me stepping into a seat on your team. I am not your interim media lead or fractional CD, and I am not running your media indefinitely.',
                  'This is not a 90 day commitment. One day, then you decide what the four weeks needs.',
                  'This is not a retainer with a day bolted on the front. If the day gives you everything, we stop there.',
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

      {/* CTA · BOTTOM LINE */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">Bottom line</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-8 leading-[1.15]">
              Capture the system. Hand it over.
              <br />
              <span className="text-zinc-500">Then test it.</span>
            </h2>
            <div className="space-y-3 text-zinc-400 mb-10 leading-relaxed">
              <p>One day. We pull the operation apart, find the bottlenecks, document the pipeline, and build it to something a videographer can slot into.</p>
              <p>Hayley walks out knowing how production runs, not just what it produced.</p>
              <p>$5,000 AUD. Then you run the four weeks and decide whether it needs me in it.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
              >
                Book the Strategy Day
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://buy.stripe.com/14A3co6uA0Vi5Swfdh0000h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#111113] border border-white/[0.10] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:border-white/[0.24] hover:bg-[#161618] transition-colors"
              >
                Pay now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8">
              <a
                href="/geronimonextsteps"
                className="group inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors text-[14px] font-medium"
              >
                See the clear next steps
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
