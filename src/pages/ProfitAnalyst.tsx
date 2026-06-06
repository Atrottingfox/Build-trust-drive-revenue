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

type SpecTier = { tier: string; text: string; potency: number; note: string };
type Compensation = { broadAvatar: string; loose: string; tight: string };
type SpecExample = { label: string; sub: string; tiers: SpecTier[]; compensation: Compensation };

const SPEC_EXAMPLES: SpecExample[] = [
  {
    label: 'Restaurant',
    sub: 'Hospitality operator',
    tiers: [
      { tier: 'Identity', text: 'Restaurant operator running $1.5M who hates seeing the GST bill more than the tax bill.', potency: 5, note: 'A real person. Specific revenue, specific pain.' },
      { tier: 'Category', text: 'Hospitality founders.', potency: 4, note: 'Broader. Loses the operational pain that made the identity nod.' },
      { tier: 'Industry', text: 'Food and beverage businesses.', potency: 3, note: 'Industry label. Generic enough nobody sees themselves in it.' },
      { tier: 'Segment', text: 'SMBs.', potency: 2, note: 'A size grouping. Defines scope but no operator self-identifies as this.' },
      { tier: 'Market', text: 'Business owners.', potency: 1, note: 'The widest possible label. Almost invisible to the right person.' },
    ],
    compensation: {
      broadAvatar: 'Hospitality founders',
      loose: 'Hospitality founders. Improve your profit.',
      tight: "Hospitality founders. You don't know your real hourly rate, and your P&L doesn't tell you which days actually make money. Walk in with twelve weeks of numbers. Walk out with $50k of hidden profit named in 90 minutes.",
    },
  },
  {
    label: 'E-commerce',
    sub: 'DTC founder',
    tiers: [
      { tier: 'Identity', text: "Shopify founder at $3M who can't tell which SKUs are actually profitable after returns and ad spend.", potency: 5, note: 'Pain is hyper specific. The right founder leans in.' },
      { tier: 'Category', text: 'DTC brand operators.', potency: 4, note: 'Common label. Loses the specific blind spot.' },
      { tier: 'Industry', text: 'E-commerce businesses.', potency: 3, note: 'Too broad. Different operators with different problems.' },
      { tier: 'Segment', text: 'SMBs.', potency: 2, note: "A size descriptor. Doesn't speak to anyone specifically." },
      { tier: 'Market', text: 'Business owners.', potency: 1, note: 'The broadest label. Says nothing to anyone in particular.' },
    ],
    compensation: {
      broadAvatar: 'DTC brand operators',
      loose: 'DTC brand operators. Improve your margin.',
      tight: "DTC operators. You can't tell which SKUs actually make you money after ad spend, returns, and 3PL. Bring 90 days of data. Walk out with your top three profit killers named, and the fix for each.",
    },
  },
  {
    label: 'Agency',
    sub: 'Service business owner',
    tiers: [
      { tier: 'Identity', text: "Creative agency owner at 12 staff who books $2M revenue but can't tell which clients are losing him money.", potency: 5, note: 'Specific size, specific structure, specific problem.' },
      { tier: 'Category', text: 'Service business founders.', potency: 4, note: 'Wide. Covers people whose problems are nothing alike.' },
      { tier: 'Industry', text: 'Professional services.', potency: 3, note: 'Industry term. Almost institutional.' },
      { tier: 'Segment', text: 'SMBs.', potency: 2, note: 'Just describes business size. Not an identity.' },
      { tier: 'Market', text: 'Business owners.', potency: 1, note: 'Nobody calls themselves this. Invisible.' },
    ],
    compensation: {
      broadAvatar: 'Service business founders',
      loose: 'Service business founders. Optimise your profit.',
      tight: "Service business founders. Your accountant can't tell you which clients are actually losing you money once delivery hours are counted. Bring 12 months of project data. Walk out with every client ranked by real margin, and the three you should fire by next month.",
    },
  },
];

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
  const [selected, setSelected] = useState(0);
  const [openTier, setOpenTier] = useState<number | null>(null);
  const [showTight, setShowTight] = useState(false);
  const current = SPEC_EXAMPLES[selected];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {SPEC_EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setOpenTier(null); setShowTight(false); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === i
                ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300 shadow-[0_0_20px_-8px_rgba(59,130,246,0.5)]'
                : 'bg-transparent border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>
      <p className="text-zinc-500 text-xs mb-5 italic">{current.sub}. Tap a tier for the note.</p>

      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span className="text-blue-400 font-semibold">Avatar carries</span>
        <span className="text-zinc-500 font-semibold">Other levers must carry</span>
      </div>

      <div className="space-y-3 mb-12">
        {current.tiers.map((row, i) => {
          const isOpen = openTier === i;
          const avatarPercent = (row.potency / 5) * 100;
          return (
            <motion.button
              key={`${selected}-${i}`}
              onClick={() => setOpenTier(isOpen ? null : i)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`glow-card w-full text-left p-5 transition-colors ${isOpen ? 'border-blue-500/30' : 'hover:border-zinc-700'}`}
            >
              <div className="flex items-start gap-4 mb-3">
                <p className="text-zinc-500 text-xs uppercase tracking-widest w-20 flex-shrink-0 pt-0.5">{row.tier}</p>
                <p className="text-white font-medium text-sm leading-relaxed flex-1">{row.text}</p>
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
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-400 text-sm leading-relaxed pt-4 pl-24">{row.note}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* COMPENSATION DEMO */}
      <div className="border-t border-zinc-800/60 pt-10">
        <div className="flex items-baseline justify-between mb-2 gap-4 flex-wrap">
          <p className="text-zinc-300 font-semibold">Even with a broader avatar, you can still hit hard.</p>
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-zinc-800 bg-zinc-900/40">
            <button
              onClick={() => setShowTight(false)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!showTight ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Loose
            </button>
            <button
              onClick={() => setShowTight(true)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${showTight ? 'bg-blue-500/20 text-blue-300' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Tightened
            </button>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mb-5">
          Same avatar at the Category tier ({current.compensation.broadAvatar}). Toggle to see the same broad avatar with the other levers tightened.
        </p>

        <div className="glow-card p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest">{showTight ? 'Problem + promise + outcome tightened' : 'Avatar broad, everything else loose'}</p>
            <PotencyDots score={showTight ? 5 : 1} />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${selected}-${showTight ? 'tight' : 'loose'}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`leading-relaxed ${showTight ? 'text-white text-base' : 'text-zinc-400 text-base italic'}`}
            >
              {showTight ? current.compensation.tight : current.compensation.loose}
            </motion.p>
          </AnimatePresence>

          {showTight && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Problem', state: 'tight' },
                  { label: 'Promise', state: 'tight' },
                  { label: 'Outcome', state: 'tight' },
                  { label: 'Avatar', state: 'broad' },
                ].map((lever, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">{lever.label}</p>
                    <p className={`text-xs font-medium ${lever.state === 'tight' ? 'text-blue-300' : 'text-zinc-400'}`}>
                      {lever.state === 'tight' ? 'Hyper specific' : 'Category level'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

type Move = { axis: 'authority' | 'authenticity'; short: string; text: string };

const MOVES: Move[] = [
  { axis: 'authority', short: 'Aggregate data', text: 'Aggregate data. The average outcome across the last X workshops, named publicly.' },
  { axis: 'authority', short: 'Operator stories', text: 'Specific operator stories. Named figures from named operators on the day.' },
  { axis: 'authority', short: 'Proprietary mechanism', text: 'Proprietary mechanism. The question sequence documented, named, and protected.' },
  { axis: 'authority', short: 'Visible IP', text: 'Visible IP. Frameworks and decision rules others can recognise without being able to replicate.' },
  { axis: 'authority', short: 'Live workshop footage', text: 'Live workshop footage. The mechanism shown in action, captured on video.' },
  { axis: 'authenticity', short: 'Damaging admissions', text: 'Damaging admissions. The numbers you got wrong in your own businesses, named on camera.' },
  { axis: 'authenticity', short: 'BTS from own P&L', text: 'Behind the scenes from your own P&L. You run operations yourself. Show it.' },
  { axis: 'authenticity', short: 'Native operator language', text: "Native operator language. Speak the way operators speak when they're alone." },
  { axis: 'authenticity', short: 'Verifiable industry knowledge', text: 'Verifiable industry knowledge. The specific facts only an insider would know.' },
  { axis: 'authenticity', short: 'Public no-money decisions', text: 'Public decisions not to take easy money. Clients you said no to and why.' },
];

const RATING_LABELS = ['Not yet', 'Started', 'Running', 'Strong'];

function MoveRow({ short, score, onChange }: { short: string; score: number; onChange: (v: number) => void }) {
  return (
    <div className="glow-card p-4 flex items-center justify-between gap-3 flex-wrap">
      <p className="text-zinc-300 text-sm leading-relaxed flex-1 min-w-[160px]">{short}</p>
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
                <MoveRow key={i} short={m.short} score={scores[i]} onChange={(v) => setScore(i, v)} />
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
                <MoveRow key={i} short={m.short} score={scores[i]} onChange={(v) => setScore(i, v)} />
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
                <p className="text-zinc-300 text-sm leading-relaxed mb-1">
                  Push the {lighterAxis} axis. Start with: <span className="text-white font-medium">{suggestedMove.short}</span>
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">{suggestedMove.text}</p>
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
              Where the leverage sits.
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
              Every offer pulls on a few specificity levers. Tighten one, the others can loosen. Loosen one, the others have to compensate. The trap is loosening all of them at once because each one feels safer on its own.
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
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                The unit being sold is a $5,000 workshop. A specific session, a specific structure, a specific duration. Marketing's job is to defend that price tag, not to promise an outcome you can't guarantee for any individual.
              </p>
              <p>
                Promising 'I'll find you $50k of hidden profit' for an operator you've never met is the trap. The first prospect who finds $20k drags you into a debate you can't win.
              </p>
              <p className="text-zinc-300 font-medium">
                What does the work instead is the aggregate. Stop promising future outcomes. Start presenting historic averages. That's the asset.
              </p>
            </div>

            <div className="mb-10">
              <AggregateStatementBuilder />
            </div>

            <p className="text-zinc-300 font-semibold mb-3">What this changes</p>
            <ul className="space-y-2 mb-6">
              {[
                'The price is defended by past results, not future promises.',
                'The marketing focus shifts to the mechanism and the average, away from outcome guarantees.',
                'The cost of an unmet promise drops to zero. You never made a specific one.',
                'The workshop is the unit being sold. Everything before it builds the case for the price tag.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-zinc-400 leading-relaxed">
              The mechanism does the heavy lifting the promise can't. The aggregate does the convincing the promise can't. Together they hold a $5k price with no individual claim attached.
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
