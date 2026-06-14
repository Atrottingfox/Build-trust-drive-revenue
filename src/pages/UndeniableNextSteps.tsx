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
                  { n: '01', name: 'Clarity', score: '3 / 5', focus: true, q: 'Can a stranger understand what you do, who you do it for, and why, in under 10 posts?' },
                  { n: '02', name: 'Visibility', score: '4 / 5', focus: false, q: 'Are people you have never met showing up in your DMs because of your content?' },
                  { n: '03', name: 'Authority', score: '5 / 5', focus: false, q: 'When an ideal client needs help in your category, are you one of the first three thought of?' },
                  { n: '04', name: 'Quality', score: '3 / 5', focus: true, q: 'Are the leads landing in your inbox pre sold and properly qualified?' },
                ].map((b) => (
                  <div key={b.n}>
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <span className="font-display text-2xl font-extrabold text-blue-400">{b.n}</span>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">{b.name}</h3>
                      <span className="text-zinc-400 text-sm font-medium">{b.score}</span>
                      {b.focus && (
                        <span className="text-blue-400 text-[11px] font-semibold uppercase tracking-widest border border-blue-500/30 bg-blue-500/5 rounded-full px-2.5 py-0.5">Fix first</span>
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
              <div className="space-y-11 mt-2">
                {[
                  { n: 'WK 1', pillar: 'Character', label: 'Character Development', q: 'Why should I listen to this person, specifically?', titles: [
                    'How I Built a $XM Online Fitness Empire in 11 Years',
                    'How I Made $XM Online Without Going Viral',
                    'As a PT I Made $X. This Is Everything I Did to Get There.',
                  ] },
                  { n: 'WK 2', pillar: 'Authority', label: 'The Positioning Play · Full Playbook', q: 'Does this person actually know what they\'re talking about at depth?', titles: [
                    'F*ck It, This Is How to Build a $1M+ Online Fitness Business',
                    '"As an Online Fitness Coach, How Can I Make $1M?" Just Do This.',
                    'How I Made $XM Online Coaching Without Going Viral',
                  ] },
                  { n: 'WK 3', pillar: 'Niche Authority', label: 'Tactical Operator Video · the VSL', q: 'Does this apply specifically to me?', titles: [
                    'If I Wanted to Make $1M as a Fitness Coach Again, I\'d Do This',
                    'How to Become a $1M Fitness Coach',
                    'The Fastest Way to Become a Million Dollar Fitness Business Owner',
                    'How to Make Your First $1M as a Fitness Coach (Step by Step)',
                    'How to Make Your First $1M in Fitness (Full Walkthrough)',
                  ] },
                  { n: 'WK 4', pillar: 'Practical', label: 'Signature Framework · the unique mechanism', q: 'Do I trust this person\'s specific frameworks?', titles: [
                    'How I Made $X/Month as a PT (Without …)',
                    'Stop "Learning Marketing" and Just Copy This',
                  ] },
                  { n: 'WK 5', pillar: 'Implementable', label: 'Accessible Insights', q: 'Do they have insights I can\'t find anywhere else?', titles: [
                    'Stop "Learning Marketing" and Just Copy This (Complete Plan)',
                    '$10,000 > $100,000/Month',
                    'If I Wanted to Add $10,000/Month as a PT, I\'d Just Do This',
                    '+$10,000 > +$10,000 > +$10,000',
                    'How to Make an Extra $10,000+ Every Month as an Experienced PT',
                    'The Real Reason Your Marketing Isn\'t Working',
                  ] },
                  { n: 'WK 6', pillar: 'Masterclass', label: 'Step by Step Walkthrough', q: 'Is there a complete system, or just tactics?', titles: [
                    'How to Get So Good at Marketing You Never Have to Sell Again',
                    'How to Get So Many Referrals You Never Need to Run an Ad Again',
                    'Every Fitness Creator Gets Stuck at the Same Point. If That\'s You, Do This.',
                    'How to Add $10,000/Month as a PT (The Exact System)',
                  ] },
                  { n: 'WK 7', pillar: 'Story · bonus', label: 'Case Study (non-traditional)', q: 'Is this just theory? Will it actually work for me?', titles: [
                    'The Real Reason Marketing Isn\'t Working in Your Business',
                  ] },
                  { n: 'WK 8', pillar: 'Philosophy · bonus', label: 'Us vs Them · day in the life / mission', q: 'Why is this different?', titles: [
                    'How to Build Wealth as a PT in 2026, Fast',
                    'Why Health and Fitness Is the BEST Niche to Scale in 2026',
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
              <H2>Brand core. Write as him, not as you.</H2>
              <Block label="Archetypes">
                <BulletList items={[
                  <><b className="text-white font-semibold">Guide</b> (primary). Done it, sharing the scars.</>,
                  <><b className="text-white font-semibold">Protector</b>. Won't let people pay dumb people.</>,
                  <><b className="text-white font-semibold">Scientist</b>. Runs tests, shares lessons, the data guy.</>,
                ]} />
              </Block>
              <Block label="The offer + recognition line">
                <BulletList items={[
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
              <Block label="McLaren lady · unassuming, power coaching">
                <BulletList items={[
                  'Most unassuming in the room. On the sales call: "I just want McLaren money."',
                  'The reminder: most won\'t admit they want money, but the best ones do.',
                ]} />
              </Block>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* TACTILE SHORT FORM */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The missing piece</Eyebrow>
              <H2>Making short form tactile.</H2>

              <div className="flex flex-wrap items-center gap-2 mb-12">
                {['Hook', 'Problem', 'Path / Solution', 'CTA'].map((s, i, arr) => (
                  <React.Fragment key={s}>
                    <span className="px-3.5 py-2 rounded-lg border border-zinc-800 bg-elevated text-white text-sm font-medium">{s}</span>
                    {i < arr.length - 1 && <span className="text-blue-400">&rarr;</span>}
                  </React.Fragment>
                ))}
              </div>

              <Block label="The rule of one">
                <BulletList items={[
                  'One core problem, one core promise, one outcome per video.',
                  'State the promise and the length up front. "In 60 seconds I am gonna help you reduce your churn so you stop losing clients in the first 90 days."',
                  'Use "how I" over "how to." Disarming, less threatening.',
                ]} />
              </Block>

              <Block label="Three content types">
                <BulletList items={[
                  'Demonstration. Whiteboard and top down. "This, this, that." Visual frameworks and graphs.',
                  'Documentation. The gym pieces. Real client problems from the week, anonymised.',
                  'Teaching. Concise, one takeaway, implementable now. Not mental masturbation they save and never action.',
                ]} />
              </Block>

              <Block label="The daily capture">
                <BulletList items={[
                  'End of each day, voice note four questions: What did they learn? What problem did I solve? What did I teach? What do I do differently?',
                  'That alone is tons of content, and it keeps you calibrated.',
                ]} />
              </Block>

              <Block label="The measurement">
                <BulletList items={[
                  'Log daily: Video, Hook, Topic, Likes, Avg view duration, Saves, Shares, Comments.',
                  'Watch saves. High saves can mean too dense to action now.',
                  'Track whether the people commenting tick the avatar box.',
                  'Monday review: best stat, highest watch, the topic.',
                ]} />
              </Block>

              <Block label="Volume and shoot days">
                <BulletList items={[
                  '14 short form a week (2 a day) on top of the existing rhythm.',
                  'Shoot Mon, Wed, Fri half days. More frequency, more data.',
                  '4 environments: this office, hallway, park, gym. Get 3 each, pick the best 14.',
                  'Pre production: write the hook and problem before the shoot.',
                ]} />
              </Block>

              <Block label="The 30 day test">
                <BulletList items={[
                  'Throw a variety of formats and environments up. Gather data.',
                  'Isolate the new tactical content for around 2 weeks for clean signal. No collabs.',
                  'Then lock 4 content types for the next 60 days. Only test 1 to 2 new a month.',
                ]} />
              </Block>
            </Section>
          </div>
        </section>

        <div className="gradient-line" />

        {/* CONTENT ANGLES */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Section>
              <Eyebrow>The raw material</Eyebrow>
              <H2>Content angles, in your words.</H2>
              <p className="text-zinc-400 text-[1rem] leading-relaxed mb-12">
                Pulled straight from the session. These bolt into the 14 videos and the cycles. A month of content sits in here already.
              </p>

              <Block label="Churn · the inverse lever">
                <Quotes items={[
                  'My client lost $800,000 and never even knew it.',
                  'It feels like two steps forward and two back every month. Every month you start with less oxygen than the last. Who feels like that?',
                  'Anything above 3% churn? That is 60% of your business gone every year.',
                  'If you solved for net 0% churn, you could turn around one day and say I am done signing clients. I am good.',
                ]} />
              </Block>

              <Block label="The math · reality check">
                <Quotes items={[
                  'Let us do the math of your business. Live, on the phone. Be the logical guy while everyone else is the show pony.',
                  '100 clients, 15 minute check ins, and you have finally worked a 40 hour week.',
                  'The math cannot account for the emotional toll. Add five hours. Data with empathy, not do more.',
                ]} />
              </Block>

              <Block label="Scale without compromise">
                <Quotes items={[
                  'You can have your cake and eat it too. The art of coaching does not have to die at scale.',
                  'Most people think they have to compromise who they are to build something big. Not true.',
                  'Imagine if you did not have to compromise.',
                ]} />
              </Block>

              <Block label="Coaching is a career, not a hobby">
                <Quotes items={[
                  'If you are sick of being called just a PT, even though you are running over 10K, I finally worked out why.',
                  'Old way: coaching could be a hobby. New way: coaching is a career.',
                  'Your market ages up. You have to age up with it.',
                ]} />
              </Block>

              <Block label="Impact equals income">
                <Quotes items={[
                  'Which business has more impact: 35 clients done brilliantly, or 350 who lose 10 kilos and move on? It is the bigger one. Fight me.',
                  'Income buys you impact. You are not changing the world coaching 25 people.',
                  'You have a duty to build something big if you are so impact driven.',
                ]} />
              </Block>

              <Block label="I did it without influence">
                <Quotes items={[
                  'I did it without going viral.',
                  'I started the same way. Trading time for no money on the gym floor.',
                  'Come test me in person. You cannot freeball in person.',
                ]} />
              </Block>

              <Block label="Old way vs new way">
                <Quotes items={[
                  'Old way: just show up online. New way: treat your content as an ecosystem.',
                  'Old way: loom check ins. New way: written check ins. They can be done by anyone.',
                  'Being a good coach is not enough. Business is a separate skill.',
                ]} />
              </Block>

              <Block label="Profit vs revenue · the higher bracket">
                <Quotes items={[
                  'They chase 70 to 80K months and it resets to zero on the first.',
                  'Vertical growth feels fun until you do not have it, then you are back on the treadmill.',
                  'Revenue minus tax, minus GST, minus a lifestyle you have already adjusted to.',
                ]} />
              </Block>

              <Block label="Been burned · scepticism">
                <Quotes items={[
                  'I am a big fan of scepticism. Check for receipts.',
                  'If you have been burnt and you are scared to be burnt again, the only thing happening is you staying smaller.',
                  'Worst case you find more info and stay the same. Best case you are wrong and you get wealthier.',
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
                  'Build the 6 week cycle doc and the Taki weekly campaign template.',
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

              <p className="text-zinc-400 text-sm leading-relaxed italic">
                The thing only Rhys can give is the 10 lessons. That is the bottleneck. Chase it first.
              </p>
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
                <><b className="text-white font-semibold">Lock 6 vs 8 pillars</b> and map each to a 5 A. Two versions are floating.</>,
                <><b className="text-white font-semibold">Name the one signature mechanism</b> (with a visual + promise). MACHINE, 5-star offer, or the lead-vs-churn inverse.</>,
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
