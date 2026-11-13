/*
  The support list laid out by rhythm. Shared by /founding and /founding-v4 so
  the two never drift. Text after a | renders as a grey note.
  Sean, 12 Nov: group advisory sessions sit in "Before week 1" because buyers
  get access to them straight away.
*/
const SUPPORT: [string, string[]][] = [
  ['Before week 1', [
    'One Brand Day',
    'Group advisory office hours, every Thursday',
    '1:1 guided implementation starts in the next available intake month, starting January',
  ]],
  ['Weekly', [
    'Implementation calls for the first 4 weeks, then fortnightly for the next 8',
    'One team call per week during installation',
    'Two Loom reviews per week during active implementation',
  ]],
  ['Fortnightly', [
    'Training every fortnight',
  ]],
  ['Monthly', ['Founder and operator board review']],
  ['Any day', ['WhatsApp implementation support, 24 hour replies, during the agreed support window']],
];

export default function SupportRhythm() {
  return (
    <div className="mt-8 divide-y divide-white/5 border-y border-white/5">
      {SUPPORT.map(([when, items]) => (
        <div key={when} className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-6">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest pt-0.5">{when}</p>
          <ul className="space-y-2">
            {items.map((t) => {
              const [main, note] = t.split('|');
              return (
                <li key={t} className="text-zinc-200 text-[16px] leading-relaxed">
                  {main}{note && <span className="text-zinc-500"> {note}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
