import React from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FinalCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          className="accent-line mx-auto mb-10"
          initial={{ width: 0 }}
          animate={inView ? { width: 40 } : {}}
        />

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-[1.1]"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Try our content operating system
          <br />
          before you start.
        </motion.h2>

        <motion.p
          className="text-zinc-400 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
        >
          Turn ideas into value driven content in under 60 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          <a
            href="https://www.contentengine.live"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
          >
            Try it now
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        >
          <div className="w-12 h-px bg-zinc-800" />
          <span className="text-zinc-700 text-xs uppercase tracking-widest">or</span>
          <div className="w-12 h-px bg-zinc-800" />
        </motion.div>

        {/* Virtual coffee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://calendar.app.google/BiQRa1PYXCyDQVov5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-zinc-500 hover:text-white transition-colors group"
          >
            <Coffee className="w-4 h-4" />
            <span className="text-sm font-medium">Book a virtual coffee</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
