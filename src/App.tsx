import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { crispEasing } from './components/motion/motionCurves';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// Route wrapper ensuring fresh mount per product ID
const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductDetails key={id} />;
};

const AnimatedContent: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.3 }}
        animate={{ opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.3 }}
        transition={{ duration: 0.2, ease: crispEasing }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F5F5F7] text-[#111318]">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <AnimatedContent />
          </main>
          <Footer />
          <CartDrawer />
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
