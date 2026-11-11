import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { trackCta } from '../lib/track';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';

/*
  /founding. The founding 90 Day offer, bought straight off the page.

  Same look as /brandday. The difference is the button: it goes to Stripe, not
  to /builder. netlify/functions/founding-checkout.ts creates the session,
  counts the spots, closes the offer at 10 sales or the end of 30 November, and
  confirms the payment when Stripe sends them back here with ?paid=1.
*/

const FN = '/.netlify/functions/founding-checkout';

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

const Ticks = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

type Status = { open: boolean; remaining: number | null; total: number; configured?: boolean };

/* Shared across every buy button on the page, so they all agree. */
function useStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    fetch(FN)
      .then((r) => r.json())
      .then((d) => setStatus({ open: Boolean(d.open), remaining: d.remaining ?? null, total: d.total ?? 10, configured: d.configured }))
      .catch(() => setStatus({ open: true, remaining: null, total: 10 }));
  }, []);
  return status;
}

function SpotsLine({ status }: { status: Status | null }) {
  /* Only scarcity we can honour: the live count from Stripe, and the date. */
  const left = status && status.remaining !== null && status.remaining < status.total
    ? `${status.remaining} of ${status.total} installs left for this intake.`
    : '10 installs available for this intake.';
  return (
    <p className="text-zinc-500 text-sm mt-4">
      <span className="text-white font-semibold">{left}</span> Closes 30 November or when full.
    </p>
  );
}

function BuyButton({ status, location, className = '' }: { status: Status | null; location: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const closed = status !== null && !status.open;

  const buy = async () => {
    if (busy || closed) return;
    trackCta(location);
    setBusy(true);
    setError('');
    try {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'checkout' }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
        return;
      }
      setError(d.open === false ? 'All 10 installs for this intake are taken.' : 'Checkout did not load. Refresh and try again, or message us and we will sort it.');
    } catch {
      setError('Checkout did not load. Refresh and try again, or message us and we will sort it.');
    }
    setBusy(false);
  };

  return (
    <div className={className}>
      {closed ? (
        <a
          href="/brandday"
          className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-300 px-7 py-3.5 rounded-full text-[15px] font-semibold"
        >
          This intake is closed. See the Brand Day
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <button
          type="button"
          onClick={buy}
          disabled={busy}
          className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)] disabled:opacity-70"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Lock in for $10,000 AUD
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
      )}
      {!closed && <SpotsLine status={status} />}
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}

/* What they see when Stripe sends them back paid. */
function Paid() {
  const [state, setState] = useState<{ loading: boolean; paid: boolean; firstName: string }>({
    loading: true,
    paid: false,
    firstName: '',
  });

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('session_id') || '';
    fetch(FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'confirm', sessionId: id }),
    })
      .then((r) => r.json())
      .then((d) => setState({ loading: false, paid: Boolean(d.paid), firstName: d.firstName || '' }))
      .catch(() => setState({ loading: false, paid: false, firstName: '' }));
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <SEO title="You're in" description="Founding 90 Day, locked in." path="/founding" noIndex />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <section className="pt-32 pb-24 md:pt-40">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="accent-line mb-8" />
          {state.loading ? (
            <p className="text-zinc-400 flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin" /> Confirming your payment
            </p>
          ) : state.paid ? (
            <>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                {state.firstName ? `You're in, ${state.firstName}.` : "You're in."}
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                Your spot is locked in. Your receipt and tax invoice are on their way to your inbox.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">What happens now:</p>
              <Ticks items={[
                'We set up your WhatsApp channel, on the number you gave at checkout',
                'You get access to every SOP, edit, playbook and training video',
                'You get early access to office hours, so you can jump in and ask',
                'We lock in your Brand Day date',
                '1:1 implementation with your operator starts in January',
              ]} />
              <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
                If you have not heard from us on WhatsApp within 24 hours, reply to your receipt email.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-6">
                We could not confirm that payment yet.
              </h1>
              <p className="text-zinc-400 leading-relaxed mb-8">
                If you were charged, you are locked in and we will be in touch. If you were not, you can go back and try again.
              </p>
              <a href="/founding" className="inline-flex items-center gap-2 text-white font-semibold">
                Back to the offer <ArrowRight className="w-4 h-4" />
              </a>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

const Crosses = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);


/* Proof already public on /brand-day. Same three, same words. */
const PROOF = [
  { name: 'Taki Moore', stat: '+$5M', context: 'from content in 12 months', sub: 'Doubled following. Business up 80%. Team of 8.' },
  { name: 'Jay Wright', stat: '2x', context: 'following and revenue in 12 months', sub: 'Ecommerce brands LSKD and Tiger Lily.' },
  { name: 'Mitch Revs', stat: '19k to 50k', context: 'followers in 2 months', sub: '1.4M organic impressions 3 months straight.' },
];

const Pillar = ({ n, title, items }: { n: string; title: string; items: React.ReactNode[] }) => (
  <div className="glow-card p-8">
    <p className="font-display text-sm font-extrabold text-blue-400 mb-2">{n}</p>
    <p className="text-white text-lg font-semibold mb-5">{title}</p>
    <Ticks items={items} />
  </div>
);

export default function Founding() {
  const paid = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const status = useStatus();
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="90 Day Install"
        description="Stop being the content manager. In 90 days your team gets a working media operating system, built from the playbooks of every 8 figure company I've worked with. $10,000 AUD, closes 30 November."
        path="/founding"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">90 Day Install</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Stop being the content manager.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-500 leading-[1.15] mb-8">
              Your team gets a working media operating system.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-5">
              In 90 days we install the strategy, formats, hooks, SOPs and review rhythm your team needs to publish consistently and turn attention into qualified demand.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Built from the playbooks of every 8 figure company I've worked with. You film. Outside of that, you spend under 5 hours a week on content.
            </p>
            <BuyButton status={status} location="founding-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      {/* PROOF, straight under the promise */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Proof</Label>
            <H2>Built inside 8 figure businesses.</H2>
            {/* Sean's own line, word for word from /offer. */}
            <p className="text-zinc-400 leading-relaxed mt-6">
              I've spent the last 24 months behind the scenes with 7 &amp; 8 figure B2B founders, coaches and consultants doing $200K/month+, turning content into an engine that consistently drives revenue.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {PROOF.map((p) => (
                <div key={p.name} className="glow-card p-6">
                  <p className="font-display text-3xl font-extrabold text-white">{p.stat}</p>
                  <p className="text-zinc-400 text-[14px] mt-1">{p.context}</p>
                  <p className="text-white text-sm font-semibold mt-4">{p.name}</p>
                  <p className="text-zinc-500 text-[13px] mt-1 leading-relaxed">{p.sub}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE INSTALL */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The install</Label>
            <H2>Plan it in a day. Install it in 90.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              Three things get installed, in order.
            </p>
            <div className="space-y-6 mt-8">
              <Pillar n="01" title="Strategy installed" items={[
                'Your Brand Day. One full day in person, included. 10 left at $5,000 AUD before the price doubles',
                'Your buyer, positioning and content pillars',
                'The formats, angles and hooks to double down on',
                'The complete short form and long form playbooks',
              ]} />
              <Pillar n="02" title="Team trained" items={[
                'The full SOP library, across every format',
                'Four weeks of 1:1 implementation with your operator, from January',
                'Two Loom reviews a week on your real content',
                'Training every fortnight',
                <>Hotseat every fortnight <span className="text-zinc-500">(coming soon)</span></>,
              ]} />
              <Pillar n="03" title="System operating" items={[
                'A weekly review rhythm, plus the posting rules',
                <>Office hours every Thursday <span className="text-zinc-500">(Monday coming soon)</span></>,
                'A board meeting every month on the numbers',
                'WhatsApp with us, 24 hour replies',
                'Your workload capped at under 5 hours a week, outside of filming',
              ]} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PAY IN FULL, with the visual layer */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <Label>Pay in full</Label>
              <H2>Pay in full. Start today.</H2>
              <p className="text-zinc-400 leading-relaxed mt-6">
                Implementation starts in January. Pay $10,000 AUD by 30 November and your team gets all of this now.
              </p>
            </div>
          </Section>
          <StartTodayShowcase />
        </div>
      </section>

      <div className="gradient-line" />

      {/* ROLES */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Roles</Label>
            <H2>I install it. Your team runs it.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">Me</p>
                <Ticks items={[
                  'Install the playbooks into your business',
                  'Train your operator to run the rhythm',
                  'Review the real work, every week',
                  'Read the data with you and call the next move',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">Your team</p>
                <Ticks items={[
                  'Film, edit and post',
                  'Turn up to the sessions',
                  'Run the playbooks week to week',
                  'Bring the numbers, honestly',
                ]} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* GUARANTEE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Guarantee</Label>
            <H2>The risk sits with me.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-3">30 day implementation guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If by day 30 your team has not made a material change to how content is planned, produced, reviewed or published, I pay you $5,000 AUD.
                </p>
              </div>
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-3">90 day installation guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If the agreed playbooks and operating rhythm are not installed by day 90, we keep working with you at no extra cost until they are.
                </p>
              </div>
            </div>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-6">
              The condition: your team attends at least 80% of the sessions, and the founder inputs we agree arrive on time.
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
            <H2>You need a proven offer and a team.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">This is for you if you:</p>
                <Ticks items={[
                  'Already do $200K/month+',
                  'Have a proven offer and real expertise',
                  'Already create content, with a team or someone on it',
                  'Want your team running content, so you are not the bottleneck',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">This is not:</p>
                <Crosses items={[
                  'A done for you content agency. Your team films, edits and posts',
                  'A course you watch on your own',
                  'A guarantee of revenue. We agree the metrics and the data tells us what worked',
                  'For founders starting from zero',
                ]} />
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PRICE */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Price</Label>
            <H2>$10,000 AUD. Closes 30 November.</H2>
            <div className="glow-card p-8 md:p-10 mt-8">
              <p className="text-zinc-400 text-[14px] mb-1">Brand Day plus the 90 Day Install</p>
              <p className="font-display text-2xl font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
              <p className="text-zinc-400 text-[14px] mt-5 mb-1">Paid in full by 30 November</p>
              <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD</p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                The install is $15,000 AUD. Pay in full by 30 November and it is $10,000 AUD, plus everything in the pay in full list.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-4">
                I keep active installs low so I can stay close to your team and your data.
              </p>
              <BuyButton status={status} location="founding-price" className="mt-8" />
            </div>
            <p className="text-white text-sm font-semibold mt-12 mb-5">What happens next</p>
            <ol className="space-y-4">
              {[
                'Pay on the secure Stripe checkout.',
                'We set up your WhatsApp straight away.',
                'Your team gets the SOPs, playbooks, training videos and early office hours.',
                'We lock in your Brand Day date.',
                '1:1 implementation with your operator starts in January.',
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

      <Footer />
    </div>
  );
}
