# Prep doc chase

The GHL workflow that fires off `prep-not-submitted`.

`prep-nudge` runs daily at 09:00 Brisbane. It finds install calls two days out,
asks Notion whether that client has submitted their Content review in the last
seven days, and tags the ones who have not. It removes the tag the moment the
form lands, so every step below must exit on the tag being removed.

## The workflow

**Name:** Prep Doc Chase

| | |
|---|---|
| **Trigger** | Contact Tag · Tag added · `prep-not-submitted` |
| **Action 1** | Send Email · *Before your call* · no delay |
| **Action 2** | Wait · until tag `prep-not-submitted` is removed · Timeout **1 day** |
| Condition branch | tag removed, they submitted, **END** |
| Time out branch | still nothing, Send Email 2, then **END** |

Turn the Timeout toggle **on** and set 1 day. Left off, the wait never expires
and the second email never sends.

**The form link, in both emails:**

```
https://authorityengine.notion.site/3b20b2eb6dfb8076879ccb4c5188494d
```

Paste it in the source-code view, not the WYSIWYG. Typing a URL into the editor
leaves it as dead text.

## One thing to know

The tag lands on the GHL contact, which is the founder who signed. The person
who actually fills the form is usually the operator. So these emails go to the
founder and rely on them passing it on, which is fine early and will not hold.

The fix, when it matters: the slot picker already captures the operator's name
and email, so it can upsert them into GHL as a contact tagged `media-operator`
and linked to the client. Then this workflow emails the person doing the work.
Worth doing once there is more than one client.

---

## Email 1

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

## Email 2

*Fires one day later if it is still not in. That is the day of the call.*

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

## Notes

**Two emails, not three.** There are only two days between the nudge and the
call. A third has nowhere to sit.

**Email 2 lowers the bar rather than repeating the ask.** Somebody who ignored
the first email is not going to fill a longer form because they were asked
twice. Offering to take dot points removes the reason without making a thing
of it.

**Nothing here chases after the call.** A prep doc submitted afterwards is not
prep, and chasing it teaches people the deadline is soft.
