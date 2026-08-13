# GHL email copy - simplified Brand Day funnel

Paste-ready copy for every workflow in `ghl-automation-spec.md`. Compose inline in each action, no template library, each email used once.

**Existing copy already written** and not repeated here: Email 1 (application received), the decline email, the Brand Day confirmation, the D-7 prep doc, the D-1 logistics, the end of day and D+3 follow up. All in `~/Downloads/invite-gate-emails.md` and `~/Downloads/paid-client-sequence.md`. Both those files still contain em dashes; strip them before pasting.

**Everything below is new**, written for the simplified model. Sean should voice check before sending. Slots in `[SQUARE BRACKETS]` are his to fill and must not be automated.

---

## WF2 - Lock in your Brand Builder Day

Replaces the old "The invitation" email. No deadline, no hold, no spot release. The refund promise does the work the deadline used to.

**Subject:** `Your Brand Builder Day, ready to lock in`

```
{{contact.first_name}},

I've read your application. You're a fit for a Brand Builder Day.

[ONE LINE SEAN WRITES: quote their answer to "the #1 thing you want to
fix" and say why it's a day-solvable problem. Do not template this.]

Next step is one link. It takes the $5,000 and lets you pick your date
in the same go:

https://authorityengine.com.au/lock-in?c={{contact.id}}

What the day is. I come to you, one full day at your office. The morning
we pull the brand apart, where the message is breaking and what your
content signals versus what your business actually is. The afternoon we
rebuild it and shoot it. You finish with assets, not notes. Your operator
picks it up Monday.

The $5,000 credits in full toward the 90-Day Install. Do the install and
the day nets to nothing.

Before we meet we'll do a short prep call. If I get under the hood on
that call and decide this isn't the right move for you, I refund you in
full, same day. You're not locked into anything by paying.

Sean
```

**The `?c={{contact.id}}` is load bearing.** It becomes `client_reference_id` on the Stripe session so the payment matches this exact contact. Without it, payments match on email and break the first time someone applies from a personal address and pays on the company card.

---

## WF3 - Internal to Sean. Invited, gave a number, hasn't paid

Not sent to the applicant. Fires 24 hours after the lock-in link goes out if there is still no `brand-day-paid` and the contact has a mobile.

**To:** Sean
**Subject:** `Not paid, worth a call: {{contact.first_name}} {{contact.last_name}}, {{contact.phone}}`

```
Invited 24 hours ago, hasn't paid.

{{contact.first_name}} {{contact.last_name}}
{{contact.company_name}}
{{contact.phone}}
{{contact.email}}

Revenue: {{contact.annual_revenue}}
Operator: {{contact.operator_status}}
Wants fixed: {{contact.one_thing_to_fix}}
What's broken: {{contact.whats_broken}}

Lock-in link they were sent:
https://authorityengine.com.au/lock-in?c={{contact.id}}
```

Exits immediately if they get `brand-day-paid`, so a payer never generates this.

---

## WF6 - Paid, no date picked

Fires 24 hours after payment if there is still no `brand-day-booked`. This is the one crack the lock-in page can leak: they pay, then close the tab.

**Subject:** `Your Brand Day is paid for, just need your date`

```
{{contact.first_name}},

Your payment came through, thank you.

One thing left. Pick your date here and it goes into both our calendars:

https://authorityengine.com.au/lock-in?paid=1&c={{contact.id}}

If nothing on there works, reply to this and we'll sort a date by hand.

Sean
```

**Also fires an internal email to Sean** so ops can chase:

**Subject:** `PAID, no date: {{contact.first_name}} {{contact.last_name}}, {{contact.phone}}`

```
Paid 24 hours ago, hasn't picked a date.

{{contact.first_name}} {{contact.last_name}} - {{contact.company_name}}
{{contact.phone}} - {{contact.email}}
```

---

## WF7 - Prep call not booked

Two emails. The first at 2 days after the Brand Day is booked, the second 3 days later. Both exit the moment they get `prep-call-booked`.

### First, day 2

**Subject:** `Book your prep call before [BRAND DAY DATE]`

```
{{contact.first_name}},

Your Brand Builder Day is locked for {{contact.brand_day_date}}.

Before then we do a short prep call, 20 minutes. It's where I get under
the hood on your offer, your team and what you actually want out of the
day, so we walk in already knowing what we're building.

Book it here: [PREP CALL LINK]

The founders who skip this one get a worse day. It's the highest leverage
20 minutes in the whole thing.

Sean
```

### Second, day 5

**Subject:** `Still need 20 minutes before your day`

```
{{contact.first_name}},

Still haven't got you down for a prep call.

[PREP CALL LINK]

If none of those times work, reply with two that do and I'll make one fit.

Sean
```

**Also fires an internal email to Sean** at the second step, so a booked client never silently arrives unprepped.

---

## Notes

Merge field names above follow the `contact.` custom field keys created on 2026-08-14. Confirm the exact keys in GHL when composing, since the picker inserts them for you. Re-fetch with `scripts/ghl-custom-fields.mjs` if needed.

`[PREP CALL LINK]` cannot be filled until the Prep Call calendar exists in GHL.
