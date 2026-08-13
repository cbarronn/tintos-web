'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef}>
      {/* First Block */}
      <div className="relative h-[70vh] md:h-screen min-h-[500px] max-h-[900px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-4.jpg`}
          alt="TINTOS Editorial — Modelo con botines Chelsea"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="animate-on-scroll font-serif text-[clamp(2rem,5vw,4.5rem)] text-white font-light leading-[1.1]">
            NO SE TRATA<br />
            <span className="italic">DE SEGUIR LA MODA.</span>
          </h2>
        </div>
      </div>

      {/* Second Block */}
      <div className="relative h-[70vh] md:h-screen min-h-[500px] max-h-[900px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-3.jpg`}
          alt="TINTOS Editorial — Chelsea Negro lifestyle"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="animate-on-scroll font-serif text-[clamp(2rem,5vw,4.5rem)] text-white font-light leading-[1.1]">
            SE TRATA<br />
            <span className="italic">DE TENER ESTILO.</span>
          </h2>
        </div>
      </div>

      {/* Final Statement */}
      <div className="bg-deep py-24 md:py-32 flex items-center justify-center">
        <h2 className="animate-on-scroll font-serif text-5xl md:text-7xl text-ivory font-light tracking-[0.15em]">
          TINTOS.
        </h2>
      </div>
    </section>
  );
}
