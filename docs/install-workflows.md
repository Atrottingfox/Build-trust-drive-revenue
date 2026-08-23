# The GoHighLevel workflows

Everything the 90 Day Install needs from GHL.

**Install Signed Follow-Up is built and published.** It runs the whole slot
booking chase as one flow, which is right: it is a genuine sequence with a real
exit condition, and splitting it would have made it worse.

Three workflows are still missing, each one trigger and one email.

For the prep chase the sequence lives in code, so GHL fires one email per tag
and nothing else. No waits, no conditions, no timeouts to leave switched off.
The cron already knows when the call is and whether the form is in.

The slot chase is different and stays a flow: nothing in code watches for
somebody who never books, so the waits and the exit condition earn their place
there.

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

# 1. Install Signed Follow-Up  ·  BUILT

Published. Runs the whole slot chase.

```
install-signed
  Email 1: Pick Your Weekly Hour
  Wait 2 days for install-slot-booked
     condition  END
     time out   Email 2: Still Need Your Weekly Hour
                Wait 3 days or until install-slot-booked
                   condition  END
                   time out   Email 3: Want Me To Just Book This For You?
                              Add tag install-slot-chase
                              END
```

Branches the right way round, exits on the tag at both waits.

The link, pasted in **source-code view** so the merge field survives:

```
https://authorityengine.com.au/slot?c={{contact.id}}
```

`{{contact.id}}` must sit inside the URL. A merge field placed beside a link
rather than in it is how `/install` broke before.

Nothing to change here.

---

# 2. Prep Doc Chase  ·  TO BUILD

**Trigger:** Contact Tag, tag added, `prep-not-submitted`
**Action:** Send Email, no delay. Nothing else.

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

---

# 3. Prep Final Call  ·  TO BUILD

**Trigger:** Contact Tag, tag added, `prep-final-call`
**Action:** Send Email, no delay. Nothing else.

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

# 4. No Operator  ·  TO BUILD

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

## Two drafts worth deleting

```
draft   Install Signed Onboarding Email
draft   Install Slot Reminder
```

Both look superseded by the published flow. If either is ever published by
accident, a signed client gets two onboarding emails and cannot tell which link
is real.

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
