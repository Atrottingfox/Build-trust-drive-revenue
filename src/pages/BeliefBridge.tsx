import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Download, ChevronDown, Target, Shield, User, Clock, Layers, Mail } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

/* ─── Types ─── */

interface ObjectionEntry {
  objection: string;
  belief: string;
  shift: string;
  contentIdea: string;
}

interface BeliefLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  colorBg: string;
  colorBorder: string;
  description: string;
  question: string;
  objectionPlaceholder: string;
  beliefPlaceholder: string;
  shiftPlaceholder: string;
  contentPlaceholder: string;
  entries: ObjectionEntry[];
}

interface UserData {
  businessType: string;
  audience: string;
  offer: string;
  layers: BeliefLayer[];
}

/* ─── Layer Definitions ─── */

function createDefaultLayers(): BeliefLayer[] {
  return [
    {
      id: 'category',
      name: 'Category Belief',
      icon: Layers,
      color: 'text-red-400',
      colorBg: 'bg-red-400/10',
      colorBorder: 'border-red-400/20',
      description: 'Does your audience believe this type of solution works?',
      question: 'What objections do you hear that suggest they don\'t believe your category of solution works?',
      objectionPlaceholder: "e.g. 'Content marketing doesn't work for my industry'",
      beliefPlaceholder: "e.g. They think content is for influencers, not serious businesses",
      shiftPlaceholder: "e.g. That founders at their level have used content to drive $5M+ in revenue",
      contentPlaceholder: "e.g. Case study showing Taki Moore's results from content",
      entries: [
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
      ],
    },
    {
      id: 'method',
      name: 'Method Belief',
      icon: Target,
      color: 'text-amber-400',
      colorBg: 'bg-amber-400/10',
      colorBorder: 'border-amber-400/20',
      description: 'Do they believe your specific approach works?',
      question: 'What objections suggest they don\'t believe YOUR specific approach works?',
      objectionPlaceholder: "e.g. 'I've tried systems before and they never stick'",
      beliefPlaceholder: "e.g. They think all content systems are rigid templates that kill authenticity",
      shiftPlaceholder: "e.g. That a system built around their voice actually amplifies authenticity, not replaces it",
      contentPlaceholder: "e.g. Behind the scenes of how the system adapts to different founder personalities",
      entries: [
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
      ],
    },
    {
      id: 'provider',
      name: 'Provider Belief',
      icon: Shield,
      color: 'text-blue-400',
      colorBg: 'bg-blue-400/10',
      colorBorder: 'border-blue-400/20',
      description: 'Do they trust YOU to deliver the outcome?',
      question: 'What objections suggest they don\'t trust YOU specifically to deliver?',
      objectionPlaceholder: "e.g. 'How do I know you understand my niche?'",
      beliefPlaceholder: "e.g. They think you need direct industry experience to build effective content strategy",
      shiftPlaceholder: "e.g. That pattern recognition across multiple industries produces better strategy than niche tunnel vision",
      contentPlaceholder: "e.g. Breakdown of how the same framework delivered results across 3 different industries",
      entries: [
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
      ],
    },
    {
      id: 'self',
      name: 'Self Belief',
      icon: User,
      color: 'text-indigo-400',
      colorBg: 'bg-indigo-400/10',
      colorBorder: 'border-indigo-400/20',
      description: 'Do they believe THEY can succeed with this?',
      question: 'What objections suggest they don\'t believe THEY can succeed with this?',
      objectionPlaceholder: "e.g. 'I'm not good on camera' or 'I don't have anything original to say'",
      beliefPlaceholder: "e.g. They think content requires a natural on-camera personality they don't have",
      shiftPlaceholder: "e.g. That their expertise IS the content. The system extracts it. They don't need to perform.",
      contentPlaceholder: "e.g. Story of a client who hated video but built a 50k following using voice-first content",
      entries: [
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
      ],
    },
    {
      id: 'timing',
      name: 'Timing Belief',
      icon: Clock,
      color: 'text-emerald-400',
      colorBg: 'bg-emerald-400/10',
      colorBorder: 'border-emerald-400/20',
      description: 'Do they believe NOW is the right time?',
      question: 'What objections suggest they think NOW is not the right time?',
      objectionPlaceholder: "e.g. 'I'll focus on content once my business is more stable'",
      beliefPlaceholder: "e.g. They think content is a luxury you add after the business is running smoothly",
      shiftPlaceholder: "e.g. That content compounds. Every month they wait is 6 months of compounding they lose.",
      contentPlaceholder: "e.g. Comparison showing the cost of waiting 6 months vs starting now with real numbers",
      entries: [
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
        { objection: '', belief: '', shift: '', contentIdea: '' },
      ],
    },
  ];
}

/* ─── Animation Variants ─── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

/* ─── Reusable Sub-components ─── */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  textarea?: boolean;
}) {
  const baseClasses =
    'w-full bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all';

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClasses} min-h-[80px] resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-zinc-400">Layer {current} of {total}</span>
        <span className="text-sm text-zinc-500">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

function ObjectionGroup({
  index,
  entry,
  layer,
  onChange,
  defaultOpen,
}: {
  index: number;
  entry: ObjectionEntry;
  layer: BeliefLayer;
  onChange: (field: keyof ObjectionEntry, value: string) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasContent = entry.objection.trim() !== '';
  const isOptional = index > 0;

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${hasContent ? `${layer.colorBg} ${layer.color}` : 'bg-zinc-800 text-zinc-500'}`}>
            {hasContent ? <Check className="w-3.5 h-3.5" /> : index + 1}
          </div>
          <span className="text-sm font-medium text-white">
            Objection {index + 1}
            {isOptional && !hasContent && <span className="text-zinc-500 ml-2">(optional)</span>}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              <InputField
                label="What do they say?"
                value={entry.objection}
                onChange={(val) => onChange('objection', val)}
                placeholder={layer.objectionPlaceholder}
                textarea
              />
              <InputField
                label="What do they actually believe?"
                value={entry.belief}
                onChange={(val) => onChange('belief', val)}
                placeholder={layer.beliefPlaceholder}
                textarea
              />
              <InputField
                label="What do they need to believe instead?"
                value={entry.shift}
                onChange={(val) => onChange('shift', val)}
                placeholder={layer.shiftPlaceholder}
                textarea
              />
              <InputField
                label="Content idea to shift this"
                value={entry.contentIdea}
                onChange={(val) => onChange('contentIdea', val)}
                placeholder={layer.contentPlaceholder}
                textarea
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Step Components ─── */

function StepIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Build your<br />
          <GradientText>Belief Bridge.</GradientText>
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl mx-auto">
          Map your audience's objections to the content that dissolves them. Input what you hear on sales calls. Get a content plan that earns trust before the conversation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-3 gap-4 mb-12"
      >
        {[
          { value: '5', label: 'Belief Layers' },
          { value: '15+', label: 'Objections Mapped' },
          { value: '1', label: 'Content Plan Output' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] transition-all text-lg"
        >
          Start Mapping <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

function StepBusiness({
  data,
  onChange,
}: {
  data: UserData;
  onChange: (field: 'businessType' | 'audience' | 'offer', value: string) => void;
}) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">First, your business.</h2>
      <p className="text-zinc-400 mb-8">Three quick inputs so we can frame everything around your world.</p>

      <div className="space-y-6">
        <InputField
          label="What do you sell?"
          value={data.businessType}
          onChange={(val) => onChange('businessType', val)}
          placeholder="e.g. Content strategy for 7 figure founders"
        />
        <InputField
          label="Who is your ideal client?"
          value={data.audience}
          onChange={(val) => onChange('audience', val)}
          placeholder="e.g. Coaches and consultants doing $1.5M-$5M"
        />
        <InputField
          label="What is the main outcome you deliver?"
          value={data.offer}
          onChange={(val) => onChange('offer', val)}
          placeholder="e.g. A predictable content engine that drives inbound"
        />
      </div>
    </div>
  );
}

function StepLayer({
  layerIndex,
  layer,
  onEntryChange,
}: {
  layerIndex: number;
  layer: BeliefLayer;
  onEntryChange: (entryIndex: number, field: keyof ObjectionEntry, value: string) => void;
}) {
  const IconComponent = layer.icon;

  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar current={layerIndex + 1} total={5} />

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${layer.colorBg} ${layer.colorBorder} border flex items-center justify-center`}>
          <IconComponent className={`w-5 h-5 ${layer.color}`} />
        </div>
        <span className={`text-sm font-bold tracking-widest uppercase ${layer.color}`}>{layer.name}</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{layer.description}</h2>
      <p className="text-zinc-400 mb-8">{layer.question}</p>

      <div className="space-y-4">
        {layer.entries.map((entry, i) => (
          <ObjectionGroup
            key={i}
            index={i}
            entry={entry}
            layer={layer}
            onChange={(field, value) => onEntryChange(i, field, value)}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Step: Lead Capture Gate ─── */

function StepCapture({
  name,
  email,
  onNameChange,
  onEmailChange,
  onSubmit,
  status,
}: {
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: () => void;
  status: 'idle' | 'submitting' | 'done' | 'error';
}) {
  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/[0.08] border border-blue-500/[0.15] flex items-center justify-center mx-auto mb-6">
        <Mail className="w-6 h-6 text-blue-400" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
        Your map is ready.
      </h2>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Enter your name and email to view your personalised Belief Shift Map.
      </p>

      <div className="space-y-4 text-left mb-8">
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Your name"
            className="w-full bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!name.trim() || !email.trim() || status === 'submitting'}
        className={`w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-all ${
          name.trim() && email.trim() && status !== 'submitting'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:brightness-110 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]'
            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
        }`}
      >
        {status === 'submitting' ? 'Loading...' : status === 'error' ? 'Something went wrong. Try again.' : 'View My Belief Shift Map'}
        {status === 'idle' && <ArrowRight className="w-4 h-4" />}
      </button>

      <p className="text-xs text-zinc-600 mt-4">No spam. Just your map.</p>
    </div>
  );
}

function StepOutput({ data }: { data: UserData }) {
  const filledLayers = data.layers.filter((layer) =>
    layer.entries.some((e) => e.objection.trim() !== '')
  );

  const totalObjections = data.layers.reduce(
    (sum, layer) => sum + layer.entries.filter((e) => e.objection.trim() !== '').length,
    0
  );
  const totalContentPieces = data.layers.reduce(
    (sum, layer) => sum + layer.entries.filter((e) => e.contentIdea.trim() !== '').length,
    0
  );

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const layerOrder = ['category', 'method', 'provider', 'self', 'timing'];

  const weeklyRotation = layerOrder
    .map((id, i) => {
      const layer = data.layers.find((l) => l.id === id)!;
      const ideas = layer.entries
        .filter((e) => e.contentIdea.trim() !== '')
        .map((e) => e.contentIdea);
      return { day: dayNames[i], layer, ideas };
    })
    .filter((r) => r.ideas.length > 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Your <GradientText>Belief Shift Map</GradientText>
        </h2>
        <p className="text-zinc-400">Generated from your inputs. This is your content roadmap for earning trust.</p>
      </div>

      {/* Business context */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">You sell</p>
            <p className="text-white text-sm">{data.businessType}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">To</p>
            <p className="text-white text-sm">{data.audience}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">Outcome</p>
            <p className="text-white text-sm">{data.offer}</p>
          </div>
        </div>
      </div>

      {/* Layer cards */}
      <div className="space-y-6 mb-12">
        {filledLayers.map((layer) => {
          const IconComponent = layer.icon;
          const filledEntries = layer.entries.filter((e) => e.objection.trim() !== '');

          return (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg ${layer.colorBg} ${layer.colorBorder} border flex items-center justify-center`}>
                  <IconComponent className={`w-4 h-4 ${layer.color}`} />
                </div>
                <h3 className={`text-lg font-bold ${layer.color}`}>{layer.name}</h3>
              </div>

              <div className="space-y-6">
                {filledEntries.map((entry, i) => (
                  <div key={i} className="space-y-3">
                    {i > 0 && <div className="border-t border-white/[0.04] pt-6" />}

                    {entry.objection && (
                      <div className="bg-red-400/[0.06] border border-red-400/[0.12] rounded-xl px-4 py-3">
                        <p className="text-xs font-bold tracking-widest uppercase text-red-400/70 mb-1">They say</p>
                        <p className="text-sm text-zinc-200">"{entry.objection}"</p>
                      </div>
                    )}

                    {entry.belief && (
                      <div className="bg-amber-400/[0.06] border border-amber-400/[0.12] rounded-xl px-4 py-3">
                        <p className="text-xs font-bold tracking-widest uppercase text-amber-400/70 mb-1">They believe</p>
                        <p className="text-sm text-zinc-200">{entry.belief}</p>
                      </div>
                    )}

                    {entry.shift && (
                      <div className="bg-blue-400/[0.06] border border-blue-400/[0.12] rounded-xl px-4 py-3">
                        <p className="text-xs font-bold tracking-widest uppercase text-blue-400/70 mb-1">They need to believe</p>
                        <p className="text-sm text-zinc-200">{entry.shift}</p>
                      </div>
                    )}

                    {entry.contentIdea && (
                      <div className="bg-emerald-400/[0.06] border border-emerald-400/[0.12] rounded-xl px-4 py-3">
                        <p className="text-xs font-bold tracking-widest uppercase text-emerald-400/70 mb-1">Content to create</p>
                        <p className="text-sm text-zinc-200">{entry.contentIdea}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly rotation */}
      {weeklyRotation.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Weekly Content Rotation</h3>
          <p className="text-zinc-400 text-sm mb-6">
            One belief layer per day. Rotate through your content ideas each week.
          </p>
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_auto_1fr] divide-y divide-white/[0.04]">
              {weeklyRotation.map((row) => {
                const IconComponent = row.layer.icon;
                return (
                  <React.Fragment key={row.day}>
                    <div className="px-4 py-3 flex items-center">
                      <span className="text-sm font-medium text-white">{row.day}</span>
                    </div>
                    <div className="hidden sm:flex px-4 py-3 items-center gap-2">
                      <IconComponent className={`w-3.5 h-3.5 ${row.layer.color}`} />
                      <span className={`text-xs font-medium ${row.layer.color}`}>{row.layer.name}</span>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm text-zinc-300">{row.ideas[0]}</p>
                      {row.ideas.length > 1 && (
                        <p className="text-xs text-zinc-500 mt-1">+{row.ideas.length - 1} more idea{row.ideas.length - 1 > 1 ? 's' : ''} to rotate</p>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-white">{totalObjections}</p>
          <p className="text-xs text-zinc-500 mt-1">Objections Mapped</p>
        </div>
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-white">{totalContentPieces}</p>
          <p className="text-xs text-zinc-500 mt-1">Content Pieces</p>
        </div>
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 text-center">
          <p className="text-2xl font-bold text-white">{filledLayers.length}<span className="text-zinc-500">/5</span></p>
          <p className="text-xs text-zinc-500 mt-1">Layers Covered</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 text-center">
        <p className="text-lg text-zinc-300 mb-6">
          This is the map. The Authority Engine is the system that builds it for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white transition-all"
          >
            <Download className="w-4 h-4" /> Download as PDF
          </button>
          <a
            href="https://form.typeform.com/to/S2rogsdT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:brightness-110 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] transition-all"
          >
            Apply to Work Together <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function BeliefBridge() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<UserData>({
    businessType: '',
    audience: '',
    offer: '',
    layers: createDefaultLayers(),
  });

  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const totalSteps = 9; // 0=intro, 1=biz, 2-6=layers, 7=capture, 8=output

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateBusiness = useCallback(
    (field: 'businessType' | 'audience' | 'offer', value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateEntry = useCallback(
    (layerIndex: number, entryIndex: number, field: keyof ObjectionEntry, value: string) => {
      setData((prev) => {
        const newLayers = [...prev.layers];
        const newLayer = { ...newLayers[layerIndex] };
        const newEntries = [...newLayer.entries];
        newEntries[entryIndex] = { ...newEntries[entryIndex], [field]: value };
        newLayer.entries = newEntries;
        newLayers[layerIndex] = newLayer;
        return { ...prev, layers: newLayers };
      });
    },
    []
  );

  // Determine if Next is available
  const canProgress = (): boolean => {
    if (step === 0) return true;
    if (step === 1) {
      return data.businessType.trim() !== '' && data.audience.trim() !== '' && data.offer.trim() !== '';
    }
    if (step >= 2 && step <= 6) {
      const layerIndex = step - 2;
      return data.layers[layerIndex].entries[0].objection.trim() !== '';
    }
    return true;
  };

  const handleCapture = async () => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setCaptureStatus('submitting');
    try {
      const { error } = await supabase.functions.invoke('capture-resource-lead', {
        body: { name: leadName.trim(), email: leadEmail.trim(), resource: 'Belief Bridge' },
      });
      if (error) throw error;
      setCaptureStatus('done');
      // Auto-advance to output
      setDirection(1);
      setStep(8);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setCaptureStatus('error');
      setTimeout(() => setCaptureStatus('idle'), 3000);
    }
  };

  const renderStep = () => {
    if (step === 0) return <StepIntro onStart={goNext} />;
    if (step === 1) return <StepBusiness data={data} onChange={updateBusiness} />;
    if (step >= 2 && step <= 6) {
      const layerIndex = step - 2;
      return (
        <StepLayer
          layerIndex={layerIndex}
          layer={data.layers[layerIndex]}
          onEntryChange={(entryIndex, field, value) => updateEntry(layerIndex, entryIndex, field, value)}
        />
      );
    }
    if (step === 7) return (
      <StepCapture
        name={leadName}
        email={leadEmail}
        onNameChange={setLeadName}
        onEmailChange={setLeadEmail}
        onSubmit={handleCapture}
        status={captureStatus}
      />
    );
    if (step === 8) return <StepOutput data={data} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="pt-28 pb-20">
        <Container>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {step > 0 && step < 7 && (
            <div className="max-w-xl mx-auto mt-12 flex items-center justify-between">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step < totalSteps - 1 && (
                <button
                  onClick={goNext}
                  disabled={!canProgress()}
                  className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all ${
                    canProgress()
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:brightness-110 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  {step === 6 ? 'Get My Results' : 'Next'} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Step dots */}
          {step > 0 && step < 7 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalSteps - 2 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 === step ? 'bg-blue-500' : i + 1 < step ? 'bg-blue-500/40' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
