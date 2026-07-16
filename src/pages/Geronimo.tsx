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
        title="Geronimo. 12 Week Media OS Transition Plan"
        description="Get the system out of Nate's head, keep output steady, and put a new Media Lead in the seat before he walks. A 12 week plan to document the media engine and install an owner who runs it without you."
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
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">12 Week Transition Plan</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-6">
                Geronimo.
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                Install a Media OS. Put an owner in the seat who runs it without you.
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
              Get the system out of Nate's head.
              <br />
              <span className="text-zinc-500">Put a new owner in the seat.</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
              The plan changed. Nate is leaving, and he has roughly 90 days. So the point of this project changed with it.
            </p>

            <div className="glow-card p-8 md:p-10 mb-10 max-w-3xl">
              <ul className="space-y-4">
                {[
                  "Get everything Nate runs out of his head and documented, so nothing walks out the door with him.",
                  'Keep output steady through the transition. No dip while the seat changes hands.',
                  "Install a simple Media OS and put a new Media Lead in the seat who runs it without you.",
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
                'Extract every process Nate runs and turn his taste into checklists anyone can follow.',
                'Break the editing bottleneck so output no longer depends on one person.',
                'Design the Media Lead role, then hire and hand over so a new owner is in the seat by the time Nate walks.',
              ].map((item, i) => (
                <p key={i} className="text-zinc-300 font-medium leading-relaxed">
                  <span className="text-zinc-500">Step {i + 1}.</span> {item}
                </p>
              ))}
            </div>

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl">
              <p className="text-blue-400 font-semibold text-sm mb-3">My role</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Architect the OS, lead the extraction from Nate, and advise on the hire and handover. Your team runs it. I don't.
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
              The engine works.
              <br />
              <span className="text-zinc-500">It just lives in one person's head.</span>
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
                    'Nate is leaving. He has roughly 90 days, and most of how the media runs lives in his head.',
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
              <p className="text-blue-400 font-semibold text-sm mb-3">The risk</p>
              <p className="text-white text-base leading-relaxed font-medium">
                The whole media engine lives in Nate's head. And he's walking in 90 days.
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
                  description: "We want a media machine that reliably produces the right content to drive Geronimo's growth, while Doza still builds his founder brand, and no single person is the point of failure.",
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
                  description: "Short, focused periods where we attack a single bottleneck. Right now, extracting Nate's system before he leaves.",
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
                "Extract Nate's system and break the editing bottleneck so the work no longer depends on him.",
                'Install a predictable weekly rhythm across Geronimo and HeyDoza.',
                'Design the Media Lead seat, then hire and hand over so ownership is clear and Hayley can steer with confidence.',
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
              Extraction Sprint.
              <br />
              <span className="text-zinc-500">Get it out of Nate's head.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>This is the slow down to speed up month.</p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Get everything Nate runs out of his head and documented, and get editing off his plate, 80% plus, so output holds steady while the seat changes hands.
              </p>
            </div>

            {/* Roles callout */}
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">The roles, at a high level</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { role: 'Doza', tag: 'the who', description: 'Mission, story.' },
                { role: 'Hayley', tag: 'the why', description: 'What business outcome content must drive.' },
                { role: 'Media Lead', tag: 'the how, when, where', description: 'The seat Nate holds today, and the one we document and hire into.' },
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
                  label: 'Week 1 · Teardown Day',
                  title: 'Pull the whole operation apart.',
                  body: [
                    'We book one deep work day with Nate and pull the operation apart, piece by piece. This is where I start working directly with him to get everything on the table.',
                  ],
                  points: [
                    'Map every process end to end. Ideas, filming, edit, review, publish, measure. Who touches it, what tools, where it breaks.',
                    'Inventory everything Nate is running right now and everything sitting in his pipeline.',
                    'Sort it into must ship in the next 30 days, nice to have, and can die.',
                    'Find the key man risks. If Nate walked tomorrow, what breaks first.',
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
                    'Only observable, step by step instructions anyone can follow.',
                  ],
                },
                {
                  label: 'Week 3 · Train the Editors · 10/80/10',
                  title: 'Install the training loop.',
                  body: [
                    'We install a training loop so editors can match Nate’s standard, and hold it after he’s gone. For each editor: Demonstrate, Nate edits a piece following the checklist out loud, screen recorded. Duplicate, the editor edits a new piece while Nate watches them follow the same checklist, any confusion means the checklist gets updated. Solo plus Loom, the editor edits in batches alone, Nate reviews at 2x speed and gives Loom feedback tied directly to specific checklist steps.',
                  ],
                  points: [
                    'One editor leads short form.',
                    'One leads longform and podcasts.',
                    'One extra contractor ready who can cut to standard when volume spikes.',
                  ],
                },
                {
                  label: 'Week 4 · Output Off Nate',
                  title: '80% of edits done by editors.',
                  body: [
                    'Target, 80% plus of all edits are done by editors, not Nate. Nate only touches the first 10%, creative direction and briefs, and the last 10%, QA, approvals, Loom feedback.',
                  ],
                  points: [
                    'Is Nate still editing timelines?',
                    'Are editors shipping to standard on their own?',
                    'Does Hayley know what is coming the next 2 weeks?',
                  ],
                },
              ]}
            />

            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mt-10">
              <p className="text-blue-400 font-semibold text-sm mb-3">By the end of Week 4</p>
              <p className="text-white text-base leading-relaxed font-medium">
                Nate's system is documented in Notion and Looms, the editing bottleneck is broken, and output holds steady without him touching every timeline. His brain is on paper, not just in his head.
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
              <span className="text-zinc-500">Design the seat.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-6">
              <p>
                With editing off Nate's hands and his system documented, we move up a level. Build the clean Media OS, then spec the role that runs it. Nate helps define the seat he is leaving, so we hire against reality, not a guess.
              </p>
            </div>
            <div className="glow-card border-blue-500/20 p-8 max-w-3xl mb-12">
              <p className="text-blue-400 font-semibold text-sm mb-3">Goal</p>
              <p className="text-white text-base leading-relaxed font-medium">
                A clean Media OS with a locked weekly cadence, and a defined Media Lead role. Scorecard, KPIs, and clear ownership. The spec for the person we hire.
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
                  title: 'Turn structure into a repeatable week.',
                  points: [
                    'Monday. Quick look back at what shipped and what worked. Lock the next 2 to 4 weeks in the content board with Hayley.',
                    'Thursday. Shoot block with a simple shot list for Geronimo, plus 1 to 2 founder pieces.',
                    'Friday. Short review. What went live, early numbers, any changes needed next week.',
                    'The Media Lead owns the how, when, where. Hayley owns the why. Everyone sees the same board.',
                  ],
                },
                {
                  label: 'Week 8 · Design the Media Lead Role',
                  title: 'Write the spec for the replacement.',
                  body: [
                    'We turn everything we documented into a real role. Nate helps define what the seat actually owns day to day, so the person we hire steps into a clear job, not a mystery.',
                  ],
                  points: [
                    'Write the Media Lead scorecard. What good looks like in the seat.',
                    'Set the KPIs the role is accountable for.',
                    'Map what the Media Lead owns vs Hayley vs editors. Uploading, scheduling, thumbnails, titles, analytics, all assigned.',
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
              Hire the owner.
              <br />
              <span className="text-zinc-500">Hand over the OS.</span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl mb-12">
              <p>
                By now the machine runs and the role is defined. The last month is about finding the right person, putting them in the seat, and proving the system runs without me, or Nate.
              </p>
            </div>

            <PhaseWeeks
              weeks={[
                {
                  label: 'Week 9 · Data & Diagnostic',
                  title: 'Lock what good looks like.',
                  body: [
                    'Review 4 to 6 weeks of content performance so we know the benchmark the new hire has to hit.',
                  ],
                  points: [
                    'Identify top performing pieces by views, saves, replies, triages.',
                    'Identify formats and hooks that are clearly working.',
                    'Update the hook and format checklist.',
                    'Update pillar priorities. More of what works, less of what does not.',
                  ],
                },
                {
                  label: 'Week 10 · Hiring Scorecard & Rubric',
                  title: 'Turn the role into a hiring kit.',
                  body: [
                    'We take the Week 8 role spec and turn it into everything you need to hire well. A scorecard, an interview rubric, and a paid test project so you see the work, not just the pitch.',
                  ],
                  points: [
                    'Finalise the Media Lead scorecard and interview rubric.',
                    'Design a short paid test project that mirrors the real work.',
                    'Agree who sits in on interviews and how you score them.',
                  ],
                },
                {
                  label: 'Week 11 · Interview, Test, Shadow',
                  title: 'Run the process. Make the hire.',
                  body: [
                    'Run interviews and the test project against the rubric, then make the call. The new hire starts inside the documented OS while Nate is still here to shadow.',
                  ],
                  points: [
                    'Score candidates against the rubric, not gut feel.',
                    'New Media Lead starts and runs real cycles inside the OS.',
                    'They shadow Nate while he is still in the building.',
                  ],
                },
                {
                  label: 'Week 12 · Handover & QA',
                  title: 'Confirm it runs without us.',
                  body: [
                    'Nate hands over. I QA that the new Media Lead can run the system to standard, without either of us in the seat.',
                  ],
                  points: [
                    'New Media Lead runs a full week solo. Nate on standby, not doing the work.',
                    'QA against the scorecard. Output holds to standard.',
                    'Decide what comes next. Clean finish, or advisory from here.',
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
                    'Architect the Media OS and the 12 week transition plan.',
                    "Lead the extraction from Nate and turn his system into documentation anyone can run.",
                    'Design the Media Lead role and advise on the hire and handover.',
                    'Hold the frame so the system actually gets installed, and the seat actually gets filled.',
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
                    'Up to 1 to 2 Loom reviews per week. Edits, systems, docs, hiring.',
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
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Extraction & training</p>
                <ul className="space-y-2">
                  {[
                    'Teardown Day with Nate, then 1x call per week.',
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
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">OS build & role design</p>
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
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Hire & handover</p>
                <ul className="space-y-2">
                  {[
                    '1x call per fortnight. Hiring, handover, OS review.',
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
                  'This is not a done for you content agency. Your team implements. I architect, advise, and read the data with you.',
                  'This is not me stepping into Nate’s seat. I am not your interim Media Lead or fractional CD, and I am not running your media indefinitely.',
                  'This is not a forever contract. The whole point is a new owner in the seat by Day 90, not a dependency on me.',
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
              Capture the system. Install the owner.
              <br />
              <span className="text-zinc-500">Step out clean.</span>
            </h2>
            <div className="space-y-3 text-zinc-400 mb-10 leading-relaxed">
              <p>First 4 weeks we pull the operation apart, document Nate's system, and break the editing bottleneck.</p>
              <p>Next 4 weeks we build the Media OS and spec the Media Lead role we're hiring into.</p>
              <p>Final 4 weeks we hire, hand over, and prove the system runs without Nate, or me.</p>
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

            <div className="mt-8">
              <a
                href="/geronimonextsteps"
                className="group inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors text-[14px] font-medium"
              >
                See the clear next steps
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
