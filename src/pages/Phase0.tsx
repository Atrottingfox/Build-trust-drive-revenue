import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Users, Briefcase, Video, Crown, Megaphone, Target, Shield, Gauge, Database, ClipboardCheck } from 'lucide-react';
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

const pricingTiers = [
  {
    label: 'Installs 1 to 20',
    tag: 'Founding',
    accent: true,
    lines: [
      { item: 'Strategy Day', price: '$5,000', note: 'Credits in full toward the Install' },
      { item: '90 Day Install', price: '$15,000', note: '$5,000 credit plus $10,000 additional' },
      { item: '12 Month Advisory', price: '$28,000', note: 'Additional. Includes the in person team training day' },
    ],
  },
  {
    label: 'Install 21 onward',
    tag: 'Standard',
    accent: false,
    lines: [
      { item: 'Strategy Day', price: '$10,000', note: 'Credits in full toward the Install' },
      { item: '90 Day Install', price: '$30,000', note: '$10,000 credit plus $20,000 additional' },
      { item: '12 Month Advisory', price: 'Not set', note: 'Decide before install 21' },
    ],
  },
];

const pricingRules = [
  'The step is at 20 installs, not 20 clients.',
  'The Strategy Day credits in full at both tiers. Nobody pays for the day twice.',
  'The $28,000 Advisory and the in person team training day are for the first 20 who take it up.',
  'Operator Intensive is $30,000 total, maximum five per quarter.',
];

const fourOutputs = [
  { icon: Target, label: 'Client result', detail: 'The outcome they paid for.' },
  { icon: Video, label: 'Media assets', detail: 'Long form, clips, behind the scenes.' },
  { icon: Database, label: 'Proof and case study data', detail: 'Before state, decisions, movement, result.' },
  { icon: ClipboardCheck, label: 'Training and IP', detail: 'The material the next operator learns from.' },
];

const dayTypes = [
  {
    type: 'Strategy Day',
    client: 'Client transformation',
    capture: ['Long form recording', 'Behind the scenes footage', 'Strategic insight clips', 'Case study inputs', 'Operator training material'],
  },
  {
    type: 'Content Board',
    client: 'Client diagnosis and direction',
    capture: ['Board recording', 'Strategic clips', 'Pattern library entries', 'Proof capture'],
  },
  {
    type: 'Operator Clinic',
    client: 'Client implementation',
    capture: ['Training content', 'SOP creation', 'Future certification material'],
  },
];

const captureBefore = [
  'Recording confirmed',
  'Camera and audio tested',
  'Consent confirmed',
  'Content angles prepared',
  'Client context loaded',
  'Capture owner assigned',
];

const captureAfter = [
  'Recording stored',
  'Transcript generated',
  'Best moments tagged',
  'Client sensitive material separated',
  'Content brief created',
  'SOP and training moments tagged',
  'Case study data logged',
];

const pipelineStages = ['Captured', 'Selected', 'Edited', 'Reviewed', 'Approved', 'Published', 'Repurposed', 'Measured'];

const pipelineFields = [
  'Asset', 'Source recording', 'Content pillar', 'Format', 'Audience', 'CTA',
  'Owner', 'Status', 'Publish date', 'Performance', 'Reuse opportunity',
];

const feedbackLoop = [
  'Strategy Day frameworks',
  'Content formats',
  'Sales messaging',
  'Operator training',
  'The Engineroom',
];

const hiringRule = [
  'The current owner spends more than 20% of their time on a repeatable function.',
  'Quality declines for two consecutive reporting periods.',
  'The role has a measurable scorecard before the hire, not after.',
  'The replacement creates more gross profit than it costs.',
];

const competencyGate = [
  'Runs a client independently',
  'Diagnoses the constraint without being told',
  'Produces the required deliverables to standard',
  'Holds retention on their own accounts',
  'Trains someone below them',
  'Passes a quality audit',
];

const successConditions = [
  '47 Strategy Days completed or sold',
  '36 Installs completed or sold',
  '40% rollover from the 90 Day Install into the 12 Month Advisory',
  '100% of critical workflows documented',
  'CSM led delivery working',
  'Sean removed from admin and routine implementation',
  'First operator capable of running the system under supervision',
];

const clientProgression = [
  {
    range: 'Clients 1 to 5',
    title: 'Prove the offer',
    priority: 'Discover what actually works. No unnecessary hiring.',
    sean: ['Strategy Days', '90 Day strategic direction', 'Key client calls', 'Advisory decisions', 'Content and IP'],
    csm: ['Shadowing Sean', 'Client onboarding', 'Scheduling', 'Recaps', 'Portal and tracker management', 'Building the first SOPs'],
    seanLabel: 'Sean owns',
    csmLabel: 'CSM owns',
  },
  {
    range: 'Clients 6 to 15',
    title: 'Adapt the delivery system',
    priority: 'CSM delivers the system while Sean audits quality.',
    sean: ['Strategy Days', 'High value Content Boards', 'Strategic escalations', 'Sales', 'Content and IP'],
    csm: ['Routine 1:1s', 'Operator calls', 'Client communication', 'Weekly scorecard reviews', '90 Day implementation'],
    seanLabel: 'Sean continues leading',
    csmLabel: 'CSM begins leading',
  },
  {
    range: 'Clients 16 to 20',
    title: 'Remove Sean from implementation',
    priority: 'Prove two people can deliver consistently without Sean being the operational bottleneck.',
    sean: ['Owns a 15 to 20 client book', 'Trains CSM 2', 'Owns quality and escalation management'],
    csm: ['Shadows CSM 1', 'Takes a small client pod', 'Runs implementation from the playbook'],
    seanLabel: 'CSM 1',
    csmLabel: 'CSM 2',
    note: 'Hire or begin onboarding CSM 2 around Client 16, not after Client 20.',
  },
];

const ownership = [
  { stage: 'Strategy Day', sean: 'Leads', csm: 'Prepares and supports', va: 'Logistics' },
  { stage: '90 Day Install', sean: 'Strategic escalation', csm: 'Runs delivery', va: 'Admin' },
  { stage: 'Content Board', sean: 'Leads initially', csm: 'Prepares data', va: 'Scheduling' },
  { stage: 'Advisory', sean: 'Strategic decisions', csm: 'Runs cadence', va: 'Admin' },
  { stage: 'Operator Intensive', sean: 'Final judgment', csm: 'Project manages', va: 'Coordination' },
];

const hireNow = [
  {
    icon: Users,
    num: '01',
    role: 'Client Success and Implementation Manager',
    capacity: 'Capacity: 15 to 20 clients',
    description: 'Owns onboarding, implementation, client success, scorecards, communication and delivery coordination.',
  },
  {
    icon: Briefcase,
    num: '02',
    role: 'VA',
    capacity: 'Start with 5 to 10 hours weekly',
    description: 'Owns scheduling, reminders, forms, uploads, tracker updates and portal housekeeping.',
  },
  {
    icon: Video,
    num: '03',
    role: 'Content Editor or Producer',
    capacity: 'Sean does not edit',
    description: 'Owns editing, exports, captions, file organisation and publishing handoff.',
  },
];

const hireLater = [
  {
    icon: Crown,
    num: '04',
    role: 'Creative Director',
    trigger: 'Hire when content volume and quality control become a recurring bottleneck, not simply because the title sounds useful.',
    owns: ['Creative standards', 'Format library', 'Editorial quality', 'Long form and short form consistency', 'Editor feedback'],
  },
  {
    icon: Megaphone,
    num: '05',
    role: 'Head of Marketing',
    trigger: 'Hire when Sean is producing enough content that distribution, campaign planning, partnerships and pipeline management require a dedicated owner.',
    owns: ['Content distribution', 'Campaign calendar', 'Partnerships', 'Lead generation', 'Marketing scorecard', 'Attribution'],
  },
];

const hiringTriggers = [
  { trigger: 'Now', hire: 'CSM, editor or producer, part time VA' },
  { trigger: 'At 16 weighted clients', hire: 'CSM 2' },
  { trigger: 'When content distribution becomes the bottleneck', hire: 'Head of Marketing' },
  { trigger: "When quality review exceeds one person's capacity", hire: 'Creative Director' },
  { trigger: 'When long form and short form each require dedicated teams', hire: 'Split those roles' },
  { trigger: 'When one CSM has proven delivery', hire: 'Begin the licensed operator pilot' },
];

const capacityModel = [
  'Sean Strategy Days: five private days per month for the first three months, then a maximum of eight, and eight only with a change in how the day gets delivered',
  'Standard 90 Day capacity per CSM: 20 weighted clients',
  'An Operator Intensive counts as 1.5 to 2 clients during the first 90 days',
  'Advisory clients count toward CSM capacity',
  'Hire CSM 2 at 16 to 18 weighted clients, not at 20',
  'Maximum five Operator Intensives per quarter',
  'Friday and Tuesday groups are fixed capacity blocks',
  'Private Strategy Day only remains available at premium pricing once group begins',
];

const qualityStandards = [
  'Client onboarding completed within 48 hours',
  'Every call has a brief',
  'Every call has a recap within 24 hours',
  'Every client has a current next action',
  'Every critical deliverable passes checklist review',
  'Every repeating task has an SOP, a Loom and a checklist',
  'No red client remains unreviewed for more than 7 days',
  'Replacement test passed before licensing',
];

const dependencyScore = [
  'Sean hours on Strategy Days',
  'Sean hours on sales',
  'Sean hours on content and IP',
  'Sean hours on implementation',
  'Sean hours on admin',
  'Number of client issues requiring Sean',
  'Percentage of calls Sean could have missed',
];

const proofCapture = [
  'Before state',
  'Strategy decisions',
  'Content output',
  'Qualified pipeline movement',
  'Client result',
  'Testimonial or case study',
  'New operator insight',
  'New SOP or training asset',
];

const scoreboard = [
  'Strategy Days sold',
  '90 Day Installs sold',
  'Install conversion rate',
  'Advisory rollover rate',
  'Active clients',
  'Clients per CSM',
  'Delivery on time percentage',
  'Founder hours on implementation',
  'Founder hours on admin',
  'Content output',
  'Qualified inbound opportunities',
  'Cash collected',
  'Contribution margin per offer',
];

const gates = [
  { num: 'Gate 1', when: 'First 5 clients', question: 'Can we deliver the result repeatedly?' },
  { num: 'Gate 2', when: 'Client 10', question: 'Can the CSM run routine implementation?' },
  { num: 'Gate 3', when: 'Client 16', question: 'Can we add CSM 2 without Sean becoming the trainer for everything?' },
  { num: 'Gate 4', when: 'Client 20', question: 'Can two CSMs deliver from the same system?' },
  { num: 'Gate 5', when: 'Client 21 onward', question: 'Can the Strategy Day become group first?' },
  { num: 'Gate 6', when: 'First licensed operator', question: 'Can someone outside the company deliver the system to standard?' },
];

const checkpoints = [
  {
    at: 'At 10 clients',
    items: ['CSM is running routine implementation', 'VA owns repeatable admin', 'Strategy Day and Install SOPs exist', 'Content production is delegated'],
  },
  {
    at: 'At 16 clients',
    items: ['CSM 2 begins onboarding', 'CSM 1 becomes quality lead', 'Client control board is accurate', 'Sean is no longer the default implementation owner'],
  },
  {
    at: 'At 20 clients',
    items: ['Two CSMs can run delivery', 'Replacement test passes', 'Creative Director decision is made based on content volume', 'Group Strategy Day is tested', 'First licensed operator candidate is identified'],
  },
  {
    at: 'At $1M run rate',
    items: ['Sean as strategist, seller and IP source', 'CSM team running implementation', 'VA layer running admin', 'Creative Director controlling content quality', 'Head of Marketing controlling distribution and demand', 'A documented Operator Manual ready for licensing'],
  },
];

const nonGoals = [
  'No Academy yet',
  'No broad licensing yet',
  'No separate long form and short form departments yet',
  'No complex automation before the manual process is proven',
  'No custom client journeys by default',
  'No new offer until current conversion, delivery and retention are understood',
  'No hiring without a measured bottleneck',
];

export default function Phase0() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <Link to="/map" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 text-sm transition-colors mb-10">
              <ArrowLeft className="w-4 h-4" />
              Back to the Business Map
            </Link>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">Stage 0</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Phase 0 Operating Plan
              </h1>
              <p className="text-zinc-500 text-xl md:text-2xl font-medium mb-4">
                $0 to $1M. Prove, document, delegate.
              </p>
              <p className="text-zinc-600 text-sm">
                How to get to $1M without prematurely building the Stage 6 org chart.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Phase 0 mission</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              One person per function.
              <br />
              <span className="text-zinc-500">Not one title per ambition.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 mb-6">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                Build and prove the Authority Engine with the first 20 clients, while removing Sean from repeatable implementation and creating the operating system future CSMs and licensed operators can run.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Sean</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Remains the source of strategy and IP.</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">The team</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Increasingly owns execution.</p>
              </div>
            </div>

            <div className="glow-card p-6 mt-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                The mistake would be hiring a Head of Marketing, Creative Director, Long Form Lead and Short Form Lead as separate departments before the volume requires it.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Founding pricing */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Founding pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Twenty installs at founding rates.
              <br />
              <span className="text-zinc-500">Then the price steps.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12">
              The founding window is the reason to move now, and the reason Phase 0 is measured in installs rather than months.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {pricingTiers.map((tier, i) => (
                <div key={i} className={`glow-card p-8 ${tier.accent ? 'border-blue-500/20' : ''}`}>
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-zinc-300 font-medium">{tier.label}</p>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${tier.accent ? 'text-blue-400' : 'text-zinc-600'}`}>
                      {tier.tag}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {tier.lines.map((line, j) => (
                      <div key={j} className={j > 0 ? 'border-t border-zinc-800 pt-6' : ''}>
                        <div className="flex items-baseline justify-between gap-4 mb-1.5">
                          <span className="text-zinc-400 text-sm">{line.item}</span>
                          <span className={`font-display text-2xl font-extrabold tracking-[-0.02em] ${tier.accent ? 'text-white' : 'text-zinc-400'}`}>
                            {line.price}
                          </span>
                        </div>
                        <p className="text-zinc-600 text-xs leading-relaxed">{line.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="glow-card p-8 mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {pricingRules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 mt-8 pt-6">
                <p className="text-zinc-500 text-sm leading-relaxed">
                  47 Strategy Days and 36 Installs puts the base at $875,000. Advisory rollover at 40% is 14 clients, another $392,000, and Stage 0 clears $1.27M. At the conservative 18% it is 6 clients and $1.04M. Plan the cash on 18, build the delivery model for 40.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Definition of success */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Definition of success</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Revenue is not the only test.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">
              Reach $1M while proving the Authority Engine can be sold, delivered and improved without Sean owning repeatable implementation.
            </p>

            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {successConditions.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 mt-8 pt-6">
                <p className="text-zinc-300 text-base leading-relaxed">
                  A business that depends entirely on you is not yet a scalable asset.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Client progression */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Client progression</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Twenty clients.
              <br />
              <span className="text-zinc-500">Three shifts.</span>
            </h2>

            <div className="space-y-6">
              {clientProgression.map((c, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 md:p-10"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-6">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest">{c.range}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">{c.title}</h3>
                  </div>

                  {c.note && (
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 pb-6 border-b border-zinc-800">{c.note}</p>
                  )}

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">{c.seanLabel}</p>
                      <ul className="space-y-2">
                        {c.sean.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check className="w-3.5 h-3.5 text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">{c.csmLabel}</p>
                      <ul className="space-y-2">
                        {c.csm.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check className="w-3.5 h-3.5 text-zinc-600 mt-1 flex-shrink-0" />
                            <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Priority</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{c.priority}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Delivery ownership */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Delivery ownership</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Who owns each moment.
            </h2>

            <div className="glow-card overflow-x-auto mb-8">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                  <div>Stage</div>
                  <div>Sean</div>
                  <div>CSM</div>
                  <div>VA</div>
                </div>
                {ownership.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 px-6 py-5 border-b border-zinc-900 last:border-b-0 text-sm">
                    <div className="text-white font-medium">{row.stage}</div>
                    <div className="text-blue-400">{row.sean}</div>
                    <div className="text-zinc-400">{row.csm}</div>
                    <div className="text-zinc-500">{row.va}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">The rule</p>
              <p className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
                Sean owns judgment. The CSM owns execution. The VA owns repetition.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The media machine */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The media machine</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Every day pays twice.
            </h2>
            <p className="text-zinc-500 text-lg mb-12 max-w-3xl">
              The client work is the raw material. A Strategy Day that only helps the client got delivered once. The same day captured properly builds four assets, and three of them keep working after the client leaves the room.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {fourOutputs.map((o, i) => {
                const Icon = o.icon;
                return (
                  <div key={i} className="glow-card border-blue-500/20 p-6">
                    <Icon className="w-5 h-5 text-blue-400 mb-4" />
                    <p className="text-zinc-300 font-medium text-sm mb-2">{o.label}</p>
                    <p className="text-zinc-600 text-xs leading-relaxed">{o.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="glow-card p-6 mb-16">
              <p className="text-zinc-400 text-sm leading-relaxed">
                If an activity cannot produce all four, question why it is on the calendar.
              </p>
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white mb-3">Day types</h3>
            <p className="text-zinc-500 mb-8">Every day has a primary purpose and a capture plan. The call is never just a call.</p>

            <div className="space-y-6 mb-16">
              {dayTypes.map((d, i) => (
                <div key={i} className="glow-card p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-white font-display text-xl font-extrabold tracking-[-0.02em] mb-3">{d.type}</p>
                      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Client gets</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">{d.client}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">The machine gets</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {d.capture.map((c, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white mb-3">The capture checklist</h3>
            <p className="text-zinc-500 mb-8">A checklist, not memory. The VA owns it once the workflow exists.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="glow-card p-8">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-6">Before every session</p>
                <div className="space-y-3">
                  {captureBefore.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glow-card p-8">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-6">After every session</p>
                <div className="space-y-3">
                  {captureAfter.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white mb-3">One production pipeline</h3>
            <p className="text-zinc-500 mb-8">One visible board. Content does not live in folders, Slack threads or someone's desktop.</p>

            <div className="glow-card p-8 mb-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
                {pipelineStages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-zinc-300 text-sm font-medium whitespace-nowrap">{stage}</span>
                    {i < pipelineStages.length - 1 && <span className="text-zinc-700 text-sm">&gt;</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card p-8 mb-16">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-6">Minimum fields on every asset</p>
              <div className="flex flex-wrap gap-2">
                {pipelineFields.map((f, i) => (
                  <span key={i} className="text-zinc-400 text-xs border border-zinc-800 rounded-lg px-3 py-2">{f}</span>
                ))}
              </div>
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white mb-3">The loop back</h3>
            <p className="text-zinc-500 mb-8">
              The weekly scoreboard already measures output. This is what happens to the answer. Every week the best performing beliefs, hooks and proof get fed back into:
            </p>

            <div className="glow-card border-blue-500/20 p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {feedbackLoop.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-zinc-300 text-base leading-relaxed">
                  Client data improves the media. The media creates better clients. That loop is the moat, and it only exists if capture is systematic.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Required team */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Required Phase 0 team</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Hire the constraint.
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">Immediately</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {hireNow.map((r, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display text-2xl font-extrabold text-zinc-700 tracking-tight">{r.num}</span>
                    <r.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 leading-snug">{r.role}</h3>
                  <p className="text-blue-400 text-xs font-medium mb-3">{r.capacity}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{r.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">Later in Phase 0</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {hireLater.map((r, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display text-2xl font-extrabold text-zinc-700 tracking-tight">{r.num}</span>
                    <r.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{r.role}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{r.trigger}</p>
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">Owns</p>
                  <ul className="space-y-2">
                    {r.owns.map((o, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-blue-400 mt-1 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="glow-card p-8">
              <h3 className="text-zinc-400 font-semibold text-sm uppercase tracking-widest mb-6">Do not hire yet as separate roles</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {['Head of Long Form', 'Head of Short Form'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <X className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Initially these are specialisations under the Creative Director, handled by contractors or lead editors. Split them into separate department heads only when volume requires multiple people in each lane.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Hiring triggers */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Hiring triggers</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Hire on constraints.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Not on titles.</p>

            <div className="space-y-4 mb-8">
              {hiringTriggers.map((t, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6 md:p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-zinc-500 text-sm leading-relaxed flex-1">{t.trigger}</span>
                    <span className="text-white font-semibold text-sm sm:text-right sm:w-64 flex-shrink-0">{t.hire}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glow-card p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Build one stage completely before adding the next.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The hiring rule */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The hiring rule</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Hire against a measured bottleneck.
              <br />
              <span className="text-zinc-500">Not against the future org chart.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12 max-w-3xl">
              The triggers above say when. This says how to know the trigger actually fired. All four conditions, not one.
            </p>

            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <div className="space-y-6">
                {hiringRule.map((r, i) => (
                  <div key={i} className={`flex items-start gap-5 ${i > 0 ? 'border-t border-zinc-800 pt-6' : ''}`}>
                    <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-blue-400 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-zinc-400 text-sm leading-relaxed pt-1">{r}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 mt-8 pt-6">
                <p className="text-zinc-300 text-base leading-relaxed">
                  Do not build a Stage 5 department inside Stage 0.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Capacity model */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Capacity model</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              The actual limits.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Operational, not aspirational.</p>

            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <div className="space-y-4">
                {capacityModel.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Gauge className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Quality control */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Quality control</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Pass or fail.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">No partial credit on delivery standards.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {qualityStandards.map((q, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <ClipboardCheck className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{q}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The competency gate */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The competency gate</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              What the replacement test means.
            </h2>
            <p className="text-zinc-500 text-lg mb-12 max-w-3xl">
              Nobody advances on time served. Six things, demonstrated, before anyone moves up a level or gets near a license.
            </p>

            <div className="glow-card p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {competencyGate.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 mt-8 pt-6">
                <p className="text-zinc-300 text-base leading-relaxed">
                  Gate 6 asks whether someone outside the company can deliver to standard. This is the answer sheet.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Founder dependency */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Founder dependency score</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Track this monthly.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">The number that says whether any of this is working.</p>

            <div className="glow-card p-8 md:p-10 mb-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {dependencyScore.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">The goal</p>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                Sean's time shifts toward sales, strategy, content and IP while client outcomes remain stable.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Data and proof capture */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Data and proof capture</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Every client generates eight assets.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">This is how the service becomes a data and training moat.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {proofCapture.map((p, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Database className="w-4 h-4 text-blue-400 mb-3" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{p}</span>
                </motion.div>
              ))}
            </div>

            <div className="glow-card p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every activity should create multiple assets.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Scoreboard */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Operating scoreboard</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Track weekly.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Thirteen lines. Every Monday.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {scoreboard.map((s, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-5"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{s}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The two primary metrics</p>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="glow-card border-blue-500/20 p-8 text-center">
                <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">60 to 80%</p>
                <p className="text-zinc-300 font-medium mb-1">Install conversion</p>
                <p className="text-zinc-600 text-xs">Strategy Day to 90 Day Install</p>
              </div>
              <div className="glow-card border-blue-500/20 p-8 text-center">
                <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">40%</p>
                <p className="text-zinc-300 font-medium mb-1">Advisory rollover</p>
                <p className="text-zinc-600 text-xs">90 Day Install into 12 Month Advisory</p>
              </div>
            </div>

            <div className="glow-card p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                These prove the offer before you scale the org.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Decision gates */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Decision gates</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Six questions.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">Answer one before you move to the next.</p>

            <div className="space-y-4">
              {gates.map((g, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6 md:p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest w-16 flex-shrink-0">{g.num}</span>
                    <span className="text-zinc-500 text-sm w-44 flex-shrink-0">{g.when}</span>
                    <span className="text-white font-medium text-sm leading-relaxed">{g.question}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Milestone checkpoints */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Milestone checkpoints</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              What must be true,
              <br />
              <span className="text-zinc-500">and by when.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {checkpoints.map((c, i) => (
                <motion.div
                  key={i}
                  className={`glow-card p-8 ${i === 3 ? 'border-blue-500/20' : ''}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">{c.at}</p>
                  <ul className="space-y-3">
                    {c.items.map((item, j) => (
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

      {/* Non-goals */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Explicit non goals</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              What Phase 0 is not.
            </h2>
            <p className="text-zinc-500 text-lg mb-12">So the team does not sprint in the wrong direction.</p>

            <div className="glow-card p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {nonGoals.map((g, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm leading-relaxed">{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Closing */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-10" />
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.25] mb-8">
              Phase 0 is not about building the final company. It is about proving the core model, removing Sean from repeatable work, and creating the first version of the machine that future CSMs and licensed operators can run.
            </p>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
              Build the smallest version of the future architecture that lets today's business move faster. One working process beats ten departments. Simple scales when the offer remains easy to sell and easy to fulfil.
            </p>

            <div className="mt-12">
              <Link to="/map" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-400 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to the Business Map
              </Link>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
