import React from 'react';
import { Container } from './ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GradientText } from './ui/GradientText';
import { painPoints } from '../config/painPoints';

export default function Problem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-12 bg-gray-950">
      <Container>
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6 text-center">
            Drowning in content but starving for <GradientText>leads</GradientText>?
          </h2>

          <div className="space-y-4 mb-8">
            {painPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/40 p-6 rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-lg text-gray-200">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            className="text-xl text-gray-200 font-medium text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            You don't need more fuel - your content engine just needs an upgrade
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}