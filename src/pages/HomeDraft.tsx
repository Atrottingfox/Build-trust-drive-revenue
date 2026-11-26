import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import Process from '../components/Process';
import PricingPlans from '../components/PricingPlans';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import VslPlayer from '../components/founding/VslPlayer';
import ClientFaces from '../components/founding/ClientFaces';
import { Window } from '../components/founding/StartTodayShowcase';

/*
  /home-draft. Hidden from Google, linked from nowhere.
  Sean, 26 Nov: "the look etc all needs to be like authorityengine.com.au
  currently is ... take some of the core parts of what we have that's super
  valuable at /founding and put it in, like the vids of me, and the trusted by
  but put it down the bottom". The live home page sections, untouched, with
  the /founding walkthrough, Strategy Day reel and Sean section added in the
  home page style, and Trusted by at the bottom. Founding copy word for word.
*/

/* Sean, 27 Nov: his pasted outline. His /founding words, word for word. */
const GAP = [
  "Getting attention that doesn't convert to sales",
  "Teaching killer ideas that don't connect with your sales process",
  'Produced by a team that still needs you to decide what to say',
  'Reaching people interested but unlikely to buy',
  'Sending people into calls where they have to explain everything from scratch',
];
const NOW = ['The Engineroom', 'SOP library', 'Training library', 'Playbooks', 'Thursday office hours', 'WhatsApp setup'];
const STEPS = [
  { tag: 'Today', title: 'Secure your place', body: 'Secure your place now to get your Strategy Day included in the price.', img: '/founding/ce-portal.mp4', alt: 'A new client going through the contentengine.live portal' },
  { tag: 'Before week 1', title: 'Build', body: 'Your Strategy Day, in person. We analyse your current bottlenecks and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.', img: '/founding/step2-build-l.mp4', alt: 'Sean running a Strategy Day' },
  { tag: 'Weeks 1 to 4', title: 'Install', body: 'We start on your exact bottleneck using our CVAQ analysis. Your Strategy Day creates the blueprint, then we immediately begin implementation with weekly 1:1 support to get it cranking.', img: '/founding/train-02a.mp4', alt: 'A training video from the library' },
  { tag: 'Weeks 5 to 12', title: 'Transfer and tune', body: 'Your operator runs the system with support. We iron out any kinks, iterate with data, and ensure the team can run it themselves.', img: '/founding/step4-full2.mp4', full: true, alt: 'Sean walking through a format in the Engineroom' },
];
const GROUPS = [
  { name: 'Access', colour: '#3B7DFF', img: '/founding/sd-access2.mp4', sub: 'The right people', line: 'Get direct access to Sean, trusted specialists, and serious founders when your team needs help beyond its current capability.', items: ['Direct access to Sean', 'Curated specialist introductions', 'Private founder network', 'Help with hiring and partnerships'] },
  { name: 'Training', colour: '#8B7CFF', img: '/founding/train-02b.mp4', sub: 'A better team', line: 'Give your team the standards, tools, and feedback to produce better media without waiting for you.', items: ['Every SOP, every training video, all playbooks, straight away', 'Training every fortnight', 'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8', 'The whole team gets access'] },
  { name: 'Advisory', colour: '#14B8A6', img: '/founding/ocs-advisory-full.mp4', sub: 'Senior judgment', line: 'Get clear direction on what to make, what to fix, and what to do next.', items: ['A Strategy Day with you and your team', 'Two Loom reviews per week during active implementation', 'Monthly content advisory board meetings', 'Advisory group office hours, every Thursday', 'Prescriptive advice directly through the portal', 'WhatsApp support, 24 hour replies'] },
];

/* Sean, 26 Nov: "if we were going to say 'brands we've worked with' let's just have the exact logos".
   From each brand's own site or Sean's files. Undeniable from undeniableeducation.com (27 Nov). CFS Health, Laura Higgins and Remote Sales Institute (Kris Cochrane) from their own sites. MDC cropped to drop Implementation Program. Dream Out Loud has no standalone logo online. */
const LOGOS: { name: string; src: string; h: string; keep?: boolean }[] = [
  { name: 'Klaviyo', src: '/home/logos/klaviyo.svg', h: 'h-7 md:h-8' },
  { name: 'Million Dollar Coach', src: '/home/logos/mdc.png', h: 'h-10 md:h-12' },
  { name: 'Ecommerce Equation', src: '/home/logos/ece.svg', h: 'h-7 md:h-8' },
  { name: 'Seven Figure Creators', src: '/home/logos/sfc.svg', h: 'h-11 md:h-12' },
  { name: 'The Geronimo Academy', src: '/home/logos/geronimo.png', h: 'h-12 md:h-14' },
  { name: 'UpScale Business Coaching', src: '/home/logos/upscale.png', h: 'h-8 md:h-9', keep: true },
  { name: 'Alpha Tradie', src: '/home/logos/alpha.png', h: 'h-9 md:h-10' },
  { name: 'Undeniable', src: '/home/logos/undeniable.webp', h: 'h-5 md:h-6' },
  { name: 'CFS Health', src: '/home/logos/cfs.png', h: 'h-12 md:h-14' },
  { name: 'Laura Higgins', src: '/home/logos/laura.png', h: 'h-7 md:h-8' },
  { name: 'Remote Sales Institute', src: '/home/logos/rsi.svg', h: 'h-9 md:h-10' },
];

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="accent-line mb-8" />
    <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
  </>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">{children}</h2>
);
const Media = ({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) => (
  <video src={src} poster={src.replace('.mp4', '.jpg')} autoPlay muted loop playsInline preload="metadata" aria-label={alt} className={className} />
);
const Go = () => (
  <a href="/founding" className="btn-shine inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors">Secure your January place</a>
);
const Fade = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
    {children}
  </motion.div>
);

export default function HomeDraft() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title="Own Your Category" description="The Authority Engine." path="/home-draft" noIndex />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      {/* Sean, 27 Nov: "it also needs to show private content advisory" */}
      <Hero eyebrow="Private content advisory" />

      {/* The /founding walkthrough */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Fade>
            <Kicker>The walkthrough</Kicker>
            <H2>Watch the 7 minute walkthrough</H2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-5 max-w-xl">See what your team installs over 90 days.</p>
            <div className="mt-12">
              <VslPlayer src="/founding/vsl-final-v2-hd.mp4" poster="/founding/vsl-final-v2.jpg" loopSrc="/founding/vsl-loop.mp4" loopPoster="/founding/vsl-loop.jpg" length="7:35" title="Home VSL" />
            </div>
          </Fade>
        </div>
      </section>

      {/* THE PROBLEM, his /founding trust gap */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Fade>
            <Kicker>The trust gap</Kicker>
            <H2>Your sales team is doing the work your content already should have.</H2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-6">You've got the expertise, your offer's dialled and unlike most - you're actually legit.</p>
            <p className="text-zinc-500 text-[16px] mt-6">So why is your content still -</p>
            <ul className="mt-4 space-y-3">
              {GAP.map((t) => <li key={t} className="flex items-start gap-3 text-zinc-300 text-[16px] leading-relaxed"><span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />{t}</li>)}
            </ul>
            <p className="text-white text-xl font-semibold leading-relaxed mt-10">Your business has outgrown how content gets made.</p>
          </Fade>
        </div>
      </section>

      <ProofStrip />

      {/* HOW IT WORKS, the /founding steps and videos */}
      <section id="engine" className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Fade>
            <Kicker>How it works</Kicker>
            <H2>How the first 90 days works</H2>
          </Fade>
          <div className="mt-16 space-y-16 md:space-y-24">
            {STEPS.map((st, i) => (
              <Fade key={st.title} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <p aria-hidden="true" className="font-display text-[72px] md:text-[96px] font-extrabold leading-none tracking-[-0.05em] text-zinc-800 select-none">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-2">Step {i + 1} | {st.tag}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] text-white mt-3">{st.title}</h3>
                  <p className="text-zinc-400 text-[16px] leading-relaxed mt-4">{st.body}</p>
                  {i === 0 && (
                    <>
                      <p className="text-white text-[16px] font-semibold mt-6">Get immediate access to:</p>
                      <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">{NOW.map((t) => <li key={t} className="flex items-start gap-2.5 text-zinc-300 text-[15px]"><Check className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" strokeWidth={2.5} />{t}</li>)}</ul>
                    </>
                  )}
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  {i === 0 ? (
                    <Window title="contentengine.live"><Media src={st.img} alt={st.alt} className="w-full aspect-video object-cover object-top" /></Window>
                  ) : (
                    <Media src={st.img} alt={st.alt} className={`w-full aspect-video rounded-2xl border border-zinc-800/60 ${'full' in st ? 'object-contain bg-[#0d0f14]' : 'object-cover object-top'}`} />
                  )}
                </div>
              </Fade>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-line" />
      </section>

      {/* WHAT YOU GET, his /founding cards */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Fade className="text-center">
            <div className="accent-line mb-8 mx-auto" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you get</p>
            <H2>Private media growth advisory<br className="hidden md:block" /> for industry leading founders.</H2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">A 90 day implementation that gets you the strategy, playbooks, and standards to create short form and long form content that builds buyer trust before the sales conversation, without you directing every decision.</p>
          </Fade>
          <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-5xl mx-auto">
            {GROUPS.map((g, i) => (
              <Fade key={g.name} className={`${i === 2 ? 'md:col-span-2 md:flex-row' : ''} rounded-2xl border border-zinc-800/60 bg-[#111113] overflow-hidden flex flex-col`}>
                <div className={`relative overflow-hidden bg-[#0a0a0c] ${i === 2 ? 'aspect-video md:w-1/2 md:shrink-0 md:aspect-auto md:min-h-[320px]' : 'aspect-video'}`}>
                  <Media src={g.img} className={`absolute inset-0 w-full h-full ${i === 2 ? 'object-contain' : 'object-cover'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="h-1 w-10 rounded-full mb-3" style={{ background: g.colour }} />
                    <p className="font-display text-3xl font-extrabold text-white tracking-[-0.02em]">{g.name}</p>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex-1">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: g.colour }}>{g.sub}</p>
                  <p className="text-white text-[16px] font-semibold leading-snug mt-2">{g.line}</p>
                  <ul className="mt-5 divide-y divide-zinc-800/70 border-t border-zinc-800/70">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-start gap-3 py-3 text-zinc-400 text-[14px] leading-relaxed"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: g.colour }} strokeWidth={2.5} />{t}</li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
          <div className="mt-12 flex justify-center"><Go /></div>
        </div>
      </section>

      <Process hideNot />

      {/* Sean, /founding copy, home styling */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-[320px_1fr] gap-10 md:gap-16 items-center">
          <Fade>
            <img src="/founding/sean.jpg" alt="Sean on set, mid explanation" loading="lazy" className="w-full max-w-[300px] md:max-w-none mx-auto aspect-[4/5] object-cover rounded-2xl border border-zinc-800/60 bg-black" />
          </Fade>
          <Fade>
            <Kicker>Who you'll be working with</Kicker>
            <H2>Sean Fox</H2>
            <p className="text-zinc-400 text-[16px] leading-relaxed mt-6">I cut my teeth door knocking as a 17 year old kid trying to sell my art to businesses.</p>
            <p className="text-zinc-400 text-[16px] leading-relaxed mt-4">Then spent the next 10 years transitioning from photographer, to videographer, creative director, strategist and advisor, now for the past 3 years I've been behind the scenes with 8 figure B2B founders doing $1M+/month, creating content that consistently drives revenue.</p>
            <p className="text-zinc-400 text-[16px] leading-relaxed mt-4">We work with the top 1% as an accelerant where our sole job is to get them seen by the right people to expand impact, and increase their commercial output.</p>
            <p className="text-white text-[16px] font-semibold leading-relaxed mt-4">Here's my take: Business is a vehicle for impact, content is the engine that drives it, and revenue is the fuel.</p>
          </Fade>
        </div>
      </section>

      <PricingPlans />

      {/* Trusted by, down the bottom (Sean, 26 Nov) */}
      <div className="pt-24 md:pt-32 [&_img]:!ring-zinc-900">
        <ClientFaces />
        <section className="pb-24 md:pb-32" aria-label="Brands we have worked with">
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest">Brands we have worked with</p>
          <ul className="max-w-5xl mx-auto px-6 lg:px-8 mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
            {LOGOS.map((l) => (
              <li key={l.name} className="flex h-14 items-center">
                <img src={l.src} alt={l.name} loading="lazy" className={`${l.h} w-auto max-w-[170px] object-contain opacity-70 ${l.keep ? 'grayscale' : 'brightness-0 invert'}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FinalCTA />
      <Footer showApply />
    </div>
  );
}
