import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import Engine from '../components/Engine';
import Process from '../components/Process';
import PricingPlans from '../components/PricingPlans';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import VslPlayer from '../components/founding/VslPlayer';
import ClientFaces from '../components/founding/ClientFaces';

/*
  /home-draft. Hidden from Google, linked from nowhere.
  Sean, 26 Nov: "the look etc all needs to be like authorityengine.com.au
  currently is ... take some of the core parts of what we have that's super
  valuable at /founding and put it in, like the vids of me, and the trusted by
  but put it down the bottom". The live home page sections, untouched, with
  the /founding walkthrough, Strategy Day reel and Sean section added in the
  home page style, and Trusted by at the bottom. Founding copy word for word.
*/

const MAP = ['Your positioning', 'Your ideal buyer', 'What they need to believe before buying', 'Why common solutions fail', 'What makes your approach different', 'The content that moves a stranger to a buyer'];

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

/* Sean, 26 Nov: "the core parts with me showing different things". The /founding clips. */
const CLIPS = [
  { src: '/founding/step2-build-l.mp4', label: 'Running a Strategy Day' },
  { src: '/founding/train-02a.mp4', label: 'A training video from the library' },
  { src: '/founding/step4-full2.mp4', label: 'Walking through a format in the Engineroom', contain: true },
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
      <Hero />

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

      <ProofStrip />
      <Engine />

      {/* The Strategy Day, /founding copy, home styling */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Fade>
            <Kicker>How we start</Kicker>
            <H2>The Strategy Day</H2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-5">We compress your brand, content and revenue strategy into one day.</p>
            <p className="text-zinc-500 text-[15px] mt-6">We map:</p>
            <ul className="mt-4 space-y-3">
              {MAP.map((t) => (
                <li key={t} className="flex items-start gap-3 text-zinc-300 text-[15px] leading-relaxed"><Check className="w-4 h-4 mt-1 shrink-0 text-zinc-500" strokeWidth={2.5} />{t}</li>
              ))}
            </ul>
            <p className="text-white text-[15px] font-semibold leading-relaxed mt-6">This blueprint is the foundation of both short and longform content for the 90 days of implementation.</p>
          </Fade>
          <Fade>
            <video src="/founding/sd-reel7.mp4" poster="/founding/sd-reel7.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Clips from Strategy Days" className="w-full aspect-video object-cover rounded-2xl border border-zinc-800/60 bg-black" />
          </Fade>
        </div>
      </section>

      <Process />

      {/* Sean on camera, three /founding clips */}
      <section className="pb-24 md:pb-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-5">
          {CLIPS.map((c) => (
            <Fade key={c.src}>
              <video src={c.src} poster={c.src.replace('.mp4', '.jpg')} autoPlay muted loop playsInline preload="metadata" aria-label={c.label} className={`w-full aspect-video rounded-xl border border-zinc-800/60 bg-[#0d0f14] ${c.contain ? 'object-contain' : 'object-cover object-top'}`} />
              <p className="text-zinc-500 text-xs mt-3">{c.label}</p>
            </Fade>
          ))}
        </div>
      </section>

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
