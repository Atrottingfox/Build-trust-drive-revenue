import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

/* ───────────────────────────── animation helpers ───────────────────────────── */

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.section>
  );
}

/* ───────────────────────────── objection card block ───────────────────────────── */

function ObjectionCard({
  objection,
  belief,
  shift,
  contentRx,
}: {
  objection: string;
  belief: string;
  shift: string;
  contentRx: string;
}) {
  return (
    <div className="space-y-0">
      {/* Objection says */}
      <div className="bg-red-500/[0.06] border border-red-500/[0.12] rounded-xl p-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-red-400 mb-1">Objection says</p>
        <p className="text-zinc-300 text-[15px] font-medium italic">{objection}</p>
      </div>
      <p className="text-center text-zinc-700 text-lg py-1">↓</p>

      {/* Belief underneath */}
      <div className="bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-xl p-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1">Belief underneath</p>
        <p className="text-zinc-300 text-[15px]">{belief}</p>
      </div>
      <p className="text-center text-zinc-700 text-lg py-1">↓</p>

      {/* Shift required */}
      <div className="bg-blue-500/[0.06] border border-blue-500/[0.12] rounded-xl p-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-1">Shift required</p>
        <p className="text-zinc-300 text-[15px]">{shift}</p>
      </div>
      <p className="text-center text-zinc-700 text-lg py-1">↓</p>

      {/* Content Rx */}
      <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">Content Rx</p>
        <p className="text-zinc-300 text-[15px]">{contentRx}</p>
      </div>
    </div>
  );
}

/* ───────────────────────────── reusable table ───────────────────────────── */

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            {headers.map((h, i) => (
              <th key={i} className="py-3 px-4 text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-zinc-800/60 hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="py-3 px-4 text-zinc-300 text-[14px]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────────────── callout ───────────────────────────── */

function Callout({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'emerald' | 'amber' | 'red' }) {
  const styles = {
    blue: 'bg-blue-500/[0.06] border-blue-500/[0.12] text-blue-300',
    emerald: 'bg-emerald-500/[0.06] border-emerald-500/[0.12] text-emerald-300',
    amber: 'bg-amber-500/[0.06] border-amber-500/[0.12] text-amber-300',
    red: 'bg-red-500/[0.06] border-red-500/[0.12] text-red-300',
  };
  return (
    <div className={`border rounded-xl p-5 text-[15px] leading-relaxed ${styles[variant]}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function BeliefShift() {
  return (
    <div className="min-h-screen bg-base">
      {/* ── gradient border ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-base to-blue-900/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300/90 font-medium">Authority Engine</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl md:text-[5.5rem] font-black tracking-tight leading-[0.92] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-white">Dissolve every</span>
              <br />
              <span className="text-white">objection before</span>
              <br />
              <GradientText>the conversation.</GradientText>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Map what your audience believes. Identify the objections blocking the sale. Create content that shifts beliefs systematically. So by the time they reach out, the selling is already done.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════ THE PRINCIPLE ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Content does not sell. <GradientText>It earns trust.</GradientText>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed text-center mb-10 max-w-3xl mx-auto">
              Every unresolved objection is a belief problem. Your audience is not saying "no" to you. They are saying "I don't believe this will work for me yet." The job of your content is not to pitch. It is to dissolve the beliefs standing between where they are and where they need to be to buy.
            </p>

            {/* Quote */}
            <div className="border-l-2 border-blue-500/40 pl-6 mb-14">
              <p className="text-zinc-300 text-lg italic leading-relaxed">
                "Diagnostic selling over declarative selling. Pull out a small problem that reveals a bigger one."
              </p>
            </div>

            {/* 5 stat cards */}
            <div className="grid grid-cols-5 gap-3 mb-14">
              {[
                { num: '1', label: 'Category' },
                { num: '2', label: 'Method' },
                { num: '3', label: 'Provider' },
                { num: '4', label: 'Self' },
                { num: '5', label: 'Timing' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 text-center hover:border-white/[0.10] transition-all"
                >
                  <p className="text-2xl font-black text-blue-400 mb-1">{item.num}</p>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>

            {/* 5 Belief Layers table */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">The 5 Belief Layers</h3>
              <DataTable
                headers={['Layer', 'The Belief Required', 'The Question They Ask Themselves']}
                rows={[
                  ['1. Category', 'This type of solution works', 'Does content marketing actually work for someone like me?'],
                  ['2. Method', 'This specific approach is the right one', 'Why this method over hiring an agency or using AI?'],
                  ['3. Provider', 'This person can deliver', 'Has this person done it for someone at my level?'],
                  ['4. Self', 'I can actually do this', 'Am I the kind of person who can pull this off?'],
                  ['5. Timing', 'Now is the right time', 'Can I afford to start this right now?'],
                ]}
              />
            </div>

            <Callout variant="blue">
              These beliefs must be earned in sequence. If someone does not believe content marketing works at all (Layer 1), showing them your guarantee (Layer 3) is a waste. Meet them where they are.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ THE PROCESS ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              The <GradientText>Process</GradientText>
            </h2>
            <p className="text-zinc-400 text-center mb-14 text-lg">
              Five steps to turn objections into content that converts.
            </p>

            <div className="space-y-4">
              {[
                { step: '01', title: 'List objections', desc: 'Write down every reason your audience hesitates, delays, or says no.' },
                { step: '02', title: 'Find the belief underneath', desc: 'Identify the core belief driving each objection. What do they not yet believe?' },
                { step: '03', title: 'Define the shift required', desc: 'Articulate the new belief they need to hold before they will buy.' },
                { step: '04', title: 'Match a contrarian take', desc: 'Find the angle that reframes their current belief. Challenge the assumption directly.' },
                { step: '05', title: 'Assign content', desc: 'Choose the format and type (case study, hot take, story, teach) that best delivers the shift.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 flex items-start gap-5 hover:border-white/[0.10] transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-2xl font-black text-blue-500/40 shrink-0">{item.step}</span>
                  <div>
                    <p className="text-white font-semibold mb-1">{item.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ LAYER 1: CATEGORY SKEPTICISM ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-blue-500/20">1</span>
              <h2 className="text-3xl font-bold text-white">Category Skepticism</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-10 ml-[3.5rem]">Does this type of solution even work?</p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-10 hover:border-white/[0.10] transition-all">
              <ObjectionCard
                objection="Content marketing doesn't work for my industry."
                belief="They believe content is for influencers and B2C brands. They have never seen a founder at their level use content to generate serious revenue. The whole category feels irrelevant to them."
                shift="They need to see proof that founders at their level, in their world, have used content to build authority and drive pipeline. Not theory. Real outcomes."
                contentRx='Case studies and demonstrations. "Here is how Taki Moore added $5M in revenue from content in 6 months." Show the result. Let the proof dissolve the disbelief.'
              />
            </div>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">Common Category Objections</h3>
              <DataTable
                headers={['Objection', 'Belief Underneath', 'Content That Shifts It']}
                rows={[
                  [
                    '"I\'ve tried content before and it didn\'t work."',
                    'Content does not generate ROI.',
                    'Breakdown showing why most content fails (no strategy, no system) and what changes when you install one.',
                  ],
                  [
                    '"My clients aren\'t on social media."',
                    'My audience is not reachable through content.',
                    'Case study of a B2B founder whose content brought in enterprise clients. Show the path.',
                  ],
                  [
                    '"Content is for influencers, not serious businesses."',
                    'Content marketing is not a legitimate growth channel.',
                    'Hot take reframing content as the trust layer of the sales process. Not entertainment. Infrastructure.',
                  ],
                  [
                    '"I get all my business from referrals."',
                    'Referrals are enough. Content adds nothing.',
                    'Teach piece showing how content amplifies referrals. People Google you before they reply to the introduction.',
                  ],
                  [
                    '"I don\'t want to be a creator."',
                    'Content = becoming a performer.',
                    'Story about a founder who built authority without dancing on camera. Reframe what "content" actually means at this level.',
                  ],
                ]}
              />
            </div>

            <Callout variant="blue">
              Category content is Discovery content. It sits at the top of the funnel. Its job is not to sell your offer. Its job is to make them believe that this type of solution is worth paying attention to. 40% of your content should live here.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ LAYER 2: METHOD SKEPTICISM ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-blue-500/20">2</span>
              <h2 className="text-3xl font-bold text-white">Method Skepticism</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-10 ml-[3.5rem]">Why this approach over the alternatives?</p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-10 hover:border-white/[0.10] transition-all">
              <ObjectionCard
                objection="Why wouldn't I just hire an agency? Or use AI?"
                belief="They believe agencies or AI tools can replace strategy. They think the bottleneck is production volume, not positioning and system design. They have not yet seen why a founder led engine outperforms an outsourced one."
                shift="They need to understand why agencies fail at this level. The founder is the brand. You cannot outsource voice, conviction, or trust. AI can assist, but it cannot replace the human signal."
                contentRx='Teach and breakdown content. "Here is why agencies fail founders between $1M and $50M." Walk through the structural problem. Let them diagnose their own situation.'
              />
            </div>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">Common Method Objections</h3>
              <DataTable
                headers={['Objection', 'Belief Underneath', 'Content That Shifts It']}
                rows={[
                  [
                    '"I\'ll just hire an agency to handle it."',
                    'Agencies can replicate my voice and authority.',
                    'Breakdown of why agencies fail for founder led brands. The founder IS the signal. You cannot outsource that.',
                  ],
                  [
                    '"Can\'t AI just do this now?"',
                    'AI replaces the need for a system or strategist.',
                    'Teach piece showing AI as a tool inside a system, not a replacement for one. The strategy still needs a human.',
                  ],
                  [
                    '"I should just post more consistently."',
                    'Volume is the missing piece.',
                    'Hot take: "Volume is the wrong play." Show evidence that value driven content outperforms content mills.',
                  ],
                  [
                    '"I already have a team handling content."',
                    'Having a team equals having a system.',
                    'Breakdown of the difference between a team posting content and a team running a content engine. Resources without systems is drag.',
                  ],
                  [
                    '"I\'ll figure it out myself."',
                    'This is not complex enough to need outside help.',
                    'Story about the gap between knowing what to do and having the system to do it consistently. Show what self taught looks like after 12 months vs installed in 90 days.',
                  ],
                ]}
              />
            </div>

            <Callout variant="blue">
              Method content is Connection content. It sits in the middle of the funnel. Its job is to help them see why your approach is different from the alternatives. 40% of your content should live here alongside Category.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ LAYER 3: PROVIDER SKEPTICISM ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-blue-500/20">3</span>
              <h2 className="text-3xl font-bold text-white">Provider Skepticism</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-10 ml-[3.5rem]">Can this person actually deliver?</p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-10 hover:border-white/[0.10] transition-all">
              <ObjectionCard
                objection="Have you worked with someone at my level?"
                belief="They believe their situation is unique. They need to see you have operated at their level or higher. Without that proof, everything else is theory."
                shift="They need specific evidence. Names, numbers, outcomes. Not testimonials that say 'great experience.' Proof that says '$5M in 6 months from content.'"
                contentRx={`Case studies, demonstrations, and behind the scenes content. Show the work. Show the results. Show the guarantee. "If by day 90 you don't have a documented Authority Engine running, we work free until you do."`}
              />
            </div>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">Common Provider Objections</h3>
              <DataTable
                headers={['Objection', 'Belief Underneath', 'Content That Shifts It']}
                rows={[
                  [
                    '"Have you done this for someone like me?"',
                    'My situation is unique and unproven.',
                    'Case study with a specific client at their level. Show the before, the process, and the outcome.',
                  ],
                  [
                    '"What if it doesn\'t work?"',
                    'There is no safety net.',
                    'Content about the guarantee. "If by day 90 you don\'t have a documented Authority Engine running, we work free until you do." Remove the risk.',
                  ],
                  [
                    '"I\'ve been burned by consultants before."',
                    'Consultants over promise and under deliver.',
                    'Behind the scenes of the actual process. Show the milestones, the check ins, the real work. Let transparency dissolve the skepticism.',
                  ],
                  [
                    '"How is this different from every other content strategist?"',
                    'This is a commoditised service.',
                    'Demonstration of the named system (Authority Engine, Content.OS). Show the framework. When the comparison becomes "this vs nothing" instead of "you vs cheaper option," you win.',
                  ],
                ]}
              />
            </div>

            <Callout variant="blue">
              Provider content is Conversion content. It targets the 20% of your audience ready to buy. Its job is to stack proof and remove risk. This is your proof stack: case studies, guarantees, behind the scenes, named systems.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ LAYER 4: SELF SKEPTICISM ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-blue-500/20">4</span>
              <h2 className="text-3xl font-bold text-white">Self Skepticism</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-10 ml-[3.5rem]">Can I actually pull this off?</p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-10 hover:border-white/[0.10] transition-all">
              <ObjectionCard
                objection="I'm just not a content person."
                belief="They believe content requires a personality type they do not have. They see creators and assume it requires charisma, extroversion, or constant availability. They do not believe they can show up consistently."
                shift="They need to see founders like them. Not performers. Not influencers. Real operators who built authority without changing who they are. Relatability over aspiration."
                contentRx='Story content using the Relatability Hierarchy: Activity first (show the daily work), then Personality (show the human behind the brand), then Philosophy (share the beliefs that drive the work).'
              />
            </div>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">Common Self Objections</h3>
              <DataTable
                headers={['Objection', 'Belief Underneath', 'Content That Shifts It']}
                rows={[
                  [
                    '"I\'m not good on camera."',
                    'Content requires performance skills I lack.',
                    'Story about a client who was terrified on camera and how the system made it irrelevant. Frameworks over freestyle.',
                  ],
                  [
                    '"I don\'t have time for this."',
                    'Content requires more time than I have.',
                    'Breakdown of the actual time commitment. 3 to 5 half days over 90 days. The system does the heavy lifting.',
                  ],
                  [
                    '"My ideas aren\'t original enough."',
                    'I need to be novel to be valuable.',
                    'Hot take: "Your ideas don\'t need to be original. They need to be yours." Show how conviction beats novelty.',
                  ],
                  [
                    '"I\'ve started and stopped three times."',
                    'I cannot sustain this.',
                    'Teach piece on why most founders stop: no system, no operator, no rhythm. Show what changes when you install the engine.',
                  ],
                  [
                    '"What if people judge me?"',
                    'Visibility is a risk to my reputation.',
                    'Story about the antidote to judgment. "The antidote to jealousy is vulnerability." Show how showing up authentically builds trust faster than hiding.',
                  ],
                ]}
              />
            </div>

            <Callout variant="amber">
              Self belief content uses the Relatability Hierarchy: Activity, then Personality, then Philosophy. Start with what they do every day. Then show who they are. Then share what they believe. This sequence builds self trust. Self trust leads to self confidence. Self confidence leads to self belief.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ LAYER 5: TIMING SKEPTICISM ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-blue-500/20">5</span>
              <h2 className="text-3xl font-bold text-white">Timing Skepticism</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-10 ml-[3.5rem]">Is now the right time?</p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-10 hover:border-white/[0.10] transition-all">
              <ObjectionCard
                objection="Let me get through this quarter first."
                belief="They believe the timing is wrong. There is always something more urgent. They are waiting for a window that will never open on its own. Delay feels like a rational decision but it is usually fear disguised as logic."
                shift="They need to see the cost of waiting. Not through pressure. Through clarity. Show what happens when competitors build authority while they sit on the sideline."
                contentRx='Reframe content. "Every quarter you wait, someone with less expertise and more visibility takes your spot." Show the compounding cost of delay, not the urgency of acting.'
              />
            </div>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-4">Common Timing Objections</h3>
              <DataTable
                headers={['Objection', 'Belief Underneath', 'Content That Shifts It']}
                rows={[
                  [
                    '"Let me get through this quarter first."',
                    'Now is not the right time.',
                    'Reframe: the cost of waiting is invisible but compounding. Show what 90 days of inaction looks like vs 90 days of building.',
                  ],
                  [
                    '"I need to sort out my offer first."',
                    'Everything else needs to be perfect before content.',
                    'Hot take: "Content clarifies your offer. You don\'t wait for clarity to start. You start to find it."',
                  ],
                  [
                    '"We just hired a marketing person."',
                    'We already have a solution in motion.',
                    'Teach piece on the difference between a marketer and a content engine. One posts. The other compounds trust.',
                  ],
                  [
                    '"Things are too busy right now."',
                    'Adding content will add stress.',
                    'Story about a founder who was "too busy" and how the system reduced their content load, not increased it. The engine runs without them.',
                  ],
                ]}
              />
            </div>

            <Callout variant="red">
              Timing content is not about pressure. It is not urgency tactics or countdown timers. It is about helping them see the compounding cost of inaction. Show the gap between where they are and where they could be. Let the math do the persuading.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ THE COMPLETE MAP ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              The Complete <GradientText>Belief Shift Map</GradientText>
            </h2>
            <p className="text-zinc-400 text-center mb-14 text-lg">
              Every layer mapped to its function, format, and position in the funnel.
            </p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all overflow-x-auto">
              <DataTable
                headers={['Layer', 'Objection Theme', 'Content Function', 'Best Formats', 'Funnel Position']}
                rows={[
                  ['1. Category', 'Does this work?', 'Dissolve category disbelief', 'Case study, hot take, breakdown', 'Discovery (top)'],
                  ['2. Method', 'Why this approach?', 'Differentiate the method', 'Teach, breakdown, hot take', 'Connection (middle)'],
                  ['3. Provider', 'Can you deliver?', 'Stack proof and remove risk', 'Case study, demo, BTS', 'Conversion (bottom)'],
                  ['4. Self', 'Can I do this?', 'Build self belief', 'Story, relatability, reframe', 'Connection (middle)'],
                  ['5. Timing', 'Is now the time?', 'Show cost of inaction', 'Reframe, teach, story', 'Conversion (bottom)'],
                ]}
              />
            </div>

            <Callout variant="emerald">
              5 layers x 5 objections = 25 pieces of content. Each one designed to shift a specific belief. That is not a content calendar. That is a belief architecture. And when all 25 pieces are working, the sale is done before the conversation starts.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ CONTENT PLAN ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Weekly <GradientText>Rotation</GradientText>
            </h2>
            <p className="text-zinc-400 text-center mb-14 text-lg">
              One layer per day. One belief shifted per piece. Five days. Repeat.
            </p>

            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-14 hover:border-white/[0.10] transition-all">
              <DataTable
                headers={['Day', 'Layer', 'Format', 'Goal']}
                rows={[
                  ['Monday', 'Category', 'Hot take', 'Challenge their assumptions about content marketing as a channel.'],
                  ['Tuesday', 'Method', 'Teach', 'Educate on why your approach outperforms the alternatives.'],
                  ['Wednesday', 'Provider', 'Case study', 'Stack proof. Show real names, real numbers, real outcomes.'],
                  ['Thursday', 'Self', 'Story', 'Build relatability. Show founders like them who made it work.'],
                  ['Friday', 'Timing', 'Reframe', 'Show the cost of waiting. Let the math do the persuading.'],
                ]}
              />
            </div>

            {/* How to fill in the map */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8 hover:border-white/[0.10] transition-all">
              <h3 className="text-lg font-bold text-white mb-6">How to fill in the map</h3>
              <div className="space-y-4">
                {[
                  'List every objection you have heard in the last 90 days. Sales calls, DMs, emails, conversations. Write them all down.',
                  'Assign each objection to a belief layer. Category, Method, Provider, Self, or Timing. If it does not fit cleanly, it probably sits between two layers. Pick the primary one.',
                  'Write the belief underneath. What do they not yet believe? Be specific. "They think agencies can do this" is better than "they are skeptical."',
                  'Define the shift required. What do they need to believe instead? Write it as a statement: "They need to believe that founder led content outperforms agency content."',
                  'Match a content format. Case study, hot take, teach, story, breakdown, demonstration. Pick the one that best delivers the shift.',
                  'Create and publish. One piece per objection. Track which pieces generate the most inbound. The content that generates the most inbound tells you which belief layer your audience is stuck at.',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-sm mt-0.5 shrink-0">{i + 1}.</span>
                    <p className="text-zinc-300 text-[14px] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <Callout variant="blue">
              The content that generates the most inbound tells you which belief layer your audience is stuck at. Double down there. That is your leverage point.
            </Callout>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════ TWO TOOLS ONE ENGINE ═══════════════════ */}
      <Section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Two Tools. <GradientText>One Engine.</GradientText>
            </h2>
            <p className="text-zinc-400 text-center mb-14 text-lg">
              The Belief Architecture Builder and the Belief Shift Engine work together. One looks inward. The other looks outward.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {/* Belief Architecture Builder */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-4">
                  <span className="text-xs text-blue-300/90 font-medium">Inward facing</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Belief Architecture Builder</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Maps the 5 belief layers your audience must hold before they buy. Category belief, product belief, brand belief, self belief, timing belief. This is your internal strategic document. It defines what your content must accomplish.
                </p>
                <ul className="space-y-2">
                  {['Defines the beliefs required', 'Maps to your offer structure', 'Guides your messaging', 'Lives inside your Brand Bible'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Belief Shift Engine */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] mb-4">
                  <span className="text-xs text-emerald-300/90 font-medium">Outward facing</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Belief Shift Engine</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Turns those beliefs into content. Every objection gets mapped to a belief, a shift, and a piece of content designed to move them. This is your execution layer. It turns strategy into posts, videos, and stories that dissolve resistance.
                </p>
                <ul className="space-y-2">
                  {['Turns beliefs into content', 'Maps objections to formats', 'Creates a content engine', 'Lives inside your posting rhythm'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Final callout */}
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 text-center hover:border-white/[0.10] transition-all">
              <p className="text-xl font-bold text-white mb-3">
                Your beliefs become their beliefs through content.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
                The Belief Architecture defines what they need to believe. The Belief Shift Engine creates the content that installs those beliefs. Together, they turn your content into a conversion system that works before you ever get on a call.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
