/* Sean, 25 Nov: 'Trusted by' banner on /founding-advisory. Names come from the Advisory Clients
   database in Notion (delivered and active clients only, no leads or applicants) plus Taki Moore
   and Jay Wright. To swap a name for its logo, drop the file in public/founding/logos/ and set
   `logo` on that row. A row with no logo renders the name in type. */
const CLIENTS: { name: string; logo?: string }[] = [
  { name: 'Klaviyo' },
  { name: 'Million Dollar Coach' },
  { name: 'Ecommerce Equation' },
  { name: 'Seven Figure Creators' },
  { name: 'Undeniable' },
  { name: 'Geronimo' },
  { name: 'Dream Out Loud' },
  { name: 'Upscale Business Coaching' },
  { name: 'Alpha Tradie' },
];

const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {CLIENTS.map((c) => (
      <li key={c.name} className="mx-7 md:mx-10 flex h-10 items-center whitespace-nowrap">
        {c.logo ? (
          <img src={c.logo} alt={hidden ? '' : c.name} loading="lazy" className="h-7 md:h-8 w-auto opacity-60 grayscale" />
        ) : (
          <span className="font-display text-[19px] md:text-[22px] font-extrabold tracking-[-0.02em] text-zinc-400">{c.name}</span>
        )}
      </li>
    ))}
  </ul>
);

export default function TrustedBy() {
  return (
    <section className="pb-14 md:pb-20" aria-label="Trusted by">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Brands we have worked with</p>
      <div className="trusted-marquee mt-6 overflow-hidden">
        <div className="trusted-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
