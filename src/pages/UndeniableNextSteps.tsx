import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const Divider = () => <div className="gradient-line" />;

export default function UndeniableNextSteps() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO
          title="The Plan · Undeniable"
          description="Home and roadmap. Diagnosis, 90-day roadmap, working pages."
          path="/undeniablenextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="accent-line mb-8" />
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                The
                <br />
                <span className="text-blue-400">Plan.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* DIAGNOSIS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Diagnosis</Eyebrow>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { letter: 'C', name: 'Clarity', score: 3, focus: true },
                  { letter: 'V', name: 'Visibility', score: 4, focus: false },
                  { letter: 'A', name: 'Authority', score: 5, focus: false },
                  { letter: 'Q', name: 'Quality', score: 3, focus: false },
                ].map((b) => (
                  <div key={b.letter} className={`rounded-2xl border p-5 md:p-6 ${b.focus ? 'border-blue-500/40 bg-blue-500/[0.05]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-display text-[28px] md:text-[32px] font-extrabold text-white">{b.letter}</span>
                      <span className={`font-display text-[28px] md:text-[32px] font-extrabold ${b.focus ? 'text-blue-400' : 'text-zinc-400'}`}>{b.score}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400">{b.name}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* 90-DAY ROADMAP */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>90-day roadmap</Eyebrow>
              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                {[
                  { window: 'Weeks 1-4', outcome: 'Lead magnets live. Shoot cadence locked. Corey shadowing.' },
                  { window: 'Weeks 5-8', outcome: 'Character video live. Rome in production. Long-form cycle running.' },
                  { window: 'Weeks 9-12', outcome: 'Rome public. Corey owns Monday review.' },
                  { window: 'Always-on', outcome: 'Monday review. Mon / Wed / Fri shoots.' },
                ].map((row, i) => (
                  <div key={row.window} className={`grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 ${i < 3 ? 'border-b border-zinc-800' : ''} ${row.window === 'Always-on' ? 'bg-elevated/30' : ''}`}>
                    <p className="font-display text-[14px] md:text-[16px] font-extrabold text-blue-400 leading-tight">{row.window}</p>
                    <p className="text-zinc-200 text-[14px] md:text-[15px] leading-relaxed">{row.outcome}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* WORKING PAGES */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Working pages</Eyebrow>
              <div className="space-y-3">
                {[
                  { to: '/undeniablenextsteps/lead-magnets', label: 'Leads' },
                  { to: '/undeniablenextsteps/content', label: 'Content Engine' },
                  { to: '/undeniablenextsteps/ops', label: 'Ops and Scorecard' },
                ].map((card) => (
                  <a key={card.to} href={card.to} className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5 md:px-7 md:py-6">
                    <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white">{card.label}</h3>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
