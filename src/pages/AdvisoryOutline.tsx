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
/* Sean, 24 Nov: show the cadence better. 12 week grid. Weeks marked show the frequency
   from /founding (weekly 1:1 for 4 weeks then fortnightly for 8, fortnightly training,
   monthly board). kind: dot = happens that week, two = up to two, bar = any time. */
const RHYTHM: { name: string; when: string; kind: 'dot' | 'two' | 'bar'; weeks?: number[] }[] = [
  { name: '1:1 implementation call', when: 'Weekly for 4 weeks, then fortnightly', kind: 'dot', weeks: [1, 2, 3, 4, 6, 8, 10, 12] },
  { name: 'Loom reviews', when: 'Up to two a week', kind: 'two', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { name: 'Advisory group office hours', when: 'Every Thursday', kind: 'dot', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { name: 'Team training', when: 'Every fortnight', kind: 'dot', weeks: [2, 4, 6, 8, 10, 12] },
  { name: 'Content advisory board', when: 'Monthly', kind: 'dot', weeks: [4, 8, 12] },
  { name: 'WhatsApp support', when: 'Any time, 24 hour replies', kind: 'bar' },
  { name: 'Prescriptive advice in the portal', when: 'Any time', kind: 'bar' },
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
          {/* THE CADENCE (Sean, 24 Nov: no timeline, just the cadence, shown as a 12 week grid) */}
          <Section className="mt-14 rounded-3xl bg-white ring-1 ring-zinc-200/70 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] p-5 md:p-8">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-zinc-900">The rhythm</p>
            <p className="text-zinc-500 text-[15px] mt-1">Your 12 weeks of implementation, week by week.</p>
            <div className="mt-6">
              <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 pb-2 border-b border-zinc-100">
                <span />
                <div className="grid grid-cols-12 text-center text-[11px] font-semibold text-zinc-400">
                  {Array.from({ length: 12 }, (_, k) => <span key={k}>W{k + 1}</span>)}
                </div>
              </div>
              {RHYTHM.map((r) => (
                <div key={r.name} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-2 md:gap-6 items-center py-4 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="text-zinc-900 text-[15px] font-semibold leading-snug">{r.name}</p>
                    <p className="text-[#3B7DFF] text-[12px] font-semibold uppercase tracking-[0.12em] mt-0.5">{r.when}</p>
                  </div>
                  {r.kind === 'bar' ? (
                    <div className="h-2.5 rounded-full bg-[#3B7DFF]/25 mx-1" />
                  ) : (
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 12 }, (_, k) => {
                        const on = r.weeks?.includes(k + 1);
                        return (
                          <div key={k} className={`h-7 rounded-md flex items-center justify-center gap-[3px] ${on ? 'bg-[#3B7DFF]/10' : 'bg-zinc-50'}`}>
                            {on && (r.kind === 'two'
                              ? <><span className="h-1.5 w-1.5 rounded-full bg-[#3B7DFF]" /><span className="h-1.5 w-1.5 rounded-full bg-[#3B7DFF]" /></>
                              : <span className="h-2 w-2 rounded-full bg-[#3B7DFF]" />)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              <div className="md:hidden grid grid-cols-12 gap-1 text-center text-[10px] font-semibold text-zinc-400 pt-2">
                {Array.from({ length: 12 }, (_, k) => <span key={k}>{k + 1}</span>)}
              </div>
              <p className="md:hidden text-center text-[11px] text-zinc-400 mt-1">Week</p>
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
