import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import { Agreement, StepShell } from '../components/AgreementSteps';
import { AGREEMENT, TERMS_TITLE, TERMS_VERSION, termsAreComplete } from '../content/founder-partner-terms';

/*
  /partner?t=<token>. The 12 month Founder Partner Term, offered at day 30.

  Sean, 19 Oct 2026: the day 30 checkpoint in Slack offers it, he taps yes, and
  gets a link unique to that client (netlify/functions/founder-partner.ts). The
  token is the gate: no password, and it only opens for the client it was made
  for. Built on /advisory (AdvisoryRhys.tsx): read, sign, pay month one, and the
  other six payments run themselves.

  ?test=1 walks it for $1 a day, 3 payments.
*/

declare global {
  interface Window {
    Stripe?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

const FN = '/.netlify/functions/founder-partner';

type Sig = { name: string; version: string; signedAt: string };

const post = (body: unknown) =>
  fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then((r) =>
    r.json()
  );

const fmtDate = (s: number) =>
  new Date(s * 1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

export default function FounderPartner() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const t = params.get('t') || '';
  const test = params.get('test') === '1';
  const sigKey = `ae_partner_sig_${t.slice(-12)}`;

  const [client, setClient] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [sig, setSig] = useState<Sig | null>(() => {
    try {
      const s = JSON.parse(localStorage.getItem(sigKey) || 'null');
      return s?.version === TERMS_VERSION ? s : null;
    } catch {
      return null;
    }
  });
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

  useEffect(() => {
    if (!t) return setInvalid(true);
    post({ action: 'who', t })
      .then((d) => (d?.valid ? setClient(d.name) : setInvalid(true)))
      .catch(() => setInvalid(true));
  }, [t]);

  /* Back from Stripe. The session is checked server side, and that call is what
     sets the end date after the seventh payment. Safe to repeat. */
  useEffect(() => {
    const sessionId = params.get('session_id');
    if (params.get('paid') !== '1' || !sessionId || verifySent.current) return;
    verifySent.current = true;
    setPaid(true);
    post({ action: 'verify', sessionId })
      .then((v) => {
        if (v?.verified && v.paid === false) return setPaid(false);
        if (v?.endsAt) setEndsAt(v.endsAt);
        if (v?.paid && !v.scheduled) setScheduleFailed(true);
      })
      .catch(() => setScheduleFailed(true));
  }, [params]);

  const sign = async () => {
    if (!name.trim() || !agreed || signing) return;
    setSigning(true);
    setError('');
    try {
      const d = await post({ action: 'sign', t, signatureName: name.trim(), termsVersion: TERMS_VERSION, test });
      if (!d?.ok) throw new Error('sign failed');
      const s = { name: name.trim(), version: TERMS_VERSION, signedAt: d.signedAt };
      try {
        localStorage.setItem(sigKey, JSON.stringify(s));
      } catch {
        /* private browsing */
      }
      setSig(s);
    } catch {
      setError('Something went wrong saving your signature. Try again, or message me.');
    } finally {
      setSigning(false);
    }
  };

  useEffect(() => {
    if (!sig || paid || !client) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await post({
          action: 'checkout',
          t,
          signatureName: sig.name,
          termsVersion: sig.version,
          signedAt: sig.signedAt,
          test,
        });
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
        checkoutRef.current.mount('#partner-checkout');
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
  }, [sig, paid, client, t, test]);

  const signed = Boolean(sig) || paid;

  if (invalid) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4">
        <p className="text-zinc-400 text-center max-w-sm">
          This link is not valid. It may have been copied wrong. Message me and I will send it again.
        </p>
      </div>
    );
  }
  if (!client) return <div className="min-h-screen bg-base" />;

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          {test && <p className="text-amber-300/90 text-sm text-center mb-6">Test mode. Every payment on this page is $1.</p>}

          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">{TERMS_TITLE}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              For {client}. The next 12 months. Read it, sign it, and the payments run themselves.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 mb-4">
            <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-6">The payment plan</p>
            <div className="space-y-4">
              {[
                ['Today', 'Payment 1 of 7'],
                ['Monthly', 'Payments 2 to 7, charged automatically'],
              ].map(([when, what]) => (
                <div key={when} className="grid grid-cols-[80px_1fr_auto] gap-4 items-baseline">
                  <p className="text-zinc-500 text-[13px] font-medium">{when}</p>
                  <p className="text-zinc-400 text-[15px]">{what}</p>
                  <p className="text-white text-[15px] font-medium">{unit}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-7 pt-6 border-t border-zinc-800">
              AUD $4,000 + GST a month, 7 payments. $28,000 + GST in total, for 12 months. Every payment goes to the
              card you pay with today. It stops by itself after the seventh.
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
                    <p className="text-zinc-500 text-sm mt-6">This agreement is still being finalised. Signing opens once it is.</p>
                  ) : (
                    <div className="mt-7">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Type your full name to sign</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={client}
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
                          I have read the agreement, I am authorised to enter into it, and I commit to 7 monthly payments of
                          $4,000 plus GST, charged automatically to the same card each month.
                        </span>
                      </label>
                      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                      <button
                        onClick={sign}
                        disabled={signing}
                        className={`mt-7 w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${
                          name.trim() && agreed && !signing ? 'bg-white text-black hover:bg-zinc-100' : 'bg-zinc-800 text-zinc-500'
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
              title={paid ? 'First payment received' : 'First payment'}
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
                  <p className="text-zinc-400 leading-relaxed mb-6">{unit} today. The card is saved for the six payments after.</p>
                  <div id="partner-checkout" className="w-full" />
                  {!embedded && (
                    <p className="text-zinc-500 text-sm">
                      {checkoutError ? `${checkoutError} Message me and I will sort it.` : 'Loading the payment form.'}
                    </p>
                  )}
                </>
              )}
            </StepShell>
          </div>

          <p className="text-zinc-600 text-xs text-center mt-10">Questions about any of this? Message me before you sign.</p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
