import { useEffect } from 'react';
import { Container } from '../components/ui/Container';
import { Check } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /booked - where Calendly redirects after the VIP Day is paid and booked.

  This is the first thing someone sees after handing over $5,000, so it has one
  job: confirm it worked and tell them exactly what happens next. No upsell, no
  navigation away.

  Calendly appends its own query params (invitee name, event start time) to the
  redirect. We deliberately do not parse them: the confirmation email carries the
  authoritative date, and a mis-parsed date here would be worse than no date.
*/

const NEXT = [
  {
    title: 'A confirmation email, now',
    body: 'Date, time and what to have ready on the day. It also carries your Short-Form Sprint access so your team can start this week.',
  },
  {
    title: 'A prep call before we meet',
    body: 'Twenty minutes. I get under the hood on your offer, your team and what you actually want out of the day, so we walk in already knowing what we are building.',
  },
  {
    title: 'A prep doc, seven days out',
    body: 'Short, and it is what makes the day worth the money. Do not leave it to the Sunday night.',
  },
];

export default function Booked() {
  /*
    Stripe sends them here after the buy button overlay completes, and the
    query string does not survive the trip. The contact id was stashed in
    localStorage on /lock-in, so read it back and tag `brand-day-paid` in GHL.
    That is what links the payment to the person without a Stripe webhook.
  */
  useEffect(() => {
    let id: string | null = null;
    try {
      id = localStorage.getItem('ae_contact_id');
    } catch {
      id = null;
    }
    if (!id) return;

    fetch('/.netlify/functions/lock-in-paid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId: id }),
    }).catch(() => {
      // They have paid. Nothing here may interrupt the confirmation.
    });
  }, []);

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-16 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="mx-auto mb-7 h-14 w-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
              <Check className="text-emerald-400" size={24} />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              You're locked in
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Your Brand Builder Day is paid for and in both our calendars.
            </p>
          </div>

          <div className="mt-14 space-y-3">
            {NEXT.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
              >
                <h2 className="font-display text-lg text-white mb-2">{title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed text-center mt-12">
            Bring your operator, or whoever owns content. The day works far better with them
            in the room.
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
