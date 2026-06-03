import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, Users, Layers, RefreshCw, Calendar, FileText, Check, Compass, Eye, Megaphone, X } from 'lucide-react';
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
        title="Undeniable — A Diagnostic and 90 Day Proposal"
        description="What I see at Undeniable. The opportunity I think you should lean into. And a simple 90 day plan to install the system that proves it."
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
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">For Undeniable · Diagnostic + 90 day proposal</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                Not a pitch.
                <br />
                <span className="text-zinc-500">A diagnostic. And a 90 day proposal.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                What I see at Undeniable right now. The strategic opportunity I think you should lean into. And a simple 90 day plan to install a methodical system that takes cold fitness coaches from stranger to sold. Designed as a test of the system and of how we work together.
              </p>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three things layered in this doc</p>
              <ul className="space-y-3 max-w-2xl">
                {[
                  'What I am seeing in your business right now. Stated as assumptions you can push back on.',
                  'Where I think the opportunity sits. The invisible hand of word of mouth that is about to swing in your favour.',
                  'What we would build, learn, and decide together over the next 90 days.',
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

      {/* WHY THIS MATTERS NOW */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why this matters now</p>
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
                Step 1: install the system that makes you category king there. Step 2: decide, with data, when to jump to the ocean.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 1: WHAT I AM SEEING */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · What I am seeing</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              My read of where
              <br />
              <span className="text-zinc-500">Undeniable is now.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              Stated as assumptions. Push back on anything that does not match how you see it.
            </p>
            <div className="glow-card p-8 md:p-10">
              <ul className="space-y-5">
                {[
                  "You have built a room and continuity model that works for 7 figure online PTs and fitness founders. The product is real.",
                  "You are moving from warm heavy to colder traffic and more content. You can feel the existing list warming slowing down.",
                  "The temptation right now is to jump markets, because fitness is starting to cost more to acquire. I do not think you should.",
                  "You are about to enter a heavy word of mouth phase. More clients whose stories rhyme. More social proof. The invisible hand is about to swing in your favour, if we set it up right.",
                  "You do not yet have one documented trust path your team can point at and say: this is how someone goes from first touch to room to continuity.",
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

      {/* SECTION 2: STRENGTHS / GAPS */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Strengths.
              <br />
              <span className="text-zinc-500">Gaps.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Strengths</p>
                <ul className="space-y-3">
                  {[
                    'Clear avatar and result. 7 figure online PTs.',
                    'A room that already delivers serious outcomes.',
                    'A growing wave of testimonials and advocates whose stories rhyme.',
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
                <ul className="space-y-3">
                  {[
                    'No single, documented customer journey from cold to sold.',
                    'Hooks and content formats that work are not yet systemised into a bank your team can re use.',
                    'YouTube and Instagram are not yet running as a planned 6 week cycle. Each week is a fresh question.',
                    'No structured library of lead magnets or nurture sequences that move people toward the room.',
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

      {/* SECTION 3: THE STRATEGIC OPPORTUNITY */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The strategic opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Do not jump markets.
              <br />
              <span className="text-zinc-500">Switch on the invisible hand.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-12">
              <p>
                The temptation when CAC rises is to jump markets. Most people do. The problem is the distribution layer they were missing in the first market follows them into the next.
              </p>
              <p className="text-zinc-300 font-medium">
                You are about to have a heavy word of mouth phase. The right move is not to chase a colder audience. It is to turn the advocates you are about to have into your distribution layer.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Users,
                  title: 'Advocates as content',
                  description: 'Their stories become the spine of your content. Not your face talking at people. Their words, their results, their language.',
                },
                {
                  icon: Megaphone,
                  title: 'Boost, not cold ads',
                  description: 'Boost the best client stories as paid distribution. Time on brand goes up. CAC quietly comes down. You are amplifying what is already working, not buying attention from scratch.',
                },
                {
                  icon: RefreshCw,
                  title: 'Self fulfilling prophecy',
                  description: 'The trust path stops feeling like paid traffic on life support. It feels like the room markets itself, because increasingly it does.',
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

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                Make Undeniable so strong in your current market that the next market pulls you in. Not so you can run away from CAC.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 4: WHAT I PROPOSE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · What I propose</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              90 days. Three monthly events.
              <br />
              <span className="text-zinc-500">A clean test of the system. And of us.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              I install the strategy, the plan, and the assets. Your team implements. I show up at each monthly event to teach, debrief, and test the strategy live in the room. Three months. A finite, honest experiment.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Target,
                  title: 'Install the system',
                  description: 'A simple, documented trust path. The brand and content layer your team can run. Lead assets people actually use.',
                },
                {
                  icon: Mic,
                  title: 'Three stage segments',
                  description: 'One slot at each monthly event over the 90 days. Lets us see how the strategy lands in the room in real time. Doubles as content and feedback.',
                },
                {
                  icon: Compass,
                  title: 'A clean Day 90 decision',
                  description: 'At Day 90 we both know exactly what worked, what did not, and whether continuing makes sense.',
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

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                This is a test of the system AND of how we work together. Not a forever contract.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 5: 90 DAY OUTLINE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · The outline</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              90 days.
              <br />
              <span className="text-zinc-500">Three phases.</span>
            </h2>

            <div className="space-y-8">
              {/* Weeks 1-2 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 1–2</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Diagnose and design
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>One in person session with you and your creative director. We map the real customer journey, agree the strategic narrative, and pin down the 6 week content cycle.</p>
                  <p>By end of Phase 1 we have a clear, documented trust path. Cold to warm to room to continuity. Your team can point at it.</p>
                </div>
              </div>

              {/* Weeks 3-6 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 3–6</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Build the 6 week cycle
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>Build a 6 week YouTube cycle. Plug and play outlines your team can re run. Your IP, our structure.</p>
                  <p>Build a parallel 6 week Instagram rhythm. Weeks have themes. Not every post specified, but your team knows what to shoot and why.</p>
                  <p>Lead magnets and nurture sequences designed and wired up. Hook bank started, with what is working and what is not.</p>
                </div>
              </div>

              {/* Weeks 7-12 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">03</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 7–12</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Run, review, refine
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>Your team runs the cycle. I act as advisor. We tighten hooks, formats, and lead magnets on real data, not opinion.</p>
                  <p>End of 90 days you have one documented trust path, one repeatable 6 week content cycle, and a clear view of what happens if we keep going.</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 6: WHAT YOU WALK AWAY WITH */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · What you walk away with</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              A pack you can hand
              <br />
              <span className="text-zinc-500">straight to the team.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Whatever we decide at Day 90, these assets are yours.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Compass,
                  title: 'Customer Journey Map',
                  description: 'Cold to room to continuity. The trust path your team executes against.',
                },
                {
                  icon: Mic,
                  title: 'Voice Card and Brand Deck',
                  description: 'How you sound. What you stand for. What is on brand and what is not.',
                },
                {
                  icon: Target,
                  title: 'Hook Bank',
                  description: 'Your best angles. Tested, sorted, ready to re run. Updated as you go.',
                },
                {
                  icon: Video,
                  title: '6 Week YouTube Cycle',
                  description: 'Plug and play outlines, hooks, CTAs. Your IP, our structure. Re run every cycle.',
                },
                {
                  icon: Calendar,
                  title: '6 Week Instagram Rhythm',
                  description: 'Weekly themes, post types, CTAs. Your team knows what to shoot and why.',
                },
                {
                  icon: FileText,
                  title: 'Lead Magnet and Email Map',
                  description: 'What each asset is. When it is used. How it moves people toward the room.',
                },
                {
                  icon: BookOpen,
                  title: 'Do and Do Not list',
                  description: 'Short marketing reference your team can use going forward.',
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

      {/* SECTION 7: HOW WE WORK */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles. Cadence.
              <br />
              <span className="text-zinc-500">Commercials.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the trust path, the 6 week cycles, and the lead asset map.',
                    'Advise on hooks, formats, and lead magnets. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                    'Show up at your monthly event to teach, debrief, and test the strategy in the room.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
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
                    '1x 60 minute call per fortnight with you and your CD.',
                    '1x Operator Clinic per fortnight for implementation questions.',
                    'Up to 1 Loom per week for asset review.',
                    'One stage segment at each of your three monthly events.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Commercials</p>
            <div className="glow-card border-blue-500/20 p-8">
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p className="text-white text-base font-medium">
                  90 day advisory and install: AUD $40,000.
                </p>
                <p className="text-zinc-400 text-sm">
                  Split $20,000 on signing and $20,000 on Day 31. Day 31 only flows if you show up, your team executes, and we are hitting or trending toward what we agreed in Phase 1.
                </p>
                <p className="text-zinc-500 text-sm pt-2 border-t border-zinc-800/50">
                  At Day 90 we both decide. Continue in advisory. Go deeper. Or shake hands and move on.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SECTION 8: DAY 90 DECISION */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">08 · What happens at Day 90</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              We sit down.
              <br />
              <span className="text-zinc-500">We pick one of three.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              We look at the trust path we have installed. The numbers from the last cycle. How it has felt working together. Then we pick.
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
              The 90 days are about installing the system that fills it on autopilot. Without you becoming a full time creator.
            </p>
            <a
              href="mailto:sean@authorityengine.com.au?subject=Undeniable%20Diagnostic%20%2B%2090%20Day%20Proposal"
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
