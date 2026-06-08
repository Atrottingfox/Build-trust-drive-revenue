import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, FileText, Compass, BookOpen, Layers, Zap, Shield, Award, Users } from 'lucide-react';
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

const TOC_SECTIONS = [
  { id: 'section-01', num: '01', title: 'Beliefs' },
  { id: 'section-02', num: '02', title: 'Trust pockets' },
  { id: 'section-03', num: '03', title: 'What is yours' },
  { id: 'section-04', num: '04', title: 'Specificity' },
  { id: 'section-05', num: '05', title: 'Trust matrix' },
  { id: 'section-06', num: '06', title: 'Video structure' },
  { id: 'section-07', num: '07', title: 'Bundle' },
  { id: 'section-08', num: '08', title: 'Year 1 plan' },
  { id: 'section-09', num: '09', title: 'Execution' },
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

// ============= BELIEFS =============

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
      "'Coaching is just personal training online. I do that already.'",
      "'I'm working too hard for what I make. Something's leaking somewhere.'",
      "'I don't have a content engine. I'm trading time for clients.'",
      "'I need a content + community + workshop system to scale.'",
      "'I need to install an Authority Engine. Who's running this for elite operators?'",
    ],
    required: "'There's a category called the Authority Engine. The top operators install it before they scale, not after.'",
  },
  {
    category: 'Mechanism',
    sub: 'Skepticism by what they have seen before',
    framingLabels: ['Mild', 'Average', 'Burnt', 'Hardened'],
    currents: [
      "'Probably another content coach. Worth a look.'",
      "'All these coaches are basically the same. Same hooks, same playbooks.'",
      "'I paid for one of these. Got generic frameworks. Nothing landed.'",
      "'I have stopped engaging with anything that calls itself a content engine.'",
    ],
    required: "'This mechanism is different. It is an install, not a course. The IP is sequenced, proprietary, and built for operators at this level.'",
  },
  {
    category: 'Founder',
    sub: 'The kind of distance they feel from Sean',
    framingLabels: ['Experience', 'Industry', 'Personality', 'Stage'],
    currents: [
      "'He coaches coaches. He has not actually run a fitness business at scale.'",
      "'He does not get fitness specifically. PTs are different to ecommerce founders.'",
      "'He will run the same playbook he runs for everyone else.'",
      "'I am bigger than his usual client. He will not get my problems.'",
    ],
    required: "'He has worked with Taki, Jay Wright, Bailey, Mitch Revs. He has run multiple businesses to eight figures. He has been in the chair at every level above mine.'",
  },
  {
    category: 'Self',
    sub: 'Self-concept defences they hold walking in',
    framingLabels: ['Mess', 'Size', 'Specificity', 'Awareness'],
    currents: [
      "'My current content is too inconsistent. The install will get wasted on cleanup.'",
      "'I am only at $400k. This is for operators at $2M plus.'",
      "'My niche is too specific. A standard system will not fit me.'",
      "'I would already know if there was a real gap in my content engine.'",
    ],
    required: "'Online operators at my exact size with my exact mess have already installed this. The mess is the input, not the obstacle.'",
  },
  {
    category: 'Timing',
    sub: 'The reason they give themselves for waiting',
    framingLabels: ['Calendar', 'Preparation', 'Capacity', 'Financial'],
    currents: [
      "'I will get this sorted in Q1.'",
      "'I want my team in place before this starts.'",
      "'Too busy with my next launch. I will look at this after.'",
      "'I will do it once revenue is more predictable.'",
    ],
    required: "'Every month I delay is one less month the engine runs. The compounding is the cost. The engine compounds whether I install it now or later. Earlier is cheaper.'",
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

// ============= SPECIFICITY STACK =============

type Scenario = 'pt' | 'studio' | 'health';

const SCENARIOS: { key: Scenario; label: string; sub: string }[] = [
  { key: 'pt', label: 'Online PT', sub: 'Online personal trainer' },
  { key: 'studio', label: 'Studio', sub: 'Boutique fitness studio' },
  { key: 'health', label: 'Health coach', sub: 'Holistic health coach' },
];

type TierRow = {
  name: string;
  potency: number;
  note: string;
  examples: Record<Scenario, string>;
};

const TIERS: TierRow[] = [
  {
    name: "Identity (that's me)",
    potency: 5,
    note: 'The role label they use for themselves. Immediate self-identification.',
    examples: {
      pt: 'Online PTs.',
      studio: 'Studio owners.',
      health: 'Health coaches.',
    },
  },
  {
    name: 'Category',
    potency: 4,
    note: 'The business category they sit in. Broader than the role label.',
    examples: {
      pt: 'Online coaches.',
      studio: 'Fitness studios.',
      health: 'Coaches and consultants.',
    },
  },
  {
    name: 'Industry (vertical)',
    potency: 3,
    note: 'The broader vertical the category sits inside.',
    examples: {
      pt: 'Fitness and coaching.',
      studio: 'Fitness.',
      health: 'Health and wellness.',
    },
  },
  {
    name: 'Segment',
    potency: 2,
    note: 'Size descriptor. Defines scope but no operator calls themselves this.',
    examples: {
      pt: 'SMBs.',
      studio: 'SMBs.',
      health: 'SMBs.',
    },
  },
  {
    name: 'Market',
    potency: 1,
    note: 'Widest possible label. Almost invisible to the right person.',
    examples: {
      pt: 'Business owners.',
      studio: 'Business owners.',
      health: 'Business owners.',
    },
  },
];

const LEVERS: { name: string; loose: string; tight: string }[] = [
  {
    name: 'Problem',
    loose: "'Get more clients.'",
    tight: "'You are the bottleneck of your own business. Every dollar runs through you. Every post, every DM, every call.'",
  },
  {
    name: 'Promise',
    loose: "'Scale your coaching business.'",
    tight: "'Walk out of 90 days with an Authority Engine that runs without you in the room.'",
  },
  {
    name: 'Language',
    loose: "'Optimise your funnel.'",
    tight: "Native operator. 'I keep burning through editors.' 'My DMs are dead.' 'Workshop sold out, content engine empty.'",
  },
  {
    name: 'Stage',
    loose: "'Any size business.'",
    tight: "'Online operators between $400k and $5M who already have advocates and need the engine that compounds them.'",
  },
];

const COMPENSATIONS: Record<Scenario, { loose: string; tight: string }> = {
  pt: {
    loose: 'Online coaches. Scale your business.',
    tight: "Online coaches. You are the bottleneck of your own business. Every dollar runs through you. Walk out of 90 days with an Authority Engine that runs without you in the room.",
  },
  studio: {
    loose: 'Fitness studios. Grow your studio.',
    tight: "Fitness studios. You can fill the room but cannot fill the next room. The marketing depends on you and only you. Walk out of 90 days with an engine that fills every room without your face on every post.",
  },
  health: {
    loose: 'Coaches and consultants. Build your brand.',
    tight: "Coaches and consultants. Your wisdom gets watered down every time it goes through a content team that does not get the depth. Walk out of 90 days with a documented voice, a system to extract it, and an operator who runs it.",
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

function SpecificityStack() {
  const [selected, setSelected] = useState<Scenario>('pt');
  const currentScenario = SCENARIOS.find((s) => s.key === selected)!;

  return (
    <div>
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

      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
        <span className="text-blue-400 font-semibold">Avatar carries</span>
        <span className="text-zinc-500 font-semibold">Other levers must carry</span>
      </div>

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

      <div className="border-t border-zinc-800/60 pt-10 mb-12">
        <p className="text-zinc-300 font-semibold mb-2">The other four levers</p>
        <p className="text-zinc-500 text-sm mb-6">
          Problem, Promise, Language, and Stage. Tightening any of these compensates for a broader avatar. Tightening all of them is how a Category-tier message hits like an Identity-tier message.
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

      <div className="border-t border-zinc-800/60 pt-10">
        <p className="text-zinc-300 font-semibold mb-2">Compensation in action: {currentScenario.label}.</p>
        <p className="text-zinc-500 text-sm mb-8">
          Both versions hold the same Category-tier avatar. Loose keeps the other four levers broad. Tightened dials them all up.
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

// ============= TRUST MATRIX =============

type Move = { axis: 'authority' | 'authenticity'; short: string; text: string; example: string };

const MOVES: Move[] = [
  {
    axis: 'authority',
    short: 'Aggregate data',
    text: 'The numbers across all your clients, named publicly.',
    example: "'$10M+ created for clients in the past 24 months. Across 30+ online operators.'",
  },
  {
    axis: 'authority',
    short: 'Specific operator stories',
    text: 'Named clients with named results.',
    example: "'Jay Wright: doubled following and revenue in 12 months. Mitch Revs: 19k to 50k followers in 2 months, 1.4M organic impressions for three months straight.'",
  },
  {
    axis: 'authority',
    short: 'Proprietary mechanism',
    text: 'Named, sequenced process nobody else can claim.',
    example: "'The Authority Engine.' Brand to Content to Scale. The 5 As. The Magic Model: Ignition / Transmission / Flywheel.",
  },
  {
    axis: 'authority',
    short: 'Visible IP',
    text: 'Frameworks and rules others can recognise without being able to replicate.',
    example: 'The VOICE framework. The 5 As as weekly rhythm. The Operator Install Model.',
  },
  {
    axis: 'authority',
    short: 'Live workshop footage',
    text: 'Captured moments of the mechanism working in real time.',
    example: 'Behind the scenes from boardrooms, brand days, and operator installs.',
  },
  {
    axis: 'authenticity',
    short: 'Mission statement',
    text: 'A clear, repeatable line that shares your intent and what you exist for.',
    example: "'Authority is not claimed. It is inferred by others through observed truth. My job is to engineer the conditions where that happens at scale.'",
  },
  {
    axis: 'authenticity',
    short: 'BTS from own operation',
    text: 'Show your own operator side. You run multiple businesses.',
    example: 'Posts showing the Authority Engine + Content.OS build, decisions made, decisions reversed, the move to Gold Coast.',
  },
  {
    axis: 'authenticity',
    short: 'Native operator language',
    text: "Speak the way operators speak when they're alone.",
    example: "'My DMs are dead.' 'My editor went rogue.' 'Workshop sold out, content engine empty.' Not coaching jargon.",
  },
  {
    axis: 'authenticity',
    short: 'Damaging admissions',
    text: 'The decisions you got wrong, named on camera.',
    example: "'I tried volume. It did not work. I had to delete six months of content and start again.' 'I picked the wrong operator for a Brand Day. Refunded and rebuilt.'",
  },
  {
    axis: 'authenticity',
    short: 'Public no-money decisions',
    text: 'Clients you turned down and why.',
    example: "'I turned down a $30k engagement last month. They had no online presence to amplify. We are accelerants, not fire starters.'",
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
      <p className="text-zinc-500 text-sm mb-8">The dot in the matrix moves with you. Your weakest axis gets the strategic move at the bottom.</p>

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

// ============= MAIN PAGE =============

export default function TheNextStage() {
  return (
    <PasswordGate storageKey="thenextstage-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="The Next Stage. Inside the Authority Engine."
        description="The strategic playbook running underneath the 90-day Authority Engine install."
        path="/thenextstage"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <SectionNav />

      {/* HERO */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic playbook · Undeniable</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              The Next Stage.
              <br />
              <span className="text-zinc-500">Inside the Authority Engine.</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              The strategic playbook that runs underneath the 90-day install. Beliefs to break. Trust to build. Frameworks that lock the category. The why-this-works memo, sitting one click under /undeniable.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 BELIEFS */}
      <section id="section-01" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="The belief stack" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Five core beliefs gate every purchase at this level. Map current, map required, build the content that bridges them. The bigger the gap, the more priority that belief gets in the content rhythm.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10 italic">
              Tap Current or Required. Tap a framing pill to see the variation operators actually hold.
            </p>

            <div className="space-y-8">
              {BELIEFS.map((belief) => (
                <BeliefCard key={belief.category} belief={belief} />
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-zinc-800/60">
              <p className="text-zinc-300 font-semibold mb-3">One belief bucket per piece of content.</p>
              <p className="text-zinc-400 leading-relaxed mb-3">
                Every video, every post, every workshop segment picks a single core belief bucket and breaks it. Acknowledge the current belief. Dismantle it with data and stories. Install the required one.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Stack content across the channel and the operator walks through all five buckets over time. Trying to break all of them at once means breaking none.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 THREE POCKETS OF TRUST */}
      <section id="section-02" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="Three pockets of trust" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Trust isn't one thing. It's three. They compound in order.
            </p>

            <div className="space-y-5">
              <div className="glow-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <p className="text-blue-300 text-xs font-bold">01</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Credibility.</p>
                    <p className="text-blue-400 text-xs italic mt-0.5">'I can do the thing.'</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  The base layer. You've done it before. You know your shit. Proven by record.
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">
                  Rhys's status: Strong. $10M+ for clients in 24 months. Jay, Bailey, Mitch, Taki. Track record speaks.
                </p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <p className="text-blue-300 text-xs font-bold">02</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Authority.</p>
                    <p className="text-blue-400 text-xs italic mt-0.5">'I am the best at the thing.'</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  The layer above credible. Thought leader. Category owner. Built by borrowing audiences and chunking up.
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">
                  Rhys's status: Strong but underclaimed. Working with two of the highest level coaches in Australia is the borrowed authority. The chunk-up from there extends across every operator below their tier.
                </p>
              </div>

              <div className="glow-card border-blue-500/40 p-6 shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <p className="text-blue-300 text-xs font-bold">03</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Character.</p>
                    <p className="text-blue-400 text-xs italic mt-0.5">'I will deliver on what I say.'</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Authority says you can. Character says you will. Character closes deals. Damaging admissions, vulnerability, unfiltered moments, the absence of flashy edits.
                </p>
                <p className="text-blue-300 text-xs leading-relaxed font-medium">
                  Rhys's opportunity: This is the light pocket. The biggest content unlock sits in showing the operator-side, the things he turned down, the bets that did not work, the moves he made in his own businesses. Authenticity over production value.
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mt-8 font-medium">
              The consulting session hits all three in one move. Authority because the category position gets borrowed. Character because the unfiltered side shows. Credibility because the IP gets demonstrated live.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 WHAT IS UNIQUELY YOURS */}
      <section id="section-03" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="The four things only Rhys can claim" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Anyone can copy a hook. Anyone can post a framework. Four things are uniquely yours and can't be replicated. The combination is what locks the category.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Stories</p>
                <p className="text-white text-sm leading-relaxed mb-2">Named clients, their journeys, their figures.</p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">Bailey Seamer. Mitch Revs. Jay Wright. Taki Moore. Self trust transfer. The viewer maps themselves onto the operator and pre-feels the outcome.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Data</p>
                <p className="text-white text-sm leading-relaxed mb-2">Aggregate and individual numbers unique to you.</p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">$10M+ created for clients in 24 months. Workshop results. Content engagement across the client roster. Numbers that exist nowhere else.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Experiences</p>
                <p className="text-white text-sm leading-relaxed mb-2">Personal patterns seen across operators at every level.</p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">Running your own businesses. Two of the highest level coaches in Australia inside the engine. What it actually takes inside the room when multi-million dollar plays are being run.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Mechanisms</p>
                <p className="text-white text-sm leading-relaxed mb-2">Mechanisms, principles, frameworks, and IP.</p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">The Authority Engine. The Magic Model. The 5 As. VOICE framework. Brand to Content to Scale. Operator Install Model. Named, owned, defended.</p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed font-medium">
              Anyone can claim one. Stacking all four is what's uncopyable. Bake all four into every workshop, every video, every piece of content. The combination becomes the category.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 SPECIFICITY STACK */}
      <section id="section-04" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="Specificity" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every offer pulls on a few specificity levers. Tighten one, the others can loosen. Loosen one, the others have to compensate.
            </p>
            <p className="text-zinc-300 font-semibold mb-2">Avatar chunking, and the relationship to other levers</p>
            <p className="text-zinc-500 text-sm mb-5">Pick a scenario. The bar on each tier shows how much of the work the avatar carries vs how much the other levers (problem, promise, language, stage) must pick up.</p>
            <div className="mb-10">
              <SpecificityStack />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 TRUST MATRIX */}
      <section id="section-05" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="Authority and authenticity" />
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

      {/* 06 VIDEO STRUCTURE */}
      <section id="section-06" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="The video structure" />
            <p className="text-zinc-400 leading-relaxed mb-3">
              Every consulting / workshop video follows the same outline. Intro, body, close. The structure itself becomes the mechanism. By the third video the audience trusts the format. By the tenth they predict it.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-10 font-medium">
              That predictability is the proof you have a method.
            </p>

            <div className="mb-10">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-1">Part 01</p>
              <p className="text-white font-semibold text-lg mb-4">The intro <span className="text-zinc-500 font-normal">(0 to 30 seconds)</span></p>
              <div className="space-y-3">
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">0 to 10 sec</span>
                    <p className="text-white font-semibold text-sm">Relatable pain.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">The avatar instantly sees themselves. Frustration named. Tension installed.</p>
                </div>
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">10 to 25 sec</span>
                    <p className="text-white font-semibold text-sm">Proof, promise, plan.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">15-second credibility soundbite. Signal of intention. What the viewer gets from watching.</p>
                </div>
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">25 to 30 sec</span>
                    <p className="text-white font-semibold text-sm">The path.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">The three problems the video will walk. Tension carries forward.</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-1">Part 02</p>
              <p className="text-white font-semibold text-lg mb-2">The body <span className="text-zinc-500 font-normal">(the three-problem walk-through)</span></p>
              <p className="text-zinc-500 text-sm mb-5">For each problem, the same five beats run in the same order. Cuts move between consultant, guest, and snippets from earlier in the session.</p>
              <div className="glow-card p-5">
                <ol className="space-y-3">
                  {[
                    { n: '01', label: 'Consultant names the problem.', desc: 'Frames why it matters for the guest. The viewer pre-feels the same problem.' },
                    { n: '02', label: 'Guest unlocks.', desc: 'Relatable pain surfaces. Camera catches the recognition moment.' },
                    { n: '03', label: 'Expert uncovers the opportunity.', desc: 'The opportunity hidden inside the problem gets named on camera.' },
                    { n: '04', label: 'Mechanism applied.', desc: 'The proprietary process gets demonstrated live. The IP shows itself.' },
                    { n: '05', label: 'Outcome named.', desc: 'What changes for the guest once the mechanism runs. The viewer extrapolates.' },
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 text-xs font-bold font-mono w-6 flex-shrink-0">{step.n}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">{step.label}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="text-zinc-500 text-xs italic mt-3">Same five beats, three times in a row. Predictable rhythm. The audience anticipates each move before it happens.</p>
            </div>

            <div className="mb-10">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-1">Part 03</p>
              <p className="text-white font-semibold text-lg mb-4">The close</p>
              <div className="space-y-3">
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Recap</span>
                    <p className="text-white font-semibold text-sm">Outcome named.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">What got uncovered for the guest, what's now possible. The line from in to out is closed.</p>
                </div>
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Capture</span>
                    <p className="text-white font-semibold text-sm">Bundle.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">Lab notes, audit, free trial or community gate. Click-to-capture for the viewer.</p>
                </div>
                <div className="glow-card p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Next</span>
                    <p className="text-white font-semibold text-sm">Soft next step.</p>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">Viewer self-selects into the audit. The audit selects them into the next deliverable. Each step earns the next.</p>
                </div>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed font-medium">
              Same intro shape. Same five-beat body. Same close. Every guest, same outline. Every video, same outline. The mechanism is visible in the structure itself.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 BUNDLE INSTALLED IN EVERY VIDEO */}
      <section id="section-07" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="07" title="The bundle installed in every video" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every consulting video carries a bundle. Not a separate funnel, not a separate offer. A bonus the viewer pulls down while watching, that compounds the value of the video itself. The click-to-capture moment built into the mechanism.
            </p>

            <p className="text-zinc-300 font-semibold mb-2">Three core things</p>
            <p className="text-zinc-500 text-sm mb-6">Each one earns the next. Give first, give-give second, data exchange third.</p>
            <div className="space-y-3 mb-10">
              {[
                {
                  icon: FileText,
                  label: 'Lab notes',
                  tier: 'Give. Open. Ungated.',
                  desc: "The full summary of the consulting session. Breakdown of what got uncovered for the guest, mapped to the viewer's situation. Same structure, different operator. No friction, no trade, no card.",
                },
                {
                  icon: Layers,
                  label: 'Audit tool',
                  tier: 'Give-give.',
                  desc: 'Self-rate across the three core areas covered in the session. Short videos at the top of each answer point at the right next step. The audit IS the right next steps.',
                },
                {
                  icon: Zap,
                  label: 'Free trial or community gate',
                  tier: 'Data exchange.',
                  desc: 'Of the engine, the operator install, or the community. Earned by the viewer because they have already self-diagnosed through the audit. By the time they hit it, they have chosen the path.',
                },
              ].map((item, i) => (
                <div key={i} className="glow-card p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-1">{item.tier}</p>
                    <p className="text-white font-semibold text-base mb-1">{item.label}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-zinc-300 font-semibold mb-3">Why the bundle works</p>
            <ul className="space-y-2 mb-6">
              {[
                'Captures viewers at peak intent. Tension built in the video, the click resolves it.',
                'Lab notes ungated. The give comes first. No card, no trade, no friction.',
                'The audit self-segments. Viewer rates themselves and lands on their next step.',
                'Earns the next deliverable. By the time the viewer hits it, they have self-diagnosed and chosen the path.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 YEAR 1 CONTENT PLAN */}
      <section id="section-08" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="08" title="Your year 1 content plan" />
            <p className="text-zinc-400 leading-relaxed mb-3">
              Not templates. Finished work. The five outputs below are populated for your brand and your market. Each one produces filmable content. Together they are roughly the next 12 months of long form.
            </p>
            <p className="text-zinc-500 text-sm italic mb-12">
              Sharpen with the team in week one. Filmable inside 30 days.
            </p>

            {/* 08.1 BELIEF BRIDGE */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">08.1</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Belief bridge map</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Five belief layers your audience walks through before they buy. Current belief, required belief, the working video title that bridges the gap.
              </p>
              <div className="space-y-4">
                {[
                  {
                    layer: 'Category',
                    current: "'I need more clients on Instagram.'",
                    required: "'I need an authority system that compounds across every platform I touch.'",
                    title: "Why 'more leads on Instagram' is the wrong goal for fitness coaches scaling past \$1M",
                  },
                  {
                    layer: 'Product',
                    current: "'Content is what I do between client work.'",
                    required: "'Content is the leverage that makes client work scalable.'",
                    title: 'The hidden cost of being your own marketer (and the only fix for fitness operators)',
                  },
                  {
                    layer: 'Brand',
                    current: "'Other coaches do this better than me.'",
                    required: "'My specific approach is the moat, but only if I name it.'",
                    title: 'Why your method is the brand (not your face)',
                  },
                  {
                    layer: 'Self',
                    current: "'I am not big enough to install this yet.'",
                    required: "'This is the install that gets me big enough.'",
                    title: 'What changes when fitness operators at \$400k to \$2M install an authority system',
                  },
                  {
                    layer: 'Timing',
                    current: "'I will do this once revenue is more stable.'",
                    required: "'Authority is the thing that makes revenue stable.'",
                    title: 'Why most fitness founders install authority too late',
                  },
                ].map((row, i) => (
                  <div key={i} className="glow-card p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold">{row.layer}</p>
                      <p className="text-zinc-600 text-xs">Belief {i + 1} of 5</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">Current</p>
                        <p className="text-zinc-300 text-sm leading-relaxed italic">{row.current}</p>
                      </div>
                      <div>
                        <p className="text-blue-300 text-[10px] uppercase tracking-widest mb-1 font-semibold">Required</p>
                        <p className="text-white text-sm leading-relaxed italic">{row.required}</p>
                      </div>
                    </div>
                    <div className="border-t border-zinc-800/60 pt-3">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">Working video title</p>
                      <p className="text-white font-medium text-sm leading-relaxed">'{row.title}'</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 08.2 8-VIDEO FOUNDATION */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">08.2</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">The 8-video foundation</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Eight video types that move the audience through the natural trust arc: Character to Authority to Practicality to Philosophy to Legacy. Working titles below.
              </p>
              <div className="space-y-3">
                {[
                  { n: '01', type: 'Character Story', title: "From PT to \$10M+ in client revenue: what I got wrong on the way", driver: 'Trust through truth. People buy why, not what.' },
                  { n: '02', type: 'The Positioning Play', title: 'The full Authority Engine: every step to install one in 90 days', driver: "Authority through density. 'This person has a system for everything.'" },
                  { n: '03', type: 'Tactical Niche Operator', title: 'Three patterns I see in fitness operators who scale past \$2M', driver: 'Principles over predictions. Pattern recognition earns credibility.' },
                  { n: '04', type: 'Accessible Masterclass', title: 'The single content move that took Mitch Revs from 19k to 50k followers in 60 days', driver: 'Speed to value + simple accessibility. Shareable in Slack.' },
                  { n: '05', type: 'The Signature Framework', title: "The 5 A's: how authority actually gets built (not bought)", driver: 'A framework they implement becomes a framework they share.' },
                  { n: '06', type: 'Expertise Compression', title: 'Everything I know about online coaching content in 12 minutes', driver: 'Simplifying the complex is the highest form of expertise demonstration.' },
                  { n: '07', type: 'Counterintuitive Shift', title: 'Why fitness founders chasing volume are running the wrong playbook', driver: 'Belief breaker. Shifts the relationship dynamic. Doubles as VSL.' },
                  { n: '08', type: 'Legacy', title: 'Why authority is the only asset that survives algorithm changes', driver: 'Audience adopts philosophies, not just frameworks. Final layer of identity trust.' },
                ].map((video, i) => (
                  <div key={i} className="glow-card p-5">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-blue-400 text-xs font-bold font-mono">{video.n}</span>
                      <span className="text-zinc-500 text-xs uppercase tracking-widest">{video.type}</span>
                    </div>
                    <p className="text-white font-semibold leading-relaxed mb-2">'{video.title}'</p>
                    <p className="text-zinc-500 text-xs leading-relaxed italic">{video.driver}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs italic mt-4">Same eight types every quarter. Different angles, same psychological arc. The library compounds.</p>
            </div>

            {/* 08.3 FOUNDER BELIEF BANK */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">08.3</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Founder belief bank</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Five contrarian positions you hold about the fitness coaching industry. Each one defendable with evidence. Each one underpins multiple videos. The reinforcing beliefs that become your public philosophies.
              </p>
              <div className="space-y-3">
                {[
                  { belief: 'More content volume is the most common cause of plateau, not the solution.', proof: 'Backed by what actually scales the operators in your roster. Volume is the trap dressed as the answer.' },
                  { belief: 'Online coaches do not need bigger audiences. They need deeper systems.', proof: 'Backed by operator hour math. The ceiling is system depth, not reach.' },
                  { belief: 'Personal brand is the wrong frame for most fitness operators. Authority systems are the right one.', proof: "Backed by what survives when the founder steps off camera. The brand can't depend on the face." },
                  { belief: 'Working with category leaders is what borrowed authority actually means. Most coaches mistake it for vanity.', proof: 'Backed by Taki, Jay, Bailey, Mitch. The chunk-up principle in action.' },
                  { belief: 'The fitness industry confuses output with authority.', proof: 'Backed by what audiences remember vs what they ignore. Output is noise. Authority is signal.' },
                ].map((item, i) => (
                  <div key={i} className="glow-card p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-blue-400 text-xs font-bold font-mono mt-0.5 flex-shrink-0">0{i + 1}</span>
                      <p className="text-white font-semibold leading-relaxed flex-1">'{item.belief}'</p>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed italic pl-7">{item.proof}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs italic mt-4">Same five beliefs, applied across different videos, audiences, industries. That is how intellectual ownership gets built.</p>
            </div>

            {/* 08.4 HERO'S JOURNEY */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">08.4</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Your hero's journey type</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Of the seven hero's journey templates (Transformation, Insider, Contrarian, Scientist, Guide, Accidental Hero, Protector), your story reads as <span className="text-white font-semibold">Insider + Scientist hybrid</span>. Insider because you have worked behind the operators most people only watch from the outside. Scientist because the work is framework-driven and pattern-based, not coaching cliche.
              </p>

              <div className="glow-card border-blue-500/30 p-6">
                <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-4">Your locked narrative</p>
                <div className="space-y-3">
                  {[
                    { label: "I have spent years behind brands like", value: 'LSKD, Tiger Lily, Mitch Revs, Jay Wright, Taki Moore. The category leaders most online operators only see from the outside.' },
                    { label: 'But I discovered the opposite is true', value: 'The industry assumes authority is claimed. It is not. It is inferred by others through observed truth. The operators with the biggest audiences are often the least trusted in the room.' },
                    { label: 'I kept seeing the same problem', value: 'Output mistaken for authority. Volume mistaken for visibility. Founders trapped inside their own marketing.' },
                    { label: 'So I built', value: 'The Authority Engine. The system that installs deep, system-led trust across a personal brand without making the founder the bottleneck.' },
                    { label: 'Now I help', value: 'Online fitness founders at $400k to $5M install the engine that compounds their authority while their team runs the operation.' },
                  ].map((row, i) => (
                    <div key={i} className="border-l-2 border-zinc-800 pl-4">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">{row.label}</p>
                      <p className="text-white text-sm leading-relaxed">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-zinc-500 text-xs italic mt-3">This is the spine of the Character Story video (Video 01) and every story you reuse in other content.</p>
            </div>

            {/* 08.5 TRUST TIMELINE DIAGNOSIS */}
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">08.5</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Trust timeline diagnosis</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Five stages every viewer travels. Your current audience tends to cluster in stages 1 and 2. The gap is stage 3.
              </p>

              <div className="space-y-2 mb-8">
                {[
                  { stage: 'Attention', sub: 'Stranger to Aware', status: 'strong', note: 'Audience knows you exist. Borrowed audiences and client name drops are doing this work.' },
                  { stage: 'Alignment', sub: 'Aware to Interested', status: 'strong', note: 'Mission and shared values land. Operators feel pulled toward you.' },
                  { stage: 'Authorship', sub: 'Interested to Trusting', status: 'gap', note: 'This is the gap. Audience likes you but does not yet trust your method specifically. Earned credibility content is the next lever.' },
                  { stage: 'Achievability', sub: 'Trusting to Buying', status: 'building', note: 'Some case studies in place. Needs more concrete path documentation.' },
                  { stage: 'Access', sub: 'Buying to Advocating', status: 'building', note: 'Boardroom does this well. Workshop format makes scarcity genuine.' },
                ].map((row, i) => (
                  <div key={i} className={`glow-card p-4 ${row.status === 'gap' ? 'border-blue-500/40 bg-blue-500/5' : ''}`}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <p className="text-white font-semibold text-sm">{row.stage}</p>
                        <p className="text-zinc-500 text-xs">{row.sub}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full ${
                        row.status === 'gap' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/40'
                        : row.status === 'strong' ? 'bg-zinc-800/60 text-zinc-400'
                        : 'border border-zinc-800 text-zinc-500'
                      }`}>
                        {row.status === 'gap' ? '★ The gap' : row.status === 'strong' ? 'Strong' : 'Building'}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-2">{row.note}</p>
                  </div>
                ))}
              </div>

              <div className="glow-card border-blue-500/30 p-6">
                <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-3">Strategic move for the next 60 days</p>
                <p className="text-white leading-relaxed mb-3 font-medium">
                  Lead with Videos 03, 04, 05, and 07 from the 8-video foundation.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Tactical Niche Operator + Accessible Masterclass + Signature Framework + Counterintuitive Shift. These four are the Authorship bridge. They turn 'I like Rhys' into 'I trust the method.' That is what closes the gap between Stage 2 and Stage 3, and it is what unlocks the next layer of inbound.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 09 EXECUTION PLAN */}
      <section id="section-09" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="09" title="Execution plan" />
            <p className="text-zinc-400 leading-relaxed mb-3">
              The operational layer underneath the strategy. Hooks to film. Buckets to film from. Format mix. Lead magnets. The 30 day shipping calendar. The system that runs without you in the room.
            </p>
            <p className="text-zinc-500 text-sm italic mb-12">
              Section 08 is the what. This is the how. Everything below is populated. Sharpen with the operator. Ship.
            </p>

            {/* 09.1 HOOK BANK */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.1</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Hook bank</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                20 hooks organised by the 5 A's. Each one is a pattern interrupt that earns the first second. Pull from this for short form, long form openers, and thread leads.
              </p>

              {[
                {
                  axis: 'Attention',
                  sub: 'Scroll-stoppers. Pattern interrupt or contrarian frame.',
                  hooks: [
                    "Most fitness coaches plateau at $400k. Here is the exact reason why.",
                    "I spent six figures learning what nobody teaches about online coaching. Here it is in 10 minutes.",
                    "The way you scale a coaching business is not the way you scale Mitch Revs' brand.",
                    "Three patterns I see in fitness operators who scale past $2M. None are obvious.",
                    "If I had to rebuild a coaching business from zero today, I'd skip 80% of what coaches do.",
                  ],
                },
                {
                  axis: 'Alignment',
                  sub: 'Likeness. The thing that makes them say they are just like me.',
                  hooks: [
                    "Your content is the bottleneck. Nobody is telling you because it is hard to hear.",
                    "I run multiple businesses. This is the most common mistake I see fitness founders make at scale.",
                    "The hardest part of being a coach isn't coaching. It is everything else.",
                    "I used to think content was the work I did between client work. Then a client told me it was the leverage that made the client work scalable.",
                  ],
                },
                {
                  axis: 'Authority',
                  sub: 'Credibility. Earned proof of method.',
                  hooks: [
                    "We've helped fitness operators generate $10M+ in 24 months. The pattern across every one of them is the same.",
                    "Inside the Authority Engine: how the 5 A's compound across a 90 day install.",
                    "Mitch Revs grew from 19k to 50k followers in 60 days. The play was not hooks. It was this.",
                    "Jay Wright doubled his following and his revenue in 12 months. Here is the exact sequence we ran.",
                  ],
                },
                {
                  axis: 'Achievability',
                  sub: 'Easy first steps. Proof people like them already did it.',
                  hooks: [
                    "The smallest content move that 3x'd Mitch's organic reach in one week. Anyone can replicate it.",
                    "What to film if you have 60 minutes and one phone. (Worth $40k+ in advisory.)",
                    "The 5 questions every founder should answer in a daily voice note. That is the entire content bank.",
                    "How to ship one long video per week without you in the chair every day.",
                  ],
                },
                {
                  axis: 'Access',
                  sub: 'The door. One destination, named and pointed to.',
                  hooks: [
                    "What it actually looks like inside The Authority Engine 90 day install.",
                    "If you are scaling between $400k and $5M, this is the install for you. Here is what is included.",
                    "Inside the Boardroom: who it is for, what it costs, what walks out the door at day 90.",
                  ],
                },
              ].map((group, i) => (
                <div key={i} className="glow-card p-5 mb-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{group.axis}</span>
                  </div>
                  <p className="text-zinc-500 text-xs italic mb-4">{group.sub}</p>
                  <ul className="space-y-2.5">
                    {group.hooks.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-zinc-600 text-xs font-mono mt-1 flex-shrink-0">{String(j + 1).padStart(2, '0')}</span>
                        <p className="text-white text-sm leading-relaxed italic">'{h}'</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 09.2 FORMAT MIX + ADS VS ORGANIC */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.2</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Format mix and the ads vs organic split</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Which formats earn attention, which build authority, which compound. Plus what runs paid and what runs organic.
              </p>

              <p className="text-zinc-300 font-semibold mb-3">Primary signature format</p>
              <div className="glow-card border-blue-500/30 p-5 mb-6">
                <p className="text-white font-semibold mb-1">Long form YouTube. 8 to 20 minutes.</p>
                <p className="text-zinc-400 text-sm leading-relaxed">The format the audience associates with you. Anchored by the 8 pillar videos. Every other format recycles from here.</p>
              </div>

              <p className="text-zinc-300 font-semibold mb-3">The recycle map</p>
              <div className="glow-card p-5 mb-8">
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  One pillar video becomes:
                </p>
                <ul className="space-y-1.5">
                  {[
                    '6 short form clips (60 to 90s vertical)',
                    '1 carousel breakdown (8 to 12 slides)',
                    '1 newsletter (long form, owned audience)',
                    '1 text thread (X or LinkedIn)',
                    '1 podcast clip or guest spot insert',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-zinc-300 font-semibold mb-3">Ads vs organic split</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glow-card p-5">
                  <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-3">Organic</p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'All 8 pillar long form videos',
                      'Short form clips (recycled from pillars)',
                      'Daily voice notes turned into posts',
                      'Carousels, threads, newsletter',
                      'Guest appearances, podcast clips',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-zinc-500 text-xs italic">Job: build trust deep. Watch time, email captures, DMs from ICPs.</p>
                </div>
                <div className="glow-card p-5">
                  <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-3">Paid</p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Trojan Horse VSL (Video 07 doubles as this)',
                      'Retargeting clips from past pillars',
                      'Lead magnet ads (the 3 magnets in 09.4)',
                      'Boost the best client story content',
                      'Boardroom landing page traffic',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-zinc-500 text-xs italic">Job: extend reach + accelerate qualified inbound. Lead cost, application volume.</p>
                </div>
              </div>
            </div>

            {/* 09.3 DEMAND BUCKETS */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.3</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Demand buckets</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Four content buckets, each tied to one of the belief layers from Section 01. Six content items per bucket. That is 24 pieces of content sequenced by belief.
              </p>

              {[
                {
                  bucket: 'Scaling without becoming the bottleneck',
                  belief: 'Self belief',
                  items: [
                    'How to scale past $400k without becoming the bottleneck',
                    "The hidden cost of being your own marketer",
                    'Operator install vs another content course',
                    'Why most fitness coaches plateau at the same revenue',
                    'What to delegate first, what to keep last',
                    "When to fire your editor (and how to know)",
                  ],
                },
                {
                  bucket: 'Authority via system, not via face',
                  belief: 'Brand belief',
                  items: [
                    'Personal brand vs authority system',
                    'Why category ownership beats personal brand at scale',
                    "The 5 A's explained for fitness operators",
                    'Named methodology examples that worked',
                    'How borrowed authority actually compounds',
                    'Why your content keeps working after you stop posting',
                  ],
                },
                {
                  bucket: 'Founder operations',
                  belief: 'Category belief',
                  items: [
                    'What I learned working with Taki Moore',
                    'What I got wrong with Mitch Revs in the first month',
                    'What changed when LSKD came on as a client',
                    'Behind the scenes of a Brand Day',
                    'Inside the Boardroom: what actually happens',
                    'My own monthly review process',
                  ],
                },
                {
                  bucket: 'Industry truth',
                  belief: 'Mechanism belief',
                  items: [
                    'Why most content coaches sound the same',
                    "The volume trap in fitness coaching content",
                    'Authority is inferred, not claimed',
                    'Why bigger audience does not equal better revenue',
                    'The wrong way to use AI in coaching content',
                    "Why 'just post more' does not work after $400k",
                  ],
                },
              ].map((bucket, i) => (
                <div key={i} className="glow-card p-5 mb-4">
                  <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
                    <p className="text-white font-semibold">{bucket.bucket}</p>
                    <p className="text-blue-400 text-xs italic">Bucket {i + 1} of 4</p>
                  </div>
                  <p className="text-zinc-500 text-xs mb-4">Linked to: <span className="text-blue-300 font-medium">{bucket.belief}</span></p>
                  <ul className="space-y-2">
                    {bucket.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="text-zinc-600 text-xs font-mono mt-0.5 flex-shrink-0">{String(j + 1).padStart(2, '0')}</span>
                        <p className="text-zinc-300 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 09.4 LEAD MAGNET TRIO */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.4</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">Lead magnet trio</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Three magnets. Map, Audit, Playbook. Each one targets one of the 5 A's, resolves a specific tension, and earns the next step. Stacks like the LinkNinja bundle but built for this audience.
              </p>

              <div className="space-y-4">
                {[
                  {
                    magnet: 'The Map',
                    name: "The Authority Engine Blueprint",
                    targets: ['Attention', 'Alignment'],
                    tension: "I have no idea where to start.",
                    promise: "See the entire authority system on one page.",
                    pillar: 'Pillar Video 02 (The Positioning Play)',
                    tier: 'Give. Open. Ungated.',
                  },
                  {
                    magnet: 'The Audit',
                    name: "The 5 A's Scorecard",
                    targets: ['Authority', 'Achievability'],
                    tension: "I don't know which part of my content engine is leaking.",
                    promise: "Self-rate across Attention, Alignment, Authority, Achievability, Access. Know exactly which A is leaking.",
                    pillar: 'Pillar Video 05 (The Signature Framework)',
                    tier: 'Give-give.',
                  },
                  {
                    magnet: 'The Playbook',
                    name: "The 8 Video Foundation Playbook",
                    targets: ['Achievability', 'Access'],
                    tension: "I know what to do, I don't know how to ship it.",
                    promise: "The 8 video types with working titles and the order to film them.",
                    pillar: 'Pillar Video 06 (Expertise Compression)',
                    tier: 'Data exchange.',
                  },
                ].map((m, i) => (
                  <div key={i} className="glow-card p-5">
                    <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                      <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold">{m.magnet}</p>
                      <p className="text-zinc-500 text-xs italic">{m.tier}</p>
                    </div>
                    <p className="text-white font-semibold text-lg mb-3">{m.name}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {m.targets.map((t, j) => (
                        <span key={j} className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full border border-blue-500/40 bg-blue-500/10">{t}</span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">Tension it resolves</p>
                      <p className="text-zinc-300 text-sm italic mb-3">'{m.tension}'</p>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">Promise on the headline</p>
                      <p className="text-zinc-300 text-sm mb-3">{m.promise}</p>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">Pillar video that delivers it</p>
                      <p className="text-zinc-400 text-sm">{m.pillar}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 09.5 30 DAY PIPELINE */}
            <div className="mb-16">
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.5</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">30 day pipeline</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Four weeks of named, sequenced pieces. Leads with the four Authorship-gap videos from 08.5 (Videos 03, 04, 05, 07) since that is the trust pocket to push for the next 60 days.
              </p>

              <div className="space-y-4">
                {[
                  {
                    week: 'Week 01',
                    pillar: 'Pillar Video 07 — Counterintuitive Shift',
                    title: "'Why fitness founders chasing volume are running the wrong playbook'",
                    pieces: [
                      'Mon: Pillar long form (15 min)',
                      'Tue: Short clip 01 (volume trap moment)',
                      'Wed: Carousel (the 3 patterns of plateau)',
                      'Thu: Short clip 02 (Mitch Revs result)',
                      'Fri: Newsletter (the long form essay)',
                      'Sat: Short clip 03 (one-line takeaway)',
                      'Sun: Thread (the contrarian belief stated plainly)',
                    ],
                  },
                  {
                    week: 'Week 02',
                    pillar: 'Pillar Video 04 — Accessible Masterclass',
                    title: "'The single content move that took Mitch Revs from 19k to 50k followers in 60 days'",
                    pieces: [
                      'Mon: Pillar long form (12 min)',
                      'Tue: Short clip 01 (the move named)',
                      'Wed: Carousel (the before/after)',
                      'Thu: Short clip 02 (what NOT to do)',
                      'Fri: Newsletter (the play in detail)',
                      'Sat: Short clip 03 (operator anyone can copy)',
                      'Sun: DM-style post asking who wants the bundle',
                    ],
                  },
                  {
                    week: 'Week 03',
                    pillar: 'Pillar Video 05 — The Signature Framework',
                    title: "'The 5 As: how authority actually gets built (not bought)'",
                    pieces: [
                      'Mon: Pillar long form (20 min)',
                      'Tue: Short clip 01 (Attention explained)',
                      'Wed: Short clip 02 (Alignment explained)',
                      'Thu: Carousel (all 5 A\'s on one card)',
                      'Fri: Newsletter (the framework deep dive)',
                      'Sat: Short clip 03 (the Authority pillar)',
                      'Sun: Lead magnet launch (The Map)',
                    ],
                  },
                  {
                    week: 'Week 04',
                    pillar: 'Pillar Video 03 — Tactical Niche Operator',
                    title: "'Three patterns I see in fitness operators who scale past $2M'",
                    pieces: [
                      'Mon: Pillar long form (15 min)',
                      'Tue: Short clip 01 (pattern 1)',
                      'Wed: Short clip 02 (pattern 2)',
                      'Thu: Short clip 03 (pattern 3)',
                      'Fri: Newsletter (the full breakdown)',
                      'Sat: Carousel (the patterns with named operators)',
                      'Sun: Audit tool launch (The Scorecard)',
                    ],
                  },
                ].map((week, i) => (
                  <div key={i} className="glow-card p-5">
                    <div className="mb-3">
                      <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-1">{week.week}</p>
                      <p className="text-white font-semibold text-sm mb-1">{week.pillar}</p>
                      <p className="text-zinc-400 text-sm italic">{week.title}</p>
                    </div>
                    <ul className="space-y-1.5 border-t border-zinc-800/60 pt-3">
                      {week.pieces.map((piece, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs">
                          <div className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 flex-shrink-0" />
                          <span className="text-zinc-400 leading-relaxed">{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 09.6 THE SYSTEM */}
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">09.6</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">The system that runs without you</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Roles, cadence, capture, packaging, KPIs. Production breaks down without ownership. Below: who owns what, what gets shot when, what gets measured.
              </p>

              {/* Roles */}
              <p className="text-zinc-300 font-semibold mb-3">Roles</p>
              <div className="space-y-3 mb-8">
                {[
                  { role: 'Founder (Rhys)', owns: 'Recorded reps, contrarian takes, voice notes, strategic decisions, milestone approvals.' },
                  { role: 'Creative director / Editor', owns: 'Translation of voice into edited pieces, packaging, weekly cadence.' },
                  { role: 'Producer / Operator', owns: 'Shoot days, scheduling, asset library, distribution checklist, weekly scorecard.' },
                ].map((r, i) => (
                  <div key={i} className="glow-card p-4">
                    <p className="text-white font-semibold text-sm mb-1">{r.role}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{r.owns}</p>
                  </div>
                ))}
              </div>

              {/* Cadence */}
              <p className="text-zinc-300 font-semibold mb-3">Cadence</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {[
                  { label: 'Shoot day', value: '1 per fortnight, 4 hours, two pillars filmed' },
                  { label: 'Review cadence', value: 'Weekly. Operator runs the scorecard. Founder reviews patterns.' },
                  { label: 'KPI check in', value: 'Monthly. What worked, what gets cut, what doubles down.' },
                ].map((c, i) => (
                  <div key={i} className="glow-card p-4">
                    <p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-1">{c.label}</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{c.value}</p>
                  </div>
                ))}
              </div>

              {/* Capture setup */}
              <p className="text-zinc-300 font-semibold mb-3">Capture setup</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  { env: 'Studio desk (primary)', use: 'Pillar long form. Frameworks, breakdowns, signature pieces.' },
                  { env: 'Whiteboard wall (secondary)', use: 'Teach pieces, signature framework reveals, live-build sessions.' },
                  { env: 'Walking shot (supplementary)', use: 'Hot takes, daily voice notes, short form rants.' },
                  { env: 'Client site / boardroom (supplementary)', use: 'Behind the scenes, live workshop moments, character content.' },
                ].map((env, i) => (
                  <div key={i} className="glow-card p-4">
                    <p className="text-white font-semibold text-sm mb-1">{env.env}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{env.use}</p>
                  </div>
                ))}
              </div>

              {/* Packaging */}
              <p className="text-zinc-300 font-semibold mb-3">Packaging signature</p>
              <div className="glow-card p-5 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Palette</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">Two to three colours your audience associates with you. Define on the Brand Day shoot.</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Type</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">One display headline + one body voice + one mono caption. Same across every piece.</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Motif</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">A recurring visual signature. Numbered chapter card, single blue underline, or black-on-paper teardown.</p>
                  </div>
                </div>
              </div>

              {/* KPIs */}
              <p className="text-zinc-300 font-semibold mb-3">Distribution KPIs (first 90 days)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div className="glow-card p-4">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">Surface metrics</p>
                  <ul className="space-y-1.5 text-sm">
                    {['Views and reach (context only)', 'Subscriber growth', 'Engagement rate'].map((k, i) => (
                      <li key={i} className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" /><span className="text-zinc-400">{k}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="glow-card border-blue-500/30 p-4">
                  <p className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold mb-2">Conversion metrics (the ones to watch)</p>
                  <ul className="space-y-1.5 text-sm">
                    {['Lead magnet conversion rate per pillar', 'DM quality and volume from ICPs', 'Watch time on high-intent videos', 'Replies that reference specific pain points', 'Boardroom application volume'].map((k, i) => (
                      <li key={i} className="flex items-start gap-2"><div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-300">{k}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottleneck */}
              <div className="glow-card border-blue-500/30 p-6">
                <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-4">Bottleneck check</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">Bottleneck today</p>
                    <p className="text-white text-sm leading-relaxed">Volume of pillar long form. The 8 video foundation has to exist before the recycle machine can run.</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">What unlocks it</p>
                    <p className="text-white text-sm leading-relaxed">Fortnightly shoot day, two pillars per shoot, operator-led packaging and scheduling.</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">Next 30 day move</p>
                    <p className="text-white text-sm leading-relaxed">Lock the first 4 pillars (Videos 03, 04, 05, 07). Ship them weekly. Spin up the lead magnet trio in parallel. By Week 04, the audit tool launches and inbound segments itself.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
