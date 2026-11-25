/* Sean, 25 Nov: founder faces pass across the page under the video on /founding-advisory.
   Faces only, no names. Photos are the Instagram profile pictures Sean supplied, in
   public/founding/faces/. To add one, drop a square image there and add its file name below. */
const FACES = ['01', '06', '02', '09', '03', '08', '05', '10', '07'];

/* Two copies of the row, slid half its width, so the pass never ends. */
const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {FACES.map((f) => (
      <li key={f} className="mx-3 md:mx-5">
        <img
          src={`/founding/faces/${f}.jpg`}
          alt=""
          width={144}
          height={144}
          loading="lazy"
          className="h-[88px] w-[88px] md:h-[120px] md:w-[120px] rounded-full object-cover ring-4 ring-white shadow-[0_14px_34px_-14px_rgba(15,23,42,0.45)]"
        />
      </li>
    ))}
  </ul>
);

export default function ClientFaces() {
  return (
    <section className="pb-14 md:pb-20" aria-label="Founders we have worked with">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Trusted by</p>
      <div className="trusted-marquee mt-5 overflow-hidden py-6">
        <div className="trusted-track faces-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
