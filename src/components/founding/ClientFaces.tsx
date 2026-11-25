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

export default function ClientFaces() {
  return (
    <section className="pb-14 md:pb-20" aria-label="Founders we have worked with">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Trusted by</p>
      <ul className="mt-7 flex gap-5 overflow-x-auto px-5 pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-9 md:overflow-visible md:max-w-4xl md:mx-auto lg:grid-cols-8 lg:max-w-6xl lg:px-8">
        {PEOPLE.map((p) => (
          <li key={p.name} className="w-[104px] shrink-0 snap-start text-center md:w-auto">
            {p.photo ? (
              <img src={p.photo} alt={p.name} loading="lazy" className="mx-auto h-[84px] w-[84px] rounded-full object-cover ring-1 ring-zinc-900/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]" />
            ) : (
              <span aria-hidden className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white ring-1 ring-zinc-200 font-display text-xl font-extrabold tracking-[-0.02em] text-zinc-400">{initials(p.name)}</span>
            )}
            <p className="mt-3 text-[15px] font-semibold leading-tight text-zinc-900">{p.name}</p>
            <p className="mt-1 text-[13px] leading-snug text-zinc-500">{p.brand}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
