import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { products } from '@/data/products';
import { ProductDetail } from './ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — Botín Artesanal`,
    description: product.description,
    openGraph: {
      title: `${product.name} | TINTOS`,
      description: product.description,
      images: [{ url: product.images[0].src, width: 800, height: 1000, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
