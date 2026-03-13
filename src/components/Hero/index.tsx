import React from 'react';
import { Container } from '../ui/Container';
import { AnimatedBackground } from './AnimatedBackground';
import { HeroContent } from './HeroContent';
import { HeroTags } from './HeroTags';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gray-950 overflow-hidden">
      <AnimatedBackground />
      <Container className="relative z-10 py-24 sm:py-32">
        <HeroTags />
        <HeroContent />
      </Container>
    </section>
  );
}