import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Calculator,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { NIGERIAN_STATES } from '../data/products';
import type { QuoteRequestData } from '../types';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/motion/Motion';
import { crispEasing } from '../components/motion/motionCurves';

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Quote form state
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Duplex / Terrace',
    state: 'Lagos',
    estimatedPowerNeeds: '5kVA (Standard Home with Refrigerator & Fans)',
    productsOfInterest: ['Complete Turnkey Solar Kit'],
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Interactive Power Sizing Calculator State
  const [calcAppliances, setCalcAppliances] = useState({
    refrigerators: 1,
    freezers: 0,
    inverterAcs: 1,
    waterPump: false,
    fansAndLights: true,
    tvsAndLaptops: true,
  });

  // Calculate recommended system size based on appliance selection
  const estimatedKva = (() => {
    let watts = 0;
    if (calcAppliances.fansAndLights) watts += 400;
    if (calcAppliances.tvsAndLaptops) watts += 350;
    watts += calcAppliances.refrigerators * 250;
    watts += calcAppliances.freezers * 300;
    watts += calcAppliances.inverterAcs * 1200;
    if (calcAppliances.waterPump) watts += 1100;

    if (watts <= 1500) return { kva: '2.5kVA – 3.5kVA', kit: 'Solara Nomad or Basic Setup', battery: '3kWh – 5kWh' };
    if (watts <= 3500) return { kva: '5kVA Hybrid', kit: 'Solara Home Essential 3.5kVA / 5kWh', battery: '5kWh – 10kWh' };
    if (watts <= 6500) return { kva: '10kVA Executive', kit: 'Solara Executive Villa 10kVA / 20kWh', battery: '15kWh – 20kWh' };
    return { kva: '15kVA – 20kVA Commercial', kit: 'Solara PowerTower Modular System', battery: '20kWh+' };
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ticket = `SLR-QT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticket);

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8EA9FF', '#DCE5FF', '#111318'],
        });
      } catch {
        // ignore
      }
    }, 800);
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24 space-y-16">
      {/* Page Header */}
      <Reveal direction="up" distance={16} className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#8EA9FF]" />
          <span>Consultation & System Sizing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111318] tracking-tight font-heading">
          Request a Solar Installation Quote
        </h1>
        <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
          Provide your property details and power objectives below. Our clean energy systems team will
          generate an architectural assessment and turnkey estimate for your site.
        </p>
      </Reveal>

      {/* Interactive Power Sizing Calculator Tool */}
      <Reveal direction="up" distance={20} delay={0.1}>
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 subtle-card-shadow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#DCE5FF] text-[#111318] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#111318]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111318] font-heading">
                  Interactive Power Load Estimator
                </h2>
                <p className="text-[11px] text-[#737780]">
                  Select appliances to estimate your required inverter capacity and battery storage
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F5F5F7] text-[#111318] self-start sm:self-auto">
              Live Sizing Guide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Appliance Toggles */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#F5F5F7] rounded-2xl space-y-1">
                <p className="text-xs font-semibold text-[#111318]">Inverter AC (1.5HP)</p>
                <div className="flex items-center gap-2 pt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      key={num}
                      type="button"
                      onClick={() => setCalcAppliances({ ...calcAppliances, inverterAcs: num })}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        calcAppliances.inverterAcs === num
                          ? 'bg-[#111318] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F5F5F7] rounded-2xl space-y-1">
                <p className="text-xs font-semibold text-[#111318]">Refrigerators</p>
                <div className="flex items-center gap-2 pt-1">
                  {[0, 1, 2].map((num) => (
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      key={num}
                      type="button"
                      onClick={() => setCalcAppliances({ ...calcAppliances, refrigerators: num })}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        calcAppliances.refrigerators === num
                          ? 'bg-[#111318] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F5F5F7] rounded-2xl space-y-1">
                <p className="text-xs font-semibold text-[#111318]">Chest Freezers</p>
                <div className="flex items-center gap-2 pt-1">
                  {[0, 1, 2].map((num) => (
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      key={num}
                      type="button"
                      onClick={() => setCalcAppliances({ ...calcAppliances, freezers: num })}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        calcAppliances.freezers === num
                          ? 'bg-[#111318] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </div>

              <label className="p-3 bg-[#F5F5F7] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-gray-200/70 transition-colors">
                <span className="text-xs font-semibold text-[#111318]">Water Pump</span>
                <input
                  type="checkbox"
                  checked={calcAppliances.waterPump}
                  onChange={(e) => setCalcAppliances({ ...calcAppliances, waterPump: e.target.checked })}
                  className="rounded text-[#111318] h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="p-3 bg-[#F5F5F7] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-gray-200/70 transition-colors">
                <span className="text-xs font-semibold text-[#111318]">Fans & Lights</span>
                <input
                  type="checkbox"
                  checked={calcAppliances.fansAndLights}
                  onChange={(e) => setCalcAppliances({ ...calcAppliances, fansAndLights: e.target.checked })}
                  className="rounded text-[#111318] h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="p-3 bg-[#F5F5F7] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-gray-200/70 transition-colors">
                <span className="text-xs font-semibold text-[#111318]">TVs & Laptops</span>
                <input
                  type="checkbox"
                  checked={calcAppliances.tvsAndLaptops}
                  onChange={(e) => setCalcAppliances({ ...calcAppliances, tvsAndLaptops: e.target.checked })}
                  className="rounded text-[#111318] h-4 w-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Calculator Output Display with smooth update */}
            <div className="md:col-span-5 bg-[#111318] text-white p-6 rounded-2xl space-y-4">
              <p className="text-[11px] uppercase tracking-wider text-[#8EA9FF] font-bold">
                Recommended Sizing Output
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={estimatedKva.kva}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <p className="text-2xl font-extrabold font-heading text-white">{estimatedKva.kva}</p>
                  <p className="text-xs text-white/70">Recommended Bundle: {estimatedKva.kit}</p>
                  <p className="text-xs text-[#8EA9FF]">Target Battery Bank: {estimatedKva.battery}</p>
                </motion.div>
              </AnimatePresence>
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    estimatedPowerNeeds: `${estimatedKva.kva} (${estimatedKva.kit})`,
                  })
                }
                className="w-full py-2.5 rounded-full bg-white text-[#111318] text-xs font-bold hover:bg-[#DCE5FF] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply to Quote Form Below</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Main Grid: Form + Office Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form */}
        <Reveal direction="up" distance={20} delay={0.15} className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-black/5 subtle-card-shadow">
          {submittedTicket ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: crispEasing }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-[#111318] font-heading">
                Quote Request Submitted
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] max-w-md mx-auto">
                Thank you for your enquiry, <strong className="text-[#111318]">{formData.name}</strong>.
                Our solar engineering team has generated your simulated consultation dossier.
              </p>

              <div className="bg-[#F5F5F7] p-6 rounded-2xl max-w-md mx-auto text-left border border-black/5 space-y-2.5 my-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[#737780]">Ticket Reference:</span>
                  <span className="font-mono font-bold text-[#111318]">{submittedTicket}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#737780]">State Location:</span>
                  <span className="font-semibold text-[#111318]">{formData.state}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#737780]">Property Type:</span>
                  <span className="text-[#111318]">{formData.propertyType}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#737780]">Configured Needs:</span>
                  <span className="text-[#111318] font-medium">{formData.estimatedPowerNeeds}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSubmittedTicket(null)}
                className="px-8 py-3 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
              >
                Submit Another Request
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-[#111318] font-heading">
                  Solar Installation Enquiry Form
                </h2>
                <p className="text-xs text-[#737780]">
                  All fields marked with an asterisk (*) are required for sizing.
                </p>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Engr. Babatunde Cole"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
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
                    placeholder="+234 802 345 6789"
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="babatunde@domain.ng"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Residential Duplex / Terrace">Residential Duplex / Terrace</option>
                    <option value="Apartment / Flat">Apartment / Flat</option>
                    <option value="Detached Executive Villa / Mansion">Detached Executive Villa / Mansion</option>
                    <option value="Commercial Office / Branch">Commercial Office / Branch</option>
                    <option value="Hospital / Healthcare Clinic">Hospital / Healthcare Clinic</option>
                    <option value="Hospitality / Hotel / Shortlet">Hospitality / Hotel / Shortlet</option>
                    <option value="Off-Grid Agricultural Farm">Off-Grid Agricultural Farm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                    State (Nigeria) *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none bg-white cursor-pointer"
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
                <input
                  type="text"
                  required
                  value={formData.estimatedPowerNeeds}
                  onChange={(e) => setFormData({ ...formData, estimatedPowerNeeds: e.target.value })}
                  placeholder="e.g. 5kVA with 10kWh battery bank"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                />
              </div>

              {/* Products or Solution of Interest */}
              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-2">
                  Products or Solution of Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Complete Turnkey Solar Kit',
                    'PureBlack Solar Panels',
                    'Nexus Hybrid Inverter',
                    'PowerCell Lithium Battery',
                    'Nomad Portable Generator',
                    'Controllers & Cabling',
                  ].map((sol) => {
                    const isSelected = formData.productsOfInterest.includes(sol);
                    return (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        key={sol}
                        onClick={() => handleSolutionToggle(sol)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#DCE5FF] border-[#8EA9FF] text-[#111318] font-semibold'
                            : 'bg-white border-gray-200 text-[#737780] hover:border-gray-300'
                        }`}
                      >
                        {sol}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                  Additional Information (Roof structure, generator rating, questions)
                </label>
                <textarea
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Provide any details about your current generator, daytime electricity needs, or roof space..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#111318] focus:border-[#111318] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-[#737780] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free engineering proposal • Zero obligation</span>
                </div>
                <motion.button
                  whileHover={shouldReduceMotion || isSubmitting ? undefined : { scale: 1.02 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Installation Enquiry</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </Reveal>

        {/* Right Column: Contact Details */}
        <Reveal direction="up" distance={20} delay={0.2} className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 subtle-card-shadow space-y-6">
            <h3 className="text-base font-bold text-[#111318] font-heading">
              Solara Engineering Hubs
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">Lagos Headquarters</p>
                  <p className="text-[#737780] leading-relaxed">
                    Plot 14B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">Abuja Technical Centre</p>
                  <p className="text-[#737780] leading-relaxed">
                    Constitution Avenue, Central Business District, Abuja (FCT)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">Phone Hotline</p>
                  <p className="text-[#737780]">+234 (0) 700 765 2723 (SOLARA)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">Engineering Enquiries</p>
                  <p className="text-[#737780]">solutions@solara-energy.demo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8EA9FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111318]">Working Hours</p>
                  <p className="text-[#737780]">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111318] text-white rounded-3xl p-6 sm:p-8 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EA9FF]">
              Nationwide Delivery
            </span>
            <h4 className="text-sm font-bold font-heading">
              Certified Freight & Heavy Transport
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              We dispatch specialized vibration-damped trucks for large lithium battery banks and high-wattage
              solar arrays across all 36 Nigerian states.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
