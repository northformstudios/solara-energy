import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { precisionSpring } from './motion/motionCurves';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useCart();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.95 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
          transition={precisionSpring}
          className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="glass-dark text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#8EA9FF]/20 flex items-center justify-center shrink-0 text-[#8EA9FF]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium pr-2 leading-snug">{toastMessage}</p>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => showToast('')}
              className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
