import React from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2, BulletList, Collapsible } from '../components/undeniable/Bits';

const STATUS_COLOR: Record<string, string> = {
  Active: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Queued: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  Locked: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  Decide: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
};

function Status({ s }: { s: keyof typeof STATUS_COLOR }) {
  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold rounded-full border px-2.5 py-0.5 ${STATUS_COLOR[s]}`}>{s}</span>
  );
}

function Spec({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-5">
      {rows.map(([k, v]) => (
        <div key={k}>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">{k}</p>
          <p className="text-zinc-200 text-[13px] leading-relaxed">{v}</p>
        </div>
      ))}
    </div>
  );
}

function CopyHeadline({ headline, sub }: { headline: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mt-2">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">Headline · ready to paste</p>
      <p className="font-display text-white text-[17px] font-extrabold leading-snug mb-2">{headline}</p>
      <p className="text-zinc-300 text-[14px] leading-relaxed">{sub}</p>
    </div>
  );
}

export default function UndeniableLeadMagnets() {
  return (
    <Shell title="Lead Magnets · Undeniable" description="The 4 critical lead magnets. Named, copied, status-flagged. Ship in 2 weeks." path="/undeniablenextsteps/lead-magnets">
      <PageHead
        eyebrow="02 · Lead Magnets"
        title="The Lead"
        accent="Magnets."
        blurb="The 4 critical assets to get live. Each one has a headline, an outcome, a format, an owner and a ship date. Open the section, ship the asset."
      />
      <Divider />

      <Wrap>
        <H2>The 4 to get live.</H2>
        <Note>Six Step Profit Path and From Cold to Sold are flagship. The diagnostic and the calculator are the workhorses. Click any section to open.</Note>

        <div className="mt-10 space-y-4">

          {/* PROFIT PATH */}
          <Collapsible eyebrow="01 · Top of funnel" title="Six Step Profit Path">
            <div className="flex items-center gap-3 mb-5"><Status s="Active" /><span className="text-zinc-400 text-[13px]">Sean (copy) · Rhys team (page build) · End of week 2</span></div>
            <Spec rows={[
              ['Outcome', 'Take leads from never-heard-of-you to obsessed advocate.'],
              ['Format', 'PDF + video lesson + audio lesson + 4 bonus GPTs'],
              ['Funnel position', 'Problem-unaware → solution-aware'],
              ['Owner', 'Sean (copy) · Rhys team (page build)'],
            ]} />
            <CopyHeadline
              headline="Turn cold leads into raving fans."
              sub="In 5 minutes, you'll know exactly how to take people from never-heard-of-you to obsessed advocate. Without DMing 100 people a day."
            />
            <p className="text-zinc-400 text-[13px] italic mt-4">Renamed from Customer Journey Blueprint. Asset already exists. Relaunch the landing page with the new headline.</p>
          </Collapsible>

          {/* COLD TO SOLD */}
          <Collapsible eyebrow="02 · Mid funnel" title="From Cold to Sold · sales framework">
            <div className="flex items-center gap-3 mb-5"><Status s="Active" /><span className="text-zinc-400 text-[13px]">Sean (copy) · End of week 2</span></div>
            <Spec rows={[
              ['Outcome', 'The exact framework Rhys uses to close 9 out of 10 workshop calls.'],
              ['Format', 'PDF + video walk-through'],
              ['Funnel position', 'Solution-aware → product-aware'],
              ['Owner', 'Sean (copy)'],
            ]} />
            <CopyHeadline
              headline="From Cold to Sold."
              sub="The sales framework I use on every workshop call. Stripped to its bones. Steal it."
            />
            <p className="text-zinc-400 text-[13px] italic mt-4">Best-performing asset for lead quality right now. Doesn&apos;t need rebuild — just a clean landing page.</p>
          </Collapsible>

          {/* DIAGNOSTIC */}
          <Collapsible eyebrow="03 · Mid funnel" title="Find the one thing capping your business">
            <div className="flex items-center gap-3 mb-5"><Status s="Active" /><span className="text-zinc-400 text-[13px]">Rhys · Already live · soft rebrand recommended</span></div>
            <Spec rows={[
              ['Outcome', 'A personalised solution to the single biggest problem in the user\'s business.'],
              ['Format', 'Interactive · 63 personalised combinations · 30-day re-submission lockout'],
              ['Funnel position', 'Solution-aware → workshop-ready'],
              ['Owner', 'Rhys'],
            ]} />
            <CopyHeadline
              headline="Find the one thing capping your business."
              sub="60-second diagnostic. Personalised blueprint + a video of me walking you through the fix."
            />
            <p className="text-zinc-400 text-[13px] italic mt-4">Highest-value asset on the page. Avoid the words &ldquo;diagnostic&rdquo; and &ldquo;bottleneck&rdquo; on the landing page — most don&apos;t know them.</p>
          </Collapsible>

          {/* CHURN CALCULATOR */}
          <Collapsible eyebrow="04 · Bottom funnel" title="How big is your leak · churn calculator">
            <div className="flex items-center gap-3 mb-5"><Status s="Queued" /><span className="text-zinc-400 text-[13px]">Rhys team (build) · Sean (copy) · End of week 4</span></div>
            <Spec rows={[
              ['Outcome', 'Self-identify the leak. Names a problem coaches feel but can\'t describe.'],
              ['Format', 'Web tool · inputs: new clients in × clients out × 12 months → output: grow / flat / shrink + lost revenue'],
              ['Funnel position', 'Top of funnel pull → solution-aware'],
              ['Owner', 'Rhys team (build) · Sean (copy)'],
            ]} />
            <CopyHeadline
              headline="How big is your leak?"
              sub="60-second calculator. Pours your business into a leaky bucket and tells you how fast it's draining. Imagine if you never lost a client."
            />
            <p className="text-zinc-400 text-[13px] italic mt-4">Visualise as the leaky bucket. Above 3% leak rate triggers a follow-up sequence: &ldquo;60% of your business is gone every year. Here&apos;s the fix.&rdquo;</p>
          </Collapsible>

          {/* REFERENCE · ALREADY SHIPPED */}
          <Collapsible eyebrow="Reference" title="Machine Framework · already live">
            <div className="flex items-center gap-3 mb-5"><Status s="Locked" /><span className="text-zinc-400 text-[13px]">Rhys · already shipped</span></div>
            <Spec rows={[
              ['Outcome', 'Build a business that runs without you. NEXT-EXPAND acronym.'],
              ['Format', 'PDF + chapter from the book'],
              ['Notes', 'Built live on stage during the Gabe video. Ship as is.'],
              ['Owner', 'Rhys'],
            ]} />
          </Collapsible>

          <Collapsible eyebrow="Reference · careful" title="Hiring Framework · NEXT EXPAND">
            <div className="flex items-center gap-3 mb-5"><Status s="Locked" /><span className="text-zinc-400 text-[13px]">Rhys · already shipped · don\'t promote</span></div>
            <Spec rows={[
              ['Outcome', 'How to hire your first VA / second hire without trapping yourself.'],
              ['Format', 'PDF'],
              ['Warning', '⚠️ Don\'t make content about the subcontractor legal issue. Keep the asset; don\'t spotlight it. Existing clients are exposed.'],
              ['Owner', 'Rhys'],
            ]} />
          </Collapsible>

          {/* THE FUNNEL VIEW */}
          <Collapsible eyebrow="The map" title="Where each one fits in the funnel">
            <BulletList items={[
              <><b className="text-white font-semibold">Top of funnel · problem-unaware</b> · Six Step Profit Path · How Big Is Your Leak (calculator)</>,
              <><b className="text-white font-semibold">Mid funnel · solution-aware</b> · Find the One Thing (diagnostic) · From Cold to Sold</>,
              <><b className="text-white font-semibold">Bottom funnel · product-aware</b> · Workshop direct</>,
            ]} />
            <p className="text-zinc-400 text-[14px] italic mt-6">Every asset bridges back to workshop. Either through a thank-you page CTA, an email sequence, or a YouTube video bridge at ~1/3.</p>
          </Collapsible>

        </div>
      </Wrap>
    </Shell>
  );
}
