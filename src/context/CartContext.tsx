import React, { createContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import { DELIVERY_RATES } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryState: string;
  setDeliveryState: (state: string) => void;
  deliveryFee: number;
  total: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'solara_energy_cart_v1';
const STATE_STORAGE_KEY = 'solara_energy_delivery_state_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryState, setDeliveryState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STATE_STORAGE_KEY);
      return saved || 'Lagos';
    } catch {
      return 'Lagos';
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Persist delivery state
  useEffect(() => {
    try {
      localStorage.setItem(STATE_STORAGE_KEY, deliveryState);
    } catch (e) {
      console.warn('Failed to save delivery state', e);
    }
  }, [deliveryState]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart.`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        showToast(`Removed "${item.product.name}" from cart.`);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (DELIVERY_RATES[deliveryState] || DELIVERY_RATES['Default']) : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        deliveryState,
        setDeliveryState,
        deliveryFee,
        total,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart } from './useCart';
