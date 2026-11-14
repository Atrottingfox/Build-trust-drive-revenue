import { useState } from 'react';
import { Plus } from 'lucide-react';

/*
  The five beliefs from the founding VSL outline (Notion, "VSL - Founding 90
  Day Install"), answered in writing: category, method, founder, team, timing.
  Then the practical ones. Every answer restates something already on the page
  or something Sean has said. Nothing new is promised here.
*/

const FAQ: { q: string; a: string[] }[] = [
  /* Sean's own answers, 14 Nov. Kept in his words, with the page's locked
     facts: $30 / $30,000 (his 13 Nov change), "starting January" (14 Nov),
     no "every edit". */
  {
    q: 'Do we need more reach first?',
    a: [
      'Reach sells the $30 product. Nobody buys a $30,000 service from attention.',
      'What you need is an engaged audience and above 5,000 followers. Followers is not our goal, however we work best as an accelerant, not a fire starter.',
      'A high ticket buyer needs the right attention, paired with authority.',
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
    q: 'Why not wait until the new year?',
    a: [
      '1:1 implementation starts in the next available intake month, starting January.',
      'Pay in full by 30 November and your team has the training, and access to group office hours advisory calls every Thursday up until kickoff date.',
      'This way when we start, we\'re all ready to go. When spots fill for each month, a waitlist for the next intake begins.',
    ],
  },
  {
    q: 'What if my team cannot do this?',
    a: [
      'Most teams are more capable than we think. What they lack is the ability to self assess with a feedback loop tight enough to improve.',
      'Yours gets every SOP, the training library and two Loom reviews a week on their own work. And as soon as 1:1 begins, they get prescriptive and direct assistance to break their biggest bottleneck.',
      'If your team has not made a material change to how content is planned, produced, reviewed or published by day 30, I\'ll pay you $5,000 AUD for your time.',
    ],
  },
  {
    q: 'Do I have to be in every part of it?',
    a: [
      'You must film, be involved in ideation and be willing to collaborate on those ideas. Your team will do the rest.',
      'Outside of filming you spend under 5 hours a week on content, more only if you want to.',
      'And what we do first, is find the content that exists inside activities you\'re already doing.',
    ],
  },
  {
    q: 'What does my team need to commit to?',
    a: [
      'Attending at least 80% of agreed sessions, getting the required founder inputs to us on time, and completing the agreed implementation work. Those are also the conditions on both guarantees.',
    ],
  },
  {
    q: 'Can I work with you privately to hire talent?',
    a: [
      'We work with a small number of founders privately each quarter.',
      'This typically does include finding and hiring the talent who runs their team.',
      'We take 5 per quarter at $50,000 AUD with a minimum 6 month commitment.',
    ],
  },
  {
    q: 'When is my Brand Day?',
    a: [
      'We lock in your date as soon as you buy. 1:1 guided implementation starts in the next available intake month, starting January, after your Brand Day.',
    ],
  },
];

/* leadWith moves one question to the top (and opens it). Other pages keep the default order. */
export default function FoundingFaq({ leadWith }: { leadWith?: string } = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const lead = leadWith ? FAQ.filter((f) => f.q === leadWith) : [];
  const items = [...lead, ...FAQ.filter((f) => !lead.includes(f))];
  return (
    <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
      {items.map((f, i) => {
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
