import React from 'react';
import { Shell, PageHead, Wrap } from '../components/undeniable/Bits';

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
    label: 'The Positioning Play. Full Playbook. 2 to 3 day shoot.',
    question: "Does this person actually know what they're talking about at depth?",
    titles: [
      'F*ck It, This Is How to Build a $1M+ Online Fitness Business',
      "\"As an Online Fitness Coach, How Can I Make $1M?\" Just Do This.",
      'How I Made $XM Online Coaching Without Going Viral',
    ],
  },
  {
    n: 'Week 3',
    pillar: 'Niche Authority',
    label: 'Tactical Operator Video. The Public VSL.',
    question: 'Does this apply specifically to me?',
    titles: [
      "If I Wanted to Make $1M as a Fitness Coach Again, I'd Do This",
      'How to Become a $1M Fitness Coach',
      'How to Make Your First $1M as a Fitness Coach (Step by Step)',
      'How to Make Your First $1M in Fitness (Full Walkthrough)',
    ],
  },
  {
    n: 'Week 4',
    pillar: 'Practical',
    label: 'Signature Framework. The unique mechanism.',
    question: "Do I trust this person's specific frameworks?",
    titles: [
      'How I Made $X/Month as a PT (Without …)',
      'Stop "Learning Marketing" and Just Copy This',
    ],
  },
  {
    n: 'Week 5',
    pillar: 'Implementable',
    label: 'Accessible Insights.',
    question: "Do they have insights I can't find anywhere else?",
    titles: [
      'Stop "Learning Marketing" and Just Copy This (Complete Plan)',
      "If I Wanted to Add $10,000/Month as a PT, I'd Just Do This",
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
      "Every Fitness Creator Gets Stuck at the Same Point. If That's You, Do This.",
      'How to Add $10,000/Month as a PT (The Exact System)',
    ],
  },
];

export default function UndeniableContentLongForm() {
  return (
    <Shell title="Long Form · Content · Undeniable" description="One long form per week. Six pillars in rotation, with working titles." path="/undeniablenextsteps/content/long-form">
      <PageHead
        eyebrow="Content · Long form"
        title="Long"
        accent="Form."
        blurb="One long form a week. Six pillars on rotation, each answering the next question a viewer has before they trust you. Working titles below."
        backHref="/undeniablenextsteps/content"
        backLabel="Content"
      />

      <Wrap>
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
      </Wrap>
    </Shell>
  );
}
