import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, formatNGN } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { QuoteModal } from '../components/QuoteModal';
import {
  ShoppingBag,
  Plus,
  Minus,
  ShieldCheck,
  Zap,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from '../components/motion/Motion';
import { crispEasing, precisionSpring } from '../components/motion/motionCurves';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'package'>('specs');
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111318]">Product Not Found</h1>
        <p className="text-sm text-[#737780]">
          The solar product model you requested does not exist in our demonstration catalog.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111318] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalogue
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-12">
      {/* Breadcrumb Navigation */}
      <Reveal direction="none" duration={0.3}>
        <nav className="flex items-center gap-2 text-xs text-[#737780] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#111318] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link to="/shop" className="hover:text-[#111318] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#111318] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-[#111318] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </Reveal>

      {/* Main Split Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Responsive Image Gallery with smooth cross-fade */}
        <Reveal direction="up" distance={16} className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden bg-white border border-black/5 subtle-card-shadow">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.25, ease: crispEasing }}
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </AnimatePresence>

            {/* Watermark badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-[#111318] shadow-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.availability === 'In Stock' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                />
                {product.availability}
              </span>
            </div>

            {product.badge && (
              <div className="absolute top-4 right-4 z-10">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#111318] text-white uppercase tracking-wider shadow-sm">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <motion.button
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#111318] shadow-md ring-2 ring-[#8EA9FF]/50'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Quick Assurance Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-white rounded-2xl border border-black/5 text-center space-y-1">
              <Truck className="w-4 h-4 text-[#8EA9FF] mx-auto" />
              <p className="text-[11px] font-bold text-[#111318]">White-Glove Delivery</p>
              <p className="text-[10px] text-[#737780]">{product.leadTime || 'Nationwide freight'}</p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-black/5 text-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#8EA9FF] mx-auto" />
              <p className="text-[11px] font-bold text-[#111318]">Illustrative Warranty</p>
              <p className="text-[10px] text-[#737780]">Tier-1 Craftsmanship</p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-black/5 text-center space-y-1">
              <Zap className="w-4 h-4 text-[#8EA9FF] mx-auto" />
              <p className="text-[11px] font-bold text-[#111318]">Certified Engineering</p>
              <p className="text-[10px] text-[#737780]">Standard compliance</p>
            </div>
          </div>
        </Reveal>

        {/* Right: Product Details & Purchase Actions */}
        <Reveal direction="up" distance={20} delay={0.1} className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] tracking-tight mt-1 font-heading">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#737780] mt-2 font-normal leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="p-4 rounded-2xl bg-white border border-black/5 subtle-card-shadow space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#111318]">
                {formatNGN(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatNGN(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#737780] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Demonstration prototype price (NGN) • Inclusive of illustrative VAT
            </p>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#111318]/80 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Bullet Highlights */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-[#111318] uppercase tracking-wider">
              Core Highlights
            </p>
            <ul className="space-y-2">
              {product.keyFeatures.slice(0, 4).map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#737780]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Cart Controls */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 bg-white rounded-full p-1 shadow-xs">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#111318] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ y: -4, opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xs font-bold px-4 min-w-[24px] text-center"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#111318] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-full text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-md cursor-pointer ${
                  addedFeedback ? 'bg-emerald-600' : 'bg-[#111318] hover:bg-black'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart • {formatNGN(product.price * quantity)}
                  </>
                )}
              </motion.button>
            </div>

            {/* Quote and Buy Now Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-3 px-4 rounded-full bg-[#DCE5FF] hover:bg-[#8EA9FF]/40 text-[#111318] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#111318]" />
                Request a Quote
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-gray-100 text-[#111318] text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
              >
                Demo Buy Now
              </motion.button>
            </div>
          </div>

          {/* Disclaimer text */}
          <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-black/5 text-[11px] text-[#737780] leading-relaxed">
            <strong>Demonstration Specification Note:</strong> All technical ratings, dimensions, and warranty
            benchmarks are purely illustrative and intended to display platform design capability.
          </div>
        </Reveal>
      </div>

      {/* Tabs Section with fluid sliding underline indicator */}
      <Reveal direction="up" distance={20} className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 subtle-card-shadow space-y-6">
        <div className="flex border-b border-gray-100 gap-6">
          {(
            [
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'features', label: 'Detailed Features & Architecture' },
              { id: 'package', label: "What's in the Box" },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isSelected ? 'text-[#111318]' : 'text-[#737780] hover:text-[#111318]'
                }`}
              >
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="productTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111318]"
                    transition={precisionSpring}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: crispEasing }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-gray-100 text-xs"
                  >
                    <span className="text-[#737780] font-medium">{spec.label}</span>
                    <span className="text-[#111318] font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#737780]">
                <span>Warranty Framework:</span>
                <span className="font-semibold text-[#111318]">{product.warrantyIllustrative}</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: crispEasing }}
              className="space-y-4"
            >
              <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
                {product.fullDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F5F7] text-xs">
                    <Zap className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                    <span className="text-[#111318] font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'package' && (
            <motion.div
              key="package"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: crispEasing }}
              className="space-y-3"
            >
              <p className="text-xs text-[#737780]">
                Every Solara product arrives securely packaged with all critical interconnect hardware:
              </p>
              <ul className="space-y-2">
                {product.packageIncludes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] text-xs text-[#111318] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8">
          <Reveal direction="up" distance={16} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
                Complementary Systems
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111318] font-heading mt-0.5">
                Related {product.category}
              </h2>
            </div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-[#111318] hover:text-blue-600 transition-colors flex items-center gap-1 group"
            >
              <span>See all {product.category}</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </Reveal>

          <StaggerGroup staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* Quote Modal with product preselected */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedProduct={product.name}
      />
    </div>
  );
};
