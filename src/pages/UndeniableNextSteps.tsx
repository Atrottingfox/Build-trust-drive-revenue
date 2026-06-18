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

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">{children}</h2>
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

        {/* ═══ HERO ═══ */}
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
                Most of the 15-20K coaches in your category already know who you are. They&apos;re sitting on the fence. The next 90 days compress trust and convert them, instead of chasing new eyeballs.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ DIAGNOSIS AT A GLANCE ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The diagnosis</Eyebrow>
              <H2>Where the four bottlenecks sit.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">From stranger to sale, four bottlenecks. Score each. Fix the lowest first.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { letter: 'C', name: 'Clarity', score: 3, focus: 'Fix first', note: 'A stranger reads 4 of 5 posts as "I\'m a coach."' },
                  { letter: 'V', name: 'Visibility', score: 4, focus: '', note: 'Strangers showing up in DMs. ICP knows the name.' },
                  { letter: 'A', name: 'Authority', score: 5, focus: '', note: '$5M built. 82% retention. Receipts unmatched.' },
                  { letter: 'Q', name: 'Quality', score: 3, focus: 'Fix next', note: 'Leads landing sub-10K. Qualified eventually, not pre-sold.' },
                ].map((b) => (
                  <div key={b.letter} className={`rounded-2xl border p-4 md:p-5 ${b.focus ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-display text-[24px] md:text-[28px] font-extrabold text-white">{b.letter}</span>
                      <span className={`font-display text-[24px] md:text-[28px] font-extrabold ${b.focus ? 'text-blue-400' : 'text-zinc-400'}`}>{b.score}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-1">{b.name}</p>
                    {b.focus && <p className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold mb-2">{b.focus}</p>}
                    <p className="text-zinc-300 text-[12px] md:text-[13px] leading-relaxed mt-2">{b.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-[14px] italic mt-6">Clarity and Quality at 3. That&apos;s where the 90 days start. Visibility and Authority hold while we fix the bottom.</p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE SHIFT · FROM → TO ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The shift</Eyebrow>
              <H2>From founder-as-bottleneck to founder-as-asset.</H2>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">FROM</p>
                  <p className="text-zinc-200 text-[15px] leading-relaxed">Founder + Strategist + Content creator + Workshop host + Sales lead + Quality control + Creative director.</p>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">TO</p>
                  <p className="text-zinc-100 text-[15px] leading-relaxed font-medium">Founder + Trust asset + Workshop host + Strategy.</p>
                </div>
              </div>
              <p className="text-zinc-400 text-[14px] italic mt-6">
                This isn&apos;t about working harder. It&apos;s about building the system that runs without you in the room.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ WHO WE AIM AT ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Who we aim at</Eyebrow>
              <H2>Two avatars. Both self-identify as doers.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Content aims at these two. The binary format trains more of them to put their hand up.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Sabine</p>
                  <p className="font-display text-white text-[20px] font-extrabold mb-3">15K → 80K months</p>
                  <p className="text-zinc-300 text-[14px] leading-relaxed">Consumed everything. Listened to every podcast back to the Livingstone days. Problem-solver. Tries first, asks when stuck. Undiagnosed churn problem.</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Josh</p>
                  <p className="font-display text-white text-[20px] font-extrabold mb-3">Gym owner · 2 locations</p>
                  <p className="text-zinc-300 text-[14px] leading-relaxed">Did the math on his churn. Lost $800,000 and never knew. Shows up to every call. &ldquo;You won&apos;t hear from me until I&apos;ve done 80K a month.&rdquo;</p>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE 4 CARDS ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The work</Eyebrow>
              <H2>Four sections. Click in.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">Each section is a working tool, not a reference doc. Open it. Copy the artefact. Ship.</p>
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

        {/* ═══ 90-DAY ARC · TIMELINE ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The arc</Eyebrow>
              <H2>Sequenced deliberately.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Stabilise first. Build foundations second. Scale third. Don&apos;t skip ahead.</p>
              <div className="grid md:grid-cols-3 gap-3 mt-8">
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5">
                  <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Days 0 - 30</p>
                  <p className="font-display text-white text-[18px] font-extrabold mb-3">Stabilise</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed">Sharpen clarity. Fix the workshop conversion gap. Lock the 30-day shoot test. Corey starts shadowing.</p>
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-5">
                  <p className="text-zinc-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Days 30 - 60</p>
                  <p className="font-display text-white text-[18px] font-extrabold mb-3">Build foundations</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed">Character video ships. Rome filming locked. Six-week cycle starts. 4 winning short-form formats picked.</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
                  <p className="text-emerald-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Days 60 - 90</p>
                  <p className="font-display text-white text-[18px] font-extrabold mb-3">Scale</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed">Rome ships. Corey drives Monday review. Engine runs without you. KPI dashboard live.</p>
                </div>
              </div>
              <p className="text-zinc-400 text-[14px] italic mt-6">Full week-by-week detail in the Plan section.</p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ OPERATING RHYTHM · PREVIEW ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The rhythm</Eyebrow>
              <H2>What every week looks like.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Mon / Wed / Fri shoot. Tue / Thu edit. Friday weekly review. Sunday Rhys scans next week.</p>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mt-8">
                {[
                  { d: 'Mon', label: 'Shoot 10-2 · Monday review' },
                  { d: 'Tue', label: 'Edit · client calls' },
                  { d: 'Wed', label: 'Shoot 10-2' },
                  { d: 'Thu', label: 'Edit · podcast cuts' },
                  { d: 'Fri', label: 'Shoot 10-2 · weekly review' },
                  { d: 'Sat', label: 'Off' },
                  { d: 'Sun', label: 'Rhys preview next week' },
                ].map((day, i) => (
                  <div key={day.d} className={`rounded-xl border p-3 md:p-4 ${[0, 2, 4].includes(i) ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <p className={`font-display text-[14px] font-extrabold mb-2 ${[0, 2, 4].includes(i) ? 'text-blue-300' : 'text-white'}`}>{day.d}</p>
                    <p className="text-zinc-300 text-[12px] leading-relaxed">{day.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-[14px] italic mt-6">Blue days are shoot days. Edits land Tue / Thu. Friday closes the week with the review.</p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ WHO DOES WHAT ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Roles · 90 days</Eyebrow>
              <H2>Who owns what.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Three people. Clear lanes. No overlap.</p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Rhys · talent + IP + final call</p>
                  <ul className="space-y-2">
                    {[
                      'Show up to Mon / Wed / Fri shoots',
                      'Write hook + problem for each weekly video',
                      'Film Character (1 day) and Rome (2-3 day block-shoot)',
                      'Record 2-3 podcast episodes per week (5-15 min each)',
                      'Sign off Monday review in 10 minutes',
                      'Capture (4 questions) end of each working day',
                      'Approve next-week shoot list Sunday evening',
                      'Final call on every named asset, framework, hire',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[14px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Corey · capture + operations → creative direction</p>
                  <ul className="space-y-2">
                    {[
                      'Run the Mon / Wed / Fri shoots (14 shorts/wk by week 3)',
                      'Edit short-form to ship 2/day cadence',
                      'Two-camera minimum on long-form, lined up for the cut',
                      'Log daily metrics, run Monday review',
                      'Shadow 3 client calls + 1 workshop in week 1',
                      'Build pattern recognition · read frameworks, catalogue stories',
                      'By week 3: suggest content angles. By week 4: drive direction.',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[14px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="font-display font-extrabold text-blue-300 text-[16px] mb-4">Sean · strategy + frameworks + accountability</p>
                  <ul className="space-y-2">
                    {[
                      'Build + deliver the content operating system (the 4 modules)',
                      'Write the 4 lead magnet headlines + landing pages',
                      'Facilitate the 10 character lessons with Rhys',
                      'Lock the 6 pillar video outlines and the 6-week cycle doc',
                      'Name the signature mechanisms (MACHINE, 5-star offer, lead-vs-churn inverse)',
                      'Curate Corey\'s resources + run the bottleneck diagnostic with him',
                      'Fortnightly strategy + accountability sessions with Rhys',
                      'Voice note + email support between sessions for decisions',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[14px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE WORKSHOP ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The workshop</Eyebrow>
              <H2>The money mechanism. Every road leads here.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">9-out-of-10 close on warm calls. 99% show rate. The workshop is the conversion engine — protect it.</p>

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-8 mb-6">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-4">⬡ The card · printed, on every chair</p>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 mb-3">When you ask a question, say:</p>
                <div className="space-y-2 text-zinc-100 text-[15px] leading-relaxed font-medium mb-4">
                  <p>&ldquo;I&apos;m a <span className="text-blue-300">[role]</span>.&rdquo;</p>
                  <p>&ldquo;I make <span className="text-blue-300">[revenue]</span>.&rdquo;</p>
                  <p>&ldquo;My main problem is <span className="text-blue-300">[X]</span>.&rdquo;</p>
                  <p>&ldquo;If I don&apos;t fix it, <span className="text-blue-300">[stakes]</span>.&rdquo;</p>
                </div>
                <p className="text-zinc-400 text-[13px] italic">Only Gabe followed the framework last time. Fix this once = 12 months of mid-funnel ad fuel.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[15px] mb-3">In-room production</p>
                  <ul className="space-y-2">
                    {[
                      'Two-camera setup. Locked side angle on the asker.',
                      'If they miss the framework, Rhys re-prompts: "Can you re-ask in the format on the card?"',
                      'Don\'t roll on questions that won\'t cut. Save the time.',
                      'Pull 8-12 strongest as mid-funnel ad creative the same week.',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[13px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[15px] mb-3">The conversion path</p>
                  <ul className="space-y-2">
                    {[
                      'Workshop landing page · sub-2% conversion (fix to 5%+)',
                      'Book → show · 99% baseline (hold)',
                      'Show → call (15-min phone) · majority',
                      'Call → close · 9/10 best months (hold)',
                      'L2 12-month retention · 82% proven (hold)',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[13px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE AD FUNNEL ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The funnel</Eyebrow>
              <H2>4 ad tiers · sorted by audience awareness.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Currently one ad type does all the work (&ldquo;come to a workshop&rdquo;). Maximiser approach got us here. Now we segment.</p>
              <div className="space-y-3">
                {[
                  { tier: 'Top · problem-unaware', name: 'Status borrow', detail: 'Alex (highest-converting, lowest-CPA). Brandon. Luke Miller. Gabe. "Alex told me to do this workshop" creative leads.' },
                  { tier: 'Mid · solution-aware', name: 'Workshop Q&A clips', detail: 'Two-camera Q&As where attendee hits the framework. Stake-loaded. Authority-loaded. Identity-loaded.' },
                  { tier: 'Asset-led · solution-aware', name: 'Lead magnet ads', detail: 'Six Step Profit Path · Find the One Thing · Leak Calculator. Split-testing landing page vs instant lead form.' },
                  { tier: 'Bottom · product-aware', name: 'Workshop direct', detail: 'Keep running. Lowest-friction conversion still. Don\'t kill what works.' },
                ].map((t, i) => (
                  <div key={t.tier} className="rounded-2xl border border-zinc-800 bg-elevated/40 p-5">
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span className="font-display text-blue-400 text-[14px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300">{t.tier}</p>
                    </div>
                    <p className="font-display text-white text-[15px] font-extrabold mb-2">{t.name}</p>
                    <p className="text-zinc-300 text-[13px] leading-relaxed">{t.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 mt-4">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-300 mb-2">Fix this</p>
                <p className="text-zinc-200 text-[14px] leading-relaxed"><b className="text-white">VSL completion 83% · page conversion sub-2%.</b> Gap = expectation mismatch (people clicking for Alex, not coaches) + embedded video has no scrubber. Re-cut tighter. Add controls. Segment ad audiences upstream.</p>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE ROOM ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The room</Eyebrow>
              <H2>The studio + the kit + the environments.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Production setup the team operates inside. Variation is built in, not bolted on.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[15px] mb-3">Studio</p>
                  <ul className="space-y-2">
                    {[
                      'Dark + light split · moody black for hard-hitting, lit for educational',
                      'Everything on wheels · top-down desk, C-stand, screen on articulating arm',
                      'Pull-down backdrops for variation',
                      'iPad draw-behind (Jeremy Haynes style) for visual frameworks',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[13px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[15px] mb-3">Production workflow</p>
                  <ul className="space-y-2">
                    {[
                      'Pre-production wins half the battle (24 shorts in 2.5 hrs reference)',
                      'Hook + problem written before each shoot',
                      'Two-camera minimum on long-form, lined up for the cut',
                      'Walk-the-doc (Cole Gordon) · laptop in front, walk a Google doc, record',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300 text-[13px] leading-relaxed">{s}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-zinc-400 text-[14px] italic mt-6">4 short-form environments rotate: Office · Hallway · Park · Gym. Don&apos;t test them — rotate them.</p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE NUMBERS ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The numbers</Eyebrow>
              <H2>The 8 KPIs Corey logs · weekly.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Current state on the left. Targets on the right. Reviewed every Monday in the 10-minute check.</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { metric: 'Workshop signups', target: 'Sustained · 75/wk' },
                  { metric: 'Workshop show rate', target: 'Baseline 99% · hold' },
                  { metric: 'Workshop → call rate', target: 'Sub-2% → target 5%+', warn: true },
                  { metric: 'Call → close rate', target: '9/10 best months · hold' },
                  { metric: '12-month L2 retention', target: '82% proven · hold' },
                  { metric: 'Avg short-form watch time', target: 'Rising = working' },
                  { metric: 'Share rate', target: 'Best forward indicator' },
                  { metric: 'ICP comment ratio', target: 'Qualitative · weekly read' },
                ].map((k) => (
                  <div key={k.metric} className={`rounded-xl border p-4 ${k.warn ? 'border-amber-500/30 bg-amber-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <p className="font-display font-extrabold text-white text-[14px]">{k.metric}</p>
                    <p className={`text-[12px] mt-1 ${k.warn ? 'text-amber-300 font-semibold' : 'text-zinc-400'}`}>{k.target}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ OPEN DECISIONS ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Pending</Eyebrow>
              <H2>Decisions still open.</H2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Don&apos;t block week 1. Get them off the list by week 4.</p>
              <div className="space-y-3">
                {[
                  { q: 'Custom GPT route', detail: 'Rotate weekly (1-2 new) OR pick 4-8 workhorses and lock. Recommend the workhorse path.' },
                  { q: 'Bottleneck Buster · rename?', detail: '"Diagnostic" + "Bottleneck" are both words most don\'t know. Test a softer name on the landing page.' },
                  { q: 'Linktree replacement', detail: 'Currently one link form. One link in bio = friction. Decide: single CTA-led landing page that branches.' },
                  { q: 'Reese Livingstone vs Undeniable channel', detail: 'Personal vs business account. Currently posting on both. Pick a primary, support the other.' },
                  { q: 'Ad-boost on shorts?', detail: 'Currently not boosted. Test on top 3 performers per month with a fixed $50 boost.' },
                  { q: 'Re-cut workshop VSL', detail: '83% completion is great. Sub-2% page conversion is not. Add scrubber + pause controls, segment ad audiences upstream.' },
                ].map((d, i) => (
                  <div key={i} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                    <p className="font-display text-[15px] font-extrabold text-amber-300 mb-1">{d.q}</p>
                    <p className="text-zinc-300 text-[13px] leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ WHY NOW ═══ */}
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

        {/* ═══ CLOSING ═══ */}
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
