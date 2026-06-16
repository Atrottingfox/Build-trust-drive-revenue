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

const NAME_CLS: Record<string, string> = { Rhys: 'text-blue-400', Corey: 'text-amber-400', Sean: 'text-zinc-300' };

const Who = ({ name, prefix, tasks }: { name: string; prefix: string; tasks: string[] }) => (
  <div className="mb-7">
    <p className={`font-display text-[15px] font-extrabold uppercase tracking-wider mb-1 ${NAME_CLS[name]}`}>{name}</p>
    {tasks.map((t, i) => <Task key={i} id={`${prefix}-${i}`}>{t}</Task>)}
  </div>
);

// Click to expand for the detail.
function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-zinc-800/80">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-3.5 text-left group">
        <span className="text-zinc-200 text-[15px] font-medium group-hover:text-white transition-colors">{title}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 -mt-0.5 text-zinc-300 text-[14px] leading-relaxed space-y-2">{children}</div>}
    </div>
  );
}

const Phase = ({ tag, window, title, why, children }: { tag: string; window: string; title: string; why: string; children: React.ReactNode }) => (
  <section className="py-14 md:py-16">
    <div className="max-w-2xl mx-auto px-6 lg:px-8">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-display text-[14px] font-extrabold text-blue-400 uppercase tracking-wider">{tag}</span>
        <span className="text-zinc-400 text-[13px]">{window}</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.08] mb-4">{title}</h2>
      <p className="text-zinc-400 text-[16px] leading-relaxed mb-9">{why}</p>
      {children}
    </div>
  </section>
);

const DetailHead = () => (
  <p className="text-zinc-500 text-[12px] uppercase tracking-widest font-semibold mt-10 mb-1">The detail · tap to open</p>
);

export default function TheUndeniablePlan() {
  return (
    <Shell title="The Undeniable Plan" description="Where we're going, what we do each phase, who does what, and all the detail." path="/theundeniableplan">
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
          <p className="text-zinc-400 text-[16px] leading-relaxed">
            12 weeks. Three phases. Build trust, then put money behind what works. Tick the tasks, tap any line for the detail.
          </p>
        </div>
      </section>

      <Divider />

      {/* PHASE 1 */}
      <Phase
        tag="Phase 1"
        window="First 4 weeks"
        title="Calibrate."
        why="Get the foundations live, find out what actually lands, and get Corey up to speed. We're testing, not perfecting, and we don't spend a cent on ads yet."
      >
        <Who name="Rhys" prefix="p1r" tasks={[
          'Get the first 2 pillar videos up: the Character video, then Rome.',
          'Run the first one-week sprints of short form: new hooks in different formats. See what lands.',
          'Daily voice memo at the end of each day.',
        ]} />
        <Who name="Corey" prefix="p1c" tasks={[
          'Get the simple lead magnets live, and split test which ones hit.',
          'Get on prospect and client calls. Ask the 7 questions. Level up.',
          'Daily voice notes, sent to himself and mirrored to a doc Sean can scan.',
          'Lead the Monday meeting by week 4.',
        ]} />
        <Who name="Sean" prefix="p1s" tasks={[
          'Weekly strategy call with Corey. Install the bottleneck-thinking mindset.',
        ]} />

        <DetailHead />
        <Detail title="The short-form test (the 4 sprints)">
          <p>Four one-week sprints. Each week, a fresh batch of new hooks in different formats and environments.</p>
          <p>We're calibrating what the market responds to, not perfecting. Keep what's already working underneath, pile the new tests on top.</p>
        </Detail>
        <Detail title="The 5 lead magnets">
          <p>1. The Six Step Profit Path <span className="text-blue-400">(do not turn off — it's producing wins)</span></p>
          <p>2. The Sales Success System</p>
          <p>3. The Constraint Diagnostic (the 63-solution bottleneck buster)</p>
          <p>4. The MACHINE Framework (hiring + leadership)</p>
          <p>5. The Churn Calculator (the leaky bucket)</p>
          <p className="text-zinc-400 pt-1">PS bridge on the back of each: "If you want to take this further: 1. Watch the deep-dive on YouTube. 2. Join the next workshop."</p>
          <p className="text-zinc-400">Rule: quick wins over righteousness. Lock the magnet that's getting results, even if a "better" one exists in concept.</p>
        </Detail>
        <Detail title="The 2 pillar videos">
          <p><span className="text-white font-medium">Character</span> — 20-30 min, walking / documentary style. "From PT, My First Million." Damaging admissions, the real arc.</p>
          <p><span className="text-white font-medium">Rome</span> — 4-5 hrs, the 10K → 80K solver. The VSL-grade trust asset everyone comes back to.</p>
        </Detail>
        <Detail title="Corey on calls (the level-up)">
          <p>Sit on every coaching call this week. Join Rhys's client calls too, the actual business owners.</p>
          <p>Ask the 7 questions on each. Log every business problem mentioned and which bottleneck it maps to (clarity, visibility, authority, quality).</p>
          <p className="text-zinc-400">This is how Corey absorbs business context and learns to brief shoots from bottleneck thinking.</p>
        </Detail>
        <Detail title="Corey's 7 questions">
          <p>1. Before working with Rhys, what was the day to day in your business like?</p>
          <p>2. What stressed you out the most back then?</p>
          <p>3. What did you honestly think about the industry?</p>
          <p>4. What made this so important to you?</p>
          <p>5. Right now, what are the top 2 to 3 things you still want to learn about growing your coaching business?</p>
          <p>6. If Rhys made a 10 video series just for you, what would you want him to talk about?</p>
          <p>7. What's one thing in the online coaching and content space you wish someone would finally be honest about?</p>
        </Detail>
        <Detail title="Daily capture · Rhys (end of day voice memo)">
          <p>What did I teach? · What did I learn? · What problem did I solve? · What would I do differently? · What's a thought I can't get out of my head?</p>
        </Detail>
        <Detail title="Daily voice notes · Corey (level-up)">
          <p>What did I teach? · What did I learn? · What would I do differently? · What would I tell my younger self? · What's a thought I can't get out of my head?</p>
        </Detail>
        <Detail title="The Monday meeting">
          <p>By week 4, Corey leads it.</p>
          <p>Format: "Here's the bottleneck we're chasing. Here's the brief. Here's why."</p>
        </Detail>
        <Detail title="The studio">
          <p><span className="text-white font-medium">Dark room</span> — moody, hard-hitting motivational, podcasts, frustration.</p>
          <p><span className="text-white font-medium">Light room</span> — educational, whiteboard, talking head.</p>
          <p>Top-down camera + paper desk + iPad. Jeremy Hayne style: iPad as input, screen on the back wall.</p>
          <p>Outdoor: walking, gym, park, drive. Walking-with-doc mode (Cole Gordon style) so Rhys can shoot solo when Corey is tied up.</p>
        </Detail>
      </Phase>

      <Divider />

      {/* PHASE 2 */}
      <Phase
        tag="Phase 2"
        window="Next 4 weeks"
        title="Distribute."
        why="Now we know what works. Turn on ads and put money behind the winners. Keep the long-form rolling."
      >
        <Who name="Rhys" prefix="p2r" tasks={[
          'Keep publishing pillar videos (3 and 4).',
        ]} />
        <Who name="Corey" prefix="p2c" tasks={[
          'Run the 4 ad buckets: Status, Q&A, Asset, Education.',
          'Boost the top performers. Put paid behind what\'s working.',
          'Keep the creative fresh so spend doesn\'t cap.',
        ]} />
        <Who name="Sean" prefix="p2s" tasks={[
          'Weekly strategy call. Lock the winning formats and hooks.',
        ]} />

        <DetailHead />
        <Detail title="The 4 ad buckets">
          <p><span className="text-white font-medium">Status</span> — Alex, Brandon, Luke, Gabe, Adam-holding-Alex-photo. Borrowed authority, top of funnel.</p>
          <p><span className="text-white font-medium">Q&A</span> — workshop room footage following the framework: name, revenue, problem, what happens if I don't solve it. Gabe is the gold standard.</p>
          <p><span className="text-white font-medium">Asset</span> — straight to the 5 lead magnets. Split-test landing page vs instant lead form.</p>
          <p><span className="text-white font-medium">Education</span> — speaking to specific bottlenecks: hiring, churn, pricing.</p>
        </Detail>
        <Detail title="The ad rules">
          <p>Boost top performers. Find what works organically, put paid behind it. The Jay Wright play.</p>
          <p>One CTA in the bio. One direction. Sniper, not shotgun.</p>
          <p>Do not turn off the Six Step Profit Path lead magnet. It's producing wins.</p>
          <p>Diversify the creative or we cap at the current spend ceiling. The market isn't growing, so saturation hits fast without new angles.</p>
        </Detail>
        <Detail title="Audio strand (bolt on)">
          <p>3-5 podcast episodes a week, 5-15 min each, one hyper-specific problem per episode.</p>
          <p>Pulled from the 78-framework backlog. Mindset and framing pieces too ("vertical growth feels fun until you don't have it").</p>
        </Detail>
      </Phase>

      <Divider />

      {/* PHASE 3 */}
      <Phase
        tag="Phase 3"
        window="Last 4 weeks"
        title="Tune and decide."
        why="Sharpen what's working, build the sales video, and decide what's next."
      >
        <Who name="Rhys" prefix="p3r" tasks={[
          'Build the value-first VSL.',
          'Finish the pillar series (videos 5 and 6).',
        ]} />
        <Who name="Corey" prefix="p3c" tasks={[
          'Track the weekly scorecard.',
        ]} />
        <Who name="Sean" prefix="p3s" tasks={[
          'Lead the Day 90 decision: keep going, go deeper, or stop.',
        ]} />

        <DetailHead />
        <Detail title="The Trojan Horse VSL">
          <p>Value-first. Sits in the trust path, post-lead-magnet and pre-workshop. Sells without feeling like a sale.</p>
          <p className="text-zinc-400">Structure: hook + promise + length → proof anchor (Sabine: 15K → 80K + the math) → the path → the mechanism (the Authority Engine) → case study breakdowns → the invitation (workshop).</p>
        </Detail>
        <Detail title="The weekly scorecard">
          <p>Per piece: hook, environment, format, watch time, saves, shares, comments, ICP-tick rate on commenters.</p>
          <p>Workshop question: "How long have you known about Rhys?" — track if under-3-month answers go up.</p>
          <p>The number that matters: qualified booked calls from content.</p>
        </Detail>
        <Detail title="The Day 90 decision">
          <p><span className="text-white font-medium">Keep going</span> — move into advisory.</p>
          <p><span className="text-white font-medium">Go deeper</span> — commit to a longer build.</p>
          <p><span className="text-white font-medium">Stop</span> — project closes, all assets stay.</p>
        </Detail>
      </Phase>
    </Shell>
  );
}
