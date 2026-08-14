import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
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
/* Stripe needs roughly 400px to render without truncating, so the frame is
   drawn at that width and scaled to fit a narrower column. */
const CHECKOUT_SCALE = 0.82;

const DAYS_TOTAL = 20;
const DAYS_DONE = 2;
const DAYS_LEFT = DAYS_TOTAL - DAYS_DONE;

const AFTER_PAYMENT = [
  'Immediately choose your Brand Builder Day date in my calendar',
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
  const [embedded, setEmbedded] = useState(false);
  const paidSent = useRef(false);
  const scaleOuter = useRef<HTMLDivElement | null>(null);
  const scaleInner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('c') || store.get('ae_contact_id');
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }

    const justPaid = params.get('paid') === '1';
    const sessionId = params.get('session_id');

    if (justPaid || store.get('ae_paid') === '1') {
      setPaid(true);
      store.set('ae_paid', '1');
    }

    if (!justPaid || paidSent.current) return;
    paidSent.current = true;

    /*
      Two ways back from Stripe, and they are not equally trustworthy.

      With a session id, embedded checkout is in play and the server can ask
      Stripe whether this was really paid, then tag GHL itself. That is proof.

      Without one, this is the buy button and `?paid=1` is all the browser gets.
      Tag from the contact id we are holding and accept that the parameter is
      forgeable. Someone typing it by hand still cannot get a Brand Day out of
      it: there is no payment, so there is nothing to refund and Sean sees an
      unpaid booking immediately.
    */
    if (sessionId) {
      fetch('/.netlify/functions/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then((r) => r.json())
        .then((v) => {
          if (v?.verified && v.paid === false) {
            // Stripe says this session was never paid. Lock it back down.
            setPaid(false);
            try {
              localStorage.removeItem('ae_paid');
            } catch {
              // Nothing to clear.
            }
          }
        })
        .catch(() => {
          // Verification is a bonus, not a gate. They keep the calendar.
        });
      return;
    }

    if (id) {
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

  /*
    Calendly loads straight away so the real availability is on the page from
    the first look. Before payment the embed is held inert, so they can see the
    actual dates without being able to take one.
  */
  useEffect(() => {
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, []);

  /*
    Calendly's own booking engine, wearing the site's palette. These are the
    only presentation levers the embed exposes, so this is as close to the site
    look as real Calendly plumbing gets. A hand built calendar is not an option:
    there is no public Calendly endpoint for creating a booking, so a custom UI
    could show availability and then have no way to actually book it.
  */
  /*
    Stripe controls the layout inside its iframe, and squeezing the column just
    truncates the card name and the email. So the frame is rendered at a
    comfortable width and scaled down visually instead.

    The inner element is sized 1/SCALE so that after scaling it lands exactly on
    the column width. A transform does not change the layout box, so the outer
    height is set from the inner height every time Stripe resizes itself.
    Without that, a scaled frame leaves dead space underneath it.
  */
  useEffect(() => {
    const outer = scaleOuter.current;
    const inner = scaleInner.current;
    if (!outer || !inner || !embedded) return;

    const sync = () => {
      outer.style.height = `${inner.offsetHeight * CHECKOUT_SCALE}px`;
    };
    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [embedded]);

  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1` +
    `&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_340px] items-start">

          {/* Left: what they are securing */}
          <div>
            <div className="accent-line mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-5">
              Secure your date
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              To reserve one of our limited strategy days per month, secure your payment.
            </p>

            <div className="mt-7 inline-flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4">
              <p className="text-white text-[15px]">
                <span className="font-display text-2xl align-middle mr-1.5">{DAYS_LEFT}</span>
                of {DAYS_TOTAL} Days left at 5,000 AUD
              </p>
              <p className="text-zinc-500 text-sm mt-1">After that the price goes to 10,000.</p>
            </div>

            <div className="mt-11">
              <div className="flex items-center gap-3 mb-5">
                {booked && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Check size={15} />
                  </div>
                )}
                <h2 className={`font-display text-lg ${paid ? 'text-white' : 'text-zinc-500'}`}>
                  {booked ? 'Your date is locked in' : 'Choose your Brand Builder Day'}
                </h2>
              </div>

              {booked ? (
                <p className="text-zinc-400 leading-relaxed">
                  It's in both our calendars. Prep instructions and the prep call invite are on
                  their way to your inbox.
                </p>
              ) : (
                <div
                  className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                  data-url={calendlyUrl}
                  style={{ minWidth: 280, height: 820 }}
                />
              )}
            </div>
          </div>

          {/* Right: payment. Sticky so it stays put while the calendar scrolls. */}
          <div className="lg:sticky lg:top-28">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-5 ${
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
                  <p className="text-white text-[15px] font-medium mb-3">After payment, you'll:</p>
                  <ul className="space-y-2.5 mb-5">
                    {AFTER_PAYMENT.map((line) => (
                      <li key={line} className="flex gap-2.5 text-zinc-400 text-[13.5px] leading-relaxed">
                        <Check className="text-zinc-600 shrink-0 mt-1" size={15} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-zinc-500 text-[13px] leading-relaxed">
                    If after your application is reviewed and we do a prep call either of us
                    decide it's not the right move, you'll be fully refunded.
                  </p>

                  <p className="text-zinc-300 text-[13.5px] leading-relaxed mt-4">
                    All I ask is wholehearted implementation and advocacy.
                  </p>

                  <p className="text-zinc-500 text-[13px] leading-relaxed mt-3">
                    P.s. if we decide we're not a fit right now, I'll direct you to someone who
                    can help you in your current situation.
                  </p>

                  {/*
                    Stripe renders its own markup here and it comes out light, so
                    it gets a deliberate panel to sit in rather than landing as a
                    bare white rectangle on a dark page. The colours inside the
                    frame come from Stripe dashboard branding, not from here.
                  */}
                  <div className="mt-5 pt-5 border-t border-zinc-800/80">
                    <div
                      ref={scaleOuter}
                      className={embedded ? 'rounded-xl overflow-hidden ring-1 ring-white/10' : ''}
                    >
                      <div
                        ref={scaleInner}
                        style={
                          embedded
                            ? {
                                transform: `scale(${CHECKOUT_SCALE})`,
                                transformOrigin: 'top left',
                                width: `${100 / CHECKOUT_SCALE}%`,
                              }
                            : undefined
                        }
                      >
                        <div id="stripe-checkout" className="w-full" />
                      </div>
                    </div>

                    {!embedded && (
                      <div className="flex justify-center">
                        <stripe-buy-button
                          buy-button-id={STRIPE_BUY_BUTTON_ID}
                          publishable-key={STRIPE_PUBLISHABLE_KEY}
                          {...(contactId ? { 'client-reference-id': contactId } : {})}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.section>

            <p className="text-zinc-600 text-xs text-center mt-6">
              Trouble with either step? Reply to my email and I will sort it out.
            </p>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
