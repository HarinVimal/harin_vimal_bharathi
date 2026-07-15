"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");
  // Stable ref so the effect never re-runs due to array identity changes
  const idsRef = useRef(sectionIds);

  useEffect(() => {
    const ids = idsRef.current;

    // Keep a map of which sections are currently visible and how much
    const visibleRatios = new Map<string, number>(ids.map((id) => [id, 0]));

    const pickMostVisible = () => {
      let best = "";
      let bestRatio = -1;
      visibleRatios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      if (best) setActiveSection(best);
    };

    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(id, entry.intersectionRatio);
          });
          pickMostVisible();
        },
        {
          // No rootMargin offset — use the raw viewport so every section
          // can win as soon as it covers the most screen area
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
