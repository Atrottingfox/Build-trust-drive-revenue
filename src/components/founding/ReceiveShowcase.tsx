import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Visual, Window } from './StartTodayShowcase';

/*
  "What you receive" on /founding-v2, the same scroll matched layout as the Pay
  in full section (Sean liked that one). The images are real slides from the
  Brand Day workbooks on brand.contentengine.live, rendered with Sean's own
  client file so no client's answers show. Lines under each item are the
  workbooks' own words.
*/

const Shot = ({ src, title }: { src: string; title: string }) => (
  <Window title={title}>
    <img src={`/founding/receive/${src}.jpg`} alt={title} loading="lazy" width={1280} height={720} className="block w-full h-auto" />
  </Window>
);

const ITEMS: { name: string; text: string; visual: React.ReactNode }[] = [
  { name: 'The Brand Demand Workbook.', text: 'Thirteen exercises. One document. Your brand, mapped on the day.', visual: <Shot src="brand-cover" title="Brand Demand Workbook" /> },
  { name: 'Everything you walk out with.', text: 'Voice card, belief bank, mission, enemy and promise, story bank, category claim and more.', visual: <Shot src="brand-walkout" title="What you walk out with" /> },
  { name: 'Your avatar card.', text: 'The Hero Buyer. Every piece of content gets tested against this person.', visual: <Shot src="avatar-card" title="Avatar card" /> },
  { name: 'Your voice.', text: 'How the founder sounds. How the team writes.', visual: <Shot src="voice-cover" title="Voice workbook" /> },
  { name: 'Your hook bank.', text: '6 archetype buckets. 90 patterns.', visual: <Shot src="hooks-cover" title="Hook bank" /> },
  { name: 'Your 4 numbers.', text: 'Reach, capture, conversion, compounding. Your operator owns the dashboard.', visual: <Shot src="kpi" title="KPI dashboard" /> },
  { name: 'A team that runs it themselves.', text: 'Every SOP and playbook in one place, so the system runs without you.', visual: <Visual index={0} /> },
];

export default function ReceiveShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 md:gap-12 mt-10">
      <ul className="min-w-0 space-y-3 md:space-y-0">
        {ITEMS.map((it, i) => (
          <li
            key={it.name}
            ref={(el) => { refs.current[i] = el; }}
            data-i={i}
            onMouseEnter={() => setActive(i)}
            className={`md:min-h-[34vh] md:flex md:items-center transition-opacity duration-300 ${active === i ? 'md:opacity-100' : 'md:opacity-35'}`}
          >
            <div className="w-full">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-display text-xl md:text-2xl font-extrabold tracking-[-0.01em]">{it.name}</p>
                  <p className="text-zinc-400 text-[15px] mt-1">{it.text}</p>
                </div>
              </div>
              <div className="md:hidden mt-5 mb-8">{it.visual}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden md:block">
        <div className="sticky top-[22vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {ITEMS[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
