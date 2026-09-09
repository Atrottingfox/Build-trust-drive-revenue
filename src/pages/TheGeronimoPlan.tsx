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

// ─── The checklist ───────────────────────────────────────────────────────
// Assembled from the Strategy Day and the media jam on 31 August. Every line
// has an owner. Nothing here needs a meeting to start. Ticks save to the
// device only, so they are a personal marker rather than a shared record.

type Task = { id: string; do: string; why: string; owner: string };
type TaskGroup = { group: string; note: string; tasks: Task[] };

const CHECKLIST: TaskGroup[] = [
  {
    group: 'This week',
    note: 'One off. Set these up and they never need doing again.',
    tasks: [
      { id: 'thu', do: 'Lock Thursday as the shoot day.', why: 'Religious, no matter what. It shoots what was approved, for the week after, never for Monday.', owner: 'Whole team' },
      { id: 'form', do: 'Stand up the idea form.', why: 'Ideas go in Monday so they can be approved or killed before Tuesday. There has to be a chance for somebody to kill an idea.', owner: 'Billy' },
      { id: 'bank', do: 'Build a dead simple way to bank an idea.', why: 'One place to say this is banked, the moment it lands. If it is hard, it will not get used.', owner: 'Billy' },
      { id: 'elements', do: 'Name the five elements of the offer.', why: 'Video 1 is written apart from these. Nothing else is blocking it.', owner: 'Doza' },
      { id: 'ads', do: 'Gather the before and after ad examples.', why: 'One clear pair for each of the five ad mistakes, so the makeover video has real proof on screen.', owner: 'Doza' },
      { id: 'playbook', do: 'Get the updated offer price playbook out.', why: 'It becomes the downloadable asset behind the mid roll CTA.', owner: 'Sophie' },
      { id: 'intro', do: 'Build the intro for the offer price video.', why: 'Then run the same process again on the next one without help.', owner: 'Billy' },
    ],
  },
  {
    group: 'Every week',
    note: 'The rhythm. Once this is running, it is the whole machine.',
    tasks: [
      { id: 'three', do: 'Everyone brings their three.', why: 'Ryan three things he is excited about. Sophie three beliefs she broke this week. Doza the ideas that came out of calls.', owner: 'Doza, Ryan, Sophie' },
      { id: 'mon', do: 'Ideas in Monday, through the form.', why: 'Approved or killed before Tuesday, so the meeting is a decision not a brainstorm.', owner: 'Everyone' },
      { id: 'tue', do: 'Tuesday media meeting, straight after the call.', why: 'While the material is still hot. Ideas pulled up one by one.', owner: 'Billy' },
      { id: 'prep', do: 'Ten minute check the day before the shoot.', why: 'Is everyone prepped for tomorrow. Any questions. That is the whole meeting.', owner: 'Billy' },
      { id: 'shootweek', do: 'Coaches shoot every single week.', why: 'Deliberately, even when it is not perfect, because that is how the recipe gets found.', owner: 'Ryan, Sophie' },
      { id: 'review', do: 'Watch last week back and call it.', why: 'This was good, this was bad, do more of this. Without someone looking over your shoulder the frequency never lifts.', owner: 'Strategist' },
      { id: 'twocam', do: 'Two cameras wherever possible.', why: 'One camera is boring. Two is what makes a captured call watchable.', owner: 'Billy' },
    ],
  },
  {
    group: 'Before the series gets built',
    note: 'The hook is the biggest lever on a signature series. Do not skip to the episode.',
    tasks: [
      { id: 'hooks', do: 'Run the hook trials on Under Management.', why: 'Trial reels on different hooks before a single episode gets built. Number still to be confirmed.', owner: 'Strategist and Doza' },
      { id: 'popquiz', do: 'Test both versions of the pop quiz.', why: 'One straight, and one where you call the manager while the owner listens in, so you catch their reaction too.', owner: 'Sophie' },
    ],
  },
];

function Checklist() {
  const KEY = 'geronimo-checklist';
  const [done, setDone] = React.useState<Record<string, boolean>>({});
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch { /* private mode, ticks just do not persist */ }
  }, []);
  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };
  return (
    <div className="space-y-10">
      {CHECKLIST.map((g) => (
        <div key={g.group}>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-1">{g.group}</p>
          <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">{g.note}</p>
          <div className="border-t border-zinc-800">
            {g.tasks.map((t) => {
              const isDone = !!done[t.id];
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggle(t.id)}
                  className="w-full text-left flex items-start gap-3 border-b border-zinc-800/70 py-4 hover:bg-elevated/40 transition-colors px-2 -mx-2"
                  aria-pressed={isDone}
                >
                  <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-[10px] ${isDone ? 'border-blue-500 bg-blue-500 text-white' : 'border-zinc-700'}`}>
                    {isDone ? '✓' : ''}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block font-display text-[15px] font-extrabold leading-snug ${isDone ? 'text-zinc-600 line-through' : 'text-white'}`}>{t.do}</span>
                    <span className={`block text-[13px] leading-relaxed mt-1 ${isDone ? 'text-zinc-700' : 'text-zinc-400'}`}>{t.why}</span>
                  </span>
                  <span className="flex-shrink-0 text-[11px] uppercase tracking-widest font-semibold text-zinc-500 pt-1 whitespace-nowrap">{t.owner}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Past shoot · first of September ─────────────────────────────────────
// Hooks are lifted verbatim from Sean's notes of 1 September, off the media
// jam of 31 August. They are not paraphrased and must not be. Every beat
// carries the job it does in the structure, so Doza knows what each one is
// FOR rather than just riffing.
// Anything marked SLOT was not said and must not be invented.

type Beat = { role: string; text: string };

type SFOutline = {
  n: string; title: string; lens: string; format: string;
  textHook?: string; spoken: string[];
  // Alternates, when the room wrote more than one hook and the pick happens on
  // the day. Rendered as numbered options. `spoken` is ignored when this is set.
  hookOptions?: string[][];
  beats: Beat[];
  // Optional, because some scripts fold the close into the last beat rather
  // than landing a separate line. Absent means deliberate, not missing.
  payoff?: string; cta?: string; fill?: string;
};

const SHORT_FORM_SHOOT: SFOutline[] = [
  {
    n: '01', title: 'Your business, your rules',
    lens: 'Belief · Contrarian take', format: 'Green screen reaction',
    textHook: 'Stop apologising',
    spoken: ["Just a reminder.", "It's your business, and your rules.", "You can do whatever the fuck you want to do."],
    beats: [
      { role: 'Common belief', text: 'Everyone thinks that to run their business profitably, they SLOT. Owners spending all their time catering to member demands.' },
      { role: 'My belief', text: 'I actually side with the owners on this one.' },
      { role: 'Proof', text: 'I speak to owners all day long, and I tell them they can build a business how ever they want.' },
      { role: 'The line', text: 'SLOT. Where it sits for you, between service and being run by your members.' },
    ],
    payoff: 'Choose what you want.',
    cta: 'SLOT.',
  },
  {
    n: '02', title: 'Standards',
    lens: 'Belief · Contrarian take', format: 'Direct to camera',
    textHook: 'Walk out and watch',
    spoken: [
      "If you want to run a million dollar studio you actually want to turn up to every day,",
      "Your members need to stop paying for your presence, and start paying for your standards.",
      "This is how we do it,",
      "Design your dream team. but don't do it with names",
    ],
    beats: [
      { role: 'Common belief', text: 'SLOT. What owners think they are being paid for.' },
      { role: 'Proof', text: "Owners are sending DMs saying you've just shown me how to hold standards. This is the thing landing hardest right now." },
      { role: 'The pattern', text: 'Part of being a leader is building leaders, not followers.' },
      { role: 'What it looks like', text: 'SLOT. A standard actually being held with you not in the room.' },
    ],
    payoff: 'SLOT. The line they leave with.',
    cta: 'SLOT. Points at the separation system playbook.',
  },
  {
    n: '03', title: 'A team full of casuals',
    lens: 'Belief · Contrarian take', format: 'Direct to camera',
    textHook: 'Nobody holds the line',
    spoken: ["I've never built a happy million dollar studio with a team full of casuals."],
    beats: [
      { role: 'Common belief', text: 'SLOT. Why owners keep hiring casual.' },
      { role: 'The diagnosis', text: 'Semi-pro. 60% things done.' },
      { role: 'The move', text: "Design your dream team, but don't do it with names." },
      { role: 'Why', text: 'SLOT. Why the names wreck it. The rule is written down, the reason is not.' },
    ],
    payoff: 'Gotta go pro.',
  },
  {
    n: '04', title: 'Acts of service',
    lens: 'Belief · Common mistakes', format: 'Direct to camera',
    textHook: 'You cover everything',
    spoken: ['Part of being a leader as a business owner is about building leaders.', 'Not just getting followers.'],
    beats: [
      { role: 'The mistake', text: 'Most people have acts of service. So they will self sacrifice. That is why they burn out.' },
      { role: 'What to do instead', text: 'SLOT. How it shows up day to day, in your words.' },
      { role: 'Proof', text: 'SLOT.' },
    ],
    payoff: 'Otherwise how the fuck are you going to bring your kids to Yo-Chi.',
    fill: 'Written twice in the notes. Probably the one to shoot first.',
  },
  {
    n: '05', title: 'Winning the day',
    lens: 'Teach · Framework', format: 'Direct to camera',
    textHook: 'Win Christmas',
    spoken: ['Everyone at this time of the year, everyone thinks they gotta do more.', 'But you gotta adopt a different standard.', "It's win the day."],
    beats: [
      { role: 'Ideal outcome', text: 'You win the season. You win Christmas.' },
      { role: 'The maths', text: 'If you win more weeks, you win the season.' },
      { role: 'The steps', text: 'SLOT. The five daily non negotiables, named, in order.' },
    ],
    payoff: 'Self confidence is a byproduct of doing the things you said you would do.',
    fill: 'Payoff is from the 31 August call, not these notes.',
  },
  {
    n: '06', title: 'Churn, and what Defender proved',
    lens: 'Show · Case study', format: 'Direct to camera',
    textHook: 'Bang bang bang',
    spoken: [
      "If you're getting f*cked by churn like 40% of all gyms do during August.",
      'This is exactly what you should do.',
      'We just wrapped up [to fill]. And [to fill].',
      "Most people would've hit 10%.",
      'But our people who ran defender season went down to 1%.',
      'And this is the tldr of what they did.',
      '3 things.',
    ],
    beats: [
      { role: 'Thing one', text: 'Winning the day.' },
      { role: 'Thing two', text: 'SLOT.' },
      { role: 'Thing three', text: 'SLOT.' },
    ],
    payoff: 'SLOT.',
    cta: 'SLOT. Comment keyword for the Defender breakdown.',
    fill: 'CONFIRM the 40% August figure before this goes to camera. It is a placeholder. The verified numbers are 10% plus a month, and under 1% across the last three months.',
  },
];

// Every long form intro runs the same shape. Hook, then the transition, then
// the proof anchor, promise, plan, early CTA. The proof anchor is identical
// every time, so it lives here once.
const DOZA_PROOF = "I built two gyms to $1M+ in revenue, sold both, now I coach 400 gym and studio owners inside Geronimo Academy to make their first million or their next million.";

type LFOutline = {
  n: string; title: string; lens: string;
  textHook: string;
  promise: string[];
  plan: string;
  beats: Beat[];
  payoff: string; cta?: string; fill?: string;
};

const LONG_FORM_SHOOT: LFOutline[] = [
  {
    n: '01', title: 'The offer',
    lens: 'Teach \u00b7 long form',
    textHook: 'Free trials',
    promise: [
      "Every single profitable studio changed their offer to what we're about to teach.",
      'Every million dollar studio has these 5 elements to their offer. First thing we do with every single one.',
      "SLOT. Every single million dollar studio we've worked with has had the ...",
    ],
    plan: "Every single studio owner in our academy that is growing faster than you, and this is why they're profitable, why they're getting lead flow, it's down below so let's get into it.",
    beats: [
      { role: 'The pain', text: 'Keep attracting low quality prospects.' },
      { role: 'The trap', text: "Free trials. Most people think if I can't get people in I'll do a free trial, so you open it up to everyone, and you get shit people through the door." },
      { role: 'The cost', text: "And if you're getting paid ads running, you're paying money for negative cashflow, then your SLOT." },
      { role: 'Unfinished', text: 'SLOT. If every time you open up your ...' },
      { role: 'Story, personal', text: 'And when I was losing money, it was the thing I did. I was chasing everyone else.' },
      { role: 'The numbers', text: 'It was $2 for the first time each, then I went to 35 for $7. $2 became the new free trial. And $7. $136 dollars for 28 days.' },
      { role: 'The accident', text: 'I accidentally said the wrong number once and it went from free to $249 for the same thing.' },
      { role: 'Element one', text: 'SLOT.' },
      { role: 'Element two', text: 'SLOT.' },
      { role: 'Element three', text: 'SLOT.' },
      { role: 'Element four', text: 'SLOT.' },
      { role: 'Element five', text: 'SLOT.' },
    ],
    payoff: "This is why they're not getting leads.",
    cta: "This is an example of what they've done.",
    fill: 'The five elements are the blocker. Everything else on this video is written. Production: split screen, or Doza in front of the screen walking through it. Show the inside out, the templates from the playbook and what is inside each one. You do not know if there are snakes or skittles in the box, so show what is in the box.',
  },
  {
    n: '02', title: "Why your ads aren't working",
    lens: 'Show \u00b7 long form',
    textHook: 'Lighting money on fire',
    promise: [
      "Every million dollar studio has figured this out, in fact some of them are teaching it inside our academy, and once you figure this out you never have to worry about where your next lead is coming from.",
      "And the next time you get a cancellation in your inbox, you don't have to worry about it because you have two more turning up tomorrow, so fuck em.",
      'An owner fixes these five things, their next problem becomes how do I close all these sales.',
    ],
    plan: "Everybody makes these 5 major ad mistakes. I'm about to show you exactly why these ads aren't working. We fix the lead flow problem in about a day.",
    beats: [
      { role: 'The pain', text: 'Lighting money on fire.' },
      { role: 'The blame', text: 'The last agency told you it was your creative, but every single time you build more ads.' },
      { role: 'The grind', text: "The revenue's been the same for months, and it's fucking exhausting. You keep opening up the inbox and there's another cancellation." },
      { role: 'The cause', text: "And it's because you haven't worked out how to get predictable lead flow." },
      { role: 'Context, answer', text: 'Do you even know if your ads are performing. What metrics to consider. What are the objections.' },
      { role: 'The point', text: "The point of studios is to build a studio of members that pay full price and are here this time next year, and they refer people. It's not just to fill seats, it's to fill it with people you want to be around, and that's how you build a business that you love." },
      { role: 'Current belief', text: "If not happy with bank is I'll get anyone." },
      { role: 'Required belief', text: "You're going to enjoy business more if you find more of the right people, and ignore everyone else." },
      { role: 'Analogy', text: "Not raid the pantry when you're hungry but to still get people in the door." },
      { role: 'Story, personal', text: 'SLOT.' },
      { role: 'The maths', text: "$72 CPLs with a $40 a day budget. How many 72s fit in 40? None. You could be okay with 72 CPLs if you convert one in every two of them, which makes it $140 CAC." },
      { role: 'The metric trap', text: "Your creative can look like it's working. Heaps of clicks, heaps of leads, a CPL that reads great. And none of them live near you, or match the avatar." },
      { role: 'Mistake one', text: 'Generic copy. Come join us.' },
      { role: 'Mistake two', text: 'Generic creative. Model shots, AI slop.' },
      { role: 'Mistake three', text: 'No avatar.' },
      { role: 'Mistake four', text: 'No offer. No mechanism, no promise pain gap, no bridge from here to there.' },
      { role: 'Mistake five', text: 'Sell the click not the membership.' },
      { role: 'The proof', text: 'Before and afters.' },
    ],
    payoff: 'Attribute you to a process.',
    cta: 'Book it in for an audit. Mid roll, if you want an example.',
    fill: "Two cuts. Pilates, this is what we changed. And gym owners. Working title, where Pilates studio owners are fucking up. Lines not placed yet: consistency of leads coming through. Getting leads, but not the ones you want to work with. You're still trying to work out whether you should sell a reformer bed to get an instructor you don't even like at the end of the month. They all want to become new leaders. We're going to learn some ... People resonate with who they want to become. Relaxed and has the ... Your creative is working, and ... Production: two videos out of one setup, one reaction and one walkthrough. Doza can do this blind, open an ad library cold, say why it is not getting leads and name the specific fix. Before and afters on every one of the five mistakes. Starting point on the real account was $78 CPLs.",
  },

];

// ─── This shoot · 10 and 11 September ────────────────────────────────────
// Built live on the media jam of 8 September, cross checked against Sean's
// own written notes from the same call. Spoken hooks are the words the room
// actually landed on. Nothing is paraphrased into something nobody said, and
// anything marked SLOT was never captured. Do not invent it.
// Three owners, three posts each. More outlines than slots on purpose.

type ShootLane = { id: string; label: string; who: string; note: string; outlines: SFOutline[] };

const RYAN_SHOOT: SFOutline[] = [
  {
    n: '01', title: 'Winning ideas in 30 seconds',
    lens: 'Show · Demonstration', format: 'Phone, filmed over the shoulder',
    spoken: [],
    hookOptions: [
      [
        "If you're stuck for content ideas and you're wondering every single week, what should I be posting?",
        "There's a stupid simple way, and it's only going to take you 30 seconds.",
      ],
      [
        "If I hear another gym owner say they're stuck for content ideas, I'm gonna throw a dumbbell at em.",
      ],
      [
        'If coming up with content ideas is ruining your week, this is probably why.',
        "Every week one of our X (Number) members asks 'Ryan, surely there's a way I can make content for my Gym with AI that isn't going to embarrass my bloodline' so I can spend more time with my family?",
      ],
    ],
    beats: [
      { role: 'Common belief', text: "Everybody still thinks you gotta buy a pro camera, Come up with the ideas on the fly And dance for the algorithm, Or, the others just leave it up to ChatGPT, throw everything into a melting pot, and post content that screams 'I kinda suck at this' The truth is, you don't need any of that, You don't even need five hours a week." },
      { role: 'The promise', text: "This is the secret sauce of how we market in 2026, and I'm going to break it down in the next 30 seconds, because it has everything you need to make content that actually brings in qualified leads this week if you do it right. And the best part is, nobody will even know it's AI, and here's why." },
      { role: 'Why it works', text: "You're not gonna ask chat GPT to work out who it's for. Just like I did for this video, I knew exactly who I was talking to. And that is the secret of why this works. Because step one is, Identifying who your million dollar member is." },
      { role: 'Step two', text: 'Click generate.' },
      { role: 'Step three', text: 'Pick up your phone and film it in the next 30 minutes.' },
      { role: 'Step four', text: 'Go and do literally anything else with your time,' },
    ],
    payoff: "It's 2026. If you think you need an expensive camera and four days to come up with content ideas that actually get you members, you're about to see just how easy it is.",
    cta: 'Because when you get it by commenting "Content" it\'s gonna blow your mind',
    fill: "Ryan's own words, three hooks, pick on the day. Two gaps to close before camera. The member count in hook 3, X (Number), needs the real figure. And the CTA trails off in the notes at 'the first', so finish that line. Shoot it on the phone, over the shoulder, so the ease is visible rather than claimed. Do not explain the member profile step first, nobody watched last Friday's post. Both Hayley and Doza flagged this one as a lead magnet.",
  },
  {
    n: '02', title: "You don't find A players, you build them",
    lens: 'Belief · Reframe', format: 'Direct to camera. The tool stays off screen.',
    spoken: [
      "Imagine finding your dream employee. The A player that's gonna help you scale your revenue and shoot past your goals.",
      'Then you go ahead and catastrophically fumble the onboarding.',
      'Not only have you wasted 6 weeks and the money, but you still have to go find someone else.',
      'You now gotta go back into hiring mode, and do it all over again',
      'But instead - consider this.',
      'What if in 30 seconds, you knew instead of how to hire one, how to build one from scratch.',
      "We have a whole tool for this, but here's the TLDR version of our 30/60/90 framework.",
    ],
    beats: [
      { role: 'Common belief', text: 'Instead of trying to hunt a unicorn and buying another bucket of stress.' },
      { role: 'The reframe', text: 'You got an opportunity to build one and it all happens in the first 90 days.' },
      { role: 'Day 30, I go', text: 'In the first 30 days, show them how to do their job. This is I go.' },
      { role: 'Day 60, we go', text: 'Next 30 days, you show them.' },
      { role: 'Day 90, you go', text: "Then the last thirty, they do it on their own. You sign off when you're confident they can do it and they've proven they can." },
    ],
    payoff: 'You can hunt unicorns and chase rainbows, or you just build one so they are loyal for life.',
    cta: 'SLOT. It points at the framework, never at the tool.',
    fill: "Ryan's own words. Don't make it about the tool, make it about the problem and let the tool be the relief, so you get the right Claude nerds rather than every Claude nerd. Hayley's rule holds too, teach the basics and let the fast lane stay behind the paywall. One to look at before camera: day 60 reads as a repeat of day 30. On the call Ryan described we go as doing it with them. 30/60/90 is named inside the tool but is not in school anywhere, flag that separately.",
  },
  {
    n: '03', title: 'The king of Tamworth',
    lens: 'Show · Case study', format: 'Direct to camera or green screen',
    spoken: [
      "If I was running a rural gym, this is the first thing I'd do before I change anything else.",
      "I wouldn't do ads, I wouldn't post content. Literally, I wouldn't do any marketing. Until I did this one thing",
      "And it's so painfully obvious, you're gonna hate me when I tell you. Because most of the time, people think they've already done it.",
    ],
    beats: [
      { role: 'Current reality', text: "Or, like a guy I know - they think ads don't work. That there's not enough people in the town to make it worthwhile." },
      { role: 'The start', text: "He was making 29k, but everyone came in on referral, so it was an easy sell. Until it wasn't, and things slowed down." },
      { role: 'What changed', text: 'So, he made one simple change. And started having an avatar, instead of advertising a gym. He went from selling the gym to selling the solution.' },
      { role: 'First', text: "There's only three steps. First - Get dialled on your avatar. One person. One problem. One solution. Anyone can do it, you literally can immediately after this video." },
      { role: 'Second', text: 'Second, Advertise it properly. Like a real business owner. Which is exactly what you are. This is the critical step.' },
      { role: 'Third', text: 'And third - Go have your cake, and eat it to.' },
      { role: 'The result', text: 'Because this guy grew to 45k per month, bought his dream truck within six months, and did it all of it while his wife was pregnant with their first child.' },
      { role: 'The name', text: 'And now we call him the king of Tamworth. All he did was make a decision. One that you can make right now. Who is your avatar?' },
    ],
    fill: "Ryan's own words. The close is folded into the last beat, so there is no separate payoff line. Confirm the numbers and the truck with Ryan before camera. He is the place for mums in Tamworth to come and get strong, and the avatar reads broad on paper and landed anyway because they know their area. Step two is the mediaverse play, which is the step you fulfil.",
  },
];

const SOPHIE_SHOOT: SFOutline[] = [
  {
    n: '01', title: 'Bare minimum, outstanding result',
    lens: 'Belief · Reframe', format: 'Direct to camera',
    spoken: [
      'If I followed you around with a surveillance crew, 24 hours a day, seven days a week.',
      'Would you believe what you say your ambition is, based on your actions? A mentor asked that once and it completely threw me',
    ],
    beats: [
      { role: 'The example', text: "I had a call yesterday with someone who told me the new way of running ads doesn't work. So we unpacked it, bit by bit. So I could help him get the thing pumping And he did all the right things. Kinda. He did half of the right things, Half the right way, With half the effort. But it wasn't even his fault, because like all of us. he had 28,000 other things to do in in his business, So he just wanted to tick the box and get the job done" },
      { role: 'Common belief', text: "Issue is, we get so caught in thinking it's about doing more, that we half ass 99% of the things we think we should do," },
      { role: 'The pattern', text: "And that's kinda the big trap. I've done it myself - as I'm sure you have too. 10% effort, 10% of the result, and the final verdict comes in at \"Nothing works\" We end up playing business whack a mole. Band aid fix everything, staying busy, and unfortunately never having the energy or attention to break through the thing that is actually holding us back." },
      { role: 'Why I can ask it', text: 'That question was asked of me, by one of my mentors. And it changed my life.' },
    ],
    payoff: "Because sometimes we don't need to do more work. We need to go deeper on the work we're already doing.",
    fill: "Sean's rewrite, in his words. The hook is now the mentor's question straight up, the example runs before the common belief, and it closes on the payoff with no separate CTA. Keep the mentor attribution in, it is the thing that keeps this out of guru territory.",
  },
  {
    n: '02', title: 'Play to win',
    lens: 'Belief · Reframe', format: 'Direct to camera',
    spoken: [],
    hookOptions: [
      [
        'If you were playing to win in your business, what would that actually look like?',
        "Because the decision you're about to make is probably the one that just avoids losing.",
        'And there is a much braver one sitting right next to it.',
      ],
      [
        "Most owners make their biggest decisions from the smallest version of themselves, and they don't even notice they're doing it.",
        'They shrink to their constraint, instead of rising to the goal they set.',
        "I'll show you exactly what it looks like, and you're going to recognise yourself in it.",
      ],
    ],
    beats: [
      { role: 'Common belief', text: 'When it gets tight, the instinct is to protect what you have got. So you make the decision from the fear of losing, rather than from the vision you set.' },
      { role: 'The example', text: 'SLOT. I was on a call last week and, then the story. Sean built the shape in the room and the call was never picked.' },
      { role: 'Where it shows up', text: 'Staff and standards. Hiring. The conversation you keep putting off. Giving someone a proper role and actually handing them the KPI.' },
      { role: 'The move', text: "So ask it properly. If I was playing to win here, in line with the vision I've actually got, what decision would I make?" },
      { role: 'What happens', text: 'It is usually a much braver decision. And most people never even considered it, because the instinct under pressure is to shrink.' },
    ],
    payoff: 'Play to win. Then go and make the brave decision today, instead of the safe one you were going to make anyway.',
    cta: 'SLOT. One ask. A keyword in the comments, or a DM.',
    fill: "Verbatim from the jam: the hook, shrink to their constraint, decisions through fear, the braver decision they never considered, and where it shows up. The second hook, the connective lines and the payoff are drafted. Play to win is the internal theme, so it is language the team already lives in. The example is the blocker, pick the call before Thursday because the video opens on it.",
  },
  {
    n: '03', title: 'The necessary conversation',
    lens: 'Teach · Framework', format: 'Direct to camera, sitting down. No graphic.',
    spoken: [
      'The hardest decision is knowing whether you should push an employee, or whether you should let them go.',
      "And right now you want me to give you permission to let them go. I'm not going to. Not yet.",
      "Because there's a framework we run first, and most owners have never done a single part of it.",
    ],
    beats: [
      { role: 'Common belief', text: 'They think they have to play boss. So they avoid the conversation, because nobody ever showed them how to have one.' },
      { role: 'The symptom', text: "You put up with subpar results and behaviour. You normalise it. You stop holding the team accountable. You hold on to people you know you shouldn't. And you hire two people to do one person's job." },
      { role: 'Why', text: "Most owners are acts of service. You're a people pleaser, you don't want to upset anyone, and you want to be liked. So you bleed for months, procrastinating on the conversation." },
      { role: 'The reframe', text: "We don't call them tough conversations. We call them necessary conversations." },
      { role: 'The line', text: "These businesses can make good money. Not if you're hiring two people to do one person's job because you didn't want to have a necessary conversation." },
      { role: 'Before you decide', text: "Sack or keep. Run the framework first. Because if you haven't done your bit, set the clarity from the start and actually given the feedback, it isn't their fault yet." },
      { role: 'The framework', text: 'SLOT. C, O, A, C, H, one line each. The five words were never said on the jam.' },
    ],
    payoff: "Sometimes they don't have more in them, and that's fine. But you're delaying the inevitable by avoiding the conversation, and it's your business that pays for it.",
    cta: 'SLOT. Drafted option: comment COACH and she sends the framework. Confirm the keyword and where it points.',
    fill: "Verbatim from the jam: the hook Sean tested and the room picked, play boss, every symptom, acts of service, necessary not tough, the two people for one job line, sack or keep, and the payoff. The second and third hook lines and the framework framing are drafted. Chocolate broccoli warning from the room: they want permission to sack someone, so hook line two answers it head on and holds the line. Art direction is decided, say it so it stands without graphics because captions are running anyway. Overlay the letters in post only if it reads cohesive. A chalkboard only if it becomes a visual model, and it is not one.",
  },
  {
    n: '04', title: '400 members with the ads off',
    lens: 'Show · Case study', format: 'Green screen, chalkboard, or split screen against the hot seat recording',
    spoken: [
      'Imagine hitting 400 members without running paid ads.',
      'One of our studios turned theirs off 21 weeks ago and grew 25% anyway.',
      'And it started with a promise he made to his members that most owners would never be brave enough to make.',
    ],
    beats: [
      { role: 'Common belief', text: 'Everyone thinks growth comes from turning the ads up. So the second it slows down, you put the budget up.' },
      { role: 'Why members', text: 'And if you know, you know. The 300 club. Get to 300 members and you are in the milli. He is past 400.' },
      { role: 'The start', text: 'He came to us at 20k a month. He is at 120k now. Three years.' },
      { role: 'The pledge', text: "His members gave him feedback. We don't care about sales, we're not here to sell memberships, we sell connection. So he made them a pledge. For the next 12 weeks the ads are off, we're just focusing on you." },
      { role: 'What happened', text: 'He grew 25% in revenue across 21 weeks. 8.5 sales a week on average, with nothing running. One open week put on 54 signups. And he has kept the ads off ever since.' },
      { role: 'The four steps', text: 'SLOT. Four things he did, unpacked on the hot seat and never captured on the jam. Pull them off the recording, one line each.' },
    ],
    payoff: '400 members. No ad spend. He looked after the people already in the room.',
    cta: 'SLOT. Drafted option: comment a keyword and she sends the four steps he ran. Confirm the keyword.',
    fill: "Verbatim from the jam: the hook Doza landed, the 300 club, 20k to 120k over three years, ads off, 25% across 21 weeks, 8.5 sales a week, 54 signups from one open week, and the pledge in his own words. The common belief, the connective lines and the payoff are drafted. Do not justify it, Sean in the room: you do not need to qualify everything, the story carries it. The quadrant was drawn on the iPad during the hot seat, so the drawing already exists on the Zoom if split screen is the treatment. Kai recapping the same hot seat is queued behind this one.",
  },
];

const DOZA_SHOOT: SFOutline[] = [
  {
    n: '01', title: 'Straight off the pod',
    lens: 'Teach · Recap', format: 'Direct to camera, on the pod set, the second filming stops',
    spoken: [],
    beats: [
      { role: 'The prompt', text: 'What did you just do? What did you just teach someone? Walk us through it.' },
      { role: 'The frame', text: 'This is the problem I just solved for this audience. These were the five things I took them through on the pod. This is the payoff.' },
      { role: 'Why now', text: 'He is already on the set, already in flow, already in talking mood. He can quick fire it back.' },
    ],
    payoff: 'SLOT.',
    fill: "Doza's three TGA pieces were never planned on the jam. Sean called it himself at the end: we didn't get Dozer's ideas, I don't know how that went straight over my head. This solves one to two of them for nothing, off filming that is happening anyway. Billy runs the prompt the moment the pod stops. The third piece is still open.",
  },
];

const SHOOT_LANES: ShootLane[] = [
  { id: 'ryan', label: `Ryan · ${RYAN_SHOOT.length}`, who: 'Ryan', note: 'Demonstration. What he built, what it does, who it saves. Batched, because there is no point flying a shooter in for three reels.', outlines: RYAN_SHOOT },
  { id: 'sophie', label: `Sophie · ${SOPHIE_SHOOT.length}`, who: 'Sophie', note: 'Belief. Three ideas plus a result. Four outlines against three slots, so be ruthless. Built out to the same depth as Ryan, but in her register rather than his, so read them out loud before camera and cut anything that is not how she talks. Each fill note says which lines are hers from the jam and which are drafted.', outlines: SOPHIE_SHOOT },
  { id: 'doza', label: `Doza · ${DOZA_SHOOT.length}`, who: 'Doza', note: 'Nothing was planned for his three. This is the piece the day already gives you.', outlines: DOZA_SHOOT },
];

function SecondSeptShoot() {
  const [lane, setLane] = React.useState<string>('ryan');
  const current = SHOOT_LANES.find((l) => l.id === lane) ?? SHOOT_LANES[0];
  return (
    <div>
      <div className="border-b border-zinc-800 mb-5">
        <SubTabs
          sections={SHOOT_LANES.map((l) => ({ id: l.id, label: l.label }))}
          active={lane}
          onChange={setLane}
        />
      </div>
      <p className="text-zinc-500 text-[13px] leading-relaxed mb-5">{current.note}</p>
      <div className="grid gap-3">
        {current.outlines.map((o) => <ShootOutlineCard key={o.n} o={o} />)}
      </div>
    </div>
  );
}

const Slotted = ({ text }: { text: string }) => {
  if (!text.startsWith('SLOT')) return <span className="text-zinc-300 text-[13px] leading-relaxed">{text}</span>;
  const rest = text.replace(/^SLOT\.?\s*/, '');
  return (
    <span className="text-[13px] leading-relaxed">
      <span className="inline-flex items-center rounded-md border border-dashed border-zinc-700 px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold text-zinc-600 mr-2 align-middle">To fill</span>
      <span className="text-zinc-500">{rest}</span>
    </span>
  );
};

// The hook is the thing being shot, so it is the thing you can read across
// the room. Everything under it is scaffolding for the riff.
function ShootOutlineCard({ o }: { o: SFOutline }) {
  const format = o.format;
  const cta = o.cta;
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
      <div className="flex items-baseline gap-3 flex-wrap mb-1">
        <span className="text-blue-400 text-[12px] font-semibold tabular-nums">{o.n}</span>
        <p className="font-display text-[16px] font-extrabold text-white">{o.title}</p>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">{o.lens}</span>
      </div>
      {format && <p className="text-[12px] text-zinc-500 mb-3">{format}</p>}

      <div className="mt-3 mb-4 flex flex-wrap items-center gap-2">
        <span className="text-[9px] uppercase tracking-widest font-semibold text-zinc-600">Text</span>
        {o.textHook ? (
          <span className="rounded-md border border-zinc-700 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-medium text-white">{o.textHook}</span>
        ) : (
          <span className="rounded-md border border-dashed border-zinc-700 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-zinc-600">To fill</span>
        )}
      </div>

      {o.hookOptions ? (
        <div className="space-y-2 mb-5">
          {o.hookOptions.map((lines, i) => (
            <div key={i} className="rounded-lg border-l-2 border-blue-500 bg-zinc-950/50 px-4 py-3">
              <p className="text-[9px] uppercase tracking-widest font-semibold text-blue-400 mb-1.5">Hook {i + 1}</p>
              {lines.map((l, j) => (
                <p key={j} className="text-white text-[17px] leading-snug font-medium">{l}</p>
              ))}
            </div>
          ))}
          <p className="text-zinc-500 text-[12px]">Pick one on the day. Shoot all three if the energy is there.</p>
        </div>
      ) : (
        <div className="rounded-lg border-l-2 border-blue-500 bg-zinc-950/50 px-4 py-3 mb-5">
          {o.spoken.length > 0 ? (
            o.spoken.map((l, i) => (
              <p key={i} className="text-white text-[17px] leading-snug font-medium">{l}</p>
            ))
          ) : (
            <p className="text-[17px] leading-snug"><Slotted text="SLOT. The spoken hook. Never landed in the room." /></p>
          )}
        </div>
      )}

      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">The structure</p>
      <dl className="border-t border-zinc-800/70">
        {o.beats.map((b, i) => (
          <div key={i} className="flex gap-3 border-b border-zinc-800/70 py-2.5">
            <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[108px] flex-shrink-0 pt-1">{b.role}</dt>
            <dd><Slotted text={b.text} /></dd>
          </div>
        ))}
        {o.payoff && (
          <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
            <dt className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 w-[108px] flex-shrink-0 pt-1">Payoff</dt>
            <dd><Slotted text={o.payoff} /></dd>
          </div>
        )}
        {cta && (
          <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
            <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[108px] flex-shrink-0 pt-1">CTA</dt>
            <dd><Slotted text={cta} /></dd>
          </div>
        )}
      </dl>
      {o.fill && <p className="text-zinc-500 text-[13px] leading-relaxed italic mt-4">{o.fill}</p>}
    </div>
  );
}

function LongFormCard({ o }: { o: LFOutline }) {
  const Head = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mt-6 mb-2">{children}</p>
  );
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
      <div className="flex items-baseline gap-3 flex-wrap mb-1">
        <span className="text-blue-400 text-[12px] font-semibold tabular-nums">{o.n}</span>
        <p className="font-display text-[16px] font-extrabold text-white">{o.title}</p>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">{o.lens}</span>
      </div>

      <Head>Proof</Head>
      <p className="text-zinc-300 text-[13px] leading-relaxed">{DOZA_PROOF}</p>
      <p className="text-zinc-600 text-[11px] mt-1">Standard anchor. Same on every long form.</p>

      <Head>Promise</Head>
      <div className="space-y-1.5">
        {o.promise.map((x, i) => <p key={i} className="text-zinc-300 text-[13px] leading-relaxed"><Slotted text={x} /></p>)}
      </div>

      <Head>Plan</Head>
      <p className="text-zinc-300 text-[13px] leading-relaxed"><Slotted text={o.plan} /></p>

      <Head>The body</Head>
      <dl className="border-t border-zinc-800/70">
        {o.beats.map((b, i) => (
          <div key={i} className="flex gap-3 border-b border-zinc-800/70 py-2.5">
            <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[108px] flex-shrink-0 pt-1">{b.role}</dt>
            <dd><Slotted text={b.text} /></dd>
          </div>
        ))}
        <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
          <dt className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 w-[108px] flex-shrink-0 pt-1">Payoff</dt>
          <dd><Slotted text={o.payoff} /></dd>
        </div>
        {o.cta && (
          <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
            <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[108px] flex-shrink-0 pt-1">CTA</dt>
            <dd><Slotted text={o.cta} /></dd>
          </div>
        )}
      </dl>
      {o.fill && <p className="text-zinc-500 text-[13px] leading-relaxed italic mt-4">{o.fill}</p>}
    </div>
  );
}

function FirstSeptShoot() {
  const [lane, setLane] = React.useState<string>('short');
  return (
    <div>
      <div className="border-b border-zinc-800 mb-5">
        <SubTabs
          sections={[
            { id: 'short', label: `Short form · ${SHORT_FORM_SHOOT.length}` },
            { id: 'long', label: `Long form · ${LONG_FORM_SHOOT.length}` },
          ]}
          active={lane}
          onChange={setLane}
        />
      </div>
      <div className="grid gap-3">
        {lane === 'short'
          ? SHORT_FORM_SHOOT.map((o) => <ShootOutlineCard key={o.n} o={o} />)
          : LONG_FORM_SHOOT.map((o) => <LongFormCard key={o.n} o={o} />)}
      </div>
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
      { n: 'Curiosity loop', p: 'Reference something specific but do not reveal it yet.' },
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
      { n: 'Data and authority', p: 'Lead with a specific number that earns the right to teach.' },
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
      { n: 'Show the promise', p: 'Skip the setup entirely. Just promise the walkthrough.' },
      { n: 'Curiosity loop', p: 'Reference something specific but do not reveal it yet.' },
      { n: 'Data and authority', p: 'Lead with a specific number that earns the right to teach.' },
    ],
  },
};

type FrameworkStage = { stage: string; what: string };
type ShootRow = { id: Kind; who: string; types: string[]; fname: string; framework: FrameworkStage[]; shot: string };

const SHOOT_CARD: ShootRow[] = [
  {
    id: 'directcam',
    who: 'Doza ×2, Sophie ×1',
    types: ['Belief'],
    fname: 'Belief, why, flip, proof, rule',
    framework: [
      { stage: 'Belief', what: 'The belief they hold, said back to them in their own words.' },
      { stage: 'Why', what: 'Where it came from, so it is not their fault for holding it.' },
      { stage: 'Flip', what: 'What is actually true instead.' },
      { stage: 'Proof', what: 'One number, one client, one thing you have watched happen.' },
      { stage: 'Rule', what: 'What they do differently from here.' },
    ],
    shot: 'Handheld with a little motion. Three sentences at a time. One with a visual behind the head, one without. Text hook burned in, under seven words, and it never gives the answer away.',
  },
  {
    id: 'mystery',
    who: 'Doza ×1, Ryan ×1',
    types: ['Show'],
    fname: 'Test, call, fail, fix, cost',
    framework: [
      { stage: 'Test', what: 'The one thing you are shopping them on, decided before you dial.' },
      { stage: 'Call', what: 'Run it. Do not narrate over the top of it.' },
      { stage: 'Fail', what: 'The moment it goes wrong.' },
      { stage: 'Fix', what: 'Back to camera. What should have happened instead.' },
      { stage: 'Cost', what: 'What that one moment is worth to a studio.' },
    ],
    shot: 'Zero setup. Anyone can run it. Batch it into whatever shoot is already happening. Text hook on screen while it rings.',
  },
  {
    id: 'coaching',
    who: 'Ryan ×1, Sophie ×1',
    types: ['Teach'],
    fname: 'Question, frame, steps, rule',
    framework: [
      { stage: 'Question', what: 'Repeated back so it stands on its own without the call around it.' },
      { stage: 'Frame', what: 'Who this applies to, and what it is costing them.' },
      { stage: 'Steps', what: 'The answer, one step at a time.' },
      { stage: 'Rule', what: 'What they take away and use.' },
    ],
    shot: 'Captured off a call that is happening anyway. Two cameras where possible. Answer the question back in the response, always.',
  },
  {
    id: 'show',
    who: 'Ryan ×1',
    types: ['Show'],
    fname: 'What, does, how, different',
    framework: [
      { stage: 'What it is', what: 'One line. No preamble.' },
      { stage: 'What it does', what: 'The outcome it gives them, not the feature.' },
      { stage: 'How to use it', what: 'On screen, actually doing it.' },
      { stage: 'Why different', what: 'Against how they do it now.' },
    ],
    shot: 'Light, and something genuinely happening on screen. Tool open and ready before you roll.',
  },
  {
    id: 'popquiz',
    who: 'Sophie ×1',
    types: ['Show'],
    fname: 'Standard, question, answer, benchmark, signal',
    framework: [
      { stage: 'Standard', what: 'The KPI or standard you are testing.' },
      { stage: 'Question', what: 'Asked cold, no warning.' },
      { stage: 'Answer', what: 'Let it land, good or bad. Do not rescue it.' },
      { stage: 'Benchmark', what: 'What a good answer sounds like.' },
      { stage: 'Signal', what: 'What the answer says about standards.' },
    ],
    shot: 'The call is the capture. Same setup as a mystery shop. Worth testing with the owner listening in, so you get their reaction too.',
  },
  {
    id: 'series',
    who: 'Doza ×1',
    types: ['Story'],
    fname: 'Number, change, move, cost, shift, number',
    framework: [
      { stage: 'Number', what: 'Total revenue under management. Open on it.' },
      { stage: 'Change', what: 'What moved this week.' },
      { stage: 'Move', what: 'What they actually did to move it.' },
      { stage: 'Cost', what: 'What it cost them, or nearly cost them.' },
      { stage: 'Shift', what: 'What they understand now that they did not before.' },
      { stage: 'Number', what: 'Back to it, so the series compounds.' },
    ],
    shot: 'Doza fronts it. Fed by the new 12 week room.',
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
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-1">The framework</p>
                  <p className="font-display text-[15px] font-extrabold text-white mb-4">{r.fname}</p>
                  <div className="border-t border-zinc-800/70">
                    {r.framework.map((f) => (
                      <div key={f.stage + f.what} className="flex gap-3 border-b border-zinc-800/70 py-2.5">
                        <span className="text-white text-[13px] font-semibold w-[92px] flex-shrink-0">{f.stage}</span>
                        <span className="text-zinc-400 text-[13px] leading-relaxed">{f.what}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mt-6 mb-2">How it is shot</p>
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
      { id: 'thisshoot', label: 'This shoot' },
      { id: 'pastshoots', label: 'Past shoots' },
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
      { id: 'checklist', label: 'The checklist' },
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

        {/* ─── CAPTURE ─── */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-6 md:-mt-10 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCapture(true)}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-3 text-[15px] font-semibold text-white hover:bg-blue-500/20 transition-colors"
            >
              Capture an idea
            </button>
            <button
              type="button"
              onClick={() => changeSec('thisshoot')}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-elevated/40 px-6 py-3 text-[15px] font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              This shoot
            </button>
          </div>
          <p className="text-zinc-500 text-[13px] mt-3">
            Ideas in by Monday, so they get approved or killed before Tuesday. This shoot holds the outlines that came out of the last media jam.
          </p>
        </div>

        {/* ─── STICKY NAV · TABS AT THE TOP ─── */}
        <div id="plan-tabs" className="sticky top-0 z-40 border-y border-zinc-800 bg-base/95 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="pt-5 pb-4 -mb-10">
              <Tabs tabs={TABS.map((t) => ({ id: t.id, label: t.label }))} active={tab} onChange={changeTab} />
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

        {sec === 'thisshoot' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">This shoot</p>
            <H2>Second shoot of September.</H2>
            <Note>Thursday 10 September, the TGA media block in Sydney plus the podcast. Friday 11 September, the quarter day. Built on the media jam of 8 September. Hooks are the words the room actually landed on, not a tidy version of them. Under each one is the structure it follows, so you know what every beat is doing rather than riffing blind. Anything marked to fill was never captured and has not been invented.</Note>

            <div className="mt-8">
              <SecondSeptShoot />
            </div>

            <div className="mt-2">
              <Block label="Friday, the quarter day">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">The theme.</b> My job is to build leaders. It is not to do everything. Everything shot on Friday hangs off that line.</>,
                    <><b className="text-white font-semibold">The unveil.</b> The Pathway to Ownership. A ten year career in five stages, drawn as a DNA strand, because after stage three it twists into two. One strand for people, one for technical mastery. Either way it ends at ownership.</>,
                    <><b className="text-white font-semibold">The question it answers.</b> How do I get my team so bought in. To what. And to who. The answer is to create a future so big they can fit their future inside it. Why would they want to leave.</>,
                    <><b className="text-white font-semibold">Two reels, in order.</b> I love my job so much. Then, this is how you build leaders.</>,
                    <><b className="text-white font-semibold">Vox pops.</b> Biggest takeaway from the day, give me one sentence. Run the room. None of these go viral and that is fine, they are the ambience.</>,
                    <><b className="text-white font-semibold">Employer branding.</b> Every newbie is in the den for the first time. First impressions, camera on the inside, what it is like being part of Geronimo.</>,
                    <><b className="text-white font-semibold">The team angle.</b> What it is like working for someone who actually gives a shit about you. Claire's frame: come to a Geronimo leadership day with me, then, you know how many jobs I have had where they organise a day and I am dreading it.</>,
                    <><b className="text-white font-semibold">Rowan.</b> Capture the keynote for the archive. The cut that works is Doza's take cutting through to what Rowan is teaching, not a clip of Rowan alone. Introduce him as a character first. See this guy, he is our Chief Talent Officer. What, we have a Chief Talent Officer. For Empire 28 we do not want staff, we want partner energy.</>,
                    <><b className="text-white font-semibold">The ball pop quiz.</b> Quick fire pickleballs at whoever is answering on the mission and the core values. Claire volunteers as the target and the whole team will know it was her idea. This could launch the pop quiz series to the members.</>,
                    <><b className="text-white font-semibold">IG Live, a test only.</b> Fifteen minutes. Five minutes following Doza around, five minutes of Q&amp;A. Not a priority, and it only runs if the day allows. Sean's one condition: any interaction has to reinforce the next one, so it cannot just be a camera wandering.</>,
                    <><b className="text-white font-semibold">The number.</b> Four to five pieces, mostly Haydozer. Three of them published on the day, not two weeks later. The whole point is that it feels like right now.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Mystery shops and pop quizzes">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Ryan's six.</b> Resolute Resistance, Stone Throw Yoga, Synergy Method, Method Plus Action, Marlon Coast CrossFit, and Finn at Frontline Fitness.</>,
                    <><b className="text-white font-semibold">The other five named in the room.</b> Peak Shape, Aura Recovery, Grassroots, Within, Urban Yoga.</>,
                    <><b className="text-white font-semibold">Five names for every one that lands.</b> That is the ratio. Add a couple of managers to the list as well.</>,
                    <><b className="text-white font-semibold">Ring ahead.</b> Tell them they are one of the three you are calling this week. Do it in normal office hours. The purity of a genuinely cold call loses to the ROI of a two hour block.</>,
                    <><b className="text-white font-semibold">The best ones are where they nail the script.</b> If they do not, that is a coaching moment and you take it.</>,
                    <><b className="text-white font-semibold">Pop quiz is a different test.</b> KPIs, structure, ownership, team wins.</>,
                    <><b className="text-white font-semibold">Floated, not decided.</b> Swap the lists. You call hers, she calls yours, and nobody is pre warmed.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="How these got built">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Mirror their reality, and make that the hook.</b> If you are stuck for content ideas and you are wondering every single week what I should be posting. That is the pain, said back to them in their own words.</>,
                    <><b className="text-white font-semibold">Then go deep on what they currently believe.</b> You think you have to do this, and this, and this. Get all three out. That is the cost stacking up.</>,
                    <><b className="text-white font-semibold">Then flip it and relieve it.</b> Show the easy and simple way. Then walk through what it actually consists of. Ideally it is a few clicks.</>,
                    <><b className="text-white font-semibold">Ask three questions of anything they bring.</b> What does it do. What is different about it. How does it help people.</>,
                    <><b className="text-white font-semibold">Name the mechanism, do not call it your curriculum.</b> Same thing, framed properly. This is the Geronimo secret sauce of how we market in 2026.</>,
                    <><b className="text-white font-semibold">Strip, do not stack.</b> Everyone wants to put everything in. The job is taking as much out as possible. Ryan spotted it himself, he was explaining too much on the first idea.</>,
                    <><b className="text-white font-semibold">Never explain the prerequisite.</b> If it pops off, they did not watch the one you posted last Friday. Simplify the language and let it stand alone.</>,
                    <><b className="text-white font-semibold">Make it about the problem, not the tool.</b> The tool is the relief at the end. Lead with the tool and you attract people who like tools.</>,
                    <><b className="text-white font-semibold">Talk to one person.</b> Billy's takeaway, and the right one. Pick the specific person, then pinpoint their pain and their beliefs and run the structure on them.</>,
                    <><b className="text-white font-semibold">The anti guru rule.</b> Share your own experience, or share what other people have done. That way you are not preaching, you are not telling anyone what they should do.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Directing the room, for Billy">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Keep the line tight.</b> The line drifts fast. One idea, break it down, finish it, sign it off, next person. Nobody leaves a thought open.</>,
                    <><b className="text-white font-semibold">Alternate.</b> Ryan, Soph, Ryan, Soph. It stops either of them getting bored and it forces them to land a thought instead of trailing off.</>,
                    <><b className="text-white font-semibold">Agree a hand signal.</b> Hand up means stop and come back. Set it before you start so it is not a correction in the moment.</>,
                    <><b className="text-white font-semibold">Reinforce while they talk.</b> Nodding, that was great, awesome. Especially with people who have barely been on camera.</>,
                    <><b className="text-white font-semibold">And, never but.</b> But shuts the idea down. And builds on it. Small word, completely different room.</>,
                    <><b className="text-white font-semibold">Rewind in pieces.</b> Say that again, but just the first part. You have to remember what the first part was, and prompt it back to them.</>,
                    <><b className="text-white font-semibold">Structure over script.</b> Nobody writes a full script and Sean is not writing one either. Dot points and beats, accessible on the day.</>,
                    <><b className="text-white font-semibold">Walk in with a plan.</b> What you are getting and how you are getting it, so you do not leave with a pile of footage and no idea what it is for.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="What changed">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Ideas get submitted before the jam.</b> The form is already live on this page. Who you are, what the idea is, what it is for, three of them. Sean gets the notification.</>,
                    <><b className="text-white font-semibold">Friday 5pm, linked off the scorecards.</b> They are already doing their numbers. The ideas go in beside them, so it is a deliverable and not a favour. Doza: lobbing into these meetings with half a thought cannot happen.</>,
                    <><b className="text-white font-semibold">Sean reviews before the call.</b> Then the jam becomes, that was a great idea, here is why it was a great idea. Educational for everyone rather than Sean building it for one person.</>,
                    <><b className="text-white font-semibold">Sophie runs weekly. Ryan gets batched fortnightly.</b> Six ideas at a time, a couple of mysteries in the batch. There is no point flying someone to the Gold Coast for half an hour.</>,
                    <><b className="text-white font-semibold">The weeks alternate.</b> Short form one week, YouTube and ads the next, with Pete in the ads week. Short, long, short, long.</>,
                    <><b className="text-white font-semibold">The jam gets an agenda.</b> Allocated time per person, so nothing gets missed at the end and everyone knows when they are up.</>,
                    <><b className="text-white font-semibold">A pre production meeting before any shoot day.</b> The boat got decided the day before it happened. That is what puts scripts on the fly.</>,
                    <><b className="text-white font-semibold">The bar for September.</b> Two posts a day on TGA, Monday to Friday, and we did it. No results test this month. Four weeks of five times two, and the mission is accomplished.</>,
                    <><b className="text-white font-semibold">Billy owns the Thursday block.</b> An editor comes in underneath him so he can delegate. Nate stays as support, not as the owner.</>,
                    <><b className="text-white font-semibold">Sit in on office hours.</b> Six calls, one question asked eighteen different ways. That is where the next month of content comes from.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Before Thursday">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Ryan.</b> Ring the six studios so they are expecting the call. Send the drive link with every idea in it, not just the three.</>,
                    <><b className="text-white font-semibold">Sophie.</b> Ring her five. Pick the play to win call. Pull the four steps off the hot seat recording. Write out the five COACH words.</>,
                    <><b className="text-white font-semibold">Sophie.</b> Send the ideas doc. All of them. Sean: if there is stuff hidden, I do not want only the three you selected.</>,
                    <><b className="text-white font-semibold">Billy.</b> Walk in with the shot list and the plan for the day. Run the pod recap prompt the second Doza stops filming.</>,
                    <><b className="text-white font-semibold">Billy and Hayley.</b> Thursday in Sydney, the editor handover, and how the assembly line runs in Notion.</>,
                    <><b className="text-white font-semibold">Hayley.</b> Link the idea form onto the scorecards with the Friday 5pm deadline.</>,
                    <><b className="text-white font-semibold">Sean.</b> The media jam agenda template. And the email that fires when the ideas have not landed.</>,
                    <><b className="text-white font-semibold">Friday.</b> Billy brings a list into the Geronimo chat and cross checks it with Nate or Hayley before the day starts.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Queued behind these">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Kai recapping the hot seat.</b> Same story as the 400 members video, different mouth. Green screen.</>,
                    <><b className="text-white font-semibold">The quote bank.</b> Dark B roll with one bold line on top. Same font as the Separation Sunday carousel, so the look becomes his. Either a word with its definition underneath, or a quote with the translation of what it actually means. Requires nobody. Capture rather than create.</>,
                    <><b className="text-white font-semibold">Lines already confirmed for it.</b> You already know what to do, you are just negotiating with comfort. The curse of standards is that every day looks the same, the curse of comfort is that every year looks the same. Stay around ambitious people, they will never mock you for trying. Surprise, you thought you joined a business growth program, you actually joined a personal growth program, we grow the person to grow the business.</>,
                    <><b className="text-white font-semibold">The bar for it.</b> Steer away from live laugh love, get as close to ambition as possible. These are fuel and reminders, not teaching. People need to be reminded more than they need to be taught.</>,
                    <><b className="text-white font-semibold">Separation Sunday as a seven second trial reel.</b> The short video runs, the story of what it is and why he does it sits underneath. Opens the reel up to be played again and reaches past the existing audience.</>,
                    <><b className="text-white font-semibold">Second angle coaching moments.</b> Wednesdays with Sophie in her office hours, in her natural environment, being trained to repeat the question back before she answers it.</>,
                    <><b className="text-white font-semibold">Rowan's keynote as an email asset.</b> Half an hour of the juiciest section, sent privately to the warm list. This is what we get up to behind the scenes when we build leaders. Not an Instagram CTA.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Still open">
                <BulletList
                  items={[
                    'Doza has three pieces for TGA. Two come off the pod recap. The third was never planned.',
                    "Ryan's hook 3 needs the real member count in place of X (Number), and his CTA trails off at 'the first'.",
                    'The four steps from the hot seat. Everything else on the 400 members video is written.',
                    'The five COACH words. Sophie has them, they were never said on the jam.',
                    'The play to win example. Sean built the shape, the call was never picked.',
                    "CTAs on three of Sophie's. The payoffs are drafted, the one ask is not. Confirm the keyword and where it points before camera.",
                    "Sophie has not read her four out loud yet. They are built to Ryan's depth but they are drafted in places, so anything that is not how she talks gets cut on Thursday, not defended.",
                    'Every text hook. Not one was written in the room. They are the on screen words, so they get decided before Thursday, not in the edit.',
                    "Ryan's drive of ideas and Sophie's ideas doc. Both promised on the call, neither sent yet.",
                    'IG Live on Friday has no owner and no time.',
                    '30/60/90 is named inside the tool but is not in school anywhere. Separate job, someone raise it.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'pastshoots' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Past shoots</p>
            <H2>First shoot of September.</H2>
            <Note>Off the media jam of 31 August. Hooks are lifted from the notes word for word, not paraphrased. Under each one is the structure it follows, so you know what every beat is doing rather than riffing blind. More ideas than slots on purpose, so you can be ruthless to the standard. Anything marked to fill was not said and has not been invented.</Note>

            <div className="mt-8">
              <FirstSeptShoot />
            </div>

            <div className="mt-2">
              <Block label="Queued behind these">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Million dollar studio standards checklist.</b> Same build process as the offer price video, run by Billy once the first one is done.</>,
                    <><b className="text-white font-semibold">Team playbook and handbooks.</b> Split screen, or walk through on screen.</>,
                    <><b className="text-white font-semibold">Private live ad rebuild workshop.</b> Twenty spots, offered only to the warmest list ranked by asset downloads. Small feels private. Drop a few existing members in.</>,
                  ]}
                />
              </Block>
            </div>

            <div className="mt-2">
              <Block label="Still open">
                <BulletList
                  items={[
                    'The five elements of the offer are not named yet. Video 1 is written apart from them.',
                    'Mystery shop. One slot in the schedule, no idea captured on the jam.',
                    'Series. One slot for Under Management, no episode topic captured on the jam.',
                    'Carousel and Twitter were flagged for short form but never worked through.',
                    'The transcript said five numbers in the green. The notes say five elements to the offer. Same thing, or two different videos.',
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

        {sec === 'checklist' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The checklist</p>
            <H2>Everything that needs doing.</H2>
            <Note>Every line has an owner. Nothing here needs a meeting to start. Ticks save to this device, so they are your own marker rather than a shared record.</Note>
            <div className="mt-8">
              <Checklist />
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
