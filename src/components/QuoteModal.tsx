import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { NIGERIAN_STATES } from '../data/products';
import type { QuoteRequestData } from '../types';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { precisionSpring } from './motion/motionCurves';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Duplex / Terrace',
    state: 'Lagos',
    estimatedPowerNeeds: '5kVA (Standard Home with Refrigerator & Fans)',
    productsOfInterest: preselectedProduct ? [preselectedProduct] : ['Complete Turnkey Solar Kit'],
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `SLR-QT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(generatedRef);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8EA9FF', '#DCE5FF', '#111318'],
        });
      } catch {
        // ignore if canvas-confetti fails
      }
    }, 700);
  };

  const propertyTypes = [
    'Residential Duplex / Terrace',
    'Apartment / Flat',
    'Detached Executive Villa / Mansion',
    'Commercial Office / Branch',
    'Hospital / Healthcare Clinic',
    'Hospitality / Hotel / Shortlet',
    'Off-Grid Agricultural Farm',
  ];

  const powerNeedsOptions = [
    '2.5kVA – 3.5kVA (Lighting, TVs, Laptops, Fans, Inverter Fridge)',
    '5kVA (Standard 3-4 Bedroom Home with Fridge, Freezer, Wash Machine)',
    '10kVA (Executive Home with 2-3 Inverter Air Conditioners & Borehole)',
    '15kVA – 20kVA (Luxury Duplex / Small Enterprise with Multi-AC)',
    '30kVA+ (Commercial 3-Phase Facility / Industrial Microgrid)',
  ];

  const solutionsOptions = [
    'Complete Turnkey Solar Kit',
    'PureBlack Solar Panels Array',
    'Nexus Hybrid Inverter Upgrade',
    'PowerCell Lithium Battery Storage',
    'Nomad Portable Solar Generator',
    'Accessories & MPPT Controllers',
  ];

  const handleSolutionToggle = (solution: string) => {
    setFormData((prev) => {
      const exists = prev.productsOfInterest.includes(solution);
      if (exists) {
        return {
          ...prev,
          productsOfInterest: prev.productsOfInterest.filter((s) => s !== solution),
        };
      } else {
        return {
          ...prev,
          productsOfInterest: [...prev.productsOfInterest, solution],
        };
      }
    });
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#111318]/70 backdrop-blur-md cursor-pointer"
            onClick={handleReset}
          />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 14 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 14 }}
            transition={precisionSpring}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="bg-[#111318] text-white p-6 sm:p-8 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#8EA9FF] text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tailored Solar Engineering</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading">
                  Request a Solar Installation Quote
                </h2>
                <p className="text-xs text-white/70 mt-1 max-w-md">
                  Receive a customized solar sizing blueprint and component proposal for your property.
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {submittedRef ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111318]">
                    Installation Enquiry Registered
                  </h3>
                  <p className="text-sm text-[#737780] max-w-md mx-auto">
                    Thank you, <strong className="text-[#111318]">{formData.name}</strong>. A Solara clean energy technical
                    lead will review your property profile for{' '}
                    <strong className="text-[#111318]">{formData.state} State</strong>.
                  </p>

                  <div className="bg-[#F5F5F7] p-5 rounded-2xl max-w-md mx-auto text-left border border-black/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#737780]">Quote Reference:</span>
                      <span className="font-mono font-bold text-[#111318]">{submittedRef}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#737780]">Target Capacity:</span>
                      <span className="font-semibold text-[#111318]">{formData.estimatedPowerNeeds.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#737780]">Property Type:</span>
                      <span className="text-[#111318]">{formData.propertyType}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#737780]">Simulated Dispatch:</span>
                      <span className="text-emerald-700 font-semibold">Ready for preliminary review</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
                    >
                      Close Window
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Demo banner */}
                  <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-black/5 flex items-center gap-2.5 text-xs text-[#737780]">
                    <ShieldAlert className="w-4 h-4 text-[#8EA9FF] shrink-0" />
                    <span>
                      Demonstration enquiry simulator. Submitting creates a realistic simulated quote ticket.
                    </span>
                  </div>

                  {/* Personal Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Aliyu Balogun"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aliyu@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  {/* Property & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                        Property Type *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                      >
                        {propertyTypes.map((pt) => (
                          <option key={pt} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                        State (Nigeria) *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Estimated Power Needs */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Estimated Power Needs *
                    </label>
                    <select
                      value={formData.estimatedPowerNeeds}
                      onChange={(e) => setFormData({ ...formData, estimatedPowerNeeds: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                    >
                      {powerNeedsOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Products or Solution of Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-2">
                      Products or Solutions of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {solutionsOptions.map((item) => {
                        const isSelected = formData.productsOfInterest.includes(item);
                        return (
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            key={item}
                            onClick={() => handleSolutionToggle(item)}
                            className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#DCE5FF] border-[#8EA9FF] text-[#111318] font-semibold'
                                : 'bg-white border-gray-200 text-[#737780] hover:border-gray-300'
                            }`}
                          >
                            {item}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                      Additional Information (Roof type, current generator size, appliances)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      placeholder="e.g. 4-bedroom detached duplex in Lekki Phase 1 with a concrete roof deck. Looking to eliminate daytime generator usage for 2 ACs."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#737780] hover:text-[#111318] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        'Generating Proposal...'
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Submit Quote Request
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
