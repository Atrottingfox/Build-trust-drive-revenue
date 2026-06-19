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
          <p className="text-white text-[20px] font-semibold leading-snug">
            Goal: 2,000 health and fitness businesses scaled by 2028.
          </p>
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
        <Bucket n="1" title="Lead magnets" owners="R">
          <Task id="p1-1">Produce simple, already made, quick win lead magnets and get them live. Don't build the entire diagnostic.</Task>
          <Detail title="The 5 magnets + the PS bridge">
            <p>1. The Customer Journey. Keep it turned on, it's producing wins.</p>
            <p>2. The Sales Success System.</p>
            <p>3. The Constraint Diagnostic. Keep it simple, don't build the full thing.</p>
            <p>4. The MACHINE Framework. Hiring and leadership.</p>
            <p>5. The Churn Calculator. The leaky bucket.</p>
            <p className="text-zinc-400 pt-1">PS bridge on each: "If you want to take this further: 1. Watch the deep-dive on YouTube. 2. Join the next workshop."</p>
          </Detail>
        </Bucket>

        <Bucket n="2" title="Short Form Sprints" owners="R">
          <Task id="p1-2">Run weekly sprints of new hooks in different formats. See what lands.</Task>
          <Detail title="How the test runs">
            <p>Four one week sprints. Each week, a fresh batch of new hooks in different formats and environments.</p>
            <p>We're calibrating what the market responds to, not perfecting. Keep what's already working underneath, pile new tests on top.</p>
          </Detail>
        </Bucket>

        <Bucket n="3" title="The 2 pillar videos" owners="R">
          <Task id="p1-3">Get the first 2 pillar videos up: the Character video, then The Public VSL.</Task>
          <Detail title="What each one is">
            <p><span className="text-white font-medium">Character.</span> 20 to 30 minutes, walking or documentary. "From PT, My First Million." Damaging admissions, the real arc.</p>
            <p><span className="text-white font-medium">The Public VSL.</span> The 10K to 80K solver. The trust asset everyone comes back to.</p>
          </Detail>
          <Detail title="The studio (where you film)">
            <p>Dark room: moody, motivational, podcasts. Light room: educational, whiteboard, talking head.</p>
            <p>Top down camera, paper desk, iPad. Jeremy Hayne style: iPad as input, screen on the back wall.</p>
            <p>Outdoor: walking, gym, park, drive. Walking with a doc so Rhys can shoot solo.</p>
          </Detail>
        </Bucket>

        <Bucket n="4" title="Corey's client calls" owners="C">
          <Task id="p1-4">Get on prospect and client calls, ask the questions, and log every problem to its bottleneck.</Task>
          <Detail title="What Corey opens with, then the 7 questions">
            <p className="text-zinc-200">Rhys is on a mission to help 2,000 online health and fitness coaches grow and scale by 2028 without having to work 80 hours a week as a content creator to do it.</p>
            <p className="text-zinc-200">I'm obsessing over 3 things so that I can help him do that. The problems his ideal clients face, why scaling their business really matters to them, and what others like you still want help with so we can make better content for the industry.</p>
            <p className="text-zinc-200">This isn't a testimonial, there's no right answers. Rhys said you're a weapon, so I just want to learn from you. Cool if we jam for 15 to 20 minutes?</p>
            <div className="h-1" />
            <p>1. Before working with Rhys, what was the day to day in your business like?</p>
            <p>2. What stressed you out the most back then?</p>
            <p>3. What did you honestly think about the industry?</p>
            <p>4. What made this so important to you?</p>
            <p>5. Right now, what are the top 2 to 3 things you still want to learn about growing your coaching business?</p>
            <p>6. If Rhys made a 10 video series just for you, what would you want him to talk about?</p>
            <p>7. What's one thing in the online coaching and content space you wish someone would finally be honest about?</p>
          </Detail>
        </Bucket>

        <Bucket n="5" title="Track data" owners="C">
          <Task id="p1-5">Put every post into a Google sheet: views, saves, likes, shares, average watch time, skip rate.</Task>
        </Bucket>

        <Bucket n="6" title="Daily capture" owners="R">
          <Task id="p1-6">End of day voice memo, every day.</Task>
          <Detail title="The questions">
            <p>What did I teach? What did I learn? What problem did I solve? What would I do differently? What's a thought I can't get out of my head?</p>
          </Detail>
        </Bucket>

        <Bucket n="7" title="Weekly calls + access" owners="S">
          <p className="text-zinc-300 text-[15px] leading-relaxed">Weekly calls with Sean, plus WhatsApp access on 0418 554 4311.</p>
        </Bucket>

        <Bucket n="8" title="Train Corey" owners="S">
          <Task id="p1-8">Corey shadows every shoot and edit. Start training him to think like a marketer, not just an editor.</Task>
        </Bucket>
      </Phase>

      <Divider />

      {/* PHASE 2 */}
      <Phase
        tag="Phase 2"
        window="Next 4 weeks"
        title="Compress trust."
        why="Now we know what works. Ship The Public VSL. Keep the long form rolling. Continue testing on short form."
      >
        <Bucket n="1" title="Ads" owners="R">
          <Task id="p2-1">Run the 4 ad types and boost what works.</Task>
          <Task id="p2-2">Keep the creative fresh so spend doesn't cap.</Task>
          <Detail title="The 4 ad types">
            <p><span className="text-white font-medium">Status.</span> Alex, Brandon, Luke, Gabe. Borrowed authority, top of funnel.</p>
            <p><span className="text-white font-medium">Q&A.</span> Workshop room: name, revenue, problem, what happens if I don't solve it. Gabe is the gold standard.</p>
            <p><span className="text-white font-medium">Asset.</span> Straight to the lead magnets. Split test landing page vs instant form.</p>
            <p><span className="text-white font-medium">Education.</span> Specific bottlenecks: hiring, churn, pricing.</p>
          </Detail>
          <Detail title="The rules">
            <p>Boost what works organically. One CTA in the bio. Diversify the creative so spend doesn't cap.</p>
          </Detail>
        </Bucket>

        <Bucket n="2" title="Pillar videos" owners="R">
          <Task id="p2-3">Keep publishing pillar videos (3 and 4).</Task>
        </Bucket>

        <Bucket n="3" title="The Public VSL" owners="R">
          <Task id="p2-4">Build the value first Public VSL.</Task>
        </Bucket>

        <Bucket n="4" title="Audio (bolt on)" owners="R">
          <Task id="p2-5">Start 3 to 5 short podcast episodes a week, one problem each.</Task>
          <Detail title="How">
            <p>5 to 15 minutes each, one hyper specific problem per episode, pulled from the 78 framework backlog. Mindset and framing pieces too.</p>
          </Detail>
        </Bucket>
      </Phase>

      <Divider />

      {/* PHASE 3 */}
      <Phase
        tag="Phase 3"
        window="Last 4 weeks"
        title="Refine and train."
        why="Refine the brand based on what the data has shown. Continue testing. Continue training Corey to become a marketer who wields a camera as his tool."
      >
        <Bucket n="1" title="Refine the brand" owners="S">
          <Task id="p3-1">Refine the brand based on what the data has shown, what feels good, and how content has performed.</Task>
        </Bucket>

        <Bucket n="2" title="Continue testing" owners="C">
          <Task id="p3-2">Continue hook and format testing, refined by data.</Task>
        </Bucket>

        <Bucket n="3" title="Train Corey" owners="S">
          <Task id="p3-3">Continue training Corey to become a marketer who wields a camera as his tool.</Task>
        </Bucket>

        <Bucket n="4" title="Day 90 decision" owners="S">
          <Task id="p3-4">Make the call: keep going, go deeper, or stop.</Task>
          <Detail title="The three doors">
            <p><span className="text-white font-medium">Keep going.</span> Advisory.</p>
            <p><span className="text-white font-medium">Go deeper.</span> Longer build.</p>
            <p><span className="text-white font-medium">Stop.</span> Project closes, all assets stay.</p>
            <p className="text-zinc-400 pt-1">Decide on the data and the qualified booked calls coming from content.</p>
          </Detail>
        </Bucket>
      </Phase>
    </Shell>
  );
}
