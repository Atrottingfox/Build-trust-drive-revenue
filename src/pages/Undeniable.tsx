import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, Users, RefreshCw, Calendar, FileText, Check, Compass, Layers, X } from 'lucide-react';
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
        title="Undeniable — 90 Day Authority Engine Install"
        description="Install a simple trust system around your room so the right fitness founders go from never heard of you to I have to be in this room."
        path="/undeniable"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Undeniable · 90 Day Authority Engine Install</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-8">
                Install a simple trust system around your room so the right fitness founders go from never heard of you to I have to be in this room.
                <br />
                <span className="text-zinc-500">And Undeniable becomes the obvious choice for 7 figure online PTs.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                Three things, in plain English. A trust system. A plan your team can run. A live test of fit. Three months. Three of your events. One Day 90 decision.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHY THIS MATTERS NOW */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Why this matters now</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Make Undeniable the obvious choice in the pond you already own.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                Undeniable already works. You have a room and continuity model that gets results for online coaches and PTs who want 7 figures.
              </p>
              <p>
                This project is not about keeping you in fitness forever. It is about making you the undeniable choice in that pond first.
              </p>
              <p className="text-zinc-300 font-medium">
                Step 1: install the system that makes you category king for 7 figure online PTs. Step 2: when the pond is full and the data is clear, we decide if and how to jump to the ocean.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · WHERE UNDENIABLE IS NOW */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · Where Undeniable is now</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              My read on where
              <br />
              <span className="text-zinc-500">you are right now.</span>
            </h2>

            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">The room works.</h3>
                <p className="text-zinc-400 text-base leading-relaxed">You have a real product. A room and continuity model that gets results for 7 figure online PTs and fitness founders. That is not the problem.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">But the existing audience is warming slower.</h3>
                <p className="text-zinc-400 text-base leading-relaxed">You can feel it. You are moving from warm heavy to colder traffic and content. The list is doing less of the heavy lifting.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">The temptation is to jump markets.</h3>
                <p className="text-zinc-400 text-base leading-relaxed">Because fitness is starting to cost more to acquire. I think that is the wrong move. The distribution gap follows you into the next market. You end up paying to learn the same lesson somewhere harder.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">The leverage is right under you.</h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-4">You are about to enter a heavy word of mouth phase. More clients whose stories rhyme. More social proof. The room is about to start marketing itself, if we set it up to.</p>
                <p className="text-zinc-400 text-base leading-relaxed">In practice that means your advocates become the spine of the content. Their words, their results, not just your face talking at people. We boost the best client stories as paid distribution. Time on brand goes up. CAC quietly comes down.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-2">The gap that makes all of this hard.</h3>
                <p className="text-zinc-400 text-base leading-relaxed">There is no single documented path your team can point at and say: this is how someone goes from first touch to room to continuity. Every campaign starts from scratch. Every hook is a fresh guess.</p>
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8 mt-12 max-w-3xl">
              <p className="text-white text-base leading-relaxed font-medium">
                Make Undeniable so strong in your current market that the next market pulls you in. Not so you can run away from CAC.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · WHAT WE ARE TRYING TO DO */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · What we are trying to do in 90 days</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              What this actually is
              <br />
              <span className="text-zinc-500">(in plain English).</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              For 90 days, this is three things.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  num: '01',
                  icon: Compass,
                  title: 'A trust system',
                  description: 'A clear, documented path that takes cold fitness coaches from first touch to warm to room to continuity.',
                },
                {
                  num: '02',
                  icon: BookOpen,
                  title: 'A plan your team can run',
                  description: 'A 6 week content and lead asset cycle with guardrails. Your media and marketing lead knows what to do without guessing.',
                },
                {
                  num: '03',
                  icon: Check,
                  title: 'A live test of fit',
                  description: 'We use your three events over the 90 days to test the system and how we work together. At Day 90, we both decide.',
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
                  <p className="text-blue-400 font-semibold text-sm mb-3">{item.num}</p>
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              We are not trying to force a two events per month empire in 90 days. We are installing one working trust path, proving it with real events, and then deciding how far to push it.
            </p>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Success criteria · Agreed in Phase 1</p>
            <ul className="space-y-3 max-w-3xl mb-8">
              {[
                'An agreed % of new room buyers coming through the new path. Not just legacy warm.',
                'An agreed number of qualified new conversations per month, clearly traceable to the trust path.',
                "A 6 week YouTube and Instagram cycle you'd happily re run.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm md:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl font-medium">
              If we hit or trend toward those, we keep going. If not, we fix it or we stop.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE 90 DAY OUTLINE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The 90 day outline</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              What happens when.
              <br />
              <span className="text-zinc-500">At a high level.</span>
            </h2>

            <div className="space-y-8">
              {/* Weeks 1-4 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 1–4</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Diagnose & Design the Trust Path
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>Phase 1 maps how people actually discover you, decide to attend, and then stay. One in person session with you and your creative director. We agree the strategic narrative, the success metrics, and the shape of the 6 week cycle.</p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">You leave Phase 1 with</p>
                <ul className="space-y-2">
                  {[
                    'A documented Customer Journey Map. Cold to warm to room to continuity.',
                    'Your voice, positioning, and category lens pinned down.',
                    'Agreed success metrics for the 90 days.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weeks 5-8 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 5–8</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Build & Install Around a Real Event
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>Build the 6 week YouTube cycle. Plug and play outlines your team can re run. Your IP, our structure.</p>
                  <p>Build a parallel 6 week Instagram rhythm with weekly themes. Your team knows what to shoot and why. Lead magnets and nurture sequences wired up. Hook bank started.</p>
                  <p>The whole cycle wraps around your next real event so we test it live, not in theory.</p>
                </div>
              </div>

              {/* Weeks 9-12 */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">03</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 9–12</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Optimise, Codify, and Test With Members
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>Your team runs the cycle. I act as advisor. We tighten hooks, formats, and lead magnets on real data. We test the strongest pieces with your best members.</p>
                  <p>End of 90 days you have one documented trust path, one repeatable 6 week content cycle, and a clear view of what happens if we keep going.</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 · WHAT YOU WALK AWAY WITH */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · What you walk away with</p>
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
                  description: 'Plug and play outlines, hooks, CTAs. Your IP, our structure.',
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

            <div className="mt-10 p-6 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Want to see how I am thinking about your specific trust path? Read the working notes →{' '}
                <a href="/undeniable-notes" className="text-blue-400 hover:text-blue-300 transition-colors">
                  /undeniable-notes
                </a>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles. Cadence.
              <br />
              <span className="text-zinc-500">Fee.</span>
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
                <p className="text-zinc-400 text-sm leading-relaxed">In person intensive. Half or full day with you and your CD.</p>
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

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Fee & structure</p>
            <div className="glow-card border-blue-500/20 p-8">
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p className="text-white text-base font-medium">
                  90 day advisory and install: AUD $40,000.
                </p>
                <p className="text-zinc-400 text-sm">
                  Split $20,000 on signing and $20,000 on Day 31. Day 31 only flows if you show up, your team executes, and we are hitting or trending toward what we agreed in Phase 1.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 · WHAT HAPPENS AT DAY 90 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · What happens at Day 90</p>
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
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              You are already doing the hard part.
            </h2>
            <p className="text-zinc-400 mb-3 leading-relaxed">
              Filling and leading the room.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              My job is to install the trust system that keeps it full without you becoming a full time creator.
            </p>
            <a
              href="mailto:sean@authorityengine.com.au?subject=Undeniable%20Authority%20Engine%20Install"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">30 to 45 minutes. We walk through your current room, events, and media. If it is a fit, we lock dates. If not, I tell you straight.</p>
            <p className="text-zinc-600 text-sm mt-8">
              <a href="/undeniable-notes" className="text-blue-400 hover:text-blue-300 transition-colors">
                Read the working notes →
              </a>
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
