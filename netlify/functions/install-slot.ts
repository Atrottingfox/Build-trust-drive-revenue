import type { Handler } from "@netlify/functions";
import { getContact, addTags, contactUrl } from "./_ghl";
import {
  SLOT_HOURS,
  DURATION_MIN,
  TZ,
  callDates,
  firstCallDate,
  slotReleaseDate,
  toUtcIso,
  toLocalIso,
  toDateStr,
  addDays,
} from "./_cadence";
import {
  accessToken,
  freeBusy,
  isFree,
  createEvent,
  listInstallEvents,
  patchEventAttendees,
} from "./_google";

/*
  The client picks their hour, once, and the whole rhythm lands in both
  calendars. It also collects the one fact nothing else in the funnel captures:
  who the media operator is.

  Availability is read from the calendar rather than held in a database. That
  removes the only piece anybody would have had to maintain, and with it the
  failure mode that comes free: a grid claiming an hour is open while the
  calendar says otherwise. An hour is offered only if it is clear on every one
  of the seven dates, so nobody is given a slot that dies in week five.

  It also cannot be handed out twice. The moment the first client books, seven
  events exist on that hour and it stops being offered to anybody else.

  GET renders. POST creates. Mail and chat clients fetch URLs before a human
  sees them, and a GET that created seven calendar events would fire on its own
  in a preview pane, before the client had chosen anything.
*/

const REQUIRED_TAG = "install-signed";
const BOOKED_TAG = "install-slot-booked";
const OPERATOR_TAG = "install-operator-set";
const NO_OPERATOR_TAG = "install-no-operator";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hourLabel = (h: number) => (h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`);

const dayLabel = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });

const page = (body: string) => `<!doctype html>
<html lang="en-AU"><head><meta charset="utf8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your weekly slot</title><style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A0B0D;color:#EAECEF;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}
  .card{max-width:520px;width:100%;background:#121419;border:1px solid #242830;border-radius:16px;padding:32px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 10px}
  p{margin:0 0 20px;color:#A4AAB4;font-size:15px}
  label{display:block;font-size:13px;color:#A4AAB4;margin:0 0 6px}
  input{width:100%;box-sizing:border-box;padding:12px 14px;margin:0 0 16px;border-radius:10px;
        background:#0A0B0D;border:1px solid #2A2F38;color:#EAECEF;font-size:16px;font-family:inherit}
  input:focus{outline:none;border-color:#3B7DFF}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:0 0 16px}
  button{padding:14px;border-radius:10px;border:1px solid #2A2F38;background:#0A0B0D;color:#EAECEF;
         font-size:16px;font-weight:600;cursor:pointer;font-family:inherit}
  button:hover{background:#1A1D23;border-color:#3B7DFF}
  button.wide{width:100%;background:#EAECEF;color:#0A0B0D;border:0}
  button.wide:hover{background:#fff}
  .rule{border:0;border-top:1px solid #242830;margin:24px 0}
  .err{background:#2A1416;border:1px solid #5C2126;border-radius:10px;padding:12px 14px;margin:0 0 20px;font-size:14px}
  ol{margin:0 0 20px;padding-left:20px;color:#A4AAB4;font-size:14px}
  li{margin-bottom:4px}
  .sub{font-size:13px;color:#6E757F;margin:16px 0 0}
</style></head><body><div class="card">${body}</div></body></html>`;

const html = (b: string, code = 200) => ({
  statusCode: code,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  body: page(b),
});

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

async function slack(text: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    /* An alert that fails must not fail the booking. */
  }
}

/* The operator fields, shared by the booking form and the add-later form. */
const operatorFields = (err?: string) => `
  ${err ? `<div class="err">${esc(err)}</div>` : ""}
  <label>Your media operator, their name</label>
  <input type="text" name="operatorName" placeholder="Who runs your content" autocomplete="off">
  <label>Their email</label>
  <input type="email" name="operatorEmail" placeholder="name@company.com" autocomplete="off">
  <p class="sub">They are on every weekly call, so the invitations go to them. Leave both blank if you have not hired yet and we will sort it later.</p>`;

const handler: Handler = async (event) => {
  const ghlToken = process.env.GHL_TOKEN;
  if (!ghlToken) return html("<h1>Not set up</h1><p>This link needs configuring.</p>");

  const contactId = (event.queryStringParameters || {}).c || "";
  if (!contactId) return html("<h1>Link not valid</h1><p>Ask Sean to resend it.</p>", 400);

  const contact = await getContact(ghlToken, contactId);
  if (!contact) return html("<h1>Link not valid</h1><p>Ask Sean to resend it.</p>", 400);

  const tags: string[] = contact.tags || [];
  const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "there";
  const email = contact.email || "";

  /*
    The slot belongs to the install, so it is gated on the signature rather than
    on holding the link. Somebody who guesses a contact id still cannot take an
    hour off the grid.
  */
  if (!tags.includes(REQUIRED_TAG)) {
    return html(
      "<h1>Not ready yet</h1><p>Your slot opens once the agreement is signed. If you have signed and are seeing this, tell Sean.</p>",
      403
    );
  }

  if (!email) {
    return html("<h1>No email on file</h1><p>You cannot be invited without one. Tell Sean.</p>", 400);
  }

  const params = new URLSearchParams(event.httpMethod === "POST" ? event.body || "" : "");
  const operatorName = (params.get("operatorName") || "").trim();
  const operatorEmail = (params.get("operatorEmail") || "").trim().toLowerCase();

  let token: string;
  try {
    token = await accessToken();
  } catch (err) {
    console.error("install-slot: google auth failed:", err);
    await slack(`:warning: Slot picker cannot reach Google Calendar (${String(err)}). ${name} is stuck.`);
    return html("<h1>Something is not connected</h1><p>Sean has been told. Try again shortly.</p>");
  }

  /* ------------------------------------------------ already booked */

  /*
    A client who booked before hiring an operator comes back to the same link.
    Adding the operator later patches the guest list on the calls that have not
    happened yet, and leaves the dates alone: they have already worked around
    them.
  */
  if (tags.includes(BOOKED_TAG)) {
    if (tags.includes(OPERATOR_TAG)) {
      return html(
        `<h1>Already booked, ${esc(name)}</h1>
         <p>Your calls are in your calendar. To move one, move it there and it stays in sync. To change your weekly hour entirely, message Sean.</p>`
      );
    }

    if (event.httpMethod !== "POST") {
      return html(
        `<h1>Who is your operator, ${esc(name)}?</h1>
         <p>Your calls are booked. The one thing missing is who runs your content, because they are the one on every weekly call.</p>
         <form method="POST">
           ${operatorFields()}
           <button class="wide" type="submit">Add them</button>
         </form>`
      );
    }

    if (!EMAIL.test(operatorEmail)) {
      return html(
        `<h1>Who is your operator, ${esc(name)}?</h1>
         <form method="POST">
           ${operatorFields("That email does not look right. Check it and try again.")}
           <button class="wide" type="submit">Add them</button>
         </form>`,
        400
      );
    }

    const today = toDateStr(new Date());
    let patched = 0;
    try {
      const mine = (
        await listInstallEvents(token, toUtcIso(today, 0), toUtcIso(addDays(today, 182), 0))
      ).filter((e) => e.client === contactId);

      for (const ev of mine) {
        await patchEventAttendees(token, ev.id, [operatorEmail], {
          operatorEmail,
          operatorName,
        });
        patched += 1;
      }
    } catch (err) {
      console.error("install-slot: operator patch failed:", err);
      await slack(
        `:warning: Could not put ${esc(operatorName || operatorEmail)} on ${esc(name)}'s calls. ${patched} updated before it failed. <${contactUrl(contactId)}|Open in GHL>`
      );
      return html("<h1>Something went wrong</h1><p>Sean has been told and will sort it today.</p>");
    }

    await addTags(ghlToken, contactId, [OPERATOR_TAG]);
    await slack(
      `:bust_in_silhouette: *${esc(name)}* added their operator: ${esc(operatorName || "unnamed")}, ${esc(operatorEmail)}. On ${patched} upcoming calls. <${contactUrl(contactId)}|Open in GHL>`
    );

    return html(
      `<h1>Done</h1>
       <p>${esc(operatorName || operatorEmail)} is now on your ${patched} remaining ${patched === 1 ? "call" : "calls"} and has the invitations.</p>`
    );
  }

  /* ------------------------------------------------------ booking */

  const start = firstCallDate(new Date());
  const dates = callDates(start);
  const last = dates[dates.length - 1].date;

  let busy;
  try {
    busy = await freeBusy(token, toUtcIso(start, 0), toUtcIso(addDays(last, 1), 0));
  } catch (err) {
    console.error("install-slot: freebusy failed:", err);
    return html("<h1>Something went wrong</h1><p>Sean has been told. Try again shortly.</p>");
  }

  /* An hour is only offered if it is clear on every one of the seven dates. */
  const available = SLOT_HOURS.filter((h) =>
    dates.every((d) => isFree(busy, toUtcIso(d.date, h), toUtcIso(d.date, h, DURATION_MIN)))
  );

  const picker = (err?: string) => `
    <h1>Pick your weekly hour, ${esc(name)}</h1>
    <p>One choice. This hour is then yours for the whole install, and all seven calls go straight into the calendar.</p>
    <p>Starting <strong>${dayLabel(start)}</strong>, Brisbane time.</p>
    <form method="POST">
      ${operatorFields(err)}
      <hr class="rule">
      <div class="grid">
        ${available.map((h) => `<button type="submit" name="hour" value="${h}">${hourLabel(h)}</button>`).join("")}
      </div>
    </form>
    <p class="sub">Weeks 1, 2, 3, 4, 5, 7 and 10. Sixty minutes each.</p>`;

  if (event.httpMethod !== "POST") {
    if (!available.length) {
      await slack(
        `:red_circle: *No Wednesday hours left.* ${esc(name)} opened their slot link and had nothing to pick. <${contactUrl(contactId)}|Open in GHL>`
      );
      return html(
        `<h1>Nothing free right now</h1>
         <p>Every hour is taken for this run. Sean has been told and will come back to you today.</p>`
      );
    }
    return html(picker());
  }

  const chosen = Number(params.get("hour"));
  if (!SLOT_HOURS.includes(chosen)) {
    return html("<h1>Pick an hour</h1><p>Go back and choose one.</p>", 400);
  }

  /* Blank is allowed, wrong is not. Somebody mid-hire should not be blocked,
     but a typo that silently sends every invitation nowhere should be. */
  if (operatorEmail && !EMAIL.test(operatorEmail)) {
    return html(picker("That email does not look right. Check it and pick your hour again."), 400);
  }

  /*
    Re-check rather than trust the page. Between the picker rendering and this
    submission somebody else may have taken the hour, and two clients on one
    slot is the single thing this whole design exists to prevent.
  */
  if (!available.includes(chosen)) {
    return html(
      `<h1>That hour just went</h1><p>Somebody took it while this page was open. Go back and pick another.</p>`,
      409
    );
  }

  /* The operator is the one on the weekly calls. Until there is one, the
     founder holds the invitations so the series is not sitting empty. */
  const attendee = operatorEmail || email;

  const zoom = process.env.ZOOM_LINK || "";
  const body =
    "Sixty minutes on the 90 Day Install." +
    (operatorEmail ? "" : " Invitation currently goes to the founder, and moves to the operator once there is one.") +
    (zoom ? `\n\nZoom: ${zoom}` : "");

  const releases = slotReleaseDate(start);
  const created: string[] = [];

  try {
    for (const d of dates) {
      const id = await createEvent(token, {
        summary: `${d.title}, ${name}`,
        description: body,
        startLocal: toLocalIso(d.date, chosen),
        endLocal: toLocalIso(d.date, chosen, DURATION_MIN),
        timeZone: TZ,
        attendees: [attendee],
        privateProps: {
          client: contactId,
          clientName: name,
          week: String(d.week),
          releases,
          hour: String(chosen),
          founderEmail: email,
          operatorEmail: operatorEmail || "",
          operatorName: operatorName || "",
        },
      });
      created.push(id);
    }
  } catch (err) {
    /*
      A half built series is worse than none: the client sees three calls, Sean
      sees three calls, and neither knows four are missing. So it is named
      loudly rather than discovered in week four.
    */
    console.error("install-slot: create failed after", created.length, "events:", err);
    await slack(
      `:red_circle: *Slot booking failed part way.* ${esc(name)} has ${created.length} of ${dates.length} calls on Wednesday ${hourLabel(chosen)}. Needs fixing by hand. <${contactUrl(contactId)}|Open in GHL>`
    );
    return html("<h1>Something went wrong</h1><p>Your booking did not complete. Sean has been told and will sort it today.</p>");
  }

  await addTags(
    ghlToken,
    contactId,
    operatorEmail ? [BOOKED_TAG, OPERATOR_TAG] : [BOOKED_TAG, NO_OPERATOR_TAG]
  );

  await slack(
    `:white_check_mark: *${esc(name)}* took Wednesday ${hourLabel(chosen)}. Seven calls from ${dayLabel(start)}, hour frees ${releases}.\n` +
      (operatorEmail
        ? `Operator: ${esc(operatorName || "unnamed")}, ${esc(operatorEmail)}.`
        : ":warning: No operator yet, invitations are going to the founder.") +
      ` <${contactUrl(contactId)}|Open in GHL>`
  );

  return html(
    `<h1>Done, ${esc(name)}</h1>
     <p>Wednesday ${hourLabel(chosen)}, Brisbane time. Seven invitations are on their way to ${esc(attendee)}.</p>
     <ol>${dates.map((d) => `<li>${dayLabel(d.date)}</li>`).join("")}</ol>
     ${
       operatorEmail
         ? ""
         : '<p class="sub">No operator yet. Come back to this same link once you have hired and they will be added to every call still to come.</p>'
     }
     <p class="sub">Need to move one? Move it in the calendar and it stays in sync.</p>`
  );
};

export { handler };
