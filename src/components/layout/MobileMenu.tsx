'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll('.menu-item');
      items.forEach((item, i) => {
        const el = item as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 + i * 60);
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[52] bg-deep transition-opacity duration-500 lg:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div ref={menuRef} className="flex flex-col justify-center items-center h-full gap-1 px-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory/70 hover:text-ivory transition-colors"
          aria-label="Cerrar menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <div className="menu-item mb-10">
          <span className="font-serif text-3xl tracking-[0.2em] text-ivory font-light">
            TINTOS
          </span>
        </div>

        {/* Navigation */}
        {mainNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="menu-item block text-ivory text-2xl font-serif font-light tracking-wide py-2 hover:text-sand transition-colors"
          >
            {item.label}
          </Link>
        ))}

        {/* Divider */}
        <div className="menu-item w-12 h-px bg-ivory/20 my-6" />

        {/* Social */}
        <div className="menu-item flex gap-8 text-ivory/60">
          <a
            href="https://instagram.com/tintos_mex"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-editorial hover:text-ivory transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="text-xs tracking-editorial hover:text-ivory transition-colors"
          >
            WHATSAPP
          </a>
          <Link
            href="/contacto"
            onClick={onClose}
            className="text-xs tracking-editorial hover:text-ivory transition-colors"
          >
            CONTACTO
          </Link>
        </div>

        {/* Origin */}
        <p className="menu-item absolute bottom-8 text-ivory/30 text-[10px] tracking-[0.25em] font-sans">
          LEÓN · GUANAJUATO · MÉXICO
        </p>
      </div>
    </div>
  );
}
