import { motion } from 'framer-motion';
import type { PostingFrequency } from '../../types/try';

const OPTIONS: { id: PostingFrequency; label: string }[] = [
  { id: 'not_posting', label: 'Not posting' },
  { id: '1-2x', label: '1-2x per week' },
  { id: '3-4x', label: '3-4x per week' },
  { id: '5+', label: '5+ per week' },
];

interface ScreenFrequencyProps {
  onSelect: (frequency: PostingFrequency) => void;
}

export function ScreenFrequency({ onSelect }: ScreenFrequencyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">How often do you currently post?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Across all platforms combined.</p>

      <div className="space-y-3">
        {OPTIONS.map(({ id, label }) => (
          <motion.button
            key={id}
            className="w-full text-left p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50 font-medium"
            onClick={() => onSelect(id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
