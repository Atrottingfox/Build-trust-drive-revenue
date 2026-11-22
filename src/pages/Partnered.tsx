import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Section } from './Founding';

/*
  /partnered. The Founding Partner Network offer, for specialists who deliver
  work for Authority Engine members. Sean, 23 Nov 2026:
  - "keep tall poppy thing": his line leads the hero.
  - Copy from the repositioned partner page he pasted the same day (book
    citations stripped, hyphens dropped, "The goal is simple" cut).
  - "Before every introduction" is the context list from the "what else do
    they want" notes he pasted with it.
  Not on the page until Sean decides: paid units (expert call, review,
  workshop...) and their rates, partner tracks, the later upside pathway.
  Earlier versions: referral program cdba46d, first partner page 3042f2e.
  On the /founding design (OpenPage). Hidden from Google; visits post to Slack.
*/

const EMAIL = 'sean@authorityengine.com.au';
const PHONE = '0418544311';
const APPLY = `mailto:${EMAIL}?subject=${encodeURIComponent('Founding partner')}`;

const WHY = [
  { t: 'Get better opportunities', b: ['Be considered for relevant work with established businesses that have money, urgency, and the ability to implement.'] },
  { t: 'Spend less time selling', b: ['We help diagnose the problem, qualify the opportunity, provide the context, and coordinate the introduction.', 'You focus on the work.'] },
  { t: 'Keep your independence', b: ['You keep your own brand, clients, pricing authority, and business.', 'There is no exclusivity and no requirement to become a subcontractor.'] },
  { t: 'Work with better people', b: ['Build relationships with specialists and operators who care about quality, outcomes, and building serious companies.'] },
];

const SHAPE = ['Member training', 'Playbooks and frameworks', 'Private sessions', 'Events and working groups', 'Future Authority Engine initiatives'];

const WHO = [
  'Short form or long form content',
  'Production and creative direction',
  'Copywriting and VSLs',
  'Lead generation',
  'Paid acquisition',
  'Sales conversion',
  'Hiring and team development',
  'Systems and operations',
  'Strategic partnerships',
];

const STEPS = [
  'We understand your expertise, capacity, rates, and preferred work.',
  'We add you to the relevant partner bench.',
  'When a genuine fit appears, we bring you in with context and scope.',
  'You accept or decline the opportunity.',
  'You deliver the agreed work.',
  'Strong delivery earns repeat opportunities and deeper involvement.',
];

const CONTEXT = ['The business context', 'The actual problem', 'What has already been tried', 'The desired outcome', 'The decision maker', 'Constraints', 'Expected scope'];

const TERMS = ['No joining fee', 'No exclusivity', 'No unpaid delivery', 'Rates agreed before work begins', 'Payment terms agreed before introduction', 'No guaranteed volume', 'Participation is selective'];

/* The /founding (OpenPage) type and list styles. */
const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`}>{children}</p>
);
const H = ({ children, dark = false, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) => (
  <h2 className={`font-display text-[34px] md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] ${dark ? 'text-white' : 'text-zinc-900'} ${className}`}>{children}</h2>
);
const Tick = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <li className={`flex items-start gap-2.5 text-[16px] leading-relaxed ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}><Check className={`w-4 h-4 mt-1 shrink-0 ${dark ? 'text-blue-400' : 'text-[#3B7DFF]'}`} strokeWidth={3} />{children}</li>
);

/* Sean, 23 Nov: a hand written looking underline under the room line. */
function Scribble({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block pb-3">
      {children}
      <svg aria-hidden="true" viewBox="0 0 300 16" preserveAspectRatio="none" className="absolute left-[-2%] bottom-0 w-[104%] h-[14px] overflow-visible">
        <path d="M3 10.5 C 45 5.5, 90 4, 140 6.2 S 235 10.8, 297 5.2" fill="none" stroke="#3B7DFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13.2 C 70 9.8, 150 9.2, 214 10.6 S 270 11.4, 286 9.6" fill="none" stroke="#3B7DFF" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

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
        title="Founding Partner Network"
        description="A private network of exceptional specialists, operators, and partners across media, content, production, acquisition, and growth."
        path="/partnered"
        image="https://authorityengine.com.au/og-founding-v3.jpg"
        noIndex
      />

      {/* HERO. Sean: keep the tall poppy angle. */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <Eyebrow>The Authority Engine | Founding Partner Network</Eyebrow>
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto mt-5">F*ck tall poppy.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-5"><Scribble>Get in a room that cheers when others win.</Scribble></p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-8 max-w-2xl mx-auto">
              The Authority Engine is building a private network of exceptional specialists, operators, and partners across media, content, production, acquisition, and growth.
            </p>
            <ApplyButton className="mt-9" />
          </Section>
        </div>
      </section>

      {/* THE VISION, dark band */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>The goal</Eyebrow>
            <H dark className="mt-4">Put the best around the best.</H>
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">So serious businesses can move faster without every expert having to build the entire machine alone.</p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">
              This is not a public directory, affiliate scheme, or freelancer marketplace. It is a curated commercial network for people with real expertise, high standards, and the ambition to help build something bigger than their individual business.
            </p>
          </Section>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H>Why join</H>
          </Section>
          <Section className="grid md:grid-cols-2 gap-4 mt-12">
            {WHY.map((w, i) => (
              <div key={w.t} className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
                <p aria-hidden="true" className="font-display text-[48px] font-extrabold leading-none tracking-[-0.05em] text-[#3B7DFF]/15 select-none">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display text-2xl font-extrabold tracking-[-0.02em] mt-2">{w.t}</p>
                {w.b.map((b) => <p key={b} className="text-zinc-600 text-[17px] leading-relaxed mt-3">{b}</p>)}
              </div>
            ))}
            <div className="md:col-span-2 rounded-2xl bg-white border border-zinc-200 p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p aria-hidden="true" className="font-display text-[48px] font-extrabold leading-none tracking-[-0.05em] text-[#3B7DFF]/15 select-none">05</p>
                <p className="font-display text-2xl font-extrabold tracking-[-0.02em] mt-2">Help shape the standard</p>
                <p className="text-zinc-600 text-[17px] leading-relaxed mt-3">Founding partners can contribute to:</p>
              </div>
              <ul className="space-y-3 md:pt-14">{SHAPE.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            </div>
          </Section>
        </div>
      </section>

      {/* WHO WE WANT */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow>Who we want</Eyebrow>
            <H className="mt-4">Excellent at something valuable.</H>
            <p className="text-zinc-600 text-lg leading-relaxed mt-5">We are looking for people who are exceptional at one or more of the following:</p>
          </Section>
          <Section className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl mx-auto">
            {WHO.map((t) => (
              <span key={t} className="rounded-full bg-white border border-zinc-200 px-5 py-2.5 text-zinc-900 text-[16px] font-semibold">{t}</span>
            ))}
          </Section>
          <Section className="text-center mt-8">
            <p className="text-zinc-500 text-[17px]">You do not need to do everything.</p>
          </Section>
        </div>
      </section>

      {/* HOW IT WORKS, dark band with white number cards */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <H dark>How it works</H>
          </Section>
          <Section className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {STEPS.map((t, i) => (
              <div key={t} className="rounded-2xl bg-white text-zinc-900 p-5">
                <p className="font-display text-sm font-extrabold text-[#3B7DFF]">{`0${i + 1}`}</p>
                <p className="font-semibold text-[16px] leading-snug mt-2">{t}</p>
              </div>
            ))}
          </Section>
          <Section className="mt-14 md:mt-20 rounded-3xl bg-white text-zinc-900 p-7 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Eyebrow>Before every introduction</Eyebrow>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] mt-3">You walk in with context.</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">No vague client calls. You get:</p>
            </div>
            <ul className="space-y-2.5">{CONTEXT.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
          </Section>
        </div>
      </section>

      {/* FOUNDING TERMS, the /founding price box */}
      <section className="py-16 md:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="rounded-3xl bg-white border-2 border-[#3B7DFF] p-7 md:p-12 shadow-[0_30px_80px_-40px_rgba(59,125,255,0.6)]">
            <div className="text-center">
              <Eyebrow>Founding terms</Eyebrow>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] mt-4">No joining fee.</p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-8 max-w-xl mx-auto">{TERMS.slice(1).map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            <p className="text-zinc-600 text-[17px] leading-relaxed mt-8 pt-6 border-t border-zinc-100 text-center max-w-xl mx-auto">
              This is being built with the founding partners. We are not pretending the network is already mature. The opportunity is to help shape the standard early, while gaining access to a better commercial channel.
            </p>
            <div className="flex justify-center"><ApplyButton className="mt-8" /></div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-[15px]">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#3B7DFF]"><Mail className="w-4 h-4" />{EMAIL}</a>
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#3B7DFF]"><Phone className="w-4 h-4" />{PHONE}</a>
            </div>
          </Section>
        </div>
      </section>

      {/* CLOSE, the /founding dark band */}
      <section className="relative overflow-hidden bg-[#0B0D12] text-white py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">Build the room you wish existed.</h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-300 leading-[1.15] mt-4">F*ck tall poppy.</p>
            <div className="flex justify-center"><ApplyButton white className="mt-10" /></div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
