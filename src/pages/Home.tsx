import React from 'react';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import Engine from '../components/Engine';
import Process from '../components/Process';
import PricingPlans from '../components/PricingPlans';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      {/* Animated gradient border */}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <Hero />
      <ProofStrip />
      <Engine />
      <Process />
      <PricingPlans />
      <FinalCTA />
      <Footer />
    </div>
  );
}
