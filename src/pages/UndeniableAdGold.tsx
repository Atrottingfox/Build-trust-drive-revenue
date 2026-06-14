import React from 'react';
import { Shell, PageHead, Wrap, Divider, Block, Quotes, Note } from '../components/undeniable/Bits';

const G: Array<{ label: string; items: Array<string | { q: string; star?: boolean }> }> = [
  { label: 'Money lines · say them nonchalant', items: [
    { q: 'My client lost $800,000 and never even knew it.', star: true },
    { q: 'There is no one else in Australia producing six-figure months out of fitness businesses.', star: true },
    "I've done all the things they want to do, up until 5 million. Which is incredibly large for a fitness business here in Australia.",
    'I took him from 60K US a year to 600K US in 12 months.',
    'He went from 8K to 115K a month, just by doing the systems.',
    'She came to us doing 15K months. She\'s now touching 80K months.',
    'We grew near 600% in the space of five months.',
    { q: 'I made an extra $120,000 that year and thought it was great. Then I realised if I\'d solved it this way first, we\'d have made an extra $600,000.', star: true },
    'The total we made in that room was $175. It\'s the same information I teach now. We just charge 22 grand for it.',
    'I had less than 5,000 followers, 12 likes on a photo, and we were doing 2.2 million US.',
    '82% of our clients who are eligible to leave, stay.',
  ]},
  { label: 'The differentiator · did it without influence', items: [
    { q: 'I did it without influence. And without following.', star: true },
    { q: 'I did it without going viral.', star: true },
    { q: 'Come test me in person. Anyone can fake a script, anyone can shotgun their way through a video and free ball. You can\'t freeball in person.', star: true },
    'I started the same way. Trading time for no money on the gym floor, with old people I didn\'t want to train, making good box jumps. I hated it. I\'d done all of it.',
    'Working with me made him realise they know nothing in comparison. It\'s the difference between walking the walk and getting dropped in on a parachute at the end of the line.',
  ]},
  { label: 'Recognition lines · what they say when you\'re not there', items: [
    'He\'s the Australian Alex.',
    { q: 'He\'s the one who actually did it.', star: true },
    'He\'s the guy who built a gym no one can use.',
  ]},
  { label: 'The gym · a whole ad on its own', items: [
    { q: 'Someone messaged me, how does the gym you work at actually work, no one can train there. I said, yeah, that\'s the whole point. He said, so who uses it. I said, we use it.', star: true },
    'We\'re the only people in Australia with custom Watson plates.',
    'You can\'t lease that. You\'ve got to buy it.',
  ]},
  { label: 'Churn · the flagship lever', items: [
    { q: 'Anything above 3% churn? That\'s 60% of your business gone every year.', star: true },
    { q: 'It feels like two steps forward and two steps back every single month. Every month you walk into the next with less oxygen than you had before. Who feels like that?', star: true },
    'They know the feeling. They don\'t know the term.',
    'If you solved for net 0% churn, you could turn around one day and say, I\'m done signing clients, I\'m good.',
    { q: 'If you lose two from 25, that\'s one percentage. But you need 125 to hit your 50K month and you\'re still losing two. That\'s 1.6%. Your churn would have to improve almost three times while you\'re growing. It doesn\'t make sense.', star: true },
  ]},
  { label: 'The math · time on task', items: [
    { q: 'Online coaches think they work a lot. Do a time on task. It\'s five to twelve hours a week.', star: true },
    { q: '100 clients, 15-minute check-ins, that\'s 1,500 minutes, 25 hours. Add an hour of comms a day, 32. Five hours of content, 37. Three hours of program updates. You\'ve finally worked a 40-hour week with 100 clients.', star: true },
    'I had staff I paid 85K a year, working 12 hours a week, with 40 hours to spend on the beach.',
    'The math can\'t account for the emotional toll. You can do it in a 42-hour week, but you\'re sitting there hating your life. So add five hours.',
  ]},
  { label: 'Contrarian · belief shift', items: [
    { q: 'Which business has more impact? 35 clients done brilliantly, or 350 who lose 10 kilos and move on? It\'s the bigger one. Fight me.', star: true },
    { q: 'Income buys you impact. A bigger income purchases more impact. You\'re not changing the world coaching 25 people.', star: true },
    'You have a duty to build something big if you\'re so impact driven.',
    'Most people think they have to compromise who they are to build something big. Not true.',
    'There\'s a reason the educated coach calls the other an influencer, not a coach.',
    { q: 'No one would care if an influencer put out a 20-day challenge that made no money. The only reason they care is because people buy it.', star: true },
    { q: 'Manual effort will reign supreme. Analogue effort is the thing that always wins. You can\'t cheat it.', star: true },
    'If you\'ve been burnt and you\'re scared to get burnt again, the only thing happening is you staying smaller. Worst case you find more info and stay the same. Best case you\'re wrong and you get wealthier.',
  ]},
  { label: 'The frames · reusable across every piece', items: [
    { q: 'Right problem, wrong way is the most expensive place to be. Things get a bit better, you think it\'s awesome, and you don\'t find out for five years you\'ve wasted five years and could have been three times the size.', star: true },
    'The golden BBs. You don\'t know if the shots firing are correct or in the right sequence, even if they\'re working.',
    { q: 'My idea of mentorship is a game of leapfrog. Jump over the problems I\'ve faced. I have battle scars so you don\'t have to.', star: true },
    { q: 'I ran a business for 13 years that almost killed me, so you don\'t have to.', star: true },
    'Leave people better than you find them. How they exit is more important than how they arrive.',
    'Character is currency. Who you are is what people say about you when you\'re not in the room.',
    'Sales is a good judgement of morality. Who you\'ll sell to says a lot about who you are.',
  ]},
  { label: 'Guarantee · why now · worst case', items: [
    { q: 'We\'ll teach you more about your business before lunchtime on day one than you\'ve learned prior. If we don\'t, we refund your ticket.', star: true },
    { q: 'What\'s the worst that happens? You come in, test me, test my team, decide I\'m not for you, and go tell people I suck. Make a Reddit thread. That\'s the worst.', star: true },
    'We\'ll tell the truth and state the facts. If we can\'t help you, we won\'t sell to you.',
    'We won\'t sell to people making less than 10K a month, because they get manipulated the most.',
  ]},
  { label: 'The avatar\'s own words · use as "this is you"', items: [
    { q: 'Overworked, underpaid, and underappreciated by the industry.', star: true },
    'I do a 15-minute check-in and no one listens to me.',
    'I want to own a gym where only great clients come two or three times a week.',
    'I want to be the coach who doesn\'t have to sell. People just come to me.',
    'They want all the things they say they hate in a mentor. The fancy car, the lifestyle, the Dubai.',
    'I just want McLaren money.',
  ]},
];

export default function UndeniableAdGold() {
  return (
    <Shell title="Ad Gold · Undeniable" description="Verbatim money lines, stories and frames from the session, ready to lift into creative." path="/undeniablenextsteps/ad-gold">
      <PageHead
        eyebrow="Reference · Raw lines"
        title="Ad"
        accent="Gold."
        blurb="His exact words, lightly de-garbled but not rephrased. Money lines, stories and frames you can lift straight into an ad. The blue star marks the strongest. You don't have a content shortage, you have an extraction problem."
      />
      <Divider />
      <Wrap>
        {G.map((g) => (
          <Block key={g.label} label={g.label}>
            <Quotes items={g.items} />
          </Block>
        ))}
      </Wrap>
    </Shell>
  );
}
