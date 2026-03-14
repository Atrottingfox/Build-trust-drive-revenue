import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';

const results = [
  { prefix: "+$", end: 5, suffix: "M", decimals: 0, context: "revenue from content", name: "Taki Moore", detail: "6 months" },
  { prefix: "", end: 46, suffix: "k", endB: 90, suffixB: "k", decimals: 0, context: "following", name: "Jay Wright", detail: "10 months" },
  { prefix: "", end: 1.2, suffix: "M+", decimals: 1, context: "organic impressions/mo", name: "Mitch Revs", detail: "3 months" },
];

function CountUp({ end, decimals, duration = 2.8, active }: { end: number; decimals: number; duration?: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>();
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue((1 - Math.pow(1 - p, 3)) * end);
      if (p < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [active, end, duration]);
  return <>{active ? value.toFixed(decimals) : '0'}</>;
}

export default function ProofStrip() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeStudy, setActiveStudy] = useState<number | null>(null);

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
          Client results
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-6 max-w-xl leading-[1.05]"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          The outcomes
          <br />
          <span className="text-zinc-500">tell a story.</span>
        </motion.h2>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          <a
            href="https://drive.google.com/file/d/1KItvUIfOo2Ip6mbTVtLlpNHKo_mN5WY-/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 font-medium hover:text-white transition-colors text-[15px] group"
          >
            Download our authority template
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <motion.div
              key={i}
              className="glow-card p-8 text-center cursor-pointer group"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveStudy(i)}
              whileHover={{ y: -4 }}
            >
              <p className="font-display text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-3">
                {r.prefix}<CountUp end={r.end} decimals={r.decimals} active={inView} />{r.suffix}
                {'endB' in r && r.endB != null && (
                  <><span className="text-zinc-600 mx-2">→</span><CountUp end={r.endB} decimals={r.decimals} active={inView} />{r.suffixB}</>
                )}
              </p>
              <p className="text-zinc-300 font-medium mb-1">{r.context}</p>
              <p className="text-zinc-600 text-sm mb-4">{r.detail} · {r.name}</p>
              <span className="text-zinc-600 text-xs font-medium group-hover:text-zinc-400 transition-colors">
                View results →
              </span>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {activeStudy !== null && (
          <CaseStudyModal
            index={activeStudy}
            onClose={() => setActiveStudy(null)}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
