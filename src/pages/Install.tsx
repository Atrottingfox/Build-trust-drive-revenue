import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/ui/Container';
import { Check, Lock } from 'lucide-react';
import Footer from '../components/Footer';
import { TERMS, TERMS_TITLE, TERMS_VERSION, termsAreComplete } from '../content/install-terms';

/*
  /install - the 90 Day Install agreement.

  Sent after the Brand Day, to someone who has said yes in the room. Three
  things happen in order on one page: they read the terms, they sign, they pay
  the first of two payments.

  Signing and paying are separate steps rather than one button. A card can
  decline, and someone who has agreed to the terms should stay agreed rather
  than being rolled back to nothing because their bank was slow. The signature
  is recorded the moment it is given.

  The page refuses to show the signature block while the terms still contain
  [SLOT] placeholders, so an unfinished agreement cannot be signed by accident.
*/

declare global {
  interface Window {
    Stripe?: any;
  }
}

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

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

export default function Install() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [paid, setPaid] = useState(false);
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
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }
    if (store.get('ae_install_signed') === '1') setSigned(true);
    if (params.get('paid') === '1' || store.get('ae_install_paid') === '1') {
      setPaid(true);
      store.set('ae_install_paid', '1');
    }
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
      const data = await res.json();
      if (!data?.ok) throw new Error('sign failed');
      store.set('ae_install_signed', '1');
      setSigned(true);
    } catch {
      setError('Something went wrong saving your signature. Try again, or reply to my email.');
    } finally {
      setSigning(false);
    }
  };

  /*
    Payment only after signing. Mounts Stripe's embedded checkout with their
    Brand Day customer attached, so the card they already used is offered as
    one click rather than asked for again.
  */
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
        // Leaves the payment panel empty with the fallback line showing.
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

  if (paid) {
    return (
      <div className="min-h-screen bg-base">
        <div className="gradient-border-top" />
        <Container className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-7 h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
              <Check className="text-emerald-400" size={24} />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              You're in
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Signed, first payment through, and the 90 days start now. I'll be in touch with
              your kickoff within one business day.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mt-8">
              Your receipt is in your inbox. The second payment runs automatically on the date in
              your agreement, to the same card.
            </p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              {TERMS_TITLE}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Read it, sign it, and we start.
            </p>
          </div>

          {/* Terms */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-7 sm:p-9 space-y-9">
            {TERMS.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-lg text-white mb-3">{section.heading}</h2>
                <div className="space-y-3">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-zinc-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <p className="text-zinc-600 text-xs pt-2">Version {TERMS_VERSION}</p>
          </div>

          {/* Sign */}
          <div className="mt-4">
            {!complete ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 text-center">
                <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                  <Lock className="text-zinc-500" size={16} />
                </div>
                <p className="text-zinc-300 text-[15px]">This agreement is not finished yet.</p>
                <p className="text-zinc-500 text-sm mt-2">
                  Signing opens once the terms are written. Nothing can be signed in the meantime.
                </p>
              </div>
            ) : signed ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-7">
                <div className="flex items-center gap-3.5">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <h2 className="font-display text-lg text-white leading-tight">Signed</h2>
                    <p className="text-zinc-500 text-sm mt-0.5">
                      Agreement recorded. One payment to go.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-7 sm:p-8">
                <h2 className="font-display text-xl text-white mb-5">Sign</h2>

                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Type your full name
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
                    I have read the agreement above and I am authorised to enter into it on behalf
                    of my business.
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

                {!(name.trim() && agreed) && (
                  <p className="text-zinc-600 text-xs mt-3">
                    Type your name and tick the box to sign.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Pay */}
          {signed && (
            <div className="mt-4 rounded-2xl border border-zinc-700 bg-zinc-900/40 p-7 sm:p-8">
              <h2 className="font-display text-xl text-white mb-2">First payment</h2>
              <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
                The second runs automatically on the date in your agreement, to the same card.
              </p>
              <div id="install-checkout" className="w-full" />
              {!embedded && (
                <p className="text-zinc-500 text-sm">
                  Loading the payment form. If it does not appear, reply to my email and I will
                  send a link.
                </p>
              )}
            </div>
          )}

          <p className="text-zinc-600 text-xs text-center mt-10">
            Questions about any of this? Reply to my email before you sign.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
