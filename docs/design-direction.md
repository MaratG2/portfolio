# Design direction — Signal to System (October 2026)

Supersedes the green-and-white résumé panels. Visitor mode: persuade a hiring manager in the first viewport,
then let them verify with evidence. Routes: `/` (RU) and `/en`.

## Why this shape

- **Who, then what.** The first viewport is the name, the current role, two sentences on what Marat builds
  and has built, and the contact and résumé actions.
- **The effect carries the story.** The scroll film is the portrait turning into a system — architecture,
  multimodal generation, evaluation — the three things the career evidence supports. It is not decoration:
  each scene has a caption tied to approved claims.
- **Evidence over adjectives.** Artillect and Adventarium get system diagrams built only from components in
  `docs/career/evidence-register.md`. Open-source work shows real screenshots and real model outputs.
- **Less text.** The old site described Artillect and Adventarium three times (experience, skills,
  "engineering approach"). Each fact now appears once in the case studies and once in the timeline.

## Page order

1. Hero film (pinned, 360vh): colour photo → dissolves into its own coloured particles → graph → point cloud →
   evaluation curve.
2. Work: Artillect (diagram), AI game master / Adventarium (diagram), Model Agency (compact row).
3. Open source: LocalAtelier (screenshots), MaskRoute (summary beside three validation figures).
4. Experience: one row per role with a one-line summary (`site.experience.lines`, aligned by index with
   `experience`), then education and languages.
5. Skills: the five competency groups, each with its tools.
6. Contact: email with copy button, profiles, résumé and PDF.

## Adding a GitHub project

1. Add text to both languages in `app/_content/profile.json` → `site.open.projects`
   (`id`, `summary`, `tags`). Keep claims to what the repository README states.
2. Add `repo`, `year` and optional `images` in `projectMeta` in `app/_content/profile.ts`.
3. Put images in `public/work/` as WebP (≤ ~70 KB each; 1536px wide is plenty).
4. Render it in `portfolio.tsx` in the Open source section: `project-feature` with screenshots, or
   `project-case` with figures. A repository with only a licence should wait.

## Adding approved ORO highlights

The evidence register currently allows only the one-sentence description. When Marat approves specific
achievements or metrics:

1. Record the exact approved wording in `docs/career/evidence-register.md` first.
2. Add `"highlights": ["…", "…"]` to the ORO entry in both languages of `profile.json`.
3. Render them under `timeline-text` in the Experience section (a small list styled like `case-points`), or
   promote ORO to a case study once there is something approved to diagram.
4. Keep `scripts/create-cv.py` in mind: it reads `experience[].description`, not highlights; regenerate the
   PDFs if the description changes.

## Optional: an AI-generated film instead of particles

The particle film needs no footage and weighs ~30 KB. If a generated film is wanted later (Higgsfield, or Marat's
own ComfyUI pipeline, which would itself be portfolio evidence):

- Shot list, 4 beats, one continuous camera move, 5–8 s total: (1) the portrait in soft light, (2) skin and
  background dissolve into glowing nodes and edges, (3) edges carry fragments of image, video, waveform and a
  3D mesh, (4) everything settles into one clean rising line on black. Keep the subject's own likeness
  (reference the real photo); mint `#7cf2a8` as the only colour accent; black background for seamless edges.
- Export 24 fps, extract frames with ffmpeg to WebP (`-q:v 70`), ~120 frames desktop at 1600px wide and a
  separate portrait-cropped set at 720px for phones. Budget ≤ 8 MB desktop, ≤ 3 MB mobile.
- Swap the canvas draw in `hero-film.tsx` for `drawImage(frames[Math.round(p * (n - 1))])`, preload the first
  frame as the poster, and keep the captions, progress bar and reduced-motion fallback as they are.

## Boundaries

No current-employer details beyond the approved sentence. No invented metrics, users or benchmark scores.
Diagrams are schematic and say so where scale is illustrative.
