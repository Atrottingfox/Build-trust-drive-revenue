import type { Handler } from "@netlify/functions";
import { getContact, addTags, contactUrl, findOrCreateByEmail, sendEmail } from "./_ghl";
import {
  SLOT_HOURS,
  BOARD_HOURS,
  BOARD_TITLE,
  DURATION_MIN,
  TZ,
  callDates,
  boardCallDates,
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
const OPERATOR_CONTACT_TAG = "media-operator";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
  Whether anybody can actually receive mail at that domain.

  A well formed address at a domain that does not exist passes every check a
  regex can make, and then ten invitations bounce. Neither the client nor Sean
  notices until week one, when the operator is not on the call because they were
  never told about it. gmial.com is a real typo people really make.

  A lookup failure is treated as fine. Refusing a booking because DNS was slow
  is a worse outcome than accepting an address that might be wrong.
*/
async function domainAcceptsMail(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return true;
    const json = await res.json();
    if (Array.isArray(json?.Answer) && json.Answer.length) return true;
    /* No MX is not proof: some domains take mail on the A record. NXDOMAIN is
       proof, and that is status 3. */
    return json?.Status !== 3;
  } catch {
    return true;
  }
}

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
  input,select{width:100%;box-sizing:border-box;padding:12px 14px;margin:0 0 16px;border-radius:10px;
        background:#0A0B0D;border:1px solid #2A2F38;color:#EAECEF;font-size:16px;font-family:inherit}
  input:focus,select:focus{outline:none;border-color:#3B7DFF}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(84px,1fr));gap:8px;margin:0 0 8px}
  button{padding:14px 10px;border-radius:10px;border:1px solid #2A2F38;background:#0A0B0D;color:#EAECEF;
         font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:border-color .12s,background .12s}
  button:hover{background:#1A1D23;border-color:#3B7DFF}
  button:focus-visible{outline:2px solid #3B7DFF;outline-offset:2px}
  button[aria-pressed="true"]{background:#3B7DFF;border-color:#3B7DFF;color:#fff}
  button[aria-pressed="true"]:hover{background:#3B7DFF}
  button.wide{width:100%;background:#EAECEF;color:#0A0B0D;border:0;margin-top:8px}
  button.wide:hover{background:#fff}
  button.wide:disabled{background:#1A1D23;color:#6E757F;cursor:not-allowed}
  button:disabled{opacity:.32;cursor:not-allowed;text-decoration:line-through}
  button:disabled:hover{background:#0A0B0D;border-color:#2A2F38}
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

  /*
    A test run must be able to exercise the whole path without emailing a real
    person. Gated on the shared secret, so a client cannot silently book calls
    that nobody is told about.
  */
  const silent =
    event.headers["x-install-test"] === process.env.CALL_CONTEXT_SECRET &&
    Boolean(process.env.CALL_CONTEXT_SECRET);

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

    const [first, ...rest] = (operatorName || "").trim().split(/\s+/);
    const laterContactId =
      (await findOrCreateByEmail(ghlToken, process.env.GHL_LOCATION_ID || "", operatorEmail, {
        firstName: first || undefined,
        lastName: rest.join(" ") || undefined,
        tags: [OPERATOR_CONTACT_TAG],
      })) || "";

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
          operatorContact: laterContactId,
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
  const releases = slotReleaseDate(start);

  /* Look far enough ahead to cover the last board call in any week of the
     month, whichever they end up choosing. */
  const horizon = addDays(start, 130);

  let busy;
  try {
    busy = await freeBusy(token, toUtcIso(start, 0), toUtcIso(horizon, 0));
  } catch (err) {
    console.error("install-slot: freebusy failed:", err);
    return html("<h1>Something went wrong</h1><p>Sean has been told. Try again shortly.</p>");
  }

  const clearOn = (days: string[], h: number) =>
    days.every((d) => isFree(busy, toUtcIso(d, h), toUtcIso(d, h, DURATION_MIN)));

  /* An hour is only offered if it is clear on every date it would be used. */
  const available = SLOT_HOURS.filter((h) => clearOn(dates.map((d) => d.date), h));

  /* Board calls are every four weeks from the first one, so the dates are
     fixed the moment the Wednesday is known. Only the hour is a choice. */
  const boards = boardCallDates(start);
  const boardHours = BOARD_HOURS.filter((h) => clearOn(boards, h));

  const picker = (err?: string) => `
    <h1>Set your rhythm, ${esc(name)}</h1>
    <p>Two choices and you are done. Both hours are then yours for the whole install, and every call goes straight into the calendar.</p>
    <form method="POST">
      ${operatorFields(err)}
      <hr class="rule">
      <label>Your weekly call, every Wednesday from ${dayLabel(start)}</label>
      <div class="grid" id="wed">
        ${available.map((h) => `<button type="button" data-hour="${h}" aria-pressed="false">${hourLabel(h)}</button>`).join("")}
      </div>
      <hr class="rule">
      <label>Your board call, every four weeks on a Friday</label>
      <div class="grid" id="fri">
        ${boardHours.map((h) => `<button type="button" data-hour="${h}" aria-pressed="false">${hourLabel(h)}</button>`).join("")}
      </div>
      <p class="sub">First one ${dayLabel(boards[0])}, then every four weeks, for as long as we work together.</p>

      <input type="hidden" name="hour" id="hourField">
      <input type="hidden" name="boardHour" id="boardField">
      <button class="wide" type="submit" id="go" disabled>Pick your weekly hour</button>
    </form>
    <p class="sub">Weeks 1, 2, 3, 4, 5, 7 and 10, plus your board call. Sixty minutes each.</p>
    <script>
      /* Choosing the Wednesday also chooses the same hour on Friday, when that
         hour is free. Most people never touch the second row, and the ones who
         care can still change it. */
      var go = document.getElementById("go");
      var fields = { wed: document.getElementById("hourField"), fri: document.getElementById("boardField") };

      function pick(group, hour) {
        var row = document.getElementById(group);
        Array.prototype.forEach.call(row.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", b.dataset.hour === String(hour) ? "true" : "false");
        });
        fields[group].value = hour;
      }

      function ready() {
        var both = fields.wed.value && fields.fri.value;
        go.disabled = !both;
        go.textContent = both
          ? "Lock in Wednesdays at " + label(fields.wed.value) + ", board call " + label(fields.fri.value)
          : fields.wed.value ? "Now pick your board call time" : "Pick your weekly hour";
      }

      function label(h) { h = Number(h); return h === 12 ? "12pm" : h < 12 ? h + "am" : (h - 12) + "pm"; }

      /*
        Somebody else booking while this page is open used to show up only as a
        rejection at the last click. Now the row updates instead, and a taken
        hour cannot be chosen at all.
      */
      function refresh() {
        fetch(location.pathname + location.search + "&availability=1", { cache: "no-store" })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (free) {
            if (!free) return;
            [["wed", free.weekly], ["fri", free.board]].forEach(function (pair) {
              var row = document.getElementById(pair[0]);
              if (!row) return;
              Array.prototype.forEach.call(row.querySelectorAll("button"), function (b) {
                var gone = pair[1].indexOf(Number(b.dataset.hour)) === -1;
                b.disabled = gone;
                b.title = gone ? "Just taken" : "";
                if (gone && b.getAttribute("aria-pressed") === "true") {
                  b.setAttribute("aria-pressed", "false");
                  fields[pair[0]].value = "";
                }
              });
            });
            ready();
          })
          .catch(function () { /* Offline for a moment is not worth saying. */ });
      }
      setInterval(refresh, 45000);

      ["wed", "fri"].forEach(function (group) {
        var row = document.getElementById(group);
        if (!row) return;
        row.addEventListener("click", function (e) {
          var b = e.target.closest("button");
          if (!b) return;
          pick(group, b.dataset.hour);
          /* Mirror onto Friday, but never overrule a choice already made. */
          if (group === "wed" && !fields.fri.dataset.touched) {
            var match = document.querySelector('#fri button[data-hour="' + b.dataset.hour + '"]');
            if (match) pick("fri", b.dataset.hour);
          }
          if (group === "fri") fields.fri.dataset.touched = "1";
          ready();
        });
      });
    <\/script>`;

  /* A page left open goes stale. This is what it polls. */
  if ((event.queryStringParameters || {}).availability === "1") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ weekly: available, board: boardHours }),
    };
  }

  if (event.httpMethod !== "POST") {
    if (!available.length || !boardHours.length) {
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

  /*
    Two different failures, and telling them apart matters. Nothing chosen is
    the client's to fix. An hour that has gone since the page loaded is not, and
    being told to "pick your board time as well" when they already did reads as
    the page being broken.
  */
  const boardHour = Number(params.get("boardHour"));
  if (!boardHours.includes(boardHour)) {
    return html(
      picker(
        params.get("boardHour")
          ? "That board call time went while this page was open. These are free now."
          : "Pick your board call time as well."
      ),
      400
    );
  }

  /* Blank is allowed, wrong is not. Somebody mid-hire should not be blocked,
     but a typo that silently sends every invitation nowhere should be. */
  if (operatorEmail && !EMAIL.test(operatorEmail)) {
    return html(picker("That email does not look right. Check it and pick your hour again."), 400);
  }

  if (operatorEmail && !(await domainAcceptsMail(operatorEmail))) {
    return html(
      picker(`Nothing can receive mail at ${esc(operatorEmail.split("@")[1])}. Check the spelling.`),
      400
    );
  }

  /*
    Re-check rather than trust the page. Between the picker rendering and this
    submission somebody else may have taken the hour, and two clients on one
    slot is the single thing this whole design exists to prevent.
  */
  /*
    Recomputed above from the calendar, so this is the live answer and not the
    one the page was rendered with. Re-render rather than dead ending: "go back
    and pick another" makes somebody use the back button onto a stale page and
    hit the same wall a second time.
  */
  if (!available.includes(chosen)) {
    return html(picker("That hour went while this page was open. These are free now."), 409);
  }

  /* The operator is the one on the weekly calls. Until there is one, the
     founder holds the invitations so the series is not sitting empty. */
  const attendee = operatorEmail || email;

  /*
    Give the operator a contact of their own. They do the weekly work and fill
    in the prep doc, but they sign nothing, so without this every reminder about
    their work goes to the founder to forward on.

    Best effort. A booking must not fail because a CRM write did.
  */
  let operatorContactId = "";
  if (operatorEmail) {
    const [first, ...rest] = (operatorName || "").trim().split(/\s+/);
    operatorContactId =
      (await findOrCreateByEmail(ghlToken, process.env.GHL_LOCATION_ID || "", operatorEmail, {
        firstName: first || undefined,
        lastName: rest.join(" ") || undefined,
        tags: [OPERATOR_CONTACT_TAG],
      })) || "";
  }

  const zoom = process.env.ZOOM_LINK || "";
  const body =
    "Sixty minutes on the 90 Day Install." +
    (operatorEmail ? "" : " Invitation currently goes to the founder, and moves to the operator once there is one.") +
    (zoom ? `\n\nZoom: ${zoom}` : "");

  const shared = {
    client: contactId,
    clientName: name,
    releases,
    hour: String(chosen),
    boardHour: String(boardHour),
    founderEmail: email,
    operatorEmail: operatorEmail || "",
    operatorName: operatorName || "",
    operatorContact: operatorContactId,
  };

  const total = dates.length + boards.length;
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
        /* Never true. Ten events with sendUpdates=all is ten invitation
           emails landing at once, which is what a client's first impression
           of the engagement used to be. The attendee is still on the event,
           so it appears in their calendar; the one confirmation email below
           is what tells them. */
        notify: false,
        privateProps: { ...shared, week: String(d.week) },
      });
      created.push(id);
    }

    /* The board call is the one the founder sits in on, so they are invited
       alongside the operator rather than instead of them. */
    for (const d of boards) {
      const id = await createEvent(token, {
        summary: `${BOARD_TITLE}, ${name}`,
        description:
          "The Content Board. What has actually been published, what performed, and what the next cycle points at. " +
          "Your operator presents the numbers and the thesis." +
          (zoom ? `\n\nZoom: ${zoom}` : ""),
        startLocal: toLocalIso(d, boardHour),
        endLocal: toLocalIso(d, boardHour, DURATION_MIN),
        timeZone: TZ,
        attendees: [...new Set([email, attendee])],
        notify: false,
        privateProps: { ...shared, board: "1" },
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
      `:red_circle: *Slot booking failed part way.* ${esc(name)} has ${created.length} of ${total} calls created. Needs fixing by hand. <${contactUrl(contactId)}|Open in GHL>`
    );
    return html("<h1>Something went wrong</h1><p>Your booking did not complete. Sean has been told and will sort it today.</p>");
  }

  await addTags(
    ghlToken,
    contactId,
    operatorEmail ? [BOOKED_TAG, OPERATOR_TAG] : [BOOKED_TAG, NO_OPERATOR_TAG]
  );

  /*
    One email, not ten.

    Google sends an invitation per event, so creating the series with
    notifications on meant the operator's inbox took ten or twelve at once the
    moment somebody picked an hour. That is the first thing a new client's
    operator ever sees from us.

    The events still carry them as an attendee, so the calls appear in their
    calendar exactly as before. This is the single message that tells them what
    just landed, with every date and the join link in one place. Sent to the
    operator when there is one, since they are the one on every weekly call.
  */
  if (!silent) {
    const list = dates
      .map((d) => `<li>${dayLabel(d.date)}</li>`)
      .concat(boards.map((d) => `<li>${dayLabel(d)}, Content Board</li>`))
      .join("");

    const target = operatorEmail ? operatorContactId : contactId;
    if (target) {
      const { sent, reason } = await sendEmail(
        ghlToken,
        target,
        `Your ${total} calls are booked`,
        [
          `<p>${esc(operatorName || name)},</p>`,
          `<p>The calls are in your calendar. Wednesdays at ${hourLabel(chosen)}, and the Content Board every four weeks on Friday at ${hourLabel(boardHour)}, Brisbane time.</p>`,
          `<ol>${list}</ol>`,
          zoom ? `<p>Same link every time: <a href="${zoom}">${zoom}</a></p>` : "",
          `<p>Need to move one? Move it in the calendar and it stays in sync.</p>`,
          `<p>Sean</p>`,
        ].join("")
      );

      if (!sent) {
        await slack(
          `:warning: *${esc(name)} booked ${total} calls and nobody got the confirmation email.* ` +
            `Reason: ${reason}. The calls are in the calendar, but ${esc(attendee)} has not been told. ` +
            `<${contactUrl(contactId)}|Open in GHL>`
        );
      }
    }
  }

  if (!zoom) {
    await slack(
      `:rotating_light: *${esc(name)} just booked ${total} calls with no Zoom link.* ` +
        "ZOOM_LINK is not set, so every one of those events has no way to join. " +
        "Set it and add the link to the events by hand, or they will find out at week one."
    );
  }

  await slack(
    `:white_check_mark: *${esc(name)}* took Wednesday ${hourLabel(chosen)} and board calls Friday ${hourLabel(boardHour)}. ` +
      `${total} calls from ${dayLabel(start)}, hours free again ${releases}.\n` +
      (operatorEmail
        ? `Operator: ${esc(operatorName || "unnamed")}, ${esc(operatorEmail)}.`
        : ":warning: No operator yet, invitations are going to the founder.") +
      ` <${contactUrl(contactId)}|Open in GHL>`
  );

  return html(
    `<h1>Done, ${esc(name)}</h1>
     <p>Wednesdays at ${hourLabel(chosen)} and your board call every four weeks on Friday at ${hourLabel(boardHour)}, Brisbane time.
        All ${total} are in ${esc(attendee)}'s calendar, and one confirmation email is on its way.</p>
     <ol>${dates
       .map((d) => `<li>${dayLabel(d.date)}</li>`)
       .concat(boards.map((d) => `<li>${dayLabel(d)}, Content Board</li>`))
       .join("")}</ol>
     ${
       operatorEmail
         ? ""
         : '<p class="sub">No operator yet. Come back to this same link once you have hired and they will be added to every call still to come.</p>'
     }
     <p class="sub">Need to move one? Move it in the calendar and it stays in sync.</p>`
  );
};

export { handler };
