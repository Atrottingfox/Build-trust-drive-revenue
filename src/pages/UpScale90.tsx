import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import TermsBody from '../components/TermsBody';
import { UPSCALE_PAGE, UPSCALE_TITLE, UPSCALE_INTRO } from '../content/install-terms-upscale';

/*
  /upscale - Erina's 90 days. Sean's own text, 2026-10-19.

  Rendered from the same source as her agreement (install-terms-upscale.ts),
  so this page and what she signs cannot say different things. The button goes
  to her own /install link, keyed to her GHL contact, which loads that
  agreement. Unlisted: noindex and disallowed in robots.txt.
  Flat sections and dividers, no boxed cards (client page rule).
*/

const AGREEMENT_URL = '/install?c=4h47HYqgK7VD4eaExDAI';

export default function UpScale90() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title={UPSCALE_TITLE} description="The 90 days for UpScale." path="/upscale" noIndex />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="accent-line mb-8" />
          <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-4">The Authority Engine</p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-8">
            {UPSCALE_TITLE}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">{UPSCALE_INTRO}</p>

          {UPSCALE_PAGE.map((section) => (
            <section key={section.heading}>
              <hr className="border-zinc-800 my-14" />
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
                {section.heading}
              </h2>
              <TermsBody lines={section.body} size="lg" />
            </section>
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
