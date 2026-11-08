import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNGN, NIGERIAN_STATES } from '../data/products';
import type { CustomerInfo, DeliveryInfo, Order } from '../types';
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Building,
  Zap,
  Loader2,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/motion/Motion';

export const Checkout: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryState,
    setDeliveryState,
    deliveryFee,
    total,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Customer state
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
  });

  // Delivery state
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    state: deliveryState,
    city: '',
    address: '',
    deliveryInstructions: '',
  });

  // Simulated Payment Method selection
  const [paymentOption, setPaymentOption] = useState<
    'demo-card' | 'demo-bank-transfer' | 'demo-solar-financing'
  >('demo-card');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111318]">Your cart is empty</h1>
        <p className="text-sm text-[#737780]">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111318] text-white text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleStateChange = (newState: string) => {
    setDeliveryState(newState);
    setDelivery((prev) => ({ ...prev, state: newState }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setErrorMsg('Please complete all required customer contact details.');
      return;
    }

    if (!delivery.city.trim() || !delivery.address.trim()) {
      setErrorMsg('Please complete your street address and delivery city.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const generatedOrderId = `SLR-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder: Order = {
        id: generatedOrderId,
        createdAt: new Date().toISOString(),
        customer,
        delivery: {
          ...delivery,
          state: deliveryState,
        },
        items: [...items],
        subtotal,
        deliveryFee,
        total,
        paymentMethod:
          paymentOption === 'demo-card'
            ? 'Simulated Debit Card / Paystack'
            : paymentOption === 'demo-bank-transfer'
            ? 'Simulated Corporate Bank Transfer'
            : 'Simulated Solar Clean Energy Financing',
        paymentStatus: 'Simulated Paid',
        orderStatus: 'Confirmed',
      };

      try {
        localStorage.setItem(`solara_order_${generatedOrderId}`, JSON.stringify(newOrder));
        localStorage.setItem('solara_last_order', JSON.stringify(newOrder));
      } catch (err) {
        console.warn('Failed to save order to localStorage', err);
      }

      // Clear cart
      clearCart();

      // Redirect to Order Confirmation
      navigate(`/order-confirmation/${generatedOrderId}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24 space-y-8">
      {/* Page Title */}
      <Reveal direction="up" distance={14}>
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] font-heading">
            Demonstration Checkout
          </h1>
          <p className="text-xs text-[#737780] mt-1">
            Complete your delivery information below to generate a simulated order confirmation.
          </p>
        </div>
      </Reveal>

      {/* Clear Demonstration Warning Banner */}
      <Reveal direction="up" distance={14} delay={0.05}>
        <div className="bg-[#DCE5FF]/50 border border-[#8EA9FF]/50 rounded-2xl p-4 flex items-start sm:items-center gap-3 text-xs text-[#111318]">
          <ShieldAlert className="w-5 h-5 text-[#111318] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong>Interactive Demonstration Environment:</strong> This checkout simulates a live
            e-commerce purchasing workflow. No real financial credit card details or transactions are processed.
            Architecture hooks are pre-structured for production payment gateway integration (Paystack / Flutterwave).
          </p>
        </div>
      </Reveal>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Information */}
            <Reveal direction="up" distance={16} delay={0.1}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-5">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#111318] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base font-bold text-[#111318] font-heading">
                    Customer Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="e.g. Dr. Ngozi Adeyemi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="ngozi@domain.ng"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                    <p className="text-[10px] text-[#737780] mt-1">Order receipt will be dispatched here</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Phone Number (WhatsApp-enabled) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+234 803 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                    <p className="text-[10px] text-[#737780] mt-1">For delivery driver dispatch coordination</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Delivery Information */}
            <Reveal direction="up" distance={16} delay={0.15}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-5">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#111318] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-base font-bold text-[#111318] font-heading">
                    Delivery Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      State (Nigeria) *
                    </label>
                    <select
                      value={deliveryState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white cursor-pointer"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      City / Town / LGA *
                    </label>
                    <input
                      type="text"
                      required
                      value={delivery.city}
                      onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                      placeholder="e.g. Ikeja GRA or Lekki Phase 1"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Street Address & House Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={delivery.address}
                      onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                      placeholder="e.g. 18 Bourdillon Road, Ikoyi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Delivery Instructions (Estate gate code, landmarks, roof access)
                    </label>
                    <textarea
                      rows={2}
                      value={delivery.deliveryInstructions}
                      onChange={(e) =>
                        setDelivery({ ...delivery, deliveryInstructions: e.target.value })
                      }
                      placeholder="e.g. Security gate access code required; parking slot available in front of duplex."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 3. Simulated Payment Method Selection */}
            <Reveal direction="up" distance={16} delay={0.2}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-5">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#111318] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-base font-bold text-[#111318] font-heading">
                    Simulated Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Demo Debit Card */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      paymentOption === 'demo-card'
                        ? 'border-[#111318] bg-[#F5F5F7] ring-1 ring-[#111318]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentOption === 'demo-card'}
                      onChange={() => setPaymentOption('demo-card')}
                      className="mt-1 text-[#111318] focus:ring-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#111318] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#8EA9FF]" />
                          Simulated Instant Card (Paystack Demo Sandbox)
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Instant Approval
                        </span>
                      </div>
                      <p className="text-[11px] text-[#737780] mt-1">
                        No real card number is needed. Simulates an encrypted tokenized card checkout.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Bank Transfer */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      paymentOption === 'demo-bank-transfer'
                        ? 'border-[#111318] bg-[#F5F5F7] ring-1 ring-[#111318]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentOption === 'demo-bank-transfer'}
                      onChange={() => setPaymentOption('demo-bank-transfer')}
                      className="mt-1 text-[#111318] focus:ring-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#111318] flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#8EA9FF]" />
                        Simulated Corporate Wire Transfer
                      </span>
                      <p className="text-[11px] text-[#737780] mt-1">
                        Generates a simulated Solara Energy Nigeria bank account invoice reference.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Solar Financing */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      paymentOption === 'demo-solar-financing'
                        ? 'border-[#111318] bg-[#F5F5F7] ring-1 ring-[#111318]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentOption === 'demo-solar-financing'}
                      onChange={() => setPaymentOption('demo-solar-financing')}
                      className="mt-1 text-[#111318] focus:ring-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#111318] flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#8EA9FF]" />
                        Simulated Clean Energy Clean-Power Financing (Buy Now Pay Later)
                      </span>
                      <p className="text-[11px] text-[#737780] mt-1">
                        Demonstrates structured 12-to-24 month renewable loan payment modeling.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <Reveal direction="up" distance={16} delay={0.25} className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-6 sticky top-28">
              <h2 className="text-base font-bold text-[#111318] font-heading border-b border-gray-100 pb-3">
                Order Review ({items.length} product{items.length !== 1 ? 's' : ''})
              </h2>

              {/* Itemized list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#111318] truncate">{product.name}</p>
                        <p className="text-[#737780] text-[11px]">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#111318] shrink-0">
                      {formatNGN(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
                <div className="flex justify-between text-[#737780]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111318]">{formatNGN(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#737780]">
                  <span>Insured Heavy Freight ({deliveryState})</span>
                  <span className="font-semibold text-[#111318]">{formatNGN(deliveryFee)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline text-sm font-extrabold text-[#111318]">
                  <span>Total Due (NGN)</span>
                  <span className="text-xl text-[#111318] font-heading">{formatNGN(total)}</span>
                </div>
                <p className="text-[10px] text-[#737780]">Simulated demonstration price</p>
              </div>

              {/* Place Order CTA with motion */}
              <motion.button
                whileHover={shouldReduceMotion || isProcessing ? undefined : { scale: 1.01 }}
                whileTap={isProcessing ? undefined : { scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#111318] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Simulated Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Place Demonstration Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <div className="text-center">
                <Link
                  to="/cart"
                  className="text-xs font-semibold text-[#737780] hover:text-[#111318] inline-flex items-center gap-1 group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Return to Cart</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </form>
    </div>
  );
};
