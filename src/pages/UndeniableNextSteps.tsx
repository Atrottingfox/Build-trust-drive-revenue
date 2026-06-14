import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';
import { ModuleLink } from '../components/undeniable/Bits';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">{children}</h2>
);

const BulletList = ({ items, tone = 'zinc-300' }: { items: React.ReactNode[]; tone?: string }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className={`text-${tone} text-sm leading-relaxed`}>{item}</span>
      </li>
    ))}
  </ul>
);

const Quotes = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((q, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-sm md:text-[1rem] leading-relaxed italic">&ldquo;{q}&rdquo;</span>
      </li>
    ))}
  </ul>
);

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">{label}</p>
    {children}
  </div>
);

export default function UndeniableNextSteps() {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO
          title="Next steps for Undeniable"
          description="The build plan from our working session. The diagnosis, the machine, the content system, and who does what next."
          path="/undeniablenextsteps"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        {/* HERO */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <div className="accent-line mb-8" />
              <Eyebrow>Build plan · Next steps</Eyebrow>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
                The problem was never awareness.
                <br />
                <span className="text-zinc-400">It is trust.</span>
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
                <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium italic">Working session output · for the team</span>
              </div>
              <p className="text-zinc-400 text-[1rem] md:text-lg leading-relaxed">
                Everything we mapped in the room, in order. Most of the market already knows who you are. They are not ready to buy yet. The next 6 weeks compress trust and convert the people sitting on the fence, not chase new eyeballs.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* MODULES */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Jump in</Eyebrow>
              <H2>The operating modules.</H2>
              <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">The hub is the map. These are the pages the team opens day to day.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ModuleLink to="/undeniablenextsteps/demand-buckets" label="Demand Buckets" blurb="Six core problems the ICP fights with + the inverse, mapped to environments and styles." />
                <ModuleLink to="/undeniablenextsteps/shoot-card" label="The Shoot Card" blurb="The kick-off checklist and the first 15 shorts, hook to CTA. Open on shoot day." />
                <ModuleLink to="/undeniablenextsteps/content-system" label="The Content System" blurb="Formats, modes, capture, measurement, production, the room." />
                <ModuleLink to="/undeniablenextsteps/hooks" label="The Hook Bank" blurb="Around 90 hooks by mechanic. Grab and shoot." />
                <ModuleLink to="/undeniablenextsteps/ad-gold" label="Ad Gold" blurb="Verbatim money lines and stories, ready to lift into creative." />
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* DIAGNOSIS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The diagnosis</Eyebrow>
              <H2>Four bottlenecks between a stranger and a sale.</H2>
              <div className="space-y-10">
                {[
                  { n: '01', name: 'Clarity', score: '3 / 5', focusLabel: 'Fix first', q: 'Can a stranger understand what you do, who you do it for, and why, in under 10 posts?' },
                  { n: '02', name: 'Visibility', score: '4 / 5', focusLabel: null, q: 'Are people you have never met showing up in your DMs because of your content?' },
                  { n: '03', name: 'Authority', score: '5 / 5', focusLabel: null, q: 'When an ideal client needs help in your category, are you one of the first three thought of?' },
                  { n: '04', name: 'Quality', score: '3 / 5', focusLabel: 'Fix next', q: 'Are the leads landing in your inbox pre sold and properly qualified?' },
                ].map((b) => (
                  <div key={b.n}>
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <span className="font-display text-2xl font-extrabold text-blue-400">{b.n}</span>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">{b.name}</h3>
                      <span className="text-zinc-400 text-sm font-medium">{b.score}</span>
                      {b.focusLabel && (
                        <span className="text-blue-400 text-[11px] font-semibold uppercase tracking-widest border border-blue-500/30 bg-blue-500/5 rounded-full px-2.5 py-0.5">{b.focusLabel}</span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-[1rem] leading-relaxed">{b.q}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed italic mt-10">
                Clarity and Quality sit at three. That is where the work starts. Once clarity is dialled, the machine breaks every bottleneck before it begins.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* THE MACHINE */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The machine</Eyebrow>
              <H2>One ecosystem. Every road leads to the workshop.</H2>
              <BulletList tone="zinc-400" items={[
                <><b className="text-white font-semibold">Instagram (organic + boosted)</b> is the distribution. Every post links back to the profile. Boost the losing posts too. The only link in bio is the buyer&rsquo;s path.</>,
                <><b className="text-white font-semibold">YouTube is the trust engine</b>: the character video, Rome (the masterpiece), and the weekly education videos. Trust gets built here without a sales pitch.</>,
                <><b className="text-white font-semibold">Lead magnets and email</b> sit behind the videos. Diagnostic or roadmap magnets point to YouTube to learn. Straight assets give the two path choice. Every email signals back to YouTube.</>,
                <><b className="text-white font-semibold">The workshop is the money.</b> Secret word and revenue routing tracks who came through the YouTube flow. Pixel everything and retarget.</>,
              ]} />
              <p className="text-zinc-400 text-sm leading-relaxed italic mt-6">
                People come in the top and rotate until they pop. The job is to get them in and watching as much as possible.
              </p>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* THE VIDEO PILLARS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The videos</Eyebrow>
              <H2>The video pillars.</H2>
              <p className="text-zinc-400 text-[14px] leading-relaxed italic mb-2">Working titles, still being refined. Nothing here is locked.</p>
              <div className="space-y-11 mt-6">
                {[
                  { n: 'WK 1', pillar: 'Character', label: 'Character Development', q: 'Why should I listen to this person, specifically?', titles: [
                    'How I Built a $XM Online Fitness Empire in 11 Years without going viral',
                    'How I Made $XM Online Without Going Viral',
                    'As a PT I Made $X. This Is Everything it cost me to get there',
                  ] },
                  { n: 'WK 2', pillar: 'Authority', label: 'The Positioning Play · Full Playbook', q: 'Does this person actually know what they\'re talking about at depth?', titles: [
                    'F*ck It, This Is How to Build a $1M+ Online Fitness Business',
                    '"As an Online Fitness Coach, How Can I Make $1M?" Just Do This.',
                    'How I Made $XM Online Coaching Without Going Viral',
                  ] },
                  { n: 'WK 3', pillar: 'Niche Authority', label: 'Tactical Operator Video · the VSL', q: 'Does this apply specifically to me?', titles: [
                    'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This',
                    'How to Become a $1M Fitness Coach',
                    'How to Make Your First $1M as a Fitness Coach (Step by Step)',
                    'How to Make Your First $1M in Fitness (Full Walkthrough)',
                  ] },
                  { n: 'WK 4', pillar: 'Practical', label: 'Signature Framework · the unique mechanism', q: 'Do I trust this person\'s specific frameworks?', titles: [
                    'How I Made $X/Month as a PT (Without …)',
                    'Stop "Learning Marketing" and Just Copy This',
                  ] },
                  { n: 'WK 5', pillar: 'Implementable', label: 'Accessible Insights', q: 'Do they have insights I can\'t find anywhere else?', titles: [
                    'Stop "Learning Marketing" and Just Copy This (Complete Plan)',
                    'If I Wanted to Add $10,000/Month as a PT, I\'d Just Do This',
                  ] },
                  { n: 'WK 6', pillar: 'Masterclass', label: 'Step by Step Walkthrough', q: 'Is there a complete system, or just tactics?', titles: [
                    'How to Get So Good at Marketing You Never Have to Sell Again',
                    'How to Get So Many Referrals You Never Need to Run an Ad Again',
                    'Every Fitness Creator Gets Stuck at the Same Point. If That\'s You, Do This.',
                    'How to Add $10,000/Month as a PT (The Exact System)',
                  ] },
                ].map((p) => (
                  <div key={p.n}>
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <span className="font-display text-[17px] font-extrabold text-blue-400 whitespace-nowrap">{p.n}</span>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">{p.pillar}</h3>
                    </div>
                    <p className="text-zinc-300 text-[14px] font-medium">{p.label}</p>
                    <p className="text-zinc-400 text-[13px] italic mb-4">{p.q}</p>
                    <ul className="space-y-2">
                      {p.titles.map((t, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                          <span className="text-zinc-300 text-[14px] leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* BRAND CORE */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The voice</Eyebrow>
              <H2>Brand core.</H2>
              <Block label="Archetypes">
                <BulletList items={[
                  <><b className="text-white font-semibold">Guide</b> (primary). Done it, sharing the scars.</>,
                  <><b className="text-white font-semibold">Protector</b>. I won't let people get scammed.</>,
                  <><b className="text-white font-semibold">Scientist</b>. Runs tests, shares lessons, the data guy.</>,
                ]} />
              </Block>
              <Block label="Category, offer + recognition line">
                <BulletList items={[
                  'Category of ownership: Health & Fitness business owners.',
                  'Unique offer: "I did it without influence, without going viral. Come test me in person."',
                  'Recognition line: "He\'s the one who actually did it."',
                ]} />
              </Block>
              <Block label="Voice">
                <BulletList items={[
                  'Powerful, conviction, dry humour, logical, outcome-focused, obsessive.',
                  'Values: integrity (character is currency), speed, excellence, morality, duty.',
                  'No corporate gloss. Profane when emphatic. Calm conviction over urgency.',
                ]} />
              </Block>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* DREAM CLIENTS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Who we aim at</Eyebrow>
              <H2>The dream clients.</H2>
              <p className="text-zinc-400 text-[16px] leading-relaxed mb-10">Content aims at these three. They self-identify as doers. The binary format trains more of them to put their hand up.</p>
              <Block label="Sabine · 15K → 80K months">
                <BulletList items={[
                  'Consumed everything, listened to every podcast back to the Livestone days.',
                  'Problem-solver, patient. "Sorry if I\'m being annoying." Tries first, asks when stuck.',
                  'Undiagnosed churn problem. "You don\'t know what you don\'t know."',
                ]} />
              </Block>
              <Block label="Josh · gym owner, 2 locations">
                <BulletList items={[
                  'Did the math on his churn: lost $800,000 and never knew it. Sat white in the face.',
                  'Shows up to every call. Problem-solves himself. "You won\'t hear from me until I\'ve done 80K a month."',
                ]} />
              </Block>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* NEXT STEPS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The work</Eyebrow>
              <H2>Next steps, by owner.</H2>
              <p className="text-zinc-400 text-[1rem] leading-relaxed mb-12">
                Priority order: the content system first. It is the thing that has been missing, and you get more out of it than anything else.
              </p>

              <Block label="Sean · strategy + frameworks">
                <BulletList items={[
                  'Build the tactile short form system: kick off checklist, formats, flow.',
                  'Send the problems outlined (think vs actual).',
                  'Send the topics to bolt into the 14 videos.',
                  'Send the script structures and the content template.',
                  'Deliver the ecosystem visual as a clean one pager.',
                  'Call to work through the 10 character lessons.',
                  'Build the 6 week cycle doc.',
                  'Send Corey a list of resources to go through and consume.',
                  'Provide the bottleneck diagnostic and call questions for Corey.',
                ]} />
              </Block>

              <Block label="Rhys · talent + IP">
                <BulletList items={[
                  'Prepare 10 core lessons: experience (pain, money), then story, lesson, action, plus a one liner.',
                  'Rename Customer Journey Blueprint to Six Step Profit Path.',
                  'Create the sales asset, film both VSLs.',
                  'Write the hook and problem for each of the 14 videos.',
                  'Film Rome. Host on a landing page first, then YouTube.',
                  'Record 2 to 3 Spotify episodes a week (5 min, one problem).',
                  'Lock the content room build.',
                ]} />
              </Block>

              <Block label="Corey · capture + operations">
                <BulletList items={[
                  'Shoot 14 short form a week across 4 environments. Mon, Wed, Fri.',
                  'Log daily metrics, report Monday.',
                  'Master folder of existing content, drip 2 a day to the second page.',
                  'Isolate the new content around 2 weeks for clean data.',
                  'Two camera minimum on long form, lined up for the cut.',
                  'Get on client calls and in the room. Build pattern recognition.',
                ]} />
              </Block>

            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* OPEN LOOPS */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Still owed</Eyebrow>
              <H2>Open loops.</H2>
              <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">The four things actually blocking forward motion. Everything else is transferring what's already captured.</p>
              <BulletList items={[
                <><b className="text-white font-semibold">The 10 character lessons</b> from Rhys. Experience (pain, money) → story → lesson → action + one-liner. The bottleneck.</>,
                <><b className="text-white font-semibold">Lock the 6 pillar video outlines</b> and send the doc.</>,
                <><b className="text-white font-semibold">Name the signature mechanisms.</b> MACHINE, 5-star offer, the lead-vs-churn inverse.</>,
                <><b className="text-white font-semibold">Naming</b> for the sales asset, churn calculator and diagnostic.</>,
              ]} />
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* WHY NOW */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>Why now</Eyebrow>
              <H2>The rocket ship has already left the station.</H2>
              <Quotes items={[
                'Right problem, wrong way is the most expensive place to be. You get small wins, think it is great, and do not find out for five years you could have been three times the size.',
                'I made an extra $120,000 that year and thought it was great. Then I realised if I had solved it this way first, we would have made an extra $600,000.',
                'Less than 5,000 followers when this started. 40 person rooms. 10 to 12 workshops this year. The room only gets harder to get into.',
                'In twelve months, you stop being the one borrowing status, and become the asset everyone else wants to borrow.',
              ]} />
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* DEEP DIVES · the four sub-pages */}
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <Section>
              <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5 text-center">
                The deep dives
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-white mb-12 text-center leading-tight">
                Each piece, in full.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ModuleLink
                  to="/undeniablenextsteps/demand-buckets"
                  label="Demand Buckets"
                  blurb="Six core problems the ICP fights with, the inverse of each, the angles inside, and how environments map to style."
                />
                <ModuleLink
                  to="/undeniablenextsteps/content-system"
                  label="Content System"
                  blurb="The five signature formats, the three modes, the make-it-land rules. The whole production system."
                />
                <ModuleLink
                  to="/undeniablenextsteps/shoot-card"
                  label="Shoot Card"
                  blurb="Fifteen pre-written, shoot-ready shorts. Hook, problem, path, CTA filled in."
                />
                <ModuleLink
                  to="/undeniablenextsteps/ad-gold"
                  label="Ad Gold"
                  blurb="Verbatim money lines, stories, and frames pulled straight from the session."
                />
                <ModuleLink
                  to="/undeniablenextsteps/hooks"
                  label="Hooks"
                  blurb="Ninety hooks organised by mechanic. The bucket-with-holes opening and what follows."
                />
              </div>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* CLOSING */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Section>
              <div className="accent-line mx-auto mb-10" />
              <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                This is the plan, not the install. We build the actual thing together over the next six weeks. But it should give the whole team one place to see where we are headed and exactly who does what next.
              </p>
              <a
                href="/undeniable-notes"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to the working notes
              </a>
            </Section>
          </div>
        </section>

        <Footer />
      </div>
    </PasswordGate>
  );
}
