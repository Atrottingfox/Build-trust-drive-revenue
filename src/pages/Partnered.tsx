import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Copy, Mail, MessageCircle, Phone, X } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Section } from './Founding';

/*
  /partnered. Sean, 23 Nov 2026: the Founding Partner offer.
  Second pass, same day: on the /founding design (OpenPage: light page, dark
  bands, white cards, blue buttons), the rallying line smaller, and the fixes
  from a pasted review applied in Sean's words only: the reward shown once,
  straight after the hero; who, how, what counts, principles; the attribution
  and reward terms folded under the last button. Every line is his referral
  program copy. The review's "Founding Circle privileges" are left out until
  he says he will deliver them. Hidden from Google; visits post to Slack.
*/

const EMAIL = 'Sean@authorityengine.com.au';
const PHONE = '0418544311';

const INTRO =
  "Hey (Founder), I've just spoken with a guy named Sean from The Authority Engine. He's worked behind the scenes with Australia's biggest B2B founders to scale their content like Taki Moore, Jay Wright, Andrew Handoza and a tonne of others. He's been doing brand days to strategically connect brand, content and production to drive revenue and scale the business without dependance on the founder. Based on where you are I thought it may be worth a conversation. I'll let you both take it from here.";

const WHO = [
  'Do at least $200K per month, ideally $1M+. Our clients currently average $1.06M. This is who we work best with.',
  'Already create content consistently.',
  'Have an operator, creative director, or media team.',
  'Want content to generate more qualified leads and sales.',
  'Are tired of inconsistent, founder dependent media.',
  'Want a system their team can run without the founder becoming a full time creator.',
  'Are willing to fulfil increased demand without dropping delivery standards.',
];

const STEPS = [
  { who: 'You', t: 'Identify a founder you believe I could help.' },
  { who: 'You', t: 'Make a direct introduction by WhatsApp, email, or group chat.' },
  { who: 'Me', t: "I'll have an exploratory conversation with them." },
  { who: 'Me', t: "I'll diagnose whether there is a genuine fit." },
  { who: 'Me', t: 'If appropriate, I may invite them to apply for a Brand Day.' },
  { who: 'Me', t: 'If they implement well, they may be invited into the 90-Day Authority Engine Install.' },
];

const DAY = [
  'Review of your current media operation',
  'Brand and content strategy',
  'Turning media into a direct path to money',
  'Content direction and shoot planning',
  'Review of your team workflow',
  'Media standards and approval processes',
  'Scorecard and reporting structure',
  'Operator or creative director responsibilities',
  'Next quarter media priorities',
  'Live advice on turning business problems into content',
];

const COUNTS = [
  'Is directly introduced to The Authority Engine by you.',
  'Fits the target client profile.',
  'Completes the qualification process.',
  'Signs an agreement.',
  'Pays for a Brand Day.',
];

const NEVER = [
  'Convince someone to buy (Please do not do this for your sake and mine)',
  'Explain the full offer',
  'Promise a result',
  'Chase the founder',
  'Handle objections',
  'Manage the sales process',
];

const TERMS = [
  'The reward is earned after three qualified referrals become paying clients.',
  'The strategy day must be used within 12 months of the first qualified referral.',
  'The strategy day is not exchangeable for cash, credit, or fee reductions.',
  'The day is subject to reasonable mutual availability.',
  'Additional work outside the agreed day is quoted separately.',
  'If you work within a company, the strategy day is delivered for the team or business you represent unless otherwise agreed.',
  'The partnership is personal, for you. This is not an open relationship. It cannot be transferred.',
  'The Authority Engine may update or end the program for future referrals, but already earned rewards will be honoured subject to these terms.',
];

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

/* The /founding blue button, as a link to the introduction section. */
function IntroduceButton({ className = '', white = false }: { className?: string; white?: boolean }) {
  return (
    <a
      href="#introduce"
      className={`btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold transition-colors ${white ? 'bg-white text-black hover:bg-zinc-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.12)]' : 'bg-[#3B7DFF] text-white hover:bg-[#2f6be6]'} ${className}`}
    >
      Make an introduction
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function CopyTemplate() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INTRO);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked. The text is on the page to select by hand. */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full bg-[#3B7DFF] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#2f6be6] transition-colors"
    >
      {copied ? <Check className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied' : 'Copy the introduction'}
    </button>
  );
}

export default function Partnered() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-zinc-900">
      <SEO
        title="Founding Partners"
        description="An invitation only partnership for people whose judgment, reputation, and network I respect."
        path="/partnered"
        image="https://authorityengine.com.au/og-founding-v3.jpg"
        noIndex
      />

      {/* HERO. Sean, 23 Nov: "Get in a room that celebrates when others win" smaller, as the /founding second line. */}
      <section className="pt-28 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <Section>
            <Eyebrow>The Authority Engine | Founding Partners</Eyebrow>
            <h1 className="font-display text-[38px] md:text-6xl font-extrabold tracking-[-0.04em] leading-[1.04] text-zinc-900 max-w-4xl mx-auto mt-5">Fuck tall poppy.</h1>
            <p className="font-display text-xl md:text-2xl font-extrabold text-zinc-700 mt-5">Get in a room that celebrates when others win.</p>
            <p className="text-zinc-600 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
              This is not some random public affiliate program. It is an invitation only partnership for people whose judgment, reputation, and network I respect.
            </p>
            <p className="text-zinc-500 text-[16px] leading-relaxed mt-3 max-w-2xl mx-auto">
              I'm selectively offering this to a specific set of founders & people who work closely with founders The Authority Engine can genuinely help.
            </p>
            <IntroduceButton className="mt-9" />
          </Section>
        </div>
      </section>

      {/* THE REWARD, dark band with a white card (the /founding Strategy Day card). */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>Founding Partner Reward</Eyebrow>
            <H dark className="mt-4">If three qualified founders you directly introduce become paying Authority Engine clients, you unlock:</H>
          </Section>
          <Section className="mt-12 md:mt-16 rounded-3xl bg-white text-zinc-900 p-7 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.08]">One Private Media Strategy Day</p>
              <p className="text-[#3B7DFF] text-[17px] font-semibold mt-3">valued at $10,000+</p>
              <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-6">The day is designed around the highest leverage media constraint in your business or team.</p>
              <p className="text-zinc-600 text-[17px] leading-relaxed mt-4">The agenda will be agreed in advance so the day creates a practical outcome, not just a day of conversation.</p>
            </div>
            <div>
              <p className="text-zinc-600 text-[17px]">It can include:</p>
              <ul className="mt-4 space-y-2.5">{DAY.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            </div>
          </Section>
        </div>
      </section>

      {/* WHO */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <Eyebrow>Who we're looking for</Eyebrow>
            <H className="mt-4">Founders who:</H>
          </Section>
          <Section className="mt-10 max-w-3xl mx-auto rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
            <ul className="space-y-3">{WHO.map((t) => <Tick key={t}>{t}</Tick>)}</ul>
            <p className="text-zinc-500 text-[16px] leading-relaxed mt-6 pt-5 border-t border-zinc-100">
              The full Authority Engine offer is here:{' '}
              <a href="/brand-day" className="text-[#3B7DFF] font-semibold hover:underline underline-offset-4">authorityengine.com.au/brand-day</a>
            </p>
          </Section>
        </div>
      </section>

      {/* HOW IT WORKS, big faint step numbers as on /founding */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center">
            <Eyebrow>How the partnership works</Eyebrow>
            <H className="mt-4">If you know someone who may be a genuine fit:</H>
          </Section>
          <Section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {STEPS.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-white border border-zinc-200 p-6">
                <p aria-hidden="true" className="font-display text-[56px] font-extrabold leading-none tracking-[-0.05em] text-[#3B7DFF]/15 select-none">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-[#3B7DFF] text-[13px] font-semibold uppercase tracking-[0.18em] mt-2">{s.who}</p>
                <p className="text-zinc-900 text-[17px] font-semibold leading-snug mt-2">{s.t}</p>
              </div>
            ))}
          </Section>
          <Section className="text-center max-w-2xl mx-auto mt-10">
            <p className="text-zinc-600 text-[17px] leading-relaxed">You do not need to sell, pitch, persuade, or manage the sales process.</p>
            <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-1">Your role is simply to make a trusted introduction.</p>
          </Section>
        </div>
      </section>

      {/* WHAT COUNTS, dark band with white number cards (the /founding By day 90 band) */}
      <section className="bg-[#0B0D12] text-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow dark>What counts as a qualified referral</Eyebrow>
            <H dark className="mt-4">A referral qualifies when the founder:</H>
          </Section>
          <Section className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10">
            {COUNTS.map((t, i) => (
              <div key={t} className={`rounded-2xl bg-white text-zinc-900 p-5 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <p className="font-display text-sm font-extrabold text-[#3B7DFF]">{`0${i + 1}`}</p>
                <p className="font-semibold text-[16px] leading-snug mt-2">{t}</p>
              </div>
            ))}
          </Section>
          <Section className="text-center max-w-2xl mx-auto mt-10">
            <p className="text-zinc-300 text-[17px] leading-relaxed">You are not responsible for the 90 day backend. All we want is more brand days with the right people so we can help more of them..</p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-4">A name, forwarded link, booked call, application, or unqualified lead does not count.</p>
          </Section>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <Eyebrow>Important principles</Eyebrow>
            <H className="mt-4">This partnership is not about hard selling people.</H>
            <p className="text-zinc-600 text-lg leading-relaxed mt-6">Only make an introduction if you genuinely believe the conversation could be useful. Your reputation matters more than the referral.</p>
          </Section>
          <Section className="mt-10 max-w-3xl mx-auto rounded-2xl bg-white border border-zinc-200 p-6 md:p-8">
            <p className="font-display text-xl font-extrabold">You are never expected to:</p>
            <ul className="mt-4 space-y-3">
              {NEVER.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-zinc-600 text-[16px] leading-relaxed"><X className="w-4 h-4 mt-1 shrink-0 text-zinc-400" strokeWidth={3} />{t}</li>
              ))}
            </ul>
            <p className="text-zinc-900 text-[17px] font-semibold leading-relaxed mt-6 pt-5 border-t border-zinc-100">The Authority Engine handles qualification, diagnosis, and the conversation.</p>
          </Section>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section id="introduce" className="pb-16 md:pb-28 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Section className="rounded-3xl bg-white border-2 border-[#3B7DFF] p-7 md:p-12 shadow-[0_30px_80px_-40px_rgba(59,125,255,0.6)]">
            <Eyebrow>Introduction template</Eyebrow>
            <div className="flex items-center gap-2 text-zinc-400 text-[13px] uppercase tracking-widest mt-5">
              <MessageCircle className="w-4 h-4" /> WhatsApp, email or group chat
            </div>
            <p className="text-zinc-700 text-[17px] leading-relaxed mt-3">{INTRO}</p>
            <div className="mt-6"><CopyTemplate /></div>

            <p className="font-display text-xl font-extrabold mt-10 pt-8 border-t border-zinc-100">What happens next</p>
            <p className="text-zinc-600 text-[17px] leading-relaxed mt-2">If you know someone who may be a fit, introduce us directly here:</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              <a href={`mailto:${EMAIL.toLowerCase()}`} className="rounded-2xl border border-zinc-200 flex items-center gap-4 px-5 py-4 hover:border-[#3B7DFF] transition-colors">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B7DFF]/10"><Mail className="w-5 h-5 text-[#3B7DFF]" strokeWidth={1.75} /></span>
                <span className="text-zinc-900 text-[16px] break-all">{EMAIL}</span>
              </a>
              <a href={`tel:${PHONE}`} className="rounded-2xl border border-zinc-200 flex items-center gap-4 px-5 py-4 hover:border-[#3B7DFF] transition-colors">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B7DFF]/10"><Phone className="w-5 h-5 text-[#3B7DFF]" strokeWidth={1.75} /></span>
                <span className="text-zinc-900 text-[16px]">{PHONE}</span>
              </a>
            </div>
          </Section>
        </div>
      </section>

      {/* CLOSE, the /founding dark band with the soft blue glow. Terms fold away under it. */}
      <section className="relative overflow-hidden bg-[#0B0D12] text-white py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">The Authority Engine</h2>
            <p className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-zinc-200 leading-[1.15] mt-4">Get in a room that celebrates when others win.</p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-6">
              The goal is: create valuable introductions between founders who want content to be simpler, more profitable, and less work, with a team capable of running it themselves.
            </p>
            <div className="flex justify-center">
              <IntroduceButton white className="mt-10" />
            </div>
          </Section>

          <details className="group mt-14 text-left rounded-2xl border border-white/10 bg-white/[0.03]">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-zinc-300 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
              Referral attribution and reward terms
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5 text-zinc-400 text-[15px] leading-relaxed space-y-3">
              <p className="text-zinc-200 font-semibold">Referral attribution</p>
              <p>The referral is attributed to the person who makes the first direct introduction.</p>
              <p>If multiple people introduce the same founder, attribution will be agreed based on who created the first meaningful connection.</p>
              <p>Founders already in an active conversation with The Authority Engine do not qualify unless agreed in writing beforehand.</p>
              <p className="text-zinc-200 font-semibold pt-3">Reward terms</p>
              <ul className="space-y-2">{TERMS.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </details>
        </div>
      </section>

      <Footer />
    </div>
  );
}
