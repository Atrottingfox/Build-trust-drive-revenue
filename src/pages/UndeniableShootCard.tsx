import React, { useState } from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2 } from '../components/undeniable/Bits';

// ─── Kick-off checklist (kept from previous version) ─────────────────────

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

// ─── The 4 buckets · all content lives inside one of these ───────────────

type Framework = { name: string; template: string; example: string };
type Shoot = { n: string; tag: string; hook: string; problem: string; path: string; cta: string };

interface Bucket {
  id: string;
  name: string;
  env: string;
  tone: string;
  description: string;
  toneClass: string;
  hexBg: string;
  frameworks: Framework[];
  shoots: Shoot[];
  hooks: string[];
}

const BUCKETS: Bucket[] = [
  {
    id: 'stories',
    name: 'Stories',
    env: 'Park · outdoors · connection',
    tone: 'Built on an event. Story carries the lesson.',
    description: 'When you film outside, walking, on the road, in a casual environment. The viewer leans in because the moment is real.',
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
    shoots: [
      { n: '04', tag: 'Transformation', hook: 'I built a $5M fitness business without going viral.', problem: 'Everyone tells you the answer is more reach.', path: 'Principles that work cold work warm. I did it without influence or a following. Here\'s the one that actually moved it.', cta: 'Watch the full story (Rome).' },
      { n: '06', tag: 'Specific Moment', hook: 'Someone asked me how the gym I work at works, no one can train there. I said, that\'s the whole point.', problem: 'Everyone signals status with what they sell. I signalled it with what I refuse to.', path: 'A 750K gym no one can use says more than any testimonial. Proof you can\'t fake or lease.', cta: 'This is what undeniable looks like.' },
      { n: '11', tag: 'Specific Moment', hook: 'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it.', problem: 'Two steps forward, two steps back, every month with less oxygen than the last.', path: 'It\'s not a feeling, it\'s a number. It\'s churn. And here\'s the fix.', cta: 'Who feels this? Comment.' },
      { n: '13', tag: 'Transformation', hook: 'I ran a business for 13 years that almost killed me, so you don\'t have to.', problem: 'Five of those years I did it the wrong way, hating my life.', path: 'Mentorship is a game of leapfrog. I have the battle scars so you can jump the problems.', cta: 'The whole arc (character video).' },
      { n: '14', tag: 'Specific Moment', hook: 'I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.', problem: 'Everyone says they only want committed clients.', path: 'You don\'t find the best client. You build them. There\'s a time to coach the committed, but not on day one.', cta: 'Full story on the channel.' },
      { n: '15', tag: 'Transformation', hook: 'Three years ago I ran a seminar for 16 people and made $175. I teach the same thing now for 22 grand.', problem: 'People think the information is what changed.', path: 'It didn\'t. The proof did. Same lesson, walked the walk, now it\'s undeniable.', cta: 'This is the why-now.' },
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

  {
    id: 'hot-takes',
    name: 'Hot Takes',
    env: 'Hallway · new office · direct',
    tone: 'Built on a claim. Belief in, belief out.',
    description: 'Direct to camera in the hallway or the new office. Eye-line tight. One claim, defended cleanly. No setup.',
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
    shoots: [
      { n: '03', tag: 'Reframe', hook: 'If you\'re sick of being called just a PT, even though you\'re over 10K, I finally worked out why.', problem: 'Your business is built like a PT\'s. 12-16 week clients, churn ignored.', path: 'Extend retention to 32 weeks on average. That\'s an instant double on the back end, and marketing gets easier.', cta: 'Full breakdown on the channel.' },
      { n: '05', tag: 'Belief Flip', hook: 'Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.', problem: 'People separate impact from income.', path: 'Income buys impact. A bigger income purchases more of it. You have a duty to build something big if you\'re impact driven.', cta: 'Comment your take.' },
      { n: '08', tag: 'Belief Flip', hook: 'Stop learning marketing and just copy this.', problem: 'Coaches drown in tactics, tools and AI and still don\'t grow.', path: 'The one move that beats all of it, copied straight from what works.', cta: 'The complete plan is on the channel.' },
      { n: '09', tag: 'Reframe', hook: 'You\'re doing 80K months and keeping nothing. Let me show you why.', problem: 'Revenue resets to zero on the first and you panic again. Lifestyle crept up.', path: 'Revenue minus tax, minus GST, minus the lifestyle you adjusted to. Fix profit, not revenue.', cta: 'The fix in the full video.' },
      { n: '10', tag: 'Belief Flip', hook: 'Imagine if you never lost a client. You\'d stop selling and start choosing.', problem: 'You\'re signing two and losing two, running to stand still.', path: 'Net-zero churn means you only ever add. At some point you turn around and say, I\'m done signing clients.', cta: 'Here\'s how close you are.' },
      { n: '12', tag: 'Reframe', hook: 'You\'ve been burned before. Good. Stay sceptical and watch this anyway.', problem: 'You paid a mentor who\'d never done it, and now you\'re scared to invest again.', path: 'Check the receipts. Worst case you stay the same. Best case you\'re wrong and you get wealthier.', cta: 'Come with your bullshit meter on high.' },
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
    shoots: [
      { n: '07', tag: 'The Comparison', hook: 'Two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.', problem: 'Vague posting and hoping the algorithm rewards you doesn\'t convert.', path: 'The specific content type, the exact cadence. Vague versus specific.', cta: 'Which one are you? Comment.' },
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
    shoots: [
      { n: '01', tag: 'Framework Explainer', hook: 'My client lost $800,000 and never even knew it.', problem: 'Most coaches count leads coming in. None of them count clients leaking out.', path: 'Do the math: clients in vs out over 12 months. Above 3% churn and you\'re losing 60% of your business a year. Draw the leaky bucket.', cta: 'Comment "CHURN" for the calculator.' },
      { n: '02', tag: 'The Tutorial / Walkthrough', hook: 'Online coaches think they work a lot. Let\'s actually do the math.', problem: 'You feel flat out at 30 clients and call yourself busy.', path: '100 clients x 15-min check-ins = 25 hours. Add comms, content, program updates. You\'ve finally worked a 40-hour week with 100 clients. You\'re not maxed, you\'re inefficient.', cta: 'Save this and do your own math.' },
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

function ShortCard({ s }: { s: { n: string; tag: string; hook: string; problem: string; path: string; cta: string } }) {
  const fullText = `Hook: ${s.hook}\n\nProblem: ${s.problem}\n\nPath: ${s.path}\n\nCTA: ${s.cta}`;
  return (
    <div className="glow-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-[18px] font-extrabold text-blue-400">{s.n}</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded-full px-2.5 py-0.5">{s.tag}</span>
        </div>
        <CopyButton text={fullText} />
      </div>
      <div className="space-y-3">
        {[['Hook', s.hook], ['Problem', s.problem], ['Path', s.path], ['CTA', s.cta]].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[64px_1fr] gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400 pt-1">{k}</span>
            <span className={`text-[14px] leading-relaxed ${k === 'Hook' ? 'text-white font-medium' : 'text-zinc-300'}`}>{v}</span>
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

function BucketOverviewCard({ b }: { b: Bucket }) {
  return (
    <a
      href={`#${b.id}`}
      className="glow-card p-6 group block hover:scale-[1.01] transition-transform"
      style={{ borderTop: `3px solid ${b.hexBg}` }}
    >
      <h3 className={`font-display text-[22px] font-extrabold ${b.toneClass} mb-1`}>{b.name}</h3>
      <p className="text-zinc-400 text-[12px] uppercase tracking-widest font-semibold mb-3">{b.env}</p>
      <p className="text-zinc-300 text-[14px] leading-relaxed mb-4">{b.description}</p>
      <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-semibold text-zinc-500">
        <span>{b.frameworks.length} framework{b.frameworks.length === 1 ? '' : 's'}</span>
        <span className="text-zinc-700">·</span>
        <span>{b.shoots.length} piece{b.shoots.length === 1 ? '' : 's'}</span>
        <span className="text-zinc-700">·</span>
        <span>{b.hooks.length} hooks</span>
      </div>
      <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-400 mt-4 group-hover:text-blue-300 transition-colors">
        Open bucket →
      </p>
    </a>
  );
}

function BucketSection({ b }: { b: Bucket }) {
  return (
    <section id={b.id} className="scroll-mt-24">
      <Wrap>
        <div className="mb-2">
          <p className={`text-[12px] uppercase tracking-widest font-semibold ${b.toneClass} mb-2`}>{b.env}</p>
          <h2 className={`font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] ${b.toneClass} mb-2`}>{b.name}.</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed">{b.tone}</p>
        </div>
      </Wrap>

      <Wrap>
        <H2>Pick a framework.</H2>
        <Note>Choose the structure that fits the moment. Then write to that shape.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {b.frameworks.map((f) => (
            <FrameworkCard key={f.name} f={f} toneClass={b.toneClass} />
          ))}
        </div>
      </Wrap>

      <Wrap>
        <H2>Steal a piece.</H2>
        <Note>Shoot-ready. Hook to CTA already written. Tighten the words in your own delivery on camera. Click to copy the full piece.</Note>
        <div className="grid gap-4 mt-8">
          {b.shoots.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
              <p className="text-zinc-500 text-[14px]">No shoot-ready pieces in this bucket yet. Use the frameworks above and the hooks below to write the first one.</p>
            </div>
          ) : (
            b.shoots.map((s) => <ShortCard key={s.n} s={s} />)
          )}
        </div>
      </Wrap>

      <Wrap>
        <H2>Pick a hook.</H2>
        <Note>The opening line, in his voice. Click any of these to copy and use as the first second of camera. Pair with a framework above.</Note>
        <div className="grid gap-3 mt-8">
          {b.hooks.map((h) => <HookRow key={h} hook={h} />)}
        </div>
      </Wrap>

      <Divider />
    </section>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────

export default function UndeniableShootCard() {
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
        <Note>The formula every education piece follows: Hook → Problem → Path (tool or "don't do this") → CTA. One problem, one promise, one outcome.</Note>
      </Wrap>
      <Divider />

      {/* The 4 buckets · overview cards */}
      <Wrap>
        <H2>The four buckets.</H2>
        <Note>Each bucket lives in its own environment. Click a bucket to see its frameworks, its shoot-ready pieces, and the hooks that fit.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {BUCKETS.map((b) => <BucketOverviewCard key={b.id} b={b} />)}
        </div>
      </Wrap>
      <Divider />

      {/* Each bucket section, anchor-linked */}
      {BUCKETS.map((b) => <BucketSection key={b.id} b={b} />)}
    </Shell>
  );
}
