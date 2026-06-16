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
        example: 'Fully booked and broke at 60 sessions a week. The week I capped my 1-on-1s and built one online offer, it flipped. Now I coach 40 people in the hours I used to coach 8. If your calendar owns you, start by capping it.',
        formats: [
          'Walking outside, narrating the arc',
          'Sitting on a bench or in the car, recounting it casually',
          'Voice-over with B-roll of the old life vs the new',
        ],
      },
      {
        name: 'Specific Moment',
        template: 'The moment → What it cost → The realisation → The takeaway',
        example: 'A client asked to drop to fortnightly because money was tight. I said yes and drove home gutted. That night I saw I\'d built a business that broke the second one person flinched. Your whole income can\'t ride on one client.',
        formats: [
          'Direct to camera in a quiet outdoor spot, intimate',
          'Walking, recreating the scene',
          'Sitting in the place it happened (gym floor, car, kitchen)',
        ],
      },
    ],
    pieces: [
      { n: '04', framework: 'Transformation', fields: [
        ['Old situation', 'Trading time on the gym floor. Couldn\'t scale because I was the product.'],
        ['Friction', 'Every viral chase failed. The grind was breaking me.'],
        ['Turning point', 'Stopped trying to reach more people. Focused on the ones already there.'],
        ['New reality', 'A $5M business. Built without one viral moment.'],
        ['Invitation', 'Watch Rome for the full breakdown.'],
      ]},
      { n: '06', framework: 'Specific Moment', fields: [
        ['The moment', 'Someone asked me how the gym I work at works, no one can train there.'],
        ['What it cost', 'I just said: that\'s the whole point.'],
        ['The realisation', 'I\'d signalled status by what I refuse to do, not by what I sell.'],
        ['The takeaway', 'A 750K gym no one can use says more than any testimonial.'],
      ]},
      { n: '11', framework: 'Specific Moment', fields: [
        ['The moment', 'A client texted me "sorry to be annoying" and I knew what was coming.'],
        ['What it cost', 'Two steps forward, two steps back. Less oxygen than the month before.'],
        ['The realisation', 'It\'s not a feeling. It\'s a number. It\'s churn.'],
        ['The takeaway', 'If you feel this and can\'t name it, the math will name it for you.'],
      ]},
      { n: '13', framework: 'Transformation', fields: [
        ['Old situation', 'Five of my 13 years I did this the wrong way. Hating my life.'],
        ['Friction', 'Almost lost the business. The mental cost was the worst part.'],
        ['Turning point', 'I started teaching what nearly killed me. So you don\'t have to learn it the hard way.'],
        ['New reality', 'Now I leapfrog people over my battle scars.'],
        ['Invitation', 'The whole arc lives in the character video.'],
      ]},
      { n: '14', framework: 'Specific Moment', fields: [
        ['The moment', 'I built a client a program designed to make her quit.'],
        ['What it cost', 'I was ready to lose her. I was tired of trying.'],
        ['The realisation', 'She didn\'t quit. She did the work. Dropped 40 kilos. Got on stage.'],
        ['The takeaway', 'You don\'t find the best client. You build them.'],
      ]},
      { n: '15', framework: 'Transformation', fields: [
        ['Old situation', 'First seminar, 16 people. Only 2 paid. Made $175.'],
        ['Friction', 'Same content I now charge 22 grand for. Spent 80 hours preparing it.'],
        ['Turning point', 'I didn\'t change the content. I changed what I\'d done by then.'],
        ['New reality', 'Same lesson. Now it lands.'],
        ['Invitation', 'This is the why-now.'],
      ]},
    ],
    hooks: [
      'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
      'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away.',
      'I spent 750 grand on a gym no one is allowed to train at.',
      'On the sales call I asked her what she wanted. She said, McLaren money.',
      'A coach told me he loved coaching. His mate said, I just like making money.',
      'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it for you.',
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
        example: 'You\'re not bad at sales. Most coaches freeze on price because they were taught to compete on cheap and helpful. The real issue is an offer that isn\'t built to be paid for. Fix the offer.',
        formats: [
          'Direct to camera, softer tone',
          'Walking, contemplative pace',
          'Casual hallway, leaning on a wall',
        ],
      },
    ],
    pieces: [
      { n: '03', framework: 'Reframe', fields: [
        ['The pain', 'You\'re over 10K a month and still get called "just a PT".'],
        ['Remove the blame', 'You\'re not less than. The label isn\'t your fault.'],
        ['The real cause', 'Your business is built like a PT\'s. 12-16 week clients. Churn ignored.'],
        ['The shift', 'Extend retention to 32 weeks. Instant double on the back end.'],
      ]},
      { n: '05', framework: 'Belief Flip', fields: [
        ['Common belief', 'Bigger businesses are less ethical. 35 clients done brilliantly is more honest than 350.'],
        ['Why accepted', 'It feels noble. It hides the income ceiling.'],
        ['Why it fails', 'Income buys impact. You\'re not changing the world coaching 25 people.'],
        ['What\'s true', 'If you\'re impact-driven, you have a duty to build something big. Fight me.'],
      ]},
      { n: '08', framework: 'Belief Flip', fields: [
        ['Common belief', 'More learning equals more results. More tactics equals more clients.'],
        ['Why accepted', 'Learning feels productive. Buying courses feels like action.'],
        ['Why it fails', 'Coaches drown in tactics and AI and still don\'t grow.'],
        ['What\'s true', 'Copy what works. Stop learning marketing. The complete plan is on the channel.'],
      ]},
      { n: '09', framework: 'Reframe', fields: [
        ['The pain', '80K months. Then the first of the month hits and you\'re panicking again.'],
        ['Remove the blame', 'You\'re not bad with money. The math just doesn\'t fit your business.'],
        ['The real cause', 'Revenue resets to zero. Tax + GST + lifestyle creep eat the rest.'],
        ['The shift', 'Fix profit, not revenue. The 40K month coach often keeps more than the 80K one.'],
      ]},
      { n: '10', framework: 'Belief Flip', fields: [
        ['Common belief', 'Churn is the cost of doing business. Just sign more.'],
        ['Why accepted', 'Acquisition feels productive. Replacing leaks feels invisible.'],
        ['Why it fails', 'You\'re signing two and losing two. Running to stand still.'],
        ['What\'s true', 'Net-zero churn means you only ever add. At some point you stop signing and start choosing.'],
      ]},
      { n: '12', framework: 'Reframe', fields: [
        ['The pain', 'You paid a mentor who\'d never done it. Now you\'re scared to invest again.'],
        ['Remove the blame', 'You\'re not stupid. You trusted credentials.'],
        ['The real cause', 'The industry doesn\'t filter for done-it. The receipts are buried under sales pages.'],
        ['The shift', 'Check the receipts. Worst case you stay the same. Best case you get wealthier.'],
      ]},
    ],
    hooks: [
      'Most coaches think they have to compromise who they are to build something big. They\'re wrong.',
      'Income buys you impact. You\'re not changing the world coaching 25 people.',
      'You\'re not lazy and you\'re not stupid. You\'re stuck in the part of the business no one warned you about.',
      'If it triggers you, it\'s probably true.',
      'Your competitors are setting your prices, not your clients. That\'s why you\'re underpaid.',
      'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
    ],
  },

  // ═══ TEACH ═════════════════════════════════════════════════════════════
  {
    id: 'teach',
    name: 'Teach',
    env: 'Gym · straight to camera',
    frameworks: [
      {
        name: 'The List',
        template: 'Number → Specific list → Reward',
        example: '3 ways to fill your coaching roster without spending a dollar on ads.',
        formats: [
          'Talking head, count on fingers',
          'Walking through the gym, listing aloud',
          'Sitting on a bench, casual',
        ],
      },
      {
        name: 'The Compare',
        template: 'Two paths → What each costs → Which when',
        example: 'In-person vs online coaching. What most coaches don\'t see is which one scales when you hit 80 clients.',
        formats: [
          'Direct to camera, "this or this"',
          'Walking, gesture one path then the other',
          'Standing between two parts of the gym, pointing',
        ],
      },
      {
        name: 'The How-To',
        template: 'Outcome → Step 1 → Step 2 → Step 3 → Next',
        example: 'How to build your first online offer this weekend, start to finish.',
        formats: [
          'Direct to camera, numbered steps',
          'Walking through the steps verbally',
          'Casual gym setting, talking it through',
        ],
      },
    ],
    pieces: [
      { n: '07', framework: 'The Compare', fields: [
        ['Two paths', 'Knock on doors every day. Or post this specific thing five times a day.'],
        ['What each costs', 'Door-knocking: 50 hours a week, low scale. Posting: 5 hours, infinite scale once it works.'],
        ['Which when', 'Door-knocking trains you in sales. Posting trains the algorithm.'],
        ['Verdict', 'Pick one and commit for 90 days. Doing both at half-effort is the worst path.'],
      ]},
    ],
    hooks: [
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'Doers and waiters. Your content is training one of them to come to you.',
      'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
      'How to Add $10,000/Month as an Experienced PT.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This.',
    ],
  },

  // ═══ SHOW ══════════════════════════════════════════════════════════════
  {
    id: 'show',
    name: 'Show',
    env: 'Whiteboard · desk · shown',
    frameworks: [
      {
        name: 'The List',
        template: 'Number → List drawn or shown live → Reward',
        example: '3 numbers that matter more than revenue. Drawn live with circles around each.',
        formats: [
          'Numbered on the whiteboard',
          'Top-down camera on paper, ticking off',
          'iPad screen-share, drawn live',
        ],
      },
      {
        name: 'The Compare',
        template: 'Whiteboard split → Path A on left, Path B on right → Verdict',
        example: 'In-person vs online coaching. Two columns drawn with cost, time, ceiling under each.',
        formats: [
          'Whiteboard split-screen (LEFT | RIGHT)',
          'Top-down with two pieces of paper side by side',
          'iPad split with two columns',
        ],
      },
      {
        name: 'The How-To',
        template: 'Outcome → Steps shown live → Result',
        example: 'How to do the math on your churn. Pull out the phone, calculate it, show the verdict.',
        formats: [
          'Whiteboard step-by-step',
          'Screen-recording with clicks',
          'Phone in hand, live math on the calculator',
        ],
      },
    ],
    pieces: [
      { n: '01', framework: 'The How-To', fields: [
        ['Outcome', 'Find out what your churn is actually costing you.'],
        ['Setup', 'Draw the bucket. New clients pour in the top. Existing clients leak out the sides.'],
        ['Step 1', 'Count clients in over 12 months.'],
        ['Step 2', 'Count clients out.'],
        ['Step 3', 'Multiply the lost ones by their LTV. Above 3% churn? You\'re losing 60% of your business a year.'],
        ['Next', 'Comment "CHURN" for the calculator.'],
      ]},
      { n: '02', framework: 'The How-To', fields: [
        ['Outcome', 'Discover whether you\'re actually busy or just inefficient.'],
        ['Pull out the phone', '100 clients × 15-minute check-ins = 25 hours per week.'],
        ['Add the rest', 'Comms 5 hours. Content 5 hours. Program updates 5 hours.'],
        ['Verdict', 'A 40-hour week with 100 clients. If you\'re flat out at 30, you\'re inefficient.'],
        ['Next', 'Save this. Run your own numbers.'],
      ]},
    ],
    hooks: [
      'I did the math on his business live and he went white in the face.',
      'You\'re filling a bucket with holes in it and wondering why it never gets full.',
      'Anything above 3% churn means 60% of your business is gone every year.',
      'I\'m going to do the math on your business and you\'re not going to like it.',
      'There\'s a number in your business you\'ve never calculated, and it\'s costing you six figures.',
      'Give me five minutes and I\'ll find the one number that\'s capping your business.',
    ],
  },
];

// ─── Sub-components (all neutral, no bucket-specific colours) ────────────

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

function FrameworkCard({ f }: { f: Framework }) {
  return (
    <div className="glow-card p-6">
      <h3 className="font-display text-[18px] font-extrabold text-white mb-3">{f.name}</h3>
      <p className="text-zinc-500 text-[11px] uppercase tracking-widest mb-2 font-semibold">Template</p>
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
  return (
    <div className="space-y-12">
      <div>
        <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">{b.env}</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-2">{b.name}.</h2>
      </div>

      <div>
        <H2>Pick a framework.</H2>
        <Note>Simple shapes. Pick one. The formats below each show ways you can film it.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {b.frameworks.map((f) => (
            <FrameworkCard key={f.name} f={f} />
          ))}
        </div>
      </div>

      <div>
        <H2>Steal a piece.</H2>
        <Note>Shoot-ready. Each one structured in its framework. Click Copy.</Note>
        <div className="grid gap-4 mt-8">
          {b.pieces.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
              <p className="text-zinc-500 text-[14px]">No pieces in this bucket yet. Use the frameworks above and the hooks below to write one.</p>
            </div>
          ) : (
            b.pieces.map((p) => <PieceCard key={p.n} p={p} />)
          )}
        </div>
      </div>

      <div>
        <H2>Pick a hook.</H2>
        <Note>Opening lines in his voice. Click any to copy.</Note>
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
    <Shell title="The Shoot System · Undeniable" description="Four buckets. Pick one. See the framework. Steal a piece. Pick a hook." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Operational · The system"
        title="The Shoot"
        accent="System."
        blurb="Four buckets. Each mapped to an environment. Pick a bucket, pick a framework, pick a format, steal a piece, grab a hook, shoot it."
      />
      <Divider />

      {/* Kick-off · keep at top */}
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

      {/* Compact bucket switcher · sticky-ish at top of content */}
      <Wrap>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Bucket</span>
          {BUCKETS.map((b) => (
            <BucketPill key={b.id} b={b} active={b.id === activeId} onClick={() => setActiveId(b.id)} />
          ))}
        </div>
        <div className="mt-10" />
        <BucketContent b={active} />
      </Wrap>
    </Shell>
  );
}
