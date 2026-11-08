import React from 'react';
import { Link } from 'react-router-dom';
import {
  SunMedium,
  ShieldCheck,
  Globe2,
  Cpu,
  Leaf,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from '../components/motion/Motion';

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24 space-y-20">
      {/* Hero Banner with Reveal */}
      <Reveal direction="up" distance={16}>
        <div className="relative rounded-[2.5rem] bg-[#111318] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#8EA9FF] text-xs font-semibold">
              <SunMedium className="w-3.5 h-3.5" />
              <span>Our Origin & Purpose</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              Decentralizing clean, silent energy for modern life.
            </h1>

            <p className="text-sm sm:text-base text-white/75 font-normal leading-relaxed">
              Solara Energy was founded to replace the toxic emissions, unbearable noise, and unpredictable
              downtime of fossil fuel generators with high-precision solar architecture. We view solar not merely
              as industrial hardware, but as an elegant consumer appliance.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/shop"
                  className="px-6 py-3 rounded-full bg-white text-[#111318] hover:bg-[#DCE5FF] text-xs font-bold transition-all inline-block"
                >
                  Explore Our Technology
                </Link>
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold inline-block"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Ambient background glow with gentle breathing animation */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#8EA9FF]/20 rounded-full blur-3xl pointer-events-none animate-tech-pulse" />
        </div>
      </Reveal>

      {/* 3 Pillars / Mission & Engineering Philosophy */}
      <section className="space-y-12">
        <Reveal direction="up" distance={16} className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            The Engineering Ethos
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111318] tracking-tight font-heading">
            Built from first principles.
          </h2>
          <p className="text-xs sm:text-sm text-[#737780]">
            Every microinverter, lithium pack, and junction harness is engineered for tropical heat,
            coastal humidity, and continuous domestic loads.
          </p>
        </Reveal>

        <StaggerGroup staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] flex items-center justify-center text-[#111318]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111318] font-heading">
                Intelligent Power Management
              </h3>
              <p className="text-xs text-[#737780] leading-relaxed">
                Our hardware balances incoming photovoltaics, utility grid feed, and storage reserve with
                sub-millisecond precision. You never notice when the national grid cuts out.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] flex items-center justify-center text-[#111318]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111318] font-heading">
                Zero Noise, Zero Emissions
              </h3>
              <p className="text-xs text-[#737780] leading-relaxed">
                Eliminate carbon monoxide risks, diesel exhaust particulates, and neighborhood noise pollution.
                Solara systems generate power in serene silence.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 border border-black/5 subtle-card-shadow subtle-card-hover space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#DCE5FF] flex items-center justify-center text-[#111318]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111318] font-heading">
                Nationwide Logistics & Support
              </h3>
              <p className="text-xs text-[#737780] leading-relaxed">
                We maintain engineering hubs in Lagos, Abuja, and Port Harcourt to ensure rapid delivery,
                certified installation, and local technical assistance.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* Demonstration Impact Metrics */}
      <Reveal direction="up" distance={20}>
        <section className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-black/5 subtle-card-shadow">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#111318] font-heading">
                12,400+
              </p>
              <p className="text-xs text-[#737780]">Homes Powered (Demonstration metric)</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#8EA9FF] font-heading">
                18.6 GWh
              </p>
              <p className="text-xs text-[#737780]">Clean Solar Yield Harvested</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#111318] font-heading">
                99.98%
              </p>
              <p className="text-xs text-[#737780]">System Continuity & Uptime</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#8EA9FF] font-heading">
                14,200 MT
              </p>
              <p className="text-xs text-[#737780]">CO₂ Emissions Offset</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Clear Demonstration Notice */}
      <Reveal direction="up" distance={16}>
        <section className="bg-[#F5F5F7] p-6 sm:p-8 rounded-3xl border border-black/5 space-y-3">
          <div className="flex items-center gap-2 text-[#111318] font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-[#8EA9FF]" />
            <span>Demonstration Environment Transparency</span>
          </div>
          <p className="text-xs text-[#737780] leading-relaxed">
            Solara Energy is a showcase e-commerce platform built to demonstrate high-fidelity user experience,
            modern product discovery, and robust cart/checkout engineering. All products, corporate figures,
            and warranty claims presented on this website are illustrative demonstration data.
          </p>
        </section>
      </Reveal>
    </div>
  );
};
