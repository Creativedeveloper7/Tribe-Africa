import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Design } from '../types/gallery';
import { ProductOrder, DesignOrder } from '../types/order';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { CONTACT_INFO } from '../constants/contact';

const DISCOUNTED_FABRIC_PRICE = 1999; // Fixed discounted fabric price

// Add formatCurrency function since it's not exported from whatsapp utils
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface OrderSummaryProps {
  order: ProductOrder | DesignOrder | ProductOrder[];
  onClose: () => void;
}

export const OrderSummary = ({ order, onClose }: OrderSummaryProps) => {
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);

  const generateWhatsAppMessageContent = () => {
    if (Array.isArray(order)) {
      return order.map(item => {
        const isFabricProduct = item.product.material === 'Fabric' || item.product.material === 'Cotton Blend';
        const priceToUse = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (item.product.is_on_offer ? item.product.offer_price! : item.product.price);
        const discountAmount = isFabricProduct ? (item.product.price - DISCOUNTED_FABRIC_PRICE) : (item.product.is_on_offer ? item.product.price - priceToUse : 0);

        return [
          `Product: ${item.product.name}`,
          item.size && `Size: ${item.size}`,
          item.color && `Color: ${item.color}`,
          `Quantity: ${item.quantity}`,
          isFabricProduct && discountAmount > 0 ? `Original Price: ${formatCurrency(item.product.price)}` : undefined,
          `Price: ${formatCurrency(priceToUse)}`,
          discountAmount > 0 ? `Discount: -${formatCurrency(discountAmount)}` : undefined,
          `Subtotal: ${formatCurrency(priceToUse * item.quantity)}`
        ].filter(Boolean).join('\n');
      }).join('\n\n');
    } else if ('product' in order) {
      const isFabricProduct = order.product.material === 'Fabric' || order.product.material === 'Cotton Blend';
      const priceToUse = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (order.product.is_on_offer ? order.product.offer_price! : order.product.price);
      const discountAmount = isFabricProduct ? (order.product.price - DISCOUNTED_FABRIC_PRICE) : (order.product.is_on_offer ? order.product.price - priceToUse : 0);

      return [
        `Product: ${order.product.name}`,
        order.size && `Size: ${order.size}`,
        order.color && `Color: ${order.color}`,
        `Quantity: ${order.quantity}`,
        isFabricProduct && discountAmount > 0 ? `Original Price: ${formatCurrency(order.product.price)}` : undefined,
        `Price: ${formatCurrency(priceToUse)}`,
        discountAmount > 0 ? `Discount: -${formatCurrency(discountAmount)}` : undefined,
        `Subtotal: ${formatCurrency(priceToUse * order.quantity)}`
      ].filter(Boolean).join('\n');
    } else {
      // This branch is for DesignOrder
      const designDiscount = order.design.basePrice * 0.20;
      const discountedDesignPrice = order.design.basePrice - designDiscount;
      const totalCost = (discountedDesignPrice + DISCOUNTED_FABRIC_PRICE) * order.quantity;

      return [
        `Design: ${order.design.name}`,
        order.size && `Size: ${order.size}`,
        order.color && `Color: ${order.color}`,
        `Quantity: ${order.quantity}`,
        '\n',
        'Pricing Details:',
        `Unit Design Price: ${formatCurrency(order.design.basePrice)}`,
        `Design Discount (20%): -${formatCurrency(designDiscount)}`,
        `Final Design Price: ${formatCurrency(discountedDesignPrice)}`,
        order.fabricName && `Fabric: ${order.fabricName}`,
        `Fabric Price: ${formatCurrency(DISCOUNTED_FABRIC_PRICE)}`,
        `Total Cost per Item: ${formatCurrency(discountedDesignPrice + DISCOUNTED_FABRIC_PRICE)}`,
        '\n',
        `Total Order Cost: ${formatCurrency(totalCost)}`
      ].filter(Boolean).join('\n');
    }
  };

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(CONTACT_INFO.whatsapp.message.prefix + generateWhatsAppMessageContent() + CONTACT_INFO.whatsapp.message.suffix)}`;

  let overallTotal = 0;
  if (Array.isArray(order)) {
    overallTotal = order.reduce((sum, item) => {
      const priceToUse = (item.product.material === 'Fabric' || item.product.material === 'Cotton Blend') ? DISCOUNTED_FABRIC_PRICE : (item.product.is_on_offer ? item.product.offer_price! : item.product.price);
      return sum + (priceToUse * item.quantity);
    }, 0);
  } else if ('product' in order) {
    const priceToUse = (order.product.material === 'Fabric' || order.product.material === 'Cotton Blend') ? DISCOUNTED_FABRIC_PRICE : (order.product.is_on_offer ? order.product.offer_price! : order.product.price);
    overallTotal = priceToUse * order.quantity;
  } else {
    const designDiscount = order.design.basePrice * 0.20;
    const discountedDesignPrice = order.design.basePrice - designDiscount;
    overallTotal = (discountedDesignPrice + DISCOUNTED_FABRIC_PRICE) * order.quantity;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close order summary"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

        <div className="space-y-6">
          {Array.isArray(order) ? (
            order.map((item, index) => (
              <div key={index} className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                  {item.size && <p className="text-sm text-gray-600 dark:text-gray-300">Size: {item.size}</p>}
                  {item.color && <p className="text-sm text-gray-600 dark:text-gray-300">Color: {item.color}</p>}
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(((item.product.material === 'Fabric' || item.product.material === 'Cotton Blend') ? DISCOUNTED_FABRIC_PRICE : (item.product.is_on_offer ? item.product.offer_price! : item.product.price)) * item.quantity)}
                    </p>
                    {((item.product.material === 'Fabric' || item.product.material === 'Cotton Blend') && item.product.price !== DISCOUNTED_FABRIC_PRICE) || item.product.is_on_offer && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                        {(item.product.material === 'Fabric' || item.product.material === 'Cotton Blend') ? 
                          `${Math.round(((item.product.price - DISCOUNTED_FABRIC_PRICE) / item.product.price) * 100)}% OFF` : 
                          `${Math.round((1 - (item.product.offer_price! / item.product.price)) * 100)}% OFF`
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : 'product' in order ? (
            <div className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={order.product.image_urls[0]}
                  alt={order.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.product.name}</h3>
                {order.size && <p className="text-sm text-gray-600 dark:text-gray-300">Size: {order.size}</p>}
                {order.color && <p className="text-sm text-gray-600 dark:text-gray-300">Color: {order.color}</p>}
                <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {order.quantity}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(((order.product.material === 'Fabric' || order.product.material === 'Cotton Blend') ? DISCOUNTED_FABRIC_PRICE : (order.product.is_on_offer ? order.product.offer_price! : order.product.price)) * order.quantity)}
                  </p>
                  {((order.product.material === 'Fabric' || order.product.material === 'Cotton Blend') && order.product.price !== DISCOUNTED_FABRIC_PRICE) || order.product.is_on_offer && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      {(order.product.material === 'Fabric' || order.product.material === 'Cotton Blend') ? 
                        `${Math.round(((order.product.price - DISCOUNTED_FABRIC_PRICE) / order.product.price) * 100)}% OFF` : 
                        `${Math.round((1 - (order.product.offer_price! / order.product.price)) * 100)}% OFF`
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={order.design.imageUrl}
                    alt={order.design.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.design.name}</h3>
                  {order.size && <p className="text-sm text-gray-600 dark:text-gray-300">Size: {order.size}</p>}
                  {order.color && <p className="text-sm text-gray-600 dark:text-gray-300">Color: {order.color}</p>}
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {order.quantity}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Design Price: {formatCurrency(order.design.basePrice)}
                    </p>
                    {order.fabricName && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Fabric: {order.fabricName}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Fabric Price: {formatCurrency(DISCOUNTED_FABRIC_PRICE)}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Total: {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsWhatsAppHovered(true)}
            onMouseLeave={() => setIsWhatsAppHovered(false)}
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-white transition-colors hover:bg-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Complete Order on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};