import React, { useState } from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2 } from '../components/undeniable/Bits';

// ─── Kick-off checklist ──────────────────────────────────────────────────

const KICKOFF: Array<{ title: string; rows: string[] }> = [
  { title: 'Education reminders', rows: [
    'Hook = a clear promise',
    'One problem. Not three.',
    'Path / solution including a tool OR a "don\'t do this"',
    'Optional CTA: share / save / comment / follow',
    'Native bridge to an asset at ~1/3, or CTA at the end',
  ]},
  { title: 'Personal reminders', rows: [
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
        template: 'Belief → Why accepted → Why fails → Truth',
        example: 'Another cert won\'t get you clients. Learning feels safe. The market never asks for quals. Booked-solid coaches won on positioning and proof.',
        formats: [
          'Direct to camera, hallway, eye-line tight',
          'Walking confidently, one continuous take',
          'Sitting in the new office, casual',
        ],
      },
      {
        name: 'Reframe',
        template: 'Pain → Blame → Cause → Shift',
        example: 'You\'re not bad at sales. You were taught to compete on cheap and helpful. The real issue is an offer that isn\'t built to be paid for.',
        formats: [
          'Direct to camera, softer tone',
          'Walking, contemplative pace',
          'Casual hallway, leaning on a wall',
        ],
      },
      {
        name: 'Fight Me',
        template: 'Claim → Why → Stake',
        example: '35 clients done brilliantly is more impactful than 350. Income buys impact. You\'re not changing the world coaching 25 people. Fight me.',
        formats: [
          'Direct to camera, locked-in eye line',
          'Walking, confident pace, no smile',
          'Standing in the new office, declarative',
        ],
      },
      {
        name: 'Stop · Just Do',
        template: 'Stop → Why → Just do',
        example: 'Stop learning marketing. Tactic overload is the actual cap. Copy this exact playbook.',
        formats: [
          'Direct to camera, blunt',
          'Walking, declarative',
          'Casual hallway, leaning on a wall',
        ],
      },
    ],
    moreFrameworks: [
      {
        name: 'Imagine · Inverse',
        template: 'What if → Picture → Action',
        example: 'Imagine if you never lost a client. You\'d stop signing and start choosing. Calculate your churn this week.',
        formats: [
          'Direct to camera, slower pace',
          'Walking, reflective',
          'Sitting, eyes on the camera, painted picture',
        ],
      },
      {
        name: 'Side by Side',
        template: 'Their side → My side → Verdict',
        example: 'Their side: chase viral. My side: $5M without ever going viral. Verdict: manual effort will reign supreme.',
        formats: [
          'Direct to camera, gesturing each side',
          'Walking between two spots, naming each side',
          'Two hands held up, one for each side',
        ],
      },
      {
        name: 'Contrarian with Data',
        template: 'Claim → The number that proves it → The reframe',
        example: 'Everyone says post more. I built $5M posting less. My best months came from one video, not thirty. Volume was never the lever.',
        formats: [
          'Direct to camera, then the number on screen',
          'Whiteboard the number mid take',
          'Walking, state the claim, then show the proof',
        ],
      },
      {
        name: 'The Costly Myth',
        template: 'The belief → What it quietly costs → The math → The fix',
        example: 'You think churn is just part of it. It quietly costs you 60% of your business a year. Do the math, then plug the leak before you chase one more lead.',
        formats: [
          'Phone in hand, run the number live',
          'Whiteboard the leaky bucket',
          'Direct to camera, then the math on screen',
        ],
      },
      {
        name: 'Name the Enemy',
        template: 'Name the enemy → What they do → Why it burns people → What we do',
        example: 'Pay in full gurus optimise for the screenshot. It burns the client who can\'t afford it. We build offers people can actually pay for.',
        formats: [
          'Direct to camera, controlled, not ranting',
          'Walking, calm conviction',
          'Sitting in the office, declarative',
        ],
      },
    ],
    pieces: [
      { n: '07', framework: 'Fight Me', fields: [
        ['Claim', '35 clients done brilliantly is more impactful than 350 who lose 10 kilos and move on.'],
        ['Why', 'Income buys impact. You\'re not changing the world coaching 25 people. If you\'re impact-driven, you have a duty to build something big.'],
        ['Stake', 'Fight me.'],
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
        name: 'Steps',
        template: 'Hook → Problem → Steps → Reward',
        example: '3 numbers you\'ve never measured. Each costing you six figures. Churn, lifetime, time on task. Calculate them this week.',
        formats: [
          'Count on fingers, direct to camera',
          'Walking, listing each step out loud',
          'Sitting on a bench, casual head-on',
        ],
      },
      {
        name: 'Unlock',
        template: 'Goal → Effort → Bottleneck → Unlock → Shift',
        example: 'Double your revenue. Stop chasing leads. The cap is 16-week contracts. Lock 32-week retention. Stop signing, start choosing.',
        formats: [
          'Direct to camera, name each stage',
          'Walking, paced delivery',
          'In the gym, gesturing each stage',
        ],
      },
      {
        name: 'Path',
        template: 'Hook → Problem → Path → Solution → CTA',
        example: 'Two ways to get leads. Most coaches do both badly. Door-knock or post 5x a day. Pick one for 90 days. Comment which one.',
        formats: [
          'Direct to camera, "this or this"',
          'Walking, gesture between two options',
          'Standing between two parts of the gym, pointing each way',
        ],
      },
      {
        name: 'Belief Shift',
        template: 'Belief → Cost → Truth → Application',
        example: 'More content equals more clients. You\'re attracting waiters who never buy. Doers and waiters self-select on tone. Frame for doers.',
        formats: [
          'Direct to camera, declarative',
          'Walking, calm conviction',
          'Casual gym setting, head-on',
        ],
      },
    ],
    pieces: [
      { n: '13', framework: 'Path', fields: [
        ['Hook', 'Two ways to get leads. One scales, one doesn\'t.'],
        ['Problem', 'Most coaches do both badly. Half-effort on each.'],
        ['Path', 'Door-knock: 50 hours, low scale. Posting: 5 hours, infinite scale once it works.'],
        ['Solution', 'Pick one and commit for 90 days. Don\'t switch.'],
        ['CTA', 'Comment which one you\'re picking.'],
      ]},
      { n: '14', framework: 'Belief Shift', fields: [
        ['Belief', 'More content equals more clients.'],
        ['Cost', 'You\'re attracting waiters who consume and never buy.'],
        ['Truth', 'Doers and waiters self-select on tone, not volume.'],
        ['Application', 'Frame for doers. The right people will show up.'],
      ]},
      { n: '15', framework: 'Unlock', fields: [
        ['Goal', 'Make $1M as a fitness coach again.'],
        ['Effort', 'Coaches grind on more leads, more offers, more platforms.'],
        ['Bottleneck', 'Tactic overload is the actual cap. The grind keeps you broke.'],
        ['Unlock', 'Cap retention at 32 weeks. Build one offer. Post the same thing 5x a day.'],
        ['Shift', 'Run a system you already know works instead of learning forever.'],
      ]},
      { n: '16', framework: 'Steps', fields: [
        ['Hook', '3 numbers in your business you\'ve never measured.'],
        ['Problem', 'Each one is costing you six figures.'],
        ['Steps', '1: Churn rate. 2: Average client lifetime. 3: True time on task.'],
        ['Reward', 'Calculate them this week. Find the leak before you chase a single lead.'],
      ]},
      { n: '17', framework: 'Unlock', fields: [
        ['Goal', 'Double revenue without doubling leads.'],
        ['Effort', 'Most coaches keep signing 12-16 week clients.'],
        ['Bottleneck', 'Two clients in, two out. Running to stand still.'],
        ['Unlock', 'Extend retention to 32 weeks. Lock the back end first.'],
        ['Shift', 'Stop signing and start choosing. The label "just a PT" disappears with it.'],
      ]},
      { n: '18', framework: 'Steps', fields: [
        ['Hook', '6 things to lock in before you raise your rates.'],
        ['Problem', 'Raise too early and you accelerate the leak.'],
        ['Steps', '1: Audit churn. 2: Lock 32-week retention. 3: Document outcomes. 4: Grandfather existing clients. 5: Update sales assets. 6: Hold the line on the first 3 calls.'],
        ['Reward', 'Raise rates without losing clients. Order matters.'],
      ]},
    ],
    hooks: [
      'There are two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.',
      'Doers and waiters. Your content is training one of them to come to you.',
      'Stop learning marketing and just copy this.',
      'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'How to Add $10,000/Month as an Experienced PT.',
      'The 6 things to lock in before you raise your rates.',
    ],
  },

  // ═══ SHOW ══════════════════════════════════════════════════════════════
  {
    id: 'show',
    name: 'Show',
    env: 'Whiteboard · desk · shown',
    frameworks: [
      {
        name: 'Math Live',
        template: 'Show problem → Share solution → Takeaway',
        example: 'Coaches think 3% churn is fine. Run the math: 100 clients, lose 3 a month, 36 gone in a year. Above 3% means 60% of the business gone every year.',
        formats: [
          'Phone in hand, live calculator',
          'iPad with numbers typed in',
          'Whiteboard math written out',
        ],
      },
      {
        name: 'The Bucket',
        template: 'Name → Draw → Lesson',
        example: 'The leaky bucket. Top fills with new clients. Sides leak with churn. Above 3% holes and you lose 60% of the bucket every year.',
        formats: [
          'Whiteboard drawn from scratch',
          'Top-down camera on paper',
          'iPad illustration',
        ],
      },
      {
        name: 'Number Reveal',
        template: 'Pain → Number → Lesson',
        example: '$800,000. That\'s what one client lost in a year without ever knowing.',
        formats: [
          'Single number filling the screen',
          'Big text on iPad',
          'Whiteboard with one number circled',
        ],
      },
      {
        name: 'Split Screen',
        template: 'Left → Right → Pick',
        example: '$120,000 left. $600,000 right. Same year, same effort, different sequence. Pick the bigger one.',
        formats: [
          'Whiteboard split LEFT | RIGHT',
          'Two pieces of paper top-down',
          'iPad split view',
        ],
      },
    ],
    pieces: [
      { n: '19', framework: 'Number Reveal', fields: [
        ['Pain', 'He thought he was killing it. Top-line growing every month.'],
        ['Number', '$800,000.'],
        ['Lesson', 'That\'s what hidden churn ate. Wasn\'t on any dashboard. If you\'re not measuring it, you\'re losing it.'],
      ]},
      { n: '20', framework: 'Math Live', fields: [
        ['Show problem', 'Coaches think 3% churn is fine. Let\'s actually do the math.'],
        ['Share solution', '100 clients. Lose 3 a month. After 12 months, 36 gone. You\'ve replaced 36 just to stand still.'],
        ['Takeaway', 'Anything above 3% churn means 60% of the business is gone every year.'],
      ]},
      { n: '21', framework: 'The Bucket', fields: [
        ['Name', 'The leaky bucket.'],
        ['Draw', 'New clients pour in the top. Existing clients leak out the sides. Holes bigger than inflow = shrinking.'],
        ['Lesson', 'Plug the holes first. Then fill faster. Imagine if you never lost a client.'],
      ]},
      { n: '22', framework: 'Math Live', fields: [
        ['Show problem', 'Online coaches think they work a lot. Let\'s do the math on 100 clients.'],
        ['Share solution', '100 × 15-min check-ins = 25 hours. +5 comms +5 content +5 programs = 40-hour week.'],
        ['Takeaway', 'If you\'re flat out at 30 clients, you\'re not busy. You\'re inefficient.'],
      ]},
      { n: '23', framework: 'Number Reveal', fields: [
        ['Pain', 'Every month feels like running to stand still.'],
        ['Number', 'Your churn rate.'],
        ['Lesson', 'Two clients in, two out. Zero net growth. That\'s not a feeling. It\'s a number. Solve it and you stop signing, start choosing.'],
      ]},
      { n: '24', framework: 'Split Screen', fields: [
        ['Left', '$120,000. The number I made extra that year. Felt great.'],
        ['Right', '$600,000. The number available if I\'d solved the right problem first.'],
        ['Pick', 'Same year. Same effort. Different sequence. Right problem, right order = wealth.'],
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

function FrameworkRow({ f, tag, open, onToggle }: { f: Framework; tag: string; open: boolean; onToggle: () => void }) {
  const steps = f.template.split('→').length;
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 py-4 hover:bg-elevated transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">{tag}</p>
            <p className="font-display text-[15px] md:text-[16px] font-extrabold text-white leading-snug mb-1.5">{f.template}</p>
            <p className="text-zinc-500 text-[12px]">{steps} steps</p>
          </div>
          <span className={`text-zinc-500 text-[18px] leading-none transition-transform flex-shrink-0 mt-1 ${open ? 'rotate-45' : ''}`}>+</span>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-zinc-800/60">
          <p className="text-zinc-500 text-[11px] uppercase tracking-widest mb-2 mt-4 font-semibold">Example</p>
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
              tag={b.name.toUpperCase()}
              open={openFrameworks.has(f.name)}
              onToggle={() => toggle(f.name)}
            />
          ))}
          {showMore && b.moreFrameworks?.map((f) => (
            <FrameworkRow
              key={f.name}
              f={f}
              tag={b.name.toUpperCase()}
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const jumpToBucket = (id: string) => {
    setActiveId(id);
    setTimeout(() => scrollTo('buckets'), 50);
  };

  return (
    <Shell title="Next Shoot · Undeniable" description="Four buckets. Pick one. Open a framework. Steal a piece. Pick a hook." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Operational · The system"
        title="Next"
        accent="Shoot."
        blurb="Four buckets. Each mapped to an environment. Pick a bucket, open a framework, steal a piece, grab a hook, shoot it."
      />
      <Divider />

      {/* TOC strip */}
      <Wrap>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mr-1">Jump to</span>
          <button
            type="button"
            onClick={() => scrollTo('kickoff')}
            className="rounded-full border border-zinc-800 bg-elevated/40 hover:border-zinc-700 hover:text-zinc-200 text-zinc-400 transition-colors px-3 py-1.5 text-[12px] font-semibold"
          >
            Before you shoot
          </button>
          {BUCKETS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => jumpToBucket(b.id)}
              className="rounded-full border border-zinc-800 bg-elevated/40 hover:border-zinc-700 hover:text-zinc-200 text-zinc-400 transition-colors px-3 py-1.5 text-[12px] font-semibold"
            >
              {b.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo('ad-gold')}
            className="rounded-full border border-zinc-800 bg-elevated/40 hover:border-zinc-700 hover:text-zinc-200 text-zinc-400 transition-colors px-3 py-1.5 text-[12px] font-semibold"
          >
            Ad Gold
          </button>
        </div>
      </Wrap>
      <Divider />

      <Wrap id="kickoff">
        <H2>Before you shoot.</H2>
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

      <Wrap id="buckets">
        <div className="sticky top-4 z-30 -mx-3 px-3 py-3 mb-6 rounded-2xl bg-base/85 backdrop-blur border border-zinc-900">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Bucket</span>
            {BUCKETS.map((b) => (
              <BucketPill key={b.id} b={b} active={b.id === activeId} onClick={() => setActiveId(b.id)} />
            ))}
          </div>
        </div>
        <BucketContent key={active.id} b={active} />
      </Wrap>
      <Divider />

      <Wrap id="ad-gold">
        <a
          href="/undeniablenextsteps/ad-gold"
          className="block group rounded-2xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors p-6 md:p-8"
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">Reference · Come back to it later</p>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3">Ad Gold <span className="text-blue-400 group-hover:translate-x-1 inline-block transition-transform">&rarr;</span></h3>
          <p className="text-zinc-400 text-[14px] leading-relaxed max-w-2xl">Verbatim money lines, stories, frames, recognition quotes, avatar voice. Different shape to the hooks above. Use for ads, written creative, sales assets.</p>
        </a>
      </Wrap>
    </Shell>
  );
}
