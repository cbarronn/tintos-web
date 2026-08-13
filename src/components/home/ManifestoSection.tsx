'use client';

import { useEffect, useRef } from 'react';

export function ManifestoSection() {
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
    <section ref={sectionRef} className="bg-deep py-24 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto text-center space-y-1 md:space-y-2">
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-[1.2]">
          NO HACEMOS
        </h2>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-[1.2]" style={{ transitionDelay: '80ms' }}>
          ZAPATOS
        </h2>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-[1.2]" style={{ transitionDelay: '160ms' }}>
          PARA UNA
        </h2>
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-[1.2]" style={{ transitionDelay: '240ms' }}>
          TEMPORADA.
        </h2>

        <div className="h-8 md:h-12" />

        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-light leading-[1.2]" style={{ transitionDelay: '400ms' }}>
          HACEMOS
        </h2>
        <h2 className="animate-on-scroll font-serif text-4xl md:text-6xl lg:text-7xl text-ivory font-light tracking-[0.2em] leading-[1.2]" style={{ transitionDelay: '500ms' }}>
          TINTOS.
        </h2>

        <div className="pt-12 md:pt-16">
          <p className="animate-on-scroll font-sans text-xs tracking-[0.3em] text-ivory/30" style={{ transitionDelay: '600ms' }}>
            LEÓN · GUANAJUATO · MÉXICO
          </p>
        </div>
      </div>
    </section>
  );
}
