import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Download, FileText, Compass, Layers, Zap, Shield, BookOpen, Users } from 'lucide-react';
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
        title="LinkNinja: Owning the Category of LinkedIn Lead Gen"
        description="Strategic memo for Matt. Your path to owning the category of LinkedIn Lead Gen."
        path="/linkninja"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic memo</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              LinkNinja.
              <br />
              <span className="text-zinc-500">Owning the category of LinkedIn Lead Gen.</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
              Whether you're injecting another acquisition channel for the next $10M, or landing your first 10 clients, the same tips, tools, and tactics apply. Principles travel up and down. Tactics don't.
            </p>
          </Section>
        </div>
      </section>

      {/* INTRO CTA - BUNDLE */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="glow-card border-blue-500/30 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-zinc-300 font-semibold text-lg mb-1">Download the bundle.</p>
                  <p className="text-zinc-500 text-sm">Everything in this memo, plus the audit and the next steps.</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  { label: 'Lab notes', desc: 'Breakdown of what got uncovered, by problem.' },
                  { label: 'Right next steps', desc: 'For content, DMs, and funnels, mapped to where the audit lands you.' },
                  { label: 'Full summary', desc: 'What gets covered in the next session, the next bucket, the next move.' },
                  { label: 'Audit tool', desc: 'Self-rate across content, DMs, and funnels. Short videos at the top of each answer point at the right next step.' },
                  { label: '7-day free trial', desc: 'Of the LinkNinja tool, ungated, no card required.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">
                      <span className="text-white font-medium">{item.label}.</span>{' '}
                      <span className="text-zinc-400">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors"
              >
                Get the bundle
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 MARKETING INSTALLS TRUST */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="Marketing installs trust and conviction" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Marketing installs trust and conviction. Marketing inspires action.
              </p>
              <p>
                Brand is what increases the perceived likelihood that the outcome will be delivered on. The marketing job is to make that increase happen consistently and predictably.
              </p>
              <p className="text-zinc-300 font-medium">
                Trust on its own does nothing. Trust paired with conviction makes operators buy.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 TWO COMPONENTS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="Borrow trust, then build credibility on top" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Two components build a category-owning position. They run in order.
            </p>
            <div className="space-y-5 mb-10">
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Component 01</p>
                <p className="text-white font-semibold text-lg mb-1">Borrow trust.</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Pair yourself with people who already have it. Their audience extends to you by association.</p>
              </div>
              <div className="glow-card p-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-2">Component 02</p>
                <p className="text-white font-semibold text-lg mb-1">Build credibility on top.</p>
                <p className="text-zinc-400 text-sm leading-relaxed">Stack proof, mechanism, and live demonstrations on top of borrowed audiences. Each session compounds the next.</p>
              </div>
            </div>

            <p className="text-zinc-300 font-semibold mb-3">Two routes to borrowing it.</p>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-white font-semibold mb-1">Direct.</p>
                <p className="text-zinc-400 text-sm leading-relaxed">You reach their audience. Podcast guest spots, paid features, joint webinars.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Indirect.</p>
                <p className="text-zinc-400 text-sm leading-relaxed">You break their audience open. Run a consulting session with one operator and the rest of the audience watches themselves on the same path.</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed font-medium">
              The indirect play is the stronger one. Consulting sessions borrow trust, demonstrate credibility, and surface character live. All three pockets get filled in one move.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 THREE POCKETS OF TRUST */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Three pockets of trust" />
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
                <p className="text-zinc-400 text-sm leading-relaxed">
                  The base layer. You've done it before. You know your shit. This is your jam. Credibility is doing the thing, proven by record.
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
                  The layer above credible. Thought leader. Category owner. The way you get from credible to authority is borrowing audiences and chunking up.
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed italic">
                  If you're speaking to nine-figure founders every day, everyone below (eight-figure, seven-figure, six-figure) chunks up and assumes a higher probability you can solve their problem too.
                </p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <p className="text-blue-300 text-xs font-bold">03</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Character.</p>
                    <p className="text-blue-400 text-xs italic mt-0.5">'I will deliver on what I say.'</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Authority says you can. Character says you will. Character closes deals.
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Character shows up in damaging admissions, in vulnerability, in unfiltered moments, in the absence of flashy edits. The more an operator can see through the polish, the more they trust. Authenticity over production value.
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mt-8 font-medium">
              The consulting session hits all three in one move. Authority because you borrow the category position. Character because you're live, unfiltered. Credibility because there's no edit room between the question and the answer.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 THE BELIEF STACK */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="The belief stack for Matt's audience" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Five core beliefs gate every purchase. For Matt's audience, four of them are already mostly broken. The gap is mechanism.
            </p>

            <div className="space-y-5 mb-10">
              <div className="glow-card p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-white font-semibold">Category belief</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Mostly broken</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'I need LinkedIn lead gen.'</p>
                <p className="text-zinc-500 text-xs leading-relaxed">The domain is already there. Sophisticated buyer. Don't waste time teaching them they need leads on LinkedIn.</p>
              </div>

              <div className="glow-card border-blue-500/40 p-6 shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-blue-300 font-semibold">★ Mechanism belief</p>
                  <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">The opportunity</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                <p className="text-white text-sm leading-relaxed mb-3 italic">'This is just another DM tool.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                <p className="text-blue-300 text-sm leading-relaxed mb-3 italic">'This is a proprietary system, refined across 148,000 conversations over three years, that has generated $3.5M in sales.' (Placeholder figures, confirm with Matt.)</p>
                <p className="text-zinc-400 text-xs leading-relaxed">Mechanism = unique + original + proven. This is the bridge from 'just another tool' to category-owning system.</p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-white font-semibold">Authority / Founder belief</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Bridge needed</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'Credible operator. Probably not a thought leader.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'Category owner. Thought leader in LinkedIn lead gen.'</p>
                <p className="text-zinc-500 text-xs leading-relaxed">The gap from credible to authority. Bridged by borrowing audiences and chunking up. Speak to the operator above their level, they assume you can solve theirs.</p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-white font-semibold">Self belief</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Mostly broken</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'It would work for them, but probably not for me.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'If they can, I can. Same principle, different scale.'</p>
                <p className="text-zinc-500 text-xs leading-relaxed">Bridged by being aspirational and relatable at the same time. Principles travel. Tactics don't.</p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-white font-semibold">Timing belief</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">Mostly broken</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'Now is fine. I just need permission to act.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Required</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'There is no better window than now.'</p>
                <p className="text-zinc-500 text-xs leading-relaxed">Handled with the natural pressure of being early to an underrated channel.</p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed font-medium">
              The bigger the gap, the more priority that belief gets in the content rhythm. Mechanism is the priority. Then authority/founder. The rest get maintenance, not focus.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 PROPRIETARY MECHANISM */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="How Taki cracks mechanism every video" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every YouTube video Taki produces is built on the same four ingredients. They make every piece feel proprietary.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: BookOpen, label: 'Proprietary information', desc: 'Data, frameworks, or sequences only he can claim.' },
                { icon: Compass, label: 'Specific strategy', desc: "A defined sequence with steps. Not 'best practices' dressed up." },
                { icon: Shield, label: 'Proven + reliable', desc: 'Number of times it has been run. Real outcomes attached.' },
                { icon: Users, label: 'Story or done deal', desc: 'A live example, a named client, a real result.' },
              ].map((item, i) => (
                <div key={i} className="glow-card p-5">
                  <item.icon className="w-4 h-4 text-blue-400 mb-3" />
                  <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Reverse engineer it for Matt. Each video = one proprietary mechanism applied to one problem. Each problem = one piece of credibility data plus one client story. Each session = the mechanism shown live, unfiltered.
            </p>
            <p className="text-zinc-300 leading-relaxed mt-4 font-medium">
              When viewers see a unique mechanism for every problem they face, comparison stops. There is nothing to compare against.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 CONTENT / DMS / FUNNELS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="Content. DMs. Funnels." />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every consulting session walks the same three buckets in the same order. The format becomes the proprietary process. Each guest faces the same sequence. The audience anticipates each problem coming for them.
            </p>

            <div className="space-y-5">
              <div className="glow-card p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-blue-400 text-sm font-bold">01</span>
                  <p className="text-white font-semibold text-lg">Content.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The problem</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'Posting and getting no traction. Wasting time. Ghostwriting. AI slop. No process anyone can repeat.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The mechanism</p>
                <p className="text-zinc-400 text-sm leading-relaxed">A plug-and-play system built on the niche, the expertise, and the operator's voice. Predictable. Repeatable. Your team can run it.</p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-blue-400 text-sm font-bold">02</span>
                  <p className="text-white font-semibold text-lg">DMs.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The problem</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'People scroll. They like. They never engage. They never convert.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The mechanism</p>
                <p className="text-zinc-400 text-sm leading-relaxed">A process that moves the right people from passive (like) to active (conversation) to paying. Simple, repeatable, refined across 148,000 conversations.</p>
              </div>

              <div className="glow-card p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-blue-400 text-sm font-bold">03</span>
                  <p className="text-white font-semibold text-lg">Funnels.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The problem</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">'The right people leak. The data doesn't get captured. Back-end sales get left on the table.'</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">The mechanism</p>
                <p className="text-zinc-400 text-sm leading-relaxed">A pipeline that captures data, segments by intent, and makes the back-end sales obvious. The right people land in the right place automatically.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 VIDEO STRUCTURE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="07" title="The video structure" />
            <p className="text-zinc-400 leading-relaxed mb-8">
              Every video runs the same shape so the audience can predict and trust it. Predictability is part of the mechanism.
            </p>

            <div className="space-y-4">
              <div className="glow-card p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">0 to 10 sec</span>
                  <p className="text-white font-semibold">Relatable pain.</p>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">The avatar instantly sees themselves. Frustration named. Tension installed.</p>
              </div>

              <div className="glow-card p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">10 to 30 sec</span>
                  <p className="text-white font-semibold">Proof, promise, plan.</p>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">15-second credibility soundbite (signal of intention). What they get from watching. The path the video will walk.</p>
              </div>

              <div className="glow-card p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Middle</span>
                  <p className="text-white font-semibold">Three core problems.</p>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">Content, DMs, funnels (or another set of three from this guest's situation). Cuts between the consultant naming the problem and the guest unlocking on the answer.</p>
              </div>

              <div className="glow-card p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Inside 2 min</span>
                  <p className="text-white font-semibold">Outcome shown.</p>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">The audience knows exactly what they're getting from the rest of the video. Clear line from in to out.</p>
              </div>

              <div className="glow-card p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Throughout</span>
                  <p className="text-white font-semibold">Bundle capture.</p>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">Click-to-capture for the bundle (work notes, audit, free trial). Tension drives curiosity. Curiosity drives the click.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 ASPIRATIONAL + RELATABLE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="08" title="Aspirational and relatable, at the same time" />
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Self-belief lives or dies here. Pure aspiration creates distance. Pure relatability gives nothing to reach for.
              </p>
              <p>
                The play is both. The $10M operator looking for an extra acquisition channel. The founder landing their first 10 clients. Same principle, different scale.
              </p>
              <p className="text-zinc-300 font-medium">
                When the message chunks up to principles, it works for both. The audience self-selects. Principles travel up and down. Tactics don't.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 09 THE PITCH */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="09" title="The pitch reads as recognition" />
            <div className="glow-card border-blue-500/30 p-6 md:p-8 mb-8">
              <p className="text-white text-lg leading-relaxed font-medium italic">
                'You're already doing the work. You're already the expert. What you actually need is a simple, repeatable process your team can run, that adds an additional channel where you have no competition.'
              </p>
            </div>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                LinkedIn lead gen is the underrated play. Not sexy. Clunky. Takes time. Most operators skip past it.
              </p>
              <p>
                Once the operator is trained correctly and everything is plug-and-play, the founder doesn't have to do anything. That's the beauty. The lift sits inside the operator layer, not the founder layer.
              </p>
              <p className="text-zinc-300 font-medium">
                Done right, this adds a lead gen channel that lifts sales by 30% or more for most businesses (placeholder figure, confirm with Matt's record).
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
              If any of it lands, dig into the bundle above. Happy to talk through any one piece.
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
