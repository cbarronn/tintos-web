import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nuestra Historia — Hecho en León, Guanajuato',
  description: 'TINTOS nace en León, Guanajuato. Conoce la historia detrás de nuestros botines artesanales de piel premium.',
};

export default function NosotrosPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/lifestyle/lifestyle-group.jpg`}
          alt="Equipo TINTOS — León, Guanajuato"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-deep/50" />
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-[var(--spacing-container)]">
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] text-ivory/50 mb-3">NUESTRA HISTORIA</p>
            <h1 className="font-serif text-[var(--font-size-display)] text-ivory font-light">
              DE LEÓN<br /><span className="italic">PARA EL MUNDO.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="px-[var(--spacing-container)] py-[var(--spacing-section)]">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-serif text-2xl md:text-3xl text-carbon font-light leading-relaxed">
            En una ciudad donde la tradición zapatera se transmite de generación en generación, nace algo diferente.
          </p>

          <div className="space-y-5 text-carbon/70 font-sans text-sm leading-relaxed font-light">
            <p>
              León, Guanajuato es conocida como la capital del calzado en México. En cada taller, en cada curtiembre, en cada esquina, la piel es el lenguaje que todos hablan. Nosotros crecimos ahí, entre el olor a cuero y el sonido de las máquinas.
            </p>
            <p>
              TINTOS nació de una convicción: que México puede crear calzado a la altura de cualquier marca internacional, sin perder lo que nos hace únicos — la mano, el detalle, el carácter.
            </p>
            <p>
              No buscamos seguir tendencias. Buscamos crear piezas que puedas usar hoy, mañana y dentro de diez años. Porque la moda cambia cada temporada, pero el estilo permanece.
            </p>
            <p>
              Cada par de TINTOS es cortado, cosido y acabado a mano en León. Usamos pieles seleccionadas, procesos que toman tiempo y una mirada que combina lo clásico con lo contemporáneo.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Image */}
      <section className="relative h-[70vh] min-h-[400px] max-h-[800px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/editorial/editorial-auto-4.jpg`}
          alt="TINTOS — Editorial"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="font-serif text-[var(--font-size-display)] text-ivory font-light">
            HECHO EN MÉXICO.<br />
            <span className="italic">HECHO CON CARÁCTER.</span>
          </h2>
        </div>
      </section>

      {/* Values */}
      <section className="px-[var(--spacing-container)] py-[var(--spacing-section)]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
          {[
            { title: 'ARTESANÍA', text: 'Cada par es hecho a mano en talleres de León, Guanajuato. El proceso toma tiempo porque los detalles importan.' },
            { title: 'ATEMPORALIDAD', text: 'Diseñamos para que perdure. Sin depender de temporadas ni tendencias pasajeras. Un TINTOS es para siempre.' },
            { title: 'PIEL', text: 'Seleccionamos las mejores pieles disponibles. El material habla solo — textura, color, carácter.' },
          ].map((value) => (
            <div key={value.title} className="text-center md:text-left">
              <h3 className="font-sans text-[11px] tracking-[0.25em] text-carbon/40 mb-4">{value.title}</h3>
              <p className="font-sans text-sm text-carbon/70 leading-relaxed font-light">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-deep py-20 md:py-28 px-[var(--spacing-container)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-ivory font-light leading-relaxed">
            &ldquo;No hacemos calzado para una temporada.<br />
            Hacemos piezas que te acompañen<br />
            durante años.&rdquo;
          </h2>
          <p className="font-sans text-[10px] tracking-[0.3em] text-ivory/30 mt-10">
            TINTOS · LEÓN · GUANAJUATO · MÉXICO
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[var(--spacing-container)] py-[var(--spacing-section)] text-center">
        <h2 className="font-serif text-[var(--font-size-heading)] text-carbon font-light mb-6">
          CONOCE <span className="italic">LA COLECCIÓN.</span>
        </h2>
        <Link
          href="/colecciones"
          className="inline-flex items-center gap-2 bg-carbon text-ivory font-sans text-[11px] tracking-editorial px-7 py-3.5 hover:bg-wine transition-colors btn-arrow"
        >
          VER COLECCIÓN <span className="arrow">→</span>
        </Link>
      </section>
    </div>
  );
}
