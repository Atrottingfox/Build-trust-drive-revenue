import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { trackCta } from '../lib/track';
import { usePageVisits } from '../lib/pageVisits';
import StartTodayShowcase from '../components/founding/StartTodayShowcase';
import FoundingFaq from '../components/founding/FoundingFaq';
import VslPlayer from '../components/founding/VslPlayer';
import ReviewForm from '../components/founding/ReviewForm';

/*
  /founding. The founding 90 Day offer, bought straight off the page.

  Same look as /brandday. The difference is the button: it goes to Stripe, not
  to /builder. netlify/functions/founding-checkout.ts creates the session,
  counts the spots, closes the offer at 5 sales or the end of 30 November, and
  confirms the payment when Stripe sends them back here with ?paid=1.
*/

const FN = '/.netlify/functions/founding-checkout';

/* GA4 ecommerce events, so the funnel shows where people drop off. Never load
   bearing: a blocked analytics script must not stop a checkout. */
function ga(event: string, extra: Record<string, unknown> = {}) {
  try {
    window.gtag?.('event', event, {
      currency: 'AUD',
      value: 10000,
      items: [{ item_id: 'founding-90', item_name: 'Founding 90 Day Install', price: 10000, quantity: 1 }],
      ...extra,
    });
  } catch {
    /* analytics is never load bearing */
  }
}

export function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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

export const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">{children}</p>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{children}</h2>
);

export const Ticks = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <Check className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

export type Status = { open: boolean; remaining: number | null; total: number; configured?: boolean; closesAt?: string };

/* Same deadline the checkout enforces. The server's value wins when it loads. */
const CLOSES_AT = '2026-12-01T00:00:00+10:00';

/* Shared across every buy button on the page, so they all agree. */
export function useStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    fetch(FN)
      .then((r) => r.json())
      .then((d) => setStatus({ open: Boolean(d.open), remaining: d.remaining ?? null, total: d.total ?? 5, configured: d.configured, closesAt: d.closesAt }))
      .catch(() => setStatus({ open: true, remaining: null, total: 5 }));
  }, []);
  return status;
}

/* A real countdown to the real deadline. Ticks once a minute, shows nothing
   once the time is up (the button handles that). */
export function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  const ms = new Date(iso).getTime() - now;
  if (!(ms > 0)) return '';
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
}

export function SpotsLine({ status }: { status: Status | null }) {
  /* Sean's three lines, 11 Nov. The first carries the live count once a spot sells. */
  /* The hero already says 5 spots, starting in January, so the count only
     shows here once one has sold. */
  const spots = status && status.remaining !== null && status.remaining < status.total
    ? `${status.remaining} of ${status.total} spots left`
    : '';
  const countdown = useCountdown(status?.closesAt || CLOSES_AT);
  return (
    <div className="mt-5">
      <ul className="space-y-1.5">
        {[spots, 'Secure yours now to get access today', 'Access to our resource library and advisory'].filter(Boolean).map((t, i) => (
          <li key={t} className="flex items-center gap-2.5 text-sm">
            <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className={i === 0 && spots ? 'text-white font-semibold' : 'text-zinc-300'}>{t}</span>
          </li>
        ))}
      </ul>
      {countdown && (
        <p className="text-sm text-blue-400 font-semibold tabular-nums mt-3">Closes 30 November. {countdown} left</p>
      )}
    </div>
  );
}

/* Once the intake is full or closed, the button becomes this. */
function Waitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'busy') return;
    setState('busy');
    try {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'waitlist', email, name }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };
  if (state === 'done') {
    return <p className="text-white font-semibold">You're on the list. You'll hear first when the next intake opens.</p>;
  }
  return (
    <form onSubmit={submit} className="max-w-md">
      <p className="text-white font-semibold mb-1">This intake is closed.</p>
      <p className="text-zinc-400 text-sm mb-4">Join the waitlist and hear first when the next one opens.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          aria-label="Name"
          className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-white text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-blue-400"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-white text-[15px] placeholder:text-zinc-400 focus:outline-none focus:border-blue-400"
        />
      </div>
      <button
        type="submit"
        disabled={state === 'busy'}
        className="mt-3 inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold disabled:opacity-70"
      >
        {state === 'busy' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Join the waitlist
      </button>
      {state === 'error' && <p className="text-red-400 text-sm mt-3">That did not go through. Check the email and try again.</p>}
    </form>
  );
}

/* Mobile only. Appears once the hero is gone, hides at the price card so it
   never sits on top of the real button, and disappears when the intake closes. */
/* revealAt: an element id. Until the reader reaches it the bar leads with the
   spots and countdown, not the price (/founding-v2). Without it, the price
   shows the whole way (/founding). */
export function StickyBar({ status, revealAt }: { status: Status | null; revealAt?: string }) {
  const [show, setShow] = useState(false);
  const [priced, setPriced] = useState(!revealAt);
  const countdown = useCountdown(status?.closesAt || CLOSES_AT);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const price = document.getElementById('price');
      const pastHero = window.scrollY > 700;
      const atPrice = price ? price.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atPrice);
      if (revealAt) {
        const mark = document.getElementById(revealAt);
        setPriced(mark ? mark.getBoundingClientRect().top < window.innerHeight * 0.6 : false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealAt]);
  if (status && !status.open) return null;

  const left = status && status.remaining !== null ? `${status.remaining} of ${status.total} spots left` : '5 spots';
  const buy = async () => {
    if (busy) return;
    trackCta('founding-sticky');
    ga('begin_checkout', { cta_location: 'founding-sticky' });
    setBusy(true);
    try {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'checkout', testEmail: new URLSearchParams(window.location.search).get('test') || undefined }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
        return;
      }
    } catch {
      /* Fall through to the price card, which shows the full error. */
    }
    setBusy(false);
    document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#0b0c10]/95 backdrop-blur px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {priced ? (
            <>
              <p className="text-white text-[15px] font-semibold leading-tight">$10,000 AUD</p>
              <p className="text-zinc-400 text-[12px] leading-tight mt-0.5">{left}. Closes 30 Nov.</p>
            </>
          ) : (
            <>
              <p className="text-white text-[15px] font-semibold leading-tight">5 spots, starting in January</p>
              <p className="text-zinc-400 text-[12px] leading-tight mt-0.5 tabular-nums">{countdown ? `Closes 30 Nov. ${countdown} left` : 'Closes 30 Nov.'}</p>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={buy}
          disabled={busy}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-[14px] font-semibold disabled:opacity-70"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Lock in
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export function BuyButton({ status, location, className = '' }: { status: Status | null; location: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const closed = status !== null && !status.open;

  const buy = async () => {
    if (busy || closed) return;
    trackCta(location);
    ga('begin_checkout', { cta_location: location });
    setBusy(true);
    setError('');
    try {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'checkout', testEmail: new URLSearchParams(window.location.search).get('test') || undefined }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
        return;
      }
      setError(d.open === false ? 'All 5 intro spots are taken.' : 'Checkout did not load. Refresh and try again, or message us and we will sort it.');
    } catch {
      setError('Checkout did not load. Refresh and try again, or message us and we will sort it.');
    }
    setBusy(false);
  };

  return (
    <div className={className}>
      {closed ? (
        <Waitlist />
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
  const [state, setState] = useState<{ loading: boolean; paid: boolean; firstName: string; portalUrl?: string | null }>({
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
      .then((d) => {
        setState({ loading: false, paid: Boolean(d.paid), firstName: d.firstName || '', portalUrl: d.portalUrl || null });
        if (d.paid) {
          let seen = false;
          try { seen = localStorage.getItem('ga_purchase_' + id) === '1'; localStorage.setItem('ga_purchase_' + id, '1'); } catch { /* private window */ }
          if (!seen) ga('purchase', { transaction_id: id });
        }
      })
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
              {state.portalUrl && (
                <a href={state.portalUrl} className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors mb-10">
                  Set up your portal <ArrowRight className="w-4 h-4" />
                </a>
              )}
              <p className="text-zinc-400 leading-relaxed mb-6">What happens now:</p>
              <Ticks items={[
                'We set up your WhatsApp channel, on the number you gave at checkout',
                'You receive the Start Here workspace and pre install materials',
                'Your team gets every SOP, edit, playbook and training video',
                'An advisory board call before you start',
                'We lock in your Brand Day date',
                '1:1 guided implementation starts January',
              ]} />
              <p className="text-zinc-400 text-[15px] leading-relaxed mt-8">
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

export const Crosses = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <X className="w-4 h-4 text-zinc-600 mt-1 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);




/* A titled group of ticks, used for the three outcomes and what you receive. */
const Group = ({ title, items, n }: { title: string; items: React.ReactNode[]; n?: string }) => (
  <div className="glow-card p-8">
    {n && <p className="font-display text-sm font-extrabold text-blue-400 mb-2">{n}</p>}
    <p className="text-white text-lg font-semibold mb-5">{title}</p>
    <Ticks items={items} />
  </div>
);

export const PHASES = [
  {
    n: 'Phase 1', name: 'Install', weeks: 'Weeks 1 to 4',
    lead: 'We build and launch the system. Your Brand Day creates the blueprint, then we run it straight away on real content.',
    items: ['Brand and positioning', 'Audience and buyer beliefs', 'Content strategy', 'Format selection', 'Weekly content rhythm', 'Capture workflow', 'Editing and approval standards', 'Publishing process', 'First live content cycle'],
  },
  {
    n: 'Phase 2', name: 'Transfer', weeks: 'Weeks 5 to 8',
    lead: 'Your operator runs the system with support.',
    items: ['Weekly implementation review', 'Training every fortnight', 'Real content reviewed in context', 'Workflow bottlenecks corrected', 'Standards tightened', 'Scoreboard established'],
  },
  {
    n: 'Phase 3', name: 'Operate and improve', weeks: 'Weeks 9 to 12',
    lead: 'Your team runs the strategy.',
    items: ['Operator owns the weekly rhythm', 'Founder involvement drops', 'Content performance reviewed', 'Strong formats and topics repeated', 'Weak points fixed', 'The next 90 day plan created'],
  },
];

export default function Founding({ review = false }: { review?: boolean }) {
  const paid = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paid') === '1';
  const status = useStatus();
  /* Personal links: /founding?for=jane-smith (or ?c=<GHL contact id>) post the
     visit, time on page, scroll depth and clicks to Slack. Plain visits are not
     tracked, so the channel only carries people Sean sent the link to. */
  const personal = typeof window !== 'undefined' && /[?&](for|c)=/.test(window.location.search);
  usePageVisits('/founding', '90 Day Install', personal && !paid);
  if (paid) return <Paid />;

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="90 Day Install"
        description="Stop being the content manager. Install the system your team runs. Built from playbooks created alongside the six 8 figure+ B2B companies we've worked with. Intro offer for 5 founders starting in January. $10,000 AUD, closes 30 November."
        path={review ? '/founding-review' : '/founding'}
        image="https://authorityengine.com.au/og-founding.jpg"
        noIndex={review}
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {review && (
        <div className="pt-28 -mb-20 md:-mb-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="glow-card border-blue-500/30 p-5 md:p-6">
              <p className="text-white font-semibold">You're seeing the Founding 5 page before it goes wide.</p>
              <p className="text-zinc-300 text-[15px] mt-1">Read it like a founder would, then tell me what you'd change. The form is at the bottom.</p>
              <a href="#feedback" className="inline-block text-blue-400 font-semibold text-[15px] mt-3">Jump to the form</a>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
            {/* Sean's line, 11 Nov 2026. */}
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              Built from playbooks created alongside the six 8 figure+ B2B companies we've worked with.
            </p>
            <p className="text-blue-400 font-semibold leading-relaxed mb-6">
              5 spots, starting in January.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              For 7 and 8 figure B2B founders, coaches and consultants already doing $200K/month or more.
            </p>
            <BuyButton status={status} location="founding-hero" className="mt-10" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT THIS INSTALLS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
        </div>
      </section>

      <div className="gradient-line" />

      {/* THREE OUTCOMES */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>The three outcomes</Label>
            <H2>Three outcomes by day 90.</H2>
            <div className="space-y-6 mt-8">
              <Group n="01" title="Strategy installed. Your team knows:" items={[
                'Who the content is for',
                'What the brand stands for',
                'What the business should be known for',
                'Which buyer beliefs content must create',
                'Which formats and channels matter',
                'What content to make each week',
              ]} />
              <Group n="02" title="Team trained. Your operator learns to:" items={[
                'Run the weekly content plan',
                'Coordinate capture',
                'Brief editors',
                'Use the production and editing SOPs',
                'Approve content against objective standards',
                'Publish and log content',
                'Read the scorecard',
                'Decide what to repeat, improve or remove',
              ]} />
              <Group n="03" title="System operating. Your business has:" items={[
                'A repeatable content rhythm',
                'A documented workflow',
                'Clear ownership',
                'Format cards',
                'Production and editing SOPs',
                'Universal content standards',
                'A publishing process',
                'A weekly review loop',
                'A scoreboard connected to qualified demand',
              ]} />
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>How it works</Label>
            <H2>Install. Transfer. Operate.</H2>
            <div className="space-y-6 mt-8">
              {PHASES.map((ph) => (
                <div key={ph.n} className="glow-card p-8">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <p className="font-display text-sm font-extrabold text-blue-400">{ph.n}</p>
                    <p className="text-white text-lg font-semibold">{ph.name}</p>
                    <p className="text-zinc-400 text-sm">{ph.weeks}</p>
                  </div>
                  <p className="text-zinc-400 text-[15px] leading-relaxed mb-5">{ph.lead}</p>
                  <div className="grid sm:grid-cols-2 gap-x-6">
                    <Ticks items={ph.items} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed mt-8">
              By the end, your team knows what to do next without asking you every time.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <Label>What you receive</Label>
              <H2>Everything your team runs from.</H2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Group title="Foundation" items={['Brand Bible', 'Positioning and perspective', 'ICP and buyer profile', 'Buyer belief map', 'Content and demand map']} />
              <Group title="Strategy" items={['Short form operating system', 'Long form operating system', 'Attraction playbook', 'Nurture playbook', 'Conversion pathway', 'Format library', 'Hook and topic systems', 'Content allocation rules']} />
              <Group title="Production" items={['Plan, capture, produce workflow', 'Capture calendar', 'Production SOPs', 'Directing standards', 'Upload and handoff system']} />
              <Group title="Post production" items={['Editing SOPs', 'Universal Content Standard', 'Editing Standard', 'Format specific QC', 'Approval and revision process', 'Asset bank']} />
              <Group title="Distribution and review" items={['Package and schedule process', 'Publish and review SOP', 'Weekly scorecard', 'Performance review rhythm', 'Repeat, improve, remove decisions']} />
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
                1:1 guided implementation starts January. Pay $10,000 AUD by 30 November and your team gets all of this now.
              </p>
            </div>
          </Section>
          <StartTodayShowcase />
        </div>
      </section>

      <div className="gradient-line" />

      {/* SUPPORT */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Support and implementation</Label>
            <H2>Support until it runs without me.</H2>
            <div className="glow-card p-8 mt-8">
              <Ticks items={[
                'One Brand Day',
                '1:1 guided implementation starts January, four weeks with your operator',
                'One team call per week during installation',
                'Training every fortnight',
                <>Operator hotseat every fortnight <span className="text-zinc-400">(coming soon)</span></>,
                'Two Loom reviews per week during active implementation',
                <>Weekly advisory sessions, every Thursday <span className="text-zinc-400">(Monday coming soon)</span></>,
                'Monthly founder and operator board review',
                'WhatsApp implementation support, 24 hour replies, during the agreed support window',
              ]} />
            </div>
            <p className="text-zinc-400 leading-relaxed mt-6">
              The support is there to install the system, so your team stops needing me.
            </p>
          </Section>
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
                <p className="text-white text-sm font-semibold mb-5">My role</p>
                <Ticks items={[
                  'Architect the system',
                  'Install the playbooks',
                  'Train your operator',
                  'Review the real work',
                  'Diagnose bottlenecks',
                  'Read the data',
                  'Recommend the next move',
                ]} />
              </div>
              <div className="glow-card p-8">
                <p className="text-white text-sm font-semibold mb-5">Your team's role</p>
                <Ticks items={[
                  'Film',
                  'Edit',
                  'Publish',
                  'Attend the sessions',
                  'Run the weekly rhythm',
                  'Bring the numbers honestly',
                  'Implement the agreed changes',
                ]} />
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed mt-6">
              The founder provides expertise and appears on camera where required. The team owns the rest.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

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

      <div className="gradient-line" />

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

      <div className="gradient-line" />

      {/* GUARANTEE */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Guarantees</Label>
            <H2>The risk sits with me.</H2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="glow-card border-blue-500/20 p-8">
                <p className="text-white text-sm font-semibold mb-3">30 day implementation guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If, by day 30, your team has not made a material change to how content is planned, produced, reviewed or published, I will refund $5,000 AUD.
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
                <p className="text-white text-sm font-semibold mb-3">90 day installation guarantee</p>
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  If the agreed Authority Engine is not installed by day 90, we continue working with you at no additional cost until it is.
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

      <div className="gradient-line" />

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

      <div className="gradient-line" />

      {/* PRICE */}
      <section id="price" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
                <p className="text-white font-semibold">Your Brand Day is included.</p>
                <p className="text-zinc-300 text-[15px] mt-1">There are 11 Brand Days left at $5,000. After that the price goes to <span className="text-white font-semibold">$10,000</span>.</p>
              </div>
              <BuyButton status={status} location="founding-price" className="mt-8" />
            </div>
            <p className="text-white text-sm font-semibold mt-12 mb-5">What happens next</p>
            <ol className="space-y-4">
              {[
                'Lock in your place on the secure Stripe checkout.',
                'We set up your WhatsApp straight away.',
                'Receive the Start Here workspace and pre install materials.',
                'Book your Brand Day.',
                'Your team gets access to the training and systems.',
                '1:1 guided implementation starts January.',
                'Your first live content cycle runs straight away.',
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

      <div className="gradient-line" />

      {/* CLOSE */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Stop being the content manager.
            </h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-400 leading-[1.15] mt-4">
              Install the system your team runs.
            </p>
            <div className="flex justify-center">
              <BuyButton status={status} location="founding-close" className="mt-10" />
            </div>
          </Section>
        </div>
      </section>

      {review && (
        <>
          <div className="gradient-line" />
          <section id="feedback" className="py-20 md:py-28">
            <div className="max-w-2xl mx-auto px-6 lg:px-8">
              <Label>Your feedback</Label>
              <H2>What would you change?</H2>
              <p className="text-zinc-400 leading-relaxed mt-4 mb-10">Be blunt. It goes straight to Sean.</p>
              <ReviewForm />
            </div>
          </section>
        </>
      )}

      {!review && <StickyBar status={status} />}
      <div className="h-20 md:hidden" />
      <Footer />
    </div>
  );
}
