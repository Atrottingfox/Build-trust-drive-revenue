import React from 'react';
import { Container } from '../ui/Container';
import { EngineFeature } from './EngineFeature';
import { GradientText } from '../ui/GradientText';
import { motion } from 'framer-motion';

export default function Engine() {
  return (
    <section id="engine" className="py-24 bg-gray-950">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The <GradientText>Authority Engine</GradientText>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our flagship framework turns your online presence into a sales flywheel that captures, nurtures, and converts your ideal audience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <EngineFeature
            title="Authenticity driven authority"
            description="We build a system that sounds like you, scales with your team, and compounds trust over time."
            delay={0.2}
          />
          <EngineFeature
            title="Mission aligned growth"
            description="Every play is anchored to your core business goals and the people you want to serve."
            delay={0.4}
          />
          <EngineFeature
            title="Results that resonate"
            description="Deeper connection with your market, shorter sales cycles, and revenue that tracks back to content."
            delay={0.6}
          />
        </div>
      </Container>

      <div className="text-center">
        <motion.a
          href="https://drive.google.com/file/d/1KItvUIfOo2Ip6mbTVtLlpNHKo_mN5WY-/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-glow inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Access my go to authority template here
          
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
      </div>
    </section>
  );
}