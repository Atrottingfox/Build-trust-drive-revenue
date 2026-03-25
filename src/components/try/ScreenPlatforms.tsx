import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Platform } from '../../types/try';

const PLATFORMS: { id: Platform; label: string; icon: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
];

interface ScreenPlatformsProps {
  onComplete: (platforms: Platform[]) => void;
}

export function ScreenPlatforms({ onComplete }: ScreenPlatformsProps) {
  const [selected, setSelected] = useState<Platform[]>([]);

  const toggle = (id: Platform) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">Where do you post?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Select all that apply.</p>

      <div className="grid grid-cols-2 gap-3">
        {PLATFORMS.map(({ id, label, icon }) => (
          <motion.button
            key={id}
            className={`p-5 rounded-xl text-center transition-all ring-1 ${
              selected.includes(id)
                ? 'bg-blue-600/20 ring-blue-500/50 text-white'
                : 'bg-zinc-800/60 ring-white/10 text-zinc-400 hover:bg-zinc-800 hover:ring-blue-500/30'
            }`}
            onClick={() => toggle(id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl block mb-2">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full flex items-center justify-center px-8 py-4 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
          onClick={() => onComplete(selected)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      )}
    </motion.div>
  );
}
