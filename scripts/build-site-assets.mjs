// Builds public/hero/field.png: a 160×160 brightness field of public/photo.png with the
// foliage background suppressed. The hero film samples it to place portrait particles.
// Run: node scripts/build-site-assets.mjs
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// sharp ships with Next.js; resolve it from there instead of adding a direct dependency.
const require = createRequire(createRequire(path.join(root, "package.json")).resolve("next/package.json"));
const sharp = require("sharp");

const N = 160;
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

const { data } = await sharp(path.join(root, "public/photo.png")).resize(N, N).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(N * N);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const i = (y * N + x) * 3;
  const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), sat = max ? (max - min) / max : 0;
  let hue = 0;
  if (max !== min) hue = max === r ? 60 * (((g - b) / (max - min)) % 6) : max === g ? 60 * ((b - r) / (max - min) + 2) : 60 * ((r - g) / (max - min) + 4);
  if (hue < 0) hue += 360;
  const foliage = smooth(42, 60, hue) * (1 - smooth(170, 200, hue)) * smooth(0.12, 0.25, sat);
  const u = x / N, v = y / N;
  const head = 1 - smooth(0.85, 1.05, Math.hypot((u - 0.5) / 0.33, (v - 0.4) / 0.4));
  const body = smooth(0.6, 0.7, v) * (1 - smooth(0.5 + (v - 0.6) * 0.9, 0.56 + (v - 0.6) * 0.9, Math.abs(u - 0.52)));
  const subject = Math.max(head, body) * (1 - foliage * 0.9);
  out[y * N + x] = Math.round(255 * (0.12 + 0.88 * Math.pow(lum, 1.05)) * (0.03 + 0.97 * subject));
}
mkdirSync(path.join(root, "public/hero"), { recursive: true });
await sharp(out, { raw: { width: N, height: N, channels: 1 } }).png({ compressionLevel: 9 }).toFile(path.join(root, "public/hero/field.png"));
