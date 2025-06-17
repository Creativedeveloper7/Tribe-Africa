import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface BannerProps {
  isVisible?: boolean;
  onClose?: () => void;
  imageUrl?: string;
  altText?: string;
  linkUrl?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  isVisible = true, 
  onClose, 
  imageUrl = '/gallery/banner.png',
  altText = 'Tribe Africa Campaign Banner',
  linkUrl 
}) => {
  if (!isVisible) return null;

  const BannerContent = () => (
    <div className="relative w-full">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-charcoal-900/50 hover:bg-charcoal-900/70 text-sandstone-100 p-1 md:p-2 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-sandstone-200 dark:bg-earth-800 border-b border-primary-200 dark:border-earth-700"
    >
      {linkUrl ? (
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-95 transition-opacity"
        >
          <BannerContent />
        </a>
      ) : (
        <BannerContent />
      )}
    </motion.div>
  );
};

export default Banner; 