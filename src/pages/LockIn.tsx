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
const PREP_CALL_URL = 'https://calendly.com/sean-authorityengine/prep-call';
const STRIPE_BUY_BUTTON_ID = 'buy_btn_1U49VS2niRrgrA5OR7ldFuJQ';
const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51Rgusa2niRrgrA5O3atAmjSP7u0lCeWAi4YBCRTBvjAaykPtt7JrQnkoZnbQ4rrlC8fNyhblfzv9IMxXnmvJlngF00ZRz3IwsY';

/* 20 Days at this price, total. Sean updates DAYS_DONE as they are delivered. */
/* Sean's own words, lifted from the VIP Day description in his Calendly. */
const LEAVE_WITH = [
  'More clarity',
  'More efficiency',
  'A roadmap that unlocks your next move',
];

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

/* The Day itself. Read before booking, and still worth reading after. */
function Walkthrough() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-display text-xl text-white mb-4">The Day</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>Think of this session like a marketing pit stop.</p>
          <p>
            You come in with your current content engine. We lift the hood, diagnose
            performance issues, and help you upgrade the hidden bottlenecks slowing you
            down.
          </p>
          <p>
            We'll connect you to the latest intel, spot the hidden revenue leaks, and fine
            tune your strategy so your core acquisition engine runs smoother, faster, and
            more profitably.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-white mb-4">Before we meet</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Together we go through your prep doc so I turn up already knowing exactly what
            we need to attack, and what problems to solve.
          </p>
          <p>Bring your operator if you have one.</p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-white mb-5">You leave with</h2>
        <ul className="space-y-3.5">
          {LEAVE_WITH.map((line) => (
            <li key={line} className="flex gap-3.5 text-zinc-300 leading-relaxed">
              <Check className="text-zinc-600 shrink-0 mt-1" size={16} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-l-2 border-zinc-700 pl-6">
        <p className="text-zinc-200 text-lg leading-relaxed">
          If there's just one thing you'll get from this, it's leverage.
        </p>
        <p className="text-zinc-400 leading-relaxed mt-2">
          So you get more output from every action you take.
        </p>
      </section>
    </div>
  );
}

export default function LockIn() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookedAt, setBookedAt] = useState<string | null>(null);
  const [embedded, setEmbedded] = useState(false);
  const paidSent = useRef(false);
  const [calHeight, setCalHeight] = useState(700);
  const [days, setDays] = useState<{ total: number; remaining: number } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('c') || store.get('ae_contact_id');
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }

    // A booking survives a refresh, so the payment step does not vanish.
    const seenBooking = store.get('ae_booked') === '1';
    if (seenBooking) {
      setBooked(true);
      setBookedAt(store.get('ae_booked_at'));
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

      /*
        Calendly's steps are different heights: the date picker is short, the
        details form is tall. A fixed height means one of them scrolls inside
        its own frame, which reads as broken. The embed broadcasts its content
        height on every step, so the container follows it and nothing ever
        scrolls internally.
      */
      if (e.data?.event === 'calendly.page_height') {
        const h = parseInt(String(e.data?.payload?.height || ''), 10);
        if (h > 0) setCalHeight(h);
        return;
      }

      if (e.data?.event !== 'calendly.event_scheduled') return;

      setBooked(true);
      store.set('ae_booked', '1');

      const startsAt = e.data?.payload?.event?.start_time || '';
      if (startsAt) {
        setBookedAt(startsAt);
        store.set('ae_booked_at', startsAt);
      }

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
    if (paid || !booked) return;
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
          body: JSON.stringify({
            contactId: contactId || store.get('ae_contact_id'),
            brandDayDate: bookedAt || store.get('ae_booked_at') || '',
          }),
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
  }, [paid, booked, contactId, bookedAt]);

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

    Event details are hidden because the page already says what this is, and
    Calendly's own details block is tall enough to force the widget to scroll
    inside itself, which is where the clipping came from.
  */
  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1` +
    `&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  /*
    Once both halves are done this stops being a checkout. Leaving the two
    columns up with a tick on each reads as two half-finished tasks rather than
    a confirmation, so the page becomes a confirmation instead.
  */
  if (paid && booked) {
    return (
      <div className="min-h-screen bg-base">
        <div className="gradient-border-top" />

        <Container className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mx-auto mb-7 h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
              <Check className="text-emerald-400" size={24} />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              You're locked in
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Your Brand Builder Day is paid for and in both our calendars. Your receipt is in
              your inbox.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mt-14">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-7 sm:p-8">
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-3">
                One thing left
              </p>
              <h2 className="font-display text-2xl text-white mb-3">Book your prep call</h2>
              <p className="text-zinc-400 leading-relaxed mb-7">
                Twenty minutes. We go through your prep doc together so I turn up already knowing
                exactly what we need to attack, and what problems to solve. Bring your operator if
                you have one.
              </p>
              <a
                href={PREP_CALL_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
              >
                Book your prep call
              </a>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed text-center mt-8">
              Bring your operator, or whoever owns content, to the Day itself. It works far better
              with them in the room.
            </p>
            <p className="text-zinc-600 text-xs text-center mt-4">
              Nothing arrived within a few minutes? Reply to my email and I will sort it.
            </p>

            <div className="mt-20 pt-14 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-8 text-center">
                What we are doing on the Day
              </p>
              <Walkthrough />
            </div>
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
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="accent-line mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-5">
            Secure your date
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-xl mx-auto">
            To reserve one of our limited strategy days per month, secure your payment.
          </p>
          {days && (
            <div className="mt-8 inline-flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4">
              <p className="text-white text-[15px]">
                <span className="font-display text-2xl align-middle mr-1.5">{days.remaining}</span>
                of {days.total} Days left at 5,000 AUD
              </p>
              <p className="text-zinc-500 text-sm mt-1">After that the price goes to 10,000.</p>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_420px] items-start">

          {/* Left: the Day itself. Once paid, the calendar takes the top of this
              column and the walkthrough stays below it, still worth reading. */}
          <div>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                {booked && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Check size={15} />
                  </div>
                )}
                <h2 className="font-display text-xl text-white">
                  {booked ? 'Your date is held' : 'Choose your Brand Builder Day'}
                </h2>
              </div>

              {booked && paid ? (
                /*
                  The moment both halves are done, this is the only thing
                  carrying them forward. Telling someone an email is coming and
                  then sending nothing is worse than saying nothing, so the next
                  step is here on the page rather than promised.
                */
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-6 sm:p-7">
                  <p className="text-zinc-400 leading-relaxed">
                    Your Brand Builder Day is paid for and in both our calendars.
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <p className="text-white font-medium mb-1">One thing left: the prep call</p>
                    <p className="text-zinc-400 text-[15px] leading-relaxed mb-5">
                      Twenty minutes. We go through your prep doc together so I turn up already
                      knowing what we need to attack, and what problems to solve. Bring your
                      operator if you have one.
                    </p>
                    <a
                      href={PREP_CALL_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
                    >
                      Book your prep call
                    </a>
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed mt-6">
                    Your receipt is in your inbox now. Prep instructions follow before we meet.
                  </p>
                </div>
              ) : booked ? (
                <p className="text-zinc-400 leading-relaxed">
                  Held for now. Complete your payment to confirm it.
                </p>
              ) : (
                <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
                  <div
                    className="calendly-inline-widget w-full"
                    data-url={calendlyUrl}
                    style={{ minWidth: 280, height: calHeight }}
                  />
                </div>
              )}
            </div>

            <Walkthrough />
          </div>

          {/* Right: payment, sticky */}
          <div className="lg:sticky lg:top-28">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-6 ${
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
              ) : !booked ? (
                <div className="text-center py-4">
                  <p className="text-zinc-400 text-[15px] leading-relaxed">
                    Pick your day first.
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed mt-2">
                    Payment opens as soon as you have one.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-white font-medium mb-1">Confirm your day</p>
                  <p className="text-zinc-500 text-sm mb-6">
                    5,000 AUD. Your date is held until this clears.
                  </p>

                  <div id="stripe-checkout" className="w-full" />

                  {!embedded && (
                    <div className="flex justify-center">
                      <stripe-buy-button
                        buy-button-id={STRIPE_BUY_BUTTON_ID}
                        publishable-key={STRIPE_PUBLISHABLE_KEY}
                        {...(contactId ? { 'client-reference-id': contactId } : {})}
                      />
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-4">
                    {/*
                      Required, not decoration. The card is stored off session at
                      checkout so the Install can be charged later. Charging a
                      saved card the holder was never told about is how you earn
                      a dispute, and Stripe sides with the cardholder.
                    */}
                    <p className="text-zinc-500 text-[13px] leading-relaxed">
                      Your card is stored securely with Stripe. If you decide to go ahead with the
                      90 Day Install, I'll charge that same card for it, only after you have said
                      yes. Nothing is charged without your go ahead.
                    </p>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">
                      If after your application is reviewed and we do a prep call either of us
                      decide it's not the right move, you'll be fully refunded.
                    </p>
                    <p className="text-zinc-300 text-[13.5px] leading-relaxed">
                      All I ask is wholehearted implementation and advocacy.
                    </p>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">
                      P.s. if we decide we're not a fit right now, I'll direct you to someone who
                      can help you in your current situation.
                    </p>
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
