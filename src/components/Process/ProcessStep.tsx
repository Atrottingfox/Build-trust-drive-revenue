import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

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
        className="magnetic-glow bg-gray-800/40 p-8 rounded-xl ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all h-full backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block text-blue-500 text-sm font-semibold">
            step {number}
          </span>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>
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
          {/* Desktop arrow */}
          <div className="hidden lg:block absolute top-1/2 -right-[100px] transform -translate-y-1/2 w-[100px] h-[2px]">
            <motion.svg 
              width="100" 
              height="40" 
              viewBox="0 0 100 40" 
              className="absolute top-1/2 -translate-y-1/2"
            >
              <motion.path
                d="M0,20 C30,20 70,20 100,20"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2, duration: 0.8 }}
              />
              <motion.circle
                cx="50"
                cy="20"
                r="3"
                fill="#3B82F6"
                animate={{
                  opacity: [0, 1, 0],
                  cx: [0, 100]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="rgb(59 130 246 / 0.3)" />
                  <stop offset="100%" stopColor="rgb(59 130 246 / 0.1)" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Mobile arrow */}
          <div className="lg:hidden absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 }}
            >
              <ArrowRight className="w-6 h-6 text-blue-500 transform rotate-90" />
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}