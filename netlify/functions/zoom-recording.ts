import type { Handler } from "@netlify/functions";
import { createHmac, timingSafeEqual } from "node:crypto";
import { writeDebrief, vttToTranscript, type CallContext } from "./_debrief";
import { createDebriefPage } from "./_notion";
import { accessToken, listInstallEvents } from "./_google";
import { toUtcIso, toDateStr, addDays } from "./_cadence";

/*
  A call finishes, Zoom transcribes it, and the debrief writes itself.

  The interesting part is working out whose call it was. Zoom knows a meeting
  happened and roughly what it was called; it does not know it was week five of
  an install, or that the operator is Jacob. The calendar knows all of that, and
  the two share a start time, so the recording is matched to the event it
  overlaps rather than to anything Zoom was told.

  That also means no per client Zoom meetings are needed, which removes the
  whole reason the Zoom API was on the critical path.
*/

const MATCH_WINDOW_MIN = 90;

const ok = (body: unknown = { ok: true }) => ({
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

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
    /* An alert that fails must not fail the run. */
  }
}

/*
  Zoom signs every delivery. Without checking it, this endpoint would write a
  Notion page and spend Claude tokens for anybody who can find the URL.
*/
function signatureValid(event: any, secret: string): boolean {
  const sig = event.headers["x-zm-signature"];
  const ts = event.headers["x-zm-request-timestamp"];
  if (!sig || !ts) return false;

  /* Replays of an old, valid delivery are still valid signatures. */
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;

  const expected =
    "v0=" + createHmac("sha256", secret).update(`v0:${ts}:${event.body}`).digest("hex");

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const handler: Handler = async (event) => {
  const secret = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
  if (!secret) {
    console.error("zoom-recording: ZOOM_WEBHOOK_SECRET_TOKEN not set.");
    return ok({ ok: false });
  }

  let payload: any;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "bad json" };
  }

  /*
    Zoom proves it owns the endpoint by sending a token to hash back. This
    arrives before any signature is ever sent, so it has to be answered before
    the signature check.
  */
  if (payload.event === "endpoint.url_validation") {
    const plainToken = payload.payload?.plainToken ?? "";
    return ok({
      plainToken,
      encryptedToken: createHmac("sha256", secret).update(plainToken).digest("hex"),
    });
  }

  if (!signatureValid(event, secret)) {
    console.error("zoom-recording: bad signature");
    return { statusCode: 401, body: "no" };
  }

  if (payload.event !== "recording.transcript_completed") return ok({ ignored: payload.event });

  const object = payload.payload?.object ?? {};
  const downloadToken = payload.download_token;

  const vttFile = (object.recording_files ?? []).find(
    (f: any) => f.file_type === "TRANSCRIPT" || f.file_extension === "VTT"
  );

  if (!vttFile?.download_url || !downloadToken) {
    console.error("zoom-recording: no transcript in payload for", object.topic);
    return ok({ ok: false, reason: "no-transcript" });
  }

  /* Zoom's start_time is UTC. */
  const startedAt = new Date(object.start_time);

  try {
    const token = await accessToken();
    const day = toDateStr(startedAt);
    const events = await listInstallEvents(
      token,
      toUtcIso(addDays(day, -1), 0),
      toUtcIso(addDays(day, 2), 0)
    );

    /*
      The event this recording overlaps. Brisbane has no daylight saving, so the
      local wall clock on the event converts to an instant without ambiguity.
    */
    const match = events
      .map((e) => ({
        e,
        gap: Math.abs(Date.parse(e.startLocal) - startedAt.getTime()),
      }))
      .filter((x) => x.gap <= MATCH_WINDOW_MIN * 60_000)
      .sort((a, b) => a.gap - b.gap)[0]?.e;

    if (!match) {
      console.log("zoom-recording: no install call near", object.start_time, object.topic);
      return ok({ ok: true, matched: false });
    }

    const res = await fetch(`${vttFile.download_url}?access_token=${downloadToken}`);
    if (!res.ok) throw new Error(`zoom-download-${res.status}`);
    const transcript = vttToTranscript(await res.text());

    if (transcript.length < 400) {
      /* A call that barely happened produces a debrief that says nothing, which
         is worse than no debrief, because it looks like a record. */
      await slack(
        `:page_facing_up: Skipped the debrief for ${match.clientName}, the transcript is only ${transcript.length} characters.`
      );
      return ok({ ok: true, skipped: "too-short" });
    }

    const ctx: CallContext = {
      operator: match.operatorName || match.operatorEmail || "the operator",
      client: match.clientName,
      week: match.board ? "board call" : match.week,
      date: match.startLocal.slice(0, 10),
      kind: match.board ? "board" : "weekly",
    };

    const markdown = await writeDebrief(transcript, ctx);

    const title = match.board
      ? `Content Board Call - ${ctx.date}`
      : `${ctx.operator} - call ${ctx.week} with Sean`;

    const parent = process.env.NOTION_DEBRIEF_PARENT;
    if (!parent) {
      console.error("zoom-recording: NOTION_DEBRIEF_PARENT not set, debrief not filed");
      await slack(`:warning: Wrote the debrief for ${ctx.client} but NOTION_DEBRIEF_PARENT is not set, so it has nowhere to go.`);
      return ok({ ok: false, reason: "no-parent" });
    }

    const url = await createDebriefPage(parent, title, markdown);
    await slack(`:memo: Debrief ready: <${url}|${title}>`);

    console.log("zoom-recording: filed", title);
    return ok({ ok: true, url });
  } catch (err) {
    console.error("zoom-recording:", err);
    await slack(`:warning: The debrief for "${object.topic}" failed: ${String(err)}`);
    /* 200 on purpose. Zoom retries on a non-200 and a retry will fail the same
       way, three more times, each one spending tokens. */
    return ok({ ok: false });
  }
};

export { handler };
