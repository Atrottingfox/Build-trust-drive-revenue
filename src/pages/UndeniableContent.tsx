import React, { useState } from 'react';
import { Shell, PageHead, Wrap, Divider, Note, H2, BulletList, Collapsible, Tabs, ModuleLink } from '../components/undeniable/Bits';

// ─── Data ────────────────────────────────────────────────────────────────

const PILLARS = [
  { name: 'Mindset / Identity', topics: ['"Just a PT" → business owner', 'Hard & boring work', 'Identity leveling up', 'Impact / mission / duty'] },
  { name: 'Leads / Attract', topics: ['Niche (who you help)', 'Message (what you say)', 'Content', 'Proof (authority / case studies)', 'Lead magnets / funnels'] },
  { name: 'Sales / Conversion', topics: ['Offer design', 'Pricing', 'Show rate', 'Close rate', 'Renewals'] },
  { name: 'Scale / Delivery', topics: ['Churn / retention', 'LTV', 'Check-ins', 'Hiring / staff', 'Systems / scale'] },
];

const FORMATS = [
  {
    name: 'Story · teach through experience',
    tag: 'Share',
    structure: [
      'Hook · the moment',
      'What happened · scene / situation',
      'Feeling, meaning, cost · pain, money, emotion',
      'Realisation, lesson, shift',
      'Takeaway one-liner + tool (implementable)',
    ],
  },
  {
    name: 'Belief · teach through perspective',
    tag: 'Share',
    structure: [
      'Hook · contrarian, misconception, bold statement, binary, old vs new, relatable pain',
      'State common belief (+ why it exists)',
      'State your belief (and remove self-blame)',
      'Explanation + one proof / example',
      'Takeaway',
    ],
  },
  {
    name: 'Teach · teach through explanation',
    tag: 'Teach',
    structure: [
      'Hook · If you / If I — problem, pain, want, desire',
      'Core issue / problem',
      '3-5 steps (with a tool or a "don\'t do this")',
      'One core takeaway line',
    ],
  },
  {
    name: 'Show · teach through demonstration',
    tag: 'Teach',
    structure: [
      'Hook',
      'State the problem in their words',
      'Draw the model, do the math, or show',
      'Say what that means for them · one liner',
      'Takeaway / next step',
    ],
  },
];

const ENVIRONMENTS = [
  { name: 'Stories', location: 'Outdoors + walk/talk', vibe: 'Relatable' },
  { name: 'Belief', location: 'Casual hallway / lounge', vibe: 'Authentic' },
  { name: 'Teach', location: 'Desk / gym', vibe: 'Authoritative' },
  { name: 'Show', location: 'Whiteboard / top-down', vibe: 'Demonstrative' },
];

const HOOKS = [
  { name: 'Call out', pattern: 'If you ___ Here\'s ___', example: 'If you\'re sick of being called "just a PT," you\'re gonna wanna listen up.' },
  { name: 'Result and/or proof', pattern: 'I ___. Here\'s ___', example: 'I built a $5M fitness business without going viral. Here\'s what I actually did.' },
  { name: 'Invert belief', pattern: '(Number)% (avatar) think X. But (fact / stat / figure / contrarian experience)', example: 'Most coaches think they have a lead problem. And when I was a PT, I thought I did too.' },
  { name: 'Binary / triplet', pattern: 'There are two ways to (goal)', example: 'There are two ways to get leads. One caps you at 30 clients, one takes you to 300.' },
  { name: "Let's do the math", pattern: 'You think / I thought X, so let\'s map it out', example: 'You think X. Let\'s do the math.' },
  { name: 'Story', pattern: 'I _____', example: 'I built a client a program designed to make her quit.' },
  { name: 'Promise + constraint', pattern: 'As a PT I used to ... until finally ... So in the next ... I\'m going to show you what I did to change it', example: 'As a PT I used to grind 70-hour weeks. Until I capped my 1-on-1s. In the next 60 seconds I\'ll show you what I did.' },
  { name: 'If I had to do it again', pattern: 'If I had to go from ... to ... again, I\'d do this', example: 'If I had to go from $0 to $1M as a fitness coach again, I\'d do this.' },
  { name: 'If you\'re still ...', pattern: 'If you\'re doing (common practice) this is why ...', example: 'If you think you need more leads to grow, you\'re probably making the exact same mistake I made.' },
  { name: 'There was a time I (ridiculous / ashamed thing)', pattern: 'I ___ which is ___', example: 'At my first event, I made $175. Which is the exact same thing I charge 22K for now.' },
];

// ─── Page ────────────────────────────────────────────────────────────────

export default function UndeniableContent() {
  const [active, setActive] = useState('short');

  return (
    <Shell title="Content · Undeniable" description="Short-form and long-form. Pillars, formats, environments, hooks, shoot cadence, posting calendar, data." path="/undeniablenextsteps/content">
      <PageHead
        eyebrow="03 · Content"
        title="The"
        accent="Content."
        blurb="Every piece is Hook → Problem → Path/Solution → Takeaway. We're always educating, just 4 methods to do it."
      />
      <Divider />

      <Wrap>
        {/* MASTER FORMULA */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-6 md:p-8 mb-10">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-blue-300 mb-3">The master formula · every piece</p>
          <div className="flex flex-wrap items-center gap-2">
            {['Hook', 'Problem', 'Path / Solution', 'Takeaway'].map((s, i, a) => (
              <React.Fragment key={s}>
                <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-elevated text-white text-[14px] font-semibold">{s}</span>
                {i < a.length - 1 && <span className="text-blue-400">→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-zinc-400 text-[14px] italic mt-4">Two types: <b className="text-zinc-200">Share</b> (Story + Belief) or <b className="text-zinc-200">Teach</b> (Teach + Show).</p>
        </div>

        <Tabs
          active={active}
          onChange={setActive}
          tabs={[
            { id: 'short', label: 'Shortform' },
            { id: 'long', label: 'Longform' },
          ]}
        />

        {/* ═════════════════ SHORTFORM TAB ═════════════════ */}
        {active === 'short' && (
          <div className="space-y-4">

            {/* PILLARS */}
            <Collapsible eyebrow="01" title="The 4 pillars · what we talk about" defaultOpen>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Four pillars. Topics inside each. Every piece sits in one of them.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {PILLARS.map((p) => (
                  <div key={p.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <p className="font-display text-white text-[16px] font-extrabold mb-3">{p.name}</p>
                    <ul className="space-y-1.5">
                      {p.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span className="text-zinc-300 text-[13px] leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* FORMATS */}
            <Collapsible eyebrow="02" title="The 4 formats · how we educate">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Each piece sits in one format. The structure of each is below.</p>
              <div className="space-y-4">
                {FORMATS.map((f) => (
                  <div key={f.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                      <p className="font-display text-white text-[16px] font-extrabold">{f.name}</p>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 border border-blue-500/30 bg-blue-500/5 rounded-full px-2.5 py-0.5">{f.tag}</span>
                    </div>
                    <ol className="space-y-1.5">
                      {f.structure.map((s, i) => (
                        <li key={s} className="flex items-start gap-3">
                          <span className="font-display text-blue-400 text-[12px] font-extrabold mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-zinc-300 text-[13px] leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* ENVIRONMENTS */}
            <Collapsible eyebrow="03" title="The 4 environments · where we shoot">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Each format gets a matching environment. Rotate, don&apos;t test.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {ENVIRONMENTS.map((e) => (
                  <div key={e.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <p className="font-display text-white text-[16px] font-extrabold mb-2">{e.name}</p>
                    <p className="text-zinc-300 text-[14px] leading-relaxed mb-1">{e.location}</p>
                    <p className="text-blue-300 text-[12px] uppercase tracking-widest font-semibold">{e.vibe}</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* HOOKS */}
            <Collapsible eyebrow="04" title="10 hook templates · starter pack">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Reference set. Mix across pieces, never stack three of the same in a row.</p>
              <div className="space-y-3">
                {HOOKS.map((h, i) => (
                  <div key={h.name} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-blue-400 text-[12px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                      <p className="font-display text-white text-[15px] font-extrabold">{h.name}</p>
                    </div>
                    <p className="text-zinc-400 text-[12px] uppercase tracking-widest font-semibold mb-2">Pattern</p>
                    <p className="text-zinc-300 text-[13px] leading-relaxed mb-3">{h.pattern}</p>
                    <p className="text-zinc-400 text-[12px] uppercase tracking-widest font-semibold mb-2">Example</p>
                    <p className="text-zinc-200 text-[14px] leading-relaxed italic">&ldquo;{h.example}&rdquo;</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-3">
                <ModuleLink to="/undeniablenextsteps/hooks" label="The Hook Bank →" blurb="~90 hooks pulled from the brand-day session, organised by mechanic. The deeper set." />
                <ModuleLink to="/undeniablenextsteps/ad-gold" label="Ad Gold →" blurb="Verbatim money lines, frames, stories. For ads and written creative." />
              </div>
            </Collapsible>

            {/* SHOOT CADENCE */}
            <Collapsible eyebrow="05" title="Shoot cadence · the first 4 weeks">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">Weeks 1-2 test hooks. Weeks 3-4 optimise. Weeks 5-6 topic/format analysis. Decisions at every checkpoint.</p>

              <div className="space-y-5">

                {/* Weeks 1-2 */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-blue-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Weeks 1-2 · hook testing</p>
                  <p className="text-zinc-200 text-[14px] mb-3"><b className="text-white">14 posts total</b> · 7 Share, 7 Teach</p>
                  <BulletList items={[
                    <><b className="text-white font-semibold">Monday</b> · Shoot 8 across 2 locations. Select top 7.</>,
                    <><b className="text-white font-semibold">Wednesday</b> · Shoot 8 across other 2 locations. Select top 7.</>,
                    <>Use a mix of hook templates to test.</>,
                  ]} />
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                  <p className="font-display text-amber-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">End of week 2 · decision point</p>
                  <BulletList items={[
                    'Identify the pattern of top hooks in each pillar — what do the winners have in common.',
                    'Take patterns, build principles.',
                    'Keep top 8 to test hook structure across different topics.',
                    'Add 4 similar hook styles to test.',
                    'Add 12 completely new hooks to test.',
                    'Remove the bottom 10.',
                  ]} />
                </div>

                {/* Weeks 3-4 */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-blue-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Weeks 3-4 · hook optimisation</p>
                  <BulletList items={[
                    <><b className="text-white font-semibold">Monday</b> · 8 across 2 similar locations · half new hooks, half top/similar.</>,
                    <><b className="text-white font-semibold">Wednesday</b> · 8 across 2 similar locations · half new hooks, half top/similar (2 per location).</>,
                    <><b className="text-white font-semibold">Friday</b> · Shoot longform. 3 shorts from longs to promote: 1 toolkit · 1 lead magnet · 1 video. Keep top 2 in the bank.</>,
                  ]} />
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                  <p className="font-display text-amber-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">End of week 4 · review</p>
                  <BulletList items={[
                    'Identify pattern of top hooks in each pillar.',
                    'Keep top 8 to test hook structure across different topics.',
                    'Add 4 similar hook styles.',
                    'Add 12 completely new hooks.',
                    'Remove the bottom 10.',
                  ]} />
                </div>

                {/* Outcome */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                  <p className="font-display text-emerald-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Outcome of 4 weeks</p>
                  <BulletList items={[
                    <><b className="text-white font-semibold">Hooks</b> · 70% winning &amp; adjacent patterns for the rest of 90 days.</>,
                    <><b className="text-white font-semibold">Environments</b> · which are viable for consistent shooting.</>,
                    <><b className="text-white font-semibold">Cadence</b> · when we increase volume, what breaks first and how to hire for it.</>,
                    <><b className="text-white font-semibold">Topics</b> · which clearly get the most engagement regardless of hook.</>,
                    <><b className="text-white font-semibold">Volume</b> · optimal throughput per week. Longer deeper sessions or more shorter ones.</>,
                  ]} />
                  <p className="text-zinc-400 text-[13px] italic mt-4">Not template-based. These principles give us enough data to build from.</p>
                </div>

                {/* Decisions */}
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5">
                  <p className="font-display text-zinc-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Decisions after 4 weeks</p>
                  <BulletList items={[
                    'Do we increase to 21 posts per week?',
                    'Do we need extra editing capacity?',
                    'Do we add 1-2 podcasts per month?',
                    'Do we test new formats / hooks?',
                  ]} />
                  <p className="text-zinc-400 text-[13px] italic mt-4">You&apos;ll also know: which environments shoot consistently, throughput a Mon/Wed cycle can really handle, where the bottleneck is if you push volume (editing vs scripting vs recording).</p>
                </div>

                {/* Weeks 5-6 */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-blue-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Weeks 5-6 · topic / format analysis</p>
                  <p className="text-zinc-300 text-[13px] mb-3 italic">Not a test. An observation.</p>
                  <BulletList items={[
                    'Each week, pick 1-2 high-performing topics from the past month (e.g. offer design, churn, lead magnets).',
                    'For each topic, do two formats that week: Story vs Belief, or Show vs Teach.',
                    'Tag the pairs in the log.',
                    'At end of week 6: for each tested topic, see which format performs best.',
                    'Make a simple rule: "For churn we show." "For niche we tell a story."',
                  ]} />
                </div>
              </div>
            </Collapsible>

            {/* POSTING CALENDAR */}
            <Collapsible eyebrow="06" title="Posting calendar · first 4 weeks">
              <div className="space-y-3">
                {['Week 1', 'Week 2', 'Week 3'].map((w) => (
                  <div key={w} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <p className="font-display text-white text-[14px] font-extrabold mb-2">{w}</p>
                    <p className="text-zinc-300 text-[13px]"><b className="text-white">Shorts:</b> 14 new (Teach + Share)</p>
                    <p className="text-zinc-400 text-[13px] italic mt-1">+ additional carousels, workshop reels, etc.</p>
                  </div>
                ))}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-white text-[14px] font-extrabold mb-2">Week 4</p>
                  <p className="text-zinc-300 text-[13px]"><b className="text-white">Shorts:</b> 14 new (Teach + Share)</p>
                  <p className="text-zinc-400 text-[13px] italic mt-1">+ additional carousels, workshop reels, etc.</p>
                  <p className="text-zinc-300 text-[13px] mt-3"><b className="text-blue-300">Longs:</b> Pillar video no. 1 (Character)</p>
                </div>
              </div>
            </Collapsible>

            {/* DATA COLLECTION · SHORTFORM */}
            <Collapsible eyebrow="07" title="Data collection · Instagram / short-form">
              <div className="space-y-5">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-blue-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">24 hours after posting · log</p>
                  <BulletList items={[
                    'Pillar + topic',
                    'Format (Story / Belief / Teach / Show)',
                    'Hook',
                    'Views',
                    'Saves',
                    'Shares',
                    'Comments',
                    'CTA (if applicable)',
                  ]} />
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5">
                  <p className="font-display text-zinc-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">7 days after posting</p>
                  <p className="text-zinc-300 text-[14px] leading-relaxed">Update the log in a new section on the same post with the final numbers.</p>
                </div>
              </div>
            </Collapsible>

            {/* DEEP DIVES */}
            <Collapsible eyebrow="Deep dives" title="The working tools · open on shoot day">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">These are the tools the team actually opens when shooting. Live working pages, not reference docs.</p>
              <div className="grid md:grid-cols-2 gap-3">
                <ModuleLink to="/undeniablenextsteps/shoot-card" label="Next Shoot" blurb="4 buckets, frameworks, 22 shoot-ready pieces, hook bank per bucket. Open on shoot day." />
                <ModuleLink to="/undeniablenextsteps/hooks" label="Hook Bank" blurb="~90 hooks organised by mechanic." />
                <ModuleLink to="/undeniablenextsteps/ad-gold" label="Ad Gold" blurb="Verbatim money lines, stories, frames." />
                <ModuleLink to="/undeniablenextsteps/content-system" label="Content System" blurb="Formats, modes, capture, measurement, production." />
              </div>
            </Collapsible>

          </div>
        )}

        {/* ═════════════════ LONGFORM TAB ═════════════════ */}
        {active === 'long' && (
          <div className="space-y-4">

            {/* CHARACTER */}
            <Collapsible eyebrow="01" title="Character video · the Trojan horse" defaultOpen>
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">20-30 min. Rhys&apos;s arc. Vulnerable. No selling. Pure trust transfer. Bridges to Rome at the end.</p>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">The 10-beat arc</p>
              <div className="space-y-2">
                {[
                  ['Cold open', 'I built a $5M fitness business without going viral. Here\'s everything I did. And almost everything I did wrong first.'],
                  ['Old situation', 'Gym floor. Trading time for money. Couldn\'t scale because I was the product.'],
                  ['First scar', 'Couldn\'t pay staff two weeks before Christmas. That\'s the year I learned everything.'],
                  ['Second scar', '600% growth in 5 months. The numbers people would kill for. I was ready to walk away.'],
                  ['Turning point', 'Stopped chasing more. Focused on the ones already there.'],
                  ['Proof beat 1', 'Less than 5,000 followers. 12 likes on a photo. $2.2M USD.'],
                  ['Proof beat 2', '750K gym. No one\'s allowed to train there. That\'s the whole point.'],
                  ['Proof beat 3', 'Sabine: 15K → 80K. She watched every podcast back to the Livingstone days.'],
                  ['New reality', '$5M. 82% 12-month retention. Built on systems, not viral moments.'],
                  ['Invitation', 'If you want to see how I applied all of this, I made Rome. 4 hours. Everything. Link below.'],
                ].map(([beat, line]) => (
                  <div key={beat} className="grid grid-cols-[120px_1fr] gap-3 py-2 border-b border-zinc-800/60 last:border-0">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300">{beat}</p>
                    <p className="text-zinc-200 text-[13px] leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-[13px] italic mt-5">Walking + sitting + voiceover with B-roll. Lo-fi. No sales. Damaging admissions OK. Empathise, don&apos;t put yourself down.</p>
            </Collapsible>

            {/* ROME */}
            <Collapsible eyebrow="02" title="Rome · the 4-5 hour VSL">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">The trust asset. The thing others send their friends. Hosted unlisted on a landing page first. YouTube launch when ready.</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Working title</p>
                  <p className="text-white font-semibold text-[14px]">How to make your first 10K as an online fitness coach (and grow to 80K)</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Shoot · edit</p>
                  <p className="text-white font-semibold text-[14px]">2-3 day block-shoot · ~14 days edit</p>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">Chapter map</p>
              <div className="space-y-2">
                {[
                  ['~5 min', 'Hook · clear promise + length + outcome'],
                  ['~10 min', 'The problem · why most coaches cap at 10K'],
                  ['~45 min', 'The path · what to do instead, segment by segment'],
                  ['~20 min', 'Personal story arc (echoes Character video, denser)'],
                  ['~30 min', 'Case study 1 · Luke Miller (60K → 600K USD)'],
                  ['~30 min', 'Case study 2 · Sabine (15K → 80K)'],
                  ['~20 min', 'Case study 3 · Gabe (800K mistake → fix → next stage)'],
                  ['~60 min', 'The full system · how the pieces fit'],
                  ['~10 min', 'Next step CTA · workshop or assets'],
                ].map(([time, chapter]) => (
                  <div key={chapter} className="grid grid-cols-[100px_1fr] gap-3 py-2 border-b border-zinc-800/60 last:border-0">
                    <p className="text-blue-400 text-[12px] font-mono font-semibold">{time}</p>
                    <p className="text-zinc-200 text-[13px] leading-relaxed">{chapter}</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* SIX-WEEK CYCLE */}
            <Collapsible eyebrow="03" title="Six-week content cycle · one video per week">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">After Character + Rome ship, run a 6-week cycle. Each week locked to a type. Loop. Don&apos;t reinvent every cycle.</p>
              <div className="space-y-3">
                {[
                  { wk: 'Week 1', type: 'Character / heart', ex: 'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away.' },
                  { wk: 'Week 2', type: 'Framework explainer', ex: 'The leaky bucket. Top fills with new clients. Sides leak with churn.' },
                  { wk: 'Week 3', type: 'Comparison / binary', ex: 'Two ways to get leads. Door-knock or post 5x a day. Pick one.' },
                  { wk: 'Week 4', type: 'Math live', ex: "Coaches think 3% churn is fine. Let's do the math." },
                  { wk: 'Week 5', type: 'List / numbered breakdown', ex: "3 numbers in your business you've never measured." },
                  { wk: 'Week 6', type: 'Belief flip / hot take', ex: '35 vs 350. Income buys impact. Fight me.' },
                ].map((c) => (
                  <div key={c.wk} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                    <p className="font-display text-white text-[14px] font-extrabold mb-1">{c.wk} · {c.type}</p>
                    <p className="text-zinc-300 text-[13px] italic">&ldquo;{c.ex}&rdquo;</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* PODCASTS */}
            <Collapsible eyebrow="04" title="Podcasts · 3 per week · 5-15 min each">
              <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">One framework per episode. The 78 unfinished chapters from the book become 78 episodes. The pipeline writes itself.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Source</p>
                  <BulletList items={[
                    '78 chapters from the book draft',
                    'Mid-week client problem voice notes (captured)',
                    'Mindset / framing content that doesn\'t fit YouTube',
                  ]} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Distribution</p>
                  <BulletList items={[
                    'Spotify · Apple Podcasts (audio first)',
                    'YouTube audio version (still frame + waveform)',
                    'Short clip pulled for IG / TikTok per episode',
                    'Email newsletter highlights weekly',
                  ]} />
                </div>
              </div>
            </Collapsible>

            {/* DATA COLLECTION · LONGFORM */}
            <Collapsible eyebrow="05" title="Data collection · longform">
              <div className="space-y-5">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-5">
                  <p className="font-display text-blue-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">At 48 hours</p>
                  <BulletList items={[
                    'Title & hook',
                    'Split test data — log both thumb & title of each test (keep winner, test 2 additional titles)',
                    'Pillar / topic',
                    'Current views',
                    'Avg view duration · % watched',
                    'Clicks to description CTAs',
                  ]} />
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5">
                  <p className="font-display text-zinc-300 text-[13px] font-extrabold uppercase tracking-widest mb-3">Updated at 7 days</p>
                  <BulletList items={[
                    'Views',
                    'Avg view duration · % watched',
                    'Clicks to assets',
                    'Apps you can reasonably tie back to people who watched',
                    'Split test data — keep winner, split test two more additional thumbnails',
                  ]} />
                </div>
              </div>
            </Collapsible>

          </div>
        )}
      </Wrap>
    </Shell>
  );
}
