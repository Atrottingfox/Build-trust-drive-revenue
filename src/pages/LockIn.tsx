import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

/*
  /lock-in - the only link that matters after an application is accepted.

  Two steps on one page. Step 2 does not exist until Step 1 succeeds, which is
  what lets the payment success handler tag GHL directly instead of us having to
  map a Stripe webhook payload.

  The `?c=` parameter carries the GHL contact id, merged into the invitation
  email as {{contact.id}}. It rides through Stripe as client_reference_id so a
  payment matches back to the exact contact. Matching on email address breaks
  the first time someone applies from a personal address and pays on the company
  card, which is why this is not optional.
*/

const BRAND_DAY_PRICE = '$5,000 AUD';

// Dropped in once the Brand Builder Day calendar exists in GHL. Until then the
// step renders an honest placeholder rather than a broken iframe.
const GHL_CALENDAR_EMBED_URL = '';

type Stage = 'pay' | 'paid';

export default function LockIn() {
  const [stage, setStage] = useState<Stage>('pay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactId, setContactId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('c');
    if (c) setContactId(c);

    // Stripe sends them back here with ?paid=1 after a successful checkout.
    if (params.get('paid') === '1') {
      setStage('paid');
      // Tag the contact in GHL. Fire and forget: if this fails the person has
      // still paid and must not be blocked from picking a date. WF6 catches
      // anyone who ends up paid with no date.
      if (c) {
        fetch('/.netlify/functions/lock-in-paid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId: c }),
        }).catch(() => {});
      }
    }
  }, []);

  const startCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/lock-in-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout');
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError('Something went wrong starting the payment. Reply to my email and I will sort it out.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-16">
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
              stage === 'paid' ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-700 bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  stage === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'
                }`}
              >
                {stage === 'paid' ? <Check size={15} /> : '1'}
              </div>
              <h2 className="font-display text-xl text-white">
                {stage === 'paid' ? 'Payment received' : `Pay ${BRAND_DAY_PRICE}`}
              </h2>
            </div>

            {stage === 'paid' ? (
              <p className="text-zinc-400 leading-relaxed">
                Thank you. Your Brand Builder Day is paid for. One thing left.
              </p>
            ) : (
              <>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  One full day, at your office. We pull the brand apart in the morning, rebuild
                  and shoot it in the afternoon. You finish with assets, not notes.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  This credits in full toward the 90-Day Install. If I review everything, we do
                  the prep call, and I decide it is not the right move, I refund you in full.
                </p>

                <button
                  onClick={startCheckout}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? 'Opening checkout' : `Pay ${BRAND_DAY_PRICE}`}
                  {!loading && <ArrowRight size={16} />}
                </button>

                {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
              </>
            )}
          </motion.div>

          {/* Step 2 */}
          <div className="my-4 h-6 w-px bg-zinc-800 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`rounded-2xl border p-6 sm:p-8 ${
              stage === 'paid' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-950/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${
                  stage === 'paid' ? 'bg-white/10 text-white' : 'bg-white/5 text-zinc-600'
                }`}
              >
                2
              </div>
              <h2
                className={`font-display text-xl ${
                  stage === 'paid' ? 'text-white' : 'text-zinc-600'
                }`}
              >
                Pick your day
              </h2>
            </div>

            {stage === 'paid' ? (
              GHL_CALENDAR_EMBED_URL ? (
                <iframe
                  src={`${GHL_CALENDAR_EMBED_URL}${
                    contactId ? `?contact_id=${encodeURIComponent(contactId)}` : ''
                  }`}
                  title="Choose your Brand Builder Day"
                  className="w-full rounded-xl border border-zinc-800"
                  style={{ height: 720 }}
                />
              ) : (
                <p className="text-zinc-400 leading-relaxed">
                  The calendar is not connected yet. Reply to my email and we will lock your date
                  in by hand.
                </p>
              )
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
