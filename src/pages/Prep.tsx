import { useEffect, useState } from 'react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';

/*
  /prep - booking the twenty minute prep call.

  This page exists because of a mistake. The prep call used to be embedded on
  the confirmation, which was too much to put in front of somebody who had just
  paid and picked a date. Taking it off was right. Replacing it with a bare
  Calendly link in an email was not.

  A bare Calendly link carries no contact id, so `calendly-booked` has nothing
  to match the booking to. It tags nobody, the prep call never shows as booked,
  and the reminder chases people who have already booked. There was no way to
  know who had locked one in.

  So the email links here instead, with ?c=<contactId>, and the embed passes it
  through as utm_content exactly as the Brand Day one does.
*/

const PREP_CALL_URL = 'https://calendly.com/sean-authorityengine/prep-call';

/* Shared with /lock-in and /install: the id arrives as ?c= or as a path
   segment, because a link written either way should still work. */
function contactIdFrom(search: string, path: string): string | null {
  /*
    Wherever GHL leaves it. The invitation goes out with click tracking and UTM
    tagging on, so every link is rewritten before anyone sees it, and a path
    segment is the most fragile place to carry an id through that.
  */
  const params = new URLSearchParams(search);
  const looksLikeId = (v: string | null) => Boolean(v && /^[A-Za-z0-9_-]{15,40}$/.test(v));

  for (const key of ['c', 'contactId', 'contact_id', 'utm_content']) {
    const v = params.get(key);
    if (looksLikeId(v)) return v;
  }

  const last = path.split('/').filter(Boolean).pop() || null;
  return looksLikeId(last) ? last : null;
}

export default function Prep() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [prefill, setPrefill] = useState({ name: '', email: '' });
  /* Tall enough that the picker fits before Calendly says anything. */
  const [height, setHeight] = useState(860);
  /* Calendly announces the booking through postMessage. Nothing else on this
     page needs to happen after it, so the page says so and gets out of the way. */
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const id = contactIdFrom(window.location.search, window.location.pathname);
    if (!id) return;
    setContactId(id);

    /* Name and email come back from GHL so the details step is already filled
       in. They have typed both once already. */
    fetch('/.netlify/functions/track-hub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId: id, page: 'prep' }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && (d.name || d.email)) setPrefill({ name: d.name || '', email: d.email || '' });
      })
      .catch(() => {
        /* The calendar still works. They just type their own details. */
      });
  }, []);

  useEffect(() => {
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, []);

  /* Calendly's steps are different heights. Follow it so nothing is cut off. */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data?.event !== 'string' || !e.data.event.startsWith('calendly.')) return;
      if (e.data.event === 'calendly.event_scheduled') setBooked(true);
      /*
        Calendly sends this as a number in some versions and as "1200px" in
        others. Only the number was accepted, so the container stayed at its
        initial 700 and the booking scrolled inside its own frame, which reads
        as broken on a page whose only job is to take a booking.
      */
      const h = parseInt(String(e.data?.payload?.height ?? ''), 10);
      if (h > 300) setHeight(h);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const url =
    /*
      `hide_event_type_details` matters more than it looks. Without it Calendly
      repeats the title, duration and description above its own calendar, which
      this page has already said, and the extra block pushed the picker past the
      frame so the booking scrolled inside itself. Calendly does not always
      broadcast a height, so the container cannot be relied on to follow: the
      fix is to not make the content taller in the first place.
    */
    `${PREP_CALL_URL}?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1` +
    `&background_color=0e0e11&text_color=e4e4e7&primary_color=3b82f6` +
    /* The whole reason this page exists: the booking has to come back
       attached to a person. */
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '') +
    (prefill.name ? `&name=${encodeURIComponent(prefill.name)}` : '') +
    (prefill.email ? `&email=${encodeURIComponent(prefill.email)}` : '');

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-28 pb-24">
        <div className="max-w-2xl mx-auto">
          {booked ? (
            <div className="text-center py-16">
              <div className="mx-auto mb-7 h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
                Booked
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed">
                You can close this page now. Keen to rip in.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mt-8 max-w-md mx-auto">
                The details are in your calendar and your inbox. Bring your operator, or whoever
                owns content.
              </p>
            </div>
          ) : (
          <>
          <div className="text-center mb-10">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              Book your prep call
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Twenty minutes. We go through your prep doc together so I turn up already knowing
              exactly what we need to attack, and what problems to solve.
            </p>
          </div>

          {!contactId && (
            /* Said before the calendar, not after they have booked into a void.
               Without the id the booking cannot be matched to them. */
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-5 mb-6">
              <p className="text-amber-200/90 text-[15px] font-medium mb-1.5">
                This link is missing your personal code
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Use the full link from my email, the one ending in{' '}
                <span className="font-mono text-zinc-300">?c=</span> and a code. Book here anyway if
                you like, and reply to my email so I can match it to you.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
            <div
              className="calendly-inline-widget w-full"
              data-url={url}
              style={{ minWidth: 280, height }}
            />
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed text-center mt-8">
            Bring your operator, or whoever owns content. It works far better with them in the room.
          </p>
          </>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
}
