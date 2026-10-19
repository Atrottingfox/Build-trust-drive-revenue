import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import TermsBody from '../components/TermsBody';
import {
  UPSCALE_TITLE,
  UPSCALE_INTRO,
  UPSCALE_BEFORE,
  UPSCALE_AFTER,
  UPSCALE_OPTIONS,
  UPSCALE_BOTH,
  UPSCALE_DAY30_CRITERIA,
} from '../content/install-terms-upscale';

/*
  /upscale - Erina's 90 days, aligned to Sean's email to her (2026-10-19).

  Rendered from the same source as her agreement (install-terms-upscale.ts),
  so this page and what she signs cannot say different things. The two options
  sit side by side: what differs first, then what both include. The button goes
  to her own /install link, which loads that agreement.
  Unlisted: noindex and disallowed in robots.txt.
  Flat sections and dividers, no boxed cards (client page rule).
*/

const AGREEMENT_URL = '/install?c=4h47HYqgK7VD4eaExDAI';

const h2 = 'font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8';
const label = 'text-zinc-500 text-xs tracking-[0.14em] uppercase mb-2';
const text = 'text-zinc-400 text-[16px] leading-relaxed';

function Section({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section>
      <hr className="border-zinc-800 my-14" />
      <h2 className={h2}>{heading}</h2>
      <TermsBody lines={body} size="lg" />
    </section>
  );
}

export default function UpScale90() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title={UPSCALE_TITLE} description="The 90 days for UpScale." path="/upscale" noIndex />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="accent-line mb-8" />
          <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-4">The Authority Engine</p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-8">
            {UPSCALE_TITLE}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">{UPSCALE_INTRO}</p>

          {UPSCALE_BEFORE.map((s) => (
            <Section key={s.heading} heading={s.heading} body={s.body} />
          ))}

          <section>
            <hr className="border-zinc-800 my-14" />
            <h2 className={h2}>2. The Day 30 decision</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              At Day 30, we will decide together which level of support is appropriate for the remaining 60
              days, based on:
            </p>
            <TermsBody lines={UPSCALE_DAY30_CRITERIA.map((c) => `• ${c}`)} size="lg" />

            {/* Side by side from sm up, stacked on a phone. Divided, not boxed. */}
            <div className="mt-12 grid sm:grid-cols-2 border-t border-zinc-800 sm:divide-x divide-zinc-800">
              {UPSCALE_OPTIONS.map((o) => (
                <div
                  key={o.letter}
                  className={`pt-8 pb-8 ${o.letter === 'A' ? 'sm:pr-8' : 'sm:pl-8 border-t sm:border-t-0 border-zinc-800'}`}
                >
                  <p className="text-zinc-500 text-sm font-medium mb-1">Option {o.letter}</p>
                  <p className="text-white text-2xl font-display font-extrabold tracking-tight leading-tight mb-3">
                    {o.name}
                  </p>
                  <p className={`${text} mb-7`}>{o.forWho}</p>

                  <p className={label}>Calls</p>
                  <p className={`${o.letter === 'B' ? 'text-white' : 'text-zinc-400'} text-[16px] leading-relaxed mb-7`}>
                    {o.calls}
                  </p>

                  <p className={label}>Support</p>
                  <ul className={`${text} list-disc pl-5 space-y-1.5 marker:text-zinc-600 mb-7`}>
                    {o.differs.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>

                  <p className={label}>Payments after commencement</p>
                  <ul className={`${text} list-disc pl-5 space-y-1.5 marker:text-zinc-600 mb-7`}>
                    {o.payments.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  <p className={label}>Total, including the Brand Day</p>
                  <p className="text-white text-3xl font-display font-extrabold tracking-tight">{o.total}</p>
                  <p className="text-zinc-500 text-sm mt-1">AUD</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <p className={label}>Included under both options, Day 31 to Day 90</p>
              <ul className={`${text} list-disc pl-5 space-y-1.5 marker:text-zinc-600`}>
                {UPSCALE_BOTH.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </section>

          {UPSCALE_AFTER.map((s) => (
            <Section key={s.heading} heading={s.heading} body={s.body} />
          ))}

          <hr className="border-zinc-800 my-14" />

          <a
            href={AGREEMENT_URL}
            className="inline-block w-full sm:w-auto text-center px-8 py-4 rounded-full text-[15px] font-semibold bg-white text-black hover:bg-zinc-100 transition-colors"
          >
            Read and sign the 90 Day agreement
          </a>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
