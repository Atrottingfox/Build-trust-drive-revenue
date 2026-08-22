# 90 Day Install rhythm, automated

Status: spec, not built. Written 2026-08-22.

## What it does

Someone signs the 90 Day Install agreement. From that moment nothing needs Sean.

```
sign-install writes install-signed
  -> GHL sends one email with a slot link
  -> client picks their weekly hour, once
  -> the whole call rhythm is created: Google Calendar, Zoom, Notion
  -> 24h before each call they are nudged if the form is not in
```

The failure state this kills: doing fortnightly date maths at 6pm, and turning
up to a call where nobody has prepared.

## What already exists, and is therefore not being rebuilt

Reading the CRM changed this design more than anything else. Three of the four
things the first draft wanted to create already exist.

| Need | What holds it | Notes |
|---|---|---|
| The calls | **Sessions & Replays** | Has Client relation, Date, Type, Recording. Type already has `Weekly check in`, `Monthly board call`, `90 day review`. Calendar view exists. |
| The prep form | **Weekly Cadence** | Already a published form view, `Weekly Submission (send this link)`. `Last Submission` already rolls up onto Clients. |
| The client | **Clients** | Stage, Install Start, Day 90, Founder, Operator, Sessions relation. |
| The slot grid | **nothing yet** | One new property, below. Not a new database. |

No tenth database. The slot is a property on Clients, so ownership is visible on
the board Sean already lives in.

## The one Notion change

Add to **Clients**:

| Property | Type | Why |
|---|---|---|
| `Weekly Slot` | select | `Wed 10:00`, `Wed 14:00` and so on. Options are the grid. |
| `Zoom Link` | url | The client's own recurring meeting, created once. |

A slot is free when no client with Stage in (`Day Booked`, `Day Delivered`,
`Install Live`) holds it. That is the entire double booking defence, and it is
ownership rather than a calendar lookup, so an hour free next Wednesday cannot
be handed out twice.

## Cadence, as config

Confirmed by Sean, 2026-08-22. Seven calls. Month one weekly, month two
biweekly, month three once. It lives in one object so a change is one line and
never touches logic.

```ts
export const CADENCE = [
  { week: 1,  month: 1, title: "90 Day Install, week 1" },
  { week: 2,  month: 1, title: "90 Day Install, week 2" },
  { week: 3,  month: 1, title: "90 Day Install, week 3" },
  { week: 4,  month: 1, title: "90 Day Install, week 4" },
  { week: 5,  month: 2, title: "90 Day Install, week 5" },
  { week: 7,  month: 2, title: "90 Day Install, week 7" },
  { week: 10, month: 3, title: "90 Day Install, week 10" },
];
```

Note: the last call lands at week 10, so the final stretch to Day 90 has no
call in it. Deliberate as specified.

## Modules

Plain files, no Netlify types, so the whole thing can move repo in an afternoon.

| File | Job |
|---|---|
| `_cadence.ts` | The config above, plus the date maths from a chosen first date |
| `_slots.ts` | Read held slots off Clients, return what is free, write a hold |
| `_calendar.ts` | Google create, update, incremental sync |
| `_zoom.ts` | Create one recurring meeting per client |
| `_sessions.ts` | Write and mirror the Sessions & Replays rows |

Handlers are thin wrappers:

| Handler | Job |
|---|---|
| `install-slot.ts` | GET renders the picker, POST creates everything |
| `calendar-sync.ts` | Scheduled. Pulls Google changes into Notion |
| `call-prep-chase.ts` | Scheduled. Nudges when a form is missing |

## Google Calendar

Events are created server side with `conferenceDataVersion=1` and no
`conferenceData`, so no Meet link is attached. That was the wall the earlier
session hit: the MCP calendar tool does not expose conferencing, the API does.
**Verify with one test event before trusting it**, because the Workspace admin
setting that force adds Meet may still win.

Every event carries `extendedProperties.private.sessionId`, pointing at its
Notion row. That single field is what makes the sync trivial.

The client is an attendee, so Google sends the invitations. No email layer.

### Direction of truth

Google is master for dates. Sean works in his calendar, so the calendar wins.

- Move a call in Google -> the Notion Date updates
- Delete a call -> the Notion row is marked
- Move a call to a different day or hour -> Slack line, no automatic
  re-allocation of the slot. Moving one call once does not mean the slot
  changed hands.

Polling every 15 minutes with a `syncToken`, not push notifications. Channels
expire roughly every 30 days and need a renewal job; polling needs nothing. A
lost `syncToken` costs a full resync, not data, so Netlify Blobs is a fine home
for it.

The one thing flowing the other way: a client set to `Churned` in Notion has
their remaining events deleted and their slot freed. A deliberate action, not a
sync, so there is no loop.

## Zoom

One **recurring meeting with no fixed time** per client, created on booking.
That gives a permanent join link with no schedule attached, which sidesteps the
fact that Zoom recurrence cannot express weekly-then-fortnightly. Dates live in
Google. The link is just a constant on the client record.

Server to Server OAuth, scope `meeting:write:admin`.

Better than one link per slot: it survives a client changing slots, keeps
recordings separated per client, and cannot collide with a Brand Day.

## The nudge

Scheduled function, same pattern as the working `prep-call-chase.ts`. Daily,
finds calls 24 to 48 hours out, checks Weekly Cadence for a row from that client
for that week, and only sends if it is missing. Silent when everyone is
prepared.

## New environment variables

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID
ZOOM_ACCOUNT_ID
ZOOM_CLIENT_ID
ZOOM_CLIENT_SECRET
NOTION_CLIENTS_DB      = fe95a7b9-08d5-4548-a58a-9d1fe51dedf4
NOTION_SESSIONS_DB     = f004ffed-17a8-4867-a397-ec964411cac9
NOTION_CADENCE_DB      = aa57b1a8-e15a-45b8-87c6-a877ed4f9389
WEEKLY_FORM_URL
```

`GOOGLE_REFRESH_TOKEN` goes on the weekly health check, so it shouts before it
rots rather than after.

## Prerequisites

1. Google OAuth credential, created once. About five minutes.
2. Zoom Server to Server OAuth app.
3. The existing Notion integration connected to the CRM page. It currently holds
   `NOTION_OPERATOR_DB` only, so access to Clients and Sessions is unproven.
4. The two `Clients` properties added.

## Open decisions

1. **Eight calls or six.** Blocks nothing, changes one object.
2. **The grid.** Which days and hours, and how many concurrent clients it holds.
   Stated capacity is 4 to 6 concurrent builds.
3. **Blackouts.** Public holidays and travel. Skip and push a week, or book over
   and move by hand. Skipping needs a list somewhere.
4. **Darcy.** Already scheduled by hand. Migrate onto this, or leave alone.
