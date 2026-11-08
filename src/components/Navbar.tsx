import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, SunMedium, ShieldAlert } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { precisionSpring, crispEasing } from './motion/motionCurves';

export const Navbar: React.FC = () => {
  const { itemCount, openCartDrawer } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Solar Solutions', path: '/#solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact & Quote', path: '/contact' },
  ];

  return (
    <>
      {/* Top Demo Bar */}
      <div className="bg-[#111318] text-white/80 text-[11px] py-1.5 px-4 text-center border-b border-white/5 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-[#8EA9FF] shrink-0" />
          <span>
            <strong>Solara Energy Demonstration Platform</strong> — Product specifications and prices in NGN are illustrative.
          </span>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center text-[#8EA9FF] font-semibold hover:underline ml-1"
          >
            Explore 14 Demo Products &rarr;
          </Link>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm border-b border-black/5 py-3'
            : 'bg-[#F5F5F7]/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with tactile hover */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-9 h-9 rounded-xl bg-[#111318] flex items-center justify-center text-[#8EA9FF] shadow-xs"
              >
                <SunMedium className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-[#111318] font-heading">
                  SOLARA
                </span>
                <span className="text-[9px] tracking-widest text-[#737780] font-semibold uppercase -mt-1">
                  ENERGY
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path.replace('/#solutions', ''));

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive && !link.path.includes('#')
                        ? 'bg-black/5 text-[#111318] font-semibold'
                        : 'text-[#737780] hover:text-[#111318] hover:bg-black/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Icon */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-[#111318] hover:bg-black/5 transition-colors cursor-pointer"
                title="Search products (Cmd+K)"
                aria-label="Search products"
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Shopping Cart Button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={openCartDrawer}
                className="relative p-2 rounded-full text-[#111318] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={precisionSpring}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#111318] text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Quote CTA Button */}
              <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/contact"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all shadow-xs"
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* Mobile Menu Hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-[#111318] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown with AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: crispEasing }}
              className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 overflow-hidden shadow-lg"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25, ease: crispEasing }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#111318] hover:bg-[#F5F5F7] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#111318] text-white text-xs font-semibold"
                >
                  Request Installation Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
