import { useEffect } from 'react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that matters once an application is accepted.

  Payment and date selection both happen inside the Calendly embed: the VIP Day
  event has the $5,000 attached, so paying and picking a day are one action.
  That is deliberate. Split across two steps, someone can pay and then close the
  tab before choosing a date, and you are left holding their money with nothing
  booked.

  The `?c=` parameter carries the GHL contact id, merged into the invitation
  email as {{contact.id}}. It rides into Calendly as utm_content and comes back
  on the invitee.created webhook, which is the only thing tying a booking to a
  contact. Without it netlify/functions/calendly-booked cannot match the person
  and the entire post-booking chain has nothing to fire on.
*/

const CALENDLY_URL = 'https://calendly.com/sean-authorityengine/vip-day';

export default function LockIn() {
  const params = new URLSearchParams(window.location.search);
  const contactId = params.get('c');

  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  useEffect(() => {
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="accent-line mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
            Lock in your Brand Builder Day
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
            Pick your day below. Payment and the date happen in one step, and it goes
            straight into both our calendars.
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="max-w-2xl mx-auto grid gap-4 sm:grid-cols-3">
          {[
            ['The morning', 'We pull the brand apart. Where the message breaks, and what it is costing you.'],
            ['The afternoon', 'We rebuild it and shoot it. The camera comes out.'],
            ['You finish with', 'Assets, not notes. Your operator picks it up Monday.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{title}</p>
              <p className="text-zinc-300 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <p className="max-w-2xl mx-auto text-zinc-500 text-sm leading-relaxed mt-6 text-center">
          The $5,000 credits in full toward the 90-Day Install. If we do the prep call and I
          decide it is not the right move for you, I refund you in full.
        </p>
      </Container>

      <Container className="pb-32">
        <div className="max-w-3xl mx-auto">
          <div
            className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-zinc-800"
            data-url={calendlyUrl}
            style={{ minWidth: 320, height: 820 }}
          />
          <p className="text-zinc-600 text-xs text-center mt-6">
            Trouble booking? Reply to my email and I will lock your date in by hand.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
