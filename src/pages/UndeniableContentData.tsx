import React from 'react';
import { Shell, PageHead, Wrap } from '../components/undeniable/Bits';

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-300 mb-3">{children}</p>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5">
    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
    <span className="text-zinc-200 text-[13px]">{children}</span>
  </li>
);

export default function UndeniableContentData() {
  return (
    <Shell title="Data · Content · Undeniable" description="What we log on every piece, and when. Short form at 24 hours and 7 days. Long form at 48 hours and 7 days." path="/undeniablenextsteps/content/data">
      <PageHead
        eyebrow="Content · Data"
        title="The"
        accent="Data."
        blurb="Log every piece. Short form at 24 hours, then again at 7 days. Long form at 48 hours, then again at 7 days. This is the scoreboard everything else is read against."
        backHref="/undeniablenextsteps/content"
        backLabel="Content"
      />

      <Wrap>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Shortform. 24 hours after posting.</SubEyebrow>
            <ul className="space-y-1.5">
              <Bullet>Pillar + topic</Bullet>
              <Bullet>Format (Story / Belief / Teach / Show)</Bullet>
              <Bullet>Hook</Bullet>
              <Bullet>Views, Saves, Shares, Comments</Bullet>
              <Bullet>CTA (if applicable)</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Shortform. 7 days after posting.</SubEyebrow>
            <p className="text-zinc-200 text-[13px]">Update log in new section on same post with final numbers.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Longform. At 48 hours.</SubEyebrow>
            <ul className="space-y-1.5">
              <Bullet>Title and hook</Bullet>
              <Bullet>Split test data. Log both thumb and title of each test. Keep winner, test 2 additional titles.</Bullet>
              <Bullet>Pillar / topic</Bullet>
              <Bullet>Current views</Bullet>
              <Bullet>Avg view duration / % watched</Bullet>
              <Bullet>Clicks to description CTAs</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-elevated/30 p-5">
            <SubEyebrow>Longform. Updated at 7 days.</SubEyebrow>
            <ul className="space-y-1.5">
              <Bullet>Views</Bullet>
              <Bullet>Avg view duration / % watched</Bullet>
              <Bullet>Clicks to assets</Bullet>
              <Bullet>Apps you can reasonably tie back to people who watched</Bullet>
              <Bullet>Split test data. Keep winner, split test two more additional thumbnails.</Bullet>
            </ul>
          </div>
        </div>
      </Wrap>
    </Shell>
  );
}
