import { ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import SupportRhythm from '../components/founding/SupportRhythm';
import VslPlayer from '../components/founding/VslPlayer';
import { BuyButton, Crosses, H2, Label, Section, SectionCta, StickyBar, Ticks, useStatus } from './Founding';

/*
  /founding-v5. Same components as /founding (v1), with the "Sell before the
  sale" spine from Sean's reference copy, 13 Nov. The page sells content that
  removes doubt before the sales conversation. The SOP and playbook inventory
  sits under "What your team receives". Locked items stay as v1 has them:
  guarantees, price ladder, GST, January intake, support rhythm, proof line.
  Hidden from Google.
*/

const CTA = 'Lock in your January install';
const LADDER = 'Founding rate. $10,000 AUD for the first five installs. Once those places are filled, the investment increases to $15,000 AUD, starting with the February intake. Future intakes then go to $20,000, then $25,000, and hold at $30,000 AUD. All prices are plus GST.';

const Line = () => <div className="gradient-line" />;

export default function FoundingV5() {
  const status = useStatus();

  return (
    <div className="min-h-screen bg-base">
      <SEO title="90 Day Install (v5)" description="Founding 5 page, v5." path="/founding-v5" image="https://authorityengine.com.au/og-founding.jpg" noIndex />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">The Authority Engine - Intro offer</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Sell before the sale.
            </h1>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              Make the right buyers understand your value, trust your method, and arrive ready to buy.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              In 90 days, we map what your buyers need to believe, turn those beliefs into content, and train your team to run the system without you becoming a fulltime creator.
            </p>
            <div className="mb-10">
              <VslPlayer />
            </div>
            <p className="text-white font-semibold leading-relaxed mb-6">
              Built from the playbooks created alongside six 8 figure+ companies we've worked with.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.
            </p>
            <div className="glow-card p-6 md:p-7 mt-8">
              <p className="text-white font-semibold mb-4">January intake</p>
              <Ticks items={['5 places available', 'Brand Day included', '90 days of guided implementation', '$10,000 AUD + GST']} />
              <p className="text-zinc-400 text-[15px] leading-relaxed mt-5">
                Implementation begins January 2027. Pay by 30 November 2026 to secure the founding rate.
              </p>
            </div>
            <BuyButton status={status} location="founding-v5-hero" label={CTA} className="mt-8" />
            <p className="text-zinc-500 text-[13px] leading-relaxed mt-4">{LADDER}</p>
          </Section>
        </div>
      </section>

      <Line />

      {/* WHY NOW (Sean, 13 Nov) */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Why now</Label>
            <H2>The market changed.</H2>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mt-6">
              Anyone can publish. Few can become the obvious choice.
            </p>
            <p className="text-zinc-300 leading-relaxed mt-6">
              Your buyers are comparing you before they contact you. If your content only gets attention, your sales team still has to create the trust, explain the category, handle objections, and prove why your approach is different.
            </p>
            <p className="text-white font-semibold leading-relaxed mt-6">
              The Authority Engine moves that work upstream.
            </p>
          </Section>
        </div>
      </section>

      <Line />

      {/* MORE THAN ATTENTION */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The commercial job</Label>
            <H2>Your content should do more than get attention.</H2>
            <p className="text-zinc-300 text-lg leading-relaxed mt-6 mb-6">
              The Authority Engine gives your content a commercial job:
            </p>
            <Ticks items={[
              'Make the right buyers recognise their problem',
              'Show them why common solutions fail',
              'Explain why your approach is different',
              'Build trust in your expertise',
              'Move them toward the next step',
            ]} />
            <p className="text-zinc-400 leading-relaxed mt-8">
              Your sales team should not have to explain everything from scratch on every call.
            </p>
          </Section>
        </div>
      </section>

      <Line />

      {/* WHAT WE INSTALL */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What we install</Label>
            <H2>The belief map, the content system and the team to run it.</H2>
            <div className="space-y-4 mt-8">
              <div className="glow-card p-7">
                <p className="font-display text-sm font-extrabold text-blue-400 mb-2">01</p>
                <p className="text-white text-lg font-semibold mb-4">The belief map</p>
                <p className="text-zinc-400 text-[15px] mb-3">We identify:</p>
                <Ticks items={[
                  'What your buyers believe now',
                  'What they misunderstand',
                  'What objections stop them buying',
                  'What they need to believe before choosing you',
                ]} />
              </div>
              <div className="glow-card p-7">
                <p className="font-display text-sm font-extrabold text-blue-400 mb-2">02</p>
                <p className="text-white text-lg font-semibold mb-4">The content system</p>
                <p className="text-zinc-400 text-[15px] mb-3">We turn those beliefs into:</p>
                <Ticks items={[
                  'Short form content',
                  'Long form trust assets',
                  'Lead magnets',
                  'Hooks, topics and formats',
                  'Clear calls to action',
                ]} />
                <p className="text-zinc-300 text-[15px] leading-relaxed mt-5">
                  Every asset has a job. It either attracts attention, builds trust, or moves the buyer closer to action.
                </p>
              </div>
              <div className="glow-card p-7">
                <p className="font-display text-sm font-extrabold text-blue-400 mb-2">03</p>
                <p className="text-white text-lg font-semibold mb-4">The team capability</p>
                <p className="text-zinc-400 text-[15px] mb-3">Your operator learns how to:</p>
                <Ticks items={[
                  'Plan the weekly content cycle',
                  'Coordinate filming and production',
                  'Brief and review editors',
                  'Publish and track content',
                  'Read the data',
                  'Decide what to repeat, improve or remove',
                ]} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-installs" />

      <Line />

      {/* THE 90 DAY PATH */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The 90 day path</Label>
            <H2>Map and build. Transfer. Operate.</H2>
            <div className="space-y-4 mt-8">
              {[
                { w: 'Weeks 1 to 4', t: 'Map and build', d: 'Brand Day, buyer beliefs, content strategy, first assets, and the first live content cycle.' },
                { w: 'Weeks 5 to 8', t: 'Transfer', d: 'Your operator runs the system while we review real work and correct the bottlenecks.' },
                { w: 'Weeks 9 to 12', t: 'Operate', d: 'Your team owns the rhythm. We refine what creates attention, trust and qualified demand.' },
              ].map((p) => (
                <div key={p.w} className="glow-card p-6 md:p-7 md:grid md:grid-cols-[160px_1fr] md:gap-6">
                  <p className="text-blue-400 text-sm font-semibold mb-2 md:mb-0">{p.w}</p>
                  <div>
                    <p className="text-white text-lg font-semibold mb-2">{p.t}</p>
                    <p className="text-zinc-400 text-[15px] leading-relaxed">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <Line />

      {/* BY DAY 90 */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>By day 90</Label>
            <H2>By day 90, you have:</H2>
            <div className="mt-8">
              <Ticks items={[
                'A documented Authority Engine',
                'A trained operator',
                'A repeatable content cycle',
                'Content mapped to buyer beliefs',
                'A system your team can run without daily founder direction',
              ]} />
            </div>
            <p className="text-zinc-300 leading-relaxed mt-8">
              You provide the expertise and film when needed. Your team turns it into content.
            </p>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-day90" />

      <Line />

      {/* PAY IN FULL, inventory under the accordion */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <Label>Pay in full</Label>
              <H2>Pay in full. Start today.</H2>
              <p className="text-zinc-400 leading-relaxed mt-6">
                1:1 guided implementation starts in the next available intake month (January, then February). Pay $10,000 AUD + GST by 30 November and your team gets access to all of this today.
              </p>
            </div>
          </Section>
          <details className="group mt-10">
            <summary className="list-none cursor-pointer glow-card px-6 py-5 flex items-center justify-between max-w-3xl [&::-webkit-details-marker]:hidden">
              <span className="text-white text-lg font-semibold">What your team receives</span>
              <ChevronDown className="w-5 h-5 text-zinc-400 transition-transform group-open:rotate-180" />
            </summary>
            <StartTodayShowcase />
          </details>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-payinfull" />

      <Line />

      {/* SUPPORT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Support and implementation</Label>
            <H2>Support until it runs without me.</H2>
            <SupportRhythm />
            <p className="text-zinc-400 leading-relaxed mt-6">
              The support is there to install the system, so your team stops needing me.
            </p>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-support" />

      <Line />

      {/* WHO */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who you'll be working with</Label>
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start mt-2">
              <img
                src="/founding/sean.jpg"
                alt="Sean on set, mid explanation"
                width={440}
                height={550}
                loading="lazy"
                className="w-full max-w-[220px] aspect-[4/5] object-cover rounded-2xl border border-white/10"
              />
              <div>
                <H2>Sean Fox.</H2>
                <p className="text-zinc-300 leading-relaxed mt-6">
                  Founder of The Authority Engine, based on the Gold Coast.
                </p>
                <p className="text-zinc-300 leading-relaxed mt-4">
                  I cut my teeth door knocking. I door knocked 500 doors in 30 days when I was a 17 year old kid trying to sell my art into different businesses.
                </p>
                <p className="text-zinc-400 leading-relaxed mt-4">
                  I'm the accelerant. The expertise is already yours. My job is to get it seen by the right people, through a team that runs it without you.
                </p>
                <p className="text-white text-sm font-semibold mt-8 mb-3">The trail so far</p>
                <p className="text-zinc-300 leading-relaxed">
                  Mitch Revs, then Jay Wright, then Taki Moore, and the network of 7 and 8 figure founders that came from them.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <Line />

      {/* FIT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Fit</Label>
            <H2>You need a proven offer and a team.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">This is for you if:</p>
                <Ticks items={[
                  'You already do $200K/month or more',
                  'You have a proven offer',
                  'You have real expertise and proof',
                  'You already create some content',
                  'You have an operator or team member to train',
                  'You want buyers arriving with more context before sales',
                  'You want the team running content without you managing every post',
                  'You are willing to fulfil increased demand without standards dropping',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">This is not:</p>
                <Crosses items={[
                  'A done for you content agency',
                  'A course you consume alone',
                  'A replacement for a proven offer',
                  'A guarantee of revenue',
                  'For founders starting from zero',
                  'For teams unwilling to attend, implement or share data honestly',
                ]} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-fit" />

      <Line />

      {/* GUARANTEE (locked wording, same as /founding) */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Guarantees</Label>
            <H2>The risk sits with me.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-3">30 day implementation guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If, by day 30, your team has not made a material change to how content is planned, produced, reviewed or published, I will pay you $5,000 AUD.
                </p>
                <p className="text-zinc-400 text-[14px] mt-5 mb-3">Material change means:</p>
                <Ticks items={[
                  'The weekly content process exists',
                  'Owners are assigned',
                  'At least one full content cycle has run',
                  'Your team is using the documented workflow',
                ]} />
              </div>
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-3">90 day guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If you do not have a consistent rhythm of content going out by day 90, we'll continue working with you until you do.
                </p>
              </div>
            </div>
            <p className="text-white text-sm font-semibold mt-8 mb-4">Conditions</p>
            <Ticks items={[
              'Your team attends at least 80% of agreed sessions',
              'Required founder inputs arrive on time',
              'Your team completes the agreed implementation work',
            ]} />
            <p className="text-zinc-400 text-[15px] leading-relaxed mt-6">
              The guarantees cover installation, not revenue.
            </p>
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-guarantee" />

      <Line />

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Questions</Label>
            <H2>What founders ask before they buy.</H2>
            <FoundingFaq />
          </Section>
        </div>
      </section>

      <SectionCta status={status} location="founding-v5-faq" />

      <Line />

      {/* PRICE */}
      <section id="price" className="py-20 md:py-28 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Investment</Label>
            <H2>$10,000 AUD + GST. Closes 30 November.</H2>
            <div className="glow-card p-8 md:p-10 mt-8">
              <p className="text-zinc-400 text-[14px] mb-1">From February, once 5 are sold</p>
              <p className="font-display text-2xl font-extrabold text-zinc-300">$15,000 AUD</p>
              <p className="text-zinc-400 text-[14px] mt-5 mb-1">Founding 5, paid in full by 30 November 2026</p>
              <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD <span className="text-zinc-400 text-[0.4em] font-semibold align-middle">+ GST</span></p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                Only 5 installs in the January intake. The founding rate is in exchange for:
              </p>
              <div className="mt-4">
                <Ticks items={[
                  'Full implementation',
                  'Blunt feedback',
                  'Honest data',
                  'Permission to use results as case studies where appropriate',
                ]} />
              </div>
              <p className="text-zinc-400 leading-relaxed mt-6">
                I keep active installs limited so I can stay close to the team, the work and the data.
              </p>
              <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
                <p className="text-white font-semibold">Lock it in now to get your Brand Day included in the price.</p>
                <p className="text-zinc-300 text-[15px] mt-1">There are 11 Brand Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed mt-4">{LADDER}</p>
              <BuyButton status={status} location="founding-v5-price" label={CTA} className="mt-8" />
            </div>
            <p className="text-white text-sm font-semibold mt-12 mb-5">What happens next</p>
            <ol className="space-y-4">
              {[
                'Lock in your place on the secure Stripe checkout.',
                'We set up your WhatsApp straight away, with direct access to me.',
                'Receive the Start Here workspace and pre install materials.',
                'Book your Brand Day.',
                'Your team gets access to the training and systems.',
                '1:1 guided implementation starts in the next available intake month (January, then February).',
                'Your first live content cycle runs once implementation starts.',
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

      <Line />

      {/* CLOSE */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Sell before the sale.
            </h2>
            <p className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.25] mt-4">
              I map the beliefs that drive the sale. Your team turns them into content. Your sales team gets warmer buyers.
            </p>
            <div className="flex justify-center">
              <BuyButton status={status} location="founding-v5-close" label={CTA} className="mt-10" />
            </div>
          </Section>
        </div>
      </section>

      <StickyBar status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
