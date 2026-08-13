import Link from 'next/link';
import Image from 'next/image';
import { footerNavigation } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="bg-deep text-ivory">
      {/* Main Footer */}
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        {/* Logo + Tagline */}
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/brand/isotipo.jpg`}
              alt="TINTOS"
              width={48}
              height={48}
              className="rounded-sm opacity-80"
            />
            <span className="font-serif text-4xl md:text-5xl tracking-[0.15em] font-light">
              TINTOS
            </span>
          </div>
          <p className="font-serif text-xl md:text-2xl text-ivory/50 font-light tracking-wide italic">
            El carácter no pasa de moda.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-10 max-w-5xl mx-auto mb-20 md:mb-24">
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] text-ivory/35 mb-6 font-medium uppercase">
              Comprar
            </h4>
            <ul className="space-y-4">
              {footerNavigation.comprar.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="font-sans text-base text-ivory/60 hover:text-ivory transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] text-ivory/35 mb-6 font-medium uppercase">
              Ayuda
            </h4>
            <ul className="space-y-4">
              {footerNavigation.ayuda.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="font-sans text-base text-ivory/60 hover:text-ivory transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] text-ivory/35 mb-6 font-medium uppercase">
              Tintos
            </h4>
            <ul className="space-y-4">
              {footerNavigation.tintos.map((item) => (
                <li key={item.href + item.label}>
                  {item.href.startsWith('http') ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-sans text-base text-ivory/60 hover:text-ivory transition-colors duration-200">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="font-sans text-base text-ivory/60 hover:text-ivory transition-colors duration-200">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] text-ivory/35 mb-6 font-medium uppercase">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerNavigation.legal.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="font-sans text-base text-ivory/60 hover:text-ivory transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10 px-6 md:px-12 lg:px-20 pt-8 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-ivory/30 tracking-wide">
            TINTOS © {new Date().getFullYear()}
          </p>
          <p className="font-sans text-sm text-ivory/30 tracking-[0.15em]">
            LEÓN · GUANAJUATO · MÉXICO
          </p>
        </div>
      </div>
    </footer>
  );
}
