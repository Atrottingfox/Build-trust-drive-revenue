import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { Shell, Wrap, Divider, Eyebrow, H2, Note } from '../components/undeniable/Bits';

// Tickable task. Progress saved per task in localStorage.
function Task({ id, children }: { id: string; children: React.ReactNode }) {
  const key = `tup:${id}`;
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    try { setDone(localStorage.getItem(key) === '1'); } catch (e) { /* noop */ }
  }, [key]);
  const toggle = () => {
    setDone((d) => {
      const n = !d;
      try { localStorage.setItem(key, n ? '1' : '0'); } catch (e) { /* noop */ }
      return n;
    });
  };
  return (
    <button onClick={toggle} className="flex items-start gap-3 text-left w-full group py-1">
      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${done ? 'bg-blue-500 border-blue-500' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
        {done && <CheckIcon className="w-3.5 h-3.5 text-white" />}
      </span>
      <span className={`text-[15px] leading-relaxed transition-colors ${done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{children}</span>
    </button>
  );
}

const Tasks = ({ prefix, items }: { prefix: string; items: React.ReactNode[] }) => (
  <div className="space-y-1.5">
    {items.map((it, i) => <Task key={i} id={`${prefix}-${i}`}>{it}</Task>)}
  </div>
);

const Ref = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-zinc-800 bg-elevated px-5 py-4 mt-6">
    <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-2">{label}</p>
    <div className="text-zinc-300 text-[14px] leading-relaxed space-y-2">{children}</div>
  </div>
);

const PhaseNum = ({ n, title, sub }: { n: string; title: string; sub: string }) => (
  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
    <span className="font-display text-[15px] font-extrabold text-blue-400 whitespace-nowrap">{n}</span>
    <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">{title}</h2>
    <span className="text-zinc-400 text-[13px]">{sub}</span>
  </div>
);

export default function TheUndeniablePlan() {
  return (
    <Shell title="The Undeniable Plan" description="The plan, stupid simple. Clear tasks to tick off." path="/theundeniableplan">
      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="accent-line mb-7" />
          <Eyebrow>The build</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            The Undeniable <span className="text-blue-500">Plan.</span>
          </h1>
          <p className="text-zinc-400 text-[17px] leading-relaxed">
            Top to bottom, in order. Tick each task as you go — your progress saves on this device. Nothing here is precious. Cut what you don't need.
          </p>
        </div>
      </section>

      <Divider />

      {/* THE SHAPE */}
      <Wrap>
        <Eyebrow>The shape</Eyebrow>
        <H2>Three phases.</H2>
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {[
            { p: 'First', w: '4 weeks', d: 'Test, gather data, keep what works. Four one-week sprints.' },
            { p: 'Next', w: '6 weeks', d: 'Lock the winners. Run the long-form cycle around the workshop calendar.' },
            { p: 'Then', w: 'Weeks 11-12', d: 'Tune. Day 90 decision: keep going, go deeper, or stop.' },
          ].map((x) => (
            <div key={x.p} className="glow-card p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-[15px] font-extrabold text-blue-400 uppercase">{x.p}</span>
                <span className="text-zinc-400 text-[13px]">{x.w}</span>
              </div>
              <p className="text-zinc-300 text-[14px] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      {/* 1 · FOUNDATION */}
      <Wrap>
        <PhaseNum n="1" title="Set the foundation." sub="Do first. Runs underneath everything." />
        <div className="mt-7">
          <Tasks prefix="found" items={[
            'Lock the mission statement.',
            'Hand Corey the client interview script + 7 questions.',
            'Lock the YouTube intro line.',
            'Build the Brand Bible (voice, positioning, beliefs, origin story, archetype, category, do/don\'t).',
            'Lock the 5 lead magnets. Stop adding new ones.',
            'Add the PS bridge to the back of every lead magnet.',
            'Set up the studio (dark + light rooms, top-down camera, outdoor, walking-with-doc).',
          ]} />
        </div>

        <Ref label="Mission statement (lock it)">
          <p>Rhys is on a mission to help 2,000 online health and fitness coaches grow and scale by 2028, without having to work 80 hours a week as a content creator to do it.</p>
        </Ref>

        <Ref label="YouTube intro line (locked draft)">
          <p>"This channel is for online coaches who want to grow without becoming full-time content creators."</p>
        </Ref>

        <Ref label="The 5 lead magnets">
          <p>1. The Six Step Profit Path <span className="text-blue-400">(do not turn off — it's producing wins)</span></p>
          <p>2. The Sales Success System</p>
          <p>3. The Constraint Diagnostic (the 63-solution bottleneck buster)</p>
          <p>4. The MACHINE Framework (hiring + leadership)</p>
          <p>5. The Churn Calculator (the leaky bucket)</p>
        </Ref>

        <Ref label="The PS bridge (back of every magnet)">
          <p>P.S. If you want to take this further, two ways we can help:</p>
          <p>1. Watch the deep-dive on YouTube → [link]</p>
          <p>2. Join the next workshop → [link]</p>
        </Ref>

        <Ref label="Corey's 7 questions (every client call)">
          <p>1. Before Rhys, what was the day to day like?</p>
          <p>2. What stressed you out the most?</p>
          <p>3. What did you honestly think about the industry?</p>
          <p>4. What made this so important to you?</p>
          <p>5. Top 2-3 things you still want to learn about growing your business?</p>
          <p>6. If Rhys made a 10-video series just for you, what would it cover? <span className="text-blue-400">(the content brief)</span></p>
          <p>7. One thing in the space you wish someone would finally be honest about? <span className="text-blue-400">(the contrarian angle)</span></p>
        </Ref>
      </Wrap>

      <Divider />

      {/* 2 · THE 4-WEEK TEST */}
      <Wrap>
        <PhaseNum n="2" title="The 4-week test." sub="Short form. Four one-week sprints." />
        <div className="mt-7">
          <Tasks prefix="test" items={[
            <><b className="text-white font-semibold">Sprint 1 — Stories.</b> Gym, park, walking.</>,
            <><b className="text-white font-semibold">Sprint 2 — Hot takes.</b> Direct to camera, walking.</>,
            <><b className="text-white font-semibold">Sprint 3 — Teaching.</b> Whiteboard, top-down.</>,
            <><b className="text-white font-semibold">Sprint 4 — Demonstration.</b> Workshop room, client calls, live math on the phone.</>,
            'Run the daily capture every day.',
            'Keep what\'s already working. Pile the new tests on top.',
          ]} />
        </div>

        <Ref label="The opening rule (every short)">
          <p>"In 60 seconds I'm going to help you [outcome] so you stop [pain] and can [keep / gain X]."</p>
          <p className="text-zinc-400">Promise + length up front. "How I" over "how to." One problem, one promise, one outcome.</p>
        </Ref>

        <Ref label="Daily capture (Rhys, end of day voice memo)">
          <p>What did I teach? · What did I learn? · What problem did I solve? · What would I do differently?</p>
        </Ref>
      </Wrap>

      <Divider />

      {/* 3 · THE 6-WEEK CYCLE */}
      <Wrap>
        <PhaseNum n="3" title="The 6-week cycle." sub="Long form. Locks after the test phase." />
        <div className="mt-7">
          <Tasks prefix="cycle" items={[
            <><b className="text-white font-semibold">Build the Character video ahead</b> (20-30 min, walking / documentary, "From PT, My First Million", damaging admissions).</>,
            <><b className="text-white font-semibold">Build the Rome video ahead</b> (4-5 hrs, the 10K → 80K solver, VSL-grade trust asset).</>,
            'Week 1 — publish the Character video.',
            'Week 2 — publish Rome.',
            'Week 3 — Education · clarity (whiteboard + top-down).',
            'Week 4 — Education · client problem broken down (whiteboard + iPad).',
            'Week 5 — Education · belief flip (direct to camera).',
            'Week 6 — Education · the math live (phone in hand, real numbers).',
            'Bolt on 3-5 podcast episodes a week (5-15 min, one problem each).',
          ]} />
        </div>
      </Wrap>

      <Divider />

      {/* 4 · CONNECTIVE TISSUE */}
      <Wrap>
        <PhaseNum n="4" title="The connective tissue." sub="Runs alongside everything." />

        <div className="mt-7">
          <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-3">Ads</p>
          <Tasks prefix="ads" items={[
            <>Run the 4 ad buckets: <b className="text-white font-semibold">Status</b> (Alex, Brandon, Luke, Gabe), <b className="text-white font-semibold">Q&amp;A</b> (workshop room), <b className="text-white font-semibold">Asset</b> (the 5 magnets), <b className="text-white font-semibold">Education</b> (bottlenecks).</>,
            'Boost the top performers. Put paid behind what works (the Jay Wright play).',
            'One CTA in the bio. One direction. Sniper, not shotgun.',
            'Keep the Six Step Profit Path magnet running. Do not turn it off.',
            'Diversify creative so spend doesn\'t cap.',
          ]} />
        </div>

        <div className="mt-8">
          <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-3">Trojan Horse VSL</p>
          <Tasks prefix="vsl" items={[
            'Build the value-first VSL (sits post-lead-magnet, pre-workshop).',
            'Test it against members in the tuning phase.',
          ]} />
          <Ref label="VSL structure (mark up)">
            <p>Hook + promise + length → proof anchor (Sabine: 15K → 80K + the math) → the path → the mechanism (the Authority Engine) → case studies → the invitation (workshop).</p>
          </Ref>
        </div>

        <div className="mt-8">
          <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-3">Operating cadence</p>
          <Tasks prefix="cadence" items={[
            'Weekly call: Sean + Corey (install the strategy mindset).',
            'Weekly call: Sean + Grace (walk the plan, Corey in the room).',
            'Corey: daily voice notes.',
            'Corey: sit on every client call, ask the 7 questions, log each problem → its bottleneck.',
            'Corey leads the Monday meeting by week 4 ("here\'s the bottleneck, here\'s the brief, here\'s why").',
            'Run the weekly scorecard.',
          ]} />
          <Ref label="Weekly scorecard">
            <p>Per piece: hook, environment, format, watch time, saves, shares, comments, ICP-tick rate on commenters.</p>
            <p>Workshop question: "How long have you known about Rhys?" — track if under-3-month answers go up.</p>
            <p>The number that matters: qualified booked calls from content.</p>
          </Ref>
        </div>
      </Wrap>

      <Divider />

      {/* DAY 90 */}
      <Wrap>
        <Eyebrow>The decision</Eyebrow>
        <H2>Day 90.</H2>
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {[
            { t: 'Keep going', d: 'Move into advisory.' },
            { t: 'Go deeper', d: 'Commit to a longer build.' },
            { t: 'Stop', d: 'Project closes. All assets stay.' },
          ].map((x) => (
            <div key={x.t} className="glow-card p-5">
              <h3 className="font-display text-[18px] font-extrabold text-white mb-1">{x.t}</h3>
              <p className="text-zinc-400 text-[14px] leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <Note>This page is a working draft. Tell me what to cut and I'll tighten it.</Note>
      </Wrap>
    </Shell>
  );
}
