import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { ProductOrder } from '../types/order';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const order: ProductOrder = {
      product,
      size: product.sizes_available[0],
      color: product.colors_available[0],
      quantity: 1
    };
    addToCart(order);
  };

  const currentPrice = product.is_on_offer ? product.offer_price! : product.price;
  const discount = product.is_on_offer 
    ? Math.round(((product.price - product.offer_price!) / product.price) * 100)
    : 0;

  return (
    <motion.div
      className="group bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-primary-100 dark:border-earth-700"
      whileHover={{ y: -8 }}
      onClick={() => onQuickView(product)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image_urls[selectedImageIndex]}
          alt={product.name}
          className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-sandstone-100/90 dark:bg-earth-800/90 backdrop-blur-sm text-charcoal-800 dark:text-sandstone-200 p-3 rounded-full hover:bg-sandstone-100 dark:hover:bg-earth-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={handleAddToCart}
              className="bg-primary-600 text-sandstone-100 p-3 rounded-full hover:bg-primary-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.is_on_offer && (
            <span className="bg-secondary-500 text-sandstone-100 px-3 py-1 rounded-full text-sm font-body font-semibold shadow-lg">
              -{discount}%
            </span>
          )}
          {product.stock_quantity < 5 && (
            <span className="bg-charcoal-800 text-sandstone-100 px-3 py-1 rounded-full text-sm font-body font-semibold shadow-lg">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 text-sandstone-100 p-2 rounded-full bg-charcoal-900/20 backdrop-blur-sm hover:bg-charcoal-900/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart 
            className={`h-5 w-5 ${isLiked ? 'fill-secondary-500 text-secondary-500' : ''}`} 
          />
        </motion.button>

        {/* Image Dots */}
        {product.image_urls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.image_urls.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedImageIndex ? 'bg-sandstone-100' : 'bg-sandstone-100/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-body font-medium text-primary-600 uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-primary-500 fill-current" />
            <span className="text-sm text-charcoal-600 dark:text-sandstone-400 font-body">4.8</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-display font-semibold text-lg text-charcoal-900 dark:text-sandstone-200 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-charcoal-600 dark:text-sandstone-400 font-body text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.occasion_tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded-full font-body"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-charcoal-900 dark:text-sandstone-200">
              KES {currentPrice.toLocaleString()}
            </span>
            {product.is_on_offer && (
              <span className="text-sm text-charcoal-500 dark:text-sandstone-500 line-through font-body">
                KES {product.price.toLocaleString()}
              </span>
            )}
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            className="bg-primary-100 dark:bg-earth-700 hover:bg-primary-600 dark:hover:bg-primary-600 text-charcoal-700 dark:text-sandstone-300 hover:text-sandstone-100 p-2 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Available Sizes */}
        <div className="mt-4 pt-4 border-t border-primary-100 dark:border-earth-700">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-charcoal-600 dark:text-sandstone-400 font-body">Sizes:</span>
            <div className="flex space-x-1">
              {product.sizes_available.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="text-xs bg-primary-100 dark:bg-earth-700 text-charcoal-700 dark:text-sandstone-300 px-2 py-1 rounded font-body"
                >
                  {size}
                </span>
              ))}
              {product.sizes_available.length > 4 && (
                <span className="text-xs text-charcoal-500 dark:text-sandstone-500 font-body">+{product.sizes_available.length - 4}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;