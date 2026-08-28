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

/* Sean's own words, lifted from the VIP Day description in his Calendly. */
const LEAVE_WITH = [
  'More clarity',
  'More efficiency',
  'A roadmap that unlocks your next move',
];

const AFTER_PAYMENT = [
  'Immediately choose your Brand Day date in my calendar',
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
/* Sean's words for the Day, kept as he wrote them. */
const WHAT_IT_ANSWERS = [
  'Where is money leaking between content and revenue?',
  'What beliefs do your best buyers need before they say yes?',
  'What content and channels should your team run to install those beliefs and drive demand?',
];

const BEFORE_WE_MEET = [
  'You complete a short prep doc so I have your offers, numbers, and links upfront.',
  'I review your current content, funnels, and metrics so we start from reality.',
  'You bring your operator / media lead if you have one (or whoever owns marketing).',
];

const LEAVE_WITH_DETAIL = [
  {
    name: 'Demand Bottleneck Snapshot',
    body: 'We score you out of five on the four levers that move a stranger to a sale, Clarity, Visibility, Authority, Quality. Then we name the one everything else sits downstream of, and what it takes to move it two points in a day.',
  },
  {
    name: 'Positioning, perspective and personality',
    body: 'We start big and dial all three tight into one message, so somebody landing on your profile can see the outcome you deliver and whether it is for them.',
  },
  {
    name: 'Buying Belief Map',
    body: 'Engineer the key beliefs your ICP must hold about their problem, your solution, and you before they buy, and where these are installed into your content. Content is engineering beliefs.',
  },
  {
    name: 'Your Brand Demand Workbook',
    body: 'Beliefs, topics, hooks, and channels mapped for your core offers based on who you are and what makes you unique.',
  },
  {
    name: 'Core Trust Assets',
    body: 'We map the highest leverage assets required for ideal prospects to turn into buyers.',
  },
  {
    name: 'The formats that suit how you actually work',
    body: 'Most founders try to create when they should be capturing. The good stuff is already in your head and it comes out when a camera is on. We pick the formats that get it out of you, and the environments that manufacture them.',
  },
  {
    name: 'Your production line',
    body: 'Every step from idea to published, who owns it, and what good looks like at each one. Written down, so one person leaving does not stall the whole thing and approval is a decision rather than a feeling.',
  },
  {
    name: 'A concrete 30 day demand plan',
    body: 'What your team should publish and do next month, tied to clear demand targets (DMs, apps, opps).',
  },
];

function Walkthrough() {
  return (
    <div className="space-y-12">
      {/* Sean's original framing, kept above the detail. It sets what kind of
          session this is before the three questions get specific. */}
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
        <h2 className="font-display text-xl text-white mb-4">What the Day is</h2>
        <p className="text-zinc-400 leading-relaxed mb-5">
          This is a working session to answer three questions:
        </p>
        <ol className="space-y-3">
          {WHAT_IT_ANSWERS.map((q, i) => (
            <li key={q} className="flex gap-3.5 text-zinc-300 leading-relaxed">
              <span className="text-zinc-600 shrink-0 tabular-nums">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
        <p className="text-zinc-400 leading-relaxed mt-5">
          We make decisions, document them, and leave with a simple plan your team can execute.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-white mb-4">Before we meet</h2>
        <p className="text-zinc-400 leading-relaxed mb-5">After you secure your Day:</p>
        <ul className="space-y-3.5">
          {BEFORE_WE_MEET.map((line) => (
            <li key={line} className="flex gap-3.5 text-zinc-300 leading-relaxed">
              <Check className="text-zinc-600 shrink-0 mt-1" size={16} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="text-zinc-400 leading-relaxed mt-5">
          By the time we sit down, we already know what problems we're attacking.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-white mb-5">You leave with</h2>
        <ul className="space-y-6">
          {LEAVE_WITH_DETAIL.map((item) => (
            <li key={item.name} className="flex gap-3.5">
              <Check className="text-zinc-600 shrink-0 mt-1" size={16} />
              <div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-zinc-400 leading-relaxed mt-1">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-l-2 border-zinc-700 pl-6">
        <p className="text-zinc-200 text-lg leading-relaxed">
          If there's one thing you'll feel when you walk out, it's leverage.
        </p>
        <p className="text-zinc-400 leading-relaxed mt-2">
          More demand from the content you're already creating.
        </p>
      </section>
    </div>
  );
}

/*
  The contact id, however it arrives.

  The invitation email was built with the id as a path segment,
  /install/<id>, rather than ?c=<id>. The id was right there and the page
  refused to sign, because it only looked at the query string.

  A link shape typed one way instead of another should not cost a client their
  place. Both forms are read, so this cannot happen again on either page.
*/
function contactIdFrom(search: string, path: string): string | null {
  /*
    Wherever GHL leaves it.

    The invitation is sent from GHL with click tracking and UTM tagging both
    on, so every link is rewritten before it reaches anyone. A path segment is
    the most fragile place to carry an id through that, and when it was lost the
    page had nothing to attach a signature to and failed at the moment of
    signing.

    So every place the id could plausibly survive is read, in order of how much
    it can be trusted. Costs nothing, and turns a broken link into a working one
    rather than a support conversation.
  */
  const params = new URLSearchParams(search);
  const looksLikeId = (v: string | null) => Boolean(v && /^[A-Za-z0-9_-]{15,40}$/.test(v));

  for (const key of ['c', 'contactId', 'contact_id', 'utm_content']) {
    const v = params.get(key);
    if (looksLikeId(v)) return v;
  }

  const idFromPath = path.split('/').filter(Boolean).pop() || null;
  /* GHL ids are 20-ish url-safe characters. A page name is not. */
  return looksLikeId(idFromPath) ? idFromPath : null;
}

export default function LockIn() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  /* Already had their prep call, so the confirmation must not ask again. */
  const [prepBooked, setPrepBooked] = useState(false);
  const [bookedAt, setBookedAt] = useState<string | null>(null);
  const [embedded, setEmbedded] = useState(false);
  const paidSent = useRef(false);
  const [calHeight, setCalHeight] = useState(700);
  const [days, setDays] = useState<{ total: number; remaining: number } | null>(null);
  /* Name and email from GHL, used to prefill Calendly so they do not retype
     what they already gave us on the application. */
  const [prefill, setPrefill] = useState<{ name: string; email: string }>({ name: '', email: '' });

  /* Remembered progress belongs to the contact, never to the browser. */
  const key = (name: string) => (contactId ? `ae_${name}_${contactId}` : `ae_${name}`);

  /*
    Finishing a step changes the page underneath them: paying unlocks the
    calendar, booking turns the page into a confirmation. Both happen further
    down than they are looking, so send them back to the top to see it.

    Only on the transition into done, never on load. Someone arriving already
    paid is not completing anything, and yanking a returning visitor to the top
    of a page they opened deliberately is just rude.
  */
  const wasPaid = useRef<boolean | null>(null);
  const wasBooked = useRef<boolean | null>(null);

  useEffect(() => {
    const first = wasPaid.current === null && wasBooked.current === null;
    const justCompleted =
      (wasPaid.current === false && paid) || (wasBooked.current === false && booked);

    wasPaid.current = paid;
    wasBooked.current = booked;

    if (first || !justCompleted) return;
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [paid, booked]);

  /*
    The scarcity line is a public promise, so it is counted from GHL rather than
    typed into the page: every `brand-day-confirmed` contact has both paid and
    picked a date, which is exactly what spends one of the Days at this price.

    The endpoint has existed since the line was written but nothing ever called
    it, so the block silently never rendered. It stays hidden if the count
    cannot be fetched: no number at all beats a number that might be a lie.
  */
  useEffect(() => {
    fetch('/.netlify/functions/days-remaining')
      .then((r) => r.json())
      .then((d) => {
        /*
          `counted` is only true when the number came from an actual GHL count.
          Its fallback is the configured total with nothing subtracted, which
          on a page that has already sold Days would read "20 of 20 left" and
          be a straight lie. So the block shows the counted number or nothing.
        */
        if (d?.counted && typeof d.total === 'number' && typeof d.remaining === 'number') {
          setDays({ total: d.total, remaining: d.remaining });
        }
      })
      .catch(() => {
        /* Say nothing rather than guess. */
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = contactIdFrom(window.location.search, window.location.pathname) || store.get('ae_contact_id');
    if (id) {
      setContactId(id);
      store.set('ae_contact_id', id);
    }

    /*
      Progress is remembered PER CONTACT.

      These keys used to be global, so one browser that had ever completed a
      payment showed "You're locked in" to every contact whose link was opened
      in it afterwards. Someone forwarded a link, or Sean checking a client's
      page, saw a paid and booked Day that did not exist.

      Scoping to the contact id makes the memory belong to the person rather
      than the machine.
    */
    const k = (name: string) => (id ? `ae_${name}_${id}` : `ae_${name}`);

    /*
      The browser is no longer allowed an opinion about whether they paid.

      "Have they paid" used to be stored in four places at once: Stripe, a GHL
      tag, this browser, and the page's own state. Three of those could
      disagree with reality, and on one day all three did: a page telling
      somebody they were locked in when they had paid nothing, a calendar that
      unlocked and locked itself again.

      Now there is one owner. GoHighLevel holds the answer, read below, and the
      only thing allowed to override it is arriving straight back from Stripe,
      because the tag has not been written yet at that exact moment.

      The contact id is still cached, because that is identity rather than
      state and it cannot be wrong in a way that matters.
    */
    const justPaid = params.get('paid') === '1';
    const sessionId = params.get('session_id');

    if (justPaid) setPaid(true);

    /* Keep the Stripe session id. It is the only thing that ties this browser
       to the client record the Brand Day webhook just created, and it is how
       the intake form below knows who is filling it in. Stored because it is
       only in the URL on the return trip, and they may well come back later. */
    if (sessionId) store.set(k('cs'), sessionId);
    setCheckoutSession(sessionId || store.get(k('cs')));

    /*
      Then ask GoHighLevel what is actually true and correct the page.

      localStorage is a convenience for surviving a refresh, never the source of
      truth: it is per browser, it goes stale, and it cannot know about a
      payment made on a phone. The tags are the record, so they win. This is
      also what makes the link work on a device that has never seen it before.

      EXCEPT on the trip back from Stripe.

      The tag is written by lock-in-paid and verify-payment, which are still in
      flight while this page is loading. Asking GHL a second after paying gets
      "not paid", because it is not tagged YET. Letting that answer win meant
      the calendar unlocked on arrival and locked itself again a moment later,
      which is precisely what someone who has just handed over $5,000 must never
      see.

      So a fresh return can only ever be upgraded by the server, never undone by
      it. The one thing allowed to take payment back is Stripe itself saying the
      session was not paid, further down.
    */
    if (id) {
      fetch('/.netlify/functions/track-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId: id }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (!d?.ok) return;
          if (d.brandDayPaid) setPaid(true);
          else if (!justPaid) setPaid(false);

          if (d.brandDayBooked) setBooked(true);
          else if (!justPaid) setBooked(false);

          setPrepBooked(Boolean(d.prepBooked));

          if (d.name || d.email) setPrefill({ name: d.name || '', email: d.email || '' });
        })
        .catch(() => {
          /* Offline. The remembered state stands. */
        });
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
          // Stripe says this session was never paid. Lock it back down.
          // Nothing to clear from the browser: it no longer keeps a copy.
          if (v?.verified && v.paid === false) setPaid(false);
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

      const startsAt = e.data?.payload?.event?.start_time || '';
      /* The date is kept for this page load only. calendly-booked writes it to
         GHL, and track-hub reads it back on every future visit, so the browser
         never needs to remember it. */
      if (startsAt) setBookedAt(startsAt);

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
    // Payment comes first now, so the checkout mounts on arrival rather than
    // waiting for a date to be held.
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
          body: JSON.stringify({
            contactId: contactId || store.get('ae_contact_id'),
            brandDayDate: bookedAt || store.get(key('booked_at')) || '',
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
  /*
    Loaded only once payment has cleared, because that is when the widget's
    container first exists. Calendly's script scans the page for
    .calendly-inline-widget when it loads and does nothing for one that appears
    afterwards, so loading it on mount would leave an empty box where the
    calendar should be.
  */
  useEffect(() => {
    if (!paid) return;
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, [paid]);

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
  /*
    Shared by both embeds. `utm_content` carries the contact id so the booking
    webhook can match the person, and name/email are prefilled from GHL so the
    details step is already filled in when they reach it.
  */
  const calendlyParams =
    `hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1` +
    `&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '') +
    (prefill.name ? `&name=${encodeURIComponent(prefill.name)}` : '') +
    (prefill.email ? `&email=${encodeURIComponent(prefill.email)}` : '');

  const calendlyUrl = `${CALENDLY_URL}?${calendlyParams}`;

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
              Your Brand Day is paid for and in both our calendars. Your receipt is in
              your inbox.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mt-14">
            {/*
              The prep call is booked from an email, not here.

              Putting a second calendar on the confirmation asked someone who
              had just paid and picked a date to make a third decision on the
              same screen. It reads as another hurdle rather than a
              confirmation, and it competed with the thing they had just done.
            */}
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/40 p-7 sm:p-8">
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-3">
                What happens next
              </p>
              <h2 className="font-display text-2xl text-white mb-3">Check your inbox</h2>
              <p className="text-zinc-400 leading-relaxed">
                {prepBooked
                  ? 'Your confirmation and invoice are on their way. We have already had the conversation, so there is nothing else to book. I will come back to you with the prep doc before the Day.'
                  : 'Your confirmation and invoice are on their way. There is one thing left after that: a twenty minute prep call, so I turn up already knowing exactly what we need to attack.'}
              </p>
              {contactId && !prepBooked && (
                <a
                  href={`/prep?c=${encodeURIComponent(contactId)}`}
                  className="inline-flex items-center gap-2 mt-6 bg-white text-black px-6 py-3 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Book your prep call
                </a>
              )}
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed text-center mt-8">
              Bring your operator, or whoever owns content, to the Day itself. It works far better
              with them in the room.
            </p>
            <p className="text-zinc-600 text-xs text-center mt-4">
              Nothing arrived within a few minutes? Reply to my email and I will sort it.
            </p>

          </div>
        </Container>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base overflow-x-hidden">
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
                <span className="font-display text-2xl align-middle mr-1.5">
                  {/*
                    Counted from GHL, where a Day is only spent once it is both
                    paid AND booked. Between those two moments the client has
                    paid and the number has not moved, which reads as though
                    their payment did not register. So it is taken down by one
                    locally for exactly that window, and GHL is trusted again
                    the moment the booking lands.
                  */}
                  {paid && !booked ? Math.max(0, days.remaining - 1) : days.remaining}
                </span>
                Days left at $5,000 AUD
              </p>
              <p className="text-zinc-500 text-sm mt-1">After that the price goes to $10,000 AUD.</p>
            </div>
          )}
        </div>

        {/*
          One column, in the order the decision is actually made: what the Day
          is, then paying for it, then choosing the date. The date sits last
          because it stays locked until payment clears, and a locked step is
          only reassuring once you know what you are unlocking.
        */}
        <div className="max-w-3xl mx-auto space-y-16">

          {/*
            1. The Day itself, and only while it is still being decided.

            Once the money has cleared they have bought it, and leaving the
            pitch on the page makes a paid client scroll past a sales section to
            reach the one thing they still have to do. Paying should shorten the
            page, not leave it the same length.
          */}
          {!paid && (
            <section>
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-8">
                What we are doing on the Day
              </p>
              <Walkthrough />
            </section>
          )}

          {/* 2. Payment. */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-6 sm:p-7 ${
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
                <p className="text-white font-medium mb-1">Secure your Brand Day</p>
                <p className="text-zinc-400 text-sm">Investment: $5,000 AUD</p>
                <p className="text-zinc-500 text-sm mt-1 mb-6">
                  Your calendar opens as soon as payment clears and you'll choose your Day
                  immediately.
                </p>

                {/*
                  Full bleed inside the card on a phone.

                  Stripe's embedded checkout will not render below about 320px.
                  The page padding plus this card's own padding left it under
                  that on a narrow screen, so the form rendered wider than its
                  container and was cut off down the right hand side, on the one
                  screen where somebody is trying to pay.

                  The negative margin cancels the card padding for this element
                  only, so the checkout gets the full card width while the copy
                  around it keeps its inset.
                */}
                <div id="stripe-checkout" className="-mx-6 w-[calc(100%+3rem)] sm:mx-0 sm:w-full" />

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
                    Your card is stored securely with Stripe.
                  </p>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">
                    If you decide to go ahead with the 90 Day Authority Engine Install, I'll
                    charge that same card for it only after you've said yes. Nothing is charged
                    without your go ahead.
                  </p>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">
                    If, after your application is reviewed and we do a prep call, either of us
                    decides it's not the right move, you'll be fully refunded.
                  </p>
                  <p className="text-zinc-300 text-[13.5px] leading-relaxed">
                    All I ask is wholehearted implementation and honest feedback.
                  </p>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">
                    P.S. If we decide we're not a fit right now, I'll point you to whoever I
                    believe is the best next step for where you are.
                  </p>
                </div>
              </>
            )}
          </motion.section>

          {/* 3. The date. Shown locked rather than hidden: paying reads as
              unlocking it, and a date is never held by someone who has not
              paid for it. */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              {booked && (
                <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Check size={15} />
                </div>
              )}
              <h2 className="font-display text-xl text-white">
                {booked ? 'Your date is held' : 'Choose your Brand Day'}
              </h2>
            </div>

            {!paid ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-7">
                <p className="text-zinc-400 leading-relaxed">
                  Your calendar opens the moment your payment clears, and you pick your day
                  right here.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mt-3">
                  Dates are held in the order they are paid, so nothing is taken by someone
                  still deciding.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
                <div
                  className="calendly-inline-widget w-full"
                  data-url={calendlyUrl}
                  style={{ minWidth: 280, height: calHeight }}
                />
              </div>
            )}
          </section>

          {/* 4. Where to find them. Deliberately the last step and only once
              the day is actually held: nothing is asked of anyone before they
              have paid, and asking mid-booking would compete with the calendar.

              The link carries the Stripe session id rather than a name, because
              that is what the Brand Day webhook stored against the client record
              it created when payment cleared. The intake page resolves it to
              them and starts the research on their work. */}
          {paid && booked && checkoutSession && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display text-xl text-white">One last thing</h2>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-7">
                <p className="text-zinc-400 leading-relaxed">
                  Before your day, I go and study how you already show up. Point me at your
                  work and I will do the reading. It takes about a minute.
                </p>
                <a
                  href={`https://brand.contentengine.live/welcome?session_id=${encodeURIComponent(checkoutSession)}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-zinc-900 transition hover:bg-zinc-200"
                >
                  Add your channels
                </a>
                <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                  Your YouTube, your Instagram, and three to five podcast appearances you
                  would be happy to be judged on.
                </p>
              </div>
            </section>
          )}

          <p className="text-zinc-600 text-xs text-center">
            Trouble with either step? Reply to my email and I will sort it out.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
