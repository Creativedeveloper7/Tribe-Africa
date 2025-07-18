import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const DISCOUNTED_FABRIC_PRICE = 1999; // Fixed discounted fabric price

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, checkout } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-sandstone-100 dark:bg-earth-800 shadow-2xl z-50 flex flex-col border-l border-primary-200 dark:border-earth-700"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-earth-700 bg-gradient-to-r from-primary-600 to-secondary-600">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-sandstone-100" />
                <h2 className="text-xl font-display font-bold text-sandstone-100">
                  Cart ({getTotalItems()})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-sandstone-100/80 hover:text-sandstone-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="h-16 w-16 text-charcoal-300 dark:text-sandstone-500 mx-auto mb-4" />
                  <h3 className="text-lg font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-charcoal-600 dark:text-sandstone-400 font-body mb-6">
                    Add some beautiful African fashion pieces to get started
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-primary-600 text-sandstone-100 px-6 py-3 rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const isFabricProduct = item.product.material === 'Fabric' || item.product.material === 'Cotton Blend';
                    const priceToUse = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (item.product.is_on_offer ? item.product.offer_price! : item.product.price);
                    const discountAmount = isFabricProduct ? (item.product.price - DISCOUNTED_FABRIC_PRICE) : (item.product.is_on_offer ? item.product.price - priceToUse : 0);

                    return (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="bg-sandstone-200 dark:bg-earth-700 rounded-lg p-4 border border-primary-100 dark:border-earth-600"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <div className="flex space-x-4">
                          <img
                            src={item.product.image_urls[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg border border-primary-200 dark:border-earth-600"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200 text-sm mb-1">
                              {item.product.name}
                            </h3>
                            
                            <div className="text-xs text-charcoal-600 dark:text-sandstone-400 font-body mb-2">
                              {item.size && `Size: ${item.size}`}
                              {item.color && ` • Color: ${item.color}`}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="bg-sandstone-100 dark:bg-earth-600 border border-primary-300 dark:border-earth-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-earth-500 transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                
                                <span className="font-body font-medium w-8 text-center text-charcoal-800 dark:text-sandstone-200">
                                  {item.quantity}
                                </span>
                                
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="bg-sandstone-100 dark:bg-earth-600 border border-primary-300 dark:border-earth-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-earth-500 transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <div className="flex items-center space-x-2">
                                <div className="text-right">
                                  {discountAmount > 0 && (
                                    <div className="text-xs text-charcoal-500 dark:text-sandstone-500 line-through">
                                      KES {(item.product.price * item.quantity).toLocaleString()}
                                    </div>
                                  )}
                                  <span className="font-display font-bold text-charcoal-900 dark:text-sandstone-200">
                                    KES {(priceToUse * item.quantity).toLocaleString()}
                                  </span>
                                  {discountAmount > 0 && (
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                      -{Math.round((discountAmount / item.product.price) * 100)}% OFF
                                    </div>
                                  )}
                                </div>
                                
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-secondary-500 hover:text-secondary-600 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary-200 dark:border-earth-700 p-6 space-y-4 bg-sandstone-200 dark:bg-earth-700">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display font-semibold text-charcoal-900 dark:text-sandstone-200">
                    Total
                  </span>
                  <span className="text-2xl font-display font-bold text-charcoal-900 dark:text-sandstone-200">
                    KES {getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <motion.button
                  onClick={checkout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-lg font-body font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Complete Order on WhatsApp</span>
                </motion.button>

                <button
                  onClick={onClose}
                  className="w-full border-2 border-primary-300 dark:border-earth-600 text-charcoal-800 dark:text-sandstone-200 py-3 rounded-lg font-body font-semibold hover:bg-primary-50 dark:hover:bg-earth-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;