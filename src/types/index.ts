export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: 'Male' | 'Female' | 'Kids' | 'Unisex';
  occasion_tags: string[];
  price: number;
  sizes_available: string[];
  colors_available: string[];
  material: string;
  stock_quantity: number;
  image_urls: string[];
  is_on_offer: boolean;
  offer_price?: number;
  date_added: string;
  events_related: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  type: 'offer' | 'event';
}

export type Gender = 'Male' | 'Female' | 'Kids';
export type Occasion = 'Wedding Fit' | 'Work Fit' | 'Safari Fit' | 'Graduation' | 'Birthday' | 'Casual Wear';