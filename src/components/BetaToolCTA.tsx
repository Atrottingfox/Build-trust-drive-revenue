import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function BetaToolCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-gray-950 relative overflow-hidden">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
            Turn your ideas into value driven content in under 60 seconds
          </h2>
          <motion.a
            href="https://www.contentengine.live"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Access here
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}