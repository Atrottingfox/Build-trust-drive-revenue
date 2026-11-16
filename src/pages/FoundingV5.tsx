import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import FitCall from '../components/founding/FitCall';
import { BuyButton, Crosses, H2, Label, Paid, PHASES, Section, SectionCta, StickyBar, Ticks, useStatus } from './Founding';
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
  "a engine" (Who), the double space after "This is the foundation." (By day 90),
  "every every post" (Fit).
*/
/* v5 only (Sean, 16 Nov): short form in Install, long form in Transfer when it's ready.
   /founding and v2 keep the shared PHASES wording. */
const PHASES_V5 = PHASES.map((ph) =>
  ph.name === 'Install'
    ? { ...ph, lead: 'We build and launch your content, starting with short form. Your Brand Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support.' }
    : ph.name === 'Transfer'
      ? { ...ph, lead: "Your operator runs the system with support. When short form is calibrated and ready, we dial in long form." }
      : ph.name === 'Operate and improve'
        ? { ...ph, lead: 'We iron out any kinks, iterate with data, and ensure the team can run it themselves.' }
        : ph
);

export default function FoundingV5({ live = false }: { live?: boolean }) {
  /* live = the /founding page (Sean, 16 Nov: v5 is the page). Stripe returns to
     /founding?paid=1, personal links (?for= or ?c=) post visits to Slack, and
     the buttons report as founding-* so GA stays continuous with the old page. */
  const paid = live && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const personal = live && typeof window !== 'undefined' && /[?&](for|c)=/.test(window.location.search);
  usePageVisits('/founding', '90 Day Install', personal && !paid);
  const status = useStatus();
  const loc = live ? 'founding' : 'founding-v5';
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      {live ? (
        <SEO
          title="90 Day Install"
          description="Sold before the call. A 90 day content operating system install with the strategy, playbooks and standards your team needs to create content that builds trust before the sale. January 2027, 5 founding places. $10,000 AUD + GST, closes 30 November."
          path="/founding"
          image="https://authorityengine.com.au/og-founding.jpg"
        />
      ) : (
        <SEO title="90 Day Install (v5)" description="Founding 5 page, v5." path="/founding-v5" image="https://authorityengine.com.au/og-founding.jpg" noIndex />
      )}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">January 2027 | 5 founding places</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Sold before the call.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15] mb-8">
              Turn your content team into a sales asset.
            </p>
            {/* Sean's hero copy, 15 Nov. */}
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              A 90 day content operating system install with the strategy, playbooks and standards your team needs to create content that builds trust before the sale.
            </p>
            <div className="mb-3">
              {/* Sean, 16 Nov: VSL final (2:45) as the header video. Option a is still in public/founding. */}
              <VslPlayer src="/founding/vsl-final.mp4" poster="/founding/vsl-final.jpg" loopSrc="/founding/vsl-final-loop.mp4" loopPoster="/founding/vsl-final-loop.jpg" length="2:45" title="Founding 5 VSL final" />
            </div>
            <p className="text-zinc-400 text-sm italic leading-relaxed mb-6">
              Watch the 3 minute walkthrough to see what your team installs over 90 days.
            </p>
            {/* Sean, 16 Nov: the offer and nothing else under the video. No ladder here. */}
            <div className="glow-card p-6 md:p-8">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">January 2027 intake | 5 places</p>
              <p className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight mt-2">Join the January intake</p>
              <p className="font-display text-lg md:text-xl font-extrabold text-white mt-4">$10,000 AUD + GST</p>
              <p className="text-zinc-300 leading-relaxed mt-4">
                This includes your Brand Day and the complete 90 day Authority Engine implementation.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-3">
                You get access to the playbooks, SOPs, training and Thursday advisory calls immediately.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-3">
                Your Brand Day happens before guided 1:1 implementation begins during the next available intake month.
              </p>
              <p className="text-white font-semibold text-sm leading-relaxed mt-5">
                When all five January places are filled, February intake automatically turns to $15,000 AUD + GST, before increasing to $30,000 AUD + GST during 2027.
              </p>
              <BuyButton status={status} location={`${loc}-hero`} label="Secure your January place" hideSpots className="mt-7" />
              <p className="text-zinc-500 text-[13px] leading-relaxed mt-3">
                Payment in full reserves your place and gets immediate access plus a 1:1 strategy call within 7 days.
              </p>
              <FitCall />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* HOW IT WORKS, the v2 section (Sean, 16 Nov) */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>How it works</Label>
            <H2>Install. Transfer. Operate.</H2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mt-6">
              The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
            </p>
            <ol className="relative mt-12 ml-2 border-l border-white/10">
              <li className="relative pl-8 pb-12">
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-white ring-4 ring-blue-500/30" />
                <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Before week 1</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">Brand Day</p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-2">
                  One full media strategy day, in person, to get your brand and content dialled. We analyse your current bottlenecks, map how content actually drives revenue in your business, and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.
                </p>
                <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
                  <p className="text-white font-semibold">Lock it in now to get your Brand Day included in the price.</p>
                  <p className="text-zinc-300 text-[15px] mt-1">There are 11 Brand Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
                </div>
              </li>
              {PHASES_V5.map((ph) => (
                <li key={ph.n} className="relative pl-8 pb-12 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/15" />
                  <p className="text-zinc-500 text-sm uppercase tracking-widest">{ph.weeks}</p>
                  <p className="font-display text-2xl font-extrabold text-white mt-1">{ph.name}</p>
                  <p className="text-zinc-400 text-lg leading-relaxed mt-2">{ph.lead}</p>
                </li>
              ))}
            </ol>
            <p className="text-zinc-300 text-lg leading-relaxed mt-10">
              By the end, your team knows what to do next without asking you every time.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE COMMERCIAL JOB (Sean, 13 Nov) */}
      <section className="py-20 md:py-24">
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
            <p className="text-zinc-400 leading-relaxed mt-8">
              Your sales team should not have to explain everything from scratch on every call.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS INSTALLS */}
      <section className="py-20 md:py-24">
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
                  <span className="text-white text-[15px] font-semibold">{q}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              A working operating system your team uses to plan, produce, judge, publish and improve content.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              This is the foundation.{'\u00a0 '}It gets your team what they need to start, without boxing in their creativity.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PAY IN FULL, with the visual layer */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <Label>Access today</Label>
              <H2>Start in January, get access today.</H2>
              <p className="text-zinc-400 leading-relaxed mt-6">
                1:1 guided implementation starts in the next available intake month, starting January.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-3">
                Pay $10,000 AUD + GST by 30 November and your team gets access to all of this today.
              </p>
            </div>
          </Section>
          <StartTodayShowcase />
        </div>
      </section>

      <SectionCta status={status} location={`${loc}-payinfull`} />

      <div className="gradient-line" />

      {/* EVERYTHING YOU GET + PRICE (Sean, 16 Nov: the v3 layout, price under the list) */}
      <section id="price" className="py-20 md:py-24 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Everything you get</Label>
            <H2>Everything your team needs to run it.</H2>
            {/* Sean, 16 Nov: the v3 list. */}
            <div className="glow-card mt-8 divide-y divide-white/5">
              {[
                'One full Brand Day with you and your team',
                '1:1 guided implementation starts in the next available intake month, beginning January',
                'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
                'One team call per week during installation',
                'Training every fortnight',
                'Two Loom reviews per week during active implementation',
                'Prescriptive advice directly through the portal',
                'Weekly office hours, every Thursday',
                'Monthly content advisory board meetings',
                'WhatsApp support, 24 hour replies',
                'Every SOP, every training video, both playbooks, straight away',
                'Not there by day 90? We keep working with you until you are',
              ].map((t) => (
                <div key={t} className="px-6 py-4 text-zinc-200 text-[15px]">{t}</div>
              ))}
              <div className="px-6 py-6 bg-white/[0.02]">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-zinc-400 text-[14px]">From February, once 5 are sold, increasing back to $30,000 throughout 2027</p>
                  <p className="font-display text-lg font-extrabold text-zinc-300 whitespace-nowrap">$15,000 AUD <span className="text-zinc-500 text-[0.6em] font-semibold">+ GST</span></p>
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-4">
                  <p className="text-white text-[15px] font-semibold">Founding 5, paid in full by 30 November</p>
                  <p className="font-display text-3xl font-extrabold text-white whitespace-nowrap">$10,000 AUD <span className="text-zinc-400 text-[0.4em] font-semibold">+ GST</span></p>
                </div>
                <BuyButton status={status} location={`${loc}-price`} label="Secure your January place" hideSpots className="mt-6" />
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-6">
              The support is there to install the system, so your team stops needing me.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who you'll be working with</Label>
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start mt-2">
              <img
                src="/founding/sean.jpg"
                alt="Sean on set, mid explanation"
                width={440}
                height={550}
                loading="lazy"
                className="w-full max-w-[220px] aspect-[4/5] object-cover rounded-2xl border border-white/10"
              />
              <div>
                {/* Sean's own words, 14 Nov. */}
                <H2>Hey, I'm Sean Fox.</H2>
                <p className="text-zinc-300 leading-relaxed mt-6">
                  I cut my teeth door knocking as a 17 year old kid trying to sell my art to businesses.
                </p>
                <p className="text-zinc-300 leading-relaxed mt-4">
                  Then spent the next 10 years transitioning from photographer, to videographer, creative director, strategist and advisor, now for the past 3 years I've been behind the scenes with 8 figure B2B founders doing $1M+/month, turning content into a engine that consistently drives revenue.
                </p>
                <p className="text-zinc-300 leading-relaxed mt-4">
                  We work with the top 1% as an accelerant where our sole job is to get them seen by the right people to expand impact, and increase their commercial output.
                </p>
                <p className="text-white font-semibold leading-relaxed mt-4">
                  Business is a vehicle for impact, content is the engine that drives it, and revenue is the fuel.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FIT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Fit</Label>
            <H2>This is for you if...</H2>
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

      {/* GUARANTEE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Guarantee</Label>
            <H2>The risk sits with me.</H2>
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">
              If you do not have a consistent rhythm of content going out by day 90, we'll continue working with you until you do.
            </p>
            <p className="text-zinc-500 leading-relaxed mt-6">
              To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantee covers installation, not revenue.
            </p>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location={`${loc}-guarantee`} />

      <div className="gradient-line" />

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Questions</Label>
            <H2>What founders ask before they buy.</H2>
            <FoundingFaq />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What happens next</Label>
            <ol className="space-y-4 mt-2">
              {[
                'Lock in your place on the secure Stripe checkout.',
                'We set up your WhatsApp straight away, with direct access to me.',
                'Receive the Start Here workspace and pre install materials.',
                'Book your Brand Day.',
                'Your team gets access to the training and systems.',
                '1:1 guided implementation starts in the next available intake month, starting January.',
                'Your first live content cycle runs once implementation starts.',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-display text-sm font-extrabold text-blue-400 mt-[3px] w-5 flex-shrink-0">{`0${i + 1}`}</span>
                  <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CLOSE */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Sold before the call.
            </h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15] mt-4">
              Turn your content team into a sales asset.
            </p>
            <div className="flex justify-center">
              <BuyButton status={status} location={`${loc}-close`} className="mt-10" />
            </div>
          </Section>
        </div>
      </section>

      <StickyBar status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
