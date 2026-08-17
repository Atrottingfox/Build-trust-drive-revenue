import React from 'react';
import { Shell, PageHead, Wrap, Divider, Block, BulletList, Note, H2 } from '../components/undeniable/Bits';

const Formula = () => (
  <div className="flex flex-wrap items-center gap-2 mb-12">
    {['Hook', 'Problem', 'Path / Solution', 'Takeaway'].map((s, i, a) => (
      <React.Fragment key={s}>
        <span className="px-3.5 py-2 rounded-lg border border-zinc-800 bg-elevated text-white text-[14px] font-medium">{s}</span>
        {i < a.length - 1 && <span className="text-blue-400">&rarr;</span>}
      </React.Fragment>
    ))}
  </div>
);

export default function UndeniableContentSystem() {
  return (
    <Shell title="Content System · Undeniable" description="The tactile operating system: formats, modes, capture, measurement, production." path="/undeniablenextsteps/content-system">
      <PageHead
        eyebrow="Reference · The system"
        title="The Tactile Content"
        accent="System."
        blurb="The operating layer the team runs from. Formats, hooks, capture, measurement, production and the room. This is the how, not the why."
      />
      <Divider />

      <Wrap>
        <H2>The master short form formula.</H2>
        <Formula />
        <BulletList items={[
          <><b className="text-white font-semibold">Solution must contain a tool or a "don't do this."</b> Not just a concept. Something they can hold or avoid.</>,
          <><b className="text-white font-semibold">CTA is optional per video.</b> Where it earns its place: share this, save this, comment, follow.</>,
          <><b className="text-white font-semibold">One core problem, one promise, one outcome.</b> Rhys's current habit is solving too many at once. Stop. "Just solve one thing at a time."</>,
        ]} />
      </Wrap>
      <Divider />

      <Wrap>
        <H2>The five signature formats.</H2>
        <Note>The rotation. The 30 day test finds which actually perform, then you lock them.</Note>
        <div className="mt-8" />
        <BulletList items={[
          <><b className="text-white font-semibold">Whiteboard Demo · "this, this, that."</b> A framework, graph or made up acronym drawn live. Flagship: the lead vs churn inverse.</>,
          <><b className="text-white font-semibold">Live Math / Reality Check.</b> Pull out the phone, do the math on a real business. The graph people can't argue with.</>,
          <><b className="text-white font-semibold">Client Problem (Documentation).</b> An anonymised real problem from a call that week, and the diagnosis.</>,
          <><b className="text-white font-semibold">Binary / Two Paths.</b> Make them choose, signal doer vs not. Trains the dream client.</>,
          <><b className="text-white font-semibold">Belief Flip · old way vs new way.</b> Contrarian with data, the side by side.</>,
        ]} />
      </Wrap>
      <Divider />

      <Wrap>
        <H2>The three modes + the make it land rules.</H2>
        <Block label="Three content modes">
          <BulletList items={[
            <><b className="text-white font-semibold">Demonstration</b> — whiteboard + top down. Showing, not telling. The best kind.</>,
            <><b className="text-white font-semibold">Documentation</b> — telling stories and hot takes. The "share" lens.</>,
            <><b className="text-white font-semibold">Teaching</b> — concise education, one takeaway, implementable now.</>,
          ]} />
        </Block>
        <Block label="Make it land">
          <BulletList items={[
            <><b className="text-white font-semibold">Saves are a warning, not a win.</b> High saves can mean too dense to action now. Treat it as a flag to simplify.</>,
            <><b className="text-white font-semibold">"How I" over "how to."</b> Disarming, less threatening, built for the burned audience.</>,
            <><b className="text-white font-semibold">The bridge beats the bolt on CTA.</b> Bridge an asset ~1/3 through. Native. Not tacked on the end.</>,
            <><b className="text-white font-semibold">Never let it feel like an ad.</b> The ads instinct is the trap. Organic, woven, not salesy.</>,
            <><b className="text-white font-semibold">Package belief into story.</b> Chocolate and broccoli. Relatability ladder: experiences → interests → values → beliefs → identity.</>,
          ]} />
        </Block>
      </Wrap>
      <Divider />

      <Wrap>
        <H2>The capture system.</H2>
        <Note>So the team brings content to Rhys, instead of Rhys arriving with it.</Note>
        <div className="mt-8" />
        <BulletList items={[
          <><b className="text-white font-semibold">End of day four questions</b> (voice note): What did they learn? What problem did I solve? What did I teach? What do I do differently?</>,
          <><b className="text-white font-semibold">Mid week client problem note.</b> Worth a piece? Voice note it, send to Jacob as base content.</>,
          <><b className="text-white font-semibold">Content installs behaviour.</b> The binary format trains people to self identify as doers before they walk in.</>,
        ]} />
      </Wrap>
      <Divider />

      <Wrap>
        <H2>Measurement.</H2>
        <Block label="The table · logged manually, daily">
          <div className="rounded-xl border border-zinc-800 bg-elevated px-5 py-4 text-zinc-300 text-[14px] font-mono leading-relaxed">
            Video · Hook · Topic · Likes · Avg view duration · Saves · Shares · Comments
          </div>
        </Block>
        <Block label="The cadence + the real signal">
          <BulletList items={[
            'First thing each morning: review yesterday. Monday: best stat, highest watch video, the topic.',
            'Drop off at 3-4 seconds? Put a rehook there, or layer the CTA right there.',
            <><b className="text-white font-semibold">The real optimisation is the ICP check</b> — are the people commenting the avatar, not raw views.</>,
            'Topic selection is where strategy lives. It gets Jacob off "let me just sit and edit."',
          ]} />
        </Block>
      </Wrap>
      <Divider />

      <Wrap>
        <H2>Production + the room.</H2>
        <Block label="Production">
          <BulletList items={[
            <><b className="text-white font-semibold">Pre production is half the win.</b> Write the hook + problem before each shoot. Reference speed: 24 shorts in 2.5 hours.</>,
            'Two camera minimum, lined up so the second cut is exact. Lo fi, no pop ups, "relatively Joey."',
            <><b className="text-white font-semibold">Walk the doc (Cole Gordon).</b> Laptop in front, walk a Google doc, press record. Rhys self directs when Jacob\'s tied up.</>,
            'iPad draw behind (Jeremy Haynes) for visual frameworks.',
          ]} />
        </Block>
        <Block label="The room">
          <BulletList items={[
            'Dark + light split. Moody black for hard hitting. Lit for educational.',
            'Everything on wheels. Top down desk, C stand, screen on an articulating arm or tracks so it doesn\'t compromise the clean shot.',
            'Pull down backdrops to vary it.',
          ]} />
        </Block>
      </Wrap>
      <Divider />

      <Wrap>
        <H2>Environments, cadence, the 30 day test.</H2>
        <BulletList items={[
          <><b className="text-white font-semibold">Four core environments, rotate (don't test):</b> this office, hallway, park, gym. Get 3 per environment, pick the best 14.</>,
          <><b className="text-white font-semibold">Shoot Mon / Wed / Fri, half days.</b> Monday: ideation AM, shoot 10-2, consolidate PM.</>,
          <><b className="text-white font-semibold">14 new tactical a week</b> (2/day) on top of the existing rhythm. Backlog drips 2/day to the second page.</>,
          <><b className="text-white font-semibold">Isolate the new content ~2 weeks</b> for clean data. No collabs during the test.</>,
          <><b className="text-white font-semibold">After 30 days: keep winners, kill duds, lock 4 types</b> for the next 60. Test 1-2 new a month.</>,
        ]} />
        <Note>Next: the Shoot Card turns all of this into the one page Jacob holds on the day.</Note>
      </Wrap>
    </Shell>
  );
}
