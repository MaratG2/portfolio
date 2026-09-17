"use client";

import { useEffect, useRef, useState } from "react";

type Props = { pauseLabel: string; playLabel: string; label: string; hint: string };

export default function Sculpture({ pauseLabel, playLabel, label, hint }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let teardown = () => {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Keep the decorative WebGL runtime outside the initial page bundle.
    import("three").then(THREE => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.25, 10);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x5b7563, 3));
      const key = new THREE.DirectionalLight(0xffffff, 5);
      key.position.set(-3, 5, 4); scene.add(key);
      const rim = new THREE.DirectionalLight(0xc5f7d8, 4);
      rim.position.set(4, 1, -2); scene.add(rim);
      const fill = new THREE.DirectionalLight(0xffffff, 2);
      fill.position.set(1, -3, 3); scene.add(fill);
      const group = new THREE.Group();
      scene.add(group);
      const geometry = new THREE.TorusGeometry(1.37, 0.24, 32, 120);
      const materials = [
        new THREE.MeshPhysicalMaterial({ color: 0x184c39, metalness: 0.48, roughness: 0.22, clearcoat: 0.7 }),
        new THREE.MeshPhysicalMaterial({ color: 0x81b790, metalness: 0.35, roughness: 0.3, clearcoat: 0.5 }),
        new THREE.MeshPhysicalMaterial({ color: 0xd5e5b8, metalness: 0.25, roughness: 0.26, clearcoat: 0.6 }),
      ];
      const rings = materials.map((material, i) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(i * Math.PI / 3, i * Math.PI / 3, i * Math.PI / 5);
        group.add(mesh); return mesh;
      });
      group.rotation.set(0.5, -0.4, -0.3);
      const satelliteGeometry = new THREE.SphereGeometry(0.115, 24, 24);
      const satellites = materials.map((material, i) => {
        const mesh = new THREE.Mesh(satelliteGeometry, material);
        const a = i * Math.PI * 2 / 3;
        mesh.position.set(Math.cos(a) * 2.05, Math.sin(a) * 1.7, Math.sin(a) * 0.5);
        group.add(mesh); return mesh;
      });
      let targetX = 0, targetY = 0, tiltX = 0, tiltY = 0, velocityX = 0, velocityY = 0;
      let frame = 0, previous = 0, elapsed = 0, visible = true;
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const move = (event: PointerEvent) => {
        if (!finePointer.matches || reduced.matches || paused.current) return;
        const rect = element.getBoundingClientRect();
        targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
        targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
      };
      const leave = () => { targetX = 0; targetY = 0; };
      const tick = (now: number) => {
        frame = 0;
        const dt = Math.min((now - (previous || now)) / 1000, 0.033);
        previous = now;
        if (!reduced.matches && !paused.current) {
          elapsed += dt;
          // Damped spring keeps pointer response out of React's render cycle.
          velocityX += ((targetX - tiltX) * 100 - velocityX * 20) * dt;
          velocityY += ((targetY - tiltY) * 100 - velocityY * 20) * dt;
          tiltX += velocityX * dt; tiltY += velocityY * dt;
          group.rotation.x = 0.5 + tiltX;
          group.rotation.y = -0.4 + tiltY + elapsed * 0.1;
          group.position.y = Math.sin(elapsed * 0.65) * 0.07;
          rings[1].rotation.z = Math.PI / 5 + Math.sin(elapsed * 0.3) * 0.16;
          satellites.forEach((mesh, i) => { mesh.position.y = Math.sin(i * Math.PI * 2 / 3 + elapsed * 0.2) * 1.7; });
        }
        renderer.render(scene, camera);
        if (visible && !document.hidden && !reduced.matches && !paused.current) frame = requestAnimationFrame(tick);
      };
      const resume = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0; previous = 0;
        if (visible && !document.hidden) frame = requestAnimationFrame(tick);
      };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
      observer.observe(element);
      const sizes = new ResizeObserver(resize); sizes.observe(element);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      element.addEventListener("motion-toggle", resume);
      document.addEventListener("visibilitychange", resume);
      reduced.addEventListener("change", resume);
      const lost = (event: Event) => { event.preventDefault(); if (frame) cancelAnimationFrame(frame); setReady(false); };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      resize(); setReady(true); resume();
      teardown = () => {
        if (frame) cancelAnimationFrame(frame);
        observer.disconnect(); sizes.disconnect();
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        element.removeEventListener("motion-toggle", resume);
        document.removeEventListener("visibilitychange", resume);
        reduced.removeEventListener("change", resume);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        geometry.dispose(); satelliteGeometry.dispose();
        materials.forEach(material => material.dispose()); renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => { /* The static composition remains if WebGL cannot load. */ });
    return () => { cancelled = true; teardown(); };
  }, []);

  function toggle() {
    paused.current = !paused.current;
    setIsPaused(paused.current);
    host.current?.dispatchEvent(new Event("motion-toggle"));
  }

  return <div className={`sculpture ${ready ? "sculpture-ready" : ""}`}>
    <div ref={host} className="sculpture-canvas" role="img" aria-label={label}>
      <div className="sculpture-fallback" aria-hidden="true"><i /><i /><i /></div>
    </div>
    <div className="sculpture-floor" aria-hidden="true" />
    {ready && <div className="sculpture-controls"><span>{hint}</span><button type="button" onClick={toggle} aria-label={isPaused ? playLabel : pauseLabel} aria-pressed={isPaused}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{isPaused ? <path d="m9 5 10 7-10 7V5Z" stroke="currentColor" strokeWidth="1.5" /> : <><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" /></>}</svg>
    </button></div>}
  </div>;
}
