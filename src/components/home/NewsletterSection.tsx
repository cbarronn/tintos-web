'use client';

import { useEffect, useRef, useState } from 'react';

export function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('[Newsletter] Subscribing:', email);
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} className="bg-wine py-24 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="animate-on-scroll font-serif text-3xl md:text-5xl text-white font-light mb-4">
          FORMA PARTE <span className="italic">DE TINTOS.</span>
        </h2>
        <p className="animate-on-scroll font-sans text-sm text-white/55 mb-8 font-light">
          Nuevos lanzamientos, historias y piezas seleccionadas.
        </p>

        {submitted ? (
          <div className="animate-on-scroll py-4">
            <p className="font-sans text-sm text-white/80">
              ¡Gracias por unirte a TINTOS! ✓
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-on-scroll flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="flex-1 bg-transparent border border-white/30 border-r-0 text-white font-sans text-sm px-5 py-3.5 outline-none placeholder:text-white/30 focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-wine font-sans text-[11px] tracking-[0.15em] font-medium px-6 py-3.5 hover:bg-white/90 transition-colors shrink-0"
            >
              UNIRME
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
