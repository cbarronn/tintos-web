'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const items = el.querySelectorAll('.hero-animate');
    items.forEach((item, i) => {
      const htmlEl = item as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(25px)';
      htmlEl.style.clipPath = 'inset(0 0 100% 0)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
        htmlEl.style.clipPath = 'inset(0 0 0 0)';
      }, 800 + i * 150);
    });
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-svh min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/hero-chelsea-cognac.jpg`}
        alt="TINTOS Chelsea Cognac — Botines artesanales de León, Guanajuato"
        fill
        priority
        loading="eager"
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Brand */}
          <p className="hero-animate font-sans text-xs md:text-[13px] tracking-[0.3em] text-white/50 mb-5 md:mb-8">
            TINTOS
          </p>

          {/* Main Title */}
          <h1 className="hero-animate font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.92] text-white font-light mb-8 md:mb-10">
            EL CARÁCTER<br />
            <span className="italic">NO PASA DE MODA.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate font-sans text-base md:text-lg text-white/60 max-w-lg leading-relaxed mb-10 md:mb-12 font-light">
            Botines artesanales creados en León, Guanajuato.
            <br className="hidden md:block" />
            {` '}Diseñados para permanecer.
          </p>

          {/* CTAs */}
          <div className="hero-animate flex flex-wrap gap-5">
            <Link
              href="/colecciones"
              className="inline-flex items-center gap-3 bg-white text-black font-sans text-[13px] tracking-[0.1em] font-medium px-8 py-4 hover:bg-white/90 transition-colors duration-300 btn-arrow"
            >
              DESCUBRIR COLECCIÓN <span className="arrow">→</span>
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-3 border border-white/40 text-white font-sans text-[13px] tracking-[0.1em] font-medium px-8 py-4 hover:bg-white/10 transition-colors duration-300"
            >
              CONOCER TINTOS
            </Link>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="hero-animate absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <span style={{ animation: 'scroll-hint 2s ease-in-out infinite' }}>↓</span>
        </div>
      </div>
    </section>
  );
}
