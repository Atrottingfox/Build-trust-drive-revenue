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

const Bullets = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-[14px] leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

function Artefact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mt-4">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">⬡ {label}</p>
      <div className="text-zinc-100 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}

function Move({
  n, title, body, owner, ship, children,
}: {
  n: string; title: string; body: string; owner: string; ship: string; children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
        <span className="font-display text-[20px] font-extrabold text-blue-400 tabular-nums leading-none">{n}</span>
        <h4 className="font-display text-[17px] md:text-[19px] font-extrabold text-white leading-tight">{title}</h4>
      </div>
      <p className="text-zinc-300 text-[14px] leading-relaxed mb-5">{body}</p>
      {children}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mt-5 pt-4 border-t border-zinc-800/80">
        <div className="flex items-baseline gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Owner</span>
          <span className="text-zinc-200">{owner}</span>
        </div>
        <div className="flex items-baseline gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Ship by</span>
          <span className="text-zinc-200">{ship}</span>
        </div>
      </div>
    </div>
  );
}

function Phase({ tag, window, title, theme, children }: { tag: string; window: string; title: string; theme: string; children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 border border-blue-500/40 bg-blue-500/5 rounded-full px-3 py-1">{tag}</span>
            <span className="text-zinc-400 text-[12px] uppercase tracking-widest font-semibold">{window}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">{title}</h2>
          <p className="text-zinc-400 text-[15px] md:text-[16px] leading-relaxed mb-10">{theme}</p>
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium italic">Working session output · for the Undeniable team</span>
              </div>
              <p className="text-zinc-400 text-[17px] md:text-[19px] leading-relaxed">
                Most of the 15-20K coaches in your category already know who you are. They&apos;re sitting on the fence. The next 90 days compress trust and convert them, instead of chasing new eyeballs.
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ DIAGNOSIS + PRIORITISATION ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>The diagnosis</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">Four bottlenecks. Two need work.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Clarity and Quality both score 3. That&apos;s where the 90 days start. The other two hold.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { letter: 'C', name: 'Clarity', score: 3, focus: 'Fix first', note: 'Stranger reads 4 of 5 posts as "I\'m a coach."' },
                  { letter: 'V', name: 'Visibility', score: 4, focus: '', note: 'Strangers in DMs. ICP knows the name.' },
                  { letter: 'A', name: 'Authority', score: 5, focus: '', note: '$5M built. 82% retention. Receipts unmatched.' },
                  { letter: 'Q', name: 'Quality', score: 3, focus: 'Fix next', note: 'Leads landing sub-10K. Qualified eventually, not pre-sold.' },
                ].map((b) => (
                  <div key={b.letter} className={`rounded-2xl border p-4 md:p-5 ${b.focus ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-display text-[24px] md:text-[28px] font-extrabold text-white">{b.letter}</span>
                      <span className={`font-display text-[24px] md:text-[28px] font-extrabold ${b.focus ? 'text-blue-400' : 'text-zinc-400'}`}>{b.score}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-1">{b.name}</p>
                    {b.focus && <p className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold mb-2">{b.focus}</p>}
                    <p className="text-zinc-300 text-[12px] md:text-[13px] leading-relaxed mt-2">{b.note}</p>
                  </div>
                ))}
              </div>

              {/* PRIORITISATION */}
              <div className="mt-12">
                <Eyebrow>Why this order</Eyebrow>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-6">Clarity first. Then Quality. Visibility and Authority hold.</h3>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-blue-400 text-[16px] font-extrabold">01</span>
                      <p className="font-display text-white text-[15px] md:text-[16px] font-extrabold">Clarity gates everything downstream.</p>
                    </div>
                    <p className="text-zinc-300 text-[14px] leading-relaxed">A stranger decides in under 10 posts whether you&apos;re for them. Until the profile + bio + pinned content reads as &ldquo;he helps fitness coaches build $1M+ businesses without going viral,&rdquo; every dollar spent on Visibility and every brick of Authority lands on the wrong audience. <b className="text-white">Fix: moves 01-02</b> · the bio, the voice, the editorial filter.</p>
                  </div>
                  <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-blue-400 text-[16px] font-extrabold">02</span>
                      <p className="font-display text-white text-[15px] md:text-[16px] font-extrabold">Quality is what makes the room worth being in.</p>
                    </div>
                    <p className="text-zinc-300 text-[14px] leading-relaxed">Clarity sharpens who shows up. Quality sharpens who they are when they show up — pre-sold, on-budget, on-frame. Sub-10K leads dilute the workshop signal and tank the close rate. <b className="text-white">Fix: moves 03-04, 07</b> · lead magnets named for the right outcome, the Q&A framework enforced, the Character video doing the trust transfer.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-zinc-400 text-[16px] font-extrabold">03</span>
                      <p className="font-display text-white text-[15px] md:text-[16px] font-extrabold">Visibility and Authority don&apos;t need investment right now.</p>
                    </div>
                    <p className="text-zinc-300 text-[14px] leading-relaxed">Visibility at 4 = the reach is fine. Authority at 5 = the receipts are unmatched. Pouring effort here would be procrastination dressed as growth. Both compound automatically once Clarity and Quality are fixed. <b className="text-white">Action: hold both</b>.</p>
                  </div>
                </div>
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
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">Built from Sabine and Josh.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">One coach. Both archetypes baked in. Every brand and content decision asks: does this land for them?</p>
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-7 md:p-8">
                <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-3">The Patient Operator</p>
                <p className="font-display text-white text-[24px] md:text-[28px] font-extrabold leading-tight mb-5">Already doing 10K-80K. Already knows your work.</p>
                <p className="text-zinc-200 text-[15px] leading-relaxed mb-5">
                  Self-identifies as a doer. Tries first. Asks when stuck. Has consumed your content for months — possibly years. Has a hidden inefficiency they can&apos;t yet name: a leak, a ceiling, a churn rate they&apos;ve never measured. They&apos;re not waiting for permission. They&apos;re waiting for the proof they can&apos;t argue with.
                </p>
                <div className="grid md:grid-cols-2 gap-4 pt-5 border-t border-zinc-800/80">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">What they say</p>
                    <ul className="space-y-1.5 text-zinc-300 text-[13px] italic">
                      <li>&ldquo;Sorry if I&apos;m being annoying.&rdquo;</li>
                      <li>&ldquo;You don&apos;t know what you don&apos;t know.&rdquo;</li>
                      <li>&ldquo;You won&apos;t hear from me until I&apos;ve done 80K a month.&rdquo;</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">How they convert</p>
                    <ul className="space-y-1.5 text-zinc-300 text-[13px]">
                      <li>On proof, not pitch.</li>
                      <li>On math they can run themselves.</li>
                      <li>On stories that mirror their stuck point.</li>
                      <li>On a single number they hadn&apos;t calculated.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ═══ THE PLAN HEADER ═══ */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <Eyebrow>The plan</Eyebrow>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-6">
                  Four segments.
                  <br />
                  <span className="text-zinc-400">Each one its own domain.</span>
                </h2>
                <p className="text-zinc-400 text-[16px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
                  Lead Magnets · Short-form · Long-form Trust · Operations. Each segment self-contained, with the moves, owners, ship dates and artefacts inside.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ SEGMENT 1 · LEAD MAGNETS ═══ */}
        <Phase
          tag="Segment 1"
          window="Week 1-4"
          title="Lead Magnets."
          theme="Four critical assets. Two flagship (Profit Path · Cold to Sold). Two workhorses (the diagnostic · the Leak Calculator). Each one named for the outcome it delivers. Deeper detail in /undeniablenextsteps/lead-magnets."
        >

          <Move
            n="01"
            title="Relaunch Six Step Profit Path."
            body="Rename from &ldquo;Customer Journey Blueprint&rdquo; — that name says nothing. New headline + new landing page. Asset itself stays as is."
            owner="Sean writes · Rhys team builds"
            ship="End of week 2"
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">Turn cold leads into raving fans.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;In 5 minutes, you&apos;ll know how to take people from never-heard-of-you to obsessed advocate. Without DMing 100 people a day.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="02"
            title="Ship From Cold to Sold landing page."
            body="Best-performing asset for lead quality. Doesn&apos;t need rebuild — just a clean landing page that names what it is."
            owner="Sean writes · Rhys team builds"
            ship="End of week 2"
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">From Cold to Sold.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;The sales framework I use on every workshop call. Stripped to its bones. Steal it.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="03"
            title="Rebrand the diagnostic."
            body="Highest-value asset on the page. Avoid &ldquo;diagnostic&rdquo; and &ldquo;bottleneck&rdquo; on the landing page — most don&apos;t know the words."
            owner="Sean writes · Rhys signs off"
            ship="End of week 3"
          >
            <Artefact label="The headline · ready to paste">
              <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">Find the one thing capping your business.</p>
              <p className="text-zinc-200 text-[14px] italic">&ldquo;60-second diagnostic. Personalised blueprint + a video of me walking you through the fix.&rdquo;</p>
            </Artefact>
          </Move>

          <Move
            n="04"
            title="Ship the Leak Calculator."
            body="Names a problem coaches feel but can&apos;t describe. Inputs: clients in × clients out × 12 months. Output: grow / flat / shrink + lost revenue. Visualise as the leaky bucket. Above 3% triggers a follow-up sequence."
            owner="Rhys team builds · Sean writes copy"
            ship="End of week 4"
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
          theme="The volume engine. Mon/Wed/Fri shoot rhythm across 4 environments. 9 shorts week 1, scaling to 14/week by week 3. 30-day test → pick 4 winners → 60-day lock → continuous testing forever. Deeper detail in /undeniablenextsteps/content."
        >

          <Move
            n="05"
            title="Lock the 30-day shoot test."
            body="Stop reactive shooting. Mon/Wed/Fri. 4 environments rotated (Park · Gym · Hallway · Office). Don&apos;t test environments — rotate them. Test format, length, hook style, CTA. End of 30 days, pick 4 winners."
            owner="Corey runs · Rhys shows up"
            ship="Week 1 start"
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
            body="Test 1-2 new short-form formats per month. Forever. The 4 winners from the 30-day test are the base; new tests challenge them quarterly. The system survives drift."
            owner="Corey leads · Rhys signs off monthly"
            ship="From week 5 onward"
          />

        </Phase>

        <Divider />

        {/* ═══ SEGMENT 3 · LONG-FORM TRUST ASSETS ═══ */}
        <Phase
          tag="Segment 3"
          window="Week 5-10"
          title="Long-form Trust Assets."
          theme="Character video transfers the trust. Rome closes the loop. Podcasts compound on the audio side. By end of segment: Character is live, Rome ships unlisted then public, 3 podcasts a week are running. These are the assets that compress trust on the fence-sitters."
        >

          <Move
            n="07"
            title="Ship the Character video."
            body="The Trojan horse. 20-30 minutes. Rhys&apos;s arc from gym floor to $5M. Vulnerable. No selling. Damaging admissions OK. Bridges to Rome at the end. This is the piece that converts the fence-sitters."
            owner="Rhys films · Corey shoots & edits"
            ship="End of week 6"
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
            body="The 4-5 hour VSL. The trust asset others send their friends. Pillars + path + personal + 3 case studies (Luke Miller · Sabine · Gabe). Block-shoot 2-3 days. Edit 14 days. Hosted unlisted on a landing page first — fuelling mid-funnel ads and DM traffic. Public on YouTube end of week 10. The day this ships, the trust ceiling lifts."
            owner="Rhys films · Corey produces"
            ship="Filming end of week 6 · public end of week 10"
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
            body="One video a week. Six types in a rotation. Don&apos;t reinvent. Lock it. Replace 1-2 only if the data demands it."
            owner="Rhys writes · Corey shoots & edits"
            ship="Week 5 start"
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
            body="One framework per episode. 5-15 minutes. The 78 unfinished chapters from the book become 78 episodes. The pipeline writes itself. Audio first (Spotify + Apple). YouTube audio + IG clip per episode."
            owner="Rhys records · Corey cuts"
            ship="Week 5 start"
          />

        </Phase>

        <Divider />

        {/* ═══ SEGMENT 4 · OPERATIONS ═══ */}
        <Phase
          tag="Segment 4"
          window="Week 1-12"
          title="Operations."
          theme="Corey&apos;s evolution from videographer to creative direction. The Monday review installed. The 8 KPIs tracked weekly. By end of segment: Corey runs Monday review from data, the dashboard is live, and the engine runs on the cadence — not on heroic effort."
        >

          <Move
            n="11"
            title="Corey shadowing protocol kicks off."
            body="The path from videographer to creative direction. Week-by-week behaviour. By week 4 he&apos;s leading Monday review."
            owner="Corey learns · Rhys exposes · Sean curates"
            ship="Week 1 start"
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
            body="10 minutes. Every Monday. Corey prepares the answers. Rhys signs off. Drives the week&apos;s decisions."
            owner="Corey runs · Rhys signs off"
            ship="Week 1 start"
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
            body="The 8 numbers tracked weekly. Quarterly review against the 5-year math. The engine runs on the cadence, not on heroic effort."
            owner="Corey tracks · Sean reviews"
            ship="End of week 12"
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
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">Three people. Clear lanes.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">No overlap. If two people own a thing, no-one does.</p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Rhys · talent + IP + final call</p>
                  <Bullets items={[
                    'Show up to Mon/Wed/Fri shoots',
                    'Write hook + problem for each weekly video',
                    'Film Character (1 day) and Rome (2-3 day block-shoot)',
                    'Record 2-3 podcast episodes per week',
                    'Sign off Monday review in 10 minutes',
                    'Capture (4 questions) end of each working day',
                    'Final call on every named asset, framework, hire',
                  ]} />
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                  <p className="font-display font-extrabold text-white text-[16px] mb-4">Corey · capture + operations → creative direction</p>
                  <Bullets items={[
                    'Run the Mon/Wed/Fri shoots (14 shorts/wk by week 3)',
                    'Edit short-form to ship 2/day cadence',
                    'Two-camera minimum on long-form',
                    'Log daily metrics, run Monday review',
                    'Build pattern recognition (frameworks, stories)',
                    'By week 3: suggest content angles. By week 4: drive direction.',
                  ]} />
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                  <p className="font-display font-extrabold text-blue-300 text-[16px] mb-4">Sean · strategy + frameworks + accountability</p>
                  <Bullets items={[
                    'Build + deliver the content operating system',
                    'Write the 4 lead magnet headlines + landing pages',
                    'Facilitate the 10 character lessons',
                    'Lock the 6 pillar video outlines and 6-week cycle',
                    'Name the signature mechanisms (MACHINE, leaky bucket, etc.)',
                    'Fortnightly strategy + accountability sessions',
                    'Voice note + email support between sessions',
                  ]} />
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
              <Eyebrow>Operating rhythm</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">What every week looks like.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">Shoot Mon / Wed / Fri. Edit Tue / Thu. Friday closes the week. Sunday Rhys scans next week.</p>
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
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">Decisions still open.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">Don&apos;t block week 1. Get them off the list by week 4.</p>
              <div className="space-y-3">
                {[
                  { q: 'Custom GPT route', detail: 'Rotate weekly (1-2 new) OR pick 4-8 workhorses and lock. Recommend the workhorse path.' },
                  { q: 'Bottleneck Buster · rename?', detail: '"Diagnostic" + "Bottleneck" are both words most don\'t know. Test a softer name.' },
                  { q: 'Linktree replacement', detail: 'One link form = friction. Decide: single CTA-led landing page that branches.' },
                  { q: 'Reese Livingstone vs Undeniable channel', detail: 'Currently posting on both. Pick a primary, support the other. Recommend Reese Livingstone as primary.' },
                  { q: 'Ad boost on shorts', detail: 'Currently not boosted. Test on top 3 performers per month with a fixed $50 boost.' },
                  { q: 'Re-cut workshop VSL', detail: '83% completion is great. Sub-2% page conversion is not. Add scrubber + pause + segment audiences upstream.' },
                ].map((d, i) => (
                  <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                    <p className="font-display text-[15px] font-extrabold text-amber-300 mb-1">{d.q}</p>
                    <p className="text-zinc-300 text-[13px] leading-relaxed">{d.detail}</p>
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
              <Eyebrow>The working tools</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">Open these on shoot day.</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">Source-of-truth working pages, not reference docs. Live tools the team uses.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="/undeniablenextsteps/shoot-card" className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-[18px] font-extrabold text-white">Next Shoot</h3>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">4 buckets · frameworks · 22 shoot-ready pieces · hook bank per bucket.</p>
                </a>
                <a href="/undeniablenextsteps/hooks" className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-[18px] font-extrabold text-white">Hook Bank</h3>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">~90 hooks organised by mechanic.</p>
                </a>
                <a href="/undeniablenextsteps/ad-gold" className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-[18px] font-extrabold text-white">Ad Gold</h3>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">Verbatim money lines, stories, frames.</p>
                </a>
                <a href="/undeniablenextsteps/content" className="group block rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-[18px] font-extrabold text-white">Content System</h3>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">Pillars · formats · environments · hooks · cadence · data log.</p>
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
