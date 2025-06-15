import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Design, GallerySelection } from '../types/gallery';
import { galleryDesigns } from '../data/gallery';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectionComplete: (selection: GallerySelection) => void;
  fabricName?: string;
  fabricPrice?: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectionComplete,
  fabricName = 'Ankara Red',
  fabricPrice = 1500
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Design['name'] | 'All'>('All');

  const categories = ['All', 'Maxi Dress', 'Mini Dress', 'Coat'] as const;

  const filteredDesigns = galleryDesigns.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || design.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDesignSelect = (design: Design) => {
    const designDiscount = design.basePrice * 0.2;
    const discountedDesignPrice = design.basePrice - designDiscount;
    const totalPrice = fabricPrice + discountedDesignPrice;

    onSelectionComplete({
      fabricName,
      fabricPrice,
      design,
      totalPrice
    });
    onClose();
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
            className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-primary-200 dark:border-earth-600"
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
                Select Your Design
              </h2>
              <p className="text-primary-100 font-sans">
                Choose from our collection of beautiful designs
              </p>

              {/* Search and Filter */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-sandstone-200 dark:bg-earth-700 border border-primary-200 dark:border-earth-600 rounded-lg text-charcoal-800 dark:text-sandstone-200 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-sans font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-sandstone-100'
                          : 'bg-sandstone-200 dark:bg-earth-700 text-charcoal-800 dark:text-sandstone-200 hover:bg-primary-100 dark:hover:bg-earth-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDesigns.map((design) => (
                  <motion.div
                    key={design.id}
                    className="group bg-sandstone-200 dark:bg-earth-700 rounded-xl overflow-hidden cursor-pointer border border-primary-200 dark:border-earth-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => handleDesignSelect(design)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={design.imageUrl}
                        alt={design.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-sandstone-100/90 dark:bg-earth-800/90 backdrop-blur-sm text-charcoal-800 dark:text-sandstone-200 px-4 py-2 rounded-full font-sans font-medium">
                          Select Design
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-header font-semibold text-lg text-charcoal-800 dark:text-sandstone-200">
                        {design.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-charcoal-600 dark:text-sandstone-400 font-sans">
                          Base Price: KES {design.basePrice.toLocaleString()}
                        </span>
                        <span className="text-secondary-500 font-sans font-medium">
                          -20% off
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal; 