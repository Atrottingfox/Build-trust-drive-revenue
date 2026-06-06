import React from 'react';
import { motion } from 'framer-motion';
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

export default function ProfitAnalyst() {
  return (
    <PasswordGate storageKey="profitanalyst-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="Profit Analyst Analysis"
        description="Strategic analysis. Quick overview, current state, where the leverage sits."
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
              Profit Analyst
              <br />
              <span className="text-zinc-500">Analysis.</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Quick overview. Current state. Where the leverage sits.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 CURRENT STATE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="Current state" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                Huge credibility. Wicked product. Awesome opportunity. Serious impact.
              </p>
              <p>
                The work is real. The price point holds at $5,000 a workshop. You run multiple businesses yourself, which almost nobody else in this lane can claim. The workshops shift actual numbers on actual profit lines.
              </p>
              <p>
                The opportunity sits one layer above all of that. The way the work gets described doesn't yet match how undeniable the work actually is. The product is ahead of the message. Closing that gap is the entire game.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 THE ARC */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="The arc" />
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                Problem to promise to product to category. The first three are done.
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-white font-semibold mb-1">Problem owned</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Operators leave profit on the table without realising. The numbers tell the story their gut doesn't.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Promise made</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Walk in with a P&L. Walk out with hidden profit named and a plan to recover it.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Product built</p>
                <p className="text-zinc-400 text-sm leading-relaxed">The workshop. In person, $5k, repeatable, delivers.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Category, not yet</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"Find the hidden profit in your business" isn't yet associated with the Profit Analyst. The work is bigger than the brand. That's the move to make next.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 THE SPECIFICITY STACK */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="The specificity stack" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every offer pulls on a few specificity levers. Tighten one, the others can loosen. Loosen one, the others have to compensate. The trap is loosening all of them at once because each one feels safer on its own.
            </p>

            <p className="text-zinc-300 font-semibold mb-4">Avatar chunking, most to least potent</p>
            <div className="space-y-3 mb-10">
              <div className="glow-card p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Identity</p>
                <p className="text-white text-sm leading-relaxed">Restaurant operator running $1.5M who hates seeing the GST bill more than the tax bill.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Category</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Hospitality founders.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Industry</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Food and beverage businesses.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">State</p>
                <p className="text-zinc-500 text-sm leading-relaxed">SMB owners.</p>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
              Each chunk up dilutes potency. People don't think of themselves as "SMB owners." They think of themselves as the operator of a thing they can name.
            </p>

            <p className="text-zinc-300 font-semibold mb-4">If you chunk up the avatar, the other levers compensate</p>
            <ul className="space-y-3">
              {[
                { name: 'Problem specificity', desc: '"You\'re paying yourself last and don\'t actually know your hourly rate." Hyper specific. The right person nods.' },
                { name: 'Promise specificity', desc: '"$50k of hidden profit named in 90 minutes, or we work for free until we find it." Concrete. Time bound. Defensible.' },
                { name: 'Language specificity', desc: 'Native to the operator. The way they talk to their accountant when the accountant isn\'t in the room.' },
                { name: 'Outcome specificity', desc: 'A number, defended by historic data. Not "improve profit." A figure that sits in their account.' },
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

      {/* 04 CURRENT TO REQUIRED BELIEFS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="Current and required beliefs" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every prospect carries beliefs that have to shift before they buy. Map the current. Map the required. Build the content that bridges them.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10 italic">
              Five worth mapping. The examples below are illustrative, not assumed.
            </p>

            <div className="space-y-8">
              {/* Category */}
              <div>
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Category</p>
                <div className="glow-card p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                  <p className="text-white mb-3">"My accountant handles this. He's fine."</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">"There is profit hiding in my business that compliance accounting won't find. That requires a different conversation."</p>
                </div>
              </div>

              {/* Mechanism */}
              <div>
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Mechanism</p>
                <div className="glow-card p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                  <p className="text-white mb-3">"I've worked with advisors before. Generic frameworks, no real edge."</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">"This guy runs a specific process I haven't seen anywhere else. The questions he asks and the order he asks them in is the actual product."</p>
                </div>
              </div>

              {/* Founder */}
              <div>
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Founder</p>
                <div className="glow-card p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                  <p className="text-white mb-3">"He doesn't get my business. Operators don't get operators unless they've run one."</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">"He runs multiple of his own. He's been in the chair. He's also honest about what he gets wrong, which is rare."</p>
                </div>
              </div>

              {/* Self */}
              <div>
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Self</p>
                <div className="glow-card p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                  <p className="text-white mb-3">"My business is too messy / too small / too specific. Won't work for me."</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">"Someone at my exact size with my exact mess got a real result. The proof is undeniable enough that I can't talk myself out of it."</p>
                </div>
              </div>

              {/* Timing */}
              <div>
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Timing</p>
                <div className="glow-card p-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                  <p className="text-white mb-3">"I'll get to this once the [current fire] is handled."</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">"The fire is the reason I should do this now. Every month I'm not running this analysis, the number my workshop would have surfaced is sitting in the business doing nothing."</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 AUTHORITY + AUTHENTICITY */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="Authority and authenticity" />
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
                    'Native language. Speak the way your audience speaks when they\'re alone.',
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

      {/* 06 OUTCOMES + SPECIFICITY */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="Outcomes without overpromising" />
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
                "Across the last fifteen workshops with operators between $1M and $5M revenue, the average profit found on the day is $X. Some find more. Some find less. That's where the average sits."
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Specific. Defensible. Defended by the proof bank behind it. No promise made about any one individual.
              </p>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6">
              The other half of this is mechanism. Own it. Name it. Sequence it. Have a defensible answer for every problem that comes up.
            </p>
            <p className="text-zinc-300 leading-relaxed font-medium">
              When the audience feels "this guy has an answer for everything," the outcome feels assured even when you never claimed it. The mechanism does the heavy lifting the promise can't.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CLOSING */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-zinc-400 mb-3 leading-relaxed text-lg">
              That's the read.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
              If any of it sparks something, happy to dig into any one piece.
            </p>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Want to dig into any of this?
              <ArrowRight className="w-4 h-4" />
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
