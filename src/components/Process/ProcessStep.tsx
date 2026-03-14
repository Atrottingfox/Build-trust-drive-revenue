import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  delay: number;
  showArrow?: boolean;
  variant: 'left' | 'center' | 'right';
}

export function ProcessStep({ number, title, description, delay, showArrow = true, variant }: ProcessStepProps) {
  return (
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="magnetic-glow bg-surface p-8 rounded-2xl border border-white/[0.06] group-hover:border-blue-500/30 hover:shadow-glow-md transition-all duration-300 h-full backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex w-8 h-8 rounded-lg bg-blue-500/[0.08] items-center justify-center text-blue-400 text-sm font-semibold">
            {number}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Magnetic glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {showArrow && (
        <>
          {/* Desktop chevron */}
          <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-full items-center justify-center w-8">
            <ArrowRight className="w-4 h-4 text-blue-500/40" />
          </div>

          {/* Mobile arrow */}
          <div className="lg:hidden flex justify-center py-4">
            <ArrowRight className="w-4 h-4 text-blue-500/40 rotate-90" />
          </div>
        </>
      )}
    </motion.div>
  );
}