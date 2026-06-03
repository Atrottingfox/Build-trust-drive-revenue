import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Zap, Shield, BookOpen, Users, Layers, TrendingUp, Eye, Heart, Pen, Award, DoorOpen, Check, X, Rocket, Crown, Building, Globe, Database, Network, GraduationCap, Share2, Briefcase, Compass, Repeat } from 'lucide-react';
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
    title: '6 Month Advisory Bundle',
    price: '+$13k',
    rolled: '$28k all in · Early commit',
    description: "Offered at Day 30 to strong fits. Roll the rest of the 90 days and 6 months of advisory into one decision. Brand Day $5k + Install $10k + Bundle $13k = $28k for 9 months. Versus $33k list (15k + 18k), they save $5k for committing early.",
  },
  {
    num: '04',
    title: 'Standard Advisory',
    price: '$3k / month',
    rolled: 'Continuity',
    description: "For clients who don't take the bundle, or who want to continue after the 6 months. Monthly Founder Strategy Pod or 1:1. Monthly 1:1 with the Operator or Creative Director. Weekly Operator Clinic group call. Up to one Loom per week.",
  },
];

const revenueMetrics = [
  { stat: '$5k', label: 'Brand Day', sub: 'Entry point' },
  { stat: '$15k', label: 'Install', sub: 'Brand Day + 90 day build' },
  { stat: '$33k', label: 'Year 1 (base)', sub: '$15k Install + $18k for 6 months advisory' },
  { stat: '$28k', label: 'Year 1 (early commit)', sub: '6 Month Bundle taken at Day 30' },
  { stat: '60-80%', label: 'Brand Day to Install', sub: 'When the day is strong and pre framed' },
  { stat: '40-50%', label: 'Install to Bundle', sub: 'Offered at Day 30 to strong fits' },
];

const sixMonthPlan = [
  { month: 'June',      brandDays: 4,  installs: 3, bundles: 0, revenue: '$35k' },
  { month: 'July',      brandDays: 6,  installs: 5, bundles: 2, revenue: '$111k' },
  { month: 'August',    brandDays: 8,  installs: 6, bundles: 2, revenue: '$126k' },
  { month: 'September', brandDays: 10, installs: 8, bundles: 3, revenue: '$169k' },
  { month: 'October',   brandDays: 10, installs: 8, bundles: 3, revenue: '$169k' },
  { month: 'November',  brandDays: 11, installs: 9, bundles: 5, revenue: '$210k' },
  { month: 'December',  brandDays: 11, installs: 9, bundles: 5, revenue: '$210k' },
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

const flywheel = [
  {
    num: '01',
    title: 'Serve the top of the market',
    description: '7 and 8 figure founders, coaches, consultants. High ticket, low volume installs and advisory. Use their hardest problems to sharpen the system.',
  },
  {
    num: '02',
    title: 'Turn work into assets',
    description: 'Every project becomes case studies, frameworks, data. All of it stored and productised inside The Engineroom.',
  },
  {
    num: '03',
    title: 'Use assets to train operators and creatives',
    description: 'Take the same IP and build free or low cost training for videographers, editors, creative directors. Certify them on the system so they can run it anywhere.',
  },
  {
    num: '04',
    title: 'Place talent back into top end clients',
    description: 'Founders get world class operators. Operators get high leverage roles. The system spreads through people, not through marketing.',
  },
  {
    num: '05',
    title: 'Repeat at bigger scale',
    description: 'More revenue funds more proof, training, and talent. More talent enables more installs and better results. The cycle compounds.',
  },
];

const operatingPrinciples = [
  {
    title: 'Results first. Content second.',
    description: "Content is only good if it drives pipeline and positioning.",
  },
  {
    title: 'System over heroics.',
    description: "Engines operators can run. Not founders being on all the time.",
  },
  {
    title: 'Serve the top to serve the rest.',
    description: 'Start with the best resourced founders so we can fund free or low cost training for the next wave.',
  },
  {
    title: 'No scope creep.',
    description: 'Clear ladders. Clear boundaries. We change terms, not prices.',
  },
  {
    title: 'Document everything.',
    description: 'Every win and mistake becomes a playbook. Future clients and operators move faster because of it.',
  },
];

const stages = [
  {
    stage: 'STAGE 0',
    year: 'Year 1 · H2 2026',
    title: 'Advisory',
    revenue: '$0 to $1M',
    description: 'Sean delivers everything. Brand Day, 90 day install, advisory. Every client generates IP, case studies, and proof. The system gets documented and battle tested.',
    model: '60 Brand Days, 48 Installs, 20 early commit 6 month bundles in H2 2026 ≈ $1.04M. Conversion targets: Brand Day to Install 60-80%, Install to Bundle 40-50%.',
    mission: 'Every client generates IP, case studies, and proof. This is where we earn the right to say this works and build the first version of the operator curriculum.',
    metric: "Install conversion rate. Target 60-80%. Secondary: % of installs taking the 6 month bundle (target 40-50%). If attach is low, early commit offer or pre frame is off.",
  },
  {
    stage: 'STAGE 1',
    year: 'Year 2 · 2027',
    title: 'Licensed Operators',
    revenue: '$1M to $3M',
    description: 'Sean slows direct delivery. Licensed operators run the full Brand Day, Install, Advisory pipeline on their own client base. Same delivery, just no longer through Sean. Operators pay annual license. Revenue share back to the company. Sean trains. Sean reviews patterns. Sean owns the IP.',
    model: 'Each operator targets ~$300k/year running the engine on their roster. Annual license plus revenue share to company. 5 to 8 operators plus Sean\'s direct installs = $1M to $3M. Delivery doesn\'t change. The model just gets copied.',
    mission: "The first Founding Operators get licensed. Status comes from being early and close to the source. Revenue funds training and support instead of just Sean's calendar. Business in a box, version one: operators build a $300k/year solo shop using our IP, software, and brand instead of guessing.",
    metric: "Operator retention rate. If licensed operators can't retain clients at 70%+ of Sean's rate, the playbook isn't tight enough.",
  },
  {
    stage: 'STAGE 2',
    year: 'Year 3 · 2028',
    title: 'Bolt on Talent',
    revenue: '$3M to $10M',
    description: 'The real moat. Sean provides trained operators alongside the advisory. Clients get the system AND the person to run it. Software plus methodology plus talent supply.',
    model: 'Install: $10k. Operator placement: $3k to $5k/month. Advisory: $3k/month. Total per client: $6k to $8k/month. Junior operators at $80k manage 3 to 4 clients each. Gross margin per operator: 60 to 70%. Top operators earn into a profit share pool that vests over time, tied to retention and performance.',
    mission: "Founders buy a system plus a trained, licensed operator. Operators get world class opportunities without having to hunt for them. The cult gets teeth. Operators who consistently deliver get promoted to higher tier licenses and better clients. The ladder from good editor to trusted creative director becomes a real path.",
    metric: 'Operator utilisation rate. Clients per operator. Target: 3 to 4.',
  },
  {
    stage: 'STAGE 3',
    year: 'Year 4 · 2029',
    title: 'Academy',
    revenue: '$10M to $20M',
    description: 'Training becomes a product. The Authority Engine Academy certifies operators and content strategists. Graduates join the licensed operator pool or go independent with an Engineroom license.',
    model: 'Certification: $5k to $10k per person. Annual Engineroom license: $2k to $5k. Two revenue streams: training fees and platform fees.',
    mission: "The Content Director School opens. The public front door for the cult. Training is free or low cost. The license, badge, platform, and placement are the product. This is where we start giving away $10M+ of IP to create a world first Content Director model.",
    metric: 'Partner activation rate. Graduates must deliver independently within 90 days of certification.',
  },
  {
    stage: 'STAGE 4',
    year: 'Year 5 · 2030',
    title: 'Affiliate Distribution',
    revenue: '$20M to $50M',
    description: "Partners resell the Authority Engine system through their own channels. Agencies, coaches, consultants white label The Engineroom with their clients. Distribution happens through other people's networks.",
    model: '200 partners at 5 clients each at $300/seat = $300k MRR platform revenue. Plus partner fees. Plus direct clients and talent.',
    mission: 'Partners distribute the system and the talent layer through their own networks. Impact compounds even when we are not in the room.',
    metric: 'Partner activation rate. Number of partners actively billing clients through The Engineroom.',
  },
  {
    stage: 'STAGE 5',
    year: 'Year 6+ · 2031+',
    title: 'Agency',
    revenue: '$50M+',
    description: 'Full service for the biggest clients. Teams of operators, editors, strategists. Premium pricing. The software and data from every previous stage is the unfair advantage no competitor can replicate.',
    model: 'Full service teams at $15k to $25k/month per client. High revenue, lower margin, operationally heavy.',
    mission: 'For the biggest brands we become the media team in a box. The data and training from every previous stage power work no one else can match.',
    metric: 'Revenue per employee. Must stay above $200k to justify the complexity.',
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
              <p className="text-zinc-600 text-sm mb-8">
                The system. The model. The roadmap.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                This deck shows how The Authority Engine is designed to go from $0 to $1M in H2 2026, and how that money funds the long term plan: build an ecosystem that trains and places creative operators for free or low cost.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Why this exists */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why this exists</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Build the engine for the top 1%.
              <br />
              <span className="text-zinc-500">Use it to lift the next wave.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 mb-8">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
                <span className="text-white font-semibold">Mission:</span> Build the media operating system for the top 1% of expert led businesses, then use that engine to make world class training and opportunities free for the next generation of videographers and creative directors.
              </p>
              <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                <p>I help the best founders in the world turn content into revenue and reputation.</p>
                <p>I use that revenue to build tools, training, and an ecosystem that make it easier for the next wave of operators and creatives to win.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="glow-card p-6">
                <Crown className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">Founders</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Get operator run media engines that print trust and pipeline.</p>
              </div>
              <div className="glow-card p-6">
                <GraduationCap className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">Operators and creatives</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Get trained, placed, and paid well.</p>
              </div>
              <div className="glow-card p-6">
                <Database className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">Playbooks and software</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Sit in the middle and create leverage for everyone.</p>
              </div>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mt-8">
              Revenue is the fuel. The Authority Engine is the vehicle.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Why I care about this */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why I care about this</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              From the floor.
              <br />
              <span className="text-zinc-500">To the floor plan.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Where I came from</p>
                <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                  <p>I grew up as the operator in other people's businesses. On the floor, behind the camera, in the weeds.</p>
                  <p>I know what it is like to be the person doing the work with no clear path to equity, leverage, or recognition.</p>
                </div>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Why the engine</p>
                <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                  <p>The Authority Engine is my way of giving founders a system that finally matches what they have built.</p>
                  <p>And giving operators and creatives a ladder out of "just edit the video" into strategic, well paid roles.</p>
                </div>
              </div>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl font-medium">
              The faster I stack revenue and proof at the top of the market, the faster I can make the training and opportunities free at the bottom.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* North Star */}
      <section className="py-24 md:py-32">
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
                { stat: '$28-33k', label: 'Year 1 LTV', description: '$5k Brand Day entry. Install conversion 60-80%. 6 Month Bundle attach 40-50%. Plus upside from ongoing advisory at $3k/month.' },
                { stat: '28-33:1', label: 'LTV to CAC', description: 'At $1k CAC from warm outreach and content. Anything above 3:1 is considered excellent.' },
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

      {/* The Flywheel */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The flywheel</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              How money
              <br />
              <span className="text-zinc-500">becomes impact.</span>
            </h2>
            <div className="space-y-6">
              {flywheel.map((step, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-700 tracking-tight">{step.num}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-8 max-w-3xl">
              Money becomes proof. Proof becomes training. Training becomes talent. Talent becomes more installs. The cycle compounds.
            </p>
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
                <p className="text-zinc-400 text-sm leading-relaxed">60 Brand Days. 48 Installs. 20 early commit 6 month bundles.</p>
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

            <div className="glow-card p-8 mb-12">
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

            {/* Call cadence & capacity */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Call cadence & capacity</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              What I promise.
              <br />
              <span className="text-zinc-500">What scales when we grow.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Stage 1 · Weeks 1 to 4</p>
                <h4 className="text-white font-semibold mb-4">Per Install client</h4>
                <ul className="space-y-2">
                  {[
                    '1x 60 min 1:1 call per week. Operator and Sean. Founder if requested.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Stage 2 · Weeks 5 to 12</p>
                <h4 className="text-white font-semibold mb-4">Per Install client</h4>
                <ul className="space-y-2">
                  {[
                    'Founder: 1x 60 min Founder Strategy Pod per month (small group).',
                    'Operator: 2x 60 min 1:1 call per month.',
                    'Operator: 1x weekly Operator Clinic group call plus 1x 90 minute Q&A group call.',
                    'Up to 2 Looms per week with templated questions.',
                    '24 hour response via WhatsApp.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-blue-400 font-semibold text-sm mb-3">Scale rule</p>
              <ul className="space-y-2">
                {[
                  'Up to ~15 active installs, Stage 2 can be mostly 1:1.',
                  'Once active installs ≥ 20, all Stage 2 founders move into pods and operators rely more on clinics and Looms.',
                  'Target total delivery: ~10 to 12 hours per week of install and advisory calls at peak.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
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
                  description: "Every client generates brand profiles, content performance data, archetype patterns, industry benchmarks. At 50 clients that becomes proprietary intelligence. At 500 it's unassailable.",
                },
                {
                  icon: TrendingUp,
                  title: 'Talent multiplier',
                  description: 'A $80k operator delivers $180k in billable value because the software does the thinking. The gap between cost and value IS the platform.',
                },
                {
                  icon: Network,
                  title: 'Network effect',
                  description: 'Operators trained on The Engineroom bring it to their next client. Partners distribute it through their networks. The tool spreads through the talent layer, not through marketing. Licensed operators spread the system because it defines their career and income. Every new operator and founder that plugs in makes the platform harder to copy.',
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

      {/* Business in a Box */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Business in a Box</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Operators. Talent.
              <br />
              <span className="text-zinc-500">Opportunity.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <Briefcase className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">For operators and creatives</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">The Authority Engine becomes a business in a box.</p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Training free, forever. The playbooks, frameworks, and patterns I use with top tier founders are open.',
                    'License = ticket to opportunity. Operators and videographers pay an annual license to be recognised as a Certified Authority Engine Operator.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">What they get</p>
                <ul className="space-y-2">
                  {[
                    'Brand Day, Install, and Advisory playbooks.',
                    'The Engineroom software.',
                    'Ongoing pattern updates from live client work.',
                    'Private marketplace of founders looking for fractional or full time operators.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Crown className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">For founders</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">A talent bench of pre trained operators.</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Fractional</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">Pick a licensed operator who can run 2 to 3 clients using the system.</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Full time</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Hire a licensed operator who already knows the OS. Not another content person to train from scratch.</p>
              </div>
            </div>

            <div className="glow-card p-8 mb-8">
              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                The information is free. The license, brand, software, and access to opportunities are what people pay for.
              </p>
            </div>

            {/* Scarcity & standards */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Scarcity & standards</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              The badge is earned.
              <br />
              <span className="text-zinc-500">And maintained.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Earned, not bought</p>
                <ul className="space-y-2">
                  {[
                    'Initial projects reviewed.',
                    'Minimum success metrics on 1 to 2 live clients.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Maintained, not permanent</p>
                <ul className="space-y-2">
                  {[
                    'Operators must stay active. X clients per Y months.',
                    'Below standard performance = probation or removal.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl mb-8">
              Being in the cult is a live signal of current skill. Not something you bought once 3 years ago. Founders trust it more. Operators fight harder to keep it.
            </p>

            <div className="glow-card border-blue-500/20 p-8 mb-12">
              <p className="text-white text-base leading-relaxed font-medium">
                The goal is simple. Being a Certified Authority Director is the gold standard for content directors and media operators. The badge the best people want.
              </p>
            </div>

            {/* Journeys */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The journeys</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Two paths.
              <br />
              <span className="text-zinc-500">One platform.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Operator journey</p>
                <ol className="space-y-3">
                  {[
                    'Learn (free).',
                    'License.',
                    'Get placed or land clients.',
                    'Deliver using The Authority Engine.',
                    'Build track record.',
                    'Move up to higher tier licenses and profit share roles.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 font-semibold text-xs w-5 flex-shrink-0">0{i + 1}</span>
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Founder journey</p>
                <ol className="space-y-3">
                  {[
                    'Brand Day.',
                    'Install.',
                    'Advisory.',
                    'We need an operator.',
                    'Tap the licensed pool.',
                    'Plug and play operator with common language and OS.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 font-semibold text-xs w-5 flex-shrink-0">0{i + 1}</span>
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Internal guardrail */}
            <div className="border border-zinc-800/50 rounded-2xl p-6 bg-black/40">
              <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest mb-3">Internal rule</p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Do not sell licenses broadly until 20+ installs are delivered, 5 to 10 operators have run the system on real clients, and clear written standards exist for "keeps the badge."
              </p>
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
                  { stage: 'Stage 0', metric: 'Install conversion rate (target 60-80%). Secondary: 6 Month Bundle attach rate (target 40-50%).' },
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

      {/* Key risks & assumptions */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Risks & assumptions</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              What I am betting on.
              <br />
              <span className="text-zinc-500">And what could break it.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Assumptions</p>
                <ul className="space-y-3">
                  {[
                    'I can consistently sell 4 to 5 installs per month at current pricing.',
                    'My calendar can handle 10 to 12 hours per week of delivery plus travel under the new touch model.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">Risks</p>
                <ul className="space-y-3">
                  {[
                    'Attach rate to 6 month bundles stays below 30%. Model becomes more cash tight.',
                    'I over customise for whales and break the time model.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-blue-400 font-semibold text-sm mb-4">Mitigations</p>
              <ul className="space-y-3">
                {[
                  'Guardrails on avatar and operator requirement.',
                  'Fixed call cadence. No extra 1:1.',
                  '3 month checkpoints on conversion and hours. Adjust pricing or volume if off.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* How we operate */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we operate</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Five principles.
              <br />
              <span className="text-zinc-500">No exceptions.</span>
            </h2>
            <div className="space-y-4">
              {operatingPrinciples.map((p, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
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
