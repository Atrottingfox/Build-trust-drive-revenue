import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Users, Compass, Map, Workflow, FileText, Shield, Layers } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { trackCta, SRC_PARAM } from '../lib/track';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{children}</h2>
);

const Ticks = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

const Crosses = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

/*
  Same contract as /offer: every CTA lands on /builder, and `location` names the
  block that did the convincing so it shows up in GA4 and on the application.
*/
const Cta = ({
  label = 'Apply now',
  location,
  note,
  className = '',
}: { label?: string; location: string; note?: string; className?: string }) => (
  <div className={className}>
    <a
      href={`/builder?${SRC_PARAM}=${location}`}
      onClick={() => trackCta(location)}
      className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
    {note && <p className="text-zinc-500 text-sm mt-4">{note}</p>}
  </div>
);

const Flow = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <span className="text-white font-semibold text-[15px]">{s}</span>
        {i < steps.length - 1 && <span className="text-blue-400/60 text-[15px]">&gt;</span>}
      </React.Fragment>
    ))}
  </div>
);

type Block = {
  icon: React.ComponentType<{ className?: string }>;
  n: string;
  title: string;
  intro: string;
  items: string[];
  close?: string;
};

const blocks: Block[] = [
  {
    icon: Users,
    n: '01',
    title: 'Define your exact avatar',
    intro: 'We identify the specific person your brand should be built around. Not "coaches." Not "consultants." Not "business owners."',
    items: [
      'Their current situation',
      'Their desired future',
      'Their frustrations',
      'Their fears',
      'Their buying triggers',
      'Their objections',
      'Their existing beliefs',
      'Why previous solutions have failed',
      'What they trust',
      'What they distrust',
      'What makes them take action',
    ],
    close: 'The goal is to identify the people with the problem, money, urgency, and capacity to buy.',
  },
  {
    icon: Compass,
    n: '02',
    title: 'Master your positioning',
    intro: 'We determine:',
    items: [
      'The category you should own',
      'What your brand should be known for',
      'The problem you are uniquely positioned to solve',
      'Your strongest point of view',
      'Your method and mechanism',
      'What makes you meaningfully different',
      'Which associations strengthen your authority',
      'How to become harder to compare with alternatives',
    ],
    close: 'Positioning is not a tagline. It is the place you occupy in the mind of the market.',
  },
  {
    icon: Map,
    n: '03',
    title: 'Build your Buying Belief Map',
    intro: 'People do not buy because they consumed enough content. They buy when they hold the right beliefs.',
    items: [
      'What your best prospects currently believe',
      'Which beliefs keep them stuck',
      'Which beliefs must be broken',
      'Which beliefs must be installed',
      'What objections your content must neutralise',
      'What proof makes your solution believable',
      'Why your approach should be preferred',
      'Why the right person should act now',
    ],
    close: 'Every important content asset should have a job. That job is to move a valuable belief.',
  },
  {
    icon: Workflow,
    n: '04',
    title: 'Map the path from content to money',
    intro: 'You leave knowing:',
    items: [
      'Where your best buyers enter',
      'What they need to believe next',
      'Which content creates awareness',
      'Which content builds authority',
      'Which content handles objections',
      'Which content creates buying intent',
      'Where attention currently leaks before revenue',
    ],
    close: 'This is how you stop making content for engagement and start making content that supports the commercial journey.',
  },
  {
    icon: FileText,
    n: '05',
    title: 'Define the exact content required',
    intro: 'Your brand should determine your content, not the other way around. We define the exact content required to build your position and install the necessary beliefs, including:',
    items: [
      'Core content pillars',
      'Authority narratives',
      'Contrarian viewpoints',
      'Educational arguments',
      'Personal stories',
      'Proof assets',
      'Case studies',
      'Objection breaking content',
      'Trust building long form content',
      'Commercial transition points',
      'Content for cold, warm, and ready to buy prospects',
    ],
    close: 'You will know what to say, who it is for, why it matters, what belief it changes, and where it sits in the path to money. No more guessing what to post each week.',
  },
  {
    icon: Shield,
    n: '06',
    title: 'Build your authority and proof architecture',
    intro: 'We map the evidence required to make your position credible. This may include:',
    items: [
      'Your method',
      'Your personal story',
      'Client results',
      'Case studies',
      'Demonstrations',
      'Market insight',
      'Standards',
      'Principles',
      'Unique experiences',
      'Strong points of view',
    ],
    close: 'The goal is not to look louder. The goal is to become more believable.',
  },
  {
    icon: Layers,
    n: '07',
    title: 'Build your Brand Demand Workbook',
    intro: 'Everything decided on the day is documented in one strategic source of truth. Your workbook includes:',
    items: [
      'Hyper Specific Avatar Profile',
      'Positioning and Category Ownership Map',
      'Buying Belief Map',
      'Path to Money Map',
      'Customer Journey Map',
      'Content Awareness Ladder',
      'Trust and Proof Architecture',
      'Authority Narrative',
      'Exact Content Requirements',
      '30 Day Brand Demand Plan',
      'Clear commercial priorities',
    ],
    close: 'Your team, Creative Director, or content partners can use this to create from a clear strategic direction instead of inventing content from scratch every week.',
  },
];

export default function BrandDayOffer() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Brand Day"
        description="A private one day strategic intensive for 7 and 8 figure coaches, consultants, and B2B founders doing at least $200K per month. Define the position you own, the beliefs your buyers need, and the exact content that turns authority into money. $5,000 AUD founding rate."
        path="/brandday"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The Authority Engine &middot; Brand Day</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              Own your category.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              A private, one day strategic intensive for 7 and 8 figure coaches, consultants, and B2B founders doing at least $200K per month.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-3">
              You already have the expertise, proof, and business. The problem is that your market may not clearly understand:
            </p>
            <div className="mt-6 mb-6">
              <Ticks items={[
                'Who you are for',
                'What you should be known for',
                'Why your approach is different',
                'Why they should trust you',
                'Why they should buy now',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-5">
              So you create more content, chase more attention, and still attract inconsistent demand.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-5">
              The Brand Day fixes the strategy underneath the content.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We define the exact position you need to own, the specific buyers you need to influence, the beliefs that drive their decisions, and the content required to move them from attention to authority to money.
            </p>
            <Cta label="Apply for a Brand Day" location="brandday-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STOP COMPETING FOR ATTENTION */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The shift</Label>
            <H2>Stop competing for attention.</H2>
            <div className="mt-8 mb-8">
              <Crosses items={[
                'Views are not the objective.',
                'Followers are not the objective.',
                'Posting more is not the objective.',
              ]} />
            </div>
            <p className="text-zinc-300 leading-relaxed mb-5">
              The objective is to become the obvious choice for the right people.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              That requires a brand that creates the right associations and content that changes the right beliefs. The Brand Day helps you move from:
            </p>
            <div className="glow-card p-7">
              <Flow steps={['Attention', 'Authority', 'Qualified Demand', 'Revenue']} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT HAPPENS ON THE DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The day</Label>
            <H2>What happens on the Brand Day.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              In one focused day, we connect your:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Brand', 'Positioning', 'Avatar', 'Buyer psychology', 'Content', 'Proof', 'Customer journey', 'Commercial path'].map((t, i) => (
                <div key={i} className="glow-card px-4 py-3 text-center">
                  <span className="text-zinc-300 text-sm">{t}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              We diagnose where the gap exists between what you know, what the market perceives, and what your best prospects need to believe before they buy.
            </p>
          </Section>
        </div>
      </section>

      {/* THE SEVEN BLOCKS */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
          {blocks.map((b, i) => (
            <Section key={i}>
              <div className="glow-card p-8 md:p-10">
                <div className="flex items-center gap-4 mb-5">
                  <b.icon className="w-[18px] h-[18px] text-blue-400 flex-shrink-0" />
                  <span className="font-display text-sm font-extrabold text-zinc-600 tracking-widest">{b.n}</span>
                </div>
                <h3 className="font-display text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-white leading-[1.15] mb-5">
                  {b.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-7">{b.intro}</p>
                <Ticks items={b.items} />
                {b.close && (
                  <p className="text-zinc-400 text-[15px] leading-relaxed mt-7 pt-7 border-t border-white/[0.06]">
                    {b.close}
                  </p>
                )}
              </div>
            </Section>
          ))}
        </div>
      </section>

      <div className="gradient-line" />

      {/* PATH TO MONEY FLOW */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The path</Label>
            <H2>We map how someone moves from stranger to buyer.</H2>
            <div className="glow-card p-7 mt-8">
              <Flow steps={['Unaware', 'Aware', 'Interested', 'Convinced', 'Buyer']} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT YOU LEAVE WITH */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The outcome</Label>
            <H2>What you leave with.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">You leave knowing:</p>
            <Ticks items={[
              'Exactly who you are for',
              'Exactly what you should be known for',
              'Exactly what your best buyers need to believe',
              'Exactly which beliefs are blocking the sale',
              'Exactly what content must exist',
              'Exactly how content connects to money',
              'Exactly how to stop competing for attention and start building authority',
            ]} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FIT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Fit</Label>
            <H2>Who this is for.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">The Brand Day is for founders who:</p>
                <Ticks items={[
                  'Do at least $200K per month',
                  'Have a proven offer and real expertise',
                  'Have a reputation worth amplifying',
                  'Want to become the obvious authority in their category',
                  'Are tired of content that gets attention without enough commercial impact',
                  'Want content that feels like them and creates qualified demand',
                  'Are ready to lead their category instead of imitate it',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">This is not for:</p>
                <Crosses items={[
                  'Founders starting from zero',
                  'Businesses without a proven offer',
                  'People looking for a generic branding workshop',
                  'Founders who only care about views and vanity metrics',
                  'Anyone unwilling to make decisions or implement the strategy',
                  'Businesses that cannot fulfil increased demand',
                ]} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS NOT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Scope</Label>
            <H2>What this is not.</H2>
            <div className="glow-card p-8 md:p-10 mt-8">
              <Crosses items={[
                'A done for you content service',
                'A content calendar filled with random ideas',
                'A generic marketing workshop',
                'A full time CMO engagement',
                'A guarantee of views, leads, sales, or revenue',
                'A replacement for your internal team or content partners',
              ]} />
              <p className="text-zinc-400 text-[15px] leading-relaxed mt-7 pt-7 border-t border-white/[0.06]">
                It is the strategic foundation that makes your future brand and content decisions clearer, faster, and more commercially useful.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* INVESTMENT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Investment</Label>
            <div className="glow-card p-8 md:p-10">
              <p className="text-zinc-400 text-[14px] mb-1">Brand Day</p>
              <p className="font-display text-5xl font-extrabold text-white">$5,000 AUD</p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                This is the founding rate. There are <span className="text-white font-semibold">14 Brand Days remaining at this price</span>. Once those places are filled, the Brand Day increases to <span className="text-white font-semibold">$10,000 AUD</span>.
              </p>
              <p className="text-zinc-500 text-[15px] leading-relaxed mt-5">
                The founding rate exists while the method is being refined with a limited number of serious founders. Pricing increases as the offer becomes more proven and availability decreases.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Process</Label>
            <H2>What happens next.</H2>
            <ol className="space-y-4 mt-8">
              {[
                'Complete the application.',
                'We review your business, offer, positioning, and current content.',
                'If there is a fit, we confirm the details.',
                'You secure your Brand Day with a $5,000 AUD payment.',
                'We complete a short preparation process.',
                'We spend one focused day building your Brand Demand Workbook.',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-display text-sm font-extrabold text-blue-400 mt-[3px] w-5 flex-shrink-0">{`0${i + 1}`}</span>
                  <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              The Brand Day stands alone. You leave with the strategic foundation and can implement it with your existing team or partners.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* APPLY */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <H2>Apply for a Brand Day.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 max-w-xl mx-auto">
              The next level of growth will not come from creating more content at random. It will come from knowing:
            </p>
            <div className="text-left max-w-xl mx-auto mt-10 mb-12">
              <Ticks items={[
                'The position you need to own',
                'The people you need to influence',
                'The beliefs you need to change',
                'The proof you need to show',
                'The content you need to create',
                'The path that turns authority into money',
              ]} />
            </div>
            <div className="text-white font-semibold leading-relaxed mb-10 space-y-1">
              <p>One day to define your position.</p>
              <p>One map to connect brand to money.</p>
              <p>One content strategy designed to make you the obvious choice.</p>
            </div>
            <Cta label="Apply now" location="brandday-apply" />
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
