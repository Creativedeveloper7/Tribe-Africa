export type DesignType = 'Maxi Dress' | 'Mini Dress' | 'Coat';

export interface Design {
  id: string;
  name: DesignType;
  imageUrl: string;
  basePrice: number;
}

export interface GallerySelection {
  fabricName: string;
  fabricPrice: number;
  design: Design;
  totalPrice: number;
}

export const DESIGN_PRICES: Record<DesignType, number> = {
  'Maxi Dress': 2500,
  'Mini Dress': 2000,
  'Coat': 3000
} as const;

export const DESIGN_DISCOUNT = 0.20; // 20% discount on designs 