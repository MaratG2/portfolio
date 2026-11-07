# maratg2

Next.js application deployed by Coolify.

## Portfolio

Russian portfolio: `/`. English portfolio: `/en`.
Résumé readers: `/resume` and `/en/resume`, with Back and PDF download controls.

Both pages render on the server and share approved public content in
`app/_content/profile.json`, exported through `profile.ts`. The same JSON generates
the CV PDFs. Current-employer details are restricted by `docs/career/evidence-register.md`.
The hero is a scroll-scrubbed canvas film that opens on the colour portrait and dissolves it into particles
(`app/_components/hero-film.tsx`; `public/hero/portrait.webp` and `field.png` are rebuilt by
`node scripts/build-site-assets.mjs`).
Case studies use server-rendered SVG diagrams (`diagrams.tsx`). Motion is on by default and off
only without JavaScript. See DESIGN.md and
`docs/design-direction.md`, which also covers adding projects and approved ORO highlights.

Run `pnpm dev`, `pnpm lint`, and `pnpm build` for development and verification.

For an isolated local preview, set `NEXT_DIST_DIR=.next-public` for both the build
and start commands. Deployment defaults to the standard `.next` directory.

Two-page CV PDFs are available in `public/cv` and linked from the matching language
page. Editable copy is in `docs/career/profile-copy.md`; the PDF generation source is
`scripts/create-cv.py` (Python + ReportLab + PyMuPDF, `--font-dir` points to a directory containing
`arial.ttf` and `arialbd.ttf`). The script writes review copies to `output/pdf` and copies
the same PDFs into `public/cv`. It also renders vector page previews and their accessible text/link manifest in `app/_content/cv-pages.json`. The résumé reader displays every page without depending on a browser PDF plug-in. Regenerate these together when updating CV facts.

Ready-to-use HH, LinkedIn and GitHub copy is indexed in [docs/career/README.md](docs/career/README.md), separately from the working guide analysis and assistant development plan.
No external profile accounts have been changed. Do not add internal employer information.

## Unity assets portfolio

`/assets` is a separate English publisher portfolio with four real Retro Kitchen
scene renders, pack specifications, creator details and a public support email.
`/assets/contact` is the support page. Neither route is linked from the career
portfolio. Both use `noindex, follow`; they are public URLs, not private pages.
The pack is marked as in preparation until it is actually published.

Page source and scoped styles live in `app/(en)/assets`. Web images are in
`public/assets`. Publisher avatar/banner PNGs and copy-ready profile text are in
`output/asset-publisher`; these upload files are not served by the website.
`generation-prompts.json` records the image-generation prompts and provenance.
Rebuild image exports with `scripts/build-publisher-assets.mjs` using the source
Media directory, avatar PNG and banner PNG as its three arguments.
The original game and package files are not needed to build or run this site.

After deploying through the existing Coolify setup, the intended publisher website
is `https://maratg2.ru/assets` and support URL is `https://maratg2.ru/assets/contact`.
This change does not itself upload a publisher profile or asset package to Unity.

## Coolify deployment

Create separate Coolify resources for production and staging and select the matching Compose file:

- Production: `/deploy/docker-compose.prod.yml`
- Staging: `/deploy/docker-compose.staging.yml`

Both resources build the repository's root `Dockerfile`. The application service is named `app`, listens on port `3000`, and exposes `/api/health` for health checks. Domains, HTTPS, container names, and routing are managed by Coolify.

No application environment variables are currently required.
