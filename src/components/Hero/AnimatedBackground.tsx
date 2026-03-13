import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile ? (
        // Enhanced mobile background
        <>
          {/* Primary animated gradient */}
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              background: [
                'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 20%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 20%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 20%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Subtle floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
            />
          ))}

          {/* Premium glow effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)'
            }}
          />
        </>
      ) : (
        // Keep desktop version unchanged
        <>
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)',
                'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)',
                'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.05) 30%, transparent 70%)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 3
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
                backgroundSize: `${20 + i * 10}px ${20 + i * 10}px`,
              }}
            />
          ))}

          <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-gray-950" />
        </>
      )}
    </>
  );
}