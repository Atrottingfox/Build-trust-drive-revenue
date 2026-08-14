# Brand Builder Day emails

Two emails. That is the whole follow up. There is no nurture sequence.

Both are sent from GoHighLevel. The site cannot send them: the Private
Integration Token is not authorised for the conversations scope, so the Netlify
function can create the contact and tag it but cannot send mail as Sean.

`[Secure link]` in both is:

```
https://authorityengine.com.au/lock-in?c={{contact.id}}
```

The `?c=` part is what links their payment and their chosen date back to the
right person in GHL. An email that drops it still works, it just cannot attach
the payment automatically.

---

## Email 1. Sent immediately on application

**Trigger:** tag `applied` added
**Timing:** immediate, no delay
**Exit on:** tag `brand-day-paid`

**Subject:** Next step for your Brand Builder Day

```
Hey {{contact.first_name}},

Thanks for your Brand Builder Day application. You're the exact kind of founder
this is built for. I only do a handful of these a month.

Next step: secure your Day.

Pay the 5,000 AUD fee and pick your Brand Builder Day date here:
[Secure link]

Once that's done, you'll get:

- A confirmation with your date
- Prep instructions
- Access to the Short-Form Sprint so your team can start moving now

After I've reviewed everything and we've had a short prep call, if either of us
decides it's not the right move, I'll refund your 5,000 in full.

Sean
```

This is belt and suspenders. The application already redirects them straight to
the secure page, so this email exists for the person who closed the tab.

---

## Email 2. The one reminder

**Trigger:** tag `applied`
**Timing:** wait 48 hours
**Exit on:** tag `brand-day-paid`

Anyone who has paid never sees this. That exit condition is the whole safety
mechanism, so it goes on before the workflow is published.

**Subject:** Still want a Brand Builder Day?

```
Hey {{contact.first_name}},

Saw your application come through, appreciate you taking the time.

Just wanted to close the loop. If you still want to move forward with a Brand
Builder Day, the next step is to secure your spot here:

[Secure link]

If now's not the right time or you've changed direction, no stress. Just hit
reply and let me know so I can free up the slot for someone else.

Sean
```

One reminder. Nothing after this. Silence is a no.

---

## Finding the drop offs

No sheet needed. The tags already answer it.

In GHL contacts, filter:

```
tag is `applied`
AND tag is not `brand-day-paid`
AND created more than 48 hours ago
```

That is the "applied and didn't book" list. Save it as a smart list so it is one
click, not a report anyone has to build.

For the long term list, add the tag `paid-no-date` manually to anyone worth
keeping warm, and export it when there is something to send them.
