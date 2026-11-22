import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Section } from './Founding';

/*
  /partnered. Sean, 23 Nov 2026: the Partner Network offer, for specialists who
  deliver work for Authority Engine members (not the referral program; that
  version is in git at cdba46d). Copy is the partner offer Sean pasted, plus his
  rallying line "Fuck tall poppy. Get in a room that celebrates when others win."
  How it works and the terms come from the partner page draft he pasted earlier
  the same day. On the /founding design (OpenPage). Hidden from Google; visits
  post to Slack.
*/

const EMAIL = 'sean@authorityengine.com.au';
const PHONE = '0418544311';
const APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent('Founding partner')}`;

const RECEIVE = [
  'Qualified opportunities',
  'Clear problem context before calls',
  'Defined scopes',
  'Agreed rates and payment terms',
  'Reduced selling and admin',
  'Access to Sean and selected partners',
  'Opportunity to contribute to member training and playbooks',
  'Priority for relevant future work',
];

const PROVIDE = [
  'Proven expertise',
  'Reliable communication',
  'Defined availability',
  'High quality delivery',
  'No unnecessary upselling',
  'Confidentiality and professionalism',
];

const STEPS = [
  { t: 'We qualify you', b: 'We assess your capability, experience, communication, and standards.' },
  { t: 'We match the work', b: 'When a member has a relevant problem, we bring you in with context, scope, and a defined objective.' },
  { t: 'You deliver', b: 'You complete the agreed call, review, sprint, or project.' },
  { t: 'We review and compound', b: 'Strong delivery earns repeat demand, larger opportunities, and priority access to future work.' },
];

/* The /founding (OpenPage) type and list styles. */
const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`}>{children}</p>
);
const H = ({ children, dark = false, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) => (
  <h2 className={`font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] ${dark ? 'text-white' : 'text-zinc-900'} ${className}`}>{children}</h2>
);
const Tick = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5 text-[16px] leading-relaxed text-zinc-600"><Check className="w-4 h-4 mt-1 shrink-0 text-[#3B7DFF]" strokeWidth={3} />{children}</li>
);

function ApplyButton({ className = '', white = false }: { className?: string; white?: boolean }) {
  return (
    <a
      href={APPLY}
      className={`btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${white ? 'bg-white text-black hover:bg-zinc-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]' : 'bg-[#3B7DFF] text-white hover:bg-[#2f6be6]'} ${className}`}
    >
      Apply to become a founding partner
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function Partnered() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO
        title="Partner Network"
        description="Do excellent work for serious businesses without building another sales machine."
        path="/partnered"
        image="https://authorityengine.com.au/og-founding-v3.jpg"
        noIndex
      />

      {/* HERO */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <Eyebrow>The Authority Engine | Partner Network</Eyebrow>
            {/* Sean, 23 Nov: "i still like the whole angle of fuck tall poppy". His line leads, the offer sits under it. */}
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto mt-5">Fuck tall poppy.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-5">Get in a room that celebrates when others win.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">Do excellent work for serious businesses without building another sales machine.</p>
            <ApplyButton className="mt-9" />
            <p className="text-zinc-500 text-[15px] mt-4">No joining fee. No guaranteed volume. No exclusivity initially.</p>
          </Section>
        </div>
      </section>

      {/* RECEIVE / PROVIDE, the /founding fit cards */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
              <p className="font-display text-xl font-extrabold">Partners receive:</p>
              <ul className="mt-4 space-y-3">{RECEIVE.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            </div>
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
              <p className="font-display text-xl font-extrabold">Partners provide:</p>
              <ul className="mt-4 space-y-3">{PROVIDE.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            </div>
          </Section>
        </div>
      </section>

      {/* HOW IT WORKS, dark band with white number cards (the /founding By day 90 band) */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <H dark>How it works</H>
          </Section>
          <Section className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {STEPS.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-white text-zinc-900 p-5">
                <p className="font-display text-sm font-extrabold text-[#3B7DFF]">{`0${i + 1}`}</p>
                <p className="font-display text-lg font-extrabold leading-snug mt-2">{s.t}</p>
                <p className="text-zinc-600 text-[15px] leading-relaxed mt-2">{s.b}</p>
              </div>
            ))}
          </Section>
        </div>
      </section>

      {/* TERMS, the /founding price box */}
      <section className="py-16 md:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="rounded-3xl bg-white border-2 border-[#3B7DFF] p-7 md:p-12 text-center shadow-[0_30px_80px_-40px_rgba(59,125,255,0.6)]">
            <Eyebrow>Founding partner terms</Eyebrow>
            <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] mt-4">No joining fee.</p>
            <p className="text-zinc-600 text-[17px] leading-relaxed mt-5 max-w-xl mx-auto">
              You are paid per defined intervention or project at an agreed rate before work begins.
            </p>
            <p className="text-zinc-500 text-[16px] leading-relaxed mt-3 max-w-xl mx-auto">No guaranteed volume. No exclusivity initially.</p>
            <div className="flex justify-center"><ApplyButton className="mt-8" /></div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-[15px]">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#3B7DFF]"><Mail className="w-4 h-4" />{EMAIL}</a>
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#3B7DFF]"><Phone className="w-4 h-4" />{PHONE}</a>
            </div>
          </Section>
        </div>
      </section>

      {/* CLOSE, Sean's rallying line on the /founding dark band */}
      <section className="relative overflow-hidden bg-[#0B0D12] text-white py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">The Authority Engine</h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-200 leading-[1.15] mt-4">Get in a room that celebrates when others win.</p>
            <div className="flex justify-center"><ApplyButton white className="mt-10" /></div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
