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
    name: 'Brand',
    icon: Wrench,
    headline: 'Extract what makes you, you.',
    description: 'Your expertise, positioning, and narrative get pulled out of your head, documented, and installed into Content.OS. By day 30 you have a Brand Bible, a content plan, and a system your operator can run from.',
    what: [
      'Brand Day (half day, in person). Sean flies to you.',
      'Brand Bible built live. Voice, positioning, narrative, messaging.',
      'Authority Archetype Profile. How you naturally build trust.',
      'Belief Map. What your audience believes vs what they need to.',
      'Origin Story extracted using 1 of 7 narrative templates.',
      '30 day content plan using the 5 A\'s rhythm.',
      'Lead magnet built in the room from your IP.',
    ],
    outcome: 'You leave with a documented brand and a content plan ready to execute.',
  },
  {
    num: '02',
    label: 'Days 31–60',
    name: 'Content',
    icon: Settings,
    headline: 'Strategy. Production. Distribution.',
    description: 'The brand is documented. Now it becomes content. Your strategy gets locked in. Production workflows go live. Distribution channels are configured. Your operator starts running the system week to week.',
    what: [
      'Content strategy mapped to your positioning and audience.',
      'Production workflow installed. Capture, script, edit, publish.',
      'Distribution configured. Platform strategy confirmed.',
      'Operator onboarded into Content.OS and running weekly.',
      'First 30 days of output reviewed. Patterns surfaced.',
      'Weekly rhythm locked in. Who does what, when.',
    ],
    outcome: 'Content is shipping weekly. Your operator runs production. You show up to film.',
  },
  {
    num: '03',
    label: 'Days 61–90',
    name: 'Scale',
    icon: Gauge,
    headline: 'Measure. Sharpen. Compound.',
    description: 'The engine is running. Now it gets dialled in. Performance data reviewed. Content angles sharpened. KPIs installed so you can see what\'s working without guessing. Your operator can run the system by day 90. Understanding the thinking behind it is a 12 month process.',
    what: [
      'Authority Dashboard live. Drift Index, Velocity Score, output tracking.',
      'Content performance reviewed. What\'s landing, what\'s not, why.',
      'Quarterly campaign structure mapped. Repeatable launches.',
      'Operator running the system independently.',
      'Sean shifts to pattern recognition and strategic direction only.',
    ],
    outcome: 'A documented, operator led authority engine. Running, measured, and compounding.',
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
                In 90 days you have a brand system, a trained operator, and a content engine producing without you.
              </p>
              <p className="text-zinc-500 text-sm max-w-lg">
                Three phases. Build it. Install it. Tune it.
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
                Brand. Your expertise extracted, documented, and installed into a system.
              </p>
              <p>
                Content. Strategy, production, and distribution running weekly without you.
              </p>
              <p>
                Scale. Performance data in. Angles sharpened. The engine compounding.
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

      {/* After 90 Days — Keep Building */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <RotateCcw className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">After 90 days</p>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      The Pit Team
                    </h2>
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Your operator can run the system at day 90. Learning to think like you, to understand the why behind every decision, that's a 12 month process. Advisory is the pit team that keeps the engine sharp while that happens.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Weekly group calls. Pattern recognition. Strategic direction. Content.OS access. The opportunity to keep building and scaling what you started.
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
                    'Operator development. From running the system to understanding it.',
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
                  The 90 days covers Brand, Content, and Scale. Everything built inside Content.OS.
                </p>
                <p>
                  Advisory is month to month for graduates. No lock in. Stay as long as the value is obvious.
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
