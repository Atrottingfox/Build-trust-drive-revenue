import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';
import {
  AGREEMENT,
  TERMS_TITLE,
  TERMS_VERSION,
  termsAreComplete,
} from '../content/undeniability-part2-terms';

/*
  /undeniability-part2. Rhys Livingstone's next 90 days.

  Same shape as /install (read and sign, then pay) but its own page and its
  own function, because the money is different: $8,000 plus GST today, day 31
  and day 61, every one charged automatically to the card used today.

  No contact id. This page is for one person, and the signature travels on the
  Stripe payment itself (name, terms version, time, IP), so Stripe holds the
  record of who agreed to what.

  ?test=1 walks the whole thing for a dollar a step.
*/

declare global {
  interface Window {
    Stripe?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

const FN = '/.netlify/functions/undeniability-part2';
const SIG_KEY = 'ae_undeniable_p2_sig';

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
        state === 'open' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800/80 bg-zinc-950/40'
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
        <h2 className={`font-display text-xl ${state === 'locked' ? 'text-zinc-600' : 'text-white'}`}>
          {title}
        </h2>
      </div>

      {state === 'locked' && locked && <p className="text-zinc-600 text-sm mt-3 pl-[46px]">{locked}</p>}
      {state !== 'locked' && children && <div className="mt-6">{children}</div>}
    </section>
  );
}

/*
  Sean's agreement is stored exactly as he wrote it, in markdown. This draws
  the handful of shapes it uses (headings, bullets, numbered lines, bold,
  rules) so the text itself never has to be reworked to fit the page.
*/
function inline(text: string) {
  return text.split(/(\*\*[^*]*\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    ) : (
      part.replace(/\*\*/g, '')
    )
  );
}

function Agreement({ md }: { md: string }) {
  const blocks = md.split(/\n\s*\n/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const first = lines[0];
        if (first.trim() === '---') return <hr key={i} className="border-zinc-800 !my-7" />;
        const h = first.match(/^(#{1,3})\s+(.*)$/);
        if (h) {
          const text = h[2].replace(/\*\*/g, '');
          if (h[1].length === 1)
            return <h3 key={i} className="font-display text-white text-xl !mt-8 first:!mt-0">{text}</h3>;
          if (h[1].length === 2)
            return <h4 key={i} className="text-white text-[16px] font-semibold !mt-6">{text}</h4>;
          return <h5 key={i} className="text-zinc-200 text-[14.5px] font-medium !mt-5">{text}</h5>;
        }
        if (lines.every((l) => /^- /.test(l)))
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-zinc-600">
              {lines.map((l, j) => (
                <li key={j} className="text-zinc-400 text-[14.5px] leading-relaxed">{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\. /.test(l)))
          return (
            <ol key={i} className="list-decimal pl-5 space-y-1.5 marker:text-zinc-600">
              {lines.map((l, j) => (
                <li key={j} className="text-zinc-400 text-[14.5px] leading-relaxed">{inline(l.replace(/^\d+\. /, ''))}</li>
              ))}
            </ol>
          );
        return (
          <p key={i} className="text-zinc-400 text-[14.5px] leading-relaxed">
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default function UndeniabilityPart2() {
  const [test] = useState(() => new URLSearchParams(window.location.search).get('test') === '1');
  const [sig, setSig] = useState<Sig | null>(() => store.get());
  const [paid, setPaid] = useState(false);
  const [schedule, setSchedule] = useState<{ n: number; at: number; ok: boolean }[] | null>(null);
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
  const unit = test ? '$1' : '$8,800';

  /*
    Coming back from Stripe. ?paid=1 alone proves nothing, so the session id is
    checked server side, and that same call is what raises day 31 and day 61.
    It is safe to repeat: a reload finds both invoices already there.
  */
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
        if (v?.schedule) setSchedule(v.schedule);
        if (v?.paid && !v.scheduled) setScheduleFailed(true);
      })
      .catch(() => setScheduleFailed(true));
  }, []);

  const sign = async () => {
    if (!name.trim() || !agreed || signing) return;
    setSigning(true);
    setError('');
    try {
      const res = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sign', signatureName: name.trim(), termsVersion: TERMS_VERSION, test }),
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
        checkoutRef.current.mount('#undeniable-p2-checkout');
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
              The next 90 days. Read it, sign it, and the payments run themselves.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 mb-4">
            <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-6">The payment plan</p>
            <div className="space-y-4">
              {[
                ['Today', 'Payment 1 of 3'],
                ['Day 31', 'Payment 2 of 3, charged automatically'],
                ['Day 61', 'Payment 3 of 3, charged automatically'],
              ].map(([when, what]) => (
                <div key={when} className="grid grid-cols-[80px_1fr_auto] gap-4 items-baseline">
                  <p className="text-zinc-500 text-[13px] font-medium">{when}</p>
                  <p className="text-zinc-400 text-[15px]">{what}</p>
                  <p className="text-white text-[15px] font-medium">{unit}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-7 pt-6 border-t border-zinc-800">
              AUD $8,000 plus GST each time, $26,400 in total. All three go to the card you pay with
              today. Nothing to invoice, nothing to chase, and no fourth payment.
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

                  {/* Test mode can sign before the real text lands, so the money path
                      can be walked end to end first. Rhys's link never can. */}
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
                          I have read the agreement, I am authorised to enter into it, and I agree to
                          all three payments of $8,000 plus GST, the second and third charged
                          automatically to the same card on day 31 and day 61.
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
              title={paid ? 'First payment received' : 'First payment'}
              state={paid ? 'done' : signed ? 'open' : 'locked'}
              locked="Unlocks once you have signed."
            >
              {paid ? (
                <div className="text-zinc-400 leading-relaxed space-y-2">
                  <p>{unit} received. Your receipt is in your inbox.</p>
                  {schedule && !scheduleFailed && (
                    <p>
                      {unit} runs automatically to the same card on {fmtDate(schedule[0].at)}, and again
                      on {fmtDate(schedule[1].at)}. Nothing else to do.
                    </p>
                  )}
                  {scheduleFailed && (
                    <p>Your payment is through. I am setting up the next two and will confirm.</p>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {unit} today. The card is saved for day 31 and day 61.
                  </p>
                  <div id="undeniable-p2-checkout" className="w-full" />
                  {!embedded && (
                    <p className="text-zinc-500 text-sm">
                      {checkoutError
                        ? `${checkoutError} Message me and I will sort it.`
                        : 'Loading the payment form.'}
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
