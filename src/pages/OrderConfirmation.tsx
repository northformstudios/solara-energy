import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Order } from '../types';
import { formatNGN } from '../data/products';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  User,
  CreditCard,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from '../components/motion/Motion';
import { precisionSpring } from '../components/motion/motionCurves';

export const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const shouldReduceMotion = useReducedMotion();

  // Lazy initializer avoids setState-in-effect and loads from localStorage synchronously
  const [order] = useState<Order | null>(() => {
    try {
      const stored =
        (orderId && localStorage.getItem(`solara_order_${orderId}`)) ||
        localStorage.getItem('solara_last_order');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Fire confetti celebration on page mount
    try {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#8EA9FF', '#DCE5FF', '#111318', '#10B981'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Fallback demo order if visited directly without state
  const displayOrder: Order = order || {
    id: orderId || 'SLR-ORD-2026-8819',
    createdAt: '2026-11-06T13:00:00.000Z',
    customer: {
      fullName: 'Chief Babatunde Alabi',
      email: 'babatunde.alabi@example.com',
      phone: '+234 803 555 0192',
    },
    delivery: {
      state: 'Lagos',
      city: 'Lekki Phase 1',
      address: 'Plot 12, Block 4, Admiralty Way',
      deliveryInstructions: 'Delivery vehicle access via Gate 2.',
    },
    items: [
      {
        product: {
          id: 'solara-home-essential-kit',
          name: 'Solara Home Essential 3.5kVA / 5kWh Turnkey Solar Solution',
          tagline: 'Complete package engineered to power lights, refrigerators, fans and electronics.',
          category: 'Complete Solar Kits',
          price: 4950000,
          rating: 4.9,
          reviewsCount: 37,
          availability: 'In Stock',
          shortDescription: 'The definitive all-in-one residential package.',
          fullDescription: 'Comprehensive system.',
          keyFeatures: ['Complete roof rail mounting', 'Zero maintenance'],
          specifications: [{ label: 'Capacity', value: '5.12 kWh' }],
          packageIncludes: ['6x 550W Panels', 'Nexus Inverter', 'Battery'],
          images: [
            'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
          ],
          warrantyIllustrative: 'Illustrative 5-year system warranty',
        },
        quantity: 1,
      },
    ],
    subtotal: 4950000,
    deliveryFee: 25000,
    total: 4975000,
    paymentMethod: 'Simulated Debit Card / Paystack',
    paymentStatus: 'Simulated Paid',
    orderStatus: 'Confirmed',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24 space-y-8">
      {/* Top Simulated Order Header */}
      <Reveal direction="up" distance={16}>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 subtle-card-shadow text-center space-y-4">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={precisionSpring}
            className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Simulated Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] font-heading mt-2">
              Thank you for your demonstration order!
            </h1>
            <p className="text-xs sm:text-sm text-[#737780] max-w-md mx-auto">
              Your simulated clean energy equipment dispatch order has been successfully logged.
            </p>
          </div>

          {/* Order ID Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#F5F5F7] border border-black/5 text-xs">
            <span className="text-[#737780]">Order Reference:</span>
            <span className="font-mono font-extrabold text-[#111318] text-sm">
              {displayOrder.id}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-[#F5F5F7] hover:bg-gray-200 text-[#111318] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Simulated Receipt
            </motion.button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/shop"
                className="px-6 py-2.5 rounded-full bg-[#111318] hover:bg-black text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* Demonstration Transparency Notice */}
      <Reveal direction="up" distance={14} delay={0.1}>
        <div className="bg-[#DCE5FF]/40 border border-[#8EA9FF]/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#111318]">
          <ShieldCheck className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Notice of Demonstration Status:</strong> This confirmation confirms a simulated purchase.
            No live bank account or payment card has been billed. This demonstration proves the complete end-to-end
            shopping, inventory selection, customer data capture, and receipt generation flow for Solara Energy.
          </p>
        </div>
      </Reveal>

      {/* Simulated Logistics Tracker */}
      <Reveal direction="up" distance={16} delay={0.15}>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-6">
          <h2 className="text-sm font-bold text-[#111318] uppercase tracking-wider">
            Simulated Logistics & Engineering Dispatch Timeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Step 1 • Completed
              </span>
              <p className="text-xs font-bold text-[#111318]">Order Validation</p>
              <p className="text-[11px] text-[#737780]">Component inventory reserved</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-blue-200/60 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Step 2 • In Progress
              </span>
              <p className="text-xs font-bold text-[#111318]">Engineering Site Prep</p>
              <p className="text-[11px] text-[#737780]">Packaging panels & lithium packs</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-gray-100 space-y-1 opacity-70">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Step 3 • Pending</span>
              <p className="text-xs font-bold text-[#111318]">Freight Delivery & Install</p>
              <p className="text-[11px] text-[#737780]">Estimated 2–4 business days</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Order Details & Summary Card */}
      <StaggerGroup staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer & Delivery */}
        <StaggerItem>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-4 h-full">
            <h3 className="text-xs font-bold text-[#111318] uppercase tracking-wider border-b border-gray-100 pb-2">
              Recipient & Freight Address
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">{displayOrder.customer.fullName}</p>
                  <p className="text-[#737780]">{displayOrder.customer.email}</p>
                  <p className="text-[#737780]">{displayOrder.customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-gray-50">
                <MapPin className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">{displayOrder.delivery.state} State, Nigeria</p>
                  <p className="text-[#737780]">{displayOrder.delivery.city}</p>
                  <p className="text-[#737780]">{displayOrder.delivery.address}</p>
                  {displayOrder.delivery.deliveryInstructions && (
                    <p className="text-[11px] text-[#737780] italic mt-1">
                      Note: "{displayOrder.delivery.deliveryInstructions}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-gray-50">
                <CreditCard className="w-4 h-4 text-[#8EA9FF] shrink-0" />
                <div>
                  <p className="font-semibold text-[#111318]">{displayOrder.paymentMethod}</p>
                  <p className="text-[11px] text-emerald-600 font-bold">{displayOrder.paymentStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Itemized Financial Summary */}
        <StaggerItem>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-4 h-full">
            <h3 className="text-xs font-bold text-[#111318] uppercase tracking-wider border-b border-gray-100 pb-2">
              Itemized Order Breakdown
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto">
              {displayOrder.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between items-start text-xs gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-[#111318] truncate">{product.name}</p>
                    <p className="text-[11px] text-[#737780]">
                      Qty: {quantity} × {formatNGN(product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-[#111318] shrink-0">
                    {formatNGN(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-[#737780]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111318]">{formatNGN(displayOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#737780]">
                <span>Delivery Charge ({displayOrder.delivery.state})</span>
                <span className="font-semibold text-[#111318]">{formatNGN(displayOrder.deliveryFee)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline text-sm font-extrabold text-[#111318]">
                <span>Total Demonstration Amount</span>
                <span className="text-lg text-[#111318] font-heading">{formatNGN(displayOrder.total)}</span>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
};
