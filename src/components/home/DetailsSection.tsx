'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const details = [
  { label: 'PIEL', image: '/images/products/chelsea-cognac-main.jpg', alt: 'Piel premium — Chelsea Cognac TINTOS' },
  { label: 'COSTURAS', image: '/images/products/chelsea-cognac-detail.jpg', alt: 'Detalle de costuras — TINTOS' },
  { label: 'ACABADOS', image: '/images/products/chelsea-negro-detail.jpg', alt: 'Acabados — Chelsea Negro TINTOS' },
];

export function DetailsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );

    const items = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
      <div className="text-center mb-14 md:mb-20">
        <p className="animate-on-scroll font-sans text-[11px] tracking-[0.3em] text-carbon/40 mb-3 uppercase">
          Artesanía
        </p>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-carbon font-light">
          LOS DETALLES <span className="italic">HABLAN.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {details.map((detail, i) => (
          <div
            key={detail.label}
            className="animate-on-scroll group relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <Image
              src={detail.image}
              alt={detail.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-sans text-[11px] tracking-[0.25em] text-white/80 font-medium">
                {detail.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
