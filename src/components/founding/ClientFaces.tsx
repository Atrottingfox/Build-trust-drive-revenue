import { useEffect, useRef } from 'react';

/* Sean, 25 Nov: founder faces pass across the page under the video on /founding and
   /founding-advisory. Faces only, no names. One row, and each face lifts as it passes the centre of the
   screen. A second row going the other way was tried and held back: with fewer than about 14
   faces the same person shows twice on screen at once. Photos are the Instagram profile pictures
   Sean supplied, in public/founding/faces/. To add one, drop a square image there and add its
   file name to a row below. */
const ROW_A = ['01', '06', '02', '09', '03', '08', '05', '10', '07'];

/* Two copies of the row, slid half its width, so the pass never ends. */
const Row = ({ faces, hidden = false }: { faces: string[]; hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {faces.map((f) => (
      <li key={f} className="mx-3 md:mx-5">
        <img
          data-face
          src={`/founding/faces/${f}.jpg`}
          alt=""
          width={144}
          height={144}
          loading="lazy"
          className="h-[88px] w-[88px] md:h-[120px] md:w-[120px] rounded-full object-cover ring-[3px] md:ring-4 ring-white shadow-[0_12px_30px_-14px_rgba(15,23,42,0.45)] will-change-transform"
        />
      </li>
    ))}
  </ul>
);

export default function ClientFaces() {
  const ref = useRef<HTMLElement>(null);

  /* The centre lift. Only runs while the section is on screen, and not at all for visitors
     who have asked for reduced motion. */
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const faces = Array.from(el.querySelectorAll<HTMLImageElement>('[data-face]'));
    let raf = 0;
    let visible = false;
    const tick = () => {
      const mid = window.innerWidth / 2;
      const reach = Math.max(window.innerWidth * 0.34, 150);
      for (const f of faces) {
        const r = f.getBoundingClientRect();
        if (r.right < -50 || r.left > window.innerWidth + 50) continue;
        const near = Math.max(0, 1 - Math.abs(r.left + r.width / 2 - mid) / reach);
        const ease = near * near * (3 - 2 * near);
        f.style.transform = `scale(${(0.9 + 0.24 * ease).toFixed(3)})`;
        f.style.opacity = (0.62 + 0.38 * ease).toFixed(3);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} className="pb-14 md:pb-20" aria-label="Founders we have worked with">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Trusted by</p>
      <div className="trusted-marquee mt-4 overflow-hidden py-7">
        <div className="trusted-track faces-track flex w-max">
          <Row faces={ROW_A} />
          <Row faces={ROW_A} hidden />
        </div>
      </div>
    </section>
  );
}
