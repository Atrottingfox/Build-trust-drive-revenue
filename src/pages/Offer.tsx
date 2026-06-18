import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Target, Map, Layers, Magnet, Video, Repeat, Compass, Zap, FileText, Megaphone, Settings, Shield, Users } from 'lucide-react';
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

const diagnostic = [
  { icon: Check, title: 'Strengths', items: [
    'A clear avatar and real results.',
    'A playbook that already delivers outcomes.',
    'Proof and word of mouth building momentum.',
  ]},
  { icon: Compass, title: 'Gaps', items: [
    'No single documented journey from cold to sold.',
    'Hooks and formats that work but are not systemised into a bank your team can re use.',
    'A trust channel you are underusing.',
  ]},
  { icon: Zap, title: 'Opportunities · Next 90 days', items: [
    'Turn your best clients into a reference bank for proof and breakdowns.',
    'Build a content cycle so you know exactly what to shoot and why.',
    'Craft a small set of lead magnets that take people from just found you to I am in.',
  ]},
];

const outputs = [
  { icon: Zap, title: 'Short Form', description: 'Discovery layer. Hooks, formats, and angles that open new audiences and pull the right people toward you.' },
  { icon: Video, title: 'Long Form', description: 'Trust depth. The pieces that get watched, shared, and remembered. The reason cold viewers turn into buyers.' },
  { icon: FileText, title: 'Lead Magnets', description: 'Trust bridge. Assets that take someone from interested to invested. One core evergreen plus video specific magnets.' },
];

const connectiveTissue = [
  { icon: Megaphone, title: 'Trojan Horse VSL', description: 'A value first video sales letter. Seeds the offer while delivering deep value. Does the selling without feeling like a sale.' },
  { icon: Settings, title: 'Documented Media Operating System', description: 'A system your team can run week to week. Captures the brand, the cycle, and the playbook in one place. Survives team changes.' },
];

const buildPhases = [
  {
    num: '01', tag: 'Phase 01 · Build · 4 to 6 hours', title: 'Extract the genius. Document the brand.',
    paras: [
      'Brand Day intensive. One in person session with you and whoever owns your content. Four to six hours. Two hours with you. The rest with your content lead.',
      'We extract the genius. The founder beliefs, contrarian takes, the stories. Everything gets built and documented live. The entire engine runs from this.',
      'This is where we build your customer journey, craft your plan, and map your core pillar videos.',
    ],
    outcomes: [
      'A documented brand. Voice, positioning, category lens, contrarian takes.',
      'A Customer Journey Map. Cold to warm to buyer to advocate.',
      'The shape of the monthly demand cycle, mapped to your launch and promo calendar.',
      'Agreed success metrics for the 90 days.',
    ],
  },
  {
    num: '02', tag: 'Phase 02 · Install · Weeks 1 to 4', title: 'Wrap the engine around your next launch.',
    paras: [
      'One 60 minute call per week with your content lead. Founder welcome.',
      'Short form, long form, lead magnets, the Trojan Horse VSL, and the Media Operating System get built and wired up. The first cycle runs live so we test it on real audience.',
    ],
    outcomes: [],
  },
  {
    num: '03', tag: 'Phase 03 · Tune · Weeks 5 to 12', title: 'Tune the engine based on data.',
    paras: [
      'Your team runs the cycle. I act as advisor. We tighten hooks, lead magnets, longform structure, and the VSL on real data. We test the strongest pieces with your warmest audience.',
      'End of 90 days you have one documented Authority Engine, one repeatable monthly demand cycle, and a clear view of what happens if we keep going.',
    ],
    outcomes: [],
  },
];

const cadence = [
  { phase: 'Phase 01 · Build', when: '4 to 6 hours', text: 'Brand Day intensive. One in person session with you and whoever owns your content.', items: [] },
  { phase: 'Phase 02 · Install', when: 'Weeks 1 to 4', text: '', items: [
    '1x 60 minute call per week with your content lead.',
    'Founder welcome.',
    'The engine gets built and wired up.',
  ]},
  { phase: 'Phase 03 · Tune', when: 'Weeks 5 to 12', text: '', items: [
    '1x 60 minute call per fortnight with you and your content lead.',
    '1x Operator Clinic per fortnight for implementation questions.',
    'Up to 1 Loom per week for asset review.',
    '24 hour feedback via WhatsApp.',
  ]},
];

const deliverables = [
  { icon: Target, name: 'Bottleneck Scorecard', body: 'We score your business on the four things that move a stranger to a sale: Clarity, Visibility, Authority, Quality. You leave knowing your single biggest constraint.' },
  { icon: Map, name: 'Customer Journey Map', body: 'The full path from unaware to advocate, mapped out. Where leads enter, what they see, where they fall out. Your funnel as one ecosystem.' },
  { icon: Layers, name: 'Content Awareness Ladder', body: 'Your content sorted by how warm the viewer is. What to post to pull cold strangers in, and what to post to close the ones already ready.' },
  { icon: Magnet, name: 'Lead Magnet Suite', body: 'Your best IP turned into named, outcome led assets that qualify and convert. Named for the result they deliver, not what they are.' },
  { icon: Video, name: 'Core Trust Asset', body: 'Your core trust asset, mapped. The long form video that carries your trust: the path, personal story and case studies it needs, so a stranger watches once and thinks this is my person.' },
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

      {/* THE DIAGNOSTIC */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The diagnostic</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Strengths. Gaps.
              <br />
              <span className="text-zinc-500">Opportunities.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              Before we build, we run a diagnostic. We score you on the four things that move a stranger to a sale: Clarity, Visibility, Authority, Quality. Then we map where you stand.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {diagnostic.map((d, i) => (
                <div key={i} className="glow-card p-8">
                  <d.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <p className="text-white font-semibold text-base mb-4">{d.title}</p>
                  <ul className="space-y-3">
                    {d.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">What you walk away with</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <d.icon className="w-[18px] h-[18px] text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{d.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{d.body}</p>
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
            <H2>Install an Authority Engine.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-4">
              After the Brand Day, I invite a small number of founders into a 90 day build. Your $5,000 Brand Day fee credits toward it.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Three core content output areas. Plus the connective tissue that turns them into a repeatable monthly demand cycle.
            </p>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <Section>
            {/* Three core outputs */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three core outputs</p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {outputs.map((item, i) => (
                <motion.div key={i} className="glow-card p-8" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Connective tissue */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Plus the connective tissue</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {connectiveTissue.map((item, i) => (
                <motion.div key={i} className="glow-card p-8" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Three phases */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Three phases</p>
            <div className="space-y-8">
              {buildPhases.map((p, i) => (
                <div key={i} className="glow-card p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{p.num}</p>
                    <div>
                      <p className="text-zinc-600 text-xs uppercase tracking-widest">{p.tag}</p>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{p.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
                    {p.paras.map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                  {p.outcomes.length > 0 && (
                    <>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">By end of Phase 1</p>
                      <ul className="space-y-2">
                        {p.outcomes.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
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

      {/* ROLES & CADENCE */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Roles.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the Authority Engine. The core elements, the monthly cycle, and the cadence.',
                    'Advise on hooks, formats, lead magnets, and longform structure. Not write or edit everything.',
                    'Read the data with you. Suggest next best moves.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Your team's role</p>
                <ul className="space-y-3">
                  {[
                    'Implement. Film, edit, publish, build funnels, send emails.',
                    'Fill a simple weekly scorecard.',
                    'Give me honest feedback from the numbers.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6">
              {cadence.map((c, i) => (
                <div key={i} className="glow-card p-8">
                  <p className="text-blue-400 font-semibold text-sm mb-1">{c.phase}</p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">{c.when}</p>
                  {c.text && <p className="text-zinc-300 text-sm leading-relaxed">{c.text}</p>}
                  {c.items.length > 0 && (
                    <ul className="space-y-2">
                      {c.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS IS NOT */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">So we both stay sharp.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-10">
              For clarity on both sides.
            </p>
            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I design, advise, and read the data with you.',
                  'This is not a guarantee of revenue. We agree the metrics. We test. The data tells us what worked.',
                  'This is not full time CMO services. I show up for the cadence we agreed. Not in your inbox at 11pm.',
                  'This is not a content factory. I do not write or edit every script. Your team produces.',
                  'This is not a forever contract. At Day 90 we both pick.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                <p className="text-zinc-500 text-[14px] mt-2">Price increases every month from July.</p>
              </div>
              <div className="glow-card p-7">
                <p className="text-zinc-400 text-[14px] mb-1">90 Day Build, if invited</p>
                <p className="font-display text-3xl font-extrabold text-white">$15,000 total</p>
                <p className="text-zinc-500 text-[14px] mt-2">Your Brand Day fee credits in, so the balance is $10,000.</p>
              </div>
            </div>
            <div className="glow-card border-blue-500/20 p-6 mt-4">
              <p className="text-white text-sm font-semibold mb-1">Only 5 spots a month.</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I work with a small number of founders at a time so I can stay close to your team and your data. The price increases every month from July, so the earlier you start, the less you pay.
              </p>
            </div>
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
