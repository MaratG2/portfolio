---
name: Marat Gazizulin Resume
description: A bilingual resume with a real portrait, soft green surfaces and purposeful motion.
colors:
  paper: "#f2f6f3"
  surface: "#ffffff"
  ink: "#192a24"
  muted: "#5c6c63"
  green: "#276647"
  line: "#dce5de"
  pale: "#e8f1e9"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px, 6vw, 76px)"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "31px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    lineHeight: 1.7
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  tag: "5px"
  button: "12px"
  panel: "16px"
  hero: "28px"
spacing:
  compact: "12px"
  panel: "28px"
  column: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "14px 21px"
  experience-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
---
# Design System: Marat Gazizulin Resume

## Overview
**Creative North Star: "The Personal Résumé"**

White résumé panels sit on a light green field. A real portrait, readable career history and direct contact actions carry the identity; depth and motion support that hierarchy. This documents the implemented direction, not a claim of user approval.

**Key Characteristics:**
- Clear role typography and compact profile composition.
- Soft green surfaces, rounded panels and restrained shadows.
- Optional motion with readable content before JavaScript.

## Colors
Primary green marks specialization, focus and selected accents. Ink handles headings and primary actions. Paper, surface and pale provide background separation; muted handles supporting copy; line separates related content. Decorative ambient gradients are CSS accents rather than additional semantic colors.

## Typography
Manrope is the shared display and body family, provided through the existing font variable. The display role is the desktop hero; responsive overrides are intentional. Experience headings use 20px/1.4 and supporting descriptions use 13px/1.9 with a 65ch maximum. Labels range from 10–13px; do not promote these compact labels into body copy.

## Layout
The centered container has a 1120px maximum and 40px outer gutters. The desktop hero pairs flexible copy with a 232px portrait column; career content pairs a flexible timeline with a 285px education column. Expertise uses a statement beside two skill columns.
Breakpoints are 1050px, 800px, 680px and 370px. Outer gutters become 24px at 800px and 16px at 680px. At 680px the portrait precedes copy, career and skill columns stack, and the section navigator fills the container. Below 370px the display is 36px. The navigator is sticky at 16px desktop / 10px mobile.

## Elevation & Depth
Diffuse shadows lift the profile, portrait and navigator. Career panels gain a subtle shadow when open or hovered. The navigator uses translucent fill and 16px backdrop blur; reduced-transparency preference removes that blur.
Pointer-driven portrait tilt uses 900px perspective and a maximum of ±6 degrees per axis. The small expertise orbit and background ribbons are CSS geometry. There is no WebGL scene or large decorative hero model.

## Shapes
Buttons have compact rounded corners; career and education panels use the panel radius. The desktop hero is more generously rounded, reducing to 22px on mobile. The portrait has a white mat; the language switch and icon controls use circular/pill shapes.

## Components
Primary contact and secondary PDF actions are immediate links. Buttons have a 51px minimum height (48px mobile), magnetic mouse feedback, hover color changes and a 0.97 pressed scale. Keyboard focus uses a 2px green outline with 5px offset.
The floating section navigator tracks reading position with a sliding selected surface. Experience uses native details/summary controls; the first two entries start open. Pointer expansion animates for 280ms; keyboard and reduced-motion toggles remain immediate.
Hero entrance spans 700–1000ms with short staggered delays. Section reveals run once for 650ms. Ambient lights/ribbons loop slowly (12–20s); the small orbit rotates over 25s. The global animation switch and OS reduced-motion preference disable motion. Content remains present without JavaScript; print removes decoration and expands experience content.
The portrait is the user's pre-existing `public/photo.png`, unchanged. All remaining decoration is CSS; no generated raster assets are introduced.

## Do's and Don'ts
- Do retain the real portrait, localized specialization and immediate contact/PDF links.
- Do preserve visible keyboard focus, native disclosures and reduced-motion behavior.
- Do keep supporting motion subordinate to readable résumé content.
- Don't reintroduce the rejected large 3D hero sculpture.
- Don't treat decorative gradients or one-off colors as new semantic roles.

