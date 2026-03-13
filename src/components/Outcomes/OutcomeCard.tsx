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
      className="magnetic-glow p-8 bg-gray-800/40 rounded-xl ring-1 ring-white/10 group relative overflow-hidden transform-gpu"
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
        <Icon className="w-12 h-12 text-blue-500 group-hover:text-blue-400 transition-colors" />
      </motion.div>
      
      <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-lg">
        {description}
      </p>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            left: `${20 + (i * 30)}%`,
            top: '80%',
          }}
        />
      ))}

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