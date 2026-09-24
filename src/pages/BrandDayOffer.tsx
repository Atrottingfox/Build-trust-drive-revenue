import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X } from 'lucide-react';
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

/* The chain reads left to right and wraps on narrow screens. */
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

export default function BrandDayOffer() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Brand Day"
        description="A private one day strategic intensive for 7 and 8 figure B2B founders, coaches and consultants doing $200K/month+. Own your category and create more qualified revenue. $5,000 AUD founding rate."
        path="/brandday"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The Authority Engine &middot; Brand Day</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Own your category.
              <br />
              <span className="text-zinc-500">Create more qualified revenue.</span>
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              A private, one day strategic intensive for 7 and 8 figure B2B founders, coaches and consultants doing $200K/month+.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-5">
              You already have the offer, expertise, proof, and attention.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-5">
              Your content has not caught up to the rest of the business.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              You may be:
            </p>
            <div className="mt-6 mb-8">
              <Crosses items={[
                'Attracting attention without creating buying intent',
                'Generating engagement that does not turn into sales conversations',
                'Reaching people who are not qualified to buy',
                'Teaching useful ideas without making your offer the obvious next step',
                'Producing content without a clear connection to your sales process',
                'Growing on referrals and founder led selling, with content playing no real part in it',
                'Growing the audience without growing the quality of demand',
              ]} />
            </div>
            <p className="text-zinc-300 leading-relaxed mb-5">
              The Brand Day fixes the gap between content and cash.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We map the exact buyer, the beliefs that drive their purchase, and the content required to move them from attention to trust, buying intent, and revenue.
            </p>
            <Cta label="Apply for a Brand Day" location="brandday-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE TWO GAMES */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The two games</Label>
            <H2>Attention and authority are two different games.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-5">
              Most people are still playing for attention.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Nobody buys a $20,000 service from attention. They buy the $20 product.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">The attention game</p>
                <Ticks items={[
                  'The product does not require trust in you',
                  'Content is distribution',
                  'Get seen, retarget, let the ads convert',
                  'The decision is cheap enough to make on impulse',
                ]} />
              </div>
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-5">The authority game</p>
                <Ticks items={[
                  'The product requires trust in you',
                  'Content is the conversion',
                  'The belief has to be built before the call',
                  'The decision is expensive, so it is made slowly',
                ]} />
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-10 mb-5">
              You do not just need attention. You need the right attention, and you need authority.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              This is how you get it.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STOP MEASURING BY ATTENTION */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The measure</Label>
            <H2>Stop measuring content by attention alone.</H2>
            <div className="mt-8 mb-8 space-y-4">
              <p className="text-zinc-400 leading-relaxed">Views are not the objective.</p>
              <p className="text-zinc-400 leading-relaxed">Followers are not the objective.</p>
              <p className="text-zinc-400 leading-relaxed">Posting more is not the objective.</p>
            </div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              The objective is to create more of the right sales opportunities.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">That requires content that:</p>
            <Ticks items={[
              'Attracts people who can buy',
              'Makes the cost of their problem clear',
              'Builds belief in your solution',
              'Differentiates your approach',
              'Handles the objections delaying action',
              'Moves qualified prospects toward your offer',
            ]} />
            <div className="glow-card p-7 mt-10">
              <Flow steps={['Attention', 'Trust', 'Buying Intent', 'Qualified Demand', 'Revenue']} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHY CATEGORY OWNERSHIP MATTERS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The bridge</Label>
            <H2>Why category ownership matters.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-6">
              When you own a category, the right buyers do not see you as one of many options. They understand:
            </p>
            <Ticks items={[
              'The problem you solve',
              'Why the problem matters now',
              'Why your approach is different',
              'Why you are the person to solve it',
            ]} />
            <p className="text-zinc-300 leading-relaxed mt-8 mb-5">
              That changes the commercial conversation.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              The goal is not to become famous. The goal is to become the obvious choice for the people most likely to buy.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THE BRAND DAY FIXES */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The day</Label>
            <H2>What the Brand Day fixes.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-6">
              In one focused day, we determine what your best buyers need to believe before they buy, which beliefs are currently blocking the sale, and what content must exist to change them.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">We identify:</p>
            <Ticks items={[
              'The exact buyer your brand should attract',
              'The category and position you should own',
              'The beliefs currently blocking the sale',
              'The beliefs your prospects need before they buy',
              'The proof required to make your solution believable',
              'The content required to move buyers toward your offer',
              'Where attention is currently leaking before revenue',
            ]} />
            <p className="text-zinc-300 leading-relaxed mt-8">
              You leave with a clear content to revenue strategy: <span className="text-white font-semibold">what to say, who it is for, what belief it changes, and how it supports the path to money.</span>
            </p>
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
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              One documented <span className="text-white font-semibold">Brand Demand Workbook</span> containing:
            </p>
            <Ticks items={[
              'Exact avatar',
              'Positioning and category map',
              'Buying Belief Map',
              'Content to revenue journey',
              'Authority and proof architecture',
              'Required content pillars and narratives',
              '30 day content direction',
              'Commercial priorities',
            ]} />
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              This is not a guarantee of revenue. It is the strategic foundation that makes your content more relevant, your authority more believable, and your demand more qualified.
            </p>
            <div className="glow-card border-blue-500/20 p-8 mt-10">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">The simple promise</p>
              <p className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.25]">
                Own the position, create the beliefs, and produce the content that makes more of the right people want to buy.
              </p>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              That is the bridge. Not "branding for branding's sake." Category ownership is how you make your expertise easier to understand, easier to trust, and easier to buy.
            </p>
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
                  'Do $200K/month+',
                  'Have a proven offer and real expertise',
                  'Already create content or have content partners',
                  'Want content to create qualified sales opportunities',
                  'Want their content to do more commercial work',
                  'Want to become the obvious choice in their category',
                  'Are ready to implement the strategy',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">Not for:</p>
                <Crosses items={[
                  'Founders starting from zero',
                  'Businesses without a proven offer',
                  'People looking for random content ideas',
                  'Anyone who only cares about views',
                  'Anyone unwilling to implement',
                ]} />
              </div>
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
                There are <span className="text-white font-semibold">14 Brand Days remaining</span> at the founding price. Once those are filled, the price increases to <span className="text-white font-semibold">$10,000 AUD</span>.
              </p>
              <p className="text-zinc-500 text-[15px] leading-relaxed mt-5">
                The Brand Day stands alone. You leave with the strategy and can implement it with your existing team or partners.
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
                'Apply.',
                'We review your offer, audience, content, and current sales path.',
                'If there is a fit, you secure your day with a $5,000 AUD payment.',
                'We complete a short preparation process.',
                'We spend one focused day mapping the content required to create qualified demand.',
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

      {/* APPLY */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <H2>Apply for a Brand Day.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 max-w-xl mx-auto">
              The goal is not more content. The goal is content that makes the right people understand:
            </p>
            <div className="text-left max-w-md mx-auto mt-10 mb-12">
              <Ticks items={[
                'They have a problem.',
                'You understand it.',
                'Your solution is different.',
                'You are the person to solve it.',
              ]} />
            </div>
            <div className="text-white font-semibold leading-relaxed mb-10 space-y-1">
              <p>One day to map the buyer.</p>
              <p>One strategy to connect content to revenue.</p>
              <p>One clear system for creating demand.</p>
            </div>
            <Cta label="Apply now" location="brandday-apply" />
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
