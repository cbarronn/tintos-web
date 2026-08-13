import { Product, Collection } from '@/types/product';

export const products: Product[] = [
  {
    id: 'tintos-001',
    sku: 'TNTS-CHE-NEG-001',
    name: 'Chelsea Negro',
    slug: 'chelsea-negro',
    category: 'chelsea',
    shortDescription: 'Botín Chelsea de piel en negro.',
    description:
      'Botín Chelsea artesanal fabricado en León, Guanajuato. Diseñado con atención a cada detalle para acompañarte durante años.',
    price: 3490,
    currency: 'MXN',
    stock: 20,
    colors: [
      { name: 'Negro', hex: '#1a1a1a', slug: 'negro' },
    ],
    sizes: [
      { value: '25', available: true },
      { value: '25.5', available: true },
      { value: '26', available: true },
      { value: '26.5', available: true },
      { value: '27', available: true },
      { value: '27.5', available: true },
      { value: '28', available: true },
      { value: '28.5', available: true },
      { value: '29', available: true },
      { value: '29.5', available: false },
      { value: '30', available: true },
    ],
    materials: ['Piel natural'],
    images: [
      { src: '/images/products/chelsea-negro-main.jpg', alt: 'Chelsea Negro TINTOS - Vista frontal', type: 'main' },
      { src: '/images/products/chelsea-negro-detail.jpg', alt: 'Chelsea Negro TINTOS - Detalle superior', type: 'hover' },
      { src: '/images/lifestyle/lookbook-studio-1.jpg', alt: 'Chelsea Negro TINTOS - Lookbook', type: 'lifestyle' },
      { src: '/images/lifestyle/lookbook-detail-1.jpg', alt: 'Chelsea Negro TINTOS - Detalle con traje', type: 'detail' },
      { src: '/images/editorial/editorial-auto-1.jpg', alt: 'Chelsea Negro TINTOS - Editorial', type: 'gallery' },
    ],
    featured: true,
    new: true,
    bestseller: true,
    available: true,
    badges: ['nuevo', 'bestseller'],
  },
  {
    id: 'tintos-002',
    sku: 'TNTS-CHE-COG-001',
    name: 'Chelsea Cognac',
    slug: 'chelsea-cognac',
    category: 'chelsea',
    shortDescription: 'Botín Chelsea de piel en cognac.',
    description:
      'Botín Chelsea artesanal en tono cognac, fabricado en León, Guanajuato. El acabado de la piel revela la calidad de cada pieza.',
    price: 3490,
    currency: 'MXN',
    stock: 15,
    colors: [
      { name: 'Cognac', hex: '#9B633A', slug: 'cognac' },
    ],
    sizes: [
      { value: '25', available: true },
      { value: '25.5', available: true },
      { value: '26', available: true },
      { value: '26.5', available: true },
      { value: '27', available: true },
      { value: '27.5', available: true },
      { value: '28', available: true },
      { value: '28.5', available: false },
      { value: '29', available: true },
      { value: '29.5', available: true },
      { value: '30', available: true },
    ],
    materials: ['Piel natural'],
    images: [
      { src: '/images/products/chelsea-cognac-main.jpg', alt: 'Chelsea Cognac TINTOS - Vista lateral', type: 'main' },
      { src: '/images/products/chelsea-cognac-detail.jpg', alt: 'Chelsea Cognac TINTOS - Detalle puntas', type: 'hover' },
      { src: '/images/products/chelsea-cognac-lifestyle.jpg', alt: 'Chelsea Cognac TINTOS - En mano', type: 'lifestyle' },
      { src: '/images/products/chelsea-cognac-worn.jpg', alt: 'Chelsea Cognac TINTOS - Puesto', type: 'detail' },
      { src: '/images/editorial/hero-chelsea-cognac.jpg', alt: 'Chelsea Cognac TINTOS - Editorial', type: 'gallery' },
    ],
    featured: true,
    new: true,
    bestseller: false,
    available: true,
    badges: ['nuevo'],
  },
];

export const collections: Collection[] = [
  {
    name: 'Chelsea',
    slug: 'chelsea',
    description: 'Minimalista. Versátil. Atemporal.',
    tagline: 'El botín que define a TINTOS.',
    image: '/images/products/chelsea-negro-main.jpg',
  },
  {
    name: 'Bostonianos',
    slug: 'bostonianos',
    description: 'Tradición y carácter contemporáneo.',
    tagline: 'Próximamente.',
    image: '/images/editorial/editorial-bw-2.jpg',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
