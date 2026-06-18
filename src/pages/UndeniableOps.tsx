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
      'Show up to Mon and Wed short form shoots.',
      'Film the Friday longform shoot.',
      'Film the Authority pillar (2 to 3 day shoot).',
      'Sign off on creative direction and naming.',
    ],
  },
  {
    name: 'Corey',
    lane: 'Operations. Shoots and edits. Grows into creative direction.',
    bullets: [
      'Run the Mon and Wed short form shoots.',
      'Run the Friday longform shoot.',
      'Edit short form. Edit longform.',
      'Build pattern recognition over the first 90 days.',
    ],
  },
  {
    name: 'Sean',
    lane: 'Strategy and accountability.',
    bullets: [
      'Refine the brand. Increase demand.',
      'Lock the 6 pillar video outlines and the 6 week rotation.',
      'Fortnightly strategy and accountability sessions.',
      'Voice note and email support between sessions.',
    ],
  },
];

const RHYTHM: Array<{ d: string; label: string; shoot: boolean }> = [
  { d: 'Mon', label: 'Short form shoot.', shoot: true },
  { d: 'Tue', label: 'Edit.', shoot: false },
  { d: 'Wed', label: 'Short form shoot.', shoot: true },
  { d: 'Thu', label: 'Edit.', shoot: false },
  { d: 'Fri', label: 'Longform shoot.', shoot: true },
  { d: 'Sat', label: '', shoot: false },
  { d: 'Sun', label: '', shoot: false },
];

const OPEN_DECISIONS: string[] = [
  'Do we want to increase to 21 posts per week?',
  'Do we need extra editing capacity?',
  'Do we want to add 1 to 2 podcasts per month?',
  'Do we want to test new formats or hooks?',
];

export default function UndeniableOps() {
  return (
    <Shell title="Operations · Undeniable" description="Roles, weekly rhythm, open decisions." path="/undeniablenextsteps/ops">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Operations."
        blurb="Roles. Weekly rhythm. Open decisions."
      />
      <Divider />

      {/* ROLES */}
      <Wrap>
        <Eyebrow>Roles</Eyebrow>
        <div className="space-y-4">
          {ROLES.map((r) => (
            <div key={r.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">{r.name}</h3>
              <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-4">{r.lane}</p>
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

      {/* OPEN DECISIONS */}
      <Wrap>
        <Eyebrow>Open decisions (after 4 weeks)</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">From the content cadence. To answer at the end of the first 4 week test cycle.</p>
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
