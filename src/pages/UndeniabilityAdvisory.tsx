import { useState } from 'react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import { Agreement, StepShell } from '../components/AgreementSteps';
import {
  AGREEMENT,
  TERMS_TITLE,
  TERMS_VERSION,
  termsAreComplete,
} from '../content/undeniability-advisory-terms';

/*
  /undeniability-advisory. Rhys Livingstone's ongoing $4,000 a month advisory,
  kept apart from the $8,000 build on Sean's call (16 Oct 2026).

  Read and sign only. No payment here yet. The signature (name, version, time,
  IP) goes to Slack and the function log through undeniability-part2.
*/

const SIG_KEY = 'ae_undeniable_advisory_sig';

export default function UndeniabilityAdvisory() {
  const [test] = useState(() => new URLSearchParams(window.location.search).get('test') === '1');
  const [signed, setSigned] = useState(() => {
    try {
      return localStorage.getItem(SIG_KEY) === TERMS_VERSION;
    } catch {
      return false;
    }
  });
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const complete = termsAreComplete();

  const sign = async () => {
    if (!name.trim() || !agreed || signing) return;
    setSigning(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/undeniability-part2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sign',
          offer: 'advisory',
          signatureName: name.trim(),
          termsVersion: TERMS_VERSION,
          test,
        }),
      });
      if (!(await res.json())?.ok) throw new Error('sign failed');
      try {
        localStorage.setItem(SIG_KEY, TERMS_VERSION);
      } catch {
        /* private browsing */
      }
      setSigned(true);
    } catch {
      setError('Something went wrong saving your signature. Try again, or message me.');
    } finally {
      setSigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          {test && (
            <p className="text-amber-300/90 text-sm text-center mb-6">Test mode.</p>
          )}

          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              {TERMS_TITLE}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              The ongoing advisory, once the build is running.
            </p>
          </div>

          <StepShell n={1} title={signed ? 'Signed' : 'Read it and sign'} state={signed ? 'done' : 'open'}>
            {signed ? null : (
              <>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 max-h-[520px] overflow-y-auto space-y-6">
                  <Agreement md={AGREEMENT} />
                  <p className="text-zinc-600 text-xs">Version {TERMS_VERSION}</p>
                </div>

                {!complete ? (
                  <p className="text-zinc-500 text-sm mt-6">
                    This agreement is still being finalised. Signing opens once it is.
                  </p>
                ) : (
                  <div className="mt-7">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Type your full name to sign
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rhys Livingstone"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                    <label className="flex items-start gap-3 mt-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 accent-blue-500 shrink-0"
                      />
                      <span className="text-zinc-400 text-sm leading-relaxed">
                        I have read the agreement, I am authorised to enter into it, and I agree to the
                        12 month advisory at $4,000 AUD per month.
                      </span>
                    </label>

                    {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

                    <button
                      onClick={sign}
                      disabled={signing}
                      className={`mt-7 w-full sm:w-auto px-8 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${
                        name.trim() && agreed && !signing
                          ? 'bg-white text-black hover:bg-zinc-100'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {signing ? 'Saving' : 'Sign the agreement'}
                    </button>
                  </div>
                )}
              </>
            )}
          </StepShell>

          <p className="text-zinc-600 text-xs text-center mt-10">
            Questions about any of this? Message me before you sign.
          </p>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
