'use client';

import { useState, useEffect } from 'react';

export function IntroScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    const seen = sessionStorage.getItem('tintos-intro-seen');
    if (seen) {
      setPhase('hidden');
      return;
    }

    const fadeTimer = setTimeout(() => setPhase('fading'), 700);
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
      sessionStorage.setItem('tintos-intro-seen', 'true');
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-deep flex flex-col items-center justify-center transition-all duration-600 ease-out ${
        phase === 'fading' ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
      style={{ pointerEvents: phase === 'fading' ? 'none' : 'auto' }}
    >
      <div className="text-center">
        <h1
          className="font-serif text-4xl md:text-6xl text-ivory tracking-[0.3em] font-light mb-5"
          style={{ animation: 'fadeIn 0.4s ease forwards' }}
        >
          TINTOS
        </h1>
        <div
          className="w-10 h-px bg-ivory/20 mx-auto mb-5"
          style={{ animation: 'fadeIn 0.4s ease 0.15s forwards', opacity: 0 }}
        />
        <p
          className="font-sans text-[10px] md:text-xs text-ivory/40 tracking-[0.35em]"
          style={{ animation: 'fadeIn 0.4s ease 0.25s forwards', opacity: 0 }}
        >
          LEÓN · GUANAJUATO · MÉXICO
        </p>
      </div>
    </div>
  );
}
