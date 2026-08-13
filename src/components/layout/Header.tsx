'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { mainNavigation } from '@/data/navigation';
import { useCart } from '@/hooks/useCart';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from '@/components/ui/SearchOverlay';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Only use white/transparent text on the home page (which has a dark hero)
  const isTransparent = isHome && !scrolled;
  const textColor = isTransparent ? 'text-white' : 'text-carbon';
  const hamburgerBg = isTransparent && !menuOpen ? 'bg-white' : 'bg-carbon';

  return (
    <>
      <AnnouncementBar />
      <div className="sticky top-0 z-50 w-full h-0">
        <header
          className={`absolute left-0 right-0 transition-all duration-500 ${
            isTransparent
              ? 'bg-transparent'
              : 'bg-warm/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          }`}
        >
        {/* 3-column CSS Grid: nav | logo | icons */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20 md:h-24 lg:h-28 px-6 md:px-10 lg:px-16 xl:px-20">

          {/* ===== LEFT: Hamburger (mobile) + Nav (desktop) ===== */}
          <div className="flex items-center">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-[6px] w-6 relative z-[60]"
              aria-label="Menú"
            >
              <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${hamburgerBg} ${menuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
              <span className={`block w-full h-[1.5px] transition-all duration-300 ${hamburgerBg} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${hamburgerBg} ${menuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm xl:text-[15px] tracking-[0.08em] font-sans font-medium link-underline transition-colors duration-300 whitespace-nowrap ${textColor}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ===== CENTER: Logo — with guaranteed horizontal padding ===== */}
          <Link href="/" className="flex items-center gap-3.5 justify-self-center px-8 lg:px-12">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/brand/isotipo.jpg"
              alt="TINTOS"
              width={44}
              height={44}
              className="rounded-sm"
              priority
            />
            <span className={`font-serif text-3xl md:text-4xl tracking-[0.12em] font-light transition-colors duration-300 ${textColor}`}>
              TINTOS
            </span>
          </Link>

          {/* ===== RIGHT: Action Icons ===== */}
          <div className="flex items-center gap-5 md:gap-6 justify-self-end">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`transition-colors duration-300 hover:opacity-70 ${textColor}`}
              aria-label="Buscar"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="#"
              className={`hidden md:flex transition-colors duration-300 hover:opacity-70 ${textColor}`}
              aria-label="Cuenta"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className={`relative transition-colors duration-300 hover:opacity-70 ${textColor}`}
              aria-label="Carrito"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-wine text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
