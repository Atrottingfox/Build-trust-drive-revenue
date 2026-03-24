import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Wrench, Settings, Gauge, RotateCcw } from 'lucide-react';
import Footer from '../components/Footer';

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

const phases = [
  {
    num: '01',
    label: 'Days 1–30',
    name: 'The Build',
    icon: Wrench,
    headline: 'Brand. Positioning. Narrative.',
    description: 'Everything that makes your content yours gets extracted, documented, and installed into Content.OS. Brand Bible. Belief Map. Origin Story. Content angles matched to your archetype. A 30 day rhythm using the 5 A\'s framework.',
    what: [
      'Brand Day (half day, in person). Sean flies to you.',
      'Brand Bible built live. Voice, positioning, narrative, messaging.',
      'Authority Archetype Profile. How you naturally build trust.',
      'Belief Map. What your audience believes vs what they need to.',
      'Origin Story extracted using 1 of 7 narrative templates.',
      '30 day content plan. Weekly rhythm. Formats matched to you.',
      'Lead magnet built in the room from your IP.',
    ],
    outcome: 'You walk out with a documented brand system and a content plan you can execute immediately.',
  },
  {
    num: '02',
    label: 'Days 31–60',
    name: 'The Install',
    icon: Settings,
    headline: 'Systems. Operator. Execution.',
    description: 'The brand is built. Now the machine gets installed. Your operator learns the system. Content production becomes repeatable. Posting OS, capture workflows, and editing templates all go live inside Content.OS.',
    what: [
      'Operator onboarded into Content.OS and trained on your system.',
      'Posting OS installed. Capture, create, edit, publish. Documented.',
      'Content production templated. Scripts, thumbnails, formats.',
      'Weekly rhythm locked in. Who does what, when, every week.',
      'First 30 days of output reviewed. Patterns surfaced. Adjustments made.',
      'Distribution channels configured. Platform strategy confirmed.',
    ],
    outcome: 'Content runs without you being the bottleneck. Your operator owns execution.',
  },
  {
    num: '03',
    label: 'Days 61–90',
    name: 'The Tune',
    icon: Gauge,
    headline: 'Optimise. Measure. Compound.',
    description: 'The system is running. Now it gets dialled in. Performance data reviewed. Content angles sharpened. The engine moves from "running" to "compounding." KPIs installed so you can see what\'s working without guessing.',
    what: [
      'Authority Dashboard live. Drift Index, Velocity Score, output tracking.',
      'Content performance reviewed. What\'s landing, what\'s not, why.',
      'Quarterly campaign structure mapped. Repeatable launches.',
      'Operator fully autonomous. Sean shifts to pattern recognition only.',
      'Ascension path set. Advisory continuity or graduation.',
    ],
    outcome: 'A documented, operator led authority engine. Running, measured, and ready to scale.',
  },
];

export default function TheEngine() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The 90 Day
                <br />
                <span className="text-zinc-500">Authority Engine.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-4">
                Build. Install. Tune. A documented content engine built around your expertise, run by your operator, measured by real numbers.
              </p>
              <p className="text-zinc-500 text-sm max-w-lg">
                Three phases. Each one builds on the last. You don't move forward until the previous stage is working.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* How It Works Overview */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The structure</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Three phases.
              <br />
              <span className="text-zinc-500">First, next, then.</span>
            </h2>
            <div className="max-w-3xl space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Phase one is the build. Your brand, positioning, and narrative get extracted and documented. Everything that makes your content yours.
              </p>
              <p>
                Phase two is the install. Your operator learns the system. Content production becomes repeatable. You stop being the bottleneck.
              </p>
              <p>
                Phase three is the tune. Performance data. Pattern recognition. The engine goes from running to compounding.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Phase Cards */}
      {phases.map((phase, i) => (
        <React.Fragment key={i}>
          <section className="py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <Section>
                <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16">
                  {/* Left: Phase info */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">{phase.num}</p>
                      <div>
                        <p className="text-zinc-600 text-xs uppercase tracking-widest">{phase.label}</p>
                        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                          {phase.name}
                        </h2>
                      </div>
                    </div>
                    <p className="text-blue-400 font-semibold text-sm mb-4">{phase.headline}</p>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                      {phase.description}
                    </p>
                    <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl">
                      <p className="text-zinc-300 text-sm font-medium">{phase.outcome}</p>
                    </div>
                  </div>

                  {/* Right: What's involved */}
                  <motion.div
                    className="glow-card p-8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <phase.icon className="w-5 h-5 text-blue-400 mb-5" />
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What's involved</p>
                    <ul className="space-y-3">
                      {phase.what.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                          <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </Section>
            </div>
          </section>
          <div className="gradient-line" />
        </React.Fragment>
      ))}

      {/* After 90 Days — Advisory */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <RotateCcw className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Continuity</p>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      The Pit Team
                    </h2>
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  After 90 days, the engine is built and running. Advisory is the pit team. Strategic pattern recognition, quarterly planning, and Content.OS access. You stay sharp without going back to heavy touch.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Weekly group calls. Edge case support. Milestone based check ins. Your operator keeps running. Sean keeps watching the patterns.
                </p>
                <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl">
                  <p className="text-zinc-300 text-sm font-medium">Advisory is invite only. If you implement through the 90 days, you get the invitation.</p>
                </div>
              </div>

              <motion.div
                className="glow-card p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What advisory includes</p>
                <ul className="space-y-3">
                  {[
                    'Full Content.OS access. Frameworks, templates, tracking.',
                    'Weekly group pattern recognition calls with Sean.',
                    'Strategic direction on the decisions that change trajectory.',
                    'Milestone based check ins. Progress drives the cadence.',
                    'Priority access to Operator Launch when you\'re ready.',
                  ].map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Investment */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Investment</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                $10,000 for the 90 day build.
                <br />
                <span className="text-zinc-500">Advisory from $2,500/month after.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  The 90 days covers all three phases. Brand Day, operator install, and the full tune. Everything built inside Content.OS.
                </p>
                <p>
                  Advisory is month to month continuity for graduates. No lock in. Stay as long as the value is obvious.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              It starts with a conversation.
            </h2>
            <p className="text-zinc-400 mb-10">
              If this looks like what you need, apply and we'll talk through whether it's the right fit.
            </p>
            <a
              href="/builder"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
