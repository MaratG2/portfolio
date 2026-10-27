"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

const MotionContext = createContext({ enabled: false, paused: false, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const readReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const serverReducedMotion = () => true;

// The header toggle's explicit choice, remembered per browser; falls back to memory when storage is blocked.
const choiceListeners = new Set<() => void>();
let memoryChoice: string | null = null;
function subscribeChoice(onChange: () => void) {
  choiceListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => { choiceListeners.delete(onChange); window.removeEventListener("storage", onChange); };
}
function readChoice() { try { return localStorage.getItem("motion") ?? memoryChoice; } catch { return memoryChoice; } }
const serverChoice = () => null;
function writeChoice(value: "on" | "off") {
  memoryChoice = value;
  try { localStorage.setItem("motion", value); } catch {}
  choiceListeners.forEach(listener => listener());
}

// Server and no-JS render with motion "off", so every element is visible and static until hydration.
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  // An explicit choice from the header toggle wins over the OS preference.
  const choice = useSyncExternalStore(subscribeChoice, readChoice, serverChoice);
  const enabled = choice ? choice === "on" : !reduced;
  const paused = !enabled;
  const toggle = () => writeChoice(enabled ? "off" : "on");
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-in"); observer.unobserve(entry.target); }
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll("[data-reveal]:not(.is-in), [data-inview]:not(.is-in)").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return <MotionContext.Provider value={{ enabled, paused, toggle }}>
    <div className="site" data-motion={enabled ? "on" : "off"}>{children}</div>
  </MotionContext.Provider>;
}

export function MotionToggle({ off, on }: { off: string; on: string }) {
  const { paused, toggle } = useMotion();
  return <button type="button" className="motion-toggle" aria-pressed={paused} aria-label={paused ? on : off} title={paused ? on : off} onClick={toggle}>
    <span className="motion-dot" aria-hidden="true" />
  </button>;
}

export function CopyEmail({ address, copy, copied }: { address: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => { if (!done) return; const id = setTimeout(() => setDone(false), 1800); return () => clearTimeout(id); }, [done]);
  return <button type="button" className="copy-button" onClick={() => navigator.clipboard?.writeText(address).then(() => setDone(true), () => {})}>
    <span aria-live="polite">{done ? copied : copy}</span>
  </button>;
}

export function Compare({ before, after, label, beforeLabel, afterLabel }: { before: ReactNode; after: ReactNode; label: string; beforeLabel: string; afterLabel: string }) {
  const [position, setPosition] = useState(50);
  return <div className="compare" style={{ "--pos": `${position}%` } as React.CSSProperties}>
    <div className="compare-layer">{before}</div>
    <div className="compare-layer compare-after" aria-hidden="true">{after}</div>
    <span className="compare-handle" aria-hidden="true" />
    <span className="compare-tag compare-tag-before" aria-hidden="true">{beforeLabel}</span>
    <span className="compare-tag compare-tag-after" aria-hidden="true">{afterLabel}</span>
    <input type="range" min={0} max={100} value={position} aria-label={label} onChange={e => setPosition(Number(e.target.value))} />
  </div>;
}
