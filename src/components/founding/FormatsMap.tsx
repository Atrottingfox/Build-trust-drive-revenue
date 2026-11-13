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

  Four job boxes, the formats listed plainly under each (Sean, 14 Nov:
  cleaner). One format lights up at a time and its description shows
  underneath. Clicking a format pins it.
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
    <div className="p-5">
      <p className="text-white text-[18px] font-extrabold tracking-[-0.02em] leading-tight">Every video does one of four jobs</p>
      <p className="text-zinc-500 text-[12px] mt-1">18 formats, each with its own step by step.</p>

      <div className="grid grid-cols-2 gap-px mt-4 rounded-xl overflow-hidden border border-white/5 bg-white/5">
        {JOBS.map(({ job, line }) => (
          <div key={job} className="bg-[#0d0f14] p-4">
            <p className="text-white text-[13px] font-bold">{job}</p>
            <p className="text-zinc-500 text-[11px] italic leading-snug mt-0.5 mb-3">{line}</p>
            <ul className="space-y-1">
              {FORMATS.map((x, i) => x.j !== job ? null : (
                <li key={x.t}>
                  <button
                    type="button"
                    onClick={() => setPinned(pinned === i ? null : i)}
                    className={`text-left text-[12.5px] leading-snug transition-colors duration-300 ${i === active ? 'text-blue-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}
                  >
                    {x.t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 h-[92px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-white text-[14px] font-semibold">{f.t}</p>
            <p className="text-zinc-400 text-[12.5px] leading-snug mt-1 line-clamp-2">{f.l}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
