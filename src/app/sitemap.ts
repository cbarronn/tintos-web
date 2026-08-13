import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { collections } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tintos.mx';

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const collectionUrls = collections.map((collection) => ({
    url: `${baseUrl}/colecciones/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/colecciones`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...collectionUrls,
    ...productUrls,
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/lookbook`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/guia-de-tallas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
