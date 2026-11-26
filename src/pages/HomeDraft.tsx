import { Check, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FoundingFaq from '../components/founding/FoundingFaq';
import FormatsMap from '../components/founding/FormatsMap';
import TrustedBy from '../components/founding/TrustedBy';
import ClientFaces from '../components/founding/ClientFaces';
import { Section } from './Founding';

/*
  /home-draft. Hidden from Google, linked from nowhere (Sean, 26 Nov: "can you
  show me an example"). The evergreen home page built from /founding sections,
  word for word. Nothing dated: no price, no intake, no sticky bar, no access
  list. One CTA to /founding while founding is open.
  Eyebrow is Sean's line, 26 Nov: "helping industry leaders own their category".
*/

/* Looping silent clip, or a still. */
const Media = ({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) =>
  src.endsWith('.mp4') ? (
    <video src={src} poster={src.replace('.mp4', '.jpg')} autoPlay muted loop playsInline preload="metadata" aria-label={alt} className={className} />
  ) : (
    <img src={src} alt={alt} loading="lazy" className={className} />
  );

/* Sean, 22 Nov: "use this same language", his /founding trust gap and Strategy Day copy, word for word. */
const GAP = [
  "Getting attention that doesn't convert to sales",
  "Teaching killer ideas that don't connect with your sales process",
  'Produced by a team that still needs you to decide what to say',
  'Reaching people interested but unlikely to buy',
  'Sending people into calls where they have to explain everything from scratch',
];
const MAP = ['Your positioning', 'Your ideal buyer', 'What they need to believe before buying', 'Why common solutions fail', 'What makes your approach different', 'The content that moves a stranger to a buyer'];
const QUESTIONS = ['What should we make?', 'Who is it for?', 'Which format fits?', 'How do we capture it?', 'How do we produce it?', 'Is it good enough to publish?', 'Did it work?', 'What do we do more of next?'];

const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`}>{children}</p>
);
const H = ({ children, dark = false, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) => (
  <h2 className={`font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] ${dark ? 'text-white' : 'text-zinc-900'} ${className}`}>{children}</h2>
);
const Tick = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <li className={`flex items-start gap-2.5 text-[16px] leading-relaxed ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}><Check className={`w-4 h-4 mt-1 shrink-0 ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`} strokeWidth={3} />{children}</li>
);

const CTA = 'Secure your January place';
const Go = ({ dark = false }: { dark?: boolean }) => (
  <a href="/founding" className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[16px] font-semibold transition-colors ${dark ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-[#3B7DFF] text-white hover:bg-[#2f6be6]'}`}>{CTA}</a>
);

/* His /founding step copy, without the week labels. */
const STEPS = [
  { title: 'Build', body: 'Your Strategy Day, in person. We analyse your current bottlenecks and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.', img: '/founding/step2-build-l.mp4', alt: 'Sean running a Strategy Day' },
  { title: 'Install', body: 'We start on your exact bottleneck using our CVAQ analysis. Your Strategy Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support to get it cranking.', img: '/founding/train-02a.mp4', alt: 'A training video from the library' },
  { title: 'Transfer and tune', body: 'Your operator runs the system with support. We iron out any kinks, iterate with data, and ensure the team can run it themselves.', img: '/founding/step4-full2.mp4', full: true, alt: 'Sean walking through a format in the Engineroom' },
];

export default function HomeDraft() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO title="Own Your Category" description="The Authority Engine. Helping industry leaders own their category." path="/home-draft" noIndex />

      {/* HERO */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <Eyebrow>Helping industry leaders own their category</Eyebrow>
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto mt-4">Your business has outgrown how content gets made.</h1>
            <p className="text-zinc-600 text-lg md:text-xl leading-relaxed mt-6 max-w-2xl mx-auto">One clear content blueprint, the standards to execute it, and direct support to turn your expertise into short and longform content that builds trust before the sale without directing every decision.</p>
            <div className="mt-9 flex justify-center"><Go /></div>
          </Section>
        </div>
      </section>

      <ClientFaces />

      {/* THE TRUST GAP, dark band */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>The trust gap</Eyebrow>
            {/* Sean, 23 Nov. */}
            <H dark className="mt-4">Your sales team is doing the work your content already should have.</H>
            {/* Sean, 22 Nov, his words. */}
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and unlike most - you're actually legit.</p>
            <p className="text-zinc-400 text-[17px] mt-6">So why is your content still -</p>
          </Section>
          <Section className="max-w-xl mx-auto mt-5">
            <ul className="space-y-3">
              {GAP.map((t) => <li key={t} className="flex items-start gap-3 text-zinc-200 text-[17px] leading-relaxed"><span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />{t}</li>)}
            </ul>
          </Section>

          {/* Your first advisory cycle: the Strategy Day */}
          <Section className="mt-14 md:mt-20 rounded-3xl bg-white text-zinc-900 p-7 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              {/* Sean, 22 Nov: "it's how we start". */}
              <Eyebrow>How we start</Eyebrow>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">The Strategy Day</p>
              <p className="text-zinc-700 text-[17px] leading-relaxed mt-4">We compress your brand, content and revenue strategy into one day.</p>
              <p className="text-zinc-600 text-[17px] mt-5">We map:</p>
              <ul className="mt-4 space-y-2.5">{MAP.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-6">This blueprint is the foundation of both short and longform content for the 90 days of implementation.</p>
            </div>
            {/* Sean, 22 Nov: a hype scroll of real Strategy Day clips (TO CLIP folder, 14 shots of 1.9s, a very slight zoom out on each, 0.25s crossfades (Sean picked crossfade at half the time), AirPlay room levelled, left screen in the pink room frozen to stop the flicker, no desk shots, no looking up shots, 23s, silent loop). */}
            <div>
              <video src="/founding/sd-reel7.mp4" poster="/founding/sd-reel7.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Clips from Strategy Days" className="w-full aspect-video object-cover rounded-2xl bg-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]" />
              {/* Sean, 23 Nov: button under the tile, inside the card. */}
              <div className="mt-8 flex justify-center"><Go /></div>
            </div>
          </Section>
          {/* Sean, 23 Nov, his words, above By day 90. */}
          <Section className="max-w-xl mx-auto text-center mt-20 md:mt-28">
            <H dark>Content should do more than get attention.</H>
            <p className="text-zinc-400 text-[17px] mt-6">It should help the right people:</p>
          </Section>
          <Section className="max-w-xl mx-auto mt-5">
            <ul className="space-y-3">
              {['Recognise the problem they actually have', 'Understand why common solutions fail', 'See why your approach is different', 'Trust your brand, your expertise and unique method before the sale', 'Arrive presold and ready to buy', 'Know what to do next'].map((t) => <Tick key={t} dark>{t}</Tick>)}
            </ul>
            <p className="text-white text-lg font-semibold leading-relaxed mt-8 text-center">All you need is one clear path from stranger to buyer.</p>
          </Section>
        </div>
      </section>

      {/* THE FOUR JOBS, his formats map */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FormatsMap />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>How the first 90 days works</H>
          </Section>
          <div className="mt-12 md:mt-16 space-y-12 md:space-y-20">
            {STEPS.map((s, i) => (
              <Section key={s.title} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <p aria-hidden="true" className="font-display text-[72px] md:text-[96px] font-extrabold leading-none tracking-[-0.05em] text-[#3B7DFF]/15 select-none">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">{s.title}</h3>
                  <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">{s.body}</p>
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <Media src={s.img} alt={s.alt} className={`w-full aspect-video rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ${'full' in s ? 'object-contain bg-[#0d0f14]' : 'object-cover object-top'}`} />
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* SEAN */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-14 items-center">
            <img src="/founding/sean.jpg" alt="Sean on set, mid explanation" width={440} height={550} loading="lazy" className="w-full max-w-[260px] md:max-w-none mx-auto aspect-[4/5] object-cover rounded-2xl" />
            <div className="text-center md:text-left">
              <Eyebrow>Who you'll be working with</Eyebrow>
              <H className="mt-3">Sean Fox</H>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-5">I cut my teeth door knocking as a 17 year old kid trying to sell my art to businesses.</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">Then spent the next 10 years transitioning from photographer, to videographer, creative director, strategist and advisor, now for the past 3 years I've been behind the scenes with 8 figure B2B founders doing $1M+/month, creating content that consistently drives revenue.</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">We work with the top 1% as an accelerant where our sole job is to get them seen by the right people to expand impact, and increase their commercial output.</p>
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-4">Here's my take: Business is a vehicle for impact, content is the engine that drives it, and revenue is the fuel.</p>
            </div>
          </Section>
        </div>
      </section>

      {/* FIT */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>This is for you if...</H>
            <p className="text-zinc-600 text-lg mt-4">For founders who speed up when the market slows down.</p>
          </Section>
          <Section className="grid md:grid-cols-2 gap-4 mt-10">
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
              <p className="font-display text-xl font-extrabold">For you</p>
              <ul className="mt-4 space-y-3">
                {['You already do $200K/month or more', 'You have a proven offer and real expertise', 'You already create some content', 'You have an operator or team member to train', 'You want the team running content without you managing every every post'].map((t) => <Tick key={t}>{t}</Tick>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
              <p className="font-display text-xl font-extrabold">This isn't for you if...</p>
              <ul className="mt-4 space-y-3">
                {['You want a done for you content agency', 'You are starting from zero', 'Your team will not attend, implement or share data honestly'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-zinc-600 text-[16px] leading-relaxed"><X className="w-4 h-4 mt-1 shrink-0 text-zinc-400" strokeWidth={3} />{t}</li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      {/* What this is not. Sean's /offer copy, 23 Nov. */}
      <section className="py-16 md:py-24 border-t border-zinc-200/70">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em]">What this is not</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] mt-4">Boundaries.</h2>
            <p className="text-zinc-600 text-[17px] mt-6">For clarity on both sides. This is not:</p>
          </Section>
          <Section className="mt-8 rounded-3xl bg-white ring-1 ring-zinc-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] p-6 md:p-9">
            <ul className="divide-y divide-zinc-100">
              {[
                ['A done for you content agency.', 'Your team films, edits and posts. I design the strategy, train your operator, and read the data with your team.'],
                ['Full time CMO or creative director services.', 'I show up for the cadence we agree, not to manage your entire media team.'],
                ['A guarantee of revenue.', 'We agree the metrics, test, and the data tells us what worked.'],
                ['A content factory.', 'I do not write or edit every script. Your team produces.'],
                /* Sean, 25 Nov. */
                ['A forever contract.', 'At Day 90 we both choose whether to continue with advisory.'],
              ].map(([h, b]) => (
                <li key={h} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  <p className="text-[17px] leading-relaxed text-zinc-600"><span className="text-zinc-900 font-semibold">{h}</span> {b}</p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      {/* FAQ, dark */}
      <section className="bg-[#0B0D12] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section>
            <H dark>What founders ask before they buy.</H>
            <FoundingFaq hide={['Do we need more reach first?']} />
          </Section>
        </div>
      </section>

      <TrustedBy />

      {/* CLOSE */}
      <section className="relative overflow-hidden bg-[#0B0D12] text-white py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">The Authority Engine</h2>
            <div className="mt-10 flex justify-center"><Go dark /></div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
