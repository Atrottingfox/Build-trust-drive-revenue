import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../components/ui/Container';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

/* ─── animation helpers ─── */
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

/* ─── form types ─── */
interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  location: string;
  revenueBand: string;
  primaryOffer: string;
  activeChannels: string[];
  audienceSize: string;
  biggestProblem: string;
  whatToFix: string;
  contentOpsPerson: string;
  opsPersonRole: string;
  canCommitDay: string;
  blackoutDates: string;
  comfortableWithFilming: string;
  whyYouWhyNow: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  website: '',
  location: '',
  revenueBand: '',
  primaryOffer: '',
  activeChannels: [],
  audienceSize: '',
  biggestProblem: '',
  whatToFix: '',
  contentOpsPerson: '',
  opsPersonRole: '',
  canCommitDay: '',
  blackoutDates: '',
  comfortableWithFilming: '',
  whyYouWhyNow: '',
};

const revenueBands = ['<500k', '500k-1M', '1-3M', '3-10M', '10M+'];
const channels = ['Instagram', 'YouTube', 'Email', 'LinkedIn', 'Podcast', 'Other'];
const problems = [
  'Content doesnt match business level',
  'Inconsistent / founder dependent',
  'Message unclear / fragmented',
  'Creates a lot but no pipeline',
];
const problemLabels: Record<string, string> = {
  'Content doesnt match business level': "Our content doesn't match the level of our business",
  'Inconsistent / founder dependent': "We're inconsistent / founder dependent",
  'Message unclear / fragmented': 'Our message is unclear / fragmented',
  'Creates a lot but no pipeline': "We create a lot but it doesn't turn into pipeline",
};
const opsOptions = ['Yes, full time', 'Yes, part time', 'No'];
const opsToNotion: Record<string, string> = {
  'Yes, full time': 'Yes full-time',
  'Yes, part time': 'Yes part-time',
  'No': 'No',
};

/* ─── reusable form atoms ─── */

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

function RadioGroup({ options, value, onChange, labels }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
            value === opt
              ? 'border-blue-500/40 bg-blue-500/[0.06] text-white'
              : 'border-white/[0.06] bg-[#111113] text-zinc-400 hover:border-white/[0.10] hover:text-zinc-300'
          }`}
        >
          <span className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              value === opt ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
            }`}>
              {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            {labels ? labels[opt] : opt}
          </span>
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, value, onChange }: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt)
        ? value.filter((v) => v !== opt)
        : [...value, opt]
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-4 py-3 rounded-xl border text-sm transition-all ${
            value.includes(opt)
              ? 'border-blue-500/40 bg-blue-500/[0.06] text-white'
              : 'border-white/[0.06] bg-[#111113] text-zinc-400 hover:border-white/[0.10] hover:text-zinc-300'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              value.includes(opt) ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
            }`}>
              {value.includes(opt) && <Check className="w-3 h-3 text-white" />}
            </span>
            {opt}
          </span>
        </button>
      ))}
    </div>
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

/* ─── main component ─── */

export default function Builder() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.company.trim() &&
    form.revenueBand &&
    form.primaryOffer.trim() &&
    form.biggestProblem &&
    form.whatToFix.trim() &&
    form.contentOpsPerson &&
    form.canCommitDay &&
    form.comfortableWithFilming &&
    form.whyYouWhyNow.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/.netlify/functions/builder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          contentOpsPerson: opsToNotion[form.contentOpsPerson] || form.contentOpsPerson,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Submission failed');

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
      <div className="gradient-border-top" />
      <Container className="pt-32 pb-16">
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-white mb-4">
              Brand Builder Day
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
              One day. Your office. A complete brand rebuild and content shoot.
              Five spots. Apply below.
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
                If you're a fit, you'll hear from me within 48 hours.
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
              {/* 1. Basics */}
              <SectionDivider label="Basics" number={1} />

              <div className="space-y-5 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Full name</Label>
                    <Input value={form.name} onChange={(v) => update('name', v)} placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <Label required>Email</Label>
                    <Input value={form.email} onChange={(v) => update('email', v)} placeholder="jane@company.com" type="email" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Company</Label>
                    <Input value={form.company} onChange={(v) => update('company', v)} placeholder="Company name" required />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input value={form.website} onChange={(v) => update('website', v)} placeholder="https://" />
                  </div>
                </div>
                <div>
                  <Label>Where are you based?</Label>
                  <Input value={form.location} onChange={(v) => update('location', v)} placeholder="City, Country" />
                </div>
              </div>

              {/* 2. Business Snapshot */}
              <SectionDivider label="Business snapshot" number={2} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>Current annual revenue</Label>
                  <RadioGroup options={revenueBands} value={form.revenueBand} onChange={(v) => update('revenueBand', v)} />
                </div>
                <div>
                  <Label required>Primary offer and price point</Label>
                  <TextArea
                    value={form.primaryOffer}
                    onChange={(v) => update('primaryOffer', v)}
                    placeholder="e.g. Group coaching program, $10k over 12 weeks"
                    rows={2}
                    required
                  />
                </div>
              </div>

              {/* 3. Distribution & Audience */}
              <SectionDivider label="Distribution & audience" number={3} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label>Where are you currently active?</Label>
                  <CheckboxGroup options={channels} value={form.activeChannels} onChange={(v) => update('activeChannels', v)} />
                </div>
                <div>
                  <Label>Rough audience size per main channel</Label>
                  <Input
                    value={form.audienceSize}
                    onChange={(v) => update('audienceSize', v)}
                    placeholder="e.g. IG 12k, Email 4k, YT 800"
                  />
                </div>
              </div>

              {/* 4. Biggest Problem */}
              <SectionDivider label="Biggest brand / content problem" number={4} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>What feels most broken right now?</Label>
                  <RadioGroup options={problems} value={form.biggestProblem} onChange={(v) => update('biggestProblem', v)} labels={problemLabels} />
                </div>
                <div>
                  <Label required>In your own words, what's the #1 thing you want to fix on a Brand Builder Day?</Label>
                  <TextArea
                    value={form.whatToFix}
                    onChange={(v) => update('whatToFix', v)}
                    placeholder="Be specific. The more detail, the better."
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* 5. Team & Implementation */}
              <SectionDivider label="Team & implementation" number={5} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>Do you have at least one person who can own content ops after this?</Label>
                  <RadioGroup options={opsOptions} value={form.contentOpsPerson} onChange={(v) => update('contentOpsPerson', v)} />
                </div>
                {(form.contentOpsPerson === 'Yes, full time' || form.contentOpsPerson === 'Yes, part time') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label>Who are they and what's their role today?</Label>
                    <TextArea
                      value={form.opsPersonRole}
                      onChange={(v) => update('opsPersonRole', v)}
                      placeholder="e.g. VA who handles social scheduling, 20hrs/week"
                      rows={2}
                    />
                  </motion.div>
                )}
              </div>

              {/* 6. Commitment & Logistics */}
              <SectionDivider label="Commitment & logistics" number={6} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>Can you commit one full day in the next 30 days, on site at your office?</Label>
                  <RadioGroup options={['Yes', 'No']} value={form.canCommitDay} onChange={(v) => update('canCommitDay', v)} />
                </div>
                {form.canCommitDay === 'Yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <Label>Any blackout dates?</Label>
                    <Input
                      value={form.blackoutDates}
                      onChange={(v) => update('blackoutDates', v)}
                      placeholder="e.g. April 7-11"
                    />
                  </motion.div>
                )}
                <div>
                  <Label required>Are you comfortable with us filming the day and using the footage/results as content and case studies?</Label>
                  <RadioGroup options={['Yes', 'No']} value={form.comfortableWithFilming} onChange={(v) => update('comfortableWithFilming', v)} />
                </div>
              </div>

              {/* 7. Why You */}
              <SectionDivider label="Why you, why now" number={7} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>If I only pick five people, why should you be one of them?</Label>
                  <TextArea
                    value={form.whyYouWhyNow}
                    onChange={(v) => update('whyYouWhyNow', v)}
                    placeholder="What makes this the right moment for you?"
                    rows={4}
                    required
                  />
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
    </div>
  );
}
