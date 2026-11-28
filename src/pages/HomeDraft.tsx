import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import PricingPlans from '../components/PricingPlans';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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
const GROUPS = [
  { name: 'Access', colour: '#3B7DFF', img: '/founding/sd-access2.mp4', sub: 'The right people', line: 'Talk to Sean, trusted experts and other serious founders when your team needs help it can\'t give itself.', items: ['Direct access to Sean', 'Introductions to the right experts', 'A private network of founders', 'Help with hiring and partnerships'] },
  { name: 'Training', colour: '#8B7CFF', img: '/founding/train-02b.mp4', sub: 'A better team', line: 'Your team gets the standards, tools and feedback to make better content without waiting on you.', items: ['SOPs, training and playbooks', 'Regular team training', 'Implementation calls with your team', 'Access for your whole team'] },
  { name: 'Advisory', colour: '#14B8A6', img: '/founding/ocs-advisory-full.mp4', sub: 'Straight answers', line: 'Know what to make, what to fix and what to do next.', items: ['A strategy built around your business', 'Reviews of the content you make', 'Ongoing advisory calls', 'Clear advice inside the portal', 'Support when you need it'] },
];

/* Sean, 26 Nov: "if we were going to say 'brands we've worked with' let's just have the exact logos".
   From each brand's own site or Sean's files. Undeniable from undeniableeducation.com (27 Nov). CFS Health, Laura Higgins and Remote Sales Institute (Kris Cochrane) from their own sites. MDC cropped to drop Implementation Program. Dream Out Loud has no standalone logo online. */
const LOGOS: { name: string; src: string; h: string; keep?: boolean }[] = [
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

/* Sean, 27 Nov: brand name under each face, Morgan out, Klaviyo out, so 10 faces and 10 logos.
   Order is the /founding band order, numbered by Sean: 2 Taki, 3 Matt, 4 Laura, 5 Kris, 6 Erina,
   7 Morgan (out), 8 Doza, 9 Rhys, 10 Toby (CFS Health), 11 Jay. 1 is Sam (Alpha Tradie cap).
   Doza is paired with Geronimo, his business. Toby Morrison per cfshealth.com. */
/* Sean, 27 Nov: the /founding steps look, Brand, Content, Scale. Plain words, approved 27 Nov ("that's fine"). */
const PILLARS = [
  {
    title: 'Brand',
    line: 'Know exactly what you stand for',
    body: 'We uncover your voice, your positioning, and your story. We build your Buying Belief Map, then turn it into a documented brand your team executes from.',
    items: ['Your Buying Belief Map', 'Your proof, organised', 'Your story, documented'],
    img: '/founding/step2-build-l.mp4',
    alt: 'Sean running a Strategy Day',
  },
  {
    title: 'Content',
    line: 'Content that sells before the sales call',
    body: 'A content system tied directly to your offers, your launches, and your revenue targets. We start on your exact bottleneck.',
    items: ['Formats that fit your offers', 'A posting rhythm your team can run', 'Distribution across every channel'],
    img: '/founding/train-02a.mp4',
    alt: 'A training video from the library',
  },
  {
    title: 'Scale',
    line: 'A team that runs it without you',
    body: 'Once direction is locked, we scale. Your operator runs the system, we iterate with data, and you stop directing every decision.',
    items: ['An operator who runs it', 'A dashboard that shows what\'s working', 'Campaigns planned each quarter'],
    img: '/founding/step4-full2.mp4',
    full: true,
    alt: 'Sean walking through a format in the Engineroom',
  },
];

const FACES = [
  { f: '01', brand: 'Alpha Tradie' },
  { f: '06', brand: 'Million Dollar Coach' },
  { f: '02', brand: 'Seven Figure Creators' },
  { f: '09', brand: 'Laura Higgins' },
  { f: '03', brand: 'Remote Sales Institute' },
  { f: '11', brand: 'UpScale' },
  { f: '05', brand: 'Geronimo' },
  { f: '12', brand: 'Undeniable' },
  { f: '10', brand: 'CFS Health' },
  { f: '07', brand: 'Ecommerce Equation' },
];
const FaceRow = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-start" aria-hidden={hidden || undefined}>
    {FACES.map((p) => (
      <li key={p.f} className="group mx-4 md:mx-6 w-[120px] md:w-[150px] text-center">
        <img src={`/founding/faces/${p.f}.jpg`} alt={hidden ? '' : p.brand} width={144} height={144} loading="lazy" className="mx-auto h-[88px] w-[88px] md:h-[120px] md:w-[120px] rounded-full object-cover ring-4 ring-zinc-900 grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100" />
        <p className="mt-4 text-zinc-500 text-[14px] md:text-[15px] font-semibold leading-tight transition-colors duration-300 group-hover:text-white">{p.brand}</p>
      </li>
    ))}
  </ul>
);

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
  <a href="/apply" className="btn-shine inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors">Apply now</a>
);
const Fade = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
    {children}
  </motion.div>
);

/* live: Sean, 27 Nov "hit it": this page is the home page at /. Same SEO as the old home (Home.tsx, kept for rollback). */
export default function HomeDraft({ live = false }: { live?: boolean } = {}) {
  return (
    <div className="min-h-screen bg-base">
      {live ? (
        <SEO
          title="Own Your Category. The Content Authority Engine for 7 & 8 figure founders"
          description="Sean Fox builds Authority Engines. A 90 day content system that turns founder expertise into a media operating system. Without you becoming a full time creator."
          path="/"
        />
      ) : (
        <SEO title="Own Your Category" description="The Authority Engine." path="/home-draft" noIndex />
      )}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      {/* Sean, 27 Nov: "it also needs to show private content advisory" */}
      {/* Sean, 27 Nov: plain words across the top of the page, "that's fine" to the drafted version. */}
      <Hero eyebrow="Private content advisory" sub="We work with the top 1% of industry leaders to scale their media and own their category." />



      {/* Sean, 27 Nov: "get rid of trust gap section, we move up the private growth advisory section" */}
      {/* WHAT YOU GET, his /founding cards */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Fade className="text-center">
            <div className="accent-line mb-8 mx-auto" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you get</p>
            <H2>Private content advisory for founders<br className="hidden md:block" /> at the top of their industry.</H2>
            <p className="text-zinc-400 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">We give you the plan, the playbooks and the standards so your team makes short and long videos that build trust before anyone gets on a sales call. You don't have to make every decision.</p>
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

      {/* Sean, 28 Nov: "What our clients got" was Claude's line, not his. Back to his original. */}
      <ProofStrip />

      {/* Sean, 27 Nov: "i'm not selling the program. i'm selling that i know my shit ... we could keep the old how it works" */}
      {/* HOW IT WORKS: Brand, Content, Scale */}
      <section id="engine" className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Fade>
            <Kicker>How it works</Kicker>
            <H2>Brand. Content. Scale.</H2>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-5 max-w-2xl">The Authority Engine is the Media Operating System. Brand, Content, and Scale running as one Engine your operator can control.</p>
          </Fade>
          <div className="mt-16 space-y-16 md:space-y-24">
            {PILLARS.map((st, i) => (
              <Fade key={st.title} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <p aria-hidden="true" className="font-display text-[72px] md:text-[96px] font-extrabold leading-none tracking-[-0.05em] text-zinc-800 select-none">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-2">{st.title}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] text-white mt-3">{st.line}</h3>
                  <p className="text-zinc-400 text-[16px] leading-relaxed mt-4">{st.body}</p>
                  <ul className="mt-6 space-y-2">{st.items.map((t) => <li key={t} className="flex items-start gap-2.5 text-zinc-300 text-[15px]"><Check className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" strokeWidth={2.5} />{t}</li>)}</ul>
                </div>
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <Media src={st.img} alt={st.alt} className={`w-full aspect-video rounded-2xl border border-zinc-800/60 ${'full' in st ? 'object-contain bg-[#0d0f14]' : 'object-cover object-top'}`} />
                </div>
              </Fade>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 gradient-line" />
      </section>


      {/* Sean, 27 Nov: "What you walk away with" has no value. The $100M line goes there with the brands below. */}
        <section className="py-24 md:py-32 relative" aria-label="Brands we have worked with">
          {/* Trust line. Sean, 27 Nov: "just make it 100M+", then "there's a better place": with the logos. */}
          <h2 className="max-w-3xl mx-auto px-6 text-center font-display text-2xl md:text-4xl font-extrabold tracking-[-0.02em] leading-[1.15] mb-14" style={{ color: '#a1a1aa' }}>Built from experience behind companies representing <span className="text-white">$100M+</span> in combined revenue per year.</h2>
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest">Brands we have worked with</p>
          <ul className="max-w-5xl mx-auto px-6 lg:px-8 mt-12 grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 items-center justify-items-center">
            {LOGOS.map((l) => (
              <li key={l.name} className="flex h-14 items-center">
                <img src={l.src} alt={l.name} loading="lazy" className={`${l.h} w-auto max-w-[170px] object-contain opacity-70 ${l.keep ? 'grayscale' : 'brightness-0 invert'}`} />
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 right-0 gradient-line" />
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
      <div className="pt-24 md:pt-32">
        <section className="pb-24 md:pb-32" aria-label="Founders we have worked with">
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest">Trusted by</p>
          <div className="trusted-marquee mt-8 overflow-hidden py-4">
            <div className="trusted-track faces-track flex w-max">
              <FaceRow />
              <FaceRow hidden />
            </div>
          </div>
        </section>
      </div>

      {/* Sean, 27 Nov: "we still need something below the faces". Close: the page title and Apply now (hero link). Coffee removed 27 Nov. */}
      <section className="pb-24 md:pb-32 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] text-white leading-[0.95]">Own your category.</h2>
            {/* Sean, 27 Nov, his words: one line each under Own your category. */}
            <div className="mt-8 space-y-2 text-zinc-400 text-xl md:text-2xl font-medium leading-snug">
              <p>Business is the vehicle for impact.</p>
              <p>Revenue is the fuel.</p>
              <p>Content is the engine.</p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/apply" className="btn-shine inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors">Apply now</a>
            </div>
          </Fade>
        </div>
      </section>

      <Footer showApply />
    </div>
  );
}
