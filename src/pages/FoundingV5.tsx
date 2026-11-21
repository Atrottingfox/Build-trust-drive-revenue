import { BookOpen, CalendarDays, Check, CreditCard, FolderOpen, GraduationCap, MessageCircle, Play, Repeat, ShieldCheck, Users, Video } from 'lucide-react';
import FitCall from '../components/founding/FitCall';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import { BuyButton, Crosses, H2, Label, Paid, PHASES, Section, StickyBar, Ticks, useStatus } from './Founding';
import { usePageVisits } from '../lib/pageVisits';

/*
  /founding-v5. Sean, 13 Nov: everything /founding has, displayed exactly as
  it is there, plus two sections: The commercial job (after the hero) and the
  90 day path (before Pay in full). Copied from Founding.tsx on 13 Nov, so a
  later change to /founding does not reach this page by itself. Hidden from
  Google.
*/

/*
  DELIBERATE small errors, Sean 16 Nov (so the page reads hand written). Do not fix:
  the double space after "This is the foundation." (By day 90),
  "every every post" (Fit). 17 Nov, in How it works (Build): the
  double space before "Then we turn that".
*/
/* v5 only (Sean, 16 Nov): short form in Install, long form in Transfer when it's ready.
   /founding and v2 keep the shared PHASES wording. */
const PHASES_V5 = PHASES.map((ph) =>
  ph.name === 'Install'
    ? { ...ph, lead: 'We launch your content starting with short form. Your Strategy Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support to get it cranking.' }
    : ph.name === 'Transfer'
      /* Sean, 18 Nov: "i think we can combine transfer and tune". One step, weeks 5 to 12. */
      ? { ...ph, weeks: 'Weeks 5 to 12', name: 'Transfer and tune', lead: "Your operator runs the system with support. When short form is calibrated and ready, we dial in long form. We iron out any kinks, iterate with data, and ensure the team can run it themselves." }
      : ph
).filter((ph) => ph.name !== 'Operate and improve');

/* /founding-test (Sean, 21 Nov): elements borrowed from ecommerceequation.com.au.
   Only real proof. Quotes and testimonial videos are slots until Sean supplies them. */
const HERO_STATS = [
  { v: '+$5M', l: 'Revenue from content', s: 'Taki Moore, 12 months' },
  { v: '46k to 90k', l: 'Following', s: 'Jay Wright, 10 months' },
  { v: '$10M+', l: 'Created for clients', s: 'Past 24 months' },
  { v: '$1.06M', l: 'Average client, per month', s: 'Revenue' },
];
const PROOF = [
  { stat: '+$5M', when: '12 months', name: 'Taki Moore', head: 'Every prospect arrived presold.', body: 'In twelve months. It completely transformed how he sold, how he showed up, and how the market saw him.' },
  { stat: '46k to 90k', when: '10 months', name: 'Jay Wright', head: 'Optimised exclusively for trust.', body: 'Content attributed to many millions in additional revenue and a PE acquisition.' },
];
const GET_ICONS = [CalendarDays, Users, CalendarDays, GraduationCap, Video, MessageCircle, Users, BookOpen, MessageCircle, FolderOpen, ShieldCheck];

function TestCta({ status, loc }: { status: ReturnType<typeof useStatus>; loc: string }) {
  return <BuyButton jump status={status} location={loc} label="Secure your January place" hideSpots className="mt-5" />;
}

export default function FoundingV5({ live = false, test = false }: { live?: boolean; test?: boolean }) {
  /* live = the /founding page (Sean, 16 Nov: v5 is the page). Stripe returns to
     /founding?paid=1, personal links (?for= or ?c=) post visits to Slack, and
     the buttons report as founding-* so GA stays continuous with the old page. */
  const paid = live && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const personal = live && typeof window !== 'undefined' && /[?&](for|c)=/.test(window.location.search);
  usePageVisits('/founding', '90 Day Install', personal && !paid);
  const status = useStatus();
  const loc = live ? 'founding' : test ? 'founding-test' : 'founding-v5';
  /* Checkout moves to February once January has 5 sales or 30 November passes. */
  const feb = status?.intake === 'february';
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      {live ? (
        <SEO
          title="90 Day Install"
          description="The Authority Engine. Our 90 day install with the strategy, playbooks and standards your team needs to create content that makes the right buyers trust you before the sale. January 2027, 5 founding places. $10,000 AUD + GST, closes 30 November."
          path="/founding"
          image="https://authorityengine.com.au/og-founding-v3.jpg"
        />
      ) : (
        test ? <SEO title="90 Day Install (test)" description="Test page." path="/founding-test" image="https://authorityengine.com.au/og-founding-v3.jpg" noIndex /> : <SEO title="90 Day Install (v5)" description="Founding 5 page, v5." path="/founding-v5" image="https://authorityengine.com.au/og-founding-v3.jpg" noIndex />
      )}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Sean, 21 Nov (structure notes): problem, how it works, outcome, who, fit, offer, then FAQ and close. His words unchanged. */}
      {/* HERO */}
      <section className="pt-24 pb-8 md:pt-40 md:pb-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            {/* Sean's hero copy, 17 Nov: "Sold before the call" is the brow. 18 Nov: The Authority Engine instead. */}
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">The Authority Engine</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Turn your content team into a sales asset.
            </h1>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              Our 90 day install with the strategy, playbooks and standards your team needs to create content that makes the right buyers trust you before the sale.
            </p>
            {test && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {HERO_STATS.map((x) => (
                  <div key={x.l} className="glow-card px-4 py-4">
                    <p className="font-display text-2xl md:text-[26px] font-extrabold text-white leading-none">{x.v}</p>
                    <p className="text-zinc-300 text-[14px] mt-2 leading-snug">{x.l}</p>
                    <p className="text-blue-400 text-[12px] mt-1">{x.s}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-3">
              {/* Sean, 18 Nov: the new VSL final render (7:35) as the header video. The older cuts are still in public/founding. */}
              <VslPlayer src="/founding/vsl-final-v2-cc.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-final-v2-loop.mp4" loopPoster="/founding/vsl-final-v2-loop.jpg" length="7:35" title="Founding 5 VSL final v2" />
            </div>
            <p className="text-zinc-400 text-[15px] italic leading-relaxed mb-6">
              Watch the 7 minute walkthrough to see what your team installs over 90 days.
            </p>
            {/* Feedback, 21 Nov: a button straight under the video. */}
            <BuyButton jump status={status} location={`${loc}-video`} label="Secure your January place" hideSpots className="-mt-2" />
            {/* Sean, 21 Nov: more below the button, but not the full cost. His line items from the old offer card, no price. */}
            <div className="glow-card p-5 md:p-8 mt-8">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">{feb ? 'February 2027 | 5 places' : '5 places at the founding rate'}</p>
              <p className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight mt-2">{feb ? 'Join the February intake' : 'Join the January intake'}</p>
              {/* Sean, 21 Nov: everything they get before the Strategy Day, under "Get immediate access to:". Names from the Start today list. */}
              <p className="text-zinc-400 text-[17px] mt-6 border-t border-white/10 pt-5">Before we roll into 1:1 implementation on our in person strategy day, get immediate access to:</p>
              <ul className="mt-3 space-y-3">
                {['Every SOP', 'Every training video', 'All playbooks', 'Thursday advisory group office hours', '1:1 WhatsApp communication'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white text-[17px]">
                    <Check className="w-4 h-4 shrink-0 text-blue-400" strokeWidth={3} />{t}
                  </li>
                ))}
              </ul>
              {!feb && <p className="text-zinc-500 text-[14px] leading-relaxed mt-5">Closes 30 November.</p>}
            </div>
            {test && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-zinc-500 text-[12px] uppercase tracking-widest">Behind the scenes with</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-3 text-zinc-300 font-display font-extrabold text-lg">
                  {['Taki Moore', 'Jay Wright', 'LSKD', 'Tiger Lily'].map((n) => <span key={n}>{n}</span>)}
                </div>
              </div>
            )}
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE TRUST GAP. Sean's copy, 21 Nov, word for word. */}
      <section className="pt-10 pb-14 md:pt-14 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The trust gap</Label>
            {/* Sean, 21 Nov: the short version, his exact lines. */}
            <H2>Your business has outgrown the way your content gets made.</H2>
            {/* Sean, 21 Nov: his copy for the gap, verbatim. */}
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and you have legit proof on your side.</p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">But your content is still:</p>
            <div className="mt-4">
              <Crosses items={[
                'Getting attention that doesn\'t convert to sales',
                'Teaching killer ideas that don\'t connect with your sales process',
                'Produced by a team that still needs you to decide what to say',
                'Reaching people interested but unlikely to buy',
                'Sending people into calls where they have to explain everything from scratch',
              ]} />
            </div>
            <div className="mt-8 space-y-1 text-white text-lg leading-relaxed">
              <p className="text-zinc-400">Problem is -</p>
              <p>You have the authority.</p>
              <p>Your content just doesn't communicate it.</p>
            </div>
            <div className="glow-card p-6 md:p-8 mt-12">
              <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Step one</p>
              <p className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight mt-2">The Strategy Day</p>
              <p className="text-zinc-300 text-lg leading-relaxed mt-4">We compress your brand, content and revenue strategy into one day.</p>
              <p className="text-zinc-400 text-[17px] leading-relaxed mt-5">We map:</p>
              <div className="mt-4">
                <Ticks items={[
                  'Your positioning',
                  'Your ideal buyer',
                  'What they need to believe before buying',
                  'Why common solutions fail',
                  'What makes your approach different',
                  'The content required to move someone from stranger to advocate',
                ]} />
              </div>
              <p className="text-white text-lg font-semibold leading-relaxed mt-6">That blueprint becomes the foundation for the 90 day implementation.</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Sean, 21 Nov: offer card removed. It is in git at efb32cc. */}
      {/* THE COMMERCIAL JOB (Sean, 13 Nov) */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The commercial job</Label>
            <H2>Your content should do more than get attention.</H2>
            <div className="mt-8">
            <Ticks items={[
              'Make the right buyers recognise their problem',
              'Show them why common solutions fail',
              'Explain why your approach is different',
              'Build trust in your expertise',
              'Move them toward the next step',
            ]} />
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">
              Your sales team should not have to explain everything from scratch on every call.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {test && (
        <>
          <section className="py-14 md:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <Section>
                <Label>Client results</Label>
                <H2>$10M+ created for clients in the past 24 months.</H2>
                <div className="grid md:grid-cols-2 gap-4 mt-10">
                  {PROOF.map((x) => (
                    <div key={x.name} className="glow-card p-6 md:p-8 flex flex-col">
                      <p className="font-display text-4xl md:text-5xl font-extrabold text-white leading-none">{x.stat}</p>
                      <p className="text-blue-400 text-[13px] uppercase tracking-widest mt-3">{x.name}, {x.when}</p>
                      <p className="text-white text-xl font-semibold mt-6">{x.head}</p>
                      <p className="text-zinc-400 text-[17px] leading-relaxed mt-2">{x.body}</p>
                      <div className="mt-6 rounded-xl border border-dashed border-white/15 px-5 py-4 text-zinc-500 text-[15px] italic">({x.name.split(' ')[0]} quote)</div>
                    </div>
                  ))}
                </div>
                <TestCta status={status} loc={`${loc}-proof`} />
              </Section>
            </div>
          </section>
          <div className="gradient-line" />
        </>
      )}

      {/* HOW IT WORKS, Sean's copy 17 Nov */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>How it works</Label>
            <H2>Build. Install. Tune.</H2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mt-6">
              The Authority Engine turns your founder expertise into a repeatable content system your team can plan, produce, review and improve without relying on you to make every decision.
            </p>
            <ol className="relative mt-12 ml-2 border-l border-white/10">
              {/* Sean, 21 Nov: Secure your place sits above Build, because access starts the moment they buy. */}
              <li className="relative pl-8 pb-12">
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-white ring-4 ring-blue-500/30" />
                <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Today</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">Secure your place</p>
                <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
                  <p className="text-white font-semibold">Secure your place now to get your Strategy Day included in the price.</p>
                  <p className="text-zinc-300 text-[17px] mt-1">There are 11 Strategy Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
                  <p className="text-zinc-300 text-[17px] mt-1">Plus immediate access to group advisory calls, training, playbooks, and all SOP's.</p>
                </div>
                <BuyButton jump status={status} location={`${loc}-build`} label="Secure your January place" hideSpots className="mt-6" />
              </li>
              <li className="relative pl-8 pb-12">
                <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/15" />
                <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Before week 1</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">Build</p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-2">
                  {/* Sean, 21 Nov: points back to the Strategy Day card above instead of repeating it. */}
                  Your Strategy Day, in person, with everything we map above. We analyse your current bottlenecks and build your Buying Belief Map.{'\u00a0 '}Then we turn that into a documented brand and Authority Engine.
                </p>
              </li>
              {PHASES_V5.map((ph) => (
                <li key={ph.n} className="relative pl-8 pb-12 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/15" />
                  <p className="text-zinc-500 text-sm uppercase tracking-widest">{ph.weeks}</p>
                  <p className="font-display text-2xl font-extrabold text-white mt-1">{ph.name}</p>
                  <p className="text-zinc-400 text-lg leading-relaxed mt-2">{ph.lead}</p>
                  {test && <TestCta status={status} loc={`${loc}-phase`} />}
                </li>
              ))}
            </ol>
            <p className="text-zinc-300 text-lg leading-relaxed mt-10">
              By the end of 90 days, your team knows what to make, how to make it, what good looks like and what to do next.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS INSTALLS */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>By day 90</Label>
            <H2>By day 90, your team can answer these.</H2>
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                'What should we make?',
                'Who is it for?',
                'Which format fits?',
                'How do we capture it?',
                'How do we produce it?',
                'Is it good enough to publish?',
                'Did it work?',
                'What do we do more of next?',
              ].map((q, i) => (
                <div key={q} className="glow-card px-5 py-4 flex items-center gap-4">
                  <span className="font-display text-sm font-extrabold text-blue-400 w-5">{`0${i + 1}`}</span>
                  <span className="text-white text-[17px] font-semibold">{q}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">
              A working operating system your team uses to plan, produce, judge, publish and improve content.
            </p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-4">
              This is the foundation.{'\u00a0 '}It gets your team what they need to start, without boxing in their creativity.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PAY IN FULL, with the visual layer */}
      <section className="py-14 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <Label>Access today</Label>
              <H2>Start in January, get access today.</H2>
              <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">
                1:1 guided implementation starts in the next available intake month, beginning January.
              </p>
              <p className="text-zinc-400 text-[17px] leading-relaxed mt-3">
                Pay $10,000 AUD + GST by 30 November and your team gets access to all of this today.
              </p>
            </div>
          </Section>
          <StartTodayShowcase />
        </div>
      </section>


      <div className="gradient-line" />

      {/* WHO */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="text-center md:text-left"><Label>Who you'll be working with</Label></div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 md:gap-10 mt-2 max-w-2xl md:max-w-none mx-auto">
              <img
                src="/founding/sean.jpg"
                alt="Sean on set, mid explanation"
                width={440}
                height={550}
                loading="lazy"
                className="w-full max-w-[220px] md:w-[220px] md:shrink-0 aspect-[4/5] object-cover rounded-2xl border border-white/10 mx-auto md:mx-0"
              />
              <div>
                {/* Sean's own words, 14 Nov. */}
                <H2>Sean Fox</H2>
                <p className="text-zinc-300 text-lg leading-relaxed mt-6">
                  I cut my teeth door knocking as a 17 year old kid trying to sell my art to businesses.
                </p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-4">
                  Then spent the next 10 years transitioning from photographer, to videographer, creative director, strategist and advisor, now for the past 3 years I've been behind the scenes with 8 figure B2B founders doing $1M+/month, creating content that consistently drives revenue.
                </p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-4">
                  We work with the top 1% as an accelerant where our sole job is to get them seen by the right people to expand impact, and increase their commercial output.
                </p>
                <p className="text-white text-lg font-semibold leading-relaxed mt-4">
                  Business is a vehicle for impact, content is the engine that drives it, and revenue is the fuel.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FIT */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Fit</Label>
            <H2>This is for you if...</H2>
            {/* Sean, 17 Nov: moved here from the hero. */}
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mt-4">For founders who speed up when the market slows down.</p>
            <div className="mt-8">
              <Ticks items={[
                'You already do $200K/month or more',
                'You have a proven offer and real expertise',
                'You already create some content',
                'You have an operator or team member to train',
                'You want the team running content without you managing every every post',
              ]} />
            </div>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white mt-14">This isn't for you if...</p>
            <div className="mt-6">
              <Crosses items={[
                'You want a done for you content agency',
                'You are starting from zero',
                'Your team will not attend, implement or share data honestly',
              ]} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* EVERYTHING YOU GET + PRICE (Sean, 16 Nov: the v3 layout, price under the list) */}
      <section id="price" className="py-14 md:py-24 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Everything you get</Label>
            <H2>Everything your team needs to run your content.</H2>
            {/* Sean, 21 Nov (review notes): no price on each line, no total. One strong price box, guarantee straight under it. */}
            <div className="glow-card mt-8 divide-y divide-white/5">
              {[
                'A Strategy Day with you and your team',
                'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
                'Training every fortnight',
                'Two Loom reviews per week during active implementation',
                'Prescriptive advice directly through the portal',
                'Advisory group office hours, every Thursday',
                'Monthly content advisory board meetings',
                'WhatsApp support, 24 hour replies',
                'Every SOP, every training video, all playbooks, straight away',
              ].map((t, i) => {
                const Icon = GET_ICONS[i] || Play;
                return test ? (
                  <div key={t} className="flex items-center gap-4 px-6 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/25"><Icon className="w-[18px] h-[18px] text-blue-400" strokeWidth={1.75} /></span>
                    <span className="text-white text-[17px]">{t}</span>
                  </div>
                ) : (
                  <div key={t} className="px-6 py-4 text-zinc-200 text-[17px]">{t}</div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-blue-500/40 bg-blue-500/[0.07] p-6 md:p-8">
              <p className="text-white text-[17px] font-semibold">{feb ? 'February intake, paid in full' : 'Founding 5, paid in full by 30 November'}</p>
              <p className="font-display text-4xl md:text-6xl font-extrabold text-white mt-2 whitespace-nowrap">{feb ? '$15,000' : '$10,000'} AUD <span className="text-zinc-400 text-[0.3em] font-semibold">+ GST</span></p>
              {!feb && <p className="text-zinc-400 text-[16px] leading-relaxed mt-4">From February, once 5 are sold, <span className="text-zinc-200 font-semibold">$15,000 AUD + GST</span>, increasing back to $30,000 throughout 2027.</p>}
              <p className="text-zinc-400 text-[16px] mt-2">1:1 guided implementation starts in the next available intake month, beginning January.</p>
              <BuyButton status={status} location={`${loc}-price`} label="Secure your January place" hideSpots className="mt-6" />
            </div>
            {/* Sean's guarantee, moved here from its own section. */}
            <div className="mt-6 flex gap-4">
              <ShieldCheck className="w-6 h-6 shrink-0 text-blue-400 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-white text-lg font-semibold">The risk sits with me.</p>
                <p className="text-zinc-300 text-[17px] leading-relaxed mt-1">If you do not have a consistent rhythm of content going out by day 90, we'll continue working with you until you do.</p>
                <p className="text-zinc-500 text-[14px] leading-relaxed mt-3">To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantee covers installation, not revenue.</p>
              </div>
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">
              The support is there to install the system so your team stops needing me.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />


      {/* FAQ */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Frequently asked questions</Label>
            <H2>What founders ask before they buy.</H2>
            <FoundingFaq />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT HAPPENS NEXT */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What happens next</Label>
            <ol className="grid gap-3 mt-2">
              {([
                [CreditCard, 'Secure your place on the Stripe checkout.'],
                [MessageCircle, 'We set up your WhatsApp straight away, with direct access to me.'],
                [FolderOpen, 'Receive the Start Here workspace and pre install materials.'],
                [CalendarDays, 'Book your Strategy Day.'],
                [GraduationCap, 'Your team gets access to the training and systems.'],
                [Users, '1:1 guided implementation starts in the next available intake month, beginning January.'],
                [Repeat, 'Your first live content cycle runs once implementation starts.'],
              ] as const).map(([Icon, t], i) => (
                <li key={i} className="glow-card flex items-center gap-4 md:gap-5 px-5 py-4 md:px-6 md:py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/25">
                    <Icon className="w-5 h-5 text-blue-400" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-blue-400 text-[12px] uppercase tracking-widest font-semibold">Step {i + 1}</p>
                    <p className="text-white text-lg leading-snug mt-0.5">{t}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {test && (
        <>
          <section className="py-14 md:py-24">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <Section>
                <Label>From the founders</Label>
                <H2>Hear it from them.</H2>
                <div className="grid md:grid-cols-3 gap-4 mt-10">
                  {['(testimonial video 1)', '(testimonial video 2)', '(testimonial video 3)'].map((t) => (
                    <div key={t} className="glow-card aspect-[9/16] md:aspect-[4/5] flex flex-col items-center justify-center gap-3 border border-dashed border-white/15">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10"><Play className="w-6 h-6 text-white" /></span>
                      <p className="text-zinc-500 text-[15px] italic">{t}</p>
                    </div>
                  ))}
                </div>
                <TestCta status={status} loc={`${loc}-wall`} />
              </Section>
            </div>
          </section>
          <div className="gradient-line" />
        </>
      )}

      {/* CLOSE */}
      <section className="relative overflow-hidden py-16 md:py-28">
        {/* Feedback, 21 Nov: the close read dark. A soft blue glow behind it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              The Authority Engine
            </h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-200 leading-[1.15] mt-4">
              Turn your content team into a sales asset.
            </p>
            <div className="flex justify-center">
              <BuyButton jump status={status} location={`${loc}-close`} label="Secure your January place" className="mt-10" />
            </div>
            {test && <div className="max-w-md mx-auto mt-10 text-left"><FitCall /></div>}
          </Section>
        </div>
      </section>

      <StickyBar jump status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
