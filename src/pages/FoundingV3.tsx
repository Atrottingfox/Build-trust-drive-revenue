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
  /founding-v3. Same offer and words as /founding, laid out on the principles
  Sean pointed at on 12 Nov (a challenge sales page he liked): key facts up
  top, the video, a plain timeline, come with / leave with, a plain everything you get
  stack, his story in his own words, FAQ, doors close, a bottom bar on every
  screen and a results disclaimer. Hidden from Google.

  Left out on purpose: a wall of client names and follower counts (Sean cut
  the proof section on 11 Nov, and there are no verified follower numbers).
*/

const FN = '/.netlify/functions/founding-checkout';

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

/* Bottom bar on every screen size. */
function Bar({ status }: { status: Status | null }) {
  const [busy, setBusy] = useState(false);
  const countdown = useCountdown(status?.closesAt || '2026-12-01T00:00:00+10:00');
  if (status && !status.open) return null;
  const buy = async () => {
    if (busy) return;
    trackCta('founding-v3-bar');
    setBusy(true);
    try {
      const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'checkout' }) });
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

export default function FoundingV3() {
  const status = useStatus();

  return (
    <div className="min-h-screen bg-base">
      <SEO title="90 Day Install (v3)" description="Founding 5 page, layout v3." path="/founding-v3" image="https://authorityengine.com.au/og-founding.jpg" noIndex />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-32">
        {/* HERO */}
        <Section>
          <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-4">The Authority Engine - Intro offer</p>
          <Facts />
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mt-8 mb-5">
            Stop being the content manager.
          </h1>
          <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15]">
            Install the system your team runs.
          </p>
          <p className="text-zinc-300 text-lg leading-relaxed mt-6">
            I install the playbooks. Your team runs them. You film.
          </p>
          <div className="mt-10">
            <p className="text-zinc-400 text-sm mb-3">Watch this video to see how it works.</p>
            <VslPlayer />
          </div>
          <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mt-10">
            Built from playbooks created alongside the six 8 figure+ B2B companies we've worked with.
          </p>
          <p className="text-zinc-400 mt-3">For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.</p>
          <BuyButton status={status} location="founding-v3-hero" className="mt-8" />
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
        </Section>

        <Divider />

        {/* PAY IN FULL (Sean likes this one) */}
        <Section>
          <Label>Pay in full</Label>
          <H2>Pay in full. Start today.</H2>
          <p className="text-zinc-400 text-lg leading-relaxed mt-6">1:1 guided implementation starts in the next available cohort month (January, then February). Pay $10,000 AUD by 30 November and your team gets access to all of this today.</p>
        </Section>
        <StartTodayShowcase />

        <Divider />

        {/* GUARANTEE */}
        <Section>
          <Label>Guarantee</Label>
          <H2>The risk sits with me.</H2>
          <p className="text-zinc-300 text-lg leading-relaxed mt-6">
            If, by day 30, your team has not made a material change to how content is planned, produced, reviewed or published, I will pay you $5,000 AUD.
          </p>
          <p className="text-zinc-300 text-lg leading-relaxed mt-4">
            If the agreed Authority Engine is not installed by day 90, we continue working with you at no additional cost until it is.
          </p>
          <p className="text-zinc-500 leading-relaxed mt-6">
            To qualify, your team attends at least 80% of agreed sessions, required founder inputs arrive on time, and your team completes the agreed implementation work. The guarantees cover installation, not revenue.
          </p>
        </Section>

        <Divider />

        {/* COME WITH / LEAVE WITH */}
        <Section>
          <Label>What you leave with</Label>
          <H2>Come with your team. Leave with a system they run.</H2>
          <div className="mt-8">
            <Ticks items={[
              'Your Brand Demand Workbook, mapped on the day',
              'Your avatar card: the Hero Buyer every piece of content gets tested against',
              'A team that knows what to make next without asking you every time',
            ]} />
          </div>
        </Section>

        <Divider />

        {/* FIT */}
        <Section>
          <Label>Fit</Label>
          <H2>This is for you if...</H2>
          <div className="mt-8">
            <Ticks items={['You already do $200K/month or more', 'You have a proven offer and real expertise', 'You already create some content', 'You have an operator or team member to train', 'You want the team running content without you managing every post']} />
          </div>
          <p className="text-white text-xl font-semibold mt-12 mb-6">This isn't for you if...</p>
          <Crosses items={['You want a done for you content agency', 'You are starting from zero', 'Your team will not attend, implement or share data honestly']} />
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
                'Weekly office hours, every Thursday',
                'Monthly founder and operator board review',
                'WhatsApp support, 24 hour replies',
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
                <BuyButton status={status} location="founding-v3-price" className="mt-6" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {['train-02a', 'train-16a', 'train-13', 'live'].map((f) => (
              <img key={f} src={`/founding/${f}.jpg`} alt="Sean on set" loading="lazy" className="w-full aspect-[4/5] object-cover rounded-xl border border-white/10" />
            ))}
          </div>
        </Section>

        <Divider />

        {/* FAQ */}
        <Section>
          <Label>FAQ</Label>
          <H2>What founders ask before they buy.</H2>
          <FoundingFaq />
        </Section>

        <Divider />

        {/* CLOSE */}
        <Section>
          <div className="text-center">
            <H2>Doors close 30 November.</H2>
            <p className="text-zinc-300 text-lg leading-relaxed mt-5">Five spots in the January cohort. The next cohort starts in February. Pay now and get access today.</p>
            <div className="flex justify-center mt-6"><Facts /></div>
            <div className="flex justify-center">
              <BuyButton status={status} location="founding-v3-close" className="mt-8" />
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
