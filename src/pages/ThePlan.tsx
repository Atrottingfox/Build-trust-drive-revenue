import React from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2, Block, BulletList } from '../components/undeniable/Bits';

// ─── CVAQ scores ─────────────────────────────────────────────────────────

const CVAQ: Array<{ letter: string; name: string; score: number; note: string }> = [
  { letter: 'C', name: 'Clarity', score: 3, note: 'A stranger can\'t tell what you do, who for, why, in 10 posts. 4 of 5 posts read as "I\'m a coach."' },
  { letter: 'V', name: 'Visibility', score: 4, note: 'Strangers showing up in DMs from content. ICP, when they need help in your category, you\'re first 3 they think of.' },
  { letter: 'A', name: 'Authority', score: 5, note: 'You\'ve done it. 5M business. Built without going viral. The receipts are unmatched in the AU fitness space.' },
  { letter: 'Q', name: 'Quality', score: 3, note: 'Leads arriving sub-10K. Qualified eventually, not pre-sold. The room is mixed when it should be locked.' },
];

// ─── Functions ───────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  Active: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Queued: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  Locked: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  Decide: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
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

// ─── Main page ───────────────────────────────────────────────────────────

export default function ThePlan() {
  return (
    <Shell title="The Plan · Undeniable" description="The brand day strategy, bucketed by core function. Diagnosis, decision, assets, videos, ads, room, test, targets." path="/theplan">
      <PageHead
        eyebrow="Operational · Strategy reference"
        title="The"
        accent="Plan."
        blurb="The whole brand day, bucketed by core function. Where the bottlenecks are. What we decided. What gets built first. Reference back to this. The 90-day task list lives separately."
      />
      <Divider />

      {/* ─── 1 · DIAGNOSIS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">01 · Diagnose</p>
        <H2>The bottleneck scores.</H2>
        <Note>The framework: from someone not knowing you to someone purchasing, four bottlenecks. Score each.</Note>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CVAQ.map((c) => (
            <div key={c.letter} className="glow-card p-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display text-[28px] font-extrabold text-white">{c.letter}</span>
                <span className="font-display text-[28px] font-extrabold text-blue-400">{c.score}</span>
              </div>
              <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">{c.name}</p>
              <p className="text-zinc-300 text-[13px] leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Block label="Priorities · what we fix first">
            <BulletList items={[
              <><b className="text-white font-semibold">Quality first.</b> Sub-10K leads in the room dilute the signal. Fix who shows up before how many.</>,
              <><b className="text-white font-semibold">Then clarity.</b> 10-post stranger test fails. Top of profile + first piece of content must say what + who + why.</>,
              <><b className="text-white font-semibold">Visibility and authority hold.</b> Don\'t spend on more reach. The reach you have is under-converted.</>,
            ]} />
          </Block>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 2 · DECIDE ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">02 · Decide</p>
        <H2>Own fitness. Don\'t jump to broader service.</H2>
        <Note>Two piles considered: stay narrow (online coaches + PTs + gym owners) or broaden to service-based. Decision: stay.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Why stay</p>
            <BulletList items={[
              'Awareness is not the issue. Trust is. Most of the 15-20K addressable market already know who you are.',
              'You haven\'t capped this market. We have not even started.',
              'Allied health (physios, brick-and-mortar gyms) already show up. The pull is there without us asking for it.',
              '82% 12-month L2 retention is proven. LTV math holds.',
            ]} />
          </div>
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">The 5-year math</p>
            <BulletList items={[
              <>Market: <b className="text-white font-semibold">~15-20K qualified businesses</b> (doing &gt;10K/mo)</>,
              <>Goal: <b className="text-white font-semibold">50% capture over 5 years</b> = 7,500-10,000 through workshops</>,
              <>At 1,000 workshop attendees: 60% to L2 = 600 × $22K = <b className="text-white font-semibold">$13.2M</b></>,
              <>Year 1 with retention: ~$11M. Year 2: ~$20M. Year 3+: compounds.</>,
            ]} />
          </div>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 3 · ASSETS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">03 · Assets</p>
        <H2>The lead magnets.</H2>
        <Note>Two purposes. Pull in cold leads (high-aware), and give the warm ones something to take away. Each named for the outcome.</Note>
        <div className="mt-8">
          <Rows rows={[
            { name: 'Six Step Profit Path', status: 'Active', detail: 'Renamed from Customer Journey Blueprint. Takes leads from unaware to advocate. PDF + video lesson + audio lesson + bonus GPTs. The flagship.' },
            { name: 'Sales Success System', status: 'Active', detail: 'Renamed from Cold to Sold / Confident Closing. Strips out the framework Rhys uses to sell. Currently best-performing asset.' },
            { name: 'Bottleneck Buster · Diagnostic', status: 'Active', detail: '63 personalised solution combinations. They answer, get their single problem named, plus a custom solution + video. Re-submission blocked for 30 days. As-close-to-1-on-1 as a static asset gets.' },
            { name: 'Machine Framework', status: 'Active', detail: 'Built on stage during the Gabe video. NEXT-EXPAND acronym for hiring + building a business that runs without you. Already printed. The fast-shipper template.' },
            { name: 'Churn Calculator', status: 'Queued', detail: 'Client capacity calculator. New in vs out over 12 months → grow / flat / shrink. Analogy: filling a bucket with holes. Names a problem coaches feel but can\'t describe.' },
            { name: 'Hiring Framework', status: 'Queued', detail: 'For coaches at 20K+/mo who need a VA or first hire. Avoid the per-client subcontractor trap. (Don\'t make this content — legal landmine for existing clients. Asset only.)' },
            { name: 'Custom GPT route', status: 'Decide', detail: '78 unfinished frameworks in the book. Each can be a 5-min podcast or a mini-asset. Atlas can spin out 4-8 in a sitting. Decision needed: rotate weekly or pick the 4-8 workhorses and lock them.' },
          ]} />
        </div>
      </Wrap>
      <Divider />

      {/* ─── 4 · VIDEOS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">04 · Videos</p>
        <H2>The video stack.</H2>
        <Note>One trust asset (Rome). One character asset. Then a six-week cycle of one video a week. Podcasts and dial-ins on top.</Note>
        <div className="mt-8">
          <Rows rows={[
            { name: 'Character video · 20-30 min', status: 'Queued', detail: 'Trojan horse. Rhys\'s arc from gym floor to $5M. Damaging admissions, vulnerability, the scars (couldn\'t pay staff before Christmas, etc). Built on the relatability ladder: experiences → interests → values → beliefs → identity. Lo-fi, walking-and-talking format. No CTA beyond "if you want to see how I applied this, go watch Rome."' },
            { name: 'Rome · 4-5 hour VSL', status: 'Queued', detail: 'The trust asset. "How to make your first 10K (and up to 80K) as an online coach." Pillars: problem → path → personal story → case studies (Luke Miller 60K→600K, Sabine 15K→80K, etc). This becomes the thing others send to their friends. Hosted unlisted on a separate landing page until the day it goes live on YouTube.' },
            { name: 'Six-week content cycle', status: 'Queued', detail: 'After Character + Rome: one video per week. Week 1 character-style, Week 2 framework explainer, then 4 weeks education-heavy (whiteboard, top-down, framework-led). Repeat the cycle. Test new formats only after the first six are locked.' },
            { name: 'Podcasts · 3 per week', status: 'Queued', detail: 'Hyper-specific. One framework per episode (5-15 min). The 78 chapters of the book become 78 episodes. Spotify + YouTube audio. Captures warm leads earlier. Mateo-style: also the place to do the "vertical growth feels fun until it stops" mindset content that isn\'t a fit for YouTube.' },
            { name: 'Dial-in Q&A · monthly', status: 'Queued', detail: 'Standalone YouTube format. Bolt-on after the first six-week cycle ships, not before. Lower priority until the test cycle is locked.' },
          ]} />
        </div>
      </Wrap>
      <Divider />

      {/* ─── 5 · ADS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">05 · Ads</p>
        <H2>The 4-tier funnel.</H2>
        <Note>Right now: one ad type ("come to a workshop"). Maximiser approach worked. Now we segment by awareness.</Note>
        <div className="mt-8">
          <Block label="Top of funnel · problem-unaware">
            <BulletList items={[
              <><b className="text-white font-semibold">Status borrow.</b> Alex Hormozi, Brandon, Luke Miller, Gabe Panabal. The "Alex told me to do this workshop" creative was the highest-converting, lowest-CPA ad we\'ve run. Lean into it.</>,
              'Also: testimonials of recognised people (Australian Alex etc) — for the polluted-audience problem (people coming for Alex who aren\'t ICP).',
            ]} />
          </Block>
          <Block label="Mid funnel · solution-aware">
            <BulletList items={[
              <><b className="text-white font-semibold">Q&A from workshops.</b> Two-camera setup with the framework name + revenue + problem + stakes ("If I don\'t solve this, X will happen"). Gabe is the only one who hit the framework. Force everyone else to.</>,
              <><b className="text-white font-semibold">Skill shows.</b> Diagnostic frames, live business breakdowns, the math on the phone. The educated coach calling the other an influencer is the line.</>,
            ]} />
          </Block>
          <Block label="Bottom funnel · product-aware">
            <BulletList items={[
              <><b className="text-white font-semibold">Asset-led ads.</b> Diagnostic tool, Six Step Profit Path, Machine Framework. Split-testing landing page vs instant lead form. Landing page = better leads, form = higher volume. Yesterday\'s lead doing 40K/mo came from the form.</>,
              <><b className="text-white font-semibold">Workshop direct.</b> Keep running. Lowest-friction conversion still.</>,
            ]} />
          </Block>
          <Block label="Funnel gap to fix">
            <BulletList items={[
              <><b className="text-white font-semibold">VSL completion 83% but page conversion sub-2%.</b> Gap = expectation mismatch (people clicking for Alex, not coaches) and the embedded video has no scrubber / no pause. Re-cut a tighter version, add controls, segment ad audiences earlier.</>,
            ]} />
          </Block>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 6 · ROOM + PRODUCTION ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">06 · Room</p>
        <H2>The production setup.</H2>
        <Note>The studio + the team + the workflow that lets Rhys ship without becoming the bottleneck.</Note>
        <div className="mt-8">
          <Block label="The room">
            <BulletList items={[
              <><b className="text-white font-semibold">Dark + light split.</b> Moody black side for hard-hitting / motivational. Lit side for educational.</>,
              <><b className="text-white font-semibold">Everything on wheels.</b> Top-down desk, C-stand, screen on articulating arm. Backdrops pull down for variation.</>,
              <><b className="text-white font-semibold">Whiteboards + paper + iPad draw-behind.</b> Whiteboards can feel cheap — paper top-down often beats it. Test both.</>,
            ]} />
          </Block>
          <Block label="Production workflow">
            <BulletList items={[
              <><b className="text-white font-semibold">Pre-production wins half the battle.</b> Hook + problem written before each shoot. Reference: 24 shorts in 2.5 hrs.</>,
              <><b className="text-white font-semibold">Two-camera minimum.</b> Cuts lined up so the second angle is exact. Lo-fi, no pop-ups, "relatively Joey."</>,
              <><b className="text-white font-semibold">Walk-the-doc (Cole Gordon).</b> Laptop in front, walk a Google doc, record. Rhys self-directs when Jacob is editing.</>,
            ]} />
          </Block>
          <Block label="Jacob · videographer → creative direction">
            <BulletList items={[
              'Stop just shooting. Start sitting in on client calls + workshops. Pattern-recognise the problems they bring.',
              'Monday meeting: bring the bottleneck scores + numbers + the "what worked last week" read. Drive creative direction off the data.',
              'Reduce reactive shoots. Lock the 30-day test plan and execute against it.',
              'Six months of context-loading will compound. The creative instinct already exists — it just needs the business context to land.',
            ]} />
          </Block>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 7 · TEST ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">07 · Test</p>
        <H2>30-day test → 60-day lock.</H2>
        <Note>Stop guessing. Run a clean test, then commit. The current "throw everything at the wall" is what got us here — but it doesn\'t scale.</Note>
        <div className="mt-8">
          <Block label="Next 30 days · test phase">
            <BulletList items={[
              <><b className="text-white font-semibold">Four environments, no testing (just rotate):</b> office, hallway, park, gym. Three pieces each, pick the best 14 for the month.</>,
              <><b className="text-white font-semibold">Shoot Mon / Wed / Fri, half days.</b> Monday: ideation AM, shoot 10-2, consolidate PM.</>,
              <><b className="text-white font-semibold">14 new tactical shorts a week (2/day)</b> on top of existing rhythm. Backlog drips 2/day to the secondary page.</>,
              <><b className="text-white font-semibold">Isolate the new content ~2 weeks</b> for clean data. No collabs during the test.</>,
            ]} />
          </Block>
          <Block label="After 30 days · lock phase">
            <BulletList items={[
              <><b className="text-white font-semibold">Pick the 4 winners.</b> Keep them. Kill the duds. The 4 become the rotation for the next 60 days.</>,
              <><b className="text-white font-semibold">Test 1-2 new formats per month forever after.</b> The lock isn\'t permanent — it\'s a base rhythm that prevents drift.</>,
              <><b className="text-white font-semibold">Measure subjective + objective.</b> Did Rhys love shooting it? Did the right people comment? Both matter.</>,
            ]} />
          </Block>
          <Block label="The make-it-land rules">
            <BulletList items={[
              <><b className="text-white font-semibold">One problem, one promise, one outcome per video.</b> Rhys\'s current habit is solving too many at once. Stop.</>,
              <><b className="text-white font-semibold">"How I" over "how to."</b> Disarming, less threatening.</>,
              <><b className="text-white font-semibold">Native asset bridge at ~1/3.</b> Not a tacked-on CTA at the end.</>,
              <><b className="text-white font-semibold">Saves are a warning.</b> Too dense to action. Simplify, don\'t celebrate.</>,
              <><b className="text-white font-semibold">Hook = clear promise + length.</b> "In 60 seconds I\'ll show you how to stop losing clients in the first 90 days." Context + outcome + frame.</>,
            ]} />
          </Block>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 8 · TARGETS ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">08 · Targets</p>
        <H2>What success looks like.</H2>
        <Note>The numbers we\'re running against. If we hit these, the math compounds and the category is owned.</Note>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">Proven baselines</p>
            <BulletList items={[
              <><b className="text-white font-semibold">82%</b> · 12-month L2 retention</>,
              <><b className="text-white font-semibold">9-9%</b> · book-to-show on workshop calls</>,
              <><b className="text-white font-semibold">83%</b> · VSL completion (8-min version)</>,
              <><b className="text-white font-semibold">$5M</b> · built without going viral</>,
            ]} />
          </div>
          <div className="glow-card p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-3">5-year targets</p>
            <BulletList items={[
              <><b className="text-white font-semibold">50%</b> · of the 15-20K addressable market through workshops</>,
              <><b className="text-white font-semibold">1,000+</b> · workshop attendees per cohort cycle</>,
              <><b className="text-white font-semibold">60%</b> · workshop → L2 conversion (current is higher; bake in margin)</>,
              <><b className="text-white font-semibold">$11M → $20M</b> · year-on-year compounding from cohort retention</>,
            ]} />
          </div>
        </div>
      </Wrap>
      <Divider />

      {/* ─── 9 · NEXT MOVES ─── */}
      <Wrap>
        <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">09 · Next moves</p>
        <H2>What happens this week.</H2>
        <Note>Sequenced. Don\'t start the next thing until the previous is shipped or scheduled.</Note>
        <div className="mt-8">
          <BulletList items={[
            <><b className="text-white font-semibold">1 · Rename + ship Six Step Profit Path landing page.</b> New name + headline ("Turn cold leads into raving fans without spending hours on camera"). Asset itself stays as is.</>,
            <><b className="text-white font-semibold">2 · Lock the 30-day shoot plan.</b> 4 environments, 14 shorts/week, Mon/Wed/Fri schedule. Jacob owns the run sheet.</>,
            <><b className="text-white font-semibold">3 · Block-shoot the Character video.</b> 20-30 min. Walking + sitting in the gym, recounting the arc. No tight production. Vulnerable.</>,
            <><b className="text-white font-semibold">4 · Start writing Rome.</b> VSL outline: pain → path → personal story → 3 case studies → CTA. 4-5 hour target.</>,
            <><b className="text-white font-semibold">5 · Spin out the Churn Calculator.</b> Ship the leaky-bucket analogy as a tool + asset. Easy win, ties to the Quality bottleneck fix.</>,
            <><b className="text-white font-semibold">6 · Q&A framework enforced at next workshop.</b> Two-camera, name + revenue + problem + stakes. No more freeballing. Source the next 12 mid-funnel ads from this cohort.</>,
            <><b className="text-white font-semibold">7 · Pin posts updated on Reese Livingstone account.</b> Currently old testimonials. Replace with the new Character + Rome teasers when they ship.</>,
          ]} />
        </div>
      </Wrap>
    </Shell>
  );
}
