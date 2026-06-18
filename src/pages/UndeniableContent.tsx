import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Shell, PageHead, Wrap, Divider } from '../components/undeniable/Bits';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-widest mb-5">{children}</p>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

// ─── TOC sections ───────────────────────────────────────────────────────

const TOC: Array<{ id: string; label: string }> = [
  { id: 'formula', label: 'Master formula' },
  { id: 'pillars', label: '4 Pillars and topics' },
  { id: 'formats', label: '4 Formats' },
  { id: 'environments', label: '4 Environments' },
  { id: 'hooks', label: '10 Hooks' },
  { id: 'short-form', label: 'Short-form' },
  { id: 'long-form', label: 'Long-form' },
  { id: 'data', label: 'Data collection' },
];

// ─── Pillars + topics ───────────────────────────────────────────────────

const PILLARS: Array<{ name: string; topics: string[] }> = [
  {
    name: 'Mindset / Identity',
    topics: [
      "'Just a PT' > business owner",
      'Hard and boring work',
      'Identity leveling up',
      'Impact / mission / duty',
    ],
  },
  {
    name: 'Leads / Attract',
    topics: [
      'Niche (who you help)',
      'Message (what you say)',
      'Content',
      'Proof (authority / case studies)',
      'Lead Magnets / funnels',
    ],
  },
  {
    name: 'Sales / Conversion',
    topics: [
      'Offer design',
      'Pricing',
      'Show rate',
      'Close rate',
      'Renewals',
    ],
  },
  {
    name: 'Scale / Delivery',
    topics: [
      'Churn / retention',
      'LTV',
      'Check ins',
      'Hiring / staff',
      'Systems / scale',
    ],
  },
];

// ─── Formats ────────────────────────────────────────────────────────────

const FORMATS: Array<{ name: string; type: string; structure: string[] }> = [
  {
    name: 'Story',
    type: 'Teach through experience',
    structure: [
      'Hook (moment)',
      'What happened (scene / situation)',
      'Feeling / meaning / cost (pain / money / emotion)',
      'Realisation / lesson / shift',
      'Takeaway one liner + tool (implementable)',
    ],
  },
  {
    name: 'Belief',
    type: 'Teach through perspective',
    structure: [
      'Hook (contrarian / misconception / bold statement / binary / old vs new / relatable pain)',
      'State common belief (and why it exists)',
      'State your belief (and remove self blame)',
      'Explanation plus one proof / example',
      'Takeaway',
    ],
  },
  {
    name: 'Teach',
    type: 'Teach through explanation',
    structure: [
      'Hook (If you / If I. Problem, pain, want, desire.)',
      'Core issue / problem',
      '3 to 5 steps (with a tool or a "don\'t do this")',
      'One core takeaway line',
    ],
  },
  {
    name: 'Show',
    type: 'Teach through demonstration',
    structure: [
      'Hook',
      'State the problem in their words',
      'Draw the model, do the math, or show',
      'Say what that means for them. One liner.',
      'Takeaway / next step',
    ],
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
  {
    name: 'Call out',
    pattern: 'If you ___. Here\'s ___.',
    example: "If you're sick of being called 'just a PT', you're gonna wanna listen up.",
  },
  {
    name: 'Result and/or proof',
    pattern: 'I ___. Here\'s ___.',
    example: "I built a $5M fitness business without going viral. Here's what I actually did.",
  },
  {
    name: 'Invert belief',
    pattern: '(Number)% (avatar) think X. But (fact / stat / figure / contrarian experience).',
    example: 'Most coaches think they have a lead problem. And when I was a PT I thought I did too.',
  },
  {
    name: 'Binary / Triplet',
    pattern: 'There are two ways to (goal).',
    example: 'There are two ways to get leads. One caps you at 30 clients, one takes you to 300.',
  },
  {
    name: "Let's do the math",
    pattern: "You think / I thought X, so let's map it out.",
    example: "You think X. Let's do the math.",
  },
  {
    name: 'Story',
    pattern: 'I _____.',
    example: 'I built a client a program designed to make her quit.',
  },
  {
    name: 'Promise + constraint',
    pattern: 'As a PT I used to … until finally … So in the next … I\'m going to show you what I did to change it.',
    example: '',
  },
  {
    name: 'If I had to do it again',
    pattern: 'If I had to go from … to … again, I\'d do this.',
    example: "If I had to go from $0 to $1M as a fitness coach again, I'd do this.",
  },
  {
    name: "If you're still …",
    pattern: "If you're doing (common practice), this is why …",
    example: "If you think you need more leads to grow your business, you're probably making the exact same mistake I made.",
  },
  {
    name: 'There was a time I (ridiculous / ashamed thing)',
    pattern: '',
    example: 'At my first event, I made $175. Which is the exact same thing I charge $22K for now.',
  },
];

// ─── Video pillars (YouTube working titles) ─────────────────────────────

type Pillar = {
  n: string;
  pillar: string;
  label: string;
  question: string;
  titles: string[];
};

const VIDEO_PILLARS: Pillar[] = [
  {
    n: 'Week 1',
    pillar: 'Character',
    label: 'Character Development',
    question: 'Why should I listen to this person, specifically?',
    titles: [
      'How I Built a $XM Online Fitness Empire in 11 Years (without going viral)',
      'How I Made $XM Online Without Going Viral',
      'As a PT I Made $X. This Is Everything it cost me to get there',
    ],
  },
  {
    n: 'Week 2',
    pillar: 'Authority',
    label: 'The Positioning Play. Full Playbook.',
    question: "Does this person actually know what they're talking about at depth?",
    titles: [
      'F*ck It, This Is How to Build a $1M+ Online Fitness Business',
      "\"As an Online Fitness Coach, How Can I Make $1M?\" Just Do This.",
      'How I Made $XM Online Coaching Without Going Viral',
    ],
  },
  {
    n: 'Week 3',
    pillar: 'Niche Authority',
    label: 'Tactical Operator Video. The VSL.',
    question: 'Does this apply specifically to me?',
    titles: [
      "If I Wanted to Make $1M as a Fitness Coach Again, I'd Do This",
      'How to Become a $1M Fitness Coach',
      'How to Make Your First $1M as a Fitness Coach (Step by Step)',
      'How to Make Your First $1M in Fitness (Full Walkthrough)',
    ],
  },
  {
    n: 'Week 4',
    pillar: 'Practical',
    label: 'Signature Framework. The unique mechanism.',
    question: "Do I trust this person's specific frameworks?",
    titles: [
      'How I Made $X/Month as a PT (Without …)',
      'Stop "Learning Marketing" and Just Copy This',
    ],
  },
  {
    n: 'Week 5',
    pillar: 'Implementable',
    label: 'Accessible Insights.',
    question: "Do they have insights I can't find anywhere else?",
    titles: [
      'Stop "Learning Marketing" and Just Copy This (Complete Plan)',
      "If I Wanted to Add $10,000/Month as a PT, I'd Just Do This",
    ],
  },
  {
    n: 'Week 6',
    pillar: 'Masterclass',
    label: 'Step by Step Walkthrough.',
    question: 'Is there a complete system, or just tactics?',
    titles: [
      'How to Get So Good at Marketing You Never Have to Sell Again',
      'How to Get So Many Referrals You Never Need to Run an Ad Again',
      "Every Fitness Creator Gets Stuck at the Same Point. If That's You, Do This.",
      'How to Add $10,000/Month as a PT (The Exact System)',
    ],
  },
];

function ToolLink({ to, label }: { to: string; label: string }) {
  return (
    <a href={to} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-5 py-4">
      <h4 className="font-display text-[16px] font-extrabold text-white">{label}</h4>
      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
    </a>
  );
}

export default function UndeniableContent() {
  return (
    <Shell title="Content · Undeniable" description="Master formula, pillars, formats, environments, hooks, cadence, calendar, data." path="/undeniablenextsteps/content">
      <PageHead
        eyebrow="Working page"
        title=""
        accent="Content."
        blurb=""
      />
      <Divider />

      {/* TOC */}
      <Wrap>
        <Eyebrow>What\'s on this page</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TOC.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-elevated/40 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-colors px-4 py-3">
              <span className="text-zinc-200 text-[13px] font-medium group-hover:text-white">{s.label}</span>
              <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" />
            </a>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* MASTER FORMULA */}
      <Wrap id="formula">
        <Eyebrow>Master formula</Eyebrow>
        <p className="text-zinc-200 text-[16px] md:text-[18px] leading-relaxed mb-2">Every piece is Hook &gt; Problem &gt; Path / Solution &gt; Takeaway.</p>
        <p className="text-zinc-400 text-[14px] leading-relaxed">We\'re always educating. We\'ve just got 4 methods to do it. Broken into two types: Share or Teach.</p>
      </Wrap>

      <Divider />

      {/* PILLARS */}
      <Wrap id="pillars">
        <Eyebrow>4 Pillars and topics</Eyebrow>
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
      <Wrap id="formats">
        <Eyebrow>4 Formats</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">The 4 ways you educate. Two types: Share (Story, Belief) and Teach (Teach, Show).</p>
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
      <Wrap id="environments">
        <Eyebrow>4 Environments</Eyebrow>
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
      <Wrap id="hooks">
        <Eyebrow>10 Hooks. Simple reference to start.</Eyebrow>
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

      <Divider />

      {/* SHORT-FORM */}
      <Wrap id="short-form">
        <Eyebrow>Short-form</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">Hook testing weeks 1-2. Optimisation weeks 3-4. Topic and format analysis weeks 5-6. Posting calendar follows.</p>

        {/* Weeks 1-2 */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-4">
          <SubEyebrow>Weeks 1-2. Hook testing.</SubEyebrow>
          <p className="text-zinc-200 text-[14px] mb-3">Total: 14 Posts (7 Share, 7 Teach).</p>
          <ul className="space-y-1.5 mb-2">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Monday: Shoot 8 across 2 locations. Select top 7.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Wednesday: Shoot 8 across other 2 locations. Select top 7.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Use a mix of hook templates to test.</span></li>
          </ul>
        </div>

        {/* End of week 2 */}
        <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 mb-4">
          <SubEyebrow>End of week 2. Review.</SubEyebrow>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Identify pattern of top hooks in each pillar. What do the winners have in common? Take patterns, build principles.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Keep top 8 to test hook structure across different topic.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Add 4 similar hook styles to test.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Add 12 completely new hooks to test.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Remove bottom 10.</span></li>
          </ul>
        </div>

        {/* Weeks 3-4 */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-4">
          <SubEyebrow>Weeks 3-4. Hook optimisation.</SubEyebrow>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Monday: Shoot 8 across 2 similar locations. Half new hooks, half top / similar.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Wednesday: Shoot 8 across 2 similar locations. Half new hooks, half top / similar (2 per location).</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Friday: Shoot longform.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Shorts from longs: 3 short form videos. One promotes toolkit. One promotes lead magnet. One promotes video. Select the top 2 to keep in the bank.</span></li>
          </ul>
        </div>

        {/* End of week 4 */}
        <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 mb-4">
          <SubEyebrow>End of week 4. Review.</SubEyebrow>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Identify pattern of top hooks in each pillar.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Keep top 8 to test hook structure across different topic.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Add 4 similar hook styles to test.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Add 12 completely new hooks to test.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Remove bottom 10.</span></li>
          </ul>
        </div>

        {/* Outcome of 4 weeks */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 mb-4">
          <SubEyebrow>Outcome of 4 weeks.</SubEyebrow>
          <div className="space-y-3">
            <div>
              <p className="text-white text-[13px] font-semibold">Hooks</p>
              <p className="text-zinc-300 text-[13px]">70% winning and adjacent patterns for the rest of 90 days.</p>
            </div>
            <div>
              <p className="text-white text-[13px] font-semibold">Environments</p>
              <p className="text-zinc-300 text-[13px]">Which environments are viable for consistent shooting.</p>
            </div>
            <div>
              <p className="text-white text-[13px] font-semibold">Cadence</p>
              <p className="text-zinc-300 text-[13px]">When we increase volume, what will break first and how can we hire for that now.</p>
            </div>
            <div>
              <p className="text-white text-[13px] font-semibold">Topics</p>
              <p className="text-zinc-300 text-[13px]">Which topics clearly get the most engagement regardless of hook.</p>
            </div>
            <div>
              <p className="text-white text-[13px] font-semibold">Volume of shoot</p>
              <p className="text-zinc-300 text-[13px]">When is the optimal throughput per week. Longer, deeper sessions, or more, shorter sessions.</p>
            </div>
          </div>
          <p className="text-zinc-400 text-[12px] italic mt-4">We\'re not looking to base everything from templates. These principles give us enough data to build from.</p>
        </div>

        {/* Decisions after 4 weeks */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-5 mb-4">
          <SubEyebrow>Decisions after 4 weeks.</SubEyebrow>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-amber-300 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Do we want to increase to 21 posts per week?</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-amber-300 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Do we need extra editing capacity?</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-amber-300 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Do we want to add 1-2 podcasts per month?</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-amber-300 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Do we want to test new formats / hooks?</span></li>
          </ul>
          <p className="text-zinc-400 text-[12px] italic mt-4">With the system as we\'ve just cleaned it up, you\'ll also know which environments are easiest to shoot in consistently, how much throughput a Mon / Wed weekly cycle can really handle, and where the bottleneck is if you push volume (editing vs scripting vs recording).</p>
        </div>

        {/* Weeks 5-6 */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.04] p-5 mb-8">
          <SubEyebrow>Weeks 5-6. Topic / format analysis (not a test, just an observation).</SubEyebrow>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Each week, select 1-2 high performing topics from the past month (e.g. offer design, churn, lead magnets).</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">For each topic, do two formats in that week: Story vs Belief, or Show vs Teach.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Tag those pairs in the log.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">End of week 6: see which format performs best per topic. Make a simple rule (e.g. for churn we show, for niche we tell a story).</span></li>
          </ul>
        </div>

        {/* Posting calendar */}
        <div>
          <SubEyebrow>Posting calendar. First 4 weeks.</SubEyebrow>
          <div className="space-y-2">
            {[
              { wk: 'Week 1', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: '' },
              { wk: 'Week 2', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: '' },
              { wk: 'Week 3', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: '' },
              { wk: 'Week 4', shorts: '14 new (Teach + Share). Plus carousels, workshop reels, etc.', longs: 'Pillar video no. 1 (Character).' },
            ].map((w) => (
              <div key={w.wk} className="rounded-xl border border-zinc-800 bg-elevated/30 p-5">
                <p className="font-display text-white text-[14px] font-extrabold mb-2">{w.wk}</p>
                <p className="text-zinc-300 text-[13px] mb-1"><span className="text-zinc-500 text-[11px] uppercase tracking-widest font-semibold mr-2">Shorts</span>{w.shorts}</p>
                {w.longs && <p className="text-zinc-300 text-[13px]"><span className="text-blue-300 text-[11px] uppercase tracking-widest font-semibold mr-2">Longs</span>{w.longs}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <ToolLink to="/undeniablenextsteps/shoot-card" label="The Next Shoot tool" />
        </div>
      </Wrap>

      <Divider />

      {/* LONG-FORM */}
      <Wrap id="long-form">
        <Eyebrow>Long-form</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">One long-form per week. Six pillars in rotation. Working titles below.</p>
        <div className="space-y-4">
          {VIDEO_PILLARS.map((p) => (
            <div key={p.n} className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5 md:p-6">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="font-display text-[14px] font-extrabold text-blue-400 leading-none">{p.n}</span>
                <h4 className="font-display text-[16px] md:text-[18px] font-extrabold text-white">{p.pillar}</h4>
              </div>
              <p className="text-zinc-300 text-[13px] font-medium mb-1">{p.label}</p>
              <p className="text-zinc-500 text-[12px] italic mb-4">{p.question}</p>
              <ul className="space-y-1.5">
                {p.titles.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-200 text-[14px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* DATA COLLECTION */}
      <Wrap id="data">
        <Eyebrow>Data collection</Eyebrow>
        <p className="text-zinc-400 text-[14px] mb-8">Log every piece. Short-form at 24 hours plus 7 days. Long-form at 48 hours plus 7 days.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Shortform. 24 hours after posting.</SubEyebrow>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Pillar + topic</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Format (Story / Belief / Teach / Show)</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Hook</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Views, Saves, Shares, Comments</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">CTA (if applicable)</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Shortform. 7 days after posting.</SubEyebrow>
            <p className="text-zinc-200 text-[13px]">Update log in new section on same post with final numbers.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Longform. At 48 hours.</SubEyebrow>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Title and hook</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Split test data. Log both thumb and title of each test. Keep winner, test 2 additional titles.</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Pillar / topic</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Current views</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Avg view duration / % watched</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Clicks to description CTAs</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Longform. Updated at 7 days.</SubEyebrow>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Views</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Avg view duration / % watched</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Clicks to assets</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Apps you can reasonably tie back to people who watched</span></li>
              <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" /><span className="text-zinc-200 text-[13px]">Split test data. Keep winner, split test two more additional thumbnails.</span></li>
            </ul>
          </div>
        </div>
      </Wrap>
    </Shell>
  );
}
