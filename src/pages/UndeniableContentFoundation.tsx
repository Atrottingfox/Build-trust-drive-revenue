import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

// ─── Pillars + topics ───────────────────────────────────────────────────

const PILLARS: Array<{ name: string; topics: string[] }> = [
  {
    name: 'Mindset / Identity',
    topics: ["'Just a PT' > business owner", 'Hard and boring work', 'Identity leveling up', 'Impact / mission / duty', "Doing what's required"],
  },
  {
    name: 'Leads / Attract',
    topics: ['Niche (who you help)', 'Message (what you say)', 'Content', 'Proof (authority / case studies)', 'Lead Magnets / funnels'],
  },
  {
    name: 'Sales / Conversion',
    topics: ['Offer design', 'Pricing', 'Show rate', 'Close rate', 'Renewals'],
  },
  {
    name: 'Scale / Delivery',
    topics: ['Churn / retention', 'LTV', 'Check ins', 'Hiring / staff', 'Systems / scale'],
  },
];

// ─── Formats ────────────────────────────────────────────────────────────

const FORMATS: Array<{ name: string; type: string; structure: string[] }> = [
  {
    name: 'Story',
    type: 'Teach through experience',
    structure: ['Hook (moment)', 'What happened (scene / situation)', 'Feeling / meaning / cost (pain / money / emotion)', 'Realisation / lesson / shift', 'Takeaway one liner + tool (implementable)'],
  },
  {
    name: 'Belief',
    type: 'Teach through perspective',
    structure: ['Hook (contrarian / misconception / bold statement / binary / old vs new / relatable pain)', 'State common belief (and why it exists)', 'State your belief (and remove self blame)', 'Explanation plus one proof / example', 'Takeaway'],
  },
  {
    name: 'Teach',
    type: 'Teach through explanation',
    structure: ['Hook (If you / If I. Problem, pain, want, desire.)', 'Core issue / problem', '3 to 5 steps (with a tool or a "don\'t do this")', 'One core takeaway line'],
  },
  {
    name: 'Show',
    type: 'Teach through demonstration',
    structure: ['Hook', 'State the problem in their words', 'Draw the model, do the math, or show', 'Say what that means for them. One liner.', 'Takeaway / next step'],
  },
];

// ─── Environments ───────────────────────────────────────────────────────

const ENVIRONMENTS: Array<{ format: string; location: string; tone: string }> = [
  { format: 'Story', location: 'Outdoors + walk / talk', tone: 'Relatable' },
  { format: 'Belief', location: 'Casual hallway / lounge', tone: 'Authentic' },
  { format: 'Teach', location: 'Desk / gym', tone: 'Authoritative' },
  { format: 'Show', location: 'Whiteboard / top down', tone: 'Demonstrative' },
];

// ─── Hooks (10 templates) ───────────────────────────────────────────────

const HOOKS: Array<{ name: string; pattern: string; example: string }> = [
  { name: 'Call out', pattern: 'If you ___. Here\'s ___.', example: "If you're sick of being called 'just a PT', you're gonna wanna listen up." },
  { name: 'Result and/or proof', pattern: 'I ___. Here\'s ___.', example: "I built a $5M fitness business without going viral. Here's what I actually did." },
  { name: 'Invert belief', pattern: '(Number)% (avatar) think X. But (fact / stat / figure / contrarian experience).', example: 'Most coaches think they have a lead problem. And when I was a PT I thought I did too.' },
  { name: 'Binary / Triplet', pattern: 'There are two ways to (goal).', example: 'There are two ways to get leads. One caps you at 30 clients, one takes you to 300.' },
  { name: "Let's do the math", pattern: "You think / I thought X, so let's map it out.", example: "You think X. Let's do the math." },
  { name: 'Story', pattern: '', example: 'I built a client a program designed to make her quit.' },
  { name: 'Promise + constraint', pattern: 'As a PT I used to … until finally … So in the next … I\'m going to show you what I did to change it.', example: '' },
  { name: 'If I had to do it again', pattern: 'If I had to go from … to … again, I\'d do this.', example: "If I had to go from $0 to $1M as a fitness coach again, I'd do this." },
  { name: "If you're still …", pattern: "If you're doing (common practice), this is why …", example: "If you think you need more leads to grow your business, you're probably making the exact same mistake I made." },
  { name: 'There was a time I (ridiculous / ashamed thing)', pattern: '', example: 'At my first event, I made $175. Which is the exact same thing I charge $22K for now.' },
];

function ToolLink({ to, label }: { to: string; label: string }) {
  return (
    <a href={to} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-5 py-4">
      <h4 className="font-display text-[16px] font-extrabold text-white">{label}</h4>
      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
    </a>
  );
}

export default function UndeniableContentFoundation() {
  return (
    <Shell title="Foundation · Content · Undeniable" description="Pillars, formats, environments, hooks. What every piece is made from." path="/undeniablenextsteps/content/foundation">
      <PageHead
        eyebrow="Content · The foundation"
        title="The"
        accent="Foundation."
        blurb="Pillars are what you talk about. Formats are how you teach it. Environments are where you shoot it. Hooks are how you open. Every piece follows one spine: Hook > Problem > Path / Solution > Takeaway."
        backHref="/undeniablenextsteps/content"
        backLabel="Content"
      />
      <Divider />

      {/* PILLARS */}
      <Wrap>
        <Eyebrow>1 · The 4 Pillars and topics</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">What you talk about. Four pillars, five topics each.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
              <h3 className="font-display text-[16px] font-extrabold text-white mb-3">{p.name}</h3>
              <ul className="space-y-1.5">
                {p.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-200 text-[13px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* FORMATS */}
      <Wrap>
        <Eyebrow>2 · The 4 Formats</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">How you educate. Two types: Share (Story, Belief) and Teach (Teach, Show).</p>
        <div className="space-y-4">
          {FORMATS.map((f) => (
            <div key={f.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <h3 className="font-display text-[16px] font-extrabold text-white">{f.name}</h3>
                <span className="text-zinc-400 text-[12px]">{f.type}</span>
              </div>
              <ol className="space-y-1.5">
                {f.structure.map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="font-display text-blue-400 text-[11px] font-extrabold mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-200 text-[13px] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* ENVIRONMENTS */}
      <Wrap>
        <Eyebrow>3 · The 4 Environments</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">Where each format gets shot, and the tone it carries.</p>
        <div className="rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-3 gap-0 px-5 py-3 bg-elevated/40 border-b border-zinc-800">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Format</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Location</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Tone</p>
          </div>
          {ENVIRONMENTS.map((e, i) => (
            <div key={e.format} className={`grid grid-cols-3 gap-0 px-5 py-4 ${i < ENVIRONMENTS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
              <p className="font-display font-extrabold text-blue-400 text-[13px] md:text-[14px]">{e.format}</p>
              <p className="text-zinc-200 text-[13px] md:text-[14px]">{e.location}</p>
              <p className="text-zinc-300 text-[13px] md:text-[14px]">{e.tone}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* HOOKS */}
      <Wrap>
        <Eyebrow>4 · 10 Hook templates to start</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">How you open. Simple references to start. The full bank has around 90.</p>
        <div className="space-y-3">
          {HOOKS.map((h, i) => (
            <div key={h.name} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display text-blue-400 text-[12px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="font-display text-[15px] font-extrabold text-white">{h.name}</h4>
              </div>
              {h.pattern && <p className="text-zinc-300 text-[13px] leading-relaxed mb-2">{h.pattern}</p>}
              {h.example && <p className="text-zinc-400 text-[13px] leading-relaxed italic">"{h.example}"</p>}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <ToolLink to="/undeniablenextsteps/hooks" label="The full Hook Bank" />
        </div>
      </Wrap>
    </Shell>
  );
}
