import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../components/ui/Container';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

/* --- animation helpers --- */
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

/* --- form types --- */
interface FormData {
  fullName: string;
  businessName: string;
  websiteOrSocial: string;
  revenueRange: string;
  struggling: string;
  triedBefore: string;
  successIn90: string;
  hoursPerWeek: string;
}

const initialForm: FormData = {
  fullName: '',
  businessName: '',
  websiteOrSocial: '',
  revenueRange: '',
  struggling: '',
  triedBefore: '',
  successIn90: '',
  hoursPerWeek: '',
};

const revenueOptions = ['$500k - $1M', '$1M - $3M', '$3M - $5M', '$5M+'];
const hoursOptions = ['1-3 hours', '3-5 hours', '5-10 hours', '10+ hours'];

/* --- reusable form atoms --- */

function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-zinc-300 mb-2">
      {children}
      {required && <span className="text-blue-400 ml-1">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = 'text', required = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#111113] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3, required = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full bg-[#111113] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none"
    />
  );
}

function Select({ options, value, onChange, placeholder }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-[#111113] border border-white/[0.06] rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm appearance-none ${
        value ? 'text-white' : 'text-zinc-600'
      }`}
    >
      <option value="" disabled>{placeholder || 'Select...'}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function SectionDivider({ label, number }: { label: string; number: number }) {
  return (
    <div className="flex items-center gap-4 pt-10 pb-2">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
        {number}
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

/* --- main component --- */

export default function Builder() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.fullName.trim() &&
    form.businessName.trim() &&
    form.websiteOrSocial.trim() &&
    form.revenueRange &&
    form.struggling.trim() &&
    form.triedBefore.trim() &&
    form.successIn90.trim() &&
    form.hoursPerWeek;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      // For now, log the data and show success
      console.log('Brand Day Application:', form);

      // Simulate brief delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError('Something went wrong. Try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <Container className="pt-32 pb-16">
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] mb-4">
              Brand Day Application
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
              $5,000. Half day. Sean flies to you. Five spots available.
              <br />
              This form is a filter. Not everyone gets in.
            </p>
          </div>
        </Section>
      </Container>

      {/* Form */}
      <Container className="pb-32">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-24"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="font-display text-3xl text-white mb-4">Application received.</h2>
              <p className="text-zinc-400 text-lg">
                Sean will review and reach out within 48 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* 1. About You */}
              <SectionDivider label="About you" number={1} />

              <div className="space-y-5 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Full name</Label>
                    <Input value={form.fullName} onChange={(v) => update('fullName', v)} placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <Label required>Business name</Label>
                    <Input value={form.businessName} onChange={(v) => update('businessName', v)} placeholder="Company name" required />
                  </div>
                </div>
                <div>
                  <Label required>Website or primary social link</Label>
                  <Input value={form.websiteOrSocial} onChange={(v) => update('websiteOrSocial', v)} placeholder="https:// or @handle" required />
                </div>
                <div>
                  <Label required>Annual revenue range</Label>
                  <Select options={revenueOptions} value={form.revenueRange} onChange={(v) => update('revenueRange', v)} placeholder="Select your revenue range" />
                </div>
              </div>

              {/* 2. The Situation */}
              <SectionDivider label="The situation" number={2} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>What are you struggling with specifically?</Label>
                  <TextArea
                    value={form.struggling}
                    onChange={(v) => update('struggling', v)}
                    placeholder="Be specific. The more detail, the better we can assess fit."
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label required>What have you tried before?</Label>
                  <TextArea
                    value={form.triedBefore}
                    onChange={(v) => update('triedBefore', v)}
                    placeholder="Agencies, coaches, DIY, team hires. What's been attempted and what happened?"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* 3. Outcomes */}
              <SectionDivider label="Outcomes" number={3} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>What does success look like in 90 days?</Label>
                  <TextArea
                    value={form.successIn90}
                    onChange={(v) => update('successIn90', v)}
                    placeholder="Paint the picture. What changes if this works?"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label required>How many hours per week can you dedicate to content?</Label>
                  <Select options={hoursOptions} value={form.hoursPerWeek} onChange={(v) => update('hoursPerWeek', v)} placeholder="Select hours per week" />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-12 pb-4">
                {error && (
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 btn-shine ${
                    isValid && !submitting
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      Submit application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-zinc-600 text-xs mt-4">
                  This isn't a sales form. It's a filter. Not everyone gets in.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </Container>

      <Footer />
    </div>
  );
}
