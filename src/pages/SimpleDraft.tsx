import { CalendarDays, Check, CreditCard, FolderOpen, GraduationCap, MessageCircle, Repeat, ShieldCheck, Users, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FoundingFaq from '../components/founding/FoundingFaq';
import FitCall from '../components/founding/FitCall';
import VslPlayer from '../components/founding/VslPlayer';
import StartTodayShowcase, { Window } from '../components/founding/StartTodayShowcase';
import { BuyButton, Paid, Section, StickyBar, useStatus } from './Founding';
import { usePageVisits } from '../lib/pageVisits';

/*
  /open. Hidden from Google.
  22 Nov: ecommerceequation.com.au layout (light page, dark bands, alternating
  steps, member grid, blue close band).
  22 Nov, Sean picked "/open only" and "Pay on the page" for the pasted review
  "Adapt this page. Do not rebuild it": the /founding structure with a new
  frame. Review wording, Australian spelling, no hyphens. Buttons pay on
  Stripe, never apply.
  Earlier versions in git: founding intake 607bc95, access headline 937d7a5.
*/

/* Looping silent clip, or a still. */
const Media = ({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) =>
  src.endsWith('.mp4') ? (
    <video src={src} poster={src.replace('.mp4', '.jpg')} autoPlay muted loop playsInline preload="metadata" aria-label={alt} className={className} />
  ) : (
    <img src={src} alt={alt} loading="lazy" className={className} />
  );

const BLUE = '[&_button]:!bg-[#3B7DFF] [&_button]:!text-white [&_button]:!shadow-none [&_button:hover]:!bg-[#2f6be6]';
/* One CTA label everywhere, same as the top bar and sticky bar (review notes, 22 Nov). */
const CTA = 'Secure your January place';

const STEPS = [
  {
    tag: 'Today', title: 'Secure your place',
    body: ['Secure your place now to get your Strategy Day included in the price.'],
    img: '/founding/ce-portal.mp4', alt: 'A new client going through the contentengine.live portal: welcome video, Home, adding the calls to their calendar, the toolkit',
  },
  {
    tag: 'Before week 1', title: 'Build',
    body: ['Your Strategy Day, in person. We analyse your current bottlenecks and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.'],
    img: '/founding/step2-build-l.mp4', alt: 'Sean running a Strategy Day',
  },
  {
    tag: 'Weeks 1 to 4', title: 'Install',
    /* Sean, 22 Nov: about the exact bottleneck, never short form or long form. "we do what's necessary". */
    body: ["We start on your exact bottleneck and do what's necessary. Your Strategy Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support to get it cranking."],
    img: '/founding/train-02a.mp4', alt: 'A training video from the library',
  },
  {
    tag: 'Weeks 5 to 12', title: 'Transfer and tune',
    body: ['Your operator runs the system with support. We iron out any kinks, iterate with data, and ensure the team can run it themselves.'],
    img: '/founding/step4-full2.mp4', full: true, alt: 'Sean walking through a format in the Engineroom',
  },
];

const NOW = ['The Engineroom', 'SOP library', 'Training library', 'Playbooks', 'Thursday office hours', 'WhatsApp setup'];

const NEXT = [
  [CreditCard, 'Secure your place on the Stripe checkout.'],
  [MessageCircle, 'We set up your WhatsApp straight away, with direct access to me.'],
  [FolderOpen, 'Receive the Start Here workspace and pre install materials.'],
  [CalendarDays, 'Book your Strategy Day.'],
  [GraduationCap, 'Your team gets access to the training and systems.'],
  [Users, '1:1 guided implementation starts in the next available intake month, beginning January.'],
  [Repeat, 'Your first live content cycle runs once implementation starts.'],
] as const;

// Sean, 23 Nov: what they get, in his pasted words.
const GROUPS = [
  { name: 'Access', colour: '#3B7DFF', img: '/founding/sd-access2.mp4', sub: 'The right people', line: 'Get direct access to Sean, trusted specialists, and serious founders when your team needs help beyond its current capability.', items: ['Direct access to Sean', 'Curated specialist introductions', 'Private founder network', 'Help with hiring and partnerships'] },
  { name: 'Training', colour: '#8B7CFF', img: '/founding/train-02b.mp4', sub: 'A better team', line: 'Give your team the standards, tools, and feedback to produce better media without waiting for you.', items: ['Every SOP, every training video, all playbooks, straight away', 'Training every fortnight', 'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8', 'The whole team gets access'] },
  { name: 'Advisory', colour: '#14B8A6', img: '/founding/ocs-advisory-full.mp4', sub: 'Senior judgment', line: 'Get clear direction on what to make, what to fix, and what to do next.', items: ['A Strategy Day with you and your team', 'Two Loom reviews per week during active implementation', 'Monthly content advisory board meetings', 'Advisory group office hours, every Thursday', 'Prescriptive advice directly through the portal', 'WhatsApp support, 24 hour replies'] },
];

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

/* Sean, 22 Nov: "swap the pages". live = /founding. Stripe returns to /founding?paid=1,
   personal links (?for= or ?c=) post visits to Slack, buttons report as founding-* for GA. */
/* DRAFT (Sean, 23 Nov): the simplification angle. Not linked, not indexed. Live /founding is OpenPage. */
export default function SimpleDraft({ live = false }: { live?: boolean }) {
  const paid = live && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const personal = live && typeof window !== 'undefined' && /[?&](for|c)=/.test(window.location.search);
  usePageVisits('/founding', '90 Day Install', personal && !paid);
  const status = useStatus();
  const feb = status?.intake === 'february';
  const loc = live ? 'founding' : 'draft';

  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      {live ? (
        <SEO title="90 Day Install" description="The Authority Engine. Private media growth advisory for industry leading founders. Our 90 day install. January 2027, 5 founding places. $10,000 AUD + GST, closes 30 November." path="/founding" image="https://authorityengine.com.au/og-founding-v3.jpg" />
      ) : (
        <SEO title="The Authority Engine" description="Private media growth advisory for industry leading founders. Five founding places." path="/founding-draft" image="https://authorityengine.com.au/og-founding-v3.jpg" noIndex />
      )}

      {/* HERO */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            {/* Sean, 22 Nov: no eyebrow, no button and no walkthrough line above the fold. */}
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto">Your business has outgrown how content gets made.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-6">It's just leverage: same work, better result.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-3">Under 5 hours a week if you want to.</p>
            <div className="mt-10 text-left">
              <VslPlayer src="/founding/vsl-final-v2-hd.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-loop.mp4" loopPoster="/founding/vsl-loop.jpg" length="7:35" title="Open VSL" />
            </div>
            <p className="text-zinc-700 text-[16px] mt-5">Watch the 7 minute walkthrough to see what your team installs over 90 days.</p>
            <p className="text-zinc-500 text-[15px] mt-1">Rather read it? The page below covers everything in the video.</p>
          </Section>
        </div>
      </section>

      {/* WHY NOT, the three fears (Sean, 23 Nov, his words) */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <H dark>Why are you not doing it?</H>
          </Section>
          <Section className="mt-10 space-y-4">
            {["You think it's going to be lots of work.", "You think it's going to be hard.", "You think it's going to affect your brand."].map((t) => (
              <p key={t} className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-6 py-5 text-zinc-300 text-lg md:text-xl">{t}</p>
            ))}
          </Section>
          <Section className="mt-12">
            <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-tight">We have everything that you need, so it is as simple as hell.</p>
          </Section>
        </div>
      </section>

      {/* THREE THINGS (Sean, 23 Nov: "Here's the blueprint. Here are the levers to pull. This is what to do.") */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em]">How the first 90 days works</p>
            <H className="mt-4">We make it so simple.</H>
          </Section>
          <div className="mt-12 md:mt-16 space-y-12 md:space-y-20">
            {[
              { title: "Here's the blueprint.", tag: 'Your Strategy Day', body: 'We compress your brand, content and revenue strategy into one day.', list: MAP, img: '/founding/sd-reel7.mp4' },
              { title: 'Here are the levers to pull.', tag: 'The Engineroom', body: 'Every SOP, every training video, all playbooks, straight away.', list: NOW, img: '/founding/ce-portal.mp4', win: true },
              { title: 'This is what to do.', tag: '1:1 implementation', body: 'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8.', list: [] as string[], img: '/founding/train-02a.mp4' },
            ].map((s, i) => (
              <Section key={s.title} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <p aria-hidden="true" className="font-display text-[72px] md:text-[96px] font-extrabold leading-none tracking-[-0.05em] text-[#3B7DFF]/15 select-none">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em] mt-2">{s.tag}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">{s.title}</h3>
                  <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">{s.body}</p>
                  {s.list.length > 0 && <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">{s.list.map((t) => <Tick key={t}>{t}</Tick>)}</ul>}
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  {s.win ? (
                    <Window title="contentengine.live"><Media src={s.img} className="w-full aspect-video object-cover object-top" /></Window>
                  ) : (
                    <Media src={s.img} className="w-full aspect-video rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]" />
                  )}
                </div>
              </Section>
            ))}
          </div>
          <div className="mt-14 flex justify-center"><BuyButton jump status={status} location={`${loc}-steps`} label={CTA} hideSpots className={BLUE} /></div>
        </div>
      </section>

      {/* THE RELIEF (Sean, 23 Nov, his words) */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H dark>You're going to get more for what you put in.</H>
          </Section>
          <Section className="mt-10 rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6 md:p-9">
            <ul className="space-y-4">
              {["It's just leverage: same work, better result.", "Removing all of the guesswork, so you don't need to be the content manager.", 'The team builds its own capacity and capability.', 'Under 5 hours a week if you want to.'].map((t) => <Tick key={t} dark>{t}</Tick>)}
            </ul>
          </Section>
          <div className="mt-10 flex justify-center"><BuyButton jump status={status} location={`${loc}-relief`} label={CTA} hideSpots className={BLUE} /></div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>What you get</H>
          </Section>
          {/* Sean, 22 Nov: bottoms line up. Access and Training side by side, Advisory full width underneath (video left, list right). */}
          <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-5xl mx-auto">
            {GROUPS.map((g, i) => (
              <Section key={g.name} className={`${i === 2 ? 'md:col-span-2 md:flex-row' : ''} group rounded-3xl bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/70 flex flex-col`}>
                <div className={`relative overflow-hidden ${i === 2 ? 'bg-[#0a0a0c]' : 'bg-[#0d0f14]'} ${i === 2 ? 'aspect-video md:w-1/2 md:shrink-0 md:aspect-auto md:min-h-[320px]' : 'aspect-video'}`}>
                  <Media src={g.img} className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${i === 2 ? 'object-contain' : 'object-cover'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-white text-[12px] font-semibold tracking-widest">{`0${i + 1}`}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="h-1 w-10 rounded-full mb-3" style={{ background: g.colour }} />
                    <p className="font-display text-3xl font-extrabold text-white tracking-[-0.02em]">{g.name}</p>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: g.colour }}>{g.sub}</p>
                  <p className="text-zinc-900 text-[17px] font-semibold leading-snug mt-2">{g.line}</p>
                  <ul className="mt-5 divide-y divide-zinc-100 border-t border-zinc-100">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-start gap-3 py-3 text-zinc-600 text-[15px] leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${g.colour}1f` }}>
                          <Check className="w-3 h-3" style={{ color: g.colour }} strokeWidth={3.5} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            ))}
          </div>
          <div className="mt-10 md:mt-12 flex justify-center"><BuyButton jump status={status} location={`${loc}-get`} label={CTA} hideSpots className={BLUE} /></div>
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

      {/* PRICE */}
      <section id="price" className="pb-16 md:pb-28 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          {/* Sean, 23 Nov, his words. */}
          {!feb && <Section className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-zinc-600 text-[18px] leading-relaxed">This is the founding intake. The system is being built with the first five members, which means the engagement is more direct and more customised than the future version.</p>
          </Section>}
          <Section className="rounded-3xl bg-white border-2 border-[#3B7DFF] p-7 md:p-12 text-center shadow-[0_30px_80px_-40px_rgba(59,125,255,0.6)]">
            {/* Sean, 22 Nov: "i think we still need this", his /founding price box. */}
            <p className="text-zinc-900 text-[17px] font-semibold">{feb ? 'February intake, paid in full' : 'Founding 5, paid in full by 30 November'}</p>
            <p className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] mt-3 whitespace-nowrap">{feb ? '$15,000' : '$10,000'} <span className="text-zinc-400 text-[0.3em] font-semibold tracking-normal">AUD + GST</span></p>
            {!feb && <p className="text-zinc-500 text-[16px] leading-relaxed mt-4">Once 5 are sold, price increases to <span className="text-zinc-900 font-semibold">$15,000 + GST</span> for February.</p>}
            <p className="text-zinc-500 text-[16px] mt-2">1:1 guided implementation starts in the next available intake month, beginning January.</p>
            <div className="flex justify-center">
              <BuyButton status={status} location={`${loc}-price`} label={CTA} hideSpots className={`mt-7 ${BLUE}`} />
            </div>
            <div className="max-w-md mx-auto text-center [&>div]:mt-5 [&>div]:pt-0 [&>div]:border-0 [&_p]:text-zinc-900 [&_button]:mx-auto [&_button]:text-[#3B7DFF] [&_button:hover]:text-[#2563eb]"><FitCall /></div>
          </Section>
          <Section className="mt-8 flex gap-4 max-w-2xl mx-auto">
            <ShieldCheck className="w-6 h-6 shrink-0 text-[#3B7DFF] mt-0.5" strokeWidth={1.75} />
            <div>
              {/* His /founding guarantee. "The risk sits with me." swapped for a plain label (Sean, 22 Nov: iterate the slop). */}
              <p className="text-zinc-900 text-lg font-semibold">Guarantee</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-1">If you do not have a consistent rhythm of content going out by day 90, we'll continue working with you until you do.</p>
              <p className="text-zinc-400 text-[14px] leading-relaxed mt-3">To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantee covers installation, not revenue.</p>
            </div>
          </Section>
          <Section className="mt-6 max-w-2xl mx-auto">
            <p className="text-zinc-600 text-[17px] leading-relaxed">The support is there to install the system so your team stops needing me.</p>
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

      {/* CLOSE. Sean, 22 Nov: "how it is in the /founding design". Dark with the soft blue glow. Fit call straight under the button. */}
      <section className="relative overflow-hidden bg-[#0B0D12] text-white py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">The Authority Engine</h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-200 leading-[1.15] mt-4">Turn your content team into a sales asset.</p>
            <div className="flex justify-center">
              <BuyButton jump status={status} location={`${loc}-close`} label={CTA} className="mt-10" />
            </div>
            <div className="max-w-md mx-auto text-center [&>div]:mt-5 [&>div]:pt-0 [&>div]:border-0 [&_button]:mx-auto"><FitCall /></div>
          </Section>
        </div>
      </section>

      <StickyBar jump status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
