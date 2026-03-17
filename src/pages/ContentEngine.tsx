import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Loader2, ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

const SUPABASE_URL = 'https://pwgdlvvrkyxptcsaztzc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z2RsdnZya3l4cHRjc2F6dHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzE5MTEsImV4cCI6MjA4ODc0NzkxMX0.BLpG9A539wmcxrJ40klJ9zs1cPZNdC1TfbPBXvBpWqg';

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

interface OutlineStep {
  label: string;
  content: string;
}

interface Outline {
  number: number;
  type: string;
  variation: string;
  trustLayer: string;
  hook: string;
  steps: OutlineStep[];
}

const typeStyles: Record<string, { bg: string; text: string; border: string }> = {
  'Story': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  'Hot Take': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  'Breakdown': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Demonstration': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
};

export default function ContentEngine() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [outlines, setOutlines] = useState<Outline[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recording, setRecording] = useState<Record<string, boolean>>({});
  const [transcribing, setTranscribing] = useState<Record<string, boolean>>({});
  const recorders = useRef<Record<string, MediaRecorder>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  const filledCount = Object.values(answers).filter(v => v.trim().length > 0).length;

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

  async function generate() {
    setError('');

    const answered = questions
      .filter(q => (answers[q.id] || '').trim().length > 0)
      .map(q => ({ label: q.apiLabel, value: answers[q.id].trim() }));

    if (answered.length < 3) {
      setError('Answer at least 3 of the 5 questions before generating.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-content-outlines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ answers: answered }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error: ${res.status}`);
      }

      const data = await res.json();
      setOutlines(data.outlines);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
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
              <span className="text-sm text-blue-300/90 font-medium">Content Engine</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">5 questions.</span>
              <br />
              <GradientText>7 pieces of content.</GradientText>
            </motion.h1>

            <motion.p
              className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Answer at least 3 of the 5 questions below. Get back seven ready to film content outlines built on proven frameworks.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Capture */}
      <section className="pb-16 px-4">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400">Your inputs</p>
              <p className={`text-sm font-semibold ${filledCount >= 3 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {filledCount} of 5 answered {filledCount >= 3 ? ' ✓ ready' : ' (minimum 3)'}
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
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

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              onClick={generate}
              disabled={loading}
              className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Building your content...
                </>
              ) : (
                'Generate 7 Content Outlines'
              )}
            </motion.button>
          </div>
        </Container>
      </section>

      {/* Results */}
      {outlines.length > 0 && (
        <section ref={resultsRef} className="py-16 px-4 border-t border-zinc-800/60">
          <Container>
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">Your content</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                7 Ready to Film <GradientText>Outlines</GradientText>
              </h2>
              <p className="text-zinc-400 text-sm mb-10 leading-relaxed">
                Each outline uses a different framework so you get range across your content. Hook, structure, and the belief it shifts.
              </p>

              <div className="space-y-4">
                {outlines.map((o, i) => {
                  const style = typeStyles[o.type] || typeStyles['Breakdown'];
                  return (
                    <motion.div
                      key={i}
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
                          <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                            {o.type}
                          </span>
                          <span className="text-[11px] font-medium text-zinc-500 tracking-wide">
                            {o.variation}
                          </span>
                          <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] ml-auto">
                            {o.trustLayer}
                          </span>
                        </div>

                        <p className="text-lg font-bold text-white mb-5 leading-snug tracking-tight">
                          {o.hook}
                        </p>

                        <ul className="space-y-0">
                          {o.steps.map((s, j) => (
                            <li
                              key={j}
                              className="relative pl-7 py-2.5 border-b border-white/[0.04] last:border-b-0 text-sm text-zinc-400 leading-relaxed"
                            >
                              <div className="absolute left-0 top-[14px] w-2.5 h-2.5 rounded-sm bg-blue-500/10 border-[1.5px] border-blue-500/30" />
                              <strong className="text-white font-semibold">{s.label}:</strong> {s.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

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
