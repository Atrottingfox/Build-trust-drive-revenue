import type { Handler } from "@netlify/functions";
import { currentCall, getMember, memberId, sydneyNow, talentSlack, updateMember } from "./_talent";

/*
  /zoom. Forwards to the Zoom room, and on the way notes who clicked Join.

  To change the room, change ZOOM_URL. public/_redirects points /zoom here.

  A member's personal link (/calls?m=<row id>) sends Join to /zoom/<row id>,
  which public/_redirects hands to this function.
  During a call that click bumps "Calls joined" and sets "Last joined" on their
  row in Applications, once per day, and pings #talent so Sean sees turnout as
  the call starts. Outside a call, or with no member id, it just forwards.

  Tracking must never stand between a member and the call: every lookup is
  capped and a failure still redirects.
*/

const ZOOM_URL = "https://us06web.zoom.us/j/4255667465";

const within = <T>(ms: number, work: Promise<T>) =>
  Promise.race([work, new Promise<null>((r) => setTimeout(() => r(null), ms))]);

export const handler: Handler = async (event) => {
  /* The member id is the last path segment of /zoom/<id>. Netlify hands the
     function the original URL; a query built in the redirect rule never
     arrives, which is why it is read from the path. */
  const fromPath = `${event.rawUrl || ""} ${event.path || ""}`.match(/\/zoom\/([0-9a-fA-F-]{32,36})/)?.[1];
  const id = memberId(fromPath || event.queryStringParameters?.m);
  /* X-Member says whether a member link was recognised, so the path wiring
     can be checked outside call times. It carries no identity. */
  const redirect = {
    statusCode: 302,
    headers: { Location: ZOOM_URL, "Cache-Control": "no-store", "X-Member": id ? "yes" : "no" },
    body: "",
  };

  const call = currentCall();
  if (!call) return redirect;

  try {
    await within(
      3000,
      (async () => {
        if (!id) {
          await talentSlack(event, `:wave: Someone without a member link joined *${call}*`);
          return;
        }
        const m = await getMember(id);
        if (!m) return;
        const today = sydneyNow().ymd;
        if (m.lastJoined !== today) {
          await updateMember(id, {
            "Calls joined": { number: m.callsJoined + 1 },
            "Last joined": { date: { start: today } },
          });
        }
        await talentSlack(event, `:wave: *${m.name}* joined *${call}* <${m.url}|Open in Notion>`);
      })()
    );
  } catch (err) {
    console.error("Join tracking failed:", err);
  }

  return redirect;
};
