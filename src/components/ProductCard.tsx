import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatNGN } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Zap, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { crispEasing } from './motion/motionCurves';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleQuickAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease: crispEasing }}
      className="group bg-white rounded-3xl p-5 border border-black/5 subtle-card-shadow hover:border-[#8EA9FF]/40 hover:shadow-xl transition-colors duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Meta: Category & Badge */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737780]">
            {product.category}
          </span>
          {product.badge && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCE5FF] text-[#111318] uppercase tracking-wide">
              {product.badge}
            </span>
          )}
        </div>

        {/* Large Product Imagery with subtle scale transition */}
        <Link
          to={`/product/${product.id}`}
          className="block relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5F5F7] mb-5 img-zoom-container"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center will-change-transform"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-xs transition-colors ${
                product.availability === 'In Stock'
                  ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/20'
                  : 'bg-blue-500/15 text-blue-800 border border-blue-500/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  product.availability === 'In Stock' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
              />
              {product.availability}
            </span>
          </div>
        </Link>

        {/* Title and Tagline */}
        <Link to={`/product/${product.id}`} className="block group-hover:text-blue-600 transition-colors">
          <h3 className="text-base font-bold text-[#111318] leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[#737780] mt-1.5 line-clamp-2 leading-relaxed font-normal">
          {product.tagline}
        </p>

        {/* Key Feature Highlight Pill */}
        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#737780] bg-[#F5F5F7] px-2.5 py-1.5 rounded-xl border border-black/5">
            <Zap className="w-3 h-3 text-[#8EA9FF] shrink-0" />
            <span className="truncate">{product.keyFeatures[0]}</span>
          </div>
        )}
      </div>

      {/* Bottom Row: Price & Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#111318]">
              {formatNGN(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatNGN(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#737780] font-medium tracking-wide">
            Demo Price (NGN)
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#F5F5F7] hover:bg-[#DCE5FF] text-[#111318]'
            }`}
            title="Quick add to cart"
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <Check className="w-4 h-4 animate-in zoom-in-50 duration-200" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </motion.button>
          <Link
            to={`/product/${product.id}`}
            className="px-3.5 py-2 rounded-full bg-[#111318] hover:bg-black text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs group-hover:bg-blue-600"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
