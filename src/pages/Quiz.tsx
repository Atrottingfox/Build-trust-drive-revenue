import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, ChevronRight, ChevronDown, Mail, Zap, Target, BookOpen, Layout, Users, Clock, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';

const SUPABASE_URL = 'https://pwgdlvvrkyxptcsaztzc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z2RsdnZya3l4cHRjc2F6dHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzE5MTEsImV4cCI6MjA4ODc0NzkxMX0.BLpG9A539wmcxrJ40klJ9zs1cPZNdC1TfbPBXvBpWqg';

// --- Types ---

interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  type: 'select' | 'text';
  options?: QuizOption[];
  placeholder?: string;
}

interface LeadMagnetType {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  coreTrigger: string;
  color: { bg: string; text: string; border: string; glow: string };
  description: string;
  howItWorks: string;
  exampleTemplate: string;
  personalisationTip: string;
  buildTime: string;
  tools: string[];
  conversionRate: string;
  commonMistake: string;
}

interface QuizResult {
  primary: LeadMagnetType;
  secondary: LeadMagnetType;
  scores: Record<string, number>;
  personalised: {
    whyThis: string;
    specificExample: string;
    backendPlay: string;
  };
}

// --- Questions ---

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'business',
    question: 'Describe your business in one sentence.',
    subtitle: 'Who do you help and what do you help them do? Be specific.',
    type: 'text',
    placeholder: 'e.g. "I help e-commerce brands scale to $10M with Meta ads" or "I coach executive women through career transitions"',
  },
  {
    id: 'offer',
    question: 'What do you sell?',
    subtitle: 'Pick the closest match to your primary offer.',
    type: 'select',
    options: [
      { id: 'service', label: 'Done for you service', sublabel: 'Agency, freelance, implementation' },
      { id: 'coaching', label: 'Coaching or consulting', sublabel: '1:1, group, advisory' },
      { id: 'course', label: 'Course or program', sublabel: 'Digital product, membership, community' },
      { id: 'saas', label: 'Software or SaaS', sublabel: 'App, platform, tool' },
      { id: 'agency', label: 'Agency or productised service', sublabel: 'Retainers, packages, managed service' },
    ],
  },
  {
    id: 'price',
    question: "What's your price point?",
    subtitle: 'Your primary offer, not your cheapest.',
    type: 'select',
    options: [
      { id: 'under1k', label: 'Under $1,000' },
      { id: '1k-5k', label: '$1,000 - $5,000' },
      { id: '5k-15k', label: '$5,000 - $15,000' },
      { id: '15k+', label: '$15,000+' },
    ],
  },
  {
    id: 'leads',
    question: 'Where do most of your leads come from right now?',
    subtitle: 'Be honest. Where are the majority actually coming from?',
    type: 'select',
    options: [
      { id: 'organic', label: 'Organic content', sublabel: 'Social media, YouTube, blog' },
      { id: 'paid', label: 'Paid ads', sublabel: 'Meta, Google, LinkedIn ads' },
      { id: 'referrals', label: 'Referrals and word of mouth', sublabel: 'Network, past clients, introductions' },
      { id: 'outbound', label: 'Outbound', sublabel: 'Cold email, DMs, events' },
      { id: 'none', label: "I don't have a reliable source yet", sublabel: "It's inconsistent or random" },
    ],
  },
  {
    id: 'bottleneck',
    question: "What's the real bottleneck?",
    subtitle: "If you could fix one thing tomorrow, what would move the needle most?",
    type: 'select',
    options: [
      { id: 'volume', label: 'Not enough leads', sublabel: "Pipeline is dry. Can't fill the calendar." },
      { id: 'quality', label: 'Wrong leads', sublabel: 'Getting interest but from people who can\'t afford it or aren\'t the right fit.' },
      { id: 'conversion', label: "Leads don't convert", sublabel: 'People show up but don\'t buy. Something breaks between interest and purchase.' },
      { id: 'all', label: 'All of the above', sublabel: 'The whole system needs work.' },
    ],
  },
  {
    id: 'time',
    question: 'How much time can you put into this?',
    subtitle: 'Building and maintaining the lead magnet.',
    type: 'select',
    options: [
      { id: 'passive', label: 'Set and forget', sublabel: 'Build it once, let it run. I\'m time poor.' },
      { id: 'moderate', label: 'A few hours to build, then it runs', sublabel: 'I can invest upfront but need it automated after.' },
      { id: 'active', label: 'I can show up live regularly', sublabel: 'Weekly or monthly live delivery is fine.' },
    ],
  },
];

// --- Lead Magnet Types ---

const LEAD_MAGNET_TYPES: LeadMagnetType[] = [
  {
    id: 'diagnostic',
    name: 'Diagnostic',
    icon: <Target className="w-5 h-5" />,
    tagline: 'Reveal the problem they can\'t name.',
    coreTrigger: 'Problem revelation',
    color: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', glow: 'rgba(139,92,246,0.15)' },
    description: 'An interactive assessment where the prospect answers questions and gets a personalised score, category, or gap analysis.',
    howItWorks: 'Build 8-15 questions across 3-4 categories. Score responses. Deliver a result page with their category, their biggest gap, and one clear next step.',
    exampleTemplate: '"The [Your Topic] Scorecard" or "[Industry] Readiness Assessment"',
    personalisationTip: 'Create 3-5 distinct result categories. Each one gets different copy, different next steps, and a different email sequence.',
    buildTime: '1-2 weekends',
    tools: ['ScoreApp', 'Typeform + Zapier', 'Custom build (React)'],
    conversionRate: '30-50%',
    commonMistake: 'Making the questions too generic. "How would you rate your marketing?" tells you nothing. "How many qualified leads did you generate from content last month?" reveals everything.',
  },
  {
    id: 'tool',
    name: 'Tool',
    icon: <Zap className="w-5 h-5" />,
    tagline: 'Give them their number in 60 seconds.',
    coreTrigger: 'Speed + specificity',
    color: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'rgba(59,130,246,0.15)' },
    description: 'A calculator, generator, or grader that takes their inputs and produces a specific, usable output.',
    howItWorks: 'Build a form with 3-5 inputs. Process into a personalised output (score, projection, graded result). The output itself starts the sales conversation.',
    exampleTemplate: '"[Metric] Calculator" or "[Topic] Grader" or "[Outcome] Generator"',
    personalisationTip: 'Every user gets a different output based on their inputs. Segment follow-up by score range.',
    buildTime: '1 weekend',
    tools: ['Google Sheets + Tally', 'Outgrow', 'Custom build (React)'],
    conversionRate: '~8% (cold traffic)',
    commonMistake: 'Overcomplicating the inputs. Three fields, one output. That\'s it. If someone needs to enter 10 things, they\'ll bounce before they finish.',
  },
  {
    id: 'template',
    name: 'Template',
    icon: <Layout className="w-5 h-5" />,
    tagline: 'Skip the blank page. Start 80% done.',
    coreTrigger: 'Speed + shortcut',
    color: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'rgba(16,185,129,0.15)' },
    description: 'A ready made framework, swipe file, or fill in the blank system they can apply immediately.',
    howItWorks: 'Package your core methodology into a plug and play format. The template IS a taste of your system.',
    exampleTemplate: '"The [Your Method] Template" or "[Outcome] Swipe File" or "[Process] Playbook"',
    personalisationTip: 'Add a short intake form before delivery to serve the right variant.',
    buildTime: 'A few hours',
    tools: ['Notion', 'Google Docs', 'Canva'],
    conversionRate: '5-15%',
    commonMistake: 'Giving away your entire system in the template. Give them ONE piece that works on its own but makes them want the rest.',
  },
  {
    id: 'education',
    name: 'Education',
    icon: <BookOpen className="w-5 h-5" />,
    tagline: 'Establish depth. Build authority over time.',
    coreTrigger: 'Authority + aspiration',
    color: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', glow: 'rgba(245,158,11,0.15)' },
    description: 'A guide, checklist, or report that packages your expertise into a deliverable.',
    howItWorks: 'Create a focused document around ONE specific problem. Short, actionable, impossible to find elsewhere.',
    exampleTemplate: '"The [Specific Outcome] Checklist" or "[Industry] Playbook"',
    personalisationTip: 'Gate with a "which version?" selector. Each maps to a segment.',
    buildTime: '2-4 hours',
    tools: ['Google Docs + Canva', 'Notion', 'Gamma'],
    conversionRate: '3-10%',
    commonMistake: 'Making it too long. Nobody reads a 40 page PDF. A tight 3 page checklist with 15 specific items beats a comprehensive guide every time.',
  },
  {
    id: 'experience',
    name: 'Experience',
    icon: <Users className="w-5 h-5" />,
    tagline: 'Let them taste what working with you feels like.',
    coreTrigger: 'Trust transfer + reciprocity',
    color: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', glow: 'rgba(239,68,68,0.15)' },
    description: 'A live or semi-live event. Workshop, challenge, webinar, or mini course.',
    howItWorks: 'Run a 60-90 minute workshop or 3-5 day challenge. Deliver real value. Let them experience your process firsthand.',
    exampleTemplate: '"The [Outcome] Workshop" or "[Number]-Day [Topic] Sprint"',
    personalisationTip: 'Pre-event survey to tailor examples. Segment by attendance behaviour.',
    buildTime: '1 week to prep, then recurring',
    tools: ['Zoom', 'Luma / Lu.ma', 'Circle or Skool'],
    conversionRate: '25-50%',
    commonMistake: 'Treating it like a sales pitch with a free wrapper. If the workshop doesn\'t deliver a real outcome on its own, nobody will trust the paid version either.',
  },
];

// --- Scoring ---

type Weights = Record<string, number>;

const SCORING: Record<string, Record<string, Weights>> = {
  offer: {
    service:  { diagnostic: 3, tool: 2, template: 1, education: 0, experience: 1 },
    coaching: { diagnostic: 3, tool: 1, template: 2, education: 1, experience: 3 },
    course:   { diagnostic: 2, tool: 2, template: 3, education: 2, experience: 2 },
    saas:     { diagnostic: 1, tool: 3, template: 2, education: 1, experience: 1 },
    agency:   { diagnostic: 3, tool: 2, template: 1, education: 0, experience: 1 },
  },
  price: {
    'under1k':  { diagnostic: 1, tool: 2, template: 3, education: 3, experience: 1 },
    '1k-5k':    { diagnostic: 2, tool: 2, template: 2, education: 1, experience: 2 },
    '5k-15k':   { diagnostic: 3, tool: 2, template: 1, education: 0, experience: 3 },
    '15k+':     { diagnostic: 3, tool: 1, template: 0, education: 0, experience: 2 },
  },
  leads: {
    organic:   { diagnostic: 2, tool: 2, template: 2, education: 2, experience: 2 },
    paid:      { diagnostic: 3, tool: 3, template: 1, education: 1, experience: 1 },
    referrals: { diagnostic: 2, tool: 1, template: 1, education: 1, experience: 3 },
    outbound:  { diagnostic: 2, tool: 2, template: 2, education: 1, experience: 1 },
    none:      { diagnostic: 3, tool: 1, template: 2, education: 2, experience: 1 },
  },
  bottleneck: {
    volume:     { diagnostic: 3, tool: 2, template: 2, education: 2, experience: 2 },
    quality:    { diagnostic: 3, tool: 3, template: 0, education: 0, experience: 1 },
    conversion: { diagnostic: 2, tool: 1, template: 1, education: 1, experience: 3 },
    all:        { diagnostic: 3, tool: 2, template: 1, education: 1, experience: 1 },
  },
  time: {
    passive:  { diagnostic: 3, tool: 3, template: 3, education: 2, experience: 0 },
    moderate: { diagnostic: 2, tool: 2, template: 2, education: 2, experience: 1 },
    active:   { diagnostic: 1, tool: 0, template: 0, education: 1, experience: 3 },
  },
};

function calculateResult(answers: Record<string, string>): QuizResult {
  const scores: Record<string, number> = { diagnostic: 0, tool: 0, template: 0, education: 0, experience: 0 };

  for (const [questionId, answerId] of Object.entries(answers)) {
    const weights = SCORING[questionId]?.[answerId];
    if (weights) {
      for (const [type, weight] of Object.entries(weights)) {
        scores[type] += weight;
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = LEAD_MAGNET_TYPES.find(t => t.id === sorted[0][0])!;
  const secondary = LEAD_MAGNET_TYPES.find(t => t.id === sorted[1][0])!;
  const personalised = generatePersonalisedCopy(answers, primary);

  return { primary, secondary, scores, personalised };
}

function generatePersonalisedCopy(
  answers: Record<string, string>,
  primary: LeadMagnetType
): { whyThis: string; specificExample: string; backendPlay: string } {
  const offer = answers.offer;
  const bottleneck = answers.bottleneck;

  const whyThisMap: Record<string, Record<string, string>> = {
    diagnostic: {
      service: "You sell a service. The prospect needs to trust your diagnosis before they'll trust your delivery. A diagnostic positions you as the expert who understands their problem better than they do.",
      coaching: "You sell coaching. The hardest part isn't convincing people coaching works. It's helping them see exactly where they're stuck. A diagnostic does that without a sales call.",
      course: "You sell a course. The biggest objection is 'is this for me?' A diagnostic lets them self-select by showing them their exact gap.",
      saas: "You sell software. A diagnostic helps prospects quantify the problem your tool solves. They see the gap, they feel the pain, they want the fix.",
      agency: "You sell agency services. Prospects compare you to every other agency. A diagnostic reframes the conversation from 'which agency?' to 'what's actually broken?'",
    },
    tool: {
      service: "You sell a service. A tool gives prospects their specific number before you ever get on a call. By the time they book, they already know they need you.",
      coaching: "You sell coaching. A tool lets prospects see exactly where they stand in 60 seconds. It's proof of your methodology before they've spent a dollar.",
      course: "You sell a course. A tool gives instant value and proves your framework works. The output makes them want the full system behind it.",
      saas: "You sell software. A tool IS what you do. Build a lighter version that solves one specific problem.",
      agency: "You sell agency services. A tool quantifies the opportunity. When they see the gap, the agency engagement sells itself.",
    },
    template: { default: "You need something people can use immediately. A template removes the blank page problem and gives them a taste of your system." },
    education: { default: "Your audience needs to understand the problem before they'll pay to solve it. A focused, high value guide positions you as the authority." },
    experience: { default: "Your best prospects need to experience what working with you feels like. A live workshop or challenge builds trust faster than any PDF ever could." },
  };

  const whyThis = whyThisMap[primary.id]?.[offer] || whyThisMap[primary.id]?.default || '';

  const bottleneckPlays: Record<string, string> = {
    volume: "Your follow-up should focus on getting them to share the result. Add a 'share your score' CTA. Build an email sequence that delivers 3 quick wins related to their result.",
    quality: "Tag every lead by their result category and price point. Build separate email sequences for each segment. The wrong leads self-filter when your follow-up speaks directly to the right ones.",
    conversion: "Your follow-up should reduce friction, not add pressure. Send their personalised result with one clear next step. Then a case study. Then an invitation. Three emails. No hard sell.",
    all: "Segment into 3 tracks: Track A (not ready) gets weekly value. Track B (considering) gets case studies. Track C (ready now) gets a direct booking link.",
  };

  return {
    whyThis,
    specificExample: '',
    backendPlay: bottleneckPlays[bottleneck] || bottleneckPlays.all,
  };
}

// --- Preview Renderers ---

function DiagnosticPreview({ preview }: { preview: any }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">{preview.title}</h4>
        <p className="text-xs text-zinc-500">{preview.subtitle}</p>
      </div>
      <div className="flex gap-2 justify-center flex-wrap mb-4">
        {preview.categories?.map((cat: string, i: number) => (
          <span key={i} className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            {cat}
          </span>
        ))}
      </div>
      <div>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Sample Questions</p>
        <div className="space-y-2">
          {preview.sampleQuestions?.map((q: string, i: number) => (
            <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
              <span className="text-[11px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded mt-0.5">{i + 1}</span>
              <p className="text-sm text-zinc-300 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>
      {preview.resultCategories && (
        <div className="mt-4">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Result Categories</p>
          <div className="grid grid-cols-3 gap-2">
            {preview.resultCategories.map((rc: any, i: number) => (
              <div key={i} className={`rounded-lg p-3 text-center ${i === 0 ? 'bg-red-500/[0.06] border border-red-500/10' : i === 1 ? 'bg-amber-500/[0.06] border border-amber-500/10' : 'bg-emerald-500/[0.06] border border-emerald-500/10'}`}>
                <p className={`text-xs font-bold mb-1 ${i === 0 ? 'text-red-400' : i === 1 ? 'text-amber-400' : 'text-emerald-400'}`}>{rc.name}</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">{rc.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ToolPreview({ preview }: { preview: any }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">{preview.title}</h4>
        <p className="text-xs text-zinc-500">{preview.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Inputs</p>
          <div className="space-y-2">
            {preview.inputs?.map((input: any, i: number) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                <p className="text-[11px] font-semibold text-zinc-400 mb-1">{input.label}</p>
                <div className="bg-[#18181b] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-zinc-600">{input.placeholder}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Output</p>
          <div className="bg-blue-500/[0.06] border border-blue-500/15 rounded-xl p-5 text-center h-full flex flex-col justify-center">
            <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-2">{preview.outputLabel}</p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">{preview.sampleOutput}</p>
            <div className="h-px bg-blue-500/10 my-2" />
            <p className="text-[10px] text-zinc-500">{preview.benchmark}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ preview }: { preview: any }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">{preview.title}</h4>
        <p className="text-xs text-zinc-500">{preview.subtitle}</p>
      </div>
      <div className="space-y-3">
        {preview.sections?.map((section: any, i: number) => (
          <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
            <p className="text-sm font-bold text-emerald-400 mb-2">{section.name}</p>
            <div className="space-y-1.5">
              {section.fields?.map((field: string, j: number) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                  <div className="flex-1 bg-[#18181b] border border-white/[0.04] rounded-lg px-3 py-2">
                    <span className="text-xs text-zinc-600">{field}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {preview.completionTime && (
        <p className="text-center text-[11px] text-zinc-600 flex items-center justify-center gap-1.5">
          <Clock className="w-3 h-3" /> Estimated time to complete: {preview.completionTime}
        </p>
      )}
    </div>
  );
}

function EducationPreview({ preview }: { preview: any }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">{preview.title}</h4>
        <p className="text-xs text-zinc-500">{preview.subtitle}</p>
      </div>
      <div className="space-y-0">
        {preview.chapters?.map((ch: any, i: number) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-b-0">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">{i + 1}</span>
            <div>
              <p className="text-sm font-semibold text-white">{ch.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{ch.keyPoint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperiencePreview({ preview }: { preview: any }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-white">{preview.title}</h4>
        <p className="text-xs text-zinc-500">{preview.subtitle}</p>
        {preview.format && (
          <span className="inline-block mt-2 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            {preview.format}
          </span>
        )}
      </div>
      <div className="space-y-2">
        {preview.sessions?.map((s: any, i: number) => (
          <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{s.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{s.outcome}</p>
            </div>
            {s.duration && (
              <span className="text-[10px] text-zinc-600 flex items-center gap-1 flex-shrink-0">
                <Clock className="w-3 h-3" /> {s.duration}
              </span>
            )}
          </div>
        ))}
      </div>
      {preview.deliverable && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1">They leave with</p>
          <p className="text-sm text-white">{preview.deliverable}</p>
        </div>
      )}
    </div>
  );
}

function PreviewRenderer({ type, preview }: { type: string; preview: any }) {
  switch (type) {
    case 'diagnostic': return <DiagnosticPreview preview={preview} />;
    case 'tool': return <ToolPreview preview={preview} />;
    case 'template': return <TemplatePreview preview={preview} />;
    case 'education': return <EducationPreview preview={preview} />;
    case 'experience': return <ExperiencePreview preview={preview} />;
    default: return null;
  }
}

// --- Component ---

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [textInput, setTextInput] = useState('');

  // AI Preview
  const [preview, setPreview] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState('');

  const topRef = useRef<HTMLDivElement>(null);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = currentQ >= 0 && currentQ < totalQuestions ? QUESTIONS[currentQ] : null;

  // Generate preview when result loads
  useEffect(() => {
    if (result && answers.business && !preview && !previewLoading) {
      generatePreview();
    }
  }, [result]);

  async function generatePreview() {
    if (!result || !answers.business) return;
    setPreviewLoading(true);
    setPreviewError('');

    const priceLabels: Record<string, string> = {
      'under1k': 'Under $1,000', '1k-5k': '$1,000-$5,000', '5k-15k': '$5,000-$15,000', '15k+': '$15,000+',
    };
    const bottleneckLabels: Record<string, string> = {
      volume: 'Not enough leads', quality: 'Wrong leads', conversion: 'Leads don\'t convert', all: 'All of the above',
    };
    const leadLabels: Record<string, string> = {
      organic: 'Organic content', paid: 'Paid ads', referrals: 'Referrals', outbound: 'Outbound', none: 'No reliable source',
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/content-engine-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'generate_lead_magnet_preview',
          businessDescription: answers.business,
          leadMagnetType: result.primary.name,
          offerType: answers.offer,
          pricePoint: priceLabels[answers.price] || answers.price,
          bottleneck: bottleneckLabels[answers.bottleneck] || answers.bottleneck,
          leadSource: leadLabels[answers.leads] || answers.leads,
        }),
      });

      if (!res.ok) throw new Error('Preview generation failed');
      const data = await res.json();
      setPreview(data.preview);
    } catch {
      setPreviewError('Preview generation failed. Try refreshing.');
    } finally {
      setPreviewLoading(false);
    }
  }

  function selectAnswer(questionId: string, optionId: string) {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));

    setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        const finalAnswers = { ...answers, [questionId]: optionId };
        setResult(calculateResult(finalAnswers));
        setCurrentQ(totalQuestions);
      }
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  function submitTextAnswer() {
    if (!textInput.trim()) return;
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: textInput.trim() }));

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      const finalAnswers = { ...answers, [QUESTIONS[currentQ].id]: textInput.trim() };
      setResult(calculateResult(finalAnswers));
      setCurrentQ(totalQuestions);
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goBack() {
    if (currentQ > 0) {
      const prevQ = QUESTIONS[currentQ - 1];
      if (prevQ.type === 'text') {
        setTextInput(answers[prevQ.id] || '');
      }
      setCurrentQ(prev => prev - 1);
    } else if (currentQ === 0) {
      setCurrentQ(-1);
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function saveResult() {
    if (!email.trim() || !result) return;
    setSaving(true);

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      const { data: contact } = await supabase
        .from('contacts')
        .upsert({ email: email.trim(), source: 'lead_magnet_quiz' }, { onConflict: 'email' })
        .select('id')
        .single();

      if (contact) {
        await supabase.from('interactions').insert({
          contact_id: contact.id,
          type: 'quiz_lead_magnet_diagnostic',
          description: JSON.stringify({
            answers,
            result: result.primary.id,
            secondary: result.secondary.id,
            scores: result.scores,
          }),
        });
      }

      setSaved(true);
      setShowDetail(true);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }

  const progress = currentQ >= 0 ? Math.min(((currentQ + 1) / totalQuestions) * 100, 100) : 0;
  const isResults = currentQ === totalQuestions && result;

  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <div ref={topRef} />

      {/* Header */}
      <section className="pt-32 pb-4 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08)_0%,rgba(99,102,241,0.03)_40%,transparent_70%)] pointer-events-none" />
        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300/90 font-medium">Lead Magnet Diagnostic</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Progress Bar */}
      {currentQ >= 0 && !isResults && (
        <div className="px-4 pb-6">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Question {currentQ + 1} of {totalQuestions}
                </span>
                <span className="text-[11px] font-semibold text-zinc-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Content */}
      <section className="px-4 pb-8">
        <Container>
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">

              {/* Intro */}
              {currentQ === -1 && (
                <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="text-center">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-5">
                    <span className="text-white">What lead magnet</span><br />
                    <GradientText>should you build?</GradientText>
                  </h1>
                  <p className="text-base text-zinc-400 max-w-lg mx-auto leading-relaxed mb-4">
                    6 questions. 90 seconds. Get a personalised recommendation with a real preview of what YOUR lead magnet could look like.
                  </p>
                  <p className="text-sm text-zinc-600 mb-10">
                    Not generic advice. AI builds a custom preview based on your exact business.
                  </p>
                  <motion.button onClick={() => setCurrentQ(0)} className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-lg px-10 py-4 rounded-xl hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Start the Diagnostic
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <p className="text-xs text-zinc-700 mt-6">No email required to start.</p>
                </motion.div>
              )}

              {/* Text Question */}
              {currentQuestion?.type === 'text' && (
                <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{currentQuestion.question}</h2>
                    <p className="text-sm text-zinc-500">{currentQuestion.subtitle}</p>
                  </div>
                  <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full min-h-[120px] bg-[#111113] border border-white/[0.06] rounded-2xl text-white text-base p-5 resize-y leading-relaxed placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/30 transition-colors"
                    autoFocus
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitTextAnswer(); } }}
                  />
                  <button
                    onClick={submitTextAnswer}
                    disabled={!textInput.trim()}
                    className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-base tracking-tight hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight className="w-5 h-5" />
                  </button>
                  {currentQ > 0 && (
                    <button onClick={goBack} className="mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                </motion.div>
              )}

              {/* Select Question */}
              {currentQuestion?.type === 'select' && (
                <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{currentQuestion.question}</h2>
                    <p className="text-sm text-zinc-500">{currentQuestion.subtitle}</p>
                  </div>
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, i) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <motion.button key={option.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }} onClick={() => selectAnswer(currentQuestion.id, option.id)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all group ${isSelected ? 'border-blue-500/30 bg-blue-500/[0.06]' : 'border-white/[0.06] bg-[#111113] hover:border-white/[0.12] hover:bg-white/[0.02]'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <p className="text-[15px] font-semibold text-white">{option.label}</p>
                              {option.sublabel && <p className="text-xs text-zinc-500 mt-0.5">{option.sublabel}</p>}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  {currentQ > 0 && (
                    <button onClick={goBack} className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                </motion.div>
              )}

              {/* Results */}
              {isResults && result && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                      Build a <GradientText>{result.primary.name}</GradientText>
                    </h2>
                    <p className="text-sm text-zinc-500">Based on your answers, here's exactly what to build.</p>
                  </div>

                  {/* Primary Card */}
                  <div className={`bg-[#111113] border ${result.primary.color.border} rounded-2xl p-6 sm:p-8 mb-4 relative overflow-hidden`} style={{ boxShadow: `0 0 60px -20px ${result.primary.color.glow}` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-10 h-10 rounded-xl ${result.primary.color.bg} ${result.primary.color.text} flex items-center justify-center`}>{result.primary.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{result.primary.name}</h3>
                          <p className={`text-xs font-semibold ${result.primary.color.text}`}>{result.primary.coreTrigger}</p>
                        </div>
                        <span className={`ml-auto text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${result.primary.color.bg} ${result.primary.color.text} border ${result.primary.color.border}`}>Best Match</span>
                      </div>

                      <p className="text-lg font-semibold text-white mb-4 leading-snug">{result.primary.tagline}</p>

                      {/* Why This */}
                      <div className="mb-5">
                        <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Why this fits you</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{result.personalised.whyThis}</p>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 text-center">
                          <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                          <p className="text-xs font-bold text-white">{result.primary.conversionRate}</p>
                          <p className="text-[10px] text-zinc-600">conversion rate</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 text-center">
                          <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                          <p className="text-xs font-bold text-white">{result.primary.buildTime}</p>
                          <p className="text-[10px] text-zinc-600">to build</p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3 text-center">
                          <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                          <p className="text-xs font-bold text-white truncate">{result.primary.tools[0]}</p>
                          <p className="text-[10px] text-zinc-600">best tool</p>
                        </div>
                      </div>

                      {/* AI Preview */}
                      <div className="border border-white/[0.06] rounded-xl overflow-hidden mb-5">
                        <div className={`px-5 py-3 ${result.primary.color.bg} border-b border-white/[0.06] flex items-center gap-2`}>
                          <Eye className="w-4 h-4" />
                          <h4 className={`text-[11px] font-bold ${result.primary.color.text} uppercase tracking-widest`}>Preview: What yours could look like</h4>
                        </div>
                        <div className="p-5">
                          {previewLoading && (
                            <div className="flex items-center justify-center gap-3 py-8">
                              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                              <p className="text-sm text-zinc-500">Building your preview based on "{answers.business}"...</p>
                            </div>
                          )}
                          {previewError && (
                            <div className="text-center py-6">
                              <p className="text-sm text-zinc-500 mb-3">{previewError}</p>
                              <button onClick={generatePreview} className="text-sm text-blue-400 hover:text-blue-300 font-semibold">Try again</button>
                            </div>
                          )}
                          {preview && !previewLoading && (
                            <PreviewRenderer type={result.primary.id} preview={preview} />
                          )}
                        </div>
                      </div>

                      {/* Common Mistake */}
                      <div className="bg-amber-500/[0.04] border border-amber-500/10 rounded-xl p-4 mb-5">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1">Common mistake</p>
                            <p className="text-sm text-zinc-400 leading-relaxed">{result.primary.commonMistake}</p>
                          </div>
                        </div>
                      </div>

                      {/* Email Gate */}
                      {!showDetail && (
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-6">
                          <div className="flex items-start gap-3 mb-4">
                            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-white mb-1">Get the full breakdown</p>
                              <p className="text-xs text-zinc-500">Step by step build guide, ICP personalisation playbook, and the back-end strategy for turning quiz takers into clients.</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                              className="flex-1 bg-[#18181b] border border-white/[0.06] rounded-lg text-white text-sm px-3 py-2.5 focus:outline-none focus:border-blue-500/30"
                              onKeyDown={e => e.key === 'Enter' && saveResult()}
                            />
                            <button onClick={saveResult} disabled={saving || !email.trim()}
                              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Unlock'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Unlocked Detail */}
                      <AnimatePresence>
                        {showDetail && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="border-t border-white/[0.06] mt-6 pt-5 space-y-5">
                              <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">How to build it</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">{result.primary.howItWorks}</p>
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">How to personalise it for your ICP</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">{result.primary.personalisationTip}</p>
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">The back-end play</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">{result.personalised.backendPlay}</p>
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Tools to build it</h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.primary.tools.map((tool, i) => (
                                    <span key={i} className="text-xs font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">{tool}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Name it something like</h4>
                                <p className="text-sm text-white font-medium italic">{result.primary.exampleTemplate}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Secondary */}
                  <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 mb-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${result.secondary.color.bg} ${result.secondary.color.text} flex items-center justify-center`}>{result.secondary.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{result.secondary.name}</h3>
                          <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Runner up</span>
                        </div>
                        <p className="text-xs text-zinc-500">{result.secondary.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="mb-10">
                    <h4 className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Your scores</h4>
                    <div className="space-y-2">
                      {Object.entries(result.scores).sort((a, b) => b[1] - a[1]).map(([typeId, score]) => {
                        const type = LEAD_MAGNET_TYPES.find(t => t.id === typeId)!;
                        const maxScore = 15;
                        const pct = Math.round((score / maxScore) * 100);
                        return (
                          <div key={typeId} className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold text-zinc-500 w-24">{type.name}</span>
                            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                              <motion.div className={`h-full rounded-full ${typeId === result.primary.id ? 'bg-gradient-to-r from-blue-600 to-indigo-500' : 'bg-zinc-700'}`}
                                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-[11px] text-zinc-600 w-8 text-right">{score}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <button onClick={() => { setCurrentQ(-1); setAnswers({}); setResult(null); setEmail(''); setSaved(false); setShowDetail(false); setPreview(null); setTextInput(''); topRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      Retake the diagnostic
                    </button>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Want someone to build it for you?</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              The Authority Engine builds your entire content system. Brand, strategy, operator, and the lead magnets that actually convert.
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
