import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Compass, Zap, AlertCircle, X, Layers } from 'lucide-react';
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

type Block = {
  label: string;
  title: string;
  body?: string[];
  points?: string[];
};

function DayBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => (
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
              <p className="text-zinc-600 text-xs uppercase tracking-widest">{block.label}</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                {block.title}
              </h3>
            </div>
          </div>
          {block.body && (
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
              {block.body.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          )}
          {block.points && (
            <ul className="space-y-2">
              {block.points.map((item, j) => (
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
        description="One day. Pull the whole production pipeline apart, document it, and leave with a system your team can run without Nate."
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
                One day. Pull the whole operation apart, write it down, and leave with a pipeline your team can run without Nate.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · WHAT CHANGED */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · What changed</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              The plan changed.
              <br />
              <span className="text-zinc-500">So this changed with it.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Nate is out at the end of the month. There is no 90 day runway, and you are not replacing him with a creative director.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">The new shape</p>
                <ul className="space-y-3">
                  {[
                    'Nate leaves at the end of the month.',
                    'No creative director. A bench of contract videographers who slot in when you need them.',
                    'Hayley runs the system. Closer to a head of growth than a media lead. Marketing function, owning the pipeline.',
                    'Six weeks to test whether that model holds.',
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
                <p className="text-white font-semibold text-base mb-4">What that leaves open</p>
                <ul className="space-y-3">
                  {[
                    'The pipeline still lives in Nate’s head, and he walks in weeks.',
                    'A contractor can only hit a standard that is written down. There isn’t one yet.',
                    'Hayley owns the system without having run the production side of it before.',
                    'Nobody has named which responsibilities Nate carries that nobody else has picked up.',
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
                You are testing a brand new model on an undocumented pipeline, and the only person who holds that pipeline is leaving.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE STRATEGY DAY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Strategy Day</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              One day.
              <br />
              <span className="text-zinc-500">Pull it apart and bulletproof it.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-8">
              <p>
                We book one deep work day and take the operation apart, piece by piece. Every process from idea through to published outcome gets mapped, documented, and refined until it holds without Nate in it.
              </p>
              <p>
                Nate is in the room while we still have him. Hayley is in the room so the system has an owner who understands it.
              </p>
            </div>

            <div className="glow-card border-blue-500/20 p-8 md:p-10 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">The commitment</p>
              <p className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-white leading-none mb-4">$5,000</p>
              <p className="text-white text-base leading-relaxed font-medium">
                One day. That is the whole commitment right now. Everything after it is a decision you make later, with better information.
              </p>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How the day runs</p>

            <DayBlocks
              blocks={[
                {
                  label: 'Block 1 · Map the pipeline',
                  title: 'Idea to outcome, end to end.',
                  body: [
                    'We walk the full production pipeline on the wall. Where an idea enters, what happens to it at every stage, who touches it, and what it looks like when it ships.',
                  ],
                  points: [
                    'Every stage named. Ideas, briefs, filming, edit, review, publish, measure.',
                    'Who owns each stage today, and who owns it the day Nate is gone.',
                    'The tools, files, and access each stage depends on.',
                  ],
                },
                {
                  label: 'Block 2 · Find what breaks',
                  title: 'Bottlenecks and blind spots.',
                  body: [
                    'With the whole pipeline visible, the weak points stop being opinions.',
                  ],
                  points: [
                    'Where work queues up and waits.',
                    'Responsibilities Nate carries that nobody has picked up.',
                    'Gaps a contractor cannot cover, and that need a hire instead.',
                  ],
                },
                {
                  label: 'Block 3 · Document the standard',
                  title: 'Turn taste into checklists.',
                  body: [
                    'A videographer who slots in for two days can only hit a standard that is written down. We turn how Nate judges the work into checklists anyone can shoot and cut against.',
                  ],
                  points: [
                    'Explicit checklists per asset type. Short form, long form YouTube, podcast.',
                    'No vague language like flow or pop. Only what someone can observe and follow.',
                    'A brief format you can hand a contract videographer cold.',
                  ],
                },
                {
                  label: 'Block 4 · Bring Hayley up to speed',
                  title: 'The system gets an owner who understands it.',
                  body: [
                    'Hayley spends the day inside the pipeline rather than receiving a summary of it. She leaves knowing how production actually works, what to ask for, and what good looks like at each stage.',
                  ],
                  points: [
                    'How a shoot day gets planned, briefed, and run.',
                    'What to hand a videographer so they deliver to standard.',
                    'Where to look when output slips, and what to change first.',
                  ],
                },
                {
                  label: 'Block 5 · First, next, then',
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · WHAT YOU WALK OUT WITH */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · What you walk out with</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Documented.
              <br />
              <span className="text-zinc-500">Sequenced. Owned.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <Layers className="w-5 h-5 text-blue-400 mb-6" />
              <ul className="space-y-5">
                {[
                  'A documented production pipeline, idea to outcome, with a named owner on every stage.',
                  'Checklists per asset type that a contract videographer can shoot and cut against.',
                  'A named list of the gaps, and which of them need a hire rather than a contractor.',
                  'Hayley across the production process, not just the reporting on it.',
                  'A first, next, then sequence for the six weeks that follow.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
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
              You do not decide either of these on the day. The day stands on its own. If the pipeline holds after it, that may be everything you need from me.
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
                    If the call is that Hayley should lead structure rather than co ordinate it, we train her into that properly. Long form and short form, both.
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

      {/* 05 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">Just to be clear.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I architect, advise, and read the data with you.',
                  'This is not me stepping into Nate’s seat. I am not your interim media lead or fractional creative director.',
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
              Pull it apart. Write it down.
              <br />
              <span className="text-zinc-500">Hand it over.</span>
            </h2>
            <div className="space-y-3 text-zinc-400 mb-10 leading-relaxed">
              <p>One day with Nate still in the building. We map the pipeline end to end, find what breaks, and document the standard a contractor can hit.</p>
              <p>Hayley walks out knowing how production runs, not just what it produced.</p>
              <p>$5,000. Then you decide whether the six weeks needs me in it.</p>
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
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
