import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Users, Map, Workflow, FileText, Layers } from 'lucide-react';
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
  flow?: string[];
  close?: string;
};


const blocks: Block[] = [
  {
    icon: Users,
    n: '01',
    title: 'Your money making avatar',
    intro: 'We define the exact buyer your content needs to attract and convert:',
    items: [
      'Their current situation',
      'Their desired outcome',
      'Their frustrations and fears',
      'Their buying triggers',
      'Their objections',
      'Their current beliefs',
      'Why they have not bought yet',
      'What makes them trust or distrust a solution',
    ],
    close: "No vague 'coaches,' 'consultants,' or 'business owners.' We identify the people with the problem, money, urgency, and capacity to act.",
  },
  {
    icon: Workflow,
    n: '02',
    title: 'Your content to cash path',
    intro: 'We map how a prospect moves from unaware to buyer. You leave knowing:',
    flow: ['Unaware', 'Aware', 'Interested', 'Convinced', 'Buyer'],
    items: [
      'Where your best buyers enter',
      'What they need to believe next',
      'Which content creates attention',
      'Which content creates authority',
      'Which content handles objections',
      'Which content creates buying intent',
      'Where prospects currently drop out before the sale',
    ],
  },
  {
    icon: Map,
    n: '03',
    title: 'Your Buying Belief Map',
    intro: 'We identify:',
    items: [
      'What your market currently believes',
      'Which beliefs keep them stuck',
      'Which beliefs must be broken',
      'Which beliefs must be installed',
      'What proof makes your offer believable',
      'Why your method should be preferred',
      'Why the buyer should act now',
    ],
    close: 'Every important piece of content gets a commercial job. Not every post needs a CTA. Every post should move the right person closer to buying.',
  },
  {
    icon: FileText,
    n: '04',
    title: 'Your exact content requirements',
    intro: 'We define what your brand must publish to create qualified demand:',
    items: [
      'Authority content',
      'Problem awareness content',
      'Point of view content',
      'Proof and case studies',
      'Objection breaking content',
      'Personal stories',
      'Method and mechanism content',
      'Trust building long form content',
      'Commercial transition content',
      'Content for cold, warm, and ready to buy prospects',
    ],
    close: 'You will know what to say, who it is for, why it matters, what belief it changes, and where it sits in the path to money.',
  },
  {
    icon: Layers,
    n: '05',
    title: 'Your content to cash workbook',
    intro: 'Everything is documented in one place:',
    items: [
      'Exact Avatar Profile',
      'Positioning and Category Map',
      'Buying Belief Map',
      'Content to Cash Journey',
      'Content Awareness Ladder',
      'Trust and Proof Architecture',
      'Authority Narrative',
      'Exact Content Requirements',
      '30 Day Content Demand Plan',
      'Commercial priorities and next actions',
    ],
    close: 'Your team no longer has to guess what to post. They know what each content asset is designed to do.',
  },
];

export default function BrandDayOffer() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Brand Day"
        description="A private one day strategic intensive for 7 and 8 figure B2B founders, coaches and consultants doing at least $200K per month. Map the exact buyer, the beliefs they need to hold, and the content required to turn attention into cash. $5,000 AUD founding rate."
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
            <p className="text-zinc-200 text-xl md:text-2xl leading-[1.35] mb-7">
              Then turn that position into a clearer path to cash.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              A private, one day strategic intensive for 7 and 8 figure B2B founders, coaches and consultants doing at least $200K per month.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-3">
              You already have the expertise, proof, offer, and business.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              But your content may still be:
            </p>
            <div className="mt-6 mb-8">
              <Crosses items={[
                'Getting attention without creating buying intent',
                'Attracting people who cannot afford you',
                'Teaching without differentiating you',
                'Producing engagement without sales conversations',
                'Dependent on random ideas and founder intuition',
                'Disconnected from the path a prospect takes before buying',
              ]} />
            </div>
            <p className="text-zinc-300 leading-relaxed mb-5">
              The Brand Day fixes the strategy behind the content.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-7">
              We map the exact buyer, the beliefs they need to hold, and the content required to move them from:
            </p>
            <div className="glow-card p-7">
              <Flow steps={['Attention', 'Trust', 'Buying Intent', 'Sales']} />
            </div>
            <Cta label="Apply for a Brand Day" location="brandday-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CONTENT IS THE SALES SYSTEM */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The shift</Label>
            <H2>Content is not the asset. Content is the sales system.</H2>
            <div className="mt-8 mb-8 space-y-4">
              <p className="text-zinc-400 leading-relaxed">More views do not automatically create more cash.</p>
              <p className="text-zinc-400 leading-relaxed">More followers do not automatically create better clients.</p>
              <p className="text-zinc-400 leading-relaxed">More posting does not automatically create demand.</p>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">The question is:</p>
            <div className="glow-card border-blue-500/20 p-8">
              <p className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.25]">
                What does the right person need to see, believe, and understand before they buy from you?
              </p>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              The Brand Day answers that question and turns the answer into a content strategy your team or content partners can execute.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT WE BUILD */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The day</Label>
            <H2>What we build.</H2>
          </Section>
        </div>
      </section>

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
                {b.flow && (
                  <div className="mb-7 pb-7 border-b border-white/[0.06]">
                    <Flow steps={b.flow} />
                  </div>
                )}
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

      {/* WHAT YOU LEAVE WITH */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The outcome</Label>
            <H2>What you leave with.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">You leave knowing:</p>
            <Ticks items={[
              'Exactly who your content must attract',
              'Exactly what they need to believe',
              'Exactly which beliefs block the sale',
              'Exactly what content builds trust',
              'Exactly what content creates buying intent',
              'Exactly how your content connects to your offer',
              'Exactly where attention currently fails to become cash',
            ]} />
            <p className="text-zinc-300 leading-relaxed mt-8">
              This is how you stop winning the attention game and start winning the authority game.
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
                  'Do at least $200K per month',
                  'Have a proven offer and real expertise',
                  'Already create content or have content partners',
                  'Want content to create qualified sales opportunities',
                  'Are tired of engagement without enough commercial impact',
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
              <p>One strategy to connect content to cash.</p>
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
