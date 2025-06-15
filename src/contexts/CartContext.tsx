import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { ProductOrder } from '../types/order';

interface CartContextType {
  items: ProductOrder[];
  addToCart: (item: ProductOrder) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ProductOrder[]>(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: ProductOrder) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        i => i.product.id === item.product.id && 
             i.size === item.size && 
             i.color === item.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return updatedItems;
      }

      // Add new item
      return [...currentItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.product.id !== itemId)
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  };

  const checkout = () => {
    if (items.length === 0) return;
    window.open(generateWhatsAppLink(items), '_blank');
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}; 