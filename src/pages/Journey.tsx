import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import PasswordGate from '../components/PasswordGate';
import { PARTS, type Part } from '../content/journey-parts';

/*
  /journey - the client journey with the money, cost and gross profit at each step.

  Internal. Carries delivery costs, margins and a page password, so it sits behind
  PasswordGate and is disallowed in robots.txt. Costs are the budget from the Notion
  NUMBERS page with Sean's time at $100 an hour, confirmed by Sean on 14 September 2026.
*/

const SITE = 'https://authorityengine.com.au';

type FlowStep = {
  n: string;
  title: string;
  when: string;
  inAmt: string;
  inNote: string;
  cost: string;
  costNote: string;
  total: string;
  gp: string;
  wrong?: [string, string];
  optional?: boolean;
};

const FLOW: FlowStep[] = [
  { n: 'Step 1', title: 'Applies', when: 'Online form', inAmt: '$0', inNote: 'Nothing paid', cost: '$0', costNote: 'Software sits in overheads', total: '$0', gp: '$0' },
  { n: 'Step 2', title: 'Pays for Strategy Day', when: 'Once accepted', inAmt: '$5,000', inNote: 'Card, via Stripe', cost: '$0', costNote: 'Stripe fee about $85', total: '$5,000', gp: '$5,000', wrong: ['Not a fit on the prep call', '$5,000 refunded same day'] },
  { n: 'Step 3', title: 'Strategy Day', when: 'Within 30 days', inAmt: '$0', inNote: 'Already paid', cost: '$1,730', costNote: 'Sean 8 hrs $1,000, flights $400, hotel $130, food $100, Uber $100', total: '$5,000', gp: '$3,270' },
  { n: 'Step 4', title: 'Starts the 90 days', when: 'After the day', inAmt: '$5,000', inNote: 'Payment 1 of 2', cost: '$1,600', costNote: 'Weeks 1 to 4: calls, WhatsApp, Notion build, brand build', total: '$10,000', gp: '$6,670' },
  { n: 'Step 5', title: 'Second payment', when: '30 days later', inAmt: '$5,000', inNote: 'Payment 2 of 2, automatic', cost: '$1,400', costNote: 'Weeks 5 to 12: calls, direction calls, Notion time', total: '$15,000', gp: '$10,270', wrong: ['Leaves at day 30', 'This payment is cancelled'] },
  { n: 'Step 6', title: '12 Month Advisory', when: 'Upsell offered at day 30 · $28,000 for the first 20', inAmt: '$28,000', inNote: 'Invoiced by hand. Fast action bonus if taken at day 30: an in person strategy day', cost: '$4,730', costNote: '12 advisory calls $1,800, creative director call every 6 weeks (8 calls) $1,200, fast action bonus in person strategy day $1,730', total: '$43,000', gp: '$33,540', optional: true },
];

const LTGP = [
  { v: '$3,270', l: 'Strategy Day gross profit, 65% margin' },
  { v: '$7,000', l: '90 days gross profit, 70% margin' },
  { v: '$10,270', l: 'LTGP, Strategy Day and 90 days, 68% margin', hi: true },
  { v: '$33,540', l: 'LTGP with the Advisory, 78% margin', hi: true },
];

type Mail = { subject: string; body: string };
type Money = { amt: string; note: string; zero?: boolean };
type Step = {
  title: string;
  client: string[];
  mail?: Mail;
  money?: Money[];
  pages?: [string, string][];
  chips?: string[];
  ours: string[];
  branch?: string[];
};

const STEPS: Step[] = [
  {
    title: 'Apply',
    client: [
      'A long form. Where the client is active, audience size, what is needed in their own words, and commitment to a full day inside 30 days.',
      'The length is the point. Friction filters. Earning the acceptance changes the dynamic, and it removes the sales call entirely.',
    ],
    money: [{ amt: '$0', note: 'Cost is software only, coded to Subscriptions.', zero: true }],
    pages: [['Offer', '/offer'], ['Apply', '/apply']],
    chips: ['builder-application', 'application-started', 'tag:applied'],
    ours: ['One submit fans out four ways: a Notion row, a Slack card reading this person applied, this is their problem, a ConvertKit subscriber, and a GoHighLevel contact by upsert.'],
  },
  {
    title: 'We approve, or decline',
    mail: { subject: 'Application received', body: '48 hours, and I read every one myself. Installs that this is not a one day thing, it is part of a 90 day build. You have a thousand ways to get more leads. The best one is to own your category. Ends on the refund promise.' },
    client: ['Then nothing. Deliberate. The gap is what makes the acceptance mean something.'],
    chips: ['tag:applied', 'decide'],
    ours: [
      'The applied tag fires the email from a GoHighLevel workflow. Code writes one tag, GoHighLevel sends one email.',
      'Once a day, by hand, Sean uses three buttons on the Slack card: Invite, Decline, Send to concierge. All the application detail sits behind it in GoHighLevel.',
    ],
  },
  {
    title: 'Accepted',
    mail: { subject: "You're in. Quick next steps so we can get started.", body: 'I come to you, one full day. What you get before we meet, and what you leave with. Same refund promise repeated.' },
    client: ['The button carries a link unique to them.'],
    pages: [['Operator Intensive, password Scale', '/operatorintensive'], ['Payment page', '/lock-in']],
    chips: ['tag:invited'],
    ours: ['The tag flip is the trigger. The contact id rides on the link so payment matches the person, never the email address, because a personal address applies and a company card pays.'],
    branch: [
      'Five minutes later, if sent to concierge: Private invitation. Five spots a quarter, strict criteria, a password page with a second application behind it.',
      'For founders doing 10m and up with nobody full time. Talent search plus the whole hiring operation as an SOP, with Sean as final approval on interviews. Operator Intensive, $30,000 for the first 5, including the 90 days. No checkout exists, so it is invoiced by hand.',
    ],
  },
  {
    title: 'Pay $5,000',
    client: ['Stripe checkout on the payment page. Then the calendar appears. Step two does not exist until Stripe succeeds.'],
    money: [{ amt: '+$5,000', note: 'Stripe invoice, card saved. Fee about $85.30.' }],
    pages: [['Payment page', '/lock-in']],
    chips: ['create-checkout-session', 'lock-in-paid', 'tag:brand-day-paid'],
    ours: ['The success redirect is the paid signal, which is why the Brand Day needs no Stripe webhook at all.'],
  },
  {
    title: 'Pick the day',
    client: ['Mondays, Tuesdays, and an optional Saturday.', 'Or the date never gets picked. Payment feels like the finish line and the tab gets closed.'],
    pages: [['Payment page', '/lock-in']],
    chips: ['calendly-booked', 'day-book-chase', 'tag:paid-no-date'],
    ours: [],
  },
  {
    title: 'Receipt, then one last task',
    mail: { subject: "You're all logged in", body: 'Stripe receipt attached. Last thing: book your 20 minute prep call. Seven day window, so it gets done together rather than left as homework.' },
    client: ['Two events land in their calendar: the Brand Day and the prep call.'],
    pages: [['Book prep call', '/prep']],
    chips: ['prep-call-chase'],
    ours: ['Runs 8am daily for anyone who booked the day but never booked the prep call.'],
  },
  {
    title: 'The 20 minute prep call',
    client: [
      'The real filter. Is there an operator, is the offer settled, is a system wanted rather than done for them.',
      'Also their eject button. If it is not right the money goes back the same day and the place goes to the next applicant.',
    ],
    money: [{ amt: 'minus $5,000', note: 'Only if refunded. Stripe keeps its fee.', zero: true }],
    pages: [['Book prep call', '/prep']],
    ours: ['Your actual qualification gate, and refund, proceed or maybe leaves no trace in any system.'],
  },
  {
    title: 'The Brand Day',
    client: ['One full day, on site at their office.'],
    money: [{ amt: '$0 in', note: 'Our cost: flights, accommodation, car hire, meals, parking, equipment hire.', zero: true }],
    ours: ['What comes out is a recording, an audio file, iPad notes and whatever went on the wall.'],
  },
  {
    title: 'Assets delivered within 48 hours',
    client: ['Brand Demand Workbook, the finalised Customer Journey Map, avatar and hook bank, Core Trust Assets outline, the One Demand Cycle diagram and the 30 Day Demand Plan.'],
    money: [{ amt: '$0 in', note: 'Our cost: about $8 to $10 of AI processing, plus contractor time.', zero: true }],
    ours: ['The largest hole in the business. Six named deliverables, a promise measured in hours, and nothing anywhere that knows whether it happened or notices when it does not.'],
  },
  {
    title: 'The invitation into the 90 days',
    client: ['An email carrying their link to the agreement page, with the agreement and checkout on one page.'],
    pages: [['90 day agreement', '/install']],
    chips: ['brand-day-followup', 'decide', 'tag:install-invited'],
    ours: ['7am the morning after every Brand Day, a job asks Sean one question: invite them or not. One click.'],
  },
  {
    title: 'Sign, pay, and book the whole 90 days',
    client: ['Agreement, then $5,000, then a slot picker to name the operator and choose times. Ten calendar events appear at once, with one confirmation email rather than ten invitations.'],
    money: [
      { amt: '+$5,000 now', note: 'Payment 1 of 2, Stripe invoice. Fee about $85.30.' },
      { amt: '+$5,000 in 30 days', note: 'Payment 2 of 2, auto invoice to the saved card.' },
    ],
    pages: [['90 day agreement', '/install'], ['Book the 90 days', '/slot']],
    chips: ['sign-install', 'install-checkout', 'verify-payment', 'install-slot', 'stripe-events', 'slot-chase', 'tag:install-signed', 'tag:step-2-paid'],
    ours: ['Signing writes the tag that gates the slot picker, so nobody books calls without an agreement. The second $5,000 is raised as an invoice on day one and takes the saved card later.'],
  },
  {
    title: 'The 90 days run',
    client: ['Calls on weeks 1, 2, 3, 4, 5, 7 and 10. The operator attends the weeklies. The founder joins the monthly board call, which keeps running for the full twelve months.'],
    money: [{ amt: '$0 in', note: 'Our cost: Zoom, Google Workspace, operator and CSM time. A day 30 exit voids payment 2.', zero: true }],
    chips: ['prep-nudge', 'zoom-recording', 'board-extend', 'instalment-checkpoint', 'client-upcoming', 'install-part-ways'],
    ours: ['The review form gets chased 48 hours before each call. A debrief is written into Notion after every recorded call, and Slack says it is ready.'],
  },
  {
    title: 'The 12 month advisory',
    client: ['$28,000 for the first 20 who take it up, including an in person team training day. Raised only if someone remembers.'],
    money: [{ amt: '+$28,000', note: 'No checkout, no instalment schedule. Invoiced by hand.' }],
    ours: ['Nothing says the conversation is due, and nothing records that it happened or how it went.'],
  },
];

const NOTION = [
  { w: 'Writes', title: 'The application', body: 'One page per applicant, with their answers. Goes to the Builder, Apply or Operator database depending on the form.', when: 'the second the form is submitted', by: 'builder application' },
  { w: 'Writes', title: 'The call debrief', body: "One page per recorded call, titled with the operator's name and the week number, or marked as a board call. Slack says when it lands.", when: 'after Zoom finishes processing', by: 'zoom recording' },
  { w: 'Reads only', title: 'The content review form', body: 'Checks whether the client filled it in before their call. Writes nothing back.', when: '48 hours before every call', by: 'prep nudge' },
];

const OI_COSTS = [
  { phase: 'Strategy Day', cost: '$1,730', detail: 'Same as the Strategy Day above' },
  { phase: 'Install, weeks 1 to 4', cost: '$1,600', detail: 'Same as the 90 days above' },
  { phase: 'Install, weeks 5 to 12', cost: '$1,400', detail: 'Same as the 90 days above' },
  { phase: 'Hiring sprint, weeks 1 to 10', cost: '$1,000', detail: 'Sean 10 hrs: scorecard off the Day, test review, final interviews, fortnightly founder calls' },
  { phase: 'Extra hours, month 2', cost: '$400', detail: 'Sean 4 hrs' },
];

const label = (k: string) => k.replace('tag:', '').replace(/-/g, ' ');

const OWNER_STYLE: Record<string, string> = {
  self: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  ops: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  sean: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
};

function Chip({ k, onOpen }: { k: string; onOpen: (k: string) => void }) {
  const isTag = k.startsWith('tag:');
  return (
    <button
      type="button"
      onClick={() => onOpen(k)}
      className={
        isTag
          ? 'text-xs px-2.5 py-1 rounded-md border border-zinc-700 bg-elevated text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors'
          : 'text-xs px-2.5 py-1 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/60 transition-colors'
      }
    >
      {label(k)}
    </button>
  );
}

function Drawer({ k, onClose }: { k: string | null; onClose: () => void }) {
  const d: Part | undefined = k ? PARTS[k] : undefined;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const Sec = ({ l, t, tone }: { l: string; t?: string; tone?: 'do' }) =>
    t ? (
      <div className={tone === 'do' ? 'rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4' : ''}>
        <p className={`text-[11px] uppercase tracking-widest mb-2 ${tone === 'do' ? 'text-emerald-400' : 'text-zinc-600'}`}>{l}</p>
        <p className="text-sm text-zinc-300 leading-relaxed">{t}</p>
      </div>
    ) : null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[90] transition-opacity duration-300 ${d ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!d}
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface border-l border-zinc-800 z-[100] flex flex-col transition-transform duration-300 ${d ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {d && k && (
          <>
            <div className="p-6 border-b border-zinc-800 relative">
              <p className="text-[11px] uppercase tracking-widest text-zinc-600 mb-2">{d.k || 'Function'}</p>
              <h3 className="text-lg font-bold text-white mb-3 pr-10">{label(k)}</h3>
              <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full border ${OWNER_STYLE[d.o.c]}`}>{d.o.t}</span>
              <button type="button" onClick={onClose} aria-label="Close" className="absolute top-5 right-5 w-8 h-8 grid place-items-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <Sec l="Fires when" t={d.fires} />
              <Sec l="What it does" t={d.does} />
              <Sec l="Worth knowing" t={d.does2} />
              {d.where.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-600 mb-2">Where you see it</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.where.map((w) => (
                      <span key={w} className="text-xs px-2.5 py-1 rounded-md border border-zinc-700 bg-elevated text-zinc-400">{w}</span>
                    ))}
                  </div>
                </div>
              )}
              <Sec l="What you do" t={d.todo} tone="do" />
              <Sec l="If it goes wrong" t={d.broke} />
              {d.infer && <p className="text-xs italic text-zinc-600">{d.infer}</p>}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function JourneyPage() {
  const [open, setOpen] = useState<string | null>(null);

  const groups = { sean: [] as string[], ops: [] as string[], self: [] as string[] };
  Object.keys(PARTS).forEach((k) => {
    if (!k.startsWith('tag:')) groups[PARTS[k].o.c].push(k);
  });
  const dirMeta: [keyof typeof groups, string, string][] = [
    ['sean', 'Sean only', 'bg-violet-400'],
    ['ops', 'Ops watches these', 'bg-emerald-400'],
    ['self', 'Runs itself', 'bg-blue-500'],
  ];

  return (
    <div className="min-h-screen bg-base text-white">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-24 md:pt-36">
        {/* Hero */}
        <div className="max-w-3xl">
          <div className="accent-line mb-8" />
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">The Authority Engine · Operations</p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            The client journey
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Every stage a client moves through, the price at each one, how the money is collected, and what it costs us to deliver.
          </p>
        </div>

        {/* Flow */}
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] mb-2">The customer journey</h2>
          <p className="text-zinc-500 mb-6">One client, left to right. All amounts AUD.</p>

          <div className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] p-5 mb-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="text-blue-400 text-[11px] font-semibold uppercase tracking-widest mb-1">Founding price</p>
              <p className="text-zinc-400 text-sm"><span className="text-2xl font-extrabold text-white mr-1 tabular-nums">15</span>of 20 spots left</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div>
                <p className="text-xs text-zinc-500">First 20 clients</p>
                <p className="text-sm font-semibold text-zinc-200 tabular-nums">Strategy Day $5,000 · 90 days +$10,000 · Advisory $28,000</p>
              </div>
              <span className="text-xs text-zinc-600">then</span>
              <div>
                <p className="text-xs text-zinc-500">From client 21</p>
                <p className="text-sm font-semibold text-zinc-200 tabular-nums">Strategy Day $10,000 · 90 days $30,000 · Advisory $48,000</p>
              </div>
            </div>
            <p className="basis-full text-sm text-zinc-400 border-t border-blue-500/20 pt-3">
              Each part rolls over into the next. The Strategy Day rolls into the 90 days, and the 90 days roll into the 12 Month Advisory.
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <div
              className="grid min-w-[1040px]"
              style={{ gridTemplateColumns: '112px repeat(5, minmax(0,1fr) 26px) minmax(0,1fr)' }}
            >
              {[
                ['Money in', 2],
                ['Cost to deliver', 3],
                ['Total in so far', 4],
                ['Gross profit so far', 5],
                ['If it goes wrong', 6],
              ].map(([l, r]) => (
                <div key={l as string} style={{ gridColumn: 1, gridRow: r as number }} className="flex items-center text-[11px] uppercase tracking-widest text-zinc-600 border-t border-zinc-800/70 pr-3">
                  {l}
                </div>
              ))}
              {FLOW.map((s, i) => {
                const col = 2 + i * 2;
                const cell = 'border-t border-zinc-800/70 px-4 py-3 text-[13px] leading-snug';
                return [
                  <div key={`b${i}`} style={{ gridColumn: col, gridRow: 1 }} className={`rounded-2xl border p-4 mb-4 ${s.optional ? 'border-dashed border-zinc-700' : 'border-white/[0.08] bg-surface'}`}>
                    <p className="text-[11px] uppercase tracking-widest text-blue-400">{s.n}</p>
                    <h3 className="text-[15px] font-bold leading-tight mt-1 mb-0.5">{s.title}</h3>
                    <p className="text-xs text-zinc-500">{s.when}</p>
                  </div>,
                  i < FLOW.length - 1 && (
                    <div key={`a${i}`} style={{ gridColumn: col + 1, gridRow: 1 }} className="grid place-items-center pb-4 text-zinc-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  ),
                  <div key={`i${i}`} style={{ gridColumn: col, gridRow: 2 }} className={cell}>
                    <span className={`block text-xl font-extrabold tabular-nums ${s.inAmt === '$0' ? 'text-zinc-600' : 'text-emerald-400'}`}>{s.inAmt}</span>
                    <span className="block text-xs text-zinc-500">{s.inNote}</span>
                  </div>,
                  <div key={`c${i}`} style={{ gridColumn: col, gridRow: 3 }} className={cell}>
                    <span className={`block text-base font-bold tabular-nums ${s.cost === '$0' ? 'text-zinc-600' : 'text-zinc-200'}`}>{s.cost}</span>
                    <span className="block text-xs text-zinc-500">{s.costNote}</span>
                  </div>,
                  <div key={`t${i}`} style={{ gridColumn: col, gridRow: 4 }} className={`${cell} font-bold text-white tabular-nums text-[15px]`}>{s.total}</div>,
                  <div key={`g${i}`} style={{ gridColumn: col, gridRow: 5 }} className={`${cell} font-extrabold text-blue-400 tabular-nums text-[15px]`}>{s.gp}</div>,
                  s.wrong && (
                    <div key={`w${i}`} style={{ gridColumn: col, gridRow: 6 }} className={`${cell} text-xs text-zinc-400`}>
                      <b className="block text-zinc-200 font-semibold">{s.wrong[0]}</b>
                      {s.wrong[1]}
                    </div>
                  ),
                ];
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden mt-5">
            {LTGP.map((x) => (
              <div key={x.v} className={`p-4 ${x.hi ? 'bg-blue-500/[0.07]' : 'bg-surface'}`}>
                <span className={`block text-2xl font-extrabold tabular-nums ${x.hi ? 'text-blue-400' : 'text-white'}`}>{x.v}</span>
                <span className="text-sm text-zinc-400">{x.l}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Costs are the budget figures from the NUMBERS page in Notion, with Sean's time at $100 an hour. Not Xero actuals, and Stripe fees of about $255 per client are not included.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7 pt-6 border-t border-zinc-800">
            <p className="text-[11px] uppercase tracking-widest text-zinc-600 w-28">Separate package</p>
            <div className="rounded-2xl border border-white/[0.08] bg-surface p-4 min-w-[220px]">
              <p className="text-[11px] uppercase tracking-widest text-blue-400">Instead of steps 4 and 5</p>
              <h3 className="text-[15px] font-bold mt-1">Operator Intensive</h3>
              <p className="text-xs text-zinc-500">First 5 clients</p>
            </div>
            <div className="max-w-sm">
              <span className="block text-xl font-extrabold text-emerald-400 tabular-nums">$30,000</span>
              <span className="text-xs text-zinc-500">Invoiced by hand.</span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-zinc-800 bg-surface overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-zinc-600 border-b border-zinc-800">
                  <th className="font-medium px-5 py-3">Operator Intensive</th>
                  <th className="font-medium px-5 py-3 text-right">Cost</th>
                  <th className="font-medium px-5 py-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {OI_COSTS.map((r) => (
                  <tr key={r.phase} className="border-t border-zinc-900 first:border-t-0">
                    <td className="px-5 py-3 text-zinc-200 font-semibold whitespace-nowrap">{r.phase}</td>
                    <td className="px-5 py-3 text-right text-zinc-200 font-bold tabular-nums whitespace-nowrap">{r.cost}</td>
                    <td className="px-5 py-3 text-zinc-400">{r.detail}</td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-800 bg-white/[0.02]">
                  <td className="px-5 py-3 text-white font-bold">Cost to deliver</td>
                  <td className="px-5 py-3 text-right text-white font-extrabold tabular-nums">$6,130</td>
                  <td className="px-5 py-3 text-zinc-400">On $30,000 collected</td>
                </tr>
                <tr className="border-t border-zinc-900 bg-blue-500/[0.07]">
                  <td className="px-5 py-3 text-blue-400 font-bold">Gross profit</td>
                  <td className="px-5 py-3 text-right text-blue-400 font-extrabold tabular-nums">$23,870</td>
                  <td className="px-5 py-3 text-zinc-400">80% margin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step by step */}
        <section className="mt-24">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-extrabold text-zinc-700">01</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em]">The journey, step by step</h2>
          </div>
          <p className="text-zinc-500 mb-8">Left is the client side. Right is what happens on our side. Click any blue or grey chip to see what it does.</p>

          <div className="hidden md:grid grid-cols-[56px_1fr_1fr] border-b border-zinc-800 pb-2 text-[11px] uppercase tracking-widest">
            <div />
            <div className="pl-5 text-zinc-600">Client side</div>
            <div className="pl-5 text-blue-400">What fires on our side</div>
          </div>

          {STEPS.map((s, i) => (
            <div key={s.title} className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr_1fr]">
              <div className="flex flex-col items-center">
                <span className="mt-5 w-7 h-7 rounded-full border border-blue-500/40 bg-elevated grid place-items-center text-[11px] font-bold text-blue-400 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < STEPS.length - 1 && <span className="flex-1 w-px bg-zinc-800 mt-0.5" />}
              </div>

              <div className="px-5 pt-4 pb-7 border-l border-zinc-900 min-w-0">
                <h3 className="text-lg font-extrabold tracking-[-0.01em] mb-2">{s.title}</h3>
                {s.mail && (
                  <div className="border-l-2 border-zinc-700 pl-3 mb-3">
                    <span className="block text-sm font-semibold text-zinc-200 mb-0.5">{s.mail.subject}</span>
                    <span className="text-[13px] text-zinc-500 leading-relaxed">{s.mail.body}</span>
                  </div>
                )}
                {s.client.map((p) => (
                  <p key={p} className="text-sm text-zinc-400 leading-relaxed mb-2">{p}</p>
                ))}
                {s.money?.map((m) => (
                  <div key={m.amt} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-3 pt-3 border-t border-dashed border-zinc-800">
                    <span className="text-[11px] uppercase tracking-widest text-zinc-600">Money</span>
                    <span className={`text-sm font-bold tabular-nums ${m.zero ? 'text-zinc-500' : 'text-emerald-400'}`}>{m.amt}</span>
                    <span className="text-[13px] text-zinc-500">{m.note}</span>
                  </div>
                ))}
                {s.pages && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.pages.map(([t, u]) => (
                      <a
                        key={t + u}
                        href={SITE + u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[13px] font-semibold text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/[0.07] hover:text-white hover:border-blue-500/60 transition-colors"
                      >
                        {t}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-start-2 md:col-start-auto px-5 pt-4 pb-7 border-l border-zinc-900 bg-blue-500/[0.02] min-w-0">
                {s.chips && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.chips.map((k) => <Chip key={k} k={k} onOpen={setOpen} />)}
                  </div>
                )}
                {s.ours.map((p) => (
                  <p key={p} className="text-sm text-zinc-400 leading-relaxed mb-2">{p}</p>
                ))}
                {s.branch && (
                  <div className="border border-dashed border-zinc-700 rounded-xl p-4 mt-3">
                    <p className="text-[11px] uppercase tracking-widest text-violet-300 mb-2">The concierge branch</p>
                    {s.branch.map((p) => (
                      <p key={p} className="text-[13px] text-zinc-400 leading-relaxed mb-1.5">{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Notion */}
        <section className="mt-24">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-extrabold text-zinc-700">02</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em]">What reaches Notion, and when</h2>
          </div>
          <p className="text-zinc-500 mb-8">Two things write. One thing reads. Everything else about a client is somewhere else, or nowhere.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NOTION.map((n) => (
              <div key={n.title} className="rounded-2xl border border-zinc-800 border-t-2 border-t-blue-500/60 bg-surface p-5">
                <p className="text-[11px] uppercase tracking-widest text-blue-400 mb-2">{n.w}</p>
                <h3 className="text-base font-extrabold mb-2">{n.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{n.body}</p>
                <p className="text-xs text-zinc-500 border-t border-zinc-900 pt-2.5 mt-3">
                  <b className="text-zinc-300 font-medium">When</b> · {n.when}<br />
                  <b className="text-zinc-300 font-medium">By</b> · {n.by}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-zinc-800 border-t-2 border-t-zinc-600 bg-surface p-5">
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2">Nothing writes this</p>
              <h3 className="text-base font-extrabold mb-2">Everything else</h3>
              <ul className="text-sm text-zinc-400 leading-7 list-disc pl-4">
                <li>Which stage a client is at</li>
                <li>What has been paid</li>
                <li>What we owe them, and by when</li>
                <li>What is owed to us</li>
                <li>Whether any of it is late</li>
                <li>The six Brand Day assets</li>
              </ul>
              <p className="text-xs text-zinc-500 border-t border-zinc-900 pt-2.5 mt-3">
                <b className="text-zinc-300 font-medium">When</b> · only when a person types it in
              </p>
            </div>
          </div>
        </section>

        {/* Directory */}
        <section className="mt-24">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-extrabold text-zinc-700">03</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em]">Who owns what</h2>
          </div>
          <p className="text-zinc-500 mb-8">Every function, sorted by whether a human has to do anything. Most of them, nobody does.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {dirMeta.map(([g, name, dot]) => (
              <div key={g} className="rounded-2xl border border-zinc-800 bg-surface p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-[11px] uppercase tracking-widest text-zinc-500">{name} · {groups[g].length}</span>
                </div>
                <ul className="space-y-2.5">
                  {groups[g].map((k) => (
                    <li key={k}>
                      <button type="button" onClick={() => setOpen(k)} className="text-left text-sm text-zinc-200 hover:text-blue-400 transition-colors">
                        {label(k)}
                      </button>
                      <small className="block text-xs text-zinc-600 mt-0.5">{(PARTS[k].todo || '').split('.')[0]}.</small>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Drawer k={open} onClose={() => setOpen(null)} />
    </div>
  );
}

export default function Journey() {
  return (
    <PasswordGate storageKey="journey-unlocked">
      <JourneyPage />
    </PasswordGate>
  );
}
