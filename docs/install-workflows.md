# The GoHighLevel workflows

Everything the 90 Day Install needs from GHL. Four workflows, five emails, and
one condition between the lot of them.

The sequence lives in code. GHL fires one email per tag and nothing else: no
waits, no conditions, no timeouts to leave switched off. A branch on a screen
cannot be diffed or tested, and the one built on 23 August had its branches
inverted and its timeout off, which was invisible until somebody opened it.

## The tags, and what sets them

| Tag | Set by | When |
|---|---|---|
| `install-signed` | `sign-install.ts` | They sign the agreement |
| `install-slot-booked` | the slot picker | All ten calls are created |
| `install-no-operator` | the slot picker | They booked without an operator |
| `prep-not-submitted` | `prep-nudge`, daily 9am | 48 hours out, no Content review |
| `prep-final-call` | `prep-nudge`, daily 9am | 24 hours out, still nothing |

`prep-nudge` removes the earlier tag as it adds the later one, and clears both
the moment the form lands. So no workflow needs to check anything.

---

# 1. Install Signed

**Trigger:** Contact Tag, tag added, `install-signed`

| Step | |
|---|---|
| Send Email | *Pick your weekly hour*, no delay |

That is the whole workflow. One step.

The link, pasted in **source-code view** so the merge field survives:

```
https://authorityengine.com.au/slot?c={{contact.id}}
```

`{{contact.id}}` must sit inside the URL. A merge field placed beside a link
rather than in it is how `/install` broke before.

**Subject:** Pick your weekly hour
**Preview:** Two choices, then it is set for the whole build.

---

[First name],

You're in.

Before anything else, I need your weekly hour. Everything runs off it.

[Set your rhythm](https://authorityengine.com.au/slot?c={{contact.id}})

Two choices on that page. Your weekly call, and your board call every four
weeks. Both hours are then yours for the whole build, and every session goes
straight into your calendar. You will not get a booking link again.

One thing to have ready. It asks for your media operator's name and email,
because they're the one on every weekly call, not you. If you haven't hired
yet, leave it blank and come back to the same link once you have.

The weekly calls start two weeks out. Four in the first month, then
fortnightly, then one in month three. Your board call is every four weeks and
it runs for as long as we work together.

Sean

---

# 2. Slot Not Booked

**Trigger:** Contact Tag, tag added, `install-signed`
**Wait:** 2 days
**Condition:** does the contact have `install-slot-booked`? If yes, end.

This is the one workflow that needs a check, because nothing in code watches for
somebody who never books. Keep it to a single condition and no nested branches.

**Subject:** Still need your hour
**Preview:** About thirty seconds.

---

[First name],

Your hour is still open, which means nothing is in the calendar yet.

[Pick it here](https://authorityengine.com.au/slot?c={{contact.id}})

There are six of them and they go on a first come basis. The longer this sits,
the more likely your preferred time is gone.

Sean

---

# 3. Prep Doc Chase

Two separate workflows, one per tag. Neither has a wait or a branch.

## 3a. Trigger: tag added `prep-not-submitted`

**Subject:** Before Wednesday
**Preview:** Two minutes, and it changes what the call is worth.

---

[First name],

Your call is in two days and your content review is not in yet.

[Fill it in here](https://authorityengine.notion.site/3b20b2eb6dfb8076879ccb4c5188494d)

It takes two minutes. What went out, what performed, what did not, and where
you got stuck.

I read it before we speak. When it is in, we spend the hour on the thing that
actually needs solving. When it is not, we spend the first twenty minutes
working out what happened, and that is twenty minutes you paid for.

Sean

## 3b. Trigger: tag added `prep-final-call`

**Subject:** Call tomorrow, still no doc
**Preview:** Send me dot points if that is all you have.

---

[First name],

Still nothing in, and we speak tomorrow.

[Two minutes, here](https://authorityengine.notion.site/3b20b2eb6dfb8076879ccb4c5188494d)

If you are flat out, reply to this with three dot points. What went out, best
performer, where you are stuck. That is enough for me to prepare properly.

Turning up cold is the one thing that wastes the call.

Sean

---

# 4. No Operator

**Trigger:** Contact Tag, tag added, `install-no-operator`

One email. They booked their calls without naming an operator, so the
invitations are currently going to the founder.

**Subject:** Who is running your content?
**Preview:** Same link, thirty seconds.

---

[First name],

Your calls are locked in, so that part is done.

The one thing missing is your media operator. They're on every weekly call, and
right now the invitations are coming to you instead of them.

[Add them here](https://authorityengine.com.au/slot?c={{contact.id}})

Same link as before. It knows you have already booked, so it only asks for their
name and email, and it puts them on every call still to come without moving any
dates.

If you haven't hired yet, that's the real conversation. Reply and tell me where
you are up to.

Sean

---

## Notes

**Emails are short because they have already paid.** The tone that suits an
unconverted applicant does not suit somebody who has committed $10,000.

**No SMS anywhere here.** The invite gate uses it because money is outstanding.
It is not, here.

**3b lowers the bar rather than repeating the ask.** Somebody who ignored the
first email will not fill a longer form because they were asked twice. Offering
to take dot points removes the reason without making a thing of it.

**Nothing chases after a call.** A prep doc submitted afterwards is not prep,
and chasing it teaches people the deadline is soft.
