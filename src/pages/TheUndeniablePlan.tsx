import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { Shell, Wrap, Divider, Eyebrow, H2, Note } from '../components/undeniable/Bits';

const OWNERS: Record<string, { label: string; cls: string }> = {
  R: { label: 'Rhys', cls: 'text-blue-400 border-blue-500/40' },
  C: { label: 'Corey', cls: 'text-amber-400 border-amber-500/40' },
  S: { label: 'Sean', cls: 'text-zinc-300 border-zinc-600' },
};

function Task({ id, owner, children }: { id: string; owner?: string; children: React.ReactNode }) {
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
      <span className="flex items-start gap-2 flex-wrap">
        {owner && owner.split('').map((o) => OWNERS[o] && (
          <span key={o} className={`text-[10px] font-semibold uppercase tracking-wider border rounded px-1.5 py-0.5 mt-0.5 ${OWNERS[o].cls}`}>{OWNERS[o].label}</span>
        ))}
        <span className={`text-[15px] leading-relaxed transition-colors ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{children}</span>
      </span>
    </button>
  );
}

const Ref = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-zinc-800 bg-elevated px-5 py-4 mt-6">
    <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-2">{label}</p>
    <div className="text-zinc-300 text-[14px] leading-relaxed space-y-1.5">{children}</div>
  </div>
);

const DoneWhen = ({ children }: { children: React.ReactNode }) => (
  <p className="text-zinc-400 text-[14px] leading-relaxed mb-6"><span className="text-white font-semibold">Done when:</span> {children}</p>
);

const Phase = ({ n, title, window, children }: { n: string; title: string; window: string; children: React.ReactNode }) => (
  <Wrap>
    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
      <span className="font-display text-[15px] font-extrabold text-blue-400 whitespace-nowrap uppercase tracking-wider">{n}</span>
      <span className="text-zinc-400 text-[13px]">{window}</span>
    </div>
    <H2>{title}</H2>
    {children}
  </Wrap>
);

export default function TheUndeniablePlan() {
  return (
    <Shell title="The Undeniable Plan" description="The plan. Three four-week phases. Clear tasks to tick off." path="/theundeniableplan">
      {/* HERO */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="accent-line mb-7" />
          <Eyebrow>The build</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-5">
            The Undeniable <span className="text-blue-500">Plan.</span>
          </h1>
          <p className="text-zinc-400 text-[17px] leading-relaxed mb-3">
            Twelve weeks. Three four-week phases. Tick each task as you go, your progress saves on this device.
          </p>
          <p className="text-zinc-500 text-[14px] leading-relaxed italic">
            The mission: help 2,000 online health and fitness coaches grow and scale by 2028, without working 80 hours a week as a content creator.
          </p>

          {/* DO NOW */}
          <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 px-5 py-4 mt-8">
            <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-1">Do this now</p>
            <p className="text-white text-[16px] font-medium leading-relaxed">One CTA in the bio. One direction. No matter what.</p>
          </div>

          <p className="text-zinc-500 text-[12px] mt-6">
            <span className="text-blue-400 font-semibold">Rhys</span> · <span className="text-amber-400 font-semibold">Corey</span> · <span className="text-zinc-300 font-semibold">Sean</span> — who owns each task.
          </p>
        </div>
      </section>

      <Divider />

      {/* PHASE 1 */}
      <Phase n="Phase 1" window="First four weeks" title="Calibrate and lay the foundation.">
        <DoneWhen>the 5 lead magnets are live, 5 simple videos are filmed, the first 2 pillar videos are up, the 4 test sprints are run, and Corey is on calls.</DoneWhen>
        <Task id="p1-0" owner="C">Get the 5 lead magnets live, with the PS bridge built into each.</Task>
        <Task id="p1-1" owner="R">Film 5 simple videos for the magnets. They don't need to be perfect.</Task>
        <Task id="p1-2" owner="R">Publish pillar video 1 (Character).</Task>
        <Task id="p1-3" owner="R">Publish pillar video 2 (Rome).</Task>
        <Task id="p1-4" owner="RC">Run 4 one-week sprints: new hooks in different formats. Calibrate what lands.</Task>
        <Task id="p1-5" owner="C">Get on calls with prospects and clients, ask the 7 questions, level up.</Task>
        <Task id="p1-6" owner="R">Daily capture voice memo, every day.</Task>

        <Ref label="The 5 lead magnets (PS bridge baked into each)">
          <p>1. The Six Step Profit Path</p>
          <p>2. The Sales Success System</p>
          <p>3. The Constraint Diagnostic</p>
          <p>4. The MACHINE Framework (hiring + leadership)</p>
          <p>5. The Churn Calculator</p>
          <p className="text-zinc-400 pt-1">PS bridge: "If you want to take this further: 1. Watch the deep-dive on YouTube → [link]. 2. Join the next workshop → [link]."</p>
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

        <Ref label="Cadence · first four weeks">
          <p>Weekly call: Sean + Corey (install the strategy mindset).</p>
          <p>Monday meeting: Corey leads it by week 4 ("here's the bottleneck, here's the brief, here's why").</p>
        </Ref>
      </Phase>

      <Divider />

      {/* PHASE 2 */}
      <Phase n="Phase 2" window="Next four weeks" title="Distribution.">
        <DoneWhen>ads are live behind the winners, and pillar videos 3 and 4 are up.</DoneWhen>
        <Task id="p2-0" owner="SC">Run the 4 ad buckets: Status, Q&A, Asset, Education.</Task>
        <Task id="p2-1" owner="C">Boost the top performers. Put paid behind what's already working.</Task>
        <Task id="p2-2" owner="C">Diversify the creative so spend doesn't cap.</Task>
        <Task id="p2-3" owner="R">Keep the pillar series rolling (videos 3 and 4).</Task>
        <Task id="p2-4" owner="RC">Lock the winning formats and hooks from the test.</Task>

        <Ref label="The 4 ad buckets">
          <p><span className="text-white font-medium">Status</span> — Alex, Brandon, Luke, Gabe. Borrowed authority, top of funnel.</p>
          <p><span className="text-white font-medium">Q&A</span> — workshop room footage: name, revenue, problem, what happens if I don't solve it.</p>
          <p><span className="text-white font-medium">Asset</span> — straight to the 5 lead magnets.</p>
          <p><span className="text-white font-medium">Education</span> — speaking to specific bottlenecks (hiring, churn, pricing).</p>
        </Ref>
      </Phase>

      <Divider />

      {/* PHASE 3 */}
      <Phase n="Phase 3" window="Last four weeks" title="Tune and decide.">
        <DoneWhen>the VSL is built, the pillar series is finished, and the Day 90 call is made.</DoneWhen>
        <Task id="p3-0" owner="R">Build the value-first VSL.</Task>
        <Task id="p3-1" owner="R">Finish the pillar series (videos 5 and 6).</Task>
        <Task id="p3-2" owner="SC">Tune off the weekly scorecard.</Task>
        <Task id="p3-3" owner="SR">Make the Day 90 decision.</Task>

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

        <Note>This is a working draft. Tell me what to cut and I'll tighten it.</Note>
      </Phase>
    </Shell>
  );
}
