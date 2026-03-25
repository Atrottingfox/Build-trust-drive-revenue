import { motion } from 'framer-motion';
import type { ContentRole } from '../../types/try';

const OPTIONS: { id: ContentRole; label: string; description: string }[] = [
  {
    id: 'primary',
    label: 'Primary',
    description: 'Content is my main lead generation channel.',
  },
  {
    id: 'secondary',
    label: 'Secondary',
    description: 'Content supports my other channels (referrals, sales, partnerships).',
  },
  {
    id: 'supplementary',
    label: 'Supplementary',
    description: "Content is a nice to have right now.",
  },
];

interface ScreenIntentionProps {
  onSelect: (role: ContentRole) => void;
}

export function ScreenIntention({ onSelect }: ScreenIntentionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">What role does content play in your business?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Be honest. There's no wrong answer.</p>

      <div className="space-y-3">
        {OPTIONS.map(({ id, label, description }) => (
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
