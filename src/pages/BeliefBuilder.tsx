import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, AlertTriangle, Zap, Target, Shield, BookOpen, Layers, MessageSquare, FileText, ArrowDown } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function StepNumber({ number }: { number: number }) {
  return (
    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xl font-bold mb-6">
      {number}
    </div>
  );
}

function PromptCard({ label, prompt, helper }: { label: string; prompt: string; helper: string }) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.10] transition-all">
      <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3">{label}</p>
      <p className="text-xl font-semibold text-white leading-relaxed mb-3">{prompt}</p>
      <p className="text-sm text-zinc-500">{helper}</p>
    </div>
  );
}

function ExampleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.04] border border-blue-500/[0.10] rounded-xl p-5">
      {children}
    </div>
  );
}

function BeliefCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-5">
      {children}
    </div>
  );
}

function Callout({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' }) {
  const styles = {
    default: 'bg-[#111113] border border-white/[0.06]',
    success: 'bg-emerald-500/[0.04] border border-emerald-500/[0.10]',
    warning: 'bg-amber-500/[0.04] border border-amber-500/[0.10]',
  };
  return (
    <div className={`${styles[variant]} rounded-xl p-6`}>
      {children}
    </div>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <div className="border-l-2 border-blue-500/40 pl-6 py-2">
      <p className="text-lg text-zinc-300 italic leading-relaxed">"{text}"</p>
    </div>
  );
}

export default function BeliefBuilder() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111113] border border-white/[0.06] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-sm text-zinc-400 font-medium">Authority Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Know what you<br />
              stand for.<br />
              <GradientText>Own your market.</GradientText>
            </h1>

            <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              The system for extracting the beliefs, positions, and convictions that separate you from everyone in your space. So every piece of content has a point of view worth following.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* The Problem */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">The Problem</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              You have expertise. But <GradientText>no position.</GradientText>
            </h2>
            <p className="text-xl text-zinc-300 mb-16 max-w-3xl leading-relaxed">
              You know your stuff. You have been doing this for years. But when it comes to content, everything comes out sounding like everyone else in your space.
            </p>

            {/* Stat Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { stat: '83%', label: 'of founder content is interchangeable' },
                { stat: '0', label: 'beliefs = zero reason to follow' },
                { stat: '5', label: 'beliefs = a brand people choose' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.10] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-5xl font-black text-white mb-2">{item.stat}</p>
                  <p className="text-zinc-400">{item.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <div className="mb-16">
              <Quote text="Not everybody should have a personal brand. The vast majority are wasting their time. But the ones who have conviction are untouchable." />
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {/* What most founders do */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                <div className="border-l-2 border-red-400 pl-4 mb-5">
                  <h3 className="text-lg font-bold text-white">What most founders do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Share tips that anyone could share',
                    'Recycle industry talking points',
                    'Avoid saying anything that might be controversial',
                    'Post consistently with no point of view',
                    'Sound exactly like their competitors',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400">
                      <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What authority builders do */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                <div className="border-l-2 border-emerald-400 pl-4 mb-5">
                  <h3 className="text-lg font-bold text-white">What authority builders do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Hold clear positions backed by experience',
                    'Challenge industry norms with evidence',
                    'Attract the right people by repelling the wrong ones',
                    'Build content around a belief system, not just topics',
                    'Create a brand that feels impossible to replicate',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400">
                      <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Callout */}
            <Callout>
              <p className="text-zinc-300 leading-relaxed">
                Contrarian with data is what no one does. Contrarian with opinion attracts sheep. The goal is not to be provocative for attention. It is to hold genuine positions backed by your experience and results. That is the difference between being a thought leader, and a "creator".
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* The Process */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">The Process</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 leading-tight">
              Five steps to a <GradientText>belief system</GradientText> worth following.
            </h2>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-7 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {[
                  { step: 1, title: 'Belief Block Diagnostic', desc: 'Uncover what you actually believe vs what you have been parroting' },
                  { step: 2, title: 'For & Against Declaration', desc: 'Draw lines. Make it clear what you stand for and what you reject' },
                  { step: 3, title: 'Conviction Test', desc: 'Pressure test each belief so only the real ones survive' },
                  { step: 4, title: 'Contrarian Stack', desc: 'Turn each belief into a structured position with evidence and reframes' },
                  { step: 5, title: 'Positioning Statement', desc: 'Distil everything into one statement that makes your market obvious' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-lg font-bold flex-shrink-0 relative z-10">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Step 1: The Belief Block Diagnostic */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <StepNumber number={1} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Belief Block Diagnostic</h2>
            <p className="text-xl text-zinc-400 mb-12">Five prompts that force your real positions to the surface.</p>

            <div className="space-y-6 mb-12">
              <PromptCard
                label="Prompt 1 — The Method"
                prompt={'"Most people in my industry believe the best way to [core outcome] is [common method]. I believe it is actually [your method]."'}
                helper="This surfaces disagreements about HOW things should be done. Start with the method your competitors default to."
              />
              <PromptCard
                label="Prompt 2 — The Priority"
                prompt={'"Most people in my industry prioritise [common priority]. I believe [alternative priority] matters more because [evidence]."'}
                helper="This reveals what you think the market is getting wrong about what matters most."
              />
              <PromptCard
                label="Prompt 3 — The Myth"
                prompt={'"Everyone says you need [common requirement]. I have seen that you actually need [your requirement] instead."'}
                helper="This challenges a specific piece of conventional wisdom your audience has accepted as fact."
              />
              <PromptCard
                label="Prompt 4 — The Timing"
                prompt={'"My industry tells people to [common advice] at [common timing]. I believe the right time is actually [your timing] because [evidence]."'}
                helper="This disrupts the sequencing or timeline your market takes for granted."
              />
              <PromptCard
                label="Prompt 5 — The Truth"
                prompt={'"The thing nobody in my industry wants to admit is [uncomfortable truth]. The reason they avoid it is [reason]. But the data shows [evidence]."'}
                helper="This is the uncomfortable position. The one that makes people pause and think."
              />
            </div>

            {/* Example Block */}
            <ExampleBlock>
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Example</p>
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <BeliefCard>
                  <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-2">Industry Belief</p>
                  <p className="text-zinc-300">"You need to post every day to grow on social media."</p>
                </BeliefCard>
                <BeliefCard>
                  <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-2">What I Actually Believe</p>
                  <p className="text-zinc-300">"Volume is the wrong play. One piece of content with a genuine point of view outperforms 30 posts with nothing to say. I tested it."</p>
                </BeliefCard>
              </div>
              <div className="flex justify-center my-4">
                <ArrowDown className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm text-zinc-400 text-center">The second version gives your audience a reason to follow you. The first gives them nothing they cannot get anywhere else.</p>
            </ExampleBlock>

            <div className="mt-8">
              <Callout>
                <p className="text-zinc-300 leading-relaxed">
                  The goal is not 5 random opinions. It is 5 beliefs that your ideal client would read and think "finally, someone said it."
                </p>
              </Callout>
            </div>
          </div>
        </Container>
      </Section>

      {/* Step 2: The For & Against Declaration */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <StepNumber number={2} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The For & Against Declaration</h2>
            <p className="text-xl text-zinc-400 mb-12">Draw lines. People follow people who stand for something.</p>

            {/* Template */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3">Template</p>
              <p className="text-xl font-semibold text-white leading-relaxed mb-3">
                "I am for [thing you champion]. I am against [thing you reject]. Because [your evidence or experience]."
              </p>
              <p className="text-sm text-zinc-500">Complete this for each of your 5 core beliefs. Be specific. Vague declarations are forgettable.</p>
            </div>

            {/* Example */}
            <ExampleBlock>
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Example</p>
              <div className="grid md:grid-cols-2 gap-4">
                <BeliefCard>
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <p className="text-xs font-bold tracking-widest uppercase text-emerald-400">For</p>
                  </div>
                  <p className="text-zinc-300 mb-2 font-semibold">Belief driven content that transfers conviction.</p>
                  <p className="text-zinc-500 text-sm">Content should make people think differently. Not just learn something.</p>
                </BeliefCard>
                <BeliefCard>
                  <div className="flex items-center gap-2 mb-3">
                    <X className="w-4 h-4 text-red-400" />
                    <p className="text-xs font-bold tracking-widest uppercase text-red-400">Against</p>
                  </div>
                  <p className="text-zinc-300 mb-2 font-semibold">Tips and tricks content that sounds like everyone else.</p>
                  <p className="text-zinc-500 text-sm">If 50 other people in your space could say the exact same thing, it is not a position. It is noise.</p>
                </BeliefCard>
              </div>
            </ExampleBlock>

            <div className="mt-8">
              <Callout variant="success">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300 leading-relaxed">
                    Your "against" list is your content goldmine. Every position you take against something gives you a hook, a story, and a belief shift to build content around.
                  </p>
                </div>
              </Callout>
            </div>
          </div>
        </Container>
      </Section>

      {/* Step 3: The Conviction Test */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <StepNumber number={3} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Conviction Test</h2>
            <p className="text-xl text-zinc-400 mb-12">Pressure test every belief. Only the real ones survive.</p>

            {/* Table */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-zinc-500">Test</th>
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-zinc-500">Question</th>
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-emerald-400">Pass</th>
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-red-400">Fail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-6 py-4 text-white font-semibold">Room Test</td>
                      <td className="px-6 py-4 text-zinc-400">Would you say this exact thing to a room of your best clients?</td>
                      <td className="px-6 py-4 text-emerald-400">Yes, without hesitation</td>
                      <td className="px-6 py-4 text-red-400">You would soften it or hedge</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-6 py-4 text-white font-semibold">Evidence Test</td>
                      <td className="px-6 py-4 text-zinc-400">Can you back this with a specific result, story, or data point?</td>
                      <td className="px-6 py-4 text-emerald-400">At least one concrete example</td>
                      <td className="px-6 py-4 text-red-400">It is just an opinion</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-white font-semibold">Cost Test</td>
                      <td className="px-6 py-4 text-zinc-400">Does saying this publicly cost you something? Does it repel someone?</td>
                      <td className="px-6 py-4 text-emerald-400">It filters the wrong people out</td>
                      <td className="px-6 py-4 text-red-400">Everyone would agree with it</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <Quote text="Contrarian with data is what no one does. That is the gap." />
            </div>

            <Callout variant="warning">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold mb-1">Opinions are not convictions.</p>
                  <p className="text-zinc-400 leading-relaxed">
                    An opinion is something you think. A conviction is something you have lived. If you cannot point to a specific client result, a personal experience, or a measurable outcome that backs the belief, it is not ready. Go back to Step 1 and dig deeper.
                  </p>
                </div>
              </div>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Step 4: The Contrarian Stack */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <StepNumber number={4} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Contrarian Stack</h2>
            <p className="text-xl text-zinc-400 mb-12">Turn each belief into a structured argument with evidence and a reframe.</p>

            {/* Structure Prompt */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Structure</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0 mt-0.5">P</div>
                  <div>
                    <p className="text-white font-semibold">Position</p>
                    <p className="text-zinc-400 text-sm">Your contrarian belief stated clearly. No hedging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0 mt-0.5">E</div>
                  <div>
                    <p className="text-white font-semibold">Evidence</p>
                    <p className="text-zinc-400 text-sm">The specific result, story, or data that backs it.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0 mt-0.5">R</div>
                  <div>
                    <p className="text-white font-semibold">Reframe</p>
                    <p className="text-zinc-400 text-sm">The new way your audience should think about this.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Build the Stack Table */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">Build the Stack</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase text-zinc-500 w-8">#</th>
                      <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase text-zinc-500">Position</th>
                      <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase text-zinc-500">Evidence</th>
                      <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase text-zinc-500">Reframe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <tr key={n} className={n < 5 ? 'border-b border-white/[0.06]' : ''}>
                        <td className="px-6 py-4 text-zinc-500 font-semibold">{n}</td>
                        <td className="px-6 py-4 text-zinc-500 italic">Your belief...</td>
                        <td className="px-6 py-4 text-zinc-500 italic">Your proof...</td>
                        <td className="px-6 py-4 text-zinc-500 italic">New frame...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Completed Example */}
            <ExampleBlock>
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Completed Example</p>
              <div className="space-y-4">
                <BeliefCard>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Position</p>
                      <p className="text-white font-semibold">Volume is the wrong play for founders building authority.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Evidence</p>
                      <p className="text-zinc-300">Tested both approaches. One client posted 60 times a month with recycled tips and grew 200 followers. Another posted 12 times with genuine positions and grew 3,000. Same niche. Same audience size.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Reframe</p>
                      <p className="text-zinc-300">Your strategy should be simplification, not multiplication. One piece of content with conviction outperforms 30 posts with nothing to say.</p>
                    </div>
                  </div>
                </BeliefCard>
              </div>
            </ExampleBlock>

            <div className="mt-8">
              <Callout variant="success">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300 leading-relaxed">
                    Each of these 5 contrarian stacks becomes a content pillar. One belief can fuel months of content across every format.
                  </p>
                </div>
              </Callout>
            </div>
          </div>
        </Container>
      </Section>

      {/* Step 5: The Positioning Statement */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <StepNumber number={5} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The Positioning Statement</h2>
            <p className="text-xl text-zinc-400 mb-12">Distil everything into one statement that makes your market obvious.</p>

            {/* Formula */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3">Formula</p>
              <p className="text-xl font-semibold text-white leading-relaxed">
                "I help [specific audience] achieve [specific outcome] through [your unique method/system], because I believe [your core conviction] and I have proven it by [your strongest evidence]."
              </p>
              <p className="text-sm text-zinc-500 mt-3">This is not a tagline. It is the foundation that every piece of content, every conversation, and every offer is built on.</p>
            </div>

            {/* Example */}
            <ExampleBlock>
              <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Example</p>
              <BeliefCard>
                <p className="text-zinc-300 leading-relaxed">
                  "I help 7 and 8 figure founders turn their authority into a content driven media machine through the Authority Engine system, because I believe content does not sell. It dissolves resistance. And I have proven it by generating over $10M in revenue for clients in the past 24 months without a single piece of content that asked for the sale."
                </p>
              </BeliefCard>
            </ExampleBlock>
          </div>
        </Container>
      </Section>

      {/* The Output */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">The Output</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              What you walk away with.
            </h2>
            <p className="text-xl text-zinc-400 mb-12">Five deliverables. One belief architecture. Infinite content.</p>

            {/* Top row: 3 cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { icon: <Shield className="w-5 h-5 text-blue-400" />, title: '5 Core Beliefs', desc: 'Your foundational positions. Extracted, tested, and structured.' },
                { icon: <Target className="w-5 h-5 text-blue-400" />, title: 'For & Against Declarations', desc: 'Clear lines drawn. What you champion and what you reject.' },
                { icon: <Layers className="w-5 h-5 text-blue-400" />, title: '5 Contrarian Stacks', desc: 'Position + Evidence + Reframe for each belief. Ready to use.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom row: 2 cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: <MessageSquare className="w-5 h-5 text-blue-400" />, title: 'Positioning Statement', desc: 'One statement that connects your beliefs, your audience, and your proof.' },
                { icon: <FileText className="w-5 h-5 text-blue-400" />, title: 'Content Pillar Map', desc: 'Each belief mapped to content types, formats, and funnel positions.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Multiplication */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">Content Multiplication</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              5 beliefs. 7 content types. <GradientText>35 pieces of content.</GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-12">Every belief can be expressed through every content type. Here is how they map.</p>

            {/* Content Types Table */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-zinc-500">Content Type</th>
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-zinc-500">Format</th>
                      <th className="text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-zinc-500">Funnel Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Hot Take', format: 'Short form video, carousel, text post', funnel: 'Discovery (top)' },
                      { type: 'Story', format: 'Short or long form video, written post', funnel: 'Discovery / Connection' },
                      { type: 'Breakdown', format: 'Long form video, carousel, thread', funnel: 'Connection (middle)' },
                      { type: 'Demonstration', format: 'Long form video, case study post', funnel: 'Connection / Conversion' },
                      { type: 'Teach', format: 'Long form video, guide, workshop', funnel: 'Connection (middle)' },
                      { type: 'Distill', format: 'Short form video, carousel, one liner', funnel: 'Discovery (top)' },
                      { type: 'Apply', format: 'Long form video, case study, tear down', funnel: 'Conversion (bottom)' },
                    ].map((row, i) => (
                      <tr key={i} className={i < 6 ? 'border-b border-white/[0.06]' : ''}>
                        <td className="px-6 py-4 text-white font-semibold">{row.type}</td>
                        <td className="px-6 py-4 text-zinc-400">{row.format}</td>
                        <td className="px-6 py-4 text-zinc-400">{row.funnel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Callout variant="success">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-zinc-300 leading-relaxed">
                  5 beliefs x 7 content types = 35 pieces of content. Before you even factor in variations, series, or repurposing. This is not a content calendar. It is a content engine.
                </p>
              </div>
            </Callout>

            {/* Content Test */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-white font-bold">Does it pass?</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Would I say this to a room of my best clients?',
                    'Can I back this with a specific result or story?',
                    'Does this repel someone I do not want to work with?',
                    'Would my ideal client read this and think "finally"?',
                    'Is this something only I can say with this evidence?',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">Does it feel right?</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Does it sound like you talking, not like copywriting?',
                    'Could you defend this position on a podcast tomorrow?',
                    'Would your best client recognise this as your thinking?',
                    'Does it create a reaction, not just agreement?',
                    'Does it make your content impossible to replicate?',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What Comes Next */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4">What Comes Next</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Belief Architecture is <GradientText>step one.</GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-12">Your beliefs power the entire Authority Engine system.</p>

            {/* Timeline */}
            <div className="relative mb-16">
              <div className="absolute left-7 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {[
                  { step: 1, title: 'Belief Architecture', desc: 'Extract and structure your core beliefs, positions, and convictions.', active: true },
                  { step: 2, title: 'Brand Bible', desc: 'Build your voice profile, archetypes, and messaging framework.' },
                  { step: 3, title: 'Content Engine', desc: 'Install a system that turns beliefs into content at scale.' },
                  { step: 4, title: 'Operator Install', desc: 'Train someone to run your content engine without you.' },
                  { step: 5, title: 'Authority Flywheel', desc: 'Compound your authority. Create, share, show, influence, repeat.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-6">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.active ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400/60'} border text-lg font-bold flex-shrink-0 relative z-10`}>
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className={`text-lg font-bold mb-1 ${item.active ? 'text-white' : 'text-zinc-400'}`}>{item.title}</h3>
                      <p className={item.active ? 'text-zinc-300' : 'text-zinc-500'}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Callout */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold text-white mb-2">Belief before tactics.</p>
              <p className="text-zinc-400">Know what you stand for. Then build everything on top of it.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}