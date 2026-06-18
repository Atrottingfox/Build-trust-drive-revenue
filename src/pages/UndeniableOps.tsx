import React from 'react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const ROLES: Array<{ name: string; lane: string }> = [
  {
    name: 'Rhys',
    lane: 'Talent. Final call.',
  },
  {
    name: 'Corey',
    lane: 'Operations. Shoots and edits. Grows into creative direction.',
  },
  {
    name: 'Sean',
    lane: 'Strategy and accountability. Refine the brand. Increase demand.',
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

export default function UndeniableOps() {
  return (
    <Shell title="Operations · Undeniable" description="Roles and weekly rhythm." path="/undeniablenextsteps/ops">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Operations."
        blurb="Roles and weekly rhythm."
      />
      <Divider />

      {/* ROLES */}
      <Wrap>
        <Eyebrow>Roles</Eyebrow>
        <div className="space-y-3">
          {ROLES.map((r) => (
            <div key={r.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 px-6 py-5 md:px-7 md:py-6">
              <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">{r.name}</h3>
              <p className="text-zinc-400 text-[14px]">{r.lane}</p>
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
    </Shell>
  );
}
