import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerCampaign {
  id: string;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  priority: number;
}

interface BannerManagerProps {
  banners: BannerCampaign[];
  autoRotate?: boolean;
  rotationInterval?: number; // in milliseconds
  showNavigation?: boolean;
  onClose?: () => void;
}

const BannerManager: React.FC<BannerManagerProps> = ({
  banners,
  autoRotate = true,
  rotationInterval = 5000,
  showNavigation = false,
  onClose
}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter active banners based on date range
  const activeBanners = banners.filter(banner => {
    console.log('Checking banner:', banner.id, 'isActive:', banner.isActive);
    
    if (!banner.isActive) {
      console.log('Banner', banner.id, 'is not active');
      return false;
    }
    
    console.log('Banner', banner.id, 'is active');
    return true;
  }).sort((a, b) => b.priority - a.priority);

  console.log('Active banners:', activeBanners.length, activeBanners);

  useEffect(() => {
    if (!autoRotate || activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, activeBanners.length]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handlePrevious = () => {
    setCurrentBannerIndex((prev) => 
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
  };

  if (activeBanners.length === 0) {
    console.log('No active banners found');
    return null;
  }

  if (!isVisible) {
    console.log('Banner is not visible');
    return null;
  }

  const currentBanner = activeBanners[currentBannerIndex];
  console.log('Rendering banner:', currentBanner.id);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentBanner.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full bg-sandstone-200 dark:bg-earth-800 border-b border-primary-200 dark:border-earth-700"
      >
        {/* Banner Image */}
        <div className="relative w-full">
          {currentBanner.linkUrl ? (
            <a 
              href={currentBanner.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-95 transition-opacity"
            >
              <img
                src={currentBanner.imageUrl}
                alt={currentBanner.altText}
                className="w-full h-auto object-cover"
                loading="lazy"
                onError={(e) => console.error('Banner image failed to load:', currentBanner.imageUrl)}
                onLoad={() => console.log('Banner image loaded successfully:', currentBanner.imageUrl)}
              />
            </a>
          ) : (
            <img
              src={currentBanner.imageUrl}
              alt={currentBanner.altText}
              className="w-full h-auto object-cover"
              loading="lazy"
              onError={(e) => console.error('Banner image failed to load:', currentBanner.imageUrl)}
              onLoad={() => console.log('Banner image loaded successfully:', currentBanner.imageUrl)}
            />
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-charcoal-900/50 hover:bg-charcoal-900/70 text-sandstone-100 p-1 md:p-2 rounded-full transition-colors backdrop-blur-sm z-10"
            aria-label="Close banner"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          {/* Navigation Arrows (if multiple banners and navigation enabled) */}
          {showNavigation && activeBanners.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-charcoal-900/50 hover:bg-charcoal-900/70 text-sandstone-100 p-2 rounded-full transition-colors backdrop-blur-sm z-10"
                aria-label="Previous banner"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-charcoal-900/50 hover:bg-charcoal-900/70 text-sandstone-100 p-2 rounded-full transition-colors backdrop-blur-sm z-10"
                aria-label="Next banner"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Banner Indicators (if multiple banners) */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBannerIndex 
                      ? 'bg-sandstone-100' 
                      : 'bg-sandstone-100/50 hover:bg-sandstone-100/75'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BannerManager; 