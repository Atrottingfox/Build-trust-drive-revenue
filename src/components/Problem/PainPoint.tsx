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
      <div className="magnetic-glow bg-gray-800/40 p-6 rounded-xl relative overflow-hidden group">
        <div className="flex items-start gap-4 relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2
            }}
          >
            <AlertCircle className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
          </motion.div>
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