import React from 'react';
import { Check } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

// ─── Data ─────────────────────────────────────────────────────────────────
// Built on the Content section: 4 pillars, 4 formats, the 10 hooks.
// Grounded in the brand day session. One shootable piece per topic.

type Piece = { topic: string; format: 'Story' | 'Belief' | 'Teach' | 'Show'; hook: string; point: string };
type Group = { pillar: string; pieces: Piece[] };

const CONTENT: Group[] = [
  {
    pillar: 'Mindset / Identity',
    pieces: [
      { topic: "'Just a PT' > business owner", format: 'Belief', hook: "If you're sick of being called 'just a PT', listen up.", point: "You're not a trainer who got big. You're a business owner who happens to coach. The identity shift comes before the income." },
      { topic: 'Hard and boring work', format: 'Story', hook: 'The year I grew the fastest, I did the most boring work of my life.', point: "Growth is not the exciting stuff. It's the reps nobody posts about." },
      { topic: 'Identity leveling up', format: 'Belief', hook: "Most coaches don't have a money problem. They have an identity problem.", point: 'You behave like the operator you believe you are. Level the identity, the income follows.' },
      { topic: 'Impact / mission / duty', format: 'Story', hook: 'I used to think charging more made me greedy.', point: "Undercharging is not humble. It caps your impact and the people you can actually help." },
      { topic: "Doing what's required", format: 'Story', hook: 'Mateo hit 40K months and got depressed.', point: "Vertical growth feels great until it stops. Then you're back on the treadmill. Doing what's required is the unsexy consistency in between." },
    ],
  },
  {
    pillar: 'Leads / Attract',
    pieces: [
      { topic: 'Niche (who you help)', format: 'Belief', hook: 'Most coaches think they have a lead problem. When I was a PT, I thought I did too.', point: "It's rarely a lead problem. It's a clarity problem about who you are for." },
      { topic: 'Message (what you say)', format: 'Teach', hook: "If a stranger can't tell what you do in 10 posts, you don't have a content problem.", point: 'You have a clarity problem. Say the one thing. Then repeat it until it sticks.' },
      { topic: 'Content', format: 'Belief', hook: 'Volume is the wrong play. I tested it.', point: 'Value beats volume. One piece that lands beats ten that get scrolled past.' },
      { topic: 'Proof (authority / case studies)', format: 'Story', hook: 'Sabine came to me at 15K months. She is now touching 80K.', point: 'Walk the path of what actually changed. Proof through one real client, not a testimonial wall.' },
      { topic: 'Lead Magnets / funnels', format: 'Show', hook: 'Let me show you the one asset that takes a stranger from never heard of you to I am in.', point: 'A simple lead magnet that does the trust work before they ever speak to you.' },
    ],
  },
  {
    pillar: 'Sales / Conversion',
    pieces: [
      { topic: 'Offer design', format: 'Belief', hook: 'Nobody actually wants coaching. They want speed.', point: 'Sell the outcome and how fast they get there, not the sessions.' },
      { topic: 'Pricing', format: 'Story', hook: 'At my first event I made $175. It is the exact same thing I charge $22K for now.', point: 'Price is a function of belief and outcome, not hours on the clock.' },
      { topic: 'Show rate', format: 'Teach', hook: 'If your leads ghost the call, the problem started before they ever booked.', point: 'Three steps to lift show rate: pre call nurture, the right reminders, and framing the call as the win.' },
      { topic: 'Close rate', format: 'Show', hook: 'Let me do the math on why your close rate is fine and your leads are not.', point: 'Live math on the phone. Qualified leads versus raw leads. The number people cannot argue with.' },
      { topic: 'Renewals', format: 'Belief', hook: 'Everyone obsesses over new clients. Your next month is hiding in your current ones.', point: 'Renewals are the cheapest revenue you have. Most coaches never even ask.' },
    ],
  },
  {
    pillar: 'Scale / Delivery',
    pieces: [
      { topic: 'Churn / retention', format: 'Show', hook: 'Let me draw you the one graph most coaches cannot argue with.', point: 'The lead versus churn inverse. The leaky bucket. You cannot out market a business that leaks clients out the back.' },
      { topic: 'LTV', format: 'Show', hook: 'Imagine you never lost a client. Now let me do the math on your real numbers.', point: 'The client capacity calculator. Clients in versus clients out tells you if you grow, stay flat, or shrink.' },
      { topic: 'Check ins', format: 'Teach', hook: 'Your check ins are where clients quietly decide to leave.', point: 'Three steps to turn check ins into retention moments instead of admin.' },
      { topic: 'Hiring / staff', format: 'Show', hook: 'Here is how you build a business that runs without you.', point: 'The MACHINE framework. Map the roles, activate your SOPs, hire to the system not the chaos.' },
      { topic: 'Systems / scale', format: 'Belief', hook: 'Your strategy should be simplification, not multiplication.', point: 'Scale comes from removing things, not adding them. Most people scale the mess.' },
    ],
  },
];

const FORMAT_STYLE: Record<Piece['format'], string> = {
  Story: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/[0.06]',
  Belief: 'text-blue-300 border-blue-500/30 bg-blue-500/[0.06]',
  Teach: 'text-amber-300 border-amber-500/30 bg-amber-500/[0.06]',
  Show: 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/[0.06]',
};

const STORAGE_KEY = 'undeniable-content-approved';

function useApproved() {
  const [approved, setApproved] = React.useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  });
  const toggle = (id: string) => {
    setApproved((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return { approved, toggle };
}

function Row({ id, n, piece, approved, toggle }: { id: string; n: number; piece: Piece; approved: boolean; toggle: (id: string) => void }) {
  return (
    <div className={`grid grid-cols-[28px_1fr_auto] gap-4 md:gap-6 px-5 md:px-6 py-5 border-b border-zinc-800/70 ${approved ? 'bg-blue-500/[0.03]' : ''}`}>
      <span className="font-display text-[13px] font-extrabold text-zinc-600 pt-1">{String(n).padStart(2, '0')}</span>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-[10px] uppercase tracking-widest font-semibold border rounded-full px-2.5 py-0.5 ${FORMAT_STYLE[piece.format]}`}>{piece.format}</span>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 border border-zinc-800 rounded-full px-2.5 py-0.5">{piece.topic}</span>
        </div>
        <p className="text-white font-display font-extrabold text-[15px] md:text-[17px] leading-snug mb-1.5">{piece.hook}</p>
        <p className="text-zinc-400 text-[13px] md:text-[14px] leading-relaxed">{piece.point}</p>
      </div>
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-pressed={approved}
        className={`self-start mt-1 w-7 h-7 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${approved ? 'border-blue-500 bg-blue-500 text-white' : 'border-zinc-700 text-transparent hover:border-zinc-500'}`}
      >
        <Check className="w-4 h-4" strokeWidth={3} />
      </button>
    </div>
  );
}

export default function UndeniableContentBank() {
  const { approved, toggle } = useApproved();
  const all = CONTENT.flatMap((g) => g.pieces);
  const approvedCount = all.filter((_, i) => approved[`c${i}`]).length;
  let counter = 0;

  return (
    <Shell title="Content Database · Undeniable" description="Every piece to shoot, by pillar. Hook, format, the point. Tap to approve." path="/undeniablenextsteps/content-bank">
      <PageHead
        eyebrow="Working page · Shoot list"
        title="Content"
        accent="Database."
        blurb="Every piece to shoot, organised by pillar. Each one has its format, its hook, and the point. Read the hook, read the point, tap the circle to approve. What you approve is what we shoot."
      />
      <Divider />

      <Wrap>
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-400 text-[14px]">{all.length} pieces. Every topic covered.</p>
          <p className="text-blue-300 text-[14px] font-semibold">{approvedCount} approved</p>
        </div>

        <div className="space-y-10">
          {CONTENT.map((group) => (
            <div key={group.pillar}>
              <h2 className="font-display text-[20px] md:text-[22px] font-extrabold text-white mb-4">{group.pillar}</h2>
              <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-elevated/20">
                {group.pieces.map((piece) => {
                  const id = `c${counter}`;
                  const n = ++counter;
                  return <Row key={id} id={id} n={n} piece={piece} approved={!!approved[id]} toggle={toggle} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
