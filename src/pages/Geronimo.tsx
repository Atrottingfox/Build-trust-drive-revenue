import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Layers, Settings, Check, Compass, Zap, Shield, AlertCircle, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

type Week = {
  label: string;
  title: string;
  body?: string[];
  points?: string[];
};

function PhaseWeeks({ weeks }: { weeks: Week[] }) {
  return (
    <div className="space-y-8">
      {weeks.map((week, i) => (
        <motion.div
          key={i}
          className="glow-card p-8 md:p-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <p className="font-display text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight">{String(i + 1).padStart(2, '0')}</p>
            <div>
              <p className="text-zinc-600 text-xs uppercase tracking-widest">{week.label}</p>
              <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-white leading-[1.1]">
                {week.title}
              </h3>
            </div>
          </div>
          {week.body && (
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed mb-6">
              {week.body.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          )}
          {week.points && (
            <ul className="space-y-2">
              {week.points.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function Geronimo() {
  return (
    <PasswordGate storageKey="geronimo-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="Geronimo. 12 Week Media OS Plan"
        description="Free Nate from the weeds. Feed growth on purpose. A 12 week plan to break the editing bottleneck and install a Media OS that reliably drives Geronimo's growth."
        path="/geronimo"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="max-w-3xl">
              <div className="accent-line mb-8" />
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">12 Week Plan</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Geronimo.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                Free Nate from the weeds. Feed growth on purpose.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 01 · THE GOAL */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">01 · The Goal</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Make the media engine boring.
              <br />
              <span className="text-zinc-500">Make growth intentional.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
              The point of this project is simple.
            </p>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4">
                {[
                  'Break the editing bottleneck for good.',
                  'Turn Nate from super editor into a confident operator and strategist.',
                  "Build a simple Media OS that reliably feeds Geronimo's growth, and keeps HeyDoza moving, without anyone needing to white knuckle it.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-base md:text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Over 12 weeks</p>
            <div className="max-w-3xl space-y-4 mb-12">
              {[
                'Fix editing so Nate is out of 80% of the cutting.',
                'Install a repeatable content cadence and operating rhythm.',
                'Map outputs directly to the business strategy, with clear roles and responsibilities everyone agrees on.',
              ].map((item, i) => (
                <p key={i} className="text-zinc-300 font-medium leading-relaxed">
                  <span className="text-zinc-500">Step {i + 1}.</span> {item}
                </p>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">My role</p>
              <p className="text-white text-base leading-relaxed font-medium">
                To be the architect and advisor. Nate leads the implementation.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 02 · THE CHALLENGE */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">02 · The Challenge</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              Inside, the intent is clear.
              <br />
              <span className="text-zinc-500">Outside, the process isn't.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="glow-card p-8">
                <Check className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">What's working</p>
                <ul className="space-y-3">
                  {[
                    'A strong product, a big mission, and a growing audience.',
                    'Geronimo is already bringing in the most leads.',
                    'Doza still needs to show up as a founder with a bigger story than the Instagram content guy.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <AlertCircle className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-white font-semibold text-base mb-4">But</p>
                <ul className="space-y-3">
                  {[
                    'Nate is stuck in the weeds. Editing, clipping, trying to hit daily posts.',
                    'Editors are under utilised. They are paid, but not truly empowered to own the 80%.',
                    'Hayley is on the hook for triages and sales, but does not have clear visibility or a simple way to direct the media machine.',
                    'HeyDoza and Geronimo are intertwined, without a clean, simple structure.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">The gap</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Everything feels like a sprint. Nothing feels like a system.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 03 · THE OPPORTUNITY */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">03 · The Opportunity</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Strategy. Structure.
              <br />
              <span className="text-zinc-500">Systems. Sprints.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-12">
              The model I'm working from is simple.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Compass,
                  title: 'Strategy',
                  description: "We want a media machine that reliably produces the right content to drive Geronimo's growth, while Doza still builds his founder brand, and Nate isn't editing 24/7.",
                },
                {
                  icon: Layers,
                  title: 'Structure',
                  description: 'The non negotiables. Shoot cadence, days, formats, and the roles, who does what, so weeks look the same.',
                },
                {
                  icon: Settings,
                  title: 'Systems',
                  description: 'Documentation, checklists, boards, and simple scorecards so the structure runs without heroics.',
                },
                {
                  icon: Zap,
                  title: 'Sprints',
                  description: 'Short, focused periods where we attack a single bottleneck. Right now, editing.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glow-card p-8"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <item.icon className="w-5 h-5 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Over 12 weeks, we use this lens to</p>
            <ul className="space-y-4 max-w-3xl">
              {[
                'Break the editing bottleneck and get Nate out of 80% of the cutting.',
                'Install a predictable weekly rhythm across Geronimo and HeyDoza.',
                'Tie content to business strategy and lock clear ownership so Nate is empowered to make decisions and Hayley can steer with confidence.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 04 · PHASE 1 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">04 · Phase 1 · Weeks 1 to 4</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Calibration Sprint.
              <br />
              <span className="text-zinc-500">Break the editing bottleneck.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>This is the slow down to speed up month.</p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Get editing off Nate's plate, 80% plus, and build his confidence as the person who runs the operation, not the person who does all the doing.
              </p>
            </div>

            {/* Roles callout */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">The roles, at a high level</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { role: 'Doza', tag: 'the who', description: 'Mission, story.' },
                { role: 'Hayley', tag: 'the why', description: 'What business outcome content must drive.' },
                { role: 'Nate', tag: 'the how, when, where', description: 'How it is said on media, when and where it goes out.' },
                { role: 'Editors', tag: 'the doers', description: 'Make the assets.' },
              ].map((item, i) => (
                <div key={i} className="glow-card p-6">
                  <p className="text-white font-semibold text-base mb-1">{item.role}</p>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-3">{item.tag}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <PhaseWeeks
              weeks={[
                {
                  label: 'Week 1 · Map & Batch',
                  title: 'Get the pipeline full.',
                  points: [
                    'Align on roles at a high level so everyone knows their lane.',
                    'Map 4 weeks of low effort, high leverage content in advance for Geronimo, plus 1 to 2 founder pieces a week for HeyDoza.',
                    'Nate batches shooting with the crew in one heavy week, so editors have a full pipeline while he documents and trains.',
                  ],
                },
                {
                  label: 'Week 2 · Document the Standards',
                  title: 'Turn taste into checklists.',
                  body: [
                    'For each core asset type, shorts, longform YT, podcasts and highlights, Nate chooses good vs bad examples and annotates exactly what makes them good or bad. Hook, framing, pacing, captions, CTA.',
                  ],
                  points: [
                    'Translate that into simple, explicit checklists for each edit type.',
                    'No vague language like flow or pop.',
                    'Only observable, step by step instructions.',
                  ],
                },
                {
                  label: 'Week 3 · Train the Editors · 10/80/10',
                  title: 'Install the training loop.',
                  body: [
                    'We install a training loop so editors can match Nate’s standard. For each editor: Demonstrate, Nate edits a piece following the checklist out loud, screen recorded. Duplicate, the editor edits a new piece while Nate watches them follow the same checklist, any confusion means the checklist gets updated. Solo plus Loom, the editor edits in batches alone, Nate reviews at 2x speed and gives Loom feedback tied directly to specific checklist steps.',
                  ],
                  points: [
                    'One editor leads short form.',
                    'One leads longform and podcasts.',
                    'One extra contractor ready who can cut to standard when volume spikes.',
                  ],
                },
                {
                  label: 'Week 4 · Get Nate Out of the Weeds',
                  title: '80% of edits done by editors.',
                  body: [
                    'Target, 80% plus of all edits are done by editors, not Nate. Nate only touches the first 10%, creative direction and briefs, and the last 10%, QA, approvals, Loom feedback.',
                  ],
                  points: [
                    'Is Nate still editing timelines?',
                    'Are editors shipping to standard?',
                    'Does Hayley know what is coming the next 2 weeks?',
                  ],
                },
              ]}
            />

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mt-10">
              <p className="text-blue-400 font-semibold text-sm mb-3">By the end of Week 4</p>
              <p className="text-white text-base leading-relaxed font-medium">
                The editing bottleneck is broken, and Nate feels more confident and empowered to make operational decisions, not just get a post out today.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 05 · PHASE 2 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">05 · Phase 2 · Weeks 5 to 8</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Build the Media OS.
              <br />
              <span className="text-zinc-500">Lock the cadence.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>
                Once editing is off Nate's hands and documented, we move up a level. Delegate more of the process beyond just editing. Let Nate and Hayley map the structure together.
              </p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A clear, simple cadence for Geronimo and HeyDoza, with Nate owning the media operation and Hayley steering it toward business outcomes.
              </p>
            </div>

            <PhaseWeeks
              weeks={[
                {
                  label: 'Week 5 · Channel Roles & Pillars',
                  title: 'Separate the channels cleanly.',
                  points: [
                    'Geronimo is the studio and gym growth engine.',
                    'HeyDoza is the founder brand and mission, always anchored back to the work.',
                    'Define 3 to 5 core content pillars for Geronimo. Leads, churn, team, ads, burnout.',
                    'Sketch a 6 week content matrix, YT plus shorts, against those pillars.',
                  ],
                },
                {
                  label: 'Week 6 · Map Content to Business Strategy',
                  title: 'Make content useful, not just good.',
                  body: [
                    'With Hayley, map the key offers, lead magnets, and events for the next 60 days.',
                  ],
                  points: [
                    'For each planned video, add the primary business outcome. Triages for X, warm up for Y.',
                    'Add the CTA. Lead magnet, workshop, or triage call.',
                    'This is where we start mapping outputs to strategy so content is useful, not just good.',
                  ],
                },
                {
                  label: 'Week 7 · Lock the Weekly Rhythm',
                  title: 'Turn structure into checklists.',
                  points: [
                    'Monday. Quick look back at what shipped and what worked. Lock the next 2 to 4 weeks in the content board with Hayley.',
                    'Thursday. Shoot block with a simple shot list for Geronimo, plus 1 to 2 founder pieces.',
                    'Friday. Short review. What went live, early numbers, any changes needed next week.',
                    'Nate owns the how, when, where. Hayley owns the why. Everyone sees the same board.',
                  ],
                },
                {
                  label: 'Week 8 · Delegate Other Parts of the Process',
                  title: 'Hand off beyond editing.',
                  body: [
                    'With editing solid, we can safely start delegating more. Nate and I map these together so he sees both the benefits and the consequences of the choices, and feels fully responsible for what he chooses to own vs delegate.',
                  ],
                  points: [
                    'Uploading and scheduling.',
                    'Thumbnails and titles, within Nate’s standards.',
                    'Basic analytics collection.',
                  ],
                },
              ]}
            />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 06 · PHASE 3 */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">06 · Phase 3 · Weeks 9 to 12</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Tune. Empower.
              <br />
              <span className="text-zinc-500">Align the roles.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-12">
              <p>
                By now the machine should be running. The last month is about tuning based on data, clarifying roles and responsibilities, and empowering Nate to choose where he wants to spend his time, within the needs of the business.
              </p>
            </div>

            <PhaseWeeks
              weeks={[
                {
                  label: 'Week 9 · Data & Diagnostic',
                  title: 'Do more of what works.',
                  body: [
                    'Review 4 to 6 weeks of content performance.',
                  ],
                  points: [
                    'Identify top performing pieces by views, saves, replies, triages.',
                    'Identify formats and hooks that are clearly working.',
                    'Update the hook and format checklist.',
                    'Update pillar priorities. More of what works, less of what does not.',
                  ],
                },
                {
                  label: 'Week 10 · Roles, Responsibilities, Ownership',
                  title: 'Make the tradeoffs explicit.',
                  body: [
                    'We sit down, you, Hayley, Nate, I facilitate, and map clear roles and responsibilities. What Hayley owns, targets, campaigns, offers. What Nate owns, people, creative, QA, channel strategy. What editors own, throughput to standard.',
                  ],
                  points: [
                    'Give Nate space to say what he wants to own.',
                    'Where he wants to spend more time. Strategy, ops, or craft.',
                    'Make the tradeoffs explicit so he sees how his choices play out in the system.',
                  ],
                },
                {
                  label: 'Week 11 · OS Review & Future Cadence',
                  title: 'Confirm it runs without me.',
                  body: [
                    'Final pass over the Media OS. Board structure, checklists, meeting rhythm, documentation.',
                  ],
                  points: [
                    'Nate can run this without me.',
                    'Hayley can steer it without surprise.',
                    'Editors know the game and the rules.',
                  ],
                },
                {
                  label: 'Week 12 · Handover & Next Steps',
                  title: 'Decide what comes next.',
                  body: [
                    'We review what we installed, how it has felt to run, and what the numbers are telling us.',
                  ],
                  points: [
                    'Do we keep going in an advisory capacity?',
                    'Do we deepen the engagement?',
                    'Or is this a clean, finished project and you run from here?',
                  ],
                },
              ]}
            />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 07 · HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">07 · How we work</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-12">
              My role.
              <br />
              <span className="text-zinc-500">Cadence.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glow-card p-8">
                <Shield className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">My role</p>
                <ul className="space-y-3">
                  {[
                    'Design the Media OS and the 12 week plan.',
                    'Advise Nate on structure, systems, and creative direction.',
                    'Help you read the data and connect content to business outcomes.',
                    'Hold the frame so we actually fix the bottlenecks, not just talk about them.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <Users className="w-5 h-5 text-blue-400 mb-4" />
                <p className="text-blue-400 font-semibold text-sm mb-4">Async support</p>
                <ul className="space-y-3">
                  {[
                    'Up to 1 to 2 Loom reviews per week. Edits, systems, docs.',
                    'Async access via WhatsApp or Slack for quick questions between calls.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Cadence</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Weeks 1 to 4</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Implementation & training</p>
                <ul className="space-y-2">
                  {[
                    '1x call per week with Nate.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Weeks 5 to 8</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Tuning & delegation</p>
                <ul className="space-y-2">
                  {[
                    '1x call per fortnight with Nate.',
                    '1x group Operator Clinic per fortnight. Hayley, editors, Doza welcome for Q&A.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card p-8">
                <p className="text-blue-400 font-semibold text-sm mb-1">Weeks 9 to 12</p>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Roles, strategy, OS review</p>
                <ul className="space-y-2">
                  {[
                    '1x call per fortnight. Roles, strategy alignment, OS review.',
                    '1x Operator Clinic per fortnight.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 08 · WHAT THIS IS NOT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Section>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">08 · What this is not</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white leading-[1.1] mb-8">
              Boundaries.
              <br />
              <span className="text-zinc-500">Just to be clear.</span>
            </h2>

            <div className="glow-card p-8 md:p-10 max-w-3xl">
              <ul className="space-y-5">
                {[
                  'This is not a done for you content agency. Your team implements. I design, advise, and read the data with you.',
                  'This is not me becoming your full time manager. I will not be the one chasing tasks. Nate will.',
                  'This is not a forever contract. At 12 weeks, we decide together what, if anything, comes next.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-zinc-300 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CTA · BOTTOM LINE */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">Bottom line</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white mb-8 leading-[1.15]">
              Break editing. Build the cadence.
              <br />
              <span className="text-zinc-500">Lock the roles.</span>
            </h2>
            <div className="space-y-3 text-zinc-400 mb-10 leading-relaxed">
              <p>First 4 weeks we break editing and build Nate's confidence as an operator.</p>
              <p>Next 4 weeks we build the cadence and structure with him in the driver's seat.</p>
              <p>Final 4 weeks we map it cleanly to the business strategy and lock roles so everyone knows exactly what they own.</p>
            </div>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]"
            >
              Book the working session
              <ArrowRight className="w-4 h-4" />
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
