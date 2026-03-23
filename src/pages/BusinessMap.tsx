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
    title: 'Brand Dilution',
    description: 'The market sees the old version of you.',
  },
  {
    icon: Zap,
    title: 'Reactive Output',
    description: 'Content depends on the founder showing up inspired.',
  },
  {
    icon: Layers,
    title: 'Operational Drag',
    description: "Resources exist but there's no system connecting them.",
  },
];

const offers = [
  {
    num: '01',
    title: 'Brand Builder Day',
    price: '$5,000',
    description: 'The front door. Half day intensive. Sean flies out. Archetype assessment, Brand Bible extraction, content angles, 30 day plan, lead magnet built live. Everything documented and filmed. 30 days of free advisory on the backend to test implementation.',
  },
  {
    num: '02',
    title: '90 Day Content System',
    price: '$10,000',
    description: 'The core product. Two payments of $5,000. Card on file. Phase 1: Brand and Strategy (days 0 to 30). Phase 2: Execution OS (days 31 to 60). Phase 3: Scale and KPIs (days 61 to 90). ~10 hours of Sean\'s time per client. Day 30 exit gate if not implementing.',
  },
  {
    num: '03',
    title: 'Advisory + Content.OS',
    price: '$3,000/month',
    description: 'Invite only. For 90 day graduates who implemented. Ongoing Content.OS access, group pattern recognition calls, edge case support. Never pitched. Always earned.',
  },
  {
    num: '04',
    title: 'Operator Launch',
    price: '$10,000 (Future)',
    description: 'For clients who need a media operator installed. 90 days: recruit, train, handoff. The client gets a trained operator who owns execution. Sean is out of the day to day.',
  },
];

const revenueMetrics = [
  { stat: '$10k', label: '90 Day Install' },
  { stat: '$46k', label: 'Year 1 Per Client', sub: '$10k + $36k retainer' },
  { stat: '$24k', label: 'Stage 1 MRR', sub: '8 retainers @ $3k' },
  { stat: '$45k', label: 'Stage 2 MRR', sub: '15 clients, Sean + 1 advisor' },
  { stat: '$5k', label: 'Max CAC', sub: 'Payback in 90 days' },
  { stat: '5-6', label: 'Hire Trigger', sub: 'Retainer clients' },
];

const pillars = [
  {
    icon: Target,
    title: 'Ignition Core (Strategy)',
    description: 'Realign perception with truth. Belief Map, Proof Architecture, Authority Narrative.',
  },
  {
    icon: Zap,
    title: 'Transmission Layer (Communication)',
    description: 'Engineer consistent trust transfer. Channel OS, Format Library, Distribution OS.',
  },
  {
    icon: TrendingUp,
    title: 'Compounding Flywheel (Scale)',
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
    title: 'Brand Builder Day',
    description: '1:1, fly out, $5k, premium.',
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
  { role: 'Content.OS', description: 'Stores everything. Tracks. Nudges. Generates.' },
];

const seanDoesNot = [
  'Write scripts',
  'Edit video',
  'Design thumbnails',
  'Log into accounts',
  'Manage editors',
  'Review every piece',
  'Do 1:1 calls',
  'Custom anything',
];

const phases = [
  {
    num: '01',
    title: 'Phase 1 (Now)',
    description: 'Sean delivers. 5 clients max. Brand Days fund development.',
  },
  {
    num: '02',
    title: 'Phase 2 (8 retainers)',
    description: 'System proven. $24k MRR. Group calls serve multiple clients.',
  },
  {
    num: '03',
    title: 'Phase 3 (First advisor)',
    description: 'Advisor Playbook documented. Sean holds 5, advisor holds 10. $45k MRR.',
  },
  {
    num: '04',
    title: 'Phase 4 (Scale)',
    description: 'Group consulting, quarterly intensives, community layer, multiple advisors. Sean as architect only.',
  },
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
                Complete Business Architecture
              </p>
              <p className="text-zinc-600 text-sm">
                Who Sean is. What gets built. How it scales.
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
              Three constraints kill
              <br />
              <span className="text-zinc-500">expert led businesses.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
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
              Four stages.
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
              Unit economics.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Why this model compounds.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { stat: '$1,000+', label: 'Revenue Per Client Hour', description: "10 hours of Sean's time per client over 90 days. $10k program fee. Elite hourly economics." },
                { stat: '85-90%', label: 'Gross Margin', description: "Costs are Sean's time, flights, and tools. No inventory. No office. No team at stage 1." },
                { stat: '$28k', label: 'LTV (6 month retention)', description: '$10k install plus 6 months at $3k retainer. At 12 months: $46k.' },
                { stat: '28:1', label: 'LTV to CAC', description: 'At $1k CAC from warm outreach and content. Anything above 3:1 is considered excellent.' },
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

      {/* Section 5: The System */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What gets installed</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The Magic Model.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Three pillars.</p>
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
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The 5 A's</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              The weekly content cycle.
            </h2>
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
              All three paths lead to the same destination. Qualification for the 90 day program.
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
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
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

      {/* Section 9: The Vision */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The vision</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              How it scales.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-700 tracking-tight mb-4">{phase.num}</p>
                  <h3 className="text-white font-semibold text-lg mb-2">{phase.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{phase.description}</p>
                </motion.div>
              ))}
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
              How it scales. Six stages.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Each stage proves the next one is possible.</p>
            <div className="space-y-6">
              {[
                {
                  stage: 'STAGE 0 TO 1',
                  title: 'Advisory',
                  revenue: '$0 to $1M',
                  description: 'Sean delivers everything. 5 seat cap. Brand Days fund development. Every client generates IP, case studies, and proof. The system gets documented and battle tested.',
                  model: '20 installs per year at $10k = $200k. 50% convert to retainer. Retainer compounds to 12 to 15 clients by end of year 2. Total year 2: $560k to $650k.',
                  metric: 'Retainer conversion rate. Target: 50%+. Below 30%, the model doesn\'t compound.',
                },
                {
                  stage: 'STAGE 1 TO 3',
                  title: 'Bolt on Recruitment',
                  revenue: '$1M to $3M',
                  description: 'Sean stops delivering. Advisors deliver. Revenue share model: advisor gets 40%, Sean keeps 60%. Each advisor manages 10 retainer clients. 3 advisors = $54k MRR from retainer alone.',
                  model: 'Advisor on revenue share. 10 clients at $3k = $30k MRR per advisor. Sean keeps $18k. 3 advisors plus Sean\'s installs = $1M to $1.2M.',
                  metric: 'Advisor client retention rate. If advisors can\'t retain at 70%+ of Sean\'s rate, the playbook isn\'t good enough.',
                },
                {
                  stage: 'STAGE 3 TO 10',
                  title: 'Bolt on Talent',
                  revenue: '$3M to $10M',
                  description: 'The real moat. Sean provides trained operators alongside the advisory. Clients get the system AND the person to run it. Nobody else has software plus methodology plus talent supply.',
                  model: 'Program install: $10k. Operator placement: $3k to $5k/month. Advisory: $3k/month. Total per client: $6k to $8k/month. Junior operators at $55k manage 3 to 4 clients each. Gross margin per operator: 60 to 70%.',
                  metric: 'Operator utilisation rate. Clients per operator. Target: 3 to 4.',
                },
                {
                  stage: 'STAGE 10 TO 20',
                  title: 'Academy',
                  revenue: '$10M to $20M',
                  description: 'Training becomes a product. The Authority Engine Academy certifies operators and content strategists. Graduates join the advisor pool or go independent with a Content.OS license.',
                  model: 'Certification: $5k to $10k per person. Annual Content.OS license: $2k to $5k. Two revenue streams: training fees and platform fees.',
                  metric: 'Partner activation rate. Graduates must deliver independently within 90 days of certification.',
                },
                {
                  stage: 'STAGE 20 TO 50',
                  title: 'Affiliate Distribution',
                  revenue: '$20M to $50M',
                  description: 'Partners resell the Authority Engine system through their own channels. Agencies, coaches, consultants white label Content.OS with their clients. Distribution happens through other people\'s networks.',
                  model: '200 partners at 5 clients each at $300/seat = $300k MRR platform revenue. Plus partner fees. Plus direct clients and talent.',
                  metric: 'Partner activation rate. Number of partners actively billing clients through Content.OS.',
                },
                {
                  stage: 'STAGE 50+',
                  title: 'Agency',
                  revenue: '$50M+',
                  description: 'Full service for the biggest clients. Teams of advisors, operators, editors, strategists. Premium pricing. The software and data from every previous stage is the unfair advantage no competitor can replicate.',
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
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">{s.stage}</p>
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
            <p className="text-zinc-500 text-lg mb-12">Content.OS isn't a delivery tool. It's a data platform.</p>
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
                  description: 'A $55k operator delivers $180k in billable value because the software does the thinking. The gap between cost and value IS the platform.',
                },
                {
                  icon: Network,
                  title: 'Network effect',
                  description: 'Operators trained on Content.OS bring it to their next client. Partners distribute it through their networks. The tool spreads through the talent layer, not through marketing.',
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
                  { stage: '0 to 1', metric: 'Retainer conversion rate (target 50%+)' },
                  { stage: '1 to 3', metric: "Advisor client retention (target 70%+ of Sean's rate)" },
                  { stage: '3 to 10', metric: 'Operator utilisation (target 3 to 4 clients per operator)' },
                  { stage: '10 to 20', metric: 'Certification graduation rate' },
                  { stage: '20 to 50', metric: 'Partner activation rate' },
                  { stage: '50+', metric: 'Revenue per employee' },
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
              Revenue is the driver of all change."
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
