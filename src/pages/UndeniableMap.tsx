import React from 'react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-400 text-[14px] md:text-[15px] mb-8 max-w-2xl leading-relaxed">{children}</p>
);

// NOTE: Tailwind JIT cannot resolve `text-[${x}px]`, so sizes must be literal classes.
const Bullets = ({ items, size = '14' }: { items: string[]; size?: '13' | '14' }) => (
  <ul className="space-y-2">
    {items.map((it) => (
      <li key={it} className="flex items-start gap-2.5">
        <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className={`text-zinc-200 leading-relaxed ${size === '13' ? 'text-[13px]' : 'text-[14px]'}`}>{it}</span>
      </li>
    ))}
  </ul>
);

// ─── Where we're at ─────────────────────────────────────────────────────

const SIGNALS: Array<{ label: string; value: string; read: string; tone: 'down' | 'flat' | 'up' }> = [
  { label: 'Views', value: 'Down', read: 'The cost of stopping to rebuild.', tone: 'down' },
  { label: 'Foundation', value: 'In', read: 'Brand, direction and cadence are set.', tone: 'up' },
  { label: 'Operator', value: 'Day 30', read: 'Jacob hits his first board this week.', tone: 'flat' },
];

// ─── What we've done ────────────────────────────────────────────────────

const DONE: Array<{ head: string; detail?: string }> = [
  {
    head: 'Recalibrated on the creative director',
    detail: 'We got him out. Then we rebuilt from the foundation up. That was hard and it cost us momentum, and it was the right call.',
  },
  {
    head: 'Brought Jacob in inside one week',
    detail: 'No drift between one person leaving and the next one starting.',
  },
  {
    head: 'Set his KPIs before he started producing',
    detail: 'He knows what he is measured on. It is written down in his own doc.',
  },
  {
    head: 'Gave him a clear 90 day path',
    detail: 'He is not guessing at what the next three months look like.',
  },
  {
    head: 'Set the direction for short form',
    detail: 'That gave him everything he needed to begin.',
  },
  {
    head: 'Built the foundation for scale from the bottom up',
  },
];

// ─── The phases ─────────────────────────────────────────────────────────

type Phase = {
  window: string;
  name: string;
  state: 'closing' | 'next' | 'later';
  outcome: string;
  items: string[];
};

const PHASES: Phase[] = [
  {
    window: 'Day 1 to 30',
    name: 'Get him in and get him producing',
    state: 'closing',
    outcome: 'Jacob onboarded, KPIs set, short form direction locked, output running.',
    items: [
      'Onboarded inside one week',
      'KPIs written and agreed',
      '90 day path mapped',
      'Short form direction set',
      'Instagram output running at a decent standard',
    ],
  },
  {
    window: 'Day 31 to 60',
    name: 'Ramp long form and tighten the loop',
    state: 'next',
    outcome: 'Long form volume up. Hooks sharp. Approvals fast. Time tracked and scored.',
    items: [
      'Ramp up long form output',
      'Delegate long form properly, not piece by piece',
      'Hooks become a weekly discipline',
      'Make the Instagram approval loop more efficient',
      'Jacob tracks his time and scores his own effectiveness',
      'Friday training running every week',
    ],
  },
  {
    window: 'Day 61 to 90',
    name: 'Set at the day 60 board',
    state: 'later',
    outcome: 'Defined once we see what the 30 to 60 ramp actually produces.',
    items: [
      '[SET AT DAY 60 BOARD]',
    ],
  },
];

// ─── The timeline ───────────────────────────────────────────────────────

type Stop = {
  day: string;
  when?: string;
  title: string;
  kind: 'gate' | 'work' | 'later';
  items: string[];
};

const TIMELINE: Stop[] = [
  {
    day: 'Day 30',
    when: 'This week',
    title: 'Content Board 01',
    kind: 'gate',
    items: [
      'Jacob presents the numbers for the first time.',
      'Open his KPI doc and go through it line by line.',
      'Agree what is on track and what is not.',
      'Time tracking starts from this day.',
      'Agree the first long form piece he takes on.',
    ],
  },
  {
    day: 'Day 30',
    when: 'This Friday',
    title: 'Training 01',
    kind: 'work',
    items: [
      'The weekly training starts here and runs every Friday from now on.',
      'Topic for this one is hooks.',
      'Break it down live. What is working, what is not, and what we change.',
    ],
  },
  {
    day: 'Day 31 to 45',
    title: 'Hand over long form',
    kind: 'work',
    items: [
      'First long form pieces move across to Jacob.',
      'Hooks become a weekly discipline, written and reviewed.',
      'Time tracked every day, no exceptions.',
      'Rebuild the Instagram approval loop so it stops being the drag.',
    ],
  },
  {
    day: 'Day 46 to 60',
    title: 'Ramp the output',
    kind: 'work',
    items: [
      'Long form volume goes up.',
      'Jacob scores his own time against what it produced.',
      'Training continues every Friday.',
      'First read on whether hooks have moved the numbers.',
    ],
  },
  {
    day: 'Day 60',
    title: 'Content Board 02',
    kind: 'gate',
    items: [
      'Second board. Jacob reads the 30 to 60 data back to us.',
      'What moved, what did not, what he is changing.',
      'Set the day 61 to 90 plan off what actually worked.',
    ],
  },
  {
    day: 'Day 61 to 90',
    title: 'Set at the day 60 board',
    kind: 'later',
    items: [
      '[SET AT DAY 60 BOARD]',
    ],
  },
  {
    day: 'Day 90',
    title: 'Content Board 03',
    kind: 'gate',
    items: [
      'Full 90 day review against the KPIs he was given on day one.',
      'What the operator owns from here without us in the room.',
    ],
  },
];

// ─── The 12 months ──────────────────────────────────────────────────────

type Stage = {
  key: string;
  span: string;
  label: string;
  tone: 'solid' | 'mid' | 'dim';
  weight: string;
  outcome: string;
  items: string[];
  status?: string;
};

const STAGES: Stage[] = [
  {
    key: 'build',
    span: 'Days 0 to 90',
    label: 'Build',
    tone: 'solid',
    weight: 'flex-[1]',
    outcome: 'The engine is installed and we know what actually works.',
    items: [
      'Operator running the week without us in the room.',
      'The foundation of assets built out.',
      'Clear angles that work consistently across ads.',
      'Hooks dialled in.',
      'Long form running on its own rotation.',
    ],
    status: 'In progress · day 30 of 90',
  },
  {
    key: 'scale',
    span: 'Months 4 to 6',
    label: 'Scale',
    tone: 'mid',
    weight: 'flex-[1]',
    outcome: 'Undeniable becomes worth partnering with, and we put money behind what is already proven.',
    items: [
      'Scale the ad angles that worked. More spend behind what is proven, not new guesses.',
      'Open brand and sponsor partnerships now the asset foundation exists.',
      'Joint campaigns with fitness brands that want the audience.',
      'The content engine keeps running underneath all of it.',
    ],
    status: 'Starts once the 90 days has produced the three unlocks',
  },
  {
    key: 'expand',
    span: 'Months 7 to 12',
    label: 'Expand',
    tone: 'dim',
    weight: 'flex-[2]',
    outcome: 'The next market pulls you in.',
    items: [
      'Own the pond first. Do not jump markets before the current one is locked.',
      'Keep injecting broader business content to see who raises their hand from outside fitness.',
      'Decide on the service business opportunity with data, not appetite.',
      'Supply based on demand, so CAC comes down instead of up.',
      '[SPECIFICS SET AT DAY 90 BOARD]',
    ],
    status: 'Direction is agreed. Specifics get set at the day 90 board',
  },
];

const UNLOCKS: Array<{ n: string; title: string; detail: string }> = [
  {
    n: '01',
    title: 'Angles that work across ads',
    detail: 'Proven and repeatable. Not one post that got lucky.',
  },
  {
    n: '02',
    title: 'A foundation of assets',
    detail: 'Enough in the bank that a partner can see what they are buying into.',
  },
  {
    n: '03',
    title: 'An operator running it',
    detail: 'Jacob owns the week without Sean in the room.',
  },
];

// ─── Weekly rhythm ──────────────────────────────────────────────────────

type Day = { d: string; call?: string; shoot?: string; work?: string };

const WEEK: Day[] = [
  { d: 'Mon', call: 'Week ahead', shoot: 'Short form shoot' },
  { d: 'Tue', work: 'Edit' },
  { d: 'Wed', shoot: 'Short form shoot' },
  { d: 'Thu', work: 'Edit' },
  { d: 'Fri', call: 'Training', shoot: 'Long form shoot' },
  { d: 'Sat' },
  { d: 'Sun' },
];

const CALLS: Array<{ day: string; name: string; who: string; agenda: string[] }> = [
  {
    day: 'Monday',
    name: 'Week ahead',
    who: 'Sean + Jacob',
    agenda: [
      'What ships this week.',
      'What is stuck and who unsticks it.',
      'The approvals queue. Clear it before it becomes the drag.',
      'Anything Rhys needs to be in the room for.',
    ],
  },
  {
    day: 'Friday',
    name: 'Training',
    who: 'Sean + Jacob + the room',
    agenda: [
      'One topic per session, picked from what the work needs next.',
      'Work on real examples, not theory.',
      'Jacob leaves with something he applies on Monday.',
    ],
  },
];

// ─── The content board ──────────────────────────────────────────────────

const BOARD_STEPS: Array<{ n: string; q: string; detail: string }> = [
  {
    n: '01',
    q: 'What the numbers are indicating',
    detail: 'Jacob reads the data back. Not a dump. The pattern he can see in it.',
  },
  {
    n: '02',
    q: 'What we should be doing about it',
    detail: 'His read on what the pattern means we change.',
  },
  {
    n: '03',
    q: 'What I am going to do about it',
    detail: 'His call. What he owns and by when. Then we push on it.',
  },
];

const BOARD_BRING: string[] = [
  'Top and bottom performers for the period',
  'Hook patterns. What is winning and what is dying',
  'Views, saves, shares, comments on short form',
  'Watch time and retention on long form',
  'What he tested and what it told him',
  'His own time log and how he scores it',
];

// ─── The gaps ───────────────────────────────────────────────────────────

type Gap = {
  n: string;
  title: string;
  problem: string;
  action: string;
  owner: string;
  when: string;
};

const GAPS: Gap[] = [
  {
    n: '01',
    title: 'Hooks',
    problem: 'Hooks are not dialled in. That is the single biggest lever on views right now.',
    action: 'Jacob learns what a good hook looks like, writes hooks, and spends real time on hooks. Not a step in the process. A practice.',
    owner: 'Jacob',
    when: 'Starts Friday',
  },
  {
    n: '02',
    title: 'Long form delegation',
    problem: 'Long form is still sitting too close to the top. It has not been handed over.',
    action: 'Start delegating long form to Jacob, then ramp his output through day 30 to 60.',
    owner: 'Sean + Jacob',
    when: 'Day 30 onward',
  },
  {
    n: '03',
    title: 'Time tracking',
    problem: 'We do not know where his time actually goes, so we cannot tell what is worth doing.',
    action: 'Jacob tracks his time. Then he scores himself on it. How effective has my time been.',
    owner: 'Jacob',
    when: 'Starts day 30',
  },
  {
    n: '04',
    title: 'KPIs checked against his own doc',
    problem: 'KPIs were set and have not been reviewed against reality.',
    action: 'Open his doc together. Go line by line. Ask him: in order to achieve this, how do you feel you are going?',
    owner: 'Sean + Jacob',
    when: 'Content Board 01',
  },
  {
    n: '05',
    title: 'Instagram approvals',
    problem: 'Instagram is going alright. The approval loop is the drag.',
    action: 'Make approvals more efficient. Fewer hops, clearer standard, faster turnaround. Cleared on the Monday call.',
    owner: 'Rhys + Jacob',
    when: 'Day 30 to 60',
  },
  {
    n: '06',
    title: 'Training',
    problem: 'The training needs to be better, and it needs to be weekly.',
    action: 'Two calls a week. Monday sets the week. Friday is training. First session is hooks.',
    owner: 'Sean',
    when: 'This week',
  },
];

// ─── Where Sean can help ────────────────────────────────────────────────

const SUPPORT: Array<{ area: string; detail: string }> = [
  { area: 'Ads', detail: 'Happy to get in and help on the ad side.' },
  { area: 'YouTube', detail: 'Structure, titles, packaging, the long form engine.' },
  { area: 'Lead magnets', detail: 'Structuring the assets themselves.' },
  { area: 'Content around the lead magnets', detail: 'Build the content so the videos package the lead magnets out directly.' },
];

// ─── Who owns what ──────────────────────────────────────────────────────

const OWNERS: Array<{ name: string; lane: string; bullets: string[] }> = [
  {
    name: 'Rhys',
    lane: 'Talent. Final call.',
    bullets: [
      'Show up and film.',
      'Sign off on creative direction and naming.',
      'Approve fast so the loop does not stall.',
      'In the room for the content board.',
    ],
  },
  {
    name: 'Jacob',
    lane: 'Operator. Shoots, edits, publishes.',
    bullets: [
      'Run the shoots and the edits.',
      'Own hooks as a weekly practice.',
      'Take on long form through day 30 to 60.',
      'Track his time and score his own effectiveness.',
      'Bring the numbers to the content board and lead it.',
    ],
  },
  {
    name: 'Sean',
    lane: 'Strategy, training and accountability.',
    bullets: [
      'Monday call. Sets the week.',
      'Friday training. Every week.',
      'Run the monthly content board.',
      'Support on ads, YouTube and lead magnets.',
    ],
  },
];

// ─── Visual components ──────────────────────────────────────────────────

function ProgressMeter() {
  const segments = [
    { label: 'Day 1 to 30', state: 'done' as const },
    { label: 'Day 31 to 60', state: 'next' as const },
    { label: 'Day 61 to 90', state: 'later' as const },
  ];
  return (
    <div className="mt-8">
      <div className="flex gap-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex-1">
            <div
              className={`h-2 rounded-full ${
                s.state === 'done' ? 'bg-blue-500' : s.state === 'next' ? 'bg-zinc-700' : 'bg-zinc-800'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-3">
        {segments.map((s) => (
          <div key={s.label} className="flex-1">
            <p
              className={`text-[11px] uppercase tracking-widest font-semibold ${
                s.state === 'done' ? 'text-blue-400' : 'text-zinc-600'
              }`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/[0.06] px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span className="text-[12px] font-semibold text-blue-300">Day 30 of 90. First third done.</span>
      </div>
    </div>
  );
}

const STATE_STYLES: Record<Phase['state'], { border: string; chip: string; label: string }> = {
  closing: { border: 'border-blue-500/40 bg-blue-500/[0.05]', chip: 'bg-blue-500/15 text-blue-300', label: 'You are here' },
  next: { border: 'border-zinc-800 bg-elevated/40', chip: 'bg-zinc-800 text-zinc-400', label: 'Next' },
  later: { border: 'border-zinc-800 bg-elevated/20', chip: 'bg-zinc-800 text-zinc-500', label: 'Later' },
};

function PhaseCard({ phase }: { phase: Phase }) {
  const s = STATE_STYLES[phase.state];
  return (
    <div className={`rounded-2xl border p-6 md:p-7 ${s.border}`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="font-display text-[14px] font-extrabold text-blue-400">{phase.window}</p>
        <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold ${s.chip}`}>{s.label}</span>
      </div>
      <h3 className="font-display text-[19px] md:text-[21px] font-extrabold text-white leading-tight mb-3">{phase.name}</h3>
      <p className="text-zinc-400 text-[13px] leading-relaxed mb-5">{phase.outcome}</p>
      <Bullets items={phase.items} size="13" />
    </div>
  );
}

const STOP_STYLES: Record<Stop['kind'], { dot: string; ring: string; card: string; badge: string | null }> = {
  gate: {
    dot: 'bg-blue-500',
    ring: 'ring-4 ring-blue-500/20',
    card: 'border-blue-500/40 bg-blue-500/[0.05]',
    badge: 'Gate',
  },
  work: { dot: 'bg-zinc-500', ring: '', card: 'border-zinc-800 bg-elevated/40', badge: null },
  later: { dot: 'bg-zinc-700', ring: '', card: 'border-zinc-800 bg-elevated/20 border-dashed', badge: null },
};

function TimelineStop({ stop, isLast }: { stop: Stop; isLast: boolean }) {
  const s = STOP_STYLES[stop.kind];
  return (
    <div className="relative pl-10 md:pl-14 pb-4">
      {/* rail */}
      {!isLast && <div className="absolute left-[7px] md:left-[11px] top-5 bottom-0 w-px bg-zinc-800" />}
      {/* dot */}
      <div className={`absolute left-0 md:left-1 top-3 w-3.5 h-3.5 rounded-full ${s.dot} ${s.ring}`} />

      <div className={`rounded-2xl border p-5 md:p-6 ${s.card}`}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-display text-[13px] font-extrabold text-blue-400 uppercase tracking-wider">{stop.day}</span>
          {stop.when && (
            <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-semibold text-blue-300">
              {stop.when}
            </span>
          )}
          {s.badge && (
            <span className="rounded-full border border-blue-500/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-semibold text-blue-300">
              {s.badge}
            </span>
          )}
        </div>
        <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white leading-tight mb-4">{stop.title}</h3>
        <Bullets items={stop.items} size="13" />
      </div>
    </div>
  );
}

const STAGE_TONE: Record<Stage['tone'], { bar: string; card: string; text: string; span: string }> = {
  solid: { bar: 'bg-blue-500', card: 'border-blue-500/40 bg-blue-500/[0.05]', text: 'text-blue-400', span: 'text-blue-400' },
  mid: { bar: 'bg-blue-500/40', card: 'border-zinc-800 bg-elevated/40', text: 'text-white', span: 'text-zinc-400' },
  dim: { bar: 'bg-zinc-800', card: 'border-zinc-800 bg-elevated/20 border-dashed', text: 'text-zinc-300', span: 'text-zinc-600' },
};

function HorizonBar() {
  return (
    <div>
      <div className="flex gap-1.5">
        {STAGES.map((s) => (
          <div key={s.key} className={s.weight}>
            <p className={`text-[11px] uppercase tracking-widest font-semibold mb-2 ${STAGE_TONE[s.tone].span}`}>{s.span}</p>
            <div className={`h-2 rounded-full ${STAGE_TONE[s.tone].bar}`} />
            <p className={`font-display text-[16px] md:text-[18px] font-extrabold mt-3 ${STAGE_TONE[s.tone].text}`}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-5 border-t border-zinc-800 pt-3">
        {['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'].map((m, i) => (
          <div key={m} className="flex-1">
            <p className={`text-[10px] font-semibold ${i < 3 ? 'text-blue-400' : 'text-zinc-700'}`}>{m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
      {WEEK.map((day) => {
        const isCall = Boolean(day.call);
        const isActive = Boolean(day.call || day.shoot || day.work);
        return (
          <div
            key={day.d}
            className={`rounded-xl border p-3 md:p-4 min-h-[112px] ${
              isCall ? 'border-blue-500/50 bg-blue-500/[0.08]' : isActive ? 'border-zinc-800 bg-elevated/40' : 'border-zinc-900 bg-elevated/10'
            }`}
          >
            <p className={`font-display text-[14px] font-extrabold mb-3 ${isCall ? 'text-blue-300' : 'text-white'}`}>{day.d}</p>
            {day.call && (
              <div className="mb-2">
                <span className="inline-block rounded bg-blue-500/20 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold text-blue-300 mb-1">
                  Call
                </span>
                <p className="text-blue-200 text-[12px] leading-snug font-semibold">{day.call}</p>
              </div>
            )}
            {day.shoot && <p className="text-zinc-300 text-[12px] leading-snug">{day.shoot}</p>}
            {day.work && <p className="text-zinc-400 text-[12px] leading-snug">{day.work}</p>}
          </div>
        );
      })}
    </div>
  );
}

function BoardLoop() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {BOARD_STEPS.map((s, i) => (
        <div key={s.n} className="relative">
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 md:p-6 h-full">
            <p className="font-display text-[24px] font-extrabold text-blue-500/40 mb-3">{s.n}</p>
            <h3 className="font-display text-[16px] md:text-[17px] font-extrabold text-white leading-tight mb-2">{s.q}</h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{s.detail}</p>
          </div>
          {i < BOARD_STEPS.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-blue-500/60 text-[16px] font-bold">
              &gt;
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

export default function UndeniableMap() {
  return (
    <Shell
      title="The Map · Undeniable"
      description="Where we're at, what we've built, what's missing, and what we do next."
      path="/undeniablenextsteps/map"
    >
      <PageHead
        eyebrow="The reset"
        title="The"
        accent="Map."
        blurb="Where we're at. What we've built. What's missing. What we do next."
      />
      <Divider />

      {/* WHERE WE'RE AT */}
      <Wrap>
        <Eyebrow>Where we're at</Eyebrow>
        <Lead>We rebuilt instead of scaling. Views paid for that. What we got back is a base we can build on.</Lead>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SIGNALS.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border p-5 md:p-6 ${
                s.tone === 'up' ? 'border-blue-500/40 bg-blue-500/[0.05]' : 'border-zinc-800 bg-elevated/40'
              }`}
            >
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">{s.label}</p>
              <p
                className={`font-display text-[28px] md:text-[32px] font-extrabold mb-3 ${
                  s.tone === 'up' ? 'text-blue-400' : 'text-white'
                }`}
              >
                {s.value}
              </p>
              <p className="text-zinc-400 text-[13px] leading-relaxed">{s.read}</p>
            </div>
          ))}
        </div>
        <ProgressMeter />
      </Wrap>

      <Divider />

      {/* WHAT WE'VE DONE */}
      <Wrap>
        <Eyebrow>What we've done</Eyebrow>
        <Lead>What the last stretch bought us.</Lead>
        <div className="space-y-3">
          {DONE.map((d) => (
            <div key={d.head} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 md:px-6 md:py-5">
              <h3 className={`font-display text-[15px] md:text-[16px] font-extrabold text-white ${d.detail ? 'mb-1.5' : ''}`}>{d.head}</h3>
              {d.detail && <p className="text-zinc-400 text-[13px] md:text-[14px] leading-relaxed">{d.detail}</p>}
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* THE PHASE WE'RE IN */}
      <Wrap>
        <Eyebrow>The phase we're in</Eyebrow>
        <Lead>Jacob is 30 days in. Day 30 lands this week. Nothing ramps until we get through it.</Lead>
        <div className="grid gap-3 md:grid-cols-3">
          {PHASES.map((p) => (
            <PhaseCard key={p.window} phase={p} />
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* THE TIMELINE */}
      <Wrap>
        <Eyebrow>The timeline · from here</Eyebrow>
        <Lead>Everything dated between now and day 90. Blue dots are the gates.</Lead>
        <div>
          {TIMELINE.map((s, i) => (
            <TimelineStop key={`${s.day}-${s.title}`} stop={s} isLast={i === TIMELINE.length - 1} />
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-elevated/30 px-5 py-4 md:px-6 md:py-5">
          <SubEyebrow>Running underneath all of it</SubEyebrow>
          <p className="text-zinc-200 text-[14px] leading-relaxed">
            Monday call. Friday training. Mon and Wed short form shoots. Friday long form shoot. Every week, without
            us deciding on it again.
          </p>
        </div>

        <a
          href="/undeniablenextsteps/channels"
          className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-blue-500/40 bg-blue-500/[0.05] hover:bg-blue-500/[0.09] transition-colors px-6 py-5 md:px-7 md:py-6"
        >
          <div>
            <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Which channels</p>
            <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">The Channel Stack</h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed">
              Five channels scored on effort, leverage, habit, trust and cost. What to build, in what order, and what
              to park.
            </p>
          </div>
          <span className="text-blue-400 text-[18px] font-bold flex-shrink-0">&gt;</span>
        </a>
      </Wrap>

      <Divider />

      {/* THE 12 MONTHS */}
      <Wrap>
        <Eyebrow>The 12 months</Eyebrow>
        <Lead>The 90 days is the first quarter. What comes after depends on what it produces.</Lead>

        <HorizonBar />

        <div className="space-y-3 mt-10">
          {STAGES.map((s) => (
            <div key={s.key} className={`rounded-2xl border p-6 md:p-7 ${STAGE_TONE[s.tone].card}`}>
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="font-display text-[20px] md:text-[22px] font-extrabold text-white">{s.label}</h3>
                <span className={`text-[12px] uppercase tracking-widest font-semibold ${STAGE_TONE[s.tone].span}`}>{s.span}</span>
              </div>
              <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed mb-5">{s.outcome}</p>
              <Bullets items={s.items} size="13" />
              {s.status && (
                <p className="text-zinc-500 text-[12px] mt-5 pt-4 border-t border-zinc-800">{s.status}</p>
              )}
            </div>
          ))}
        </div>

        {/* THE UNLOCK GATE */}
        <div className="mt-8 rounded-2xl border border-blue-500/40 bg-blue-500/[0.05] p-6 md:p-8">
          <SubEyebrow>The gate between build and scale</SubEyebrow>
          <h3 className="font-display text-[20px] md:text-[24px] font-extrabold text-white leading-tight mb-3">
            What the 90 days has to produce
          </h3>
          <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed mb-6">
            Scale does not start until these three exist. This is what the 90 days is for.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {UNLOCKS.map((u) => (
              <div key={u.n} className="rounded-xl border border-zinc-800 bg-base/40 p-5">
                <p className="font-display text-[20px] font-extrabold text-blue-500/40 mb-2">{u.n}</p>
                <h4 className="font-display text-[15px] font-extrabold text-white leading-tight mb-2">{u.title}</h4>
                <p className="text-zinc-400 text-[12px] leading-relaxed">{u.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* THE WEEK */}
      <Wrap>
        <Eyebrow>The week</Eyebrow>
        <Lead>Two calls. Three shoots. Blue days are the calls.</Lead>
        <WeekGrid />
        <div className="grid md:grid-cols-2 gap-3 mt-6">
          {CALLS.map((c) => (
            <div key={c.day} className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 md:p-6">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <h3 className="font-display text-[18px] font-extrabold text-white">{c.day}</h3>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-blue-300">{c.name}</span>
              </div>
              <p className="text-zinc-500 text-[12px] mb-4">{c.who}</p>
              <Bullets items={c.agenda} size="13" />
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* THE CONTENT BOARD */}
      <Wrap>
        <Eyebrow>The content board</Eyebrow>
        <Lead>Monthly, in its own slot. Jacob runs it and brings the numbers. First one is this week.</Lead>

        <BoardLoop />

        <div className="grid md:grid-cols-2 gap-3 mt-6">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
            <SubEyebrow>What Jacob brings</SubEyebrow>
            <Bullets items={BOARD_BRING} size="13" />
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
            <SubEyebrow>When it runs</SubEyebrow>
            <div className="space-y-3">
              {[
                { n: 'Board 01', when: 'Day 30 · this week', extra: 'Plus the KPI review. Open his own doc, line by line, and ask him how he feels he is going.' },
                { n: 'Board 02', when: 'Day 60', extra: 'Sets the day 61 to 90 plan.' },
                { n: 'Board 03', when: 'Day 90', extra: 'Full review against the KPIs he was given on day one.' },
              ].map((b) => (
                <div key={b.n} className="rounded-xl border border-zinc-800 bg-base/40 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <p className="font-display text-[14px] font-extrabold text-white">{b.n}</p>
                    <p className="text-[11px] font-semibold text-blue-300">{b.when}</p>
                  </div>
                  <p className="text-zinc-400 text-[12px] leading-relaxed">{b.extra}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* THE GAPS */}
      <Wrap>
        <Eyebrow>The gaps</Eyebrow>
        <Lead>Six things that are missing right now. Each one has an action, an owner and a start.</Lead>
        <div className="space-y-3">
          {GAPS.map((g) => (
            <div key={g.n} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-[13px] font-extrabold text-zinc-600">{g.n}</span>
                <h3 className="font-display text-[17px] md:text-[19px] font-extrabold text-white">{g.title}</h3>
              </div>
              <p className="text-zinc-400 text-[13px] md:text-[14px] leading-relaxed mb-3">{g.problem}</p>
              <p className="text-zinc-200 text-[14px] md:text-[15px] leading-relaxed mb-4">{g.action}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/[0.06] px-3 py-1 text-[11px] font-semibold text-blue-300">
                  {g.owner}
                </span>
                <span className="rounded-full border border-zinc-800 bg-elevated/60 px-3 py-1 text-[11px] font-semibold text-zinc-400">
                  {g.when}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* FRIDAY TRAINING */}
      <Wrap>
        <Eyebrow>Friday training</Eyebrow>
        <Lead>One topic a week, picked from what the work needs next.</Lead>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
            <SubEyebrow>How it runs</SubEyebrow>
            <Bullets
              items={[
                'Friday morning. Every week from here.',
                'One topic per session.',
                'We break it down live. What is working, what is not, and what we change.',
                'Jacob leaves with something he applies on Monday.',
              ]}
            />
          </div>

          <div className="rounded-2xl border border-blue-500/40 bg-blue-500/[0.05] p-6 md:p-7">
            <SubEyebrow>The lenses we look through</SubEyebrow>
            <div className="flex flex-wrap gap-2 mb-5">
              {['Psychographics', 'Brand', 'Content', 'Formats', 'Direction'].map((lens) => (
                <span
                  key={lens}
                  className="rounded-lg border border-blue-500/25 bg-blue-500/[0.07] px-3 py-1.5 text-[12.5px] font-semibold text-blue-200"
                >
                  {lens}
                </span>
              ))}
            </div>
            <p className="text-zinc-400 text-[13px] leading-relaxed">
              Not a fixed list. The topic each week comes from whatever is holding the output back, looked at through
              whichever of these it sits under.
            </p>
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* WHERE SEAN CAN HELP */}
      <Wrap>
        <Eyebrow>Where I can help</Eyebrow>
        <Lead>Where I will get in directly.</Lead>
        <div className="grid md:grid-cols-2 gap-3">
          {SUPPORT.map((s) => (
            <div key={s.area} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4">
              <h3 className="font-display text-[16px] font-extrabold text-white mb-1">{s.area}</h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* WHO OWNS WHAT */}
      <Wrap>
        <Eyebrow>Who owns what</Eyebrow>
        <Lead>Updated for the current team.</Lead>
        <div className="space-y-4">
          {OWNERS.map((o) => (
            <div key={o.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">{o.name}</h3>
              <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-4">{o.lane}</p>
              <ul className="space-y-2">
                {o.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[14px] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
