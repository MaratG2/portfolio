---
name: Marat Gazizulin — Signal to System
description: A dark, editorial portfolio whose hero is a scroll-scrubbed particle film built from the real portrait.
colors:
  bg: "#0a0c0b"
  bg-raise: "#0f1312"
  surface: "#121715"
  text: "#e7ede8"
  text-2: "#b4bfb7"
  muted: "#87948c"
  faint: "#5a665f"
  accent: "#7cf2a8"
  accent-ink: "#04140b"
  line: "rgb(226 236 229 / 0.09)"
  line-strong: "rgb(226 236 229 / 0.17)"
typography:
  display: "Geologica 500–600, latin + cyrillic"
  mono: "JetBrains Mono 400–500, latin + cyrillic"
  hero: "clamp(38px, 4.9vw, 76px) / 1.02, -0.038em"
  section: "clamp(40px, 6vw, 88px) / 0.98, -0.045em"
  body: "16–18px / 1.55–1.65"
  label: "12px mono, uppercase, 0.06–0.08em"
radius: { pill: "999px", card: "20–22px", media: "12–14px", diagram-box: "8px" }
layout: { max: "1320px", gutter: "clamp(16px, 4vw, 56px)", breakpoints: ["1080px", "760px", "700px (diagrams)", "380px"] }
---
# Design System: Signal to System

## Concept
The page tells one story: a person becomes a system. The hero opens on the user's real colour photo, sharp and
unfiltered. Scrolling dissolves it into ~12k particles that keep the photo's own colours, then scrubs them
through three scenes — a pipeline graph (Architecture), a rotating point cloud (Multimodal), and a scatter
converging onto a curve (Evaluation). Never show the portrait desaturated or as dots on its own: on a dark page
that reads as a memorial (rejected October 2026).
Every frame is a pure function of scroll position, so scrolling back rewinds it. The rest of the page is
quiet, editorial and evidence-first: case studies with system diagrams, real open-source screenshots, a
compact timeline, the stack, and a large contact block.

## Color
Near-black with a faint green cast; one accent, phosphor mint `#7cf2a8`, continuing the green identity of the
previous site. Accent marks signal only: the hero role line, list dashes, the lead metric, diagram packets,
primary buttons. Everything else is text greys on hairlines. The page is dark-only by design; print switches
to a white palette.

## Typography
Geologica carries everything a visitor reads (variable, Cyrillic support is required for the RU page), in
sentence case. JetBrains Mono is limited to diagram notes. Headings are tight (negative tracking), body copy
stays at 15px or larger. Font variables are attached to `<html>` so `:root` tokens resolve.

## Copy
Written for a recruiter scanning in under a minute: name, role, what was built, where, when. Facts over
adjectives, plain sentences over label chains. Not used (rejected October 2026 as template-looking): mono
uppercase eyebrows and meta lines joined with `·`, pulsing "live" dots, numbered section and card indices,
"scroll" hints, mission-statement ledes, and warning-style disclaimers on projects.

## Layout
Sections share a header pattern: hairline rule and a large title.
Case studies are a sticky copy column (4fr) beside a figure (7fr); they stack below 1080px. Diagrams render a
wide SVG and a separate vertical SVG below 700px rather than shrinking text.

## Motion
- Hero film: `app/_components/hero-film.tsx`, 2D canvas, 360vh pinned stage. Photo hold (with a soft mint
  glow) → photo fades 0.06–0.14 while its pixel particles leave → 0.08–0.30 graph → 0.42–0.60 knot (keeps the
  photo colours) → 0.70–0.86 curve. Particles carry per-point delay, swirl and a staggered switch from photo
  colour to paper/accent. The loop sleeps while only the still photo is visible and when the hero is off-screen.
- Diagrams: lines draw in once in view, then accent packets flow along edges; the Adventarium workflow
  highlights a trace path. Labelled "Schematic" — it illustrates scale, not the real graph.
- Reveals: 900ms rise once per element via `[data-reveal]`.
- Motion is on for every visitor once the page hydrates, including under `prefers-reduced-motion` (the film is
  scrubbed by the visitor's own scroll); that preference only stops the looping diagram packets. The server and
  no-JS render are static: the portrait with the three captions listed beneath.

## Assets and provenance
- `public/photo.png`: the user's own portrait, unchanged. `scripts/build-site-assets.mjs` derives
  `public/hero/portrait.webp` (960px colour copy drawn on the canvas) and `public/hero/field.png` (112×112,
  48-colour quantized copy; one particle per pixel).
- `public/work/*.webp`: screenshots from Marat's public repository LocalAtelier (its `docs/` folder),
  converted to WebP. No generated or third-party imagery otherwise.

## Do / Don't
- Do keep every claim inside `docs/career/evidence-register.md`; diagrams use only approved components.
- Do keep the role and contact actions visible in the first viewport.
- Don't add a second accent colour or decorative gradients without a semantic role.
- Don't show current-employer (ORO) projects, screenshots or metrics until they are approved in the register.
