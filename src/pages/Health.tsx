import { useEffect, useState } from 'react';
import { Container } from '../components/ui/Container';
import { Check, X, RefreshCw, AlertTriangle } from 'lucide-react';

/*
  /health - is the funnel actually working.

  Every failure this page was built for was silent. An application produced a
  Slack alert and no CRM record. A lock-in link told someone they were locked in
  when they had paid nothing. Calendly had no webhook at all, so no booking had
  ever reported back. Live prices sat at $1 for hours after a test.

  None of them threw an error, which is exactly why they lasted. So the page
  leads with a single verdict rather than a wall of green ticks: the only
  question worth answering on arrival is "can I sell today".

  Gated behind the same basic auth as /ladder, because it reports which
  environment variables are set.
*/

type Check = {
  group: string;
  name: string;
  ok: boolean;
  detail?: string;
  critical: boolean;
};

type Result = {
  ok: boolean;
  criticalFailures: number;
  failures: number;
  total: number;
  checks: Check[];
  ranAt: string;
  error?: string;
};

export default function Health() {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const run = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/health-status', { cache: 'no-store' });
      setData(await res.json());
    } catch {
      setError('Could not reach the health check itself. That is its own kind of answer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    run();
  }, []);

  const groups = data
    ? Array.from(new Set(data.checks.map((c) => c.group))).map((g) => ({
        name: g,
        checks: data.checks.filter((c) => c.group === g),
      }))
    : [];

  const verdict = !data
    ? null
    : data.criticalFailures > 0
      ? { tone: 'bad', title: 'Something is broken', body: `${data.criticalFailures} critical ${data.criticalFailures === 1 ? 'failure' : 'failures'}. Applications or money are affected right now.` }
      : data.failures > 0
        ? { tone: 'warn', title: 'Working, with issues', body: `${data.failures} non-critical ${data.failures === 1 ? 'issue' : 'issues'}. Nothing is down, but worth a look.` }
        : { tone: 'ok', title: 'Everything is working', body: `All ${data.total} checks passed. Applications land, payments take, bookings report back.` };

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />

      <Container className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-3">Internal</p>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-white">
                Funnel health
              </h1>
            </div>
            <button
              onClick={run}
              disabled={loading}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Checking' : 'Run again'}
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/[0.07] p-5 text-red-200 text-[15px]">
              {error}
            </div>
          )}

          {loading && !data && (
            <p className="text-zinc-500">Running every check. Takes a few seconds.</p>
          )}

          {verdict && (
            <div
              className={`rounded-2xl border p-7 mb-4 ${
                verdict.tone === 'ok'
                  ? 'border-emerald-500/30 bg-emerald-500/[0.07]'
                  : verdict.tone === 'warn'
                    ? 'border-amber-500/30 bg-amber-500/[0.07]'
                    : 'border-red-500/30 bg-red-500/[0.07]'
              }`}
            >
              <div className="flex items-center gap-3.5 mb-2">
                <div
                  className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${
                    verdict.tone === 'ok'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : verdict.tone === 'warn'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {verdict.tone === 'ok' ? <Check size={18} /> : verdict.tone === 'warn' ? <AlertTriangle size={17} /> : <X size={18} />}
                </div>
                <h2 className="font-display text-2xl text-white">{verdict.title}</h2>
              </div>
              <p className="text-zinc-300 leading-relaxed">{verdict.body}</p>
              {data?.ranAt && (
                <p className="text-zinc-500 text-sm mt-4">
                  Checked {new Date(data.ranAt).toLocaleString('en-AU')}. Runs on its own every hour and
                  alerts Slack only when something fails.
                </p>
              )}
            </div>
          )}

          {/* Failures first. Nobody scrolls a wall of green to find the red. */}
          {data && data.failures > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-7 mb-4">
              <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase mb-5">Needs attention</p>
              <div className="space-y-4">
                {data.checks.filter((c) => !c.ok).map((c) => (
                  <div key={c.group + c.name} className="flex gap-3.5">
                    <div className={`h-5 w-5 mt-0.5 shrink-0 rounded-full flex items-center justify-center ${c.critical ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'}`}>
                      <X size={12} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-[15px] leading-snug">
                        {c.name}
                        {c.critical && <span className="text-red-400/80 text-xs ml-2 uppercase tracking-wider">critical</span>}
                      </p>
                      <p className="text-zinc-500 text-sm mt-0.5">{c.group}</p>
                      {c.detail && (
                        <p className="text-zinc-400 text-sm mt-1.5 break-words font-mono">{c.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {groups.map((g) => (
            <div key={g.name} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 sm:p-7 mb-4">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <p className="text-zinc-500 text-xs tracking-[0.16em] uppercase">{g.name}</p>
                <p className="text-zinc-600 text-xs">
                  {g.checks.filter((c) => c.ok).length}/{g.checks.length}
                </p>
              </div>
              <div className="space-y-3">
                {g.checks.map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <div
                      className={`h-5 w-5 mt-0.5 shrink-0 rounded-full flex items-center justify-center ${
                        c.ok ? 'bg-emerald-500/15 text-emerald-400' : c.critical ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {c.ok ? <Check size={12} /> : <X size={12} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[15px] leading-snug ${c.ok ? 'text-zinc-300' : 'text-white'}`}>{c.name}</p>
                      {c.detail && (
                        <p className={`text-sm mt-0.5 break-words ${c.ok ? 'text-zinc-600' : 'text-zinc-400 font-mono'}`}>
                          {c.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </Container>
    </div>
  );
}
