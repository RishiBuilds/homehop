import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "homehop_mumbai_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setFavorites([]);
        }
      }
    }

    function handleCustomEvent(e: Event) {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setFavorites(customEvent.detail);
      }
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener("homehop_favorites_update", handleCustomEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("homehop_favorites_update", handleCustomEvent);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("homehop_favorites_update", { detail: next }));
      } catch {
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };
}
