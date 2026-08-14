import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that goes to an accepted applicant.

  Order: pay, THEN pick the date. Payment first means no one holds a day they
  have not paid for, and the calendar never gets blocked by a maybe.

  How the page knows they paid:
  Stripe's buy button opens checkout in an overlay and sends them to the buy
  button's success URL when it completes. That URL must be
  https://authorityengine.com.au/lock-in?paid=1 so they come straight back here
  with step 2 unlocked. The contact id does not survive the round trip in the
  query string, so it is stashed in localStorage on arrival and read back after.

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

  // Stripe overlay script. Step 1 is visible immediately, so load it on mount.
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
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
            Secure your Brand Builder Day
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Your application is through. Two steps and the day is yours.
          </p>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Step 1 - pay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              paid ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-700 bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  paid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'
                }`}
              >
                {paid ? <Check size={15} /> : '1'}
              </div>
              <h2 className="font-display text-xl text-white">
                {paid ? 'Paid' : 'Pay $5,000 AUD'}
              </h2>
            </div>

            {paid ? (
              <p className="text-zinc-400 leading-relaxed">
                Payment received. Your receipt is in your inbox.
              </p>
            ) : (
              <>
                <p className="text-zinc-400 leading-relaxed mb-3">
                  One full day, at your office. We pull the brand apart in the morning, rebuild
                  and shoot it in the afternoon. You finish with assets, not notes.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  The $5,000 credits in full toward the 90-Day Install. If we do the prep call
                  and I decide it is not the right move for you, I refund you in full.
                </p>
                <stripe-buy-button
                  buy-button-id={STRIPE_BUY_BUTTON_ID}
                  publishable-key={STRIPE_PUBLISHABLE_KEY}
                  {...(contactId ? { 'client-reference-id': contactId } : {})}
                />
              </>
            )}
          </motion.div>

          <div className="my-4 h-6 w-px bg-zinc-800 mx-auto" />

          {/* Step 2 - pick the date */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              paid ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-950/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  booked
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : paid
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-zinc-600'
                }`}
              >
                {booked ? <Check size={15} /> : '2'}
              </div>
              <h2
                className={`font-display text-xl ${paid ? 'text-white' : 'text-zinc-600'}`}
              >
                {booked ? 'Date locked in' : 'Pick your Brand Day date'}
              </h2>
            </div>

            {!paid && (
              <p className="text-zinc-600 leading-relaxed">
                Opens once payment is through.
              </p>
            )}

            {paid && booked && (
              <p className="text-zinc-400 leading-relaxed">
                Your day is in both our calendars. Confirmation and a prep call invite are on
                their way to your inbox.
              </p>
            )}

            {paid && !booked && (
              <>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Pick the day that suits you. I run one of these at a time, so the calendar
                  below is exactly what is open.
                </p>
                <div
                  className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                  data-url={calendlyUrl}
                  style={{ minWidth: 320, height: 760 }}
                />
              </>
            )}
          </motion.div>

          <p className="text-zinc-600 text-xs text-center mt-8">
            Trouble with either step? Reply to my email and I will sort it out.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
