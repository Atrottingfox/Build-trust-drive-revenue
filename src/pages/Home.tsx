import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Outcomes from '../components/Outcomes';
import BetaToolCTA from '../components/BetaToolCTA';
import Engine from '../components/Engine';
import Process from '../components/Process';
import PricingPlans from '../components/PricingPlans';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Hero />
      <Problem />
      <div className="py-4" />
      <Outcomes />
      <BetaToolCTA />
      <div className="py-4" />
      <Process />
      <div className="py-4" />
      <Engine />
      <div className="py-4" />
      <PricingPlans />
      <FinalCTA />
    </div>
  );
}