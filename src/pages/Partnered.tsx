import { useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Crosses, H2, Label, Section, Ticks } from './Founding';

/*
  /partnered. Sean, 23 Nov 2026: the Founding Partner offer, built on the
  /founding design. Every line is Sean's referral program copy, word for word.
  From the AI review he pasted, only the fixes were taken (vision before "Who
  we're looking for", "partner" never "affiliate"); none of the reviewer's
  wording. The "Founding Circle privileges" list was left out until Sean says
  he will deliver each one. Invitation only, so hidden from Google. Visits
  post to Slack through SEO's noIndex visit tracking.
*/

const EMAIL = 'Sean@authorityengine.com.au';
const PHONE = '0418544311';

const INTRO =
  "Hey (Founder), I've just spoken with a guy named Sean from The Authority Engine. He's worked behind the scenes with Australia's biggest B2B founders to scale their content like Taki Moore, Jay Wright, Andrew Handoza and a tonne of others. He's been doing brand days to strategically connect brand, content and production to drive revenue and scale the business without dependance on the founder. Based on where you are I thought it may be worth a conversation. I'll let you both take it from here.";

function IntroduceButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#introduce"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-semibold text-black hover:bg-zinc-200 transition-colors ${className}`}
    >
      Make an introduction
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
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-white/5 transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-blue-400" strokeWidth={3} /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied' : 'Copy the introduction'}
    </button>
  );
}

export default function Partnered() {
  return (
    <div className="min-h-screen bg-base">
      <SEO
        title="Founding Partners"
        description="An invitation only partnership for people whose judgment, reputation, and network I respect."
        path="/partnered"
        image="https://authorityengine.com.au/og-founding-v3.jpg"
        noIndex
      />
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />

      {/* HERO. Sean's rallying line, then his invitation lines. */}
      <section className="pt-24 pb-8 md:pt-40 md:pb-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <div className="accent-line mb-8" />
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-5">The Authority Engine | Founding Partners</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.04] mb-6">
              Fuck tall poppy.
              <span className="block text-zinc-300">Get in a room that celebrates when others win.</span>
            </h1>
            <p className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-4">
              This is not some random public affiliate program. It is an invitation only partnership for people whose judgment, reputation, and network I respect.
            </p>
            <p className="text-zinc-400 text-[17px] leading-relaxed mb-8">
              I'm selectively offering this to a specific set of founders & people who work closely with founders The Authority Engine can genuinely help.
            </p>
            <div className="glow-card p-5 md:p-8">
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Founding Partner Reward</p>
              <p className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight mt-2">One Private Media Strategy Day</p>
              <p className="text-zinc-300 text-[17px] leading-relaxed mt-3">
                If three qualified founders you directly introduce become paying Authority Engine clients, you unlock one Private Media Strategy Day - valued at $10,000+.
              </p>
            </div>
            <IntroduceButton className="mt-8" />
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHO */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Who we're looking for</Label>
            <H2>Founders who:</H2>
            <div className="mt-8">
              <Ticks items={[
                'Do at least $200K per month, ideally $1M+. Our clients currently average $1.06M. This is who we work best with.',
                'Already create content consistently.',
                'Have an operator, creative director, or media team.',
                'Want content to generate more qualified leads and sales.',
                'Are tired of inconsistent, founder dependent media.',
                'Want a system their team can run without the founder becoming a full time creator.',
                'Are willing to fulfil increased demand without dropping delivery standards.',
              ]} />
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">
              The full Authority Engine offer is here:{' '}
              <a href="/brand-day" className="text-blue-400 underline underline-offset-4 hover:text-blue-300">authorityengine.com.au/brand-day</a>
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>How the partnership works</Label>
            <H2>If you know someone who may be a genuine fit:</H2>
            <ol className="relative mt-12 ml-2 border-l border-white/10">
              {[
                'Identify a founder you believe I could help.',
                'Make a direct introduction by WhatsApp, email, or group chat.',
                "I'll have an exploratory conversation with them.",
                "I'll diagnose whether there is a genuine fit.",
                'If appropriate, I may invite them to apply for a Brand Day.',
                'If they implement well, they may be invited into the 90-Day Authority Engine Install.',
              ].map((t, i) => (
                <li key={t} className="relative pl-8 pb-10 last:pb-0">
                  <span className={`absolute top-2 rounded-full ${i < 2 ? '-left-[9px] h-4 w-4 bg-white ring-4 ring-blue-500/30' : '-left-[7px] h-3 w-3 bg-blue-500 ring-4 ring-blue-500/15'}`} />
                  <p className={`text-sm uppercase tracking-widest font-semibold ${i < 2 ? 'text-blue-400' : 'text-zinc-500'}`}>{i < 2 ? 'You' : 'Me'}</p>
                  <p className="text-white text-lg leading-relaxed mt-1">{t}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-5 py-4">
              <p className="text-zinc-300 text-[17px]">You do not need to sell, pitch, persuade, or manage the sales process.</p>
              <p className="text-white font-semibold text-[17px] mt-1">Your role is simply to make a trusted introduction.</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* REWARD */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Founding Partner Reward</Label>
            <H2>If three qualified founders you directly introduce become paying Authority Engine clients, you unlock:</H2>
            <div className="mt-8 rounded-2xl border border-blue-500/40 bg-blue-500/[0.07] p-6 md:p-8">
              <p className="font-display text-2xl md:text-4xl font-extrabold text-white leading-tight">One Private Media Strategy Day</p>
              <p className="text-zinc-300 text-[17px] mt-2">valued at $10,000+ each</p>
              <p className="text-white text-lg font-semibold leading-relaxed mt-5">
                The day is designed around the highest leverage media constraint in your business or team.
              </p>
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">It can include:</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
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
              ].map((t) => (
                <div key={t} className="glow-card px-5 py-4 flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 mt-1 shrink-0" strokeWidth={3} />
                  <span className="text-white text-[16px] leading-snug">{t}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">
              The agenda will be agreed in advance so the day creates a practical outcome, not just a day of conversation.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* WHAT COUNTS */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>What counts as a qualified referral</Label>
            <H2>A referral qualifies when the founder:</H2>
            <ol className="grid gap-3 mt-8">
              {[
                'Is directly introduced to The Authority Engine by you.',
                'Fits the target client profile.',
                'Completes the qualification process.',
                'Signs an agreement.',
                'Pays for a Brand Day. You are not responsible for the 90 day backend. All we want is more brand days with the right people so we can help more of them..',
              ].map((t, i) => (
                <li key={i} className="glow-card flex items-start gap-4 px-5 py-4">
                  <span className="font-display text-sm font-extrabold text-blue-400 w-5 mt-1">{`0${i + 1}`}</span>
                  <span className="text-white text-[17px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
            <p className="text-zinc-400 text-[17px] leading-relaxed mt-8">
              A name, forwarded link, booked call, application, or unqualified lead does not count.
            </p>

            <p className="font-display text-xl md:text-2xl font-extrabold text-white mt-14">Referral attribution</p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              The referral is attributed to the person who makes the first direct introduction.
            </p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              If multiple people introduce the same founder, attribution will be agreed based on who created the first meaningful connection.
            </p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              Founders already in an active conversation with The Authority Engine do not qualify unless agreed in writing beforehand.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* PRINCIPLES */}
      <section className="py-14 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Important principles</Label>
            <H2>This partnership is not about hard selling people.</H2>
            <p className="text-zinc-300 text-lg leading-relaxed mt-6">
              Only make an introduction if you genuinely believe the conversation could be useful. Your reputation matters more than the referral.
            </p>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white mt-12">You are never expected to:</p>
            <div className="mt-6">
              <Crosses items={[
                'Convince someone to buy (Please do not do this for your sake and mine)',
                'Explain the full offer',
                'Promise a result',
                'Chase the founder',
                'Handle objections',
                'Manage the sales process',
              ]} />
            </div>
            <p className="text-white text-lg font-semibold leading-relaxed mt-8">
              The Authority Engine handles qualification, diagnosis, and the conversation.
            </p>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* INTRODUCTION TEMPLATE + WHAT HAPPENS NEXT */}
      <section id="introduce" className="py-14 md:py-24 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Introduction template</Label>
            <div className="glow-card p-6 md:p-8 mt-8">
              <div className="flex items-center gap-2 text-zinc-500 text-[13px] uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" /> WhatsApp, email or group chat
              </div>
              <p className="text-zinc-200 text-[17px] leading-relaxed mt-4 whitespace-pre-line">{INTRO}</p>
              <div className="mt-6"><CopyTemplate /></div>
            </div>

            <p className="font-display text-xl md:text-2xl font-extrabold text-white mt-14">What happens next</p>
            <p className="text-zinc-300 text-[17px] leading-relaxed mt-4">
              If you know someone who may be a fit, introduce us directly here:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <a href={`mailto:${EMAIL.toLowerCase()}`} className="glow-card flex items-center gap-4 px-5 py-4 hover:border-blue-500/40 transition-colors">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/25"><Mail className="w-5 h-5 text-blue-400" strokeWidth={1.75} /></span>
                <span className="text-white text-[16px] break-all">{EMAIL}</span>
              </a>
              <a href={`tel:${PHONE}`} className="glow-card flex items-center gap-4 px-5 py-4 hover:border-blue-500/40 transition-colors">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/25"><Phone className="w-5 h-5 text-blue-400" strokeWidth={1.75} /></span>
                <span className="text-white text-[16px]">{PHONE}</span>
              </a>
            </div>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* TERMS */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Section>
            <Label>Reward terms</Label>
            <ul className="space-y-3 mt-2">
              {[
                'The reward is earned after three qualified referrals become paying clients.',
                'The strategy day must be used within 12 months of the first qualified referral.',
                'The strategy day is not exchangeable for cash, credit, or fee reductions.',
                'The day is subject to reasonable mutual availability.',
                'Additional work outside the agreed day is quoted separately.',
                'If you work within a company, the strategy day is delivered for the team or business you represent unless otherwise agreed.',
                'The partnership is personal, for you. This is not an open relationship. It cannot be transferred.',
                'The Authority Engine may update or end the program for future referrals, but already earned rewards will be honoured subject to these terms.',
              ].map((t) => (
                <li key={t} className="text-zinc-400 text-[15px] leading-relaxed">{t}</li>
              ))}
            </ul>
          </Section>
        </div>
      </section>

      <div className="gradient-line" />

      {/* CLOSE */}
      <section className="relative overflow-hidden py-16 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(59,125,255,0.16),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Section>
            <div className="accent-line mx-auto mb-10" />
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Get in a room that celebrates when others win.
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mt-6">
              The goal is: create valuable introductions between founders who want content to be simpler, more profitable, and less work, with a team capable of running it themselves.
            </p>
            <div className="flex justify-center">
              <IntroduceButton className="mt-10" />
            </div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}
