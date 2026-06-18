import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../Footer';
import SEO from '../SEO';
import PasswordGate from '../PasswordGate';

// Shared design bits for the Undeniable hub + sub-pages.
// NOTE: never use `text-base` in this project — `base` is a colour token (#09090b)
// and it paints text near-black on the dark bg. Use text-[15px] / text-[17px].

export function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-5">{children}</p>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">{children}</h2>
);

export const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-400 text-[14px] leading-relaxed italic mt-8">{children}</p>
);

export const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-4">{label}</p>
    {children}
  </div>
);

export const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <span className="text-zinc-300 text-[15px] leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

// Quotes. star=true marks the strongest pulls.
export const Quotes = ({ items }: { items: Array<string | { q: string; star?: boolean }> }) => (
  <ul className="space-y-3">
    {items.map((raw, i) => {
      const q = typeof raw === 'string' ? raw : raw.q;
      const star = typeof raw === 'string' ? false : raw.star;
      return (
        <li key={i} className="flex items-start gap-3">
          <div className={`mt-1.5 flex-shrink-0 text-[11px] ${star ? 'text-blue-400' : 'text-transparent'}`}>★</div>
          <span className="text-zinc-200 text-[15px] md:text-[16px] leading-relaxed italic">&ldquo;{q}&rdquo;</span>
        </li>
      );
    })}
  </ul>
);

export function Shell({
  title, description, path, children,
}: { title: string; description: string; path: string; children: React.ReactNode }) {
  return (
    <PasswordGate>
      <div className="min-h-screen bg-base">
        <SEO title={title} description={description} path={path} noIndex />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
        {children}
        <Footer />
      </div>
    </PasswordGate>
  );
}

export function PageHead({
  eyebrow, title, accent, blurb,
}: { eyebrow: string; title: string; accent: string; blurb: string }) {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Section>
          <a href="/undeniablenextsteps" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[13px] font-medium mb-8">
            <ArrowLeft className="w-4 h-4" /> Next Steps hub
          </a>
          <div className="accent-line mb-7" />
          <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-5">{eyebrow}</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
            {title} <span className="text-blue-500">{accent}</span>
          </h1>
          <p className="text-zinc-400 text-[16px] md:text-[18px] leading-relaxed">{blurb}</p>
        </Section>
      </div>
    </section>
  );
}

export const Divider = () => <div className="gradient-line" />;

export function Wrap({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-14 md:py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Section>{children}</Section>
      </div>
    </section>
  );
}

export function ModuleLink({ to, label, blurb }: { to: string; label: string; blurb: string }) {
  return (
    <a href={to} className="group block glow-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[18px] font-extrabold text-white">{label}</h3>
        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-zinc-400 text-[14px] leading-relaxed mt-2">{blurb}</p>
    </a>
  );
}

export function Collapsible({ title, eyebrow, defaultOpen = false, children }: { title: string; eyebrow?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-zinc-800 bg-elevated/30 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left hover:bg-elevated/60 transition-colors"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          {eyebrow && <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-1">{eyebrow}</p>}
          <h3 className="font-display text-lg md:text-xl font-extrabold text-white leading-tight">{title}</h3>
        </div>
        <span className={`text-zinc-500 text-[22px] leading-none transition-transform flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-6 pt-2 border-t border-zinc-800/60">
          {children}
        </div>
      )}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: { tabs: Array<{ id: string; label: string }>; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
            active === t.id
              ? 'border-blue-500/50 bg-blue-500/10 text-white'
              : 'border-zinc-800 bg-elevated/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
