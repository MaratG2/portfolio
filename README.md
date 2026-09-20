# maratg2

Next.js application deployed by Coolify.

## Portfolio

Russian portfolio: `/`. English portfolio: `/en`.
Résumé readers: `/resume` and `/en/resume`, with Back and PDF download controls.

Both pages render on the server and share approved public content in
`app/_content/profile.json`, exported through `profile.ts`. The same JSON generates
the CV PDFs. Current-employer details are restricted by `docs/career/evidence-register.md`.
The résumé uses Motion for spring-based portrait depth and button feedback, native
expandable experience panels, scroll-aware navigation and progressive entry transitions.
The header motion control disables decorative movement; reduced-motion preferences are
honored. Content, navigation and experience disclosures work without JavaScript.

Run `pnpm dev`, `pnpm lint`, and `pnpm build` for development and verification.

For an isolated local preview, set `NEXT_DIST_DIR=.next-public` for both the build
and start commands. Deployment defaults to the standard `.next` directory.

Two-page CV PDFs are available in `public/cv` and linked from the matching language
page. Editable copy is in `docs/career/profile-copy.md`; the PDF generation source is
`scripts/create-cv.py` (Python + ReportLab + PyMuPDF, `--font-dir` points to a directory containing
`arial.ttf` and `arialbd.ttf`). The script writes review copies to `output/pdf` and copies
the same PDFs into `public/cv`. It also renders vector page previews and their accessible text/link manifest in `app/_content/cv-pages.json`. The résumé reader displays every page without depending on a browser PDF plug-in. Regenerate these together when updating CV facts.

Ready-to-use HH, LinkedIn and GitHub copy is indexed in [docs/career/README.md](docs/career/README.md), separately from the working guide analysis and assistant development plan.
The Engineering approach section connects design decisions to delivered Artillect and Adventarium work. No external profile accounts have been changed. Do not add internal employer information.

## Coolify deployment

Create separate Coolify resources for production and staging and select the matching Compose file:

- Production: `/deploy/docker-compose.prod.yml`
- Staging: `/deploy/docker-compose.staging.yml`

Both resources build the repository's root `Dockerfile`. The application service is named `app`, listens on port `3000`, and exposes `/api/health` for health checks. Domains, HTTPS, container names, and routing are managed by Coolify.

No application environment variables are currently required.
