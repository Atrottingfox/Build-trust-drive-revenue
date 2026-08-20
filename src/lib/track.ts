/*
  One place for CTA click tracking.

  Every apply button on the site points at the same destination, so the click
  itself tells you nothing about which part of a page did the convincing. This
  records the origin twice, for two different questions:

    GA4 event  -> "which CTA gets clicked" in aggregate
    ?src param -> "where did THIS applicant come from", carried into the form
                  and submitted with their application

  Tracking must never block a navigation, so every call is optional-chained and
  wrapped. A blocked analytics script is not a reason for a button to fail.
*/

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

/* Where the application form looks for the origin, and where sessionStorage
   holds it so a page refresh mid-form does not lose the attribution. */
export const SRC_PARAM = 'src';
export const SRC_STORAGE_KEY = 'ae_cta_src';

export function trackCta(location: string) {
  try {
    window.gtag?.('event', 'cta_click', {
      cta_location: location,
      page_path: window.location.pathname,
    });
    window.clarity?.('set', 'cta_location', location);
  } catch {
    /* analytics is never load bearing */
  }
}

/*
  Read the origin on the application page. The URL wins when present, then we
  remember it, so the value survives a refresh or a step change in the form.

  Anything arriving in ?src= is just whatever was in the URL, so it is cleaned
  to the shape a CTA label actually has before being stored or submitted. The
  server cleans it again on the way in: this end keeps the stored value tidy,
  the server end is the one that is actually trusted.
*/
const clean = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 64);

export function readCtaSource(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(SRC_PARAM);
    if (fromUrl) {
      const safe = clean(fromUrl);
      if (safe) sessionStorage.setItem(SRC_STORAGE_KEY, safe);
      return safe;
    }
    return clean(sessionStorage.getItem(SRC_STORAGE_KEY) || '');
  } catch {
    return '';
  }
}
