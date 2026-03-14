import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface OutcomeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

export function OutcomeCard({ icon: Icon, title, description, index }: OutcomeCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Create smooth fade in/out based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -50]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div 
      ref={cardRef}
      className="magnetic-glow p-8 bg-surface rounded-2xl border border-white/[0.06] group relative overflow-hidden transform-gpu hover:border-white/[0.12] hover:shadow-glow-sm transition-all duration-300"
      style={{ opacity, y, scale }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: index * 0.15 + 0.3,
          type: "spring",
          stiffness: 200
        }}
        className="mb-4"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-500/[0.08] flex items-center justify-center group-hover:shadow-glow-md transition-all duration-300">
          <Icon className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors duration-200" />
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-lg">
        {description}
      </p>

      {/* Gradient hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}