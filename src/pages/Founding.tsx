import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { trackCta } from '../lib/track';

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
  if (!status || status.remaining === null) {
    return <p className="text-zinc-500 text-sm mt-4">10 spots only. Open until 30 November.</p>;
  }
  return (
    <p className="text-zinc-500 text-sm mt-4">
      <span className="text-white font-semibold">{status.remaining} of {status.total} spots left.</span> Open until 30 November.
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
      setError(d.open === false ? 'All 10 spots are gone.' : 'Checkout did not load. Refresh and try again, or message us and we will sort it.');
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
          Founding spots are closed. See the Brand Day
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
          Lock in for $10,000
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

export default function Founding() {
  const paid = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const status = useStatus();
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Founding 90 Day"
        description="In 90 days you'll have the exact playbooks built from every 8 figure company we've worked with, installed. Brand Day plus 90 days of implementation. 10 spots, open until 30 November."
        path="/founding"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">The Authority Engine - Founding 90 Day</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              In 90 days you'll have the exact playbooks I've built from every 8 figure company I've worked with.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-500 leading-[1.15] mb-8">
              Installed, to help you blitz past them.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-5">
              This is an operator enablement program.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-5">
              A simple content system that lets your team analyse, assess and prioritise the formats, angles and hooks to double down on.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              While the founder spends less than 5 hours per week on content outside of filming, unless they want to.
            </p>
            <BuyButton status={status} location="founding-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* THE PROGRAM */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The program</Label>
            <H2>The entire Brand Day, plus 90 days of implementation.</H2>
            <div className="glow-card border-blue-500/20 p-8 mt-8">
              <p className="text-white text-sm font-semibold mb-2">The Brand Day</p>
              <p className="text-zinc-400 text-[15px] leading-relaxed">
                The full in person Brand Day. Your brand, your exact buyer, the beliefs that drive the purchase, and the content required to move them. There are another 10 Brand Days before they double in price to $10,000. One is included here.
              </p>
            </div>
            <div className="glow-card p-8 mt-6">
              <p className="text-white text-sm font-semibold mb-5">90 days of implementation</p>
              <Ticks items={[
                '24 hour async communication via WhatsApp, set up as soon as you click buy',
                '2 x Loom reviews per week',
                '4 weeks of 1:1 implementation with an operator. Starts January, after your Brand Day',
                <>Weekly office hours every Thursday <span className="text-zinc-500">(Monday coming soon)</span></>,
                'Fortnightly training',
                <>Fortnightly hotseat <span className="text-zinc-500">(coming soon)</span></>,
                'Monthly board meetings',
              ]} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FAST ACTION */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Fast action</Label>
            <H2>Pay in full now and you start before we start.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              The product is built. Take the $10,000 now and you get all of this straight away:
            </p>
            <Ticks items={[
              'Access to all the SOPs we run with our clients, across all formats',
              'Every edit we have worked through, plus the review cadence and posting rules',
              'Full access to the training videos',
              'All the complete playbooks for short form and long form',
              'Early access to office hours before we start, so you can jump in and ask',
              'Async WhatsApp communication before the end of the year',
            ]} />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* GUARANTEE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The guarantee</Label>
            <div className="glow-card border-blue-500/20 p-8 md:p-10">
              <p className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.3]">
                If you don't have the playbooks installed, we'll work with you until you do, so long as your team turn up to 80% of the meetings.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                And if by day 30 you can't see a material change in the team, we'll pay you $5,000 for your time.
              </p>
            </div>
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
            <div className="mt-8">
              <Ticks items={[
                '7 and 8 figure founders, coaches and consultants',
                'A proven offer and real expertise',
                'Already creating content, with a team or someone on it',
                'You want the team running the system, not the founder',
              ]} />
            </div>
            <p className="text-zinc-500 text-[15px] leading-relaxed mt-8">
              Not for founders starting from zero.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* INVESTMENT */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Investment</Label>
            <div className="glow-card p-8 md:p-10">
              <p className="text-zinc-400 text-[14px] mb-1">Brand Day plus 90 days of implementation</p>
              <p className="font-display text-2xl font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
              <p className="text-zinc-400 text-[14px] mt-5 mb-1">Fast action, paid in full</p>
              <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD</p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                <span className="text-white font-semibold">10 spots.</span> Open until the end of November, then it closes. Everything above, plus every fast action bonus.
              </p>
              <BuyButton status={status} location="founding-investment" className="mt-8" />
            </div>
            <ol className="space-y-4 mt-12">
              {[
                'Click buy and pay on the secure Stripe checkout.',
                'WhatsApp is set up as soon as you buy.',
                'You get the SOPs, playbooks, training videos and early office hours straight away.',
                'We lock in your Brand Day.',
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
