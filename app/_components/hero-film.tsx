"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "./motion";

// Scroll-scrubbed film: one particle set travels through four scenes.
// Portrait (public/hero/field.png) → system graph → multimodal point cloud → evaluation curve.
// Every frame is a pure function of scroll progress (plus a slow idle drift), so scrolling back rewinds it.

const PAPER = [233, 239, 233];
const ACCENT = [124, 242, 168];
const LEVELS = 12;

// Transitions between scenes, in scroll progress. Scenes hold between them.
const SEGMENTS: [number, number][] = [[0.08, 0.3], [0.42, 0.6], [0.7, 0.86]];
// Visible windows for the three captions.
const CAPTIONS: [number, number][] = [[0.24, 0.47], [0.54, 0.74], [0.82, 1.01]];

const NODES = [[0, 0.5], [0.2, 0.22], [0.2, 0.78], [0.42, 0.5], [0.62, 0.16], [0.62, 0.5], [0.62, 0.84], [0.82, 0.32], [0.82, 0.68], [1, 0.5]];
const EDGES = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [3, 6], [4, 7], [5, 7], [5, 8], [6, 8], [7, 9], [8, 9]];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function hash(n: number) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }

type Particles = { count: number; u: Float32Array; v: Float32Array; value: Float32Array; seed: Float32Array; seed2: Float32Array; seed3: Float32Array; cell: number };

function buildParticles(field: Uint8ClampedArray, size: number, step: number): Particles {
  const pick: number[] = [];
  for (let y = 0; y < size; y += step) for (let x = 0; x < size; x += step) {
    const value = field[(Math.floor(y) * size + Math.floor(x)) * 4] / 255;
    if (value > 0.075) pick.push(x / size, y / size, value);
  }
  const count = pick.length / 3;
  const p: Particles = { count, u: new Float32Array(count), v: new Float32Array(count), value: new Float32Array(count), seed: new Float32Array(count), seed2: new Float32Array(count), seed3: new Float32Array(count), cell: step / size };
  for (let i = 0; i < count; i++) {
    p.u[i] = pick[i * 3]; p.v[i] = pick[i * 3 + 1]; p.value[i] = pick[i * 3 + 2];
    p.seed[i] = hash(i + 1); p.seed2[i] = hash(i * 3.17 + 7); p.seed3[i] = hash(i * 7.31 + 19);
  }
  return p;
}

type Out = { x: number; y: number; s: number; a: number; c: number };

export default function HeroFilm({ copy, captions, fallback }: { copy: ReactNode; captions: { label: string; text: string }[]; fallback: ReactNode }) {
  const { enabled } = useMotion();
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = section.current, el = canvas.current;
    if (!root || !el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;
    let disposed = false, frame = 0, visible = true, particles: Particles | null = null;
    let w = 0, h = 0, dpr = 1, shown = 0, copyTop = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let xs = new Float32Array(0), ys = new Float32Array(0), ss = new Float32Array(0), bucket = new Uint16Array(0), order = new Uint32Array(0);
    const counts = new Uint32Array(LEVELS * 2), offsets = new Uint32Array(LEVELS * 2);
    const styles = [PAPER, ACCENT].flatMap(([r, g, b]) => Array.from({ length: LEVELS }, (_, l) => `rgba(${r},${g},${b},${((l + 1) / LEVELS).toFixed(3)})`));

    const progress = () => {
      const rect = root.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      return range > 0 ? clamp(-rect.top / range) : 0;
    };

    function resize() {
      const rect = el!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      copyTop = copyRef.current?.offsetTop ?? h * 0.5;
      el!.width = Math.round(w * dpr); el!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Scene layouts. Each writes one particle's target into `o`.
    function portrait(i: number, P: Particles, o: Out, time: number) {
      const narrow = w < 760;
      // On narrow screens the portrait fills the space between the top bar and the headline.
      const room = Math.max(160, copyTop - 64);
      const S = narrow ? Math.min(w * 0.92, room * 1.22) : Math.min(h * 0.92, w * 0.5);
      const cx = narrow ? w * 0.5 : w * 0.7, cy = narrow ? 64 + S * 0.46 : h * 0.53;
      const drift = enabled ? Math.sin(time * 0.0007 + P.seed[i] * 6.28) * 0.6 : 0;
      const cell = P.cell * S, v = P.value[i];
      // Stipple jitter breaks the sampling grid, which otherwise shows moiré bands.
      o.x = cx + (P.u[i] - 0.5) * S + (P.seed2[i] - 0.5) * cell * 0.7 + drift;
      o.y = cy + (P.v[i] - 0.5) * S + (P.seed3[i] - 0.5) * cell * 0.7 + drift * 0.6;
      // Fade the photo's hard crop at the sides and bottom.
      const edge = smooth(0, 0.14, P.u[i]) * smooth(0, 0.14, 1 - P.u[i]) * (1 - smooth(0.8, 1, P.v[i]));
      o.s = Math.max(0.8, cell * (0.12 + 0.54 * v));
      o.a = (0.2 + 0.8 * v) * edge;
      o.c = 0;
    }

    function graph(i: number, P: Particles, o: Out, time: number) {
      const narrow = w < 760;
      const W = narrow ? w * 0.74 : Math.min(w * 0.78, 1180), H = narrow ? h * 0.56 : Math.min(h * 0.5, 460);
      const cx = w * 0.5, cy = narrow ? h * 0.4 : h * 0.44;
      const place = (n: number[]) => narrow ? [cx + (n[1] - 0.5) * W, cy + (n[0] - 0.5) * H] : [cx + (n[0] - 0.5) * W, cy + (n[1] - 0.5) * H];
      const r = P.seed[i];
      if (r < 0.32) {
        const node = Math.floor(P.seed2[i] * NODES.length);
        const [nx, ny] = place(NODES[node]);
        const ring = (node === 3 ? 26 : node === 0 || node === 9 ? 18 : 13) * (narrow ? 0.8 : 1);
        const ang = P.seed3[i] * Math.PI * 2 + time * 0.0002 * (node % 2 ? 1 : -1);
        const inner = P.seed3[i] * 7 % 1 < 0.22;
        const rad = inner ? ring * 0.45 * Math.sqrt(P.seed2[i] * 13 % 1) : ring * (0.92 + 0.08 * P.seed2[i]);
        o.x = nx + Math.cos(ang) * rad; o.y = ny + Math.sin(ang) * rad;
        o.s = inner ? 1.6 : 1.3; o.a = inner ? 0.9 : 0.75; o.c = node === 3 || inner ? 1 : 0;
      } else {
        const [a, b] = EDGES[Math.floor(P.seed2[i] * EDGES.length)];
        const [ax, ay] = place(NODES[a]), [bx, by] = place(NODES[b]);
        const packet = P.seed3[i] < 0.07;
        const speed = packet ? 0.00016 : 0.00003;
        const t = (P.seed3[i] * 11 + (enabled ? time * speed : 0)) % 1;
        const len = Math.hypot(bx - ax, by - ay) || 1;
        const jitter = (P.seed[i] * 17 % 1 - 0.5) * (packet ? 0 : 2.4);
        o.x = ax + (bx - ax) * t - (by - ay) / len * jitter;
        o.y = ay + (by - ay) * t + (bx - ax) / len * jitter;
        o.s = packet ? 2.4 : 1; o.a = packet ? 1 : 0.32; o.c = packet ? 1 : 0;
      }
    }

    function knot(i: number, P: Particles, o: Out, time: number, p: number) {
      const narrow = w < 760;
      const s = P.seed[i] * Math.PI * 2;
      const tube = 0.42 * Math.sqrt(P.seed2[i]);
      const th = P.seed3[i] * Math.PI * 2, ph = Math.acos(2 * (P.seed2[i] * 7 % 1) - 1);
      let x = (2 + Math.cos(3 * s)) * Math.cos(2 * s) + tube * Math.sin(ph) * Math.cos(th);
      let y = (2 + Math.cos(3 * s)) * Math.sin(2 * s) + tube * Math.sin(ph) * Math.sin(th);
      let z = Math.sin(3 * s) * 1.2 + tube * Math.cos(ph);
      const rot = p * 5 + (enabled ? time * 0.00012 : 0), tilt = 0.55;
      const c1 = Math.cos(rot), s1 = Math.sin(rot);
      [x, z] = [x * c1 + z * s1, -x * s1 + z * c1];
      const c2 = Math.cos(tilt), s2 = Math.sin(tilt);
      [y, z] = [y * c2 - z * s2, y * s2 + z * c2];
      const scale = Math.min(w, h) * (narrow ? 0.13 : 0.105);
      const depth = 6 / (6 - z);
      o.x = w * 0.5 + x * scale * depth;
      o.y = h * (narrow ? 0.38 : 0.45) + y * scale * depth;
      const near = clamp((z + 3.2) / 6.4);
      o.s = 0.8 + near * 1.5; o.a = 0.15 + near * 0.8;
      o.c = P.seed[i] * 31 % 1 < 0.1 ? 1 : 0;
    }

    function curve(i: number, P: Particles, o: Out, _time: number, p: number) {
      const narrow = w < 760;
      const W = narrow ? w * 0.84 : Math.min(w * 0.76, 1180), H = narrow ? h * 0.32 : h * 0.42;
      const left = (w - W) / 2, base = narrow ? h * 0.58 : h * 0.68;
      const u = P.seed[i];
      const fit = 1 - Math.exp(-4.2 * u);
      const converge = smooth(0.86, 0.99, p);
      // Roughly normal noise from seeds that are independent of the x position (seed).
      const g = (P.seed2[i] + P.seed3[i] + (P.seed2[i] * 7.13 + P.seed3[i] * 3.71) % 1 - 1.5) * 0.9;
      const spread = H * 0.55 * (1 - converge * 0.88);
      o.x = left + u * W;
      o.y = base - fit * H + g * spread;
      const onCurve = Math.abs(g) < 0.12;
      o.s = onCurve ? 1.8 : 1.1; o.a = onCurve ? 0.95 : 0.4;
      o.c = onCurve && converge > 0.2 ? 1 : 0;
    }

    const scenes = [portrait, graph, knot, curve];
    const A: Out = { x: 0, y: 0, s: 0, a: 0, c: 0 }, B: Out = { x: 0, y: 0, s: 0, a: 0, c: 0 };

    function draw(time: number) {
      const P = particles;
      if (!P) return;
      const target = enabled ? progress() : 0;
      shown += (target - shown) * (enabled ? 0.14 : 1);
      if (Math.abs(target - shown) < 0.0004) shown = target;
      const p = shown;
      let scene = 0, mix = -1, seg = -1;
      for (let k = 0; k < SEGMENTS.length; k++) {
        const [a, b] = SEGMENTS[k];
        if (p >= b) scene = k + 1;
        else if (p > a) { seg = k; mix = (p - a) / (b - a); scene = k; break; }
        else break;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.18; pointer.y += (pointer.ty - pointer.y) * 0.18;
      const repel = scene === 0 && seg < 0 && enabled;
      counts.fill(0);
      for (let i = 0; i < P.count; i++) {
        scenes[scene](i, P, A, time, p);
        let x = A.x, y = A.y, s = A.s, a = A.a, c = A.c;
        if (seg >= 0) {
          scenes[seg + 1](i, P, B, time, p);
          const delay = P.seed3[i] * 0.4;
          const e = easeInOut(clamp((mix - delay) / 0.6));
          const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1;
          const swirl = Math.sin(Math.PI * e) * (P.seed2[i] - 0.5) * Math.min(220, len * 0.6);
          x = A.x + dx * e - dy / len * swirl;
          y = A.y + dy * e + dx / len * swirl;
          s = A.s + (B.s - A.s) * e; a = A.a + (B.a - A.a) * e; c = e > 0.5 ? B.c : A.c;
        }
        if (repel) {
          const dx = x - pointer.x, dy = y - pointer.y, d = Math.hypot(dx, dy);
          if (d < 110 && d > 0.01) { const f = Math.pow(1 - d / 110, 2) * 28; x += dx / d * f; y += dy / d * f; }
        }
        xs[i] = x; ys[i] = y; ss[i] = s;
        const b = c * LEVELS + Math.min(LEVELS - 1, Math.max(0, Math.round(a * LEVELS) - 1));
        bucket[i] = b; counts[b]++;
      }
      let acc = 0;
      for (let b = 0; b < counts.length; b++) { offsets[b] = acc; acc += counts[b]; }
      for (let i = 0; i < P.count; i++) order[offsets[bucket[i]]++] = i;

      ctx!.clearRect(0, 0, w, h);
      let k = 0;
      for (let b = 0; b < counts.length; b++) {
        if (!counts[b]) continue;
        ctx!.fillStyle = styles[b];
        for (let n = 0; n < counts[b]; n++, k++) {
          const i = order[k], s = ss[i];
          ctx!.fillRect(xs[i] - s / 2, ys[i] - s / 2, s, s);
        }
      }

      // DOM overlays follow the same progress value.
      if (copyRef.current) {
        const fade = enabled ? smooth(0.02, 0.12, p) : 0;
        copyRef.current.style.opacity = String(1 - fade);
        copyRef.current.style.transform = fade ? `translate3d(0, ${-fade * 48}px, 0)` : "";
        copyRef.current.style.visibility = fade > 0.99 ? "hidden" : "";
      }
      captionRefs.current.forEach((li, n) => {
        if (!li) return;
        if (!enabled) { li.style.opacity = ""; li.style.transform = ""; return; }
        const [a, b] = CAPTIONS[n];
        const o = smooth(a, a + 0.05, p) * (1 - smooth(b - 0.05, b, p));
        li.style.opacity = String(o);
        li.style.transform = `translate3d(0, ${(1 - o) * 16}px, 0)`;
      });
      if (bar.current) { bar.current.style.transform = `scaleX(${p})`; bar.current.style.opacity = String(1 - smooth(0.96, 1, p)); }
    }

    function loop(time: number) {
      frame = 0;
      if (disposed) return;
      draw(time);
      if (enabled && visible) frame = requestAnimationFrame(loop);
    }
    const kick = () => { if (!frame && !disposed) frame = requestAnimationFrame(loop); };

    function setup() {
      resize();
      const step = w < 760 ? 1.4 : 1;
      const img = new Image();
      img.src = "/hero/field.png";
      img.decode().then(() => {
        if (disposed) return;
        const off = document.createElement("canvas");
        off.width = img.width; off.height = img.height;
        const octx = off.getContext("2d", { willReadFrequently: true })!;
        octx.drawImage(img, 0, 0);
        particles = buildParticles(octx.getImageData(0, 0, img.width, img.height).data, img.width, step);
        const n = particles.count;
        xs = new Float32Array(n); ys = new Float32Array(n); ss = new Float32Array(n); bucket = new Uint16Array(n); order = new Uint32Array(n);
        root!.dataset.ready = "true";
        kick();
      }).catch(() => {});
    }

    setup();
    const onResize = () => { resize(); kick(); };
    const onScroll = () => kick();
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left; pointer.ty = e.clientY - rect.top;
      if (pointer.x < -9000) { pointer.x = pointer.tx; pointer.y = pointer.ty; }
    };
    const onLeave = () => { pointer.tx = -9999; pointer.ty = -9999; pointer.x = -9999; pointer.y = -9999; };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) kick(); });
    io.observe(root);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return <section ref={section} className="film" data-film={enabled ? "on" : "off"} aria-labelledby="hero-title">
    <div className="film-stage">
      <div className="film-fallback">{fallback}</div>
      <canvas ref={canvas} className="film-canvas" aria-hidden="true" />
      <div ref={copyRef} className="film-copy">{copy}</div>
      <ol className="film-captions">
        {captions.map((c, n) => <li key={c.label} ref={li => { captionRefs.current[n] = li; }}>
          <span className="film-index">{String(n + 1).padStart(2, "0")}</span>
          <strong>{c.label}</strong>
          <p>{c.text}</p>
        </li>)}
      </ol>
      <div className="film-progress" aria-hidden="true"><span ref={bar} /></div>
    </div>
  </section>;
}
