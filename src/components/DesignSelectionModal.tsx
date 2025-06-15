import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Design, DESIGNS } from '../types/design';

interface DesignSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDesignSelect: (design: Design) => void;
  fabricName: string;
  fabricPrice: number;
}

const DesignSelectionModal: React.FC<DesignSelectionModalProps> = ({
  isOpen,
  onClose,
  onDesignSelect,
  fabricName,
  fabricPrice
}) => {
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
            className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-primary-200 dark:border-earth-600"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-earth-900 text-sandstone-100 p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-sandstone-100/80 hover:text-sandstone-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-header font-bold mb-2">
                Select a Design for {fabricName}
              </h2>
              <p className="text-primary-100 font-sans">
                Choose from our collection of beautiful designs
              </p>
            </div>

            {/* Design Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DESIGNS.map((design) => (
                  <motion.button
                    key={design.id}
                    onClick={() => onDesignSelect(design)}
                    className="group relative bg-white dark:bg-earth-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-w-3 aspect-h-4 relative">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-header font-semibold text-lg text-charcoal-800 dark:text-sandstone-200">
                        {design.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-sans">
                        ₦{design.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-charcoal-600 dark:text-sandstone-400 mt-1">
                        + Fabric Cost: ₦{fabricPrice.toLocaleString()}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesignSelectionModal; 