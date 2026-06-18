import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ChevronDown } from 'lucide-react';
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

type SectionRef = {
  name: string;
  href: string;
  items: string[];
};

type Phase = {
  window: string;
  outcome: string;
  sections: SectionRef[];
};

const PHASES: Phase[] = [
  {
    window: 'Weeks 1-4',
    outcome: 'Lead magnets live. Shoot cadence locked. Corey shadowing.',
    sections: [
      {
        name: 'Leads',
        href: '/undeniablenextsteps/lead-magnets',
        items: [
          'Relaunch Six Step Profit Path',
          'Ship From Cold to Sold landing page',
          'Rebrand the diagnostic (Find the One Thing)',
          'Ship the Leak Calculator',
        ],
      },
      {
        name: 'Content Engine',
        href: '/undeniablenextsteps/content',
        items: [
          'Lock the 30-day shoot test (Mon / Wed / Fri)',
          '4 environments rotating: Park, Gym, Hallway, Office',
          '9 shorts week 1, scaling to 14 by week 3',
        ],
      },
      {
        name: 'Ops and Scorecard',
        href: '/undeniablenextsteps/ops',
        items: [
          'Corey 30-day shadowing protocol kicks off',
          'Install the Monday review (7 questions)',
          'KPI tracking starts',
        ],
      },
    ],
  },
  {
    window: 'Weeks 5-8',
    outcome: 'Character video live. Rome in production. Long-form cycle running.',
    sections: [
      {
        name: 'Content Engine',
        href: '/undeniablenextsteps/content',
        items: [
          'Ship the Character video (10-beat arc, 20-30 min)',
          'Film Rome (2 to 3 day block)',
          'Start the 6-week long-form rotation',
          'Start 3 podcasts per week',
        ],
      },
      {
        name: 'Ops and Scorecard',
        href: '/undeniablenextsteps/ops',
        items: [
          'Corey suggesting content angles at Monday review',
          'Pattern recognition built from 60 days of metrics',
        ],
      },
    ],
  },
  {
    window: 'Weeks 9-12',
    outcome: 'Rome public. Corey owns Monday review.',
    sections: [
      {
        name: 'Content Engine',
        href: '/undeniablenextsteps/content',
        items: [
          'Rome unlisted, then public on YouTube',
          'Continuous testing locked (1 to 2 new formats per month)',
        ],
      },
      {
        name: 'Ops and Scorecard',
        href: '/undeniablenextsteps/ops',
        items: [
          'Corey drives Monday review from data',
          'KPI dashboard live, updated weekly',
          'Quarterly review against the 5-year math',
        ],
      },
    ],
  },
  {
    window: 'Always-on',
    outcome: 'Monday review. Mon / Wed / Fri shoots.',
    sections: [
      {
        name: 'Ops and Scorecard',
        href: '/undeniablenextsteps/ops',
        items: [
          'Mon / Wed / Fri shoots, 10:00 to 14:00',
          'Tuesday and Thursday edits',
          'Friday weekly review',
          'Sunday Rhys previews next week',
          'End-of-day capture (4 questions) every working day',
        ],
      },
    ],
  },
];

function RoadmapRow({ phase, isLast }: { phase: Phase; isLast: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={isLast ? '' : 'border-b border-zinc-800'}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full text-left grid grid-cols-[140px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 hover:bg-elevated/40 transition-colors ${phase.window === 'Always-on' ? 'bg-elevated/30' : ''}`}
        aria-expanded={open}
      >
        <p className="font-display text-[14px] md:text-[16px] font-extrabold text-blue-400 leading-tight">{phase.window}</p>
        <p className="text-zinc-200 text-[14px] md:text-[15px] leading-relaxed">{phase.outcome}</p>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 md:px-7 pb-6 pt-2 border-t border-zinc-800/60 bg-base/40">
          <div className="grid gap-4 mt-4">
            {phase.sections.map((s) => (
              <div key={s.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                <a href={s.href} className="group inline-flex items-center gap-2 mb-3">
                  <span className="font-display text-[15px] font-extrabold text-white group-hover:text-blue-400 transition-colors">{s.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </a>
                <ul className="space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-200 text-[13px] md:text-[14px] leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The
                <br />
                <span className="text-blue-400">Plan.</span>
              </h1>
              <p className="text-zinc-400 text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
                Optional 90 day authority engine.
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* DIAGNOSIS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Diagnosis</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">From stranger to sale, 4 bottlenecks. Score each. Clarity and Quality both score 3. The other two hold.</p>
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
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Click any row to see the core sections that ship in that phase.</p>
              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                {PHASES.map((p, i) => (
                  <RoadmapRow key={p.window} phase={p} isLast={i === PHASES.length - 1} />
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
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Each page exists to make one decision or action easy. Open the page you need.</p>
              <div className="space-y-3">
                {[
                  { to: '/undeniablenextsteps/lead-magnets', label: 'Leads', sub: '4 lead magnets. Names, headlines, owners, checklists.' },
                  { to: '/undeniablenextsteps/content', label: 'Content Engine', sub: 'Short-form rhythm. Character. Rome. 6-week rotation with working titles.' },
                  { to: '/undeniablenextsteps/ops', label: 'Ops and Scorecard', sub: 'Roles. Weekly rhythm. Monday review. KPI table. Open decisions.' },
                ].map((card) => (
                  <a key={card.to} href={card.to} className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5 md:px-7 md:py-6">
                    <div>
                      <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">{card.label}</h3>
                      <p className="text-zinc-400 text-[13px]">{card.sub}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-4" />
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
