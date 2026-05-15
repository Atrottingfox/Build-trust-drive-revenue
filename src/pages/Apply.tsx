import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function Apply() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    company: '',
    instagram: '',
    website: '',
    revenue_band: '',
    content_ops: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error && (e.target.name === 'instagram' || e.target.name === 'website')) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.instagram.trim() && !form.website.trim()) {
      setError('Add your Instagram or website so we can see your work.');
      return;
    }

    setLoading(true);

    try {
      await fetch('/.netlify/functions/builder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'apply',
          name: form.name,
          email: form.email,
          company: form.company || form.business_type,
          website: form.website || undefined,
          primaryOffer: form.business_type,
          location: form.phone || '',
          revenueBand: form.revenue_band || undefined,
          audienceSize: form.instagram || '',
          contentOpsPerson: form.content_ops || undefined,
        }),
      });
    } catch (err) {
      // Still show confirmation even if save fails
    }

    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors";

  return (
    <section className="min-h-screen bg-base flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-5xl">
        <motion.div
          className="grid md:grid-cols-2 gap-16 md:gap-20 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side — headline */}
          <div>
            <motion.div
              className="accent-line mb-8"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[1] mb-6">
              Let your content
              <br />
              do the selling for you.
            </h1>
            <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
              The Authority Engine for 7-8+ figure founders
            </p>
          </div>

          {/* Right side — form or confirmation */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-elevated border border-zinc-800 rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white leading-[1.1] mb-3">
                  Application received.
                </h2>
                <p className="text-zinc-400 text-[15px]">
                  We'll be in touch if you qualify.
                </p>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />

              <select
                name="business_type"
                required
                value={form.business_type}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
                style={{ color: form.business_type ? '#fff' : '#52525b' }}
              >
                <option value="" disabled>What type of business do you run?</option>
                <option value="Coaching / Consulting">Coaching / Consulting</option>
                <option value="Agency">Agency</option>
                <option value="SaaS / Tech">SaaS / Tech</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Education / Training">Education / Training</option>
                <option value="Other">Other</option>
              </select>

              <div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram handle"
                    value={form.instagram}
                    onChange={handleChange}
                    className={`${inputClass} ${error ? 'border-red-500/60' : ''}`}
                  />
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={form.website}
                    onChange={handleChange}
                    className={`${inputClass} ${error ? 'border-red-500/60' : ''}`}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-[13px] mt-2">{error}</p>
                )}
              </div>

              <select
                name="revenue_band"
                value={form.revenue_band}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
                style={{ color: form.revenue_band ? '#fff' : '#52525b' }}
              >
                <option value="" disabled>Annual revenue</option>
                <option value="<500k">Under $500k</option>
                <option value="500k-1M">$500k to $1M</option>
                <option value="1-3M">$1M to $3M</option>
                <option value="3-10M">$3M to $10M</option>
                <option value="10-50M">$10M to $50M</option>
                <option value="50M+">$50M+</option>
              </select>

              <div>
                <p className="text-zinc-500 text-[13px] mb-2 px-1">Who runs your content currently?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Me', 'In-house team', 'Agency', 'Nobody'].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setForm(prev => ({ ...prev, content_ops: option }))}
                      className={`px-3 py-3 rounded-lg text-[13px] font-medium border transition-colors ${
                        form.content_ops === option
                          ? 'bg-white text-black border-white'
                          : 'bg-elevated text-zinc-400 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-[15px] font-semibold hover:bg-zinc-200 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Submit
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
