import React from 'react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, Note, H2, Block, BulletList, Tabs } from '../components/undeniable/Bits';

// The Cultivated plan. Built entirely from the Strategy Day transcript.
// Chloe runs this on her own, so there are no owner names beyond Chloe and
// Sean, no per person weekly counts, and no shooting roster. Nothing here is
// lifted from another client. Where the room did not produce something, the
// section says so rather than inventing it.

// ─── Diagnosis ───────────────────────────────────────────────────────────

type Score = { name: string; score: number; label: string; note: string };

const SCORES: Score[] = [
  {
    name: 'Clarity',
    score: 3,
    label: '3 / 5',
    note: 'A founder lands on the profile and cannot place themselves in it. "Operational businesses" reads as manufacturing and logistics, which is not the room she wants. Her own words: "I keep talking about niching down and then I never actually niche down."',
  },
  {
    name: 'Visibility',
    score: 1,
    label: '1 / 5',
    note: 'The number goes up and nothing follows it. "Followers are going up, but it is not converting into actual conversations." Growing an audience is not the problem she is trying to solve.',
  },
  {
    name: 'Authority',
    score: 2,
    label: '2 / 5',
    note: 'The experience is real and it does not make it out of her head. "I think I have that, I do not think I translate it." Nothing on the profile signals a team of 100 or an operations background.',
  },
  {
    name: 'Quality',
    score: 2,
    label: '2 / 5',
    note: 'Leads arrive pre sold, and they arrive by referral, not content. Referrals enter at the last step and skip everything before it, so none of it ever gets tested.',
  },
];

function Scores({ items }: { items: Score[] }) {
  return (
    <div className="border-t border-zinc-800">
      {items.map((s) => (
        <div key={s.name} className="border-b border-zinc-800/70 py-5">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <p className="font-display text-[17px] font-extrabold text-white">{s.name}</p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-2 w-7 rounded-sm ${n <= s.score ? 'bg-blue-500' : 'bg-zinc-800'}`}
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-[12px] tabular-nums whitespace-nowrap">{s.label}</span>
            </div>
          </div>
          <p className="text-zinc-400 text-[14px] leading-relaxed">{s.note}</p>
        </div>
      ))}
    </div>
  );
}

// ─── The four weeks ──────────────────────────────────────────────────────

type Week = {
  id: string;
  chip: string;
  output: string;
  headline: string;
  frame: string;
  jobs: string[];
  close: string;
  measure: string;
};

const WEEKS: Week[] = [
  {
    id: 'w1',
    chip: 'Week 1',
    output: '3 posts',
    headline: 'Fix the front door.',
    frame: 'Visibility is the lowest score on the board and it is the last thing we touch. Put reach behind a profile that does not explain itself and all that happens is more people get confused. Clarity is a 3. That is where the month starts.',
    jobs: [
      'Rewrite the bio. One signal to the experience, one signal to the outcome. The outcome has to be specific enough that a founder reads it and knows it is about them.',
      'Write and pin post one, the story. Why her. Sean\'s story template, spoken toward the founder she wants rather than at everyone.',
      'Turn ManyChat back on. It was set up and switched off. It goes back on before any CTA runs.',
      'List every lead magnet that already exists. She has a lot of them. Nothing new gets built until the catalogue is on one page.',
    ],
    close: 'Nothing gets boosted until the three pinned posts are live.',
    measure: 'Can a stranger read the bio and say who it is for.',
  },
  {
    id: 'w2',
    chip: 'Week 2',
    output: '3 posts',
    headline: 'Proof and method, pinned.',
    frame: 'Three posts at the top of the profile do the job the bio cannot. One says why her, one shows it working, one shows how she does it. That is the whole clarity fix.',
    jobs: [
      'Pin post two, the case study. Not a testimonial. "If I was this and I wanted that, this is what I would do." Frame the person, name what they were struggling with, give three things, then the CTA.',
      'Pin post three, the method. The systematised process, written out. Or the post that has already performed, with a CTA added.',
      'Book the co-working desk. It becomes the fortnightly second environment and doubles as the day she takes meetings.',
    ],
    close: 'After this week the profile answers who it is for, what she has done, and how she does it, without her being in the room.',
    measure: 'Three posts pinned. Bio live.',
  },
  {
    id: 'w3',
    chip: 'Week 3',
    output: '3 posts, first full batch',
    headline: 'One batch, three environments.',
    frame: 'She already shoots ten reels in under an hour. The gap has never been production. It is that the work gets made with nowhere to go.',
    jobs: [
      'Shoot the month in one sitting. Under an hour of recording, one to two hours of editing, which is what it already takes her.',
      'One belief, one story, one teach. Across People, Process and Performance, that is the month.',
      'Shoot at least one outdoors, off the cuff, on the morning walk. Unpolished is the point, and it is the format she says she has struggled to let herself make.',
    ],
    close: 'Everything shot goes into a slot. Nothing gets made without a slot waiting for it.',
    measure: 'Posts shipped against posts scheduled.',
  },
  {
    id: 'w4',
    chip: 'Week 4',
    output: '3 posts',
    headline: 'Start capturing intent.',
    frame: 'Content that gets seen and asks for nothing is where the current system already sits. One in three posts has a job beyond being watched.',
    jobs: [
      'CTA on one post in three, into ManyChat.',
      'Point every CTA at one lead magnet from the catalogue built in week 1. Nothing new gets made for this.',
      'Draft the landing page. What she does, the package, the process, why her, and how to take the next step. Simple enough that a phone video would carry it.',
    ],
    close: 'All roads lead to a call.',
    measure: 'Conversations that started in content, not in someone\'s referral.',
  },
];

function FourWeeks({ wk, onWeek }: { wk: string; onWeek: (id: string) => void }) {
  const w = WEEKS.find((x) => x.id === wk) ?? WEEKS[0];
  return (
    <Wrap>
      <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The first month</p>
      <H2>{w.headline}</H2>
      <Note>The output ramps. Three a week is the floor, not the ceiling.</Note>

      <div className="mt-8 flex flex-wrap gap-2">
        {WEEKS.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => onWeek(x.id)}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              x.id === wk
                ? 'border-blue-500/60 bg-blue-500/15 text-white'
                : 'border-zinc-800 bg-elevated/40 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {x.chip}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-elevated/40 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
          <p className="font-display text-[18px] font-extrabold text-white">{w.chip}</p>
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[12px] font-semibold text-blue-300">
            {w.output}
          </span>
        </div>

        <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">{w.frame}</p>

        <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">The jobs</p>
        <BulletList items={w.jobs} />

        {w.close && (
          <p className="text-zinc-300 text-[14px] leading-relaxed mt-6 border-l-2 border-blue-500/50 pl-4">
            {w.close}
          </p>
        )}

        <div className="mt-6 pt-5 border-t border-zinc-800/70">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">The measure</p>
          <p className="text-zinc-300 text-[14px]">{w.measure}</p>
        </div>
      </div>
    </Wrap>
  );
}

// ─── Brand ───────────────────────────────────────────────────────────────

const ARCHETYPES = [
  { n: '01', name: 'Operator', note: 'First, and deliberately. She has run the thing, not advised on it. That means showing the actual work rather than describing it.' },
  { n: '02', name: 'Guide', note: 'She walks the founder through it. She does not do it for them.' },
  { n: '03', name: 'Mentor', note: 'The long relationship. Developing the person, not just fixing the process.' },
];

const PILLARS = [
  {
    name: 'People',
    note: 'Role clarity, accountability, one on ones, development, retention, the hard conversations nobody is having. The pillar that gets avoided because it is uncomfortable.',
  },
  {
    name: 'Process',
    note: 'SOPs, delegation, the actual steps. "There is a process for delegation to follow. It is not just, this is yours now, do that."',
  },
  {
    name: 'Performance',
    note: 'KPIs that get measured, expectations that get set, what good looks like. "If you cannot measure them, what are you holding them accountable to?"',
  },
];

const PRINCIPLES = [
  { t: 'Roles come from goals.', p: 'Sean called it a line the moment she said it. Nobody can own an outcome that has not been named.' },
  { t: 'Clarity removes confusion.', p: 'Her words. Most teams ruminate on the issue for months instead of addressing it once.' },
  { t: 'Your job is to get everyone else doing the thing, not to do the thing.', p: 'The founder who is quickest to do it themselves is the one who never gets the time back.' },
  { t: 'Five is 100.', p: '"There is no difference between a 100 person team and a five person team, because if you get it right at five, you can grow to 100." This is what makes the Komatsu story usable for a founder with six people.' },
  { t: 'It is not hard to be a good person. Nobody is talking about what good actually looks like.', p: 'Her line, and the one Sean stopped the room to write down.' },
  { t: 'People and process are separate until you look at it as one operation.', p: 'The reason the three pillars are one system and not three topics.' },
];

const AGAINST = [
  'The bureaucratic manager. Top down, do as I say and not as I do.',
  'Flattening the structure and calling it culture. Taking out the layers so everyone reports to the CEO, instead of teaching people how to manage in a hierarchy.',
  'Expecting people to already know what to do. "Your job as their boss is to help them get there."',
  'Generating a job description out of a chatbot with no idea what the role actually needs.',
];

const NOT_FOR = [
  'The old school manager looking for someone to enforce their view.',
  'Anyone not ready to step back and put time into developing their people.',
  'Anyone who does not actually want the time back.',
];

// ─── Content ─────────────────────────────────────────────────────────────

const FORMATS = [
  { bucket: 'Teach', t: 'Hypothetical scenario', p: '"If I wanted to go from X to Y in the next 90 days, this is exactly what I would do."' },
  { bucket: 'Proof', t: 'Outcome breakdown', p: '"This is how my client went from X to Y in 90 days."' },
  { bucket: 'Proof', t: 'Case study', p: '"Every founder I speak to is struggling with the same thing. If I was in your position, this is what I would do."' },
  { bucket: 'Teach', t: 'Problem and solution', p: 'The problem named plainly, then the way through it. The transcripts already produce these.' },
  { bucket: 'Belief', t: 'Common mistakes', p: 'What founders get wrong. There is a full bank of these from the day.' },
  { bucket: 'Belief', t: 'Contrarian take', p: 'Take the common belief and break it. Contrarian through her experience, not for the sake of it.' },
  { bucket: 'Teach', t: 'Explainer', p: 'One idea, made plain. KPIs, delegation stages, what role clarity actually means.' },
  { bucket: 'Teach', t: 'Framework', p: 'The named way she does it. This is the pillar with the least material on the profile today.' },
  { bucket: 'Story', t: 'Story carousel', p: 'Her own correction: "I probably need to story a carousel and not teach a carousel." Carousels have been the boring format because they have been teaching.' },
  { bucket: 'Belief', t: 'Validation', p: 'Reflect the reality they are living, tell them they are not stupid, then take them to what they should be doing. Sean would run this one third of the time.' },
];

const READ_RULES = [
  'This is the buffet. Every option that came up on the day.',
  'We do not do these all at once.',
  'They will shift as soon as we have data.',
  'Every decision is backed by what is working, and we keep testing.',
  'The goal is fast feedback, so we can simplify.',
];

const PINNED = [
  {
    n: '01',
    t: 'The story',
    lens: 'Why her',
    body: 'Her origin story. Where she was, the leap out of the job, what she can do now. It connects the founder to her rather than to the topic, and it is the one that carries the vision: building cultures that people want to be a part of.',
    note: 'Sean is sending the story template. It gets filled in rather than written from scratch.',
  },
  {
    n: '02',
    t: 'The case study',
    lens: 'It works',
    body: 'Not a testimonial and not a hostage video on Zoom. Frame the person and what they were struggling with, then the exact three things installed. Anchor it in the experience: "the same thing I saw with every one of our leaders when I was leading a team of 100."',
    note: 'CTA: "I did a full walkthrough of exactly what we installed. If you want this, click below."',
  },
  {
    n: '03',
    t: 'The method',
    lens: 'How she does it',
    body: 'The systematised process, owned bluntly. Her own draft in the room: "There is a million different ways to build your leadership team. Most of them suck. Here is how you do it the right way. Every time we do it, we do this."',
    note: 'Or take the post that has already performed and put a real CTA on it.',
  },
];

const BELIEF_MAP = [
  {
    layer: 'Category',
    now: 'My team is incapable. I have hired an idiot. They just do not get it.',
    need: 'The team are equipped. I have not made their roles clear.',
    proof: 'Komatsu, underperforming team. Told through the mechanic, not the size of the company.',
  },
  {
    layer: 'Method',
    now: 'I have explained it to them. They are not listening.',
    need: 'I need to understand how to connect people with processes so they can get to the goal.',
    proof: 'Role clarity, across every client. She has not had to reach for a single one, because it is the same problem every time.',
  },
  {
    layer: 'Founder',
    now: 'They do not need someone to come and teach them. What would you know.',
    need: 'She has actually done the thing.',
    proof: 'Led a team of 100. Educated in HR. The relatability is the differentiator, not the credential on its own.',
  },
  {
    layer: 'Self',
    now: 'I do not know if I am cut out to be a leader. I never wanted to do the people part.',
    need: 'To scale, I need to know exactly how to lead a team and connect my people with the processes that let us grow.',
    proof: 'The founder who is leading but not implementing leadership. Sean named himself as the case study here.',
  },
  {
    layer: 'Timing',
    now: 'I have this other thing on. I will do it after that.',
    need: 'If I do not do this now, the people problem grows faster than the revenue does.',
    proof: 'How simple it turns out to be once someone actually knows what to put in place.',
  },
];

// ─── Production ──────────────────────────────────────────────────────────

const ENVIRONMENTS = [
  { t: 'Home nook', p: 'The default and the one that already works. Different clothes across a batch does the differentiating.' },
  { t: 'Outdoors', p: 'The morning walk. Off the cuff, unpolished, and the natural home for People posts because it is the most relatable of the three.' },
  { t: 'Co-working', p: 'Once a fortnight. She takes meetings there anyway, so the shoot rides along with a day already in the calendar.' },
];

const BREAKS = [
  'Building with nowhere to put it. "I have now just gone and built 20 pieces of content and then I just randomly pick which one I am going to post."',
  'Overwhelm. She named it directly. Too many slots to fill is the failure mode here, not too few.',
  'Aesthetics as the blocker. Her own counter: "no one actually gives a fuck about that. That is a belief that I have."',
];

const FUNNEL = [
  { n: '01', t: 'Organic and boosted', p: 'First touch. Same content, one of them paid.' },
  { n: '02', t: 'The profile', p: 'Bio plus the three pinned posts. This is the step that is broken today.' },
  { n: '03', t: 'CTA or call', p: 'One post in three carries a CTA into ManyChat. The rest of the time the link is a call.' },
  { n: '04', t: 'The lead magnet', p: 'Hyper specific to the problem they just watched. Pulled from the catalogue she already has.' },
  { n: '05', t: 'The email sequence', p: 'Fourteen days. Every fourth one teaches plainly with no story. The rest break one belief each. Every one ends with a PS.' },
  { n: '06', t: 'The call', p: 'All roads lead here. Revenue question on the form so the calls are worth taking.' },
];

// ─── Next steps ──────────────────────────────────────────────────────────

const RESPONSIBILITIES = [
  {
    who: 'Chloe',
    role: 'The whole line',
    count: '3 a week',
    owns: 'Bio, the three pinned posts, the monthly batch, ManyChat, the lead magnet catalogue, the landing page draft.',
  },
  {
    who: 'Sean',
    role: 'Strategy and templates',
    count: 'Per milestone',
    owns: 'The story template, the deeper pass on frustrations, wants and aspirations, the written rundown of the three pinned posts, and the doc that turns the day into instructions.',
  },
];

const LOCKED = [
  'Three posts a week. Not more until it is running on its own.',
  'People, Process, Performance. Nothing outside the three pillars.',
  'One belief, one story, one teach per pillar per month.',
  'Operator, Guide, Mentor. In that order.',
  '"Scaling" and "high growth". Not "operational businesses", which reads as logistics and pulls the wrong room.',
];

const OPEN = [
  'The bio wording. The shape is decided, one signal to experience and one to the outcome. The words are not written.',
  'Whether Komatsu gets named in the story, or told as "a team I was working with". She raised the concern. Sean\'s answer was that it works either way and specificity is more potent.',
  'Which lead magnet the CTAs point at. She has many. The catalogue has not been listed yet.',
  'The metaphor. "I do not really speak in metaphors." It is left out on purpose rather than forced.',
  'The offer shape for going in person. Monthly or quarterly, not decided in the room.',
];

const RISKS = [
  'Referrals keep working. They pay the bills and they remove the pressure that makes this system get built.',
  'The ego. Her own stated takeaway: "I am too cautious about how I am being perceived, instead of just talking about it like it is."',
  'The teach reflex. Every format defaulting back to teaching is what made the carousels boring and the profile read as "I know everything".',
  'Structure without follow through. She has said it about founders all day. It applies here too.',
];

// ─── The avatar ──────────────────────────────────────────────────────────
// Built in the room against Rhys as the model. Fears were explained and never
// answered, so that row is a gap and says so. It does not get filled in from
// somewhere else.

const AVATAR = [
  {
    row: 'Fears',
    when: 'Long term. The bad thing waiting if none of this gets fixed.',
    said: [
      'If I hire again and it goes the same way, that is another year and another salary gone.',
      'The revenue is growing faster than the team can carry and something is going to break.',
      'I am going to be doing this exact job in five years because nobody else can do it properly.',
      'If I take my hands off it for a month the whole thing slides backwards.',
    ],
    unsaid: [
      'I am the reason it is not working, and I think everyone can see it.',
      'I have built something that cannot run without me, which means I have not built a business.',
      'I was never any good with people, and that is the only thing left that I have to be good at.',
      'If I actually let go, I will find out I was not needed.',
    ],
  },
  {
    row: 'Frustrations',
    when: 'Immediate. What is happening this week.',
    said: [
      'I have to do everything myself.',
      'There is no consistency. Nobody is being held to the same standard.',
      'I am not getting what I need out of the team and I do not know how to get it.',
      'Nothing lands when it is supposed to, and I never know in advance whether it will.',
      'I have explained it. They are still not doing it.',
    ],
    unsaid: [
      'My team is incapable.',
      'I have hired an idiot.',
      'They just do not get it.',
      'I am the only one here who actually cares about this.',
      'It is quicker if I just do it, and I know that is the whole problem.',
    ],
  },
  {
    row: 'Wants',
    when: 'Immediate. What they would take today.',
    said: [
      'A team that understands what they own.',
      'People delivering on what they said they would deliver.',
      'My time back.',
      'To spend the week on the work I am actually good at.',
      'One place I can look to know whether we are on track.',
    ],
    unsaid: [
      'To stop being the bottleneck without having to say out loud that I am the bottleneck.',
      'To go away for two weeks and have nothing fall over.',
      'Someone to tell me what good actually looks like, because I have never seen it done properly.',
      'To stop having the same conversation with the same person every six weeks.',
    ],
  },
  {
    row: 'Aspirations',
    when: 'Long term. What they are actually building toward.',
    said: [
      'A business people want to work at.',
      'Attracting the kind of talent I currently cannot get near. "We are not attracting top talent right now because no one knows who we are."',
      'Growth that does not cost me my weekends.',
      'A leadership team that runs it, so I get to work on it instead of in it.',
    ],
    unsaid: [
      'To be the one people ring for advice, instead of the one asking.',
      'To look competent to the people whose opinion I actually care about.',
      'To be the founder other founders point at.',
      'To find out I was capable of building something bigger than me.',
    ],
  },
];

// The rest of the avatar, in the shape the approved builds use.
const AVATAR_PROFILE = [
  { k: 'Named', v: 'PROPOSED, needs Sean to tick: "Stretched Sam." A founder who has grown past the point where they can hold every relationship themselves, and has no leadership layer underneath them.' },
  { k: 'Demographics', v: 'Scaling and high growth founders, roughly 10 to 20 people. Revenue climbing faster than the team can carry it. Sean mapped the stages in the room: zero to three is chaos hiring, three to ten is where it visibly stops working, and ten to twenty is where a founder finally says they need an actual leadership team, having got it wrong the whole way up.' },
  { k: 'Primary emotions', v: 'Stretched, doing two jobs and neither of them properly. Quietly resentful that nobody else appears to care as much. Embarrassed that the people part is the bit they cannot do.' },
  { k: 'What they believe now', v: 'I am the most capable person here and I always will be. The team is the constraint.' },
  { k: 'What they must believe to buy', v: 'The team is equipped. I have not made their roles clear, and I have never told them what good looks like.' },
  { k: 'What they have tried', v: 'Explained it again, and again. Mandated it, then did it themselves anyway. Hired someone more senior and hoped it would sort itself out. Threw money at it, a pay rise instead of a conversation. Flattened the structure and called it culture, so now everyone reports to them. Generated a job description by pasting a task list into a chatbot. Moved the one on one three times, then cancelled it.' },
  { k: 'Why they buy now', v: 'The revenue says they have arrived and the team says they have not. The distance between those two is what finally makes them act.' },
  { k: 'The buy moment', v: 'The week a good person resigns, or something misses in front of a client, and it is unmistakably a people problem rather than a market problem.' },
  { k: 'How they buy', v: 'Referral and reputation today. The plan is a founder who watches enough to recognise themselves, self identifies against the four checkpoints on the page, and books.' },
  { k: 'What it actually means', v: 'They think they need better people. They need role clarity and a way to measure, and they need to hear it from someone who has run a team rather than read about one.' },
];

const HOOK_FORMULA = {
  shape: 'Frustration, then aspiration, in their own words.',
  worked: 'If every time I walked out of a meeting I was saying to myself, I think I hired an idiot, this is exactly what I would do so I could attract top talent and start building a team people actually want to be a part of.',
  note: 'Sean built ten of these in the room from one pair of rows. The bank recycles every three months, because the frustrations do not change.',
};

const FOUR_WAYS = [
  { t: 'Stories', p: 'Hers. The way she is uniquely different, and what almost everyone leaves out when they try to make something travel.' },
  { t: 'Data', p: 'Her numbers. A figure from something she actually ran, or a study that backs the point.' },
  { t: 'Methods', p: 'The mechanism. Something she found in the doing, or simply the way she does it. This is mine.' },
  { t: 'Case studies', p: 'Theirs. Stories are her, case studies are them. Same job, different subject.' },
];

const KOMATSU = [
  'There were three fundamental principles that every single one of my clients always got wrong.',
  'The way I learned it was leading a team of 100.',
  'What I have seen since is that the problems all distil into the same buckets.',
  'There is no difference between a 100 person team and a five person team, because if you get it right at five, you can grow to 100.',
];

// What she has seen go wrong, and what she has seen work. Pulled straight from
// the room. This is the post bank: one line here is one piece of content.

const GETS_WRONG = [
  'Leaders magically develop as the business grows.',
  'You can throw money at a people problem.',
  'Structure is not important.',
  'All the weight goes on revenue because revenue is going well, and the people side gets left.',
  'The people side is avoided because nobody knows how to address it.',
  'Assuming people already understand their roles.',
  'Not holding anyone accountable to anything.',
  'Avoiding the conversation until it is far bigger than it needed to be.',
  'No real measure of performance. "If you cannot measure them, what are you holding them accountable to?"',
  'KPIs that sound right and measure nothing. "If my role is leads, what are you tracking me for?"',
  'Thinking it is quicker to do it yourself, so nobody ever learns to do it.',
  'Not doing what you said you would do, which is how a leader stops being trusted.',
  'Moving or cancelling the one on one, which tells the person exactly what they are worth.',
  'Generating a job description by pasting a task list into a chatbot, with no idea what the role actually needs.',
  'Flattening the structure so everyone reports to the CEO, instead of teaching people how to manage.',
  'No future focus for the people, only for the revenue.',
  'Not making the role attractive enough to keep anyone good in it.',
];

const WHAT_WORKS = [
  'Consistency.',
  'Follow through.',
  'Humanising yourself. Being reachable rather than behind a closed door.',
  'One on ones with a structure, held every time.',
  'KPIs that get measured, not just written.',
  'Giving the team a real way to give feedback.',
  'Shared language across the team. "If you are not actually speaking that way, the culture book is just a book."',
  'Knowing what drives each person, and what they want in three years and in ten.',
];

// ─── Nav ─────────────────────────────────────────────────────────────────

type TabDef = { id: string; label: string; sections: Array<{ id: string; label: string }> };

const TABS: TabDef[] = [
  {
    id: 'start',
    label: 'Start here',
    sections: [
      { id: 'scores', label: 'Diagnosis' },
      { id: 'w1', label: 'Week 1' },
      { id: 'w2', label: 'Week 2' },
      { id: 'w3', label: 'Week 3' },
      { id: 'w4', label: 'Week 4' },
      { id: 'order', label: 'Why the order' },
      { id: 'today', label: 'Today' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    sections: [
      { id: 'position', label: 'The positioning' },
      { id: 'against', label: 'For and against' },
      { id: 'principles', label: 'Principles' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    sections: [
      { id: 'capture', label: 'Capture / Create' },
      { id: 'formats', label: 'Formats' },
      { id: 'pinned', label: 'The three posts' },
      { id: 'avatar', label: 'The avatar' },
      { id: 'hooks', label: 'Hooks' },
      { id: 'bank', label: 'The bank' },
      { id: 'beliefs', label: 'The belief map' },
    ],
  },
  {
    id: 'production',
    label: 'Production',
    sections: [
      { id: 'week', label: 'The week' },
      { id: 'batch', label: 'The batch' },
      { id: 'envs', label: 'Environments' },
      { id: 'funnel', label: 'The funnel' },
      { id: 'breaks', label: 'What breaks it' },
    ],
  },
  {
    id: 'next',
    label: 'Next steps',
    sections: [
      { id: 'resp', label: 'Responsibilities' },
      { id: 'locked', label: 'Locked' },
      { id: 'open', label: 'Open' },
      { id: 'risks', label: 'Risks' },
    ],
  },
];

const SECTION_TAB: Record<string, string> = Object.fromEntries(
  TABS.flatMap((t) => t.sections.map((s) => [s.id, t.id])),
);

function scrollToNav() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function usePlanNav() {
  const [sec, setSec] = React.useState<string>(() => {
    if (typeof window === 'undefined') return 'scores';
    const s = new URLSearchParams(window.location.search).get('s');
    if (s && SECTION_TAB[s]) return s;
    const t = new URLSearchParams(window.location.search).get('t');
    const found = TABS.find((x) => x.id === t);
    return found ? found.sections[0].id : 'scores';
  });

  const tab = SECTION_TAB[sec] ?? 'start';

  const write = React.useCallback((nextSec: string) => {
    setSec(nextSec);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('t', SECTION_TAB[nextSec]);
    url.searchParams.set('s', nextSec);
    window.history.replaceState({}, '', url);
    scrollToNav();
  }, []);

  const changeTab = React.useCallback(
    (id: string) => {
      const found = TABS.find((x) => x.id === id);
      if (found) write(found.sections[0].id);
    },
    [write],
  );

  return { tab, sec, changeTab, changeSec: write };
}

function SubTabs({ sections, active, onChange }: { sections: Array<{ id: string; label: string }>; active: string; onChange: (id: string) => void }) {
  if (sections.length < 2) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`relative py-2 text-[13px] font-medium transition-colors ${
            active === s.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {s.label}
          {active === s.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-blue-500" />}
        </button>
      ))}
    </div>
  );
}

function Card({ kicker, title, children }: { kicker?: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
      {kicker && (
        <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-2">{kicker}</p>
      )}
      <p className="font-display text-[16px] font-extrabold text-white mb-2">{title}</p>
      <div className="text-zinc-400 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function TheCultivatedPlan() {
  const { tab, sec, changeTab, changeSec } = usePlanNav();
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PasswordGate storageKey="cultivated-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="The Plan, Cultivated"
          description="The Strategy Day, bucketed by core function. Diagnosis, positioning, the three posts, the weekly rhythm, and what happens first."
          path="/thecultivatedplan"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Strategy reference"
          title="The"
          accent="Plan."
          blurb="The whole Strategy Day, bucketed by core function. Where the bottleneck is. What we decided. What gets built first."
          backHref={null}
        />

        <div className="sticky top-0 z-40 border-y border-zinc-800 bg-base/95 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="pt-5 pb-4 -mb-10">
              <Tabs tabs={TABS.map((t) => ({ id: t.id, label: t.label }))} active={tab} onChange={changeTab} />
            </div>
            {current.sections.length > 1 && (
              <div className="border-t border-zinc-800/70">
                <SubTabs sections={current.sections} active={sec} onChange={changeSec} />
              </div>
            )}
          </div>
        </div>

        {/* ═══ START HERE ═══ */}
        {WEEKS.some((w) => w.id === sec) && <FourWeeks wk={sec} onWeek={changeSec} />}

        {sec === 'scores' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The scores</p>
            <H2>The bottleneck scores.</H2>
            <Note>Self rated in the room, out of five.</Note>
            <div className="mt-8">
              <Scores items={SCORES} />
            </div>
            <div className="mt-10">
              <Block label="Notes">
                <BulletList
                  items={[
                    'Three months into running it without a job. The content engine already exists: coaching transcripts in, real problems out.',
                    'Word of mouth generates the leads. Content does not. That gap is the entire plan.',
                    'The making is not the constraint. Ten reels get recorded in under an hour.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'order' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Why the order</p>
            <H2>Each one is downstream of the last.</H2>
            <Note>This is why the profile gets fixed before a dollar goes behind anything.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Clarity is first contact.</b> A founder who cannot place themselves in the bio leaves, and everything downstream is wasted on them.</>,
                  <><b className="text-white font-semibold">Visibility only pays once clarity is up.</b> At a 1, the instinct is to push reach. Pushing reach at a clarity of 3 just shows more people something they cannot act on.</>,
                  <><b className="text-white font-semibold">Authority answers whether she has actually done this.</b> A team of 100 and an operations background, said out loud. It is the score with the most raw material and the least output.</>,
                  <><b className="text-white font-semibold">Quality is the last mile.</b> Referrals already arrive pre sold. The job is making content do the same thing instead of borrowing it from someone else.</>,
                ]}
              />
            </div>
          </Wrap>
        )}

        {sec === 'today' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Today</p>
            <H2>The numbers on the table.</H2>
            <Note>Where it sits before anything changes.</Note>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <Card title="The target">
                30k months, on a six month roadmap. 10k was the number named first, then corrected: "10k was at the point of supplementing my income. Not the aspiration."
              </Card>
              <Card title="The hours">
                15 to 20 a week. Four to six hours a day across five days, or four hours across six or seven.
              </Card>
              <Card title="The shape">
                Around five clients, capped at three hours per client per week. Productised, so it is built once and run many times.
              </Card>
              <Card title="The making">
                Under an hour to record ten reels. One to two hours to edit them. Production has never been the bottleneck.
              </Card>
              <Card title="Where leads come from">
                Word of mouth. "My content does not generate leads." The funnel does not exist yet.
              </Card>
              <Card title="In person">
                Wanted, not scaled back. Flying to a client and working with their team is part of the model, not an exception to it.
              </Card>
            </div>
          </Wrap>
        )}

        {/* ═══ BRAND ═══ */}
        {sec === 'position' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Positioning</p>
            <H2>Leadership that scales with the revenue.</H2>
            <Note>Category of ownership: leadership, for high growth and scaling businesses.</Note>

            <div className="mt-8">
              <Block label="The line">
                <p className="text-zinc-200 text-[15px] leading-relaxed">
                  She helps you make sure your leadership matches your revenue growth.
                </p>
              </Block>
            </div>

            <div className="mt-6 grid gap-3">
              <Card kicker="In her words" title="What she actually does">
                "I understand operations and how to remove waste in your process and get the people doing the things you need them to do."
              </Card>
              <Card kicker="The compression" title="The version that travels">
                I help founders get more done in less time, through people and processes.
              </Card>
              <Card kicker="Mission" title="The problem she exists to solve">
                Scaling founders whose growth has outrun their leadership. The failure state is a founder who gets stuck, and a founder who stops evolving.
              </Card>
              <Card kicker="Vision" title="What she is actually building toward">
                "Building cultures that people want to be a part of." Because everyone has to earn a living somewhere, and most people hate where they do it.
              </Card>
            </div>

            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">The buckets she gets read into</p>
              <div className="grid gap-3 md:grid-cols-3">
                {ARCHETYPES.map((a) => (
                  <Card key={a.n} kicker={a.n} title={a.name}>{a.note}</Card>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Block label="The language decision">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Out: "operational businesses".</b> It reads as manufacturing and logistics, and it lands with CEOs and GMs in 20 plus headcount businesses. Not the room she wants.</>,
                    <><b className="text-white font-semibold">In: "scaling" and "high growth".</b> It is a compliment, so founders self identify into it. Her own read: she changed the language and started having conversations with founders instead of employees who think their boss is a dick.</>,
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'against' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">For and against</p>
            <H2>The enemy is the bureaucratic manager.</H2>
            <Note>An industry enemy gives every belief post something to push against.</Note>
            <div className="mt-8">
              <Block label="What she stands against">
                <BulletList items={AGAINST} />
              </Block>
            </div>
            <div className="mt-6">
              <Block label="Who this is not for">
                <BulletList items={NOT_FOR} />
              </Block>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Card kicker="Refuses" title="Even if it pays">
                Coming in and managing it for you instead of teaching you to do it. "I am not a rent a cop."
              </Card>
              <Card kicker="Will do" title="Even if it costs">
                Anything that falls under people. She is educated in HR, so recruitment, hiring, people management and performance management are all inside the fence, even when they are not the focus.
              </Card>
            </div>
          </Wrap>
        )}

        {sec === 'principles' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Principles</p>
            <H2>The three pillars, and the rules underneath them.</H2>
            <Note>Every post belongs to one pillar. The rules decide how it gets made.</Note>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {PILLARS.map((p) => (
                <Card key={p.name} title={p.name}>{p.note}</Card>
              ))}
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <Card key={p.t} title={p.t}>{p.p}</Card>
              ))}
            </div>
          </Wrap>
        )}

        {/* ═══ CONTENT ═══ */}
        {sec === 'capture' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Capture and create</p>
            <H2>Two ways to get it out of her head.</H2>
            <Note>
              This is a buffet. It is not everything. It is simply showing what options we came up with on the day. There are two types.
            </Note>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <Card kicker="Capture" title="She is there, someone else is there">
                No scripts. She demonstrates instead of presents. The engine already runs on this: coaching transcripts in, the client's real problems out, written back in her own language rather than a chatbot's. The unbuilt half is the same thing pointed at her own story, so the personal material has somewhere to come from.
              </Card>
              <Card kicker="Create" title="She comes in with the script">
                Higher effort, and where the carousel lives. Worth it for the pinned posts and the belief pieces, not for the weekly three.
              </Card>
            </div>
            <div className="mt-6">
              <Block label="The one she has not used yet">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Sit down with someone she trusts for an hour and have them poke at her past. Sean's framing: the hippocampus opens and floods you with experiences you would never have listed. Two hours of that is the story bank for a year. Right now every format defaults to teaching, which is exactly what makes the profile read as "I know everything".
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'formats' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Formats</p>
            <H2>The format library.</H2>
            <Note>These are all the formats. These are not the formats we need to do all at once.</Note>
            <div className="mt-8">
              <Block label="How to read this">
                <ol className="space-y-2">
                  {READ_RULES.map((r, i) => (
                    <li key={i} className="flex gap-3 text-zinc-300 text-[14px] leading-relaxed">
                      <span className="text-blue-400 font-semibold tabular-nums flex-shrink-0">{i + 1}</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {FORMATS.map((f) => (
                <Card key={f.t} kicker={f.bucket} title={f.t}>{f.p}</Card>
              ))}
            </div>
          </Wrap>
        )}

        {sec === 'pinned' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The three posts</p>
            <H2>What sits at the top of the profile.</H2>
            <Note>This is the clarity fix. Three posts that answer the three questions a founder arrives with.</Note>

            <div className="mt-8">
              <Block label="The bio, first">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  One signal to the experience. One signal to the outcome, specific enough to be believable. The business name already carries the leadership frame, so the bio does not have to spend a word on it.
                </p>
              </Block>
            </div>

            <div className="mt-6 grid gap-3">
              {PINNED.map((p) => (
                <div key={p.n} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-blue-400 text-[12px] font-semibold tabular-nums">{p.n}</span>
                    <p className="font-display text-[16px] font-extrabold text-white">{p.t}</p>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">{p.lens}</span>
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">{p.body}</p>
                  <p className="text-zinc-300 text-[13px] leading-relaxed mt-3 border-l-2 border-blue-500/50 pl-4">{p.note}</p>
                </div>
              ))}
            </div>
          </Wrap>
        )}

        {sec === 'avatar' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The avatar</p>
            <H2>What they say, and what they would never say.</H2>
            <Note>
              Written in the founder's own voice, because that is how it gets used. The right hand column is where
              the hooks come from: nobody has ever said those words out loud, so hearing them back is the whole effect.
            </Note>

            <div className="mt-8 grid gap-3">
              {AVATAR.map((a) => (
                <div key={a.row} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                  <div className="mb-4">
                    <p className="font-display text-[17px] font-extrabold text-white">{a.row}</p>
                    <p className="text-zinc-500 text-[12px] mt-0.5">{a.when}</p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-2">Said out loud</p>
                      <ul className="space-y-2">
                        {a.said.map((x, i) => (
                          <li key={i} className="text-zinc-400 text-[14px] leading-relaxed">{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-2">Never said</p>
                      <ul className="space-y-2">
                        {a.unsaid.map((x, i) => (
                          <li key={i} className="text-zinc-300 text-[14px] leading-relaxed">{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">The rest of the picture</p>
              <dl className="border-t border-zinc-800">
                {AVATAR_PROFILE.map((f) => (
                  <div key={f.k} className="border-b border-zinc-800/70 py-4">
                    <dt className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-1.5">{f.k}</dt>
                    <dd className="text-zinc-400 text-[14px] leading-relaxed">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <Block label="How to use this">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Every hook is one line from the left column and one from the right, or one frustration handed back
                  as an aspiration. Ten of them built once will carry a quarter, because the frustrations do not change.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'hooks' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Hooks</p>
            <H2>Take a frustration. Hand back an aspiration.</H2>
            <Note>Both columns already exist on the avatar page. The hook is one of each, in their words.</Note>

            <div className="mt-8">
              <Block label="The shape">
                <p className="text-zinc-300 text-[15px] leading-relaxed mb-4">{HOOK_FORMULA.shape}</p>
                <p className="text-zinc-200 text-[15px] leading-relaxed border-l-2 border-blue-500/50 pl-4">
                  {HOOK_FORMULA.worked}
                </p>
                <p className="text-zinc-500 text-[13px] mt-4">{HOOK_FORMULA.note}</p>
              </Block>
            </div>

            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">Four ways to teach it</p>
              <Note>Everyone defaults to teaching. These are the other three, and they are what makes it hers rather than anyone's.</Note>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {FOUR_WAYS.map((f) => (
                  <Card key={f.t} title={f.t}>{f.p}</Card>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Block label="The story, as Sean told it back to her">
                <p className="text-zinc-500 text-[13px] mb-4">
                  The Komatsu story on its own is too big to be relatable. Told this way it stays aspirational and becomes transferable, which is the whole point.
                </p>
                <div className="space-y-2">
                  {KOMATSU.map((l, i) => (
                    <p key={i} className="text-zinc-200 text-[15px] leading-relaxed">{l}</p>
                  ))}
                </div>
              </Block>
            </div>

            <div className="mt-6">
              <Block label="Validation, one third of the time">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Reflect the reality they are living so they feel seen. Tell them they are not stupid for being in it. Then take them to what they should be doing instead. Sean would run this arc more than any other, because validation is the most valuable thing a piece of content can give someone.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'bank' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The bank</p>
            <H2>Twenty five posts, already written down.</H2>
            <Note>Every line here is a piece of content. This came out of the room, in her words, and none of it has been used yet.</Note>
            <div className="mt-8">
              <Block label="What founders get wrong">
                <BulletList items={GETS_WRONG} />
              </Block>
            </div>
            <div className="mt-6">
              <Block label="What she has seen work">
                <BulletList items={WHAT_WORKS} />
              </Block>
            </div>
            <div className="mt-6">
              <Block label="How to use it">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Pair one from each list and it is a belief post. Take one on its own and it is a teach. Attach the founder it happened to and it is a case study. The bank does not run out, because these are the same problems in every business she walks into.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'beliefs' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The belief map</p>
            <H2>Every piece of content has a job.</H2>
            <Note>That job is to break one belief. Five layers, in this order, because each one opens the next.</Note>
            <div className="mt-8 grid gap-3">
              {BELIEF_MAP.map((b) => (
                <div key={b.layer} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                  <p className="font-display text-[15px] font-extrabold text-white mb-4">{b.layer}</p>
                  <dl className="border-t border-zinc-800/70">
                    <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
                      <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[92px] flex-shrink-0 pt-1">Believes now</dt>
                      <dd className="text-zinc-400 text-[14px] leading-relaxed">{b.now}</dd>
                    </div>
                    <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
                      <dt className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 w-[92px] flex-shrink-0 pt-1">Must believe</dt>
                      <dd className="text-zinc-300 text-[14px] leading-relaxed">{b.need}</dd>
                    </div>
                    <div className="flex gap-3 border-b border-zinc-800/70 py-2.5">
                      <dt className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 w-[92px] flex-shrink-0 pt-1">Proof</dt>
                      <dd className="text-zinc-400 text-[14px] leading-relaxed">{b.proof}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </Wrap>
        )}

        {/* ═══ PRODUCTION ═══ */}
        {sec === 'week' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The week</p>
            <H2>Three posts. One per pillar.</H2>
            <Note>Three is the base, not the limit. Anything good gets poured on top.</Note>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {PILLARS.map((p) => (
                <Card key={p.name} kicker="One a week" title={p.name}>{p.note}</Card>
              ))}
            </div>
            <div className="mt-8">
              <Block label="The month">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Across the month, each pillar gets one belief, one story and one teach. That is nine slots and twelve posts, so there is room for whatever turns up without breaking the shape. It also stops every piece defaulting to teach, which is the pattern she wants out of.
                </p>
              </Block>
            </div>
            <div className="mt-6">
              <Block label="The rule">
                <p className="text-zinc-300 text-[14px] leading-relaxed">
                  If it is not on the calendar it does not get posted. Ideas do not jump the queue. They go in the queue.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'batch' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The batch</p>
            <H2>One sitting a month.</H2>
            <Note>These are her numbers, not an estimate.</Note>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <Card kicker="Recording" title="Under 1 hour">Ten reels. Already proven, repeatedly.</Card>
              <Card kicker="Editing" title="1 to 2 hours">The same ten. "It is not a lot of time for me to do that now."</Card>
              <Card kicker="Cadence" title="Monthly">Plus the fortnightly co-working day, which picks up anything the batch missed.</Card>
            </div>
            <div className="mt-8">
              <Block label="Why batching is the whole fix">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  The problem has never been making it. It is that things get made with no schedule to receive them, so they sit. A batch that is shot against a calendar is the difference between twelve pieces of content and twelve posts.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'envs' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Environments</p>
            <H2>Three places, so it stops looking like one.</H2>
            <Note>Differentiation is the job here, not production value.</Note>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {ENVIRONMENTS.map((e) => (
                <Card key={e.t} title={e.t}>{e.p}</Card>
              ))}
            </div>
            <div className="mt-8">
              <Block label="On it looking good">
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  Her own answer, before anyone offered one: "no one actually gives a fuck about that. That is a belief that I have." She watches ugly content and listens to what is said. Some pieces can be aesthetic. The off the cuff ones are supposed to look off the cuff.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'funnel' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The funnel</p>
            <H2>The simplest thing that turns a view into a call.</H2>
            <Note>Built once. Every step already exists or is a week of work.</Note>
            <div className="mt-8 grid gap-3">
              {FUNNEL.map((f) => (
                <Card key={f.n} kicker={f.n} title={f.t}>{f.p}</Card>
              ))}
            </div>
            <div className="mt-8">
              <Block label="The page at the end">
                <BulletList
                  items={[
                    'A video that opens on pain, then promise, plan, proof and picture. It does not need producing. It needs making.',
                    'Four checkpoints underneath it so a founder can self identify which problem is theirs.',
                    'A revenue question before the booking. More friction is correct here. The point is to not spend the week on calls that were never going anywhere.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'breaks' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">What breaks it</p>
            <H2>The three ways this stops.</H2>
            <Note>All three were named in the room by her, not diagnosed from outside.</Note>
            <div className="mt-8">
              <Block label="Failure modes">
                <BulletList items={BREAKS} />
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══ NEXT STEPS ═══ */}
        {sec === 'resp' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Responsibilities</p>
            <H2>If a line has no name against it, it does not happen.</H2>
            <Note>Two names, because there are two people.</Note>
            <div className="mt-8 grid gap-3">
              {RESPONSIBILITIES.map((r) => (
                <div key={r.who} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                    <p className="font-display text-[16px] font-extrabold text-white">{r.who}</p>
                    <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[12px] font-semibold text-blue-300">
                      {r.count}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Role</p>
                  <p className="text-zinc-300 text-[14px] mb-4">{r.role}</p>
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-1">Owns</p>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">{r.owns}</p>
                </div>
              ))}
            </div>
          </Wrap>
        )}

        {sec === 'locked' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Locked</p>
            <H2>Not up for debate for four weeks.</H2>
            <Note>Changing these mid month is how the last system fell over.</Note>
            <div className="mt-8">
              <Block label="Locked">
                <BulletList items={LOCKED} />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'open' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Open</p>
            <H2>Deliberately not decided.</H2>
            <Note>These were left open in the room. They are not oversights.</Note>
            <div className="mt-8">
              <Block label="Still open">
                <BulletList items={OPEN} />
              </Block>
            </div>
          </Wrap>
        )}

        {sec === 'risks' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Risks</p>
            <H2>What could quietly kill it.</H2>
            <Note>None of these announce themselves.</Note>
            <div className="mt-8">
              <Block label="Risks">
                <BulletList items={RISKS} />
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══ INDEX ═══ */}
        <Divider />
        <Wrap>
          <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Index</p>
          <H2>Everything in here.</H2>
          <Note>Five tabs. Click anything to jump straight to it.</Note>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {TABS.map((t) => (
              <div key={t.id} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
                <p className="font-display text-[15px] font-extrabold text-white mb-3">{t.label}</p>
                <div className="flex flex-col items-start gap-1.5">
                  {t.sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => changeSec(s.id)}
                      className={`text-left text-[14px] transition-colors ${
                        sec === s.id ? 'text-blue-400 font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Wrap>

        <Footer />
      </div>
    </PasswordGate>
  );
}
