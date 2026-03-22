import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BookOpen, Target, Zap, Shield, Gift, Check, X, Calendar, Video } from 'lucide-react';
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

const deliverables = [
  {
    icon: Target,
    title: 'Your Authority Archetype Profile',
    description: 'Know exactly how you naturally build trust. Your content formats, communication style, and weekly rhythm. Personalised to who you are, not a generic playbook.',
  },
  {
    icon: BookOpen,
    title: 'Complete Brand Bible',
    description: 'Voice, positioning, narrative, messaging. Identity extracted. Positioning clarified. All documented in Content.OS, ready to hand to any operator or team member.',
  },
  {
    icon: Zap,
    title: 'Belief Map',
    description: 'What your audience currently believes vs what they need to believe to buy from you. The bridge between where they are and where you need them.',
  },
  {
    icon: Shield,
    title: 'Your Origin Story',
    description: 'Extracted using one of 7 narrative templates. The story that makes people lean in at dinner. Documented and ready to deploy.',
  },
  {
    icon: Calendar,
    title: '30 Day Content Plan (5 A\'s Rhythm)',
    description: 'A weekly rhythm mapped to Attention, Alignment, Authorship, Achievability, and Access. Content types matched to your archetype. Ready to execute day one.',
  },
  {
    icon: Gift,
    title: '1 Lead Magnet Built Live',
    description: 'Built together in the room using your IP. Not a template. Something personalised for your audience that actually converts.',
  },
  {
    icon: Video,
    title: 'Everything Documented and Filmed',
    description: 'The full session is captured. Practice reels recorded. You walk away with footage, frameworks, and a system you can reference forever.',
  },
];

const proofStats = [
  { name: 'Taki Moore', stat: '+$5M', context: 'from content in 6 months', sub: 'Doubled following. Business up 80%. Team of 8.' },
  { name: 'Jay Wright', stat: '2x', context: 'following + revenue in 12 months', sub: 'E-commerce brands LSKD, Tiger Lily.' },
  { name: 'Mitch Revs', stat: '19k → 50k', context: 'followers in 2 months', sub: '1.4M organic impressions 3 months straight.' },
];

export default function BrandDay() {
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
                Build Your Brand
                <br />
                <span className="text-zinc-500">in a Day.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">
                One day. Your expertise. A complete system. Sean flies to you, pulls out what's already inside your head, and turns it into a documented brand engine.
              </p>
              <a
                href="/builder"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
              >
                Apply for a Brand Day
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What It Is */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What it is</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
                A half day build session.
                <br />
                <span className="text-zinc-500">Not a course. Not coaching.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Sean flies to your city. Sits in your office. And over one focused half day, collaboratively extracts everything that makes your brand yours.
                </p>
                <p>
                  This is not advice. It's a build. You walk out with a documented system, not a set of slides you'll never open again.
                </p>
                <p>
                  The Brand Bible, the content angles, the 30 day plan. All built live, together, from the expertise you already have.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The Process */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The process</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Three blocks. One day.
              <br />
              <span className="text-zinc-500">Nothing wasted.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: '01',
                  title: 'Brand Extraction',
                  time: '2 hours',
                  description: 'Personality. Perspective. Positioning. We pull everything out of your head and build the Brand Bible live in Content.OS.',
                },
                {
                  num: '02',
                  title: 'Content Strategy',
                  time: '1.5 hours',
                  description: 'Angles based on your archetype. A 30 day plan using the 5 A\'s rhythm. Formats matched to your energy and capacity.',
                },
                {
                  num: '03',
                  title: 'Quick Wins',
                  time: '1 hour',
                  description: 'A lead magnet built live. Practice reels filmed. Your Content.OS project set up and ready to run.',
                },
              ].map((block, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-5xl md:text-6xl font-extrabold text-zinc-700 tracking-tight mb-4">{block.num}</p>
                  <h3 className="text-white font-semibold text-lg mb-1">{block.title}</h3>
                  <p className="text-zinc-600 text-sm mb-3">{block.time}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{block.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What You Walk Away With */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you walk away with</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Seven deliverables.
              <br />
              <span className="text-zinc-500">Zero fluff.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
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

      {/* Who This Is For / Not For */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* For */}
              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Who this is for</p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                  Built for founders
                  <br />
                  <span className="text-zinc-500">who already have it.</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    '7 and 8 figure founders, coaches, or consultants',
                    'Already have deep expertise and a real reputation',
                    'Content feels heavy, inconsistent, or disconnected from who you are',
                    'You need a system. Not more advice.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not for */}
              <div>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Who this is NOT for</p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                  Not a fit
                  <br />
                  <span className="text-zinc-500">if you're starting from zero.</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    'No online presence or serious expertise yet',
                    'Looking for someone to do it all for you',
                    'Not willing to commit to filming and showing up',
                    'Under $500k in annual revenue',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Proof */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Proof</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              The results
              <br />
              <span className="text-zinc-500">speak for themselves.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {proofStats.map((p, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 text-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {p.stat}
                  </p>
                  <p className="text-zinc-300 font-medium mb-1">{p.context}</p>
                  <p className="text-zinc-600 text-sm">{p.name}</p>
                  <p className="text-zinc-600 text-xs mt-2">{p.sub}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 30 Day Backend */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The 30 day backend</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
                After the Brand Day,
                <br />
                <span className="text-zinc-500">you get 30 days of advisory. Free.</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  The Brand Day gives you the system. The 30 days after prove whether you'll use it.
                </p>
                <p>
                  You get direct advisory access to test, implement, and ship. No extra cost. No upsell pressure.
                </p>
                <p>
                  If you implement, you get invited to continue. If you don't, no hard feelings. The system is still yours.
                </p>
              </div>
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
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              Apply for a Brand Day.
            </h2>
            <p className="text-zinc-400 mb-10">
              Only 5 spots available. Mondays and Tuesdays. Sean flies to you.
            </p>
            <a
              href="/builder"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">$5,000. Half day. Everything documented.</p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
