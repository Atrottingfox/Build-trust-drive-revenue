import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/*
  /inpower - Sean's notes on power, 2026-10-16.

  His text, word for word. Only the layout is added: headings are his own
  lines, the five parts of power and the signals are laid out as lists.
  Unlisted: noindex and disallowed in robots.txt, reached by link only.
  Flat sections and dividers, no boxed cards (client page rule).
*/

const LEVELS = [
  { name: 'Authority', line: 'Others believe you\'re legit' },
  { name: 'Influence', line: 'make others believe you\'re legit' },
  { name: 'Power', line: 'Making shit happen regardless of what people think' },
];

const PARTS = [
  { name: 'Access', line: 'You select who comes in, who doesn\'t.' },
  { name: 'Attention', line: 'You hold the attention of an ideal person' },
  { name: 'Judgement', line: 'Trusted advisor. Experts look at you before making decisions.' },
  { name: 'Capital', line: 'What people want (This can be done via proxy)' },
  { name: 'Liberty', line: 'Doing whatever the fuck you want' },
];

const SIGNALS: { name: string; notes: string[] }[] = [
  {
    name: 'Speed of decision',
    notes: [
      'outcome can only be shown via documentation/showing the thing. (This can be done post-decision but must be reinforced)',
    ],
  },
  {
    name: 'Consistency',
    notes: ['Signals that things will be done regardless of will power'],
  },
  {
    name: 'Scarcity of access',
    notes: [
      'Time limitations (showing calendar) Talking about value of time.',
      'What people pay for time.',
      'Unavailability.',
      'Value of actions.',
    ],
  },
  {
    name: 'Experimentation / Risk tolerance',
    notes: [
      'Signal that costs can be absorbed. You can afford to take risks, therefore inversely you have power over resource.',
    ],
  },
  {
    name: 'Getting others to perform actions for you',
    notes: [
      'Share decisions and outcomes. This is not done via being a dick. It\'s that there\'s support around you, and that people are willing + excited to take action on your behalf.',
    ],
  },
  {
    name: 'Willingness to say no + sharing why',
    notes: [
      'Ability to not need every penny. Share why not all decision is a good decision. Not all money is worth the same dollar. This is power over resource.',
      'For example. Taki refunded $80,000 for a 2 hour workshop once. Powerful. Left $580,000 on the table each month by saying no to clients. Powerful.',
      'These should not be manufactured.',
    ],
  },
  {
    name: 'Sharing decisions (Showing what\'s happening in the business)',
    notes: ['less about speed, more about why + what. Power over outcomes.'],
  },
  {
    name: 'Showing others in content',
    notes: [
      'Share influence, which builds power. You\'re a charismatic dude, but people don\'t get the chance to see it.',
    ],
  },
];

const h2 = 'font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8';
const body = 'text-zinc-400 text-lg leading-relaxed';

export default function InPower() {
  return (
    <div className="min-h-screen bg-base">
      <SEO title="Power" description="Proxies as signals of power." path="/inpower" noIndex />
      <div className="gradient-border-top" />

      <Container className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="accent-line mb-8" />
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-8">
            Power
          </h1>
          <div className="space-y-3">
            <p className="text-white text-xl leading-relaxed">Proxies as signals of power.</p>
            <p className={body}>Evidence of power.</p>
            <p className={body}>We never want to say - ONLY show.</p>
            <p className={body}>
              Power is also about singling influence over others, so that it becomes assumed.
            </p>
            <p className={body}>
              People will pick up an effort to do it unless it's masked well and legit.
            </p>
            <p className={body}>Some value status:</p>
          </div>

          <hr className="border-zinc-800 my-14" />

          <div className="space-y-6">
            {LEVELS.map((l) => (
              <div key={l.name} className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
                <p className="text-white text-lg font-semibold">{l.name}</p>
                <p className={body}>{l.line}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-10">
            <p className={body}>Influence is getting somebody else to want to make it happen.</p>
            <p className={body}>It's psychological.</p>
            <p className={body}>Power is structural.</p>
            <p className="text-white text-xl leading-relaxed">
              Power is based on the conditions, influence is based on decisions.
            </p>
          </div>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>Power broken down</h2>
          <div className="space-y-6">
            {PARTS.map((p) => (
              <div key={p.name} className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
                <p className="text-white text-lg font-semibold">{p.name}</p>
                <p className={body}>{p.line}</p>
              </div>
            ))}
          </div>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>Power vs influence</h2>
          <div className="space-y-3">
            <p className={body}>Influence turns into power over time.</p>
            <p className="text-white text-xl leading-relaxed">Power is the ability to create defaults.</p>
            <p className={body}>For example.</p>
            <p className={body}>
              This will come from shifting the frame to educate the audience via worldview / stories, and
              sharing decisions live.
            </p>
          </div>

          <hr className="border-zinc-800 my-14" />

          <h2 className={h2}>Power often comes through via documentation.</h2>
          <div className="space-y-3 mb-12">
            <p className={body}>
              These should not be manufactured, but they should be signals to consider.
            </p>
            <p className={body}>For example.</p>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {SIGNALS.map((s) => (
              <div key={s.name} className="py-7">
                <p className="text-white text-lg font-semibold mb-2">{s.name}</p>
                <div className="space-y-2">
                  {s.notes.map((n, i) => (
                    <p key={i} className={body}>
                      {n}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
