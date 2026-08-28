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
    label: '4 / 5 · 5 on short form',
    note: 'Not the constraint. Ads can inflate this on demand. Strong on short form, softer across long form and everywhere else.',
  },
  {
    name: 'Authority',
    score: 3,
    label: '3 / 5',
    note: 'Named frameworks and unique principles are the gap. Very little "this is the TGA way" content exists. Authority cannot outrun a clarity of 2.',
  },
  {
    name: 'Lead quality',
    score: 4,
    label: '4 / 5',
    note: 'Leads arrive pre sold and ready to buy. Hard to attribute between the podcast, YouTube and the live events, but the assets are doing their job.',
  },
  {
    name: 'Content quality',
    score: 2,
    label: '2 / 5 · subjective',
    note: 'The room rated its own work going out.',
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
    note: 'Expertise is tool set and skill set. Clients love his passion. Better with someone directing than alone. Gold Coast based, so a monthly two hour shoot plus office hours capture on Fridays.',
  },
  {
    who: 'Sophie',
    count: '3',
    lane: 'Direct to camera on belief and reframes. Pop quiz. Coaching call Q&A.',
    note: 'The only formally qualified coach on the team. Strength is going a level deeper, breaking beliefs and reframing on live calls. Weekly prompt: three things everyone needs to hear right now, or the belief you broke this week.',
  },
  {
    who: 'Nate',
    count: '-',
    lane: 'Production pipeline. Gap spotting.',
    note: 'Production is not the bottleneck when the team is aligned on the one thing. Flagged ideation as the real constraint.',
  },
  {
    who: 'Billy',
    count: '-',
    lane: 'Capture on the ground. Sophie office hours container.',
    note: 'Sits in on the calls with Doza. The stuff between calls is where the content ideas come from. Joins the weekly media meeting.',
  },
  {
    who: 'Pete',
    count: '-',
    lane: 'Ads and testimonial structure.',
    note: 'Co owns the ad and testimonial thinking with the head of content. Recent launch performed strongly with no pitch. Replay running three days at $600 a day, tracking toward roughly $10k profit before the charity contribution.',
  },
  {
    who: 'AC',
    count: '-',
    lane: 'Podcast ownership. Creative connector.',
    note: 'Owns topics, episode framework, hook opportunities, reach and growth. Editing stays in house under her direction and guidelines. Contract not yet signed, needs context and a proper onboarding session.',
  },
  {
    who: 'Freelance shooter',
    count: '-',
    lane: 'Two hours, once or twice a month, Gold Coast.',
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

// ─── Tabs ────────────────────────────────────────────────────────────────

type TabDef = { id: string; label: string; blurb: string; sections: Array<{ id: string; label: string }> };

const TABS: TabDef[] = [
  {
    id: 'brand',
    label: 'Brand',
    blurb: 'The two brands and the job each one does. What is working, what is hard, and the principles underneath every format decision.',
    sections: [
      { id: 'today', label: 'Today' },
      { id: 'brands', label: 'The Brands' },
      { id: 'workhard', label: 'Work / Hard' },
      { id: 'principles', label: 'Principles' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    blurb: 'Capture and Create is the only split that changes how the work gets made. Then the formats that fill each bucket, and the series that make them recognisable.',
    sections: [
      { id: 'capture', label: 'Capture / Create' },
      { id: 'formats', label: 'Formats' },
      { id: 'series', label: 'Series' },
    ],
  },
  {
    id: 'production',
    label: 'Production',
    blurb: 'Ten a week across three people. The lanes, the weekly rhythm, and the four assets that sit outside the ten and need their own decisions.',
    sections: [
      { id: 'cadence', label: 'Ten a week' },
      { id: 'lanes', label: 'Lanes' },
      { id: 'rhythm', label: 'Rhythm' },
      { id: 'assets', label: 'Assets' },
    ],
  },
];

const SECTION_TAB: Record<string, string> = Object.fromEntries(
  TABS.flatMap((t) => t.sections.map((s) => [s.id, t.id])),
);

function scrollToNav() {
  const anchor = document.getElementById('plan-tabs');
  if (!anchor) return;
  const top = anchor.getBoundingClientRect().top + window.scrollY - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

function usePlanNav() {
  const [sec, setSec] = React.useState<string>(() => {
    if (typeof window === 'undefined') return 'today';
    const s = new URLSearchParams(window.location.search).get('s');
    if (s && SECTION_TAB[s]) return s;
    const t = new URLSearchParams(window.location.search).get('t');
    const found = TABS.find((x) => x.id === t);
    return found ? found.sections[0].id : 'today';
  });

  const tab = SECTION_TAB[sec] ?? 'brand';

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
    frame: 'Five is the whole target. The week is about clearing the backlog and getting the rhythm in, not output. Who fills the five gets decided at Tuesday.',
    jobs: [
      { who: 'Doza', job: 'Batch direct to cameras in one sitting. Graphics get layered on afterwards.' },
      { who: 'Head of content', job: 'Book the Tuesday media meeting and the Thursday shoot. Build the idea submission form so ideas arrive by Monday. Allocate the five.' },
      { who: 'Ryan', job: 'Bring three things you are excited about to Tuesday, for show and tell. Flag your monthly office visit dates.' },
      { who: 'Sophie', job: 'Nominate one weekly office hours block as your capture container. You are doing the call anyway.' },
      { who: 'Billy', job: 'Sit in on the calls. Flag the good moments live, at the source, rather than hunting for them afterwards.' },
      { who: 'Nate', job: 'Watch the pipeline for gaps. Own the production standard on the new lanes.' },
      { who: 'Strategist', job: 'Turn the board into stencils, one per format. Source a freelance shooter on the Gold Coast.' },
    ],
    close: 'Thursday shoots for week 2. Never for Monday.',
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
      { who: 'Head of content', job: 'Hold the Tuesday and Thursday rhythm. Get AC contracted and onboarded with real context.' },
      { who: 'Strategist', job: 'Weekly session with Doza on formats and hooks, so live directing moves in house.' },
      { who: 'Pete', job: 'Rework the testimonial and ad structure around association. Doza plus coach in frame before the client.' },
    ],
    close: 'A one week buffer now exists between shoot and publish. Target two.',
  },
  {
    id: 'w3',
    chip: 'Week 3',
    output: 'Ten',
    headline: 'Hold ten. Re-cut to strengths.',
    frame: 'Two weeks in it is obvious who is better at what. Reallocate slots, then start testing the things we deliberately left open.',
    jobs: [
      { who: 'Head of content', job: 'Reallocate the ten to strengths. Set dress the two Gold Coast office rooms.' },
      { who: 'Strategist + Doza', job: 'Hook test. Around 15 trial reels on Under Management before a single episode gets built.' },
      { who: 'Ryan', job: 'Freelance shooter visit. Two hours. Q&A capture plus two mystery shops in the same trip.' },
      { who: 'Sophie', job: 'Run the pop quiz against the mystery shop. Are they different enough to run both.' },
      { who: 'Doza', job: 'One direct to camera with a visual behind, one without. Compare them properly.' },
      { who: 'AC', job: 'Podcast topics, episode framework and hooks. Bring micro niche topic sourcing into the ideation loop.' },
    ],
    close: 'Ten should hold without heroics. If it needs heroics, that is the finding.',
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

function FourWeeks({ onJump }: { onJump: (sec: string) => void }) {
  const [wk, setWk] = React.useState('w1');
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
              Do not read the rest of this page first. Find your name, do your line, come back. The ramp is deliberate.
            </p>

            {/* the ramp */}
            <div className="grid grid-cols-4 gap-1.5 mb-7">
              {WEEKS.map((w) => {
                const on = w.id === wk;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWk(w.id)}
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

            <p className="text-zinc-400 text-[14px] leading-relaxed mt-5 italic">{week.close}</p>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-white text-[15px] font-medium">
                The only KPI for 30 days: <span className="text-blue-400">did the work go out.</span> Not a banger.
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

// ─── Sub tab row ─────────────────────────────────────────────────────────

function SubTabs({ sections, active, onChange }: { sections: Array<{ id: string; label: string }>; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
            active === s.id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-200'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function GeronimoThePlan() {
  const { tab, sec, changeTab, changeSec } = usePlanNav();
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PasswordGate storageKey="geronimo-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="The Plan · Geronimo"
          description="The Strategy Day, bucketed by core function. Diagnosis, decisions, principles, formats, cadence, and who does what from Monday."
          path="/geronimo-theplan"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Operational · Strategy reference"
          title="The"
          accent="Plan."
          blurb="The whole Strategy Day, bucketed by core function. Where the bottlenecks are. What we decided. What gets built first. Reference back to this. The four week run sheet lives separately."
          backHref="/geronimo"
          backLabel="Geronimo"
        />
        <Divider />

        {/* ─── PINNED · START HERE ─── */}
        <FourWeeks onJump={changeSec} />
        <Divider />

        {/* ─── PINNED · THE DIAGNOSIS ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The diagnosis</p>
          <H2>The bottleneck scores.</H2>
          <Note>Self rated in the room, out of five. The first four run in sequence, each one downstream of the last. This is the frame for everything in the three tabs below.</Note>
          <div className="mt-8">
            <Scores items={SCORES} />
          </div>
          <div className="mt-10">
            <Block label="Why the order matters">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Clarity is first contact.</b> If they cannot tell who it is for and what it is against, they bounce, and everything downstream is damaged.</>,
                  <><b className="text-white font-semibold">Visibility only pays off once clarity is up.</b> Ramp reach on an unclear profile and you show more people something confusing.</>,
                  <><b className="text-white font-semibold">Authority answers "is this guy legit and different".</b> That is frameworks, principles, named mechanisms.</>,
                  <><b className="text-white font-semibold">Quality is the last mile.</b> With clarity, visibility and authority in place, the right assets compress trust and the lead converts.</>,
                ]}
              />
            </Block>
            <Block label="The honest read from the room">
              <BulletList
                items={[
                  'Audience reaction to TGA today: excited and curious when things are in motion. Underwhelmed and confused the rest of the time.',
                  'Clients are not paying us to be as good as they are. They are paying us to be bigger.',
                ]}
              />
            </Block>
          </div>
        </Wrap>

        {/* ─── STICKY NAV · TWO LEVELS ─── */}
        <div id="plan-tabs" className="sticky top-0 z-40 border-y border-zinc-800 bg-base/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4 space-y-3">
            <div className="-mb-10">
              <Tabs tabs={TABS.map((t) => ({ id: t.id, label: t.label }))} active={tab} onChange={changeTab} />
            </div>
            <SubTabs sections={current.sections} active={sec} onChange={changeSec} />
          </div>
        </div>

        {/* ─── TAB INTRO ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">{current.label}</p>
          <p className="text-zinc-400 text-[15px] md:text-[16px] leading-relaxed max-w-2xl">{current.blurb}</p>
        </Wrap>
        <Divider />

        {/* ═══════════════ BRAND ═══════════════ */}
        {sec === 'today' && (
          <>
        {/* ─── 1 · THE NUMBERS TODAY ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">01 · Today</p>
          <H2>The numbers on the table.</H2>
          <Note>Where the account actually sits before anything changes.</Note>
          <div className="mt-8">
            <BulletList
              items={[
                <>Self book from Instagram accounts for roughly <b className="text-white font-semibold">two to three bookings a month</b> through the profile link.</>,
                <>Current output sits at around <b className="text-white font-semibold">three pieces a week</b>.</>,
                <>No carousel has gone out on TGA in <b className="text-white font-semibold">six to seven months</b>.</>,
                'One clip typically goes out per podcast episode.',
                'Separation Sunday is the strongest owned format. One carousel did roughly 26k views with hundreds of comments off a comment CTA. Every carousel Doza has ever posted has been a Separation Sunday.',
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">02 · Decide</p>
          <H2>TGA first. Hey Doza parked.</H2>
          <Note>Two brands, two jobs. Separating them is what stops content getting confused, and stops the wrong phone calls coming in.</Note>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Brand 01 · TGA</p>
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
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Brand 02 · Hey Doza</p>
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The founder brand.</b> Life by design, business by design. The founder version of the story.</>,
                  'Audience: founders and operators beyond the fitness niche. Speaking, ventures, partnerships.',
                  'Signalling job: attract inbound. Come and talk to my team, industry bodies, other ventures.',
                  'Kept separate so gym owner content does not generate the wrong inbound, and founder content does not confuse studio owners.',
                  'The M528 vision book already carries both storylines, the TGA version and the founder version.',
                  'Parked until TGA is running.',
                ]}
              />
            </div>
          </div>
          <div className="mt-10">
            <Block label="The rule that came out of it">
              <BulletList
                items={[
                  'If the category belongs to Hey Doza, it does not go on TGA, and the reverse. Transplanting content across is what blurred both.',
                  'There is one podcast, not two. A Hey Doza podcast is a later conversation.',
                  'A third lane exists in the background, AI powered systems and tooling. Not a TGA category.',
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">03 · Working</p>
          <H2>What works. What is hard.</H2>
          <Note>Do more of the left column before inventing anything. The right column is what the people doing the work named honestly.</Note>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Working</p>
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Volume at the right moment.</b> The summit weekend, an obnoxious amount of undeniable content, was the best sales weekend on record.</>,
                  <><b className="text-white font-semibold">Documenting.</b> Content that shows what actually happened yesterday. In motion, alive, no friction in making it.</>,
                  <><b className="text-white font-semibold">Things in motion.</b> Events, workshops, boat days. Audiences respond to momentum and members respond hardest.</>,
                  <><b className="text-white font-semibold">Signalling.</b> High effort, very high leverage. Drives the inbound that turns into speaking and partnerships.</>,
                  <><b className="text-white font-semibold">Energy.</b> Named as the biggest single differentiator. It is the brand.</>,
                  <><b className="text-white font-semibold">Reactions.</b> Doza, Ryan, Sophie, the team reacting to wins and moments. If we are excited, they get excited.</>,
                  <><b className="text-white font-semibold">Speed and will.</b> Nobody is dragging anyone, and when the team decides they turn things around fast.</>,
                  <><b className="text-white font-semibold">The formats already invented.</b> Mystery shop especially. No reason it cannot run three times per coach per week.</>,
                  <><b className="text-white font-semibold">Retention.</b> Content in motion is the most underrated retention mechanism there is.</>,
                  <><b className="text-white font-semibold">It sells in the room.</b> Someone at the workshop saw the playbook on the board and changed her read on the business on the spot.</>,
                ]}
              />
            </div>
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Hard</p>
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Ideation.</b> No cracked process, so it never feels good. The number one hard thing on both brands.</>,
                  <><b className="text-white font-semibold">Getting ahead.</b> Always chasing the tail. The next thing has to go out this week, so there is never a buffer.</>,
                  <><b className="text-white font-semibold">Manpower.</b> No shortage of ideas. A shortage of hands.</>,
                  <><b className="text-white font-semibold">Strategy.</b> We know what we need to do, but we are not doing it.</>,
                  <><b className="text-white font-semibold">Organisation.</b> Too many moving parts across coaches, calls, events and edits.</>,
                  <><b className="text-white font-semibold">Inconsistent energy.</b> Sometimes it is there, sometimes it is not, and that changes the whole output.</>,
                  <><b className="text-white font-semibold">The mundane.</b> Four days out of five the coaches are on calls, not doing epic things.</>,
                  <><b className="text-white font-semibold">We made it harder than it needs to be.</b> The stuff that worked was fast and simple. Somewhere the process took over.</>,
                  <><b className="text-white font-semibold">Doza wants to be the talent.</b> The say something to camera job has been plugged into every meeting and it drags.</>,
                  <><b className="text-white font-semibold">Too much, none of it dialled.</b> Lots of formats started, nothing taken to repeatable before moving on.</>,
                  <><b className="text-white font-semibold">Concentration risk.</b> Roughly a quarter of the business rides on Doza personally. With five or six faces it becomes around 15% each.</>,
                  <><b className="text-white font-semibold">Podcast clips underperform.</b> Low views, not dialled, pushed to people who do not know us.</>,
                  <><b className="text-white font-semibold">Post production drain.</b> Finding the good moments inside long recordings is a real cost.</>,
                  <><b className="text-white font-semibold">Carousels take too long</b> and nobody enjoys making them.</>,
                  <><b className="text-white font-semibold">VA context.</b> Already hit this. Without deep context, outsourced content comes back as AI slop.</>,
                ]}
              />
            </div>
          </div>
        </Wrap>
          </>
        )}

        {sec === 'principles' && (
          <>
        {/* ─── 4 · PRINCIPLES ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">04 · Principles</p>
          <H2>The rules underneath every format.</H2>
          <Note>This is the reusable part. Every format decision below sits on top of these.</Note>
          <div className="mt-8">
            <Cards
              cols={2}
              items={[
                { title: 'Simplicity wins', body: 'Everything does the same job realistically. The shortest line between A and Z is usually how the good stuff happened.' },
                { title: 'Do more of what already worked', body: 'Find the low effort, high leverage thing you have already done that worked, and do it again. We do not need to reinvent anything.' },
                { title: 'Everything is teaching', body: 'A story teaches through experience. A belief teaches through worldview. Education teaches through steps. A show teaches through demonstration. Same job, different vehicle.' },
                { title: 'Everything is proof', body: 'Every piece reinforces the positioning. Which is why there is no proof bucket, and why traditional testimonials are not required at all.' },
                { title: 'One specific person', body: 'Someone has to self identify in the first seconds. Hyper specific beats broad every time. If I owned a Pilates studio and had 365 days to make $500k.' },
                { title: 'Hooks are the biggest lever', body: 'Dream outcome, minus the thing they do not want to do. Test 15 trial reels on different hooks before committing to a series.' },
                { title: 'Niche viral beats viral', body: 'Pull on the things people inside the industry recognise. The software screen, the spreadsheet, the studio layout. That is the best outcome available.' },
                { title: 'Trojan horse', body: 'Do not make the win the whole video. Wrap the point inside something relevant and visual, so the right person watches for their own reasons.' },
                { title: 'Lesson, not gloat', body: 'Point at the client. These guys crushed it and this is exactly what they did.' },
                { title: 'Reinforcers', body: 'Common belief, then weight from what is right, then a reinforcer. The reinforcer can be data, a story, a mechanism, or a client who already did it.' },
                { title: 'Shots on goal, fast feedback', body: 'Frequency up, feedback loop tight. Someone over your shoulder saying good, bad, more of that. It took Jay about four weeks to click.' },
                { title: 'Answer the question in the answer', body: 'The single most important habit for turning calls into content. Repeat the question back, set the frame, then answer clearly.' },
                { title: 'Format wins', body: 'A good format works every time regardless of who is in it. Everyone wants to be a fly on the wall.' },
                { title: 'Lanes over ideas', body: 'Fixed weekly lanes remove reliance on inspiration. Extra ideas layer on top, so nothing breaks when the ideas dry up.' },
                { title: 'Calibrate, then pour', body: 'Less is more first. Get four to six core types working, then layer everything else on a foundation that holds.' },
                { title: 'Visuals as reinforcement', body: 'Draw and show only when it reinforces the point. Take the viewer on a journey rather than drawing for the sake of it.' },
                { title: 'Know how they actually watch', body: 'Our owner is distractible and half the time the phone is in a car cradle or in their hand in the queue at Bunnings. A talking head with nothing on screen loses them.' },
              ]}
            />
          </div>
          <div className="mt-10">
            <Block label="Two mechanics worth naming">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The idea matrix.</b> Everyone puts ideas up, then the room ranks them on effort against leverage. Low effort and high leverage ships immediately. How fast can we get an MVP out, can we test it with trial reels in twenty minutes. Everything else gets cut or parked. This is the missing ideation process.</>,
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">05 · Content</p>
          <H2>Capture and Create.</H2>
          <Note>The organising split that replaced the pillar debate. Buckets like proof and authority collapsed under scrutiny because every good piece already does both. This is the only division that changes how the work gets made, and therefore who does it and when.</Note>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="glow-card p-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Bucket 01 · Capture</p>
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
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Bucket 02 · Create</p>
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">05 · Formats</p>
          <H2>The format library.</H2>
          <Note>Everything discussed, with the note that matters for each. Create needs a decision and a shoot. Capture only needs a camera pointed at something already happening.</Note>
          <div className="mt-8">
            <div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: 'Green screen · Create',
                    body: 'A favourite format because it is supposed to look rough. Decent lighting is enough. Do not be a static head in one spot, move the graphic or move yourself. You can hijack anything: an article, a logo wall, a P&L, a membership dashboard, a Stripe screen, a beautiful Pilates studio, handwritten notes behind your head. Numbered checklists behind the head work because they signal a track the viewer can follow.',
                  },
                  {
                    title: 'React to news · Create',
                    body: 'Respond to an article, a gym acquisition, a chain selling for billions, and borrow its authority. React to what is happening around you in the industry. Workshopped in the room: the Pilates manager who resigned over a promotion misunderstanding. Hook: imagine quitting your job for the ultimate opportunity and it blows up.',
                  },
                  {
                    title: 'React to wins · Create',
                    body: 'Clients post wins in the community every Tuesday, hundreds of them. A free, weekly, renewable input. Frame as a lesson, not a gloat. Hook shapes: if I wanted to add $120k in the next 90 days, these are the only three things I would focus on. Raise the stakes, then point at someone who has already done it. Show a real screen where you can.',
                  },
                  {
                    title: 'This vs that · Create',
                    body: 'Anonymised client numbers. Red against green. Where they started, what changed, where they are now. A spreadsheet reads as more identifiable to a studio owner than a polished graphic. Getting permission is a simple conversation and almost everyone says yes.',
                  },
                  {
                    title: 'Direct to camera · Create',
                    body: 'Handheld with a little motion. Static is where the drop off lives. Three sentences at a time, then reset. It is hard at first, you get into the rhythm. Two variants to run, one with a visual behind the head and one without. Doza can rip five in a sitting and layer graphics afterwards.',
                  },
                  {
                    title: 'Show and tell · Create',
                    body: 'The Ryan lane. Check out this tool, live, interactive, showing the thing working. Needs light and something genuinely happening on screen. Simple frame to hand him: what it is, what it does for you, how to use it, why it is different. The AI tool he built is the unique mechanism.',
                  },
                  {
                    title: 'Coaching call Q&A · Capture',
                    body: 'The highest volume renewable source in the business. Doza, Sophie and Ryan all run them. Two cameras wherever possible, one close and one wider. Zoom clips will never look great, so set up properly for the calls we intend to use. Requires training the habit: repeat the question, set the frame, then answer.',
                  },
                  {
                    title: 'Interview style capture · Capture',
                    body: 'The unlock for Ryan and Doza both. Someone off camera asks the question and they answer a person rather than a lens. Kills the preach energy that shows up in face to camera. Side cam plus operator. Same setup as the Jay Q&A: half an hour, two cameras, 30 reels.',
                  },
                  {
                    title: 'Mystery shop · Capture',
                    body: 'Already proven, already loved, zero setup. Can be done anywhere within the hour and anyone can run it, so it is not dependent on Doza. Call ahead so they are expecting it, then shoot. Batch it into whatever shoot is already happening. Sibling format worth trying: hand someone 60 seconds to fix one specific thing in a real business.',
                  },
                  {
                    title: 'Pop quiz · Capture',
                    body: 'New series. Call our own clients and their managers and quiz them on KPIs and standards. What it signals is standards, and people love the standards. Best version to test: call the manager while the owner listens in and capture the owner reaction. Suspense and stakes. Test it against mystery shop.',
                  },
                  {
                    title: 'Makeovers · Create',
                    body: 'Before and after for the industry. Print the ad, mark it up, show what it became and what it produced. Satisfying the way chiropractic videos are. Works at every level of the customer base: ads, org structure, role structure, the calendar.',
                  },
                  {
                    title: 'Mission content · Create',
                    body: 'Documenting the mission to end burnout in the industry, day 273 and counting. Members get behind it hard, so it is a retention and validation play as much as acquisition. Needs reframing to matter to strangers: stakes, relatability, relevance. Doubles as an internal comms channel, because clients do not read hundreds of Slack channels but they do open Instagram.',
                  },
                ].map((c) => (
                  <div key={c.title} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">06 · Series</p>
          <H2>The series.</H2>
          <Note>A series is repeatable for us and recognisable for the viewer. Anchor points, a storyline, and a hook they know like a theme tune.</Note>
          <div className="mt-8">
            <Rows
              rows={[
                { name: 'Mystery Shop', status: 'Proven', detail: 'Call a studio cold and shop them live. Proven, loved, zero setup. Scale it.' },
                { name: 'Pop Quiz', status: 'Test', detail: 'Quiz our own clients and managers on KPIs and standards. New. Test it against mystery shop to confirm they are different enough to run both.' },
                { name: '20 Studios to $1M by Christmas', status: 'Flagship', detail: 'Behind the scenes on taking 20 studios to a million dollars. Weekly update, what changed, what they did. Fed by the new 12 week coaching room. Doza fronts it.' },
                { name: 'Under Management', status: 'Test', detail: 'Total revenue under management as the headline number and the storyline. Highest leverage of the lot. Hook test before building it.' },
                { name: 'Separation Sunday', status: 'Proven', detail: 'The owned, trademarkable weekly format. Best performing carousel line by a distance. Unlock the repeatability.' },
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
                  <><b className="text-white font-semibold">Nail the hook before you commit.</b> Run around 15 trial reels on different hooks. The hook is the single biggest lever on a signature series.</>,
                  <><b className="text-white font-semibold">Recognisability is the point.</b> Anchor points, a consistent storyline, a hook people can hear coming from the other room.</>,
                  <><b className="text-white font-semibold">Stakes and relevance.</b> A story only works if something is on the line and the viewer sees themselves in it.</>,
                  <><b className="text-white font-semibold">Every tip hyper specific.</b> The outcome has to be visible in the first five seconds.</>,
                  <><b className="text-white font-semibold">Consider a scoreboard</b> for the 20 studios series. Anonymised or self chosen names, fortnightly, who do you think wins.</>,
                  <><b className="text-white font-semibold">Guard against fence sitting.</b> A long running series can make people wait and watch instead of buying. Frame each episode so it stands alone and gives something away now.</>,
                  <><b className="text-white font-semibold">Separate the two big series.</b> Under Management and 20 Studios stay distinct so each gets its own leverage.</>,
                ]}
              />
            </Block>
          </div>
        </Wrap>
          </>
        )}

        {/* ═══════════════ PRODUCTION ═══════════════ */}
        {sec === 'cadence' && (
          <>
        {/* ─── 7 · CADENCE ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">07 · Cadence</p>
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
                  <><b className="text-white font-semibold">The 30 day KPI is not a banger.</b> It is whether we can reliably get the ten out.</>,
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">07 · Lanes</p>
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">08 · Rhythm</p>
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
                  <><b className="text-white font-semibold">Weekly strategy sessions</b> between Doza and the strategist for the first month, on formats and especially hooks, so live directing on set becomes possible in house.</>,
                  <><b className="text-white font-semibold">The MDS call can be pre engineered.</b> Call topics are known three months out, so hooks and short teach moments get written into the call in advance with two cameras capturing.</>,
                  <><b className="text-white font-semibold">Sophie container.</b> One of her office hours every week, with Billy present. She is doing the call anyway.</>,
                  <><b className="text-white font-semibold">Ryan container.</b> His Friday office hours plus a monthly shoot when he is at the main office. Flag the dates at the start of each month.</>,
                  <><b className="text-white font-semibold">Batching maths.</b> A coach fields around 15 questions in an hour. If only one or two a week are usable, that still fills a month.</>,
                  <><b className="text-white font-semibold">A gentler on ramp is allowed.</b> Two or three weeks of the easiest possible content to get the backlog underneath us, then step up.</>,
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
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">09 · Assets</p>
          <H2>Podcast, carousels, ads, sets.</H2>
          <Note>The four assets that sit outside the weekly ten and need their own decisions.</Note>
          <div className="mt-8">
            <Block label="Podcast · the asset is right, the engineering is the gap">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">The diagnosis.</b> Clips underperform. Unfiltered got treated as unedited and un engineered. We shoot a whole 45 to 60 minute episode in one run assuming everything said is usable. When Doza is interviewing, the value comes from the guest and the usable content drops.</>,
                  <><b className="text-white font-semibold">The Dane podcast reference.</b> A collaborative pre call with the producer. If you were giving a TED talk, what would it be about. A live document with must have questions per section, model answers, and follow up prompts. Live directing during the record. Deliberate alley oops, because a guest who feels great posts the episode themselves.</>,
                  <><b className="text-white font-semibold">The Gold Coast sessions reference.</b> We stopped, named the topic, and went again. Close to the best thing that has happened to the format. Hooks were built in advance rather than hunted for afterwards, and the clips worked because the questions were already in demand.</>,
                  <><b className="text-white font-semibold">Guest categories.</b> Pure value, which builds our authority directly, against audience leverage, someone our people already follow. Also industry experts with a report or trend data, adjacent service providers where studio owners already spend money, and internal episodes on our own frameworks.</>,
                  <><b className="text-white font-semibold">Brokers especially.</b> Nobody talks about it and everyone is interested. Can be 20 to 30 minutes. Sample hook: you have sold over $100 million in businesses, what are the mistakes every gym owner makes.</>,
                  <><b className="text-white font-semibold">Nobody owns the central podcast seat for this industry.</b> That is the opening. Build the ideal guest list and let AC own the growth of it the way a media buyer owns spend.</>,
                ]}
              />
            </Block>
            <Block label="Carousels · high leverage, bad use of internal hours">
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
                  'Emulate the current room in the two spare offices at the Gold Coast site rather than hunting for a new space. Two set rooms means two people can run calls at once.',
                  'Two cameras wherever possible for Q&A and coaching calls. One close, one wide, cut between them.',
                  'A small media wall or screen. Hard to source at a size that fits the offices, still on the list.',
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

        {/* ═══════════════ PINNED · THE COMMITMENTS ═══════════════ */}
        <div className="border-t-2 border-blue-500/30">
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Always on</p>
            <H2>What we committed to.</H2>
            <p className="text-zinc-400 text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
              This part sits under every tab. What is locked for four weeks, what is deliberately still open, what could quietly kill it, and who owns what from Monday.
            </p>
          </Wrap>
        </div>

        {/* ─── 10 · RISKS ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">10 · Risks</p>
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
        <Divider />

        {/* ─── 11 · LOCKED ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">11 · Locked</p>
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
                'Weekly Doza and strategist sessions for the first month, focused on hooks and formats.',
                'Carousels get outsourced with strict guidelines, not made in house.',
                'Proof content starts fresh rather than continuing the inconsistent text format.',
                'Podcast episodes get engineered. Prep, live document, live directing, stop and retake.',
                'AC owns podcast topics, framework, hooks and growth, with editing in house under her direction. Subject to the contract being signed and a scoping meeting.',
                'Two office rooms at the Gold Coast site get set dressed to match the current room.',
                'A freelance shooter comes in for Ryan. Roughly two hours, once or twice a month.',
                'The 30 day KPI is consistency of output, not a viral hit.',
              ]}
            />
          </div>
        </Wrap>
        <Divider />

        {/* ─── 12 · OPEN ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">12 · Open</p>
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
        <Divider />

        {/* ─── 13 · NEXT MOVES ─── */}
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">13 · Next moves</p>
          <H2>Where the four weeks start.</H2>
          <Note>Sequenced by owner. Do not start the next thing until the previous is shipped or scheduled.</Note>
          <div className="mt-8">
            <Rows
              rows={[
                { name: 'Strategist', status: 'Flagship', detail: 'Turn the board into the finished plan. Formats, hooks, stencils per lane. Run weekly sessions with Doza for the first month. Source a freelance shooter on the Gold Coast.' },
                { name: 'Doza', status: 'Flagship', detail: 'Batch direct to camera pieces. Front the 20 Studios series. Get comfortable answering questions off camera. Bring ideas to the weekly media meeting.' },
                { name: 'Head of content', status: 'Flagship', detail: 'Run the weekly media meeting. Build the idea submission and approval flow. Confirm the meeting and shoot days. Get AC contracted and onboarded with real context. Set dress the two Gold Coast office rooms and keep hunting the small media wall, plus prompter units, clamp lights and second cameras.' },
                { name: 'Ryan', status: 'Test', detail: 'Bring three things I am excited about to each media meeting for show and tell. Flag his monthly office visit dates. Run mystery shops.' },
                { name: 'Sophie', status: 'Test', detail: 'Bring three things everyone needs to hear right now, or the belief broken that week. Run pop quizzes. Nominate one weekly office hours block as the capture container.' },
                { name: 'Billy', status: 'Test', detail: 'Sit in on the calls. Capture the Sophie weekly container. Flag good moments live rather than after the fact.' },
                { name: 'Nate', status: 'Test', detail: 'Watch the pipeline for gaps as volume triples. Own the production standard on the new lanes.' },
                { name: 'AC', status: 'Test', detail: 'Own podcast topics, episode frameworks, hooks and growth. Set editing guidelines. Bring micro niche topic sourcing into the ideation loop.' },
                { name: 'Pete', status: 'Test', detail: 'Rework the testimonial and ad structure around association. Doza plus coach in frame before the client.' },
              ]}
            />
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

        <Footer />
      </div>
    </PasswordGate>
  );
}
