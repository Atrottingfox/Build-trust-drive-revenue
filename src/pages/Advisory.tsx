import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Shield, Zap, Target, BookOpen } from 'lucide-react';
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

const inclusions = [
  {
    icon: Zap,
    title: 'Full Content.OS access',
    description: 'The operating system that runs your content engine. Frameworks, templates, tracking. All in one place.',
  },
  {
    icon: Target,
    title: 'Weekly group pattern recognition calls',
    description: 'Sean reviews what\'s working across all clients and surfaces the patterns that matter for your stage.',
  },
  {
    icon: Shield,
    title: 'Edge cases and strategic direction',
    description: 'Sean on the things that actually need a second opinion. Not day to day execution. The decisions that change trajectory.',
  },
  {
    icon: BookOpen,
    title: 'Milestone based check ins',
    description: 'Structured around your progress, not arbitrary timelines. Hit a milestone, unlock the next layer.',
  },
  {
    icon: Zap,
    title: 'Ascension path to 90 day build',
    description: 'When you\'re ready for the full Authority Engine build, you get priority access and rollover credit from advisory.',
  },
];

export default function Advisory() {
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
                Advisory +
                <br />
                <span className="text-zinc-500">Content.OS Access.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-4">
                $3,000/month. For Brand Day graduates who implemented.
              </p>
              <p className="text-zinc-500 text-sm">
                This is not a public offer. It's an invitation.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What's Included */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What's included</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              The system, the calls,
              <br />
              <span className="text-zinc-500">and the strategic layer.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inclusions.map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* How You Qualify */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How you qualify</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                You don't apply.
                <br />
                <span className="text-zinc-500">You earn it.</span>
              </h2>
              <ul className="space-y-5">
                {[
                  'Completed a Brand Day with Sean',
                  'Implemented for 30 days using the system',
                  'Showing consistent output and momentum',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Advisory is invite only. If you've completed a Brand Day and you're implementing, you'll be invited at the right time. No public application. No pressure.
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
              Start with a Brand Day.
            </h2>
            <p className="text-zinc-400 mb-10">
              Advisory opens after you've built the foundation and proven you'll use it.
            </p>
            <a
              href="/brand-day"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Learn about Brand Day
              <ArrowRight className="w-4 h-4" />
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
