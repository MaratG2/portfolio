"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

const MotionContext = createContext({ enabled: false });
export const useMotion = () => useContext(MotionContext);

const noop = () => () => {};

// Motion is on for everyone once the page hydrates. The server and no-JS render stay static, so every
// element is visible without scripts. Looping decorations stop under prefers-reduced-motion (globals.css).
export function MotionProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(noop, () => true, () => false);
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-in"); observer.unobserve(entry.target); }
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll("[data-reveal]:not(.is-in), [data-inview]:not(.is-in)").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return <MotionContext.Provider value={{ enabled }}>
    <div className="site" data-motion={enabled ? "on" : "off"}>{children}</div>
  </MotionContext.Provider>;
}

export function CopyEmail({ address, copy, copied }: { address: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => { if (!done) return; const id = setTimeout(() => setDone(false), 1800); return () => clearTimeout(id); }, [done]);
  return <button type="button" className="copy-button" onClick={() => navigator.clipboard?.writeText(address).then(() => setDone(true), () => {})}>
    <span aria-live="polite">{done ? copied : copy}</span>
  </button>;
}
