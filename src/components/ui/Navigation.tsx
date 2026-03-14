import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { AnimatePresence, motion } from 'framer-motion';

export function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const lastScrollY = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY < 400) {
        setShowMobile(false);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up
        setShowMobile(true);
      } else {
        // Scrolling down
        setShowMobile(false);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
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
            className="fixed bottom-6 left-0 right-0 sm:hidden z-50 px-5 pointer-events-none"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <a
              href="https://form.typeform.com/to/S2rogsdT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 text-[14px] font-semibold bg-white text-black rounded-full pointer-events-auto hover:bg-zinc-200 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              Apply now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
