import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { ProductOrder } from '../types/order';
import GalleryButton from './GalleryButton';

const DISCOUNTED_FABRIC_PRICE = 1999; // Fixed discounted fabric price

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!product) return null;

  const isFabricProduct = product.material === 'Fabric' || product.material === 'Cotton Blend';
  const currentPrice = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (product.is_on_offer ? product.offer_price! : product.price);
  const discount = isFabricProduct 
    ? Math.round(((product.price - DISCOUNTED_FABRIC_PRICE) / product.price) * 100)
    : (product.is_on_offer ? Math.round(((product.price - product.offer_price!) / product.price) * 100) : 0);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    const order: ProductOrder = {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    };
    addToCart(order);
    onClose();
  };

  const handleWhatsAppRedirect = () => {
    const order: ProductOrder = {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    };
    window.open(generateWhatsAppLink(order), '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.image_urls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.image_urls.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-primary-200 dark:border-earth-600"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0 h-full">
              {/* Image Section */}
              <div className="relative bg-sandstone-200 dark:bg-earth-700">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-sandstone-100/80 dark:bg-earth-800/80 backdrop-blur-sm text-charcoal-800 dark:text-sandstone-200 p-2 rounded-full hover:bg-sandstone-100 dark:hover:bg-earth-700 transition-colors shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                {(product.is_on_offer || isFabricProduct) && (
                  <div className="absolute top-4 left-4 z-10 bg-secondary-500 text-sandstone-100 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{discount}%
                  </div>
                )}

                <div className="relative h-64 md:h-full">
                  <img
                    src={product.image_urls[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {product.image_urls.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-sandstone-100/80 dark:bg-earth-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-sandstone-100 dark:hover:bg-earth-700 transition-colors shadow-lg"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-sandstone-100/80 dark:bg-earth-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-sandstone-100 dark:hover:bg-earth-700 transition-colors shadow-lg"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.image_urls.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-sandstone-100' : 'bg-sandstone-100/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-primary-500 fill-current" />
                      <span className="text-sm text-charcoal-600 dark:text-sandstone-400">4.8 (124 reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900 dark:text-sandstone-200 mb-3">
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-display font-bold text-charcoal-900 dark:text-sandstone-200">
                      KES {currentPrice.toLocaleString()}
                    </span>
                    {(product.is_on_offer || isFabricProduct) && (
                      <span className="text-lg text-charcoal-500 dark:text-sandstone-500 line-through">
                        KES {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-charcoal-600 dark:text-sandstone-400 font-body leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.occasion_tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200">Size</h3>
                    <GalleryButton 
                      fabricName={product.name}
                      fabricPrice={currentPrice}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes_available.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 border rounded-lg font-body font-medium transition-all ${
                          selectedSize === size
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'border-primary-300 dark:border-earth-600 hover:border-primary-400 dark:hover:border-primary-500 text-charcoal-700 dark:text-sandstone-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors_available.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg font-body transition-all ${
                          selectedColor === color
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'border-primary-300 dark:border-earth-600 hover:border-primary-400 dark:hover:border-primary-500 text-charcoal-700 dark:text-sandstone-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-3">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-primary-100 dark:bg-earth-700 hover:bg-primary-200 dark:hover:bg-earth-600 text-charcoal-800 dark:text-sandstone-200 w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-body font-semibold w-8 text-center text-charcoal-800 dark:text-sandstone-200">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-primary-100 dark:bg-earth-700 hover:bg-primary-200 dark:hover:bg-earth-600 text-charcoal-800 dark:text-sandstone-200 w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-sandstone-100 py-4 rounded-lg font-body font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Add to Cart - KES {(currentPrice * quantity).toLocaleString()}</span>
                  </motion.button>

                  <motion.a
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-savanna-600 hover:bg-savanna-700 text-sandstone-100 py-4 rounded-lg font-body font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Complete Order on WhatsApp</span>
                  </motion.a>

                  <motion.button
                    className="w-full border-2 border-primary-300 dark:border-earth-600 hover:border-primary-500 dark:hover:border-primary-500 text-charcoal-800 dark:text-sandstone-200 hover:text-primary-600 dark:hover:text-primary-400 py-4 rounded-lg font-body font-semibold flex items-center justify-center space-x-2 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Add to Wishlist</span>
                  </motion.button>
                </div>

                {/* Product Details */}
                <div className="mt-8 pt-6 border-t border-primary-200 dark:border-earth-700">
                  <div className="grid grid-cols-2 gap-4 text-sm font-body">
                    <div>
                      <span className="text-charcoal-600 dark:text-sandstone-400">Material:</span>
                      <span className="ml-2 font-semibold text-charcoal-800 dark:text-sandstone-200">{product.material}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-600 dark:text-sandstone-400">Stock:</span>
                      <span className="ml-2 font-semibold text-charcoal-800 dark:text-sandstone-200">{product.stock_quantity} left</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;