import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import { Agreement, StepShell } from '../components/AgreementSteps';
import {
  AGREEMENT,
  TERMS_TITLE,
  TERMS_VERSION,
  termsAreComplete,
} from '../content/undeniability-advisory-terms';

/*
  /advisory, password Scale. Rhys Livingstone's ongoing advisory.

  Sean, 16 Oct 2026: a $4,000 a month commitment for 12 months, charged as
  $4,000 + GST. Read and sign, then the first month is paid here and the rest
  run automatically (netlify/functions/advisory.ts). Stripe stops it after the
  twelfth payment.

  Replaced the old public $3,000 Advisory sales page on this route. That file,
  pages/Advisory.tsx, is kept but unrouted.

  ?test=1 walks it for $1 a month.
*/

declare global {
  interface Window {
    Stripe?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

const FN = '/.netlify/functions/advisory';
const SIG_KEY = 'ae_advisory_rhys_sig';

type Sig = { name: string; version: string; signedAt: string };

const store = {
  get(): Sig | null {
    try {
      const s = JSON.parse(localStorage.getItem(SIG_KEY) || 'null');
      return s?.version === TERMS_VERSION ? s : null;
    } catch {
      return null;
    }
  },
  set(s: Sig) {
    try {
      localStorage.setItem(SIG_KEY, JSON.stringify(s));
    } catch {
      /* private browsing */
    }
  },
};

const fmtDate = (s: number) =>
  new Date(s * 1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

function AdvisoryPage() {
  const [test] = useState(() => new URLSearchParams(window.location.search).get('test') === '1');
  const [sig, setSig] = useState<Sig | null>(() => store.get());
  const [paid, setPaid] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [scheduleFailed, setScheduleFailed] = useState(false);
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const [embedded, setEmbedded] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const complete = termsAreComplete();
  const checkoutRef = useRef<any>(null);
  const verifySent = useRef(false);
  const unit = test ? '$1' : '$4,400';

  /* Back from Stripe. The session id is checked server side, and that call is
     what sets the 12 month end date. Safe to repeat. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (params.get('paid') !== '1' || !sessionId || verifySent.current) return;
    verifySent.current = true;
    setPaid(true);
    fetch(FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', sessionId }),
    })
      .then((r) => r.json())
      .then((v) => {
        if (v?.verified && v.paid === false) return setPaid(false);
        if (v?.endsAt) setEndsAt(v.endsAt);
        if (v?.paid && !v.scheduled) setScheduleFailed(true);
      })
      .catch(() => setScheduleFailed(true));
  }, []);

  const sign = async () => {
    if (!name.trim() || !agreed || signing) return;
    setSigning(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/undeniability-part2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sign',
          offer: 'advisory',
          signatureName: name.trim(),
          termsVersion: TERMS_VERSION,
          test,
        }),
      });
      const d = await res.json();
      if (!d?.ok) throw new Error('sign failed');
      const s = { name: name.trim(), version: TERMS_VERSION, signedAt: d.signedAt };
      store.set(s);
      setSig(s);
    } catch {
      setError('Something went wrong saving your signature. Try again, or message me.');
    } finally {
      setSigning(false);
    }
  };

  useEffect(() => {
    if (!sig || paid) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'checkout',
            signatureName: sig.name,
            termsVersion: sig.version,
            signedAt: sig.signedAt,
            test,
          }),
        });
        const data = await res.json();
        if (!data?.configured || !data.clientSecret) {
          setCheckoutError(data?.stripeMessage || 'The payment form could not load.');
          return;
        }

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
        checkoutRef.current.mount('#advisory-checkout');
        setEmbedded(true);
      } catch {
        setCheckoutError('The payment form could not load.');
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
  }, [sig, paid, test]);

  const signed = Boolean(sig) || paid;

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          {test && (
            <p className="text-amber-300/90 text-sm text-center mb-6">
              Test mode. Every payment on this page is $1.
            </p>
          )}

          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              {TERMS_TITLE}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              The ongoing advisory. Read it, sign it, and the payments run themselves.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 mb-4">
            <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-6">The payment plan</p>
            <div className="space-y-4">
              {[
                ['Today', 'Month 1 of 12'],
                ['Monthly', 'Months 2 to 12, charged automatically'],
              ].map(([when, what]) => (
                <div key={when} className="grid grid-cols-[80px_1fr_auto] gap-4 items-baseline">
                  <p className="text-zinc-500 text-[13px] font-medium">{when}</p>
                  <p className="text-zinc-400 text-[15px]">{what}</p>
                  <p className="text-white text-[15px] font-medium">{unit}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-7 pt-6 border-t border-zinc-800">
              AUD $4,000 + GST a month, 12 months. $48,000 + GST in total. Every month goes to the card
              you pay with today. It stops by itself after the twelfth payment.
            </p>
          </div>

          <div className="space-y-4">
            <StepShell n={1} title="Read it and sign" state={signed ? 'done' : 'open'}>
              {signed ? null : (
                <>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 max-h-[520px] overflow-y-auto space-y-6">
                    <Agreement md={AGREEMENT} />
                    <p className="text-zinc-600 text-xs">Version {TERMS_VERSION}</p>
                  </div>

                  {!complete && !test ? (
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
                        placeholder="Rhys Livingstone"
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
                          I have read the agreement, I am authorised to enter into it, and I commit to
                          12 months at $4,000 plus GST a month, charged automatically to the same card
                          each month.
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

            <StepShell
              n={2}
              title={paid ? 'First month received' : 'First month'}
              state={paid ? 'done' : signed ? 'open' : 'locked'}
              locked="Unlocks once you have signed."
            >
              {paid ? (
                <div className="text-zinc-400 leading-relaxed space-y-2">
                  <p>{unit} received. Your receipt is in your inbox.</p>
                  {endsAt && !scheduleFailed && (
                    <p>
                      {unit} runs automatically to the same card each month, and it stops by itself before{' '}
                      {fmtDate(endsAt + 3600)}. Nothing else to do.
                    </p>
                  )}
                  {scheduleFailed && <p>Your payment is through. I am confirming the schedule and will be in touch.</p>}
                </div>
              ) : (
                <>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {unit} today. The card is saved for the eleven months after.
                  </p>
                  <div id="advisory-checkout" className="w-full" />
                  {!embedded && (
                    <p className="text-zinc-500 text-sm">
                      {checkoutError ? `${checkoutError} Message me and I will sort it.` : 'Loading the payment form.'}
                    </p>
                  )}
                </>
              )}
            </StepShell>
          </div>

          <p className="text-zinc-600 text-xs text-center mt-10">
            Questions about any of this? Message me before you sign.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default function AdvisoryRhys() {
  return (
    <PasswordGate password="Scale" storageKey="advisory-unlocked">
      <AdvisoryPage />
    </PasswordGate>
  );
}
