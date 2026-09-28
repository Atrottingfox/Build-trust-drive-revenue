import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

/* Invite only. The link lives in the WhatsApp group description, and the
   group link is shown here only after a profile is submitted. */
const WHATSAPP_GROUP = 'https://chat.whatsapp.com/LPDk6oSt039HakWnZPUrsd';

const ROLES = ['Creative Director', 'Media Operator', 'Director', 'Creator', 'Editor', 'Shooter'];
const WANTS = ["Inside a founder's media team", 'Freelance', 'Agency', 'Just want in the room'];

export default function TheCrew() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    location: '',
    roles: [] as string[],
    wants: '',
    work: '',
    nominated: '',
    company: '',
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleRole = (role: string) =>
    setForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter(r => r !== role) : [...prev.roles, role],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.roles.length) return setError('Tick what you do.');
    if (!form.wants) return setError('Pick what you want.');
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/the-crew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('That did not send. Try again in a sec.');
    }
    setLoading(false);
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-elevated border border-zinc-800 rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors';
  const chip = (on: boolean) =>
    `px-3 py-3 rounded-lg text-[13px] font-medium border transition-colors text-left ${
      on ? 'bg-white text-black border-white' : 'bg-elevated text-zinc-400 border-zinc-800 hover:border-zinc-700'
    }`;
  const label = 'text-zinc-500 text-[13px] mb-2 px-1';

  return (
    <section className="min-h-screen bg-base px-6 py-32">
      <SEO
        title="The Crew"
        description="The talent pool of the best 1% of creators, directors and media operators in Australia."
        path="/thecrew"
        noIndex
      />
      <motion.div
        className="w-full max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="accent-line mb-8"
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] mb-8">
          You have been invited to be a part of the top 1%.
        </h1>

        <div className="space-y-5 text-zinc-400 text-[17px] leading-relaxed mb-10">
          <p>
            We are building the talent pool of the best 1% in Australia. Our goal is to give people the best
            opportunities in the world and get access to the top 0.1%.
          </p>
          <p>In order to do that, we need a community of weapons. That's why you're here.</p>
          <p className="text-white font-semibold">
            I want to give away $10,000,000 in opportunity over 2 years across both internal media teams,
            freelancers, and agencies.
          </p>
          <p>Taking this kind of a role changed my life, and I want to continue to pay it forward.</p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-elevated border border-zinc-800 rounded-xl p-8"
          >
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white leading-[1.1] mb-3">
              You're in the room.
            </h2>
            <p className="text-zinc-400 text-[15px] mb-6">Profile's in. If you're not in the group yet, jump in.</p>
            <a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-lg text-[15px] font-semibold hover:bg-zinc-200 transition-colors"
            >
              Join the WhatsApp group
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-white font-semibold">
              You must fill out your profile in order for us to make the right decision about where to place you.
            </p>

            <input name="name" placeholder="Name" required value={form.name} onChange={set} className={inputClass} />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="tel" name="phone" placeholder="Mobile" required value={form.phone} onChange={set} className={inputClass} />
              <input type="email" name="email" placeholder="Email" required value={form.email} onChange={set} className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="instagram" placeholder="Instagram" value={form.instagram} onChange={set} className={inputClass} />
              <input name="location" placeholder="Where are you based?" required value={form.location} onChange={set} className={inputClass} />
            </div>

            <div>
              <p className={label}>What do you do? Tick all.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLES.map(role => (
                  <button type="button" key={role} onClick={() => toggleRole(role)} className={chip(form.roles.includes(role))}>
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={label}>Where do you want to play?</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {WANTS.map(w => (
                  <button type="button" key={w} onClick={() => setForm(prev => ({ ...prev, wants: w }))} className={chip(form.wants === w)}>
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <input name="work" placeholder="Link to your best work" required value={form.work} onChange={set} className={inputClass} />
            <textarea
              name="nominated"
              placeholder="Who do you think I've missed? Names and handles."
              rows={3}
              value={form.nominated}
              onChange={set}
              className={`${inputClass} resize-none`}
            />

            {/* Honeypot, hidden from people. */}
            <input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set} className="hidden" aria-hidden="true" />

            {error && <p className="text-red-400 text-[13px] px-1">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-[15px] font-semibold hover:bg-zinc-200 transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-zinc-600 text-[12px] px-1">Your details stay with The Authority Engine. Used to place you, never sold.</p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
