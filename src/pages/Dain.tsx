import React from 'react';
import { Check, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, H2, BulletList } from '../components/undeniable/Bits';

/* Dain Walker / Rivyl. Operator Intensive proposal for the CEO.
   Copy is Sean's (5 Oct 2026, second pass). Mechanical changes only: straight
   apostrophes, no hyphens in compound adjectives, citations removed, and the
   ban list lines rewritten. Do not rephrase.
   Sell the outcome on this page. Liability mechanics live in the agreement.
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

const OUTCOME = [
  'A written 90 day media plan signed off by Dain and the CEO',
  'A defined Operator role and decision framework',
  'A structured hiring and selection process',
  'A selected Operator or agreed interim operating solution',
  'A minimum viable media operation running on a defined weekly cadence',
  'Documented standards, workflows, and scorecards',
  'A final capability review against the agreed Operator scorecard',
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
        label: 'MVP boundary',
        paras: ['The initial operation is deliberately limited to:'],
        items: [
          'One priority audience',
          'One primary business objective',
          'One core media workflow',
          'One agreed weekly cadence',
          'One scorecard for measuring progress',
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
          'Role and hiring scorecard',
          'Candidate application filter',
          'Practical work assessment',
          'Interview structure',
          'Candidate review',
          'Final interview support',
          'Hiring recommendation',
        ],
      },
      {
        paras: [
          'Rivyl makes the final hiring decision and employs the Operator.',
          'If the Operator search takes longer than expected, Rivyl will not be left without progress. By approximately Week 6, Rivyl and The Authority Engine will agree in writing to one of three paths:',
        ],
        numbered: [
          'Proceed with the selected Operator and begin enablement',
          'Use an interim contractor to run the MVP while the search continues',
          'Pause the enablement period for a defined period while the search continues',
        ],
      },
    ],
    outro: [
      'The search includes one defined search period, candidate assessment, and final interview support. Continuing the search beyond that period is agreed separately.',
      'Interim freelancers, production costs, and contractor fees are paid separately by Rivyl.',
    ],
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
    outro: ['The MVP remains limited to the agreed audience, objective, workflow, and cadence.'],
  },
  {
    num: '04',
    title: 'Operator Enablement',
    when: 'From the Operator\'s start date through Day 90',
    intro: ['Once the Operator begins, The Authority Engine trains and enables them through real Rivyl work.'],
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
        label: 'The Operator ramp, from their start date',
        items: [
          'First 2 weeks: understand the brand, build the calendar, run the first workflow',
          'Day 30: make content decisions and explain why',
          'Day 60: own the pipeline from brief to publication',
          'Day 90: run the agreed MVP and recommend improvements',
        ],
      },
      {
        label: 'The Authority Engine provides',
        half: true,
        items: [
          'Weekly Operator enablement',
          'Review of real work',
          'Decision making feedback',
          'Media standards and checklists',
          'Scorecard reviews',
          'Operating playbook development',
          'Strategic advice directly related to the agreed Media Operating Brief and Operator enablement',
          'Capability reviews 30 and 60 days from the Operator\'s start date, and a final review at Day 90',
        ],
      },
    ],
    outro: [
      'Rivyl manages the Operator. The Authority Engine trains, reviews, and assesses them.',
      'If the Operator leaves within 60 days for reasons unrelated to Rivyl changing the role, The Authority Engine will run one replacement search.',
    ],
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
  'Maintain the agreed weekly cadence',
  'Coordinate the required people and resources',
  'Report performance clearly',
  'Identify what should improve next',
];

const INCLUDED = [
  'One Media Operating Brief day',
  'Operator role and decision framework',
  'Hiring scorecard and practical assessment',
  'Candidate review and interview support',
  'Weekly Operator enablement',
  'Weekly media review',
  'Media standards and approval checklists',
  'KPI scorecard',
  'Operating playbook',
  'Capability reviews at 30 and 60 days from the Operator\'s start date, and a final review at Day 90',
  'Strategic media advice directly related to the installation',
  'One replacement search if the Operator leaves within 60 days, unless the role has changed',
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
  'MVP media specification',
  'Operator role and scorecard',
  'Hiring process and candidate assessment',
  'Search support and interview support',
  'Operator enablement plan',
  'Standards, playbook, and capability review',
];

const PAYMENTS = [
  '$10,000 AUD on commencement',
  '$10,000 AUD when the search process is built and the candidate process is active',
  '$10,000 AUD when the Operator starts and enablement begins',
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
// Days across the fixed 90 day engagement. Spans come from the step timings:
// Brief week 1, Selection weeks 1 to 6, MVP from week 2 where practical,
// Enablement from the Operator's start. The faded part of the Enablement bar
// is the window the start date can land in; the solid part is the latest case.

const DAYS = 90;
const pct = (d: number) => `${((d - 1) / (DAYS - 1)) * 100}%`;

const PHASES: Array<{ num: string; name: string; from: number; to: number; early?: number }> = [
  { num: '01', name: 'Media Operating Brief', from: 1, to: 7 },
  { num: '02', name: 'Operator Selection', from: 1, to: 42 },
  { num: '03', name: 'MVP Operation', from: 8, to: 90 },
  { num: '04', name: 'Operator Enablement', from: 43, to: 90, early: 15 },
];

const MILESTONES = [
  { day: 1, label: 'Day 1', detail: 'Commencement. Media Operating Brief day.' },
  { day: 42, label: 'Wk 6', detail: 'Agree the path in writing: proceed with the selected Operator, use an interim contractor to run the MVP, or pause enablement while the search continues.' },
  { day: 90, label: 'Day 90', detail: 'Fixed end date. Final capability review.' },
];

function Timeline() {
  return (
    <div className="mb-6">
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
        Enablement starts on the Operator's start date, anywhere in this window.
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
        The engagement has a fixed end date 90 days after the agreed commencement date. Operator capability
        milestones are measured from the Operator's start date. If hiring, access, approvals, or internal
        availability are delayed by Rivyl, the relevant enablement milestones may be affected. Any pause,
        extension, or interim operating arrangement must be agreed in writing.
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
          description="One Operator owning Rivyl's media operation, enabled over 90 days."
          path="/dain"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="The Authority Engine"
          title="Operator"
          accent="Intensive"
          blurb="One Operator owning Rivyl's media operation, enabled over 90 days."
          backHref={null}
        />

        <Wrap>
          <P>Rivyl needs one person who can understand the brand, make sound decisions, own projects end to end, and keep the media operation moving without Dain becoming the bottleneck.</P>
          <P>The Operator Intensive helps Rivyl clarify the media capability it needs, select the right person, and equip them with the standards, systems, and judgment required to own the agreed operation.</P>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>The outcome</H2>
          <P>By the end of the engagement, Rivyl will have:</P>
          <BulletList items={OUTCOME} />
          <div className="mt-8">
            <P>The aim is the minimum operation Rivyl needs to run media consistently, and then developing the person responsible for owning it. More channels and more volume come after that.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>How it works</H2>
          <Timeline />
          <div>
            {STEPS.map((s) => <StepSection key={s.num} s={s} />)}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Completion standard</H2>
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
          <p className="text-zinc-400 text-[14px] leading-relaxed mt-8">
            Operator wages, contractors, production costs, software, travel, and other third party expenses are separate.
          </p>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Rivyl's responsibilities</H2>
          <P>For this to work, Rivyl must provide:</P>
          <BulletList items={RESPONSIBILITIES} />
          <div className="mt-8">
            <P>If Rivyl delays access, decisions, hiring, or implementation, the delivery timeline moves accordingly.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Investment</H2>
          <p className="font-display text-4xl font-extrabold text-white mb-1">$30,000 AUD</p>
          <p className="text-zinc-400 text-[14px] mb-8">total investment, structured as a $20,000 retained install fee plus a $10,000 placement and enablement fee</p>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <p className="text-white text-[15px] font-semibold mb-1">$20,000 AUD core install</p>
              <p className="text-zinc-500 text-[14px] mb-4">Paid for the work The Authority Engine controls</p>
              <BulletList items={CORE} />
            </div>
            <div>
              <p className="text-white text-[15px] font-semibold mb-1">$10,000 AUD placement and enablement</p>
              <p className="text-zinc-500 text-[14px] mb-4">Due when</p>
              <BulletList items={['Rivyl hires an Operator', 'The Operator starts', 'The agreed enablement work with them begins']} />
            </div>
          </div>

          <Label>Payments</Label>
          <BulletList items={PAYMENTS} />
          <div className="mt-8">
            <P>If no hire is made, Rivyl still owns the completed brief, search process, and operating system, and the placement and enablement fee is not due.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>After the Intensive</H2>
          <P>At the end of 90 days, Rivyl may be invited to continue into the 12 month Authority Engine Advisory.</P>
          <P>That is a separate continuation designed for clients who want:</P>
          <BulletList items={ADVISORY} />
          <div className="mt-8">
            <P>The 12 month advisory is not required to complete the Operator Intensive and is not included in the $30,000 investment.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Founding Partner Opportunity</H2>
          <P>Selected clients may also be invited to participate in the Founding Partner referral partnership.</P>
          <P>This is separate from the Operator Intensive.</P>
          <P>If Rivyl introduces qualified founders who become paying Authority Engine clients, Rivyl may earn additional private media strategy, training, or implementation privileges under a separate partner agreement.</P>
          <P>It is for trusted introductions only, where Rivyl genuinely believes The Authority Engine can help, and there is no obligation to sell.</P>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>The decision</H2>
          <P>It comes down to one question:</P>
          <Strong>Does Rivyl want one capable person who can own the media operation, make better decisions, and keep the system moving without Dain carrying it?</Strong>
          <P>If yes, the Operator Intensive is the process for installing that capability.</P>
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
