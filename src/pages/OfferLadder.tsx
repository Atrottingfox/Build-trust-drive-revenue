import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lock, ClipboardCheck, AlertTriangle } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
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

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------- */

const rungs = [
  {
    num: '01',
    title: 'Authority Engine Build Day',
    price: '$5,000',
    tag: 'Public',
    notes: [
      'One in person day, 1:1 with the founder and whoever owns their content.',
      'Founding rate. Goes to $10,000.',
      'The page never mentions the credit. I say it in the room.',
    ],
  },
  {
    num: '02',
    title: '90 Day Authority Engine Install',
    price: '$15,000',
    tag: 'By invitation',
    notes: [
      'The $5,000 Day rolls in, so it is $10,000 additional. $15,000 collected across both.',
      'Founding rate. Goes to $30,000, where a $10,000 Day rolls in and it is $20,000 additional.',
      'Payable $10,000 on acceptance, or 3 x $5,000. Pick one rule.',
      'Only invited after a Build Day. Never sold off the page.',
    ],
  },
  {
    num: '03',
    title: '12 Month Advisory',
    price: '$48,000 list · $28,000 additional',
    tag: 'By invitation · Day 28',
    notes: [
      'Offered at Day 28 to 30, once the Engine is live and there is something to point at.',
      'Their $15,000 credits in full, plus a $5,000 founding discount. So $28,000 additional.',
      'Lands at $43,000 for roughly 15 months. About $2,870 per month.',
      'Monthly founder call, monthly operator or CD call, ongoing cadence, Looms and trainings, plus one in person day to train the media team and shoot a pillar day.',
      'Two options only: finish the 90 days and stop, or roll into the year. The $15,000 3 month bridge stays in the back pocket.',
    ],
  },
];

const collected = [
  { stage: 'Strategy day', rev: '$5,000', cost: '$1,730', profit: '$3,270', margin: '65%', bold: false },
  { stage: '90 day install, additional after rollover', rev: '$10,000', cost: '$3,000', profit: '$7,000', margin: '70%', bold: false },
  { stage: '90 day path total', rev: '$15,000', cost: '$4,730', profit: '$10,270', margin: '68%', bold: true },
  { stage: '12 month advisory, additional', rev: '$28,000', cost: '$5,330', profit: '$22,670', margin: '81%', bold: false },
  { stage: 'Full 15 month path', rev: '$43,000', cost: '$10,060', profit: '$32,940', margin: '77%', bold: true },
];

const costLines = [
  {
    stage: 'Strategy day',
    total: '$1,730',
    lines: [
      '8 hours at $100 per hour = $1,000',
      'Hotel budget $130 per night',
      'Travel $400 for flights',
      'Food $100 per day',
      'Ubers $100 total',
    ],
  },
  {
    stage: '90 day install',
    total: '$3,000',
    lines: [
      'First 4 weeks = $1,600',
      '4 x 1 hour calls for 4 weeks = $400',
      '1 x advisory call = $100',
      'WhatsApp = $100',
      'Notion file creation, scripts = $500',
      'Brand build = $500',
      'Back 8 weeks = $1,400',
      '4 x 1 hour calls for 8 weeks = $400',
      '2 x advisory / direction calls = $200',
      '1 hour in Notion every week = $800',
    ],
  },
  {
    stage: '12 month advisory',
    total: '$5,330',
    lines: [
      '12 x 90 minute advisory calls = $1,800',
      'Personalised creative director calls once per month = $1,800',
      'Plus one full day in person = $1,730',
      '(8 hours at $100 = $1,000, hotel $130, travel $400, food $100, ubers $100)',
    ],
  },
];

const checklist = [
  {
    title: 'Authority Engine Blueprint',
    items: [
      'Bottleneck Scorecard (Clarity, Visibility, Authority, Quality)',
      'Customer Journey Map, cold to warm to buyer to advocate',
      'Brand Bible: voice, positioning, pillars, formats, CTAs',
      'Authority Engine Map: which channel does discovery, depth, conversion',
      '30 Day Posting Program with dates, formats, CTAs and owners',
    ],
  },
  {
    title: 'Short form Engine',
    items: [
      'Weekly Capture Block locked in the founder\'s calendar',
      'Capture SOP plus a prompt bank they actually use',
      'Operator Weekly Playbook (Mon capture, Tue to Thu cut and post, Fri review)',
      'Short form scorecard filled for 3+ consecutive weeks',
    ],
  },
  {
    title: 'Long form core',
    items: [
      '1 to 2 pillar topics chosen and packaged (titles, thumbnail angles)',
      'Pillar outlines written to the template, not scripted',
      '1 Trust Video or Trojan Horse VSL outlined, ideally filmed',
      'Lead magnet spec, built from assets they already have where possible',
    ],
  },
  {
    title: 'Cadence and review',
    items: [
      'Weekly cadence form filled most weeks by founder and operator',
      'Content to Cash scoreboard showing content, DMs, apps and opps',
      'Operator sending a Friday Loom: best clip, worst clip, what they will test',
    ],
  },
  {
    title: 'The operator',
    items: [
      'Knows their role and their KPIs without being reminded',
      'Runs the weekly rhythm without me chasing',
      'Dangerous by Day 90. Weaponised is the 12 month job, not this one.',
    ],
  },
];

const notLocked = [
  '$28,000 or $33,000 for the 12 month additional. $28k is credit plus founding discount. $33k is credit only.',
  'Install payment split. $10,000 on acceptance, or 3 x $5,000. One rule for everyone.',
  'Price ramp trigger. How many Days and Installs before $5k/$15k becomes $10k/$30k.',
  'Delivery cost of the 3 month bridge. No model exists.',
  'Concurrent client cap. How many active Installs before quality drops.',
  'When the $40,000 Concierge Install and Team Build comes off the bench.',
];

/* ---------------------------------------------------------------- */

function LadderPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-elevated border border-zinc-800 mb-6">
              <Lock className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500 text-xs uppercase tracking-widest">Internal</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              The Offer Ladder
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium">
              Rollover credit model. Current as at 9 August 2026.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The ladder */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The ladder</Label>
            <H2>Three rungs. One earned at a time.</H2>

            <div className="space-y-6">
              {rungs.map((r, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-700 tracking-tight flex-shrink-0 mb-4 md:mb-0">
                      {r.num}
                    </p>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-5">
                        <h3 className="text-white font-semibold text-lg">{r.title}</h3>
                        <span className="text-blue-400 font-medium text-sm">{r.price}</span>
                        <span className="text-zinc-600 text-xs uppercase tracking-widest">{r.tag}</span>
                      </div>
                      <ul className="space-y-2.5">
                        {r.notes.map((n, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                            <span className="text-zinc-400 text-sm leading-relaxed">{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed mt-6">
              Off ladder: Concierge Install and Team Build, $40,000, by selection only. Parked until the core Install has 20+ clean runs behind it.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Money */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <Label>The money</Label>
            <H2>What gets collected.</H2>

            <div className="glow-card overflow-x-auto mb-10">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest font-medium">Stage</th>
                    <th className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest font-medium">Revenue</th>
                    <th className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest font-medium">Cost</th>
                    <th className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest font-medium">Profit</th>
                    <th className="px-6 py-4 text-zinc-500 text-xs uppercase tracking-widest font-medium">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {collected.map((c, i) => (
                    <tr key={i} className={`border-b border-zinc-900 last:border-0 ${c.bold ? 'bg-white/[0.02]' : ''}`}>
                      <td className={`px-6 py-4 text-sm ${c.bold ? 'text-white font-semibold' : 'text-zinc-300 font-medium'}`}>{c.stage}</td>
                      <td className="px-6 py-4 text-white text-sm font-semibold whitespace-nowrap">{c.rev}</td>
                      <td className="px-6 py-4 text-zinc-400 text-sm whitespace-nowrap">{c.cost}</td>
                      <td className="px-6 py-4 text-blue-400 text-sm font-semibold whitespace-nowrap">{c.profit}</td>
                      <td className="px-6 py-4 text-zinc-500 text-sm whitespace-nowrap">{c.margin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Delivery cost, line for line</p>
            <div className="grid md:grid-cols-3 gap-6">
              {costLines.map((c, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-7"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-5">
                    <h3 className="text-white font-semibold text-base">{c.stage}</h3>
                    <span className="text-blue-400 font-semibold text-sm whitespace-nowrap">{c.total}</span>
                  </div>
                  <ul className="space-y-2">
                    {c.lines.map((l, j) => (
                      <li key={j} className="text-zinc-500 text-sm leading-relaxed">{l}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <p className="text-zinc-600 text-xs mt-6 leading-relaxed">
              3 month bridge at $15,000 has never been costed.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 90 day checklist */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <Label>The delivery contract</Label>
            <H2>90 day outcome checklist.</H2>
            <p className="text-zinc-400 text-base leading-relaxed mb-12 max-w-2xl">
              This never changes per client. Every Friday, look at each client and ask which one is missing. Fix that, not everything.
            </p>

            <div className="space-y-6">
              {checklist.map((c, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <h3 className="text-white font-semibold text-lg">{c.title}</h3>
                  </div>
                  <ul className="space-y-3 md:pl-9">
                    {c.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-4 h-4 rounded border border-zinc-700 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Not locked */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Not locked</Label>
            <H2>Decide before the next Day is sold.</H2>

            <div className="glow-card p-8">
              <ul className="space-y-4">
                {notLocked.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function OfferLadder() {
  return (
    <PasswordGate password="Ladder2026" storageKey="ladder-unlocked">
      <LadderPage />
    </PasswordGate>
  );
}
