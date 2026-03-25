import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { QUIZ_QUESTIONS, calculateArchetype, getArchetype, TRY_ARCHETYPES } from '../../lib/tryArchetypes';
import { DEEP_QUESTIONS, calculateDeepArchetype } from '../../lib/tryDeepQuestions';
import type { TryArchetypeId, ArchetypeScores } from '../../types/try';

interface ScreenArchetypeProps {
  onComplete: (data: {
    archetype: TryArchetypeId;
    scores: ArchetypeScores;
    method: 'quiz_8' | 'quiz_30' | 'picked';
    responses: Record<number, boolean> | Record<string, number>;
  }) => void;
}

type Mode = 'quiz' | 'pick' | 'result' | 'deep';

export function ScreenArchetype({ onComplete }: ScreenArchetypeProps) {
  const [mode, setMode] = useState<Mode>('quiz');
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState<Record<number, boolean>>({});
  const [deepResponses, setDeepResponses] = useState<Record<string, number>>({});
  const [deepQ, setDeepQ] = useState(0);
  const [result, setResult] = useState<{ archetype: TryArchetypeId; scores: ArchetypeScores } | null>(null);
  const [method, setMethod] = useState<'quiz_8' | 'quiz_30' | 'picked'>('quiz_8');

  const handleQuizAnswer = (agreed: boolean) => {
    const newResponses = { ...responses, [QUIZ_QUESTIONS[currentQ].id]: agreed };
    setResponses(newResponses);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const { archetype, scores } = calculateArchetype(newResponses);
      setResult({ archetype, scores });
      setMethod('quiz_8');
      setMode('result');
    }
  };

  const handleDeepAnswer = (optionIndex: number) => {
    const q = DEEP_QUESTIONS[deepQ];
    const newResponses = { ...deepResponses, [q.id]: optionIndex };
    setDeepResponses(newResponses);

    if (deepQ < DEEP_QUESTIONS.length - 1) {
      setDeepQ(deepQ + 1);
    } else {
      const { archetype, scores } = calculateDeepArchetype(newResponses);
      setResult({ archetype, scores });
      setMethod('quiz_30');
      setMode('result');
    }
  };

  const handlePick = (id: TryArchetypeId) => {
    const scores: ArchetypeScores = { strategist: 0, educator: 0, connector: 0, creator: 0 };
    scores[id] = 10;
    setResult({ archetype: id, scores });
    setMethod('picked');
    setMode('result');
  };

  const handleContinue = () => {
    if (!result) return;
    onComplete({
      archetype: result.archetype,
      scores: result.scores,
      method,
      responses: method === 'quiz_30' ? deepResponses : responses,
    });
  };

  return (
    <AnimatePresence mode="wait">
      {mode === 'quiz' && (
        <motion.div
          key={`quiz-${currentQ}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3">
            <span className="text-xs text-zinc-500">
              {currentQ + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-8">
            {QUIZ_QUESTIONS[currentQ].statement}
          </h2>

          <div className="space-y-4">
            <motion.button
              className="w-full text-left p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
              onClick={() => handleQuizAnswer(true)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Agree
            </motion.button>
            <motion.button
              className="w-full text-left p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
              onClick={() => handleQuizAnswer(false)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Disagree
            </motion.button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {currentQ > 0 ? (
              <button
                className="flex items-center text-zinc-500 hover:text-white transition-colors text-sm"
                onClick={() => setCurrentQ(currentQ - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              className="text-sm text-zinc-500 hover:text-blue-400 transition-colors"
              onClick={() => setMode('pick')}
            >
              Already know your type?
            </button>
          </div>
        </motion.div>
      )}

      {mode === 'pick' && (
        <motion.div
          key="pick"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Pick your type</h2>
          <p className="text-zinc-400 mb-6 text-sm">Select the one that feels most like you.</p>

          <div className="space-y-3">
            {TRY_ARCHETYPES.map((arch) => (
              <motion.button
                key={arch.id}
                className="w-full text-left p-5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 transition-all ring-1 ring-white/10 hover:ring-blue-500/50"
                onClick={() => handlePick(arch.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-semibold">{arch.title}</span>
                  <span className="text-xs text-zinc-500">{arch.subtitle}</span>
                </div>
                <p className="text-sm text-zinc-400">{arch.description}</p>
              </motion.button>
            ))}
          </div>

          <button
            className="mt-6 flex items-center text-zinc-500 hover:text-white transition-colors text-sm"
            onClick={() => setMode('quiz')}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Take the quiz instead
          </button>
        </motion.div>
      )}

      {mode === 'result' && result && (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Your Content Archetype</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            {getArchetype(result.archetype).title}
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            {getArchetype(result.archetype).description}
          </p>

          <div className="space-y-3">
            <motion.button
              className="w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>

            {method === 'quiz_8' && (
              <button
                className="text-sm text-zinc-500 hover:text-blue-400 transition-colors"
                onClick={() => {
                  setMode('deep');
                  setDeepQ(0);
                  setDeepResponses({});
                }}
              >
                Go deeper for more accuracy (30 questions)
              </button>
            )}
          </div>
        </motion.div>
      )}

      {mode === 'deep' && (
        <motion.div
          key={`deep-${deepQ}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              {deepQ + 1} of {DEEP_QUESTIONS.length}
            </span>
            <span className="text-xs text-blue-400">Deep Assessment</span>
          </div>

          <p className="text-xs text-zinc-600 mb-1">{DEEP_QUESTIONS[deepQ].section}</p>
          <h2 className="text-xl font-bold text-white mb-6">
            {DEEP_QUESTIONS[deepQ].text}
          </h2>

          <div className="space-y-3">
            {DEEP_QUESTIONS[deepQ].options.map((option, idx) => (
              <motion.button
                key={idx}
                className="w-full text-left p-4 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-white transition-all ring-1 ring-white/10 hover:ring-blue-500/50 text-sm"
                onClick={() => handleDeepAnswer(idx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>

          {deepQ > 0 && (
            <button
              className="mt-4 flex items-center text-zinc-500 hover:text-white transition-colors text-sm"
              onClick={() => setDeepQ(deepQ - 1)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
