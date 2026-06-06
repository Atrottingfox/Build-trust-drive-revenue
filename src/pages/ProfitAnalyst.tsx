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

function BeliefCard({ category, current, required }: { category: string; current: string; required: string }) {
  const [view, setView] = useState<'current' | 'required'>('current');
  return (
    <div>
      <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">{category}</p>
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
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`leading-relaxed ${view === 'current' ? 'text-white' : 'text-zinc-300'}`}
          >
            {view === 'current' ? current : required}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SpecificityRow({ tier, label, example, potency }: { tier: string; label: string; example: string; potency: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(o => !o)}
      className="glow-card p-5 w-full text-left hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-center justify-between gap-4 mb-1">
        <div className="flex items-center gap-4 flex-1">
          <p className="text-zinc-500 text-xs uppercase tracking-widest w-20 flex-shrink-0">{tier}</p>
          <p className="text-white font-medium text-sm">{label}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-1.5 h-4 rounded-full ${i <= potency ? 'bg-blue-400' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
          <span className="text-zinc-600 text-xs ml-2">{open ? '−' : '+'}</span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 text-sm leading-relaxed pt-3 pl-24">{example}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
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
            <p className="text-zinc-500 text-sm mb-5">Tap a tier to see the example. Bars show relative potency.</p>
            <div className="space-y-3 mb-10">
              <SpecificityRow
                tier="Identity"
                label="Restaurant operator at $1.5M"
                example="Restaurant operator running $1.5M who hates seeing the GST bill more than the tax bill."
                potency={4}
              />
              <SpecificityRow
                tier="Category"
                label="Hospitality founders"
                example="Hospitality founders. Broader. Still legible. Loses the specific operational pain."
                potency={3}
              />
              <SpecificityRow
                tier="Industry"
                label="Food and beverage"
                example="Food and beverage businesses. Industry level. Generic enough that the person doesn't see themselves in it."
                potency={2}
              />
              <SpecificityRow
                tier="State"
                label="SMB owners"
                example="SMB owners. The label nobody uses about themselves. Almost invisible to the right person."
                potency={1}
              />
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
              Tap any card to flip between current and required. Examples are illustrative.
            </p>

            <div className="space-y-8">
              <BeliefCard
                category="Category"
                current="'My accountant handles this. He's fine.'"
                required="'There is profit hiding in my business that compliance accounting won't find. That requires a different conversation.'"
              />
              <BeliefCard
                category="Mechanism"
                current="'I've worked with advisors before. Generic frameworks, no real edge.'"
                required="'This guy runs a specific process I haven't seen anywhere else. The questions he asks and the order he asks them in is the actual product.'"
              />
              <BeliefCard
                category="Founder"
                current="'He doesn't get my business. Operators don't get operators unless they've run one.'"
                required="'He runs multiple of his own. He's been in the chair. He's also honest about what he gets wrong, which is rare.'"
              />
              <BeliefCard
                category="Self"
                current="'My business is too messy / too small / too specific. Won't work for me.'"
                required="'Someone at my exact size with my exact mess got a real result. The proof is undeniable enough that I can't talk myself out of it.'"
              />
              <BeliefCard
                category="Timing"
                current="'I'll get to this once the [current fire] is handled.'"
                required="'The fire is the reason I should do this now. Every month I'm not running this analysis, the number my workshop would have surfaced is sitting in the business doing nothing.'"
              />
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
