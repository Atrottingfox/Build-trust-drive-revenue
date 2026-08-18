import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';
import { TERMS, TERMS_TITLE, TERMS_VERSION, termsAreComplete } from '../content/install-terms';

/*
  /install - the 90 Day Install hub.

  One page, one template, personalised by ?c=<contactId>. Never a page per
  client: that is how Sean becomes the bottleneck again.

  Three steps, all visible on load. Done ones collapse to a tick, the current
  one is open, later ones are dimmed with what unlocks them. Deliberately not
  accordions: hiding the steps behind clicks is the wrong pattern when the steps
  ARE the task.

  State comes from GHL rather than the browser, so someone who signs on a laptop
  and opens the link on their phone sees where they actually are. The same call
  records that they opened it, which is what makes "where are they up to"
  answerable.
*/

declare global {
  interface Window {
    Stripe?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

/* The recurring weekly slot. Sean creates this event in Calendly; until it
   exists the step shows as coming rather than linking somewhere broken. */
const WEEKLY_CALL_URL = '';

/*
  They have already done the Brand Day, so this overview is about the 90 days
  specifically. It is the three phases from /offer, in the order they happen, so
  the page and the sales page and the agreement all say the same thing.
*/
const PHASES = [
  {
    when: 'Weeks 1 to 4',
    title: 'Install',
    body: 'Short form, long form, lead magnets, the Trojan Horse VSL and the documented Authority Engine get built and wired up. The first cycle runs live, so we test it on real audience.',
    rhythm: 'One 60 minute call a week with you and your key people. One training a week for your team.',
  },
  {
    when: 'Weeks 5 to 12',
    title: 'Tune',
    body: 'Your team runs the cycle and I move to advisor. We tighten hooks, lead magnets, long form structure and the VSL on real data, and test the strongest pieces with your warmest audience.',
    rhythm: 'A 60 minute call a fortnight, a training a week, an Operator Clinic a fortnight, up to one Loom a week, and 24 hour feedback on WhatsApp.',
  },
  {
    when: 'Day 90',
    title: 'What you have',
    body: 'One documented Authority Engine, one repeatable monthly demand cycle, and your operator running the rhythm. You spend under two hours a week on it.',
    rhythm: '',
  },
];

const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private browsing */
    }
  },
};

function StepShell({
  n,
  title,
  state,
  locked,
  children,
}: {
  n: number;
  title: string;
  state: 'done' | 'open' | 'locked';
  locked?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border p-6 sm:p-8 transition-colors ${
        state === 'open'
          ? 'border-zinc-700 bg-zinc-900/40'
          : 'border-zinc-800/80 bg-zinc-950/40'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-sm ${
            state === 'done'
              ? 'bg-emerald-500/15 text-emerald-400'
              : state === 'open'
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-zinc-600'
          }`}
        >
          {state === 'done' ? <Check size={16} /> : n}
        </div>
        <h2
          className={`font-display text-xl ${state === 'locked' ? 'text-zinc-600' : 'text-white'}`}
        >
          {title}
        </h2>
      </div>

      {state === 'locked' && locked && (
        <p className="text-zinc-600 text-sm mt-3 pl-[46px]">{locked}</p>
      )}
      {state !== 'locked' && children && <div className="mt-6">{children}</div>}
    </section>
  );
}

export default function Install() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [paid, setPaid] = useState(false);
  const [callsBooked, setCallsBooked] = useState(false);
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const [embedded, setEmbedded] = useState(false);
  const complete = termsAreComplete();
  const checkoutRef = useRef<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('c') || store.get('ae_contact_id');
    if (!id) return;
    setContactId(id);
    store.set('ae_contact_id', id);

    if (params.get('paid') === '1') setPaid(true);

    /*
      Record the open and read back the real state. GHL is the source of truth
      here, not localStorage, so the link works on any device.
    */
    fetch('/.netlify/functions/track-hub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId: id }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) return;
        if (d.signed) setSigned(true);
        if (d.paid) setPaid(true);
        if (d.callsBooked) setCallsBooked(true);
      })
      .catch(() => {
        /* The page still works. It just starts at step 1. */
      });
  }, []);

  const sign = async () => {
    if (!name.trim() || !agreed || signing) return;
    setSigning(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/sign-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: contactId || store.get('ae_contact_id'),
          signatureName: name.trim(),
          termsVersion: TERMS_VERSION,
        }),
      });
      if (!(await res.json())?.ok) throw new Error('sign failed');
      setSigned(true);
    } catch {
      setError('Something went wrong saving your signature. Try again, or reply to my email.');
    } finally {
      setSigning(false);
    }
  };

  // Calendly, only once the weekly slot step can actually be reached.
  useEffect(() => {
    if (!paid || !WEEKLY_CALL_URL) return;
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, [paid]);

  useEffect(() => {
    if (!signed || paid) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/.netlify/functions/install-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId: contactId || store.get('ae_contact_id') }),
        });
        const data = await res.json();
        if (!data?.configured || !data.clientSecret) return;

        if (!document.querySelector('script[data-stripe-js]')) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://js.stripe.com/v3/';
            s.async = true;
            s.setAttribute('data-stripe-js', 'true');
            s.onload = () => resolve();
            s.onerror = () => reject();
            document.body.appendChild(s);
          });
        }
        if (cancelled) return;

        const stripe = window.Stripe?.(STRIPE_PUBLISHABLE_KEY);
        if (!stripe) return;
        checkoutRef.current = await stripe.initEmbeddedCheckout({ clientSecret: data.clientSecret });
        if (cancelled) return checkoutRef.current?.destroy();
        checkoutRef.current.mount('#install-checkout');
        setEmbedded(true);
      } catch {
        /* falls through to the line under the empty panel */
      }
    })();

    return () => {
      cancelled = true;
      try {
        checkoutRef.current?.destroy();
      } catch {
        /* already gone */
      }
    };
  }, [signed, paid, contactId]);

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              {TERMS_TITLE}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              You have done the Day. Here is what the next 90 look like, and the three
              things to sort before we start.
            </p>
          </div>

          {/* The 90 days specifically. They have already done the Brand Day. */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 mb-4">
            <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-6">
              What the next 90 days look like
            </p>

            <div className="space-y-7">
              {PHASES.map((phase) => (
                <div key={phase.title} className="grid sm:grid-cols-[110px_1fr] gap-2 sm:gap-5">
                  <p className="text-zinc-500 text-[13px] font-medium sm:pt-0.5">{phase.when}</p>
                  <div>
                    <p className="text-white text-[15px] font-medium mb-1.5">{phase.title}</p>
                    <p className="text-zinc-400 text-[15px] leading-relaxed">{phase.body}</p>
                    {phase.rhythm && (
                      <p className="text-zinc-500 text-sm leading-relaxed mt-2">{phase.rhythm}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mt-7 pt-6 border-t border-zinc-800">
              I provide the strategy, frameworks and advisory. Your team implements, led by your
              Media Owner. AUD $10,000 for the 90 days, paid $5,000 today and $5,000 in 30 days.
              There is no third payment: the day 60 instalment is waived because you came through
              a Brand Builder Day.
            </p>
          </div>

          <div className="space-y-4">

            {/* 1 - read and sign */}
            <StepShell n={1} title="Read it and sign" state={signed ? 'done' : 'open'}>
              {signed ? null : (
                <>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 max-h-[420px] overflow-y-auto space-y-6">
                    {TERMS.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-white text-[15px] font-medium mb-2">{section.heading}</h3>
                        <div className="space-y-2.5">
                          {section.body.map((para, i) => (
                            <p key={i} className="text-zinc-400 text-[14.5px] leading-relaxed">
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                    <p className="text-zinc-600 text-xs">Version {TERMS_VERSION}</p>
                  </div>

                  {!complete ? (
                    <p className="text-zinc-500 text-sm mt-6">
                      This agreement is still being finalised. Signing opens once it is.
                    </p>
                  ) : (
                    <div className="mt-7">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Type your full name to sign
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />

                      <label className="flex items-start gap-3 mt-5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 h-4 w-4 accent-blue-500 shrink-0"
                        />
                        <span className="text-zinc-400 text-sm leading-relaxed">
                          I have read the agreement, I am authorised to enter into it, and I agree
                          to both instalments of $5,000.
                        </span>
                      </label>

                      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

                      <button
                        onClick={sign}
                        disabled={signing}
                        className={`mt-7 w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${
                          name.trim() && agreed && !signing
                            ? 'bg-white text-black hover:bg-zinc-100'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {signing ? 'Saving' : 'Sign the agreement'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </StepShell>

            {/* 2 - pay */}
            <StepShell
              n={2}
              title={paid ? 'First payment received' : 'Your payment plan'}
              state={paid ? 'done' : signed ? 'open' : 'locked'}
              locked="Unlocks once you have signed."
            >
              {paid ? (
                <p className="text-zinc-400 leading-relaxed">
                  $5,000 received. The second runs automatically to the same card in 30 days, and
                  your receipt is in your inbox.
                </p>
              ) : (
                <>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    $5,000 today, $5,000 in 30 days, to the same card. Nothing after that.
                  </p>
                  <div id="install-checkout" className="w-full" />
                  {!embedded && (
                    <p className="text-zinc-500 text-sm">
                      Loading the payment form. If it does not appear, reply to my email.
                    </p>
                  )}
                </>
              )}
            </StepShell>

            {/* 3 - weekly call */}
            <StepShell
              n={3}
              title={callsBooked ? 'Weekly slot locked' : 'Lock your weekly slot'}
              state={callsBooked ? 'done' : paid ? 'open' : 'locked'}
              locked="Unlocks once your first payment is through."
            >
              {callsBooked ? (
                <p className="text-zinc-400 leading-relaxed">
                  Booked. See you then. Bring your Media Owner.
                </p>
              ) : WEEKLY_CALL_URL ? (
                <>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Pick one time that works every week for the first four weeks. Same slot each
                    week, with your Media Owner in the room.
                  </p>
                  <div
                    className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                    data-url={`${WEEKLY_CALL_URL}?hide_gdpr_banner=1&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6${
                      contactId ? `&utm_content=${encodeURIComponent(contactId)}` : ''
                    }`}
                    style={{ minWidth: 280, height: 700 }}
                  />
                </>
              ) : (
                <p className="text-zinc-400 leading-relaxed">
                  I will send you the calendar link to lock your weekly slot. Same time every week
                  for the first four weeks, with your Media Owner in the room.
                </p>
              )}
            </StepShell>
          </div>

          <p className="text-zinc-600 text-xs text-center mt-10">
            Questions about any of this? Reply to my email before you sign.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
