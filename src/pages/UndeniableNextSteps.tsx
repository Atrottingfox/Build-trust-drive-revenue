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
    window: 'Weeks 1 to 4',
    outcome: 'Brand locked. Lead magnets live. Character video live. Shoot cadence locked. Corey shadowing.',
    sections: [
      {
        name: 'Brand',
        href: '/undeniablenextsteps/brand',
        items: [
          'Brand voice and identity refined',
          'Positioning sharpened',
          'Bio and pinned posts swapped',
        ],
      },
      {
        name: 'Lead Magnets',
        href: '/undeniablenextsteps/lead-magnets',
        items: [
          'All 5 assets shipped',
          'Naming finalised on each',
          'Landing pages and follow up routes in place',
        ],
      },
      {
        name: 'Content',
        href: '/undeniablenextsteps/content',
        items: [
          'Hook testing weeks 1 to 2 (14 posts per week)',
          '4 environments rotating',
          'Hook optimisation weeks 3 to 4',
          'Character video filmed, edited and live by end of week 4',
        ],
      },
      {
        name: 'Operations',
        href: '/undeniablenextsteps/ops',
        items: [
          'Shoot rhythm locked (Mon and Wed short form, Fri longform)',
          'Edit cadence starts',
        ],
      },
    ],
  },
  {
    window: 'Weeks 5 to 8',
    outcome: 'Public VSL live. Long form rotation running. Train Corey.',
    sections: [
      {
        name: 'Content',
        href: '/undeniablenextsteps/content',
        items: [
          'Weeks 5 to 6 topic and format analysis',
          'Film and ship the Public VSL',
          'Continue the 6 week long form rotation',
        ],
      },
    ],
  },
  {
    window: 'Weeks 9 to 12',
    outcome: 'Refine the brand. Continue testing. Continue training Corey.',
    sections: [
      {
        name: 'Brand',
        href: '/undeniablenextsteps/brand',
        items: [
          'Refine the brand based on what the data has shown, what feels good, and how content has performed.',
        ],
      },
      {
        name: 'Content',
        href: '/undeniablenextsteps/content',
        items: [
          'Continue hook and format testing, refined by data.',
        ],
      },
      {
        name: 'Operations',
        href: '/undeniablenextsteps/ops',
        items: [
          'Train Corey to become a marketer who wields a camera as his tool',
        ],
      },
    ],
  },
  {
    window: 'Always on',
    outcome: 'Mon / Wed / Fri shoots. Fri longform.',
    sections: [
      {
        name: 'Content',
        href: '/undeniablenextsteps/content',
        items: [
          'Mon and Wed: short form shoots',
          'Fri: longform shoot',
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
        className={`w-full text-left grid grid-cols-[140px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 hover:bg-elevated/40 transition-colors ${phase.window === 'Always on' ? 'bg-elevated/30' : ''}`}
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
          description="Home and roadmap. Diagnosis, 90 day roadmap, working pages."
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
                Optional 90 day authority engine. Refine your brand. Increase demand.
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
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">From stranger to sales there are 4 potential bottlenecks. Clarity and Quality both scored 3. First we focus on Clarity.</p>
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
              <Eyebrow>90 day roadmap</Eyebrow>
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

        {/* BY DAY 90 */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>By day 90</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">What Rhys actually has at the end of the 90 days.</p>
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-8">
                <ul className="space-y-2.5">
                  {[
                    'New bio live across every channel.',
                    'Voice rules locked. Corey edits in voice.',
                    'Brand workbook delivered. Team can use it.',
                    'All 5 lead magnets shipped, named, with landing pages and follow ups in place.',
                    'Character video live.',
                    'Public VSL live on YouTube.',
                    '6 week long form rotation running.',
                    'Hook and format winners locked from the 4 week test cycle.',
                    'Corey trained and growing into creative direction.',
                    'Data tracking and review cycles running on rhythm.',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-100 text-[14px] md:text-[15px] leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* WORKSHOP INTEGRATION */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Workshop</Eyebrow>
              <p className="text-zinc-200 text-[16px] md:text-[18px] leading-relaxed max-w-2xl">Everything feeds the workshop. Lead magnets capture demand. Long form compresses trust. The workshop is where it converts.</p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* WORKING PAGES */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Working pages</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Four working pages. Brand sets the voice. Lead Magnets capture demand. Content sustains attention. Operations keeps the team aligned. Open the page you need.</p>
              <div className="space-y-3">
                {[
                  { to: '/undeniablenextsteps/brand', label: 'Brand', sub: 'The brand voice, identity, and positioning work.' },
                  { to: '/undeniablenextsteps/lead-magnets', label: 'Lead Magnets', sub: '5 assets. Names, formats, status.' },
                  { to: '/undeniablenextsteps/content', label: 'Content', sub: 'Master formula, pillars, formats, environments, hooks, cadence, calendar, data.' },
                  { to: '/undeniablenextsteps/ops', label: 'Operations', sub: 'Roles, weekly rhythm, review cycles, data tracking, open decisions.' },
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

        <Divider />

        {/* NEXT STEPS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Next steps · to lock the engagement</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">What we need to nail down to turn this from a plan into a thing.</p>
              <div className="space-y-3">
                {[
                  { who: 'Rhys', what: 'Lock fortnightly call times in the calendar for the 90 days.' },
                  { who: 'Rhys', what: '5 to 10 stories, moments and outlines for the Character video. Sean will help build it out from there.' },
                  { who: 'Corey', what: 'List of what is performing well based on data from the last 30 to 90 days.' },
                  { who: 'Corey', what: 'Audit of what is already in the bank (existing content we can drip).' },
                  { who: 'Rhys', what: 'Sign off on the bio (primary or alternative option).' },
                  { who: 'Rhys', what: 'Confirm naming approach on the 5 lead magnet assets.' },
                  { who: 'Rhys + Corey', what: 'Confirm the 4 shoot environments are accessible (Park, Gym, Hallway, Office or equivalent).' },
                  { who: 'Sean', what: 'Deliver the brand workbook by end of week 4.' },
                  { who: 'Sean', what: 'Lock the 6 pillar video outlines and the 6 week rotation.' },
                ].map((step, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 grid md:grid-cols-[120px_1fr] gap-3">
                    <p className="font-display font-extrabold text-blue-300 text-[13px]">{step.who}</p>
                    <p className="text-zinc-200 text-[14px] leading-relaxed">{step.what}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* REFERENCE TOOLS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Reference and tools</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Source-of-truth pages from the brand-day session. Open them when the working pages reference them.</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { to: '/undeniablenextsteps/hooks', label: 'Hook Bank', sub: 'Around 90 hooks, organised by mechanic.' },
                  { to: '/undeniablenextsteps/ad-gold', label: 'Ad Gold', sub: 'Verbatim money lines, stories, and frames.' },
                  { to: '/undeniablenextsteps/shoot-card', label: 'Next Shoot', sub: 'The on the day tool. 4 buckets aligned with the 4 formats.' },
                  { to: '/undeniablenextsteps/content-system', label: 'Content System', sub: 'The original content operating notes.' },
                ].map((card) => (
                  <a key={card.to} href={card.to} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-5 py-4">
                    <div>
                      <h3 className="font-display text-[16px] font-extrabold text-white mb-0.5">{card.label}</h3>
                      <p className="text-zinc-400 text-[12px]">{card.sub}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* THE EXECUTION CHECKLIST */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <a href="/theundeniableplan" className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">The execution checklist</p>
                    <h3 className="font-display text-[20px] md:text-[24px] font-extrabold text-white mb-2">The Undeniable Plan</h3>
                    <p className="text-zinc-400 text-[14px] leading-relaxed">The tickable execution layer. Numbered buckets per phase with checkboxes that save to the device. Open when you want to actually work through it.</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
