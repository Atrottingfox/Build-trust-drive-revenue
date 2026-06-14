import React from 'react';
import { Shell, PageHead, Wrap, Divider, Block, H2, Note } from '../components/undeniable/Bits';

const KICKOFF: Array<{ title: string; tone: string; rows: string[] }> = [
  { title: 'Education kick-off', tone: 'blue', rows: [
    'Hook = clear promise + length ("In 60 seconds...")',
    'One problem. Not three.',
    'Path / solution including a tool OR a "don\'t do this"',
    'Optional CTA: share / save / comment / follow',
    'Native bridge to an asset at ~1/3, or CTA at the end',
  ]},
  { title: 'Heart kick-off', tone: 'zinc', rows: [
    'Relatable experience (the scar: pain, money)',
    'The damaging admission / vulnerability',
    'The lesson',
    'Empathy with where they are (not putting himself down)',
    'Lo-fi, chill. Not polished, not salesy',
  ]},
];

type Short = { n: string; tag: string; hook: string; problem: string; path: string; cta: string };

const SHORTS: Short[] = [
  { n: '01', tag: 'Churn', hook: 'My client lost $800,000 and never even knew it.', problem: 'Most coaches count leads coming in. None of them count clients leaking out.', path: 'Do the math: clients in vs out over 12 months. Above 3% churn and you\'re losing 60% of your business a year. Draw the leaky bucket.', cta: 'Comment "CHURN" for the calculator.' },
  { n: '02', tag: 'The math', hook: 'Online coaches think they work a lot. Let\'s actually do the math.', problem: 'You feel flat out at 30 clients and call yourself busy.', path: '100 clients x 15-min check-ins = 25 hours. Add comms, content, program updates. You\'ve finally worked a 40-hour week with 100 clients. You\'re not maxed, you\'re inefficient.', cta: 'Save this and do your own math.' },
  { n: '03', tag: 'Just a PT', hook: 'If you\'re sick of being called just a PT, even though you\'re over 10K, I finally worked out why.', problem: 'Your business is built like a PT\'s. 12-16 week clients, churn ignored.', path: 'Extend retention to 32 weeks on average. That\'s an instant double on the back end, and marketing gets easier.', cta: 'Full breakdown on the channel.' },
  { n: '04', tag: 'Without viral', hook: 'I built a $5M fitness business without going viral.', problem: 'Everyone tells you the answer is more reach.', path: 'Principles that work cold work warm. I did it without influence or a following. Here\'s the one that actually moved it.', cta: 'Watch the full story (Rome).' },
  { n: '05', tag: 'Impact', hook: 'Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.', problem: 'People separate impact from income.', path: 'Income buys impact. A bigger income purchases more of it. You have a duty to build something big if you\'re impact driven.', cta: 'Comment your take.' },
  { n: '06', tag: 'The gym', hook: 'Someone asked me how the gym I work at works, no one can train there. I said, that\'s the whole point.', problem: 'Everyone signals status with what they sell. I signalled it with what I refuse to.', path: 'A 750K gym no one can use says more than any testimonial. Proof you can\'t fake or lease.', cta: 'This is what undeniable looks like.' },
  { n: '07', tag: 'Binary', hook: 'Two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.', problem: 'Vague posting and hoping the algorithm rewards you doesn\'t convert.', path: 'The specific content type, the exact cadence. Vague versus specific.', cta: 'Which one are you? Comment.' },
  { n: '08', tag: 'Stop X', hook: 'Stop learning marketing and just copy this.', problem: 'Coaches drown in tactics, tools and AI and still don\'t grow.', path: 'The one move that beats all of it, copied straight from what works.', cta: 'The complete plan is on the channel.' },
  { n: '09', tag: 'Profit', hook: 'You\'re doing 80K months and keeping nothing. Let me show you why.', problem: 'Revenue resets to zero on the first and you panic again. Lifestyle crept up.', path: 'Revenue minus tax, minus GST, minus the lifestyle you adjusted to. Fix profit, not revenue.', cta: 'The fix in the full video.' },
  { n: '10', tag: 'Imagine', hook: 'Imagine if you never lost a client. You\'d stop selling and start choosing.', problem: 'You\'re signing two and losing two, running to stand still.', path: 'Net-zero churn means you only ever add. At some point you turn around and say, I\'m done signing clients.', cta: 'Here\'s how close you are.' },
  { n: '11', tag: 'The feeling', hook: 'There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it.', problem: 'Two steps forward, two steps back, every month with less oxygen than the last.', path: 'It\'s not a feeling, it\'s a number. It\'s churn. And here\'s the fix.', cta: 'Who feels this? Comment.' },
  { n: '12', tag: 'Sceptic', hook: 'You\'ve been burned before. Good. Stay sceptical and watch this anyway.', problem: 'You paid a mentor who\'d never done it, and now you\'re scared to invest again.', path: 'Check the receipts. Worst case you stay the same. Best case you\'re wrong and you get wealthier.', cta: 'Come with your bullshit meter on high.' },
  { n: '13', tag: 'Story', hook: 'I ran a business for 13 years that almost killed me, so you don\'t have to.', problem: 'Five of those years I did it the wrong way, hating my life.', path: 'Mentorship is a game of leapfrog. I have the battle scars so you can jump the problems.', cta: 'The whole arc (character video).' },
  { n: '14', tag: 'Story', hook: 'I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.', problem: 'Everyone says they only want committed clients.', path: 'You don\'t find the best client. You build them. There\'s a time to coach the committed, but not on day one.', cta: 'Full story on the channel.' },
  { n: '15', tag: 'Story', hook: 'Three years ago I ran a seminar for 16 people and made $175. I teach the same thing now for 22 grand.', problem: 'People think the information is what changed.', path: 'It didn\'t. The proof did. Same lesson, walked the walk, now it\'s undeniable.', cta: 'This is the why-now.' },
];

const ShortCard = ({ s }: { s: Short }) => (
  <div className="glow-card p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-[18px] font-extrabold text-blue-400">{s.n}</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded-full px-2.5 py-0.5">{s.tag}</span>
    </div>
    <div className="space-y-3">
      {[['Hook', s.hook], ['Problem', s.problem], ['Path', s.path], ['CTA', s.cta]].map(([k, v]) => (
        <div key={k} className="grid grid-cols-[64px_1fr] gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400 pt-1">{k}</span>
          <span className={`text-[14px] leading-relaxed ${k === 'Hook' ? 'text-white font-medium' : 'text-zinc-300'}`}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function UndeniableShootCard() {
  return (
    <Shell title="Shoot Card · Undeniable" description="The kick-off checklist and the first 15 shoot-ready shorts." path="/undeniablenextsteps/shoot-card">
      <PageHead
        eyebrow="Operational · The day"
        title="The Shoot"
        accent="Card."
        blurb="What every piece needs before the camera rolls, and the first 15 shorts written hook to CTA. Open this on shoot day."
      />
      <Divider />

      <Wrap>
        <H2>Kick-off · before you shoot.</H2>
        <Note>Call it out first: is this an education piece or a heart piece? Then run the checklist.</Note>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {KICKOFF.map((k) => (
            <div key={k.title} className="glow-card p-6">
              <p className={`font-semibold text-[13px] uppercase tracking-widest mb-4 ${k.tone === 'blue' ? 'text-blue-400' : 'text-zinc-300'}`}>{k.title}</p>
              <ul className="space-y-3">
                {k.rows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-zinc-300 text-[14px] leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Note>The formula every education piece follows: Hook → Problem → Path (tool or "don't do this") → CTA. One problem, one promise, one outcome.</Note>
      </Wrap>
      <Divider />

      <Wrap>
        <H2>The first 15, shoot-ready.</H2>
        <Note>Hook is line one, delivered in the first second. Tighten in your own words on camera. Rotate the tags so the feed doesn't feel samey.</Note>
        <div className="grid gap-4 mt-8">
          {SHORTS.map((s) => <ShortCard key={s.n} s={s} />)}
        </div>
      </Wrap>
    </Shell>
  );
}
