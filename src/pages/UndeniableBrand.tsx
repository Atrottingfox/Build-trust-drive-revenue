import React from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2, BulletList, Collapsible } from '../components/undeniable/Bits';

export default function UndeniableBrand() {
  return (
    <Shell title="Brand · Undeniable" description="The diagnosis, the reframe, the dream client, the bio. The shape your voice fits into." path="/undeniablenextsteps/brand">
      <PageHead
        eyebrow="01 · Brand"
        title="The"
        accent="Brand."
        blurb="The diagnosis, the reframe, the bio, the dream client. Click any section to open it."
      />
      <Divider />

      <Wrap>
        <H2>The brand pack.</H2>
        <Note>Every section below is one piece of the brand. Open the section, copy the artefact, ship.</Note>
        <div className="mt-10 space-y-4">

          {/* DIAGNOSIS */}
          <Collapsible eyebrow="01" title="The diagnosis · CVAQ scores" defaultOpen>
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">From stranger to sale, four bottlenecks. Score each. Fix the lowest.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { letter: 'C', name: 'Clarity', score: 3, focus: 'Fix first', note: 'A stranger lands on the profile, 4 of 5 posts read as "I\'m a coach."' },
                { letter: 'V', name: 'Visibility', score: 4, focus: '', note: 'Strangers showing up in DMs. ICP knows the name when they need help.' },
                { letter: 'A', name: 'Authority', score: 5, focus: '', note: '$5M built. 82% retention. The receipts are unmatched.' },
                { letter: 'Q', name: 'Quality', score: 3, focus: 'Fix next', note: 'Leads landing sub-10K. Qualified eventually, not pre-sold.' },
              ].map((b) => (
                <div key={b.letter} className="rounded-2xl border border-zinc-800 bg-elevated/40 p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-display text-[28px] font-extrabold text-white">{b.letter}</span>
                    <span className="font-display text-[28px] font-extrabold text-blue-400">{b.score}</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-400 mb-1">{b.name}</p>
                  {b.focus && <p className="text-blue-300 text-[10px] uppercase tracking-widest font-semibold mb-2">{b.focus}</p>}
                  <p className="text-zinc-300 text-[13px] leading-relaxed mt-2">{b.note}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-[14px] italic mt-6">Clarity and Quality at 3. That&apos;s where the work starts. Visibility and Authority hold.</p>
          </Collapsible>

          {/* THE REFRAME · FROM TO */}
          <Collapsible eyebrow="02" title="The shift · FROM → TO">
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Founder-as-bottleneck → Founder-as-asset.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">FROM</p>
                <p className="text-zinc-200 text-[15px] leading-relaxed">Founder + Strategist + Content creator + Workshop host + Sales lead + Quality control + Creative director.</p>
              </div>
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">TO</p>
                <p className="text-zinc-100 text-[15px] leading-relaxed font-medium">Founder + Trust asset + Workshop host + Strategy.</p>
              </div>
            </div>
            <p className="text-zinc-400 text-[14px] italic mt-6">This isn&apos;t about working harder. It&apos;s about building the system that runs without you in the room.</p>
          </Collapsible>

          {/* BIO REWRITE */}
          <Collapsible eyebrow="03" title="The bio rewrite · top of every profile">
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Copy-paste-ready. Replace the existing bio. Apply across IG, YT, LinkedIn, email signature.</p>
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6">
              <p className="font-display text-white text-[18px] font-extrabold leading-snug">I help <span className="text-blue-300">fitness coaches</span> build <span className="text-blue-300">$1M+ businesses</span> without <span className="text-blue-300">going viral</span>.</p>
              <p className="text-zinc-300 text-[15px] mt-3">$5M built · 82% client retention · 600 coaches taught in person.</p>
            </div>
            <p className="text-zinc-400 text-[12px] italic mt-4">Pattern: I help [specific avatar] [specific outcome] without [thing they hate]. Receipts: 3 numbers, no fluff.</p>
          </Collapsible>

          {/* BRAND CORE */}
          <Collapsible eyebrow="04" title="Brand core · archetypes, voice, category">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Archetypes</p>
                <BulletList items={[
                  <><b className="text-white font-semibold">Guide</b> (primary) · Done it, sharing the scars.</>,
                  <><b className="text-white font-semibold">Protector</b> · I won&apos;t let people get scammed.</>,
                  <><b className="text-white font-semibold">Scientist</b> · Runs tests, shares lessons, the data guy.</>,
                ]} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Category, offer + recognition</p>
                <BulletList items={[
                  <><b className="text-white font-semibold">Category of ownership:</b> Health &amp; Fitness business owners.</>,
                  <><b className="text-white font-semibold">Unique offer:</b> &ldquo;I did it without influence, without going viral. Come test me in person.&rdquo;</>,
                  <><b className="text-white font-semibold">Recognition line:</b> &ldquo;He&apos;s the one who actually did it.&rdquo;</>,
                ]} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Voice</p>
                <BulletList items={[
                  'Powerful, conviction, dry humour, logical, outcome-focused, obsessive.',
                  'Values: integrity (character is currency), speed, excellence, morality, duty.',
                  'No corporate gloss. Profane when emphatic. Calm conviction over urgency.',
                ]} />
              </div>
            </div>
          </Collapsible>

          {/* DREAM CLIENTS */}
          <Collapsible eyebrow="05" title="Dream clients · the two avatars">
            <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Content aims at these two. They self-identify as doers. The binary format trains more of them to put their hand up.</p>
            <div className="space-y-5">
              <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                <p className="font-display font-extrabold text-white text-[16px] mb-3">Sabine · 15K → 80K months</p>
                <BulletList items={[
                  'Consumed everything, listened to every podcast back to the Livingstone days.',
                  'Problem-solver, patient. &ldquo;Sorry if I\'m being annoying.&rdquo; Tries first, asks when stuck.',
                  'Undiagnosed churn problem. &ldquo;You don\'t know what you don\'t know.&rdquo;',
                ]} />
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
                <p className="font-display font-extrabold text-white text-[16px] mb-3">Josh · gym owner, 2 locations</p>
                <BulletList items={[
                  'Did the math on his churn: lost $800,000 and never knew it. Sat white in the face.',
                  'Shows up to every call. Problem-solves himself. &ldquo;You won\'t hear from me until I\'ve done 80K a month.&rdquo;',
                ]} />
              </div>
            </div>
          </Collapsible>

          {/* THE MACHINE */}
          <Collapsible eyebrow="06" title="The machine · one ecosystem, every road leads to workshop">
            <BulletList items={[
              <><b className="text-white font-semibold">Instagram (organic + boosted)</b> is the distribution. Every post links back to the profile. Boost the losing posts too. The only link in bio is the buyer&apos;s path.</>,
              <><b className="text-white font-semibold">YouTube is the trust engine:</b> the character video, Rome (the masterpiece), and the weekly education videos. Trust gets built here without a sales pitch.</>,
              <><b className="text-white font-semibold">Lead magnets and email</b> sit behind the videos. Diagnostic or roadmap magnets point to YouTube to learn. Every email signals back to YouTube.</>,
              <><b className="text-white font-semibold">The workshop is the money.</b> Secret word and revenue routing tracks who came through the YouTube flow. Pixel everything and retarget.</>,
            ]} />
            <p className="text-zinc-400 text-[14px] italic mt-6">People come in the top and rotate until they pop. The job is to get them in and watching as much as possible.</p>
          </Collapsible>

        </div>
      </Wrap>
    </Shell>
  );
}
