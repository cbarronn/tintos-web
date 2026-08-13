'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

interface QuickShopProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickShop({ product, isOpen, onClose }: QuickShopProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedSize('');
      setQuantity(1);
      setAdded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!product) return null;

  const mainImage = product.images.find((img) => img.type === 'main') || product.images[0];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, product.colors[0]?.slug || '', quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-deep/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal (desktop) / Bottom Sheet (mobile) */}
      <div
        className={`fixed z-[61] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          bg-warm rounded-t-2xl md:rounded-xl md:max-w-lg md:w-full shadow-2xl
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full md:translate-y-[calc(-50%+20px)] opacity-0 pointer-events-none'}
        `}
      >
        <div className="p-6">
          {/* Drag handle (mobile) */}
          <div className="w-10 h-1 bg-sand/40 rounded-full mx-auto mb-5 md:hidden" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-carbon/40 hover:text-carbon transition-colors"
            aria-label="Cerrar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex gap-5">
            {/* Image */}
            <div className="w-28 h-36 bg-ivory rounded overflow-hidden shrink-0">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={112}
                height={144}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-serif text-xl font-light">{product.name}</h3>
              <p className="font-sans text-xs text-carbon/50 uppercase tracking-wide mt-1">{product.category}</p>
              <p className="font-sans text-lg font-medium mt-2">{formatPrice(product.price)}</p>
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-xs tracking-wide text-carbon/60">TALLA</p>
              <button className="font-sans text-[10px] text-wine hover:text-burgundy transition-colors tracking-wide underline">
                GUÍA DE TALLAS
              </button>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => size.available && setSelectedSize(size.value)}
                  disabled={!size.available}
                  className={`py-2 text-sm font-sans border transition-all duration-200 ${
                    selectedSize === size.value
                      ? 'bg-carbon text-ivory border-carbon'
                      : size.available
                      ? 'border-sand/50 text-carbon hover:border-carbon'
                      : 'border-sand/20 text-carbon/20 cursor-not-allowed line-through'
                  }`}
                >
                  {size.value}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-4">
            <p className="font-sans text-xs tracking-wide text-carbon/60">CANTIDAD</p>
            <div className="flex items-center border border-sand/50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-carbon/60 hover:text-carbon transition-colors"
              >
                −
              </button>
              <span className="w-9 h-9 flex items-center justify-center font-sans text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 flex items-center justify-center text-carbon/60 hover:text-carbon transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full mt-6 font-sans text-xs tracking-editorial py-4 transition-all duration-300 ${
              added
                ? 'bg-wine text-ivory'
                : selectedSize
                ? 'bg-carbon text-ivory hover:bg-wine'
                : 'bg-sand/30 text-carbon/30 cursor-not-allowed'
            }`}
          >
            {added ? 'AGREGADO AL CARRITO ✓' : selectedSize ? 'AGREGAR AL CARRITO' : 'SELECCIONA UNA TALLA'}
          </button>
        </div>
      </div>
    </>
  );
}
