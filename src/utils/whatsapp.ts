import { ProductOrder, DesignOrder } from '../types/order';

const CONTACT_INFO = {
  whatsapp: '254727399983', // WhatsApp number for Tribe Africa
  businessName: 'Tribe Africa'
};

interface OrderItem {
  name: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
}

const formatCurrency = (amount: number): string => {
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
    `Price: ${formatCurrency(item.price)}`
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
    items = order.map(item => ({
      name: item.product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.product.price
    }));
  } else if ('product' in order) {
    items = [{
      name: order.product.name,
      size: order.size,
      color: order.color,
      quantity: order.quantity,
      price: order.product.price
    }];
  } else {
    items = [{
      name: order.design.name,
      size: order.size,
      color: order.color,
      quantity: order.quantity,
      price: order.design.price
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