import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

/*
  Application for the Operator + Authority Engine Intensive (30k founding rate).
  Posts to the shared builder-application function with source 'operator-intensive',
  which is what routes it to its own Slack alert and its own GHL tag.
*/

/* Uppercase M is kept so 1-3M and 3-10M still match the existing GHL dropdown
   options exactly. The three new bands sit outside that list; GHL stores them
   anyway, but see the note in the reply about filtering. */
const REVENUE_BANDS = ['0-1M', '1-3M', '3-10M', '10-20M', '20-50M', '50M+'];

const MEDIA_TODAY = [
  'A content lead',
  'An agency',
  'An editor',
  'A VA or marketing coordinator',
  'Me',
];

export default function ApplyOperatorIntensive() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    revenue_band: '',
    media_today: '',
    operator_owns: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/builder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'operator-intensive',
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          company: form.company || '',
          website: form.website || undefined,
          revenueBand: form.revenue_band || undefined,
          contentOpsPerson: form.media_today || undefined,
          whatToFix: form.operator_owns || '',
        }),
      });
      if (!res.ok) {
        setLoading(false);
        setError('That did not send. Try again, or email sean@atrottingfox.com.au.');
        return;
      }
    } catch (err) {
      setLoading(false);
      setError('That did not send. Try again, or email sean@atrottingfox.com.au.');
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors';

  return (
    <section className="min-h-screen bg-base flex items-center justify-center px-6 py-32">
      <SEO
        title="Apply — Operator + Authority Engine Intensive"
        description="Apply for the Operator + Authority Engine Intensive. Bring in your media Operator and install the Engine in one focused project."
        path="/applyforoperatorintensive"
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <div className="w-full max-w-5xl">
        <motion.div
          className="grid md:grid-cols-2 gap-16 md:gap-20 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side */}
          <div className="md:sticky md:top-32">
            <motion.div
              className="accent-line mb-8"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-5">
              Operator + Authority Engine Intensive
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] mb-6">
              Apply for the
              <br />
              Intensive.
            </h1>
            <p className="text-zinc-400 text-[17px] max-w-sm leading-relaxed mb-6">
              Bring in your media Operator and install the Engine in one focused project.
            </p>
            <p className="text-zinc-500 text-[15px] max-w-sm leading-relaxed">
              Founding rate 30,000 AUD. 5 per quarter, so I read every application myself.
            </p>
          </div>

          {/* Right side */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-elevated border border-zinc-800 rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-3">That is in.</h2>
                <p className="text-zinc-400 text-[15px] leading-relaxed">
                  I read these myself, usually the same day. If it looks like a fit I will come back to you
                  to lock your Brand Day and start Phase 1.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className={inputClass}
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className={inputClass}
                />
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="Website or Instagram"
                  className={inputClass}
                />

                <select
                  name="revenue_band"
                  value={form.revenue_band}
                  onChange={handleChange}
                  className={`${inputClass} ${form.revenue_band ? 'text-white' : 'text-zinc-600'}`}
                >
                  <option value="">Current annual revenue</option>
                  {REVENUE_BANDS.map((b) => (
                    <option key={b} value={b} className="text-white bg-zinc-900">
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  name="media_today"
                  value={form.media_today}
                  onChange={handleChange}
                  className={`${inputClass} ${form.media_today ? 'text-white' : 'text-zinc-600'}`}
                >
                  <option value="">Who owns media today</option>
                  {MEDIA_TODAY.map((m) => (
                    <option key={m} value={m} className="text-white bg-zinc-900">
                      {m}
                    </option>
                  ))}
                </select>

                <textarea
                  name="operator_owns"
                  value={form.operator_owns}
                  onChange={handleChange}
                  placeholder="What do you want this Operator to own?"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />


                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
