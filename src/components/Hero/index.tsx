import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

function HeroMetricsGhost() {
  const bars = [22, 30, 26, 40, 35, 50, 46, 60, 55, 72, 65, 80];

  return (
    <div className="absolute right-4 bottom-32 w-[280px] h-[180px] opacity-[0.15] md:hidden pointer-events-none">
      <div className="relative w-full h-full">
        {/* Bars */}
        <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between gap-[6px] h-[140px] px-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-white/30"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Trend line */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 280 140"
          fill="none"
          preserveAspectRatio="none"
          style={{ top: '10px' }}
        >
          <motion.path
            d="M10 112 L33 98 L56 104 L79 82 L102 90 L125 68 L148 74 L171 52 L194 58 L217 38 L240 44 L263 22"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.0, duration: 1.6 }}
          />
        </motion.svg>

        {/* Base line */}
        <motion.div
          className="absolute bottom-5 left-2 right-2 h-px bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Fade out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base to-transparent" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const bgPosition = useTransform(scrollY, [0, 800], ['200%', '-200%']);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-base">
      {/* Faded metrics ghost — mobile only */}
      <HeroMetricsGhost />

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
            transition={{ duration: 0.7, delay: 0.2 }}
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
            transition={{ delay: 0.4 }}
          >
            We turn founder led content into a predictable, value driven marketing engine for 7 and 8 figure companies.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
