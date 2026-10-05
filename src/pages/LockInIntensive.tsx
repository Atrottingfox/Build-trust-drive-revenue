import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/*
  /lock-in-intensive/<contactId> - the Operator Intensive's first step.

  Same money and the same calendar as /lock-in, kept apart so none of the Brand
  Day machinery reacts:
  - checkout is created with offer 'intensive', so Stripe carries
    metadata.payment = 'intensive-1' and the invoice says Operator Intensive.
  - verify-payment and stripe-events tag `intensive-paid`, never
    `brand-day-paid`. That keeps it out of the founding Day counter, the
    date and prep call chasers, and every Brand Day email.
  - the date is booked on the VIP Day calendar so Brand Days and Intensive
    days come from one pool of days. calendly-booked sees `intensive-paid`
    and records `intensive-booked` instead of the Brand Day tags.

  No buy button fallback: that path (lock-in-paid) tags brand-day-paid. If the
  embedded checkout cannot load, the page says so and points to Sean.
*/

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';
const CALENDLY_URL = 'https://calendly.com/sean-authorityengine/vip-day';

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
      // Private browsing. The flow still works, it just will not survive a refresh.
    }
  },
};

const loadScript = (src: string, flag: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[${flag}]`);
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject());
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute(flag, 'true');
    s.addEventListener('load', () => {
      s.setAttribute('data-loaded', 'true');
      resolve();
    });
    s.addEventListener('error', () => reject());
    document.body.appendChild(s);
  });

export default function LockInIntensive() {
  const params = useParams();
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const contactId = params.contactId || query.get('c') || '';
  const paidKey = `ae_intensive_paid_${contactId}`;
  const bookedKey = `ae_intensive_booked_${contactId}`;

  const [paid, setPaid] = useState(() => store.get(paidKey) === '1');
  const [booked, setBooked] = useState(() => store.get(bookedKey) === '1');
  const [verifying, setVerifying] = useState(Boolean(query.get('session_id')));
  const [checkoutFailed, setCheckoutFailed] = useState(false);

  // Back from Stripe: ask the server whether it really cleared.
  useEffect(() => {
    const sessionId = query.get('session_id');
    if (!sessionId) return;
    fetch('/.netlify/functions/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.paid) {
          store.set(paidKey, '1');
          setPaid(true);
        }
      })
      .catch(() => {})
      .finally(() => setVerifying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Embedded checkout while unpaid.
  useEffect(() => {
    if (paid || verifying) return;
    let checkout: any = null;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId, offer: 'intensive' }),
        });
        const data = await res.json();
        if (!data?.configured || !data.clientSecret) throw new Error('not configured');
        await loadScript('https://js.stripe.com/v3/', 'data-stripe-js');
        if (cancelled) return;
        const stripe = (window as any).Stripe?.(STRIPE_PUBLISHABLE_KEY);
        if (!stripe) throw new Error('stripe.js unavailable');
        checkout = await stripe.initEmbeddedCheckout({ clientSecret: data.clientSecret });
        if (cancelled) return checkout?.destroy();
        checkout.mount('#stripe-checkout');
      } catch {
        if (!cancelled) setCheckoutFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      try {
        checkout?.destroy();
      } catch {
        // Already gone.
      }
    };
  }, [paid, verifying, contactId]);

  // Calendly loads only once the container exists, after payment.
  useEffect(() => {
    if (!paid || booked) return;
    loadScript('https://assets.calendly.com/assets/external/widget.js', 'data-calendly').catch(() => {});
  }, [paid, booked]);

  // The booking itself is recorded by Calendly's webhook into calendly-booked.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.event !== 'calendly.event_scheduled') return;
      store.set(bookedKey, '1');
      setBooked(true);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [bookedKey]);

  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1` +
    `&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Secure your Media Strategy Day"
        description="Operator Intensive, stage one."
        path="/lock-in-intensive"
        noIndex
      />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          {paid && booked ? (
            <div className="text-center">
              <div className="mx-auto mb-7 h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                <Check className="text-emerald-400" size={24} />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">You're locked in</h1>
              <p className="text-zinc-400 text-[17px] leading-relaxed">
                Your Media Strategy Day is booked and a confirmation is on its way to your inbox. Sean will be in
                touch to confirm the included search period and the person managing the Operator internally.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">
                Operator Intensive &middot; Stage one
              </p>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
                Secure your Media Strategy Day
              </h1>
              <p className="text-zinc-400 text-[17px] leading-relaxed">
                The $5,000 AUD commencement payment secures your Media Strategy Day. Your calendar opens as soon as
                it clears and you choose your date straight away.
              </p>

              {/* Step 1 */}
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                      paid ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'
                    }`}
                  >
                    {paid ? <Check size={14} /> : '1'}
                  </span>
                  <p className="text-white font-semibold">
                    {paid ? 'Commencement payment received' : 'Commencement payment, $5,000 AUD'}
                  </p>
                </div>
                {!paid &&
                  (verifying ? (
                    <p className="text-zinc-400 text-sm">Confirming your payment...</p>
                  ) : checkoutFailed ? (
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      The payment form could not load. Message Sean and he will send it to you directly.
                    </p>
                  ) : (
                    <div id="stripe-checkout" className="rounded-xl overflow-hidden" />
                  ))}
              </section>

              {/* Step 2 */}
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                      paid ? 'bg-blue-500/15 text-blue-400' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    2
                  </span>
                  <p className={paid ? 'text-white font-semibold' : 'text-zinc-500 font-semibold'}>
                    Choose your Media Strategy Day
                  </p>
                </div>
                {paid ? (
                  <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
                    <div className="calendly-inline-widget w-full" data-url={calendlyUrl} style={{ minWidth: 280, height: 720 }} />
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm leading-relaxed">Your calendar opens once payment clears.</p>
                )}
              </section>
            </>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
}
