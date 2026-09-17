"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animations.push(entry.target.animate(
          [{ transform: "translateY(22px)", opacity: 0.35 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 650, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        ));
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const stop = () => { if (media.matches) { observer.disconnect(); animations.forEach(a => a.cancel()); } };
    media.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); media.removeEventListener("change", stop); };
  }, []);
  return null;
}
