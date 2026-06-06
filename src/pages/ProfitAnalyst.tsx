import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Target, BookOpen, Video, Mic, BarChart3, Users, Megaphone, Layers, RefreshCw, Calendar, Settings, FileText, Check, Compass, Eye, Zap, Shield, AlertCircle, X } from 'lucide-react';
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

export default function ProfitAnalyst() {
  return (
    <PasswordGate storageKey="profitanalyst-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="The Profit Analyst. 90 Day Authority Engine"
        description="From generic offer to category king. Through avatar specificity, mechanism potency, and proof at scale."
        path="/theprofitanalyst"
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
                The Profit Analyst
                <br />
                Authority Engine.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                From generic offer to category king. Through avatar specificity, mechanism potency, and proof at scale.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · THE GOAL */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · The Goal</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Own one avatar.
              <br />
              <span className="text-zinc-500">Own the category.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
              <p>
                The path from diluted to dominant runs through identity. The avatar people self identify as. The mechanism only you can claim. The proof stack only you can defend.
              </p>
              <p>
                Right now the message is generic. The calculator is generic. The offer reads like every other operator who promises profit. That's why it's not landing the way it should.
              </p>
              <p className="text-zinc-300 font-medium">
                We pick the avatar. We engineer the mechanism. We stack the proof. Then we scale.
              </p>
            </div>

            <div className="max-w-3xl mt-12 space-y-4">
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 1.</span> Pick the avatar that converges on cash, willingness, and implementation.
              </p>
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 2.</span> Engineer the proprietary mechanism nobody else can claim.
              </p>
              <p className="text-zinc-300 font-medium leading-relaxed">
                <span className="text-zinc-500">Step 3.</span> Stack hyper specific average outcomes. Aggregate them. Defend them.
              </p>
            </div>

            <div className="max-w-3xl mt-12">
              <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
                But first.
                <br />
                <span className="text-blue-400">Get specific.</span>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE CHALLENGE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Challenge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Real product.
              <br />
              <span className="text-zinc-500">Diluted message.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4 mb-6">
                {[
                  'The product is real. Workshops deliver measurable profit lift.',
                  'The credibility is real. You run multiple businesses yourself.',
                  'The price point is held. $5,000 in person is paid without resistance.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-sm italic pl-8">
                But the message doesn't have a face.
              </p>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed max-w-3xl mb-10 font-medium">
              Three levers carry the weight of an offer. Avatar. Problem. Promise. When the avatar is wide, the other two have to compensate. Right now none of them are pulling. The category gets won by whoever picks one and goes hard.
            </p>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">The gap</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A hyper specific avatar. A proprietary mechanism. A proof bank with average outcomes the right people can visualise in their bank account.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE OPPORTUNITY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Pick the avatar.
              <br />
              <span className="text-zinc-500">Engineer the mechanism.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-16">
              <p>
                Specificity is the lever. Avatar gets specific. Problem gets specific. Promise gets specific. Language gets native. When the right person lands on the page, they say "that's me" inside five seconds.
              </p>
              <p className="text-zinc-300 font-medium">
                And the mechanism stops sounding like a calculator. It becomes a method only you can claim.
              </p>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Success criteria · Agreed in Phase 1</p>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">
              How we'll know it worked.
            </h3>
            <ul className="space-y-4 max-w-3xl mb-10">
              {[
                "One avatar named, claimed, and defended. The right people self identify on the landing page in under five seconds.",
                'A proprietary mechanism documented. Named, sequenced, defendable. Not a calculator. A method.',
                'An aggregate proof bank with a hyper specific average outcome the avatar can visualise in their bank account.',
                'An agreed number of qualified workshop signups, traceable to the avatar plus mechanism plus proof system.',
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

      {/* 04 · THE DIAGNOSTIC */}
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
                    'Real product. Workshops deliver measurable profit lift.',
                    'Operator credibility. Multiple businesses owned and run.',
                    'In person format that holds attention and closes.',
                    '$5,000 price point already validated.',
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
                    'No claimed avatar. The message speaks past everyone who could buy.',
                    'Generic mechanism. The calculator doesn\'t sound proprietary.',
                    'Founder belief and mechanism belief not addressed in content.',
                    'No aggregate proof bank with hyper specific average outcomes.',
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
                    'Pick one avatar and claim it. The convergence of cash, willingness, and implementation.',
                    'Engineer the proprietary mechanism. Named, sequenced, defendable. Yours.',
                    'Aggregate the proof. Build the average outcome number that the avatar can visualise in their account.',
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
              Install the Profit Analyst Authority Engine.
              <br />
              <span className="text-zinc-500">Avatar. Mechanism. Proof.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Three core systems that pull the weight of every message. Plus the connective tissue that turns them into a monthly demand cycle around the workshops.
            </p>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core systems</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Users,
                  title: 'Avatar Architecture',
                  description: "One claimed identity with demographics, psychographics, and native language. The right person says \"that's me\" inside five seconds.",
                },
                {
                  icon: Layers,
                  title: 'Proprietary Mechanism',
                  description: 'Named. Sequenced. Defendable. A method only you can claim. Not a calculator. Not a tactic. A principle that holds.',
                },
                {
                  icon: BarChart3,
                  title: 'Proof Bank',
                  description: 'Aggregate client data into a hyper specific average outcome. A number the avatar can visualise in their account.',
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

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: BookOpen,
                  title: 'Belief Architecture',
                  description: 'Five belief gates mapped: category, mechanism, founder, self, timing. Current beliefs and required beliefs, with the repeatable lines that move people through each one.',
                },
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'A value first sales asset built on Outcome to Pain to Steps to Promise to Likelihood to Risk reversal. Seeds the workshop while installing belief.',
                },
                {
                  icon: RefreshCw,
                  title: 'Triphasic Continuity',
                  description: 'Front load the promise. Install the outcome over time. Assumed close at the back end. Stops the four week cliff that kills retention.',
                },
                {
                  icon: Shield,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. Brand, avatar, mechanism, proof bank, and cycle in one place.',
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
                Avatar claimed. Mechanism named. Proof banked. The category gets owned.
              </p>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three phases</p>
            <div className="space-y-8">
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">01</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 01 · Build · 4 to 6 hours</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Pick the avatar. Name the mechanism.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    Brand Day intensive. One in person session with you and your content lead. Four to six hours. Two hours with you. The rest with your team.
                  </p>
                  <p>
                    We pick the avatar and defend it with data. We name and sequence the mechanism. We map the five belief gates. We aggregate the client outcomes into the average number that lands.
                  </p>
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By end of Phase 1</p>
                <ul className="space-y-2">
                  {[
                    'One claimed avatar with demographics, psychographics, and language.',
                    'Proprietary mechanism named, sequenced, and documented.',
                    'Belief architecture mapped: current beliefs and required beliefs across all five gates.',
                    'Average outcome calculated and the proof bank scaffolded.',
                    'Agreed success metrics for the 90 days.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">02</p>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest">Phase 02 · Install · Weeks 1 to 4</p>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                      Wire up the engine. Wrap it around the next workshop.
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                  <p>
                    One 60 minute call per week with your content lead. Founder welcome.
                  </p>
                  <p>
                    The avatar architecture goes live on the landing page. The mechanism gets weaponised through content. The proof bank gets populated with hyper specific numbers. Trojan Horse VSL drafted. Triphasic continuity wired in. The first cycle wraps around your next workshop so we test it live.
                  </p>
                </div>
              </div>

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
                    Your team runs the cycle. I act as advisor. We tighten the avatar callouts, the mechanism positioning, the proof presentation, and the VSL on real data. We test the strongest pieces with the next set of workshop attendees.
                  </p>
                  <p>
                    End of 90 days you have a documented Authority Engine, a repeatable monthly demand cycle, and a clear view of what happens if we keep going.
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
              Don't keep speaking to everyone.
              <br />
              <span className="text-zinc-500">Speak to one.</span>
            </h2>
            <div className="space-y-5 text-zinc-400 leading-relaxed max-w-3xl mb-10">
              <p>
                The temptation is to keep the door open to every brick and mortar business because cash flow is fine and the workshops still close. The cost is invisible. No category claim. No category ownership.
              </p>
              <p className="text-zinc-300 font-medium">Here's my view for the next 90 days.</p>
            </div>

            <ul className="space-y-3 max-w-3xl mb-10">
              {[
                'We pick the avatar. The convergence of cash, willingness to implement, and self identification.',
                'We engineer the mechanism. Proprietary. Defendable. A method, not a calculator.',
                'We stack the proof. Aggregate data with a hyper specific average outcome that the avatar can visualise.',
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
                Get one avatar to say "that's me" inside five seconds of seeing the page. When the right person feels native, the category gets claimed without you raising your voice.
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
              When the average
              <br />
              <span className="text-zinc-500">outcome lands.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              People don't buy categories. They buy outcomes. The closer your average outcome gets to a real, hyper specific number, the more potent the offer becomes. $365,980 lands harder than "over $100k" because the avatar can see it in their account.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: BarChart3,
                  title: 'The number, defended',
                  description: 'Aggregate client data into one average outcome. Hyper specific. Backed by the proof bank. Visualisable.',
                },
                {
                  icon: Eye,
                  title: 'Damaging admissions',
                  description: 'Authority and authenticity at max. Point at your own flaws on camera. Trust transfers when the audience feels the founder is real.',
                },
                {
                  icon: RefreshCw,
                  title: 'Triphasic continuity',
                  description: 'Front load the promise. Install the outcome over 12 weeks. Assumed close at the back. Continuity without resell.',
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
                When the number is specific, the avatar self identifies, and the mechanism is yours alone, comparison stops.
              </p>
              <p className="font-medium">
                Buying starts.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 · DELIVERABLES */}
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
              The Brand Bible is the centerpiece. Everything else is built on top so the team can run the engine without you. Whatever we decide at Day 90, all of this is yours.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Complete Brand Bible',
                  description: 'Voice, positioning, narrative, beliefs, origin story, archetype profile. Identity extracted. Category lens locked. Documented for any operator.',
                },
                {
                  icon: Users,
                  title: 'Avatar Architecture',
                  description: 'One claimed identity. Demographics, psychographics, language, callouts. The right person feels native inside five seconds.',
                },
                {
                  icon: Layers,
                  title: 'Proprietary Mechanism',
                  description: 'Named, sequenced, defendable. A method only you can claim. The mechanism belief gate gets broken in one watch.',
                },
                {
                  icon: Target,
                  title: 'Belief Architecture',
                  description: 'Five belief gates mapped: category, mechanism, founder, self, timing. Current to required with repeatable overcomes.',
                },
                {
                  icon: BarChart3,
                  title: 'Proof Bank',
                  description: 'Aggregate client data into a hyper specific average outcome. Plus case studies, individual data, and damaging admissions.',
                },
                {
                  icon: Megaphone,
                  title: 'Trojan Horse VSL',
                  description: 'Outcome to Pain to Steps to Promise to Likelihood to Risk reversal to CTA. Sells the workshop without feeling like a pitch.',
                },
                {
                  icon: RefreshCw,
                  title: 'Triphasic Continuity Framework',
                  description: 'Front load the promise. Install over 12 weeks. Assumed close at the back. Continuity without resell.',
                },
                {
                  icon: Calendar,
                  title: 'Monthly Cycle Plan',
                  description: 'Themes, hooks, topics. The plug and play structure your team re runs every month around the workshops.',
                },
                {
                  icon: Settings,
                  title: 'Documented Media Operating System',
                  description: 'A system your team can run week to week. Brand, avatar, mechanism, proof, cycle. One place. Survives team changes.',
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
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 09 · HOW WE WORK */}
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
                    'Design the Authority Engine. The avatar architecture, the proprietary mechanism, the belief overcomes, and the proof system.',
                    'Advise on hooks, formats, and content positioning. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                    'Show up live at one workshop in the 90 days to teach, coach, and test the system in the room.',
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
                    'Aggregate the client data. Pull together what we need for the proof bank.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from workshops and the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 01 · Build</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">4 to 6 hours</p>
                <p className="text-zinc-300 text-sm leading-relaxed">Brand Day intensive. One in person session with you and your content lead.</p>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Phase 02 · Install</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 1 to 4</p>
                <ul className="space-y-2">
                  {[
                    '1x 60 minute call per week with your content lead.',
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
                    'Live at one workshop in the 90 days.',
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
                  'This is not a guarantee of revenue or workshop signups. We agree the metrics. We test. The data tells us what worked.',
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
              We look at the engine we have installed. The numbers from the last cycle. How it has felt working together. Then we pick.
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
              You've got the offer.
            </h2>
            <p className="text-zinc-500 italic mb-6 leading-relaxed">
              Now let's make it specific enough to land.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Avatar. Mechanism. Proof. Three levers. My job is to engineer them so the right person feels native and the rest stop comparing.
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
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
