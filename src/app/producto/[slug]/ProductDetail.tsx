'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { formatPrice } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('descripcion');
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, product.colors[0]?.slug || '', quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordions = [
    {
      id: 'descripcion',
      title: 'Descripción',
      content: product.description,
    },
    {
      id: 'materiales',
      title: 'Materiales y fabricación',
      content: 'Piel natural seleccionada · Fabricación artesanal en León, Guanajuato · Suela de material premium · Elástico lateral de alta resistencia · Pull tab trasero · Cada par es cortado, cosido y acabado a mano.',
    },
    {
      id: 'cuidados',
      title: 'Cuidados',
      content: 'Limpiar con un paño suave y seco · Aplicar crema nutritiva para piel periódicamente · Evitar exposición directa al agua · Almacenar con hormas de madera · Rotar el uso entre pares para prolongar la vida del calzado.',
    },
    {
      id: 'envios',
      title: 'Envíos y cambios',
      content: 'Envío estándar 5-7 días hábiles ($299 MXN) · Envío express 2-3 días hábiles ($449 MXN) · Envío gratis en compras mayores a $4,500 MXN · Cambios de talla sin costo dentro de los primeros 30 días · Contacto directo por WhatsApp.',
    },
  ];

  return (
    <>
      <div className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="px-[var(--spacing-container)] py-4">
          <nav className="flex items-center gap-2 font-sans text-xs text-carbon/50">
            <Link href="/" className="hover:text-carbon transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/colecciones" className="hover:text-carbon transition-colors">Colecciones</Link>
            <span>/</span>
            <Link href={`/colecciones/${product.category}`} className="hover:text-carbon transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-carbon">{product.name}</span>
          </nav>
        </div>

        <div className="px-[var(--spacing-container)] pb-[var(--spacing-section)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-ivory overflow-hidden">
                <Image
                  src={product.images[selectedImage]?.src || product.images[0].src}
                  alt={product.images[selectedImage]?.alt || product.images[0].alt}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square bg-ivory overflow-hidden transition-all duration-200 ${
                      selectedImage === i ? 'ring-2 ring-carbon' : 'ring-1 ring-sand/30 hover:ring-sand'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div ref={stickyRef} className="md:sticky md:top-28 md:self-start">
              {/* Badges */}
              {product.badges && (
                <div className="flex gap-2 mb-4">
                  {product.badges.includes('nuevo') && (
                    <span className="bg-carbon text-ivory font-sans text-[9px] tracking-[0.15em] px-2.5 py-1">NUEVO</span>
                  )}
                  {product.badges.includes('bestseller') && (
                    <span className="bg-wine text-ivory font-sans text-[9px] tracking-[0.15em] px-2.5 py-1">BESTSELLER</span>
                  )}
                </div>
              )}

              <h1 className="font-serif text-3xl md:text-4xl text-carbon font-light">{product.name}</h1>
              <p className="font-sans text-xs text-carbon/50 uppercase tracking-wide mt-2">{product.category}</p>
              <p className="font-sans text-2xl text-carbon mt-4 font-medium">{formatPrice(product.price)}</p>

              {/* Color */}
              <div className="mt-6">
                <p className="font-sans text-xs tracking-wide text-carbon/60 mb-3">
                  COLOR — {product.colors[0]?.name}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color.slug}
                      className="w-7 h-7 rounded-full border-2 border-carbon"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-sans text-xs tracking-wide text-carbon/60">TALLA</p>
                  <Link
                    href="/guia-de-tallas"
                    className="font-sans text-[10px] text-wine hover:text-burgundy transition-colors tracking-wide underline"
                  >
                    GUÍA DE TALLAS
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => size.available && setSelectedSize(size.value)}
                      disabled={!size.available}
                      className={`py-2.5 text-sm font-sans border transition-all duration-200 ${
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

              {/* Quantity + Add to Cart */}
              <div className="mt-8 flex gap-3">
                <div className="flex items-center border border-sand/50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-12 flex items-center justify-center text-carbon/60 hover:text-carbon text-lg">−</button>
                  <span className="w-11 h-12 flex items-center justify-center font-sans text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-12 flex items-center justify-center text-carbon/60 hover:text-carbon text-lg">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 h-12 font-sans text-xs tracking-editorial transition-all duration-300 ${
                    added
                      ? 'bg-wine text-ivory'
                      : selectedSize
                      ? 'bg-carbon text-ivory hover:bg-wine'
                      : 'bg-sand/30 text-carbon/30 cursor-not-allowed'
                  }`}
                >
                  {added ? 'AGREGADO ✓' : selectedSize ? 'AGREGAR AL CARRITO' : 'SELECCIONA UNA TALLA'}
                </button>
              </div>

              {/* Favorite */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="mt-4 flex items-center gap-2 font-sans text-xs text-carbon/50 hover:text-wine transition-colors"
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
                {isFavorite(product.id) ? 'EN FAVORITOS' : 'AGREGAR A FAVORITOS'}
              </button>

              {/* Benefits */}
              <div className="mt-8 pt-6 border-t border-sand/30 space-y-3">
                {[
                  '✓ Hecho en México — León, Guanajuato',
                  '✓ Fabricación artesanal',
                  '✓ Envíos a todo el país',
                  '✓ Cambios de talla sin costo',
                ].map((benefit) => (
                  <p key={benefit} className="font-sans text-xs text-carbon/60">{benefit}</p>
                ))}
              </div>

              {/* Accordions */}
              <div className="mt-8 border-t border-sand/30">
                {accordions.map((accordion) => (
                  <div key={accordion.id} className="border-b border-sand/30">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === accordion.id ? null : accordion.id)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="font-sans text-sm text-carbon">{accordion.title}</span>
                      <span className="text-carbon/40 text-lg transition-transform duration-200" style={{
                        transform: activeAccordion === accordion.id ? 'rotate(45deg)' : 'none',
                      }}>
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeAccordion === accordion.id ? 'max-h-60 pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="font-sans text-xs text-carbon/60 leading-relaxed">
                        {accordion.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-warm/95 backdrop-blur-md border-t border-sand/30 z-40 px-4 py-3 md:hidden transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-sm font-medium truncate">{product.name}</p>
            <p className="font-sans text-sm text-carbon/70">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`shrink-0 font-sans text-[10px] tracking-editorial px-5 py-3 transition-colors ${
              added ? 'bg-wine text-ivory' : selectedSize ? 'bg-carbon text-ivory' : 'bg-sand/50 text-carbon/40'
            }`}
          >
            {added ? 'AGREGADO ✓' : 'AGREGAR'}
          </button>
        </div>
      </div>
    </>
  );
}
