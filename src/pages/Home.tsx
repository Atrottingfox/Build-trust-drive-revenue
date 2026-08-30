import React from 'react';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import Engine from '../components/Engine';
import Process from '../components/Process';
import PricingPlans from '../components/PricingPlans';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Own Your Category. The Content Authority Engine for 7 & 8 figure founders"
        description="Sean Fox builds Authority Engines. A 90 day content system that turns founder expertise into a media operating system. Without you becoming a full time creator."
        path="/"
      />
      {/* Animated gradient border */}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <Hero />
      <ProofStrip />
      <Engine />
      <Process />
      <PricingPlans />
      <FinalCTA />
      <Footer showApply />
    </div>
  );
}
