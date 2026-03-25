import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ContentPiece } from '../../types/try';

const PLATFORM_ICONS: Record<string, string> = {
  instagram: '📸',
  youtube: '▶️',
  linkedin: '💼',
  tiktok: '🎵',
};

const CONTENT_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  story: { bg: 'bg-violet-500/10', text: 'text-violet-400' },
  'hot-take': { bg: 'bg-red-500/10', text: 'text-red-400' },
  breakdown: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  demonstration: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  teach: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  distill: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  apply: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
};

const TYPE_LABELS: Record<string, string> = {
  story: 'Story',
  'hot-take': 'Hot Take',
  breakdown: 'Breakdown',
  demonstration: 'Demonstration',
  teach: 'Teach',
  distill: 'Distill',
  apply: 'Apply',
};

interface CadenceContentItemProps {
  piece: ContentPiece;
}

export function CadenceContentItem({ piece }: CadenceContentItemProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = CONTENT_TYPE_COLORS[piece.contentType] || { bg: 'bg-zinc-800', text: 'text-zinc-400' };

  return (
    <div className="bg-zinc-800/40 rounded-lg p-4 ring-1 ring-white/5">
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0 mt-0.5">{PLATFORM_ICONS[piece.platform] || '📄'}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-medium`}>
              {TYPE_LABELS[piece.contentType] || piece.contentType}
            </span>
            <span className="text-xs text-zinc-600">{piece.dayOfWeek}</span>
          </div>

          <p className="text-white text-sm font-medium mb-0.5">{piece.topic}</p>
          <p className="text-zinc-500 text-xs">{piece.angle}</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wide">
                Structure: {piece.variationName}
              </p>
              <ol className="space-y-1.5">
                {piece.outline.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                    <span className="text-blue-500 font-medium shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
