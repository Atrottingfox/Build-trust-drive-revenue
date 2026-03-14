import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function BetaToolCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="glow-card p-10 md:p-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] opacity-[0.05]"
            style={{ background: 'radial-gradient(ellipse, #ffffff, transparent 70%)' }}
          />

          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white mb-4">
              Try our content operating system
              <br className="hidden sm:block" />
              before you start.
            </h2>
            <p className="text-zinc-400 mb-10">
              Turn ideas into value driven content in under 60 seconds.
            </p>
            <a
              href="https://www.contentengine.live"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Try it now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
