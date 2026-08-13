'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const lookbookImages = [
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lookbook-studio-1.jpg`, alt: 'TINTOS Lookbook — Traje azul con Chelsea Negro' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lookbook-studio-2.jpg`, alt: 'TINTOS Lookbook — Casual con Chelsea Negro' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lookbook-detail-1.jpg`, alt: 'TINTOS Lookbook — Detalle traje rayado' },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-bw-2.jpg`, alt: 'TINTOS Lookbook — Editorial blanco y negro' },
];

export function LookbookPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
      <div className="text-center mb-14 md:mb-20">
        <p className="animate-on-scroll font-sans text-[11px] tracking-[0.3em] text-carbon/40 mb-3 uppercase">
          Lookbook
        </p>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-carbon font-light">
          HOW TO WEAR <span className="italic">TINTOS</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto mb-12">
        {lookbookImages.map((img, i) => (
          <div
            key={img.src}
            className="animate-on-scroll relative aspect-[3/4] overflow-hidden bg-neutral-100 group"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <h3 className="animate-on-scroll font-serif text-2xl md:text-3xl text-carbon font-light mb-4">
          UN PAR. <span className="italic">MUCHAS HISTORIAS.</span>
        </h3>
        <Link
          href="/lookbook"
          className="animate-on-scroll inline-flex items-center gap-2 font-sans text-[13px] tracking-[0.12em] text-carbon border-b border-carbon/30 pb-1 hover:border-carbon transition-colors btn-arrow"
        >
          VER LOOKBOOK <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
