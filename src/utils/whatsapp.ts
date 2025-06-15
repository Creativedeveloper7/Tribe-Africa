import { CONTACT_INFO } from '../constants/contact';
import { GallerySelection } from '../types/gallery';

interface ProductOrder {
  name: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
}

interface DesignOrder extends GallerySelection {
  size?: string;
  color?: string;
  quantity: number;
}

export const generateConsultationLink = (message: string) => {
  const { number } = CONTACT_INFO.whatsapp;
  const fullMessage = `Hi Tribe Africa! 🌍\nHope you're doing great!\n\n${message}\n\nLooking forward to hearing from you! 😊`;
  return `https://wa.me/${number}?text=${encodeURIComponent(fullMessage)}`;
};

export const generateWhatsAppLink = (orderDetails: ProductOrder | ProductOrder[] | DesignOrder) => {
  const { number, message } = CONTACT_INFO.whatsapp;
  
  let orderText = '';
  
  if ('design' in orderDetails) {
    // Design order with fabric
    const { fabricName, fabricPrice, design, totalPrice, size, color, quantity } = orderDetails;
    const designDiscount = design.basePrice * 0.20; // 20% discount
    const discountedDesignPrice = design.basePrice - designDiscount;

    orderText = `🧵 Fabric Order with Design\n\n` +
      `👕 Fabric Details:\n` +
      `• Name: ${fabricName}\n` +
      `• Price: KES ${fabricPrice.toLocaleString()}\n\n` +
      `✂️ Design Details:\n` +
      `• Style: ${design.name}\n` +
      `• Base Price: KES ${design.basePrice.toLocaleString()}\n` +
      `• Discount: -20% (KES ${designDiscount.toLocaleString()})\n` +
      `• Final Design Price: KES ${discountedDesignPrice.toLocaleString()}\n` +
      `${size ? `📏 Size: ${size}\n` : ''}` +
      `${color ? `🎨 Color: ${color}\n` : ''}` +
      `🔢 Quantity: ${quantity}\n\n` +
      `💰 Total Price: KES ${totalPrice.toLocaleString()}`;
  } else if (Array.isArray(orderDetails)) {
    // Multiple products (cart)
    orderText = orderDetails.map(item => 
      `• ${item.name}${item.size ? ` (${item.size})` : ''}${item.color ? `, ${item.color}` : ''} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
  } else {
    // Single product
    const item = orderDetails;
    orderText = `🧵 Product: ${item.name}\n` +
      `${item.size ? `📏 Size: ${item.size}\n` : ''}` +
      `${item.color ? `🎨 Color: ${item.color}\n` : ''}` +
      `🔢 Quantity: ${item.quantity}\n` +
      `💰 Price: KES ${(item.price * item.quantity).toLocaleString()}`;
  }

  const fullMessage = message.prefix + orderText + message.suffix;
  return `https://wa.me/${number}?text=${encodeURIComponent(fullMessage)}`;
}; 