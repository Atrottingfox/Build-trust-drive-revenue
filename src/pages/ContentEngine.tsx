import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Loader2, ArrowRight, ArrowLeft, Plus, X, Check,
  ChevronDown, ChevronRight, Zap, BookOpen, Download, Save,
  Sparkle, RefreshCw, CheckCircle2, AlertCircle, Eye
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';
import {
  CONTENT_TYPES, TRUST_LAYERS, HOOK_TYPES, VALUE_LENSES,
  type ContentType, type FrameworkVariation
} from '../lib/contentFrameworks';
import {
  saveLocalState, loadLocalState, clearLocalState,
  type LocalEngineState,
} from '../lib/contentEngineDatabase';

const SUPABASE_URL = 'https://pwgdlvvrkyxptcsaztzc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z2RsdnZya3l4cHRjc2F6dHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzE5MTEsImV4cCI6MjA4ODc0NzkxMX0.BLpG9A539wmcxrJ40klJ9zs1cPZNdC1TfbPBXvBpWqg';

// --- Types ---

interface Question {
  id: string;
  label: string;
  apiLabel: string;
  placeholder: string;
}

const questions: Question[] = [
  { id: 'learn', label: 'What did I learn today?', apiLabel: 'What I learned today', placeholder: 'A new technique, concept, or insight...' },
  { id: 'teach', label: 'What did I teach today?', apiLabel: 'What I taught today', placeholder: 'Something I helped someone else understand...' },
  { id: 'solve', label: 'What did I solve today?', apiLabel: 'What I solved today', placeholder: 'A bug, a challenge, a creative problem...' },
  { id: 'problem', label: 'What problem came up today?', apiLabel: 'What problem came up today', placeholder: 'Something unexpected or unresolved...' },
  { id: 'excited', label: 'What am I excited for?', apiLabel: "What I'm excited for", placeholder: 'Something coming up that energises me...' },
];

interface Angle {
  id: string;
  title: string;
  sourceQuestion: string;
  suggestedType: string;
  rawExcerpt: string;
  isManual: boolean;
  isSelected: boolean;
}

interface OutlineData {
  contentType: string;
  variation: string;
  hook: string;
  steps: Array<{ label: string; content: string }>;
  trustLayer: string;
  isComplete: boolean;
}

const STAGES = [
  { num: 1, label: 'Capture' },
  { num: 2, label: 'Angles' },
  { num: 3, label: 'Build' },
  { num: 4, label: 'Review' },
];

// --- Component ---

export default function ContentEngine() {
  // Stage
  const [currentStage, setCurrentStage] = useState(1);

  // Stage 1: Capture
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recording, setRecording] = useState<Record<string, boolean>>({});
  const [transcribing, setTranscribing] = useState<Record<string, boolean>>({});
  const recorders = useRef<Record<string, MediaRecorder>>({});

  // Stage 2: Angles
  const [angles, setAngles] = useState<Angle[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [showAddAngle, setShowAddAngle] = useState(false);
  const [newAngleTitle, setNewAngleTitle] = useState('');

  // Stage 3: Outlines
  const [outlines, setOutlines] = useState<Record<string, OutlineData>>({});
  const [expandedAngle, setExpandedAngle] = useState<string | null>(null);
  const [suggestingField, setSuggestingField] = useState<string | null>(null);
  const [suggestingAll, setSuggestingAll] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Stage 4: Review
  const [valueLensChecks, setValueLensChecks] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Global
  const [error, setError] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  const filledCount = Object.values(answers).filter(v => v.trim().length > 0).length;
  const selectedAngles = angles.filter(a => a.isSelected);
  const completedOutlines = selectedAngles.filter(a => outlines[a.id]?.isComplete);

  // --- Persistence ---

  const buildLocalState = useCallback((): LocalEngineState => ({
    answers,
    currentStage,
    angles,
    outlines,
  }), [answers, currentStage, angles, outlines]);

  useEffect(() => {
    const saved = loadLocalState();
    if (saved) {
      setAnswers(saved.answers || {});
      setCurrentStage(saved.currentStage || 1);
      setAngles(saved.angles || []);
      setOutlines(saved.outlines || {});
      if (saved.angles?.length > 0 && !saved.angles.some(a => a.isSelected)) {
        // No selected angles but have angles, stay at stage 2
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveLocalState(buildLocalState());
    }, 500);
    return () => clearTimeout(timeout);
  }, [buildLocalState]);

  // --- Navigation ---

  function goToStage(stage: number) {
    if (stage < 1 || stage > 4) return;

    if (stage > currentStage) {
      // Forward validation
      if (stage >= 2 && filledCount < 3) {
        setError('Answer at least 3 of 5 questions first.');
        return;
      }
      if (stage >= 3 && selectedAngles.length === 0) {
        setError('Select at least one angle to build.');
        return;
      }
    }

    setError('');
    setCurrentStage(stage);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Stage 1: Recording ---

  const updateAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  async function toggleRecording(questionId: string) {
    if (recorders.current[questionId]) {
      recorders.current[questionId].stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        delete recorders.current[questionId];
        setRecording(prev => ({ ...prev, [questionId]: false }));
        setTranscribing(prev => ({ ...prev, [questionId]: true }));

        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/transcribe-lead-magnet`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY,
              },
              body: JSON.stringify({ audioBase64: base64 }),
            });
            if (!res.ok) throw new Error('Transcription failed');
            const data = await res.json();
            const existing = (answers[questionId] || '').trim();
            updateAnswer(questionId, existing ? `${existing} ${data.transcript}` : data.transcript);
          } catch {
            setError('Transcription failed. Please try again.');
          } finally {
            setTranscribing(prev => ({ ...prev, [questionId]: false }));
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();
      recorders.current[questionId] = mediaRecorder;
      setRecording(prev => ({ ...prev, [questionId]: true }));
    } catch {
      setError('Microphone access denied. Check your browser permissions.');
    }
  }

  // --- Stage 2: Extract Angles ---

  async function extractAngles() {
    setError('');
    setExtracting(true);

    const answered = questions
      .filter(q => (answers[q.id] || '').trim().length > 0)
      .map(q => ({ label: q.apiLabel, value: answers[q.id].trim() }));

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ action: 'extract_angles', answers: answered }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error: ${res.status}`);
      }

      const data = await res.json();
      const newAngles: Angle[] = (data.angles || []).map((a: any, i: number) => ({
        id: `angle-${Date.now()}-${i}`,
        title: a.title,
        sourceQuestion: a.sourceQuestion,
        suggestedType: a.suggestedType,
        rawExcerpt: a.rawExcerpt,
        isManual: false,
        isSelected: false,
      }));

      setAngles(newAngles);
      setCurrentStage(2);
    } catch (err: any) {
      setError(err.message || 'Failed to extract angles.');
    } finally {
      setExtracting(false);
    }
  }

  function addManualAngle() {
    if (!newAngleTitle.trim()) return;
    const angle: Angle = {
      id: `angle-manual-${Date.now()}`,
      title: newAngleTitle.trim(),
      sourceQuestion: 'Manual',
      suggestedType: 'Breakdown',
      rawExcerpt: '',
      isManual: true,
      isSelected: true,
    };
    setAngles(prev => [...prev, angle]);
    setNewAngleTitle('');
    setShowAddAngle(false);
  }

  function toggleAngleSelection(id: string) {
    setAngles(prev => prev.map(a =>
      a.id === id ? { ...a, isSelected: !a.isSelected } : a
    ));
  }

  function removeAngle(id: string) {
    setAngles(prev => prev.filter(a => a.id !== id));
    setOutlines(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  // --- Stage 3: Outline Building ---

  function getOutline(angleId: string): OutlineData {
    if (outlines[angleId]) return outlines[angleId];
    const angle = angles.find(a => a.id === angleId);
    const suggestedType = CONTENT_TYPES.find(t => t.name === angle?.suggestedType) || CONTENT_TYPES[0];
    return {
      contentType: suggestedType.id,
      variation: suggestedType.variations[0].id,
      hook: '',
      steps: suggestedType.variations[0].steps.map(s => ({ label: s.label, content: '' })),
      trustLayer: '',
      isComplete: false,
    };
  }

  function updateOutline(angleId: string, updates: Partial<OutlineData>) {
    setOutlines(prev => {
      const current = prev[angleId] || getOutline(angleId);
      const updated = { ...current, ...updates };

      // Check completeness
      const hasHook = updated.hook.trim().length > 0;
      const hasSteps = updated.steps.some(s => s.content.trim().length > 0);
      updated.isComplete = hasHook && hasSteps;

      return { ...prev, [angleId]: updated };
    });
  }

  function changeContentType(angleId: string, typeId: string) {
    const type = CONTENT_TYPES.find(t => t.id === typeId);
    if (!type) return;
    const variation = type.variations[0];
    updateOutline(angleId, {
      contentType: typeId,
      variation: variation.id,
      steps: variation.steps.map(s => ({ label: s.label, content: '' })),
    });
  }

  function changeVariation(angleId: string, variationId: string) {
    const outline = getOutline(angleId);
    const type = CONTENT_TYPES.find(t => t.id === outline.contentType);
    const variation = type?.variations.find(v => v.id === variationId);
    if (!variation) return;
    updateOutline(angleId, {
      variation: variationId,
      steps: variation.steps.map(s => ({ label: s.label, content: '' })),
    });
  }

  function updateStep(angleId: string, stepIndex: number, content: string) {
    const outline = getOutline(angleId);
    const newSteps = [...outline.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], content };
    updateOutline(angleId, { steps: newSteps });
  }

  async function suggestField(angleId: string, fieldLabel: string, stepIndex: number) {
    const key = `${angleId}-${stepIndex}`;
    setSuggestingField(key);

    const angle = angles.find(a => a.id === angleId);
    const outline = getOutline(angleId);
    const type = CONTENT_TYPES.find(t => t.id === outline.contentType);

    const answered = questions
      .filter(q => (answers[q.id] || '').trim().length > 0)
      .map(q => ({ label: q.apiLabel, value: answers[q.id].trim() }));

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'suggest_field',
          angle: { title: angle?.title, rawExcerpt: angle?.rawExcerpt },
          contentType: type?.name,
          variation: type?.variations.find(v => v.id === outline.variation)?.name,
          fieldLabel,
          existingSteps: outline.steps,
          rawCapture: answered,
        }),
      });

      if (!res.ok) throw new Error('Suggestion failed');
      const data = await res.json();
      updateStep(angleId, stepIndex, data.suggestion);
    } catch {
      setError('AI suggestion failed. Try again.');
    } finally {
      setSuggestingField(null);
    }
  }

  async function suggestHook(angleId: string) {
    const key = `${angleId}-hook`;
    setSuggestingField(key);

    const angle = angles.find(a => a.id === angleId);
    const outline = getOutline(angleId);
    const type = CONTENT_TYPES.find(t => t.id === outline.contentType);

    const answered = questions
      .filter(q => (answers[q.id] || '').trim().length > 0)
      .map(q => ({ label: q.apiLabel, value: answers[q.id].trim() }));

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'suggest_field',
          angle: { title: angle?.title, rawExcerpt: angle?.rawExcerpt },
          contentType: type?.name,
          variation: type?.variations.find(v => v.id === outline.variation)?.name,
          fieldLabel: 'Hook (opening line, under 15 words, contrarian or vulnerable)',
          existingSteps: outline.steps,
          rawCapture: answered,
        }),
      });

      if (!res.ok) throw new Error('Suggestion failed');
      const data = await res.json();
      updateOutline(angleId, { hook: data.suggestion });
    } catch {
      setError('AI suggestion failed. Try again.');
    } finally {
      setSuggestingField(null);
    }
  }

  async function fillAll(angleId: string) {
    setSuggestingAll(angleId);

    const angle = angles.find(a => a.id === angleId);
    const outline = getOutline(angleId);
    const type = CONTENT_TYPES.find(t => t.id === outline.contentType);
    const variation = type?.variations.find(v => v.id === outline.variation);

    const answered = questions
      .filter(q => (answers[q.id] || '').trim().length > 0)
      .map(q => ({ label: q.apiLabel, value: answers[q.id].trim() }));

    try {
      // Fill hook if empty
      if (!outline.hook.trim()) {
        const hookRes = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            action: 'suggest_field',
            angle: { title: angle?.title, rawExcerpt: angle?.rawExcerpt },
            contentType: type?.name,
            variation: variation?.name,
            fieldLabel: 'Hook (opening line, under 15 words, contrarian or vulnerable)',
            existingSteps: outline.steps,
            rawCapture: answered,
          }),
        });
        if (hookRes.ok) {
          const hookData = await hookRes.json();
          outline.hook = hookData.suggestion;
        }
      }

      // Fill empty steps
      const res = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'suggest_all',
          angle: { title: angle?.title, rawExcerpt: angle?.rawExcerpt },
          contentType: type?.name,
          variation: variation?.name,
          fields: variation?.steps.map(s => ({ label: s.label, hint: s.hint })) || [],
          existingSteps: outline.steps,
          rawCapture: answered,
        }),
      });

      if (!res.ok) throw new Error('Fill all failed');
      const data = await res.json();

      const newSteps = outline.steps.map(s => {
        if (!s.content.trim() && data.suggestions[s.label]) {
          return { ...s, content: data.suggestions[s.label] };
        }
        return s;
      });

      updateOutline(angleId, { hook: outline.hook, steps: newSteps });
    } catch {
      setError('AI fill failed. Try again.');
    } finally {
      setSuggestingAll(null);
    }
  }

  // --- Stage 4: Export ---

  function generateExportText(): string {
    let text = 'CONTENT ENGINE — OUTLINES\n';
    text += `Generated: ${new Date().toLocaleDateString('en-AU')}\n`;
    text += '═'.repeat(50) + '\n\n';

    selectedAngles.forEach((angle, i) => {
      const outline = outlines[angle.id];
      if (!outline) return;

      const type = CONTENT_TYPES.find(t => t.id === outline.contentType);
      const variation = type?.variations.find(v => v.id === outline.variation);

      text += `${i + 1}. ${angle.title}\n`;
      text += `   Type: ${type?.name || ''} — ${variation?.name || ''}\n`;
      text += `   Trust Layer: ${outline.trustLayer || 'Not set'}\n`;
      text += `   Hook: ${outline.hook}\n\n`;

      outline.steps.forEach((s, j) => {
        text += `   ${j + 1}. ${s.label}\n`;
        text += `      ${s.content}\n\n`;
      });

      text += '─'.repeat(50) + '\n\n';
    });

    return text;
  }

  function downloadExport() {
    const text = generateExportText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-engine-outlines-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function saveToSupabase() {
    if (!email.trim()) {
      setError('Enter your email to save.');
      return;
    }
    setSaving(true);
    setError('');

    try {
      // Import dynamically to keep initial bundle small
      const { saveSession, saveAngles: saveAnglesDb, saveOutline: saveOutlineDb, trackContentEngineUsage } = await import('../lib/contentEngineDatabase');

      const session = await saveSession({
        email: email.trim(),
        current_stage: currentStage,
        answers,
      });

      const savedAngles = await saveAnglesDb(
        session.id!,
        selectedAngles.map(a => ({
          id: a.id.startsWith('angle-') ? undefined : a.id,
          title: a.title,
          source_question: a.sourceQuestion,
          suggested_type: a.suggestedType,
          raw_excerpt: a.rawExcerpt,
          is_manual: a.isManual,
          is_selected: true,
        }))
      );

      for (const savedAngle of savedAngles) {
        const originalAngle = selectedAngles.find(a => a.title === savedAngle.title);
        if (originalAngle && outlines[originalAngle.id]) {
          const o = outlines[originalAngle.id];
          await saveOutlineDb({
            angle_id: savedAngle.id!,
            content_type: o.contentType,
            variation: o.variation,
            hook: o.hook,
            steps: o.steps,
            trust_layer: o.trustLayer,
            is_complete: o.isComplete,
          });
        }
      }

      await trackContentEngineUsage(email.trim(), 'save', {
        angles_count: selectedAngles.length,
        outlines_complete: completedOutlines.length,
      });

      setSaved(true);
      clearLocalState();
    } catch (err: any) {
      setError(err.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  // --- Render ---

  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <div ref={topRef} />

      {/* Hero + Progress */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08)_0%,rgba(99,102,241,0.03)_40%,transparent_70%)] pointer-events-none" />

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300/90 font-medium">Content Engine V2</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">Capture. Discover. </span>
              <GradientText>Build.</GradientText>
            </motion.h1>

            <motion.p
              className="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Answer your daily capture questions. AI surfaces the angles. You build the outlines with proven frameworks.
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="flex items-center justify-center gap-2 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {STAGES.map((stage, i) => (
                <React.Fragment key={stage.num}>
                  <button
                    onClick={() => goToStage(stage.num)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
                      currentStage === stage.num
                        ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        : currentStage > stage.num
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-white/[0.03] text-zinc-600 border border-white/[0.06]'
                    }`}
                  >
                    {currentStage > stage.num ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="w-4 text-center">{stage.num}</span>
                    )}
                    <span className="hidden sm:inline">{stage.label}</span>
                  </button>
                  {i < STAGES.length - 1 && (
                    <div className={`w-6 h-px ${currentStage > stage.num ? 'bg-emerald-500/40' : 'bg-white/[0.08]'}`} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="px-4"
          >
            <Container>
              <div className="max-w-3xl mx-auto">
                <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl px-5 py-3 text-red-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                  <button onClick={() => setError('')} className="ml-auto text-red-400/60 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== STAGE 1: CAPTURE ====== */}
      <AnimatePresence mode="wait">
        {currentStage === 1 && (
          <motion.section
            key="stage-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <Container>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-blue-400">Daily Capture</p>
                  <p className={`text-sm font-semibold ${filledCount >= 3 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {filledCount} of 5 answered {filledCount >= 3 ? ' — ready' : ' (minimum 3)'}
                  </p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                      className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 transition-all focus-within:border-blue-500/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[15px] font-bold text-white uppercase tracking-wide">{q.label}</h3>
                        <button
                          onClick={() => toggleRecording(q.id)}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                            recording[q.id]
                              ? 'border-red-500/40 bg-red-500/[0.08] text-red-400 animate-pulse'
                              : transcribing[q.id]
                              ? 'border-blue-500/30 bg-blue-500/[0.08] text-blue-400'
                              : 'border-white/[0.08] bg-[#18181b] text-zinc-500 hover:border-white/[0.15] hover:text-zinc-300'
                          }`}
                        >
                          {transcribing[q.id] ? (
                            <Loader2 className="w-[18px] h-[18px] animate-spin" />
                          ) : recording[q.id] ? (
                            <MicOff className="w-[18px] h-[18px]" />
                          ) : (
                            <Mic className="w-[18px] h-[18px]" />
                          )}
                        </button>
                      </div>
                      <textarea
                        value={answers[q.id] || ''}
                        onChange={(e) => updateAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full min-h-[100px] bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-4 resize-y leading-relaxed placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/30 transition-colors"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={extractAngles}
                  disabled={extracting || filledCount < 3}
                  className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {extracting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Discovering angles...
                    </>
                  ) : (
                    <>
                      Discover Angles
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </Container>
          </motion.section>
        )}

        {/* ====== STAGE 2: ANGLE DISCOVERY ====== */}
        {currentStage === 2 && (
          <motion.section
            key="stage-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <Container>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-blue-400">Angle Discovery</p>
                  <p className="text-sm font-semibold text-zinc-500">
                    {selectedAngles.length} selected
                  </p>
                </div>
                <p className="text-sm text-zinc-500 mb-6">
                  AI surfaced these angles from your answers. Select the ones you want to develop into outlines.
                </p>

                <div className="space-y-3">
                  {angles.map((angle, i) => {
                    const typeColor = CONTENT_TYPES.find(t => t.name === angle.suggestedType)?.color;
                    return (
                      <motion.div
                        key={angle.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        onClick={() => toggleAngleSelection(angle.id)}
                        className={`bg-[#111113] border rounded-2xl p-5 cursor-pointer transition-all group ${
                          angle.isSelected
                            ? 'border-blue-500/30 bg-blue-500/[0.03]'
                            : 'border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            angle.isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-zinc-600 group-hover:border-zinc-400'
                          }`}>
                            {angle.isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-bold text-white mb-1.5 leading-snug">{angle.title}</h3>

                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${typeColor?.bg || 'bg-blue-500/10'} ${typeColor?.text || 'text-blue-400'} ${typeColor?.border || 'border-blue-500/20'}`}>
                                {angle.suggestedType}
                              </span>
                              <span className="text-[11px] text-zinc-600">
                                from: {angle.sourceQuestion}
                              </span>
                            </div>

                            {angle.rawExcerpt && (
                              <p className="text-xs text-zinc-500 italic leading-relaxed line-clamp-2">
                                "{angle.rawExcerpt}"
                              </p>
                            )}
                          </div>

                          {angle.isManual && (
                            <button
                              onClick={(e) => { e.stopPropagation(); removeAngle(angle.id); }}
                              className="text-zinc-600 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Add Manual Angle */}
                <AnimatePresence>
                  {showAddAngle ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
                        <input
                          value={newAngleTitle}
                          onChange={e => setNewAngleTitle(e.target.value)}
                          placeholder="Your angle title..."
                          className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 mb-3 focus:outline-none focus:border-blue-500/30"
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && addManualAngle()}
                        />
                        <div className="flex gap-2">
                          <button onClick={addManualAngle} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
                            Add Angle
                          </button>
                          <button onClick={() => setShowAddAngle(false)} className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setShowAddAngle(true)}
                      className="mt-3 w-full py-3 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add your own angle
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => goToStage(1)}
                    className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 font-medium hover:border-zinc-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={() => goToStage(3)}
                    disabled={selectedAngles.length === 0}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    Build Outlines
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Container>
          </motion.section>
        )}

        {/* ====== STAGE 3: FRAMEWORK APPLICATION ====== */}
        {currentStage === 3 && (
          <motion.section
            key="stage-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <Container>
              <div className={`max-w-6xl mx-auto ${showSidebar ? 'lg:grid lg:grid-cols-[1fr_320px] lg:gap-6' : ''}`}>

                {/* Main Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold tracking-widest uppercase text-blue-400">Build Outlines</p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-zinc-500">
                        {completedOutlines.length}/{selectedAngles.length} complete
                      </p>
                      <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {showSidebar ? 'Hide' : 'Show'} reference
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mb-6">
                    Pick a type, choose a variation, build each step. Use AI Suggest for help or Fill All to auto-complete.
                  </p>

                  {/* Accordion */}
                  <div className="space-y-3">
                    {selectedAngles.map((angle, i) => {
                      const outline = getOutline(angle.id);
                      const isExpanded = expandedAngle === angle.id;
                      const type = CONTENT_TYPES.find(t => t.id === outline.contentType);
                      const variation = type?.variations.find(v => v.id === outline.variation);

                      return (
                        <motion.div
                          key={angle.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className={`bg-[#111113] border rounded-2xl overflow-hidden transition-all ${
                            outline.isComplete
                              ? 'border-emerald-500/20'
                              : isExpanded
                              ? 'border-blue-500/20'
                              : 'border-white/[0.06]'
                          }`}
                        >
                          {/* Accordion Header */}
                          <button
                            onClick={() => setExpandedAngle(isExpanded ? null : angle.id)}
                            className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors"
                          >
                            {outline.isComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-bold text-white truncate">{angle.title}</h3>
                              {!isExpanded && outline.hook && (
                                <p className="text-xs text-zinc-500 truncate mt-0.5">{outline.hook}</p>
                              )}
                            </div>
                            {type && (
                              <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${type.color.bg} ${type.color.text} ${type.color.border}`}>
                                {type.name}
                              </span>
                            )}
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                            )}
                          </button>

                          {/* Accordion Body */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 border-t border-white/[0.04]">

                                  {/* Type + Variation Selectors */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-5">
                                    <div>
                                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Content Type</label>
                                      <select
                                        value={outline.contentType}
                                        onChange={e => changeContentType(angle.id, e.target.value)}
                                        className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 appearance-none cursor-pointer"
                                      >
                                        {CONTENT_TYPES.map(t => (
                                          <option key={t.id} value={t.id}>{t.name} — {t.purpose}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Variation</label>
                                      <select
                                        value={outline.variation}
                                        onChange={e => changeVariation(angle.id, e.target.value)}
                                        className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 appearance-none cursor-pointer"
                                      >
                                        {type?.variations.map(v => (
                                          <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  {/* Hook */}
                                  <div className="mb-5">
                                    <div className="flex items-center justify-between mb-1.5">
                                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Hook</label>
                                      <button
                                        onClick={() => suggestHook(angle.id)}
                                        disabled={suggestingField === `${angle.id}-hook`}
                                        className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 disabled:opacity-50"
                                      >
                                        {suggestingField === `${angle.id}-hook` ? (
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                          <Zap className="w-3 h-3" />
                                        )}
                                        AI Suggest
                                      </button>
                                    </div>
                                    <input
                                      value={outline.hook}
                                      onChange={e => updateOutline(angle.id, { hook: e.target.value })}
                                      placeholder="The opening line. Under 15 words. Contrarian or vulnerable."
                                      className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 transition-colors"
                                    />
                                  </div>

                                  {/* Steps */}
                                  <div className="space-y-3 mb-5">
                                    {outline.steps.map((step, j) => {
                                      const frameworkStep = variation?.steps[j];
                                      const fieldKey = `${angle.id}-${j}`;
                                      return (
                                        <div key={j}>
                                          <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                              <span className="text-[11px] font-bold text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded">
                                                {j + 1}
                                              </span>
                                              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                                                {step.label}
                                              </label>
                                            </div>
                                            <button
                                              onClick={() => suggestField(angle.id, step.label, j)}
                                              disabled={suggestingField === fieldKey}
                                              className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 disabled:opacity-50"
                                            >
                                              {suggestingField === fieldKey ? (
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                              ) : (
                                                <Zap className="w-3 h-3" />
                                              )}
                                              AI Suggest
                                            </button>
                                          </div>
                                          {frameworkStep?.hint && (
                                            <p className="text-[11px] text-zinc-600 mb-1.5 italic">{frameworkStep.hint}</p>
                                          )}
                                          <textarea
                                            value={step.content}
                                            onChange={e => updateStep(angle.id, j, e.target.value)}
                                            placeholder={frameworkStep?.hint || 'Fill this step...'}
                                            className="w-full min-h-[70px] bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 resize-y leading-relaxed placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/30 transition-colors"
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Trust Layer */}
                                  <div className="mb-5">
                                    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Trust Layer</label>
                                    <div className="flex flex-wrap gap-2">
                                      {TRUST_LAYERS.map(tl => (
                                        <button
                                          key={tl.id}
                                          onClick={() => updateOutline(angle.id, { trustLayer: tl.name })}
                                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                                            outline.trustLayer === tl.name
                                              ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                                              : 'border-white/[0.06] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300'
                                          }`}
                                          title={tl.description}
                                        >
                                          {tl.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Fill All Button */}
                                  <button
                                    onClick={() => fillAll(angle.id)}
                                    disabled={suggestingAll === angle.id}
                                    className="w-full py-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] text-blue-400 text-sm font-semibold hover:bg-blue-500/[0.12] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                  >
                                    {suggestingAll === angle.id ? (
                                      <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Filling empty fields...
                                      </>
                                    ) : (
                                      <>
                                        <Zap className="w-4 h-4" />
                                        Fill All Empty Fields
                                      </>
                                    )}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => goToStage(2)}
                      className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 font-medium hover:border-zinc-600 hover:text-white transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={() => goToStage(4)}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      Review & Export
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Right Sidebar (desktop only) */}
                {showSidebar && (
                  <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-4">
                      {/* Hook Types Reference */}
                      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Hook Types</h4>
                        <div className="space-y-3">
                          {HOOK_TYPES.map(ht => (
                            <div key={ht.name}>
                              <p className="text-[11px] font-semibold text-white mb-0.5">{ht.name}</p>
                              <p className="text-[11px] text-zinc-500 leading-relaxed">{ht.formula}</p>
                              <p className="text-[11px] text-zinc-600 italic">{ht.example}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trust Layers Reference */}
                      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Trust Layers</h4>
                        <div className="space-y-2">
                          {TRUST_LAYERS.map(tl => (
                            <div key={tl.id}>
                              <p className="text-[11px] font-semibold text-white">{tl.name}</p>
                              <p className="text-[11px] text-zinc-500">{tl.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Framework Quick Ref */}
                      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Types at a Glance</h4>
                        <div className="space-y-2">
                          {CONTENT_TYPES.map(t => (
                            <div key={t.id} className="flex items-start gap-2">
                              <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${t.color.bg} ${t.color.text} mt-0.5`}>
                                {t.name}
                              </span>
                              <p className="text-[11px] text-zinc-500 leading-relaxed">{t.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </motion.section>
        )}

        {/* ====== STAGE 4: REVIEW & EXPORT ====== */}
        {currentStage === 4 && (
          <motion.section
            key="stage-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <Container>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-blue-400">Review & Export</p>
                  <p className="text-sm font-semibold text-zinc-500">
                    {completedOutlines.length} of {selectedAngles.length} complete
                  </p>
                </div>
                <p className="text-sm text-zinc-500 mb-6">
                  Review your outlines, check the value lenses, save your work.
                </p>

                {/* Preview Cards */}
                <div className="space-y-4 mb-8">
                  {selectedAngles.map((angle, i) => {
                    const outline = outlines[angle.id];
                    if (!outline) return null;

                    const type = CONTENT_TYPES.find(t => t.id === outline.contentType);
                    const variation = type?.variations.find(v => v.id === outline.variation);

                    return (
                      <motion.div
                        key={angle.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden hover:border-white/[0.10] transition-all"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                        <div className="absolute top-5 right-6 text-[64px] font-black text-white/[0.03] leading-none select-none">
                          {String(i + 1).padStart(2, '0')}
                        </div>

                        <div className="relative">
                          <div className="flex items-center gap-2 mb-4 flex-wrap">
                            {type && (
                              <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${type.color.bg} ${type.color.text} ${type.color.border}`}>
                                {type.name}
                              </span>
                            )}
                            <span className="text-[11px] font-medium text-zinc-500 tracking-wide">
                              {variation?.name}
                            </span>
                            {outline.trustLayer && (
                              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] ml-auto">
                                {outline.trustLayer}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-semibold text-zinc-400 mb-1">{angle.title}</h3>
                          <p className="text-lg font-bold text-white mb-5 leading-snug tracking-tight">
                            {outline.hook || <span className="text-zinc-600 italic">No hook set</span>}
                          </p>

                          <ul className="space-y-0">
                            {outline.steps.map((s, j) => (
                              <li
                                key={j}
                                className="relative pl-7 py-2.5 border-b border-white/[0.04] last:border-b-0 text-sm text-zinc-400 leading-relaxed"
                              >
                                <div className="absolute left-0 top-[14px] w-2.5 h-2.5 rounded-sm bg-blue-500/10 border-[1.5px] border-blue-500/30" />
                                <strong className="text-white font-semibold">{s.label}:</strong>{' '}
                                {s.content || <span className="text-zinc-700 italic">Empty</span>}
                              </li>
                            ))}
                          </ul>

                          {!outline.isComplete && (
                            <button
                              onClick={() => { setExpandedAngle(angle.id); goToStage(3); }}
                              className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              Edit this outline
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Value Lenses Check */}
                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-6">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Five Value Lenses Check</h4>
                  <p className="text-[11px] text-zinc-500 mb-4">Does your content set hit at least one of these?</p>
                  <div className="space-y-2">
                    {VALUE_LENSES.map(lens => (
                      <label
                        key={lens.name}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          onClick={() => setValueLensChecks(prev => ({ ...prev, [lens.name]: !prev[lens.name] }))}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                            valueLensChecks[lens.name]
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-zinc-700 group-hover:border-zinc-500'
                          }`}
                        >
                          {valueLensChecks[lens.name] && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white">{lens.name}</span>
                          <span className="text-xs text-zinc-500 ml-2">{lens.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Save & Export */}
                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-6">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Save & Export</h4>

                  {!saved ? (
                    <>
                      <div className="mb-4">
                        <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Email (to save your work)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 transition-colors"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={saveToSupabase}
                          disabled={saving || !email.trim()}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-sm tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save to Cloud
                            </>
                          )}
                        </button>
                        <button
                          onClick={downloadExport}
                          className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-400 font-semibold text-sm hover:border-zinc-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download .txt
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                      <p className="text-white font-semibold mb-1">Saved.</p>
                      <p className="text-sm text-zinc-500">Your outlines are stored. Come back anytime with the same email.</p>
                      <button
                        onClick={downloadExport}
                        className="mt-4 px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 font-semibold text-sm hover:border-zinc-600 hover:text-white transition-all inline-flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Also download .txt
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={() => goToStage(3)}
                    className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 font-medium hover:border-zinc-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Build
                  </button>
                </div>
              </div>
            </Container>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Want the full system?
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              This tool gives you the outlines. The Authority Engine gives you the brand, the strategy, the operator, and the system to ship content every week without burning out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://form.typeform.com/to/S2rogsdT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)] transition-all"
              >
                Apply to work together
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/resources"
                className="inline-flex items-center justify-center gap-2 border border-zinc-800 text-zinc-400 font-medium px-8 py-3.5 rounded-full hover:border-zinc-600 hover:text-white transition-all"
              >
                Explore more tools
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
