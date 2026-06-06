import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-display text-zinc-600 text-lg font-bold">{num}</span>
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
        {title}
      </h2>
    </div>
  );
}

type Belief = {
  category: string;
  sub: string;
  currents: string[];
  required: string;
  framingLabels?: string[];
};

const BELIEFS: Belief[] = [
  {
    category: 'Category',
    sub: 'Beliefs shift by stage of awareness',
    framingLabels: ['Unaware', 'Pain aware', 'Problem aware', 'Solution aware', 'Most aware'],
    currents: [
      "'Business is fine. Cashflow is tight sometimes, but that's just running a business.'",
      "'I work really hard. The bank account never grows the way it should.'",
      "'I don't actually know which products, clients, or days are making me money.'",
      "'I should get someone to look at my numbers properly. There are people who do this.'",
      "'I want to run a proper profit audit. Just deciding who to do it with.'",
    ],
    required: "'Compliance accounting and profit analysis are different jobs. Whatever stage I'm at, my regular accountant isn't built to surface what this workshop is built to surface.'",
  },
  {
    category: 'Mechanism',
    sub: 'Skepticism by what they have seen before',
    framingLabels: ['Mild', 'Default', 'Burnt', 'Hardened'],
    currents: [
      "'Probably similar to others. Worth checking I guess.'",
      "'All these workshops are basically the same. Different branding, same content.'",
      "'I've paid for this kind of thing before. Got generic frameworks and a homework template.'",
      "'I've stopped engaging with anything that calls itself a profit workshop.'",
    ],
    required: "'This mechanism actually is different. The question sequence is proprietary. The order he asks them in is the actual product. The spreadsheet is just where the answers land.'",
  },
  {
    category: 'Founder',
    sub: 'The kind of distance they feel from Gavin',
    framingLabels: ['Experience', 'Industry', 'Personality', 'Stage'],
    currents: [
      "'He's an advisor. Advisors haven't actually run what I run.'",
      "'My industry is different enough that he won't get the nuance.'",
      "'He'll give me the same playbook he gives everyone.'",
      "'Smart guy. But hasn't lived the operational mess I'm in at my size.'",
    ],
    required: "'He runs multiple of his own businesses. He's been in the chair. He's also honest about what he gets wrong, which most aren't.'",
  },
  {
    category: 'Self',
    sub: 'Self-concept defences they hold walking in',
    framingLabels: ['Mess', 'Size', 'Specificity', 'Awareness'],
    currents: [
      "'My business is too messy. The workshop will get wasted on cleanup.'",
      "'I'm too small for this kind of analysis. It's for $10M+ operators.'",
      "'My situation is too specific. A standard workshop won't fit me.'",
      "'If there were hidden profit, I'd already know about it.'",
    ],
    required: "'Someone at my exact size with my exact mess walked out with a real number named on the day. The mess turns out to be the signal.'",
  },
  {
    category: 'Timing',
    sub: 'The reason they give themselves for waiting',
    framingLabels: ['Calendar', 'Preparation', 'Capacity', 'Financial'],
    currents: [
      "'I'll book it after the EOFY rush.'",
      "'I want to clean my numbers up before he sees them.'",
      "'Q4 is too busy. New year for this.'",
      "'I'll do it once cashflow settles.'",
    ],
    required: "'Every month I'm not running this, the number the workshop would have surfaced is sitting in the business doing nothing. The fire is the reason to do it now.'",
  },
];

function BeliefCard({ belief }: { belief: Belief }) {
  const [view, setView] = useState<'current' | 'required'>('current');
  const [idx, setIdx] = useState(0);
  const cycleCurrent = () => setIdx((i) => (i + 1) % belief.currents.length);

  return (
    <div>
      <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-1">{belief.category}</p>
      <p className="text-zinc-500 text-xs mb-3 italic">{belief.sub}</p>
      <div className="glow-card p-6">
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setView('current')}
            className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
              view === 'current'
                ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setView('required')}
            className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
              view === 'required'
                ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
            }`}
          >
            Required
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${view}-${idx}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`leading-relaxed ${view === 'current' ? 'text-white' : 'text-zinc-300'}`}
          >
            {view === 'current' ? belief.currents[idx] : belief.required}
          </motion.p>
        </AnimatePresence>

        {view === 'current' && belief.currents.length > 1 && (
          <div className="mt-5 pt-4 border-t border-zinc-800/60">
            {belief.framingLabels ? (
              <div className="flex flex-wrap gap-1.5">
                {belief.framingLabels.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      i === idx
                        ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
                        : 'border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {belief.currents.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-blue-400' : 'bg-zinc-700'}`}
                    />
                  ))}
                  <span className="text-zinc-500 text-xs ml-2">{idx + 1} of {belief.currents.length}</span>
                </div>
                <button
                  onClick={cycleCurrent}
                  className="inline-flex items-center gap-1 text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors"
                >
                  Another framing
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type Scenario = 'restaurant' | 'ecommerce' | 'agency';

const SCENARIOS: { key: Scenario; label: string; sub: string }[] = [
  { key: 'restaurant', label: 'Restaurant', sub: 'Hospitality operator' },
  { key: 'ecommerce', label: 'E-commerce', sub: 'DTC founder' },
  { key: 'agency', label: 'Agency', sub: 'Service business' },
];

type TierRow = {
  name: string;
  potency: number;
  note: string;
  examples: Record<Scenario, string>;
};

const TIERS: TierRow[] = [
  {
    name: 'Identity',
    potency: 5,
    note: 'A specific person. Real revenue, real pain. The right operator nods immediately.',
    examples: {
      restaurant: 'Restaurant operator at $1.5M who hates seeing the GST bill more than the tax bill.',
      ecommerce: "Shopify founder at $3M who can't tell which SKUs are profitable after returns and ad spend.",
      agency: "Creative agency owner at 12 staff who can't tell which clients are losing him money.",
    },
  },
  {
    name: 'Category',
    potency: 4,
    note: 'The specific business type. Broader than identity, narrower than industry.',
    examples: {
      restaurant: 'Restaurant operators.',
      ecommerce: 'DTC brands.',
      agency: 'Creative agencies.',
    },
  },
  {
    name: 'Industry',
    potency: 3,
    note: 'The broader vertical the category sits inside. Generic enough that few self-identify as this alone.',
    examples: {
      restaurant: 'Hospitality.',
      ecommerce: 'E-commerce.',
      agency: 'Professional services.',
    },
  },
  {
    name: 'Segment',
    potency: 2,
    note: 'Size descriptor. Defines scope but no operator calls themselves this.',
    examples: {
      restaurant: 'SMBs.',
      ecommerce: 'SMBs.',
      agency: 'SMBs.',
    },
  },
  {
    name: 'Market',
    potency: 1,
    note: 'Widest possible label. Almost invisible to the right person.',
    examples: {
      restaurant: 'Business owners.',
      ecommerce: 'Business owners.',
      agency: 'Business owners.',
    },
  },
];

const LEVERS: { name: string; loose: string; tight: string }[] = [
  {
    name: 'Problem',
    loose: "'Improve your profit.'",
    tight: "'You're paying yourself last and don't know your real hourly rate. Your P&L doesn't tell you which days actually make money.'",
  },
  {
    name: 'Promise',
    loose: "'Better margins.'",
    tight: "'Bring twelve weeks of numbers. Historic average across the last 15 workshops: $50k of hidden profit named in 90 minutes.'",
  },
  {
    name: 'Language',
    loose: "'Optimise your business.'",
    tight: "Operator native. 'EOFY scramble.' 'GST hit.' 'The cashflow squeeze.' Not advisor jargon.",
  },
  {
    name: 'Outcome',
    loose: "'More profit.'",
    tight: "'$50,000 average hidden profit found per workshop. Historic, across 15 past sessions. Not a claim. A fact.'",
  },
  {
    name: 'Stage',
    loose: "'Any business size.'",
    tight: "'Operators between $1M and $5M in revenue, brick and mortar or service.'",
  },
];

const COMPENSATIONS: Record<Scenario, { loose: string; tight: string }> = {
  restaurant: {
    loose: 'Restaurant operators. Improve your profit.',
    tight: "Restaurant operators. You don't know your real hourly rate, and your P&L doesn't tell you which days actually make money. Bring twelve weeks of numbers. Average operator across our last 15 workshops left with $50k of hidden profit named in 90 minutes.",
  },
  ecommerce: {
    loose: 'DTC brands. Improve your margin.',
    tight: "DTC brands. You can't tell which SKUs actually make you money after ad spend, returns, and 3PL. Bring 90 days of data. Across our last 15 workshops, every operator left with their top three profit killers named and the fix for each.",
  },
  agency: {
    loose: 'Creative agencies. Optimise your profit.',
    tight: "Creative agencies. Your accountant can't tell you which clients are actually losing you money once delivery hours are counted. Bring 12 months of project data. Operators in our past workshops left with every client ranked by real margin, and the three they fired by month's end.",
  },
};

function PotencyDots({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < score ? 'bg-blue-400' : 'bg-zinc-800'}`}
        />
      ))}
    </div>
  );
}

function PillRow<T extends string | number>({ label, options, value, onChange }: { label: string; options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={String(opt)}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              value === opt
                ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
                : 'bg-transparent border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function AggregateStatementBuilder() {
  const [count, setCount] = useState<number>(15);
  const [band, setBand] = useState<string>('$1M and $5M');
  const [profit, setProfit] = useState<string>('$50,000');
  const [duration, setDuration] = useState<string>('90 minutes');

  const statement = `Across the last ${count} workshops with operators between ${band} in revenue, the average profit found in ${duration} is ${profit}. Some find more. Some find less. That's where the average sits.`;

  return (
    <div className="glow-card p-6 md:p-8">
      <p className="text-zinc-300 font-semibold mb-1">Build the aggregate statement</p>
      <p className="text-zinc-500 text-sm mb-6">Pick the real numbers from the workshops you've run. The line below assembles live. Use the output as a core asset across the channel.</p>

      <div className="space-y-5 mb-8">
        <PillRow label="Workshops run" options={[10, 15, 25, 50]} value={count} onChange={setCount} />
        <PillRow label="Revenue band" options={['$500k and $2M', '$1M and $5M', '$2M and $10M']} value={band} onChange={setBand} />
        <PillRow label="Average profit found" options={['$25,000', '$50,000', '$100,000']} value={profit} onChange={setProfit} />
        <PillRow label="Duration" options={['90 minutes', '2 hours', 'a half day']} value={duration} onChange={setDuration} />
      </div>

      <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Your aggregate statement</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={statement}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-white leading-relaxed italic"
          >
            '{statement}'
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SpecificityStack() {
  const [selected, setSelected] = useState<Scenario>('restaurant');
  const currentScenario = SCENARIOS.find((s) => s.key === selected)!;

  return (
    <div>
      {/* Scenario buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelected(s.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === s.key
                ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300 shadow-[0_0_20px_-8px_rgba(59,130,246,0.5)]'
                : 'bg-transparent border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="text-zinc-500 text-xs mb-6 italic">{currentScenario.sub}</p>

      {/* Bar legend */}
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span className="text-blue-400 font-semibold">Avatar carries</span>
        <span className="text-zinc-500 font-semibold">Other levers must carry</span>
      </div>

      {/* Tier rows - one scenario at a time */}
      <div className="space-y-3 mb-12">
        {TIERS.map((tier, i) => {
          const avatarPercent = (tier.potency / 5) * 100;
          return (
            <motion.div
              key={`${selected}-${tier.name}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="glow-card p-5"
            >
              <div className="flex items-start gap-4 mb-4">
                <p className="text-zinc-500 text-xs uppercase tracking-widest w-20 flex-shrink-0 pt-0.5">{tier.name}</p>
                <p className="text-white font-medium text-sm leading-relaxed flex-1">{tier.examples[selected]}</p>
              </div>

              <div className="pl-24">
                <div className="flex h-2 rounded-full overflow-hidden bg-zinc-900/60 border border-zinc-800/60 w-full">
                  <motion.div
                    className="bg-blue-400"
                    initial={false}
                    animate={{ width: `${avatarPercent}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="bg-zinc-600/80"
                    initial={false}
                    animate={{ width: `${100 - avatarPercent}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-[10px]">
                  <span className="text-blue-400 font-medium">{Math.round(avatarPercent)}%</span>
                  <span className="text-zinc-500 font-medium">{Math.round(100 - avatarPercent)}%</span>
                </div>
                <p className="text-zinc-500 text-xs italic mt-3 leading-relaxed">{tier.note}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 5 OTHER LEVERS - scenario agnostic */}
      <div className="border-t border-zinc-800/60 pt-10 mb-12">
        <p className="text-zinc-300 font-semibold mb-2">The other five levers</p>
        <p className="text-zinc-500 text-sm mb-6">
          Problem, Promise, Language, Outcome, and Stage. Each one can be loose or tightened. Tightening any of these compensates for a broader avatar. Tightening all of them is how a Category-tier message hits like an Identity-tier message.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEVERS.map((lever) => (
            <div key={lever.name} className="glow-card p-5">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-3">{lever.name}</p>
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">Loose</p>
                <p className="text-zinc-400 text-sm leading-relaxed italic mb-4">{lever.loose}</p>
                <p className="text-blue-300 text-[10px] uppercase tracking-widest mb-1 font-semibold">Tightened</p>
                <p className="text-white text-sm leading-relaxed italic">{lever.tight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPENSATION DEMO - synced to selected scenario */}
      <div className="border-t border-zinc-800/60 pt-10">
        <p className="text-zinc-300 font-semibold mb-2">{currentScenario.label}: all five levers tightened, broad avatar held.</p>
        <p className="text-zinc-500 text-sm mb-8">
          Both versions hold the same Category-tier avatar. Loose keeps the other five levers broad. Tightened dials them all up. The contrast reads at a glance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-zinc-800 p-5 bg-zinc-900/30">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Loose</p>
              <PotencyDots score={1} />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`loose-${selected}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-400 text-sm leading-relaxed italic"
              >
                '{COMPENSATIONS[selected].loose}'
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">Tightened</p>
              <PotencyDots score={5} />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`tight-${selected}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-white text-sm leading-relaxed italic"
              >
                '{COMPENSATIONS[selected].tight}'
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

type Move = { axis: 'authority' | 'authenticity'; short: string; text: string; example: string };

const MOVES: Move[] = [
  {
    axis: 'authority',
    short: 'Aggregate data',
    text: 'The average outcome across all the workshops, named publicly.',
    example: "'Across 15 workshops with operators between $1M and $5M, the average profit found in 90 minutes is $50,000.'",
  },
  {
    axis: 'authority',
    short: 'Specific operator stories',
    text: 'Named operators with named figures from named workshops.',
    example: "'Mark, fitness studio owner at $1.8M, found $73k of profit on the day. Most of it sitting in his subscription pricing.'",
  },
  {
    axis: 'authority',
    short: 'Proprietary mechanism',
    text: 'A named, sequenced process nobody else can claim.',
    example: "'The Profit Lens.' A four-step sequence used in every past workshop to surface hidden margin from an operator's P&L.",
  },
  {
    axis: 'authority',
    short: 'Visible IP',
    text: 'Frameworks and decision rules others can recognise without being able to replicate.',
    example: 'Named tools shown publicly: the Profit Lens, the Hidden Profit Matrix, the Margin Mapping worksheet.',
  },
  {
    axis: 'authority',
    short: 'Live workshop footage',
    text: 'Captured moments of the mechanism working in real time.',
    example: '60-second clips from inside workshops showing the moment an operator realises the number they were missing.',
  },
  {
    axis: 'authenticity',
    short: 'Mission statement',
    text: 'A clear, repeatable line that shares your intent and what you exist for.',
    example: "'Too many operators are walking past money they earned. My job is to help them see what they missed.'",
  },
  {
    axis: 'authenticity',
    short: 'BTS from own P&L',
    text: 'Show your own operator side. You run businesses too.',
    example: 'Monthly review posts of your own numbers, the decisions you made, the ones you got wrong.',
  },
  {
    axis: 'authenticity',
    short: 'Native operator language',
    text: "Speak the way operators speak when they're alone.",
    example: "'EOFY scramble,' 'cashflow squeeze,' 'GST hit.' Not advisor jargon.",
  },
  {
    axis: 'authenticity',
    short: 'Verifiable industry knowledge',
    text: 'Specific facts only an insider would know.',
    example: 'Sunday revenue spike for restaurants. Return rates by category for DTC. Project utilisation math for agencies.',
  },
  {
    axis: 'authenticity',
    short: 'Public no-money decisions',
    text: 'Clients you turned down and why.',
    example: "'I turned down a $3M operator last month. Their books needed cleaning up before the workshop could land. I told them what they actually needed first.'",
  },
];

const RATING_LABELS = ['Not yet', 'Started', 'Running', 'Strong'];

function MoveRow({ short, example, score, onChange }: { short: string; example: string; score: number; onChange: (v: number) => void }) {
  return (
    <div className="glow-card p-4">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <p className="text-white text-sm font-medium leading-relaxed flex-1 min-w-[160px]">{short}</p>
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-zinc-800 bg-zinc-900/40 flex-shrink-0">
          {RATING_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                score === i
                  ? i === 0
                    ? 'bg-zinc-800 text-zinc-300'
                    : 'bg-blue-500/15 text-blue-300 border border-blue-500/40'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed italic">{example}</p>
    </div>
  );
}

function TrustMatrixInteractive() {
  const [scores, setScores] = useState<number[]>(Array(MOVES.length).fill(0));

  const setScore = (idx: number, val: number) => {
    setScores((s) => s.map((x, i) => (i === idx ? val : x)));
  };

  const authoritySum = MOVES.reduce((sum, m, i) => (m.axis === 'authority' ? sum + scores[i] : sum), 0);
  const authenticitySum = MOVES.reduce((sum, m, i) => (m.axis === 'authenticity' ? sum + scores[i] : sum), 0);
  const authorityScore = authoritySum / 15;
  const authenticityScore = authenticitySum / 15;

  const xPercent = authenticityScore * 100;
  const yPercent = (1 - authorityScore) * 100;

  const totalRated = scores.reduce((sum, s) => sum + s, 0);
  const hasRated = totalRated > 0;

  let quadrant = 'Stranger';
  let quadrantDescription = 'Unknown. Skipped past in the feed.';
  if (authorityScore >= 0.5 && authenticityScore >= 0.5) {
    quadrant = 'Trust';
    quadrantDescription = 'Goal zone. Comparison stops, premium pricing holds.';
  } else if (authorityScore >= 0.5) {
    quadrant = 'Credible but cold';
    quadrantDescription = "Expert who hasn't earned the right to be liked. Easy to shop against on price.";
  } else if (authenticityScore >= 0.5) {
    quadrant = 'Likeable but unproven';
    quadrantDescription = "Connection without proof. People like them. They don't write the cheque.";
  }

  const lighterAxis: 'authority' | 'authenticity' = authorityScore <= authenticityScore ? 'authority' : 'authenticity';
  let suggestedMove: Move | null = null;
  let lowestScore = 4;
  MOVES.forEach((m, i) => {
    if (m.axis === lighterAxis && scores[i] < lowestScore) {
      suggestedMove = m;
      lowestScore = scores[i];
    }
  });

  return (
    <div>
      <p className="text-zinc-300 font-semibold mb-2">Rate where you sit on each move</p>
      <p className="text-zinc-500 text-sm mb-8">The dot in the matrix below moves with you. Your weakest axis gets the strategic move at the bottom.</p>

      <div className="space-y-8 mb-12">
        <div>
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-1">Authority moves</p>
          <p className="text-zinc-500 text-xs italic mb-4">Proof you can deliver</p>
          <div className="space-y-3">
            {MOVES.map((m, i) =>
              m.axis === 'authority' ? (
                <MoveRow key={i} short={m.short} example={m.example} score={scores[i]} onChange={(v) => setScore(i, v)} />
              ) : null,
            )}
          </div>
        </div>

        <div>
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-1">Authenticity moves</p>
          <p className="text-zinc-500 text-xs italic mb-4">Proof you will deliver for me</p>
          <div className="space-y-3">
            {MOVES.map((m, i) =>
              m.axis === 'authenticity' ? (
                <MoveRow key={i} short={m.short} example={m.example} score={scores[i]} onChange={(v) => setScore(i, v)} />
              ) : null,
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 text-center">
        <p className="text-zinc-500 text-xs uppercase tracking-widest">Authenticity, character, will they</p>
        <div className="flex justify-between text-zinc-600 text-[10px] uppercase tracking-widest mt-1 px-3">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-zinc-500 text-xs uppercase tracking-widest py-3">
          <span>High</span>
          <span></span>
          <span>Low</span>
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 relative">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 min-h-[140px]">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">High auth · Low authen</p>
            <p className="text-white font-semibold text-sm mb-1">Credible but cold</p>
          </div>
          <div className="rounded-xl border-2 border-blue-500/50 bg-blue-500/10 p-5 min-h-[140px] shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]">
            <p className="text-blue-300 text-[10px] uppercase tracking-widest mb-2 font-semibold">★ Trust</p>
            <p className="text-white font-semibold text-sm mb-1">The goal zone</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 min-h-[140px] opacity-50">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Low auth · Low authen</p>
            <p className="text-white font-semibold text-sm mb-1">Stranger</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 min-h-[140px]">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Low auth · High authen</p>
            <p className="text-white font-semibold text-sm mb-1">Likeable but unproven</p>
          </div>

          {hasRated && (
            <motion.div
              className="absolute w-5 h-5 rounded-full bg-blue-300 border-2 border-white shadow-[0_0_25px_rgba(96,165,250,0.9)] pointer-events-none"
              animate={{
                left: `calc(${xPercent}% - 10px)`,
                top: `calc(${yPercent}% - 10px)`,
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 16 }}
            />
          )}
        </div>
      </div>

      <div className="mt-8 glow-card border-blue-500/30 p-6">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Your position</p>
        <p className="text-white text-xl font-semibold mb-2">{hasRated ? quadrant : 'Start rating to plot a position'}</p>
        {hasRated && (
          <>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">{quadrantDescription}</p>
            <div className="flex items-center gap-4 mb-5 text-xs">
              <span className="text-zinc-500">Authority <span className="text-blue-300 font-semibold">{Math.round(authorityScore * 100)}%</span></span>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-500">Authenticity <span className="text-blue-300 font-semibold">{Math.round(authenticityScore * 100)}%</span></span>
            </div>
            {suggestedMove && lowestScore < 3 && (
              <div className="border-t border-zinc-800/60 pt-5">
                <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Strategic move</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-2">
                  Push the {lighterAxis} axis. Start with: <span className="text-white font-medium">{suggestedMove.short}</span>
                </p>
                <p className="text-zinc-400 text-xs leading-relaxed mb-2">{suggestedMove.text}</p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">{suggestedMove.example}</p>
              </div>
            )}
            {(!suggestedMove || lowestScore >= 3) && hasRated && (
              <div className="border-t border-zinc-800/60 pt-5">
                <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Strategic move</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Both axes are strong. Compound what's working.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const TOC_SECTIONS = [
  { id: 'section-01', num: '01', title: 'Specificity' },
  { id: 'section-02', num: '02', title: 'Beliefs' },
  { id: 'section-03', num: '03', title: 'Trust matrix' },
  { id: 'section-04', num: '04', title: 'Workshops' },
];

function SectionNav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-0 z-40 bg-base/85 backdrop-blur-md border-b border-zinc-900/60">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
        {TOC_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
          >
            <span className="text-zinc-600 font-mono">{s.num}</span>
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProfitAnalyst() {
  return (
    <PasswordGate storageKey="profitanalyst-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="Profit Analyst"
        description="Where the leverage sits."
        path="/theprofitanalyst"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <SectionNav />

      {/* HERO */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic analysis</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              Profit Analyst.
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Getting leverage.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 THE SPECIFICITY STACK */}
      <section id="section-01" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="The specificity stack" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every offer pulls on a few specificity levers. Tighten one, the others can loosen. Loosen one, the others have to compensate.
            </p>

            <p className="text-zinc-300 font-semibold mb-2">Avatar chunking, and the relationship to other levers</p>
            <p className="text-zinc-500 text-sm mb-5">Pick a scenario. The bar on each tier shows how much of the work the avatar carries vs how much the other levers (problem, promise, outcome, language) must pick up. As the avatar gets broader, the burden shifts.</p>
            <div className="mb-10">
              <SpecificityStack />
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
              Each chunk up dilutes potency. People don't think of themselves as 'SMB owners.' They think of themselves as the operator of a thing they can name.
            </p>

            <p className="text-zinc-300 font-semibold mb-4">If you chunk up the avatar, the other levers compensate</p>
            <ul className="space-y-3">
              {[
                { name: 'Problem specificity', desc: "'You're paying yourself last and don't actually know your hourly rate.' Hyper specific. The right person nods." },
                { name: 'Promise specificity', desc: "'$50k of hidden profit named in 90 minutes, or we work for free until we find it.' Concrete. Time bound. Defensible." },
                { name: 'Language specificity', desc: "Native to the operator. The way they talk to their accountant when the accountant isn't in the room." },
                { name: 'Outcome specificity', desc: "A number, defended by historic data. Not 'improve profit.' A figure that sits in their account." },
                { name: 'Stage specificity', desc: 'Where they are. $500k or $5M businesses. The problems and language shift between them.' },
              ].map((item, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>

            <p className="text-zinc-300 leading-relaxed mt-8 font-medium">
              The play is to own one. Own it loud. Then the others fall in line behind it.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 CURRENT TO REQUIRED BELIEFS */}
      <section id="section-02" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="Current and required beliefs" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every prospect carries beliefs that have to shift before they buy. Map the current. Map the required. Build the content that bridges them.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10 italic">
              Tap Current or Required. Cycle through the framings inside Current to see the variations operators actually hold.
            </p>

            <div className="space-y-8">
              {BELIEFS.map((belief) => (
                <BeliefCard key={belief.category} belief={belief} />
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 AUTHORITY + AUTHENTICITY */}
      <section id="section-03" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Authority and authenticity" />
            <p className="text-zinc-400 leading-relaxed mb-2">
              Two axes carry trust. Both have to be near max for comparison to stop.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-10">
              <span className="text-white font-semibold">Authority is credibility</span>. Proof you <span className="text-blue-300 font-semibold">can</span> deliver on the promise. <span className="text-white font-semibold">Authenticity is character</span>. Proof you <span className="text-blue-300 font-semibold">will</span>.
            </p>

            <TrustMatrixInteractive />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 SELLING WORKSHOPS */}
      <section id="section-04" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="Selling workshops" />
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
              <p>
                The unit being sold is a $5,000 workshop. The marketing job isn't to defend that price tag. It's to make the price irrelevant. When the workshop is unique, differentiated, proprietary, non risked, simple, and fast, $5,000 stops being a number anyone weighs against. Operators just want in.
              </p>
              <p>
                Every number on the page comes from past workshops. No promise of a future outcome. No claim. Just facts about what the average has been.
              </p>
            </div>

            <p className="text-zinc-300 font-semibold mb-3">Six attributes that make the price irrelevant</p>
            <p className="text-zinc-500 text-sm mb-6">Stack all six. The price stops being the conversation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                { name: 'Unique', desc: 'Nobody else runs this workshop. Different from anything that calls itself the same name.' },
                { name: 'Differentiated', desc: 'Even where the category exists, this format has a specific approach you cannot get elsewhere.' },
                { name: 'Proprietary', desc: 'Named methodology. Owned. Protected. Not generic frameworks dressed up.' },
                { name: 'Non risked', desc: 'Historic data carries the certainty. Past workshop averages published openly. Operator decides on facts, not on a promise.' },
                { name: 'Simple', desc: '90 minutes. Walk in. Walk out. One number named on the day.' },
                { name: 'Fast', desc: 'Same-day insight. No weeks of analysis. Immediate value.' },
              ].map((item, i) => (
                <div key={i} className="glow-card p-5">
                  <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">{item.name}</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-zinc-400 leading-relaxed mb-10">
              The other half is proof. Aggregate historic data sits alongside the six attributes and does the convincing without promising any individual outcome.
            </p>

            <div className="mb-10">
              <AggregateStatementBuilder />
            </div>

            <p className="text-zinc-300 font-semibold mb-3">What this changes</p>
            <ul className="space-y-2 mb-6">
              {[
                'The price stops being the conversation. The six attributes do.',
                'No individual outcome is promised. The aggregate does the proof work.',
                'The cost of an unmet promise drops to zero. You never made a specific one.',
                'The workshop is the unit being sold. Everything before it builds the case.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              Stack the six attributes. Surface the aggregate. The workshop sells itself.
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
