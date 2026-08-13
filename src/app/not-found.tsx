import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-[var(--spacing-container)]">
      <div className="text-center">
        <p className="font-sans text-[10px] tracking-[0.3em] text-carbon/30 mb-6">404</p>
        <h1 className="font-serif text-3xl md:text-5xl text-carbon font-light mb-4">
          ESTE CAMINO<br />
          <span className="italic">NO LLEVA A TINTOS.</span>
        </h1>
        <p className="font-sans text-sm text-carbon/50 mb-8 font-light">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/colecciones"
          className="inline-flex items-center gap-2 bg-carbon text-ivory font-sans text-[11px] tracking-editorial px-7 py-3.5 hover:bg-wine transition-colors btn-arrow"
        >
          VOLVER A LA COLECCIÓN <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
