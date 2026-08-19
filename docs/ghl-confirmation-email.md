# GHL: the application confirmation email

What sends the applicant a confirmation when they apply at `/builder`, and sends Sean a copy.

Verified against the live sub-account `B7IFxtiHwcLoDatUHVF6` on 20 Aug 2026.

---

## Split

**Done, in the repo, already live.** The application creates the GHL contact, writes 12 custom
fields, and applies the `applied` tag. That tag is the trigger everything below hangs off.
Verified working: 3 contacts currently carry it.

**Yours, in the GHL UI.** The workflow itself. The API returns 401 on both `workflows/` and
`emails/builder`, and GHL's UI ignores browser automation, so this cannot be built for you. It
is about ten minutes of clicking.

---

## Before you build anything: check WF1

There is already a workflow called **`Application Tag Workflow`** in the account, built
2026-08-13 around 8:22 PM. **Open it first.**

Two known problems with it:

1. **It was built by GHL's AI before the custom fields existed.** Its sibling workflow WF2 was
   found with `Set Hold Expires Field` pointing at no field at all, because the fields were
   created 17 minutes after the AI wrote it. WF1 has the same exposure and has never been
   verified.
2. **Its Slack step was dropped on 14 Aug** because the Netlify function already posts to
   Slack and you were getting two alerts per applicant.

So: **edit WF1, do not build a second workflow on the same trigger.** Two workflows both
firing on `applied` means every applicant gets two confirmation emails, and that is the kind
of error people forward to each other.

---

## The build

**Trigger:** Contact Tag Added, tag `applied`

**Filter:** none. Every applicant gets this.

### Action 1: Send Email (to the contact)

**From:** your verified sending address
**Subject:** `Your Brand Builder Day application`
**Reply to:** your own address, so replies reach you and not a no-reply void

Send it as **plain text, not a designed template.** The first line is "I read these myself",
and a logo, a hero image and a button contradict that before they finish the sentence. The
format is part of the claim.

Body, paste as is. `{{contact.first_name}}` is the only merge field:

```
{{contact.first_name}},

It's in. I read these myself, usually inside 48 hours.

Worth knowing what I'm actually reading for, because it isn't what most people assume.

Revenue isn't the first thing I look at. The operator question is, whether there's someone who can own content ops after the day. That one decides most of them. The day builds a machine, and a machine with nobody at the controls is just an expensive document.

The second thing is what you wrote in your own words about the one thing you want to fix. The applications that get in almost always have something specific and slightly uncomfortable in that box. The ones that don't tend to say "more leads".

Five spots. If yours is one of them you'll get an invitation with the details and a link. If it isn't, I'll tell you why rather than going quiet on you.

Sean
```

> **No link in this email, deliberately.** Applying and being accepted are two different
> events. The date and payment page only arrives once you have actually read the application.
> That gap is the product.
>
> **Check the "Five spots" line before you publish.** It is hardcoded here, but `/builder`
> renders a live count from the `days-remaining` function. If that number is ever not five,
> this email contradicts the page they just came from.

### Action 2: Internal Notification (to Sean)

This is the "can I get an email too" half. Slack is the queue, Notion is the record, this is
the one that reaches you away from a laptop.

**Type:** Email
**To:** your address
**Subject:** `Brand Builder Day application: {{contact.name}}`

Body:

```
{{contact.name}}
{{contact.email}}
{{contact.phone}}
{{contact.company_name}}

Most broken right now: {{contact.whats_broken}}
#1 thing to fix: {{contact.one_thing_to_fix}}
Someone to own content ops: {{contact.operator_status}}
Annual revenue: {{contact.annual_revenue}}

Accept and send this link:
https://authorityengine.com.au/lock-in?c={{contact.id}}

Full application in Notion and Slack.
```

> **Verify every merge field renders before you publish.** GHL accepts a reference to a field
> that does not exist and silently sends an empty line. Send yourself a test and read it.
>
> The custom field merge names above are best guesses at GHL's slugs. The authoritative ids
> are in the Netlify env vars (`GHL_FIELD_WHATS_BROKEN`, `GHL_FIELD_ONE_THING_TO_FIX`,
> `GHL_FIELD_OPERATOR_STATUS`, `GHL_FIELD_ANNUAL_REVENUE`). If a line comes through blank,
> that is which one to fix.

---

## The accept link

`https://authorityengine.com.au/lock-in?c={{contact.id}}`

**The `?c=` is not optional.** Payments are matched on contact id, never on email, because a
personal address applies and a company card pays. A link without it still takes money and then
you reconcile by hand.

The same link is now appended to every Slack application alert, so you have it in both places.

---

## Tag naming

Your 13 Aug spec and this account both use **`invited`**, and `invited-lapsed` already exists
paired to it. In conversation you said `accepted`.

**Recommendation: stay on `invited`.** Creating `accepted` as a synonym means two tags meaning
the same thing and one of them silently going stale, which is how these accounts rot. If you
prefer `accepted`, rename `invited` rather than adding alongside it, and rename
`invited-lapsed` to match.

`accepted` does not currently exist. `applied`, `invited`, `invited-lapsed`, `declined` and
`concierge` all do.

---

## Click by click

GHL renames its menus between versions, so labels below are "look for this", not gospel.
The shape of the thing does not change.

1. **Log in and check the sub-account.** Top left switcher. You want the one whose id is
   `B7IFxtiHwcLoDatUHVF6`. Everything below is wrong if you build it in the agency view.
2. **Left sidebar > Automation.** Older versions call it Workflows, or hide it under Marketing.
3. **Find `Application Tag Workflow`** in the list. Do not click New Workflow.
4. **Note whether it says Draft or Published** before you open it. If it has been sitting in
   Draft, that alone explains why nothing has ever sent.
5. **Open it. Check the trigger first.** It should read Contact Tag, tag `applied`. If it says
   anything else, fix that before adding actions, or you will build onto a trigger that never
   fires.
6. **Read every action that is already in there.** Any action referencing a custom field: click
   into it and confirm a field is actually selected. This workflow was built by GHL's AI 17
   minutes before the custom fields existed, and its sibling was found with an empty reference.
7. **Delete any Slack action.** The Netlify function already posts to Slack. Two alerts per
   applicant was the 14 Aug problem.
8. **Add the applicant email.** Plus icon under the trigger > Send Email. Set from name and from
   address. Paste the subject and body from above. **Switch the editor to plain text or the code
   view.** The drag and drop builder wraps everything in a template with a logo and a button,
   which contradicts "I read these myself" before they finish the sentence.
9. **Add your own copy.** Plus icon again > Internal Notification > type Email > your address.
   Paste the second block from above.
10. **Check re-entry.** In workflow settings, leave re-entry off. On means a second application
    from the same person sends the confirmation twice.
11. **Save, then Publish.** These are two separate things in GHL. Saving a workflow that stays in
    Draft does nothing at all, silently, forever. The toggle is top right.

## Test before it goes near a real applicant

1. Apply at `/builder` with your own details.
2. Confirm the Slack alert arrives with the accept link at the bottom.
3. Confirm the confirmation email arrives, and that `{{contact.first_name}}` rendered.
4. Confirm your internal notification arrives, and that no line is blank.
5. Confirm the contact in GHL carries `applied` and nothing else.
6. Delete the test contact, or it sits in the queue looking like a real applicant.

---

## What this does not do yet

**The invitation email is not automated, by your own instruction.** Your note on it: *"One
personalised line at the top does most of the work. Write it yourself, don't automate it."* So
accepting someone is you reading the application, writing that one line, and pasting the
accept link. The copy is in `docs/invite-gate-emails.md`, email 2.

**The held slot sequence cannot run.** Day 1, 3, 5 and 7 all reference a hold expiry date, and
no such field exists on the contact. GHL's `Set Hold Expires Field` action was found with no
field selected at all. That sequence stays off until a hold expiry field is created and written
when someone is invited.
