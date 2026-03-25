import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Zap, Shield, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, Gauge, FileText } from 'lucide-react';
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

const components = [
  {
    icon: Gauge,
    title: 'Work Type Diagnostic',
    description: 'Establishes whether you operate structured or reactive. Your natural creation rhythm determines how the system is built around you.',
  },
  {
    icon: BookOpen,
    title: 'Brand Bible',
    description: 'Voice on camera, messaging, positioning, category ownership, and the blueprint your operator executes from. Built in a 2–4 hour deep dive.',
  },
  {
    icon: Target,
    title: 'Authority Engine Blueprint',
    description: 'Your customer journey mapped across the Five A\'s. Content pillars and format strategy that move your specific audience from stranger to buyer.',
  },
  {
    icon: Calendar,
    title: 'Posting OS',
    description: 'Weekly rhythm: themes, angles, formats, CTAs, and channel allocation. Tied to your offers and revenue targets. Updated monthly as data comes in.',
  },
  {
    icon: FileText,
    title: 'Media Operator Playbook',
    description: 'The documentation your operator needs to run the engine. Brand Bible, scorecard, format guides, and the decision making framework.',
  },
  {
    icon: BarChart3,
    title: 'Weekly Scorecard',
    description: 'Five data points collected every week. What you published, what landed, where you stalled, what the audience is asking for. This is what makes the strategy adaptive.',
  },
];

export default function NinetyDayProgram() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The 90 Day
                <br />
                <span className="text-zinc-500">Program.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                Three phases. Six components. A sequential installation where each phase builds directly on what the previous one produced.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Six Components */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The system</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Six components.
              <br />
              <span className="text-zinc-500">Delivered across 90 days.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Each component is built in order. The diagnostic informs the Brand Bible. The Brand Bible informs the Blueprint. The Blueprint informs the Posting OS. Nothing is built in isolation.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.map((item, i) => (
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

      {/* ============ PHASE 1: ACTIVATION ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">01</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 1–4</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Activation
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Build the strategy. Get the first wins.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              The first 30 days is a calibration phase. We find out how you actually operate, build the Brand Bible, and launch a four week posting sprint to get data and first wins fast.
            </p>

            {/* Brand Bible Deep Dive */}
            <div className="mb-12">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">The Brand Bible deep dive</p>
              <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
                A 2–4 hour session with you and your Media Operator. In person or virtual. This builds the foundation the entire system runs from.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Mic,
                    title: 'Voice on camera',
                    description: 'Delivery, tonality, presence. How you naturally communicate when you are not performing.',
                  },
                  {
                    icon: Shield,
                    title: 'Beliefs and point of view',
                    description: 'Core beliefs, contrarian edge, what you stand for. The things that make your content yours and not someone else\'s.',
                  },
                  {
                    icon: Target,
                    title: 'Positioning and messaging',
                    description: 'Category ownership, transformation, what your audience actually trusts you for. Documented and locked.',
                  },
                  {
                    icon: Megaphone,
                    title: 'Channel strategy',
                    description: 'Where each platform sits in the machine and what job it does. No spray and pray.',
                  },
                  {
                    icon: Users,
                    title: 'Avatar',
                    description: 'Fierce frustrations, wants, aspirations, and where they are in the journey right now. Specific enough to write to.',
                  },
                  {
                    icon: Gauge,
                    title: 'Work Type Diagnostic',
                    description: 'Structured or reactive. Your natural creation rhythm determines how the entire system is built around you.',
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
            </div>

            {/* The Posting Sprint */}
            <div>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">The four week posting sprint</p>
              <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
                Your first content under the new system. The goal is not volume. The goal is data and fast wins.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Calendar,
                    title: 'Weekly rhythm set',
                    description: 'Opening angles tied to your offers and audience stage. Formats and CTA patterns mapped across channels.',
                  },
                  {
                    icon: Zap,
                    title: 'Content to pipeline path',
                    description: 'A minimal content to DM to call path designed to generate the first clearly attributable qualified opportunities within 30 days.',
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
            </div>

            <div className="mt-12 p-5 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">By day 30:</p>
              <ul className="space-y-2">
                {[
                  'Brand Bible and Authority Engine Blueprint your operator executes from.',
                  'Confirmed operating mode based on actual behaviour, not intention.',
                  'First clearly attributable qualified opportunities from the new system.',
                  'A content identity that feels like you and is tied directly to pipeline.',
                  'Four weeks of scorecard data that informs everything that follows.',
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

      {/* ============ PHASE 2: SYSTEMISATION ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">02</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 5–8</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Systemisation
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Deploy the strategy. Install the OS.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              Phase 1 gave us the data. Phase 2 builds the machine around what that data revealed. The full Posting OS gets installed. The Five A's framework becomes operational.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: 'Full Posting OS installed',
                  description: 'Monthly content program. Weekly rhythm, themes, angles, formats, CTAs, and channel allocation. Tied to your offers and revenue targets.',
                },
                {
                  icon: Target,
                  title: 'Five A\'s framework operational',
                  description: 'Content mix weighted to where your audience actually is in the journey. Not a fixed ratio. Adapts as weekly data comes in.',
                },
                {
                  icon: Layers,
                  title: 'Compound production rhythm',
                  description: 'Foundational piece plus supporting short form, distributed across platforms. One idea, multiple assets.',
                },
                {
                  icon: Users,
                  title: 'Roles and expectations clarified',
                  description: 'Founder, Media Operator, editors, VAs. Everyone knows what they own and what they don\'t.',
                },
                {
                  icon: Settings,
                  title: 'Operator strategic training',
                  description: 'Every adjustment comes with a one line rationale. The operator learns why, not just what. They start making strategic decisions.',
                },
                {
                  icon: BarChart3,
                  title: 'Eight weeks of scorecard data',
                  description: 'Real performance data driving real decisions. What\'s landing. What\'s not. Where the audience is responding.',
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

            <div className="mt-12 p-5 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">By day 60:</p>
              <ul className="space-y-2">
                {[
                  'A fully operational Posting OS your team runs week to week.',
                  'Content mix calibrated to your audience\'s actual journey stage.',
                  'A Media Operator beginning to make strategic decisions, not just execute tasks.',
                  'Content that is consistent, on brand, and tied to qualified pipeline.',
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

      {/* ============ PHASE 3: STABILISATION ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-800 tracking-tight">03</p>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Weeks 9–12</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                  Stabilisation
                </h2>
              </div>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">Tune the engine. Compound the results.</p>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-16">
              The system is running. The operator knows the actions. Now we install the why. We tune until you hit your lead targets three weeks in a row and the system runs without Sean in the room.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: 'Straight line content cadence',
                  description: 'A simple, repeatable path from unaware to buyer across every channel. No complexity for the sake of it.',
                },
                {
                  icon: BarChart3,
                  title: 'Format mix tuned on 90 days of data',
                  description: 'Traction, DMs, misfires, conversions, personality fit. Real data driving format and angle decisions.',
                },
                {
                  icon: Users,
                  title: 'Operator escalated to strategic lead',
                  description: 'From executor to the person who calls the adjustments. They understand the strategy, not just the schedule.',
                },
                {
                  icon: FileText,
                  title: 'Operator Playbook delivered',
                  description: 'A weekly checklist any future team member can follow. The engine keeps running when people change.',
                },
                {
                  icon: Video,
                  title: 'Loom walkthrough recorded',
                  description: 'A permanent reference of the Brand Bible and Posting OS. Your team uses this without rebuilding from scratch.',
                },
                {
                  icon: RefreshCw,
                  title: 'Full customer journey advisory',
                  description: 'From first touch content through lead magnets and applications. Quality, specificity, and commercial intent all increase.',
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

            <div className="mt-12 p-5 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-300 text-sm font-medium mb-3">By day 90:</p>
              <ul className="space-y-2">
                {[
                  'A media operating system built for your voice, your audience, your creation style.',
                  'A Media Operator who understands the strategy, not just the schedule.',
                  'An Operator Playbook any future hire can follow without re onboarding.',
                  'Three consecutive weeks hitting your lead targets.',
                  'A compound content engine that runs without you becoming a full time creator.',
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

      {/* ============ AFTER 90 DAYS ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">After 90 days</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
                Keep building.
                <br />
                <span className="text-zinc-500">Keep scaling.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Your operator can run the system at day 90. Learning to think like you, to understand the why behind every decision, that's a 12 month process. Advisory is the pit team that keeps the engine sharp while that happens.
                </p>
                <p>
                  Monthly Founder Strategy Call. Weekly Media Ops Call. Sean reads the data, makes the adjustments, and stays in the background as the strategic brain.
                </p>
                <p>
                  The advisory is not offered at the outset. It's an invitation extended to clients who prove they implement.
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
              It starts with a conversation.
            </h2>
            <p className="text-zinc-400 mb-10">
              A 30 minute call to confirm this is the right fit. If it's not, we'll tell you.
            </p>
            <a
              href="/builder"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">$10,000 for the full 90 day build. Maximum 7 companies at any time.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
