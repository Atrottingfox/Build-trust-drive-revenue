import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Plus, Trash2 } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider, Tabs } from '../components/undeniable/Bits';

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

// ─── 4 Buckets aligned with the 4 Formats from /content ────────────────

type Bucket = {
  id: string;
  name: string;
  type: string;
  env: string;
  tone: string;
  structure: string[];
  hooks: string[];
};

const BUCKETS: Bucket[] = [
  {
    id: 'story',
    name: 'Story',
    type: 'Teach through experience',
    env: 'Outdoors. Walk / talk.',
    tone: 'Relatable',
    structure: [
      'Hook (moment)',
      'What happened (scene / situation)',
      'Feeling / meaning / cost (pain / money / emotion)',
      'Realisation / lesson / shift',
      'Takeaway one liner + tool (implementable)',
    ],
    hooks: [
      'I built a $5M fitness business without going viral. Here\'s everything I did.',
      'I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.',
      'When I was at my worst, we were at our best. We grew 600% and I was ready to walk away from all of it.',
      'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
      'Three years ago I ran a seminar for 16 people and made $175. I teach the same thing now for 22 grand.',
      'I spent 750 grand on a gym no one is allowed to train at. Here\'s why that\'s the smartest thing I\'ve done.',
      'Come test me in person. You can fake a script. You can\'t freeball in a room.',
      'Everyone tells you to go viral. I did the opposite and made more money.',
    ],
  },
  {
    id: 'belief',
    name: 'Belief',
    type: 'Teach through perspective',
    env: 'Casual hallway / lounge.',
    tone: 'Authentic',
    structure: [
      'Hook (contrarian / misconception / bold statement / binary / old vs new / relatable pain)',
      'State common belief (and why it exists)',
      'State your belief (and remove self blame)',
      'Explanation plus one proof / example',
      'Takeaway',
    ],
    hooks: [
      'Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.',
      'Income buys you impact. You\'re not changing the world coaching 25 people.',
      'No one cares about the influencer\'s challenge until people buy it. Then you care. Let\'s talk about why.',
      'Manual effort will reign supreme. You can\'t cheat it, and that\'s good news for you.',
      'If it triggers you, it\'s probably true.',
      'Your competitors are setting your prices, not your clients. That\'s why you\'re underpaid.',
      'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
      'Old way: loom check ins. New way: written check ins anyone can run. Here\'s the difference in your week.',
      'There are two ways to run a business at 80 clients. One of them is killing you.',
      'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it for you.',
      'You feel like you\'re treading water and working harder to stay in the same place. There\'s a reason.',
      'You\'re not lazy and you\'re not stupid. You\'re stuck in the part of the business no one warned you about.',
      'If you\'re sick of being called just a PT, even though you\'re running over 10K, I finally worked out why.',
      'You\'re not just a PT. But your business is built like you are.',
      'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
      'Stop learning marketing and just copy this.',
      'Stop running pay in-full offers. They look great in screenshots and they\'re killing your cash flow.',
      'Stop trying to choose your niche. Your content already chose it for you.',
      'Imagine if you never lost a client. You\'d stop selling and start choosing.',
      'Imagine if you didn\'t have to compromise. 50 clients on stage and a business that doesn\'t suck to own.',
    ],
  },
  {
    id: 'teach',
    name: 'Teach',
    type: 'Teach through explanation',
    env: 'Desk / gym.',
    tone: 'Authoritative',
    structure: [
      'Hook (If you / If I. Problem, pain, want, desire.)',
      'Core issue / problem',
      '3 to 5 steps (with a tool or a "don\'t do this")',
      'One core takeaway line',
    ],
    hooks: [
      'There are two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.',
      'Two paths to grow a coaching business. One caps you. One scales forever.',
      'You either wait for everyone else to tell you what to do, or you test everything. Which one are you?',
      'Doers and waiters. Your content is training one of them to come to you.',
      'In 60 seconds I\'ll show you how to stop losing clients in the first 90 days.',
      'Give me five minutes and I\'ll find the one number that\'s capping your business.',
      'By the end of this video you\'ll know exactly what your next step is. Not three. One.',
      'In two minutes I\'ll show you the difference between a 30-client business and a 300-client one.',
      'You\'ve been burned before. Good. Stay sceptical and watch this anyway.',
      'Don\'t trust me. Check the receipts. Then come back.',
      'If you\'ve paid a mentor who\'d never done it themselves, this one\'s for you.',
      'Come at this with your bullshit meter on high. I\'ll wait.',
      'If you think you need more leads to grow your business, you\'re probably making the exact same mistake I made.',
      'Every PT only has 12 to 16 weeks with a client. Here\'s how we doubled that.',
    ],
  },
  {
    id: 'show',
    name: 'Show',
    type: 'Teach through demonstration',
    env: 'Whiteboard / top down.',
    tone: 'Demonstrative',
    structure: [
      'Hook',
      'State the problem in their words',
      'Draw the model, do the math, or show',
      'Say what that means for them. One liner.',
      'Takeaway / next step',
    ],
    hooks: [
      'Online coaches think they work a lot. Let\'s actually do the math.',
      'You\'ve got 100 clients and think you\'re flat out. You\'re working a 12-hour week and don\'t know it.',
      'Everyone\'s the show pony. Let me be the logical one for a second and just do the numbers.',
      'I\'m going to do the math on your business and you\'re not going to like it.',
      'A 20-minute check in doesn\'t make you a better coach. It makes you a slower one.',
      'My client lost $800,000 and never even knew it.',
      'I did the math on his business live and he went white in the face.',
      'You\'re losing more money in your business right now than you\'re making. Let me show you where.',
      'There\'s a number in your business you\'ve never calculated, and it\'s costing you six figures.',
      'I made an extra $120,000 that year and thought I\'d won. I\'d actually left $600,000 on the table.',
      'Two clients leave a month and you think that\'s fine. Let me show you what it actually costs you.',
      'It feels like two steps forward and two steps back every month. That\'s not a feeling, that\'s a number.',
      'Every month you walk into the next one with less oxygen than before. Here\'s why.',
      'You don\'t have a lead problem. You have a churn problem. You just haven\'t done the math.',
      'Anything above 3% churn means 60% of your business is gone every year.',
      'You\'re filling a bucket with holes in it and wondering why it never gets full.',
      'Stop chasing more leads. Plug the leak first.',
      'You\'re doing 80K months and keeping nothing. Let me show you why.',
      'Revenue resets to zero on the first of the month and you start panicking again. That\'s not a money problem.',
      'The coach doing 40K months is keeping more than the one doing 80K. Here\'s how.',
    ],
  },
];

// ─── Persistence ────────────────────────────────────────────────────────

type Hook = { id: string; text: string; starred: boolean };

const KEY = (formatId: string) => `shoot-hooks-v1:${formatId}`;

function loadHooks(b: Bucket): Hook[] {
  try {
    const raw = localStorage.getItem(KEY(b.id));
    if (raw) {
      const parsed = JSON.parse(raw) as Hook[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch { /* noop */ }
  return b.hooks.map((text, i) => ({ id: `${b.id}-${i}`, text, starred: false }));
}

function saveHooks(formatId: string, hooks: Hook[]) {
  try { localStorage.setItem(KEY(formatId), JSON.stringify(hooks)); } catch { /* noop */ }
}

// ─── Auto growing textarea ──────────────────────────────────────────────

function AutoTextarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const resize = () => {
    const el = ref.current;
    if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }
  };
  useEffect(resize, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onInput={resize}
      className="w-full bg-transparent text-zinc-200 text-[14px] leading-relaxed resize-none outline-none focus:text-white placeholder:text-zinc-600"
    />
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* noop */ }
  };
  return (
    <button onClick={onClick} className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 hover:text-blue-400 transition-colors flex-shrink-0">
      {copied ? '✓' : 'Copy'}
    </button>
  );
}

// ─── The board for one format ───────────────────────────────────────────

function HookBoard({ bucket }: { bucket: Bucket }) {
  const [hooks, setHooks] = useState<Hook[]>(() => loadHooks(bucket));

  // Reload when the format changes.
  useEffect(() => { setHooks(loadHooks(bucket)); }, [bucket.id]);

  const commit = (next: Hook[]) => { setHooks(next); saveHooks(bucket.id, next); };

  const toggleStar = (id: string) => commit(hooks.map((h) => h.id === id ? { ...h, starred: !h.starred } : h));
  const editText = (id: string, text: string) => commit(hooks.map((h) => h.id === id ? { ...h, text } : h));
  const remove = (id: string) => commit(hooks.filter((h) => h.id !== id));
  const add = () => commit([{ id: `${bucket.id}-c${hooks.length}-${hooks.reduce((m, h) => Math.max(m, h.text.length), 0)}-${hooks.length}`, text: '', starred: true }, ...hooks]);
  const reset = () => { try { localStorage.removeItem(KEY(bucket.id)); } catch { /* noop */ } setHooks(loadHooks(bucket)); };

  // Starred float to the top, original order otherwise.
  const ordered = [...hooks].sort((a, b) => Number(b.starred) - Number(a.starred));
  const starredCount = hooks.filter((h) => h.starred).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SubEyebrow>Hooks{starredCount > 0 ? ` · ${starredCount} starred` : ''}</SubEyebrow>
        <button onClick={add} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add a hook
        </button>
      </div>
      <p className="text-zinc-500 text-[12px] mb-5">Star the best to push them to the top. Tap any line to edit it for this shoot.</p>

      <div className="space-y-2">
        {ordered.map((h) => (
          <div key={h.id} className={`rounded-xl border px-3 py-3 flex items-start gap-3 transition-colors ${h.starred ? 'border-blue-500/40 bg-blue-500/[0.05]' : 'border-zinc-800 bg-elevated/40'}`}>
            <button onClick={() => toggleStar(h.id)} className="flex-shrink-0 mt-0.5" aria-label={h.starred ? 'Unstar' : 'Star'}>
              <Star className={`w-4 h-4 transition-colors ${h.starred ? 'fill-blue-400 text-blue-400' : 'text-zinc-600 hover:text-zinc-400'}`} />
            </button>
            <div className="flex-1 min-w-0">
              <AutoTextarea value={h.text} onChange={(v) => editText(h.id, v)} placeholder="Write your hook…" />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <CopyBtn text={h.text} />
              <button onClick={() => remove(h.id)} className="text-zinc-600 hover:text-red-400 transition-colors" aria-label="Delete">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-5">
        <a href="/undeniablenextsteps/hooks" className="text-blue-400 hover:text-blue-300 text-[13px] inline-flex items-center gap-1">
          Open the full Hook Bank <ArrowRight className="w-3 h-3" />
        </a>
        <button onClick={reset} className="text-zinc-600 hover:text-zinc-400 text-[12px] transition-colors">Reset to defaults</button>
      </div>
    </div>
  );
}

export default function UndeniableShootCard() {
  const [active, setActive] = useState('story');
  const b = BUCKETS.find((x) => x.id === active) || BUCKETS[0];

  return (
    <Shell title="Next Shoot · Undeniable" description="The on the day shoot tool. Pick a format, prioritise your best hooks, edit them for the shoot." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Working tool"
        title="Next"
        accent="Shoot."
        blurb="Pick what you're shooting. Star your best hooks to push them to the top, edit any of them for this shoot, add your own. It saves as you go."
        backHref="/undeniablenextsteps/content/short-form"
        backLabel="Short form"
      />
      <Divider />

      <Wrap>
        <Tabs tabs={BUCKETS.map((x) => ({ id: x.id, label: x.name }))} active={active} onChange={setActive} />

        {/* Context line for the chosen format */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-9 text-[13px]">
          <span className="text-zinc-300"><span className="text-zinc-600 uppercase tracking-widest text-[10px] font-semibold mr-2">Type</span>{b.type}</span>
          <span className="text-zinc-300"><span className="text-zinc-600 uppercase tracking-widest text-[10px] font-semibold mr-2">Where</span>{b.env}</span>
          <span className="text-zinc-300"><span className="text-zinc-600 uppercase tracking-widest text-[10px] font-semibold mr-2">Tone</span>{b.tone}</span>
        </div>

        {/* Structure */}
        <div className="mb-9">
          <SubEyebrow>Structure to follow</SubEyebrow>
          <ol className="space-y-1.5">
            {b.structure.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="font-display text-blue-400 text-[11px] font-extrabold mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-zinc-200 text-[14px] leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Editable, prioritisable hooks */}
        <HookBoard key={active} bucket={b} />
      </Wrap>
    </Shell>
  );
}
