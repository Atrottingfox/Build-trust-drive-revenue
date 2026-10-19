/*
  Renders one agreement section's lines. "## " is a subheading, "• " a list
  item, anything else a paragraph. Consecutive list items share one list.
  Shared by /install and /upscale so the page and the contract cannot drift.
*/
export default function TermsBody({ lines, size = 'sm' }: { lines: string[]; size?: 'sm' | 'lg' }) {
  const text = size === 'lg' ? 'text-zinc-400 text-lg leading-relaxed' : 'text-zinc-400 text-[14.5px] leading-relaxed';
  const sub = size === 'lg' ? 'text-white text-lg font-semibold pt-4' : 'text-zinc-200 text-[14.5px] font-medium pt-2';

  const blocks: Array<{ kind: 'p' | 'h' | 'ul'; items: string[] }> = [];
  for (const line of lines) {
    if (line.startsWith('• ')) {
      const last = blocks[blocks.length - 1];
      if (last?.kind === 'ul') last.items.push(line.slice(2));
      else blocks.push({ kind: 'ul', items: [line.slice(2)] });
    } else if (line.startsWith('## ')) {
      blocks.push({ kind: 'h', items: [line.slice(3)] });
    } else {
      blocks.push({ kind: 'p', items: [line] });
    }
  }

  return (
    <div className={size === 'lg' ? 'space-y-4' : 'space-y-2.5'}>
      {blocks.map((b, i) =>
        b.kind === 'ul' ? (
          <ul key={i} className={`${text} list-disc pl-5 space-y-1.5 marker:text-zinc-600`}>
            {b.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        ) : b.kind === 'h' ? (
          <p key={i} className={sub}>
            {b.items[0]}
          </p>
        ) : (
          <p key={i} className={text}>
            {b.items[0]}
          </p>
        )
      )}
    </div>
  );
}
