import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, Note, H2, Section, Tabs } from '../components/undeniable/Bits';
import { supabase } from '../lib/supabase';

/**
 * The client plan page, in the Geronimo shape, from the client's own data.
 *
 * /thegeronimoplan is 2,608 lines of hand written React, which is why only Sean
 * could make one. This is the same page reading brand_workspace_draft.plan,
 * written by the strategic pass in brand.contentengine.live.
 *
 * A section carries `on`. Off means it is not rendered at all, which is the
 * mechanism for "do not inform stuff that isn't said": without it an operator
 * invents content to fill an empty heading, which is worse than omitting it.
 *
 * `open` and `risks` are never shown. A client does not read a still-open list.
 */

type Score = { name: string; score: number | string; note?: string };
type LabelItems = { label: string; items?: string[]; count?: string; meta?: string; note?: string };
type TitleBody = { title: string; body?: string };
type Week = { chip?: string; output?: string; headline?: string; frame?: string; close?: string; jobs?: Array<{ who: string; job: string }> };
type Sec = { on?: boolean; kicker?: string; headline?: string; note?: string; items?: unknown };
type Plan = { meta?: { headline?: string; sub?: string; prepared_for?: string; date?: string }; sections?: Record<string, Sec> };

// Order and grouping follow the Geronimo page. Anything the plan does not carry
// simply does not appear, so a thinner client gets a shorter page, not an
// emptier one.
const TABS: Array<{ id: string; label: string; blurb: string; sections: Array<{ id: string; label: string }> }> = [
  { id: 'start', label: 'Start here',
    blurb: 'Where we sit today, then the cycle. Every person has one job.',
    sections: [
      { id: 'scores', label: 'Diagnosis' },
      { id: 'cycle', label: 'The cycle' },
      { id: 'order', label: 'Why the order' },
      { id: 'today', label: 'Today' },
    ] },
  { id: 'brand', label: 'Brand',
    blurb: 'The brands and the job each one does. What is working, what is not, and the principles underneath every decision.',
    sections: [
      { id: 'brands', label: 'The Brands' },
      { id: 'workhard', label: 'Good vs Bad' },
      { id: 'principles', label: 'Principles' },
    ] },
  { id: 'content', label: 'Content',
    blurb: 'Capture and Create, the format library, the series, and the week they get slotted into.',
    sections: [
      { id: 'capture', label: 'Capture / Create' },
      { id: 'formats', label: 'Formats' },
      { id: 'series', label: 'Series' },
      { id: 'schedule', label: 'The schedule' },
    ] },
  { id: 'production', label: 'Production',
    blurb: 'How it gets made and out the door. The pipeline, the lanes, the weekly rhythm, and the assets outside the cadence.',
    sections: [
      { id: 'flow', label: 'Pipeline' },
      { id: 'cadence', label: 'The cadence' },
      { id: 'lanes', label: 'Lanes' },
      { id: 'rhythm', label: 'Rhythm' },
      { id: 'assets', label: 'Assets' },
    ] },
  { id: 'commit', label: 'Next steps',
    blurb: 'Who owns what, and what is locked.',
    sections: [
      { id: 'next', label: 'Responsibilities' },
      { id: 'locked', label: 'Locked' },
    ] },
];

const NEVER_SHOWN = new Set(['open', 'risks']);
const live = (s?: Sec) => !!s && s.on !== false && s.items != null &&
  (Array.isArray(s.items) ? s.items.length > 0 : Object.keys(s.items as object).length > 0);

// ─── the pieces, one per item shape ──────────────────────────────────────
const Scores = ({ items }: { items: Score[] }) => (
  <div className="border-t border-zinc-800">
    {items.map((s) => (
      <div key={s.name} className="border-b border-zinc-800/70 py-5">
        <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
          <p className="font-display text-[17px] font-extrabold text-white">{s.name}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`h-2 w-7 rounded-sm ${n <= Number(s.score) ? 'bg-blue-500' : 'bg-zinc-800'}`} />
              ))}
            </div>
            <span className="text-zinc-500 text-[12px] tabular-nums whitespace-nowrap">{s.score} / 5</span>
          </div>
        </div>
        {s.note && <p className="text-zinc-400 text-[14px] leading-relaxed">{s.note}</p>}
      </div>
    ))}
  </div>
);

const Cycle = ({ items }: { items: Week[] }) => (
  <div className="space-y-8">
    {items.map((w, i) => (
      <div key={i} className="rounded-2xl border border-zinc-800 bg-elevated/40 p-6">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {w.chip && <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-300">{w.chip}</span>}
          {w.output && <span className="text-zinc-500 text-[12px]">{w.output}</span>}
        </div>
        {w.headline && <p className="font-display text-[19px] font-extrabold text-white leading-tight mb-3">{w.headline}</p>}
        {w.frame && <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">{w.frame}</p>}
        {!!w.jobs?.length && (
          <div className="border-t border-zinc-800/70 pt-4 space-y-2">
            {w.jobs.map((j, k) => (
              <p key={k} className="text-[14px] leading-relaxed">
                <span className="text-white font-semibold">{j.who}</span>
                <span className="text-zinc-400"> {j.job}</span>
              </p>
            ))}
          </div>
        )}
        {w.close && <p className="mt-4 border-l-2 border-blue-500/50 pl-4 text-zinc-300 text-[14px] italic">{w.close}</p>}
      </div>
    ))}
  </div>
);

const Lines = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t, i) => (
      <li key={i} className="flex gap-3 text-zinc-300 text-[15px] leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />{t}
      </li>
    ))}
  </ul>
);

const Cards = ({ items }: { items: TitleBody[] }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((c, i) => (
      <div key={i} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
        <p className="font-display text-[16px] font-extrabold text-white mb-2">{c.title}</p>
        {c.body && <p className="text-zinc-400 text-[14px] leading-relaxed">{c.body}</p>}
      </div>
    ))}
  </div>
);

const Groups = ({ items }: { items: LabelItems[] }) => (
  <div className="space-y-7">
    {items.map((g, i) => (
      <div key={i}>
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <p className="font-display text-[17px] font-extrabold text-white">{g.label}</p>
          {(g.count || g.meta || g.note) && (
            <span className="text-zinc-500 text-[12px]">{[g.count, g.meta, g.note].filter(Boolean).join(' · ')}</span>
          )}
        </div>
        {!!g.items?.length && <Lines items={g.items} />}
      </div>
    ))}
  </div>
);

const Schedule = ({ items }: { items: { people?: Array<{ name: string; total?: string }>; days?: Array<{ day: string; slots?: Array<{ who: string; format: string }> }> } }) => (
  <div className="space-y-8">
    {!!items.people?.length && (
      <div className="flex flex-wrap gap-3">
        {items.people.map((p, i) => (
          <span key={i} className="rounded-full border border-zinc-800 bg-elevated/40 px-4 py-2 text-[13px] text-zinc-300">
            <span className="text-white font-semibold">{p.name}</span>{p.total ? ` · ${p.total}` : ''}
          </span>
        ))}
      </div>
    )}
    <div className="border-t border-zinc-800">
      {(items.days || []).map((d, i) => (
        <div key={i} className="border-b border-zinc-800/70 py-4">
          <p className="font-display text-[15px] font-extrabold text-white mb-2">{d.day}</p>
          <div className="flex flex-wrap gap-2">
            {(d.slots || []).map((s, k) => (
              <span key={k} className="rounded-lg border border-zinc-800 bg-elevated/40 px-3 py-1.5 text-[13px] text-zinc-400">
                <span className="text-zinc-200">{s.who}</span> {s.format}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Rows = ({ items }: { items: Array<{ who?: string; day?: string; count?: string; lane?: string; note?: string; title?: string; body?: string }> }) => (
  <div className="border-t border-zinc-800">
    {items.map((r, i) => (
      <div key={i} className="border-b border-zinc-800/70 py-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          <p className="font-display text-[15px] font-extrabold text-white">{r.who || r.day || r.title}</p>
          {(r.count || r.lane) && <span className="text-zinc-500 text-[12px]">{[r.count, r.lane].filter(Boolean).join(' · ')}</span>}
        </div>
        {(r.note || r.body) && <p className="text-zinc-400 text-[14px] leading-relaxed mt-1">{r.note || r.body}</p>}
      </div>
    ))}
  </div>
);

function Body({ id, sec }: { id: string; sec: Sec }) {
  const items = sec.items as never;
  if (id === 'scores') return <Scores items={items as Score[]} />;
  if (id === 'cycle') return <Cycle items={items as Week[]} />;
  if (id === 'schedule') return <Schedule items={items as never} />;
  if (!Array.isArray(items)) return null;
  const first = (items as unknown[])[0];
  if (typeof first === 'string') return <Lines items={items as string[]} />;
  if (first && typeof first === 'object') {
    const o = first as Record<string, unknown>;
    if ('label' in o) return <Groups items={items as LabelItems[]} />;
    if ('title' in o && !('who' in o)) return <Cards items={items as TitleBody[]} />;
    return <Rows items={items as never} />;
  }
  return null;
}

export default function ClientPlan() {
  const { slug = '' } = useParams();
  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState<'loading' | 'ready' | 'missing'>('loading');
  const [tab, setTab] = React.useState('start');
  const [sec, setSec] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from('clients')
        .select('name,brand_workspace_draft').eq('slug', slug).maybeSingle();
      if (cancelled) return;
      const p = (data as { brand_workspace_draft?: { plan?: Plan } } | null)?.brand_workspace_draft?.plan;
      if (!p?.sections) { setState('missing'); return; }
      setPlan(p);
      setName((data as { name?: string } | null)?.name || slug);
      setState('ready');
    })();
    return () => { cancelled = true; };
  }, [slug]);

  // Only tabs with at least one live section, so a thinner plan is a shorter
  // page rather than a page full of empty headings.
  const tabs = React.useMemo(() => {
    if (!plan?.sections) return [];
    return TABS
      .map((t) => ({ ...t, sections: t.sections.filter((s) => !NEVER_SHOWN.has(s.id) && live(plan.sections![s.id])) }))
      .filter((t) => t.sections.length > 0);
  }, [plan]);

  React.useEffect(() => {
    if (!tabs.length) return;
    const t = tabs.find((x) => x.id === tab) ?? tabs[0];
    if (t.id !== tab) setTab(t.id);
    if (!t.sections.some((s) => s.id === sec)) setSec(t.sections[0].id);
  }, [tabs, tab, sec]);

  if (state === 'loading') {
    return <div className="min-h-screen bg-base flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading…</p></div>;
  }
  if (state === 'missing' || !plan) return <Navigate to="/" replace />;

  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  const active = plan.sections?.[sec];

  return (
    <PasswordGate storageKey={`${slug}-plan-unlocked`}>
      <div className="min-h-screen bg-base">
        <SEO title={`The Plan, ${name}`} description={plan.meta?.sub || 'The Strategy Day, bucketed by core function.'} path={`/${slug}plan`} noIndex />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow={plan.meta?.prepared_for ? `Strategy reference · ${plan.meta.prepared_for}` : 'Strategy reference'}
          title="The" accent="Plan."
          blurb={plan.meta?.sub || plan.meta?.headline || 'The whole Strategy Day, bucketed by core function. Where the bottlenecks are. What we decided. What gets built first.'}
          backHref={null}
        />

        <div className="sticky top-0 z-40 border-y border-zinc-800 bg-base/95 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="pt-5 pb-4 -mb-10">
              <Tabs tabs={tabs.map((t) => ({ id: t.id, label: t.label }))} active={tab} onChange={(id) => {
                setTab(id);
                const nt = tabs.find((x) => x.id === id);
                if (nt) setSec(nt.sections[0].id);
              }} />
            </div>
            {current && current.sections.length > 1 && (
              <div className="border-t border-zinc-800/70 flex flex-wrap gap-2 py-3">
                {current.sections.map((s) => (
                  <button key={s.id} type="button" onClick={() => setSec(s.id)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                      sec === s.id ? 'bg-blue-500/15 text-blue-200' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {active && (
          <Wrap>
            {active.kicker && <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">{active.kicker}</p>}
            {active.headline && <H2>{active.headline}</H2>}
            {active.note && <Note>{active.note}</Note>}
            <div className="mt-8"><Body id={sec} sec={active} /></div>
          </Wrap>
        )}

        <Divider />
        <Section>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
            <p className="text-zinc-600 text-[12px]">
              {plan.meta?.prepared_for ? `Prepared for ${plan.meta.prepared_for}.` : ''} {plan.meta?.date || ''}
            </p>
          </div>
        </Section>
        <Footer />
      </div>
    </PasswordGate>
  );
}
