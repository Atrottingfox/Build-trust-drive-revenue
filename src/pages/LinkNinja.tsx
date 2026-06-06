import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, AlertCircle } from 'lucide-react';
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

export default function LinkNinja() {
  return (
    <PasswordGate storageKey="linkninja-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="LinkNinja. A read on the category play."
        description="Strategic notes on the move from coach to category owner. Notes, not a pitch."
        path="/linkninja"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic read · For discussion</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              LinkNinja.
              <br />
              <span className="text-zinc-500">A read on the category play.</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-medium italic">Notes, not a pitch</span>
            </div>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              What it takes to make "serious LinkedIn leads" associated with you in the minds of your market. Sharing the thinking so you can use it however you want.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 WHERE YOU ARE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="Where you are" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                The path is problem to promise to product to market. You have already done three.
              </p>
              <p>
                Problem owned. People weren't getting leads on LinkedIn. Promise made. We will get you X with LinkedIn. Product built. The portal does the work.
              </p>
              <p className="text-zinc-300 font-medium">
                The next move is owning the marketing of LinkedIn as a whole. The category. That's the play.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 WHAT MARKETING ACTUALLY IS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="What marketing actually is" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Marketing is what other people say about you. Not what you say about you. If that's the rule, the question becomes how do you get the right other people saying the right things about you in the right rooms.
              </p>
              <p>
                Two routes. Direct, where you reach their audience. Indirect, where you break the audience open through a podcast or a consulting session.
              </p>
              <p className="text-zinc-300 font-medium">
                Consulting sessions are the strongest indirect play. The guest borrows their trust onto you. You own the category through the format itself.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 WHY CONSULTING SESSIONS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Why consulting sessions own the category" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              The format does three things at once that nothing else does as cleanly.
            </p>
            <ul className="space-y-5">
              <li>
                <p className="text-white font-semibold mb-1">It borrows trust</p>
                <p className="text-zinc-400 text-sm leading-relaxed">The guest is credible to your audience. Their credibility rubs off in the act of you hosting them well.</p>
              </li>
              <li>
                <p className="text-white font-semibold mb-1">It owns the mechanism</p>
                <p className="text-zinc-400 text-sm leading-relaxed">The structure of the session itself becomes proprietary. The way you walk people through the questions is the mechanism nobody else can claim.</p>
              </li>
              <li>
                <p className="text-white font-semibold mb-1">It compounds</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Each guest extends the credibility umbrella. The next guest is easier to land because the last one made you legible. The audience starts anticipating the format.</p>
              </li>
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 THE BELIEF STACK */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="The belief stack each session helps you break" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every viewer arrives with four gates that have to shift before they buy. The session is engineered to walk people through them.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold mb-2">Category belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"LinkedIn matters for B2B leads." If they're watching, this is mostly broken. The easy gate.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Mechanism belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"Your method is different." This is the hardest. The session lets you show your mechanism in real time, applied to a real operator's situation. Hard to copy. Hard to argue with.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Self belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"If they can, I can." This is where the aspirational and relatable bridge matters (next section).</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Timing belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"Now is the moment." Handled either by scarcity in the room, or by the natural urgency the guest creates by being early to something.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 ASPIRATIONAL + RELATABLE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="Aspirational and relatable, at the same time" />
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                You can't only bring on whales. The audience watches and thinks "that's not me." You can't only bring on people the audience already feels equal to. There's nothing to reach for.
              </p>
              <p>
                The play is both. The 10M business and the 5 person team. Same principle, different scale. The audience self selects up or down.
              </p>
              <p className="text-zinc-300 font-medium">
                Principles travel up and down. Tactics don't. That's why the category gets owned by people who can chunk up to principles, not the ones who just collect hacks.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 WHAT THIS BUYS YOU */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="What this buys you" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                A category that gets owned through the mechanism instead of through louder claims. Borrowed trust compounding through the talent layer instead of leaking through paid spend.
              </p>
              <p>
                When the SaaS pivot lands, the demand pulls it through. Not because you rebranded as a software company. Because the market already associates the way LinkedIn should work with the way you do it.
              </p>
              <p className="text-zinc-300 font-medium">
                That's the category play. The consulting session is the vehicle.
              </p>
            </div>
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
              If any of it lands, run with it. Happy to talk through any one piece.
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
