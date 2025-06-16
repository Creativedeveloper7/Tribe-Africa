import { Product } from './index';
import { Design } from './gallery';

export interface ProductOrder {
  product: Product;
  size?: string;
  color?: string;
  quantity: number;
}

export interface DesignOrder {
  design: Design;
  size?: string;
  color?: string;
  quantity: number;
  fabricName?: string;
  fabricPrice?: number;
  totalPrice: number;
} 