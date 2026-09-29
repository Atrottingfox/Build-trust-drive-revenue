import type { Context } from "https://edge.netlify.com";

/*
  Link preview for /thecrew. The site is a SPA, so every route ships the
  homepage's og tags and WhatsApp, which never runs JavaScript, previewed the
  crew link as the homepage. This swaps the tags in the HTML on the way out.
*/
const TITLE = "You have been invited to be a part of the top 1%.";
const DESC = "A private network for operators building the future of content.";
const IMAGE = "https://authorityengine.com.au/og-thecrew.png";
const URL_ = "https://authorityengine.com.au/thecrew";

export default async (_request: Request, context: Context) => {
  const res = await context.next();
  if (!(res.headers.get("content-type") || "").includes("text/html")) return res;

  const html = (await res.text())
    .replace(/<title>[^<]*<\/title>/, `<title>The Crew - Authority Engine</title>`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*/g, `$1${TITLE}`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*/g, `$1${DESC}`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):image" content=")[^"]*/g, `$1${IMAGE}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${URL_}`);

  const headers = new Headers(res.headers);
  headers.delete("content-length");
  return new Response(html, { status: res.status, headers });
};

export const config = { path: ["/thecrew", "/the-crew"] };
