import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

/*
  The founding VSL, top of /founding. Self hosted (public/founding/vsl.mp4,
  720p, 3:40, about 20MB, loudness levelled). To move it to Wistia later, swap
  the <video> for the Wistia embed and keep the GA events.

  A silent 5 second loop plays first (about 360KB). The full video downloads
  only on play, then starts from the beginning with sound. GA4 gets vsl_play and
  vsl_progress at 25, 50, 75 and 100 percent, so watch depth shows next to
  begin_checkout and purchase.
*/

function ga(event: string, extra: Record<string, unknown> = {}) {
  try {
    window.gtag?.('event', event, { video_title: 'Founding 5 VSL', ...extra });
  } catch {
    /* analytics is never load bearing */
  }
}

export default function VslPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const sent = useRef(new Set<number>());

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () => {
      if (!v.duration) return;
      const pct = (v.currentTime / v.duration) * 100;
      for (const mark of [25, 50, 75]) {
        if (pct >= mark && !sent.current.has(mark)) {
          sent.current.add(mark);
          ga('vsl_progress', { percent: mark });
        }
      }
    };
    const onEnd = () => {
      if (!sent.current.has(100)) {
        sent.current.add(100);
        ga('vsl_progress', { percent: 100 });
      }
    };
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnd);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnd);
    };
  }, []);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    ga('vsl_play');
    v.play().catch(() => {
      /* The native controls are showing, so a blocked play is one tap away. */
    });
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(59,125,255,0.35)]">
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover ${started ? '' : 'invisible'}`}
        src="/founding/vsl.mp4"
        poster="/founding/vsl.jpg"
        preload="none"
        playsInline
        controls={started}
      />
      {/* Before play: a 5 second silent loop of Sean talking (vsl-loop.mp4,
          cut at matching frames so the join does not show). */}
      {!started && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/founding/vsl-loop.mp4"
          poster="/founding/vsl-loop.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label="Play the video"
          className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/0"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 text-black" fill="currentColor" />
          </span>
          <span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[12px] font-semibold text-white">Watch with sound</span>
          <span className="absolute bottom-4 right-4 rounded-md bg-black/60 px-2 py-1 text-[12px] font-semibold text-white">3:40</span>
        </button>
      )}
    </div>
  );
}
