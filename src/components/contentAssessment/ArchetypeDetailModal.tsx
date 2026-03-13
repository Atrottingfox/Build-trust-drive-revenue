import React from 'react';
import { X, Target, Lightbulb, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ContentArchetype } from '../../types/contentAssessment';

interface ArchetypeDetailModalProps {
  archetype: ContentArchetype | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchetypeDetailModal({ archetype, isOpen, onClose }: ArchetypeDetailModalProps) {
  if (!isOpen || !archetype) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{archetype.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{archetype.title}</h2>
              <p className="text-blue-400 font-semibold">{archetype.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <p className="text-lg text-gray-300 leading-relaxed">{archetype.description}</p>
          </div>

          {/* Content Playbook */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-xl ring-1 ring-purple-500/30">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Content Playbook
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-3">Optimal Tone:</h4>
                  <div className="space-y-2">
                    {archetype.contentRecommendations.tone.map((tone, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="text-purple-400">•</span>
                        {tone}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-3">Content Style:</h4>
                  <div className="space-y-2">
                    {archetype.contentRecommendations.style.map((style, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="text-blue-400">•</span>
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-3">High-Impact Formats:</h4>
                  <div className="space-y-2">
                    {archetype.contentRecommendations.formats.map((format, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="text-green-400">•</span>
                        {format}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Strategic Positioning:</h4>
                  <div className="space-y-2">
                    {archetype.contentRecommendations.positioning.map((position, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="text-yellow-400">•</span>
                        {position}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Building & Pitfalls */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-400" />
                Trust Building Style
              </h3>
              <p className="text-gray-300">{archetype.trustBuildingStyle}</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Pitfalls to Avoid
              </h3>
              <ul className="space-y-2">
                {archetype.pitfallsToAvoid.slice(0, 3).map((pitfall, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-yellow-400 mt-1">⚠️</span>
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tactical Strategy */}
          <div className="bg-gray-800/40 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Tactical Strategy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Content Tone:</h4>
                <p className="text-gray-300 text-sm">{archetype.tacticalStrategy.contentTone}</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Workflow Style:</h4>
                <p className="text-gray-300 text-sm">{archetype.tacticalStrategy.workflowStyle}</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Core Beliefs:</h4>
                <ul className="space-y-1">
                  {archetype.tacticalStrategy.coreBeliefs.map((belief, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {belief}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}