'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, shipping, total, itemCount } = useCart();

  const freeShippingThreshold = siteConfig.shipping.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-deep/50 z-[55] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-warm z-[56] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sand/30">
            <h2 className="font-serif text-xl font-light tracking-wide">MI CARRITO</h2>
            <button onClick={closeCart} className="text-carbon/60 hover:text-carbon transition-colors" aria-label="Cerrar carrito">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Bar */}
          {itemCount > 0 && (
            <div className="px-6 py-3 bg-ivory/50">
              {remainingForFreeShipping > 0 ? (
                <p className="font-sans text-xs text-carbon/60 text-center mb-2">
                  Te faltan <span className="font-medium text-wine">{formatPrice(remainingForFreeShipping)}</span> para envío gratis
                </p>
              ) : (
                <p className="font-sans text-xs text-carbon/60 text-center mb-2">
                  ¡Envío gratis! 🎉
                </p>
              )}
              <div className="w-full h-1 bg-sand/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-wine rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="font-serif text-lg text-carbon/40 mb-2">Tu carrito está vacío</p>
                <p className="font-sans text-sm text-carbon/40 mb-6">Tu próximo par todavía te está esperando.</p>
                <Link
                  href="/colecciones"
                  onClick={closeCart}
                  className="font-sans text-xs tracking-editorial bg-carbon text-ivory px-6 py-3 hover:bg-wine transition-colors"
                >
                  DESCUBRIR TINTOS
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-ivory rounded overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0].src}
                        alt={item.product.images[0].alt}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-sans text-sm font-medium truncate">{item.product.name}</p>
                          <p className="font-sans text-xs text-carbon/50 mt-0.5">Talla: {item.selectedSize}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="text-carbon/30 hover:text-carbon transition-colors shrink-0 ml-2"
                          aria-label="Eliminar"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-sand/40 rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-carbon/60 hover:text-carbon transition-colors text-sm"
                            aria-label="Reducir cantidad"
                          >
                            −
                          </button>
                          <span className="w-7 h-7 flex items-center justify-center font-sans text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-carbon/60 hover:text-carbon transition-colors text-sm"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-sans text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-sand/30 px-6 py-5 space-y-3">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-carbon/60">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span className="text-carbon/60">Envío</span>
                <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-sans text-base font-medium pt-2 border-t border-sand/20">
                <span>Total estimado</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="w-full bg-carbon text-ivory font-sans text-xs tracking-editorial py-4 mt-3 hover:bg-wine transition-colors duration-300">
                FINALIZAR COMPRA
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
