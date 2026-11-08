import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SunMedium, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#111318] text-white pt-16 pb-12 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Showcase Banner inside Footer */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
              Ready to power your world differently?
            </h3>
            <p className="text-sm text-white/60">
              Speak directly with a Solara clean energy systems engineer for an architectural assessment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#8EA9FF] hover:bg-[#8EA9FF]/90 text-[#111318] text-xs font-bold transition-all shadow-md"
            >
              Request Custom Quote
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#8EA9FF]">
                <SunMedium className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white font-heading">
                SOLARA ENERGY
              </span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm mb-6">
              Engineering premium, silent, decentralized solar technology. Designed for residential resilience,
              commercial energy independence, and off-grid reliability across Nigeria and West Africa.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label className="text-xs font-semibold text-white/80 block">
                The Solara Clean Energy Dispatch
              </label>
              <div className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white/10 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#8EA9FF]"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 rounded-full bg-[#8EA9FF] text-[#111318] hover:bg-white transition-colors shrink-0"
                  title="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-[#8EA9FF] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed to demonstration dispatch!
                </p>
              )}
            </form>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link to="/shop?category=Solar+Panels" className="hover:text-white transition-colors">
                  Solar Panels (550W & Shingled)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Inverters" className="hover:text-white transition-colors">
                  Hybrid Inverters (5kVA & 10kVA)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Batteries" className="hover:text-white transition-colors">
                  LiFePO4 Lithium Batteries
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Solar+Generators" className="hover:text-white transition-colors">
                  Nomad Solar Generators
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Complete+Solar+Kits" className="hover:text-white transition-colors">
                  Turnkey Solar Kits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-white transition-colors">
                  Controllers & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link to="/#solutions" className="hover:text-white transition-colors">
                  Residential Duplex Energy
                </Link>
              </li>
              <li>
                <Link to="/#solutions" className="hover:text-white transition-colors">
                  Commercial & Clinic Systems
                </Link>
              </li>
              <li>
                <Link to="/#solutions" className="hover:text-white transition-colors">
                  Off-Grid Estate Microgrids
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Engineering Site Audit
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Load Calculation Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Solara */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Solara Energy
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Technology
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Engineering Principles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Simulated Checkout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Notice Banner in Footer */}
        <div className="py-6 border-b border-white/10 flex items-start sm:items-center gap-3 text-xs text-white/50 bg-white/5 px-4 rounded-2xl mt-8">
          <ShieldCheck className="w-5 h-5 text-[#8EA9FF] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white/80">Demonstration E-Commerce Notice:</strong> Solara Energy is a fictional
            demonstration brand created for design and full-stack architecture presentation. All product models,
            specifications, technical ratings, and prices (denominated in Nigerian Naira ₦) are illustrative. No
            live financial payments are accepted.
          </p>
        </div>

        {/* Bottom Legal / Currency */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© 2026 Solara Energy Inc. All demonstration rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Currency: NGN (₦)
            </span>
            <span>•</span>
            <span className="text-white/40">Privacy Policy (Illustrative)</span>
            <span>•</span>
            <span className="text-white/40">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
