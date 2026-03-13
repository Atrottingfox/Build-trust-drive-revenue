import React from 'react';
import { Container } from '../ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PainPoint } from './PainPoint';
import { GradientText } from '../ui/GradientText';
import { painPoints } from '../../config/painPoints';

export default function Problem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const finalTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="pt-8 pb-24 bg-gray-950 relative overflow-hidden">
      <Container>
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl font-bold text-white mb-16 text-center leading-tight"
            variants={titleVariants}
          >
            Drowning in content. Starving for <GradientText>leads</GradientText>.
          </motion.h2>

          <div className="space-y-4">
            {painPoints.map((point, index) => (
              <PainPoint key={index} point={point} index={index} />
            ))}
          </div>

          <motion.div
            className="mt-16 space-y-6 text-center"
            variants={finalTextVariants}
          >
            <p className="text-xl text-gray-200 font-medium">
              You don't need more fuel.<br />
              You need a better engine.
            </p>
            
            <div className="space-y-4 text-xl text-gray-300">
              <p>
                Your sales team? Fuelled by the authority your content creates.
                <br />
                Your pipeline? Fed by the demand your content generates.
                <br />
                Your reputation? Built or broken by how you show up online.
              </p>
              
              <p>
                In the modern business landscape, content isn't marketing - it's infrastructure.
              </p>
            </div>

            <p className="text-2xl text-gray-300 font-medium">
              It isn't enough just to show up anymore. The game you're playing is about category ownership.
            </p>
          </motion.div>
        </motion.div>
      </Container>

      {/* Enhanced background animation */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </section>
  );
}