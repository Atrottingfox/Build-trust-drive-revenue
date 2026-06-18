import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

const STATUS_STYLES: Record<string, string> = {
  'Not started': 'bg-zinc-800 text-zinc-400 border-zinc-700',
  'Queued': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  'Building': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  'Live': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
};

function Status({ s }: { s: keyof typeof STATUS_STYLES }) {
  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold rounded-full border px-2.5 py-0.5 ${STATUS_STYLES[s]}`}>
      {s}
    </span>
  );
}

const SHORT_FORM_GRID: Array<{ day: string; env: string; bucket: string; count: string }> = [
  { day: 'Monday', env: 'Park', bucket: 'Stories bucket', count: '3 shorts' },
  { day: 'Wednesday', env: 'Gym', bucket: 'Teach bucket', count: '3 shorts' },
  { day: 'Friday', env: 'Hallway', bucket: 'Beliefs bucket', count: '3 shorts' },
];

const CHARACTER_ARC: Array<[string, string]> = [
  ['Cold open', 'I built a $5M fitness business without going viral. Here\'s everything I did. And almost everything I did wrong first.'],
  ['Old situation', 'Gym floor. Trading time for money.'],
  ['First scar', 'Couldn\'t pay staff two weeks before Christmas.'],
  ['Second scar', '600% growth in 5 months. I was ready to walk away.'],
  ['Turning point', 'Stopped chasing more. Focused on the ones already there.'],
  ['Proof beat 1', 'Under 5,000 followers. 12 likes on a photo. $2.2M USD.'],
  ['Proof beat 2', '750K gym. No one\'s allowed to train there.'],
  ['Proof beat 3', 'Sabine: 15K to 80K.'],
  ['New reality', '$5M. 82% retention. Systems, not viral moments.'],
  ['Invitation', 'I made Rome. 4 hours. Everything. Link below.'],
];

const ROME_CHAPTERS: Array<[string, string]> = [
  ['~5 min', 'Hook. Clear promise plus length plus outcome.'],
  ['~10 min', 'The problem. Why most coaches cap at 10K.'],
  ['~45 min', 'The path. What to do instead.'],
  ['~20 min', 'Personal story arc.'],
  ['~30 min', 'Case study 1. Luke Miller (60K to 600K USD).'],
  ['~30 min', 'Case study 2. Sabine (15K to 80K).'],
  ['~20 min', 'Case study 3. Gabe.'],
  ['~60 min', 'The full system.'],
  ['~10 min', 'Next step CTA.'],
];

type Pillar = {
  n: string;
  pillar: string;
  label: string;
  question: string;
  titles: string[];
};

const VIDEO_PILLARS: Pillar[] = [
  {
    n: 'Week 1',
    pillar: 'Character',
    label: 'Character Development',
    question: 'Why should I listen to this person, specifically?',
    titles: [
      'How I Built a $XM Online Fitness Empire in 11 Years (without going viral)',
      'How I Made $XM Online Without Going Viral',
      'As a PT I Made $X. This Is Everything it cost me to get there',
    ],
  },
  {
    n: 'Week 2',
    pillar: 'Authority',
    label: 'The Positioning Play. Full Playbook.',
    question: 'Does this person actually know what they\'re talking about at depth?',
    titles: [
      'F*ck It, This Is How to Build a $1M+ Online Fitness Business',
      '"As an Online Fitness Coach, How Can I Make $1M?" Just Do This.',
      'How I Made $XM Online Coaching Without Going Viral',
    ],
  },
  {
    n: 'Week 3',
    pillar: 'Niche Authority',
    label: 'Tactical Operator Video. The VSL.',
    question: 'Does this apply specifically to me?',
    titles: [
      'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This',
      'How to Become a $1M Fitness Coach',
      'How to Make Your First $1M as a Fitness Coach (Step by Step)',
      'How to Make Your First $1M in Fitness (Full Walkthrough)',
    ],
  },
  {
    n: 'Week 4',
    pillar: 'Practical',
    label: 'Signature Framework. The unique mechanism.',
    question: 'Do I trust this person\'s specific frameworks?',
    titles: [
      'How I Made $X/Month as a PT (Without …)',
      'Stop "Learning Marketing" and Just Copy This',
    ],
  },
  {
    n: 'Week 5',
    pillar: 'Implementable',
    label: 'Accessible Insights.',
    question: 'Do they have insights I can\'t find anywhere else?',
    titles: [
      'Stop "Learning Marketing" and Just Copy This (Complete Plan)',
      'If I Wanted to Add $10,000/Month as a PT, I\'d Just Do This',
    ],
  },
  {
    n: 'Week 6',
    pillar: 'Masterclass',
    label: 'Step by Step Walkthrough.',
    question: 'Is there a complete system, or just tactics?',
    titles: [
      'How to Get So Good at Marketing You Never Have to Sell Again',
      'How to Get So Many Referrals You Never Need to Run an Ad Again',
      'Every Fitness Creator Gets Stuck at the Same Point. If That\'s You, Do This.',
      'How to Add $10,000/Month as a PT (The Exact System)',
    ],
  },
];

function ToolLink({ to, label }: { to: string; label: string }) {
  return (
    <a href={to} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-5 py-4">
      <h4 className="font-display text-[16px] font-extrabold text-white">{label}</h4>
      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
    </a>
  );
}

export default function UndeniableContent() {
  return (
    <Shell title="Content Engine · Undeniable" description="Short-form and long-form. Shoot rhythm, video pillars, podcasts." path="/undeniablenextsteps/content">
      <PageHead
        eyebrow="Working page"
        title="Content"
        accent="Engine."
        blurb="Short-form running on a Mon / Wed / Fri rhythm. Long-form on a 6-week rotation. Character and Rome as the trust assets."
      />
      <Divider />

      {/* SHORT-FORM */}
      <Wrap>
        <Eyebrow>Short-form</Eyebrow>

        <div className="mb-10">
          <SubEyebrow>Shoot rhythm</SubEyebrow>
          <p className="text-zinc-200 text-[15px] mb-2">Mon / Wed / Fri. 10:00 to 14:00.</p>
          <p className="text-zinc-400 text-[14px]">9 shorts week 1. Scale to 14 shorts per week by week 3.</p>
        </div>

        <div className="mb-10">
          <SubEyebrow>Current week grid</SubEyebrow>
          <div className="rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-4 gap-0 px-5 py-3 bg-elevated/40 border-b border-zinc-800">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Day</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Environment</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Bucket</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Count</p>
            </div>
            {SHORT_FORM_GRID.map((r, i) => (
              <div key={r.day} className={`grid grid-cols-4 gap-0 px-5 py-4 ${i < SHORT_FORM_GRID.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                <p className="font-display font-extrabold text-blue-400 text-[13px] md:text-[14px]">{r.day}</p>
                <p className="text-zinc-200 text-[13px] md:text-[14px]">{r.env}</p>
                <p className="text-zinc-200 text-[13px] md:text-[14px]">{r.bucket}</p>
                <p className="text-zinc-200 text-[13px] md:text-[14px]">{r.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SubEyebrow>Short-form tools</SubEyebrow>
          <div className="grid md:grid-cols-2 gap-3">
            <ToolLink to="/undeniablenextsteps/shoot-card" label="Next Shoot" />
            <ToolLink to="/undeniablenextsteps/hooks" label="Hook Bank" />
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* LONG-FORM */}
      <Wrap>
        <Eyebrow>Long-form</Eyebrow>

        {/* Character */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
            <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white">Character video</h3>
            <Status s="Queued" />
          </div>
          <div className="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-2 mb-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Length</p>
            <p className="text-zinc-300 text-[14px]">20 to 30 minutes</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Shoot</p>
            <p className="text-zinc-300 text-[14px]">1 day. Walking, sitting, voiceover with B-roll.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>10-beat arc</SubEyebrow>
            <div className="space-y-2">
              {CHARACTER_ARC.map(([beat, line]) => (
                <div key={beat} className="grid grid-cols-[1fr] md:grid-cols-[140px_1fr] gap-1 md:gap-4 py-1.5 border-b border-zinc-800/60 last:border-0">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">{beat}</p>
                  <p className="text-zinc-200 text-[13px] leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rome */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
            <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white">Rome (long-form VSL)</h3>
            <Status s="Queued" />
          </div>
          <div className="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-2 mb-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Length</p>
            <p className="text-zinc-300 text-[14px]">4 to 5 hours</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Shoot</p>
            <p className="text-zinc-300 text-[14px]">2 to 3 day block. Edit 14 days. Unlisted, then public on YouTube.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Chapter map</SubEyebrow>
            <div className="space-y-2">
              {ROME_CHAPTERS.map(([time, chapter]) => (
                <div key={chapter} className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-3 py-1.5 border-b border-zinc-800/60 last:border-0">
                  <p className="text-blue-400 font-mono font-semibold text-[12px]">{time}</p>
                  <p className="text-zinc-200 text-[13px] leading-relaxed">{chapter}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6-week rotation with YouTube titles */}
        <div className="mb-12">
          <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-2">6-week video rotation</h3>
          <p className="text-zinc-400 text-[14px] mb-6">One long-form per week. Six pillars in rotation. Working titles below.</p>
          <div className="space-y-4">
            {VIDEO_PILLARS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="font-display text-[14px] font-extrabold text-blue-400 leading-none">{p.n}</span>
                  <h4 className="font-display text-[16px] md:text-[18px] font-extrabold text-white">{p.pillar}</h4>
                </div>
                <p className="text-zinc-300 text-[13px] font-medium mb-1">{p.label}</p>
                <p className="text-zinc-500 text-[12px] italic mb-4">{p.question}</p>
                <ul className="space-y-1.5">
                  {p.titles.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                      <span className="text-zinc-200 text-[14px] leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Podcasts */}
        <div>
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
            <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white">Podcasts</h3>
            <Status s="Not started" />
          </div>
          <div className="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-2">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Cadence</p>
            <p className="text-zinc-300 text-[14px]">3 per week. 5 to 15 minutes each.</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Source</p>
            <p className="text-zinc-300 text-[14px]">78 chapters from the book draft. One framework per episode.</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Distribution</p>
            <p className="text-zinc-300 text-[14px]">Spotify, Apple Podcasts. YouTube audio. IG clip per episode.</p>
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* Tools reference */}
      <Wrap>
        <Eyebrow>Reference tools</Eyebrow>
        <div className="grid md:grid-cols-2 gap-3">
          <ToolLink to="/undeniablenextsteps/shoot-card" label="Next Shoot" />
          <ToolLink to="/undeniablenextsteps/hooks" label="Hook Bank" />
          <ToolLink to="/undeniablenextsteps/ad-gold" label="Ad Gold" />
          <ToolLink to="/undeniablenextsteps/content-system" label="Content System" />
        </div>
      </Wrap>
    </Shell>
  );
}
