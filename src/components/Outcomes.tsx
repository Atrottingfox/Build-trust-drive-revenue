import React from 'react';
import { Users, BarChart2, Globe, TrendingUp } from 'lucide-react';
import { Container } from './ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GradientText } from './ui/GradientText';

export default function Outcomes() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const outcomes = [
    {
      icon: Users,
      title: "Build trust at scale",
      description: "Be the go to expert in the eyes of your audience"
    },
    {
      icon: BarChart2,
      title: "Effortlessly create content",
      description: "A bulletproof system built strategically to fit your needs"
    },
    {
      icon: Globe,
      title: "Dominate your niche",
      description: "Reach your ideal audience at the click of a button"
    },
    {
      icon: TrendingUp,
      title: "Transform attention into revenue",
      description: "Every piece of content works toward your bottom line"
    }
  ];

  return (
    <section ref={ref} className="py-8 bg-gray-950">
      <Container>
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <GradientText>Imagine</GradientText> if you could
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <motion.div 
                key={index}
                className="p-6 bg-gray-800/40 rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="w-12 h-12 text-blue-500 mb-4 group-hover:text-blue-400 transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-white">{outcome.title}</h3>
                <p className="text-gray-400">{outcome.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}