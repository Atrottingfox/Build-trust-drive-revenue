import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../components/ui/Container';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import { readCtaSource } from '../lib/track';
/* Shared with the health dashboard, which checks these against what GHL will
   actually accept. See src/lib/formOptions.ts. */
import {
  revenueBands,
  revenueLabels,
  channels,
  problems,
  opsOptions,
  opsToStored as opsToNotion,
} from '../lib/formOptions';

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
  phone: string;
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
  operatorName: string;
  opsPersonRole: string;
  canCommitDay: string;
  howDidYouHear: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
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
  operatorName: '',
  opsPersonRole: '',
  canCommitDay: '',
  howDidYouHear: '',
};

/* Values are stored exactly as the GHL "Annual revenue" dropdown options.
   A mismatch means GHL silently drops the answer, so these strings and the
   dropdown in the sub-account have to move together. */

const problemLabels: Record<string, string> = {
  'Content doesnt match business level': "Our content doesn't match the level of our business",
  'Inconsistent / founder dependent': "We're inconsistent / founder dependent",
  'Message unclear / fragmented': 'Our message is unclear / fragmented',
  'Creates a lot but no pipeline': "We create a lot but it doesn't turn into pipeline",
};
/* Capacity ramp. Only months we've actually committed to appear here.
   Any month not listed renders without a spots count rather than guessing. */
const spotsByMonth: Record<string, number> = {
  '2026-08': 5,
  '2026-09': 6,
  '2026-10': 8,
  '2026-11': 8,
  '2026-12': 10,
};

function spotsThisMonth(): number | null {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return spotsByMonth[key] ?? null;
}



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

  /*
    The multiple choice questions render as buttons, not radio inputs, so the
    browser's own validation cannot see them. Submitting with one unanswered
    used to fail silently: no message, no highlight, nothing to act on. This
    names what is missing so the form can say so.
  */
  const missing: string[] = [
    !form.name.trim() && 'Full name',
    !form.email.trim() && 'Email',
    !form.phone.trim() && 'Mobile',
    !form.company.trim() && 'Company',
    !form.revenueBand && 'Current annual revenue',
    !form.primaryOffer.trim() && 'Primary offer and price point',
    !form.biggestProblem && 'What feels most broken right now',
    !form.whatToFix.trim() && 'The #1 thing you want to fix',
    !form.contentOpsPerson && 'Someone to own content ops',
    form.contentOpsPerson &&
      form.contentOpsPerson !== 'No' &&
      !form.operatorName.trim() &&
      "That person's name",
    !form.canCommitDay && 'Can you commit one full day',
  ].filter(Boolean) as string[];

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.company.trim() &&
    form.revenueBand &&
    form.primaryOffer.trim() &&
    form.biggestProblem &&
    form.whatToFix.trim() &&
    form.contentOpsPerson &&
    (form.contentOpsPerson === 'No' || form.operatorName.trim()) &&
    form.canCommitDay;

  const spots = spotsThisMonth();

  /*
    Capture the people who start this and never finish it.

    The form is long by design, and until now someone who typed their name and
    email and then stalled on question nine left nothing behind. There was no
    way to see how many start and drop, let alone follow one up.

    Fires once per page load, as soon as there is a name and an email that could
    actually be contacted. It tags `application-started` in GHL and nothing else.
    The full submit upserts the same contact and adds `applied`, so the abandoned
    list is "has application-started, does not have applied".

    Deliberately silent. Nobody is waiting on it, it must never interrupt someone
    who is still typing, and a failure here is not worth a word on screen.
  */
  const startedSent = useRef(false);

  /*
    Capture where they came from on arrival, not at submit.

    readCtaSource stores the value so it survives a refresh, but it was only
    ever called while sending, which meant the stored copy was written at the
    exact moment the URL was still there to be read and never once before it.
    Reading it on mount is what makes the fallback do anything at all.
  */
  useEffect(() => {
    readCtaSource();
  }, []);

  useEffect(() => {
    if (startedSent.current || submitted) return;

    const email = form.email.trim();
    const name = form.name.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    // They may still be typing the last character of their domain.
    const t = setTimeout(() => {
      if (startedSent.current) return;
      startedSent.current = true;

      fetch('/.netlify/functions/application-started', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: form.phone.trim(),
          company: form.company.trim(),
          website: form.website.trim(),
          ctaSource: readCtaSource(),
        }),
      }).catch(() => {
        /* Never surfaced. They are mid-application. */
      });
    }, 1200);

    return () => clearTimeout(t);
  }, [form.email, form.name, form.phone, form.company, form.website, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!isValid) {
      setError(
        missing.length === 1
          ? `One question left: ${missing[0]}.`
          : `Still to answer: ${missing.join(', ')}.`
      );
      // The browser cannot focus a button group, so take them to it.
      requestAnimationFrame(() => {
        document
          .querySelector('[data-form-error]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/.netlify/functions/builder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'builder',
          /* Which CTA sent them here, carried from the ?src= param. */
          ctaSource: readCtaSource(),
          ...form,
          contentOpsPerson: opsToNotion[form.contentOpsPerson] || form.contentOpsPerson,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Submission failed');

      /*
        The application ends here, on the thank you screen. It deliberately does
        NOT hand out the date-and-payment page.

        Applying and being accepted are two different events. Sean reads the
        application, moves them from `applied` to `accepted`, and the /lock-in
        link is delivered separately in the invitation email. That gap is the
        product: "this isn't a sales form, it's a filter" is only true if
        something actually filters.

        It also protects the client. Someone with nobody to own content ops
        cannot buy a day that builds a system nobody runs, because they never
        reach the checkout.

        The contact id is still mirrored into storage. The invitation carries
        ?c=<contactId> so payment and booking attach to this exact person in
        GHL, and storage is the fallback for when Stripe's overlay drops the
        query string on the way back from checkout.
      */
      if (data.contactId) {
        try {
          sessionStorage.setItem('ae_contact_id', data.contactId);
          localStorage.setItem('ae_contact_id', data.contactId);
        } catch {
          // Private browsing blocks storage. Not worth failing over.
        }
      }

      setSubmitted(true);
      return;
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
              Brand Day
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
              One day. Your office. A complete brand rebuild and content shoot.
              {spots !== null && ` ${spots} spots this month.`} Apply below.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Where are you based?</Label>
                    <Input value={form.location} onChange={(v) => update('location', v)} placeholder="City, Country" />
                  </div>
                  <div>
                    <Label required>Mobile</Label>
                    <Input
                      value={form.phone}
                      onChange={(v) => update('phone', v)}
                      placeholder="04XX XXX XXX"
                      type="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. Business Snapshot */}
              <SectionDivider label="Business snapshot" number={2} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label required>Current annual revenue</Label>
                  <RadioGroup options={revenueBands} value={form.revenueBand} onChange={(v) => update('revenueBand', v)} labels={revenueLabels} />
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
                  <Label required>In your own words, what's the #1 thing you want to fix on a Brand Day?</Label>
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
                    <div className="space-y-5">
                      <div>
                        <Label required>Their name</Label>
                        <Input
                          value={form.operatorName}
                          onChange={(v) => update('operatorName', v)}
                          placeholder="Dan Smith"
                          required
                        />
                      </div>
                      <div>
                        <Label>What's their role today?</Label>
                        <TextArea
                          value={form.opsPersonRole}
                          onChange={(v) => update('opsPersonRole', v)}
                          placeholder="e.g. VA who handles social scheduling, 20hrs/week"
                          rows={2}
                        />
                      </div>
                    </div>
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
              </div>

              {/* 7. Last thing */}
              <SectionDivider label="Last thing" number={7} />

              <div className="space-y-5 mt-6">
                <div>
                  <Label>How did you hear about this?</Label>
                  <Input
                    value={form.howDidYouHear}
                    onChange={(v) => update('howDidYouHear', v)}
                    placeholder="e.g. Instagram, a podcast, someone sent it to me"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-12 pb-4">
                {error && (
                  <p data-form-error className="text-red-400 text-sm mb-4">{error}</p>
                )}
                {/*
                  Deliberately clickable while incomplete. Disabling it meant a
                  click did nothing and said nothing, leaving no way to find the
                  one unanswered question. Now it answers that question.
                */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 btn-shine ${
                    submitting
                      ? 'bg-zinc-800 text-zinc-500'
                      : 'bg-white text-black hover:bg-zinc-200'
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
