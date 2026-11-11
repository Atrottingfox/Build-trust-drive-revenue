import { useState } from 'react';
import { Plus } from 'lucide-react';

/*
  The five beliefs from the founding VSL outline (Notion, "VSL - Founding 90
  Day Install"), answered in writing: category, method, founder, team, timing.
  Then the practical ones. Every answer restates something already on the page
  or something Sean has said. Nothing new is promised here.
*/

const FAQ: { q: string; a: string[] }[] = [
  {
    q: 'Do we need more reach first?',
    a: [
      'Reach sells the $20 product. Nobody buys a $20,000 service from attention.',
      'A high ticket buyer needs the right attention, paired with authority. That is what the system is built to create.',
    ],
  },
  {
    q: 'Why not just hire an agency?',
    a: [
      'An agency makes the content and leaves when the contract does.',
      'This trains your team to run the system themselves, so it stays when we step back.',
    ],
  },
  {
    q: 'Do I have to be in every part of it?',
    a: [
      'Your voice has to be in it. Your hours do not.',
      'You film. Your team runs the rest. Outside of filming, you spend under 5 hours a week on content, more only if you want to.',
    ],
  },
  {
    q: 'What if my team cannot do this?',
    a: [
      'Most teams are given the job and never the playbook.',
      'Yours gets every SOP, every edit, the training library and two Loom reviews a week on their own work. If your team has not made a material change to how content is planned, produced, reviewed or published by day 30, I refund $5,000 AUD.',
    ],
  },
  {
    q: 'Why not wait until the new year?',
    a: [
      '1:1 guided implementation starts January anyway.',
      'Pay in full by 30 November and your team has the SOPs, playbooks and training in December, so January runs from day one.',
    ],
  },
  {
    q: 'What does my team need to commit to?',
    a: [
      'Attending at least 80% of agreed sessions, getting the required founder inputs to us on time, and completing the agreed implementation work. Those are also the conditions on both guarantees.',
    ],
  },
  {
    q: 'When is my Brand Day?',
    a: [
      'We lock in your date as soon as you buy. 1:1 guided implementation starts January, after your Brand Day.',
    ],
  },
];

export default function FoundingFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-white text-[17px] font-semibold">{f.q}</span>
              <Plus className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pb-6 space-y-3 max-w-2xl">
                  {f.a.map((p, j) => (
                    <p key={j} className={j === 0 ? 'text-zinc-200 leading-relaxed' : 'text-zinc-400 leading-relaxed'}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
