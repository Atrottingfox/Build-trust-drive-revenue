import React from 'react';
import { Shell, PageHead, Wrap, Divider, Block, BulletList, Note, H2 } from '../components/undeniable/Bits';

// Sean (2026-06-15): six core demand buckets pulled from the session.
// Each bucket = the problem the ICP is fighting + the inverse (what they
// want if it dissolves) + 4-5 fractured, hyper-specific angles. Each angle
// can produce 1 long-form + multiple shorts. Six buckets x five angles =
// 30 named pieces before the backlog.

interface Bucket {
  name: string;
  problem: string;
  inverse: string;
  angles: string[];
}

const BUCKETS: Bucket[] = [
  {
    name: '01 · Retention math · the inverse lever',
    problem: 'Losing more clients than you sign and not seeing it from the dashboard. Every month resets a little lower than the last.',
    inverse: 'Net zero churn. The room of clients stays full. New signings stop being survival.',
    angles: [
      'The $800k math no one runs · live the calculation on the phone',
      '3% churn equals 60% of the business gone every year',
      'The exit interview gap · why you do not know why they leave',
      'The over-deliver trap · pricing pegged to fear of loss',
      'The first 90 days · where most retention is won or lost',
    ],
  },
  {
    name: '02 · The logical operator · math, data, receipts',
    problem: 'Hype eats logic. The show ponies get the attention. The operators get drowned out by louder claims they cannot back.',
    inverse: 'Winning on receipts. Clear math people cannot argue with. The graph that ends the conversation.',
    angles: [
      '100 clients times 15-minute check-ins equals a 40-hour week',
      'Profit vs revenue · the higher bracket nobody talks about',
      'Tax, GST and a lifestyle you already adjusted to',
      'Show pony vs logical guy · be the latter on the phone',
      'Do the math live · pull out the phone and run their numbers',
    ],
  },
  {
    name: '03 · Scale without losing the craft',
    problem: 'They think scaling means watering down. So they cap themselves at the size their craft survives.',
    inverse: 'Quality coaching at 350 clients. The art of coaching does not have to die at scale.',
    angles: [
      'Art of coaching at scale · the systems that protect the craft',
      '35 brilliant clients vs 350 average ones · which has more impact',
      'Income buys you impact · the duty argument',
      'Build big if you are impact-driven · the moral case',
      '"Have your cake and eat it too" · the false binary',
    ],
  },
  {
    name: '04 · Coaching as career, not hobby',
    problem: 'The industry treats you like a PT even at 10K a month. The status doesn\'t age up. The pricing doesn\'t age up. The respect doesn\'t age up.',
    inverse: 'A career path with status, depth, and money. An industry that ages up with you.',
    angles: [
      'Old way · coaching as a hobby. New way · coaching as a career.',
      '"Just a PT" · the status anxiety running over 10K',
      'Aging up with the market · why most coaches cannot',
      '13 years that almost killed me · what almost broke and why',
      'The career path nobody mapped · what it actually looks like',
    ],
  },
  {
    name: '05 · Distribution as a system',
    problem: 'They are posting. They think that is marketing. There is no ecosystem, no sequence, no architecture behind the feed.',
    inverse: 'An ecosystem that converts trust to revenue. Distribution as a system, not vibes.',
    angles: [
      'Just showing up online is not marketing',
      'Loom check-ins vs written · scale and quality at once',
      'Sales as a separate skill from coaching',
      'Marketing as a separate skill from sales',
      'Content as ecosystem, not feed · how the pieces connect',
    ],
  },
  {
    name: '06 · The proof economy · scepticism + receipts',
    problem: 'They have been sold to. They are scared to be burned again. So they stay smaller and learn nothing.',
    inverse: 'Receipts they can verify. Tests they can run. A track record that survives scrutiny.',
    angles: [
      'Worst case · stay the same. Best case · get wealthier.',
      'Test me in person · the freeball argument',
      'Check the receipts · the data layer most coaches skip',
      'I have battle scars so you do not have to',
      'The Reddit thread test · what if the worst case is fine?',
    ],
  },
];

interface EnvSlot {
  name: string;
  tone: string;
  style: string;
  fits: string[];
}

const ENVIRONMENTS: EnvSlot[] = [
  {
    name: 'The gym',
    tone: 'Casual · connected',
    style: 'Story, mindset, pain',
    fits: [
      'Real client moments and transformations',
      'Hot takes between sets',
      'The "almost killed me" anecdotes',
      'Documentary-style B-roll of the work',
    ],
  },
  {
    name: 'The park · walking',
    tone: 'Reflective · contrarian',
    style: 'Belief, frame, philosophy',
    fits: [
      'Belief flips · old way vs new way',
      'The "fight me" takes',
      'Long-form thoughts captured in motion',
      'Why-this-matters reframes',
    ],
  },
  {
    name: 'Whiteboard · office',
    tone: 'Structured · authoritative',
    style: 'Teach, demonstrate, draw',
    fits: [
      'Frameworks drawn live',
      'The inverse lever visualisation',
      'Live math on a real business',
      'This-this-that demonstrations',
    ],
  },
  {
    name: 'Hallway · talking head',
    tone: 'Direct · concise',
    style: 'Single line, single number',
    fits: [
      'The single number, nonchalant',
      'One-liner truths',
      'Binary choices · two paths',
      'Hooks delivered cold',
    ],
  },
  {
    name: 'Home · kitchen',
    tone: 'Vulnerable · intimate',
    style: 'Worst-day stories, personal stakes',
    fits: [
      'The "I almost lost it all" pieces',
      'Family in the background, casually',
      'Quieter, slower hot takes',
      'The "here is what I learned" reflections',
    ],
  },
];

export default function UndeniableDemandBuckets() {
  return (
    <Shell
      title="Demand Buckets · Undeniable"
      description="Six core problem-and-inverse buckets the ICP is fighting with, plus the environments and content styles that sit native to each."
      path="/undeniablenextsteps/demand-buckets"
    >
      <PageHead
        eyebrow="Strategy · The map"
        title="Demand"
        accent="Buckets."
        blurb="Six core problems the ICP is fighting with, and the inverse · what they want if those problems dissolve. Each bucket holds four to five hyper-specific angles. Every piece of content slots into a bucket in ten seconds."
      />
      <Divider />

      <Wrap>
        <H2>The six buckets.</H2>
        <Note>Problem framing on the left of the brain. Inverse on the right. Angles are the production pipeline · each can become one long-form plus multiple shorts.</Note>
        <div className="mt-10 space-y-16">
          {BUCKETS.map((b) => (
            <div key={b.name}>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-[-0.02em] leading-tight mb-6">{b.name}</h3>
              <div className="grid md:grid-cols-2 gap-5 mb-6">
                <Block label="Problem">
                  <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed">{b.problem}</p>
                </Block>
                <Block label="Inverse · what they want if it dissolves">
                  <p className="text-zinc-300 text-[14px] md:text-[15px] leading-relaxed">{b.inverse}</p>
                </Block>
              </div>
              <Block label="Angles">
                <BulletList items={b.angles} />
              </Block>
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      <Wrap>
        <H2>Environments x style.</H2>
        <Note>Each environment carries a default tone. Match the bucket and the angle to the environment that lets it land. Five environments, five voices, all the same person.</Note>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {ENVIRONMENTS.map((e) => (
            <div key={e.name} className="rounded-2xl border border-zinc-800 bg-elevated/50 p-6">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <h3 className="font-display text-lg font-extrabold text-white tracking-tight">{e.name}</h3>
                <span className="text-blue-400 text-[11px] font-semibold uppercase tracking-widest">{e.tone}</span>
              </div>
              <p className="text-zinc-400 text-[13px] leading-relaxed mb-4 italic">{e.style}</p>
              <BulletList items={e.fits} />
            </div>
          ))}
        </div>
      </Wrap>

      <Divider />

      <Wrap>
        <H2>How to use the map.</H2>
        <BulletList items={[
          <><b className="text-white font-semibold">Pick a bucket per shoot day.</b> One bucket. One angle. Three to five pieces. Then move on.</>,
          <><b className="text-white font-semibold">Cross-pollinate the angles.</b> A retention-math angle can land in the gym (story) or at the whiteboard (live math). Same angle, two environments.</>,
          <><b className="text-white font-semibold">Track which bucket converts.</b> After 30 days, look at saves, watch time, and DM volume by bucket. Lock the top two. Trim the rest.</>,
          <><b className="text-white font-semibold">Add a seventh only when one breaks.</b> If an angle stops landing, retire the bucket. Don't dilute the map by adding more.</>,
        ]} />
      </Wrap>
    </Shell>
  );
}
