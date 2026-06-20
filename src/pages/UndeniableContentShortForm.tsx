import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5">
    <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-blue-400" />
    <span className="text-zinc-200 text-[13px] leading-relaxed">{children}</span>
  </li>
);

const HalfHeader = ({ n, label, title }: { n: string; label: string; title: string }) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-3 mb-2">
      <span className="font-display text-[20px] font-extrabold text-blue-500 tabular-nums leading-none">{n}</span>
      <span className="text-[12px] uppercase tracking-widest font-semibold text-blue-400">{label}</span>
    </div>
    <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-tight">{title}</h2>
  </div>
);

export default function UndeniableContentShortForm() {
  return (
    <Shell title="Short Form · Content · Undeniable" description="Short form in two halves. The plan: what we shoot and when. The shoot: the tool you open on the day." path="/undeniablenextsteps/content/short-form">
      <PageHead
        eyebrow="Content · Short form"
        title="Short"
        accent="Form."
        blurb="The first four weeks, split two ways. The shoot is the tool you open on the day. The plan is what we shoot, and when."
        backHref="/undeniablenextsteps/content"
        backLabel="Content"
      />
      <Divider />

      {/* HALF 1 — SHOOT */}
      <Wrap>
        <HalfHeader n="01" label="Shoot" title="What you open on the day." />
        <a href="/undeniablenextsteps/shoot-card" className="group block rounded-2xl border border-blue-500/40 bg-blue-500/[0.06] hover:bg-blue-500/[0.1] transition-colors p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-1.5">The Next Shoot tool</p>
              <h3 className="font-display text-[20px] md:text-[22px] font-extrabold text-white leading-tight">Pick a format. Grab your hooks. Shoot.</h3>
              <p className="text-zinc-400 text-[14px] leading-relaxed mt-1.5">Prioritise your best hooks, edit them for the shoot, add your own. It saves as you go.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </div>
        </a>
      </Wrap>

      <Divider />

      {/* HALF 2 — PLAN */}
      <Wrap>
        <HalfHeader n="02" label="Plan" title="What we shoot, and when." />

        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-4">
          <SubEyebrow>Weeks 1 to 2. Hook testing.</SubEyebrow>
          <p className="text-zinc-200 text-[14px] mb-3">Total: 14 Posts (7 Share, 7 Teach).</p>
          <ul className="space-y-1.5">
            <Bullet>Monday: Shoot 8 across 2 locations. Select top 7.</Bullet>
            <Bullet>Wednesday: Shoot 8 across other 2 locations. Select top 7.</Bullet>
            <Bullet>Use a mix of hook templates to test.</Bullet>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 mb-4">
          <SubEyebrow>End of week 2. Review.</SubEyebrow>
          <ul className="space-y-1.5">
            <Bullet>Identify pattern of top hooks in each pillar. What do the winners have in common? Take patterns, build principles.</Bullet>
            <Bullet>Keep top 8 to test hook structure across different topic.</Bullet>
            <Bullet>Add 4 similar hook styles to test.</Bullet>
            <Bullet>Add 12 completely new hooks to test.</Bullet>
            <Bullet>Remove bottom 10.</Bullet>
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-4">
          <SubEyebrow>Weeks 3 to 4. Hook optimisation.</SubEyebrow>
          <ul className="space-y-1.5">
            <Bullet>Monday: Shoot 8 across 2 similar locations. Half new hooks, half top / similar.</Bullet>
            <Bullet>Wednesday: Shoot 8 across 2 similar locations. Half new hooks, half top / similar (2 per location).</Bullet>
            <Bullet>Friday: Shoot longform.</Bullet>
            <Bullet>Shorts from longs: 3 short form videos. One promotes toolkit. One promotes lead magnet. One promotes video. Select the top 2 to keep in the bank.</Bullet>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 mb-10">
          <SubEyebrow>End of week 4. Review.</SubEyebrow>
          <ul className="space-y-1.5">
            <Bullet>Identify pattern of top hooks in each pillar.</Bullet>
            <Bullet>Keep top 8 to test hook structure across different topic.</Bullet>
            <Bullet>Add 4 similar hook styles to test.</Bullet>
            <Bullet>Add 12 completely new hooks to test.</Bullet>
            <Bullet>Remove bottom 10.</Bullet>
          </ul>
        </div>

        {/* Posting calendar */}
        <SubEyebrow>Posting calendar. First 4 weeks.</SubEyebrow>
        <div className="space-y-2">
          {[
            { wk: 'Week 1', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: '' },
            { wk: 'Week 2', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: 'Pillar video no. 1 (Character).' },
            { wk: 'Week 3', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: '' },
            { wk: 'Week 4', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: 'Pillar video no. 2 (Authority).' },
          ].map((w) => (
            <div key={w.wk} className="rounded-xl border border-zinc-800 bg-elevated/30 p-5">
              <p className="font-display text-white text-[14px] font-extrabold mb-2">{w.wk}</p>
              <p className="text-zinc-300 text-[13px] mb-1"><span className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mr-2">Shorts</span>{w.shorts}</p>
              {w.longs && <p className="text-zinc-300 text-[13px]"><span className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mr-2">Longs</span>{w.longs}</p>}
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
