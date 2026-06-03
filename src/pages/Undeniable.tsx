import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, FileText, Check, Compass, Eye, Zap, Shield, AlertCircle, X } from 'lucide-react';
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

export default function Undeniable() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Undeniable. 90 Day Authority Engine"
        description="Build a trust ecosystem to take the right people from cold to sold, so Undeniable becomes the obvious choice for the ideal market."
        path="/undeniable"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">90 Day Plan</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The Undeniable
                <br />
                Authority Engine.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
                Engineer trust at scale, and move the right people from cold to sold every month.
              </p>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl">
                So Undeniable becomes the obvious choice for the ideal market.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* GOAL */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · The Goal</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Make Undeniable
              <br />
              <span className="text-zinc-500">the obvious choice.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                The point of this project is to unlock the next stage of growth and make you the biggest fish in the pond.
              </p>
              <p>
                During this phase, we will begin to expand beyond just the immediate market, and speak through them with a coordinated blend of content that is relevant to both. Those in the current pond. And the ones in the ocean.
              </p>
              <p>
                Once Undeniable is the obvious choice for online coaches and PTs, we earn the right to do two things.
              </p>
            </div>

            <div className="max-w-3xl mt-12 space-y-4">
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 1.</span> Build the strategy that makes you the category king.
              </p>
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 2.</span> Decide with data when to jump from the pond to the ocean.
              </p>
            </div>

            <div className="max-w-3xl mt-12">
              <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
                But first.
                <br />
                <span className="text-blue-400">Make Rhys Livingston Undeniable.</span>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · WHERE UNDENIABLE IS NOW */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Challenge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Inside, undeniable.
              <br />
              <span className="text-zinc-500">Outside, not yet.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4 mb-6">
                {[
                  'The product is bulletproof.',
                  'The advocates are stacking in numbers.',
                  'Credibility is undeniable.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-sm italic pl-8">
                Once you're inside.
              </p>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl mb-10 font-medium">
              Making that known to the public is where the greatest opportunity exists. With CAC increasing, the play is to build a simple path from someone's attention, to them knocking down your door for access.
            </p>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">The gap</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A simple strategy. A repeatable cycle. Content that's more effective, easier to make, and faster to build trust.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · GOAL + SUCCESS CRITERIA */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Install a trust ecosystem.
              <br />
              <span className="text-zinc-500">Your Authority Engine.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-16">
              <p>
                The first step is simple. Craft a methodic customer journey that increases demand, and nurtures fast to coincide with live events.
              </p>
              <p className="text-zinc-300 font-medium">
                We are not trying to push two events per month. We are trying to first increase demand, while lowering supply.
              </p>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Success criteria · Agreed in Phase 1</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">
              How we'll know it worked.
            </h3>
            <ul className="space-y-4 max-w-3xl mb-10">
              {[
                'A documented, simple cold to warm to workshop to continuity path we both agree on.',
                'A simple monthly content cycle we can easily run.',
                "An agreed % of new room buyers coming through the new path, with a notable shortening of those putting their hand up when asked: how many people first heard about me in the past 3 months.",
                'An agreed number of qualified booked calls from content.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-zinc-300 leading-relaxed max-w-3xl font-medium">
              <p>If we hit or trend toward those, we talk about continuing.</p>
              <p>If we don't, we fix it or we stop.</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · STRENGTHS / GAPS / OPPORTUNITIES */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Strengths. Gaps.
              <br />
              <span className="text-zinc-500">Opportunities.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Strengths</p>
                <ul className="space-y-3">
                  {[
                    'Clear avatar and epic results.',
                    'A killer playbook that already delivers wicked outcomes.',
                    'Social proof and word of mouth building momentum.',
                    'Undeniable credibility of expertise.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Compass className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Gaps</p>
                <ul className="space-y-3">
                  {[
                    'No single, documented customer journey from cold to sold.',
                    'Hooks and content formats that work are not yet systemised into a bank your team can re use.',
                    'YouTube not yet leveraged as the deep trust channel.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Zap className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Opportunities · Next 90 days</p>
                <ul className="space-y-3">
                  {[
                    'Turn your best existing clients into a reference book for advocacy and simple breakdowns.',
                    'Build a YouTube and Instagram cycle so you know exactly what type of content to shoot and why.',
                    'Craft a small set of lead magnets so people have everything they need to go from just found you to I am in.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 · THE 90 DAY PLAN */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · The 90 day plan</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Install an Authority Engine.
              <br />
              <span className="text-zinc-500">Brand. Content. Scale.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Three core content output areas. Plus the connective tissue that turns them into a monthly demand cycle around your workshops.
            </p>

            {/* The 3 core output areas */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core outputs</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Zap,
                  title: 'Short Form',
                  description: 'Discovery layer. Hooks, formats, and angles that open new audiences and pull the right people toward the channel and the room.',
                },
                {
                  icon: Video,
                  title: 'Long Form',
                  description: 'Trust depth. The pieces that get watched, shared, and remembered. The reason cold viewers turn into buyers.',
                },
                {
                  icon: FileText,
                  title: 'Lead Magnets',
                  description: 'Trust bridge. Assets that take someone from interested to invested. One core evergreen plus video specific magnets.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Plus the connective tissue */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'A value first video sales letter. Seeds the offer while delivering deep value. Lives in the trust path and does the selling without feeling like a sale.',
                },
                {
                  icon: Settings,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. Captures the brand, the cycle, and the playbook in one place. Survives team changes.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-6 mb-16 max-w-3xl">
              <p className="text-white text-sm leading-relaxed font-medium">
                Brand documented. Content engineered. System installed. The room markets itself.
              </p>
            </div>

            {/* Phases */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three phases</p>
            <div className="space-y-8">
              {/* Phase 1: BUILD */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 01 · Build · 4 to 6 hours</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Extract the genius. Document the brand.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    Brand Day intensive. One in person session with you and your creative director. Four to six hours. Two hours with you. The rest with your content lead.
                  </p>
                  <p>
                    We extract the genius. The founder beliefs, contrarian takes, the stories. Everything gets built and documented live. The entire engine runs from this.
                  </p>
                  <p>
                    This is where we build your customer journey, craft your plan, and map your core pillar videos.
                  </p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By end of Phase 1</p>
                <ul className="space-y-2">
                  {[
                    'A documented brand. Voice, positioning, category lens, contrarian takes.',
                    'A Customer Journey Map. Cold to warm to workshop to continuity.',
                    'The shape of the monthly demand cycle, mapped to your workshop calendar.',
                    'Agreed success metrics for the 90 days.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 2: INSTALL */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 02 · Install · Weeks 1 to 4</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Wrap the engine around your next workshop.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    One 60 minute call per week with your creative director. Founder welcome.
                  </p>
                  <p>
                    Short form, long form, lead magnets, the Trojan Horse VSL, and the Media Operating System get built and wired up. The first cycle wraps around your next workshop so we test it live.
                  </p>
                </div>
              </div>

              {/* Phase 3: TUNE */}
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">03</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 03 · Tune · Weeks 5 to 12</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Tune the engine based on data.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    Your team runs the cycle. I act as advisor. We tighten hooks, lead magnets, longform structure, and the VSL on real data. We test the strongest pieces with your best members.
                  </p>
                  <p>
                    End of 90 days you have one documented Authority Engine, one repeatable monthly demand cycle, and a clear view of what happens if we keep going.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 · STRATEGIC RISK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · The strategic risk we are avoiding</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Don't jump markets yet.
              <br />
              <span className="text-zinc-500">First, own the pond.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-10">
              <p>
                The temptation right now is to jump to general service businesses.
              </p>
              <p className="text-zinc-300 font-medium">Here's my view for the next 90 days.</p>
            </div>

            <ul className="space-y-3 max-w-3xl mb-10">
              {[
                'We double down on fitness. Build the trust ecosystem. Use it to deepen demand and authority.',
                'We implement a strategy to inject broader business content to collect data on who is raising their hand from outside fitness.',
                'At the end of the 90 days we decide, with data, what a service business opportunity could look like. When, how, and if required.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">First goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Make Undeniable so strong in the current market that the next market pulls you in. We then supply based on demand. That way, CAC naturally will decrease.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 · INVISIBLE HAND */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · The invisible hand we are about to unlock</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              When your clients
              <br />
              <span className="text-zinc-500">do the talking.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              You're on the verge of a heavy word of mouth phase. Compounding social proof.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Users,
                  title: 'Visible advocates',
                  description: 'Turn your best clients into testimonials, breakdowns, and story content. Their words, not just yours.',
                },
                {
                  icon: Video,
                  title: 'Their stories as core content',
                  description: 'Use client stories as the spine of content and ads, not just your face. Trust transfers faster from peer to peer.',
                },
                {
                  icon: Megaphone,
                  title: 'Time on brand plays',
                  description: 'Boost the best stories as paid distribution. Not cold ads. Proof at scale.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-5 text-zinc-300 leading-relaxed max-w-3xl">
              <p>
                Advocates aren't trackable. Whether they're shown in content, or spoken about when you're not in the room.
              </p>
              <p className="font-medium">
                Word of mouth from building a killer product that increases perceived status and enforces an identity is the invisible hand that compounds over time.
              </p>
            </div>
          </Section>
        </div>
      </section>


      <div className="gradient-line" />

      {/* 07 · DELIVERABLES */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">08 · Deliverables</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              A comprehensive Brand Bible.
              <br />
              <span className="text-zinc-500">Plus the install around it.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              The Brand Bible is the centerpiece. Everything else is built on top of it so the team can run the engine without you. Whatever we decide at Day 90, all of this is yours.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Complete Brand Bible',
                  description: 'Voice, positioning, narrative, messaging, beliefs, origin story, archetype profile. Identity extracted. Positioning clarified. All documented and ready to hand to any operator or team member.',
                },
                {
                  icon: Compass,
                  title: 'Customer Journey Map',
                  description: 'Cold to workshop to continuity. The trust path your team executes against.',
                },
                {
                  icon: Layers,
                  title: 'Authority Engine Map',
                  description: 'The full system documented. How the three core outputs and the connective tissue integrate around your monthly workshops.',
                },
                {
                  icon: Calendar,
                  title: 'Monthly Cycle Plan',
                  description: 'Themes, hooks, topics. The plug and play structure your team re runs every month around your workshops.',
                },
                {
                  icon: Target,
                  title: 'Hook Bank',
                  description: 'Your best angles. Tested, sorted, ready to re run. Updated as you go.',
                },
                {
                  icon: FileText,
                  title: 'Lead Magnet Stack',
                  description: 'One core evergreen plus video specific magnets. Email sequences mapped to each stage of the journey.',
                },
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'A value first video sales letter. Seeds the offer while delivering deep value. The sales asset that lives inside the trust path.',
                },
                {
                  icon: Shield,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. The brand, the cycle, and the playbook in one place. Survives team changes.',
                },
                {
                  icon: Settings,
                  title: 'Do and Do Not list',
                  description: 'Short marketing reference your team uses going forward.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-surface border border-zinc-800/50 rounded-2xl max-w-3xl">
              <p className="text-zinc-400 text-sm leading-relaxed">
                How I'm currently assessing the existing channels.{' '}
                <a href="/undeniable-notes" className="text-blue-400 hover:text-blue-300 transition-colors">
                  /undeniable-notes
                </a>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">09 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the Authority Engine. The core elements, monthly cycle, and cadence around your workshops.',
                    'Advise on hooks, formats, lead magnets, and longform structure. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                    'Show up at your monthly workshop to teach, debrief, and test the strategy live in the room.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Your team's role</p>
                <ul className="space-y-3">
                  {[
                    'Implement. Film, edit, publish, build funnels, send emails.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from the room and the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Events */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Events & speaking · Shots on goal</p>
            <div className="glow-card p-8 mb-12 max-w-3xl">
              <p className="text-zinc-400 leading-relaxed mb-5">For the 90 days, we test how we work together by:</p>
              <ul className="space-y-3 mb-5">
                {[
                  "Having a segment at each monthly workshop to teach or coach.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                This gives me reps on your stage and lets us see in real time how my philosophies land with your people.
              </p>
            </div>

            {/* Cadence */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 01 · Build</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">4 to 6 hours</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Brand Day intensive. One in person session with you and your creative director.</p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 02 · Install</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 1 to 4</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per week with your CD.',
                    'Founder welcome.',
                    'The engine gets built and wired up.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 03 · Tune</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 5 to 12</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per fortnight with you and your CD.',
                    '1x Operator Clinic per fortnight for implementation questions.',
                    'Up to 1 Loom per week for asset review.',
                    '24 hour feedback via WhatsApp.',
                    'One stage segment at each monthly workshop.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 10 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">10 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">So we both stay sharp.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              For clarity on both sides.
            </p>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I design, advise, and read the data with you.',
                  'This is not a guarantee of revenue or attendance. We agree the metrics. We test. The data tells us what worked.',
                  'This is not full time CMO services. I show up for the cadence we agreed. Not in your inbox at 11pm.',
                  'This is not a content factory. I do not write or edit every script. Your team produces.',
                  'This is not a forever contract. At Day 90 we both pick.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 11 · DAY 90 DECISION */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">11 · What happens at Day 90</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              We sit down.
              <br />
              <span className="text-zinc-500">We pick one of three.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              We look at the Authority Engine we have installed. The numbers from the last cycle. How it has felt working together. Then we pick.
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: RefreshCw,
                  num: '01',
                  title: 'Keep going in advisory',
                  description: 'Keep tuning the engine. Expand what works. Monthly rhythm.',
                },
                {
                  icon: Layers,
                  num: '02',
                  title: 'Go deeper',
                  description: 'A more formal partnership or longer build. The 12 month version of this.',
                },
                {
                  icon: X,
                  num: '03',
                  title: 'Stop here',
                  description: 'You keep every asset and insight. We chalk it up as a finished project.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0 mb-3 md:mb-0">
                      <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{item.num}</p>
                    </div>
                    <div className="flex-1">
                      <item.icon className="w-5 h-5 text-blue-400 mb-3" />
                      <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]">
              You're 80% of the way there.
            </h2>
            <p className="text-zinc-500 italic mb-6 leading-relaxed">
              But have you ever heard of Pareto's principle?
            </p>
            <p className="text-zinc-400 mb-3 leading-relaxed">
              You've built a killer product. And a wicked team.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              My job is to build the trust ecosystem that keeps it full without you becoming a full time creator.
            </p>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-600 text-sm mt-6">30 to 45 minutes. We walk through logistics, build the plan. If it is a fit, we lock dates. If not, I tell you.</p>
            <p className="text-zinc-600 text-sm mt-8">
              <a href="/undeniable-notes" className="text-blue-400 hover:text-blue-300 transition-colors">
                Read the working notes →
              </a>
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
