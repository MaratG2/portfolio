// Builds the hero assets from public/photo.png:
// - public/hero/portrait.webp: the colour photo at web size, drawn on the hero canvas.
// - public/hero/field.png: a 112×112 copy quantized to 48 colours; each pixel becomes one particle
//   when the photo dissolves on scroll, and the small palette keeps canvas fill changes cheap.
// Run: node scripts/build-site-assets.mjs
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// sharp ships with Next.js; resolve it from there instead of adding a direct dependency.
const require = createRequire(createRequire(path.join(root, "package.json")).resolve("next/package.json"));
const sharp = require("sharp");

const photo = path.join(root, "public/photo.png");
mkdirSync(path.join(root, "public/hero"), { recursive: true });
await sharp(photo).resize(960, 960).webp({ quality: 84 }).toFile(path.join(root, "public/hero/portrait.webp"));
await sharp(photo).resize(112, 112).png({ palette: true, colors: 48, dither: 0, compressionLevel: 9 }).toFile(path.join(root, "public/hero/field.png"));
