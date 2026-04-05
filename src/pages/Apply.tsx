import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Apply() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    business_url: '',
    revenue_range: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from('applications').insert({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        business_url: form.business_url || null,
        revenue_range: form.revenue_range || null,
      });
    } catch (err) {
      // Still redirect even if save fails
    }

    navigate('/thank-you');
  };

  return (
    <section className="min-h-screen bg-base flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-[520px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            Start here.
          </h1>
          <p className="text-zinc-400 text-lg mb-10 max-w-md">
            Tell me a little about you and your business. I'll be in touch within 48 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                required
                value={form.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                required
                value={form.last_name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />

            <input
              type="url"
              name="business_url"
              placeholder="Website or Instagram (optional)"
              value={form.business_url}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />

            <select
              name="revenue_range"
              value={form.revenue_range}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-[15px] focus:outline-none focus:border-zinc-600 transition-colors appearance-none"
              style={{ color: form.revenue_range ? '#fff' : '#52525b' }}
            >
              <option value="" disabled>Annual revenue (optional)</option>
              <option value="under-500k">Under $500k</option>
              <option value="500k-1m">$500k — $1M</option>
              <option value="1m-3m">$1M — $3M</option>
              <option value="3m-5m">$3M — $5M</option>
              <option value="5m-10m">$5M — $10M</option>
              <option value="10m-plus">$10M+</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-[15px] font-semibold hover:bg-zinc-200 transition-colors mt-6 disabled:opacity-50"
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
        </motion.div>
      </div>
    </section>
  );
}
