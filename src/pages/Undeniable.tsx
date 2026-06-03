import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Layers, RefreshCw, Calendar, FileText, Check, Compass, Eye, Zap, Megaphone, Shield, AlertCircle, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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

export default function Undeniable() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Undeniable — 90 Day Trust Path Install"
        description="A diagnostic and 90 day install. One documented trust path from cold to continuity. So Undeniable becomes the obvious category king for 7 figure online PTs."
        path="/undeniable"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">For Undeniable · Diagnostic & 90 day install</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                Install a trust path that takes cold fitness coaches from stranger to sold in 90 days.
                <br />
                <span className="text-zinc-500">And makes Undeniable the obvious category king for 7 figure online PTs.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                We design and install one repeatable sequence of content, lead assets, and event touchpoints that speeds up trust, fills the room with the right PTs, and moves more of them into continuity. Your team knows exactly how people go from never heard of you to I have to be in this room.
              </p>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">In 90 days, you'll have</p>
              <ul className="space-y-3 max-w-2xl">
                {[
                  'A single, documented cold to warm to room to continuity path your team can point at.',
                  'A 90 day publishing and lead asset plan tuned for trust, not just views.',
                  'A scoreboard that tells you if the trust path is working, instead of guessing off vibes.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHY THIS EXISTS */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why we are doing this</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              8 figure upside.
              <br />
              <span className="text-zinc-500">Fitness first.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                Undeniable has 8 figure upside. A room plus continuity model with the right people is structurally capable of that.
              </p>
              <p>
                The point of this project is not to lock you into fitness forever. The point is to make you the biggest fish in the most profitable pond you already own. Online coaches and PTs who want 7 figures.
              </p>
              <p className="text-zinc-300 font-medium">
                Step 1: build the trust path that makes you category king for 7 figure online PTs. Step 2: decide, with data, when to jump to the ocean and punch above your weight.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What this is, for both of us</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              The next 12 to 24 months.
              <br />
              <span className="text-zinc-500">Three things at once.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <ul className="space-y-2 pl-2">
                {[
                  'A trust engine that reliably takes cold fitness coaches from stranger to sold.',
                  'A high margin cashflow layer on top of what you already do.',
                  'A distribution and proof engine for both of us.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We are not trying to force a two events per month 8 figure empire in 90 days. We are installing one documented trust path, stacking cash and insane results, and then letting real demand tell us how far to push it.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 1: CURRENT REALITY */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · Current reality</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Where Undeniable
              <br />
              <span className="text-zinc-500">is right now.</span>
            </h2>
            <div className="glow-card p-8 md:p-10">
              <ul className="space-y-5">
                {[
                  "You've already built a room and continuity model that works for 7 figure online PTs and fitness founders.",
                  "You're moving from warm heavy to more cold traffic and content. You can feel the list warming slowing down.",
                  "You want to speed up trust from stranger to I have to be in this room. Especially as you push harder into YouTube and content.",
                  "You don't yet have one documented trust path your team can point at and say: this is how someone goes from first touch to room to continuity.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Eye className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 2: GOAL + SUCCESS CRITERIA */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · What we are trying to do</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              The goal of this
              <br />
              <span className="text-zinc-500">90 day test.</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-3xl mb-8">
              In the next 90 days, the goal is to install a simple, testable trust path that:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Target,
                  title: 'Cold to continuity',
                  description: 'Takes cold fitness coaches from stranger, to warm, to room, to continuity.',
                },
                {
                  icon: BookOpen,
                  title: 'Clear team plan',
                  description: 'Gives your team a clear plan for what to publish, which lead magnets to use, and what to say at each step.',
                },
                {
                  icon: BarChart3,
                  title: 'Honest decision data',
                  description: "Lets us both look at the numbers and decide: do we want to keep working together? And if so, how?",
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

            <div className="glow-card border-blue-500/20 p-8 mb-12 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                This is a test of the system and of how we work together. Not a forever contract.
              </p>
            </div>

            {/* Success criteria */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Success criteria</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              How we'll know it worked.
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
              By Day 90 we want to see:
            </p>
            <ul className="space-y-3 max-w-3xl mb-8">
              {[
                'A documented, simple cold to warm to room to continuity path we both agree on.',
                "A 6 week YouTube and Instagram program you'd be happy to re run.",
                'An agreed % of new room buyers coming through the new path, not just legacy warm. (Number set in Phase 1.)',
                'An agreed number of qualified new conversations per month clearly traceable to the new trust path. (Number set in Phase 1.)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl font-medium">
              If we hit or trend toward those, we talk about continuing. If we don't, we fix it or we stop.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 3: GAPS, STRENGTHS, OPPORTUNITIES */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Strengths. Gaps.
              <br />
              <span className="text-zinc-500">Opportunities.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Strengths</p>
                <ul className="space-y-2">
                  {[
                    'Clear avatar and result. 7 figure online PTs.',
                    'A room that already delivers serious outcomes.',
                    'Social proof and word of mouth momentum building.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Compass className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Gaps</p>
                <ul className="space-y-2">
                  {[
                    'No single, documented customer journey from cold to sold.',
                    'Hooks and content formats that work are not yet systemised into a bank your team can re use.',
                    'YouTube not yet leveraged as the deep trust channel.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Zap className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Opportunities · Next 90 days</p>
                <ul className="space-y-2">
                  {[
                    'Turn your best existing clients and advocates into a visible invisible hand. Testimonials, stories, and content where they do the selling.',
                    'Build a 6 week YouTube and Instagram program so you know exactly what to shoot and why.',
                    'Design a small set of lead magnets and nurture emails so people have everything they need to go from just found you to I am in.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 4: INVISIBLE HAND */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · The invisible hand we are about to unlock</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              When your clients
              <br />
              <span className="text-zinc-500">do the talking.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              You're on the verge of a heavy word of mouth phase. Lots more clients whose story rhymes. Lots more social proof.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Users,
                  title: 'Visible advocates',
                  description: 'Turn your best clients into testimonials, breakdowns, and story content. Their words, not just yours.',
                },
                {
                  icon: Video,
                  title: 'Their stories as core content',
                  description: 'Use client stories as the spine of content and ads, not just your face. Trust transfers faster from peer to peer.',
                },
                {
                  icon: Megaphone,
                  title: 'Time on brand plays',
                  description: 'Boost the best stories as paid distribution. Not cold ads. Proof at scale.',
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

            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl font-medium">
              The aim. Your clients do more of the talking. The trust path feels like a self fulfilling prophecy, not paid traffic on life support.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 5: STRATEGIC RISK */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · The strategic risk we are avoiding</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Don't jump markets yet.
              <br />
              <span className="text-zinc-500">Refill the pond first.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-10">
              <p>
                The temptation right now is to jump to general service businesses because fitness is getting more expensive to acquire.
              </p>
              <p className="text-zinc-300 font-medium">My view for the next 90 days.</p>
            </div>

            <ul className="space-y-3 max-w-3xl mb-10">
              {[
                'We double down on fitness. Build the trust path. Use it to refill the pond.',
                'We collect data on who is raising their hand from outside fitness.',
                'At the end of the 90 days we decide, with data, what a service business lane should look like. If at all.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                The whole point is to make Undeniable so strong in your current market that the next market pulls you in. Not so you can run away from CAC.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 6: 90 DAY OUTLINE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · The plan</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              90 day outline.
              <br />
              <span className="text-zinc-500">No fluff.</span>
            </h2>

            <div className="space-y-8">
              {/* Weeks 1-2 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 1–2</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Map and design the trust path
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>One in person or deep dive session with you and your creative director.</p>
                  <p>We map your current content, funnels, and where leads actually come from. Then the ideal path from first touch to room to continuity. We agree the success metrics that decide Day 31 and Day 90.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Deliverables</p>
                <ul className="space-y-2">
                  {[
                    'Customer Journey Map. Cold to warm to room to continuity.',
                    'Simple brand deck and voice card. What you stand for. How you sound. What to avoid.',
                    'List of required lead magnets and proof assets.',
                    'Agreed success metrics for the 90 days.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weeks 3-6 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 3–6</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Build the first 6 week content and lead plan
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Design a 6 week YouTube program. 6 to 8 video outlines with titles, hooks, and CTAs tied to Undeniable.',
                    'Design a parallel Instagram rhythm. Weekly themes, post types, and CTAs, so your team knows what to shoot.',
                    'Build or refine 2 to 3 lead magnets and the follow up emails that move people towards the room.',
                    'Start a Hook Bank. What is working. What is not. And why.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weeks 7-12 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">03</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 7–12</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Run, review, and refine
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>Your team runs the plan. I act as advisor.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Cadence in this phase</p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Monthly founder and CD review on what is working.',
                    'Weekly Loom reviews and operator questions via a simple framework.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">What we tighten</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">Hooks, offers, placements, and lead magnets. Based on real data, not opinion.</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">End of 90 days</p>
                <ul className="space-y-2">
                  {[
                    'One documented trust path.',
                    'One working 6 week content cycle you can re run.',
                    'A clear view of what happens if we keep going.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 7: DELIVERABLES */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · Deliverables</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              What you'll have
              <br />
              <span className="text-zinc-500">in your hands.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              A pack you can hand straight to the team.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Compass,
                  title: 'Customer Journey Map',
                  description: 'Cold to room to continuity.',
                },
                {
                  icon: Mic,
                  title: 'Voice Card and Brand Deck',
                  description: "What's on brand. What isn't.",
                },
                {
                  icon: Target,
                  title: 'Hook Bank',
                  description: 'Your best angles so far. Tested, sorted, ready to re run.',
                },
                {
                  icon: Video,
                  title: '6 Week YouTube Plan',
                  description: 'Titles, hooks, CTAs, outlines.',
                },
                {
                  icon: Calendar,
                  title: '6 Week Instagram Rhythm',
                  description: 'Themes, formats, CTAs.',
                },
                {
                  icon: FileText,
                  title: 'Lead Magnet and Email Map',
                  description: 'What each asset is. When it is used.',
                },
                {
                  icon: BookOpen,
                  title: 'Do and Do Not list',
                  description: 'Short reference for your marketing going forward.',
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

      {/* SECTION 8: HOW WE WORK */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">08 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Cadence.
              <br />
              <span className="text-zinc-500">Expectations.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the trust path and 6 week plans.',
                    'Advise on hooks, formats, and lead magnets. Not write or edit everything.',
                    'Read the data with you and suggest next best moves.',
                    'Show up at your event each month and test the ideas live with the room.',
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
                    'Implement. Film, edit, publish, build funnels, send emails.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from the room and the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Events & speaking */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Events & speaking · Shots on goal</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              On your stage every month.
              <br />
              <span className="text-zinc-500">Part of the test.</span>
            </h3>
            <div className="glow-card p-8 mb-12 max-w-3xl">
              <p className="text-zinc-400 leading-relaxed mb-5">
                For the 90 days, we test how we work together by:
              </p>
              <ul className="space-y-3 mb-5">
                {[
                  "Me getting a segment at each monthly event to teach or debrief the trust path.",
                  "Using those sessions as content and feedback loops. What lands. What confuses the room.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                This gives me reps on your stage and lets us see, in real time, how the strategy lands with your people.
              </p>
            </div>

            {/* Cadence */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Week 1</p>
                <p className="text-zinc-400 text-sm leading-relaxed">In person intensive. Half or full day with you and your creative director.</p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Weeks 2 to 12</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per fortnight. You and CD.',
                    '1x Operator Clinic per fortnight for implementation questions.',
                    'Up to 1 Loom per week for asset review.',
                    'Live stage segment at each monthly event.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Commercials */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Commercials</p>
            <div className="glow-card border-blue-500/20 p-8">
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p className="text-white text-base font-medium">
                  90 day advisory and install: AUD $40,000.
                </p>
                <p className="text-zinc-400 text-sm">
                  Split $20,000 on signing and $20,000 on Day 31. Day 31 only flows if you show up, your team executes, and we are hitting or trending toward the agreed metrics.
                </p>
                <p className="text-zinc-500 text-sm pt-2 border-t border-zinc-800/50">
                  At Day 90 we both decide. Continue in advisory. Do something deeper. Or shake hands and move on.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 9: DAY 90 DECISION */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">09 · What happens at Day 90</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              We sit down.
              <br />
              <span className="text-zinc-500">We choose one of three.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              We look at the trust path we've installed. The numbers from the last cycle. How it's felt working together. Then we pick.
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
                  description: 'Talk about a more formal partnership or Room OS build. The 12 month version of this.',
                },
                {
                  icon: X,
                  num: '03',
                  title: 'Stop here',
                  description: 'You keep all the assets and insights. We chalk it up as a finished project.',
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

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                No pressure either way. The 90 days are about testing the system and the fit.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              You are already doing the hard part.
            </h2>
            <p className="text-zinc-400 mb-3 leading-relaxed">
              Filling and leading a room.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              My job is to install the trust path that fills it on autopilot. Without you becoming a full time creator.
            </p>
            <a
              href="mailto:sean@authorityengine.com.au?subject=Undeniable%20Trust%20Path%20Install"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">30 to 45 minutes. We walk through your current room, events, and media. If it is a fit, we lock dates. If not, I tell you straight.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
