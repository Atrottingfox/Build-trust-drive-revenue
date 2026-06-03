import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Zap, Shield, BookOpen, Users, Layers, TrendingUp, Eye, Check, X, Crown, Building, Globe, Database, Network, GraduationCap, Compass } from 'lucide-react';
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
    description: "The market does not know who you are for. Positioning is muddy. The right people walk past.",
  },
  {
    icon: Zap,
    title: 'Visibility',
    description: 'Not getting distribution. The expertise is real. The reach is not.',
  },
  {
    icon: Shield,
    title: 'Authority',
    description: "They do not see you as the expert. What others perceive does not match what you actually know.",
  },
  {
    icon: Layers,
    title: 'Quality',
    description: "Lead quality is low. People who land are not the people you want to work with.",
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
    title: '90 Day Install',
    price: '+$10k',
    rolled: '$15k all in',
    description: 'Offered at the close of Brand Day. The full install. 3 cycles of 4 weeks each. Brand, content, scale. Brand Day rolls over. Operator trained. Engine running by Day 90.',
  },
  {
    num: '03',
    title: '6 Month Bundle',
    price: '+$13k',
    rolled: '$28k all in',
    description: 'Offered at Day 30. Roll the rest of the 90 days and 6 months of advisory into one decision. $28k flat for 9 months together. Commit at Day 30 and get a bonus in person day with Sean.',
  },
  {
    num: '04',
    title: 'Advisory',
    price: '$30k PIF / 12 months',
    rolled: 'or $3k / month thereafter',
    description: 'Continues after the bundle. Annual paid in full is $30k for 12 months. Month to month is $3k after the bundle. Monthly Founder Strategy Pod. Monthly 1:1 with the Operator or CD. Weekly Operator Clinic. Up to 1 Loom per week.',
  },
];

const revenueMetrics = [
  { stat: '$5k', label: 'Brand Day', sub: 'Entry point' },
  { stat: '$15k', label: 'Install', sub: 'Brand Day + 90 day build' },
  { stat: '$28k', label: 'Year 1 per client', sub: '6 month bundle all in' },
  { stat: '60-80%', label: 'Brand Day to Install', sub: 'When the day is strong and pre framed' },
  { stat: '40-50%', label: 'Install to Bundle', sub: 'Offered at Day 30 to strong fits' },
  { stat: '$1k', label: 'CAC', sub: 'Warm outreach + content' },
];

const sixMonthPlan = [
  { month: 'Month 1', brandDays: 4,  installs: 3, bundles: 0, revenue: '$35k' },
  { month: 'Month 2', brandDays: 6,  installs: 5, bundles: 2, revenue: '$111k' },
  { month: 'Month 3', brandDays: 8,  installs: 6, bundles: 2, revenue: '$126k' },
  { month: 'Month 4', brandDays: 10, installs: 8, bundles: 3, revenue: '$169k' },
  { month: 'Month 5', brandDays: 10, installs: 8, bundles: 3, revenue: '$169k' },
  { month: 'Month 6', brandDays: 11, installs: 9, bundles: 5, revenue: '$210k' },
  { month: 'Month 7', brandDays: 11, installs: 9, bundles: 5, revenue: '$210k' },
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

const stages = [
  {
    stage: 'STAGE 0',
    year: 'Year 1',
    title: 'Advisory',
    revenue: '$0 to $1M',
    description: 'Sean delivers everything. Brand Day, 90 day install, advisory. Every client generates IP, case studies, and proof.',
    model: '60 Brand Days, 48 Installs, 20 six month bundles ≈ $1.04M. Conversion targets: Brand Day to Install 60-80%, Install to Bundle 40-50%.',
    mission: 'The system gets documented and battle tested. Earn the right to say this works.',
    metric: 'Install conversion rate (target 60-80%). Secondary: Install to Bundle attach (target 40-50%).',
  },
  {
    stage: 'STAGE 1',
    year: 'Year 2',
    title: 'Licensed Operators',
    revenue: '$1M to $3M',
    description: 'Licensed operators run the full pipeline on their own client base. Same delivery, just no longer through Sean. Annual license. Revenue share back.',
    model: 'Each operator targets ~$300k/year. 5 to 8 operators plus Sean\'s direct installs = $1M to $3M.',
    mission: 'The first Founding Operators get licensed. Status comes from being early and close to the source.',
    metric: "Operator retention rate. Target 70%+ of Sean's rate.",
  },
  {
    stage: 'STAGE 2',
    year: 'Year 3',
    title: 'Bolt on Talent',
    revenue: '$3M to $10M',
    description: 'Trained operators alongside the advisory. Clients get the system AND the person to run it.',
    model: 'Install $10k. Operator placement $3k to $5k/mo. Advisory $3k/mo. Junior operators at $80k manage 3 to 4 clients each.',
    mission: 'Founders buy the system plus the operator. The ladder from good editor to trusted creative director becomes a real path.',
    metric: 'Operator utilisation. Target 3 to 4 clients per operator.',
  },
  {
    stage: 'STAGE 3',
    year: 'Year 4',
    title: 'Academy',
    revenue: '$10M to $20M',
    description: 'Training becomes a product. The Authority Engine Academy certifies operators and content strategists.',
    model: 'Certification $5k to $10k per person. Annual Engineroom license $2k to $5k.',
    mission: 'The Content Director School opens. Training free or low cost. Badge, platform, and placement are the product.',
    metric: 'Graduates deliver independently within 90 days of certification.',
  },
  {
    stage: 'STAGE 4',
    year: 'Year 5',
    title: 'Affiliate Distribution',
    revenue: '$20M to $50M',
    description: 'Partners resell the system through their own channels. Distribution through other people\'s networks.',
    model: '200 partners at 5 clients each at $300/seat = $300k MRR platform revenue. Plus partner fees.',
    mission: 'Partners distribute through their networks. Impact compounds when we are not in the room.',
    metric: 'Partner activation rate. Partners actively billing through The Engineroom.',
  },
  {
    stage: 'STAGE 5',
    year: 'Year 6+',
    title: 'Agency',
    revenue: '$50M+',
    description: 'Full service for the biggest clients. Teams of operators, editors, strategists. Premium pricing.',
    model: 'Full service teams at $15k to $25k/month per client. High revenue, lower margin.',
    mission: 'For the biggest brands we become the media team in a box. Data and training from every previous stage power work no one else can match.',
    metric: 'Revenue per employee. Must stay above $200k.',
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

      {/* Why this exists */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why this exists</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Build the engine for the top 1%.
              <br />
              <span className="text-zinc-500">Use it to lift the next wave.</span>
            </h2>

            <div className="glow-card p-8 md:p-10">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                <span className="text-white font-semibold">Mission:</span> Build the media operating system for 7 & 8 figure founders, and a growth ladder for the media operators who run it.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 1: The Problem */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The offer ladder</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Four steps.
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
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Unit economics</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Why this model compounds.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { stat: '85-90%', label: 'Gross Margin', description: "Costs are Sean's time, flights, and tools. No inventory. No office. No team at stage 0." },
                { stat: '$28k', label: 'Year 1 LTV', description: '$5k Brand Day entry. 60-80% Install conversion. 40-50% take the 6 month bundle. Plus advisory upside in year 2.' },
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

      {/* 6 Month Plan */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The first $1M</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Six months. One million.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">The Stage 0 ramp, month by month.</p>

            <div className="glow-card overflow-hidden mb-8">
              <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                <div>Month</div>
                <div className="text-right">Brand Days $5k</div>
                <div className="text-right">Installs +$10k</div>
                <div className="text-right">6 Month Bundles +$13k</div>
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
                    <span className="md:hidden text-zinc-600 mr-2">Bundles:</span>{row.bundles}
                  </div>
                  <div className="text-blue-400 font-semibold md:text-right col-span-2 md:col-span-1">{row.revenue}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Totals</p>
                <p className="text-zinc-400 text-sm leading-relaxed">60 Brand Days. 48 Installs. 20 six month bundles.</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Six month total</p>
                <p className="font-display text-3xl font-extrabold text-white tracking-tight">$1.04M</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Section 5: The System */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Scale roadmap</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Six stages.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Each stage proves the next one is possible.</p>
            <div className="space-y-6">
              {stages.map((s, i) => (
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
                  <div className="mb-5">
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Mission</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{s.mission}</p>
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
      <section className="py-16 md:py-24">
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
                  description: "Every client generates brand profiles, content performance data, archetype patterns, industry benchmarks. At 50 clients it's proprietary intelligence. At 500 it's unassailable.",
                },
                {
                  icon: TrendingUp,
                  title: 'Talent multiplier',
                  description: 'A $80k operator delivers $180k in billable value because the software does the thinking. The gap between cost and value IS the platform.',
                },
                {
                  icon: Network,
                  title: 'Network effect',
                  description: 'Licensed operators spread the system because it defines their career and income. The tool spreads through the talent layer, not through marketing.',
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
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight mb-6">
                The only number that matters at each stage.
              </h3>
              <div className="space-y-4">
                {[
                  { stage: 'Stage 0', metric: 'Install conversion (target 60-80%). Secondary: Bundle attach (target 40-50%).' },
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

      {/* North Star */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">North star · 2 year headline</p>
            <div className="glow-card border-blue-500/20 p-8 md:p-12 mb-12">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.2]">
                "Strategist behind 100+ of the top online experts gives away $10M+ of IP to create a world first Content Director model."
              </p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl mb-8">
              Every decision in this deck is aimed at making that sentence true in two years.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="glow-card p-6">
                <Users className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">100+ top experts</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Using The Authority Engine.</p>
              </div>
              <div className="glow-card p-6">
                <BookOpen className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">$10M+ of IP given away</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Playbooks and training open for the next wave.</p>
              </div>
              <div className="glow-card p-6">
                <Compass className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">A real career path</p>
                <p className="text-zinc-500 text-sm leading-relaxed">A Certified Authority Engine Operator badge as the status play for videographers and content directors.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Endgame */}
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
