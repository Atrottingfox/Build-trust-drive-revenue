import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { GradientText } from '../components/ui/GradientText';
import Footer from '../components/Footer';
import { Layers, Target, Shield, Zap, BookOpen, ArrowRight } from 'lucide-react';

type FilterType = 'all' | 'diagnose' | 'build' | 'shift' | 'tool';

interface Resource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  type: FilterType;
  typeLabel: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  borderColor: string;
  bgColor: string;
  isInteractive: boolean;
}

const resources: Resource[] = [
  {
    id: 'diagnostic',
    title: 'The Content Diagnostic',
    subtitle: '6 layers. Scored /60. Fixed every 6 weeks.',
    description: 'Find the broken layer in your organic content. Score your brand clarity, strategy, content quality, execution, systems, and authority. Get a clear action plan for what to fix first.',
    problem: 'My content is not building authority or generating inbound.',
    type: 'diagnose',
    typeLabel: 'Diagnostic',
    icon: <Layers className="w-5 h-5" />,
    href: '/diagnostic',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/[0.06]',
    isInteractive: false,
  },
  {
    id: 'content-engine',
    title: 'The Content Engine',
    subtitle: '5 questions. 7 ready to film outlines.',
    description: 'Answer 3-5 simple daily questions. Get back 7 structured content outlines across 4 proven content types, with hooks, frameworks, and trust layers mapped. Type or record voice memos.',
    problem: 'I never know what to talk about. I sit down to create and go blank.',
    type: 'tool',
    typeLabel: 'Interactive Tool',
    icon: <Zap className="w-5 h-5" />,
    href: '/content-engine',
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/[0.06]',
    isInteractive: true,
  },
  {
    id: 'belief-shift',
    title: 'The Belief Shift Engine',
    subtitle: '5 objection layers mapped to content.',
    description: 'Map every objection your audience has across 5 belief layers. Understand the belief underneath each one. Build content that shifts beliefs systematically before the sales conversation.',
    problem: 'I am posting but nobody is buying. I do not know what is blocking the sale.',
    type: 'shift',
    typeLabel: 'System',
    icon: <Target className="w-5 h-5" />,
    href: '/belief-shift',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/[0.06]',
    isInteractive: false,
  },
  {
    id: 'belief-bridge',
    title: 'The Belief Bridge',
    subtitle: 'Interactive tool. Input objections. Get a content plan.',
    description: 'Enter the objections you hear on sales calls. Map them across 5 belief layers. Get a personalised Belief Shift Map with a weekly content rotation built from your specific audience.',
    problem: 'I know the objections but I do not know how to turn them into content.',
    type: 'tool',
    typeLabel: 'Interactive Tool',
    icon: <Zap className="w-5 h-5" />,
    href: '/belief-bridge',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/[0.06]',
    isInteractive: true,
  },
];

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'diagnose', label: 'Diagnose' },
  { key: 'build', label: 'Build' },
  { key: 'shift', label: 'Shift' },
  { key: 'tool', label: 'Tools' },
];

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => navigate(resource.href)}
      className="group cursor-pointer bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all relative overflow-hidden"
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative">
        {/* Top row: icon + type badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-10 h-10 rounded-xl ${resource.bgColor} border ${resource.borderColor} flex items-center justify-center ${resource.color}`}>
            {resource.icon}
          </div>
          <div className="flex items-center gap-2">
            {resource.isInteractive && (
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/[0.08] border border-emerald-500/[0.15] px-2.5 py-1 rounded-full">
                Interactive
              </span>
            )}
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 bg-zinc-800/50 px-2.5 py-1 rounded-full">
              {resource.typeLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-zinc-500 font-medium mb-4">
          {resource.subtitle}
        </p>

        {/* Problem it solves */}
        <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl px-4 py-3 mb-4">
          <p className="text-[11px] font-semibold tracking-wider uppercase text-zinc-600 mb-1">Solves</p>
          <p className="text-sm text-zinc-300 italic leading-relaxed">"{resource.problem}"</p>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
          {resource.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
          {resource.isInteractive ? 'Start the tool' : 'View resource'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredResources = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.type === activeFilter);

  return (
    <div className="min-h-screen bg-base">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08)_0%,rgba(99,102,241,0.03)_40%,transparent_70%)] pointer-events-none" />

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300/90 font-medium">Authority Engine</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">Find your problem.</span>
              <br />
              <GradientText>Fix the right thing.</GradientText>
            </motion.h1>

            <motion.p
              className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Diagnostic systems, positioning frameworks, and interactive tools.
              Select based on what you are trying to solve.
            </motion.p>

            {/* Filter pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? 'bg-white text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]'
                      : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:border-white/[0.12] hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Resource Grid */}
      <section className="pb-20 px-4">
        <Container>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
            >
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredResources.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-500 py-20"
            >
              No resources match this filter.
            </motion.p>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-zinc-800/60">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Not sure where to start?
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Start with the Content Diagnostic. It scores your content across 6 layers and tells you exactly which one to fix first. Everything else follows from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)] transition-all"
              >
                Start the Diagnostic
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://form.typeform.com/to/S2rogsdT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-zinc-800 text-zinc-400 font-medium px-8 py-3.5 rounded-full hover:border-zinc-600 hover:text-white transition-all"
              >
                Apply to work together
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
