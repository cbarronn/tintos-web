import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collections } from '@/data/products';
import { CollectionPage } from './CollectionPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    title: `${collection.name} — Colección`,
    description: `${collection.description} | TINTOS — Botines artesanales de León, Guanajuato.`,
  };
}

export default async function CollectionPageRoute({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  return <CollectionPage collection={collection} />;
}
