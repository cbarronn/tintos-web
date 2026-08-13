'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function StorySection() {
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
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image */}
        <div className="animate-on-scroll relative aspect-[4/5] overflow-hidden bg-neutral-100">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/products/chelsea-cognac-detail.jpg"
            alt="Detalle de piel — Chelsea Cognac TINTOS"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <p className="animate-on-scroll font-sans text-[11px] tracking-[0.3em] text-carbon/40 mb-4 uppercase">
            Nuestra historia
          </p>
          <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-carbon font-light mb-8 leading-[1.1]">
            NACIDOS<br /><span className="italic">EN LEÓN.</span>
          </h2>

          <div className="space-y-5">
            <p className="animate-on-scroll font-sans text-base text-carbon/60 leading-relaxed font-light">
              En una ciudad donde hacer zapatos es un oficio transmitido entre generaciones, nace TINTOS.
            </p>
            <p className="animate-on-scroll font-sans text-base text-carbon/60 leading-relaxed font-light">
              Creamos calzado para quienes valoran aquello que no necesita llamar la atención para distinguirse.
            </p>
            <p className="animate-on-scroll font-sans text-base text-carbon/60 leading-relaxed font-light">
              Cada diseño combina tradición zapatera, materiales seleccionados y una mirada contemporánea.
            </p>
            <p className="animate-on-scroll font-sans text-base text-carbon/60 leading-relaxed font-light">
              Porque las tendencias cambian.
            </p>
          </div>

          <h3 className="animate-on-scroll font-serif text-2xl md:text-3xl text-carbon font-light mt-8 italic">
            El carácter permanece.
          </h3>

          <a
            href="/nosotros"
            className="animate-on-scroll inline-flex items-center gap-2 font-sans text-[13px] tracking-[0.12em] text-carbon border-b border-carbon/30 pb-1 mt-8 self-start hover:border-carbon transition-colors btn-arrow"
          >
            NUESTRA HISTORIA <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
