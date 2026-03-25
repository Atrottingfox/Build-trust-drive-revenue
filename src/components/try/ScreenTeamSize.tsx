import { motion } from 'framer-motion';
import type { TeamSize } from '../../types/try';

const OPTIONS: { id: TeamSize; label: string }[] = [
  { id: '1', label: 'Just me' },
  { id: '2-5', label: '2-5 people' },
  { id: '6-15', label: '6-15 people' },
  { id: '15-30', label: '15-30 people' },
  { id: '30+', label: '30+ people' },
];

interface ScreenTeamSizeProps {
  onSelect: (size: TeamSize) => void;
}

export function ScreenTeamSize({ onSelect }: ScreenTeamSizeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">How big is your team?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Total team size, not just content.</p>

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
