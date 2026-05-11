"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "200px 0px";

export function useInView<T extends Element>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setInView(true);
      return;
    }
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // If the element is already on screen at mount, skip the observer entirely.
    // Lets above-the-fold scenes (hero LCP) mount immediately while still
    // lazy-mounting below-fold scenes only after scroll.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 200 && rect.bottom > -200) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: DEFAULT_ROOT_MARGIN, threshold: 0.01, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
