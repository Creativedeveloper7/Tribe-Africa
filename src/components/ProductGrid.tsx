import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Product, Gender, Occasion } from '../types';
import { sampleProducts } from '../data/products';

interface ProductGridProps {
  selectedGender?: Gender;
  selectedOccasion?: Occasion;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  selectedGender, 
  selectedOccasion, 
  searchQuery = '' 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [...new Set(sampleProducts.map(p => p.category))];
  const maxPrice = Math.max(...sampleProducts.map(p => p.price));

  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts];

    // Apply gender filter
    if (selectedGender) {
      filtered = filtered.filter(product => 
        product.gender === selectedGender || product.gender === 'Unisex'
      );
    }

    // Apply occasion filter
    if (selectedOccasion) {
      filtered = filtered.filter(product =>
        product.occasion_tags.includes(selectedOccasion)
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.occasion_tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.is_on_offer ? product.offer_price! : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        filtered.sort((a, b) => {
          const priceA = a.is_on_offer ? a.offer_price! : a.price;
          const priceB = b.is_on_offer ? b.offer_price! : b.price;
          return priceA - priceB;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
        break;
    }

    return filtered;
  }, [selectedGender, selectedOccasion, searchQuery, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="py-16 bg-sandstone-200 dark:bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 dark:text-sandstone-200 mb-2">
              {selectedGender && selectedOccasion 
                ? `${selectedGender} ${selectedOccasion} Collection`
                : selectedGender 
                ? `${selectedGender} Collection`
                : selectedOccasion
                ? `${selectedOccasion} Collection`
                : 'All Products'
              }
            </h2>
            <p className="text-charcoal-600 dark:text-sandstone-400 font-body">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-sandstone-100 dark:bg-earth-800 border border-primary-300 dark:border-earth-600 rounded-lg px-4 py-2 pr-8 font-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-charcoal-800 dark:text-sandstone-200"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price">Price Low-High</option>
              </select>
              <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-500 dark:text-sandstone-500 pointer-events-none" />
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-sandstone-100 dark:bg-earth-800 border border-primary-300 dark:border-earth-600 rounded-lg px-4 py-2 font-body hover:bg-primary-50 dark:hover:bg-earth-700 transition-colors text-charcoal-800 dark:text-sandstone-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </motion.button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="bg-sandstone-100 dark:bg-earth-800 rounded-lg border border-primary-200 dark:border-earth-600 p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded border-primary-300 dark:border-earth-600 text-primary-600 focus:ring-primary-500 bg-sandstone-100 dark:bg-earth-700"
                        />
                        <span className="ml-2 font-body text-charcoal-700 dark:text-sandstone-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-600"
                    />
                    <div className="flex items-center justify-between text-sm font-body text-charcoal-600 dark:text-sandstone-400">
                      <span>KES {priceRange[0].toLocaleString()}</span>
                      <span>KES {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <ProductCard
                  product={product}
                  onQuickView={setSelectedProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="h-16 w-16 text-charcoal-400 dark:text-sandstone-500 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-charcoal-900 dark:text-sandstone-200 mb-2">
              No products found
            </h3>
            <p className="text-charcoal-600 dark:text-sandstone-400 font-body mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange([0, maxPrice]);
              }}
              className="bg-primary-600 text-sandstone-100 px-6 py-3 rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default ProductGrid;