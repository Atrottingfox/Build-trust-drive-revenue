import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Compass, Video, Target, Check, Calendar, Layers, Eye, Megaphone, Mic, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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

export default function UndeniableNotes() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Working Notes for Undeniable"
        description="Draft trust path sketch for Undeniable. Working notes. Not the install."
        path="/undeniable-notes"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Appendix · Working notes</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                Draft trust path sketch
                <br />
                <span className="text-zinc-500">for Undeniable.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                This is not the install. It is a working sketch. My read on where the leverage points are for Undeniable, and a glimpse of what a 6 week cycle could look like. We would build the real thing together in Phase 1.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT TO DO WITH THIS DOC */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-4">What this doc is</p>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>Three sections.</p>
                <p><span className="text-white font-semibold">A.</span> A tight read on the gaps and where the opportunity sits.</p>
                <p><span className="text-white font-semibold">B.</span> A skeleton of what a 6 week cycle could look like for Undeniable. The shape, not the titles.</p>
                <p><span className="text-white font-semibold">C.</span> A 10 question diagnostic checklist you can run yourself.</p>
                <p className="text-zinc-500 text-sm pt-2 border-t border-zinc-800/50">
                  We would build the real install together. This is a sketch.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* A. GAPS & OPPORTUNITIES */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">A · Gaps & opportunities</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Three gaps.
              <br />
              <span className="text-zinc-500">Three opportunities.</span>
            </h2>

            <div className="space-y-8">
              {/* Gap 1 */}
              <div className="glow-card p-8 md:p-10">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Gap 01</p>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4 leading-tight">
                  No single written cold → room → continuity map.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Every campaign starts from scratch. Every hook is a fresh guess. The team can describe what they did last time, but not why, or what each piece was supposed to do.
                </p>
                <p className="text-blue-400 font-semibold text-sm mb-2">Opportunity</p>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  One pager that every future campaign gets checked against. Before any post goes out, the question becomes "where on the path does this live?" Marketing decisions stop being subjective.
                </p>
              </div>

              {/* Gap 2 */}
              <div className="glow-card p-8 md:p-10">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Gap 02</p>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4 leading-tight">
                  Client stories are under leveraged.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  You have winners. The room is producing real results. But those results are mostly screenshots in Slack and the occasional tagged post. They should be doing more work.
                </p>
                <p className="text-blue-400 font-semibold text-sm mb-4">Opportunity</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  Turn 3 to 5 of your best recent winners into:
                </p>
                <ul className="space-y-2">
                  {[
                    "1 flagship video breakdown. Their journey, on your channel.",
                    '1 written case study. The version you can paste into a DM or a sales doc.',
                    '1 room only "here\'s what\'s possible" story block. Used to lift existing members and convert new ones.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 text-sm leading-relaxed mt-5">
                  These become the highest leverage assets in your library. They sell the room without selling.
                </p>
              </div>

              {/* Gap 3 */}
              <div className="glow-card p-8 md:p-10">
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Gap 03</p>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4 leading-tight">
                  Hooks live in people's heads.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  When something works, the team feels it. But there is no place where the best angles are written down, sorted, and re used. So the same insights get rediscovered every campaign.
                </p>
                <p className="text-blue-400 font-semibold text-sm mb-4">Opportunity</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  A simple Hook Bank with three buckets.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="border border-zinc-800/50 rounded-xl p-5 bg-black/30">
                    <p className="text-white font-semibold text-sm mb-2">Why now</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">Tension around what is shifting in the market that makes the room urgent.</p>
                  </div>
                  <div className="border border-zinc-800/50 rounded-xl p-5 bg-black/30">
                    <p className="text-white font-semibold text-sm mb-2">Why Rhys</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">Founder beliefs, contrarian takes, why your approach works when others do not.</p>
                  </div>
                  <div className="border border-zinc-800/50 rounded-xl p-5 bg-black/30">
                    <p className="text-white font-semibold text-sm mb-2">Why this room</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">What makes Undeniable structurally different from a course, a community, or a generic mastermind.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* B. SAMPLE 6 WEEK CYCLE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">B · Sample 6 week cycle</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              The shape.
              <br />
              <span className="text-zinc-500">Not the titles.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              This is what a 6 week cycle could look like. Each week is a job to be done. The actual hooks, titles, and CTAs get written together in Phase 1.
            </p>

            <div className="space-y-4 mb-10">
              {[
                {
                  week: 'Week 1',
                  icon: Eye,
                  job: 'Belief shift',
                  description: 'Big belief shift about what "real business" looks like for PTs.',
                },
                {
                  week: 'Week 2',
                  icon: Video,
                  job: 'Behind the scenes + journey',
                  description: 'Behind the scenes of the room. Plus one client journey, told properly.',
                },
                {
                  week: 'Week 3',
                  icon: Target,
                  job: 'Tactical breakdown',
                  description: '"How we fixed X bottleneck" for one specific member. Mechanism visible.',
                },
                {
                  week: 'Week 4',
                  icon: Megaphone,
                  job: 'Day in the room + soft invite',
                  description: '"Day in the room" recap content. Soft invite at the close.',
                },
                {
                  week: 'Week 5',
                  icon: Layers,
                  job: 'Myth bust + proof',
                  description: 'Service or delivery myth busting, with a live example from the room.',
                },
                {
                  week: 'Week 6',
                  icon: Check,
                  job: 'Results + hard invite',
                  description: 'Results montage. Hard invite to the next room.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-6 md:p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-3 sm:w-40 sm:flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm font-medium uppercase tracking-widest">{item.week}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-1">{item.job}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-zinc-400 text-sm leading-relaxed">
                A note on this. The cycle runs as a loop. Week 6 hands back into Week 1 with a refreshed belief shift, informed by what the previous cycle taught us. Compound effect happens by Cycle 3.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* C. DIAGNOSTIC CHECKLIST */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">C · Diagnostic checklist</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Ten questions.
              <br />
              <span className="text-zinc-500">Run them on yourself.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              A short audit of your current trust path. The more yeses, the less work the install has to do.
            </p>

            <div className="glow-card p-8 md:p-10">
              <ul className="space-y-5">
                {[
                  'Can someone land on your Instagram today and, in 10 posts, understand who you are for, what you do, and why now?',
                  'Do you have at least 3 client stories you would be happy to boost as ads tomorrow?',
                  'Does your team know which lead magnet to use at each stage of a launch without asking you?',
                  'Can you name the single biggest belief shift your audience needs to make before they buy?',
                  'Is there a documented trust path from first touch to room to continuity that someone new on the team could follow?',
                  'Do you have a written list of hooks and angles that consistently work, ranked by performance?',
                  'When someone watches a YouTube video, is there a clear next step that does not depend on them sending a DM?',
                  'Do you have a way to track which content sourced your last 10 room buyers?',
                  'Could someone hand off your content creation to a trained operator without losing your voice?',
                  'Is there a regular weekly scorecard your team fills out without prompting?',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-blue-400 font-display font-extrabold text-sm flex-shrink-0 w-6 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mt-8 max-w-3xl">
              Honest count. If under 4 yeses, the install has real ground to cover. If 4 to 7, we are tuning what's already there. If 8+, we are sharpening, not building.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CLOSING */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
              This is not the full install. We would build the real thing together. But it should give you a sense of how I think about your specific situation, and what the next 90 days would actually look like.
            </p>
            <a
              href="/undeniable"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to the proposal
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
