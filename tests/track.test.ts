import crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import { signToken, trackEmail } from "../netlify/functions/_track";

const SECRET = "test-secret";
const read = (token: string) => {
  const [body, sig] = token.split(".");
  const want = crypto.createHmac("sha256", SECRET).update(`ce-track:${body}`).digest("base64url").slice(0, 22);
  expect(sig).toBe(want);
  return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
};

describe("email tracking", () => {
  const html =
    '<p>Hi,</p><p>1. <a href="https://contentengine.live/claim/abc?x=1&amp;y=2">Set up your portal</a></p>' +
    '<p><a href="mailto:sean@x.com">mail</a> <a href="http://insecure.example">plain</a></p>';

  it("wraps https links with a signed redirect labelled by the link text, and appends the pixel", () => {
    const out = trackEmail(html, { email: "B@x.com", subject: "You're in", mailId: "m1", sentAt: 100 }, SECRET);
    const links = [...out.matchAll(/href="https:\/\/contentengine\.live\/r\/([^"]+)"/g)].map((m) => m[1]);
    expect(links).toHaveLength(1);
    const p = read(links[0]);
    expect(p).toMatchObject({ e: "b@x.com", m: "m1", s: "You're in", t: 100, l: "Set up your portal", u: "https://contentengine.live/claim/abc?x=1&y=2" });
    expect(out).toContain('href="mailto:sean@x.com"');
    expect(out).toContain('href="http://insecure.example"');
    const pix = out.match(/\/o\/([^"]+)\.gif/);
    expect(pix).toBeTruthy();
    expect(read(pix![1])).toMatchObject({ m: "m1", s: "You're in" });
    expect(out).toContain(">Set up your portal</a>");
  });

  it("leaves the email alone with no secret or no recipient", () => {
    expect(trackEmail(html, { email: "b@x.com", subject: "s", mailId: "m" }, "")).toBe(html);
    expect(trackEmail(html, { subject: "s", mailId: "m" }, SECRET)).toBe(html);
  });

  it("signs deterministically", () => {
    expect(signToken({ m: "a", s: "b", t: 1 }, SECRET)).toBe(signToken({ m: "a", s: "b", t: 1 }, SECRET));
  });
});
