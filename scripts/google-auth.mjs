#!/usr/bin/env node
/*
  Turns a Google OAuth client into a refresh token, and puts it into Netlify.

  Everything here could be done by hand, which is exactly why it should not be:
  the hand version is a consent URL assembled from six query parameters, a code
  pasted between two windows, and a curl with a client secret in the shell
  history. Each of those is a place to get it subtly wrong and not find out
  until a client cannot book.

  Run it, click once, done:

      node scripts/google-auth.mjs

  Reads the client id and secret from the environment if they are there, and
  asks if they are not. Nothing is written to disk, and the secret never reaches
  the shell history.
*/

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { execFileSync } from "node:child_process";

const SCOPE = "https://www.googleapis.com/auth/calendar";
/* The out-of-band flow is gone, so the code comes back on a loopback address.
   Nothing listens on it: the browser lands on a dead page and the code is in
   the address bar, which is all that is needed. */
const REDIRECT = "http://localhost:8123";

const rl = createInterface({ input: stdin, output: stdout });
const ask = async (q) => (await rl.question(q)).trim();

const clientId = process.env.GOOGLE_CLIENT_ID || (await ask("Client ID: "));
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || (await ask("Client secret: "));

if (!clientId || !clientSecret) {
  console.error("\nBoth are needed. Nothing has been changed.");
  process.exit(1);
}

const url =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT,
    response_type: "code",
    scope: SCOPE,
    /* consent + offline together are what actually return a refresh token. Ask
       for offline alone and a second authorisation silently returns none, which
       is the single most common way this goes wrong. */
    access_type: "offline",
    prompt: "consent",
  });

console.log("\nOpen this, sign in as sean@authorityengine.com.au, and allow:\n");
console.log(url);
console.log(
  "\nThe browser will fail to load a page. That is expected. Copy the value of" +
    "\n`code=` out of the address bar and paste it here.\n"
);

const code = await ask("code= ");
rl.close();

if (!code) {
  console.error("\nNo code. Nothing has been changed.");
  process.exit(1);
}

const res = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    code: decodeURIComponent(code),
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: REDIRECT,
    grant_type: "authorization_code",
  }),
});

const json = await res.json();

if (!res.ok || !json.refresh_token) {
  console.error("\nThat did not work:", JSON.stringify(json, null, 2));
  console.error(
    "\nIf it says invalid_grant the code has already been used or has expired." +
      "\nCodes are single use and last minutes. Run this again for a fresh one."
  );
  process.exit(1);
}

console.log("\nGot a refresh token. Putting all three into Netlify.\n");

const set = (key, value) => {
  execFileSync("npx", ["netlify", "env:set", key, value, "--context", "production"], {
    stdio: ["ignore", "inherit", "inherit"],
  });
};

try {
  set("GOOGLE_CLIENT_ID", clientId);
  set("GOOGLE_CLIENT_SECRET", clientSecret);
  set("GOOGLE_REFRESH_TOKEN", json.refresh_token);
  console.log("\nDone. Deploy and the slot picker is live.");
} catch {
  console.error(
    "\nCould not reach Netlify, so set these three by hand:\n\n" +
      `GOOGLE_CLIENT_ID=${clientId}\n` +
      `GOOGLE_CLIENT_SECRET=${clientSecret}\n` +
      `GOOGLE_REFRESH_TOKEN=${json.refresh_token}\n`
  );
  process.exit(1);
}
