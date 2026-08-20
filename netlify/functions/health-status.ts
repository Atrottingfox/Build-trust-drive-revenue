import type { Handler } from "@netlify/functions";
import { runChecks, summarise } from "./_health";

/*
  The dashboard's data source. Runs the full deep check on demand.

  Separate from health-check because Netlify refuses HTTP calls to a scheduled
  function, so the hourly job and the page each need their own entry point. The
  checks themselves live in _health so the two can never drift apart and report
  different things about the same system.

  Sits behind the same basic auth as /ladder, since it names env vars and
  reports whether they are set.
*/

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

const handler: Handler = async () => {
  try {
    const checks = await runChecks(true);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...summarise(checks), checks, ranAt: new Date().toISOString() }),
    };
  } catch (err) {
    console.error("health-status error:", err);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: false, error: String(err), checks: [], ranAt: new Date().toISOString() }),
    };
  }
};

export { handler };
