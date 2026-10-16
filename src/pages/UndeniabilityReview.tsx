import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import { Agreement } from '../components/AgreementSteps';
import {
  REVIEW_TITLE,
  PHASE_1,
  PHASE_2,
  ADVISORY_BUILD,
  ADVISORY_ONGOING,
  ADVISORY_PATH,
  REFERRAL,
} from '../content/undeniability-review';

/*
  /undeniability-review, password Scale. Jacob's 75 day review for Rhys, one
  page per tab (Sean, 16 Oct): Phase 1 Review, Phase 2 Recommendation,
  Advisory Options, Founding Partner. Tabs across the top of each.

  Each option has a lock in button underneath. The build goes to
  /undeniability-part2 (3 x $8,000 + GST), the advisory to /advisory
  (12 x $4,000 + GST). Same gate key as /advisory, so one password covers both.
*/

const TABS = [
  { slug: '', label: 'Phase 1 Review' },
  { slug: 'phase-2', label: 'Phase 2 Recommendation' },
  { slug: 'options', label: 'Advisory Options' },
  { slug: 'founding-partner', label: 'Founding Partner' },
];

function LockIn({ to, label, note }: { to: string; label: string; note: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900/40 p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
      <p className="text-zinc-400 text-sm leading-relaxed">{note}</p>
      <Link
        to={to}
        className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3 rounded-full bg-white text-black text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
      >
        {label}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function Review() {
  const { tab = '' } = useParams();
  const current = TABS.find((t) => t.slug === tab) ? tab : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white">{REVIEW_TITLE}</h1>
          </div>

          <nav className="mb-12 flex gap-1.5 overflow-x-auto rounded-full border border-zinc-800 bg-zinc-950/60 p-1.5">
            {TABS.map((t) => (
              <Link
                key={t.slug || 'phase-1'}
                to={`/undeniability-review${t.slug ? `/${t.slug}` : ''}`}
                className={`shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                  t.slug === current ? 'bg-white text-black font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>

          {current === '' && (
            <section>
              <h2 className="font-display text-3xl text-white mb-6">Phase 1 Review</h2>
              <Agreement md={PHASE_1} />
            </section>
          )}

          {current === 'phase-2' && (
            <section>
              <h2 className="font-display text-3xl text-white mb-6">Phase 2 Recommendation</h2>
              <Agreement md={PHASE_2} />
            </section>
          )}

          {current === 'options' && (
            <section>
              <h2 className="font-display text-3xl text-white mb-6">Advisory Options</h2>

              <Agreement md={ADVISORY_BUILD} />
              <LockIn
                to="/undeniability-part2"
                label="Lock in Phase 2"
                note="$8,000 + GST today, day 31 and day 61. Charged automatically."
              />

              <hr className="border-zinc-800 my-12" />

              <Agreement md={ADVISORY_ONGOING} />
              <LockIn
                to="/advisory"
                label="Lock in Advisory"
                note="$4,000 + GST a month for 12 months. Charged automatically."
              />

              <hr className="border-zinc-800 my-12" />

              <Agreement md={ADVISORY_PATH} />
            </section>
          )}

          {current === 'founding-partner' && (
            <section>
              <h2 className="font-display text-3xl text-white mb-6">Founding Referral Partner Opportunity</h2>
              <Agreement md={REFERRAL} />
            </section>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default function UndeniabilityReview() {
  return (
    <PasswordGate password="Scale" storageKey="advisory-unlocked">
      <Review />
    </PasswordGate>
  );
}
