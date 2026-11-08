import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatNGN } from '../data/products';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { precisionSpring, crispEasing } from './motion/motionCurves';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
  } = useCart();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#111318]/50 backdrop-blur-sm cursor-pointer"
            onClick={closeCartDrawer}
          />

          {/* Animated Slide-Over Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={precisionSpring}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#111318]" />
                  <h2 className="text-lg font-bold text-[#111318]">Your Cart</h2>
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#DCE5FF] text-[#111318]"
                  >
                    {itemCount}
                  </motion.span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCartDrawer}
                  className="p-2 rounded-full text-gray-400 hover:text-[#111318] hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Demonstration Notice */}
              <div className="bg-[#F5F5F7] px-6 py-2.5 border-b border-gray-100 text-[11px] text-[#737780] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8EA9FF] shrink-0" />
                <span>Simulated checkout preview • No live card charge</span>
              </div>

              {/* Cart Item List with animated removal */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto mb-4 text-[#737780]">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <h3 className="text-base font-semibold text-[#111318]">Your cart is empty</h3>
                    <p className="text-xs text-[#737780] mt-1 mb-6 max-w-xs mx-auto">
                      Explore our premium solar panels, hybrid inverters, and battery storage solutions.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        closeCartDrawer();
                        navigate('/shop');
                      }}
                      className="px-6 py-3 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all shadow-md cursor-pointer"
                    >
                      Explore Products
                    </motion.button>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3, ease: crispEasing }}
                        className="flex gap-4 p-3.5 rounded-2xl border border-gray-100 bg-[#FAFAFA] hover:border-gray-200 transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-[#111318] line-clamp-1">{product.name}</h4>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => removeFromCart(product.id)}
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                            <p className="text-[11px] text-[#737780]">{product.category}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1">
                            <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="p-1 hover:bg-gray-100 text-[#111318] rounded-l-lg cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="text-xs font-semibold px-2.5 min-w-[20px] text-center">
                                {quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-1 hover:bg-gray-100 text-[#111318] rounded-r-lg cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>
                            <span className="text-xs font-bold text-[#111318]">
                              {formatNGN(product.price * quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-[#FAFAFA] space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#737780]">
                      <span>Subtotal</span>
                      <motion.span
                        key={subtotal}
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 1 }}
                        className="font-semibold text-[#111318]"
                      >
                        {formatNGN(subtotal)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between text-xs text-[#737780]">
                      <span>Delivery calculation</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-[#111318]">
                      <span>Estimated Total</span>
                      <motion.span
                        key={subtotal}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                      >
                        {formatNGN(subtotal)}
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full py-3.5 rounded-full bg-[#111318] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleViewCart}
                      className="w-full py-3 rounded-full bg-white hover:bg-gray-100 text-[#111318] text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
                    >
                      View Full Cart & Shipping Calculator
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
