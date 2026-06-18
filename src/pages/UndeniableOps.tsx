import React from 'react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const ROLES: Array<{ name: string; lane: string; bullets: string[] }> = [
  {
    name: 'Rhys',
    lane: 'Talent. Final call.',
    bullets: [
      'Show up to Mon / Wed / Fri shoots.',
      'Write the hook and the problem for each weekly video.',
      'Film Character (1 day) and Rome (2 to 3 day block).',
      'Record 2 to 3 podcasts per week.',
      'Sign off Monday review in 10 minutes.',
      'Capture the 4 questions end of each working day.',
    ],
  },
  {
    name: 'Corey',
    lane: 'Operations. Will own creative direction by week 4.',
    bullets: [
      'Run the Mon / Wed / Fri shoots.',
      'Edit short-form. Ship 2 per day.',
      'Log daily metrics. Run the Monday review.',
      'Sit in on 3 client calls in week 1.',
      'Build pattern recognition. Catalogue Rhys\'s stories.',
      'By week 3: suggest content angles. By week 4: drive direction.',
    ],
  },
  {
    name: 'Sean',
    lane: 'Strategy. Accountability.',
    bullets: [
      'Refine the brand. Increase demand.',
      'Lock the 6 pillar video outlines and the 6-week cycle.',
      'Curate Corey\'s resources.',
      'Fortnightly strategy and accountability sessions.',
      'Voice note and email support between sessions.',
    ],
  },
];

const RHYTHM: Array<{ d: string; label: string; shoot: boolean }> = [
  { d: 'Mon', label: 'Shoot. Weekly review.', shoot: true },
  { d: 'Tue', label: 'Edit. Client calls.', shoot: false },
  { d: 'Wed', label: 'Shoot.', shoot: true },
  { d: 'Thu', label: 'Edit. Podcast cuts.', shoot: false },
  { d: 'Fri', label: 'Shoot longform.', shoot: true },
  { d: 'Sat', label: 'Off.', shoot: false },
  { d: 'Sun', label: 'Rhys preview next week.', shoot: false },
];

const MONDAY_QUESTIONS: string[] = [
  'Best stat from last week.',
  'Highest watch-time video. The topic.',
  'Drop-off point on the top performer.',
  'Save rate. A spike means simplify.',
  'ICP comment ratio. Are the right people commenting?',
  'Topic that worked. Best guess on why.',
  'Decision: what do we do more of this week?',
];

const KPIS: Array<[string, string]> = [
  ['Workshop signups', 'Track weekly volume.'],
  ['Workshop show rate', '99% baseline. Hold.'],
  ['Workshop to call rate', 'Sub-2% currently. Target 5% plus.'],
  ['Call to close rate', '9 out of 10 best months. Hold.'],
  ['L2 12-month retention', '82% proven. Hold.'],
  ['Avg short-form watch time', 'Rising means working.'],
  ['Share rate', 'Best forward indicator.'],
  ['ICP comment ratio', 'Qualitative weekly read.'],
];

const OPEN_DECISIONS: string[] = [
  'Custom GPT route',
  'Bottleneck Buster rename',
  'Linktree replacement',
  'Reese Livingstone vs Undeniable channel',
  'Ad boost on shorts',
  'Re-cut workshop VSL',
];

export default function UndeniableOps() {
  return (
    <Shell title="Operations · Undeniable" description="Roles, weekly rhythm, Monday review, KPI table, open decisions." path="/undeniablenextsteps/ops">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Operations."
        blurb="Roles. Rhythm. Monday review. The 8 numbers. Open decisions."
      />
      <Divider />

      {/* ROLES */}
      <Wrap>
        <Eyebrow>Roles</Eyebrow>
        <div className="space-y-4">
          {ROLES.map((r) => (
            <div key={r.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white">{r.name}</h3>
              </div>
              <p className="text-blue-300 text-[12px] uppercase tracking-widest font-semibold mb-4">{r.lane}</p>
              <ul className="space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[14px] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* RHYTHM */}
      <Wrap>
        <Eyebrow>Weekly rhythm</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {RHYTHM.map((day) => (
            <div key={day.d} className={`rounded-xl border p-3 md:p-4 ${day.shoot ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
              <p className={`font-display text-[14px] font-extrabold mb-2 ${day.shoot ? 'text-blue-300' : 'text-white'}`}>{day.d}</p>
              <p className="text-zinc-300 text-[12px] leading-relaxed">{day.label}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* MONDAY REVIEW */}
      <Wrap>
        <Eyebrow>Monday review</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">10 minutes. Corey prepares. Rhys signs off.</p>
        <div className="space-y-2">
          {MONDAY_QUESTIONS.map((q, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 flex items-start gap-4">
              <span className="font-display text-blue-400 text-[14px] font-extrabold flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-zinc-200 text-[14px] leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* KPIs */}
      <Wrap>
        <Eyebrow>KPI table</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">8 numbers tracked weekly. Corey updates before Monday review.</p>
        <div className="rounded-2xl border border-zinc-800 overflow-hidden">
          {KPIS.map(([metric, target], i) => (
            <div key={metric} className={`grid grid-cols-[1fr_1fr] md:grid-cols-[240px_1fr] gap-4 md:gap-6 px-5 md:px-6 py-4 ${i < KPIS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
              <p className="font-display font-extrabold text-white text-[14px]">{metric}</p>
              <p className="text-zinc-300 text-[13px] md:text-[14px]">{target}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* OPEN DECISIONS */}
      <Wrap>
        <Eyebrow>Open decisions</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">Don\'t block week 1. Off the list by week 4.</p>
        <div className="space-y-2">
          {OPEN_DECISIONS.map((d, i) => (
            <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
              <p className="font-display text-[15px] font-extrabold text-amber-300">{d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
