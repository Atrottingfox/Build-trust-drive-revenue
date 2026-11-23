import crypto from "node:crypto";

/*
  Email tracking (Sean, 24 Nov 2026: "do we know if he opened the email or
  clicked the links - i need full tracking and visibility across all data").

  Every email sent through sendEmail (_ghl.ts) goes through trackEmail first,
  so every current and future code email is tracked by default:

    - each <a href="https://..."> becomes https://contentengine.live/r/<token>,
      which logs 'email_click' on the buyer's timeline and 302s to the real
      link. The label is the link's own text.
    - a 1x1 pixel, https://contentengine.live/o/<token>.gif, logs
      'email_open'. Opens are APPROXIMATE: Apple Mail Privacy Protection and
      some corporate scanners fetch every image the moment mail arrives, and
      clients that block images never fetch it. Shown as "opened (approx)".

  The token is signed with CALL_CONTEXT_SECRET (already on both sites; this
  site is at Netlify's 4KB env limit, so no new variable). contentengine's
  email-track.mjs verifies the same signature and 404s anything forged, so the
  redirect cannot be used to send people to an arbitrary site.

  The token format MUST match contentengine-v3/netlify/functions/_track.mjs:
    base64url(JSON payload) + "." + first 22 chars of base64url(HMAC-SHA256(
    secret, "ce-track:" + base64url payload)).

  The email looks exactly the same: only href values change, and the pixel is
  an invisible 1x1 image at the very end.
*/

export const TRACK_BASE = "https://contentengine.live";

export type TrackPayload = {
  /** client id on contentengine, when known */
  c?: string;
  /** who the event belongs to: the buyer's email */
  e?: string;
  /** this one email (random per send) */
  m: string;
  /** subject */
  s: string;
  /** sent at, epoch seconds */
  t: number;
  /** link label (clicks only) */
  l?: string;
  /** target url (clicks only) */
  u?: string;
};

const b64u = (s: string) => Buffer.from(s, "utf8").toString("base64url");

export function signToken(p: TrackPayload, secret: string): string {
  const body = b64u(JSON.stringify(p));
  const sig = crypto.createHmac("sha256", secret).update(`ce-track:${body}`).digest("base64url").slice(0, 22);
  return `${body}.${sig}`;
}

export const newMailId = () => crypto.randomBytes(8).toString("base64url");

const decodeEntities = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#38;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const labelOf = (inner: string, url: string) => {
  const text = decodeEntities(inner.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 80);
  try {
    return new URL(url).hostname;
  } catch {
    return "link";
  }
};

/*
  Wraps every https link and appends the open pixel. Leaves mailto:, tel:,
  http: and anything already tracked alone. Returns the html unchanged if there
  is no secret, so an email is never blocked by tracking.
*/
export function trackEmail(
  html: string,
  ctx: { email?: string; clientId?: string; subject: string; mailId: string; sentAt?: number },
  secret = process.env.CALL_CONTEXT_SECRET || ""
): string {
  if (!secret || !html) return html;
  const base: TrackPayload = {
    ...(ctx.clientId ? { c: ctx.clientId } : {}),
    ...(ctx.email ? { e: ctx.email.trim().toLowerCase() } : {}),
    m: ctx.mailId,
    s: ctx.subject.slice(0, 120),
    t: ctx.sentAt ?? Math.floor(Date.now() / 1000),
  };
  if (!base.c && !base.e) return html;

  const wrapped = html.replace(
    /<a(\s[^>]*?)href\s*=\s*(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
    (whole, pre: string, q: string, href: string, post: string, inner: string) => {
      const url = decodeEntities(href.trim());
      if (!/^https:\/\//i.test(url) || url.startsWith(`${TRACK_BASE}/r/`)) return whole;
      const token = signToken({ ...base, l: labelOf(inner, url), u: url }, secret);
      return `<a${pre}href=${q}${TRACK_BASE}/r/${token}${q}${post}>${inner}</a>`;
    }
  );

  const pixel = `<img src="${TRACK_BASE}/o/${signToken(base, secret)}.gif" width="1" height="1" alt="" style="display:block;border:0;width:1px;height:1px;overflow:hidden" />`;
  return /<\/body>/i.test(wrapped) ? wrapped.replace(/<\/body>/i, `${pixel}</body>`) : `${wrapped}${pixel}`;
}
