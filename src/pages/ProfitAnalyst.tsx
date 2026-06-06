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

type Belief = { category: string; sub: string; currents: string[]; required: string };

const BELIEFS: Belief[] = [
  {
    category: 'Category',
    sub: 'What they currently believe about profit analysis as a category',
    currents: [
      "'My accountant already runs my numbers. I don't need a second set of eyes.'",
      "'Profit consulting is just rebranded bookkeeping with a higher price tag.'",
      "'My business is profitable. There's nothing hidden to find.'",
      "'I've sat through budget review sessions before. They told me what I already knew.'",
    ],
    required: "'Compliance accounting and profit analysis are different jobs. My accountant isn't built to find what this workshop finds.'",
  },
  {
    category: 'Mechanism',
    sub: 'What they think about how the workshop actually works',
    currents: [
      "'It'll be another spreadsheet exercise. Nothing I haven't already done.'",
      "'These workshops are just sales pitches for a bigger consulting package.'",
      "'Two hours can't possibly surface anything I haven't seen.'",
      "'It's going to be generic frameworks dressed up as bespoke advice.'",
    ],
    required: "'The workshop runs a specific question sequence I haven't been asked before. The questions are the actual product. Operators don't think to ask themselves these things.'",
  },
  {
    category: 'Founder',
    sub: 'What they assume about Gavin specifically',
    currents: [
      "'He's an advisor. Advisors haven't actually run what I run.'",
      "'My industry is different enough that he won't get the nuance.'",
      "'He'll give me the same playbook he gives everyone.'",
      "'Smart guy. But hasn't lived the operational mess I'm in.'",
    ],
    required: "'He runs multiple of his own businesses. He's been in the chair. He's also honest about what he gets wrong, which most aren't.'",
  },
  {
    category: 'Self',
    sub: 'What they believe about themselves walking in',
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
    sub: 'Why they think later is fine',
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
          <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
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
      { tier: 'Identity', text: 'Restaurant operator running $1.5M who hates seeing the GST bill more than the tax bill.', potency: 4, note: 'A real person. Specific revenue, specific pain.' },
      { tier: 'Category', text: 'Hospitality founders.', potency: 3, note: 'Broader. Loses the operational pain that made the identity nod.' },
      { tier: 'Industry', text: 'Food and beverage businesses.', potency: 2, note: 'Industry label. Generic enough nobody sees themselves in it.' },
      { tier: 'State', text: 'SMB owners.', potency: 1, note: 'The label nobody uses about themselves. Almost invisible.' },
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
      { tier: 'Identity', text: "Shopify founder at $3M who can't tell which SKUs are actually profitable after returns and ad spend.", potency: 4, note: 'Pain is hyper specific. The right founder leans in.' },
      { tier: 'Category', text: 'DTC brand operators.', potency: 3, note: 'Common label. Loses the specific blind spot.' },
      { tier: 'Industry', text: 'E-commerce businesses.', potency: 2, note: 'Too broad. Different operators with different problems.' },
      { tier: 'State', text: 'Online retailers.', potency: 1, note: 'A descriptor, not an identity. Easy to skip past.' },
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
      { tier: 'Identity', text: "Creative agency owner at 12 staff who books $2M revenue but can't tell which clients are losing him money.", potency: 4, note: 'Specific size, specific structure, specific problem.' },
      { tier: 'Category', text: 'Service business founders.', potency: 3, note: 'Wide. Covers people whose problems are nothing alike.' },
      { tier: 'Industry', text: 'Professional services.', potency: 2, note: 'Industry term. Almost institutional.' },
      { tier: 'State', text: 'Small business owners.', potency: 1, note: 'Nobody calls themselves this. Invisible.' },
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

      <div className="space-y-3 mb-12">
        {current.tiers.map((row, i) => {
          const isOpen = openTier === i;
          const opacity = 0.5 + (row.potency / 4) * 0.5;
          return (
            <motion.button
              key={`${selected}-${i}`}
              onClick={() => setOpenTier(isOpen ? null : i)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`glow-card w-full text-left p-5 transition-colors ${isOpen ? 'border-blue-500/30' : 'hover:border-zinc-700'}`}
              style={{ opacity }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest w-20 flex-shrink-0">{row.tier}</p>
                  <p className="text-white font-medium text-sm leading-relaxed">{row.text}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {[1, 2, 3, 4].map(p => (
                    <div
                      key={p}
                      className={`w-1.5 h-5 rounded-full transition-colors ${p <= row.potency ? 'bg-blue-400' : 'bg-zinc-800'}`}
                    />
                  ))}
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
                    <p className="text-zinc-400 text-sm leading-relaxed pt-3 pl-24">{row.note}</p>
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

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
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
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="The specificity stack" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every offer pulls on a few specificity levers. Tighten one, the others can loosen. Loosen one, the others have to compensate. The trap is loosening all of them at once because each one feels safer on its own.
            </p>

            <p className="text-zinc-300 font-semibold mb-2">Avatar chunking</p>
            <p className="text-zinc-500 text-sm mb-5">Pick a scenario. Watch potency drop as you chunk up.</p>
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
      <section className="py-16 md:py-20">
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
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Authority and authenticity" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Two axes carry trust. Both have to be near max. Most operators run hard at one and forget the other.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-white font-semibold mb-2 text-lg">Can they deliver?</p>
                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-3">Authority</p>
                <ul className="space-y-2">
                  {[
                    'Named proprietary mechanism. Something only you can claim.',
                    'Aggregate data. The number across all the workshops.',
                    'Individual data. Specific clients, specific results.',
                    'IP. Frameworks, sequences, decision rules you built and others use.',
                    'Stories. Past work that proves the principle holds.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-2 text-lg">Will they deliver for me?</p>
                <p className="text-zinc-500 text-sm uppercase tracking-widest mb-3">Authenticity</p>
                <ul className="space-y-2">
                  {[
                    'Damaging admissions. The things you got wrong, on camera, named.',
                    'Behind the scenes from your own operations. The honest version.',
                    "Native language. Speak the way your audience speaks when they're alone.",
                    'Industry knowledge they can verify with one question.',
                    'Specific moments where you decided not to take the easy money. They notice.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mt-8 font-medium">
              When both are near max, comparison stops. Prospects stop shopping the category and start trying to work with you specifically.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 OUTCOMES + SPECIFICITY */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="Outcomes without overpromising" />
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                Nobody buys coaching. Nobody buys consulting. They buy the outcome the mechanism delivers. The mechanism is just how you get there. Sell the result of the mechanism.
              </p>
              <p>
                The trap is overpromising. You can't promise a number for a specific person you've never met. What you can do is point at the historic data and let the average do the work.
              </p>
            </div>

            <div className="glow-card border-blue-500/20 p-6 mb-10">
              <p className="text-blue-400 font-semibold text-sm mb-3">How that sounds</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">
                'Across the last fifteen workshops with operators between $1M and $5M revenue, the average profit found on the day is $X. Some find more. Some find less. That's where the average sits.'
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Specific. Defensible. Defended by the proof bank behind it. No promise made about any one individual.
              </p>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
              The other half of this is mechanism. Own it. Name it. Sequence it. Have a defensible answer for every problem that comes up.
            </p>
            <p className="text-zinc-300 leading-relaxed font-medium">
              When the audience feels 'this guy has an answer for everything,' the outcome feels assured even when you never claimed it. The mechanism does the heavy lifting the promise can't.
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
