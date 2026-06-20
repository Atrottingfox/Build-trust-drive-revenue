import React from 'react';
import { Shell, PageHead, Wrap, Divider, H2, BulletList } from '../components/undeniable/Bits';

// ─── Move card · the 3 things that get done ────────────────────────────

function Move({
  n, when, title, body, owner, doneWhen, children,
}: {
  n: string; when: string; title: string; body: string; owner: string; doneWhen: string; children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
        <span className="font-display text-[24px] font-extrabold text-blue-400 leading-none">{n}</span>
        <span className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold border border-blue-500/30 bg-blue-500/5 rounded-full px-2.5 py-0.5">{when}</span>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight mb-3">{title}</h3>
      {body && <p className="text-zinc-300 text-[15px] leading-relaxed mb-6">{body}</p>}
      {children}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 mt-6 pt-5 border-t border-zinc-800">
        <div className="flex items-baseline gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Owner</span>
          <span className="text-zinc-200">{owner}</span>
        </div>
        <div className="flex items-baseline gap-2 text-[12px]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Done when</span>
          <span className="text-zinc-200">{doneWhen}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Visible artefact box (no disclosure, always shown) ────────────────

function Artefact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-5">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">⬡ {label}</p>
      {children}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

export default function UndeniableBrand() {
  return (
    <Shell title="Brand · the plan" description="3 moves. Visible artefacts. Clear done-when." path="/undeniablenextsteps/brand">
      <PageHead
        eyebrow="01 · Brand"
        title="The Brand"
        accent="Plan."
        blurb="Clarity is at 3. Quality is at 3. Three moves to get both above 4 in 90 days."
      />
      <Divider />

      {/* ═══ THE 3 MOVES ═══ */}
      <Wrap>
        <H2>The three moves.</H2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">Sequenced. Don&apos;t start move 2 until move 1 ships.</p>

        <div className="space-y-5">

          {/* MOVE 01 */}
          <Move
            n="01"
            when="This week"
            title="Ship the bio across every channel."
            body="One sentence. Avatar + outcome + the thing they hate. Replace it everywhere. IG, YouTube, LinkedIn, email signature. Until that lands, none of the rest of the brand work matters."
            owner="Rhys signs off"
            doneWhen="The bio is live on 4 channels by Friday"
          >
            <Artefact label="The bio · primary option">
              <p className="font-display text-white text-[18px] md:text-[20px] font-extrabold leading-snug">I help health and fitness business owners build $1M+ businesses they don't hate.</p>
            </Artefact>
            <div className="mt-3" />
            <Artefact label="The bio · alternative option">
              <p className="font-display text-white text-[18px] md:text-[20px] font-extrabold leading-snug">I help health and fitness businesses build $1M+ companies without going viral.</p>
            </Artefact>
            <div className="mt-3" />
            <Artefact label="Also update">
              <p className="text-zinc-200 text-[14px] leading-relaxed">YouTube channel description (including timeline of events). Sean will go through this with you.</p>
            </Artefact>
          </Move>

          {/* MOVE 02 */}
          <Move
            n="02"
            when="Week 2 to 4"
            title="Lock the archetype."
            body=""
            owner="Rhys approves · Corey runs"
            doneWhen="Corey ships 2 edits without voice flags from Rhys"
          >
            <Artefact label="The voice + archetypes · one page">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-2">Archetypes · who speaks</p>
              <ul className="space-y-1.5 text-zinc-100 text-[14px] mb-5">
                <li><b className="text-white">Guide</b> (primary) · Done it. Sharing the scars.</li>
                <li><b className="text-white">Protector</b> · Won&apos;t let people get scammed.</li>
                <li><b className="text-white">Scientist</b> · Runs tests. Shares lessons.</li>
              </ul>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-2">Voice · how it sounds</p>
              <ul className="space-y-1.5 text-zinc-100 text-[14px]">
                <li>Conviction · dry humour · logical · obsessive · outcome-focused.</li>
                <li>Calm conviction over urgency. Profane when emphatic.</li>
                <li>Values: integrity, speed, excellence, morality, duty.</li>
                <li>Recognition line we&apos;re building toward: &ldquo;He&apos;s the one who actually did it.&rdquo;</li>
              </ul>
            </Artefact>
          </Move>

          {/* MOVE 03 */}
          <Move
            n="03"
            when="Week 4"
            title="Deliver the brand workbook."
            body="Your brand, documented and built for the team to emulate and use."
            owner="Rhys signs off"
            doneWhen="Workbook delivered."
          />

        </div>
      </Wrap>

      <Divider />

      {/* ═══ THE CORE AVATAR ═══ */}
      <Wrap>
        <H2>Who we&apos;re aiming at.</H2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">One core avatar. Every brand decision answers one question: does this land for them? If not, cut it.</p>
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-8">
          <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">The core avatar</p>
          <p className="font-display text-white text-[20px] md:text-[22px] font-extrabold leading-snug mb-6">A health and fitness coach already doing 10K+ months, building toward a $1M business they don&apos;t hate.</p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {[
              { label: 'Believes', text: 'There is a better way than grinding 1 to 1 forever. They are capable of more. Sick of being seen as just a PT.' },
              { label: 'Values', text: 'Integrity. Speed. Doing the work. They respect people who have actually done it, not influencers.' },
              { label: 'Behaves', text: 'Consumes everything. Has watched from the fence for months. Problem solver. Tries first, asks when stuck. Shows up to every call. A high motivation buyer, not a tyre kicker.' },
              { label: 'Fears', text: 'Plateauing after a fast climb. Losing clients out the back without knowing why. Staying capped at 30 clients forever.' },
              { label: 'Wants', text: 'To scale without going viral. Systems so the business runs without them. Speed. To stop being the bottleneck.' },
              { label: 'Buys', text: 'On trust transfer, not hype. They buy when they finally believe you can get them there, not just that you know your stuff.' },
            ].map((p) => (
              <div key={p.label}>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1.5">{p.label}</p>
                <p className="text-zinc-200 text-[14px] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </Shell>
  );
}
