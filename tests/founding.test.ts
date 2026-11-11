import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleFoundingSale, handleAbandoned } from "../netlify/functions/_founding";
import { buildDigest } from "../netlify/functions/founding-digest";
import { handler as sweep } from "../netlify/functions/founding-sweep";
import { handler as checkout } from "../netlify/functions/founding-checkout";

/*
  The founding 90 Day after sale chain, proven without charging a card.

  Every outside call (Stripe, GoHighLevel, Slack) is answered by a fake fetch
  that records what was asked of it. The tests then check the things that would
  cost money or a client if they broke: one alert per sale, the founding-paid
  tag, the alerted flag that stops repeats, and the checkout refusing a sixth
  buyer or a buyer after 30 November.
*/

type Call = { url: string; method: string; body: string };

const OLD_FETCH = globalThis.fetch;
let calls: Call[] = [];

function mockFetch(handler: (url: string, init: any) => any) {
  calls = [];
  globalThis.fetch = vi.fn(async (url: any, init: any = {}) => {
    const u = String(url);
    calls.push({ url: u, method: init.method || "GET", body: String(init.body || "") });
    const out = handler(u, init) ?? {};
    return {
      ok: out.status ? out.status < 400 : true,
      status: out.status ?? 200,
      json: async () => out.json ?? {},
      text: async () => JSON.stringify(out.json ?? {}),
    } as any;
  }) as any;
}

const paidSession = (over: any = {}) => ({
  id: "cs_live_abc123",
  payment_status: "paid",
  amount_total: 1000000,
  currency: "aud",
  metadata: { payment: "founding-90" },
  customer_details: { name: "Jane Founder", email: "jane@example.com", phone: "+61400000000" },
  ...over,
});

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_x";
  process.env.GHL_TOKEN = "ghl_x";
  process.env.GHL_LOCATION_ID = "loc_x";
  process.env.SLACK_WEBHOOK_MONEY = "https://hooks.slack.test/money";
});

afterEach(() => {
  globalThis.fetch = OLD_FETCH;
  vi.useRealTimers();
});

const slackPosts = () => calls.filter((c) => c.url.startsWith("https://hooks.slack.test"));
const stripeUpdates = () => calls.filter((c) => c.url.includes("api.stripe.com/v1/checkout/sessions/") && c.method === "POST");

describe("a founding sale", () => {
  it("creates the GHL contact, tags founding-paid, posts Slack once and marks the session", async () => {
    mockFetch((u, init) => {
      if (u.includes("/contacts/?locationId")) return { json: { contacts: [] } };
      if (u.endsWith("/contacts/") && init.method === "POST") return { json: { contact: { id: "c_1" } } };
      return { json: {} };
    });

    expect(await handleFoundingSale(paidSession(), "thank-you page")).toBe(true);

    const create = calls.find((c) => c.url.endsWith("/contacts/") && c.method === "POST")!;
    expect(JSON.parse(create.body)).toMatchObject({ email: "jane@example.com", firstName: "Jane", lastName: "Founder", tags: ["founding-paid"] });

    expect(slackPosts()).toHaveLength(1);
    const text = JSON.parse(slackPosts()[0].body).text;
    expect(text).toContain("Jane Founder");
    expect(text).toContain("$10,000.00");
    expect(text).toContain("+61400000000");

    expect(stripeUpdates()).toHaveLength(1);
    expect(decodeURIComponent(stripeUpdates()[0].body)).toContain("metadata[alerted]=1");
    expect(decodeURIComponent(stripeUpdates()[0].body)).toContain("metadata[ghl_contact_id]=c_1");
  });

  it("does nothing the second time, so a refresh or the sweep never repeats the alert", async () => {
    mockFetch(() => ({ json: {} }));
    expect(await handleFoundingSale(paidSession({ metadata: { payment: "founding-90", alerted: "1" } }), "sweep")).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it("ignores an unpaid session", async () => {
    mockFetch(() => ({ json: {} }));
    expect(await handleFoundingSale(paidSession({ payment_status: "unpaid" }), "sweep")).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it("ignores every other kind of payment, like a Brand Day", async () => {
    mockFetch(() => ({ json: {} }));
    expect(await handleFoundingSale(paidSession({ metadata: { payment: "brand-day" } }), "sweep")).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it("still alerts Slack and marks the sale when GoHighLevel is down", async () => {
    mockFetch((u) => (u.includes("leadconnectorhq") ? { status: 500, json: {} } : { json: {} }));

    expect(await handleFoundingSale(paidSession(), "thank-you page")).toBe(true);
    expect(slackPosts()).toHaveLength(1);
    expect(JSON.parse(slackPosts()[0].body).text).toContain("Could not create or tag them in GoHighLevel");
    expect(stripeUpdates()).toHaveLength(1);
  });
});

describe("the 10 minute sweep", () => {
  it("handles only paid founding sessions that were not handled yet", async () => {
    mockFetch((u, init) => {
      if (u.includes("checkout/sessions?status=complete")) {
        return {
          json: {
            data: [
              paidSession({ id: "cs_live_new" }),
              paidSession({ id: "cs_live_done", metadata: { payment: "founding-90", alerted: "1" } }),
              paidSession({ id: "cs_live_brandday", metadata: { payment: "brand-day" } }),
            ],
          },
        };
      }
      if (u.includes("/contacts/?locationId")) return { json: { contacts: [] } };
      if (u.endsWith("/contacts/") && init.method === "POST") return { json: { contact: { id: "c_2" } } };
      return { json: {} };
    });

    const res: any = await sweep({} as any, {} as any);
    expect(JSON.parse(res.body)).toEqual({ handled: 1, abandoned: 0 });
    expect(slackPosts()).toHaveLength(1);
    expect(stripeUpdates().map((c) => c.url)).toEqual(["https://api.stripe.com/v1/checkout/sessions/cs_live_new"]);
  });
});

describe("the checkout", () => {
  const post = (body: any) => checkout({ httpMethod: "POST", body: JSON.stringify(body) } as any, {} as any) as any;

  it("sells while spots are left: $10,000 AUD, phone collected, tagged founding-90", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-15T00:00:00+10:00"));
    mockFetch((u) => {
      if (u.includes("payment_intents/search")) return { json: { data: [{}, {}] } };
      if (u.endsWith("/checkout/sessions")) return { json: { url: "https://checkout.stripe.com/x" } };
      return { json: {} };
    });

    const res = JSON.parse((await post({ action: "checkout" })).body);
    expect(res.url).toBe("https://checkout.stripe.com/x");

    const create = decodeURIComponent(calls.find((c) => c.url.endsWith("/checkout/sessions"))!.body);
    expect(create).toContain("line_items[0][price_data][unit_amount]=1000000");
    expect(create).toContain("line_items[0][price_data][currency]=aud");
    expect(create).toContain("phone_number_collection[enabled]=true");
    expect(create).toContain("metadata[payment]=founding-90");
    expect(create).toContain("payment_intent_data[metadata][payment]=founding-90");
  });

  it("refuses a sixth buyer", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-15T00:00:00+10:00"));
    mockFetch((u) => (u.includes("payment_intents/search") ? { json: { data: [{}, {}, {}, {}, {}] } } : { json: {} }));

    const res = JSON.parse((await post({ action: "checkout" })).body);
    expect(res).toMatchObject({ open: false, remaining: 0, url: null });
    expect(calls.some((c) => c.url.endsWith("/checkout/sessions"))).toBe(false);
  });

  it("refuses after midnight 30 November, Brisbane", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-01T00:00:01+10:00"));
    mockFetch((u) => (u.includes("payment_intents/search") ? { json: { data: [] } } : { json: {} }));

    const res = JSON.parse((await post({ action: "checkout" })).body);
    expect(res).toMatchObject({ open: false, url: null });
    expect(calls.some((c) => c.url.endsWith("/checkout/sessions"))).toBe(false);
  });

  it("is still open one minute before the deadline", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-30T23:59:00+10:00"));
    mockFetch((u) => {
      if (u.includes("payment_intents/search")) return { json: { data: [] } };
      if (u.endsWith("/checkout/sessions")) return { json: { url: "https://checkout.stripe.com/y" } };
      return { json: {} };
    });

    const res = JSON.parse((await post({ action: "checkout" })).body);
    expect(res.url).toBe("https://checkout.stripe.com/y");
  });
});

describe("abandoned checkouts", () => {
  const expired = (over: any = {}) => ({
    id: "cs_live_gone",
    status: "expired",
    payment_status: "unpaid",
    metadata: { payment: "founding-90" },
    customer_details: { name: "Sam Prospect", email: "sam@example.com", phone: null },
    ...over,
  });

  it("tags founding-abandoned and posts Slack when they left an email", async () => {
    mockFetch((u, init) => {
      if (u.includes("/contacts/?locationId")) return { json: { contacts: [] } };
      if (u.endsWith("/contacts/") && init.method === "POST") return { json: { contact: { id: "c_9" } } };
      return { json: {} };
    });
    expect(await handleAbandoned(expired())).toBe(true);
    const create = calls.find((c) => c.url.endsWith("/contacts/") && c.method === "POST")!;
    expect(JSON.parse(create.body).tags).toEqual(["founding-abandoned"]);
    expect(JSON.parse(slackPosts()[0].body).text).toContain("did not pay");
  });

  it("stays quiet for an anonymous session, a repeat, or someone who then bought", async () => {
    mockFetch(() => ({ json: {} }));
    expect(await handleAbandoned(expired({ customer_details: {} }))).toBe(false);
    expect(await handleAbandoned(expired({ metadata: { payment: "founding-90", abandon_alerted: "1" } }))).toBe(false);
    expect(calls).toHaveLength(0);

    mockFetch((u) => (u.includes("/contacts/?locationId") ? { json: { contacts: [{ id: "c_1", email: "sam@example.com", tags: ["founding-paid"] }] } } : { json: {} }));
    expect(await handleAbandoned(expired())).toBe(false);
    expect(slackPosts()).toHaveLength(0);
  });
});

describe("the waitlist", () => {
  const post = (body: any) => checkout({ httpMethod: "POST", body: JSON.stringify(body) } as any, {} as any) as any;

  it("tags founding-waitlist and posts Slack", async () => {
    mockFetch((u, init) => {
      if (u.includes("/contacts/?locationId")) return { json: { contacts: [] } };
      if (u.endsWith("/contacts/") && init.method === "POST") return { json: { contact: { id: "c_w" } } };
      return { json: {} };
    });
    const res = await post({ action: "waitlist", email: "kim@example.com", name: "Kim Lee" });
    expect(JSON.parse(res.body)).toEqual({ ok: true });
    const create = calls.find((c) => c.url.endsWith("/contacts/") && c.method === "POST")!;
    expect(JSON.parse(create.body)).toMatchObject({ email: "kim@example.com", firstName: "Kim", tags: ["founding-waitlist"] });
    expect(slackPosts()).toHaveLength(1);
  });

  it("rejects a bad email without touching GoHighLevel", async () => {
    mockFetch(() => ({ json: {} }));
    const res = await post({ action: "waitlist", email: "not-an-email", name: "x" });
    expect(res.statusCode).toBe(400);
    expect(calls).toHaveLength(0);
  });
});

describe("the morning digest", () => {
  it("reports spots, days left and the last 24 hours", async () => {
    mockFetch((u) => {
      if (u.includes("payment_intents/search")) return { json: { data: [{}, {}] } };
      if (u.includes("checkout/sessions?limit=100")) {
        return {
          json: {
            data: [
              { metadata: { payment: "founding-90" }, payment_status: "paid", status: "complete" },
              { metadata: { payment: "founding-90" }, payment_status: "unpaid", status: "expired", customer_details: { email: "a@b.co" } },
              { metadata: { payment: "founding-90" }, payment_status: "unpaid", status: "expired" },
              { metadata: { payment: "brand-day" }, payment_status: "paid", status: "complete" },
            ],
          },
        };
      }
      return { json: {} };
    });
    const text = (await buildDigest(new Date("2026-11-20T07:30:00+10:00").getTime()))!;
    expect(text).toContain("11 days to go");
    expect(text).toContain("Sold 2 of 5. 3 left.");
    expect(text).toContain("3 checkouts started, 1 paid, 2 left without paying (1 left an email)");
  });

  it("stops the day after the intake closes", async () => {
    mockFetch(() => ({ json: {} }));
    expect(await buildDigest(new Date("2026-12-02T08:00:00+10:00").getTime())).toBeNull();
    expect(calls).toHaveLength(0);
  });
});
