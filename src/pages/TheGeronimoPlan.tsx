import React from 'react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, Note, H2, Block, BulletList, Section, Tabs } from '../components/undeniable/Bits';

// ─── Scorecard ───────────────────────────────────────────────────────────

type Score = { name: string; score: number; label: string; note: string };

const SCORES: Score[] = [
  {
    name: 'Clarity',
    score: 2,
    label: '2 / 5',
    note: 'Someone lands on the profile and cannot tell what TGA does. They see events and spread. No clear path to who we are and how to work with us.',
  },
  {
    name: 'Visibility',
    score: 4,
    label: '4 / 5',
    note: 'Not the constraint. Ads can inflate this on demand. Strong on short form, softer everywhere else.',
  },
  {
    name: 'Authority',
    score: 3,
    label: '3 / 5',
    note: 'Named frameworks and unique principles are the gap. Very little "this is the TGA way" content exists. Authority cannot outrun a clarity of 2.',
  },
  {
    name: 'Quality',
    score: 4,
    label: '4 / 5',
    note: 'Leads arrive pre sold and ready to buy. Hard to attribute between the podcast, YouTube and the live events, but the assets are doing their job.',
  },
];

function Scores({ items }: { items: Score[] }) {
  return (
    <div className="border-t border-zinc-800">
      {items.map((s) => (
        <div key={s.name} className="border-b border-zinc-800/70 py-5">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <p className="font-display text-[17px] font-extrabold text-white">{s.name}</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-2 w-7 rounded-sm ${n <= s.score ? 'bg-blue-500' : 'bg-zinc-800'}`}
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-[12px] tabular-nums whitespace-nowrap">{s.label}</span>
            </div>
          </div>
          <p className="text-zinc-400 text-[14px] leading-relaxed">{s.note}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Status rows ─────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  Proven: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  Flagship: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Test: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Revive: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Batch: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Parked: 'bg-zinc-800 text-zinc-400 border-zinc-700',
};

function Status({ s }: { s: keyof typeof STATUS_COLOR }) {
  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold rounded-full border px-2.5 py-0.5 ${STATUS_COLOR[s]}`}>
      {s}
    </span>
  );
}

type Row = { name: string; status: keyof typeof STATUS_COLOR; detail: string };

function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="grid gap-3">
      {rows.map((r) => (
        <div key={r.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
            <p className="font-display text-[16px] font-extrabold text-white">{r.name}</p>
            <Status s={r.status} />
          </div>
          <p className="text-zinc-300 text-[14px] leading-relaxed">{r.detail}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Card grid ───────────────────────────────────────────────────────────

function Cards({ items, cols = 2 }: { items: Array<{ title: string; body: string }>; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((c) => (
        <div key={c.title} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
          <p className="font-display text-[15px] font-extrabold text-white mb-2">{c.title}</p>
          <p className="text-zinc-400 text-[14px] leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Lanes table ─────────────────────────────────────────────────────────

type Lane = { who: string; count: string; lane: string; note: string };

const LANES: Lane[] = [
  {
    who: 'Doza',
    count: '4',
    lane: '2x direct to camera, one with a visual behind and one without. Series episode. Capture from calls.',
    note: 'Wants to be the talent, not the creator. Answers questions far better off camera than to a lens. Can batch several direct to cameras in one sitting and layer graphics later.',
  },
  {
    who: 'Ryan',
    count: '3',
    lane: 'Show and tell with the tool. Mystery shop. Coaching call Q&A.',
    note: 'Expertise is tool set and skill set. Clients love his passion. Better with someone directing than alone. A monthly two hour shoot plus office hours capture on Fridays.',
  },
  {
    who: 'Sophie',
    count: '3',
    lane: 'Direct to camera on belief and reframes. Pop quiz. Coaching call Q&A.',
    note: 'The only formally qualified coach on the team. Strength is going a level deeper, breaking beliefs and reframing on live calls. Weekly prompt: three things everyone needs to hear right now, or the belief you broke this week.',
  },
  {
    who: 'Billy',
    count: '-',
    lane: 'Capture on the ground. Sophie office hours container.',
    note: 'Sits in on the calls with Doza. The stuff between calls is where the content ideas come from. Joins the weekly media meeting.',
  },
  {
    who: 'Freelance shooter',
    count: '-',
    lane: 'Two hours, once or twice a month.',
    note: 'Turns up for the Ryan call block, captures the Q&A, picks the good questions live, then shoots two mystery shops in the same visit. Produces, exports, sends back.',
  },
];

function LaneTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full min-w-[46rem] text-left">
        <thead>
          <tr className="bg-elevated/60">
            {['Person', 'Weekly', 'Their lane', 'Notes from the room'].map((h) => (
              <th key={h} className="px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-500 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LANES.map((l) => (
            <tr key={l.who} className="border-t border-zinc-800/70 align-top">
              <td className="px-4 py-4 font-display text-[15px] font-extrabold text-white whitespace-nowrap">{l.who}</td>
              <td className="px-4 py-4 text-blue-400 text-[15px] font-semibold tabular-nums">{l.count}</td>
              <td className="px-4 py-4 text-zinc-300 text-[13px] leading-relaxed max-w-[16rem]">{l.lane}</td>
              <td className="px-4 py-4 text-zinc-400 text-[13px] leading-relaxed">{l.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Production week ─────────────────────────────────────────────────────

const WEEK = [
  { day: 'Monday', title: 'Ideas in', body: 'Everyone submits ideas through a simple form, so they get approved or killed before Tuesday.' },
  { day: 'Tuesday', title: 'Media meeting', body: 'Straight after the MDS call while the material is hot. Ideas pulled up one by one. You have got X, Y, Z, tell me about that.' },
  { day: 'Wednesday', title: 'Deliberate gap', body: 'A day in between, on purpose. Room to change a weak idea rather than shoot it because it is on the sheet.' },
  { day: 'Thursday', title: 'Shoot day', body: 'Roughly two hours. Shoots what was approved, and it is for the week after. Never for Monday.' },
  { day: 'Monthly', title: 'Content forward', body: 'What actually worked, did we hit the KPIs, what changes. A separate meeting so the weekly never gets interrupted.' },
];

function WeekFlow() {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {WEEK.map((d) => (
        <div key={d.day} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5 border-t-2 border-t-blue-500/60">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">{d.day}</p>
          <p className="font-display text-[15px] font-extrabold text-white mb-2">{d.title}</p>
          <p className="text-zinc-400 text-[13px] leading-relaxed">{d.body}</p>
        </div>
      ))}
    </div>
  );
}

// ─── The shoot card ──────────────────────────────────────────────────────
// Built entirely from Geronimo's own six types, lanes and responsibilities.
// `structure` is verbatim where the room produced one. Everything left as an
// empty string renders as a visible gap rather than a guess. Do not fill these
// from another client's material.

type TypeSpec = {
  beats: string[];
  frameworks: string[];
  hooks: Array<{ n: string; p: string }>;
};

const TYPE_SPEC: Record<string, TypeSpec> = {
  Story: {
    beats: ['Text hook', 'Spoken hook', 'What happened', 'The cost', 'The shift', 'Payoff'],
    frameworks: [
      'Old me vs new me. Who I was, the breaking point, who I became.',
      'Old self, friction, realisation, new self, invitation.',
      'Situation, reaction, insight, new perspective, application.',
    ],
    hooks: [
      { n: 'Vulnerability anchor', p: 'Open on a specific personal moment that signals you are confessing, not performing.' },
      { n: 'Curiosity object', p: 'Reference something specific but do not reveal it yet.' },
      { n: 'Right of passage normaliser', p: 'Name the pain, then normalise it as a stage rather than a failure.' },
    ],
  },
  Belief: {
    beats: ['Text hook', 'Spoken hook', 'Common belief and why it exists', 'Your belief, blame removed', 'Proof', 'Payoff'],
    frameworks: [
      'Common belief, contradiction, explanation, new conclusion.',
      'Accepted rule, why it exists, why it fails, better rule.',
    ],
    hooks: [
      { n: 'Contrarian reversal', p: 'State the conventional wisdom, then immediately invert it.' },
      { n: 'Everybody says dismantle', p: 'Start with what the mainstream repeats, then reveal what they are missing.' },
      { n: 'Philosophical statement', p: 'A standalone belief, delivered like a thesis.' },
    ],
  },
  Teach: {
    beats: ['Text hook', 'Spoken hook', 'The core issue', 'The steps', 'Payoff'],
    frameworks: [
      'Belief, cost, truth, application.',
      'Hook, problem, steps, reward.',
      'Goal, current effort, bottleneck, lever, reallocation.',
    ],
    hooks: [
      { n: 'Provocative diagnostic question', p: 'Ask a question that forces self identification.' },
      { n: 'Data and authority pre load', p: 'Lead with a specific number that earns the right to teach.' },
      { n: 'Nobody told me insider', p: 'Frame the insight as gatekept or hard won.' },
    ],
  },
  Show: {
    beats: ['Text hook', 'Spoken hook', 'The problem in their words', 'Draw it or do the maths', 'What it means', 'Payoff'],
    frameworks: [
      'Input, process, output.',
      'Situation, options, choice.',
      'Constraint, ignore, do.',
    ],
    hooks: [
      { n: 'Let me show you promise', p: 'Skip the setup entirely. Just promise the walkthrough.' },
      { n: 'Curiosity object', p: 'Reference something specific but do not reveal it yet.' },
      { n: 'Data and authority pre load', p: 'Lead with a specific number that earns the right to teach.' },
    ],
  },
};

type ShootRow = { id: Kind; who: string; types: string[]; run: string[]; shot: string };

const SHOOT_CARD: ShootRow[] = [
  {
    id: 'directcam',
    who: 'Doza ×2, Sophie ×1',
    types: ['Belief'],
    shot: 'Handheld with a little motion. Three sentences at a time. One with a visual behind the head, one without.',
    run: [
      'Pick one belief a studio owner holds that is costing them money.',
      'Burn the text hook on screen. Under seven words. Do not give the answer away.',
      'First line to camera. No bullshit, rip into it.',
      'Say their belief back to them, and why it exists.',
      'Flip it, and take the blame off them.',
      'One proof. A number, a client, something you have watched happen.',
      'Land it back on the hook.',
    ],
  },
  {
    id: 'mystery',
    who: 'Doza ×1, Ryan ×1',
    types: ['Show'],
    shot: 'Zero setup. Anyone can run it. Batch it into whatever shoot is already happening.',
    run: [
      'Decide the one thing you are testing them on before you dial.',
      'Text hook on screen while it rings.',
      'Dial, and let the call run. Do not narrate over the top of it.',
      'Mark the moment it goes wrong.',
      'Cut back to camera. What should have happened instead.',
      'Payoff. What that one moment costs a studio.',
    ],
  },
  {
    id: 'coaching',
    who: 'Ryan ×1, Sophie ×1',
    types: ['Teach'],
    shot: 'Captured off a call that is happening anyway. Two cameras where possible.',
    run: [
      'Flag the question live on the call so it can be found later.',
      'Repeat the question so it stands on its own without the call around it.',
      'Set the frame. Who this applies to, and what it is costing them.',
      'Answer in steps. One step per line.',
      'Payoff, back to the question that started it.',
    ],
  },
  {
    id: 'show',
    who: 'Ryan ×1',
    types: ['Show'],
    shot: 'Light, and something genuinely happening on screen.',
    run: [
      'Have the tool open and the screen ready before you roll.',
      'Text hook on screen.',
      'What it is, in one line.',
      'What it does for you.',
      'How to use it, actually doing it on screen.',
      'Why it is different from how they do it now.',
    ],
  },
  {
    id: 'popquiz',
    who: 'Sophie ×1',
    types: ['Show'],
    shot: 'The call is the capture. Same setup as a mystery shop.',
    run: [
      'Pick the KPI or the standard you are testing.',
      'Text hook on screen.',
      'Call our own client or their manager and ask it cold.',
      'Let the answer land, good or bad. Do not rescue it.',
      'Say what a good answer sounds like.',
      'Payoff. What that answer signals about standards.',
    ],
  },
  {
    id: 'series',
    who: 'Doza ×1',
    types: ['Story'],
    shot: 'Doza fronts it. Fed by the new 12 week room.',
    run: [
      'Open on the number. Total revenue under management.',
      'What changed this week.',
      'What they actually did to change it.',
      'What it cost them, or nearly cost them.',
      'The shift. What they understand now that they did not.',
      'Payoff, and the number again.',
    ],
  },
];

function ShootCard() {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <div className="grid gap-3">
      {SHOOT_CARD.map((r) => {
        const k = KIND[r.id];
        const isOpen = open === r.id;
        const spec = TYPE_SPEC[r.types[0]];
        return (
          <div key={r.id} className="rounded-xl border border-zinc-800 bg-elevated/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : r.id)}
              className="w-full text-left p-5 hover:bg-elevated/70 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${k.dot}`} />
                <p className="font-display text-[15px] font-extrabold text-white">{k.label}</p>
                <span className="ml-auto text-zinc-500 text-[12px] tabular-nums">×{k.count}</span>
                <span className={`text-zinc-500 text-[20px] leading-none transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </div>
              <p className="text-zinc-400 text-[13px] leading-relaxed mb-3">{k.note}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
                <span className="text-zinc-500">{r.who}</span>
                <span className="text-blue-400 font-medium">{r.types[0]}</span>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 pt-1 border-t border-zinc-800/70 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-3">How to run it</p>
                  <ol className="space-y-2.5">
                    {r.run.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-400 text-[12px] font-semibold tabular-nums pt-0.5 w-4 flex-shrink-0">{i + 1}</span>
                        <span className="text-zinc-300 text-[13px] leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mt-5 mb-2">How it is shot</p>
                  <p className="text-zinc-400 text-[13px] leading-relaxed">{r.shot}</p>
                </div>

                <div>
                  {spec && (
                    <>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">Or pick one of these structures</p>
                      <ul className="space-y-2 mb-5">
                        {spec.frameworks.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <span className="text-zinc-300 text-[13px] leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">Hook types that suit it</p>
                      <ul className="space-y-2">
                        {spec.hooks.map((h) => (
                          <li key={h.n} className="text-[13px] leading-relaxed">
                            <span className="text-white font-semibold">{h.n}.</span>{' '}
                            <span className="text-zinc-400">{h.p}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Training library ────────────────────────────────────────────────────
// Generic walkthroughs, shared across clients. Same set as the Double Triple
// portal in ~/brand-day. If a Loom is replaced, update it in both places.

type Walkthrough = { kicker: string; title: string; href: string };

const SHORT_FORM_TRAINING: Walkthrough[] = [
  { kicker: 'Writing hooks', title: 'Hooks', href: 'https://www.loom.com/share/6aa844f797d24369a1f8aa957b6dabd9' },
  { kicker: 'Hooks and scripting', title: 'Short Form System, Hooks, and Belief Breakers', href: 'https://www.loom.com/share/ed88e84dbdcd452d8f98c6c29395cabc' },
  { kicker: 'Writing short form stories', title: 'Roughen Your Script For Better Reels', href: 'https://www.loom.com/share/527263a2bea34f729ac7b8a3d3e55690' },
  { kicker: 'Environments', title: 'How to Rotate Instagram Content Environments', href: 'https://www.loom.com/share/71287d4f2ae64d9b9e9e5b55c4597932' },
  { kicker: 'Running a shoot', title: 'Directing Founder Content, Simplify Shoots', href: 'https://www.loom.com/share/708f78a13a4348798d6d722ee769128e' },
  { kicker: 'Formats and examples of good', title: 'Ideation vs Excavation for Client Content', href: 'https://www.loom.com/share/e062e6cc92f84cc4955901130b9613ba' },
];

const LONG_FORM_TRAINING: Walkthrough[] = [
  { kicker: 'The complete overview', title: 'YouTube Long Form Belief Mapping System', href: 'https://www.loom.com/share/482bc4f770dd42eca5b4b0644e8cc489' },
  { kicker: 'Thumbnail building', title: 'How to Craft High Converting Thumbnails', href: 'https://www.loom.com/share/f3e49c20bcfe42b0a00b0145bd4f53e7' },
  { kicker: 'Designing thumbnails', title: 'How to Design Winning YouTube Thumbnails', href: 'https://www.loom.com/share/fadca4dd435843c2905f5c9c697381f8' },
  { kicker: 'Introduction builder', title: 'Introduction walkthrough', href: 'https://www.loom.com/share/9369cc661294484987a37319030ac5a5' },
];

function Walkthroughs({ items }: { items: Walkthrough[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((w) => (
        <a
          key={w.href}
          href={w.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-zinc-800 bg-elevated/40 p-5 transition-colors hover:border-zinc-700 hover:bg-elevated/70"
        >
          <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-2">{w.kicker}</p>
          <p className="font-display text-[15px] font-extrabold text-white leading-snug mb-3">{w.title}</p>
          <span className="text-zinc-500 text-[13px] group-hover:text-blue-400 transition-colors">Watch</span>
        </a>
      ))}
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────

type TabDef = { id: string; label: string; blurb: string; sections: Array<{ id: string; label: string }> };

const TABS: TabDef[] = [
  {
    id: 'start',
    label: 'Start here',
    blurb: 'Where we sit today, then the four weeks. Every person has one job.',
    sections: [
      { id: 'scores', label: 'Diagnosis' },
      { id: 'w1', label: 'Week 1' },
      { id: 'w2', label: 'Week 2' },
      { id: 'w3', label: 'Week 3' },
      { id: 'w4', label: 'Week 4' },
      { id: 'order', label: 'Why the order' },
      { id: 'today', label: 'Today' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    blurb: 'The two brands and the job each one does. What is working, what is hard, and the principles underneath every format decision.',
    sections: [
      { id: 'brands', label: 'The Brands' },
      { id: 'workhard', label: 'Good vs Bad' },
      { id: 'principles', label: 'Principles' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    blurb: 'Capture and Create, the format library, the series, and the week they get slotted into.',
    sections: [
      { id: 'capture', label: 'Capture / Create' },
      { id: 'formats', label: 'Formats' },
      { id: 'series', label: 'Series' },
      { id: 'schedule', label: 'The schedule' },
    ],
  },
  {
    id: 'production',
    label: 'Production',
    blurb: 'How it gets made and out the door. The pipeline, the lanes, the weekly rhythm, and the assets that sit outside the ten.',
    sections: [
      { id: 'flow', label: 'Pipeline' },
      { id: 'cadence', label: 'Ten a week' },
      { id: 'lanes', label: 'Lanes' },
      { id: 'rhythm', label: 'Rhythm' },
      { id: 'assets', label: 'Assets' },
    ],
  },
  {
    id: 'make',
    label: 'How to make it',
    blurb: 'The craft behind the plan. The walkthroughs your team learns from, and the system underneath all of it.',
    sections: [
      { id: 'shootcard', label: 'The shoot card' },
      { id: 'script', label: 'The script system' },
      { id: 'training', label: 'The training' },
      { id: 'system', label: 'The system' },
    ],
  },
  {
    id: 'commit',
    label: 'Next steps',
    blurb: 'Who owns what, what is locked for four weeks, what is deliberately still open, and what could quietly kill it.',
    sections: [
      { id: 'next', label: 'Responsibilities' },
      { id: 'locked', label: 'Locked' },
      { id: 'open', label: 'Open' },
      { id: 'risks', label: 'Risks' },
    ],
  },
];

const SECTION_TAB: Record<string, string> = Object.fromEntries(
  TABS.flatMap((t) => t.sections.map((s) => [s.id, t.id])),
);

function scrollToNav() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function usePlanNav() {
  const [sec, setSec] = React.useState<string>(() => {
    if (typeof window === 'undefined') return 'scores';
    const s = new URLSearchParams(window.location.search).get('s');
    if (s && SECTION_TAB[s]) return s;
    const t = new URLSearchParams(window.location.search).get('t');
    const found = TABS.find((x) => x.id === t);
    return found ? found.sections[0].id : 'scores';
  });

  const tab = SECTION_TAB[sec] ?? 'start';

  const write = React.useCallback((nextSec: string) => {
    setSec(nextSec);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('t', SECTION_TAB[nextSec]);
    url.searchParams.set('s', nextSec);
    window.history.replaceState({}, '', url);
    scrollToNav();
  }, []);

  // Clicking a top tab lands on its first section.
  const changeTab = React.useCallback(
    (id: string) => {
      const found = TABS.find((x) => x.id === id);
      if (found) write(found.sections[0].id);
    },
    [write],
  );

  return { tab, sec, changeTab, changeSec: write };
}

// ─── Start here ──────────────────────────────────────────────────────────

type Week = {
  id: string;
  chip: string;
  output: string;
  headline: string;
  frame: string;
  jobs: Array<{ who: string; job: string }>;
  close: string;
};

const WEEKS: Week[] = [
  {
    id: 'w1',
    chip: 'Week 1',
    output: 'Five',
    headline: 'Five pieces. One a day.',
    frame: 'Five is the whole target. The week is about clearing the backlog and getting the rhythm in. Who fills the five gets decided at Tuesday.',
    jobs: [
      { who: 'Doza', job: 'Batch direct to cameras in one sitting. Graphics get layered on afterwards.' },
      { who: 'Head of content', job: 'Book the Tuesday media meeting and the Thursday shoot. Build the idea submission form so ideas arrive by Monday. Allocate the five.' },
      { who: 'Ryan', job: 'Bring three things you are excited about to Tuesday, for show and tell. Flag your monthly office visit dates.' },
      { who: 'Sophie', job: 'Nominate one weekly office hours block as your capture container. You are doing the call anyway.' },
      { who: 'Billy', job: 'Sit in on the calls. Flag the good moments live, at the source, rather than hunting for them afterwards.' },
      { who: 'Strategist', job: 'Turn the board into stencils, one per format. Source a freelance shooter.' },
    ],
    close: '',
  },
  {
    id: 'w2',
    chip: 'Week 2',
    output: 'Ten',
    headline: 'Step up to ten. Two a day.',
    frame: 'The full split kicks in. Doza 4, Ryan 3, Sophie 3, Monday to Friday, weekends off.',
    jobs: [
      { who: 'Doza', job: 'Four pieces. Two direct to camera, one with a visual behind and one without. Plus a series episode.' },
      { who: 'Ryan', job: 'Three pieces. Show and tell with the tool, a mystery shop, and a coaching call Q&A.' },
      { who: 'Sophie', job: 'Three pieces. Direct to camera on belief and reframes, a pop quiz, and a coaching call Q&A.' },
      { who: 'Head of content', job: 'Hold the Tuesday and Thursday rhythm. Rework the testimonial and ad structure around association, Doza plus coach in frame before the client.' },
      { who: 'Strategist', job: 'Weekly jam with Billy. Sits in on the media jam when possible.' },
    ],
    close: 'We want to aim for a two week buffer between shoot & publish.',
  },
  {
    id: 'w3',
    chip: 'Week 3',
    output: 'Ten',
    headline: 'Hold ten. Re-cut to strengths.',
    frame: 'Two weeks in it is obvious who is better at what. Reallocate slots, then start testing the things we deliberately left open.',
    jobs: [
      { who: 'Head of content', job: 'Reallocate the ten to strengths.' },
      { who: 'Strategist + Doza', job: 'Hook test. Five trial reels on Under Management before a single episode gets built.' },
      { who: 'Ryan', job: 'Freelance shooter visit. Two hours. Q&A capture plus two mystery shops in the same trip.' },
      { who: 'Sophie', job: 'Run the pop quiz against the mystery shop. Are they different enough to run both.' },
      { who: 'Doza', job: 'One direct to camera with a visual behind, one without. Compare them properly.' },
    ],
    close: '',
  },
  {
    id: 'w4',
    chip: 'Week 4',
    output: 'Read it',
    headline: 'Read the cycle. Then go again.',
    frame: 'Monthly Media Monday. Three measures, one question, then the next four weeks get set.',
    jobs: [
      { who: 'Ease', job: 'How simple was it to run. Where did it feel heavy, and what took more effort than it should have.' },
      { who: 'Energy', job: 'How the team felt doing it. Drag or momentum. A system nobody wants to run is not a system.' },
      { who: 'Output', job: 'The data. Did the ten go out. Where were the bottlenecks, and what did we learn.' },
      { who: 'Decide', job: 'Which formats become the locked rotation and which die. Resist adding a new one until the foundation holds.' },
      { who: 'Still open', job: 'Clarity is a 2 and it still has no owner, no fix and no date. It is the highest value loose end in the plan.' },
    ],
    close: 'Four weeks is the cycle. Change what the data tells you to change, then go again.',
  },
];

function FourWeeks({ wk, onWeek, onJump }: { wk: string; onWeek: (id: string) => void; onJump: (sec: string) => void }) {
  const week = WEEKS.find((w) => w.id === wk) ?? WEEKS[0];

  return (
    <section className="py-12 md:py-14">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Section>
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-7 md:p-9">
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Start here</p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
              Four weeks. One job each.
            </h2>
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-7 max-w-2xl">
              Every person has one job. Billy is head of content.
            </p>

            {/* the four weeks */}
            <div className="grid grid-cols-4 gap-1.5 mb-7">
              {WEEKS.map((w) => {
                const on = w.id === wk;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onWeek(w.id)}
                    className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                      on ? 'border-blue-500/50 bg-blue-500/10' : 'border-zinc-800 bg-base/50 hover:border-zinc-700'
                    }`}
                  >
                    <span className={`block text-[10px] uppercase tracking-widest font-semibold mb-1 ${on ? 'text-blue-400' : 'text-zinc-500'}`}>
                      {w.chip}
                    </span>
                    <span className={`block font-display text-[15px] md:text-[17px] font-extrabold ${on ? 'text-white' : 'text-zinc-400'}`}>
                      {w.output}
                    </span>
                  </button>
                );
              })}
            </div>

            <h3 className="font-display text-[19px] md:text-[21px] font-extrabold text-white mb-2">{week.headline}</h3>
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-6 max-w-2xl">{week.frame}</p>

            <div className="grid gap-2.5">
              {week.jobs.map((j) => (
                <div key={j.who} className="grid sm:grid-cols-[10.5rem_1fr] gap-1 sm:gap-4 rounded-xl border border-zinc-800 bg-base/60 px-5 py-4">
                  <p className="font-display text-[13px] font-extrabold text-white uppercase tracking-wide">{j.who}</p>
                  <p className="text-zinc-300 text-[14px] leading-relaxed">{j.job}</p>
                </div>
              ))}
            </div>

            {week.close && <p className="text-zinc-400 text-[14px] leading-relaxed mt-5 italic">{week.close}</p>}

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-white text-[15px] font-medium">
                The measure: <span className="text-blue-400">a minimum of five posts a week.</span>
              </p>
              <button
                type="button"
                onClick={() => onJump('cadence')}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-elevated/60 px-5 py-2.5 text-[13px] font-semibold text-zinc-200 hover:border-blue-500/50 hover:text-white transition-colors"
              >
                See the cadence
              </button>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── The weekly schedule, off the board ──────────────────────────────────

type Kind = 'directcam' | 'mystery' | 'popquiz' | 'show' | 'series' | 'coaching';

const KIND: Record<Kind, { label: string; dot: string; text: string; count: number; note: string }> = {
  directcam: {
    label: 'Direct to camera',
    dot: 'bg-violet-400',
    text: 'text-violet-300',
    count: 3,
    note: 'Handheld with a little motion, three sentences at a time. One with a visual behind the head, one without.',
  },
  mystery: {
    label: 'Mystery shop',
    dot: 'bg-teal-400',
    text: 'text-teal-300',
    count: 2,
    note: 'Call a studio and shop them live. Zero setup, anyone can run it, batch it into whatever shoot is already happening.',
  },
  popquiz: {
    label: 'Pop quiz',
    dot: 'bg-sky-400',
    text: 'text-sky-300',
    count: 1,
    note: 'Call our own clients and their managers and quiz them on KPIs and standards. What it signals is standards.',
  },
  show: {
    label: 'Show',
    dot: 'bg-rose-400',
    text: 'text-rose-300',
    count: 1,
    note: 'Walk through a tool live. Light and something genuinely happening on screen. What it is, what it does for you, how to use it, why it is different.',
  },
  series: {
    label: 'Series',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    count: 1,
    note: 'The flagship episode. Total revenue under management as the headline number and the storyline. Fed by the new 12 week room. Doza fronts it.',
  },
  coaching: {
    label: 'Coaching',
    dot: 'bg-zinc-400',
    text: 'text-zinc-300',
    count: 2,
    note: 'Captured off a call that is happening anyway. Repeat the question, set the frame, then answer. Two cameras where possible.',
  },
};

const WHO: Record<string, { mark: string; total: number }> = {
  Doza: { mark: '✕', total: 4 },
  Ryan: { mark: '△', total: 3 },
  Sophie: { mark: '○', total: 3 },
};

type Slot = { who: keyof typeof WHO; kind: Kind };

const SCHEDULE: Array<{ day: string; slots: Slot[] }> = [
  { day: 'Mon', slots: [{ who: 'Doza', kind: 'directcam' }, { who: 'Sophie', kind: 'coaching' }] },
  { day: 'Tue', slots: [{ who: 'Ryan', kind: 'mystery' }, { who: 'Doza', kind: 'directcam' }] },
  { day: 'Wed', slots: [{ who: 'Sophie', kind: 'directcam' }, { who: 'Ryan', kind: 'coaching' }] },
  { day: 'Thu', slots: [{ who: 'Doza', kind: 'series' }, { who: 'Sophie', kind: 'popquiz' }] },
  { day: 'Fri', slots: [{ who: 'Doza', kind: 'mystery' }, { who: 'Ryan', kind: 'show' }] },
];

function ScheduleGrid() {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="grid grid-cols-5 gap-2 min-w-[34rem]">
        {SCHEDULE.map((d) => (
          <div key={d.day} className="rounded-xl border border-zinc-800 bg-elevated/40 overflow-hidden">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 px-3 py-2.5 border-b border-zinc-800 bg-base/40">
              {d.day}
            </p>
            <div className="p-2.5 space-y-2">
              {d.slots.map((s, i) => {
                const k = KIND[s.kind];
                return (
                  <div key={i} className="rounded-lg bg-base/60 px-3 py-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${k.dot}`} />
                      <span className="font-display text-[13px] font-extrabold text-white">{s.who}</span>
                      <span className="text-zinc-600 text-[12px] ml-auto">{WHO[s.who].mark}</span>
                    </div>
                    <p className={`text-[12px] leading-snug font-medium ${k.text}`}>{k.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleLegend() {
  return (
    <div className="grid gap-2.5 md:grid-cols-2">
      {(Object.keys(KIND) as Kind[]).map((id) => {
        const k = KIND[id];
        return (
          <div key={id} className="rounded-xl border border-zinc-800 bg-elevated/40 p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${k.dot}`} />
              <p className="font-display text-[14px] font-extrabold text-white">{k.label}</p>
              <span className="ml-auto text-zinc-500 text-[12px] tabular-nums">×{k.count}</span>
            </div>
            <p className="text-zinc-400 text-[13px] leading-relaxed">{k.note}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── The production pipeline ─────────────────────────────────────────────

type Stage = { n: string; name: string; owner: string; support?: string; reqs: string[] };

const PIPELINE: Stage[] = [
  {
    n: '01',
    name: 'Idea',
    owner: 'Sophie, Ryan, Doza',
    support: 'The coach owns the idea for their own lane',
    reqs: [
      'Ideas in by Monday through the form, so they can be approved or killed before Tuesday.',
      'Everyone brings their three. Ryan three things he is excited about, Sophie three beliefs to break, Doza the ideas that came out of calls.',
      'Ranked at the Tuesday meeting on effort against leverage. Low effort and high leverage ships immediately, everything else is cut or parked.',  // gate-ok: the room's own words, effort against leverage
      'Nobody invents a concept the night before a shoot because something has to go out.',
    ],
  },
  {
    n: '02',
    name: 'Pre production',
    owner: 'Doza',
    support: 'Billy on hook, concept and structure',
    reqs: [
      'The hook is written before the shoot, not hunted for afterwards.',
      'The concept and the framework are decided, so the shoot is execution and nothing else.',
      'A stencil per format. Structure, not scripts.',
      'A 10 minute pre shoot check the day before. Is everyone prepped for tomorrow.',
    ],
  },
  {
    n: '03',
    name: 'Production',
    owner: 'Operator',
    support: 'Billy',
    reqs: [
      'Thursday, roughly two hours. It shoots what was approved on Tuesday.',
      'Shoots for the week after. Never for Monday.',
      'Two cameras wherever possible, one close and one wide.',
      'The operator turns up, shoots, exports and sends it back. Nothing lands on the team.',
    ],
  },
  {
    n: '04',
    name: 'Post production',
    owner: 'Billy',
    support: 'Clipper, overseas, for volume',
    reqs: [
      'Good moments are flagged live at the source. Nobody watches three full calls to find them.',
      'A one week buffer between shoot and publish, targeting two.',
      'Guidelines and oversight on anything outsourced. Without context it comes back as AI slop, and that has already happened once.',
    ],
  },
  {
    n: '05',
    name: 'Approval and captions',
    owner: 'Billy',
    reqs: [
      'Captions written before it queues.',
      'Approved before it queues. Nothing goes out unapproved.',
      'Held to the production standard on the new lanes.',
    ],
  },
  {
    n: '06',
    name: 'Posting',
    owner: 'Billy',
    reqs: [
      'Two slots a day, Monday to Friday. The schedule is the source of truth.',
      'Weekends stay off until the weekdays are boringly reliable.',
      'Anything extra, the podcast trailer, event footage, mission content, layers on top. It is not load bearing.',
    ],
  },
];

function PipelineFlow() {
  return (
    <div className="overflow-x-auto -mx-1 px-1 mb-10">
      <div className="flex items-stretch gap-1.5 min-w-[42rem]">
        {PIPELINE.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex-1 rounded-lg border border-zinc-800 border-t-2 border-t-blue-500/60 bg-elevated/40 px-3 py-3">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">{s.n}</p>
              <p className="font-display text-[13px] font-extrabold text-white leading-tight">{s.name}</p>
              <p className="text-blue-400 text-[11px] mt-1.5 leading-tight">{s.owner}</p>
            </div>
            {i < PIPELINE.length - 1 && (
              <div className="flex items-center text-zinc-700 text-[14px] flex-shrink-0" aria-hidden="true">
                &gt;
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PipelineStages() {
  return (
    <div className="grid gap-3">
      {PIPELINE.map((s) => (
        <div key={s.n} className="rounded-xl border border-zinc-800 bg-elevated/40 p-6">
          <div className="flex items-baseline gap-3 mb-4 flex-wrap">
            <span className="font-display text-[26px] font-extrabold text-zinc-800 leading-none">{s.n}</span>
            <h3 className="font-display text-[18px] font-extrabold text-white">{s.name}</h3>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-base/50 px-4 py-3 mb-5">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Owner</p>
            <p className="text-white text-[14px] font-semibold">{s.owner}</p>
            {s.support && <p className="text-zinc-400 text-[13px] mt-1 leading-relaxed">{s.support}</p>}
          </div>

          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">What has to be true</p>
          <BulletList items={s.reqs} />
        </div>
      ))}
    </div>
  );
}

// ─── Sub tab row ─────────────────────────────────────────────────────────

function SubTabs({ sections, active, onChange }: { sections: Array<{ id: string; label: string }>; active: string; onChange: (id: string) => void }) {
  if (sections.length < 2) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`relative py-2 text-[13px] font-medium transition-colors ${
            active === s.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {s.label}
          {active === s.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Capture ─────────────────────────────────────────────────────────────
// Idea capture form. Ideas go in Monday so they can be approved or killed
// before Tuesday. Embed is the Notion form.

const CAPTURE_SRC = 'https://authorityengine.notion.site/ebd//6539a3e4234441e1afc1f59aa8e2ae67';

function CaptureModal({ onClose }: { onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Capture an idea"
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-base overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800">
          <div>
            <p className="font-display text-[16px] font-extrabold text-white leading-tight">Capture an idea</p>
            <p className="text-zinc-500 text-[12px] mt-0.5">Ideas in by Monday, so they get approved or killed before Tuesday.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-full border border-zinc-800 px-4 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
        <iframe
          src={CAPTURE_SRC}
          title="Capture an idea"
          className="w-full h-[600px] max-h-[70vh] block bg-white"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function TheGeronimoPlan() {
  const { tab, sec, changeTab, changeSec } = usePlanNav();
  const [capture, setCapture] = React.useState(false);
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PasswordGate storageKey="geronimo-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="The Plan, Geronimo"
          description="The Strategy Day, bucketed by core function. Diagnosis, decisions, principles, formats, cadence, and who does what from Monday."
          path="/thegeronimoplan"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Strategy reference"
          title="The"
          accent="Plan."
          blurb="The whole Strategy Day, bucketed by core function. Where the bottlenecks are. What we decided. What gets built first."
          backHref={null}
        />
        {/* ─── STICKY NAV · TABS AT THE TOP ─── */}
        <div id="plan-tabs" className="sticky top-0 z-40 border-y border-zinc-800 bg-base/95 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="pt-5 pb-4 -mb-10 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <Tabs tabs={TABS.map((t) => ({ id: t.id, label: t.label }))} active={tab} onChange={changeTab} />
              </div>
              <button
                type="button"
                onClick={() => setCapture(true)}
                className="flex-shrink-0 rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-blue-500/20 transition-colors"
              >
                Capture
              </button>
            </div>
            {current.sections.length > 1 && (
              <div className="border-t border-zinc-800/70">
                <SubTabs sections={current.sections} active={sec} onChange={changeSec} />
              </div>
            )}
          </div>
        </div>


        {/* ═══════════════ START HERE ═══════════════ */}
        {WEEKS.some((w) => w.id === sec) && <FourWeeks wk={sec} onWeek={changeSec} onJump={changeSec} />}

        {/* ═══════════════ DIAGNOSIS ═══════════════ */}
        {sec === 'scores' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The scores</p>
            <H2>The bottleneck scores.</H2>
            <Note>Self rated in the room, out of five.</Note>
            <div className="mt-8">
              <Scores items={SCORES} />
            </div>
            <div className="mt-10">
              <Block label="Notes">
                <BulletList
                  items={[
                    'Current state: excited and curious when things are in motion. Underwhelmed and confused the rest of the time.',
                    'Clients are not paying us to be as good as they are. They are paying us to be bigger.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'order' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Why the order</p>
            <H2>Each one is downstream of the last.</H2>
            <Note>This is why clarity gets fixed before anyone spends a dollar on reach.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Clarity is first contact.</b> If they cannot tell who it is for and what it is against, they bounce, and everything downstream is damaged.</>,
                  <><b className="text-white font-semibold">Visibility only pays off once clarity is up.</b> Ramp reach on an unclear profile and you show more people something confusing.</>,
                  <><b className="text-white font-semibold">Authority answers "is this guy legit and different".</b> That is frameworks, principles, named mechanisms.</>,
                  <><b className="text-white font-semibold">Quality is the last mile.</b> With clarity, visibility and authority in place, the right assets compress trust and the lead converts.</>,
                ]}
              />
            </div>
          </Wrap>
        )}

        {sec === 'today' && (
          <>
        {/* ─── 1 · THE NUMBERS TODAY ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Today</p>
          <H2>The numbers on the table.</H2>
          <Note>Where the account actually sits before anything changes.</Note>
          <div className="mt-8">
            <BulletList
              items={[
                <>Self book from Instagram accounts for roughly <b className="text-white font-semibold">two to three bookings a month</b> through the profile link.</>,
                <>Current output sits at around <b className="text-white font-semibold">three pieces a week</b>.</>,
                'One clip typically goes out per podcast episode.',
                'Separation Sunday is the strongest owned format. One carousel did roughly 26k views with hundreds of comments off a comment CTA.',
              ]}
            />
          </div>
        </Wrap>
          </>
        )}

        {sec === 'brands' && (
          <>
        {/* ─── 2 · DECIDE ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Decide</p>
          <H2>TGA first. Hey Doza parked.</H2>
          <Note>Two brands, two jobs. Separating them is what keeps the right buyer wanting to buy.</Note>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">TGA</p>
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The moneymaker.</b> When TGA posts properly, sales follow. The summit weekend was the clearest proof.</>,
                  'Audience: studio and gym owners.',
                  'Mission: become the number one authority in the space and end burnout in the fitness industry.',
                  'Ambition: the blue zone of the industry. The people who created the standard others study.',
                  'This is the account we dial in first. Everything in this document is TGA unless stated.',
                ]}
              />
            </div>
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Hey Doza</p>
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The founder brand.</b> Life by design, business by design. The founder version of the story.</>,
                  'Audience: founders and operators beyond the fitness niche. Speaking, ventures, partnerships.',
                  'Signalling job: attract inbound. Come and talk to my team, industry bodies, other ventures.',
                  'Kept separate so gym owner content does not generate the wrong inbound, and founder content does not confuse studio owners.',
                  'The MPire 28 vision book already carries both storylines, the TGA version and the founder version.',
                  'Content for Doza keeps running, and it is capture rather than create.',
                ]}
              />
            </div>
          </div>
          <div className="mt-10">
            <Block label="The decision">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">First we focus on TGA, then we build everything else.</b> We still capture content for Doza, but Doza content is capture rather than create.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'workhard' && (
          <>
        {/* ─── 3 · WORKING ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Working</p>
          <H2>Good vs bad.</H2>
          <Note>Split by brand, because the answer is different for each. Do more of the good before inventing anything.</Note>

          <div className="mt-8">
            <Block label="Good, TGA">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Volume.</b> Money comes from volume. The summit weekend, an obnoxious amount of undeniable content, was the best sales weekend on record.</>,
                  <><b className="text-white font-semibold">Ready.</b> The team wants to. Nobody is dragging anyone, and when they decide they turn things around fast.</>,
                  <><b className="text-white font-semibold">Doing shit.</b> Live and interactive. Nobody is stuck behind a desk, so the business generates real footage constantly.</>,
                  <><b className="text-white font-semibold">Events.</b> They create the stories, and they are alive and interactive. Members respond hardest of all.</>,
                  <><b className="text-white font-semibold">The formats already invented.</b> Mystery shop especially. No reason it cannot run three times per coach per week.</>,
                  <><b className="text-white font-semibold">It sells in the room.</b> Someone at the workshop saw the playbook on the board and changed her read on the business on the spot.</>,
                ]}
              />
            </Block>

            <Block label="Good, Doza">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Energy.</b> Named as the biggest single differentiator. It is the brand.</>,
                  <><b className="text-white font-semibold">Signalling.</b> High effort, very high leverage. Drives the inbound that turns into speaking and partnerships.</>,  // gate-ok: the room's own words, effort against leverage
                  <><b className="text-white font-semibold">Documenting.</b> Content that shows what actually happened yesterday. In motion, alive, no friction in making it.</>,
                  <><b className="text-white font-semibold">Unique.</b> The founder version of the story is his and nobody else can run it.</>,
                  <><b className="text-white font-semibold">Reactions.</b> Reacting to wins, workshops and moments. If he is excited, they get excited.</>,
                ]}
              />
            </Block>

            <Block label="Bad, TGA">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Ideation.</b> No cracked process, so it never feels good. The number one hard thing.</>,
                  <><b className="text-white font-semibold">Organisation.</b> Too many moving parts across coaches, calls, events and edits.</>,
                  <><b className="text-white font-semibold">We are making it hard.</b> The stuff that worked was fast and simple. Somewhere the process took over.</>,
                  <><b className="text-white font-semibold">Production.</b> Post production drain, weak podcast clips, and carousels nobody enjoys making.</>,
                  <><b className="text-white font-semibold">Too much, none of it dialled.</b> Lots of formats started, nothing taken to repeatable before moving on.</>,
                ]}
              />
            </Block>

            <Block label="Bad, Doza">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Backlog.</b> Always chasing the tail. The next thing has to go out this week, so there is never a buffer.</>,
                  <><b className="text-white font-semibold">Ideation.</b> Same constraint, and it shows up on both brands.</>,
                  <><b className="text-white font-semibold">Energy.</b> Sometimes it is there, sometimes it is not, and that changes the whole output.</>,
                  <><b className="text-white font-semibold">Repurposing and recreating.</b> The piece that worked once rarely gets run again, which is where most of the backlog problem actually lives.</>,
                  <><b className="text-white font-semibold">He wants to be the talent, not the creator.</b> The say something to camera job has been plugged into every meeting and it drags.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'principles' && (
          <>
        {/* ─── 4 · PRINCIPLES ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Principles</p>
          <H2>The rules underneath every format.</H2>
          <Note>This is the reusable part. Every format decision below sits on top of these.</Note>
          <div className="mt-8">
            <Cards
              cols={2}
              items={[
                { title: 'Simplicity wins', body: 'Everything does the same job realistically. The shortest line between A and Z is usually how the good stuff happened.' },
                { title: 'Do more of what already worked', body: 'Find the low effort, high leverage thing you have already done that worked, and do it again. We do not need to reinvent anything.' },  // gate-ok: the room's own words, effort against leverage
                { title: 'Everything is teaching', body: 'A story teaches through experience. A belief teaches through worldview. Education teaches through steps. A show teaches through demonstration. Same job, different vehicle.' },
                { title: 'Everything is proof', body: 'Every piece reinforces the positioning. Which is why there is no proof bucket, and why traditional testimonials are not required at all.' },
                { title: 'One specific person', body: 'Someone has to self identify in the first seconds. Hyper specific beats broad every time. If I owned a Pilates studio and had 365 days to make $500k.' },
                { title: 'Hooks are the biggest lever', body: 'Dream outcome, minus the thing they do not want to do. Test five trial reels on different hooks before committing to a series.' },
                { title: 'Niche viral beats viral', body: 'Pull on the things people inside the industry recognise. The software screen, the spreadsheet, the studio layout. That is the best outcome available.' },
                { title: 'Trojan horse', body: 'Do not make the win the whole video. Wrap the point inside something relevant and visual, so the right person watches for their own reasons.' },
                { title: 'Lesson, not gloat', body: 'Point at the client. These guys crushed it and this is exactly what they did.' },
                { title: 'Reinforcers', body: 'Common belief, then weight from what is right, then a reinforcer. The reinforcer can be data, a story, a mechanism, or a client who already did it.' },
                { title: 'Shots on goal, fast feedback', body: 'Frequency up, feedback loop tight. Someone over your shoulder saying good, bad, more of that. It took Jay about four weeks to click.' },
                { title: 'Answer the question in the answer', body: 'The single most important habit for turning calls into content. Repeat the question back, set the frame, then answer clearly.' },
                { title: 'Format wins', body: 'A good format works every time regardless of who is in it. Everyone wants to be a fly on the wall.' },
                { title: 'Lanes over ideas', body: 'Fixed weekly lanes remove reliance on inspiration. Extra ideas layer on top, so nothing breaks when the ideas dry up.' },
                { title: 'Calibrate, then pour', body: 'Less is more first. Get four to six core types working, then layer everything else on a foundation that holds.' },
                { title: 'Visuals as reinforcement', body: 'Draw and show only when it reinforces the point. Show the viewer where you are going. Do not draw for the sake of drawing.' },
                { title: 'Know how they actually watch', body: 'Our owner is distractible and half the time the phone is in a car cradle or in their hand in the queue at Bunnings. A talking head with nothing on screen loses them.' },
              ]}
            />
          </div>
          <div className="mt-10">
            <Block label="Two mechanics worth naming">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The idea matrix.</b> Everyone puts ideas up, then the room ranks them on effort against leverage. Low effort and high leverage ships immediately. How fast can we get an MVP out, can we test it with trial reels in twenty minutes. Everything else gets cut or parked. This is the missing ideation process.</>,  // gate-ok: the room's own words, effort against leverage
                  <><b className="text-white font-semibold">Three routes off one long form recording.</b> One, cut a section out and post it. Two, look at what was inside it and recreate that as its own piece. Three, the short form piece we did once that worked, just do it again. Most of the backlog problem is solved by route three.</>,
                ]}
              />
            </Block>
            <Block label="Who we are learning from">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Taki.</b> Records the weekly calls he already runs off a phone, and has for years. Owns his frameworks by name. Two camera podcast so it never gets boring. Deliberately leaves opportunity on the table, which is the opening.</>,
                  <><b className="text-white font-semibold">Jeremy.</b> Carousels that look repurposed and clearly took no time, which is exactly why they work. Screen shares, business breakdowns, visuals above his head. Up to three YouTube videos a week off a small, heavily AI assisted team.</>,
                  <><b className="text-white font-semibold">Sway.</b> Simple lanes. A creative director, short form, long form. Heavy on capture rather than create. The freshest approach going and worth borrowing from.</>,
                  <><b className="text-white font-semibold">Brandon.</b> The testimonial structure to copy. Open on a recognisable pairing, then flip to the client. The coach who ran the call is not in the split screen.</>,
                  <><b className="text-white font-semibold">Toby.</b> Every Tuesday, without fail, uses his own system on camera to demonstrate whatever he is talking about. Consistency of container, not of topic.</>,
                  <><b className="text-white font-semibold">The conclusion.</b> Almost nobody is doing all of this well and most of it is stale. Take the one or two things each person does brilliantly, Frankenstein them, and become the reference point.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {/* ═══════════════ CONTENT ═══════════════ */}
        {sec === 'capture' && (
          <>
        {/* ─── 5 · CONTENT ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Content</p>
          <H2>Capture and Create.</H2>
          <Note>This is a buffet. It is not everything. It is simply showing what options we came up with on the day. There are two types.</Note>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Capture</p>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">Things already happening in the business that only need a camera pointed at them. Low thinking cost, high authenticity.</p>
              <BulletList
                items={[
                  'Million Dollar Studio call. Every Tuesday, 200+ studio owners. Topics known three months ahead, so it can be engineered in advance.',
                  'Office hours and ask me calls. Three times a week across Doza, Ryan and Sophie.',
                  <><b className="text-white font-semibold">The new 12 week room.</b> Doza personally coaching a cohort weekly, aiming to take 20 studios to a million dollars. This is the engine for the flagship series.</>,
                  'Hey Doza hot seats. Monthly in person, monthly virtual.',
                  'Workshops and teach sessions, ticketed.',
                  'Events, boat days twice a month, the official calendar, hackathons.',
                  'Mystery shops and pop quizzes. Can be run anywhere, any time.',
                  'Podcast recordings.',
                ]}
              />
            </div>
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Create</p>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">Things that require a decision, a frame and a shoot. Higher effort, so it needs a repeatable structure to stay cheap.</p>
              <BulletList
                items={[
                  'Direct to camera. Belief, identity, teach.',
                  'Green screen. React to news, react to wins, this versus that.',
                  'Show and tell. Walking through a tool live.',
                  'Makeovers. Before and after of ads, calendars, role structures.',
                  'Carousels. Frameworks and micromagnets.',
                  'Series episodes with a fixed storyline.',
                ]}
              />
            </div>
          </div>

        </Wrap>
          </>
        )}

        {sec === 'formats' && (
          <>
        {/* ─── 5b · FORMATS ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Formats</p>
          <H2>The format library.</H2>
          <Note>These are all the formats. These are not the formats we need to do all at once.</Note>
          <div className="mt-8 mb-10 rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-7">
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-4">How to read this</p>
            <BulletList
              items={[
                <><b className="text-white font-semibold">This is the buffet.</b> Every option we came up with on the day.</>,
                <><b className="text-white font-semibold">We do not do these all at once.</b> Four to six working beats twelve half running.</>,
                <><b className="text-white font-semibold">They will shift as soon as we have data.</b> Nothing here is permanent.</>,
                <><b className="text-white font-semibold">Every decision is backed by what is working,</b> and we keep testing.</>,
                <><b className="text-white font-semibold">The goal is fast feedback, so we can simplify.</b></>,
              ]}
            />
          </div>
          <div className="mt-8">
            <div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: 'Green screen',
                    tag: 'Create',
                    body: 'A favourite format because it is supposed to look rough. Decent lighting is enough. Do not be a static head in one spot, move the graphic or move yourself. You can hijack anything: an article, a logo wall, a P&L, a membership dashboard, a Stripe screen, a beautiful Pilates studio, handwritten notes behind your head. Numbered checklists behind the head work because they signal a track the viewer can follow.',
                  },
                  {
                    title: 'React to news',
                    tag: 'Create',
                    body: 'Respond to an article, a gym acquisition, a chain selling for billions, and borrow its authority. React to what is happening around you in the industry. Workshopped in the room: the Pilates manager who resigned over a promotion misunderstanding. Hook: imagine quitting your job for the ultimate opportunity and it blows up.',
                  },
                  {
                    title: 'React to wins',
                    tag: 'Create',
                    body: 'Clients post wins in the community every Tuesday, hundreds of them. A free, weekly, renewable input. Frame as a lesson, not a gloat. Hook shapes: if I wanted to add $120k in the next 90 days, these are the only three things I would focus on. Raise the stakes, then point at someone who has already done it. Show a real screen where you can.',
                  },
                  {
                    title: 'This vs that',
                    tag: 'Create',
                    body: 'Anonymised client numbers. Red against green. Where they started, what changed, where they are now. A spreadsheet reads as more identifiable to a studio owner than a polished graphic. Getting permission is a simple conversation and almost everyone says yes.',
                  },
                  {
                    title: 'Direct to camera',
                    tag: 'Create',
                    body: 'Handheld with a little motion. Static is where the drop off lives. Three sentences at a time, then reset. It is hard at first, you get into the rhythm. Two variants to run, one with a visual behind the head and one without. Doza can rip five in a sitting and layer graphics afterwards.',
                  },
                  {
                    title: 'Show and tell',
                    tag: 'Create',
                    body: 'The Ryan lane. Check out this tool, live, interactive, showing the thing working. Needs light and something genuinely happening on screen. Simple frame to hand him: what it is, what it does for you, how to use it, why it is different. The AI tool he built is the unique mechanism.',
                  },
                  {
                    title: 'Coaching call Q&A',
                    tag: 'Capture',
                    body: 'The highest volume renewable source in the business. Doza, Sophie and Ryan all run them. Two cameras wherever possible, one close and one wider. Zoom clips will never look great, so set up properly for the calls we intend to use. Requires training the habit: repeat the question, set the frame, then answer.',
                  },
                  {
                    title: 'Interview style capture',
                    tag: 'Capture',
                    body: 'This is what works for Ryan and Doza both. Someone off camera asks the question and they answer a person rather than a lens. Kills the preach energy that shows up in face to camera. Side cam plus operator. Same setup as the Jay Q&A: half an hour, two cameras, 30 reels.',
                  },
                  {
                    title: 'Mystery shop',
                    tag: 'Capture',
                    body: 'Already proven, already loved, zero setup. Can be done anywhere within the hour and anyone can run it, so it is not dependent on Doza. Call ahead so they are expecting it, then shoot. Batch it into whatever shoot is already happening. Sibling format worth trying: hand someone 60 seconds to fix one specific thing in a real business.',
                  },
                  {
                    title: 'Pop quiz',
                    tag: 'Capture',
                    body: 'New series. Call our own clients and their managers and quiz them on KPIs and standards. What it signals is standards, and people love the standards. Best version to test: call the manager while the owner listens in and capture the owner reaction. Suspense and stakes. Test it against mystery shop.',
                  },
                  {
                    title: 'Makeovers',
                    tag: 'Create',
                    body: 'Before and after for the industry. Print the ad, mark it up, show what it became and what it produced. Satisfying the way chiropractic videos are. Works at every level of the customer base: ads, org structure, role structure, the calendar.',
                  },
                  {
                    title: 'Mission content',
                    tag: 'Create',
                    body: 'Documenting the mission to end burnout in the industry, day 273 and counting. Members get behind it hard, so it is a retention and validation play as much as acquisition. Needs reframing to matter to strangers: stakes, relatability, relevance. Doubles as an internal comms channel, because clients do not read hundreds of Slack channels but they do open Instagram.',
                  },
                ].map((c) => (
                  <div key={c.title} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">{c.tag}</p>
                    <p className="font-display text-[15px] font-extrabold text-white mb-2">{c.title}</p>
                    <p className="text-zinc-400 text-[14px] leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'series' && (
          <>
        {/* ─── 6 · SERIES ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Series</p>
          <H2>The series.</H2>
          <Note>A series is repeatable for us and recognisable for the viewer. Anchor points, a storyline, and a hook they know like a theme tune.</Note>
          <div className="mt-8">
            <Rows
              rows={[
                { name: 'Mystery Shop', status: 'Proven', detail: 'Call a studio cold and shop them live. Proven, loved, zero setup. Scale it.' },
                { name: 'Pop Quiz', status: 'Test', detail: 'Quiz our own clients and managers on KPIs and standards. New. Test it against mystery shop to confirm they are different enough to run both.' },
                { name: 'Under Management', status: 'Flagship', detail: 'Total revenue under management as the headline number and the storyline. The biggest of the lot. Weekly update, what changed, what they did. Fed by the new 12 week coaching room. Doza fronts it.' },
                { name: 'Separation Sunday', status: 'Proven', detail: 'The owned, trademarkable weekly format. Best performing carousel line by a distance. Work out why it repeats.' },
                { name: 'Ending Burnout, Day N', status: 'Revive', detail: 'Sophie led mission series with a fortnightly check in on what we did in the last two weeks. Revive with a sharper frame.' },
                { name: 'Makeovers', status: 'Batch', detail: 'Ad, calendar and structure before and afters. Ready to batch.' },
                { name: '$200k Till I Turn 40', status: 'Parked', detail: 'Public scoreboard series. A personal number, a deadline, watch it work or watch it fail in the open. Hey Doza, parked with the brand.' },
              ]}
            />
          </div>
          <div className="mt-10">
            <Block label="Rules for any series">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Nail the hook before you commit.</b> Run five trial reels on different hooks. The hook is the single biggest lever on a signature series.</>,
                  <><b className="text-white font-semibold">Recognisability is the point.</b> Anchor points, a consistent storyline, a hook people can hear coming from the other room.</>,
                  <><b className="text-white font-semibold">Stakes and relevance.</b> A story only works if something is on the line and the viewer sees themselves in it.</>,
                  <><b className="text-white font-semibold">Every tip hyper specific.</b> The outcome has to be visible in the first five seconds.</>,
                  <><b className="text-white font-semibold">Consider a scoreboard</b> for Under Management. Anonymised or self chosen names, fortnightly, who do you think wins.</>,
                  <><b className="text-white font-semibold">Guard against fence sitting.</b> A long running series can make people wait and watch instead of buying. Frame each episode so it stands alone and gives something away now.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {/* ═══════════════ PRODUCTION ═══════════════ */}
        {sec === 'schedule' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The schedule</p>
            <H2>The week, off the board.</H2>
            <Note>Two slots a day, Monday to Friday. Ten pieces.</Note>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                { who: 'Doza', n: 4, jobs: ['Direct to cam ×2, bringing ideas from calls', 'Mystery ×1', 'Series ×1'] },
                { who: 'Ryan', n: 3, jobs: ['Show and tell ×1, bringing three per week', 'Coaching ×1, batched', 'Mystery shop ×1'] },
                { who: 'Sophie', n: 3, jobs: ['Coaching ×1', 'Direct to cam ×1, bringing three beliefs to break', 'Pop quiz ×1, with Billy'] },
              ].map((p) => (
                <div key={p.who} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                  <div className="flex items-baseline justify-between mb-4">
                    <p className="font-display text-[17px] font-extrabold text-white">{p.who}</p>
                    <p className="font-display text-[17px] font-extrabold text-blue-400 tabular-nums">{p.n}</p>
                  </div>
                  <ul className="space-y-2">
                    {p.jobs.map((j) => (
                      <li key={j} className="text-zinc-300 text-[13px] leading-relaxed">{j}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Block label="The week">
                <ScheduleGrid />
              </Block>
              <Block label="The six types">
                <ScheduleLegend />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'cadence' && (
          <>
        {/* ─── 7 · CADENCE ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Cadence</p>
          <H2>Ten a week. Three people.</H2>
          <Note>Two a day, Monday to Friday, no weekends for now. Up from around three. Which person fills which slot was not fixed in the room, only the totals were.</Note>
          <div className="mt-8">
            <Block label="The shape of the week">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The split.</b> Doza 4, Ryan 3, Sophie 3. Ten is deliberately easier to hold than fourteen while we calibrate.</>,
                  <><b className="text-white font-semibold">Only three people for now.</b> Ryan and Sophie already want to and are already building personal brands attached to the mission. Nobody else gets forced onto camera yet.</>,
                  <><b className="text-white font-semibold">They post to TGA.</b> Their own accounts run in parallel because they want to, but TGA is the priority.</>,
                  <><b className="text-white font-semibold">Weekends stay off.</b> Add Saturday and Sunday only once weekdays are boringly reliable.</>,
                  <><b className="text-white font-semibold">Start at one a day.</b> Five for the first week while the shoot backlog gets cleared and the rhythm goes in. Second week we push to ten.</>,
                  <><b className="text-white font-semibold">Everything else layers on top.</b> The podcast trailer, event footage, mission content, anything Billy captures. Extra, not load bearing.</>,
                  <><b className="text-white font-semibold">The measure is a minimum of five posts a week.</b> Whether we can reliably get the work out is the thing we are testing.</>,
                  <><b className="text-white font-semibold">Expect to re cut the mix.</b> In two weeks it will be obvious who is better at what, then reallocate slots to strengths.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'lanes' && (
          <>
        {/* ─── 7b · LANES ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Lanes</p>
          <H2>Who does what.</H2>
          <Note>The lane each person runs, and why it suits them. Everyone outside the ten still has a job.</Note>
          <div className="mt-8">
            <Block label="Lanes by person">
              <LaneTable />
            </Block>
            <Block label="Why more faces matter">
              <BulletList
                items={[
                  'Different avatars attract different people. Softer answers pull toward Sophie, tactical toward Ryan.',
                  'Once each coach has consistent output, TGA stops being a single point of failure and Doza can step back at will.',
                  'Next phase after this one: each coach posting consistently on their own account too.',
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'rhythm' && (
          <>
        {/* ─── 8 · RHYTHM ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Rhythm</p>
          <H2>The production week.</H2>
          <Note>The workflow that makes ten pieces a week survivable. Tuesday meeting, Thursday shoot, Wednesday left open in between.</Note>
          <div className="mt-8">
            <WeekFlow />
          </div>
          <div className="mt-10">
            <Block label="The cadence decisions">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Why Tuesday.</b> The big MDS call has just wrapped, everyone comes upstairs buzzing, and there is material floating around that would otherwise evaporate.</>,
                  <><b className="text-white font-semibold">Shoot for the week after, not for Monday.</b> No sunk cost, no scrambling, and the whole production line gets a week of air.</>,
                  <><b className="text-white font-semibold">Never move a client call last minute,</b> and never no show one because of an internal mix up. Those are the two things clients genuinely get annoyed about.</>,
                  <><b className="text-white font-semibold">Stop treating client calls as the obstacle to media.</b> Build the media rhythm around them and the calls become the assets.</>,
                  <><b className="text-white font-semibold">A 10 minute pre shoot check</b> the day before. Is everyone prepped for tomorrow.</>,
                  <><b className="text-white font-semibold">Structure, not scripts.</b> Each format gets a stencil to fill in.</>,
                  <><b className="text-white font-semibold">Monthly Media Monday</b> is the name for the monthly. The strategist blocks Mondays and Tuesdays for strategy work, so for the first few months it lands between Tuesday and Thursday. Head of content, founder, strategist. Deliberately a room where anything unsaid gets surfaced.</>,
                  <><b className="text-white font-semibold">The strategist cadence.</b> Monthly session with the crew, sitting in on the media jam when possible, and a weekly jam with Billy for the first four weeks.</>,
                  <><b className="text-white font-semibold">The MDS call can be pre engineered.</b> Call topics are known three months out, so hooks and short teach moments get written into the call in advance with two cameras capturing.</>,
                  <><b className="text-white font-semibold">Sophie container.</b> One of her office hours every week, with Billy present. She is doing the call anyway.</>,
                  <><b className="text-white font-semibold">Ryan container.</b> His Friday office hours plus a monthly shoot when he is at the main office. Flag the dates at the start of each month.</>,
                  <><b className="text-white font-semibold">Batching maths.</b> A coach fields around 15 questions in an hour. If only one or two a week are usable, that still fills a month.</>,
                  <><b className="text-white font-semibold">A gentler start is allowed.</b> Two or three weeks of the easiest possible content to get the backlog underneath us, then step up.</>,
                ]}
              />
            </Block>
            <Block label="Bottlenecks to design out">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Footage handoff.</b> If coaches have to get files to the editor, that is the choke point. An operator turns up, shoots, exports and sends it back. Nothing lands on the team.</>,
                  <><b className="text-white font-semibold">Finding the good moments.</b> The person in the room flags the good questions live, or an AI pass over the Zoom transcript finds clean question and answer moments. Nobody watches three full calls.</>,
                  <><b className="text-white font-semibold">A simple "this is a banger" tool</b> with a timestamp, so good moments get marked at the source instead of found later.</>,
                  <><b className="text-white font-semibold">Idea approval.</b> Nobody should be inventing a concept the night before a shoot because something has to go out.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'assets' && (
          <>
        {/* ─── 9 · ASSETS ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Assets</p>
          <H2>Podcast, carousels, ads, sets.</H2>
          <Note>The four assets that sit outside the weekly ten and need their own decisions.</Note>
          <div className="mt-8">
            <Block label="Podcast">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The diagnosis.</b> Clips underperform. Unfiltered got treated as unedited and un engineered. We shoot a whole 45 to 60 minute episode in one run assuming everything said is usable. When Doza is interviewing, the value comes from the guest and the usable content drops.</>,
                  <><b className="text-white font-semibold">The Dane podcast reference.</b> A collaborative pre call with the producer. If you were giving a TED talk, what would it be about. A live document with must have questions per section, model answers, and follow up prompts. Live directing during the record. Deliberate alley oops, because a guest who feels great posts the episode themselves.</>,
                  <><b className="text-white font-semibold">The stop and retake sessions.</b> We stopped, named the topic, and went again. Close to the best thing that has happened to the format. Hooks were built in advance rather than hunted for afterwards, and the clips worked because the questions were already in demand.</>,
                  <><b className="text-white font-semibold">Guest categories.</b> Pure value, which builds our authority directly, against audience leverage, someone our people already follow. Also industry experts with a report or trend data, adjacent service providers where studio owners already spend money, and internal episodes on our own frameworks.</>,  // gate-ok: the room's own words, effort against leverage
                  <><b className="text-white font-semibold">Brokers especially.</b> Nobody talks about it and everyone is interested. Can be 20 to 30 minutes. Sample hook: you have sold over $100 million in businesses, what are the mistakes every gym owner makes.</>,
                  <><b className="text-white font-semibold">Nobody owns the central podcast seat for this industry.</b> That is the opening. Build the ideal guest list and let one person own the growth of it the way a media buyer owns spend.</>,
                ]}
              />
            </Block>
            <Block label="Carousels">
              <BulletList
                items={[
                  'Nobody in house should be making them. Delegate to a part time offshore person, around 20 hours a week, overseen internally.',
                  'Strict guidelines required, because the real constraint is context. Without it, output comes back as AI crap. Already hit once.',
                  'The carousels that work look like they took no time. Repurposed, unpolished, relatable. Do not over produce them.',
                  'They suit broad topics. Total addressable market, not niche mechanics.',
                  'Hook source: mine the highest performing business YouTube titles and take the theme of why they work.',
                  'The prize: two days of the week sorted a month in advance, activating the audience, with nobody sitting in front of a screen.',
                  'Feed it with our own frameworks and micromagnets, which means listing the IP first.',
                  'Alternate the weeks. One week relatable for affinity, one week teach for utility.',
                ]}
              />
            </Block>
            <Block label="Ads, proof and association">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The dashboard micromagnet</b> is the best performing lead magnet to date. The copy is dead simple: here is the fitness studio dashboard that tracks all your revenue, costs and P&L, and tells you straight away whether you are in the green.</>,
                  <><b className="text-white font-semibold">Same asset, different dog whistle on the front.</b> If you are a gym owner without a way to track revenue. If you run a Pilates studio. Same body, new opening.</>,
                  <><b className="text-white font-semibold">Sophie is in the ads now and performing.</b> She has nailed how she speaks on camera in the last four months. Appearing on the podcast and broadcasts lifts ad performance for the same person.</>,
                  <><b className="text-white font-semibold">The association problem.</b> Ryan appearing solo reads as another guy who has turned up on the scene. Fix it by leading with Doza plus coach imagery, on stage, at an event, B roll of the two together. Plenty of that footage exists.</>,
                  <><b className="text-white font-semibold">Proof starts fresh.</b> Currently text based and inconsistent. The traditional testimonial is not required at all. Case study framing with a strong hook beats a talking head. Use screens the audience recognises and anonymise by default.</>,
                  <><b className="text-white font-semibold">Worth testing.</b> Whole team ad libraries running the same script with different faces, with a consistent identifier in frame.</>,
                ]}
              />
            </Block>
            <Block label="Sets, kit and art direction">
              <BulletList
                items={[
                  'Decide what every set must contain so a viewer immediately clocks it as ours. A specific artist, a wallpaper, a repeated object.',
                  'Depth is what separates a good set from a bad one. Shelving, something behind the screens, never a blank wall. Elevated, not grand.',
                  'Two set rooms means two people can run calls at once.',
                  'Two cameras wherever possible for Q&A and coaching calls. One close, one wide, cut between them.',
                  'A small media wall or screen. Still on the list.',
                  'Desk clamp with a basic light. That plus a screen is most of what anyone needs.',
                  'A teleprompter unit to fix eyeline. Right now coaches look off to the side and lose the viewer.',
                  'A standard travel kit for coaches at home. No visible bedrooms, no virtual backgrounds. Warm, consistent colour so footage cuts together.',
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {/* ═══════════════ PIPELINE ═══════════════ */}
        {sec === 'flow' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The flow</p>
            <H2>Idea to posted, in six stages.</H2>
            <Note>One owner per stage. If a stage has no owner it stalls, and the whole line backs up behind it.</Note>
            <div className="mt-8">
              <PipelineFlow />
              <PipelineStages />
            </div>
            <div className="mt-10">
              <Block label="The two things that break it">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Footage handoff.</b> If a coach has to get files to the editor, that is the choke point. The operator exports and sends, so nothing sits on the team.</>,
                    <><b className="text-white font-semibold">Finding the good moments.</b> Flag them live with a timestamp at the source. Hunting for them afterwards is the single biggest cost in post.</>,
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ COMMIT ═══════════════ */}
        {sec === 'risks' && (
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Risks</p>
          <H2>What to keep visible.</H2>
          <Note>Named in the room. These are the things that quietly kill a four week calibration.</Note>
          <div className="mt-8">
            <BulletList
              items={[
                <><b className="text-white font-semibold">Quality dip at the start.</b> The constraint is accepting it will not be great from the first recording. That is the deal during calibration.</>,
                <><b className="text-white font-semibold">Ryan preaching to camera.</b> The known failure mode. Solve it with interview style capture rather than more coaching.</>,
                <><b className="text-white font-semibold">Client sensitivity.</b> Some get uncomfortable when they recognise themselves. Anonymise by default, ask properly when you do not.</>,
                <><b className="text-white font-semibold">Trolls.</b> Three known repeat commenters. Treat it as a signal that the content has an edge.</>,
                <><b className="text-white font-semibold">Series can encourage fence sitting.</b> If people wait to see how the story ends, they do not buy now.</>,
                <><b className="text-white font-semibold">VA context gap.</b> Already burned once. Guidelines and oversight, or do not start.</>,
                <><b className="text-white font-semibold">AI is a yes man.</b> Useful for insight, topic sourcing and micro niche detection. Not for generating the content.</>,
                <><b className="text-white font-semibold">Ideas go stale in advance.</b> Planning ahead means the fresh idea that arrives on Wednesday always feels better. Buffer is still the right call, but keep a lane for late additions.</>,
                <><b className="text-white font-semibold">Doing too much, none of it dialled.</b> The recurring failure pattern. Resist adding formats until the foundation holds.</>,
              ]}
            />
          </div>
        </Wrap>
        )}

        {sec === 'locked' && (
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Locked</p>
          <H2>What we agreed.</H2>
          <Note>Decisions, not discussion. If it is on this list, it is not up for debate for four weeks.</Note>
          <div className="mt-8">
            <BulletList
              items={[
                'TGA is the focus. Hey Doza is parked until TGA is dialled.',
                'Ten pieces a week. Doza 4, Ryan 3, Sophie 3. Two a day, Monday to Friday.',
                'Ryan and Sophie only. Nobody else forced onto camera yet.',
                'Content organises into Capture and Create. No proof or authority buckets.',
                'Four week calibration period. Less is more, then layer on.',
                'Media meeting Tuesday, shoot Thursday, Wednesday deliberately left in between.',
                'A one week buffer between shoot and publish, targeting two.',
                'A separate monthly content forward meeting. Monthly Media Monday in name, landing mid week for the first few months.',
                'Monthly strategist session with the crew, plus a weekly jam with Billy for the first four weeks.',
                'Carousels get outsourced with strict guidelines, not made in house.',
                'Proof content starts fresh rather than continuing the inconsistent text format.',
                'Podcast episodes get engineered. Prep, live document, live directing, stop and retake.',
                'A freelance shooter comes in for Ryan. Roughly two hours, once or twice a month.',
                'The 30 day KPI is consistency of output, not a viral hit.',
              ]}
            />
          </div>
        </Wrap>
        )}

        {sec === 'open' && (
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Open</p>
          <H2>Decide with data, not in the room.</H2>
          <Note>Deliberately unresolved. The first item is the highest value loose end in the whole document.</Note>
          <div className="mt-8">
            <Block label="The one that needs an owner">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">How we fix clarity, the 2 out of 5, was never resolved.</b> The diagnosis is precise. Someone lands on the profile and there is no clear path to who we are, what we do, and how to work with us. No owner, no fix, no date.</>,
                ]}
              />
            </Block>
            <Block label="To test">
              <BulletList
                items={[
                  'Long form and YouTube got almost no airtime. An 11 video behind the scenes series was floated and the open the bonnet idea wants a long form home. Needs its own session.',
                  'Pop quiz against mystery shop. Different enough to run both, or is one the better version.',
                  'Pop quiz format. Straight call, or manager called with the owner listening for the reaction.',
                  'Whether Doza needs green screen at all given he has videographers. Green screen is a workaround for people who do not.',
                  'Direct to camera with or without a visual behind. Run one of each and compare.',
                  'Hooks for Under Management. Test before building the series.',
                  'Whether the Ryan Zoom calls get clipped at all, or whether we take the idea from the call and reshoot it properly.',
                  'The IP list. What are our genuinely unique, differentiated frameworks. Needed before carousels and named authority content can scale.',
                  'The ideal podcast guest list. Who in and around this industry do we want, in what order.',
                  'Repeatability of Separation Sunday. It works, but the pattern behind why has not been unlocked.',
                  'Whether the official calendar becomes a monthly container. Run it once as a low effort test with a defined list of pieces to capture, then decide.',
                ]}
              />
            </Block>
          </div>
        </Wrap>
        )}

        {sec === 'shootcard' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The shoot card</p>
            <H2>Ten a week, six types.</H2>
            <Note>What each type is, who fronts it, and the structure it gets built on. Click any card for the beats, the structures to pick from, and the hook types that suit it.</Note>
            <div className="mt-8">
              <ShootCard />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ HOW TO MAKE IT ═══════════════ */}
        {sec === 'script' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The script system</p>
            <H2>How a script gets built.</H2>
            <Note>The skeleton and the rules are the same for everyone. Only the substance is yours. Decide the type and the framework before writing a word.</Note>

            <div className="mt-10">
              <Block label="Build order">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Core idea.</b> One line. The seed.</>,
                    <><b className="text-white font-semibold">Content type.</b> Story, Belief, Teach or Show.</>,
                    <><b className="text-white font-semibold">Framework.</b> One named framework for that type.</>,
                    <><b className="text-white font-semibold">Production.</b> Environment and camera style.</>,
                    <><b className="text-white font-semibold">Text hook.</b> The on screen words. The scroll stopper.</>,
                    <><b className="text-white font-semibold">Spoken hook.</b> The first line out of their mouth.</>,
                    <><b className="text-white font-semibold">Context.</b> Who it is for, the stakes, why now.</>,
                    <><b className="text-white font-semibold">Body.</b> The framework beats, one per line.</>,
                    <><b className="text-white font-semibold">Payoff.</b> The reward, looped back to the hook.</>,
                    <><b className="text-white font-semibold">CTA.</b> One ask. Comment a keyword, or DM.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="The section skeleton">
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                  <table className="w-full min-w-[40rem] text-left">
                    <thead>
                      <tr className="bg-elevated/60">
                        {['Section', 'Job', 'Rule'].map((h) => (
                          <th key={h} className="px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s: 'Text hook', j: 'Stop the scroll on mute', r: 'Under 7 words. A curiosity gap. Never gives the answer.' },
                        { s: 'Spoken hook', j: 'Open the loop in the first sentence', r: 'No bullshit. Rip into it.' },
                        { s: 'Context', j: 'Make it theirs, raise the stakes', r: 'Who this is for, what it costs them, why now.' },
                        { s: 'Body', j: 'Deliver the framework beats', r: 'One beat per line. Re earn attention every few lines.' },
                        { s: 'Payoff', j: 'Close the loop, hand over the reward', r: 'Loop back to the hook. Land it. Do not summarise.' },
                        { s: 'Analogy', j: 'Collapse the complex into one picture', r: 'Optional. One image a twelve year old gets.' },
                        { s: 'CTA', j: 'One next step', r: 'Comment a keyword, or DM. Never stack two.' },
                      ].map((r) => (
                        <tr key={r.s} className="border-t border-zinc-800/70 align-top">
                          <td className="px-4 py-3.5 font-display text-[14px] font-extrabold text-white whitespace-nowrap">{r.s}</td>
                          <td className="px-4 py-3.5 text-zinc-300 text-[13px] leading-relaxed">{r.j}</td>
                          <td className="px-4 py-3.5 text-zinc-400 text-[13px] leading-relaxed">{r.r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Block>
            </div>

            <div className="mt-2">
              <Block label="The four types and their frameworks">
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { n: 'Story', s: 'Teach through experience', f: ['Old me vs new me. Who I was, the breaking point, who I became.', 'Old self, friction, realisation, new self, invitation.', 'Situation, reaction, insight, new perspective, application.'], d: 'Builds trust. The proof is the person, not the tactic. Lead with a specific, slightly vulnerable moment.' },
                    { n: 'Belief', s: 'Teach through perspective', f: ['Common belief, contradiction, explanation, new conclusion.', 'Accepted rule, why it exists, why it fails, better rule.'], d: 'Shifts a belief. State what they hold, contradict it, remove the blame, prove it with a real number, hand them the new rule. Highest leverage type for authority.' },
                    { n: 'Teach', s: 'Teach through explanation', f: ['Belief, cost, truth, application.', 'Hook, problem, steps, reward.', 'Goal, current effort, bottleneck, lever, reallocation.'], d: 'Transfers a method. Name the real problem, walk the steps, gate the deep version behind a CTA. Teach how to think, not just what to do.' },
                    { n: 'Show', s: 'Teach through demonstration', f: ['Input, process, output.', 'Situation, options, choice.', 'Constraint, ignore, do.'], d: 'Proves it on screen. Draw the model, do the maths live, show two things side by side. The visual carries the point.' },
                  ].map((t) => (
                    <div key={t.n} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                      <p className="font-display text-[15px] font-extrabold text-white">{t.n}</p>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">{t.s}</p>
                      <p className="text-zinc-400 text-[13px] leading-relaxed mb-4">{t.d}</p>
                      <ul className="space-y-2 border-t border-zinc-800/70 pt-4">
                        {t.f.map((x) => (
                          <li key={x} className="flex items-start gap-2.5">
                            <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <span className="text-zinc-300 text-[13px] leading-relaxed">{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Production pairing">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Story and Belief go raw and handheld.</b> Phone, outdoor or car, casual indoor. The rough edge is the point.</>,
                    <><b className="text-white font-semibold">Teach and Show go to the desk.</b> Direct to camera, office or studio, so it reads as authoritative.</>,
                    <><b className="text-white font-semibold">The text hook is always burned in.</b> Numbers and key lines reinforced on screen.</>,
                    <><b className="text-white font-semibold">Every comment keyword maps to a real asset.</b> Build the asset before the post goes live.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Do">
                <BulletList
                  items={[
                    'Decide the content type and framework before writing.',
                    'Separate the on screen text hook from the spoken hook.',
                    'Open on the contradiction or the number in line one.',
                    'Use real, specific figures that are yours.',
                    'Remove the viewer blame early.',
                    'Give one clear enemy, and coin one memorable line.',
                    'One beat per line. Loop the payoff back to the hook and land it.',
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Do not">
                <BulletList
                  items={[
                    'Do not preamble or introduce yourself.',
                    'Do not give the whole answer in the hook. Hold the loop open.',
                    'Do not chase likes and views as the goal. The quiet post often sells best.',
                    'Do not add a softener after the point has already landed.',
                    'Do not teach a generic tactic with no personal proof behind it.',
                    'Do not invent numbers. Use yours, or mark it to fill.',
                    'Do not stack competing CTAs.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'training' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The training</p>
            <H2>Walkthrough videos.</H2>
            <Note>Training for the media crew.</Note>
            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-4">Short form</p>
              <Walkthroughs items={SHORT_FORM_TRAINING} />
            </div>
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-4">Long form</p>
              <Walkthroughs items={LONG_FORM_TRAINING} />
            </div>
            <div className="mt-10">
              <Block label="How to use these">
                <BulletList
                  items={[
                    'Anyone shooting or cutting watches the short form three before their first shoot day.',
                    'The long form three are for whoever owns the YouTube build, not the whole team.',
                    'They explain the how. The Content and Production tabs hold the what and the when.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'system' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The system</p>
            <H2>The operating system.</H2>
            <Note>Four phases, each one built on the last. The belief map is the foundation. Skip it and everything you produce is noise.</Note>
            <div className="mt-8">
              <a
                href="/assets/content-authority-operating-system.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block glow-card border-blue-500/20 p-8 transition-colors hover:border-blue-500/40"
              >
                <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-3">The reference</p>
                <p className="font-display text-[20px] font-extrabold text-white mb-2">Content Authority Operating System</p>
                <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">
                  PDF, 15 pages. Foundation, Architecture, Execution, Optimise.
                </p>
                <span className="text-zinc-500 text-[13px] group-hover:text-blue-400 transition-colors">Open</span>
              </a>
            </div>
            <div className="mt-10">
              <Block label="The four phases">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Foundation.</b> The belief map. What your audience believes now, and what they have to believe to buy.</>,
                    <><b className="text-white font-semibold">Architecture.</b> How the buckets, formats and assets get arranged on top of those beliefs.</>,
                    <><b className="text-white font-semibold">Execution.</b> Making it. This is where the walkthroughs sit.</>,
                    <><b className="text-white font-semibold">Optimise.</b> Reading the data and recutting to what is working.</>,
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'next' && (
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Responsibilities</p>
          <H2>Who owns what.</H2>
          <Note>One role each, and the weekly output that goes with it. If a line here has no name against it, it does not happen.</Note>
          <div className="mt-8">
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full min-w-[40rem] text-left">
                <thead>
                  <tr className="bg-elevated/60">
                    {['Person', 'Role', 'Weekly', 'Owns'].map((h) => (
                      <th key={h} className="px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-500 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { who: 'Doza', role: 'Talent', wk: '4', owns: 'Direct to cam ×2, mystery ×1, series ×1. Under management series ideas. Brings the ideas that came out of calls.' },
                    { who: 'Billy', role: 'Head of content', wk: '-', owns: 'Runs the Tuesday meeting and the idea form. Pre production, post production, approval, captions and posting. Flags good moments live on the calls.' },
                    { who: 'Ryan', role: 'Coach', wk: '3', owns: 'Show and tell ×1, coaching ×1, mystery shop ×1. Brings three things he is excited about to Tuesday. Flags his monthly office visit dates.' },
                    { who: 'Sophie', role: 'Coach', wk: '3', owns: 'Coaching ×1, direct to cam ×1, pop quiz ×1. Brings three beliefs to break. Nominates one office hours block as the capture container.' },
                    { who: 'Operator', role: 'Shooter', wk: '-', owns: 'Turns up, shoots, exports and sends back. Two cameras where possible. Nothing lands on the team.' },
                    { who: 'Strategist', role: 'External', wk: '-', owns: 'Stencils per format. Monthly session with the crew, and sits in on the media jam when possible. Weekly jam with Billy for the first four weeks.' },
                  ].map((r) => (
                    <tr key={r.who} className="border-t border-zinc-800/70 align-top">
                      <td className="px-4 py-4 font-display text-[15px] font-extrabold text-white whitespace-nowrap">{r.who}</td>
                      <td className="px-4 py-4 text-zinc-300 text-[13px] whitespace-nowrap">{r.role}</td>
                      <td className="px-4 py-4 text-blue-400 text-[15px] font-semibold tabular-nums">{r.wk}</td>
                      <td className="px-4 py-4 text-zinc-400 text-[13px] leading-relaxed">{r.owns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <Section>
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-3">The measure</p>
                <p className="text-white text-[16px] leading-relaxed font-medium">
                  Four weeks is the cycle. Ease, energy, output. Change what the data tells you to change, then go again.
                </p>
              </div>
            </Section>
          </div>
        </Wrap>
        )}

        {/* ═══════════════ INDEX ═══════════════ */}
        <Divider />
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Index</p>
          <H2>Everything in here.</H2>
          <Note>Six tabs. Click anything to jump straight to it.</Note>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {TABS.map((t) => (
              <div key={t.id} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                <p className="font-display text-[15px] font-extrabold text-white mb-3">{t.label}</p>
                <div className="flex flex-col items-start gap-1.5">
                  {t.sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => changeSec(s.id)}
                      className={`text-left text-[14px] transition-colors ${
                        sec === s.id ? 'text-blue-400 font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Wrap>

        <Footer />
        {capture && <CaptureModal onClose={() => setCapture(false)} />}
      </div>
    </PasswordGate>
  );
}
