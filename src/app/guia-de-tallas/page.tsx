import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guía de Tallas — Encuentra tu talla perfecta',
  description: 'Guía completa de tallas TINTOS. Mide tu pie correctamente y encuentra el botín perfecto.',
};

const sizeChart = [
  { mx: '25', cm: '25.0', us: '7' },
  { mx: '25.5', cm: '25.5', us: '7.5' },
  { mx: '26', cm: '26.0', us: '8' },
  { mx: '26.5', cm: '26.5', us: '8.5' },
  { mx: '27', cm: '27.0', us: '9' },
  { mx: '27.5', cm: '27.5', us: '9.5' },
  { mx: '28', cm: '28.0', us: '10' },
  { mx: '28.5', cm: '28.5', us: '10.5' },
  { mx: '29', cm: '29.0', us: '11' },
  { mx: '29.5', cm: '29.5', us: '11.5' },
  { mx: '30', cm: '30.0', us: '12' },
];

export default function GuiaDeTallasPage() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="px-[var(--spacing-container)] py-[var(--spacing-section)]">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-xs text-carbon/50 mb-10">
            <Link href="/" className="hover:text-carbon transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-carbon">Guía de tallas</span>
          </nav>

          <h1 className="font-serif text-[var(--font-size-heading)] text-carbon font-light mb-4">
            GUÍA DE TALLAS
          </h1>
          <p className="font-sans text-sm text-carbon/60 leading-relaxed font-light mb-10">
            Encontrar tu talla correcta es esencial para la comodidad. Sigue las instrucciones a continuación.
          </p>

          {/* Instructions */}
          <div className="bg-ivory p-6 md:p-8 mb-10">
            <h2 className="font-sans text-xs tracking-[0.2em] text-carbon/40 mb-5 font-medium">
              CÓMO MEDIR TU PIE
            </h2>
            <ol className="space-y-4 font-sans text-sm text-carbon/70 leading-relaxed font-light">
              <li className="flex gap-3">
                <span className="font-medium text-carbon shrink-0">1.</span>
                <span>Coloca una hoja de papel en el piso, pegada a la pared.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-carbon shrink-0">2.</span>
                <span>Párate sobre la hoja con el talón tocando la pared.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-carbon shrink-0">3.</span>
                <span>Marca la punta del dedo más largo con un lápiz.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-carbon shrink-0">4.</span>
                <span>Mide la distancia desde la pared hasta la marca en centímetros.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-carbon shrink-0">5.</span>
                <span>Compara tu medida con nuestra tabla. Si estás entre dos tallas, recomendamos la talla mayor.</span>
              </li>
            </ol>
          </div>

          {/* Size Table */}
          <div className="mb-10">
            <h2 className="font-sans text-xs tracking-[0.2em] text-carbon/40 mb-5 font-medium">
              TABLA DE TALLAS
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-carbon">
                    <th className="font-sans text-xs tracking-wide text-carbon py-3 text-left font-medium">MX</th>
                    <th className="font-sans text-xs tracking-wide text-carbon py-3 text-left font-medium">CM</th>
                    <th className="font-sans text-xs tracking-wide text-carbon py-3 text-left font-medium">US</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((size) => (
                    <tr key={size.mx} className="border-b border-sand/30">
                      <td className="font-sans text-sm text-carbon py-3">{size.mx}</td>
                      <td className="font-sans text-sm text-carbon/70 py-3">{size.cm}</td>
                      <td className="font-sans text-sm text-carbon/70 py-3">{size.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Help */}
          <div className="bg-ivory p-6 md:p-8 text-center">
            <p className="font-sans text-sm text-carbon/60 mb-4 font-light">
              ¿No estás seguro de tu talla? Escríbenos y te ayudamos.
            </p>
            <a
              href="https://wa.me/524771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-carbon text-ivory font-sans text-[11px] tracking-editorial px-6 py-3 hover:bg-wine transition-colors"
            >
              CONTACTAR POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
