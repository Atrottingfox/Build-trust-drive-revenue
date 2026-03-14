import React from 'react';
import { motion } from 'framer-motion';

interface EngineFeatureProps {
  title: string;
  description: string;
  delay: number;
}

export function EngineFeature({ title, description, delay }: EngineFeatureProps) {
  return (
    <motion.div 
      className="magnetic-glow bg-surface p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] hover:shadow-glow-sm transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {/* Enhanced gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}