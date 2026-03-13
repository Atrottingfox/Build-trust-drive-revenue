import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from './ui/Container';
import { pricingPlans } from '../config/pricingPlans';
import { Sparkles } from 'lucide-react';
import type { PricingPlan } from '../types/pricing';

function PricingCard({ plan, index, inView }: { plan: PricingPlan; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, plan.featured ? 1.05 : 1, 0.95]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale }}
      className={`relative ${
        plan.featured ? 'featured-card z-10 bg-gradient-to-b from-blue-900/20 to-gray-900/40' : 'bg-gray-800/40'
      } rounded-xl p-8 ${
        plan.featured ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10' : 'ring-1 ring-white/10'
      } ${plan.disabled ? 'opacity-50 cursor-not-allowed' : ''} transform-gpu group`}
    >
      {plan.featured && (
        <motion.div 
          className="absolute -top-2 -right-2 z-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Sparkles className="w-6 h-6 text-blue-400" />
        </motion.div>
      )}

      <motion.div
        className="relative z-[1]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
        <p className="text-gray-300 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">For founders with:</p>
          <ul className="space-y-2">
            {plan.requirements.map((req, i) => (
              <li key={i} className="text-gray-300 flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          {plan.features.map((feature, i) => (
            <p key={i} className="text-gray-300 mb-2">{feature}</p>
          ))}
        </div>

        {plan.disabled ? (
          <div className="w-full py-3 px-4 rounded-lg font-semibold text-center bg-gray-700 text-gray-400 cursor-not-allowed">
            {plan.cta}
          </div>
        ) : (
          <motion.a
            href={plan.typeformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`magnetic-glow block w-full py-3 px-4 rounded-lg font-semibold text-center ${
              plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'
            } transition-colors relative overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {plan.cta}
            {plan.featured && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-orange-500/20 to-blue-500/0"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.a>
        )}
      </motion.div>

      {/* Add responsive glow effect for featured card */}
      {plan.featured && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `
              radial-gradient(
                600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(59, 130, 246, 0.15),
                transparent 40%
              )
            `
          }}
        />
      )}
    </motion.div>
  );
}

export default function PricingPlans() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} id="pricing" className="py-20 bg-gray-950 section-transition">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Choose your path to growth</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              plan={plan}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}