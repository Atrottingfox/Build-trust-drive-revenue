import React from 'react';
import { Shell, PageHead, Wrap, Divider, Block, Quotes, Note } from '../components/undeniable/Bits';

const S = (q: string) => ({ q, star: true });

const GROUPS: Array<{ label: string; items: Array<string | { q: string; star?: boolean }> }> = [
  { label: 'Money-problem · find the money problem first', items: [
    S('My client lost $800,000 and never even knew it.'),
    'I did the math on his business live and he went white in the face.',
    "You're losing more money in your business right now than you're making. Let me show you where.",
    "There's a number in your business you've never calculated, and it's costing you six figures.",
    S("I made an extra $120,000 that year and thought I'd won. I'd actually left $600,000 on the table."),
    'Two clients leave a month and you think that\'s fine. Let me show you what it actually costs you.',
  ]},
  { label: 'Churn · the leak', items: [
    S('It feels like two steps forward and two steps back every month. That\'s not a feeling, that\'s a number.'),
    'Every month you walk into the next one with less oxygen than before. Here\'s why.',
    "You don't have a lead problem. You have a churn problem. You just haven't done the math.",
    S('Anything above 3% churn means 60% of your business is gone every year.'),
    S('Imagine if you never lost a client. Now let me show you how close that actually is.'),
    "You're filling a bucket with holes in it and wondering why it never gets full.",
    'Stop chasing more leads. Plug the leak first.',
  ]},
  { label: 'The math · reality check', items: [
    S('Online coaches think they work a lot. Let\'s actually do the math.'),
    "You've got 100 clients and think you're flat out. You're working a 12-hour week and don't know it.",
    'Everyone\'s the show pony. Let me be the logical one for a second and just do the numbers.',
    "I'm going to do the math on your business and you're not going to like it.",
    'A 20-minute check-in doesn\'t make you a better coach. It makes you a slower one.',
  ]},
  { label: 'Just a PT · status', items: [
    S("If you're sick of being called just a PT, even though you're running over 10K, I finally worked out why."),
    "You're not just a PT. But your business is built like you are.",
    'Every PT only has 12 to 16 weeks with a client. Here\'s how we doubled that.',
    'Coaching used to be a hobby. If you still treat it like one, you\'ll stay broke.',
    'Your market is going to age up whether you do or not.',
  ]},
  { label: 'Without X · the differentiator', items: [
    S('I built a $5M fitness business without going viral. Here\'s everything I did.'),
    S('I did it without influence and without following. So your excuse just disappeared.'),
    'Everyone tells you to go viral. I did the opposite and made more money.',
    "If it worked for me with no following, it'll work for you with one.",
    'Come test me in person. You can fake a script. You can\'t freeball in a room.',
  ]},
  { label: 'Contrarian · belief flip', items: [
    S('Which business has more impact, 35 clients done brilliantly or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.'),
    S("Income buys you impact. You're not changing the world coaching 25 people."),
    'Most coaches think they have to compromise who they are to build something big. They\'re wrong.',
    'Being a good coach isn\'t enough. Being good isn\'t good enough.',
    'Manual effort will reign supreme. You can\'t cheat it, and that\'s good news for you.',
    S('No one cares about the influencer\'s challenge until people buy it. Then you care. Let\'s talk about why.'),
    'If it triggers you, it\'s probably true.',
    "Your competitors are setting your prices, not your clients. That's why you're underpaid.",
  ]},
  { label: 'Old way vs new way', items: [
    'Old way: just show up online. New way: build an ecosystem. One of these makes money.',
    'Old way: loom check-ins. New way: written check-ins anyone can run. Here\'s the difference in your week.',
    'Stop hiring more coaches and putting them in your content. Do this instead.',
    'Everyone says get more educated. The educated coaches are the broke ones. Here\'s what works.',
    'There are two ways to run a business at 80 clients. One of them is killing you.',
  ]},
  { label: 'The feeling they can\'t name', items: [
    S('There\'s a feeling every coach at 30 clients has and can\'t describe. Let me describe it for you.'),
    "You feel like you're treading water and working harder to stay in the same place. There's a reason.",
    "You're not lazy and you're not stupid. You're stuck in the part of the business no one warned you about.",
    'If your business feels heavy and you can\'t say why, this is for you.',
  ]},
  { label: 'Binary · which are you', items: [
    S('There are two ways to get leads. Knock on doors every day, or post this specific thing five times a day. Pick one.'),
    'Two paths to grow a coaching business. One caps you. One scales forever.',
    'You either wait for everyone else to tell you what to do, or you test everything. Which one are you?',
    S('Doers and waiters. Your content is training one of them to come to you.'),
  ]},
  { label: 'Imagine · inverse', items: [
    S('Imagine if you never lost a client. You\'d stop selling and start choosing.'),
    'Imagine if you didn\'t have to compromise. 50 clients on stage and a business that doesn\'t suck to own.',
    'Picture your next 2,000 leads dropping in today. Here\'s exactly what happens on the back end.',
    'What if the thing you think is your problem is actually your easiest fix?',
  ]},
  { label: 'Stop X · just do Y', items: [
    S('Stop learning marketing and just copy this.'),
    'Don\'t post more. Follow the plan.',
    'Stop running pay-in-full offers. They look great in screenshots and they\'re killing your cash flow.',
    'Stop selling in the DMs. You\'re making people decide emotionally about their weight, and it doesn\'t scale.',
    'Stop trying to choose your niche. Your content already chose it for you.',
  ]},
  { label: 'Story openers · drop mid-scene', items: [
    S('I built a client a program so bad it was designed to make her quit. She dropped 40 kilos and got on stage.'),
    'I couldn\'t pay my staff two weeks before Christmas. That\'s the year I learned everything.',
    S('When I was at my worst, we were at our best. We grew 600% and I was ready to walk away from all of it.'),
    'Three years ago I ran a seminar for 16 people and made $175. I teach the same thing now for 22 grand.',
    'A coach told me he loved coaching. His mate said, I just like making money. One of them is bigger.',
    'I spent 750 grand on a gym no one is allowed to train at. Here\'s why that\'s the smartest thing I\'ve done.',
    'On the sales call I asked her what she wanted. She said, McLaren money.',
  ]},
  { label: 'Profit vs revenue · higher bracket', items: [
    S('You\'re doing 80K months and keeping nothing. Let me show you why.'),
    'Revenue resets to zero on the first of the month and you start panicking again. That\'s not a money problem.',
    'Vertical growth feels amazing until it stops. Then you\'re back on the treadmill, just bigger.',
    'The coach doing 40K months is keeping more than the one doing 80K. Here\'s how.',
  ]},
  { label: 'Promise + timebox', items: [
    S('In 60 seconds I\'ll show you how to stop losing clients in the first 90 days.'),
    'Give me five minutes and I\'ll find the one number that\'s capping your business.',
    'By the end of this video you\'ll know exactly what your next step is. Not three. One.',
    'In two minutes I\'ll show you the difference between a 30-client business and a 300-client one.',
  ]},
  { label: 'Scepticism · trust (for the burned audience)', items: [
    S('You\'ve been burned before. Good. Stay sceptical and watch this anyway.'),
    'Don\'t trust me. Check the receipts. Then come back.',
    'If you\'ve paid a mentor who\'d never done it themselves, this one\'s for you.',
    'The worst that happens if I\'m wrong? You learn something for free and go tell people I suck.',
    'Come at this with your bullshit meter on high. I\'ll wait.',
  ]},
  { label: 'YouTube titles · long-form pillars', items: [
    S('How I Built a $5M Online Fitness Business in 11 Years (Without Going Viral)'),
    'As a PT I Made $X. This Is Everything I Did to Get There.',
    "If I Wanted to Make $1M as a Fitness Coach Again, I'd Do This",
    'How to Make Your First $1M in Fitness (Full Walkthrough)',
    'Stop Learning Marketing and Just Copy This (Complete Plan)',
    'How to Add $10,000/Month as an Experienced PT',
    'The Real Reason Your Marketing Isn\'t Working',
    'How to Get So Many Referrals You Never Run an Ad Again',
    'Every Fitness Creator Gets Stuck at the Same Point. If That\'s You, Do This.',
    'I Built a Gym No One Can Use. Here\'s Why.',
  ]},
];

export default function UndeniableHooks() {
  return (
    <Shell title="Hook Bank · Undeniable" description="Around 90 hooks built from the session, in Rhys's voice, organised by mechanic." path="/undeniablenextsteps/hooks">
      <PageHead
        eyebrow="Reference · Hooks"
        title="The Hook"
        accent="Bank."
        blurb="Around 90 hooks, built from his own lines, organised by mechanic. Grab and shoot. The blue star marks the highest-conviction pulls. Rule one: don't run three of the same mechanic in a row, and test the starred lines first."
      />
      <Divider />
      <Wrap>
        {GROUPS.map((g) => (
          <Block key={g.label} label={g.label}>
            <Quotes items={g.items} />
          </Block>
        ))}
        <Note>For short form, the hook is line one. Then problem, then path (with a tool or a "don't do this"), then a native bridge or CTA. Every story opener doubles as a long-form: shoot the line as a short and the full story as a pillar.</Note>
      </Wrap>
    </Shell>
  );
}
