import {
  Bullets,
  Card,
  CheckList,
  DocHeader,
  DocLayout,
  DocSection,
  Label,
  Numbered,
  Quote,
  RowCard,
  Rule,
  Section,
  Slot,
  Statement,
  Table,
} from './Bits';

/*
  Document two: the Phase 1 consulting engagement.

  The role brief says what the job is. This says what is being bought, what it
  costs, and how both sides know on day 90 whether it worked. It is the document
  that gets agreed, so every number in it is a commitment: nothing here is
  softened or rounded for the sake of the layout.

  The KPI tables are the spine of it. They scroll inside themselves on a phone
  rather than being collapsed into cards, because the whole point of a scoreboard
  is seeing baseline, 30, 60 and 90 next to each other.
*/

export const ENGAGEMENT_SECTIONS: DocSection[] = [
  { id: 'what-this-is', label: 'What this is' },
  { id: 'the-mission', label: 'The mission' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'commercials', label: 'Commercials' },
  { id: 'baseline', label: 'Week 1 baseline' },
  { id: 'scoreboard', label: 'The scoreboard' },
  { id: 'month-1', label: 'Month 1' },
  { id: 'month-2', label: 'Month 2' },
  { id: 'month-3', label: 'Month 3' },
  { id: 'sean-commits', label: 'What Sean commits to' },
  { id: 'cadence', label: 'Working cadence' },
  { id: 'phase-2', label: 'Phase 2' },
  { id: 'open-items', label: 'Open items' },
];

const META = [
  { k: 'Company', v: 'Authority Engine' },
  { k: 'Document', v: 'Consulting engagement' },
  { k: 'Version', v: '24 August 2026' },
  { k: 'Term', v: '90 days' },
  { k: 'Value', v: '$5,000 per month. $15,000 total.' },
];

const COMMERCIALS = [
  { k: 'Fee', v: '$5,000 per month' },
  {
    k: 'Term',
    v: 'Initial 30 day pilot ($5,000 AUD). If both parties agree at Day 30, extend for a further 60 days at $5,000 AUD per month. $15,000 AUD total if fully extended.',
  },
  { k: 'Type', v: 'Contractor / consultant. You invoice monthly.' },
  {
    k: 'Guide hours',
    v: '~15 to 20 hours per week. A guide, not a timesheet. Hours are not tracked.',
  },
  { k: 'Location', v: 'Remote (Brisbane / Gold Coast), in person for days as needed' },
  { k: 'Reports to', v: 'Sean Fox' },
  { k: 'Start', v: 'ASAP' },
];

const TERMS_NOTES = [
  {
    lead: 'Completion bonus, optional.',
    body: 'Payable at day 90 only if every day 90 KPI below is hit. One bonus, one condition, no other levers.',
  },
  {
    lead: 'This fee buys an outcome, not hours.',
    body: "Four things: brand day pre and post off Sean's plate, 90 Day admin off Sean's plate, systems and SOPs a VA can run 80% of, and Sean back in Create and Communicate only. If that takes 50 hours or 150, the deal is the same.",
  },
  {
    lead: 'Scope guard.',
    body: 'The fee is fixed against the outcomes in this document. If new work appears that is not in scope, it goes on a list and we decide together at the next checkpoint. It does not get quietly absorbed. This clause exists to protect you, not Sean.',
  },
  {
    lead: 'Deliberately simple.',
    body: 'One number, one term, one optional bonus. No hourly tracking, no rev share, no title ladder in Phase 1. Complexity in the deal is how people end up not knowing what they are actually being paid, and you have just left a role that was unclear enough. Titles and upside are a Phase 2 conversation, once the core thing is proven.',
  },
];

const SCOREBOARD: (string | JSX.Element)[][] = [
  [
    'Founder hours/week on admin & glue',
    <Slot>record wk 1</Slot>,
    '≤ 50% of baseline',
    '≤ 25% of baseline',
    '≈ 0',
  ],
  [
    'Founder touches per brand day cycle',
    <Slot>record wk 1</Slot>,
    '2 or fewer',
    '1 (the voice note)',
    '1 (the voice note)',
  ],
  ['Brand day artefacts delivered within 48h', '-', '100%', '100%', '100%'],
  ['Recurring tasks with SOP + Loom + checklist', '0', '30%', '70%', '100%'],
  ['Founder admin hours/month moved to VA', '0', '0', '10 to 15', '15+'],
  ['Founder hours/month managing the VA', '-', '-', '0', '0'],
  ['Replacement test passed', '-', '-', '-', 'Yes'],
];

const SEAN_COMMITS = [
  {
    lead: 'A 30 to 45 minute voice note or Loom after every brand day, delivered within 24 hours of the day.',
    body: 'The 48 hour artefact deadline is impossible without it.',
  },
  { lead: 'Decisions inside 24 hours', body: 'when you flag something needing one.' },
  { lead: 'The weekly 1:1 held,', body: 'not moved.' },
  { lead: 'No new scope', body: 'added while the spine is being built.' },
  {
    lead: 'Access and introductions to anyone you need.',
    body: 'Editors, contractors, clients, tools. You should never be blocked waiting on a connection.',
  },
  {
    lead: 'He stops doing your work.',
    body: 'Any time he catches himself doing something in your remit, he hands it over with "this is yours now, build the system so we never talk about it again."',
  },
];

const CADENCE = [
  {
    k: 'Weekly 1:1',
    v: '30 minutes, structured. Progress against KPIs, blockers, priorities for the week ahead.',
  },
  {
    k: 'Async comms',
    v: 'Respond within a few hours during working hours. Nothing urgent goes unanswered.',
  },
  { k: 'Milestone reviews', v: 'Day 30, 60, 90. Formal, both sides, against the KPI table.' },
];

const COMMUNICATION = [
  {
    lead: 'Bring solutions, not problems.',
    body: 'Hit a wall, come with at least one option.',
  },
  { lead: 'Flag early.', body: 'Nothing sits for a week before being raised.' },
  {
    lead: 'Push back.',
    body: 'If something does not make sense operationally, say so. That is part of what is being bought.',
  },
  { lead: 'Own your area.', body: 'If it is in your remit and it is not done, it is on you.' },
];

function LeadList({ items }: { items: { lead: string; body: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.lead} className="flex gap-3">
          <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
          <p>
            <span className="text-zinc-200">{i.lead}</span> {i.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* One month of the plan. Same shape three times, so the reader learns it once. */
function Month({
  id,
  n,
  title,
  theme,
  intro,
  outcomes,
  kpiTitle,
  kpis,
  children,
}: {
  id: string;
  n: string;
  title: string;
  theme: string;
  intro?: React.ReactNode;
  outcomes: React.ReactNode;
  kpiTitle: string;
  kpis: React.ReactNode[];
  children?: React.ReactNode;
}) {
  return (
    <Section id={id} eyebrow={n} title={title}>
      <p className="text-zinc-300">{theme}</p>
      {intro}

      <div className="pt-2">
        <div className="mb-5">
          <Label>Outcomes</Label>
        </div>
        <div className="space-y-5">{outcomes}</div>
      </div>

      {children}

      <div className="pt-4">
        <Card label={kpiTitle}>
          <CheckList items={kpis} />
        </Card>
      </div>
    </Section>
  );
}

export function EngagementHeader() {
  return (
    <DocHeader
      meta={META}
      title="Consulting engagement"
      strap="A defined 90 day project with a mission, an end state and a scoreboard. On day 90 we can both point at the numbers and say whether it worked."
      footnote="90 days · $5,000 per month · $15,000 total"
    />
  );
}

export default function Engagement() {
  return (
    <DocLayout sections={ENGAGEMENT_SECTIONS}>
      <Section id="what-this-is" eyebrow="The frame" title="What this is">
        <p>
          This is a project, not an open ended ops role. It has a defined mission, a defined end
          state and a scoreboard. On day 90 we can both point at the numbers and say whether it
          worked.
        </p>
        <p>
          That distinction matters. You have come out of an environment with twenty plates spinning
          and no clear definition of winning. This is deliberately the opposite:
        </p>
        <Statement>One mission, three responsibilities, measurable KPIs.</Statement>
      </Section>

      <Rule />

      <Section id="the-mission" eyebrow="The mission" title="One sentence, two ways" accent>
        <Quote>
          Take everything that happens around Brand Days and 90 Day Installs and centralise it into
          simple systems and SOPs, so a VA can run 80% of it and Sean only does marketing and client
          facing work.
        </Quote>

        <p className="pt-2">The harder version of the same sentence:</p>

        <Quote>
          Build it so that any single person in the production pipeline can be removed and replaced
          within 48 hours without delivery breaking.
        </Quote>
      </Section>

      <Rule />

      <Section id="responsibilities" eyebrow="The brief" title="The three responsibilities">
        <p>
          Everything rolls up to one of these. If a task does not serve one of them, it is not the
          job.
        </p>

        <Numbered
          items={[
            "Protect Sean's time",
            'Turn Brand Days and calls into clean, repeatable plans',
            'Systematise and delegate all admin',
          ]}
        />

        <p className="pt-2">
          The first step, and the thing that matters most in month one:{' '}
          <span className="text-white font-medium">get Sean out of the admin.</span>
        </p>
      </Section>

      <Rule />

      <Section id="commercials" eyebrow="Commercials" title="One number, one term, one bonus">
        <RowCard rows={COMMERCIALS} />
        <div className="pt-2">
          <LeadList items={TERMS_NOTES} />
        </div>
      </Section>

      <Rule />

      <Section id="baseline" eyebrow="Week 1" title="Establish the baseline">
        <p>
          Nothing gets built until we know the starting number. Without a baseline, "saved Sean
          time" is a feeling, not a KPI.
        </p>

        <Card>
          <CheckList
            items={[
              'Sean completes the Hourly Time Audit, 7 Day Log, for one full week',
              'You categorise every hour into: Create, Communicate, Admin & glue, Other',
              'Record the baseline figures below. They are the reference point for the entire 90 days.',
            ]}
          />
        </Card>

        <Table
          head={['Baseline metric', 'Week 1 figure']}
          rows={[
            ['Founder hours per week on admin & glue', <Slot />],
            ['Founder hours per brand day cycle (outside the day itself)', <Slot />],
            ['Founder touches per brand day cycle', <Slot />],
            ['Recurring admin tasks with no SOP', <Slot />],
          ]}
        />
      </Section>

      <Rule />

      <Section id="scoreboard" eyebrow="The scoreboard" title="Tracked the whole 90 days" accent>
        <p>Reviewed at each checkpoint.</p>

        <Table head={['KPI', 'Baseline', 'Day 30', 'Day 60', 'Day 90']} rows={SCOREBOARD} />

        <div className="pt-2">
          <Label>The single sentence version</Label>
        </div>
        <Statement>
          If on day 90 Sean is spending almost all his time on marketing and client facing work, and
          the machine around it feels simple and repeatable, this worked.
        </Statement>
      </Section>

      <Rule />

      <Month
        id="month-1"
        n="Month 1"
        title="Build the spine"
        theme="Days 1 to 30. Theme: get Sean out of the admin."
        outcomes={
          <>
            <div>
              <p className="text-zinc-200 mb-4">
                The five spine assets built to v1 and in use:
              </p>
              <Numbered
                items={[
                  'Written 90 Day Install checklist. What done looks like at each stage.',
                  'Brand day post-processing checklist. Those ~4 hours broken into 10 to 15 followable steps.',
                  'Client tracker. Stage, dates, next action, owner.',
                  'Weekly cadence form and scoreboard. Wired and collecting.',
                  'Portal layout. Start Here, This Week, Trainings, Forms, Replays. Standard for every client.',
                ]}
              />
            </div>

            <LeadList
              items={[
                {
                  lead: 'Brand day pre and post running through you, not Sean.',
                  body: 'He no longer books, chases, uploads or formats anything outside the calls themselves.',
                },
                { lead: '90 Day Install admin off his plate.', body: '' },
                { lead: 'Calendar, scheduling and meeting prep owned by you.', body: '' },
                {
                  lead: 'SOP documentation started.',
                  body: 'Loose v1s are fine at this stage, they just have to exist.',
                },
              ]}
            />
          </>
        }
        kpiTitle="Day 30 KPIs · pass / fail"
        kpis={[
          '5 of 5 spine assets live and in use on a real client',
          <>
            Founder hours per week on admin & glue at or below{' '}
            <span className="text-zinc-200">50% of baseline</span>
          </>,
          '100% of brand days in month 1 delivered to portal within 48 hours',
          <>
            Founder touches per brand day cycle down to{' '}
            <span className="text-zinc-200">2 or fewer</span>
          </>,
          'Zero founder time spent on setup, follow-up, uploads or formatting',
          'At least 30% of recurring tasks documented',
        ]}
      >
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-6">
          <p className="text-zinc-300 text-[15px] leading-relaxed">
            <span className="text-white font-medium">Hard constraint.</span> No new features, offers
            or systems get built until this spine is working for 2 to 3 clients.
          </p>
        </div>
      </Month>

      <Rule />

      <Month
        id="month-2"
        n="Month 2"
        title="Systematise admin and install the VA"
        theme="Days 31 to 60. Theme: you own the admin problem, you don't do the admin."
        intro={
          <Quote>
            You own the admin problem. I don't care how it's solved, system, VA, automation, but it
            cannot land back on my plate.
          </Quote>
        }
        outcomes={
          <LeadList
            items={[
              {
                lead: 'Full inventory of every recurring admin task Sean still touches.',
                body: 'Every one categorised: automate, delegate to VA, keep with Ops, or kill.',
              },
              {
                lead: 'SOPs and Looms written',
                body: 'for everything on that inventory, designed so a VA can follow them cold.',
              },
              {
                lead: 'VA sourced, onboarded and producing.',
                body: "With Sean's approval on the hire, but the sourcing, onboarding and management is yours. Starting scope: calendar bookings, basic email triage, file uploads, simple client reminders, portal housekeeping.",
              },
              { lead: 'You manage the VA.', body: 'Sean does not.' },
              {
                lead: 'Spine assets upgraded to v2',
                body: 'based on what the first 30 days actually taught you.',
              },
              {
                lead: 'At least one brand day attended in person',
                body: 'so you understand the client experience from their side.',
              },
            ]}
          />
        }
        kpiTitle="Day 60 KPIs · pass / fail"
        kpis={[
          '100% of recurring admin tasks inventoried and categorised',
          'At least 70% of recurring tasks have SOP + Loom + checklist',
          'VA onboarded and producing independently',
          <>
            <span className="text-zinc-200">10 to 15 hours per month</span> of founder admin moved
            to the VA
          </>,
          <>
            Founder hours per week on admin & glue at or below{' '}
            <span className="text-zinc-200">25% of baseline</span>
          </>,
          <>
            Founder hours spent managing the VA: <span className="text-zinc-200">zero</span>
          </>,
          <>
            Founder touches per brand day cycle down to{' '}
            <span className="text-zinc-200">1</span>, the clarifying voice note
          </>,
        ]}
      />

      <Rule />

      <Month
        id="month-3"
        n="Month 3"
        title="De-risk and harden"
        theme="Days 61 to 90. Theme: make yourself replaceable, and prove it."
        intro={
          <p>
            You are being paid to make yourself non essential, not to be the only person who knows
            how it works. That is the deliverable.
          </p>
        }
        outcomes={
          <LeadList
            items={[
              {
                lead: 'Every repeating task in your world has all three:',
                body: 'a 1 to 2 page written SOP, a short Loom, and a checklist.',
              },
              {
                lead: 'Every role has a scorecard.',
                body: "Purpose, 3 to 5 outcomes, 3 to 5 KPIs. Yours and the VA's.",
              },
              {
                lead: 'Every role has a 30 day onboarding doc.',
                body: 'What a new person does in week 1, 2, 3, 4.',
              },
              { lead: 'The replacement test is run and passed.', body: 'See below.' },
              { lead: 'Content capture coordination', body: 'picked up as needed.' },
            ]}
          />
        }
        kpiTitle="Day 90 KPIs · pass / fail"
        kpis={[
          <>
            <span className="text-zinc-200">100%</span> of repeating tasks have SOP + Loom +
            checklist
          </>,
          'Scorecards exist for the Ops role and the VA role',
          '30 day onboarding docs exist for both roles',
          'Replacement test run and passed with zero clarifying questions',
          <>
            Founder hours per week on admin & glue: <span className="text-zinc-200">≈ 0</span>
          </>,
          'VA fully self-managing under your oversight',
          'Sean can step away for a week and nothing breaks',
          "Sean's time is on marketing and high leverage client work only",
        ]}
      >
        <div className="pt-2 space-y-5">
          <div>
            <div className="mb-3">
              <Label>The replacement test · the real deliverable</Label>
            </div>
            <p>This is the proof, not a formality.</p>
          </div>

          <Numbered
            items={[
              'Pick a meaningful chunk of the process. A full brand day post-production run, or a week of install admin.',
              'Hand it to the VA or another person with the documentation only.',
              'You do not answer questions during the run.',
              'Every question they would have asked is a gap. Log it, fix the SOP, note it.',
              'Pass condition: they complete it to standard with zero clarifying questions.',
            ]}
          />

          <p className="text-zinc-300">
            If they need to ask, the SOP is incomplete. The fix is the SOP, not the answer.
          </p>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-6">
            <p className="text-zinc-300 text-[15px] leading-relaxed">
              <span className="text-white font-medium">The final gut check.</span> If you
              disappeared for two weeks, delivery would wobble, but it would not break.
            </p>
          </div>
        </div>
      </Month>

      <Rule />

      <Section id="sean-commits" eyebrow="Two way" title="What Sean commits to">
        <p>This is a two way document. If he is the bottleneck, that goes in the 1:1.</p>
        <Card>
          <LeadList items={SEAN_COMMITS} />
        </Card>
      </Section>

      <Rule />

      <Section id="cadence" eyebrow="Working cadence" title="How the 90 days run">
        <RowCard rows={CADENCE} />

        <div className="pt-4">
          <div className="mb-5">
            <Label>How you communicate</Label>
          </div>
          <LeadList items={COMMUNICATION} />
        </div>

        <p className="pt-2 text-zinc-300">
          You are being brought in as a problem solver, not a task taker. Design and improve the
          ops, don't wait for instruction on every small thing.
        </p>
      </Section>

      <Rule />

      <Section id="phase-2" eyebrow="Phase 2" title="What comes after">
        <p>
          Phase 1 is deliberately narrow because centralising has to happen first. If Phase 1 lands,
          Phase 2 opens up:
        </p>

        <Bullets
          items={[
            'Client facing delivery. Triage calls, check-ins, client success management.',
            'Managing a small VA pool rather than a single VA.',
            'Tuning and scaling the system, and consulting on where it goes next.',
            'Supporting brand days directly.',
          ]}
        />

        <p className="pt-2">
          If both sides want to continue at day 90, the conversation is between two structures:
        </p>

        <Numbered
          items={[
            'Ongoing retainer as Ops & CS Lead. A clean monthly number, expanded scope.',
            'Smaller retainer plus structured upside. Tight and capped, tied to the new work the system makes possible.',
          ]}
        />

        <p className="pt-2">
          Neither is promised now, and nothing here is expected in the first 90 days. Phase 1 is
          about proving we like working together and getting the system centralised. Phase 2 is
          where it gets creative.
        </p>
      </Section>

      <Rule />

      <Section id="open-items" eyebrow="Before day one" title="Open items to settle">
        <Card>
          <CheckList
            items={[
              'Start date confirmed',
              'Access: Notion, brand.contentengine.live, CRM, calendar, portal, Drive, email',
              'Weekly 1:1 slot locked in the calendar',
              'Week 1 time audit scheduled with Sean',
              'Introductions made: editing and production team, bookkeeper, any existing contractors',
              'SSD and footage handoff. Current state documented so you can solve it.',
              'First brand day identified for you to observe',
              'Invoicing details and payment terms confirmed',
            ]}
          />
        </Card>
      </Section>
    </DocLayout>
  );
}
