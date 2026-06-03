import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
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
        description="Current channel overview, gaps, and specific improvements. Non-prescriptive draft for discussion."
        path="/undeniable-notes"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Appendix · Working notes</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              Channel & content overview
              <br />
              <span className="text-zinc-500">for Undeniable.</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-medium italic">Non prescriptive · for discussion</span>
            </div>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              My current read on where the content is, the gaps I see, and the specific improvements I would test inside the first 90 days. The real install gets built together in Phase 1.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CURRENT OVERVIEW */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Current overview</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Where the channels sit today.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Instagram is the primary distribution channel. Strong founder presence, recognisable face, consistent posting rhythm. YouTube is light — early uploads, a few longer pieces, not yet running as a planned cycle. Email is in place but not loaded as a trust transfer channel.
              </p>
              <p>
                The room and workshop calendar carries the conversion. Most buyers come from warm. Cold to warm to room is mostly happening inside DMs and inside the workshop itself, not the content layer.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* GOOD */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Good</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              What's clearly working.
            </h2>
            <ul className="space-y-4">
              {[
                'Strong, clear avatar. 7 figure online PTs and fitness founders. No ambiguity about who you are talking to.',
                "Real results in the room. Continuity model holds. Members compound across cycles.",
                "Active testimonial flow and a heavy word of mouth phase about to kick in.",
                "Founder voice is recognisable. Identity is locked. No identity crisis to solve.",
                "Workshop calendar is consistent. That gives us a natural rhythm to wrap the content cycle around.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-400 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* GAPS */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Gaps</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Where the leverage is sitting unused.
            </h2>

            <div className="space-y-10">
              {/* Gap 1 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">01</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Niche · one core message</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed mb-4">
                  Targeting fitness founders is strong. But the core message is not yet dialled identically across every channel. Instagram says one thing. YouTube says a slightly different thing. DMs land another way.
                </p>
                <div className="border-l-2 border-blue-500/40 pl-5 py-2">
                  <p className="text-zinc-500 text-sm italic mb-2">Potential option to discuss / test</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">For fitness founders who want to build a 7 figure business worth selling. Or who want their training business to outgrow their hours.</p>
                </div>
              </div>

              {/* Gap 2 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">02</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Video length and depth</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed mb-3">
                  Short videos can struggle to rank for competitive search terms and are less likely to surface via recommendation. They also can't build the depth of trust that gets someone to take action.
                </p>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Top content in this space runs 20 to 50+ minutes. Longer content generates more watch time, which the algorithm rewards. Right now this depth layer is missing.
                </p>
              </div>

              {/* Gap 3 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">03</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Titles and hooks · specificity</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Titles and hooks should be specific, credibility anchored, and reinforced in the first 30 seconds. Only things you can say. Undeniable evidence. Right now the highest performing angles are not getting weaponised into titles consistently.
                </p>
              </div>

              {/* Gap 4 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">04</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Social proof and collaboration</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Your client stories are under leveraged. Building in live interactive videos with members, plus structured collaboration with adjacent voices, multiplies trust without adding founder hours.
                </p>
              </div>

              {/* Gap 5 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">05</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Long form evergreen assets</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Right now there are no flagship long videos ranking for broad search terms. A handful of long form evergreen assets funnel viewers into the rest of the content for months or years. The library compounds.
                </p>
              </div>

              {/* Gap 6 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">06</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">CTAs · sales first vs value first</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  When the first line of every description points cold viewers straight at the offer, it triggers defensive pattern recognition. Value first CTAs that lead through a lead magnet land harder for cold audiences.
                </p>
              </div>

              {/* Gap 7 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">07</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Core evergreen lead magnet trust assets</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  No small selection of core evergreen lead magnets that get downloaded consistently from videos and posts. These trust assets sit at the back of the nurture sequence and convert intent into action. Right now this layer is mostly missing.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mt-3 italic">
                  Each video should have one lead magnet specific to that video AND one core evergreen lead magnet always available.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* SPECIFIC IMPROVEMENTS */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Specific improvements</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              What I would test inside 90 days.
            </h2>

            {/* Immediate */}
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Immediate</p>
              <ul className="space-y-3">
                {[
                  'Rewrite channel descriptions across YouTube and Instagram to clearly state the promise. Anchor in credibility (results delivered, founders served). Lead with what the channel is for, not what you sell.',
                  'Pin one core evergreen lead magnet at the top of every channel. Same one. Easy to find. Easy to opt in.',
                  'Audit recent video descriptions. Move sales CTAs below value CTAs. Lead with the lead magnet.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simplified longform strategy */}
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Simplified longform strategy</p>
              <ul className="space-y-3">
                {[
                  'Produce 2 to 3 longer videos (25 to 40 minutes) that go deep on specific topics for online PTs. These become search evergreen assets.',
                  'Each long video packages one core lead magnet inside it. Ideally one relevant to the video and one core evergreen always available.',
                  'Build a bank of hyper specific personal stories to illustrate the points. Then a second bank of case studies and client results to reference inside videos as core examples.',
                  'For case studies, pick avatars with the highest conversion and the highest stick. Specificity of who they are and what they did.',
                  'Align shorts to main channel positioning. Same message, compressed.',
                  'Create a 6 or 8 week cycle. Every cycle repeats the same core style of videos to open new audiences, nurture them, and get them into the workshop.',
                  'Instagram points people toward YouTube WITH its lead magnet. The lead magnet is inside a toolkit with both the YouTube video and the asset.',
                  'Every video ties back to one core problem solved inside the workshop. Each video includes a CTA toward the next step.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Titles and hooks */}
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Titles and hooks</p>
              <ul className="space-y-3">
                {[
                  'Inject specific credibility, numbers, and outcomes. "94% of the 376 fitness founders I audited were doing X wrong."',
                  'Use the "If I were starting from zero, I would do this" title.',
                  'Lead with personal story + result. "How I built a $X room with 100% retention in 6 months — the actual play."',
                  'Anchor specificity in the first 30 seconds of every video. Names. Numbers. Time frames. Lock the credibility before the content.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth opportunities */}
            <div>
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Growth opportunities</p>
              <ul className="space-y-3">
                {[
                  'Pursue 1 to 2 collaboration videos with known names in adjacent spaces. Borrow audiences. Borrow authority.',
                  'Take a stance on the current state of the fitness coaching industry. The demand pocket for "how to actually build a sellable training business" is wide open because nobody with the credibility owns it.',
                  'Podcast option. Bring guests into the room. Either talk shop with them, or do the install on them and document it. Use the industry advantages nobody else has.',
                  'Member spotlight rotation. Each cycle features one member journey at depth. Their words, their results, on your channel.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
              This is not the install. We would build the real thing together. But it should give you a sense of how I think about your specific channels, and what the next 90 days would actually look like.
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
