'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/data/siteConfig';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('tintos-announcement-dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('tintos-announcement-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="relative bg-carbon text-ivory text-center py-3 px-12 z-[55]">
      <p className="text-xs tracking-[0.18em] font-sans font-light uppercase leading-none">
        {siteConfig.announcement}
      </p>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory transition-colors p-1"
        aria-label="Cerrar"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
