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
        title="LinkNinja Category Ownership"
        description="Your path to owning the category of LinkedIn. Strategic memo."
        path="/linkninja"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic memo · For discussion</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              LinkNinja
              <br />
              <span className="text-zinc-500">Category Ownership.</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-medium italic">Notes, not a pitch</span>
            </div>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Your path to owning the category of LinkedIn.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 THE ARC */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="The arc" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Problem to promise to product to market. You have done three.
              </p>
              <p>
                Problem owned. People weren't getting leads on LinkedIn. Promise made. We will get you X with LinkedIn. Product built. The portal does the work.
              </p>
              <p className="text-zinc-300 font-medium">
                The next move is owning the market. The category. That's the play.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 MARKETING IS WHAT OTHER PEOPLE SAY */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="Marketing is what other people say about you" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Not what you say about you. If that's the rule, the move is to pair yourself with people who are aspirational and embody the identity of your ideal consumer.
              </p>
              <p>
                The fastest way to do that is borrow trust from people who already have it.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 BORROWING TRUST */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Borrowing trust" />
            <p className="text-zinc-400 leading-relaxed mb-6">Two routes.</p>
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-white font-semibold mb-1">Direct</p>
                <p className="text-zinc-400 text-sm leading-relaxed">You reach their audience.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Indirect</p>
                <p className="text-zinc-400 text-sm leading-relaxed">You break their audience open through a podcast or a consulting session.</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed font-medium">
              Consulting sessions are the strongest indirect play. The person running them borrows trust and owns the category based on the problem they are solving.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 THE MECHANISM */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="What makes the session a category owning mechanism" />
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                You need a method other people can follow. That is how you own the mechanism.
              </p>
              <p>
                For the consulting session, three core areas you are looking out for inside any guest's situation.
              </p>
            </div>
            <div className="space-y-3 mb-8">
              <p className="text-white font-semibold">Content. DMs. Funnels.</p>
            </div>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                It creates predictable behaviour. How somebody comes in. What problems they face. The process for getting through them. The audience watches and sees themselves on the same path. The format itself becomes the mechanism.
              </p>
              <p className="text-zinc-300 font-medium">
                Each guest faces a sequence of problems. The audience anticipates the same problems coming for them. That's how a session becomes proprietary.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 BELIEF STACK */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="The belief stack each session walks through" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Four beliefs gate every purchase. The session is engineered to break them in order.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold mb-2">Category belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"LinkedIn matters for my business." Mostly broken if they are watching. Easy gate.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Mechanism belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"Your method is different." The hardest gate and the one that costs the most deals. Overcome with proprietary frameworks, principles that guide decisions, and procedures other people can follow.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Self belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"If they can, I can." Harder when the guest is purely aspirational. Bridge with relatable examples.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Timing belief</p>
                <p className="text-zinc-400 text-sm leading-relaxed">"Now is the moment." Handled with scarcity, urgency, or the natural pressure of the guest being early to something.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 ASPIRATIONAL + RELATABLE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="Aspirational and relatable, at the same time" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Self belief lives or dies here. Pure aspiration creates distance. Pure relatability gives nothing to reach for.
              </p>
              <p>
                The play is both. The 10M business and the 5 person team. Same principle, different scale.
              </p>
              <p className="text-zinc-300 font-medium">
                When the message chunks up to principles, it works for someone at 10M and for someone with a 5 person team. The audience self selects. Principles travel up and down. Tactics don't.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 HOW BELIEF SHIFTS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="07" title="How belief actually shifts" />
            <p className="text-zinc-400 leading-relaxed mb-6">
              The instinct is to dismiss the current belief. Don't. Acknowledge it. It is there. It is not their fault. There is a new way to see it.
            </p>
            <div className="space-y-5 mb-8">
              <div>
                <p className="text-white font-semibold mb-1">Acknowledge</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Name the current belief. Show you understand why it exists.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Dismantle</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Pull it apart with your own data. Let people see the flaws in their own logic.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Install</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Put the new belief in its place. Back it with examples and proof.</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed font-medium">
              Then walk to the next gate. One, two, three, four.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 CURRENT REQUIRED */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="08" title="Current beliefs and required beliefs" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Mapping current to required is underrated, rarely properly done, and gives the most leverage. Three examples.
            </p>
            <div className="space-y-6">
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Current</p>
                <p className="text-white font-semibold mb-3">"LinkedIn is lame."</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed">"My audience is on LinkedIn. Nobody else is showing up there, so it is easy to own."</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Current</p>
                <p className="text-white font-semibold mb-3">"It takes too much time."</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed">"It is as easy as knowing who the person is and being able to find them. Sales Nav."</p>
              </div>
              <div className="glow-card p-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Current</p>
                <p className="text-white font-semibold mb-3">"LinkedIn audiences don't buy."</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed">"They do, when the message is direct and the path to the next step is obvious."</p>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              Once you know the required belief, every piece of content, every DM, every funnel step is built to install it.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 09 DIFFERENTIATED CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="09" title="The only things you can actually claim" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Anyone can post the same hook. Anyone can copy the same CTA. Three things are uniquely yours.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold mb-2">Stories</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Your clients' journeys. Their words, their results. Self trust transfer.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Data</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Individual (case studies, testimonials) and aggregate (across all clients). Authority trust transfer.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Experiences</p>
                <p className="text-zinc-400 text-sm leading-relaxed">What you have seen, done, and heard. Personal trust transfer.</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed mt-8 font-medium">
              Bake all three into the sessions and the content that comes off them. Differentiation nobody can copy.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 10 SOFT CLOSE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="10" title="The soft close" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                You do not need a hard sell or a clear CTA if you have engineered a soft, insinuated outcome.
              </p>
              <p>
                Give people the opportunity to come to their own logical conclusion. Put two ideas close enough together that the conclusion is obvious. They walk to the next step themselves.
              </p>
              <p className="text-zinc-300 font-medium">
                That's category ownership. The audience doesn't get pitched. They arrive.
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
