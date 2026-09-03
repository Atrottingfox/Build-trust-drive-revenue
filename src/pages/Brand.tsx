import React, { useState, useRef, useEffect } from 'react';
import { Download, Check, Copy } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

/**
 * /brand — the public brand asset sheet.
 *
 * Sent to clients, partners, podcast producers and designers who ask for
 * "your logo and colours". Every asset here is a real file under /public/brand,
 * so the download attributes work rather than just looking like they do.
 *
 * noindex: it is a link you hand out, not a page that should rank.
 */

const ZIP = '/brand/authority-engine-brand-assets.zip';

type Asset = {
  file: string;
  label: string;
  dim: string;
  note: string;
};

const LOGO_FILES: Asset[] = [
  {
    file: '/brand/authority-engine-logo.svg',
    label: 'authority-engine-logo.svg',
    dim: 'Vector',
    note: 'Master file. Scales to any size. Use this first.',
  },
  {
    file: '/brand/authority-engine-logo-4096.png',
    label: 'authority-engine-logo-4096.png',
    dim: '3699 x 4096',
    note: 'Transparent. Print, large format, anything that gets scaled.',
  },
  {
    file: '/brand/authority-engine-logo-1024.png',
    label: 'authority-engine-logo-1024.png',
    dim: '925 x 1024',
    note: 'Transparent. Decks, documents, on screen.',
  },
];

const ICON_FILES: Asset[] = [
  {
    file: '/brand/authority-engine-icon-2048.png',
    label: 'authority-engine-icon-2048.png',
    dim: '2048 x 2048',
    note: 'Largest square tile.',
  },
  {
    file: '/brand/authority-engine-icon-1024.png',
    label: 'authority-engine-icon-1024.png',
    dim: '1024 x 1024',
    note: 'Profile pictures on most platforms.',
  },
  {
    file: '/brand/authority-engine-icon-512.png',
    label: 'authority-engine-icon-512.png',
    dim: '512 x 512',
    note: 'Favicons and app tiles.',
  },
];

const HEADER_FILES: Asset[] = [
  {
    file: '/brand/authority-engine-header-3600x1890.png',
    label: 'authority-engine-header-3600x1890.png',
    dim: '3600 x 1890',
    note: 'Retina and print. Type rendered from vector at full size.',
  },
  {
    file: '/brand/authority-engine-header-2400x1260.png',
    label: 'authority-engine-header-2400x1260.png',
    dim: '2400 x 1260',
    note: 'Retina screens, slide decks.',
  },
  {
    file: '/brand/authority-engine-header-1200x630.png',
    label: 'authority-engine-header-1200x630.png',
    dim: '1200 x 630',
    note: 'Exact Open Graph size. Use this one for social and email.',
  },
];

const GUIDE_FILES: Asset[] = [
  {
    file: '/brand/authority-engine-brand-guide.md',
    label: 'authority-engine-brand-guide.md',
    dim: 'Text',
    note: 'Everything on this page as a text file.',
  },
];

type Swatch = { hex: string; name: string; use: string };

const BLUES: Swatch[] = [
  { hex: '#3B82F6', name: 'Primary blue', use: 'Buttons, borders, primary accents' },
  { hex: '#60A5FA', name: 'Light blue', use: 'Accent type, links, highlights. The most used of the set' },
  { hex: '#2563EB', name: 'Deep blue', use: 'Hover states, gradient ends' },
  { hex: '#5B8DF1', name: 'Mark light', use: 'Left half of the A. Logo only' },
  { hex: '#3568D6', name: 'Mark dark', use: 'Right half of the A. Logo only' },
];

const NEUTRALS: Swatch[] = [
  { hex: '#09090B', name: 'Base black', use: 'Page background' },
  { hex: '#111113', name: 'Surface', use: 'Cards and panels' },
  { hex: '#18181B', name: 'Elevated', use: 'Raised cards, hover fills' },
  { hex: '#27272A', name: 'Border', use: 'Hairlines, dividers, card edges' },
  { hex: '#71717A', name: 'Muted text', use: 'Body copy, secondary labels' },
  { hex: '#E4E4E7', name: 'Off white', use: 'Standard type on dark' },
  { hex: '#FFFFFF', name: 'White', use: 'Headlines only' },
];

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2 L30 33 L18 33 L16 28 L14 33 L2 33 Z M16 12 L20 22 L12 22 Z"
        fill="#5B8DF1"
        fillRule="evenodd"
      />
      <path d="M16 2 L30 33 L18 33 L16 28 L16 22 L20 22 L16 12 Z" fill="#3568D6" />
    </svg>
  );
}

function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[148px_minmax(0,1fr)] gap-5 md:gap-10 py-10 md:py-16 border-b border-subtle last:border-b-0">
      <div className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-muted md:pt-1.5">
        {label}
      </div>
      <div className="flex flex-col gap-7 min-w-0">{children}</div>
    </section>
  );
}

function FileRow({ asset }: { asset: Asset }) {
  return (
    <a
      href={asset.file}
      download
      className="group grid grid-cols-1 sm:grid-cols-[minmax(0,1.05fr)_92px_minmax(0,1fr)_auto] gap-2 sm:gap-4 sm:items-center bg-surface px-4 py-3.5 hover:bg-elevated transition-colors"
    >
      <code className="font-mono text-[12.5px] text-blue-400 break-all">{asset.label}</code>
      <span className="font-mono text-[11.5px] text-zinc-500 tabular-nums whitespace-nowrap">
        {asset.dim}
      </span>
      <span className="text-[13.5px] text-muted">{asset.note}</span>
      <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 group-hover:text-white transition-colors justify-self-start sm:justify-self-end">
        <Download className="w-3.5 h-3.5" />
        Download
      </span>
    </a>
  );
}

function FileList({ assets }: { assets: Asset[] }) {
  return (
    <div className="flex flex-col gap-px bg-subtle border border-subtle rounded-xl overflow-hidden">
      {assets.map((a) => (
        <FileRow key={a.file} asset={a} />
      ))}
    </div>
  );
}

function SwatchGrid({
  set,
  onCopy,
  copied,
}: {
  set: Swatch[];
  onCopy: (hex: string) => void;
  copied: string | null;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {set.map((s) => {
        const isCopied = copied === s.hex;
        return (
          <button
            key={s.hex}
            type="button"
            onClick={() => onCopy(s.hex)}
            className="text-left bg-surface border border-subtle rounded-xl overflow-hidden hover:border-zinc-700 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            <span className="block h-[76px] border-b border-subtle" style={{ background: s.hex }} />
            <span className="flex flex-col gap-0.5 px-3 pt-2.5 pb-3">
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[13px] font-medium text-white tabular-nums tracking-wide">
                  {s.hex}
                </span>
                {isCopied ? (
                  <Check className="w-3 h-3 text-blue-400" />
                ) : (
                  <Copy className="w-3 h-3 text-zinc-600" />
                )}
              </span>
              <span className="text-[13px] font-medium text-zinc-300">{s.name}</span>
              <span className="text-[12.5px] text-muted leading-snug">{s.use}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Brand() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = (hex: string) => {
    const done = () => {
      setCopied(hex);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(hex).then(done, done);
    } else {
      done();
    }
  };

  return (
    <div className="min-h-screen bg-base text-zinc-200">
      <SEO
        title="Brand assets"
        description="Logo, colour, type and header assets for The Authority Engine."
        path="/brand"
        noIndex
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        {/* Masthead */}
        <header className="pt-32 pb-12 md:pb-16 flex flex-col gap-7">
          <div className="flex items-center gap-4">
            <Mark className="w-[34px] h-auto" />
            <div className="text-[21px] font-bold tracking-tight text-white">
              The Authority Engine
            </div>
          </div>

          <h1 className="font-display text-[clamp(40px,8vw,76px)] leading-[0.98] tracking-[-0.035em] text-white text-balance max-w-[15ch]">
            Brand sheet
          </h1>

          <p className="max-w-[56ch] text-[17px] font-light text-zinc-400">
            Logo, colour, type and header assets. Everything here is pulled straight from the live
            site, so what you see is what ships.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href={ZIP}
              download
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[15px] font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Download everything
            </a>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">
              ZIP · 388 KB · 11 files
            </span>
          </div>
        </header>

        {/* The one gradient on the page, taken from the two halves of the mark */}
        <div
          className="h-0.5 w-full"
          style={{
            background:
              'linear-gradient(90deg, #5B8DF1 0%, #3568D6 34%, #27272A 34%, #27272A 100%)',
          }}
        />

        <Rail label="Logo">
          <h2 className="text-[clamp(26px,4vw,34px)] font-bold tracking-tight text-white">
            The split A
          </h2>
          <p className="-mt-4 max-w-[62ch] text-[15.5px] text-zinc-400">
            One mark, two blues. The lighter half sits left, the darker half right. The counter
            inside the A is knocked out rather than filled, so the mark carries whatever sits behind
            it and works on light and dark without a second version. Every PNG here is rendered from
            the vector, so nothing has been upscaled.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { bg: 'bg-base', tag: 'ON BASE BLACK / PREFERRED' },
              { bg: 'bg-surface', tag: 'ON CARD SURFACE' },
              { bg: 'bg-zinc-200', tag: 'ON LIGHT GROUND' },
            ].map((g) => (
              <div
                key={g.tag}
                className="border border-subtle rounded-2xl overflow-hidden flex flex-col"
              >
                <div className={`flex-1 grid place-items-center py-12 px-6 min-h-[168px] ${g.bg}`}>
                  <Mark className="w-[62px] h-auto" />
                </div>
                <div className="font-mono text-[11px] tracking-wider text-muted px-3.5 py-3 border-t border-subtle bg-base">
                  {g.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              The mark
            </div>
            <FileList assets={LOGO_FILES} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Square icon
            </div>
            <FileList assets={ICON_FILES} />
          </div>
        </Rail>

        <Rail label="Colour">
          <h2 className="text-[clamp(26px,4vw,34px)] font-bold tracking-tight text-white">
            Blue on black
          </h2>
          <p className="-mt-4 max-w-[62ch] text-[15.5px] text-zinc-400">
            The neutrals do the work. Blue is the accent and it stays rare. Across the whole site the
            light blue is the single most used accent, and it appears as type far more often than as
            fill.
          </p>

          <div
            className={`-mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
              copied ? 'text-blue-400' : 'text-muted'
            }`}
            aria-live="polite"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? `${copied} copied to clipboard` : 'Click any swatch to copy its hex'}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Brand blues
            </div>
            <SwatchGrid set={BLUES} onCopy={handleCopy} copied={copied} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Neutrals
            </div>
            <SwatchGrid set={NEUTRALS} onCopy={handleCopy} copied={copied} />
          </div>
        </Rail>

        <Rail label="Type">
          <h2 className="text-[clamp(26px,4vw,34px)] font-bold tracking-tight text-white">
            Outfit, all of it
          </h2>
          <p className="-mt-4 max-w-[62ch] text-[15.5px] text-zinc-400">
            One family across the whole system. The weight does the shouting, not a second typeface.
            Headlines run heavy and tight, body copy runs light and open.
          </p>

          <div className="border border-subtle rounded-2xl bg-surface p-6 sm:p-8 flex flex-col gap-6">
            <div className="text-[clamp(38px,8vw,68px)] font-extrabold tracking-[-0.035em] leading-[1.05] text-white break-words">
              ABCDEFGHIJKLM
              <br />
              <span className="text-muted font-light">abcdefghijklm 0123456789</span>
            </div>

            <div className="flex flex-col gap-px bg-subtle rounded-xl overflow-hidden">
              {[
                { w: '800', s: 'Own your category', cls: 'font-extrabold tracking-tight' },
                { w: '600', s: 'Section headings and subheads', cls: 'font-semibold' },
                { w: '400', s: 'Body copy sits here, at normal weight', cls: 'font-normal' },
                { w: '300', s: 'Standfirsts and long introductions', cls: 'font-light' },
              ].map((r) => (
                <div
                  key={r.w}
                  className="grid grid-cols-1 sm:grid-cols-[84px_minmax(0,1fr)] gap-1 sm:gap-4 sm:items-baseline bg-elevated px-4 py-3"
                >
                  <span className="font-mono text-[11px] text-muted tabular-nums tracking-wider">
                    {r.w}
                  </span>
                  <span className={`text-[19px] text-zinc-200 leading-snug ${r.cls}`}>{r.s}</span>
                </div>
              ))}
            </div>

            <div className="font-mono text-[12.5px] text-muted leading-[1.7] break-words">
              FAMILY <span className="text-blue-400 font-medium">Outfit</span> ·{' '}
              <a
                href="https://fonts.google.com/specimen/Outfit"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-700 underline-offset-4 hover:text-blue-400 transition-colors"
              >
                fonts.google.com/specimen/Outfit
              </a>
              <br />
              WEIGHTS LOADED{' '}
              <span className="text-blue-400 font-medium">300 400 500 600 700 800 900</span>
              <br />
              FALLBACK{' '}
              <span className="text-blue-400 font-medium">
                'Outfit', -apple-system, BlinkMacSystemFont, sans-serif
              </span>
            </div>
          </div>
        </Rail>

        <Rail label="Header">
          <h2 className="text-[clamp(26px,4vw,34px)] font-bold tracking-tight text-white">
            Share card
          </h2>
          <p className="-mt-4 max-w-[62ch] text-[15.5px] text-zinc-400">
            The standard header image, rebuilt as live type so it holds up at size. The 1200 x 630
            version is the exact Open Graph size and drops into LinkedIn, X, Facebook and email
            headers without a recrop. Go bigger for slides and print.
          </p>

          <div className="border border-subtle rounded-2xl overflow-hidden bg-surface">
            <img
              src="/brand/authority-engine-header-1200x630.png"
              srcSet="/brand/authority-engine-header-1200x630.png 1200w, /brand/authority-engine-header-2400x1260.png 2400w"
              sizes="(max-width: 720px) 100vw, 860px"
              alt="The Authority Engine header card reading Own your category."
              width={1200}
              height={630}
              className="block w-full h-auto"
            />
          </div>

          <FileList assets={HEADER_FILES} />
        </Rail>

        <Rail label="Usage">
          <h2 className="text-[clamp(26px,4vw,34px)] font-bold tracking-tight text-white">
            How to hold it
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-blue-400 mb-3.5">
                Do
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Put the mark on black or near black wherever you can. That is the ground it was drawn for.',
                  'Use the SVG at any size. It stays sharp.',
                  'Use the square icon when the mark needs its own black tile.',
                  'Let blue be rare. One accent per screen reads stronger than five.',
                  'Write it as The Authority Engine, or Authority Engine.',
                ].map((t) => (
                  <li key={t} className="relative pl-5 text-[15px] text-zinc-400 max-w-[44ch]">
                    <span className="absolute left-0 top-[10px] w-2 h-px bg-blue-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-muted mb-3.5">
                Do not
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Recolour either half of the A, or flatten it to one blue.',
                  'Rotate, stretch, outline or add a shadow, glow or gradient.',
                  'Fill the counter inside the A. The knockout is the point.',
                  'Rebuild the wordmark in another typeface.',
                  'Set the mark on a mid grey or a busy photo.',
                ].map((t) => (
                  <li key={t} className="relative pl-5 text-[15px] text-zinc-400 max-w-[44ch]">
                    <span className="absolute left-0 top-[10px] w-2 h-px bg-zinc-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FileList assets={GUIDE_FILES} />
        </Rail>
      </div>

      <Footer />
    </div>
  );
}
