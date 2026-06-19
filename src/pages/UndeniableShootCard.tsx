import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

// ─── 4 Buckets aligned with the 4 Formats from /content ────────────────

type Bucket = {
  id: string;
  name: string;
  type: string;
  env: string;
  tone: string;
  structure: string[];
  hooks: string[];
};

const BUCKETS: Bucket[] = [
  {
    id: 'story',
    name: 'Story',
    type: 'Teach through experience',
    env: 'Outdoors. Walk / talk.',
    tone: 'Relatable',
    structure: [
      'Hook (moment)',
      'What happened (scene / situation)',
      'Feeling / meaning / cost (pain / money / emotion)',
      'Realisation / lesson / shift',
      'Takeaway one liner + tool (implementable)',
    ],
    // Pulled from Hook Bank: Story openers, Without X, Money problem (story openers)
    hooks: [
      'I built a $5M fitness business without going viral. Here\'s everything I did.',
      'I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.',
      'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away from all of it.',
      'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
      'Three years ago I ran a seminar for 16 people and made $175. I teach the same thing now for 22 grand.',
      'I spent 750 grand on a gym no one is allowed to train at. Here\'s why that\'s the smartest thing I\'ve done.',
      'Come test me in person. You can fake a script. You can\'t freeball in a room.',
      'Everyone tells you to go viral. I did the opposite and made more money.',
    ],
  },
  {
    id: 'belief',
    name: 'Belief',
    type: 'Teach through perspective',
    env: 'Casual hallway / lounge.',
    tone: 'Authentic',
    structure: [
      'Hook (contrarian / misconception / bold statement / binary / old vs new / relatable pain)',
      'State common belief (and why it exists)',
      'State your belief (and remove self blame)',
      'Explanation plus one proof / example',
      'Takeaway',
    ],
    // Pulled from Hook Bank: Contrarian, Old way vs new way, Stop X, Imagine, Just a PT, The feeling
    hooks: [
      'Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.',
      'Income buys you impact. You\'re not changing the world coaching 25 people.',
      'No one cares about the influencer\'s challenge until people buy it. Then you care. Let\'s talk about why.',
      'Manual effort will reign supreme. You can\'t cheat it, and that\'s good news for you.',
      'If it triggers you, it\'s probably true.',
      'Your competitors are setting your prices, not your clients. That\'s why you\'re underpaid.',
      'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
      'Old way: loom check ins. New way: written check ins anyone can run. Here\'s the difference in your week.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it for you.',
      'You feel like you\'re treading water and working harder to stay in the same place. There\'s a reason.',
      'You\'re not lazy and you\'re not stupid. You\'re stuck in the part of the business no one warned you about.',
      'If you\'re sick of being called just a PT, even though you\'re running over 10K, I finally worked out why.',
      'You\'re not just a PT. But your business is built like you are.',
      'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
      'Stop learning marketing and just copy this.',
      'Stop running pay in-full offers. They look great in screenshots and they\'re killing your cash flow.',
      'Stop trying to choose your niche. Your content already chose it for you.',
      'Imagine if you never lost a client. You\'d stop selling and start choosing.',
      'Imagine if you didn\'t have to compromise. 50 clients on stage and a business that doesn\'t suck to own.',
    ],
  },
  {
    id: 'teach',
    name: 'Teach',
    type: 'Teach through explanation',
    env: 'Desk / gym.',
    tone: 'Authoritative',
    structure: [
      'Hook (If you / If I. Problem, pain, want, desire.)',
      'Core issue / problem',
      '3 to 5 steps (with a tool or a "don\'t do this")',
      'One core takeaway line',
    ],
    // Pulled from Hook Bank: Binary, Promise+timebox, Scepticism, If you're still
    hooks: [
      'There are two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.',
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'You either wait for everyone else to tell you what to do, or you test everything. Which one are you?',
      'Doers and waiters. Your content is training one of them to come to you.',
      'In 60 seconds I\'ll show you how to stop losing clients in the first 90 days.',
      'Give me five minutes and I\'ll find the one number that\'s capping your business.',
      'By the end of this video you\'ll know exactly what your next step is. Not three. One.',
      'In two minutes I\'ll show you the difference between a 30-client business and a 300-client one.',
      'You\'ve been burned before. Good. Stay sceptical and watch this anyway.',
      'Don\'t trust me. Check the receipts. Then come back.',
      'If you\'ve paid a mentor who\'d never done it themselves, this one\'s for you.',
      'Come at this with your bullshit meter on high. I\'ll wait.',
      'If you think you need more leads to grow your business, you\'re probably making the exact same mistake I made.',
      'Every PT only has 12 to 16 weeks with a client. Here\'s how we doubled that.',
    ],
  },
  {
    id: 'show',
    name: 'Show',
    type: 'Teach through demonstration',
    env: 'Whiteboard / top down.',
    tone: 'Demonstrative',
    structure: [
      'Hook',
      'State the problem in their words',
      'Draw the model, do the math, or show',
      'Say what that means for them. One liner.',
      'Takeaway / next step',
    ],
    // Pulled from Hook Bank: The math, Churn, Money problem (math/show ones), Profit vs revenue
    hooks: [
      'Online coaches think they work a lot. Let\'s actually do the math.',
      'You\'ve got 100 clients and think you\'re flat out. You\'re working a 12-hour week and don\'t know it.',
      'Everyone\'s the show pony. Let me be the logical one for a second and just do the numbers.',
      'I\'m going to do the math on your business and you\'re not going to like it.',
      'A 20-minute check in doesn\'t make you a better coach. It makes you a slower one.',
      'My client lost $800,000 and never even knew it.',
      'I did the math on his business live and he went white in the face.',
      'You\'re losing more money in your business right now than you\'re making. Let me show you where.',
      'There\'s a number in your business you\'ve never calculated, and it\'s costing you six figures.',
      'I made an extra $120,000 that year and thought I\'d won. I\'d actually left $600,000 on the table.',
      'Two clients leave a month and you think that\'s fine. Let me show you what it actually costs you.',
      'It feels like two steps forward and two steps back every month. That\'s not a feeling, that\'s a number.',
      'Every month you walk into the next one with less oxygen than before. Here\'s why.',
      'You don\'t have a lead problem. You have a churn problem. You just haven\'t done the math.',
      'Anything above 3% churn means 60% of your business is gone every year.',
      'You\'re filling a bucket with holes in it and wondering why it never gets full.',
      'Stop chasing more leads. Plug the leak first.',
      'You\'re doing 80K months and keeping nothing. Let me show you why.',
      'Revenue resets to zero on the first of the month and you start panicking again. That\'s not a money problem.',
      'The coach doing 40K months is keeping more than the one doing 80K. Here\'s how.',
    ],
  },
];

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* noop */ }
  };
  return (
    <button onClick={onClick} className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 hover:text-blue-400 transition-colors flex-shrink-0">
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

export default function UndeniableShootCard() {
  return (
    <Shell title="Next Shoot · Undeniable" description="The on the day shoot tool. Master formula, 4 buckets aligned with the 4 formats, real hooks from the Hook Bank." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Working tool"
        title="Next"
        accent="Shoot."
        blurb="Hook > Problem > Path / Solution > Takeaway. 4 buckets: Story, Belief, Teach, Show. Hooks pulled from the Hook Bank."
      />
      <Divider />

      {/* TOC */}
      <Wrap>
        <Eyebrow>What\'s on this page</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {BUCKETS.map((b) => (
            <a key={b.id} href={`#${b.id}`} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-4 py-3">
              <span className="text-zinc-200 text-[13px] font-medium group-hover:text-white">{b.name}</span>
              <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" />
            </a>
          ))}
        </div>
        <a href="/undeniablenextsteps/content" className="text-blue-400 hover:text-blue-300 text-[13px] inline-flex items-center gap-1">
          Open the full Content page for pillars, cadence, calendar, data <ArrowRight className="w-3 h-3" />
        </a>
      </Wrap>

      <Divider />

      {/* MASTER FORMULA */}
      <Wrap>
        <Eyebrow>Master formula</Eyebrow>
        <p className="text-zinc-200 text-[16px] md:text-[18px] leading-relaxed mb-2">Every piece is Hook &gt; Problem &gt; Path / Solution &gt; Takeaway.</p>
        <p className="text-zinc-400 text-[14px] leading-relaxed">4 ways to do it. Two types: Share (Story, Belief) and Teach (Teach, Show).</p>
      </Wrap>

      <Divider />

      {/* BUCKETS */}
      {BUCKETS.map((b, idx) => (
        <React.Fragment key={b.id}>
          <Wrap id={b.id}>
            <Eyebrow>{b.name}</Eyebrow>

            <div className="grid md:grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl border border-zinc-800 bg-elevated/40 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Type</p>
                <p className="text-zinc-200 text-[13px]">{b.type}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-elevated/40 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Environment</p>
                <p className="text-zinc-200 text-[13px]">{b.env}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-elevated/40 px-4 py-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Tone</p>
                <p className="text-zinc-200 text-[13px]">{b.tone}</p>
              </div>
            </div>

            {/* Structure */}
            <div className="mb-8">
              <SubEyebrow>Structure</SubEyebrow>
              <ol className="space-y-1.5">
                {b.structure.map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="font-display text-blue-400 text-[11px] font-extrabold mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-200 text-[13px] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Hooks from Hook Bank */}
            <div>
              <SubEyebrow>Hooks (from the Hook Bank)</SubEyebrow>
              <div className="space-y-2">
                {b.hooks.map((h) => (
                  <div key={h} className="rounded-xl border border-zinc-800 bg-elevated/40 px-4 py-3 flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <p className="text-zinc-200 text-[13px] leading-relaxed flex-1">"{h}"</p>
                    <CopyBtn text={h} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="/undeniablenextsteps/hooks" className="text-blue-400 hover:text-blue-300 text-[13px] inline-flex items-center gap-1">
                  Open the full Hook Bank <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Wrap>
          {idx < BUCKETS.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Shell>
  );
}
