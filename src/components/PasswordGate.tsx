import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const PASSWORD = 'Scale';
const STORAGE_KEY = 'undeniable-unlocked';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true);
    }
    setChecked(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!checked) {
    return <div className="min-h-screen bg-base" />;
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-6">
      <div className="fixed top-0 left-0 right-0 z-[60] gradient-border-top" />
      <div className="max-w-sm w-full">
        <div className="accent-line mb-8" />
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">Private</p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-3">
          Password required.
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          This page is shared with a small number of partners. Enter the password to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full pl-11 pr-4 py-3.5 bg-elevated border rounded-lg text-white text-[15px] placeholder:text-zinc-600 focus:outline-none transition-colors ${error ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-600'}`}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-zinc-100 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
