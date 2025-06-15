export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
} 