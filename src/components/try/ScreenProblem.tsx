import { motion } from 'framer-motion';
import type { ProblemArea } from '../../types/try';

const PROBLEMS: { id: ProblemArea; label: string; description: string; aLabel: string }[] = [
  {
    id: 'clarity',
    label: 'Clarity of Offer',
    description: "People scroll past. Your message doesn't stop them.",
    aLabel: 'Attention',
  },
  {
    id: 'visibility',
    label: 'Visibility',
    description: "You're creating but not reaching the right people.",
    aLabel: 'Alignment',
  },
  {
    id: 'authority',
    label: 'Authority',
    description: "Your content looks like everyone else's.",
    aLabel: 'Authorship',
  },
  {
    id: 'qualification',
    label: 'Qualification',
    description: "People watch but never buy. Content doesn't convert.",
    aLabel: 'Achievability',
  },
];

interface ScreenProblemProps {
  onSelect: (problem: ProblemArea) => void;
}

export function ScreenProblem({ onSelect }: ScreenProblemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">What do you suspect is holding your content back?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Pick the one that resonates most.</p>

      <div className="space-y-3">
        {PROBLEMS.map(({ id, label, description }) => (
          <motion.button
            key={id}
            className="w-full text-left p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
            onClick={() => onSelect(id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-white font-semibold block mb-1">{label}</span>
            <span className="text-sm text-zinc-400">{description}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
