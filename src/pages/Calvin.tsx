import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Calendar, Clock, Video, BookOpen, Target, Zap, ArrowRight } from 'lucide-react';
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
    title: 'Content \u2192 Client Path',
    description: 'Simple map from stranger to follower to buyer, built around one core offer.',
  },
  {
    icon: Video,
    title: '6 Pillar YouTube Videos',
    description: 'Topics, angles, stories, CTAs, and lead magnets for each. Ready to record.',
  },
  {
    icon: Zap,
    title: 'Basic Media OS',
    description: 'A simple system you can run week to week. How ideas become videos, clips, and how viewers become leads.',
  },
];

const day1WithYou = [
  {
    title: 'Brand & Positioning',
    points: [
      'Who you are, what you\u2019re for and not for',
      'What category we own and how to capture it',
      'Defining your brand narrative alongside the hero\u2019s journey',
      'Your core beliefs, philosophies, and points of relatability for your ideal audience',
      'Documenting a completed brand bible. The backbone of all future content',
    ],
  },
  {
    title: 'Content \u2192 Client Map',
    points: [
      'Complete strategy and cadence to follow',
      'Core hooks, angles, and formats',
      'Map the steps: stranger \u2192 follower \u2192 buyer',
      'Belief gap and objection analysis. What your audience needs to believe at each stage',
      'Where content, DMs, and docs or calls each fit',
    ],
  },
  {
    title: '6 Pillar Videos',
    points: [
      'Define 6 core YouTube pillar videos',
      'For each: title, thumbnail guide, angle, key points, story, CTA, running structure',
      'Decide the job of each video inside the client path',
    ],
  },
];

const day1Outputs = [
  'Brand Bible',
  'Content \u2192 Client Map',
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
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">For Calvin &mdash; April 2025</p>
              <div className="accent-line mb-8" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Build your brand
                <br />
                <span className="text-zinc-500">in 48 hours.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-6">
                Two days. Two blocks of your time. We leave with your brand documented, your content path mapped, six pillar videos ready to shoot, and as many recorded as we can get done cleanly.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* At a Glance */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Your time commitment', value: 'Two 3\u20134 hour blocks' },
                { label: 'My time on the ground', value: 'Two full days' },
                { label: 'Structure', value: 'Day 1 build. Day 2 shoot.' },
                { label: 'Window', value: '20th \u2013 26th April' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-surface border border-zinc-800/50 rounded-2xl"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-white font-semibold text-lg">{item.value}</p>
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
              Four deliverables.
              <br />
              <span className="text-zinc-500">Zero fluff.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
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

      {/* How Your Time Is Split */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How your time is split</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              You show up twice.
              <br />
              <span className="text-zinc-500">I handle the rest.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">You</p>
                </div>
                <p className="text-white font-semibold text-lg mb-3">Two 3&ndash;4 hour blocks</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Block 1: building, thinking, mapping, directing.
                  <br />
                  Block 2: filming.
                </p>
              </div>
              <div className="p-8 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Me</p>
                </div>
                <p className="text-white font-semibold text-lg mb-3">Two full days on the ground</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Everything that doesn't need you in the room gets done while you're out living your life.
                </p>
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

            {/* Optional rest of day 1 */}
            <motion.div
              className="mt-12 p-6 bg-surface border border-zinc-800/50 rounded-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Rest of Day 1</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Once your blocks are done, I document the production workflow. Idea intake through to publish and lead capture, checklists for each stage, paired lead magnets for each pillar video. Built so it's repeatable whether you're running it yourself or eventually handing it to someone.
              </p>
            </motion.div>

            {/* Day 1 Outputs */}
            <div className="mt-10">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Day 1 outputs</p>
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
                    'Define what good looks like for future videos',
                    'Lock a simple weekly rhythm for the next 30 days',
                  ].map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Day 2 Outputs */}
            <div className="mt-10">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">Day 2 outputs</p>
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
              <p className="text-zinc-500 text-lg mb-10">+ Travel</p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">50%</p>
                  <p className="text-zinc-300 text-sm">To lock the dates</p>
                </div>
                <div className="p-5 bg-surface border border-zinc-800/50 rounded-2xl">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">50%</p>
                  <p className="text-zinc-300 text-sm">On Day 1 when we sit down</p>
                </div>
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
              Reply yes.
            </h2>
            <p className="text-zinc-400 mb-12 max-w-md mx-auto">
              That's the whole next step. Everything else follows from there.
            </p>

            <div className="max-w-sm mx-auto space-y-5 text-left">
              {[
                'Pick two back to back days between the 20th and 26th of April',
                'I send the payment link',
                'I send a short prep doc so we hit the ground running on Day 1',
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
