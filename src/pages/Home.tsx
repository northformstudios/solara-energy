import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SunMedium,
  ArrowRight,
  Zap,
  BatteryCharging,
  Cpu,
  ChevronDown,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuoteModal } from '../components/QuoteModal';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from '../components/motion/Motion';
import { crispEasing } from '../components/motion/motionCurves';

export const Home: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSolutionTab, setActiveSolutionTab] = useState<'residential' | 'commercial' | 'offgrid'>('residential');
  const shouldReduceMotion = useReducedMotion();

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const faqs = [
    {
      question: 'How does a Solara hybrid system perform during rainy or overcast weeks?',
      answer:
        'Solara PureBlack panels use N-type TOPCon bifacial wafers with advanced anti-reflective glass that capture diffuse ambient ultraviolet light even on heavily overcast days. Coupled with our PowerCell LiFePO4 batteries and intelligent dual-MPPT inverters, the system optimizes power draw and can seamlessly blend grid, solar, and battery reserves without any disruption.',
    },
    {
      question: 'Will the system switch over without interrupting my laptops, servers, or Wi-Fi?',
      answer:
        'Yes. All Solara Nexus hybrid inverters feature high-speed solid-state DSP transfer switches with an ultra-low transfer time of under 10 milliseconds. This is well below the hold-up capacitor threshold of modern computers, television sets, medical CPAP devices, and routers—meaning zero flicker, zero reboot, and zero data loss.',
    },
    {
      question: 'What is the real expected lifespan of Solara LiFePO4 Lithium batteries?',
      answer:
        'Our PowerCell series utilizes automotive-grade Lithium Iron Phosphate chemistry engineered for 6,000+ full charge/discharge cycles at 90% Depth of Discharge. In daily standard cycling, this translates to over 14 to 16 years of reliable domestic service life with minimal degradation.',
    },
    {
      question: 'Are Solara systems expandable if my household energy needs increase later?',
      answer:
        'Every Solara Nexus inverter and PowerCell battery is modular by design. You can add extra solar panels, attach additional battery storage modules in parallel (up to 150kWh), or stack multiple inverters without replacing your existing infrastructure.',
    },
    {
      question: 'Is installation support and site engineering assessment available across Nigeria?',
      answer:
        'Yes. Our certified partner engineering network conducts comprehensive structural roof load calculations, electrical panel inspections, and rapid white-glove commissioning across Lagos, Abuja, Port Harcourt, Ibadan, and nationwide.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#111318] text-white min-h-[580px] sm:min-h-[640px] flex items-center shadow-2xl border border-white/10">
          {/* Background Solar Installation Photography with slow breathing zoom */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1 }}
              animate={
                shouldReduceMotion
                  ? { scale: 1 }
                  : { scale: [1, 1.04, 1] }
              }
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=85"
              alt="Premium architectural solar rooftop installation"
              className="w-full h-full object-cover object-center opacity-40 brightness-95"
            />
            {/* Apple-style subtle gradient masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/30" />
          </div>

          {/* Hero Content with staggered entrance */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl space-y-6">
            <Reveal delay={0.1} direction="up" distance={16}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#8EA9FF] text-xs font-semibold tracking-wide">
                <SunMedium className="w-3.5 h-3.5" />
                <span>Architectural Clean Energy Systems</span>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="up" distance={20}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
                Power your world differently.
              </h1>
            </Reveal>

            <Reveal delay={0.3} direction="up" distance={20}>
              <p className="text-base sm:text-lg text-white/75 font-normal leading-relaxed">
                Reliable energy products designed to keep your home and business moving. Silent, zero-fume,
                pure sine wave solar technology crafted with minimalist precision.
              </p>
            </Reveal>

            <Reveal delay={0.4} direction="up" distance={16}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/shop"
                    className="px-7 py-3.5 rounded-full bg-white text-[#111318] hover:bg-[#DCE5FF] text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all backdrop-blur-md cursor-pointer"
                >
                  Get a Quote
                </motion.button>
              </div>
            </Reveal>

            {/* Micro Highlights Pill */}
            <Reveal delay={0.5} direction="up" distance={16}>
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-heading">0ms</p>
                  <p className="text-[11px] text-white/60">UPS Switchover</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#8EA9FF] font-heading">6,000+</p>
                  <p className="text-[11px] text-white/60">LiFePO4 Cycles</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-heading">24/7</p>
                  <p className="text-[11px] text-white/60">Cloud Telemetry</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
              Engineered Hardware Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight mt-1 font-heading">
              Explore Product Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#111318] hover:text-blue-600 transition-colors flex items-center gap-1 group"
          >
            <span>Browse all categories</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </Reveal>

        <StaggerGroup staggerDelay={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <StaggerItem key={cat.name}>
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white rounded-2xl p-4 border border-black/5 subtle-card-shadow subtle-card-hover flex flex-col justify-between overflow-hidden h-full hover:border-[#8EA9FF]/40 transition-colors"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F5F7] mb-3 img-zoom-container">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#111318] group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#737780] mt-0.5">{cat.count} Demonstration items</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8EA9FF]" />
              <span>Flagship Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight font-heading">
              Featured Clean Energy Systems
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#111318] hover:text-blue-600 transition-colors flex items-center gap-1 group"
          >
            <span>View all 14 models</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </Reveal>

        <StaggerGroup staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* 4. WHY CHOOSE SOLARA (Apple-style 3-pillar layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={20} className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            The Solara Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111318] tracking-tight font-heading">
            Why Choose Solara Energy
          </h2>
          <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
            We rejected the fragile components, loud fans, and confusing wiring common in legacy solar setups.
            Solara systems are engineered as unified consumer appliances.
          </p>
        </Reveal>

        <StaggerGroup staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] text-[#111318] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#111318]" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] font-heading">
                  Zero-Flicker Continuous Power
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  When public utility power drops or surges uncontrollably, our hybrid inverters isolate your home
                  in less than 10 milliseconds. Air conditioners keep running, sensitive desktop workstations stay
                  operational, and lights do not flicker.
                </p>
              </div>
              <ul className="text-xs text-[#111318] font-medium space-y-2 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Pure Sine Wave THD &lt; 3%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  High surge handling for water pumps
                </li>
              </ul>
            </div>
          </StaggerItem>

          {/* Card 2 */}
          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] text-[#111318] flex items-center justify-center">
                  <BatteryCharging className="w-6 h-6 text-[#111318]" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] font-heading">
                  Cobalt-Free Prismatic LiFePO4
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Safety without compromise. Unlike volatile nickel-cobalt batteries, Solara PowerCell utilizes
                  non-combustible Lithium Iron Phosphate chemistry with multi-layered hardware shutoffs and thermal
                  protection up to 60°C.
                </p>
              </div>
              <ul className="text-xs text-[#111318] font-medium space-y-2 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Over 6,000 full rated cycles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Intelligent cell active balancing
                </li>
              </ul>
            </div>
          </StaggerItem>

          {/* Card 3 */}
          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] text-[#111318] flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-[#111318]" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] font-heading">
                  Cloud App & Instant Telemetry
                </h3>
                <p className="text-xs text-[#737780] leading-relaxed">
                  Track solar production, household consumption, and battery health in real time from your iPhone,
                  Android, or laptop. Receive proactive alerts if shading or dirty panels lower solar harvest.
                </p>
              </div>
              <ul className="text-xs text-[#111318] font-medium space-y-2 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Wi-Fi & 4G cellular fallback
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Over-the-air firmware optimizations
                </li>
              </ul>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* 5. SOLAR SOLUTIONS INTERACTIVE SECTION with fluid layout tab indicator */}
      <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-black/5 subtle-card-shadow">
          <Reveal direction="up" distance={16} className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
              Custom Sized Architectures
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight mt-1 font-heading">
              Solar Solutions Engineered for Real Life
            </h2>
            <p className="text-xs sm:text-sm text-[#737780] mt-2 leading-relaxed">
              Select your property archetype to preview typical component configurations, daily output, and
              appliance runtimes.
            </p>
          </Reveal>

          {/* Fluid Solution Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
            {(
              [
                { id: 'residential', label: 'Residential Duplex & Homes' },
                { id: 'commercial', label: 'Commercial Offices & Clinics' },
                { id: 'offgrid', label: 'Off-Grid Estates & Farms' },
              ] as const
            ).map((tab) => {
              const isSelected = activeSolutionTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSolutionTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    isSelected ? 'text-white' : 'text-[#737780] hover:text-[#111318] bg-[#F5F5F7]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="solutionTabIndicator"
                      className="absolute inset-0 bg-[#111318] rounded-full shadow-xs z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Details with smooth cross-fade */}
          <AnimatePresence mode="wait">
            {activeSolutionTab === 'residential' && (
              <motion.div
                key="residential"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: crispEasing }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Recommended: Solara Home Essential 3.5kVA / 5kWh
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111318] font-heading">
                    Continuous comfort for family residences.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
                    Engineered to replace 5kVA to 7.5kVA noisy petrol generators. Powers lighting, refrigerators,
                    televisions, sound systems, fans, computers, and water pumping cycles automatically without
                    lifting a switch.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Typical Array</p>
                      <p className="text-xs font-bold text-[#111318]">6x 550W Panels (3.3kW)</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Battery Reserve</p>
                      <p className="text-xs font-bold text-[#111318]">5.12 kWh LiFePO4</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Daily Generation</p>
                      <p className="text-xs font-bold text-[#111318]">14 – 16 kWh / Day</p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/product/solara-home-essential-kit"
                        className="px-6 py-2.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all inline-block"
                      >
                        View Turnkey Solution
                      </Link>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsQuoteOpen(true)}
                      className="px-6 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-[#111318] hover:bg-gray-50 cursor-pointer"
                    >
                      Request Sizing Audit
                    </motion.button>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 img-zoom-container">
                  <img
                    src="https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1000&q=80"
                    alt="Modern solar home"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {activeSolutionTab === 'commercial' && (
              <motion.div
                key="commercial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: crispEasing }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Recommended: Solara Executive 10kVA / 20kWh Solution
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111318] font-heading">
                    High-yield 3-phase resilience for business continuity.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
                    Slash heavy diesel expenditure and protect delicate medical equipment, point-of-sale servers,
                    and multiple 1.5HP / 2HP inverter air conditioning units with balanced three-phase 400V power.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Inverter</p>
                      <p className="text-xs font-bold text-[#111318]">10kVA Nexus Pro (Stackable)</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Battery Reserve</p>
                      <p className="text-xs font-bold text-[#111318]">20.48 kWh Storage</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Generator Sync</p>
                      <p className="text-xs font-bold text-[#111318]">Auto-start dry contact</p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/product/solara-executive-villa-kit"
                        className="px-6 py-2.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all inline-block"
                      >
                        View Executive Bundle
                      </Link>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsQuoteOpen(true)}
                      className="px-6 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-[#111318] hover:bg-gray-50 cursor-pointer"
                    >
                      Request Commercial Proposal
                    </motion.button>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 img-zoom-container">
                  <img
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80"
                    alt="Modern solar commercial facility"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {activeSolutionTab === 'offgrid' && (
              <motion.div
                key="offgrid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: crispEasing }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Recommended: Solara PowerTower High-Voltage Microgrid
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111318] font-heading">
                    100% Off-grid autonomy in remote agricultural and country estates.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
                    Total liberation from public utility grid infrastructure. High-voltage DC architectures
                    minimize electrical resistance across large compound distances, providing pristine energy
                    for cold rooms, boreholes, and estate lighting.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Bus Architecture</p>
                      <p className="text-xs font-bold text-[#111318]">384V High Voltage</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Battery Scale</p>
                      <p className="text-xs font-bold text-[#111318]">20kWh – 150kWh Modular</p>
                    </div>
                    <div className="p-3 bg-[#F5F5F7] rounded-xl">
                      <p className="text-[11px] text-[#737780]">Autonomy Index</p>
                      <p className="text-xs font-bold text-[#111318]">99.9% Independent</p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsQuoteOpen(true)}
                      className="px-6 py-2.5 rounded-full bg-[#111318] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
                    >
                      Consult Off-Grid Engineers
                    </motion.button>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 img-zoom-container">
                  <img
                    src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
                    alt="Off-grid solar installation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5FF] text-[#111318] text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-[#8EA9FF]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight font-heading">
              Best Selling Hardware
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-[#111318] hover:text-blue-600 transition-colors flex items-center gap-1 group"
          >
            <span>Explore all hardware</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </Reveal>

        <StaggerGroup staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* 7. CUSTOMER QUESTIONS (FAQ) with smooth height accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16} className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            Clarity & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#737780]">
            Everything you need to know about switching your home or commercial facility to Solara.
          </p>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#111318] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: crispEasing }}
                    className="shrink-0 text-gray-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: crispEasing }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#737780] leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 8. CLOSING HIGH-IMPACT CTA with technological pulse */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={20}>
          <div className="relative rounded-[2.5rem] bg-[#111318] text-white p-10 sm:p-16 lg:p-20 overflow-hidden text-center space-y-6 shadow-2xl border border-white/10">
            {/* Ambient Radial Technological Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8EA9FF]/20 rounded-full blur-3xl pointer-events-none animate-tech-pulse" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8EA9FF]">
                Zero Compromise Energy
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
                Step into the era of silent, clean power.
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
                Upgrade from loud petrol generators to an automated, silent Solara solar energy system.
                Designed with precision, backed by illustrative warranties.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/shop"
                    className="px-8 py-3.5 rounded-full bg-white text-[#111318] hover:bg-[#DCE5FF] text-xs font-bold transition-all shadow-lg inline-block"
                  >
                    Browse Shop Catalogue
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#8EA9FF] hover:bg-[#8EA9FF]/90 text-[#111318] text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Request Custom Quote
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Quote Request Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};
