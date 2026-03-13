import React from 'react';
import { Container } from '../ui/Container';
import { ProcessStep } from './ProcessStep';
import { GradientText } from '../ui/GradientText';
import { motion } from 'framer-motion';

export default function Process() {
  return (
    <section className="relative py-12 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            From <GradientText>successful</GradientText> to <GradientText>significant</GradientText>
          </h2>
          <p className="text-xl text-gray-400">How we transform your brand</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-24 lg:gap-8 max-w-6xl mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -translate-y-1/2 hidden lg:block" />
          
          <ProcessStep
            number="1"
            title="Align your vision"
            description="We get clear on your mission, business model, and revenue targets so the content strategy serves the company, not the algorithm."
            delay={0.2}
            variant="left"
          />
          <ProcessStep
            number="2"
            title="Amplify your voice"
            description="We design your Authority Engine: pillars, formats, and a publishing rhythm you can actually maintain."
            delay={0.4}
            variant="center"
          />
          <ProcessStep
            number="3"
            title="Maximise your impact"
            description="We install the system, track the numbers, and tune for measurable revenue, not just reach."
            delay={0.6}
            variant="right"
            showArrow={false}
          />
        </div>
      </Container>
    </section>
  );
}