'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { searchProducts } from '@/services/products';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      searchProducts(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] bg-warm/95 backdrop-blur-xl transition-opacity duration-400 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 pt-24 md:pt-32">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-carbon/60 hover:text-carbon transition-colors"
          aria-label="Cerrar búsqueda"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-8 font-light">
          ¿Qué estás buscando?
        </h2>

        {/* Input */}
        <div className="relative mb-10">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chelsea, Bostoniano, Negro, Cognac..."
            className="w-full bg-transparent border-b-2 border-carbon/20 focus:border-wine text-lg font-sans py-3 pr-10 outline-none transition-colors placeholder:text-carbon/30"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-carbon/40"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-5 group"
              >
                <div className="w-20 h-20 bg-ivory rounded overflow-hidden shrink-0">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-carbon">{product.name}</p>
                  <p className="font-sans text-xs text-carbon/50 uppercase tracking-wide">{product.category}</p>
                  <p className="font-sans text-sm text-carbon mt-1">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="text-center py-12">
            <p className="font-sans text-carbon/50">No encontramos ese modelo.</p>
            <Link
              href="/colecciones"
              onClick={onClose}
              className="inline-block mt-4 font-sans text-sm tracking-editorial text-wine hover:text-burgundy transition-colors"
            >
              VER TODA LA COLECCIÓN →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
