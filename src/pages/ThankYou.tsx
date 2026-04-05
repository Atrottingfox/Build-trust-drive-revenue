import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <section className="min-h-screen bg-base flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-[520px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            You're in.
          </h1>
          <p className="text-zinc-400 text-lg mb-12 max-w-sm mx-auto">
            I'll review your details and be in touch within 48 hours.
          </p>

          <div className="bg-elevated border border-zinc-800 rounded-xl p-8 text-left">
            <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider font-medium">While you wait</p>
            <p className="text-white text-lg font-semibold mb-2">
              Find out where your authority engine is leaking.
            </p>
            <p className="text-zinc-500 text-[15px] mb-6">
              Take the 2 minute assessment. It'll show you exactly what's working, what's not, and where to focus first.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-zinc-200 transition-colors"
            >
              Take the assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
