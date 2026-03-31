import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Clock, MessageCircle, Video, BarChart3, BookOpen, Target, Map, Mic, FileText, Calendar, Repeat } from 'lucide-react';
import Footer from '../components/Footer';
import ProofStrip from '../components/ProofStrip';

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

const STRIPE_LINK = 'https://buy.stripe.com/4gMaEQaKQcE05Sw7KP00006';

const deliverables = [
  {
    icon: BookOpen,
    title: 'Brand Bible',
    description: 'Your voice, positioning, POV, and on camera style documented so your team can stop guessing.',
  },
  {
    icon: Map,
    title: 'Client Journey Map',
    description: 'A clear path from stranger \u203A buyer around one core offer. Every channel and piece of content has a job.',
  },
  {
    icon: Mic,
    title: 'Signature Content Format',
    description: 'One repeatable series you become known for, built around your personality and your buyer\u2019s beliefs.',
  },
  {
    icon: Video,
    title: 'Authority YouTube Stack',
    description: '4\u20116 core videos (titles, hooks, outlines, CTAs) that presell your method and warm people before they raise their hand.',
  },
  {
    icon: Calendar,
    title: '90 Day Content Blueprint',
    description: 'Exactly what to publish (longform + shortform) for the next 90 days, in order. Plus a simple 4 week posting cycle that consistently drives qualified leads.',
  },
  {
    icon: FileText,
    title: 'Mid Funnel Asset Stack',
    description: '3\u20115 key pieces (lead magnet, emails, page, video) that turn attention into applications, booked calls and sales.',
  },
];


export default function ThirtyDaySprint() {
  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Stop guessing
                <br />
                <span className="text-zinc-500">what to post.</span>
              </h1>
              <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed max-w-xl mb-6 italic">
                In 30 days we'll build a content to client path that attracts qualified leads every week without going viral.
              </p>

              {/* Urgency block */}
              <div className="my-10 p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="space-y-2">
                  <p className="text-white font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Doors close: Friday, April 3rd at 9:00pm AEST
                  </p>
                  <p className="text-zinc-400 text-sm">First VIP in person Brand Day opening: Tuesday, April 7th</p>
                  <p className="text-blue-400 text-sm font-medium">5 spots available</p>
                </div>
              </div>

              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
              >
                Lock in your start date
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="space-y-5 text-zinc-400 text-lg leading-relaxed">
                <p className="text-white text-xl font-medium leading-relaxed">
                  I'm working 1:1 with a small selection of founders in a 30 day sprint to turn content into a scalable, reliable source of client acquisition.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-600 mt-1.5 flex-shrink-0" />
                    <span>No viral hacks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-600 mt-1.5 flex-shrink-0" />
                    <span>No dancing on camera</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-600 mt-1.5 flex-shrink-0" />
                    <span>No posting 5x per day waiting for the next jackpot to flood your pipeline.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Proof Strip */}
      <ProofStrip />

      {/* Our goal */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                Our goal is simple.
              </h2>
              <ul className="space-y-4 mb-10">
                {[
                  'A predictable weekly flow of qualified conversations from content, not random viral posts',
                  'Prospects who arrive already bought into you and your method',
                  'One repeatable system your team runs without you in every decision',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Posting & praying for a lucky spike isn't a content strategy.
                  <br />
                  After this, every piece of content is designed to move someone one step closer to becoming a client.
                </p>
                <p>
                  In 30 days, we build a simple content driven client acquisition system.
                </p>
                <p>
                  Not a 'better content strategy.'
                  <br />
                  A clear path from what you publish to who becomes a client.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Credibility */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="space-y-5 text-zinc-400 text-lg leading-relaxed">
                <p>
                  I've spent years inside 8 figure founder led companies, coaches, consultants & B2B founders like Taki Moore & Jay Wright, building the content infrastructure that actually drives people from strangers to clients.
                </p>
                <p>
                  One client nearly doubling their business, and recently crossing $2,000,000/month.
                </p>
                <p>
                  Working behind the scenes with the best in the game, I learned fast.
                </p>
                <p className="text-white font-medium">
                  The founders who win aren't often creating 'more' content.
                  <br />
                  They're the ones who's content has a specific job.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The Plan */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The plan</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-16">
              Three phases.
              <br />
              <span className="text-zinc-500">30 days. One system.</span>
            </h2>
          </Section>

          {/* Phase 1 */}
          <Section className="mb-16">
            <div className="glow-card p-8 md:p-10">
              <div className="flex items-baseline gap-4 mb-1">
                <p className="font-display text-6xl md:text-7xl font-extrabold text-zinc-800 tracking-tight">01</p>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-[-0.02em]">
                Find the Bottleneck
              </h3>
              <p className="text-sm text-zinc-500 mb-6">Week 1 &middot; Diagnose</p>

              <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
                <p>
                  We start with a 1:1 2-4 hour VIP Brand Day in person at your office.
                </p>
                <p>
                  This becomes the foundation for your next jump in revenue.
                </p>
                <p>We:</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Pinpoint the biggest bottleneck in your content (who you\'re talking to, who sees you, why they trust you, or who you actually attract)',
                  'Map a straight line from stranger > follower > buyer for your business',
                  'Decide how you sound, what you stand for, and what your audience must believe before they buy',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium mb-6">You leave with three concrete assets:</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-1">1. Brand Bible</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Your voice, positioning, point of view, and on camera style documented in one place.
                    This is the reference your team will use so they stop guessing every time they write, film, or edit.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">2. Client Journey Map</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    A documented path from stranger to client, built around one core offer.
                    Every channel has a defined role. Every piece of content has a job.
                    You can point at this map and say 'This is how content creates clients.'
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">3. 90 Day Content Blueprint</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    The exact long form and short form videos your ideal client needs to see in the next 90 days including working titles, hooks and angles plus CTAs and next steps all mapped into a simple 90 day plan so your team knows what to make first, next, and after that.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/50">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  This isn't a theoretical 'strategy session.'
                  <br />
                  It's the day you stop improvising, and start following a clear plan that compounds every month.
                </p>
              </div>
            </div>
          </Section>

          {/* Phase 2 */}
          <Section className="mb-16">
            <div className="glow-card p-8 md:p-10">
              <p className="font-display text-6xl md:text-7xl font-extrabold text-zinc-800 tracking-tight mb-1">02</p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-[-0.02em]">
                Build the Path
              </h3>
              <p className="text-sm text-zinc-500 mb-6">Week 2 &middot; Design</p>

              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Now that we know the constraint, we refine the system to break it.
                </p>
                <p>We:</p>
              </div>

              <ul className="space-y-3 my-6">
                {[
                  'Tighten your content blueprint. The complete structure for long form, short form, and how they connect to your offer.',
                  'Build 3-5 trust assets that turn attention into booked calls. e.g. a custom tool (we can build together), a walkthrough video, a case study PDF, a \'greatest hits\' email sequence. Whatever your journey actually needs.',
                  'Install a 4 week posting cycle where every piece of content has one job in the path.',
                  'Set up a simple KPI snapshot your operator fills out in five minutes a week so you always know if it\'s working.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white font-medium">
                Phase 2 builds the system and breaks the bottleneck. More qualified leads, and prospects arriving pre sold instead of cold, skeptical and unqualified.
              </p>
            </div>
          </Section>

          {/* Phase 3 */}
          <Section>
            <div className="glow-card p-8 md:p-10">
              <p className="font-display text-6xl md:text-7xl font-extrabold text-zinc-800 tracking-tight mb-1">03</p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-[-0.02em]">
                Lock It and Run
              </h3>
              <p className="text-sm text-zinc-500 mb-6">Week 3 & 4 &middot; Deploy</p>

              <div className="space-y-4 text-zinc-400 leading-relaxed mb-6">
                <p>
                  The system is live. Now we tighten it based on what the numbers are actually showing.
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Review first assets',
                  'Look at early metrics alongside lead and call data',
                  'Adjust hooks, CTAs, and content rhythm accordingly',
                  'Lock a 90 day roadmap your team can execute without you. What to keep running every week, what to test next, and where to tighten the funnel going forward.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  You leave with a documented system, not just new ideas from a Zoom call with no way to implement.
                  Just add your content and your personality, and the system will compound each 4 week cycle.
                </p>
                <p className="text-white font-medium">
                  If you get stuck, a quick message gets you clear and moving.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What we're aiming to influence */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                What we're aiming
                <br />
                <span className="text-zinc-500">to influence.</span>
              </h2>

              <ul className="space-y-3 mb-8">
                {[
                  'Content attributed leads / DMs per week',
                  'Content attributed applications / calls per month',
                  '% of new revenue influenced by content',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BarChart3 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-zinc-500 text-sm italic">
                We're not promising a specific revenue outcome in 30 days. We're installing the path so you can see in numbers how well content performs as a client acquisition system.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Format & Support */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Format & support</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              How we work together.
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="glow-card p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                <Video className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-3">Calls</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>Week 1: 1 x 2-4 hour deep dive (in person VIP)</li>
                  <li>Weeks 2-4: 1 x 60 minute implementation call per week</li>
                </ul>
              </motion.div>

              <motion.div
                className="glow-card p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
              >
                <MessageCircle className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-3">WhatsApp</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>Text + voice notes</li>
                  <li>Response within 24 hours</li>
                  <li>Scope: questions, quick reviews, clarifications (deeper reviews via Loom/calls)</li>
                </ul>
              </motion.div>

              <motion.div
                className="glow-card p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16 }}
              >
                <Target className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-3">Loom Reviews</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>Up to 2 Looms per week (max 15 mins each)</li>
                  <li>You can bundle multiple assets into one Loom (hooks, ideas, thumbnails, titles, etc)</li>
                  <li>I tell you exactly what to change, where, and why</li>
                </ul>
              </motion.div>

              <motion.div
                className="glow-card p-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24 }}
              >
                <BarChart3 className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-3">Volume Expectations</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>We review representative pieces to fix patterns, not proofread every asset</li>
                  <li>My job is to improve the system, not be your editor</li>
                </ul>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Who This Is For / Not For */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">This won't work if you...</p>
                <ul className="space-y-4">
                  {[
                    'Want someone to create the content for you',
                    'Think the algorithm is the problem',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm leading-relaxed">
                      Have hired three other consultants&hellip;
                      <br />
                      and it's never been your fault
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">But if you...</p>
                <ul className="space-y-4">
                  {[
                    'Are doing $100K+ a month and already publishing content consistently',
                    'Want to build something where every piece of content has a job',
                    'Want a clear, sharp identity and content that actually drives leads',
                    'Want a client acquisition system, not another course or DFY agency',
                    'Are ready to handle more qualified demand without dropping quality',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white font-medium mt-6">
                  This could be the 30 days that alters how your business grows forever.
                </p>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  We'll do it with a diagnosis first, then a custom content path built around your one core offer, your market, and your team's capacity to execute.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Price & Terms */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Price & terms</p>

              <div className="space-y-5 text-zinc-400 text-lg leading-relaxed mb-10">
                <p>
                  Long term, this sprint will be <span className="text-white font-semibold">AU$10,000 + GST.</span>
                </p>
                <p>
                  Right now I'm running it with a small first cohort,
                  <br />
                  so there's a founder price of <span className="text-white font-semibold">AU$5,000 + GST</span> for the first 5 founders.
                </p>
              </div>

              <div className="p-6 bg-surface border border-zinc-800/50 rounded-2xl mb-8">
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>
                    In the last 6 months, I've contributed to over $5M in client revenue.
                  </p>
                  <p>
                    If one extra client is worth $15K+ to you,
                    <br />
                    the sprint is not just 'reasonable'. It's underpriced.
                  </p>
                  <p>
                    This is a one time project that makes every piece of content after it compound in the right direction.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* In 30 Days */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                In 30 days.
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  We don't try to perfect everything.
                  By the end of the 30 days, you'll have one clear content to client path that works, and you'll know how to run it every single week.
                </p>
                <p>
                  More importantly, it's documented.
                </p>
                <p>
                  Your message, your positioning, your formats, your rhythm.
                  All clear, repeatable, and usable by you, your team, or any system you plug in later.
                </p>
              </div>

              <div className="mt-10 p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <p className="text-white font-semibold mb-4">From there, we either:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">
                      Build on what's working & extend for another 30 day sprint to refine and scale, or
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">
                      Move into advisory at $3,000/month, where I act as your offsite strategist, sparring partner & performance coach while you and your team execute
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What You Leave With */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you actually leave with</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-4">
              You don't leave with ideas.
              <br />
              <span className="text-zinc-500">You leave with assets.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <d.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{d.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Next step</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              Secure your spot, then we pick your start date.
            </h2>
            <div className="space-y-3 text-zinc-400 mb-4 max-w-xl mx-auto">
              <p>
                We build your Brand Bible.
              </p>
              <p>
                Within thirty days, you have a repeatable, clear path to turn strangers into clients.
                Built, installed, live and driving leads. Without compromising who you are or what you stand for.
              </p>
              <p className="text-white font-medium">
                Fix this once, then let it compound.
              </p>
            </div>

            <div className="mt-10">
              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
              >
                Lock in your start date &mdash; $5,000
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-zinc-500 text-sm mt-8">
              Once you're in, I'll reach out directly to lock your start date.
            </p>

            <p className="text-zinc-600 text-sm mt-4">
              Sean
            </p>

            {/* Urgency reminder */}
            <div className="mt-8 p-4 bg-surface border border-zinc-800/50 rounded-xl inline-block">
              <p className="text-zinc-400 text-sm">
                <span className="text-white font-medium">Doors close Friday, April 3rd at 9:00pm AEST.</span>
                <br />
                5 spots available.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
