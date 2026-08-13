'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll('.cinematic-word');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.5 }
    );

    words.forEach((word) => observer.observe(word));

    return () => observer.disconnect();
  }, []);

  const words = ['CLÁSICOS.', 'CONTEMPORÁNEOS.', 'ATEMPORALES.', 'TINTOS.'];

  return (
    <section ref={sectionRef} className="relative bg-deep">
      {/* Background Image - Fixed within section */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-1.jpg`}
          alt="TINTOS Chelsea Negro — Editorial con auto clásico"
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep/40" />
      </div>

      {/* Scrollable Words */}
      <div className="relative z-10">
        {words.map((word, i) => (
          <div key={word} className="h-[70vh] md:h-screen flex items-center justify-center px-6">
            <h2
              className="cinematic-word font-serif text-[clamp(2.5rem,10vw,7rem)] text-ivory font-light text-center"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {i === words.length - 1 ? (
                <span className="tracking-[0.2em] not-italic">{word}</span>
              ) : (
                <span className="italic">{word}</span>
              )}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
