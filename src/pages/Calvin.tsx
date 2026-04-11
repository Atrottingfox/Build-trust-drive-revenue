import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Clock, Video, BookOpen, Target, Zap, Users } from 'lucide-react';
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
    icon: BookOpen,
    title: 'Brand Bible',
    description: 'Your positioning, voice, key ideologies and philosophies, what you stand for and against.',
  },
  {
    icon: Target,
    title: 'Content > Client Path',
    description: 'Simple map from stranger > follower > buyer around one core offer.',
  },
  {
    icon: Video,
    title: '6 Pillar YouTube Videos Mapped',
    description: 'Topics, angles, stories, CTAs, and lead magnets for each.',
  },
  {
    icon: Zap,
    title: 'Basic Media OS',
    description: 'A system you or your videographer can run week to week. How ideas become videos, clips, and leads.',
  },
];

const day1WithYou = [
  {
    title: 'Brand & Positioning',
    points: [
      'Who you are, what you\u2019re for and not for',
      'What category we will own, and how to capture it',
      'Defining our brand narrative alongside the hero\u2019s journey',
      'Your core beliefs, philosophies and points of relatability for the ideal audience',
      'Documenting a complete brand bible',
    ],
  },
  {
    title: 'Content > Client Map',
    points: [
      'Map the steps: stranger > follower > buyer',
      'Belief gap and objection analysis. What the audience needs to believe to move to the next stage',
      'Where content, DMs, and docs or calls fit',
    ],
  },
  {
    title: '6 Pillar Videos',
    points: [
      'Define 6 core YouTube pillar videos',
      'For each: title, thumbnail guide, angle, key points, story, CTA, running structure',
      'Decide the \u2018job\u2019 of each video in the path',
      'Pair each pillar with a lead magnet or mid funnel asset (e.g. tool, case study, breakdown, short training based on each video)',
    ],
  },
];

const day1Outputs = [
  'Brand Bible',
  'Content > Client Map',
  'Pillar & Lead Magnet Map',
  'Draft 30 Day Release Plan',
];

const day2Outputs = [
  'Organised Pillar Footage',
  'Final 30 Day Release Plan',
  'Production SOPs',
];

export default function Calvin() {
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
                Build your brand
                <br />
                <span className="text-zinc-500">in 48 hours.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                Two days. Two blocks of your time. We leave with your brand documented, a simple client path, 6 pillar videos mapped + as many as we can shoot in the time available.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* The Vision */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl space-y-6">
              <p className="text-zinc-400 leading-relaxed">
                Once we have your brand documented, it becomes the backbone of each piece of content for the next 90 days and beyond.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                The core of these 6 pillar videos set a cadence that can be repeated using the exact frameworks each of the videos follow for YouTube.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                This 6 week cycle you can then run on rotation to open new audiences, get them familiar with you and your expertise, then transfer them seamlessly into either an advocate or client.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                We set it up once, and if you want we calibrate it over time with one clear intention:
              </p>
              <div className="p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <p className="text-white font-semibold leading-relaxed">
                  Create mass demand through a clear path which takes every viewer from interested to invested. Not just in you or your product but the belief that it can and will solve their specific problem.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* What You Get */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you get</p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
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

      {/* Your Time */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Your time</p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">You</p>
                </div>
                <p className="text-white font-semibold text-lg mb-2">Two 3&ndash;4 hr blocks total</p>
                <p className="text-zinc-500 text-sm">Block 1: building, thinking + mapping</p>
                <p className="text-zinc-500 text-sm">Block 2: filming</p>
              </div>
              <div className="p-6 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Me</p>
                </div>
                <p className="text-white font-semibold text-lg mb-2">Two full days on the ground</p>
                <p className="text-zinc-500 text-sm">Everything that doesn't need you in the room gets done while you're out living your life.</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Day 1 */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Day 1</span>
              <span className="h-px flex-1 bg-zinc-800/50" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Brand, Beliefs & System
            </h2>
            <p className="text-zinc-500 text-sm mb-12">With you &mdash; 3 to 4 hours</p>

            <div className="space-y-10">
              {day1WithYou.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-white font-semibold text-lg mb-4">{block.title}</h3>
                  <ul className="space-y-3">
                    {block.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Documented workflow */}
            <motion.div
              className="mt-12 p-6 bg-surface border border-zinc-800/50 rounded-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Rest of Day 1</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Once your blocks are done, I document the production workflow:
              </p>
              <ul className="space-y-2">
                {[
                  'Idea intake > outline > record > edit > publish > lead capture',
                  'Checklist for each stage (who does what, in what order)',
                ].map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-sm mt-3">
                Built so it's repeatable whether you're running it yourself or handing it to a videographer.
              </p>
            </motion.div>

            {/* Day 1 Outputs */}
            <div className="mt-10">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Outputs after Day 1</p>
              <div className="flex flex-wrap gap-3">
                {day1Outputs.map((output, i) => (
                  <span key={i} className="px-4 py-2 bg-surface border border-zinc-800/50 rounded-full text-zinc-300 text-sm">
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Day 2 */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Day 2</span>
              <span className="h-px flex-1 bg-zinc-800/50" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Shoot
            </h2>
            <p className="text-zinc-500 text-sm mb-12">With you &mdash; 3 to 4 hours</p>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold text-lg mb-4">Shoot Pillars</h3>
                <ul className="space-y-3">
                  {[
                    'Record as many of the 6 as we can cleanly without compromise. Likely 3 to 4 depending on length',
                    'Keep them tight and punchy',
                    'Capture additional assets: workshop promos, shorts to promote the YouTube videos',
                  ].map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-white font-semibold text-lg mb-4">Debrief & Standards</h3>
                <ul className="space-y-3">
                  {[
                    'Define what \u2018good\u2019 looks like for future videos',
                    'Lock a simple weekly rhythm for the next 30 to 90 days',
                  ].map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* If videographer present */}
              <motion.div
                className="p-6 bg-surface border border-zinc-800/50 rounded-2xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">If you have a videographer</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">They shadow how I:</p>
                <ul className="space-y-2">
                  {[
                    'Brief you',
                    'Direct on camera. What\u2019s important, what\u2019s not',
                    'Run the room and manage takes',
                  ].map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-400 text-sm mt-3">
                  Then run segments themselves while I coach on form and process. They leave knowing exactly how to run it without me.
                </p>
              </motion.div>
            </div>

            {/* Day 2 Outputs */}
            <div className="mt-10">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Outputs after Day 2</p>
              <div className="flex flex-wrap gap-3">
                {day2Outputs.map((output, i) => (
                  <span key={i} className="px-4 py-2 bg-surface border border-zinc-800/50 rounded-full text-zinc-300 text-sm">
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Investment */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Investment</p>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-3">
                $10,000 <span className="text-zinc-500 text-2xl md:text-3xl font-semibold">AUD</span>
              </h2>
              <p className="text-zinc-500 text-lg mb-10">+ travel</p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <a
                  href="https://buy.stripe.com/4gMeV6cSY5bybcQfdh0000e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 bg-surface border border-zinc-800/50 rounded-2xl transition-all duration-200 hover:border-white/30 hover:bg-white/5 cursor-pointer"
                >
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">50%</p>
                  <p className="text-zinc-300 text-sm">To lock the dates</p>
                  <p className="text-xs text-zinc-600 mt-2 group-hover:text-white/60 transition-colors duration-200">Click to pay first instalment</p>
                </a>
                <a
                  href="https://buy.stripe.com/aFa9AMdX26fCgxa5CH0000f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 bg-surface border border-zinc-800/50 rounded-2xl transition-all duration-200 hover:border-white/30 hover:bg-white/5 cursor-pointer"
                >
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">50%</p>
                  <p className="text-zinc-300 text-sm">On Day 1</p>
                  <p className="text-xs text-zinc-600 mt-2 group-hover:text-white/60 transition-colors duration-200">Click to pay final instalment</p>
                </a>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Next Step */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">Next step</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              Reply &ldquo;Let's do it&rdquo;
            </h2>
            <p className="text-zinc-400 mb-12 max-w-md mx-auto">
              That's the whole next step. Everything else follows from there.
            </p>

            <div className="max-w-lg mx-auto space-y-5 text-left">
              {[
                'Pick two back to back days that work for you',
                'I\u2019ll send the payment link',
                'Fill a quick 10 minute prep doc so we hit the ground running on Day 1',
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-surface border border-zinc-800/50 flex items-center justify-center text-zinc-500 text-xs font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-zinc-400 text-sm leading-relaxed pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
