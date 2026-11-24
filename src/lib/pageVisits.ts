import { useEffect } from 'react';

/*
  Visit tracking for every unlisted client page, posted to Slack.

  Switched on from SEO, for any page marked noIndex, so a new client page is
  tracked the day it exists without anybody remembering to add it. The question
  it answers is "has Erina actually looked at /upscale, and did she get to the
  button", which GoHighLevel tags cannot, because most of these pages carry no
  contact id.

  Two messages per visit: one on open, one when they leave with how long they
  were actually on it, how far down they got and what they clicked.

  Team visits are marked, not dropped, so a test still shows the wiring works
  but nobody mistakes it for the client. Open any page once with ?team to mark
  that browser, ?team=off to clear it.

  Never load bearing. Every call is wrapped and nothing waits on it.
*/

const ENDPOINT = '/.netlify/functions/page-visit';
const TEAM_KEY = 'ae_team';
/* Sean, 25 Nov: "track who they are and what they're doing". A personal link
   (?c= or ?for=) is remembered in this browser, so later visits without the
   link are still named. Visits are counted per browser. */
const WHO_KEY = 'ae_who';
const COUNT_KEY = 'ae_visits';

function rememberWho(contactId: string | null, forName: string | null): { contactId: string | null; forName: string | null } {
  try {
    if (contactId || forName) {
      localStorage.setItem(WHO_KEY, JSON.stringify({ contactId, forName }));
      return { contactId, forName };
    }
    const saved = JSON.parse(localStorage.getItem(WHO_KEY) || 'null');
    if (saved && typeof saved === 'object') return { contactId: saved.contactId || null, forName: saved.forName || null };
  } catch {
    /* storage blocked: unnamed */
  }
  return { contactId, forName };
}

function visitNumber(): number {
  try {
    const n = (Number(localStorage.getItem(COUNT_KEY)) || 0) + 1;
    localStorage.setItem(COUNT_KEY, String(n));
    return n;
  } catch {
    return 0;
  }
}

/* Tags the Clarity recording, so a Slack line leads straight to the session:
   in Clarity, filter by custom tag visit = the id in the Slack line. */
function tagClarity(visitId: string, who: { contactId: string | null; forName: string | null }, n: number) {
  try {
    const c = (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity;
    if (!c) return;
    c('set', 'visit', visitId);
    if (n) c('set', 'visit_number', String(n));
    if (who.contactId) {
      c('identify', who.contactId);
      c('set', 'contact', who.contactId);
    }
    if (who.forName) c('set', 'person', who.forName);
  } catch {
    /* tracking never breaks a page */
  }
}

/* A tab switch sends an update only when this much more time has been spent,
   so flicking between tabs does not fill Slack. */
const UPDATE_AFTER_SECONDS = 15;

function isTeam(): boolean {
  try {
    const flag = new URLSearchParams(window.location.search).get('team');
    if (flag === 'off') localStorage.removeItem(TEAM_KEY);
    else if (flag !== null) localStorage.setItem(TEAM_KEY, '1');
    return localStorage.getItem(TEAM_KEY) === '1';
  } catch {
    return false;
  }
}

function send(body: Record<string, unknown>, leaving = false) {
  try {
    const json = JSON.stringify(body);
    if (leaving && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([json], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json, keepalive: true }).catch(
      () => {}
    );
  } catch {
    /* tracking never breaks a page */
  }
}

function clickLabel(el: Element): string {
  const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
  return (text || el.getAttribute('href') || el.tagName.toLowerCase()).slice(0, 60);
}

export function usePageVisits(path: string, title: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const visitId = Math.random().toString(36).slice(2, 10);
    const qs = new URLSearchParams(window.location.search);
    /* A personal link, /founding?for=jane, names the visit without a GHL id. Remembered after. */
    const who = rememberWho(qs.get('c'), qs.get('for'));
    const n = visitNumber();
    const base = {
      visitId,
      path,
      title,
      contactId: who.contactId,
      forName: who.forName,
      remembered: !qs.get('c') && !qs.get('for') && Boolean(who.contactId || who.forName),
      visitNumber: n,
      team: isTeam(),
      referrer: document.referrer || '',
      utm: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].map((k) => qs.get(k)).filter(Boolean).join(' / '),
    };
    tagClarity(visitId, who, n);

    let activeMs = 0;
    let visibleSince = document.visibilityState === 'visible' ? Date.now() : 0;
    let maxScroll = 0;
    let sentSeconds = 0;
    const clicks: string[] = [];

    const seconds = () => Math.round((activeMs + (visibleSince ? Date.now() - visibleSince : 0)) / 1000);

    const onScroll = () => {
      const doc = document.documentElement;
      const room = doc.scrollHeight - window.innerHeight;
      const pct = room <= 0 ? 100 : Math.round((window.scrollY / room) * 100);
      if (pct > maxScroll) maxScroll = Math.min(100, pct);
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('a, button');
      if (!el) return;
      clicks.push(clickLabel(el));
      if (clicks.length > 20) clicks.shift();
    };

    const summary = () => {
      const s = seconds();
      if (s - sentSeconds < UPDATE_AFTER_SECONDS && !clicks.length) return;
      sentSeconds = s;
      send({ ...base, kind: 'summary', seconds: s, scroll: maxScroll, clicks: [...clicks] }, true);
      clicks.length = 0;
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (visibleSince) activeMs += Date.now() - visibleSince;
        visibleSince = 0;
        summary();
      } else if (!visibleSince) {
        visibleSince = Date.now();
      }
    };

    send({ ...base, kind: 'open' });
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick, true);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', summary);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', summary);
      summary();
    };
  }, [path, title, enabled]);
}
