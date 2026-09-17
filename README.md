# maratg2

Next.js application deployed by Coolify.

## Portfolio

Russian portfolio: `/`. English portfolio: `/en`.

Both pages render on the server and share approved public content in
`app/_content/profile.json`, exported through `profile.ts`. The same JSON generates
the CV PDFs. Current-employer details are restricted by `docs/career/evidence-register.md`.
The hero uses a dynamically loaded Three.js composition, with a pause control,
reduced-motion support and a static fallback. Navigation and content work without JavaScript.

Run `pnpm dev`, `pnpm lint`, and `pnpm build` for development and verification.

Two-page CV PDFs are available in `public/cv` and linked from the matching language
page. Editable copy is in `docs/career/profile-copy.md`; the PDF generation source is
`scripts/create-cv.py` (Python + ReportLab, `--font-dir` points to a directory containing
`arial.ttf` and `arialbd.ttf`). The script writes review copies to `output/pdf` and copies
the same PDFs into `public/cv`. Regenerate both when updating CV facts.

Career positioning, replacement profile copy, claim provenance and researched open-source
proposals are in [docs/career/README.md](docs/career/README.md). These are preparation
materials, not published profile changes. Do not add internal employer information.

## Coolify deployment

Create separate Coolify resources for production and staging and select the matching Compose file:

- Production: `/deploy/docker-compose.prod.yml`
- Staging: `/deploy/docker-compose.staging.yml`

Both resources build the repository's root `Dockerfile`. The application service is named `app`, listens on port `3000`, and exposes `/api/health` for health checks. Domains, HTTPS, container names, and routing are managed by Coolify.

No application environment variables are currently required.
