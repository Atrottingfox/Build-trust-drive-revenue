import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { toE164AU, cleanCtaSource } from "../netlify/functions/builder-application";

/*
  Regression tests for the failures of 20 and 21 August 2026.

  Every one of them was silent. An application produced a Slack alert and no
  CRM record. One applicant's details overwrote another's because they shared a
  phone number. A real applicant lost their tag and vanished from every filter.
  A lock-in page told somebody they were locked in when they had paid nothing.
  The second $5,000 of every Install was never invoiced. Live prices sat at $1.

  Nothing threw. Nothing warned. They were found by a person noticing a missing
  email days later.

  The health check catches these AFTER an applicant has already been lost. These
  tests catch them before a deploy, which is the only place they can be caught
  for free. `npm run build` runs them first, so a broken build cannot ship.

  Some of these read source files and assert a pattern is absent. That is
  unusual and deliberate: the bugs were architectural decisions, not arithmetic,
  and the cheapest durable guard against "someone re-introduces the upsert" is a
  test that fails the moment they do.
*/

const fn = (name: string) => readFileSync(join(__dirname, "..", "netlify", "functions", name), "utf8");
const page = (name: string) => readFileSync(join(__dirname, "..", "src", "pages", name), "utf8");

/*
  Comments stripped. These files explain at length why the old approach was
  wrong, and naming it is the point of the comment. Asserting against raw source
  would fail on the explanation rather than on the behaviour.
*/
const codeOf = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("Australian mobile normalisation", () => {
  /* GHL accepts a malformed number without complaint and then silently fails to
     SMS it, so a wrong answer here is invisible until a client never gets a text. */
  it.each([
    ["0400 000 000", "+61400000000"],
    ["0400000000", "+61400000000"],
    ["+61400000000", "+61400000000"],
    ["61400000000", "+61400000000"],
    ["400000000", "+61400000000"],
    ["0011 1 415 555 0100", "+14155550100"],
  ])("normalises %s", (input, expected) => {
    expect(toE164AU(input).phone).toBe(expected);
  });

  it("reports low confidence rather than inventing a number", () => {
    expect(toE164AU("12345").confident).toBe(false);
  });

  it("treats an empty number as fine, not as a failure", () => {
    expect(toE164AU("")).toEqual({ phone: "", confident: true });
  });
});

describe("CTA source sanitising", () => {
  /* It reaches a GHL field and a Slack alert. Control characters can reshape
     the message Sean triages from. */
  it("strips anything that is not a slug", () => {
    expect(cleanCtaSource("Offer-Next_Step")).toBe("offer-next_step");
    expect(cleanCtaSource("<script>alert(1)</script>")).toBe("scriptalert1script");
    expect(cleanCtaSource("a\nb\tc")).toBe("abc");
  });

  it("caps the length", () => {
    expect(cleanCtaSource("x".repeat(500)).length).toBe(64);
  });

  it("survives rubbish input", () => {
    expect(cleanCtaSource(undefined)).toBe("");
    expect(cleanCtaSource(null)).toBe("");
    /* An object stringifies to junk rather than throwing. It reaches a GHL
       field, so what matters is that it is always a safe slug. */
    expect(cleanCtaSource({} as unknown)).toMatch(/^[a-z0-9_-]*$/);
  });
});

describe("An application can never overwrite another person", () => {
  /*
    GHL's /contacts/upsert matches on phone as well as email and the match wins
    silently. A second applicant sharing an office number overwrote the first
    completely: name, email, answers, tags. It was reproduced in production.
  */
  it("does not call the upsert endpoint", () => {
    expect(codeOf(fn("builder-application.ts"))).not.toContain("contacts/upsert");
  });

  it("looks a contact up by email before writing", () => {
    const src = fn("builder-application.ts");
    expect(src).toMatch(/contacts\/\?locationId=.*query=/);
  });

  it("handles the duplicate-phone rejection instead of losing the application", () => {
    const src = fn("builder-application.ts");
    expect(src).toContain('matchingField === "phone"');
    expect(src).toContain("duplicate-phone");
  });
});

describe("The applied tag is only ever added", () => {
  /*
    It used to be removed and re-added so a second application would re-fire
    GHL's "tag added" trigger. That opens a window with no tag at all, and two
    overlapping submissions leave it removed for good. A real applicant ended up
    tagged only `application-started`, invisible to every filter and to the
    delivery check meant to notice they heard nothing.
  */
  it("never deletes the applied tag", () => {
    /*
      A dedicated trigger tag IS cycled, and that is the right answer: it means
      nothing, nothing filters on it, and losing it to a race costs nothing. The
      invariant is narrower than "no deletes". It is that `applied`, which every
      filter and smart list depends on, is only ever added.
    */
    const src = codeOf(fn("builder-application.ts"));
    const deleteBlocks = src.split(/method:\s*["']DELETE["']/).slice(1);
    for (const block of deleteBlocks) {
      const payload = block.slice(0, 220);
      expect(payload).not.toMatch(/tags:\s*\[\s*["']applied["']/);
    }
  });
});

describe("The Install actually invoices the second payment", () => {
  /*
    /install trusted ?paid=1 from the address bar and never called
    verify-payment, so GHL was never told and the second $5,000 was never
    raised. The money simply did not arrive.
  */
  it("verifies the Stripe session rather than believing the query string", () => {
    const src = page("Install.tsx");
    expect(src).toContain("verify-payment");
    expect(src).toContain("session_id");
  });

  it("sends an idempotency key so a refresh cannot double-invoice", () => {
    /* The page is a Stripe return URL. Return URLs get refreshed, reopened and
       restored by browsers, and this call raises a real $5,000 invoice. */
    const src = fn("verify-payment.ts");
    expect(src).toContain("Idempotency-Key");
  });
});

describe("Pages report the record, not the browser", () => {
  /*
    /lock-in kept progress in global localStorage keys, so any browser that had
    ever completed a payment showed "You're locked in" to every contact whose
    link was opened in it afterwards.
  */
  it("scopes remembered state to the contact", () => {
    const src = page("LockIn.tsx");
    expect(src).not.toMatch(/store\.(get|set)\(\s*['"]ae_paid['"]/);
    expect(src).not.toMatch(/store\.(get|set)\(\s*['"]ae_booked['"]/);
    expect(src).not.toMatch(/localStorage\.removeItem\(\s*['"]ae_paid['"]/);
  });

  it("asks the server what is actually true", () => {
    expect(page("LockIn.tsx")).toContain("track-hub");
  });
});

describe("Applying and being accepted stay separate events", () => {
  /* The application used to redirect straight to the $5,000 page, so the gate
     did not exist and "not everyone gets in" was untrue. */
  it("does not send the applicant to the payment page", () => {
    const src = page("Builder.tsx");
    expect(src).not.toMatch(/window\.location\.href\s*=\s*[`'"]\/?lock-in/);
  });

  it("lands them on the thank you screen", () => {
    expect(page("Builder.tsx")).toContain("setSubmitted(true)");
  });
});

describe("The health check tells the truth", () => {
  /*
    It reported "no DKIM, mail will be junked" as critical. It was checking the
    root domain; nothing sends from there. A monitor that cries wolf gets
    ignored exactly when it matters.
  */
  it("checks email auth on the sending subdomain", () => {
    const src = fn("_health.ts");
    expect(src).toContain("mg.authorityengine.com.au");
  });

  it("watches real applicants rather than only tagged ones", () => {
    /* Keying on the `applied` tag hid the exact failure it exists to catch: an
       applicant who lost the tag also disappeared from the report. */
    const src = fn("_health.ts");
    expect(src).toContain("APPLIED AND RECEIVED NOTHING");
    expect(src).toMatch(/builder\|apply/);
  });

  it("guards the live prices", () => {
    /* They sat at $1 for eighteen hours after a test. */
    const src = fn("_health.ts");
    expect(src).toContain("CHECKOUT_AMOUNT_CENTS");
    expect(src).toContain("500000");
  });

  it("reports workflows that are sitting in Draft", () => {
    expect(fn("_health.ts")).toContain("DRAFT");
  });
});

describe("Approve links cannot be fired by a mail scanner", () => {
  /*
    Gmail, Outlook and corporate scanners fetch every link in an email before a
    human sees it. If tapping were the action, every applicant would arrive
    pre-invited by a robot.
  */
  it("only acts on POST", () => {
    const src = fn("decide.ts");
    expect(src).toContain('event.httpMethod !== "POST"');
  });

  it("refuses without the shared secret", () => {
    expect(fn("decide.ts")).toContain("q.k !== secret");
  });
});

describe("The application endpoint, end to end", () => {
  const OLD = globalThis.fetch;
  let calls: Array<{ url: string; method: string; body: any }>;

  const application = {
    source: "builder",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0400 000 000",
    company: "Example",
  };

  const invoke = async () => {
    const mod = await import("../netlify/functions/builder-application");
    return (mod as any).handler(
      { httpMethod: "POST", body: JSON.stringify(application), headers: {} },
      {} as any,
      (() => {}) as any
    );
  };

  const mockFetch = (handler: (url: string, init: any) => any) => {
    globalThis.fetch = vi.fn(async (url: any, init: any = {}) => {
      const u = String(url);
      calls.push({
        url: u,
        method: init.method || "GET",
        body: init.body ? JSON.parse(init.body) : undefined,
      });
      return handler(u, init);
    }) as any;
  };

  const ok = (data: any) => ({ ok: true, status: 200, json: async () => data, text: async () => JSON.stringify(data) });

  beforeEach(() => {
    calls = [];
    vi.resetModules();
    process.env.GHL_TOKEN = "test-token";
    process.env.GHL_LOCATION_ID = "test-location";
    process.env.NOTION_API_KEY = "test-notion";
  });

  afterEach(() => {
    globalThis.fetch = OLD;
  });

  it("creates a contact when the email is new, and never uses upsert", async () => {
    mockFetch((u) => {
      if (u.includes("/contacts/?locationId")) return ok({ contacts: [] });
      if (u.endsWith("/contacts/")) return ok({ contact: { id: "new-contact" } });
      return ok({});
    });

    const res: any = await invoke();
    expect(JSON.parse(res.body).contactId).toBe("new-contact");
    expect(calls.some((c) => c.url.includes("contacts/upsert"))).toBe(false);
  });

  it("updates the existing contact when the email already exists", async () => {
    mockFetch((u) => {
      if (u.includes("/contacts/?locationId"))
        return ok({ contacts: [{ id: "existing", email: "jane@example.com" }] });
      return ok({ contact: { id: "existing" } });
    });

    await invoke();
    const write = calls.find((c) => c.method === "PUT" && c.url.includes("/contacts/existing"));
    expect(write).toBeTruthy();
  });

  it("keeps the application when the phone belongs to someone else", async () => {
    /* This is the one that destroyed a contact in production. */
    let created = 0;
    mockFetch((u, init) => {
      if (u.includes("/contacts/?locationId")) return ok({ contacts: [] });
      if (u.endsWith("/contacts/") && init.method === "POST") {
        created += 1;
        if (created === 1) {
          return {
            ok: false,
            status: 400,
            text: async () =>
              JSON.stringify({
                message: "This location does not allow duplicated contacts.",
                meta: { matchingField: "phone", contactId: "someone-else", contactName: "Other Person" },
              }),
            json: async () => ({}),
          };
        }
        return ok({ contact: { id: "recovered" } });
      }
      return ok({});
    });

    const res: any = await invoke();
    expect(JSON.parse(res.body).contactId).toBe("recovered");

    /* Retried without the phone, so nobody is overwritten and nothing is lost. */
    const retry = calls.filter((c) => c.url.endsWith("/contacts/") && c.method === "POST")[1];
    expect(retry?.body?.phone).toBe("");

    /* And flagged for a human to merge. */
    expect(calls.some((c) => c.url.includes("/tags") && c.body?.tags?.includes("duplicate-phone"))).toBe(true);
  });

  it("never deletes the applied tag", async () => {
    mockFetch((u) => {
      if (u.includes("/contacts/?locationId")) return ok({ contacts: [] });
      if (u.endsWith("/contacts/")) return ok({ contact: { id: "c1" } });
      return ok({});
    });

    await invoke();
    /* The trigger tag may be cycled. `applied` may not. */
    const deletedApplied = calls.some(
      (c) => c.method === "DELETE" && (c.body?.tags || []).includes("applied")
    );
    expect(deletedApplied).toBe(false);
    expect(calls.some((c) => c.url.includes("/tags") && c.body?.tags?.includes("applied"))).toBe(true);
  });
});

describe("Self healing stays inside its lane", () => {
  /*
    A system that repairs itself is only safe while the correct state is
    unambiguous. Anything involving a decision must stay with the person.
  */
  it("never rewrites prices", () => {
    /* A $1 price is usually a deliberate test. Auto-reverting it would be a
       system overruling a person. */
    const src = codeOf(fn("self-heal.ts"));
    expect(src).not.toContain("CHECKOUT_AMOUNT_CENTS");
    expect(src).not.toContain("INSTALL_PAYMENT");
  });

  it("retries a person at most once, ever", () => {
    /* Without this it is a loop that mails an applicant every hour. */
    const src = fn("self-heal.ts");
    expect(src).toContain("delivery-retried");
    expect(src).toMatch(/tags \|\| \[\]\)\.includes\(RETRIED_TAG\)/);
  });

  it("marks the retry as spent before re-firing, not after", () => {
    /* If the re-fire throws after the tag dance, the contact must still be
       marked, or the next run tries again. */
    const src = fn("self-heal.ts");
    expect(src.indexOf("RETRIED_TAG]")).toBeLessThan(src.indexOf('tags: ["applied"] }),\n      });\n      const re'));
  });

  it("gives a slow workflow time before deciding it failed", () => {
    expect(fn("self-heal.ts")).toContain("GRACE_MINUTES");
  });
});

describe("The 90 Day nudge asks rather than acts", () => {
  it("never sends the invitation on its own", () => {
    /* Whether someone belongs in the 90 days is judged in the room. An
       invitation that arrives without that judgement is billing on autopilot. */
    const src = codeOf(fn("brand-day-followup.ts"));
    expect(src).not.toMatch(/tags:\s*\[\s*["']install-invited["']/);
  });

  it("asks about a Brand Day once", () => {
    expect(fn("brand-day-followup.ts")).toContain("install-nudge-sent");
  });

  it("only marks it asked once Slack has taken it", () => {
    /* A failed Slack post that still marked the contact would lose the nudge
       for good, and it is the highest value message of the week. */
    const src = fn("brand-day-followup.ts");
    expect(src).toContain("if (posted.ok)");
  });

  it("skips anyone already invited or signed", () => {
    const src = fn("brand-day-followup.ts");
    expect(src).toContain('tags.includes("install-invited")');
    expect(src).toContain('tags.includes("install-signed")');
  });

  it("the link it sends resolves to a real action", () => {
    expect(fn("brand-day-followup.ts")).toContain("do=install-invite");
    expect(fn("decide.ts")).toContain('"install-invite"');
    expect(fn("decide.ts")).toContain("install-invited");
  });
});

describe("The meeting series builds the right rhythm", () => {
  it("only generates on POST", () => {
    /* Chat and mail clients fetch links before a human sees them. A GET that
       generated a series would fire on its own. */
    expect(fn("meeting-series.ts")).toContain('event.httpMethod !== "POST"');
  });

  it("refuses without the shared secret", () => {
    expect(fn("meeting-series.ts")).toContain("q.k !== secret");
  });

  it("marks week four as the Content Board", () => {
    const src = fn("meeting-series.ts");
    expect(src).toContain("Content Board");
    expect(src).toContain("i === 3");
  });

  it("goes weekly then fortnightly, eight meetings", () => {
    const src = fn("meeting-series.ts");
    expect(src).toContain("6 + i * 2");
    expect(src).toContain("(week - 1) * 7");
  });

  it("uses a fixed Brisbane offset, which is correct all year", () => {
    /* Queensland does not observe daylight saving, so this cannot drift. */
    expect(fn("meeting-series.ts")).toContain("hh - 10");
  });
});

describe("/install does not send a paid client to book a mandatory meeting", () => {
  it("leaves the weekly booking link empty", () => {
    /* The slot is agreed on the prep call. A booking link is a step that can
       be skipped, and if it is, the delivery rhythm never starts. */
    expect(page("Install.tsx")).toMatch(/const WEEKLY_CALL_URL = '';/);
  });
});

/*
  21 August 2026. Nobody who applied after 13 August carried the `applied` tag,
  so no workflow fired and no applicant was emailed.

  The cause was one line in the abandoned-application capture. GHL's upsert
  REPLACES the tag array rather than merging, and that call sent
  `tags: ["application-started"]`. It runs on a debounce while somebody types,
  so it could run after a finished application and reset them to
  `application-started` alone, deleting the tag that fires everything.

  The function whose only job is to notice unfinished applications was erasing
  finished ones.
*/
describe("Writing a contact never erases their tags", () => {
  const started = readFileSync(
    join(__dirname, "../netlify/functions/application-started.ts"),
    "utf8"
  );
  const builder = readFileSync(
    join(__dirname, "../netlify/functions/builder-application.ts"),
    "utf8"
  );

  /* The bodies of contact writes, ignoring calls to the /tags endpoint, which
     appends and is the correct way to add one. */
  const contactWriteBodies = (src: string) =>
    src
      .split(/fetch\(/)
      .slice(1)
      .filter((chunk) => !chunk.slice(0, 200).includes("/tags"))
      .map((chunk) => chunk.slice(0, 900));

  it("never sends tags in the upsert that captures a started application", () => {
    for (const body of contactWriteBodies(started)) {
      expect(body).not.toMatch(/tags:\s*\[/);
    }
  });

  it("never sends tags in the contact write on a submitted application", () => {
    for (const body of contactWriteBodies(builder)) {
      expect(body).not.toMatch(/tags:\s*\[/);
    }
  });

  it("adds the started tag through the appending endpoint instead", () => {
    expect(started).toMatch(/\/tags`/);
  });
});

describe("A link works whichever shape it was written in", () => {
  /* The invitation email used /install/<id> instead of ?c=<id>. The id was
     right there and the page refused to sign. */
  it("both pages read the id from the path as well as the query", () => {
    expect(page("Install.tsx")).toContain("contactIdFrom");
    expect(page("LockIn.tsx")).toContain("contactIdFrom");
  });

  it("the path form has a route to land on", () => {
    const src = readFileSync(join(__dirname, "..", "src", "App.tsx"), "utf8");
    expect(src).toContain("/install/:contactId");
    expect(src).toContain("/lock-in/:contactId");
  });
});
