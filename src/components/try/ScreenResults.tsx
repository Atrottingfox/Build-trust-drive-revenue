import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Calendar } from 'lucide-react';
import type { GeneratedCadence } from '../../types/try';
import { getArchetype } from '../../lib/tryArchetypes';
import { CadenceWeekCard } from './CadenceWeekCard';

const PROBLEM_LABELS: Record<string, string> = {
  clarity: 'Clarity of Offer',
  visibility: 'Visibility',
  authority: 'Authority',
  qualification: 'Qualification',
};

interface ScreenResultsProps {
  cadence: GeneratedCadence;
}

export function ScreenResults({ cadence }: ScreenResultsProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const archetype = getArchetype(cadence.archetype);

  // Load Calendly embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs text-blue-400 font-medium">{archetype.title}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">
          Your 4 Week Content Engine
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          {cadence.totalPieces} content pieces across 4 weeks. Weighted toward your{' '}
          <span className="text-white font-medium">{PROBLEM_LABELS[cadence.problemArea]}</span>{' '}
          gap. Built for how you naturally create.
        </p>
      </div>

      {/* Cadence Weeks */}
      <div className="space-y-3 mb-12">
        {cadence.weeks.map((week) => (
          <CadenceWeekCard
            key={week.weekNumber}
            week={week}
            defaultExpanded={week.isFocusWeek}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="border-t border-zinc-800 pt-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 mb-3">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs text-zinc-400 font-medium">Next Step</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Want this built and personalised for you in 30 days?
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            This is a starting point. Book a call and we'll turn this into a system
            that runs without you.
          </p>
        </div>

        {/* Calendly Embed */}
        <div
          ref={calendlyRef}
          className="calendly-inline-widget rounded-xl overflow-hidden"
          data-url="https://calendly.com/seanfox"
          style={{ minWidth: '320px', height: '630px' }}
        />
      </div>
    </motion.div>
  );
}
