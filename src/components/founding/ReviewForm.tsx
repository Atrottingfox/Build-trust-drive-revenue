import { useState } from 'react';
import { Loader2 } from 'lucide-react';

/*
  Advisory board feedback on /founding-review. Answers post to Slack through
  netlify/functions/founding-feedback.ts. Nothing is stored on the page.
*/

const HEADLINES = [
  'Stop being the content manager.',
  'Install the system your team runs.',
  'Your team runs your content.',
  'A content engine your team runs.',
];

const field =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-[15px] placeholder:text-zinc-500 focus:outline-none focus:border-blue-400';

export default function ReviewForm() {
  const [f, setF] = useState({ name: '', headline: '', headlineOwn: '', change: '', strongest: '', wouldBuy: '', other: '' });
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'busy') return;
    setState('busy');
    try {
      const r = await fetch('/.netlify/functions/founding-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return <p className="text-white text-lg font-semibold">Thank you. That goes straight to Sean.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label className="block text-white font-semibold mb-3">Your name</label>
        <input className={field} value={f.name} onChange={set('name')} placeholder="Name" required />
      </div>

      <fieldset>
        <legend className="block text-white font-semibold mb-3">Which headline would make you keep reading?</legend>
        <div className="space-y-2">
          {HEADLINES.map((h) => (
            <label key={h} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 cursor-pointer has-[:checked]:border-blue-400">
              <input type="radio" name="headline" value={h} checked={f.headline === h} onChange={set('headline')} className="accent-blue-500" />
              <span className="text-zinc-200 text-[15px]">{h}</span>
            </label>
          ))}
          <input className={field} value={f.headlineOwn} onChange={set('headlineOwn')} placeholder="Or write your own" />
        </div>
      </fieldset>

      <div>
        <label className="block text-white font-semibold mb-3">What would you change?</label>
        <textarea className={field} rows={4} value={f.change} onChange={set('change')} />
      </div>

      <div>
        <label className="block text-white font-semibold mb-3">What's the strongest part?</label>
        <textarea className={field} rows={3} value={f.strongest} onChange={set('strongest')} />
      </div>

      <fieldset>
        <legend className="block text-white font-semibold mb-3">If you were the founder this is for, would it make you buy?</legend>
        <div className="flex flex-wrap gap-2">
          {['Yes', 'Maybe', 'No'].map((v) => (
            <label key={v} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 cursor-pointer has-[:checked]:border-blue-400">
              <input type="radio" name="wouldBuy" value={v} checked={f.wouldBuy === v} onChange={set('wouldBuy')} className="accent-blue-500" />
              <span className="text-zinc-200 text-[15px]">{v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="block text-white font-semibold mb-3">Anything else?</label>
        <textarea className={field} rows={3} value={f.other} onChange={set('other')} />
      </div>

      <button
        type="submit"
        disabled={state === 'busy'}
        className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold disabled:opacity-70"
      >
        {state === 'busy' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Send to Sean
      </button>
      {state === 'error' && <p className="text-red-400 text-sm">That did not go through. Try again.</p>}
    </form>
  );
}
