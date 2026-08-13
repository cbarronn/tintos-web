export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: 'chelsea' | 'bostoniano' | 'casual';
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  materials: string[];
  images: ProductImage[];
  video?: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  available: boolean;
  badges?: Badge[];
}

export interface ProductColor {
  name: string;
  hex: string;
  slug: string;
}

export interface ProductSize {
  value: string;
  available: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  type: 'main' | 'hover' | 'detail' | 'lifestyle' | 'gallery';
}

export type Badge = 'nuevo' | 'bestseller' | 'edicion-limitada' | 'agotado' | 'ultimas-tallas';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Collection {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  image: string;
}
