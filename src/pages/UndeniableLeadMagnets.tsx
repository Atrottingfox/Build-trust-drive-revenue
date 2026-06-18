import React from 'react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const STATUS_STYLES: Record<string, string> = {
  'Not started': 'bg-zinc-800 text-zinc-400 border-zinc-700',
  'Naming pending': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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

type Asset = {
  id: string;
  name: string;
  formerly?: string;
  status: keyof typeof STATUS_STYLES;
  format: string;
  outcome: string;
  notes: string;
};

const ASSETS: Asset[] = [
  {
    id: 'profit-path',
    name: 'Six Step Profit Path',
    formerly: 'Customer Journey Blueprint',
    status: 'Building',
    format: 'PDF with video lesson, audio lesson, bonus GPTs',
    outcome: 'Takes leads through 6 phases. Awareness, consideration, research, hope, purchase, advocacy.',
    notes: 'Renamed from the old name. Asset already exists. New landing page in build.',
  },
  {
    id: 'sales-success-system',
    name: 'Sales Success System',
    status: 'Naming pending',
    format: 'PDF and video walk-through',
    outcome: 'The sales framework used on every workshop call.',
    notes: 'Working titles considered include "From Cold to Sold". Final name to be confirmed.',
  },
  {
    id: 'bottleneck-buster',
    name: 'Bottleneck Buster',
    status: 'Live',
    format: 'Interactive diagnostic. 63 personalised solution combinations. 30-day re-submission lockout.',
    outcome: 'A personalised solution to the single biggest problem in the user\'s business, plus a video walking through the fix.',
    notes: 'Naming may need testing. Most people do not know "bottleneck" or "diagnostic".',
  },
  {
    id: 'machine-framework',
    name: 'Machine Framework',
    formerly: 'NEXT EXPAND',
    status: 'Live',
    format: 'PDF. The acronym NEXT EXPAND.',
    outcome: 'A hiring and operations framework. Build a business that runs without you.',
    notes: 'Built live on stage during the Gabe video. Already printed.',
  },
  {
    id: 'client-capacity-calculator',
    name: 'Client Capacity Calculator',
    status: 'Naming pending',
    format: 'Web calculator. Inputs: clients in vs clients out over a period.',
    outcome: 'Tells you whether you grow, hold flat, or shrink at your current math.',
    notes: 'Working concept also called the Churn Calculator. Tied to the leaky bucket idea. Naming to be tested.',
  },
];

export default function UndeniableLeadMagnets() {
  return (
    <Shell title="Lead Magnets · Undeniable" description="The lead magnet assets. Names, formats, status." path="/undeniablenextsteps/lead-magnets">
      <PageHead
        eyebrow="Working page"
        title="Lead"
        accent="Magnets."
        blurb="The 5 lead magnet assets. Names, formats, and what each one does."
      />
      <Divider />

      <Wrap>
        <div className="space-y-5">
          {ASSETS.map((a, i) => (
            <div key={a.id} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="font-display text-[20px] font-extrabold text-blue-400 leading-none">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white leading-tight">{a.name}</h3>
                <Status s={a.status} />
              </div>
              {a.formerly && (
                <p className="text-zinc-500 text-[12px] italic mb-5">Formerly: {a.formerly}</p>
              )}
              {!a.formerly && <div className="mb-3" />}

              <div className="grid md:grid-cols-[120px_1fr] gap-x-6 gap-y-3 mb-4">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Format</p>
                <p className="text-zinc-200 text-[14px] leading-relaxed">{a.format}</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Outcome</p>
                <p className="text-zinc-200 text-[14px] leading-relaxed">{a.outcome}</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Notes</p>
                <p className="text-zinc-400 text-[13px] leading-relaxed italic">{a.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
