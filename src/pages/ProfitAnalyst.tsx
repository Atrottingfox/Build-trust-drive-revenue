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
        title="The Profit Analyst. A read on the offer."
        description="Strategic analysis. Where the message is landing, where it isn't, and the thinking on what would change that."
        path="/theprofitanalyst"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Strategic analysis · For discussion</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              The Profit Analyst.
              <br />
              <span className="text-zinc-500">A read on the offer.</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-medium italic">Notes, not a pitch</span>
            </div>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Where the message is landing, where it isn't, and the thinking on what would change that. Sharing the diagnostic so you can use it however you want.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CURRENT STATE */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Current state</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Real product. Diluted message.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
              <p>
                The product is real. The workshops move profit. The price point holds at $5,000. You run multiple businesses yourself, which is rare and shows up as operator credibility.
              </p>
              <p>
                What's missing is a face on the offer. The message speaks past every prospect because it speaks to all of them. "Profit Analyst" reads as a tool. Not a category. Not an identity.
              </p>
              <p className="text-zinc-300 font-medium">
                Three things working. One thing missing. That gap is the entire game.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE SPECIFICITY LEVERS */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The three specificity levers</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Avatar. Problem. Promise.
              <br />
              <span className="text-zinc-500">Plus language.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10">
              Every offer pulls on three specificity levers. When you tighten one, the others can loosen. When you loosen one, the others have to compensate. The mistake most operators make is loosening all three at once.
            </p>

            <div className="space-y-6">
              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">01</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Avatar specificity</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Plumber is hyper specific. Tradies is the category. Service businesses is the delivery layer. Business owners is the ocean.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Each chunk up dilutes potency. People don't think of themselves in categories. They think of themselves as identities.
                </p>
              </div>

              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">02</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Problem specificity</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  "Every Friday you knock off work and get another text — the tenth this week — asking if you can come back on site, and you think to yourself I can't keep working until 10pm."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Specific enough to feel native. Specific enough that the wrong person scrolls past.
                </p>
              </div>

              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">03</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Promise specificity</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  "We'll find and place the 80% of top trainees that are never on the job boards inside your company within 30 days, or we keep working with you until we do."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Aspirational, defensible, time bound. Promises broad enough to be safe are too broad to land.
                </p>
              </div>

              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">04</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Language (the fourth lever)</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  "Off the tools." "On the job." "Back on site." Colloquialisms that make the audience feel you're native to their world.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Language compensates for avatar dilution. If you chunk up the avatar, you'd better chunk up the language specificity to match.
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mt-10 font-medium">
              Right now all three levers (plus language) sit at neutral. That's why nothing pulls. Pick one to anchor. The others fall in line.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PICKING THE AVATAR */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Picking the avatar</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              The convergence question.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10">
              The right avatar sits at the convergence of three things. Cash. Willingness to implement. Self identification. Miss any one and the offer breaks.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="glow-card p-6">
                <BarChart3 className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-2">Cash</p>
                <p className="text-zinc-500 text-sm leading-relaxed">They can actually pay. Hospitality margins are razor thin. Builders have cash but cycles are choppy.</p>
              </div>
              <div className="glow-card p-6">
                <Zap className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-2">Willingness</p>
                <p className="text-zinc-500 text-sm leading-relaxed">They actually do the work. Builders are notorious for paying and not implementing. That sinks results and proof.</p>
              </div>
              <div className="glow-card p-6">
                <Users className="w-5 h-5 text-blue-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-2">Self identification</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Do they call themselves that? "Tradie" lands. "Service business owner" doesn't. People buy from identities they recognise.</p>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-4">
              When the avatar gets picked, the entire content stack changes. Hooks land. DMs convert. The right people opt in and the wrong people scroll past. Cost per acquisition drops not because the ad got better. Because the avatar got specific.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed italic">
              Builders, hospitality, tradies, painters. There's a real conversation to have here. Whoever it is, you claim them. Hard.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE FIVE BELIEF GATES */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The five belief gates</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              What has to shift before they buy.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-12">
              Every prospect carries five beliefs that gate the purchase. Map current to required for each one. Then engineer the content to walk people through the gate. Most operators only break two. That's why deals don't close.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">01</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">Category belief</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Current:</span> "I don't need this."
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Required:</span> "I need an outcome this delivers."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Often already broken if they're watching the video. The easiest gate.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">02</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">Mechanism belief</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Current:</span> "I've tried everything." "You're like everyone else."
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Required:</span> "This guy has an answer for everything." "This is different."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  The hardest gate and the one that costs the most deals. Overcome with a proprietary, named, sequenced method. Not a calculator. A mechanism only you can claim.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">03</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">Founder belief</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Current:</span> "This guy's a scam. Doesn't get my business."
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Required:</span> "This guy's real. He gets it."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Overcome with authenticity. Behind the scenes. Damaging admissions. The Caleb move: point at your own flaws on camera. Authority plus authenticity at max.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">04</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">Self belief</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Current:</span> "This works for them. Not me."
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Required:</span> "If they can, I can."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Overcome with relatable proof. Case studies that look like the viewer. The avatar getting the outcome. Easier when the avatar is claimed.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">05</span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white">Timing belief</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Current:</span> "I can do this later."
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                  <span className="text-zinc-500">Required:</span> "Waiting costs more than acting."
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  Overcome with two futures bubble (act vs delay), real scarcity (five spots), or compounding cost (every month of waiting).
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* OUTCOMES OVER CATEGORIES */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Outcomes over categories</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              The hyper specific number.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
              <p>
                Nobody buys coaching. Nobody buys consulting. They buy the outcome the coaching delivers. The mechanism is just how you get there. Don't sell the mechanism. Sell the result of the mechanism.
              </p>
              <p>
                The way to make a result land harder is specificity. "Over $100k" reads as a category. People skim past categories. <span className="text-white font-semibold">"$365,980"</span> reads as a number a person can visualise in their bank account.
              </p>
              <p className="text-zinc-300 font-medium">
                Specificity is the bridge from claim to visualisation. Visualisation is the bridge to action.
              </p>
            </div>

            <div className="glow-card border-blue-500/20 p-8">
              <p className="text-blue-400 font-semibold text-sm mb-3">The play</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Aggregate the last 15 workshops or last 50 clients into one average outcome. Defend it with the proof bank behind it. Lead every page, ad, and VSL with that number.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* AUTHORITY + AUTHENTICITY */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Authority plus authenticity</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Max both stats.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10">
              Trust is a continuum that never tops out. Two axes carry it. "Are they able to deliver?" That's authority. "Are they willing to deliver for me?" That's authenticity. Most operators max one. The ones who win max both.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Authority moves</p>
                <ul className="space-y-3">
                  {[
                    'Bias toward results delivered by others. Testimonials over claims.',
                    'Named, proprietary mechanism. The method only you can claim.',
                    'Aggregate data, not anecdotes. The number, defended.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Eye className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">Authenticity moves</p>
                <ul className="space-y-3">
                  {[
                    'Damaging admissions. Name your own flaws on camera.',
                    'Behind the scenes. The actual operation. The actual hands.',
                    'Native language. Speak the way the avatar speaks.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed font-medium">
              Caleb runs this playbook publicly. Authority through framework. Authenticity through admissions. That combination is why he can sell anything he wants.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* TACTICS VS PRINCIPLES */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Tactics versus principles</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              What lasts versus what works right now.
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-10">
              <p>
                A tactic is a hack. A trick. Works today. Maybe works tomorrow. Doesn't compound. Tactics get you immediate attention because the audience is hungry. But they don't position you as the category authority.
              </p>
              <p>
                A principle holds across industries, time, and circumstances. It's a way of seeing the world that doesn't need to change every quarter. Principles position you as the operator who has thought past the noise.
              </p>
              <p className="text-zinc-300 font-medium">
                Lead with principles. Use tactics as proof the principles work.
              </p>
            </div>

            <div className="glow-card p-8">
              <p className="text-blue-400 font-semibold text-sm mb-3">The frame</p>
              <p className="text-white text-base leading-relaxed font-medium mb-3">
                If you can break a belief somebody has held for years, you have a high probability of being seen as the trusted expert in that category.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Break it. Then install the new one with case studies, data, and examples. That's the foundation of how somebody becomes a category king. Not louder claims. Higher resolution thinking.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CONTINUITY AS A MARKETING PROBLEM */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Continuity as a marketing problem</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">
              Churn isn't a product problem.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10">
              When people leave after 12 weeks, the instinct is to fix the product. The actual fix is upstream. They left because the front end promise told them they were buying 12 weeks. Triphasic continuity solves this.
            </p>

            <div className="space-y-6 mb-10">
              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">01</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Front load the promise</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  The first phase. The first 12 weeks isn't the whole offer. It's the install. The promise wraps three phases over 12 months. Frame it that way from the first ad.
                </p>
              </div>

              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">02</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Install the outcome over time</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Sales asset and call talk about transformations broader than 12 weeks. Show what month 9 looks like, not just month 3. The audience starts seeing themselves at month 12 from day 1.
                </p>
              </div>

              <div className="glow-card p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display text-2xl font-extrabold text-blue-400">03</span>
                  <h3 className="font-display text-xl font-extrabold text-white">Assumed close at the back</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Week 11 isn't a resell. It's a continuation. "John, you've done well. Let's roll your last 12 weeks into the next 12 months. Same price. Three bonuses." White glove. Red carpet. Not "do you want to renew?"
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed font-medium">
              When all three are installed, churn drops dramatically. Not because the product changed. Because the framing changed.
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
            <p className="text-zinc-400 mb-3 leading-relaxed text-lg">
              That's the thinking.
            </p>
            <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
              If any of it lands, run with it. If you want to talk through any one piece, the door's open.
            </p>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Want to dig into any of this?
              <ArrowRight className="w-4 h-4" />
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
