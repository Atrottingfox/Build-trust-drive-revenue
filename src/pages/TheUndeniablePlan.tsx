import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { Shell, Divider, Eyebrow } from '../components/undeniable/Bits';

// One tickable task. Progress saves on the device.
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

const Ref = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-zinc-800 bg-elevated px-5 py-4 mt-5">
    <p className="text-zinc-400 font-semibold text-[12px] uppercase tracking-widest mb-2">{label}</p>
    <div className="text-zinc-300 text-[14px] leading-relaxed space-y-1.5">{children}</div>
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
      <p className="text-zinc-400 text-[16px] leading-relaxed mb-9">{why}</p>
      {children}
    </div>
  </section>
);

export default function TheUndeniablePlan() {
  return (
    <Shell title="The Undeniable Plan" description="Where we're going, what we do each phase, and who does what." path="/theundeniableplan">
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
            12 weeks. Three phases. Build trust, then put money behind what works.
          </p>
        </div>
      </section>

      <Divider />

      <Phase
        tag="Phase 1"
        window="First 4 weeks"
        title="Calibrate."
        why="Get the foundations live and find out what actually lands, before we spend a cent on ads. We're testing, not perfecting."
      >
        <Who name="Rhys" prefix="p1r" tasks={[
          'Get the first 2 pillar videos up: the Character video, then Rome.',
          'Run the first one-week sprints of short form: new hooks in different formats. See what lands.',
          'Daily voice memo at the end of each day.',
        ]} />
        <Who name="Corey" prefix="p1c" tasks={[
          'Get the simple lead magnets live, and split test which ones hit.',
          'Get on prospect and client calls. Ask the 7 questions. Level up.',
          'Lead the Monday meeting by week 4.',
        ]} />
        <Who name="Sean" prefix="p1s" tasks={[
          'Weekly strategy call with Corey.',
        ]} />

        <Ref label="The 5 lead magnets (PS bridge in each)">
          <p>1. The Six Step Profit Path &nbsp; 2. The Sales Success System &nbsp; 3. The Constraint Diagnostic &nbsp; 4. The MACHINE Framework &nbsp; 5. The Churn Calculator</p>
          <p className="text-zinc-400">PS bridge: "If you want to take this further: 1. Watch the deep-dive on YouTube. 2. Join the next workshop."</p>
        </Ref>
        <Ref label="Corey's 7 questions (on every call)">
          <p>1. Before working with Rhys, what was the day to day in your business like?</p>
          <p>2. What stressed you out the most back then?</p>
          <p>3. What did you honestly think about the industry?</p>
          <p>4. What made this so important to you?</p>
          <p>5. Right now, what are the top 2 to 3 things you still want to learn about growing your coaching business?</p>
          <p>6. If Rhys made a 10 video series just for you, what would you want him to talk about?</p>
          <p>7. What's one thing in the online coaching and content space you wish someone would finally be honest about?</p>
        </Ref>
        <Ref label="Daily capture (end of day voice memo)">
          <p>What did I teach? · What did I learn? · What problem did I solve? · What would I do differently? · What's a thought I can't get out of my head?</p>
        </Ref>
      </Phase>

      <Divider />

      <Phase
        tag="Phase 2"
        window="Next 4 weeks"
        title="Distribute."
        why="Now we know what works. Turn on ads and put money behind the winners."
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

        <Ref label="The 4 ad buckets">
          <p><span className="text-white font-medium">Status</span> — Alex, Brandon, Luke, Gabe. Borrowed authority, top of funnel.</p>
          <p><span className="text-white font-medium">Q&A</span> — workshop room: name, revenue, problem, what happens if I don't solve it.</p>
          <p><span className="text-white font-medium">Asset</span> — straight to the 5 lead magnets.</p>
          <p><span className="text-white font-medium">Education</span> — specific bottlenecks (hiring, churn, pricing).</p>
        </Ref>
      </Phase>

      <Divider />

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

        <Ref label="VSL structure">
          <p>Hook + promise + length → proof anchor (Sabine: 15K → 80K + the math) → the path → the mechanism (the Authority Engine) → case studies → the invitation (workshop).</p>
        </Ref>
        <Ref label="Weekly scorecard">
          <p>Per piece: hook, environment, format, watch time, saves, shares, comments, ICP-tick rate on commenters.</p>
          <p>Workshop question: "How long have you known about Rhys?" — track if under-3-month answers go up.</p>
          <p>The number that matters: qualified booked calls from content.</p>
        </Ref>
        <Ref label="Day 90 decision">
          <p><span className="text-white font-medium">Keep going</span> (advisory) · <span className="text-white font-medium">Go deeper</span> (longer build) · <span className="text-white font-medium">Stop</span> (project closes, all assets stay).</p>
        </Ref>
      </Phase>
    </Shell>
  );
}
