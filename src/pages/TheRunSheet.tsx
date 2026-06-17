import React from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2, Block, BulletList } from '../components/undeniable/Bits';

// ─── Status pills ────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  Active: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Queued: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  Locked: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  Decide: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
};
function Status({ s }: { s: keyof typeof STATUS_COLOR }) {
  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold rounded-full border px-2.5 py-0.5 ${STATUS_COLOR[s]}`}>
      {s}
    </span>
  );
}

// ─── 12-week timeline ────────────────────────────────────────────────────

type Week = { range: string; theme: string; ships: string[] };
const TIMELINE: Week[] = [
  { range: 'Week 1', theme: 'Reset · clear the deck', ships: [
    'Six Step Profit Path · new landing page + headline live',
    'Reese Livingstone account · pinned posts swapped (old testimonials → new positioning)',
    'Workshop Q&A card · printed, ready for next workshop',
    'Sales Success System · landing page live (asset already exists)',
    'Corey · sits in on 3 client calls. No camera. Just pattern recognition.',
  ]},
  { range: 'Week 2', theme: 'Lock the run sheet', ships: [
    '30-day test plan locked · 4 environments × 14 shorts/week, Mon/Wed/Fri',
    'Character video script outlined (chronological arc, 20-30 min target)',
    'Rome VSL outline drafted (pillars + case studies + chapters)',
    'Churn Calculator · spec written, dev started',
    'Atlas · 4 micro-assets requested from existing problems-solved-this-week notes',
  ]},
  { range: 'Week 3', theme: 'Character ships', ships: [
    'Character video · shot in 1 day (walking + sitting in gym, recounting arc)',
    'First 14 shorts shot at Mon/Wed/Fri cadence',
    'Podcast batch 1 · 3 episodes recorded from book chapters',
    'Monday review template installed (Corey runs it weekly)',
  ]},
  { range: 'Week 4', theme: 'Rome prep + character ships', ships: [
    'Character video · live on YouTube + dedicated landing page',
    'Rome VSL · filming days locked (2-3 day block-shoot)',
    'Churn Calculator · live + linked from a relevant short',
    'Bottleneck Buster Diagnostic · soft rebrand if needed',
  ]},
  { range: 'Weeks 5-6', theme: 'Rome shoot + edit', ships: [
    'Rome VSL · block-shot across 2-3 days',
    'Rome edit kicked off (2-week target)',
    'Six-week cycle · week 1 (character-style) shot + posted',
    'Six-week cycle · week 2 (framework explainer) shot + posted',
    'First 30-day test data · 4 winners picked, duds killed',
  ]},
  { range: 'Weeks 7-8', theme: 'Rome ships + cycle continues', ships: [
    'Rome VSL · hosted unlisted on dedicated page → drives mid-funnel ads',
    'Six-week cycle · weeks 3-4 shipped',
    'Podcast cadence · 3/week locked',
    'Q&A workshop · framework enforced, 8-12 mid-funnel ad sources captured',
  ]},
  { range: 'Weeks 9-12', theme: 'Compound + double down', ships: [
    'Rome VSL · live on YouTube (Reese Livingstone channel)',
    'Six-week cycle · weeks 5-6 close. New cycle starts week 7.',
    'Test 1-2 new content formats per month (continuous testing locked in)',
    'Corey · presenting Monday creative direction off data (not vibes)',
    'KPI dashboard · first quarterly review run',
  ]},
];

// ─── Weekly rhythm ───────────────────────────────────────────────────────

const RHYTHM: Array<{ day: string; rhys: string; corey: string }> = [
  { day: 'Monday', rhys: 'AM: ideation + last week review. 10-2: shoot. PM: capture (4 questions, voice note).', corey: 'AM: pull last week\'s data, prep Monday review. 10-2: run the shoot. PM: dump rushes, mark keeper shots.' },
  { day: 'Tuesday', rhys: 'Client calls. End of day: capture (4 questions).', corey: 'Edit · short-form batch 1 (target: 4-5 shorts ready by EOD).' },
  { day: 'Wednesday', rhys: '10-2: shoot. End of day: capture.', corey: '10-2: run the shoot. PM: dump rushes.' },
  { day: 'Thursday', rhys: 'Client calls. End of day: capture.', corey: 'Edit · short-form batch 2 + podcast cuts.' },
  { day: 'Friday', rhys: '10-2: shoot. End of day: weekly review with Corey.', corey: '10-2: run the shoot. PM: weekly review. Schedule next week\'s shoots.' },
  { day: 'Saturday', rhys: 'Off (or content review if travelling).', corey: 'Off.' },
  { day: 'Sunday', rhys: 'Eve: scan next week\'s shoot list. Approve.', corey: 'Pre-load Monday\'s prompts in shared doc.' },
];

// ─── Asset specs ─────────────────────────────────────────────────────────

type Asset = {
  name: string;
  status: keyof typeof STATUS_COLOR;
  owner: string;
  due: string;
  outcome: string;
  format: string;
  copy: string;
  notes: string;
};
const ASSETS: Asset[] = [
  {
    name: 'Six Step Profit Path',
    status: 'Active',
    owner: 'Sean (copy) · Rhys team (page build)',
    due: 'End of week 2',
    outcome: 'Take leads from never-heard-of-you to obsessed advocate.',
    format: 'PDF + video lesson + audio lesson + 4 bonus GPTs',
    copy: 'Headline: "Turn cold leads into raving fans." · Sub: "In 5 minutes, you\'ll know exactly how to take people from unaware to obsessed. Without DMing 100 people a day or spending hours on camera every week." · CTA: "Get the framework."',
    notes: 'Asset already exists. Rename + relaunch landing page. Old name (Customer Journey Blueprint) is dead.',
  },
  {
    name: 'Sales Success System',
    status: 'Active',
    owner: 'Sean (copy)',
    due: 'End of week 2',
    outcome: 'The exact framework Rhys uses to close 9 out of 10 workshop calls.',
    format: 'PDF + video walk-through',
    copy: 'Headline: "From Cold to Sold." · Sub: "The sales framework I use on every workshop call. Stripped to its bones. Steal it."',
    notes: 'Currently best-performing asset for lead quality. Doesn\'t need rebuild — just a clean landing page.',
  },
  {
    name: 'Bottleneck Buster · Diagnostic',
    status: 'Active',
    owner: 'Rhys',
    due: 'Already live',
    outcome: 'A personalised solution to the single biggest problem in the user\'s business.',
    format: 'Interactive · 63 personalised combinations · 30-day re-submission lockout',
    copy: 'Headline lift: "Find the one thing capping your business." · Sub: "60-second diagnostic. Personalised blueprint + a video of me walking you through the fix."',
    notes: 'Highest-value asset on the page. Considered renaming away from "diagnostic" — most don\'t know the word.',
  },
  {
    name: 'Machine Framework',
    status: 'Locked',
    owner: 'Rhys',
    due: 'Already live',
    outcome: 'Build a business that runs without you. NEXT-EXPAND acronym.',
    format: 'PDF + the chapter from the book that grew into it',
    copy: 'Headline: "Build the business that runs without you." · Sub: "The 8-step machine framework. Same one I used to run $5M with staff on 12-hour weeks."',
    notes: 'Built live on stage during the Gabe video. Ship as is.',
  },
  {
    name: 'Churn Calculator',
    status: 'Queued',
    owner: 'Rhys team (build) · Sean (copy)',
    due: 'End of week 4',
    outcome: 'Self-identify the leak. Names a problem coaches feel but can\'t describe.',
    format: 'Web tool · inputs: new clients in × clients out × 12 months → output: grow / flat / shrink + lost revenue figure',
    copy: 'Headline: "How big is your leak?" · Sub: "60-second calculator. Pours your business into a leaky bucket and tells you how fast it\'s draining. Imagine if you never lost a client."',
    notes: 'Visualise as the leaky bucket. Above 3% leak rate triggers a follow-up sequence: "60% of your business is gone every year. Here\'s the fix."',
  },
  {
    name: 'Hiring Framework · NEXT EXPAND',
    status: 'Locked',
    owner: 'Rhys',
    due: 'Already shipped',
    outcome: 'How to hire your first VA / second hire without trapping yourself.',
    format: 'PDF',
    copy: 'Headline: "Your next hire." · Sub: "The framework I used to put staff on full-time who worked 12-hour weeks and earned 85K. Without the subcontractor trap."',
    notes: '⚠️ Don\'t make content about the subcontractor legal issue. Keep the asset; don\'t spotlight it. Existing clients are exposed.',
  },
  {
    name: 'Custom GPT route',
    status: 'Decide',
    owner: 'Rhys + Sean',
    due: 'End of week 3',
    outcome: 'Atlas spins out 4-8 mini-assets from existing problems.',
    format: 'Either: rotate weekly (1-2 new/week) OR pick 4-8 workhorses and lock them',
    copy: 'TBD based on decision.',
    notes: 'Decision needed: do we want personalisation surface area or do we want a small set of bulletproof workhorses? Recommend the latter for clarity.',
  },
];

// ─── Video specs ─────────────────────────────────────────────────────────

const CHARACTER_SPEC = {
  length: '20-30 minutes',
  format: 'Walking + sitting + voiceover with B-roll',
  shootDays: '1 day',
  editDays: '2-3 days',
  distribution: 'YouTube + dedicated landing page (pinned)',
  arc: [
    ['Cold open', '"I built a $5M fitness business without going viral. Here\'s everything I did. And almost everything I did wrong first."'],
    ['Old situation', 'Gym floor. Trading time for money. Couldn\'t scale because I was the product.'],
    ['First scar · couldn\'t pay staff', 'Two weeks before Christmas. The year that taught me everything.'],
    ['Second scar · ready to walk away', '600% growth in 5 months. The numbers people would kill for. I was ready to walk away.'],
    ['Turning point', 'Stopped chasing more. Focused on the ones already there.'],
    ['Proof beat 1', 'Less than 5,000 followers. 12 likes on a photo. $2.2M US.'],
    ['Proof beat 2', '750K gym. No one\'s allowed to train there. That\'s the whole point.'],
    ['Proof beat 3', 'Sabine: 15K → 80K. She watched every podcast back to the Livingstone days.'],
    ['New reality', '$5M. 82% 12-month retention. Built on systems, not viral moments.'],
    ['Invitation', '"If you want to see how I applied all of this, I made Rome. 4 hours. Everything. Link below."'],
  ],
  toneRules: [
    'Vulnerable, not selling',
    'Damaging admissions OK',
    'No CTAs beyond "go watch Rome"',
    'Lo-fi production, walking-and-talking',
    'Empathise with where they are, not putting yourself down',
  ],
};

const ROME_SPEC = {
  length: '4-5 hours (target)',
  workingTitle: 'How to make your first 10K as an online fitness coach (and grow to 80K)',
  shootDays: '2-3 day block-shoot',
  editDays: '~14 days',
  distribution: 'Unlisted on dedicated landing page during pre-launch → public on YouTube',
  chapters: [
    ['~5 min', 'Hook · clear promise + length + outcome'],
    ['~10 min', 'The problem · why most coaches cap at 10K'],
    ['~45 min', 'The path · what to do instead, segment by segment'],
    ['~20 min', 'Personal story arc (echoes Character video, denser)'],
    ['~30 min', 'Case study 1 · Luke Miller (60K → 600K USD in 12 months)'],
    ['~30 min', 'Case study 2 · Sabine (15K → 80K)'],
    ['~20 min', 'Case study 3 · Gabe (800K mistake → fix → next stage)'],
    ['~60 min', 'The full system · how the pieces fit'],
    ['~10 min', 'Next step CTA · workshop or assets'],
  ],
};

// ─── Six-week cycle ──────────────────────────────────────────────────────

const CYCLE: Array<{ week: string; type: string; example: string; framework: string }> = [
  { week: 'Week 1', type: 'Character / heart', example: '"When I was at my worst, we were at our best. We grew 600% and I was ready to walk away."', framework: 'Specific Moment · Stories bucket' },
  { week: 'Week 2', type: 'Framework explainer', example: '"The leaky bucket. Top fills with new clients. Sides leak with churn. Above 3% = 60% of the business gone every year."', framework: 'The Bucket · Show bucket' },
  { week: 'Week 3', type: 'Comparison / binary', example: '"Two ways to get leads. Door-knock or post 5x a day. Pick one. Commit 90 days."', framework: 'The Comparison · Teach bucket' },
  { week: 'Week 4', type: 'Math live', example: '"Coaches think 3% churn is fine. Let\'s do the math."', framework: 'Math Live · Show bucket' },
  { week: 'Week 5', type: 'List / numbered breakdown', example: '"3 numbers in your business you\'ve never measured. Each costing you six figures."', framework: 'The List · Teach bucket' },
  { week: 'Week 6', type: 'Belief flip / hot take', example: '"35 clients done brilliantly vs 350 who lose 10kg and move on. Income buys impact. Fight me."', framework: 'Fight Me · Beliefs bucket' },
];

// ─── Page ────────────────────────────────────────────────────────────────

export default function TheRunSheet() {
  return (
    <Shell title="The Run Sheet · Undeniable" description="The tactile execution plan. Week by week, day by day, asset by asset." path="/runsheet">
      <PageHead
        eyebrow="Operational · Execution"
        title="The Run"
        accent="Sheet."
        blurb="The tactile plan. Not the strategy. Week by week, day by day, asset by asset. Nitty gritty details. If you want the why, see The Plan."
      />
      <Divider />

      {/* ─── 12-WEEK TIMELINE ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">01 · Timeline</p>
        <H2>What ships, week by week.</H2>
        <Note>Don\'t start the next thing until the previous is shipped or scheduled. No parallel work on items that need Rhys.</Note>
        <div className="mt-8 grid gap-4">
          {TIMELINE.map((w) => (
            <div key={w.range} className="glow-card p-6">
              <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                <p className="font-display text-[18px] font-extrabold text-white">{w.range}</p>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400">{w.theme}</p>
              </div>
              <ul className="space-y-2">
                {w.ships.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[14px] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      {/* ─── WEEKLY RHYTHM ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">02 · Rhythm</p>
        <H2>What every week looks like.</H2>
        <Note>Shoot Mon / Wed / Fri. Edit Tue / Thu. Friday is the weekly review. Sunday Rhys scans next week. Lock it.</Note>
        <div className="mt-8 grid gap-3">
          {RHYTHM.map((r) => (
            <div key={r.day} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
              <p className="font-display text-[16px] font-extrabold text-white mb-3">{r.day}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Rhys</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed">{r.rhys}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Corey</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed">{r.corey}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      {/* ─── ASSETS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">03 · Assets</p>
        <H2>Every lead magnet · what ships, when, by who.</H2>
        <Note>Outcome stated first. Copy drafted. Owner named. Due date locked.</Note>
        <div className="mt-8 grid gap-4">
          {ASSETS.map((a) => (
            <div key={a.name} className="glow-card p-6">
              <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
                <p className="font-display text-[18px] font-extrabold text-white">{a.name}</p>
                <Status s={a.status} />
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                <div><span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Owner</span><span className="text-zinc-300 text-[13px]">{a.owner}</span></div>
                <div><span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Due</span><span className="text-zinc-300 text-[13px]">{a.due}</span></div>
                <div><span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Outcome</span><span className="text-zinc-300 text-[13px]">{a.outcome}</span></div>
                <div><span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mr-2">Format</span><span className="text-zinc-300 text-[13px]">{a.format}</span></div>
              </div>
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Copy</p>
                <p className="text-zinc-200 text-[13px] leading-relaxed italic">{a.copy}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Notes</p>
                <p className="text-zinc-400 text-[13px] leading-relaxed">{a.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      {/* ─── CHARACTER VIDEO ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">04 · Character video</p>
        <H2>The Trojan horse.</H2>
        <Note>20-30 min. Rhys\'s arc. Vulnerable. No selling. Pure trust transfer. Bridges to Rome at the end.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Length</p>
            <p className="text-white font-semibold">{CHARACTER_SPEC.length}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Format</p>
            <p className="text-white font-semibold">{CHARACTER_SPEC.format}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Shoot days</p>
            <p className="text-white font-semibold">{CHARACTER_SPEC.shootDays}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Edit · distribution</p>
            <p className="text-white font-semibold">{CHARACTER_SPEC.editDays} · {CHARACTER_SPEC.distribution}</p>
          </div>
        </div>
        <Block label="The arc · beat by beat">
          <div className="grid gap-2">
            {CHARACTER_SPEC.arc.map(([beat, line]) => (
              <div key={beat} className="grid grid-cols-[1fr] md:grid-cols-[160px_1fr] gap-1 md:gap-4 py-2 border-b border-zinc-900 last:border-0">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">{beat}</p>
                <p className="text-zinc-200 text-[13px] leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block label="Tone rules · hold these on shoot day">
          <BulletList items={CHARACTER_SPEC.toneRules} />
        </Block>
      </Wrap>
      <Divider />

      {/* ─── ROME ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">05 · Rome</p>
        <H2>The trust asset. The thing others send to their friends.</H2>
        <Note>4-5 hours. The full VSL. Pillars + path + personal + case studies. Hosted unlisted on a landing page first. YouTube launch when ready.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Working title</p>
            <p className="text-white font-semibold">{ROME_SPEC.workingTitle}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Length</p>
            <p className="text-white font-semibold">{ROME_SPEC.length}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Shoot · edit</p>
            <p className="text-white font-semibold">{ROME_SPEC.shootDays} · {ROME_SPEC.editDays}</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Distribution</p>
            <p className="text-white font-semibold">{ROME_SPEC.distribution}</p>
          </div>
        </div>
        <Block label="Chapter map">
          <div className="grid gap-2">
            {ROME_SPEC.chapters.map(([time, chapter]) => (
              <div key={chapter} className="grid grid-cols-[1fr] md:grid-cols-[100px_1fr] gap-1 md:gap-4 py-2 border-b border-zinc-900 last:border-0">
                <p className="text-blue-400 text-[12px] font-mono font-semibold">{time}</p>
                <p className="text-zinc-200 text-[14px] leading-relaxed">{chapter}</p>
              </div>
            ))}
          </div>
        </Block>
      </Wrap>
      <Divider />

      {/* ─── SIX-WEEK CYCLE ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">06 · Six-week cycle</p>
        <H2>One video a week. Six types. Loop.</H2>
        <Note>The first six are locked. After that, swap 1-2 per cycle if data says swap. Don\'t reinvent every cycle.</Note>
        <div className="mt-8 grid gap-3">
          {CYCLE.map((c) => (
            <div key={c.week} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
              <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                <p className="font-display text-[16px] font-extrabold text-white">{c.week} · {c.type}</p>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">{c.framework}</p>
              </div>
              <p className="text-zinc-200 text-[14px] leading-relaxed italic">&ldquo;{c.example}&rdquo;</p>
            </div>
          ))}
        </div>
        <Block label="Per-video workflow">
          <BulletList items={[
            <><b className="text-white font-semibold">Monday AM</b> · Pick the week\'s type. Write hook + problem (Rhys).</>,
            <><b className="text-white font-semibold">Monday or Wednesday</b> · Shoot (10-2 window).</>,
            <><b className="text-white font-semibold">Thursday</b> · First edit (Corey).</>,
            <><b className="text-white font-semibold">Friday</b> · Review + final tweaks.</>,
            <><b className="text-white font-semibold">Sunday</b> · Post.</>,
          ]} />
        </Block>
      </Wrap>
      <Divider />

      {/* ─── PODCASTS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">07 · Podcasts</p>
        <H2>3 episodes a week. 5-15 minutes each.</H2>
        <Note>One framework per episode. The 78 unfinished chapters from the book become 78 episodes. The pipeline writes itself.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Source</p>
            <BulletList items={[
              <>78 chapters from the book draft</>,
              <>Mid-week client problem voice notes (captured)</>,
              <>Mindset / framing content that doesn\'t fit YouTube ("vertical growth feels fun until it stops")</>,
            ]} />
          </div>
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Distribution</p>
            <BulletList items={[
              <>Spotify · Apple Podcasts (audio first)</>,
              <>YouTube audio version (still frame + waveform)</>,
              <>Short clip pulled for IG / TikTok per episode</>,
              <>Email newsletter highlights weekly</>,
            ]} />
          </div>
        </div>
      </Wrap>
      <Divider />

      {/* ─── WORKSHOP Q&A ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">08 · Workshop Q&A</p>
        <H2>Enforce the question framework.</H2>
        <Note>Gabe is the only one who hit the framework last time. Everyone else freeballed. Fix this once = 12 months of mid-funnel ad fuel.</Note>
        <div className="mt-8">
          <Block label="The card · printed, on every chair">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 mb-3">When you ask a question, say:</p>
              <div className="space-y-2 text-zinc-100 text-[15px] leading-relaxed font-medium">
                <p>&ldquo;I&apos;m a <span className="text-blue-300">[role]</span>.&rdquo;</p>
                <p>&ldquo;I make <span className="text-blue-300">[revenue]</span>.&rdquo;</p>
                <p>&ldquo;My main problem is <span className="text-blue-300">[X]</span>.&rdquo;</p>
                <p>&ldquo;If I don&apos;t fix it, <span className="text-blue-300">[stakes]</span>.&rdquo;</p>
              </div>
            </div>
          </Block>
          <Block label="Production">
            <BulletList items={[
              'Two-camera setup. One on Rhys. One locked side angle on the asker.',
              'If the asker doesn\'t hit the framework, Rhys re-prompts: "Can you re-ask in the format on the card?"',
              'Don\'t roll on questions that won\'t cut. Save the time.',
              'Pull 8-12 strongest as mid-funnel ad creative the same week.',
            ]} />
          </Block>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 30-DAY TEST ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">09 · 30-day test</p>
        <H2>Test the variables. Lock the winners.</H2>
        <Note>Test format and length, not environment. Environments rotate. The point isn\'t which one wins — the point is variety.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Rotate · don\'t test</p>
            <BulletList items={[
              'Office',
              'Hallway',
              'Park',
              'Gym',
              '3-4 pieces per environment per week',
            ]} />
          </div>
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Actually test</p>
            <BulletList items={[
              <><b className="text-white font-semibold">Format</b> · Walking head · Top-down · Whiteboard · Sitting</>,
              <><b className="text-white font-semibold">Length</b> · 15s · 30s · 45s · 60s</>,
              <><b className="text-white font-semibold">Hook style</b> · Timebox ("In 60 seconds...") · Contrarian · Story-open · Number reveal</>,
              <><b className="text-white font-semibold">CTA</b> · None · Save · Comment · Bridge to asset</>,
            ]} />
          </div>
        </div>
        <Block label="After 30 days · pick 4 winners">
          <BulletList items={[
            <><b className="text-white font-semibold">Best save + share rate</b></>,
            <><b className="text-white font-semibold">Best ICP comment rate</b> (qualitative read, not just count)</>,
            <><b className="text-white font-semibold">Best Rhys-enjoyed</b> · if he doesn\'t want to shoot it, it won\'t survive</>,
            <><b className="text-white font-semibold">Best Corey-can-replicate</b> · format that doesn\'t need Rhys\'s presence to ideate</>,
          ]} />
          <Note>Then test 1-2 new formats per month from week 5 onwards. The lock isn\'t permanent — it\'s a base rhythm.</Note>
        </Block>
      </Wrap>
      <Divider />

      {/* ─── MONDAY REVIEW ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">10 · Monday review</p>
        <H2>The 7-question check. Every Monday. 10 minutes.</H2>
        <Note>Corey prepares it. Rhys signs off. Drives the week\'s decisions.</Note>
        <div className="mt-8 grid gap-2">
          {[
            'Best stat from last week (single number, named)',
            'Highest watch-time video. What was the topic?',
            'Drop-off point on the highest-performer (3-4s = rehook there or layer CTA there)',
            'Save rate. If high, simplify. Saves are a warning not a win.',
            'ICP comments yes / no. Are the right people commenting?',
            'Topic that worked. Why? (best guess)',
            'Decision: what do we do more of this week?',
          ].map((q, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 flex items-start gap-4">
              <span className="font-display text-blue-400 text-[14px] font-extrabold flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-zinc-200 text-[14px] leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </Wrap>
      <Divider />

      {/* ─── KPIs ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">11 · KPIs</p>
        <H2>What we measure. Where we are. Where we\'re going.</H2>
        <Note>Track these weekly. Quarterly review against the 5-year math.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Funnel</p>
            <BulletList items={[
              <>Workshop signups · target 75/week sustained</>,
              <>Workshop show rate · <b className="text-white font-semibold">baseline 99%</b> · hold</>,
              <>Workshop → call rate · current sub-2% on page · <b className="text-amber-300 font-semibold">fix to 5%+</b></>,
              <>Call → close rate · 9 out of 10 on best months · hold</>,
              <>L2 12-month retention · <b className="text-emerald-300 font-semibold">82% proven</b> · hold</>,
            ]} />
          </div>
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Content</p>
            <BulletList items={[
              <>Average watch time (rising = working)</>,
              <>Save rate · watch for spikes (warning)</>,
              <>Share rate · best forward indicator</>,
              <>ICP comment ratio (qualitative)</>,
              <>VSL completion · <b className="text-emerald-300 font-semibold">83% on 8-min cut</b> · hold or improve</>,
            ]} />
          </div>
        </div>
      </Wrap>
      <Divider />

      {/* ─── OPEN DECISIONS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">12 · Open</p>
        <H2>Decisions still pending.</H2>
        <Note>These don\'t block week 1. Get them off the list by week 4.</Note>
        <div className="mt-8 grid gap-3">
          {[
            { q: 'Custom GPT route', detail: 'Rotate weekly (1-2 new) OR pick 4-8 workhorses and lock. Recommend the workhorse path.' },
            { q: 'Bottleneck Buster · rename?', detail: '"Diagnostic" + "Bottleneck" are both words most don\'t know. Test a softer name on the landing page.' },
            { q: 'Linktree replacement', detail: 'Currently one link form. One link in bio = friction. Decide: single CTA-led landing page that branches.' },
            { q: 'Reese Livingstone vs Undeniable channel', detail: 'Personal account vs business account. Currently posting on both. Pick a primary, support the other.' },
            { q: 'Ad-boost on shorts?', detail: 'Currently not boosted. Test on top 3 performers per month with a fixed $50 boost.' },
            { q: 'Re-cut workshop VSL', detail: '83% completion is great. Sub-2% page conversion is not. Add scrubber + pause controls, segment ad audiences upstream.' },
          ].map((d, i) => (
            <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="font-display text-[15px] font-extrabold text-amber-300 mb-1">{d.q}</p>
              <p className="text-zinc-300 text-[13px] leading-relaxed">{d.detail}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
