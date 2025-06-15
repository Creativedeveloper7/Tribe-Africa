import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { GallerySelection } from '../types/gallery';
import { generateWhatsAppLink } from '../utils/whatsapp';

interface DesignOrderSummaryProps {
  selection: GallerySelection;
  onClose: () => void;
}

const DesignOrderSummary: React.FC<DesignOrderSummaryProps> = ({ selection, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { fabricName, fabricPrice, design, totalPrice } = selection;
  const designDiscount = design.basePrice * 0.20;
  const discountedDesignPrice = design.basePrice - designDiscount;

  const handleWhatsAppRedirect = () => {
    const orderDetails = {
      ...selection,
      size: selectedSize,
      color: selectedColor,
      quantity
    };
    window.open(generateWhatsAppLink(orderDetails), '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-primary-200 dark:border-earth-600"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header */}
          <div className="bg-earth-900 text-sandstone-100 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-header font-bold text-sandstone-100">Order Summary</h2>
                <p className="text-primary-100 text-sm">Review your selection</p>
              </div>
              <button onClick={onClose} className="text-sandstone-100/80 hover:text-sandstone-100">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            {/* Summary Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-sandstone-200 dark:bg-earth-700 rounded-lg p-3">
                <h3 className="font-semibold text-sm mb-2 text-charcoal-800 dark:text-sandstone-100">Fabric</h3>
                <div className="text-sm space-y-1 text-charcoal-700 dark:text-sandstone-200">
                  <p><span className="font-medium">Name:</span> {fabricName}</p>
                  <p><span className="font-medium">Price:</span> KES {fabricPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-sandstone-200 dark:bg-earth-700 rounded-lg p-3">
                <h3 className="font-semibold text-sm mb-2 text-charcoal-800 dark:text-sandstone-100">Design</h3>
                <div className="text-sm space-y-1 text-charcoal-700 dark:text-sandstone-200">
                  <p><span className="font-medium">Style:</span> {design.name}</p>
                  <p><span className="font-medium">Base:</span> KES {design.basePrice.toLocaleString()}</p>
                  <p className="text-secondary-600 dark:text-secondary-400"><span className="font-medium">Discount:</span> -20%</p>
                  <p><span className="font-medium">Final:</span> KES {discountedDesignPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Design Image */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <img src={design.imageUrl} alt={design.name} className="w-full h-full object-cover" />
            </div>

            {/* Selection Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Size Selection */}
              <div>
                <h3 className="font-semibold text-sm mb-2 text-charcoal-800 dark:text-sandstone-100">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 text-sm border rounded-lg transition-all ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'border-primary-300 dark:border-earth-600 hover:border-primary-400 dark:hover:border-primary-500 text-charcoal-700 dark:text-sandstone-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold text-sm mb-2 text-charcoal-800 dark:text-sandstone-100">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`p-2 text-sm border rounded-lg transition-all ${
                        selectedColor === color
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'border-primary-300 dark:border-earth-600 hover:border-primary-400 dark:hover:border-primary-500 text-charcoal-700 dark:text-sandstone-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between bg-sandstone-200 dark:bg-earth-700 rounded-lg p-3">
              <h3 className="font-semibold text-sm text-charcoal-800 dark:text-sandstone-100">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-earth-600 hover:bg-primary-200 dark:hover:bg-earth-500 text-charcoal-800 dark:text-sandstone-200 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-6 text-center text-charcoal-800 dark:text-sandstone-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-earth-600 hover:bg-primary-200 dark:hover:bg-earth-500 text-charcoal-800 dark:text-sandstone-200 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-charcoal-800 dark:text-sandstone-100">Total Price</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">
                  KES {(totalPrice * quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="p-4 border-t border-primary-200 dark:border-earth-600 flex-shrink-0 bg-sandstone-100 dark:bg-earth-800">
            <div className="space-y-2">
              <motion.button
                onClick={handleWhatsAppRedirect}
                disabled={!selectedSize || !selectedColor}
                className="w-full bg-savanna-600 hover:bg-savanna-700 text-sandstone-100 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Complete Order on WhatsApp</span>
              </motion.button>

              <motion.button
                onClick={onClose}
                className="w-full border border-primary-300 dark:border-earth-600 hover:border-primary-500 dark:hover:border-primary-500 text-charcoal-800 dark:text-sandstone-200 hover:text-primary-600 dark:hover:text-primary-400 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Selection
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DesignOrderSummary; 