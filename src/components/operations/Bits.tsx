import React from 'react';

/*
  Shared building blocks for the /operations documents.

  NOTE: never use `text-base` in this project. `base` is a colour token
  (#09090b, the page background), so Tailwind emits it as a colour utility as
  well as a font size. On the same element an explicit text-zinc-* wins, but
  inherited from a parent, or behind an `sm:` variant, the colour wins and the
  text renders black on black. Use text-[16px].
*/

export type DocSection = { id: string; label: string };

export function Eyebrow({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${
        accent ? 'text-blue-400' : 'text-zinc-500'
      }`}
    >
      {children}
    </p>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-600 font-semibold">
      {children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  accent = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-14 sm:pt-20 first:pt-0">
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-white mb-6 sm:mb-8">
        {title}
      </h2>
      <div className="space-y-5 text-[15px] sm:text-[16px] leading-relaxed text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export function Rule() {
  return <div className="gradient-line mt-14 sm:mt-20" />;
}

/* A labelled key/value row. Used for document headers and every terms table. */
export function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="py-3.5 border-b border-zinc-800/70 last:border-b-0 sm:flex sm:gap-8">
      <div className="sm:w-44 sm:shrink-0 sm:pt-0.5">
        <Label>{k}</Label>
      </div>
      <div className="text-zinc-300 text-[15px] mt-1 sm:mt-0 leading-relaxed">{v}</div>
    </div>
  );
}

export function RowCard({ rows }: { rows: { k: string; v: React.ReactNode }[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-6 sm:px-8 py-3 sm:py-4">
      {rows.map((r) => (
        <Row key={r.k} k={r.k} v={r.v} />
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* Numbered rows. Used wherever the source document numbers a short list. */
export function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="space-y-3">
      {items.map((t, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 px-5 py-4"
        >
          <span className="font-display text-sm text-zinc-700 tabular-nums shrink-0 pt-0.5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-zinc-300">{t}</span>
        </div>
      ))}
    </div>
  );
}

/*
  Pass / fail criteria, rendered as empty boxes rather than live checkboxes.

  This is a document that gets read and agreed, not a tracker. A tickable box
  would imply the page is where the score is kept, and it isn't.
*/
export function CheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="mt-[0.3rem] h-[15px] w-[15px] shrink-0 rounded-[4px] border border-zinc-700" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({
  label,
  children,
  className = '',
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 ${className}`}>
      {label && (
        <div className="mb-4">
          <Label>{label}</Label>
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* A single line that carries the weight of a section. */
export function Statement({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white text-lg sm:text-xl leading-relaxed font-medium">{children}</p>
  );
}

/* Sean's words, quoted as his. */
export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-blue-500/40 pl-5 sm:pl-6 py-1">
      <p className="text-zinc-200 text-[16px] sm:text-lg leading-relaxed">{children}</p>
    </blockquote>
  );
}

/*
  A data table. Scrolls inside itself on narrow screens rather than pushing the
  page sideways, because the scoreboard is five columns wide and the page is
  read on phones.
*/
export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 overflow-x-auto">
      <table className="w-full min-w-[640px] text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            {head.map((h, i) => (
              <th
                key={h}
                className={`px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-zinc-600 font-semibold ${
                  i === 0 ? 'w-[38%]' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-b border-zinc-800/60 last:border-b-0">
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-5 py-4 text-[14px] align-top leading-relaxed ${
                    ci === 0 ? 'text-zinc-200' : 'text-zinc-400'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* A figure the candidate fills in on week 1, not a number we have. */
export function Slot({ children = 'record' }: { children?: React.ReactNode }) {
  return (
    <span className="text-zinc-600 italic">[{children}]</span>
  );
}

/*
  The contents rail plus the document body.

  The rail only appears on wide screens. On a phone the document is read
  straight through, and a rail would just be a second thing to scroll past.
*/
export function DocLayout({
  sections,
  children,
}: {
  sections: DocSection[];
  children: React.ReactNode;
}) {
  const [active, setActive] = React.useState(sections[0]?.id ?? '');

  React.useEffect(() => {
    setActive(sections[0]?.id ?? '');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="lg:flex lg:gap-16">
      <aside className="hidden lg:block w-48 shrink-0">
        <nav className="sticky top-28">
          <div className="mb-5">
            <Label>Contents</Label>
          </div>
          <ul className="space-y-2.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`text-sm transition-colors ${
                    active === s.id ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 max-w-3xl">{children}</div>
    </div>
  );
}

export function DocHeader({
  meta,
  title,
  strap,
  footnote,
}: {
  meta: { k: string; v: React.ReactNode }[];
  title: string;
  strap: string;
  footnote: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <RowCard rows={meta} />
      </div>

      <h1 className="font-display text-3xl sm:text-5xl tracking-tight text-white leading-[1.1]">
        {title}
      </h1>
      <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mt-6">{strap}</p>
      <p className="text-zinc-500 text-sm mt-8 tracking-wide">{footnote}</p>
    </div>
  );
}
