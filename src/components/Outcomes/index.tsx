import React from 'react';
import { Users, BarChart2, Globe, TrendingUp } from 'lucide-react';
import { Container } from '../ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { OutcomeCard } from './OutcomeCard';
import { GradientText } from '../ui/GradientText';

const outcomes = [
  {
    icon: Users,
    title: "Build trust at scale",
    description: "Be the obvious, default choice in your category."
  },
  {
    icon: BarChart2,
    title: "Create effortlessly",
    description: "A simple, repeatable system built around how you think, not how agencies operate."
  },
  {
    icon: Globe,
    title: "Dominate your niche",
    description: "Reach your ideal buyers on demand with content designed to drive action."
  },
  {
    icon: TrendingUp,
    title: "Turn attention into revenue",
    description: "Every piece of content connected to your pipeline, not just your ego."
  }
];

export default function Outcomes() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={titleVariants}
          >
            <span className="text-white">Imagine</span> if you{' '}
            <GradientText>could</GradientText>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((outcome, index) => (
              <OutcomeCard 
                key={index}
                {...outcome}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Enhanced background animation */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </section>
  );
}