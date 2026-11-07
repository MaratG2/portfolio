# Asset publisher section

An independent English publisher portfolio at `/assets`, separate from the career portfolio.
Use the existing Geologica type and dark/mint palette. No incoming navigation from `/` or `/en`.
Both publisher routes are public but `noindex`; this is not access control.

## Design specification

Concepts (generated with the built-in image tool, 7 November 2026):
- Hero: `exec-aa090938-78e0-46d9-9a77-144376729213.png`.
- Gallery/contact: `exec-abcae4bc-769d-497e-94e0-e27e114a576f.png`.
- Located in the current chat's generated_images directory; they are design references, not public work samples.

The owner rejected “Everyday stories.” The approved direction is concrete product copy:
“Low-poly props for Unity.” Preserve the concepts' visual system with that copy correction.
The pack introduction also uses “Low Poly Props (URP)” instead of a narrative slogan.

Tokens: background #0a0c0b, text #e7ede8, secondary #b4bfb7, accent #7cf2a8;
hairline dividers, no gradients. Content width 1320px, fluid 20–60px gutters.
Geologica 400/500/600; hero 48–80px, section heading 36–52px, body 16–18px,
captions 13px, navigation and controls 14–16px. Open columns, no repeated cards.
Gallery images retain their full 16:9 source composition and original background;
the concept's invented crops/cutouts must not replace actual work samples.

Header: portrait avatar + maratg2, Work, Contact. Hero: heading, explanatory copy,
Explore the first pack anchor, genuine kitchen scene render. Work: pack description,
publication status, specifications and three more real scene renders with full-size links.
About/contact: author's name, concise background, public email and support-page link.
Footer: maratg2 / 3D assets for Unity. On mobile the columns become a single reading order.

Above-fold copy: maratg2; Work; Contact; Low-poly props for Unity.;
3D assets for Unity, with a soft spot for retro interiors and everyday details.;
Explore the first pack; Retro Kitchen / Unity scene render; Retro Kitchen;
Low Poly Props (URP); In preparation for the Unity Asset Store.

The dedicated contact page extends this system with the same header/footer, a visible
email address and simple guidance on what to include in a support request.
It has no contact form or third-party service.

The generated portrait and promo banner are publisher branding, not examples of the
pack's contents. No price, store link, sale, compatibility beyond the provided version,
or moderation approval is claimed. No package download is exposed.

## Visual verification — 7 November 2026

Reviewed both concept images and the browser implementation with `view_image`.
Browser: built-in IAB, no Playwright browser fallback. Desktop viewport 1488x1058
(the hero concept's native size); also checked the initial 637x884 viewport and
mobile 390x844. At 320px, the DOM width check also found no horizontal overflow.

Comparison ledger:
- Copy: owner's rejected slogan replaced in the heading and banner; the revised
  above-fold strings match the allowed list, with no invented badges or extra claims.
- Layout: preserved header, open hero columns, work/specification column beside
  gallery, author/contact row and thin-rule footer. The redundant pack preview
  from the hero concept is folded into the actual work section below it.
- Typography: actual Geologica from the existing site, deliberate heading/body/nav
  scales; smaller navigation and contact typography follows the existing site's
  density instead of the oversized generated concept lettering.
- Palette: original near-black/mint tokens retained; no additional tint on renders.
- Imagery: intentional deviation from concept cutouts and invented close-up crops:
  original Unity images retain their full aspect, background and content. Branding
  portrait alone is generated. All inspected web images loaded successfully.
- Controls: mint primary anchor, thin diagonal arrows, descriptive full-size image
  links and real mailto links. Work anchor and support/return links were exercised.
- Responsive: columns stack; small gallery images become full-width; email and
  headings remain within the viewport. Mobile page and contact page viewed in full.

The implementation was checked against the concepts with these intentional changes;
it is not claimed to be a pixel-identical reproduction of the generated mockups.
No clipping, broken images or accidental horizontal scrolling was observed.
The initial development console contained a Next image LCP advisory after anchor
navigation to the gallery; no application errors were observed. Gallery images
remain lazy-loaded because they are below the initial viewport on standard screens.

Checks: `pnpm lint`, `pnpm build` (including TypeScript and static route generation)
completed successfully. HTTP checks returned 200 for both new pages, all five web
images, both main portfolio pages and health. `/` and `/en` contain no /assets links.
Both new routes expose English language and noindex metadata. Publication to the
live domain and publisher-portal uploads were not performed.
