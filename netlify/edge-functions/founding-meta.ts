import type { Context } from "https://edge.netlify.com";

/*
  Link preview for /founding. Same fix as crew-meta: the site is a SPA, so a link
  sent in WhatsApp, iMessage or a DM previewed as the homepage. This swaps the
  tags in the HTML on the way out. Image: public/og-founding.jpg.
*/
const TITLE = "Stop being the content manager. Install the system your team runs.";
const DESC = "Intro offer for 5 founders, starting in January. Built from the playbooks created alongside six 8 figure+ companies we've worked with. Closes 30 November.";
const IMAGE = "https://authorityengine.com.au/og-founding.jpg";
const URL_ = "https://authorityengine.com.au/founding";

export default async (_request: Request, context: Context) => {
  const res = await context.next();
  if (!(res.headers.get("content-type") || "").includes("text/html")) return res;

  const html = (await res.text())
    .replace(/<title>[^<]*<\/title>/, `<title>90 Day Install - Authority Engine</title>`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*/g, `$1${TITLE}`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*/g, `$1${DESC}`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):image" content=")[^"]*/g, `$1${IMAGE}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${URL_}`)
    /* The static canonical points at the homepage, which tells Google this page
       is a duplicate of it. */
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${URL_}`);

  const headers = new Headers(res.headers);
  headers.delete("content-length");
  return new Response(html, { status: res.status, headers });
};

export const config = { path: ["/founding", "/founding-review"] };
