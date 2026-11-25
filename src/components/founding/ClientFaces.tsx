/* Sean, 25 Nov: founder headshots under the video on /founding-advisory, logos moved to the
   bottom of the page. Names and brands come from the Advisory Clients database in Notion plus
   Taki Moore and Jay Wright. To add a photo, drop a square image in public/founding/faces/ and
   set `photo` on that row. A row with no photo shows initials. */
const PEOPLE: { name: string; brand: string; photo?: string }[] = [
  { name: 'Taki Moore', brand: 'Million Dollar Coach' },
  { name: 'Jay Wright', brand: 'Ecommerce Equation' },
  { name: 'Matt Lakajev', brand: 'Seven Figure Creators' },
  { name: 'Rhys Livingstone', brand: 'Undeniable' },
  { name: 'Geronimo', brand: 'Geronimo Ventures' },
  { name: 'Morgan Nelson', brand: 'Dream Out Loud' },
  { name: 'Erina Roch', brand: 'Upscale Business Coaching' },
  { name: 'Sam Ackland', brand: 'Alpha Tradie' },
];

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

/* Sean, 25 Nov: the row passes across the page. Two copies of the row, slid half its width. */
const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {PEOPLE.map((p) => (
      <li key={p.name} className="mx-2.5 md:mx-3.5 flex items-center gap-3.5 rounded-full bg-white py-2 pl-2 pr-7 ring-1 ring-zinc-900/[0.06] shadow-[0_10px_30px_-14px_rgba(15,23,42,0.28)]">
        {p.photo ? (
          <img src={p.photo} alt={hidden ? '' : p.name} loading="lazy" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover" />
        ) : (
          <span aria-hidden className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 font-display text-lg font-extrabold tracking-[-0.02em] text-zinc-400">{initials(p.name)}</span>
        )}
        <span className="whitespace-nowrap text-left">
          <span className="block text-[16px] md:text-[17px] font-semibold leading-tight tracking-[-0.01em] text-zinc-900">{p.name}</span>
          <span className="mt-0.5 block text-[13px] md:text-[14px] leading-snug text-zinc-500">{p.brand}</span>
        </span>
      </li>
    ))}
  </ul>
);

export default function ClientFaces() {
  return (
    <section className="pb-14 md:pb-20" aria-label="Founders we have worked with">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Trusted by</p>
      <div className="trusted-marquee mt-6 overflow-hidden py-4">
        <div className="trusted-track faces-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
