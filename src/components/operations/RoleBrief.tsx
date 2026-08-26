import { Check, X } from 'lucide-react';
import {
  Bullets,
  Card,
  DocHeader,
  DocLayout,
  DocSection,
  Label,
  Numbered,
  RowCard,
  Rule,
  Section,
  Statement,
} from './Bits';

/*
  Document one: the role brief.

  Someone reads this once, end to end, and decides whether the role is theirs.
  Deliberately no apply form. The role is filled through conversation, and a
  form at the bottom would change what the page is.
*/

export const ROLE_BRIEF_SECTIONS: DocSection[] = [
  { id: 'context', label: 'Context' },
  { id: 'why-now', label: 'Why now' },
  { id: 'the-brief', label: 'The brief' },
  { id: 'terms', label: 'Terms' },
  { id: 'phase-0', label: 'Phase 0' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'the-standard', label: 'The standard' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'support', label: 'Support' },
  { id: 'fit', label: 'Fit' },
  { id: 'judgement', label: 'Judgement' },
  { id: 'where-it-goes', label: 'Where it goes' },
];

const META = [
  { k: 'Company', v: 'Authority Engine' },
  { k: 'Document', v: 'Role brief' },
  { k: 'Version', v: '24 Aug 2026' },
  { k: 'Reports to', v: 'Sean Fox' },
  { k: 'Engagement', v: '30 day pilot' },
];

const STRUCTURE = [
  { k: 'Title', v: 'Fractional Operations Manager' },
  { k: 'Type', v: 'Contractor / consultant' },
  { k: 'Fee', v: '$5,000 per month. A project fee for outcomes, not hours.' },
  { k: 'Guide hours', v: '~15 to 20 hours per week. Not tracked.' },
  {
    k: 'Location',
    v: 'Remote (Brisbane / Gold Coast). In person for brand day travel as needed.',
  },
  { k: 'Reports to', v: 'Sean Fox' },
  { k: 'Start', v: 'ASAP' },
];

const FIT = [
  { lead: 'Ops minded.', body: 'You see what needs to happen and you make it happen.' },
  {
    lead: 'A systems thinker.',
    body: "You don't just do the task, you build the process around it. You think in checklists, templates and sequences.",
  },
  {
    lead: 'Someone who likes turning messy notes into clear, structured documents.',
    body: "That's a large part of the week, and it should feel satisfying rather than tedious.",
  },
  {
    lead: 'Content aware.',
    body: 'You understand what clients in this space actually need, and that judgement is what turns raw notes and recordings into artefacts worth paying for.',
  },
  {
    lead: 'Experienced in client delivery, CS or ops.',
    body: 'Ideally inside a coaching, agency or SaaS business.',
  },
  { lead: 'Comfortable with the stack.', body: 'Notion, Google Suite, Loom and simple CRMs.' },
  { lead: 'A proactive communicator.', body: "You flag things early and you're never chased." },
  {
    lead: 'Discreet.',
    body: "You're inside client relationships and commercially sensitive information.",
  },
  {
    lead: 'Low ego, high standards.',
    body: "You don't need the glory, you just want things done properly.",
  },
];

const NOT_IN_REMIT = [
  { lead: 'Strategy and offer design.', body: 'Sean owns client strategy and product.' },
  {
    lead: 'Creative direction, scripting and editing.',
    body: 'You work with templates and contractors, not the timeline.',
  },
  { lead: 'Bookkeeping and financial management.', body: 'Sits with the bookkeeper.' },
  { lead: 'Receipt capture and financial admin.', body: 'Handled separately.' },
];

const SUPPORT = [
  'Base systems handed over properly. Walked through, with Looms recorded.',
  'A weekly 1:1. Held, not moved.',
  'Direct help building your own business. A one hour strategy call each fortnight, used either to move the needle in your own operation or to get upskilled in one core area of your choosing.',
  'Introductions to anyone you need. Editors, contractors, clients, tools. You should never be blocked waiting on a connection.',
  'Budget and approval to hire the VA.',
  'Autonomy to design and improve the operation rather than wait for instruction.',
];

const EVIDENCE = [
  'Brand day artefacts out within 48 hours, to standard, every time.',
  'Nothing slips, nothing is chased, nothing is forgotten.',
  'Anything that has happened twice is written down.',
  'A new person could be dropped into any seat in the pipeline within 48 hours and have exactly what they need.',
];

function Bucket({
  n,
  title,
  strap,
  children,
}: {
  n: string;
  title: string;
  strap?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8">
      <div className="flex items-baseline gap-4 mb-1">
        <span className="font-display text-sm text-zinc-700 tabular-nums">{n}</span>
        <h3 className="font-display text-lg sm:text-xl text-white tracking-tight">{title}</h3>
      </div>
      {strap && <p className="text-zinc-500 text-sm mb-6">{strap}</p>}
      <div className={`space-y-4 text-[15px] leading-relaxed text-zinc-400 ${strap ? '' : 'mt-5'}`}>
        {children}
      </div>
    </div>
  );
}

export function RoleBriefHeader() {
  return (
    <DocHeader
      meta={META}
      title="Fractional Operations Manager"
      strap="Own the operational layer of a content engine business, so brand days scale, clients feel looked after, and the founder stays in the work only he can do."
      footnote="Remote · Brisbane / Gold Coast · $5,000 per month"
    />
  );
}

export default function RoleBrief() {
  return (
    <DocLayout sections={ROLE_BRIEF_SECTIONS}>
      <Section id="context" eyebrow="Context" title="About Authority Engine">
        <p>
          Authority Engine turns content into a demand engine for seven and eight figure founders.
          The model is Brand Day &gt; 90 Day Install: one full filming day with a client, followed
          by ninety days of advising and training their internal media team.
        </p>
        <p>
          A brand day captures interviews, talking head content, B-roll and behind the scenes
          footage. From that single day, the client gets weeks of polished content across their
          channels. And, through the install, the internal capability to keep producing it.
        </p>
        <p>
          The founder leads creative direction and strategy. He is in the room, calling what gets
          captured and how it comes together. The operational layer behind it, coordination, back
          end delivery, logistics, systems, is what makes the model scalable.
        </p>
      </Section>

      <Rule />

      <Section id="why-now" eyebrow="Why now" title="Why this role exists">
        <p>
          The foundations are solid. A clear offer, a strong reputation, an expanding client base.
          More brand days, more clients, more content going out the door. That only scales if the
          founder's time is protected.
        </p>
        <p>
          Right now, everything that happens around the days and the calls sits with the same person
          doing strategy and delivery. Pulling recordings, filling workbooks, building plans, wiring
          the portal, chasing forms, admin. The machine is being run instead of built, and there is
          no capacity left for marketing.
        </p>
        <p>
          This role changes that. It exists to own that layer and hold it together, so the founder
          stays in the only two things that cannot be handed over before the next stage of growth:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6">
            <p className="font-display text-white text-lg mb-2">Create</p>
            <p className="text-zinc-500 text-sm">Marketing and IP.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6">
            <p className="font-display text-white text-lg mb-2">Communicate</p>
            <p className="text-zinc-500 text-sm">Brand days and high leverage client calls.</p>
          </div>
        </div>

        <p className="pt-2">
          You take raw brand days and 90 day calls and turn them into clean workbooks, plans and
          client portals, built simply enough that a VA could run them. This isn't a support role in
          the traditional sense. It's the role that makes scaling possible.
        </p>
      </Section>

      <Rule />

      <Section
        id="the-brief"
        eyebrow="The brief"
        title="Three responsibilities. Nothing outside them."
        accent
      >
        <Label>The job, in one line</Label>
        <Statement>
          The job is not to help Sean. The job is to save time, and to build systems so that anyone
          in the pipeline can be replaced within 48 hours.
        </Statement>

        <p>It breaks into three responsibilities:</p>

        <Numbered
          items={[
            "Protect Sean's time.",
            'Turn brand days and calls into clean, repeatable plans.',
            'Systematise and delegate all admin.',
          ]}
        />

        <p>
          If a task doesn't serve one of those three, it isn't the job. The narrowness is
          deliberate. It stops the role becoming the junk drawer.
        </p>
        <p>
          The same thesis on task reduction that runs the rest of the business applies here: if it
          isn't high leverage and required, delegate it, automate it, systematise it, or delete it.
          Everyone inside this operation is treated as a business owner, and expected to think like
          one.
        </p>
      </Section>

      <Rule />

      <Section id="terms" eyebrow="Terms" title="Fee is for outcomes, not hours.">
        <RowCard rows={STRUCTURE} />
      </Section>

      <Rule />

      <Section id="phase-0" eyebrow="Phase 0" title="Nobody is locked into 90 days upfront">
        <Card label="Days 1 to 30 · The pilot">
          <p>The first thirty days run exactly as set out in Month 1, Build the Spine.</p>
        </Card>

        <Card label="Day 30 · The decision">
          <p>Both sides choose one of two things:</p>
          <Bullets
            items={[
              'Extend into the full 90 day engagement. Two further months at $5,000 per month.',
              'Stop there, with spine v1 in place and documented.',
            ]}
          />
        </Card>

        <p>
          Phase 0 exists to prove two things in practice rather than on paper: that we work well
          together, and that the mission makes sense once it meets reality.
        </p>
        <p>
          Phase 1 is a defined 90 day project. Its terms, milestones and KPIs sit in the Consulting
          engagement document, on the next tab.
        </p>
      </Section>

      <Rule />

      <Section id="ownership" eyebrow="Ownership" title="What you own">
        <p>
          This is the lane of ownership, not the instruction set. The exact steps for each bucket
          are in the Operating Manual.
        </p>

        <div className="space-y-4 pt-2">
          <Bucket
            n="01"
            title="Brand day, pre and post"
            strap="The core of the role. Everything except the day itself."
          >
            <div>
              <div className="mb-2">
                <Label>Pre-day</Label>
              </div>
              <p>
                Collect links, numbers and the team list. Confirm location and logistics. Build the
                client folder and workspace in Notion and on the portal (brand.contentengine.live).
                Pre-fill the Brand Demand Workbook with everything already known from prior data and
                transcripts.
              </p>
            </div>

            <div>
              <div className="mb-2">
                <Label>Post-day, within 48 hours</Label>
              </div>
              <p className="mb-4">
                You receive the raw materials: Sean's notes, the recorded audio, the transcription
                breakdown, the dot points, the footage handoff. You turn that into finished, client
                ready artefacts. Where relevant:
              </p>
              <Bullets
                items={[
                  'Brand Demand Workbook, Part I',
                  'The finalised Customer Journey Map',
                  'The Avatar Workbook and hook bank',
                  'The Core Trust Assets outline',
                  'The One Demand Cycle diagram',
                  'The 30 Day Demand Plan. Template, plus the decisions made on the day.',
                ]}
              />
            </div>

            <div>
              <div className="mb-2">
                <Label>Then it goes live</Label>
              </div>
              <p>
                Client added to the portal, their pieces uploaded, their this week and due dates
                set. CRM moved to Brand Day Complete and tagged Invited to 90 Day, yes or no, on
                Sean's call.
              </p>
            </div>

            <p>
              Where a deliverable needs the editing and production team, you coordinate them.
              Turnaround on time and to the brief is yours to hold, not Sean's to chase.
            </p>
            <p>
              You own the quality check before anything reaches a client. It leaves your hands in
              the best shape it can be in. You also own the file and footage workflow: nothing lost,
              nothing duplicated, nothing sitting on the wrong drive.
            </p>
          </Bucket>

          <Bucket n="02" title="90 Day Install" strap="You own the what happens when layer.">
            <Bullets
              items={[
                "Create each client's project. Plug in targets, call schedule and cadence form links.",
                "Make sure the weekly forms are actually filled. Polite nudges are your job, not Sean's.",
                'Post call recaps and action lists into the portal.',
                'Collate wins and metrics so Sean sees signal, not noise.',
                "Keep each client's 90 day roadmap current. Weeks 1 to 4, 5 to 8, 9 to 12, and Always On, using the templates.",
              ]}
            />
          </Bucket>

          <Bucket n="03" title="Client success and comms">
            <p>
              You are the non strategic point of contact between calls: logistics, links, where is
              X, how do I access Y. Reschedules coordinated, calendar protected.
            </p>
            <p>
              Every client should always know three things. What's happening this week, when their
              next call is, and where to find replays and documents.
            </p>
            <p className="text-zinc-300">
              You are not coaching. You are making the experience smooth.
            </p>
          </Bucket>

          <Bucket
            n="04"
            title="Time protection"
            strap="The bucket most easily forgotten, and the one that most directly buys back hours."
          >
            <Bullets
              items={[
                'Calendar. You own it. Deep work blocks, brand days and client calls protected. Always a step ahead.',
                "Meeting prep. For every call: who is this, what's the context, links pre-loaded.",
                'Travel and logistics. Flights, hotels, transport and room logistics for brand days, planned rather than scrambled.',
                'Client scheduling. Smooth coordination from first contact to confirmed booking.',
                'Task tracking. Visible, prioritised, moving forward.',
              ]}
            />
          </Bucket>

          <Bucket
            n="05"
            title="The admin problem"
            strap="You own the admin problem. You are not the admin."
          >
            <p>
              The standing brief: it doesn't matter whether it's solved by a system, a VA or an
              automation. It cannot land back on Sean's plate.
            </p>
            <p>
              Concretely: map every recurring admin task, write simple SOPs, decide what gets
              automated versus done by a person, then source and onboard a VA by day 60 and manage
              them. Sean does not manage the VA. You do.
            </p>
            <p>
              Inside that sit the recurring pieces that must not slip: CRM accurate and used as a
              real business asset, invoice and payment follow-up so nothing goes overdue, document
              organisation everyone can navigate, and the tracker and portal kept clean.
            </p>
            <p>
              Alongside that, you're expected to find the operational bottlenecks in the content
              production cycle and solve them, bringing the solution, not the problem.
            </p>
            <p className="text-zinc-300">
              When something works once, it gets documented so it never needs thinking about again.
            </p>
          </Bucket>
        </div>
      </Section>

      <Rule />

      <Section id="the-standard" eyebrow="The standard" title="Replaceable in 48 hours" accent>
        <p>
          The point of the systems isn't tidiness. It's that any single person in the production
          pipeline, including you, could be removed and replaced within 48 hours without delivery
          breaking.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <Card label="Every repeating task">
            <Bullets items={['A one to two page SOP', 'A short Loom', 'A checklist']} />
          </Card>
          <Card label="Every role, yours included">
            <Bullets
              items={[
                'A scorecard. Purpose, 3 to 5 outcomes, 3 to 5 KPIs.',
                'A 30 day onboarding doc. What a new person does in weeks 1, 2, 3 and 4.',
              ]}
            />
          </Card>
        </div>

        <p className="pt-2">
          Build it, test it on yourself, then test it on a VA. You are being paid to make yourself
          non essential, not to be the only person who knows how it works.
        </p>
      </Section>

      <Rule />

      <Section id="boundaries" eyebrow="Boundaries" title="The decision rule">
        <p>When something new appears and it isn't obvious whose it is, two questions:</p>

        <Numbered
          items={[
            "Does this save Sean's time, or make the system more plug and play?",
            'Is this repeatable work, rather than one off genius?',
          ]}
        />

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Check size={15} className="text-emerald-400" />
              <p className="font-display text-white">Yes x2</p>
            </div>
            <p className="text-zinc-400 text-[15px]">
              It's yours. Systematise it, then delegate it.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <X size={15} className="text-zinc-500" />
              <p className="font-display text-white">Not both</p>
            </div>
            <p className="text-zinc-400 text-[15px]">
              It stays with Sean, strategic or creative, or goes to a specialist: editor,
              bookkeeper, contractor.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <div className="mb-5">
            <Label>Explicitly not in your remit</Label>
          </div>
          <div className="space-y-4">
            {NOT_IN_REMIT.map((n) => (
              <div key={n.lead} className="flex gap-3">
                <X size={14} className="text-zinc-700 mt-1.5 shrink-0" />
                <p>
                  <span className="text-zinc-200">{n.lead}</span> {n.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="pt-2 text-zinc-300">
          You are the person who turns Sean's thinking into a system, and keeps the wheels turning.
        </p>
      </Section>

      <Rule />

      <Section id="support" eyebrow="Support" title="What you get">
        <p className="text-zinc-500">Brought in as a problem solver, not a task taker.</p>
        <Card>
          <Bullets items={SUPPORT} />
        </Card>
      </Section>

      <Rule />

      <Section id="fit" eyebrow="Fit" title="Who this suits">
        <div className="space-y-4">
          {FIT.map((f) => (
            <div key={f.lead} className="flex gap-3">
              <Check size={14} className="text-zinc-600 mt-1.5 shrink-0" />
              <p>
                <span className="text-zinc-200">{f.lead}</span> {f.body}
              </p>
            </div>
          ))}
        </div>
        <p className="pt-4 text-zinc-300">
          If this reads like your brain already, it's the right role.
        </p>
      </Section>

      <Rule />

      <Section id="judgement" eyebrow="Judgement" title="How the role is judged" accent>
        <Statement>
          Sean is not thinking about operations. Not because he's unaware. Because there's nothing
          to think about.
        </Statement>
        <p>The supporting evidence:</p>
        <Card>
          <Bullets items={EVIDENCE} />
        </Card>
      </Section>

      <Rule />

      <Section id="where-it-goes" eyebrow="Where it goes" title="Growth path">
        <p>
          Once the foundations are solid, there is genuine room to move into client facing delivery.
          Supporting brand days on the day, running triage calls, and taking on client success in a
          strategic rather than logistical sense.
        </p>
        <p>
          That isn't expected inside Phase 0 or the first 90 days. What is expected in that window
          is attending brand days in person as you get across the model, and eventually being able
          to run coordination on the day.
        </p>
      </Section>
    </DocLayout>
  );
}
