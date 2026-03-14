import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const outcomes = [
  "A calibrated content identity you can use forever",
  "A predictable organic lead generation system",
  "A multi platform content engine tied to one core outcome",
  "A bank of angles, content styles and hooks unique to you",
  "A complete Operator Playbook so any team member can run the engine",
];

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Centered heading */}
        <div className="text-center mb-16">
          <motion.div
            className="accent-line mb-8 mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 40 } : {}}
          />
          <motion.p
            className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            What you walk away with
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Clarity, speed, and<br />
            <span className="text-zinc-500">zero guesswork.</span>
          </motion.h2>
          <motion.p
            className="text-zinc-400 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Not a content agency. Not a scripting service. Not a mastermind.
            <br className="hidden sm:block" />
            Personalised direction, structure, and calibration for 7 and 8 figure founders.
          </motion.p>
        </div>

        {/* Outcomes as horizontal strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-zinc-800/60 bg-[#111113] p-5 flex items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-zinc-300 text-sm leading-relaxed">{outcome}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
