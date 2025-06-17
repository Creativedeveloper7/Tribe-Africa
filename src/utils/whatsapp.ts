import { ProductOrder, DesignOrder } from '../types/order';

const CONTACT_INFO = {
  whatsapp: '254727399983', // WhatsApp number for Tribe Africa
  businessName: 'Tribe Africa'
};

const DISCOUNTED_FABRIC_PRICE = 1999; // Fixed discounted fabric price

interface OrderItem {
  name: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  isFabric?: boolean;
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatOrderItem = (item: OrderItem): string => {
  const details = [
    `Product: ${item.name}`,
    item.size && `Size: ${item.size}`,
    item.color && `Color: ${item.color}`,
    `Quantity: ${item.quantity}`,
    item.isFabric && item.originalPrice ? `Original Price: ${formatCurrency(item.originalPrice)}` : undefined,
    `Price: ${formatCurrency(item.price)}`,
    item.isFabric && item.originalPrice ? `Discount: -${formatCurrency(item.originalPrice - item.price)}` : undefined,
    `Subtotal: ${formatCurrency(item.price * item.quantity)}`
  ].filter(Boolean).join('\n');

  return details;
};

const generateOrderMessage = (items: OrderItem[]): string => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const message = [
    `Hi ${CONTACT_INFO.businessName}! 🌍`,
    'Hope you\'re doing great!',
    '',
    'I\'d like to place an order:',
    '',
    ...items.map(item => formatOrderItem(item)),
    '',
    `Total: ${formatCurrency(total)}`,
    '',
    'Looking forward to hearing from you! 😊'
  ].join('\n');

  return message;
};

export const generateWhatsAppLink = (order: ProductOrder | DesignOrder | ProductOrder[]): string => {
  let items: OrderItem[] = [];

  if (Array.isArray(order)) {
    items = order.map(item => {
      const isFabricProduct = item.product.material === 'Fabric' || item.product.material === 'Cotton Blend';
      const priceToUse = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (item.product.is_on_offer ? item.product.offer_price! : item.product.price);
      
      return {
        name: item.product.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: priceToUse,
        originalPrice: isFabricProduct ? item.product.price : undefined,
        isFabric: isFabricProduct
      };
    });
  } else if ('product' in order) {
    const isFabricProduct = order.product.material === 'Fabric' || order.product.material === 'Cotton Blend';
    const priceToUse = isFabricProduct ? DISCOUNTED_FABRIC_PRICE : (order.product.is_on_offer ? order.product.offer_price! : order.product.price);
    
    items = [{
      name: order.product.name,
      size: order.size,
      color: order.color,
      quantity: order.quantity,
      price: priceToUse,
      originalPrice: isFabricProduct ? order.product.price : undefined,
      isFabric: isFabricProduct
    }];
  } else {
    // This branch is for DesignOrder
    const designDiscount = order.design.basePrice * 0.20;
    const discountedDesignPrice = order.design.basePrice - designDiscount;
    const totalCost = (discountedDesignPrice + DISCOUNTED_FABRIC_PRICE) * order.quantity;

    items = [{
      name: `${order.fabricName || 'Fabric'} with ${order.design.name}`,
      size: order.size,
      color: order.color,
      quantity: order.quantity,
      price: totalCost / order.quantity, // Price per item
      originalPrice: order.design.basePrice + (order.fabricPrice || 3000), // Original combined price
      isFabric: true
    }];
  }

  const message = generateOrderMessage(items);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
};

export const generateConsultationLink = (message: string): string => {
  const fullMessage = [
    `Hi ${CONTACT_INFO.businessName}! 🌍`,
    'Hope you\'re doing great!',
    '',
    message,
    '',
    'Looking forward to hearing from you! 😊'
  ].join('\n');

  const encodedMessage = encodeURIComponent(fullMessage);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
}; 