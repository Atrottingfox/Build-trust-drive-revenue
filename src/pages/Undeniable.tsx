import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, FileText, Check, X, Lock, Shield, Gauge, Zap } from 'lucide-react';
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
        title="The Undeniable Authority Engine — 90 Day Install"
        description="A 90 day install that turns the room, the events, and the founders into a self marketing engine. Architect, not vendor. Five seats worldwide."
        path="/undeniable"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">For Undeniable</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The Undeniable
                <br />
                <span className="text-zinc-500">Authority Engine.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-3">
                90 Day Install.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                A media operating system wrapped around your room. Designed to make Undeniable the category king for 7 figure online PTs and fitness founders. Then let demand tell us where it goes next.
              </p>
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
              <p>
                Once Undeniable is the obvious choice in that space, two things happen. You have more demand than you can serve from fitness alone. The market starts pulling you into general service instead of you pushing.
              </p>
              <p className="text-zinc-300 font-medium">
                Step 1: build the system that makes you category king for 7 figure online PTs. Step 2: decide, with data, when to jump to the ocean and punch above your weight.
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
              <span className="text-zinc-500">Cashflow. Proof. Distribution.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                For the next 12 to 24 months, the Undeniable Authority Engine is three things working at once:
              </p>
              <ul className="space-y-2 pl-2">
                {[
                  'A high margin cashflow layer on top of what you already do.',
                  'A trust machine that keeps refilling cold to warm to cult in fitness.',
                  'A distribution and proof engine for both of us.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We are not trying to force a two events per month 8 figure empire in 90 days. We are building one killer event plus continuity machine in fitness, stacking cash and insane results, and then letting real demand tell us how far to push it.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 1: Diagnose & Design */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">01</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 1–4</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Diagnose & Design
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Map the real machine. Design the 90 days.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              Phase 1 maps how media actually drives butts in seats and upgrades. You leave with a time bound, concrete plan for the next 90 days. Not vague ideas.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Users,
                  title: 'Authority Intensive',
                  description: 'One in person session over 4 to 6 hours. You, Rhys, your creative director, and me. Clarify positioning, promise, and for vs against. Map the end to end journey from stranger to continuity member.',
                },
                {
                  icon: Target,
                  title: 'Content pillars and launch structure',
                  description: 'Decide the core pillars that carry the room. Lock the structure that opens and closes every event cycle.',
                },
                {
                  icon: Calendar,
                  title: 'Weekly Founder + CD install call',
                  description: 'Four weekly 60 minute install calls with founders, your creative director, and me. We finalise the 90 day Undeniable Authority Blueprint. Set lead, seat, and upgrade targets for the next event cycle.',
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

            <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">By end of Phase 1:</p>
              <ul className="space-y-2">
                {[
                  'Positioning, promise, and content pillars locked.',
                  'End to end journey from stranger to continuity member mapped.',
                  'A 90 day Content and Pipeline Blueprint your team executes against.',
                  'Concrete targets for leads, show ups, and upgrades.',
                  'Agreed success metrics for the event cycle. The numbers that decide if we keep going.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 2: Build & Install */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">02</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 5–8</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Build & Install
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Wrap the OS around a real event cycle.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              Early emotional wins are non negotiable. Tangible movement in the first 30 days locks buy in. Pre. On. Post. The whole event cycle gets the Undeniable Room OS around it.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Megaphone,
                  title: 'Pre event demand campaigns',
                  description: 'The content rhythm that fills the room before doors open. Built into your weekly cadence and tied to the launch structure.',
                },
                {
                  icon: Video,
                  title: 'On event content and story beats',
                  description: 'The angles that set up the sale while the room is live. Story beats designed to move attention into action.',
                },
                {
                  icon: RefreshCw,
                  title: 'Post event recap and proof',
                  description: 'Recap content and proof that compounds. Every event becomes evidence for the next one.',
                },
                {
                  icon: FileText,
                  title: '3 to 5 mid funnel assets',
                  description: 'Case study packs, debrief emails, short authority videos. The pieces that push people to the next room.',
                },
                {
                  icon: BarChart3,
                  title: 'Weekly KPI Snapshot',
                  description: 'A simple snapshot your team fills weekly. Content sourced leads, registrations, show ups, upgrades into continuity, LTV.',
                },
                {
                  icon: Calendar,
                  title: 'Touch model installed',
                  description: 'Founder Strategy Pod, CD 1:1, weekly Operator Clinic, and templated Looms. The rhythm that runs week 5 onward. Detailed below.',
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PHASE 3: Optimise & Codify */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">03</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 9–12</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Optimise & Codify
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Lock what works. Turn it into an asset.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              One full event cycle of real data. We tune on what filled the room and what moved people to buy and stay. Then we codify it so the system runs without us.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Settings,
                  title: 'Tune on one full event cycle',
                  description: 'Real data, not opinion. What actually filled the room. What moved people to buy and stay.',
                },
                {
                  icon: BookOpen,
                  title: 'Undeniable Authority Playbook',
                  description: 'Step by step for your internal team. A lite version goes to paying members as a high status bonus.',
                },
                {
                  icon: Layers,
                  title: 'Member Pilot',
                  description: '3 to 5 of your best founders get a condensed version. We extract 2 to 3 case studies you can use in the room and I can use as proof.',
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

            <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">By end of Phase 3:</p>
              <ul className="space-y-2">
                {[
                  'A room that prints profit and markets itself via the results of the people in it.',
                  'A playbook your internal team executes from.',
                  'A member facing lite version that lifts perceived value of being in the room.',
                  '2 to 3 case studies that become permanent assets.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CADENCE / TOUCH MODEL */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Month one. Deep.
              <br />
              <span className="text-zinc-500">Then a clean rhythm.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Three windows. Different touch model in each. You always know what is on the calendar.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Weeks 1 to 4</p>
                <h3 className="text-white font-semibold mb-4">Founders + CD + me. Weekly.</h3>
                <ul className="space-y-2">
                  {[
                    '1x in person Authority Intensive (4 to 6 hours).',
                    '1x 60 minute install call per week. All three of us.',
                    'Lock positioning, blueprint, and targets.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">Weeks 5 to 12</p>
                <h3 className="text-white font-semibold mb-4">Split touch model.</h3>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute Founder Strategy Pod per month. Small group of 5 to 8 room owners. Scorecards and big decisions. No thumbnails.',
                    '1x 60 minute 1:1 with your creative director per month. Focused on the Undeniable engine.',
                    'Weekly Operator Clinic. CD joins the room of all Stage 2 and advisory operators. We work patterns live.',
                    'Up to 1 Loom per week from your team. Templated: context, goal, question. I reply on patterns and next moves. Not proofreading.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">After 90 days</p>
                <h3 className="text-white font-semibold mb-4">Same rhythm. Stage 2 advisory.</h3>
                <ul className="space-y-2">
                  {[
                    'Monthly Founder Strategy Pod.',
                    'Monthly 1:1 with your creative director.',
                    'Weekly Operator Clinic.',
                    'Structured Loom access.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl">
              Advisory is Stage 2 support extended. Not a mystery extra. You already know exactly what ongoing looks like before we get there.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* HOW WE SCALE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we scale</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Demand first.
              <br />
              <span className="text-zinc-500">Then supply. Always.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-10">
              <p>
                The constraint right now is not "not enough rooms." It is burning warm audiences. No reliable cold to cult system. Unclear LTV per event.
              </p>
              <p className="text-zinc-300 font-medium">
                So the rule set is simple. One event per month until three things are true:
              </p>
              <ul className="space-y-2 pl-2">
                {[
                  'Events are consistently oversubscribed. 1.5 to 2x demand.',
                  'Cost to fill the room is stable or going down.',
                  'We have one full cycle where we can say: X leads → Y seats → Z continuity upgrades.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Only after that do we test extra frequency. Until then, scale means raise price and attach rate. Increase LTV per founder. Give them more of what they just bought, faster, with less effort.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SERVICE BUSINESSES */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What about service businesses</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Not never.
              <br />
              <span className="text-zinc-500">Earn it with data.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                We treat service businesses as a 6 month controlled experiment. Not a second business.
              </p>
              <ul className="space-y-2 pl-2">
                {[
                  'Fitness stays the main character. Minimum 80% of content, ads, and offers stay pinned to "get to 7 figures as an online PT or coach."',
                  'Pick one service avatar to test. Run a short, capped sprint of 10 to 15 businesses solving one painful problem.',
                  'Track profit per client, fulfillment effort, and enjoyment.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-300 font-medium">
                After 6 months we choose. Kill it. Keep it as an occasional cash pump. Or promote it to a real second lane only if it beats fitness on the numbers.
              </p>
              <p>
                That way we protect the Undeniable fitness machine while we test if the ocean is worth the swim.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE INVISIBLE HAND */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The invisible hand</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              When the room
              <br />
              <span className="text-zinc-500">markets itself.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              The deeper we go into one pond, the more the room markets itself. Same avatar. Same problems. Same success stories. Word of mouth becomes a flywheel, not a hope.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Layers,
                  title: '70 / 20 / 10 content mix',
                  description: '70% direct for online coaches, PTs, gym owners. 20% broad principles in fitness examples. 10% personal and brand.',
                },
                {
                  icon: Megaphone,
                  title: 'Direct response ads, 100% fitness',
                  description: 'Every paid call out names fitness specifically. "Online coach." "PT." "Fitness business doing $X per month." No ambiguity at the top of the funnel.',
                },
                {
                  icon: Video,
                  title: 'Every event into assets',
                  description: 'New case studies. Highlight reels. Awards and story assets the market shares for us.',
                },
                {
                  icon: Target,
                  title: 'Hook Bank',
                  description: 'A simple bank of angles that actually pull the right people into the room. More like this. Less like that. Updated monthly.',
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Fit</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Who this is for.
              <br />
              <span className="text-zinc-500">Who it is not.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Check className="w-5 h-5 text-blue-400" />
                  <p className="text-sm font-medium text-zinc-300 uppercase tracking-widest">For</p>
                </div>
                <ul className="space-y-3">
                  {[
                    '7 to 8 figure founders with a real room and continuity already working.',
                    'Online coaches, PTs, and fitness founders who want to be the clear category king in their niche.',
                    'Teams with a dedicated media or marketing lead. 10 to 15 hours per week minimum, with authority to make changes.',
                    'People who want a partner in the engine. Not a vendor.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <div className="flex items-center gap-2 mb-6">
                  <X className="w-5 h-5 text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-300 uppercase tracking-widest">Not for</p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Rooms that are not full at least some of the time.',
                    'Founders without an operator. If there is no one to own this, it will die.',
                    'People looking for someone to just run their marketing.',
                    'Anyone who is not ok with us turning the work into case studies and content.',
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

      {/* WHAT I OWN / WHAT YOU OWN */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Ownership</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              I am the architect.
              <br />
              <span className="text-zinc-500">Not the staff.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <p className="text-sm font-medium text-zinc-300 uppercase tracking-widest">I own</p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Strategy.',
                    'Authority Engine and Room OS design.',
                    'Content and campaign blueprint.',
                    'Weekly calls and Loom reviews.',
                    'Pattern recognition across the data.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-sm font-medium text-zinc-300 uppercase tracking-widest">You own</p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Media or marketing lead.',
                    'Ad spend and buying.',
                    'Content creation.',
                    'List sends.',
                    'Tech and tools.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mt-8 max-w-3xl font-medium">
              I do not run your ads, edit your videos, or manage your team.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FORMAT & TIME COMMITMENT */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Format and time</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Designed for one event cycle.
              <br />
              <span className="text-zinc-500">Built to compound after.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card p-8">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">From me</p>
                <ul className="space-y-3">
                  {[
                    '1x in person Authority Intensive (4 to 6 hours).',
                    'Weeks 1 to 4: 1x 60 minute Founder + CD install call per week.',
                    'Weeks 5 to 12: 1x 60 minute Founder Strategy Pod per month.',
                    'Weeks 5 to 12: 1x 60 minute 1:1 CD call per month.',
                    'Weeks 5 to 12: 1x weekly Operator Clinic (group).',
                    'Weekly Loom reviews. Capped and templated.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">From you</p>
                <ul className="space-y-3">
                  {[
                    'Show up to the intensive ready to be honest about what is working and what is not.',
                    'Commit one media or marketing lead at 10 to 15 hours per week with authority to execute.',
                    'Be willing to run the play through one real event cycle.',
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

      {/* INVESTMENT */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Investment</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              AUD $40,000.
              <br />
              <span className="text-zinc-500">Split to keep us both honest.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">On signing</p>
                <p className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3">$20,000</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Phase 1 starts. Authority Intensive booked. Blueprint work begins.
                </p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">On Day 31</p>
                <p className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3">$20,000</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Only flows if you show up, your team executes, and we are hitting or clearly trending toward the success metrics agreed in Phase 1.
                </p>
              </div>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl">
              Skin in the game for both of us. Not a line item.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* BUILT-IN WIN-WIN */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Built in win win</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              When we hit the targets.
              <br />
              <span className="text-zinc-500">We compound both ways.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              When we hit the targets, I ask for five things that turn the work into a permanent asset for both of us.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Mic,
                  title: '1 to 2 stage segments',
                  description: 'In your room. Breaking down what we built together.',
                },
                {
                  icon: Megaphone,
                  title: '1 to 2 dedicated emails',
                  description: 'To your list. About the project and the results.',
                },
                {
                  icon: Video,
                  title: '1 filmed case study',
                  description: 'A permanent asset we can both use.',
                },
                {
                  icon: Shield,
                  title: 'Name and logo usage',
                  description: 'Explicit permission to use Undeniable on my site and in proof material.',
                },
                {
                  icon: BarChart3,
                  title: 'Agreed metrics, shared',
                  description: 'Anonymised numbers or agreed metrics, used as a flagship case.',
                },
                {
                  icon: Zap,
                  title: 'One behind the scenes breakdown',
                  description: 'A short video showing how the engine was built and what it produced.',
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CAPACITY + ACCESS + PARTNERSHIP */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Access</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              5 seats.
              <br />
              <span className="text-zinc-500">Worldwide. Always.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-12">
              <p>
                I work with a maximum of 5 Authority Engine Installs worldwide at any given time. When those 5 seats are full, new partners go on a waitlist and are invited in when a seat opens.
              </p>
              <p>
                This protects the quality of the work and keeps my name attached to rooms I would proudly sit in.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Users,
                  title: 'We have worked together',
                  description: 'And the numbers say do more.',
                },
                {
                  icon: Layers,
                  title: 'You are referred',
                  description: 'By an existing partner.',
                },
                {
                  icon: Target,
                  title: 'I reach out',
                  description: 'Because I want my name attached to what you are building.',
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

            <div className="p-6 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">There is no public application.</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The first step is a 30 to 45 minute working session where we map your current room and numbers. If I am confident an Authority Engine Install will move the needle, you get an invite. If not, I tell you straight and point you at the next best move.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PARTNERSHIP NOT A PACKAGE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The relationship</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              A partnership.
              <br />
              <span className="text-zinc-500">Not a package.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                I am not here to sell you a course or become your outsourced CMO. For 90 days, I am in your corner as three things:
              </p>
              <ul className="space-y-2 pl-2">
                {[
                  'Architect of the Undeniable Authority Engine.',
                  'Sparring partner for your big decisions on avatar, pricing, and positioning.',
                  'Off site head of how we show up to the market.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>In return, I ask for three things:</p>
              <ul className="space-y-2 pl-2">
                {[
                  'Real access to your numbers and team.',
                  'The right to share what we build, within agreed bounds.',
                  'A long term view. We are building a machine that can compound to 8 figures, not a one off campaign.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PARTNER TIER */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">After the 90 days</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
                The 12 month
                <br />
                <span className="text-zinc-500">Strategic Partner Seat.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
                <p>
                  If the 90 days are a home run, we can talk about a Strategic Partner Seat. Maximum 3 partners worldwide. You cannot skip straight to it. The 90 day install comes first.
                </p>
                <p>The Partner Seat is:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Quarterly OS overhaul. We rebuild what the data says needs rebuilding.',
                    'Monthly slot in your room. I teach and debrief in person.',
                    'Shared experiments. The 6 month service business test runs here.',
                    'A product version of the playbook you can roll out to your best members.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>If that is interesting, we map it together after Phase 3.</p>
              </div>
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
              My job is to make sure the media and brand finally match it. And keep doing it without you becoming a full time creator.
            </p>
            <a
              href="mailto:sean@authorityengine.com.au?subject=Undeniable%20Authority%20Engine"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">30 to 45 minutes. We map your room, your events, and your numbers. If it is a fit, you get an invite.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
