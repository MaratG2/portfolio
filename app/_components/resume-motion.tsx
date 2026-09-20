"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from "react";
import { LazyMotion, domAnimation, m, useSpring, useMotionTemplate } from "motion/react";

const MotionContext = createContext({ disabled: false, paused: false, toggle: () => {} });

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const readReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const serverReducedMotion = () => true;

export function ResumeMotion({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  const [paused, setPaused] = useState(false);
  return <MotionContext.Provider value={{ disabled: !!reduced || paused, paused, toggle: () => setPaused(p => !p) }}>
    <LazyMotion features={domAnimation}><div className="resume-app" data-motion={reduced || paused ? "off" : "on"}>{children}</div></LazyMotion>
  </MotionContext.Provider>;
}

export function MotionToggle({ label, play }: { label: string; play: string }) {
  const { paused, toggle } = useContext(MotionContext);
  return <button type="button" className="motion-toggle icon-button" aria-label={paused ? play : label} aria-pressed={paused} onClick={toggle}>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7V5Z" stroke="currentColor" strokeWidth="1.5" /> : <><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="1.7" /></>}</svg>
  </button>;
}

export function PortraitDepth({ children }: { children: ReactNode }) {
  const { disabled } = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`;
  const reset = () => { x.set(0); y.set(0); };
  function move(e: PointerEvent<HTMLDivElement>) {
    if (disabled || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    x.set(-((e.clientY - box.top) / box.height - 0.5) * 12);
    y.set(((e.clientX - box.left) / box.width - 0.5) * 12);
  }
  return <m.div className="portrait-depth" style={{ transform: disabled ? "none" : transform }} onPointerMove={move} onPointerLeave={reset}>{children}</m.div>;
}

export function MagneticLink({ children, href, className = "", download }: { children: ReactNode; href: string; className?: string; download?: boolean }) {
  const { disabled } = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const y = useSpring(0, { stiffness: 180, damping: 18 });
  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;
  function move(e: PointerEvent<HTMLAnchorElement>) {
    if (disabled || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.075);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  }
  return <m.a href={href} download={download} className={className} style={{ transform: disabled ? "none" : transform }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</m.a>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { disabled } = useContext(MotionContext);
  useEffect(() => {
    if (disabled || !ref.current) return;
    let animation: Animation | undefined;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = el.animate([
        { transform: "translateY(24px)", opacity: 0.3, filter: "blur(3px)" },
        { transform: "translateY(0)", opacity: 1, filter: "blur(0)" },
      ], { duration: 650, delay, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, [disabled, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0].id);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(window.innerHeight * 0.4, 300);
      let current = sections[0]?.id;
      for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section.id;
      if (current) setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", schedule); if (frame) cancelAnimationFrame(frame); };
  }, [items]);
  useEffect(() => {
    const container = rail.current;
    if (!container) return;
    const measure = () => {
      const link = container.querySelector<HTMLElement>('[aria-current="location"]');
      if (!link) return;
      container.style.setProperty("--nav-x", `${link.offsetLeft}px`);
      container.style.setProperty("--nav-width", `${link.offsetWidth}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [active]);
  return <nav className="resume-nav" aria-label={items[0].label === "О себе" ? "Разделы резюме" : "Résumé sections"}>
    <div ref={rail} className="nav-track"><span className="nav-selection" aria-hidden="true" />{items.map(item => <a href={`#${item.id}`} key={item.id} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>{item.label}</a>)}</div>
  </nav>;
}

export function ExperiencePanel({ children, heading, meta, initialOpen = false }: { children: ReactNode; heading: ReactNode; meta: ReactNode; initialOpen?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const target = useRef(initialOpen);
  const { disabled } = useContext(MotionContext);
  useEffect(() => () => animation.current?.cancel(), []);
  useEffect(() => { if (disabled && animation.current && ref.current) { animation.current.cancel(); ref.current.open = target.current; ref.current.style.height = ""; } }, [disabled]);
  function toggle(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    if (disabled || e.detail === 0) { animation.current?.cancel(); el.style.height = ""; target.current = !el.open; return; }
    e.preventDefault();
    const start = el.getBoundingClientRect().height;
    target.current = !target.current;
    animation.current?.cancel();
    el.style.height = "";
    el.open = true;
    const end = target.current ? el.getBoundingClientRect().height : el.querySelector("summary")!.getBoundingClientRect().height;
    animation.current = el.animate({ height: [`${start}px`, `${end}px`] }, { duration: 280, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
    animation.current.onfinish = () => { el.open = target.current; el.style.height = ""; animation.current = null; };
  }
  return <details ref={ref} className="experience-panel" open={initialOpen}>
    <summary onClick={toggle}><div className="experience-heading">{heading}</div><div className="experience-date">{meta}</div><span className="expand-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span></summary>
    <div className="experience-description">{children}</div>
  </details>;
}
