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
      <p className="text-zinc-300 text-[15px] leading-relaxed mb-6">{body}</p>
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
            body="One sentence. Avatar + outcome + the thing they hate. Receipts on the next line. Replace it everywhere — IG, YouTube, LinkedIn, email signature. Until that lands, none of the rest of the brand work matters."
            owner="Rhys signs off · Sean writes"
            doneWhen="The bio is live on 4 channels by Friday"
          >
            <Artefact label="The bio · copy-paste-ready">
              <p className="font-display text-white text-[18px] md:text-[20px] font-extrabold leading-snug mb-3">I help <span className="text-blue-300">fitness coaches</span> build <span className="text-blue-300">$1M+ businesses</span> without <span className="text-blue-300">going viral</span>.</p>
              <p className="text-zinc-300 text-[15px]">$5M built · 82% client retention · 600 coaches taught in person.</p>
              <p className="text-zinc-400 text-[12px] italic mt-4">Pattern: I help [avatar] [outcome] without [thing they hate]. Receipts: 3 numbers. No fluff.</p>
            </Artefact>
          </Move>

          {/* MOVE 02 */}
          <Move
            n="02"
            when="Week 2-4"
            title="Lock the voice. Brief Corey."
            body="Once the bio is live the brand is set from the surface. Now bake it into every piece. Corey edits in voice. The 3 archetypes drive what Rhys says yes and no to. The voice rules become the editorial filter."
            owner="Sean writes · Rhys approves · Corey runs"
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
                <li>No corporate gloss. No motivational fluff. No fake hype.</li>
                <li>Recognition line we&apos;re building toward: &ldquo;He&apos;s the one who actually did it.&rdquo;</li>
              </ul>
            </Artefact>
          </Move>

          {/* MOVE 03 */}
          <Move
            n="03"
            when="Week 5-12"
            title="Build the trust asset."
            body="The bio sets the surface. The voice locks the editorial filter. The Character video transfers the trust. 20-30 minutes. Rhys&apos;s arc. Vulnerable. No selling. This is the piece that converts the fence-sitters."
            owner="Rhys films · Corey shoots & edits · Sean facilitates"
            doneWhen="Character video live on YouTube + landing page"
          >
            <Artefact label="Where the spec lives">
              <p className="text-zinc-200 text-[14px] leading-relaxed mb-3">The full 10-beat arc + tone rules + shoot setup lives in:</p>
              <a href="/undeniablenextsteps/content" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-[14px]">
                Content → Longform → Character video →
              </a>
              <p className="text-zinc-400 text-[12px] italic mt-3">Shoot 1 day. Edit 2-3 days. Walking + sitting + voice-over with B-roll. Lo-fi. No over-production.</p>
            </Artefact>
          </Move>

        </div>
      </Wrap>

      <Divider />

      {/* ═══ THE DREAM CLIENTS · CONTEXT ═══ */}
      <Wrap>
        <H2>Who we&apos;re aiming at.</H2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">Every brand decision answers one question: does this land for Sabine or Josh? If not, cut it.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
            <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Sabine</p>
            <p className="font-display text-white text-[20px] font-extrabold mb-3">15K → 80K months</p>
            <p className="text-zinc-300 text-[14px] leading-relaxed mb-3">Consumed everything. Listened to every podcast back to the Livingstone days. Problem-solver. Patient. Tries first, asks when stuck.</p>
            <p className="text-zinc-400 text-[13px] italic">&ldquo;You don&apos;t know what you don&apos;t know.&rdquo; · Undiagnosed churn problem.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
            <p className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mb-2">Josh</p>
            <p className="font-display text-white text-[20px] font-extrabold mb-3">Gym owner · 2 locations</p>
            <p className="text-zinc-300 text-[14px] leading-relaxed mb-3">Did the math on his churn. Lost $800,000 and never knew. Sat white in the face. Shows up to every call.</p>
            <p className="text-zinc-400 text-[13px] italic">&ldquo;You won&apos;t hear from me until I&apos;ve done 80K a month.&rdquo;</p>
          </div>
        </div>
      </Wrap>

      <Divider />

      {/* ═══ DIAGNOSIS · CONTEXT ═══ */}
      <Wrap>
        <H2>Why these three moves.</H2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">The bottlenecks set the priority. Clarity and Quality both score 3. Authority and Visibility hold.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { letter: 'C', name: 'Clarity', score: 3, focus: 'Fix first', note: 'Stranger reads 4 of 5 posts as "I\'m a coach."' },
            { letter: 'V', name: 'Visibility', score: 4, focus: '', note: 'Strangers in DMs. ICP knows the name.' },
            { letter: 'A', name: 'Authority', score: 5, focus: '', note: '$5M built. 82% retention. Receipts unmatched.' },
            { letter: 'Q', name: 'Quality', score: 3, focus: 'Fix next', note: 'Leads landing sub-10K. Qualified eventually, not pre-sold.' },
          ].map((b) => (
            <div key={b.letter} className={`rounded-2xl border p-4 md:p-5 ${b.focus ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-zinc-800 bg-elevated/40'}`}>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display text-[24px] md:text-[28px] font-extrabold text-white">{b.letter}</span>
                <span className={`font-display text-[24px] md:text-[28px] font-extrabold ${b.focus ? 'text-blue-400' : 'text-zinc-400'}`}>{b.score}</span>
              </div>
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-1">{b.name}</p>
              {b.focus && <p className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold mb-2">{b.focus}</p>}
              <p className="text-zinc-300 text-[12px] md:text-[13px] leading-relaxed mt-2">{b.note}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-400 text-[14px] italic mt-6">Move 01 (bio) is the biggest single Clarity lift. Move 03 (Character) is the biggest single Quality lift. Move 02 (voice) makes both stick.</p>
      </Wrap>

      <Divider />

      {/* ═══ DONE WHEN ═══ */}
      <Wrap>
        <H2>Done when.</H2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">90 days from start. What &ldquo;done&rdquo; looks like.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6">
            <p className="text-emerald-300 text-[11px] uppercase tracking-widest font-semibold mb-4">The state · by day 90</p>
            <BulletList items={[
              'Clarity moves 3 → 5. Stranger 10-post test passes.',
              'Quality moves 3 → 4. Workshop room locked above 10K-month coaches.',
              'Character video live. Trust transfer asset working.',
              'Voice rules locked. Corey edits in voice without prompts.',
              'Recognition line showing up in comments: "He\'s the one who actually did it."',
            ]} />
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
            <p className="text-zinc-400 text-[11px] uppercase tracking-widest font-semibold mb-4">The signals · how we&apos;ll know</p>
            <BulletList items={[
              'Cold DMs use the ICP language back to Rhys',
              'Workshop call quality climbs (pre-sold leads)',
              'Character video → DM traffic correlation',
              'Workshop landing page conversion rises from sub-2% to 5%+',
              'Corey runs a Monday review without flagging brand issues',
            ]} />
          </div>
        </div>
      </Wrap>
    </Shell>
  );
}
