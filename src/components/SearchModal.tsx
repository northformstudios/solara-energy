import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Zap } from 'lucide-react';
import { PRODUCTS, formatNGN } from '../data/products';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { precisionSpring, crispEasing } from './motion/motionCurves';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Derived search results without setState-in-effect
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.keyFeatures.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  const quickSearches = ['550W Panel', 'Hybrid Inverter', '10kWh Lithium', 'Solar Kit', 'Nomad Generator'];

  const handleSelectProduct = (productId: string) => {
    setQuery('');
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#111318]/60 backdrop-blur-md cursor-pointer"
            onClick={handleClose}
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
            transition={precisionSpring}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#737780] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search solar panels, inverters, batteries, kits..."
                className="w-full bg-transparent text-lg text-[#111318] placeholder:text-[#737780] outline-none font-sans"
              />
              {query && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
              <button
                onClick={handleClose}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gray-100 text-[#737780] hover:bg-gray-200 transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
              {!query && (
                <div>
                  <p className="text-xs font-semibold text-[#737780] tracking-wider uppercase mb-3">
                    Quick Searches
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {quickSearches.map((term) => (
                      <motion.button
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs font-medium px-3.5 py-2 rounded-full bg-[#F5F5F7] text-[#111318] hover:bg-[#DCE5FF] hover:text-[#111318] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#8EA9FF]" />
                        {term}
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-[#737780] tracking-wider uppercase mb-3">
                      Popular Demonstration Items
                    </p>
                    <div className="space-y-2">
                      {PRODUCTS.slice(0, 3).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.id)}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F5F5F7] cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-cover bg-gray-100"
                            />
                            <div>
                              <p className="text-sm font-semibold text-[#111318] group-hover:text-blue-600 transition-colors">
                                {p.name}
                              </p>
                              <p className="text-xs text-[#737780]">{p.category}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-[#111318]">
                            {formatNGN(p.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {query && results.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-[#111318] font-semibold text-base">No solar products found</p>
                  <p className="text-xs text-[#737780] mt-1 max-w-sm mx-auto">
                    No products matched "{query}". Try searching for "panel", "battery", "inverter", or "kit".
                  </p>
                </div>
              )}

              {query && results.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#737780] tracking-wider uppercase mb-2">
                    Products ({results.length})
                  </p>
                  {results.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.25, ease: crispEasing }}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F5F5F7] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#111318] group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#737780] line-clamp-1">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-right shrink-0">
                        <div>
                          <p className="text-sm font-semibold text-[#111318]">{formatNGN(product.price)}</p>
                          <p className="text-[10px] text-[#737780]">Demo Price</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#F5F5F7] px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#737780]">
              <span>Demonstration catalog preview</span>
              <button
                onClick={() => {
                  handleClose();
                  navigate('/shop');
                }}
                className="font-medium text-[#111318] hover:text-blue-600 transition-colors cursor-pointer"
              >
                View all 14 products &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
