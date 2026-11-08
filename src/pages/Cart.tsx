import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNGN, NIGERIAN_STATES, DELIVERY_RATES } from '../data/products';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/motion/Motion';
import { crispEasing } from '../components/motion/motionCurves';

export const Cart: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryState,
    setDeliveryState,
    deliveryFee,
    total,
    itemCount,
  } = useCart();

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: crispEasing }}
          className="w-20 h-20 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-[#737780]"
        >
          <ShoppingBag className="w-10 h-10 opacity-40" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] font-heading">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#737780] max-w-md mx-auto">
            You haven't added any solar panels, inverters, or battery storage units yet. Browse our
            catalogue to start building your clean energy system.
          </p>
        </div>
        <div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all shadow-md"
            >
              <span>Explore Product Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24 space-y-8">
      {/* Page Title */}
      <Reveal direction="up" distance={14}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] font-heading">
              Shopping Cart
            </h1>
            <p className="text-xs text-[#737780] mt-1">
              Review your selected solar hardware components ({itemCount} item{itemCount !== 1 ? 's' : ''})
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={clearCart}
            className="self-start sm:self-auto text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Cart
          </motion.button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow divide-y divide-gray-100">
            <AnimatePresence initial={false}>
              {items.map(({ product, quantity }) => (
                <motion.div
                  layout={!shouldReduceMotion}
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.35, ease: crispEasing }}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#F5F5F7] shrink-0 border border-gray-100 img-zoom-container"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#737780]">
                        {product.category}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="block text-sm font-bold text-[#111318] hover:text-blue-600 transition-colors truncate"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-[#737780]">
                        Unit: {formatNGN(product.price)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {product.availability}
                      </span>
                    </div>
                  </div>

                  {/* Quantity + Subtotal + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-gray-200 bg-[#F5F5F7] rounded-full p-1">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-[#111318] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </motion.button>
                      <span className="text-xs font-bold px-3 min-w-[20px] text-center">{quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-[#111318] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    </div>

                    {/* Total price for line */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm font-extrabold text-[#111318]">
                        {formatNGN(product.price * quantity)}
                      </p>
                      <p className="text-[10px] text-[#737780]">Demo Total</p>
                    </div>

                    {/* Delete */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                      title="Remove item from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#111318] hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Delivery Estimator */}
        <Reveal direction="up" distance={20} delay={0.1} className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-6 sticky top-28">
            <h2 className="text-base font-bold text-[#111318] font-heading border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            {/* Delivery Destination State Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111318] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8EA9FF]" />
                Delivery Destination State
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white cursor-pointer"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st} — {formatNGN(DELIVERY_RATES[st] || DELIVERY_RATES['Default'])}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#737780]">
                Freight insured for solar panel glass and lithium batteries.
              </p>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-[#737780]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#111318]">{formatNGN(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#737780]">
                <span>Estimated Heavy Freight ({deliveryState})</span>
                <span className="font-semibold text-[#111318]">{formatNGN(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-[#737780]">
                <span>Simulated VAT (7.5%)</span>
                <span className="text-emerald-700 font-medium">Included in Demo Price</span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline text-sm font-extrabold text-[#111318]">
                <span>Total Amount</span>
                <span className="text-xl text-[#111318] font-heading">{formatNGN(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 rounded-full bg-[#111318] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Demonstration Warning */}
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] text-[11px] text-[#737780] flex items-start gap-2 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Checkout:</strong> No real payment card or financial data is
                required. All order totals are simulated.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
