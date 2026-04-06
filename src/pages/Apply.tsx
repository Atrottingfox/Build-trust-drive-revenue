import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function Apply() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    company: '',
    instagram: '',
    website: '',
    revenue_band: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/.netlify/functions/builder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || form.business_type,
          website: form.website || undefined,
          primaryOffer: form.business_type,
          location: form.phone || '',
          revenueBand: form.revenue_band || undefined,
          audienceSize: form.instagram || '',
        }),
      });
    } catch (err) {
      // Still redirect even if save fails
    }

    navigate('/thank-you');
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
              Ready to scale
              <br />
              your brand?
            </h1>
            <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
              Create content that does the selling for you.
            </p>
          </div>

          {/* Right side — form */}
          <div>
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

              <input
                type="text"
                name="company"
                placeholder="Business name"
                value={form.company}
                onChange={handleChange}
                className={inputClass}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram handle"
                  value={form.instagram}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={form.website}
                  onChange={handleChange}
                  className={inputClass}
                />
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
                <option value="500k-1M">$500k — $1M</option>
                <option value="1-3M">$1M — $3M</option>
                <option value="3-10M">$3M — $10M</option>
                <option value="10M+">$10M+</option>
              </select>

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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
