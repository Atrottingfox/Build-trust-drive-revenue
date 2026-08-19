# The Invite Gate: emails, rebuilt onto the live build

Sean's copy from `~/Downloads/invite-gate-emails.md` (13 Aug), reworked against what is
actually deployed as of 20 Aug 2026. **His lines are kept.** Every change is flagged and
reasoned below the email it appears in. Nothing was quietly rewritten.

Two mechanical passes applied throughout: em dashes replaced with periods or commas, and
hyphens dropped from compound adjectives (`90 Day`, `Short Form`, `long form`).

---

## The flow, as built

Apply at `/builder` > thank you screen, no link > **Sean moves `applied` to `accepted`** >
invitation email carries the link > `/lock-in?c=<contactId>` > **pick the date, then pay
$5,000** > confirmation page > Stripe receipt and Calendly invite.

Two things changed from the 13 Aug draft that affect copy:

1. **The order reversed.** It used to be pay then book. It is now book then pay, on one
   page (`LockIn.tsx:285` mounts Stripe only once a date is held). Any line that says "once
   you're paid you pick the date" is now backwards.
2. **The link is the lock-in page, not a checkout link.** It carries the date picker and
   the card on the same screen.

## What fires when

| Trigger | Delay | Asset | Tag after |
|---|---|---|---|
| Application submitted | instant | 1. Application received | `applied` |
| Sean accepts | instant | 2. The invitation | `accepted` |
| Sean redirects | instant | 5. Concierge route | `concierge` |
| Sean declines | instant | 4. Decline | `declined` |
| `accepted`, unpaid | day 1 | SMS | none |
| `accepted`, unpaid | day 3 | Three reasons email | none |
| `accepted`, unpaid | day 5 | SMS | none |
| `accepted`, unpaid | day 7 | Releasing your spot | `accepted-lapsed` |
| Payment cleared | instant | Paid sequence, starts | `brand-day-paid` |

> **Changed:** the 13 Aug table used `invited`. Sean's word is `accepted`, so the tag is
> `accepted` throughout. The Slack emoji reactions that drove this table are not built.
>
> **Unrecoverable error to design against, unchanged from Sean's note:** a paid client
> receiving "I'm giving your spot to someone else." Every held slot step must exit on
> `brand-day-paid`.

---

## 1. Application received

*Fires on submit. No link. Its only job is to make the wait feel deliberate rather than like silence.*

**Subject:** Your Brand Builder Day application
**Preview:** What I'm actually reading for.

---

[First name],

It's in. I read these myself, usually inside 48 hours.

Worth knowing what I'm actually reading for, because it isn't what most people assume.

Revenue isn't the first thing I look at. The operator question is, whether there's someone
who can own content ops after the day. That one decides most of them. The day builds a
machine, and a machine with nobody at the controls is just an expensive document.

The second thing is what you wrote in your own words about the one thing you want to fix.
The applications that get in almost always have something specific and slightly
uncomfortable in that box. The ones that don't tend to say "more leads".

Five spots. If yours is one of them you'll get an invitation with the details and a link.
If it isn't, I'll tell you why rather than going quiet on you.

Sean

> **Changed, one thing only:** "Question five is" became "The operator question is". The
> form has been reordered since (mobile added, revenue bands rewritten), so referring to a
> question by number will silently go wrong the next time the form moves.
>
> **Check before sending:** "Five spots" is hardcoded here, but `/builder` renders a live
> count from `days-remaining`. If that number is ever not five, this line contradicts the
> page they just came from.
>
> Everything else is as Sean wrote it. This email needs no link and no flow knowledge, which
> is why it survives the rebuild intact.

---

## 2. The invitation

*The most important email in the funnel. It should read like being let in, not like a sales
email. One personalised line at the top does most of the work. Write it yourself, don't
automate it.*

**Subject:** You're in, one of five
**Preview:** Here's what the day actually is.

---

[First name],

You're in.

[ONE LINE, WRITTEN BY YOU: quote or paraphrase their answer to "the #1 thing you want to
fix" and say why it's a day solvable problem. This is the line that makes the whole email
land. Don't skip it and don't template it.]

**What the day actually is**

I come to you. One full day, on site at your office.

The morning we pull the brand apart. Where the message is breaking, what your content
currently signals versus what your business actually is, and where the gap between those two
is costing you pipeline. It's rarely where founders think it is.

The afternoon we rebuild it and shoot it. Not a planning session about shooting. The camera
comes out and we capture against the new direction while it's fresh.

You finish the day with the brand direction, the content system, and footage already in the
can. Assets, not notes. Your operator picks it up on the Monday.

**The number**

$5,000, and it rolls in full toward the 90 Day Install if you go on. The Install is $15,000.
Come through a Day and you pay $10,000 of it, not $15,000. So the day nets to nothing if you
carry on. It's only $5,000 if you stop after one day.

**Your link:** [LOCK-IN LINK]

You pick your date and pay on the same page, in that order. The date is yours the moment it
clears.

I'll hold your spot until [DATE, 7 days out]. After that it goes to the next application,
and I'd rather say that plainly now than pretend there's no deadline.

You told me you could clear a day in the next 30. I'm going to hold you to that, because the
founders who book six weeks out are the ones who cancel.

Sean

> **Changed 1, the money.** Sean's original said the $5,000 "credits in full toward the
> 90-Day Install" and that "the day nets to nothing". **Both are true** and both are kept.
> `OfferLadder.tsx:55` confirms it: Install is $15,000, the Day rolls in, $10,000 additional,
> $15,000 collected across both. The only addition is the two numbers, because "credits in
> full" with no figure invites someone to assume the Install is then $5,000. It isn't, it's
> $10,000 more.
>
> **Changed 2, the order.** Sean's original: "Once you're paid you pick the date." That is
> now backwards. They book, then pay, on one page. Rewritten to two short lines that say so.
>
> **Changed 3, `[CHECKOUT LINK]` became `[LOCK-IN LINK]`.** The real value is
> `https://authorityengine.com.au/lock-in?c=<contactId>`. **The `?c=` is not optional.**
> Payments are matched on contact id, never on email, because a personal address applies and
> a company card pays.
>
> **Cut, and this needs your call.** The original closed with: *"three things fire
> automatically: the agreement, your Short-Form Sprint access, and a prep doc seven days
> before we meet."* None of the three is verifiable in the build:
> - **The agreement.** The only one that exists is the 90 Day Install agreement on `/install`
>   (`src/content/install-terms.ts`). There is no Brand Day agreement anywhere in the repo.
> - **Short Form Sprint access.** No trace of it in the codebase. It may exist outside the
>   site, but I can't confirm it, so I won't promise it in your voice.
> - **The prep doc.** `GHL_FIELD_PREP_DOC_URL` points at
>   `brand.contentengine.live/workbooks/prep?client=<slug>`, and the slug is written from
>   Stripe session metadata. Whether the doc renders is not something this repo can answer.
>
> Rather than have you promise three things that may not arrive, they're pulled. Tell me which
> genuinely exist and I'll put those back verbatim.
>
> **Also cut:** the prep call. It isn't in your original and it isn't needed here. It already
> has its own moment on the confirmation page after payment (`LockIn.tsx:416`).

---

## 3. Held slot sequence, day 1, 3, 5, 7

*They've been accepted and haven't taken it. This is not an abandoned cart. You already said
yes to them, and that is the entire leverage.*

### Day 1, SMS

> {{first_name}}, Sean. Your Brand Builder Day spot is held until {{hold_date}}. Link's in
> your email if you want it. If there's a question in the way, just reply here.

### Day 3, Email

**Subject:** Three reasons people sit on this

---

[First name],

Your spot's held until [date]. Four days.

When someone gets accepted and doesn't take it, it's nearly always one of three things. I'd
rather name them than let you sit with it.

**It's the money.** $5,000 is real money and it should give you pause. Worth repeating that
it rolls in full toward the Install. Go on to the 90 days and the day costs you nothing on
net. It only costs $5,000 if you stop after one.

**It's the day itself.** Clearing a full day, on site, with your team watching you do it.
That's the part people quietly resist, and it's also the part that makes it work. Half days
produce nothing you can use, which is why I don't run them.

**It's me.** You don't yet know whether I'm any good. Completely fair. Fifteen minutes and
you'll know either way: [CALL LINK]

If it's none of those, the link's still sitting in your inbox.

Sean

### Day 5, SMS

> {{first_name}}, two days left on your spot, then it goes back in the pool. If it'd help to
> talk it through first: [CALL LINK]

### Day 7, Email

**Subject:** Releasing your spot

---

[First name],

I'm giving your Brand Builder Day spot to someone else today.

Nothing implied by that. Sometimes the timing is simply wrong, and a founder who books a day
they're not ready for gets a bad day, which serves neither of us.

Two doors, both fine:

**If it's timing**, reply with roughly when, and I'll come back to you when spots open.
**If there's a question I never answered**, fifteen minutes: [CALL LINK]

Otherwise you'll keep getting the content, and that's a genuinely good outcome too.

Sean

*Then tag `accepted-lapsed` and drop them back to nurture. Do not re-invite automatically. A
second invitation that arrives without them asking devalues the first one.*

> **Changed:** "invited" became "accepted" throughout, to match your tag. The day 3 money
> paragraph keeps "rolls in full" and "costs you nothing on net", both of which are accurate.
>
> **Blocked, needs a decision.** `{{hold_date}}` and "[date]" need a real hold expiry field
> per contact. The 14 Aug simplification deliberately deleted the held slot chase, and GHL's
> `Set Hold Expires Field` action was found with no field selected at all. So this sequence
> has nothing to read a date from. Either a hold expiry field gets created and written on
> `accepted`, or these four steps stay off.
>
> **Two SMS steps assume a mobile number.** The form now collects one, and `toE164AU()`
> normalises it, so this is fine, with the caveat that GHL accepts a malformed number and
> then silently fails to send.

---

## 4. Decline

*You'll send this more than any other email in the funnel. Which is exactly why it can't read
like a template. A well written no is the cheapest reputation you'll ever buy, and about a
third of them apply again.*

**Subject:** Your Brand Builder Day application

---

[First name],

I read it properly. It's a no for now, and you deserve the reason rather than silence.

**[PICK THE ONE THAT APPLIES]**

> **No operator.** You said there's nobody who can own content ops after the day. That's the
> one thing I can't design around. The day builds a machine, and without someone at the
> controls you'd have paid $5,000 for a very good document. Come back when you've hired.
> Reply to this and I'll tell you exactly what to hire for, no charge.

> **Too early.** A Brand Builder Day fixes distribution for a business that already works.
> From your answers the offer itself is still moving, and building brand on top of a shifting
> offer means rebuilding it in six months. Fix the offer, then come back.

> **Wrong fit.** What you're describing is someone to run it for you. I install systems and
> train the operator. I don't write scripts, edit video, design thumbnails or post on
> anyone's behalf. That's a legitimate service, it's just not mine. I know two people who do
> it well, say the word and I'll introduce you.

None of this is permanent. A decent share of the founders I work with got a no the first time.

The content stays free either way, [links].

Sean

> **Unchanged apart from the mechanical passes.** This email depends on nothing the build
> changed. It is only reachable at all because `/builder` now gates, which is the point:
> before today there was no decision to decline from.

---

## 5. Concierge route

*For the "No" on operator when the revenue says they can afford to solve it. This is a
redirect, not a decline. Sending these people the standard no leaves $40k on the table.*

**Subject:** Not a Brand Builder Day, something else

---

[First name],

Your application's a no for the Brand Builder Day, but not for the reason you're expecting.

You said there's nobody who can own content ops. At your size that isn't a disqualifier, it's
just a different problem, and buying a day that builds a system nobody runs would waste your
$5,000 and my day.

There's a version where hiring and ramping the operator is part of the install. It's called
the Concierge Install. It isn't on the website and I take a couple at a time.

Twenty minutes to see whether it fits: [CALL LINK]

If it doesn't, I'll tell you on the call.

Sean

> **Unchanged apart from the mechanical passes.** Same as the decline: it only becomes
> reachable now that the gate exists.
>
> **Worth knowing:** the Concierge Install has no page, no price in the repo, and no entry in
> `OfferLadder.tsx`. That's consistent with "it isn't on the website", so it's deliberate
> rather than missing. Flagging it so it doesn't get built by accident.

---

## What still doesn't exist

1. **Nothing sends email.** There is no Resend, SendGrid, Postmark or nodemailer anywhere in
   `netlify/` or `src/`. GHL and Kit are both wired to receive applicants and neither has sent
   a single email. Until this is solved, every email above is a document.
2. **No `accepted` trigger.** The tag has to be applied and something has to watch for it. The
   13 Aug spec used Slack emoji reactions, which are not built.
3. **No hold expiry field**, so section 3 cannot run.
4. **Three unverified promises** pulled out of email 2. See the note there.
