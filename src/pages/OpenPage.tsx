import { Check, ShieldCheck, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import StartTodayShowcase, { Window } from '../components/founding/StartTodayShowcase';
import { BuyButton, Section, StickyBar, useStatus } from './Founding';

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
    body: ['Secure your place now to get your Strategy Day included in the price.', "Plus immediate access to group advisory calls, training, playbooks, and all SOP's."],
    img: '/founding/step1-portal.mp4', alt: 'The Engineroom portal your team gets today',
  },
  {
    tag: 'Before week 1', title: 'Build',
    body: ['Your Strategy Day, in person. We analyse your current bottlenecks and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.'],
    img: '/founding/step2-build.mp4', alt: 'Sean running a Strategy Day',
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
    img: '/founding/step4-ocs.mp4', alt: 'Sean walking through a format in the Engineroom',
  },
];

const NOW = ['Start Here workspace', 'SOP library', 'Training library', 'Playbooks', 'Thursday office hours', 'WhatsApp setup', 'Strategy Day scheduling'];

const GROUPS = [
  { name: 'Access', colour: '#3B7DFF', img: '/founding/sd-access2.mp4', line: 'Sean, relevant specialists and the founder network.', items: ['Direct access to Sean', 'Relevant specialists', 'The founder network'] },
  { name: 'Training', colour: '#8B7CFF', img: '/founding/train-02b.mp4', line: 'SOPs, playbooks and team training.', items: [
    'Every SOP, every training video, all playbooks, straight away',
    'Training every fortnight',
    'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
  ] },
  { name: 'Advisory', colour: '#14B8A6', img: '/founding/ocs-advisory.mp4', line: 'Strategy Day, reviews, calls, Looms and WhatsApp.', items: [
    'A Strategy Day with you and your team',
    'Two Loom reviews per week during active implementation',
    'Advisory group office hours, every Thursday',
    'Monthly content advisory board meetings',
    'Prescriptive advice directly through the portal',
    'WhatsApp support, 24 hour replies',
  ] },
];

/* Sean, 22 Nov: "use this same language", his /founding trust gap and Strategy Day copy, word for word. */
const GAP = [
  "Getting attention that doesn't convert to sales",
  "Teaching killer ideas that don't connect with your sales process",
  'Produced by a team that still needs you to decide what to say',
  'Reaching people interested but unlikely to buy',
  'Sending people into calls where they have to explain everything from scratch',
];
const MAP = ['Your positioning', 'Your ideal buyer', 'What they need to believe before buying', 'Why common solutions fail', 'What makes your approach different', 'The content required to move someone from stranger to advocate'];
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

/* 22 Nov, "make this 10x better": solid circles in the card colours, overlaps blend, the engine at the centre. */
function Venn() {
  const C = [
    { g: GROUPS[0], cx: 225, cy: 210, lx: 160, ly: 170 },
    { g: GROUPS[1], cx: 375, cy: 210, lx: 440, ly: 170 },
    { g: GROUPS[2], cx: 300, cy: 340, lx: 300, ly: 440 },
  ];
  return (
    <svg viewBox="40 30 520 490" className="w-full max-w-[460px] h-auto mx-auto drop-shadow-[0_30px_60px_rgba(59,125,255,0.25)]" role="img" aria-label="Access, Training and Advisory overlap. The Authority Engine.">
      <defs>
        {C.map((c) => (
          <radialGradient key={c.g.name} id={`v-${c.g.name}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={c.g.colour} stopOpacity="0.95" />
            <stop offset="100%" stopColor={c.g.colour} stopOpacity="0.75" />
          </radialGradient>
        ))}
      </defs>
      <g style={{ isolation: 'isolate' }}>
        {C.map((c) => <circle key={c.g.name} cx={c.cx} cy={c.cy} r={165} fill={`url(#v-${c.g.name})`} style={{ mixBlendMode: 'multiply' }} />)}
      </g>
      {C.map((c) => <text key={c.g.name + 't'} x={c.lx} y={c.ly} textAnchor="middle" fill="#fff" fontSize="23" fontWeight="800" letterSpacing="3" className="font-display">{c.g.name.toUpperCase()}</text>)}
      <circle cx="300" cy="255" r="58" fill="#0B0D12" />
      <text x="300" y="250" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" className="font-display">The Authority</text>
      <text x="300" y="272" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" className="font-display">Engine</text>
    </svg>
  );
}

export default function OpenPage() {
  const status = useStatus();
  const feb = status?.intake === 'february';
  const loc = 'open';

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO title="The Authority Engine" description="Private media growth advisory for industry leading founders. Five founding places." path="/open" image="https://authorityengine.com.au/og-founding-v3.jpg" noIndex />

      {/* HERO */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            {/* Sean, 22 Nov: no eyebrow, no button and no walkthrough line above the fold. */}
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto">Private media growth advisory for industry leading founders.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-5">Build the media function behind your next stage of growth.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">We help you turn your expertise, point of view, and proof into media your team can plan, produce, review, and improve without you directing every decision.</p>
            <div className="mt-10 text-left">
              <VslPlayer src="/founding/vsl-final-v2-hd.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-final-v2-loop.mp4" loopPoster="/founding/vsl-final-v2-loop.jpg" length="7:35" title="Open VSL" />
            </div>
            <p className="text-zinc-500 text-[15px] mt-4">Rather read it? The page below covers everything in the video.</p>
          </Section>
        </div>
      </section>

      {/* THE TRUST GAP, dark band */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>The trust gap</Eyebrow>
            <H dark className="mt-4">Your business has outgrown the way its media gets made.</H>
            {/* Sean, 22 Nov, his words. */}
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and unlike most, you're actually legit.</p>
            <p className="text-zinc-400 text-[17px] mt-6">But your content is still:</p>
          </Section>
          <Section className="max-w-xl mx-auto mt-5">
            <ul className="space-y-3">
              {GAP.map((t) => <li key={t} className="flex items-start gap-3 text-zinc-200 text-[17px] leading-relaxed"><X className="w-4 h-4 mt-1.5 shrink-0 text-zinc-500" />{t}</li>)}
            </ul>
          </Section>
          <Section className="text-center mt-10 space-y-1 text-lg md:text-xl">
            <p className="text-zinc-400">Problem is -</p>
            <p>You have the authority.</p>
            <p>Your content just doesn't communicate it.</p>
          </Section>

          {/* Your first advisory cycle: the Strategy Day */}
          <Section className="mt-14 md:mt-20 rounded-3xl bg-white text-zinc-900 p-7 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              {/* Sean, 22 Nov: "use your first 90 days". */}
              <Eyebrow>Your first 90 days</Eyebrow>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">The Strategy Day</p>
              <p className="text-zinc-700 text-[17px] leading-relaxed mt-4">We compress your brand, content and revenue strategy into one day.</p>
              <p className="text-zinc-600 text-[17px] mt-5">We map:</p>
              <ul className="mt-4 space-y-2.5">{MAP.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-6">That blueprint becomes the foundation for the 90 day implementation.</p>
            </div>
            {/* Sean, 22 Nov: a hype scroll of real Strategy Day clips (TO CLIP folder, 12 shots, no zoom, no desk shots, 0.6s crossfades, no jump cut inside any shot, whiteboard clip deflickered, 27s, silent loop). */}
            <video src="/founding/sd-reel4.mp4" poster="/founding/sd-reel4.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Clips from Strategy Days" className="w-full aspect-video object-cover rounded-2xl bg-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]" />
          </Section>
        </div>
      </section>

      {/* HOW THE FIRST 90 DAYS WORKS, alternating steps */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>How the first 90 days works</H>
          </Section>
          <div className="mt-12 md:mt-16 space-y-12 md:space-y-20">
            {STEPS.map((s, i) => (
              <Section key={s.title} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={`border-l-2 border-[#3B7DFF]/40 pl-6 ${i % 2 ? 'md:order-2' : ''}`}>
                  <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em]">Step {i + 1} | {s.tag}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">{s.title}</h3>
                  {s.body.map((b) => <p key={b} className="text-zinc-600 text-[17px] leading-relaxed mt-4">{b}</p>)}
                  {i === 0 && (
                    <>
                      {/* Sean, 22 Nov: straight under Secure your place, everything they get immediately. List from the review notes. */}
                      <p className="text-zinc-900 text-[17px] font-semibold mt-6">Get immediate access to:</p>
                      <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">{NOW.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
                    </>
                  )}
                  {i === 0 && <BuyButton jump status={status} location={`${loc}-step`} label={CTA} hideSpots className={`mt-6 ${BLUE}`} />}
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  {i === 0 ? (
                    <Window title="contentengine.live">
                      <Media src={s.img} alt={s.alt} className="w-full aspect-video object-cover object-top" />
                    </Window>
                  ) : (
                    <Media src={s.img} alt={s.alt} className="w-full aspect-video object-cover object-top rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]" />
                  )}
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS TODAY, the /founding video showcase (Sean, 22 Nov: keep the core visuals of the vids). His /founding copy. */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <Section className="max-w-3xl">
            {/* Review notes, 22 Nov: one clear message, join now, implementation in January. */}
            <Eyebrow dark>Access today</Eyebrow>
            <H dark className="mt-4">Join now. Begin implementation in January.</H>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">Your guided implementation begins in January 2027.</p>
          </Section>
          <StartTodayShowcase />
        </div>
      </section>

      {/* BY DAY 90 */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>By day 90</Eyebrow>
            <H dark className="mt-4">By day 90, your team can answer these.</H>
          </Section>
          <Section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {QUESTIONS.map((q, i) => (
              <div key={q} className="rounded-2xl bg-white text-zinc-900 p-5">
                <p className="font-display text-sm font-extrabold text-[#3B7DFF]">{`0${i + 1}`}</p>
                <p className="font-semibold text-[16px] leading-snug mt-2">{q}</p>
              </div>
            ))}
          </Section>
          <Section className="text-center max-w-2xl mx-auto mt-10">
            <p className="text-zinc-400 text-[17px] leading-relaxed">A working operating system your team uses to plan, produce, judge, publish and improve content.</p>
          </Section>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>What you get</H>
            <div className="mt-10"><Venn /></div>
          </Section>
          <div className="grid md:grid-cols-3 gap-5 mt-14 md:items-start">
            {GROUPS.map((g, i) => (
              <Section key={g.name} className="group rounded-3xl bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/70 flex flex-col">
                <div className="relative h-52 md:h-56 overflow-hidden">
                  <Media src={g.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-white text-[12px] font-semibold tracking-widest">{`0${i + 1}`}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="h-1 w-10 rounded-full mb-3" style={{ background: g.colour }} />
                    <p className="font-display text-3xl font-extrabold text-white tracking-[-0.02em]">{g.name}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-zinc-900 text-[17px] font-semibold leading-snug">{g.line}</p>
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
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-4">Business is a vehicle for impact, content is the engine that drives it, and revenue is the fuel.</p>
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
          <Section className="rounded-3xl bg-white border-2 border-[#3B7DFF] p-7 md:p-12 text-center shadow-[0_30px_80px_-40px_rgba(59,125,255,0.6)]">
            <Eyebrow>{feb ? 'February 2027 intake' : 'Five founding places'}</Eyebrow>
            <p className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] mt-4 whitespace-nowrap">{feb ? '$15,000' : '$10,000'} <span className="text-zinc-400 text-[0.3em] font-semibold tracking-normal">AUD + GST</span></p>
            {feb ? (
              <p className="text-zinc-600 text-[16px] mt-4">Paid in full.</p>
            ) : (
              <>
                <p className="text-zinc-900 text-[17px] font-semibold mt-4">Paid in full by 30 November 2026.</p>
                <p className="text-zinc-500 text-[16px] mt-2">Founding members join at $10,000. Pricing increases after the founding intake.</p>
              </>
            )}
            <p className="text-zinc-500 text-[16px] mt-2">1:1 guided implementation starts in the next available intake month, beginning January.</p>
            <div className="flex justify-center">
              <BuyButton status={status} location={`${loc}-price`} label={CTA} hideSpots className={`mt-7 ${BLUE}`} />
            </div>
          </Section>
          <Section className="mt-8 flex gap-4 max-w-2xl mx-auto">
            <ShieldCheck className="w-6 h-6 shrink-0 text-[#3B7DFF] mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-zinc-900 text-lg font-semibold">Implementation guarantee</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-1">If your team completes the agreed work and you have not established a consistent media operating rhythm by day 90, we continue supporting implementation at no additional cost until it is established.</p>
              <p className="text-zinc-400 text-[14px] leading-relaxed mt-3">The guarantee covers implementation, not revenue.</p>
            </div>
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

      {/* CLOSE, blue band */}
      <section className="bg-[#1f4fd1] text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <p className="text-white/70 text-[13px] font-semibold uppercase tracking-[0.18em]">The Authority Engine</p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.04] mt-4">Build the media function behind your next stage of growth.</h2>
            <div className="flex justify-center">
              <BuyButton jump status={status} location={`${loc}-close`} label={CTA} hideSpots className="mt-9" />
            </div>
          </Section>
        </div>
      </section>

      <StickyBar jump status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
