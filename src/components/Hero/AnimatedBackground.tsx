import React from 'react';

export function AnimatedBackground() {
  return (
    <>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Light beam from top center */}
      <div className="light-beam" />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-base" />
    </>
  );
}
