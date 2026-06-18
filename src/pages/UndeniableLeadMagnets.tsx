import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const STATUS_STYLES: Record<string, string> = {
  'Not started': 'bg-zinc-800 text-zinc-400 border-zinc-700',
  'Building': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  'Live': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  'Rebrand': 'bg-blue-500/10 text-blue-300 border-blue-500/30',
};

function Status({ s }: { s: keyof typeof STATUS_STYLES }) {
  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-widest font-semibold rounded-full border px-2.5 py-0.5 ${STATUS_STYLES[s]}`}>
      {s}
    </span>
  );
}

function Task({ id, children }: { id: string; children: React.ReactNode }) {
  const key = `leads:${id}`;
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    try { setDone(localStorage.getItem(key) === '1'); } catch { /* noop */ }
  }, [key]);
  const toggle = () => setDone((d) => {
    const n = !d;
    try { localStorage.setItem(key, n ? '1' : '0'); } catch { /* noop */ }
    return n;
  });
  return (
    <button onClick={toggle} className="flex items-start gap-3 text-left w-full group py-1.5">
      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${done ? 'bg-blue-500 border-blue-500' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
        {done && <CheckIcon className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className={`text-[14px] leading-relaxed transition-colors ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{children}</span>
    </button>
  );
}

type Asset = {
  id: string;
  name: string;
  status: keyof typeof STATUS_STYLES;
  owner: string;
  headline: string;
  sub: string;
  checklist: string[];
};

const ASSETS: Asset[] = [
  {
    id: 'profit-path',
    name: 'Six Step Profit Path',
    status: 'Rebrand',
    owner: 'Sean (copy) and Rhys team (build)',
    headline: 'Turn cold leads into raving fans.',
    sub: 'In 5 minutes, you\'ll know how to take people from never-heard-of-you to obsessed advocate. Without DMing 100 people a day.',
    checklist: [
      'Final name confirmed',
      'New landing page live',
      'Opt-in form working',
      'Confirmation email triggered',
      'Follow-up sequence written',
      'Lead routing to workshop confirmed',
    ],
  },
  {
    id: 'cold-to-sold',
    name: 'From Cold to Sold',
    status: 'Building',
    owner: 'Sean (copy)',
    headline: 'From Cold to Sold.',
    sub: 'The sales framework I use on every workshop call. Stripped to its bones. Steal it.',
    checklist: [
      'Final name confirmed',
      'Landing page live',
      'Opt-in form working',
      'Confirmation email triggered',
      'Follow-up sequence written',
      'Lead routing to workshop confirmed',
    ],
  },
  {
    id: 'find-the-one-thing',
    name: 'Find the One Thing',
    status: 'Live',
    owner: 'Rhys (rebrand pending)',
    headline: 'Find the one thing capping your business.',
    sub: '60-second diagnostic. Personalised blueprint plus a video of me walking you through the fix.',
    checklist: [
      'Soft rebrand applied to landing page',
      'Avoid the words "diagnostic" and "bottleneck"',
      'Personalised result page audited',
      'Follow-up sequence reviewed',
      '30-day re-submission lockout confirmed',
    ],
  },
  {
    id: 'leak-calculator',
    name: 'How Big Is Your Leak',
    status: 'Not started',
    owner: 'Rhys team (build) and Sean (copy)',
    headline: 'How big is your leak?',
    sub: '60-second calculator. Pours your business into a leaky bucket. Tells you how fast it\'s draining. Imagine if you never lost a client.',
    checklist: [
      'Spec written (clients in × clients out × 12 months)',
      'Tool built and tested',
      'Landing page live',
      'Above 3% triggers follow-up sequence',
      'Lead routing to workshop confirmed',
    ],
  },
];

export default function UndeniableLeadMagnets() {
  return (
    <Shell title="Leads · Undeniable" description="The 4 lead magnets. Names, headlines, owners, status, checklists." path="/undeniablenextsteps/lead-magnets">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Leads."
        blurb="Four lead magnets live, collecting leads weekly."
      />
      <Divider />

      <Wrap>
        <div className="space-y-6">
          {ASSETS.map((a, i) => (
            <div key={a.id} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-6 md:p-7">
              <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                <span className="font-display text-[20px] font-extrabold text-blue-400 leading-none">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[18px] md:text-[20px] font-extrabold text-white leading-tight">{a.name}</h3>
                <Status s={a.status} />
              </div>

              <div className="grid md:grid-cols-[140px_1fr] gap-x-6 gap-y-2 mb-5">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pt-1">Owner</p>
                <p className="text-zinc-300 text-[14px]">{a.owner}</p>
              </div>

              <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-6">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">Headline</p>
                <p className="font-display text-white text-[17px] md:text-[18px] font-extrabold leading-snug mb-2">{a.headline}</p>
                <p className="text-zinc-200 text-[14px] italic">{a.sub}</p>
              </div>

              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Checklist</p>
              <div className="space-y-1">
                {a.checklist.map((c) => (
                  <Task key={c} id={`${a.id}-${c}`}>{c}</Task>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Shell>
  );
}
