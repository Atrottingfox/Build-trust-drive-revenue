import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import ReviewForm from '../components/founding/ReviewForm';
import VslPlayer from '../components/founding/VslPlayer';
import {
  BuyButton,
  Crosses,
  H2,
  Label,
  PHASES,
  Section,
  StickyBar,
  Ticks,
  useCountdown,
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
    - On wide screens the right rail is a guide through the page (where you
      are, what's done, jump to any section). The price card only slides up
      into it once the reader reaches the questions near the end.
    - The closing headline is dropped. The price section ends the page.
*/

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

/* Wide screens only: price, spots, countdown and the button stay on screen. */
function BuyCard({ status }: { status: Status | null }) {
  return (
    <div className="glow-card border-blue-500/20 p-6">
      <p className="text-zinc-400 text-[13px]">From February, once 5 are sold</p>
      <p className="font-display text-lg font-extrabold text-zinc-300">$15,000 AUD</p>
      <p className="text-zinc-400 text-[13px] mt-3">Founding 5, paid in full</p>
      <p className="font-display text-4xl font-extrabold text-white">$10,000 AUD</p>
      <p className="text-blue-400 font-semibold text-sm mt-3">5 spots in the January cohort at $10,000 AUD. Once they sell, February goes to $15,000 AUD.</p>
      <BuyButton status={status} location="founding-v2-card" className="mt-5 [&_button]:w-full [&_button]:justify-center [&_a]:w-full" />
    </div>
  );
}


const CHAPTERS = [
  { id: 'installs', label: 'What this installs' },
  { id: 'how', label: 'How it works' },
  { id: 'receive', label: 'What you receive' },
  { id: 'payinfull', label: 'Start today' },
  { id: 'guarantee', label: 'Guarantees and fit' },
  { id: 'roles', label: 'Who does what' },
  { id: 'faq', label: 'Questions' },
  { id: 'price', label: 'Investment' },
];
/* From here on the rail swaps to the price card. */
const REVEAL_AT = CHAPTERS.findIndex((c) => c.id === 'faq');

/* Which chapter the reader is in: the last one whose top has passed 40% of the screen. */
function useActiveChapter() {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let idx = -1;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < line) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}

/* The right rail on wide screens. A guide through the page first, the price
   only once the reader reaches the questions near the end. */
function Rail({ status }: { status: Status | null }) {
  const active = useActiveChapter();
  const countdown = useCountdown(status?.closesAt || '2026-12-01T00:00:00+10:00');
  const reveal = active >= REVEAL_AT;
  return (
    <AnimatePresence mode="wait">
      {reveal ? (
        <motion.div key="price" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
          <BuyCard status={status} />
        </motion.div>
      ) : (
        <motion.div key="guide" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
          <div className="glow-card p-6">
            <p className="text-blue-400 font-semibold text-sm">5 spots in the January cohort at $10,000 AUD. Once they sell, February goes to $15,000 AUD.</p>
            {countdown && <p className="text-zinc-400 text-[13px] mt-1 tabular-nums">Closes 30 November. {countdown} left</p>}
            <p className="text-zinc-500 text-[11px] uppercase tracking-widest mt-6 mb-3">On this page</p>
            <ol className="space-y-1">
              {CHAPTERS.map((c, i) => {
                const done = i < active;
                const here = i === active;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-3 rounded-lg px-2 py-1.5 text-[14px] transition-colors ${here ? 'bg-white/5 text-white font-semibold' : done ? 'text-zinc-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${done ? 'border-blue-400 bg-blue-500/20' : here ? 'border-blue-400' : 'border-white/15'}`}>
                        {done && <Check className="h-2.5 w-2.5 text-blue-300" />}
                        {here && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                      </span>
                      {c.label}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Same phases as /founding. The Brand Day is its own step before them. */
const PHASES_V2 = PHASES;

const Divider = () => <div className="gradient-line my-24 md:my-32" />;

/* One big statement with an optional line under it. The building block of
   this layout: one idea per block, no list on show. */
const Statement = ({ n, title, children }: { n?: string; title: string; children: React.ReactNode }) => (
  <div className="py-8 border-t border-white/5 first:border-t-0 first:pt-0">
    <div className="flex gap-6">
      {n && <p className="font-display text-sm font-extrabold text-blue-400 pt-2 w-6 flex-shrink-0">{n}</p>}
      <div>
        <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">{title}</p>
        <p className="text-zinc-400 text-lg leading-relaxed mt-3">{children}</p>
      </div>
    </div>
  </div>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mt-6">{children}</p>
);

export default function FoundingV2({ review = false }: { review?: boolean }) {
  const status = useStatus();

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title={review ? '90 Day Install (review)' : '90 Day Install (layout test)'}
        description="Founding 5 page, private."
        path={review ? '/founding-review' : '/founding-v2'}
        image="https://authorityengine.com.au/og-founding.jpg"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-24 xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-16">
        <main className="min-w-0 max-w-2xl">
          {review && (
            <div className="glow-card border-blue-500/30 p-5 md:p-6 mb-12">
              <p className="text-white font-semibold">You're seeing the Founding 5 page before it goes wide.</p>
              <p className="text-zinc-300 text-[15px] mt-1">Read it like a founder would, then tell me what you'd change. The form is at the bottom.</p>
              <a href="#feedback" className="inline-block text-blue-400 font-semibold text-[15px] mt-3">Jump to the form</a>
            </div>
          )}
          {/* HERO */}
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">The Authority Engine - Intro offer</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Stop being the content manager.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15] mb-10">
              Install the system your team runs.
            </p>
            <div className="mb-10">
              <VslPlayer />
            </div>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed">
              Built from playbooks created alongside the six 8 figure+ B2B companies we've worked with.
            </p>
            <p className="text-blue-400 font-semibold text-lg mt-10">5 spots in the January cohort at $10,000 AUD. Once they sell, February goes to $15,000 AUD.</p>
            <p className="text-zinc-400 mt-2">
              For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.
            </p>
            <div className="xl:hidden">
              <BuyButton status={status} location="founding-v2-hero" className="mt-10" />
            </div>
          </Section>

          <Divider />

          {/* HOW PEOPLE BUY */}
          <div id="installs" className="scroll-mt-28" />
          <Section>
            <Label>What this installs</Label>
            <Lead>
              The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
            </Lead>
            <div className="mt-14">
              <H2>By day 90, your team can answer these.</H2>
            </div>
            <ol className="mt-8 divide-y divide-white/5 border-y border-white/5">
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
                <li key={q} className="flex items-baseline gap-5 py-4">
                  <span className="font-display text-sm font-extrabold text-blue-400 w-6">{`0${i + 1}`}</span>
                  <span className="text-white text-lg font-semibold">{q}</span>
                </li>
              ))}
            </ol>
            <p className="text-zinc-400 text-lg leading-relaxed mt-8">
              A working operating system your team uses to plan, produce, judge, publish and improve content.
            </p>
            <p className="text-zinc-500 leading-relaxed mt-4">
              This is the foundation. It gets your team what they need to start, without boxing in their creativity. It is not the end, and it is not what you will use forever.
            </p>
          </Section>

          <Divider />

          {/* WHAT CHANGES (three outcomes) */}
          <Section>
            <Label>The three outcomes</Label>
            <H2>Three outcomes by day 90.</H2>
            <div className="mt-10">
              <Statement n="01" title="Strategy installed.">
                Your team knows who the content is for, what the brand stands for, and what to make each week.
              </Statement>
              <Statement n="02" title="Team trained.">
                Your operator learns to run the weekly plan, coordinate capture, brief editors and approve content against objective standards.
              </Statement>
              <Statement n="03" title="System operating.">
                A repeatable rhythm, clear owners, and a scoreboard connected to qualified demand.
              </Statement>
            </div>
            <More label="See the full list">
              <div className="space-y-8">
                <div>
                  <p className="text-white font-semibold mb-3">Strategy installed. Your team knows:</p>
                  <Ticks items={['Who the content is for', 'What the brand stands for', 'What the business should be known for', 'Which buyer beliefs content must create', 'Which formats and channels matter', 'What content to make each week']} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-3">Team trained. Your operator learns to:</p>
                  <Ticks items={['Run the weekly content plan', 'Coordinate capture', 'Brief editors', 'Use the production and editing SOPs', 'Approve content against objective standards', 'Publish and log content', 'Read the scorecard', 'Decide what to repeat, improve or remove']} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-3">System operating. Your business has:</p>
                  <Ticks items={['A repeatable content rhythm', 'A documented workflow', 'Clear ownership', 'Format cards', 'Production and editing SOPs', 'Universal content standards', 'A publishing process', 'A weekly review loop', 'A scoreboard connected to qualified demand']} />
                </div>
              </div>
            </More>
          </Section>

          <Divider />

          {/* HOW IT WORKS (timeline) */}
          <div id="how" className="scroll-mt-28" />
          <Section>
            <Label>How it works</Label>
            <H2>Install. Transfer. Operate.</H2>
            <Lead>
              The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
            </Lead>
            <ol className="relative mt-12 ml-2 border-l border-white/10">
              {/* The Brand Day, its own step before week 1 (Sean, 12 Nov). Wording from /offer. */}
              <li className="relative pl-8 pb-12">
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-white ring-4 ring-blue-500/30" />
                <p className="text-blue-400 text-sm uppercase tracking-widest font-semibold">Before week 1</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">Brand Day</p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-2">
                  One full media strategy day, in person, to get your brand and content dialled. We analyse your current bottlenecks, map how content actually drives revenue in your business, and build your Buying Belief Map. Then we turn that into a documented brand and Authority Engine.
                </p>
                <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
                  <p className="text-white font-semibold">Your Brand Day is included.</p>
                  <p className="text-zinc-300 text-[15px] mt-1">There are 11 Brand Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
                </div>
              </li>
              {PHASES_V2.map((ph) => (
                <li key={ph.n} className="relative pl-8 pb-12 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-500/15" />
                  <p className="text-zinc-500 text-sm uppercase tracking-widest">{ph.weeks}</p>
                  <p className="font-display text-2xl font-extrabold text-white mt-1">{ph.name}</p>
                  <p className="text-zinc-400 text-lg leading-relaxed mt-2">{ph.lead}</p>
                </li>
              ))}
            </ol>
            <p className="text-zinc-300 text-lg leading-relaxed mt-10">
              By the end, your team knows what to do next without asking you every time.
            </p>
            <More label="See what happens in each phase">
              <div className="space-y-8">
                {PHASES_V2.map((ph) => (
                  <div key={ph.n}>
                    <p className="text-white font-semibold mb-3">{ph.name}, {ph.weeks.toLowerCase()}</p>
                    <Ticks items={ph.items} />
                  </div>
                ))}
              </div>
            </More>
          </Section>

          <Divider />

          {/* WHAT YOU RECEIVE */}
          <div id="receive" className="scroll-mt-28" />
          <Section>
            <Label>What you receive</Label>
            <H2>Everything your team runs from.</H2>
            <Lead>
              Your Brand Bible and Buying Belief Map, the short form and long form operating systems, every playbook and SOP, the scorecard, and the support to run them.
            </Lead>
            <p className="text-zinc-400 text-lg leading-relaxed mt-6">
              A Brand Day, 1:1 guided implementation from the next available cohort month (January, then February), weekly advisory sessions, training every fortnight, Loom reviews on real work and a monthly board review.
            </p>
            <More label="See everything included">
              <div className="space-y-8">
                {[
                  ['Foundation', ['Brand Bible', 'Positioning and perspective', 'ICP and buyer profile', 'Buyer belief map', 'Content and demand map']],
                  ['Strategy', ['Short form operating system', 'Long form operating system', 'Attraction playbook', 'Nurture playbook', 'Conversion pathway', 'Format library', 'Hook and topic systems', 'Content allocation rules']],
                  ['Production', ['Plan, capture, produce workflow', 'Capture calendar', 'Production SOPs', 'Directing standards', 'Upload and handoff system']],
                  ['Post production', ['Editing SOPs', 'Universal Content Standard', 'Editing Standard', 'Format specific QC', 'Approval and revision process', 'Asset bank']],
                  ['Distribution and review', ['Package and schedule process', 'Publish and review SOP', 'Weekly scorecard', 'Performance review rhythm', 'Repeat, improve, remove decisions']],
                ].map(([t, items]) => (
                  <div key={t as string}>
                    <p className="text-white font-semibold mb-3">{t as string}</p>
                    <Ticks items={items as string[]} />
                  </div>
                ))}
                <div>
                  <p className="text-white font-semibold mb-3">Support</p>
                  <Ticks items={[
                    'One Brand Day',
                    '1:1 guided implementation starts in the next available cohort month (January, then February)',
                    'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
                    'One team call per week during installation',
                    'Training every fortnight',
                    <>Operator hotseat every fortnight <span className="text-zinc-400">(coming soon)</span></>,
                    'Two Loom reviews per week during active implementation',
                    <>Weekly advisory sessions, every Thursday <span className="text-zinc-400">(Monday coming soon)</span></>,
                    'Monthly founder and operator board review',
                    'WhatsApp implementation support, 24 hour replies, during the agreed support window',
                  ]} />
                </div>
              </div>
            </More>
          </Section>

          <Divider />

          {/* PAY IN FULL */}
          <div id="payinfull" className="scroll-mt-28" />
          <Section>
            <Label>Pay in full</Label>
            <H2>Pay in full. Start today.</H2>
            <Lead>1:1 guided implementation starts in the next available cohort month (January, then February). Pay $10,000 AUD by 30 November and your team gets access to all of this today.</Lead>
          </Section>
          <StartTodayShowcase />

          <Divider />

          {/* GUARANTEES + FIT */}
          <div id="guarantee" className="scroll-mt-28" />
          <Section>
            <Label>Guarantees</Label>
            <H2>The risk sits with me.</H2>
            <div className="mt-10">
              <Statement title="Day 30.">
                If your team has not made a material change to how content is planned, produced, reviewed or published, I will pay you $5,000 AUD.
              </Statement>
              <Statement title="Day 90.">
                If the agreed Authority Engine is not installed, we continue working with you at no additional cost until it is.
              </Statement>
            </div>
            <More label="What counts, and the conditions">
              <p className="text-white font-semibold mb-3">Material change means:</p>
              <Ticks items={['The weekly content process exists', 'Owners are assigned', 'At least one full content cycle has run', 'Your team is using the documented workflow']} />
              <p className="text-white font-semibold mt-6 mb-3">Conditions:</p>
              <Ticks items={['Your team attends at least 80% of agreed sessions', 'Required founder inputs arrive on time', 'Your team completes the agreed implementation work']} />
              <p className="text-zinc-400 mt-4">The guarantees cover installation, not revenue.</p>
            </More>

            <p className="text-white text-xl font-semibold mt-20">You need a proven offer and a team.</p>
            <p className="text-zinc-400 text-lg leading-relaxed mt-4">
              This is for you if you already do $200K/month or more, have a proven offer and real expertise, already create some content, and have someone on your team to train.
            </p>
            <p className="text-zinc-500 text-lg leading-relaxed mt-4">
              It is not a done for you agency, and it is not for founders starting from zero.
            </p>
            <More label="See the full fit list">
              <p className="text-white font-semibold mb-3">This is for you if:</p>
              <Ticks items={['You already do $200K/month or more', 'You have a proven offer', 'You have real expertise and proof', 'You already create some content', 'You have an operator or team member to train', 'You want the team running content without you managing every post', 'You are willing to fulfil increased demand without standards dropping']} />
              <p className="text-white font-semibold mt-6 mb-3">This is not:</p>
              <Crosses items={['A done for you content agency', 'A course you consume alone', 'A replacement for a proven offer', 'A guarantee of revenue', 'For founders starting from zero', 'For teams unwilling to attend, implement or share data honestly']} />
            </More>
          </Section>

          <Divider />

          {/* ROLES + WHO */}
          <div id="roles" className="scroll-mt-28" />
          <Section>
            <Label>Who does what</Label>
            <H2>I install it. Your team runs it.</H2>
            <Lead>I architect the system, train your operator, review the real work and read the data with you.</Lead>
            <p className="text-zinc-400 text-lg leading-relaxed mt-6">
              Your team films, edits, publishes and runs the weekly rhythm. The founder provides expertise and appears on camera where required.
            </p>
            <div className="mt-14 grid sm:grid-cols-[minmax(0,320px)_1fr] gap-8 items-end">
              <img
                src="/founding/sean.jpg"
                alt="Sean on set, mid explanation"
                width={440}
                height={550}
                loading="lazy"
                className="w-full max-w-[320px] aspect-[4/5] object-cover rounded-2xl border border-white/10"
              />
              <div>
                <p className="font-display text-3xl font-extrabold text-white tracking-[-0.02em]">Sean Fox</p>
                <p className="text-zinc-400 mt-1">Founder of The Authority Engine, based on the Gold Coast.</p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-5">
                  I'm the accelerant. The expertise is already yours. My job is to get it seen by the right people, through a team that runs it without you.
                </p>
              </div>
            </div>
          </Section>

          <Divider />

          {/* FAQ */}
          <div id="faq" className="scroll-mt-28" />
          <Section>
            <Label>Questions</Label>
            <H2>What founders ask before they buy.</H2>
            <FoundingFaq />
          </Section>

          <Divider />

          {/* PRICE */}
          <section id="price" className="scroll-mt-28">
            <Section>
              <Label>Investment</Label>
              <H2>$10,000 AUD. Closes 30 November.</H2>
              <div className="glow-card p-8 md:p-10 mt-10">
                <p className="text-zinc-400 text-[14px] mb-1">From February, once 5 are sold</p>
                <p className="font-display text-2xl font-extrabold text-zinc-300">$15,000 AUD</p>
                <p className="text-zinc-400 text-[14px] mt-5 mb-1">Founding 5, paid in full by 30 November 2026</p>
                <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD</p>
                <p className="text-zinc-300 text-lg leading-relaxed mt-6">
                  Only 5 installs in the January cohort at $10,000 AUD. Once they sell, February goes to $15,000 AUD. The founding rate is in exchange for full implementation, blunt feedback, honest data, and permission to use results as case studies where appropriate.
                </p>
                <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
                  <p className="text-white font-semibold">Your Brand Day is included.</p>
                  <p className="text-zinc-300 text-[15px] mt-1">There are 11 Brand Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
                </div>
                <p className="text-zinc-500 text-[13px] leading-relaxed mt-4">Founding rate. $10,000 AUD for the first five installs. Once those places are filled, the investment increases to $15,000 AUD, starting with the February cohort. Future increases follow the level of proof, implementation depth and available capacity.</p>
                <BuyButton status={status} location="founding-v2-price" className="mt-8" />
              </div>
            </Section>
          </section>

          {review && (
            <>
              <Divider />
              <section id="feedback" className="scroll-mt-28">
                <Label>Your feedback</Label>
                <H2>What would you change?</H2>
                <p className="text-zinc-400 leading-relaxed mt-4 mb-10">Be blunt. It goes straight to Sean.</p>
                <ReviewForm />
              </section>
            </>
          )}
        </main>

        {/* Wide screens: a guide through the page, the price only at the end */}
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <Rail status={status} />
          </div>
        </aside>
      </div>

      <StickyBar status={status} revealAt="faq" />
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
