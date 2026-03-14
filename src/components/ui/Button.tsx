import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      className={`
        magnetic-glow relative px-6 py-3 rounded-xl font-semibold transition-all duration-200
        ${variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-glow-md'
          : 'bg-transparent border border-white/[0.12] text-white hover:border-white/25 hover:bg-white/[0.03]'}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
