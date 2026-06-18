import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, AlertCircle, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

// ─── Building blocks ────────────────────────────────────────────────────

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-400 uppercase tracking-widest mb-4">{children}</p>
);

function Artefact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mt-4">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">⬡ {label}</p>
      <div className="text-zinc-100 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}

function Move({ n, title, children }: { n: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-display text-[20px] font-extrabold text-blue-400 tabular-nums leading-none">{n}</span>
        <h4 className="font-display text-[17px] md:text-[19px] font-extrabold text-white leading-tight">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function Phase({ tag, window, title, children }: { tag: string; window: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 border border-blue-500/40 bg-blue-500/5 rounded-full px-3 py-1">{tag}</span>
            <span className="text-zinc-400 text-[12px] uppercase tracking-widest font-semibold">{window}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">{title}</h2>
          <div className="space-y-4">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

const Divider = () => <div className="gradient-line" />;

// ─── Page ───────────────────────────────────────────────────────────────

export default function UndeniableNextSteps() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO
          title="Next steps for Undeniable · the 90-day plan"
          description="One linear plan. The diagnosis, the moves, the artefacts, the roles. End-to-end."
          path="/undeniablenextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* ═══ HERO ═══ */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="accent-line mb-8" />
              <Eyebrow>Undeniable · 90 days</Eyebrow>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                The
                <br />
                <span className="text-blue-400">Plan.</span>
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium italic">Working session output · for the Undeniable team</span>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ DIAGNOSIS + PRIORITISATION ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>The diagnosis</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">One core bottleneck. Clarity.</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { letter: 'C', name: 'Clarity', score: 3, focus: true },
                  { letter: 'V', name: 'Visibility', score: 4, focus: false },
                  { letter: 'A', name: 'Authority', score: 5, focus: false },
                  { letter: 'Q', name: 'Quality', score: 3, focus: false },
                ].map((b) => (
                  <div key={b.letter} className={`rounded-2xl border p-5 md:p-6 ${b.focus ? 'border-blue-500/40 bg-blue-500/[0.05]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-display text-[28px] md:text-[32px] font-extrabold text-white">{b.letter}</span>
                      <span className={`font-display text-[28px] md:text-[32px] font-extrabold ${b.focus ? 'text-blue-400' : 'text-zinc-400'}`}>{b.score}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400">{b.name}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ THE AVATAR · one merged ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>The avatar</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">Doing 10K-80K. Already knows your work.</h2>
            </Reveal>
          </div>
        </section>

        <Divider />


        {/* ═══ SEGMENT 1 · LEAD MAGNETS ═══ */}
        <Phase
          tag="Segment 1"
          window="Week 1-4"
          title="Lead Magnets."
        >

          <Move
            n="01"
            title="Relaunch Six Step Profit Path."
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">Turn cold leads into raving fans.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;In 5 minutes, you&apos;ll know how to take people from never-heard-of-you to obsessed advocate. Without DMing 100 people a day.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="02"
            title="Ship From Cold to Sold landing page."
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">From Cold to Sold.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;The sales framework I use on every workshop call. Stripped to its bones. Steal it.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="03"
            title="Rebrand the diagnostic."
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">Find the one thing capping your business.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;60-second diagnostic. Personalised blueprint + a video of me walking you through the fix.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="04"
            title="Ship the Leak Calculator."
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">How big is your leak?</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;60-second calculator. Pours your business into a leaky bucket. Tells you how fast it&apos;s draining. Imagine if you never lost a client.&rdquo;</p>
            </Artefact>
          </Move>

        </Phase>

        <Divider />

        {/* ═══ SEGMENT 2 · SHORT-FORM CONTENT ═══ */}
        <Phase
          tag="Segment 2"
          window="Week 1-12"
          title="Short-form Content."
        >

          <Move
            n="05"
            title="Lock the 30-day shoot test."
          >
            <Artefact label="Week 1 shoot grid">
              <div className="space-y-2 text-[13px]">
                <div className="flex gap-3"><span className="font-display font-extrabold text-blue-300 w-20">Monday</span><span className="text-zinc-200">Park · Stories bucket · Transformation framework · 3 shorts</span></div>
                <div className="flex gap-3"><span className="font-display font-extrabold text-blue-300 w-20">Wednesday</span><span className="text-zinc-200">Gym · Teach bucket · List + Old Way · New Way · 3 shorts</span></div>
                <div className="flex gap-3"><span className="font-display font-extrabold text-blue-300 w-20">Friday</span><span className="text-zinc-200">Hallway · Beliefs bucket · Fight Me + Belief Flip · 3 shorts</span></div>
              </div>
              <p className="text-zinc-400 text-[12px] italic mt-3">9 shorts week 1. 14/week by week 3.</p>
            </Artefact>
          </Move>

          <Move
            n="06"
            title="Continuous testing locked."
          />

        </Phase>

        <Divider />

        {/* ═══ SEGMENT 3 · LONG-FORM TRUST ASSETS ═══ */}
        <Phase
          tag="Segment 3"
          window="Week 5-10"
          title="Long-form Trust Assets."
        >

          <Move
            n="07"
            title="Ship the Character video."
          >
            <Artefact label="The 10-beat arc">
              <div className="space-y-1.5 text-[13px]">
                {[
                  ['Cold open', 'I built a $5M fitness business without going viral. Here\'s everything I did. And almost everything I did wrong first.'],
                  ['Old situation', 'Gym floor. Trading time for money.'],
                  ['First scar', 'Couldn\'t pay staff two weeks before Christmas.'],
                  ['Second scar', '600% growth in 5 months. I was ready to walk away.'],
                  ['Turning point', 'Stopped chasing more. Focused on the ones already there.'],
                  ['Proof beat 1', '< 5,000 followers. 12 likes on a photo. $2.2M USD.'],
                  ['Proof beat 2', '750K gym. No one\'s allowed to train there.'],
                  ['Proof beat 3', 'Sabine: 15K → 80K.'],
                  ['New reality', '$5M. 82% retention. Systems, not viral moments.'],
                  ['Invitation', 'I made Rome. 4 hours. Everything. Link below.'],
                ].map(([beat, line]) => (
                  <div key={beat} className="flex gap-3 py-0.5">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 w-24 flex-shrink-0 pt-1">{beat}</span>
                    <span className="text-zinc-200">{line}</span>
                  </div>
                ))}
              </div>
            </Artefact>
          </Move>

          <Move
            n="08"
            title="Film Rome. Ship unlisted then public."
          >
            <Artefact label="Rome chapter map">
              <div className="space-y-1 text-[13px]">
                {[
                  ['~5 min', 'Hook · clear promise + length + outcome'],
                  ['~10 min', 'The problem · why most coaches cap at 10K'],
                  ['~45 min', 'The path · what to do instead'],
                  ['~20 min', 'Personal story arc'],
                  ['~30 min', 'Case study 1 · Luke Miller (60K → 600K USD)'],
                  ['~30 min', 'Case study 2 · Sabine (15K → 80K)'],
                  ['~20 min', 'Case study 3 · Gabe'],
                  ['~60 min', 'The full system'],
                  ['~10 min', 'Next step CTA'],
                ].map(([time, chapter]) => (
                  <div key={chapter} className="flex gap-3 py-0.5">
                    <span className="text-blue-400 font-mono font-semibold w-16 flex-shrink-0">{time}</span>
                    <span className="text-zinc-200">{chapter}</span>
                  </div>
                ))}
              </div>
            </Artefact>
          </Move>

          <Move
            n="09"
            title="Start the six-week long-form cycle."
          >
            <Artefact label="The 6 weekly types">
              <div className="space-y-1 text-[13px]">
                <div><b className="text-blue-300">W1</b> · Character / heart</div>
                <div><b className="text-blue-300">W2</b> · Framework explainer</div>
                <div><b className="text-blue-300">W3</b> · Comparison / binary</div>
                <div><b className="text-blue-300">W4</b> · Math live</div>
                <div><b className="text-blue-300">W5</b> · List / numbered breakdown</div>
                <div><b className="text-blue-300">W6</b> · Belief flip / hot take</div>
              </div>
              <p className="text-zinc-400 text-[12px] italic mt-3">Full per-video workflow in <a href="/undeniablenextsteps/content" className="text-blue-400 hover:text-blue-300 font-semibold">Content →</a></p>
            </Artefact>
          </Move>

          <Move
            n="10"
            title="Start podcasts · 3 per week."
          />

        </Phase>

        <Divider />

        {/* ═══ SEGMENT 4 · OPERATIONS ═══ */}
        <Phase
          tag="Segment 4"
          window="Week 1-12"
          title="Operations."
        >

          <Move
            n="11"
            title="Corey shadowing protocol kicks off."
          >
            <Artefact label="The 30-day protocol">
              <ul className="space-y-1.5 text-zinc-100 text-[13px]">
                <li><b className="text-blue-300">Week 1 · Absorb</b> · 3 client calls + 30 days of metrics</li>
                <li><b className="text-blue-300">Week 2 · Pattern recognise</b> · resource list + catalogue Rhys stories</li>
                <li><b className="text-blue-300">Week 3 · Suggest</b> · 3 content angles at Monday review</li>
                <li><b className="text-blue-300">Week 4 · Drive</b> · lead Monday review · own next-week shoot plan</li>
              </ul>
            </Artefact>
          </Move>

          <Move
            n="12"
            title="Install the Monday review."
          >
            <Artefact label="The Monday review · 7 questions">
              <div className="space-y-1 text-[13px]">
                <div><b className="text-blue-300">01</b> · Best stat from last week</div>
                <div><b className="text-blue-300">02</b> · Highest watch-time video · the topic</div>
                <div><b className="text-blue-300">03</b> · Drop-off point on the top performer</div>
                <div><b className="text-blue-300">04</b> · Save rate · spike = simplify</div>
                <div><b className="text-blue-300">05</b> · ICP comment ratio · right people?</div>
                <div><b className="text-blue-300">06</b> · Topic that worked · why</div>
                <div><b className="text-blue-300">07</b> · Decision: what do we do more of this week?</div>
              </div>
            </Artefact>
          </Move>

          <Move
            n="13"
            title="KPI dashboard live."
          >
            <Artefact label="The 8 weekly numbers">
              <div className="grid md:grid-cols-2 gap-2 text-[12px]">
                {[
                  'Workshop signups',
                  'Workshop show rate · 99% baseline',
                  'Workshop → call rate · sub-2% → 5%+',
                  'Call → close rate · 9/10 hold',
                  'L2 12-month retention · 82% hold',
                  'Avg short-form watch time',
                  'Share rate',
                  'ICP comment ratio',
                ].map((k) => <div key={k} className="rounded-lg border border-zinc-800 bg-elevated/40 px-3 py-2 text-zinc-200">{k}</div>)}
              </div>
            </Artefact>
          </Move>

        </Phase>

        <Divider />

        {/* ═══ ROLES ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Roles</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">Three lanes.</h2>
              <div className="space-y-3">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 px-6 py-5">
                  <p className="font-display font-extrabold text-white text-[16px]">Rhys · talent</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 px-6 py-5">
                  <p className="font-display font-extrabold text-white text-[16px]">Corey · operations</p>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] px-6 py-5">
                  <p className="font-display font-extrabold text-blue-300 text-[16px]">Sean · strategy</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ WEEKLY RHYTHM ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Rhythm</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">The week.</h2>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                {[
                  { d: 'Mon', label: 'Shoot 10-2 · Monday review', shoot: true },
                  { d: 'Tue', label: 'Edit · client calls', shoot: false },
                  { d: 'Wed', label: 'Shoot 10-2', shoot: true },
                  { d: 'Thu', label: 'Edit · podcast cuts', shoot: false },
                  { d: 'Fri', label: 'Shoot 10-2 · weekly review', shoot: true },
                  { d: 'Sat', label: 'Off', shoot: false },
                  { d: 'Sun', label: 'Rhys preview next week', shoot: false },
                ].map((day) => (
                  <div key={day.d} className={`rounded-xl border p-3 md:p-4 ${day.shoot ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <p className={`font-display text-[14px] font-extrabold mb-2 ${day.shoot ? 'text-blue-300' : 'text-white'}`}>{day.d}</p>
                    <p className="text-zinc-300 text-[12px] leading-relaxed">{day.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ OPEN DECISIONS ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Pending</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">Open decisions.</h2>
              <div className="space-y-3">
                {[
                  'Custom GPT route',
                  'Bottleneck Buster · rename?',
                  'Linktree replacement',
                  'Reese Livingstone vs Undeniable channel',
                  'Ad boost on shorts',
                  'Re-cut workshop VSL',
                ].map((q, i) => (
                  <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
                    <p className="font-display text-[15px] font-extrabold text-amber-300">{q}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ REFERENCE TOOLS ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Tools</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">The working pages.</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <a href="/undeniablenextsteps/shoot-card" className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5">
                  <h3 className="font-display text-[18px] font-extrabold text-white">Next Shoot</h3>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="/undeniablenextsteps/hooks" className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5">
                  <h3 className="font-display text-[18px] font-extrabold text-white">Hook Bank</h3>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="/undeniablenextsteps/ad-gold" className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5">
                  <h3 className="font-display text-[18px] font-extrabold text-white">Ad Gold</h3>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="/undeniablenextsteps/content" className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-6 py-5">
                  <h3 className="font-display text-[18px] font-extrabold text-white">Content System</h3>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ WHY NOW ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>Why now</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-10">The rocket ship has already left the station.</h2>
              <ul className="space-y-4">
                {[
                  'Right problem, wrong way is the most expensive place to be. You get small wins, think it is great, and do not find out for five years you could have been three times the size.',
                  'I made an extra $120,000 that year and thought it was great. Then I realised if I had solved it this way first, we would have made an extra $600,000.',
                  'Less than 5,000 followers when this started. 40 person rooms. 10 to 12 workshops this year. The room only gets harder to get into.',
                  'In twelve months, you stop being the one borrowing status, and become the asset everyone else wants to borrow.',
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[15px] leading-relaxed italic">&ldquo;{q}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ CLOSING ═══ */}
        <section className="py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Reveal>
              <div className="accent-line mx-auto mb-10" />
              <p className="text-zinc-400 mb-10 leading-relaxed text-[16px]">
                The next stage of growth doesn&apos;t come from working harder. It comes from the system that runs without you in the room.
              </p>
              <a href="/undeniable-notes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to the working notes
              </a>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
