import { motion } from 'framer-motion';
import { Briefcase, Code, Users, Building2, HelpCircle } from 'lucide-react';
import type { Industry } from '../../types/try';

const INDUSTRIES: { id: Industry; label: string; icon: typeof Briefcase }[] = [
  { id: 'coaching', label: 'Coaching / Consulting', icon: Users },
  { id: 'agency', label: 'Agency', icon: Briefcase },
  { id: 'software', label: 'Software', icon: Code },
  { id: 'professional_services', label: 'Professional Services', icon: Building2 },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

interface ScreenIndustryProps {
  onSelect: (industry: Industry) => void;
}

export function ScreenIndustry({ onSelect }: ScreenIndustryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">What world do you operate in?</h2>
      <p className="text-zinc-400 mb-6 text-sm">Pick the closest fit.</p>

      <div className="space-y-3">
        {INDUSTRIES.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            className="w-full flex items-center gap-4 p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
            onClick={() => onSelect(id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Icon className="w-5 h-5 text-zinc-400" />
            <span className="font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
