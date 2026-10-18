import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/*
  /upscale - Erina's 90 days, and the day 30 choice. Sean, 2026-10-19.

  Between the 90 Day ($5,000 at day 1 and day 31) and the Concierge. At day 30
  the call is made: run it at 1 and 31, or keep the high touch weekly call for
  all 12 weeks with a third $5,000 at day 61.

  The button goes to Erina's own /install link, the 90 Day agreement, keyed to
  her GHL contact. Unlisted: noindex and disallowed in robots.txt.
  Flat sections and dividers, no boxed cards (client page rule).
*/

const AGREEMENT_URL = '/install?c=4h47HYqgK7VD4eaExDAI';

/* Sean, 2026-10-19: "i just want to help them getting clear with what to post
   and how to do it. first we focus on the business page and short form. then
   we can introduce the personal brands and youtube". No timings given, so none
   are stated. */
const PHASES = [
  { when: 'First', title: 'The business page and short form' },
  { when: 'Then', title: 'The personal brands and YouTube' },
];

const h2 = 'font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8';
const body = 'text-zinc-400 text-lg leading-relaxed';

export default function UpScale90() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title="Your 90 days" description="The 90 days for UpScale." path="/upscale" noIndex />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="accent-line mb-8" />
          <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-4">UpScale</p>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-8">
            Your 90 days
          </h1>
          <p className={body}>
            Two payments to start. At day 30 we choose how the back half runs.
          </p>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>How it runs</h2>
          <p className={`${body} mb-10`}>Getting clear on what to post and how to do it.</p>
          <div className="space-y-6">
            {PHASES.map((p) => (
              <div key={p.title} className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
                <p className="text-zinc-500 text-[15px] font-medium sm:pt-1">{p.when}</p>
                <p className="text-white text-lg font-semibold">{p.title}</p>
              </div>
            ))}
          </div>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>The day 30 choice</h2>
          <p className={`${body} mb-10`}>
            At the day 30 checkpoint we look at where the team is up to, and pick one.
          </p>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            <div className="py-8">
              <p className="text-white text-xl font-semibold mb-1">Run it at 1 and 31</p>
              <p className="text-zinc-500 text-[15px] mb-4">$10,000 in total</p>
              <div className="space-y-2">
                <p className={body}>$5,000 at day 1. $5,000 at day 31. Nothing after that.</p>
                <p className={body}>
                  One call a week for the first four weeks, then fortnightly, then one in month three.
                </p>
              </div>
            </div>

            <div className="py-8">
              <p className="text-white text-xl font-semibold mb-1">Keep the high touch</p>
              <p className="text-zinc-500 text-[15px] mb-4">$15,000 in total</p>
              <div className="space-y-2">
                <p className={body}>$5,000 at day 1, day 31 and day 61.</p>
                <p className={body}>
                  A call every week for the entire 12 weeks, to get training dialled across the team.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>Start with the agreement</h2>
          <p className={`${body} mb-8`}>
            Read it, sign it, and make the first payment. Both options start exactly the same way.
          </p>
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
