import { useState, useEffect, useCallback } from "react";

const COMPARISON_STORAGE_KEY = "homehop_mumbai_comparison";
const MAX_COMPARISON_ITEMS = 3;

export function useComparison() {
  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPARISON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === COMPARISON_STORAGE_KEY) {
        try {
          setComparisonList(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setComparisonList([]);
        }
      }
    }

    function handleCustom(e: Event) {
      const custom = e as CustomEvent<string[]>;
      if (custom.detail) {
        setComparisonList(custom.detail);
      }
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener("homehop_comparison_update", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("homehop_comparison_update", handleCustom);
    };
  }, []);

  const toggleComparison = useCallback((id: string) => {
    setComparisonList((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        if (prev.length >= MAX_COMPARISON_ITEMS) {
          next = [...prev.slice(1), id];
        } else {
          next = [...prev, id];
        }
      }
      try {
        localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("homehop_comparison_update", { detail: next }));
      } catch {
      }
      return next;
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonList([]);
    try {
      localStorage.removeItem(COMPARISON_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("homehop_comparison_update", { detail: [] }));
    } catch {
    }
  }, []);

  const isInComparison = useCallback(
    (id: string) => {
      return comparisonList.includes(id);
    },
    [comparisonList]
  );

  return {
    comparisonList,
    isInComparison,
    toggleComparison,
    clearComparison,
    comparisonCount: comparisonList.length,
    maxItems: MAX_COMPARISON_ITEMS,
  };
}
