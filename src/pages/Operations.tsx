import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import Footer from '../components/Footer';
import RoleBrief, { RoleBriefHeader } from '../components/operations/RoleBrief';
import Engagement, { EngagementHeader } from '../components/operations/Engagement';

/*
  /operations - the documents behind the Fractional Operations Manager role.

  Tabs rather than separate routes, because these are read together: the brief
  says what the job is, the engagement says what is being bought and how day 90
  is judged. Someone deciding on the role moves between them.

  The active tab is carried in ?doc= so a single tab is linkable. Sean sends one
  link and can point at a specific document.
*/

const DOCS = [
  {
    key: 'brief',
    tab: 'Role brief',
    header: <RoleBriefHeader />,
    body: <RoleBrief />,
  },
  {
    key: 'engagement',
    tab: 'Consulting engagement',
    header: <EngagementHeader />,
    body: <Engagement />,
  },
] as const;

type DocKey = (typeof DOCS)[number]['key'];

export default function Operations() {
  const location = useLocation();
  const navigate = useNavigate();

  const fromUrl = new URLSearchParams(location.search).get('doc');
  const initial: DocKey = DOCS.some((d) => d.key === fromUrl) ? (fromUrl as DocKey) : 'brief';
  const [active, setActive] = useState<DocKey>(initial);

  /* Back and forward should move between documents, not off the page. */
  useEffect(() => {
    const key = new URLSearchParams(location.search).get('doc');
    setActive(DOCS.some((d) => d.key === key) ? (key as DocKey) : 'brief');
  }, [location.search]);

  const select = (key: DocKey) => {
    if (key === active) return;
    navigate(key === 'brief' ? '/operations' : `/operations?doc=${key}`);
    window.scrollTo({ top: 0 });
  };

  const doc = DOCS.find((d) => d.key === active) ?? DOCS[0];

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-28 sm:pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          {/*
            Scrolls sideways on a narrow screen rather than wrapping, so the tab
            row stays one line and reads as a set however many documents there are.
          */}
          <div className="max-w-3xl mb-10 overflow-x-auto scrollbar-hide">
            <div className="inline-flex gap-1 rounded-full border border-zinc-800 bg-zinc-950/40 p-1">
              {DOCS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => select(d.key)}
                  aria-current={d.key === active ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition-colors ${
                    d.key === active
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {d.tab}
                </button>
              ))}
            </div>
          </div>

          {doc.header}

          <div className="gradient-line my-14 sm:my-20" />

          {doc.body}
        </div>
      </Container>

      <Footer />
    </div>
  );
}
