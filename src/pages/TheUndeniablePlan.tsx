import React from 'react';
import { Check as CheckIcon, ChevronDown } from 'lucide-react';
import { Shell, Divider, Eyebrow } from '../components/undeniable/Bits';

// Tickable task. Progress saves on the device.
function Task({ id, children }: { id: string; children: React.ReactNode }) {
  const key = `tup:${id}`;
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    try { setDone(localStorage.getItem(key) === '1'); } catch (e) { /* noop */ }
  }, [key]);
  const toggle = () => setDone((d) => {
    const n = !d;
    try { localStorage.setItem(key, n ? '1' : '0'); } catch (e) { /* noop */ }
    return n;
  });
  return (
    <button onClick={toggle} className="flex items-start gap-3 text-left w-full group py-1.5">
      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${done ? 'bg-blue-500 border-blue-500' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
        {done && <CheckIcon className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className={`text-[15px] leading-relaxed transition-colors ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{children}</span>
    </button>
  );
}

const OWN: Record<string, { l: string; c: string }> = {
  R: { l: 'Rhys', c: 'text-blue-400 border-blue-500/40' },
  C: { l: 'Corey', c: 'text-amber-400 border-amber-500/40' },
  S: { l: 'Sean', c: 'text-zinc-300 border-zinc-600' },
};

// Click to expand for the detail.
function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-t border-zinc-800/70 mt-1">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-2.5 text-left group">
        <span className="text-zinc-400 text-[13px] font-medium group-hover:text-zinc-200 transition-colors">{title}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-600 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 text-zinc-300 text-[14px] leading-relaxed space-y-2">{children}</div>}
    </div>
  );
}

// A numbered priority inside a phase.
const Bucket = ({ n, title, owners, children }: { n: string; title: string; owners: string; children: React.ReactNode }) => (
  <div className="mb-9">
    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
      <span className="font-display text-[22px] font-extrabold text-blue-500 tabular-nums leading-none">{n}</span>
      <h3 className="font-display text-[19px] md:text-[21px] font-extrabold text-white leading-tight">{title}</h3>
      {owners.split('').map((o) => OWN[o] && (
        <span key={o} className={`text-[10px] font-semibold uppercase tracking-wider border rounded px-1.5 py-0.5 ${OWN[o].c}`}>{OWN[o].l}</span>
      ))}
    </div>
    <div className="pl-[34px]">{children}</div>
  </div>
);

const Phase = ({ tag, window, title, why, children }: { tag: string; window: string; title: string; why: string; children: React.ReactNode }) => (
  <section className="py-14 md:py-16">
    <div className="max-w-2xl mx-auto px-6 lg:px-8">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-display text-[14px] font-extrabold text-blue-400 uppercase tracking-wider">{tag}</span>
        <span className="text-zinc-400 text-[13px]">{window}</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.08] mb-4">{title}</h2>
      <p className="text-zinc-400 text-[16px] leading-relaxed mb-10">{why}</p>
      {children}
    </div>
  </section>
);

export default function TheUndeniablePlan() {
  return (
    <Shell title="The Undeniable Plan" description="Numbered priorities per phase, with the detail one tap away." path="/theundeniableplan">
      {/* HERO */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="accent-line mb-7" />
          <Eyebrow>The plan</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            The Undeniable <span className="text-blue-500">Plan.</span>
          </h1>
          <p className="text-white text-[20px] font-semibold leading-snug mb-3">
            Goal: 2,000 health and fitness businesses scaled by 2028.
          </p>
          <p className="text-zinc-400 text-[16px] leading-relaxed mb-7">
            12 weeks. Three phases. Build trust, then put money behind what works. Work the priorities in order, tap any line for the detail.
          </p>
          <div className="rounded-xl border border-zinc-800 bg-elevated px-5 py-3.5">
            <p className="text-zinc-300 text-[14px] leading-relaxed"><span className="text-white font-semibold">Every week:</span> Sean, Corey and Rhys meet to review and brief the next week.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* PHASE 1 */}
      <Phase
        tag="Phase 1"
        window="First 4 weeks"
        title="Calibrate."
        why="Get the things we need live, find out what actually lands, and get Corey up to speed. We're testing, not perfecting, and we don't spend a cent on ads yet."
      >
        <Bucket n="1" title="Lead magnets" owners="C">
          <Task id="p1-1">Get the 5 simple lead magnets live, and split test which ones hit.</Task>
          <Detail title="The 5 magnets + the PS bridge">
            <p>1. The Six Step Profit Path <span className="text-blue-400">(do not turn off — producing wins)</span></p>
            <p>2. The Sales Success System</p>
            <p>3. The Constraint Diagnostic (63-solution bottleneck buster)</p>
            <p>4. The MACHINE Framework (hiring + leadership)</p>
            <p>5. The Churn Calculator (the leaky bucket)</p>
            <p className="text-zinc-400 pt-1">PS bridge on each: "If you want to take this further: 1. Watch the deep-dive on YouTube. 2. Join the next workshop."</p>
          </Detail>
        </Bucket>

        <Bucket n="2" title="The 2 pillar videos" owners="R">
          <Task id="p1-2">Get the first 2 pillar videos up: the Character video, then Rome.</Task>
          <Detail title="What each one is">
            <p><span className="text-white font-medium">Character</span> — 20-30 min, walking / documentary. "From PT, My First Million." Damaging admissions, the real arc.</p>
            <p><span className="text-white font-medium">Rome</span> — 4-5 hrs, the 10K → 80K solver. The VSL-grade trust asset everyone comes back to.</p>
          </Detail>
          <Detail title="The studio (where you film)">
            <p>Dark room: moody, motivational, podcasts. Light room: educational, whiteboard, talking head.</p>
            <p>Top-down camera + paper desk + iPad. Jeremy Hayne style: iPad as input, screen on the back wall.</p>
            <p>Outdoor: walking, gym, park, drive. Walking-with-doc mode so Rhys can shoot solo.</p>
          </Detail>
        </Bucket>

        <Bucket n="3" title="Short-form test" owners="R">
          <Task id="p1-3">Run the first one-week sprints: new hooks in different formats. See what lands.</Task>
          <Detail title="How the test runs">
            <p>Four one-week sprints. Each week, a fresh batch of new hooks in different formats and environments.</p>
            <p>We're calibrating what the market responds to, not perfecting. Keep what's already working underneath, pile new tests on top.</p>
          </Detail>
        </Bucket>

        <Bucket n="4" title="Corey's client calls" owners="C">
          <Task id="p1-4">Get on prospect and client calls, ask the 7 questions, log every problem to its bottleneck.</Task>
          <Detail title="The 7 questions">
            <p>1. Before working with Rhys, what was the day to day in your business like?</p>
            <p>2. What stressed you out the most back then?</p>
            <p>3. What did you honestly think about the industry?</p>
            <p>4. What made this so important to you?</p>
            <p>5. Right now, what are the top 2 to 3 things you still want to learn about growing your coaching business?</p>
            <p>6. If Rhys made a 10 video series just for you, what would you want him to talk about?</p>
            <p>7. What's one thing in the online coaching and content space you wish someone would finally be honest about?</p>
          </Detail>
          <Detail title="Why this matters">
            <p>Corey sits on coaching calls and joins Rhys's client calls (the actual business owners). It's how he absorbs business context and learns to brief shoots from bottleneck thinking.</p>
          </Detail>
        </Bucket>

        <Bucket n="5" title="Daily capture" owners="RC">
          <Task id="p1-5">End-of-day voice memo, every day.</Task>
          <Detail title="The questions">
            <p><span className="text-blue-400 font-medium">Rhys:</span> What did I teach? · What did I learn? · What problem did I solve? · What would I do differently? · What's a thought I can't get out of my head?</p>
            <p><span className="text-amber-400 font-medium">Corey:</span> What did I teach? · What did I learn? · What would I do differently? · What would I tell my younger self? · What's a thought I can't get out of my head?</p>
          </Detail>
        </Bucket>
      </Phase>

      <Divider />

      {/* PHASE 2 */}
      <Phase
        tag="Phase 2"
        window="Next 4 weeks"
        title="Distribute."
        why="Now we know what works. Turn on ads and put money behind the winners. Keep the long-form rolling."
      >
        <Bucket n="1" title="Ads" owners="C">
          <Task id="p2-1">Run the 4 ad types and boost the top performers.</Task>
          <Task id="p2-2">Keep the creative fresh so spend doesn't cap.</Task>
          <Detail title="The 4 ad types">
            <p><span className="text-white font-medium">Status</span> — Alex, Brandon, Luke, Gabe. Borrowed authority, top of funnel.</p>
            <p><span className="text-white font-medium">Q&A</span> — workshop room: name, revenue, problem, what happens if I don't solve it. Gabe is the gold standard.</p>
            <p><span className="text-white font-medium">Asset</span> — straight to the 5 lead magnets. Split-test landing page vs instant form.</p>
            <p><span className="text-white font-medium">Education</span> — specific bottlenecks: hiring, churn, pricing.</p>
          </Detail>
          <Detail title="The rules">
            <p>Boost what works organically (the Jay Wright play). One CTA in the bio, sniper not shotgun. Don't turn off the Profit Path magnet. Diversify creative or spend caps.</p>
          </Detail>
        </Bucket>

        <Bucket n="2" title="Pillar videos" owners="R">
          <Task id="p2-3">Keep publishing pillar videos (3 and 4).</Task>
        </Bucket>

        <Bucket n="3" title="Audio (bolt on)" owners="R">
          <Task id="p2-4">Start 3-5 short podcast episodes a week, one problem each.</Task>
          <Detail title="How">
            <p>5-15 min each, one hyper-specific problem per episode, pulled from the 78-framework backlog. Mindset and framing pieces too.</p>
          </Detail>
        </Bucket>
      </Phase>

      <Divider />

      {/* PHASE 3 */}
      <Phase
        tag="Phase 3"
        window="Last 4 weeks"
        title="Tune and decide."
        why="Sharpen what's working, build the sales video, and decide what's next."
      >
        <Bucket n="1" title="The VSL" owners="R">
          <Task id="p3-1">Build the value-first VSL.</Task>
          <Detail title="The structure">
            <p>Hook + promise + length → proof anchor (Sabine: 15K → 80K + the math) → the path → the mechanism (the Authority Engine) → case studies → the invitation (workshop).</p>
            <p className="text-zinc-400">Value-first. Sits post-lead-magnet, pre-workshop. Sells without feeling like a sale.</p>
          </Detail>
        </Bucket>

        <Bucket n="2" title="Finish the pillars" owners="R">
          <Task id="p3-2">Publish pillar videos 5 and 6.</Task>
        </Bucket>

        <Bucket n="3" title="The scorecard" owners="C">
          <Task id="p3-3">Track the weekly scorecard.</Task>
          <Detail title="What we track">
            <p>Per piece: hook, environment, format, watch time, saves, shares, comments, ICP-tick rate on commenters.</p>
            <p>Workshop question: "How long have you known about Rhys?" — track if under-3-month answers go up.</p>
            <p>The number that matters: qualified booked calls from content.</p>
          </Detail>
        </Bucket>

        <Bucket n="4" title="Day 90 decision" owners="S">
          <Task id="p3-4">Make the call: keep going, go deeper, or stop.</Task>
          <Detail title="The three doors">
            <p><span className="text-white font-medium">Keep going</span> — advisory. <span className="text-white font-medium">Go deeper</span> — longer build. <span className="text-white font-medium">Stop</span> — project closes, all assets stay.</p>
          </Detail>
        </Bucket>
      </Phase>
    </Shell>
  );
}
