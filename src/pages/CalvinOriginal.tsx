import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Calendar, Clock, Video, BookOpen, Target, Zap, ArrowRight, Lock } from 'lucide-react';
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
    description: 'Positioning, voice, key ideologies and philosophies, what you stand for and against. Mapped for both brands.',
  },
  {
    icon: Target,
    title: 'Content > Client Path',
    description: 'Simple map from stranger (cold ads) to follower to advocate/buyer, built around monthly live events and programs. Building a strategy designed for content to double as ad creative.',
  },
  {
    icon: Video,
    title: 'YouTube Pillar Videos',
    description: 'Topics, angles, stories, CTAs, and lead magnets for each. Ready to record across both brands.',
  },
  {
    icon: Zap,
    title: 'Editing Standards & SOPs',
    description: 'One edited video per brand as the benchmark. Loom walkthroughs and SOPs so your team can replicate the standard independently.',
  },
];

const day1WithYou = [
  {
    title: 'Brand & Positioning (Calvin)',
    points: [
      'Who you are, what you\u2019re for and not for',
      'What category we own and how to capture it',
      'Defining your brand narrative alongside the hero\u2019s journey',
      'Your core beliefs, philosophies, and points of relatability for your ideal audience',
      'Documenting a completed brand bible. The backbone of all future content',
      'Align organic content with your paid strategy so cold traffic lands on a profile that converts',
    ],
  },
  {
    title: 'Brand & Positioning (AI \u2014 Jayden & Kim)',
    points: [
      'Map brand positioning for the AI arm as its own entity',
      'Structure content to profile and launch the university model ahead of July',
      'Define talking head angles for standalone YouTube and shorts',
    ],
  },
  {
    title: 'Content > Client Map',
    points: [
      'Complete strategy and cadence to follow',
      'Core hooks, angles, and formats',
      'Map the steps: stranger > follower > buyer',
      'Belief gap and objection analysis. What your audience needs to believe at each stage',
      'Where content, DMs, and docs or calls each fit',
      'Design each YouTube video as a lead magnet delivery vehicle',
      'Build content that works as ad creative. Content as ads, not ads and content as separate things',
    ],
  },
  {
    title: 'YouTube Pillar Mapping',
    points: [
      'Define pillar videos for both brands',
      'For each: title, thumbnail guide, angle, key points, story, CTA, running structure',
      'Decide the job of each video inside the client path',
      'Structure the "Breakthrough Reactions" signature series concept',
    ],
  },
];

const day1Outputs = [
  'Brand Bible (Calvin)',
  'Brand Positioning (AI)',
  'Content > Client Map',
  'Pillar & Lead Magnet Map',
  'Signature Series Structure',
];

const day2Outputs = [
  '3\u20134 Calvin YouTube Videos',
  '1+ Video per AI Lead',
  '1 Podcast Episode (AI)',
  '20+ Shorts Total',
];

export default function CalvinOriginal() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'wildsuccess') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-6">
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
        <motion.div
          className="max-w-sm w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lock className="w-6 h-6 text-zinc-500 mx-auto mb-6" />
          <h1 className="font-display text-2xl font-extrabold text-white mb-2">Private Document</h1>
          <p className="text-zinc-500 text-sm mb-8">Enter the password to continue.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              className="w-full px-4 py-3 bg-surface border border-zinc-800/50 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 mb-3"
              autoFocus
            />
            {error && (
              <p className="text-red-400/80 text-xs mb-3">Incorrect password.</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-white text-black font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Continue
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

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
                Build your brands
                <br />
                <span className="text-zinc-500">in 48 hours.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-6">
                Two days. Two brands. We leave with both brands documented, your content path mapped, pillar videos filmed, and your team set up to run it without me. Plus 30 days of implementation support on the backend.
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
                { label: 'Brands covered', value: 'Calvin + AI' },
                { label: 'On the ground', value: 'Two full days' },
                { label: 'Structure', value: 'Day 1 build. Day 2 shoot.' },
                { label: 'Dates', value: '22nd \u2013 23rd April' },
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
              Two full days.
              <br />
              <span className="text-zinc-500">Both brands covered.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Day 1</p>
                </div>
                <p className="text-white font-semibold text-lg mb-3">Build & Map</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Brand, positioning, content strategy, and pillar video mapping across both brands. Calvin, Gigi, Jayden, and Kim in the room.
                </p>
              </div>
              <div className="p-8 bg-surface border border-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Day 2</p>
                </div>
                <p className="text-white font-semibold text-lg mb-3">Shoot</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Long form YouTube, shorts, podcast episode with Jayden and Kim. Full production day across both brands.
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
            <p className="text-zinc-500 text-sm mb-12">Full day &mdash; Calvin, Gigi, Jayden, Kim</p>

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
            <p className="text-zinc-500 text-sm mb-12">Full day of production</p>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold text-lg mb-4">Calvin Brand</h3>
                <ul className="space-y-3">
                  {[
                    '3 to 4 long form YouTube pillar videos. 15 to 20 minutes each',
                    'Keep them tight and punchy. Content that doubles as ad creative',
                    'Capture shorts and promo clips to drive traffic to the long form',
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
                <h3 className="text-white font-semibold text-lg mb-4">AI Brand</h3>
                <ul className="space-y-3">
                  {[
                    '1 podcast episode. Calvin, Jayden, and Kim on the state of AI',
                    '1+ talking head video each from Jayden and Kim. YouTube and shorts',
                    'Content to build momentum for the university model launch',
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
                transition={{ delay: 0.2 }}
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

      {/* Goal Volume */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Production targets</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              What we're aiming to walk away with.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '3\u20134', label: 'Calvin YouTube Videos' },
                { value: '1', label: 'Podcast Episode' },
                { value: '1+', label: 'Video per AI Lead' },
                { value: '20+', label: 'Shorts Total' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-surface border border-zinc-800/50 rounded-2xl text-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-3xl font-extrabold text-white mb-2">{item.value}</p>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Success Criteria */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What success looks like</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              30 days from now.
            </h2>
            <div className="space-y-4">
              {[
                'A YouTube production style and strategy you can run consistently. No more thinking about style or structure. Just content.',
                'Brand clarity locked in. So when 30,000 people land on your profile every month, they know exactly what you do and who it\u2019s for.',
                'Content that works as ad creative. Not ads and content as separate things.',
                'A quality standard your team can replicate independently. SOPs, benchmarks, and feedback loops already running.',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-surface border border-zinc-800/50 rounded-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
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
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Days 3&ndash;30</span>
              <span className="h-px flex-1 bg-zinc-800/50" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Implementation & Handoff
            </h2>
            <p className="text-zinc-500 text-sm mb-12">So your team can run this without me.</p>

            <ul className="space-y-3">
              {[
                'One edited video per brand as the quality benchmark for your team',
                'Editing SOPs and Loom walkthroughs for replication',
                'Two calls per week for 30 days',
                'Mentoring for Gigi and the editing team on style, structure, and standard',
                'Feedback loops on content the team produces independently',
              ].map((point, j) => (
                <li key={j} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
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
                $15,000 <span className="text-zinc-500 text-2xl md:text-3xl font-semibold">AUD</span>
              </h2>
              <p className="text-zinc-500 text-lg mb-10">All inclusive. Flights and accommodation covered.</p>
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
                'Lock in April 22nd and 23rd',
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
