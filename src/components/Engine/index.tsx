import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const phases = [
  {
    number: "01",
    title: "Strategy",
    subtitle: "The Brand Bible",
    description: "We uncover your voice, your positioning, and your story. Then we build the blueprint your team executes from.",
    bullets: ["Brand identity on camera", "Messaging + positioning", "Channel strategy", "Authority Engine Blueprint"],
  },
  {
    number: "02",
    title: "Structure",
    subtitle: "The Posting Program",
    description: "We install the growth engine. You get a content system tied directly to your offers, your launches, and your revenue targets.",
    bullets: ["Weekly content rhythm", "Hooks, angles, CTAs", "Creative direction", "Calibration calls"],
  },
  {
    number: "03",
    title: "Systems",
    subtitle: "Scale + Compound",
    description: "Once direction is locked, we scale. Refining a straight line system to push volume through every channel.",
    bullets: ["Performance tuning", "Team enablement", "Multi platform scale", "KPI tracking + reporting"],
  },
];

function AnimatedCheck({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-zinc-700 group-hover:text-zinc-500 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function BrandBibleVisual({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-[130px] rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-4"
        initial={{ rotate: 5, x: 14, opacity: 0 }}
        animate={inView ? { rotate: 5, x: 14, opacity: 0.5 } : { rotate: 5, x: 14, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="w-10 h-1.5 bg-white/10 rounded-full mb-3" />
        <div className="space-y-1.5">
          <div className="w-full h-0.5 bg-zinc-800 rounded-full" />
          <div className="w-3/4 h-0.5 bg-zinc-800 rounded-full" />
          <div className="w-5/6 h-0.5 bg-zinc-800 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="relative w-[140px] rounded-xl border border-zinc-800/80 bg-[#111113] p-4 shadow-2xl"
        initial={{ rotate: -2, y: 10, opacity: 0 }}
        animate={inView ? { rotate: -2, y: 0, opacity: 1 } : { rotate: -2, y: 10, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div className="w-14 h-1.5 bg-white/20 rounded-full mb-1" />
        <div className="w-8 h-1 bg-zinc-700 rounded-full mb-4" />
        <div className="space-y-1.5 mb-4">
          <motion.div
            className="h-0.5 bg-zinc-800 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
          <motion.div
            className="h-0.5 bg-zinc-800 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "80%" } : { width: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          />
          <motion.div
            className="h-0.5 bg-zinc-800 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : { width: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
        </div>
        <div className="flex gap-1.5">
          {[false, false, true].map((accent, j) => (
            <motion.div
              key={j}
              className={`w-5 h-5 rounded ${accent ? 'bg-blue-500/15 border border-blue-500/20' : 'bg-zinc-800/80'}`}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.9 + j * 0.12, type: "spring", stiffness: 200 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ContentGridVisual({ inView }: { inView: boolean }) {
  const cells = [
    'filled', 'accent', 'empty',
    'filled', 'filled', 'accent',
    'empty', 'filled', 'filled',
    'accent', 'filled', 'empty',
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="flex gap-1.5 mb-1.5 px-0.5">
          {["M", "W", "F"].map((d, i) => (
            <motion.span
              key={i}
              className="text-[8px] font-medium text-zinc-600 w-9 text-center"
              initial={{ opacity: 0, y: -4 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              {d}
            </motion.span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {cells.map((type, i) => (
            <motion.div
              key={i}
              className={`w-9 h-11 rounded flex items-end p-1 ${
                type === 'accent'
                  ? 'bg-blue-500/10 border border-blue-500/20'
                  : type === 'filled'
                    ? 'bg-zinc-800/60 border border-zinc-700/30'
                    : 'border border-zinc-800/40 border-dashed'
              }`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: "easeOut" }}
            >
              {type !== 'empty' && (
                <div className="w-full space-y-0.5">
                  <motion.div
                    className={`h-px rounded-full ${type === 'accent' ? 'bg-blue-500/30' : 'bg-zinc-700'}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "75%" } : { width: 0 }}
                    transition={{ delay: 0.55 + i * 0.06, duration: 0.3 }}
                  />
                  <motion.div
                    className={`h-px rounded-full ${type === 'accent' ? 'bg-blue-500/20' : 'bg-zinc-700/60'}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "50%" } : { width: 0 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsVisual({ inView }: { inView: boolean }) {
  const bars = [28, 38, 32, 48, 42, 60, 55, 72, 68, 85];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="flex items-end gap-1 h-[100px] px-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-2.5 rounded-t-sm"
              style={{
                background: i >= 7
                  ? 'linear-gradient(to top, rgba(59,130,246,0.2), rgba(59,130,246,0.4))'
                  : 'rgba(39,39,42,0.8)',
              }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : { height: 0 }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 130 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M5 72 L18 62 L31 68 L44 52 L57 58 L70 40 L83 45 L96 28 L109 32 L122 15"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 0.9, duration: 1.4 }}
          />
        </motion.svg>

        <motion.div
          className="w-full h-px bg-zinc-800/60 mt-1"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}

const visualComponents = [BrandBibleVisual, ContentGridVisual, MetricsVisual];

function PhaseCard({ phase, index, sectionInView }: {
  phase: typeof phases[0];
  index: number;
  sectionInView: boolean;
}) {
  const [cardRef, cardInView] = useInView({ threshold: 0.4 });
  const Visual = visualComponents[index];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.3, duration: 0.8, ease: "easeOut" }}
    >
      <div className={`relative rounded-2xl border border-zinc-800/60 bg-[#111113] overflow-hidden transition-colors duration-500 hover:border-zinc-700/60 grid lg:grid-cols-[1fr_200px] ${!isEven ? 'lg:grid-cols-[200px_1fr]' : ''}`}>
        {/* Card content */}
        <div className={`relative p-8 ${!isEven ? 'lg:order-2' : ''}`}>
          <motion.span
            className="absolute top-4 right-6 font-display text-[80px] font-extrabold leading-none text-white/[0.03] select-none pointer-events-none group-hover:text-blue-500/[0.06] transition-colors duration-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 + index * 0.3, duration: 0.9, ease: "easeOut" }}
          >
            {phase.number}
          </motion.span>

          <div className="relative z-10">
            <motion.h3
              className="font-display text-2xl font-extrabold text-white mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.3 }}
            >
              {phase.title}
            </motion.h3>
            <motion.p
              className="text-sm font-medium text-zinc-500 mb-4"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.3 }}
            >
              {phase.subtitle}
            </motion.p>

            <motion.p
              className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-md"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + index * 0.3 }}
            >
              {phase.description}
            </motion.p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {phase.bullets.map((bullet, j) => (
                <motion.div
                  key={j}
                  className="flex items-center gap-3 text-sm text-zinc-500"
                  initial={{ opacity: 0, x: -8 }}
                  animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.3 + j * 0.08 }}
                >
                  <AnimatedCheck delay={0.9 + index * 0.3 + j * 0.1} inView={sectionInView} />
                  {bullet}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual - triggers when card scrolls into view */}
        <div className={`hidden lg:flex items-center justify-center border-zinc-800/40 ${isEven ? 'border-l' : 'border-r lg:order-1'}`}>
          <Visual inView={cardInView} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Engine() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="engine" ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Top heading */}
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
          How it works
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-6 max-w-2xl leading-[1.05]"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          The Authority<br />
          <span className="text-shimmer">Engine.</span>
        </motion.h2>
        <motion.p
          className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          A predictable demand system your team can run without you becoming a full time creator.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-3 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {[
            "No dancing on camera",
            "No 12am scrolling for ideas",
            "No inconsistency across platforms",
          ].map((item, i) => (
            <span key={i} className="text-sm text-zinc-500 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Cards with visuals */}
        <div className="space-y-6">
          {phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} sectionInView={inView} />
          ))}
        </div>

        {/* Result strip */}
        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-zinc-800/60 bg-zinc-900/40">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1, boxShadow: "0 0 8px rgba(59,130,246,0.4)" } : {}}
              transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
            />
            <span className="font-display text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Your Authority Engine. Live and driving leads.
            </span>
          </div>
        </motion.div>

        {/* Apply now */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <a
            href="https://form.typeform.com/to/S2rogsdT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 border border-zinc-700 text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:border-zinc-500 hover:bg-elevated transition-all"
          >
            Apply now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
