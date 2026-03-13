import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const location = useLocation();
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              onClick={handleClick}
              className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors group"
            >
              <Logo className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="font-semibold text-lg">The Authority Engine</span>
            </Link>

            <motion.a
              href="https://calendly.com/sean-authorityengine/90-minute-scale-session-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-glow hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Coffee className="w-4 h-4" />
              Virtual Coffee
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Mobile floating button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 sm:hidden z-50 p-4 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.a
              href="https://calendly.com/sean-authorityengine/90-minute-scale-session-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-glow flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg pointer-events-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coffee className="w-5 h-5" />
              Virtual Coffee
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}