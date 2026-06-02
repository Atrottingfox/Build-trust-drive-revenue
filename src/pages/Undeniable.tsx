import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, FileText } from 'lucide-react';
import Footer from '../components/Footer';

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
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">For Undeniable</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The Boardroom
                <br />
                <span className="text-zinc-500">Authority Engine.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                A 90 day install that turns your room, your events, and your founders into a compounding media engine. So the brand finally matches what you are already building.
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
                  title: 'Boardroom Intensive',
                  description: 'One in person session over 4 to 6 hours. Clarify positioning, promise, and for vs against. Map the end to end journey from stranger to continuity member.',
                },
                {
                  icon: Target,
                  title: 'Content pillars and launch structure',
                  description: 'Decide the core pillars that carry the room. Lock the structure that opens and closes every event cycle.',
                },
                {
                  icon: Calendar,
                  title: '90 Day Blueprint',
                  description: 'Weekly 60 minute call with you and key team. The Boardroom Content and Pipeline Blueprint gets finalised. Targets set for leads, show ups, upgrades.',
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
                  'A 90 day Boardroom Content and Pipeline Blueprint your team executes against.',
                  'Concrete targets for leads, show ups, and upgrades.',
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
              Early emotional wins are non negotiable. Tangible movement in the first 30 days locks buy in. Pre. On. Post. The whole event cycle gets a working OS around it.
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
                  title: 'Implementation calls + Loom reviews',
                  description: 'One 60 minute call every week or fortnight (agreed up front), plus batched Loom reviews on key assets.',
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
                  title: 'Rhys Boardroom Media Playbook',
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
                  'A boardroom that prints profit and markets itself via the results of the people in it.',
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
                    '1x in person intensive (4 to 6 hours).',
                    'Weeks 1 to 8: one 60 minute call per week with you and your media or marketing lead.',
                    'Weeks 9 to 12: one 60 minute call per fortnight.',
                    'Loom reviews for key assets. Batched and pattern focused.',
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
                    'Commit one key operator or marketing lead to own implementation.',
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

            <p className="text-zinc-500 text-sm leading-relaxed mt-8 max-w-3xl">
              Designed as a high touch, unscalable sprint for a tiny number of partners. Limited spots. High value. Short window.
            </p>
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
                  Phase 1 starts. Boardroom Intensive booked. Blueprint work begins.
                </p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-3">On Day 31</p>
                <p className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3">$20,000</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Only if we both agree to continue. Keeps us both focused on fast, early wins.
                </p>
              </div>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl">
              I cap the number of these I run at any given time and always leave some demand unmet. That is how the quality is protected.
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
              When we hit the targets, I will ask for three things that make this multiply for both of us. The work we do becomes a permanent asset for Undeniable and a flagship proof point for my brand.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
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

      {/* PARTNER TIER NOTE */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">For the right fit</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
                There is also a
                <br />
                <span className="text-zinc-500">12 month Partner tier.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  We run the Boardroom Authority Engine with you for a full year. I am in the room each event to teach and debrief. We turn the system into a product you can roll out across your best members.
                </p>
                <p>
                  If that is interesting, we can talk about it on the call.
                </p>
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
              href="mailto:sean@authorityengine.com.au?subject=Boardroom%20Authority%20Engine"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the call
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">A 30 to 45 minute call. If it is a fit, we lock dates around your next event. If not, I will tell you straight.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
