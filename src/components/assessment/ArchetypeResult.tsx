import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Archetype } from '../../types/assessment';
import { GradientText } from '../ui/GradientText';

interface ArchetypeResultProps {
  archetype: Archetype;
}

export function ArchetypeResult({ archetype }: ArchetypeResultProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          🎯 You're a <GradientText>{archetype.title}</GradientText>
        </h2>
        <p className="text-2xl text-blue-400 font-semibold mb-6">"{archetype.subtitle}"</p>
        <p className="text-xl text-gray-300">{archetype.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800/40 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Your Core Strengths</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400">✨</span>
              You build trust through {archetype.trustSignal}
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400">💫</span>
              You create best when you {archetype.creationStyle}
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400">⚡️</span>
              Your influence lands when you {archetype.influenceStyle}
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/40 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Growth Opportunities</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-yellow-400">⚠️</span>
              Current bottleneck: {archetype.bottleneck}
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400">🎯</span>
              Content goal: {archetype.contentGoal}
            </li>
          </ul>
          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg">
            <p className="text-gray-300">{archetype.growthEdge}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Content Strategy Recommendations</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Content Formats</h4>
            <ul className="space-y-2">
              {archetype.contentFormats.map((format, index) => (
                <li key={index} className="text-gray-300">• {format}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Messaging Focus</h4>
            <ul className="space-y-2">
              {archetype.messagingFocus.map((focus, index) => (
                <li key={index} className="text-gray-300">• {focus}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-blue-400 mb-2">Rhythm System</h4>
          <ul className="space-y-2">
            {archetype.rhythmSystem.map((rhythm, index) => (
              <li key={index} className="text-gray-300">• {rhythm}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Team Structure</h4>
            <ul className="space-y-2">
              {archetype.teamSuggestion.map((suggestion, index) => (
                <li key={index} className="text-gray-300">• {suggestion}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Strategic Notes</h4>
            <ul className="space-y-2">
              {archetype.tags.map((tag, index) => (
                <li key={index} className="text-gray-300">• {tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <motion.a
          href="https://form.typeform.com/to/S2rogsdT"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-glow block w-full text-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Your Strategy Call
          <ArrowRight className="ml-2 h-5 w-5 inline-block" />
        </motion.a>

        <div className="text-center">
          <p className="text-gray-300 italic">
            {archetype.closingStatement}
          </p>
        </div>
      </div>
    </div>
  );
}