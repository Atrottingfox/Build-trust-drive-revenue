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

// ─── The ranked stack ───────────────────────────────────────────────────

type Rank = { n: string; name: string; why: string; tag: string; parked?: boolean };

const RANKS: Rank[] = [
  {
    n: '1',
    name: 'Live room',
    why: '8 to 20 people, private Q and A. Highest trust and leverage in the set, at the lowest cost.',
    tag: 'Build now',
  },
  {
    n: '2',
    name: 'YouTube long form',
    why: 'The compounding asset. Central nurture path and the source for everything downstream.',
    tag: 'Build now',
  },
  {
    n: '3',
    name: 'Podcast',
    why: 'Strip the audio off the long form. Mid funnel intimacy for almost no extra effort.',
    tag: 'Byproduct',
  },
  {
    n: '4',
    name: 'Email',
    why: 'Repackaging. Converts and supports the rest, but does not build trust on its own.',
    tag: 'Byproduct',
  },
  {
    n: '5',
    name: 'Podcast tour',
    why: 'Real trust and real clips, but the effort and habit scores make it a batching job for later.',
    tag: 'Park it',
    parked: true,
  },
];

// ─── The scorecard ──────────────────────────────────────────────────────

type Criterion = { key: string; label: string; dir: 'up' | 'down' };

const CRITERIA: Criterion[] = [
  { key: 'effort', label: 'Effort', dir: 'down' },
  { key: 'leverage', label: 'Leverage', dir: 'up' },
  { key: 'habit', label: 'Habit', dir: 'up' },
  { key: 'trust', label: 'Trust', dir: 'up' },
  { key: 'cost', label: 'Cost', dir: 'down' },
];

type Row = { name: string; cadence: string; scores: Record<string, number> };

const ROWS: Row[] = [
  { name: 'Live room', cadence: 'per month', scores: { effort: 4, leverage: 9, habit: 3, trust: 9, cost: 2 } },
  { name: 'YouTube long form', cadence: 'per week', scores: { effort: 7, leverage: 9, habit: 4, trust: 8, cost: 8 } },
  { name: 'Podcast', cadence: 'per week', scores: { effort: 5, leverage: 6, habit: 7, trust: 7, cost: 5 } },
  { name: 'Email', cadence: 'per week', scores: { effort: 6, leverage: 5, habit: 5, trust: 4, cost: 4 } },
  { name: 'Podcast tour', cadence: 'batched', scores: { effort: 9, leverage: 8, habit: 1, trust: 8, cost: 7 } },
];

// ─── The cascade ────────────────────────────────────────────────────────

type Stage = { cadence: string; name: string; items: string[]; spine: boolean };

const CASCADE: Stage[] = [
  {
    cadence: 'Monthly',
    name: 'Live room',
    spine: true,
    items: [
      '8 to 20 people, private',
      '90 to 120 minutes',
      'Live teardown and Q and A on real founder situations',
      'Record all of it. This is the proof capture',
    ],
  },
  {
    cadence: 'Weekly',
    name: 'YouTube long form',
    spine: true,
    items: [
      '30 to 45 minutes',
      'Pull one theme or case from the live',
      'Re record it, or clean up the strongest segment',
      'One per week. This is the non negotiable',
    ],
  },
  {
    cadence: 'Derived · no new recording',
    name: 'Syndication',
    spine: false,
    items: [
      'Podcast: strip the audio, light intro and outro',
      'Email: 2 to 3 a week. One story and lesson, one idea broken down',
      'Shorts: 5 to 10 a week, pointing back to the long form or the next live',
    ],
  },
];

const OWNERS: Array<{ who: string; load: string; items: string[]; accent: boolean }> = [
  {
    who: 'What Rhys does',
    load: '2 blocks',
    accent: true,
    items: ['One monthly live, 2 to 3 hours including setup', 'One weekly shoot, 2 to 3 hours including prep'],
  },
  {
    who: 'What Jacob does · the 60 percent',
    load: 'Everything downstream',
    accent: false,
    items: ['Edit the long form', 'Slice the clips and the podcast audio', 'Draft the emails from transcripts'],
  },
];

// ─── Scatter geometry ───────────────────────────────────────────────────
// x = 88 + effort * 50.6 · y = 392 - return * 35.2 · return = (trust + leverage) / 2

// Label placement is set per point to keep the five labels from colliding:
// `place` picks the side, `anchor` follows from it. Verified by rendering.
type Point = {
  name: string;
  sub: string;
  x: number;
  y: number;
  r: number;
  place: 'below' | 'above' | 'right';
  parked?: boolean;
  big?: boolean;
};

const POINTS: Point[] = [
  { name: 'Email', sub: '4 · return 4.5', x: 392, y: 234, r: 8, place: 'below' },
  { name: 'Podcast', sub: '3 · return 6.5', x: 341, y: 163, r: 8, place: 'below' },
  { name: 'Live room', sub: '1 · return 9.0 · per month', x: 290, y: 76, r: 10, place: 'below', big: true },
  { name: 'YouTube long form', sub: '2 · return 8.5', x: 442, y: 93, r: 10, place: 'above', big: true },
  { name: 'Podcast tour', sub: '5 · return 8.0', x: 543, y: 111, r: 8, place: 'right', parked: true },
];

function labelPos(p: Point) {
  if (p.place === 'above') {
    return { anchor: 'middle' as const, tx: p.x, nameY: p.y - p.r - 24, subY: p.y - p.r - 9 };
  }
  if (p.place === 'right') {
    return { anchor: 'start' as const, tx: p.x + p.r + 8, nameY: p.y - 3, subY: p.y + 12 };
  }
  return { anchor: 'middle' as const, tx: p.x, nameY: p.y + p.r + 16, subY: p.y + p.r + 31 };
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function Matrix() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6 overflow-x-auto">
      <svg viewBox="0 0 760 470" role="img" aria-labelledby="mx-t mx-d" className="block w-full h-auto min-w-[620px]">
        <title id="mx-t">Return against effort for five content channels</title>
        <desc id="mx-d">
          Live room sits highest for return at the lowest effort. YouTube long form is close behind at higher effort.
          Podcast tour has high return but the highest effort. Email has the lowest return.
        </desc>

        {/* grid */}
        <g stroke="#27272A" strokeWidth="1">
          <line x1="88" y1="40" x2="88" y2="392" />
          <line x1="88" y1="392" x2="720" y2="392" />
          {[304, 216, 128, 40].map((y) => (
            <line key={y} x1="88" y1={y} x2="720" y2={y} />
          ))}
          {[214, 340, 467, 593].map((x) => (
            <line key={x} x1={x} y1="40" x2={x} y2="392" />
          ))}
        </g>

        {/* quadrant dividers at effort 6.5 and return 7.0 */}
        <g stroke="#1D4ED8" strokeWidth="1" strokeDasharray="3 5" opacity="0.7">
          <line x1="498" y1="40" x2="498" y2="392" />
          <line x1="88" y1="146" x2="720" y2="146" />
        </g>

        {/* one annotation, in the quadrant that matters. Kept short so it
            clears the Live room mark at x 280 to 300. */}
        <g fontFamily={MONO} letterSpacing="1.4">
          <text x="102" y="58" fontSize="11" fill="#60A5FA">BEST RATIO</text>
          <text x="102" y="73" fontSize="10.5" fill="#52525B">MOST FOR LEAST</text>
        </g>

        {/* ticks */}
        <g fontFamily={MONO} fontSize="11" fill="#52525B" textAnchor="end">
          <text x="74" y="396">0</text>
          <text x="74" y="308">2.5</text>
          <text x="74" y="220">5</text>
          <text x="74" y="132">7.5</text>
          <text x="74" y="44">10</text>
        </g>
        <g fontFamily={MONO} fontSize="11" fill="#52525B" textAnchor="middle">
          <text x="88" y="412">0</text>
          <text x="214" y="412">2.5</text>
          <text x="340" y="412">5</text>
          <text x="467" y="412">7.5</text>
          <text x="593" y="412">10</text>
        </g>

        {/* axis titles */}
        <text x="88" y="440" fontFamily={MONO} fontSize="11" letterSpacing="1.4" fill="#A1A1AA">
          EFFORT TO RUN · HIGHER IS WORSE
        </text>
        <text transform="translate(30,392) rotate(-90)" fontFamily={MONO} fontSize="11" letterSpacing="1.4" fill="#A1A1AA">
          RETURN · TRUST + LEVERAGE
        </text>

        {/* points */}
        {POINTS.map((p) => {
          const l = labelPos(p);
          return (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r={p.r} fill={p.parked ? '#64748B' : '#3B82F6'} stroke="#111114" strokeWidth="2" />
              <text
                x={l.tx}
                y={l.nameY}
                textAnchor={l.anchor}
                fontSize={p.big ? '14' : '13'}
                fontWeight={p.big ? 800 : 700}
                fill={p.parked ? '#A1A1AA' : '#FAFAFA'}
              >
                {p.name}
              </text>
              <text
                x={l.tx}
                y={l.subY}
                textAnchor={l.anchor}
                fontFamily={MONO}
                fontSize="10.5"
                fill={p.parked ? '#52525B' : p.big ? '#60A5FA' : '#71717A'}
              >
                {p.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-zinc-800">
        <span className="flex items-center gap-2 text-[13px] text-zinc-400">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In the stack now
        </span>
        <span className="flex items-center gap-2 text-[13px] text-zinc-400">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Parked until the rest is consistent
        </span>
        <span className="text-[13px] text-zinc-600">Number on each point is its rank</span>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

export default function UndeniableChannels() {
  return (
    <Shell
      title="Channel Stack · Undeniable"
      description="Five channels scored on effort, leverage, habit, trust and cost. What to build, in what order."
      path="/undeniablenextsteps/channels"
    >
      <PageHead
        eyebrow="Channel decision"
        title="The Channel"
        accent="Stack."
        blurb="Five channels, scored on effort, leverage, habit, trust and cost. This is what the scores say to build, in what order, and what to leave alone until the rest is consistent."
      />
      <Divider />

      {/* THE CALL */}
      <Wrap>
        <Eyebrow>The call</Eyebrow>
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/[0.05] p-7 md:p-8 mb-8">
          <p className="font-display text-[20px] md:text-[26px] font-extrabold text-white leading-[1.25] tracking-[-0.02em]">
            Long form video is the spine.{' '}
            <span className="text-blue-400">
              A monthly live room feeds it. Podcast and email come off it without a second recording.
            </span>
          </p>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
          Ranked by return against what it costs
        </h2>
        <Lead>Rank is trust and leverage weighed against effort and cost. Nothing here is a new recording except the two shoots.</Lead>

        <div className="space-y-2">
          {RANKS.map((r) => (
            <div
              key={r.n}
              className={`rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 grid grid-cols-[28px_1fr] md:grid-cols-[28px_1fr_auto] gap-x-4 gap-y-2 items-center ${
                r.parked ? 'opacity-70' : ''
              }`}
            >
              <span className={`font-mono text-[15px] font-bold ${r.parked ? 'text-slate-500' : 'text-blue-400'}`}>{r.n}</span>
              <div>
                <span className="font-display text-[15px] font-extrabold text-white">{r.name}</span>
                <span className="text-zinc-400 text-[13.5px] md:ml-2 block md:inline">{r.why}</span>
              </div>
              <span
                className={`col-start-2 md:col-start-3 justify-self-start rounded px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap border ${
                  r.parked
                    ? 'border-zinc-800 bg-elevated/60 text-slate-400'
                    : 'border-blue-500/30 bg-blue-500/[0.06] text-blue-300'
                }`}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* THE ARGUMENT */}
      <Wrap>
        <Eyebrow>The argument</Eyebrow>
        <Lead>
          Return is trust and leverage averaged. Effort is the score for what it takes to run. Up and to the left is
          where you want to be.
        </Lead>

        <Matrix />

        <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-6 md:p-7">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-300 mb-3">
            What the scores expose
          </p>
          <h3 className="font-display text-[19px] md:text-[22px] font-extrabold text-white leading-tight mb-3">
            The best two channels score lowest on habit.
          </h3>
          <p className="text-zinc-300 text-[14px] leading-relaxed">
            Live room scored 3 out of 10 on habit. YouTube scored 4. They also scored highest on trust and leverage. So
            the two things worth the most are the two most likely to slip, which is why both need a fixed block in the
            calendar rather than intent. Podcast scored 7 on habit and email 5, and neither carries the trust.
          </p>
        </div>

        <div className="mt-6 border-l-2 border-zinc-800 pl-5">
          <p className="text-zinc-500 text-[13px] leading-relaxed">
            Two things to read carefully. Live is scored per month and everything else per week, so its real cost is
            lower than the point suggests. And podcast and email are scored standalone. Run as byproducts of the weekly
            long form, their marginal effort drops close to zero, which is what moves them into the stack at all.
          </p>
        </div>
      </Wrap>

      <Divider />

      {/* THE RECEIPTS */}
      <Wrap>
        <Eyebrow>The receipts</Eyebrow>
        <Lead>
          Blue bars are criteria where more is better. Slate bars are criteria where more is worse, so a long slate
          bar means it costs you more.
        </Lead>

        <div className="rounded-2xl border border-zinc-800 bg-elevated/30 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-widest text-zinc-500 font-medium align-bottom">
                  Channel
                </th>
                {CRITERIA.map((c) => (
                  <th key={c.key} className="text-left px-4 py-3 text-[10.5px] uppercase tracking-widest text-zinc-500 font-medium align-bottom">
                    {c.label}
                    <span className="block text-[9.5px] text-zinc-600 mt-1 tracking-wide normal-case">
                      {c.dir === 'up' ? 'higher is better' : 'lower is better'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.name} className="border-b border-zinc-800/60 last:border-b-0">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-display text-[14px] font-extrabold text-white">{row.name}</span>
                    <span className="block text-[12px] text-zinc-600">{row.cadence}</span>
                  </td>
                  {CRITERIA.map((c) => (
                    <td key={c.key} className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono tabular-nums text-[12.5px] text-zinc-400 w-4 flex-none">
                          {row.scores[c.key]}
                        </span>
                        <span className="flex-1 h-1.5 rounded-full bg-zinc-800 min-w-[54px] overflow-hidden block">
                          <span
                            className={`block h-full rounded-full ${c.dir === 'up' ? 'bg-blue-500' : 'bg-slate-500'}`}
                            style={{ width: `${row.scores[c.key] * 10}%` }}
                          />
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-l-2 border-zinc-800 pl-5">
          <p className="text-zinc-500 text-[13px] leading-relaxed">
            Notes carried from the scoring. Email and YouTube are both 3 to 4 hours a week with 60 percent of that
            doable by someone else. YouTube gets pushed back unless the day block is religious. Podcast tour effort is
            travel, so it only works batched into one week at a time.
          </p>
        </div>
      </Wrap>

      <Divider />

      {/* THE OPERATING SYSTEM */}
      <Wrap>
        <Eyebrow>The operating system</Eyebrow>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-3">
          One recording, five surfaces
        </h2>
        <Lead>Two shoots go in. Everything on the right comes off them without a second recording.</Lead>

        <div className="grid gap-3 md:grid-cols-3">
          {CASCADE.map((s, i) => (
            <div key={s.name} className="relative">
              <div
                className={`rounded-2xl border p-5 md:p-6 h-full ${
                  s.spine ? 'border-blue-500/40 bg-blue-500/[0.05]' : 'border-zinc-800 bg-elevated/30'
                }`}
              >
                <p
                  className={`text-[10px] uppercase tracking-widest font-semibold mb-3 ${
                    s.spine ? 'text-blue-300' : 'text-zinc-500'
                  }`}
                >
                  {s.cadence}
                </p>
                <h3 className="font-display text-[19px] font-extrabold text-white leading-tight mb-3">{s.name}</h3>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${s.spine ? 'bg-blue-400' : 'bg-zinc-600'}`} />
                      <span className="text-zinc-300 text-[13px] leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {i < CASCADE.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-blue-500/60 text-[16px] font-bold">
                  &gt;
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {OWNERS.map((o) => (
            <div key={o.who} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
              <SubEyebrow>{o.who}</SubEyebrow>
              <p className={`font-mono text-[24px] font-bold tracking-tight mb-3 ${o.accent ? 'text-blue-400' : 'text-zinc-400'}`}>
                {o.load}
              </p>
              <ul className="space-y-2">
                {o.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[13px] leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-blue-500/40 bg-blue-500/[0.05] p-6 md:p-7">
          <SubEyebrow>Guardrail</SubEyebrow>
          <h3 className="font-display text-[19px] md:text-[22px] font-extrabold text-white leading-tight mb-3">
            Proof is the payload. Education is the wrapper.
          </h3>
          <p className="text-zinc-300 text-[14px] leading-relaxed">
            Nothing ships without proof or a specific scenario in it. Case studies, testimonials and screenshots get
            accumulated and reused across videos, emails, descriptions and pinned posts rather than used once.
          </p>
        </div>

      </Wrap>
    </Shell>
  );
}
