import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface PainPointProps {
  point: string;
  index: number;
}

export function PainPoint({ point, index }: PainPointProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Create smooth fade in/out based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1], // Adjust these values to control when the fade starts/ends
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -50]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      className="problem-card"
      style={{ opacity, y }}
      transition={{ duration: 0.5 }}
    >
      <div className="magnetic-glow bg-surface border border-white/[0.06] p-6 rounded-2xl relative overflow-hidden group hover:border-white/[0.12] hover:shadow-glow-sm transition-all duration-300">
        <div className="flex items-start gap-4 relative z-10">
          <AlertCircle className="w-5 h-5 text-blue-500/60 shrink-0 mt-0.5" />
          <p className="text-lg text-gray-200 group-hover:text-white transition-colors">{point}</p>
        </div>

        {/* Gradient hover effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}