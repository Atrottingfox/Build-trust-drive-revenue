import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/*
  Secondary path under the main button on /founding-v5 (Sean, 16 Nov).
  The Calendly "Fit call" opens inline on the page, never a new tab.
  GA4: fit_call_open when the calendar opens, fit_call_booked when Calendly
  reports a booking (its postMessage event).
*/
const URL = 'https://calendly.com/sean-authorityengine/fit-call';

function ga(event: string) {
  try {
    window.gtag?.('event', event, { cta_location: 'founding-v5' });
  } catch {
    /* analytics is never load bearing */
  }
}

export default function FitCall() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') ga('fit_call_booked');
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const src = `${URL}?embed_type=Inline&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'authorityengine.com.au'}&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=3b7dff`;

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <p className="text-white text-[15px] font-semibold">Prefer to talk it through first?</p>
      <p className="text-zinc-400 text-sm leading-relaxed mt-1">
        If you have a specific question about fit, implementation or your team's starting point, request a call. The walkthrough explains the offer. The call is for resolving anything specific to your situation.
      </p>
      <button
        type="button"
        onClick={() => {
          if (!open) ga('fit_call_open');
          setOpen(!open);
        }}
        className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold mt-3"
      >
        Have a question? Request a fit call
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
          <iframe title="Book a fit call" src={src} className="w-full h-[700px] md:h-[660px]" loading="lazy" />
        </div>
      )}
    </div>
  );
}
