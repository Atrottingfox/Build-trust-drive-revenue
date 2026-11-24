import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { Section } from './Founding';

/* /advisoryoutline (Sean, 24 Nov): will do, won't do and your responsibilities inside the advisory. Unlisted, noindex. */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#3B7DFF]">{children}</p>
);
const H = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] text-zinc-900 ${className}`}>{children}</h1>
);

/* Sean, 24 Nov: will do and won't do inside the advisory. His words. /advisoryoutline. */
const WILL_DO = [
  'Set content direction (What to stop + what to do more of)',
  'Decide what to create',
  'Topic selection refinement',
  'Review work and tell you what to improve, where and how',
  'Review pieces when change in strategy occur',
  'Hook refinement',
  'Define short form and long form priorities',
  'Give you the standards for good content',
  'Give direct, actionable feedback to improve on',
  'Support you through calls, Looms, training and WhatsApp',
  'Help you build a consistent, reliable publishing rhythm',
  'Help your team make better decisions without waiting for you',
  'Review the data and decide what to do more of next',
];
/* Sean, 24 Nov: your responsibilities, his words. */
const YOUR_PART = [
  'Attend the agreed sessions',
  'Submit any work for review on time',
  'Assign one core person to own implementation',
  'Make decisions quickly',
  'Publish or deploy the agreed work',
  'Share performance data honestly',
  'Complete the implementation work between sessions',
];
const WONT_DO = [
  'Write scripts',
  'Unlimited revisions or endless feedback',
  'Edit or publish',
  'Tell everybody exactly what to do',
  'Film anything for you',
  'Adhoc meetings',
  'Chase attendance, or submitting work',
  'Change strategy every week because of a new idea',
  'Manage the team',
  'Act as a CMO',
  'Calls without a specific purpose',
  'Review all posts before they go out',
  'Guarantee formats work',
  'Guarantee any leads, sales, or revenue',
  'Make every decision forever',
];


/* Sean, 24 Nov: "show what when happens". Only commitments already on /founding (STEPS, NOW and GROUPS in OpenPage.tsx). */
const WHEN = [
  { tag: 'Today', title: 'Secure your place', items: ['The Engineroom', 'SOP library', 'Training library', 'Playbooks', 'Thursday office hours', 'WhatsApp setup'] },
  { tag: 'Before week 1', title: 'Strategy Day', items: ['In person, with you and your team', 'We analyse your current bottlenecks', 'We build your Buying Belief Map', 'Turned into a documented brand and Authority Engine'] },
  { tag: 'Weeks 1 to 4', title: 'Install', items: ['Weekly 1:1 implementation calls', 'We start on your exact bottleneck using our CVAQ analysis', 'Two Loom reviews per week'] },
  { tag: 'Weeks 5 to 12', title: 'Transfer and tune', items: ['Fortnightly 1:1 implementation calls', 'Your operator runs the system with support', 'We iterate with data until the team can run it themselves'] },
];
const RHYTHM = [
  { when: 'Every week', items: ['Two Loom reviews during active implementation', 'Advisory group office hours, every Thursday'] },
  { when: 'Every fortnight', items: ['Training, the whole team gets access'] },
  { when: 'Every month', items: ['Content advisory board meeting'] },
  { when: 'Any time', items: ['WhatsApp support, 24 hour replies', 'Prescriptive advice directly through the portal'] },
];

export default function AdvisoryOutline() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO title="Inside the Advisory" description="What the advisory will do, won't do, and your responsibilities." path="/advisoryoutline" noIndex />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <Eyebrow>Inside the advisory</Eyebrow>
            <H className="mt-4">Will do. Won't do.</H>
          </Section>
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            <Section className="rounded-3xl bg-white ring-1 ring-zinc-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] p-6 md:p-8">
              <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-zinc-900">Will do</p>
              <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em] mt-1">During 1:1 (Starting January)</p>
              <ul className="mt-5 divide-y divide-zinc-100 border-t border-zinc-100">
                {WILL_DO.map((t) => (
                  <li key={t} className="flex items-start gap-3 py-3 text-zinc-700 text-[15px] leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3B7DFF]/10">
                      <Check className="w-3 h-3 text-[#3B7DFF]" strokeWidth={3.5} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Section>
            <Section className="rounded-3xl bg-white ring-1 ring-zinc-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] p-6 md:p-8">
              <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-zinc-900">Won't do</p>
              <ul className="mt-5 md:mt-[46px] divide-y divide-zinc-100 border-t border-zinc-100">
                {WONT_DO.map((t) => (
                  <li key={t} className="flex items-start gap-3 py-3 text-zinc-500 text-[15px] leading-relaxed">
                    <span className="mt-[9px] mx-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
          {/* WHAT HAPPENS WHEN */}
          <Section className="text-center mt-20 md:mt-24">
            <Eyebrow>The first 90 days</Eyebrow>
            <h2 className="font-display text-[30px] md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.06] text-zinc-900 mt-4">What happens when.</h2>
          </Section>
          <div className="relative mt-10 grid md:grid-cols-4 gap-4">
            <div className="hidden md:block absolute left-0 right-0 top-[11px] h-px bg-zinc-300" />
            {WHEN.map((w, i) => (
              <Section key={w.tag} className="relative flex flex-col">
                <div className="flex items-center gap-3 md:block">
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#3B7DFF] text-white text-[11px] font-bold ring-4 ring-[#F7F6F3]">{i + 1}</span>
                  <p className="text-[#3B7DFF] text-[12px] font-semibold uppercase tracking-[0.16em] md:mt-4">{w.tag}</p>
                </div>
                <div className="mt-3 rounded-2xl bg-white ring-1 ring-zinc-200/70 p-5 flex-1">
                  <p className="font-display text-xl font-extrabold tracking-[-0.02em] text-zinc-900">{w.title}</p>
                  <ul className="mt-3 space-y-2">
                    {w.items.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-zinc-600 text-[14px] leading-relaxed">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B7DFF]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            ))}
          </div>
          <Section className="mt-10 rounded-3xl bg-white ring-1 ring-zinc-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] p-6 md:p-8">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-zinc-900">The rhythm</p>
            <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-100 pt-5">
              {RHYTHM.map((r) => (
                <div key={r.when}>
                  <p className="text-[#3B7DFF] text-[12px] font-semibold uppercase tracking-[0.16em]">{r.when}</p>
                  <ul className="mt-3 space-y-2">
                    {r.items.map((t) => (
                      <li key={t} className="text-zinc-700 text-[15px] leading-relaxed">{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section className="text-center mt-14 max-w-2xl mx-auto">
            <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-zinc-900">Think of me like course correction.</p>
            <p className="text-zinc-600 text-[18px] leading-relaxed mt-5">I will train, guide, review, and challenge the team.</p>
            <p className="text-zinc-600 text-[18px] leading-relaxed mt-1">Will not manage the team, do the work for them or make every decision indefinitely.</p>
          </Section>
          <Section className="mt-14 max-w-3xl mx-auto rounded-3xl bg-[#0d0f14] text-white p-6 md:p-9">
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em]">Your responsibilities</p>
            <p className="text-zinc-400 text-[16px] mt-2">To make the engagement work you agree to:</p>
            <ul className="mt-5 grid md:grid-cols-2 gap-x-8 border-t border-white/10">
              {YOUR_PART.map((t) => (
                <li key={t} className="flex items-start gap-3 py-3 border-b border-white/10 text-zinc-200 text-[15px] leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3B7DFF]/20">
                    <Check className="w-3 h-3 text-[#3B7DFF]" strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>
    </div>
  );
}
