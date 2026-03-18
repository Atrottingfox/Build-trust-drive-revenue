import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download, Mail, BarChart3, AlertTriangle, CheckCircle2, TrendingUp, Eye, Target, Palette, Clapperboard, Settings, Crown } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

/* ─── Types ─── */

interface LayerDefinition {
  id: string;
  name: string;
  phase: string;
  phaseColor: string;
  icon: React.ElementType;
  color: string;
  colorBg: string;
  colorBorder: string;
  barColor: string;
  questions: string[];
  diagnosis: string;
  fixProtocols: string[];
}

interface BusinessContext {
  whatYouDo: string;
  whoYouServe: string;
  primaryChannel: string;
}

/* ─── Layer Definitions ─── */

const layers: LayerDefinition[] = [
  {
    id: 'brand-clarity',
    name: 'Brand Clarity',
    phase: 'Ignition',
    phaseColor: 'text-blue-400',
    icon: Eye,
    color: 'text-blue-400',
    colorBg: 'bg-blue-400/10',
    colorBorder: 'border-blue-400/20',
    barColor: 'bg-blue-500',
    questions: [
      'Can a stranger describe what you do in one sentence from your profile?',
      'Is your ICP obvious in your content (not just your bio)?',
      'Can you list 5 beliefs that differentiate you from others in your space?',
      'Is your voice distinct enough that someone could recognise your content without seeing your name?',
      'Is your profile visit-to-follow rate above 10%?',
    ],
    diagnosis: 'Your brand foundation is unclear. People land on your profile and cannot tell what you do, who you help, or why you are different. Nothing downstream compounds until this is fixed.',
    fixProtocols: [
      'Complete the Brand Bible process: Identity, Positioning, Narrative, Messaging.',
      'Define your brand archetype and write a voice profile your team can follow without guessing.',
      'Build a Belief Architecture: category belief, product belief, brand belief, self belief, timing belief.',
      'Create a visual identity document with palette, typography, and layout rules.',
      'Run the Stranger Test on 3 people outside your audience. Fix whatever they cannot identify.',
    ],
  },
  {
    id: 'strategy-alignment',
    name: 'Strategy Alignment',
    phase: 'Ignition',
    phaseColor: 'text-blue-400',
    icon: Target,
    color: 'text-indigo-400',
    colorBg: 'bg-indigo-400/10',
    colorBorder: 'border-indigo-400/20',
    barColor: 'bg-indigo-500',
    questions: [
      'Do you have 4-6 defined content pillars in active rotation?',
      'Is your content mix roughly 40% discovery / 40% connection / 20% conversion?',
      'If someone watched your last 10 posts, would they know what you sell?',
      'Is your authority-to-relatability ratio near 60/40?',
      'Does each piece of content serve a clear funnel function (discovery, connection, or conversion)?',
    ],
    diagnosis: 'Your content is not connected to your offer. You are creating but the audience cannot see what you sell or why it matters to them. The content mix is off and nothing is moving people toward a decision.',
    fixProtocols: [
      'Map your content pillars to your offer. Every pillar should connect to a problem your offer solves.',
      'Rebalance your content mix to the 40/40/20 split. Audit weekly until the ratio holds naturally.',
      'Run the Congruence Question with 3 real followers. Fix whatever they cannot connect.',
      'Align language across content and sales pages. The words people hear should be the words they read when they land on your offer.',
    ],
  },
  {
    id: 'content-quality',
    name: 'Content Quality',
    phase: 'Transmission',
    phaseColor: 'text-indigo-400',
    icon: Palette,
    color: 'text-amber-400',
    colorBg: 'bg-amber-400/10',
    colorBorder: 'border-amber-400/20',
    barColor: 'bg-amber-500',
    questions: [
      'Do your last 10 pieces score 4+ on the 6-element quality test (Simple, Useful, Insightful, New, Relatable, Contagious)?',
      'Does every piece deliver through at least one value lens (Actionable, Educational, Insightful, Implementable, Aspirational)?',
      'Would you say the content in your last 10 posts to a room of your best clients without changing a word?',
      'Are your comments thoughtful replies and questions, not just emoji and "great post"?',
      'Is your content built from your own frameworks and observations, not recycled industry advice?',
    ],
    diagnosis: 'Your content lacks substance. It might look good but it is not delivering real value. The quality bar is too low for the audience you are trying to attract. Generic advice will not build authority.',
    fixProtocols: [
      'Score every piece before publishing against the 6 quality elements. Minimum threshold: 4/6.',
      'Apply the Conviction Test. If you would not say it to your best clients, rewrite or kill it.',
      'Ensure every piece passes at least one Value Lens. No lens = no value = no publish.',
      'Kill generic content. If 10 competitors could have posted it, it is not differentiated enough.',
    ],
  },
  {
    id: 'creative-execution',
    name: 'Creative Execution',
    phase: 'Transmission',
    phaseColor: 'text-indigo-400',
    icon: Clapperboard,
    color: 'text-pink-400',
    colorBg: 'bg-pink-400/10',
    colorBorder: 'border-pink-400/20',
    barColor: 'bg-pink-500',
    questions: [
      'Is your hook rate (3-second retention) above 30%?',
      'Is your average watch time above 40% of the video?',
      'Is your save rate above 3%?',
      'Does each piece use an intentional structure (Why-What-How or equivalent)?',
      'Are you testing 2-3 different formats or hooks per month?',
    ],
    diagnosis: 'Great ideas are dying in bad execution. Your hooks are not landing, your structure is not holding attention, and you are not testing enough. The numbers tell the story.',
    fixProtocols: [
      'Rewrite hooks on your bottom 5 performers using the 5 Hook Types. Test each type.',
      'Apply the Why-What-How structure to every piece before filming.',
      'Test 2-3 new formats every month. Measure hook rate and avg watch time per format.',
      'Track metrics weekly. Build a simple dashboard: hook rate, avg watch time, save rate, share rate.',
      'Dedicate 20-40% of output to testing. Environment, format, style, length.',
    ],
  },
  {
    id: 'system-consistency',
    name: 'System & Consistency',
    phase: 'Flywheel',
    phaseColor: 'text-emerald-400',
    icon: Settings,
    color: 'text-emerald-400',
    colorBg: 'bg-emerald-400/10',
    colorBorder: 'border-emerald-400/20',
    barColor: 'bg-emerald-500',
    questions: [
      'Are you publishing 5+ times per week consistently?',
      'Do you have a capture system for ideas (voice memos, notes bank)?',
      'Do you batch film on scheduled shoot days (2+ per month)?',
      'Is long-form content being repurposed into 5+ micro pieces?',
      'Is someone other than you handling editing, scheduling, and publishing?',
    ],
    diagnosis: 'You do not have a system. Content depends on you being in the room, in the mood, and available. That is a bottleneck, not a business. Without a repeatable engine, nothing compounds.',
    fixProtocols: [
      'Install a weekly extraction ritual. 15 minutes answering the 3 questions. Non-negotiable.',
      'Schedule batch production days. Block 1-2 half-days per month minimum. Shoot 4-8 pieces per session.',
      'Build a content waterfall. Every longform piece should feed at least 5 micro pieces across platforms.',
      'Hire or train an operator. Define clear handoff points: founder captures and films, operator handles everything else.',
      'Track publishing cadence weekly. If the rhythm breaks, the system has a hole. Find it and fix it.',
    ],
  },
  {
    id: 'authority-conversion',
    name: 'Authority & Conversion',
    phase: 'Flywheel',
    phaseColor: 'text-emerald-400',
    icon: Crown,
    color: 'text-violet-400',
    colorBg: 'bg-violet-400/10',
    colorBorder: 'border-violet-400/20',
    barColor: 'bg-violet-500',
    questions: [
      'Are you getting inbound DMs asking "how do I work with you?"',
      'Do people share your content as their answer to others\' questions?',
      'Are you getting authority invitations (podcasts, collabs, stages)?',
      'Can you trace revenue back to specific content pieces?',
      'Is your authority primarily earned (your own proof) rather than borrowed (name drops)?',
    ],
    diagnosis: 'Your content is not converting into business outcomes. No inbound, no referrals, no authority signals. Either the previous layers are broken or you are not building the trust layers needed for conversion.',
    fixProtocols: [
      'Build all 5 trust layers into your content calendar. Rotate through competency, identity, relatability, movement, and authority content.',
      'Track inbound leads weekly. Note which pieces of content they reference. Double down on what converts.',
      'Ask every new lead: "How did you find me?" and "What piece of content made you reach out?" Track the answers.',
      'Shift from borrowed to earned authority. Reduce name drops. Increase original frameworks, IP, and documented results.',
      'Build a proof stack: testimonials, case studies, metrics. Every quarter, add new proof. Stale proof loses trust.',
    ],
  },
];

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
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all"
      />
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

function YesNoQuestion({
  question,
  index,
  answer,
  onAnswer,
}: {
  question: string;
  index: number;
  answer: boolean | null;
  onAnswer: (val: boolean) => void;
}) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0 mt-0.5">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="text-sm text-zinc-200 leading-relaxed mb-4">{question}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onAnswer(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                answer === true
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                  : 'bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:border-white/[0.12] hover:text-white'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onAnswer(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                answer === false
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                  : 'bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:border-white/[0.12] hover:text-white'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Score Helpers ─── */

function getScoreColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.83) return 'text-emerald-400';
  if (pct >= 0.58) return 'text-blue-400';
  if (pct >= 0.33) return 'text-amber-400';
  return 'text-red-400';
}

function getScoreBgColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.83) return 'bg-emerald-500';
  if (pct >= 0.58) return 'bg-blue-500';
  if (pct >= 0.33) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreLabel(score: number): { label: string; description: string } {
  if (score >= 50) return { label: 'Authority Engine Running', description: 'System is operating. Focus on optimisation and compounding.' };
  if (score >= 35) return { label: 'Foundation Solid', description: 'Good bones. One or two layers need focused attention.' };
  if (score >= 20) return { label: 'Major Gaps', description: 'Structural issues across multiple layers. Prioritise Ignition first.' };
  return { label: 'Starting Over', description: 'Brand and strategy need a full rebuild before content can compound.' };
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
          Score your<br />
          <GradientText>Authority Engine.</GradientText>
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl mx-auto">
          30 yes/no questions across 6 layers. 3 minutes. Get your Authority Score with a personalised diagnosis of what to fix first.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-3 gap-4 mb-12"
      >
        {[
          { value: '6', label: 'Diagnostic Layers' },
          { value: '/60', label: 'Authority Score' },
          { value: '~3m', label: 'To Complete' },
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
          Start Diagnostic <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

function StepBusiness({
  data,
  onChange,
}: {
  data: BusinessContext;
  onChange: (field: keyof BusinessContext, value: string) => void;
}) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">First, your business.</h2>
      <p className="text-zinc-400 mb-8">Three quick inputs so we can frame your results.</p>

      <div className="space-y-6">
        <InputField
          label="What do you do?"
          value={data.whatYouDo}
          onChange={(val) => onChange('whatYouDo', val)}
          placeholder="e.g. Content strategy for 7 figure founders"
        />
        <InputField
          label="Who do you serve?"
          value={data.whoYouServe}
          onChange={(val) => onChange('whoYouServe', val)}
          placeholder="e.g. Coaches and consultants doing $1.5M-$5M"
        />
        <InputField
          label="Primary content channel?"
          value={data.primaryChannel}
          onChange={(val) => onChange('primaryChannel', val)}
          placeholder="e.g. Instagram, YouTube, LinkedIn"
        />
      </div>
    </div>
  );
}

function StepLayer({
  layerIndex,
  layer,
  answers,
  onAnswer,
}: {
  layerIndex: number;
  layer: LayerDefinition;
  answers: (boolean | null)[];
  onAnswer: (questionIndex: number, value: boolean) => void;
}) {
  const IconComponent = layer.icon;

  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar current={layerIndex + 1} total={6} />

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${layer.colorBg} ${layer.colorBorder} border flex items-center justify-center`}>
          <IconComponent className={`w-5 h-5 ${layer.color}`} />
        </div>
        <div>
          <span className={`text-sm font-bold tracking-widest uppercase ${layer.color}`}>{layer.name}</span>
          <span className={`text-xs ml-3 ${layer.phaseColor}`}>{layer.phase}</span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Score this layer.</h2>

      <div className="space-y-4">
        {layer.questions.map((question, i) => (
          <YesNoQuestion
            key={i}
            question={question}
            index={i}
            answer={answers[i]}
            onAnswer={(val) => onAnswer(i, val)}
          />
        ))}
      </div>
    </div>
  );
}

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
        Your score is ready.
      </h2>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Enter your name and email to view your personalised Authority Score and diagnosis.
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
        {status === 'submitting' ? 'Loading...' : status === 'error' ? 'Something went wrong. Try again.' : 'View My Authority Score'}
        {status === 'idle' && <ArrowRight className="w-4 h-4" />}
      </button>

      <p className="text-xs text-zinc-600 mt-4">No spam. Just your score.</p>
    </div>
  );
}

function StepOutput({
  businessContext,
  allAnswers,
}: {
  businessContext: BusinessContext;
  allAnswers: (boolean | null)[][];
}) {
  // Calculate scores
  const layerScores = layers.map((layer, i) => {
    const answers = allAnswers[i];
    const score = answers.reduce((sum: number, a) => sum + (a === true ? 2 : 0), 0);
    return { layer, score };
  });

  const totalScore = layerScores.reduce((sum, ls) => sum + ls.score, 0);
  const scoreInfo = getScoreLabel(totalScore);

  // Find weakest layers (lowest 2 scores, or any scoring 4 or below)
  const sorted = [...layerScores].sort((a, b) => a.score - b.score);
  const weakest = sorted.filter((ls) => ls.score <= 6).slice(0, 2);
  if (weakest.length === 0) weakest.push(sorted[0]);

  // Weekly content rotation based on weak layers
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weakLayerIds = new Set(weakest.map((w) => w.layer.id));
  const priorityLayers = layerScores.filter((ls) => weakLayerIds.has(ls.layer.id));
  const otherLayers = layerScores.filter((ls) => !weakLayerIds.has(ls.layer.id));
  const rotationLayers = [...priorityLayers, ...otherLayers].slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Your <GradientText>Authority Score</GradientText>
        </h2>
        <p className="text-zinc-400">Personalised diagnosis based on your answers.</p>
      </div>

      {/* Business context */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">You do</p>
            <p className="text-white text-sm">{businessContext.whatYouDo}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">You serve</p>
            <p className="text-white text-sm">{businessContext.whoYouServe}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">Channel</p>
            <p className="text-white text-sm">{businessContext.primaryChannel}</p>
          </div>
        </div>
      </div>

      {/* Big score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 mb-8 text-center"
      >
        <p className={`text-7xl sm:text-8xl font-black ${getScoreColor(totalScore, 60)} mb-2`}>
          {totalScore}<span className="text-3xl text-zinc-600">/60</span>
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          {totalScore >= 50 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : totalScore >= 35 ? (
            <TrendingUp className="w-5 h-5 text-blue-400" />
          ) : totalScore >= 20 ? (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
          <p className="text-xl font-bold text-white">{scoreInfo.label}</p>
        </div>
        <p className="text-sm text-zinc-400">{scoreInfo.description}</p>
      </motion.div>

      {/* Score bars */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-4 h-4 text-zinc-500" />
          <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500">Layer Breakdown</h3>
        </div>
        <div className="space-y-4">
          {layerScores.map((ls) => (
            <div key={ls.layer.id} className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 w-44 sm:w-48 shrink-0">{ls.layer.name}</span>
              <div className="flex-1 bg-white/[0.04] rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${getScoreBgColor(ls.score, 10)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${ls.score * 10}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <span className={`text-sm font-semibold w-10 text-right ${getScoreColor(ls.score, 10)}`}>
                {ls.score}/10
              </span>
            </div>
          ))}
          <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06]">
            <span className="text-sm font-semibold text-white w-44 sm:w-48">Total Authority Score</span>
            <div className="flex-1" />
            <span className={`text-lg font-extrabold ${getScoreColor(totalScore, 60)}`}>{totalScore}/60</span>
          </div>
        </div>
      </div>

      {/* Weakest layer spotlight */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">
          {weakest.length === 1 ? 'Weakest Layer' : 'Weakest Layers'}
        </h3>
        <div className="space-y-4">
          {weakest.map((ls) => {
            const IconComponent = ls.layer.icon;
            return (
              <motion.div
                key={ls.layer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${ls.layer.colorBg} ${ls.layer.colorBorder} border flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${ls.layer.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${ls.layer.color}`}>{ls.layer.name}</h4>
                    <p className="text-xs text-zinc-500">{ls.layer.phase} Phase</p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(ls.score, 10)}`}>{ls.score}/10</span>
                </div>

                {/* Diagnosis */}
                <div className="bg-red-400/[0.06] border border-red-400/[0.12] rounded-xl px-4 py-3 mb-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400/70 mb-1">Diagnosis</p>
                  <p className="text-sm text-zinc-200 leading-relaxed">{ls.layer.diagnosis}</p>
                </div>

                {/* Fix protocols */}
                <div className="bg-emerald-400/[0.06] border border-emerald-400/[0.12] rounded-xl px-4 py-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-emerald-400/70 mb-2">Fix Protocol</p>
                  <ul className="space-y-2">
                    {ls.layer.fixProtocols.map((fix, i) => (
                      <li key={i} className="text-sm text-zinc-200 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weekly content rotation */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Content Rotation</h3>
        <p className="text-zinc-400 text-sm mb-6">
          Prioritised based on your weakest layers. Fix the foundation first.
        </p>
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/[0.04]">
            {rotationLayers.map((ls, i) => {
              const IconComponent = ls.layer.icon;
              const isWeak = weakLayerIds.has(ls.layer.id);
              return (
                <div key={ls.layer.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="text-sm font-medium text-white w-24 shrink-0">{dayNames[i]}</span>
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-3.5 h-3.5 ${ls.layer.color}`} />
                    <span className={`text-sm font-medium ${ls.layer.color}`}>{ls.layer.name}</span>
                  </div>
                  {isWeak && (
                    <span className="ml-auto text-[10px] font-bold tracking-widest uppercase text-red-400 bg-red-500/[0.08] border border-red-500/[0.15] px-2.5 py-1 rounded-full">
                      Priority
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Score range reference */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-8">
        <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-4">Score Ranges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { range: '50-60', label: 'Engine Running', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { range: '35-49', label: 'Foundation Solid', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { range: '20-34', label: 'Major Gaps', color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { range: '0-19', label: 'Starting Over', color: 'text-red-400', bg: 'bg-red-500/10' },
          ].map((r) => (
            <div key={r.range} className={`${r.bg} rounded-xl p-3 text-center`}>
              <p className={`text-lg font-bold ${r.color}`}>{r.range}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 text-center">
        <p className="text-lg text-zinc-300 mb-6">
          This is your diagnosis. The Authority Engine is the system that fixes it.
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

export default function DiagnosticTool() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [businessContext, setBusinessContext] = useState<BusinessContext>({
    whatYouDo: '',
    whoYouServe: '',
    primaryChannel: '',
  });

  // 6 layers x 5 questions each
  const [allAnswers, setAllAnswers] = useState<(boolean | null)[][]>(
    layers.map(() => [null, null, null, null, null])
  );

  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const totalSteps = 10; // 0=intro, 1=biz, 2-7=layers, 8=capture, 9=output

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

  const updateBusiness = useCallback((field: keyof BusinessContext, value: string) => {
    setBusinessContext((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateAnswer = useCallback((layerIndex: number, questionIndex: number, value: boolean) => {
    setAllAnswers((prev) => {
      const newAnswers = prev.map((a) => [...a]);
      newAnswers[layerIndex][questionIndex] = value;
      return newAnswers;
    });
  }, []);

  const canProgress = (): boolean => {
    if (step === 0) return true;
    if (step === 1) {
      return businessContext.whatYouDo.trim() !== '' && businessContext.whoYouServe.trim() !== '' && businessContext.primaryChannel.trim() !== '';
    }
    if (step >= 2 && step <= 7) {
      const layerIndex = step - 2;
      return allAnswers[layerIndex].every((a) => a !== null);
    }
    return true;
  };

  const handleCapture = async () => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setCaptureStatus('submitting');
    try {
      const { error } = await supabase.functions.invoke('capture-resource-lead', {
        body: { name: leadName.trim(), email: leadEmail.trim(), resource: 'Content Diagnostic' },
      });
      if (error) throw error;
      setCaptureStatus('done');
      setDirection(1);
      setStep(9);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setCaptureStatus('error');
      setTimeout(() => setCaptureStatus('idle'), 3000);
    }
  };

  const renderStep = () => {
    if (step === 0) return <StepIntro onStart={goNext} />;
    if (step === 1) return <StepBusiness data={businessContext} onChange={updateBusiness} />;
    if (step >= 2 && step <= 7) {
      const layerIndex = step - 2;
      return (
        <StepLayer
          layerIndex={layerIndex}
          layer={layers[layerIndex]}
          answers={allAnswers[layerIndex]}
          onAnswer={(qi, val) => updateAnswer(layerIndex, qi, val)}
        />
      );
    }
    if (step === 8) return (
      <StepCapture
        name={leadName}
        email={leadEmail}
        onNameChange={setLeadName}
        onEmailChange={setLeadEmail}
        onSubmit={handleCapture}
        status={captureStatus}
      />
    );
    if (step === 9) return <StepOutput businessContext={businessContext} allAnswers={allAnswers} />;
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
          {step > 0 && step < 8 && (
            <div className="max-w-xl mx-auto mt-12 flex items-center justify-between">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={goNext}
                disabled={!canProgress()}
                className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all ${
                  canProgress()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:brightness-110 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                {step === 7 ? 'Get My Results' : 'Next'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step dots */}
          {step > 0 && step < 8 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: 8 }, (_, i) => (
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
