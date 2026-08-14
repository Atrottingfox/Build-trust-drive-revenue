import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that goes to an accepted applicant.

  Step 2 of the funnel. Step 1 was the application at /builder.

  Order: pay, THEN pick the date. Payment first means no one holds a day they
  have not paid for, and the calendar never gets blocked by a maybe.

  How the page knows they paid:
  Stripe's buy button opens checkout in an overlay and sends them to the buy
  button's success URL when it completes. That URL must be
  https://authorityengine.com.au/lock-in?paid=1 so they come straight back here
  with the calendar unlocked. The contact id does not survive the round trip in
  the query string, so it is stashed in localStorage on arrival and read back
  after.

  Calendly must have NO redirect on the VIP Day event, so the confirmation shows
  on this page. If a redirect does get left on, /booked tags the same things, so
  nothing is lost either way.
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

const AFTER_PAYMENT = [
  'Immediately choose your Brand Builder Day date in my calendar',
  'Get prep instructions and the Short-Form Sprint',
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

export default function LockIn() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [booked, setBooked] = useState(false);
  const paidSent = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('c') || store.get('ae_contact_id');
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }

    const justPaid = params.get('paid') === '1';
    const paidBefore = store.get('ae_paid') === '1';
    if (justPaid || paidBefore) {
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

  // Stripe overlay script. The pay step is visible immediately, so load on mount.
  useEffect(() => {
    if (document.querySelector('script[data-stripe-buy]')) return;
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/buy-button.js';
    s.async = true;
    s.dataset.stripeBuy = 'true';
    document.body.appendChild(s);
  }, []);

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

      <Container className="pt-32 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="accent-line mx-auto mb-6" />
          <p className="text-zinc-500 text-xs tracking-[0.18em] uppercase mb-4">Step 2</p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white">
            Secure your Brand Builder Day
          </h1>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Pay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              paid ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-700 bg-zinc-900/40'
            }`}
          >
            {paid ? (
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check size={15} />
                </div>
                <div>
                  <h2 className="font-display text-xl text-white">Paid</h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    Your receipt is in your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-white text-lg leading-relaxed mb-4">
                  The Brand Builder Day is 5,000 AUD.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-7">
                  To reserve one of a limited number of days in the next 30 to 60 days, pay your
                  5,000 AUD now.
                </p>

                <p className="text-white mb-3">After payment, you'll:</p>
                <ul className="space-y-2.5 mb-7">
                  {AFTER_PAYMENT.map((line) => (
                    <li key={line} className="flex gap-3 text-zinc-400 leading-relaxed">
                      <span className="text-zinc-600 mt-px">&bull;</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  If, after I review your application and we do the prep call, either of us
                  decides it's not the right move, I'll refund you in full.
                </p>

                <stripe-buy-button
                  buy-button-id={STRIPE_BUY_BUTTON_ID}
                  publishable-key={STRIPE_PUBLISHABLE_KEY}
                  {...(contactId ? { 'client-reference-id': contactId } : {})}
                />
              </>
            )}
          </motion.div>

          {/* Pick the date. Only exists once they are through payment. */}
          {paid && (
            <>
              <div className="my-4 h-6 w-px bg-zinc-800 mx-auto" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  {booked && (
                    <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check size={15} />
                    </div>
                  )}
                  <h2 className="font-display text-xl text-white">
                    {booked ? 'Date locked in' : 'Choose your Brand Builder Day date'}
                  </h2>
                </div>

                {booked ? (
                  <p className="text-zinc-400 leading-relaxed">
                    Your day is in both our calendars. Prep instructions, your Short-Form Sprint
                    access and the prep call invite are on their way to your inbox.
                  </p>
                ) : (
                  <>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      I run one of these at a time, so the calendar below is exactly what is open.
                    </p>
                    <div
                      className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                      data-url={calendlyUrl}
                      style={{ minWidth: 320, height: 760 }}
                    />
                  </>
                )}
              </motion.div>
            </>
          )}

          <p className="text-zinc-600 text-xs text-center mt-8">
            Trouble with either step? Reply to my email and I will sort it out.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
