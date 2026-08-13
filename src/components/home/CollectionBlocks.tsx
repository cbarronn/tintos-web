'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/data/products';

export function CollectionBlocks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
      {/* Title */}
      <div className="text-center mb-14 md:mb-20">
        <p className="animate-on-scroll font-sans text-[11px] tracking-[0.3em] text-carbon/40 mb-4 uppercase">
          Colecciones
        </p>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-carbon font-light">
          ENCUENTRA TU TINTOS
        </h2>
      </div>

      {/* Blocks — each takes full height, stacked on mobile, side-by-side on desktop */}
      <div className="grid md:grid-cols-2 gap-5 md:gap-8 max-w-6xl mx-auto">
        {collections.map((collection, index) => (
          <Link
            key={collection.slug}
            href={`/colecciones/${collection.slug}`}
            className="animate-on-scroll group relative overflow-hidden bg-neutral-100"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Fixed aspect ratio for consistent heights */}
            <div className="relative aspect-[3/4] md:aspect-[2/3]">
              <Image
                src={collection.image}
                alt={`Colección ${collection.name} TINTOS`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="font-sans text-[11px] tracking-[0.25em] text-white/50 mb-3 uppercase">
                  Colección
                </p>
                <h3 className="font-serif text-4xl md:text-5xl text-white font-light mb-4 tracking-wide">
                  {collection.name.toUpperCase()}
                </h3>
                <p className="font-sans text-sm md:text-base text-white/60 mb-6 font-light max-w-xs">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.12em] text-white border-b border-white/40 pb-1.5 group-hover:border-white transition-colors duration-300 btn-arrow">
                  VER {collection.name.toUpperCase()} <span className="arrow">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
