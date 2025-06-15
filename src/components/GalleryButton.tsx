import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import GalleryModal from './GalleryModal';
import DesignOrderSummary from './DesignOrderSummary';
import { GallerySelection } from '../types/gallery';

interface GalleryButtonProps {
  fabricName?: string;
  fabricPrice?: number;
}

const GalleryButton: React.FC<GalleryButtonProps> = ({
  fabricName = 'Ankara Red',
  fabricPrice = 1500
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<GallerySelection | null>(null);

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  const handleDesignSelect = (selection: GallerySelection) => {
    setSelectedDesign(selection);
    setIsSummaryOpen(true);
  };

  const handleSummaryClose = () => {
    setIsSummaryOpen(false);
    setSelectedDesign(null);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsGalleryOpen(true)}
        className="bg-primary-600 hover:bg-primary-700 text-sandstone-100 px-6 py-3 rounded-lg font-body font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image className="h-5 w-5" />
        <span>Select Designs from Our Gallery</span>
      </motion.button>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={handleGalleryClose}
        onSelectionComplete={handleDesignSelect}
        fabricName={fabricName}
        fabricPrice={fabricPrice}
      />

      {selectedDesign && (
        <DesignOrderSummary
          selection={selectedDesign}
          onClose={handleSummaryClose}
        />
      )}
    </>
  );
};

export default GalleryButton; 