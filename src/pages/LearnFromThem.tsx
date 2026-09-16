import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Section } from '../components/undeniable/Bits';
import { trackCta, SRC_PARAM } from '../lib/track';

/*
  /learnfromthem - "Steal it". The principles pulled out of the media
  operations Sean has actually built, named by the operation they came from.

  Public. No password gate, indexed. It is a proof asset, so the job of the
  page is the names and the numbers being visible without a login.

  Designed as a document, not a landing page. No cards, no pills: hairline
  rules carry the structure and run in heads carry the labelling, the way
  print does it. The card-and-chip version read as generic AI output.

  A sticky rail lists the five principles and tracks which one is on screen,
  so the page can be jumped around rather than only scrolled.

  Copy is Sean's, verbatim.
*/

type Example = { label: string; href: string };

type Lesson = {
  n: string;
  title: string;
  problem: string;
  principle: string[];
  applied: string[];
  detail: string[];
  examples?: Example[];
};

const LESSONS: Lesson[] = [
  {
    n: '01',
    title: 'Master your messaging to craft a path to money.',
    problem:
      'More content does not help if the market cannot quickly understand who you help, what you believe, why your approach is different, or why they should buy.',
    principle: [
      'Start with the buying decision.',
      'Identify what your ideal client must believe about their problem, the solution, and you before they take action.',
      'Then build the messaging and content explicitly around installing those beliefs.',
    ],
    applied: ['Taki Moore', 'Matt Lakajev', 'Jay Wright'],
    detail: [
      "This is installed into every single business. 'Brand' is an intentionally crafted position in the market exclusively devoted to point all attention toward increasing the chance of advocacy, and purchase likelihood.",
      'With Matt we built a 6 hour evergreen training designed to give the ideal client the conviction required to make a purchase, without diluting his offer.',
      'With Jay, we built demonstrative formats to obliterate his prospects objections.',
      'With Taki there is overwhelming, undeniable proof in every Youtube video.',
    ],
    examples: [
      { label: 'Taki Moore on YouTube', href: 'https://www.youtube.com/@TakiMoore' },
      { label: 'Jay Wright on Instagram', href: 'https://www.instagram.com/jaywrightofficial/' },
      {
        label: "Matt Lakajev, 6 Hour Course: How to Make Money on LinkedIn",
        href: 'https://www.youtube.com/watch?v=MtWbWRJ_Plc&t=2668s',
      },
    ],
  },
  {
    n: '02',
    title: 'Build the media operation to reduce founder dependency',
    problem:
      'The founder remains the only person who can generate ideas, make decisions, or maintain quality.',
    principle: [
      'Develop an operator who can run the rhythm, manage the pipeline, identify problems, and improve the team.',
    ],
    applied: ['Rhys Livingstone', 'Sam Ackland', 'Hey Doza'],
    detail: [
      'Media teams rebuilt and trained, talent development paths installed, and a videographer developed into a marketer and strategist.',
      "We built out Jay's content system to get a 90/10 with ~5 hours on average available per month.",
    ],
  },
  {
    n: '03',
    title: 'Define ownership before increasing output',
    problem:
      'If nobody owns strategy, innovation, creative direction or production, the entire process is chaos.',
    principle: [
      'Define roles, responsibilities, compensation, and standard of execution before increasing output.',
    ],
    applied: ['Hey Doza', 'Rhys Livingstone'],
    detail: [
      'Media structures were rebuilt, roles and compensation defined, hiring processes installed, talent recruited, and teams trained.',
    ],
  },
  {
    n: '04',
    title: 'Build content around authority rather than attention.',
    problem: 'Short form output creates views, but not conviction.',
    principle: [
      'Use short form for discovery, long form for trust, and content that moves people through the buying journey.',
      'Understand explicitly what is required in order for somebody to make a purchase, then craft specific videos in order to install each belief.',
    ],
    applied: ['Taki Moore', 'Matt Lakajev', 'Rhys Livingstone'],
    detail: [
      "Taki's latest series generated 139K views across 9 videos in two weeks from 3 filming days. But we started explicitly with 'what do people need from me in order to make a purchase'",
      'We built Matt Lakajev a 6 hour video which gave his ideal client everything they needed to make a purchase.',
    ],
    examples: [
      { label: 'Taki Moore on YouTube', href: 'https://www.youtube.com/@TakiMoore' },
      {
        label: "Matt Lakajev, 6 Hour Course: How to Make Money on LinkedIn",
        href: 'https://www.youtube.com/watch?v=MtWbWRJ_Plc&t=2668s',
      },
      {
        label: "Rhys Livingstone, If I Wanted to Make $1M as a Fitness Coach Again",
        href: 'https://www.youtube.com/watch?v=LZadyJ0_N9g&t=487s',
      },
    ],
  },
  {
    n: '05',
    title: 'Turn expertise into assets.',
    problem: 'Your best ideas die in a one time post 30 minutes after it goes live',
    principle: [
      'We must evaluate where we can get additional leverage from existing work.',
      'Convert current expertise into lead magnets, walkthroughs and repeatable trust assets that compound in the background.',
    ],
    applied: ['Matt Lakajev', 'Hey Doza', 'Rhys Livingstone'],
    detail: [
      'Both a six hour evergreen course and an organic Trojan Horse VSL were built as ongoing demand assets, and we are now looking at existing lead magnets to repackage lead magnets.',
    ],
    examples: [
      {
        label: "Matt Lakajev, 6 Hour Course: How to Make Money on LinkedIn",
        href: 'https://www.youtube.com/watch?v=MtWbWRJ_Plc&t=2668s',
      },
    ],
  },
];

/*
  Each issue is paired with the principle that answers it, taken from what
  that principle's own copy addresses. The pairing is not the list order:
  "posts, but not assets" is answered by 05, and "no clear path to money" by
  04, which is the one about content having a commercial job.
*/
const ISSUES: Array<{ text: string; solvedBy: string }> = [
  { text: 'Diluted messaging with no clear differentiation.', solvedBy: '01' },
  { text: 'The founder is still the bottleneck.', solvedBy: '02' },
  { text: 'Nobody clearly owns the output.', solvedBy: '03' },
  { text: 'The team creates posts, but not assets.', solvedBy: '05' },
  {
    text: 'Content is produced without a commercial job. There is no clear path to money.',
    solvedBy: '04',
  },
];

const PATH = ['Messaging', 'Ownership', 'Operator', 'Production', 'Assets', 'Demand'];

const sectionId = (n: string) => `principle-${n}`;

/* Smooth jump, page local, with the header height already handled by the
   scroll-mt on each article. Falls back to the plain anchor if the node is
   not there. */
const jumpTo = (n: string) => (e: React.MouseEvent) => {
  const el = document.getElementById(sectionId(n));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${sectionId(n)}`);
};

/* Run in head. The label sits inside the paragraph the way print does it,
   instead of floating above the text as its own coloured chip. */
function RunIn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="text-[16px] leading-[1.75]">
      <span className="text-white font-semibold">{label}.</span>{' '}
      <span className="text-zinc-400">{children}</span>
    </p>
  );
}

/*
  The rail. It only earns its space once there is something to navigate, so it
  is desktop only and sits sticky beside the lessons. `active` comes from the
  observer below rather than from the hash, so plain scrolling updates it too.
*/
function PrincipleNav({ active }: { active: string }) {
  return (
    <nav className="sticky top-28 self-start">
      <p className="text-[11px] font-medium text-zinc-600 uppercase tracking-[0.2em] mb-6">
        The principles
      </p>
      <ol className="space-y-1">
        {LESSONS.map((l) => {
          const on = active === l.n;
          return (
            <li key={l.n}>
              <a
                href={`#${sectionId(l.n)}`}
                className={`group flex gap-3 border-l py-2.5 pl-4 transition-colors ${
                  on ? 'border-blue-500' : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <span
                  className={`text-[12px] tabular-nums pt-px transition-colors ${
                    on ? 'text-blue-500' : 'text-zinc-600 group-hover:text-zinc-500'
                  }`}
                >
                  {l.n}
                </span>
                <span
                  className={`text-[13px] leading-[1.5] transition-colors ${
                    on ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  {l.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LessonBlock({ lesson }: { lesson: Lesson }) {
  return (
    <article
      id={sectionId(lesson.n)}
      data-principle={lesson.n}
      className="border-t border-zinc-800/80 py-14 md:py-20 scroll-mt-28"
    >
      <p className="font-display text-[13px] tracking-[0.2em] text-blue-500 mb-5 tabular-nums">
        {lesson.n}
      </p>

      <h2 className="font-display text-[22px] md:text-[30px] tracking-[-0.02em] text-white leading-[1.2] mb-8">
        {lesson.title}
      </h2>

      <div className="space-y-5 mb-10">
        <RunIn label="Problem">{lesson.problem}</RunIn>
        <div className="space-y-2">
          <RunIn label="Principle">{lesson.principle[0]}</RunIn>
          {lesson.principle.slice(1).map((p) => (
            <p key={p} className="text-zinc-400 text-[16px] leading-[1.75]">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {lesson.detail.map((d) => (
          <p key={d} className="text-zinc-500 text-[15px] leading-[1.75]">
            {d}
          </p>
        ))}
      </div>

      <p className="text-[14px] text-zinc-500">
        <span className="text-zinc-600">Applied in </span>
        {lesson.applied.map((name, i) => (
          <React.Fragment key={name}>
            {i > 0 && <span className="text-zinc-700"> · </span>}
            <span className="text-zinc-300">{name}</span>
          </React.Fragment>
        ))}
      </p>

      {lesson.examples && (
        <ul className="mt-5 space-y-2">
          {lesson.examples.map((ex) => (
            <li key={ex.href}>
              <a
                href={ex.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 text-[14px] text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                <span className="underline underline-offset-4 decoration-zinc-700 group-hover:decoration-blue-500">
                  {ex.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function LearnFromThem() {
  const [active, setActive] = React.useState(LESSONS[0].n);

  /*
    Scroll spy. The top band of the viewport is what counts as "current", so a
    principle lights up as its heading arrives rather than when its last line
    finally clears the fold.
  */
  React.useEffect(() => {
    const nodes = LESSONS.map((l) => document.getElementById(sectionId(l.n))).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onScreen.length > 0) {
          const n = (onScreen[0].target as HTMLElement).dataset.principle;
          if (n) setActive(n);
        }
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Steal it"
        description="The principles of building scalable founder led media. Five principles from five years working alongside the best in the world."
        path="/learnfromthem"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_236px] lg:gap-16">
          {/* Column one: the document */}
          <div className="max-w-3xl">
            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-20">
              <Section>
                <div className="accent-line mb-8" />
                <p className="text-[13px] font-medium text-zinc-500 uppercase tracking-[0.2em] mb-6">
                  Steal it
                </p>
                <h1 className="font-display text-3xl md:text-[44px] tracking-[-0.03em] text-white leading-[1.1] mb-10">
                  The principles of building scalable founder led media.
                </h1>
                <p className="text-zinc-400 text-[17px] md:text-[19px] leading-[1.7] mb-8">
                  Rather than giving you a &lsquo;look how great I am&rsquo; pitch,
                  <br />
                  These are 5 principles from 5 years working alongside the best in the world.
                </p>
                <p className="text-zinc-300 text-[17px] md:text-[19px] leading-[1.7]">
                  Typically businesses don&rsquo;t have a content problem.
                </p>
                <p className="text-zinc-300 text-[17px] md:text-[19px] leading-[1.7]">
                  They have one of five issues.
                </p>
              </Section>
            </section>

            {/* The issues */}
            <section className="pb-16 md:pb-20">
              <Section>
                <ul className="border-t border-zinc-800/80">
                  {ISSUES.map((issue, i) => (
                    <li key={issue.text} className="border-b border-zinc-800/80">
                      <a
                        href={`#${sectionId(issue.solvedBy)}`}
                        onClick={jumpTo(issue.solvedBy)}
                        className="group flex items-start gap-5 py-5 transition-colors"
                      >
                        <span className="text-[12px] tabular-nums text-zinc-600 group-hover:text-blue-500 transition-colors pt-1.5 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-zinc-300 group-hover:text-white text-[16px] leading-[1.7] transition-colors">
                          {issue.text}
                        </span>
                        <ArrowRight className="w-4 h-4 mt-1.5 flex-shrink-0 text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            </section>

            {/* The path to money. The spine, stated before the lessons that build it. */}
            <section className="pb-16 md:pb-20">
              <Section>
                <div className="border-t border-zinc-800/80 pt-10">
                  <p className="text-[13px] font-medium text-zinc-500 uppercase tracking-[0.2em] mb-6">
                    The path to money
                  </p>
                  <p className="font-display text-[17px] md:text-[21px] leading-[1.6] tracking-[-0.02em] text-white">
                    {PATH.map((step, i) => (
                      <React.Fragment key={step}>
                        {i > 0 && <span className="text-blue-500/60 font-normal mx-1.5">&gt;</span>}
                        <span className="whitespace-nowrap">{step}</span>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </Section>
            </section>

            {/* Lessons */}
            <section>
              {LESSONS.map((lesson) => (
                <Section key={lesson.n}>
                  <LessonBlock lesson={lesson} />
                </Section>
              ))}
            </section>

            {/* The way off the page. */}
            <section className="border-t border-zinc-800/80 py-14 md:py-20">
              <Section>
                <a
                  href={`/offer?${SRC_PARAM}=learnfromthem`}
                  onClick={() => trackCta('learnfromthem-offer')}
                  className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
                >
                  How we typically work with founders
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Section>
            </section>
          </div>

          {/* Column two: the rail */}
          <div className="hidden lg:block pt-40">
            <PrincipleNav active={active} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
