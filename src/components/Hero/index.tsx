import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  // Map scroll position to background-position percentage
  // Scrolling down moves shine right-to-left, scrolling up reverses
  const bgPosition = useTransform(scrollY, [0, 800], ['200%', '-200%']);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-base">
      {/* Background orb — neutral */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary warm orb — bottom left */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #ffffff, transparent 60%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-36 pb-28">
        <div className="max-w-4xl">
          {/* Accent line */}
          <motion.div
            className="accent-line mb-10"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-[6rem] font-extrabold tracking-[-0.04em] leading-[0.9] text-white mb-8"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Build trust.
            <br />
            Drive revenue.
            <br />
            <motion.span
              className="inline-block"
              style={{
                background: 'linear-gradient(110deg, #71717a 0%, #71717a 35%, #e4e4e7 50%, #71717a 65%, #71717a 100%)',
                backgroundSize: '200% auto',
                backgroundPositionX: bgPosition,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >Dominate your niche.</motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-zinc-400 max-w-xl mb-14 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            We turn founder led content into a predictable, value driven marketing engine for 7 and 8 figure companies.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://form.typeform.com/to/S2rogsdT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#engine"
              className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all"
            >
              Learn more
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
