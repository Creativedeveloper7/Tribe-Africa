export interface Design {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  category: string;
  sizes?: string[];
  colors?: string[];
  available: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DesignSelection {
  fabricId: string;
  fabricName: string;
  fabricPrice: number;
  design: Design;
  totalPrice: number;
}

export const DESIGNS: Design[] = [
  {
    id: 'maxi-dress',
    name: 'Maxi Dress',
    image: '/gallery/earth bue maxi dress.png',
    price: 3500,
    category: 'dress'
  },
  {
    id: 'mini-dress',
    name: 'Mini Dress',
    image: '/gallery/samba mini dress.png',
    price: 2000,
    category: 'dress'
  },
  {
    id: 'coat',
    name: 'Coat',
    image: '/gallery/kijani Coat.png',
    price: 2500,
    category: 'coat'
  }
]; 