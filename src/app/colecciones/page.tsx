'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickShop } from '@/components/product/QuickShop';
import type { Product } from '@/types/product';

export default function ColeccionesPage() {
  const [quickShopProduct, setQuickShopProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('recomendados');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'precio-bajo': return a.price - b.price;
      case 'precio-alto': return b.price - a.price;
      case 'nombre': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <>
      <div className="pt-20 md:pt-24">
        {/* Hero */}
        <div className="px-[var(--spacing-container)] pt-10 pb-12 md:pb-16 text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] text-carbon/40 mb-3">TINTOS</p>
          <h1 className="font-serif text-[var(--font-size-display)] text-carbon font-light">
            COLECCIONES
          </h1>
          <p className="font-sans text-sm text-carbon/50 mt-3 font-light max-w-md mx-auto">
            Cada par está hecho para acompañarte durante años.
          </p>
        </div>

        {/* Toolbar */}
        <div className="px-[var(--spacing-container)] flex items-center justify-between mb-8 border-b border-sand/30 pb-4">
          <p className="font-sans text-xs text-carbon/50">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'producto' : 'productos'}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-sans text-xs text-carbon bg-transparent border border-sand/40 px-3 py-2 outline-none cursor-pointer"
          >
            <option value="recomendados">Recomendados</option>
            <option value="nombre">Nombre</option>
            <option value="precio-bajo">Precio: menor a mayor</option>
            <option value="precio-alto">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Grid */}
        <div className="px-[var(--spacing-container)] pb-[var(--spacing-section)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 max-w-6xl mx-auto">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickShop={(p) => setQuickShopProduct(p)}
              />
            ))}
          </div>
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
