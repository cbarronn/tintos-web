'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickShop } from '@/components/product/QuickShop';
import type { Product, Collection } from '@/types/product';

interface CollectionPageProps {
  collection: Collection;
}

export function CollectionPage({ collection }: CollectionPageProps) {
  const [quickShopProduct, setQuickShopProduct] = useState<Product | null>(null);
  const productList = getProductsByCategory(collection.slug);

  return (
    <>
      <div className="pt-20 md:pt-24">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[300px] max-h-[500px] overflow-hidden">
          <Image
            src={collection.image}
            alt={`Colección ${collection.name} TINTOS`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-deep/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] text-ivory/50 mb-3">COLECCIÓN</p>
              <h1 className="font-serif text-4xl md:text-6xl text-ivory font-light tracking-wide">
                {collection.name.toUpperCase()}
              </h1>
              <p className="font-sans text-sm text-ivory/60 mt-3 font-light">
                {collection.description}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-[var(--spacing-container)] py-4">
          <nav className="flex items-center gap-2 font-sans text-xs text-carbon/50">
            <Link href="/" className="hover:text-carbon transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/colecciones" className="hover:text-carbon transition-colors">Colecciones</Link>
            <span>/</span>
            <span className="text-carbon">{collection.name}</span>
          </nav>
        </div>

        {/* Products */}
        <div className="px-[var(--spacing-container)] pb-[var(--spacing-section)]">
          {productList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 max-w-6xl mx-auto">
              {productList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickShop={(p) => setQuickShopProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-serif text-2xl text-carbon/40 mb-3">{collection.tagline}</h2>
              <p className="font-sans text-sm text-carbon/40 mb-6">Esta colección estará disponible pronto.</p>
              <Link
                href="/colecciones"
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-editorial bg-carbon text-ivory px-6 py-3 hover:bg-wine transition-colors"
              >
                VER TODAS LAS COLECCIONES
              </Link>
            </div>
          )}
        </div>
      </div>

      <QuickShop
        product={quickShopProduct}
        isOpen={!!quickShopProduct}
        onClose={() => setQuickShopProduct(null)}
      />
    </>
  );
}
