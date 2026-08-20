import { GHL_API, GHL_VERSION } from "./_ghl";

/*
  The whole funnel, checked.

  Written on 21 August 2026, the day after an application produced a Slack alert
  and no CRM record, a lock-in link showed "You're locked in" to somebody who had
  paid nothing, Calendly turned out to have zero webhook subscriptions so no
  booking had ever reported back, and live prices sat at $1 for several hours
  because a test was never reversed.

  Every one of those failed silently. Not one threw an error. The funnel kept
  saying thank you while losing applications, which is the worst way for a
  system to be broken, because you keep selling into it.

  So this checks the things that break rather than the things that are easy to
  check, and it says so in plain language.

  Two depths:
    shallow  runs hourly, no side effects worth mentioning, catches an outage
    deep     runs on demand from the dashboard, creates real Stripe sessions

  Stripe is deep-only on purpose. Creating a checkout session hourly would leave
  48 abandoned sessions a day in a real account.
*/

export type Check = {
  group: string;
  name: string;
  ok: boolean;
  detail?: string;
  /* Money or lost applications, versus something merely worth knowing. */
  critical: boolean;
};

const SITE = "https://authorityengine.com.au";
const TEST_EMAIL = "zz-healthcheck@authorityengine.com.au";
const TEST_TAG = "zz-healthcheck";

/* What the prices are supposed to be, in cents. A live $1 Brand Day is the
   single most expensive thing that can quietly be true. */
const EXPECTED_CENTS: Record<string, number> = {
  CHECKOUT_AMOUNT_CENTS: 500000,
  INSTALL_PAYMENT_1_CENTS: 500000,
  INSTALL_PAYMENT_2_CENTS: 500000,
};

const ghlAuth = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

/* DNS over HTTPS, because a Netlify function cannot dig. */
async function txt(name: string): Promise<string[]> {
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`, {
      headers: { Accept: "application/dns-json" },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.Answer || []).map((a: any) => String(a.data || "").replace(/^"|"$/g, ""));
  } catch {
    return [];
  }
}

export async function runChecks(deep: boolean): Promise<Check[]> {
  const out: Check[] = [];
  const add = (group: string, name: string, ok: boolean, critical: boolean, detail?: string) =>
    out.push({ group, name, ok, critical, detail });

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  /* ── Pages ── */
  const pages: Array<[string, boolean]> = [
    ["/offer", false],
    ["/builder", true],
    ["/lock-in", true],
    ["/install", true],
    ["/apply", false],
  ];
  await Promise.all(
    pages.map(async ([path, critical]) => {
      try {
        const res = await fetch(SITE + path, { method: "HEAD" });
        add("Pages", path, res.ok, critical, res.ok ? undefined : `HTTP ${res.status}`);
      } catch (err) {
        add("Pages", path, false, critical, String(err));
      }
    })
  );

  /* ── Config ──
     Checked before anything else that spends money, because a wrong price is
     not an outage and nothing else will ever report it. */
  for (const [name, expected] of Object.entries(EXPECTED_CENTS)) {
    const raw = process.env[name];
    const actual = raw === undefined ? 500000 : Number(raw);
    const ok = actual === expected;
    add(
      "Config",
      name,
      ok,
      true,
      ok ? `$${(actual / 100).toLocaleString()}` : `$${(actual / 100).toLocaleString()} — expected $${(expected / 100).toLocaleString()}`
    );
  }

  for (const name of ["GHL_TOKEN", "GHL_LOCATION_ID", "SLACK_WEBHOOK_URL", "NOTION_API_KEY", "DECIDE_SECRET"]) {
    add("Config", name, Boolean(process.env[name]), name !== "DECIDE_SECRET", process.env[name] ? "set" : "missing");
  }

  /* ── The application path: the thing that actually broke ── */
  if (!token || !locationId) {
    add("Applications", "GHL credentials", false, true, "GHL_TOKEN or GHL_LOCATION_ID missing");
  } else {
    const auth = ghlAuth(token);
    let lookupOk = false;
    let createdId: string | null = null;

    try {
      const res = await fetch(
        `${GHL_API}/contacts/?locationId=${encodeURIComponent(locationId)}&query=${encodeURIComponent(TEST_EMAIL)}`,
        { headers: auth }
      );
      lookupOk = res.ok;
      add("Applications", "GHL authenticates and can search", res.ok, true, res.ok ? undefined : `HTTP ${res.status}`);
      if (res.ok) {
        for (const c of (await res.json())?.contacts || []) {
          if ((c?.email || "").toLowerCase() === TEST_EMAIL) {
            await fetch(`${GHL_API}/contacts/${encodeURIComponent(c.id)}`, { method: "DELETE", headers: auth });
          }
        }
      }
    } catch (err) {
      add("Applications", "GHL authenticates and can search", false, true, String(err));
    }

    if (lookupOk) {
      try {
        const res = await fetch(`${GHL_API}/contacts/`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({ locationId, firstName: "ZZ", lastName: "Healthcheck", email: TEST_EMAIL, source: "health check" }),
        });
        const json = await res.json().catch(() => ({}));
        createdId = json?.contact?.id || json?.id || null;
        add("Applications", "A contact can be created", res.ok && Boolean(createdId), true, res.ok ? undefined : `HTTP ${res.status}`);
      } catch (err) {
        add("Applications", "A contact can be created", false, true, String(err));
      }
    }

    if (createdId) {
      /* Tagging is where every workflow hangs. A token can keep reading long
         after it has lost the right to write. */
      try {
        const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(createdId)}/tags`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({ tags: [TEST_TAG] }),
        });
        add("Applications", "A tag can be written (fires every workflow)", res.ok, true, res.ok ? undefined : `HTTP ${res.status}`);
      } catch (err) {
        add("Applications", "A tag can be written (fires every workflow)", false, true, String(err));
      }
      try {
        const res = await fetch(`${GHL_API}/contacts/${encodeURIComponent(createdId)}`, { method: "DELETE", headers: auth });
        add("Applications", "Test contact cleaned up", res.ok, false, res.ok ? undefined : `HTTP ${res.status}`);
      } catch (err) {
        add("Applications", "Test contact cleaned up", false, false, String(err));
      }
    }
  }

  /* ── Bookings ── */
  const calToken = process.env.CALENDLY_TOKEN;
  if (!calToken) {
    add("Bookings", "Calendly token", false, true, "CALENDLY_TOKEN missing");
  } else {
    try {
      const me = await fetch("https://api.calendly.com/users/me", { headers: { Authorization: `Bearer ${calToken}` } });
      const meJson = await me.json();
      const org = meJson?.resource?.current_organization;
      add("Bookings", "Calendly authenticates", me.ok, true, me.ok ? undefined : `HTTP ${me.status}`);

      if (org) {
        /*
          The check that would have caught the worst silent failure of all:
          Calendly had NO webhook subscriptions, so a booking never reported
          back, the date was never written, and nothing downstream could fire.
        */
        const w = await fetch(
          `https://api.calendly.com/webhook_subscriptions?organization=${encodeURIComponent(org)}&scope=organization`,
          { headers: { Authorization: `Bearer ${calToken}` } }
        );
        const subs = (await w.json())?.collection || [];
        const live = subs.find(
          (s: any) => s.state === "active" && String(s.callback_url || "").includes("calendly-booked")
        );
        add(
          "Bookings",
          "Bookings report back to us",
          Boolean(live),
          true,
          live ? "webhook active" : `${subs.length} subscription(s), none active for calendly-booked`
        );
      }
    } catch (err) {
      add("Bookings", "Calendly authenticates", false, true, String(err));
    }
  }

  for (const [label, url] of [
    ["VIP day booking page", "https://calendly.com/sean-authorityengine/vip-day"],
    ["Prep call booking page", "https://calendly.com/sean-authorityengine/prep-call"],
  ] as Array<[string, string]>) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      add("Bookings", label, res.ok, true, res.ok ? undefined : `HTTP ${res.status}`);
    } catch (err) {
      add("Bookings", label, false, true, String(err));
    }
  }

  /* ── Email deliverability ──
     Cheap, and it is why applicants on Outlook never saw a confirmation. */
  const spf = (await txt("authorityengine.com.au")).find((r) => r.startsWith("v=spf1"));
  add("Email", "SPF record exists", Boolean(spf), true, spf || "none");

  const dmarc = (await txt("_dmarc.authorityengine.com.au"))[0];
  add("Email", "DMARC record exists", Boolean(dmarc), false, dmarc ? dmarc.slice(0, 60) : "none");

  const selectors = ["lc", "lc1", "lc2", "mailo", "mg", "smtp", "k1"];
  const found = (
    await Promise.all(selectors.map(async (s) => ((await txt(`${s}._domainkey.authorityengine.com.au`)).length ? s : null)))
  ).filter(Boolean);
  add(
    "Email",
    "Sending domain authenticated for GHL",
    found.length > 0,
    true,
    found.length ? `DKIM found: ${found.join(", ")}` : "No DKIM. Mail from GHL will be junked by Outlook and Hotmail."
  );

  /* ── Payments, deep only ── */
  if (deep) {
    for (const [label, fn, body] of [
      ["Brand Day checkout", "create-checkout-session", { contactId: "healthcheck" }],
      ["90 Day Install checkout", "install-checkout", { contactId: "healthcheck" }],
    ] as Array<[string, string, object]>) {
      try {
        const res = await fetch(`${SITE}/.netlify/functions/${fn}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = await res.json();
        const ok = Boolean(j?.configured && j?.clientSecret);
        add("Payments", label, ok, true, ok ? "Stripe returned a live session" : j?.stripeMessage || "no session returned");
      } catch (err) {
        add("Payments", label, false, true, String(err));
      }
    }

    /* ── Notion, the application queue ── */
    const notionKey = process.env.NOTION_API_KEY;
    if (notionKey) {
      for (const [label, db] of [
        ["Brand Day applications database", "f8cdb64d3910451b9607600fb326bf6e"],
        ["Apply database", "ef00b2eb6dfb825da88101e3c99717d0"],
      ] as Array<[string, string]>) {
        try {
          const res = await fetch(`https://api.notion.com/v1/databases/${db}`, {
            headers: {
              Authorization: `Bearer ${notionKey}`,
              "Notion-Version": "2022-06-28",
            },
          });
          add("Queue", label, res.ok, true, res.ok ? undefined : `HTTP ${res.status}`);
        } catch (err) {
          add("Queue", label, false, true, String(err));
        }
      }
    }
  }

  /* ── The approve buttons in the notification email ── */
  try {
    const res = await fetch(`${SITE}/.netlify/functions/decide?c=healthcheck&do=invite`, { redirect: "manual" });
    /* No secret, so 403 is the correct answer. Anything else means the guard
       is not doing its job. */
    add("Decide links", "Approve links reject a bad secret", res.status === 403, true, `HTTP ${res.status}`);
  } catch (err) {
    add("Decide links", "Approve links reject a bad secret", false, true, String(err));
  }

  return out;
}

export function summarise(checks: Check[]) {
  const failed = checks.filter((c) => !c.ok);
  return {
    ok: failed.length === 0,
    criticalFailures: failed.filter((c) => c.critical).length,
    failures: failed.length,
    total: checks.length,
  };
}
