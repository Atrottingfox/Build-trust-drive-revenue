import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import { trackCta } from '../lib/track';
import { BuyButton, Crosses, H2, Label, PHASES, Section, Ticks, useCountdown, useStatus, type Status } from './Founding';

/*
  /founding-v4. "Own your category" frame (Sean's /offer hero, 12 Nov) with the
  language lessons from the challenge page: a result you can picture, who does
  what in short sentences, numbers early, outcomes as verbs, the guarantee as a promise. Buying
  beliefs only through the Brand Day and Buying Belief Map, never as their own
  section (Sean cut "How people buy"). Hidden from Google.
*/

const FN = '/.netlify/functions/founding-checkout';

const SUPPORT: [string, string[]][] = [
  [
    'Before week 1',
    [
      'One Brand Day',
      '1:1 guided implementation starts in the next available cohort month (January, then February)'
    ]
  ],
  [
    'Weekly',
    [
      'Implementation calls for the first 4 weeks, then fortnightly for the next 8',
      'One team call per week during installation',
      'Two Loom reviews per week during active implementation',
      'Advisory sessions, every Thursday|(Monday coming soon)'
    ]
  ],
  [
    'Fortnightly',
    [
      'Training every fortnight',
      'Operator hotseat every fortnight|(coming soon)'
    ]
  ],
  [
    'Monthly',
    [
      'Founder and operator board review'
    ]
  ],
  [
    'Any day',
    [
      'WhatsApp implementation support, 24 hour replies, during the agreed support window'
    ]
  ]
];

const Divider = () => <div className="gradient-line my-24 md:my-28" />;

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-zinc-300 text-[14px] md:text-[15px]">{children}</span>
);
const Sep = () => <span className="text-zinc-600">|</span>;

/* Key facts strip, top of the page and in the closing. */
const Facts = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
    <Pill>First cohort January, next February</Pill><Sep />
    <Pill>5 spots</Pill><Sep />
    <Pill>Brand Day included</Pill><Sep />
    <Pill>$5,000 guarantee</Pill>
  </div>
);

/* Logistics, top of the hero, like the dates line on the challenge page. */
const Logistics = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
    <Pill>First cohort January, next February</Pill><Sep />
    <Pill>Full media strategy day included</Pill><Sep />
    <Pill>90 days of guided implementation</Pill><Sep />
    <Pill>Changed by day 30 or I pay you $5,000</Pill>
  </div>
);

/* A plain button after each section. Same checkout, no repeated spots line. */
function MiniCta({ status, location }: { status: Status | null; location: string }) {
  const [busy, setBusy] = useState(false);
  if (status && !status.open) return null;
  const buy = async () => {
    if (busy) return;
    trackCta(location);
    setBusy(true);
    try {
      const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'checkout', testEmail: new URLSearchParams(window.location.search).get('test') || undefined }) });
      const d = await r.json();
      if (d.url) { window.location.href = d.url; return; }
    } catch {
      /* fall through */
    }
    setBusy(false);
    document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="mt-12">
      <button type="button" onClick={buy} disabled={busy} className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors disabled:opacity-70">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Lock in your spot
        {!busy && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}

/* Bottom bar on every screen size. */
function Bar({ status }: { status: Status | null }) {
  const [busy, setBusy] = useState(false);
  const countdown = useCountdown(status?.closesAt || '2026-12-01T00:00:00+10:00');
  if (status && !status.open) return null;
  const buy = async () => {
    if (busy) return;
    trackCta('founding-v4-bar');
    setBusy(true);
    try {
      const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'checkout', testEmail: new URLSearchParams(window.location.search).get('test') || undefined }) });
      const d = await r.json();
      if (d.url) { window.location.href = d.url; return; }
    } catch {
      /* fall through to the price section */
    }
    setBusy(false);
    document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#0b0c10]/95 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-white text-[14px] md:text-[15px] font-semibold leading-tight">January cohort | Next: February | $10,000 AUD</p>
          {countdown && <p className="text-zinc-400 text-[12px] leading-tight mt-0.5 tabular-nums">Closes 30 November. {countdown} left</p>}
        </div>
        <button type="button" onClick={buy} disabled={busy} className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-[14px] font-semibold disabled:opacity-70">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Lock in
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function FoundingV4() {
  const status = useStatus();

  return (
    <div className="min-h-screen bg-base">
      <SEO title="90 Day Install (v4)" description="Founding 5 page, v4." path="/founding-v4" image="https://authorityengine.com.au/og-founding.jpg" noIndex />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-32">
        {/* HERO */}
        <Section>
          <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-4">The Authority Engine - Founding 5</p>
          <Logistics />
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.02] mt-8 mb-6">
            Own your category.
          </h1>
          {/* Suggested lines, Sean to rewrite. */}
          <p className="text-white text-lg font-semibold leading-relaxed">
            In 90 days your team is planning, filming and posting the content your best clients need to buy, without you.
          </p>
          <div className="mt-10">
            <p className="text-zinc-400 text-sm mb-3">Watch this 4 minute video to see how it works.</p>
            <VslPlayer />
          </div>
          <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mt-10">
            Built from playbooks created alongside the six 8 figure+ B2B companies we've worked with.
          </p>
          <p className="text-zinc-400 mt-3">For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.</p>
          <BuyButton status={status} location="founding-v4-hero" className="mt-8" />
          <div className="mt-5"><Facts /></div>
          <p className="text-zinc-500 text-[13px] leading-relaxed mt-4">Founding rate. $10,000 AUD for the first five installs. Once those places are filled, the investment increases to $15,000 AUD. Future increases follow the level of proof, implementation depth and available capacity.</p>
        </Section>

        <Divider />

        {/* HOW IT WORKS, plain timeline */}
        <Section>
          <Label>How it works</Label>
          <H2>Install. Transfer. Operate.</H2>
          <p className="text-zinc-400 text-lg leading-relaxed mt-6">
            The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
          </p>
          <ol className="relative mt-12 ml-2 border-l border-white/10">
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
            {PHASES.map((ph) => (
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
          <MiniCta status={status} location="founding-v4-how" />
        </Section>

        <Divider />

        {/* PAY IN FULL (Sean likes this one) */}
        <Section>
          <Label>Pay in full</Label>
          <H2>Pay in full. Start today.</H2>
          <p className="text-zinc-400 text-lg leading-relaxed mt-6">1:1 guided implementation starts in the next available cohort month (January, then February). Pay $10,000 AUD by 30 November and your team gets access to all of this today.</p>
        </Section>
        <StartTodayShowcase />
        <MiniCta status={status} location="founding-v4-payinfull" />

        <Divider />

        {/* GUARANTEE */}
        <Section>
          <Label>Guarantee</Label>
          <H2>Your team changes by day 30, or I pay you $5,000.</H2>
          <p className="text-zinc-300 text-lg leading-relaxed mt-6">
            If, by day 30, your team has not made a material change to how content is planned, produced, reviewed or published, I will pay you $5,000 AUD.
          </p>
          <p className="text-zinc-300 text-lg leading-relaxed mt-4">
            If the agreed Authority Engine is not installed by day 90, we continue working with you at no additional cost until it is.
          </p>
          <p className="text-zinc-500 leading-relaxed mt-6">
            To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantees cover installation, not revenue.
          </p>
          <MiniCta status={status} location="founding-v4-guarantee" />
        </Section>

        <Divider />

        {/* WHAT THIS INSTALLS, copied from /founding (Sean likes it, 12 Nov) */}
        <Section>
          <Label>What this installs</Label>
          <p className="text-zinc-300 text-lg leading-relaxed mb-8">
            The Authority Engine installs the strategy, playbooks, workflows, standards and review rhythm your team needs to turn founder expertise into qualified demand, without making you a full time creator (unless you want to).
          </p>
          <H2>By day 90, your team can answer these.</H2>
          <div className="grid sm:grid-cols-2 gap-3 mt-8">
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
              <div key={q} className="glow-card px-5 py-4 flex items-center gap-4">
                <span className="font-display text-sm font-extrabold text-blue-400 w-5">{`0${i + 1}`}</span>
                <span className="text-white text-[15px] font-semibold">{q}</span>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 leading-relaxed mt-8">
            A working operating system your team uses to plan, produce, judge, publish and improve content.
          </p>
          <p className="text-zinc-400 leading-relaxed mt-4">
            This is the foundation. It gets your team what they need to start, without boxing in their creativity. It is not the end, and it is not what you will use forever.
          </p>
        </Section>

        <Divider />

        {/* LEAVE WITH, concrete items already on the page (trial, 12 Nov) */}
        <Section>
          <Label>By day 90</Label>
          <H2>What your team leaves with.</H2>
          <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
            {[
              'Your brand and content dialled from one full media strategy day',
              'Every SOP we run with clients, across every format',
              'The full training video library',
              'Both playbooks, short form and long form, complete',
              'A team trained to plan, film and post without you',
            ].map((t, i) => (
              <div key={t} className="flex items-baseline gap-5 py-5">
                <span className="font-display text-blue-400 font-extrabold text-lg w-6 flex-shrink-0">{i + 1}</span>
                <p className="text-white text-lg md:text-xl font-semibold leading-snug">{t}</p>
              </div>
            ))}
          </div>
          <MiniCta status={status} location="founding-v4-changes" />
        </Section>

        <Divider />

        {/* SUPPORT, /founding's items laid out by rhythm (trial, 12 Nov) */}
        <Section>
          <Label>Support and implementation</Label>
          <H2>Support until it runs without me.</H2>
          <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
            {SUPPORT.map(([when, items]) => (
              <div key={when} className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-6">
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest pt-0.5">{when}</p>
                <ul className="space-y-2">
                  {items.map((t) => {
                    const [main, note] = t.split('|');
                    return (
                      <li key={t} className="text-zinc-200 text-[16px] leading-relaxed">
                        {main}{note && <span className="text-zinc-500"> {note}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 leading-relaxed mt-6">
            The support is there to install the system, so your team stops needing me.
          </p>
        </Section>

        <Divider />

        {/* FIT, copied from /founding (Sean likes it, 12 Nov) */}
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
          <MiniCta status={status} location="founding-v4-fit" />
        </Section>

        <Divider />

        {/* EVERYTHING YOU GET + PRICE */}
        <section id="price" className="scroll-mt-28">
          <Section>
            <Label>Everything you get</Label>
            <H2>Everything your team needs to run it.</H2>
            <div className="glow-card mt-10 divide-y divide-white/5">
              {[
                'One Brand Day, in person',
                '1:1 guided implementation starts in the next available cohort month (January, then February)',
                'Weekly implementation calls for the first 4 weeks, then fortnightly for the next 8',
                'One team call per week during installation',
                'Training every fortnight',
                'Two Loom reviews per week during active implementation',
                'Operator hotseat every fortnight (coming soon)',
                'Weekly advisory sessions, every Thursday (Monday coming soon)',
                'Monthly founder and operator board review',
                'WhatsApp implementation support, 24 hour replies, during the agreed support window',
                'Every SOP, every training video, both playbooks, straight away',
                '$5,000 guarantee at day 30, keep working past day 90',
              ].map((t) => (
                <div key={t} className="px-6 py-4 text-zinc-200 text-[15px]">{t}</div>
              ))}
              <div className="px-6 py-6 bg-white/[0.02]">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-zinc-400">Standard investment</p>
                  <p className="font-display text-xl font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-3">
                  <p className="text-white font-semibold">Founding 5, paid in full by 30 November</p>
                  <p className="font-display text-4xl font-extrabold text-white">$10,000 AUD</p>
                </div>
                <p className="text-zinc-400 text-[14px] mt-4">Your Brand Day is included. There are 11 Brand Days left at $5,000. After that the price goes to $10,000.</p>
                <p className="text-zinc-500 text-[13px] leading-relaxed mt-4">Founding rate. $10,000 AUD for the first five installs. Once those places are filled, the investment increases to $15,000 AUD. Future increases follow the level of proof, implementation depth and available capacity.</p>
                <BuyButton status={status} location="founding-v4-price" className="mt-6" />
              </div>
            </div>
          </Section>
        </section>

        <Divider />

        {/* SEAN */}
        <Section>
          <Label>Who you'll be working with</Label>
          <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start mt-4">
            <img src="/founding/sean.jpg" alt="Sean on set" width={440} height={550} loading="lazy" className="w-full max-w-[320px] aspect-[4/5] object-cover rounded-2xl border border-white/10" />
            <div>
              <H2>Hey, I'm Sean Fox.</H2>
              {/* Sean's own words, 01 Authority Engine Fundamentals, and his /offer line. */}
              <p className="text-zinc-300 text-lg leading-relaxed mt-6">
                I cut my teeth door knocking. I door knocked 500 doors in 30 days when I was a 17 year old kid trying to sell my art into different businesses.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mt-4">
                I've spent the last 24 months behind the scenes with 7 &amp; 8 figure B2B founders, coaches and consultants doing $200K/month+, turning content into an engine that consistently drives revenue.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mt-4">
                I'm the accelerant. The expertise is already yours. My job is to get it seen by the right people, through a team that runs it without you.
              </p>
            </div>
          </div>
        </Section>

        <Divider />

        {/* FAQ */}
        <Section>
          <Label>FAQ</Label>
          <H2>What founders ask before they buy.</H2>
          <FoundingFaq leadWith="What if my team cannot do this?" />
        </Section>

        <Divider />

        {/* CLOSE */}
        <Section>
          <div className="text-center">
            <H2>Doors close 30 November.</H2>
            <p className="text-zinc-300 text-lg leading-relaxed mt-5">Five spots in the January cohort. The next cohort starts in February. Pay now and get access today.</p>
            <div className="flex justify-center mt-6"><Facts /></div>
            <div className="flex justify-center">
              <BuyButton status={status} location="founding-v4-close" className="mt-8" />
            </div>
          </div>
          <p className="text-zinc-600 text-[12px] leading-relaxed mt-16">
            Results vary. Your results depend on your offer, your team and your market. The guarantees cover installation, not revenue.
          </p>
        </Section>
      </div>

      <Bar status={status} />
      <Footer />
    </div>
  );
}
