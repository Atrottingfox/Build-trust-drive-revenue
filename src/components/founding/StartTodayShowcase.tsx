import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, MessageCircle, CalendarDays, Play } from 'lucide-react';
import FormatsMap from './FormatsMap';

/*
  The pay in full list on /founding, with a visual layer beside it.

  Desktop: the list on the left, one sticky window on the right that changes to
  show whichever item is in the middle of the screen. Mobile: each item carries
  its own visual underneath.

  Everything shown is real:
    - Training clips are cut from curriculum video 02 (Authority Engine
      Fundamentals part 2) and video 16 (Three Ways to Capture, and When to
      Script), files in /public/founding.
    - The Formats window is FormatsMap.tsx, copied from the portal formats page.
    - Playbook and SOP titles are the real page titles from the Engineroom short
      form playbook (contentengine-v3 src/features/short-form/index.json).
  Nothing in here is a made up message, number or client.
*/

const PLAYBOOKS = [
  '1 - How to build an Instagram profile to attract dream followers',
  '2 - How to create content that attracts ideal followers',
  '3 - How to create content that nurtures ideal prospects',
  '4 - How to run a signature series that attracts buyers',
  '5 - How to make stories that convert followers into conversations',
  '6 - How to make carousel posts from proven winners',
  '7 - How to capture b-roll that makes content crush',
  '8 - How to effectively track and know what is working on Instagram',
  '9 - How to run content as a founder in under 5 hours per week',
  '12 - How to write text hooks that paralyse your ICP',
  '15 - How to find your IG bottleneck every 6 weeks',
  '18 - How to craft all 3 hook types',
];


/* A browser style frame so every visual reads as a real screen. */
export const Window = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-[#0d0f14] overflow-hidden shadow-[0_30px_80px_-30px_rgba(59,125,255,0.35)]">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="ml-3 text-[12px] text-zinc-400 truncate">{title}</span>
    </div>
    {children}
  </div>
);

const Clip = ({ src, label, sub }: { src: string; label: string; sub: string }) => (
  <div className="relative aspect-video bg-black">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={`/founding/${src}.mp4`}
      poster={`/founding/${src}.jpg`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
      <div>
        <p className="text-[11px] uppercase tracking-widest text-blue-400 font-semibold">{sub}</p>
        <p className="text-white text-[15px] font-semibold leading-snug mt-1">{label}</p>
      </div>
      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
        <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
      </span>
    </div>
  </div>
);

/* A slow, endless scroll through real playbook titles. */
const ScrollingList = ({ items, icon }: { items: string[]; icon?: boolean }) => (
  <div className="relative h-[300px] overflow-hidden">
    <motion.ul
      className="px-5 py-4 space-y-2"
      animate={{ y: ['0%', '-50%'] }}
      transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
    >
      {[...items, ...items].map((t, i) => (
        <li key={i} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] ${i % items.length === 8 ? 'bg-blue-500/15 text-white' : 'bg-white/[0.03] text-zinc-400'}`}>
          {icon && <FileText className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />}
          <span className="truncate">{t}</span>
        </li>
      ))}
    </motion.ul>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0d0f14] to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0d0f14] to-transparent" />
  </div>
);

export function Visual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <Window title="Engineroom - Playbooks - Short form">
          <ScrollingList items={PLAYBOOKS} icon />
        </Window>
      );
    case 1:
      return (
        <Window title="Edit review">
          <Clip src="train-02b" sub="Review cadence" label="Every edit, reviewed against the posting rules" />
          <div className="px-5 py-4">
            <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-500"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 4.5, ease: 'linear', repeat: Infinity }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-400 mt-2">
              <span>Hook</span><span>Body</span><span>Payoff</span><span>CTA</span>
            </div>
          </div>
        </Window>
      );
    case 2:
      return (
        <Window title="Training library">
          <Clip src="train-16a" sub="Video 16" label="Three Ways to Capture, and When to Script" />
          <div className="grid grid-cols-2 gap-px bg-white/5">
            <div className="relative aspect-video bg-black">
              <video className="absolute inset-0 w-full h-full object-cover" src="/founding/train-02a.mp4" poster="/founding/train-02a.jpg" autoPlay muted loop playsInline preload="metadata" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute left-3 bottom-2 text-[11px] text-white font-semibold">02 Authority Engine Fundamentals</p>
            </div>
            <div className="relative aspect-video bg-black">
              <video className="absolute inset-0 w-full h-full object-cover" src="/founding/train-13.mp4" poster="/founding/train-13.jpg" autoPlay muted loop playsInline preload="metadata" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute left-3 bottom-2 text-[11px] text-white font-semibold">13 Stealing Ideas Effectively</p>
            </div>
          </div>
        </Window>
      );
    case 3:
      return (
        <Window title="contentengine.live - Playbooks - Short form - Formats">
          <FormatsMap />
        </Window>
      );
    case 4:
      return (
        <Window title="Advisory office hours">
          <Clip src="live" sub="Live" label="Jump in and ask, before we start" />
          <div className="flex items-center gap-3 px-5 py-4">
            <CalendarDays className="w-4 h-4 text-blue-400" />
            <span className="text-[13px] text-zinc-300">Every Thursday. Mondays coming soon.</span>
          </div>
        </Window>
      );
    default:
      return (
        <Window title="WhatsApp">
          <WhatsAppThread />
        </Window>
      );
  }
}

/*
  An example thread, labelled as one. Not a real client conversation.
  Sean, 13 Nov: set up the moment they buy, direct access to him. Thread is
  Sean's own wording (13 Nov).
*/
const THREAD: { who: string; me?: boolean; text: string; time?: string }[] = [
  { who: 'Operator', text: 'Filming Thursday. Should we shoot the Youtube first? Or shortform?', time: '9:14am' },
  { who: 'Sean', text: 'The two belief shorts, then the client breakdown. Format cards are in your portal. Then follow the prompts from our longform playbook', time: '9:41am' },
  { who: 'You', me: true, text: 'Just finished the Youtube, that was easy as.' },
];
function WhatsAppThread() {
  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <span className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
        </span>
        <div className="min-w-0">
          <p className="text-white text-[13px] font-semibold truncate">Authority Engine Advisory Board</p>
          <p className="text-zinc-500 text-[11px] truncate">You, Sean, your operator</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end gap-2 px-4 py-3 bg-[#0b141a]/60">
        {THREAD.map((m, i) => (
          <div key={i} className={`max-w-[82%] rounded-xl px-3 py-2 ${m.me ? 'self-end bg-[#005c4b]' : 'self-start bg-[#202c33]'}`}>
            {!m.me && <p className="text-[11px] font-semibold text-[#25D366] mb-0.5">{m.who}</p>}
            <p className="text-[13px] text-zinc-100 leading-snug">{m.text}</p>
            {m.time && <p className="text-[10px] text-zinc-400 text-right mt-0.5">{m.time}</p>}
          </div>
        ))}
        <p className="self-start text-[11px] text-zinc-500 italic">Sean is typing...</p>
      </div>
      <p className="px-4 py-1.5 text-[10px] text-zinc-600 border-t border-white/5">Example thread</p>
    </div>
  );
}

/* v is the Visual to show. Sean, 12 Nov: no "Every edit", office hours back. */
const ITEMS: { name: string; text: string; v: number }[] = [
  { name: 'Every SOP.', text: 'The ones we run with clients, across every format.', v: 0 },
  { name: 'Every training video.', text: 'The full library.', v: 2 },
  { name: 'Both playbooks.', text: 'Short form and long form, complete.', v: 3 },
  { name: 'Advisory office hours, early.', text: 'Jump in and ask before we start.', v: 4 },
  { name: 'WhatsApp, from today.', text: 'Set up the moment you buy. Direct access to me.', v: 5 },
];

export default function StartTodayShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  /* Whichever item crosses the middle of the screen drives the window. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-12 mt-10">
      <ul className="min-w-0 space-y-3 md:space-y-0">
        {ITEMS.map((it, i) => (
          <li
            key={it.name}
            ref={(el) => { refs.current[i] = el; }}
            data-i={i}
            onMouseEnter={() => setActive(i)}
            className={`md:min-h-[38vh] md:flex md:items-center transition-opacity duration-300 ${active === i ? 'md:opacity-100' : 'md:opacity-35'}`}
          >
            <div className="w-full">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-display text-xl md:text-2xl font-extrabold tracking-[-0.01em]">{it.name}</p>
                  <p className="text-zinc-400 text-[15px] mt-1">{it.text}</p>
                </div>
              </div>
              {/* Mobile: the visual sits under its own item. */}
              <div className="md:hidden mt-5 mb-8">
                <Visual index={ITEMS[i].v} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        <div className="sticky top-[18vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Visual index={ITEMS[active].v} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/*
  The compact version, used on /founding-v2. Same six items, same visuals,
  about one screen tall instead of six.

  Wide screens: the list on the left, one visual on the right. The next item
  lights up every 5 seconds with a progress bar under it, clicking an item
  jumps to it, hovering pauses.

  Phones: one card per item, swiped sideways.
*/
const STEP_MS = 5000;

export function StartTodayCompact() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % ITEMS.length);
      setTick((n) => n + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, tick]);

  const pick = (i: number) => {
    setActive(i);
    setTick((n) => n + 1);
  };

  return (
    <div className="mt-10">
      {/* Wide screens */}
      <div
        className="hidden md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul className="space-y-1">
          {ITEMS.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.name}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  className={`w-full text-left rounded-xl px-4 py-3.5 transition-colors ${on ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  <p className={`font-semibold text-[16px] ${on ? 'text-white' : 'text-zinc-400'}`}>{it.name}</p>
                  <p className={`text-[14px] mt-0.5 ${on ? 'text-zinc-300' : 'text-zinc-500'}`}>{it.text}</p>
                  <div className="mt-3 h-[2px] w-full rounded-full bg-white/5 overflow-hidden">
                    {on && (
                      <motion.div
                        key={`${active}-${tick}`}
                        className="h-full bg-blue-500"
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? undefined : '100%' }}
                        transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Visual index={ITEMS[active].v} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Phones: swipe sideways */}
      <div className="md:hidden -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ITEMS.map((it, i) => (
          <div key={it.name} className="snap-center shrink-0 w-[85%]">
            <Visual index={ITEMS[i].v} />
            <p className="text-white font-semibold text-[16px] mt-4">{it.name}</p>
            <p className="text-zinc-400 text-[14px] mt-0.5">{it.text}</p>
          </div>
        ))}
      </div>
      <p className="md:hidden text-zinc-500 text-[13px] mt-2">Swipe to see all six.</p>
    </div>
  );
}
