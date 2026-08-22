# The slot email

Fires on tag `install-signed`. One email, one link, no follow up needed.

Written 2026-08-23, same voice pass as the invite gate emails: no em dashes, no
hyphens in compound adjectives, Australian English.

## The workflow

| Trigger | Delay | Asset | Tag after |
|---|---|---|---|
| Tag added `install-signed` | instant | 1. Set your rhythm | none |
| `install-signed`, no `install-slot-booked` | day 2 | 2. Nudge | none |
| `install-signed`, no `install-slot-booked` | day 5 | 3. Last nudge | `install-slot-chase` |

The picker writes `install-slot-booked` itself, so every step above must exit on
that tag. A client who has booked receiving "you have not booked yet" is the
error worth designing against.

**The link, in all three:**

```
https://authorityengine.com.au/slot?c={{contact.id}}
```

`{{contact.id}}` must sit inside the URL, not beside it. A merge field placed
next to the link rather than in it sends people to a page that cannot identify
them, which is exactly how `/install` broke before.

---

## 1. Set your rhythm

*Instant, on signature. The only job is to get the hour chosen while the decision
is still fresh.*

**Subject:** Pick your weekly hour
**Preview:** Two choices, then it is set for the whole build.

---

[First name],

You're in.

Before anything else, I need your weekly hour. Everything runs off it.

Pick it here: [Set your rhythm](https://authorityengine.com.au/slot?c={{contact.id}})

Two choices on that page. Your weekly call, and your monthly board call. Both
hours are then yours for the whole build, and every session goes straight into
your calendar. You will not get a booking link again.

One thing to have ready. It asks for your media operator's name and email,
because they're the one on every weekly call, not you. If you haven't hired yet,
leave it blank and come back to the same link once you have.

The weekly calls start two weeks out. Four in the first month, then fortnightly,
then monthly. Your board call is once a month and it runs for as long as we work
together.

Sean

---

## 2. Nudge

*Day 2, only if they have not booked.*

**Subject:** Still need your hour
**Preview:** It takes about thirty seconds.

---

[First name],

Your hour is still open, which means nothing is in the calendar yet.

[Pick it here](https://authorityengine.com.au/slot?c={{contact.id}})

The hours go on a first come basis and there are six of them. The longer this
sits, the more likely your preferred time is gone.

Sean

---

## 3. Last nudge

*Day 5. Tags `install-slot-chase` so it can be filtered and chased by hand.*

**Subject:** I don't want to start you late
**Preview:** Five minutes, or reply and I'll do it for you.

---

[First name],

Still nothing booked, and I'd rather ask than let it drift.

[Set it here](https://authorityengine.com.au/slot?c={{contact.id}})

If the page is giving you trouble, or you'd rather I just picked one, reply to
this and tell me a day that works. I'll set it up on my end.

Sean

---

## Notes

**Three emails, not five.** They have paid $10,000. The tone that suits an
unconverted applicant does not suit somebody who has already committed.

**No SMS.** The invite gate uses it because money is outstanding. Here it is not.

**Email 3 offers to do it for them.** Somebody who has ignored two emails about a
thirty second task usually has a reason, and it is rarely the task. Offering to
do it removes the excuse without making a thing of it.
