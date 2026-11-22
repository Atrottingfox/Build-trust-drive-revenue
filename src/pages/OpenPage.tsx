import { Check, ShieldCheck, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import { BuyButton, Section, StickyBar, useStatus } from './Founding';

/*
  /open (Sean, 22 Nov): "look at ecommerceequation.com.au and design this page
  like that. it's simple." Their layout (light page, dark problem band, proof
  cards, alternating steps with images, member grid, blue close band). Our
  words only: every line is from /founding or Sean's 22 Nov voice note.
  Hidden from Google. The old /open (FoundingV5 open) is in git at e80c886.
  Sean, 22 Nov: "take this on" (pasted review, final position): a founding
  intake at one price, no proof claims, no "the best", guarantee covers
  delivery only. Review wording, spelling made Australian, no hyphens.
  The access headline version is in git at 937d7a5.
*/

const BLUE = '[&_button]:!bg-[#3B7DFF] [&_button]:!text-white [&_button]:!shadow-none [&_button:hover]:!bg-[#2f6be6]';

const GROUPS = [
  { name: 'Advisory', img: '/founding/train-13.jpg', line: 'Direct guidance from Sean on the media decisions in front of you.' },
  { name: 'Training', img: '/founding/receive/hooks-cover.jpg', line: 'Your team gets practical frameworks, playbooks, reviews, and implementation support.' },
  { name: 'Access', img: '/founding/train-16a.jpg', line: 'Access to selected operators, specialists, and other founding members where relevant.' },
];

const CYCLE = [
  'Understand the business and media operation',
  'Select the highest priority media project',
  'Work with the founder and team to move it forward',
  'Review the work and improve the standard',
  'Document the process and identify the next priority',
];
const WORK_ON = ['Brand and positioning', 'Content direction', 'Short form and long form systems', 'Team capability', 'Production standards', 'Review and improvement processes'];
const INCLUDED = [
  'Direct access to Sean',
  'A private Strategy Day',
  'Brand, content, and systems advisory',
  'Team training and feedback',
  'Playbooks and SOPs',
  'Loom reviews',
  'Implementation support',
  'Access to the other founding members',
  'Influence over what the Authority Engine becomes',
];

const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`}>{children}</p>
);
const H = ({ children, dark = false, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) => (
  <h2 className={`font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] ${dark ? 'text-white' : 'text-zinc-900'} ${className}`}>{children}</h2>
);

function Venn() {
  const C = [
    { cx: 222, cy: 205, label: 'ADVISORY', lx: 150, ly: 150 },
    { cx: 378, cy: 205, label: 'TRAINING', lx: 450, ly: 150 },
    { cx: 300, cy: 340, label: 'ACCESS', lx: 300, ly: 455 },
  ];
  return (
    <svg viewBox="0 35 600 475" className="w-full max-w-[440px] h-auto mx-auto" role="img" aria-label="Advisory, Training and Access overlap. The Authority Engine.">
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
            <h1 className="font-display text-[40px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 mt-5 max-w-4xl mx-auto">Build the media function your expertise deserves.</h1>
            <p className="text-zinc-900 text-lg md:text-xl font-semibold leading-relaxed mt-6 max-w-2xl mx-auto">You already have the expertise, proof, and point of view.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">The Authority Engine is a founding advisory relationship for five industry leading founders who want direct help building a media function their team can operate and improve.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">We will work on the brand, content, and systems that matter most to your business, then document what works as we build.</p>
            <div className="flex justify-center mt-8">
              <BuyButton jump status={status} location={`${loc}-hero`} label="Secure one of five founding places" hideSpots className={BLUE} />
            </div>
            <div className="mt-12 md:mt-14 text-left">
              <VslPlayer src="/founding/vsl-final-v2-cc4.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-final-v2-loop.mp4" loopPoster="/founding/vsl-final-v2-loop.jpg" length="7:35" title="Open VSL" />
            </div>
            <p className="text-zinc-500 text-[15px] mt-4">Rather read it? The page below covers everything in the video.</p>
          </Section>
        </div>
      </section>

      {/* PROBLEM, dark band */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <H dark>Your business has outgrown the way your content gets made.</H>
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and you have legit proof on your side.</p>
            <p className="text-zinc-400 text-[17px] mt-6">But your content is still:</p>
          </Section>
          <Section className="max-w-xl mx-auto mt-6">
            <ul className="space-y-3">
              {[
                "Getting attention that doesn't convert to sales",
                "Teaching killer ideas that don't connect with your sales process",
                'Produced by a team that still needs you to decide what to say',
                'Reaching people interested but unlikely to buy',
                'Sending people into calls where they have to explain everything from scratch',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-zinc-200 text-[17px] leading-relaxed"><X className="w-4 h-4 mt-1.5 shrink-0 text-zinc-500" />{t}</li>
              ))}
            </ul>
          </Section>
          <Section className="text-center mt-10 space-y-1 text-lg">
            <p className="text-zinc-400">Problem is -</p>
            <p>You have the authority.</p>
            <p>Your content just doesn't communicate it.</p>
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
                <p className="text-zinc-600 text-[16px] leading-relaxed mt-2 mb-2 px-2">{g.line}</p>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR FIRST ADVISORY CYCLE */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>The first 90 days</Eyebrow>
            <H dark className="mt-4">Your first advisory cycle</H>
            <p className="text-zinc-400 text-[17px] mt-5">During the first 90 days, we will:</p>
          </Section>
          <Section className="grid sm:grid-cols-2 md:grid-cols-5 gap-3 mt-10">
            {CYCLE.map((q, i) => (
              <div key={q} className="rounded-2xl bg-white text-zinc-900 p-5">
                <p className="font-display text-sm font-extrabold text-[#3B7DFF]">{`0${i + 1}`}</p>
                <p className="font-semibold text-[16px] leading-snug mt-2">{q}</p>
              </div>
            ))}
          </Section>
          <Section className="text-center mt-8">
            <p className="text-white text-lg font-semibold">The exact work is tailored. The delivery is structured.</p>
          </Section>
          <Section className="mt-14 md:mt-20 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <img src="/founding/receive/brand-walkout.jpg" alt="What You Walk Out With, the Strategy Day output" loading="lazy" className="w-full aspect-video object-cover object-top rounded-2xl" />
            <div>
              <p className="font-display text-2xl md:text-3xl font-extrabold">What we will work on</p>
              <ul className="mt-5 space-y-2.5">
                {WORK_ON.map((t) => <li key={t} className="flex items-start gap-2.5 text-zinc-300 text-[17px]"><Check className="w-4 h-4 mt-1.5 shrink-0 text-blue-400" strokeWidth={3} />{t}</li>)}
              </ul>
              <p className="text-zinc-400 text-[16px] leading-relaxed mt-5">The exact priority is decided after the initial Strategy Day. You are not buying a prewritten 90 day promise. You are buying focused access to solve the problems your media operation actually has.</p>
            </div>
          </Section>
        </div>
      </section>

      {/* WHY THIS IS DIFFERENT */}
      <section className="py-16 md:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>Why this is different</H>
            <p className="text-zinc-600 text-lg mt-5">You are joining before the model is fully productised. That means:</p>
          </Section>
          <Section className="mt-8 rounded-2xl bg-white border border-zinc-200 divide-y divide-zinc-100">
            {['More direct access', 'More customisation', 'More influence over what gets built', 'A founding price', 'A chance to shape the standard alongside other serious founders'].map((t) => (
              <div key={t} className="flex items-center gap-3 px-6 py-4 text-zinc-800 text-[17px] font-semibold"><Check className="w-4 h-4 shrink-0 text-[#3B7DFF]" strokeWidth={3} />{t}</div>
            ))}
          </Section>
        </div>
      </section>

      {/* SEAN */}
      <section className="py-16 md:py-28">
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
                {['You already do $200K/month or more', 'You have a proven offer and real expertise', 'You already create some content', 'You have an operator or team member to train', 'You want the team running content without you managing every every post'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-zinc-600 text-[16px] leading-relaxed"><Check className="w-4 h-4 mt-1 shrink-0 text-[#3B7DFF]" strokeWidth={3} />{t}</li>
                ))}
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
            <Eyebrow>Founding Authority Engine</Eyebrow>
            <p className="text-zinc-600 text-[16px] leading-relaxed mt-4 max-w-xl mx-auto">This is a founding offer. The program is being built with the first five members. In exchange for helping shape the system, you receive unusually direct access, high touch support, and the founding price.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-left max-w-xl mx-auto">
              {INCLUDED.map((t) => <li key={t} className="flex items-start gap-2.5 text-zinc-700 text-[15px] leading-snug"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[#3B7DFF]" strokeWidth={3} />{t}</li>)}
            </ul>
            <p className="text-zinc-900 text-[17px] font-semibold mt-8">{feb ? 'February intake, paid in full' : 'Founding 5, paid in full by 30 November'}</p>
            <p className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] mt-2 whitespace-nowrap">{feb ? '$15,000' : '$10,000'} <span className="text-zinc-400 text-[0.3em] font-semibold tracking-normal">AUD + GST</span></p>
            {!feb && <p className="text-zinc-500 text-[16px] leading-relaxed mt-4">From February, once 5 are sold, <span className="text-zinc-900 font-semibold">$15,000 AUD + GST</span>, increasing back to $30,000 throughout 2027.</p>}
            <p className="text-zinc-500 text-[16px] mt-2">1:1 guided implementation starts in the next available intake month, beginning January.</p>
            <div className="flex justify-center">
              <BuyButton status={status} location={`${loc}-price`} label="Secure one of five founding places" hideSpots className={`mt-7 ${BLUE}`} />
            </div>
          </Section>
          <Section className="mt-8 flex gap-4 max-w-2xl mx-auto">
            <ShieldCheck className="w-6 h-6 shrink-0 text-[#3B7DFF] mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-zinc-900 text-lg font-semibold">The risk sits with me.</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-1">If we fail to deliver the agreed Strategy Day, advisory sessions, reviews, training, and support, we continue providing them at no additional cost until fulfilled.</p>
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
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.04] mt-4">Build the media function your expertise deserves.</h2>
            <div className="flex justify-center">
              <BuyButton jump status={status} location={`${loc}-close`} label="Secure one of five founding places" hideSpots className="mt-9" />
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
