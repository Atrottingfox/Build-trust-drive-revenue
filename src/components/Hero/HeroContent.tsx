import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroContent() {
  return (
    <div className="max-w-5xl mx-auto text-center">
      {/* Pill badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.06] mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-sm text-blue-300/90 font-medium">For 7–8 figure founders</span>
      </motion.div>

      <motion.h1
        className="text-5xl sm:text-7xl md:text-[5.5rem] font-black tracking-tight leading-[0.92] mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="text-white">Build trust.</span>
        <br />
        <span className="text-white">Drive revenue.</span>
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
          Dominate your niche.
        </span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        We turn founder led content into a predictable, value driven
        marketing engine that compounds trust and drives revenue.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <motion.a
          href="https://form.typeform.com/to/S2rogsdT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-500 transition-all duration-200 group shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Apply now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </motion.a>

        <a
          href="#engine"
          className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-8 py-4 text-lg font-semibold text-gray-300 hover:text-white hover:border-white/25 hover:bg-white/[0.03] transition-all duration-200"
        >
          Learn more
        </a>
      </motion.div>

      {/* Product screenshot with perspective */}
      <motion.div
        className="perspective-screenshot max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="screenshot-inner">
          {/* Glow behind */}
          <div className="absolute -inset-8 bg-gradient-to-b from-blue-500/[0.08] via-indigo-500/[0.04] to-transparent rounded-3xl blur-2xl pointer-events-none" />

          <div className="gradient-border">
            <div className="card-inner p-1">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
                  <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
                  <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-6 py-1.5 rounded-lg bg-white/[0.03] text-xs text-gray-500 font-mono">
                    contentengine.live
                  </div>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Content pieces", value: "142", change: "+12%" },
                    { label: "Avg. engagement", value: "4.8%", change: "+2.1%" },
                    { label: "Pipeline value", value: "$340k", change: "+28%" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-elevated/80 p-4 border border-white/[0.04]">
                      <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">{item.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-white">{item.value}</p>
                        <span className="text-[11px] text-emerald-400 font-medium">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    { title: "Authority framework breakdown", status: "Published", color: "bg-emerald-400" },
                    { title: "Founder story. Origin arc", status: "Scripted", color: "bg-blue-400" },
                    { title: "Client transformation case study", status: "In review", color: "bg-amber-400" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-elevated/40 border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${row.color}`} />
                        <span className="text-sm text-gray-300">{row.title}</span>
                      </div>
                      <span className="text-xs text-gray-500 hidden sm:block font-medium">{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent pointer-events-none rounded-b-[calc(1.25rem-1px)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
