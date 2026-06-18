import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

// ─── Roles ──────────────────────────────────────────────────────────────

const ROLES: Array<{ name: string; lane: string; bullets: string[] }> = [
  {
    name: 'Rhys',
    lane: 'Talent. Final call.',
    bullets: [
      'Show up to Mon and Wed short form shoots.',
      'Film the Friday longform shoot.',
      'Film the Authority pillar (2 to 3 day shoot).',
      'Sign off on creative direction and naming.',
    ],
  },
  {
    name: 'Corey',
    lane: 'Operations. Shoots and edits. Grows into creative direction.',
    bullets: [
      'Run the Mon and Wed short form shoots.',
      'Run the Friday longform shoot.',
      'Edit short form. Edit longform.',
      'Log the data on every piece per the data schedule.',
      'Run the end of week review cycles.',
      'Build pattern recognition over the first 90 days.',
    ],
  },
  {
    name: 'Sean',
    lane: 'Strategy and accountability.',
    bullets: [
      'Refine the brand. Increase demand.',
      'Lock the 6 pillar video outlines and the 6 week rotation.',
      'Fortnightly strategy and accountability sessions.',
      'Voice note and email support between sessions.',
    ],
  },
];

// ─── Weekly rhythm ──────────────────────────────────────────────────────

const RHYTHM: Array<{ d: string; label: string; shoot: boolean }> = [
  { d: 'Mon', label: 'Short form shoot.', shoot: true },
  { d: 'Tue', label: 'Edit.', shoot: false },
  { d: 'Wed', label: 'Short form shoot.', shoot: true },
  { d: 'Thu', label: 'Edit.', shoot: false },
  { d: 'Fri', label: 'Longform shoot.', shoot: true },
  { d: 'Sat', label: '', shoot: false },
  { d: 'Sun', label: '', shoot: false },
];

// ─── Posting volume ─────────────────────────────────────────────────────

const POSTING: Array<{ when: string; what: string }> = [
  { when: 'Each week', what: '14 short form posts (7 Share + 7 Teach), plus carousels and workshop reels as needed.' },
  { when: 'End of week 4', what: 'Pillar video no. 1 (Character) live.' },
  { when: 'Week 5 onward', what: 'One longform pillar per week. Six pillars in rotation.' },
];

// ─── Review cycles ──────────────────────────────────────────────────────

const REVIEWS: Array<{ when: string; what: string[] }> = [
  {
    when: 'End of week 2',
    what: [
      'Identify pattern of top hooks in each pillar.',
      'Keep top 8 to test hook structure across different topic.',
      'Add 4 similar hook styles to test.',
      'Add 12 completely new hooks to test.',
      'Remove the bottom 10.',
    ],
  },
  {
    when: 'End of week 4',
    what: [
      'Identify pattern of top hooks in each pillar.',
      'Keep top 8 to test hook structure across different topic.',
      'Add 4 similar hook styles to test.',
      'Add 12 completely new hooks to test.',
      'Remove the bottom 10.',
      'Decide: increase to 21 posts per week? Extra editing capacity? Add 1 to 2 podcasts per month? Test new formats or hooks?',
    ],
  },
  {
    when: 'End of week 6',
    what: [
      'Topic and format analysis.',
      'For each tested topic, see which format performs best.',
      'Make simple rules (e.g. for churn we show, for niche we tell a story).',
    ],
  },
];

// ─── Data tracking ──────────────────────────────────────────────────────

const DATA: Array<{ when: string; what: string[] }> = [
  {
    when: 'Short form. 24 hours after posting',
    what: [
      'Pillar and topic',
      'Format (Story / Belief / Teach / Show)',
      'Hook',
      'Views, Saves, Shares, Comments',
      'CTA (if applicable)',
    ],
  },
  {
    when: 'Short form. 7 days after posting',
    what: ['Update log in new section on same post with final numbers.'],
  },
  {
    when: 'Longform. At 48 hours',
    what: [
      'Title and hook',
      'Split test data (thumb and title)',
      'Pillar / topic',
      'Current views',
      'Avg view duration / % watched',
      'Clicks to description CTAs',
    ],
  },
  {
    when: 'Longform. Updated at 7 days',
    what: [
      'Views',
      'Avg view duration / % watched',
      'Clicks to assets',
      'Apps tied to people who watched',
      'Split test data. Keep winner, split test two more thumbnails.',
    ],
  },
];

// ─── Open decisions ─────────────────────────────────────────────────────

const OPEN_DECISIONS: string[] = [
  'Do we want to increase to 21 posts per week?',
  'Do we need extra editing capacity?',
  'Do we want to add 1 to 2 podcasts per month?',
  'Do we want to test new formats or hooks?',
];

export default function UndeniableOps() {
  return (
    <Shell title="Operations · Undeniable" description="Roles, weekly rhythm, review cycles, data tracking, open decisions." path="/undeniablenextsteps/ops">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Operations."
        blurb="Roles. Weekly rhythm. Posting volume. Review cycles. Data tracking. Open decisions."
      />
      <Divider />

      {/* ROLES */}
      <Wrap>
        <Eyebrow>Roles</Eyebrow>
        <div className="space-y-4">
          {ROLES.map((r) => (
            <div key={r.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white mb-1">{r.name}</h3>
              <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-4">{r.lane}</p>
              <ul className="space-y-2">
                {r.bullets.map((b) => (
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

      <Divider />

      {/* WEEKLY RHYTHM */}
      <Wrap>
        <Eyebrow>Weekly rhythm</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {RHYTHM.map((day) => (
            <div key={day.d} className={`rounded-xl border p-3 md:p-4 ${day.shoot ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
              <p className={`font-display text-[14px] font-extrabold mb-2 ${day.shoot ? 'text-blue-300' : 'text-white'}`}>{day.d}</p>
              <p className="text-zinc-300 text-[12px] leading-relaxed">{day.label}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* POSTING VOLUME */}
      <Wrap>
        <Eyebrow>Posting volume</Eyebrow>
        <div className="space-y-2">
          {POSTING.map((p) => (
            <div key={p.when} className="rounded-xl border border-zinc-800 bg-elevated/40 px-5 py-4 grid md:grid-cols-[180px_1fr] gap-3">
              <p className="font-display font-extrabold text-blue-300 text-[13px]">{p.when}</p>
              <p className="text-zinc-200 text-[13px] leading-relaxed">{p.what}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* REVIEW CYCLES */}
      <Wrap>
        <Eyebrow>Review cycles</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">Corey runs each review. From the content cadence spec.</p>
        <div className="space-y-3">
          {REVIEWS.map((r) => (
            <div key={r.when} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
              <SubEyebrow>{r.when}</SubEyebrow>
              <ul className="space-y-1.5">
                {r.what.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[13px] leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* DATA TRACKING */}
      <Wrap>
        <Eyebrow>Data tracking</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">Log every piece. Short form at 24 hours plus 7 days. Longform at 48 hours plus 7 days.</p>
        <div className="grid md:grid-cols-2 gap-3">
          {DATA.map((d) => (
            <div key={d.when} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
              <SubEyebrow>{d.when}</SubEyebrow>
              <ul className="space-y-1.5">
                {d.what.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[13px] leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <a href="/undeniablenextsteps/content#data" className="text-blue-400 hover:text-blue-300 text-[13px] inline-flex items-center gap-1">
            See Content / Data collection for the full spec <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </Wrap>

      <Divider />

      {/* OPEN DECISIONS */}
      <Wrap>
        <Eyebrow>Open decisions (after 4 weeks)</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-6">To answer at the end of the first 4 week test cycle.</p>
        <div className="space-y-2">
          {OPEN_DECISIONS.map((d, i) => (
            <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
              <p className="font-display text-[15px] font-extrabold text-amber-300">{d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
