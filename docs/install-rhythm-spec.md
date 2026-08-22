# 90 Day Install rhythm, automated

Built 2026-08-22, branch `feat/install-slot-picker`. Not deployed.

## The chain, end to end

```
client signs the agreement
  |
  |  sign-install.ts writes install-signed          [already live]
  v
GHL workflow emails one link                        [you build this, once]
  https://authorityengine.com.au/slot?c={{contact.id}}
  |
  v
install-slot.ts
  reads the calendar for what is genuinely free
  asks: operator name, operator email, board hour, weekly hour
  creates 10 events, invites, tags the contact, posts to Slack
  |
  v
Google Calendar is the record
  |
  +--> capacity.ts reads it back                    /capacity, gated
  +--> Monday Slack alert when intake outruns the grid
```

Nothing else has to be kept in sync, because nothing else holds a copy.

## The rhythm

Seven weekly calls, on one Wednesday hour that belongs to that client for the
whole install.

| Month | Weeks |
|---|---|
| One | 1, 2, 3, 4 |
| Two | 5, 7 |
| Three | 10 |

Plus three board calls, last Friday of the month, on a Friday hour the client
also picks. The founder sits in on those alongside the operator; the weekly
calls are the operator and Sean.

First call lands **at least two weeks** after signing.

## The two grids

Wednesday 10, 11, 12, 1pm, 4pm, 5pm. Six hours, less 2pm and 3pm which are
already committed. The board calls use the same six on the last Friday only.

A client needs one of each, held together, released together. Both hours stay
theirs until a week after their last call, weekly or board, whichever is later.

**The calendar is the only source of availability.** An hour is offered only if
it is clear on every date it would be used, so nobody gets a slot that dies in
week five, and there is no stored grid that could disagree with reality.
It cannot be handed out twice: the moment the first client books, the events
exist and the hour stops being offered.

## Capacity

Six hours held eleven weeks is a hard ceiling on intake.

| | |
|---|---|
| Concurrent clients | 6 |
| Ceiling | 0.55 per week, 2.4 per month, ~28 per year |

The book is only as open as the tighter of the two grids. Warnings fire on the
trend rather than on the last free hour, because by the time one hour is left,
anybody already signed is already a problem.

Three conditions: grid full, intake running above the ceiling, or down to one
opening. Silent otherwise, which is the only way a weekly alert stays read.

## Files

| File | Job |
|---|---|
| `_cadence.ts` | The rhythm, the board call dates, the capacity model. Pure. |
| `_google.ts` | Token refresh, free/busy, create, patch, list, delete |
| `install-slot.ts` | The picker, and the add-your-operator form |
| `capacity.ts` | `/capacity` readout, plus the Monday Slack alert |
| `tests/install-rhythm.test.ts` | 18 tests over the date maths and every warning |

No calendar sync job. Capacity reads live, so moving a call is already correct
everywhere. It was specced, then deleted before it was written.

## The operator

Nothing in the funnel captured who runs the client's content, so the picker
asks. They are the attendee on all seven weekly calls.

Leaving it blank is fine, so somebody mid-hire can still book. A malformed email
is rejected, because a typo would send every invitation nowhere. With no operator the founder
holds the invitations, the contact is tagged `install-no-operator`, and Slack
says so. The same link later becomes an add-your-operator form and patches every
call still to come. Dates do not move, only the guest list.

Tags: `install-slot-booked`, then `install-operator-set` or `install-no-operator`.

## Google Meet

Events are created with `conferenceDataVersion=1` and no `conferenceData`, which
is what stops a Meet link being attached. The earlier attempt failed because the
tool in use did not expose conferencing; the API does.

**Verify with one real event.** A Workspace admin setting that force adds
conferencing may still win, and if it does the honest fix is to turn that setting
off rather than fight it in code.

## Environment

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN     <- put on the weekly health check
GOOGLE_CALENDAR_ID       <- optional, defaults to primary
ZOOM_LINK                <- plain link for now
```

## Still to do

1. Google OAuth credential. Blocks everything.
2. The one GHL workflow that sends the link on `install-signed`.
3. Verify no Meet link appears on a real event.
4. Debriefs: Zoom Server to Server OAuth with recording scopes, plus
   `ANTHROPIC_API_KEY`. Template at `docs/call-debrief-template.md`.

## Open

- Darcy is scheduled by hand. Migrate onto this, or leave alone.
- Blackouts. Public holidays and travel are handled implicitly, since a busy
  calendar entry makes an hour unofferable. Nothing explicit.
