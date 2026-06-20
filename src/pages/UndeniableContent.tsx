import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SEGMENTS: Array<{ to: string; n: string; label: string; blurb: string }> = [
  {
    to: '/undeniablenextsteps/content/foundation',
    n: '01',
    label: 'The Foundation',
    blurb: 'Pillars, formats, environments, hooks. What every piece is made from.',
  },
  {
    to: '/undeniablenextsteps/content/short-form',
    n: '02',
    label: 'Short Form',
    blurb: 'The first 4 weeks. Test hooks, optimise, read topic and format. The posting calendar.',
  },
  {
    to: '/undeniablenextsteps/content/long-form',
    n: '03',
    label: 'Long Form',
    blurb: 'One a week. Six pillars on rotation, with working titles.',
  },
  {
    to: '/undeniablenextsteps/content/data',
    n: '04',
    label: 'Data',
    blurb: 'What we log on every piece, and when. The scoreboard.',
  },
];

export default function UndeniableContent() {
  return (
    <Shell title="Content · Undeniable" description="The content system in four parts: the foundation, short form, long form, and data." path="/undeniablenextsteps/content">
      <PageHead
        eyebrow="First 4 weeks"
        title=""
        accent="Content."
        blurb="The first four weeks is testing. We gather data, and we double down on what works. Everything below is how that runs."
        backHref="/undeniablenextsteps"
        backLabel="Next Steps hub"
      />

      <Wrap>
        <Eyebrow>The full overview</Eyebrow>
        <div className="grid gap-4">
          {SEGMENTS.map((s) => (
            <a key={s.to} href={s.to} className="group flex items-center gap-5 rounded-2xl border border-zinc-800 bg-elevated/30 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors p-6 md:p-7">
              <span className="font-display text-[22px] md:text-[26px] font-extrabold text-blue-500 tabular-nums leading-none flex-shrink-0">{s.n}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-[19px] md:text-[22px] font-extrabold text-white leading-tight mb-1">{s.label}</h3>
                <p className="text-zinc-400 text-[14px] leading-relaxed">{s.blurb}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
