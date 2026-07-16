import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const Divider = () => <div className="gradient-line" />;

type Block = { time: string; title: string; detail: string };

const TEARDOWN: Block[] = [
  {
    time: '90 min',
    title: 'Map the current pipeline',
    detail:
      'Ideas, filming, edit, review, publish, measure. For each step, who is involved, what tools, and where it breaks.',
  },
  {
    time: '90 min',
    title: 'Inventory all active work',
    detail:
      'Everything in the production line right now. Sort it into must ship in 30 days, nice to have, and can die. This becomes the do not drop list.',
  },
  {
    time: '60 min',
    title: 'Extract the standards',
    detail:
      'For shorts, longform and pods, Nate talks through what is good and what is bad. Screen recorded as he clicks through real examples. Raw signal now, checklists later.',
  },
  {
    time: '60 min',
    title: 'Risk map and quick wins',
    detail:
      'If Nate walked out tomorrow, what breaks first. Highlight 3 to 5 critical failure points, then pick 1 to 2 fast fixes for the next 7 days.',
  },
];

const LOCK_IT_IN: { who: string; what: string }[] = [
  { who: 'Ben / Doza', what: 'Lock a Teardown Day date with Nate. One deep day, 4 to 6 hours, can split into two blocks.' },
  { who: 'Nate', what: 'Complete the prep list above before the day. He does not have to organise it, just bring it.' },
  { who: 'Sean', what: 'Send the prep list and the Teardown Day agenda, and hold the frame on the three phase outcomes.' },
];

export default function GeronimoNextSteps() {
  return (
    <PasswordGate storageKey="geronimo-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="Next Steps · Geronimo"
          description="How we kick off the transition. The first move is a Teardown Day with Nate to pull the operation apart and map every process."
          path="/geronimonextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="accent-line mb-8" />
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">Geronimo · Transition Sprint</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Next
                <br />
                <span className="text-blue-400">Steps.</span>
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                How we kick this off. The first move is a Teardown Day with Nate, where we pull the operation apart and map every part of every process.
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* 01 · THE SHIFT */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>01 · The shift</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Why the plan changed, in one line.</p>
              <div className="glow-card border-blue-500/20 p-7 md:p-8 max-w-2xl">
                <p className="text-white text-[16px] md:text-[17px] leading-relaxed font-medium">
                  The old plan assumed Nate stayed. Reality changed. The goal now is simple. Media does not dip, Nate's process is captured, and a new owner is running a clear OS by the time he leaves.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* 02 · THE TEARDOWN DAY */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>02 · The first move · Teardown Day</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-5">
                One deep day. Pull everything apart.
              </h2>
              <p className="text-zinc-400 text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-2xl">
                Before we build anything, I sit down with Nate for one deep work day. 4 to 6 hours, and it can split into two blocks. We map every single part of every single process, and get what is in his head onto the table.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TEARDOWN.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                    <p className="font-display text-[13px] font-extrabold text-blue-400 uppercase tracking-widest mb-3">{b.time}</p>
                    <h3 className="font-display text-[17px] font-extrabold text-white mb-2 leading-tight">{b.title}</h3>
                    <p className="text-zinc-400 text-[13px] md:text-[14px] leading-relaxed">{b.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed mt-6 max-w-2xl">
                The output of this day is the raw material for the OS. Process maps, the asset list, standards recordings, and the risk list.
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* 03 · NATE'S PREP */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>03 · Before the day · Nate's prep</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">A simple prep list for Nate. He does not have to organise it. Just bring it.</p>
              <div className="space-y-3">
                {[
                  'List every recurring content type you touch.',
                  'Export a current board or doc of your pipeline.',
                  'Pull 3 examples of great and 3 of bad for each core format.',
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 flex items-start gap-4">
                    <span className="font-display text-[15px] font-extrabold text-blue-400 flex-shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-zinc-200 text-[14px] md:text-[15px] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* 04 · LOCK IT IN */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Eyebrow>04 · To lock it in</Eyebrow>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl">Who does what to turn this from a plan into a start date.</p>
              <div className="space-y-3">
                {LOCK_IT_IN.map((step, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 grid md:grid-cols-[130px_1fr] gap-3">
                    <p className="font-display font-extrabold text-blue-300 text-[13px]">{step.who}</p>
                    <p className="text-zinc-200 text-[14px] leading-relaxed">{step.what}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Reveal>
              <div className="accent-line mx-auto mb-10" />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white mb-6 leading-[1.15]">
                Book the day. Start the teardown.
              </h2>
              <p className="text-zinc-400 text-[14px] md:text-[15px] mb-10 leading-relaxed max-w-xl mx-auto">
                Pick a time and we lock the Teardown Day with Nate.
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
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
