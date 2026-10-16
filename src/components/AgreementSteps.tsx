import { Check } from 'lucide-react';

/* Shared by Rhys's /undeniability-part2 and /undeniability-advisory. */

export function StepShell({
  n,
  title,
  state,
  locked,
  children,
}: {
  n: number;
  title: string;
  state: 'done' | 'open' | 'locked';
  locked?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border p-6 sm:p-8 transition-colors ${
        state === 'open' ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-800/80 bg-zinc-950/40'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-sm ${
            state === 'done'
              ? 'bg-emerald-500/15 text-emerald-400'
              : state === 'open'
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-zinc-600'
          }`}
        >
          {state === 'done' ? <Check size={16} /> : n}
        </div>
        <h2 className={`font-display text-xl ${state === 'locked' ? 'text-zinc-600' : 'text-white'}`}>
          {title}
        </h2>
      </div>

      {state === 'locked' && locked && <p className="text-zinc-600 text-sm mt-3 pl-[46px]">{locked}</p>}
      {state !== 'locked' && children && <div className="mt-6">{children}</div>}
    </section>
  );
}

/*
  Sean's agreement is stored exactly as he wrote it, in markdown. This draws
  the handful of shapes it uses (headings, bullets, numbered lines, bold,
  rules, tables, <br>) so the text itself never has to be reworked to fit the page.
*/
function bold(text: string, k: number) {
  return text.split(/(\*\*[^*]*\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={`${k}-${i}`} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    ) : (
      part.replace(/\*\*/g, '')
    )
  );
}

/* <br> inside a line is a line break, as Notion exports it. */
function inline(text: string) {
  return text.split(/<br\s*\/?>/).flatMap((seg, k) => (k ? [<br key={`br${k}`} />, ...bold(seg.trim(), k)] : bold(seg, k)));
}

/* Status words in review tables carry their colour, as they do in Notion. */
const STATUS: Record<string, string> = {
  Complete: 'text-emerald-400',
  'Partly complete': 'text-amber-300',
  'Not yet complete': 'text-red-400',
  Unconfirmed: 'text-zinc-500',
};

export function Agreement({ md }: { md: string }) {
  const blocks = md.split(/\n\s*\n/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const first = lines[0];
        if (first.trim() === '---') return <hr key={i} className="border-zinc-800 !my-7" />;
        const h = first.match(/^(#{1,3})\s+(.*)$/);
        if (h) {
          const text = h[2].replace(/\*\*/g, '');
          if (h[1].length === 1)
            return <h3 key={i} className="font-display text-white text-xl !mt-8 first:!mt-0">{text}</h3>;
          if (h[1].length === 2)
            return <h4 key={i} className="text-white text-[16px] font-semibold !mt-6">{text}</h4>;
          return <h5 key={i} className="text-zinc-200 text-[14.5px] font-medium !mt-5">{text}</h5>;
        }
        if (lines.every((l) => /^\|/.test(l))) {
          const rows = lines
            .filter((l) => !/^\|[\s:|-]+\|$/.test(l))
            .map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
          const [head, ...body] = rows;
          return (
            <div key={i} className="overflow-x-auto -mx-1 px-1">
              {/* Target / Status tables share one fixed status column, so the
                  Day 30, 60 and 90 tables line up with each other. */}
              <table
                className={`w-full text-left text-[13.5px] border-collapse min-w-[520px] ${head.length === 2 ? 'table-fixed' : ''}`}
              >
                {head.length === 2 && (
                  <colgroup>
                    <col />
                    <col className="w-44" />
                  </colgroup>
                )}
                <thead>
                  <tr>
                    {head.map((c, j) => (
                      <th key={j} className="text-zinc-300 font-medium align-bottom py-2 pr-4 border-b border-zinc-800">{inline(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((r, j) => (
                    <tr key={j} className="border-b border-zinc-900">
                      {r.map((c, m) => (
                        <td
                          key={m}
                          className={`py-2 pr-4 align-top ${
                            STATUS[c] ? `${STATUS[c]} font-medium` : m === 0 ? 'text-zinc-300' : 'text-zinc-400'
                          }`}
                        >
                          {inline(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (lines.every((l) => /^\s*- /.test(l)))
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-zinc-600">
              {lines.map((l, j) => (
                <li key={j} className={`text-zinc-400 text-[14.5px] leading-relaxed ${/^\s/.test(l) ? 'ml-5 list-[circle]' : ''}`}>
                  {inline(l.replace(/^\s*- /, ''))}
                </li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\. /.test(l)))
          return (
            <ol key={i} className="list-decimal pl-5 space-y-1.5 marker:text-zinc-600">
              {lines.map((l, j) => (
                <li key={j} className="text-zinc-400 text-[14.5px] leading-relaxed">{inline(l.replace(/^\d+\. /, ''))}</li>
              ))}
            </ol>
          );
        return (
          <p key={i} className="text-zinc-400 text-[14.5px] leading-relaxed">
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
