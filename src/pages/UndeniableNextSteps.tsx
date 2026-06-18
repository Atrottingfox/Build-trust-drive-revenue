import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, AlertCircle, Copy as CopyIcon, Check as CheckIcon } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';
import { ModuleLink } from '../components/undeniable/Bits';

// ─── Building blocks ────────────────────────────────────────────────────

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

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-6">{children}</h2>
);

const Bullets = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-[14px] leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* noop */ }
  };
  return (
    <button onClick={onClick} className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1.5">
      {copied ? <CheckIcon className="w-3 h-3" /> : <CopyIcon className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// Tangible artefact box — the thing the reader actually USES
function Artefact({ label, children, copyText }: { label: string; children: React.ReactNode; copyText?: string }) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 md:p-6 mt-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300">⬡ Tangible · {label}</p>
        {copyText && <CopyBlock text={copyText} />}
      </div>
      <div className="text-zinc-100 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}

function GapCard({
  n, title, problem, cost, owner, due, children,
}: {
  n: string; title: string; problem: string; cost: string; owner: string; due: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <span className="font-display text-blue-400 text-[18px] font-extrabold">{n}</span>
        <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Problem</p>
          <p className="text-zinc-200 text-[14px] leading-relaxed">{problem}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Cost</p>
          <p className="text-zinc-200 text-[14px] leading-relaxed">{cost}</p>
        </div>
      </div>
      {children}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mt-5 pt-5 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Owner</span>
          <span className="text-zinc-200">{owner}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Ship by</span>
          <span className="text-zinc-200">{due}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

export default function UndeniableNextSteps() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO
          title="Next steps for Undeniable · the 90-day plan"
          description="The diagnosis, the gaps, the priority matrix and the 30/60/90 plan. Tangible artefacts inside every section."
          path="/undeniablenextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* ═══ HERO ═══ */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <div className="accent-line mb-8" />
              <Eyebrow>Build plan · 90-day roadmap</Eyebrow>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                This is not an awareness problem.
                <br />
                <span className="text-zinc-400">It is a trust problem.</span>
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium italic">Working session output · for the Undeniable team</span>
              </div>
              <p className="text-zinc-400 text-[1rem] md:text-lg leading-relaxed">
                Most of the 15-20K coaches in your category already know who you are. They&apos;re sitting on the fence. The next 90 days compress trust and convert them, instead of chasing new eyeballs.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ FROM → TO ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The shift</Eyebrow>
              <H2>From founder-as-bottleneck to founder-as-asset.</H2>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">FROM</p>
                  <p className="text-zinc-200 text-[15px] leading-relaxed">Founder + Strategist + Content creator + Workshop host + Sales lead + Quality control + Creative director.</p>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">TO</p>
                  <p className="text-zinc-100 text-[15px] leading-relaxed font-medium">Founder + Trust asset + Workshop host + Strategy.</p>
                </div>
              </div>
              <p className="text-zinc-400 text-[14px] leading-relaxed italic mt-6">
                This isn&apos;t about making you better at operations. It&apos;s about building the system that runs without you, so the next stage of growth happens through leverage, not founder hours.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ CURRENT STATE SNAPSHOT ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Current state</Eyebrow>
              <H2>Where the business is right now.</H2>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-emerald-300 mb-4">What&apos;s working</p>
                  <Bullets items={[
                    '$5M business built without going viral · 11-year arc',
                    '82% 12-month L2 retention (proven data)',
                    '9 out of 10 close rate on warm workshop calls',
                    'Network access · Hormozi, Brandon, Luke Miller, Gabe',
                    'VSL completion at 83% on the 8-min cut',
                    '$2.2M USD generated with under 5K followers',
                    'Allied health + brick-and-mortar gyms already self-select in',
                    'Authority scored 5/5 — you are in the top 3 thought of when ICP needs help',
                  ]} />
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-amber-300 mb-4">What&apos;s creating friction</p>
                  <Bullets items={[
                    '4 of 5 posts read as "I\'m a coach" — clarity is 3/5',
                    'Sub-2% conversion on workshop page vs 83% VSL completion = expectation gap',
                    'Polluted audience (people coming for Alex, not for coaching)',
                    'Workshop Q&As don\'t follow the framework. Only Gabe hit it last time.',
                    'One ad type ("come to a workshop") doing all the work',
                    'Lead quality dropping — sub-10K leads diluting the room',
                    'Content production is reactive — no system Corey can run alone',
                    'No long-form trust asset live yet (no Rome, no Character)',
                  ]} />
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-red-300 mb-4">What&apos;s costing you conversion</p>
                  <Bullets items={[
                    'Page conversion gap · $X CPA on traffic that doesn\'t convert at scale',
                    'Workshop Q&A footage going to waste — no mid-funnel ad fuel captured',
                    'Lead magnets named ambiguously (Customer Journey Blueprint nobody recognises)',
                    'You shooting + directing + reviewing every piece personally',
                    'Hidden churn likely — your own diagnostic on Josh found $800K lost',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-400 mb-4">What&apos;s limiting scale</p>
                  <Bullets items={[
                    'No content operating system — Corey doesn\'t have business context yet',
                    'No Monday review cadence locked in',
                    'No clear KPI dashboard the team works against',
                    'Lead magnet ecosystem incomplete (Churn Calculator missing)',
                    'No documented quality bar for short-form output',
                  ]} />
                </div>
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed italic mt-6">
                Framing: these aren&apos;t personal deficiencies. They&apos;re the operational gaps every founder-led business hits when the content and the team start to outgrow the founder. Normal stage. Fixable in 90 days.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ PRIORITY MATRIX ═══ */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The matrix</Eyebrow>
              <H2>Sequenced by impact and timing.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-8">Not everything happens at once. This is the order.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-blue-300 mb-4">Immediate · high impact</p>
                  <Bullets items={[
                    'Six Step Profit Path · rename + relaunch (this week)',
                    'Workshop Q&A card · printed for next workshop',
                    '30-day shoot test · locked Mon/Wed/Fri schedule',
                    'Reese Livingstone pinned posts · swap from old testimonials',
                    'Corey · 3 client calls minimum (shadowing, no camera)',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-300 mb-4">Important · build next</p>
                  <Bullets items={[
                    'Character video · shot in 1 day, edit 2-3 days',
                    'Rome VSL · outline + filming days locked',
                    'Churn Calculator · live + linked from a relevant short',
                    'Monday review cadence · 7 questions installed',
                    'Podcast pipeline · 3/week from book chapters',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-400 mb-4">Strategic · longer term</p>
                  <Bullets items={[
                    'Six-week content cycle · locked + repeating',
                    'KPI dashboard · weekly numbers, monthly review',
                    'Continuous testing · 1-2 new formats per month',
                    'Corey presenting Monday creative direction from data',
                    'Quarterly review against 5-year market capture target',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-500 mb-4">Deprioritise · for now</p>
                  <Bullets items={[
                    'Broadening to service-based business audience',
                    'Hiring Framework as content (legal landmine for existing clients)',
                    'Boost on YouTube Shorts (own subscribers only)',
                    'Custom GPT rotation until 4-8 workhorses are locked',
                    'New audience channels before fitness saturation',
                  ]} />
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ KEY GAPS ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The gaps</Eyebrow>
              <H2>Eight gaps, eight tangible fixes.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-10">Every gap has the artefact embedded. Copy, print, or execute today.</p>

              <div className="space-y-8">

                {/* GAP 1 · Clarity */}
                <GapCard
                  n="01"
                  title="Clarity bottleneck"
                  problem="A stranger lands on your profile and 4 of 5 posts read as 'I'm a coach.' Clarity scores 3/5."
                  cost="Wrong people self-select in. Right people scroll past. CPA inflates and the room dilutes."
                  owner="Rhys (signs off) · Sean (writes)"
                  due="End of week 1"
                >
                  <Artefact label="The bio rewrite · top of every profile" copyText="I help fitness coaches build $1M+ businesses without going viral. $5M built. 82% client retention. 600 coaches taught in person.">
                    <p className="font-medium text-white">I help <span className="text-blue-300">fitness coaches</span> build <span className="text-blue-300">$1M+ businesses</span> without <span className="text-blue-300">going viral</span>.</p>
                    <p className="text-zinc-300 mt-2">$5M built · 82% client retention · 600 coaches taught in person.</p>
                    <p className="text-[12px] text-zinc-500 mt-3 italic">Pattern: I help [specific avatar] [specific outcome] without [thing they hate]. Receipts: [3 numbers, no fluff].</p>
                  </Artefact>
                </GapCard>

                {/* GAP 2 · Workshop Q&A */}
                <GapCard
                  n="02"
                  title="Workshop Q&A capture"
                  problem="Last workshop, only Gabe asked his question in the framework. Everyone else freeballed."
                  cost="12 months of mid-funnel ad creative thrown away every workshop. Tens of thousands in lost ad efficiency."
                  owner="Corey (production) · Rhys (re-prompts)"
                  due="Next workshop"
                >
                  <Artefact label="The card · printed, on every chair" copyText={`When you ask a question, say:\n\n"I'm a [role]."\n"I make [revenue]."\n"My main problem is [X]."\n"If I don't fix it, [stakes]."`}>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 mb-3">When you ask a question, say:</p>
                    <div className="space-y-2 text-zinc-100 text-[15px] leading-relaxed font-medium">
                      <p>&ldquo;I&apos;m a <span className="text-blue-300">[role]</span>.&rdquo;</p>
                      <p>&ldquo;I make <span className="text-blue-300">[revenue]</span>.&rdquo;</p>
                      <p>&ldquo;My main problem is <span className="text-blue-300">[X]</span>.&rdquo;</p>
                      <p>&ldquo;If I don&apos;t fix it, <span className="text-blue-300">[stakes]</span>.&rdquo;</p>
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-4 italic">Production: 2-camera setup. Side angle locked on the asker. If they don&apos;t hit the framework, Rhys re-prompts: &ldquo;Can you re-ask in the format on the card?&rdquo; Pull 8-12 strongest for ads same week.</p>
                  </Artefact>
                </GapCard>

                {/* GAP 3 · Lead magnet rebrand */}
                <GapCard
                  n="03"
                  title="Lead magnet ecosystem"
                  problem="Customer Journey Blueprint doesn't say what it does. Three other assets need clearer headlines."
                  cost="Click-through suffers. Conversion suffers. People can't tell what they're getting before they opt in."
                  owner="Sean (copy) · Rhys team (page build)"
                  due="End of week 2"
                >
                  <Artefact label="Four asset rebrands · ready to paste">
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-500/40 pl-4">
                        <p className="font-display font-extrabold text-white text-[15px]">Six Step Profit Path</p>
                        <p className="text-zinc-200 text-[14px] italic mt-1">&ldquo;Turn cold leads into raving fans. In 5 minutes, you&apos;ll know exactly how to take people from never-heard-of-you to obsessed advocate. Without DMing 100 people a day.&rdquo;</p>
                      </div>
                      <div className="border-l-2 border-blue-500/40 pl-4">
                        <p className="font-display font-extrabold text-white text-[15px]">From Cold to Sold</p>
                        <p className="text-zinc-200 text-[14px] italic mt-1">&ldquo;The sales framework I use on every workshop call. Stripped to its bones. Steal it.&rdquo;</p>
                      </div>
                      <div className="border-l-2 border-blue-500/40 pl-4">
                        <p className="font-display font-extrabold text-white text-[15px]">Find the one thing capping your business</p>
                        <p className="text-zinc-200 text-[14px] italic mt-1">&ldquo;60-second diagnostic. Personalised blueprint + a video of me walking you through the fix.&rdquo;</p>
                      </div>
                      <div className="border-l-2 border-blue-500/40 pl-4">
                        <p className="font-display font-extrabold text-white text-[15px]">How big is your leak?</p>
                        <p className="text-zinc-200 text-[14px] italic mt-1">&ldquo;60-second calculator. Pours your business into a leaky bucket and tells you how fast it&apos;s draining. Imagine if you never lost a client.&rdquo;</p>
                      </div>
                    </div>
                  </Artefact>
                </GapCard>

                {/* GAP 4 · Production system */}
                <GapCard
                  n="04"
                  title="Content production system"
                  problem="Shooting is reactive. No locked shoot days. No environment rotation. Corey can't run it without you in the room."
                  cost="Volume drops. Quality drops. You become the permanent bottleneck for every piece."
                  owner="Corey (runs) · Rhys (shows up)"
                  due="This Monday"
                >
                  <Artefact label="Week 1 shoot schedule · pasted into Corey's calendar">
                    <div className="grid gap-3">
                      <div className="rounded-lg border border-zinc-800 bg-elevated/40 p-4">
                        <p className="font-display font-extrabold text-white text-[14px] mb-1">Monday · 10-2 · Park</p>
                        <p className="text-zinc-300 text-[13px]">Stories bucket · Transformation framework · 3 shorts</p>
                        <p className="text-zinc-500 text-[12px] italic mt-2">Hooks: &ldquo;I built a $5M business without going viral&rdquo; · &ldquo;I did it without influence or following&rdquo; · &ldquo;When I was at my worst, we were at our best&rdquo;</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-elevated/40 p-4">
                        <p className="font-display font-extrabold text-white text-[14px] mb-1">Wednesday · 10-2 · Gym</p>
                        <p className="text-zinc-300 text-[13px]">Teach bucket · The List + Old Way · New Way · 3 shorts</p>
                        <p className="text-zinc-500 text-[12px] italic mt-2">Hooks: &ldquo;3 numbers in your business you&apos;ve never measured&rdquo; · &ldquo;Old way: chase leads. New way: plug churn first&rdquo; · &ldquo;Two ways to get leads. Pick one.&rdquo;</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-elevated/40 p-4">
                        <p className="font-display font-extrabold text-white text-[14px] mb-1">Friday · 10-2 · Hallway</p>
                        <p className="text-zinc-300 text-[13px]">Beliefs bucket · Fight Me + Belief Flip · 3 shorts</p>
                        <p className="text-zinc-500 text-[12px] italic mt-2">Hooks: &ldquo;35 vs 350. Fight me.&rdquo; · &ldquo;Income buys impact&rdquo; · &ldquo;If it triggers you, it&apos;s probably true&rdquo;</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-4 italic">9 shorts week 1. Build to 14/week by week 3. Rotate the 4 environments (Park / Gym / Hallway / Office). Don&apos;t test environments — rotate them.</p>
                  </Artefact>
                </GapCard>

                {/* GAP 5 · Trust asset gap */}
                <GapCard
                  n="05"
                  title="The trust asset gap"
                  problem="No long-form trust piece live. Audience trusts you on bites; nothing to bind them in long-form."
                  cost="People can&apos;t make the trust leap to a workshop. The fence-sitters stay on the fence."
                  owner="Rhys (talent) · Corey (capture)"
                  due="Character ships by week 4 · Rome outline by week 4"
                >
                  <Artefact label="Character video · the 10-beat arc · shoot in 1 day">
                    <div className="space-y-2.5 text-[13px]">
                      {[
                        ['Cold open', 'I built a $5M fitness business without going viral. Here\'s everything I did. And almost everything I did wrong first.'],
                        ['Old situation', 'Gym floor. Trading time for money. Couldn\'t scale because I was the product.'],
                        ['First scar', 'Couldn\'t pay staff two weeks before Christmas. That\'s the year I learned everything.'],
                        ['Second scar', '600% growth in 5 months. The numbers people would kill for. I was ready to walk away.'],
                        ['Turning point', 'Stopped chasing more. Focused on the ones already there.'],
                        ['Proof beat 1', 'Less than 5,000 followers. 12 likes on a photo. $2.2M USD.'],
                        ['Proof beat 2', '750K gym. No one\'s allowed to train there. That\'s the whole point.'],
                        ['Proof beat 3', 'Sabine: 15K → 80K. She watched every podcast back to the Livingstone days.'],
                        ['New reality', '$5M. 82% 12-month retention. Built on systems, not viral moments.'],
                        ['Invitation', 'If you want to see how I applied all of this, I made Rome. 4 hours. Everything. Link below.'],
                      ].map(([beat, line]) => (
                        <div key={beat} className="grid grid-cols-[120px_1fr] gap-3 py-2 border-b border-blue-500/10 last:border-0">
                          <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300">{beat}</p>
                          <p className="text-zinc-200 leading-relaxed">{line}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-4 italic">Walking + sitting + voiceover with B-roll. 20-30 min target. Lo-fi. No sales. Damaging admissions OK. Empathise, don&apos;t put yourself down.</p>
                  </Artefact>
                </GapCard>

                {/* GAP 6 · Operating rhythm */}
                <GapCard
                  n="06"
                  title="Operating rhythm"
                  problem="No Monday review. No weekly cadence. Decisions get re-litigated. Friday goes by without anyone knowing what won."
                  cost="The team runs on vibes. You stay in the loop on every micro-decision. Drift sets in fast."
                  owner="Corey (runs) · Rhys (signs off)"
                  due="This Monday"
                >
                  <Artefact label="Monday review · 7 questions · 10 minutes">
                    <div className="space-y-2.5">
                      {[
                        'Best stat from last week (single number, named)',
                        'Highest watch-time video. What was the topic?',
                        'Drop-off point on the top performer (3-4s = rehook there or layer CTA there)',
                        'Save rate. If high, simplify. Saves are a warning not a win.',
                        'ICP comments yes / no. Are the right people commenting?',
                        'Topic that worked. Best guess on why?',
                        'Decision: what do we do more of this week?',
                      ].map((q, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="font-display text-blue-300 text-[13px] font-extrabold mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-zinc-200 text-[14px] leading-relaxed">{q}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-4 italic">Corey prepares the answers before the meeting. Rhys signs off in 10 minutes. Drives the week&apos;s decisions.</p>
                  </Artefact>
                </GapCard>

                {/* GAP 7 · Corey evolution */}
                <GapCard
                  n="07"
                  title="Corey's role evolution"
                  problem="Corey is a videographer. He hasn't been a creative director yet. Reactive shoots are inevitable until he has business context."
                  cost="You stay as creative director by default. Every shoot needs you in the room or on the line."
                  owner="Corey (learns) · Sean (curriculum) · Rhys (exposure)"
                  due="Month 1: shadow · Month 2: suggest · Month 3: drive"
                >
                  <Artefact label="Corey's 30-day shadowing protocol">
                    <div className="grid gap-3">
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] p-4">
                        <p className="font-display font-extrabold text-blue-300 text-[12px] uppercase tracking-widest mb-2">Week 1 · absorb</p>
                        <Bullets items={[
                          'Sit in on 3 client calls (no camera, observe only)',
                          'Sit in on 1 workshop (no shooting, take notes)',
                          'Review the last 30 days of content metrics',
                        ]} />
                      </div>
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] p-4">
                        <p className="font-display font-extrabold text-blue-300 text-[12px] uppercase tracking-widest mb-2">Week 2 · pattern recognition</p>
                        <Bullets items={[
                          'Read Sean&apos;s curated list (frameworks, IP bank, voice rules)',
                          'Run the bottleneck diagnostic on 2 client cases',
                          'Catalogue every story Rhys told this week',
                        ]} />
                      </div>
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] p-4">
                        <p className="font-display font-extrabold text-blue-300 text-[12px] uppercase tracking-widest mb-2">Week 3 · suggest</p>
                        <Bullets items={[
                          'Bring 3 content angles to Monday review',
                          'Suggest which environment + framework for each shoot',
                          'Identify the 1 pattern showing up in client problems',
                        ]} />
                      </div>
                      <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] p-4">
                        <p className="font-display font-extrabold text-blue-300 text-[12px] uppercase tracking-widest mb-2">Week 4 · drive</p>
                        <Bullets items={[
                          'Lead Monday review (Rhys signs off)',
                          'Own the shoot schedule for the next week',
                          'Present the &ldquo;what to do more of&rdquo; case to Rhys with data',
                        ]} />
                      </div>
                    </div>
                  </Artefact>
                </GapCard>

                {/* GAP 8 · KPI dashboard */}
                <GapCard
                  n="08"
                  title="KPIs that drive the week"
                  problem="No dashboard the team works against. Decisions get made on vibes, not data. Drift compounds."
                  cost="You can&apos;t see when something&apos;s breaking until it&apos;s broken. The 30-day test data has no shape to land in."
                  owner="Corey (tracks) · Sean (defines targets)"
                  due="End of week 2"
                >
                  <Artefact label="The 8 numbers · tracked weekly">
                    <div className="grid md:grid-cols-2 gap-2.5 text-[13px]">
                      {[
                        ['Workshop signups', 'Sustained · 75/wk'],
                        ['Workshop show rate', 'Baseline 99% · hold'],
                        ['Workshop → call rate', 'Sub-2% → target 5%+'],
                        ['Call → close rate', '9/10 best months · hold'],
                        ['12-month L2 retention', '82% proven · hold'],
                        ['Avg short-form watch time', 'Rising = working'],
                        ['Share rate', 'Best forward indicator'],
                        ['ICP comment ratio', 'Qualitative · weekly read'],
                      ].map(([metric, target]) => (
                        <div key={metric} className="rounded-lg border border-zinc-800 bg-elevated/40 p-3">
                          <p className="font-display font-extrabold text-white text-[14px]">{metric}</p>
                          <p className="text-zinc-400 text-[12px] mt-1">{target}</p>
                        </div>
                      ))}
                    </div>
                  </Artefact>
                </GapCard>

              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ 30/60/90 ROADMAP ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The roadmap</Eyebrow>
              <H2>30 · 60 · 90 · sequenced deliberately.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-10">Stabilise first. Build foundations second. Scale third. Each phase has a goal and success measures.</p>

              <div className="space-y-8">
                {/* 0-30 */}
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-8">
                  <p className="font-display text-blue-300 text-[14px] font-extrabold uppercase tracking-widest mb-2">Days 0 - 30 · Stabilise</p>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4">Sharpen clarity. Fix the obvious leaks. Ship the workshop fix.</h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Ships</p>
                      <Bullets items={[
                        'New bio · live across all channels',
                        'Six Step Profit Path landing page · new headline live',
                        'Workshop Q&A card · printed for next workshop',
                        '30-day shoot test · Mon/Wed/Fri locked, 14 shorts/wk by week 3',
                        'Reese Livingstone pinned posts · swapped',
                        'Sales Success System · landing page live',
                        'Monday review · running every Monday',
                        'Corey · 3 client calls + 1 workshop shadowed',
                      ]} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Success measures</p>
                      <Bullets items={[
                        'Stranger lands on bio + sees what + who + why in 1 line',
                        'Mon/Wed/Fri shoot rhythm running',
                        'Workshop Q&A footage usable as ads',
                        'Sub-2% page conversion trending up',
                        'Rhys not in any low-value admin loops',
                      ]} />
                    </div>
                  </div>
                </div>

                {/* 30-60 */}
                <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-6 md:p-8">
                  <p className="font-display text-zinc-300 text-[14px] font-extrabold uppercase tracking-widest mb-2">Days 30 - 60 · Build foundations</p>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4">Trust assets shipped. Cycle locked. Cadence sticks.</h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Ships</p>
                      <Bullets items={[
                        'Character video · live (YouTube + landing page)',
                        'Rome VSL · filming days locked, outline finalised',
                        'Churn Calculator · live + linked from shorts',
                        '30-day test data · 4 winning formats picked',
                        'Podcast cadence · 3/week from book chapters',
                        'Six-week content cycle · week 1 + 2 shipped',
                      ]} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Success measures</p>
                      <Bullets items={[
                        'Character video bringing in DM traffic',
                        '4 short-form formats locked, 2 duds killed',
                        'Workshop Q&A → ads pipeline producing 8-12/cohort',
                        'Corey suggesting content angles in Monday review',
                        'Average watch time rising on short-form',
                      ]} />
                    </div>
                  </div>
                </div>

                {/* 60-90 */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 md:p-8">
                  <p className="font-display text-emerald-300 text-[14px] font-extrabold uppercase tracking-widest mb-2">Days 60 - 90 · Scale</p>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-4">Rome ships. The engine runs. You stop being the bottleneck.</h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Ships</p>
                      <Bullets items={[
                        'Rome VSL · hosted unlisted → public on YouTube',
                        'Six-week cycle · weeks 3-6 shipped, cycle 2 starting',
                        'Continuous testing locked · 1-2 new formats per month',
                        'KPI dashboard · first quarterly review run',
                        'Corey · presenting Monday creative direction from data',
                      ]} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-300 mb-2">Success measures</p>
                      <Bullets items={[
                        'Rhys spending &gt;50% of week on product + strategy + relationships',
                        'Corey owns the shoot schedule independently',
                        'Workshop quality lifting (pre-sold leads in the room)',
                        'Page conversion 3%+ on the workshop landing',
                        'Pipeline of 8 short-form formats with data behind each',
                      ]} />
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ OPERATING RHYTHM ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The rhythm</Eyebrow>
              <H2>Without cadence, everything is reactive.</H2>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-blue-300 mb-4">Weekly</p>
                  <Bullets items={[
                    <><b className="text-white font-semibold">Monday</b> · review last week (Corey runs the 7 questions, Rhys signs off). Shoot 10-2. Capture (4 questions, voice note) end of day.</>,
                    <><b className="text-white font-semibold">Tuesday</b> · client calls + admin. Corey edits batch 1.</>,
                    <><b className="text-white font-semibold">Wednesday</b> · shoot 10-2. Capture end of day.</>,
                    <><b className="text-white font-semibold">Thursday</b> · client calls + admin. Corey edits batch 2 + podcast cuts.</>,
                    <><b className="text-white font-semibold">Friday</b> · shoot 10-2. Weekly review with Corey. Schedule next week.</>,
                    <><b className="text-white font-semibold">Sunday eve</b> · Rhys scans next week&apos;s shoot list. Approves or swaps.</>,
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-blue-300 mb-4">Monthly</p>
                  <Bullets items={[
                    <><b className="text-white font-semibold">Format review</b> · which short-form formats earned their slot? Lock the 4 winners, kill duds.</>,
                    <><b className="text-white font-semibold">KPI vs target</b> · the 8 numbers. Where are we vs the targets? What needs a fix?</>,
                    <><b className="text-white font-semibold">New format test</b> · pick 1-2 new formats. Add to the rotation for next month.</>,
                    <><b className="text-white font-semibold">Ad creative rotation</b> · refresh top-of-funnel + mid-funnel ads from workshop Q&As.</>,
                    <><b className="text-white font-semibold">Lead magnet review</b> · which is converting? Which needs a new angle?</>,
                  ]} />
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ WHO DOES WHAT ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Roles</Eyebrow>
              <H2>Who does what · over the 90 days.</H2>
              <div className="space-y-6 mt-8">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Rhys · talent + IP + final call</p>
                  <Bullets items={[
                    'Show up to Mon / Wed / Fri shoots',
                    'Write hook + problem for each weekly video',
                    'Film Character (1 day) and Rome (2-3 day block-shoot)',
                    'Record 2-3 podcast episodes per week (5-15 min each)',
                    'Sign off Monday review in 10 minutes',
                    'Capture (4 questions) end of each working day',
                    'Approve next-week shoot list Sunday evening',
                    'Final call on every named asset, framework, hire',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Corey · capture + operations + creative direction (build into)</p>
                  <Bullets items={[
                    'Run the Mon / Wed / Fri shoots (14 shorts/wk by week 3)',
                    'Edit short-form to ship 2/day cadence',
                    'Two-camera minimum on long-form, lined up for the cut',
                    'Log daily metrics, run Monday review',
                    'Shadow 3 client calls + 1 workshop in week 1',
                    'Build pattern recognition: read frameworks, catalogue stories',
                    'By week 3: suggest content angles. By week 4: drive direction.',
                  ]} />
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="font-display font-extrabold text-blue-300 text-[16px] mb-4">Sean · strategy + frameworks + accountability</p>
                  <Bullets items={[
                    'Build + deliver the content operating system (the 4 modules)',
                    'Write the 4 lead magnet headlines + landing pages',
                    'Facilitate the 10 character lessons with Rhys',
                    'Lock the 6 pillar video outlines and the 6-week cycle doc',
                    'Name the signature mechanisms (MACHINE, 5-star offer, lead-vs-churn inverse)',
                    'Curate Corey&apos;s resources + run the bottleneck diagnostic with him',
                    'Fortnightly strategy + accountability sessions with Rhys',
                    'Voice note + email support between sessions for decisions as they come up',
                  ]} />
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ THE MODULES (the work) ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The work</Eyebrow>
              <H2>Open these. Use them. Don&apos;t reinvent.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-8">The four modules. Each one is a working tool, not a reference doc.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ModuleLink to="/undeniablenextsteps/shoot-card" label="Next Shoot" blurb="Four buckets, frameworks, 22 shoot-ready pieces, hook bank per bucket. The thing Corey opens on shoot day." />
                <ModuleLink to="/undeniablenextsteps/content-system" label="The Content System" blurb="Formats, modes, capture, measurement, production. The how, not the why." />
                <ModuleLink to="/undeniablenextsteps/hooks" label="The Hook Bank" blurb="~90 hooks organised by mechanic. Grab and shoot." />
                <ModuleLink to="/undeniablenextsteps/ad-gold" label="Ad Gold" blurb="Verbatim money lines, stories, frames. For ads and written creative." />
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ BRAND CORE (reference, compressed) ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Reference</Eyebrow>
              <H2>Brand core + dream clients.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-8">The strategic context. Compressed. Keep this in mind every time you write or shoot.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-300 mb-4">Brand core</p>
                  <Bullets items={[
                    <><b className="text-white font-semibold">Archetypes:</b> Guide (primary) · Protector · Scientist</>,
                    <><b className="text-white font-semibold">Category:</b> Health &amp; Fitness business owners</>,
                    <><b className="text-white font-semibold">Unique offer:</b> &ldquo;I did it without influence. Come test me in person.&rdquo;</>,
                    <><b className="text-white font-semibold">Recognition line:</b> &ldquo;He&apos;s the one who actually did it.&rdquo;</>,
                    <><b className="text-white font-semibold">Voice:</b> Conviction. Dry humour. Logical. Calm. Profane when emphatic. No corporate gloss.</>,
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-semibold text-[13px] uppercase tracking-widest text-zinc-300 mb-4">Dream clients</p>
                  <Bullets items={[
                    <><b className="text-white font-semibold">Sabine</b> · 15K → 80K months. Consumed everything. Tries first, asks when stuck.</>,
                    <><b className="text-white font-semibold">Josh</b> · gym owner, 2 locations. Did the math: lost $800K and never knew. Problem-solves himself.</>,
                    <>Both self-identify as doers. The binary format trains more of them to put their hand up.</>,
                  ]} />
                </div>
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* ═══ CLOSING ═══ */}
        <section className="py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Section>
              <div className="accent-line mx-auto mb-10" />
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight mb-6">
                This isn&apos;t hustle. It&apos;s operating leverage.
              </h3>
              <p className="text-zinc-400 mb-10 leading-relaxed text-[16px]">
                The next stage of growth doesn&apos;t come from working harder. It comes from the system that runs without you in the room.
              </p>
              <a
                href="/undeniable-notes"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to the working notes
              </a>
            </Section>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
