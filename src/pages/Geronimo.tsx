import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Layers, Settings, Check, Compass, Zap, Shield, AlertCircle, X } from 'lucide-react';
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
        description="Get the system out of Nate's head before he walks. One day to pull the operation apart, document it, and hand Hayley a pipeline she can run with a bench of videographers."
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
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                Pull the operation apart. Document it. Hand Hayley a pipeline she can run.
              </p>
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
              Get the system out of Nate's head.
              <br />
              <span className="text-zinc-500">Put it in Hayley's hands.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
              The plan changed again. Nate is out at the end of the month, not in 90 days. And you are not replacing him with a creative director. So the point of this project changed with it.
            </p>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4">
                {[
                  "Get everything Nate runs out of his head and documented, so nothing walks out the door with him.",
                  'Keep output steady through the transition. No dip while the seat changes hands.',
                  "Hand the system to Hayley, and make it something a contract videographer can slot into without a briefing call.",
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
                'First. One Strategy Day while Nate is still here. Pull the operation apart, document it, and bulletproof it.',
                'Next. You run your six week test with the bench and see what holds.',
                'Then. You decide what the test told you, with data instead of a guess.',
              ].map((item, i) => (
                <p key={i} className="text-zinc-300 font-medium leading-relaxed">
                  <span className="text-zinc-500">Step {i + 1}.</span> {item}
                </p>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">My role</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Architect the OS and lead the extraction from Nate. Your team runs it. I don't.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE CHALLENGE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Challenge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              The engine works.
              <br />
              <span className="text-zinc-500">It just lives in one person's head.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">What's working</p>
                <ul className="space-y-3">
                  {[
                    'A strong product, a big mission, and a growing audience.',
                    'Geronimo is already bringing in the most leads.',
                    'The new shape is lighter. Hayley on growth, a bench of videographers who slot in, no creative director salary.',
                    'Six weeks is enough of a test to get a real read on whether it holds.',
                    'Doza still needs to show up as a founder with a bigger story than the Instagram content guy.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <AlertCircle className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">But</p>
                <ul className="space-y-3">
                  {[
                    'Nate is out at the end of the month, and most of how the media runs lives in his head.',
                    'Editors are under utilised. They are paid, but not truly empowered to own the 80%.',
                    'Hayley picks up the system without having run the production side of it before.',
                    'A videographer on the bench can only hit a standard that is written down. There is no written standard yet.',
                    'HeyDoza and Geronimo are intertwined, without a clean, simple structure.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">The risk</p>
              <p className="text-white text-base leading-relaxed font-medium">
                The whole media engine lives in Nate's head. He walks at the end of the month, and you are testing a brand new model on top of an undocumented pipeline.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE OPPORTUNITY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Opportunity</p>
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
                  description: "Short, focused periods where we attack a single bottleneck. Right now, extracting Nate's system before he leaves.",
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
                "Extract Nate's system and break the editing bottleneck so the work no longer depends on him.",
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

      {/* 04 · THE STRATEGY DAY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · The Strategy Day</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              One day.
              <br />
              <span className="text-zinc-500">Get it out of Nate's head.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>This is the slow down to speed up day. Nate is in the room while we still have him. Hayley is in the room so the system has an owner who understands it.</p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Get everything Nate runs out of his head and documented, refined to the point that a videographer who has never worked with you can slot in and hit the standard.
              </p>
            </div>

            <div className="glow-card border-blue-500/20 p-8 md:p-10 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">The commitment</p>
              <p className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-white leading-none mb-4">$5,000</p>
              <p className="text-white text-base leading-relaxed font-medium">
                One day. That is the whole commitment right now. Everything after it is a decision you make later, with better information.
              </p>
            </div>

            {/* Roles callout */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">The roles, at a high level</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { role: 'Doza', tag: 'the who', description: 'Mission, story.' },
                { role: 'Hayley', tag: 'the why, and the how', description: 'The business outcome content must drive, and the person who now runs the pipeline that drives it.' },
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
                    'We pull the operation apart, piece by piece. This is where I work directly with Nate to get everything on the table while he is still here to put it there.',
                  ],
                  points: [
                    'Map every process end to end. Ideas, filming, edit, review, publish, measure. Who touches it, what tools, where it breaks.',
                    'Inventory everything Nate is running right now and everything sitting in his pipeline.',
                    'Sort it into must ship in the next 30 days, nice to have, and can die.',
                    'Find the key man risks. When Nate walks, what breaks first.',
                  ],
                },
                {
                  label: 'Idea to outcome',
                  title: 'The production pipeline, on the wall.',
                  body: [
                    'The full path an idea takes to become a published outcome, drawn out so everyone is looking at the same thing.',
                  ],
                  points: [
                    'Every stage named, with who owns it today and who owns it once Nate is gone.',
                    'Where work queues up and waits.',
                    'Responsibilities Nate carries that nobody has picked up.',
                    'Gaps a contract videographer cannot cover, and that need a hire instead.',
                  ],
                },
                {
                  label: 'Document the standards',
                  title: 'Turn taste into checklists.',
                  body: [
                    'For each core asset type, shorts, longform YT, podcasts and highlights, Nate chooses good vs bad examples and annotates exactly what makes them good or bad. Hook, framing, pacing, captions, CTA.',
                  ],
                  points: [
                    'Translate that into simple, explicit checklists for each edit type.',
                    'No vague language like flow or pop.',
                    'Only observable, step by step instructions anyone can follow.',
                    'A brief format you can hand a videographer cold, the day before a shoot.',
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
                    'First. What has to be true before Nate walks.',
                    'Next. What the six week test needs in place to be a fair test.',
                    'Then. What we only decide once the test gives us something to read.',
                  ],
                },
              ]}
            />

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mt-10">
              <p className="text-blue-400 font-semibold text-sm mb-3">By the end of the day</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Nate's system is documented in Notion and Looms, the pipeline has a named owner on every stage, and Hayley knows how production runs. His brain is on paper, not just in his head.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 · AFTER THE DAY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · After the day</p>
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
                    We run the new model as an experiment and watch what breaks. Four weeks sitting inside your six week test, so you get the read before you have to commit to the model.
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


      {/* 06 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              My role.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Architect the Media OS and run the Strategy Day.',
                    "Lead the extraction from Nate and turn his system into documentation anyone can run.",
                    'Name the gaps, and say plainly which ones a contractor covers and which ones need a hire.',
                    'Hold the frame so the system actually gets written down while Nate is still here.',
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
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">The day</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Extraction & documentation</p>
                <ul className="space-y-2">
                  {[
                    'One deep work day on site with Nate and Hayley.',
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

      {/* 07 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">Just to be clear.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I architect, advise, and read the data with you.',
                  'This is not me stepping into Nate’s seat. I am not your interim Media Lead or fractional CD, and I am not running your media indefinitely.',
                  'This is not a 90 day commitment. One day, then you decide what the six weeks needs.',
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
              <p>One day while Nate is still in the building. We pull the operation apart, document his system, and refine it to something a videographer can slot into.</p>
              <p>Hayley walks out knowing how production runs, not just what it produced.</p>
              <p>$5,000. Then you run your six weeks and decide whether it needs me in it.</p>
            </div>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the Strategy Day
              <ArrowRight className="w-4 h-4" />
            </a>

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
