import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Lookbook — Cómo usar TINTOS',
  description: 'Inspírate con nuestro lookbook editorial. Descubre cómo combinar tus botines TINTOS.',
};

const lookbookImages = [
  { src: '/images/editorial/editorial-auto-4.jpg', alt: 'TINTOS Editorial — Modelo recargado en auto clásico', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/lifestyle/lookbook-studio-1.jpg', alt: 'TINTOS Lookbook — Traje con Chelsea Negro', span: '' },
  { src: '/images/products/chelsea-cognac-lifestyle.jpg', alt: 'Chelsea Cognac TINTOS — En mano', span: '' },
  { src: '/images/editorial/editorial-bw-2.jpg', alt: 'TINTOS Editorial — Modelo de pie', span: '' },
  { src: '/images/lifestyle/lookbook-studio-2.jpg', alt: 'TINTOS Lookbook — Casual con Chelsea', span: '' },
  { src: '/images/editorial/editorial-auto-1.jpg', alt: 'TINTOS Editorial — Auto clásico', span: 'md:col-span-2' },
  { src: '/images/lifestyle/lookbook-detail-1.jpg', alt: 'TINTOS — Detalle traje con Chelsea', span: '' },
  { src: '/images/products/chelsea-negro-main.jpg', alt: 'Chelsea Negro TINTOS — Par completo', span: '' },
  { src: '/images/editorial/hero-chelsea-cognac.jpg', alt: 'Chelsea Cognac TINTOS — Caminando', span: 'md:col-span-2' },
  { src: '/images/lifestyle/lookbook-detail-2.jpg', alt: 'TINTOS — Volante auto clásico', span: '' },
  { src: '/images/editorial/editorial-bw-1.jpg', alt: 'TINTOS Editorial — Blanco y negro', span: '' },
  { src: '/images/lifestyle/lifestyle-backgammon.jpg', alt: 'TINTOS Lifestyle — Backgammon', span: '' },
  { src: '/images/products/chelsea-cognac-detail.jpg', alt: 'Chelsea Cognac TINTOS — Macro detalle', span: '' },
];

export default function LookbookPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <div className="px-[var(--spacing-container)] pt-10 pb-12 md:pb-16 text-center">
        <p className="font-sans text-[10px] tracking-[0.3em] text-carbon/40 mb-3">EDITORIAL</p>
        <h1 className="font-serif text-[var(--font-size-display)] text-carbon font-light">
          LOOKBOOK
        </h1>
        <p className="font-sans text-sm text-carbon/50 mt-3 font-light max-w-md mx-auto">
          Un par. Muchas historias. Inspírate.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="px-[var(--spacing-container)] pb-[var(--spacing-section)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-6xl mx-auto">
          {lookbookImages.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden bg-ivory group ${img.span} ${
                img.span.includes('row-span-2') ? 'aspect-auto min-h-[300px] md:min-h-0' : 'aspect-[3/4]'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={img.span.includes('col-span-2') ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="bg-deep py-16 md:py-24 px-[var(--spacing-container)] text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-ivory font-light">
          EL CARÁCTER<br /><span className="italic">NO PASA DE MODA.</span>
        </h2>
        <p className="font-sans text-[10px] tracking-[0.3em] text-ivory/30 mt-8">
          TINTOS · LEÓN · GUANAJUATO · MÉXICO
        </p>
      </div>
    </div>
  );
}
