import { Check, ShieldCheck, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
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

const BLUE = '[&_button]:!bg-[#3B7DFF] [&_button]:!text-white [&_button]:!shadow-none [&_button:hover]:!bg-[#2f6be6]';
const CTA = 'Secure your January 2027 founding place';

const STEPS = [
  {
    tag: 'Today', title: 'Secure your place',
    body: ['Secure your place now to get your Strategy Day included in the price.', "Plus immediate access to group advisory calls, training, playbooks, and all SOP's."],
    img: '/founding/live.jpg', alt: 'Sean mid explanation',
  },
  {
    tag: 'Before week 1', title: 'Build',
    body: ['Your Strategy Day, in person. We analyse your current bottlenecks and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.'],
    img: '/founding/receive/brand-cover.jpg', alt: 'The Brand section of the Strategy Day output',
  },
  {
    tag: 'Weeks 1 to 4', title: 'Install',
    body: ['We launch your content starting with short form. Your Strategy Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support to get it cranking.'],
    img: '/founding/train-02a.jpg', alt: 'Sean teaching at the desk',
  },
  {
    tag: 'Weeks 5 to 12', title: 'Transfer and tune',
    body: ['Your operator runs the system with support. When short form is calibrated and ready, we dial in long form. We iron out any kinks, iterate with data, and ensure the team can run it themselves.'],
    img: '/founding/receive/kpi.jpg', alt: 'The 4 Numbers dashboard',
  },
];

const GROUPS = [
  { name: 'Access', img: '/founding/train-16a.jpg', items: ['Direct access to Sean', 'Relevant specialists', 'The founder network'] },
  { name: 'Training', img: '/founding/receive/hooks-cover.jpg', items: [
    'Every SOP, every training video, all playbooks, straight away',
    'Training every fortnight',
    'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
  ] },
  { name: 'Advisory', img: '/founding/train-13.jpg', items: [
    'A Strategy Day with you and your team',
    'Two Loom reviews per week during active implementation',
    'Advisory group office hours, every Thursday',
    'Monthly content advisory board meetings',
    'Prescriptive advice directly through the portal',
    'WhatsApp support, 24 hour replies',
  ] },
];

const GAP = [
  'Your team still needs the founder to decide what to say',
  'Great ideas are produced once, then disappear',
  'Content lacks a consistent point of view',
  'Different people create different standards',
  'Nobody knows what to improve next',
  'The media function is not compounding',
];
const ESTABLISHES = ['Brand and positioning', 'Audience and point of view', 'Media priorities', 'Team responsibilities', 'Content standards', 'The first implementation priorities'];
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

function Venn() {
  const C = [
    { cx: 222, cy: 205, label: 'ACCESS', lx: 150, ly: 150 },
    { cx: 378, cy: 205, label: 'TRAINING', lx: 450, ly: 150 },
    { cx: 300, cy: 340, label: 'ADVISORY', lx: 300, ly: 455 },
  ];
  return (
    <svg viewBox="0 35 600 475" className="w-full max-w-[440px] h-auto mx-auto" role="img" aria-label="Access, Training and Advisory overlap. The Authority Engine.">
      {C.map((c) => <circle key={c.label} cx={c.cx} cy={c.cy} r={160} fill="#3B7DFF" fillOpacity="0.07" stroke="#3B7DFF" strokeOpacity="0.55" strokeWidth="1.5" />)}
      {C.map((c) => <text key={c.label + 't'} x={c.lx} y={c.ly} textAnchor="middle" fill="#3B7DFF" fontSize="24" fontWeight="700" letterSpacing="3" className="font-display">{c.label}</text>)}
      <text x="300" y="242" textAnchor="middle" fill="#18181b" fontSize="26" fontWeight="800" className="font-display">The Authority</text>
      <text x="300" y="274" textAnchor="middle" fill="#18181b" fontSize="26" fontWeight="800" className="font-display">Engine</text>
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
            <Eyebrow>The Authority Engine</Eyebrow>
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 mt-5 max-w-4xl mx-auto">Private media growth advisory for industry leading founders.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-5">Build the media function behind your next stage of growth.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">We help you turn your expertise, point of view, and proof into media your team can plan, produce, review, and improve without you directing every decision.</p>
            <div className="flex justify-center mt-8">
              <BuyButton jump status={status} location={`${loc}-hero`} label={CTA} hideSpots className={BLUE} />
            </div>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-12 max-w-2xl mx-auto">Watch the 7 minute walkthrough to see how we help industry leading founders build a stronger media function across brand, content, and systems.</p>
            <div className="mt-5 text-left">
              <VslPlayer src="/founding/vsl-final-v2-cc4.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-final-v2-loop.mp4" loopPoster="/founding/vsl-final-v2-loop.jpg" length="7:35" title="Open VSL" />
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
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and you have legit proof on your side.</p>
          </Section>
          <Section className="max-w-xl mx-auto mt-8">
            <ul className="space-y-3">
              {GAP.map((t) => <li key={t} className="flex items-start gap-3 text-zinc-200 text-[17px] leading-relaxed"><X className="w-4 h-4 mt-1.5 shrink-0 text-zinc-500" />{t}</li>)}
            </ul>
          </Section>
          <Section className="text-center mt-10 text-lg md:text-xl font-semibold">
            <p>You have the expertise. Your media function has not caught up to it.</p>
          </Section>

          {/* Your first advisory cycle: the Strategy Day */}
          <Section className="mt-14 md:mt-20 rounded-3xl bg-white text-zinc-900 p-7 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Eyebrow>Step one</Eyebrow>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">Your first advisory cycle</p>
              <p className="text-zinc-600 text-[17px] mt-4">The Strategy Day establishes:</p>
              <ul className="mt-4 space-y-2.5">{ESTABLISHES.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-6">The exact work is shaped around your business. We do not force every founder through the same content plan.</p>
            </div>
            <img src="/founding/receive/brand-walkout.jpg" alt="What You Walk Out With, the Strategy Day output" loading="lazy" className="w-full aspect-video object-cover object-top rounded-2xl border border-zinc-200" />
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
                  {i === 0 && <BuyButton jump status={status} location={`${loc}-step`} label={CTA} hideSpots className={`mt-6 ${BLUE}`} />}
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <img src={s.img} alt={s.alt} loading="lazy" className="w-full aspect-video object-cover object-top rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]" />
                </div>
              </Section>
            ))}
          </div>
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
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>What you get</H>
            <div className="mt-8"><Venn /></div>
          </Section>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {GROUPS.map((g) => (
              <Section key={g.name} className="rounded-2xl bg-white border border-zinc-200 p-4 flex flex-col">
                <img src={g.img} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-xl" />
                <p className="font-display text-2xl font-extrabold mt-5 px-2">{g.name}</p>
                <ul className="mt-3 mb-2 px-2 space-y-2.5">{g.items.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
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
            <FoundingFaq />
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
