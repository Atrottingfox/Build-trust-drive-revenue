import React from 'react';
import { Logo } from './ui/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Logo className="w-4 h-4 text-zinc-600" />
            <span className="text-sm text-zinc-600">The Authority Engine</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-zinc-600">
            <a href="https://www.contentengine.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Content Engine</a>
            <a href="https://www.instagram.com/a_trotting_fox/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://form.typeform.com/to/S2rogsdT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apply now</a>
          </div>

          <p className="text-sm text-zinc-700">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
