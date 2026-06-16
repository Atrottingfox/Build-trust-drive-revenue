import React, { useState } from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2 } from '../components/undeniable/Bits';

// ─── Kick-off checklist ──────────────────────────────────────────────────

const KICKOFF: Array<{ title: string; rows: string[] }> = [
  { title: 'Education kick-off', rows: [
    'Hook = a clear promise',
    'One problem. Not three.',
    'Path / solution including a tool OR a "don\'t do this"',
    'Optional CTA: share / save / comment / follow',
    'Native bridge to an asset at ~1/3, or CTA at the end',
  ]},
  { title: 'Heart kick-off', rows: [
    'Relatable experience (the scar: pain, money)',
    'The damaging admission / vulnerability',
    'The lesson',
    'Empathy with where they are (not putting himself down)',
    'Lo-fi, chill. Not polished, not salesy',
  ]},
];

// ─── Data ────────────────────────────────────────────────────────────────

type Framework = {
  name: string;
  template: string;
  example: string;
  formats: string[];
};
type Piece = { n: string; framework: string; fields: Array<[string, string]> };
type Bucket = {
  id: string;
  name: string;
  env: string;
  frameworks: Framework[];
  moreFrameworks?: Framework[];
  pieces: Piece[];
  hooks: string[];
};

const BUCKETS: Bucket[] = [
  // ═══ STORIES ═══════════════════════════════════════════════════════════
  {
    id: 'stories',
    name: 'Stories',
    env: 'Park · outdoors · connection',
    frameworks: [
      {
        name: 'Transformation',
        template: 'Old situation → Friction → Turning point → New reality → Invitation',
        example: 'Fully booked and broke at 60 sessions a week. The week I capped my 1-on-1s and built one online offer, it flipped. Now I coach 40 people in the hours I used to coach 8.',
        formats: [
          'Walking outside, narrating the arc',
          'Sitting on a bench or in the car, recounting it casually',
          'Voice-over with B-roll of the old life vs the new',
        ],
      },
      {
        name: 'Specific Moment',
        template: 'The moment → What it cost → The realisation → The takeaway',
        example: 'A client asked to drop to fortnightly because money was tight. I said yes and drove home gutted. That night I saw I\'d built a business that broke the second one person flinched.',
        formats: [
          'Direct to camera in a quiet outdoor spot, intimate',
          'Walking, recreating the scene',
          'Sitting in the place it happened',
        ],
      },
    ],
    pieces: [
      { n: '01', framework: 'Transformation', fields: [
        ['Old situation', 'Trading time on the gym floor. Couldn\'t scale because I was the product.'],
        ['Friction', 'Every viral chase failed. The grind was breaking me.'],
        ['Turning point', 'Stopped trying to reach more people. Focused on the ones already there.'],
        ['New reality', 'A $5M business. Built without one viral moment.'],
        ['Invitation', 'Watch the long version on the channel.'],
      ]},
      { n: '02', framework: 'Specific Moment', fields: [
        ['The moment', 'We were doing 600% growth in five months. Numbers people would kill for.'],
        ['What it cost', 'I was ready to walk away from the whole thing.'],
        ['The realisation', 'Growing fast doesn\'t mean it\'s working. It can mean it\'s killing you.'],
        ['The takeaway', 'If you\'re growing and you hate your life, your business is broken, not your effort.'],
      ]},
      { n: '03', framework: 'Specific Moment', fields: [
        ['The moment', 'She was the client I was ready to lose. I built her a program designed to make her quit.'],
        ['What it cost', 'I was tired of trying. I was done.'],
        ['The realisation', 'She didn\'t quit. She did the work. Dropped 40 kilos. Got on stage.'],
        ['The takeaway', 'You don\'t find the best client. You build them.'],
      ]},
      { n: '04', framework: 'Transformation', fields: [
        ['Old situation', 'Less than 5,000 followers. 12 likes on a photo.'],
        ['Friction', 'Everyone said go viral. The whole industry said you need a following.'],
        ['Turning point', 'Built the business through the work, not the audience.'],
        ['New reality', '$2.2M US with less than 5K followers.'],
        ['Invitation', 'Your excuse just disappeared.'],
      ]},
      { n: '05', framework: 'Specific Moment', fields: [
        ['The moment', 'Someone asked how the gym I work at actually works. No one can train there.'],
        ['What it cost', 'I said: that\'s the whole point.'],
        ['The realisation', 'I\'d signalled status by what I refuse to do, not what I sell.'],
        ['The takeaway', 'A 750K gym no one can use says more than any testimonial.'],
      ]},
      { n: '06', framework: 'Transformation', fields: [
        ['Old situation', 'First seminar. 16 people. Two paid. Made $175.'],
        ['Friction', 'Same content I now charge 22 grand for. 80 hours preparing it.'],
        ['Turning point', 'I didn\'t change the content. I changed what I\'d done by then.'],
        ['New reality', 'Same lesson. Now it lands.'],
        ['Invitation', 'This is the why-now.'],
      ]},
    ],
    hooks: [
      'I built a $5M fitness business without going viral. Here\'s everything I did.',
      'I did it without influence and without following. So your excuse just disappeared.',
      'I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.',
      'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away from all of it.',
      'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
      'I spent 750 grand on a gym no one is allowed to train at. Here\'s why that\'s the smartest thing I\'ve done.',
      'On the sales call I asked her what she wanted. She said, McLaren money.',
      'A coach told me he loved coaching. His mate said, I just like making money.',
    ],
  },

  // ═══ BELIEFS ══════════════════════════════════════════════════════════
  {
    id: 'beliefs',
    name: 'Beliefs',
    env: 'Hallway · new office · direct',
    frameworks: [
      {
        name: 'Belief Flip',
        template: 'Common belief → Why it\'s accepted → Why it fails → What\'s true instead',
        example: 'Another certification won\'t get you clients. It feels productive because learning is safe. But your market never asks for your quals. The coaches booked solid won on positioning and proof.',
        formats: [
          'Direct to camera, hallway, eye-line tight',
          'Walking confidently, one continuous take',
          'Sitting in the new office, casual',
        ],
      },
      {
        name: 'Reframe',
        template: 'The pain → Remove the blame → The real cause → The shift',
        example: 'You\'re not bad at sales. You were taught to compete on cheap and helpful. The real issue is an offer that isn\'t built to be paid for.',
        formats: [
          'Direct to camera, softer tone',
          'Walking, contemplative pace',
          'Casual hallway, leaning on a wall',
        ],
      },
    ],
    pieces: [
      { n: '07', framework: 'Belief Flip', fields: [
        ['Common belief', '35 clients done brilliantly is more impactful than 350 who lose 10 kilos and move on.'],
        ['Why accepted', 'It feels noble. Hides the income ceiling.'],
        ['Why it fails', 'Income buys impact. You\'re not changing the world coaching 25 people.'],
        ['What\'s true', 'If you\'re impact-driven, you have a duty to build something big. Fight me.'],
      ]},
      { n: '08', framework: 'Belief Flip', fields: [
        ['Common belief', 'Big business equals ego. Small business equals purpose.'],
        ['Why accepted', 'The industry rewards humility. Coaches signal it by staying small.'],
        ['Why it fails', 'You can\'t scale impact without scaling income. Numbers prove it.'],
        ['What\'s true', 'Wealthier coaches help more people. The end.'],
      ]},
      { n: '09', framework: 'Reframe', fields: [
        ['The pain', 'You\'re running 10K-plus a month and still get called "just a PT".'],
        ['Remove the blame', 'You\'re not less than. The label isn\'t your fault.'],
        ['The real cause', 'Your business is built like a PT\'s. 12-16 week clients. Churn ignored.'],
        ['The shift', 'Extend retention to 32 weeks. The label disappears.'],
      ]},
      { n: '10', framework: 'Belief Flip', fields: [
        ['Common belief', 'Influencers shouldn\'t make money because their challenges are fake.'],
        ['Why accepted', 'It\'s easier to dismiss than compete.'],
        ['Why it fails', 'People care about results, not credentials. They vote with money.'],
        ['What\'s true', 'If the market pays for it, it works. Argue with the market, not the influencer.'],
      ]},
      { n: '11', framework: 'Reframe', fields: [
        ['The pain', 'You feel attacked when someone says something contrary.'],
        ['Remove the blame', 'It\'s not your ego. It\'s a signal.'],
        ['The real cause', 'Triggers point at the thing you\'ve avoided.'],
        ['The shift', 'Stop arguing with the truth. Use it. If it triggers you, it\'s probably true.'],
      ]},
      { n: '12', framework: 'Reframe', fields: [
        ['The pain', 'You can\'t raise prices because the market expects cheap.'],
        ['Remove the blame', 'You\'re not undervaluing yourself.'],
        ['The real cause', 'Your competitors are setting your prices, not your clients.'],
        ['The shift', 'Price the outcome, not the hours. The undercharging stops there.'],
      ]},
    ],
    hooks: [
      'Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.',
      'Income buys you impact. You\'re not changing the world coaching 25 people.',
      'If you\'re sick of being called just a PT, even though you\'re running over 10K, I finally worked out why.',
      'No one cares about the influencer\'s challenge until people buy it. Then you care. Let\'s talk about why.',
      'Most coaches think they have to compromise who they are to build something big. They\'re wrong.',
      'If it triggers you, it\'s probably true.',
      'Your competitors are setting your prices, not your clients. That\'s why you\'re underpaid.',
      'Manual effort will reign supreme. You can\'t cheat it, and that\'s good news for you.',
    ],
  },

  // ═══ TEACH ═════════════════════════════════════════════════════════════
  {
    id: 'teach',
    name: 'Teach',
    env: 'Gym · straight to camera',
    frameworks: [
      {
        name: 'The Binary',
        template: 'Two paths → Stakes → Pick one',
        example: 'Two ways to get leads. Door-knock every day, or post this exact thing five times a day. Pick one.',
        formats: [
          'Direct to camera, "either or"',
          'Walking, gesture one path then the other',
          'Standing between two parts of the gym, pointing each way',
        ],
      },
      {
        name: 'Stop · Just Do',
        template: 'Stop the wrong thing → Why it fails → Just do this',
        example: 'Stop learning marketing. Copy this exact playbook.',
        formats: [
          'Talking head, blunt delivery',
          'Walking, declarative pace',
          'Casual gym setting, head-on',
        ],
      },
      {
        name: 'Old Way · New Way',
        template: 'Old way → Why it fails → New way → Result',
        example: 'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
        formats: [
          'Direct to camera, contrasting gestures',
          'Walking through both physical environments',
          'Standing in two different settings (then / now)',
        ],
      },
      {
        name: 'The List',
        template: 'Number → List → Reward',
        example: '3 ways to fill your coaching roster without spending a dollar on ads.',
        formats: [
          'Count on fingers, direct to camera',
          'Walking through the gym, listing aloud',
          'Sitting on a bench, casual',
        ],
      },
    ],
    moreFrameworks: [
      {
        name: 'The Compare',
        template: 'Path A + cost → Path B + cost → Which when',
        example: 'In-person vs online coaching. What most coaches don\'t see is which one scales at 80 clients.',
        formats: [
          'Direct to camera, "this or this"',
          'Walking, gesture between two options',
          'Two-shot pointing to physical sides',
        ],
      },
      {
        name: 'The How-To',
        template: 'Outcome → Step 1 → Step 2 → Step 3 → Next',
        example: 'How to add $10K/month as an experienced PT.',
        formats: [
          'Direct to camera, numbered steps',
          'Walking through the steps verbally',
          'Casual gym setting, talking it through',
        ],
      },
    ],
    pieces: [
      { n: '13', framework: 'The Binary', fields: [
        ['Two paths', 'Knock on doors every day. Or post this exact thing five times a day.'],
        ['Stakes', 'Door-knock: 50 hours a week, low scale. Posting: 5 hours, infinite scale once it works.'],
        ['Pick one', 'Pick one and commit for 90 days. Half-effort on both is the worst path.'],
      ]},
      { n: '14', framework: 'The Binary', fields: [
        ['Two paths', 'Doers test everything. Waiters wait for permission.'],
        ['Stakes', 'Your content selects which one shows up. Frame for doers, doers come. Frame soft, waiters come.'],
        ['Pick one', 'Decide who you\'re talking to. Then talk to them. Not both.'],
      ]},
      { n: '15', framework: 'Stop · Just Do', fields: [
        ['Stop', 'Stop buying courses. Stop watching ads about ads.'],
        ['Why it fails', 'You\'re learning faster than you\'re earning. Tactics overload.'],
        ['Just do', 'Copy a system that works. Run it 90 days. Then improve it.'],
      ]},
      { n: '16', framework: 'Old Way · New Way', fields: [
        ['Old way', 'Post every day. Engage. Hope it works.'],
        ['Why it fails', 'No connective tissue. Each piece dies alone.'],
        ['New way', 'Build an ecosystem. Hooks feed pillars. Pillars feed offers.'],
        ['Result', 'Same hours. Ten times the return.'],
      ]},
      { n: '17', framework: 'The Binary', fields: [
        ['Two paths', 'Path A: 80 individual check-ins a week. Path B: group rhythm + async loops.'],
        ['Stakes', 'Path A: 40 hours of check-ins alone. Path B: 12 hours, better outcomes.'],
        ['Pick one', 'If you\'re at 80 clients and burnt, you picked A. Move to B this week.'],
      ]},
    ],
    hooks: [
      'There are two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.',
      'Doers and waiters. Your content is training one of them to come to you.',
      'Stop learning marketing and just copy this.',
      'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'How to Add $10,000/Month as an Experienced PT.',
      'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
    ],
  },

  // ═══ SHOW ══════════════════════════════════════════════════════════════
  {
    id: 'show',
    name: 'Show',
    env: 'Whiteboard · desk · shown',
    frameworks: [
      {
        name: 'The Math Live',
        template: 'The premise → Pull out the phone → The math → The verdict',
        example: '100 clients × 15-min check-ins = 25 hours. Add 5 of comms, 5 of content, 5 of programs. 40-hour week. If you\'re flat out at 30, you\'re inefficient.',
        formats: [
          'Phone in hand, live calculator',
          'iPad numbers drawn',
          'Whiteboard math written out',
        ],
      },
      {
        name: 'The Bucket',
        template: 'Name the framework → Draw it live → What each part means → The lesson',
        example: 'The leaky bucket. Top = clients pouring in. Sides = clients leaking out. Above 3% leak rate = 60% of your business gone every year.',
        formats: [
          'Whiteboard drawn from scratch',
          'Top-down camera on paper',
          'iPad illustration',
        ],
      },
      {
        name: 'The Number Reveal',
        template: 'The pain → The number → What it means → The lesson',
        example: '$800,000. That\'s what one client lost in a year without ever knowing.',
        formats: [
          'Single number filling the screen',
          'Big text on iPad',
          'Whiteboard with one number circled',
        ],
      },
      {
        name: 'The Split Screen',
        template: 'Path A drawn → Path B drawn → Numbers under each → Verdict',
        example: '35 clients vs 350 clients. Revenue. Time. Impact. Which is bigger?',
        formats: [
          'Whiteboard split LEFT | RIGHT',
          'Two pieces of paper top-down',
          'iPad split view',
        ],
      },
    ],
    moreFrameworks: [
      {
        name: 'The Tutorial Shown',
        template: 'Outcome → Steps shown live → Result',
        example: 'How to calculate your true churn. Steps drawn live.',
        formats: [
          'Screen recording with clicks',
          'Whiteboard step-by-step',
          'iPad walkthrough',
        ],
      },
      {
        name: 'The Numbered Drawn',
        template: 'Number → Items drawn or shown → Reward',
        example: '3 numbers that matter more than revenue. Drawn live with each circled.',
        formats: [
          'Whiteboard numbered list',
          'Top-down paper with each one ticked off',
          'iPad list drawn',
        ],
      },
    ],
    pieces: [
      { n: '18', framework: 'The Number Reveal', fields: [
        ['The pain', 'He thought he was killing it. Top-line growing every month.'],
        ['The number', '$800,000.'],
        ['What it means', 'That\'s what hidden churn ate. Wasn\'t on any dashboard.'],
        ['The lesson', 'If you\'re not measuring it, you\'re losing it. My client lost $800,000 and never even knew.'],
      ]},
      { n: '19', framework: 'The Math Live', fields: [
        ['The premise', 'Coaches think 3% churn is fine. Let\'s actually do the math.'],
        ['Pull out the phone', '100 clients. Lose 3 a month. After 12 months, that\'s 36 gone.'],
        ['The math', 'You\'ve had to replace 36 just to stand still. Compound that against client lifetime value.'],
        ['The verdict', 'Anything above 3% churn means 60% of your business is gone every year.'],
      ]},
      { n: '20', framework: 'The Bucket', fields: [
        ['Name the framework', 'The leaky bucket.'],
        ['Draw it live', 'Top = new clients in. Sides = clients leaving.'],
        ['What each part means', 'If the holes are smaller than inflow, you grow. Same = flat. Bigger = shrinking. Most coaches don\'t measure the holes.'],
        ['The lesson', 'Imagine if you never lost a client. You\'d stop selling and start choosing.'],
      ]},
      { n: '21', framework: 'The Math Live', fields: [
        ['The premise', 'Online coaches think they work a lot. Let\'s actually do the math on a 100-client week.'],
        ['Pull out the phone', '100 × 15-min check-ins = 25 hours.'],
        ['The math', '+ 5 hours of comms + 5 of content + 5 of programs = 40-hour week.'],
        ['The verdict', 'If you\'re flat out at 30 clients, you\'re not busy. You\'re inefficient.'],
      ]},
      { n: '22', framework: 'The Number Reveal', fields: [
        ['The pain', 'Every month feels like running to stand still.'],
        ['The number', 'Your churn rate.'],
        ['What it means', 'Two clients in, two clients out. Zero net growth. Every month, less oxygen.'],
        ['The lesson', 'That\'s not a feeling. It\'s a number. Solve it and you stop signing and start choosing.'],
      ]},
      { n: '23', framework: 'The Split Screen', fields: [
        ['Path A', '$120,000. The number I made extra that year. Felt great.'],
        ['Path B', '$600,000. The number available if I\'d solved the right problem first.'],
        ['Numbers under each', 'Same year. Same effort. Different sequence.'],
        ['Verdict', 'Right problem, wrong order = expensive. Right problem, right order = wealth.'],
      ]},
    ],
    hooks: [
      'My client lost $800,000 and never even knew it.',
      'Anything above 3% churn means 60% of your business is gone every year.',
      'Imagine if you never lost a client. Now let me show you how close that actually is.',
      'I made an extra $120,000 that year and thought I\'d won. I\'d actually left $600,000 on the table.',
      'It feels like two steps forward and two steps back every month. That\'s not a feeling, that\'s a number.',
      'Online coaches think they work a lot. Let\'s actually do the math.',
      'You\'re filling a bucket with holes in it and wondering why it never gets full.',
      'I did the math on his business live and he went white in the face.',
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* ignore */ }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[11px] font-medium text-zinc-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function PieceCard({ p }: { p: Piece }) {
  const fullText = p.fields.map(([k, v]) => `${k}: ${v}`).join('\n\n');
  return (
    <div className="glow-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="font-display text-[18px] font-extrabold text-white">{p.n}</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded-full px-2.5 py-0.5">{p.framework}</span>
        </div>
        <CopyButton text={fullText} />
      </div>
      <div className="space-y-3">
        {p.fields.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[1fr] md:grid-cols-[140px_1fr] gap-1 md:gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 pt-1 md:pt-1">{k}</span>
            <span className="text-[14px] leading-relaxed text-zinc-200">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrameworkRow({ f, open, onToggle }: { f: Framework; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-elevated transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-[16px] md:text-[17px] font-extrabold text-white">{f.name}</span>
        <span className={`text-zinc-500 text-[18px] leading-none transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-zinc-800/60">
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest mb-2 mt-4 font-semibold">Template</p>
          <p className="text-zinc-300 text-[14px] leading-relaxed mb-4">{f.template}</p>
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest mb-2 font-semibold">Example</p>
          <p className="text-zinc-200 text-[14px] leading-relaxed italic mb-5">&ldquo;{f.example}&rdquo;</p>
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest mb-2 font-semibold">Formats · you can do it like</p>
          <ul className="space-y-1.5">
            {f.formats.map((fmt) => (
              <li key={fmt} className="flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-zinc-500 mt-2 flex-shrink-0" />
                <span className="text-zinc-300 text-[13px] leading-relaxed">{fmt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HookRow({ hook }: { hook: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(hook);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* ignore */ }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-xl border border-zinc-800 bg-elevated/40 hover:border-zinc-700 hover:bg-elevated transition-colors p-4 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-[14px] leading-relaxed flex-1">&ldquo;{hook}&rdquo;</span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 mt-1">
          {copied ? '✓ Copied' : 'Click'}
        </span>
      </div>
    </button>
  );
}

function BucketPill({ b, active, onClick }: { b: Bucket; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? 'border-blue-500/50 bg-blue-500/10 text-white'
          : 'border-zinc-800 bg-elevated/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
      }`}
    >
      {b.name}
      <span className={`ml-2 text-[11px] font-normal ${active ? 'text-blue-300/80' : 'text-zinc-600'}`}>
        {b.pieces.length}
      </span>
    </button>
  );
}

function BucketContent({ b }: { b: Bucket }) {
  const [openFrameworks, setOpenFrameworks] = useState<Set<string>>(new Set());
  const [showMore, setShowMore] = useState(false);

  const toggle = (name: string) => {
    setOpenFrameworks((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="space-y-12">
      <div>
        <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">{b.env}</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white">{b.name}.</h2>
      </div>

      <div>
        <div className="space-y-3">
          {b.frameworks.map((f) => (
            <FrameworkRow
              key={f.name}
              f={f}
              open={openFrameworks.has(f.name)}
              onToggle={() => toggle(f.name)}
            />
          ))}
          {showMore && b.moreFrameworks?.map((f) => (
            <FrameworkRow
              key={f.name}
              f={f}
              open={openFrameworks.has(f.name)}
              onToggle={() => toggle(f.name)}
            />
          ))}
        </div>
        {b.moreFrameworks && b.moreFrameworks.length > 0 && (
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="mt-4 text-[12px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-blue-400 transition-colors"
          >
            {showMore ? '− Hide extras' : `+ Show ${b.moreFrameworks.length} more`}
          </button>
        )}
      </div>

      <div>
        <H2>Steal a piece.</H2>
        <Note>Pulled from the strongest hooks. Each one structured in its framework. Click Copy.</Note>
        <div className="grid gap-4 mt-8">
          {b.pieces.map((p) => <PieceCard key={p.n} p={p} />)}
        </div>
      </div>

      <div>
        <H2>Pick a hook.</H2>
        <Note>The opening lines most likely to work, in his voice. Click any to copy.</Note>
        <div className="grid gap-3 mt-8">
          {b.hooks.map((h) => <HookRow key={h} hook={h} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────

export default function UndeniableShootCard() {
  const [activeId, setActiveId] = useState<string>(BUCKETS[0].id);
  const active = BUCKETS.find((b) => b.id === activeId) || BUCKETS[0];

  return (
    <Shell title="The Shoot System · Undeniable" description="Four buckets. Pick one. Open a framework. Steal a piece. Pick a hook." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Operational · The system"
        title="The Shoot"
        accent="System."
        blurb="Four buckets. Each mapped to an environment. Pick a bucket, open a framework, steal a piece, grab a hook, shoot it."
      />
      <Divider />

      <Wrap>
        <H2>Kick-off · before you shoot.</H2>
        <Note>Call it out first: is this an education piece or a heart piece? Then run the checklist.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {KICKOFF.map((k) => (
            <div key={k.title} className="glow-card p-6">
              <p className="font-semibold text-[13px] uppercase tracking-widest mb-4 text-zinc-300">{k.title}</p>
              <ul className="space-y-3">
                {k.rows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[14px] leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      <Wrap>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Bucket</span>
          {BUCKETS.map((b) => (
            <BucketPill key={b.id} b={b} active={b.id === activeId} onClick={() => setActiveId(b.id)} />
          ))}
        </div>
        <div className="mt-10" />
        <BucketContent key={active.id} b={active} />
      </Wrap>
    </Shell>
  );
}
