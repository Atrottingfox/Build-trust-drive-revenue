import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// ── Slide types ──
interface SlideData {
  bg?: 'dark' | 'light';
  ghost?: string;
  label?: string;
  headline?: React.ReactNode;
  body?: string;
  visual?: React.ReactNode;
  stat?: string;
  statLabel?: string;
  accent?: boolean; // blue accent bar
  centered?: boolean;
}

interface CaseStudyData {
  name: string;
  slides: SlideData[];
}

// ── Visual components ──
function GhostText({ text }: { text: string }) {
  return (
    <div className="absolute top-[-10px] right-[-8px] font-display text-[140px] font-extrabold text-white/[0.02] leading-none select-none pointer-events-none">
      {text}
    </div>
  );
}

function AccentBar() {
  return <div className="w-[50px] h-[3px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mb-8" />;
}

function MiniChart({ bars }: { bars: number[] }) {
  return (
    <div className="flex items-end gap-[3px] h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[5px] rounded-t-sm bg-blue-500"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          style={{ opacity: 0.3 + (h / 100) * 0.6 }}
        />
      ))}
    </div>
  );
}

function GrowthLine() {
  return (
    <svg className="w-full h-16 mt-6" viewBox="0 0 300 60" fill="none">
      <motion.path
        d="M0 55 C50 55, 80 50, 120 40 S200 15, 300 5"
        stroke="rgba(59,130,246,0.4)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.circle
        cx="300" cy="5" r="4" fill="#3b82f6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />
    </svg>
  );
}

function FunnelBars({ widths }: { widths: number[] }) {
  return (
    <div className="flex flex-col gap-[4px] items-start mt-4">
      {widths.map((w, i) => (
        <motion.div
          key={i}
          className="h-[6px] rounded-sm bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          style={{ opacity: 0.3 + (1 - i / widths.length) * 0.5 }}
        />
      ))}
    </div>
  );
}

function StrikeReplace({ old, replacement }: { old: string; replacement: string }) {
  return (
    <div className="space-y-3">
      <p className="text-zinc-600 line-through text-lg">{old}</p>
      <p className="font-display text-2xl font-extrabold text-white">{replacement}</p>
    </div>
  );
}

function CounterStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="mt-auto pt-6">
      <p className="font-display text-5xl md:text-6xl font-extrabold text-white tracking-tight">{value}</p>
      <p className="text-zinc-500 text-sm mt-2">{label}</p>
    </div>
  );
}

// ── Case study data ──
const caseStudies: CaseStudyData[] = [
  {
    name: "Taki Moore",
    slides: [
      {
        ghost: "TM",
        label: "The story",
        headline: <><span className="text-zinc-500">His reputation was massive.</span><br />His presence wasn't.</>,
        centered: true,
      },
      {
        ghost: "01",
        label: "The weight",
        headline: <>Too much impact to not be represented well online.</>,
        body: "Massive brand. Huge reputation. But none of it was showing up where it mattered.",
        accent: true,
      },
      {
        ghost: "02",
        label: "The problem",
        headline: <>Sales team of closers.<br /><span className="text-zinc-500">Content was an afterthought.</span></>,
        visual: <FunnelBars widths={[80, 60, 30, 8]} />,
      },
      {
        ghost: "03",
        label: "The vision",
        headline: <>Replace the sales team.<br /><span className="text-blue-500/80">With content.</span></>,
        centered: true,
      },
      {
        label: "The shift",
        headline: <>We repositioned everything.</>,
        visual: (
          <div className="space-y-6 mt-8">
            <StrikeReplace old="Team of closers" replacement="Content driven pipeline" />
            <StrikeReplace old="Cold outreach" replacement="Presold prospects" />
            <StrikeReplace old="Convincing people" replacement="Attracting the right ones" />
          </div>
        ),
      },
      {
        ghost: "→",
        label: "The build",
        headline: <>Every prospect arrived presold.</>,
        body: "They looked at the offer and purchased. No sales calls. No convincing. No friction.",
        accent: true,
      },
      {
        label: "The moment",
        headline: <>He never had to jump on a sales call again.</>,
        body: "The content did the selling. The brand did the positioning. The system did the rest.",
        centered: true,
      },
      {
        ghost: "$5M",
        label: "The outcome",
        headline: <><span className="text-blue-500/80">+$5M</span> revenue from content.</>,
        body: "In six months. It completely transformed how he sold, how he showed up, and how the market saw him.",
        visual: <GrowthLine />,
        stat: "+$5M",
        statLabel: "6 months",
      },
      {
        label: "The takeaway",
        headline: <>Your presence should match your reputation.</>,
        body: "If it doesn't, you're leaving money, influence, and impact on the table.",
        accent: true,
        centered: true,
      },
      {
        bg: 'light',
        headline: <>Want to see what this looks like for your brand?</>,
        body: "Apply for The Authority Engine.",
        centered: true,
      },
    ],
  },
  {
    name: "Jay Wright",
    slides: [
      {
        ghost: "JW",
        label: "The story",
        headline: <><span className="text-zinc-500">He had the expertise.</span><br />Content felt heavy.</>,
        centered: true,
      },
      {
        ghost: "01",
        label: "The weight",
        headline: <>45,000 followers.<br /><span className="text-zinc-500">Growth had stalled.</span></>,
        body: "A marketing team of one. Agencies tried. Nothing stuck. Creating content felt like pushing uphill.",
        accent: true,
      },
      {
        ghost: "02",
        label: "The problem",
        headline: <>No strategy.<br />No system.<br /><span className="text-zinc-500">No idea why they were posting.</span></>,
        visual: <MiniChart bars={[30, 35, 25, 32, 28, 30, 33]} />,
      },
      {
        label: "What he wanted",
        headline: <>Speed to the outcome.<br /><span className="text-blue-500/80">Without losing control.</span></>,
        body: "He'd tried agencies but wanted a different approach. More control. More intention. Less weight.",
        centered: true,
      },
      {
        label: "The shift",
        headline: <>We built around his calendar.</>,
        visual: (
          <div className="space-y-6 mt-8">
            <StrikeReplace old="Content felt heavy" replacement="Content became the lightest part" />
            <StrikeReplace old="Posting without purpose" replacement="Every piece built trust" />
            <StrikeReplace old="Growth had flatlined" replacement="Pipeline filled itself" />
          </div>
        ),
      },
      {
        ghost: "→",
        label: "The build",
        headline: <>Optimised exclusively for trust.</>,
        body: "Every piece of content was designed to position him as the undeniable expert. Not vanity metrics. Authority.",
        accent: true,
      },
      {
        ghost: "2x",
        label: "The outcome",
        headline: <><span className="text-blue-500/80">46k → 90k</span><br />in 10 months.</>,
        body: "But the real win was behind the scenes. Content attributed to many millions in additional revenue. During this period, the business went through a major growth phase including a PE acquisition.",
        visual: <GrowthLine />,
        stat: "46k → 90k",
        statLabel: "10 months",
      },
      {
        label: "The takeaway",
        headline: <>Content shouldn't feel heavy.</>,
        body: "If it does, you don't have a content problem. You have a systems problem.",
        accent: true,
        centered: true,
      },
      {
        bg: 'light',
        headline: <>Want content that fills your pipeline without the weight?</>,
        body: "Apply for The Authority Engine.",
        centered: true,
      },
    ],
  },
  {
    name: "Mitch Revs",
    slides: [
      {
        ghost: "MR",
        label: "The story",
        headline: <><span className="text-zinc-500">He hated showing up on camera.</span><br />It was costing him everything.</>,
        centered: true,
      },
      {
        ghost: "01",
        label: "The weight",
        headline: <>Hundreds of thousands in missed opportunities.</>,
        body: "Strong brand. People loved him. But he didn't want to do media and it was holding everything back.",
        accent: true,
      },
      {
        ghost: "02",
        label: "The problem",
        headline: <>Huge brand.<br />No video presence.<br /><span className="text-zinc-500">No process.</span></>,
        body: "He had a reputation. It just wasn't built with video. The online presence didn't match the offline impact.",
      },
      {
        label: "The approach",
        headline: <>Make it so easy he didn't have to think.</>,
        body: "We branded the entire process. Integrated it into what he already loved. Removed every point of friction.",
        centered: true,
      },
      {
        label: "The shift",
        headline: <>We built around who he actually is.</>,
        visual: (
          <div className="space-y-6 mt-8">
            <StrikeReplace old="Hated showing up on camera" replacement="Content felt native. Not forced" />
            <StrikeReplace old="Missed opportunities" replacement="Market flooded with his voice" />
            <StrikeReplace old="No consistent output" replacement="A machine that ran itself" />
          </div>
        ),
      },
      {
        ghost: "→",
        label: "The build",
        headline: <>Extremely authentic.<br /><span className="text-blue-500/80">Extreme authenticity.</span></>,
        body: "Through short form video we built it out and created a magnetic personal brand that aligned with who he was. We didn't make him someone else. We amplified who he already was.",
        accent: true,
      },
      {
        ghost: "1.2M",
        label: "The outcome",
        headline: <><span className="text-blue-500/80">1.2M+</span> organic impressions.</>,
        body: "Three months straight. The results in his business showed. Directly attributed to the content strategy. All from a founder who originally hated being on camera.",
        visual: (
          <div className="flex items-end gap-2 mt-6 h-16">
            {[40, 65, 90].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                style={{ opacity: 0.4 + i * 0.25 }}
              />
            ))}
          </div>
        ),
        stat: "1.2M+",
        statLabel: "3 months straight",
      },
      {
        label: "The takeaway",
        headline: <>You don't need to love the camera.</>,
        body: "You need a system that works around who you are. Not against it.",
        accent: true,
        centered: true,
      },
      {
        bg: 'light',
        headline: <>Ready to build a presence that matches your impact?</>,
        body: "Apply for The Authority Engine.",
        centered: true,
      },
    ],
  },
];

// ── Slide renderer ──
function Slide({ data }: { data: SlideData }) {
  const isLight = data.bg === 'light';

  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden ${
      isLight ? 'bg-white' : 'bg-[#111113]'
    }`}>
      {/* Ghost watermark */}
      {data.ghost && <GhostText text={data.ghost} />}

      {/* Content */}
      <div className={`relative z-10 flex-1 flex flex-col px-8 py-10 ${
        data.centered ? 'justify-center' : 'justify-end'
      }`}>
        {/* Label */}
        {data.label && (
          <p className={`text-[10px] uppercase tracking-[0.25em] font-semibold mb-4 ${
            isLight ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {data.label}
          </p>
        )}

        {/* Accent bar */}
        {data.accent && <AccentBar />}

        {/* Headline */}
        {data.headline && (
          <h2 className={`font-display text-[22px] md:text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4 ${
            isLight ? 'text-black' : 'text-white'
          }`}>
            {data.headline}
          </h2>
        )}

        {/* Body */}
        {data.body && (
          <p className={`text-[13px] leading-relaxed max-w-[320px] ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            {data.body}
          </p>
        )}

        {/* Visual */}
        {data.visual && data.visual}

        {/* CTA button for light slides */}
        {isLight && (
          <a
            href="https://form.typeform.com/to/S2rogsdT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full text-[13px] font-semibold mt-8 self-start hover:bg-zinc-800 transition-colors"
          >
            Apply now →
          </a>
        )}
      </div>

      {/* Bottom accent line */}
      {!isLight && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/40 to-transparent" />
      )}
    </div>
  );
}

// ── Modal ──
export default function CaseStudyModal({ index, onClose }: { index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const study = caseStudies[index];
  const total = study.slides.length;

  const touchStart = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, total - 1));
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, total]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrent(c => Math.min(c + 1, total - 1));
      else setCurrent(c => Math.max(c - 1, 0));
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — 4:5 aspect ratio */}
      <motion.div
        className="relative w-[85vw] max-w-[400px] bg-[#111113] border border-zinc-800/40 rounded-xl overflow-hidden"
        style={{ aspectRatio: '4/5' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-[3px] p-3 pb-0">
          {study.slides.map((_, i) => (
            <div key={i} className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white/70 rounded-full"
                initial={false}
                animate={{ width: i < current ? '100%' : i === current ? '100%' : '0%' }}
                transition={{ duration: i === current ? 0.3 : 0 }}
              />
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Slide data={study.slides[current]} />
          </motion.div>
        </AnimatePresence>

        {/* Click zones */}
        <div className="absolute inset-0 z-20 flex">
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={() => setCurrent(c => Math.max(c - 1, 0))}
          />
          <div className="w-1/3 h-full" />
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={() => setCurrent(c => Math.min(c + 1, total - 1))}
          />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex items-center justify-between px-4 text-zinc-600 text-[10px]">
          <span>{current + 1} / {total}</span>
          <span className="font-display font-bold tracking-wider uppercase text-zinc-700">{study.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
