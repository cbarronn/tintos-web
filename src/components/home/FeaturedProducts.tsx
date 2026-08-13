'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickShop } from '@/components/product/QuickShop';
import { getFeaturedProducts } from '@/data/products';
import type { Product } from '@/types/product';

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [quickShopProduct, setQuickShopProduct] = useState<Product | null>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-36 bg-warm">
        {/* Title */}
        <div className="text-center mb-14 md:mb-20">
          <p className="animate-on-scroll font-sans text-[11px] tracking-[0.3em] text-carbon/40 mb-4 uppercase">
            Colección
          </p>
          <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-carbon font-light">
            PIEZAS ESENCIALES
          </h2>
        </div>

        {/* Grid — 2 columns for premium feel, not cramped 4-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-x-12 md:gap-y-20 max-w-4xl mx-auto">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="animate-on-scroll"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <ProductCard
                product={product}
                onQuickShop={(p) => setQuickShopProduct(p)}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-24">
          <Link
            href="/colecciones"
            className="animate-on-scroll inline-flex items-center gap-3 font-sans text-[13px] tracking-[0.12em] text-carbon border-b border-carbon/30 pb-1.5 hover:border-carbon transition-colors btn-arrow"
          >
            VER TODA LA COLECCIÓN <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <QuickShop
        product={quickShopProduct}
        isOpen={!!quickShopProduct}
        onClose={() => setQuickShopProduct(null)}
      />
    </>
  );
}
