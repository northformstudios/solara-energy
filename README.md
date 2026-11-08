# Solara Energy — Premium Solar E-Commerce Platform

A production-grade, Apple-inspired e-commerce platform and product experience for **Solara Energy**, a clean-energy technology company designing and providing premium solar systems, pure sine hybrid inverters, LiFePO4 wall batteries, and turnkey home/commercial installations.

---

## ☀️ Live Preview & Architecture Overview

- **Design Philosophy:** Minimalist Apple Store aesthetic, generous whitespace, subtle glassmorphism (`backdrop-filter`), Manrope typography for headings, Inter typography for body, high-contrast imagery, and restrained micro-interactions.
- **Colour Palette:**
  - Background: `#F5F5F7`
  - White: `#FFFFFF`
  - Main text: `#111318`
  - Secondary text: `#737780`
  - Accent: `#8EA9FF`
  - Supporting colour: `#DCE5FF`
- **Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion v14, Lucide Icons, React Router v7, Canvas Confetti.

---

## ⚡ Motion Design System (Solara Energy)

The motion experience is art-directed specifically for Solara Energy: modern, crisp, technological, and efficient. It avoids playful or bouncy animations in favor of precision Apple-like physics.

### 1. Motion Language & Curves
- **Signature Precision Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — rapid initial acceleration with a calm, deliberate settle.
- **Precision Spring:** `stiffness: 380, damping: 32` — used for tactile interactions, modal scaling, badge pops, and slide drawers.
- **Scroll Reveals:** Staggered coordinate-based entrances with zero layout disruption.
- **Hardware Acceleration:** Transforms (`transform3d`), opacity, and subtle scale (`scale(1.05)`) utilize GPU compositor layers.

### 2. Motion Touches Across Experiences
- **Interactive Solutions Slider:** Smooth `layoutId="solutionTabIndicator"` sliding pill indicator between Residential, Commercial, and Off-Grid modes.
- **Product Gallery Switcher:** Fluid cross-fade (`mode="wait"`) when cycling hardware photography.
- **Cart & Line Item Removal:** `layout` animations on cart items so deletions collapse smoothly without jarring jumps.
- **Filter Re-sorting:** Smooth grid rearrangement upon category or price sorting.
- **Accessible Reduced-Motion:** Complete support for `prefers-reduced-motion: reduce` via `useReducedMotion()` hooks and CSS overrides. Zero motion triggers for users requesting minimal movement.

---

## 📁 Project Structure

```
solara-energy/
├── public/
│   ├── favicon.svg                  # Custom minimalist Solara sun glyph
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky Apple glass navbar with badge count & mobile drawer
│   │   ├── Footer.tsx               # Multi-column footer with newsletter, disclaimer, and currency
│   │   ├── ProductCard.tsx          # Clean product card with specs, demo price & quick add
│   │   ├── CartDrawer.tsx           # Slide-over mini-cart drawer
│   │   ├── SearchModal.tsx          # Instant Cmd+K modal search across all hardware
│   │   ├── QuoteModal.tsx           # Solar installation enquiry modal with ticket generator
│   │   └── Toast.tsx                # Floating status notifications
│   ├── context/
│   │   ├── CartContext.tsx          # Cart state, item counters, subtotal, delivery & persistence
│   │   └── useCart.ts               # Custom useCart hook
│   ├── data/
│   │   └── products.ts              # 14 demonstration solar models & Nigerian state delivery fees
│   ├── pages/
│   │   ├── Home.tsx                 # Hero, categories, featured, why choose, solutions & FAQ
│   │   ├── Shop.tsx                 # Category filtering, live search, price slider & sorting
│   │   ├── ProductDetails.tsx       # Responsive gallery, specs table, features & related items
│   │   ├── About.tsx                # Brand ethos, engineering standards & impact counters
│   │   ├── Contact.tsx              # Installation enquiry & interactive power load calculator
│   │   ├── Cart.tsx                 # Dedicated cart page with shipping calculator
│   │   ├── Checkout.tsx             # Simulated checkout with customer & delivery validation
│   │   └── OrderConfirmation.tsx    # Simulated receipt, confetti celebration & status tracker
│   ├── types/
│   │   └── index.ts                 # Full TypeScript definitions for products, cart, order, quote
│   ├── App.tsx                      # Client-side router & providers
│   ├── index.css                    # Tailwind CSS v4 theme, fonts, and glassmorphism utilities
│   └── main.tsx                     # Entry mount
├── index.html                       # SEO metadata & Google Fonts (Manrope + Inter)
├── package.json
├── tsconfig.json
└── vite.config.ts                   # Vite config with React & Tailwind CSS v4
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or later) and **npm** installed.

```bash
node -v
npm -v
```

### Installation

1. Navigate to the project directory:
   ```bash
   cd solara-energy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the store.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## ⚡ Core Features & User Journeys

1. **Product Catalogue & Discovery:**
   - 14 fictional demonstration products spanning 6 categories:
     - **Solar Panels:** 550W Mono Bifacial, 410W Shingled All-Black, 220W Semi-Flexible.
     - **Inverters:** Nexus 5kVA Hybrid (48V), Nexus Pro 10kVA 3-Phase Commercial, MicroFlow 800W.
     - **Batteries:** PowerCell 10kWh Wall LiFePO4, PowerCell Compact 5.12kWh Rack, PowerTower 20kWh High-Voltage.
     - **Solar Generators:** Nomad 3.5kVA Silent Power Station, Nomad Mini 1.2kVA Mobile Core.
     - **Accessories:** StreamMPPT 100A Controller, SmartEnergy Power Gateway, HeavyDuty 4mm² Solar Cables.
     - **Complete Turnkey Kits:** Home Essential 3.5kVA / 5kWh Solution, Executive Villa 10kVA / 20kWh Bundle.
   - Real-time search by keywords, product name, or technology specs.
   - Category filtering with live counts.
   - Price range slider and sorting (Price low-to-high, high-to-low, rating, featured).
   - In-stock availability filters.

2. **Product Detail Experience:**
   - Multi-angle responsive image gallery with thumbnail preview.
   - Technical specifications breakdown table (capacity, voltage, dimensions, cell chemistry).
   - Key features bullet points and "What's in the box" inventory list.
   - Quantity selector with dynamic line-total calculation.
   - One-click "Add to Cart" and "Request a Quote" with product pre-selection.
   - Related products carousel recommendations.

3. **Cart & Shipping Calculation:**
   - Persistent cart state across page refreshes via `localStorage`.
   - Side drawer mini-cart accessible globally.
   - Dedicated `/cart` page with line item modification and one-click removal.
   - Dynamic delivery freight estimator based on selected Nigerian State (Lagos, Abuja FCT, Rivers, Ogun, Oyo, Kano, etc.).

4. **Demonstration Checkout & Confirmation:**
   - Structured 3-step checkout:
     - Customer information (Full Name, Email, WhatsApp-enabled Phone).
     - Delivery destination (State, City, Street Address, Gate access instructions).
     - Simulated Payment selection (Paystack Demo Card, Corporate Bank Wire, Clean Energy Financing).
   - Form validation ensuring required fields are populated.
   - Simulated order creation with unique Order ID (e.g. `SLR-ORD-2026-XXXX`).
   - Order confirmation page with celebratory confetti animation, status tracker, itemized receipt breakdown, and print action.

5. **Solar Installation Enquiry & Interactive Load Calculator:**
   - Dedicated quotation form capturing property type, state, power requirements, and roof layout.
   - **Interactive Power Load Estimator:** Users toggle home appliances (Air Conditioners, Refrigerators, Freezers, Water Pumps, Lighting) to receive an instant recommended inverter size and battery storage target.
   - Generates simulated quote reference tickets (e.g. `SLR-QT-XXXXXX`).

---

## 🔒 Demonstration Data & Compliance Notice

- All product names, descriptions, technical ratings, efficiency percentages, and warranty terms are **fictional and illustrative**.
- All prices are denominated in **Nigerian Naira (NGN ₦)** and labeled as **demonstration prototype prices**.
- **No live credit cards or financial transactions are collected or processed.**
- All demo data is strictly decoupled in `src/data/products.ts` so it can be swapped with a real headless CMS (Sanity, Strapi, Contentful) or backend database (PostgreSQL, Supabase, Shopify Storefront API) in production.

---

## 💳 Payment Gateway Integration Guide (For Production)

The checkout process has been structured with clean abstractions to enable rapid integration with live payment processors:

### 1. Paystack Integration (Nigeria & Ghana)

1. Install the official Paystack popup SDK:
   ```bash
   npm install react-paystack
   ```
2. In `src/pages/Checkout.tsx`:
   ```typescript
   import { usePaystackPayment } from 'react-paystack';

   const paystackConfig = {
     reference: new Date().getTime().toString(),
     email: customer.email,
     amount: total * 100, // Amount in kobo
     publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
   };

   const initializePayment = usePaystackPayment(paystackConfig);

   const onSuccess = (reference: any) => {
     // Verify reference on backend server and redirect to confirmation
     navigate(`/order-confirmation/${reference.reference}`);
   };

   const onClose = () => {
     alert('Payment modal cancelled');
   };
   ```

### 2. Flutterwave Integration

1. Install Flutterwave React package:
   ```bash
   npm install flutterwave-react-v3
   ```
2. Pass `customer`, `currency: 'NGN'`, and `amount: total` to `useFlutterwave()`.

### 3. Stripe Integration (Global)

1. Use `@stripe/stripe-js` and `@stripe/react-stripe-js` with Payment Intents generated by a backend Node/Next.js API route.

---

## 🌐 Production Deployment

### Deploy to Netlify
1. Create a `netlify.toml` file or configure via dashboard:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
2. Add a redirect rule in `public/_redirects`:
   ```text
   /*    /index.html   200
   ```

### Deploy to Vercel
1. Run `vercel` or link GitHub repository:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

---

## 📄 License & Attribution

Designed and developed for **Solara Energy** demonstration purposes. Fictional hardware assets and illustrative photography provided via Unsplash under royalty-free creative commons.
