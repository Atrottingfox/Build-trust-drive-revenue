import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Target, Map, Layers, Magnet, Video, Repeat } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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

const phases = [
  { tag: 'Weeks 1 to 4', name: 'Activation', line: 'Install the engine. I advise you directly while you get first wins.', items: [
    'I am in it with you each week, advising directly as we install and calibrate the system',
    'Pressure test your Brand Bible in the real world',
    'Run a 4 week posting sprint for data and first clearly attributable leads',
    'Lock your weekly rhythm and the minimal content to DM to call path',
  ]},
  { tag: 'Weeks 5 to 8', name: 'Systemisation', line: 'Deploy the strategy. Install the OS.', items: [
    'Monthly Posting Program and a compound production rhythm',
    'Roles and expectations locked for founder, operator, editors, VAs',
    'Operator starts making strategic decisions using real scorecard data',
  ]},
  { tag: 'Weeks 9 to 12', name: 'Stabilisation', line: 'Tune the engine. Compound the results.', items: [
    'Straight line content cadence from unaware to buyer',
    'Format mix tuned on 90 days of data',
    'Operator Playbook delivered, plus a Loom walkthrough of the whole system',
  ]},
];

const deliverables = [
  { icon: Target, name: 'Bottleneck Scorecard', body: 'We score your business on the four things that move a stranger to a sale: Clarity, Visibility, Authority, Quality. You leave knowing your single biggest constraint.' },
  { icon: Map, name: 'Customer Journey Map', body: 'The full path from unaware to advocate, mapped out. Where leads enter, what they see, where they fall out. Your funnel as one ecosystem.' },
  { icon: Layers, name: 'Content Awareness Ladder', body: 'Your content sorted by how warm the viewer is. What to post to pull cold strangers in, and what to post to close the ones already ready.' },
  { icon: Magnet, name: 'Lead Magnet Suite', body: 'Your best IP turned into named, outcome led assets that qualify and convert. Named for the result they deliver, not what they are.' },
  { icon: Video, name: 'Core Trust Asset', body: 'One long form video built to carry your trust. Path, personal story and case studies, so a stranger watches once and thinks this is my person.' },
  { icon: Repeat, name: 'One Demand Cycle', body: 'One repeatable content cycle your team runs without you. A rhythm that compounds demand, not a scramble every week.' },
];

export default function Offer() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="The Authority Engine"
        description="Turn content into clients in 90 days, without becoming a full time creator. We build a simple content system your team can run that reliably turns views into qualified leads and sales. Starts with a $5,000 Brand Day."
        path="/offer"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The Authority Engine</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-5">
              Build Your Brand in a Day.
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-3">
              Then install the content strategy that turns your attention into revenue, without becoming a full time creator.
            </p>
            <div className="mt-8 mb-8">
              <Crosses items={[
                'No dancing on camera',
                'No 12am scrolling for content ideas before shoot day',
                'No more inconsistency across platforms',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-5">
              We build a simple content system your team can run that reliably turns views into qualified leads and sales.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-5">
              It starts with a $5,000 Brand Day. For the right founders, it continues into a 90 day Content to Clients Program where we install what we call your Authority Engine: your content acquisition system that builds your brand to increase demand.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I have spent the last 24 months behind the scenes with 7 to 8 figure coaches and B2B founders doing at least $200K a month, turning content into an engine that consistently drives revenue. One client recently crossed $2M a month.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO IT IS FOR */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who this is for</Label>
            <H2>Founders who are ready to scale what already works.</H2>
            <div className="mt-8">
              <Ticks items={[
                'Already doing at least $200K a month',
                'Already create content consistently',
                'Want content that feels like them and drives revenue',
                'Want an operator friendly system, not another done for you agency or course',
                'Willing to fulfil increased demand without dropping standards',
              ]} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STEP 1 BRAND DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 1 &middot; Brand Day &middot; $5,000</Label>
            <H2>One focused day to refine your brand and remove the guesswork.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              With you and your Media Operator, or whoever owns content, we:
            </p>
            <Ticks items={[
              'Rebuild your on camera identity and positioning',
              'Map your Authority Engine across Instagram, YouTube and podcast, and how each feeds pipeline',
              'Build your Brand Bible and Posting OS: pillars, formats, CTAs, and a simple path to driving sales',
              'Leave with a 30 day Posting Program your team can execute immediately',
            ]} />

            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              You and your team own filming, editing and posting. I architect, outline and course correct. You execute.
            </p>
          </Section>
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What you walk away with</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Six deliverables.
              <br />
              <span className="text-zinc-500">Zero fluff.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8 flex flex-col items-start gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <d.icon className="w-6 h-6 text-blue-400" />
                  <h3 className="text-white font-semibold text-lg leading-tight">{d.name}</h3>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* STEP 2 90 DAY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Step 2 &middot; 90 Day Authority Engine Build &middot; by selection</Label>
            <H2>For the founders where the upside is clear.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-12">
              After the Brand Day, I invite a small number of founders into a 90 day build. Your $5,000 Brand Day fee credits toward it.
            </p>

            <div className="space-y-5">
              {phases.map((p) => (
                <div key={p.name} className="glow-card p-7">
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <span className="text-[12px] font-semibold uppercase tracking-widest text-blue-400">{p.tag}</span>
                    <h3 className="font-display text-xl font-extrabold text-white">{p.name}</h3>
                  </div>
                  <p className="text-zinc-400 text-[15px] mb-5">{p.line}</p>
                  <Ticks items={p.items} />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">By day 90 you have</p>
              <Ticks items={[
                'A refined brand and a content engine built for your voice, audience and creation style',
                'A clear path of what to post and why it works, so you can keep scaling without me',
                'Three straight weeks hitting your lead targets',
              ]} />
            </div>

            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              Ongoing advisory after 90 days is invite only, for clients who actually implement.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PRICE TERMS CAPACITY */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Price, terms and capacity</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glow-card p-7">
                <p className="text-zinc-400 text-[14px] mb-1">Brand Day</p>
                <p className="font-display text-3xl font-extrabold text-white">$5,000</p>
              </div>
              <div className="glow-card p-7">
                <p className="text-zinc-400 text-[14px] mb-1">90 Day Build, if invited</p>
                <p className="font-display text-3xl font-extrabold text-white">$15,000 total</p>
                <p className="text-zinc-500 text-[14px] mt-2">Your Brand Day fee credits in, so the balance is $10,000.</p>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-8">
              I work with a small number of founders at any time, so I can stay close to your team and your data.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* NEXT STEP */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <H2>The next step.</H2>
            <div className="text-left max-w-xl mx-auto mt-10 mb-12">
              <Ticks items={[
                'Apply and book a fit call',
                'If accepted, we pick your Brand Day date',
                'We build your Brand Bible and Authority Engine in a day',
                'If it is a hell yes for both of us, we roll into the 90 day build at $15,000 total',
              ]} />
            </div>
            <a
              href="/builder"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-10 max-w-lg mx-auto">
              One day to map and lock your brand strategy. Ninety days to install the content system that turns attention into revenue. For founders at $200K+/month who already create content and want to scale without becoming a full time creator.
            </p>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
