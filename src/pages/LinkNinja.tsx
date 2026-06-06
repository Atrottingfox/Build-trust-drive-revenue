import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, FileText, Check, Compass, Eye, Zap, Shield, AlertCircle, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

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

export default function LinkNinja() {
  return (
    <PasswordGate storageKey="linkninja-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="LinkNinja. 90 Day Authority Engine"
        description="Pivot from coach to category owner. Borrow trust. Install the mechanism. Own the LinkedIn market."
        path="/linkninja"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">90 Day Plan</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The LinkNinja
                <br />
                Authority Engine.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                Pivot from coach to category owner. From owning the problem, to owning the market.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · THE GOAL */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · The Goal</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Own the category.
              <br />
              <span className="text-zinc-500">Pivot to the product.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                The path is problem to promise to product to market. You've already done three of the four.
              </p>
              <p>
                Problem owned. People weren't getting leads on LinkedIn. Promise made. We will get you X with LinkedIn. Product built. The portal does the work.
              </p>
              <p className="text-zinc-300 font-medium">
                The next step is to own the marketing of LinkedIn as a whole.
              </p>
            </div>

            <div className="max-w-3xl mt-12 space-y-4">
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 1.</span> Borrow trust from aspirational category owners.
              </p>
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 2.</span> Compound that trust into the software.
              </p>
            </div>

            <div className="max-w-3xl mt-12">
              <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
                But first.
                <br />
                <span className="text-blue-400">Build the mechanism.</span>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE CHALLENGE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Challenge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Problem owned.
              <br />
              <span className="text-zinc-500">Market still up for grabs.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4 mb-6">
                {[
                  'The problem is owned. People know LinkedIn matters for B2B leads.',
                  'The promise is real. You have delivered measurable outcomes for clients.',
                  'The product is live. The portal does the work.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-sm italic pl-8">
                Three out of four.
              </p>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl mb-10 font-medium">
              Marketing is what other people say about you. Right now you say it about you. The play is to have others say it about you. That's how you go from product to category.
            </p>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">The gap</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A trust borrowing mechanism your team can run. One that compounds into the software.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE OPPORTUNITY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Borrow trust.
              <br />
              <span className="text-zinc-500">Install the mechanism.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-16">
              <p>
                The fastest way to own a category is to borrow trust from aspirational people who already have it. Two routes. Direct, where you reach their audience. Indirect, where you break the audience open through a podcast or a consulting session.
              </p>
              <p className="text-zinc-300 font-medium">
                Consulting sessions are the strongest indirect play. The guest borrows trust. You own the category through the mechanism.
              </p>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Success criteria · Agreed in Phase 1</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">
              How we'll know it worked.
            </h3>
            <ul className="space-y-4 max-w-3xl mb-10">
              {[
                'A documented LinkedIn Authority Engine. Content. DMs. Funnels. The mechanism your team can run.',
                'A repeatable Consulting Session format that borrows trust and installs belief in the same hour.',
                'An agreed % of new leads coming through the consulting session pipeline, traceable to specific guests.',
                'An agreed number of qualified product trials sourced from content tied to the mechanism.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-zinc-300 leading-relaxed max-w-3xl font-medium">
              <p>If we hit or trend toward those, we talk about continuing.</p>
              <p>If we don't, we fix it or we stop.</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 · THE DIAGNOSTIC */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Strengths. Gaps.
              <br />
              <span className="text-zinc-500">Opportunities.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Strengths</p>
                <ul className="space-y-3">
                  {[
                    'A real product solving a real problem.',
                    'Audience already believes LinkedIn matters for B2B leads.',
                    'Client results stack a long tail of proof.',
                    'Founder authority on the platform is established.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Compass className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Gaps</p>
                <ul className="space-y-3">
                  {[
                    'No proprietary mechanism documented. Content, DMs, Funnels exist but are not codified.',
                    'No aspirational and relatable bridge engineered into the content.',
                    'Belief architecture is intuitive, not mapped. Current to required not written down.',
                    'Trust assets (stories, data, experiences) are scattered, not banked.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Zap className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Opportunities · Next 90 days</p>
                <ul className="space-y-3">
                  {[
                    'Launch a Consulting Session series that borrows trust from aspirational guests.',
                    'Document the LinkedIn Authority Engine. The mechanism gets named, the IP gets owned.',
                    'Build the belief architecture and trust asset banks so the team can run the mechanism without you.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 · THE 90 DAY PLAN */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · The 90 day plan</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Install the LinkNinja Authority Engine.
              <br />
              <span className="text-zinc-500">Content. DMs. Funnels.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Three core mechanisms. Each one with named problems, repeatable belief overcomes, and proprietary frameworks. Plus the connective tissue that turns it into a monthly demand cycle.
            </p>

            {/* The 3 core mechanisms */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core mechanisms</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Zap,
                  title: 'Content',
                  description: 'The discovery layer. Frameworks for hooks, formats, and angles that name the problem and install the required belief.',
                },
                {
                  icon: Mic,
                  title: 'DMs',
                  description: 'The qualification layer. Scripts, sequences, and sales nav plays that turn interest into a call without burning trust.',
                },
                {
                  icon: Layers,
                  title: 'Funnels',
                  description: 'The conversion layer. The path from consulting session viewer to product trial to paid customer.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Plus the connective tissue */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Video,
                  title: 'Consulting Session Format',
                  description: 'The repeatable show structure. The guest borrows trust. You install belief. The format itself becomes the mechanism.',
                },
                {
                  icon: BookOpen,
                  title: 'Belief Architecture',
                  description: 'Current beliefs to required beliefs, mapped per category. Plus the repeatable lines and overcomes that move people through them.',
                },
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'A value first video sales letter for the SaaS. Seeds the product while delivering the mechanism. Sells without feeling like a sale.',
                },
                {
                  icon: Shield,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. Captures the brand, the mechanism, the asset banks, and the cycle in one place.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-6 mb-16 max-w-3xl">
              <p className="text-white text-sm leading-relaxed font-medium">
                Mechanism named. Trust borrowed. Beliefs installed. The category gets owned.
              </p>
            </div>

            {/* Phases */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three phases</p>
            <div className="space-y-8">
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 01 · Build · 4 to 6 hours</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Extract the mechanism. Map the beliefs.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    Brand Day intensive. One in person session with you and your content lead. Four to six hours. Two hours with you. The rest with your team.
                  </p>
                  <p>
                    We extract the mechanism. Content, DMs, Funnels. The proprietary frameworks. The current beliefs your audience holds and the required beliefs they need to buy. Everything gets built and documented live.
                  </p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By end of Phase 1</p>
                <ul className="space-y-2">
                  {[
                    'Documented LinkedIn Authority Engine. Content, DMs, Funnels with named problems and proprietary frameworks.',
                    'Belief Architecture mapped. Current to required, per category, with repeatable overcomes.',
                    'Consulting Session format drafted, ready to run with the first aspirational guest.',
                    'Agreed success metrics for the 90 days.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 02 · Install · Weeks 1 to 4</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Run the first consulting session cycle.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    One 60 minute call per week with your content lead. Founder welcome.
                  </p>
                  <p>
                    The Consulting Session format runs live. The mechanism gets refined inside real conversations. Trust asset banks (stories, data, experiences) get built from session output. Trojan Horse VSL gets drafted off the same material.
                  </p>
                </div>
              </div>

              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">03</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 03 · Tune · Weeks 5 to 12</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Tune the engine based on data.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    Your team runs the cycle. I act as advisor. We tighten the mechanism, the belief overcomes, and the VSL on real data. We test the strongest formats with the next set of aspirational guests.
                  </p>
                  <p>
                    End of 90 days you have a documented LinkNinja Authority Engine, a repeatable Consulting Session format, and a clear view of what happens if we keep going.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 · STRATEGIC RISK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · The strategic risk we are avoiding</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Don't outpace the proof.
              <br />
              <span className="text-zinc-500">Borrow it first.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-10">
              <p>
                The temptation when pivoting to a SaaS is to ramp brand spend, run direct response, and try to manufacture category ownership.
              </p>
              <p className="text-zinc-300 font-medium">Here's my view for the next 90 days.</p>
            </div>

            <ul className="space-y-3 max-w-3xl mb-10">
              {[
                'We borrow trust from aspirational category owners before we claim category ownership ourselves.',
                'Consulting sessions become the mechanism. Each guest extends the credibility umbrella over LinkNinja.',
                'At the end of the 90 days we decide, with data, where to push the brand layer harder. If at all.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">First goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Make LinkNinja so visibly credible through borrowed trust that the SaaS pivot lands without resistance. Demand pulls the product through.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 · INVISIBLE HAND */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · The invisible hand we are about to unlock</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              When aspirational meets
              <br />
              <span className="text-zinc-500">relatable.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              Categories get owned by people who can chunk up to the principles. Show the 10M business and the 5 person team. The principles are the same. The audience self selects up or down.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Users,
                  title: 'Aspirational reference',
                  description: 'Guests the audience wants to become. Their trust gets borrowed onto the mechanism.',
                },
                {
                  icon: BarChart3,
                  title: 'Relatable proof',
                  description: 'Examples that look like the viewer. Make the path accessible. Make the principle stick.',
                },
                {
                  icon: Compass,
                  title: 'Principle compression',
                  description: 'Same fundamentals at every scale. The principles travel up and down with the audience.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5 text-zinc-300 leading-relaxed max-w-3xl">
              <p>
                Every consulting session episode references the next. Every guest extends the credibility umbrella.
              </p>
              <p className="font-medium">
                Category ownership compounds through the mechanism. Not through louder claims.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 · DELIVERABLES */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">08 · Deliverables</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              A comprehensive Brand Bible.
              <br />
              <span className="text-zinc-500">Plus the install around it.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              The Brand Bible is the centerpiece. Everything else is built on top so the team can run the engine without you. Whatever we decide at Day 90, all of this is yours.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Complete Brand Bible',
                  description: 'Voice, positioning, narrative, beliefs, origin story, archetype profile. Identity extracted. Category lens locked. All documented and ready to hand to any operator or team member.',
                },
                {
                  icon: Layers,
                  title: 'LinkedIn Authority Engine Map',
                  description: 'Content, DMs, Funnels. The three core mechanisms documented with named problems and proprietary frameworks.',
                },
                {
                  icon: Video,
                  title: 'Consulting Session Format',
                  description: 'The repeatable show structure. Guest selection criteria, belief overcoming script, hook and CTA patterns.',
                },
                {
                  icon: Target,
                  title: 'Belief Architecture',
                  description: 'Current beliefs to required beliefs, per category. With the repeatable lines and stories that move people through them.',
                },
                {
                  icon: FileText,
                  title: 'Trust Asset Bank',
                  description: 'Stories (self trust), data (authority trust), experiences (personal trust). Banked, sorted, ready to deploy.',
                },
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'A value first video sales letter for the SaaS. Seeds the product while delivering the mechanism. Sells without feeling like a sale.',
                },
                {
                  icon: Calendar,
                  title: 'Monthly Cycle Plan',
                  description: 'Themes, hooks, topics. The plug and play structure your team re runs every month around the consulting session cadence.',
                },
                {
                  icon: Shield,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. Brand, mechanism, asset banks, and cycle in one place.',
                },
                {
                  icon: Settings,
                  title: 'Do and Do Not list',
                  description: 'Short marketing reference your team uses going forward.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 09 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">09 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the Authority Engine. The core mechanisms, the belief architecture, and the consulting session format.',
                    'Advise on hooks, formats, lead magnets, and longform structure. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                    'Show up live in a session each month to teach, coach, or guest as the format requires.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Your team's role</p>
                <ul className="space-y-3">
                  {[
                    'Implement. Film, edit, publish, run DMs, wire up the funnels.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from sessions and the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 01 · Build</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">4 to 6 hours</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Brand Day intensive. One in person session with you and your content lead.</p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 02 · Install</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 1 to 4</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per week with your content lead.',
                    'Founder welcome.',
                    'The engine gets built and the first cycle runs.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 03 · Tune</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 5 to 12</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per fortnight with you and your content lead.',
                    '1x Operator Clinic per fortnight for implementation questions.',
                    'Up to 1 Loom per week for asset review.',
                    '24 hour feedback via WhatsApp.',
                    'Live in one session per month.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 10 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">10 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">So we both stay sharp.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              For clarity on both sides.
            </p>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I design, advise, and read the data with you.',
                  'This is not a guarantee of revenue or product trials. We agree the metrics. We test. The data tells us what worked.',
                  'This is not full time CMO services. I show up for the cadence we agreed. Not in your inbox at 11pm.',
                  'This is not a content factory. I do not write or edit every script. Your team produces.',
                  'This is not a forever contract. At Day 90 we both pick.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 11 · DAY 90 DECISION */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">11 · What happens at Day 90</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              We sit down.
              <br />
              <span className="text-zinc-500">We pick one of three.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              We look at the engine we have installed. The numbers from the last cycle. How it has felt working together. Then we pick.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: RefreshCw,
                  num: '01',
                  title: 'Keep going in advisory',
                  description: 'Keep tuning the engine. Expand what works. Monthly rhythm.',
                },
                {
                  icon: Layers,
                  num: '02',
                  title: 'Go deeper',
                  description: 'A more formal partnership or longer build. The 12 month version of this.',
                },
                {
                  icon: X,
                  num: '03',
                  title: 'Stop here',
                  description: 'You keep every asset and insight. We chalk it up as a finished project.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0 mb-3 md:mb-0">
                      <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{item.num}</p>
                    </div>
                    <div className="flex-1">
                      <item.icon className="w-5 h-5 text-blue-400 mb-3" />
                      <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              You've built the product.
            </h2>
            <p className="text-zinc-500 italic mb-6 leading-relaxed">
              Now let's build the market that pulls it through.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Marketing is what other people say. My job is to engineer the mechanism that gets them saying it.
            </p>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">30 to 45 minutes. We walk through logistics, build the plan. If it is a fit, we lock dates. If not, I tell you.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
