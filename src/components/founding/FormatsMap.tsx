import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/*
  The Formats page from the short form playbook on contentengine.live
  (/playbooks/short-form/formats), rebuilt for the founding pages.

  Every format, job, viewer line, description and "ways to make it" is copied
  from contentengine-v3 src/features/short-form/index.json (synced from Notion
  2026-11-13). The example thumbnails are left out on purpose: they are other
  creators' videos and this is a public page. If a format changes in the
  portal, copy it across here.

  One format lights up at a time and the panel under the map shows its card.
  Clicking a format pins it.
*/

type Job = 'Attention' | 'Alignment' | 'Authorship' | 'Achievability';
type F = { t: string; j: Job; m: 'Capture' | 'Create'; l: string; w: string[] };

const JOBS: { job: Job; line: string }[] = [
  { job: 'Attention', line: 'This is interesting' },
  { job: 'Alignment', line: 'They see the world how I see the world' },
  { job: 'Authorship', line: "I didn't know that" },
  { job: 'Achievability', line: 'That could work for me' },
];

const FORMATS: F[] = [
  { t: 'Podcast clips', j: 'Attention', m: 'Capture', l: 'Short clips cut from a long conversation or a long form video.', w: [] },
  { t: 'Event clips', j: 'Attention', m: 'Capture', l: 'Clips from the stage and room at each event.', w: ['On stage', 'The room, the day (recap)'] },
  { t: 'Live capture', j: 'Attention', m: 'Capture', l: 'Stories from real moments: meetings, conversations, boardrooms, coaching calls and phone calls.', w: ['A call, coaching call, meeting or live', 'On the move'] },
  { t: 'Signature series', j: 'Attention', m: 'Create', l: 'A named repeating series: same name, same opening, same structure every episode, a new subject each time.', w: ['Talking head', 'Screen recording', 'Green screen'] },
  { t: 'Outcome breakdown', j: 'Attention', m: 'Create', l: "Someone else's known result broken down on screen: their result, how they really got it, and the lesson for the buyer.", w: [] },
  { t: 'Report / React', j: 'Attention', m: 'Create', l: 'React live to something real the wider world already knows, then breaks down what happened.', w: ['Green screen', 'Direct to camera', 'Phone'] },
  { t: 'Yap', j: 'Alignment', m: 'Capture', l: 'Just talk. One belief, said straight, sitting or standing, to camera or to someone off camera.', w: ['On a phone', 'Direct to camera'] },
  { t: 'Off the cuff', j: 'Alignment', m: 'Capture', l: 'Mid conversation, fired up about a topic, with a view that goes against the grain.', w: ['Belief', 'Story'] },
  { t: 'Belief breaker', j: 'Alignment', m: 'Create', l: "The belief everyone in the buyer's world holds, why it is wrong, the new belief, and the proof behind it.", w: [] },
  { t: 'For / against', j: 'Alignment', m: 'Create', l: 'What you stand against (the enemy) and what you stand for.', w: [] },
  { t: 'Strategy breakdown', j: 'Authorship', m: 'Capture', l: 'Breaking a real business down live in a client session, a strategy day, a coaching call or a hot seat.', w: ['Planned', 'On the move'] },
  { t: 'Question + Answer', j: 'Authorship', m: 'Capture', l: 'Real buyer questions answered on the spot, one clip per answer.', w: ['Question from behind the camera', 'Live in person, at an event'] },
  { t: 'Draw / show', j: 'Authorship', m: 'Create', l: 'Draw the model or do the maths on screen, on a whiteboard, a screen share or an iPad.', w: [] },
  { t: 'Tutorial / how to', j: 'Authorship', m: 'Create', l: 'One problem, 3 to 5 steps and one takeaway, taught to camera.', w: [] },
  { t: 'Live breakdowns', j: 'Achievability', m: 'Capture', l: 'Break down something real, live, as it happens: an account, a store, a funnel, an ad, or something the audience sent in.', w: ['On screen', 'Done live on stage', 'When it is a long form'] },
  { t: 'Client interview', j: 'Achievability', m: 'Capture', l: 'A client who already has the result walks through what changed, with someone off camera asking the questions.', w: [] },
  { t: 'Testimonials', j: 'Achievability', m: 'Create', l: 'A planned testimonial, asked for from a client, giving the result, where they started, what made it work and the proof.', w: [] },
  { t: 'Client breakdown', j: 'Achievability', m: 'Create', l: "A client's result broken down on screen, with the numbers.", w: [] },
];

/* A filled dot is Capture, a ring is Create, as in the portal. */
const Dot = ({ m }: { m: F['m'] }) => (
  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${m === 'Capture' ? 'bg-blue-500' : 'border-[1.5px] border-blue-500'}`} />
);

/* The order the highlight walks through: one per job, round and round. */
const WALK = [3, 8, 11, 17, 6, 13, 14, 0, 9, 12, 16, 5];

export default function FormatsMap() {
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  useEffect(() => {
    if (pinned !== null) return;
    const t = setInterval(() => setStep((s) => (s + 1) % WALK.length), 2600);
    return () => clearInterval(t);
  }, [pinned]);

  const active = pinned ?? WALK[step];
  const f = FORMATS[active];

  return (
    <div className="px-4 md:px-5 pt-4 pb-5">
      <div className="flex items-center gap-1.5 text-[11px] mb-3">
        <span className="rounded-md bg-white/10 text-white px-2 py-1 font-semibold">Short form</span>
        <span className="rounded-md text-zinc-500 px-2 py-1">Long form</span>
      </div>
      <p className="text-white text-[17px] md:text-[19px] font-extrabold tracking-[-0.02em] leading-tight">Every video does one of four jobs</p>
      <div className="flex items-center gap-4 mt-2 mb-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5"><Dot m="Capture" />Capture: film what is already happening</span>
        <span className="flex items-center gap-1.5"><Dot m="Create" />Create: plan it</span>
      </div>

      <div className="divide-y divide-white/5 border-y border-white/5">
        {JOBS.map(({ job, line }) => (
          <div key={job} className="py-2.5 grid grid-cols-[92px_minmax(0,1fr)] md:grid-cols-[108px_minmax(0,1fr)] gap-3 items-start">
            <div className="min-w-0">
              <p className="text-white text-[13px] font-bold">{job}</p>
              <p className="text-zinc-500 text-[10.5px] italic leading-snug mt-0.5">{line}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FORMATS.map((x, i) => x.j !== job ? null : (
                <button
                  key={x.t}
                  type="button"
                  onClick={() => setPinned(pinned === i ? null : i)}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] transition-colors duration-300 ${i === active ? 'bg-blue-500/20 text-white ring-1 ring-blue-500/50' : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200'}`}
                >
                  <Dot m={x.m} />
                  {x.t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 h-[124px] rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2">
              <Dot m={f.m} />
              <p className="text-white text-[14px] font-semibold">{f.t}</p>
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-semibold ml-auto">{f.j} - {f.m}</span>
            </div>
            <p className="text-zinc-300 text-[12.5px] leading-snug mt-1.5 line-clamp-2">{f.l}</p>
            <p className="text-zinc-500 text-[11px] mt-2 truncate">
              {f.w.length ? `Ways to make it: ${f.w.join(', ')}` : 'Step by step: production SOP, then editing SOP'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
