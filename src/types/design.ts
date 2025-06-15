export interface Design {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'dress' | 'coat' | 'custom';
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