import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Target, Zap, Shield, BookOpen, Users, Layers, TrendingUp, Eye, Check, X, Crown, Building, Globe, Database, Network, Compass, ArrowRight } from 'lucide-react';
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
    title: 'Strategy Day',
    price: '$5,000 → $10,000',
    rolled: 'Steps up after 20 installs',
    description: '1:1, in person intensive. Brand, positioning, narrative, customer journey, and Authority Engine blueprint documented inside The Engineroom. This is Phase 1 of the install, not a random workshop. The day credits in full toward the 90 Day Install. It holds at $5,000 for the first 20 installs, then goes to $10,000 once the method is proven.',
  },
  {
    num: '02',
    title: '90 Day Install',
    price: '$15,000 → $30,000',
    rolled: 'The day rolls in at both tiers',
    description: 'Offered at the close of the Strategy Day, by invitation. The day credits in full, so the first 20 installs are $15,000 with the $5k day rolling in, $10,000 more to start. After 20 installs it is $30,000 with the $10k day rolling in, $20,000 more to start. Includes personalised 1:1s and Content Boards through the first 90 days. Over 90 days we build, install, and tune the Engine with the team so it is running by Day 90.',
  },
  {
    num: '03',
    title: '12 Month Advisory',
    price: '$24,000 additional',
    rolled: 'Day 30 PIF or Day 90 PIF',
    description: 'Two entry points. Day 30 PIF is 24k additional and includes one in person team training day. Day 90 PIF is 24k additional with no in person day. Either way it buys Sean and the OS on the business for the next 12 months. Monthly founder strategy, monthly operator or CD call, weekly operator clinic, async Loom and WhatsApp.',
  },
];

const revenueMetrics = [
  { stat: '$5k → $10k', label: 'Strategy Day', sub: 'Steps up after 20 installs' },
  { stat: '$15k → $30k', label: '90 Day Install', sub: 'By invitation. The day credits in' },
  { stat: '$24k', label: '12 Month Advisory', sub: 'Additional. Day 30 or Day 90 PIF' },
];

const sixMonthPlan = [
  { month: 'Month 1', brandDays: 4,  installs: 3, revenue: '$50k' },
  { month: 'Month 2', brandDays: 6,  installs: 5, revenue: '$80k' },
  { month: 'Month 3', brandDays: 8,  installs: 6, revenue: '$100k' },
  { month: 'Month 4', brandDays: 10, installs: 8, revenue: '$150k' },
  { month: 'Month 5', brandDays: 10, installs: 8, revenue: '$260k' },
  { month: 'Month 6', brandDays: 11, installs: 9, revenue: '$290k' },
  { month: 'Month 7', brandDays: 11, installs: 9, revenue: '$290k' },
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

const advisoryScenarios = [
  {
    label: 'Conservative',
    rate: '18%',
    detail: '9 Advisory clients × $24k',
    advisory: '$216k',
    total: '$1.44m',
    note: 'What the cash plan is built on.',
  },
  {
    label: 'Intended',
    rate: '40%',
    detail: '19.2 Advisory clients × $24k',
    advisory: '$460.8k',
    total: '$1.68m',
    note: 'The target. 40% rollover from the 90 Day Install into the 12 Month Advisory.',
  },
];

const acquisitionFirst50 = [
  {
    icon: Users,
    title: 'Strategy Day',
    description: 'Private, in person. $5,000 for the first 20 installs, then $10,000. Phase 1 of the 90 Day Install.',
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

const acquisitionAfter50 = [
  {
    icon: Users,
    title: 'Group Strategy Day',
    description: 'The default. $5,000 per founder, minimum 10 founders. $50k per group day.',
  },
  {
    icon: Crown,
    title: 'Private Strategy Day',
    description: 'Stays available at $25,000. 1:1, in person, 5x the group seat.',
  },
];

const operatorBridge = [
  {
    phase: 'First 20 clients',
    items: ['Validate the offer', 'Capture delivery IP', 'Identify the best operator', 'Build the CSM scorecard', 'Document every repeatable process'],
  },
  {
    phase: 'Clients 21 to 40',
    items: ['CSM runs implementation', 'Sean runs Strategy Days and premium boards', 'First Founding Licensed Operator shadows delivery', 'Licensed Operator runs selected clients under supervision'],
  },
  {
    phase: 'After proven results',
    items: ['Licensed Operators run full client pipelines', 'Authority Engine retains IP, training, platform and revenue share'],
  },
];

const operatingModel = [
  { stage: 'Stage 0', line: 'Sean proves the method.' },
  { stage: 'Stage 1', line: 'CSMs remove implementation from Sean.' },
  { stage: 'Stage 2', line: 'Licensed Operators run the method.' },
  { stage: 'Stage 3', line: 'The Academy trains and certifies them.' },
];

type Stage = {
  stage: string;
  year: string;
  title: string;
  revenue: string;
  description: string;
  model: string;
  mission: string;
  metric: string;
  link?: string;
  linkLabel?: string;
};

const stages: Stage[] = [
  {
    stage: 'STAGE 0',
    year: 'Year 1',
    title: 'Advisory',
    revenue: '$0 to $1.2M',
    link: '/phase0',
    linkLabel: 'Open the Phase 0 Operating Plan',
    description: 'Sean proves the method. Strategy Day, 90 Day Install, advisory. Every client generates IP, case studies, and proof. The first 20 installs are the validation cohort, and the price steps up once they are done.',
    model: '5k Day to 15k Install for the first 20 installs, then 10k Day to 30k Install, plus 24k Advisory. 60 Strategy Days and 48 Installs is $1.22m. Advisory at the conservative 18% takes it to $1.44m. Advisory at the intended 40% takes it to about $1.68m. Conversion targets: Strategy Day to Install 60 to 80%, Install to Advisory 18% conservative and 40% intended.',
    mission: 'The system gets documented and battle tested. Earn the right to say this works.',
    metric: 'Install conversion rate (target 60 to 80%). Secondary: Advisory rollover, 90 Day Install into 12 Month Advisory (target 40%).',
  },
  {
    stage: 'STAGE 1',
    year: 'Year 2',
    title: 'CSM Leverage',
    revenue: '$1M to $2M',
    description: 'CSMs remove implementation from Sean. The CSM runs the 90 Day build, the group calls, the scorecards and the operator coordination. Sean holds sales, Strategy Days, strategic Content Boards and IP. The product stops being Sean\'s hours and becomes the installed system.',
    model: 'One CSM per 20 weighted clients, hired at 16 to 18. An Operator Intensive counts as 1.5 to 2 clients through its first 90 days. Group Strategy Days become the default entry at $5k per founder, minimum 10 per group.',
    mission: 'Delivery quality holds without Sean in the room. The CSM scorecard becomes the standard every future operator gets measured against.',
    metric: 'Client outcomes on CSM led accounts match Sean led accounts. Secondary: Sean hours per active client, trending down.',
  },
  {
    stage: 'STAGE 2',
    year: 'Year 3',
    title: 'Licensed Operators',
    revenue: '$2M to $4M',
    description: 'Licensed operators run the full pipeline on their own client base. Same delivery, just no longer through Sean. Annual license. Revenue share back. This is the beginning of the training and licensing business. We certify Media OS Operators to run the Authority Engine on their own client base under our brand.',
    model: 'Each operator targets ~$300k/year. 5 to 8 operators plus Sean\'s direct installs = $1M to $3M.',
    mission: 'The first Founding Operators get licensed. Status comes from being early and close to the source.',
    metric: "Operator retention rate. Target 70%+ of Sean's rate.",
  },
  {
    stage: 'STAGE 3',
    year: 'Year 4',
    title: 'Academy',
    revenue: '$4M to $10M',
    description: 'Training becomes a product. The Authority Engine Academy certifies operators and content strategists. The core product of the company becomes training and certification of Media OS Operators and Content Directors. Advisory and placement build on top.',
    model: 'Certification $5k to $10k per person. Annual Engineroom license $2k to $5k.',
    mission: 'The Content Director School opens. Training free or low cost. Badge, platform, and placement are the product.',
    metric: 'Graduates deliver independently within 90 days of certification.',
  },
  {
    stage: 'STAGE 4',
    year: 'Year 5',
    title: 'Bolt on Talent',
    revenue: '$10M to $20M',
    description: 'Trained operators alongside the advisory. Clients get the system AND the person to run it. This is the placement, business in a box arm.',
    model: 'Clients buy the Authority Engine plus a certified Operator to run it. We charge for the Install plus a monthly Operator fee. Operators are trained in the Academy and placed into accounts. We keep the training and IP, and take placement fees plus rev share. Junior operators at $80k manage 3 to 4 clients each.',
    mission: 'Founders buy the system plus the operator. The ladder from good editor to trusted creative director becomes a real path.',
    metric: 'Operator utilisation. Target 3 to 4 clients per operator.',
  },
  {
    stage: 'STAGE 5',
    year: 'Year 6',
    title: 'Affiliate Distribution',
    revenue: '$20M to $50M',
    description: 'Partners resell the system through their own channels. Distribution through other people\'s networks.',
    model: '200 partners at 5 clients each at $300/seat = $300k MRR platform revenue. Plus partner fees.',
    mission: 'Partners distribute through their networks. Impact compounds when we are not in the room.',
    metric: 'Partner activation rate. Partners actively billing through The Engineroom.',
  },
  {
    stage: 'STAGE 6',
    year: 'Year 7+',
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
            </h2>

            <div className="glow-card p-8 md:p-10">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                <span className="text-white font-semibold">Mission:</span> Build the Media Operating System for 7 & 8 figure founders, and the training & placement ladder for the media operators who run it.
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
                    'Under $200k/month in revenue',
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
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Three steps.
              <br />
              <span className="text-zinc-500">One system.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Two tiers. The first 20 installs, then everything after.</p>
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

            <div className="glow-card p-8 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
                <h3 className="text-white font-semibold text-base">Operator Intensive</h3>
                <span className="text-blue-400 font-medium text-sm">$30,000 total</span>
                <span className="text-zinc-600 text-xs uppercase tracking-widest">By selection only</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">For founders without a solid operator. Not on the public ladder, offered only when lack of talent is the main constraint.</p>

              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">What is included</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  '90 Day Install',
                  'Operator SOPs',
                  'Operator job description',
                  'Headhunting',
                  'Candidate screening',
                  'Final interview',
                  'Hiring recommendation',
                  'Operator ramp plan',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Capacity control</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Maximum five Operator Intensives per quarter. This is a capacity limit, not a pricing detail.</p>
              </div>
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

      {/* 6 Month Plan */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The first $1M</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The Stage 0 ramp.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Month by month, through the price step at install 20.</p>

            <div className="glow-card overflow-hidden mb-8">
              <div className="hidden md:grid md:grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                <div>Month</div>
                <div className="text-right">Strategy Days</div>
                <div className="text-right">Installs</div>
                <div className="text-right">Revenue</div>
              </div>
              {sixMonthPlan.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-5 border-b border-zinc-900 last:border-b-0 text-sm"
                >
                  <div className="text-white font-medium md:col-span-1 col-span-2">{row.month}</div>
                  <div className="text-zinc-400 md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Strategy Days:</span>{row.brandDays}
                  </div>
                  <div className="text-zinc-400 md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Installs:</span>{row.installs}
                  </div>
                  <div className="text-blue-400 font-semibold md:text-right col-span-2 md:col-span-1">{row.revenue}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Days and Installs</p>
                <p className="text-zinc-400 text-sm leading-relaxed">60 Strategy Days and 48 Installs. The first 20 installs and the 28 days that fed them price at $5k and $10k additional, which is $340k. The 28 installs after, and 32 days, price at $10k and $20k additional, which is $880k. The step lands in Month 4.</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Base total</p>
                <p className="font-display text-3xl font-extrabold text-white tracking-tight">$1.22m</p>
                <p className="text-zinc-600 text-xs mt-2">Days and Installs only. Advisory on top.</p>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Advisory on top</p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {advisoryScenarios.map((s, i) => (
                <motion.div
                  key={i}
                  className={`glow-card p-8 ${i === 1 ? 'border-blue-500/20' : ''}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">{s.label}</span>
                    <span className="text-zinc-600 text-xs font-medium uppercase tracking-widest">{s.rate} rollover</span>
                  </div>
                  <p className="font-display text-4xl font-extrabold text-white tracking-tight mb-2">{s.total}</p>
                  <p className="text-zinc-400 text-sm mb-1">{s.detail} = {s.advisory} advisory</p>
                  <p className="text-zinc-600 text-xs leading-relaxed mt-3">{s.note}</p>
                </motion.div>
              ))}
            </div>

            <div className="glow-card p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-white font-semibold">18% is the conservative Stage 0 target. 40% is the intended rollover target.</span> Plan the cash on 18. Build the delivery model for 40.
              </p>
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
            <p className="text-zinc-600 text-sm mb-12">The Authority Engine is the Media Operating System. Brand, Content, and Scale running as one Engine your operator can control. The Engineroom is the software that stores, nudges, and measures it.</p>
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

      {/* Section 6: Acquisition */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Acquisition</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The model changes
              <br />
              <span className="text-zinc-500">at client 50.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12">One to one until the method is proven. One to many after.</p>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">First 50 clients</span>
                <span className="text-zinc-600 text-xs">Strategy Day is private, in person, $5,000 then $10,000 after 20 installs</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {acquisitionFirst50.map((path, i) => (
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
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">After the first 50</span>
                <span className="text-zinc-600 text-xs">Group Strategy Day becomes the default</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {acquisitionAfter50.map((path, i) => (
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
            </div>

            <div className="glow-card p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-white font-semibold">The transition off founder dependent delivery.</span> Ten founders in a room at $5,000 each is $50k for one day of Sean. The private day survives at $25,000 for the people who will pay 5x to not share the room. Workshops and events qualify. The Strategy Day is direct entry.
              </p>
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
              Seven stages.
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
                  {s.link && (
                    <div className="border-t border-zinc-800 mt-5 pt-5">
                      <Link
                        to={s.link}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        {s.linkLabel}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The Bridge to Licensed Operators */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The bridge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              How we remove
              <br />
              <span className="text-zinc-500">keyman risk.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12">The transition from Stage 0 to licensed operators, client by client.</p>

            <div className="grid md:grid-cols-3 gap-6">
              {operatorBridge.map((b, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">{b.phase}</p>
                  <ul className="space-y-3">
                    {b.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-blue-400 mt-1 flex-shrink-0" />
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

      {/* The Software Moat */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The moat</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The moat.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">We train the best operators in the world, and they spread it themselves.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  title: 'Data compounds',
                  description: 'Every client generates brand profiles, content performance data, archetype patterns, industry benchmarks. Every install makes the next one sharper.',
                },
                {
                  icon: TrendingUp,
                  title: 'The training is the product',
                  description: 'A $120k operator is worth it because of how they were trained. Nobody else is teaching this. We train them, place them, and keep them sharp, and no standalone agency or in house hire can match what comes out the other side.',
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
                  { stage: 'Stage 0', metric: 'Install conversion (target 60 to 80%). Secondary: Advisory rollover, 90 Day Install into 12 Month Advisory (target 40%).' },
                  { stage: 'Stage 1', metric: 'CSM led client outcomes match Sean led outcomes. Secondary: Sean hours per active client.' },
                  { stage: 'Stage 2', metric: "Licensed operator retention (target 70%+ of Sean's rate)" },
                  { stage: 'Stage 3', metric: 'Certification graduation rate' },
                  { stage: 'Stage 4', metric: 'Operator utilisation (target 3 to 4 clients per operator)' },
                  { stage: 'Stage 5', metric: 'Partner activation rate' },
                  { stage: 'Stage 6', metric: 'Revenue per employee' },
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
                "Strategist behind 100+ of the top online experts gives away $10M+ of work and creates a world first Content Director model."
              </p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl mb-10">
              Every decision in this deck is aimed at making that sentence true in two years.
            </p>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The operating model</p>
            <div className="glow-card p-8 md:p-10 mb-12">
              <div className="space-y-5">
                {operatingModel.map((s, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest w-20 flex-shrink-0">{s.stage}</span>
                    <span className="text-white font-semibold text-lg md:text-xl leading-snug">{s.line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="glow-card p-6">
                <Users className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">100+ top experts</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Using The Authority Engine.</p>
              </div>
              <div className="glow-card p-6">
                <BookOpen className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">$10M+ of work given away</p>
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
