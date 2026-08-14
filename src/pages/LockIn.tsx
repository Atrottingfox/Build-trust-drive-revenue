import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that goes to an accepted applicant.

  Step 2 does not exist until Stripe has been paid. That is deliberate: the
  Calendly event is unlisted and never shared directly, so this page is the only
  route to the calendar and nobody can book a day without paying for it.

  Contact id handling. The id arrives as ?c= (merged into the invitation email
  as {{contact.id}}). It goes to Stripe as client_reference_id so the payment
  matches the exact contact, and it is stashed in localStorage first because
  Stripe's redirect back here does not carry it. On return it is read back out
  and passed into Calendly as utm_content, so the booking is attributable too.
*/

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/14A3co6uA0Vi5Swfdh0000h';
const CALENDLY_URL = 'https://calendly.com/sean-authorityengine/vip-day';
const STORAGE_KEY = 'ae_contact_id';

export default function LockIn() {
  const [paid, setPaid] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('c');

    // Stripe's redirect drops our query string, so fall back to what we stored
    // before sending them off to pay.
    let id = fromUrl;
    if (!id) {
      try {
        id = localStorage.getItem(STORAGE_KEY);
      } catch {
        id = null;
      }
    }
    if (id) setContactId(id);

    if (fromUrl) {
      try {
        localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        // Private browsing. The Stripe client_reference_id still records it.
      }
    }

    if (params.get('paid') === '1') {
      setPaid(true);
      if (id) {
        // Fire and forget. They have paid, so nothing here may block them from
        // reaching the calendar. The function logs failures for reconciliation.
        fetch('/.netlify/functions/lock-in-paid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId: id }),
        }).catch(() => {});
      }
    }
  }, []);

  const payUrl =
    STRIPE_PAYMENT_LINK +
    (contactId ? `?client_reference_id=${encodeURIComponent(contactId)}` : '');

  const calendlyUrl =
    `${CALENDLY_URL}?hide_gdpr_banner=1` +
    (contactId ? `&utm_content=${encodeURIComponent(contactId)}` : '');

  useEffect(() => {
    if (!paid) return;
    if (document.querySelector('script[data-calendly]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.dataset.calendly = 'true';
    document.body.appendChild(s);
  }, [paid]);

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
            Two steps. Pay, then pick your day. Takes about a minute.
          </p>
        </div>
      </Container>

      <Container className="pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Step 1 */}
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
                {paid ? 'Payment received' : 'Pay $5,000 AUD'}
              </h2>
            </div>

            {paid ? (
              <p className="text-zinc-400 leading-relaxed">
                Thank you. Your Brand Builder Day is paid for. One thing left.
              </p>
            ) : (
              <>
                <p className="text-zinc-400 leading-relaxed mb-5">
                  One full day, at your office. We pull the brand apart in the morning, rebuild
                  and shoot it in the afternoon. You finish with assets, not notes.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  The $5,000 credits in full toward the 90-Day Install. If we do the prep call
                  and I decide it is not the right move for you, I refund you in full.
                </p>

                <a
                  href={payUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
                >
                  Pay $5,000 AUD
                  <ArrowRight size={16} />
                </a>
              </>
            )}
          </motion.div>

          <div className="my-4 h-6 w-px bg-zinc-800 mx-auto" />

          {/* Step 2 */}
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
                  paid ? 'bg-white/10 text-white' : 'bg-white/5 text-zinc-600'
                }`}
              >
                2
              </div>
              <h2 className={`font-display text-xl ${paid ? 'text-white' : 'text-zinc-600'}`}>
                Pick your day
              </h2>
            </div>

            {paid ? (
              <div
                className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-zinc-800"
                data-url={calendlyUrl}
                style={{ minWidth: 320, height: 780 }}
              />
            ) : (
              <p className="text-zinc-600 leading-relaxed">
                Available once payment goes through.
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
