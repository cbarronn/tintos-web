/* Services layer — decoupled from any specific backend */
/* Currently uses local data. Ready to connect to Shopify, WooCommerce, or custom API */

import { products, getProductBySlug, getProductsByCategory, getFeaturedProducts } from '@/data/products';
import type { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  // Replace with API call: await fetch('/api/products')
  return products;
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  // Replace with API call: await fetch(`/api/products/${slug}`)
  return getProductBySlug(slug);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  // Replace with API call: await fetch(`/api/products?category=${category}`)
  return getProductsByCategory(category);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  // Replace with API call: await fetch('/api/products?featured=true')
  return getFeaturedProducts();
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
      p.sku.toLowerCase().includes(q)
  );
}
