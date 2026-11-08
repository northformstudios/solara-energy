import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/motion/Motion';
import { precisionSpring, crispEasing } from '../components/motion/motionCurves';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // Category driven directly by URL query param for clean state
  const selectedCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>(
    'featured'
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number>(15000000); // 15 million max
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange(15000000);
    setSearchParams({});
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesTagline && !matchesDesc) {
          return false;
        }
      }

      // Stock status
      if (inStockOnly && product.availability !== 'In Stock') {
        return false;
      }

      // Price range
      if (product.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly, priceRange]);

  const allCategoryNames = ['All', ...CATEGORIES.map((c) => c.name)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-20 space-y-8">
      {/* Page Header with smooth entrance */}
      <Reveal direction="up" distance={16}>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 subtle-card-shadow flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-semibold">
              <span>Hardware Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111318] tracking-tight font-heading">
              Solar Products & Energy Systems
            </h1>
            <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
              Browse our complete collection of monocrystalline solar panels, pure sine hybrid inverters,
              LiFePO4 lithium wall batteries, and turnkey home kits.
            </p>
          </div>

          {/* Demo Disclaimer Box */}
          <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-black/5 max-w-sm text-xs text-[#737780] flex items-start gap-2.5 shrink-0">
            <ShieldAlert className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Catalogue:</strong> All pricing is quoted in Nigerian Naira (₦) for
              architecture demonstration purposes.
            </span>
          </div>
        </div>
      </Reveal>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-black/5 subtle-card-shadow sticky top-28">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#111318]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </div>
            {(selectedCategory !== 'All' || searchQuery || inStockOnly || sortBy !== 'featured') && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </motion.button>
            )}
          </div>

          {/* Search Input inside sidebar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider block">
              Search Products
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#737780] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords, e.g. 550W..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#111318] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1">
              {allCategoryNames.map((cat) => {
                const count =
                  cat === 'All'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#111318] text-white font-semibold shadow-xs'
                        : 'text-[#737780] hover:bg-[#F5F5F7] hover:text-[#111318]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="text-xs font-bold text-[#111318] uppercase tracking-wider block">
              Availability
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#111318] select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#111318] focus:ring-black h-4 w-4 cursor-pointer"
              />
              <span>In Stock Only ({PRODUCTS.filter((p) => p.availability === 'In Stock').length})</span>
            </label>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#111318] uppercase tracking-wider block">
                Max Price
              </label>
              <span className="text-xs font-semibold text-[#111318]">
                ₦{(priceRange / 1000000).toFixed(1)}M
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={100000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#111318] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₦100K</span>
              <span>₦15M</span>
            </div>
          </div>
        </aside>

        {/* Products Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-black/5 subtle-card-shadow flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5F5F7] text-xs font-semibold text-[#111318] cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </motion.button>

              <span className="text-xs text-[#737780]">
                Showing <strong className="text-[#111318]">{filteredProducts.length}</strong> of{' '}
                {PRODUCTS.length} solar products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#737780] hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-[#111318] bg-[#F5F5F7] border border-transparent rounded-xl px-3 py-2 outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A – Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'All' || searchQuery || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#737780]">Active:</span>
              <AnimatePresence>
                {selectedCategory !== 'All' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-medium"
                  >
                    Category: {selectedCategory}
                    <button onClick={() => handleCategoryChange('All')} className="hover:text-red-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                {searchQuery && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-medium"
                  >
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
                {inStockOnly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-medium"
                  >
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)} className="hover:text-red-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline font-medium ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid with smooth layout animation */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-black/5 subtle-card-shadow space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111318]">No solar products matched your criteria</h3>
              <p className="text-xs text-[#737780] max-w-sm mx-auto">
                Try widening your price range, clearing search terms, or exploring all product categories.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              layout={!shouldReduceMotion}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout={!shouldReduceMotion}
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: crispEasing }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal with AnimatePresence */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#111318]/50 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={precisionSpring}
              className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="text-base font-bold text-[#111318]">Filter Products</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">Category</span>
                  <div className="space-y-1">
                    {allCategoryNames.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          handleCategoryChange(cat);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                          selectedCategory === cat
                            ? 'bg-[#111318] text-white font-semibold'
                            : 'text-[#737780] hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* In stock */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#111318]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-[#111318] h-4 w-4"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-gray-600 bg-gray-100 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111318] cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
