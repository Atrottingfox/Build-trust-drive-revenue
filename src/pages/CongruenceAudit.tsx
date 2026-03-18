import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, Plus, X, AlertTriangle, CheckCircle2, XCircle, Minus, Mail, Target } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

const SUPABASE_URL = 'https://pwgdlvvrkyxptcsaztzc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z2RsdnZya3l4cHRjc2F6dHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzE5MTEsImV4cCI6MjA4ODc0NzkxMX0.BLpG9A539wmcxrJ40klJ9zs1cPZNdC1TfbPBXvBpWqg';

// --- The 5 Belief Types ---

interface BeliefType {
  id: string;
  name: string;
  question: string;
  description: string;
  example: string;
}

const BELIEF_TYPES: BeliefType[] = [
  {
    id: 'category',
    name: 'Category',
    question: 'Do they believe this TYPE of solution works?',
    description: '"Coaching works." "Content marketing is worth investing in." "Hiring an agency is the right move." If they don\'t believe in the category, nothing else matters.',
    example: 'If you sell coaching, your content needs to shift "I can figure this out myself" → "Having a guide accelerates everything."',
  },
  {
    id: 'product',
    name: 'Product',
    question: 'Do they believe YOUR specific approach works?',
    description: '"This particular framework is different." "This system has something others don\'t." They believe in the category but need to believe your method is the right one.',
    example: 'Content that shows your methodology in action. Breakdowns, case studies, framework reveals.',
  },
  {
    id: 'brand',
    name: 'Brand',
    question: 'Do they believe YOU are the right person?',
    description: '"This person gets it." "I trust their judgement." They believe in the approach, now they need to trust the human behind it.',
    example: 'Vulnerability, origin stories, behind the scenes. Content that builds "he\'s like me" and "he sees me."',
  },
  {
    id: 'self',
    name: 'Self',
    question: 'Do they believe THEY can do it?',
    description: '"I\'m capable of this." "This is achievable for someone like me." The hardest belief to shift. Most people buy coaching not because they doubt you, but because they doubt themselves.',
    example: 'Client transformation stories featuring people similar to your ICP. "If they did it, I can too."',
  },
  {
    id: 'timing',
    name: 'Timing',
    question: 'Do they believe NOW is the right time?',
    description: '"I should start today, not next quarter." "The cost of waiting is higher than the cost of starting." This is what turns intent into action.',
    example: 'Content about the cost of inaction, seasonal urgency, "what I wish I\'d done sooner" stories.',
  },
];

// --- Content Jobs ---

const CONTENT_JOBS = [
  { id: 'demand', name: 'Demand', description: 'Creates awareness. Gets new eyeballs. Earns attention.' },
  { id: 'nurture', name: 'Nurture', description: 'Builds relationship. Deepens trust. Keeps them coming back.' },
  { id: 'proof', name: 'Proof', description: 'Demonstrates results. Shows the system works. Removes doubt.' },
  { id: 'conversion', name: 'Conversion Assist', description: 'Directly addresses objections. Makes the decision easy. Sells the next step.' },
];

// --- Types ---

interface ContentPiece {
  id: string;
  title: string;
  beliefs: Record<string, boolean>;
  job: string;
}

interface AuditResult {
  congruenceScore: number;
  beliefCoverage: Record<string, { count: number; percentage: number }>;
  jobDistribution: Record<string, number>;
  gaps: string[];
  strengths: string[];
  diagnosis: string;
  prescription: string[];
}

// --- Component ---

export default function CongruenceAudit() {
  const [stage, setStage] = useState<'offer' | 'content' | 'results'>('offer');

  // Offer
  const [offerDescription, setOfferDescription] = useState('');
  const [offerOutcome, setOfferOutcome] = useState('');

  // Content
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentBeliefs, setCurrentBeliefs] = useState<Record<string, boolean>>({});
  const [currentJob, setCurrentJob] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Results
  const [result, setResult] = useState<AuditResult | null>(null);
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  // --- Content Management ---

  function addPiece() {
    if (!currentTitle.trim()) return;
    const piece: ContentPiece = {
      id: editingId || `piece-${Date.now()}`,
      title: currentTitle.trim(),
      beliefs: { ...currentBeliefs },
      job: currentJob,
    };

    if (editingId) {
      setPieces(prev => prev.map(p => p.id === editingId ? piece : p));
      setEditingId(null);
    } else {
      setPieces(prev => [...prev, piece]);
    }

    setCurrentTitle('');
    setCurrentBeliefs({});
    setCurrentJob('');
    setShowAddForm(false);
  }

  function editPiece(piece: ContentPiece) {
    setEditingId(piece.id);
    setCurrentTitle(piece.title);
    setCurrentBeliefs(piece.beliefs);
    setCurrentJob(piece.job);
    setShowAddForm(true);
  }

  function removePiece(id: string) {
    setPieces(prev => prev.filter(p => p.id !== id));
  }

  // --- Analysis ---

  function runAudit() {
    if (pieces.length < 5) return;

    const total = pieces.length;

    // Belief coverage
    const beliefCoverage: Record<string, { count: number; percentage: number }> = {};
    for (const bt of BELIEF_TYPES) {
      const count = pieces.filter(p => p.beliefs[bt.id]).length;
      beliefCoverage[bt.id] = { count, percentage: Math.round((count / total) * 100) };
    }

    // Job distribution
    const jobDistribution: Record<string, number> = {};
    for (const job of CONTENT_JOBS) {
      jobDistribution[job.id] = pieces.filter(p => p.job === job.id).length;
    }

    // Gaps
    const gaps: string[] = [];
    const strengths: string[] = [];

    for (const bt of BELIEF_TYPES) {
      const pct = beliefCoverage[bt.id].percentage;
      if (pct === 0) {
        gaps.push(`Zero content shifting ${bt.name} belief. "${bt.question}" is completely unanswered by your content.`);
      } else if (pct < 20) {
        gaps.push(`${bt.name} belief is underserved (${pct}%). You need more content that answers: "${bt.question}"`);
      } else if (pct >= 40) {
        strengths.push(`Strong ${bt.name} belief coverage (${pct}%). Your audience knows the answer to "${bt.question}"`);
      }
    }

    // Job gaps
    if (jobDistribution.proof === 0) {
      gaps.push('No proof content. You\'re asking people to trust your system without ever showing it works.');
    }
    if (jobDistribution.conversion === 0) {
      gaps.push('No conversion content. You\'re building trust but never giving them a reason to take the next step.');
    }
    if (jobDistribution.demand === 0) {
      gaps.push('No demand content. You\'re speaking to the converted but not growing your audience.');
    }

    // Congruence score
    const beliefSpread = Object.values(beliefCoverage).filter(b => b.percentage > 0).length;
    const jobSpread = Object.values(jobDistribution).filter(j => j > 0).length;
    const beliefBalance = beliefSpread / BELIEF_TYPES.length;
    const jobBalance = jobSpread / CONTENT_JOBS.length;
    const congruenceScore = Math.round(((beliefBalance * 0.6) + (jobBalance * 0.4)) * 100);

    // Diagnosis
    let diagnosis = '';
    if (congruenceScore >= 80) {
      diagnosis = 'Your content and offer are well aligned. Your audience is getting the beliefs they need to buy. Focus on depth and consistency.';
    } else if (congruenceScore >= 50) {
      diagnosis = 'Partial alignment. Some beliefs are being built, others are being completely ignored. Your audience has gaps in their understanding of why they should buy from you, right now.';
    } else {
      diagnosis = 'Significant misalignment. If someone watched your last 10 pieces of content, they wouldn\'t know what you sell or why they should buy it. Your content is building attention but not building the beliefs required to purchase.';
    }

    // Prescription
    const prescription: string[] = [];
    const weakest = Object.entries(beliefCoverage).sort((a, b) => a[1].percentage - b[1].percentage);

    for (const [beliefId, data] of weakest.slice(0, 2)) {
      const belief = BELIEF_TYPES.find(b => b.id === beliefId)!;
      if (data.percentage < 30) {
        prescription.push(`Create 2-3 pieces this week that directly address: "${belief.question}" ${belief.example}`);
      }
    }

    if (jobDistribution.proof === 0 || jobDistribution.proof < 2) {
      prescription.push('Add at least 1 proof piece per week. Client results, case studies, before/after, process breakdowns.');
    }

    if (!prescription.length) {
      prescription.push('Your coverage is solid. Focus on making each piece hit harder. Test hooks, vary formats, increase conviction.');
    }

    setResult({ congruenceScore, beliefCoverage, jobDistribution, gaps, strengths, diagnosis, prescription });
    setStage('results');
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Save ---

  async function saveAudit() {
    if (!email.trim() || !result) return;
    setSaving(true);

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      const { data: contact } = await supabase
        .from('contacts')
        .upsert({ email: email.trim(), source: 'congruence_audit' }, { onConflict: 'email' })
        .select('id')
        .single();

      if (contact) {
        await supabase.from('interactions').insert({
          contact_id: contact.id,
          type: 'congruence_audit',
          description: JSON.stringify({
            offer: { description: offerDescription, outcome: offerOutcome },
            pieces: pieces.length,
            congruenceScore: result.congruenceScore,
            beliefCoverage: result.beliefCoverage,
            jobDistribution: result.jobDistribution,
            gaps: result.gaps,
          }),
        });
      }

      setSaved(true);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }

  // --- Render ---

  const scoreColor = result
    ? result.congruenceScore >= 80 ? 'text-emerald-400' : result.congruenceScore >= 50 ? 'text-amber-400' : 'text-red-400'
    : '';
  const scoreBg = result
    ? result.congruenceScore >= 80 ? 'from-emerald-500/20' : result.congruenceScore >= 50 ? 'from-amber-500/20' : 'from-red-500/20'
    : '';

  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <div ref={topRef} />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08)_0%,rgba(99,102,241,0.03)_40%,transparent_70%)] pointer-events-none" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300/90 font-medium">Offer-Content Congruence Audit</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-white">Does your content</span><br />
              <GradientText>sell your offer?</GradientText>
            </motion.h1>

            <motion.p
              className="text-base text-zinc-400 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              If someone watched your last 10 pieces of content, would they know exactly what you sell and why they should buy it? Most people's answer is no. This audit shows you why.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-8">
        <Container>
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">

              {/* === STAGE: OFFER === */}
              {stage === 'offer' && (
                <motion.div key="offer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

                  <div className="mb-6">
                    <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-1">Step 1</p>
                    <h2 className="text-2xl font-bold text-white">Define your offer</h2>
                    <p className="text-sm text-zinc-500 mt-1">We need to know what you sell so we can check if your content is building the right beliefs.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">What do you sell? (one sentence)</label>
                      <input
                        value={offerDescription}
                        onChange={e => setOfferDescription(e.target.value)}
                        placeholder='e.g. "90 day content system build for 7 figure founders"'
                        className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 transition-colors"
                      />
                    </div>

                    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
                      <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">What outcome does it deliver?</label>
                      <input
                        value={offerOutcome}
                        onChange={e => setOfferOutcome(e.target.value)}
                        placeholder='e.g. "A documented authority engine with an operator running it"'
                        className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* 5 Beliefs Education */}
                  <div className="mt-8 mb-6">
                    <h3 className="text-sm font-bold text-white mb-3">The 5 beliefs someone needs before they buy</h3>
                    <p className="text-xs text-zinc-500 mb-4">Every sale requires all 5. Your content should be building each one. Most people only build 1 or 2.</p>
                    <div className="space-y-2">
                      {BELIEF_TYPES.map((bt, i) => (
                        <div key={bt.id} className="bg-[#111113] border border-white/[0.06] rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded mt-0.5">{i + 1}</span>
                            <div>
                              <p className="text-sm font-semibold text-white">{bt.name}: {bt.question}</p>
                              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{bt.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setStage('content'); topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    disabled={!offerDescription.trim()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    Next: Add Your Content
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* === STAGE: CONTENT === */}
              {stage === 'content' && (
                <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

                  <div className="mb-6">
                    <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-1">Step 2</p>
                    <h2 className="text-2xl font-bold text-white">Map your content</h2>
                    <p className="text-sm text-zinc-500 mt-1">Add your last 5-10 pieces of content. For each, tag which beliefs it builds and what job it does.</p>
                  </div>

                  {/* Offer Summary */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6 flex items-start gap-3">
                    <Target className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500">Your offer</p>
                      <p className="text-sm text-white font-medium">{offerDescription}</p>
                    </div>
                  </div>

                  {/* Added Pieces */}
                  {pieces.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {pieces.map((piece, i) => {
                        const beliefCount = Object.values(piece.beliefs).filter(Boolean).length;
                        const job = CONTENT_JOBS.find(j => j.id === piece.job);
                        return (
                          <div key={piece.id} className="bg-[#111113] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3 group">
                            <span className="text-[11px] font-bold text-zinc-600 w-6 text-center">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{piece.title}</p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {BELIEF_TYPES.filter(bt => piece.beliefs[bt.id]).map(bt => (
                                  <span key={bt.id} className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">{bt.name}</span>
                                ))}
                                {beliefCount === 0 && <span className="text-[9px] text-zinc-600">No beliefs tagged</span>}
                                {job && <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/[0.04] text-zinc-500">{job.name}</span>}
                              </div>
                            </div>
                            <button onClick={() => editPiece(piece)} className="text-zinc-600 hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => removePiece(piece.id)} className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Form */}
                  <AnimatePresence>
                    {showAddForm ? (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-4">
                        <div className="bg-[#111113] border border-blue-500/20 rounded-2xl p-5 space-y-4">
                          <div>
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Content title or topic</label>
                            <input
                              value={currentTitle}
                              onChange={e => setCurrentTitle(e.target.value)}
                              placeholder='"Why most coaches fail at content" or "Client case study: 2x revenue"'
                              className="w-full bg-[#18181b] border border-white/[0.06] rounded-xl text-white text-sm p-3 focus:outline-none focus:border-blue-500/30"
                              autoFocus
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Which beliefs does this content build?</label>
                            <div className="space-y-1.5">
                              {BELIEF_TYPES.map(bt => (
                                <button
                                  key={bt.id}
                                  onClick={() => setCurrentBeliefs(prev => ({ ...prev, [bt.id]: !prev[bt.id] }))}
                                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                                    currentBeliefs[bt.id]
                                      ? 'border-blue-500/30 bg-blue-500/[0.06]'
                                      : 'border-white/[0.04] hover:border-white/[0.08]'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                    currentBeliefs[bt.id] ? 'border-blue-500 bg-blue-500' : 'border-zinc-700'
                                  }`}>
                                    {currentBeliefs[bt.id] && <Check className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  <div>
                                    <span className="text-xs font-semibold text-white">{bt.name}</span>
                                    <span className="text-[11px] text-zinc-500 ml-2">{bt.question}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">What job does this content do?</label>
                            <div className="grid grid-cols-2 gap-2">
                              {CONTENT_JOBS.map(job => (
                                <button
                                  key={job.id}
                                  onClick={() => setCurrentJob(job.id)}
                                  className={`text-left p-3 rounded-lg border transition-all ${
                                    currentJob === job.id
                                      ? 'border-blue-500/30 bg-blue-500/[0.06]'
                                      : 'border-white/[0.04] hover:border-white/[0.08]'
                                  }`}
                                >
                                  <p className="text-xs font-semibold text-white">{job.name}</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">{job.description}</p>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button onClick={addPiece} disabled={!currentTitle.trim()} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 disabled:opacity-50 transition-colors">
                              {editingId ? 'Update' : 'Add'}
                            </button>
                            <button onClick={() => { setShowAddForm(false); setEditingId(null); setCurrentTitle(''); setCurrentBeliefs({}); setCurrentJob(''); }} className="px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full py-3 rounded-xl border border-dashed border-zinc-800 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-all flex items-center justify-center gap-2 mb-4"
                      >
                        <Plus className="w-4 h-4" />
                        Add a piece of content
                      </button>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setStage('offer')} className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 font-medium hover:border-zinc-600 hover:text-white transition-all flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={runAudit}
                      disabled={pieces.length < 5}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                    >
                      {pieces.length < 5 ? `Add ${5 - pieces.length} more pieces (minimum 5)` : 'Run the Audit'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* === STAGE: RESULTS === */}
              {stage === 'results' && result && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                  {/* Score */}
                  <div className={`bg-[#111113] border border-white/[0.06] rounded-2xl p-8 mb-6 text-center relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-b ${scoreBg} to-transparent opacity-30 pointer-events-none`} />
                    <div className="relative">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Offer-Content Congruence</p>
                      <p className={`text-6xl font-black ${scoreColor} mb-2`}>{result.congruenceScore}</p>
                      <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">{result.diagnosis}</p>
                    </div>
                  </div>

                  {/* Belief Coverage */}
                  <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Belief Coverage</h3>
                    <div className="space-y-3">
                      {BELIEF_TYPES.map(bt => {
                        const data = result.beliefCoverage[bt.id];
                        const pct = data.percentage;
                        const barColor = pct === 0 ? 'bg-red-500' : pct < 20 ? 'bg-amber-500' : 'bg-emerald-500';
                        const icon = pct === 0 ? <XCircle className="w-4 h-4 text-red-400" /> : pct < 20 ? <Minus className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
                        return (
                          <div key={bt.id}>
                            <div className="flex items-center gap-2 mb-1">
                              {icon}
                              <span className="text-sm font-semibold text-white flex-1">{bt.name}</span>
                              <span className="text-xs text-zinc-500">{data.count}/{pieces.length} pieces ({pct}%)</span>
                            </div>
                            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden ml-6">
                              <motion.div className={`h-full rounded-full ${barColor}`} initial={{ width: 0 }} animate={{ width: `${Math.max(pct, 2)}%` }} transition={{ duration: 0.5, delay: 0.2 }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Content Job Distribution */}
                  <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Content Job Distribution</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {CONTENT_JOBS.map(job => {
                        const count = result.jobDistribution[job.id] || 0;
                        return (
                          <div key={job.id} className={`rounded-xl p-4 text-center border ${count === 0 ? 'bg-red-500/[0.04] border-red-500/10' : 'bg-white/[0.02] border-white/[0.04]'}`}>
                            <p className={`text-2xl font-black ${count === 0 ? 'text-red-400' : 'text-white'}`}>{count}</p>
                            <p className="text-xs font-semibold text-zinc-400 mt-0.5">{job.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gaps */}
                  {result.gaps.length > 0 && (
                    <div className="bg-red-500/[0.04] border border-red-500/10 rounded-2xl p-6 mb-4">
                      <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" /> Gaps
                      </h3>
                      <ul className="space-y-2">
                        {result.gaps.map((gap, i) => (
                          <li key={i} className="text-sm text-zinc-400 leading-relaxed pl-4 border-l-2 border-red-500/20">{gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Strengths */}
                  {result.strengths.length > 0 && (
                    <div className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-2xl p-6 mb-4">
                      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-zinc-400 leading-relaxed pl-4 border-l-2 border-emerald-500/20">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Prescription */}
                  <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-6">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">What to do this week</h3>
                    <ul className="space-y-3">
                      {result.prescription.map((rx, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                          <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">{i + 1}</span>
                          {rx}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Save */}
                  {!saved ? (
                    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">Save your audit</p>
                          <p className="text-xs text-zinc-500">Get a copy and track your progress over time.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                          className="flex-1 bg-[#18181b] border border-white/[0.06] rounded-lg text-white text-sm px-3 py-2.5 focus:outline-none focus:border-blue-500/30"
                          onKeyDown={e => e.key === 'Enter' && saveAudit()}
                        />
                        <button onClick={saveAudit} disabled={saving || !email.trim()}
                          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-2xl p-5 mb-6 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-white">Saved.</p>
                    </div>
                  )}

                  {/* Back */}
                  <button onClick={() => { setStage('content'); topRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Edit content and re-run
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Want help closing the gaps?</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              The Authority Engine is a consulting partnership that aligns your brand, content, and offer into one system. Every piece of content builds the beliefs your audience needs to buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://form.typeform.com/to/S2rogsdT" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)] transition-all"
              >
                Apply to work together <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/resources"
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
