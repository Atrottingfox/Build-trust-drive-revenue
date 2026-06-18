import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

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

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-5">{children}</p>
);

function HubCard({ to, n, label, blurb, ships }: { to: string; n: string; label: string; blurb: string; ships: string[] }) {
  return (
    <a href={to} className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-7 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-blue-400 text-[18px] font-extrabold">{n}</span>
        <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
      </div>
      <h3 className="font-display text-2xl md:text-[28px] font-extrabold text-white leading-tight mb-3">{label}</h3>
      <p className="text-zinc-400 text-[14px] leading-relaxed mb-5">{blurb}</p>
      <div className="border-t border-zinc-800/60 pt-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">Inside</p>
        <ul className="space-y-1.5">
          {ships.map((s) => (
            <li key={s} className="text-zinc-400 text-[13px] flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

export default function UndeniableNextSteps() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO
          title="Next steps for Undeniable · the 90-day plan"
          description="Brand, Lead Magnets, Content, Plan. Four sections. Everything you need to run the next 90 days."
          path="/undeniablenextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* HERO */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <div className="accent-line mb-8" />
              <Eyebrow>Build plan · 90 days</Eyebrow>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                The problem was never awareness.
                <br />
                <span className="text-zinc-400">It is trust.</span>
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium italic">Working session output · for the Undeniable team</span>
              </div>
              <p className="text-zinc-400 text-[1rem] md:text-lg leading-relaxed">
                Four sections. Each one is a complete tool, not a reference doc. Click in. Use what&apos;s in there. Ship the artefacts.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* 4 CARDS */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <Section>
              <div className="grid md:grid-cols-2 gap-5">
                <HubCard
                  to="/undeniablenextsteps/brand"
                  n="01"
                  label="Brand"
                  blurb="The reframe, the diagnosis, the dream client, the bio rewrite. The shape your voice fits into."
                  ships={[
                    'The CVAQ diagnosis · 4 bottleneck scores',
                    'FROM → TO · the shift',
                    'Brand core · archetypes · voice · category',
                    'Dream clients · Sabine + Josh',
                    'Bio rewrite · copy-paste-ready',
                  ]}
                />
                <HubCard
                  to="/undeniablenextsteps/lead-magnets"
                  n="02"
                  label="Lead Magnets"
                  blurb="The 4 critical assets, named, copied, status-flagged. What ships in 2 weeks."
                  ships={[
                    'Six Step Profit Path · new headline',
                    'From Cold to Sold · sales framework',
                    'Find the one thing · diagnostic',
                    'How big is your leak · churn calculator',
                    'Where each one sits in the funnel',
                  ]}
                />
                <HubCard
                  to="/undeniablenextsteps/content"
                  n="03"
                  label="Content"
                  blurb="Short-form and long-form. Pillars, formats, environments, hooks, shoot cadence, posting calendar, data."
                  ships={[
                    '4 pillars · Mindset · Leads · Sales · Scale',
                    '4 formats · Story · Belief · Teach · Show',
                    '4 environments · matched to format',
                    '10 hook templates · with examples',
                    'Shoot cadence + posting calendar + data log',
                  ]}
                />
                <HubCard
                  to="/theundeniableplan"
                  n="04"
                  label="Plan"
                  blurb="The 90-day execution plan. Owner, ship date, status on every action. Tickable."
                  ships={[
                    'Phase 1 · Days 0-30 · Stabilise',
                    'Phase 2 · Days 30-60 · Build foundations',
                    'Phase 3 · Days 60-90 · Scale',
                    'Operating rhythm · weekly + monthly',
                    'Who does what · Rhys · Corey · Sean',
                  ]}
                />
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* WHY NOW */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Why now</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">The rocket ship has already left the station.</h2>
              <ul className="space-y-4">
                {[
                  'Right problem, wrong way is the most expensive place to be. You get small wins, think it is great, and do not find out for five years you could have been three times the size.',
                  'I made an extra $120,000 that year and thought it was great. Then I realised if I had solved it this way first, we would have made an extra $600,000.',
                  'Less than 5,000 followers when this started. 40 person rooms. 10 to 12 workshops this year. The room only gets harder to get into.',
                  'In twelve months, you stop being the one borrowing status, and become the asset everyone else wants to borrow.',
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[15px] leading-relaxed italic">&ldquo;{q}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* CLOSING */}
        <section className="py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Section>
              <div className="accent-line mx-auto mb-10" />
              <p className="text-zinc-400 mb-10 leading-relaxed text-[16px]">
                The next stage of growth doesn&apos;t come from working harder. It comes from the system that runs without you in the room.
              </p>
              <a href="/undeniable-notes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to the working notes
              </a>
            </Section>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
