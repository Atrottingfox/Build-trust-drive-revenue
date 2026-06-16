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

// One person's tasks inside a phase.
const Who = ({ name, prefix, tasks }: { name: string; prefix: string; tasks: string[] }) => (
  <div className="mb-7">
    <p className={`font-display text-[15px] font-extrabold uppercase tracking-wider mb-1 ${NAME_CLS[name]}`}>{name}</p>
    {tasks.map((t, i) => <Task key={i} id={`${prefix}-${i}`}>{t}</Task>)}
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-5">
            The Undeniable <span className="text-blue-500">Plan.</span>
          </h1>
          <p className="text-zinc-300 text-[18px] leading-relaxed mb-2">
            12 weeks. Three phases. Build trust, then put money behind what works.
          </p>
          <p className="text-zinc-500 text-[14px] leading-relaxed italic">
            Where we're going: 2,000 coaches scaled by 2028, without 80-hour weeks as a content creator.
          </p>

          <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 px-5 py-4 mt-8">
            <p className="text-blue-400 font-semibold text-[12px] uppercase tracking-widest mb-1">Do this now</p>
            <p className="text-white text-[16px] font-medium leading-relaxed">One CTA in the bio. One direction. No matter what.</p>
          </div>
        </div>
      </section>

      <Divider />

      <Phase
        tag="Phase 1"
        window="First 4 weeks"
        title="Calibrate."
        why="Get the foundations live and find out what content actually lands, before we spend a cent on ads. We're testing, not perfecting."
      >
        <Who name="Rhys" prefix="p1r" tasks={[
          'Publish pillar video 1 (Character).',
          'Publish pillar video 2 (Rome).',
          'Film 5 simple videos for the lead magnets. They don\'t need to be perfect.',
          'Run 4 one-week sprints: new hooks in different formats. See what lands.',
          'Daily voice memo at the end of each day.',
        ]} />
        <Who name="Corey" prefix="p1c" tasks={[
          'Get the 5 lead magnets live (with the PS bridge in each).',
          'Get on prospect and client calls. Ask the 7 questions. Level up.',
          'Lead the Monday meeting by week 4.',
        ]} />
        <Who name="Sean" prefix="p1s" tasks={[
          'Weekly strategy call with Corey.',
        ]} />
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
      </Phase>
    </Shell>
  );
}
