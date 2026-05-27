import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Zap, Shield, BookOpen, Users, Layers, TrendingUp, Eye, Heart, Pen, Award, DoorOpen, Check, X, Rocket, Crown, Building, Globe, Database, Network, GraduationCap, Share2, Briefcase } from 'lucide-react';
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

const problems = [
  {
    icon: Eye,
    title: 'Clarity',
    description: "The market sees the old version of you. Your brand doesn't match your capability.",
  },
  {
    icon: Zap,
    title: 'Visibility',
    description: 'Content depends on the founder showing up inspired. No system. No cadence.',
  },
  {
    icon: Shield,
    title: 'Authority',
    description: "You have the expertise but it's not translating. What others see doesn't match what you know.",
  },
  {
    icon: Layers,
    title: 'Quality',
    description: "Resources exist but there's no system connecting them. Output is inconsistent.",
  },
];

const offers = [
  {
    num: '01',
    title: 'Brand Day',
    price: '$5k',
    rolled: 'Entry',
    description: 'The intensive. Brand, positioning, narrative, pillar content captured on site. Everything documented inside The Engineroom. The foundation the rest of the engine runs on.',
  },
  {
    num: '02',
    title: '90 Day Implementation',
    price: '+$10k',
    rolled: '$15k all in',
    description: 'Offered at the close of Brand Day. The full install. 3 cycles of 4 weeks each. Brand, content, scale. Brand Day rolls over. Operator trained. Engine running by Day 90.',
  },
  {
    num: '03',
    title: '12 Month Advisory',
    price: '+$21k',
    rolled: '$36k all in',
    description: 'Offered at Day 30 as PIF only. The full 90 days rolls over. Annual pattern recognition, edge case support, and Engineroom access. Plus an in person day where Sean shoots their core pillar video on site.',
  },
];

const revenueMetrics = [
  { stat: '$5k', label: 'Brand Day', sub: 'Entry point' },
  { stat: '$15k', label: 'Install', sub: 'Brand Day + 90 day build' },
  { stat: '$36k', label: 'Year 1 Per Client', sub: 'Brand Day + Install + Advisory PIF' },
  { stat: '60-80%', label: 'Brand Day to Install', sub: 'When the day is strong and pre framed' },
  { stat: '20-30%', label: 'Install to Advisory', sub: 'Offered at Day 30 PIF' },
  { stat: '$1k', label: 'CAC', sub: 'Warm outreach + content' },
];

const sixMonthPlan = [
  { month: 'June', brandDays: 4, installs: 3, advisory: 0, revenue: '$35k' },
  { month: 'July', brandDays: 6, installs: 5, advisory: 1, revenue: '$101k' },
  { month: 'August', brandDays: 8, installs: 6, advisory: 1, revenue: '$131k' },
  { month: 'September', brandDays: 10, installs: 8, advisory: 2, revenue: '$192k' },
  { month: 'October', brandDays: 10, installs: 8, advisory: 2, revenue: '$192k' },
  { month: 'November', brandDays: 11, installs: 9, advisory: 3, revenue: '$228k' },
  { month: 'December', brandDays: 11, installs: 9, advisory: 3, revenue: '$228k' },
];

const pillars = [
  {
    icon: Target,
    title: 'Brand',
    description: 'Realign perception with truth. Belief Map, Proof Architecture, Authority Narrative.',
  },
  {
    icon: Zap,
    title: 'Content',
    description: 'Engineer consistent trust transfer. Channel OS, Format Library, Distribution OS.',
  },
  {
    icon: TrendingUp,
    title: 'Scale',
    description: 'Build operator led engine. Operator Install, Authority Dashboard, Quarterly Campaigns.',
  },
];

const fiveAs = [
  { week: 'Week 1', name: 'Attention', description: 'Discovery content. Hooks. Pattern interrupts.' },
  { week: 'Week 2', name: 'Alignment', description: 'Belief shifting. Values. Philosophy.' },
  { week: 'Week 3', name: 'Authorship', description: 'Proof. Breakdowns. Demonstrations.' },
  { week: 'Week 4', name: 'Achievability', description: 'How to. Implementation. Quick wins.' },
  { week: 'End of month', name: 'Access', description: 'Peak demand. Workshop, doors open, direct offer.' },
];

const acquisitionPaths = [
  {
    icon: Users,
    title: 'Brand Day',
    description: '1:1, intensive, $5k. The entry to the engine.',
  },
  {
    icon: Building,
    title: 'In Person Workshops',
    description: '10 people, implementation, qualification.',
  },
  {
    icon: Globe,
    title: 'Live Workshops',
    description: 'Online, broadest reach, diagnostic.',
  },
];

const roles = [
  { role: 'Sean', description: 'Strategy. Pattern recognition. Milestones only.' },
  { role: 'Founder', description: 'Shows up. Films. Brain dumps. Approves.' },
  { role: 'Operator', description: 'All implementation. Scripts, thumbnails, uploads, publishing.' },
  { role: 'The Engineroom', description: 'Stores everything. Tracks. Nudges. Generates.' },
];

const seanDoesNot = [
  'Write finished scripts',
  'Edit video',
  'Design thumbnails',
  'Log into accounts',
  'Manage editors or VAs',
  'Review every single piece',
];


export default function BusinessMap() {
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
                The Authority Engine
              </h1>
              <p className="text-zinc-500 text-xl md:text-2xl font-medium mb-4">
                Internal Business Architecture
              </p>
              <p className="text-zinc-600 text-sm">
                The system. The model. The roadmap.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 1: The Problem */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The problem</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Four constraints kill
              <br />
              <span className="text-zinc-500">expert led businesses.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 2: Who It's For */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Who it's for</p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                  Built for founders
                  <br />
                  <span className="text-zinc-500">who already have it.</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    '7 and 8 figure founders, coaches, consultants',
                    'Already have deep expertise and a real reputation',
                    'Content feels heavy, inconsistent, or disconnected',
                    'Need a system. Not more advice.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Not a fit</p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                  Not a fit if you're
                  <br />
                  <span className="text-zinc-500">starting from zero.</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    'No online presence or expertise yet',
                    'Looking for someone to do it all for you',
                    'Not willing to film and show up',
                    'Under $500k revenue',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 3: The Offer Ladder */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The offer ladder</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Three steps.
              <br />
              <span className="text-zinc-500">One system.</span>
            </h2>
            <div className="space-y-6">
              {offers.map((offer, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-700 tracking-tight">{offer.num}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
                        <h3 className="text-white font-semibold text-lg">{offer.title}</h3>
                        <span className="text-blue-400 font-medium text-sm">{offer.price}</span>
                        <span className="text-zinc-600 text-xs uppercase tracking-widest">{offer.rolled}</span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed">{offer.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 4: Revenue Model */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Revenue model</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              The math.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {revenueMetrics.map((m, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 text-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {m.stat}
                  </p>
                  <p className="text-zinc-300 font-medium mb-1">{m.label}</p>
                  {m.sub && <p className="text-zinc-600 text-xs">{m.sub}</p>}
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Unit Economics */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Unit economics</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Why this model compounds.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { stat: '85-90%', label: 'Gross Margin', description: "Costs are Sean's time, flights, and tools. No inventory. No office. No team at stage 0." },
                { stat: '$36k', label: 'Year 1 LTV', description: '$5k Brand Day entry. Installs at 60-80%. Advisory at 20-30%. One client, one year, $36k all in.' },
                { stat: '36:1', label: 'LTV to CAC', description: 'At $1k CAC from warm outreach and content. Anything above 3:1 is considered excellent.' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 text-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {m.stat}
                  </p>
                  <p className="text-zinc-300 font-medium mb-2">{m.label}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 6 Month Plan */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The first $1M</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Six months. One million.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">H2 2026. The Stage 0 ramp, month by month.</p>

            <div className="glow-card overflow-hidden mb-8">
              <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                <div>Month</div>
                <div className="text-right">Brand Days $5k</div>
                <div className="text-right">Installs +$10k</div>
                <div className="text-right">Advisory +$21k</div>
                <div className="text-right">Revenue</div>
              </div>
              {sixMonthPlan.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-5 border-b border-zinc-900 last:border-b-0 text-sm"
                >
                  <div className="text-white font-medium md:col-span-1 col-span-2">{row.month}</div>
                  <div className="text-zinc-400 md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Brand Days:</span>{row.brandDays}
                  </div>
                  <div className="text-zinc-400 md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Installs:</span>{row.installs}
                  </div>
                  <div className="text-zinc-400 md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Advisory:</span>{row.advisory}
                  </div>
                  <div className="text-blue-400 font-semibold md:text-right col-span-2 md:col-span-1">{row.revenue}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Totals</p>
                <p className="text-zinc-400 text-sm leading-relaxed">60 Brand Days. 48 Installs. 12 Advisory upgrades.</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Six month total</p>
                <p className="font-display text-3xl font-extrabold text-white tracking-tight">$1.03M</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 5: The System */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What gets installed</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The Authority Engine.
            </h2>
            <p className="text-zinc-500 text-lg mb-4">Brand. Content. Scale.</p>
            <p className="text-zinc-600 text-sm mb-12">The Authority Engine is the system. The Engineroom is the software that stores, nudges, and measures it.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 6: The 5 A's Rhythm */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The belief map</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The 5 A's.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">The content rhythm underneath the system.</p>
            <div className="space-y-4">
              {fiveAs.map((a, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6 md:p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-zinc-600 text-sm font-medium w-28 flex-shrink-0">{a.week}</span>
                    <span className="text-white font-semibold w-32 flex-shrink-0">{a.name}</span>
                    <span className="text-zinc-500 text-sm leading-relaxed">{a.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 7: Acquisition */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Acquisition</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Three paths in.
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {acquisitionPaths.map((path, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <path.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{path.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{path.description}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm text-center">
              Workshops and events qualify. Brand Day is direct entry.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 8: Roles */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Roles</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Who does what.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {roles.map((r, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="text-white font-semibold text-lg mb-3">{r.role}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{r.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="glow-card p-8">
              <h3 className="text-zinc-400 font-semibold text-sm uppercase tracking-widest mb-6">Sean does NOT</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {seanDoesNot.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <X className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Scale Roadmap */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Scale roadmap</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Six stages.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Each stage proves the next one is possible.</p>
            <div className="space-y-6">
              {[
                {
                  stage: 'STAGE 0',
                  year: 'Year 1 · H2 2026',
                  title: 'Advisory',
                  revenue: '$0 to $1M',
                  description: 'Sean delivers everything. Brand Day, 90 day install, advisory. Every client generates IP, case studies, and proof. The system gets documented and battle tested.',
                  model: '60 Brand Days, 48 Installs, 12 Advisory PIFs in H2 2026 = $1.03M. Conversion targets: Brand Day to Install 60-80%, Install to Advisory 20-30%.',
                  metric: 'Install conversion rate. Target: 60-80%. Below that, the day isn\'t strong enough or the pre frame is off.',
                },
                {
                  stage: 'STAGE 1',
                  year: 'Year 2 · 2027',
                  title: 'Licensed Operators',
                  revenue: '$1M to $3M',
                  description: 'Sean slows direct delivery. Licensed operators run the full Brand Day, Install, Advisory pipeline on their own client base. Same delivery, just no longer through Sean. Operators pay annual license. Revenue share back to the company. Sean trains. Sean reviews patterns. Sean owns the IP.',
                  model: 'Each operator targets ~$300k/year running the engine on their roster. Annual license plus revenue share to company. 5 to 8 operators plus Sean\'s direct installs = $1M to $3M. Delivery doesn\'t change. The model just gets copied.',
                  metric: 'Operator retention rate. If licensed operators can\'t retain clients at 70%+ of Sean\'s rate, the playbook isn\'t tight enough.',
                },
                {
                  stage: 'STAGE 2',
                  year: 'Year 3 · 2028',
                  title: 'Bolt on Talent',
                  revenue: '$3M to $10M',
                  description: 'The real moat. Sean provides trained operators alongside the advisory. Clients get the system AND the person to run it. Software plus methodology plus talent supply.',
                  model: 'Install: $10k. Operator placement: $3k to $5k/month. Advisory: $3k/month. Total per client: $6k to $8k/month. Junior operators at $80k manage 3 to 4 clients each. Gross margin per operator: 60 to 70%. Top operators earn into a profit share pool that vests over time, tied to retention and performance.',
                  metric: 'Operator utilisation rate. Clients per operator. Target: 3 to 4.',
                },
                {
                  stage: 'STAGE 3',
                  year: 'Year 4 · 2029',
                  title: 'Academy',
                  revenue: '$10M to $20M',
                  description: 'Training becomes a product. The Authority Engine Academy certifies operators and content strategists. Graduates join the licensed operator pool or go independent with an Engineroom license.',
                  model: 'Certification: $5k to $10k per person. Annual Engineroom license: $2k to $5k. Two revenue streams: training fees and platform fees.',
                  metric: 'Partner activation rate. Graduates must deliver independently within 90 days of certification.',
                },
                {
                  stage: 'STAGE 4',
                  year: 'Year 5 · 2030',
                  title: 'Affiliate Distribution',
                  revenue: '$20M to $50M',
                  description: 'Partners resell the Authority Engine system through their own channels. Agencies, coaches, consultants white label The Engineroom with their clients. Distribution happens through other people\'s networks.',
                  model: '200 partners at 5 clients each at $300/seat = $300k MRR platform revenue. Plus partner fees. Plus direct clients and talent.',
                  metric: 'Partner activation rate. Number of partners actively billing clients through The Engineroom.',
                },
                {
                  stage: 'STAGE 5',
                  year: 'Year 6+ · 2031+',
                  title: 'Agency',
                  revenue: '$50M+',
                  description: 'Full service for the biggest clients. Teams of operators, editors, strategists. Premium pricing. The software and data from every previous stage is the unfair advantage no competitor can replicate.',
                  model: 'Full service teams at $15k to $25k/month per client. High revenue, lower margin, operationally heavy.',
                  metric: 'Revenue per employee. Must stay above $200k to justify the complexity.',
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 md:p-10"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest">{s.stage}</p>
                    <p className="text-zinc-600 text-xs font-medium uppercase tracking-widest">{s.year}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-4">
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">{s.title}</h3>
                    <span className="text-zinc-500 text-sm font-medium">{s.revenue}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{s.description}</p>
                  <div className="mb-5">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">The Model</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{s.model}</p>
                  </div>
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Key Metric</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{s.metric}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The Software Moat */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The moat</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The moat is the software.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">The Engineroom becomes a data platform.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  title: 'Data compounds',
                  description: 'Every client generates brand profiles, content performance data, archetype patterns, industry benchmarks. At 50 clients that becomes proprietary intelligence. At 500 it\'s unassailable.',
                },
                {
                  icon: TrendingUp,
                  title: 'Talent multiplier',
                  description: 'A $80k operator delivers $180k in billable value because the software does the thinking. The gap between cost and value IS the platform.',
                },
                {
                  icon: Network,
                  title: 'Network effect',
                  description: 'Operators trained on The Engineroom bring it to their next client. Partners distribute it through their networks. The tool spreads through the talent layer, not through marketing.',
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <m.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{m.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* One Metric Per Stage */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight mb-6">
                The only number that matters at each stage.
              </h3>
              <div className="space-y-4">
                {[
                  { stage: 'Stage 0', metric: 'Install conversion rate (target 60-80%)' },
                  { stage: 'Stage 1', metric: "Licensed operator retention (target 70%+ of Sean's rate)" },
                  { stage: 'Stage 2', metric: 'Operator utilisation (target 3 to 4 clients per operator)' },
                  { stage: 'Stage 3', metric: 'Certification graduation rate' },
                  { stage: 'Stage 4', metric: 'Partner activation rate' },
                  { stage: 'Stage 5', metric: 'Revenue per employee' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-blue-400 text-sm font-semibold flex-shrink-0 w-16">{item.stage}</span>
                    <span className="text-zinc-400 text-sm leading-relaxed">{item.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 10: The Endgame */}
      <section className="py-32 md:py-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.2]">
              "Business is a vehicle for impact.
              <br />
              Revenue is the fuel.
              <br />
              And content is the engine."
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
