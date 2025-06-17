import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/whatsapp';
import { generateWhatsAppLink } from '../utils/whatsapp';

const DISCOUNTED_FABRIC_PRICE = 1999; // Fixed discounted fabric price

const CartPage: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice,
    checkout 
  } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCompleteOrder = () => {
    if (items.length === 0) return;
    checkout();
  };

  // Helper function to get the correct price for a product
  const getProductPrice = (product: any) => {
    return (product.material === 'Fabric' || product.material === 'Cotton Blend') 
      ? DISCOUNTED_FABRIC_PRICE 
      : (product.is_on_offer ? product.offer_price! : product.price);
  };

  // Helper function to get the original price for comparison
  const getOriginalPrice = (product: any) => {
    return product.price;
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sandstone-50 dark:bg-earth-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 dark:text-sandstone-100 mb-4">
                Your Cart is Empty
              </h1>
              
              <p className="text-lg text-charcoal-600 dark:text-sandstone-300 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to discover our beautiful African fashion collection!
              </p>
              
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sandstone-50 dark:bg-earth-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 dark:text-sandstone-100">
                  Your Cart
                </h1>
                <p className="text-charcoal-600 dark:text-sandstone-300 mt-2">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              
              <Link
                to="/shop"
                className="inline-flex items-center px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-earth-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-earth-700">
                  <h2 className="text-xl font-semibold text-charcoal-900 dark:text-sandstone-100">
                    Cart Items
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-earth-700">
                  <AnimatePresence>
                    {items.map((item, index) => {
                      const currentPrice = getProductPrice(item.product);
                      const originalPrice = getOriginalPrice(item.product);
                      const isFabricProduct = item.product.material === 'Fabric' || item.product.material === 'Cotton Blend';
                      const showDiscount = isFabricProduct && originalPrice !== currentPrice;
                      
                      return (
                        <motion.div
                          key={`${item.product.id}-${item.size}-${item.color}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-6"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-earth-700">
                                <img
                                  src={item.product.image_urls[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-charcoal-900 dark:text-sandstone-100 mb-2">
                                    {item.product.name}
                                  </h3>
                                  
                                  <div className="space-y-1 text-sm text-charcoal-600 dark:text-sandstone-300">
                                    {item.size && (
                                      <p>Size: <span className="font-medium">{item.size}</span></p>
                                    )}
                                    {item.color && (
                                      <p>Color: <span className="font-medium">{item.color}</span></p>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <p>Price: <span className="font-medium">{formatCurrency(currentPrice)}</span></p>
                                      {showDiscount && (
                                        <span className="text-xs text-charcoal-500 dark:text-sandstone-500 line-through">
                                          {formatCurrency(originalPrice)}
                                        </span>
                                      )}
                                    </div>
                                    {showDiscount && (
                                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                                        {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center border border-gray-300 dark:border-earth-600 rounded-lg">
                                    <button
                                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                      className="p-2 hover:bg-gray-100 dark:hover:bg-earth-700 transition-colors duration-200"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    
                                    <span className="px-4 py-2 text-center min-w-[3rem] font-medium text-charcoal-900 dark:text-sandstone-100">
                                      {item.quantity}
                                    </span>
                                    
                                    <button
                                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                      className="p-2 hover:bg-gray-100 dark:hover:bg-earth-700 transition-colors duration-200"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>

                                  {/* Remove Button */}
                                  <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>

                              {/* Item Total */}
                              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-earth-700">
                                <p className="text-right">
                                  <span className="text-sm text-charcoal-600 dark:text-sandstone-300">Item Total:</span>
                                  <span className="ml-2 text-lg font-semibold text-charcoal-900 dark:text-sandstone-100">
                                    {formatCurrency(currentPrice * item.quantity)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Cart Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-charcoal-900 dark:text-sandstone-100 mb-6">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-charcoal-600 dark:text-sandstone-300">
                    <span>Items ({getTotalItems()})</span>
                    <span>{formatCurrency(getTotalPrice())}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-earth-700 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-charcoal-900 dark:text-sandstone-100">
                      <span>Total</span>
                      <span>{formatCurrency(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  onClick={handleCompleteOrder}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Complete Order on WhatsApp
                </button>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    <strong>Note:</strong> Clicking "Complete Order" will open WhatsApp where you can finalize your purchase with our team.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 