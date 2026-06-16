import React, { useState } from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2 } from '../components/undeniable/Bits';

// ─── Kick-off checklist (kept) ───────────────────────────────────────────

const KICKOFF: Array<{ title: string; tone: string; rows: string[] }> = [
  { title: 'Education kick-off', tone: 'blue', rows: [
    'Hook = clear promise + length ("In 60 seconds...")',
    'One problem. Not three.',
    'Path / solution including a tool OR a "don\'t do this"',
    'Optional CTA: share / save / comment / follow',
    'Native bridge to an asset at ~1/3, or CTA at the end',
  ]},
  { title: 'Heart kick-off', tone: 'zinc', rows: [
    'Relatable experience (the scar: pain, money)',
    'The damaging admission / vulnerability',
    'The lesson',
    'Empathy with where they are (not putting himself down)',
    'Lo-fi, chill. Not polished, not salesy',
  ]},
];

// ─── Data ────────────────────────────────────────────────────────────────

type Framework = { name: string; template: string; example: string };
type Piece = { n: string; framework: string; fields: Array<[string, string]> };
type Bucket = {
  id: string;
  name: string;
  env: string;
  tone: string;
  description: string;
  toneClass: string;
  hexBg: string;
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
    tone: 'Built on an event. Story carries the lesson.',
    description: 'Outside. Walking. On the road. Casual environments. The viewer leans in because the moment is real.',
    toneClass: 'text-amber-400',
    hexBg: '#f59e0b',
    frameworks: [
      {
        name: 'Transformation',
        template: 'Old situation → Friction / cost → Turning point → New reality → Invitation',
        example: 'Fully booked and broke at 60 sessions a week, resenting clients I used to love. The week I capped my 1-on-1s and built one online offer, it flipped. Now I coach 40 people in the hours I used to coach 8. If your calendar owns you, start by capping it.',
      },
      {
        name: 'Specific Moment',
        template: 'The moment → What it cost / felt → The realisation → The takeaway',
        example: 'A client asked to drop to fortnightly because money was tight. I said yes and drove home gutted. That night I saw I\'d built a business that broke the second one person flinched. Your whole income can\'t ride on one client.',
      },
    ],
    pieces: [
      { n: '01', framework: 'Transformation', fields: [
        ['Old situation', 'Ten years on the gym floor trading time for money. Couldn\'t scale because I was the product.'],
        ['Friction / cost', 'Every viral chase failed and felt fake. The grind was breaking me down.'],
        ['Turning point', 'I stopped trying to reach more people. I started focusing on the ones I already had.'],
        ['New reality', 'A $5M business. Built without one viral moment. Without selling my soul to the algorithm.'],
        ['Invitation', 'Watch Rome for the full breakdown.'],
      ]},
      { n: '02', framework: 'Specific Moment', fields: [
        ['The moment', 'Someone asked me how the gym I work at works, no one can train there.'],
        ['What it cost', 'Most people would have explained, defended, or sold. I just said: that\'s the whole point.'],
        ['The realisation', 'I\'d signalled status by what I refuse to do, not by what I sell.'],
        ['The takeaway', 'A 750K gym no one can use says more than any testimonial. Proof you can\'t fake or lease.'],
      ]},
      { n: '03', framework: 'Specific Moment', fields: [
        ['The moment', 'A client texted me "sorry to be annoying" and I knew what was coming. They were leaving.'],
        ['What it cost', 'Two steps forward, two steps back. Less oxygen than the month before.'],
        ['The realisation', 'It\'s not a feeling. It\'s a number. It\'s churn.'],
        ['The takeaway', 'If you feel this and can\'t name it, the math will name it for you.'],
      ]},
      { n: '04', framework: 'Transformation', fields: [
        ['Old situation', 'Five of my 13 years I did this the wrong way. Hating my life. Working 80-hour weeks.'],
        ['Friction / cost', 'Almost lost the business. Almost lost myself. The mental cost was the worst part.'],
        ['Turning point', 'I started teaching what nearly killed me. So you don\'t have to learn it the hard way.'],
        ['New reality', 'Now I leapfrog people over my battle scars. Faster, cleaner, saner.'],
        ['Invitation', 'The whole arc lives in the character video on the channel.'],
      ]},
      { n: '05', framework: 'Specific Moment', fields: [
        ['The moment', 'She was lazy, complained constantly, treated coaching like a hobby. I built her a program designed to make her quit.'],
        ['What it cost', 'I was ready to lose her. I was tired of trying.'],
        ['The realisation', 'She didn\'t quit. She did the work. Dropped 40 kilos. Got on stage.'],
        ['The takeaway', 'You don\'t find the best client. You build them. Sometimes by raising the bar so high they prove themselves.'],
      ]},
      { n: '06', framework: 'Transformation', fields: [
        ['Old situation', 'First seminar. 16 people in the room. Only 2 paid for tickets. The other 14 came for free.'],
        ['Friction / cost', 'Made $175. Spent 80 hours preparing. The same content I now charge 22 grand for.'],
        ['Turning point', 'I didn\'t change the content. I changed who was watching, and what I\'d already done by then.'],
        ['New reality', 'Same lesson. Now it lands. Now it sells.'],
        ['Invitation', 'This is the why-now. The full walk-through is on the channel.'],
      ]},
    ],
    hooks: [
      'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
      'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away from all of it.',
      'I spent 750 grand on a gym no one is allowed to train at. Here\'s why that\'s the smartest thing I\'ve done.',
      'On the sales call I asked her what she wanted. She said, McLaren money.',
      'A coach told me he loved coaching. His mate said, I just like making money. One of them is bigger.',
      'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it for you.',
    ],
  },

  // ═══ HOT TAKES ════════════════════════════════════════════════════════
  {
    id: 'hot-takes',
    name: 'Hot Takes',
    env: 'Hallway · new office · direct',
    tone: 'Built on a claim. Belief in, belief out.',
    description: 'Direct to camera, hallway or new office. Eye-line tight. One claim, defended cleanly. No setup.',
    toneClass: 'text-red-400',
    hexBg: '#ef4444',
    frameworks: [
      {
        name: 'Belief Flip',
        template: 'Common belief → Why it\'s accepted → Why it fails → What\'s true instead',
        example: 'Another certification won\'t get you clients. It feels productive because learning is safe. But your market never asks for your quals, they ask who gets results. The coaches booked solid won on positioning and proof, and that\'s a skill you can build this week.',
      },
      {
        name: 'Reframe',
        template: 'The pain → Remove the blame → The real cause → The shift',
        example: 'You\'re not bad at sales. Most coaches freeze on price because they were taught to compete on cheap and helpful. The real issue is an offer that isn\'t built to be paid for. Fix the offer and the price stops being a fight.',
      },
    ],
    pieces: [
      { n: '07', framework: 'Reframe', fields: [
        ['The pain', 'You\'re over 10K a month and still get called "just a PT". It\'s eating you.'],
        ['Remove the blame', 'You\'re not less than. The label isn\'t your fault.'],
        ['The real cause', 'Your business is built like a PT\'s. 12-16 week clients. Churn ignored. Pricing based on hours.'],
        ['The shift', 'Extend retention to 32 weeks. That\'s an instant double on the back end. The label stops mattering.'],
      ]},
      { n: '08', framework: 'Belief Flip', fields: [
        ['Common belief', 'Bigger businesses are less ethical. 35 clients done brilliantly is more honest than 350.'],
        ['Why accepted', 'It feels noble. It signals craft. It hides the income ceiling.'],
        ['Why it fails', 'Income buys impact. You\'re not changing the world coaching 25 people.'],
        ['What\'s true', 'If you\'re impact-driven, you have a duty to build something big. Bigger reach equals bigger impact. Fight me.'],
      ]},
      { n: '09', framework: 'Belief Flip', fields: [
        ['Common belief', 'More learning equals more results. More tactics equals more clients.'],
        ['Why accepted', 'Learning feels productive. Buying courses feels like action.'],
        ['Why it fails', 'Coaches drown in tactics, tools and AI and still don\'t grow. The bottleneck isn\'t knowledge.'],
        ['What\'s true', 'Copy what works. Stop learning marketing. The complete plan is on the channel.'],
      ]},
      { n: '10', framework: 'Reframe', fields: [
        ['The pain', '80K months. Then the first of the month hits and you\'re panicking again.'],
        ['Remove the blame', 'You\'re not bad with money. The math just doesn\'t fit your business.'],
        ['The real cause', 'Revenue resets to zero. Tax + GST + lifestyle creep eat the rest. The wins don\'t compound.'],
        ['The shift', 'Fix profit, not revenue. The 40K month coach often keeps more than the 80K one. Here\'s how.'],
      ]},
      { n: '11', framework: 'Belief Flip', fields: [
        ['Common belief', 'Churn is the cost of doing business. Just sign more.'],
        ['Why accepted', 'Acquisition feels productive. Replacing leaks feels invisible.'],
        ['Why it fails', 'You\'re signing two and losing two. Running to stand still. The business stays stuck.'],
        ['What\'s true', 'Net-zero churn means you only ever add. At some point you stop signing and start choosing.'],
      ]},
      { n: '12', framework: 'Reframe', fields: [
        ['The pain', 'You paid a mentor who\'d never done it. Got nothing. Now you\'re scared to invest again.'],
        ['Remove the blame', 'You\'re not stupid. You did what most people do. You trusted credentials.'],
        ['The real cause', 'The industry doesn\'t filter for done-it. The receipts are buried under sales pages.'],
        ['The shift', 'Check the receipts. Stay sceptical. Worst case you stay the same. Best case you\'re wrong and you get wealthier.'],
      ]},
    ],
    hooks: [
      'Most coaches think they have to compromise who they are to build something big. They\'re wrong.',
      'Income buys you impact. You\'re not changing the world coaching 25 people.',
      'You\'re not lazy and you\'re not stupid. You\'re stuck in the part of the business no one warned you about.',
      'If it triggers you, it\'s probably true.',
      'Your competitors are setting your prices, not your clients. That\'s why you\'re underpaid.',
      'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
      'Manual effort will reign supreme. You can\'t cheat it, and that\'s good news for you.',
    ],
  },

  // ═══ TEACHING ═════════════════════════════════════════════════════════
  {
    id: 'teaching',
    name: 'Teaching',
    env: 'Gym · straight to camera',
    tone: 'Built on a method. You explain it. No visuals.',
    description: 'Shot in the gym. Talking head, direct to camera, walking through the method out loud. Same 7 formats as Demonstration, but TOLD not SHOWN.',
    toneClass: 'text-blue-400',
    hexBg: '#3b82f6',
    frameworks: [
      { name: 'Numbered Breakdown / Mistakes', template: 'Number → Specific list of steps, ways, or errors → Reward', example: '3 ways to fill your coaching roster without spending a dollar on ads. Skip these and you\'ll grind for years.' },
      { name: 'Framework Explainer', template: 'Name your system → Walk the steps → Show what it produces', example: 'The one offer that took me from $3k to $15k months. I call it the Single Promise Stack. Here\'s how it works.' },
      { name: 'The Comparison', template: 'Two paths laid side by side → What each costs → Which to pick when', example: 'In-person vs online coaching. What most coaches don\'t see is which one actually scales when you hit 80 clients.' },
      { name: 'The Tutorial / Walkthrough', template: 'Outcome → Step 1 → Step 2 → Step 3 → What to do next', example: 'How to build your first online offer this weekend, start to finish. By Sunday night you\'ll have it priced and ready to sell.' },
      { name: 'The Swipe / Steal This', template: 'Hand over the asset → Give them the words → Tell them what to change', example: 'The exact DM script that books me four calls a week. Steal it. Swap one line for your niche.' },
      { name: 'The "If I Were Starting Over"', template: 'Hypothetical reset → The first move → Why this not that', example: 'If I lost every client tomorrow, here\'s the first thing I\'d do to rebuild. It\'s not what you think.' },
      { name: 'The Checklist / Order', template: 'The sequence → Why the order matters → What happens if you skip', example: 'The 6 things to lock in before you raise your rates. In order. Skip step 2 and the rest doesn\'t work.' },
    ],
    pieces: [
      { n: '13', framework: 'The Comparison', fields: [
        ['Two paths', 'Knock on doors every day. Or post this specific thing five times a day.'],
        ['What each costs', 'Door-knocking: 50 hours a week, low scale. Posting: 5 hours a week, infinite scale once it works.'],
        ['Which when', 'Door-knocking trains you in sales. Posting trains the algorithm. Both work. Pick one and commit for 90 days.'],
        ['Verdict', 'Most coaches do both at half-effort. That\'s the worst path. Which one are you?'],
      ]},
      { n: '14', framework: 'The Tutorial / Walkthrough', fields: [
        ['Outcome', 'Add 10K a month within 90 days without taking on more 1-on-1 clients.'],
        ['Step 1', 'Audit current capacity. What\'s your hour-for-dollar ratio right now?'],
        ['Step 2', 'Convert your highest-ROI service into a group format. Same outcome, 3-5x capacity.'],
        ['Step 3', 'Move your existing pipeline into the new offer. Don\'t replace, layer.'],
        ['What to do next', 'Track for 30 days. Iterate on price, not on structure.'],
      ]},
      { n: '15', framework: 'The "If I Were Starting Over"', fields: [
        ['Hypothetical reset', 'Every client gone tomorrow. Zero pipeline. What do I do Monday?'],
        ['The first move', 'Audit the last 50 conversations I\'ve had. Find the 3 people who keep coming back to me with the same problem.'],
        ['Why this not that', 'Not posting. Not running ads. Not learning a new tactic. People who already trust you = lowest cost, fastest cash.'],
        ['Next', 'Build the offer they need. Sell it to those 3 first. Use that revenue to build the public side.'],
      ]},
      { n: '16', framework: 'Framework Explainer', fields: [
        ['Name your system', 'The Referral Engine. A 3-touch system that runs on autopilot once it\'s installed.'],
        ['The steps', 'Touch 1: First win, ask for the testimonial. Touch 2: 90 days in, ask who else has this problem. Touch 3: At completion, make them the connection broker.'],
        ['What it produces', 'If you have 50 clients and 30% become brokers, you don\'t need ads.'],
        ['Why it works', 'Referrals close 70% faster and at 2x higher ticket than cold leads. Your clients become your salesforce.'],
      ]},
      { n: '17', framework: 'The Numbered Breakdown', fields: [
        ['Number', '3 ways to fill your coaching roster without spending a dollar on ads.'],
        ['Way 1', 'Win-back email to every dormant client. The cheapest revenue you\'ll ever earn.'],
        ['Way 2', 'A referral ask after every measurable win. Make it the standard rep, not a request.'],
        ['Way 3', 'Two specific posts a week that name a problem your ideal client Googles at 11pm.'],
        ['Reward', 'Run these for 30 days. Your DMs change. Then start ads from a position of strength.'],
      ]},
    ],
    hooks: [
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'Doers and waiters. Your content is training one of them to come to you.',
      'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
      'In 60 seconds I\'ll show you how to stop losing clients in the first 90 days.',
      'How to Add $10,000/Month as an Experienced PT.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This.',
    ],
  },

  // ═══ DEMONSTRATION ════════════════════════════════════════════════════
  {
    id: 'demonstration',
    name: 'Demonstration',
    env: 'Whiteboard · desk · shown',
    tone: 'Built on a method. You show it. Live, drawn, screen-share.',
    description: 'Shot at the desk or whiteboard. Same 7 formats as Teaching but SHOWN. Draw it, pull up a real example, do the math live, share the screen.',
    toneClass: 'text-emerald-400',
    hexBg: '#10b981',
    frameworks: [
      { name: 'Numbered Breakdown / Mistakes', template: 'Number → List drawn or shown live → Reward', example: '3 mistakes killing your retention. Drawn on the whiteboard with a circle and an X next to each.' },
      { name: 'Framework Explainer', template: 'Name your system → Draw it live → Show what it produces', example: 'The leaky bucket. Draw the bucket, draw the holes, draw the new clients coming in, draw the ones leaking out.' },
      { name: 'The Comparison', template: 'Whiteboard split-screen → Path A on left, Path B on right → Verdict', example: 'In-person vs online coaching. Two columns drawn live with cost, time, ceiling under each.' },
      { name: 'The Tutorial / Walkthrough', template: 'Outcome → Screen-share the steps → Show the result', example: 'How to set up a Calendly that books only qualified calls. Screen-record the actual setup, click by click.' },
      { name: 'The Swipe / Steal This', template: 'Show the asset on screen → Walk through what each part does → Tell them how to adapt it', example: 'The exact DM script that books me four calls a week. Here it is on screen. Here\'s the line you change.' },
      { name: 'The "If I Were Starting Over"', template: 'Whiteboard timeline → Day 1 → Day 7 → Day 30 → Now', example: 'If I lost every client tomorrow, here\'s my first 30 days. Drawn live on the timeline.' },
      { name: 'The Checklist / Order', template: 'List drawn or shown → Tick each item → Why the sequence', example: 'The 6 things to lock in before you raise your rates. Drawn as a vertical checklist with tick boxes.' },
    ],
    pieces: [
      { n: '18', framework: 'Framework Explainer', fields: [
        ['Name your system', 'The Leaky Bucket Test. The math no one runs on their own business.'],
        ['Draw it live', 'Draw the bucket. New clients pour in the top. Existing clients leak out the sides. The leaks are where the money goes.'],
        ['Walk the steps', 'Step 1: Count clients in over 12 months. Step 2: Count clients out. Step 3: Multiply the lost ones by their LTV.'],
        ['What it produces', 'Above 3% monthly churn? You\'re losing 60% of your business a year. That\'s the $800K my client never saw.'],
        ['Bridge', 'Comment "CHURN" for the calculator.'],
      ]},
      { n: '19', framework: 'The Tutorial / Walkthrough', fields: [
        ['Outcome', 'Discover whether you\'re actually busy or just inefficient.'],
        ['Pull out the phone', '100 clients × 15-minute check-ins = 25 hours per week.'],
        ['Add the rest', 'Comms 5 hours. Content 5 hours. Program updates 5 hours. Total: 40-hour week with 100 clients.'],
        ['The verdict', 'If you\'re flat out at 30 clients, you\'re not maxed. You\'re inefficient.'],
        ['Next', 'Save this. Run your own numbers. Tag a coach who needs to see it.'],
      ]},
      { n: '20', framework: 'The Numbered Breakdown / Mistakes', fields: [
        ['Setup', 'Live coaching call. Pulled up his real numbers. Whiteboard out.'],
        ['Number', '3 numbers that matter more than revenue.'],
        ['List drawn live', '1. Churn rate (he didn\'t track it). 2. LTV (he\'d never calculated). 3. Profit margin (he assumed).'],
        ['The reveal', 'He had 80K months and was losing 9K of it to churn. Untracked.'],
        ['Reward', 'If you don\'t track these 3 numbers monthly, you\'re flying blind.'],
      ]},
    ],
    hooks: [
      'I did the math on his business live and he went white in the face.',
      'You\'re filling a bucket with holes in it and wondering why it never gets full.',
      'Anything above 3% churn means 60% of your business is gone every year.',
      'I\'m going to do the math on your business and you\'re not going to like it.',
      'There\'s a number in your business you\'ve never calculated, and it\'s costing you six figures.',
      'Stop chasing more leads. Plug the leak first.',
      'Give me five minutes and I\'ll find the one number that\'s capping your business.',
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
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
      {copied ? '✓ Copied' : label}
    </button>
  );
}

function PieceCard({ p, toneClass }: { p: Piece; toneClass: string }) {
  const fullText = p.fields.map(([k, v]) => `${k}: ${v}`).join('\n\n');
  return (
    <div className="glow-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className={`font-display text-[18px] font-extrabold ${toneClass}`}>{p.n}</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded-full px-2.5 py-0.5">{p.framework}</span>
        </div>
        <CopyButton text={fullText} />
      </div>
      <div className="space-y-3">
        {p.fields.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[1fr] md:grid-cols-[140px_1fr] gap-1 md:gap-3">
            <span className={`text-[11px] font-semibold uppercase tracking-widest ${toneClass} pt-1 md:pt-1`}>{k}</span>
            <span className="text-[14px] leading-relaxed text-zinc-200">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrameworkCard({ f, toneClass }: { f: Framework; toneClass: string }) {
  return (
    <div className="glow-card p-6">
      <h3 className={`font-display text-[16px] font-extrabold ${toneClass} mb-3`}>{f.name}</h3>
      <p className="text-zinc-500 text-[12px] uppercase tracking-widest mb-2 font-semibold">Template</p>
      <p className="text-zinc-300 text-[14px] leading-relaxed mb-4">{f.template}</p>
      <p className="text-zinc-500 text-[12px] uppercase tracking-widest mb-2 font-semibold">Example</p>
      <p className="text-zinc-200 text-[14px] leading-relaxed italic">&ldquo;{f.example}&rdquo;</p>
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
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-[14px] leading-relaxed flex-1">&ldquo;{hook}&rdquo;</span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 mt-1">
          {copied ? '✓ Copied' : 'Click'}
        </span>
      </div>
    </button>
  );
}

function BucketTab({ b, active, onClick }: { b: Bucket; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition-all ${
        active
          ? 'border-blue-500/40 bg-blue-500/5 shadow-lg'
          : 'border-zinc-800 bg-elevated/40 hover:border-zinc-700 hover:bg-elevated'
      }`}
      style={active ? { borderTop: `3px solid ${b.hexBg}` } : undefined}
    >
      <h3 className={`font-display text-[18px] md:text-[20px] font-extrabold ${b.toneClass} mb-1`}>{b.name}</h3>
      <p className="text-zinc-500 text-[10px] md:text-[11px] uppercase tracking-widest font-semibold mb-2">{b.env}</p>
      <div className="text-[11px] text-zinc-500">
        <span>{b.pieces.length} piece{b.pieces.length === 1 ? '' : 's'}</span>
        <span className="mx-1.5 text-zinc-700">·</span>
        <span>{b.frameworks.length} framework{b.frameworks.length === 1 ? '' : 's'}</span>
      </div>
    </button>
  );
}

function BucketContent({ b }: { b: Bucket }) {
  return (
    <div className="space-y-12">
      <div>
        <p className={`text-[12px] uppercase tracking-widest font-semibold ${b.toneClass} mb-2`}>{b.env}</p>
        <h2 className={`font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] ${b.toneClass} mb-3`}>{b.name}.</h2>
        <p className="text-zinc-400 text-[15px] leading-relaxed">{b.tone}</p>
        <p className="text-zinc-500 text-[13px] leading-relaxed mt-2">{b.description}</p>
      </div>

      <div>
        <H2>Pick a framework.</H2>
        <Note>Choose the structure that fits the moment. Then write to that shape.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {b.frameworks.map((f) => (
            <FrameworkCard key={f.name} f={f} toneClass={b.toneClass} />
          ))}
        </div>
      </div>

      <div>
        <H2>Steal a piece.</H2>
        <Note>Shoot-ready. Each one structured in its framework. Click "Copy" to grab the full piece.</Note>
        <div className="grid gap-4 mt-8">
          {b.pieces.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
              <p className="text-zinc-500 text-[14px]">No pieces in this bucket yet. Use the frameworks above and the hooks below to write the first one.</p>
            </div>
          ) : (
            b.pieces.map((p) => <PieceCard key={p.n} p={p} toneClass={b.toneClass} />)
          )}
        </div>
      </div>

      <div>
        <H2>Pick a hook.</H2>
        <Note>Opening lines in his voice. Click any to copy and use as the first second of camera. Pair with a framework above.</Note>
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
    <Shell title="The Shoot System · Undeniable" description="Four buckets. Pick one. See the framework. Steal a piece. Pick a hook. Shoot it." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Operational · The system"
        title="The Shoot"
        accent="System."
        blurb="Four buckets. Each mapped to an environment. Pick a bucket, pick a framework, steal a piece, grab a hook, shoot it. Open this on shoot day."
      />
      <Divider />

      {/* Kick-off · keep at top */}
      <Wrap>
        <H2>Kick-off · before you shoot.</H2>
        <Note>Call it out first: is this an education piece or a heart piece? Then run the checklist.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {KICKOFF.map((k) => (
            <div key={k.title} className="glow-card p-6">
              <p className={`font-semibold text-[13px] uppercase tracking-widest mb-4 ${k.tone === 'blue' ? 'text-blue-400' : 'text-zinc-300'}`}>{k.title}</p>
              <ul className="space-y-3">
                {k.rows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[14px] leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      {/* Bucket tabs · click to switch */}
      <Wrap>
        <H2>Pick a bucket.</H2>
        <Note>Click a bucket. The frameworks, pieces and hooks for it appear below. One bucket at a time. No scrolling past the others.</Note>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {BUCKETS.map((b) => (
            <BucketTab key={b.id} b={b} active={b.id === activeId} onClick={() => setActiveId(b.id)} />
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* Active bucket content */}
      <Wrap>
        <BucketContent b={active} />
      </Wrap>
    </Shell>
  );
}
