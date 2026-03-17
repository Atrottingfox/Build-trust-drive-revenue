import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

/* ─── animation helpers ─── */
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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── reusable UI atoms ─── */
function Quote({ text }: { text: string }) {
  return (
    <blockquote className="border-l-2 border-blue-500/30 pl-5 italic text-zinc-300 text-lg my-8 max-w-3xl">
      "{text}"
    </blockquote>
  );
}

function AccentLine() {
  return <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-4" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">{children}</p>;
}

function LayerNumber({ n }: { n: number }) {
  return (
    <div className="bg-[#111113] border border-blue-500/20 rounded-xl w-13 h-13 flex items-center justify-center text-blue-400 font-extrabold text-xl shrink-0">
      {n}
    </div>
  );
}

function PhaseDot({ color }: { color: 'blue' | 'indigo' | 'emerald' }) {
  const colors = {
    blue: 'bg-blue-400',
    indigo: 'bg-indigo-400',
    emerald: 'bg-emerald-400',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[color]} mr-2`} />;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all ${className}`}>
      {children}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] border-l-[3px] border-l-blue-500 rounded-r-xl p-5 my-8">
      {children}
    </div>
  );
}

function FixItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-7 text-zinc-300 leading-relaxed">
      <span className="absolute left-0 top-[10px] w-2 h-2 bg-blue-500 rounded-sm" />
      {children}
    </li>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden my-6">
      {children}
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`bg-[#18181b] text-zinc-500 uppercase text-xs tracking-wider px-4 py-3 text-left font-semibold ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`border-b border-white/[0.04] px-4 py-3 text-sm ${className}`}>
      {children}
    </td>
  );
}

/* ─── checklist state ─── */
function CheckItem({ label }: { label: string }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="mt-1 accent-blue-500 w-4 h-4 rounded border-zinc-600 bg-transparent"
      />
      <span className={`text-sm leading-relaxed transition-colors ${checked ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
        {label}
      </span>
    </label>
  );
}

/* ─────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────── */
export default function Diagnostic() {
  return (
    <div className="min-h-screen bg-base text-white">
      {/* gradient top border */}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-[#111113] border border-white/[0.06] rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-xs text-zinc-400 tracking-wide">The Authority Engine System</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] sm:leading-[1.05] mb-6">
              Build trust.<br />
              Drive demand.<br />
              <GradientText>Dominate your niche.</GradientText>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-14">
              The system that turns founder led content into a predictable authority engine.
              6 layers. Scored. Diagnosed. Fixed every 6 weeks.
            </p>

            {/* stat cards */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { value: '6', label: 'Diagnostic Layers' },
                { value: '/60', label: 'Authority Score' },
                { value: '6wk', label: 'Review Cycle' },
              ].map((s) => (
                <Card key={s.label} className="text-center py-5">
                  <div className="text-2xl font-extrabold text-blue-400 mb-1">{s.value}</div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </Card>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════
          THE SYSTEM
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionLabel>The System</SectionLabel>
            <AccentLine />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Three phases. Six layers.</h2>
            <p className="text-zinc-400 mb-12 max-w-2xl">
              Every layer builds on the one before it. Score each layer out of 10.
              Your total Authority Score tells you exactly where to focus.
            </p>

            {/* phase cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-16">
              {[
                {
                  phase: 'Ignition',
                  layers: 'Layers 1 & 2',
                  desc: 'Brand Foundation',
                  detail: 'Identity, positioning, belief system, voice, and strategic alignment. The base everything else is built on.',
                  dot: 'blue' as const,
                },
                {
                  phase: 'Transmission',
                  layers: 'Layers 3 & 4',
                  desc: 'Content Execution',
                  detail: 'Content quality scoring, creative hooks, format execution, and the Why-What-How loop that drives every piece.',
                  dot: 'indigo' as const,
                },
                {
                  phase: 'Flywheel',
                  layers: 'Layers 5 & 6',
                  desc: 'System & Scale',
                  detail: 'Publishing cadence, operator delegation, trust layers, authority signals, and content attributed revenue.',
                  dot: 'emerald' as const,
                },
              ].map((p, i) => (
                <FadeIn key={p.phase} delay={i * 0.1}>
                  <Card className="h-full">
                    <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      <PhaseDot color={p.dot} />
                      {p.phase}
                    </div>
                    <div className="text-sm text-zinc-400 mb-2">{p.layers}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{p.desc}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{p.detail}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* 6 layer flow */}
            <div className="space-y-3">
              {[
                { n: 1, name: 'Brand Clarity', phase: 'Ignition', dot: 'blue' as const },
                { n: 2, name: 'Strategy Alignment', phase: 'Ignition', dot: 'blue' as const },
                { n: 3, name: 'Content Quality', phase: 'Transmission', dot: 'indigo' as const },
                { n: 4, name: 'Creative Execution', phase: 'Transmission', dot: 'indigo' as const },
                { n: 5, name: 'System & Consistency', phase: 'Flywheel', dot: 'emerald' as const },
                { n: 6, name: 'Authority & Conversion', phase: 'Flywheel', dot: 'emerald' as const },
              ].map((l) => (
                <FadeIn key={l.n}>
                  <div className="flex items-center gap-4 bg-[#111113] border border-white/[0.06] rounded-xl px-5 py-3 hover:border-white/[0.10] transition-all">
                    <LayerNumber n={l.n} />
                    <div className="flex-1">
                      <span className="font-semibold text-white">{l.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <PhaseDot color={l.dot} />
                      {l.phase}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          SCORING
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60" >
        <Container>
          <div className="max-w-4xl mx-auto" id="scoring">
            <SectionLabel>Scoring</SectionLabel>
            <AccentLine />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Authority Score</h2>
            <p className="text-zinc-400 mb-10 max-w-2xl">
              Each layer is scored out of 10. Six layers. Maximum score of 60.
              The number tells you where you are. The breakdown tells you where to focus.
            </p>

            {/* score ranges */}
            <TableWrap>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <Th>Score Range</Th>
                    <Th>Status</Th>
                    <Th className="hidden sm:table-cell">What It Means</Th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr>
                    <Td className="text-emerald-400 font-semibold">50 &ndash; 60</Td>
                    <Td className="font-medium text-white">Authority Engine Running</Td>
                    <Td className="hidden sm:table-cell text-zinc-400">System is operating. Focus on optimisation and compounding.</Td>
                  </tr>
                  <tr>
                    <Td className="text-blue-400 font-semibold">35 &ndash; 49</Td>
                    <Td className="font-medium text-white">Foundation Solid</Td>
                    <Td className="hidden sm:table-cell text-zinc-400">Good bones. One or two layers need focused attention.</Td>
                  </tr>
                  <tr>
                    <Td className="text-amber-400 font-semibold">20 &ndash; 34</Td>
                    <Td className="font-medium text-white">Major Gaps</Td>
                    <Td className="hidden sm:table-cell text-zinc-400">Structural issues across multiple layers. Prioritise Ignition first.</Td>
                  </tr>
                  <tr>
                    <Td className="text-red-400 font-semibold">Under 20</Td>
                    <Td className="font-medium text-white">Starting Over</Td>
                    <Td className="hidden sm:table-cell text-zinc-400">Brand and strategy need a full rebuild before content can compound.</Td>
                  </tr>
                </tbody>
              </table>
            </TableWrap>

            {/* example breakdown */}
            <h3 className="text-xl font-bold mt-14 mb-6">Example Score Breakdown</h3>
            <div className="space-y-4">
              {[
                { layer: 'Brand Clarity', score: 8, color: 'bg-emerald-500' },
                { layer: 'Strategy Alignment', score: 7, color: 'bg-blue-500' },
                { layer: 'Content Quality', score: 6, color: 'bg-blue-500' },
                { layer: 'Creative Execution', score: 5, color: 'bg-amber-500' },
                { layer: 'System & Consistency', score: 4, color: 'bg-amber-500' },
                { layer: 'Authority & Conversion', score: 3, color: 'bg-red-500' },
              ].map((l) => (
                <div key={l.layer} className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400 w-48 shrink-0">{l.layer}</span>
                  <div className="flex-1 bg-white/[0.04] rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${l.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.score * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-white w-8 text-right">{l.score}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
                <span className="text-sm font-semibold text-white w-48">Total Authority Score</span>
                <div className="flex-1" />
                <span className="text-lg font-extrabold text-blue-400">33 / 60</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 1: BRAND CLARITY
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="blue" />
              Ignition Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={1} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Brand Clarity</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="Authority is not claimed. It is inferred by others through observed truth." />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Before anything compounds, people need to understand who you are, what you stand for,
              and why they should listen. Brand clarity is the foundation every other layer is built on.
            </p>

            {/* 5 signal rows */}
            <h3 className="text-xl font-bold mb-4">Five Signals</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                  <thead>
                    <tr>
                      <Th>Signal</Th>
                      <Th>1 &ndash; 3</Th>
                      <Th>4 &ndash; 6</Th>
                      <Th>7 &ndash; 10</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Identity</Td>
                      <Td className="text-red-400">No documented voice, archetype, or belief system.</Td>
                      <Td className="text-amber-400">Informal sense of identity. Not codified or consistent across content.</Td>
                      <Td className="text-emerald-400">Written Brand Bible with voice profile, archetype, and beliefs. Team can reference it.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Positioning</Td>
                      <Td className="text-red-400">Generic. Could be swapped with any competitor.</Td>
                      <Td className="text-amber-400">Clear category but no unique mechanism or language.</Td>
                      <Td className="text-emerald-400">Named system. "This vs nothing" comparison. Audience can repeat your positioning back to you.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Belief System</Td>
                      <Td className="text-red-400">No articulated beliefs. Content is tactical only.</Td>
                      <Td className="text-amber-400">Some opinions shared but not structured into a worldview.</Td>
                      <Td className="text-emerald-400">Documented belief architecture: category, product, brand, self, and timing beliefs.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Brand Voice</Td>
                      <Td className="text-red-400">Inconsistent. Reads differently across posts.</Td>
                      <Td className="text-amber-400">Recognisable tone but no written guide. Breaks when someone else writes.</Td>
                      <Td className="text-emerald-400">Codified voice with tone rules, signature language, and patterns anyone on the team can follow.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Visual Identity</Td>
                      <Td className="text-red-400">No consistent look. Random templates and colours.</Td>
                      <Td className="text-amber-400">Loosely consistent but not documented. Falls apart on new formats.</Td>
                      <Td className="text-emerald-400">Defined palette, typography, layout rules. Instantly recognisable in a feed scroll.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* diagnostic tests */}
            <h3 className="text-xl font-bold mt-12 mb-4">Diagnostic Tests</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Stranger Test',
                  desc: 'Show your profile to someone unfamiliar. Can they tell you what you do, who you help, and why you are different within 10 seconds?',
                },
                {
                  name: 'Content Scan',
                  desc: 'Read your last 10 posts without names or logos. Could they belong to someone else in your space? If yes, your voice is not distinct enough.',
                },
                {
                  name: 'Belief Audit',
                  desc: 'List 5 things you believe that your industry disagrees with. If you cannot, your content has no philosophical backbone.',
                },
                {
                  name: 'Profile Conversion Rate',
                  desc: 'Track profile visits to follows. Below 10% signals a positioning or identity problem.',
                },
              ].map((t) => (
                <Card key={t.name}>
                  <h4 className="font-semibold text-white mb-2">{t.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
                </Card>
              ))}
            </div>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Complete the Brand Bible process: Identity, Positioning, Narrative, Messaging.</FixItem>
              <FixItem>Define your brand archetype and write a voice profile your team can follow without guessing.</FixItem>
              <FixItem>Build a Belief Architecture: category belief, product belief, brand belief, self belief, timing belief.</FixItem>
              <FixItem>Create a visual identity document with palette, typography, and layout rules.</FixItem>
              <FixItem>Run the Stranger Test on 3 people outside your audience. Fix whatever they cannot identify.</FixItem>
            </ul>

            <Callout>
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="text-white font-semibold">The Brand Bible is the deliverable here.</span>{' '}
                Identity, positioning, narrative, and messaging. Built once, referenced forever.
                If this layer scores below 5, nothing downstream will compound.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 2: STRATEGY ALIGNMENT
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="blue" />
              Ignition Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={2} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Strategy Alignment</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="If someone watched 10 pieces of your content, would they know exactly what they are buying?" />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Content without strategic alignment is noise. This layer checks whether your
              content mix, offer positioning, and pillar structure are working together
              to move people from discovery to conversion.
            </p>

            {/* Content Mix Audit */}
            <h3 className="text-xl font-bold mb-4">Content Mix Audit</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <Th>Stage</Th>
                      <Th>Target %</Th>
                      <Th>Content Types</Th>
                      <Th>Scoring</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Discovery</Td>
                      <Td className="text-blue-400 font-semibold">40%</Td>
                      <Td className="text-zinc-400">Hot takes, pattern interrupts, contrarian angles, curiosity hooks</Td>
                      <Td className="text-zinc-400">Reach, new followers, shares</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Connection</Td>
                      <Td className="text-blue-400 font-semibold">40%</Td>
                      <Td className="text-zinc-400">Stories, breakdowns, frameworks, belief shifting, teach content</Td>
                      <Td className="text-zinc-400">Saves, comments, DMs, watch time</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Conversion</Td>
                      <Td className="text-blue-400 font-semibold">20%</Td>
                      <Td className="text-zinc-400">Case studies, demonstrations, proof, CTAs, testimonials</Td>
                      <Td className="text-zinc-400">Link clicks, DM inquiries, applications</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* Offer-Content Congruence */}
            <h3 className="text-xl font-bold mt-12 mb-4">Offer-Content Congruence</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr>
                      <Th>Signal</Th>
                      <Th>Congruent</Th>
                      <Th>Incongruent</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Topic Match</Td>
                      <Td className="text-emerald-400">Content topics map directly to what you sell.</Td>
                      <Td className="text-red-400">Content entertains but has no connection to your offer.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Problem Awareness</Td>
                      <Td className="text-emerald-400">Content surfaces the exact problems your offer solves.</Td>
                      <Td className="text-red-400">Audience enjoys content but does not see themselves as buyers.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Language Alignment</Td>
                      <Td className="text-emerald-400">The words in your content match the words on your sales page.</Td>
                      <Td className="text-red-400">Content uses casual language. Offer uses corporate language. Disconnect.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Audience Overlap</Td>
                      <Td className="text-emerald-400">The people engaging are the people who buy.</Td>
                      <Td className="text-red-400">High engagement from peers or non-buyers. Low conversion.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* diagnostic tests */}
            <h3 className="text-xl font-bold mt-12 mb-4">Diagnostic Tests</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: '10-Post Test',
                  desc: 'Review your last 10 posts. Categorise each as Discovery, Connection, or Conversion. If any category is missing or below 10%, your mix is off.',
                },
                {
                  name: 'Congruence Question',
                  desc: 'If someone watched 10 pieces of your content, would they know exactly what you sell? Ask 3 followers. If they cannot answer, fix this first.',
                },
                {
                  name: 'Pillar Count',
                  desc: 'List every topic you have posted about in the last 30 days. If it is more than 5 pillars, you are too scattered. Consolidate.',
                },
                {
                  name: 'Authority-Relatability Check',
                  desc: 'Are you only teaching (authority) or only sharing stories (relatability)? The best content oscillates between both. Check the ratio.',
                },
              ].map((t) => (
                <Card key={t.name}>
                  <h4 className="font-semibold text-white mb-2">{t.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
                </Card>
              ))}
            </div>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Map your content pillars to your offer. Every pillar should connect to a problem your offer solves.</FixItem>
              <FixItem>Rebalance your content mix to the 40/40/20 split. Audit weekly until the ratio holds naturally.</FixItem>
              <FixItem>Run the Congruence Question with 3 real followers. Fix whatever they cannot connect.</FixItem>
              <FixItem>Align language across content and sales pages. The words people hear should be the words they read when they land on your offer.</FixItem>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 3: CONTENT QUALITY
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="indigo" />
              Transmission Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={3} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Content Quality</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="Education without inspiration is not at all impactful." />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Quality is not production value. It is how well each piece delivers on its promise.
              Six elements determine whether a piece of content earns attention or wastes it.
            </p>

            {/* 6 quality element cards */}
            <h3 className="text-xl font-bold mb-4">Six Quality Elements</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                {
                  name: 'Simple',
                  desc: 'One idea per piece. No meandering. The viewer should be able to repeat the core point in one sentence.',
                  color: 'text-blue-400',
                },
                {
                  name: 'Useful',
                  desc: 'The viewer walks away with something they can act on today. Not someday. Today.',
                  color: 'text-emerald-400',
                },
                {
                  name: 'Insightful',
                  desc: 'Says something they have not heard before. A new lens, a reframe, a pattern they did not see.',
                  color: 'text-indigo-400',
                },
                {
                  name: 'New',
                  desc: 'Not recycled. Not generic. If 10 other people in your niche could have posted it, it is not new enough.',
                  color: 'text-amber-400',
                },
                {
                  name: 'Relatable',
                  desc: 'The viewer sees themselves in it. Uses their language, their frustrations, their aspirations.',
                  color: 'text-pink-400',
                },
                {
                  name: 'Contagious',
                  desc: 'Makes the viewer want to share it. Either because it makes them look smart, feel validated, or say "this is so true."',
                  color: 'text-violet-400',
                },
              ].map((el) => (
                <Card key={el.name}>
                  <h4 className={`font-semibold mb-2 ${el.color}`}>{el.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{el.desc}</p>
                </Card>
              ))}
            </div>

            {/* Five Value Lenses */}
            <h3 className="text-xl font-bold mb-4">Five Value Lenses</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr>
                      <Th>Lens</Th>
                      <Th>Definition</Th>
                      <Th>Test Question</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Actionable</Td>
                      <Td className="text-zinc-400">Gives clear next steps the viewer can take immediately.</Td>
                      <Td className="text-zinc-400">Can they do something different after watching?</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Implementable</Td>
                      <Td className="text-zinc-400">Provides a system, template, or framework they can install.</Td>
                      <Td className="text-zinc-400">Could they build something from this?</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Educational</Td>
                      <Td className="text-zinc-400">Teaches a concept, model, or skill they did not have before.</Td>
                      <Td className="text-zinc-400">Did they learn something they can explain to someone else?</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Insightful</Td>
                      <Td className="text-zinc-400">Offers a new perspective or reframe they had not considered.</Td>
                      <Td className="text-zinc-400">Did it change how they see the problem?</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Aspirational</Td>
                      <Td className="text-zinc-400">Shows what is possible. Inspires belief in the outcome.</Td>
                      <Td className="text-zinc-400">Do they feel more motivated after watching?</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* diagnostic tests */}
            <h3 className="text-xl font-bold mt-12 mb-4">Diagnostic Tests</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Quality Scorecard',
                  desc: 'Rate your last 5 posts against all 6 elements (Simple, Useful, Insightful, New, Relatable, Contagious). Score each 1-10. Average below 6 = quality problem.',
                },
                {
                  name: 'Value Lens Check',
                  desc: 'Does every piece pass at least one of the Five Value Lenses? If a piece is not actionable, implementable, educational, insightful, or aspirational, it should not ship.',
                },
                {
                  name: 'Conviction Test',
                  desc: 'Would you say this exact thing to a room of your best clients? If not, it is not ready.',
                },
                {
                  name: 'Belief Block Diagnostic',
                  desc: 'Most people in my industry believe X, but I believe Y. If you cannot fill that in for a piece, it lacks a point of view.',
                },
              ].map((t) => (
                <Card key={t.name}>
                  <h4 className="font-semibold text-white mb-2">{t.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
                </Card>
              ))}
            </div>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Score every piece before publishing against the 6 quality elements. Minimum threshold: 6/10 average.</FixItem>
              <FixItem>Apply the Conviction Test. If you would not say it to your best clients, rewrite or kill it.</FixItem>
              <FixItem>Ensure every piece passes at least one Value Lens. No lens = no value = no publish.</FixItem>
              <FixItem>Kill generic content. If 10 competitors could have posted it, it is not differentiated enough.</FixItem>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 4: CREATIVE EXECUTION
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="indigo" />
              Transmission Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={4} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Creative Execution</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="I freestyle in framework." />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Great ideas die in bad execution. This layer measures whether your hooks land,
              your structure holds attention, and your formats are working. Numbers do not lie.
            </p>

            {/* Metrics table */}
            <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <Th>Metric</Th>
                      <Th>Poor</Th>
                      <Th>Average</Th>
                      <Th>Good</Th>
                      <Th>Great</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Hook Rate</Td>
                      <Td className="text-red-400">&lt; 20%</Td>
                      <Td className="text-amber-400">20 &ndash; 35%</Td>
                      <Td className="text-blue-400">35 &ndash; 50%</Td>
                      <Td className="text-emerald-400">&gt; 50%</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Avg Watch Time</Td>
                      <Td className="text-red-400">&lt; 20%</Td>
                      <Td className="text-amber-400">20 &ndash; 40%</Td>
                      <Td className="text-blue-400">40 &ndash; 60%</Td>
                      <Td className="text-emerald-400">&gt; 60%</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Save Rate</Td>
                      <Td className="text-red-400">&lt; 1%</Td>
                      <Td className="text-amber-400">1 &ndash; 3%</Td>
                      <Td className="text-blue-400">3 &ndash; 5%</Td>
                      <Td className="text-emerald-400">&gt; 5%</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Share Rate</Td>
                      <Td className="text-red-400">&lt; 0.5%</Td>
                      <Td className="text-amber-400">0.5 &ndash; 1.5%</Td>
                      <Td className="text-blue-400">1.5 &ndash; 3%</Td>
                      <Td className="text-emerald-400">&gt; 3%</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Comment Quality</Td>
                      <Td className="text-red-400">Emoji only</Td>
                      <Td className="text-amber-400">Short agreement</Td>
                      <Td className="text-blue-400">Questions + tagging</Td>
                      <Td className="text-emerald-400">Stories + deep replies</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Engagement Rate</Td>
                      <Td className="text-red-400">&lt; 2%</Td>
                      <Td className="text-amber-400">2 &ndash; 4%</Td>
                      <Td className="text-blue-400">4 &ndash; 7%</Td>
                      <Td className="text-emerald-400">&gt; 7%</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* 5 Hook Types */}
            <h3 className="text-xl font-bold mt-12 mb-4">Five Hook Types</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr>
                      <Th>Hook Type</Th>
                      <Th>What It Does</Th>
                      <Th>Example Pattern</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Contrarian</Td>
                      <Td className="text-zinc-400">Challenges a common belief. Creates tension.</Td>
                      <Td className="text-zinc-400">"Most people think X. They are wrong."</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Curiosity Gap</Td>
                      <Td className="text-zinc-400">Opens a loop the viewer needs closed.</Td>
                      <Td className="text-zinc-400">"There is one thing separating 6 and 7 figure founders."</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Outcome First</Td>
                      <Td className="text-zinc-400">Leads with the result. Pulls people in with proof.</Td>
                      <Td className="text-zinc-400">"He went from 19k to 50k followers in 2 months. Here is how."</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Pattern Interrupt</Td>
                      <Td className="text-zinc-400">Breaks the scroll pattern with something unexpected.</Td>
                      <Td className="text-zinc-400">"Stop creating content. Seriously."</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Identity Mirror</Td>
                      <Td className="text-zinc-400">Reflects the viewer back to themselves. Creates recognition.</Td>
                      <Td className="text-zinc-400">"If you are a 7 figure founder who hates posting, this is for you."</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* Why-What-How Loop */}
            <h3 className="text-xl font-bold mt-12 mb-4">The Why-What-How Loop</h3>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              The default content structure. Every piece should move through this loop.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                {
                  step: 'Why',
                  desc: 'Why does this matter? Why should they care? Open with the tension, the problem, or the belief shift.',
                },
                {
                  step: 'What',
                  desc: 'What is the framework, concept, or insight? Name it. Define it. Make it concrete.',
                },
                {
                  step: 'How',
                  desc: 'How does it work? Show a good example and a bad example. Make it actionable.',
                },
              ].map((s) => (
                <Card key={s.step}>
                  <h4 className="text-blue-400 font-bold text-lg mb-2">{s.step}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </Card>
              ))}
            </div>

            {/* diagnostic tests */}
            <h3 className="text-xl font-bold mt-12 mb-4">Diagnostic Tests</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Hook Rate Audit',
                  desc: 'Pull your last 10 videos. Check the percentage that watched past the first 3 seconds. Below 30% average = hook problem.',
                },
                {
                  name: 'Structure Review',
                  desc: 'Does every piece follow a clear structure? Map each against the Why-What-How loop. If the structure is unclear, attention drops.',
                },
                {
                  name: 'Format Test',
                  desc: 'Are you testing 2-3 formats regularly? If every piece looks the same, you are leaving reach on the table.',
                },
                {
                  name: 'Save-to-Share Ratio',
                  desc: 'High saves + low shares = useful but not contagious. High shares + low saves = entertaining but not valuable. You want both.',
                },
              ].map((t) => (
                <Card key={t.name}>
                  <h4 className="font-semibold text-white mb-2">{t.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t.desc}</p>
                </Card>
              ))}
            </div>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Rewrite hooks on your bottom 5 performers using the 5 Hook Types. Test each type.</FixItem>
              <FixItem>Apply the Why-What-How structure to every piece before filming.</FixItem>
              <FixItem>Test 2-3 new formats every month. Measure hook rate and avg watch time per format.</FixItem>
              <FixItem>Track metrics weekly. Build a simple dashboard: hook rate, avg watch time, save rate, share rate.</FixItem>
              <FixItem>Dedicate 20-40% of output to testing. Environment, format, style, length.</FixItem>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 5: SYSTEM & CONSISTENCY
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="emerald" />
              Flywheel Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={5} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">System & Consistency</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="Your strategy should be simplification, not multiplication." />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              Talent without a system is a bottleneck. This layer checks whether you have
              a repeatable engine that produces content without depending on the founder
              being in the room every time.
            </p>

            {/* Content Engine Scorecard */}
            <h3 className="text-xl font-bold mb-4">Content Engine Scorecard</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <Th>Component</Th>
                      <Th>1 &ndash; 3</Th>
                      <Th>4 &ndash; 6</Th>
                      <Th>7 &ndash; 10</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Publishing Cadence</Td>
                      <Td className="text-red-400">Inconsistent. Gaps of weeks. No rhythm.</Td>
                      <Td className="text-amber-400">Mostly consistent but breaks when founder is busy.</Td>
                      <Td className="text-emerald-400">Predictable weekly cadence. Runs even when founder travels.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Capture System</Td>
                      <Td className="text-red-400">No system. Ideas live in the founder's head.</Td>
                      <Td className="text-amber-400">Notes app or scattered docs. Some ideas captured.</Td>
                      <Td className="text-emerald-400">Dedicated capture flow. Voice memos, extraction questions, idea library.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Batch Production</Td>
                      <Td className="text-red-400">Creates one piece at a time. Reactive.</Td>
                      <Td className="text-amber-400">Occasional batch days but not scheduled.</Td>
                      <Td className="text-emerald-400">Scheduled shoot days. 4-8 pieces per session. Calendar blocked.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Repurposing</Td>
                      <Td className="text-red-400">Every piece created from scratch.</Td>
                      <Td className="text-amber-400">Some repurposing but manual and inconsistent.</Td>
                      <Td className="text-emerald-400">Content waterfall system. One longform piece feeds 5-10 micro pieces.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Testing</Td>
                      <Td className="text-red-400">No testing. Posts whatever feels right.</Td>
                      <Td className="text-amber-400">Tries new things occasionally but does not track results.</Td>
                      <Td className="text-emerald-400">Dedicated test percentage. Tracks what works and doubles down.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Operator / Delegation</Td>
                      <Td className="text-red-400">Founder does everything. No delegation.</Td>
                      <Td className="text-amber-400">Has help but founder still the bottleneck for scripts or approvals.</Td>
                      <Td className="text-emerald-400">Operator runs day-to-day. Founder only films and approves at milestones.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* Extraction System */}
            <h3 className="text-xl font-bold mt-12 mb-4">The Extraction System</h3>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Three questions every week. The raw material for everything you create.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                {
                  q: 'What came up?',
                  desc: 'Client conversations, questions, objections, breakthroughs. The real problems surfacing this week.',
                },
                {
                  q: 'What do I believe?',
                  desc: 'Opinions, reframes, contrarian positions. What is rattling around that needs to be said.',
                },
                {
                  q: 'What worked?',
                  desc: 'Results, processes, wins. The proof that builds trust when shared.',
                },
              ].map((item) => (
                <Card key={item.q}>
                  <h4 className="text-blue-400 font-bold mb-2">{item.q}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Install a weekly extraction ritual. 15 minutes answering the 3 questions. Non-negotiable.</FixItem>
              <FixItem>Schedule batch production days. Block 1-2 half-days per month minimum. Shoot 4-8 pieces per session.</FixItem>
              <FixItem>Build a content waterfall. Every longform piece should feed at least 5 micro pieces across platforms.</FixItem>
              <FixItem>Hire or train an operator. Define clear handoff points: founder captures and films, operator handles everything else.</FixItem>
              <FixItem>Track publishing cadence weekly. If the rhythm breaks, the system has a hole. Find it and fix it.</FixItem>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          LAYER 6: AUTHORITY & CONVERSION
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <PhaseDot color="emerald" />
              Flywheel Phase
            </div>
            <div className="flex items-center gap-4 mb-6">
              <LayerNumber n={6} />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold">Authority & Conversion</h2>
                <p className="text-zinc-500 text-sm mt-1">Score out of 10</p>
              </div>
            </div>
            <AccentLine />

            <Quote text="Content does not sell. It earns trust." />

            <p className="text-zinc-400 mb-8 leading-relaxed">
              The final layer. This is where content compounds into business outcomes.
              Trust turns into inbound leads, referrals, invitations, and revenue.
              If the previous five layers are working, this one takes care of itself.
            </p>

            {/* Trust Layers */}
            <h3 className="text-xl font-bold mb-4">Five Trust Layers (Psychological Stack)</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr>
                      <Th>Layer</Th>
                      <Th>What It Builds</Th>
                      <Th>How It Shows Up in Content</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Competency</Td>
                      <Td className="text-zinc-400">They believe you know what you are doing.</Td>
                      <Td className="text-zinc-400">Teach content, breakdowns, frameworks. Show the work.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Identity</Td>
                      <Td className="text-zinc-400">They see themselves in you.</Td>
                      <Td className="text-zinc-400">Share your journey, your struggles, your values. Relatability hierarchy: activity, personality, philosophy.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Relatability</Td>
                      <Td className="text-zinc-400">They feel understood by you.</Td>
                      <Td className="text-zinc-400">Use their language. Name their frustrations before they do. Diagnostic selling over declarative.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Movement</Td>
                      <Td className="text-zinc-400">They want to be part of what you are building.</Td>
                      <Td className="text-zinc-400">Shared beliefs, tribe language, "for and against" positioning. They join. Not just follow.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Authority</Td>
                      <Td className="text-zinc-400">Others say it for you. Inferred. Not claimed.</Td>
                      <Td className="text-zinc-400">Testimonials, invitations, referrals, media features. Earned authority, not borrowed.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* Authority Signals */}
            <h3 className="text-xl font-bold mt-12 mb-4">Authority Signals</h3>
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <Th>Signal</Th>
                      <Th>Weak</Th>
                      <Th>Moderate</Th>
                      <Th>Strong</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-medium text-white">Inbound Leads</Td>
                      <Td className="text-red-400">Zero inbound. All outreach.</Td>
                      <Td className="text-amber-400">Some inbound but inconsistent.</Td>
                      <Td className="text-emerald-400">Predictable inbound flow. Content is the primary driver.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">DM Quality</Td>
                      <Td className="text-red-400">Generic or spam DMs only.</Td>
                      <Td className="text-amber-400">Some quality DMs. Mostly tire kickers.</Td>
                      <Td className="text-emerald-400">Qualified leads in DMs. They reference specific content.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Referrals</Td>
                      <Td className="text-red-400">No referrals from content.</Td>
                      <Td className="text-amber-400">Occasional "someone sent me your page."</Td>
                      <Td className="text-emerald-400">Regular referrals. People send others your content unprompted.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Authority Invitations</Td>
                      <Td className="text-red-400">No podcast, event, or collab invites.</Td>
                      <Td className="text-amber-400">Occasional invitations. Small stages.</Td>
                      <Td className="text-emerald-400">Regular invitations to speak, collaborate, or advise. Larger stages.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Content Attributed Revenue</Td>
                      <Td className="text-red-400">Cannot trace revenue to content.</Td>
                      <Td className="text-amber-400">Some revenue from content. Not tracked systematically.</Td>
                      <Td className="text-emerald-400">Clear attribution. Know exactly how much revenue content generates.</Td>
                    </tr>
                    <tr>
                      <Td className="font-medium text-white">Earned vs Borrowed</Td>
                      <Td className="text-red-400">All authority is borrowed (associations, logos, name drops).</Td>
                      <Td className="text-amber-400">Mix of earned and borrowed. Leaning on associations.</Td>
                      <Td className="text-emerald-400">Mostly earned. Your name carries weight independent of who you know.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* fix protocols */}
            <h3 className="text-xl font-bold mt-12 mb-4">Fix Protocols</h3>
            <ul className="space-y-3">
              <FixItem>Build all 5 trust layers into your content calendar. Rotate through competency, identity, relatability, movement, and authority content.</FixItem>
              <FixItem>Track inbound leads weekly. Note which pieces of content they reference. Double down on what converts.</FixItem>
              <FixItem>Ask every new lead: "How did you find me?" and "What piece of content made you reach out?" Track the answers.</FixItem>
              <FixItem>Shift from borrowed to earned authority. Reduce name drops. Increase original frameworks, IP, and documented results.</FixItem>
              <FixItem>Build a proof stack: testimonials, case studies, metrics. Every quarter, add new proof. Stale proof loses trust.</FixItem>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          6-WEEK WORKFLOW
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionLabel>6-Week Workflow</SectionLabel>
            <AccentLine />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Review Cycle</h2>
            <p className="text-zinc-400 mb-10 max-w-2xl">
              Run this diagnostic every 6 weeks. Score each layer. Compare to previous.
              Focus fixes on the lowest scoring layer first.
            </p>

            {/* Week by week table */}
            <TableWrap>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <Th>Week</Th>
                      <Th>Focus</Th>
                      <Th>Action</Th>
                      <Th>Deliverable</Th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-zinc-300">
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 1</Td>
                      <Td className="font-medium text-white">Score</Td>
                      <Td className="text-zinc-400">Run full diagnostic across all 6 layers. Score each out of 10.</Td>
                      <Td className="text-zinc-400">Completed scorecard with total Authority Score.</Td>
                    </tr>
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 2</Td>
                      <Td className="font-medium text-white">Diagnose</Td>
                      <Td className="text-zinc-400">Identify lowest scoring layer. Run the diagnostic tests for that layer.</Td>
                      <Td className="text-zinc-400">Root cause identified. Specific gap documented.</Td>
                    </tr>
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 3</Td>
                      <Td className="font-medium text-white">Fix</Td>
                      <Td className="text-zinc-400">Apply fix protocols for the diagnosed layer. One layer at a time.</Td>
                      <Td className="text-zinc-400">Fix implemented. Documented what changed.</Td>
                    </tr>
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 4</Td>
                      <Td className="font-medium text-white">Execute</Td>
                      <Td className="text-zinc-400">Produce content with the fix applied. Full publishing week.</Td>
                      <Td className="text-zinc-400">Content published with fix integrated.</Td>
                    </tr>
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 5</Td>
                      <Td className="font-medium text-white">Measure</Td>
                      <Td className="text-zinc-400">Track leading indicators. Did the fix move the metrics?</Td>
                      <Td className="text-zinc-400">Data collected. Comparison to baseline.</Td>
                    </tr>
                    <tr>
                      <Td className="font-semibold text-blue-400">Week 6</Td>
                      <Td className="font-medium text-white">Review</Td>
                      <Td className="text-zinc-400">Re-score the focused layer. Compare. Decide: continue fixing or move to next layer.</Td>
                      <Td className="text-zinc-400">Updated score. Next cycle plan locked.</Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TableWrap>

            {/* Leading vs Lagging */}
            <h3 className="text-xl font-bold mt-14 mb-6">Leading vs Lagging Indicators</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <Card>
                <h4 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wider">Leading Indicators</h4>
                <p className="text-xs text-zinc-500 mb-3">Move first. Predict outcomes.</p>
                <ul className="space-y-2.5">
                  {[
                    'Publishing consistency (posts per week)',
                    'Hook rate on new content',
                    'Save rate and share rate',
                    'Extraction sessions completed',
                    'Batch days executed per month',
                    'Content mix ratio (40/40/20)',
                    'Quality score average across posts',
                  ].map((item) => (
                    <li key={item} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h4 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wider">Lagging Indicators</h4>
                <p className="text-xs text-zinc-500 mb-3">Move later. Confirm results.</p>
                <ul className="space-y-2.5">
                  {[
                    'Follower growth rate',
                    'Inbound lead volume',
                    'DM quality and quantity',
                    'Referral frequency',
                    'Content attributed revenue',
                    'Authority invitations (podcasts, events)',
                    'Profile conversion rate',
                  ].map((item) => (
                    <li key={item} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Callout>
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="text-white font-semibold">The trajectory matters more than any single score.</span>{' '}
                A score of 28 that was 19 last cycle is better than a 40 that has not moved.
                Momentum compounds. Stagnation kills.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          CHECKLIST
          ════════════════════════════════════════ */}
      <Section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Diagnostic Checklist</SectionLabel>
            <AccentLine />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Score Your Engine</h2>
            <p className="text-zinc-400 mb-10 max-w-2xl">
              Work through each layer. Check off what is in place. Use the gaps to set your
              focus for the next 6-week cycle.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {/* Layer 1 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={1} />
                  <h3 className="font-bold text-white">Brand Clarity</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Brand Bible documented (identity, positioning, narrative, messaging)" />
                  <CheckItem label="Brand archetype defined with voice profile" />
                  <CheckItem label="Belief architecture written (category, product, brand, self, timing)" />
                  <CheckItem label="Visual identity documented (palette, typography, layout)" />
                  <CheckItem label="Stranger Test passed with 3 people" />
                  <CheckItem label="Content Scan: voice is distinct from competitors" />
                </div>
              </Card>

              {/* Layer 2 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={2} />
                  <h3 className="font-bold text-white">Strategy Alignment</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Content mix follows 40/40/20 (Discovery/Connection/Conversion)" />
                  <CheckItem label="Content pillars mapped to offer" />
                  <CheckItem label="Congruence Question passed with 3 followers" />
                  <CheckItem label="5 or fewer content pillars active" />
                  <CheckItem label="Authority and relatability content balanced" />
                  <CheckItem label="Language matches across content and sales pages" />
                </div>
              </Card>

              {/* Layer 3 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={3} />
                  <h3 className="font-bold text-white">Content Quality</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Quality score average above 6/10 across last 5 posts" />
                  <CheckItem label="Every piece passes at least one Value Lens" />
                  <CheckItem label="Conviction Test applied before publishing" />
                  <CheckItem label="Belief Block filled for opinion content" />
                  <CheckItem label="No generic content published (10-competitor test)" />
                  <CheckItem label="Simple, Useful, Insightful, New, Relatable, Contagious scored" />
                </div>
              </Card>

              {/* Layer 4 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={4} />
                  <h3 className="font-bold text-white">Creative Execution</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Hook rate above 30% average" />
                  <CheckItem label="Avg watch time above 40%" />
                  <CheckItem label="Save rate above 3%" />
                  <CheckItem label="Why-What-How structure applied to every piece" />
                  <CheckItem label="Testing 2-3 formats monthly" />
                  <CheckItem label="Metrics tracked weekly" />
                </div>
              </Card>

              {/* Layer 5 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={5} />
                  <h3 className="font-bold text-white">System & Consistency</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Weekly extraction session completed" />
                  <CheckItem label="Batch production days scheduled monthly" />
                  <CheckItem label="Content waterfall producing 5+ micro pieces per longform" />
                  <CheckItem label="Operator or team handles day-to-day" />
                  <CheckItem label="Publishing cadence maintained 4+ weeks straight" />
                  <CheckItem label="Capture system in place (not just memory)" />
                </div>
              </Card>

              {/* Layer 6 checklist */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <LayerNumber n={6} />
                  <h3 className="font-bold text-white">Authority & Conversion</h3>
                </div>
                <div className="space-y-3">
                  <CheckItem label="Inbound leads tracked weekly" />
                  <CheckItem label="DM quality improving (qualified, reference specific content)" />
                  <CheckItem label="Referrals happening without prompting" />
                  <CheckItem label="Authority invitations increasing" />
                  <CheckItem label="Content attributed revenue tracked" />
                  <CheckItem label="Earned authority outweighs borrowed authority" />
                </div>
              </Card>
            </div>

            {/* Total score card */}
            <Card className="text-center py-8">
              <h3 className="text-xl font-bold text-white mb-2">Your Total Authority Score</h3>
              <p className="text-zinc-500 text-sm mb-6">Add your layer scores. Maximum 60.</p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="bg-[#18181b] border border-white/[0.06] rounded-xl px-6 py-3">
                  <span className="text-3xl font-extrabold text-blue-400">__ </span>
                  <span className="text-zinc-500 text-lg">/ 60</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1">50-60 Engine Running</span>
                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full px-3 py-1">35-49 Foundation Solid</span>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1">20-34 Major Gaps</span>
                <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-3 py-1">Under 20 Starting Over</span>
              </div>
            </Card>

            {/* Final callout */}
            <Callout>
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="text-white font-semibold">This is not a one-time audit.</span>{' '}
                Run the diagnostic every 6 weeks. Compare scores. Fix the weakest layer first.
                The system compounds when every layer improves, even by a single point, every cycle.
                That is how you build an authority engine.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
