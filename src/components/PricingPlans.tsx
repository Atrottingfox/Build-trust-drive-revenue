import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { pricingPlans } from '../config/pricingPlans';
import { ArrowRight, Lock } from 'lucide-react';
import type { PricingPlan } from '../types/pricing';

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <div
      className="sticky"
      style={{ top: `${120 + index * 40}px` }}
    >
      <div
        className={`rounded-2xl ${
          plan.featured
            ? 'bg-white text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.08)]'
            : plan.disabled
              ? 'bg-[#111113] border border-zinc-800/30 rounded-2xl'
              : 'glow-card'
        }`}
      >
        <div className="p-8 md:p-10">
          <h3 className={`font-display text-2xl font-extrabold mb-2 ${plan.featured ? 'text-black' : plan.disabled ? 'text-zinc-600' : 'text-white'}`}>{plan.name}</h3>
          <p className={`mb-8 text-sm ${plan.featured ? 'text-zinc-600' : plan.disabled ? 'text-zinc-700' : 'text-zinc-400'}`}>{plan.description}</p>

          <div className="mb-6">
            <p className={`text-[11px] uppercase tracking-widest font-semibold mb-3 ${plan.featured ? 'text-zinc-500' : plan.disabled ? 'text-zinc-700' : 'text-zinc-600'}`}>
              For founders with:
            </p>
            <ul className="space-y-2.5">
              {plan.requirements.map((req, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${plan.featured ? 'text-zinc-700' : plan.disabled ? 'text-zinc-700' : 'text-zinc-300'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${plan.featured ? 'bg-black' : plan.disabled ? 'bg-zinc-700' : 'bg-zinc-500'}`} />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 space-y-2.5">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg className={`w-4 h-4 shrink-0 ${plan.featured ? 'text-black' : plan.disabled ? 'text-zinc-700' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className={`text-sm ${plan.featured ? 'text-zinc-700' : plan.disabled ? 'text-zinc-700' : 'text-zinc-300'}`}>{feature}</span>
              </div>
            ))}
          </div>

          {plan.disabled ? (
            <div className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm ${
              plan.featured ? 'bg-zinc-200 text-zinc-500' : 'bg-elevated text-zinc-600'
            }`}>
              <Lock className="w-4 h-4" />
              {plan.cta}
            </div>
          ) : (
            <a
              href={plan.typeformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-shine flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all ${
                plan.featured
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'border border-zinc-700 text-white hover:border-zinc-500 hover:bg-elevated'
              }`}
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="pricing" className="relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start pt-32 pb-16 lg:pb-32">
            <motion.div
              className="accent-line mb-8"
              initial={{ width: 0 }}
              animate={inView ? { width: 40 } : {}}
            />
            <motion.p
              className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Get started
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-6 max-w-xl leading-[1.05]"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              Choose your
              <br />
              <span className="text-zinc-500">path.</span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              Select the tier that matches where you are and where you want to go.
            </motion.p>
          </div>

          {/* Right — stacking cards */}
          <div className="pt-8 lg:pt-32 pb-32 space-y-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
