import type { Context } from "https://edge.netlify.com";

/*
  Serves the install slot picker at /slot.

  A plain redirect could not do this. public/_redirects ends with a SPA
  catch-all, and Netlify processes that file before netlify.toml, so /slot was
  swallowed and the marketing homepage was returned instead. With a 200. Which
  is why it looked live to anything checking status codes, and would have sent
  every signed client to the wrong page.

  Edge functions run before redirects, so this wins where a rewrite rule loses.
  The same reason /capacity has always worked: it has one bound to it.

  The query string carries the contact id and must survive.
*/
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  url.pathname = "/.netlify/functions/install-slot";
  return context.rewrite(url.toString());
};

export const config = { path: "/slot" };
