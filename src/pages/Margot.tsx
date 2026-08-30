import React from 'react';
import PasswordGate from '../components/PasswordGate';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { PageHead, Wrap, Divider, Note, H2, Block, BulletList, Section, Quotes, Tabs } from '../components/undeniable/Bits';

// ─── Diagnosis ───────────────────────────────────────────────────────────

type Score = { name: string; score: number | null; label: string; note: string };

const SCORES: Score[] = [
  {
    name: 'Clarity',
    score: 1,
    label: '1 / 5',
    note: 'Your own rating on the call. Someone lands on the profile and cannot say what they get from you as a result of buying. The bio reads brand strategist and wealth activator. The pinned posts were the old soul material, which went mega viral and said nothing about what you sell.',
  },
  {
    name: 'Visibility',
    score: null,
    label: 'Not rated',
    note: 'How many people are actually showing up in your DMs and in your views. Are they flatlining or still climbing. This one can be inflated with ads whenever you want it to be.',
  },
  {
    name: 'Authority',
    score: null,
    label: 'Not rated',
    note: 'Do you have a unique and differentiated perspective. If there are three people your ICP could pick from, do they say go with Margot. The PhD and the psychology lens are the raw material for this.',
  },
  {
    name: 'Quality',
    score: null,
    label: 'Not rated',
    note: 'Quality of lead. Are they pre sold and ready to buy by the time they land on the profile.',
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
                    className={`h-2 w-7 rounded-sm ${s.score !== null && n <= s.score ? 'bg-blue-500' : 'bg-zinc-800'}`}
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

// ─── Card grid ───────────────────────────────────────────────────────────

function Cards({ items, cols = 2 }: { items: Array<{ kicker?: string; title: string; body: string }>; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {items.map((c) => (
        <div key={c.title} className="rounded-xl border border-zinc-800 bg-elevated/40 p-5">
          {c.kicker && (
            <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-400 mb-2">{c.kicker}</p>
          )}
          <p className="font-display text-[15px] font-extrabold text-white mb-2">{c.title}</p>
          <p className="text-zinc-400 text-[14px] leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

// ─── The three buckets ───────────────────────────────────────────────────

type Bucket = {
  id: string;
  name: string;
  share: string;
  where: string;
  colour: string;
  what: string;
  topics: string[];
};

const BUCKETS: Bucket[] = [
  {
    id: 'mindset',
    name: 'Mindset',
    share: '40%',
    where: 'Top of funnel',
    colour: 'border-t-violet-500/60',
    what: 'The open bucket. This is how people come in, and it is what your existing audience already follows you for. Same principles as the manifestation material, run through psychology instead.',
    topics: [
      'Rich girl secrets. The series that pulled followers when you tested it as part of the pivot.',
      'Taking something bad and making it good. The hook that has worked hardest for you, like before you start making more money, God will show you the worst in people.',
      "The hero's journey. The bold story lines. Thirty eight and institutionalised from twenty to twenty five. Thirty six and living in my dead grandma's house. People see themselves in the rough part and follow you out of it.",
    ],
  },
  {
    id: 'content',
    name: 'Content',
    share: '30%',
    where: 'Middle',
    colour: 'border-t-sky-500/60',
    what: 'Narrower. This is where you show the inside out, and where the demand you have already captured gets connected to what you actually do.',
    topics: [
      "Breakdowns. Take your own video and break down why it went viral. Better than breaking down someone else's.",
      'Hooks through psychology. Explain why a hook actually works, then link to your best ones.',
      'Messaging and copy. This exact email made this much money, take it and plug it in.',
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    share: '30%',
    where: 'Warms and nurtures',
    colour: 'border-t-teal-500/60',
    what: 'The bucket that does the nurturing. Sell the lifestyle the system produces. Nobody wants another mechanism explained to them, they want the outcome.',
    topics: [
      'Rotting and resting. Work hard, rest hard, and the only way you get to do that is with systems. Lands without ever boring anyone with what a funnel is.',
      'Invisible sales systems. People acting like they are just regulating their nervous system when they have funnels running in the background. Your angle, and a strong one.',
    ],
  },
];

function BucketCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {BUCKETS.map((b) => (
        <div key={b.id} className={`rounded-xl border border-zinc-800 bg-elevated/40 p-5 border-t-2 ${b.colour}`}>
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <p className="font-display text-[17px] font-extrabold text-white">{b.name}</p>
            <span className="text-blue-400 text-[15px] font-semibold tabular-nums">{b.share}</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">{b.where}</p>
          <p className="text-zinc-400 text-[14px] leading-relaxed mb-4">{b.what}</p>
          <ul className="space-y-2.5 border-t border-zinc-800/70 pt-4">
            {b.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <span className="text-zinc-300 text-[13px] leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────

type TabDef = { id: string; label: string; sections: Array<{ id: string; label: string }> };

const TABS: TabDef[] = [
  {
    id: 'start',
    label: 'Start here',
    sections: [
      { id: 'scores', label: 'Diagnosis' },
      { id: 'filter', label: 'The filter' },
      { id: 'order', label: 'Why the order' },
    ],
  },
  {
    id: 'positioning',
    label: 'Positioning',
    sections: [
      { id: 'title', label: 'The title' },
      { id: 'oneliner', label: 'The one liner' },
      { id: 'notthis', label: 'What you are not' },
      { id: 'test', label: 'How to test it' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    sections: [
      { id: 'buckets', label: 'The three buckets' },
      { id: 'perspective', label: 'Perspective' },
      { id: 'pivot', label: 'The pivot' },
    ],
  },
  {
    id: 'capture',
    label: 'Capture',
    sections: [
      { id: 'pinned', label: 'Pinned posts' },
      { id: 'magnets', label: 'Lead magnets' },
      { id: 'giveaway', label: 'What to give away' },
    ],
  },
  {
    id: 'next',
    label: 'Next steps',
    sections: [
      { id: 'now', label: 'Do this now' },
      { id: 'parked', label: 'Parked' },
    ],
  },
];

const SECTION_TAB: Record<string, string> = Object.fromEntries(
  TABS.flatMap((t) => t.sections.map((s) => [s.id, t.id])),
);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {active === s.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function Margot() {
  const { tab, sec, changeTab, changeSec } = usePlanNav();
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <PasswordGate storageKey="margot-unlocked">
      <div className="min-h-screen bg-base">
        <SEO
          title="The Plan, Margot"
          description="The call, bucketed by core function. Where the constraint is, the positioning we landed on, the three content buckets, and what to do first."
          path="/margot"
          noIndex
        />
        <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

        <PageHead
          eyebrow="Strategy reference"
          title="The"
          accent="Plan."
          blurb="Everything from the call, bucketed by core function. Where the constraint sits, the positioning we landed on, the three buckets your content runs on, and what to change first."
          backHref={null}
        />

        {/* ─── STICKY NAV ─── */}
        <div id="plan-tabs" className="sticky top-0 z-40 border-y border-zinc-800 bg-base/95 backdrop-blur-md">
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

        {/* ═══════════════ DIAGNOSIS ═══════════════ */}
        {sec === 'scores' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The scores</p>
            <H2>Clarity is the constraint.</H2>
            <Note>Four lanes, out of five. Clarity is the one you rated on the call. The other three are the lanes we read next.</Note>
            <div className="mt-8">
              <Scores items={SCORES} />
            </div>
            <div className="mt-10">
              <Block label="Notes">
                <BulletList
                  items={[
                    'Two years of live launching the same free masterclass into a low ticket offer. You stopped about six months ago because the volume was sliding.',
                    'Offers are down and a signature offer is being rebuilt. Binge Worthy as the smaller one, Obsessed as the core.',
                    'The audience is already there and already attached to you. Nothing here starts from zero. The whole job is channelling what is already there.',
                  ]}
                />
              </Block>
            </div>
            <div className="mt-10">
              <Section>
                <div className="glow-card border-blue-500/20 p-8">
                  <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-3">The measure</p>
                  <p className="text-white text-[16px] leading-relaxed font-medium">
                    Once the bio, the pinned posts and the buckets are in, clarity moves from a one to at least a three. That is the check in three weeks.
                  </p>
                </div>
              </Section>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ THE FILTER ═══════════════ */}
        {sec === 'filter' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The filter</p>
            <H2>Take the demand, run it through you.</H2>
            <Note>The drawing from the call. Good marketing takes current demand and channels it where you want it to go.</Note>
            <div className="mt-8">
              <Cards
                cols={3}
                items={[
                  {
                    kicker: 'One',
                    title: 'The demand bucket',
                    body: 'What people are already looking for and already being served. Manifestation, quantum leaping, rich girl money. Instagram already knows exactly who to push that to, which is why it travels.',
                  },
                  {
                    kicker: 'Two',
                    title: 'Your lens',
                    body: 'Your unique and differentiated perspective sits between the topic and the person watching. Same topic they came for, your read on it.',
                  },
                  {
                    kicker: 'Three',
                    title: 'They attach to you',
                    body: 'Without the lens they stay attached to the topic and go looking for whoever covers it next. With it, they attach to you and what you can do for them.',
                  },
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="Where the lens goes">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">Straight after the hook.</b> I am this, who helps people do that. One sentence, and it changes the entire lens people see the rest of the video through.</>,
                    <><b className="text-white font-semibold">Every video, not the occasional one.</b> The topic is what gets them in. The line is what makes them yours.</>,
                    <><b className="text-white font-semibold">Then every CTA lands in the same place.</b> The so that you can has to point at brand or content, no matter what the video opened with.</>,
                  ]}
                />
              </Block>
            </div>
            <div className="mt-8">
              <Quotes
                items={[
                  { q: 'Good marketing is just taking current demand and channelling it to where you want it to go.', star: true },
                ]}
              />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ WHY THE ORDER ═══════════════ */}
        {sec === 'order' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Why the order</p>
            <H2>Each one sits downstream of the last.</H2>
            <Note>This is the read you can run on yourself any time. Fix them in order.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Clarity is first contact.</b> If it is not clear and compelling to your ICP what they get from you as a result of buying, nothing downstream converts. Two full day sessions last week both scored a two here, and everything under it was damaged.</>,
                  <><b className="text-white font-semibold">Visibility is not your problem.</b> You already went viral, and ads can inflate this whenever you want. Pointing more reach at an unclear profile only shows more people something confusing.</>,
                  <><b className="text-white font-semibold">Authority is the differentiated perspective.</b> The PhD in business psychology and the psychology lens are exactly this, and almost nobody in your market has it.</>,
                  <><b className="text-white font-semibold">Quality is the last mile.</b> With the first three in place, the lead arrives pre sold and ready to buy rather than curious.</>,
                ]}
              />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ THE TITLE ═══════════════ */}
        {sec === 'title' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The title</p>
            <H2>Brand strategist, backed by psychology.</H2>
            <Note>Brand strategist stays. Wealth activator goes.</Note>
            <div className="mt-8">
              <Cards
                items={[
                  {
                    kicker: 'Keep',
                    title: 'Brand strategist',
                    body: 'Brand is wide enough to hold mindset, content and systems. Content alone is too narrow, and it is not the whole skill set. Brand psychologist was on the table and would be a made up category, so brand strategist is the call.',
                  },
                  {
                    kicker: 'Cut',
                    title: 'Wealth activator',
                    body: 'People read it, want their wealth activated, and still cannot say what it is. The outcome line can carry the wealth idea without the ambiguity sitting in the title.',
                  },
                  {
                    kicker: 'Avoid',
                    title: 'Business coach',
                    body: 'Say business and you are in a pond with every other business coach, competing on the same ground. You also end up having to deliver in areas you do not want to be in.',
                  },
                  {
                    kicker: 'The backing',
                    title: 'Currently earning a PhD in business psychology',
                    body: 'This is the line that moves the exact same material out of manifestation and into an authoritative lens. You can run it without naming the title. People will trust someone compressing trust who is effectively a psychologist.',
                  },
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="Psychology is the word to lean on">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  It is the same thing as manifestation in someone&rsquo;s head, channelled through a lens that reads as legitimate. It also opens a curiosity loop while still telling people what they get.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ THE ONE LINER ═══════════════ */}
        {sec === 'oneliner' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The one liner</p>
            <H2>The line we landed on.</H2>
            <Note>Say it the same way every time. Repetition is how one thing becomes the thing you are known for.</Note>
            <div className="mt-8">
              <Section>
                <div className="glow-card border-blue-500/20 p-8">
                  <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-3">Bio</p>
                  <p className="text-white text-[20px] md:text-[22px] leading-snug font-semibold">
                    Brand strategist. Helping you master the psychology behind building a bingeable brand.
                  </p>
                </div>
              </Section>
            </div>
            <div className="mt-10">
              <Block label="Why you and not old souls">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  Old souls is your audience&rsquo;s own language and it works, which is why it stays in the content. In the bio, between the two, you wins. They land on the page and get that you are talking to old souls anyway.
                </p>
              </Block>
            </div>
            <div className="mt-2">
              <Block label="Obsessed is the word to drip feed">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  The small offer is Binge Worthy and the core offer is Obsessed. The more the word shows up in the content, the more it is the thing people want by the time the offer opens. Five things every brand with an obsessed fan base does. If you want a fan base that is obsessed with everything you make, here is what you do.
                </p>
              </Block>
            </div>
            <div className="mt-8">
              <Block label="The job the bio does">
                <BulletList
                  items={[
                    'A line of sight from where they are to where they want to get to, that they can picture.',
                    'The bio and the three pinned posts do this together. Those four things are the whole first impression.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ WHAT YOU ARE NOT ═══════════════ */}
        {sec === 'notthis' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">What you are not</p>
            <H2>Say the thing you are not.</H2>
            <Note>Articulating what you are not is what makes people trust you on what you are.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Not a business coach.</b> You help with content, brand and the psychology under both. Someone on your team covers strategy, offer, back end and tech.</>,
                  <><b className="text-white font-semibold">We are not going to teach you how to run a business.</b> Saying it plainly gets you more trust, not less, because it comes with I know how to do this because I have done it.</>,
                  <><b className="text-white font-semibold">It also protects the delivery.</b> Claim the whole business and you have to fulfil on every part of it, including the parts you do not enjoy.</>,
                ]}
              />
            </div>
            <div className="mt-8">
              <Quotes
                items={[
                  { q: 'I am very clear on I am not a business coach. I am going to help you with content.' },
                ]}
              />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ HOW TO TEST IT ═══════════════ */}
        {sec === 'test' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">How to test it</p>
            <H2>Three reels, one variable.</H2>
            <Note>Ideally you keep the line consistent. If you want to know which version lands, test it properly rather than drifting.</Note>
            <div className="mt-8">
              <Cards
                cols={3}
                items={[
                  {
                    kicker: 'Version A',
                    title: 'Bingeable brand',
                    body: 'I teach the psychology behind building a bingeable brand.',
                  },
                  {
                    kicker: 'Version B',
                    title: 'With the PhD',
                    body: 'I teach the psychology behind bingeable brands, as someone earning their PhD in business psychology.',
                  },
                  {
                    kicker: 'Version C',
                    title: 'Brands people are obsessed with',
                    body: 'I teach the psychology behind a brand people are obsessed with.',
                  },
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="The rule">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  Everything in the script is identical across all three. Same hook, same body, same CTA. The only thing that changes is the line. Otherwise you learn nothing.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ THE THREE BUCKETS ═══════════════ */}
        {sec === 'buckets' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The buckets</p>
            <H2>Mindset, content, systems.</H2>
            <Note>Three buckets is everything you need to talk about. They came straight out of your own three day workshop, which is now the 90 day offer.</Note>
            <div className="mt-8">
              <BucketCards />
            </div>
            <div className="mt-10">
              <Block label="The split">
                <BulletList
                  items={[
                    <><b className="text-white font-semibold">40 mindset, 30 content, 30 systems.</b> The 40 keeps the audience you already have fed, so this never reads as a sudden turn.</>,
                    <><b className="text-white font-semibold">These are the bones.</b> Drip anything else on top when something happens in your world and you want to respond to it.</>,
                    <><b className="text-white font-semibold">Filter everything through who you are and what you do for them,</b> so the off the cuff stuff does not start attracting the wrong people again.</>,
                    <><b className="text-white font-semibold">Buckets first, then topics.</b> Every idea you already have goes into one of the three before anything gets made.</>,
                  ]}
                />
              </Block>
            </div>
            <div className="mt-8">
              <Block label="Every post ends the same way">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  So that you can. Whatever the video opened with, mindset included, the ending points at brand or content. I created success when I created an alter ego and a brand identity, click below to learn how to do that.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ PERSPECTIVE ═══════════════ */}
        {sec === 'perspective' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Perspective</p>
            <H2>The four things nobody can copy.</H2>
            <Note>The filter is two parts. Positioning is who you are. Perspective is what backs it. These are the four sources.</Note>
            <div className="mt-8">
              <Cards
                items={[
                  { kicker: 'One', title: 'Stories', body: 'What you have done. You have more of this than almost anyone, and you are already unapologetic with it.' },
                  { kicker: 'Two', title: 'Data', body: 'The numbers you have access to. Your own view counts, follower jumps, what an email actually made.' },
                  { kicker: 'Three', title: 'Methods and mechanisms', body: 'This is the way I do things. The masterclass format, the funnel, the email templates you already built out.' },
                  { kicker: 'Four', title: 'Case studies', body: 'Examples of other people, or examples of you, walked through step by step.' },
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="How to use them">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  Every point in a video gets reinforced with one of the four. That is the difference between a video about a topic and a video only you could have made. In every YouTube video we make for Taki, every single point has one attached, and it gets pulled out of him deliberately.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ THE PIVOT ═══════════════ */}
        {sec === 'pivot' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">The pivot</p>
            <H2>Do not hard cut. Channel.</H2>
            <Note>The only reason to walk away from the audience you built is impatience.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Hundreds of thousands of people already know you for something.</b> The biggest opportunity you have is influencing them with the influence you already hold.</>,
                  <><b className="text-white font-semibold">Take the belief, break it, replace it.</b> Know what they currently believe, shatter it with an example or with data, then give them the reality. The data backed version, as a psychologist.</>,
                  <><b className="text-white font-semibold">That is how people start referencing you.</b> You become the person who shifted their perspective, and everybody wants to follow a leader.</>,
                  <><b className="text-white font-semibold">Keep the language they use.</b> Old soul is their word, it is working, and it is different. Use their language rather than appealing to the masses.</>,
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="The woo">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  Faith healing and the kinesiology angle stay in the back for now, because bridging them properly is a whole build. The rule for anything in that lane is simple. Only run it if you can back it with data or a study. Otherwise drip it in at about one in five and leave it there.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ PINNED POSTS ═══════════════ */}
        {sec === 'pinned' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Pinned posts</p>
            <H2>Three posts, two jobs.</H2>
            <Note>They landed on your profile because there was congruence between the video and what they found. The pinned posts hold that up.</Note>
            <div className="mt-8">
              <Cards
                cols={3}
                items={[
                  {
                    kicker: 'Post one',
                    title: 'Your story',
                    body: 'The carousel that already performs. This one connects people to who you are. Easiest win on the page, because the breakdown video already exists.',
                  },
                  {
                    kicker: 'Post two',
                    title: 'A mechanism or method',
                    body: 'This one connects people to what you do and what you can do for them. A video walkthrough, a cheat sheet or a diagnostic. Walkthroughs are the strongest and you already have them.',
                  },
                  {
                    kicker: 'Post three',
                    title: 'The speaking gig',
                    body: 'Stays. It is proof, and it does a job the other two cannot.',
                  },
                ]}
              />
            </div>
            <div className="mt-10">
              <Block label="What changes">
                <BulletList
                  items={[
                    'The rich bitch timeline post is a better hold than the dark side material, because at least it points at money.',
                    'The old soul posts pulled enormous reach and said nothing about what you sell. They come down as pins and stay in the feed.',
                    'Two of the three need to capture intent. Right now they point at a masterclass that stopped six months ago.',
                  ]}
                />
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ LEAD MAGNETS ═══════════════ */}
        {sec === 'magnets' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Lead magnets</p>
            <H2>Capture the intent, then know where it came from.</H2>
            <Note>Two of the three pinned posts run a ManyChat flow. One catches people for who you are, the other for what you do.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Start with the story carousel.</b> Change the caption, they comment, the flow fires, they get the video where you break down that exact carousel. It is already recorded.</>,
                  <><b className="text-white font-semibold">Tag by source.</b> If they came in from a brand story post, tag them as that. You want to know what someone is interested in at the moment they raise their hand.</>,
                  <><b className="text-white font-semibold">Every CTA points at the same place.</b> Content or systems. Whatever the magnet is, the outcome it promises has to sit inside what you sell.</>,
                  <><b className="text-white font-semibold">Three emails a week.</b> The list is what warms people up and nurtures them between posts. Taki&rsquo;s emails are as unhinged as they get, and every one still channels back to the same outcome.</>,
                ]}
              />
            </div>
            <div className="mt-8">
              <Block label="The shape of a good one">
                <p className="text-zinc-300 text-[15px] leading-relaxed">
                  This is one of the five things we do in almost every video to make it bingeable. If you want the other four, comment below. One step of a five step process, delivered behind an email gate.
                </p>
              </Block>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ WHAT TO GIVE AWAY ═══════════════ */}
        {sec === 'giveaway' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">What to give away</p>
            <H2>Give about 40 percent.</H2>
            <Note>The answer to give it all away or keep it all in the back end. It is a business strategy question before it is a content one.</Note>
            <div className="mt-8">
              <BulletList
                items={[
                  <><b className="text-white font-semibold">Play the information game and you lose.</b> A business that sells information has a 90 day timeline, because the moment they can get it on the outside they churn and you are building a new offer six months later.</>,
                  <><b className="text-white font-semibold">The most valuable thing inside is usually worth even more outside.</b> Use it on the front end. Give one of the five and gate the depth.</>,
                  <><b className="text-white font-semibold">What holds people is consumable.</b> Group calls. Content clinics where everyone builds content live together. Community. What is working right now, updating every month. None of that exists on the outside.</>,
                  <><b className="text-white font-semibold">Your own breakdowns are the proof.</b> Breaking down why your own video went viral is exactly what you teach on the inside, which is why it works so hard on the front end.</>,
                ]}
              />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ DO THIS NOW ═══════════════ */}
        {sec === 'now' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Do this now</p>
            <H2>The list.</H2>
            <Note>In order. All of it sits inside the next three weeks.</Note>
            <div className="mt-8">
              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full min-w-[36rem] text-left">
                  <thead>
                    <tr className="bg-elevated/60">
                      {['', 'Do', 'Why'].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-[10px] uppercase tracking-widest font-semibold text-zinc-500 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { n: '1', do: 'Change the bio.', why: 'Brand strategist. Helping you master the psychology behind building a bingeable brand. Wealth activator comes out.' },
                      { n: '2', do: 'Rebuild the three pinned posts.', why: 'Story, mechanism, speaking gig. The first two carry the intent capture.' },
                      { n: '3', do: 'Wire two of them to ManyChat.', why: 'Start with the story carousel, because the breakdown video is already recorded.' },
                      { n: '4', do: 'Set the buckets.', why: '40 mindset, 30 content, 30 systems. Sort every idea you already have into one of the three.' },
                      { n: '5', do: 'Run three trial reels on the line.', why: 'Same script top to bottom, only the one liner changes.' },
                      { n: '6', do: 'Send three emails a week.', why: 'Warms and nurtures between posts, and every one channels back to the same outcome.' },
                      { n: '7', do: 'Put a so that you can on every post.', why: 'It has to point at brand or content, whatever the video opened with.' },
                    ].map((r) => (
                      <tr key={r.n} className="border-t border-zinc-800/70 align-top">
                        <td className="px-4 py-4 text-blue-400 text-[15px] font-semibold tabular-nums">{r.n}</td>
                        <td className="px-4 py-4 font-display text-[15px] font-extrabold text-white">{r.do}</td>
                        <td className="px-4 py-4 text-zinc-400 text-[13px] leading-relaxed">{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-10">
              <Section>
                <div className="glow-card border-blue-500/20 p-8">
                  <p className="text-blue-400 font-semibold text-[13px] uppercase tracking-widest mb-3">The measure</p>
                  <p className="text-white text-[16px] leading-relaxed font-medium">
                    Clarity from a one to at least a three. Then we read visibility, authority and quality. Chat in three weeks.
                  </p>
                </div>
              </Section>
            </div>
          </Wrap>
        )}

        {/* ═══════════════ PARKED ═══════════════ */}
        {sec === 'parked' && (
          <Wrap>
            <p className="text-blue-400 text-[11px] uppercase tracking-widest font-semibold mb-2">Parked</p>
            <H2>Deliberately not now.</H2>
            <Note>Each one of these is a decision made on the call. They come back on the table later.</Note>
            <div className="mt-8">
              <Cards
                items={[
                  {
                    kicker: 'Later',
                    title: 'YouTube',
                    body: 'A 90 day experiment for down the track. It is a warming channel, and it is not what moves clarity in the next three weeks.',
                  },
                  {
                    kicker: 'Behind a gate',
                    title: 'Faith healing and kinesiology',
                    body: 'Only if it can be backed by a study or by data. Bridging it properly is a whole build on its own. Until then it drips in at about one in five.',
                  },
                  {
                    kicker: 'Rebuilding',
                    title: 'The signature offer',
                    body: 'The three day workshop condensed into a 90 day program, with group coaching over messaging. Binge Worthy as the smaller offer, Obsessed as the core.',
                  },
                  {
                    kicker: 'Behind clarity',
                    title: 'Ads and the funnel',
                    body: 'Visibility can be bought whenever you want it. Pointing paid reach at a profile that is still a one on clarity shows more people something confusing.',
                  },
                ]}
              />
            </div>
          </Wrap>
        )}

        {/* ═══════════════ INDEX ═══════════════ */}
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
