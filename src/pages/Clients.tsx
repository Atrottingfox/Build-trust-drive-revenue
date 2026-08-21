import { useEffect, useState } from 'react';
import { Container } from '../components/ui/Container';
import { RefreshCw, Check, ArrowRight } from 'lucide-react';

/*
  /clients - everyone who has applied, and one button to invite them into the
  90 Day Install.

  The morning-after Slack nudge already does this, but only the morning after.
  A decision made a fortnight later, or one that was scrolled past, had nowhere
  to go except opening GHL and remembering which tag fires the invitation. That
  is the kind of step that quietly stops happening.

  The button sets `install-invited`, exactly what the Slack link sets, which
  fires the 90 Day Install Invite workflow. One tag, one meaning, reachable two
  ways.

  It asks first. This sends an invitation to a $10,000 programme, and a stray
  tap on a phone should not be able to do that.

  Gated behind the same basic auth as /ladder and /health.
*/

type Client = {
  id: string;
  name: string;
  email: string;
  company: string;
  addedAt: string;
  state: string;
  invited: boolean;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<{ id: string; text: string; ok: boolean } | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/clients', { cache: 'no-store' });
      const json = await res.json();
      if (!json.ok) setError(json.error || 'Could not load clients.');
      else setClients(json.contacts || []);
    } catch {
      setError('Could not reach the client list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const invite = async (c: Client) => {
    setBusy(c.id);
    setConfirming(null);
    try {
      const res = await fetch('/.netlify/functions/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId: c.id }),
      });
      const json = await res.json();
      if (json.ok) {
        setNote({ id: c.id, text: 'Invitation sent', ok: true });
        setClients((prev) =>
          prev.map((x) => (x.id === c.id ? { ...x, invited: true, state: json.state || 'Invited' } : x))
        );
      } else {
        setNote({ id: c.id, text: json.error || 'Nothing was sent', ok: false });
      }
    } catch {
      setNote({ id: c.id, text: 'Could not reach GHL. Nothing was sent.', ok: false });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="gradient-border-top" />
      <Container className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-white mb-2">Clients</h1>
              <p className="text-zinc-400 text-[15px]">
                Everyone who has applied. Invite them into the 90 Day Install whenever the call is made,
                not only the morning after.
              </p>
            </div>
            <button
              onClick={load}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-red-300 text-sm">{error}</div>
          )}

          {!error && loading && <p className="text-zinc-500 text-sm">Loading.</p>}

          {!error && !loading && clients.length === 0 && (
            <p className="text-zinc-500 text-sm">Nobody has applied yet.</p>
          )}

          <div className="space-y-3">
            {clients.map((c) => (
              <div key={c.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-white font-medium">{c.name}</p>
                    <p className="text-zinc-500 text-sm break-all">
                      {c.email}
                      {c.company ? ` · ${c.company}` : ''}
                    </p>
                    <p className="text-zinc-600 text-xs mt-2 uppercase tracking-widest">{c.state}</p>
                  </div>

                  <div className="shrink-0">
                    {c.invited ? (
                      <span className="inline-flex items-center gap-2 text-emerald-400 text-sm">
                        <Check size={15} />
                        Invited
                      </span>
                    ) : confirming === c.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => invite(c)}
                          className="rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-zinc-100 transition-colors"
                        >
                          Yes, send it
                        </button>
                        <button
                          onClick={() => setConfirming(null)}
                          className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirming(c.id)}
                        disabled={busy === c.id}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors disabled:opacity-50"
                      >
                        {busy === c.id ? 'Sending' : 'Invite to 90 Day'}
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {confirming === c.id && (
                  <p className="text-zinc-500 text-[13px] mt-4">
                    This sends {c.name} the 90 Day Install invitation.
                  </p>
                )}

                {note?.id === c.id && (
                  <p className={`text-[13px] mt-4 ${note.ok ? 'text-emerald-400' : 'text-amber-400'}`}>{note.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
