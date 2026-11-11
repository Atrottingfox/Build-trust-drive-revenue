import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import {
  BuyButton,
  Crosses,
  H2,
  Label,
  PHASES,
  Section,
  SpotsLine,
  StickyBar,
  Ticks,
  useStatus,
  type Status,
} from './Founding';

/*
  /founding-v2. A layout test of the live /founding page, same words, less
  scroll. Hidden from Google. Sean, 12 Nov 2026: "shift the layout slightly,
  but we can try that, let's test".

  What changed from /founding:
    - Long lists show the first few items, the rest open with "Show all".
    - Outcomes, phases and what you receive sit side by side as cards.
    - Guarantee and fit share one section. Roles and Who share another.
    - On wide screens a buy card stays on screen on the right.
    - The closing headline is dropped. The price section ends the page.
*/

/* A list that shows `show` items and opens to the rest. */
function ShortList({ items, show = 3, cross = false }: { items: React.ReactNode[]; show?: number; cross?: boolean }) {
  const [open, setOpen] = useState(false);
  const List = cross ? Crosses : Ticks;
  const extra = items.length - show;
  return (
    <div>
      <List items={open ? items : items.slice(0, show)} />
      {extra > 0 && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mt-4 inline-flex items-center gap-1 text-blue-400 text-sm font-semibold"
          aria-expanded={open}
        >
          {open ? 'Show less' : `Show all ${items.length}`}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
}

/* A block of content behind one button. */
function More({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      {open && <div className="mb-5">{children}</div>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-blue-400 text-[15px] font-semibold"
        aria-expanded={open}
      >
        {open ? 'Show less' : label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`glow-card p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ n, title, sub }: { n?: string; title: string; sub?: string }) => (
  <>
    {n && <p className="font-display text-sm font-extrabold text-blue-400 mb-1">{n}</p>}
    <p className="text-white text-lg font-semibold">{title}</p>
    {sub && <p className="text-zinc-400 text-sm mt-1 mb-4">{sub}</p>}
    {!sub && <div className="mb-4" />}
  </>
);

/* Wide screens only: price, spots, countdown and the button stay on screen. */
function BuyCard({ status }: { status: Status | null }) {
  return (
    <div className="glow-card border-blue-500/20 p-6">
      <p className="text-zinc-400 text-[13px]">Standard investment</p>
      <p className="font-display text-lg font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
      <p className="text-zinc-400 text-[13px] mt-3">Founding 5, paid in full</p>
      <p className="font-display text-4xl font-extrabold text-white">$10,000 AUD</p>
      <p className="text-blue-400 font-semibold text-sm mt-3">5 spots, starting in January.</p>
      <BuyButton status={status} location="founding-v2-card" className="mt-5 [&_button]:w-full [&_button]:justify-center [&_a]:w-full" />
    </div>
  );
}

const Divider = () => <div className="gradient-line my-16 md:my-20" />;

export default function FoundingV2() {
  const status = useStatus();

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="90 Day Install (layout test)"
        description="Layout test of the Founding 5 page."
        path="/founding-v2"
        image="https://authorityengine.com.au/og-founding.jpg"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-24 xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-14">
        <main className="min-w-0 max-w-3xl">
          {/* HERO */}
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">The Authority Engine - Intro offer</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Stop being the content manager.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15] mb-8">
              Install the system your team runs.
            </p>
            <div className="mb-10">
              <VslPlayer />
            </div>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              Built from the playbooks I've created alongside the six 8 figure+ B2B companies we've worked with.
            </p>
            <p className="text-blue-400 font-semibold leading-relaxed mb-6">5 spots, starting in January.</p>
            <p className="text-zinc-400 leading-relaxed">
              For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.
            </p>
            <div className="xl:hidden">
              <BuyButton status={status} location="founding-v2-hero" className="mt-10" />
            </div>
            <div className="hidden xl:block">
              <SpotsLine status={status} />
            </div>
          </Section>

          <Divider />

          {/* WHAT THIS INSTALLS + OUTCOMES */}
          <Section>
            <Label>What this installs</Label>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
            </p>
            <H2>By day 90, your team can answer these.</H2>
            <div className="grid grid-cols-2 gap-2.5 mt-8">
              {[
                'What should we make?',
                'Who is it for?',
                'Which format fits?',
                'How do we capture it?',
                'How do we produce it?',
                'Is it good enough to publish?',
                'Did it work?',
                'What do we do more of next?',
              ].map((q, i) => (
                <div key={q} className="glow-card px-4 py-3 flex items-center gap-3">
                  <span className="font-display text-xs font-extrabold text-blue-400 w-4">{`0${i + 1}`}</span>
                  <span className="text-white text-[14px] font-semibold">{q}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 leading-relaxed mt-6">
              A working operating system your team uses to plan, produce, judge, publish and improve content.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-3">
              This is the foundation. It gets your team what they need to start, without boxing in their creativity. It is not the end, and it is not what you will use forever.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <Card>
                <CardTitle n="01" title="Strategy installed" sub="Your team knows:" />
                <ShortList items={['Who the content is for', 'What the brand stands for', 'What the business should be known for', 'Which buyer beliefs content must create', 'Which formats and channels matter', 'What content to make each week']} />
              </Card>
              <Card>
                <CardTitle n="02" title="Team trained" sub="Your operator learns to:" />
                <ShortList items={['Run the weekly content plan', 'Coordinate capture', 'Brief editors', 'Use the production and editing SOPs', 'Approve content against objective standards', 'Publish and log content', 'Read the scorecard', 'Decide what to repeat, improve or remove']} />
              </Card>
              <Card>
                <CardTitle n="03" title="System operating" sub="Your business has:" />
                <ShortList items={['A repeatable content rhythm', 'A documented workflow', 'Clear ownership', 'Format cards', 'Production and editing SOPs', 'Universal content standards', 'A publishing process', 'A weekly review loop', 'A scoreboard connected to qualified demand']} />
              </Card>
            </div>
          </Section>

          <Divider />

          {/* HOW IT WORKS */}
          <Section>
            <Label>How it works</Label>
            <H2>Install. Transfer. Operate.</H2>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {PHASES.map((ph) => (
                <Card key={ph.n}>
                  <p className="font-display text-sm font-extrabold text-blue-400">{ph.n}</p>
                  <p className="text-white text-lg font-semibold">{ph.name}</p>
                  <p className="text-zinc-400 text-sm mb-3">{ph.weeks}</p>
                  <p className="text-zinc-300 text-[14px] leading-relaxed mb-4">{ph.lead}</p>
                  <ShortList items={ph.items} />
                </Card>
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed mt-6">
              By the end, your team knows what to do next without asking you every time.
            </p>
          </Section>

          <Divider />

          {/* WHAT YOU RECEIVE + SUPPORT */}
          <Section>
            <Label>What you receive</Label>
            <H2>Everything your team runs from.</H2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <Card><CardTitle title="Foundation" /><ShortList items={['Brand Bible', 'Positioning and perspective', 'ICP and buyer profile', 'Buyer belief map', 'Content and demand map']} /></Card>
              <Card><CardTitle title="Strategy" /><ShortList items={['Short form operating system', 'Long form operating system', 'Attraction playbook', 'Nurture playbook', 'Conversion pathway', 'Format library', 'Hook and topic systems', 'Content allocation rules']} /></Card>
              <Card><CardTitle title="Production" /><ShortList items={['Plan, capture, produce workflow', 'Capture calendar', 'Production SOPs', 'Directing standards', 'Upload and handoff system']} /></Card>
              <Card><CardTitle title="Post production" /><ShortList items={['Editing SOPs', 'Universal Content Standard', 'Editing Standard', 'Format specific QC', 'Approval and revision process', 'Asset bank']} /></Card>
              <Card><CardTitle title="Distribution and review" /><ShortList items={['Package and schedule process', 'Publish and review SOP', 'Weekly scorecard', 'Performance review rhythm', 'Repeat, improve, remove decisions']} /></Card>
              <Card className="border-blue-500/20">
                <CardTitle title="Support" />
                <ShortList items={[
                  'One Brand Day',
                  'Four weeks of 1:1 implementation with your operator, from January',
                  'One team call per week during installation',
                  'Training every fortnight',
                  <>Operator hotseat every fortnight <span className="text-zinc-400">(coming soon)</span></>,
                  'Two Loom reviews per week during active implementation',
                  <>Weekly advisory sessions, every Thursday <span className="text-zinc-400">(Monday coming soon)</span></>,
                  'Monthly founder and operator board review',
                  'WhatsApp implementation support, 24 hour replies, during the agreed support window',
                ]} />
              </Card>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-6">
              The support is there to install the system, so your team stops needing me.
            </p>
          </Section>

          <Divider />

          {/* PAY IN FULL */}
          <Section>
            <Label>Pay in full</Label>
            <H2>Pay in full. Start today.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              Implementation starts in January. Pay $10,000 AUD by 30 November and your team gets all of this now.
            </p>
          </Section>
          <StartTodayShowcase />

          <Divider />

          {/* GUARANTEE + FIT */}
          <Section>
            <Label>Guarantees and fit</Label>
            <H2>The risk sits with me.</H2>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Card className="border-blue-500/20">
                <p className="text-white font-semibold mb-2">30 day implementation guarantee</p>
                <p className="text-zinc-300 text-[14px] leading-relaxed">
                  If, by day 30, your team has not made a material change to how content is planned, produced, reviewed or published, I will refund $5,000 AUD.
                </p>
                <More label="What material change means">
                  <Ticks items={['The weekly content process exists', 'Owners are assigned', 'At least one full content cycle has run', 'Your team is using the documented workflow']} />
                </More>
              </Card>
              <Card className="border-blue-500/20">
                <p className="text-white font-semibold mb-2">90 day installation guarantee</p>
                <p className="text-zinc-300 text-[14px] leading-relaxed">
                  If the agreed Authority Engine is not installed by day 90, we continue working with you at no additional cost until it is.
                </p>
                <More label="The conditions">
                  <Ticks items={['Your team attends at least 80% of agreed sessions', 'Required founder inputs arrive on time', 'Your team completes the agreed implementation work']} />
                  <p className="text-zinc-400 text-[14px] mt-4">The guarantees cover installation, not revenue.</p>
                </More>
              </Card>
            </div>
            <p className="text-white font-semibold text-lg mt-12 mb-1">You need a proven offer and a team.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Card>
                <p className="text-white text-sm font-semibold mb-4">This is for you if:</p>
                <ShortList show={4} items={[
                  'You already do $200K/month or more',
                  'You have a proven offer',
                  'You have real expertise and proof',
                  'You already create some content',
                  'You have an operator or team member to train',
                  'You want the team running content without you managing every post',
                  'You are willing to fulfil increased demand without standards dropping',
                ]} />
              </Card>
              <Card>
                <p className="text-white text-sm font-semibold mb-4">This is not:</p>
                <ShortList show={4} cross items={[
                  'A done for you content agency',
                  'A course you consume alone',
                  'A replacement for a proven offer',
                  'A guarantee of revenue',
                  'For founders starting from zero',
                  'For teams unwilling to attend, implement or share data honestly',
                ]} />
              </Card>
            </div>
          </Section>

          <Divider />

          {/* ROLES + WHO */}
          <Section>
            <Label>Roles</Label>
            <H2>I install it. Your team runs it.</H2>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Card>
                <p className="text-white text-sm font-semibold mb-4">My role</p>
                <ShortList show={4} items={['Architect the system', 'Install the playbooks', 'Train your operator', 'Review the real work', 'Diagnose bottlenecks', 'Read the data', 'Recommend the next move']} />
              </Card>
              <Card>
                <p className="text-white text-sm font-semibold mb-4">Your team's role</p>
                <ShortList show={4} items={['Film', 'Edit', 'Publish', 'Attend the sessions', 'Run the weekly rhythm', 'Bring the numbers honestly', 'Implement the agreed changes']} />
              </Card>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-4 text-[15px]">
              The founder provides expertise and appears on camera where required. The team owns the rest.
            </p>
            <Card className="mt-8 flex gap-5 items-start">
              <img
                src="/founding/sean.jpg"
                alt="Sean on set, mid explanation"
                width={160}
                height={200}
                loading="lazy"
                className="w-24 sm:w-28 aspect-[4/5] object-cover rounded-xl border border-white/10 flex-shrink-0"
              />
              <div>
                <p className="text-white text-lg font-semibold">Sean Fox</p>
                <p className="text-zinc-400 text-sm">Founder of The Authority Engine, based on the Gold Coast.</p>
                <p className="text-zinc-300 text-[14px] leading-relaxed mt-3">
                  I'm the accelerant. The expertise is already yours. My job is to get it seen by the right people, through a team that runs it without you.
                </p>
                <p className="text-zinc-400 text-[14px] leading-relaxed mt-2">
                  The trail so far: Mitch Revs, then Jay Wright, then Taki Moore, and the network of 7 and 8 figure founders that came from them.
                </p>
              </div>
            </Card>
          </Section>

          <Divider />

          {/* FAQ */}
          <Section>
            <Label>Questions</Label>
            <H2>What founders ask before they buy.</H2>
            <FoundingFaq />
          </Section>

          <Divider />

          {/* PRICE */}
          <section id="price">
            <Section>
              <Label>Investment</Label>
              <H2>$10,000 AUD. Closes 30 November.</H2>
              <div className="glow-card p-8 md:p-10 mt-8">
                <p className="text-zinc-400 text-[14px] mb-1">Standard investment</p>
                <p className="font-display text-2xl font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
                <p className="text-zinc-400 text-[14px] mt-5 mb-1">Founding 5, paid in full by 30 November 2026</p>
                <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD</p>
                <p className="text-zinc-300 leading-relaxed mt-6">
                  Only 5 installs for this intake, starting in January. The founding rate is in exchange for:
                </p>
                <div className="mt-4">
                  <Ticks items={['Full implementation', 'Blunt feedback', 'Honest data', 'Permission to use results as case studies where appropriate']} />
                </div>
                <p className="text-zinc-400 leading-relaxed mt-6">
                  I keep active installs limited so I can stay close to the team, the work and the data.
                </p>
                <BuyButton status={status} location="founding-v2-price" className="mt-8" />
                <More label="What happens next">
                  <ol className="space-y-3">
                    {[
                      'Lock in your place on the secure Stripe checkout.',
                      'We set up your WhatsApp straight away.',
                      'Receive the Start Here workspace and pre install materials.',
                      'Book your Brand Day.',
                      'Your team gets access to the training and systems.',
                      'Implementation begins with your operator in January.',
                      'Your first live content cycle runs straight away.',
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="font-display text-sm font-extrabold text-blue-400 mt-[3px] w-5 flex-shrink-0">{`0${i + 1}`}</span>
                        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ol>
                </More>
              </div>
            </Section>
          </section>
        </main>

        {/* Wide screens: the buy card stays on screen */}
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <BuyCard status={status} />
          </div>
        </aside>
      </div>

      <StickyBar status={status} />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
