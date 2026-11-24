import SEO from '../components/SEO';
import { useStatus } from './Founding';
import { foundingTerms, FOUNDING_TERMS_TITLE, FOUNDING_TERMS_VERSION } from '../content/founding-terms';

/* /founding-agreement (Sean, 24 Nov): the founding agreement, linked from the
   tick box above the checkout button. ?c=<credit contact id> shows the Brand Day credit version,
   ?credit=1 previews it. Unlisted, noindex. */

export default function FoundingAgreement() {
  const status = useStatus();
  const preview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('credit') === '1';
  const credit = preview || Boolean(status?.credit);
  const terms = foundingTerms(credit);

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO title="Founding Agreement" description="The founding 90 Day agreement." path="/founding-agreement" noIndex />
      <section className="pt-32 pb-24 md:pt-40">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#3B7DFF]">The Authority Engine</p>
          <h1 className="font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] mt-3">{FOUNDING_TERMS_TITLE}</h1>
          <p className="text-zinc-500 text-[15px] mt-3">{credit ? 'Brand Day already paid. ' : ''}Version {FOUNDING_TERMS_VERSION}</p>

          <div className="mt-12 space-y-10">
            {terms.map((sec) => (
              <div key={sec.heading}>
                <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em]">{sec.heading}</h2>
                <div className="mt-3 space-y-2.5">
                  {sec.body.map((line, i) =>
                    line.startsWith('## ') ? (
                      <p key={i} className="text-zinc-900 font-semibold pt-2">{line.slice(3)}</p>
                    ) : line.startsWith('• ') ? (
                      <p key={i} className="flex items-start gap-3 text-zinc-600 text-[16px] leading-relaxed">
                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        {line.slice(2)}
                      </p>
                    ) : (
                      <p key={i} className="text-zinc-600 text-[16px] leading-relaxed">{line}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
