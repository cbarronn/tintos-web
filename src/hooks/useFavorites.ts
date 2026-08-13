'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'tintos-favorites';

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
