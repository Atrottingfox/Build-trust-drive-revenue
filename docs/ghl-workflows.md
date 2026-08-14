# GHL workflows for the Brand Builder Day

Supersedes `ghl-automation-spec.md`, which was written for the invite gate model
where Sean reviewed each application and sent an invitation by hand. That model
is gone. The site now redirects straight from the application to payment, which
deletes most of the old spec.

Five workflows. Build them in this order. Leave every one in **Draft**;
publishing is Sean's.

---

## What the site already does without any workflow

This is the part that is built and verified, so nothing below needs to duplicate
it.

| Event | The site does this itself |
|---|---|
| Application submitted | Creates the GHL contact, writes all 17 fields, tags `applied`, redirects to `/lock-in?c=<contactId>` |
| Stripe payment succeeds | Tags `brand-day-paid` and `paid-no-date` |
| Date chosen in Calendly | Tags `brand-day-booked`, writes `Brand day date`, removes `paid-no-date` |

Every workflow below triggers on one of those tags. None of them need to set a
tag the site already sets.

`[Secure link]` throughout is:

```
https://authorityengine.com.au/lock-in?c={{contact.id}}
```

---

## WF1. Next step

**Trigger:** tag `applied`
**Wait:** none
**Exit on:** tag `brand-day-paid`

Sends Email 1 from `brand-day-emails.md`.

The application already redirects them to the secure page, so this is purely for
the person who closed the tab. It is the cheapest insurance in the funnel.

**Worth considering before building this:** it fires the instant they apply,
while they are still looking at the payment page. Someone who pays three minutes
later still receives an email telling them to go and pay. WF2 does the same job
twenty minutes later and only reaches people who actually stopped. Building WF2
and skipping this one is the cleaner funnel, and one less email in the first
hour.

---

## WF2. Abandoned cart, 20 minutes

**Trigger:** tag `applied`
**Wait:** 20 minutes
**Exit on:** tag `brand-day-paid`

Sends the abandoned cart email from `brand-day-emails.md`.

They saw the price and stopped. Twenty minutes is long enough to know they are
not mid checkout, short enough that the decision has not gone cold.

---

## WF3. The one reminder

**Trigger:** tag `applied`
**Wait:** 48 hours
**Exit on:** tag `brand-day-paid`

Sends Email 2 from `brand-day-emails.md`.

One reminder. Nothing after it. Silence is a no.

The exit condition goes on before this is published. Without it, it emails
people who have already paid.

---

## WF4. Paid, no date

**Trigger:** tag `paid-no-date`
**Wait:** 1 hour
**Exit on:** tag `brand-day-booked`

This one matters more than it looks. Payment now comes before the calendar, so
someone can pay $5,000, close the tab on the success redirect, and end up with
no Brand Day. Nothing else in the system catches that.

**Subject:** Your Brand Builder Day is paid, let's get a date on it

```
Hey {{contact.first_name}},

Your payment came through, thank you. One thing left: your date.

Pick it here and it's locked in both our calendars:
[Secure link]

If the calendar is not showing you anything that works, hit reply and I'll open
something up.

Sean
```

Add a second step: wait a further 24 hours, same exit condition, and notify Sean
internally. At that point it is a phone call, not an email.

---

## WF5. Booked, here is what happens next

**Trigger:** tag `brand-day-booked`
**Wait:** none
**Exit on:** none

The confirmation. WF1 and WF3 both promise this, so it has to exist before either
of them goes out.

Sends:

- The confirmed date, from `{{contact.brand_day_date}}`
- Prep instructions
- Short-Form Sprint access
- The prep call link: `https://calendly.com/sean-authorityengine/prep-call`

**Open question, decide before publishing:** what actually delivers the
Short-Form Sprint. Right now nothing does. It is named in three emails and has no
asset behind it.

---

## Deliberately not built

| | Why |
|---|---|
| Lock-in invitation | The redirect is the invitation. No hand sent link any more. |
| Decline | There is no acceptance step. Everyone who applies goes to payment. A decline after payment is a refund, which is a conversation, not a workflow. |
| Hold expiry | Nothing is held. Payment is immediate. |
| Instalments | Sean builds this by hand when the first one rolls into the 90 day Install. |
| Weekly cadence | Delivery, not the funnel. Separate build. |

---

## Orphaned in GHL

Left alone rather than deleted, in case they matter later, but nothing reads or
writes them now:

- Tags `invited`, `invited-lapsed`
- Custom field `Hold expires`

---

## The drop off filter

No sheet, no report. A saved smart list in GHL contacts:

```
tag is `applied`
AND tag is not `brand-day-paid`
AND created more than 48 hours ago
```

And the one worth checking daily:

```
tag is `paid-no-date`
```

Anyone on that second list has given Sean $5,000 and has no Brand Day. It should
be empty almost all the time. If it is not, that is a phone call today.
