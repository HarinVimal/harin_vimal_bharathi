"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
}

export function useCountUp({ end, start = 0, duration = 2000, delay = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const startTime = performance.now();
      const range = end - start;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(start + range * eased));

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, start, duration, delay]);

  return { count, ref };
}
