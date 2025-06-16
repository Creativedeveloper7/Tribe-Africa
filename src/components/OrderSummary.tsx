import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { DesignSelection } from '../types/design';
import { CONTACT_INFO } from '../constants/contact';

interface OrderSummaryProps {
  selection: DesignSelection;
  onClose: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selection, onClose }) => {
  const { fabricName, fabricPrice, design, totalPrice } = selection;
  const designDiscount = design.price * 0.33;
  const discountedDesignPrice = design.price - designDiscount;

  const generateWhatsAppMessage = () => {
    const message = `Hi Tribe Africa! 🌍%0A` +
      `Hope you're doing great!%0A` +
      `I'd love to complete my order for:%0A%0A` +
      `🧵 Product: ${fabricName}%0A` +
      `📏 Size: %0A` +
      `🎨 Color: %0A` +
      `🔢 Quantity: 1%0A` +
      `💰 Price: ₦${totalPrice.toLocaleString()}%0A%0A` +
      `Kindly guide me on how to proceed — can't wait to rock this look! 😄`;

    return `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${message}`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-primary-200 dark:border-earth-600"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="bg-earth-900 text-sandstone-100 p-6">
          <h2 className="text-2xl font-header font-bold mb-2">
            Order Summary
          </h2>
          <p className="text-primary-100 font-sans">
            Review your selection before proceeding
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Fabric Selection */}
          <div className="bg-white dark:bg-earth-700 rounded-xl p-4">
            <h3 className="font-header font-semibold text-lg text-charcoal-800 dark:text-sandstone-200 mb-2">
              Selected Fabric
            </h3>
            <p className="text-charcoal-600 dark:text-sandstone-400">
              {fabricName}
            </p>
            <p className="text-primary-600 dark:text-primary-400 font-sans mt-1">
              ₦{fabricPrice.toLocaleString()}
            </p>
          </div>

          {/* Design Selection */}
          <div className="bg-white dark:bg-earth-700 rounded-xl p-4">
            <h3 className="font-header font-semibold text-lg text-charcoal-800 dark:text-sandstone-200 mb-2">
              Selected Design
            </h3>
            <div className="flex items-start space-x-4">
              <img
                src={design.image}
                alt={design.name}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div>
                <p className="text-charcoal-800 dark:text-sandstone-200 font-semibold">
                  {design.name}
                </p>
                <p className="text-charcoal-600 dark:text-sandstone-400">
                  Original Price: ₦{design.price.toLocaleString()}
                </p>
                <p className="text-green-600 dark:text-green-400">
                  Discount (33%): -₦{designDiscount.toLocaleString()}
                </p>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mt-1">
                  Final Price: ₦{discountedDesignPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-earth-900 text-sandstone-100 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="font-header font-semibold text-lg">
                Total Cost
              </span>
              <span className="font-sans text-xl">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-sans font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Complete Order on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="w-full bg-charcoal-200 dark:bg-earth-700 hover:bg-charcoal-300 dark:hover:bg-earth-600 text-charcoal-800 dark:text-sandstone-200 font-sans font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Back to Selection
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderSummary; 