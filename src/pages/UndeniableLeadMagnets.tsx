import React from 'react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

type Asset = {
  what_it_does: string;
  what_it_says: string;
};

const ASSETS: Asset[] = [
  {
    what_it_does: 'Takes a lead from never-heard-of-you through to advocate.',
    what_it_says: 'A 6 phase framework: awareness, consideration, research, hope, purchase, advocacy. Delivered as a PDF with a video lesson, an audio lesson, and bonus GPTs.',
  },
  {
    what_it_does: 'Hands over the sales framework used on every workshop call.',
    what_it_says: 'A PDF and video walk-through of the sales conversation, stripped to its frame so a coach can run it themselves.',
  },
  {
    what_it_does: 'Surfaces the single biggest problem in a coach\'s business and gives them the fix.',
    what_it_says: 'An interactive tool with 63 personalised solution combinations. 30 day re-submission lockout. Each output comes with a video walking through the fix.',
  },
  {
    what_it_does: 'Shows a coach how to hire and operate so the business runs without them.',
    what_it_says: 'A PDF built around the NEXT EXPAND acronym. Already in the book. Built live on stage during the Gabe video.',
  },
  {
    what_it_does: 'Tells a coach whether their business is growing, flat, or shrinking based on current client math.',
    what_it_says: 'A web calculator. Inputs: clients in vs clients out over a period. Output: grow / flat / shrink reading tied to the leaky bucket concept.',
  },
];

export default function UndeniableLeadMagnets() {
  return (
    <Shell title="Lead Magnets · Undeniable" description="The lead magnet assets. What each one does and what it says." path="/undeniablenextsteps/lead-magnets">
      <PageHead
        eyebrow="Working page"
        title="Lead"
        accent="Magnets."
        blurb="The 5 lead magnet assets that capture demand and funnel into the workshop. For each: what it does and what it covers. Names and status intentionally left out."
      />
      <Divider />

      <Wrap>
        <div className="space-y-5">
          {ASSETS.map((a, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <span className="font-display text-[24px] font-extrabold text-blue-400 leading-none block mb-5">{String(i + 1).padStart(2, '0')}</span>

              <div className="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">What it does</p>
                <p className="text-zinc-100 text-[15px] font-medium leading-relaxed">{a.what_it_does}</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">What it says</p>
                <p className="text-zinc-300 text-[14px] leading-relaxed">{a.what_it_says}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
