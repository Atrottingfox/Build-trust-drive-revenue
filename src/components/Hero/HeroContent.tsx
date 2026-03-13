import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const influenceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  // Enhanced mobile animations for expertise and influence
  const expertiseOpacity = useTransform(
    scrollYProgress,
    [0, 0.02], // Faster response to scroll
    [0.3, 0.05] // Start at 0.3 opacity
  );

  const glowIntensity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 0.4], // Extended range for smoother transition
    [0, 1, 1, 0]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!influenceRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = influenceRef.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distance = Math.sqrt(
        Math.pow(clientX - centerX, 2) + 
        Math.pow(clientY - centerY, 2)
      );
      
      const maxDistance = 400;
      const intensity = Math.max(0, 1 - distance / maxDistance);
      
      influenceRef.current.style.setProperty('--glow-intensity', intensity.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl">
      <motion.h1
        className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-white">Build trust</span>
        <br />
        <span className="text-white">Drive revenue</span>
        <br />
        <motion.span
          ref={influenceRef}
          className="inline-flex relative whitespace-nowrap"
        >
          <motion.span
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span
              className="absolute inset-0 blur-lg text-blue-400 hidden md:block"
              style={{
                opacity: glowIntensity,
                background: `radial-gradient(
                  circle at 50% 50%,
                  rgba(59, 130, 246, calc(0.8 * var(--glow-intensity, 0))),
                  transparent 70%
                )`
              }}
            >
              Dominate your niche
            </motion.span>
            <motion.span
              className="relative text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Dominate your niche
            </motion.span>
          </motion.span>
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl text-gray-400 max-w-3xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        We turn founder led content into a predictable, value driven marketing engine for 7-8 figure companies.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.a
          href="https://form.typeform.com/to/S2rogsdT"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-glow inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply now
          <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.a>
        
        <a
          href="#engine"
          className="magnetic-glow inline-flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-white/20 transition-all ring-1 ring-white/20"
        >
          Learn more
        </a>
      </motion.div>
    </div>
  );
}