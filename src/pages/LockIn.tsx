import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that goes to an accepted applicant.

  Order: pick the day, THEN pay, both on this page.

  Calendly must have NO redirect configured on the VIP Day event. The inline
  embed posts a `calendly.event_scheduled` message to this page when a booking
  completes, and that is what reveals the payment step. A redirect would throw
  them off the page before they ever see it.

  Payment uses the Stripe buy button rather than a payment link, so checkout
  opens in an overlay and they are never navigated away. The button carries
  client-reference-id so the payment matches the exact GHL contact instead of
  being guessed from an email address.
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

export default function LockIn() {
  const [booked, setBooked] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setContactId(params.get('c'));
  }, []);

  // Calendly's inline embed talks to the parent page through postMessage.
  // `calendly.event_scheduled` fires the moment a booking is confirmed.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && !e.origin.includes('calendly.com')) return;
      if (e.data?.event === 'calendly.event_scheduled') setBooked(true);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, []);

  // Loaded only once they have booked, so the overlay script is not sitting
  // on the page for people who never get that far.
  useEffect(() => {
    if (!booked) return;
    if (document.querySelector('script[data-stripe-buy]')) return;
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/buy-button.js';
    s.async = true;
    s.dataset.stripeBuy = 'true';
    document.body.appendChild(s);
  }, [booked]);

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
            Lock in your Brand Builder Day
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Pick your day, then pay to confirm it. Both happen here.
          </p>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Step 1 - choose the day */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              booked ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-700 bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  booked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'
                }`}
              >
                {booked ? <Check size={15} /> : '1'}
              </div>
              <h2 className="font-display text-xl text-white">
                {booked ? 'Day selected' : 'Pick your day'}
              </h2>
            </div>

            {booked ? (
              <p className="text-zinc-400 leading-relaxed">
                Your day is held. It is confirmed once payment goes through below.
              </p>
            ) : (
              <>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  One full day, at your office. We pull the brand apart in the morning, rebuild
                  and shoot it in the afternoon. You finish with assets, not notes.
                </p>
                <div
                  className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                  data-url={calendlyUrl}
                  style={{ minWidth: 320, height: 760 }}
                />
              </>
            )}
          </motion.div>

          <div className="my-4 h-6 w-px bg-zinc-800 mx-auto" />

          {/* Step 2 - pay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              booked ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-950/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  booked ? 'bg-white/10 text-white' : 'bg-white/5 text-zinc-600'
                }`}
              >
                2
              </div>
              <h2 className={`font-display text-xl ${booked ? 'text-white' : 'text-zinc-600'}`}>
                Pay $5,000 AUD to confirm
              </h2>
            </div>

            {booked ? (
              <>
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
            ) : (
              <p className="text-zinc-600 leading-relaxed">
                Available once you have chosen your day.
              </p>
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
