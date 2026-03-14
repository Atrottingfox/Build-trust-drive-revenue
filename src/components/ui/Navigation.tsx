import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { AnimatePresence, motion } from 'framer-motion';

export function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowMobile(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/80 backdrop-blur-xl border-b border-zinc-800/50' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" onClick={handleClick} className="flex items-center gap-2.5 text-white group">
              <Logo className="w-5 h-5 text-white group-hover:text-zinc-400 transition-colors" />
              <span className="font-semibold text-[15px]">The Authority Engine</span>
            </Link>

            <a
              href="https://form.typeform.com/to/S2rogsdT"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center px-5 py-2 text-sm font-medium text-white border border-zinc-800 rounded-full hover:border-zinc-600 hover:bg-elevated transition-all"
            >
              Apply now
            </a>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showMobile && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 sm:hidden z-50 p-4 bg-gradient-to-t from-base via-base/95 to-transparent pointer-events-none"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <a
              href="https://form.typeform.com/to/S2rogsdT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3.5 text-[15px] font-semibold bg-white text-black rounded-full pointer-events-auto hover:bg-zinc-200 transition-colors"
            >
              Apply now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
