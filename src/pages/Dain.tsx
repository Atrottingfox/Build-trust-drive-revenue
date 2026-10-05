import React from 'react';
import { Check, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, H2, BulletList } from '../components/undeniable/Bits';

/* Dain Walker / Rivyl. Operator Intensive proposal for the CEO.
   Copy is Sean's (5 Oct 2026, third pass). Mechanical changes only: straight
   apostrophes, no hyphens in compound adjectives, citations removed, ban list
   lines rewritten. Do not rephrase.
   Shape: a search period of up to 6 weeks, then a 90 day Operator Install that
   starts on the day the Operator or interim owner starts.
   This page creates conviction. Payment triggers, pause terms, replacement
   conditions, third party costs and candidate ownership live in the agreement.
   No insets: flat sections, no boxed cards, no quote callouts. */

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-300 text-[16px] leading-relaxed mb-5 last:mb-0">{children}</p>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white text-[14px] font-semibold mt-8 mb-4">{children}</p>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
  <p className="my-6 text-white text-[17px] font-semibold leading-relaxed">{children}</p>
);

function Ticks({ items, tone = 'in' }: { items: string[]; tone?: 'in' | 'out' }) {
  const Icon = tone === 'in' ? Check : X;
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <Icon className={`w-4 h-4 mt-1 flex-shrink-0 ${tone === 'in' ? 'text-blue-400' : 'text-zinc-600'}`} />
          <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Numbered({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((t, i) => (
        <li key={t} className="flex items-start gap-3">
          <span className="text-blue-400 font-semibold text-[15px] w-4 flex-shrink-0">{i + 1}.</span>
          <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
        </li>
      ))}
    </ol>
  );
}

// ─── Copy ────────────────────────────────────────────────────────────────

const WILL_HAVE = [
  'A clear 90 day media plan signed off by Dain and the CEO',
  'A defined Operator role, scorecard, and decision rights',
  'A structured search and assessment process',
  'A documented minimum viable media operation',
  'A permanent Operator or interim owner, where applicable',
  'The standards, workflow, and playbook required to run it',
  'A final capability review and recommendation for what comes next',
];

type Block = { label?: string; items?: string[]; numbered?: string[]; paras?: string[]; half?: boolean };

type Step = { num: string; title: string; when: string; intro: string[]; blocks: Block[]; outro: string[] };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Media Operating Brief',
    when: 'Week 1',
    intro: [
      'We begin with one focused working day with Dain and the CEO to clarify what Rivyl actually needs from media over the next 90 days.',
    ],
    blocks: [
      {
        label: 'We define',
        half: true,
        items: [
          'The primary business objective',
          'The priority audience and offer',
          'What the Operator must own',
          'What decisions the Operator can make independently',
          'What requires founder approval',
          'The minimum weekly media operation',
          'The 90 day scorecard',
        ],
      },
      {
        label: 'You receive',
        half: true,
        items: [
          'Media Operating Brief',
          'Operator role definition',
          'Decision rights',
          'Minimum viable media operation',
          'Operator scorecard',
          'Hiring or capability recommendation',
        ],
      },
      {
        label: 'The MVP, made specific',
        paras: ['The Media Operating Brief specifies exactly what the weekly operation is:'],
        items: [
          'The primary channel',
          'The content format',
          'The weekly publishing cadence',
          'Who captures, edits, approves, and publishes',
          'The approval turnaround',
          'The one scorecard reviewed weekly',
        ],
      },
    ],
    outro: [
      'Nothing expands until this baseline is operating consistently.',
      'Nothing expands until the brief is agreed.',
    ],
  },
  {
    num: '02',
    title: 'Operator Selection',
    when: 'Weeks 1 to 6',
    intro: ['We help Rivyl assess candidates against the capability required for the role.'],
    blocks: [
      {
        label: 'The Authority Engine provides',
        items: [
          'Job description',
          'Application questions',
          'Candidate scorecard',
          'Practical work assessment',
          'Interview structure',
          '90 day ramp plan',
          'Candidate review',
          'Final interview support',
          'Hiring recommendation',
        ],
      },
      {
        paras: [
          'Rivyl makes the final hiring decision and employs the Operator.',
          'The search period is limited to six weeks. If no person has started by that point, Rivyl and The Authority Engine will agree to one of three paths:',
        ],
        numbered: [
          'Proceed with an interim owner.',
          'Pause enablement while the search continues.',
          'Extend the search under a separate agreement.',
        ],
      },
    ],
    outro: [],
  },
  {
    num: '03',
    title: 'MVP Operation',
    when: 'Begins during the search where practical',
    intro: [
      'The minimum media operation should not wait unnecessarily for the final Operator.',
      'Where appropriate, Rivyl may use existing team members or interim contractors to establish the agreed MVP workflow. That way the Operator inherits a working operation when they start.',
    ],
    blocks: [],
    outro: ['The MVP remains limited to what the Media Operating Brief specifies.'],
  },
  {
    num: '04',
    title: '90 Day Operator Install',
    when: '90 days from the Operator\'s start date',
    intro: ['Once the permanent Operator or agreed interim media owner starts, the 90 day Operator Install begins. The Authority Engine trains and enables them through real Rivyl work.'],
    blocks: [
      {
        label: 'The Operator progressively takes ownership of',
        half: true,
        items: [
          'Media planning',
          'Content calendars',
          'Project briefs',
          'Production coordination',
          'Quality standards',
          'Publishing workflow',
          'Performance reporting',
          'Weekly priorities',
          'End to end project ownership',
        ],
      },
      {
        label: 'The Authority Engine provides',
        half: true,
        items: [
          'Operator onboarding',
          'Weekly Operator enablement',
          'Review of real work',
          'Decision making feedback',
          'Media standards and checklists',
          'Scorecard reviews',
          'Operating playbook completion',
          'Strategic advice directly related to the agreed Media Operating Brief and Operator enablement',
          'Capability reviews at 30, 60, and 90 days',
        ],
      },
      {
        label: 'Capability milestones, from the Operator\'s start date',
        items: [
          'First 2 weeks: understand the brand, build the calendar, run the first workflow',
          'Day 30: make content decisions and explain why',
          'Day 60: own the pipeline from brief to publication',
          'Day 90: run the agreed MVP and recommend improvements',
        ],
      },
    ],
    outro: ['Rivyl manages the Operator. The Authority Engine trains, reviews, and assesses them.'],
  },
];

const DELIVERED = [
  'The Media Operating Brief is complete and approved',
  'The Operator role and scorecard are complete',
  'The agreed hiring process has been run',
  'The MVP workflow is documented',
  'The media standards and approval process are documented',
  'The operating playbook is complete',
  'The Operator has been reviewed against the agreed capability scorecard',
  'The final recommendations have been delivered',
];

const FINAL_REVIEW = [
  'Explain what should be made and why',
  'Make normal media decisions',
  'Move projects from brief to completion',
  'Maintain the agreed cadence',
  'Coordinate the required resources',
  'Report performance clearly',
  'Identify what should improve next',
];

const INCLUDED = [
  'One Media Operating Brief day',
  'Operator role and decision framework',
  'Hiring scorecard and practical assessment',
  'Candidate review and interview support',
  '90 days of weekly Operator enablement',
  'Scheduled media and Operator review',
  'Media standards and approval checklists',
  'KPI scorecard',
  'Operating playbook',
  'Capability reviews at 30, 60, and 90 days from the Operator\'s start date',
  'Strategic advice directly related to the agreed Media Operating Brief and Operator enablement',
  'One replacement search, if applicable',
];

const NOT_INCLUDED = [
  'A done for you content agency',
  'A full brand strategy or rebrand',
  'Daily media management',
  "Filming, editing, or publishing on Rivyl's behalf",
  'A recruiting agency',
  'A guarantee of a hire by a fixed date',
  'A guarantee of views, leads, sales, or revenue',
  'Unlimited content production',
  'General business consulting',
  'Sean becoming a Rivyl employee or line manager',
];

const RESPONSIBILITIES = [
  'Dain and the CEO for the initial working day',
  'One CEO side decision maker',
  'Protected time for the Operator',
  'Access to relevant channels, data, calendars, and tools',
  'Timely founder level decisions',
  'Approval of work within two business days where possible',
  'The people and resources required for execution',
  'Management and accountability for the Operator',
];

const CORE = [
  'Media Operating Brief',
  'Role design',
  'Search process',
  'Candidate assessment',
  'Selection support',
];

const INSTALL = [
  '90 day enablement once the person starts',
  'Onboarding, real work training, and weekly reviews',
  'Operating playbook',
  'Capability reviews at 30, 60, and 90 days',
];

const ADVISORY = [
  'Ongoing strategic media support',
  'Continued Operator development',
  'Quarterly media priorities',
  'Performance reviews',
  'Founder level advisory',
  'Access to the private Authority Engine founder network',
];

// ─── Timeline ────────────────────────────────────────────────────────────
// Drawn for the latest case: the Operator starts at the end of week 6, so the
// whole journey is 6 weeks of search plus 90 days of install, about 19 weeks.
// The faded part of the Install bar is the window an earlier start can land in.
// If the person starts earlier, everything after moves earlier with them.

const SPAN = 42 + 90; // days, latest case
const pct = (d: number) => `${((d - 1) / (SPAN - 1)) * 100}%`;

const PHASES: Array<{ num: string; name: string; from: number; to: number; early?: number }> = [
  { num: '01', name: 'Media Operating Brief', from: 1, to: 7 },
  { num: '02', name: 'Operator Selection', from: 1, to: 42 },
  { num: '03', name: 'MVP Operation', from: 8, to: SPAN },
  { num: '04', name: '90 Day Operator Install', from: 43, to: SPAN, early: 15 },
];

const MILESTONES = [
  { day: 1, label: 'Wk 1', detail: 'Media Operating Brief' },
  { day: 42, label: 'Wk 6', detail: 'Search period ends. Operator or interim owner starts, or decide the path.' },
  { day: 42 + 30, label: 'Day 30', detail: 'Capability review, 30 days after the Operator starts' },
  { day: 42 + 60, label: 'Day 60', detail: 'Capability review' },
  { day: SPAN, label: 'Day 90', detail: 'Final capability review and next stage recommendation' },
];

function Timeline() {
  return (
    <div className="mb-6">
      <div className="flex text-[11px] uppercase tracking-widest font-semibold mb-4">
        <p className="text-zinc-500 flex-shrink-0" style={{ width: pct(42) }}>Define and select</p>
        <p className="text-blue-400">90 day Operator Install</p>
      </div>
      <div className="relative">
        <div className="relative space-y-6 pb-4">
          {MILESTONES.map((m) => (
            <div key={m.day} className="absolute top-0 bottom-0 w-px bg-zinc-800" style={{ left: pct(m.day) }} />
          ))}
          {PHASES.map((p) => {
            const start = p.early ?? p.from;
            return (
              <div key={p.num} className="relative">
                <p className="text-[13px] mb-2" style={{ paddingLeft: pct(start) }}>
                  <span className="text-zinc-600 font-mono mr-2">{p.num}</span>
                  <span className="text-white font-semibold">{p.name}</span>
                </p>
                <div className="relative h-3">
                  {p.early && (
                    <div
                      className="absolute top-0 h-3 rounded-l-full bg-blue-500/25"
                      style={{ left: pct(p.early), width: `calc(${pct(p.from)} - ${pct(p.early)})` }}
                    />
                  )}
                  <div
                    className={`absolute top-0 h-3 bg-blue-500 ${p.early ? 'rounded-r-full' : 'rounded-full'}`}
                    style={{ left: pct(p.from), width: `calc(${pct(p.to)} - ${pct(p.from)})`, minWidth: '12px' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative h-8 border-t border-zinc-700">
          {MILESTONES.map((m, i) => {
            const edge = i === 0 ? 'left' : i === MILESTONES.length - 1 ? 'right' : 'mid';
            return (
              <div key={m.day} className="absolute top-0 w-0" style={{ left: pct(m.day) }}>
                <div className={`absolute w-2.5 h-2.5 rounded-full bg-white -top-[5px] ${edge === 'right' ? 'right-0' : edge === 'left' ? 'left-0' : '-left-[5px]'}`} />
                <p
                  className={`absolute top-3 text-white text-[11px] font-semibold whitespace-nowrap ${
                    edge === 'left' ? 'left-0' : edge === 'right' ? 'right-0' : 'left-0 -translate-x-1/2'
                  }`}
                >
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-zinc-500 text-[13px] mt-4">
        <span className="inline-block w-6 h-2 rounded-full bg-blue-500/25 align-middle mr-2" />
        If the Operator starts earlier, the 90 days start earlier with them.
      </p>

      <ul className="mt-8 space-y-2">
        {MILESTONES.map((m) => (
          <li key={m.day} className="flex gap-4 text-[14px] leading-relaxed">
            <span className="text-white font-semibold w-16 flex-shrink-0">{m.label}</span>
            <span className="text-zinc-400">{m.detail}</span>
          </li>
        ))}
      </ul>

      <p className="text-zinc-400 text-[14px] leading-relaxed mt-8">
        The engagement begins with the Media Operating Brief and a defined Operator search period. Once a permanent
        Operator or agreed interim media owner starts, the 90 day enablement period begins. The search period and
        Operator Install are separate stages.
      </p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

function StepSection({ s }: { s: Step }) {
  const half = s.blocks.filter((b) => b.half);
  const full = s.blocks.filter((b) => !b.half);
  const renderBlock = (b: Block, i: number) => (
    <div key={b.label ?? i}>
      {b.label && <Label>{b.label}</Label>}
      {b.paras?.map((t) => <div key={t} className={b.label ? '' : 'mt-8'}><P>{t}</P></div>)}
      {b.items && <BulletList items={b.items} />}
      {b.numbered && <div className="mt-2"><Numbered items={b.numbered} /></div>}
    </div>
  );
  return (
    <div className="py-10 border-b border-zinc-800 last:border-0">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-display text-4xl font-extrabold text-zinc-800">{s.num}</span>
        <div>
          <p className="font-display text-[19px] font-extrabold text-white">{s.title}</p>
          <p className="text-zinc-500 text-[12px] uppercase tracking-widest mt-1">{s.when}</p>
        </div>
      </div>
      {s.intro.map((t) => <P key={t}>{t}</P>)}
      {half.length > 0 && <div className="grid md:grid-cols-2 gap-x-8">{half.map(renderBlock)}</div>}
      {full.map(renderBlock)}
      {s.outro.length > 0 && (
        <div className="mt-8 pt-5 border-t border-zinc-800">
          {s.outro.map((t) => <P key={t}>{t}</P>)}
        </div>
      )}
    </div>
  );
}

export default function Dain() {
  return (
    <PasswordGate storageKey="dain-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="Operator Intensive, Rivyl"
          description="Give Rivyl one person who can own media without Dain carrying every decision."
          path="/dain"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="The Authority Engine · Operator Intensive"
          title="Give Rivyl one person who can own media"
          accent="without Dain carrying every decision."
          blurb="Rivyl has the brand, the offers, and the opportunity."
          backHref={null}
        />

        <Divider />

        <Wrap>
          <P>What it needs now is one capable person who can turn those advantages into consistent media without waiting for Dain to decide every topic or approve every project.</P>
          <P>The Operator Intensive is a defined search and installation process for that person, and it puts the right ownership around Rivyl's media function.</P>
          <P>We clarify what Rivyl needs from media, define the role around that requirement, support the search and selection process, then spend 90 days enabling the person to own the agreed operation.</P>

          <div className="mt-12">
            <H2>At the end of the process, Rivyl has</H2>
            <BulletList items={WILL_HAVE} />
          </div>
          <div className="mt-8">
            <P>The initial focus is deliberately narrow: make one media operation work consistently before adding more channels, formats, or volume.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>The path from founder dependent media to owned media</H2>
          <Timeline />
          <div>
            {STEPS.map((s) => <StepSection key={s.num} s={s} />)}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Completion standard</H2>
          <P>At Day 90 of the Operator Install, the person is assessed against the agreed scorecard and Rivyl receives a final capability review and next stage recommendation.</P>
          <P>The engagement is delivered when:</P>
          <Ticks items={DELIVERED} />
          <Label>The final review assesses whether the Operator can</Label>
          <BulletList items={FINAL_REVIEW} />
        </Wrap>

        <Divider />

        <Wrap>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            <div>
              <p className="font-display text-[19px] font-extrabold text-white mb-5">What is included</p>
              <Ticks items={INCLUDED} />
            </div>
            <div>
              <p className="font-display text-[19px] font-extrabold text-white mb-2">What is not included</p>
              <p className="text-zinc-500 text-[14px] mb-5">This is not:</p>
              <Ticks items={NOT_INCLUDED} tone="out" />
            </div>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Rivyl's responsibilities</H2>
          <P>For this to work, Rivyl must provide:</P>
          <BulletList items={RESPONSIBILITIES} />
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Investment</H2>
          <p className="font-display text-4xl font-extrabold text-white mb-1">$30,000 AUD</p>
          <p className="text-zinc-400 text-[14px] mb-8">structured as a $20,000 retained install fee plus a $10,000 placement and enablement fee</p>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <p className="text-white text-[15px] font-semibold mb-4">$20,000 AUD define and select</p>
              <BulletList items={CORE} />
            </div>
            <div>
              <p className="text-white text-[15px] font-semibold mb-4">$10,000 AUD 90 day Operator Install</p>
              <BulletList items={INSTALL} />
            </div>
          </div>
          <div className="mt-8">
            <P>The final $10,000 is due when the permanent Operator or interim owner starts.</P>
            <P>If no permanent Operator or interim owner starts, the $10,000 Operator Install fee is not due. The completed Define and Select work remains delivered and retained.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>After the Intensive</H2>
          <P>At the end of the 90 day Operator Install, Rivyl may be invited to continue into the 12 month Authority Engine Advisory.</P>
          <P>That is a separate continuation designed for clients who want:</P>
          <BulletList items={ADVISORY} />
          <div className="mt-8">
            <P>The 12 month advisory is not required to complete the Operator Intensive and is not included in the $30,000 investment.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <Strong>What Rivyl needs is one person accountable for turning the brand into a functioning media operation.</Strong>
          <P>The Operator Intensive is how we define that seat, support the selection process, and enable the person who fills it.</P>

          <p className="text-zinc-500 text-[13px] leading-relaxed mt-16 pt-6 border-t border-zinc-800">
            PS. Selected clients may also be invited into the Founding Partner referral partnership, which sits outside
            the Operator Intensive under a separate partner agreement. It is for trusted introductions only, and there
            is no obligation to sell.
          </p>
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
