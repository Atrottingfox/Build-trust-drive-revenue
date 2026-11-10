import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
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

/* A named deliverable with one plain line on what it actually is. Same shape
   as the deliverable lists on /offer and /morgan. */
const Item = ({ name, children, soon }: { name: string; children: React.ReactNode; soon?: boolean }) => (
  <li className="flex items-start gap-3">
    <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
    <span className="text-[15px] leading-relaxed">
      <span className="text-white font-semibold">{name}</span>
      <span className="text-zinc-400"> {children}</span>
      {soon && <span className="text-zinc-500"> Coming soon.</span>}
    </span>
  </li>
);

export default function Founding() {
  const paid = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const status = useStatus();
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="90 Day Install"
        description="8 figure playbooks, installed in 90 days. Your team runs them. You film. Brand Day plus 90 days of implementation. 10 spots, open until 30 November."
        path="/founding"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">90 Day Install</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              8 figure playbooks. Installed in 90 days.
            </h1>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-500 leading-[1.15] mb-8">
              Your team runs them. You film.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-5">
              I built these playbooks from every 8 figure company I've worked with. Your team learns which formats, angles and hooks are working, and doubles down on them. So you can blitz past them.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Under 5 hours a week from you, plus filming. More only if you want to.
            </p>
            <BuyButton status={status} location="founding-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT YOU GET */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The offer</Label>
            <H2>Plan it in a day. Install it in 90.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6">
              Your Brand Day sets the strategy. The next 90 days put it to work with your team.
            </p>
            <div className="glow-card border-blue-500/20 p-8 mt-8">
              <p className="text-white text-sm font-semibold mb-2">The Brand Day</p>
              <p className="text-zinc-400 text-[15px] leading-relaxed">
                One full day in person. We map your brand, your exact buyer, what they need to believe before they buy, and the content that gets them there. There are 10 Brand Days left at $5,000 before the price doubles to $10,000. One is included here.
              </p>
            </div>
            <div className="glow-card p-8 mt-6">
              <p className="text-white text-sm font-semibold mb-5">The 90 days</p>
              <ul className="space-y-4">
                <Item name="WhatsApp, 24 hour replies.">Set up the moment you buy.</Item>
                <Item name="Two Loom reviews a week.">On your real content, so your team learns from their own work.</Item>
                <Item name="Four weeks of 1:1s with your operator.">Starts in January, after your Brand Day.</Item>
                <Item name="Office hours every Thursday.">Get answers live. Mondays coming soon.</Item>
                <Item name="Training every fortnight.">For you and your team.</Item>
                <Item name="Hotseat every fortnight." soon>Your content, reviewed live.</Item>
                <Item name="Board meeting every month.">We read the numbers and set the next move.</Item>
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* FAST ACTION */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Pay in full</Label>
            <H2>Pay in full. Start today.</H2>
            <p className="text-zinc-400 leading-relaxed mt-6 mb-8">
              Implementation starts in January. Pay $10,000 by 30 November and your team gets all of this now.
            </p>
            <ul className="space-y-4">
              <Item name="Every SOP.">The ones we run with clients, across every format.</Item>
              <Item name="Every edit.">Plus the review cadence and posting rules.</Item>
              <Item name="Every training video.">The full library.</Item>
              <Item name="Both playbooks.">Short form and long form, complete.</Item>
              <Item name="Office hours, early.">Jump in and ask before we start.</Item>
              <Item name="WhatsApp, from today.">Answers before the end of the year.</Item>
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO DOES WHAT */}
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
                  'Turn up to the calls',
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
            <H2>I pay you $5,000 if nothing changes.</H2>
            <div className="glow-card border-blue-500/20 p-8 md:p-10 mt-8 space-y-5">
              <p className="text-zinc-300 leading-relaxed">
                If you can't see a material change in your team by day 30, I'll pay you $5,000 for your time.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                If the playbooks aren't installed by day 90, we keep working with you until they are.
              </p>
              <p className="text-zinc-500 text-[15px] leading-relaxed">
                One condition. Your team turns up to 80% of the meetings.
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
            <H2>$10,000. 10 spots. Closes 30 November.</H2>
            <div className="glow-card p-8 md:p-10 mt-8">
              <p className="text-zinc-400 text-[14px] mb-1">Brand Day plus 90 days of implementation</p>
              <p className="font-display text-2xl font-extrabold text-zinc-600 line-through decoration-zinc-600">$15,000 AUD</p>
              <p className="text-zinc-400 text-[14px] mt-5 mb-1">Paid in full by 30 November</p>
              <p className="font-display text-5xl font-extrabold text-white">$10,000 AUD</p>
              <p className="text-zinc-300 leading-relaxed mt-6">
                Normally $15,000. Pay in full by 30 November and it's $10,000, plus everything in the pay in full list.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Only 10 spots. I keep active installs low so I can stay close to your team and your data.
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
