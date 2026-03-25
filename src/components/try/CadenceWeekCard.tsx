import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { CadenceWeek } from '../../types/try';
import { CadenceContentItem } from './CadenceContentItem';

const A_COLORS: Record<string, string> = {
  attention: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  alignment: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  authorship: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  achievability: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

interface CadenceWeekCardProps {
  week: CadenceWeek;
  defaultExpanded?: boolean;
}

export function CadenceWeekCard({ week, defaultExpanded = false }: CadenceWeekCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const colorClass = A_COLORS[week.whichA] || 'text-zinc-400 bg-zinc-800 border-zinc-700';

  return (
    <div className={`rounded-xl ring-1 ${week.isFocusWeek ? 'ring-blue-500/30 bg-blue-500/5' : 'ring-white/5 bg-zinc-900/50'}`}>
      <button
        className="w-full flex items-center justify-between p-5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 font-medium">Week {week.weekNumber}</span>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colorClass}`}>
            {week.label}
          </span>
          {week.isFocusWeek && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 font-medium">
              Focus Week
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">{week.pieces.length} pieces</span>
          <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-xs text-zinc-500 mb-3">{week.description}</p>
              <div className="space-y-2">
                {week.pieces.map((piece, idx) => (
                  <CadenceContentItem key={idx} piece={piece} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
