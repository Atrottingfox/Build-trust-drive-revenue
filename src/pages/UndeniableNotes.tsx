import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

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
    <PasswordGate>
    <div className="min-h-screen bg-base">
      <SEO
        title="Channel & content overview for Undeniable"
        description="Where the brand is. The gaps that exist. The specific improvements I would test inside the first 90 days. Non prescriptive, for discussion."
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
              My analysis on where the brand is, the gaps that exist, and the specific improvements I'd test inside the first 90 days. This is the starting point for our Brand Day discussion. What we'll actually craft together.
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
              How trust is built today.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Instagram is the primary distribution channel. Strong founder presence, recognition is growing, strong brand aesthetic, consistent posting rhythm. YouTube is light. Early uploads, a few longer pieces, not yet running as a planned cycle. Email is utilised but additional trust assets can be leveraged. A core demand cycle campaign could help.
              </p>
              <p>
                The workshop calendar is the core mechanism for building deep trust. Most buyers come in from warm. Many taking 6+ months to warm up. Even when people walk through the doors, the workshop itself is still doing the heavy lifting.
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
                "Strong, clear avatar. 6 to 7 figure online PTs and fitness founders. No ambiguity about who you are talking to and who it's for. Immediate identity alignment.",
                "Genuine results exist within each workshop. The continuity model stacks a solid long tail. Members continue to let revenue compound across cycles.",
                "Active testimonial flow baked into the system with a heavy word of mouth phase about to kick in.",
                "Founder voice is building recognition. Identity and aesthetic is strong. Story is being built.",
                "Workshop calendar is consistent and gives us a natural rhythm to wrap the content cycle around.",
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
              Where leverage is being lost.
            </h2>

            <div className="space-y-10">
              {/* Gap 1 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">01</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Messaging</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Targeting online coaches (for right now) is killer. Simple. Clean. Immediately identifiable. But the core message is not yet dialled across multiple channels. IG vs YouTube has disparity.
                </p>
              </div>

              {/* Gap 2 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">02</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Video length and depth</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Short videos struggle to build true depth and trust with the audience. Top content in this space runs 20 to 40+ minutes. Longer content generates more watch time, which the algorithm rewards, and the audience often requires. Not all videos must be lengthy, but core pillar videos should.
                </p>
              </div>

              {/* Gap 3 */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">03</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">Titles and hooks · specificity</h3>
                </div>
                <p className="text-zinc-400 text-base leading-relaxed mb-3">
                  Titles and hooks should be specific, credibility anchored, and reinforced, whether used across Instagram or YouTube. Only things you can say. Undeniable evidence. Multiple current opportunities exist within titles that weaponise credibility and craft intrigue for the core market.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Specificity includes: experience, data, stories, and of course, avatar.
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
                  Right now there are no flagship long videos that compound in the background. A handful of long form evergreen assets funnel viewers into the rest of the content for months or years. The library compounds.
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
                <p className="text-zinc-400 text-base leading-relaxed mb-3">
                  No small selection of core evergreen lead magnets that get downloaded consistently from videos and posts. These trust assets sit at the back of the nurture sequence and convert intent into action. Right now this layer is mostly missing.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
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
                  'Rewrite core channel descriptions across all YouTube videos with core credibility anchor and story to disarm and clearly state the promise. Anchor in credibility (results delivered, founders served). Lead with what the channel is for, not what is sold.',
                  'Audit recent video descriptions. Lead with the lead magnet top line, then outline of video, then personal timeline.',
                  'Pin one core evergreen lead magnet at the top of every channel. Same one. Easy to find. Easy to opt in.',
                  'Rearrange pinned posts. Story or plane carousel on the left (potential to recreate post and pin updated version) and include lead magnet CTA on the third line. Alex in the middle. Vulnerable or honest video on the right.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simplified longform strategy */}
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Simplified longform strategy</p>
              <ul className="space-y-3">
                {[
                  'Produce 2 to 3 longer videos (25 to 40 minutes) that go deep on specific topics for online PTs. These become evergreen assets to send to prospects.',
                  'Each long video packages one core lead magnet inside it. Ideally one relevant to the video and one core evergreen always available.',
                  'Build a bank of hyper specific personal stories to illustrate the points. Then a second bank of case studies and client results to reference inside videos as core examples.',
                  'For case studies, pick avatars with the highest conversion and the highest stick. Specificity of who they are and what they did. Duplicate your dream client.',
                  'Create a 6 or 8 week cycle. Every cycle repeats the same core style of videos to open new audiences, nurture them, and get them into a workshop.',
                  'Instagram points people toward YouTube videos with lead magnets. The lead magnet is inside a toolkit with both the YouTube video and the asset.',
                  'Every video ties back to one core problem solved inside the workshop.',
                  'Each video includes a logical next step toward the VSL (which we will craft).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Titles and hooks */}
            <div className="mb-12">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Titles and hooks</p>
              <ul className="space-y-3">
                {[
                  'Inject specific credibility, numbers, and outcomes.',
                  "Utilise the 'If I...' and 'How I...' frame.",
                  'Lead with personal story plus result.',
                  'Anchor specificity in the first 30 seconds of every video. Names. Numbers. Time frames. Lock the credibility before the content.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth opportunities */}
            <div>
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Growth opportunities</p>
              <ul className="space-y-3">
                {[
                  'Pursue 2 to 3 collaboration videos with known names in adjacent spaces. Offer to help them grow their brand. Fly to them, audit or consult. Crack open new audiences. Borrow authority. Build credibility.',
                  'Take a stance on the current state of the fitness coaching industry.',
                  'Member spotlight rotation. Each cycle features one member journey at depth. Their words, their results, on your channel.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
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
              This is not the install. We would build the actual thing together. But it should give you a sense of how I think about your specific channels, and what the next 90 days would actually look like.
            </p>
            <a
              href="/undeniable"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to the 90 day plan
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
