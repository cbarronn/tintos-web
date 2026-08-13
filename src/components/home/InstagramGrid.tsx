'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const instagramImages = [
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/hero-chelsea-cognac.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-1.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/products/chelsea-negro-main.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lookbook-studio-1.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/products/chelsea-cognac-main.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-bw-1.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lookbook-detail-1.jpg`,
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-2.jpg`,
];

export function InstagramGrid() {
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
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="text-center mb-14 md:mb-20 px-6 md:px-12 lg:px-20">
        <p className="animate-on-scroll font-sans text-[10px] tracking-[0.3em] text-carbon/40 mb-3 uppercase">
          Instagram
        </p>
        <h2 className="animate-on-scroll font-serif text-2xl md:text-3xl text-carbon font-light">
          @TINTOS_MEX
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-0.5 md:gap-1">
        {instagramImages.map((src, i) => (
          <a
            key={`ig-${i}`}
            href="https://instagram.com/tintos_mex"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-on-scroll relative aspect-square overflow-hidden bg-neutral-100 group"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <Image
              src={src}
              alt={`TINTOS Instagram ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, 12.5vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8 px-5 md:px-10">
        <a
          href="https://instagram.com/tintos_mex"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-on-scroll inline-flex items-center gap-2 font-sans text-[13px] tracking-[0.12em] text-carbon border-b border-carbon/30 pb-1 hover:border-carbon transition-colors btn-arrow"
        >
          SEGUIR EN INSTAGRAM <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
