import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DesignSelectionModal from '../components/DesignSelectionModal';
import { OrderSummary } from '../components/OrderSummary';
import { Design, DesignSelection } from '../types/design';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignSelection | null>(null);

  // Redirect if no product ID is provided
  if (!id) {
    return <Navigate to="/shop" replace />;
  }

  // This would typically come from your product data store
  const product = {
    id,
    name: 'African Print Fabric',
    price: 5000,
    image: '/placeholder-fabric.jpg',
    description: 'Beautiful African print fabric, perfect for creating stunning traditional and modern designs.'
  };

  const handleDesignSelect = (design: Design) => {
    const designDiscount = design.price * 0.33;
    const discountedDesignPrice = design.price - designDiscount;
    const totalPrice = product.price + discountedDesignPrice;

    setSelectedDesign({
      fabricId: product.id,
      fabricName: product.name,
      fabricPrice: product.price,
      design,
      totalPrice
    });

    setIsDesignModalOpen(false);
    setIsOrderSummaryOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-header font-bold text-charcoal-800 dark:text-sandstone-200">
            {product.name}
          </h1>
          
          <p className="text-2xl font-sans font-semibold text-primary-600 dark:text-primary-400">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="text-charcoal-600 dark:text-sandstone-400 font-sans">
            {product.description}
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setIsDesignModalOpen(true)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-sans font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Select Design from Gallery
            </button>

            <button
              className="w-full bg-charcoal-200 dark:bg-earth-700 hover:bg-charcoal-300 dark:hover:bg-earth-600 text-charcoal-800 dark:text-sandstone-200 font-sans font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Design Selection Modal */}
      <DesignSelectionModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        onDesignSelect={handleDesignSelect}
        fabricName={product.name}
        fabricPrice={product.price}
      />

      {/* Order Summary Modal */}
      {selectedDesign && (
        <OrderSummary
          selection={selectedDesign}
          onClose={() => {
            setIsOrderSummaryOpen(false);
            setSelectedDesign(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage; 