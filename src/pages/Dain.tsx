import React from 'react';
import { Check, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, H2, BulletList } from '../components/undeniable/Bits';

/* Dain Walker / Rivyl. Operator Intensive proposal for the CEO.
   Copy is Sean's, verbatim (5 Oct 2026). Only mechanical changes: straight
   apostrophes, no hyphens in compound adjectives, source citations removed.
   Do not rephrase. */

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-300 text-[16px] leading-relaxed mb-5 last:mb-0">{children}</p>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white text-[14px] font-semibold mt-8 mb-4">{children}</p>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-2 border-blue-500 pl-5 my-8 text-white text-[17px] leading-relaxed">{children}</blockquote>
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

const Card = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <div className={`rounded-xl border ${accent ? 'border-blue-500/20' : 'border-zinc-800'} bg-elevated/40 p-6 md:p-7`}>{children}</div>
);

// ─── Copy ────────────────────────────────────────────────────────────────

const OUTCOME = [
  'A clear Media Operating Brief',
  'A defined Operator role and decision framework',
  'A tested hiring and selection process',
  'One accountable person responsible for the media operation',
  'A minimum viable media cadence',
  'Documented standards, workflows, and scorecards',
  'An Operator capable of owning the agreed operation with Rivyl managing them and The Authority Engine advising them',
];

type Step = {
  num: string;
  title: string;
  when: string;
  intro: string[];
  lists: Array<{ label: string; items: string[] }>;
  outro: string[];
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Media Operating Brief',
    when: 'Week 1',
    intro: [
      'We begin with one focused working day with Dain and the CEO.',
      'This is not a traditional brand day. It is a working session to clarify what Rivyl actually needs from media.',
    ],
    lists: [
      {
        label: 'We will define',
        items: [
          'What media needs to accomplish for the business',
          'Which audience, offer, and business priority matter most',
          'What the Operator must own',
          'What decisions the Operator can make independently',
          'What requires founder approval',
          'The minimum weekly media operation',
          'The scorecard for the first 90 days',
        ],
      },
      {
        label: 'You receive',
        items: [
          'Media Operating Brief',
          'Operator role definition',
          'Decision rights',
          'Minimum viable media operation',
          '30, 60, and 90 day scorecard',
          'Hiring or capability recommendation',
        ],
      },
    ],
    outro: ['Nothing expands until the brief is agreed.'],
  },
  {
    num: '02',
    title: 'Operator Selection',
    when: 'Weeks 1 to 5',
    intro: ['We identify the capability required, then assess people against the actual work.'],
    lists: [
      {
        label: 'The Authority Engine will support Rivyl with',
        items: [
          'Role and hiring scorecard',
          'Candidate application filter',
          'Practical work assessment',
          'Review of candidate thinking and judgment',
          'Interview structure',
          'Final interview support',
          'Hiring recommendation',
        ],
      },
      {
        label: 'Candidates will be assessed on their ability to',
        items: [
          'Understand the brand quickly',
          'Turn unclear direction into a plan',
          'Make sensible tradeoffs',
          'Own a project from idea to completion',
          'Coordinate people and deadlines',
          'Explain why a piece of media should exist',
          'Learn from performance data',
        ],
      },
    ],
    outro: [
      'Rivyl makes the final hiring decision and employs the Operator.',
      'We do not guarantee a perfect hire by a specific date. We reduce the risk by testing judgment before relying on a résumé or portfolio.',
    ],
  },
  {
    num: '03',
    title: 'Operator Enablement',
    when: 'Up to 90 days from commencement',
    intro: ['Once the Operator is selected, The Authority Engine trains and enables them through real Rivyl work.'],
    lists: [
      {
        label: 'The Operator progressively takes ownership of',
        items: [
          'Media planning',
          'Content calendars',
          'Project briefs',
          'Shoot and production coordination',
          'Quality standards',
          'Publishing workflow',
          'Performance reporting',
          'Weekly priorities',
          'End to end project ownership',
        ],
      },
      {
        label: 'The Authority Engine provides',
        items: [
          'Weekly Operator training',
          'Review of real work',
          'Decision making feedback',
          'Media standards and checklists',
          'Scorecard reviews',
          'Operating playbook development',
          'Strategic guidance where required',
          'Day 30, 60, and 90 capability reviews',
        ],
      },
    ],
    outro: ['Rivyl remains responsible for managing the Operator and the day to day execution.'],
  },
];

const COMPLETION = [
  'Explain what should be made and why',
  'Make normal media decisions without constant approval',
  'Move projects from brief to completion',
  'Maintain the agreed weekly cadence',
  'Coordinate the required people and resources',
  'Report performance clearly',
  'Use the playbook, standards, and scorecard',
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
  'Capability reviews at Days 30, 60, and 90',
  'Strategic media advice directly related to the installation',
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

const PAYMENTS = ['$15,000 AUD on commencement', '$15,000 AUD on Day 31'];

const ADVISORY = [
  'Ongoing strategic media support',
  'Continued Operator development',
  'Quarterly media priorities',
  'Performance reviews',
  'Founder level advisory',
  'Access to the private Authority Engine founder network',
];

// ─── Page ────────────────────────────────────────────────────────────────

function StepCard({ s }: { s: Step }) {
  return (
    <Card>
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-display text-4xl font-extrabold text-zinc-800">{s.num}</span>
        <div>
          <p className="font-display text-[19px] font-extrabold text-white">{s.title}</p>
          <p className="text-zinc-500 text-[12px] uppercase tracking-widest mt-1">{s.when}</p>
        </div>
      </div>
      {s.intro.map((t) => <P key={t}>{t}</P>)}
      <div className="grid md:grid-cols-2 gap-x-8">
        {s.lists.map((l) => (
          <div key={l.label}>
            <Label>{l.label}</Label>
            <BulletList items={l.items} />
          </div>
        ))}
      </div>
      <div className="mt-8 pt-5 border-t border-zinc-800">
        {s.outro.map((t) => <P key={t}>{t}</P>)}
      </div>
    </Card>
  );
}

export default function Dain() {
  return (
    <PasswordGate storageKey="dain-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="Operator Intensive, Rivyl"
          description="One capable Operator. One clear media operation. Ninety days to install the capability."
          path="/dain"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="The Authority Engine"
          title="Operator"
          accent="Intensive"
          blurb="One capable Operator. One clear media operation. Ninety days to install the capability."
          backHref={null}
        />

        <Wrap>
          <P>Rivyl does not need more content for the sake of content.</P>
          <P>It needs one person who can understand the brand, make good decisions, own projects from beginning to end, and keep the media operation moving without Dain becoming the bottleneck.</P>
          <P>The Operator Intensive is a 90 day enablement engagement designed to help Rivyl define, select, and equip that person.</P>
          <P>This is not a content agency, a brand rebuild, or a promise of guaranteed leads.</P>
          <P>It is the installation of the person, standards, and operating system required for Rivyl to run media properly.</P>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>The outcome</H2>
          <P>By the end of the engagement, Rivyl will have:</P>
          <BulletList items={OUTCOME} />
          <p className="text-zinc-400 text-[15px] mt-8">The standard is simple:</p>
          <Quote>The Operator understands what needs to happen, makes normal operating decisions, owns projects end to end, and keeps the system moving without daily direction from Sean or Dain.</Quote>
          <P>The goal is capability, not dependency. If Sean disappeared tomorrow, the Operator should still know what to do.</P>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>How it works</H2>
          <div className="space-y-4">
            {STEPS.map((s) => <StepCard key={s.num} s={s} />)}
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>Completion standard</H2>
          <P>The engagement is complete when the Operator can:</P>
          <Ticks items={COMPLETION} />
          <div className="mt-8">
            <P>The minimum operation must be stable before additional platforms, formats, or volume are added. Simple scales. Complexity comes later, after the core system works.</P>
          </div>
        </Wrap>

        <Divider />

        <Wrap>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <p className="font-display text-[19px] font-extrabold text-white mb-5">What is included</p>
              <Ticks items={INCLUDED} />
            </Card>
            <Card>
              <p className="font-display text-[19px] font-extrabold text-white mb-2">What is not included</p>
              <p className="text-zinc-500 text-[14px] mb-5">This is not:</p>
              <Ticks items={NOT_INCLUDED} tone="out" />
            </Card>
          </div>
          <p className="text-zinc-400 text-[14px] leading-relaxed mt-6">
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
          <Card accent>
            <p className="font-display text-4xl font-extrabold text-white mb-1">$30,000 AUD</p>
            <p className="text-zinc-400 text-[14px] mb-6">across 90 days</p>
            <BulletList items={PAYMENTS} />
            <div className="mt-6 pt-5 border-t border-zinc-800">
              <P>The initial payment secures the engagement and begins the Media Operating Brief.</P>
              <P>The continuation payment covers the remaining enablement and installation period.</P>
            </div>
          </Card>
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
          <P>The partnership is not a sales obligation. It exists for trusted introductions where Rivyl genuinely believes The Authority Engine can help.</P>
        </Wrap>

        <Divider />

        <Wrap>
          <H2>The decision</H2>
          <P>The question is not whether Rivyl needs more content.</P>
          <P>The question is:</P>
          <Quote>Does Rivyl want one capable person who can own the media operation, make better decisions, and keep the system moving without Dain carrying it?</Quote>
          <P>If yes, the Operator Intensive is the process for installing that capability.</P>
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
