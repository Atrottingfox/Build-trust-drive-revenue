import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contrasts = [
  {
    old: "Posting content with no strategy behind it",
    new: "Every piece connected to a revenue outcome",
  },
  {
    old: "Hiring agencies that don't understand your voice",
    new: "A system built around who you are",
  },
  {
    old: "Getting attention but never converting it",
    new: "A pipeline that fills itself through trust",
  },
  {
    old: "Content that looks good but drives zero ROI",
    new: "Content that compounds authority and shortens sales cycles",
  },
  {
    old: "Creating feels heavy, inconsistent, and reactive",
    new: "A machine that runs whether you show up or not",
  },
];

function ContrastRow({ old, new: newWay, index }: { old: string; new: string; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [flipped, setFlipped] = useState(false);

  React.useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setFlipped(true), 400 + index * 150);
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[100px_1fr] gap-8 py-8 border-t border-zinc-800/60 group"
    >
      <span className={`font-display text-5xl font-extrabold transition-colors duration-700 ${
        flipped ? 'text-blue-500/30' : 'text-zinc-800'
      }`}>
        0{index + 1}
      </span>

      <div className="relative min-h-[28px]">
        <motion.p
          className="text-lg text-zinc-400 leading-relaxed"
          animate={{
            opacity: flipped ? 0 : 1,
            y: flipped ? -8 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          {old}
        </motion.p>

        <motion.p
          className="absolute inset-0 text-lg text-white font-medium leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: flipped ? 1 : 0,
            y: flipped ? 0 : 12,
          }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {newWay}
        </motion.p>
      </div>
    </div>
  );
}

export default function Problem() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="accent-line mb-8"
          initial={{ width: 0 }}
          animate={inView ? { width: 40 } : {}}
        />
        <motion.p
          className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          The shift
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-20 max-w-2xl leading-[1.05]"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Old way vs
          <br />
          <span className="text-zinc-500">the engine.</span>
        </motion.h2>

        <div className="space-y-0">
          {contrasts.map((c, i) => (
            <ContrastRow key={i} old={c.old} new={c.new} index={i} />
          ))}
        </div>

        <motion.p
          className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white text-center mt-28 max-w-2xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          You don't need more content.
          <br />
          <span className="text-shimmer">You need a better engine.</span>
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
