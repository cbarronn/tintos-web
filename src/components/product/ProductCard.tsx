'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductCardProps {
  product: Product;
  onQuickShop?: (product: Product) => void;
}

export function ProductCard({ product, onQuickShop }: ProductCardProps) {
  const mainImage = product.images.find((img) => img.type === 'main') || product.images[0];
  const hoverImage = product.images.find((img) => img.type === 'hover');
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleQuickShop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickShop) onQuickShop(product);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/producto/${product.slug}`} className="block relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-5">
        <div className="product-image-hover w-full h-full">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className="object-cover main-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hoverImage && (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt}
              fill
              className="object-cover hover-image"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Badges — refined pills */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badges.includes('nuevo') && (
              <span className="bg-white/90 backdrop-blur-sm text-carbon font-sans text-[10px] tracking-[0.15em] font-medium px-3 py-1.5 uppercase">
                Nuevo
              </span>
            )}
            {product.badges.includes('bestseller') && (
              <span className="bg-carbon/90 backdrop-blur-sm text-white font-sans text-[10px] tracking-[0.15em] font-medium px-3 py-1.5 uppercase">
                Bestseller
              </span>
            )}
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite(product.id) ? 'var(--color-wine)' : 'none'}
            stroke={isFavorite(product.id) ? 'var(--color-wine)' : 'currentColor'}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Shop Button */}
        <button
          onClick={handleQuickShop}
          className="absolute bottom-4 left-4 right-4 bg-carbon text-white font-sans text-xs tracking-[0.12em] font-medium py-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-wine"
        >
          AGREGAR AL CARRITO
        </button>
      </Link>

      {/* Product Info */}
      <Link href={`/producto/${product.slug}`} className="block space-y-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-lg md:text-xl font-light text-carbon leading-tight">
            {product.name}
          </h3>
          <p className="font-sans text-base font-medium text-carbon shrink-0">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="font-sans text-[11px] text-carbon/40 uppercase tracking-[0.15em]">
          {product.category}
        </p>
        {/* Colors */}
        <div className="flex gap-2 pt-1">
          {product.colors.map((color) => (
            <span
              key={color.slug}
              className="w-4 h-4 rounded-full border border-sand/50"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </Link>
    </div>
  );
}
