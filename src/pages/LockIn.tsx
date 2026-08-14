import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check, Lock } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that goes to an accepted applicant.

  Order: pay, THEN pick the date. Payment first means no one holds a day they
  have not paid for, and the calendar never gets blocked by a maybe.

  The calendar is shown locked rather than hidden, so payment reads as unlocking
  something instead of hitting a wall. The locked state is a static panel, not
  the real embed behind CSS. Loading a live, interactive Calendly and relying on
  pointer-events to stop someone booking would undo the one guarantee this page
  exists to make.

  How the page knows they paid:
  Stripe's buy button opens checkout in an overlay and sends them to the buy
  button's success URL when it completes. That URL must be
  https://authorityengine.com.au/lock-in?paid=1 so they come straight back here
  with the calendar unlocked. The contact id does not survive the round trip in
  the query string, so it is stashed in localStorage on arrival and read back
  after.

  Calendly must have NO redirect on the VIP Day event, so the confirmation shows
  on this page.
*/

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'buy-button-id': string;
          'publishable-key': string;
          'client-reference-id'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const CALENDLY_URL = 'https://calendly.com/sean-authorityengine/vip-day';
const STRIPE_BUY_BUTTON_ID = 'buy_btn_1U49VS2niRrgrA5OR7ldFuJQ';
const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

/* 20 Days at this price, total. Sean updates DAYS_DONE as they are delivered. */
const DAYS_TOTAL = 20;
const DAYS_DONE = 2;
const DAYS_LEFT = DAYS_TOTAL - DAYS_DONE;

const AFTER_PAYMENT = [
  'Immediately choose your Brand Builder Day date in my calendar',
  'Get prep instructions and the Short Form Sprint',
  'Join a short prep call so I can get under the hood before the Day',
];

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Private browsing. The flow still works, it just will not survive a refresh.
    }
  },
};

/* A calendar shape, not a working calendar. Enough to read as "your date goes
   here" without pretending to be interactive. */
function LockedCalendar() {
  return (
    <div className="relative rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
      <div aria-hidden className="select-none px-6 pt-6 pb-8 opacity-[0.13]">
        <div className="flex items-center justify-between mb-5">
          <div className="h-2.5 w-24 rounded-full bg-zinc-400" />
          <div className="flex gap-2">
            <div className="h-5 w-5 rounded bg-zinc-500" />
            <div className="h-5 w-5 rounded bg-zinc-500" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded-full bg-zinc-500" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md border border-zinc-600/70"
              style={{ background: i % 9 === 3 ? 'rgba(161,161,170,.35)' : 'transparent' }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="h-10 w-10 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center mb-4">
          <Lock className="text-zinc-500" size={16} />
        </div>
        <p className="text-zinc-300 text-[15px] font-medium">
          Your calendar unlocks the moment payment goes through
        </p>
        <p className="text-zinc-600 text-sm mt-1.5">
          Pick your day right here, no back and forth
        </p>
      </div>
    </div>
  );
}

export default function LockIn() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [booked, setBooked] = useState(false);
  const [embedded, setEmbedded] = useState(false);
  const paidSent = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('c') || store.get('ae_contact_id');
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }

    const justPaid = params.get('paid') === '1';
    if (justPaid || store.get('ae_paid') === '1') {
      setPaid(true);
      store.set('ae_paid', '1');
    }

    /*
      Tag the payment in GHL once, on the trip back from Stripe. Guarded on
      `justPaid` so a refresh of an already paid page does not fire it again.
    */
    if (justPaid && id && !paidSent.current) {
      paidSent.current = true;
      fetch('/.netlify/functions/lock-in-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId: id }),
      }).catch(() => {
        // They have paid. Nothing here may interrupt the flow.
      });
    }
  }, []);

  /*
    Calendly's inline embed talks to the parent page through postMessage, and
    `calendly.event_scheduled` fires the moment a booking is confirmed. We tag
    GHL straight from here rather than waiting on a Calendly webhook. Webhooks
    are not on every Calendly plan, and this needs no API token, no upgrade and
    no configuration.
  */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && !e.origin.includes('calendly.com')) return;
      if (e.data?.event !== 'calendly.event_scheduled') return;

      setBooked(true);

      const id = contactId || store.get('ae_contact_id');
      if (!id) return;

      fetch('/.netlify/functions/calendly-booked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'invitee.created',
          fromPage: true,
          payload: {
            tracking: { utm_content: id },
            scheduled_event: { name: 'VIP Day' },
          },
        }),
      }).catch(() => {
        // They have a booking either way. The function logs failures so it can
        // be reconciled by hand.
      });
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [contactId]);

  /*
    Try to mount Stripe's embedded checkout so the card fields sit inside the
    page. If the server has no Stripe key configured, or anything at all goes
    wrong, fall through to the buy button. Someone must always be able to pay.
  */
  useEffect(() => {
    if (paid) return;
    let checkout: any = null;
    let cancelled = false;

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

    (async () => {
      try {
        const res = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId: contactId || store.get('ae_contact_id') }),
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
        setEmbedded(true);
      } catch {
        // Buy button it is.
        loadScript('https://js.stripe.com/v3/buy-button.js', 'data-stripe-buy').catch(() => {});
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
  }, [paid, contactId]);

  // Calendly script only once they are through payment.
  useEffect(() => {
    if (!paid) return;
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, [paid]);

  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-14">
        <div className="max-w-2xl mx-auto text-center">
          <div className="accent-line mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-5">
            Secure your date
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-xl mx-auto">
            To reserve one of our limited strategy days per month, secure your payment.
          </p>

          <div className="mt-9 inline-flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-7 py-5">
            <p className="text-white text-[15px]">
              <span className="font-display text-2xl align-middle mr-1.5">{DAYS_LEFT}</span>
              of {DAYS_TOTAL} Days left at 5,000 AUD
            </p>
            <p className="text-zinc-500 text-sm mt-1.5">
              After that the price goes to 10,000.
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Step 1 - pay */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-7 sm:p-9 transition-colors ${
              paid ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-700 bg-zinc-900/40'
            }`}
          >
            {paid ? (
              <div className="flex items-center gap-3.5">
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div>
                  <h2 className="font-display text-lg text-white leading-tight">Payment received</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">Your receipt is in your inbox.</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
                  If after your application is reviewed and we do a prep call either of us decide
                  it's not the right move, you'll be fully refunded.
                </p>

                <p className="text-white font-medium mb-4">After payment, you'll:</p>
                <ul className="space-y-3 mb-9">
                  {AFTER_PAYMENT.map((line) => (
                    <li key={line} className="flex gap-3.5 text-zinc-300 leading-relaxed">
                      <Check className="text-zinc-600 shrink-0 mt-1" size={15} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Embedded checkout mounts here. Empty until Stripe is
                    configured server side, in which case the buy button below
                    renders instead. */}
                <div id="stripe-checkout" />

                {!embedded && (
                  <stripe-buy-button
                    buy-button-id={STRIPE_BUY_BUTTON_ID}
                    publishable-key={STRIPE_PUBLISHABLE_KEY}
                    {...(contactId ? { 'client-reference-id': contactId } : {})}
                  />
                )}

                <div className="mt-9 pt-7 border-t border-zinc-800/80">
                  <p className="text-zinc-300 leading-relaxed">
                    All I ask is wholehearted implementation and advocacy.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                    P.s. if we decide we're not a fit right now, I'll direct you to someone who
                    can help you in your current situation.
                  </p>
                </div>
              </>
            )}
          </motion.section>

          <div className="my-3 h-8 w-px bg-gradient-to-b from-zinc-800 to-transparent mx-auto" />

          {/* Step 2 - the calendar, locked until payment clears */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className={`rounded-2xl border p-7 sm:p-9 transition-colors ${
              paid ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800/80 bg-zinc-950/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              {booked && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Check size={16} />
                </div>
              )}
              <h2 className={`font-display text-lg ${paid ? 'text-white' : 'text-zinc-500'}`}>
                {booked ? 'Your date is locked in' : 'Choose your Brand Builder Day'}
              </h2>
            </div>

            {!paid && <LockedCalendar />}

            {paid && booked && (
              <p className="text-zinc-400 leading-relaxed">
                It's in both our calendars. Prep instructions, your Short Form Sprint access and
                the prep call invite are on their way to your inbox.
              </p>
            )}

            {paid && !booked && (
              <div
                className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                data-url={calendlyUrl}
                style={{ minWidth: 320, height: 760 }}
              />
            )}
          </motion.section>

          <p className="text-zinc-600 text-xs text-center mt-10">
            Trouble with either step? Reply to my email and I will sort it out.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
