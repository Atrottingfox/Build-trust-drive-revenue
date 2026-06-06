import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PasswordGate from '../components/PasswordGate';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Cite({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-zinc-600 text-xs italic ml-1">[{children}]</span>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span className="font-display text-zinc-600 text-lg font-bold">{num}</span>
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
        {title}
      </h2>
    </div>
  );
}

export default function LinkNinja() {
  return (
    <PasswordGate storageKey="linkninja-unlocked">
    <div className="min-h-screen bg-base">
      <SEO
        title="LinkNinja Category Engine. A 90 day install."
        description="What the project is, how it runs, and what gets decided at the end. Operator brief."
        path="/linkninja"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Operator brief · 90 day install</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-6">
              LinkNinja Category Engine.
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              What this project is, how it runs, and what happens at the end. Written so any operator can read it, understand what's being installed, and decide if it's a fit.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 1. PURPOSE */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="01" title="Purpose" />
            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                This document explains a 90 day project to make "getting B2B leads from LinkedIn" meaningfully associated with LinkNinja in the minds of your market.
              </p>
              <p>
                The focus is not on campaigns or one off content pieces. It is on installing a repeatable Category Engine your internal team can run. A combination of proof generation, content, DMs, and funnels that works without the founder as the bottleneck.
                <Cite>$100M Playbook Marketing Machine, p7</Cite>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 2. STARTING POINT */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="02" title="Starting Point" />

            <p className="text-zinc-300 font-semibold mb-4">What already exists</p>
            <div className="space-y-5 mb-10">
              <div>
                <p className="text-white text-sm font-semibold mb-1">Problem clarity</p>
                <p className="text-zinc-400 text-sm leading-relaxed">The market accepts that LinkedIn can and should drive B2B pipeline. The problem of "LinkedIn is noisy and broken for leads" is well understood.</p>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Product</p>
                <p className="text-zinc-400 text-sm leading-relaxed">LinkNinja is a live portal that operationalises a specific, non spammy way to generate LinkedIn leads.</p>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Evidence</p>
                <p className="text-zinc-400 text-sm leading-relaxed">There are client results and usage that suggest the product works for the target audience.</p>
              </div>
            </div>

            <p className="text-zinc-300 font-semibold mb-4">What is missing</p>
            <ul className="space-y-3">
              {[
                'A documented mechanism that connects "how we think LinkedIn should work" to "how LinkNinja runs in practice."',
                'A system that continuously generates proof and content assets from real operators, not from the company talking about itself.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">
                    {item}
                    {i === 1 && <Cite>$100M Playbook Proof Checklist, p10</Cite>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 3. CORE CONCEPT */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="03" title="Core Concept: Category Engine" />
            <p className="text-zinc-400 leading-relaxed mb-6">The Category Engine is a simple idea.</p>
            <ol className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="font-display text-blue-400 font-bold text-sm w-5 flex-shrink-0 mt-0.5">01</span>
                <div>
                  <span className="text-white font-semibold">Borrow trust</span>
                  <span className="text-zinc-400"> from people the market already listens to. Aspirational guests, operators, agencies.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-display text-blue-400 font-bold text-sm w-5 flex-shrink-0 mt-0.5">02</span>
                <div>
                  <span className="text-white font-semibold">Capture proof</span>
                  <span className="text-zinc-400"> of how LinkedIn works when used well.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-display text-blue-400 font-bold text-sm w-5 flex-shrink-0 mt-0.5">03</span>
                <div>
                  <span className="text-white font-semibold">Route that proof</span>
                  <span className="text-zinc-400"> into LinkedIn content, DM flows, and simple funnels that lead into LinkNinja trials.</span>
                </div>
              </li>
            </ol>
            <p className="text-zinc-400 leading-relaxed">
              Instead of the company making claims, the system surfaces third party examples and demonstrations. Over time, "serious LinkedIn leads" becomes associated with the LinkNinja way of doing things.
              <Cite>$100M Playbook Proof Checklist, p11</Cite>
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 4. SYSTEM COMPONENTS */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="04" title="System Components" />
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-blue-400 font-bold text-sm">01</span>
                  <h3 className="text-white font-semibold">Consulting Session Format (Proof Engine)</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  {[
                    'Structured conversations with guests who are credible to your audience.',
                    'Questions designed to reveal their approach, the underlying principles, and where LinkNinja fits.',
                    'Output: longform recordings that generate clips, quotes, and stories.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-blue-400 font-bold text-sm">02</span>
                  <h3 className="text-white font-semibold">Content System (Discovery Layer)</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">
                      A set of repeatable post formats and hooks for LinkedIn that come from session output, not from scratch.
                      <Cite>$100M Playbook Hooks, p6</Cite>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">Each piece is tied to a specific belief or objection around LinkedIn and/or the product.</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-blue-400 font-bold text-sm">03</span>
                  <h3 className="text-white font-semibold">DM System (Qualification Layer)</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  {[
                    'Simple, scripted flows to respond to post engagement and session viewers.',
                    'Goal: qualify interest and move appropriate people to a call or a trial without spam.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-blue-400 font-bold text-sm">04</span>
                  <h3 className="text-white font-semibold">Funnels (Conversion Layer)</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-zinc-400 text-sm leading-relaxed">Clear paths from session viewer or post consumer to:</span>
                      <ul className="space-y-1.5 mt-2 pl-4">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 flex-shrink-0" />
                          <span className="text-zinc-500 text-sm leading-relaxed">product trial, or</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 flex-shrink-0" />
                          <span className="text-zinc-500 text-sm leading-relaxed">short "show me how this would look in my world" consultation.</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-blue-400 font-bold text-sm">05</span>
                  <h3 className="text-white font-semibold">Brand Bible and Operating System</h3>
                </div>
                <ul className="space-y-2 pl-7">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">One document that captures voice, claims, beliefs, recurring lines, and the overall Engine map.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">
                      A basic weekly scorecard so the team can see whether the Engine is working.
                      <Cite>$100M Playbook Marketing Machine, p9</Cite>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 5. 90 DAY IMPLEMENTATION PLAN */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="05" title="90 Day Implementation Plan" />

            {/* Phase 1 */}
            <div className="mb-10">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Phase 1 · Design</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Week 0 · 4 to 6 hours</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">Work with founder and content lead to:</p>
              <ul className="space-y-2 mb-6">
                {[
                  'Extract the actual mechanism (how your best users get results).',
                  'Map current vs required beliefs by audience segment.',
                  'Name and diagram the Category Engine.',
                  'Define the Consulting Session format and guest criteria.',
                  'Set 90 day success metrics (e.g. trials influenced, DM volume, proof assets created).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Output</p>
              <ul className="space-y-1.5">
                {[
                  'Brand Bible draft',
                  'Engine map',
                  'First version of the Consulting Session outline',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="mb-10">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Phase 2 · Install</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 1 to 4</p>
              <ul className="space-y-2 mb-4">
                {[
                  'Run initial Consulting Sessions with selected guests.',
                  'Clip and deploy the first content cycles on LinkedIn.',
                  'Implement the first DM flows and simple funnel to trial or call.',
                  'Start the Trust Asset Bank. Organise stories, screenshots, data, and clips.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-sm leading-relaxed italic">Cadence: one 60 minute call per week with the internal content or marketing lead.</p>
            </div>

            {/* Phase 3 */}
            <div>
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Phase 3 · Tune & hand off</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Weeks 5 to 12</p>
              <ul className="space-y-2 mb-6">
                {[
                  'Internal team runs the Engine using the documented OS.',
                  'Review performance data and adjust hooks and topics, DM scripts, funnel steps.',
                  'Refine the Consulting Session format based on what produces the best assets and engagement.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Finalise</p>
              <ul className="space-y-1.5 mb-6">
                {[
                  'Brand Bible',
                  'Engine map',
                  'Monthly content plus session calendar',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                End state. The team can operate the Category Engine without new design work, reusing and expanding proven elements.
                <Cite>$100M Playbook Marketing Machine, p28</Cite>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 6. ROLES */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="06" title="Roles" />
            <div className="space-y-8">
              <div>
                <p className="text-white font-semibold mb-3">External advisor</p>
                <ul className="space-y-2">
                  {[
                    'Designs the Engine, session format, and belief architecture.',
                    'Reviews data, suggests adjustments, and periodically appears in or supports sessions.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-3">Internal team</p>
                <ul className="space-y-2">
                  {[
                    'Books guests, runs sessions, edits, posts, manages DMs, and maintains funnels and scorecard.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                      <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* 7. REVIEW AT DAY 90 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <SectionHeading num="07" title="Review at Day 90" />
            <p className="text-zinc-400 leading-relaxed mb-6">At the end of 90 days, review:</p>
            <ul className="space-y-2 mb-8">
              {[
                'Trials and customers influenced by the Engine.',
                'Quality and volume of proof assets.',
                'How manageable the system is for the internal team.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-zinc-400 leading-relaxed mb-4">Then decide whether to:</p>
            <ul className="space-y-2 mb-10">
              {[
                'Continue with light advisory.',
                'Expand the scope.',
                'Keep it as a completed 90 day build and run it internally.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-zinc-300 text-base leading-relaxed font-medium">
              No pitch needed. It is simply a defined system, a 90 day installation window, and a decision based on data.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CLOSING */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <p className="text-zinc-400 mb-8 leading-relaxed">
              That's the brief. Any questions, the door's open.
            </p>
            <a
              href="https://calendar.app.google/jSpGKkQbgje7TaQZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Book a working session →
            </a>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
    </PasswordGate>
  );
}
