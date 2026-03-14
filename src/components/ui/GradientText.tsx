import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <motion.span 
      className={`bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent ${className}`}
      whileInView={{
        backgroundPosition: ['200% 0', '0% 0'],
        opacity: [0.5, 1],
      }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.span>
  );
}