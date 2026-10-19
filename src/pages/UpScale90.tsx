import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { UPSCALE_TITLE, UPSCALE_INSTALL, UPSCALE_TRACKS } from '../content/install-terms-upscale';

/*
  /upscale - Erina's 90 days. Sean's text, 2026-10-19: the Initial 30 Day
  Install, then Track A and Track B side by side.

  Rendered from the same source as her agreement (install-terms-upscale.ts),
  so the page and what she signs cannot say different things. The button goes
  to her own /install link, which loads that agreement.
  Unlisted: noindex and disallowed in robots.txt.
  Flat sections and dividers, no boxed cards (client page rule).
*/

const AGREEMENT_URL = '/install?c=4h47HYqgK7VD4eaExDAI';

const h2 = 'font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]';
const label = 'text-zinc-500 text-xs tracking-[0.14em] uppercase mb-3';
const text = 'text-zinc-400 text-[16px] leading-relaxed';
const list = `${text} list-disc pl-5 space-y-1.5 marker:text-zinc-600`;

export default function UpScale90() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title={UPSCALE_TITLE} description="The 90 days for UpScale." path="/upscale" noIndex />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="accent-line mb-8" />
          <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-4">The Authority Engine</p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
            {UPSCALE_TITLE}
          </h1>

          <hr className="border-zinc-800 my-14" />

          {/* Initial 30 Day Install */}
          <h2 className={`${h2} mb-3`}>{UPSCALE_INSTALL.name}</h2>
          <p className="text-white text-lg mb-8">Investment: {UPSCALE_INSTALL.investment}</p>
          <p className={label}>Included</p>
          <ul className={list}>
            {UPSCALE_INSTALL.included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <div className="space-y-3 mt-8">
            {UPSCALE_INSTALL.after.map((a) => (
              <p key={a} className="text-zinc-400 text-lg leading-relaxed">
                {a}
              </p>
            ))}
          </div>

          <hr className="border-zinc-800 mt-14" />

          {/* The two tracks, side by side from sm up, stacked on a phone. */}
          <div className="grid sm:grid-cols-2 sm:divide-x divide-zinc-800">
            {UPSCALE_TRACKS.map((t) => (
              <div
                key={t.letter}
                className={`py-10 ${t.letter === 'A' ? 'sm:pr-8' : 'sm:pl-8 border-t sm:border-t-0 border-zinc-800'}`}
              >
                <p className="text-zinc-500 text-sm font-medium mb-1">Track {t.letter}</p>
                <p className="text-white text-2xl font-display font-extrabold tracking-tight leading-tight mb-3">
                  {t.name}
                </p>
                <p className="text-zinc-300 text-[16px] leading-relaxed mb-2">{t.forWho}</p>
                <p className={`${text} mb-8`}>{t.rhythm}</p>

                <p className={label}>Weeks 5 to 12, included</p>
                <ul className={`${list} mb-8`}>
                  {t.included.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>

                <p className={label}>Additional investment</p>
                <div className="mb-8">
                  {t.investment.map((i, n) =>
                    n === 0 && t.investment.length > 1 ? (
                      <p key={i} className="text-white text-[16px] mb-1">
                        {i}
                      </p>
                    ) : (
                      <p key={i} className={t.investment.length > 1 ? `${text} pl-5` : 'text-white text-[16px]'}>
                        {t.investment.length > 1 ? `• ${i}` : i}
                      </p>
                    )
                  )}
                </div>

                <p className={label}>Total investment</p>
                <ul className={`${list} mb-4`}>
                  {t.breakdown.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="text-white text-3xl font-display font-extrabold tracking-tight">Total: {t.total}</p>
              </div>
            ))}
          </div>

          <hr className="border-zinc-800 mb-14" />

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
