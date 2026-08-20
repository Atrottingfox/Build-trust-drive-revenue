import { GHL_API, GHL_VERSION } from "./_ghl";
import { ghlOptionContracts } from "../../src/lib/formOptions";

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
     Checked on the SENDING subdomain, not the root.

     This check first reported "no DKIM" against authorityengine.com.au and was
     wrong: nothing sends from there. GHL sends from mg.authorityengine.com.au,
     which has SPF, DKIM and DMARC all in place. Checking the wrong hostname and
     guessing selectors produced a false critical, and a monitor that cries wolf
     gets ignored exactly when it matters.

     The selector cannot be enumerated from DNS, so it is named here rather than
     guessed. If the sending domain is ever changed in GHL, both constants below
     have to change with it. */
  const SENDER = "mg.authorityengine.com.au";
  const DKIM_SELECTOR = "krs";

  const spf = (await txt(SENDER)).find((r) => r.startsWith("v=spf1"));
  const spfOk = Boolean(spf && (spf.includes("leadconnectorhq") || spf.includes("mailgun")));
  add("Email", `SPF authorises GHL on ${SENDER}`, spfOk, true, spf || "no SPF record");

  const dkim = (await txt(`${DKIM_SELECTOR}._domainkey.${SENDER}`))[0];
  add(
    "Email",
    "DKIM key published",
    Boolean(dkim && dkim.includes("p=")),
    true,
    dkim ? `${DKIM_SELECTOR} selector present` : `nothing at ${DKIM_SELECTOR}._domainkey.${SENDER}`
  );

  const dmarc = (await txt(`_dmarc.${SENDER}`))[0] || (await txt("_dmarc.authorityengine.com.au"))[0];
  add("Email", "DMARC record exists", Boolean(dmarc), false, dmarc ? dmarc.slice(0, 60) : "none");

  /*
    ── Do the form's answers still fit the boxes GHL keeps them in? ──

    Several application fields are GHL dropdowns with a fixed set of allowed
    values. Send a value that is not on the list and GHL drops it. The contact
    is still created, Slack still fires, the applicant still gets through, and
    that one answer is simply gone. Nothing errors.

    This is how the revenue bands broke: the form went from four options to six
    and the GHL dropdown still only knew the original four, so four of the six
    would have been silently discarded on every application.

    The form's lists and this check read the same definition, so the only way
    they can disagree is if the GHL side was not updated. Which is the mistake
    worth catching.
  */
  if (token && locationId) {
    for (const contract of ghlOptionContracts) {
      const fieldId = process.env[contract.envVar];
      if (!fieldId) {
        add("Contracts", `${contract.label} field id`, false, false, `${contract.envVar} is not set`);
        continue;
      }
      try {
        const res = await fetch(
          `${GHL_API}/locations/${encodeURIComponent(locationId)}/customFields/${encodeURIComponent(fieldId)}`,
          { headers: ghlAuth(token) }
        );
        if (!res.ok) {
          add("Contracts", `${contract.label} options`, false, true, `GHL returned ${res.status}`);
          continue;
        }
        const field = (await res.json())?.customField;
        const allowed: string[] = field?.picklistOptions || [];
        /* A free text field accepts anything, so there is nothing to drift. */
        if (!String(field?.dataType || "").includes("OPTIONS")) {
          add("Contracts", `${contract.label} options`, true, false, `${field?.dataType} accepts any value`);
          continue;
        }
        const missing = contract.values.filter((v) => !allowed.includes(v));
        add(
          "Contracts",
          `${contract.label} options`,
          missing.length === 0,
          true,
          missing.length
            ? `GHL will DROP these answers: ${missing.join(", ")}. Add them to the dropdown.`
            : `all ${contract.values.length} form values accepted`
        );
      } catch (err) {
        add("Contracts", `${contract.label} options`, false, true, String(err));
      }
    }
  }

  /*
    ── Can the token actually send the confirmation? ──

    The applicant's confirmation is sent through the Conversations API. Reading
    conversations and sending one are separate scopes on a GHL private
    integration token, so a token can look healthy, pass every other check here,
    and still be unable to send a single email.

    That is what happened: applications succeeded, Slack fired, and every
    applicant got a 401 in place of their confirmation.

    Probed with a contact id that cannot exist. A permission failure answers 401
    before the contact is looked up, so the scope is proven without sending mail
    to anybody.
  */
  if (token) {
    try {
      const res = await fetch(`${GHL_API}/conversations/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-04-15",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          type: "Email",
          contactId: "health-check-not-a-real-contact",
          subject: "scope probe",
          message: "scope probe",
        }),
      });
      const canSend = res.status !== 401 && res.status !== 403;
      add(
        "Email",
        "Token may send the confirmation",
        canSend,
        true,
        canSend
          ? "conversations/message.write granted"
          : "401 from GHL. Add the Conversations message write scope to the private integration token, or no applicant is emailed."
      );
    } catch (err) {
      add("Email", "Token may send the confirmation", false, true, String(err));
    }
  }

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
          if (!res.ok) {
            add("Queue", label, false, true, `HTTP ${res.status}`);
          } else {
            /* Reachable is not usable. The write sets these by name, so a
               rename in Notion breaks applications and nothing says so until
               someone applies. */
            const props = Object.keys((await res.json())?.properties || {});
            const missing = ["Name", "Email", "Company", "Revenue Band", "Status"].filter(
              (r) => !props.includes(r)
            );
            add(
              "Queue",
              label,
              missing.length === 0,
              true,
              missing.length ? `missing properties: ${missing.join(", ")}` : `${props.length} properties`
            );
          }
        } catch (err) {
          add("Queue", label, false, true, String(err));
        }
      }
    }
  }

  /* ── Workflows: published, or quietly doing nothing ──

     Four of six workflows sat in Draft for a week. A Draft workflow does not
     error, does not warn, and does not run. Every application landed correctly
     and nothing happened, and the only reason it surfaced was Sean noticing a
     missing email days later.

     A workflow with a trigger and no publish is the most expensive kind of
     nothing, so its state belongs on the dashboard permanently. */
  if (token && locationId) {
    try {
      const res = await fetch(`${GHL_API}/workflows/?locationId=${encodeURIComponent(locationId)}`, {
        headers: ghlAuth(token),
      });
      if (res.ok) {
        const flows = (await res.json())?.workflows || [];
        add("Workflows", "Workflow list readable", true, false, `${flows.length} found`);
        for (const f of flows) {
          const name = String(f?.name || "unnamed");
          /* An abandoned "New Workflow : 1786…" is clutter, not an outage. */
          const junk = /^New Workflow\s*:/i.test(name);
          const published = String(f?.status || "").toLowerCase() === "published";
          add(
            "Workflows",
            name,
            published || junk,
            !junk,
            published ? "published" : junk ? "draft, but it is an empty stub. Delete it." : "DRAFT — this never runs"
          );
        }
      } else {
        add("Workflows", "Workflow list readable", false, true, `HTTP ${res.status}`);
      }
    } catch (err) {
      add("Workflows", "Workflow list readable", false, true, String(err));
    }
  }

  /* ── Deliveries: did real applicants actually get an email ──

     The question that matters and the one nothing else answers. Tags can write,
     workflows can be published, and an applicant can still hear nothing.

     So rather than test a synthetic contact, this looks at the people who
     actually applied recently and asks GHL whether an email went out to each of
     them afterwards. Any applicant with no outbound email is money on the floor
     and is reported by name. */
  if (token && locationId) {
    try {
      const res = await fetch(`${GHL_API}/contacts/search`, {
        method: "POST",
        headers: ghlAuth(token),
        body: JSON.stringify({
          locationId,
          pageLimit: 15,
          sort: [{ field: "dateAdded", direction: "desc" }],
        }),
      });

      if (!res.ok) {
        add("Deliveries", "Recent applicants readable", false, true, `HTTP ${res.status}`);
      } else {
        /*
          Everyone who came through the site recently, NOT everyone currently
          tagged `applied`.

          Keying off the tag hid the exact failure this is meant to catch: a
          real applicant lost their `applied` tag to a race and vanished from
          the check, while still being someone who applied and heard nothing.
          Source is written once when the contact is created and never changes,
          so it cannot be undone by a later bug.
        */
        const contacts = ((await res.json())?.contacts || []).filter((c: any) => {
          const email = String(c?.email || "").toLowerCase();
          if (email.startsWith("zz-") || email.startsWith("zzcard")) return false;
          return /builder|apply/i.test(String(c?.source || ""));
        });

        /* Two days, so a quiet weekend does not look like an outage. */
        const cutoff = Date.now() - 48 * 3600 * 1000;
        const recent = contacts.filter((c: any) => new Date(c?.dateAdded || 0).getTime() > cutoff);

        if (!recent.length) {
          add("Deliveries", "Applicants in the last 48 hours", true, false, "none to check");
        }

        for (const c of recent.slice(0, 5)) {
          const who = c?.email || c?.id;
          try {
            const conv = await fetch(
              `${GHL_API}/conversations/search?locationId=${encodeURIComponent(locationId)}&contactId=${encodeURIComponent(c.id)}`,
              { headers: ghlAuth(token) }
            );
            const convs = conv.ok ? (await conv.json())?.conversations || [] : [];

            let sent = 0;
            let lastSubject = "";
            for (const cv of convs) {
              const m = await fetch(`${GHL_API}/conversations/${encodeURIComponent(cv.id)}/messages`, {
                headers: ghlAuth(token),
              });
              if (!m.ok) continue;
              const body = await m.json();
              const msgs = body?.messages?.messages || body?.messages || [];
              for (const msg of msgs) {
                if (msg?.messageType !== "TYPE_EMAIL" || msg?.direction !== "outbound") continue;
                /* Only mail sent after they applied counts. */
                if (new Date(msg?.dateAdded || 0).getTime() < new Date(c?.dateAdded || 0).getTime() - 60000) continue;
                sent += 1;
                lastSubject = lastSubject || (msg?.meta?.email?.subject ?? "");
              }
            }

            add(
              "Deliveries",
              `${who} received an email`,
              sent > 0,
              true,
              sent > 0
                ? `${sent} sent${lastSubject ? `, latest "${lastSubject}"` : ""}`
                : "APPLIED AND RECEIVED NOTHING"
            );
          } catch (err) {
            add("Deliveries", `${who} received an email`, false, true, String(err));
          }
        }
      }
    } catch (err) {
      add("Deliveries", "Recent applicants readable", false, true, String(err));
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
