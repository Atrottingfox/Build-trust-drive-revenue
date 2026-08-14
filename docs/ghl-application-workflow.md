# Application Tag Workflow, field by field

The workflow that exists in GHL today, and exactly what each field should say.
Everything here is paste ready.

Workflow: **Application Tag Workflow**
Trigger: Tag Added includes `applied`
Status: **Draft**. This is why no email arrives when an application comes
through. Draft workflows do not run.

---

## The flow changed, so this email changed

It used to acknowledge the application and leave them waiting to hear back. The
application now redirects them straight to the page where they pay and pick
their date, so this email's only job is putting the same link in their inbox for
the person who closed the tab.

---

## Step: Send Application Received Email

Rename the action to **Send Secure Your Day Email**. Its job now is carrying the
payment link.

| Field | Value |
|---|---|
| From Name | `Sean` |
| From Email | `sean@authorityengine.com.au` |
| Reply-To | `sean@authorityengine.com.au` |
| Subject | `Next step for your Brand Builder Day` |
| Pre-Header | `Secure your Day and pick your date.` |

**Three things being fixed there.**

The subject said "Your VIP Strategy Day Application has been received". Every
other thing the customer sees calls it a Brand Builder Day. VIP Strategy Day is
the internal Calendly and Stripe name leaking out. "VIP" is also a mild spam
trigger, and "has been received" tells them nothing they do not already know:
they just clicked submit.

The pre-header said "What I'm hunting", left over from a different email. That
is the preview text next to the subject line in the inbox. A preview unrelated
to the subject looks broken. Filters read the same mismatch as a signal.

Reply-To was defaulting to `sean@mg.authorityengine.com.au`. The subdomain in a
reply address looks machine generated. If the field is not on the action, it is
in the Settings tab or account level under Business Profile.

### Body, for Quick compose

Plain and conversational on purpose. The email that got flagged yesterday was
two words and a link, which is the exact shape spam filters distrust.

```
Hey {{contact.first_name}},

Thanks for your Brand Builder Day application. You're the exact kind of founder
this is built for. I only do a handful of these a month.

Next step: secure your Day.

Pay the 5,000 AUD and pick your Brand Builder Day date here:

https://authorityengine.com.au/lock-in?c={{contact.id}}

Once that's done, you'll get a confirmation with your date, prep instructions,
and a short prep call so I can get under the hood before the Day.

After I've reviewed everything and we've had that call, if either of us decides
it's not the right move, I'll refund your 5,000 in full.

Sean
```

Keep the `?c={{contact.id}}` on the link. It ties their payment and their chosen
date back to this exact contact. Drop it and the match falls back to guessing
from an email address.

---

## Step: Create Opportunity in Authority Engine, Applied

Leave it. Useful, and nothing else does it.

---

## Step: Send Internal Notification with Contact Details

**Delete this step.**

The site already posts every application to Slack with all 17 answers, in the
format Sean signed off on. Keeping both means two notifications for every
application, one of which is worse formatted.

---

## Before publishing

Add an exit condition to the workflow: **tag `brand-day-paid`**.

Without it, anyone who pays can still be caught by later steps. It costs nothing
now and prevents emailing a paying customer about paying.

---

## Then this workflow is done, and two more are needed

The 20 minute abandoned cart and the paid-with-no-date chase, both in
`ghl-workflows.md`. The abandoned cart is the one that catches the person who
saw the price and stopped, which is the biggest leak in the funnel.

Consider whether this workflow's email should move to a 20 minute delay and
replace the abandoned cart entirely. Sending immediately means someone who pays
three minutes later still gets an email telling them to go and pay.
